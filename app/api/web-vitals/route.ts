import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

/**
 * GET /api/web-vitals
 * Get Web Vitals performance data
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const metric = searchParams.get('metric');
    
    // Mock data for now
    // In production, fetch from database
    const webVitals = {
      LCP: {
        value: 2.1,
        rating: 'good',
        threshold: 2.5,
      },
      FID: {
        value: 45,
        rating: 'good',
        threshold: 100,
      },
      CLS: {
        value: 0.08,
        rating: 'good',
        threshold: 0.1,
      },
      TTFB: {
        value: 400,
        rating: 'good',
        threshold: 600,
      },
      INP: {
        value: 120,
        rating: 'needs-improvement',
        threshold: 200,
      },
    };

    if (metric) {
      return NextResponse.json(webVitals[metric as keyof typeof webVitals]);
    }

    return NextResponse.json({
      success: true,
      data: webVitals,
      summary: {
        good: Object.values(webVitals).filter(v => v.rating === 'good').length,
        needsImprovement: Object.values(webVitals).filter(
          v => v.rating === 'needs-improvement'
        ).length,
        poor: Object.values(webVitals).filter(v => v.rating === 'poor').length,
      },
    });
  } catch (error) {
    console.error('Web Vitals API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Web Vitals' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/web-vitals
 * Submit Web Vitals metrics
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.value) {
      return NextResponse.json(
        { error: 'Metric name and value are required' },
        { status: 400 }
      );
    }

    // Log the metric
    console.log('⚡ Web Vital:', {
      name: body.name,
      value: body.value,
      rating: body.rating,
      url: body.url,
      userAgent: body.userAgent,
    });

    // TODO: Store in database
    // await db.webVital.create({
    //   data: {
    //     name: body.name,
    //     value: body.value,
    //     rating: body.rating,
    //     url: body.url,
    //     userAgent: body.userAgent,
    //   }
    // });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Web Vitals API Error:', error);
    return NextResponse.json(
      { error: 'Failed to submit Web Vitals' },
      { status: 500 }
    );
  }
}
