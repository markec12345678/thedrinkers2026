import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.clover',
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, email } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items provided' }, { status: 400 });
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name,
            description: item.description,
            images: item.images,
          },
          unit_amount: Math.round(item.price * 100), // Convert to cents
        },
        quantity: item.quantity || 1,
      })),
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/merch?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/merch?canceled=true`,
      customer_email: email,
      metadata: {
        type: 'merchandise',
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
