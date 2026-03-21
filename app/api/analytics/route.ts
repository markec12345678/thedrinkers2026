import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 60; // Revalidate every 60 seconds

/**
 * POST /api/analytics
 * Track custom analytics events
 * 
 * Request:
 * {
 *   event: string,
 *   params?: Record<string, any>,
 *   timestamp: string,
 *   url: string,
 *   referrer?: string
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.event || !body.url) {
      return NextResponse.json(
        { error: 'Event and URL are required' },
        { status: 400 }
      );
    }

    // For now, just log the event
    // In production, you could:
    // 1. Store in database
    // 2. Send to external service
    // 3. Aggregate for dashboard
    
    console.log('📊 Custom Analytics Event:', {
      event: body.event,
      params: body.params,
      url: body.url,
      timestamp: body.timestamp,
      referrer: body.referrer,
    });

    // TODO: Store in database for dashboard
    // await db.analyticsEvent.create({
    //   data: {
    //     event: body.event,
    //     params: body.params,
    //     url: body.url,
    //     referrer: body.referrer,
    //     timestamp: new Date(body.timestamp),
    //   }
    // });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics API Error:', error);
    return NextResponse.json(
      { error: 'Failed to track event' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/analytics
 * Get analytics summary (for admin dashboard)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '24h';
    
    // TODO: Fetch from database
    // For now, return mock data
    const mockData = {
      period,
      pageViews: Math.floor(Math.random() * 1000) + 500,
      uniqueVisitors: Math.floor(Math.random() * 500) + 200,
      topPages: [
        { path: '/', views: 300, title: 'Home' },
        { path: '/tour', views: 200, title: 'Tour Dates' },
        { path: '/music', views: 150, title: 'Music' },
        { path: '/merch', views: 100, title: 'Merch' },
      ],
      conversions: {
        ticketClicks: Math.floor(Math.random() * 50),
        merchPurchases: Math.floor(Math.random() * 20),
        newsletterSignups: Math.floor(Math.random() * 30),
      },
      devices: {
        mobile: 60,
        desktop: 35,
        tablet: 5,
      },
    };

    return NextResponse.json(mockData);
  } catch (error) {
    console.error('Analytics API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
