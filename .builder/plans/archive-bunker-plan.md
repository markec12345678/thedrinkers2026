# The Drinkers Platform - Upgrade Plan

## Executive Summary

Complete the currently incomplete features and implement missing authentication/integration layers. Four major feature areas + security enhancements across backend and frontend.

## Current State Assessment

### Existing Features ✅

- AI batch image generator (newly implemented)
- E-commerce foundation (Stripe setup)
- Tour/Music/Merch pages
- Fan club system
- Basic database structure (Drizzle ORM)
- Analytics tracking (partial)

### Incomplete Features ❌ (To Complete)

1. **Fan Art System** - upload, voting, reporting infrastructure exists but not DB-connected
2. **Forum & Discussions** - API structure exists but no database persistence
3. **Analytics & Tracking** - web vitals collected but not stored
4. **Newsletter System** - signup endpoint exists but no email sending/persistence
5. **Authentication** - Better-auth library installed but missing admin/VIP checks
6. **Integrations** - Stripe, Discord, Resend set up but incomplete

---

## Implementation Roadmap

### Phase 1: Foundation - Authentication & Authorization (Backend Priority)

**Goal:** Secure all API endpoints and establish permission model

#### 1.1 User Role System

- Extend Better-auth with role-based access control (RBAC)
- Add roles: `admin`, `vip`, `moderator`, `user`
- Create middleware for role-based API protection
- Implement VIP tier detection (from vip-membership table)

#### 1.2 API Authentication

- Add auth checks to all `/api/*` routes (currently missing)
- Critical endpoints to secure:
  - `/api/drops/create` - admin only
  - `/api/forum/categories` (create/edit) - admin only
  - `/api/fan-art/report` - authenticated users
  - `/api/users/profile/*` - owner + admin only
  - `/api/bundles/create` - admin only

#### 1.3 Admin Dashboard Enhancement

- Expand `/app/admin/page.tsx` with role-based sections
- Add tabs: Analytics, Content Moderation, User Management, Integrations
- Real-time moderation queue for reports

---

### Phase 2: Fan Art System (Full Stack)

**Goal:** Complete fan-art upload, voting, and moderation

#### 2.1 Backend - Database & API

- Create database schema for fan-art metadata:
  - `fan_art_uploads` - image metadata, user info, timestamps
  - `fan_art_votes` - like/dislike tracking with duplicate prevention
  - `fan_art_reports` - content moderation queue
- Complete API routes:
  - `POST /api/fan-art/upload` - store to cloud (Cloudinary/Supabase Storage)
  - `POST /api/fan-art/vote` - like/dislike with idempotency
  - `POST /api/fan-art/report` - create moderation report
  - `GET /api/fan-art/[id]/stats` - voting statistics
  - `PATCH /api/fan-art/[id]/moderate` - admin moderation actions

#### 2.2 Frontend - Component Improvements

- Enhance `FanArtUpload` component:
  - Progress bar for upload
  - Image preview before submission
  - Error handling with retry
  - Success notification
- Enhance `FanArtGallery` component:
  - Add voting UI with optimistic updates
  - Report button with modal
  - Filter by popularity/newest/trending
  - Lightbox/modal view with metadata

#### 2.3 Moderation System

- Admin moderation interface in dashboard
- Approve/reject/remove artwork
- Track reporter history to prevent spam
- Notify users of content decisions

---

### Phase 3: Forum & Community (Full Stack)

**Goal:** Enable community discussions with moderation

#### 3.1 Backend - Database & API

- Create schema:
  - `forum_categories` - Discussion topics
  - `forum_posts` - Thread starter posts
  - `forum_replies` - Comment/discussion posts
  - `forum_reports` - Post moderation
- Complete API routes:
  - CRUD for categories (admin)
  - Create/read/delete posts (authenticated users)
  - Create/read/delete replies
  - Report posts
  - Mark posts as pinned/archived (moderator)

