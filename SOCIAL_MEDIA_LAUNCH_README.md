# 🚀 THE DRINKERS - SOCIAL MEDIA LAUNCH KAMPANJA 2026

## 📋 PREGLED

Kompleten sistem za izvedbo 7-delne social media kampanje za launch nove spletne strani The Drinkers.

**Temelji na raziskavi trendov 2026:**
- ✅ Short-form video dominacija (Reels, TikTok)
- ✅ Avtentičnost > Poliranost
- ✅ Interaktivni stickerji (2x engagement)
- ✅ Social Search SEO
- ✅ AI-asisted content generation
- ✅ Community-driven platforms

---

## 📁 STRUKTURA PROJEKTA

```
the/
├── SOCIAL_MEDIA_CAMPAIGN_2026.md          ← Glavna strategija
├── SOCIAL_MEDIA_POSTING_SCHEDULE.md       ← Detajlen urnik objavljanja
├── SOCIAL_MEDIA_ANALYTICS_TRACKER.md      ← Analytics in tracking
├── SOCIAL_MEDIA_CALENDAR_30DAYS.md        ← 30-dnevni koledar (obstoječi)
│
├── scripts/
│   ├── generate-social-media-assets.ps1   ← Individualna generiranja
│   ├── generate-social-videos.ps1         ← Video generation scripts
│   └── generate-social-media-automated.ps1 ← Avtomatsko batch generiranje
│
└── public/images/social/                   ← AI generirani asseti (po generiranju)
    ├── instagram/
    │   ├── stories/
    │   └── reels/
    ├── facebook/
    │   └── posts/
    ├── twitter/
    │   └── posts/
    └── all-platforms/
```

---

## 🎯 7-DELNA KAMPANIJA

| Dan | Platforma | Tip | Copy | Timing |
|-----|-----------|-----|------|--------|
| **1** | Instagram | Story | "Something big is coming... 🎸🔥" | 19:00 |
| **2** | Facebook | Post | "Pripravljeni na novo ero? 🍺" | 18:30 |
| **3** | Instagram | Reel | 15-sec video teaser | 20:00 |
| **4** | Twitter/X | Post | "New era. Same rock 'n' roll. 🤘" | 12:00 |
| **5** | Instagram | Story | Poll: "Katero pesem v živo?" | 19:30 |
| **6** | Facebook | Post | "3 dni do launcha 🎉" | 17:00 |
| **7** | ALL | Multi | "JUTRI! Ob 18:00! 🚀" | 18:00 |

---

## 🚀 HITRI ZAČETEK

### **Korak 1: Namesti inference.sh CLI**

```bash
# Windows PowerShell
curl -fsSL https://cli.inference.sh | sh

# Prijavi se
infsh login
```

### **Korak 2: Preveri kredite**

```bash
infsh account balance
```

**Pričakovani stroški:**
- Slike: ~5-10 kreditov/slika × 8 slik = ~40-80 kreditov
- Videi: ~50-100 kreditov/video × 3 videe = ~150-300 kreditov
- **Skupaj:** ~200-400 kreditov

### **Korak 3: Generiraj vse assete**

```powershell
# Avtomatsko generiranje vseh assetov
.\scripts\generate-social-media-automated.ps1

# Samo slike
.\scripts\generate-social-media-automated.ps1 -SkipVideos

# Samo videi
.\scripts\generate-social-media-automated.ps1 -SkipImages

# Samo določeni dnevi (npr. Day 1, 3, 7)
.\scripts\generate-social-media-automated.ps1 -Day 1,3,7
```

### **Korak 4: Uredi vizuale**

```
Orodja:
- Canva (free): Text overlays, branding
- CapCut (free): Video editing, audio sync
- Photoshop (paid): Advanced editing
```

### **Korak 5: Schedule objave**

```
Orodja:
- Meta Business Suite: Instagram + Facebook
- Twitter Pro: Twitter/X
- TikTok Scheduler: TikTok
```

---

## 📖 DOKUMENTACIJA

### **1. SOCIAL_MEDIA_CAMPAIGN_2026.md**
**Kaj vsebuje:**
- 📊 Raziskava trendov 2026
- 🎯 Detajlni opisi vseh 7 kampanj
- 🎨 Brand guidelines
- 🛠️ Potrebna orodja
- 📊 Success KPIs

**Uporabi za:**
- Razumevanje strategije
- Pregled posameznih kampanj
- Brand consistency

---

### **2. SOCIAL_MEDIA_POSTING_SCHEDULE.md**
**Kaj vsebuje:**
- 📅 Detajlen urnik objavljanja
- ⏰ Optimalni timingi za Slovenijo
- 📝 Copy za vsako objavo
- 🎨 Visual specifikacije
- 📊 Engagement plan

**Uporabi za:**
- Pripravo objav
- Scheduling content
- Copy-paste tekstov

---

