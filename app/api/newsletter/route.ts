import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name } = body;

    if (!email || !name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // TODO: Save to database
    // await db.newsletter.create({ data: { email, name } });

    // Send confirmation email
    await resend.emails.send({
      from: 'The Drinkers <noreply@thedrinkers.si>',
      to: email,
      subject: 'Dobrodošel v The Drinkers Newsletter!',
      html: `
        <h1>Hvala za prijavo! 🍺</h1>
        <p>Pozdravljen ${name},</p>
        <p>Hvala, da si se pridružil The Drinkers newsletterju! Zdaj boš prvi izvedel za:</p>
        <ul>
          <li>🎸 Nove koncerte in turneje</li>
          <li>🎵 Nove pesmi in albume</li>
          <li>👕 Ekskluzivne merchandise popuste</li>
          <li>🎉 Posebne dogodke in presenečenja</li>
        </ul>
        <p>Na zdravje!</p>
        <p><strong>The Drinkers Team</strong></p>
        <hr/>
        <p style="font-size: 12px; color: #666;">
          Če se želiš odjaviti, klikni <a href="${process.env.NEXT_PUBLIC_SITE_URL}/unsubscribe?email=${encodeURIComponent(email)}">tukaj</a>.
        </p>
      `,
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Prijavljen na newsletter!' 
    });
  } catch (error) {
    console.error('Newsletter signup error:', error);
    return NextResponse.json(
      { error: 'Failed to signup for newsletter' },
      { status: 500 }
    );
  }
}
