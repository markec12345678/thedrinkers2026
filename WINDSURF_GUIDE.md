# 🌊 Windsurf AI Development Guide

## 🎯 NASLEDNJI KORAKI ZA TEBE:

### 1. Kopiraj ta prompt v Windsurf AI chat:

```
I'm building The Drinkers band website with Next.js 15. 
Current setup:
- ✅ TypeScript configured
- ✅ Tailwind CSS v4
- ✅ Framer Motion for animations
- ✅ All types defined in lib/types.ts
- ✅ Mock data in lib/constants.ts

Please help me build components in this order:
1. Hero section with video background
2. MusicGrid component for albums
3. TourCalendar with interactive map
4. Gallery with lightbox
5. Merch carousel
6. Contact form with validation

Use the existing design system from tailwind.config.ts
Follow the component patterns already established.
```

---

### 2. Ustvari mapo strukturo na svojem sistemu:

```bash
# Create project folder
mkdir F:\AI\the-drinkers-site
cd F:\AI\the-drinkers-site

# Copy existing project files
xcopy /E /I /Y F:\thedrinkers\the\* F:\AI\the-drinkers-site\

# Or clone from Git (recommended)
git clone https://github.com/YOUR_USERNAME/the-drinkers-site.git
cd the-drinkers-site
```

---

### 3. Namesti dependencies:

```bash
# Install all dependencies
npm install

# Verify installation
npm run build

# Should see: ✓ Compiled successfully
```

---

### 4. Začni z razvojem v Windsurfu:

```bash
# Start development server
npm run dev

# Open Windsurf AI
# Use these commands:
```

---

## 💡 Windsurf AI Komande

### 🏗️ Building Components

```
/create component Hero with video background
/create component MusicGrid showing albums
/create component TourCalendar with map
/create component Gallery with lightbox
/create component MerchCarousel
/create component ContactForm with validation
```

### 🔧 Fixing & Optimizing

```
/fix Hero video not loading
/optimize Gallery images for performance
/refactor TourCalendar to use dynamic imports
/simplify ContactForm validation logic
/add TypeScript types to MusicGrid
```

### 🧪 Testing

```
/test Hero component
/test Gallery lightbox functionality
/test ContactForm submission
/add unit tests for utils.ts
/run lighthouse audit
```

### 📚 Documentation

```
/doc Hero component
/add JSDoc comments to utils.ts
/generate README section for components
/create changelog entry
```

### 🚀 Deployment

```
/deploy to production
/build:analyze bundle size
/optimize for Core Web Vitals
/add service worker
```

---

## 📋 Development Workflow

### Step 1: Plan with AI

```
I need to build a [component name] that:
- Does [functionality]
- Looks like [design description]
- Integrates with [existing code]

Please create a plan first.
```

### Step 2: Generate Code

```
Now implement the component following the plan.
Use TypeScript and Tailwind CSS.
Follow the existing code style.
```

### Step 3: Review & Refine

```
/optimize this for performance
/add error handling
/improve accessibility
/add responsive design
```

### Step 4: Test

```
/test this component
/add edge cases
/run typecheck
```

---

## 🎯 Component Priority

### Phase 1: Core (Day 1-2)

1. **Hero Section**
   ```
   /create component Hero with:
   - Full-screen video background
   - Animated text overlay
   - CTA buttons (Poslušaj, Vstopnice)
   - Social media links
   - Scroll indicator
   ```

2. **Navigation**
   ```
   /create component Header with:
   - Logo
   - Desktop menu
   - Mobile hamburger menu
   - Sticky on scroll
   ```

### Phase 2: Content (Day 3-4)

3. **Music Section**
   ```
   /create component MusicGrid:
   - Latest album featured
   - Track list
   - Streaming links (Spotify, YouTube)
   - Vinyl/CD images
   ```

4. **Tour Section**
   ```
   /create component TourCalendar:
   - List of tour dates
   - Venue info
   - Ticket links
   - Sold out badges
   - Interactive map (lazy loaded)
   ```

### Phase 3: Engagement (Day 5-6)

5. **Gallery**
   ```
   /create component GalleryGrid:
   - Masonry layout
   - Lightbox on click
   - Categories (Live, Backstage, Promo)
   - Lazy loading images
   ```

