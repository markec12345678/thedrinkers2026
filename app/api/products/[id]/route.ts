import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { product } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { requireAdminApiAccess } from "@/lib/auth-utils";

/**
 * PUT /api/products/[id]
 * Update product by ID
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

    // Validate required fields
    if (!body.name && !body.price) {
      return NextResponse.json(
        {
          success: false,
          error: "At least one field (name or price) is required",
        },
        { status: 400 },
      );
    }

    // Check if product exists
    const existing = await db
      .select()
      .from(product)
      .where(eq(product.id, id))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 },
      );
    }

    // Update product
    const [updated] = await db
      .update(product)
      .set({
        ...body,
        updatedAt: new Date(),
      })
      .where(eq(product.id, id))
      .returning();

    return NextResponse.json({
      success: true,
      data: updated,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update product" },
      { status: 500 },
    );
  }
}

/**
 * DELETE /api/products/[id]
 * Delete product by ID
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

    // Check if product exists
    const existing = await db
      .select()
      .from(product)
      .where(eq(product.id, id))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 },
      );
    }

    // Delete product
    await db.delete(product).where(eq(product.id, id));

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete product" },
      { status: 500 },
    );
  }
}
