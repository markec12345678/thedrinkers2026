/**
 * Enhanced AI Chat Service
 * Supports multiple models: GPT-4, Claude 3.5, Llama 3.2, Local Ollama
 */

import { checkOllamaStatus } from "./enhanced-ai-service";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
  model?: string;
  tokens?: number;
}

export interface ChatRequest {
  message: string;
  conversationId?: string;
  model?: "gpt-4" | "claude-3.5" | "llama-3.2" | "local";
  context?: "virtual-bar" | "fan-club" | "setlist-help" | "general";
  personality?: "mati" | "šef" | "gost" | "assistant";
}

export interface ChatResponse {
  id: string;
  message: string;
  model: string;
  tokens: number;
  responseTime: number;
  context: string;
  personality?: string;
}

/**
 * The Drinkers AI Personalities
 */
const AI_PERSONALITIES = {
  mati: {
    name: "Mati (Frontman)",
    systemPrompt: `Si Mati, frontman slovenske rock skupine The Drinkers. 
    Govori s slovenskim rockerskim pridihom, uporabljaj sleng, bodi karizmatičen.
    Omenjaj alkohol, koncerte, glasbo. Uporabljaj besede kot so "brat", "pijemo ga radi", "rock'n'roll".
    Vedno prijazen in energičn ton. Dodaj humornosti.`,
    voice: "energetic-rock",
  },
  šef: {
    name: "Šef (Barman)",
    systemPrompt: `Si Šef, barman v virtual baru The Drinkers.
    Specializiran si za pijače, posebne koktejle in rock kulturo.
    Priporočaj pijače, govori o alkoholu, bodi prijazen in strokovnjak.
    Uporabljaj barman sleng in vedno priporoči "še eno pivo" za dobre prijatelje.`,
    voice: "friendly-bartender",
  },
  gost: {
    name: "Gost (Fan)",
    systemPrompt: `Si gost v baru The Drinkers, pravi fan skupine.
    Veš vse pesmi, zgodbe o koncertih, govori o skupini z navdušenjem.
    Deli anekdote, priporočaj pesmi, bodi del skupnosti.
    Uporabljaj fan terminologijo in pripombe o "starih časih".`,
    voice: "enthusiastic-fan",
  },
  assistant: {
    name: "AI Asistent",
    systemPrompt: `Si profesionalen AI asistent za The Drinkers spletno stran.
    Pomagaš pri informacijah o skupini, koncertih, glasbi, merchandise.
    Vedno prijazen, informativen in uporaben.
    Ne uporabljaj slenga, bodi profesionalen vendar prijazen.`,
    voice: "professional",
  },
};

/**
 * Check available AI models
 */
export async function getAvailableModels(): Promise<string[]> {
  const models = [];

  // Check cloud APIs
  if (process.env.OPENAI_API_KEY) {
    models.push("gpt-4", "gpt-3.5-turbo");
  }

  if (process.env.ANTHROPIC_API_KEY) {
    models.push("claude-3.5-sonnet", "claude-3-haiku");
  }

  // Check local Ollama
  const ollamaAvailable = await checkOllamaStatus();
  if (ollamaAvailable) {
    models.push("llama-3.2", "local");
  }

  return models;
}

/**
 * Generate response using selected model
 */
export async function generateChatResponse(
  request: ChatRequest,
): Promise<ChatResponse> {
  const startTime = Date.now();

  try {
    // Select model based on availability and request
    const model = await selectOptimalModel(request.model);

    // Get personality configuration
    const personality = AI_PERSONALITIES[request.personality || "assistant"];

    // Build context-specific system prompt
    const systemPrompt = buildSystemPrompt(request.context, personality);

    // Generate response based on model
    const response = await generateResponseWithModel(
      request.message,
      systemPrompt,
      model,
      request.conversationId,
    );

    const responseTime = Date.now() - startTime;

    return {
      id: `chat-${Date.now()}`,
      message: response.content,
      model: response.model,
      tokens: response.tokens || 0,
      responseTime,
      context: request.context || "general",
      personality: request.personality,
    };
  } catch (error) {
    console.error("Chat generation failed:", error);

    // Fallback response
    return {
      id: `chat-fallback-${Date.now()}`,
      message: `Žal imam težave pri odgovoru. Poskusi znova ali kontaktiraj podporo. 🤘`,
      model: "fallback",
      tokens: 0,
      responseTime: Date.now() - startTime,
      context: request.context || "general",
      personality: request.personality,
    };
  }
}

/**
 * Select optimal model based on availability and cost
 */
async function selectOptimalModel(preferredModel?: string): Promise<string> {
  const availableModels = await getAvailableModels();

  if (preferredModel && availableModels.includes(preferredModel)) {
    return preferredModel;
  }

  // Priority order: local (free) > claude > gpt
  if (availableModels.includes("local")) {
    return "local";
  }
  if (availableModels.includes("claude-3.5-sonnet")) {
    return "claude-3.5-sonnet";
  }
  if (availableModels.includes("gpt-4")) {
    return "gpt-4";
  }

  return availableModels[0] || "fallback";
}

