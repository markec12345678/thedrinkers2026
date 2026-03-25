"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Play, Calendar, Disc } from "lucide-react";

/**
 * Interactive Album Timeline - The Drinkers
 *
 * Features:
 * - Scroll-based animations
 * - Timeline z albumi
 * - Interactive track lists
 * - Streaming integration
 *
 * Inspiracija: The Beatles, Adele
 */

interface Album {
  id: string;
  year: string;
  title: string;
  description: string;
  tracks: number;
  cover: string;
  spotifyUrl?: string;
}

const albums: Album[] = [
  {
    id: "1",
    year: "1995",
    title: "Prvi Album",
    description: "Debitantski album ki je začel rock revolucijo",
    tracks: 10,
    cover: "/images/album-1995.jpg",
    spotifyUrl: "https://open.spotify.com/artist/thedrinkers",
  },
  {
    id: "2",
    year: "1998",
    title: "Rock'n'Roll",
    description: "Drugi album z največčimi hiti",
    tracks: 12,
    cover: "/images/album-1998.jpg",
    spotifyUrl: "https://open.spotify.com/artist/thedrinkers",
  },
  {
    id: "3",
    year: "2001",
    title: "Nočni Voz",
    description: "Konceptualni album o nočnem življenju",
    tracks: 11,
    cover: "/images/album-2001.jpg",
    spotifyUrl: "https://open.spotify.com/artist/thedrinkers",
  },
  {
    id: "4",
    year: "2010",
    title: "Življenje Je Rock",
    description: "Šesti studijski album z energičnimi rock skladbami",
    tracks: 12,
    cover: "/images/album-2010.jpg",
    spotifyUrl: "https://open.spotify.com/artist/thedrinkers",
  },
  {
    id: "5",
    year: "2019",
    title: "30 Let Rocka",
    description: "Jubilni album ob 30-letnici delovanja",
    tracks: 15,
    cover: "/images/album-2019.jpg",
    spotifyUrl: "https://open.spotify.com/artist/thedrinkers",
  },
  {
    id: "6",
    year: "2023",
    title: "Na Zdravje",
    description: "Novejši album z 12 energičnimi rock skladbami",
    tracks: 12,
    cover: "/images/album-na-zdravje.jpg",
    spotifyUrl: "https://open.spotify.com/artist/thedrinkers",
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
            30+ let rock&apos;n&apos;roll zgodovine
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#ECA3B7] via-[#FF6B6B] to-[#ECA3B7]"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          />

          {/* Albums */}
          {albums.map((album, index) => (
            <motion.div
              key={album.id}
              className={`relative flex items-center mb-16 ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              {/* Content Side */}
              <div
                className={`w-1/2 ${index % 2 === 0 ? "pr-12 text-right" : "pl-12 text-left"}`}
              >
                <motion.div
                  className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-[#ECA3B7]/50 transition-all duration-300"
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
                    {album.year === "2010" ? "Življenje Je Rock" : album.title}
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
                    {album.spotifyUrl && (
                      <motion.a
                        href={album.spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-green-600 text-white rounded-lg font-bold flex items-center gap-2 hover:bg-green-700 transition"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Disc size={18} />
                        Poslušaj
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Center Point */}
              <motion.div
                className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-[#ECA3B7] to-[#FF6B6B] rounded-full border-4 border-black shadow-lg shadow-[#ECA3B7]/50 z-10"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  className="w-full h-full rounded-full bg-white/20"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

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
