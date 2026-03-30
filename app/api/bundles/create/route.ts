import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bundle } from "@/lib/db/schema";
import { requireAdminApiAccess } from "@/lib/auth-utils";

/**
 * POST /api/bundles/create
 * Create a new bundle (admin only)
 */
export async function POST(request: NextRequest) {
  try {
    const adminAccess = await requireAdminApiAccess(request.headers);
    if ("response" in adminAccess) {
      return adminAccess.response;
    }

    const body = await request.json();
    const { name, description, products, price, active, featured } = body;

    // Validate required fields
    if (!name || !products || !price) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Create bundle
    const [newBundle] = await db
      .insert(bundle)
      .values({
        name,
        description: description || null,
        price,
        products,
        active: active !== undefined ? active : true,
        featured: featured || false,
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
