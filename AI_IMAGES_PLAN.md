# 🎨 AI SLIKE ZA THE DRINKERS - PREDLOGI

**Kam umestiti AI generirane slike in kaj narediti z njimi**

---

## 📊 TRENUTNO STANJE SPLETNE STRANI:

### **Glavna stran (/):**

```
✅ Hero section (HeroNew)
✅ Music Grid (Albumi)
✅ Tour Calendar (Koncerti)
✅ About Section (O skupini)
✅ Music Videos (Videi)
✅ Gallery Grid (Galerija)
✅ Merch Carousel (Merch)
✅ Contact Section (Kontakt)
✅ Newsletter Section
```

---

## 🎨 KAM UMESTITI SLIKE:

### **1. ALBUM COVERS** 📀

**Lokacije:**

```
/app/music/page.tsx
/components/sections/MusicGrid.tsx
/components/features/AlbumTimeline.tsx
/components/features/Album3DShowcase.tsx
```

**Kam dati:**

```
public/images/albums/
├── album-na-zdravje.jpg
├── album-30let.jpg
├── album-zeja.jpg
├── album-pivolucija.jpg
├── album-prohibicija.jpg
└── album-hajdi.jpg
```

**Uporaba:**

```jsx
// V komponentah
<Image
  src="/images/albums/album-na-zdravje.jpg"
  alt="Na Zdravje Album"
  width={400}
  height={400}
/>
```

---

### **2. BAND PHOTOS** 📸

**Lokacije:**

```
/app/about/page.tsx
/components/sections/AboutSection.tsx
/app/gallery/page.tsx
/components/sections/GalleryGrid.tsx
```

**Kam dati:**

```
public/images/band/
├── band-photo-1.jpg
├── band-photo-2.jpg
├── band-live-1.jpg
├── band-live-2.jpg
└── band-studio.jpg
```

**Uporaba:**

```jsx
// About section
<img
  src="/images/band/band-photo-1.jpg"
  alt="The Drinkers Band Photo"
  className="rounded-lg shadow-2xl"
/>
```

---

### **3. CONCERT POSTERS** 🎫

**Lokacije:**

```
/app/tour/page.tsx
/components/sections/TourCalendar.tsx
/app/social-campaign/page.tsx
```

**Kam dati:**

```
public/images/tour/
├── tour-2026-poster.jpg
├── concert-announcement.jpg
└── coming-soon-graphic.jpg
```

**Uporaba:**

```jsx
// Tour page
<div className="tour-poster">
  <img src="/images/tour/tour-2026-poster.jpg" />
</div>
```

---

### **4. SOCIAL MEDIA GRAPHICS** 📱

**Lokacije:**

```
/app/social-campaign/page.tsx
/components/sections/SocialMediaCampaign.tsx
```

**Kam dati:**

```
public/images/social/
├── instagram/
│   ├── post-1.jpg
│   ├── post-2.jpg
│   └── story-1.jpg
├── facebook/
│   ├── post-1.jpg
│   └── cover.jpg
└── twitter/
    └── post-1.jpg
```

---

### **5. MERCH BACKGROUNDS** 👕

**Lokacije:**

```
/app/merch/page.tsx
/components/merch/MerchProductCard.tsx
```

**Kam dati:**

```
public/images/merch/
├── tshirt-background.jpg
├── hoodie-background.jpg
└── product-display.jpg
```

---

## 🚀 AKCIJSKI NAČRT:

### **FAZA 1: Generiranje (30-50 min)**

```bash
# 1. Generiraj vse slike
cd F:\thedrinkers\the
python local-sd-generate.py

# Rezultat: 10+ slik v public/images/generated/
```

---

### **FAZA 2: Organizacija (10 min)**

```bash
# Premakni slike na prava mesta
mkdir public/images/albums
mkdir public/images/band
mkdir public/images/tour
mkdir public/images/social

# Premakni generirane slike
move public/images/generated/album-*.jpg public/images/albums/
move public/images/generated/band-*.jpg public/images/band/
move public/images/generated/tour-*.jpg public/images/tour/
```

---

### **FAZA 3: Update Komponent (20 min)**

**1. Updateaj MusicGrid:**

```jsx
// components/sections/MusicGrid.tsx
const albums = [
  {
    title: "Na Zdravje",
    cover: "/images/albums/album-na-zdravje.jpg", // ✅ New
  },
  // ... more albums
];
```

**2. Updateaj AboutSection:**

```jsx
// components/sections/AboutSection.tsx
<img
  src="/images/band/band-photo-1.jpg" // ✅ New
  alt="The Drinkers"
/>
```

**3. Updateaj TourCalendar:**

```jsx
// components/sections/TourCalendar.tsx
<div className="tour-poster">
  <img src="/images/tour/tour-2026-poster.jpg" /> // ✅ New
</div>
```

---

### **FAZA 4: Testiraj (10 min)**

