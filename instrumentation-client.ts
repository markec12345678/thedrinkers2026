// instrumentation-client.ts
// Sentry instrumentation for client-side errors

import * as Sentry from "@sentry/nextjs";

// Initialize Sentry on client
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
});

// Required hooks for Next.js 15
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
