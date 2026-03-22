# 🎨 THE DRINKERS - AI SOCIAL MEDIA GENERATION SCRIPTS

## 📋 PREGLED

Ta skripta generira vse AI vizuale za 7-delno social media kampanjo.

**Zahtevano:**
```bash
# Namesti inference.sh CLI
curl -fsSL https://cli.inference.sh | sh && infsh login

# Preveri kredite
infsh account balance
```

---

## 📁 STRUKTURA MAP

```bash
# Ustvari strukturo map
mkdir -p public/images/social/instagram/stories
mkdir -p public/images/social/instagram/reels
mkdir -p public/images/social/facebook/posts
mkdir -p public/images/social/twitter/posts
mkdir -p public/images/social/all-platforms
mkdir -p public/images/social/source-files
```

---

## 🎯 GENERIRANJE PO KAMPA NJAH

### **KAMPANJA 1: Instagram Story - "Something Big Is Coming"**

```bash
# Dan 1 - Instagram Story Teaser (9:16)
infsh app run bytedance/seedream-4-5 --input '{
  "prompt": "Dark moody Instagram story teaser for rock band The Drinkers, crimson red spotlight on black background #dc143c, electric guitar silhouette, stage fog, mysterious atmosphere, vertical 9:16 format, authentic rock aesthetic, not overproduced, raw energy, text space at top for \"Something big is coming...\", professional but gritty, Slovenian rock band",
  "aspect_ratio": "9:16",
  "output_format": "jpg",
  "quality": "high"
}' --output public/images/social/instagram/stories/teaser-day1.jpg
```

**Manual Text Overlay (v Canva/Photoshop):**
```
Text: "Something big is coming... 🎸🔥"
Font: Bold sans-serif uppercase
Color: White with crimson glow
Position: Top third
Logo: Center bottom
```

---

### **KAMPANJA 2: Facebook Post - "Pripravljeni na Novo Ero"**

```bash
# Dan 2 - Facebook Post Announcement (1:1)
infsh app run falai/flux-2-klein-lora --input '{
  "prompt": "Facebook post graphic for The Drinkers website launch announcement, crimson red #dc143c to black gradient background, band logo placeholder in center, COMING SOON bold typography, professional social media design, square 1:1 format, clean modern rock aesthetic, Slovenian band, beer mug and guitar icons subtle, high contrast",
  "aspect_ratio": "1:1",
  "output_format": "jpg",
  "quality": "high"
}' --output public/images/social/facebook/posts/coming-soon-day2.jpg
```

**Manual Text Overlay:**
```
Headline: "🍺 PRIPRAVLJENI NA NOVO ERO? 🍺"
Subtext: "Stran se lansira kmalu!"
Font: Bold uppercase
Color: White
Position: Top and bottom thirds
```

---

### **KAMPANJA 3: Instagram Reel - "15-Sec Video Teaser"**

```bash
# Dan 3 - Instagram Reel Video (9:16, 15 seconds)
infsh app run google/veo-3-1 --input '{
  "prompt": "15 second rock band teaser video for Instagram Reel, fast-paced cuts sequence: [0-2s] black screen text \"30 let...\", [2-5s] extreme close-up electric guitar strings, [5-8s] drummer hands hitting snare drum, [8-11s] singer hand grabbing vintage microphone, [11-13s] beer mug slamming on wooden table, [13-15s] The Drinkers logo reveal with text \"thedrinkers.si Kmalu\", crimson red #dc143c stage lighting, dark background, authentic concert footage style, raw energy not overproduced, vertical 9:16 format, professional but gritty, Slovenian rock band aesthetic",
  "aspect_ratio": "9:16",
  "duration": 15,
  "fps": 30,
  "output_format": "mp4",
  "quality": "high"
}' --output public/images/social/instagram/reels/teaser-day3.mp4

# Alternative - Wan 2.5 za boljšo kvaliteto
infsh app run wanai/wan-2-5 --input '{
  "prompt": "Fast-paced rock music teaser video, 15 seconds, guitar close-up, drummer, singer with microphone, beer mug slam, logo reveal, crimson red lighting, dark stage, vertical format for Instagram Reel, authentic concert energy",
  "aspect_ratio": "9:16",
  "duration": 15,
  "output_format": "mp4"
}' --output public/images/social/instagram/reels/teaser-day3-wan.mp4
```

