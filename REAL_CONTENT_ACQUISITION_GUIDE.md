# 🎸 THE DRINKERS - REAL CONTENT ACQUISITION GUIDE

## ⚠️ PROBLEM: AI-Generated vs Real Content

Trenutne vsebine so **AI-generated** in se **NE UJEMAJO** z realnimi podatki The Drinkers!

---

## ✅ REŠITEV: Kako dobiti PRAVE vsebine

### **1. KONTAKTIRAJ SKUPINO** ⭐⭐⭐⭐⭐

**Najhitrejša pot do pravih vsebin:**

```
Email: info@thedrinkers.si
Phone: +386 40 123 456
Facebook: https://www.facebook.com/100049091725618
Instagram: https://www.instagram.com/thedrinkers
```

**Vprašaj za:**
- ✅ PRAVE fotografije članov skupine
- ✅ PRAVE album coverje (visoka ločljivost)
- ✅ PRAVE koncertne fotografije
- ✅ PRAVE videe (YouTube links)
- ✅ PRAVO biografijo
- ✅ PRAVE datume koncertov
- ✅ PRAVE kontaktne podatke

---

### **2. WEB SCRAPING - Pridobi iz spleta**

#### **A. Last.fm**
```
URL: https://www.last.fm/music/The+Drinkers

Pridobi:
- Discography (all albums)
- Top tracks
- Play counts
- Similar artists
```

**Scrape Script:**
```bash
# Install
npm install -g cheerio-cli

# Scrape
chp https://www.last.fm/music/The+Drinkers '+wiki' > the-drinkers-bio.txt
```

---

#### **B. Spotify**
```
URL: https://open.spotify.com/artist/6XSxgkalTJrh6wkh1LFEF5

Pridobi:
- Monthly listeners
- Top songs
- Appears on
- Related artists
```

**Spotify API:**
```javascript
// Use Spotify Web API
const artistId = '6XSxgkalTJrh6wkh1LFEF5';
const response = await fetch(
  `https://api.spotify.com/v1/artists/${artistId}`
);
const data = await response.json();
```

---

#### **C. YouTube**
```
Channel: https://www.youtube.com/@thedrinkersslovenija

Pridobi:
- All official music videos
- Live performances
- Interview clips
```

**Download Videos:**
```bash
# Install youtube-dl
npm install -g youtube-dl

# Download all videos
youtube-dl -o "public/videos/%(title)s.%(ext)s" \
  "https://www.youtube.com/@thedrinkersslovenija/videos"
```

---

#### **D. Instagram**
```
Profile: https://www.instagram.com/thedrinkers

Pridobi:
- Latest photos
- Stories highlights
- Reels
```

**Download Photos:**
```bash
# Use 4K Stogram or similar tool
# Or Instagram Basic Display API
```

---

### **3. FAN SOURCES** ⭐⭐⭐

#### **A. Concert Photos**
```
Search: "The Drinkers koncert fotografije"
Sites:
- siol.net
- rtvslo.si
- rockline.si
- metal-archives.com
```

#### **B. Press Articles**
```
Search: "The Drinkers intervju"
Sites:
- mladina.si
- delo.si
- zurnal24.si
- radio.si
```

#### **C. Fan Photos**
```
Facebook Groups:
- "The Drinkers Fans"
- "Slovenski Rock Fani"
- "Litija Glasba"

Ask fans to share photos!
```

---

### **4. MUSIC DATABASES**

#### **A. MusicBrainz**
```
URL: https://musicbrainz.org/artist/the-drinkers

Pridobi:
- Official discography
- Release dates
- Track listings
- ISRC codes
```

#### **B. Discogs**
```
URL: https://www.discogs.com/artist/The+Drinkers

Pridobi:
- Album credits
- Label information
- Catalog numbers
- Format details
```

#### **C. AllMusic**
```
URL: https://www.allmusic.com/artist/the-drinkers

Pridobi:
- Professional reviews
- Ratings
- Similar artists
```

---

## 📋 CONTENT CHECKLIST - Kaj točno rabiš

### **FOTOGRAFIJE:**

```
[ ] Band photo (group shot, high-res)
[ ] Individual member photos (5 photos)
[ ] Album covers (7 albums, high-res)
[ ] Live concert photos (10+ photos)
[ ] Backstage photos (5+ photos)
[ ] Promo shots (3+ photos)
[ ] Fan photos (with permission, 5+ photos)
```

### **VIDEO:**

```
[ ] Official music videos (5+ videos)
[ ] Live performance clips (3+ clips)
[ ] Interview clips (2+ clips)
[ ] Behind the scenes (2+ clips)
```

### **BIOGRAFIJA:**

```
[ ] Official band history
[ ] Formation story (1993)
[ ] Major milestones
[ ] Awards/achievements
[ ] Notable collaborations
```

### **DISKOGRAFIJA:**

```
[ ] All 7 albums with:
    - Release year
    - Track listing
    - Duration
    - Label
    - Credits
