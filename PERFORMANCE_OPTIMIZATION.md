# 🚀 PERFORMANCE OPTIMIZATION GUIDE - THE DRINKERS

**Complete guide for optimizing website performance**

---

## ✅ CURRENT STATUS

**Performance Score:**待 measure with Lighthouse  
**Target:** 90+ on all metrics

---

## 🎯 OPTIMIZATION AREAS

### **1. Image Optimization** ✅

**Current:**

```
- Using Next.js Image component
- WebP format supported
- Lazy loading enabled
```

**Improvements:**

```typescript
// Use Next.js Image with optimization
import Image from 'next/image';

<Image
  src="/images/merch/tshirt.jpg"
  alt="T-Shirt"
  width={400}
  height={400}
  loading="lazy"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  priority={false} // Set true for above-fold images
  quality={75} // Optimize quality
  placeholder="blur" // Blur placeholder
  blurDataURL="data:image/jpeg;base64,..." // Low-res placeholder
/>
```

---

### **2. Code Splitting** ✅

**Current:**

```
- Next.js automatic code splitting
- Route-based splitting
```

**Improvements:**

```typescript
// Lazy load heavy components
import dynamic from 'next/dynamic';

const MusicPlayer = dynamic(
  () => import('@/components/music-player/MusicPlayer'),
  {
    loading: () => <PlayerSkeleton />,
    ssr: false // Disable SSR for client-only components
  }
);

const ARScreen = dynamic(
  () => import('@/components/ar/ARScreen'),
  {
    loading: () => <ARSkeleton />,
    ssr: false
  }
);
```

---

### **3. Caching Strategy** ✅

**Server-Side Caching:**

```typescript
// Cache database queries
import { cache } from "react";

const getCachedProducts = cache(async () => {
  const products = await getProducts({ limit: 10 });
  return products;
});

// Use in component
const products = await getCachedProducts();
```

**Client-Side Caching:**

```typescript
// React Query for data fetching
import { useQuery } from "@tanstack/react-query";

const { data, isLoading } = useQuery({
  queryKey: ["products"],
  queryFn: fetchProducts,
  staleTime: 5 * 60 * 1000, // 5 minutes
  gcTime: 10 * 60 * 1000, // 10 minutes
});
```

---

### **4. Bundle Optimization** ✅

**Analyze Bundle:**

```bash
# Install bundle analyzer
npm install --save-dev @next/bundle-analyzer

# next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({});

# Analyze
ANALYZE=true npm run build
```

**Optimization:**

```typescript
// Tree shaking - import only what you need
import { Button } from "@/components/ui/button"; // ✅ Good
import * as Components from "@/components/ui"; // ❌ Bad

// Use lighter alternatives
import { debounce } from "lodash-es"; // ✅ Tree-shakeable
import _ from "lodash"; // ❌ Full library
```

---

### **5. Font Optimization** ✅

**Current:**

```
- Using system fonts
- No custom fonts loaded
```

**If using custom fonts:**

```typescript
// next/font optimization
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Use in layout
export default function RootLayout({ children }) {
  return (
    <html className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
```

---

### **6. API Optimization** ✅

**Current:**

```
- REST API with Next.js API routes
- Database queries on each request
```

**Improvements:**

```typescript
// API Route with caching
export async function GET(request: NextRequest) {
  const cacheKey = "products:all";

  // Check cache first
  const cached = await redis.get(cacheKey);
  if (cached) {
    return NextResponse.json(JSON.parse(cached));
  }

  // Fetch from database
  const products = await getProducts();

  // Cache for 5 minutes
  await redis.setex(cacheKey, 300, JSON.stringify(products));

  return NextResponse.json(products);
}
```

---

### **7. Loading States** ✅

**Skeleton Screens:**

