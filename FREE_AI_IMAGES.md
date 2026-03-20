# 🎨 FREE AI Image Generation - The Drinkers

## 🆓 100% Brezplačno s Pollinations.ai!

**Brez API ključa. Brez registracije. Brez plačila.**

---

## 🚀 Hitri Začetek

### **Korak 1: Zaženi Scripto**

```bash
cd f:\thedrinkers\the
node scripts/generate-images-free.js
```

### **Korak 2: Slike se Samodejno Shranijo**

```
public/images/ai-generated/
├── albums/
│   ├── lepi-in-trezni.jpg
│   ├── zeja.jpg
│   └── pivolucija.jpg
├── band/
│   ├── band-promo-2026.jpg
│   ├── live-performance.jpg
│   └── backstage-portrait.jpg
├── social/
├── merch/
└── posters/
```

### **Korak 3: Uporabi v Next.js**

```tsx
import Image from 'next/image';

<Image
  src="/images/ai-generated/albums/lepi-in-trezni.jpg"
  alt="Lepi in trezni"
  width={400}
  height={400}
/>
```

---

## 🎯 Kaj Je Pollinations.ai?

**Pollinations.ai** je odprtokodna platforma ki ponuja:

✅ **Popolnoma brezplačno** - Nobenih skritih stroškov  
✅ **Brez registracije** - Ni API ključa potrebnega  
✅ **Brez omejitev** - Generiraj kolikor želiš  
✅ **Visoka kvaliteta** - FLUX model za profesionalne rezultate  
✅ **Enostaven API** - Samo URL pokliči  

---

## 📸 Generirane Slike (18 Total)

### **Albumi (6)**
1. Lepi in trezni - Minimalist crimson design
2. Žeja - Vintage wine glass
3. Pivolucija - Beer revolution
4. Prohibicija - 1920s speakeasy
5. Hajdi - Modern rock energy
6. Recidiv - Dark moody atmosphere

### **Band Photos (3)**
1. Band Promo 2026 - Professional stage photo (1920x1080)
2. Live Performance - Concert action shot (1920x1080)
3. Backstage Portrait - Intimate backstage (1024x768)

### **Social Media (3)**
1. Instagram Post - Square format (1024x1024)
2. Twitter Header - Banner format (1500x500)
3. Facebook Cover - Social cover (820x312)

### **Merchandise (4)**
1. T-Shirt Mockup - Product shot (800x1000)
2. Hoodie Mockup - Apparel photo (1024x1024)
3. Beer Mug - Product mockup (1024x1024)
4. Vinyl Mockup - Record design (1024x1024)

### **Tour Posters (2)**
1. Tour 2026 Poster - Full tour poster (800x1200)
2. Orto Bar Ljubljana - Venue specific (800x1200)

---

## 🔧 Prilagoditev

### **Spremeni Prompte**

Uredi `scripts/generate-images-free.js`:

```javascript
const prompts = {
  albums: [
    {
      name: 'tvoj-album',
      prompt: 'Tvoj opis slike...',
      aspect: '1:1'
    }
  ]
};
```

### **Dodaj Nove Kategorije**

```javascript
const prompts = {
  // ... obstoječe
  wallpapers: [
    {
      name: 'desktop-wallpaper',
      prompt: 'The Drinkers desktop wallpaper...',
      aspect: '16:9'
    }
  ]
};
```

### **Spremeni Velikost**

```javascript
// Aspect ratio to pixels mapping
'1:1'    → 1024x1024  (Instagram)
'16:9'   → 1920x1080  (YouTube, Desktop)
'4:3'    → 1024x768   (Tablet)
'3:1'    → 1500x500   (Twitter Header)
'2:3'    → 800x1200   (Poster)
'4:5'    → 800x1000   (Portrait)
'2.6:1'  → 820x312    (Facebook Cover)
```

---

## 🎨 Prompt Engineering

### **Formula za Dobre Prompte:**

