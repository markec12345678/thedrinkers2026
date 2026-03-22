# 🎨 THE DRINKERS - SOCIAL MEDIA CAMPAIGN GENERATOR

## 📍 LOKACIJA NA SPLETNI STRANI

**Odpri:** http://localhost:3000/social-campaign

Ali pa na production strani: https://thedrinkers.si/social-campaign

---

## 🚀 KAKO UPORABITI

### **Korak 1: Odpri stran**
```
http://localhost:3000/social-campaign
```

### **Korak 2: Generiraj slike**
- Klikni **"🎨 Generate All Campaign Images"** za avtomatsko generiranje vseh 7 slik
- ALI klikni **"✨ Generate Image"** za posamezno sliko

### **Korak 3: Shrani slike**
- Desni klik na generirano sliko
- "Save image as..."
- Shrani v pravo mapo:

| Dan | Ime | Mapa |
|-----|-----|------|
| 1 | teaser-day1.jpg | public/images/social/instagram/stories/ |
| 2 | coming-soon-day2.jpg | public/images/social/facebook/posts/ |
| 3 | (video) | public/images/social/instagram/reels/ |
| 4 | new-era-day4.jpg | public/images/social/twitter/posts/ |
| 5 | poll-day5.jpg | public/images/social/instagram/stories/ |
| 6 | countdown-day6.jpg | public/images/social/facebook/posts/ |
| 7a | launch-instagram.jpg | public/images/social/all-platforms/ |
| 7b | launch-story.jpg | public/images/social/all-platforms/ |

---

## 📊 KAMPA NJA

### **7-Delna Launch Campaign:**

| Dan | Platforma | Tip | Timing | Copy |
|-----|-----------|-----|--------|------|
| **1** | Instagram | Story | 19:00 | "Something big is coming... 🎸🔥" |
| **2** | Facebook | Post | 18:30 | "Pripravljeni na novo ero? 🍺" |
| **3** | Instagram | Reel | 20:00 | "Kdo smo? The Drinkers. 🎸" |
| **4** | Twitter/X | Post | 12:00 | "New era. Same rock 'n' roll. 🤘" |
| **5** | Instagram | Story | 19:30 | "Katero pesem želite slišati? 🎸" |
| **6** | Facebook | Post | 17:00 | "3 dni do launcha 🎉" |
| **7** | ALL | Launch | 18:00 | "JUTRI! Ob 18:00! 🚀" |

---

## 🎨 GENERIRANJE SLIK

### **Tehnologija:**
- Uporablja **Pollinations.ai API** (brezplačno, brez login-a)
- Model: **FLUX** (visoka kvaliteta)
- Format: JPG, PNG

### **Aspect Ratios:**
- Instagram Story/Reel: **9:16** (1080x1920)
- Instagram Post/Facebook: **1:1** (1080x1080)
- Twitter/X: **16:9** (1200x675)

### **Čas generiranja:**
- Posamična slika: 10-30 sekund
- Vseh 7 slik: ~2-3 minute

---

## 📁 STRUKTURA MAP

```
public/images/social/
├── instagram/
│   ├── stories/
│   │   ├── teaser-day1.jpg
│   │   └── poll-day5.jpg
│   └── reels/
│       └── teaser-day3.mp4
├── facebook/
│   └── posts/
│       ├── coming-soon-day2.jpg
│       └── countdown-3days-day6.jpg
├── twitter/
│   └── posts/
│       └── new-era-day4.jpg
└── all-platforms/
    ├── launch-tomorrow-day7-instagram.jpg
    └── launch-tomorrow-day7-story.jpg
```

---

## 🚀 OBJAVLJANJE

### **Ko so vse slike generirane:**

1. **Odpri** Meta Business Suite
   - https://business.facebook.com

2. **Uploadaj** slike:
   - Instagram Stories → Instagram
   - Facebook Posts → Facebook
   - Reels → Instagram + Facebook

3. **Schedule** objave:
   - Sledi urniku v SOCIAL_MEDIA_POSTING_SCHEDULE.md
   - Nastavi točen čas (glej tabelo zgoraj)

4. **Dodaj** copy:
   - Kopiraj tekst iz tabele
   - Prilepi v objavo
   - Dodaj hashtag #TheDrinkers

---

## 📊 ANALYTICS

### **Spremljaj:**
- Reach (doseg)
- Engagement (lajki, komentarji, delitve)
- Click-through rate (CTR)
- Story completion rate

### **Orodja:**
- Instagram Insights
- Facebook Analytics
- SOCIAL_MEDIA_ANALYTICS_TRACKER.md

---

## 🛠️ TEHNIČNI PODATKI

### **Komponenta:**
- Lokacija: `components/sections/SocialMediaCampaign.tsx`
- Stran: `app/social-campaign/page.tsx`

### **API:**
- Provider: Pollinations.ai
- Model: FLUX
- Endpoint: `https://image.pollinations.ai/prompt/{prompt}`

### **Cena:**
- 🆓 Brezplačno
- 🚫 Brez login-a
- ⚡ Hitro generiranje

---

## 💡 TIPS

1. **Generiraj več variant:**
   - Klikni "Regenerate" za drugo verzijo
   - Izberi najboljšo sliko

2. **Text overlays:**
   - AI ne generira vedno popolnega texta
   - Dodaj tekst kasneje v Canva.com

3. **Consistency:**
   - Uporabljaj enak style za vse slike
   - Crimson red (#dc143c) je glavna barva

---

## 🔗 LINKI

- **Social Campaign Generator:** http://localhost:3000/social-campaign
- **Meta Business Suite:** https://business.facebook.com
- **Canva (text overlays):** https://canva.com
- **Analytics Tracker:** SOCIAL_MEDIA_ANALYTICS_TRACKER.md
- **Posting Schedule:** SOCIAL_MEDIA_POSTING_SCHEDULE.md

---

**Vso srečo z generiranjem! 🤘🍺**
