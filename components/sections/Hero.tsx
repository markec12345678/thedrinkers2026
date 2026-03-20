'use client';

import { motion } from 'framer-motion';
import { Play, Ticket, Music, Video, Instagram, Beer } from 'lucide-react';
import VideoPlayer from '@/components/ui/VideoPlayer';

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Hero Video Background */}
      <div className="absolute inset-0 z-0">
        <VideoPlayer 
          src="/videos/hero-loop.mp4"
          poster="/images/hero-poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-rock-bg via-rock-bg/50 to-transparent" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-8xl font-display font-bold mb-4 tracking-tighter"
        >
          THE DRINKERS
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl md:text-2xl text-rock-muted mb-8 max-w-2xl"
        >
          Pijemo ga radi od 1993! 🍺 Rock &apos;n&apos; roll iz Litije
        </motion.p>

        {/* CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap gap-4 justify-center mb-8"
        >
          <button className="btn-primary flex items-center gap-2">
            <Play className="w-4 h-4" /> Pijemo ga radi
          </button>
          <button className="btn-secondary flex items-center gap-2">
            <Beer className="w-4 h-4" /> Virtual Bar
          </button>
        </motion.div>

        {/* Social Links */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex gap-4"
        >
          <a 
            href="#" 
            className="p-3 rounded-full border border-rock-border hover:border-rock-primary 
                      hover:text-rock-primary transition-colors"
            aria-label="Music"
          >
            <Music className="w-5 h-5" />
          </a>
          <a 
            href="#" 
            className="p-3 rounded-full border border-rock-border hover:border-rock-primary 
                      hover:text-rock-primary transition-colors"
            aria-label="Videos"
          >
            <Video className="w-5 h-5" />
          </a>
          <a 
            href="#" 
            className="p-3 rounded-full border border-rock-border hover:border-rock-primary 
                      hover:text-rock-primary transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-rock-muted"
      >
        <div className="w-6 h-10 border-2 border-rock-muted rounded-full flex justify-center">
          <div className="w-1 h-3 bg-rock-primary rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  );
}
