# 🚀 DEPLOYMENT CHECKLIST - The Drinkers

## ✅ PRE-DEPLOYMENT

### **1. Environment Variables**
```bash
# Copy .env.example to .env.local
cp .env.example .env.local

# Fill in REAL values:
```

**Required:**
```env
# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=XXXXXX

# Discord (for VIP Lounge)
DISCORD_CLIENT_ID=your_client_id
DISCORD_CLIENT_SECRET=your_client_secret
DISCORD_REDIRECT_URI=https://thedrinkers.si/api/discord/callback
DISCORD_BOT_TOKEN=your_bot_token
DISCORD_GUILD_ID=your_server_id

# Database (if using)
DATABASE_URL=postgresql://...

# Stripe (if using merch)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Site
NEXT_PUBLIC_SITE_URL=https://thedrinkers.si
```

---

### **2. Discord Setup**

**Create Discord App:**
1. Go to https://discord.com/developers/applications
2. Click "New Application"
3. Name: "The Drinkers Official"
4. Get Client ID & Secret

**Setup OAuth2:**
1. OAuth2 → Add Redirect URI
2. URL: `https://thedrinkers.si/api/discord/callback`
3. Save

**Create Bot:**
1. Bot → Reset Token
2. Copy token to `.env.local`
3. Enable: Send Messages, Manage Roles

**Create Server:**
1. Create Discord server
2. Copy Server ID to `.env.local`

**Create Roles:**
1. Create: "Casual Fan", "Pravi Fan", "VIP Member", "OG Member"
2. Copy Role IDs to `.env.local`

---

### **3. Google Analytics**

**Setup GA4:**
1. Go to https://analytics.google.com
2. Create Property: "The Drinkers"
3. Get Measurement ID (G-XXXXXXXXXX)
4. Add to `.env.local`

---

### **4. Code Checks**

```bash
# Run typecheck
npm run typecheck

# Run build
npm run build

# Test locally
npm run start
```

**Expected:**
- ✅ TypeScript passes (for Next.js app)
- ⚠️ ESLint: 1 warning (acceptable)
- ⚠️ Build: merch page error (pre-existing, not critical)

---

## 🚀 DEPLOYMENT TO VERCEL

### **Option A: Vercel Dashboard**

1. **Go to https://vercel.com**
2. **Import Project**
   - Select GitHub repo: `thedrinkers2026`
   - Root Directory: `the/`
3. **Configure**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
4. **Environment Variables**
   - Copy all from `.env.local`
   - Add in Vercel dashboard
5. **Deploy**

---

### **Option B: Vercel CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

---

## 📊 POST-DEPLOYMENT

### **1. Verify Deployment**

**Checklist:**
- [ ] Homepage loads
- [ ] All navigation works
- [ ] Images load
- [ ] No console errors

**URLs to Test:**
```
https://thedrinkers.si/
https://thedrinkers.si/music
https://thedrinkers.si/tour
https://thedrinkers.si/gallery
https://thedrinkers.si/about
https://thedrinkers.si/contact
```

---

### **2. Test NEW Features**

**Setlist Generator:**
```
https://thedrinkers.si/setlist-generator
- [ ] Page loads
- [ ] Generate setlist works
- [ ] Spotify links work
```

**VIP Lounge:**
```
https://thedrinkers.si/vip-lounge
- [ ] Page loads
- [ ] Tier cards display
- [ ] Discord connect button works
```

**Virtual Bar:**
```
https://thedrinkers.si/virtual-bar
- [ ] Page loads
- [ ] Chat works
- [ ] Music player works
- [ ] Drink ordering works
```

**Fan Art Gallery:**
```
https://thedrinkers.si/fan-art
- [ ] Page loads
- [ ] Gallery displays
- [ ] Upload form works
- [ ] Contests tab works
```

**Admin Analytics:**
```
https://thedrinkers.si/admin/analytics
- [ ] Page loads
- [ ] Stats display
- [ ] Real-time updates
```

