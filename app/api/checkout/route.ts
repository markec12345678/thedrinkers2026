import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

/**
 * POST /api/checkout
 *
 * Create Stripe Checkout Session
 *
 * Body:
 * - items: Array<{
 *     productId: string,
 *     name: string,
 *     price: string,
 *     image: string,
 *     size: string,
 *     quantity: number
 *   }>
 * - discountCode?: string
 */
export async function POST(request: NextRequest) {
  try {
    const { items, discountCode } = await request.json();

    // Validate items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "No items in cart" },
        { status: 400 },
      );
    }

    // Create line items for Stripe
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: `${item.name} (Size: ${item.size})`,
          description: item.description || undefined,
          images: item.image ? [item.image] : [],
          metadata: {
            productId: item.productId,
            size: item.size,
          },
        },
        unit_amount: Math.round(parseFloat(item.price) * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    // Create discounts if discount code provided
    let discounts = [];
    if (discountCode) {
      discounts = [{ coupon_code: discountCode }];
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      discounts,
      mode: "payment",
      success_url: `${request.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get("origin")}/cart?abandoned=1`,
      metadata: {
        items: JSON.stringify(items),
      },
      shipping_address_collection: {
        allowed_countries: [
          "SI",
          "AT",
          "DE",
          "IT",
          "FR",
          "NL",
          "BE",
          "HR",
          "SK",
          "CZ",
          "PL",
          "HU",
        ],
      },
      phone_number_collection: {
        enabled: true,
      },
    });

    return NextResponse.json({
      success: true,
      url: session.url,
      sessionId: session.id,
    });
  } catch (error: any) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to create checkout session",
      },
      { status: 500 },
    );
  }
}
