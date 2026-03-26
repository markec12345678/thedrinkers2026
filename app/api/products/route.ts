import { NextRequest, NextResponse } from "next/server";
import { getProducts, getProductById } from "@/lib/db/queries/products";

/**
 * GET /api/products
 *
 * Query params:
 * - category?: string
 * - featured?: boolean
 * - limit?: number (default: 10)
 * - offset?: number (default: 0)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const params = {
      category: searchParams.get("category") || undefined,
      featured: searchParams.get("featured") === "true",
      limit: parseInt(searchParams.get("limit") || "10"),
      offset: parseInt(searchParams.get("offset") || "0"),
    };

    const products = await getProducts(params);

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
 *
 * Body:
 * - name: string
 * - description?: string
 * - price: string
 * - compare_at_price?: string
 * - stock: number
 * - sku?: string
 * - category?: string
 * - images?: string[]
 * - sizes?: string[]
 * - colors?: string[]
 * - featured?: boolean
 * - active?: boolean
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

    // TODO: Add product to database
    // For now, return not implemented
    return NextResponse.json(
      { success: false, error: "Not implemented" },
      { status: 501 },
    );
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create product" },
      { status: 500 },
    );
  }
}
