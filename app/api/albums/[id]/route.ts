import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { album } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { requireAdminApiAccess } from "@/lib/auth-utils";

/**
 * PUT /api/albums/[id]
 * Update album by ID
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

    // Check if album exists
    const existing = await db
      .select()
      .from(album)
      .where(eq(album.id, id))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        { success: false, error: "Album not found" },
        { status: 404 },
      );
    }

    // Update album
    const [updated] = await db
      .update(album)
      .set({
        ...body,
        updatedAt: new Date(),
      })
      .where(eq(album.id, id))
      .returning();

    return NextResponse.json({
      success: true,
      data: updated,
      message: "Album updated successfully",
    });
  } catch (error) {
    console.error("Error updating album:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update album" },
      { status: 500 },
    );
  }
}

/**
 * DELETE /api/albums/[id]
 * Delete album by ID
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

    // Check if album exists
    const existing = await db
      .select()
      .from(album)
      .where(eq(album.id, id))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        { success: false, error: "Album not found" },
        { status: 404 },
      );
    }

    // Delete album
    await db.delete(album).where(eq(album.id, id));

    return NextResponse.json({
      success: true,
      message: "Album deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting album:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete album" },
      { status: 500 },
    );
  }
}
