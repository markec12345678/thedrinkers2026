'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

/**
 * Hero Section - The Drinkers Homepage
 * 
 * Features:
 * - Full-screen hero with background image
 * - Crimson red gradient overlay
 * - Band logo and tagline
 * - Call-to-action buttons
 * - Scroll indicator
 * - Optimized image loading
 */

export default function HeroSection() {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero-bg.webp"
          alt="The Drinkers - Slovenian Booze Rock Band performing live on stage"
          fill
          priority
          quality={90}
          className="object-cover object-center"
          sizes="100vw"
        />
        
        {/* Gradient Overlay - Crimson Red Theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-crimson-900/70 to-black/90" />
        
        {/* Animated Light Rays Effect */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-crimson-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-red-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl animate-pulse delay-500" />
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        {/* Band Logo / Name */}
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <span className="text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-crimson-500 via-red-500 to-orange-500 drop-shadow-[0_0_30px_rgba(220,20,60,0.8)]">
            THE DRINKERS
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mb-8 text-xl md:text-2xl lg:text-3xl text-white/90 font-light tracking-wide"
        >
          Slovenian Booze Rock Legends
        </motion.p>

        {/* Subtitle - Band Info */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-3xl mb-12 text-base md:text-lg text-gray-300 leading-relaxed"
        >
          Since 1993 • Litija, Slovenia • 33 Years of Rock'n'Roll
        </motion.p>

        {/* Call-to-Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          {/* Primary CTA - Concert Tickets */}
          <Link
            href="/tour"
            className="group relative px-8 py-4 bg-gradient-to-r from-crimson-600 to-red-600 text-white font-bold text-lg rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(220,20,60,0.6)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              🎫 Next Concert
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>

          {/* Secondary CTA - Latest Album */}
          <Link
            href="/music"
            className="group px-8 py-4 border-2 border-crimson-500/50 text-crimson-400 font-bold text-lg rounded-full hover:bg-crimson-500/10 transition-all duration-300 hover:scale-105 hover:border-crimson-400 hover:text-crimson-300"
          >
            <span className="flex items-center gap-2">
              🎵 Latest Album
              <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </span>
          </Link>
        </motion.div>

        {/* Social Proof / Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 grid grid-cols-3 gap-8"
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-crimson-400">33+</div>
            <div className="text-sm md:text-base text-gray-400 mt-1">Years Rocking</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-crimson-400">4</div>
            <div className="text-sm md:text-base text-gray-400 mt-1">Albums</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-crimson-400">500+</div>
            <div className="text-sm md:text-base text-gray-400 mt-1">Concerts</div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center text-white/50 hover:text-white transition-colors">
          <span className="text-sm mb-2">Scroll to explore</span>
          <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>

      {/* Navigation Dots (Optional) */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3 z-10">
        <div className="w-3 h-3 rounded-full bg-crimson-500 shadow-[0_0_10px_rgba(220,20,60,0.8)]" />
        <div className="w-3 h-3 rounded-full bg-white/30 hover:bg-white/50 transition-colors cursor-pointer" />
        <div className="w-3 h-3 rounded-full bg-white/30 hover:bg-white/50 transition-colors cursor-pointer" />
        <div className="w-3 h-3 rounded-full bg-white/30 hover:bg-white/50 transition-colors cursor-pointer" />
      </div>
    </motion.section>
  );
}
