import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { limitedDrop } from "@/lib/db/schema";
import { requireAdminApiAccess } from "@/lib/auth-utils";

/**
 * POST /api/drops/create
 * Create a new limited edition drop (admin only)
 */
export async function POST(request: NextRequest) {
  try {
    const adminAccess = await requireAdminApiAccess(request.headers);
    if ("response" in adminAccess) {
      return adminAccess.response;
    }

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

    const vipEarlyAccessWindowHours =
      typeof vipEarlyAccessHours === "number" && vipEarlyAccessHours > 0
        ? vipEarlyAccessHours
        : 24;
    const vipEarlyAccessDate = vipEarlyAccess
      ? new Date(start.getTime() - vipEarlyAccessWindowHours * 60 * 60 * 1000)
      : null;

    // Create drop
    const [newDrop] = await db
      .insert(limitedDrop)
      .values({
        name,
        description: description || null,
        quantityTotal: quantity,
        quantityRemaining: quantity,
        price,
        releaseDate: start,
        endDate: end,
        vipEarlyAccess: vipEarlyAccess || false,
        vipEarlyAccessDate,
        active: true,
        soldOut: false,
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
