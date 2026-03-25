"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MerchProductCard,
  MerchProductCardSkeleton,
  ShoppingCartSidebar,
} from "@/components/merch";
import { QuickViewModal } from "@/components/merch";
import { ShoppingBag, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

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

export default function MerchPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null,
  );

  useEffect(() => {
    // Fetch products from API
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (
    product: Product,
    size: string,
    quantity: number,
  ) => {
    const cartItem: CartItem = {
      id: `cart_${Date.now()}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size,
      quantity,
      maxStock: product.stock,
    };

    setCartItems((prev) => [...prev, cartItem]);
    setIsCartOpen(true);
  };

  const handleQuantityChange = (itemId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item)),
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleCheckout = (items: CartItem[], discountCode?: string) => {
    // Redirect to Stripe checkout
    console.log("Checkout:", items, discountCode);
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
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 w-6 h-6 bg-white text-purple-600 rounded-full text-xs font-bold flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </Button>
      </motion.div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => setSelectedCategory(category)}
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
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Shopping Cart Sidebar */}
      <ShoppingCartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onQuantityChange={handleQuantityChange}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />
    </div>
  );
}
