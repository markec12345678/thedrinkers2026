---
trigger: model_decision
-# Project Identity
- **Name:** The Drinkers Official Website
- **Domain:** thedrinkers.si
- **Type:** Professional Rock Band Website + E-commerce + AI Features
- **Grade:** A++ Production Ready
- **Language:** Slovenian (primary), English (fallback)
- **Target:** Slovenian market + International fans

# Project Vision
Najbolj napredna spletna stran za glasbeno skupino v regiji z:
- 100% skills utilization (81 skills)
- 39 AI models integration
- 60 MCP tools configured
- Complete business automation
- Community platform
// ✅ ALWAYS USE
- Next.js 15.0.0+ (App Router)
- React 19.0.0+
- TypeScript 5.3.3+ (strict mode)
- Tailwind CSS 3.4.0+
- Framer Motion 11.15.0+

// ❌ NEVER USE
- Pages Router (deprecated)
- JavaScript files (.js → .tsx only)
- Inline styles (use Tailwind)
- Class components (use functional)
// ✅ CORRECT
'use client' // Only when needed for interactivity

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { TOUR_DATES_MOCK } from '@/lib/constants'
import type { TourDate } from '@/lib/types'

// ❌ INCORRECT
import React from 'react' // Not needed in Next.js 15
import * as Motion from 'framer-motion' // Use named imports 
// ✅ CORRECT
'use client' // Only when needed for interactivity

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { TOUR_DATES_MOCK } from '@/lib/constants'
import type { TourDate } from '@/lib/types'

// ❌ INCORRECT
import React from 'react' // Not needed in Next.js 15
import * as Motion from 'framer-motion' // Use named imports
f:\thedrinkers\the\
│
├── 📁 app/                      # Next.js App Router
│   ├── layout.tsx              # Root layout (DO NOT MODIFY structure)
│   ├── page.tsx                # Homepage
│   ├── (bar)/                  # Protected routes (parentheses = route group)
│   ├── ai-setlist/             # AI features
│   ├── tour/                   # Tour dates
│   ├── music/                  # Music/albums
│   ├── merch/                  # E-commerce
│   ├── about/                  # Band info
│   ├── contact/                # Contact form
│   ├── gallery/                # Photo gallery
│   ├── api/                    # API endpoints (16 total)
│   └── [dynamic]/              # Dynamic routes
│
├── 📁 components/               # React Components (37 total)
│   ├── layout/                 # Header, Footer, MobileNav
│   ├── sections/               # Hero, TourCalendar, MusicGrid...
│   ├── features/               # AI features (11 components)
│   └── ui/                     # Reusable UI (Button, Card...)
│
├── 📁 lib/                      # Utilities
│   ├── constants.ts            # ALL band data (tour, albums, members)
│   ├── types.ts                # TypeScript interfaces
│   ├── utils.ts                # Helper functions
│   └── seo.tsx                 # SEO helpers
│
├── 📁 scripts/                  # AI Generation Scripts (38 total)
│   ├── admin-generate-ai-images.js
│   ├── generate-social-videos.ps1
│   └── [other AI automation]
│
├── 📁 public/                   # Static Assets
│   ├── images/
│   │   ├── albums/
│   │   ├── members/
│   │   ├── merch/
│   │   └── gallery/
│   ├── videos/
│   ├── favicon.ico
│   └── manifest.json
│
├── 📁 mobile/                   # React Native App
│   └── [Expo + Tailwind]
│
└── 📁 config/                   # Configurations
    ├── tailwind.config.ts
    ├── next.config.js
    └── site.config.ts
    // ✅ CORRECT
- Components: PascalCase (Hero.tsx, TourCalendar.tsx)
- Files: PascalCase for components, kebab-case for utilities
- Folders: lowercase (components, lib, public)
- Types: PascalCase with descriptive names (TourDate, Album, Member)
- Constants: UPPER_SNAKE_CASE (TOUR_DATES_MOCK, SITE_CONFIG)
- Functions: camelCase (handleClick, fetchTourDates)

// ❌ INCORRECT
- hero.tsx (lowercase component)
- Tour_Calendar.tsx (snake_case component)
- tourdates.ts (no separator)
// config/tailwind.config.ts
colors: {
  rock: {
    bg: '#0a0a0a',        // Primary black background
    surface: '#141414',   // Card/section background
    border: '#2a2a2a',    // Border color
    primary: '#dc143c',   // Crimson red (brand color)
    secondary: '#ff6b35', // Orange accent
    text: '#ffffff',      // Primary text
    muted: '#a0a0a0',     // Muted text
    silver: '#c0c0c0',    // Silver highlights
  }
}
// ✅ CORRECT
- Display Font: var(--font-rock-display) - Headlines
- Body Font: var(--font-montserrat) - Body text
- Sizes: Use Tailwind scale (text-xl, text-2xl, md:text-4xl)

