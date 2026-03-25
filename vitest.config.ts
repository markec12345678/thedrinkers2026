import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.ts",
    include: ["**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    exclude: ["**/e2e/**", "**/node_modules/**", "**/.next/**"],
    coverage: {
      reporter: ["text", "json", "html"],
      include: ["lib/**/*", "components/**/*", "app/**/*"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
      "@app": path.resolve(__dirname, "./app"),
      "@components": path.resolve(__dirname, "./components"),
      "@lib": path.resolve(__dirname, "./lib"),
      "@config": path.resolve(__dirname, "./config"),
      "@public": path.resolve(__dirname, "./public"),
    },
  },
});