**Audio Addition (v CapCut/Premiere):**
```
Track: "Pijemo ga radi" - najboljši riff
Duration: 15 seconds
Fade in: 0.5s
Fade out: 1s
Sync: Beat drops z visual cuts
```

---

### **KAMPANJA 4: Twitter/X Post - "New Era"**

```bash
# Dan 4 - Twitter/X Animated GIF (16:9, 3-second loop)
infsh app run google/veo-3-1 --input '{
  "prompt": "Animated GIF loop for Twitter/X social media post, The Drinkers band logo in center with pulsing crimson red #dc143c glow effect, black background, rock and roll aesthetic, subtle smoke animation, 3-second seamless loop, 16:9 horizontal format 1200x675, minimal bold design, professional social media banner",
  "aspect_ratio": "16:9",
  "duration": 3,
  "fps": 24,
  "output_format": "gif",
  "quality": "high"
}' --output public/images/social/twitter/posts/logo-animation-day4.gif

# Static alternative (če GIF ne deluje)
infsh app run google/gemini-3-pro-image-preview --input '{
  "prompt": "Twitter/X post header for The Drinkers rock band, logo centered with crimson red glow, black background, text \"New website. New era. Same rock n roll.\", 16:9 horizontal format, professional social media design, Slovenian band branding",
  "aspect_ratio": "16:9",
  "output_format": "jpg"
}' --output public/images/social/twitter/posts/new-era-day4.jpg
```

**Copy za Post:**
```
New website. New era. Same rock 'n' roll. 🤘

thedrinkers.si launches soon.

#TheDrinkers #SlovenianRock
```

---

### **KAMPANJA 5: Instagram Story - "Poll: Katero Pesem?"**

```bash
# Dan 5 - Instagram Story Poll Background (9:16)
infsh app run bytedance/seedream-4-5 --input '{
  "prompt": "Instagram story background for music poll, The Drinkers album covers collage faded in background, crimson red #dc143c and black color scheme, rock band aesthetic, vertical 9:16 format, clear space in center for Instagram poll sticker, four quadrants for poll options, subtle guitar and beer mug icons, Slovenian rock band branding",
  "aspect_ratio": "9:16",
  "output_format": "jpg",
  "quality": "high"
}' --output public/images/social/instagram/stories/poll-day5.jpg

# Alternative z band photo
infsh app run falai/flux-dev-lora --input '{
  "prompt": "Instagram story with faded rock band photo background, space for poll sticker in center, crimson red overlay, text at top \"KATERO PESEM ŽELITE SLIŠATI V ŽIVO?\", vertical 9:16, The Drinkers branding",
  "aspect_ratio": "9:16",
  "output_format": "jpg"
}' --output public/images/social/instagram/stories/poll-day5-alt.jpg
```

**Manual Setup (v Instagramu):**
```
Text (top): "🎸 KATERO PESEM ŽELITE SLIŠATI V ŽIVO? 🎸"
Poll Sticker (center):
  - Option A: "Pijemo ga radi 🍺"
  - Option B: "Lepi in trezni 💪"
  - Option C: "Življenje je prekratko ⚡"
  - Option D: "Vsi na oder 🎤"
Hashtag: #TheDrinkers (bottom)
```

---

### **KAMPANJA 6: Facebook Post - "Countdown 3 Days"**