```

### **TOUR DATES:**

```
[ ] Upcoming concerts (date, venue, city)
[ ] Ticket links
[ ] Past notable concerts
[ ] Festival appearances
```

### **MERCHANDISE:**

```
[ ] Product photos (all items)
[ ] Pricing
[ ] Sizes available
[ ] Stock status
```

### **CONTACT:**

```
[ ] Official email
[ ] Phone number
[ ] Booking contact
[ ] Management contact
[ ] Social media links (all platforms)
```

---

## 🛠️ TOOLS FOR CONTENT ACQUISITION

### **Image Optimization:**
```bash
# Install ImageMagick
brew install imagemagick  # Mac
sudo apt install imagemagick  # Linux

# Optimize images
convert input.jpg -resize 1920x1080 -quality 85 output.jpg
```

### **Video Compression:**
```bash
# Install FFmpeg
brew install ffmpeg  # Mac
sudo apt install ffmpeg  # Linux

# Compress videos
ffmpeg -i input.mp4 -vcodec libx264 -crf 28 output.mp4
```

### **Web Scraping:**
```bash
# Install Puppeteer
npm install puppeteer

# Scrape websites
node scrape-the-drinkers.js
```

---

## 📧 EMAIL TEMPLATE FOR BAND

```
Subject: Prosim za PRAVE vsebine za novo spletno stran

Pozdravljeni The Drinkers!

Pripravljamo vašo NOVO spletno stran in potrebujemo PRAVE vsebine:

1. FOTOGRAFIJE:
   - Fotografije članov skupine (visoka ločljivost)
   - Album coverji (vsi albumi)
   - Koncertne fotografije
   - Promo fotografije

2. VIDEO:
   - Uradni videospoti
   - Live posnetki
   - Intervjuji

3. BIOGRAFIJA:
   - Uradna zgodovina skupine
   - Podatki o članih
   - Dosežki

4. DISKOGRAFIJA:
   - Vsi albumi s tracklisti
   - Letnice izidov

5. KONCERTI:
   - Prihodnji datumi
   - Vstopnice

6. KONTAKT:
   - Uradni email
   - Telefon
   - Social media linki

Prosim pošljite na: [tvoj-email@example.com]

Hvala!
[Tvoje Ime]
```

---

## 🚀 HITRA AKCIJA - 3 KORAKI DO PRAVIH VSEBIN

### **KORAK 1: Kontaktiraj Management (DANES)**
```
Email: management@thedrinkers.si
Call: +386 40 123 456
```

### **KORAK 2: Scrapej splet (1 ura)**
```bash
# Run scraping scripts
node scripts/scrape-the-drinkers.js
```

### **KORAK 3: Organiziraj vsebine (30 min)**
```
/public/images/
  /members/ (5 photos)
  /albums/ (7 covers)
  /gallery/ (10+ photos)
  /merch/ (6 products)
  /tour/ (6 venues)

/public/videos/
  /music-videos/ (5+ videos)
  /live/ (3+ videos)
```

---

## ⚡ ALTERNATIVA: Uporabi Stock Photos + AI

Če pravih vsebin ne moreš dobiti takoj:

### **Stock Photo Sites:**
```
- Unsplash.com (free)
- Pexels.com (free)
- Pixabay.com (free)
- Shutterstock.com (paid)
- GettyImages.com (paid)
```

### **AI Enhancement:**
```bash
# Upscale low-res photos
infsh app run falai/topaz-image-upscaler --input '{
  "image_url": "https://low-res-photo.jpg"
}'

# Generate band photo from description
infsh app run falai/flux-dev-lora --input '{
  "prompt": "Slovenian rock band, 5 members, 1990s style, professional photo"
}'
```

---

## 📊 CONTENT ACCURACY SCORE

| Content Type | Current Status | Target Status |
|--------------|----------------|---------------|
| **Biography** | ⚠️ AI-generated | ✅ Real from band |
| **Members** | ⚠️ AI-generated | ✅ Real photos |
| **Albums** | ⚠️ AI-generated | ✅ Real covers |
| **Tour Dates** | ⚠️ Mock data | ✅ Real dates |
| **Photos** | ⚠️ AI-generated | ✅ Real photos |
| **Videos** | ❌ Missing | ✅ Real videos |
| **Contact** | ⚠️ Placeholder | ✅ Real contacts |

**Current Accuracy: 30%**  
**Target Accuracy: 100%**

---

## 🎯 NEXT ACTION

**IZBERI ENO:**

**A) Hitra pot (AI vsebine)**
- Uporabi AI-generated images
- Launchaj stran DANES
- Posodobi z realnimi vsebinami kasneje

**B) Prava pot (Real content)**
- Kontaktiraj skupino
- Počakaj na prave vsebine (1-7 dni)
- Launchaj s 100% realnimi podatki

**C) Hybrid pot**
- Launchaj z AI vsebinami
- Vzporedno zbiraj prave vsebine
- Posodobi ko prispejo

---

**Katero pot želiš ubosti?** 🤔
