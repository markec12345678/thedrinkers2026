# 🌱 THE DRINKERS - DATABASE SEED GUIDE

**Complete guide for seeding The Drinkers database**

---

## 📋 Contents

1. [Quick Start](#quick-start)
2. [Configuration](#configuration)
3. [Seed Scripts](#seed-scripts)
4. [Verification](#verification)
5. [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Start

### Option 1: Automated Seed (Recommended)

```bash
cd f:\thedrinkers\the
node seed-minimal.js
```

**Expected output:**

```
✅ SEED COMPLETE! 12 rows inserted
🍺 Database is ready for The Drinkers! 🎸
```

### Option 2: Manual SQL Seed

1. Open [Neon SQL Editor](https://console.neon.tech/)
2. Select project: `ep-snowy-sun-aia7r9c2`
3. Copy contents of `seed-clean.sql`
4. Paste and Run

---

## ⚙️ Configuration

### .env Files

| File        | Purpose                 |
| ----------- | ----------------------- |
| `.env`      | Main application config |
| `.env.seed` | Seed-specific config    |

### Environment Variables

```env
DATABASE_URL=postgresql://...
NEON_API_KEY=napi_...
NEON_PROJECT_ID=ep-snowy-sun-aia7r9c2
```

---

## 📜 Seed Scripts

### seed-minimal.js

**Purpose:** Seed core tables with minimal data  
**Tables:** product, tour_date, album, vip_tier  
**Rows:** 12 total

```bash
node seed-minimal.js
```

### do-seed.js

**Purpose:** Full seed with all tables  
**Tables:** All + fan_art (if users exist)

```bash
node do-seed.js
```

### seed-clean.sql

**Purpose:** Manual SQL seed for Neon Editor  
**Usage:** Copy-paste to SQL Editor

---

## ✅ Verification

### Check if Seed Needed

```bash
node check-if-seed-needed.js
```

**Output:**

```
📦 Products: 3
🎫 Tour Dates: 3
💿 Albums: 3
👑 VIP Tiers: 3
✅ Database already has data!
```

### Check Existing Data

```bash
node check-existing-data.js
```

**Output:**

```
👑 VIP Tiers:
   - bronze: Bronze Member (€9.99)
   - silver: Silver Member (€19.99)
   - gold: Gold Member (€29.99)
```

### Check Table Structure

```bash
node check-all-structures.js
```

---

## 📊 Seeded Data Summary

### Products (3)

| Name                         | Price  | Category |
| ---------------------------- | ------ | -------- |
| The Drinkers Classic T-Shirt | €29.99 | t-shirt  |
| The Drinkers Hoodie          | €59.99 | hoodie   |
| Tour 2026 Poster             | €19.99 | poster   |

### Tour Dates (3)

| Venue      | City      | Date       | Status    |
| ---------- | --------- | ---------- | --------- |
| Orto Bar   | Ljubljana | 2026-04-15 | on_sale   |
| Kino Šiška | Ljubljana | 2026-04-20 | on_sale   |
| O2 Academy | London    | 2026-08-01 | announced |

### Albums (3)

| Title             | Release Date | Genre             |
| ----------------- | ------------ | ----------------- |
| First Round       | 2020-03-15   | Rock, Alternative |
| Midnight Sessions | 2022-06-20   | Rock, Blues Rock  |
| Tour 2026         | 2026-03-01   | Rock, Alternative |

### VIP Tiers (3)

| Tier   | Price/Month | Benefits                                 |
| ------ | ----------- | ---------------------------------------- |
| Bronze | €9.99       | Early access, 10% discount               |
| Silver | €19.99      | Early access, 20% discount, Meet & greet |
| Gold   | €29.99      | All perks, 30% discount, Backstage       |

---

## 🔧 Troubleshooting

### Error: "relation does not exist"

**Problem:** Table names are incorrect

**Solution:** Use lowercase snake_case:

- ✅ `product` (not `Product`)
- ✅ `tour_date` (not `TourDate`)
- ✅ `album` (not `Album`)

### Error: "column does not exist"

**Problem:** Schema has different columns than expected

**Solution:** Check actual schema:

```bash
node check-all-structures.js
```

### Seed Runs But No Data

**Problem:** Transaction rolled back

**Solution:** Check for errors in output, run without transaction:

```bash
node seed-minimal.js
```

### Duplicate Data

**Problem:** Seed ran multiple times

**Solution:** Clear tables first:

```sql
DELETE FROM fan_art;
DELETE FROM vip_tier;
DELETE FROM album;
DELETE FROM tour_date;
DELETE FROM product;
```

Then re-run seed.

---

## 📝 Next Steps

After successful seed:

1. ✅ Verify data: `node check-if-seed-needed.js`
2. ⏳ Create test users (optional)
3. ⏳ Add fan art (requires users)
4. ⏳ Test application

---

## 📞 Support

**Documentation:**

- `DATABASE_SEED_COMPLETE.md` - Seed summary
- `DATABASE_SETUP.md` - Complete setup guide
- `SEED_NAVODILA.md` - Quick instructions (Slovenian)

**Scripts:**

- `seed-minimal.js` - Automated seed
- `seed-clean.sql` - Manual SQL seed
- `check-*.js` - Verification scripts

---

**Last Updated:** 2026-03-25  
**Status:** ✅ Complete & Tested  
**Database:** Neon PostgreSQL
