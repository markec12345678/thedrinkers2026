# 🛍️ MERCH PRODUCT CARD COMPONENT

**Complete, production-ready product card component for The Drinkers merch store**

---

## 📦 COMPONENTS

### **Main Components**

1. **`MerchProductCard.tsx`** - Main product card with all features
2. **`MerchProductCardSkeleton.tsx`** - Loading state skeleton
3. **`QuickViewModal.tsx`** - Quick view modal dialog
4. **`index.ts`** - Component exports

### **Sub-Components (Built-in)**

- `SizeSelector` - Visual size selection buttons
- `QuantitySelector` - Quantity increment/decrement
- `ProductBadge` - Limited/Featured/Sale badges
- `StockIndicator` - Stock status display

---

## 🎨 FEATURES

### ✅ **Core Features**

- [x] High-quality product image with hover zoom
- [x] Product title and description
- [x] Size selector (S, M, L, XL, XXL)
- [x] Quantity selector (1-10)
- [x] Add to cart with animation
- [x] Price display with discount support
- [x] Limited Edition badge (conditional)
- [x] Featured badge (conditional)
- [x] Stock indicator (In Stock / Low Stock / Out of Stock)
- [x] Customer reviews (4.5 stars)
- [x] Add to wishlist button
- [x] Share buttons

### ✅ **Advanced Features**

- [x] Image gallery with thumbnail navigation
- [x] Quick view modal
- [x] Optimistic cart updates
- [x] Size validation
- [x] Stock validation
- [x] SEO optimized (structured data ready)
- [x] Responsive design (mobile-first)
- [x] Dark mode support
- [x] Glass morphism effect

---

## 🚀 USAGE

### **Basic Example**

```tsx
import {
  MerchProductCard,
  MerchProductCardSkeleton,
} from "@/components/features";

// In your page component
<MerchProductCard
  product={product}
  onAddToCart={(product, size, quantity) => {
    // Handle add to cart
    console.log("Added to cart:", { product, size, quantity });
  }}
  onAddToWishlist={(productId) => {
    // Handle wishlist
    console.log("Added to wishlist:", productId);
  }}
  onQuickView={(product) => {
    // Handle quick view
    console.log("Quick view:", product);
  }}
/>;
```

### **With Loading State**

```tsx
const [loading, setLoading] = useState(true);
const [product, setProduct] = useState<Product | null>(null);

useEffect(() => {
  fetchProduct().then((data) => {
    setProduct(data);
    setLoading(false);
  });
}, []);

return (
  {loading
    ? <MerchProductCardSkeleton />
    : product && <MerchProductCard product={product} />
  }
);
```

### **Product Grid Example**

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {products.map((product) => (
    <MerchProductCard
      key={product.id}
      product={product}
      onAddToCart={handleAddToCart}
      onAddToWishlist={handleAddToWishlist}
    />
  ))}
</div>
```

---

## 📊 DATA STRUCTURE

### **Product Interface**

```typescript
interface Product {
  id: string; // Unique product ID
  name: string; // Product name
  description: string | null; // Product description
  price: string; // Current price (€29.99)
  compareAtPrice: string | null; // Original price (for sales)
  stock: number; // Available quantity
  images: string[]; // Array of image URLs
  sizes: string[] | null; // Available sizes
  featured: boolean; // Is featured product
  active: boolean; // Is product active
  category: string | null; // Product category
  createdAt: Date; // Creation timestamp
  updatedAt: Date; // Last update timestamp
}
```

### **Example Product Data**

```typescript
const product: Product = {
  id: "prod_001",
  name: "The Drinkers Classic T-Shirt",
  description: "100% bombažna majica z logotipom The Drinkers",
  price: "29.99",
  compareAtPrice: "39.99",
  stock: 150,
  images: ["/images/merch/tshirt-front.jpg", "/images/merch/tshirt-back.jpg"],
  sizes: ["S", "M", "L", "XL", "XXL"],
  featured: true,
  active: true,
  category: "t-shirt",
  createdAt: new Date(),
  updatedAt: new Date(),
};
```

---

## 🎨 CUSTOMIZATION

### **Props**

```typescript
interface MerchProductCardProps {
  product: Product; // Required product data

  // Optional callbacks
  onAddToCart?: (product: Product, size: string, quantity: number) => void;
  onAddToWishlist?: (productId: string) => void;
  onQuickView?: (product: Product) => void;
}
```

### **Styling**

The component uses Tailwind CSS with:

- Glass morphism effects
- Purple/pink gradient theme (The Drinkers brand)
- Dark mode support via `next-themes`
- Responsive breakpoints
- Smooth animations with Framer Motion

### **Customizing Colors**

Edit the gradient classes in `MerchProductCard.tsx`:

```tsx
// Current (Purple/Pink)
bg-gradient-to-r from-purple-600 to-pink-600

// Change to your brand colors
bg-gradient-to-r from-blue-600 to-cyan-600
bg-gradient-to-r from-green-600 to-emerald-600
bg-gradient-to-r from-red-600 to-orange-600
```

---

## 🔧 INTEGRATION

### **With Drizzle ORM**

```typescript
// lib/db/schema/index.ts
export const product = pgTable("product", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  // ... other fields
});

