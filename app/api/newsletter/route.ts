import { NextRequest, NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!email || !EMAIL_PATTERN.test(email)) {
      return NextResponse.json(
        { success: false, error: "Veljaven email je obvezen." },
        { status: 400 },
      );
    }

    // Newsletter storage/delivery is not wired to a persistent provider yet.
    // Never report success while the subscription has not actually been stored.
    return NextResponse.json(
      {
        success: false,
        error: "Prijava na newsletter trenutno ni na voljo.",
      },
      { status: 503 },
    );
  } catch (error) {
    console.error("Error subscribing:", error);
    return NextResponse.json(
      { success: false, error: "Prijava ni uspela." },
      { status: 500 },
    );
  }
}
