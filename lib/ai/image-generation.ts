/**
 * AI Image Generation Service
 * Supports: HuggingFace (FREE), Pollinations.ai (FREE), inference.sh (Premium)
 */

import {
  AIImageGenerationRequest,
  AIImageGenerationResponse,
} from "@/lib/types/ai";

// HuggingFace Inference API (FREE tier - 10k requests/month)
const HUGGINGFACE_BASE_URL = "https://api-inference.huggingface.co/models/";

// Pollinations.ai API (FREE, no auth required)
const POLLINATIONS_BASE_URL = "https://image.pollinations.ai/prompt/";

// Convert aspect ratio to pixels
function aspectToPixels(aspect: string): { width: number; height: number } {
  const ratios: Record<string, { width: number; height: number }> = {
    "1:1": { width: 1024, height: 1024 },
    "16:9": { width: 1920, height: 1080 },
    "9:16": { width: 1080, height: 1920 },
    "4:3": { width: 1024, height: 768 },
    "3:4": { width: 768, height: 1024 },
    "2:3": { width: 800, height: 1200 },
    "3:2": { width: 1200, height: 800 },
  };
  return ratios[aspect] || { width: 1024, height: 1024 };
}

/**
 * Generate image using HuggingFace Inference API (FREE - 10k/month)
 * Uses FLUX.1-dev model - high quality image generation
 */
export async function generateImageHuggingFace(
  request: AIImageGenerationRequest,
): Promise<AIImageGenerationResponse> {
  try {
    const apiKey = process.env.HUGGINGFACE_API_KEY;

    if (!apiKey) {
      // Fallback to Pollinations if no API key
      console.log("[HuggingFace] No API key, falling back to Pollinations");
      return generateImagePollinations(request);
    }

    const { width, height } = aspectToPixels(request.aspect || "1:1");

    // Build enhanced prompt
    let fullPrompt = request.prompt;
    if (request.style) {
      fullPrompt += `, ${request.style} style`;
    }
    if (request.mood) {
      fullPrompt += `, ${request.mood} mood`;
    }
    fullPrompt += ", high quality, detailed, professional, 4k";

    console.log("[HuggingFace] Generating with prompt:", fullPrompt);

    const response = await fetch(
      `${HUGGINGFACE_BASE_URL}black-forest-labs/FLUX.1-dev`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: fullPrompt,
          parameters: {
            width,
            height,
            guidance_scale: 3.5,
            num_inference_steps: 25,
          },
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[HuggingFace] API error:", response.status, errorText);
      throw new Error(`HuggingFace API error: ${response.statusText}`);
    }

    // HuggingFace returns image as blob
    const blob = await response.blob();
    const base64 = await blobToBase64(blob);
    const imageUrl = `data:image/png;base64,${base64}`;

    console.log("[HuggingFace] Image generated successfully");

    return {
      success: true,
      imageUrl,
      imageId: `hf-flux-${Date.now()}`,
      prompt: fullPrompt,
      model: "black-forest-labs/FLUX.1-dev",
      aspect: request.aspect || "1:1",
      generatedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error(
      "[HuggingFace] Generation failed, falling back to Pollinations:",
      error,
    );
    // Fallback to Pollinations on error
    return generateImagePollinations(request);
  }
}

// Helper function to convert blob to base64
function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
}

/**
 * Generate image using Pollinations.ai (FREE)
 */
