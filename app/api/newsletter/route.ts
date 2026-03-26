import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, type, dropId } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email required" },
        { status: 400 },
      );
    }

    // TODO: Add to database
    // For now, just log
    console.log("Newsletter signup:", { email, type, dropId });

    // TODO: Send confirmation email with Resend
    // await resend.emails.send({
    //   from: 'The Drinkers <noreply@thedrinkers.si>',
    //   to: email,
    //   subject: 'Welcome to The Drinkers!',
    //   html: emailTemplate,
    // });

    return NextResponse.json({
      success: true,
      message: "Subscribed successfully",
    });
  } catch (error) {
    console.error("Error subscribing:", error);
    return NextResponse.json(
      { success: false, error: "Failed to subscribe" },
      { status: 500 },
    );
  }
}
