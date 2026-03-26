# 🎁 BUNDLE DEALS SETUP GUIDE

**Complete guide for creating merch + music bundles**

---

## 🎯 WHY BUNDLES?

### **Benefits:**

```
✅ Increase average order value
✅ Move more inventory
✅ Better customer experience
✅ Higher perceived value
✅ Introduce fans to new products
✅ Exclusive offerings
```

### **Psychology:**

```
✅ Value perception (save €€€)
✅ Convenience (all-in-one)
✅ Exclusivity (bundle-only items)
✅ FOMO (limited bundles)
```

---

## 📦 BUNDLE TYPES

### **1. Album + Merch Bundle**

```
Contents:
- Vinyl/CD album
- T-shirt or hoodie
- Signed poster
- Exclusive sticker pack

Price: €50-80 (save €20-30)
Example: "Tour 2026 Bundle - Album + T-Shirt + Signed Poster"
```

### **2. VIP Experience Bundle**

```
Contents:
- VIP membership (1 year)
- Signed album
- Exclusive merch item
- Meet & greet ticket

Price: €200-300 (save €100)
Example: "Ultimate Fan Bundle - VIP + Signed Album + Meet & Greet"
```

### **3. Starter Pack Bundle**

```
Contents:
- Best album (vinyl)
- Classic t-shirt
- Sticker pack
- Digital download

Price: €40-60 (save €15-20)
Example: "New Fan Starter Pack - Everything You Need"
```

### **4. Complete Collection Bundle**

```
Contents:
- All 4 albums (vinyl)
- All merch items
- Exclusive box set
- Signed certificate

Price: €200-400 (save €100-150)
Example: "Complete Collector's Edition - All Albums + Merch"
```

---

## 🔧 IMPLEMENTATION

### **1. Database Schema**

```typescript
// lib/db/schema/bundles.ts
import {
  pgTable,
  uuid,
  varchar,
  decimal,
  integer,
  boolean,
  jsonb,
  timestamp,
} from "drizzle-orm/pg-core";

// Bundle definitions
export const bundle = pgTable("bundle", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  items: jsonb("items").$type<
    {
      productId: string;
      quantity: number;
    }[]
  >(),
  bundlePrice: decimal("bundle_price", { precision: 10, scale: 2 }).notNull(),
  originalPrice: decimal("original_price", {
    precision: 10,
    scale: 2,
  }).notNull(), // Sum of individual items
  savings: decimal("savings", { precision: 10, scale: 2 }), // originalPrice - bundlePrice
  savingsPercent: integer("savings_percent"), // (savings / originalPrice) * 100
  quantity: integer("quantity").default(-1), // -1 = unlimited
  quantityRemaining: integer("quantity_remaining"),
  isActive: boolean("is_active").default(true),
  isLimited: boolean("is_limited").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Bundle purchases
export const bundlePurchase = pgTable("bundle_purchase", {
  id: uuid("id").primaryKey().defaultRandom(),
  bundleId: uuid("bundle_id").references(() => bundle.id),
  userId: uuid("user_id"),
  orderId: uuid("order_id"),
  purchasedAt: timestamp("purchased_at").defaultNow(),
  itemsReceived: jsonb("items_received").$type<
    {
      productId: string;
      quantity: number;
      fulfilled: boolean;
    }[]
  >(),
});
```

---

### **2. API Endpoints**

**Get Active Bundles:**

```typescript
// app/api/bundles/route.ts
export async function GET() {
  try {
    const bundles = await db
      .select()
      .from(bundle)
      .where(eq(bundle.isActive, true));

    return NextResponse.json({
      success: true,
      data: bundles,
    });
  } catch (error) {
    console.error("Error fetching bundles:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch bundles" },
      { status: 500 },
    );
  }
}
```

**Create Bundle (Admin):**

```typescript
// app/api/bundles/create/route.ts
export async function POST(request: NextRequest) {
  try {
    // Check admin authentication
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();
    const {
      name,
      description,
      items, // Array of { productId, quantity }
      bundlePrice,
      isLimited,
      quantity,
    } = body;

    // Calculate original price (sum of individual items)
    let originalPrice = 0;
    for (const item of items) {
      const [product] = await db
        .select()
        .from(product)
        .where(eq(product.id, item.productId));

      if (product) {
        originalPrice += parseFloat(product.price) * item.quantity;
      }
    }

    const savings = originalPrice - parseFloat(bundlePrice);
    const savingsPercent = Math.round((savings / originalPrice) * 100);

    // Create bundle
    const [newBundle] = await db
      .insert(bundle)
      .values({
        name,
        description,
        items,
        bundlePrice,
        originalPrice: originalPrice.toString(),
        savings: savings.toString(),
        savingsPercent,
        isLimited,
        quantity,
        quantityRemaining: quantity,
      })
      .returning();

    return NextResponse.json({
      success: true,
      data: newBundle,
    });
  } catch (error) {
    console.error("Error creating bundle:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create bundle" },
      { status: 500 },
    );
  }
}
```

**Purchase Bundle:**

