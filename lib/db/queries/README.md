# 🗄️ DATABASE QUERIES - USAGE GUIDE

**Drizzle ORM queries for The Drinkers database**

---

## 📁 FILE LOCATION

```
lib/db/queries/
├── products.ts       # Product queries
├── tour-dates.ts     # Tour date queries
└── memberships.ts    # VIP membership queries
```

---

## 🛍️ PRODUCTS QUERIES

### **Import**

```typescript
import {
  getAllProducts,
  getProductById,
  getFeaturedProducts,
  getProductsByCategory,
  updateProductStock,
} from "@/lib/db/queries/products";
```

### **Basic Queries**

#### **Get All Products**

```typescript
const products = await getAllProducts();

// Returns: Product[]
// - All active products
// - Ordered by creation date (newest first)
```

#### **Get Product By ID**

```typescript
const product = await getProductById("prod_123");

// Returns: Product | undefined
// - Single product
// - undefined if not found
```

#### **Get Featured Products**

```typescript
const featured = await getFeaturedProducts();

// Returns: Product[]
// - Maximum 8 products
// - Active and featured only
```

#### **Get Products By Category**

```typescript
const tshirts = await getProductsByCategory("t-shirt");

// Returns: Product[]
// - All products in category
// - Active only
```

#### **Update Product Stock**

```typescript
await updateProductStock("prod_123", 50);

// Returns: Updated product
// - Updates stock quantity
// - Updates updatedAt timestamp
```

### **Advanced Queries**

#### **Get Products With Filters**

```typescript
import { getProducts } from "@/lib/db/queries/products";

const products = await getProducts({
  category: "t-shirt",
  featured: true,
  minPrice: 20,
  maxPrice: 50,
  limit: 10,
  offset: 0,
});

// Returns: Product[]
// - Filtered by all parameters
// - Supports pagination
```

#### **Search Products**

```typescript
import { searchProducts } from "@/lib/db/queries/products";

const results = await searchProducts("hoodie", 10);

// Returns: Product[]
// - Searches name and description
// - Client-side search (replace with full-text in production)
```

#### **Get Related Products**

```typescript
import { getRelatedProducts } from "@/lib/db/queries/products";

const related = await getRelatedProducts(
  "prod_123", // Current product ID
  "t-shirt", // Category
  4, // Limit
);

// Returns: Product[]
// - Products in same category
// - Excludes current product (filter in calling code)
```

#### **Get Product Stock**

```typescript
import { getProductStock } from "@/lib/db/queries/products";

const stock = await getProductStock("prod_123");

// Returns: number
// - Current stock quantity
```

#### **Decrease Product Stock**

```typescript
import { decreaseProductStock } from "@/lib/db/queries/products";

await decreaseProductStock("prod_123", 2);

// Returns: Updated product
// - Decreases stock by quantity
// - Minimum 0 (won't go negative)
```

---

## 🎫 TOUR DATES QUERIES

### **Import**

```typescript
import {
  getTourDates,
  getTourDateById,
  getUpcomingTourDates,
  getFeaturedTourDates,
  getTourDatesByCountry,
  getTourStats,
} from "@/lib/db/queries/tour-dates";
```

### **Basic Queries**

#### **Get All Tour Dates**

```typescript
const tourDates = await getTourDates();

// Returns: TourDate[]
// - All active tour dates
// - Ordered by date
```

#### **Get Tour Date By ID**

```typescript
const tourDate = await getTourDateById("tour_123");

// Returns: TourDate | undefined
```

#### **Get Upcoming Tour Dates**

```typescript
const upcoming = await getUpcomingTourDates(10);

// Returns: TourDate[]
// - Future dates only
// - On sale status
// - Maximum 10 by default
```

#### **Get Featured Tour Dates**

```typescript
const featured = await getFeaturedTourDates(5);

// Returns: TourDate[]
// - Featured shows
// - Future dates
// - Maximum 5
```

#### **Get Tour Dates By Country**

```typescript
const slovenia = await getTourDatesByCountry("Slovenia");

// Returns: TourDate[]
// - All shows in country
// - Future dates only
```

#### **Get Tour Stats**

```typescript
const stats = await getTourStats();

// Returns: {
//   total: number,
//   upcoming: number,
//   soldOut: number
// }
```

---

## 👑 MEMBERSHIPS QUERIES

