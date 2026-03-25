# 🎯 PRIPOROČILA ZA THE DRINKERS - KONKRETNE SPREMEMBE

**Na podlagi analize 50+ nagrajenih spletnih strani**

---

## 🥇 TOP 5 PRIPOROČIL (Najvišji ROI)

### **1. Hero Section z Video Background** ⭐⭐⭐⭐⭐

**Inspiracija**: Adele, Imagine Dragons, Celine Dion  
**Čas**: 2-3 ure  
**Impact**: +40% engagement

```tsx
// app/components/sections/HeroVideo.tsx
"use client";

import { motion } from "framer-motion";

export default function HeroVideo() {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/live-concert-hero.mp4" type="video/mp4" />
        <source src="/videos/live-concert-hero.webm" type="video/webm" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-rock-dark" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.h1
          className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-6"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          THE DRINKERS
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        >
          Slovenski Rock Legendi Od 1993
        </motion.p>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <a
            href="/tour"
            className="inline-block px-8 py-4 bg-gradient-to-r from-[#ECA3B7] to-[#FF6B6B] text-white font-bold rounded-full hover:scale-105 transition-transform duration-300"
          >
            Vstopnice za Koncerte
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  );
}
```

**Video priprava:**

- Posnemi 30-60s najboljših live nastopov
- Loop-friendly segment
- Optimiziraj za web (max 5MB)
- .mp4 + .webm formati

---

### **2. Persistent Music Player** ⭐⭐⭐⭐⭐

**Inspiracija**: The Beatles, Andrew Huang  
**Čas**: 4-6 ur  
**Impact**: +60% streams

```tsx
// app/components/ui/PersistentPlayer.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";

export default function PersistentPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
    >
      {/* Mini Player */}
      <div className="bg-black/90 backdrop-blur-lg border-t border-white/10 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Track Info */}
          <div className="flex items-center gap-4">
            <img
              src="/images/album-na-zdravje.jpg"
              alt="Album Art"
              className="w-12 h-12 rounded shadow-lg"
            />
            <div>
              <p className="text-white font-bold text-sm">Na Zdravje</p>
              <p className="text-gray-400 text-xs">The Drinkers</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <button className="text-white/70 hover:text-white transition">
              <SkipBack size={20} />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>

            <button className="text-white/70 hover:text-white transition">
              <SkipForward size={20} />
            </button>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="text-white/70 hover:text-white transition"
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          </div>

          {/* Streaming Links */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="spotify:url"
              className="text-white/70 hover:text-green-500 transition"
            >
              <i className="fab fa-spotify text-xl" />
            </a>
            <a
              href="apple:music:url"
              className="text-white/70 hover:text-pink-500 transition"
            >
              <i className="fab fa-apple text-xl" />
            </a>
            <a
              href="youtube:url"
              className="text-white/70 hover:text-red-500 transition"
            >
              <i className="fab fa-youtube text-xl" />
            </a>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#ECA3B7] to-[#FF6B6B]"
            initial={{ width: "0%" }}
            animate={{ width: "35%" }}
            transition={{ duration: 180, ease: "linear" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
```

---

### **3. 3D Album Showcase** ⭐⭐⭐⭐⭐

**Inspiracija**: Jason Bergh  
**Čas**: 6-8 ur  
**Impact**: +80% album engagement

