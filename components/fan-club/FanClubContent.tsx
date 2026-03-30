"use client";

import { motion } from "framer-motion";
import {
  Heart,
  Star,
  Calendar,
  MessageCircle,
  Gift,
  Music,
  Ticket,
  Users,
  Shield,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export function FanClubContent() {
  const membershipTiers = [
    {
      name: "Casual Fan",
      price: "Free",
      icon: Heart,
      color: "from-blue-500 to-cyan-500",
      benefits: [
        "Access to fan forum",
        "Monthly newsletter",
        "Fan art submissions",
        "Community events access",
      ],
    },
    {
      name: "Super Fan",
      price: "€9.99/month",
      icon: Star,
      color: "from-purple-500 to-pink-500",
      popular: true,
      benefits: [
        "All Casual Fan benefits",
        "Early ticket access",
        "Exclusive merch discounts",
        "Monthly video calls",
        "Behind-the-scenes content",
        "Fan club merchandise",
      ],
    },
    {
      name: "Ultimate Fan",
      price: "€29.99/month",
      icon: Crown,
      color: "from-amber-500 to-yellow-500",
      benefits: [
        "All Super Fan benefits",
        "Meet & greet access",
        "Signed merchandise",
        "Personal thank you video",
        "Name in album credits",
        "VIP event access",
        "Birthday surprise",
      ],
    },
  ];

  const upcomingEvents = [
    {
      title: "Fan Meet & Greet",
      date: "2026-04-20",
      location: "Ljubljana",
      type: "In-Person",
    },
    {
      title: "Monthly Video Call",
      date: "2026-04-15",
      location: "Online",
      type: "Virtual",
    },
    {
      title: "Fan Art Contest",
      date: "2026-05-01",
      location: "Online",
      type: "Contest",
    },
  ];

  const communityStats = [
    { label: "Active Members", value: "2,500+", icon: Users },
    { label: "Fan Art Submissions", value: "500+", icon: Gift },
    { label: "Events Per Year", value: "24", icon: Calendar },
    { label: "Countries Represented", value: "30+", icon: Shield },
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
          Fan Club
        </h1>
        <p className="text-xl text-purple-200 max-w-2xl mx-auto">
          Join the ultimate community of The Drinkers fans. Exclusive content,
          events, and connect with fans worldwide.
        </p>
      </motion.div>

      {/* Community Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        {communityStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl text-center"
          >
            <stat.icon className="w-12 h-12 text-purple-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Membership Tiers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Membership Tiers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {membershipTiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className={`bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl relative ${
                tier.popular ? "ring-4 ring-purple-500" : ""
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-bold">
                    Most Popular
                  </span>
                </div>
              )}

              <div
                className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${tier.color} flex items-center justify-center mx-auto mb-4`}
              >
                <tier.icon className="w-10 h-10 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center mb-2">
                {tier.name}
              </h3>
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                  {tier.price}
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-400">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full h-12 ${
                  tier.popular
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    : "bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100"
                }`}
              >
                Join Now
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Upcoming Events */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Upcoming Events
        </h2>
        <div className="space-y-4">
          {upcomingEvents.map((event, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-6 bg-gray-50 dark:bg-gray-700 rounded-xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
                  <Ticket className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
                <span className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium">
                  {event.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Community Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl">
          <MessageCircle className="w-12 h-12 text-purple-600 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Fan Forum
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Connect with fans worldwide. Discuss music, share experiences, and
            make new friends.
          </p>
          <Button variant="outline" className="w-full">
            Join Discussion
          </Button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl">
          <Music className="w-12 h-12 text-purple-600 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Exclusive Content
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Behind-the-scenes videos, unreleased tracks, and exclusive
            interviews with the band.
          </p>
          <Button variant="outline" className="w-full">
            View Content
          </Button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl">
          <Gift className="w-12 h-12 text-purple-600 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Fan Merchandise
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Exclusive fan club merchandise. Limited editions and special
            discounts for members.
          </p>
          <Button variant="outline" className="w-full">
            Shop Now
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

// Add missing Crown icon
function Crown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  );
}
