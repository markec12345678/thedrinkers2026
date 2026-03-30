"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { albums, videos } from "@/lib/constants";

export function MusicGrid() {
  const latestAlbum = albums[0];

  return (
    <Section id="music" background="gradient">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="section-title text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          GLASBA
        </motion.h2>

        {/* Latest Release */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16 card p-6">
          {/* Album Cover */}
          <motion.div
            className="relative group cursor-pointer"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <img
              src={latestAlbum.artwork}
              alt={latestAlbum.title}
              className="w-full aspect-square object-cover rounded-lg shadow-2xl"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
              <div className="w-20 h-20 bg-crimson rounded-full flex items-center justify-center">
                <i className="fas fa-play text-3xl text-white" />
              </div>
            </div>
          </motion.div>

          {/* Album Info */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl font-bold text-crimson mb-2">
              {latestAlbum.title}
            </h3>
            <p className="text-text-gray text-lg mb-6">{latestAlbum.year}</p>

            {/* Track List */}
            <div className="space-y-2 mb-6">
              {latestAlbum.tracks.slice(0, 4).map((track, index) => (
                <div
                  key={track.id}
                  className="flex items-center py-3 border-b border-white/10 hover:bg-crimson/10 hover:pl-4 transition-all duration-300 cursor-pointer"
                >
                  <span className="text-crimson font-bold w-8">
                    {index + 1}
                  </span>
                  <span className="flex-1 font-bold">{track.title}</span>
                  <span className="text-text-gray text-sm">
                    {track.duration}
                  </span>
                </div>
              ))}
            </div>

            {/* Streaming Links */}
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="sm" asChild>
                <a
                  href={latestAlbum.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-spotify mr-2" />
                  Spotify
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a
                  href={latestAlbum.appleMusicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-apple mr-2" />
                  Apple Music
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a
                  href={latestAlbum.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-youtube mr-2" />
                  YouTube
                </a>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Music Videos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-crimson text-center mb-8">
            VIDEO POSNETKI
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                className="card overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <VideoPlayer
                  videoId={video.youtubeId}
                  title={video.title}
                  thumbnail={video.thumbnail}
                />
                <div className="p-4">
                  <h4 className="text-xl font-bold text-crimson mb-1">
                    {video.title}
                  </h4>
                  <p className="text-text-gray text-sm">
                    {video.type === "official" && "Official Video"}
                    {video.type === "live" && "Live Performance"}
                    {video.type === "behind-scenes" && "Behind the Scenes"}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
