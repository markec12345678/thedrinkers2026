# 📊 Database Verification Report - KORAK 4

## ✅ Status: PRIPRAVLJENO

Vse migracije so generirane in pripravljene za namestitev v bazo.

---

## 📋 Navodila za Verifikacijo

### 1️⃣ **Posodobi DATABASE_URL**

Najprej posodobi `.env` datoteko s pravimi Neon credentials:

```bash
# Odpri .env
notepad .env

# Zamenjaj placeholder geslo z pravim
DATABASE_URL=postgresql://thedrinkers_user:YOUR_REAL_PASSWORD@ep-cool-darkness-123456.us-east-2.aws.neon.tech/thedrinkers?sslmode=require
```

### 2️⃣ **Zaženi Migracije**

```bash
cd F:\thedrinkers\the

# Option A: Uporabi drizzle-kit (priporočeno)
npm run db:migrate

# Option B: Ročno s psql
psql "postgresql://thedrinkers_user:YOUR_PASSWORD@ep-xxx.us-east-2.aws.neon.tech/thedrinkers?sslmode=require"
\i drizzle/migrations/0000_colorful_warbound.sql
\i drizzle/migrations/0001_elite_mojo.sql
\i drizzle/migrations/0002_cuddly_thundra.sql
```

### 3️⃣ **Verificiraj Tabele**

```bash
# Odpri Drizzle Studio
npm run db:studio
# Odpri browser: http://localhost:5555

# ALI uporabi psql
psql "your-database-url" -f drizzle/verify-database.sql
```

---

## 📊 Pričakovane Tabele (20)

| #   | Tabela               | Status | Opis                     |
| --- | -------------------- | ------ | ------------------------ |
| 1   | `user`               | ✅     | Better Auth uporabniki   |
| 2   | `session`            | ✅     | Better Auth seje         |
| 3   | `account`            | ✅     | Better Auth accounti     |
| 4   | `verification`       | ✅     | Better Auth verifikacije |
| 5   | `mcp_server`         | ✅     | MCP server konfiguracije |
| 6   | `thread`             | ✅     | AI conversation threadi  |
| 7   | `message`            | ✅     | AI sporočila             |
| 8   | `product`            | ✅     | Merch produkti           |
| 9   | `order`              | ✅     | Naročila                 |
| 10  | `order_item`         | ✅     | Postavke naročil         |
| 11  | `tour_date`          | ✅     | Koncertni datumi         |
| 12  | `album`              | ✅     | Glasbeni albumi          |
| 13  | `song`               | ✅     | Pesmi                    |
| 14  | `fan_art`            | ✅     | Fan art gallery          |
| 15  | `fan_art_like`       | ✅     | Lajki na fan art         |
| 16  | `vip_membership`     | ✅     | VIP članstva             |
| 17  | `vip_tier`           | ✅     | VIP nivoji (seeded)      |
| 18  | `user_reward`        | ✅     | Uporabniške nagrade      |
| 19  | `user_points`        | ✅     | Točke zvestobe           |
| 20  | `points_transaction` | ✅     | Transakcije točk         |

---

## 🔍 SQL Skripta za Verifikacijo

Ustvarjena je skripta `drizzle/verify-database.sql` ki vsebuje:

1. **Pregled vseh tabel** (`\dt`)
2. **Struktura tabel** (`\d tablename`)
3. **Število vrstic** (COUNT za vsako tabelo)
4. **VIP Tierji** (preveri seed data)
5. **Indexi** (50+ indexov)
6. **Foreign Keys** (relacije med tabelami)
7. **Relacije** (Drizzle ORM)
8. **Loyalty Program** (točke in transakcije)
9. **VIP Članstva** (statistika)
10. **Fan Art Gallery** (submissions)
11. **Migracije** (zgodovina)
12. **Velikost tabel** (storage)

---

## 🎯 Pričakovani Output

### VIP Tierji (Seed Data):

```
name       | display_name     | price | price_yearly | discount_percentage
-----------|------------------|-------|--------------|--------------------
bronze     | Bronze Fan       | 9.99  | 99.99        | 10
silver     | Silver Supporter | 19.99 | 199.99       | 15
gold       | Gold Member      | 49.99 | 499.99       | 20
platinum   | Platinum VIP     | 99.99 | 999.99       | 25
```

### Število Indexov:

```
Expected: 50+ indexov za performance
- product_category_idx
- product_featured_idx
- order_user_id_idx
- order_status_idx
- tour_date_date_idx
- album_release_date_idx
- ... in še 44 več
```

### Foreign Keys:

```
Expected: 15+ foreign key relacij
✅ session.user_id → user.id (cascade)
✅ order.user_id → user.id (cascade)
✅ order_item.product_id → product.id (restrict)
✅ song.album_id → album.id (set null)
✅ fan_art.user_id → user.id (cascade)
✅ vip_membership.user_id → user.id (cascade)
```

---

## 🚀 Hitra Verifikacija

```sql
-- 1. Preštej vse tabele
SELECT COUNT(*) AS table_count
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_type = 'BASE TABLE';

-- Pričakovano: 20

-- 2. Preštej indexe
SELECT COUNT(*) AS index_count
FROM pg_indexes
WHERE schemaname = 'public';

-- Pričakovano: 50+

-- 3. Preveri VIP tierje
SELECT name, display_name, price
FROM vip_tier
ORDER BY priority;

-- Pričakovano: 4 tierji
```

---

## ⚠️ Pogoste Težave

### 1. "Connection refused"

**Rešitev:** Preveri DATABASE_URL v `.env`

### 2. "relation already exists"

**Rešitev:** Tabele že obstajajo, preskoči migracijo

### 3. "permission denied"

**Rešitev:** Preveri da imaš prave credentials za Neon

### 4. "SSL connection required"

**Rešitev:** Dodaj `?sslmode=require` na DATABASE_URL

---

## 📝 Naslednji Koraki

Ko so tabele uspešno ustvarjene:

1. ✅ **KORAK 5**: Seedanje testnih podatkov
2. ✅ **KORAK 6**: Testiranje API endpointov
3. ✅ **KORAK 7**: Integracija s frontendom

---

## 📞 Podpora

Če naletiš na težave:

1. Preveri `drizzle/verify-database.sql` za detajlne SQL ukaze
2. Odpri Drizzle Studio: `npm run db:studio`
3. Preglej log: `.odam/logs/`

---

**Narejeno:** 25. Marec 2026  
**Status:** ✅ PRIPRAVLJENO  
**Migracije:** 3 datoteke  
**Tabele:** 20  
**Indexi:** 50+
