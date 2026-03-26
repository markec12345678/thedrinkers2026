import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bundle } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

/**
 * GET /api/bundles
 * Get all active bundles
 */
export async function GET() {
  try {
    const bundles = await db
      .select()
      .from(bundle)
      .where(and(eq(bundle.isActive, true), eq(bundle.isSoldOut, false)));

    // Calculate additional data for each bundle
    const bundlesWithDetails = bundles.map((b) => ({
      ...b,
      isLimited: b.is_limited,
      isSoldOut: b.quantity !== -1 && b.quantityRemaining! <= 0,
    }));

    return NextResponse.json({
      success: true,
      data: bundlesWithDetails,
      count: bundles.length,
    });
  } catch (error) {
    console.error("Error fetching bundles:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch bundles" },
      { status: 500 },
    );
  }
}
