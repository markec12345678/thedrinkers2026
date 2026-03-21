import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/fan-art/vote
 * Vote for fan art
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { artId, vote } = body;

    if (!artId || !vote) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // TODO: Validate vote (like/dislike)
    // TODO: Update database
    // TODO: Check for duplicate votes

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Fan art vote error:', error);
    return NextResponse.json(
      { error: 'Failed to vote' },
      { status: 500 }
    );
  }
}
