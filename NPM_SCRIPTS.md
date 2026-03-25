# 🎯 NPM SCRIPTS ZA SEED

## ✅ Dodani Scripti

### `npm run db:seed`

**Purpose:** Seed database with minimal data  
**Script:** `node seed-minimal.js`  
**Tables:** product, tour_date, album, vip_tier

```bash
npm run db:seed
```

**Output:**

```
✅ SEED COMPLETE! 12 rows inserted
🍺 Database is ready for The Drinkers! 🎸
```

---

### `npm run db:seed:full`

**Purpose:** Full seed with all tables  
**Script:** `node do-seed.js`  
**Tables:** All tables + fan_art (if users exist)

```bash
npm run db:seed:full
```

---

### `npm run db:verify`

**Purpose:** Check if database needs seeding  
**Script:** `node check-if-seed-needed.js`

```bash
npm run db:verify
```

**Output:**

```
📦 Products: 3
🎫 Tour Dates: 3
💿 Albums: 3
👑 VIP Tiers: 3
✅ Database already has data!
```

---

## 📋 Vsi Database Scripti

| Script             | Command                        | Description          |
| ------------------ | ------------------------------ | -------------------- |
| `db:generate`      | `drizzle-kit generate`         | Generate migrations  |
| `db:migrate`       | `drizzle-kit migrate`          | Run migrations       |
| `db:push`          | `drizzle-kit push`             | Push schema to DB    |
| `db:studio`        | `drizzle-kit studio`           | Open Drizzle Studio  |
| `db:check`         | `drizzle-kit check`            | Check schema         |
| **`db:seed`**      | `node seed-minimal.js`         | **Seed database** ✅ |
| **`db:seed:full`** | `node do-seed.js`              | **Full seed** ✅     |
| **`db:verify`**    | `node check-if-seed-needed.js` | **Verify seed** ✅   |

---

## 🚀 Quick Start

```bash
# 1. Verify current state
npm run db:verify

# 2. Seed database
npm run db:seed

# 3. Verify again
npm run db:verify
```

---

## 📊 Expected Data

After `npm run db:seed`:

| Table     | Rows   |
| --------- | ------ |
| product   | 3      |
| tour_date | 3      |
| album     | 3      |
| vip_tier  | 3      |
| **Total** | **12** |

---

## 🔧 Troubleshooting

### Error: "tsx not found"

```bash
npm install -D tsx
```

### Error: "Cannot find module"

```bash
npm install
```

### Seed Creates Duplicates

Clear tables first:

```bash
npm run db:seed:full  # This clears first
```

---

## 📝 Git Commit

After seeding:

```bash
git add -A
git commit -m "feat: seed database with initial data"
```

---

**Created:** 2026-03-25  
**Status:** ✅ Complete  
**Tested:** ✅ Working
