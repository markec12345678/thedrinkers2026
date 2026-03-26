import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bundle, bundlePurchase } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

/**
 * POST /api/bundles/purchase
 * Purchase a bundle
 */
export async function POST(request: NextRequest) {
  try {
    const { bundleId, userId } = await request.json();

    if (!bundleId) {
      return NextResponse.json(
        { success: false, error: "Bundle ID required" },
        { status: 400 },
      );
    }

    // Get bundle details
    const [bundleData] = await db
      .select()
      .from(bundle)
      .where(eq(bundle.id, bundleId));

    if (!bundleData) {
      return NextResponse.json(
        { success: false, error: "Bundle not found" },
        { status: 404 },
      );
    }

    // Check if bundle is active
    if (!bundleData.isActive) {
      return NextResponse.json(
        { success: false, error: "Bundle is not active" },
        { status: 400 },
      );
    }

    // Check if limited and sold out
    if (bundleData.isLimited && bundleData.quantityRemaining! <= 0) {
      return NextResponse.json(
        { success: false, error: "Bundle sold out" },
        { status: 400 },
      );
    }

    // Create Stripe checkout session
    const lineItems = [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: `Bundle: ${bundleData.name}`,
            description: bundleData.description || undefined,
            images: [], // TODO: Add bundle images
          },
          unit_amount: Math.round(parseFloat(bundleData.bundlePrice) * 100),
        },
        quantity: 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${request.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get("origin")}/bundles`,
      metadata: {
        bundleId,
        userId: userId || "guest",
        type: "bundle",
        items: JSON.stringify(bundleData.items),
      },
    });

    return NextResponse.json({
      success: true,
      url: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.error("Error purchasing bundle:", error);
    return NextResponse.json(
      { success: false, error: "Failed to purchase bundle" },
      { status: 500 },
    );
  }
}
