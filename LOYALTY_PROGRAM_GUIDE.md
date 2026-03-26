# 💎 LOYALTY PROGRAM SETUP GUIDE

**Complete guide for implementing points & rewards system**

---

## 🎯 WHY LOYALTY PROGRAM?

### **Benefits:**

```
✅ Increase repeat purchases
✅ Higher customer lifetime value
✅ Better engagement
✅ Word-of-mouth marketing
✅ Valuable customer data
✅ Competitive advantage
```

### **Statistics:**

```
📈 70% of consumers more likely to buy from brands with loyalty programs
📈 Loyalty members spend 12-18% more than non-members
📈 5% increase in retention = 25-95% increase in profit
📈 80% of consumers say loyalty programs make them more likely to continue doing business
```

---

## 💎 POINTS SYSTEM

### **Earning Points:**

```
✅ Purchase: 1 point per €1 spent
✅ Account signup: 100 points
✅ Birthday: 200 points
✅ Review product: 50 points
✅ Share on social: 25 points
✅ Refer friend: 500 points
✅ Attend concert: 100 points
✅ VIP membership: 50 points/month
```

### **Redeeming Points:**

```
100 points = €5 discount
250 points = €15 discount
500 points = €35 discount
1000 points = €80 discount
2000 points = €200 discount + Exclusive merch
```

### **Tiers:**

```
🥉 Bronze (0-999 points)
   - 1 point per €1
   - Birthday reward
   - Early sale access

🥈 Silver (1,000-4,999 points)
   - 1.25 points per €1
   - All Bronze benefits
   - Free shipping
   - Exclusive merch access

🥇 Gold (5,000+ points)
   - 1.5 points per €1
   - All Silver benefits
   - VIP event invitations
   - Personal stylist
   - Exclusive experiences
```

---

## 🔧 IMPLEMENTATION

### **1. Database Schema** (Already exists!)

```typescript
// Already in lib/db/schema/index.ts:

export const userPoints = pgTable("user_points", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id),
  points: integer("points").default(0).notNull(),
  lifetimePoints: integer("lifetime_points").default(0),
  lastUpdated: timestamp("last_updated").defaultNow().notNull(),
});

export const pointsTransaction = pgTable("points_transaction", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id),
  amount: integer("amount").notNull(), // Positive = earned, negative = spent
  type: varchar("type", { length: 50 }).notNull(), // purchase, review, referral, redemption, bonus
  description: text("description").notNull(),
  reference: varchar("reference", { length: 255 }), // Order ID, etc.
  balance: integer("balance").notNull(), // Balance after transaction
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const userReward = pgTable("user_reward", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id),
  type: varchar("type", { length: 50 }).notNull(), // points, badge, discount, free_shipping
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  value: decimal("value", { precision: 10, scale: 2 }),
  metadata: jsonb("metadata").$type<Record<string, any>>(),
  earnedAt: timestamp("earned_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at"),
  usedAt: timestamp("used_at"),
  status: varchar("status", { length: 50 }).notNull().default("active"),
});
```

---

### **2. API Endpoints**

**Get User Points:**

```typescript
// app/api/points/route.ts
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("X-User-ID");

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 401 });
    }

    const [userPointsData] = await db
      .select()
      .from(userPoints)
      .where(eq(userPoints.userId, userId));

    if (!userPointsData) {
      // Create points account for new user
      const [newPoints] = await db
        .insert(userPoints)
        .values({
          userId,
          points: 0,
          lifetimePoints: 0,
        })
        .returning();

      return NextResponse.json({
        success: true,
        data: newPoints,
      });
    }

    return NextResponse.json({
      success: true,
      data: userPointsData,
    });
  } catch (error) {
    console.error("Error fetching points:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch points" },
      { status: 500 },
    );
  }
}
```

**Earn Points:**

