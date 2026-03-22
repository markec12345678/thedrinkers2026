# 🎨 THE DRINKERS - AI IMAGE GENERATION NAVODILA

## ⚠️ POMembno: inference.sh API Status

inference.sh je **agent runtime platforma**, ne direktni image generation API. 
Za generiranje slik uporabite eno od naslednjih možnosti:

---

## 🌐 MOŽNOST 1: Web Interface (PRIPOROČENO)

### **Koraki:**

1. **Obišči:** https://inference.sh
2. **Login** z tvojim API ključem: `1nfsh-5n2ewp39yxpxbvzt4gydp19hbe`
3. **Izberi app** iz library:
   - `bytedance/seedream-4-5` za Instagram stories
   - `falai/flux-2-klein-lora` za Facebook posts
   - `google/gemini-3-pro-image-preview` za countdown graphics
4. **Vnesi prompt** (glej spodaj)
5. **Generiraj** in **downloadaj** sliko

### **Prompti za vsako kampanjo:**

#### **Dan 1 - Instagram Story Teaser:**
```
Dark moody Instagram story teaser for rock band The Drinkers, crimson red spotlight 
on black background, electric guitar silhouette, stage fog, mysterious atmosphere, 
vertical 9:16 format, authentic rock aesthetic
```
**Model:** `bytedance/seedream-4-5`  
**Aspect:** `9:16`

---

#### **Dan 2 - Facebook Post:**
```
Facebook post graphic for The Drinkers website launch announcement, crimson red to 
black gradient background, band logo in center, COMING SOON bold typography, 
professional social media design, square 1:1 format
```
**Model:** `falai/flux-2-klein-lora`  
**Aspect:** `1:1`

---

#### **Dan 5 - Instagram Story Poll:**
```
Instagram story background for music poll, album covers collage faded, crimson red 
and black color scheme, space for poll sticker in center, vertical 9:16 format
```
**Model:** `bytedance/seedream-4-5`  
**Aspect:** `9:16`

---

#### **Dan 6 - Facebook Countdown:**
```
Facebook countdown post graphic, large number 3 in crimson red with metallic texture, 
The Drinkers logo at top, DAYS TO LAUNCH text, confetti and celebration elements, 
square 1:1 format
```
**Model:** `google/gemini-3-pro-image-preview`  
**Aspect:** `1:1`

---

#### **Dan 7 - Launch Announcement (Instagram):**
```
Launch announcement Instagram post, TOMORROW 18:00 bold typography in center, 
The Drinkers logo prominent, crimson red explosion background, dramatic stage lighting, 
square 1:1 format
```
**Model:** `bytedance/seedream-4-5`  
**Aspect:** `1:1`

---

#### **Dan 7 - Launch Announcement (Story):**
```
Launch announcement Instagram story, TOMORROW 18:00 large text, The Drinkers logo, 
crimson red explosion background, vertical 9:16 format
```
**Model:** `falai/flux-dev-lora`  
**Aspect:** `9:16`

---

## 🆓 MOŽNOST 2: Hugging Face (Brezplačno)

### **Namesti:**
```bash
pip install huggingface_hub
```

### **Python Skripta:**
```python
from huggingface_hub import InferenceClient
import requests

client = InferenceClient(token="hf_TVOJ_TOKEN")

# Dan 1 - Instagram Story
response = client.text_to_image(
    "Dark moody Instagram story teaser, crimson red spotlight, guitar silhouette, 9:16",
    model="black-forest-labs/FLUX.1-dev"
)
response.save("public/images/social/instagram/stories/teaser-day1.jpg")
```

**Dobi token:** https://huggingface.co/settings/tokens

---

## 🆓 MOŽNOST 3: Pollinations.ai (Brezplačno, Brez Login)

### **URL Generator:**
```
https://image.pollinations.ai/prompt/{PROMPT}?width={W}&height={H}&seed={S}&model={MODEL}
```

### **Primeri:**

**Dan 1 - Instagram Story:**
```
https://image.pollinations.ai/prompt/Dark%20moody%20Instagram%20story%20teaser%20rock%20band%20crimson%20red%20spotlight%20guitar%20silhouette?width=1080&height=1920&seed=42&model=flux
```

**Dan 2 - Facebook Post:**
```
https://image.pollinations.ai/prompt/Facebook%20post%20graphic%20crimson%20red%20black%20gradient%20COMING%20SOON%20typography?width=1080&height=1080&seed=42&model=flux
```

**Dan 5 - Poll Background:**
```
https://image.pollinations.ai/prompt/Instagram%20story%20background%20music%20poll%20album%20covers%20collage%20crimson%20red%20black?width=1080&height=1920&seed=42&model=flux
```

**Dan 6 - Countdown:**
```
https://image.pollinations.ai/prompt/Facebook%20countdown%20post%20large%20number%203%20crimson%20red%20confetti?width=1080&height=1080&seed=42&model=flux
```

**Dan 7 - Launch:**
```
https://image.pollinations.ai/prompt/Launch%20announcement%20TOMORROW%2018:00%20bold%20typography%20crimson%20red%20explosion?width=1080&height=1080&seed=42&model=flux
```

