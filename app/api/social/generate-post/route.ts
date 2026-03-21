import { NextRequest, NextResponse } from 'next/server';
import { generateSocialPost } from '@/lib/ai/social-generator';
import { AISocialPostRequest } from '@/lib/types/ai';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/social/generate-post
 * Generate AI-powered social media content
 * 
 * Request:
 * {
 *   type: 'concert' | 'album' | 'merch' | 'tour' | 'announcement',
 *   platform: 'instagram' | 'twitter' | 'facebook' | 'tiktok',
 *   content?: {
 *     title?: string,
 *     description?: string,
 *     imageUrl?: string,
 *     eventDate?: string,
 *     venue?: string
 *   },
 *   tone?: 'energetic' | 'professional' | 'fun' | 'nostalgic'
 * }
 * 
 * Response:
 * {
 *   success: boolean,
 *   post: {
 *     caption: string,
 *     hashtags: string[],
 *     imagePrompt?: string,
 *     platform: string,
 *     type: string
 *   },
 *   alternatives?: Array<{
 *     caption: string,
 *     hashtags: string[]
 *   }>,
 *   error?: string
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.type || !body.platform) {
      return NextResponse.json(
        {
          success: false,
          error: 'Type and platform are required',
        },
        { status: 400 }
      );
    }

    // Validate type
    const validTypes = ['concert', 'album', 'merch', 'tour', 'announcement'];
    if (!validTypes.includes(body.type)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid type. Must be one of: ${validTypes.join(', ')}`,
        },
        { status: 400 }
      );
    }

    // Validate platform
    const validPlatforms = ['instagram', 'twitter', 'facebook', 'tiktok'];
    if (!validPlatforms.includes(body.platform)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid platform. Must be one of: ${validPlatforms.join(', ')}`,
        },
        { status: 400 }
      );
    }

    const socialRequest: AISocialPostRequest = {
      type: body.type,
      platform: body.platform,
      content: body.content,
      tone: body.tone || 'energetic',
    };

    // Generate social post
    const result = await generateSocialPost(socialRequest);

    if (!result.success) {
      return NextResponse.json(result, { status: 500 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('[Social Generate API] Error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate social post',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/social/generate-post
 * Get available options and templates
 */
export async function GET() {
  return NextResponse.json({
    types: [
      { id: 'concert', name: 'Concert Announcement', icon: '🎸' },
      { id: 'album', name: 'Album Release', icon: '💿' },
      { id: 'merch', name: 'Merchandise Drop', icon: '👕' },
      { id: 'tour', name: 'Tour Announcement', icon: '🎫' },
      { id: 'announcement', name: 'General Announcement', icon: '📢' },
    ],
    platforms: [
      { 
        id: 'instagram', 
        name: 'Instagram', 
        icon: '📷',
        maxCaptionLength: 2200,
        optimalHashtags: 8,
      },
      { 
        id: 'twitter', 
        name: 'Twitter/X', 
        icon: '🐦',
        maxCaptionLength: 280,
        optimalHashtags: 2,
      },
      { 
        id: 'facebook', 
        name: 'Facebook', 
        icon: '📘',
        maxCaptionLength: 63206,
        optimalHashtags: 3,
      },
      { 
        id: 'tiktok', 
        name: 'TikTok', 
        icon: '🎵',
        maxCaptionLength: 2200,
        optimalHashtags: 5,
      },
    ],
    tones: [
      { id: 'energetic', name: 'Energetic', icon: '⚡', description: "Rock'n'roll enthusiasm" },
      { id: 'professional', name: 'Professional', icon: '🎤', description: 'Polished and respectful' },
      { id: 'fun', name: 'Fun', icon: '😄', description: 'Playful and humorous' },
      { id: 'nostalgic', name: 'Nostalgic', icon: '💫', description: 'Sentimental and warm' },
    ],
    brandVoice: {
      colors: ['Crimson Red', 'Black', 'Silver'],
      elements: ['Beer', 'Guitars', 'Rock', 'Slovenian pride'],
      phrases: ['Na zdravje!', 'Pijemo ga radi!', 'Življenje je prekratko!'],
    },
  });
}