// ❌ INCORRECT
- Hardcoded font-family
- Inline font-size styles
// ✅ ALWAYS USE Framer Motion
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: 'easeOut' }}
>
  Content
</motion.div>

// ✅ Standard Animation Variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

// ❌ NEVER USE
- CSS keyframes (use Framer Motion)
- Inline transition styles
- jQuery animations
// 🥇 PREMIUM MODELS (Use for key content)
- jimeng-5.0: Album covers, hero images (2K/4K)
- fal-ai/sora-2/image-to-video/pro: Concert promos (1080p)
- kapon/gemini-3-pro-image-preview: High-quality visuals
- fal-ai/nano-banana-pro: Advanced editing

// 🥈 STANDARD MODELS (Use for regular content)
- fal-ai/flux-2/flash: Social media visuals
- fal-ai/veo3.1/image-to-video: Behind the scenes
- wan/v2.6/image-to-video: Multi-angle content

// 🥉 LITE MODELS (Use for drafts/testing)
- fal-ai/bytedance/seedream/v5/lite: Quick iterations
// ✅ ALWAYS
1. Check AI balance before generation (current: 8.0 积分)
2. Use appropriate model for content type
3. Save generated content to /public/images/ai/
4. Add metadata (model, prompt, date)
5. Optimize images (WebP, max 500KB)

// ❌ NEVER
1. Generate without checking balance
2. Use premium models for drafts
3. Store unoptimized images
4. Hardcode AI content (use dynamic loading)
// ✅ Required AI Features (11 total)
1. AISetlistPredictor.tsx - Mood-based setlists
2. AIGallery.tsx - AI-generated visuals
3. FanArtGallery.tsx - Community uploads + AI enhancement
4. BeerSongGenerator.tsx - AI content creation
5. VirtualBar.tsx - Interactive experience
6. VIPLounge.tsx - Exclusive content
7. AIChatBot.tsx - Fan Q&A
8. AIImageGenerator.tsx - Fan art creation
9. AIVideoGenerator.tsx - Clip creation
10. AIPlaylistCurator.tsx - Personalized playlists
11. AIConcertRecap.tsx - Auto-generated recaps
// ✅ ALWAYS USE
import { betterAuth } from 'better-auth'

