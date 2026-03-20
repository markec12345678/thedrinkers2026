# 🚀 Deployment Guide - The Drinkers Website

## ⚠️ IMPORTANT: Security First

**NEVER commit sensitive data:**
- ❌ API keys
- ❌ Passwords
- ❌ GitHub tokens
- ❌ Database credentials
- ❌ `.env.local` file

---

## 📋 Prerequisites

1. **Git Installed**
   - Download: https://git-scm.com/downloads
   - Verify: `git --version`

2. **GitHub Account**
   - Sign up: https://github.com/signup

3. **Vercel Account**
   - Sign up: https://vercel.com/signup

---

## 🔧 Step-by-Step Deployment

### Option A: Deploy via Vercel Dashboard (Easiest)

#### 1. Push Code to GitHub

```bash
# Navigate to project
cd f:\thedrinkers\the

# Initialize Git (if not done)
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - The Drinkers website v1.0"

# Create main branch
git branch -M main

# Add GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/the-drinkers-site.git

# Push to GitHub
git push -u origin main
```

#### 2. Deploy on Vercel

1. Go to https://vercel.com/new
2. Click **Import Git Repository**
3. Select your GitHub account
4. Find `the-drinkers-site` repository
5. Click **Import**
6. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
7. Click **Deploy**
8. Wait 2-3 minutes for build to complete
9. Your site is live! 🎉

#### 3. Add Custom Domain (Optional)

1. In Vercel Dashboard, go to **Project Settings** → **Domains**
2. Add your domain: `thedrinkers.si`
3. Update DNS records at your domain registrar:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   ```

---

### Option B: Deploy via Vercel CLI

#### 1. Install Vercel CLI

```bash
npm i -g vercel
```

#### 2. Login to Vercel

```bash
vercel login
```

Choose your login method (GitHub recommended).

#### 3. Deploy to Production

```bash
# Navigate to project
cd f:\thedrinkers\the

# Deploy
vercel --prod
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Your account
- **Link to existing project?** → No
- **Project name?** → the-drinkers-site
- **Directory?** → ./
- **Override settings?** → No

#### 4. View Your Site

After deployment completes:
```bash
vercel ls
```

You'll get a URL like: `https://the-drinkers-site.vercel.app`

---

### Option C: GitHub Actions (Automated Deploy)

#### 1. Create Workflow File

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

#### 2. Add Secrets to GitHub

1. Go to: `https://github.com/YOUR_USERNAME/the-drinkers-site/settings/secrets/actions`
2. Add these secrets:
   - `VERCEL_TOKEN` - Get from Vercel: https://vercel.com/account/tokens
   - `VERCEL_ORG_ID` - Your Vercel Org ID
   - `VERCEL_PROJECT_ID` - Your project ID from Vercel dashboard

#### 3. Push and Auto-Deploy

```bash
git add .github/workflows/deploy.yml
git commit -m "Add automated deployment workflow"
git push origin main
```

Every push to `main` will now auto-deploy! 🚀

---

## 🔐 Environment Variables on Vercel

### Set in Vercel Dashboard

1. Go to **Project Settings** → **Environment Variables**
2. Add each variable:

| Key | Value | Environment |
|-----|-------|-------------|
| `NEXT_PUBLIC_SITE_URL` | `https://thedrinkers.si` | Production, Preview, Development |
| `NEXT_PUBLIC_VERCEL_ANALYTICS_ID` | Your analytics ID | Production |
| `NEXT_PUBLIC_SPOTIFY_URL` | Spotify artist URL | All |
| `NEXT_PUBLIC_YOUTUBE_URL` | YouTube channel URL | All |
| `NEXT_PUBLIC_INSTAGRAM_URL` | Instagram profile URL | All |

3. Click **Save**
4. Redeploy for changes to take effect

### Sync with .env.local

Your local `.env.local` should match Vercel's environment variables (but never commit this file!).

---

## ✅ Post-Deployment Checklist

- [ ] Site loads without errors
- [ ] All pages work (/, /music, /tour, /about, /gallery, /merch, /contact)
- [ ] Images display correctly
- [ ] Forms submit properly
- [ ] Mobile responsive
- [ ] Analytics tracking
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active (automatic with Vercel)

---

## 🐛 Troubleshooting

### Build Fails on Vercel

**Check Build Logs:**
1. Go to **Deployments** tab
2. Click failed deployment
3. Review error message

**Common Issues:**
- TypeScript errors → Run `npm run typecheck` locally first
- Missing dependencies → Add to `package.json`
- Environment variables missing → Add in Vercel dashboard

### Site Shows 404

- Ensure `next.config.js` has correct settings
- Check that all pages are in `app/` directory
- Verify build completed successfully

### Styles Not Loading

- Check that Tailwind config is correct
- Ensure `globals.css` has Tailwind directives
- Clear browser cache

---

## 📊 Monitor Performance

### Vercel Analytics

1. Enable in **Project Settings** → **Analytics**
2. View real-time stats in dashboard

### Lighthouse Audit

1. Open Chrome DevTools
2. Go to **Lighthouse** tab
3. Run audit
4. Target score: 90+

---

## 🎯 Next Steps

1. **Set up custom domain** (if you have one)
2. **Configure analytics** (Vercel or Google Analytics)
3. **Set up monitoring** (Vercel Speed Insights)
4. **Enable automatic deployments** (GitHub Actions)
5. **Add SSL certificate** (automatic with Vercel)

---

## 📞 Support

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Community**: https://github.com/vercel/vercel/discussions

---

**Ready to deploy? Let's rock! 🎸**
