"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Bell, Clock, TrendingUp, Crown } from "lucide-react";

// Simplified DropCard for faster loading
function SimpleDropCard({ drop, onPurchase, onJoinWaitlist }: any) {
  const isSoldOut = drop.isSoldOut || drop.quantityRemaining <= 0;
  const percentSold = drop.percentSold || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 rounded-3xl shadow-2xl overflow-hidden border-2 border-purple-500/30"
    >
      {/* Image Placeholder */}
      <div className="relative aspect-square bg-gray-800">
        <div className="absolute inset-0 flex items-center justify-center text-gray-600">
          <ShoppingBag className="w-24 h-24" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <h3 className="text-2xl font-bold text-white">{drop.name}</h3>

        <div className="flex items-center gap-3">
          <span className="text-4xl font-bold text-white">€{drop.price}</span>
          {drop.originalPrice && (
            <span className="text-xl text-gray-500 line-through">
              €{drop.originalPrice}
            </span>
          )}
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-400">
            <span>{drop.quantityRemaining} remaining</span>
            <span>{percentSold}% sold</span>
          </div>
          <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
            <div
              className={`h-full ${percentSold > 80 ? "bg-red-600" : percentSold > 50 ? "bg-amber-600" : "bg-purple-600"}`}
              style={{ width: `${percentSold}%` }}
            />
          </div>
        </div>

        {/* Button */}
        <button
          onClick={() =>
            isSoldOut ? onJoinWaitlist(drop.id) : onPurchase(drop.id, 1)
          }
          disabled={isSoldOut && !drop.isVipEarlyAccess}
          className={`w-full font-bold py-4 px-8 rounded-xl transition-all ${
            isSoldOut
              ? "bg-gray-700 cursor-not-allowed"
              : drop.isVipEarlyAccess
                ? "bg-gradient-to-r from-amber-600 to-yellow-600"
                : "bg-gradient-to-r from-purple-600 to-pink-600"
          } text-white`}
        >
          {isSoldOut
            ? "Sold Out"
            : drop.isVipEarlyAccess
              ? "VIP Access Only"
              : "Get Yours Now"}
        </button>
      </div>
    </motion.div>
  );
}

export default function DropsPage() {
  const [drops, setDrops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "active" | "vip" | "ending">(
    "all",
  );

  useEffect(() => {
    fetchDrops();
  }, []);

  const fetchDrops = async () => {
    try {
      const response = await fetch("/api/drops/active");
      const data = await response.json();

      if (data.success) {
        setDrops(data.data);
      }
    } catch (error) {
      console.error("Error fetching drops:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (dropId: string, quantity: number) => {
    try {
      const response = await fetch("/api/drops/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dropId, quantity }),
      });

      const data = await response.json();

      if (data.success && data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Failed to purchase");
      }
    } catch (error) {
      console.error("Error purchasing:", error);
      alert("Failed to purchase");
    }
  };

  const handleJoinWaitlist = async (dropId: string) => {
    const email = prompt("Enter your email to join waitlist:");
    if (!email) return;

    try {
      const response = await fetch("/api/drops/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dropId, email }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Added to waitlist!");
      } else {
        alert(data.error || "Failed to join waitlist");
      }
    } catch (error) {
      console.error("Error joining waitlist:", error);
      alert("Failed to join waitlist");
    }
  };

  const filteredDrops = drops.filter((drop) => {
    if (filter === "vip") return drop.isVipEarlyAccess;
    if (filter === "ending") return drop.timeRemaining < 21600000;
    if (filter === "active") return !drop.isSoldOut;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Clock className="w-12 h-12 text-purple-500" />
            <h1 className="text-6xl font-bold text-white">Limited Drops</h1>
          </div>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Exclusive limited edition items. Once they&apos;re gone,
            they&apos;re gone forever!
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-gradient-to-br from-purple-900 to-gray-900 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-2">
              <ShoppingBag className="w-8 h-8 text-purple-500" />
              <div className="text-4xl font-bold text-white">
                {drops.length}
              </div>
            </div>
            <div className="text-purple-200">Active Drops</div>
          </div>

          <div className="bg-gradient-to-br from-red-900 to-gray-900 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-8 h-8 text-red-500" />
              <div className="text-4xl font-bold text-white">
                {drops.filter((d) => d.percentSold > 50).length}
              </div>
            </div>
            <div className="text-red-200">Selling Fast</div>
          </div>

          <div className="bg-gradient-to-br from-amber-900 to-gray-900 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-2">
              <Crown className="w-8 h-8 text-amber-500" />
              <div className="text-4xl font-bold text-white">
                {drops.filter((d) => d.isVipEarlyAccess).length}
              </div>
            </div>
            <div className="text-amber-200">VIP Exclusive</div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {["all", "active", "vip", "ending"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-6 py-3 rounded-xl font-bold transition-all capitalize ${
                filter === f
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Drops Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-gray-800 rounded-3xl h-96 animate-pulse"
              />
            ))}
          </div>
        ) : filteredDrops.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <Bell className="w-24 h-24 text-gray-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">
              No drops found
            </h2>
            <p className="text-gray-400">
              Check back later for new limited edition drops!
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDrops.map((drop, index) => (
              <motion.div
                key={drop.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <SimpleDropCard
                  drop={drop}
                  onPurchase={handlePurchase}
                  onJoinWaitlist={handleJoinWaitlist}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
