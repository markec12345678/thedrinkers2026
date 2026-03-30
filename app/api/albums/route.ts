import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { album } from "@/lib/db/schema";
import { requireAdminApiAccess } from "@/lib/auth-utils";

/**
 * POST /api/albums
 * Create new album
 */
export async function POST(request: NextRequest) {
  try {
    const adminAccess = await requireAdminApiAccess(request.headers);
    if ("response" in adminAccess) {
      return adminAccess.response;
    }

    const body = await request.json();

    // Validate required fields
    if (!body.title || !body.release_date) {
      return NextResponse.json(
        { success: false, error: "Title and release date are required" },
        { status: 400 },
      );
    }

    // Create album
    const [newAlbum] = await db
      .insert(album)
      .values({
        title: body.title,
        artist: body.artist || null,
        artistId: body.artist_id || null,
        releaseDate: body.release_date,
        coverImage: body.cover_image || null,
        coverImageThumbnail: body.cover_image_thumbnail || null,
        description: body.description || null,
        label: body.label || null,
        genre: body.genre,
        totalTracks: body.total_tracks || 0,
        duration: body.duration || 0,
        tracks: body.tracks,
        spotifyUrl: body.spotify_url || null,
        spotifyId: body.spotify_id || null,
        appleMusicUrl: body.apple_music_url || null,
        appleMusicId: body.apple_music_id || null,
        youtubeUrl: body.youtube_url || null,
        youtubeId: body.youtube_id || null,
        bandcampUrl: body.bandcamp_url || null,
        soundcloudUrl: body.soundcloud_url || null,
        tidalUrl: body.tidal_url || null,
        deezerUrl: body.deezer_url || null,
        amazonMusicUrl: body.amazon_music_url || null,
        featured: body.featured || false,
        active: body.active !== undefined ? body.active : true,
        albumType: body.album_type || "album",
        upc: body.upc || null,
        catalogNumber: body.catalog_number || null,
        copyright: body.copyright || null,
        producers: body.producers || null,
        engineers: body.engineers || null,
        studios: body.studios || null,
        metadata: body.metadata || null,
      })
      .returning();

    return NextResponse.json({
      success: true,
      data: newAlbum,
      message: "Album created successfully",
    });
  } catch (error) {
    console.error("Error creating album:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create album" },
      { status: 500 },
    );
  }
}
