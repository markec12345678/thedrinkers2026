'use client';

import { motion } from 'framer-motion';
import { Play, Ticket, Music, Video, Instagram, Beer } from 'lucide-react';
import VideoPlayer from '@/components/ui/VideoPlayer';

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Hero Video Background */}
      <div className="absolute inset-0 z-0">
        {/* Uporabi sliko namesto videa za boljšo vidnost */}
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/hero/hero-main.webp)',
            filter: 'brightness(1.2) contrast(1.1)'
          }}
        />
        {/* Zelo lahek overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/10 to-transparent" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-8xl font-display font-bold mb-4 tracking-tighter 
                     text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
        >
          THE DRINKERS
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl 
                     drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
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
          <button className="btn-primary flex items-center gap-2 
                           bg-crimson-600 hover:bg-crimson-700 text-white 
                           px-8 py-3 rounded-lg font-bold
                           shadow-[0_4px_12px_rgba(220,20,60,0.4)]
                           hover:shadow-[0_6px_20px_rgba(220,20,60,0.6)]
                           transition-all duration-300">
            <Play className="w-4 h-4" /> Pijemo ga radi
          </button>
          <button className="btn-secondary flex items-center gap-2 
                           bg-white/10 hover:bg-white/20 text-white 
                           border-2 border-white/50 hover:border-crimson-500
                           px-8 py-3 rounded-lg font-bold
                           backdrop-blur-sm
                           shadow-[0_4px_12px_rgba(0,0,0,0.5)]
                           hover:shadow-[0_6px_20px_rgba(0,0,0,0.7)]
                           transition-all duration-300">
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
            className="p-3 rounded-full border-2 border-white/50 
                      hover:border-crimson-500 hover:text-crimson-500
                      bg-black/30 backdrop-blur-sm
                      transition-all duration-300"
            aria-label="Music"
          >
            <Music className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="p-3 rounded-full border-2 border-white/50 
                      hover:border-crimson-500 hover:text-crimson-500
                      bg-black/30 backdrop-blur-sm
                      transition-all duration-300"
            aria-label="Videos"
          >
            <Video className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="p-3 rounded-full border-2 border-white/50 
                      hover:border-crimson-500 hover:text-crimson-500
                      bg-black/30 backdrop-blur-sm
                      transition-all duration-300"
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center
                      bg-black/30 backdrop-blur-sm">
          <div className="w-1 h-3 bg-white rounded-full mt-2 
                        shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
        </div>
      </motion.div>
    </section>
  );
}
