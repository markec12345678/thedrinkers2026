# 🍺 VIP BAR - ZAČASNO ZAPRT

**Datum:** 2026-03-21  
**Status:** ✅ ZAPRTO

---

## ✅ NAREJENO

VIP Bar je trenutno zaprt za javnost. Obiskovalci vidijo sporočilo:

```
🍺 DRINKERS' BAR
TRENUTNO ZAPRTO

VIP Bar je trenutno zaprt zaradi priprave na velik launch!

🚀 PRIPRAVLJAMO NEKAJ POSEBNEGA!
Kmalu odpiramo vrata našega ekskluzivnega VIP bara z:
✅ Ekskluzivne vsebine za fane
✅ Backstage dostop
✅ Meet & Greet priložnosti
✅ Posebne ponudbe in popusti

📧 Prijavi se na newsletter in obvestili te bomo ko odpremo!
```

---

## 🔧 KAKO PONOVO ODPRETI BAR

### Korak 1: Odpri datoteko

```
/components/sections/DrinkersBar.tsx
```

### Korak 2: Spremeni konstanto

```typescript
// ⚠️ TEMPORARY: Bar closed during launch
const BAR_TEMPORARILY_CLOSED = true;  // ← Spremeni v false
```

### Korak 3: Shrani

```typescript
const BAR_TEMPORARILY_CLOSED = false;  // ✅ Bar odprt!
```

### Korak 4: Deployaj

```bash
git add .
git commit -m "Open VIP Bar"
git push
```

---

## 📊 STATUS

| Feature | Status |
|---------|--------|
| Bar Access | 🔒 ZAPRTO |
| Login Form | ❌ Skrit |
| Registration | ❌ Skrit |
| Newsletter CTA | ✅ Viden |
| Coming Soon Message | ✅ Prikazan |

---

## 🎯 KDAJ ODPRETI?

Odpri bar ko:

- ✅ Launch event je končan
- ✅ Vsi launch taski so zaključeni
- ✅ Email blast #1 je poslan
- ✅ Prvi fan-i so registrirani
- ✅ Ekskluzivne vsebine so pripravljene

---

## 📝 OPOMBE

- Newsletter signup še vedno deluje
- Obiskovalci so usmerjeni na newsletter
- Sporočilo je profesionalno in gradi anticipation
- Enostavno vklop/izklop z eno spremembo

---

**Zadnja posodobitev:** 2026-03-21  
**Next:** Odpri bar po launchu! 🎉
