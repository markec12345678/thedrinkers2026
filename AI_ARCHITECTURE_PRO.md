# 🤖 AI ARCHITECTURE - PRO LEVEL

## 🎯 Pravilna Arhitektura

### **1. 🔒 AI Layer (SKRIT - ADMIN ONLY)**

API endpointi ki jih uporablja **SAMO admin**:

```
/api/ai/generate        → Admin generira slike
/api/social/generate-post → Admin generira social vsebino
/api/seo/optimize       → Admin optimizira SEO
```

**Userji tega NE vidijo!**

---

### **2. 🎨 Content Layer (FRONTEND)**

**User vidi:**
- ✅ Slike
- ✅ Video
- ✅ Glasbo
- ✅ Galerijo

**User NE vidi:**
- ❌ Promptov
- ❌ Generatorjev
- ❌ AI toolov
- ❌ Admin funkcionalnosti

---

## 🧩 Workflow

### **Kako deluje:**

```
┌─────────────────────────────────────────────────────┐
│ 1. ADMIN (TI)                                       │
│    ┌──────────────────────────────────────────┐     │
│    │ node scripts/admin-generate-ai-images.js │     │
│    └──────────────────────────────────────────┘     │
│                    ↓                                  │
│    ┌──────────────────────────────────────────┐     │
│    │ /api/ai/generate (internal call)         │     │
│    └──────────────────────────────────────────┘     │
│                    ↓                                  │
│    ┌──────────────────────────────────────────┐     │
│    │ Save to: /public/images/ai/              │     │
│    └──────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────┐
│ 2. USER (FAN)                                       │
│    ┌──────────────────────────────────────────┐     │
│    │ Obišče: thedrinkers.si                   │     │
│    └──────────────────────────────────────────┘     │
│                    ↓                                  │
│    ┌──────────────────────────────────────────┐     │
│    │ Vidi: AIGallery (static display)         │     │
│    │ - Profesionalne slike                    │     │
│    │ - Download button                        │     │
│    │ - NI generatorja                         │     │
│    └──────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────┘
```

---

## 📁 Datotečna Struktura

```
the/
├── 📁 public/
│   └── images/
│       └── ai/                    ← SHRANJENE GENERIRANE SLIKE
│           ├── albums/
│           │   ├── lepi-in-trezni.jpg
│           │   ├── zeja.jpg
│           │   └── ...
│           ├── band/
│           │   ├── promo-2026.jpg
│           │   └── live-performance.jpg
│           ├── social/
│           ├── merch/
│           └── posters/
│
├── 📁 scripts/
│   └── admin-generate-ai-images.js  ← ADMIN CLI SCRIPT
│
├── 📁 app/
│   └── api/
│       ├── ai/
│       │   └── generate/
│       │       └── route.ts       ← API (admin only)
│       ├── social/
│       │   └── generate-post/
│       │       └── route.ts       ← API (admin only)
│       └── seo/
│           └── optimize/
│               └── route.ts       ← API (admin only)
│
├── 📁 components/
│   └── sections/
│       └── AIGallery.tsx          ← STATIČNI PRIKAZ (user vidi)
│
└── 📁 lib/
    ├── ai/
    │   ├── image-generation.ts    ← AI logic
    │   ├── social-generator.ts    ← Social logic
    │   └── seo-optimizer.ts       ← SEO logic
    └── types/
        └── ai.ts                  ← Type definitions
```

---

## 🔐 Zakaj Je To Pravilno?

### **1. Artist Website ≠ AI Platform**

| Artist Website | AI Platform |
|----------------|-------------|
| Čist, minimal | Orodja, nastavitve |
| Brand, emocija | Tehnologija |
| Profesionalno | Demo/eksperiment |
| User: fan | User: developer |

**👉 Ne mešaj jih!**

---

### **2. User Experience**

**❌ NAROBE (prej):**
```
User obišče → Vidi AI generator → "To je demo?" → Ni premium
```

**✅ PRAVILNO (zdaj):**
```
User obišče → Vidi profesionalne slike → "To je premium!" → Zaupa bandu
```

---

### **3. Tina (ali katerakoli glasbenica)**

