# ✅ DATABASE SEEDED - THE DRINKERS

**Datum:** 2026-03-25  
**Status:** ✅ USPEŠNO IZVEDENO

---

## 📊 Seed Results

| Tabela        | Število | Status                   |
| ------------- | ------- | ------------------------ |
| **product**   | 3       | ✅                       |
| **tour_date** | 3       | ✅                       |
| **album**     | 3       | ✅                       |
| **vip_tier**  | 3       | ✅                       |
| **fan_art**   | 0       | ⏭️ Skipped (needs users) |

**Skupaj:** 12 vrstic vstavljenih

---

## 🛍️ Products (3)

| Name                         | Price  | Category |
| ---------------------------- | ------ | -------- |
| The Drinkers Classic T-Shirt | €29.99 | t-shirt  |
| The Drinkers Hoodie          | €59.99 | hoodie   |
| Tour 2026 Poster             | €19.99 | poster   |

---

## 🎫 Tour Dates (3)

| Venue      | City      | Date       | Status    |
| ---------- | --------- | ---------- | --------- |
| Orto Bar   | Ljubljana | 2026-04-15 | on_sale   |
| Kino Šiška | Ljubljana | 2026-04-20 | on_sale   |
| O2 Academy | London    | 2026-08-01 | announced |

---

## 💿 Albums (3)

| Title             | Release Date | Genre             |
| ----------------- | ------------ | ----------------- |
| First Round       | 2020-03-15   | Rock, Alternative |
| Midnight Sessions | 2022-06-20   | Rock, Blues Rock  |
| Tour 2026         | 2026-03-01   | Rock, Alternative |

---

## 👑 VIP Tiers (3)

| Tier   | Price/Month | Benefits                                 |
| ------ | ----------- | ---------------------------------------- |
| Bronze | €9.99       | Early access, 10% discount               |
| Silver | €19.99      | Early access, 20% discount, Meet & greet |
| Gold   | €29.99      | All perks, 30% discount, Backstage       |

---

## 🚀 Kako Ponoviti Seed

```bash
cd f:\thedrinkers\the
node seed-minimal.js
```

Ali ročno v Neon SQL Editor:

1. Odpri https://console.neon.tech/
2. Izberi projekt
3. Odpri SQL Editor
4. Kopiraj vsebino iz `seed-clean.sql`
5. Zaženi

---

## 📝 Opombe

- **fan_art** tabela ni bila seedana ker potrebuje `user_id`
- Ko boš ustvaril uporabnike, lahko dodaš fan art
- Vse cene so v EUR
- Vse date so v formatu YYYY-MM-DD

---

## 🎯 Naslednji Koraki

1. ✅ Database je seedana
2. ⏳ Ustvari testne uporabnike (če želiš)
3. ⏳ Dodaj fan art (ko so uporabniki)
4. ⏳ Testiraj aplikacijo

---

## 📞 Verifikacija

```bash
# Preveri stanje
node check-if-seed-needed.js

# Prikaži podatke
node check-existing-data.js
```

---

**Git Commit:** `d974fef`  
**Seed Script:** `seed-minimal.js`  
**Database:** Neon PostgreSQL  
**Status:** ✅ READY FOR USE