```typescript
// app/api/points/earn/route.ts
export async function POST(request: NextRequest) {
  try {
    const { userId, amount, type, description, reference } =
      await request.json();

    // Get current points
    const [userPointsData] = await db
      .select()
      .from(userPoints)
      .where(eq(userPoints.userId, userId));

    if (!userPointsData) {
      return NextResponse.json(
        { error: "User points account not found" },
        { status: 404 },
      );
    }

    // Update points
    const newBalance = userPointsData.points + amount;
    const newLifetimePoints = userPointsData.lifetimePoints + amount;

    await db
      .update(userPoints)
      .set({
        points: newBalance,
        lifetimePoints: newLifetimePoints,
        lastUpdated: new Date(),
      })
      .where(eq(userPoints.userId, userId));

    // Record transaction
    await db.insert(pointsTransaction).values({
      userId,
      amount,
      type,
      description,
      reference,
      balance: newBalance,
    });

    // Check for tier upgrades
    await checkTierUpgrade(userId, newLifetimePoints);

    return NextResponse.json({
      success: true,
      data: {
        newBalance,
        lifetimePoints: newLifetimePoints,
      },
    });
  } catch (error) {
    console.error("Error earning points:", error);
    return NextResponse.json(
      { success: false, error: "Failed to earn points" },
      { status: 500 },
    );
  }
}
```

**Redeem Points:**

```typescript
// app/api/points/redeem/route.ts
export async function POST(request: NextRequest) {
  try {
    const { userId, pointsToRedeem, rewardType } = await request.json();

    // Get current points
    const [userPointsData] = await db
      .select()
      .from(userPoints)
      .where(eq(userPoints.userId, userId));

    if (!userPointsData || userPointsData.points < pointsToRedeem) {
      return NextResponse.json(
        { success: false, error: "Insufficient points" },
        { status: 400 },
      );
    }

    // Calculate discount value
    const discountValue = (pointsToRedeem / 100) * 5; // €5 per 100 points

    // Update points
    const newBalance = userPointsData.points - pointsToRedeem;

    await db
      .update(userPoints)
      .set({
        points: newBalance,
        lastUpdated: new Date(),
      })
      .where(eq(userPoints.userId, userId));

    // Record transaction (negative amount = spent)
    await db.insert(pointsTransaction).values({
      userId,
      amount: -pointsToRedeem,
      type: "redemption",
      description: `Redeemed ${pointsToRedeem} points for €${discountValue} discount`,
      balance: newBalance,
    });

    // Create reward record
    const [reward] = await db
      .insert(userReward)
      .values({
        userId,
        type: "discount",
        name: `€${discountValue} Discount`,
        description: `Redeemed ${pointsToRedeem} points`,
        value: discountValue.toString(),
        status: "active",
      })
      .returning();

    return NextResponse.json({
      success: true,
      data: {
        newBalance,
        reward,
        discountValue,
      },
    });
  } catch (error) {
    console.error("Error redeeming points:", error);
    return NextResponse.json(
      { success: false, error: "Failed to redeem points" },
      { status: 500 },
    );
  }
}
```

---

### **3. UI Components**

**Points Display:**

```typescript
// components/loyalty/PointsDisplay.tsx
'use client';

export default function PointsDisplay({ points, tier }: { points: number; tier: string }) {
  const tierColors = {
    bronze: 'from-amber-700 to-amber-900',
    silver: 'from-gray-400 to-gray-600',
    gold: 'from-yellow-400 to-yellow-600',
  };

  const tierIcons = {
    bronze: '🥉',
    silver: '🥈',
    gold: '🥇',
  };

  return (
    <div className={`bg-gradient-to-br ${tierColors[tier as keyof typeof tierColors]} rounded-2xl p-6 shadow-2xl text-white`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold">Your Points</h3>
        <span className="text-4xl">{tierIcons[tier as keyof typeof tierIcons]}</span>
      </div>

      <div className="text-5xl font-bold mb-2">{points.toLocaleString()}</div>
      <div className="text-white/80 mb-6">points available</div>

      {/* Tier Progress */}
      <div className="bg-white/20 rounded-full h-4 mb-2 overflow-hidden">
        <div
          className="bg-white h-full transition-all duration-500"
          style={{ width: `${(points / 5000) * 100}%` }}
        />
      </div>
      <div className="text-sm text-white/80">
        {points < 1000 && `${1000 - points} points to Silver`}
        {points >= 1000 && points < 5000 && `${5000 - points} points to Gold`}
        {points >= 5000 && 'Gold Member! 🎉'}
      </div>
    </div>
  );
}
```

