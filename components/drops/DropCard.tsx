"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  ShoppingBag,
  AlertCircle,
  Crown,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";

interface Drop {
  id: string;
  name: string;
  description: string | null;
  productId: string;
  quantity: number;
  quantityRemaining: number;
  price: string;
  originalPrice: string | null;
  startDate: Date;
  endDate: Date;
  vipEarlyAccess: boolean;
  vipEarlyAccessHours: number | null;
  isActive: boolean;
  isSoldOut: boolean;
  percentSold?: number;
  isVipEarlyAccess?: boolean;
  timeRemaining?: number;
}

interface DropCardProps {
  drop: Drop;
  onPurchase: (dropId: string, quantity: number) => void;
  onJoinWaitlist: (dropId: string) => void;
}

export default function DropCard({
  drop,
  onPurchase,
  onJoinWaitlist,
}: DropCardProps) {
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!drop.timeRemaining || drop.timeRemaining <= 0) return;

    const timer = setInterval(() => {
      const remaining =
        drop.timeRemaining! - (Date.now() - new Date().getTime());

      if (remaining <= 0) {
        setTimeLeft(null);
        clearInterval(timer);
        return;
      }

      const hours = Math.floor(remaining / (1000 * 60 * 60));
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [drop.timeRemaining]);

  const isSoldOut = drop.isSoldOut || drop.quantityRemaining <= 0;
  const isEndingSoon = drop.timeRemaining && drop.timeRemaining < 21600000; // Less than 6 hours
  const isVipOnly = drop.isVipEarlyAccess;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 rounded-3xl shadow-2xl overflow-hidden border-2 ${
        isVipOnly
          ? "border-amber-500/50"
          : isEndingSoon
            ? "border-red-500/50"
            : "border-purple-500/30"
      }`}
    >
      {/* VIP Badge */}
      {isVipOnly && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-4 right-4 z-10"
        >
          <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
            <Crown className="w-4 h-4" />
            VIP Early Access
          </div>
        </motion.div>
      )}

      {/* Ending Soon Badge */}
      {isEndingSoon && !isVipOnly && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-4 right-4 z-10"
        >
          <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg animate-pulse">
            <Clock className="w-4 h-4" />
            Ending Soon
          </div>
        </motion.div>
      )}

      {/* Product Image */}
      <div className="relative aspect-square bg-gray-800 overflow-hidden">
        <Image
          src={`/images/drops/${drop.productId}.jpg`}
          alt={drop.name}
          fill
          className={`object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
        />

        {/* Sold Out Overlay */}
        {isSoldOut && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <div className="text-center">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white">Sold Out</div>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <h3 className="text-2xl font-bold text-white">{drop.name}</h3>

        {/* Description */}
        {drop.description && (
          <p className="text-gray-400 text-sm line-clamp-2">
            {drop.description}
          </p>
        )}

        {/* Price */}
        <div className="flex items-center gap-3">
          <span className="text-4xl font-bold text-white">€{drop.price}</span>
          {drop.originalPrice && (
            <div className="flex flex-col">
              <span className="text-xl text-gray-500 line-through">
                €{drop.originalPrice}
              </span>
              <span className="text-sm text-green-500 font-bold">
                Save €
                {(
                  parseFloat(drop.originalPrice) - parseFloat(drop.price)
                ).toFixed(2)}
              </span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">
              {drop.quantityRemaining} remaining
            </span>
            <span className="text-gray-400">{drop.percentSold}% sold</span>
          </div>
          <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${drop.percentSold}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className={`h-full ${
                drop.percentSold! > 80
                  ? "bg-gradient-to-r from-red-600 to-pink-600"
                  : drop.percentSold! > 50
                    ? "bg-gradient-to-r from-amber-600 to-orange-600"
                    : "bg-gradient-to-r from-purple-600 to-pink-600"
              }`}
            />
          </div>
          {drop.percentSold! > 50 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-red-500 text-sm font-bold"
            >
              <TrendingUp className="w-4 h-4" />
              Selling Fast!
            </motion.div>
          )}
        </div>

        {/* Countdown Timer */}
        {timeLeft && !isSoldOut && (
          <div className="bg-gray-800 rounded-xl p-4 text-center">
            <div className="text-gray-400 text-sm mb-2">Ends in:</div>
            <div className="flex justify-center gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  {timeLeft.hours}
                </div>
                <div className="text-xs text-gray-500">hours</div>
              </div>
              <div className="text-3xl font-bold text-white">:</div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  {timeLeft.minutes}
                </div>
                <div className="text-xs text-gray-500">min</div>
              </div>
              <div className="text-3xl font-bold text-white">:</div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  {timeLeft.seconds}
                </div>
                <div className="text-xs text-gray-500">sec</div>
              </div>
            </div>
          </div>
        )}

        {/* CTA Buttons */}
        {isSoldOut ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onJoinWaitlist(drop.id)}
            className="w-full bg-gradient-to-r from-gray-700 to-gray-600 text-white font-bold py-4 px-8 rounded-xl"
          >
            <ShoppingBag className="w-5 h-5 inline mr-2" />
            Join Waitlist
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onPurchase(drop.id, 1)}
            disabled={isVipOnly}
            className={`w-full font-bold py-4 px-8 rounded-xl ${
              isVipOnly
                ? "bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700"
                : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            } text-white`}
          >
            <ShoppingBag className="w-5 h-5 inline mr-2" />
            {isVipOnly ? "VIP Access Only" : "Get Yours Now"}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
