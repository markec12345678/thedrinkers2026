import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { tourDate } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { requireAdminApiAccess } from "@/lib/auth-utils";

/**
 * PUT /api/tour-dates/[id]
 * Update tour date by ID
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const adminAccess = await requireAdminApiAccess(request.headers);
    if ("response" in adminAccess) {
      return adminAccess.response;
    }

    const body = await request.json();
    const { id } = await params;

    // Check if tour date exists
    const existing = await db
      .select()
      .from(tourDate)
      .where(eq(tourDate.id, id))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        { success: false, error: "Tour date not found" },
        { status: 404 },
      );
    }

    // Update tour date
    const [updated] = await db
      .update(tourDate)
      .set({
        ...body,
        updatedAt: new Date(),
      })
      .where(eq(tourDate.id, id))
      .returning();

    return NextResponse.json({
      success: true,
      data: updated,
      message: "Tour date updated successfully",
    });
  } catch (error) {
    console.error("Error updating tour date:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update tour date" },
      { status: 500 },
    );
  }
}

/**
 * DELETE /api/tour-dates/[id]
 * Delete tour date by ID
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const adminAccess = await requireAdminApiAccess(request.headers);
    if ("response" in adminAccess) {
      return adminAccess.response;
    }

    const { id } = await params;

    // Check if tour date exists
    const existing = await db
      .select()
      .from(tourDate)
      .where(eq(tourDate.id, id))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        { success: false, error: "Tour date not found" },
        { status: 404 },
      );
    }

    // Delete tour date
    await db.delete(tourDate).where(eq(tourDate.id, id));

    return NextResponse.json({
      success: true,
      message: "Tour date deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting tour date:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete tour date" },
      { status: 500 },
    );
  }
}
