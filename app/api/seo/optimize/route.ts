import { NextRequest, NextResponse } from 'next/server';
import { optimizeForSEO } from '@/lib/ai/seo-optimizer';
import { AISEOOptimizeRequest } from '@/lib/types/ai';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/seo/optimize
 * Optimize content for search engines
 * 
 * Request:
 * {
 *   page: string (URL path),
 *   content: string,
 *   targetKeywords?: string[],
 *   pageType: 'event' | 'music' | 'merch' | 'about' | 'home' | 'tour'
 * }
 * 
 * Response:
 * {
 *   success: boolean,
 *   optimized: {
 *     title: string,
 *     metaDescription: string,
 *     keywords: string[],
 *     ogTitle?: string,
 *     ogDescription?: string,
 *     twitterTitle?: string,
 *     twitterDescription?: string,
 *     schema?: Record<string, any>,
 *     internalLinks?: string[],
 *     headings?: { h1: string, h2s?: string[] }
 *   },
 *   score: {
 *     overall: number,
 *     keywordUsage: number,
 *     readability: number,
 *     metaTags: number,
 *     structuredData: number
 *   },
 *   suggestions: string[],
 *   error?: string
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.page || !body.content || !body.pageType) {
      return NextResponse.json(
        {
          success: false,
          error: 'Page, content, and pageType are required',
        },
        { status: 400 }
      );
    }

    // Validate pageType
    const validPageTypes = ['event', 'music', 'merch', 'about', 'home', 'tour'];
    if (!validPageTypes.includes(body.pageType)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid pageType. Must be one of: ${validPageTypes.join(', ')}`,
        },
        { status: 400 }
      );
    }

    const seoRequest: AISEOOptimizeRequest = {
      page: body.page,
      content: body.content,
      targetKeywords: body.targetKeywords || [],
      pageType: body.pageType,
    };

    // Optimize for SEO
    const result = await optimizeForSEO(seoRequest);

    if (!result.success) {
      return NextResponse.json(result, { status: 500 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('[SEO Optimize API] Error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to optimize for SEO',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/seo/optimize
 * Get SEO guidelines and best practices
 */
export async function GET() {
  return NextResponse.json({
    guidelines: {
      title: {
        minLength: 50,
        maxLength: 60,
        tips: [
          'Include primary keyword near the beginning',
          'Add brand name at the end',
          'Use power words (Official, Live, 2026)',
          'Avoid keyword stuffing',
        ],
      },
      metaDescription: {
        minLength: 140,
        maxLength: 160,
        tips: [
          'Include call-to-action',
          'Mention unique value proposition',
          'Use active voice',
          'Include primary keyword naturally',
        ],
      },
      keywords: {
        optimal: '5-15 keywords',
        tips: [
          'Mix of short-tail and long-tail',
          'Include location-based keywords',
          'Use synonyms and variations',
          'Focus on search intent',
        ],
      },
      content: {
        minLength: 300,
        optimal: '500-1000 words',
        tips: [
          'Use headings (H1, H2, H3) hierarchy',
          'Include keywords naturally',
          'Add internal links',
          'Use images with alt text',
          'Keep paragraphs short (2-4 sentences)',
        ],
      },
      technical: {
        tips: [
          'Ensure mobile-friendly design',
          'Optimize page load speed (<3s)',
          'Use HTTPS',
          'Add schema.org markup',
          'Create XML sitemap',
          'Optimize images (WebP format)',
          'Use descriptive URLs',
        ],
      },
    },
    theDrinkersKeywords: {
      brand: ['The Drinkers', 'The Drinkers band', 'The Drinkers Slovenija'],
      genre: ['Slovenian rock', 'Slo rock', 'rock band Slovenia', 'Slovenian music'],
      location: ['Ljubljana band', 'Maribor concert', 'Koper music', 'Zagreb rock'],
      songs: ['Pijemo ga radi', 'Lepi in trezni', 'Žeja', 'Pivolucija', 'Hajdi'],
      events: ['concert Slovenia', 'live music Ljubljana', 'rock concert 2026'],
    },
    competitors: [
      'Siddharta',
      'Big Foot Mama',
      'Tabu',
      'Magnifico',
      'Atomik Harmonik',
    ],
    tools: [
      { name: 'Google Search Console', url: 'https://search.google.com/search-console' },
      { name: 'Google Analytics', url: 'https://analytics.google.com' },
      { name: 'Ahrefs', url: 'https://ahrefs.com' },
      { name: 'SEMrush', url: 'https://semrush.com' },
      { name: 'Screaming Frog', url: 'https://screamingfrog.co.uk' },
    ],
  });
}