**Rewards Catalog:**

```typescript
// components/loyalty/RewardsCatalog.tsx
export default function RewardsCatalog() {
  const rewards = [
    {
      points: 100,
      value: '€5',
      description: 'Discount on next purchase',
      popular: false,
    },
    {
      points: 250,
      value: '€15',
      description: 'Discount on next purchase',
      popular: true,
    },
    {
      points: 500,
      value: '€35',
      description: 'Discount on next purchase',
      popular: false,
    },
    {
      points: 1000,
      value: '€80',
      description: 'Discount + Exclusive merch',
      popular: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {rewards.map((reward, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl relative">
          {reward.popular && (
            <div className="absolute top-4 right-4">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                Popular
              </span>
            </div>
          )}

          <div className="text-center mb-4">
            <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              {reward.points}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">points</div>
          </div>

          <div className="text-center mb-4">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
              {reward.value}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {reward.description}
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-6 rounded-xl hover:from-purple-700 hover:to-pink-700">
            Redeem Now
          </button>
        </div>
      ))}
    </div>
  );
}
```

---

## 📊 EARNING EXAMPLES

### **Purchase:**

```
Fan buys €50 merch
Earns: 50 points
Tier bonus (Silver): +12.5 points (1.25x)
Total earned: 62.5 points
```

### **Referral:**

```
Fan refers friend
Friend makes first purchase
Fan earns: 500 points
Friend earns: 100 points (welcome bonus)
```

### **Social Share:**

```
Fan shares concert on Instagram
Earns: 25 points
Daily limit: 3 shares (75 points max/day)
```

---

## 💰 COST ANALYSIS

### **Points Liability:**

```
Assume:
- 1,000 active members
- Average balance: 500 points/member
- Total points outstanding: 500,000
- Redemption rate: €5 per 100 points
- Total liability: €25,000

This is your "points debt" - fans will redeem eventually
```

### **Program Cost:**

```
Monthly costs:
- Platform: €100-300/month
- Rewards fulfillment: Variable
- Marketing: €200-500/month

Total: €300-800/month + rewards cost
```

### **ROI:**

```
Expected increase:
- Repeat purchases: +20%
- Average order value: +15%
- Customer lifetime value: +30%

Example:
Current monthly revenue: €10,000
With loyalty program: €13,000-15,000
Program cost: €500-1,000
Net gain: €2,500-4,500/month
```

---

## 🚀 QUICK START

### **Phase 1: Basic Points (2 uri)**

```
1. Enable points tracking (30 min)
2. Setup earning rules (30 min)
3. Create redemption options (30 min)
4. Announce to fans (30 min)
5. Launch!
```

### **Phase 2: Tiers (3 ure)**

```
1. Define tier benefits (1 ura)
2. Setup tier logic (1 ura)
3. Create tier UI (30 min)
4. Launch tiers (30 min)
```

### **Phase 3: Advanced (1 dan)**

```
1. Referral program (2 uri)
2. Birthday rewards (1 ura)
3. Social sharing (1 ura)
4. VIP integration (2 uri)
5. Analytics (2 uri)
```

---

## ✅ CONCLUSION

**Loyalty Program ready!**

```
Status: ✅ Guide complete
Database: ✅ Already exists
Time to implement: 2 uri - 1 dan
Cost: €300-800/month
Impact: HIGH (retention, LTV)
```

**Next:**

1. Enable points tracking
2. Setup earning rules
3. Create rewards
4. Announce launch
5. Start earning! 💎

---

**Loyalty program pripravljen!** 💎✅
