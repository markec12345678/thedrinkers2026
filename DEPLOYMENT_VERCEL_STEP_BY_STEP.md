# 🚀 THE DRINKERS - VERCEL DEPLOYMENT CHECKLIST

## ✅ PRE-DEPLOYMENT CHECKLIST

### **1. Code Status**
- [x] All code committed to GitHub
- [x] No critical errors in code
- [x] Build passes (`npm run build`)
- [x] TypeScript compiles successfully
- [x] ESLint warnings are minor (alt-text, button href)

### **2. Files Ready**
- [x] `package.json` configured
- [x] `next.config.js` optimized
- [x] `tsconfig.json` valid
- [x] `.env.example` created
- [x] `.gitignore` configured
- [x] `README.md` with instructions

### **3. Content Ready**
- [x] Real band biography
- [x] Real discography (7 albums)
- [x] Real band members (5 members)
- [x] Real tour dates (6 venues)
- [x] Real contact information
- [x] Social media links added

### **4. Features Ready**
- [x] E-commerce (Stripe integration)
- [x] VIP Lounge (Discord OAuth)
- [x] Fan Art Gallery
- [x] AI Setlist Generator
- [x] Virtual Bar
- [x] AR Experience
- [x] Analytics tracking

---

## 🔧 DEPLOYMENT STEPS

### **STEP 1: Connect to Vercel**

**Option A: Vercel Dashboard**
```
1. Go to https://vercel.com/new
2. Click "Import Project"
3. Select GitHub
4. Find repository: markec12345678/thedrinkers2026
5. Click "Import"
```

**Option B: Vercel CLI**
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

---

### **STEP 2: Configure Build Settings**

**Vercel will auto-detect Next.js. Verify these settings:**

```
Framework Preset: Next.js
Root Directory: ./
Build Command: npm run build
Output Directory: .next (Default)
Install Command: npm install
```

---

### **STEP 3: Environment Variables**

**Add these in Vercel Dashboard → Settings → Environment Variables:**

```bash
# Production (Production)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
PRINTFUL_API_KEY=...
DISCORD_CLIENT_ID=...
DISCORD_CLIENT_SECRET=...
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Preview (Preview & Production)
NEXT_PUBLIC_SITE_URL=https://thedrinkers2026.vercel.app

# Development (All environments)
NODE_ENV=development
```

**⚠️ IMPORTANT:**
- Use `_live` keys for production Stripe
- Use `_test` keys for testing
- Never commit real keys to GitHub!

---

### **STEP 4: Deploy!**

**In Vercel Dashboard:**
```
1. Click "Deploy" button
2. Wait for build to complete (~2-5 minutes)
3. Watch build logs for errors
4. Once complete, you'll see "Congratulations!"
5. Click "Open" to view your site
```

**Expected Build Output:**
```
✓ Compiled successfully
✓ Generating static pages (15/15)
✓ Finalizing page optimization
✓ Build completed in 2m 34s
```

---

### **STEP 5: Post-Deployment Testing**

**Visit your production URL:**
```
https://thedrinkers2026.vercel.app
```

**Test Checklist:**
```
[ ] Homepage loads
[ ] Navigation works
[ ] All pages render
[ ] Images load properly
[ ] No console errors
[ ] Mobile responsive
[ ] Forms submit
[ ] Analytics tracking
```

**Open Chrome DevTools (F12) and check:**
```
[ ] No red errors in Console
[ ] Network tab shows 200 status codes
[ ] Lighthouse score 90+
```

---

## 🔗 CUSTOM DOMAIN SETUP

### **STEP 6: Connect Domain**

**In Vercel Dashboard → Project Settings → Domains:**

```
1. Click "Add Domain"
2. Enter: thedrinkers.si
3. Click "Add"
4. Vercel will show DNS records to add
```

**DNS Records to Add (at your domain registrar):**

```
Type    Name    Value                       TTL
A       @       76.76.21.21                 Auto
CNAME   www     cname.vercel-dns.com        Auto
```

**Wait for DNS propagation:**
- Can take 5 minutes to 48 hours
- Usually completes within 1 hour
- Check status at: https://dnschecker.org/

**Once verified, you'll see:**
```
✅ thedrinkers.si (Active)
✅ www.thedrinkers.si (Active)
```

---

## 🔒 SSL CERTIFICATE

**Vercel automatically provisions SSL:**
- ✅ Free SSL certificate
- ✅ Auto-renewal
- ✅ HTTPS enforced
- ✅ No configuration needed

**Your site will be available at:**
```
✅ https://thedrinkers.si
✅ https://www.thedrinkers.si
✅ https://thedrinkers2026.vercel.app
```

---

## 📊 ANALYTICS SETUP

### **Enable Vercel Analytics:**

**In Vercel Dashboard → Project Settings → Analytics:**
```
1. Click "Enable Vercel Analytics"
2. Accept terms
3. Analytics will start tracking immediately
```

