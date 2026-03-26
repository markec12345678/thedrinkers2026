# 📊 ANALYTICS SETUP GUIDE - THE DRINKERS

**Complete analytics and tracking implementation**

---

## ✅ EXISTING ANALYTICS

### **Plausible Analytics** ✅

**File:** `app/PlausibleAnalytics.tsx`
**Status:** Already configured

```typescript
// Already implemented
import Plausible from 'next-plausible';

export default function PlausibleAnalytics() {
  return <Plausible domain="thedrinkers.si" />;
}
```

---

## 🎯 ADDITIONAL ANALYTICS

### **1. Google Analytics 4** 🔥

**Installation:**

```bash
npm install react-ga4
```

**Setup:**

```typescript
// app/GoogleAnalytics.tsx
'use client';

import { useEffect } from 'react';
import ReactGA from 'react-ga4';

export default function GoogleAnalytics() {
  useEffect(() => {
    ReactGA.initialize(process.env.NEXT_PUBLIC_GA_ID!);
  }, []);

  return null;
}

// app/layout.tsx
import GoogleAnalytics from './GoogleAnalytics';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <GoogleAnalytics />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

**Track Page Views:**

```typescript
// app/page.tsx
'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import ReactGA from 'react-ga4';

export default function Page() {
  const pathname = usePathname();

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: pathname });
  }, [pathname]);

  return <div>...</div>;
}
```

---

### **2. Vercel Analytics** 🔥

**Installation:**

```bash
npm install @vercel/analytics
```

**Setup:**

```typescript
// app/VercelAnalytics.tsx
'use client';

import { Analytics } from '@vercel/analytics/react';

export default function VercelAnalytics() {
  return <Analytics />;
}

// app/layout.tsx
import VercelAnalytics from './VercelAnalytics';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <VercelAnalytics />
      </body>
    </html>
  );
}
```

---

### **3. Custom Event Tracking** 🔥

**Track Button Clicks:**

```typescript
// components/merch/MerchProductCard.tsx
const handleAddToCart = () => {
  // Track event
  if (typeof window !== "undefined") {
    // Google Analytics
    ReactGA.event({
      category: "E-commerce",
      action: "Add to Cart",
      label: product.name,
      value: product.price,
    });

    // Plausible
    window.plausible("Add to Cart", {
      props: {
        product: product.name,
        price: product.price,
      },
    });
  }

  // Add to cart logic
  addItem(product, size, quantity);
};
```

**Track Purchases:**

```typescript
// app/success/page.tsx
useEffect(() => {
  if (typeof window !== "undefined") {
    // Track purchase
    ReactGA.event({
      category: "E-commerce",
      action: "Purchase",
      value: total,
      nonInteraction: false,
    });

    // Plausible
    window.plausible("Purchase", {
      props: {
        total: total,
        items: items.length,
      },
    });
  }
}, []);
```

---

### **4. Tour Date Tracking** 🔥

**Track Ticket Clicks:**

```typescript
// components/tour/TourDateCard.tsx
const handleGetTickets = () => {
  if (typeof window !== "undefined") {
    ReactGA.event({
      category: "Tour",
      action: "Click Get Tickets",
      label: `${tourDate.venue} - ${tourDate.city}`,
    });

    window.plausible("Get Tickets", {
      props: {
        venue: tourDate.venue,
        city: tourDate.city,
        date: tourDate.date,
      },
    });
  }

  // Open ticket link
  window.open(tourDate.ticketUrl, "_blank");
};
```

---

### **5. Music Tracking** 🔥

**Track Song Plays:**

```typescript
// components/music-player/MusicPlayer.tsx
const handlePlay = (track: Track) => {
  if (typeof window !== "undefined") {
    ReactGA.event({
      category: "Music",
      action: "Play Song",
      label: track.title,
      value: track.duration,
    });

    window.plausible("Play Song", {
      props: {
        song: track.title,
        album: track.album,
        duration: track.duration,
      },
    });
  }

  // Play logic
  playTrack(track);
};
```

---

### **6. VIP Membership Tracking** 🔥

**Track Signups:**

```typescript
// components/vip/VIPTiersDisplay.tsx
const handleJoin = (tier: MembershipTier, billingCycle: string) => {
  if (typeof window !== "undefined") {
    ReactGA.event({
      category: "VIP",
      action: "Join Membership",
      label: tier.name,
      value: tier.price,
    });

    window.plausible("VIP Signup", {
      props: {
        tier: tier.name,
        price: tier.price,
        billing: billingCycle,
      },
    });
  }

  // Redirect to checkout
  redirectToCheckout(tier, billingCycle);
};
```

---

## 📊 ANALYTICS DASHBOARD

### **Create Custom Dashboard:**

**File:** `app/admin/analytics/page.tsx`

```typescript
'use client';

