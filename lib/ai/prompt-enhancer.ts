/**
 * AI Prompt Enhancer Service
 * Enhances image generation prompts using LLM (OpenAI, Anthropic, or Google)
 * Specialized for The Drinkers band imagery
 */

export interface EnhancePromptRequest {
  originalPrompt: string;
  category?: "album" | "band" | "social" | "merch" | "poster" | "fan-art";
  style?: string;
  mood?: string;
}

export interface EnhancePromptResponse {
  originalPrompt: string;
  enhancedPrompt: string;
  provider: string;
  tokensUsed?: number;
}

// Context-specific enhancements for The Drinkers
const CATEGORY_GUIDELINES = {
  album:
    "professional rock album cover with bold typography, dramatic lighting, and premium artwork quality",
  band: "live rock band performance photo with energetic stage presence and professional concert lighting",
  social:
    "modern social media post optimized for Instagram/TikTok with eye-catching design and brand consistency",
  merch:
    "professional product photography with studio lighting, clean background, and premium product placement",
  poster:
    "bold concert/event poster with large typography, strategic layout, and promotional impact",
  "fan-art":
    "creative artistic interpretation with unique style, high quality rendering, and fan engagement value",
};

const DRINKERS_BRAND_ELEMENTS = [
  "Slovenian rock band aesthetic",
  "crimson red (#dc143c) and black (#0a0a0a) color palette",
  "Vivid, eye-catching composition",
  "high contrast and dramatic lighting",
  "professional quality, 4K resolution",
];

/**
 * Call OpenAI API to enhance prompt
 */
async function enhanceWithOpenAI(
  prompt: string,
  category: string,
): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey.includes("your-")) {
    throw new Error("OpenAI API key not configured");
  }

  const systemPrompt = `You are an expert at crafting detailed, high-quality image generation prompts for AI image models like FLUX.
You specialize in rock band imagery and The Drinkers, a Slovenian rock band.

When enhancing prompts, you should:
1. Maintain the user's core creative intent
2. Add specific visual details and composition guidance
3. Include professional quality indicators and style descriptors
4. Reference The Drinkers' brand (crimson red, black, rock aesthetic)
5. Keep the prompt concise but descriptive (under 300 characters)
6. Use specific, actionable visual terms (not vague adjectives)

Return ONLY the enhanced prompt, nothing else.`;

  const userMessage = `Enhance this image generation prompt for a ${category} with The Drinkers rock band aesthetic:

"${prompt}"

Make it more detailed and specific for high-quality AI image generation. Include visual details, composition, lighting, and style elements.`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      temperature: 0.7,
      max_tokens: 150,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      `OpenAI API error: ${error.error?.message || "Unknown error"}`,
    );
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() || prompt;
}

/**
 * Call Anthropic API to enhance prompt
 */
async function enhanceWithAnthropic(
  prompt: string,
  category: string,
): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || apiKey.includes("your-")) {
    throw new Error("Anthropic API key not configured");
  }

  const systemPrompt = `You are an expert at crafting detailed, high-quality image generation prompts for AI image models like FLUX.
You specialize in rock band imagery and The Drinkers, a Slovenian rock band.

When enhancing prompts, you should:
1. Maintain the user's core creative intent
2. Add specific visual details and composition guidance
3. Include professional quality indicators and style descriptors
4. Reference The Drinkers' brand (crimson red, black, rock aesthetic)
5. Keep the prompt concise but descriptive (under 300 characters)
6. Use specific, actionable visual terms (not vague adjectives)

Return ONLY the enhanced prompt, nothing else.`;

  const userMessage = `Enhance this image generation prompt for a ${category} with The Drinkers rock band aesthetic:

"${prompt}"

Make it more detailed and specific for high-quality AI image generation. Include visual details, composition, lighting, and style elements.`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-3-5-haiku-20241022",
      max_tokens: 150,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      `Anthropic API error: ${error.error?.message || "Unknown error"}`,
    );
  }

  const data = await response.json();
  return data.content?.[0]?.text?.trim() || prompt;
}

/**
 * Call Google AI API to enhance prompt
 */
