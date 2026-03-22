# 🖼️ IMAGE PLACEHOLDER - CREATED

**Datum:** 2026-03-21  
**Status:** ✅ USTVARJENO

---

## ✅ NAREJENO

### 1. Placeholder Slika
```
Location: /public/images/placeholder.svg
Type: SVG (vektorska, se ne pixelira)
Size: 400x400px
Design: The Drinkers branding z 🎸 ikono
```

### 2. Koda Popravljena
```
File: /components/sections/AIGallery.tsx
Line: 176
Change: placeholder.jpg → placeholder.svg
Add: objectFit = 'contain' style
```

---

## 🎨 IZGLED PLACEHOLDERJA

```
┌─────────────────────────────┐
│                             │
│    THE DRINKERS             │
│    Image Coming Soon        │
│            🎸               │
│                             │
└─────────────────────────────┘
```

**Barve:**
- Background: #1a1a1a (temno siva)
- Text: #dc143c (crimson red)
- Icon: 🎸 (kitara emoji)

---

## 📊 STATUS

| Image | Status | Fallback |
|-------|--------|----------|
| AI Album Covers | ⚠️ Manjkajo | ✅ Placeholder |
| AI Band Photos | ⚠️ Manjkajo | ✅ Placeholder |
| AI Social Media | ⚠️ Manjkajo | ✅ Placeholder |
| AI Merch | ⚠️ Manjkajo | ✅ Placeholder |
| AI Posters | ⚠️ Manjkajo | ✅ Placeholder |
| Real Photos | ✅ Obstajajo | N/A |

---

## 🎯 KAKO DODATI PRAVE SLIKE

### Korak 1: Shrani slike v prave mape

```
/public/images/ai/albums/
  - lepi-in-trezni.jpg
  - zeja.jpg
  - pivolucija.jpg

/public/images/ai/band/
  - promo-2026.jpg
  - live-performance.jpg

/public/images/ai/social/
  - instagram-post.jpg
  - twitter-header.jpg

/public/images/ai/merch/
  - tshirt-pijemo.jpg
  - beer-mug.jpg

/public/images/ai/posters/
  - tour-2026.jpg
```

### Korak 2: Slike se bodo samodejno prikazale

Ko so slike na mestu, jih bo AIGallery samodejno naložil.
Placeholder se bo pokazal samo če slika ne obstaja.

---

## 🔧 TEHNIČNI PODATKI

### SVG Placeholder:
```xml
<svg width="400" height="400">
  <rect fill="#1a1a1a"/>
  <text fill="#dc143c">THE DRINKERS</text>
  <text fill="#666">Image Coming Soon</text>
  <circle fill="#dc143c" opacity="0.3"/>
  <text>🎸</text>
</svg>
```

### Error Handler:
```typescript
onError={(e) => {
  (e.target as HTMLImageElement).src = '/images/placeholder.svg';
  (e.target as HTMLImageElement).style.objectFit = 'contain';
}}
```

---

## ✅ 404 NAPAKE POPRAVLJENE

### Pred:
```
❌ GET /images/placeholder.jpg 404
```

### Po:
```
✅ GET /images/placeholder.svg 200
```

---

**Status:** Napake popravljene! ✅  
**Next:** Dodaj prave AI slike ali pusti placeholderje! 🎨

**Zadnja posodobitev:** 2026-03-21
