import { NextRequest, NextResponse } from "next/server";
import { generateAIImage } from "@/lib/ai/image-generation";
import { enhancePrompt } from "@/lib/ai/prompt-enhancer";
import {
  AIImageGenerationRequest,
  AIImageGenerationResponse,
} from "@/lib/types/ai";
import { requireAdminApiAccess } from "@/lib/auth-utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/ai/generate
 * Generate AI image(s) from prompt (single or batch)
 * Admin only endpoint - requires authentication
 */
export async function POST(request: NextRequest) {
  try {
    const adminAccess = await requireAdminApiAccess(request.headers);
    if ("response" in adminAccess) {
      return adminAccess.response;
    }

    const body = await request.json();
    const startTime = Date.now();

    // Validate request
    if (!body.prompt || typeof body.prompt !== "string") {
      return NextResponse.json(
        {
          success: false,
          error: "Prompt is required and must be a string",
        },
        { status: 400 },
      );
    }

    // Parse batch parameters
    const quantity = Math.min(Math.max(parseInt(body.quantity) || 1, 1), 6); // 1-6
    const mode = body.mode === "variations" ? "variations" : "same";
    const isBatchMode = quantity > 1;
    const enhancePromptFlag =
      body.enhancePrompt === true || body.enhancePrompt === "true";

    const baseRequest: AIImageGenerationRequest = {
      prompt: body.prompt,
      category: body.category || "fan-art",
      aspect: body.aspect || "1:1",
      model: body.model || "pollinations-free",
      style: body.style || "realistic",
    };

    // Validate category
    const validCategories = [
      "album",
      "band",
      "social",
      "merch",
      "poster",
      "fan-art",
    ];
    if (!validCategories.includes(baseRequest.category)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid category. Must be one of: ${validCategories.join(", ")}`,
        },
        { status: 400 },
      );
    }

    // Enhance prompt if requested
    let enhancementInfo: any = null;
    let finalPrompt = body.prompt;
    if (enhancePromptFlag) {
      try {
        enhancementInfo = await enhancePrompt({
          originalPrompt: body.prompt,
          category: baseRequest.category as any,
          style: baseRequest.style,
          mood: body.mood,
        });
        finalPrompt = enhancementInfo.enhancedPrompt;
      } catch (error) {
        console.error("[AI Generate] Prompt enhancement error:", error);
        // Continue with original prompt if enhancement fails
      }
    }

    // Update baseRequest with final (possibly enhanced) prompt
    baseRequest.prompt = finalPrompt;

    // Single image generation
    if (!isBatchMode) {
      const result = await generateAIImage(baseRequest);
      if (!result.success) {
        return NextResponse.json(
          { ...result, enhancementInfo },
          { status: 500 },
        );
      }
      return NextResponse.json({ ...result, enhancementInfo }, { status: 200 });
    }

    // Batch generation
    let generationRequests: AIImageGenerationRequest[] = [];

    if (mode === "same") {
      // Generate 'quantity' images with same settings (parallel)
      generationRequests = Array(quantity)
        .fill(null)
        .map(() => ({ ...baseRequest }));
    } else if (mode === "variations") {
      // Generate images with different variation configs
      const configs = body.variationConfigs || [];
      const requestedQuantity = Math.min(configs.length || quantity, quantity);

      if (configs.length > 0) {
        generationRequests = configs
          .slice(0, requestedQuantity)
          .map((config: any) => ({
            ...baseRequest,
            prompt: config.prompt || baseRequest.prompt,
            style: config.style || baseRequest.style,
          }));
      } else {
        // Fallback: if no configs provided, generate 'quantity' with same settings
        generationRequests = Array(quantity)
          .fill(null)
          .map(() => ({ ...baseRequest }));
      }
    }

    // Parallel image generation using Promise.all
    const images = await Promise.all(
      generationRequests.map((req) => generateAIImage(req)),
    );

    const totalTime = Date.now() - startTime;
    const batchId = `batch-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const successCount = images.filter((img) => img.success).length;

    return NextResponse.json(
      {
        success: successCount > 0,
        images,
        batchId,
        totalTime,
        quantity,
        mode,
        successCount,
        failureCount: images.length - successCount,
        enhancementInfo,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[AI Generate API] Error:", error);

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
 * GET /api/ai/generate
 * Get available models and presets
 */
export async function GET() {
  const models = [
    {
      id: "pollinations-free",
      name: "Pollinations.ai (FREE)",
      description: "100% free, no API key required, powered by FLUX",
      quality: "high",
      speed: "fast",
      cost: "free",
    },
    {
      id: "flux",
      name: "FLUX Dev LoRA",
      description: "High quality with custom styles via inference.sh",
      quality: "very-high",
      speed: "medium",
      cost: "paid",
    },
    {
      id: "seedream",
      name: "Seedream 4.5",
      description: "2K-4K cinematic quality via inference.sh",
      quality: "ultra",
      speed: "medium",
      cost: "paid",
    },
    {
      id: "gemini",
      name: "Gemini 3 Pro Image",
      description: "Google's latest image generation model",
      quality: "ultra",
      speed: "fast",
      cost: "paid",
    },
  ];

  const aspects = [
    { id: "1:1", name: "Square", use: "Album covers, Instagram posts" },
    { id: "16:9", name: "Landscape", use: "YouTube thumbnails, banners" },
    { id: "9:16", name: "Portrait", use: "TikTok, Instagram Stories" },
    { id: "4:3", name: "Standard", use: "Band photos" },
    { id: "3:4", name: "Vertical", use: "Posters" },
    { id: "2:3", name: "Poster", use: "Concert posters" },
    { id: "3:2", name: "Wide", use: "Facebook covers" },
  ];

  const categories = [
    { id: "album", name: "Album Covers", icon: "💿" },
    { id: "band", name: "Band Photos", icon: "🎸" },
    { id: "social", name: "Social Media", icon: "📱" },
    { id: "merch", name: "Merchandise", icon: "👕" },
    { id: "poster", name: "Posters", icon: "🎫" },
    { id: "fan-art", name: "Fan Art", icon: "🎨" },
  ];

  return NextResponse.json({
    models,
    aspects,
    categories,
    presets: {
      theDrinkers: {
        colors: [
          "Crimson Red (#dc143c)",
          "Black (#0a0a0a)",
          "Silver (#c0c0c0)",
        ],
        elements: ["Beer mugs", "Guitars", "Vinyl records", "Slovenian flag"],
        style: "Rock'n'roll, vintage, high contrast, professional",
      },
    },
  });
}
