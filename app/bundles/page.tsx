"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Gift, ShoppingBag, Truck, Shield, TrendingUp } from "lucide-react";
import BundleCard from "@/components/bundles/BundleCard";

interface Bundle {
  id: string;
  name: string;
  description: string | null;
  items: Array<{ productId: string; quantity: number; productName: string }>;
  bundlePrice: string;
  originalPrice: string;
  savings: string;
  savingsPercent: number;
  isLimited: boolean;
  quantity: number;
  quantityRemaining: number | null;
  isActive: boolean;
}

export default function BundlesPage() {
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "limited" | "available">("all");

  useEffect(() => {
    fetchBundles();
  }, []);

  const fetchBundles = async () => {
    try {
      const response = await fetch("/api/bundles");
      const data = await response.json();

      if (data.success) {
        setBundles(data.data);
      }
    } catch (error) {
      console.error("Error fetching bundles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (bundleId: string) => {
    try {
      const response = await fetch("/api/bundles/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bundleId }),
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

  const filteredBundles = bundles.filter((bundle) => {
    if (filter === "limited") return bundle.isLimited;
    if (filter === "available") return !bundle.isLimited;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-pink-900 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Gift className="w-12 h-12 text-purple-500" />
            <h1 className="text-6xl font-bold text-white">Bundle Deals</h1>
          </div>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Get more for less! Curated bundles with exclusive savings.
          </p>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-gradient-to-br from-purple-900 to-gray-900 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-8 h-8 text-green-500" />
              <div className="text-2xl font-bold text-white">
                Save up to 30%
              </div>
            </div>
            <div className="text-purple-200">Exclusive bundle pricing</div>
          </div>

          <div className="bg-gradient-to-br from-purple-900 to-gray-900 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-2">
              <Truck className="w-8 h-8 text-blue-500" />
              <div className="text-2xl font-bold text-white">Free Shipping</div>
            </div>
            <div className="text-purple-200">On all bundle orders</div>
          </div>

          <div className="bg-gradient-to-br from-purple-900 to-gray-900 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-8 h-8 text-amber-500" />
              <div className="text-2xl font-bold text-white">Best Value</div>
            </div>
            <div className="text-purple-200">Curated by the band</div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              filter === "all"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            All Bundles
          </button>
          <button
            onClick={() => setFilter("limited")}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              filter === "limited"
                ? "bg-gradient-to-r from-amber-600 to-yellow-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            Limited Edition
          </button>
          <button
            onClick={() => setFilter("available")}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              filter === "available"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            Regular Bundles
          </button>
        </motion.div>

        {/* Bundles Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-gray-800 rounded-3xl h-[600px] animate-pulse"
              />
            ))}
          </div>
        ) : filteredBundles.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <Gift className="w-24 h-24 text-gray-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">
              No bundles found
            </h2>
            <p className="text-gray-400">
              Check back later for new bundle deals!
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBundles.map((bundle, index) => (
              <motion.div
                key={bundle.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <BundleCard bundle={bundle} onPurchase={handlePurchase} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Bundle Inquiry */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-20 bg-gradient-to-r from-purple-900 to-pink-900 rounded-3xl p-12 text-center"
        >
          <Gift className="w-16 h-16 text-purple-400 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-4">
            Want Custom Bundles?
          </h2>
          <p className="text-xl text-purple-200 mb-8">
            Contact us for custom bundle deals for events, groups, or special
            occasions
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all">
            Contact Us
          </button>
        </motion.div>
      </div>
    </div>
  );
}
