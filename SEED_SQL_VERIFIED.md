# ✅ SEED-DATABASE.SQL - PRAVILNA IMENA

## 📊 Preverjeno: 2026-03-25

### ✅ Pravilna Imena Tabel

| Napačno (PascalCase) | Pravilno (snake_case) | Status |
| -------------------- | --------------------- | ------ |
| `Product`            | `product`             | ✅     |
| `TourDate`           | `tour_date`           | ✅     |
| `Album`              | `album`               | ✅     |
| `VipTier`            | `vip_tier`            | ✅     |
| `FanArt`             | `fan_art`             | ✅     |

---

## 🚀 Kako Uporabiti

### 1. Odpri Neon SQL Editor

```
https://console.neon.tech/
```

### 2. Izberi Projekt

- Projekt: **ep-fragrant-hill-amwub3uk**
- Baza: **neondb**

### 3. Kopiraj seed-database.sql

- Odpri `seed-database.sql`
- Kopiraj celo vsebino

### 4. Prilepi v SQL Editor

- Prilepi SQL
- Klikni **Run** (Ctrl+Enter)

---

## 📊 Pričakovani Output

```
 table_name  | count
-------------+-------
 product     |   3
 tour_date   |   3
 album       |   3
 vip_tier    |   3
 fan_art     |   2
```

---

## ✅ Verifikacija

Po seedu zaženi:

```bash
node verify-seed-tables.js
```

Vse tabele bi morale biti označene z ✅.

---

## 📝 SQL Sintaksa

### JSONB Arrayi

```sql
-- Pravilno:
'["Rock", "Alternative"]'::jsonb

-- Nepravilno:
ARRAY['Rock', 'Alternative']  -- To ne deluje za jsonb
```

### NULL Vrednosti

```sql
-- Pravilno:
NULL

-- Nepravilno:
'NULL'  -- To je string, ne NULL
```

---

## 🆘 Težave?

### "relation does not exist"

- Preveri ime tabele (lowercase snake_case)
- Uporabi `verify-seed-tables.js` za preverbo

### "syntax error at or near"

- Preveri JSONB sintakso: `'[]'::jsonb`
- Preveri NULL vrednosti

### "duplicate key value violates unique constraint"

- Tabele že vsebujejo podatke
- Uporabi `DELETE FROM table_name;` pred seedom

---

## 📞 Kontakt

Če potrebuješ pomoč:

1. Preveri `DATABASE_FINAL_STATUS.md`
2. Preveri `SEED_NAVODILA.md`
3. Zaženi `node verify-seed-tables.js`

---

**Posodobljeno:** 2026-03-25  
**Status:** ✅ Pravilna imena tabel  
**Čas za seed:** ~1 minuta
