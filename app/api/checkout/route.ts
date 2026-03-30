import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getProductById } from "@/lib/db/queries/products";
import { getMembershipByDiscountCode } from "@/lib/db/queries/memberships";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

// Types
interface CartItem {
  productId: string;
  size: string;
  quantity: number;
}

interface CheckoutRequest {
  items: CartItem[];
  discountCode?: string;
}

interface CheckoutResponse {
  success: boolean;
  url?: string;
  sessionId?: string;
  error?: string;
}

/**
 * POST /api/checkout
 *
 * Create Stripe Checkout Session
 *
 * Body:
 * - items: Array<{
 *     productId: string,
 *     size: string,
 *     quantity: number
 *   }>
 * - discountCode?: string
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, discountCode } = body as CheckoutRequest;
    const origin =
      request.headers.get("origin") ||
      process.env.NEXT_PUBLIC_APP_URL ||
      process.env.BETTER_AUTH_URL ||
      "";

    if (!origin) {
      return NextResponse.json<CheckoutResponse>(
        { success: false, error: "Application URL is not configured" },
        { status: 500 },
      );
    }

    // Validate items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json<CheckoutResponse>(
        { success: false, error: "No items in cart" },
        { status: 400 },
      );
    }

    const validatedItems = await Promise.all(
      items.map(async (item) => {
        if (
          !item.productId ||
          !item.size ||
          !Number.isInteger(item.quantity) ||
          item.quantity < 1
        ) {
          throw new Error("Invalid cart item");
        }

        const product = await getProductById(item.productId);
        if (!product || !product.active) {
          throw new Error(`Product ${item.productId} is unavailable`);
        }

        if (product.stock < item.quantity) {
          throw new Error(`${product.name} does not have enough stock`);
        }

        const primaryImage = Array.isArray(product.images)
          ? product.images[0]
          : undefined;
        const imageUrl =
          primaryImage && primaryImage.startsWith("/") && origin
            ? `${origin}${primaryImage}`
            : primaryImage?.startsWith("http")
              ? primaryImage
              : undefined;

        return {
          productId: product.id,
          name: product.name,
          description: product.description,
          imageUrl,
          size: item.size,
          quantity: item.quantity,
          unitAmount: Math.round(parseFloat(product.price) * 100),
        };
      }),
    );

    let discountPercentage = 0;
    let normalizedDiscountCode: string | undefined;

    if (discountCode?.trim()) {
      normalizedDiscountCode = discountCode.trim().toUpperCase();
      const membership = await getMembershipByDiscountCode(
        normalizedDiscountCode,
      );

      if (
        !membership ||
        !membership.discountPercentage ||
        membership.discountPercentage <= 0
      ) {
        return NextResponse.json<CheckoutResponse>(
          { success: false, error: "Invalid discount code" },
          { status: 400 },
        );
      }

      discountPercentage = membership.discountPercentage;
    }

    // Create line items for Stripe from server-side data
    const lineItems = validatedItems.map((item) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: `${item.name} (Size: ${item.size})`,
          description: item.description || undefined,
          images: item.imageUrl ? [item.imageUrl] : [],
          metadata: {
            productId: item.productId,
            size: item.size,
          },
        },
        unit_amount:
          discountPercentage > 0
            ? Math.round((item.unitAmount * (100 - discountPercentage)) / 100)
            : item.unitAmount,
      },
      quantity: item.quantity,
    }));

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart?abandoned=1`,
      metadata: {
        items: JSON.stringify(
          validatedItems.map(({ productId, size, quantity }) => ({
            productId,
            size,
            quantity,
          })),
        ),
        discountCode: normalizedDiscountCode || "",
        discountPercentage: discountPercentage.toString(),
      },
      shipping_address_collection: {
        allowed_countries: [
          "SI",
          "AT",
          "DE",
          "IT",
          "FR",
          "NL",
          "BE",
          "HR",
          "SK",
          "CZ",
          "PL",
          "HU",
        ],
      },
      phone_number_collection: {
        enabled: true,
      },
    });

    return NextResponse.json<CheckoutResponse>({
      success: true,
      url: session.url || undefined,
      sessionId: session.id,
    });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to create checkout session";
    return NextResponse.json<CheckoutResponse>(
      { success: false, error: errorMessage },
      { status: 500 },
    );
  }
}
