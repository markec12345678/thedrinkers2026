import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { limitedDrop } from "@/lib/db/schema";
import { auth } from "@/lib/auth";

/**
 * POST /api/drops/create
 * Create a new limited edition drop (admin only)
 */
export async function POST(request: NextRequest) {
  try {
    // Check admin authentication
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 403 },
      );
    }

    // TODO: Check if user is admin
    // if (!session.user.isAdmin) {
    //   return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    // }

    const body = await request.json();
    const {
      name,
      description,
      productId,
      quantity,
      price,
      originalPrice,
      startDate,
      endDate,
      vipEarlyAccess,
      vipEarlyAccessHours,
    } = body;

    // Validate required fields
    if (!name || !productId || !quantity || !price || !startDate || !endDate) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start >= end) {
      return NextResponse.json(
        { success: false, error: "End date must be after start date" },
        { status: 400 },
      );
    }

    // Create drop
    const [newDrop] = await db
      .insert(limitedDrop)
      .values({
        name,
        description: description || null,
        productId,
        quantity,
        quantityRemaining: quantity,
        price,
        originalPrice: originalPrice || null,
        startDate: start,
        endDate: end,
        vipEarlyAccess: vipEarlyAccess || false,
        vipEarlyAccessHours: vipEarlyAccessHours || 24,
        isActive: true,
        isSoldOut: false,
      })
      .returning();

    return NextResponse.json({
      success: true,
      data: newDrop,
      message: "Drop created successfully",
    });
  } catch (error) {
    console.error("Error creating drop:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create drop" },
      { status: 500 },
    );
  }
}
