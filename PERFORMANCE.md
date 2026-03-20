# 🎯 Performance Optimization Guide

## ✅ Performance Checklist

### 🖼️ Images - Next/Image with AVIF/WebP

**Status:** ⚠️ Needs Implementation

```tsx
// ✅ DO: Use Next.js Image component
import Image from 'next/image';

<Image
  src="/images/hero.jpg"
  alt="Hero"
  width={1920}
  height={1080}
  priority
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  placeholder="blur"
  quality={85}
/>

// ❌ DON'T: Use regular img tag
<img src="/images/hero.jpg" alt="Hero" />
```

**Implementation:**
- [ ] Convert all `<img>` to `<Image>`
- [ ] Add AVIF/WebP support in `next.config.js`
- [ ] Add blur placeholders
- [ ] Set proper sizes attribute
- [ ] Use `priority` for above-fold images

---

### 🔤 Fonts - next/font with Preload

**Status:** ⚠️ Needs Implementation

```tsx
// app/layout.tsx
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

// Google Fonts
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

// Local Fonts
const rockFont = localFont({
  src: './fonts/rock.woff2',
  variable: '--font-rock',
  display: 'swap',
  preload: true,
});

export default function RootLayout({ children }) {
  return (
    <html className={`${inter.variable} ${rockFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

**Implementation:**
- [ ] Move fonts to `next/font`
- [ ] Add preload
- [ ] Use font-display: swap
- [ ] Subset fonts
- [ ] Convert to WOFF2

---

### 🎬 Videos - Lazy Load + Poster Images

**Status:** ⚠️ Needs Implementation

```tsx
// components/ui/VideoPlayer.tsx
'use client';

import { useRef, useState } from 'react';

export function VideoPlayer({ src, poster, className }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <video
      ref={videoRef}
      poster={poster}
      loading="lazy"
      onLoadStart={() => setIsLoaded(false)}
      onLoadedData={() => setIsLoaded(true)}
      className={className}
      data-poster={poster}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
```

**Implementation:**
- [ ] Add lazy loading
- [ ] Add poster images
- [ ] Compress videos (H.264 + AAC)
- [ ] Use CDN for video delivery
- [ ] Add preload="metadata"

---

### 📦 Code Splitting - Dynamic Imports

**Status:** ⚠️ Needs Implementation

```tsx
// Heavy components - load on demand
import dynamic from 'next/dynamic';

// Lazy load SloveniaMap (heavy Leaflet component)
const SloveniaMap = dynamic(
  () => import('@/components/features/SloveniaMap'),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-64 bg-rock-gray" />,
  }
);

// Lazy load VideoPlayer
const VideoPlayer = dynamic(
  () => import('@/components/ui/VideoPlayer'),
  {
    loading: () => <div className="animate-pulse aspect-video" />,
  }
);
```

**Implementation:**
- [ ] Dynamic import for SloveniaMap
- [ ] Dynamic import for VideoPlayer
- [ ] Dynamic import for heavy sections
- [ ] Add loading states
- [ ] Test bundle size

---

### 💾 Caching - revalidateTag for ISR

**Status:** ⚠️ Needs Implementation

```tsx
// app/api/tour/route.ts
import { revalidateTag } from 'next/cache';

export async function GET() {
  const tourDates = await getTourDates();
  
  return Response.json(tourDates, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}

export async function PUT(request: Request) {
  // Update tour dates
  await updateTourDates(data);
  
  // Revalidate cache
  revalidateTag('tour-dates');
  
  return Response.json({ success: true });
}
```

**Implementation:**
- [ ] Add cache tags to data fetching
- [ ] Add revalidateTag to mutations
- [ ] Set proper Cache-Control headers
- [ ] Test ISR behavior

---

## 📊 Performance Targets

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| LCP (Largest Contentful Paint) | < 2.5s | - | ⚪ |
| FID (First Input Delay) | < 100ms | - | ⚪ |
| CLS (Cumulative Layout Shift) | < 0.1 | - | ⚪ |
| TBT (Total Blocking Time) | < 200ms | - | ⚪ |
| Speed Index | < 3.5s | - | ⚪ |

---

## 🔧 Optimization Scripts

### Image Optimization

```bash
# Install sharp (already installed)
npm install sharp

# Convert images to AVIF/WebP
npx next-optimize-images
```

### Font Optimization

```bash
# Install fonttools
pip install fonttools

# Subset fonts
pyftsubset font.woff2 --text-file=used-characters.txt --output-file=font-subset.woff2
```

### Bundle Analysis

```bash
# Analyze bundle size
npm install --save-dev @next/bundle-analyzer

# Add to next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

# Run analysis
ANALYZE=true npm run build
```

---

## 🎯 Quick Wins

### 1. Add Image Optimization (30 min)

```tsx
// Replace all img tags
find ./app -name "*.tsx" -exec sed -i 's/<img/<Image/g' {} \;
find ./app -name "*.tsx" -exec sed -i 's/src="/src="\n  width={800}\n  height={600}/g' {} \;
```

### 2. Add Font Preload (15 min)

```tsx
// Add to layout.tsx
const inter = Inter({ subsets: ['latin'], display: 'swap' });
```

### 3. Add Dynamic Imports (20 min)

```tsx
const SloveniaMap = dynamic(() => import('@/components/features/SloveniaMap'), { ssr: false });
```

### 4. Add Cache Headers (10 min)

```tsx
// Add to API routes
headers: { 'Cache-Control': 'public, s-maxage=3600' }
```

---

## 📈 Monitoring

### Lighthouse CI

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: treosh/lighthouse-ci-action@v11
        with:
          urls: |
            http://localhost:3000/
            http://localhost:3000/music
            http://localhost:3000/tour
          uploadArtifacts: true
          temporaryPublicStorage: true
```

### Web Vitals

```tsx
// app/analytics.tsx
'use client';

import { useReportWebVitals } from 'next/web-vitals';

export function Analytics() {
  useReportWebVitals((metric) => {
    // Send to analytics endpoint
    fetch('/api/analytics', {
      method: 'POST',
      body: JSON.stringify(metric),
    });
  });

  return null;
}
```

---

## ✅ Implementation Checklist

### Phase 1: Critical (Week 1)
- [ ] Convert images to Next/Image
- [ ] Add font optimization
- [ ] Add video lazy loading
- [ ] Add code splitting

### Phase 2: Advanced (Week 2)
- [ ] Add ISR with revalidateTag
- [ ] Add bundle analyzer
- [ ] Add Web Vitals monitoring
- [ ] Add Lighthouse CI

### Phase 3: Optimization (Week 3)
- [ ] Compress all images
- [ ] Subset fonts
- [ ] Optimize videos
- [ ] Fine-tune cache headers

---

## 🎯 Performance Budget

```json
{
  "budget": [
    {
      "resourceType": "script",
      "maximumSize": 170000
    },
    {
      "resourceType": "stylesheet",
      "maximumSize": 50000
    },
    {
      "resourceType": "image",
      "maximumSize": 150000
    },
    {
      "resourceType": "font",
      "maximumSize": 50000
    },
    {
      "resourceType": "total",
      "maximumSize": 500000
    }
  ]
}
```

---

## 📚 Resources

- **Next.js Performance**: https://nextjs.org/docs/advanced-features/measuring-performance
- **Web Vitals**: https://web.dev/vitals/
- **Image Optimization**: https://nextjs.org/docs/app/api-reference/components/image
- **Font Optimization**: https://nextjs.org/docs/app/api-reference/components/font

---

**Ready to optimize! 🚀**
