/**
 * Enhanced AI API Endpoint
 * Supports local Ollama processing and hybrid generation
 */

import { NextRequest, NextResponse } from "next/server";
import {
  generateAIImageEnhanced,
  checkOllamaStatus,
  getOllamaModels,
  generateBatchImagesOptimized,
} from "@/lib/ai/enhanced-ai-service";
import { AIImageGenerationRequest } from "@/lib/types/ai";

// Types
interface GenerateParams {
  prompt: string;
  aspect?: string;
  model?: string;
  style?: string;
  quality?: string;
}

interface BatchGenerateParams {
  requests: Array<{
    prompt: string;
    aspect?: string;
    model?: string;
    style?: string;
    quality?: string;
  }>;
}

interface StatusResponse {
  status: string;
  ollamaAvailable: boolean;
  availableModels: string[];
  timestamp: string;
}

export async function GET() {
  try {
    // Check AI service status
    const ollamaAvailable = await checkOllamaStatus();
    const availableModels = await getOllamaModels();

    return NextResponse.json({
      status: "operational",
      ollamaAvailable,
      availableModels,
      capabilities: {
        localEnhancement: ollamaAvailable,
        cloudGeneration: true,
        hybridMode: ollamaAvailable,
        batchProcessing: true,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ...params } = body;

    switch (action) {
      case "generate":
        return await handleGenerate(params as GenerateParams);
      case "batch":
        return await handleBatchGenerate(params as BatchGenerateParams);
      case "status":
        return await handleStatus();
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Enhanced AI API Error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Generation failed",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}

async function handleGenerate(params: GenerateParams) {
  const request: AIImageGenerationRequest = {
    prompt: params.prompt,
    category: "album", // Default category
    aspect: params.aspect as
      | "1:1"
      | "16:9"
      | "9:16"
      | "4:3"
      | "3:4"
      | "2:3"
      | "3:2"
      | undefined,
    model: params.model as
      | "pollinations-free"
      | "flux"
      | "seedream"
      | "gemini"
      | undefined,
    style: params.style as
      | "realistic"
      | "artistic"
      | "minimalist"
      | "vintage"
      | "modern"
      | undefined,
  };

  const result = await generateAIImageEnhanced(request);

  return NextResponse.json({
    success: true,
    data: result,
    strategy: result.success ? "enhanced" : "fallback",
    timestamp: new Date().toISOString(),
  });
}

async function handleBatchGenerate(params: BatchGenerateParams) {
  const requests: AIImageGenerationRequest[] = params.requests.map((req) => ({
    prompt: req.prompt,
    category: "album" as const,
    aspect: req.aspect as
      | "1:1"
      | "16:9"
      | "9:16"
      | "4:3"
      | "3:4"
      | "2:3"
      | "3:2"
      | undefined,
    model: req.model as
      | "pollinations-free"
      | "flux"
      | "seedream"
      | "gemini"
      | undefined,
    style: req.style as
      | "realistic"
      | "artistic"
      | "minimalist"
      | "vintage"
      | "modern"
      | undefined,
  }));

  const results = await generateBatchImagesOptimized(requests);

  return NextResponse.json({
    success: true,
    data: results,
    count: results.length,
    strategy: "batch-optimized",
    timestamp: new Date().toISOString(),
  });
}

async function handleStatus(): Promise<NextResponse<StatusResponse>> {
  const ollamaAvailable = await checkOllamaStatus();
  const availableModels = await getOllamaModels();

  return NextResponse.json({
    status: "ready",
    ollamaAvailable,
    availableModels,
    timestamp: new Date().toISOString(),
  });
}
