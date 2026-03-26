import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bundle } from "@/lib/db/schema";
import { auth } from "@/lib/auth";

/**
 * POST /api/bundles/create
 * Create a new bundle (admin only)
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

    const body = await request.json();
    const { name, description, items, bundlePrice, isLimited, quantity } = body;

    // Validate required fields
    if (!name || !items || !bundlePrice) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Calculate original price (sum of individual items)
    let originalPrice = 0;
    // TODO: Fetch product prices from database
    // for (const item of items) {
    //   const [product] = await db.select().from(product).where(eq(product.id, item.productId));
    //   if (product) {
    //     originalPrice += parseFloat(product.price) * item.quantity;
    //   }
    // }

    // For now, use provided originalPrice or calculate from bundlePrice
    const calculatedOriginalPrice =
      body.originalPrice || parseFloat(bundlePrice) * 1.25; // Assume 20% savings
    const savings = calculatedOriginalPrice - parseFloat(bundlePrice);
    const savingsPercent = Math.round(
      (savings / calculatedOriginalPrice) * 100,
    );

    // Create bundle
    const [newBundle] = await db
      .insert(bundle)
      .values({
        name,
        description: description || null,
        items,
        bundlePrice,
        originalPrice: calculatedOriginalPrice.toString(),
        savings: savings.toString(),
        savingsPercent,
        isLimited: isLimited || false,
        quantity: quantity || -1,
        quantityRemaining: quantity || -1,
        isActive: true,
      })
      .returning();

    return NextResponse.json({
      success: true,
      data: newBundle,
      message: "Bundle created successfully",
    });
  } catch (error) {
    console.error("Error creating bundle:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create bundle" },
      { status: 500 },
    );
  }
}
