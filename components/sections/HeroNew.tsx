"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/**
 * Kinetic Typography Hero - The Drinkers
 *
 * Features:
 * - Letter-by-letter animations
 * - Scroll-based parallax effects
 * - Kinetic typography
 * - Video background ready
 * - Floating particles
 * - Progress indicator
 *
 * Inspiracija: 24/7 Artists (Awwwards SOTD), Jason Bergh
 */

export default function HeroNew() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  // Smooth progress bar
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Letter animation variants
  const letterVariants = {
    hidden: { y: 100, opacity: 0, rotateX: -90 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.8,
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  // Word animation variants
  const wordVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5,
      },
    },
  };

  return (
    <motion.section
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Video Background (optional - uncomment when you have video) */}
      {/* 
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/hero-concert.mp4" type="video/mp4" />
      </video>
      */}

      {/* Background with YouTube thumbnail as fallback */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://img.youtube.com/vi/5bYFArOho7U/maxresdefault.jpg"
          alt="The Drinkers Live"
          fill
          priority
          quality={90}
          className="object-cover object-center"
          sizes="100vw"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-crimson-900/70 to-black/90" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-crimson-400/30 rounded-full"
            initial={{
              x:
                typeof window !== "undefined"
                  ? Math.random() * window.innerWidth
                  : 0,
              y:
                typeof window !== "undefined"
                  ? Math.random() * window.innerHeight
                  : 0,
              opacity: 0,
            }}
            animate={{
              y: [null, Math.random() * -300],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
            suppressHydrationWarning
          />
        ))}
      </div>

      {/* Audio Visualizer Bars (decorative) */}
      <div className="absolute bottom-0 left-0 right-0 h-32 z-10 flex items-end justify-center gap-1 opacity-20 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="flex-1 bg-gradient-to-t from-crimson-600 to-red-400 rounded-t"
            initial={{ height: "10%" }}
            animate={{
              height: [
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`,
              ],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.02,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-center">
        {/* Kinetic Typography - Band Name */}
        <motion.h1
          variants={wordVariants}
          initial="hidden"
          animate="visible"
          className="mb-6"
        >
          <div className="flex flex-wrap justify-center gap-1">
            {"THE DRINKERS".split("").map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                className="text-5xl md:text-7xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-crimson-500 via-red-500 to-orange-500 drop-shadow-[0_0_30px_rgba(220,20,60,0.8)] inline-block hover:scale-125 transition-transform cursor-default"
                style={{ display: "inline-block" }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </div>
        </motion.h1>

        {/* Tagline with Wave Animation */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="max-w-2xl mb-8 text-xl md:text-2xl lg:text-3xl text-white/90 font-light tracking-wide"
        >
          {"Slovenian Booze Rock Legends".split("").map((char, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ y: 0 }}
              animate={{ y: [0, -8, 0] }}
              transition={{
                delay: 1.2 + i * 0.03,
                duration: 2,
                repeat: Infinity,
                repeatDelay: Math.random() * 2,
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.p>

        {/* Stats with Counter Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="grid grid-cols-3 gap-6 md:gap-12 mb-12"
        >
          <StatCounter
            value={33}
            suffix="+"
            label="Years Rocking"
            delay={0.2}
          />
          <StatCounter value={7} suffix="" label="Albums" delay={0.4} />
          <StatCounter value={500} suffix="+" label="Concerts" delay={0.6} />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/tour"
            className="group relative px-8 py-4 bg-gradient-to-r from-crimson-600 to-red-600 text-white font-bold text-lg rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(220,20,60,0.6)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              🎫 Next Concert
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>

          <Link
            href="/music"
            className="group px-8 py-4 border-2 border-crimson-500/50 text-crimson-400 font-bold text-lg rounded-full hover:bg-crimson-500/10 transition-all duration-300 hover:scale-105 hover:border-crimson-400 hover:text-crimson-300"
          >
            <span className="flex items-center gap-2">
              🎵 Latest Album
              <svg
                className="w-5 h-5 group-hover:rotate-12 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                />
              </svg>
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Scroll Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-crimson-600 via-red-500 to-orange-500 z-30"
        style={{ scaleX }}
      />

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center text-white/50 hover:text-white transition-colors">
          <span className="text-sm mb-2">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}

// Animated Stat Counter Component
function StatCounter({
  value,
  suffix,
  label,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className="text-center"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.3 }}
        className="text-3xl md:text-5xl font-bold text-crimson-400"
      >
        <CountUp end={value} duration={2} delay={delay} />
        {suffix}
      </motion.div>
      <div className="text-xs md:text-sm text-gray-400 mt-2">{label}</div>
    </motion.div>
  );
}

// Count Up Animation
function CountUp({
  end,
  duration,
  delay,
}: {
  end: number;
  duration: number;
  delay: number;
}) {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, delay]);

  return <span>{count}</span>;
}
