import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { album, sql } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

/**
 * GET /api/albums
 *
 * Query params:
 * - featured?: boolean
 * - limit?: number
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const featured = searchParams.get("featured") === "true";
    const limit = parseInt(searchParams.get("limit") || "10");

    let albums;

    if (featured) {
      albums = await db
        .select()
        .from(album)
        .where(sql`featured = true AND active = true`)
        .orderBy(desc(album.releaseDate))
        .limit(limit);
    } else {
      albums = await db
        .select()
        .from(album)
        .where(sql`active = true`)
        .orderBy(desc(album.releaseDate))
        .limit(limit);
    }

    return NextResponse.json({
      success: true,
      data: albums,
      count: albums.length,
    });
  } catch (error) {
    console.error("Error fetching albums:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch albums" },
      { status: 500 },
    );
  }
}

/**
 * POST /api/albums
 *
 * Body:
 * - title: string
 * - artist?: string
 * - release_date: string
 * - cover_image?: string
 * - description?: string
 * - label?: string
 * - genre?: string[]
 * - total_tracks?: number
 * - featured?: boolean
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.title || !body.release_date) {
      return NextResponse.json(
        { success: false, error: "Title and release date are required" },
        { status: 400 },
      );
    }

    // TODO: Add album to database
    // For now, return not implemented
    return NextResponse.json(
      { success: false, error: "Not implemented" },
      { status: 501 },
    );
  } catch (error) {
    console.error("Error creating album:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create album" },
      { status: 500 },
    );
  }
}
