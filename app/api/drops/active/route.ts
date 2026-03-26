import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { limitedDrop, dropEntry, dropWaitlist } from "@/lib/db/schema";
import { eq, and, gte, lte, desc, sql } from "drizzle-orm";

/**
 * GET /api/drops/active
 * Get all active limited edition drops
 */
export async function GET() {
  try {
    const now = new Date();

    const drops = await db
      .select()
      .from(limitedDrop)
      .where(
        and(
          eq(limitedDrop.isActive, true),
          eq(limitedDrop.isSoldOut, false),
          gte(limitedDrop.endDate, now),
          gte(limitedDrop.startDate, now),
        ),
      )
      .orderBy(desc(limitedDrop.startDate));

    // Calculate additional data for each drop
    const dropsWithDetails = drops.map((drop) => ({
      ...drop,
      percentSold: Math.round(
        ((drop.quantity - drop.quantityRemaining) / drop.quantity) * 100,
      ),
      isVipEarlyAccess: drop.vipEarlyAccess && drop.startDate > now,
      timeRemaining: drop.endDate.getTime() - now.getTime(),
    }));

    return NextResponse.json({
      success: true,
      data: dropsWithDetails,
      count: drops.length,
    });
  } catch (error) {
    console.error("Error fetching active drops:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch active drops" },
      { status: 500 },
    );
  }
}