```bash
# Dan 6 - Facebook Countdown Post (1:1)
infsh app run google/gemini-3-pro-image-preview --input '{
  "prompt": "Facebook countdown post graphic, large number 3 in crimson red #dc143c with metallic texture, The Drinkers logo at top, DAYS TO LAUNCH text below number, confetti and celebration elements in corners, black background, square 1:1 format 1080x1080, bold typography, exciting atmosphere, Slovenian rock band branding, professional social media design",
  "aspect_ratio": "1:1",
  "output_format": "jpg",
  "quality": "high"
}' --output public/images/social/facebook/posts/countdown-3days-day6.jpg

# Alternative z explosion effect
infsh app run falai/flux-2-klein-lora --input '{
  "prompt": "Countdown graphic with crimson red explosion background, big number 3 in center, The Drinkers band logo, 3 DAYS TO LAUNCH text, dynamic lighting, square format, bold rock aesthetic",
  "aspect_ratio": "1:1",
  "output_format": "jpg"
}' --output public/images/social/facebook/posts/countdown-3days-alt.jpg
```

**Manual Text Overlay:**
```
Top: "🎉 ŠTEJTE Z NAMI! 🎉"
Center: "3" (large, bold)
Below: "DNI DO LAUNCHA"
Bottom: "📅 [Datum] ⏰ 18:00"
CTA: "Označite prijatelja! 👇"
```

---

### **KAMPANJA 7: ALL PLATFORMS - "JUTRI! Launch"**

```bash
# Dan 7 - Instagram Post (1:1)
infsh app run bytedance/seedream-4-5 --input '{
  "prompt": "Launch announcement Instagram post, TOMORROW 18:00 bold typography in center, The Drinkers logo prominent, crimson red #dc143c explosion background, dramatic stage lighting, square 1:1 format 1080x1080, professional social media design, Slovenian rock band, urgent exciting atmosphere, high contrast",
  "aspect_ratio": "1:1",
  "output_format": "jpg",
  "quality": "high"
}' --output public/images/social/all-platforms/launch-tomorrow-day7-instagram.jpg

# Dan 7 - Instagram Story (9:16)
infsh app run falai/flux-dev-lora --input '{
  "prompt": "Launch announcement Instagram story, TOMORROW 18:00 large text, The Drinkers logo, crimson red explosion background, vertical 9:16 format 1080x1920, countdown timer space, link sticker space at bottom, professional design",
  "aspect_ratio": "9:16",
  "output_format": "jpg"
}' --output public/images/social/all-platforms/launch-tomorrow-day7-story.jpg

# Dan 7 - Facebook Post (1:1)
infsh app run google/gemini-3-pro-image-preview --input '{
  "prompt": "Facebook launch announcement post, JUTRI OB 18:00 Slovenian text, The Drinkers logo, crimson red and black color scheme, square 1:1 format, professional social media graphic, rock band aesthetic",
  "aspect_ratio": "1:1",
  "output_format": "jpg"
}' --output public/images/social/all-platforms/launch-tomorrow-day7-facebook.jpg

# Dan 7 - Twitter/X Header (16:9)
infsh app run falai/flux-2-klein-lora --input '{
  "prompt": "Twitter/X header launch announcement, TOMORROW 18:00 bold text, The Drinkers logo, crimson red explosion, 16:9 horizontal format 1500x500, professional social media banner",
  "aspect_ratio": "16:9",
  "output_format": "jpg"
}' --output public/images/social/all-platforms/launch-tomorrow-day7-twitter.jpg

# Dan 7 - TikTok Video (9:16, 10 seconds)
infsh app run google/veo-3-1 --input '{
  "prompt": "10 second hype video for TikTok, fast text animations: [0-2s] JUTRI, [2-4s] OB 18:00, [4-6s] thedrinkers.si, [6-8s] The Drinkers logo, [8-10s] SET YOUR ALARMS, crimson red explosion transitions, vertical 9:16 format, energetic rock music in background, Slovenian rock band",
  "aspect_ratio": "9:16",
  "duration": 10,
  "fps": 30,
  "output_format": "mp4"
}' --output public/images/social/all-platforms/launch-tomorrow-day7-tiktok.mp4
```

