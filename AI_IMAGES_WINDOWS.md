# 🖼️ AI Image Generation - Windows Guide

## 🚀 Hitra Namestitev za Windows

### **Opcija 1: Spletni Vmesnik (Najlažje)**

1. **Odpri:** https://inference.sh/apps
2. **Izberi model:** Seedream 4.5 ali FLUX
3. **Kopiraj prompt** iz `scripts/generate-images.js`
4. **Generiraj** in shrani sliko
5. **Premakni** v `public/images/ai-generated/`

---

### **Opcija 2: PowerShell Script**

```powershell
# 1. Namesti Node.js SDK
npm install -g @inferencesh/sdk

# 2. Pridobi API ključ
# Pojdi na: https://inference.sh/dashboard

# 3. Nastavi environment variable
$env:INFERENCE_SH_API_KEY="tvoj-api-ključ"

# 4. Zaženi scripto
node scripts/generate-images-win.js
```

---

### **Opcija 3: WSL (Windows Subsystem for Linux)**

```bash
# 1. Namesti WSL
wsl --install

# 2. Restartaj računalnik

# 3. Odpri Ubuntu terminal
wsl

# 4. Namesti inference.sh
curl -fsSL https://cli.inference.sh | sh

# 5. Prijavi se
infsh login

# 6. Generiraj slike
cd /mnt/f/thedrinkers/the
node scripts/generate-images.js
```

---

## 📸 Prompti za Windows Uporabnike

### **Album Cover - Copy/Paste:**

```
Professional rock album cover for "Lepi in trezni" by The Drinkers, Slovenian rock band, minimalist design, crimson red (#dc143c) and black (#0a0a0a) color scheme, beer glass silhouette, modern typography space, high contrast studio lighting, 4K quality, music industry standard, square format
```

### **Band Photo - Copy/Paste:**

```
Professional rock band promotional photo, 5 musicians from The Drinkers Slovenian rock band on stage with instruments (guitars, bass, drums, microphone), dramatic crimson red stage lighting, energetic performance moment, concert atmosphere, photorealistic, award-winning music photography, 16:9 aspect ratio
```

### **Tour Poster - Copy/Paste:**

```
Concert tour poster for The Drinkers 2026 Slovenian tour, bold text "THE DRINKERS", tour dates and cities (Ljubljana, Maribor, Koper, Zagreb), crimson red and black color scheme, beer mug and guitar graphics, vintage rock poster aesthetic, screen print style, 2:3 aspect ratio
```

---

## 🎯 Spletni Vmesniki

| Model | URL | Best For |
|-------|-----|----------|
| **Seedream 4.5** | https://inference.sh/apps/bytedance/seedream-4-5 | Album covers |
| **FLUX** | https://inference.sh/apps/falai/flux-dev-lora | Quick iterations |
| **Gemini 3 Pro** | https://inference.sh/apps/google/gemini-3-pro-image | Band photos |
| **Grok Imagine** | https://inference.sh/apps/xai/grok-imagine-image | Social media |

---

## 📁 Struktura Datotek

```
f:\thedrinkers\the\
├── public/
│   └── images/
│       └── ai-generated/
│           ├── albums/
│           │   ├── lepi-in-trezni.jpg
│           │   ├── zeja.jpg
│           │   └── pivolucija.jpg
│           ├── band/
│           │   ├── promo-2026.jpg
│           │   └── live-performance.jpg
│           └── social/
├── scripts/
│   ├── generate-images.js (Linux/Mac)
│   └── generate-images-win.js (Windows)
└── AI_IMAGES_README.md
```

---

## 🔧 Ročno Generiranje (Step-by-Step)

### **Korak 1: Odpri spletni vmesnik**
```
https://inference.sh/apps/bytedance/seedream-4-5
```

### **Korak 2: Prilepi prompt**
```
Professional rock album cover for The Drinkers, crimson red and black, beer mug, 4K
```

### **Korak 3: Nastavi aspect ratio**
```
1:1 (square for album covers)
```

### **Korak 4: Klikni Generate**

### **Korak 5: Prenesi sliko**
```
Save as: public/images/ai-generated/albums/lepi-in-trezni.jpg
```

---

## 💡 Tips for Windows

1. **Uporabi PowerShell** za environment variables:
   ```powershell
   $env:INFERENCE_SH_API_KEY="your-key"
   ```

2. **Namesti WSL2** za boljšo kompatibilnost:
   ```powershell
   wsl --install -d Ubuntu
   ```

3. **Uporabi Git Bash** če imaš Git nameščen:
   ```bash
   curl -fsSL https://cli.inference.sh | sh
   ```

4. **Docker Desktop** alternativa:
   ```powershell
   docker run -it inference.sh/cli login
   ```

---

## 🎸 Ready-to-Use Prompts

### **Albums (6):**
1. Lepi in trezni - Minimalist crimson design
2. Žeja - Vintage wine glass
3. Pivolucija - Beer revolution
4. Prohibicija - 1920s speakeasy
5. Hajdi - Modern rock energy
6. Recidiv - Dark moody atmosphere

### **Band Photos (3):**
1. Band Promo 2026 - Professional stage photo
2. Live Performance - Concert action
3. Backstage Portrait - Intimate backstage

### **Social (3):**
1. Instagram Post - Square concert announcement
2. Twitter Header - 3:1 crimson gradient
3. Facebook Cover - 820x312 band photo

### **Merch (4):**
1. T-Shirt Mockup - Black with crimson logo
2. Hoodie Mockup - Black with embroidery
3. Beer Mug - Custom engraved design
4. Vinyl Mockup - Crimson red vinyl

### **Posters (2):**
1. Tour 2026 - All dates and cities
2. Orto Bar - Specific venue poster

---

## 📊 Cena

| Model | Credits/Image | Time |
|-------|---------------|------|
| Seedream 4.5 | ~5 credits | 30s |
| FLUX | ~3 credits | 15s |
| Gemini 3 Pro | ~4 credits | 20s |
| Grok Imagine | ~2 credits | 10s |

**Free tier:** 100 credits/month  
**Pro:** 1000 credits/month ($20)

---

## 🤘 Next Steps

1. **Pridobi API ključ** (https://inference.sh/dashboard)
2. **Izberi Opcijo** (Web/PowerShell/WSL)
3. **Generiraj prvo sliko**
4. **Testaj v Next.js**
5. **Optimiziraj z Topaz upscaler**

---

**Vso srečo z generiranjem! 🎨**
