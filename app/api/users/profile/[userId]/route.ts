import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/users/profile/[userId]
 * Get user profile
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } },
) {
  try {
    // TODO: Implement database query
    // const profile = await db.select().from(userProfile).where(eq(userProfile.userId, params.userId));

    // Mock data for now
    const profile = {
      id: params.userId,
      username: "FanUser123",
      joinDate: "2026-01-15",
      postCount: 47,
      threadCount: 12,
      reputation: 156,
      badges: [
        { id: "1", name: "Early Adopter", icon: "🎉", earnedAt: "2026-01-15" },
        {
          id: "2",
          name: "Active Contributor",
          icon: "💬",
          earnedAt: "2026-02-01",
        },
        { id: "3", name: "Super Fan", icon: "⭐", earnedAt: "2026-03-01" },
      ],
      favoriteBand: "The Drinkers",
      favoriteAlbum: "Midnight Sessions",
      favoriteSong: "Last Call",
      attendedConcerts: 3,
      vipMember: false,
      fanArtSubmissions: 5,
    };

    return NextResponse.json({
      success: true,
      data: profile,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch profile" },
      { status: 500 },
    );
  }
}

/**
 * PUT /api/users/profile/[userId]
 * Update user profile
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { userId: string } },
) {
  try {
    const body = await request.json();
    const { username, favoriteAlbum, favoriteSong } = body;

    // TODO: Add authentication check
    // Verify user is updating their own profile

    // TODO: Update database
    // const [updated] = await db.update(userProfile).set({
    //   username,
    //   favoriteAlbum,
    //   favoriteSong,
    // }).where(eq(userProfile.userId, params.userId)).returning();

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update profile" },
      { status: 500 },
    );
  }
}