async function enhanceWithGoogle(
  prompt: string,
  category: string,
): Promise<string> {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey || apiKey.includes("your-")) {
    throw new Error("Google AI API key not configured");
  }

  const systemPrompt = `You are an expert at crafting detailed, high-quality image generation prompts for AI image models like FLUX.
You specialize in rock band imagery and The Drinkers, a Slovenian rock band.

When enhancing prompts, you should:
1. Maintain the user's core creative intent
2. Add specific visual details and composition guidance
3. Include professional quality indicators and style descriptors
4. Reference The Drinkers' brand (crimson red, black, rock aesthetic)
5. Keep the prompt concise but descriptive (under 300 characters)
6. Use specific, actionable visual terms (not vague adjectives)

Return ONLY the enhanced prompt, nothing else.`;

  const userMessage = `Enhance this image generation prompt for a ${category} with The Drinkers rock band aesthetic:

"${prompt}"

Make it more detailed and specific for high-quality AI image generation. Include visual details, composition, lighting, and style elements.`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        system_instruction: {
          parts: {
            text: systemPrompt,
          },
        },
        contents: {
          parts: {
            text: userMessage,
          },
        },
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 150,
        },
      }),
    },
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      `Google AI API error: ${error.error?.message || "Unknown error"}`,
    );
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || prompt;
}

/**
 * Get available LLM provider
 */
function getAvailableProvider(): "openai" | "anthropic" | "google" | null {
  if (
    process.env.OPENAI_API_KEY &&
    !process.env.OPENAI_API_KEY.includes("your-")
  ) {
    return "openai";
  }
  if (
    process.env.ANTHROPIC_API_KEY &&
    !process.env.ANTHROPIC_API_KEY.includes("your-")
  ) {
    return "anthropic";
  }
  if (
    process.env.GOOGLE_AI_API_KEY &&
    !process.env.GOOGLE_AI_API_KEY.includes("your-")
  ) {
    return "google";
  }
  return null;
}

/**
 * Fallback enhancement using rule-based improvements (no LLM)
 */
function enhanceFallback(prompt: string, category: string): string {
  const categoryGuide =
    CATEGORY_GUIDELINES[category as keyof typeof CATEGORY_GUIDELINES] ||
    CATEGORY_GUIDELINES["fan-art"];

  // Avoid duplication if brand elements are already in the prompt
  const brandElements = DRINKERS_BRAND_ELEMENTS.filter(
    (element) => !prompt.toLowerCase().includes(element.toLowerCase()),
  );

  // Build enhanced prompt
  const parts = [
    prompt,
    categoryGuide,
    ...brandElements.slice(0, 2), // Add 2 key brand elements to avoid overly long prompts
  ];

  return parts.filter(Boolean).join(", ");
}

/**
 * Main function to enhance a prompt
 */
export async function enhancePrompt(
  request: EnhancePromptRequest,
): Promise<EnhancePromptResponse> {
  const {
    originalPrompt,
    category = "fan-art",
    style = "",
    mood = "",
  } = request;

  // Add style and mood to the prompt if provided
  let promptWithContext = originalPrompt;
  if (style) promptWithContext += ` (${style} style)`;
  if (mood) promptWithContext += ` (${mood} mood)`;

  const provider = getAvailableProvider();

  try {
    let enhancedPrompt = promptWithContext;

    if (provider === "openai") {
      enhancedPrompt = await enhanceWithOpenAI(promptWithContext, category);
    } else if (provider === "anthropic") {
      enhancedPrompt = await enhanceWithAnthropic(promptWithContext, category);
    } else if (provider === "google") {
      enhancedPrompt = await enhanceWithGoogle(promptWithContext, category);
    } else {
      // Fallback: use rule-based enhancement
      enhancedPrompt = enhanceFallback(promptWithContext, category);
      return {
        originalPrompt,
        enhancedPrompt,
        provider: "rule-based",
      };
    }

    return {
      originalPrompt,
      enhancedPrompt,
      provider: provider || "rule-based",
    };
  } catch (error) {
    console.error("[Prompt Enhancer] Error:", error);
    // Fallback to rule-based enhancement on error
    const fallbackEnhanced = enhanceFallback(promptWithContext, category);
    return {
      originalPrompt,
      enhancedPrompt: fallbackEnhanced,
      provider: "rule-based-fallback",
    };
  }
}

/**
 * Batch enhance multiple prompts
 */
export async function enhancePromptsBatch(
  requests: EnhancePromptRequest[],
): Promise<EnhancePromptResponse[]> {
  return Promise.all(requests.map((req) => enhancePrompt(req)));
}
