# 🚀 NAPREDNE IMPLEMENTACIJE - THE DRINKERS

**Napredne 3D, AI in interactive features za nagrajeno spletno stran**

---

## 🎨 1. KINETIC TYPOGRAPHY HERO

**Inspiracija**: 24/7 Artists, Jason Bergh  
**Tehnologija**: Framer Motion + GSAP  
**Čas**: 3-4 ure

```tsx
// app/components/sections/KineticHero.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function KineticHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen overflow-hidden bg-black"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#ECA3B7]/20 via-transparent to-[#FF6B6B]/20"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * -500],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Kinetic Text */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <motion.div style={{ y, opacity, scale }} className="text-center">
          {/* Main Title with Letter Spacing Animation */}
          <h1 className="text-8xl md:text-9xl font-black text-white mb-8">
            {"THE DRINKERS".split("").map((letter, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: i * 0.05,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </h1>

          {/* Subtitle with Wave Animation */}
          <motion.p
            className="text-2xl md:text-3xl text-gray-300 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {"Slovenski Rock Legendi Od 1993".split("").map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  delay: i * 0.03,
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 2,
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="flex gap-6 justify-center"
          >
            <motion.a
              href="/tour"
              className="px-8 py-4 bg-gradient-to-r from-[#ECA3B7] to-[#FF6B6B] text-white font-bold rounded-full text-lg"
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 30px rgba(236, 163, 183, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Vstopnice
            </motion.a>

            <motion.a
              href="/music"
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-full text-lg"
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(255,255,255,0.1)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Poslušaj
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ECA3B7] via-[#FF6B6B] to-[#ECA3B7]"
        style={{ scaleX: scrollYProgress }}
      />
    </section>
  );
}
```

---

## 🎵 2. INTERACTIVE ALBUM TIMELINE

**Inspiracija**: The Beatles, Adele  
**Tehnologija**: Framer Motion + Timeline scroll  
**Čas**: 4-5 ur

