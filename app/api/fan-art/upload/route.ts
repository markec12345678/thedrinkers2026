import { NextRequest, NextResponse } from 'next/server';
import { validateUpload, DEFAULT_FAN_ART_TERMS } from '@/lib/fan-art';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/fan-art/upload
 * Upload fan artwork
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = Array.from(formData.getAll('file'))[0] as unknown as File;
    const title = Array.from(formData.getAll('title'))[0] as string;
    const description = Array.from(formData.getAll('description'))[0] as string;
    const category = Array.from(formData.getAll('category'))[0] as string;
    const agreeToTerms = Array.from(formData.getAll('agreeToTerms'))[0] === 'true';
    const allowAIEnhancement = Array.from(formData.getAll('allowAIEnhancement'))[0] === 'true';
    const merchInterest = Array.from(formData.getAll('merchInterest'))[0] === 'true';

    // Validate file
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const validation = validateUpload(file);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // Validate terms agreement
    if (!agreeToTerms) {
      return NextResponse.json(
        { error: 'Must agree to terms' },
        { status: 400 }
      );
    }

    // TODO: Save file to storage
    // TODO: Create database record
    // TODO: Send to moderation queue

    return NextResponse.json({
      success: true,
      message: 'Artwork submitted for review',
      reviewTime: '24-48 hours',
    });
  } catch (error) {
    console.error('Fan art upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload artwork' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/fan-art
 * Get fan art gallery
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const sortBy = searchParams.get('sort');

    // TODO: Fetch from database
    // For now, return mock data
    const mockData = {
      total: 47,
      approved: 40,
      featured: 12,
      pending: 5,
      artworks: [],
    };

    return NextResponse.json(mockData);
  } catch (error) {
    console.error('Fan art fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch fan art' },
      { status: 500 }
    );
  }
}
