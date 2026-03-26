import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { dropWaitlist } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

/**
 * POST /api/drops/waitlist
 * Join waitlist for a sold-out drop
 */
export async function POST(request: NextRequest) {
  try {
    const { dropId, email, userId } = await request.json();

    if (!dropId || !email) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 },
      );
    }

    // Check if already on waitlist
    const [existing] = await db
      .select()
      .from(dropWaitlist)
      .where(
        and(eq(dropWaitlist.dropId, dropId), eq(dropWaitlist.email, email)),
      );

    if (existing) {
      return NextResponse.json({
        success: true,
        message: "Already on waitlist",
        data: existing,
      });
    }

    // Add to waitlist
    const [newEntry] = await db
      .insert(dropWaitlist)
      .values({
        dropId,
        email,
        userId: userId || null,
        notifiedAt: null,
      })
      .returning();

    return NextResponse.json({
      success: true,
      data: newEntry,
      message: "Added to waitlist successfully",
    });
  } catch (error) {
    console.error("Error joining waitlist:", error);
    return NextResponse.json(
      { success: false, error: "Failed to join waitlist" },
      { status: 500 },
    );
  }
}
