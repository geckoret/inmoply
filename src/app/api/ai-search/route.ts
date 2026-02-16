import { NextResponse } from 'next/server';
import { parseNaturalLanguageQuery } from '@/services/aiService';
import { rateLimit } from '@/lib/rate-limit';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    // Basic rate limiting
    const forwardedFor = req.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0] : 'unknown';

    const limitResult = rateLimit(ip);

    if (!limitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': limitResult.limit.toString(),
            'X-RateLimit-Remaining': limitResult.remaining.toString(),
            'X-RateLimit-Reset': limitResult.reset.toString(),
          }
        }
      );
    }

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