6. **Merch**
   ```
   /create component MerchCarousel:
   - Product cards
   - Size selector
   - Add to cart
   - Limited edition badges
   ```

### Phase 4: Conversion (Day 7)

7. **Contact**
   ```
   /create component ContactForm:
   - Name, email, message
   - Validation with Zod
   - Success/error states
   - Booking info
   ```

8. **Footer**
   ```
   /create component Footer:
   - Navigation links
   - Social media
   - Newsletter signup
   - Legal links
   ```

---

## 🚀 Pro Tips za Windsurf

### 1. Bodi Specifičen

```
❌ Slabo: "Make a button"
✅ Dobro: "Make a crimson button with white text, hover effect, and icon"
```

### 2. Zahtevaj Plan

```
"Before coding, create a step-by-step plan"
```

### 3. Iterativno Izboljšuj

```
"First make it work, then optimize it"
```

### 4. Uporabi Kontekst

```
"Look at the existing Button component and make it consistent"
```

### 5. Testiraj Takoj

```
"After generating, run: npm run typecheck"
```

---

## 📊 Windsurf AI Workflow

```
┌─────────────────────────────────────┐
│  1. Describe Component              │
│     "I need a hero section with..." │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  2. Review Plan                     │
│     AI creates implementation plan  │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  3. Generate Code                   │
│     AI writes component             │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  4. Review & Refine                 │
│     /optimize /fix /improve         │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  5. Test                            │
│     /test /typecheck /lint          │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  6. Commit                          │
│     git add . && git commit         │
└─────────────────────────────────────┘
```

---

## 🎸 Primer: Hero Section z Windsurfom

### Korak 1: Opiši Komponento

```
I need a Hero component for The Drinkers band website.

Requirements:
- Full-screen height (h-screen)
- Video background (use /videos/hero-loop.mp4)
- Gradient overlay (from-rock-bg via-rock-bg/50 to-transparent)
- Band name in large text (text-5xl md:text-8xl)
- Subtitle: "Rock 'n' roll iz srca Slovenije 🇸🇮"
- Two CTA buttons: "Poslušaj Novo" and "Vstopnice"
- Social media icons (Spotify, YouTube, Instagram)
- Scroll indicator at bottom
- Fade-in animations with Framer Motion

Use the existing design system from tailwind.config.ts
```

### Korak 2: AI Generira Kodo

```typescript
// AI will generate this...
'use client';

import { motion } from 'framer-motion';
import VideoPlayer from '@/components/ui/VideoPlayer';

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <VideoPlayer 
          src="/videos/hero-loop.mp4"
          poster="/images/hero-poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-rock-bg via-rock-bg/50 to-transparent" />
      </div>
      
      {/* Content */}
      {/* ... AI continues ... */}
    </section>
  );
}
```

### Korak 3: Izboljšaj

```
/optimize for mobile responsiveness
/add better loading states
/improve accessibility with ARIA labels
```

### Korak 4: Testiraj

```
/test Hero component
/run typecheck
```

---

## 🎯 Checkpoint: Ko Je Windsurf Končan

```bash
# Preveri build
npm run build

# Preveri typecheck
npm run typecheck

# Preveri lint
npm run lint

# Začni dev server
npm run dev

# Odpri browser
# http://localhost:3000

# Vse deluje? ✅
# Commitaj!
git add .
git commit -m "feat: complete initial development with Windsurf AI"
git push
```

---

## 📞 Troubleshooting Windsurf

### AI Ne Razume Konteksta?

```
"Look at the existing components in components/ui/ for reference"
```

### Koda Je Preveč Kompleksna?

```
"Simplify this. Use fewer dependencies. Keep it vanilla where possible"
```

### Build Ne Dela?

```
"Fix TypeScript errors in this file"
```

### Prepočasno?

```
/optimize this for better performance
```

---

## 🚀 Next Steps

1. **Namesti Windsurf**: https://windsurf.ai
2. **Odpri projekt**: `F:\AI\the-drinkers-site`
3. **Kopiraj prvi prompt** (zgoraj)
4. **Začni razvijati!**

---

**Srečno z razvojem! 🌊🎸**

Built with 🤘 for The Drinkers • 2026