// Protected Routes
app/(bar)/page.tsx - VIP area (requires auth)
app/api/protected/* - API endpoints (requires token)

// ✅ Security Headers
Strict-Transport-Security: max-age=63072000
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Content-Security-Policy: default-src 'self'

// ❌ NEVER
- Store secrets in client code
- Hardcode API keys
- Skip input validation
- Allow unlimited API requests (use rate limiting)
// ✅ Structure
app/api/[feature]/route.ts

// ✅ Required
- Input validation (Zod)
- Rate limiting
- Error handling
- CORS configuration
- Authentication check (if protected)

// ✅ Example
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validated = schema.parse(body)
    // Process...
    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 })
  }
}
// ✅ Tables Required
- users (fan accounts, VIP members)
- tour_dates (concerts, venues, tickets)
- albums (discography)
- songs (tracklist, lyrics, metadata)
- merch_items (products, inventory)
- orders (purchases, transactions)
- fan_art (community submissions)
- analytics (tracking data)

// ✅ Use Prisma ORM
// ✅ Serverless: Neon Postgres
// ✅ Backup: Daily automated
// ✅ lib/constants.ts - SINGLE SOURCE OF TRUTH
export const TOUR_DATES_MOCK: TourDate[] = [...]
export const albums: Album[] = [...]
export const bandMembers: Member[] = [...]
export const merchItems: MerchItem[] = [...]

// ❌ NEVER
- Hardcode data in components
- Duplicate data across files
- Modify constants without backup
// ✅ app/layout.tsx
export const metadata: Metadata = {
  title: 'The Drinkers | Uradna Spletna Stran',
  description: 'Slovenian booze rock band. Est. 1993 in Litija.',
  keywords: ['rock band', 'Slovenia', 'metal', 'concerts', 'music'],
  openGraph: {
    title: 'The Drinkers',
    description: '...',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
  },
}
// ✅ Required Schemas
- MusicGroup (band info)
- Event (concerts)
- Product (merchandise)
- Person (band members)
- MusicAlbum (discography)

// ✅ Use lib/seo.tsx helpers
// ✅ Tailwind Breakpoints
sm: 640px   // Small mobile
md: 768px   // Tablet
lg: 1024px  // Laptop
xl: 1280px  // Desktop
2xl: 1536px // Large desktop

// ✅ Mobile-First Approach
className={cn('text-base', 'md:text-lg', 'lg:text-xl')}

// ❌ NEVER
- Desktop-first styling
- Fixed widths (use max-w-)
- Non-responsive images
// ✅ Core Web Vitals Targets
LCP (Largest Contentful Paint): < 2.5s
FID (First Input Delay): < 100ms
CLS (Cumulative Layout Shift): < 0.1

// ✅ Optimization
- Next/Image for all images
- Lazy loading for heavy components
- Dynamic imports for AI features
- WebP/AVIF format
- CDN for static assets
# ✅ Before Every Commit
npm run lint          # ESLint
npm run typecheck     # TypeScript
npm run build         # Production build

# ✅ Testing
npm run test          # Unit tests
npm run test:e2e      # E2E tests (Playwright)

# ✅ Performance
npm run lighthouse    # Performance audit
// ✅ Required
- TypeScript strict mode
- No 'any' types (use proper types)
- Error boundaries on all pages
- Loading states for async operations
- Accessibility (ARIA labels)

// ❌ Never Commit
- Console.logs in production
- TODO comments without tickets
- Unused imports
- Duplicated code
# ✅ Production Deploy
vercel --prod

# ✅ Environment Variables
DATABASE_URL=...
NEXTAUTH_SECRET=...
STRIPE_SECRET_KEY=...
AI_API_KEY=...

# ✅ Post-Deploy Checklist
- Test all pages
- Verify analytics
- Check API endpoints
- Test forms
- Mobile testing
# ✅ Commands
npm run build
npm run start:pm2    # Start
npm run stop:pm2     # Stop
npm run restart:pm2  # Restart
npm run logs:pm2     # View logs
// ✅ Primary Language: Slovenian
- All UI text in Slovenian
- English as fallback
- Consistent terminology

// ✅ Tone & Voice
- Rock 'n' roll attitude
- Friendly but professional
- Fan-focused
- Authentic (real band data)

// ❌ Avoid
- Corporate jargon
- Overly formal language
- Generic placeholder text
// ✅ Process
1. Update lib/constants.ts
2. Test locally
3. Commit with descriptive message
4. Deploy
5. Verify on production

// ✅ Version Control
- Feature branches (feat/new-feature)
- Descriptive commit messages
- PR review required
- Tag releases (v1.0.0, v1.1.0)
// ✅ ALWAYS
1. Follow existing patterns
2. Use established components
3. Match design system
4. Add TypeScript types
5. Include error handling
6. Test before committing

// ✅ Communication
- Comment code in English
- Content in Slovenian
- Explain complex logic
- Document API changes
// ✅ ALWAYS
1. Backup original file
2. Note changes in commit
3. Test affected features
4. Update documentation
5. Check for breaking changes

// ❌ NEVER
- Modify without understanding
- Remove features without approval
- Change API contracts
- Break existing functionality
// ✅ Vercel Analytics
import { Analytics } from '@vercel/analytics/react'
import { cn } from "../../lib/utils";

// ✅ Events to Track
- Page views
- Tour date clicks
- Merch purchases
- Newsletter signups
- VIP registrations
- AI feature usage

// ✅ Privacy
- GDPR compliant
- Cookie consent
- Anonymized data
- No personal data in analytics
// Issue: Build fails
Solution: npm run typecheck, fix TypeScript errors

// Issue: Images not loading
Solution: Check public/ folder, verify Next/Image syntax

// Issue: API returns 500
Solution: Check server logs, verify environment variables

// Issue: Auth not working
Solution: Verify Better Auth config, check tokens

// Issue: AI generation fails
Solution: Check balance, verify API key, retry with lite model
const targets = {
  traffic: 10000,      // Website visitors
  signups: 1000,       // Email subscribers
  vip: 500,           // VIP members
  merch: 5000,        // Revenue (EUR)
  tickets: 2000,      // Ticket sales
  social: 2000,       // New followers
  content: 500,       // AI-generated pieces
}
// ✅ Project Structure
Developer: [Your Contact]
Deployment: Vercel Dashboard
Database: Neon Dashboard
AI Services: MCP Console
Domain: thedrinkers.si Registrar

// ✅ Critical Files
- app/layout.tsx (DO NOT BREAK)
- lib/constants.ts (Backup before edit)
- .env.local (Never commit)
- package.json (Test after changes)
Overall Grade: A++

Standards Required:
✅ Production-ready code
✅ 100% TypeScript coverage
✅ All tests passing
✅ Lighthouse score >90
✅ No security vulnerabilities
✅ GDPR compliant
✅ Mobile responsive
✅ SEO optimized
✅ AI integrated
✅ Business ready
v1.0.0 - Initial Launch (March 2026)
v1.1.0 - AI Features Added
v1.2.0 - E-commerce Integration
v1.3.0 - VIP Bar Launch
v2.0.0 - Mobile App (Planned)
--

