"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, Heart, Share2, ZoomIn } from "lucide-react";
import Image from "next/image";

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
}

interface QuickViewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart?: (product: Product, size: string, quantity: number) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const hasMultipleSizes = product.sizes && product.sizes.length > 1;
  const isInStock = product.stock > 0;

  const handleAddToCart = () => {
    if (!isInStock) return;
    if (hasMultipleSizes && !selectedSize) return;

    const size = hasMultipleSizes
      ? selectedSize!
      : product.sizes?.[0] || "One Size";
    onAddToCart?.(product, size, quantity);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </motion.button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                {/* Image Gallery */}
                <div className="space-y-4">
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <Image
                      src={
                        product.images[currentImageIndex] || "/placeholder.jpg"
                      }
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  {/* Thumbnails */}
                  {product.images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto">
                      {product.images.map((image, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                            index === currentImageIndex
                              ? "border-purple-600"
                              : "border-gray-200 dark:border-gray-700"
                          }`}
                        >
                          <Image
                            src={image}
                            alt={`${product.name} ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                  {/* Title & Price */}
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                      {product.name}
                    </h2>
                    <div className="flex items-center gap-4">
                      <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                        €{product.price}
                      </span>
                      {product.compareAtPrice && (
                        <span className="text-xl text-gray-500 line-through">
                          €{product.compareAtPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  {product.description && (
                    <p className="text-gray-600 dark:text-gray-400">
                      {product.description}
                    </p>
                  )}

                  {/* Stock Status */}
                  <div
                    className={`text-lg font-medium ${
                      isInStock
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {isInStock
                      ? `In Stock (${product.stock} available)`
                      : "Out of Stock"}
                  </div>

                  {/* Size Selector */}
                  {hasMultipleSizes && (
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Select Size
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {product.sizes!.map((size) => (
                          <motion.button
                            key={size}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedSize(size)}
                            className={`px-6 py-3 rounded-lg font-medium transition-all ${
                              selectedSize === size
                                ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30"
                                : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700"
                            }`}
                          >
                            {size}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quantity Selector */}
                  {isInStock && (
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Quantity
                      </label>
                      <div className="flex items-center gap-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                          -
                        </motion.button>
                        <span className="text-2xl font-bold text-gray-900 dark:text-gray-100 w-12 text-center">
                          {quantity}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() =>
                            setQuantity(Math.min(product.stock, quantity + 1))
                          }
                          className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                          +
                        </motion.button>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="space-y-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAddToCart}
                      disabled={!isInStock}
                      className={`w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-3 transition-all ${
                        isInStock
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-500/30"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                    >
                      <ShoppingCart className="w-6 h-6" />
                      {isInStock ? "Add to Cart" : "Out of Stock"}
                    </motion.button>

                    <div className="flex gap-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 py-3 rounded-xl font-medium border-2 border-gray-200 dark:border-gray-700 hover:border-purple-600 dark:hover:border-purple-400 transition-colors flex items-center justify-center gap-2"
                      >
                        <Heart className="w-5 h-5" />
                        Wishlist
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 py-3 rounded-xl font-medium border-2 border-gray-200 dark:border-gray-700 hover:border-purple-600 dark:hover:border-purple-400 transition-colors flex items-center justify-center gap-2"
                      >
                        <Share2 className="w-5 h-5" />
                        Share
                      </motion.button>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex justify-between">
                      <span>Category:</span>
                      <span className="font-medium">
                        {product.category || "Merchandise"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>SKU:</span>
                      <span className="font-medium">{product.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping:</span>
                      <span className="font-medium">
                        Free shipping on orders over €50
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QuickViewModal;
