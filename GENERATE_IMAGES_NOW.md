# 🎨 THE DRINKERS - NAVODILA ZA GENERIRANJE SLIK

## ⚡ HITRA NAVODILA (5 minut)

Ker inference.sh zahteva web interface, sledi tem korakom:

---

## 🌐 MOŽNOST 1: Bing Image Creator (PRIPOROČENO - Brezplačno)

### **Koraki:**

1. **Odpri:** https://www.bing.com/images/create
2. **Prijavi se** z Microsoft accountom (brezplačno)
3. **Kopiraj prompt** iz spodnje tabele
4. **Prilepi** in klikni **Create**
5. **Downloadaj** najboljšo sliko
6. **Shrani** v pravo mapo

### **Prompti za vsako sliko:**

| Dan | Ime | Prompt | Mapa |
|-----|-----|--------|------|
| **1** | teaser-day1.jpg | `Dark moody Instagram story vertical 9:16, crimson red spotlight on black background, electric guitar silhouette, stage fog, mysterious atmosphere, rock band aesthetic, professional photography, The Drinkers band` | public/images/social/instagram/stories/ |
| **2** | coming-soon-day2.jpg | `Facebook post square 1:1, crimson red to black gradient background, COMING SOON bold typography in center, professional social media graphic, rock band The Drinkers launch announcement` | public/images/social/facebook/posts/ |
| **5** | poll-day5.jpg | `Instagram story vertical 9:16, music album covers collage faded background, crimson red and black color scheme, space in center for poll sticker, rock band aesthetic` | public/images/social/instagram/stories/ |
| **6** | countdown-day6.jpg | `Facebook post square 1:1, large number 3 in crimson red metallic texture, DAYS TO LAUNCH text, confetti celebration elements, The Drinkers logo, exciting atmosphere` | public/images/social/facebook/posts/ |
| **7a** | launch-instagram.jpg | `Instagram post square 1:1, TOMORROW 18:00 bold typography center, crimson red explosion background, The Drinkers band logo, dramatic stage lighting, launch announcement` | public/images/social/all-platforms/ |
| **7b** | launch-story.jpg | `Instagram story vertical 9:16, TOMORROW 18:00 large text, crimson red explosion background, The Drinkers logo, countdown timer space at bottom` | public/images/social/all-platforms/ |

---

## 🎨 MOŽNOST 2: Leonardo.ai (150 Free Credits/Day)

### **Setup:**

1. **Registracija:** https://leonardo.ai
2. **Potrdi email**
3. **Dobi API ključ:** Profile → API Tokens → Create Token
4. **Shrani** API ključ

### **Generiranje:**

1. **Odpri:** https://app.leonardo.ai/ai-image-generator
2. **Izberi model:** Leonardo Phoenix ali Absolute Reality
3. **Vnesi prompt** (glej tabelo zgoraj)
4. **Aspect Ratio:** 
   - Instagram Story: 9:16
   - Facebook/Instagram Post: 1:1
5. **Generate**
6. **Download**

---

## 🆓 MOŽNOST 3: Playground AI (500 Free/Day)

1. **Odpri:** https://playgroundai.com
2. **Login** z Google accountom
3. **Create** → Text-to-Image
4. **Vnesi prompt**
5. **Generate**
6. **Download**

---

## 📁 STRUKTURA MAP

Pred generiranjem ustvari mape:

```powershell
mkdir public\images\social\instagram\stories
mkdir public\images\social\instagram\reels
mkdir public\images\social\facebook\posts
mkdir public\images\social\twitter\posts
mkdir public\images\social\all-platforms
```

---

## ✅ KONTROLNA LISTA

### **Pred generiranjem:**
- [ ] Izberi eno izmed možnosti zgoraj
- [ ] Odpri image generator
- [ ] Pripravi vse prompte (copy-paste v notepad)
- [ ] Ustvari mape

### **Med generiranjem:**
- [ ] Generiraj sliko za Dan 1 → shrani v instagram/stories/
- [ ] Generiraj sliko za Dan 2 → shrani v facebook/posts/
- [ ] Generiraj sliko za Dan 5 → shrani v instagram/stories/
- [ ] Generiraj sliko za Dan 6 → shrani v facebook/posts/
- [ ] Generiraj sliko za Dan 7a → shrani v all-platforms/
- [ ] Generiraj sliko za Dan 7b → shrani v all-platforms/

### **Po generiranju:**
- [ ] Preveri kvaliteto vseh slik
- [ ] Po potrebi dodaj text v Canva.com
- [ ] Uploadaj v Meta Business Suite
- [ ] Schedule objave

---

## 🎯 PRIMERI DOBRIH PROMPTOV

### **Za Rock Band Teaser:**
```
Dark moody concert teaser, crimson red stage lighting, 
electric guitar silhouette in fog, mysterious atmosphere, 
vertical format for Instagram story, authentic rock aesthetic, 
professional photography, The Drinkers Slovenian rock band
```

### **Za Launch Announcement:**
```
Bold launch announcement graphic, TOMORROW 18:00 large 
typography, crimson red explosion background, rock band logo 
center, dramatic concert lighting, square format for Instagram, 
professional social media design
```

---

## 💡 TIPS

1. **Aspect Ratio je ključen:**
   - Instagram Story/Reel/TikTok: **9:16** (1080x1920)
   - Instagram Post/Facebook: **1:1** (1080x1080)
   - Twitter/X: **16:9** (1200x675)

2. **Style consistency:**
   - Uporabljaj "crimson red" (#dc143c) v vseh promptih
   - Ohrani "rock band aesthetic" skozi vse slike

3. **Text overlays:**
   - AI ne generira vedno dobrega texta
   - Dodaj text kasneje v Canva.com ali Photoshopu

---

## 🔗 LINKI

- **Bing Image Creator:** https://bing.com/images/create
- **Leonardo.ai:** https://leonardo.ai
- **Playground AI:** https://playgroundai.com
- **Canva (za text):** https://canva.com
- **Meta Business Suite:** https://business.facebook.com

---

**Ko so slike generirane, odpri SOCIAL_MEDIA_POSTING_SCHEDULE.md za navodila objavljanja!**

🤘🍺
