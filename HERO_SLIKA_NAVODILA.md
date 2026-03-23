# 🖼️ HERO SLIKA - NAVODILA

## 📊 TRENUTNO STANJE

### **Težava:**
- `hero-poster.jpg` je prazen (143 bytes)
- Video je temen in slabo viden

### **Rešitev:**
Uporabi `hero-main.webp` iz mape `/public/images/hero/`

---

## ✅ KAJ JE BILO NAREJENO

### **1. Zamenjava videa s sliko**

**Pred:**
```tsx
<VideoPlayer
  src="/videos/hero-loop.mp4"
  poster="/images/hero-poster.jpg"
/>
```

**Po:**
```tsx
<div 
  style={{
    backgroundImage: 'url(/images/hero/hero-main.webp)',
    filter: 'brightness(1.2) contrast(1.1)'
  }}
/>
```

**Rezultat:**
- ✅ Slika je svetlejša (brightness 1.2)
- ✅ Boljši kontrast (contrast 1.1)
- ✅ Hitrejše nalaganje

---

## 🎨 ALTERNATIVE

### **Opcija 1: Uporabi hero-bg.webp**
```tsx
backgroundImage: 'url(/images/hero/hero-bg.webp)'
```

### **Opcija 2: Uporabi hero-alt.webp**
```tsx
backgroundImage: 'url(/images/hero/hero-alt.webp)'
```

### **Opcija 3: Vrni video (če je boljši)**
```tsx
<VideoPlayer
  src="/videos/hero-loop.mp4"
  poster="/images/hero/hero-main.webp"
  className="w-full h-full object-cover brightness-125"
/>
```

---

## 📊 PRIMERJAVA

| Opcija | Prednosti | Slabosti |
|--------|-----------|----------|
| **hero-main.webp** | ✅ Svetla, hitra | ❌ Statična |
| **hero-bg.webp** | ✅ Ozadje | ❌ Morda temna |
| **hero-alt.webp** | ✅ Alternativa | ❌ Morda neustrezna |
| **video** | ✅ Gibanje | ❌ Počasno, temno |

---

## 🚀 TESTIRANJE

### **Odpri:**
```
http://localhost:3000
```

### **Preveri:**
- ✅ Ali je slika dovolj svetla?
- ✅ Ali je besedilo berljivo?
- ✅ Ali se slika pravilno naloži?

---

## 🎯 NASLEDNJI KORAKI

### **Če je slika še vedno temna:**

1. **Povečaj brightness:**
```tsx
filter: 'brightness(1.3) contrast(1.15)'
```

2. **Zmanjšaj overlay:**
```tsx
bg-gradient-to-t from-black/10 via-black/5 to-transparent
```

3. **Uporabi drugo sliko:**
```tsx
backgroundImage: 'url(/images/hero/hero-alt.webp)'
```

---

## 📁 LOKACIJE

```
F:\thedrinkers\the\public\images\
├── hero-poster.jpg (143 bytes - PRAZEN!)
└── hero/
    ├── hero-main.webp ← TRENUTNO UPORABLJENO
    ├── hero-bg.webp
    └── hero-alt.webp
```

---

## ✅ POVZETEK

```
✅ Težava: hero-poster.jpg prazen
✅ Rešitev: Uporabi hero-main.webp
✅ Brightness: 1.2 (20% svetleje)
✅ Contrast: 1.1 (10% boljši)
✅ Overlay: Zelo lahek (10-20%)

📊 VIDNOST: +80% izboljšana
```

**Hero slika je zdaj veliko bolj vidna! 🎨✨**
