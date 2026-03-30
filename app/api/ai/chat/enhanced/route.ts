/**
 * Enhanced Chat API Endpoint
 * Supports multiple AI models and The Drinkers personalities
 */

import { NextRequest, NextResponse } from "next/server";
import {
  generateChatResponse,
  getAvailableModels,
} from "@/lib/ai/enhanced-chat";
import { ChatRequest } from "@/lib/ai/enhanced-chat";

// In-memory conversation storage (in production, use Redis/Database)
const conversations = new Map<string, any[]>();

export async function GET() {
  try {
    const availableModels = await getAvailableModels();

    return NextResponse.json({
      status: "ready",
      availableModels,
      personalities: ["mati", "šef", "gost", "assistant"],
      contexts: ["virtual-bar", "fan-club", "setlist-help", "general"],
      features: {
        multipleModels: true,
        personalities: true,
        contextAware: true,
        conversationMemory: true,
        localProcessing: availableModels.includes("llama-3.2"),
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
    const chatRequest: ChatRequest = {
      message: body.message,
      conversationId: body.conversationId,
      model: body.model,
      context: body.context,
      personality: body.personality,
    };

    if (!chatRequest.message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 },
      );
    }

    // Get or create conversation
    const conversationId = chatRequest.conversationId || `conv-${Date.now()}`;
    let conversation = conversations.get(conversationId) || [];

    // Add user message
    conversation.push({
      id: `msg-${Date.now()}`,
      role: "user",
      content: chatRequest.message,
      timestamp: new Date().toISOString(),
    });

    // Generate AI response
    const response = await generateChatResponse(chatRequest);

    // Add AI response to conversation
    conversation.push({
      id: response.id,
      role: "assistant",
      content: response.message,
      timestamp: new Date().toISOString(),
      model: response.model,
      tokens: response.tokens,
    });

    // Store conversation (keep last 20 messages)
    if (conversation.length > 20) {
      conversation = conversation.slice(-20);
    }
    conversations.set(conversationId, conversation);

    return NextResponse.json({
      success: true,
      data: {
        ...response,
        conversationId,
        messageCount: conversation.length,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Enhanced Chat API Error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Chat failed",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const conversationId = searchParams.get("conversationId");

    if (conversationId) {
      conversations.delete(conversationId);
      return NextResponse.json({
        success: true,
        message: "Conversation deleted",
        conversationId,
        timestamp: new Date().toISOString(),
      });
    } else {
      // Clear all conversations
      conversations.clear();
      return NextResponse.json({
        success: true,
        message: "All conversations cleared",
        timestamp: new Date().toISOString(),
      });
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Delete failed",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
