# 👕 LIMITED EDITION DROPS GUIDE

**Complete guide for implementing limited edition merch drops**

---

## 🎯 WHY LIMITED DROPS?

### **Benefits:**

```
✅ Create urgency (FOMO)
✅ Drive immediate sales
✅ Generate buzz & excitement
✅ Reward loyal fans
✅ Test new designs
✅ Premium pricing possible
```

### **Psychology:**

```
✅ Scarcity principle (limited quantity)
✅ Urgency (limited time)
✅ Exclusivity (VIP early access)
✅ Social proof (selling fast)
```

---

## 📋 DROP TYPES

### **1. Flash Drop** (24-48 hours)

```
Quantity: 50-100 items
Duration: 24-48 hours
Announcement: 24 hours before
Example: "24-Hour Flash Sale - 100 Limited T-Shirts"
```

### **2. Scheduled Drop** (Weekly/Monthly)

```
Quantity: 100-500 items
Duration: 1 week
Announcement: 1 week before
Example: "Monthly Limited Edition - Available for 1 week"
```

### **3. Surprise Drop** (Unannounced)

```
Quantity: 25-50 items
Duration: Until sold out
Announcement: None (surprise!)
Example: "Surprise! Just dropped 50 signed posters"
```

### **4. VIP Exclusive Drop**

```
Quantity: 10-25 items
Duration: 24 hours VIP early access
Announcement: VIP members only
Example: "VIP Exclusive - Signed Album Bundle"
```

---

## 🔧 IMPLEMENTATION

### **1. Database Schema**

```typescript
// lib/db/schema/drops.ts
import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  integer,
  boolean,
  decimal,
} from "drizzle-orm/pg-core";

// Limited edition drops
export const limitedDrop = pgTable("limited_drop", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  productId: uuid("product_id").notNull(),
  quantity: integer("quantity").notNull(), // Total quantity
  quantityRemaining: integer("quantity_remaining").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  originalPrice: decimal("original_price", { precision: 10, scale: 2 }), // For discount display
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  vipEarlyAccess: boolean("vip_early_access").default(false),
  vipEarlyAccessHours: integer("vip_early_access_hours"), // Hours before public
  isActive: boolean("is_active").default(true),
  isSoldOut: boolean("is_sold_out").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Drop entries (for analytics)
export const dropEntry = pgTable("drop_entry", {
  id: uuid("id").primaryKey().defaultRandom(),
  dropId: uuid("drop_id").references(() => limitedDrop.id),
  userId: uuid("user_id"),
  purchasedAt: timestamp("purchased_at").defaultNow(),
  quantity: integer("quantity").default(1),
});

// Waitlist (for sold out drops)
export const dropWaitlist = pgTable("drop_waitlist", {
  id: uuid("id").primaryKey().defaultRandom(),
  dropId: uuid("drop_id").references(() => limitedDrop.id),
  email: varchar("email", { length: 255 }).notNull(),
  userId: uuid("user_id"),
  notifiedAt: timestamp("notified_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
```

---

### **2. API Endpoints**

**Get Active Drops:**

```typescript
// app/api/drops/active/route.ts
export async function GET() {
  try {
    const now = new Date();

    const drops = await db
      .select()
      .from(limitedDrop)
      .where(
        and(
          eq(limitedDrop.isActive, true),
          eq(limitedDrop.isSoldOut, false),
          gte(limitedDrop.endDate, now),
          gte(limitedDrop.startDate, now),
        ),
      );

    return NextResponse.json({
      success: true,
      data: drops,
    });
  } catch (error) {
    console.error("Error fetching drops:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch drops" },
      { status: 500 },
    );
  }
}
```

**Create Drop (Admin):**

