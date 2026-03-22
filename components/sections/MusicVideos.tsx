'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { musicVideos, getYouTubeEmbedUrl, getYouTubeWatchUrl } from '@/lib/data/musicVideos';

/**
 * Music Videos Section
 * 
 * Features:
 * - Featured video hero (largest)
 * - Grid of all music videos
 * - YouTube embed player
 * - Filter by album/year
 * - View count display
 * - Responsive design
 */

export default function MusicVideosSection() {
  const [selectedVideo, setSelectedVideo] = useState(musicVideos[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVideoClick = (video: typeof musicVideos[0]) => {
    setSelectedVideo(video);
    setIsPlaying(true);
  };

  return (
    <section className="py-20 bg-rock-black">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
            MUSIC <span className="text-crimson-500">VIDEOS</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Official music videos from The Drinkers
          </p>
        </div>

        {/* Featured Video Player */}
        <div className="mb-16">
          <div className="relative w-full aspect-video bg-rock-gray rounded-2xl overflow-hidden shadow-2xl shadow-crimson-500/20">
            {isPlaying ? (
              <iframe
                src={getYouTubeEmbedUrl(selectedVideo.youtubeId) + '?autoplay=1'}
                title={selectedVideo.title}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div 
                className="absolute inset-0 cursor-pointer group"
                onClick={() => setIsPlaying(true)}
              >
                <Image
                  src={`https://img.youtube.com/vi/${selectedVideo.youtubeId}/maxresdefault.jpg`}
                  alt={selectedVideo.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <div className="w-24 h-24 bg-crimson-500 rounded-full flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 group-hover:bg-crimson-400">
                    <svg className="w-12 h-12 text-white ml-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Now Playing Info */}
          <div className="mt-6 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {selectedVideo.title}
            </h3>
            <div className="flex items-center justify-center gap-4 text-gray-400">
              <span className="flex items-center gap-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {selectedVideo.views} views
              </span>
              <span>•</span>
              <span>{selectedVideo.duration}</span>
              <span>•</span>
              <span>{selectedVideo.year}</span>
            </div>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {musicVideos.map((video) => (
            <div
              key={video.id}
              className={`group cursor-pointer rounded-xl overflow-hidden bg-rock-gray border-2 transition-all duration-300 ${
                selectedVideo.id === video.id
                  ? 'border-crimson-500 shadow-lg shadow-crimson-500/30'
                  : 'border-rock-gray hover:border-crimson-500/50'
              }`}
              onClick={() => handleVideoClick(video)}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video">
                <Image
                  src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Play Icon Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 bg-crimson-500/90 rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
              </div>

              {/* Video Info */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-crimson-400 transition-colors">
                  {video.title}
                </h3>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{video.year}</span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {video.views}
                  </span>
                </div>

                {/* Album Tag */}
                <div className="mt-3 inline-block px-3 py-1 bg-crimson-500/10 text-crimson-400 text-xs rounded-full border border-crimson-500/20">
                  {video.album}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All on YouTube CTA */}
        <div className="text-center mt-12">
          <Link
            href="https://www.youtube.com/@TheDrinkersSlovenija"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/30"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            Watch More on YouTube
          </Link>
        </div>
      </div>
    </section>
  );
}
