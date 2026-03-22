# 🎨 THE DRINKERS - AI IMAGE GENERATION

## ⚠️ OPOMBA

inference.sh je **agent platform**, ne direktni image generation API. 
Za generiranje slik priporočamo uporabo **web interfacea**.

---

## 🌐 NAVODILA ZA GENERIRANJE

### **Korak 1: Odpri inference.sh**
1. Obišči: **https://inference.sh**
2. Login z API ključem: `1nfsh-5n2ewp39yxpxbvzt4gydp19hbe`

### **Korak 2: Izberi App**
Izberi enega izmed:
- `bytedance/seedream-4-5` - Najboljši za social media graphics
- `falai/flux-2-klein-lora` - Professional designs
- `google/gemini-3-pro-image-preview` - High quality

### **Korak 3: Vnesi Prompt**

#### **Dan 1 - Instagram Story:**
```
Dark moody Instagram story teaser for rock band The Drinkers, crimson red spotlight 
on black background, electric guitar silhouette, stage fog, mysterious atmosphere, 
vertical 9:16 format, authentic rock aesthetic
```
**Model:** `bytedance/seedream-4-5`  
**Aspect Ratio:** `9:16`

---

#### **Dan 2 - Facebook Post:**
```
Facebook post graphic for The Drinkers website launch, crimson red to black gradient, 
COMING SOON bold typography, band logo in center, professional social media design, 
square 1:1 format
```
**Model:** `falai/flux-2-klein-lora`  
**Aspect Ratio:** `1:1`

---

#### **Dan 5 - Poll Background:**
```
Instagram story background for music poll, album covers collage faded, crimson red 
and black color scheme, space for poll sticker in center, vertical 9:16
```
**Model:** `bytedance/seedream-4-5`  
**Aspect Ratio:** `9:16`

---

#### **Dan 6 - Countdown:**
```
Facebook countdown post, large number 3 in crimson red metallic texture, The Drinkers 
logo, DAYS TO LAUNCH text, confetti celebration, square 1:1
```
**Model:** `google/gemini-3-pro-image-preview`  
**Aspect Ratio:** `1:1`

---

#### **Dan 7 - Launch (Instagram):**
```
Launch announcement post, TOMORROW 18:00 bold typography, The Drinkers logo, crimson 
red explosion background, dramatic lighting, square 1:1
```
**Model:** `bytedance/seedream-4-5`  
**Aspect Ratio:** `1:1`

---

#### **Dan 7 - Launch (Story):**
```
Launch announcement Instagram story, TOMORROW 18:00 large text, The Drinkers logo, 
crimson red explosion, vertical 9:16
```
**Model:** `falai/flux-dev-lora`  
**Aspect Ratio:** `9:16`

---

### **Korak 4: Generiraj in Shrani**
1. Klikni **Generate** ali **Run**
2. Počakaj na rezultat (10-30 sekund)
3. Klikni **Download**
4. Shrani v: `public/images/social/[platform]/[filename].jpg`

---

## 📁 STRUKTURA MAP

```
public/images/social/
├── instagram/
│   ├── stories/
│   │   ├── teaser-day1.jpg
│   │   └── poll-day5.jpg
│   └── reels/
│       └── teaser-day3.mp4 (video)
├── facebook/
│   └── posts/
│       ├── coming-soon-day2.jpg
│       └── countdown-3days-day6.jpg
└── all-platforms/
    ├── launch-tomorrow-day7-instagram.jpg
    └── launch-tomorrow-day7-story.jpg
```

---

## 🎬 VIDEO GENERIRANJE

Za videe (Dan 3 - Reel, Dan 4 - Twitter Animation, Dan 7 - TikTok):

1. **inference.sh** - Video apps (Veo, Wan, Seedance)
2. **RunwayML** - https://runwayml.com (free tier)
3. **Pika Labs** - https://pika.art (Discord)
4. **Stable Video Diffusion** - https://stability.ai

---

## 🆓 ALTERNATIVE (Brezplačno)

### **1. Leonardo.ai**
- https://leonardo.ai
- Free tier: 150 kreditov/dan
- Dobra kvaliteta

### **2. Bing Image Creator**
- https://bing.com/images/create
- Popolnoma brezplačno
- DALL-E 3 model

### **3. Playground AI**
- https://playgroundai.com
- Free tier: 500 slik/dan
- Stable Diffusion

### **4. Canva Magic Media**
- https://canva.com
- Text-to-Image v Canva
- Free tier available

---

## 📊 PRIMERJAVA

| Orodje | Cena | Kvaliteta | Login |
|--------|------|-----------|-------|
| **inference.sh** | $$ | ⭐⭐⭐⭐⭐ | ✅ |
| **Leonardo.ai** | 🆓 | ⭐⭐⭐⭐ | ✅ |
| **Bing Create** | 🆓 | ⭐⭐⭐⭐ | ✅ (Microsoft) |
| **Playground AI** | 🆓 | ⭐⭐⭐⭐ | ✅ |
| **Canva** | 🆓 | ⭐⭐⭐ | ✅ |

---

## ✅ KONTROLNA LISTA

### **Pred Generiranjem:**
- [ ] Odpri inference.sh v brskalniku
- [ ] Prijavljen z API ključem
- [ ] Pripravljeni vsi prompti (copy-paste)
- [ ] Ustvarjene mape: `public/images/social/...`

### **Po Generiranju:**
- [ ] Vse slike shranjene v prave mape
- [ ] Preveri kvaliteto (resolucija, barve)
- [ ] Dodaj text overlays v Canva/Photoshop
- [ ] Upload v Meta Business Suite
- [ ] Schedule objav po urniku

---

## 🔗 KORISTNI LINKI

- **inference.sh:** https://inference.sh
- **Dokumentacija:** SOCIAL_MEDIA_CAMPAIGN_2026.md
- **Urnik:** SOCIAL_MEDIA_POSTING_SCHEDULE.md
- **Analytics:** SOCIAL_MEDIA_ANALYTICS_TRACKER.md

---

**Za pomoč odpri:** AI_IMAGE_GENERATION_INSTRUCTIONS.md

🤘🍺
