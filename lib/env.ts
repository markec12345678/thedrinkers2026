import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /*
   * Serverside Environment Variables
   * These variables are only accessible on the server
   */
  server: {
    // Database
    DATABASE_URL: z.string().url().min(1),
    NEON_API_KEY: z.string().min(1).optional(),
    NEON_PROJECT_ID: z.string().min(1).optional(),

    // Better Auth
    BETTER_AUTH_SECRET: z
      .string()
      .min(32, "BETTER_AUTH_SECRET must be at least 32 characters"),
    BETTER_AUTH_URL: z.string().url(),
    ADMIN_EMAILS: z.string().optional(),
    GOOGLE_CLIENT_ID: z.string().min(1).optional(),
    GOOGLE_CLIENT_SECRET: z.string().min(1).optional(),
    GITHUB_CLIENT_ID: z.string().min(1).optional(),
    GITHUB_CLIENT_SECRET: z.string().min(1).optional(),

    // Email (Resend)
    RESEND_API_KEY: z
      .string()
      .startsWith("re_", "RESEND_API_KEY must start with 're_'"),

    // Payments (Stripe)
    STRIPE_SECRET_KEY: z
      .string()
      .startsWith("sk_", "STRIPE_SECRET_KEY must start with 'sk_'"),
    STRIPE_WEBHOOK_SECRET: z
      .string()
      .startsWith("whsec_", "STRIPE_WEBHOOK_SECRET must start with 'whsec_'")
      .optional(),

    // AI Services
    OPENAI_API_KEY: z
      .string()
      .startsWith("sk-", "OPENAI_API_KEY must start with 'sk-'")
      .optional(),
    ANTHROPIC_API_KEY: z
      .string()
      .startsWith("sk-ant-", "ANTHROPIC_API_KEY must start with 'sk-ant-'")
      .optional(),
    GOOGLE_AI_API_KEY: z.string().min(1).optional(),

    // Ollama (Local AI)
    OLLAMA_HOST: z.string().optional().default("http://localhost:11434"),

    // MCP Servers
    GITHUB_PERSONAL_ACCESS_TOKEN: z
      .string()
      .startsWith("ghp_", "GITHUB_PERSONAL_ACCESS_TOKEN must start with 'ghp_'")
      .optional(),

    // Memorix
    MEMORIX_API_KEY: z.string().min(1).optional(),

    // Development
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
  },

  /*
   * Clientside Environment Variables
   * These variables are exposed to the browser via NEXT_PUBLIC_ prefix
   */
  client: {
    NEXT_PUBLIC_GA_ID: z
      .string()
      .startsWith("G-", "NEXT_PUBLIC_GA_ID must start with 'G-'")
      .optional(),
    NEXT_PUBLIC_VERCEL_ANALYTICS_ID: z.string().min(1).optional(),
    NEXT_PUBLIC_APP_URL: z.string().url(),
  },

  /*
   * Runtime Environment Variables
   * These are available during runtime (not build time)
   */
  runtimeEnv: {
    // Server
    DATABASE_URL: process.env.DATABASE_URL,
    NEON_API_KEY: process.env.NEON_API_KEY,
    NEON_PROJECT_ID: process.env.NEON_PROJECT_ID,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    ADMIN_EMAILS: process.env.ADMIN_EMAILS,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
    GOOGLE_AI_API_KEY: process.env.GOOGLE_AI_API_KEY,
    OLLAMA_HOST: process.env.OLLAMA_HOST,
    GITHUB_PERSONAL_ACCESS_TOKEN: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
    MEMORIX_API_KEY: process.env.MEMORIX_API_KEY,
    NODE_ENV: process.env.NODE_ENV,

    // Client
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
    NEXT_PUBLIC_VERCEL_ANALYTICS_ID:
      process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ID,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },

  /*
   * Options
   */
  // Skip validation during build (useful for CI/CD)
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  // Throw error if any required variable is missing
  onValidationError: (error) => {
    console.error("❌ Invalid environment variables:");
    if ("flatten" in error && typeof error.flatten === "function") {
      const flattened = error.flatten();
      console.error(flattened.fieldErrors);
    } else if ("issues" in error && Array.isArray((error as any).issues)) {
      (error as any).issues.forEach((issue: any) => {
        console.error(`  - ${issue.path.join(".")}: ${issue.message}`);
      });
    } else {
      console.error(error);
    }
    throw new Error(
      "Invalid environment variables. Check the error message above.",
    );
  },

  // Empty string is treated as undefined
  emptyStringAsUndefined: true,
});
