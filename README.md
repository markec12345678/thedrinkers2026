# 🎸 The Drinkers - Official Website

Professional rock band website built with Next.js 15 for 2026.

![The Drinkers](/public/og-image.jpg)

## 🚀 Features

- **Modern Stack** - Next.js 15, React 19, TypeScript, Tailwind CSS
- **Responsive Design** - Mobile-first, works on all devices
- **Dark Theme** - Rock-inspired dark UI with crimson accents
- **Interactive Components** - Framer Motion animations
- **Tour Management** - Tour dates with interactive map
- **Music Catalog** - Albums, tracks, and YouTube videos
- **Merch Store** - Product showcase with variants
- **Gallery** - Photo gallery with categories
- **SEO Optimized** - Schema.org structured data
- **Performance** - Optimized images, code splitting

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 15.0.0 |
| Language | TypeScript 5.3.3 |
| Styling | Tailwind CSS 3.4.0 |
| Animations | Framer Motion 11.15.0 |
| Icons | Lucide React 0.468.0 |
| Maps | Leaflet + React Leaflet |
| Forms | React Hook Form 7.49.0 |
| Validation | Zod 3.22.0 |
| Analytics | Vercel Analytics 1.2.0 |

## 📦 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd the-drinkers-site

# 2. Install dependencies
npm install

# 3. Set up environment variables
# Option A: Run setup script (recommended for Windows)
./setup-env.ps1

# Option B: Manual setup
cp .env.example .env.local
# Generate NextAuth secret: openssl rand -base64 32
# Edit .env.local with your values

# 4. Run development server
npm run dev

# 5. Open in browser
# http://localhost:3000
```

### Build for Production

```bash
# Build optimized production bundle
npm run build

# Start production server
npm run start
```

## 📁 Project Structure

```
the-drinkers-site/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   ├── about/               # About page
│   ├── contact/             # Contact page
│   ├── gallery/             # Gallery page
│   ├── merch/               # Merchandise page
│   ├── music/               # Music page
│   └── tour/                # Tour page
├── components/
│   ├── features/            # Feature components
│   ├── layout/              # Layout components (Header, Footer)
│   ├── sections/            # Page sections
│   └── ui/                  # UI components (Button, Section)
├── lib/
│   ├── constants.ts         # Mock data and config
│   ├── types.ts             # TypeScript types
│   ├── utils.ts             # Utility functions
│   └── seo.tsx              # SEO utilities
├── styles/
│   ├── globals.css          # Global styles
│   └── animations.css       # Custom animations
└── public/                  # Static assets
    ├── images/
    ├── videos/
    └── fonts/
```

## 🎨 Design System

### Colors

```css
--rock-bg: #0a0a0a        /* Main background */
--rock-surface: #141414   /* Surface/cards */
--rock-border: #2a2a2a    /* Borders */
--rock-primary: #dc143c   /* Crimson red */
--rock-secondary: #ff6b35 /* Orange accent */
--rock-text: #ffffff      /* Text color */
--rock-muted: #a0a0a0     /* Muted text */
--rock-silver: #c0c0c0    /* Silver accent */
```

### Typography

- **Display** - Anton/Bebas Neue (headings)
- **Body** - Montserrat (content)

### Component Classes

- `.btn-primary` - Primary button (crimson)
- `.btn-secondary` - Secondary button (silver outline)
- `.section-padding` - Standard section padding
- `.glass-panel` - Frosted glass effect

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (http://localhost:3000) |
| `npm run build` | Build production bundle |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |

## 📄 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero section with video background |
| Music | `/music` | Albums, tracks, videos |
| Tour | `/tour` | Tour dates with map |
| About | `/about` | Band members, bio |
| Gallery | `/gallery` | Photo gallery |
| Merch | `/merch` | Merchandise store |
| Contact | `/contact` | Contact form, booking info |
| Bar | `/bar` | Fan club (protected) |

## 🔐 Protected Content

The `/bar` route is marked as protected in navigation. Implement authentication as needed:

```typescript
// Example: Check if user has access
if (item.protected && !user.isAuthenticated) {
  // Show login prompt
}
```

## 🌐 Environment Variables

Create `.env.local` based on `.env.example`:

```bash
# Site URL
NEXT_PUBLIC_SITE_URL=https://thedrinkers.si

# Analytics
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id

# API Keys (if needed)
SPOTIFY_CLIENT_ID=your-spotify-id
YOUTUBE_API_KEY=your-youtube-key
```

## 📱 Responsive Breakpoints

```css
/* Mobile First */
sm: 640px   /* Small devices */
md: 768px   /* Tablets */
lg: 1024px  /* Desktops */
xl: 1280px  /* Large screens */
2xl: 1536px /* Extra large */
```

## 🎯 Performance

- **Lighthouse Score**: 90+ (Target)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1

### Optimization Tips

1. Use Next.js Image component for images
2. Lazy load heavy components
3. Minimize bundle size with tree shaking
4. Use static generation where possible

## 🐛 Troubleshooting

### Build Fails

```bash
# Clear cache
rm -rf .next
npm run build

# Check TypeScript errors
npm run typecheck
```

### Styles Not Loading

```bash
# Verify Tailwind config
npx tailwindcss -i ./styles/globals.css -o ./dist/output.css

# Check PostCSS config
```

### Video Not Playing

- Ensure video is in `/public/videos/`
- Check format (MP4 recommended)
- Verify autoplay permissions (muted required)

## 📞 Support

For questions or issues:
- Email: info@thedrinkers.si
- GitHub Issues: [Create an issue](link)

## 📄 License

Copyright © 2026 The Drinkers. All rights reserved.

---

**Built with 🎸 and ☕ by The Drinkers Team**