---

## 🚀 BATCH GENERIRANJE VSEH ASSETOV

### **All-in-One Script**

```bash
#!/bin/bash
# generate-all-social-assets.sh

echo "🎸 Generiranje The Drinkers Social Media Assets..."

# Ustvari mape
mkdir -p public/images/social/{instagram/stories,instagram/reels,facebook/posts,twitter/posts,all-platforms}

# Dan 1 - Instagram Story
echo "📸 Dan 1: Instagram Story..."
infsh app run bytedance/seedream-4-5 --input '{
  "prompt": "Dark moody Instagram story teaser for rock band The Drinkers, crimson red spotlight on black background, electric guitar silhouette, stage fog, mysterious atmosphere, vertical 9:16 format",
  "aspect_ratio": "9:16",
  "output_format": "jpg"
}' --output public/images/social/instagram/stories/teaser-day1.jpg

# Dan 2 - Facebook Post
echo "📘 Dan 2: Facebook Post..."
infsh app run falai/flux-2-klein-lora --input '{
  "prompt": "Facebook post graphic for The Drinkers website launch, crimson red to black gradient, COMING SOON typography, square 1:1 format",
  "aspect_ratio": "1:1",
  "output_format": "jpg"
}' --output public/images/social/facebook/posts/coming-soon-day2.jpg

# Dan 3 - Instagram Reel
echo "🎬 Dan 3: Instagram Reel..."
infsh app run google/veo-3-1 --input '{
  "prompt": "15 second rock band teaser video, fast cuts: guitar close-up, drummer, singer, beer mug slam, logo reveal, crimson red lighting, vertical 9:16",
  "aspect_ratio": "9:16",
  "duration": 15,
  "output_format": "mp4"
}' --output public/images/social/instagram/reels/teaser-day3.mp4

# Dan 4 - Twitter/X
echo "🐦 Dan 4: Twitter/X..."
infsh app run google/veo-3-1 --input '{
  "prompt": "Animated GIF loop, The Drinkers logo with crimson red pulsing glow, black background, 3-second loop, 16:9 horizontal",
  "aspect_ratio": "16:9",
  "duration": 3,
  "output_format": "gif"
}' --output public/images/social/twitter/posts/logo-animation-day4.gif

# Dan 5 - Instagram Story Poll
echo "📊 Dan 5: Instagram Story Poll..."
infsh app run bytedance/seedream-4-5 --input '{
  "prompt": "Instagram story background for music poll, album covers collage faded, crimson red and black, space for poll sticker center, vertical 9:16",
  "aspect_ratio": "9:16",
  "output_format": "jpg"
}' --output public/images/social/instagram/stories/poll-day5.jpg

# Dan 6 - Facebook Countdown
echo "⏰ Dan 6: Facebook Countdown..."
infsh app run google/gemini-3-pro-image-preview --input '{
  "prompt": "Facebook countdown post, large number 3 in crimson red, The Drinkers logo, DAYS TO LAUNCH text, confetti, square 1:1",
  "aspect_ratio": "1:1",
  "output_format": "jpg"
}' --output public/images/social/facebook/posts/countdown-3days-day6.jpg

# Dan 7 - Launch Announcement (Instagram)
echo "🚀 Dan 7: Launch Announcement Instagram..."
infsh app run bytedance/seedream-4-5 --input '{
  "prompt": "Launch announcement Instagram post, TOMORROW 18:00 bold typography, The Drinkers logo, crimson red explosion background, square 1:1",
  "aspect_ratio": "1:1",
  "output_format": "jpg"
}' --output public/images/social/all-platforms/launch-tomorrow-day7-instagram.jpg

# Dan 7 - Launch Announcement (Story)
echo "📱 Dan 7: Launch Announcement Story..."
infsh app run falai/flux-dev-lora --input '{
  "prompt": "Launch announcement Instagram story, TOMORROW 18:00 large text, The Drinkers logo, crimson red explosion, vertical 9:16",
  "aspect_ratio": "9:16",
  "output_format": "jpg"
}' --output public/images/social/all-platforms/launch-tomorrow-day7-story.jpg

# Dan 7 - Launch Announcement (TikTok)
echo "🎵 Dan 7: Launch Announcement TikTok..."
infsh app run google/veo-3-1 --input '{
  "prompt": "10 second hype video, JUTRI OB 18:00 text animations, The Drinkers logo, crimson red transitions, vertical 9:16",
  "aspect_ratio": "9:16",
  "duration": 10,
  "output_format": "mp4"
}' --output public/images/social/all-platforms/launch-tomorrow-day7-tiktok.mp4

echo "✅ Generiranje končano!"
echo "📁 Mape: public/images/social/"
```

