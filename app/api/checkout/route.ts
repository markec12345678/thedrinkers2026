import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

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

    console.log('Checkout request:', {
      items,
      customer: { email, name, address },
      subtotal,
      shipping,
      total,
    });

    // TODO: Integrate with Stripe
    // For now, simulate successful checkout
    
    // In production, you would:
    // 1. Create Stripe Checkout Session
    // 2. Send session URL to client
    // 3. Stripe handles payment
    // 4. Webhook confirms payment
    // 5. Send order to Printful API

    return NextResponse.json({
      success: true,
      message: 'Naročilo ustvarjeno!',
      orderId: `TD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      subtotal,
      shipping,
      total,
      nextSteps: 'Preusmerili vas bomo na Stripe Checkout...',
      // For MVP: Redirect to Stripe Checkout URL
      // stripeUrl: 'https://checkout.stripe.com/...'
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
