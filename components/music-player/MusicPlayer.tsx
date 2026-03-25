"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Volume1,
  Shuffle,
  Repeat,
  Repeat1,
  ListMusic,
  Mic2,
  ExternalLink,
  Heart,
  Share2,
} from "lucide-react";
import Image from "next/image";
import { Slider } from "@/components/ui/slider";

// Types
interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  albumArt: string;
  trackNumber: number;
  spotifyUrl?: string | null;
  appleMusicUrl?: string | null;
  lyrics?: string | null;
}

interface MusicPlayerProps {
  tracks: Track[];
  initialTrackIndex?: number;
  onTrackChange?: (track: Track) => void;
  onPlayPause?: (isPlaying: boolean) => void;
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  tracks,
  initialTrackIndex = 0,
  onTrackChange,
  onPlayPause,
}) => {
  // State
  const [currentTrackIndex, setCurrentTrackIndex] = useState(initialTrackIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<"off" | "all" | "one">("off");
  const [showQueue, setShowQueue] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isRotating, setIsRotating] = useState(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  const currentTrack = tracks[currentTrackIndex];
  const duration = currentTrack?.duration || 0;

  // Playback simulation
  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            handleTrackEnd();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [isPlaying, duration]);

  // Notify parent of track change
  useEffect(() => {
    onTrackChange?.(currentTrack);
  }, [currentTrack, onTrackChange]);

  // Notify parent of play/pause
  useEffect(() => {
    onPlayPause?.(isPlaying);
  }, [isPlaying, onPlayPause]);

  const handleTrackEnd = useCallback(() => {
    if (repeatMode === "one") {
      setCurrentTime(0);
    } else {
      handleNext();
    }
  }, [repeatMode]);

  const handlePlayPause = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const handleNext = useCallback(() => {
    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * tracks.length);
      setCurrentTrackIndex(randomIndex);
    } else {
      setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    }
    setCurrentTime(0);
    setIsPlaying(true);
    setIsRotating(true);
  }, [isShuffle, tracks.length]);

  const handlePrevious = useCallback(() => {
    if (currentTime > 3) {
      setCurrentTime(0);
    } else {
      setCurrentTrackIndex(
        (prev) => (prev - 1 + tracks.length) % tracks.length,
      );
      setCurrentTime(0);
      setIsPlaying(true);
      setIsRotating(true);
    }
  }, [currentTime, tracks.length]);

  const handleSeek = useCallback((value: number[]) => {
    setCurrentTime(value[0]);
  }, []);

  const handleVolumeChange = useCallback((value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  }, []);

  const toggleMute = useCallback(() => {
    if (isMuted) {
      setVolume(0.5);
      setIsMuted(false);
    } else {
      setVolume(0);
      setIsMuted(true);
    }
  }, [isMuted]);

  const toggleShuffle = useCallback(() => {
    setIsShuffle(!isShuffle);
  }, [isShuffle]);

  const toggleRepeat = useCallback(() => {
    setRepeatMode((prev) => {
      if (prev === "off") return "all";
      if (prev === "all") return "one";
      return "off";
    });
  }, []);

  const toggleLike = useCallback(() => {
    setIsLiked(!isLiked);
  }, [isLiked]);

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return VolumeX;
    if (volume < 0.5) return Volume1;
    return Volume2;
  };

  const getRepeatIcon = () => {
    if (repeatMode === "one") return Repeat1;
    return Repeat;
  };

  const VolumeIcon = getVolumeIcon();
  const RepeatIcon = getRepeatIcon();

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Main Player */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-purple-500/20"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Left Side - Album Art */}
          <div className="p-8 flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm">
            {/* Album Art */}
            <motion.div
              animate={{ rotate: isPlaying && isRotating ? 360 : 0 }}
              transition={{
                duration: 3,
                repeat: isPlaying && isRotating ? Infinity : 0,
                ease: "linear",
              }}
              className="relative w-64 h-64 md:w-72 md:h-72 rounded-full shadow-2xl overflow-hidden border-4 border-purple-500/30"
            >
              <Image
                src={currentTrack.albumArt}
                alt={currentTrack.album}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 256px, 288px"
              />
              {/* Center hole for vinyl effect */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gray-900 border-2 border-purple-500/30" />
              </div>
            </motion.div>

            {/* Track Info */}
            <div className="mt-6 text-center">
              <motion.h2
                key={currentTrack.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold text-white mb-1"
              >
                {currentTrack.title}
              </motion.h2>
              <motion.p
                key={currentTrack.artist}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-purple-300 text-lg"
              >
                {currentTrack.artist}
              </motion.p>
              <motion.p
                key={currentTrack.album}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-gray-400 text-sm mt-1"
              >
                {currentTrack.album}
              </motion.p>
            </div>

            {/* Streaming Links */}
            <div className="flex gap-3 mt-4">
              {currentTrack.spotifyUrl && (
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href={currentTrack.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-green-500 rounded-full hover:bg-green-600 transition-colors"
                  title="Listen on Spotify"
                >
                  <ExternalLink className="w-5 h-5 text-white" />
                </motion.a>
              )}
              {currentTrack.appleMusicUrl && (
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href={currentTrack.appleMusicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-pink-500 rounded-full hover:bg-pink-600 transition-colors"
                  title="Listen on Apple Music"
                >
                  <ExternalLink className="w-5 h-5 text-white" />
                </motion.a>
              )}
            </div>
          </div>

          {/* Right Side - Controls */}
          <div className="p-6 flex flex-col justify-between">
            {/* Top Actions */}
            <div className="flex items-center justify-between">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowLyrics(!showLyrics)}
                className={`p-2 rounded-lg transition-colors ${
                  showLyrics
                    ? "bg-purple-600 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
                title="Show Lyrics"
              >
                <Mic2 className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleLike}
                className={`p-2 rounded-lg transition-colors ${
                  isLiked
                    ? "text-pink-500"
                    : "text-gray-400 hover:text-pink-500 hover:bg-gray-800"
                }`}
                title="Like Track"
              >
                <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowQueue(!showQueue)}
                className={`p-2 rounded-lg transition-colors ${
                  showQueue
                    ? "bg-purple-600 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
                title="Show Queue"
              >
                <ListMusic className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                title="Share"
              >
                <Share2 className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2 my-6">
              <Slider
                value={[currentTime]}
                max={duration}
                step={1}
                onValueChange={handleSeek}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleShuffle}
                className={`p-2 rounded-lg transition-colors ${
                  isShuffle
                    ? "text-purple-400"
                    : "text-gray-400 hover:text-white"
                }`}
                title="Shuffle"
              >
                <Shuffle className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePrevious}
                className="p-3 text-gray-400 hover:text-white transition-colors"
                title="Previous"
              >
                <SkipBack className="w-6 h-6" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePlayPause}
                className="p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-shadow"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8" />
                ) : (
                  <Play className="w-8 h-8 ml-1" />
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNext}
                className="p-3 text-gray-400 hover:text-white transition-colors"
                title="Next"
              >
                <SkipForward className="w-6 h-6" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleRepeat}
                className={`p-2 rounded-lg transition-colors ${
                  repeatMode !== "off"
                    ? "text-purple-400"
                    : "text-gray-400 hover:text-white"
                }`}
                title={`Repeat ${repeatMode === "one" ? "One" : repeatMode === "all" ? "All" : "Off"}`}
              >
                <RepeatIcon className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleMute}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                title={isMuted ? "Unmute" : "Mute"}
              >
                <VolumeIcon className="w-5 h-5" />
              </motion.button>
              <Slider
                value={[isMuted ? 0 : volume]}
                max={1}
                step={0.01}
                onValueChange={handleVolumeChange}
                className="flex-1"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Queue Panel */}
      <AnimatePresence>
        {showQueue && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 bg-gray-900/90 backdrop-blur-sm rounded-2xl border border-purple-500/20 overflow-hidden"
          >
            <div className="p-4">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <ListMusic className="w-5 h-5 text-purple-400" />
                Up Next
              </h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {tracks.map((track, index) => (
                  <motion.button
                    key={track.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setCurrentTrackIndex(index);
                      setCurrentTime(0);
                      setIsPlaying(true);
                    }}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      index === currentTrackIndex
                        ? "bg-purple-600/30 border border-purple-500/50"
                        : "hover:bg-gray-800 border border-transparent"
                    }`}
                  >
                    <div className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={track.albumArt}
                        alt={track.album}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <p
                        className={`font-semibold truncate ${
                          index === currentTrackIndex
                            ? "text-purple-300"
                            : "text-white"
                        }`}
                      >
                        {track.title}
                      </p>
                      <p className="text-sm text-gray-400 truncate">
                        {track.artist}
                      </p>
                    </div>
                    <span className="text-sm text-gray-400">
                      {formatTime(track.duration)}
                    </span>
                    {index === currentTrackIndex && isPlaying && (
                      <div className="flex gap-0.5">
                        {[1, 2, 3].map((bar) => (
                          <motion.div
                            key={bar}
                            animate={{ height: [4, 12, 4] }}
                            transition={{
                              duration: 0.5,
                              repeat: Infinity,
                              delay: bar * 0.1,
                            }}
                            className="w-1 bg-purple-400 rounded-full"
                          />
                        ))}
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lyrics Panel */}
      <AnimatePresence>
        {showLyrics && currentTrack.lyrics && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 bg-gray-900/90 backdrop-blur-sm rounded-2xl border border-purple-500/20 overflow-hidden"
          >
            <div className="p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Mic2 className="w-5 h-5 text-purple-400" />
                Lyrics
              </h3>
              <div className="max-h-64 overflow-y-auto">
                <p className="text-gray-300 whitespace-pre-line leading-relaxed">
                  {currentTrack.lyrics}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MusicPlayer;
