# 🔐 VIP Drinkers Bar - Better Auth Setup

## 🎯 Implementirano: Better-Auth Authentication

**Setup time:** 30-45 minut  
**Cost:** $0 (self-hosted)  
**Features:** Email/Password + Google + Discord login

---

## 📋 **KORAKI ZA SETUP:**

### **1. Namesti Better-Auth (2 min)**

```bash
npm install better-auth @neondatabase/serverless
```

---

### **2. Setup Database - Neon Postgres (5 min)**

1. **Odpri:** https://neon.tech
2. **Registriraj se** (GitHub/Google login)
3. **Create new project:**
   - Name: `the-drinkers-auth`
   - Region: Closest to you (Frankfurt for EU)
4. **Kopiraj connection string:**
   ```
   postgresql://user:password@ep-xxx.eu-central-2.aws.neon.tech/dbname
   ```
5. **Dodaj v `.env.local`:**
   ```bash
   DATABASE_URL=postgresql://...
   ```

**Neon Free Tier:**
- ✅ 0.5 GB storage
- ✅ Unlimited databases
- ✅ Auto-sleep after 5 min inactivity
- ✅ Perfect for MVP

---

### **3. Setup OAuth Providers (10 min)**

#### **Google OAuth:**

1. **Odpri:** https://console.cloud.google.com
2. **Create new project:** "The Drinkers Auth"
3. **APIs & Services → Credentials**
4. **Create OAuth 2.0 Client ID**
5. **Authorized redirect URI:**
   ```
   http://localhost:3000/api/auth/callback/google
   ```
6. **Kopiraj Client ID in Secret**
7. **Dodaj v `.env.local`:**
   ```bash
   GOOGLE_CLIENT_ID=your-client-id
   GOOGLE_CLIENT_SECRET=your-client-secret
   ```

#### **Discord OAuth:**

1. **Odpri:** https://discord.com/developers/applications
2. **New Application:** "The Drinkers"
3. **OAuth2 → Redirects**
4. **Add redirect:**
   ```
   http://localhost:3000/api/auth/callback/discord
   ```
5. **Kopiraj Client ID in Secret**
6. **Dodaj v `.env.local`:**
   ```bash
   DISCORD_CLIENT_ID=your-client-id
   DISCORD_CLIENT_SECRET=your-client-secret
   ```

---

### **4. Posodobi `.env.local` (2 min)**

```bash
# Database
DATABASE_URL=postgresql://user:password@ep-xxx.eu-central-2.aws.neon.tech/dbname

# OAuth - Google
GOOGLE_CLIENT_ID=123456789-xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxx

# OAuth - Discord
DISCORD_CLIENT_ID=123456789012345678
DISCORD_CLIENT_SECRET=xxx

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

### **5. Testiraj Avtentikacijo (5 min)**

```bash
# 1. Startaj dev server
npm run dev

# 2. Odpri http://localhost:3000/bar

# 3. Registriraj se z emailom:
# - Email: test@example.com
# - Password: test1234

# 4. Preveri če si logged in

# 5. Testiraj Google/Discord login
```

---

## 🎨 **FEATURES:**

### ✅ **Implementirano:**

1. **Email/Password Authentication**
   - Register with email + password
   - Login with credentials
   - Password min 8 characters
   - Session management (7 days)

2. **Social Login**
   - Google OAuth
   - Discord OAuth
   - One-click login

3. **Protected Routes**
   - `/bar` route protected
   - Auto-redirect to login
   - Session persistence

4. **Rate Limiting**
   - 10 requests per minute
   - Prevents brute force attacks

5. **User Dashboard**
   - View profile
   - Logout functionality
   - Session management

---

## 🚀 **NASLEDNJI KORAKI:**

### **Phase 1: Exclusive Content (Week 2)**

```typescript
// Add to /bar page after login:
- Backstage videos (unlisted YouTube/Vimeo)
- Unreleased tracks (private SoundCloud)
- Early ticket codes (unique per user)
- Member-only discounts
```

### **Phase 2: Membership Tiers (Week 3)**

```typescript
// User tiers in database:
- Free: Basic access
- VIP: Early access + discounts
- OG: NFT holders + lifetime fans

// Upgrade path:
- Buy VIP ticket → VIP tier
- Buy merch over €100 → VIP tier
- Hold Drinkers NFT → OG tier
```

### **Phase 3: Real-time Chat (Week 4)**

```typescript
// Socket.io integration:
- Fan chat rooms
- Direct messaging
- File sharing (images, videos)
- Moderation tools
```

---

## 💾 **DATABASE SCHEMA:**

Better-Auth avtomatsko kreira tabele:

```sql
-- Users table
CREATE TABLE user (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  emailVerified BOOLEAN,
  image TEXT,
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP,
  membershipTier TEXT DEFAULT 'free',
  walletAddress TEXT
);

