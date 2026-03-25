"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Ticket, Users } from "lucide-react";
import Link from "next/link";

interface Concert {
  id: string;
  city: string;
  venue: string;
  date: string;
  time: string;
  location: { lat: number; lng: number };
  ticketUrl?: string;
  status: "available" | "selling-fast" | "sold-out";
  attendees?: number;
}

const concerts: Concert[] = [
  {
    id: "1",
    city: "Ljubljana",
    venue: "Kino Šiška",
    date: "2026-04-15",
    time: "21:00",
    location: { lat: 46.0569, lng: 14.5058 },
    ticketUrl: "https://eventim.si",
    status: "available",
    attendees: 600,
  },
  {
    id: "2",
    city: "Maribor",
    venue: "Club u14",
    date: "2026-05-05",
    time: "22:00",
    location: { lat: 46.5547, lng: 15.6459 },
    ticketUrl: "https://eventim.si",
    status: "selling-fast",
    attendees: 400,
  },
  {
    id: "3",
    city: "Kranj",
    venue: "Valdnota",
    date: "2026-05-12",
    time: "20:00",
    location: { lat: 46.239, lng: 14.3556 },
    ticketUrl: "https://eventim.si",
    status: "available",
    attendees: 300,
  },
  {
    id: "4",
    city: "Celje",
    venue: "Klub Cirkus",
    date: "2026-05-20",
    time: "21:30",
    location: { lat: 46.2311, lng: 15.2683 },
    ticketUrl: "https://eventim.si",
    status: "available",
    attendees: 350,
  },
  {
    id: "5",
    city: "Koper",
    venue: "Open Air Festival",
    date: "2026-06-15",
    time: "21:00",
    location: { lat: 45.5481, lng: 13.7301 },
    ticketUrl: "https://eventim.si",
    status: "selling-fast",
    attendees: 1000,
  },
  {
    id: "6",
    city: "Litija",
    venue: "Letno Gledališče",
    date: "2026-06-03",
    time: "20:30",
    location: { lat: 46.0563, lng: 14.8244 },
    ticketUrl: "https://eventim.si",
    status: "sold-out",
    attendees: 500,
  },
];

export default function InteractiveTourMap() {
  return (
    <section className="py-20 bg-gradient-to-b from-rock-dark to-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Zemljevid Koncertov
          </h2>
          <p className="text-xl text-gray-400">Najdi koncert v svoji bližini</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Interactive Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[500px] bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-2xl overflow-hidden border border-white/10"
          >
            {/* Slovenia Map SVG */}
            <svg
              className="w-full h-full"
              viewBox="0 0 800 600"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Slovenia Outline (simplified) */}
              <path
                d="M200,250 L300,200 L450,220 L550,250 L600,300 L580,380 L500,420 L400,430 L300,420 L220,380 L180,320 Z"
                className="fill-white/5 stroke-white/20"
                strokeWidth="2"
              />

              {/* Concert Markers */}
              {concerts.map((concert, index) => {
                // Simplified positioning for demo
                const positions: { [key: string]: { x: number; y: number } } = {
                  Ljubljana: { x: 300, y: 280 },
                  Maribor: { x: 500, y: 220 },
                  Kranj: { x: 280, y: 260 },
                  Celje: { x: 450, y: 300 },
                  Koper: { x: 200, y: 400 },
                  Litija: { x: 350, y: 290 },
                };
                const pos = positions[concert.city];

                return (
                  <g key={concert.id}>
                    {/* Pulse Animation */}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="20"
                      className={`fill-${getStatusColor(concert.status)}/20`}
                    >
                      <animate
                        attributeName="r"
                        from="10"
                        to="20"
                        dur="1.5s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        from="0.8"
                        to="0"
                        dur="1.5s"
                        repeatCount="indefinite"
                      />
                    </circle>

                    {/* Main Marker */}
                    <motion.circle
                      cx={pos.x}
                      cy={pos.y}
                      r="8"
                      className={`fill-${getStatusColor(concert.status)}`}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.5 }}
                    />

                    {/* City Label */}
                    <text
                      x={pos.x}
                      y={pos.y + 25}
                      textAnchor="middle"
                      className="fill-white text-sm font-bold"
                      style={{ fontSize: "12px" }}
                    >
                      {concert.city}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 flex gap-4 text-xs text-white/70">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span>Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <span>Selling Fast</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span>Sold Out</span>
              </div>
            </div>
          </motion.div>

          {/* Concert Cards */}
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
            {concerts.map((concert, index) => (
              <motion.div
                key={concert.id}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10 hover:border-[#ECA3B7]/50 transition-all duration-300 hover:scale-[1.02]"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Date & Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="text-[#ECA3B7]" size={20} />
                      <span className="text-white font-bold">
                        {new Date(concert.date).toLocaleDateString("sl-SI", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mb-2">
                      <MapPin className="text-white/70" size={20} />
                      <div>
                        <p className="text-white font-bold">{concert.city}</p>
                        <p className="text-gray-400 text-sm">{concert.venue}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <Users size={16} />
                      <span>{concert.attendees} pričakovanih obiskovalcev</span>
                      <span className="mx-2">•</span>
                      <span>Vrata: {concert.time}</span>
                    </div>
                  </div>

                  {/* Status & CTA */}
                  <div className="flex flex-col items-end gap-2">
                    <StatusBadge status={concert.status} />

                    {concert.status === "sold-out" ? (
                      <button
                        disabled
                        className="px-4 py-2 bg-gray-600 text-gray-300 rounded-lg text-sm font-bold cursor-not-allowed"
                      >
                        Razprodano
                      </button>
                    ) : (
                      <Link
                        href={concert.ticketUrl || "/tour"}
                        className="px-4 py-2 bg-gradient-to-r from-[#ECA3B7] to-[#FF6B6B] text-white rounded-lg text-sm font-bold hover:opacity-90 transition flex items-center gap-2"
                      >
                        <Ticket size={16} />
                        Kupi
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(236, 163, 183, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(236, 163, 183, 0.8);
        }
      `}</style>
    </section>
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case "available":
      return "green-500";
    case "selling-fast":
      return "yellow-500";
    case "sold-out":
      return "red-500";
    default:
      return "gray-500";
  }
}

function StatusBadge({ status }: { status: string }) {
  const colors = {
    available: "bg-green-500/20 text-green-400 border-green-500/50",
    "selling-fast": "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
    "sold-out": "bg-red-500/20 text-red-400 border-red-500/50",
  };

  const labels = {
    available: "Na voljo",
    "selling-fast": "Hiti se",
    "sold-out": "Razprodano",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-bold border ${colors[status as keyof typeof colors]}`}
    >
      {labels[status as keyof typeof labels]}
    </span>
  );
}
