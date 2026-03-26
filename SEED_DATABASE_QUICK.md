# 🌱 DATABASE SEED - QUICK START

**Napolni bazo s primeri v 30 sekundah**

---

## ⚡ HITRI ZAČETEK

### **1. Preveri database connection**

```bash
# Odpri .env in preveri DATABASE_URL
# Mora biti pravilen Neon PostgreSQL URL
```

### **2. Zaženi seed**

```bash
cd f:\thedrinkers\the
npm run db:seed
```

### **3. Počakaj 30 sekund**

```
🌱 Starting The Drinkers Database Seed...
══════════════════════════════════════════

🛍️  Seeding Products...
✅ 12 products seeded

🎫  Seeding Tour Dates...
✅ 15 tour dates seeded

💿  Seeding Albums...
✅ 4 albums seeded

👑  Seeding VIP Tiers...
✅ 3 VIP tiers seeded

══════════════════════════════════════════
🎉 SEED COMPLETE!
📊 Summary:
   ✅ Products:      12
   ✅ Tour Dates:    15
   ✅ Albums:        4
   ✅ VIP Tiers:     3

🍺 Database is ready for The Drinkers! 🎸
```

---

## 📊 KAJ BO ŠLO V BAZO

### **Products (12)**

```
✅ T-Shirts (2): Classic, Long Sleeve
✅ Hoodies (2): Black, Zip-Up
✅ Poster (1): Tour 2026
✅ Vinyl (1): LP
✅ Accessories (5): Glass, Cap, Tote Bag, Pin Set, Stickers
✅ Music (1): Tour 2026 CD
```

### **Tour Dates (15)**

```
✅ Ljubljana (5): Orto Bar, Kino Šiška, Vžigalica, Metelkova, Cankarjev Dom
✅ Maribor (3): Gromka, Union, Pekarna
✅ Vienna (2): Palace Theatre, Flex Club
✅ Munich (1): Muffatwerk
✅ Berlin (1): Prater Club
✅ Amsterdam (1): Melkweg
✅ Paris (1): La Cigale
✅ London (1): O2 Academy
```

### **Albums (4)**

```
✅ First Round (2020)
✅ Midnight Sessions (2022)
✅ Live at Orto Bar (2024)
✅ Tour 2026 (2026)
```

### **VIP Tiers (3)**

```
✅ Bronze Member (€9.99/month)
✅ Silver Member (€19.99/month)
✅ Gold Member (€29.99/month)
```

---

## 🔧 TEŽAVE?

### **Error: DATABASE_URL not defined**

```
Fix: Dodaj DATABASE_URL v .env
DATABASE_URL=postgresql://...
```

### **Error: relation "product" does not exist**

```
Fix: Najprej zaženi migracije
npm run db:push
npm run db:seed
```

### **Error: Cannot find module '@neondatabase/serverless'**

```
Fix: Namesti dependency
npm install @neondatabase/serverless
```

---

## ✅ VERIFICATION

### **Preveri če je seed uspel:**

```bash
# Odpri Drizzle Studio
npm run db:studio

# Preveri tabele:
- product → 12 rows
- tour_date → 15 rows
- album → 4 rows
- vip_tier → 3 rows
```

### **Ali uporabi SQL:**

```sql
SELECT COUNT(*) FROM product;
SELECT COUNT(*) FROM tour_date;
SELECT COUNT(*) FROM album;
SELECT COUNT(*) FROM vip_tier;
```

---

## 🗑️ CLEAR & RE-SEED

### **Če želiš pobrisati vse in začeti znova:**

```sql
-- POZOR: To pobriše VSE podatke!
DELETE FROM fan_art;
DELETE FROM song;
DELETE FROM vip_membership;
DELETE FROM album;
DELETE FROM tour_date;
DELETE FROM order_item;
DELETE FROM "order";
DELETE FROM product;
```

Nato:

```bash
npm run db:seed
```

---

## 📊 STATUS

**Pred seedom:**

```
❌ Tabele prazne
❌ Ni produktov za testirat
❌ Ni tour dates za prikazat
❌ Ni albumov za music player
```

**Po seedu:**

```
✅ 12 produktov ready
✅ 15 tour dates ready
✅ 4 albumi ready
✅ 3 VIP tiers ready
✅ Lahko testiraš vse komponente
```

---

## 🎯 NEXT STEPS

**Po uspešnem seedu:**

1. ✅ **Testiraj Add to Cart** (5 min)
   - Odpri DARK_MODE_TEST_CHECKLIST.md
2. ✅ **Testiraj Dark Mode** (5 min)
   - Odpri ADD_TO_CART_TEST_CHECKLIST.md

3. ✅ **Odpri /merch page**
   - http://localhost:3000/merch
   - Vidiš bi moral 12 produktov

4. ✅ **Odpri /tour page** (ko bo narejena)
   - Vidiš bi moral 15 koncertov

---

## 💡 TIPS

```
✅ Seed lahko zaženeš večkrat (dodal bo nove vrstice)
✅ Vsi ID-ji so UUID (naključni)
✅ Cene so v EUR
✅ Datumi so pravilni (2026)
✅ Stock je realističen
✅ Featured products so označeni
```

---

**Ready? Just run:** `npm run db:seed` 🚀

**Time:** 30 seconds  
**Impact:** Database full of test data ✅
