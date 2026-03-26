import { NextRequest, NextResponse } from "next/server";
import { getAllVipTiers } from "@/lib/db/queries/memberships";

/**
 * GET /api/vip-memberships
 *
 * Returns all active VIP tiers
 */
export async function GET() {
  try {
    const tiers = await getAllVipTiers();

    return NextResponse.json({
      success: true,
      data: tiers,
      count: tiers.length,
    });
  } catch (error) {
    console.error("Error fetching VIP tiers:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch VIP tiers" },
      { status: 500 },
    );
  }
}

/**
 * POST /api/vip-memberships
 *
 * Body:
 * - user_id: string
 * - tier: string (bronze, silver, gold)
 * - billing_cycle: 'monthly' | 'yearly'
 */
export async function POST(request: NextRequest) {
  try {
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

    // TODO: Create VIP membership
    // For now, return not implemented
    return NextResponse.json(
      { success: false, error: "Not implemented" },
      { status: 501 },
    );
  } catch (error) {
    console.error("Error creating VIP membership:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create VIP membership" },
      { status: 500 },
    );
  }
}
