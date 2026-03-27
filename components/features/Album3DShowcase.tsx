"use client";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useTexture,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import { motion } from "framer-motion";
import { Suspense, useState } from "react";
import { Play, ExternalLink, Disc3 } from "lucide-react";

/**
 * 3D Album Showcase - The Drinkers
 *
 * Features:
 * - 3D Vinyl record z album artwork
 * - Orbit controls za rotacijo
 * - Realistic lighting
 * - Album info s streaming links
 *
 * Inspiracija: Jason Bergh (Awwwards SOTD)
 */

interface Album {
  id: string;
  title: string;
  year: string;
  coverArt: string;
  tracks: string[];
  spotifyUrl?: string;
  appleMusicUrl?: string;
}

const albums: Album[] = [
  {
    id: "1",
    title: "Na Zdravje",
    year: "2023",
    coverArt: "/images/album-na-zdravje.svg",
    tracks: [
      "Na Zdravje",
      "Rock'n'Roll Življenje",
      "Noč Je Naša",
      "Pijemo Do Zore",
      "Ljubljana Gori",
    ],
    spotifyUrl: "https://open.spotify.com/artist/thedrinkers",
    appleMusicUrl: "https://music.apple.com",
  },
  {
    id: "2",
    title: "30 Let Rocka",
    year: "2019",
    coverArt: "/images/album-30let.jpg",
    tracks: [
      "Uvertura",
      "30 Let",
      "Spomini",
      "Rock'n'Roll Nikoli Ne Umrje",
      "Hvala Vam",
    ],
    spotifyUrl: "https://open.spotify.com/artist/thedrinkers",
    appleMusicUrl: "https://music.apple.com",
  },
  {
    id: "3",
    title: "Življenje Je Rock",
    year: "2010",
    coverArt: "/images/album-zivljenje.jpg",
    tracks: [
      "Življenje Je Rock",
      "Novi Časi",
      "Stari Prijatelji",
      "Rock'n'Roll Družina",
      "Zadnji Koncert",
    ],
    spotifyUrl: "https://open.spotify.com/artist/thedrinkers",
    appleMusicUrl: "https://music.apple.com",
  },
];

function VinylRecord({ album, isActive }: { album: Album; isActive: boolean }) {
  // Load album cover texture
  const texture = useTexture(album.coverArt);

  return (
    <group rotation={[0, isActive ? Math.PI / 8 : 0, 0]}>
      {/* Vinyl Record */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2.5, 2.5, 0.1, 64]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Album Cover (Front) */}
      <mesh position={[0.06, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.3, 64]} />
        <meshStandardMaterial map={texture} roughness={0.5} />
      </mesh>

      {/* Album Cover (Back) */}
      <mesh position={[-0.06, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.3, 64]} />
        <meshStandardMaterial map={texture} roughness={0.5} />
      </mesh>

      {/* Center Label */}
      <mesh position={[0.07, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.8, 32]} />
        <meshStandardMaterial color="#dc143c" roughness={0.7} />
      </mesh>

      {/* Spindle Hole */}
      <mesh position={[0.08, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.1, 0.02, 16, 32]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  );
}

function AlbumDisplay({
  album,
  isActive,
}: {
  album: Album;
  isActive: boolean;
}) {
  return (
    <Suspense fallback={null}>
      <VinylRecord album={album} isActive={isActive} />
      <ContactShadows
        position={[0, -2.5, 0]}
        opacity={0.4}
        scale={10}
        blur={2}
        far={4}
      />
    </Suspense>
  );
}

export default function Album3DShowcase() {
  const [selectedAlbum, setSelectedAlbum] = useState(0);

  return (
    <section className="py-20 bg-gradient-to-b from-black via-[#1a0a0a] to-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Diskografija
          </h2>
          <p className="text-xl text-gray-400">Raziskuj naše albume v 3D</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="h-[500px] bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-2xl overflow-hidden border border-white/10 relative"
          >
            <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
              {/* Lighting */}
              <ambientLight intensity={0.5} />
              <spotLight
                position={[10, 10, 10]}
                angle={0.15}
                penumbra={1}
                intensity={1}
              />
              <pointLight position={[-10, -10, -10]} intensity={0.5} />

              {/* Environment */}
              <Environment preset="studio" />

              {/* Album Display */}
              <AlbumDisplay album={albums[selectedAlbum]} isActive={true} />

              {/* Controls */}
              <OrbitControls
                enableZoom={false}
                autoRotate
                autoRotateSpeed={2}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 2}
              />
            </Canvas>

            {/* Instructions */}
            <div className="absolute bottom-4 left-4 text-white/50 text-sm">
              🖱️ Zavrti z miško
            </div>
          </motion.div>

          {/* Album Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Album Selector */}
            <div className="flex gap-4 overflow-x-auto pb-4">
              {albums.map((album, index) => (
                <motion.button
                  key={album.id}
                  onClick={() => setSelectedAlbum(index)}
                  className={`flex-shrink-0 px-6 py-3 rounded-lg font-bold transition-all ${
                    selectedAlbum === index
                      ? "bg-gradient-to-r from-[#ECA3B7] to-[#FF6B6B] text-white"
                      : "bg-white/5 text-gray-400 hover:bg-white/10"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {album.title} ({album.year})
                </motion.button>
              ))}
            </div>

            {/* Current Album Info */}
            <motion.div
              key={selectedAlbum}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-3xl font-bold text-white mb-2">
                {albums[selectedAlbum].title}
              </h3>
              <p className="text-xl text-gray-400 mb-6">
                {albums[selectedAlbum].year}
              </p>

              {/* Track List */}
              <div className="space-y-3 mb-8">
                <h4 className="text-lg font-bold text-white mb-4">
                  Seznam Skladb:
                </h4>
                {albums[selectedAlbum].tracks.map((track, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all cursor-pointer group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{
                      x: 10,
                      backgroundColor: "rgba(236, 163, 183, 0.1)",
                    }}
                  >
                    <span className="w-8 h-8 rounded-full bg-gradient-to-r from-[#ECA3B7] to-[#FF6B6B] flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform">
                      {index + 1}
                    </span>
                    <span className="flex-1 text-white">{track}</span>
                    <Play
                      size={16}
                      className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </motion.div>
                ))}
              </div>

              {/* Streaming Links */}
              <div className="flex gap-4">
                {albums[selectedAlbum].spotifyUrl && (
                  <motion.a
                    href={albums[selectedAlbum].spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Disc3 size={20} />
                    Spotify
                  </motion.a>
                )}
                {albums[selectedAlbum].appleMusicUrl && (
                  <motion.a
                    href={albums[selectedAlbum].appleMusicUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg font-bold hover:bg-gray-200 transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink size={20} />
                    Apple Music
                  </motion.a>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
