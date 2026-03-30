"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  Image as ImageIcon,
  Upload,
  Heart,
  Eye,
  Award,
  Sparkles,
  CheckCircle2,
  XCircle,
  Clock,
  Palette,
  TrendingUp,
  Share2,
  Download,
  ExternalLink,
  AlertCircle,
} from "lucide-react";
import { FAN_ART_CATEGORIES, UPLOAD_LIMITS, FanArt } from "@/lib/fan-art";

export default function FanArtGallery() {
  const [activeTab, setActiveTab] = useState<"gallery" | "submit" | "contests">(
    "gallery",
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"latest" | "popular" | "featured">(
    "popular",
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock data
  const [fanArts] = useState<FanArt[]>([
    {
      id: "1",
      userId: "user1",
      username: "RockArtist99",
      title: "The Drinkers Live",
      description: "My sketch from the amazing concert in Ljubljana!",
      imageUrl: "/images/fan-art/1.jpg",
      status: "featured",
      category: "sketch",
      likes: 125,
      views: 1250,
      createdAt: new Date(Date.now() - 86400000 * 2),
      updatedAt: new Date(),
      aiEnhanced: false,
      merchEligible: true,
    },
    {
      id: "2",
      userId: "user2",
      username: "MusicFan",
      title: "Pivolucija Album Art",
      description: "Digital painting inspired by Pivolucija",
      imageUrl: "/images/fan-art/2.jpg",
      status: "approved",
      category: "digital",
      likes: 89,
      views: 890,
      createdAt: new Date(Date.now() - 86400000 * 5),
      updatedAt: new Date(),
      aiEnhanced: false,
      merchEligible: true,
    },
    {
      id: "3",
      userId: "user3",
      username: "ConcertPhotog",
      title: "Orto Bar 2025",
      description: "Best moment from the concert",
      imageUrl: "/images/fan-art/3.jpg",
      status: "approved",
      category: "photo",
      likes: 156,
      views: 1560,
      createdAt: new Date(Date.now() - 86400000 * 1),
      updatedAt: new Date(),
      aiEnhanced: false,
      merchEligible: false,
    },
  ]);

  const stats = {
    totalSubmissions: 47,
    pendingReview: 5,
    featured: 12,
    totalLikes: 2340,
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // TODO: Handle file upload
      console.log("Selected file:", file);
    }
  };

  const statusIcons = {
    pending: Clock,
    approved: CheckCircle2,
    rejected: XCircle,
    featured: Award,
  };

  const statusColors = {
    pending: "text-yellow-500 bg-yellow-500/10",
    approved: "text-green-500 bg-green-500/10",
    rejected: "text-red-500 bg-red-500/10",
    featured: "text-amber-500 bg-amber-500/10",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-rock-black to-rock-bg p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Palette className="w-10 h-10 text-purple-500" />
            <h1 className="text-4xl md:text-6xl font-bold text-gradient">
              Fan Art Gallery
            </h1>
            <Sparkles className="w-10 h-10 text-purple-500 animate-pulse" />
          </div>
          <p className="text-xl text-rock-muted mb-2">
            Umetnost ustvarjena s strani fanov
          </p>
          <p className="text-sm text-rock-muted">
            {stats.totalSubmissions} del | {stats.totalLikes} všečkov |{" "}
            {stats.featured} izbranih
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab("gallery")}
            className={`px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === "gallery"
                ? "bg-purple-500 text-white"
                : "bg-rock-gray/50 text-rock-muted hover:bg-rock-gray"
            }`}
          >
            <ImageIcon className="w-5 h-5 inline mr-2" aria-hidden="true" />
            Galerija
          </button>
          <button
            onClick={() => setActiveTab("submit")}
            className={`px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === "submit"
                ? "bg-purple-500 text-white"
                : "bg-rock-gray/50 text-rock-muted hover:bg-rock-gray"
            }`}
          >
            <Upload className="w-5 h-5 inline mr-2" />
            Oddaj Delo
          </button>
          <button
            onClick={() => setActiveTab("contests")}
            className={`px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === "contests"
                ? "bg-purple-500 text-white"
                : "bg-rock-gray/50 text-rock-muted hover:bg-rock-gray"
            }`}
          >
            <Award className="w-5 h-5 inline mr-2" />
            Nagradni Tekmovanja
          </button>
        </div>

        {/* Gallery Tab */}
        {activeTab === "gallery" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-6">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-rock-gray/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label="Filter kategorij"
                title="Izberi kategorijo umetnin"
              >
                <option value="all">Vse Kategorije</option>
                {Object.entries(FAN_ART_CATEGORIES).map(([id, cat]) => (
                  <option key={id} value={id}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 bg-rock-gray/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label="Razvršanje"
                title="Razvršaj umetnine"
              >
                <option value="popular">Najbolj Priljubljeno</option>
                <option value="latest">Najnovejše</option>
                <option value="featured">Izbrana</option>
              </select>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {fanArts.map((art, index) => {
                const StatusIcon = statusIcons[art.status];
                return (
                  <motion.div
                    key={art.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <GlassCard variant="dark" className="p-4 h-full">
                      {/* Image */}
                      <div className="relative aspect-square mb-4 rounded-lg overflow-hidden bg-rock-gray flex items-center justify-center">
                        <ImageIcon
                          className="w-16 h-16 opacity-50 text-gray-600"
                          aria-hidden="true"
                        />

                        {/* Status Badge */}
                        <div
                          className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${statusColors[art.status]}`}
                        >
                          <StatusIcon className="w-3 h-3" />
                          {art.status.toUpperCase()}
                        </div>

                        {/* AI Enhanced Badge */}
                        {art.aiEnhanced && (
                          <div className="absolute top-2 left-2 px-2 py-1 bg-purple-500 text-white rounded-full text-xs font-bold flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            AI
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div>
                        <h3 className="text-lg font-bold text-white mb-1">
                          {art.title}
                        </h3>
                        <p className="text-sm text-rock-muted mb-2">
                          by {art.username}
                        </p>
                        <p className="text-sm text-rock-muted mb-3 line-clamp-2">
                          {art.description}
                        </p>

                        {/* Stats */}
                        <div className="flex items-center gap-4 text-sm text-rock-muted mb-3">
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4 text-red-500" />
                            {art.likes}
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4 text-blue-500" />
                            {art.views}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <button className="btn-secondary flex-1 text-sm py-2 flex items-center justify-center gap-2">
                            <Heart className="w-4 h-4" />
                            Všeček
                          </button>
                          <button
                            className="btn-secondary text-sm py-2 px-3"
                            title="Deli umetnino"
                          >
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Submit Tab */}
        {activeTab === "submit" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-2xl mx-auto"
          >
            <GlassCard variant="dark" className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Oddaj Svoje Delo
              </h2>

              {/* Upload Area */}
              <div
                onClick={handleFileSelect}
                className="border-2 border-dashed border-purple-500/30 rounded-lg p-12 text-center cursor-pointer hover:border-purple-500 transition-colors mb-6"
              >
                <Upload className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                <p className="text-white font-medium mb-2">
                  Klikni za upload ali povleci datoteko
                </p>
                <p className="text-sm text-rock-muted">
                  Max {UPLOAD_LIMITS.maxSize / 1024 / 1024}MB • JPEG, PNG, WebP,
                  GIF
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={UPLOAD_LIMITS.allowedFormats.join(",")}
                  onChange={handleFileChange}
                  className="hidden"
                  aria-label="Naloži umetnino"
                  title="Izberi datoteko za nalaganje"
                />
              </div>

              {/* Terms Warning */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-amber-400 mb-2">
                      Pomembno: Avtorske Pravice
                    </h4>
                    <ul className="text-sm text-amber-200 space-y-1">
                      <li>• Obdržiš avtorske pravice na svojem delu</li>
                      <li>
                        • Z oddajo dovoliš The Drinkers uporabo za promocijo
                      </li>
                      <li>• Za merch uporabo se dogovoriš posebej</li>
                      <li>
                        • Delo mora biti originalno in brez tujih avtorskih
                        pravic
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button className="btn-primary w-full py-4 text-lg">
                Oddaj Delo v Pregled
              </button>

              <p className="text-sm text-rock-muted text-center mt-4">
                Pregled traja 24-48 ur. Ob odobritvi bo objavljeno v galeriji.
              </p>
            </GlassCard>
          </motion.div>
        )}

        {/* Contests Tab */}
        {activeTab === "contests" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Active Contest */}
              <GlassCard variant="crimson" className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white">
                    🎨 Album Art Contest
                  </h3>
                  <Award className="w-8 h-8 text-crimson" />
                </div>
                <p className="text-rock-muted mb-4">
                  Ustvari naslovnico za nov album The Drinkers!
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-crimson" />
                    <span>Rok: 30. April 2026</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-crimson" />
                    <span>47 oddaj</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Eye className="w-4 h-4 text-crimson" />
                    <span>1,234 glasov</span>
                  </div>
                </div>
                <div className="bg-rock-gray/50 rounded-lg p-4 mb-6">
                  <h4 className="font-bold text-white mb-3">🏆 Nagrade:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🥇</span>
                      <span>1. mesto: Limited Merch Pack + Backstage Pass</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🥈</span>
                      <span>2. mesto: 50% VIP Merch Discount</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🥉</span>
                      <span>3. mesto: 25% VIP Merch Discount</span>
                    </div>
                  </div>
                </div>
                <button className="btn-primary w-full">
                  Sodeluj na Tekmovanju
                </button>
              </GlassCard>

              {/* Guidelines */}
              <GlassCard variant="dark" className="p-6">
                <h3 className="text-2xl font-bold text-white mb-6">
                  📋 Pravila & Smernice
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-white mb-2">Teme:</h4>
                    <ul className="text-sm text-rock-muted space-y-1">
                      <li>• The Drinkers band (člani, logo, itd.)</li>
                      <li>• Album naslovnice</li>
                      <li>• Koncertni prizori</li>
                      <li>• Besedila pesmi (visualizacija)</li>
                      <li>• Karkoli povezano z bandom</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-2">Formati:</h4>
                    <ul className="text-sm text-rock-muted space-y-1">
                      <li>• Sketch / risba</li>
                      <li>• Digital art</li>
                      <li>• Painting / slika</li>
                      <li>• Photography</li>
                      <li>• Mixed media</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-2">Prepovedano:</h4>
                    <ul className="text-sm text-rock-muted space-y-1">
                      <li>• Neprimerna vsebina</li>
                      <li>• Tuja avtorska dela</li>
                      <li>• AI generirano brez ročnih popravkov</li>
                      <li>• Low-effort submissions</li>
                    </ul>
                  </div>
                </div>
              </GlassCard>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
