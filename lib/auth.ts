import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { neon } from "@neondatabase/serverless";
import * as schema from "./db/schema";

const client = neon(process.env.DATABASE_URL!);

export const auth = betterAuth({
  database: drizzleAdapter(client, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Set to true in production with email provider
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5 minutes
    },
  },
  user: {
    additionalFields: {
      membershipTier: {
        type: "string",
        required: false,
        defaultValue: "free",
      },
      displayName: {
        type: "string",
        required: false,
      },
    },
  },
  advanced: {
    cookiePrefix: "the-drinkers",
  },
});
