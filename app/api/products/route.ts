import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { product } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { requireAdminApiAccess } from "@/lib/auth-utils";

/**
 * GET /api/products
 * Get all products or filter by category
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");

    let whereClause;
    if (category && featured) {
      whereClause = and(
        eq(product.category, category),
        eq(product.featured, featured === "true"),
      );
    } else if (category) {
      whereClause = eq(product.category, category);
    } else if (featured) {
      whereClause = eq(product.featured, featured === "true");
    }

    const products = await db
      .select()
      .from(product)
      .where(whereClause)
      .orderBy(product.createdAt);

    return NextResponse.json({
      success: true,
      data: products,
      count: products.length,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}

/**
 * POST /api/products
 * Create new product
 */
export async function POST(request: NextRequest) {
  try {
    const adminAccess = await requireAdminApiAccess(request.headers);
    if ("response" in adminAccess) {
      return adminAccess.response;
    }

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
        name: body.name,
        description: body.description || "",
        price: body.price,
        compareAtPrice: body.compare_at_price,
        stock: body.stock || 0,
        sku: body.sku,
        category: body.category,
        images: body.images,
        sizes: body.sizes,
        colors: body.colors,
        featured: body.featured || false,
        active: body.active !== undefined ? body.active : true,
        metadata: body.metadata,
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