```
[Subject], [Style], [Lighting], [Mood], [Composition], [Quality]
```

### **Primeri:**

**Album Cover:**
```
Professional rock album cover for "Album Name" by The Drinkers, 
Slovenian rock band, crimson red and black color scheme, 
beer glass silhouette, high contrast studio lighting, 
4K quality, music industry standard
```

**Band Photo:**
```
Professional rock band photo, 5 musicians on stage, 
dramatic crimson red stage lighting, energetic performance, 
concert atmosphere, photorealistic, award-winning photography
```

**Concert Poster:**
```
Vintage rock concert poster, bold typography, 
crimson red and black, beer mug and guitar graphics, 
screen print aesthetic, 2:3 aspect ratio
```

---

## 🔄 Ponovno Generiranje

Če ti slika ni všeč:

1. **Izbriši sliko:**
   ```bash
   del public\images\ai-generated\albums\lepi-in-trezni.jpg
   ```

2. **Zaženi ponovno:**
   ```bash
   node scripts/generate-images-free.js
   ```

3. **Scripta bo generirala novo variacijo** (zaradi random seed)

---

## 📊 Primerjava s Plačljivimi

| Feature | Pollinations.ai | Midjourney | DALL-E 3 |
|---------|----------------|------------|----------|
| **Cena** | 🆓 Brezplačno | $10/mesec | $0.04/slika |
| **Registracija** | ❌ Ne | ✅ Da | ✅ Da |
| **API Ključ** | ❌ Ne | ✅ Da | ✅ Da |
| **Omejitve** | ❌ Nobene | 15 ur/mesec | Omejeno |
| **Kvaliteta** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

---

## 🚀 Napredne Uporabe

### **Batch Generation**

```javascript
// Generate multiple variations
for (let i = 0; i < 5; i++) {
  await generateImage(category, {
    ...item,
    name: `${item.name}-v${i+1}`
  });
}
```

### **Custom Seeds**

```javascript
// Reproducible results
const url = `${BASE_URL}${encodedPrompt}?seed=12345`;
```

### **Model Selection**

```javascript
// Different models
?model=flux        // Highest quality
?model=turbo       // Fast
?model=stable-diffusion  // Balanced
```

---

## 💡 Tips & Tricks

1. **Uporabi specifične barve:**
   ```
   crimson red #dc143c, black #0a0a0a
   ```

2. **Dodaj stil:**
   ```
   photorealistic, minimalist, vintage, modern
   ```

3. **Določi lighting:**
   ```
   studio lighting, dramatic shadows, golden hour
   ```

4. **Quality modifiers:**
   ```
   4K quality, professional, highly detailed
   ```

---

## 🎸 The Drinkers Brand Guidelines

### **Barve:**
- Crimson Red: `#dc143c`
- Black: `#0a0a0a`
- Silver: `#c0c0c0`

### **Elementi:**
- Beer mugs 🍺
- Electric guitars 🎸
- Vinyl records 💿
- Slovenian flag 🇸🇮

### **Stil:**
- Rock'n'roll
- High contrast
- Professional
- Authentic

---

## 📚 Viri

- [Pollinations.ai Documentation](https://pollinations.ai)
- [FLUX Model Guide](https://github.com/black-forest-labs/flux)
- [Prompt Engineering Guide](https://platform.openai.com/docs/guides/image-generation)

---

## 🤘 Rezultat

**18 profesionalnih slik popolnoma brezplačno!**

```bash
node scripts/generate-images-free.js

🎨 The Drinkers - FREE AI Image Generator
   Powered by Pollinations.ai (100% FREE, No API Key!)

✅ Created: public/images/ai-generated/albums
✅ Created: public/images/ai-generated/band
...

📊 Summary: 18/18 images generated

🎉 All images generated using Pollinations.ai - 100% FREE!
```

---

**Vso srečo z generiranjem! 🎨🤘**
