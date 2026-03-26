# 🚀 QUICK START - PENDING TASKS

**Quick reference for completing pending tasks**

---

## ⏳ TASK 5: TEST ADD TO CART

### **Quick Test (5 min)**

```bash
# 1. Start server
npm run dev

# 2. Open browser
http://localhost:3000/merch

# 3. Test flow
1. Click product
2. Select size
3. Click "Add to Cart"
4. Verify cart opens
5. Add another product
6. Verify both in cart
7. Change quantity
8. Remove item
```

### **Expected Results**

```
✅ Cart slides from right
✅ Products show in cart
✅ Quantity +/- works
✅ Remove works
✅ Total calculates correctly
```

---

## ⏳ TASK 6: STRIPE INTEGRATION

### **Quick Setup (15 min)**

```bash
# 1. Install
npm install stripe @stripe/stripe-js

# 2. Get keys from https://stripe.com
# 3. Add to .env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...

# 4. Create API route
touch app/api/checkout/route.ts

# 5. Copy code from TESTING_OPTIMIZATION_GUIDE.md
```

### **Test Payment**

```
Use test card: 4242 4242 4242 4242
Any future date
Any CVC
```

---

## ⏳ TASK 7: TEST MOBILE

### **Quick Test (10 min)**

```bash
# 1. Open DevTools (F12)
# 2. Toggle device (Ctrl+Shift+M)
# 3. Test on:
   - iPhone 12 Pro
   - Samsung Galaxy S20
   - iPad Pro

# 4. Check:
   - Product grid (1 column mobile, 2 tablet)
   - Cart sidebar (full width mobile)
   - Buttons tappable
   - No horizontal scroll
```

---

## ⏳ TASK 8: TEST DARK MODE

### **Quick Test (5 min)**

```bash
# 1. Find theme toggle in app
# 2. Click to switch
# 3. Check all pages:
   - /merch
   - /tour
   - /vip

# 4. Verify:
   - Text readable
   - Images visible
   - Buttons work
   - Theme persists
```

---

## ⏳ TASK 9: SEO

### **Quick Implementation (20 min)**

```typescript
// 1. Add to app/merch/page.tsx
export const metadata: Metadata = {
  title: 'The Drinkers Merch Store',
  description: 'Official merchandise',
  openGraph: {
    title: 'The Drinkers Merch',
    images: ['/images/og-merch.jpg'],
  },
};

// 2. Add structured data
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Store',
      name: 'The Drinkers Merch',
    }),
  }}
/>

// 3. Test
https://search.google.com/test/rich-results
```

---

## ⏳ TASK 10: PERFORMANCE

### **Quick Wins (30 min)**

```typescript
// 1. Optimize images
import Image from 'next/image';
<Image loading="lazy" />

// 2. Lazy load heavy components
import dynamic from 'next/dynamic';
const MusicPlayer = dynamic(() => import(...), { ssr: false });

// 3. Cache queries
import { cache } from 'react';
const getCached = cache(async () => {...});

// 4. Analyze bundle
ANALYZE=true npm run build
```

---

## 📊 TIME ESTIMATES

| Task            | Quick      | Thorough     |
| --------------- | ---------- | ------------ |
| **Add to Cart** | 5 min      | 30 min       |
| **Stripe**      | 15 min     | 3 hours      |
| **Mobile**      | 10 min     | 2 hours      |
| **Dark Mode**   | 5 min      | 1 hour       |
| **SEO**         | 20 min     | 2 hours      |
| **Performance** | 30 min     | 4 hours      |
| **TOTAL**       | **85 min** | **11 hours** |

---

## ✅ MINIMUM VIABLE TESTING

**If you only have 1 hour:**

```
1. Test add to cart (5 min) ✅
2. Test mobile on iPhone (10 min) ✅
3. Test dark mode toggle (5 min) ✅
4. Add basic SEO metadata (20 min) ✅
5. Lazy load MusicPlayer (10 min) ✅
6. Start Stripe setup (10 min) ⏳
```

**Total: 60 minutes - Core functionality tested**

---

## 🎯 NEXT STEPS AFTER TESTING

1. **Fix any bugs found**
2. **Complete Stripe integration**
3. **Deploy to staging**
4. **User acceptance testing**
5. **Deploy to production**

---

**Ready to start? Pick one task and go!** 🚀
