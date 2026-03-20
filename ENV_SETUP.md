# 🔐 Environment Variables - Complete Setup

## ✅ What's Been Created

| File | Purpose |
|------|---------|
| `.env.local` | Your local environment (gitignored) |
| `.env.example` | Template for environment variables |
| `setup-env.ps1` | Automated setup script |
| `ENVIRONMENT_VARIABLES.md` | Complete guide |

---

## 🚀 Quick Setup

### Option 1: Automated (Recommended)

```powershell
# Run setup script
./setup-env.ps1

# This will:
# ✅ Create .env.local from template
# ✅ Generate secure NEXTAUTH_SECRET
# ✅ Configure production URL
```

### Option 2: Manual

```bash
# Copy template
cp .env.example .env.local

# Generate NextAuth secret
openssl rand -base64 32

# Edit .env.local
nano .env.local
```

---

## 📋 Environment Variables Reference

### 🔐 Authentication (Required for /bar)

```bash
# Generate with: openssl rand -base64 32
NEXTAUTH_SECRET=K7gNU3sdo+OL0wNhqoVWhr3g6s1xYv72ol_pe_Ug7go=
NEXTAUTH_URL=http://localhost:3000
```

### 📊 Analytics

```bash
# Get from Vercel Dashboard
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=va_xxxxxxxxxxxxx
```

### 🎵 Music APIs (Optional)

```bash
# Spotify: https://developer.spotify.com/dashboard
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret

# YouTube: https://console.cloud.google.com/apis/credentials
YOUTUBE_API_KEY=your_api_key
```

### 🎫 Eventim (Optional)

```bash
EVENTIM_API_URL=https://api.eventim.si
EVENTIM_API_KEY=your_api_key
```

### 📧 Email (Optional - for contact form)

```bash
# Resend: https://resend.com
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Or SendGrid
SENDGRID_API_KEY=your_key
SENDGRID_FROM_EMAIL=noreply@thedrinkers.si
```

### 🌐 Site Configuration

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="The Drinkers"
```

### 📱 Social Media URLs

```bash
NEXT_PUBLIC_SPOTIFY_URL=https://open.spotify.com/artist/thedrinkers
NEXT_PUBLIC_YOUTUBE_URL=https://www.youtube.com/@thedrinkers
NEXT_PUBLIC_INSTAGRAM_URL=https://www.instagram.com/thedrinkers
NEXT_PUBLIC_FACEBOOK_URL=https://www.facebook.com/thedrinkers
NEXT_PUBLIC_TIKTOK_URL=https://www.tiktok.com/@thedrinkers
```

### 📞 Contact Info

```bash
NEXT_PUBLIC_CONTACT_EMAIL=info@thedrinkers.si
NEXT_PUBLIC_CONTACT_PHONE=+386 40 123 456
NEXT_PUBLIC_CONTACT_LOCATION=Ljubljana, Slovenija
```

---

## 🔒 Security Best Practices

### ✅ DO:

- ✅ Keep `.env.local` out of Git (already in `.gitignore`)
- ✅ Use strong, random secrets
- ✅ Use different secrets for dev/production
- ✅ Rotate secrets periodically
- ✅ Use Vercel environment variables for production

### ❌ DON'T:

- ❌ Commit `.env.local` to Git
- ❌ Share secrets in chat/email
- ❌ Use weak secrets like "password123"
- ❌ Hardcode secrets in code
- ❌ Use same secret everywhere

---

## 🎯 Minimal Setup (Works Without APIs)

The site works without any API keys! Just set:

```bash
# Required
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXTAUTH_SECRET=<generate-random-32-char-string>
NEXTAUTH_URL=http://localhost:3000
```

Everything else is optional and adds features.

---

## 📊 Production Setup (Vercel)

Add environment variables in Vercel Dashboard:

1. Go to **Project Settings** → **Environment Variables**
2. Add each variable
3. Deploy to apply changes

### Production Values

```bash
NEXT_PUBLIC_SITE_URL=https://thedrinkers.si
NEXTAUTH_URL=https://thedrinkers.si
NEXTAUTH_SECRET=<your-production-secret>
```

**Important:** Use different secrets for development and production!

---

## 🧪 Verify Setup

### Check if variables load

Start dev server:
```bash
npm run dev
```

Check console for errors.

### Test authentication

Visit `/bar` route - should work with NEXTAUTH_SECRET set.

### Test analytics

If using Vercel Analytics, check dashboard for events.

---

## 🐛 Troubleshooting

### "NEXTAUTH_SECRET is required"

Generate a new secret:
```bash
openssl rand -base64 32
```

Add to `.env.local` and restart server.

### "Environment variables not loading"

1. Restart dev server
2. Check `.env.local` syntax (no spaces around `=`)
3. Verify file is in project root

### "Invalid callback URL"

Ensure `NEXTAUTH_URL` matches your domain exactly:
```bash
NEXTAUTH_URL=https://thedrinkers.si  # No trailing slash!
```

---

## 📚 Documentation

- `ENVIRONMENT_VARIABLES.md` - Complete guide with API setup
- `README.md` - Project overview
- `DEPLOYMENT_SUMMARY.md` - All deployment options
- `.env.example` - Template with all variables

---

## 🔑 Generate Secrets Quick Reference

**Linux/Mac:**
```bash
openssl rand -base64 32
```

**Windows PowerShell:**
```powershell
[System.Web.Security.Membership]::GeneratePassword(32, 0)
```

**Online:**
https://generate-secret.vercel.app/32

---

## ✅ Setup Checklist

- [ ] `.env.local` created
- [ ] `NEXTAUTH_SECRET` generated
- [ ] `NEXTAUTH_URL` configured
- [ ] `NEXT_PUBLIC_SITE_URL` set
- [ ] Social media URLs configured (optional)
- [ ] Analytics ID added (optional)
- [ ] `.env.local` NOT committed to Git
- [ ] Production environment variables set in Vercel

---

**Your environment is ready! 🎸**

Run `./setup-env.ps1` to get started automatically!
