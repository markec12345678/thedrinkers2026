import { NextRequest, NextResponse } from 'next/server';
import { generateAIImage } from '@/lib/ai/image-generation';
import { AIImageGenerationRequest } from '@/lib/types/ai';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/ai/generate
 * Generate AI image from prompt
 * 
 * Request:
 * {
 *   prompt: string,
 *   category: 'album' | 'band' | 'social' | 'merch' | 'poster' | 'fan-art',
 *   aspect?: '1:1' | '16:9' | '9:16' | '4:3' | '3:4' | '2:3' | '3:2',
 *   model?: 'pollinations-free' | 'flux' | 'seedream' | 'gemini'
 * }
 * 
 * Response:
 * {
 *   success: boolean,
 *   imageUrl?: string,
 *   imageId?: string,
 *   prompt: string,
 *   model: string,
 *   aspect: string,
 *   generatedAt: string,
 *   error?: string
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request
    if (!body.prompt || typeof body.prompt !== 'string') {
      return NextResponse.json(
        {
          success: false,
          error: 'Prompt is required and must be a string',
        },
        { status: 400 }
      );
    }

    const aiRequest: AIImageGenerationRequest = {
      prompt: body.prompt,
      category: body.category || 'fan-art',
      aspect: body.aspect || '1:1',
      model: body.model || 'pollinations-free',
      style: body.style || 'realistic',
    };

    // Validate category
    const validCategories = ['album', 'band', 'social', 'merch', 'poster', 'fan-art'];
    if (!validCategories.includes(aiRequest.category)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid category. Must be one of: ${validCategories.join(', ')}`,
        },
        { status: 400 }
      );
    }

    // Generate image
    const result = await generateAIImage(aiRequest);

    if (!result.success) {
      return NextResponse.json(result, { status: 500 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('[AI Generate API] Error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate image',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/ai/generate
 * Get available models and presets
 */
export async function GET() {
  const models = [
    {
      id: 'pollinations-free',
      name: 'Pollinations.ai (FREE)',
      description: '100% free, no API key required, powered by FLUX',
      quality: 'high',
      speed: 'fast',
      cost: 'free',
    },
    {
      id: 'flux',
      name: 'FLUX Dev LoRA',
      description: 'High quality with custom styles via inference.sh',
      quality: 'very-high',
      speed: 'medium',
      cost: 'paid',
    },
    {
      id: 'seedream',
      name: 'Seedream 4.5',
      description: '2K-4K cinematic quality via inference.sh',
      quality: 'ultra',
      speed: 'medium',
      cost: 'paid',
    },
    {
      id: 'gemini',
      name: 'Gemini 3 Pro Image',
      description: "Google's latest image generation model",
      quality: 'ultra',
      speed: 'fast',
      cost: 'paid',
    },
  ];

  const aspects = [
    { id: '1:1', name: 'Square', use: 'Album covers, Instagram posts' },
    { id: '16:9', name: 'Landscape', use: 'YouTube thumbnails, banners' },
    { id: '9:16', name: 'Portrait', use: 'TikTok, Instagram Stories' },
    { id: '4:3', name: 'Standard', use: 'Band photos' },
    { id: '3:4', name: 'Vertical', use: 'Posters' },
    { id: '2:3', name: 'Poster', use: 'Concert posters' },
    { id: '3:2', name: 'Wide', use: 'Facebook covers' },
  ];

  const categories = [
    { id: 'album', name: 'Album Covers', icon: '💿' },
    { id: 'band', name: 'Band Photos', icon: '🎸' },
    { id: 'social', name: 'Social Media', icon: '📱' },
    { id: 'merch', name: 'Merchandise', icon: '👕' },
    { id: 'poster', name: 'Posters', icon: '🎫' },
    { id: 'fan-art', name: 'Fan Art', icon: '🎨' },
  ];

  return NextResponse.json({
    models,
    aspects,
    categories,
    presets: {
      theDrinkers: {
        colors: ['Crimson Red (#dc143c)', 'Black (#0a0a0a)', 'Silver (#c0c0c0)'],
        elements: ['Beer mugs', 'Guitars', 'Vinyl records', 'Slovenian flag'],
        style: "Rock'n'roll, vintage, high contrast, professional",
      },
    },
  });
}
