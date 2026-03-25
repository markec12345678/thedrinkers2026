# 🗄️ DATABASE SEED STATUS

## ✅ Kaj Je Narejeno

1. **Schema datoteka**: `lib/db/schema/index.ts` - 20 tabel definiranih
2. **Migracije**: `drizzle/migrations/` - 3 migracijske datoteke
3. **Seed skripta**: `lib/db/seed.ts` - pripravljena za uporabo
4. **Drizzle config**: `drizzle.config.ts` - konfiguriran

## ⚠️ Trenutni Problem

**Database ima mešane tabele:**

- Nekatere tabele so z uppercase imeni: `Account`, `Session`, `User`
- Nekatere tabele so z lowercase imeni: `vip_tier`, `messages`
- Tabele so v različnih shemah: `public`, `neon_auth`, `drizzle`

**Seed skripta ne deluje** ker Drizzle ORM ne more najti tabel zaradi search_path težav.

## 🔧 Rešitve

### Opcija 1: Nova Čista Baza (PRIPOROČENO)

1. Ustvari novo Neon PostgreSQL bazo samo za The Drinkers
2. Posodobi `DATABASE_URL` v `.env` datoteki
3. Zaženi: `npm run db:push`
4. Zaženi: `npm run db:seed`

```bash
# 1. Ustvari novo bazo na Neon
# Pojdi na https://neon.tech in ustvari novo bazo "the-drinkers"

# 2. Posodobi .env
DATABASE_URL=postgresql://user:password@ep-new-project.us-east-1.aws.neon.tech/the-drinkers

# 3. Push schema
npm run db:push

# 4. Seed data
npm run db:seed
```

### Opcija 2: Popravi Obstoječo Bazo

```bash
# 1. Drop all uppercase tables
node fix-tables.js

# 2. Ustvari vse tabele z lowercase
node create-all-tables-fixed.js

# 3. Verificiraj
node test-tables.js

# 4. Seed
npm run db:seed
```

## 📊 Pričakovani Output Po Uspešnem Seed

```
🎸 Starting The Drinkers Database Seed...

🌱 Starting seed...

🛍️  Seeding products...
✅ 3 products seeded

🎫  Seeding tour dates...
✅ 3 tour dates seeded

💿  Seeding albums...
✅ 3 albums seeded

🎵  Seeding songs...
✅ 3 songs seeded

👑  Seeding VIP tiers...
✅ 3 VIP tiers seeded

🎨  Seeding fan art...
✅ 2 fan art pieces seeded

🎉 Seed completed successfully!
════════════════════════════════════════
Summary:
  - Products:     3
  - Tour Dates:   3
  - Albums:       3
  - Songs:        3
  - VIP Tiers:    3
  - Fan Art:      2
════════════════════════════════════════

🍺 Your database is ready for The Drinkers! 🎸
```

## 🎯 Naslednji Koraki

1. **Ustvari čisto Neon bazo** (5 min)
2. **Posodobi DATABASE_URL** v `.env`
3. **Zaženi `npm run db:push`**
4. **Zaženi `npm run db:seed`**
5. **Verificiraj z `npm run db:studio`**

## 📝 Seed Data Summary

Ko bo seed uspešen, boš imel:

| Tabela      | Število Vrstic | Opis                                               |
| ----------- | -------------- | -------------------------------------------------- |
| `product`   | 3              | Merchandise (T-Shirt, Hoodie, Poster)              |
| `tour_date` | 3              | Koncerti (Ljubljana x2, London)                    |
| `album`     | 3              | Albumi (First Round, Midnight Sessions, Tour 2026) |
| `song`      | 3              | Pesmi iz albumov                                   |
| `vip_tier`  | 3              | VIP stopnje (Bronze, Silver, Gold)                 |
| `fan_art`   | 2              | Fan umetnine                                       |

## 🚀 Komande

```bash
# Push schema to database
npm run db:push

# Seed database with test data
npm run db:seed

# Open Drizzle Studio
npm run db:studio

# Verify tables
node test-tables.js
```
