"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to Sentry
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
          <div className="text-center p-8 bg-gray-800 rounded-2xl shadow-2xl max-w-md">
            <h2 className="text-3xl font-bold text-white mb-4">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-400 mb-6">
              We&apos;re sorry for the inconvenience. Our team has been
              notified.
            </p>
            <button
              onClick={reset}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
