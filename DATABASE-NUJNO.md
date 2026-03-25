# 🚨 POMEMBNO: DATABASE SETUP

**Status**: ❌ Manjka pravi Neon endpoint

---

## ⚠️ PROBLEM

Trenutni DATABASE_URL uporablja **placeholder**:

```
❌ postgres://neondb_owner:npg_wyrY9IHd6Rog@ep-xxx.us-east-2.aws.neon.tech/neondb
                                           ^^^^^
                                      PLACEHOLDER!
```

**Potrebuješ PRAVI endpoint iz Neon Console!**

---

## 🔧 REŠITEV

### **1. Odpri Neon Console**

```
https://console.neon.tech
```

### **2. Prijavi se**

- Uporabi svoj account
- Izberi svoj projekt

### **3. Kopiraj Connection String**

1. Klikni **"Connection Details"**
2. Kopiraj celoten string
3. Izgleda takole:

```
postgres://neondb_owner:npg_wyrY9IHd6Rog@ep-abc12345.us-east-2.aws.neon.tech/neondb?sslmode=require
                                 ^^^^^^^^^^
                            PRAVI ENDPOINT!
```

### **4. Prilepi v .env**

#### **Za my-glow-app:**

```bash
# Odpri: F:\thedrinkers\the\my-glow-app\.env
```

**Zamenjaj:**

```env
# ❌ IZBRIŠI TO:
DATABASE_URL="postgres://neondb_owner:npg_wyrY9IHd6Rog@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require"

# ✅ PRAVILNO (prilepi iz Neon):
DATABASE_URL="postgres://neondb_owner:npg_wyrY9IHd6Rog@ep-abc12345.us-east-2.aws.neon.tech/neondb?sslmode=require"
```

#### **Za my-ai-agent:**

```bash
# Odpri: F:\thedrinkers\the\my-ai-agent\.env
```

**Zamenjaj:**

```env
# ❌ IZBRIŠI TO:
DATABASE_URL="postgres://neondb_owner:npg_wyrY9IHd6Rog@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require"
DATABASE_DIRECT_URL="postgres://neondb_owner:npg_wyrY9IHd6Rog@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require"

# ✅ PRAVILNO (prilepi iz Neon):
DATABASE_URL="postgres://neondb_owner:npg_wyrY9IHd6Rog@ep-abc12345.us-east-2.aws.neon.tech/neondb?sslmode=require"
DATABASE_DIRECT_URL="postgres://neondb_owner:npg_wyrY9IHd6Rog@ep-abc12345.us-east-2.aws.neon.tech/neondb?sslmode=require"
```

---

## ✅ TESTIRAJ

### **Ko imaš pravi endpoint:**

```bash
# my-glow-app
cd F:\thedrinkers\the\my-glow-app
npm run db:push

# my-ai-agent
cd F:\thedrinkers\the\my-ai-agent
pnpm prisma db push
```

### **Pričakovani output:**

```
✓ Prisma schema loaded
✓ Datasource "db": PostgreSQL database "neondb"
✓ Database pushed successfully
✓ Your database is now in sync
```

---

## 📋 CHECKLIST

- [ ] Odprl https://console.neon.tech
- [ ] Prijavljen v svoj account
- [ ] Izbral svoj projekt
- [ ] Kliknil "Connection Details"
- [ ] Kopiral celoten connection string
- [ ] Prilepil v `my-glow-app/.env`
- [ ] Prilepil v `my-ai-agent/.env`
- [ ] Shranil obe datoteki
- [ ] Zagnal `npm run db:push` (my-glow-app)
- [ ] Zagnal `pnpm prisma db push` (my-ai-agent)
- [ ] Videl `✓ Success` ✅

---

## 🎯 KLJUČNE TOČKE

### **1. Username:**

```
✅ neondb_owner (vedno to za Neon)
```

### **2. Password:**

```
✅ npg_wyrY9IHd6Rog (tvoj pravi API key iz Neon)
```

### **3. Endpoint:**

```
❌ ep-xxx.us-east-2.aws.neon.tech (PLACEHOLDER!)
✅ ep-abc12345.us-east-2.aws.neon.tech (PRAVI ENDPOINT!)
```

### **4. Database:**

```
✅ neondb (default za Neon)
```

### **5. SSL Mode:**

```
✅ ?sslmode=require (obvezno!)
```

---

## 📞 HELP

Če še vedno ne dela:

1. **Preveri username**: Mora biti `neondb_owner`
2. **Preveri password**: Mora biti pravi API key iz Neon
3. **Preveri endpoint**: Mora biti pravi endpoint (ne xxx!)
4. **Preveri sslmode**: Mora biti `?sslmode=require`

---

**Ko boš prilepil pravi connection string iz Neon, bo vse delovalo! 🚀**

_The Drinkers čakajo na delujočo database! 🤘🍺_