```typescript
// app/api/drops/create/route.ts
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
      productId,
      quantity,
      price,
      originalPrice,
      startDate,
      endDate,
      vipEarlyAccess,
      vipEarlyAccessHours,
    } = body;

    // Create drop
    const [newDrop] = await db
      .insert(limitedDrop)
      .values({
        name,
        description,
        productId,
        quantity,
        quantityRemaining: quantity,
        price,
        originalPrice,
        startDate,
        endDate,
        vipEarlyAccess,
        vipEarlyAccessHours,
      })
      .returning();

    // Send notification to VIP members
    if (vipEarlyAccess) {
      await notifyVIPEarlyAccess(newDrop);
    }

    return NextResponse.json({
      success: true,
      data: newDrop,
    });
  } catch (error) {
    console.error("Error creating drop:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create drop" },
      { status: 500 },
    );
  }
}
```

**Purchase from Drop:**

```typescript
// app/api/drops/purchase/route.ts
export async function POST(request: NextRequest) {
  try {
    const { dropId, userId, quantity } = await request.json();

    // Get drop details
    const [drop] = await db
      .select()
      .from(limitedDrop)
      .where(eq(limitedDrop.id, dropId));

    if (!drop) {
      return NextResponse.json(
        { success: false, error: "Drop not found" },
        { status: 404 },
      );
    }

    // Check if drop is active
    const now = new Date();
    if (now < drop.startDate || now > drop.endDate) {
      return NextResponse.json(
        { success: false, error: "Drop is not active" },
        { status: 400 },
      );
    }

    // Check if sold out
    if (drop.isSoldOut || drop.quantityRemaining < quantity) {
      return NextResponse.json(
        { success: false, error: "Sold out" },
        { status: 400 },
      );
    }

    // Check VIP early access
    if (drop.vipEarlyAccess) {
      const publicStartDate = new Date(drop.startDate);
      publicStartDate.setHours(
        publicStartDate.getHours() - drop.vipEarlyAccessHours!,
      );

      if (now < publicStartDate) {
        // Check if user is VIP
        const [membership] = await db
          .select()
          .from(vipMembership)
          .where(
            and(
              eq(vipMembership.userId, userId),
              eq(vipMembership.status, "active"),
            ),
          );

        if (!membership) {
          return NextResponse.json(
            { success: false, error: "VIP early access only" },
            { status: 403 },
          );
        }
      }
    }

    // Process purchase (Stripe integration)
    const stripeSession = await createStripeCheckout({
      productId: drop.productId,
      quantity,
      price: drop.price,
      userId,
      metadata: {
        dropId,
        type: "limited_drop",
      },
    });

    return NextResponse.json({
      success: true,
      url: stripeSession.url,
    });
  } catch (error) {
    console.error("Error purchasing from drop:", error);
    return NextResponse.json(
      { success: false, error: "Failed to purchase" },
      { status: 500 },
    );
  }
}
```

---

### **3. UI Components**

**Drop Card:**

```typescript
// components/drops/DropCard.tsx
'use client';

import { useState, useEffect } from 'react';

export default function DropCard({ drop }: { drop: any }) {
  const [timeRemaining, setTimeRemaining] = useState('');
  const [percentSold, setPercentSold] = useState(0);

  useEffect(() => {
    // Update countdown timer
    const interval = setInterval(() => {
      const end = new Date(drop.endDate);
      const now = new Date();
      const diff = end.getTime() - now.getTime();

      if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setTimeRemaining(`${hours}h ${minutes}m`);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [drop.endDate]);

  useEffect(() => {
    // Calculate percent sold
    const sold = drop.quantity - drop.quantityRemaining;
    const percent = (sold / drop.quantity) * 100;
    setPercentSold(percent);
  }, [drop.quantity, drop.quantityRemaining]);

  return (
    <div className="bg-gradient-to-br from-purple-900 to-gray-900 rounded-2xl p-6 shadow-2xl">
      {/* VIP Badge */}
      {drop.vipEarlyAccess && (
        <div className="absolute top-4 right-4">
          <span className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            👑 VIP Early Access
          </span>
        </div>
      )}

      {/* Product Image */}
      <div className="aspect-square bg-gray-800 rounded-xl mb-4 overflow-hidden">
        <Image
          src={drop.productImage}
          alt={drop.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Drop Info */}
      <h3 className="text-2xl font-bold text-white mb-2">{drop.name}</h3>
      <p className="text-gray-400 mb-4">{drop.description}</p>

      {/* Price */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl font-bold text-white">€{drop.price}</span>
        {drop.originalPrice && (
          <span className="text-xl text-gray-500 line-through">€{drop.originalPrice}</span>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>{drop.quantityRemaining} remaining</span>
          <span>{Math.round(percentSold)}% sold</span>
        </div>
        <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-500"
            style={{ width: `${percentSold}%` }}
          />
        </div>
        {percentSold > 50 && (
          <p className="text-red-500 text-sm mt-2 font-bold">🔥 Selling Fast!</p>
        )}
      </div>

      {/* Countdown */}
      <div className="bg-gray-800 rounded-lg p-3 mb-4 text-center">
        <p className="text-gray-400 text-sm mb-1">Ends in:</p>
        <p className="text-2xl font-bold text-white">{timeRemaining}</p>
      </div>

      {/* CTA Button */}
      <button
        disabled={drop.isSoldOut || drop.quantityRemaining === 0}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-8 rounded-xl hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {drop.isSoldOut ? 'Sold Out' : 'Get Yours Now'}
      </button>
    </div>
  );
}
```

