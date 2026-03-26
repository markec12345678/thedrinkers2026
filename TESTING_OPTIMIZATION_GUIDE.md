# 🧪 TESTING & OPTIMIZATION GUIDE

**Complete guide for pending tasks**

---

## ⏳ PENDING TASKS OVERVIEW

| Task                         | Priority | Estimated Time | Status     |
| ---------------------------- | -------- | -------------- | ---------- |
| **Manual Testing**           | High     | 2 hours        | ⏳ Pending |
| **Stripe Integration**       | High     | 3 hours        | ⏳ Pending |
| **SEO Implementation**       | Medium   | 2 hours        | ⏳ Pending |
| **Performance Optimization** | Medium   | 4 hours        | ⏳ Pending |

---

## 1️⃣ MANUAL TESTING (4 Tasks)

### **Task 5.1: Test Add to Cart**

#### **Setup**

```bash
# Start development server
cd f:\thedrinkers\the
npm run dev

# Open in browser
http://localhost:3000/merch
```

#### **Test Cases**

**TC 5.1.1: Basic Add to Cart**

```
1. Navigate to /merch
2. Click on "The Drinkers Classic T-Shirt"
3. Select size "L"
4. Select quantity "2"
5. Click "Add to Cart"

Expected Result:
✅ Cart sidebar opens
✅ Product appears in cart
✅ Size "L" displayed
✅ Quantity "2" displayed
✅ Price: €59.98 (2 × €29.99)
✅ Cart count shows "1" (item, not quantity)
```

**TC 5.1.2: Multiple Items**

```
1. Add T-Shirt (size L, qty 2)
2. Add Hoodie (size XL, qty 1)

Expected Result:
✅ Both items in cart
✅ Subtotal: €119.97
✅ Cart count shows "2"
```

**TC 5.1.3: Quantity Update**

```
1. Add product to cart
2. Click "+" button

Expected Result:
✅ Quantity increases
✅ Price recalculates
✅ Total updates

1. Click "-" button

Expected Result:
✅ Quantity decreases
✅ Minimum quantity is 1
```

**TC 5.1.4: Remove Item**

```
1. Add product to cart
2. Click "Remove" or trash icon

Expected Result:
✅ Item removed from cart
✅ Cart recalculates
✅ If last item, cart shows empty state
```

**TC 5.1.5: Size Validation**

```
1. Click product with multiple sizes
2. DON'T select size
3. Try to add to cart

Expected Result:
✅ Error message shown
✅ "Please select a size"
✅ Item NOT added to cart
```

**TC 5.1.6: Stock Validation**

```
1. Add product with stock=5
2. Try to add quantity=6

Expected Result:
✅ Error or disabled button
✅ "Only 5 items in stock"
```

#### **Test Report Template**

```markdown
## Test Results: Add to Cart

**Date:** 2026-03-25
**Tester:** [Your Name]
**Browser:** Chrome/Firefox/Safari

| Test Case | Pass/Fail | Notes |
| --------- | --------- | ----- |
| TC 5.1.1  | ⬜        |       |
| TC 5.1.2  | ⬜        |       |
| TC 5.1.3  | ⬜        |       |
| TC 5.1.4  | ⬜        |       |
| TC 5.1.5  | ⬜        |       |
| TC 5.1.6  | ⬜        |       |

**Issues Found:**

- [ ] Issue 1
- [ ] Issue 2

**Overall:** PASS / FAIL
```

---

### **Task 7: Test Mobile Responsiveness**

#### **Devices to Test**

**Chrome DevTools:**

```
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select from dropdown:

Smartphones:
- iPhone 12 Pro (390 x 844)
- iPhone 14 Pro Max (430 x 932)
- Samsung Galaxy S20 (360 x 800)
- Pixel 5 (393 x 851)

Tablets:
- iPad Mini (768 x 1024)
- iPad Pro (1024 x 1366)
- Surface Pro (912 x 1368)
```

#### **Test Cases**

**TC 7.1: Product Grid**

```
Mobile (< 640px):
✅ 1 column layout
✅ Images load properly
✅ Text readable
✅ Buttons tappable (min 44px)

Tablet (640px - 1024px):
✅ 2 column layout
✅ Images scale properly
✅ No horizontal scroll
```

**TC 7.2: Cart Sidebar**

```
Mobile:
✅ Sidebar slides in from right
✅ Takes full width or 80%
✅ Close button visible
✅ Scrollable if content overflows
✅ Backdrop click closes cart
```

**TC 7.3: Quick View Modal**

```
Mobile:
✅ Modal appears centered
✅ Images visible
✅ Close button accessible
✅ Form inputs usable
✅ Keyboard doesn't hide inputs
```

**TC 7.4: Category Filter**

```
Mobile:
✅ Filter buttons wrap properly
✅ Active state visible
✅ All buttons tappable
```

**TC 7.5: Checkout Flow**

```
Mobile:
✅ Form inputs accessible
✅ Auto-zoom doesn't trigger
✅ Validation messages visible
✅ Buttons full-width
```

