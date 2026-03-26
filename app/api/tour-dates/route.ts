import { NextRequest, NextResponse } from "next/server";
import { getTourDates, getTourDateById } from "@/lib/db/queries/tour-dates";

/**
 * GET /api/tour-dates
 *
 * Query params:
 * - status?: 'announced' | 'on_sale' | 'sold_out' | 'completed' | 'cancelled' | 'postponed'
 * - country?: string
 * - featured?: boolean
 * - limit?: number
 * - offset?: number
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const params = {
      status: (searchParams.get("status") as any) || undefined,
      country: searchParams.get("country") || undefined,
      featured: searchParams.get("featured") === "true",
      limit: parseInt(searchParams.get("limit") || "10"),
      offset: parseInt(searchParams.get("offset") || "0"),
    };

    const tourDates = await getTourDates(params);

    return NextResponse.json({
      success: true,
      data: tourDates,
      count: tourDates.length,
    });
  } catch (error) {
    console.error("Error fetching tour dates:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch tour dates" },
      { status: 500 },
    );
  }
}

/**
 * POST /api/tour-dates
 *
 * Body:
 * - venue: string
 * - city: string
 * - country: string
 * - date: string (ISO date)
 * - time?: string
 * - doors?: string
 * - ticket_url?: string
 * - ticket_price?: string
 * - status?: string
 * - capacity?: number
 * - featured?: boolean
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.venue || !body.city || !body.country || !body.date) {
      return NextResponse.json(
        {
          success: false,
          error: "Venue, city, country, and date are required",
        },
        { status: 400 },
      );
    }

    // TODO: Add tour date to database
    // For now, return not implemented
    return NextResponse.json(
      { success: false, error: "Not implemented" },
      { status: 501 },
    );
  } catch (error) {
    console.error("Error creating tour date:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create tour date" },
      { status: 500 },
    );
  }
}
