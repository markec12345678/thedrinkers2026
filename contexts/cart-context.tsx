"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

// Types
export interface CartItem {
  id: string;
  productId: string;
  name: string;
  description?: string | null;
  price: string;
  image: string;
  size: string;
  quantity: number;
  maxStock: number;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  itemCount: number;
  setIsOpen: (open: boolean) => void;
  addItem: (product: any, size: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Constants
const TAX_RATE = 0.22; // 22% VAT
const FREE_SHIPPING_THRESHOLD = 50;
const SHIPPING_COST = 5.99;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to load cart:", error);
      }
    }
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  // Calculations
  const subtotal = items.reduce((sum, item) => {
    return sum + parseFloat(item.price) * item.quantity;
  }, 0);

  const tax = subtotal * TAX_RATE;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + tax + shipping;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Actions
  const addItem = useCallback(
    (product: any, size: string, quantity: number) => {
      setItems((prevItems) => {
        // Check if item already exists with same size
        const existingItemIndex = prevItems.findIndex(
          (item) => item.productId === product.id && item.size === size,
        );

        if (existingItemIndex > -1) {
          // Update quantity of existing item
          const updatedItems = [...prevItems];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + quantity,
          };
          return updatedItems;
        } else {
          // Add new item
          const newItem: CartItem = {
            id: `cart_${Date.now()}_${Math.random()}`,
            productId: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.images?.[0] || "/placeholder.jpg",
            size,
            quantity,
            maxStock: product.stock,
          };
          return [...prevItems, newItem];
        }
      });
      setIsOpen(true);
    },
    [],
  );

  const removeItem = useCallback((itemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity < 1) return;

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item,
      ),
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    localStorage.removeItem("cart");
  }, []);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        subtotal,
        tax,
        shipping,
        total,
        itemCount,
        setIsOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
