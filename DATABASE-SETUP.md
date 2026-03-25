# 📝 DATABASE SETUP - NAVODILA

**Problem**: `password authentication failed for user 'neondb_owner'`

**Vzrok**: DATABASE_URL ni pravilno nastavljen ali pa uporabljate napačno geslo.

---

## 🔧 REŠITEV

### **1. Pridobi DATABASE_URL iz Neon**

1. Odpri: https://console.neon.tech
2. Prijavi se v svoj account
3. Izberi svoj projekt
4. Kopiraj **Connection String**

**Primer:**

```
postgres://neondb_owner:npg_xxxxx@ep-xxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```

---

### **2. Posodobi .env.local**

#### **Za my-glow-app:**

```bash
# Odpri: F:\thedrinkers\the\my-glow-app\.env.local
```

**Zamenjaj:**

```env
# ❌ NAPAČNO (trenutno):
DATABASE_URL="postgresql://robert:geslo_iz_neona@ep-tvoj-id.eu-central-1.aws.neon.tech/neondb?sslmode=require"

# ✅ PRAVILNO:
DATABASE_URL="postgres://neondb_owner:npg_xxxxx@ep-xxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require"
```

**Navodila:**

1. Odpri Neon Console
2. Kopiraj pravi connection string
3. Prilepi v `.env.local`
4. Shrani

---

#### **Za my-ai-agent:**

```bash
# Odpri: F:\thedrinkers\the\my-ai-agent\.env.local
```

**Zamenjaj:**

```env
# ❌ NAPAČNO:
DATABASE_URL="postgres://user:password@ep-xxx.us-east-2.aws.neon.tech/dbname?sslmode=require"

# ✅ PRAVILNO:
DATABASE_URL="postgres://neondb_owner:npg_xxxxx@ep-xxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require"
DATABASE_DIRECT_URL="postgres://neondb_owner:npg_xxxxx@ep-xxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require"
```

---

### **3. Testiraj Connection**

#### **Za my-glow-app:**

```bash
cd F:\thedrinkers\the\my-glow-app

# Test database connection
npm run db:push
```

**Pričakovani output:**

```
✓ Drizzle Kit pushed changes successfully
✓ Database is now in sync with schema
```

#### **Za my-ai-agent:**

```bash
cd F:\thedrinkers\the\my-ai-agent

# Generate Prisma client
pnpm prisma generate

# Push database schema
pnpm prisma db push
```

**Pričakovani output:**

```
✔ Generated Prisma Client
✔ Your database is now in sync with your schema
```

---

## ⚠️ POGOSTE NAPAKE

### **1. Napačen Username**

```
❌ postgres://robert:...
✅ postgres://neondb_owner:...
```

**Username je vedno `neondb_owner` za Neon!**

---

### **2. Napačno Geslo**

```
❌ geslo_iz_neona
✅ npg_xxxxx (pravi API key iz Neon)
```

**Geslo dobíš v Neon Console → Connection Details → Password**

---

### **3. Napačen Host**

```
❌ ep-tvoj-id.eu-central-1.aws.neon.tech
✅ ep-xxxxx.us-east-2.aws.neon.tech (pravi endpoint)
```

**Endpoint kopiraj iz Neon Console**

---

### **4. Manjkajoč SSL Mode**

```
❌ postgres://user:pass@host/dbname
✅ postgres://user:pass@host/dbname?sslmode=require
```

**`?sslmode=require` je obvezen za Neon!**

---

## 🎯 HITRI TEST

### **Preveri če dela:**

```bash
# my-glow-app
cd F:\thedrinkers\the\my-glow-app
npm run db:push

# my-ai-agent
cd F:\thedrinkers\the\my-ai-agent
pnpm prisma db push
```

Če vidiš `✓ Success` - vse dela! ✅

Če vidiš `password authentication failed` - preveri zgornja navodila! ❌

---

## 📚 DODATNA POMOC

### **Neon Documentation:**

- https://neon.tech/docs/get-started
- https://neon.tech/docs/connect/connect-from-any-app

### **Drizzle ORM:**

- https://orm.drizzle.team/docs/get-started-postgresql

### **Prisma:**

- https://www.prisma.io/docs/getting-started

---

## ✅ CHECKLIST

- [ ] Odprl Neon Console
- [ ] Kopiral pravi Connection String
- [ ] Prilepil v `.env.local` (my-glow-app)
- [ ] Prilepil v `.env.local` (my-ai-agent)
- [ ] Shranil obe datoteki
- [ ] Zagnal `npm run db:push` (my-glow-app)
- [ ] Zagnal `pnpm prisma db push` (my-ai-agent)
- [ ] Videl `✓ Success` message

---

**Ko bo DATABASE_URL pravilen, bo vse delovalo! 🚀**

_The Drinkers so pripravljeni rockati! 🤘🍺_