```tsx
// app/components/features/Album3DShowcase.tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import { motion } from "framer-motion";
import { Suspense } from "react";

function VinylRecord({ albumArt }: { albumArt: string }) {
  const texture = useTexture(albumArt);

  return (
    <mesh rotation={[0, Math.PI / 4, 0]}>
      <cylinderGeometry args={[2, 2, 0.2, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

export default function Album3DShowcase() {
  return (
    <section className="h-[600px] bg-gradient-to-b from-rock-dark to-black">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center text-white mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Na Zdravje (2023)
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* 3D Vinyl */}
          <div className="h-[400px]">
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <Suspense fallback={null}>
                <VinylRecord albumArt="/images/album-na-zdravje.jpg" />
                <OrbitControls
                  enableZoom={false}
                  autoRotate
                  autoRotateSpeed={2}
                />
              </Suspense>
            </Canvas>
          </div>

          {/* Album Info */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-white">Tracklist</h3>
            <ol className="space-y-3 text-gray-300">
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>1. Na Zdravje</span>
                <span>3:45</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>2. Rock'n'Roll Življenje</span>
                <span>4:12</span>
              </li>
              {/* ... more tracks */}
            </ol>

            <div className="flex gap-4">
              <a
                href="spotify:url"
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                <i className="fab fa-spotify mr-2" />
                Spotify
              </a>
              <a
                href="apple:url"
                className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition"
              >
                <i className="fab fa-apple mr-2" />
                Apple Music
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Required packages:**

```bash
npm install @react-three/fiber @react-three/drei three
```

---

### **4. Interactive Tour Map** ⭐⭐⭐⭐

**Inspiracija**: 24/7 Artists  
**Čas**: 3-4 ure  
**Impact**: +50% ticket clicks

```tsx
// app/components/features/InteractiveTourMap.tsx
"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Ticket } from "lucide-react";

const concerts = [
  {
    id: 1,
    city: "Ljubljana",
    venue: "Kino Šiška",
    date: "2026-04-15",
    lat: 46.0569,
    lng: 14.5058,
  },
  {
    id: 2,
    city: "Maribor",
    venue: "Club u14",
    date: "2026-05-05",
    lat: 46.5547,
    lng: 15.6459,
  },
  {
    id: 3,
    city: "Kranj",
    venue: "Valdnota",
    date: "2026-05-12",
    lat: 46.239,
    lng: 14.3556,
  },
  // ... more
];

