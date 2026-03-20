import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Edge Runtime za hitrejše odzive iz edge lokacij
export const runtime = 'edge';

// Cache strategija - tickets so dinamični
export const dynamic = 'force-dynamic';
export const revalidate = 30; // 30s revalidacija za razpoložljivost

// Validation schema
const ticketSchema = z.object({
  tourDateId: z.string(),
  quantity: z.number().min(1).max(10),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tourDateId, quantity, name, email, phone } = ticketSchema.parse(body);

    // TODO: Integrate with ticketing service (Eventim, Ticketmaster, etc.)
    // For now, we'll simulate a ticket purchase

    console.log('Ticket purchase:', {
      tourDateId,
      quantity,
      name,
      email,
      phone,
    });

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Generate order reference
    const orderReference = `TD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    return NextResponse.json(
      {
        success: true,
        message: 'Vstopnice so bile uspešno rezervirane!',
        orderReference,
        nextSteps: 'Poslali vam bomo email z navodili za prevzem vstopnic.',
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Neveljavni podatki',
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    console.error('Ticket purchase error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Prišlo je do napake. Poskusite znova.',
      },
      { status: 500 }
    );
  }
}

// GET available tickets for a tour date
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tourDateId = searchParams.get('tourDateId');

    if (!tourDateId) {
      return NextResponse.json(
        { success: false, message: 'tourDateId parameter required' },
        { status: 400 }
      );
    }

    // TODO: Fetch from ticketing service
    // Simulated response with cache headers
    const response = NextResponse.json(
      {
        success: true,
        available: true,
        ticketsRemaining: 150,
        price: '25€',
        maxPerOrder: 10,
      },
      { status: 200 }
    );

    // Cache headers za CDN
    response.headers.set('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=300');
    return response;
  } catch (error) {
    console.error('Ticket availability error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Prišlo je do napake.',
      },
      { status: 500 }
    );
  }
}
