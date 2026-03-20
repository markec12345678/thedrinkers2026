# ✅ Deployment Checklist - The Drinkers Website

## Pre-Deployment

- [ ] Git installed (`git --version`)
- [ ] GitHub account created
- [ ] Vercel account created
- [ ] All code changes committed
- [ ] `.env.local` NOT committed (check `.gitignore`)
- [ ] Build passes locally (`npm run build`)
- [ ] All tests pass (`npm run typecheck`)

---

## Deploy to GitHub

### Option 1: Using GitHub CLI (Recommended)

```bash
# Install GitHub CLI first: https://cli.github.com/
gh auth login
gh repo create the-drinkers-site --public --push
```

### Option 2: Manual Setup

```bash
# 1. Initialize Git
git init
git branch -M main

# 2. Create repository on GitHub
# Go to: https://github.com/new
# Repository name: the-drinkers-site
# Make it Public

# 3. Connect and push
git remote add origin https://github.com/YOUR_USERNAME/the-drinkers-site.git
git add .
git commit -m "Initial commit - The Drinkers website"
git push -u origin main
```

### Verify on GitHub

- [ ] Repository created
- [ ] All files uploaded
- [ ] No sensitive data committed
- [ ] README.md displays correctly

---

## Deploy to Vercel

### Via Vercel Dashboard (Easiest)

1. **Go to Vercel**
   - URL: https://vercel.com/new
   - Login with GitHub

2. **Import Project**
   - Click "Import Git Repository"
   - Select `the-drinkers-site`
   - Click "Import"

3. **Configure Build**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. **Add Environment Variables**
   ```
   NEXT_PUBLIC_SITE_URL = https://thedrinkers.si
   NEXT_PUBLIC_SITE_NAME = The Drinkers
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Site is live! 🎉

### Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd f:\thedrinkers\the
vercel --prod
```

---

## Post-Deployment

### Verify Site

- [ ] Homepage loads (https://your-site.vercel.app)
- [ ] All pages work:
  - [ ] `/music`
  - [ ] `/tour`
  - [ ] `/about`
  - [ ] `/gallery`
  - [ ] `/merch`
  - [ ] `/contact`
- [ ] Images display correctly
- [ ] Mobile responsive
- [ ] No console errors

### Run Performance Audit

```bash
# Open Chrome DevTools on your site
# Go to Lighthouse tab
# Run audit
# Target: 90+ on all metrics
```

### Set Up Custom Domain (Optional)

1. **In Vercel Dashboard**
   - Project Settings → Domains
   - Add: `thedrinkers.si`

2. **Update DNS at Registrar**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   ```

3. **Wait for Propagation**
   - Can take up to 48 hours
   - Usually completes in 1-2 hours

### Enable Analytics

1. **Vercel Analytics**
   - Project Settings → Analytics
   - Enable Web Analytics
   - Enable Speed Insights

2. **Add Analytics ID to Environment**
   ```
   NEXT_PUBLIC_VERCEL_ANALYTICS_ID = <your-id>
   ```

---

## Continuous Deployment

### Automatic Deploys on Push

Every push to `main` branch will auto-deploy:

```bash
# Make changes
git add .
git commit -m "Update tour dates"
git push origin main

# Vercel will automatically deploy!
```

### Preview Deployments

Pull requests create preview URLs:
- Every PR gets a unique preview URL
- Share with team for review
- Auto-destroyed when PR closes

---

## Environment Variables on Vercel

Add these in **Project Settings → Environment Variables**:

| Variable | Value | Environments |
|----------|-------|--------------|
| `NEXT_PUBLIC_SITE_URL` | `https://thedrinkers.si` | ✅ Production ✅ Preview ✅ Development |
| `NEXT_PUBLIC_VERCEL_ANALYTICS_ID` | Your ID | ✅ Production |
| `NEXT_PUBLIC_SPOTIFY_URL` | Spotify URL | All |
| `NEXT_PUBLIC_YOUTUBE_URL` | YouTube URL | All |
| `NEXT_PUBLIC_INSTAGRAM_URL` | Instagram URL | All |

**Important:** Redeploy after adding environment variables.

---

## Troubleshooting

### Build Fails

**Check:**
1. Build logs in Vercel dashboard
2. Run `npm run build` locally
3. Fix TypeScript errors
4. Push again

### Site Shows 404

**Solutions:**
1. Check that all pages are in `app/` directory
2. Verify build completed successfully
3. Clear browser cache

### Styles Not Loading

**Check:**
1. Tailwind config exists
2. `globals.css` has Tailwind directives
3. Build completed without errors

---

## Success Criteria

✅ **Site is successfully deployed when:**

- [ ] Site loads at Vercel URL
- [ ] All 13 routes work
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Performance score 90+
- [ ] Analytics tracking
- [ ] Custom domain works (if configured)

---

## Useful Commands

```bash
# Local development
npm run dev          # Start dev server

# Build & test
npm run build        # Production build
npm run typecheck    # TypeScript check
npm run lint         # ESLint check

# Vercel CLI
vercel               # Deploy to preview
vercel --prod        # Deploy to production
vercel ls            # List deployments
vercel --help        # Show all commands
```

---

## Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **Vercel CLI**: https://vercel.com/docs/cli
- **GitHub + Vercel**: https://vercel.com/docs/concepts/git

---

## Need Help?

1. Check `DEPLOYMENT.md` for detailed guide
2. Check `README.md` for project info
3. Vercel Support: https://vercel.com/support

---

**Ready? Let's deploy! 🚀🎸**