### **Download:**
```powershell
# Dan 1
curl -o "public/images/social/instagram/stories/teaser-day1.jpg" "https://image.pollinations.ai/prompt/Dark%20moody%20Instagram%20story%20teaser%20rock%20band%20crimson%20red%20spotlight%20guitar%20silhouette?width=1080&height=1920&seed=42&model=flux"

# Dan 2
curl -o "public/images/social/facebook/posts/coming-soon-day2.jpg" "https://image.pollinations.ai/prompt/Facebook%20post%20graphic%20crimson%20red%20black%20gradient%20COMING%20SOON%20typography?width=1080&height=1080&seed=42&model=flux"

# Dan 5
curl -o "public/images/social/instagram/stories/poll-day5.jpg" "https://image.pollinations.ai/prompt/Instagram%20story%20background%20music%20poll%20album%20covers%20collage%20crimson%20red%20black?width=1080&height=1920&seed=42&model=flux"

# Dan 6
curl -o "public/images/social/facebook/posts/countdown-3days-day6.jpg" "https://image.pollinations.ai/prompt/Facebook%20countdown%20post%20large%20number%203%20crimson%20red%20confetti?width=1080&height=1080&seed=42&model=flux"

# Dan 7 - Instagram
curl -o "public/images/social/all-platforms/launch-tomorrow-day7-instagram.jpg" "https://image.pollinations.ai/prompt/Launch%20announcement%20TOMORROW%2018:00%20bold%20typography%20crimson%20red%20explosion?width=1080&height=1080&seed=42&model=flux"

# Dan 7 - Story
curl -o "public/images/social/all-platforms/launch-tomorrow-day7-story.jpg" "https://image.pollinations.ai/prompt/Launch%20announcement%20Instagram%20story%20TOMORROW%2018:00%20large%20text%20crimson%20red%20explosion?width=1080&height=1920&seed=42&model=flux"
```

---

## 🎨 MOŽNOST 4: Canva AI (Free Tier)

1. **Obišči:** https://canva.com
2. **Magic Media** (Text-to-Image)
3. **Vnesi prompt**
4. **Download** v zahtevanem formatu

---

## 📊 PRIMERJAVA

| Orodje | Cena | Kvaliteta | Hitrost | Login |
|--------|------|-----------|---------|-------|
| **inference.sh** | $$ | ⭐⭐⭐⭐⭐ | Hitro | ✅ |
| **Pollinations.ai** | 🆓 | ⭐⭐⭐⭐ | Zelo hitro | ❌ |
| **Hugging Face** | 🆓/$$ | ⭐⭐⭐⭐ | Srednje | ✅ |
| **Canva AI** | 🆓/$$ | ⭐⭐⭐⭐ | Hitro | ✅ |

---

## 🚀 PRIPOROČILO

Za **hitro in brezplačno** generiranje uporabi **Pollinations.ai** (MOŽNOST 3).

Skripta za avtomatsko generiranje:

```powershell
# Ustvari mape
mkdir -p public/images/social/instagram/stories
mkdir -p public/images/social/facebook/posts
mkdir -p public/images/social/all-platforms

# Generiraj vse slike z Pollinations.ai
curl -o "public/images/social/instagram/stories/teaser-day1.jpg" "https://image.pollinations.ai/prompt/Dark%20moody%20Instagram%20story%20teaser%20rock%20band%20crimson%20red%20spotlight%20guitar%20silhouette%20The%20Drinkers?width=1080&height=1920&seed=42&model=flux"

curl -o "public/images/social/facebook/posts/coming-soon-day2.jpg" "https://image.pollinations.ai/prompt/Facebook%20post%20graphic%20crimson%20red%20black%20gradient%20COMING%20SOON%20typography%20The%20Drinkers?width=1080&height=1080&seed=43&model=flux"

curl -o "public/images/social/instagram/stories/poll-day5.jpg" "https://image.pollinations.ai/prompt/Instagram%20story%20background%20music%20poll%20album%20covers%20collage%20crimson%20red%20black%20The%20Drinkers?width=1080&height=1920&seed=44&model=flux"

curl -o "public/images/social/facebook/posts/countdown-3days-day6.jpg" "https://image.pollinations.ai/prompt/Facebook%20countdown%20post%20large%20number%203%20crimson%20red%20metallic%20confetti%20The%20Drinkers?width=1080&height=1080&seed=45&model=flux"

curl -o "public/images/social/all-platforms/launch-tomorrow-day7-instagram.jpg" "https://image.pollinations.ai/prompt/Launch%20announcement%20TOMORROW%2018:00%20bold%20typography%20crimson%20red%20explosion%20The%20Drinkers?width=1080&height=1080&seed=46&model=flux"

curl -o "public/images/social/all-platforms/launch-tomorrow-day7-story.jpg" "https://image.pollinations.ai/prompt/Launch%20announcement%20Instagram%20story%20TOMORROW%2018:00%20large%20text%20crimson%20red%20explosion%20The%20Drinkers?width=1080&height=1920&seed=47&model=flux"
```

---

## 📁 IZHODNA STRUKTURA

```
public/images/social/
├── instagram/
│   ├── stories/
│   │   ├── teaser-day1.jpg
│   │   └── poll-day5.jpg
│   └── reels/
│       └── (video files)
├── facebook/
│   └── posts/
│       ├── coming-soon-day2.jpg
│       └── countdown-3days-day6.jpg
└── all-platforms/
    ├── launch-tomorrow-day7-instagram.jpg
    └── launch-tomorrow-day7-story.jpg
```

---

**Za videe uporabi:** https://inference.sh ali https://runwayml.com

🤘🍺
