"use client";

import { motion } from "framer-motion";
import {
  Lock,
  Unlock,
  Play,
  Download,
  Star,
  Ticket,
  Video,
} from "lucide-react";
import { useState } from "react";

/**
 * Gated VIP Content - The Drinkers
 *
 * Features:
 * - Locked content za ne-člane
 * - Exclusive backstage footage
 * - Early ticket access
 * - Meet & greet booking
 * - VIP membership upsell
 *
 * Inspiracija: Jay Hardway (gated exclusive content)
 */

interface VIPContent {
  id: string;
  title: string;
  description: string;
  type: "video" | "ticket" | "meet" | "download";
  locked: boolean;
  image?: string;
}

const vipContents: VIPContent[] = [
  {
    id: "1",
    title: "Backstage Footage",
    description: "Ekskluzivni posnetki iz zaodrja naših koncertov",
    type: "video",
    locked: true,
    image: "/images/backstage.jpg",
  },
  {
    id: "2",
    title: "Early Ticket Access",
    description: "Kupi vstopnice 24h pred drugimi fanovi",
    type: "ticket",
    locked: true,
  },
  {
    id: "3",
    title: "Meet & Greet",
    description: "Spoznaj skupino osebno po koncertu",
    type: "meet",
    locked: true,
  },
  {
    id: "4",
    title: "Exclusive Downloads",
    description: "Redki posnetki, demo verzije in wallpapers",
    type: "download",
    locked: true,
  },
];

export default function VIPExclusiveContent() {
  const [isVIP, setIsVIP] = useState(false); // TODO: Replace with actual auth check

  return (
    <section className="py-20 bg-gradient-to-b from-black to-[#1a0a0a]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#ECA3B7] to-[#FF6B6B] rounded-full mb-6"
          >
            <Star size={20} className="text-white" />
            <span className="text-white font-bold">VIP Only</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            VIP Ekskluzivno
          </h2>
          <p className="text-xl text-gray-400">Samo za registrirane fane</p>

          {/* Demo Toggle */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <span className="text-gray-400">Demo Mode:</span>
            <button
              onClick={() => setIsVIP(!isVIP)}
              className={`px-6 py-2 rounded-full font-bold transition ${
                isVIP
                  ? "bg-gradient-to-r from-[#ECA3B7] to-[#FF6B6B] text-white"
                  : "bg-white/10 text-gray-400"
              }`}
            >
              {isVIP ? "VIP Member" : "Free User"}
            </button>
          </div>
        </motion.div>

        {/* VIP Content Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {vipContents.map((content, index) => (
            <motion.div
              key={content.id}
              className={`relative rounded-2xl overflow-hidden border transition-all duration-300 ${
                content.locked && !isVIP
                  ? "bg-white/5 border-white/10"
                  : "bg-white/10 border-[#ECA3B7]/50"
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Locked Overlay */}
              {content.locked && !isVIP && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-6 text-center">
                  <Lock size={48} className="text-[#ECA3B7] mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">
                    VIP Only
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Postani VIP član za dostop
                  </p>
                  <button className="px-6 py-3 bg-gradient-to-r from-[#ECA3B7] to-[#FF6B6B] text-white rounded-full font-bold hover:scale-105 transition">
                    Join VIP
                  </button>
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                {/* Icon */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#ECA3B7] to-[#FF6B6B] flex items-center justify-center mb-4">
                  {content.type === "video" && (
                    <Video size={32} className="text-white" />
                  )}
                  {content.type === "ticket" && (
                    <Ticket size={32} className="text-white" />
                  )}
                  {content.type === "meet" && (
                    <Star size={32} className="text-white" />
                  )}
                  {content.type === "download" && (
                    <Download size={32} className="text-white" />
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-2">
                  {content.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 mb-6">{content.description}</p>

                {/* Action Button */}
                {isVIP ? (
                  <button className="w-full py-3 bg-white/10 text-white rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-white/20 transition">
                    {content.type === "video" && <Play size={20} />}
                    {content.type === "ticket" && <Ticket size={20} />}
                    {content.type === "meet" && <Star size={20} />}
                    {content.type === "download" && <Download size={20} />}
                    {content.type === "video" && "Predvajaj"}
                    {content.type === "ticket" && "Kupi Vstopnico"}
                    {content.type === "meet" && "Rezerviraj"}
                    {content.type === "download" && "Prenesi"}
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full py-3 bg-gray-600 text-gray-400 rounded-lg font-bold cursor-not-allowed"
                  >
                    Zaklenjeno
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* VIP Membership CTA */}
        {!isVIP && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-r from-[#ECA3B7]/20 to-[#FF6B6B]/20 border border-[#ECA3B7]/50 rounded-2xl p-8 backdrop-blur-lg">
              <h3 className="text-3xl font-bold text-white mb-4">
                Postani VIP Član
              </h3>
              <p className="text-xl text-gray-400 mb-8">
                Dostop do ekskluzivnih vsebin, early ticket access in več
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="px-8 py-4 bg-gradient-to-r from-[#ECA3B7] to-[#FF6B6B] text-white rounded-full font-bold text-lg hover:scale-105 transition">
                  Join VIP - €9.99/mesec
                </button>
                <button className="px-8 py-4 border-2 border-[#ECA3B7] text-[#ECA3B7] rounded-full font-bold text-lg hover:bg-[#ECA3B7]/10 transition">
                  Learn More
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
