'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home, Music, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Log error to monitoring service
    console.error('ErrorBoundary caught:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-rock-black flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-crimson/20 via-rock-black to-rock-black" />
        <motion.div
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-crimson/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-crimson-dark/20 rounded-full blur-3xl"
        />
      </div>

      {/* Error Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-2xl w-full text-center"
      >
        {/* Error Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-full bg-crimson/20 border-2 border-crimson"
        >
          <AlertTriangle className="w-12 h-12 text-crimson" />
        </motion.div>

        {/* Error Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-6xl md:text-8xl font-display font-bold text-gradient mb-4"
        >
          404
        </motion.h1>

        {/* Error Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-2xl md:text-3xl text-white font-bold mb-4"
        >
          Ojoj! Nekaj je šlo narobe 🤘
        </motion.p>

        {/* Error Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg text-text-gray mb-8 max-w-xl mx-auto"
        >
          Tudi rock&apos;n&apos;roll včasih zatreščimo. Nič hudega, smo tu da popravimo stvar!
        </motion.p>

        {/* Error Details (Development only) */}
        {process.env.NODE_ENV === 'development' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-8 p-4 bg-rock-dark rounded-lg border border-rock-border text-left"
          >
            <p className="text-sm text-crimson font-mono break-all">
              {error.message || 'Unknown error'}
            </p>
            {error.digest && (
              <p className="text-xs text-text-gray mt-2">
                Digest: {error.digest}
              </p>
            )}
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          {/* Retry Button */}
          <button
            onClick={reset}
            className="btn-primary flex items-center gap-2 group"
          >
            <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            Poskusi ponovno
          </button>

          {/* Home Button */}
          <Link href="/" className="btn-secondary flex items-center gap-2">
            <Home className="w-4 h-4" />
            Na domov
          </Link>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-text-gray"
        >
          <Link
            href="/tour"
            className="flex items-center gap-2 hover:text-crimson transition-colors"
          >
            <Music className="w-4 h-4" />
            Koncerti
          </Link>
          <Link
            href="/music"
            className="flex items-center gap-2 hover:text-crimson transition-colors"
          >
            <Music className="w-4 h-4" />
            Glasba
          </Link>
          <Link
            href="/merch"
            className="flex items-center gap-2 hover:text-crimson transition-colors"
          >
            <Music className="w-4 h-4" />
            Trgovina
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 hover:text-crimson transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Nazaj
          </button>
        </motion.div>

        {/* Easter Egg */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-16 text-xs text-text-gray/50"
        >
          &quot;It&apos;s better to burn out than to fade away&quot; - Neil Young
        </motion.p>
      </motion.div>
    </div>
  );
}