### **3. SOCIAL_MEDIA_ANALYTICS_TRACKER.md**
**Kaj vsebuje:**
- 📊 Daily tracking spreadsheet
- 📈 Weekly summary report
- 💰 ROI calculator
- 💬 Engagement response templates
- 🚨 Crisis management plan

**Uporabi za:**
- Spremljanje performance
- Analytics reporting
- Community management

---

### **4. SOCIAL_MEDIA_CALENDAR_30DAYS.md**
**Kaj vsebuje:**
- 📅 30-dnevni content koledar
- 🎯 Launch + post-launch strategija
- 📊 Platform-specific tips
- 🎨 Hashtag strategy

**Uporabi za:**
- Long-term planning
- Post-launch content
- Hashtag research

---

## 🎨 AI GENERIRANJE

### **Image Generation Scripts**

```powershell
# Dan 1 - Instagram Story
infsh app run bytedance/seedream-4-5 --input '{
  "prompt": "Dark moody Instagram story teaser for rock band The Drinkers, crimson red spotlight on black background, electric guitar silhouette, stage fog, mysterious atmosphere, vertical 9:16 format",
  "aspect_ratio": "9:16",
  "output_format": "jpg"
}' --output public/images/social/instagram/stories/teaser-day1.jpg

# Dan 2 - Facebook Post
infsh app run falai/flux-2-klein-lora --input '{
  "prompt": "Facebook post graphic for The Drinkers website launch, crimson red to black gradient, COMING SOON typography, square 1:1 format",
  "aspect_ratio": "1:1",
  "output_format": "jpg"
}' --output public/images/social/facebook/posts/coming-soon-day2.jpg

# Dan 5 - Instagram Story Poll
infsh app run bytedance/seedream-4-5 --input '{
  "prompt": "Instagram story background for music poll, album covers collage faded, crimson red and black, space for poll sticker center, vertical 9:16",
  "aspect_ratio": "9:16",
  "output_format": "jpg"
}' --output public/images/social/instagram/stories/poll-day5.jpg

# Dan 6 - Facebook Countdown
infsh app run google/gemini-3-pro-image-preview --input '{
  "prompt": "Facebook countdown post, large number 3 in crimson red, The Drinkers logo, DAYS TO LAUNCH text, confetti, square 1:1",
  "aspect_ratio": "1:1",
  "output_format": "jpg"
}' --output public/images/social/facebook/posts/countdown-3days-day6.jpg
```

### **Video Generation Scripts**

```powershell
# Dan 3 - Instagram Reel (15s)
infsh app run google/veo-3-1 --input '{
  "prompt": "15 second vertical rock band teaser video, guitar close-up, drummer, singer, beer mug slam, logo reveal, crimson red lighting, vertical 9:16",
  "aspect_ratio": "9:16",
  "duration": 15,
  "output_format": "mp4"
}' --output public/images/social/instagram/reels/teaser-day3.mp4

# Dan 4 - Twitter/X Animation (3s loop)
infsh app run google/veo-3-1 --input '{
  "prompt": "3 second logo animation loop, The Drinkers logo pulsing crimson red glow, black background, 16:9 horizontal",
  "aspect_ratio": "16:9",
  "duration": 3,
  "output_format": "mp4"
}' --output public/images/social/twitter/posts/logo-day4.mp4

# Dan 7 - TikTok Hype (10s)
infsh app run google/veo-3-1 --input '{
  "prompt": "10 second hype video, JUTRI OB 18:00 text animations, The Drinkers logo, crimson red explosions, vertical 9:16",
  "aspect_ratio": "9:16",
  "duration": 10,
  "output_format": "mp4"
}' --output public/images/social/all-platforms/launch-day7-tiktok.mp4
```

---

## 📊 MODEL COMPARISON

### **Za Slike:**
| Model | Hitrost | Kvaliteta | Cena | Uporaba |
|-------|---------|-----------|------|---------|
| **Seedream 4.5** | ⚡⚡⚡ | ⭐⭐⭐⭐⭐ | $ | Social media graphics |
| **FLUX.2 Klein** | ⚡⚡ | ⭐⭐⭐⭐⭐ | $$ | Professional designs |
| **Gemini 3 Pro** | ⚡⚡ | ⭐⭐⭐⭐ | $$ | Multi-purpose |
| **FLUX Dev LoRA** | ⚡⚡⚡ | ⭐⭐⭐⭐ | $ | Fast iteration |

### **Za Videe:**
| Model | Hitrost | Kvaliteta | Dolžina | Cena |
|-------|---------|-----------|---------|------|
| **Veo 3.1** | ⚡⚡ | ⭐⭐⭐⭐⭐ | do 60s | $$$ |
| **Wan 2.5** | ⚡⚡ | ⭐⭐⭐⭐⭐ | do 120s | $$$ |
| **Seedance** | ⚡⚡⚡ | ⭐⭐⭐⭐ | do 30s | $$ |

