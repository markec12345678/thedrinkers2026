"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  MerchProductCard,
  MerchProductCardSkeleton,
  ShoppingCartSidebar,
} from "@/components/merch";
import { QuickViewModal } from "@/components/merch";
import { ShoppingBag, Filter } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart, type CartItem } from "@/lib/cart";

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

export default function MerchPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null,
  );

  // Use cart context - correct destructuring
  const { addToCart, items, updateQuantity, removeFromCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    // Fetch products from API
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        // API returns { success: true, data: [...] }
        if (data.success && Array.isArray(data.data)) {
          setProducts(data.data);
        } else {
          console.error("Invalid response format:", data);
          setProducts([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        // Fallback to empty array if API fails
        setProducts([]);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (
    product: Product,
    size: string,
    quantity: number,
  ) => {
    const cartItem: CartItem = {
      id: `${product.id}:${size}`,
      productId: product.id,
      name: product.name,
      price: parseFloat(product.price) || 0,
      image: product.images[0] || "",
      size,
      quantity,
      maxStock: product.stock,
    };

    addToCart(cartItem);
    setIsCartOpen(true);
  };

  const handleQuantityChange = (itemId: string, quantity: number) => {
    updateQuantity(itemId, quantity);
  };

  const handleRemoveItem = (itemId: string) => {
    removeFromCart(itemId);
  };

  const handleCheckout = async (
    cartItems: CartItem[],
    discountCode?: string,
  ) => {
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            productId: item.productId,
            size: item.size,
            quantity: item.quantity,
          })),
          discountCode,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.url) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      router.push(data.url);
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Checkout ni uspel. Poskusite znova.");
    }
  };

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const categories = [
    "all",
    ...Array.from(new Set(products.map((p) => p.category).filter(Boolean))),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-12 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          The Drinkers Merch Store
        </h1>
        <p className="text-xl text-purple-200 max-w-2xl mx-auto">
          Official merchandise from The Drinkers. Premium quality, limited
          editions.
        </p>

        {/* Cart Button */}
        <Button
          onClick={() => setIsCartOpen(true)}
          className="mt-6 relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          size="lg"
        >
          <ShoppingBag className="w-5 h-5 mr-2" />
          Cart
          {items.length > 0 && (
            <span className="absolute -top-2 -right-2 w-6 h-6 bg-white text-purple-600 rounded-full text-xs font-bold flex items-center justify-center">
              {items.length}
            </span>
          )}
        </Button>
      </motion.div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => setSelectedCategory(category || "all")}
            variant={selectedCategory === category ? "default" : "outline"}
            className="capitalize"
          >
            <Filter className="w-4 h-4 mr-2" />
            {category}
          </Button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <MerchProductCardSkeleton key={i} />
              ))
            : filteredProducts.map((product) => (
                <MerchProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onAddToWishlist={(productId) =>
                    console.log("Wishlist:", productId)
                  }
                  onQuickView={setQuickViewProduct}
                />
              ))}
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          isOpen={!!quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart as any}
        />
      )}

      {/* Shopping Cart Sidebar */}
      <ShoppingCartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={items}
        onQuantityChange={handleQuantityChange}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />
    </div>
  );
}
