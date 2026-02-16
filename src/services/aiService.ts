import { generateText } from 'ai';
import { google } from '@ai-sdk/google';

export const SEARCH_FILTERS_SYSTEM_PROMPT = `You are a real estate expert assistant.
    Convert the user's natural language property search query into a structured JSON filter object.
    Extracted fields:
    - min_bedrooms: (number)
    - max_price: (number)
    - city: (string)
    - property_type: (string, e.g., 'flat', 'house', 'loft')
    - keywords: (array of strings, e.g., ['quiet', 'natural light', 'near park'])

    Return ONLY the JSON object. Do not include markdown formatting like \`\`\`json.`;

export interface SearchFilters {
  min_bedrooms?: number;
  max_price?: number;
  city?: string;
  property_type?: string;
  keywords: string[];
}

export const parseNaturalLanguageQuery = async (query: string) => {
  // We use gemini-1.5-flash as it is extremely fast and cost-effective
  const { text } = await generateText({
    model: google('gemini-1.5-flash'),
    system: SEARCH_FILTERS_SYSTEM_PROMPT,
    prompt: query,
  });

  try {
    // Clean potential markdown or extra whitespace from AI
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanedText) as SearchFilters;
  } catch (e) {
    console.error('Failed to parse AI response', e);
    return null;
  }
};
