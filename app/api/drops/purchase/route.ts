import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { limitedDrop, dropEntry } from "@/lib/db/schema";
import { eq, and, gte, sql } from "drizzle-orm";
import Stripe from "stripe";
import { getUserMembership } from "@/lib/db/queries/memberships";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

/**
 * POST /api/drops/purchase
 * Purchase from a limited edition drop
 */
export async function POST(request: NextRequest) {
  try {
    const authSession = await auth.api.getSession({
      headers: request.headers,
    });

    if (!authSession?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Sign in required to purchase limited drops" },
        { status: 401 },
      );
    }

    const { dropId, quantity } = await request.json();
    const origin =
      request.headers.get("origin") ||
      process.env.NEXT_PUBLIC_APP_URL ||
      process.env.BETTER_AUTH_URL ||
      "";

    if (!dropId || !quantity || quantity < 1) {
      return NextResponse.json(
        { success: false, error: "Invalid parameters" },
        { status: 400 },
      );
    }

    if (!origin) {
      return NextResponse.json(
        { success: false, error: "Application URL is not configured" },
        { status: 500 },
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
    if (!drop.active || (drop.endDate && now > drop.endDate)) {
      return NextResponse.json(
        { success: false, error: "Drop is not active" },
        { status: 400 },
      );
    }

    const vipEarlyAccessStart =
      drop.vipEarlyAccessDate ||
      (drop.vipEarlyAccess
        ? new Date(drop.releaseDate.getTime() - 24 * 60 * 60 * 1000)
        : null);

    if (now < (vipEarlyAccessStart || drop.releaseDate)) {
      return NextResponse.json(
        { success: false, error: "Drop is not active yet" },
        { status: 400 },
      );
    }

    if (now < drop.releaseDate) {
      if (
        !drop.vipEarlyAccess ||
        !vipEarlyAccessStart ||
        now < vipEarlyAccessStart
      ) {
        return NextResponse.json(
          { success: false, error: "Drop is not active yet" },
          { status: 400 },
        );
      }

      const membership = await getUserMembership(authSession.user.id);
      if (!membership?.earlyAccess) {
        return NextResponse.json(
          { success: false, error: "VIP early access only" },
          { status: 403 },
        );
      }
    }

    // Check if sold out
    if (drop.soldOut || drop.quantityRemaining < quantity) {
      return NextResponse.json(
        { success: false, error: "Sold out" },
        { status: 400 },
      );
    }

    const [reservedDrop] = await db
      .update(limitedDrop)
      .set({
        quantityRemaining: sql`${limitedDrop.quantityRemaining} - ${quantity}`,
        soldOut: sql`(${limitedDrop.quantityRemaining} - ${quantity}) <= 0`,
        updatedAt: now,
      })
      .where(
        and(
          eq(limitedDrop.id, drop.id),
          eq(limitedDrop.active, true),
          eq(limitedDrop.soldOut, false),
          gte(limitedDrop.quantityRemaining, quantity),
        ),
      )
      .returning();

    if (!reservedDrop) {
      return NextResponse.json(
        { success: false, error: "Sold out" },
        { status: 409 },
      );
    }

    const [reservation] = await db
      .insert(dropEntry)
      .values({
        dropId: drop.id,
        userId: authSession.user.id,
        quantity,
        status: "pending",
      })
      .returning();

    const primaryImage = drop.images?.[0];
    const dropImageUrl =
      primaryImage && primaryImage.startsWith("/")
        ? `${origin}${primaryImage}`
        : primaryImage?.startsWith("http")
          ? primaryImage
          : undefined;

    let checkoutSession: Stripe.Checkout.Session;

    try {
      // Create Stripe checkout session
      checkoutSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "eur",
              product_data: {
                name: drop.name,
                description: drop.description || undefined,
                images: dropImageUrl ? [dropImageUrl] : [],
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
        success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/drops`,
        client_reference_id: authSession.user.id,
        metadata: {
          dropId: drop.id,
          dropEntryId: reservation.id,
          userId: authSession.user.id,
          quantity: quantity.toString(),
          type: "limited_drop",
        },
      });
    } catch (stripeError) {
      await db.delete(dropEntry).where(eq(dropEntry.id, reservation.id));
      await db
        .update(limitedDrop)
        .set({
          quantityRemaining: sql`${limitedDrop.quantityRemaining} + ${quantity}`,
          soldOut: false,
          updatedAt: new Date(),
        })
        .where(eq(limitedDrop.id, drop.id));

      throw stripeError;
    }

    return NextResponse.json({
      success: true,
      url: checkoutSession.url,
      sessionId: checkoutSession.id,
    });
  } catch (error) {
    console.error("Error purchasing from drop:", error);
    return NextResponse.json(
      { success: false, error: "Failed to purchase from drop" },
      { status: 500 },
    );
  }
}
