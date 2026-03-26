"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Gift, TrendingUp, CheckCircle } from "lucide-react";
import Image from "next/image";

interface Bundle {
  id: string;
  name: string;
  description: string | null;
  items: Array<{ productId: string; quantity: number; productName?: string }>;
  bundlePrice: string;
  originalPrice: string;
  savings: string;
  savingsPercent: number;
  isLimited: boolean;
  quantity: number;
  quantityRemaining: number | null;
  isActive: boolean;
}

interface BundleCardProps {
  bundle: Bundle;
  onPurchase: (bundleId: string) => void;
}

export default function BundleCard({ bundle, onPurchase }: BundleCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const isSoldOut =
    bundle.isLimited &&
    bundle.quantityRemaining !== null &&
    bundle.quantityRemaining <= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`bg-gradient-to-br from-purple-900 via-gray-900 to-pink-900 rounded-3xl shadow-2xl overflow-hidden border-2 ${
        bundle.isLimited ? "border-amber-500/50" : "border-purple-500/30"
      }`}
    >
      {/* Limited Edition Badge */}
      {bundle.isLimited && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-4 right-4 z-10"
        >
          <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
            <Gift className="w-4 h-4" />
            Limited Edition
          </div>
        </motion.div>
      )}

      {/* Bundle Items Preview */}
      <div className="grid grid-cols-3 gap-2 p-4 bg-gray-800/50">
        {bundle.items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="relative aspect-square bg-gray-700 rounded-xl overflow-hidden"
          >
            <Image
              src={`/images/bundles/${item.productId}.jpg`}
              alt={item.productName || `Bundle item ${index + 1}`}
              fill
              className="object-cover"
            />
            {item.quantity > 1 && (
              <div className="absolute bottom-1 right-1 bg-black/70 text-white px-2 py-1 rounded text-xs font-bold">
                x{item.quantity}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <h3 className="text-2xl font-bold text-white">{bundle.name}</h3>

        {/* Description */}
        {bundle.description && (
          <p className="text-gray-400 text-sm">{bundle.description}</p>
        )}

        {/* Savings Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-3 rounded-xl flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            <span className="font-bold">Save €{bundle.savings}</span>
          </div>
          <span className="text-2xl font-bold">
            {bundle.savingsPercent}% OFF
          </span>
        </motion.div>

        {/* Price */}
        <div className="flex items-center gap-3">
          <span className="text-4xl font-bold text-white">
            €{bundle.bundlePrice}
          </span>
          <div className="flex flex-col">
            <span className="text-xl text-gray-500 line-through">
              €{bundle.originalPrice}
            </span>
            <span className="text-sm text-green-500 font-bold">
              Was €{bundle.originalPrice}
            </span>
          </div>
        </div>

        {/* What&apos;s Included */}
        <div className="bg-gray-800 rounded-xl p-4">
          <h4 className="text-lg font-bold text-white mb-3">
            What&apos;s Included:
          </h4>
          <ul className="space-y-2">
            {bundle.items.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 text-gray-300"
              >
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>
                  {item.quantity}x {item.productName || `Item ${index + 1}`}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Stock Status */}
        {bundle.isLimited && bundle.quantityRemaining !== null && (
          <div className="text-center">
            <div className="text-gray-400 text-sm mb-2">
              Only {bundle.quantityRemaining} left!
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${((bundle.quantity - bundle.quantityRemaining!) / bundle.quantity) * 100}%`,
                }}
                transition={{ duration: 1 }}
                className="h-full bg-gradient-to-r from-red-600 to-pink-600"
              />
            </div>
          </div>
        )}

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onPurchase(bundle.id)}
          disabled={isSoldOut}
          className={`w-full font-bold py-4 px-8 rounded-xl transition-all ${
            isSoldOut
              ? "bg-gradient-to-r from-gray-700 to-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          } text-white`}
        >
          <ShoppingBag className="w-5 h-5 inline mr-2" />
          {isSoldOut ? "Sold Out" : "Get Bundle Now"}
        </motion.button>

        {/* Value Proposition */}
        <div className="text-center text-gray-400 text-sm">
          <div className="flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Free shipping on bundles</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>30-day money back guarantee</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