#### 3.2 Frontend - Discussion Interface

- Create `/app/forum/page.tsx` - category listing
- Create `/app/forum/[categoryId]/page.tsx` - posts in category
- Create `/app/forum/[postId]/page.tsx` - thread view with replies
- Components:
  - `ForumPostCard` - display post preview
  - `ForumReplyThread` - nested comments
  - `ForumPostForm` - create/edit posts
  - `ReportPostModal` - content moderation

#### 3.3 Real-time Features (Phase 3b - Optional)

- WebSocket setup for live post counts
- Real-time reply notifications
- Live moderator queue updates

---

### Phase 4: Analytics & Tracking (Backend Priority)

**Goal:** Store and visualize user analytics

#### 4.1 Backend - Database & Persistence

- Create analytics schema:
  - `web_vitals` - store web-vitals data (LCP, FID, CLS)
  - `analytics_events` - custom event tracking
  - `user_analytics` - page views, referrers, device info
- Complete API:
  - `POST /api/analytics` - persist events to database
  - `GET /api/analytics/dashboard` - aggregated stats for admin
  - Real-time metrics endpoint for admin dashboard

#### 4.2 Frontend - Analytics Dashboard

- Enhance `/app/admin/analytics/page.tsx`:
  - Real-time visitor stats
  - Web vitals chart (LCP, FID, CLS over time)
  - Page performance metrics
  - Traffic sources visualization
  - Device/browser breakdown
- Add event tracking to:
  - AI generator usage
  - Merch clicks/views
  - Fan art uploads/votes
  - Form submissions

---

### Phase 5: Newsletter & Email System (Backend + Integration)

**Goal:** Enable email marketing and user communications

#### 5.1 Backend - Database & API

- Create schema:
  - `newsletter_subscribers` - user emails + subscription status
  - `email_campaigns` - campaign metadata and templates
  - `email_logs` - track sent/opened/clicked emails
- Complete API:
  - `POST /api/newsletter` - subscribe (with validation + duplicate check)
  - `POST /api/newsletter/unsubscribe` - unsubscribe
  - `POST /api/newsletter/send-campaign` - admin endpoint to send campaigns
  - `GET /api/newsletter/stats` - campaign performance

#### 5.2 Integration - Resend Email Service

- Implement Resend client in `/lib/email/resend.ts`
- Email templates:
  - Welcome email
  - Newsletter digest
  - New tour dates
  - VIP exclusive content
  - Password reset
- Automatic triggers:
  - Send welcome email on signup
  - Send weekly newsletter digest

#### 5.3 Frontend - Newsletter UI

- Enhance `EmailSignup` component with proper feedback
- Create admin `/app/admin/newsletter/page.tsx`:
  - Create/edit campaigns
  - Schedule sends
  - View campaign analytics
  - Subscriber list management

---

### Phase 6: Third-Party Integrations

**Goal:** Connect all external services

#### 6.1 Stripe Integration (E-commerce)

- Complete `/api/bundles/purchase` - add proper payment flow
- Complete `/api/drops/purchase` - payment + fulfillment
- Add webhooks for payment events
- Test mode vs live mode handling

#### 6.2 Discord Integration

- Expand `/api/discord/callback`:
  - Sync VIP tiers to Discord roles
  - Welcome DM to new members
  - Role assignment based on purchases
- Create bot commands for user self-service

#### 6.3 Ticketing Integration

- Replace mock data in `/api/tickets/route.ts`
- Integrate with Eventim or Ticketmaster API
- Cache ticket availability
- Link tours to ticket purchases

---

### Phase 7: Admin Dashboard (Full Stack)

**Goal:** Centralized control panel

#### 7.1 Structure

```
/app/admin/
  ├── page.tsx (overview/dashboard)
  ├── moderation/page.tsx (fan-art, forum, posts)
  ├── analytics/page.tsx (web vitals, events)
  ├── newsletter/page.tsx (campaigns, subscribers)
  ├── users/page.tsx (user management, roles)
  ├── integrations/page.tsx (status, logs)
  └── content/page.tsx (bundles, drops, tours)
```

