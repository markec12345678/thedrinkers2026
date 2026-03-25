# 📹 VIDEO SETUP - THE DRINKERS

**Navodila za pripravo video backgrounda za Hero section**

---

## 🎬 VIDEO PRIPRAVA

### **1. Posnemi Video:**

```
- Dolžina: 30-60 sekund
- Vsebina: Najboljši live nastopi
- Format: Loop-friendly (seamless loop)
- Ločljivost: 1920x1080 (Full HD)
- Frame rate: 24-30 fps
```

### **2. Video Specifikacije:**

```
✅ Format: .mp4 + .webm (fallback)
✅ Size: Max 5MB (optimized)
✅ Codec: H.264 (mp4), VP9 (webm)
✅ Bitrate: 2-5 Mbps
✅ Audio: Removed (muted)
```

### **3. Optimizacija:**

```bash
# FFmpeg commands za optimizacijo:

# MP4
ffmpeg -i input.mp4 -vcodec libx264 -crf 28 -an output.mp4

# WebM
ffmpeg -i input.mp4 -vcodec libvpx-vp9 -crf 48 -b:v 0 -an output.webm
```

---

## 📁 FILE STRUCTURE

```
public/
└── videos/
    ├── live-concert-hero.mp4    ← Main video
    └── live-concert-hero.webm   ← Fallback
```

---

## 🎥 VIDEO IDEAS

### **Scene za vključiti:**

1. ✅ Crowd shots (množica navdušena)
2. ✅ Band performing (skupina igra)
3. ✅ Guitar solos (kitarski soloji)
4. ✅ Drummer energy (bobnar energija)
5. ✅ Stage lights (oder luči)
6. ✅ Fan reactions (fan odzivi)

### **Loop Points:**

- Začetek in konec morata biti seamless
- Fade in/out transition
- Consistent lighting

---

## 📊 PERFORMANCE

### **Video Optimization:**

```
Original:    50 MB  ❌
Optimized:   5 MB   ✅
Reduction:   90%    ✅
```

### **Loading Strategy:**

```tsx
// Video loads after initial paint
// Image shows first (placeholder)
// Video replaces when loaded
```

---

## 🎨 FALLBACK

### **Če video ne deluje:**

```tsx
// Shows static image instead
<Image src="/images/hero/hero-bg.webp" alt="The Drinkers Live" fill priority />
```

---

## ✅ CHECKLIST

### **Video Production:**

- [ ] Posnemi 30-60s live footage
- [ ] Izberi najboljše momente
- [ ] Uredi seamless loop
- [ ] Exportaj v .mp4 in .webm
- [ ] Optimiziraj size (<5MB)
- [ ] Uploadaj v `/public/videos/`

### **Technical Setup:**

- [x] Video tag v HeroNew.tsx
- [x] Multiple sources (mp4 + webm)
- [x] Fallback image
- [x] AutoPlay, Loop, Muted
- [x] PlaysInline attribute

---

## 🚀 IMPLEMENTACIJA

### **Koda je pripravljena:**

```tsx
// HeroNew.tsx already has:
<video
  autoPlay
  loop
  muted
  playsInline
  className="absolute inset-0 w-full h-full object-cover"
>
  <source src="/videos/live-concert-hero.mp4" type="video/mp4" />
  <source src="/videos/live-concert-hero.webm" type="video/webm" />
</video>
```

### **Samo dodaj video:**

1. Posnemi video
2. Optimiziraj
3. Shrani v `public/videos/`
4. Refresh strani

---

## 💡 TIPS

### **Best Practices:**

- ✅ Use tripod for stable shots
- ✅ Good lighting is crucial
- ✅ Capture multiple angles
- ✅ Include crowd reactions
- ✅ End on same frame as start

### **Avoid:**

- ❌ Shaky camera work
- ❌ Dark footage
- ❌ Abrupt cuts
- ❌ Large file sizes
- ❌ Audio sync issues

---

**Video background je pripravljen - samo dodaj pravi video! 🎬🤘🍺**
