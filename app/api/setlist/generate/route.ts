import { NextRequest, NextResponse } from 'next/server';
import { generateSetlist, getPresetSetlist, getAllPresets } from '@/lib/ai/setlist-generator';
import { SetlistRequest } from '@/lib/ai/setlist-generator';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/setlist/generate
 * Generate AI-powered setlist
 * 
 * Request:
 * {
 *   mood?: 'party' | 'chill' | 'workout' | 'romantic' | 'drinking' | 'energetic',
 *   energy?: 'low' | 'medium' | 'high' | 'very-high',
 *   duration?: number (minutes),
 *   occasion?: string,
 *   customPrompt?: string
 * }
 * 
 * Response:
 * {
 *   success: boolean,
 *   setlist: GeneratedSetlist,
 *   error?: string
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const setlistRequest: SetlistRequest = {
      mood: body.mood,
      energy: body.energy,
      duration: body.duration || 60,
      occasion: body.occasion,
      customPrompt: body.customPrompt,
    };

    // Validate request
    if (!setlistRequest.mood && !setlistRequest.energy && !setlistRequest.customPrompt) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please provide at least a mood, energy level, or custom prompt',
        },
        { status: 400 }
      );
    }

    // Generate setlist
    const setlist = await generateSetlist(setlistRequest);

    return NextResponse.json({
      success: true,
      setlist,
    });
  } catch (error) {
    console.error('[Setlist API] Error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate setlist',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/setlist/generate
 * Get available presets
 */
export async function GET() {
  try {
    const presets = getAllPresets();
    
    return NextResponse.json({
      presets,
      moods: [
        'party',
        'chill',
        'romantic',
        'energetic',
        'nostalgic',
        'rebellious',
        'emotional',
        'fun',
        'drinking',
        'driving',
        'workout',
      ],
      energyLevels: ['low', 'medium', 'high', 'very-high'],
      durations: [30, 45, 60, 75, 90],
    });
  } catch (error) {
    console.error('[Setlist API] Error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch presets',
      },
      { status: 500 }
    );
  }
}
