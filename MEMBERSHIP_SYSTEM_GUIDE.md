# 🔐 VIP Membership System - Complete Guide

## 🎯 Implementirano: Better-Auth + Membership Tiers

**Setup time:** 2-3 hours  
**Cost:** $0 (self-hosted)  
**Features:** Content gating, auto-upgrades, member dashboard

---

## 📋 **KORAKI ZA DOKONČANJE:**

### **1. Database Schema Update (10 min)**

Better-Auth avtomatsko kreira tabele. Dodaj membership fields:

```sql
-- Add membership columns to user table
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "membershipTier" TEXT DEFAULT 'free';
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "totalSpent" DECIMAL(10,2) DEFAULT 0;
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "walletAddress" TEXT;
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "joinDate" TIMESTAMP;
```

**Or use Prisma schema:**

```prisma
model User {
  id             String   @id @default(cuid())
  email          String   @unique
  name           String?
  membershipTier String   @default("free")
  totalSpent     Decimal  @default(0)
  walletAddress  String?
  joinDate       DateTime @default(now())
  // ... other Better-Auth fields
}
```

---

### **2. Environment Variables (2 min)**

Already set from Better-Auth setup:

```bash
# Database
DATABASE_URL=postgresql://...

# Better-Auth
BETTER_AUTH_SECRET=your_secret
BETTER_AUTH_URL=http://localhost:3000
```

---

### **3. Test Membership Flow (15 min)**

```bash
# 1. Startaj dev server
npm run dev

# 2. Odpri http://localhost:3000/bar
# 3. Registriraj nov račun

# 4. Odpri http://localhost:3000/dashboard/profile
# 5. Preveri če vidiš:
#    - Membership badge (Free)
#    - Progress bar
#    - Order history (prazno)
#    - Exclusive content (locked)

# 6. Simuliraj nakup (uporabi Stripe test mode)
# 7. Preveri če se membership avtomatsko nadgradi
```

---

## 🎨 **IMPLEMENTIRANE FUNKCIJE:**

### ✅ **1. Content Gating:**

```typescript
// Usage example:
<GatedContent requiredTier="vip">
  <BackstageVideo id="123" />
</GatedContent>

<GatedContent requiredTier="og">
  <UnreleasedTrack id="456" />
</GatedContent>
```

**Features:**
- 🔒 Locked content blur effect
- 🔑 Upgrade prompts
- 💎 Tier-based access
- 🎨 Beautiful UI with GlassCard

---

### ✅ **2. Member Dashboard:**

**Location:** `/dashboard/profile`

**Features:**
- 👤 User profile
- 🏆 Membership badge (Free/VIP/OG)
- 📊 Progress bar to next tier
- 📦 Order history
- 🎬 Exclusive content library
- ⚙️ Account settings
- 🚪 Sign out

---

### ✅ **3. Auto-Upgrade Logic:**

**Triggers:**
- Purchase over €50 → Free to VIP
- Purchase over €200 → VIP to OG

**Process:**
```
1. Customer completes checkout
   ↓
2. Stripe webhook triggers
   ↓
3. checkAndUpgradeMembership() called
   ↓
4. Update database
   ↓
5. Send upgrade email
   ↓
6. User sees new tier in dashboard
```

---

## 💰 **MEMBERSHIP TIERS:**

### **Free Tier:**
```
✅ Access to /bar
✅ Fan chat
❌ No backstage videos
❌ No unreleased tracks
❌ No early ticket access
❌ No merch discounts
```

### **VIP Tier (€50+ purchases):**
```
✅ All Free features
✅ Backstage videos (5/20)
✅ Unreleased tracks (2/10)
✅ Early ticket access (24h before)
✅ 10% merch discount
❌ Free shipping (only over €50)
❌ No meet & greet
```

### **OG Tier (€200+ purchases or NFT holders):**
```
✅ All VIP features
✅ All backstage videos (unlimited)
✅ All unreleased tracks
✅ Early ticket access (48h before)
✅ 20% merch discount
✅ Always free shipping
✅ Meet & Greet access
✅ Limited edition merch access
```

---

## 📊 **REVENUE IMPACT:**

### **Conversion Funnel:**