```typescript
// app/api/bundles/purchase/route.ts
export async function POST(request: NextRequest) {
  try {
    const { bundleId, userId } = await request.json();

    // Get bundle details
    const [bundle] = await db
      .select()
      .from(bundle)
      .where(and(eq(bundle.id, bundleId), eq(bundle.isActive, true)));

    if (!bundle) {
      return NextResponse.json(
        { success: false, error: "Bundle not found or inactive" },
        { status: 404 },
      );
    }

    // Check if limited and sold out
    if (bundle.isLimited && bundle.quantityRemaining! <= 0) {
      return NextResponse.json(
        { success: false, error: "Bundle sold out" },
        { status: 400 },
      );
    }

    // Create Stripe checkout session
    const lineItems = bundle.items.map((item: any) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: `Bundle: ${bundle.name}`,
        },
        unit_amount: Math.round(parseFloat(bundle.bundlePrice) * 100),
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${request.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get("origin")}/bundles`,
      metadata: {
        bundleId,
        type: "bundle",
        items: JSON.stringify(bundle.items),
      },
    });

    return NextResponse.json({
      success: true,
      url: session.url,
    });
  } catch (error) {
    console.error("Error purchasing bundle:", error);
    return NextResponse.json(
      { success: false, error: "Failed to purchase bundle" },
      { status: 500 },
    );
  }
}
```

---

### **3. UI Components**

**Bundle Card:**

```typescript
// components/bundles/BundleCard.tsx
'use client';

export default function BundleCard({ bundle }: { bundle: any }) {
  return (
    <div className="bg-gradient-to-br from-purple-900 to-gray-900 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
      {/* Savings Badge */}
      <div className="absolute top-4 right-4">
        <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold">
          Save €{bundle.savings} ({bundle.savingsPercent}%)
        </span>
      </div>

      {/* Bundle Items */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {bundle.items.map((item: any, index: number) => (
          <div key={index} className="aspect-square bg-gray-800 rounded-xl overflow-hidden">
            <Image
              src={item.productImage}
              alt={item.productName}
              fill
              className="object-cover"
            />
            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
              x{item.quantity}
            </div>
          </div>
        ))}
      </div>

      {/* Bundle Info */}
      <h3 className="text-2xl font-bold text-white mb-2">{bundle.name}</h3>
      <p className="text-gray-400 mb-4">{bundle.description}</p>

      {/* Price */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-4xl font-bold text-white">€{bundle.bundlePrice}</span>
        <div className="flex flex-col">
          <span className="text-lg text-gray-500 line-through">€{bundle.originalPrice}</span>
          <span className="text-sm text-green-500 font-bold">Save €{bundle.savings}</span>
        </div>
      </div>

      {/* Bundle Items List */}
      <div className="bg-gray-800 rounded-lg p-4 mb-6">
        <h4 className="text-lg font-bold text-white mb-3">What's Included:</h4>
        <ul className="space-y-2">
          {bundle.items.map((item: any, index: number) => (
            <li key={index} className="flex items-center gap-2 text-gray-300">
              <span className="text-green-500">✓</span>
              <span>{item.quantity}x {item.productName}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Limited Edition Badge */}
      {bundle.isLimited && (
        <div className="bg-red-600/20 border border-red-600 rounded-lg p-3 mb-6 text-center">
          <p className="text-red-500 font-bold">
            🔥 Limited Edition - Only {bundle.quantityRemaining} left!
          </p>
        </div>
      )}

      {/* CTA Button */}
      <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-8 rounded-xl hover:from-purple-700 hover:to-pink-700">
        Get Bundle Now
      </button>
    </div>
  );
}
```

---

## 💰 BUNDLE EXAMPLES

### **Example 1: Album + Merch Bundle**

```
Contents:
- Tour 2026 Vinyl (€35)
- Tour T-Shirt (€30)
- Signed Poster (€15)
- Sticker Pack (€8)

Individual Total: €88
Bundle Price: €65
Savings: €23 (26% off)

Revenue per bundle: €65
Cost of goods: €35
Profit: €30
```

### **Example 2: VIP Bundle**

```
Contents:
- VIP Membership (1 year) (€300)
- Signed Album Bundle (€50)
- Exclusive Hoodie (€60)
- Meet & Greet Ticket (€100)

Individual Total: €510
Bundle Price: €399
Savings: €111 (22% off)

Revenue per bundle: €399
Cost of goods: €150
Profit: €249
```

---

## 📊 ANALYTICS TO TRACK

### **Bundle Performance:**

```
📊 Bundle views
📊 Add to cart rate
📊 Conversion rate
📊 Average order value
📊 Revenue per bundle
📊 Most popular bundles
```

### **Inventory Impact:**

```
📊 Individual item sales vs bundle sales
📊 Inventory movement
📊 Profit margin comparison
📊 Customer acquisition cost
```

---

## 🚀 QUICK START

### **First Bundle (Simple):**

```
Time: 1 ura
Cost: €0
Steps:
1. Choose 2-3 products (15 min)
2. Calculate bundle price (15 min)
3. Create bundle page (30 min)
4. Announce on social (15 min)
5. Launch!
```

### **Advanced Bundle:**

```
Time: 3-4 ure
Cost: €100-200 (for exclusive items)
Steps:
1. Design exclusive bundle items (1 ura)
2. Setup bundle system (1 ura)
3. Create marketing assets (1 ura)
4. Email campaign (30 min)
5. Launch!
```

---

## ✅ CONCLUSION

**Bundle Deals ready!**

```
Status: ✅ Guide complete
Time to implement: 1-4 ure
Cost: €0-200
Impact: HIGH (order value, revenue)
```

**Next:**

1. Choose products to bundle
2. Calculate pricing
3. Create bundle page
4. Announce launch
5. Start selling! 🎁

---

**Bundle deals pripravljeni!** 🎁✅
