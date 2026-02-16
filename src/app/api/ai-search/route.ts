import { NextResponse } from 'next/server';
import { parseNaturalLanguageQuery } from '@/services/aiService';

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    
    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    const filters = await parseNaturalLanguageQuery(query);
    
    return NextResponse.json({ filters });
  } catch (error) {
    console.error('AI Search Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