```tsx
// app/components/features/AlbumTimeline.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Play, Calendar, Disc } from "lucide-react";

const albums = [
  {
    year: "1995",
    title: "Prvi Album",
    description: "Debitantski album ki je začel rock revolucijo",
    tracks: 10,
    cover: "/images/album-1995.jpg",
    spotify: "spotify:url",
  },
  {
    year: "1998",
    title: "Rock'n'Roll",
    description: "Drugi album z največčimi hiti",
    tracks: 12,
    cover: "/images/album-1998.jpg",
    spotify: "spotify:url",
  },
  {
    year: "2001",
    title: "Nočni Voz",
    description: "Konceptualni album o nočnem življenju",
    tracks: 11,
    cover: "/images/album-2001.jpg",
    spotify: "spotify:url",
  },
  {
    year: "2023",
    title: "Na Zdravje",
    description: "Novejši album z 12 energičnimi rock skladbami",
    tracks: 12,
    cover: "/images/album-na-zdravje.jpg",
    spotify: "spotify:url",
  },
];

export default function AlbumTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      ref={containerRef}
      className="py-20 bg-gradient-to-b from-rock-dark to-black overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div style={{ opacity, y }} className="text-center mb-16">
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Diskografija
          </motion.h2>
          <motion.p
            className="text-xl text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            30+ let rock'n'roll zgodovine
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#ECA3B7] via-[#FF6B6B] to-[#ECA3B7]" />

          {/* Albums */}
          {albums.map((album, index) => (
            <motion.div
              key={album.year}
              className={`relative flex items-center mb-16 ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              {/* Content Side */}
              <div
                className={`w-1/2 ${index % 2 === 0 ? "pr-12 text-right" : "pl-12 text-left"}`}
              >
                <motion.div
                  className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(236, 163, 183, 0.3)",
                  }}
                >
                  {/* Year Badge */}
                  <motion.span
                    className="inline-block px-4 py-2 bg-gradient-to-r from-[#ECA3B7] to-[#FF6B6B] text-white font-bold rounded-full mb-4"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {album.year}
                  </motion.span>

                  {/* Album Title */}
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {album.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 mb-4">{album.description}</p>

                  {/* Stats */}
                  <div className="flex gap-4 justify-end mb-4">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Disc size={18} />
                      <span>{album.tracks} skladb</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 justify-end">
                    <motion.a
                      href={album.spotify}
                      className="px-6 py-3 bg-green-600 text-white rounded-lg font-bold flex items-center gap-2 hover:bg-green-700 transition"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play size={18} />
                      Poslušaj
                    </motion.a>
                  </div>
                </motion.div>
              </div>

              {/* Center Point */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-[#ECA3B7] to-[#FF6B6B] rounded-full border-4 border-black shadow-lg shadow-[#ECA3B7]/50" />

              {/* Image Side (Empty for balance) */}
              <div className="w-1/2" />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <a
            href="/music"
            className="inline-block px-8 py-4 bg-gradient-to-r from-[#ECA3B7] to-[#FF6B6B] text-white font-bold rounded-full text-lg hover:scale-105 transition-transform"
          >
            Raziskaj Vso Glasbo
          </a>
        </motion.div>
      </div>
    </section>
  );
}
```

---

## 🌟 3. AUDIO VISUALIZER BACKGROUND

**Inspiracija**: 24/7 Artists (music rhythm visualization)  
**Tehnologija**: Web Audio API + Canvas  
**Čas**: 5-6 ur

```tsx
// app/components/features/AudioVisualizer.tsx
"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function AudioVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const bars = 100;
    const barWidth = canvas.width / bars;

    // Simulated audio data (replace with real audio analysis)
    const audioData = new Array(bars).fill(0).map(() => Math.random() * 100);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update audio data with noise for animation
      for (let i = 0; i < bars; i++) {
        audioData[i] = Math.max(0, audioData[i] + (Math.random() - 0.5) * 20);
      }

      // Draw bars
      for (let i = 0; i < bars; i++) {
        const height = (audioData[i] / 100) * canvas.height * 0.5;
        const x = i * barWidth;
        const y = (canvas.height - height) / 2;

        // Gradient color
        const gradient = ctx.createLinearGradient(x, y, x, y + height);
        gradient.addColorStop(0, "#ECA3B7");
        gradient.addColorStop(0.5, "#FF6B6B");
        gradient.addColorStop(1, "#ECA3B7");

        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth - 2, height);

        // Glow effect
        ctx.shadowBlur = 20;
        ctx.shadowColor = "#ECA3B7";
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.3 }}
      transition={{ duration: 2 }}
    />
  );
}
```

**Uporaba v Hero section:**

```tsx
<section className="relative h-screen overflow-hidden">
  <AudioVisualizer />
  {/* Ostala vsebina čez */}
</section>
```

---

## 🎭 4. PARALLAX IMAGE GALLERY

**Inspiracija**: Rihanna, BLACKPINK  
**Tehnologija**: Framer Motion parallax  
**Čas**: 3-4 ure

```tsx
// app/components/features/ParallaxGallery.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const images = [
  { src: "/images/concert-1.jpg", alt: "Live koncert 1" },
  { src: "/images/concert-2.jpg", alt: "Live koncert 2" },
  { src: "/images/backstage-1.jpg", alt: "Backstage" },
  { src: "/images/studio-1.jpg", alt: "Studio session" },
  { src: "/images/concert-3.jpg", alt: "Live koncert 3" },
];

