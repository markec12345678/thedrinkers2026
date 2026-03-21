import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/fan-art/report
 * Report inappropriate fan art
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { artId, reason } = body;

    if (!artId || !reason) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // TODO: Create report
    // TODO: Notify moderators
    // TODO: Track repeat reporters

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Fan art report error:', error);
    return NextResponse.json(
      { error: 'Failed to report' },
      { status: 500 }
    );
  }
}
