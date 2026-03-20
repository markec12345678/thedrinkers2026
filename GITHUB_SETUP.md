# 🚀 GitHub Setup Guide - The Drinkers

## 📋 Quick Start - 3 Steps

### Step 1: Create GitHub Account (if you don't have one)

1. Go to: https://github.com/signup
2. Sign up (free)
3. Verify your email

---

### Step 2: Push Code to GitHub

#### Option A: Use Automated Script (Easiest)

**Windows PowerShell:**
```powershell
cd f:\thedrinkers\the
.\push-to-github.ps1
```

**Windows Command Prompt:**
```cmd
cd f:\thedrinkers\the
push-to-github.bat
```

The script will:
- ✅ Check if Git is installed
- ✅ Initialize Git repository
- ✅ Guide you through GitHub setup
- ✅ Push your code

---

#### Option B: Manual Commands

**1. Initialize Git (if not done):**
```bash
cd f:\thedrinkers\the
git init
git branch -M main
```

**2. Create Repository on GitHub:**
- Go to: https://github.com/new
- Repository name: `the-drinkers-site`
- Choose: **Public** or **Private**
- Click: **Create repository**

**3. Connect and Push:**
```bash
# Add GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/the-drinkers-site.git

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - The Drinkers website"

# Push to GitHub
git push -u origin main
```

---

### Step 3: Verify on GitHub

1. Go to: https://github.com/YOUR_USERNAME/the-drinkers-site
2. Check that all files are uploaded
3. Check that README.md displays correctly

---

## 🔧 Troubleshooting

### Git Not Installed

**Download:** https://git-scm.com/downloads

**Install on Windows:**
1. Run installer
2. Use default settings
3. Finish installation
4. Restart terminal/command prompt
5. Verify: `git --version`

---

### Permission Denied

**Error:** `fatal: could not read Username`

**Solution:**
```bash
# Use HTTPS with personal access token
git remote set-url origin https://YOUR_TOKEN@github.com/YOUR_USERNAME/the-drinkers-site.git
```

**Create token:**
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token"
3. Select scopes: `repo`, `workflow`
4. Click "Generate token"
5. Copy the token (save it!)

---

### Large Files Error

**Error:** `File is larger than 100 MB`

**Solution:**
```bash
# Install Git LFS
git lfs install

# Track large files
git lfs track "*.psd"
git lfs track "*.zip"

# Re-add files
git add .
git commit -m "Add large files with LFS"
git push
```

---

### Authentication Issues

**Use GitHub CLI (Recommended):**

**1. Install:**
```bash
# Windows (winget)
winget install GitHub.cli

# Or download from: https://cli.github.com/
```

**2. Login:**
```bash
gh auth login
```

**3. Create and Push:**
```bash
gh repo create the-drinkers-site --public --push
```

---

## 📊 What Gets Pushed

### ✅ Included Files

```
the-drinkers-site/
├── app/                    ✅ All pages
├── components/             ✅ All components
├── lib/                    ✅ Types, constants, utils
├── styles/                 ✅ CSS files
├── public/                 ✅ Images, videos (check size!)
├── Documentation files     ✅ All .md files
├── Configuration files     ✅ .json, .js, .ts configs
└── package.json            ✅ Dependencies
```

### ❌ NOT Pushed (GitIgnored)

```
node_modules/              ✅ Already in .gitignore
.env.local                 ✅ Sensitive data (NEVER commit!)
.next/                     ✅ Build output
.git/                      ✅ Git metadata
*.log                      ✅ Log files
.DS_Store                  ✅ System files
```

---

## 🔐 Security Checklist

Before pushing:

- [ ] `.env.local` NOT committed (contains secrets)
- [ ] `node_modules/` NOT committed (too large)
- [ ] No API keys in code
- [ ] No passwords in code
- [ ] No personal data in code

**Check what will be committed:**
```bash
git status
```

---

## 🎯 After Pushing to GitHub

