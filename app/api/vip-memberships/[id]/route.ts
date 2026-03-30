import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { vipMembership, vipTier } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { requireAdminApiAccess } from "@/lib/auth-utils";

/**
 * PUT /api/vip-memberships/[id]
 * Update VIP membership by ID
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

    // Check if membership exists
    const existing = await db
      .select()
      .from(vipMembership)
      .where(eq(vipMembership.id, id))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        { success: false, error: "VIP membership not found" },
        { status: 404 },
      );
    }

    // Update membership
    const [updated] = await db
      .update(vipMembership)
      .set({
        ...body,
        updatedAt: new Date(),
      })
      .where(eq(vipMembership.id, id))
      .returning();

    return NextResponse.json({
      success: true,
      data: updated,
      message: "VIP membership updated successfully",
    });
  } catch (error) {
    console.error("Error updating VIP membership:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update VIP membership" },
      { status: 500 },
    );
  }
}

/**
 * DELETE /api/vip-memberships/[id]
 * Delete VIP membership by ID
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

    // Check if membership exists
    const existing = await db
      .select()
      .from(vipMembership)
      .where(eq(vipMembership.id, id))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        { success: false, error: "VIP membership not found" },
        { status: 404 },
      );
    }

    // Delete membership
    await db.delete(vipMembership).where(eq(vipMembership.id, id));

    return NextResponse.json({
      success: true,
      message: "VIP membership deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting VIP membership:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete VIP membership" },
      { status: 500 },
    );
  }
}