```typescript
// Create skeleton components
export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 h-64 rounded-lg" />
      <div className="mt-4 space-y-2">
        <div className="bg-gray-200 h-4 w-3/4 rounded" />
        <div className="bg-gray-200 h-4 w-1/2 rounded" />
      </div>
    </div>
  );
}

// Use in component
{isLoading ? (
  <ProductCardSkeleton />
) : (
  <ProductCard product={product} />
)}
```

---

### **8. Prefetching** ✅

**Next.js Link Prefetching:**

```typescript
// Automatic prefetching on hover
import Link from 'next/link';

<Link href="/merch">Merch</Link> // ✅ Prefetches on hover

// Manual prefetching
import { useRouter } from 'next/router';

const router = useRouter();

// Prefetch on mount
useEffect(() => {
  router.prefetch('/merch');
}, []);
```

---

## 📊 PERFORMANCE METRICS

### **Core Web Vitals:**

**LCP (Largest Contentful Paint):**

```
Target: < 2.5s
Current:待 measure
Improvements:
- Optimize images
- Use CDN
- Preload critical resources
```

**FID (First Input Delay):**

```
Target: < 100ms
Current:待 measure
Improvements:
- Reduce JavaScript
- Use web workers
- Code splitting
```

**CLS (Cumulative Layout Shift):**

```
Target: < 0.1
Current:待 measure
Improvements:
- Set image dimensions
- Reserve space for ads
- Load fonts properly
```

---

## 🧪 TESTING

### **Lighthouse Audit:**

```bash
# Run Lighthouse
npm install -g lighthouse
lighthouse http://localhost:3000 --view

# Or use Chrome DevTools
# 1. Open DevTools
# 2. Go to Lighthouse tab
# 3. Click "Analyze page load"
```

### **WebPageTest:**

```
1. Go to webpagetest.org
2. Enter URL: https://thedrinkers.si
3. Choose test location
4. Run test
5. Review results
```

---

## ✅ PERFORMANCE CHECKLIST

### **Images:**

```
✅ Use Next.js Image component
✅ Convert to WebP/AVIF
✅ Lazy load below-fold images
✅ Set proper dimensions
✅ Use blur placeholders
✅ Optimize quality (75-85%)
```

### **Code:**

```
✅ Code splitting
✅ Tree shaking
✅ Remove unused dependencies
✅ Minimize bundle size
✅ Use lighter alternatives
```

### **Caching:**

```
✅ Server-side caching
✅ Client-side caching
✅ CDN for static assets
✅ Database query caching
✅ API response caching
```

### **Loading:**

```
✅ Skeleton screens
✅ Loading states
✅ Progressive enhancement
✅ Optimistic updates
✅ Prefetching
```

---

## 🚀 QUICK WINS

### **1. Enable Compression**

```typescript
// next.config.js
module.exports = {
  compress: true,
};
```

### **2. Add HTTP/2**

```
✅ Vercel supports HTTP/2 by default
✅ No configuration needed
```

### **3. Use CDN**

```
✅ Vercel Edge Network (automatic)
✅ Global CDN
✅ Automatic caching
```

### **4. Optimize CSS**

```typescript
// PurgeCSS (automatic in Next.js)
// Tailwind CSS automatically purges unused styles
```

---

## 📈 MONITORING

### **Vercel Analytics:**

```typescript
// Already configured in app/PlausibleAnalytics.tsx
// View analytics at vercel.com
```

### **Custom Metrics:**

```typescript
// Report Web Vitals
export function reportWebVitals(metric) {
  console.log(metric);
  // Send to analytics service
}
```

---

## ✅ NEXT STEPS

1. ✅ Run Lighthouse audit
2. ✅ Optimize images (convert to WebP)
3. ✅ Implement lazy loading
4. ✅ Add skeleton screens
5. ✅ Enable caching
6. ✅ Monitor performance
7. ✅ Regular audits

---

**Performance optimization pripravljena!** 🚀

**Status:** Guide complete, ready to implement  
**Impact:** Faster load times, better UX, higher SEO rankings