export default function ParallaxGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  return (
    <section ref={containerRef} className="py-20 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          className="text-5xl font-bold text-white text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Galerija
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => {
            const y = useTransform(
              scrollYProgress,
              [0, 1],
              [0, -100 * (index % 2 === 0 ? 1 : -1)],
            );

            return (
              <motion.div
                key={image.src}
                style={{ y }}
                className="relative h-80 overflow-hidden rounded-2xl group cursor-pointer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white font-bold text-lg">{image.alt}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

---

## 🎪 5. INTERACTIVE BAND MEMBERS

**Inspiracija**: The Beatles member stories  
**Tehnologija**: Framer Motion + Hover effects  
**Čas**: 4-5 ur

```tsx
// app/components/features/BandMembers.tsx
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Music, Mic, Guitar, Drum } from "lucide-react";

const members = [
  {
    name: "Marko",
    role: "Vokal",
    icon: Mic,
    bio: "Frontman z 30+ leti izkušenj na odru",
    image: "/images/member-marko.jpg",
    color: "#ECA3B7",
  },
  {
    name: "Peter",
    role: "Kitara",
    icon: Guitar,
    bio: "Legendarni kitarski riffi in soloji",
    image: "/images/member-peter.jpg",
    color: "#FF6B6B",
  },
  {
    name: "Jan",
    role: "Bas",
    icon: Music,
    bio: "Ritem sekcija ki premika množice",
    image: "/images/member-jan.jpg",
    color: "#FFD700",
  },
  {
    name: "Matej",
    role: "Bobni",
    icon: Drum,
    bio: "Srce ritma že od leta 1993",
    image: "/images/member-matej.jpg",
    color: "#00FFFF",
  },
];

export default function BandMembers() {
  const [activeMember, setActiveMember] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gradient-to-b from-black to-[#1a0a0a]">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          className="text-5xl font-bold text-white text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Člani Skupine
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member, index) => {
            const Icon = member.icon;

            return (
              <motion.div
                key={member.name}
                className="relative group cursor-pointer"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setActiveMember(index)}
                onMouseLeave={() => setActiveMember(null)}
              >
                {/* Member Card */}
                <div className="relative h-[400px] overflow-hidden rounded-2xl">
                  {/* Image */}
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                      background:
                        activeMember === index
                          ? `linear-gradient(to top, ${member.color}CC, transparent)`
                          : "linear-gradient(to top, black, transparent)",
                    }}
                  />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    {/* Icon */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                        activeMember === index
                          ? "bg-white text-black"
                          : "bg-white/20 text-white"
                      }`}
                    >
                      <Icon size={24} />
                    </motion.div>

                    {/* Name & Role */}
                    <h3 className="text-3xl font-bold text-white mb-2">
                      {member.name}
                    </h3>
                    <p className="text-lg text-white/80 mb-4">{member.role}</p>

                    {/* Bio (reveals on hover) */}
                    <motion.p
                      className="text-white/90"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: activeMember === index ? 1 : 0,
                        height: activeMember === index ? "auto" : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {member.bio}
                    </motion.p>
                  </div>
                </div>

                {/* Glow Effect */}
                <div
                  className="absolute -inset-4 rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${member.color}40 0%, transparent 70%)`,
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

---

## 📊 IMPLEMENTACIJSKI PLAN

### **Teden 1: Foundation**

- [ ] Kinetic Typography Hero (3-4h)
- [ ] Interactive Album Timeline (4-5h)
- [ ] Audio Visualizer (5-6h)

### **Teden 2: Engagement**

- [ ] Parallax Gallery (3-4h)
- [ ] Interactive Band Members (4-5h)
- [ ] Testing & optimization

### **Teden 3: Polish**

- [ ] Micro-interactions
- [ ] Performance optimization
- [ ] Mobile responsiveness
- [ ] Accessibility audit

---

## 🎯 METRIKE USPEHA

| Feature          | Metrika       | Cilj  |
| ---------------- | ------------- | ----- |
| Kinetic Hero     | Time on page  | 4:00+ |
| Album Timeline   | Scroll depth  | 80%+  |
| Audio Visualizer | Engagement    | +50%  |
| Parallax Gallery | Image clicks  | +100% |
| Band Members     | Profile views | +150% |

---

**Vse kode so pripravljene za takojšnjo implementacijo! 🚀**

_The Drinkers so pripravljeni postati naslednja Awwwards Site of the Day! 🏆🤘🍺_
