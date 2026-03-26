"use client";

import { motion } from "framer-motion";
import {
  Download,
  Mail,
  Music,
  Image as ImageIcon,
  FileText,
  ExternalLink,
  Calendar,
  Award,
  Mic2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function PressKitContent() {
  const bandMembers = [
    { name: "John Doe", role: "Vocals & Guitar" },
    { name: "Jane Smith", role: "Bass & Backing Vocals" },
    { name: "Mike Johnson", role: "Drums" },
    { name: "Sarah Williams", role: "Lead Guitar" },
  ];

  const discography = [
    { title: "First Round", year: "2020", type: "Album" },
    { title: "Midnight Sessions", year: "2022", type: "Album" },
    { title: "Live at Orto Bar", year: "2024", type: "Live Album" },
    { title: "Tour 2026", year: "2026", type: "Album" },
  ];

  const achievements = [
    "🏆 Best Rock Band Slovenia 2023",
    "🎵 Over 1M streams on Spotify",
    "🎤 Sold-out shows across Europe",
    "📀 4 studio albums released",
  ];

  const pressContacts = [
    {
      name: "Marko Novak",
      role: "Press Manager",
      email: "press@thedrinkers.si",
      phone: "+386 40 123 456",
    },
    {
      name: "Ana Petrovič",
      role: "Booking Agent",
      email: "booking@thedrinkers.si",
      phone: "+386 40 987 654",
    },
  ];

  return (
    <div className="space-y-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          Press Kit
        </h1>
        <p className="text-xl text-purple-200 max-w-2xl mx-auto">
          Official press kit for The Drinkers. Everything you need for media
          coverage.
        </p>
      </motion.div>

      {/* Quick Downloads */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl">
          <ImageIcon className="w-12 h-12 text-purple-600 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            High-Res Photos
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Professional band photos for press use
          </p>
          <Button className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Download Pack
          </Button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl">
          <Music className="w-12 h-12 text-purple-600 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Music Samples
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Press-ready audio samples
          </p>
          <Button className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Download Samples
          </Button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl">
          <FileText className="w-12 h-12 text-purple-600 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Full Bio
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Complete band biography
          </p>
          <Button className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Download Bio
          </Button>
        </div>
      </motion.div>

      {/* Band Bio */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Band Biography
        </h2>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The Drinkers are a Slovenian rock band formed in 2019. Known for
            their energetic live performances and catchy anthems, they&apos;ve
            quickly become one of the most exciting acts on the Slovenian rock
            scene.
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            With four studio albums under their belt and over 1 million streams
            on Spotify, The Drinkers have proven their ability to connect with
            audiences across Europe. Their latest album &quot;Tour 2026&quot;
            marks a new chapter in their musical journey.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            The band&apos;s unique blend of classic rock influences with modern
            sensibilities has earned them comparisons to legends while
            maintaining a sound that&apos;s distinctly their own.
          </p>
        </div>
      </motion.div>

      {/* Band Members */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Band Members
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bandMembers.map((member, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-xl">
                {member.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100">
                  {member.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Discography */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Discography
        </h2>
        <div className="space-y-4">
          {discography.map((album, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                  <Music className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100">
                    {album.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {album.type}
                  </p>
                </div>
              </div>
              <span className="text-gray-600 dark:text-gray-400 font-medium">
                {album.year}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Achievements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
            >
              <span className="text-2xl">{achievement.charAt(0)}</span>
              <span className="text-gray-900 dark:text-gray-100 font-medium">
                {achievement.slice(2)}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Press Contacts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Press Contacts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pressContacts.map((contact, index) => (
            <div
              key={index}
              className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl"
            >
              <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100 mb-2">
                {contact.name}
              </h3>
              <p className="text-purple-600 dark:text-purple-400 mb-4">
                {contact.role}
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Mail className="w-4 h-4" />
                  <a
                    href={`mailto:${contact.email}`}
                    className="hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    {contact.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <ExternalLink className="w-4 h-4" />
                  <span>{contact.phone}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Social Media */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Social Media
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" className="h-16" asChild>
            <a
              href="https://instagram.com/thedrinkers"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </Button>
          <Button variant="outline" className="h-16" asChild>
            <a
              href="https://facebook.com/thedrinkers"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </Button>
          <Button variant="outline" className="h-16" asChild>
            <a
              href="https://twitter.com/thedrinkers"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          </Button>
          <Button variant="outline" className="h-16" asChild>
            <a
              href="https://youtube.com/thedrinkers"
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube
            </a>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