import { useAnalytics } from '@/hooks/useAnalytics';

export default function AnalyticsDashboard() {
  const { pageViews, events, conversions } = useAnalytics();

  return (
    <div>
      <h1>Analytics Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-3 gap-6">
        <div>
          <h3>Page Views</h3>
          <p className="text-3xl font-bold">{pageViews.total}</p>
          <p className="text-green-600">+{pageViews.change}%</p>
        </div>

        <div>
          <h3>Events</h3>
          <p className="text-3xl font-bold">{events.total}</p>
          <p className="text-green-600">+{events.change}%</p>
        </div>

        <div>
          <h3>Conversions</h3>
          <p className="text-3xl font-bold">{conversions.total}</p>
          <p className="text-green-600">+{conversions.change}%</p>
        </div>
      </div>

      {/* Event Timeline */}
      <div>
        <h3>Recent Events</h3>
        {events.recent.map(event => (
          <div key={event.id}>
            <span>{event.action}</span>
            <span>{event.label}</span>
            <span>{event.timestamp}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 🎯 TRACKING PLAN

### **E-commerce Events:**

```
✅ View Product
✅ Add to Cart
✅ Remove from Cart
✅ Begin Checkout
✅ Purchase
✅ Refund
```

### **Tour Events:**

```
✅ View Tour Dates
✅ Click Get Tickets
✅ View Venue Details
```

### **Music Events:**

```
✅ Play Song
✅ Pause Song
✅ Skip Song
✅ Add to Playlist
```

### **VIP Events:**

```
✅ View VIP Tiers
✅ Click Join
✅ Complete Signup
✅ Renew Membership
```

### **Fan Club Events:**

```
✅ Join Fan Club
✅ Submit Fan Art
✅ Vote on Art
✅ Comment
```

---

## 📊 ENVIRONMENT VARIABLES

**Add to .env:**

```env
# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=XXXXXXXXXX
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=thedrinkers.si
```

---

## ✅ ANALYTICS CHECKLIST

### **Setup:**

```
✅ Google Analytics 4
✅ Vercel Analytics
✅ Plausible Analytics
✅ Custom event tracking
✅ Conversion tracking
```

### **Events to Track:**

```
✅ Page views
✅ Button clicks
✅ Form submissions
✅ Purchases
✅ Tour ticket clicks
✅ Music plays
✅ VIP signups
✅ Fan art submissions
```

### **Dashboards:**

```
✅ Overview dashboard
✅ E-commerce dashboard
✅ Tour dashboard
✅ Music dashboard
✅ VIP dashboard
```

---

## 🚀 QUICK START

### **1. Install Dependencies:**

```bash
npm install react-ga4 @vercel/analytics next-plausible
```

### **2. Add Environment Variables:**

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### **3. Add to Layout:**

```typescript
// app/layout.tsx
import Plausible from 'next-plausible';
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Plausible domain="thedrinkers.si" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### **4. Track Events:**

```typescript
// In components
const handleClick = () => {
  ReactGA.event({
    category: "User",
    action: "Clicked Button",
  });
};
```

---

## ✅ CONCLUSION

**Analytics setup complete!**

```
Status: Ready to implement
Time: 1-2 uri
Impact: HIGH (data-driven decisions)
```

**Next:**

1. Install packages
2. Add to layout
3. Track key events
4. Create dashboard
5. Monitor regularly

---

**Analytics guide pripravljen!** 📊✅
