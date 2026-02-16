import { NextResponse } from 'next/server';
import { parseNaturalLanguageQuery } from '@/services/aiService';

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    
    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    if (typeof query !== 'string') {
      return NextResponse.json({ error: 'Query must be a string' }, { status: 400 });
    }

    if (query.length > 500) {
      return NextResponse.json({ error: 'Query is too long (max 500 characters)' }, { status: 400 });
    }

    const filters = await parseNaturalLanguageQuery(query);
    
    return NextResponse.json({ filters });
  } catch (error) {
    console.error('AI Search Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
