import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // 10MB max file size
    },
  },
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const artist = formData.get('artist') as string;
    const description = formData.get('description') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: JPEG, PNG, WebP, GIF' },
        { status: 400 }
      );
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Max size: 10MB' },
        { status: 400 }
      );
    }

    // Create upload directory if it doesn't exist
    const uploadDir = join(process.cwd(), 'public', 'uploads', 'fan-art');
    await mkdir(uploadDir, { recursive: true });

    // Generate unique filename
    const timestamp = Date.now();
    const extension = file.name.split('.').pop();
    const filename = `fan-art-${timestamp}.${extension}`;
    const filepath = join(uploadDir, filename);

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filepath, buffer);

    // TODO: Save to database
    // await db.fanArt.create({
    //   data: {
    //     title,
    //     artist,
    //     description,
    //     imageUrl: `/uploads/fan-art/${filename}`,
    //     status: 'pending', // pending, approved, rejected
    //   },
    // });

    // In production, send to moderation queue
    // For now, just return success
    return NextResponse.json({
      success: true,
      message: 'Artwork uploaded successfully! Awaiting moderation.',
      data: {
        filename,
        url: `/uploads/fan-art/${filename}`,
        size: file.size,
        type: file.type,
      },
    });
  } catch (error) {
    console.error('Fan art upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload artwork' },
      { status: 500 }
    );
  }
}

// GET endpoint to fetch all fan art
export async function GET(request: NextRequest) {
  try {
    // TODO: Fetch from database
    // const fanArt = await db.fanArt.findMany({
    //   where: { status: 'approved' },
    //   orderBy: { createdAt: 'desc' },
    // });

    // Mock data for now
    const mockFanArt = [
      {
        id: 1,
        title: 'The Drinkers Concert Poster',
        artist: 'Marko M.',
        description: 'My artwork for the upcoming tour',
        imageUrl: '/uploads/fan-art/fan-art-1.jpg',
        likes: 42,
        createdAt: '2026-03-20',
      },
      {
        id: 2,
        title: 'Pijemo ga radi Illustration',
        artist: 'Ana K.',
        description: 'Inspired by the classic hit',
        imageUrl: '/uploads/fan-art/fan-art-2.jpg',
        likes: 38,
        createdAt: '2026-03-19',
      },
      {
        id: 3,
        title: 'Band Portrait',
        artist: 'Peter S.',
        description: 'Digital painting of the band',
        imageUrl: '/uploads/fan-art/fan-art-3.jpg',
        likes: 56,
        createdAt: '2026-03-18',
      },
    ];

    return NextResponse.json({
      success: true,
      data: mockFanArt,
    });
  } catch (error) {
    console.error('Fan art fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch fan art' },
      { status: 500 }
    );
  }
}
