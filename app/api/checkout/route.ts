import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import Stripe from 'stripe';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

// Edge Runtime for fast checkout
export const runtime = 'edge';

// Validation schema
const checkoutSchema = z.object({
  items: z.array(z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
    quantity: z.number().min(1).max(10),
    size: z.string().optional(),
  })),
  email: z.string().email(),
  name: z.string().min(2),
  address: z.object({
    street: z.string(),
    city: z.string(),
    postalCode: z.string(),
    country: z.string(),
  }),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, email, name, address } = checkoutSchema.parse(body);

    // Calculate total
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 50 ? 0 : 5; // Free shipping over €50
    const total = subtotal + shipping;

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'paypal'],
      line_items: items.map(item => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: `${item.name}${item.size ? ` - Size: ${item.size}` : ''}`,
            images: item.image ? [item.image] : undefined,
          },
          unit_amount: Math.round(item.price * 100), // Convert to cents
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/merch?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/merch?canceled=true`,
      customer_email: email,
      shipping_address_collection: {
        allowed_countries: ['SI', 'HR', 'AT', 'IT', 'DE', 'FR', 'NL', 'BE', 'ES', 'PT', 'PL', 'CZ', 'SK', 'HU'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: shipping * 100,
              currency: 'eur',
            },
            display_name: 'Standard Shipping (5-7 days)',
          },
        },
      ],
      metadata: {
        customer_name: name,
        printful_order: 'true',
        items_count: items.length.toString(),
      },
    });

    return NextResponse.json({ 
      success: true, 
      stripeUrl: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Neveljavni podatki',
          errors: error.errors 
        },
        { status: 400 }
      );
    }

    console.error('Checkout error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Prišlo je do napake. Poskusite znova.' 
      },
      { status: 500 }
    );
  }
}

// GET cart total
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const itemIds = searchParams.getAll('items');
    
    // TODO: Fetch prices from database/Printful
    // For now, use mock prices
    
    return NextResponse.json({
      success: true,
      items: itemIds.map(id => ({
        id,
        price: 25, // Mock price
      })),
    });
  } catch (error) {
    console.error('Cart error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to get cart' },
      { status: 500 }
    );
  }
}
