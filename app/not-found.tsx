'use client';

import { motion } from 'framer-motion';
import { Ghost, Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-rock-black flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-crimson/10 via-rock-black to-rock-black" />
        <motion.div
          animate={{
            opacity: [0.2, 0.4, 0.2],
            x: [-100, 100, -100],
          }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-1/3 left-1/3 w-64 h-64 bg-crimson/20 rounded-full blur-3xl"
        />
      </div>

      {/* 404 Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-2xl w-full text-center"
      >
        {/* Ghost Icon */}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mb-8"
        >
          <Ghost className="w-32 h-32 text-crimson mx-auto" />
        </motion.div>

        {/* 404 Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-8xl md:text-9xl font-display font-bold text-gradient mb-4"
        >
          404
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl md:text-3xl text-white font-bold mb-4"
        >
          Tega ni na spisku 🎸
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-text-gray mb-8 max-w-md mx-auto"
        >
          Stran, ki jo iščeš, se je skrila nekam v vesolje. Mogoče je na koncertu?
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          {/* Home Button */}
          <Link href="/" className="btn-primary flex items-center gap-2">
            <Home className="w-4 h-4" />
            Na domov
          </Link>

          {/* Back Button */}
          <button
            onClick={() => window.history.back()}
            className="btn-secondary flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Nazaj
          </button>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-text-gray"
        >
          <Link
            href="/tour"
            className="hover:text-crimson transition-colors"
          >
            Koncerti
          </Link>
          <Link
            href="/music"
            className="hover:text-crimson transition-colors"
          >
            Glasba
          </Link>
          <Link
            href="/merch"
            className="hover:text-crimson transition-colors"
          >
            Trgovina
          </Link>
          <Link
            href="/contact"
            className="hover:text-crimson transition-colors"
          >
            Kontakt
          </Link>
        </motion.div>

        {/* Easter Egg */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-16 text-xs text-text-gray/50"
        >
          &quot;This could be the greatest band in the world... if we could find this page&quot;
        </motion.p>
      </motion.div>
    </div>
  );
}
