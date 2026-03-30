/**
 * Enhanced AI Service with Local Ollama Processing
 * Supports: Local Ollama, Cloud APIs, Hybrid processing
 */

import {
  AIImageGenerationRequest,
  AIImageGenerationResponse,
} from "@/lib/types/ai";

// Ollama local configuration
const OLLAMA_HOST = process.env.OLLAMA_HOST || "http://localhost:11434";
const OLLAMA_MODELS = {
  llama3_2: "llama3.2:latest",
  llava: "llava:latest",
  sd: "stability-ai/stable-diffusion-3",
} as const;

/**
 * Check if Ollama is available locally
 */
export async function checkOllamaStatus(): Promise<boolean> {
  try {
    const response = await fetch(`${OLLAMA_HOST}/api/tags`);
    return response.ok;
  } catch (error) {
    console.log("Ollama not available, falling back to cloud APIs");
    return false;
  }
}

/**
 * Get available Ollama models
 */
export async function getOllamaModels(): Promise<string[]> {
  try {
    const response = await fetch(`${OLLAMA_HOST}/api/tags`);
    const data = await response.json();
    return data.models?.map((model: any) => model.name) || [];
  } catch (error) {
    return [];
  }
}

/**
 * Generate image using local Ollama (if available)
 */
export async function generateImageOllama(
  request: AIImageGenerationRequest,
): Promise<AIImageGenerationResponse> {
  try {
    const isOllamaAvailable = await checkOllamaStatus();

    if (!isOllamaAvailable) {
      throw new Error("Ollama not available locally");
    }

    // Use llava for image generation or fallback to text-based prompt enhancement
    const prompt = enhancePromptForTheDrinkers(request.prompt);

    // For now, we'll use the prompt enhancement with external image generation
    // In the future, when Ollama supports image generation directly
    return await generateImageWithEnhancedPrompt({
      ...request,
      prompt,
    });
  } catch (error) {
    console.log("Local Ollama generation failed, using cloud fallback");
    return await generateImageFallback(request);
  }
}

/**
 * Enhance prompts using local LLM for better results
 */
export async function enhancePromptWithLLM(
  originalPrompt: string,
  context: "album" | "social" | "merch" | "poster" = "album",
): Promise<string> {
  try {
    const isOllamaAvailable = await checkOllamaStatus();

    if (!isOllamaAvailable) {
      return originalPrompt;
    }

    const contextPrompts = {
      album:
        "Create a professional rock album cover description. Include details about lighting, mood, style, and composition.",
      social:
        "Create an engaging social media image description. Include modern design trends and brand consistency.",
      merch:
        "Create product photography description. Include professional lighting, product placement, and marketing appeal.",
      poster:
        "Create a concert poster description. Include typography, layout, and promotional elements.",
    };

    const enhancedPromptRequest = {
      model: OLLAMA_MODELS.llama3_2,
      prompt: `Enhance this image generation prompt for The Drinkers rock band: "${originalPrompt}". ${contextPrompts[context]} Make it more detailed and professional. Return only the enhanced prompt.`,
      stream: false,
    };

    const response = await fetch(`${OLLAMA_HOST}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enhancedPromptRequest),
    });

    const data = await response.json();
    return data.response || originalPrompt;
  } catch (error) {
    console.log("LLM enhancement failed, using original prompt");
    return originalPrompt;
  }
}

/**
 * The Drinkers specific prompt enhancement
 */
function enhancePromptForTheDrinkers(prompt: string): string {
  const enhancements = [
    "Slovenian rock band The Drinkers aesthetic",
    "crimson red and black color scheme",
    "professional rock photography style",
    "high quality studio lighting",
    "beer and rock culture elements",
    "modern typography with vintage feel",
  ];

  return `${prompt}. ${enhancements.join(", ")}. Professional quality, 4K resolution.`;
}

/**
 * Hybrid image generation - local enhancement + cloud generation
 */
export async function generateImageHybrid(
  request: AIImageGenerationRequest,
): Promise<AIImageGenerationResponse> {
  try {
    // Step 1: Enhance prompt locally
    const enhancedPrompt = await enhancePromptWithLLM(request.prompt, "album");

    // Step 2: Generate with enhanced prompt
    const enhancedRequest = {
      ...request,
      prompt: enhancedPrompt,
    };

    // Step 3: Use existing generation methods
    const { generateAIImage } = require("./image-generation");
    return await generateAIImage(enhancedRequest);
  } catch (error) {
    console.log("Hybrid generation failed, using standard method");
    const { generateAIImage } = require("./image-generation");
    return await generateAIImage(request);
  }
}

/**
 * Generate image with enhanced prompt (fallback)
 */
async function generateImageWithEnhancedPrompt(
  request: AIImageGenerationRequest,
): Promise<AIImageGenerationResponse> {
  const { generateAIImage } = require("./image-generation");
  return await generateAIImage(request);
}

/**
 * Fallback generation method
 */
async function generateImageFallback(
  request: AIImageGenerationRequest,
): Promise<AIImageGenerationResponse> {
  const { generateAIImage } = require("./image-generation");
  return await generateAIImage(request);
}

/**
 * Batch generation with local optimization
 */
export async function generateBatchImagesOptimized(
  requests: AIImageGenerationRequest[],
): Promise<AIImageGenerationResponse[]> {
  const isOllamaAvailable = await checkOllamaStatus();
  const results: AIImageGenerationResponse[] = [];

  // If Ollama is available, enhance prompts in parallel
  if (isOllamaAvailable) {
    const enhancedRequests = await Promise.all(
      requests.map(async (request) => ({
        ...request,
        prompt: await enhancePromptWithLLM(request.prompt, "album"),
      })),
    );

    // Generate images with enhanced prompts
    for (const request of enhancedRequests) {
      const result = await generateImageHybrid(request);
      results.push(result);
      await new Promise((resolve) => setTimeout(resolve, 300)); // Reduced delay
    }
  } else {
    // Standard batch generation
    const { generateBatchImages } = require("./image-generation");
    return await generateBatchImages(requests);
  }

  return results;
}

/**
 * AI model selection based on availability and cost
 */
export function selectOptimalAIModel(
  request: AIImageGenerationRequest,
): "local" | "hybrid" | "cloud" {
  const hasOllama = process.env.OLLAMA_HOST !== undefined;
  const isPremiumRequest =
    request.model === "flux" || request.model === "seedream";

  if (hasOllama && !isPremiumRequest) {
    return "hybrid"; // Local enhancement + cloud generation
  } else if (isPremiumRequest) {
    return "cloud"; // Direct cloud generation for premium models
  } else {
    return "cloud"; // Fallback to cloud
  }
}

/**
 * Main enhanced generation function
 */
export async function generateAIImageEnhanced(
  request: AIImageGenerationRequest,
): Promise<AIImageGenerationResponse> {
  const strategy = selectOptimalAIModel(request);

  switch (strategy) {
    case "local":
      return await generateImageOllama(request);
    case "hybrid":
      return await generateImageHybrid(request);
    case "cloud":
      const { generateAIImage } = require("./image-generation");
      return await generateAIImage(request);
    default:
      return await generateImageHybrid(request);
  }
}
