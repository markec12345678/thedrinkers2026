"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  ExternalLink,
} from "lucide-react";

/**
 * Persistent Music Player - The Drinkers
 *
 * Features:
 * - Fixed bottom player bar
 * - Spotify/Apple Music/YouTube integration
 * - Playback controls
 * - Progress bar
 * - Volume control
 * - Mini/Expanded mode
 *
 * Inspiracija: The Beatles, Andrew Huang
 */

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverArt: string;
  duration: number;
  spotifyUrl?: string;
  appleMusicUrl?: string;
  youtubeUrl?: string;
}

const defaultTracks: Track[] = [
  {
    id: "1",
    title: "Na Zdravje",
    artist: "The Drinkers",
    album: "Na Zdravje (2023)",
    coverArt: "/images/album-na-zdravje.jpg",
    duration: 225, // 3:45
    spotifyUrl: "https://open.spotify.com/artist/thedrinkers",
    appleMusicUrl: "https://music.apple.com",
    youtubeUrl: "https://youtube.com/@thedrinkers",
  },
  {
    id: "2",
    title: "Rock'n'Roll Življenje",
    artist: "The Drinkers",
    album: "Na Zdravje (2023)",
    coverArt: "/images/album-na-zdravje.jpg",
    duration: 252, // 4:12
  },
  {
    id: "3",
    title: "Noč Je Naša",
    artist: "The Drinkers",
    album: "Na Zdravje (2023)",
    coverArt: "/images/album-na-zdravje.jpg",
    duration: 238, // 3:58
  },
];