---

## 🎯 SUCCESS METRICS

### **KPIs:**
```
✅ Total Reach: 50,000+
✅ Engagement Rate: 5%+
✅ Website Clicks: 5,000+
✅ New Followers: 1,000+
✅ Story Completion: 70%+
✅ Poll Participation: 500+ votes
```

### **Benchmarks (Slovenia 2026):**
| Metrika | Povprečje | Dober | Odličen |
|---------|-----------|-------|---------|
| Engagement Rate | 2% | 5% | 10%+ |
| Story Completion | 50% | 70% | 90%+ |
| Reach Rate | 10% | 25% | 50%+ |

---

## 💬 ENGAGEMENT GUIDELINES

### **Pravila:**
1. ✅ Reply na VSE commente v 1 uri
2. ✅ Uporabi emoji v odgovorih
3. ✅ Personaliziraj odgovore (ne copy-paste)
4. ✅ Reši negativne commente takoj
5. ✅ Engage z drugimi rock band profili

### **Response Time:**
```
🟢 < 1 hour: Excellent
🟡 1-4 hours: Good
🔴 > 4 hours: Needs improvement
```

---

## 🚨 TROUBLESHOOTING

### **Problem: "Not logged in"**
```bash
infsh login
# Sledite navodilom za avtentikacijo
```

### **Problem: "Insufficient credits"**
```bash
infsh account balance
# Kupi kredite na: https://inference.sh/pricing
```

### **Problem: "Model unavailable"**
```bash
# Poskusi z alternativnim modelom:
# Seedream → FLUX → Gemini
# Veo → Wan → Seedance
```

### **Problem: "Low engagement"**
```
Rešitve:
1. Objavi 1 uro prej
2. Dodaj več CTA-jev
3. Hitreje odgovarjaj na commente
4. Uporabi trending audio
5. Boostaj s paid ads
```

---

## 📱 SCHEDULING TOOLS

### **Meta Business Suite (IG + FB)**
```
1. business.facebook.com
2. Connect Instagram account
3. Create posts
4. Schedule for optimal times
5. Enable cross-posting
```

### **Twitter/X Pro**
```
1. tweetdeck.twitter.com
2. Connect Twitter account
3. Schedule tweets
4. Monitor engagement
```

### **TikTok Scheduler**
```
1. tiktok.com
2. Upload video
3. Click "Schedule"
4. Select date/time
```

---

## 🎯 AKCIJSKI PLAN

### **Teden 1: Priprava**
```
☐ Namesti inference.sh CLI
☐ Generiraj vse AI assete
☐ Uredi vizuale (Canva/CapCut)
☐ Pripravi vse copyje
☐ Setup scheduling tools
☐ Testiraj vse formate
```

### **Teden 2: Izvedba**
```
☐ Objavi po urniku ( SOCIAL_MEDIA_POSTING_SCHEDULE.md )
☐ Spremljaj engagement (dnevno)
☐ Reply na vse commente (v 1 uri)
☐ Adjust strategy po rezultatih
```

### **Teden 3: Analiza**
```
☐ Zberi vse metrike
☐ Analiziraj top performing content
☐ Pripravi report ( SOCIAL_MEDIA_ANALYTICS_TRACKER.md )
☐ Planiraj next phase (30-dnevni koledar)
```

---

## 📞 SUPPORT

### **Dokumentacija:**
- 📖 `SOCIAL_MEDIA_CAMPAIGN_2026.md` - Strategija
- 📅 `SOCIAL_MEDIA_POSTING_SCHEDULE.md` - Urnik
- 📊 `SOCIAL_MEDIA_ANALYTICS_TRACKER.md` - Analytics
- 📆 `SOCIAL_MEDIA_CALENDAR_30DAYS.md` - 30-dnevni plan

### **Skripte:**
- 🤖 `generate-social-media-automated.ps1` - Batch generation
- 🎬 `generate-social-videos.ps1` - Video generation
- 🎨 `generate-social-media-assets.ps1` - Individual assets

### **Orodja:**
- 🤖 inference.sh CLI - AI generation
- 📅 Meta Business Suite - Scheduling
- 🎨 Canva - Design
- ✂️ CapCut - Video editing

---

## 🎸 PRIPRAVLJENO ZA IZVEDBO!

**Vsa orodja so nameščena in pripravljena.**

**Naslednji koraki:**
1. Zaženi `.\scripts\generate-social-media-automated.ps1`
2. Uredi vizuale v Canva/CapCut
3. Schedule objave v Meta Business Suite
4. Spremljaj analytics in engageaj s communityjem

**Good luck! 🤘🍺**

---

**Zadnja posodobitev:** Marec 2026  
**Verzija:** 1.0  
**Avtor:** AI Assistant z uporabo 2026 trendov raziskave