export async function generateImagePollinations(
  request: AIImageGenerationRequest,
): Promise<AIImageGenerationResponse> {
  try {
    const { width, height } = aspectToPixels(request.aspect || "1:1");
    const seed = Math.floor(Math.random() * 10000);

    // Build enhanced prompt with style and mood - sanitize for URL
    let fullPrompt = request.prompt;
    if (request.style) {
      fullPrompt += ` ${request.style} style`;
    }
    if (request.mood) {
      fullPrompt += ` ${request.mood} mood`;
    }
    fullPrompt += ", high quality, detailed, professional artwork";

    // Remove special characters that break URL encoding
    const sanitizedPrompt = fullPrompt
      .replace(/[#%&{}\\<>*?/$!'":@`^|+=[\]]/g, "")
      .replace(/\s+/g, "_");

    // Pollinations.ai URL format - use path-based URL
    const imageUrl = `${POLLINATIONS_BASE_URL}${sanitizedPrompt}?width=${width}&height=${height}&seed=${seed}&model=flux&nologo=true`;

    console.log("[Pollinations] Generating image with URL:", imageUrl);

    return {
      success: true,
      imageUrl,
      imageId: `pollinations-${Date.now()}-${seed}`,
      prompt: fullPrompt,
      model: "pollinations-flux",
      aspect: request.aspect || "1:1",
      generatedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("[Pollinations] Error:", error);
    return {
      success: false,
      prompt: request.prompt,
      model: "pollinations-flux",
      aspect: request.aspect || "1:1",
      generatedAt: new Date().toISOString(),
      error:
        error instanceof Error ? error.message : "Failed to generate image",
    };
  }
}

/**
 * Generate image using inference.sh CLI (Premium quality)
 * Requires: curl -fsSL https://cli.inference.sh | sh && infsh login
 */
export async function generateImageInferenceSh(
  request: AIImageGenerationRequest,
): Promise<AIImageGenerationResponse> {
  try {
    const { execSync } = require("child_process");
    const fs = require("fs");
    const path = require("path");

    // Map aspect ratio to inference.sh format
    const aspectMap: Record<string, string> = {
      "1:1": "square",
      "16:9": "landscape",
      "9:16": "portrait",
      "4:3": "standard",
      "3:4": "vertical",
      "2:3": "poster",
      "3:2": "wide",
    };

    const model =
      request.model === "seedream"
        ? "bytedance/seedream-4-5"
        : request.model === "gemini"
          ? "google/gemini-3-pro-image-preview"
          : "falai/flux-dev-lora";

    const outputPath = path.join(
      process.cwd(),
      "public",
      "images",
      "ai-generated",
      "temp",
      `ai-${Date.now()}.jpg`,
    );

    // Ensure directory exists
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const command = `infsh app run ${model} --input '${JSON.stringify({
      prompt: request.prompt,
      aspect_ratio: aspectMap[request.aspect || "1:1"],
    }).replace(/'/g, "'\\''")}' --output "${outputPath}"`;

    execSync(command, { stdio: "pipe" });

    const imageUrl = outputPath.replace(process.cwd(), "").replace(/\\/g, "/");

    return {
      success: true,
      imageUrl,
      imageId: `inference-${Date.now()}`,
      prompt: request.prompt,
      model: model,
      aspect: request.aspect || "1:1",
      generatedAt: new Date().toISOString(),
    };
  } catch (error) {
    return {
      success: false,
      prompt: request.prompt,
      model: "inference-sh",
      aspect: request.aspect || "1:1",
      generatedAt: new Date().toISOString(),
      error:
        error instanceof Error
          ? error.message
          : "Failed to generate image with inference.sh",
    };
  }
}

/**
 * Main generation function - chooses provider based on request
 */
export async function generateAIImage(
  request: AIImageGenerationRequest,
): Promise<AIImageGenerationResponse> {
  // PRIORITY 1: Use HuggingFace if API key is provided (FREE 10k/month, high quality)
  if (request.model === "huggingface" && process.env.HUGGINGFACE_API_KEY) {
    console.log("[generateAIImage] Using HuggingFace (API key available)");
    return generateImageHuggingFace(request);
  }

  // PRIORITY 2: Use inference.sh for premium models (requires login)
  if (request.model === "seedream" || request.model === "gemini") {
    console.log("[generateAIImage] Using inference.sh (premium)");
    return generateImageInferenceSh(request);
  }

  // PRIORITY 3: Use HuggingFace even without explicit request (if API key exists)
  if (process.env.HUGGINGFACE_API_KEY) {
    console.log("[generateAIImage] Using HuggingFace (default with API key)");
    return generateImageHuggingFace(request);
  }

  // FALLBACK: Use Pollinations (FREE, no API key needed, but CORS issues)
  console.log("[generateAIImage] Using Pollinations (fallback, no API key)");
  return generateImagePollinations(request);
}

/**
 * Generate multiple images in batch
 */
export async function generateBatchImages(
  requests: AIImageGenerationRequest[],
): Promise<AIImageGenerationResponse[]> {
  const results: AIImageGenerationResponse[] = [];

  for (const request of requests) {
    const result = await generateAIImage(request);
    results.push(result);

    // Small delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  return results;
}

/**
 * The Drinkers specific prompts
 */
export const TheDrinkersPrompts = {
  album: [
    "Professional rock album cover for The Drinkers Slovenian rock band, crimson red and black color scheme, minimalist design, beer glass silhouette, modern typography space, high contrast studio lighting, 4K quality",
    "Vintage rock album artwork, crimson red wine glass on black background, The Drinkers band logo, Slovenian rock aesthetic, dramatic lighting",
    "Revolution-themed album cover, beer revolution concept, crimson red and silver colors, bold typography, high quality album artwork",
  ],
  band: [
    "Professional rock band promotional photo, 5 musicians on stage with instruments, dramatic crimson red stage lighting, energetic performance, concert atmosphere, photorealistic",
    "The Drinkers live in concert, crowd surfing, energetic rock show, crimson stage lights, beer mugs in air, professional concert photography",
  ],
  social: [
    "Instagram square post for rock concert announcement, crimson red and black color scheme, guitar and beer mug composition, modern social media aesthetic",
    "Twitter header banner for rock band, crimson red gradient background, musical notes and beer icons, professional social media design",
  ],
  merch: [
    "Black t-shirt mockup with The Drinkers band logo, crimson red print, professional product photography, white background",
    "Custom beer mug with The Drinkers logo engraved, crimson red design, professional product shot, studio lighting",
  ],
  poster: [
    "Concert tour poster for The Drinkers 2026 Slovenian tour, bold text THE DRINKERS, tour dates, crimson red and black color scheme, vintage rock poster aesthetic",
  ],
};

/**
 * Get random prompt from category
 */
export function getRandomPrompt(
  category: keyof typeof TheDrinkersPrompts,
): string {
  const prompts = TheDrinkersPrompts[category];
  return prompts[Math.floor(Math.random() * prompts.length)];
}
