import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { limitedDrop, dropEntry } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

/**
 * POST /api/drops/purchase
 * Purchase from a limited edition drop
 */
export async function POST(request: NextRequest) {
  try {
    const { dropId, userId, quantity } = await request.json();

    if (!dropId || !quantity || quantity < 1) {
      return NextResponse.json(
        { success: false, error: "Invalid parameters" },
        { status: 400 },
      );
    }

    // Get drop details
    const [drop] = await db
      .select()
      .from(limitedDrop)
      .where(eq(limitedDrop.id, dropId));

    if (!drop) {
      return NextResponse.json(
        { success: false, error: "Drop not found" },
        { status: 404 },
      );
    }

    // Check if drop is active
    const now = new Date();
    if (now < drop.startDate || now > drop.endDate) {
      return NextResponse.json(
        { success: false, error: "Drop is not active" },
        { status: 400 },
      );
    }

    // Check if sold out
    if (drop.isSoldOut || drop.quantityRemaining < quantity) {
      return NextResponse.json(
        { success: false, error: "Sold out" },
        { status: 400 },
      );
    }

    // Check VIP early access
    if (drop.vipEarlyAccess) {
      const publicStartDate = new Date(drop.startDate);
      publicStartDate.setHours(
        publicStartDate.getHours() - (drop.vipEarlyAccessHours || 24),
      );

      if (now < publicStartDate) {
        // Check if user is VIP
        // TODO: Implement VIP check
        // const [membership] = await db.select().from(vipMembership).where(...);
        // if (!membership) {
        //   return NextResponse.json(
        //     { success: false, error: 'VIP early access only' },
        //     { status: 403 }
        //   );
        // }
      }
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: drop.name,
              description: drop.description || undefined,
              images: drop.originalPrice
                ? [`/images/drops/${drop.productId}.jpg`]
                : [],
              metadata: {
                dropId: drop.id,
                type: "limited_drop",
              },
            },
            unit_amount: Math.round(parseFloat(drop.price) * 100),
          },
          quantity,
        },
      ],
      mode: "payment",
      success_url: `${request.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get("origin")}/drops`,
      metadata: {
        dropId: drop.id,
        userId: userId || "guest",
        quantity: quantity.toString(),
        type: "limited_drop",
      },
    });

    return NextResponse.json({
      success: true,
      url: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.error("Error purchasing from drop:", error);
    return NextResponse.json(
      { success: false, error: "Failed to purchase from drop" },
      { status: 500 },
    );
  }
}