### **Import**

```typescript
import {
  getAllVipTiers,
  getVipTierByName,
  getUserMembership,
  createVipMembership,
  getMembershipStats,
} from "@/lib/db/queries/memberships";
```

### **Basic Queries**

#### **Get All VIP Tiers**

```typescript
const tiers = await getAllVipTiers();

// Returns: VIPTier[]
// - All active tiers
// - Ordered by priority
```

#### **Get VIP Tier By Name**

```typescript
const premium = await getVipTierByName("premium");

// Returns: VIPTier | undefined
```

#### **Get User Membership**

```typescript
const membership = await getUserMembership("user_123");

// Returns: VIPMembership | undefined
// - Current active membership
// - Most recent if multiple
```

#### **Create VIP Membership**

```typescript
const newMembership = await createVipMembership({
  userId: "user_123",
  tier: "premium",
  billingCycle: "yearly",
  price: "199.99",
  startDate: new Date(),
  expiresAt: new Date("2027-01-01"),
});

// Returns: VIPMembership
```

#### **Get Membership Stats**

```typescript
const stats = await getMembershipStats();

// Returns: {
//   total: number,
//   bronze: number,
//   silver: number,
//   gold: number
// }
```

---

## 📝 USAGE IN SERVER COMPONENTS

### **Next.js App Router Example**

```tsx
// app/merch/page.tsx
import { getAllProducts } from "@/lib/db/queries/products";

export default async function MerchPage() {
  const products = await getAllProducts();

  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### **API Route Example**

```typescript
// app/api/products/route.ts
import { getProducts } from "@/lib/db/queries/products";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await getProducts({ limit: 10 });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}
```

### **Server Action Example**

```typescript
// app/actions/products.ts
"use server";

import { getProductById } from "@/lib/db/queries/products";

export async function getProductAction(id: string) {
  const product = await getProductById(id);

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
}
```

---

## ⚠️ IMPORTANT NOTES

### **1. Always Handle Undefined**

```typescript
const product = await getProductById(id);

if (!product) {
  // Handle not found
  return notFound();
}

// Safe to use product here
```

### **2. Use Transactions for Stock Updates**

```typescript
import { db } from '@/lib/db';

await db.transaction(async (tx) => {
  // Check stock
  const currentStock = await getProductStock(id);

  if (currentStock < quantity) {
    throw new Error('Not enough stock');
  }

  // Update stock
  await updateProductStock(id, currentStock - quantity);

  // Create order
  await tx.insert(order).values({ ... });
});
```

### **3. Cache Expensive Queries**

```typescript
import { cache } from "react";
import { getFeaturedProducts } from "@/lib/db/queries/products";

const getCachedFeaturedProducts = cache(() => {
  return getFeaturedProducts();
});

// Use in component
const featured = await getCachedFeaturedProducts();
```

### **4. Validate User Input**

```typescript
import { z } from "zod";

const productSchema = z.object({
  id: z.string().uuid(),
  quantity: z.number().min(1).max(10),
});

export async function addToCart(formData: FormData) {
  const data = productSchema.parse({
    id: formData.get("id"),
    quantity: formData.get("quantity"),
  });

  // Safe to use data
  await decreaseProductStock(data.id, data.quantity);
}
```

---

## 🎯 BEST PRACTICES

1. **Use specific queries** - Don't fetch more than needed
2. **Add pagination** - Limit results for large datasets
3. **Handle errors** - Always wrap in try/catch
4. **Validate input** - Use Zod or similar
5. **Use transactions** - For multi-step operations
6. **Cache when possible** - Use React cache()
7. **Type safely** - Use TypeScript types from schema
8. **Test queries** - Write unit tests for queries

---

## 🧪 TESTING EXAMPLES

```typescript
import { describe, it, expect } from "vitest";
import { getFeaturedProducts } from "@/lib/db/queries/products";

describe("Product Queries", () => {
  it("should return featured products", async () => {
    const products = await getFeaturedProducts();

    expect(products.length).toBeLessThanOrEqual(8);
    expect(products.every((p) => p.featured)).toBe(true);
    expect(products.every((p) => p.active)).toBe(true);
  });
});
```

---

**Created:** 2026-03-25  
**Status:** ✅ Ready to Use  
**Last Updated:** After Magic MCP component generation
