# 🖼️ SLIKE - POPRAVLJENO

**Datum:** 2026-03-21  
**Status:** ✅ VSE SLIKE NA PRAVEM MESTU

---

## ✅ NAREJENO

### 1. Slike Kopirane iz `/slike` v `/public/images`

```
IZ: F:\thedrinkers\the\slike/
V:  F:\thedrinkers\the\public\images/
```

### 2. Hero Slike
```
✅ fYCYAwUFeR4xUvVR.webp → /public/images/hero/hero-bg.webp
✅ Cdmnf35W9ALh8Zob.webp → /public/images/hero/hero-alt.webp
```

### 3. Band Member Slike
```
✅ download.jpeg → /public/images/band-members/member-1.jpg
✅ download (1).jpeg → /public/images/band-members/member-2.jpg
✅ download (2).jpeg → /public/images/band-members/member-3.jpg
✅ download (3).jpeg → /public/images/band-members/member-4.jpg
✅ download (4).jpeg → /public/images/band-members/member-5.jpg
```

### 4. Gallery Slike
```
✅ images.jpeg → /public/images/gallery/concert-1.jpg
✅ images (1).jpeg → /public/images/gallery/concert-2.jpg
✅ images (2).jpeg → /public/images/gallery/backstage-1.jpg
✅ images (3).jpeg → /public/images/gallery/backstage-2.jpg
✅ images (4).jpeg → /public/images/gallery/promo-1.jpg
```

---

## 📊 STRUKTURA

```
/public/images/
├── hero/
│   ├── hero-bg.webp ✅ (glavna hero slika)
│   ├── hero-alt.webp ✅ (alternativa)
│   └── hero-main.webp ✅
├── band-members/
│   ├── member-1.jpg ✅
│   ├── member-2.jpg ✅
│   ├── member-3.jpg ✅
│   ├── member-4.jpg ✅
│   └── member-5.jpg ✅
├── gallery/
│   ├── concert-1.jpg ✅
│   ├── concert-2.jpg ✅
│   ├── backstage-1.jpg ✅
│   ├── backstage-2.jpg ✅
│   └── promo-1.jpg ✅
├── albums/ ✅
├── events/ ✅
└── ... (ostale mape)
```

---

## 🎯 KJE SE UPORABLJAJO

### Hero Slike:
```typescript
// components/sections/HeroNew.tsx
<Image
  src="/images/hero/hero-bg.webp"
  alt="The Drinkers - Slovenian Booze Rock Band"
  fill
  priority
  quality={90}
/>
```

### Band Members:
```typescript
// components/sections/AboutSection.tsx (pričakovano)
<img src="/images/band-members/member-1.jpg" />
```

### Gallery:
```typescript
// components/sections/GalleryGrid.tsx (pričakovano)
<img src="/images/gallery/concert-1.jpg" />
```

---

## 🔧 DRUGE SLIKE KI MANJKAJO

### Strani ki potrebujejo hero slike:

| Stran | Hero Image Path | Status |
|-------|----------------|--------|
| `/tour` | `/images/tour-hero.jpg` | ⚠️ Manjka |
| `/music` | `/images/music-hero.jpg` | ⚠️ Manjka |
| `/merch` | `/images/merch-hero.jpg` | ⚠️ Manjka |
| `/about` | `/images/about-hero.jpg` | ⚠️ Manjka |
| `/contact` | `/images/contact-hero.jpg` | ⚠️ Manjka |
| `/gallery` | `/images/gallery-hero.jpg` | ⚠️ Manjka |
| `/blog` | `/images/blog-hero.jpg` | ⚠️ Manjka |
| `/media` | `/images/podcast-hero.jpg` | ⚠️ Manjka |
| `/bar` | `/images/bar-hero.jpg` | ⚠️ Manjka |

---

## 📝 REŠITEV ZA MANJKAJOČE SLIKE

### Opcija 1: Uporabi Obstoječe Slike

```bash
# Kopiraj hero-bg.webp za vse strani
copy public\images\hero\hero-bg.webp public\images\tour-hero.jpg
copy public\images\hero\hero-bg.webp public\images\music-hero.jpg
copy public\images\hero\hero-bg.webp public\images\merch-hero.jpg
# ... itd
```

### Opcija 2: Ustvari Nove z AI

```bash
# Uporabi AI image generation script
node scripts/admin-generate-ai-images.js
```

### Opcija 3: Uporabi Placeholder

```typescript
// Začasno uporabi placeholder.svg
<img src="/images/placeholder.svg" alt="Coming Soon" />
```

---

## ✅ CHECKLIST

### Slike ki so na mestu:
```
✅ Hero slike (3)
✅ Band member slike (5)
✅ Gallery slike (5)
✅ Placeholder SVG (1)
```

### Slike ki manjkajo:
```
⚠️ Tour hero (1)
⚠️ Music hero (1)
⚠️ Merch hero (1)
⚠️ About hero (1)
⚠️ Contact hero (1)
⚠️ Gallery hero (1)
⚠️ Blog hero (1)
⚠️ Media hero (1)
⚠️ Bar hero (1)
```

---

## 🎯 NEXT STEPS

### Takoj (15 min):
```
1. ✅ Hero slike so na mestu
2. ✅ Band member slike so na mestu
3. ✅ Gallery slike so na mestu
4. ⏳ Dodaj manjkajoče hero slike
```

### Danes (1 ura):
```
1. ⏳ Ustvari AI slike za manjkajoče heroje
2. ⏳ Testiraj vse strani
3. ⏳ Preveri da se vse slike naložijo
```

---

## 📞 TEHNIČNI PODATKI

### Originalne Lokacije:
```
/slike/ (source folder)
  - 14 slik
  - Različni formati (webp, jpeg)
  - Različne velikosti
```

### Nove Lokacije:
```
/public/images/hero/ (3 slike)
/public/images/band-members/ (5 slik)
/public/images/gallery/ (5 slik)
/public/images/placeholder.svg (1 slika)
```

### Formati:
```
✅ .webp (optimized for web)
✅ .jpeg (standard)
✅ .svg (vector placeholder)
```

---

## 🚀 HITRE KOMANDE

### Kopiraj vse slike naenkrat:
```bash
cd F:\thedrinkers\the

# Hero
copy slike\*.webp public\images\hero\ /Y

# Band members
copy slike\download*.jpeg public\images\band-members\ /Y

# Gallery
copy slike\images*.jpeg public\images\gallery\ /Y
```

### Preveri če slike obstajajo:
```bash
dir public\images\hero\*.webp
dir public\images\band-members\*.jpg
dir public\images\gallery\*.jpg
```

---

**Status:** Vse slike iz `/slike` so na pravem mestu! ✅  
**Next:** Dodaj manjkajoče hero slike za ostale strani! 🎨

**Zadnja posodobitev:** 2026-03-21
