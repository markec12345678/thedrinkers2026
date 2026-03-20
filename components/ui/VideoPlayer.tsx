'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// YouTube Video Props
interface YouTubeVideoPlayerProps {
  videoId: string;
  title: string;
  thumbnail?: string;
  autoplay?: boolean;
}

// Local Video Props
interface LocalVideoPlayerProps {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  className?: string;
}

// Combined Props
interface VideoPlayerProps {
  // Local video props
  src?: string;
  poster?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  className?: string;
  // YouTube video props
  videoId?: string;
  title?: string;
  thumbnail?: string;
  autoplay?: boolean;
}

export function VideoPlayer(props: VideoPlayerProps) {
  // Check if it's a local video by looking for 'src' property
  if (props.src) {
    return (
      <LocalVideoPlayer
        src={props.src}
        poster={props.poster}
        autoPlay={props.autoPlay}
        loop={props.loop}
        muted={props.muted}
        playsInline={props.playsInline}
        className={props.className}
      />
    );
  }

  // YouTube player (default) - requires videoId
  if (props.videoId) {
    return (
      <YouTubeVideoPlayer
        videoId={props.videoId}
        title={props.title || ''}
        thumbnail={props.thumbnail}
        autoplay={props.autoplay}
      />
    );
  }

  return null;
}

function LocalVideoPlayer({
  src,
  poster,
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  className = '',
}: LocalVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && autoPlay) {
      videoRef.current.play().catch((err) => {
        console.warn('Video autoplay was prevented:', err);
      });
    }
  }, [autoPlay]);

  return (
    <video
      ref={videoRef}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      poster={poster}
      className={className}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}

function YouTubeVideoPlayer({ videoId, title, thumbnail, autoplay = false }: YouTubeVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [showModal, setShowModal] = useState(false);

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

  return (
    <>
      <div
        className="relative aspect-video cursor-pointer group overflow-hidden rounded-lg"
        onClick={() => setShowModal(true)}
      >
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <img
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        )}

        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/70 transition-colors flex items-center justify-center">
          <motion.div
            className="w-20 h-20 bg-crimson rounded-full flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="w-10 h-10 text-white ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => {
              setShowModal(false);
              setIsPlaying(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => {
                  setShowModal(false);
                  setIsPlaying(false);
                }}
                className="absolute -top-12 right-0 text-white hover:text-crimson transition-colors text-4xl font-bold"
              >
                ×
              </button>

              <iframe
                src={embedUrl}
                title={title}
                className="w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default VideoPlayer;