#### **Mobile Testing Checklist**

```markdown
## Mobile Test Results

**Date:** 2026-03-25
**Devices Tested:**

### iPhone 12 Pro

- [ ] Product grid
- [ ] Cart sidebar
- [ ] Quick view
- [ ] Category filter
- [ ] Checkout

### Samsung Galaxy S20

- [ ] Product grid
- [ ] Cart sidebar
- [ ] Quick view
- [ ] Category filter
- [ ] Checkout

### iPad Pro

- [ ] Product grid (2 columns)
- [ ] Cart sidebar
- [ ] Quick view
- [ ] Category filter
- [ ] Checkout

**Issues:**

- [ ] List any layout issues
- [ ] List any interaction issues
```

---

### **Task 8: Test Dark Mode**

#### **Toggle Theme**

**In App:**

```
1. Look for theme toggle (sun/moon icon)
2. Click to switch between light/dark
3. Verify all pages update
```

**System Preference:**

```
Windows:
1. Settings > Personalization > Colors
2. Choose mode: Light/Dark/Custom
3. Refresh browser

macOS:
1. System Preferences > General
2. Appearance: Light/Dark
3. Refresh browser
```

#### **Test Cases**

**TC 8.1: All Components**

```
For each component:
✅ Background colors appropriate
✅ Text readable (contrast ratio > 4.5:1)
✅ Images visible
✅ Icons visible
✅ Borders visible
✅ Hover states work
✅ Focus states visible
```

**Components to Test:**

```
- [ ] MerchProductCard
- [ ] ShoppingCartSidebar
- [ ] QuickViewModal
- [ ] TourDateCard
- [ ] MusicPlayer
- [ ] VIPTiersDisplay
- [ ] All UI components (buttons, inputs, etc.)
```

**TC 8.2: Theme Persistence**

```
1. Select dark mode
2. Refresh page

Expected:
✅ Theme persists
✅ Stored in localStorage

1. Clear localStorage
2. Refresh page

Expected:
✅ Falls back to system preference
```

**TC 8.3: Images in Dark Mode**

```
✅ Album art visible
✅ Product images not washed out
✅ No harsh contrast
✅ Logos visible
```

#### **Dark Mode Checklist**

```markdown
## Dark Mode Test Results

**Date:** 2026-03-25
**Browser:** Chrome/Firefox/Safari

### Light Mode

- [ ] All text readable
- [ ] All images visible
- [ ] All buttons work
- [ ] All forms usable
- [ ] No visual glitches

### Dark Mode

- [ ] All text readable
- [ ] All images visible
- [ ] All buttons work
- [ ] All forms usable
- [ ] No visual glitches

### Theme Toggle

- [ ] Toggle button works
- [ ] Theme persists on refresh
- [ ] Respects system preference

**Issues:**

- [ ] List contrast issues
- [ ] List visibility issues
```

---

## 2️⃣ STRIPE INTEGRATION

### **Setup Stripe**

#### **Step 1: Create Stripe Account**

```
1. Go to https://stripe.com
2. Click "Sign up"
3. Fill in business details
4. Verify email
5. Go to Dashboard
```

#### **Step 2: Get API Keys**

```
1. Dashboard > Developers > API keys
2. Copy "Publishable key" (pk_test_...)
3. Click "Reveal test key"
4. Copy "Secret key" (sk_test_...)
```

#### **Step 3: Add to .env**

```env
# .env.local or .env
STRIPE_SECRET_KEY=sk_test_51ABC...
STRIPE_PUBLISHABLE_KEY=pk_test_51ABC...
STRIPE_WEBHOOK_SECRET=whsec_...
```

#### **Step 4: Install Stripe SDK**

```bash
npm install stripe @stripe/stripe-js
```

---

### **Create Checkout API**

#### **File: app/api/checkout/route.ts**

```typescript
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(req: NextRequest) {
  try {
    const { items, discountCode } = await req.json();

    // Validate items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "No items in cart" }, { status: 400 });
    }

    // Create line items
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: `${item.name} (Size: ${item.size})`,
          images: item.image ? [item.image] : [],
          metadata: {
            productId: item.productId,
            size: item.size,
          },
        },
        unit_amount: Math.round(parseFloat(item.price) * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    // Create discounts
    let discounts = [];
    if (discountCode) {
      discounts = [{ coupon_code: discountCode }];
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      discounts,
      mode: "payment",
      success_url: `${req.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/cart`,
      metadata: {
        cartItems: JSON.stringify(items),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 },
    );
  }
}
```

---

### **Update Cart Component**

#### **File: components/merch/ShoppingCartSidebar.tsx**

```typescript
// Add checkout handler
const handleCheckout = async () => {
  try {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: cartItems,
        discountCode: appliedDiscount ? discountCode : undefined,
      }),
    });

    const data = await response.json();

    if (data.url) {
      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } else {
      // Show error
      console.error('Checkout failed:', data.error);
    }
  } catch (error) {
    console.error('Checkout error:', error);
  }
};

// Update button
<Button
  onClick={handleCheckout}
  disabled={!isInStock || isCheckingOut}
  className="w-full"
>
  {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
</Button>
```

---

### **Create Success Page**

#### **File: app/success/page.tsx**

```typescript
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (sessionId) {
      // Verify session with your backend
      fetch(`/api/verify-session?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          setValid(data.valid);
          setLoading(false);
        });
    }
  }, [sessionId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-4">Order Confirmed!</h1>
        <p className="text-xl mb-8">
          Thank you for your purchase. You'll receive a confirmation email shortly.
        </p>
        <a href="/merch" className="text-purple-600 hover:underline">
          Continue Shopping
        </a>
      </div>
    </div>
  );
}
```

---

### **Test Stripe Integration**

#### **Test Card Numbers**

```
# Successful payments
4242 4242 4242 4242 - Visa
5555 5555 5555 4444 - Mastercard
3782 822463 10005 - American Express

