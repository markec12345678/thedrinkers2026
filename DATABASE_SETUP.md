# 🎸 THE DRINKERS - DATABASE SETUP

## ✅ Trenutno Stanje

**Vse tabele so ustvarjene!** ✅ 20/20 tabel obstaja v Neon bazi.

### Obstoječe Tabele (20)

| Kategorija        | Tabele                                          |
| ----------------- | ----------------------------------------------- |
| **Better Auth**   | `User`, `Account`, `Session`, `Verification`    |
| **MCP & AI**      | `McpServer`, `Thread`, `Message`                |
| **Merch Store**   | `Product`, `Order`, `OrderItem`                 |
| **Tour Dates**    | `TourDate`                                      |
| **Music Catalog** | `Album`, `Song`                                 |
| **Fan Art**       | `FanArt`, `FanArtLike`                          |
| **VIP**           | `VipMembership`, `VipTier`                      |
| **Rewards**       | `UserReward`, `UserPoints`, `PointsTransaction` |

## ⚠️ Pomembno Opombe

1. **Imena tabel so PascalCase**: `Product`, `Album`, `TourDate` (ne `product`, `album`)
2. **Drizzle ORM samodejno uporablja pravilna imena**
3. **Seed skripta potrebuje popravke** za uporabo pravilnih imen

## 🚀 Kako Izvesti Seed

### Opcija 1: Uporabi SQL Datoteko (PRIPOROČENO)

```bash
# 1. Odpri Neon SQL Editor
# Pojdi na: https://console.neon.tech/

# 2. Izberi svoj projekt: ep-fragrant-hill-amwub3uk

# 3. Odpri SQL Editor

# 4. Kopiraj vsebino iz seed-database.sql

# 5. Zaženi SQL
```

### Opcija 2: Ročno Ustvari Seed Skripto

Popravi imena tabel v `lib/db/seed-direct.ts`:

```typescript
// Namesto:
INSERT INTO "product" ...

// Uporabi:
INSERT INTO "Product" ...

// In tako naprej za vse tabele:
// - "Product" (ne "product")
// - "TourDate" (ne "tour_date")
// - "Album" (ne "album")
// - "VipTier" (ne "vip_tier")
// - "FanArt" (ne "fan_art")
```

### Opcija 3: Ustvari Čisto Bazo

Če želiš čisto bazo samo za The Drinkers:

1. **Ustvari novo bazo na Neon:**
   - Pojdi na https://console.neon.tech/
   - Klikni "New Project"
   - Poimenuj "the-drinkers"

2. **Posodobi `.env`:**

   ```env
   DATABASE_URL=postgresql://...nova-baza...
   ```

3. **Zaženi migracije:**
   ```bash
   npm run db:push
   npm run db:seed
   ```

## 📊 Seed Podatki

Ko bo seed uspešen, boš imel:

| Tabela   | Število | Opis                                               |
| -------- | ------- | -------------------------------------------------- |
| Product  | 3       | Merchandise (T-Shirt, Hoodie, Poster)              |
| TourDate | 3       | Koncerti (Ljubljana x2, London)                    |
| Album    | 3       | Albumi (First Round, Midnight Sessions, Tour 2026) |
| VipTier  | 3       | VIP stopnje (Bronze, Silver, Gold)                 |
| FanArt   | 2       | Fan umetnine                                       |

## 🔍 Verifikacija

Za preverjanje seedanih podatkov:

```bash
# Zaženi check skripto
node check-database-info.js
```

## 📝 SQL Primeri

### Pregled vseh produktov:

```sql
SELECT * FROM "Product";
```

### Pregled koncertov:

```sql
SELECT "venue", "city", "date", "ticket_price"
FROM "TourDate"
WHERE "status" = 'on_sale';
```

### Pregled albumov:

```sql
SELECT "title", "release_date", "total_tracks"
FROM "Album"
WHERE "featured" = true;
```

## 🎯 Naslednji Koraki

1. ✅ Tabele so ustvarjene
2. ⏳ Izvedi seed (izberi eno od opcij zgoraj)
3. ⏳ Verificiraj podatke
4. ⏳ Zaženi aplikacijo (`npm run dev`)
5. ⏳ Testiraj v brskalniku

## 🆘 Težave?

Če imaš težave:

1. **Preveri imena tabel:**

   ```bash
   node check-database-info.js
   ```

2. **Preveri database URL:**

   ```bash
   node check-neon-status.js
   ```

3. **Poglej SQL log:**
   - Neon Console → SQL Editor → Query History

---

**Ustvarjeno:** 2026-03-25  
**Baza:** Neon PostgreSQL  
**Projekt:** ep-fragrant-hill-amwub3uk  
**ORM:** Drizzle ORM