```
1,000 monthly visitors
    ↓ (10% signup)
100 free members
    ↓ (20% buy merch)
20 paying customers
    ↓ (50% reach €50)
10 VIP members
    ↓ (10% reach €200)
2 OG members

Monthly Revenue:
- Merch sales: €1,000
- VIP upgrades: €500
- OG upgrades: €400
Total: €1,900/month

Annual: €22,800
```

---

## 🎯 **INTEGRACIJA Z E-COMMERCE:**

### **Checkout Flow:**

```typescript
// app/api/checkout/route.ts
const session = await stripe.checkout.sessions.create({
  // ... other options
  client_reference_id: userId, // Important for membership tracking!
  metadata: {
    userId: userId,
  },
});
```

### **Webhook Handler:**

```typescript
// app/api/webhooks/stripe/route.ts
if (event.type === 'checkout.session.completed') {
  const session = event.data.object;
  
  // Auto-upgrade membership
  if (session.client_reference_id) {
    const amountInEur = session.amount_total / 100;
    await checkAndUpgradeMembership(
      session.client_reference_id, 
      amountInEur
    );
  }
}
```

---

## 🔧 **TROUBLESHOOTING:**

### **Error: "User not found"**
```bash
# Check if user is registered in Better-Auth
# Verify DATABASE_URL is correct
# Check user table exists
```

### **Error: "Membership not upgrading"**
```bash
# Check webhook is firing
# Verify client_reference_id in Stripe session
# Check checkAndUpgradeMembership() is called
# Look at server logs for errors
```

### **Content still locked after upgrade**
```bash
# Refresh page (session might be stale)
# Check user.membershipTier in database
# Verify GatedContent component is using correct tier
```

---

## 📚 **USAGE EXAMPLES:**

### **Backstage Videos Page:**

```typescript
// app/bar/backstage/page.tsx
import { GatedContent } from '@/components/ui/GatedContent';

export default function BackstageVideos() {
  return (
    <Section>
      <h1>Backstage Videos</h1>
      
      <GatedContent requiredTier="vip">
        <VideoGrid>
          <Video id="1" title="Soundcheck Ljubljana" />
          <Video id="2" title="Backstage Maribor" />
          {/* ... more videos */}
        </VideoGrid>
      </GatedContent>
      
      <GatedContent requiredTier="og">
        <VideoGrid>
          <Video id="exclusive-1" title="Private Acoustic Session" />
          {/* ... OG exclusive content */}
        </VideoGrid>
      </GatedContent>
    </Section>
  );
}
```

### **Unreleased Tracks:**

```typescript
// app/bar/tracks/page.tsx
import { GatedContent } from '@/components/ui/GatedContent';

export default function UnreleasedTracks() {
  return (
    <Section>
      <h1>Unreleased Tracks</h1>
      
      <GatedContent requiredTier="vip">
        <AudioPlayer src="/tracks/demo-1.mp3" />
        <AudioPlayer src="/tracks/demo-2.mp3" />
      </GatedContent>
      
      <GatedContent requiredTier="og">
        <AudioPlayer src="/tracks/exclusive-1.mp3" />
        <AudioPlayer src="/tracks/exclusive-2.mp3" />
      </GatedContent>
    </Section>
  );
}
```

---

## 🎸 **NEXT STEPS:**

### **Phase 1: Content (Week 2)**
```
✅ Upload 5 backstage videos
✅ Upload 2 unreleased tracks
✅ Add descriptions & thumbnails
✅ Test gating logic
```

### **Phase 2: Email Notifications (Week 3)**
```
⚠️ Setup Resend or SendGrid
⚠️ Create upgrade email templates
⚠️ Test email delivery
```

### **Phase 3: NFT Integration (Month 2)**
```
⚠️ WalletConnect integration
⚠️ NFT ownership verification
⚠️ Auto-grant OG tier for holders
⚠️ Special perks for NFT holders
```

---

## 📋 **LAUNCH CHECKLIST:**

- [ ] Database schema updated
- [ ] Better-Auth working
- [ ] Content gating implemented
- [ ] Member dashboard accessible
- [ ] Auto-upgrade logic tested
- [ ] Email notifications setup
- [ ] Exclusive content uploaded
- [ ] Test with real purchase

---

**Vso srečo z launchom! 🤘**

Questions? Odpri issue na GitHubu!