**Ona rabi:**
- ✅ Brand
- ✅ Emocijo
- ✅ Profesionalnost
- ✅ Zaupanje

**Ona NE rabi:**
- ❌ AI generatorja
- ❌ Promptov
- ❌ Tehničnih orodij

---

## 🛠️ Kako Uporabljati

### **Korak 1: Generiraj slike (ADMIN)**

```bash
# Namesti inference.sh CLI (opcija 1 - premium)
curl -fsSL https://cli.inference.sh | sh && infsh login

# ALI uporabi Pollinations.ai (opcija 2 - free)
# Ni potrebnih namestitev

# Zaženi script
node scripts/admin-generate-ai-images.js
```

---

### **Korak 2: Preglej slike**

```bash
# Odpri folder
public/images/ai/

# Preglej vse kategorije:
- albums/
- band/
- social/
- merch/
- posters/
```

---

### **Korak 3: Zamenjaj če ni všeč**

```bash
# Izbriši sliko ki ni OK
rm public/images/ai/albums/slaba-slika.jpg

# Ponovno generiraj (script bo ustvaril novo)
node scripts/admin-generate-ai-images.js
```

---

### **Korak 4: Push na production**

```bash
git add public/images/ai/
git commit -m "Add AI generated visuals"
git push
```

---

### **Korak 5: Userji vidijo rezultat**

```
https://thedrinkers.si

↓ Scroll do AIGallery section ↓

✅ Vidi: Profesionalne slike
✅ Download button
✅ NI generatorja
```

---

## 🎨 Primeri Uporabe

### **1. Album Cover**

**Admin:**
```bash
node scripts/admin-generate-ai-images.js
```

**Output:**
```
public/images/ai/albums/lepi-in-trezni.jpg
```

**User vidi:**
```tsx
<AIGallery />
├── Slika: /images/ai/albums/lepi-in-trezni.jpg
├── Name: "Lepi in trezni"
└── Download button
```

---

### **2. Social Media**

**Admin:**
```bash
curl -X POST http://localhost:3000/api/social/generate-post \
  -H "Content-Type: application/json" \
  -d '{"type":"concert","platform":"instagram"}'
```

**Output:**
```json
{
  "caption": "🤘 PRIPRAVLJENI NA NORO NOČ? 🤘...",
  "hashtags": ["#TheDrinkers", "#SlovenianRock", ...]
}
```

**Admin copy-paste na Instagram**

**User vidi:**
```
Instagram post → Professional caption → Link do strani
```

---

### **3. SEO Optimization**

**Admin:**
```bash
curl -X POST http://localhost:3000/api/seo/optimize \
  -H "Content-Type: application/json" \
  -d '{"page":"/tour","content":"Concert...","pageType":"event"}'
```

**Output:**
```json
{
  "optimized": {
    "title": "The Drinkers Tour 2026 | Concert Dates",
    "metaDescription": "Join The Drinkers...",
    "schema": {...}
  }
}
```

**Admin copy-paste v page metadata**

**User vidi:**
```
Google search → Boljši ranking → Več traffic
```

---

## 📊 Mode

### **FREE Mode (Pollinations.ai)**

```javascript
// scripts/admin-generate-ai-images.js
const USE_PREMIUM = false; // ← Uporabi free
```

**Prednosti:**
- ✅ 100% brezplačno
- ✅ Ni API key potreben
- ✅ Dovolj za testiranje

**Slabosti:**
- ❌ Manj kvalitetne slike
- ❌ Nične kontrole nad stilom

---

### **PREMIUM Mode (inference.sh)**

```javascript
// scripts/admin-generate-ai-images.js
const USE_PREMIUM = true; // ← Uporabi premium
```

**Prednosti:**
- ✅ Visoka kvaliteta (FLUX, Seedream, Gemini)
- ✅ Kontrola nad stilom
- ✅ Konsistentnost

**Slabosti:**
- ❌ Plačljivo (~$0.10-0.50/slika)
- ❌ Zahteva API key

---

## 🎯 Best Practices

### **1. Generiraj v serijah**

