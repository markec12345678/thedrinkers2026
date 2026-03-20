# 🎨 AI Image Generation Guide - The Drinkers

## 📸 Generirane Slike za The Drinkers

### **1. Album Covers**
Uporabi FLUX ali Seedream za visoko-kakovostne naslovnice:

```bash
# Install CLI
curl -fsSL https://cli.inference.sh | sh && infsh login

# Generate Album Cover - "Pijemo ga radi"
infsh app run bytedance/seedream-4-5 --input '{
  "prompt": "Professional rock album cover, crimson red vinyl record on black background, beer mug silhouette, rock band aesthetic, high contrast studio lighting, 4K quality",
  "aspect_ratio": "1:1"
}'

# Generate Album Cover - "Lepi in trezni"
infsh app run falai/flux-2-klein-lora --input '{
  "prompt": "Minimalist rock album artwork, clean design, red and black color scheme, beer glass icon, modern typography space, professional music industry standard",
  "aspect_ratio": "1:1"
}'
```

### **2. Band Photos**
```bash
# Band Promo Photo
infsh app run google/gemini-3-pro-image-preview --input '{
  "prompt": "Professional rock band photo, 5 musicians on stage with instruments, crimson red stage lighting, energetic performance, concert atmosphere, photorealistic, high quality",
  "aspect_ratio": "16:9"
}'

# Individual Member Photos
infsh app run xai/grok-imagine-image --input '{
  "prompt": "Rock musician portrait, lead singer with microphone, stage lighting, dramatic shadows, professional music photography, crimson accent lighting",
  "aspect_ratio": "3:4"
}'
```

### **3. Concert Posters**
```bash
# Tour Poster
infsh app run falai/reve --input '{
  "prompt": "Concert poster for The Drinkers rock band, bold text THE DRINKERS, tour dates 2026, crimson red and black color scheme, beer mug graphic, Slovenian flag colors",
  "aspect_ratio": "2:3"
}'
```

### **4. Social Media Images**
```bash
# Instagram Post
infsh app run bytedance/seedream-4-5 --input '{
  "prompt": "Instagram square post for rock band, guitar and beer mug composition, dark background with crimson highlights, modern social media aesthetic",
  "aspect_ratio": "1:1"
}'

# Twitter Header
infsh app run falai/flux-dev-lora --input '{
  "prompt": "Twitter header banner, rock band branding, crimson red gradient, musical notes and beer icons, professional social media design, 1500x500px",
  "aspect_ratio": "3:1"
}'
```

### **5. Merchandise Mockups**
```bash
# T-Shirt Mockup
infsh app run falai/imagine-art-1-5-pro-preview --input '{
  "prompt": "Black t-shirt mockup with The Drinkers band logo, crimson red print, professional product photography, white background, e-commerce ready",
  "aspect_ratio": "4:5"
}'

# Beer Mug Design
infsh app run google/gemini-2-5-flash-image --input '{
  "prompt": "Custom beer mug with The Drinkers logo, crimson red engraving, professional product shot, studio lighting, transparent background",
  "aspect_ratio": "1:1"
}'
```

---

## 🎯 **Integration v Next.js:**

### **1. Shrani generirane slike:**
```bash
# Save to public/images/ai-generated/
mkdir -p public/images/ai-generated/albums
mkdir -p public/images/ai-generated/band
mkdir -p public/images/ai-generated/social
```

### **2. Uporabi v komponentah:**
```tsx
// components/sections/AIGallery.tsx
import Image from 'next/image';

const aiImages = [
  {
    src: '/images/ai-generated/albums/pijemo-ga-radi.jpg',
    alt: 'Pijemo ga radi - Album Cover',
  },
  // ... more images
];
```

### **3. Dynamic OG Images:**
```tsx
// app/opengraph-image.tsx
export default async function Image() {
  return new ImageResponse(
    <div style={{ /* ... */ }}>
      <img src="/images/ai-generated/band/promo.jpg" />
    </div>
  );
}
```

---

## 📊 **Workflow:**

1. **Generiraj slike** z zgornjimi CLI ukazi
2. **Uredi** v Photoshopu če je potrebno
3. **Optimiziraj** z Topaz upscaler
4. **Shrani** v `public/images/`
5. **Uporabi** v Next.js komponentah

---

## 🔥 **PRIMERI PROMPTOV:**

### **Album Cover:**
```
Professional rock album cover for Slovenian band The Drinkers, 
crimson red and black color scheme, vinyl record aesthetic, 
beer mug silhouette, bold typography, high contrast studio lighting, 
4K quality, music industry standard
```

### **Band Photo:**
```
Professional rock band promotional photo, 5 musicians with instruments 
on dark stage, dramatic crimson red lighting, energetic performance 
moment, concert atmosphere, photorealistic, award-winning music 
photography style
```

### **Concert Poster:**
```
Vintage rock concert poster, The Drinkers band name in bold crimson 
letters, tour dates 2026, Slovenian flag colors, beer mug and guitar 
graphics, distressed texture, screen print aesthetic
```

---

## 🎸 **Za The Drinkers Specifično:**

- **Barve:** Crimson red (#dc143c), Black (#0a0a0a), Silver (#c0c0c0)
- **Elementi:** Beer mugs, guitars, vinyl records, Slovenian flag
- **Stil:** Rock'n'roll, vintage, high contrast, professional
- **Razpoloženje:** Energetic, bold, authentic, Slovenian pride

---

**Generiraj slike in jih dodaj v projekt!** 🤘