**Add Google Analytics:**

**In `.env.local`:**
```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**Already configured in `app/layout.tsx`:**
```tsx
<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
```

---

## 🧪 TESTING WORKFLOW

### **Local Testing:**
```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open http://localhost:3000
# 4. Test all features

# 5. Build for production
npm run build

# 6. Test production build
npm run start
```

### **Preview Deployment:**
```bash
# Every push to GitHub creates a preview
git push

# Vercel will create preview URL:
# https://thedrinkers2026-git-main-username.vercel.app

# Check preview, then merge to main for production
```

### **Production Testing:**
```
1. Open production URL
2. Test on desktop
3. Test on mobile
4. Test on tablet
5. Test all browsers (Chrome, Firefox, Safari)
6. Run Lighthouse audit
7. Check Core Web Vitals
```

---

## 🚨 TROUBLESHOOTING

### **Build Fails:**

**Error: `npm run build` fails**
```bash
# Check build logs in Vercel
# Common issues:
- TypeScript errors → Fix type issues
- Missing env vars → Add in Vercel settings
- Memory issues → Upgrade Vercel plan
```

**Solution:**
```bash
# Test build locally first
npm run build

# If it fails locally, it will fail on Vercel
# Fix errors locally, then push again
```

---

### **Environment Variables Missing:**

**Error: `STRIPE_SECRET_KEY is not defined`**
```
1. Go to Vercel Dashboard → Project Settings
2. Click "Environment Variables"
3. Add missing variable
4. Redeploy
```

---

### **Domain Not Working:**

**Issue: Domain shows "Configuring"**
```
1. Wait 15-60 minutes for DNS propagation
2. Check DNS records are correct
3. Clear browser cache
4. Try incognito mode
```

**Still not working after 24 hours:**
```
1. Contact domain registrar
2. Verify DNS records
3. Contact Vercel support
```

---

## 📈 POST-DEPLOYMENT MONITORING

### **Vercel Dashboard:**
```
- Real-time analytics
- Build history
- Error tracking
- Performance metrics
```

### **Vercel Analytics:**
```
- Page views
- Unique visitors
- Bounce rate
- Session duration
- Top pages
```

### **Google Analytics:**
```
- User demographics
- Traffic sources
- User behavior
- Conversion tracking
```

### **Web Vitals:**
```
- LCP (Largest Contentful Paint)
- FID (First Input Delay)
- CLS (Cumulative Layout Shift)
- TTFB (Time to First Byte)
```

---

## 🎉 LAUNCH CHECKLIST

### **Pre-Launch:**
- [ ] All tests passing
- [ ] No console errors
- [ ] Lighthouse score 90+
- [ ] Mobile responsive
- [ ] All links working
- [ ] Forms submitting
- [ ] Analytics tracking
- [ ] SSL certificate active

### **Launch Day:**
- [ ] Deploy to production
- [ ] Connect custom domain
- [ ] Test production URL
- [ ] Enable analytics
- [ ] Monitor build logs
- [ ] Check all features
- [ ] Social media announcement

### **Post-Launch:**
- [ ] Monitor analytics
- [ ] Check error logs
- [ ] Respond to user feedback
- [ ] Fix any bugs
- [ ] Plan next features
- [ ] Celebrate! 🍺🤘

---

## 🎯 SUCCESS METRICS

### **Week 1 Goals:**
```
✅ 1,000+ page views
✅ 500+ unique visitors
✅ < 2s average load time
✅ > 60% mobile traffic
✅ < 40% bounce rate
```

### **Month 1 Goals:**
```
✅ 10,000+ page views
✅ 5,000+ unique visitors
✅ 100+ VIP signups
✅ 50+ merchandise sales
✅ 200+ concert ticket sales
```

---

## 📞 SUPPORT RESOURCES

### **Vercel Documentation:**
- https://vercel.com/docs
- https://vercel.com/docs/concepts/next.js
- https://vercel.com/docs/concepts/projects

### **Next.js Documentation:**
- https://nextjs.org/docs
- https://nextjs.org/docs/deployment

### **Community:**
- Vercel Discord: https://vercel.com/discord
- Next.js GitHub: https://github.com/vercel/next.js
- Stack Overflow: Tag `vercel` + `nextjs`

---

## 🚀 QUICK DEPLOY COMMANDS

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View deployments
vercel ls

# View logs
vercel logs

# Open dashboard
vercel open
```

---

## 🎸 DEPLOYMENT SUMMARY

**Repository:** `markec12345678/thedrinkers2026`  
**Platform:** Vercel  
**Framework:** Next.js 15  
**Domain:** `thedrinkers.si` (pending)  
**Status:** Ready to deploy ✅

---

**DEPLOYMENT TIME ESTIMATE:** 30-45 minutes  
**DIFFICULTY:** Easy ⭐⭐⭐⭐⭐

---

**LET'S DEPLOY THIS ROCK! 🤘🚀**