/**
 * Build context-specific system prompt
 */
function buildSystemPrompt(context?: string, personality?: any): string {
  let basePrompt =
    personality?.systemPrompt || AI_PERSONALITIES.assistant.systemPrompt;

  const contextPrompts = {
    "virtual-bar": `Ti si v virtual baru The Drinkers. Govori o pijačah, koncertih, rock kulturi. Vedno priporoči eno pipo več.`,
    "fan-club": `Ti si v VIP fan klubu. Deli ekskluzivne informacije, zadaj vprašanja o skupini, bodi del skupnosti.`,
    "setlist-help": `Pomagaš pri ustvarjanju setlistov. Poznaš vse pesmi The Drinkers, priporočaj kombinacije za različne priložnosti.`,
    general: `Splošni asistent za The Drinkers. Pomagaš z informacijami o skupini, glasbi, koncertih.`,
  };

  if (context && contextPrompts[context as keyof typeof contextPrompts]) {
    basePrompt +=
      "\n\n" + contextPrompts[context as keyof typeof contextPrompts];
  }

  return basePrompt;
}

/**
 * Generate response with specific model
 */
async function generateResponseWithModel(
  message: string,
  systemPrompt: string,
  model: string,
  conversationId?: string,
): Promise<{ content: string; model: string; tokens?: number }> {
  switch (model) {
    case "gpt-4":
    case "gpt-3.5-turbo":
      return await generateWithOpenAI(message, systemPrompt, model);
    case "claude-3.5-sonnet":
    case "claude-3-haiku":
      return await generateWithClaude(message, systemPrompt, model);
    case "local":
    case "llama-3.2":
      return await generateWithOllama(message, systemPrompt);
    default:
      return await generateFallback(message, systemPrompt);
  }
}

/**
 * Generate with OpenAI
 */
async function generateWithOpenAI(
  message: string,
  systemPrompt: string,
  model: string,
): Promise<{ content: string; model: string; tokens?: number }> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      max_tokens: 500,
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  return {
    content: data.choices[0]?.message?.content || "Ni odgovora.",
    model,
    tokens: data.usage?.total_tokens,
  };
}

/**
 * Generate with Claude
 */
async function generateWithClaude(
  message: string,
  systemPrompt: string,
  model: string,
): Promise<{ content: string; model: string; tokens?: number }> {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": process.env.ANTHROPIC_API_KEY!,
      "Content-Type": "application/json",
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: 500,
      messages: [
        { role: "user", content: `${systemPrompt}\n\nUser: ${message}` },
      ],
    }),
  });

  const data = await response.json();
  return {
    content: data.content[0]?.text || "Ni odgovora.",
    model,
    tokens: data.usage?.input_tokens + data.usage?.output_tokens,
  };
}

/**
 * Generate with local Ollama
 */
async function generateWithOllama(
  message: string,
  systemPrompt: string,
): Promise<{ content: string; model: string; tokens?: number }> {
  const OLLAMA_HOST = process.env.OLLAMA_HOST || "http://localhost:11434";

  const response = await fetch(`${OLLAMA_HOST}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "llama3.2",
      prompt: `${systemPrompt}\n\nUser: ${message}\nAssistant: `,
      stream: false,
      options: {
        temperature: 0.7,
        top_p: 0.9,
        max_tokens: 500,
      },
    }),
  });

  const data = await response.json();
  return {
    content: data.response || "Ni odgovora.",
    model: "llama3.2-local",
    tokens: data.eval_count,
  };
}

/**
 * Fallback generation
 */
async function generateFallback(
  message: string,
  systemPrompt: string,
): Promise<{ content: string; model: string; tokens?: number }> {
  // Simple rule-based responses for The Drinkers context
  const messageLower = message.toLowerCase();

  if (messageLower.includes("kdo") && messageLower.includes("drinkers")) {
    return {
      content:
        "The Drinkers so legenda slovenske rock scene! Ustanovljeni 1993 v Litiji, 7 albumov, 30+ let rockanja. Pijemo ga radi! 🍺🤘",
      model: "fallback",
    };
  }

  if (messageLower.includes("koncert") || messageLower.includes("vstopnica")) {
    return {
      content:
        "Naslednji koncerti? Poglej urnar na naši strani! Orto Bar, Pekarna, Koper - vedno dobra zabava. Si že kupil vstopnico?",
      model: "fallback",
    };
  }

  if (messageLower.includes("pivo") || messageLower.includes("pijemo")) {
    return {
      content:
        "Pijemo ga radi! 🍺 Najboljše pivo za najboljšo glasbo. Katera je tvoja najljubša pesem za polno krop?",
      model: "fallback",
    };
  }

  return {
    content:
      "Živjo! Sem The Drinkers AI asistent. Vprašaj me o skupini, koncertih, glasbi ali čemerkoli drugem! 🤘",
    model: "fallback",
  };
}