---

## 🎨 ALTERNATIVNI MODELI

### **Za Slike:**
| Model | Uporaba | Cena | Kvaliteta |
|-------|---------|------|-----------|
| **Seedream 4.5** | Social media graphics | $ | ⭐⭐⭐⭐⭐ |
| **FLUX.2 Klein** | Professional designs | $$ | ⭐⭐⭐⭐⭐ |
| **Gemini 3 Pro** | Multi-purpose | $$ | ⭐⭐⭐⭐ |
| **FLUX Dev LoRA** | Fast iteration | $ | ⭐⭐⭐⭐ |

### **Za Videe:**
| Model | Uporaba | Dolžina | Cena |
|-------|---------|---------|------|
| **Veo 3.1** | Short-form (Reels/TikTok) | do 60s | $$$ |
| **Wan 2.5** | High-quality video | do 120s | $$$ |
| **Seedance** | Fast generation | do 30s | $$ |

---

## 💾 SHRANJEVANJE IN ORGANIZACIJA

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
│       └── logo-animation-day4.gif
├── all-platforms/
│   ├── launch-tomorrow-day7-instagram.jpg
│   ├── launch-tomorrow-day7-story.jpg
│   ├── launch-tomorrow-day7-facebook.jpg
│   ├── launch-tomorrow-day7-twitter.jpg
│   └── launch-tomorrow-day7-tiktok.mp4
└── source-files/
    └── (AI original outputs)
```

---

## ⚡ HITRI UKAZI

### **Ponovno generiranje z boljšo kvaliteto:**
```bash
infsh app run falai/flux-2-klein-lora --input '{
  "prompt": "[isti prompt]",
  "aspect_ratio": "9:16",
  "output_format": "png",
  "quality": "ultra"
}' --output public/images/social/[path].png
```

### **Testiranje različnih stilov:**
```bash
# Minimalist
infsh app run bytedance/seedream-4-5 --input '{
  "prompt": "Minimalist rock poster, The Drinkers logo, crimson red on black, clean typography",
  "aspect_ratio": "1:1"
}'

# Vintage
infsh app run falai/flux-dev-lora --input '{
  "prompt": "Vintage rock poster 1980s aesthetic, The Drinkers, distressed texture, screen print style",
  "aspect_ratio": "1:1"
}'

# Modern
infsh app run google/gemini-3-pro-image-preview --input '{
  "prompt": "Modern rock band social media post, gradient background, bold typography, The Drinkers",
  "aspect_ratio": "1:1"
}'
```

---

## 🎯 NEXT STEPS

1. **Zaženi batch script** za generiranje vseh assetov
2. **Dodaj text overlays** v Canva/Photoshop
3. **Uploadaj** v Meta Business Suite
4. **Schedule** objave po urniku
5. **Spremljaj** engagement

---

**PRIPRAVLJENO ZA GENERIRANJE! 🚀🤘**
