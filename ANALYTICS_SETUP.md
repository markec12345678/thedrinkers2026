# 📊 ANALYTICS SETUP GUIDE

**Complete analytics setup for The Drinkers**

---

## 🎯 ANALYTICS TOOLS

### **1. Google Analytics 4** (Required)

```
Purpose: Track visitors, behavior, conversions
Cost: Free
Setup time: 10 minutes
```

### **2. Vercel Analytics** (Optional)

```
Purpose: Performance metrics
Cost: Free with Vercel
Setup time: 5 minutes
```

### **3. Conversion Tracking** (Required)

```
Purpose: Track purchases, signups
Cost: Free
Setup time: 15 minutes
```

---

## 📋 GOOGLE ANALYTICS SETUP

### **Step 1: Create GA4 Property**

1. Go to https://analytics.google.com
2. Sign in with Google account
3. Click "Admin" (gear icon)
4. Click "Create Property"
5. Fill in details:
   - Property name: "The Drinkers"
   - Reporting time zone: Slovenia
   - Currency: EUR
6. Click "Next"
7. Fill in business details
8. Click "Create"

### **Step 2: Get Measurement ID**

1. Go to Data Streams
2. Click "Add stream" → "Web"
3. Enter website URL: https://thedrinkers.si
4. Stream name: "The Drinkers Website"
5. Click "Create stream"
6. Copy Measurement ID (starts with G-)

### **Step 3: Add to Website**

**Add to `.env`:**

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**Install package:**

```bash
npm install @vercel/analytics
```

**Add to layout.tsx:**

```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

---

## 🎯 CONVERSION TRACKING

### **Track Purchases:**

**Add to purchase API:**

```typescript
// app/api/drops/purchase/route.ts

// After successful purchase
if (typeof window !== "undefined") {
  // Google Analytics
  window.gtag("event", "purchase", {
    transaction_id: sessionId,
    value: total,
    currency: "EUR",
    items: [
      {
        item_id: dropId,
        item_name: dropName,
        price: price,
        quantity: quantity,
      },
    ],
  });
}
```

### **Track Waitlist Signups:**

```typescript
// app/api/drops/waitlist/route.ts

// After successful signup
if (typeof window !== "undefined") {
  // Google Analytics
  window.gtag("event", "generate_lead", {
    event_category: "waitlist",
    event_label: dropId,
  });
}
```

### **Track Newsletter Signups:**

```typescript
// app/api/newsletter/route.ts

// After successful signup
if (typeof window !== "undefined") {
  // Google Analytics
  window.gtag("event", "sign_up", {
    event_category: "newsletter",
    method: "email",
  });
}
```

---

## 📊 EVENTS TO TRACK

### **Page Views:**

```
✅ Homepage
✅ Drops page
✅ Bundles page
✅ Product detail
✅ Success page
```

### **User Actions:**

```
✅ Add to cart
✅ Purchase
✅ Waitlist signup
✅ Newsletter signup
✅ Filter usage
✅ Search usage
```

### **E-commerce:**

```
✅ Product views
✅ Add to cart
✅ Begin checkout
✅ Purchase
✅ Refund (if needed)
```

---

## 🔧 SETUP CHECKLIST

### **Google Analytics:**

```
□ Create GA4 property
□ Get measurement ID
□ Add to .env
□ Install analytics package
□ Add to layout
□ Test tracking
□ Verify in GA dashboard
```

### **Conversion Tracking:**

```
□ Setup purchase tracking
□ Setup lead tracking
□ Setup signup tracking
□ Test all events
□ Verify in GA dashboard
```

### **Goals:**

```
□ Setup purchase goal
□ Setup waitlist goal
□ Setup newsletter goal
□ Setup funnel visualization
```

---

## 📈 DASHBOARD TO MONITOR

### **Real-time:**

```
- Active users
- Top pages
- Traffic sources
- Events per minute
```

### **Acquisition:**

```
- Traffic by channel
- Top referrers
- Campaign performance
- Social traffic
```

### **Behavior:**

```
- Top pages
- Avg time on page
- Bounce rate
- Exit pages
```

### **Conversions:**

```
- Purchase rate
- Waitlist signups
- Newsletter signups
- Revenue
```

---

## 🎯 KEY METRICS

### **Daily:**

```
📊 Visitors
📊 Page views
📊 Add to carts
📊 Purchases
📊 Conversion rate
```

### **Weekly:**

```
📊 Traffic sources
📊 Top products
📊 Drop performance
📊 Email signups
📊 Revenue
```

### **Monthly:**

```
📊 Total revenue
📊 Customer acquisition
📊 Retention rate
📊 Average order value
📊 Customer lifetime value
```

---

## ✅ ANALYTICS CHECKLIST

**Setup:**

```
□ GA4 property created
□ Measurement ID added
□ Analytics package installed
□ Tracking code added
□ Conversions configured
```

**Testing:**

```
□ Real-time tracking works
□ Page views tracked
□ Events tracked
□ Conversions tracked
□ Data appears in GA
```

**Optimization:**

```
□ Goals configured
□ Funnels setup
□ Custom reports created
□ Dashboards created
□ Alerts configured
```

---

## 🚀 QUICK START

**1. Create GA4 (10 min):**

```
analytics.google.com → Create Property → Get ID
```

**2. Add to .env (1 min):**

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**3. Install package (1 min):**

```bash
npm install @vercel/analytics
```

**4. Add to layout (2 min):**

```typescript
import { Analytics } from "@vercel/analytics/react";
```

**5. Test (5 min):**

```
Visit site → Check GA real-time → Verify tracking
```

---

**Total setup time: ~20 minutes!** ⏱️

**Start with GA4 setup!** 📊
