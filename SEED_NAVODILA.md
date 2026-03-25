# 🎸 THE DRINKERS - HITRA NAVODILA ZA SEED

## ✅ Stanje: VSE TABELE SO USTVARJENE

---

## 🚀 IZVEDBA SEEDA (3 koraki)

### 1️⃣ Odpri Neon SQL Editor

```
https://console.neon.tech/
```

- Prijavi se
- Izberi projekt: **ep-fragrant-hill-amwub3uk**
- Klikni **SQL Editor** (levi meni)

---

### 2️⃣ Kopiraj SQL

Odpri datoteko: `seed-database.sql`

Kopiraj VSEBINO cele datoteke.

---

### 3️⃣ Prilepi in Zaženi

- Prilepi SQL v Neon SQL Editor
- Klikni **Run** (ali Ctrl+Enter)

---

## ✅ Rezultat

Ko se uspešno izvede, boš videl:

```
 table_name  | count
-------------+-------
 Products    |   3
 Tour Dates  |   3
 Albums      |   3
 VIP Tiers   |   3
 Fan Art     |   2
```

---

## 📊 Kaj Bomo Dobili

### 🛍️ Products (3)

- The Drinkers Classic T-Shirt (€29.99)
- The Drinkers Hoodie Black (€59.99)
- Tour 2026 Poster (€19.99)

### 🎫 Tour Dates (3)

- Orto Bar, Ljubljana (15.4.2026)
- Kino Šiška, Ljubljana (20.4.2026)
- O2 Academy, London (1.8.2026)

### 💿 Albums (3)

- First Round (2020)
- Midnight Sessions (2022)
- Tour 2026 (2026)

### 👑 VIP Tiers (3)

- Bronze Member (€9.99/mes)
- Silver Member (€19.99/mes)
- Gold Member (€29.99/mes)

### 🎨 Fan Art (2)

- The Drinkers Live (drawing)
- Band Portrait (oil painting)

---

## 🔍 Verifikacija

Po seedu zaženi:

```bash
node check-database-info.js
```

Videti bi moral vse tabele s pravilnimi imeni.

---

## 🆘 Težave?

### "relation does not exist"

- Imena tabel so **PascalCase**: `Product`, `Album`, `TourDate`
- Uporabi `seed-database.sql` ki ima pravilna imena

### "authentication token is not valid"

- Uporabi SQL Editor namesto REST API
- API key ni pravega formata za REST

### Napačna baza?

- Preveri `DATABASE_URL` v `.env`
- Uporabi Neon Console za izbiro prave baze

---

## 📞 Kontakt

Če potrebuješ pomoč:

1. Preveri `DATABASE_SETUP.md`
2. Preveri `DATABASE_FINAL_STATUS.md`
3. Zaženi `node check-database-info.js`

---

**Ustvarjeno:** 2026-03-25  
**Čas za seed:** ~2 minuti  
**Težavnost:** Enostavno ⭐
