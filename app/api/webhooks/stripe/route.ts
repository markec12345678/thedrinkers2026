import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { checkAndUpgradeMembership } from '@/lib/membership';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.clover',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = (await headers()).get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  // Handle successful payment
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    console.log('Payment completed:', {
      sessionId: session.id,
      customerEmail: session.customer_email,
      amountTotal: session.amount_total,
      metadata: session.metadata,
    });

    // Send order to Printful
    try {
      await sendToPrintful(session);
      console.log('Order sent to Printful successfully');
    } catch (error) {
      console.error('Failed to send order to Printful:', error);
    }

    // Check and upgrade membership based on total spent
    if (session.client_reference_id) {
      try {
        const amountInEur = (session.amount_total || 0) / 100;
        await checkAndUpgradeMembership(session.client_reference_id, amountInEur);
        console.log('Membership upgrade check completed');
      } catch (error) {
        console.error('Failed to check membership upgrade:', error);
      }
    }
  }

  // Handle payment failure
  if (event.type === 'payment_intent.payment_failed') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    console.log('Payment failed:', paymentIntent.id);
  }

  return NextResponse.json({ received: true });
}

async function sendToPrintful(session: Stripe.Checkout.Session) {
  // Get line items from session
  const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
  
  // Get customer info
  const metadata = session.metadata;
  
  // Create Printful order (simplified)
  const printfulOrder = {
    recipient: {
      name: metadata?.customer_name || 'Customer',
      email: session.customer_email || '',
    },
    items: lineItems.data.map(item => ({
      variant_id: 4012, // Default to T-Shirt M
      quantity: item.quantity || 1,
    })),
    external_id: session.id,
  };

  // Send to Printful API
  const response = await fetch('https://api.printful.com/orders', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(printfulOrder),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Printful API error: ${error}`);
  }

  const orderData = await response.json();
  console.log('Printful order created:', orderData);
  
  return orderData;
}

function getPrintfulVariantId(productName: string): number {
  // Map product names to Printful variant IDs
  // These are example IDs - you'll need to get actual IDs from Printful
  const variantMap: Record<string, number> = {
    // T-Shirts (Gildan 64000)
    'T-Shirt - S': 4011,
    'T-Shirt - M': 4012,
    'T-Shirt - L': 4013,
    'T-Shirt - XL': 4014,
    'T-Shirt - XXL': 4015,
    
    // Hoodies (Gildan 18500)
    'Hoodie - S': 5011,
    'Hoodie - M': 5012,
    'Hoodie - L': 5013,
    'Hoodie - XL': 5014,
    'Hoodie - XXL': 5015,
    
    // Default to T-Shirt M if not found
    'default': 4012,
  };
  
  // Try to find exact match
  if (variantMap[productName]) {
    return variantMap[productName];
  }
  
  // Try to find partial match
  for (const [key, value] of Object.entries(variantMap)) {
    if (productName.toLowerCase().includes(key.toLowerCase())) {
      return value;
    }
  }
  
  // Return default
  return variantMap.default;
}