#### 7.2 Features

- Real-time metrics cards
- Moderation queue with filters
- User search and role assignment
- Campaign scheduler
- Integration status monitoring

---

### Phase 8: Security & Performance (Cross-cutting)

**Goal:** Enterprise-grade reliability

#### 8.1 Security

- Rate limiting on all public APIs
- Input validation with Zod schemas
- CSRF protection
- Request signing for webhooks
- Error message sanitization (no stack traces in production)

#### 8.2 Performance

- Database query optimization
- Redis caching for:
  - Analytics aggregates
  - Newsletter subscriber counts
  - Moderation queue status
- Image optimization (CDN for fan art)
- API response pagination

#### 8.3 Monitoring

- Sentry integration (already installed)
- Error tracking for all API routes
- Performance monitoring
- Alert system for critical errors

---

## Priority Implementation Order

1. **Phase 1** - Foundation (Auth) - 2-3 days
2. **Phase 2** - Fan Art - 3-4 days
3. **Phase 4** - Analytics - 2 days (parallel with Phase 2)
4. **Phase 5** - Newsletter - 2-3 days
5. **Phase 3** - Forum - 4-5 days (complex)
6. **Phase 6** - Integrations - 3-4 days (in parallel with others)
7. **Phase 7** - Admin Dashboard - 2-3 days (last, uses other completions)
8. **Phase 8** - Security & Performance - Ongoing

---

## Technical Decisions

### Database Choices

- Use Drizzle ORM (already installed) for all schema definitions
- PostgreSQL via Neon (already configured)
- Create migration files for each phase

### File Storage

- Use Cloudinary or Supabase Storage for fan art images
- CDN-backed for performance

### Email Service

- Resend (already installed) - simpler than SendGrid
- Template files in `/lib/email/templates/`

### Caching

- Redis for frequently accessed data
- Browser cache headers for static content
- Vercel's built-in ISR for pages

### State Management

- Use React hooks + API calls (no Redux needed)
- Optimistic updates for votes/reports

---

## File Changes Summary

### Create New

- `lib/auth/roles.ts` - role definitions and checks
- `lib/email/resend.ts` - email service wrapper
- `lib/email/templates/` - email templates
- `lib/db/schemas/` - new database schemas
- `components/admin/ModeratorQueue.tsx`
- `components/admin/AnalyticsDashboard.tsx`
- `components/forum/` - forum components
- `app/admin/moderation/page.tsx`
- `app/admin/newsletter/page.tsx`
- `app/forum/` - forum pages

### Modify Existing

- `app/api/*` - add auth checks, database integration
- `app/admin/page.tsx` - enhance dashboard
- `components/features/FanArtGallery.tsx` - add voting UI
- `components/features/FanArtUpload.tsx` - improve upload
- `components/ui/EmailSignup.tsx` - enhance feedback

### Database

- New Drizzle schemas for all features
- Run migrations on deploy

---

## Success Criteria

✅ All incomplete APIs have database persistence  
✅ Admin can moderate fan art, forum posts  
✅ Users can subscribe to newsletter  
✅ Analytics dashboard shows real data  
✅ VIP users have proper Discord roles  
✅ All API endpoints require proper authentication  
✅ Forum enables community discussions  
✅ No TODO comments in critical paths

---

## Risks & Mitigations

| Risk                     | Mitigation                                               |
| ------------------------ | -------------------------------------------------------- |
| Database scale issues    | Use Neon scaling, add indexes, implement caching         |
| Email deliverability     | Use Resend's infrastructure, monitor bounce rates        |
| Moderation spam          | Implement rate limits, track reporter history            |
| Third-party API downtime | Add fallbacks, cache responses, queue webhooks           |
| Security vulnerabilities | Use Zod validation, enable CORS properly, sanitize input |
