import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

export interface SearchFilters {
  min_bedrooms?: number;
  max_price?: number;
  city?: string;
  property_type?: string;
  keywords: string[];
}

export const parseNaturalLanguageQuery = async (query: string) => {
  const { text } = await generateText({
    model: openai('gpt-4o'),
    system: `You are a real estate expert assistant. 
    Convert the user's natural language property search query into a structured JSON filter object.
    Extracted fields:
    - min_bedrooms: (number)
    - max_price: (number)
    - city: (string)
    - property_type: (string, e.g., 'flat', 'house', 'loft')
    - keywords: (array of strings, e.g., ['quiet', 'natural light', 'near park'])
    
    Return ONLY the JSON object.`,
    prompt: query,
  });

  try {
    return JSON.parse(text) as SearchFilters;
  } catch (e) {
    console.error('Failed to parse AI response', e);
    return null;
  }
};
