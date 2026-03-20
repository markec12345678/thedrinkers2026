# 🔐 Environment Variables Guide

## Quick Start

```bash
# 1. Copy the template
cp .env.example .env.local

# 2. Generate NextAuth secret
openssl rand -base64 32

# 3. Edit .env.local with your values
nano .env.local  # or use your favorite editor

# 4. NEVER commit .env.local!
# It's already in .gitignore
```

---

## 📊 Required vs Optional Variables

### ✅ Required for Production

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `NEXT_PUBLIC_SITE_URL` | Your production URL | Your domain |
| `NEXTAUTH_SECRET` | Secret for authentication | Generate (see below) |
| `NEXTAUTH_URL` | Auth callback URL | Your domain |

### 🔌 Optional Integrations

| Variable | Feature | Where to Get |
|----------|---------|--------------|
| `NEXT_PUBLIC_VERCEL_ANALYTICS_ID` | Vercel Analytics | Vercel Dashboard |
| `SPOTIFY_CLIENT_ID` | Spotify integration | Spotify Developer |
| `YOUTUBE_API_KEY` | YouTube videos | Google Cloud Console |
| `RESEND_API_KEY` | Email sending | Resend.com |

---

## 🔑 Generate Secure Secrets

### NextAuth Secret

**Linux/Mac:**
```bash
openssl rand -base64 32
```

**Windows PowerShell:**
```powershell
[System.Web.Security.Membership]::GeneratePassword(32, 0)
```

**Online:** https://generate-secret.vercel.app/32

**Example:**
```bash
NEXTAUTH_SECRET=K7gNU3sdo+OL0wNhqoVWhr3g6s1xYv72ol_pe_Ug7go=
```

---

## 📱 Social Media Setup

### Spotify API

1. Go to: https://developer.spotify.com/dashboard
2. Create an app
3. Get Client ID and Client Secret
4. Add to `.env.local`:

```bash
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
```

### YouTube API

1. Go to: https://console.cloud.google.com/apis/credentials
2. Create credentials → API Key
3. Enable YouTube Data API v3
4. Add to `.env.local`:

```bash
YOUTUBE_API_KEY=your_api_key
```

### Google OAuth (Optional)

1. Go to: https://console.cloud.google.com/apis/credentials
2. Create OAuth 2.0 Client ID
3. Add authorized redirect URI: `https://your-domain.com/api/auth/callback/google`
4. Add to `.env.local`:

```bash
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
```

---

## 🎫 Eventim API Setup

1. Contact Eventim for API access
2. Get API credentials
3. Add to `.env.local`:

```bash
EVENTIM_API_URL=https://api.eventim.si
EVENTIM_API_KEY=your_api_key
```

---

## 📧 Email Setup

### Option 1: Resend (Recommended)

1. Go to: https://resend.com
2. Sign up and get API key
3. Verify your domain
4. Add to `.env.local`:

```bash
RESEND_API_KEY=re_your_api_key
```

### Option 2: SendGrid

1. Go to: https://sendgrid.com
2. Create API key
3. Add to `.env.local`:

```bash
SENDGRID_API_KEY=your_api_key
SENDGRID_FROM_EMAIL=noreply@thedrinkers.si
```

---

## 🌐 Environment-Specific Configs

### Development (.env.local)

```bash
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development
```

### Production (Vercel Environment Variables)

```bash
NEXTAUTH_URL=https://thedrinkers.si
NEXT_PUBLIC_SITE_URL=https://thedrinkers.si
NODE_ENV=production
```

Add in Vercel: **Project Settings → Environment Variables**

---

## 🚀 Feature Flags

Enable/disable features without code changes:

```bash
# Fan club protection
NEXT_PUBLIC_ENABLE_BAR_PROTECTION=true

# Newsletter signup
NEXT_PUBLIC_ENABLE_NEWSLETTER=true

# Merchandise store
NEXT_PUBLIC_ENABLE_MERCH_STORE=true
```

---

## 🔒 Security Best Practices

### ✅ DO:

- Use strong, random secrets
- Keep `.env.local` out of Git
- Use different secrets for dev/prod
- Rotate secrets periodically
- Use environment variables in Vercel

### ❌ DON'T:

- Commit `.env.local` to Git
- Share secrets in chat/email
- Use the same secret everywhere
- Hardcode secrets in code
- Use weak secrets like "password123"

---

## 📋 Environment Variables Checklist

### Minimal Setup (Works without integrations)

```bash
# Required
NEXT_PUBLIC_SITE_URL=https://thedrinkers.si
NEXTAUTH_SECRET=K7gNU3sdo+OL0wNhqoVWhr3g6s1xYv72ol_pe_Ug7go=
NEXTAUTH_URL=https://thedrinkers.si
```

### Full Setup (All features enabled)

```bash
# Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=va_1234567890

# Music
SPOTIFY_CLIENT_ID=xxx
SPOTIFY_CLIENT_SECRET=xxx
YOUTUBE_API_KEY=xxx

# Events
EVENTIM_API_URL=https://api.eventim.si
EVENTIM_API_KEY=xxx

# Auth
NEXTAUTH_SECRET=xxx
NEXTAUTH_URL=https://thedrinkers.si

# Email
RESEND_API_KEY=re_xxx

# Social
NEXT_PUBLIC_SPOTIFY_URL=...
NEXT_PUBLIC_YOUTUBE_URL=...
NEXT_PUBLIC_INSTAGRAM_URL=...
```

---

## 🐛 Troubleshooting

### "NEXTAUTH_SECRET is required"

Generate a new secret:
```bash
openssl rand -base64 32
```

Add to `.env.local`.

### "Invalid callback URL"

Check that `NEXTAUTH_URL` matches your domain exactly:
```bash
NEXTAUTH_URL=https://thedrinkers.si  # No trailing slash!
```

### "Environment variables not loading"

1. Restart dev server: `npm run dev`
2. Check `.env.local` syntax (no spaces around `=`)
3. Verify file is in project root

### "API key not working"

1. Check API key is correct
2. Verify API is enabled (Google Cloud Console)
3. Check quota limits
4. Ensure no typos in variable name

---

## 📊 Verify Environment Variables

### Check if variables are loaded

Create `app/api/env/route.ts`:

```typescript
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
    hasAuthSecret: !!process.env.NEXTAUTH_SECRET,
    hasSpotify: !!process.env.SPOTIFY_CLIENT_ID,
    hasYoutube: !!process.env.YOUTUBE_API_KEY,
  });
}
```

Visit: `http://localhost:3000/api/env`

**⚠️ Don't use this in production! Remove after testing.**

---

## 🎯 Quick Setup Commands

### Generate all secrets at once

```bash
# Create .env.local from template
cp .env.example .env.local

# Generate NextAuth secret
echo "NEXTAUTH_SECRET=$(openssl rand -base64 32)" >> .env.local

# Open for editing
nano .env.local
```

### Verify setup

```bash
# Check .env.local exists
ls -la .env.local

# Check variables are set
grep -v "^#" .env.local | grep -v "^$"
```

---

## 📞 Need Help?

- **NextAuth Docs**: https://next-auth.js.org/configuration/options
- **Vercel Env Vars**: https://vercel.com/docs/concepts/projects/environment-variables
- **Spotify API**: https://developer.spotify.com/documentation/general/guides/authorization/
- **Google Cloud**: https://console.cloud.google.com/apis/credentials

---

**Your environment is ready! 🎸**
