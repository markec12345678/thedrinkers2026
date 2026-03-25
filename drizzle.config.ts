import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./lib/db/schema/index.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  // Remove schemaFilter to use public schema
  // schemaFilter: ["thedrinkers"],
  verbose: true,
  strict: false,
});
