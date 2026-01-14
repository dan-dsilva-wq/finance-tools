import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tool, country_code, params } = body;

    if (!tool || !country_code || !params) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const id = nanoid(8);

    const { error } = await supabase.from('scenario').insert({
      id,
      tool,
      country_code,
      params,
    });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to save scenario' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      id,
      url: `/s/${id}`,
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
