"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Heart,
  Star,
  Share2,
  ZoomIn,
  Check,
  AlertTriangle,
} from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";

// Types
interface Product {
  id: string;
  name: string;
  description: string | null;
  price: string;
  compareAtPrice: string | null;
  stock: number;
  images: string[];
  sizes: string[] | null;
  featured: boolean;
  active: boolean;
  category: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface MerchProductCardProps {
  product: Product;
  onAddToCart?: (product: Product, size: string, quantity: number) => void;
  onAddToWishlist?: (productId: string) => void;
  onQuickView?: (product: Product) => void;
}

// Size Selector Component
const SizeSelector: React.FC<{
  sizes: string[];
  selectedSize: string | null;
  onSelectSize: (size: string) => void;
  disabled?: boolean;
}> = ({ sizes, selectedSize, onSelectSize, disabled = false }) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Size
      </label>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <motion.button
            key={size}
            whileHover={{ scale: disabled ? 1 : 1.05 }}
            whileTap={{ scale: disabled ? 1 : 0.95 }}
            onClick={() => !disabled && onSelectSize(size)}
            disabled={disabled}
            className={`
              px-4 py-2 text-sm font-medium rounded-lg border-2 transition-all duration-200
              ${
                selectedSize === size
                  ? "border-purple-600 bg-purple-600 text-white shadow-lg shadow-purple-500/30"
                  : "border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 hover:border-purple-400 dark:hover:border-purple-500"
              }
              ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
              backdrop-blur-sm
            `}
          >
            {size}
            {selectedSize === size && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-1 right-1"
              >
                <Check className="w-3 h-3" />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

// Quantity Selector Component
const QuantitySelector: React.FC<{
  quantity: number;
  maxQuantity: number;
  onQuantityChange: (quantity: number) => void;
  disabled?: boolean;
}> = ({ quantity, maxQuantity, onQuantityChange, disabled = false }) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Quantity
      </label>
      <div className="flex items-center gap-3">
        <motion.button
          whileHover={{ scale: disabled ? 1 : 1.1 }}
          whileTap={{ scale: disabled ? 1 : 0.9 }}
          onClick={() =>
            !disabled && quantity > 1 && onQuantityChange(quantity - 1)
          }
          disabled={disabled}
          className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          -
        </motion.button>
        <span className="w-12 text-center text-lg font-semibold text-gray-900 dark:text-gray-100">
          {quantity}
        </span>
        <motion.button
          whileHover={{ scale: disabled ? 1 : 1.1 }}
          whileTap={{ scale: disabled ? 1 : 0.9 }}
          onClick={() =>
            !disabled &&
            quantity < maxQuantity &&
            onQuantityChange(quantity + 1)
          }
          disabled={disabled}
          className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          +
        </motion.button>
      </div>
    </div>
  );
};

// Product Badge Component
const ProductBadge: React.FC<{
  type: "limited" | "featured" | "sale";
  className?: string;
}> = ({ type, className = "" }) => {
  const badges = {
    limited: {
      text: "Limited Edition",
      className: "bg-gradient-to-r from-purple-600 to-pink-600 text-white",
    },
    featured: {
      text: "Featured",
      className: "bg-gradient-to-r from-amber-500 to-orange-500 text-white",
    },
    sale: {
      text: "Sale",
      className: "bg-gradient-to-r from-red-600 to-rose-600 text-white",
    },
  };

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`px-3 py-1 text-xs font-bold rounded-full shadow-lg ${badges[type].className} ${className}`}
    >
      {badges[type].text}
    </motion.span>
  );
};

