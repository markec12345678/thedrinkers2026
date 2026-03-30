import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { vipMembership, vipTier } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { requireAdminApiAccess } from "@/lib/auth-utils";

/**
 * POST /api/vip-memberships
 * Create new VIP membership
 */
export async function POST(request: NextRequest) {
  try {
    const adminAccess = await requireAdminApiAccess(request.headers);
    if ("response" in adminAccess) {
      return adminAccess.response;
    }

    const body = await request.json();

    // Validate required fields
    if (!body.user_id || !body.tier || !body.billing_cycle) {
      return NextResponse.json(
        {
          success: false,
          error: "User ID, tier, and billing cycle are required",
        },
        { status: 400 },
      );
    }

    // Get tier details
    const [tier] = await db
      .select()
      .from(vipTier)
      .where(eq(vipTier.name, body.tier))
      .limit(1);

    if (!tier) {
      return NextResponse.json(
        { success: false, error: "Invalid tier" },
        { status: 400 },
      );
    }

    // Calculate expiry date
    const startDate = new Date();
    const expiresAt = new Date();
    if (body.billing_cycle === "yearly") {
      expiresAt.setFullYear(expiresAt.getFullYear() + 1);
    } else {
      expiresAt.setMonth(expiresAt.getMonth() + 1);
    }

    // Create membership
    const [newMembership] = await db
      .insert(vipMembership)
      .values({
        userId: body.user_id,
        tier: body.tier,
        status: "active",
        startDate: new Date(),
        expiresAt: expiresAt,
        benefits: tier.benefits,
        discountPercentage: tier.discountPercentage,
        earlyAccess: true,
        exclusiveContent: true,
        meetAndGreet: false,
        stripeCustomerId: body.stripe_customer_id,
        stripeSubscriptionId: body.stripe_subscription_id,
        stripePriceId: body.stripe_price_id,
      } as any)
      .returning();

    return NextResponse.json({
      success: true,
      data: newMembership,
      message: "VIP membership created successfully",
    });
  } catch (error) {
    console.error("Error creating VIP membership:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create VIP membership" },
      { status: 500 },
    );
  }
}