```bash
# Ne generiraj po 1 sliki
# Zaženi batch script
node scripts/admin-generate-ai-images.js

# Generira vse naenkrat (20+ slik)
```

---

### **2. Organiziraj slike**

```
public/images/ai/
├── albums/         ← Samo album covers
├── band/           ← Samo band photos
├── social/         ← Samo social media
├── merch/          ← Samo merchandise
└── posters/        ← Samo concert posters
```

---

### **3. Poimenuj konsistentno**

```
✅ DOBRO:
- lepi-in-trezni.jpg
- promo-2026.jpg
- tour-2026.jpg

❌ SLABO:
- image1.jpg
- album_cover_final_v2.jpg
- IMG_20260321_123456.jpg
```

---

### **4. Backupaj generirane slike**

```bash
# Preden pushaš na git
cp -r public/images/ai/ ~/backup/ai-images-$(date +%Y%m%d)

# ALI uporabi git LFS za velike slike
git lfs track "public/images/ai/**/*.jpg"
```

---

### **5. Optimiziraj za web**

```bash
# Konvertiraj v WebP za boljšo performance
npm install -g sharp-cli

sharp public/images/ai/albums/*.jpg \
  --format webp \
  --quality 85 \
  --output public/images/ai/albums/
```

---

## 🔐 Varnost

### **API Endpoints so skriti**

```
✅ /api/ai/generate        ← Ni v UI
✅ /api/social/generate-post ← Ni v UI
✅ /api/seo/optimize       ← Ni v UI
```

**Userji ne morejo:**
- Klicati API direktno (ni UI)
- Videti prompte
- Generirati slike sami

---

### **Rate Limiting (priporočljivo)**

```typescript
// app/api/ai/generate/route.ts
import { rateLimit } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  // Check admin token
  const isAdmin = await verifyAdminToken(req);
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Rate limit
  const limited = await rateLimit(req, { limit: 100 });
  if (limited) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }
  
  // Generate image...
}
```

---

## 📈 Performance

### **Čas generiranja (batch 20 slik)**

| Model | Čas | Cena |
|-------|-----|------|
| Pollinations (FREE) | ~3-5 min | $0 |
| FLUX Dev | ~10-15 min | ~$2-5 |
| Seedream 4.5 | ~20-30 min | ~$5-10 |
| Gemini 3 Pro | ~5-10 min | ~$3-6 |

---

### **Velikost slik**

```
Original (FLUX): 2-5 MB
Optimized (WebP): 500 KB - 1 MB
Compression: 80-90% manj
```

---

## 🎯 Checklist

### **Pred Launchem:**

- [ ] Generiraj vse slike z admin scriptom
- [ ] Preglej vse slike
- [ ] Zamenjaj slike ki niso OK
- [ ] Optimiziraj slike (WebP, compression)
- [ ] Pushaj na production
- [ ] Testiraj AIGallery na production

---

### **Po Launchu:**

- [ ] Userji vidijo samo galerijo
- [ ] NI AI generatorja v UI
- [ ] API endpointi so skriti
- [ ] Analytics kaže dober engagement

---

## 🚨 POMEMBNO

### **NIKOLI NE DELAJ:**

```diff
- ❌ Ne dodajaj AIImageGenerator v UI
- ❌ Ne prikazuj promptov userjem
- ❌ Ne mešaj artist website z AI platformo
- ❌ Ne pusti userjem generirati slike
```

### **VEDNO DELAJ:**

```diff
+ ✅ Generiraj slike sam (admin)
+ ✅ Shrani v /public/images/ai/
+ ✅ Prikaži samo finalne slike
+ ✅ Ohrani čist, profesionalen videz
```

---

## 📞 Support

### **Dokumentacija:**
- [Pollinations.ai](https://pollinations.ai/docs)
- [inference.sh](https://inference.sh/docs)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)

### **Primeri:**
- `scripts/admin-generate-ai-images.js` - Batch generation
- `components/sections/AIGallery.tsx` - Static display
- `lib/ai/*.ts` - AI logic (admin only)

---

**✅ TO JE PRAVILNA PRO ARHITEKTURA!**

Artist website + AI tools ločeno = Premium experience 🎸
