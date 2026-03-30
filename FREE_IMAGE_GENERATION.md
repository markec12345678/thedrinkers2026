# 🖼️ FREE IMAGE GENERATION OPTIONS

**Brezplačne alternative za generiranje slik**

---

## ✅ KAJ IMAMO NAMEŠČENO:

### **1. Pollinations AI** ✅ (100% FREE)

```
✅ Brez API key
✅ Brez registracije
✅ FLUX model
✅ Hitro generiranje
✅ Commercial use allowed
```

**URL:**

```
https://image.pollinations.ai/prompt/{PROMPT}
```

**Parameters:**

```
- width: 1080 (default)
- height: 1080 (default)
- seed: 42 (random)
- model: flux (default)
- nologo: true
```

---

## 🎨 POLLINATIONS.AI PRIMERI:

### **Album Covers:**

```
https://image.pollinations.ai/prompt/
dark-moody-rock-album-cover-vinyl-record-crimson-red-spotlight-guitar?
width=1000&height=1000&model=flux&nologo=true&seed=42
```

### **Band Photos:**

```
https://image.pollinations.ai/prompt/
rock-band-stage-performance-dramatic-lighting-silhouette?
width=1000&height=667&model=flux&nologo=true&seed=42
```

### **Social Media:**

```
https://image.pollinations.ai/prompt/
instagram-square-rock-concert-announcement-bold-typography?
width=1080&height=1080&model=flux&nologo=true&seed=42
```

---

## 🚀 KAKO UPORABITI:

### **Option 1: Direct URL (Najlažje)**

```bash
# Just download from URL
curl -o "public/images/album-cover.jpg" \
  "https://image.pollinations.ai/prompt/rock-album-cover?width=1000&height=1000&model=flux"
```

### **Option 2: Batch Script**

```bash
# Ustvari script: generate-images.sh
curl -o "public/images/album-1.jpg" \
  "https://image.pollinations.ai/prompt/dark-rock-album-cover-vinyl?width=1000&height=1000&seed=1"

curl -o "public/images/album-2.jpg" \
  "https://image.pollinations.ai/prompt/energetic-rock-concert-crowd?width=1000&height=1000&seed=2"

# ... continue for all images
```

### **Option 3: React Component**

```jsx
// V komponentah uporabi direktno URL
<img
  src="https://image.pollinations.ai/prompt/rock-album-cover?width=400&height=400"
  alt="Album cover"
/>
```

---

## 📋 FREE ALTERNATIVES:

### **1. Pollinations AI** ⭐⭐⭐⭐⭐

```
✅ 100% FREE
✅ No API key needed
✅ FLUX model
✅ Fast
✅ Commercial use
URL: https://image.pollinations.ai
```

### **2. Unsplash Source** ⭐⭐⭐⭐

```
✅ FREE stock photos
✅ High quality
✅ No API key
❌ Not AI-generated
URL: https://source.unsplash.com
```

### **3. Pexels API** ⭐⭐⭐⭐

```
✅ FREE tier available
✅ High quality
✅ API key required (free)
❌ Not AI-generated
URL: https://www.pexels.com/api
```

### **4. Placeholder.com** ⭐⭐⭐

```
✅ 100% FREE
✅ Simple
❌ Just placeholders
URL: https://placeholder.com
```

---

## 🎯 MOJ PRIPOROČILO:

**Uporabi Pollinations AI!** ✅

**Zakaj:**

```
✅ 100% brezplačno
✅ AI generirano (FLUX model)
✅ Brez API key
✅ Hitro in enostavno
✅ Commercial use allowed
✅ Dobra kvaliteta
```

---

## 📝 AKCIJSKI NAČRT:

### **Danes (30 min):**

**1. Testiraj Pollinations:**

```bash
# Testiraj z enim image
curl -o "public/images/test.jpg" \
  "https://image.pollinations.ai/prompt/rock-album-cover?width=500&height=500"

# Odpri: public/images/test.jpg
# Preveri kvaliteto
```

**2. Generiraj vse slike:**

```bash
# Ustvari script: generate-all-images.sh
# Generiraj 20-30 slik za:
- Album covers (8)
- Band photos (5)
- Social media (10)
- Placeholders (10)
```

**3. Updateaj komponente:**

```jsx
// Zamenjaj placeholderje z AI slikami
<img src="/images/album-na-zdravje.svg" />
// ↓
<img src="/images/album-na-zdravje.jpg" />
```

---

## 💡 PRO TIPS:

### **1. Batch Download:**

```bash
#!/bin/bash
# generate-all.sh

mkdir -p public/images/albums
mkdir -p public/images/band
mkdir -p public/images/social

# Album covers
for i in {1..8}; do
  curl -o "public/images/albums/album-$i.jpg" \
    "https://image.pollinations.ai/prompt/rock-album-cover-vinyl?width=1000&height=1000&seed=$i"
  sleep 2 # Wait between requests
done

# Band photos
for i in {1..5}; do
  curl -o "public/images/band/band-$i.jpg" \
    "https://image.pollinations.ai/prompt/rock-band-performance-stage?width=1000&height=667&seed=$((i+10))"
  sleep 2
done

echo "✅ All images generated!"
```

### **2. Optimize Images:**

```bash
# Install sharp
npm install sharp

# Optimize script
node scripts/optimize-images.js
```

### **3. Use Next.js Image:**

```jsx
import Image from "next/image";

<Image
  src="/images/album-1.jpg"
  alt="Album"
  width={400}
  height={400}
  priority
/>;
```

---

## 🚀 ŽELIŠ DA GENERIRAM SLIKE ZATE?

**Lahko takoj generiram:**

1. **Album covers** (8 slik)
2. **Band photos** (5 slik)
3. **Social media graphics** (10 slik)
4. **All placeholders** (30+ slik)

**Želiš da začnem generirati?** 🎨✨

**Povej mi:**

- A) Generiraj vse naenkrat?
- B) Najprej testiraj z nekaj slikami?
- C) Pokaži mi kako se uporablja?

**Kaj želiš?** 🚀
