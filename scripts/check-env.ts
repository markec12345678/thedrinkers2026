/**
 * Environment Variable Validation Script
 *
 * Run this script to validate your .env configuration
 * Usage: npm run env:check
 */

import { env } from "../lib/env";

console.log("✅ Environment variables validated successfully!\n");

// Display configured services (without exposing sensitive values)
console.log("📋 Configuration Summary:");
console.log("─".repeat(50));

// Database
console.log(
  `🗄️  Database: ${env.DATABASE_URL.includes("neon") ? "✅ Neon PostgreSQL" : "✅ PostgreSQL"}`,
);

// Auth
console.log(`🔐 Better Auth: ✅ Configured (${env.BETTER_AUTH_URL})`);
if (env.ADMIN_EMAILS) {
  const adminCount = env.ADMIN_EMAILS.split(",")
    .map((email) => email.trim())
    .filter(Boolean).length;
  console.log(`👑 Admin Access: ✅ ${adminCount} configured admin email(s)`);
} else {
  console.log(`👑 Admin Access: ⚠️  No ADMIN_EMAILS configured`);
}
const configuredOauthProviders = [
  env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET ? "Google" : null,
  env.GITHUB_CLIENT_ID && env.GITHUB_CLIENT_SECRET ? "GitHub" : null,
].filter(Boolean);
if (configuredOauthProviders.length > 0) {
  console.log(`🔑 OAuth Providers: ✅ ${configuredOauthProviders.join(", ")}`);
} else {
  console.log(`🔑 OAuth Providers: ⚠️  None configured (optional)`);
}

// Email
console.log(`📧 Resend: ✅ Configured`);

// Payments
console.log(`💳 Stripe: ✅ Configured`);

// Analytics
if (env.NEXT_PUBLIC_GA_ID) {
  console.log(`📊 Google Analytics: ✅ ${env.NEXT_PUBLIC_GA_ID}`);
} else {
  console.log(`📊 Google Analytics: ⚠️  Not configured (optional)`);
}

if (env.NEXT_PUBLIC_VERCEL_ANALYTICS_ID) {
  console.log(`📈 Vercel Analytics: ✅ Configured`);
}

// AI Services
const aiServices = [];
if (env.OPENAI_API_KEY) aiServices.push("OpenAI");
if (env.ANTHROPIC_API_KEY) aiServices.push("Anthropic");
if (env.GOOGLE_AI_API_KEY) aiServices.push("Google AI");
if (env.OLLAMA_HOST) aiServices.push("Ollama");

if (aiServices.length > 0) {
  console.log(`🤖 AI Services: ✅ ${aiServices.join(", ")}`);
} else {
  console.log(`🤖 AI Services: ⚠️  None configured (optional)`);
}

// Environment
console.log(`🌍 Environment: ${env.NODE_ENV}`);
console.log(`🔗 App URL: ${env.NEXT_PUBLIC_APP_URL}`);

console.log("─".repeat(50));
console.log("\n✨ All required environment variables are set!\n");