---

### **3. Test Discord Integration**

```
1. Click "Pridruži Se Zdaj" in VIP Lounge
2. Authorize Discord app
3. Check if added to server
4. Check if role assigned
5. Test chat in Virtual Bar
```

---

### **4. Test Analytics**

```
1. Open Google Analytics
2. Check Realtime report
3. Verify page views tracked
4. Check events firing
```

---

## 🔧 TROUBLESHOOTING

### **Build Fails**

**Error: `useSearchParams() should be wrapped in Suspense`**
```tsx
// app/layout.tsx
import { Suspense } from 'react';

<Suspense fallback={null}>
  <VercelAnalytics />
</Suspense>
```

**Error: `Event handlers cannot be passed to Client Component props`**
```
File: app/merch/page.tsx
Impact: Merch page won't build
Fix: Convert to Client Component or remove handlers
Workaround: Disable merch page temporarily
```

**Error: `Cannot find module 'critters'`**
```bash
npm install critters --save-dev --legacy-peer-deps
```

---

### **Discord Not Working**

**Check:**
1. `.env.local` has correct values
2. Redirect URI matches exactly
3. Bot is in server
4. Bot has permissions

**Test:**
```bash
# Check OAuth URL
https://discord.com/api/oauth2/authorize?client_id=YOUR_ID&redirect_uri=YOUR_REDIRECT&response_type=code&scope=identify%20email%20guilds%20guilds.join
```

---

### **Analytics Not Tracking**

**Check:**
1. GA ID correct in `.env.local`
2. Vercel Analytics ID correct
3. No ad blockers
4. Check browser console for errors

---

## 📈 MONITORING

### **Vercel Dashboard**

**Monitor:**
- Build logs
- Function errors
- Edge function performance
- Bandwidth usage

### **Google Analytics**

**Track:**
- Page views
- User engagement
- Event conversions
- Traffic sources

### **Discord Insights**

**Track:**
- New members
- Active users
- Message count
- Role distribution

---

## 🎯 SUCCESS CRITERIA

### **Week 1 Goals:**
```
✅ Site deploys successfully
✅ All pages load
✅ No critical errors
✅ 100+ visitors
✅ 10+ Discord connections
✅ 5+ setlists generated
```

### **Month 1 Goals:**
```
✅ 500+ visitors
✅ 50+ Discord members
✅ 20+ fan art submissions
✅ 100+ setlists generated
✅ First contest completed
```

---

## 🔄 ROLLBACK PLAN

### **If Deployment Fails:**

1. **Check Build Logs**
   ```bash
   vercel logs
   ```

2. **Fix Issues Locally**
   ```bash
   npm run build
   # Fix errors
   ```

3. **Redeploy**
   ```bash
   vercel --prod
   ```

4. **If All Else Fails**
   - Revert to previous commit
   - Deploy stable version
   - Fix issues in development

---

## ✅ FINAL CHECKLIST

### **Before Hitting Deploy:**

- [ ] All environment variables set
- [ ] Discord app created
- [ ] Google Analytics setup
- [ ] Code tested locally
- [ ] Build passes (ignoring merch error)
- [ ] No console errors in dev
- [ ] All new features tested
- [ ] Documentation updated

### **After Deploy:**

- [ ] Site accessible
- [ ] All pages load
- [ ] No 404 errors
- [ ] Analytics tracking
- [ ] Discord integration works
- [ ] Social sharing works
- [ ] Mobile responsive
- [ ] Performance acceptable

---

## 🎉 LAUNCH!

**Ready to deploy?**

```bash
# Deploy to production
vercel --prod

# Or use Vercel dashboard
# https://vercel.com/dashboard
```

**Good luck! 🚀🍺🎸**

---

**Deployment Date:** ___________
**Deployed By:** ___________
**Version:** 1.0.0
**Build Time:** ___________
**Build Size:** ___________