### 1. Deploy to Vercel

```
1. Go to: https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub account
4. Find "the-drinkers-site"
5. Click "Import"
6. Click "Deploy"
7. Wait 2-3 minutes
8. Site is live! 🎉
```

**Your Vercel URL:** `https://the-drinkers-site.vercel.app`

---

### 2. Enable GitHub Actions (Optional)

Create `.github/workflows/deploy.yml` for automated deployments.

---

### 3. Add GitHub Pages (Alternative to Vercel)

**Settings → Pages:**
- Source: Deploy from branch
- Branch: main
- Folder: /.next (after build)

**Note:** Next.js works better on Vercel than GitHub Pages.

---

## 📈 Repository Settings

### Recommended Settings

**Settings → General:**

1. **About section:**
   - Description: "Official website of The Drinkers rock band"
   - Website: https://thedrinkers.si
   - Topics: `nextjs`, `react`, `tailwindcss`, `music`, `band-website`

2. **Protect your main branch:**
   - Settings → Branches → Add branch protection rule
   - Branch name pattern: `main`
   - ✅ Require pull request reviews before merging

3. **Enable Issues:**
   - Settings → Features → ✅ Issues
   - Use for bug reports and feature requests

4. **Enable Projects:**
   - Settings → Features → ✅ Projects
   - Use for roadmap and task tracking

---

## 🔄 Ongoing Workflow

### Daily Development

```bash
# Make changes
# ...code...

# Stage changes
git add .

# Commit with message
git commit -m "feat: add new feature"

# Push to GitHub
git push origin main

# Vercel auto-deploys!
```

---

### Conventional Commits

**Format:** `type(scope): description`

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Formatting
- `refactor:` - Code refactoring
- `perf:` - Performance
- `test:` - Tests
- `chore:` - Maintenance

**Examples:**
```bash
git commit -m "feat(hero): add video background"
git commit -m "fix(gallery): resolve image loading"
git commit -m "docs(readme): update installation steps"
git commit -m "perf(images): convert to AVIF"
```

---

## 📊 GitHub Repository Stats

After pushing, you'll see:

- **Languages:** TypeScript, CSS, JavaScript
- **Commits:** Your commit history
- **Branches:** main + feature branches
- **Releases:** Version tags
- **Contributors:** People who contributed

---

## 🎯 Quick Reference Commands

```bash
# Check status
git status

# View changes
git diff

# Add files
git add .

# Commit
git commit -m "message"

# Push
git push origin main

# Pull latest changes
git pull origin main

# Create new branch
git checkout -b feat/new-feature

# Switch branch
git checkout main

# View commit history
git log --oneline
```

---

## 📞 Need Help?

### GitHub Docs
- **Getting Started:** https://docs.github.com/en/get-started
- **Repository:** https://docs.github.com/en/repositories
- **Authentication:** https://docs.github.com/en/authentication

### Git Docs
- **Git Book:** https://git-scm.com/book
- **Git Cheatsheet:** https://education.github.com/git-cheat-sheet-education.pdf

### Next.js Deployment
- **Vercel + GitHub:** https://vercel.com/docs/concepts/git
- **Next.js Deploy:** https://nextjs.org/docs/deployment

---

## ✅ Checklist

### Before Pushing
- [ ] Git installed
- [ ] GitHub account created
- [ ] Repository name decided
- [ ] `.env.local` NOT in files to commit
- [ ] `node_modules/` NOT in files to commit

### After Pushing
- [ ] All files visible on GitHub
- [ ] README.md displays correctly
- [ ] Vercel connected
- [ ] Site deployed
- [ ] GitHub profile updated with project

---

## 🎸 Ready to Push!

**Choose your method:**

1. **Automated Script:** `./push-to-github.ps1`
2. **Manual Commands:** Follow the guide above
3. **GitHub Desktop:** https://desktop.github.com/

**Good luck! 🚀**

---

Built with 🤘 for The Drinkers • 2026
