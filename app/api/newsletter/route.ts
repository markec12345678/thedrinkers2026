import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Validation schema
const newsletterSchema = z.object({
  email: z.string().email('Neveljaven email naslov'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = newsletterSchema.parse(body);

    // TODO: Integrate with email service (SendGrid, Mailchimp, etc.)
    // For now, we'll simulate a successful subscription
    
    console.log('Newsletter subscription:', email);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json(
      { 
        success: true, 
        message: 'Uspešno ste se prijavili na novice!' 
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Neveljaven email naslov',
          errors: error.errors 
        },
        { status: 400 }
      );
    }

    console.error('Newsletter error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Prišlo je do napake. Poskusite znova.' 
      },
      { status: 500 }
    );
  }
}
