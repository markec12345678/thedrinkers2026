import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { product } from "@/lib/db/schema";

/**
 * POST /api/products
 * Create new product
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.price) {
      return NextResponse.json(
        { success: false, error: "Name and price are required" },
        { status: 400 },
      );
    }

    // Create product
    const [newProduct] = await db
      .insert(product)
      .values({
        id: crypto.randomUUID(),
        name: body.name,
        description: body.description || null,
        price: body.price,
        compareAtPrice: body.compare_at_price || null,
        stock: body.stock || 0,
        sku: body.sku || null,
        category: body.category || null,
        images: body.images ? JSON.stringify(body.images) : null,
        sizes: body.sizes ? JSON.stringify(body.sizes) : null,
        colors: body.colors ? JSON.stringify(body.colors) : null,
        featured: body.featured || false,
        active: body.active !== undefined ? body.active : true,
        metadata: body.metadata ? JSON.stringify(body.metadata) : null,
      })
      .returning();

    return NextResponse.json({
      success: true,
      data: newProduct,
      message: "Product created successfully",
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create product" },
      { status: 500 },
    );
  }
}