// Stock Indicator Component
const StockIndicator: React.FC<{ stock: number }> = ({ stock }) => {
  if (stock === 0) {
    return (
      <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
        <AlertTriangle className="w-4 h-4" />
        <span className="text-sm font-medium">Out of Stock</span>
      </div>
    );
  }

  if (stock < 10) {
    return (
      <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
        <AlertTriangle className="w-4 h-4" />
        <span className="text-sm font-medium">Low Stock ({stock} left)</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
      <Check className="w-4 h-4" />
      <span className="text-sm font-medium">In Stock</span>
    </div>
  );
};

// Main Component
export const MerchProductCard: React.FC<MerchProductCardProps> = ({
  product,
  onAddToCart,
  onAddToWishlist,
  onQuickView,
}) => {
  const { theme } = useTheme();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const hasMultipleSizes = product.sizes && product.sizes.length > 1;
  const isInStock = product.stock > 0;
  const isLowStock = product.stock > 0 && product.stock < 10;
  const hasDiscount =
    product.compareAtPrice &&
    parseFloat(product.compareAtPrice) > parseFloat(product.price);

  const handleAddToCart = useCallback(() => {
    if (!isInStock) return;
    if (hasMultipleSizes && !selectedSize) {
      // Show error - must select size
      return;
    }

    setIsAddingToCart(true);
    const size = hasMultipleSizes
      ? selectedSize!
      : product.sizes?.[0] || "One Size";

    setTimeout(() => {
      onAddToCart?.(product, size, quantity);
      setIsAddingToCart(false);
    }, 500);
  }, [
    product,
    selectedSize,
    quantity,
    hasMultipleSizes,
    isInStock,
    onAddToCart,
  ]);

  const handleAddToWishlist = useCallback(() => {
    setIsWishlisted(!isWishlisted);
    onAddToWishlist?.(product.id);
  }, [isWishlisted, product.id, onAddToWishlist]);

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text:
            product.description ||
            `Check out ${product.name} from The Drinkers!`,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Share failed:", err);
      }
    }
  }, [product]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200/50 dark:border-gray-700/50"
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {hasDiscount && <ProductBadge type="sale" />}
        {product.featured && <ProductBadge type="featured" />}
      </div>

      {/* Wishlist & Share Buttons */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleAddToWishlist}
          className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
            isWishlisted
              ? "bg-pink-500 text-white"
              : "bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-pink-900/50"
          }`}
        >
          <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleShare}
          className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <Share2 className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Image Gallery */}
      <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
        <motion.div
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
          className="w-full h-full cursor-pointer"
          onClick={() => onQuickView?.(product)}
        >
          <Image
            src={product.images[currentImageIndex] || "/placeholder.jpg"}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>

        {/* Thumbnail Navigation */}
        {product.images.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {product.images.map((image, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex
                    ? "bg-white w-4"
                    : "bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        )}

        {/* Quick View Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
          onClick={() => onQuickView?.(product)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            whileHover={{ scale: 1 }}
            className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-6 py-3 rounded-full flex items-center gap-2"
          >
            <ZoomIn className="w-5 h-5" />
            <span className="font-medium">Quick View</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Product Info */}
      <div className="p-6 space-y-4">
        {/* Title & Reviews */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < 4
                      ? "fill-amber-400 text-amber-400"
                      : "fill-gray-300 dark:fill-gray-600 text-gray-300 dark:text-gray-600"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              (4.5 • 128 reviews)
            </span>
          </div>
        </div>

        {/* Description */}
        {product.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Price */}
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            €{product.price}
          </span>
          {hasDiscount && (
            <>
              <span className="text-lg text-gray-500 line-through">
                €{product.compareAtPrice}
              </span>
              <span className="text-sm font-medium text-red-600 dark:text-red-400">
                Save{" "}
                {Math.round(
                  (1 -
                    parseFloat(product.price) /
                      parseFloat(product.compareAtPrice!)) *
                    100,
                )}
                %
              </span>
            </>
          )}
        </div>

        {/* Stock Indicator */}
        <StockIndicator stock={product.stock} />

        {/* Size Selector */}
        {hasMultipleSizes && (
          <SizeSelector
            sizes={product.sizes!}
            selectedSize={selectedSize}
            onSelectSize={setSelectedSize}
            disabled={!isInStock}
          />
        )}

        {/* Quantity Selector */}
        {isInStock && (
          <QuantitySelector
            quantity={quantity}
            maxQuantity={Math.min(10, product.stock)}
            onQuantityChange={setQuantity}
            disabled={!isInStock}
          />
        )}

        {/* Add to Cart Button */}
        <motion.button
          whileHover={{ scale: isInStock ? 1.02 : 1 }}
          whileTap={{ scale: isInStock ? 0.98 : 1 }}
          onClick={handleAddToCart}
          disabled={!isInStock || isAddingToCart}
          className={`
            w-full py-4 px-6 rounded-xl font-semibold text-white
            flex items-center justify-center gap-3
            transition-all duration-300
            ${
              isInStock
                ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40"
                : "bg-gray-400 cursor-not-allowed"
            }
            ${isAddingToCart ? "scale-95" : ""}
          `}
        >
          {isAddingToCart ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
              Adding...
            </>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5" />
              {isInStock ? "Add to Cart" : "Out of Stock"}
            </>
          )}
        </motion.button>

        {/* Additional Info */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>Category: {product.category || "Merchandise"}</span>
            <span>SKU: {product.id}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MerchProductCard;