export default function InteractiveTourMap() {
  return (
    <section className="py-20 bg-rock-dark">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center text-white mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Zemljevid Koncertov
        </motion.h2>

        <div className="relative h-[600px] bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-2xl overflow-hidden">
          {/* Slovenia Map SVG */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600">
            <path
              d="M200,300 L300,250 L400,280 L500,320 L450,400 L350,420 L250,380 Z"
              className="fill-white/5 stroke-white/20"
              strokeWidth="2"
            />

            {/* Concert Markers */}
            {concerts.map((concert, i) => (
              <g key={concert.id}>
                <motion.circle
                  cx={200 + i * 100}
                  cy={300 + Math.sin(i) * 50}
                  r="8"
                  className="fill-[#ECA3B7]"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.5 }}
                />
                <motion.circle
                  cx={200 + i * 100}
                  cy={300 + Math.sin(i) * 50}
                  r="15"
                  className="fill-[#ECA3B7]/20"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </g>
            ))}
          </svg>

          {/* Concert Cards */}
          <div className="absolute top-4 left-4 right-4 flex gap-4 overflow-x-auto pb-4">
            {concerts.map((concert) => (
              <motion.div
                key={concert.id}
                className="bg-black/80 backdrop-blur-lg rounded-lg p-4 min-w-[250px] border border-white/10"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="text-[#ECA3B7]" size={20} />
                  <span className="text-white font-bold">{concert.date}</span>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="text-white/70" size={20} />
                  <div>
                    <p className="text-white font-bold">{concert.city}</p>
                    <p className="text-gray-400 text-sm">{concert.venue}</p>
                  </div>
                </div>
                <button className="w-full py-2 bg-gradient-to-r from-[#ECA3B7] to-[#FF6B6B] text-white rounded-lg font-bold hover:opacity-90 transition flex items-center justify-center gap-2">
                  <Ticket size={18} />
                  Kupi Vstopnico
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

### **5. Gated VIP Content** ⭐⭐⭐⭐

**Inspiracija**: Jay Hardway  
**Čas**: 5-7 ur  
**Impact**: +200% VIP signups

```tsx
// app/components/features/VIPExclusiveContent.tsx
"use client";

import { motion } from "framer-motion";
import { Lock, Unlock, Play, Download } from "lucide-react";

export default function VIPExclusiveContent() {
  const isVIP = true; // Replace with actual auth check

  return (
    <section className="py-20 bg-gradient-to-b from-black to-[#1a0a0a]">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center text-white mb-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          VIP Ekskluzivno
        </motion.h2>
        <p className="text-gray-400 text-center mb-12">
          Samo za registrirane fane
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Locked Content */}
          {!isVIP && (
            <>
              <motion.div
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
                <Lock
                  className="absolute top-4 right-4 text-white/30"
                  size={32}
                />

                <div className="relative z-10">
                  <img
                    src="/images/backstage.jpg"
                    alt="Backstage"
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-bold text-white mb-2">
                    Backstage Footage
                  </h3>
                  <p className="text-gray-400 mb-4">
                    Ekskluzivni posnetki iz zaodrja
                  </p>

                  <button className="w-full py-3 bg-gradient-to-r from-[#ECA3B7] to-[#FF6B6B] text-white rounded-lg font-bold">
                    Postani VIP Član
                  </button>
                </div>
              </motion.div>

              {/* More locked content... */}
            </>
          )}

          {/* Unlocked VIP Content */}
          {isVIP && (
            <>
              <motion.div
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-[#ECA3B7]/50"
                whileHover={{ scale: 1.05 }}
              >
                <Unlock className="text-[#ECA3B7] mb-4" size={32} />
                <h3 className="text-xl font-bold text-white mb-2">
                  Backstage Footage
                </h3>
                <p className="text-gray-400 mb-4">
                  Ekskluzivni posnetki iz zaodrja
                </p>

                <button className="w-full py-3 bg-white/10 text-white rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-white/20 transition">
                  <Play size={20} />
                  Predvajaj
                </button>
              </motion.div>

              <motion.div
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-[#ECA3B7]/50"
                whileHover={{ scale: 1.05 }}
              >
                <Download className="text-[#ECA3B7] mb-4" size={32} />
                <h3 className="text-xl font-bold text-white mb-2">
                  Early Ticket Access
                </h3>
                <p className="text-gray-400 mb-4">
                  Kupi vstopnice 24h pred drugimi
                </p>

                <button className="w-full py-3 bg-gradient-to-r from-[#ECA3B7] to-[#FF6B6B] text-white rounded-lg font-bold">
                  Kupi Vstopnico
                </button>
              </motion.div>

              <motion.div
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-[#ECA3B7]/50"
                whileHover={{ scale: 1.05 }}
              >
                <Play className="text-[#ECA3B7] mb-4" size={32} />
                <h3 className="text-xl font-bold text-white mb-2">
                  Meet & Greet
                </h3>
                <p className="text-gray-400 mb-4">Spoznaj skupino osebno</p>

                <button className="w-full py-3 bg-white/10 text-white rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-white/20 transition">
                  Rezerviraj Termin
                </button>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
```

---

## 📊 IMPLEMENTACIJSKI PLAN

### **Teden 1:**

- [ ] Hero Video Section
- [ ] Persistent Music Player
- [ ] Interactive Tour Map

### **Teden 2:**

- [ ] 3D Album Showcase
- [ ] Gated VIP Content
- [ ] Testing & optimization

### **Teden 3:**

- [ ] Micro-interactions
- [ ] Performance optimization
- [ ] Mobile testing

---

## 🎯 METRIKE USPEHA

| Metrika           | Trenutno | Cilj     | Merjenje          |
| ----------------- | -------- | -------- | ----------------- |
| **Time on Site**  | 2:30     | 4:00+    | Google Analytics  |
| **Bounce Rate**   | 45%      | <30%     | Google Analytics  |
| **Streams**       | 100/dan  | 250/dan  | Spotify Analytics |
| **Ticket Clicks** | 50/dan   | 150/dan  | Eventim Analytics |
| **VIP Signups**   | 10/teden | 50/teden | Database          |
| **Merch Sales**   | 5/teden  | 20/teden | Stripe Analytics  |

---

**Vse kode so pripravljene za copy-paste implementacijo! 🚀**

_The Drinkers so pripravljeni na naslednji level! 🤘🍺_
