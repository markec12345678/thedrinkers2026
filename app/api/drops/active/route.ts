import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { limitedDrop, dropEntry, dropWaitlist } from "@/lib/db/schema";
import { eq, and, gte, lte, desc, or, isNull } from "drizzle-orm";

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
          eq(limitedDrop.active, true),
          eq(limitedDrop.soldOut, false),
          or(isNull(limitedDrop.endDate), gte(limitedDrop.endDate, now)),
          or(
            lte(limitedDrop.releaseDate, now),
            and(
              eq(limitedDrop.vipEarlyAccess, true),
              lte(limitedDrop.vipEarlyAccessDate, now),
            ),
          ),
        ),
      )
      .orderBy(desc(limitedDrop.releaseDate));

    // Calculate additional data for each drop
    const dropsWithDetails = drops.map((drop) => ({
      ...drop,
      vipEarlyAccessDate:
        drop.vipEarlyAccessDate ||
        (drop.vipEarlyAccess
          ? new Date(drop.releaseDate.getTime() - 24 * 60 * 60 * 1000)
          : null),
      percentSold: Math.round(
        ((drop.quantityTotal - drop.quantityRemaining) / drop.quantityTotal) *
          100,
      ),
      isVipEarlyAccess:
        drop.vipEarlyAccess &&
        now < drop.releaseDate &&
        now >=
          (drop.vipEarlyAccessDate ||
            new Date(drop.releaseDate.getTime() - 24 * 60 * 60 * 1000)),
      timeRemaining: drop.endDate
        ? drop.endDate.getTime() - now.getTime()
        : null,
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
