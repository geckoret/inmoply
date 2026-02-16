import { describe, test, expect, mock, spyOn, beforeEach } from "bun:test";

// Create mocks for generateText and google
// We need to define them *before* calling mock.module so we can reference them
const mockGenerateText = mock(async () => ({ text: JSON.stringify({ keywords: [] }) }));
const mockGoogle = mock(() => ({}));

// Mock the 'ai' module
mock.module("ai", () => ({
  generateText: mockGenerateText,
}));

// Mock the '@ai-sdk/google' module
mock.module("@ai-sdk/google", () => ({
  google: mockGoogle,
}));

// Import the function under test AFTER setting up mocks
// This import will now use the mocked modules
import { parseNaturalLanguageQuery } from "../aiService";

describe("parseNaturalLanguageQuery", () => {
  beforeEach(() => {
    // Clear mock history before each test
    mockGenerateText.mockClear();
    mockGoogle.mockClear();
  });

  // 1. Happy Path
  test("should correctly parse a valid JSON response", async () => {
    const mockResponse = {
      min_bedrooms: 2,
      max_price: 500000,
      city: "Barcelona",
      property_type: "flat",
      keywords: ["quiet", "balcony"],
    };
    mockGenerateText.mockResolvedValueOnce({ text: JSON.stringify(mockResponse) });

    const result = await parseNaturalLanguageQuery("I want a quiet flat in Barcelona with a balcony and at least 2 bedrooms for max 500k");

    expect(result).toEqual(mockResponse);
    expect(mockGenerateText).toHaveBeenCalledTimes(1);
    expect(mockGoogle).toHaveBeenCalledTimes(1);
    expect(mockGoogle).toHaveBeenCalledWith("gemini-1.5-flash");

    // Check arguments passed to generateText
    const callArgs = mockGenerateText.mock.calls[0][0];
    expect(callArgs.prompt).toBe("I want a quiet flat in Barcelona with a balcony and at least 2 bedrooms for max 500k");
  });

  // 2. Markdown Handling
  test("should strip markdown code blocks from the AI response", async () => {
    const mockResponse = {
      keywords: ["pool"],
    };
    const markdownResponse = `\`\`\`json
${JSON.stringify(mockResponse)}
\`\`\``;
    mockGenerateText.mockResolvedValueOnce({ text: markdownResponse });

    const result = await parseNaturalLanguageQuery("pool");

    expect(result).toEqual(mockResponse);
  });

  // 3. Invalid JSON (Parsing error)
  test("should return null when the AI returns invalid JSON", async () => {
    mockGenerateText.mockResolvedValueOnce({ text: "Not a JSON object" });

    // Suppress console.error during this test
    const consoleSpy = spyOn(console, "error").mockImplementation(() => {});

    try {
        const result = await parseNaturalLanguageQuery("bad input");
        expect(result).toBeNull();
        expect(consoleSpy).toHaveBeenCalledWith("Failed to parse AI response", expect.any(Error));
    } finally {
        consoleSpy.mockRestore();
    }
  });

  // 4. Service Error (Network error)
  test("should propagate error if generateText fails", async () => {
    const error = new Error("API Error");
    mockGenerateText.mockRejectedValueOnce(error);

    // Since parseNaturalLanguageQuery awaits generateText outside try-catch, it should throw
    expect(parseNaturalLanguageQuery("fail")).rejects.toThrow("API Error");
  });

  // 5. Partial Data
  test("should handle partial valid JSON responses", async () => {
    const partialResponse = {
      keywords: ["sunny"],
      // missing other fields
    };
    mockGenerateText.mockResolvedValueOnce({ text: JSON.stringify(partialResponse) });

    const result = await parseNaturalLanguageQuery("sunny place");

    expect(result).toEqual(partialResponse);
  });

  // 6. Empty Response
  test("should return null for empty AI response", async () => {
    mockGenerateText.mockResolvedValueOnce({ text: "   " });
    // Suppress console.error
    const consoleSpy = spyOn(console, "error").mockImplementation(() => {});

    try {
      const result = await parseNaturalLanguageQuery("nothing");
      expect(result).toBeNull();
    } finally {
      consoleSpy.mockRestore();
    }
  });

  // 7. Malformed JSON within Markdown
  test("should return null and log error when AI returns malformed JSON within markdown blocks", async () => {
    const malformedJson = `\`\`\`json
{
  "keywords": ["pool"],
  "city": "Madrid"
\`\`\``; // Missing closing brace
    mockGenerateText.mockResolvedValueOnce({ text: malformedJson });

    // Suppress console.error
    const consoleSpy = spyOn(console, "error").mockImplementation(() => {});

    try {
      const result = await parseNaturalLanguageQuery("malformed");
      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith("Failed to parse AI response", expect.any(Error));
    } finally {
      consoleSpy.mockRestore();
    }
  });
});
