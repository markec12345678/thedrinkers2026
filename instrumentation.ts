import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Server-side initialization
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    // Edge-side initialization
  }
}

// Required hook for Next.js 15 - captures errors from nested React Server Components
export const onRequestError = Sentry.captureRequestError;