export default function PersistentPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [progress, setProgress] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const currentTrack = defaultTracks[currentTrackIndex];
  const progressInterval = useRef<NodeJS.Timeout>();

  // Simulate playback progress
  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            handleNext();
            return 0;
          }
          return prev + 100 / currentTrack.duration;
        });
      }, 1000);
    } else {
      clearInterval(progressInterval.current);
    }

    return () => clearInterval(progressInterval.current);
  }, [isPlaying, currentTrack]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % defaultTracks.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentTrackIndex(
      (prev) => (prev - 1 + defaultTracks.length) % defaultTracks.length,
    );
    setProgress(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const currentTime = (progress / 100) * currentTrack.duration;

  return (
    <>
      {/* Spacer to prevent content from being hidden behind player */}
      <div className="h-24" />

      <motion.div
        className="fixed bottom-0 left-0 right-0 z-50"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 20 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Blur Backdrop */}
        <div className="absolute inset-0 bg-black/90 backdrop-blur-lg border-t border-white/10" />

        {/* Progress Bar */}
        <div
          className="relative h-1 bg-white/10 cursor-pointer group"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const newProgress = (x / rect.width) * 100;
            setProgress(newProgress);
          }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-[#ECA3B7] via-[#FF6B6B] to-[#ECA3B7]"
            style={{ width: `${progress}%` }}
          >
            {/* Playhead */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg" />
          </motion.div>

          {/* Time Display */}
          <div className="absolute -top-6 right-4 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
            {formatTime(currentTime)} / {formatTime(currentTrack.duration)}
          </div>
        </div>

        {/* Player Content */}
        <div className="relative z-10 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            {/* Left: Track Info */}
            <motion.div
              className="flex items-center gap-3 md:gap-4 flex-1 min-w-0"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {/* Album Art */}
              <motion.div
                className="relative w-12 h-12 md:w-14 md:h-14 rounded-md overflow-hidden shadow-lg flex-shrink-0 cursor-pointer"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src={currentTrack.coverArt}
                  alt={currentTrack.album}
                  className="w-full h-full object-cover"
                />
                {/* Vinyl Animation when Playing */}
                {isPlaying && (
                  <motion.div
                    className="absolute inset-0 bg-black/20"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                )}
              </motion.div>

              {/* Track Details */}
              <div className="min-w-0 flex-1">
                <motion.p
                  className="text-white font-bold text-sm md:text-base truncate"
                  key={currentTrack.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {currentTrack.title}
                </motion.p>
                <p className="text-gray-400 text-xs md:text-sm truncate">
                  {currentTrack.artist}
                </p>
              </div>
            </motion.div>

            {/* Center: Controls */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Previous */}
              <motion.button
                onClick={handlePrev}
                className="text-white/70 hover:text-white transition-colors hidden sm:block"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <SkipBack size={20} />
              </motion.button>

              {/* Play/Pause */}
              <motion.button
                onClick={handlePlayPause}
                className="w-10 h-10 md:w-12 md:h-12 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isPlaying ? (
                  <Pause size={20} className="md:w-5 md:h-5" />
                ) : (
                  <Play size={20} className="md:w-5 md:h-5" />
                )}
              </motion.button>

              {/* Next */}
              <motion.button
                onClick={handleNext}
                className="text-white/70 hover:text-white transition-colors hidden sm:block"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <SkipForward size={20} />
              </motion.button>
            </div>

            {/* Right: Volume & Links */}
            <div className="flex items-center gap-3 md:gap-4 flex-1 justify-end">
              {/* Volume Control */}
              <div className="hidden md:flex items-center gap-2 group/volume">
                <motion.button
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-white/70 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX size={20} />
                  ) : (
                    <Volume2 size={20} />
                  )}
                </motion.button>

                {/* Volume Slider */}
                <div className="w-0 group-hover/volume:w-24 overflow-hidden transition-all duration-300">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                      setVolume(parseFloat(e.target.value));
                      setIsMuted(false);
                    }}
                    className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
                  />
                </div>
              </div>

              {/* Streaming Links */}
              <div className="hidden lg:flex items-center gap-3">
                {currentTrack.spotifyUrl && (
                  <motion.a
                    href={currentTrack.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-green-500 transition-colors"
                    whileHover={{ scale: 1.2 }}
                  >
                    <i className="fab fa-spotify text-xl" />
                  </motion.a>
                )}
                {currentTrack.appleMusicUrl && (
                  <motion.a
                    href={currentTrack.appleMusicUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-pink-500 transition-colors"
                    whileHover={{ scale: 1.2 }}
                  >
                    <i className="fab fa-apple text-xl" />
                  </motion.a>
                )}
                {currentTrack.youtubeUrl && (
                  <motion.a
                    href={currentTrack.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-red-500 transition-colors"
                    whileHover={{ scale: 1.2 }}
                  >
                    <i className="fab fa-youtube text-xl" />
                  </motion.a>
                )}
              </div>

              {/* Expand Button */}
              <motion.button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-white/70 hover:text-white transition-colors lg:hidden"
                whileHover={{ scale: 1.1 }}
              >
                <ExternalLink size={20} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Expanded View (Mobile) */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="relative z-20 bg-black/95 border-t border-white/10 overflow-hidden"
            >
              <div className="p-6">
                {/* Large Album Art */}
                <div className="w-48 h-48 mx-auto mb-6 rounded-lg overflow-hidden shadow-2xl">
                  <img
                    src={currentTrack.coverArt}
                    alt={currentTrack.album}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Track Info */}
                <h3 className="text-xl font-bold text-white text-center mb-2">
                  {currentTrack.title}
                </h3>
                <p className="text-gray-400 text-center mb-6">
                  {currentTrack.artist}
                </p>

                {/* Streaming Links */}
                <div className="flex justify-center gap-4">
                  {currentTrack.spotifyUrl && (
                    <a
                      href={currentTrack.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition"
                    >
                      <i className="fab fa-spotify mr-2" />
                      Spotify
                    </a>
                  )}
                  {currentTrack.appleMusicUrl && (
                    <a
                      href={currentTrack.appleMusicUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-white text-black rounded-lg font-bold hover:bg-gray-200 transition"
                    >
                      <i className="fab fa-apple mr-2" />
                      Apple Music
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
