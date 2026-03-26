import { NextRequest, NextResponse } from "next/server";
import { getTourDateById } from "@/lib/db/queries/tour-dates";

/**
 * GET /api/tour-dates/[id]
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const tourDate = await getTourDateById(params.id);

    if (!tourDate) {
      return NextResponse.json(
        { success: false, error: "Tour date not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: tourDate,
    });
  } catch (error) {
    console.error("Error fetching tour date:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch tour date" },
      { status: 500 },
    );
  }
}
