# 🔑 DATABASE PASSWORD RESET - NAVODILA

**Problem**: `password authentication failed for user 'neondb_owner'`

**Vzrok**: Geslo `npg_wyrY9IHd6Rog` ni pravilno ali pa je poteklo.

---

## ✅ REŠITEV

### **1. Odpri Neon Console**

```
https://console.neon.tech
```

### **2. Resetiraj Password**

1. Prijavi se v Neon
2. Izberi svoj projekt
3. Klikni **"Connection Details"**
4. Klikni **"Reset Password"** ali **"Show Password"**
5. Kopiraj **NOVO geslo**

### **3. Posodobi .env**

#### **Za my-glow-app:**

```bash
# Odpri: F:\thedrinkers\the\my-glow-app\.env
```

**Zamenjaj geslo:**

```env
# ❌ STARO (ne dela):
DATABASE_URL="postgresql://neondb_owner:npg_wyrY9IHd6Rog@ep-fragrant-hill-amwub3uk.us-east-1.aws.neon.tech/neondb?sslmode=require"

# ✅ NOVO (s pravim geslom iz Neon):
DATABASE_URL="postgresql://neondb_owner:npg_NOVO_GESLO@ep-fragrant-hill-amwub3uk.us-east-1.aws.neon.tech/neondb?sslmode=require"
```

---

## 🧪 TESTIRAJ

```bash
cd F:\thedrinkers\the\my-glow-app
npm run db:push
```

**Pričakovani output:**

```
✓ Drizzle Kit pushed changes successfully
✓ Database is now in sync with schema
```

---

## 📋 POMEMBNO

### **my-ai-agent ŽE DELUJE! ✅**

my-ai-agent je uspešno povezan z database! To pomeni da je geslo pravilno zanj.

### **my-glow-app ŠE NE DELA ❌**

Verjetno:

1. ✅ Geslo je pravilno (my-ai-agent dela)
2. ❌ Morda je problem z connection string formatom

---

## 🔧 ALTERNATIVNA REŠITEV

### **Uporabi isto URL kot my-ai-agent:**

Ker my-ai-agent deluje, kopiraj točno isti DATABASE_URL:

**1. Odpri:**

```
F:\thedrinkers\the\my-ai-agent\.env
```

**2. Kopiraj DATABASE_URL:**

```env
DATABASE_URL="postgresql://neondb_owner:npg_wyrY9IHd6Rog@ep-fragrant-hill-amwub3uk-pooler.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
```

**3. Prilepi v my-glow-app/.env:**

```env
DATABASE_URL="postgresql://neondb_owner:npg_wyrY9IHd6Rog@ep-fragrant-hill-amwub3uk-pooler.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
```

**4. Testiraj:**

```bash
cd F:\thedrinkers\the\my-glow-app
npm run db:push
```

---

## ✅ CHECKLIST

- [ ] Odprl Neon Console
- [ ] Preveril pravo geslo
- [ ] Posodobil my-glow-app/.env
- [ ] Uporabil točno isti URL kot my-ai-agent
- [ ] Zagnal `npm run db:push`
- [ ] Videl `✓ Success`

---

**my-ai-agent že deluje, my-glow-app bo tudi! 🚀**

_The Drinkers so pripravljeni! 🤘🍺_