# Declined payments
4000 0000 0000 0002 - Card declined
4000 0000 0000 9995 - Card declined (insufficient funds)

# Authentication required
4000 0027 6000 3184 - Requires SCA
```

#### **Test Flow**

```
1. Add items to cart
2. Click "Proceed to Checkout"
3. Should redirect to Stripe Checkout
4. Enter test card: 4242 4242 4242 4242
5. Complete payment
6. Should redirect to /success
7. Verify order in Stripe Dashboard
```

---

## 3️⃣ SEO IMPLEMENTATION

### **Add Metadata to Pages**

#### **File: app/merch/page.tsx**

```typescript
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Drinkers Merch Store | Official Merchandise",
  description:
    "Shop official The Drinkers merchandise. Premium quality t-shirts, hoodies, vinyl, and more. Limited editions available.",
  keywords: [
    "The Drinkers",
    "merch",
    "merchandise",
    "t-shirt",
    "hoodie",
    "vinyl",
    "band merch",
    "Slovenia",
  ],
  authors: [{ name: "The Drinkers" }],
  openGraph: {
    title: "The Drinkers Merch Store",
    description: "Official merchandise from The Drinkers",
    url: "https://thedrinkers.si/merch",
    siteName: "The Drinkers",
    images: [
      {
        url: "/images/og-merch.jpg",
        width: 1200,
        height: 630,
        alt: "The Drinkers Merch Collection",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Drinkers Merch Store",
    description: "Official merchandise from The Drinkers",
    images: ["/images/twitter-merch.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

---

### **Add Structured Data (JSON-LD)**

#### **File: app/merch/page.tsx**

```typescript
// Add to component
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: 'The Drinkers Merch Store',
  description: 'Official merchandise store for The Drinkers band',
  url: 'https://thedrinkers.si/merch',
  image: 'https://thedrinkers.si/images/merch-store.jpg',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'Slovenia',
  },
  priceRange: '€10 - €100',
  openingHours: '24/7',
};

// In component return
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
/>
```

---

### **Product Schema**

#### **File: components/merch/MerchProductCard.tsx**

```typescript
// Add to each product card
const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.name,
  description: product.description,
  image: product.images[0],
  offers: {
    '@type': 'Offer',
    price: product.price,
    priceCurrency: 'EUR',
    availability: product.stock > 0
      ? 'https://schema.org/InStock'
      : 'https://schema.org/OutOfStock',
  },
};

// In component return
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
/>
```

---

### **Test SEO**

#### **Tools**

```
1. Google Rich Results Test
   https://search.google.com/test/rich-results

2. Schema Markup Validator
   https://validator.schema.org/

3. Google Mobile-Friendly Test
   https://search.google.com/test/mobile-friendly

4. PageSpeed Insights
   https://pagespeed.web.dev/
```

---

## 4️⃣ PERFORMANCE OPTIMIZATION

### **Image Optimization**

```typescript
// Use Next.js Image component
import Image from 'next/image';

<Image
  src={product.image}
  alt={product.name}
  width={400}
  height={400}
  loading="lazy"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  priority={index < 4} // Load first 4 images eagerly
/>
```

### **Code Splitting**

```typescript
// Lazy load heavy components
import dynamic from 'next/dynamic';

const MusicPlayer = dynamic(
  () => import('@/components/music-player/MusicPlayer'),
  {
    loading: () => <PlayerSkeleton />,
    ssr: false
  }
);
```

### **Caching**

```typescript
import { cache } from "react";

// Cache database queries
const getCachedProducts = cache(async () => {
  return await getAllProducts();
});

// Use in component
const products = await getCachedProducts();
```

### **Bundle Analysis**

```bash
# Analyze bundle size
npm install --save-dev @next/bundle-analyzer

# next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({});

# Run analysis
npm run build
ANALYZE=true npm run build
```

---

**Created:** 2026-03-25  
**Status:** Ready for Implementation  
**Estimated Time:** 11 hours total
