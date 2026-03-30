import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { neon } from "@neondatabase/serverless";
import * as schema from "./db/schema";
import { env } from "./env";

const client = neon(env.DATABASE_URL);

const socialProviders = {
  ...(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET
    ? {
        google: {
          clientId: env.GOOGLE_CLIENT_ID,
          clientSecret: env.GOOGLE_CLIENT_SECRET,
        },
      }
    : {}),
  ...(env.GITHUB_CLIENT_ID && env.GITHUB_CLIENT_SECRET
    ? {
        github: {
          clientId: env.GITHUB_CLIENT_ID,
          clientSecret: env.GITHUB_CLIENT_SECRET,
        },
      }
    : {}),
};

export const auth = betterAuth({
  database: drizzleAdapter(client, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Set to true in production with email provider
  },
  socialProviders,
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
