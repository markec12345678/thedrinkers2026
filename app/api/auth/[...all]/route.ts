import NextAuth from "better-auth/next";
import { betterAuth } from "better-auth";
import { neon } from "@neondatabase/serverless";

// Database connection (Neon Postgres - free tier)
const sql = neon(process.env.DATABASE_URL!);

export const auth = betterAuth({
  database: {
    provider: "postgres",
    url: process.env.DATABASE_URL!,
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Can enable later
    minPasswordLength: 8,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    },
  },
  user: {
    additionalFields: {
      // VIP membership tier
      membershipTier: {
        type: "string",
        required: false,
        defaultValue: "free", // free, vip, og
      },
      // NFT wallet address
      walletAddress: {
        type: "string",
        required: false,
      },
      // Fan club join date
      joinDate: {
        type: "date",
        required: false,
      },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  rateLimit: {
    enabled: true,
    window: 60, // 1 minute
    max: 10, // 10 requests per minute
  },
});

const handler = NextAuth(auth);

export { handler as GET, handler as POST };
