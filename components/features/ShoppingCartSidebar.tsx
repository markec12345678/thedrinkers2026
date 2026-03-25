"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Truck,
  Tag,
  ArrowRight,
  ContinueShopping,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

// Types
interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: string;
  image: string;
  size: string;
  quantity: number;
  maxStock: number;
}

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onQuantityChange?: (itemId: string, quantity: number) => void;
  onRemoveItem?: (itemId: string) => void;
  onCheckout?: (items: CartItem[], discountCode?: string) => void;
  onDiscountCodeApply?: (
    code: string,
  ) => Promise<{ success: boolean; discount?: number }>;
}

const FREE_SHIPPING_THRESHOLD = 50;
const TAX_RATE = 0.22; // 22% VAT
const SHIPPING_COST = 5.99;

export const ShoppingCartSidebar: React.FC<CartSidebarProps> = ({
  isOpen,
  onClose,
  items,
  onQuantityChange,
  onRemoveItem,
  onCheckout,
  onDiscountCodeApply,
}) => {
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<number | null>(null);
  const [isApplyingDiscount, setIsApplyingDiscount] = useState(false);
  const [discountError, setDiscountError] = useState("");

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Calculations
  const subtotal = items.reduce((sum, item) => {
    return sum + parseFloat(item.price) * item.quantity;
  }, 0);

  const discountAmount = appliedDiscount
    ? (subtotal * appliedDiscount) / 100
    : 0;
  const afterDiscount = subtotal - discountAmount;
  const tax = afterDiscount * TAX_RATE;
  const shipping = afterDiscount >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = afterDiscount + tax + shipping;

  const progressToFreeShipping = Math.min(
    (afterDiscount / FREE_SHIPPING_THRESHOLD) * 100,
    100,
  );
  const remainingForFreeShipping = Math.max(
    FREE_SHIPPING_THRESHOLD - afterDiscount,
    0,
  );

  const handleApplyDiscount = useCallback(async () => {
    if (!discountCode.trim()) return;

    setIsApplyingDiscount(true);
    setDiscountError("");

    try {
      const result = await onDiscountCodeApply?.(discountCode.trim());

      if (result?.success && result.discount) {
        setAppliedDiscount(result.discount);
        setDiscountCode("");
      } else {
        setDiscountError("Invalid discount code");
      }
    } catch (error) {
      setDiscountError("Failed to apply discount code");
    } finally {
      setIsApplyingDiscount(false);
    }
  }, [discountCode, onDiscountCodeApply]);

  const handleQuantityChange = useCallback(
    (itemId: string, newQuantity: number) => {
      if (newQuantity < 1) return;
      onQuantityChange?.(itemId, newQuantity);
    },
    [onQuantityChange],
  );

  const handleRemoveItem = useCallback(
    (itemId: string) => {
      onRemoveItem?.(itemId);
    },
    [onRemoveItem],
  );

  const handleCheckout = useCallback(() => {
    onCheckout?.(items, appliedDiscount ? discountCode : undefined);
  }, [items, onCheckout, appliedDiscount, discountCode]);

  const isEmpty = items.length === 0;

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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Shopping Cart
                </h2>
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium">
                  {items.length} {items.length === 1 ? "item" : "items"}
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Free Shipping Progress */}
            {afterDiscount < FREE_SHIPPING_THRESHOLD && (
              <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <Truck className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {remainingForFreeShipping > 0
                      ? `Add €${remainingForFreeShipping.toFixed(2)} more for FREE shipping!`
                      : "You have FREE shipping!"}
                  </span>
                </div>
                <Progress value={progressToFreeShipping} className="h-2" />
              </div>
            )}

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {isEmpty ? (
                <EmptyCartState onClose={onClose} />
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <CartItemCard
                      key={item.id}
                      item={item}
                      onQuantityChange={handleQuantityChange}
                      onRemove={handleRemoveItem}
                    />
                  ))}
                </div>
              )}
            </div>

            {!isEmpty && (
              <>
                {/* Discount Code */}
                <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      Discount Code
                    </label>
                    <div className="flex gap-2">
                      <Input
                        value={discountCode}
                        onChange={(e) =>
                          setDiscountCode(e.target.value.toUpperCase())
                        }
                        placeholder="Enter code"
                        className="flex-1"
                        disabled={isApplyingDiscount || !!appliedDiscount}
                      />
                      {appliedDiscount ? (
                        <Button
                          variant="outline"
                          className="text-green-600 dark:text-green-400 border-green-600"
                          disabled
                        >
                          -{appliedDiscount}% Applied
                        </Button>
                      ) : (
                        <Button
                          onClick={handleApplyDiscount}
                          disabled={isApplyingDiscount || !discountCode.trim()}
                        >
                          {isApplyingDiscount ? "Applying..." : "Apply"}
                        </Button>
                      )}
                    </div>
                    {discountError && (
                      <p className="text-sm text-red-600 dark:text-red-400">
                        {discountError}
                      </p>
                    )}
                  </div>
                </div>

                {/* Summary */}
                <div className="p-6 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 space-y-3">
                  <SummaryRow
                    label="Subtotal"
                    value={`€${subtotal.toFixed(2)}`}
                  />
                  {discountAmount > 0 && (
                    <SummaryRow
                      label="Discount"
                      value={`-€${discountAmount.toFixed(2)}`}
                      className="text-green-600 dark:text-green-400"
                    />
                  )}
                  <SummaryRow label="Tax (22%)" value={`€${tax.toFixed(2)}`} />
                  <SummaryRow
                    label="Shipping"
                    value={shipping === 0 ? "FREE" : `€${shipping.toFixed(2)}`}
                    className={
                      shipping === 0 ? "text-green-600 dark:text-green-400" : ""
                    }
                  />

                  <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                    <SummaryRow
                      label="Total"
                      value={`€${total.toFixed(2)}`}
                      className="text-xl font-bold text-gray-900 dark:text-gray-100"
                      bold
                    />
                  </div>
                </div>

                {/* Checkout Button */}
                <div className="p-6 pt-0">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={handleCheckout}
                      className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-500/30"
                    >
                      Proceed to Checkout
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </motion.div>
                  <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-3">
                    Secure checkout powered by Stripe
                  </p>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Cart Item Card Component
const CartItemCard: React.FC<{
  item: CartItem;
  onQuantityChange: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
}> = ({ item, onQuantityChange, onRemove }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
    >
      {/* Image */}
      <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
        <Image src={item.image} alt={item.name} fill className="object-cover" />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0 space-y-2">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
            {item.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Size: {item.size}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onQuantityChange(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </motion.button>
            <span className="w-8 text-center font-medium text-gray-900 dark:text-gray-100">
              {item.quantity}
            </span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onQuantityChange(item.id, item.quantity + 1)}
              disabled={item.quantity >= item.maxStock}
              className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </motion.button>
          </div>

          <div className="text-right">
            <p className="font-bold text-gray-900 dark:text-gray-100">
              €{(parseFloat(item.price) * item.quantity).toFixed(2)}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onRemove(item.id)}
              className="text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 flex items-center justify-end gap-1 mt-1"
            >
              <Trash2 className="w-3 h-3" />
              Remove
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Empty Cart State Component
const EmptyCartState: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center h-full text-center space-y-4"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ShoppingBag className="w-24 h-24 text-gray-300 dark:text-gray-600" />
      </motion.div>
      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Your cart is empty
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Looks like you haven&apos;t added anything yet
        </p>
      </div>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={onClose}
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          <ContinueShopping className="w-4 h-4 mr-2" />
          Continue Shopping
        </Button>
      </motion.div>
    </motion.div>
  );
};

// Summary Row Component
const SummaryRow: React.FC<{
  label: string;
  value: string;
  className?: string;
  bold?: boolean;
}> = ({ label, value, className = "", bold = false }) => {
  return (
    <div className="flex items-center justify-between">
      <span
        className={`text-gray-600 dark:text-gray-400 ${bold ? "font-semibold" : ""}`}
      >
        {label}
      </span>
      <span
        className={`text-gray-900 dark:text-gray-100 ${bold ? "font-bold" : ""} ${className}`}
      >
        {value}
      </span>
    </div>
  );
};

export default ShoppingCartSidebar;
