import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

export async function GET(request: NextRequest) {
  const sessionId = new URL(request.url).searchParams.get("session_id");

  if (!sessionId || !sessionId.startsWith("cs_")) {
    return NextResponse.json(
      { valid: false, error: "Invalid checkout session." },
      { status: 400 },
    );
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return NextResponse.json({
      valid: session.status === "complete" || session.payment_status === "paid",
      session: {
        id: session.id,
        status: session.status,
        paymentStatus: session.payment_status,
        customerEmail: session.customer_details?.email ?? null,
        amountTotal: session.amount_total,
        currency: session.currency,
      },
    });
  } catch (error) {
    console.error("Stripe session verification failed:", error);
    return NextResponse.json(
      { valid: false, error: "Checkout session could not be verified." },
      { status: 404 },
    );
  }
}