---

## 📢 MARKETING STRATEGY

### **Pre-Drop (1 Week Before):**

```
✅ Tease on social media
✅ Email subscribers
✅ Push notification
✅ VIP early access announcement
✅ Countdown on website
```

### **Drop Day:**

```
✅ Announce on all channels
✅ Instagram Story countdown
✅ Live stream reveal
✅ Influencer partnerships
✅ Paid ads (Instagram/Facebook)
```

### **During Drop:**

```
✅ Update sold count regularly
✅ "Selling Fast" alerts
✅ Social proof posts
✅ User-generated content
✅ Last chance reminders
```

### **Post-Drop:**

```
✅ Thank you message
✅ Share success metrics
✅ Waitlist for next drop
✅ Analyze performance
✅ Plan next drop
```

---

## 💰 PRICING STRATEGY

### **Flash Drop:**

```
Original: €30
Drop Price: €25 (17% off)
Quantity: 100
Revenue: €2,500
```

### **Limited Edition:**

```
Original: €50
Drop Price: €60 (premium pricing)
Quantity: 50
Revenue: €3,000
```

### **VIP Exclusive:**

```
Original: €100
VIP Price: €80 (20% off for VIP)
Quantity: 25
Revenue: €2,000
```

---

## 📊 ANALYTICS TO TRACK

### **During Drop:**

```
📊 Views
📊 Add to carts
📊 Purchases
📊 Conversion rate
📊 Time to sell out
📊 Traffic sources
```

### **Post-Drop:**

```
📊 Total revenue
📊 Profit margin
📊 New customers
📊 Email signups
📊 Social media engagement
📊 Waitlist signups
```

---

## 🚀 QUICK START

### **First Drop (Simple):**

```
Time: 2 uri
Cost: €0
Platform: Existing merch store

Steps:
1. Choose product (1 ura)
2. Set quantity & price (30 min)
3. Create drop page (30 min)
4. Announce on social (30 min)
5. Go live!
```

### **Advanced Drop:**

```
Time: 1 dan
Cost: €100-500 (ads)
Platform: Custom drop page

Steps:
1. Design limited product (2 uri)
2. Setup drop system (2 uri)
3. Create marketing assets (2 uri)
4. Setup email campaign (1 ura)
5. Launch ads (1 ura)
6. Go live!
```

---

## ✅ CONCLUSION

**Limited Edition Drops ready!**

```
Status: ✅ Guide complete
Time to implement: 2 uri - 1 dan
Cost: €0-500
Impact: HIGH (urgency, revenue)
```

**Next:**

1. Choose first product
2. Set quantity & price
3. Create drop page
4. Announce date
5. Launch! 👕

---

**Limited drops pripravljeni!** 👕✅
