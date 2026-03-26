import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { tourDate } from "@/lib/db/schema";

/**
 * POST /api/tour-dates
 * Create new tour date
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

    // Create tour date
    const [newTourDate] = await db
      .insert(tourDate)
      .values({
        id: crypto.randomUUID(),
        tourName: body.tour_name || null,
        venue: body.venue,
        city: body.city,
        state: body.state || null,
        country: body.country,
        date: body.date,
        time: body.time || null,
        doors: body.doors || null,
        ticketUrl: body.ticket_url || null,
        ticketUrlLocal: body.ticket_url_local || null,
        ticketPrice: body.ticket_price || null,
        ticketPriceMin: body.ticket_price_min || null,
        ticketPriceMax: body.ticket_price_max || null,
        status: body.status || "announced",
        capacity: body.capacity || null,
        soldTickets: body.sold_tickets || 0,
        supportActs: body.support_acts
          ? JSON.stringify(body.support_acts)
          : null,
        ageRestriction: body.age_restriction || null,
        vipAvailable: body.vip_available || false,
        vipDescription: body.vip_description || null,
        featured: body.featured || false,
        active: body.active !== undefined ? body.active : true,
        notes: body.notes || null,
      })
      .returning();

    return NextResponse.json({
      success: true,
      data: newTourDate,
      message: "Tour date created successfully",
    });
  } catch (error) {
    console.error("Error creating tour date:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create tour date" },
      { status: 500 },
    );
  }
}