```bash
# Zaženi development server
npm run dev

# Odpri brskalnik
http://localhost:3000

# Preveri:
✅ /music - Album covers
✅ /about - Band photos
✅ /tour - Tour posters
✅ / - Homepage
```

---

## 📋 SPECIFIČNI PREDLOGI:

### **1. Homepage Hero** 🏠

**Trenutno:**

```jsx
<HeroNew />
```

**Predlog:**

```jsx
// Generiraj epic hero background
const heroBackground = "/images/hero/hero-epic.jpg"

// Prompt za AI:
"epic rock concert hero background, dramatic stage lighting,
crowd silhouettes, red and black colors, professional photography"
```

---

### **2. Music Section** 🎵

**Trenutno:**

```jsx
<MusicGrid />
```

**Predlog:**

```jsx
// Generiraj album covers za vse albume
const albums = [
  { title: "Lepi in trezni", cover: "/images/albums/lepi-in-trezni.jpg" },
  { title: "Žeja", cover: "/images/albums/zeja.jpg" },
  { title: "Pivolucija", cover: "/images/albums/pivolucija.jpg" },
  { title: "Prohibicija", cover: "/images/albums/prohibicija.jpg" },
]

// Prompt za AI:
"rock album cover design, vinyl record aesthetic, dramatic lighting,
professional album artwork, high quality"
```

---

### **3. Tour Section** 🎫

**Trenutno:**

```jsx
<TourCalendar />
```

**Predlog:**

```jsx
// Generiraj tour poster
const tourPoster = "/images/tour/tour-2026-main-poster.jpg"

// Prompt za AI:
"rock concert tour poster 2026, bold typography, dramatic red and black
colors, guitar imagery, professional concert poster design"
```

---

### **4. About Section** 👥

**Trenutno:**

```jsx
<AboutSection />
```

**Predlog:**

```jsx
// Generiraj band photo
const bandPhoto = "/images/band/band-professional-2026.jpg"

// Prompt za AI:
"professional rock band photo, 5 band members with instruments,
dramatic studio lighting, dark background, high contrast"
```

---

### **5. Gallery Section** 🖼️

**Trenutno:**

```jsx
<GalleryGrid />
```

**Predlog:**

```jsx
// Generiraj gallery images
const galleryImages = [
  "/images/gallery/live-concert-1.jpg",
  "/images/gallery/live-concert-2.jpg",
  "/images/gallery/backstage-1.jpg",
]

// Prompt za AI:
"live rock concert photography, dramatic stage lighting,
crowd energy, professional concert photos"
```

---

## 🎨 GENERIRAJ TE SLIKE:

### **Script za generiranje:**

```python
# local-sd-generate.py - Dodaj te prompte

PROMPTS = [
    # Album covers (5)
    {
        "name": "album-na-zdravje",
        "prompt": "dark moody rock album cover, vinyl record on turntable, crimson red spotlight, guitar silhouette, dramatic lighting, professional photography, high quality, detailed",
        "width": 1000,
        "height": 1000,
    },

    # Band photos (3)
    {
        "name": "band-photo-live",
        "prompt": "rock band performing on stage, dramatic stage lighting, silhouettes, concert crowd in background, professional concert photography, high energy",
        "width": 1000,
        "height": 667,
    },

    # Tour posters (2)
    {
        "name": "tour-2026-poster",
        "prompt": "rock concert poster design, bold typography, tour 2026 text, dramatic red and black colors, guitar imagery, professional graphic design",
        "width": 1080,
        "height": 1350,
    },
]
```

---

## 📊 PRIORITETE:

### **Priority 1 (Nujno):**

```
✅ Album covers (5 slik)
✅ Band photo (1 slika)
✅ Tour poster (1 slika)
```

**Čas:** ~15 minut  
**Kam:** `public/images/albums/`, `public/images/band/`, `public/images/tour/`

---

### **Priority 2 (Priporočeno):**

```
✅ Gallery images (5 slik)
✅ Social media graphics (5 slik)
```

**Čas:** ~20 minut  
**Kam:** `public/images/gallery/`, `public/images/social/`

---

### **Priority 3 (Opcijsko):**

```
✅ Hero backgrounds (2 sliki)
✅ Merch backgrounds (3 slike)
```

**Čas:** ~15 minut  
**Kam:** `public/images/hero/`, `public/images/merch/`

---

## 🚀 ŽELIŠ DA NAREDIM?

**Izberi:**

**A) Generiraj Priority 1** ⭐ (Recommended)

```
- 5 album covers
- 1 band photo
- 1 tour poster
Čas: 15-20 minut
```

**B) Generiraj vse** (Complete)

```
- Vse album covers
- Vse band photos
- Vse tour posters
- Gallery images
- Social media
Čas: 40-50 minut
```

**C) Pokaži kako** (Tutorial)

```
- Pokažem korake
- Ti generiraš
- Jaz pomagam
```

---

**Kaj želiš?** 🎨🚀

**A)** Generiraj Priority 1  
**B)** Generiraj vse  
**C)** Pokaži kako