// app/api/products/route.ts
import { db } from "@/lib/db";
import { product } from "@/lib/db/schema";

export async function GET() {
  const products = await db.select().from(product);
  return Response.json(products);
}
```

### **With Stripe**

```typescript
// app/api/checkout/route.ts
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { product, size, quantity } = await req.json();

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          product_data: { name: product.name },
          unit_amount: Math.round(parseFloat(product.price) * 100),
          currency: "eur",
        },
        quantity,
      },
    ],
    mode: "payment",
    success_url: `${req.headers.get("origin")}/success`,
    cancel_url: `${req.headers.get("origin")}/cart`,
  });

  return Response.json({ url: session.url });
}
```

### **With Better Auth**

```typescript
// app/api/wishlist/route.ts
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const { productId } = await req.json();
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Add to wishlist in database
  await db.insert(wishlist).values({
    userId: session.user.id,
    productId,
  });

  return Response.json({ success: true });
}
```

---

## 📱 RESPONSIVE BREAKPOINTS

```tsx
// Mobile (default)
- Single column
- Full-width card
- Stacked layout

// sm:grid-cols-2 (640px+)
- 2 columns
- Smaller cards

// lg:grid-cols-3 (1024px+)
- 3 columns
- Standard cards

// xl:grid-cols-4 (1280px+)
- 4 columns
- Compact cards
```

---

## 🎭 ANIMATIONS

### **Framer Motion Features**

```tsx
// Card hover lift
whileHover={{ y: -8 }}

// Button press scale
whileTap={{ scale: 0.95 }}

// Image zoom on hover
whileHover={{ scale: 1.1 }}

// Fade in on mount
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
```

---

## ♿ ACCESSIBILITY

- ✅ Semantic HTML structure
- ✅ ARIA labels on interactive elements
- ✅ Keyboard navigation support
- ✅ Focus states on all buttons
- ✅ Alt text on images
- ✅ Screen reader friendly

---

## 📦 FILE STRUCTURE

```
components/
└── features/
    ├── MerchProductCard.tsx          # Main component
    ├── MerchProductCardSkeleton.tsx  # Loading state
    ├── QuickViewModal.tsx            # Quick view modal
    └── index.ts                      # Exports
```

---

## 🧪 TESTING

### **Unit Test Example**

```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { MerchProductCard } from "@/components/features";

describe("MerchProductCard", () => {
  const mockProduct = {
    id: "1",
    name: "Test Product",
    price: "29.99",
    stock: 10,
    images: ["/test.jpg"],
    sizes: ["S", "M", "L"],
    featured: true,
    active: true,
  };

  it("renders product name and price", () => {
    render(<MerchProductCard product={mockProduct} />);
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("€29.99")).toBeInTheDocument();
  });

  it("calls onAddToCart when button clicked", () => {
    const mockAddToCart = jest.fn();
    render(
      <MerchProductCard product={mockProduct} onAddToCart={mockAddToCart} />,
    );
    fireEvent.click(screen.getByText("Add to Cart"));
    expect(mockAddToCart).toHaveBeenCalled();
  });
});
```

---

## 🎯 BEST PRACTICES

1. **Always use skeleton loading states** for better UX
2. **Validate size selection** before adding to cart
3. **Show stock status** clearly to users
4. **Use optimistic updates** for cart actions
5. **Implement proper error handling**
6. **Add proper TypeScript types**
7. **Test on mobile devices**
8. **Optimize images** with Next.js Image component

---

## 📝 EXAMPLE PAGE INTEGRATION

```tsx
// app/merch/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  MerchProductCard,
  MerchProductCardSkeleton,
} from "@/components/features";
import { QuickViewModal } from "@/components/features/QuickViewModal";

interface Product {
  id: string;
  name: string;
  price: string;
  // ... other fields
}

export default function MerchPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null,
  );

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (
    product: Product,
    size: string,
    quantity: number,
  ) => {
    console.log("Added to cart:", { product, size, quantity });
    // Add to cart logic
  };

  const handleAddToWishlist = (productId: string) => {
    console.log("Added to wishlist:", productId);
    // Add to wishlist logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-12">
        The Drinkers Merch Store
      </h1>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <MerchProductCardSkeleton key={i} />
              ))
            : products.map((product) => (
                <MerchProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onAddToWishlist={handleAddToWishlist}
                  onQuickView={setQuickViewProduct}
                />
              ))}
        </div>
      </div>

      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          isOpen={!!quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
}
```

---

## 🎉 READY TO USE!

All components are production-ready and fully integrated with:

- ✅ Next.js 15 App Router
- ✅ React 18.3.1
- ✅ TypeScript 5.3.3
- ✅ Tailwind CSS 3.4.0
- ✅ Framer Motion 11.15.0
- ✅ Lucide React icons
- ✅ next-themes (dark mode)
- ✅ Drizzle ORM
- ✅ Better Auth
- ✅ Stripe ready

**Created:** 2026-03-25  
**Status:** ✅ Production Ready  
**Version:** 1.0.0
