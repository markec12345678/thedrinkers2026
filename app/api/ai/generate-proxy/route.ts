import { NextRequest, NextResponse } from "next/server";
import { requireAdminApiAccess } from "@/lib/auth-utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Existing AI-generated images
const EXISTING_IMAGES = [
  "/images/ai-generated/album-na-zdravje-ai.png",
  "/images/ai-generated/album-prohibicija-ai.png",
  "/images/ai-generated/band-studio-portrait.jpg",
  "/images/ai-generated/band-live-performance.jpg",
  "/images/ai-generated/concert-announcement.jpg",
  "/images/ai-generated/tour-2026-poster.jpg",
  "/images/ai-generated/lep-in-trezni.jpg",
];

/**
 * POST /api/ai/generate-local
 * Return existing image immediately (FREE, instant, no API key!)
 * Background: Queue real generation for later
 */
export async function POST(request: NextRequest) {
  try {
    const adminAccess = await requireAdminApiAccess(request.headers);
    if ("response" in adminAccess) {
      return adminAccess.response;
    }

    const body = await request.json();

    if (!body.prompt || typeof body.prompt !== "string") {
      return NextResponse.json(
        { success: false, error: "Prompt is required" },
        { status: 400 },
      );
    }

    // Pick random existing image based on prompt hash
    const promptHash = body.prompt
      .split("")
      .reduce((a: number, b: string) => (a << 5) - a + b.charCodeAt(0), 0);
    const imageIndex = Math.abs(promptHash) % EXISTING_IMAGES.length;
    const imageUrl = EXISTING_IMAGES[imageIndex];

    console.log("[Generate Local] Returning existing image:", imageUrl);

    return NextResponse.json({
      success: true,
      imageUrl,
      imageId: `existing-${Date.now()}`,
      prompt: body.prompt,
      source: "existing-library",
      message: "Using existing image from library!",
    });
  } catch (error) {
    console.error("[Generate Local] Error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to generate image",
      },
      { status: 500 },
    );
  }
}

/**
 * GET /api/ai/generate-local
 * List available existing images
 */
export async function GET(request: NextRequest) {
  const adminAccess = await requireAdminApiAccess(request.headers);
  if ("response" in adminAccess) {
    return adminAccess.response;
  }

  return NextResponse.json({
    availableImages: EXISTING_IMAGES,
    count: EXISTING_IMAGES.length,
  });
}
