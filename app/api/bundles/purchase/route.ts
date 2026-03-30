import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { bundle, product } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

/**
 * POST /api/bundles/purchase
 * Purchase a bundle
 */
export async function POST(request: NextRequest) {
  try {
    const authSession = await auth.api.getSession({
      headers: request.headers,
    });

    if (!authSession?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Sign in required to purchase bundles" },
        { status: 401 },
      );
    }

    const { bundleId } = await request.json();
    const origin =
      request.headers.get("origin") ||
      process.env.NEXT_PUBLIC_APP_URL ||
      process.env.BETTER_AUTH_URL ||
      "";

    if (!bundleId) {
      return NextResponse.json(
        { success: false, error: "Bundle ID required" },
        { status: 400 },
      );
    }

    if (!origin) {
      return NextResponse.json(
        { success: false, error: "Application URL is not configured" },
        { status: 500 },
      );
    }

    // Get bundle details
    const [bundleData] = await db
      .select()
      .from(bundle)
      .where(eq(bundle.id, bundleId));

    if (!bundleData) {
      return NextResponse.json(
        { success: false, error: "Bundle not found" },
        { status: 404 },
      );
    }

    // Check if bundle is active
    if (!bundleData.active) {
      return NextResponse.json(
        { success: false, error: "Bundle is not active" },
        { status: 400 },
      );
    }

    // Check if products exist
    if (!bundleData.products || bundleData.products.length === 0) {
      return NextResponse.json(
        { success: false, error: "Bundle sold out" },
        { status: 400 },
      );
    }

    const bundleProductIds = bundleData.products.filter(Boolean);
    const bundleProducts = await Promise.all(
      bundleProductIds.map(async (productId) => {
        const [productData] = await db
          .select({
            id: product.id,
            name: product.name,
            stock: product.stock,
            active: product.active,
            images: product.images,
          })
          .from(product)
          .where(eq(product.id, productId))
          .limit(1);

        return productData;
      }),
    );

    const unavailableProduct = bundleProducts.find(
      (productData) =>
        !productData || !productData.active || productData.stock < 1,
    );

    if (
      unavailableProduct ||
      bundleProducts.length !== bundleProductIds.length
    ) {
      return NextResponse.json(
        { success: false, error: "Bundle is currently unavailable" },
        { status: 409 },
      );
    }

    const primaryBundleImage = bundleProducts
      .flatMap((productData) => productData?.images || [])
      .find(Boolean);
    const bundleImageUrl =
      primaryBundleImage && primaryBundleImage.startsWith("/")
        ? `${origin}${primaryBundleImage}`
        : primaryBundleImage?.startsWith("http")
          ? primaryBundleImage
          : undefined;

    // Create Stripe checkout session
    const lineItems = [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: `Bundle: ${bundleData.name}`,
            description: bundleData.description || undefined,
            images: bundleImageUrl ? [bundleImageUrl] : [],
          },
          unit_amount: Math.round(parseFloat(bundleData.price) * 100),
        },
        quantity: 1,
      },
    ];

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/bundles`,
      client_reference_id: authSession.user.id,
      metadata: {
        bundleId,
        userId: authSession.user.id,
        type: "bundle",
        products: JSON.stringify(bundleData.products),
      },
    });

    return NextResponse.json({
      success: true,
      url: checkoutSession.url,
      sessionId: checkoutSession.id,
    });
  } catch (error) {
    console.error("Error purchasing bundle:", error);
    return NextResponse.json(
      { success: false, error: "Failed to purchase bundle" },
      { status: 500 },
    );
  }
}
