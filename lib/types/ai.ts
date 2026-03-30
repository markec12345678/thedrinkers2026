// AI Image Generation Types

export interface AIImageGenerationRequest {
  prompt: string;
  category: "album" | "band" | "social" | "merch" | "poster" | "fan-art";
  aspect?: "1:1" | "16:9" | "9:16" | "4:3" | "3:4" | "2:3" | "3:2";
  model?: "pollinations-free" | "flux" | "seedream" | "gemini" | "huggingface";
  style?: "realistic" | "artistic" | "minimalist" | "vintage" | "modern";
  mood?: string;
}

export interface AIImageGenerationResponse {
  success: boolean;
  imageUrl?: string;
  imageId?: string;
  prompt: string;
  model: string;
  aspect: string;
  generatedAt: string;
  error?: string;
}

export interface AIUserGeneratedImage {
  id: string;
  userId?: string;
  userEmail?: string;
  prompt: string;
  imageUrl: string;
  thumbnailUrl?: string;
  category: "album" | "band" | "social" | "merch" | "poster" | "fan-art";
  aspect: string;
  model: string;
  likes: number;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AISocialPostRequest {
  type: "concert" | "album" | "merch" | "tour" | "announcement";
  platform: "instagram" | "twitter" | "facebook" | "tiktok";
  content?: {
    title?: string;
    description?: string;
    imageUrl?: string;
    eventDate?: string;
    venue?: string;
  };
  tone?: "energetic" | "professional" | "fun" | "nostalgic";
}

export interface AISocialPostResponse {
  success: boolean;
  post: {
    caption: string;
    hashtags: string[];
    imagePrompt?: string;
    platform: string;
    type: string;
  };
  alternatives?: Array<{
    caption: string;
    hashtags: string[];
  }>;
  error?: string;
}

export interface AISEOOptimizeRequest {
  page: string;
  content: string;
  targetKeywords?: string[];
  pageType: "event" | "music" | "merch" | "about" | "home" | "tour";
}

export interface AISEOOptimizeResponse {
  success: boolean;
  optimized: {
    title: string;
    metaDescription: string;
    keywords: string[];
    ogTitle?: string;
    ogDescription?: string;
    twitterTitle?: string;
    twitterDescription?: string;
    schema?: Record<string, any>;
    internalLinks?: string[];
    headings?: {
      h1: string;
      h2s?: string[];
    };
  };
  score: {
    overall: number;
    keywordUsage: number;
    readability: number;
    metaTags: number;
    structuredData: number;
  };
  suggestions: string[];
  error?: string;
}

export interface AIBeerSongRequest {
  theme?: string;
  mood?: "fun" | "energetic" | "nostalgic" | "celebratory";
  includeBandName?: boolean;
}

export interface AIBeerSongResponse {
  success: boolean;
  song: {
    title: string;
    verses: string[];
    chorus: string;
    bridge?: string;
  };
  error?: string;
}