-- Sessions table
CREATE TABLE session (
  id TEXT PRIMARY KEY,
  userId TEXT REFERENCES user(id),
  expiresAt TIMESTAMP NOT NULL,
  token TEXT UNIQUE NOT NULL,
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP
);

-- Accounts table (for OAuth)
CREATE TABLE account (
  id TEXT PRIMARY KEY,
  userId TEXT REFERENCES user(id),
  accountId TEXT NOT NULL,
  providerId TEXT NOT NULL,
  accessToken TEXT,
  refreshToken TEXT,
  UNIQUE(accountId, providerId)
);
```

---

## 🔧 **TROUBLESHOOTING:**

### **Error: "Database connection failed"**
```bash
# Preveri DATABASE_URL v .env.local
# Odpri Neon dashboard in kopiraj svež connection string
# Restartaj dev server: npm run dev
```

### **Error: "Invalid redirect URI"**
```bash
# Preveri če je redirect URI točno enak:
# http://localhost:3000/api/auth/callback/google
# http://localhost:3000/api/auth/callback/discord

# Mora biti identičen (tudi http vs https)
```

### **Error: "Session not created"**
```bash
# Clear cookies in browser
# Clear .next folder: rm -rf .next
# Restart dev server
```

---

## 📊 **MEMBERSHIP TIERS:**

### **Free Tier:**
```
✅ Access to /bar
✅ Fan chat
✅ Public content
❌ No early access
❌ No discounts
```

### **VIP Tier (€50+ purchase):**
```
✅ All Free features
✅ Early ticket access (24h before public)
✅ 10% merch discount
✅ Exclusive content (backstage videos)
✅ Unreleased tracks
```

### **OG Tier (NFT holders / Lifetime fans):**
```
✅ All VIP features
✅ 20% merch discount
✅ Free shipping
✅ Meet & Greet access
✅ Limited edition merch
✅ Vote on setlists
```

---

## 🎯 **UPGRADE LOGIC:**

```typescript
// Check if user should be upgraded to VIP
async function checkVIPEligibility(userId: string) {
  const orders = await getUserOrders(userId);
  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
  
  if (totalSpent >= 50) {
    await upgradeToVIP(userId);
    sendVIPUpgradeEmail(userId);
  }
}

// Check for NFT ownership
async function verifyNFTOwnership(walletAddress: string) {
  // Query NFT contract
  const hasNFT = await drinkersNFTContract.ownerOf(walletAddress);
  
  if (hasNFT) {
    await upgradeToOG(userId);
  }
}
```

---

## 🎸 **PRIMERJAVA Z DRUGIMI REŠITVAMI:**

| Feature | Better-Auth | Auth0 | NextAuth | Clerk |
|---------|-------------|-------|----------|-------|
| **Self-hosted** | ✅ Yes | ❌ No | ✅ Yes | ❌ No |
| **Free Tier** | ✅ Unlimited | ❌ 7,500 MAU | ✅ Unlimited | ❌ Limited |
| **Database** | ✅ Your DB | ❌ Their DB | ✅ Your DB | ❌ Their DB |
| **Social Login** | ✅ Unlimited | ⚠️ Limited | ✅ Unlimited | ⚠️ Limited |
| **Rate Limiting** | ✅ Built-in | ✅ Paid | ❌ Manual | ✅ Built-in |
| **Setup Time** | 30 min | 1h | 1h | 15 min |
| **Monthly Cost** | **€0** | **€29+** | **€0** | **€25+** |

---

## 🚀 **PRODUCTION CHECKLIST:**

- [ ] Database setup (Neon Postgres)
- [ ] OAuth providers configured
- [ ] Environment variables set
- [ ] Test login/register flow
- [ ] Test social login (Google, Discord)
- [ ] Protected routes working
- [ ] Rate limiting enabled
- [ ] Error handling implemented
- [ ] Logout functionality working
- [ ] Session persistence tested

---

## 📚 **RESOURCES:**

- [Better-Auth Documentation](https://www.better-auth.com)
- [Neon Postgres Docs](https://neon.tech/docs)
- [Google OAuth Setup Guide](https://support.google.com/cloud/answer/6158849)
- [Discord OAuth Setup Guide](https://discord.com/developers/docs/topics/oauth2)

---

**Vso srečo z setupom! 🤘**

Questions? Odpri issue na GitHubu!
