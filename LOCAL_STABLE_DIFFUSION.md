# 🎨 LOKALNA STABLE DIFFUSION - THE DRINKERS

**Generiraj slike lokalno - brezplačno, brez interneta, neomejeno!**

---

## ✅ STATUS: NAMEŠČENO IN PRIPRAVLJENO!

```
✅ Python: 3.14
✅ PyTorch: 2.10.0+cpu
✅ Diffusers: 0.38.0.dev0
✅ Transformers: 4.57.6
✅ Scripts: Ready
```

---

## 🚀 KAKO UPORABITI:

### **Option 1: Batch Script (Najlažje)**

```bash
# Windows
generate-images-local.bat

# Samo odpri in počakaj!
```

### **Option 2: Python Script (Več kontrole)**

```bash
python local-sd-generate.py
```

### **Option 3: Custom Prompts (Napredno)**

Uredi `local-sd-generate.py` in dodaj svoje prompte:

```python
PROMPTS = [
    {
        "name": "my-custom-image",
        "prompt": "your prompt here",
        "negative": "blurry, low quality",
        "width": 1000,
        "height": 1000,
    },
]
```

---

## 📋 KAJ BO GENERIRANO:

### **Album Covers (5):**

```
1. album-cover-na-zdravje.png
2. album-cover-30let.png
3. album-cover-zivljenje.png
4. album-cover-prohibicija.png
5. album-cover-pivolucija.png
```

### **Band Photos (3):**

```
1. band-photo-live.png
2. band-photo-studio.png
3. band-photo-portrait.png
```

### **Marketing (2):**

```
1. concert-poster.png
2. coming-soon-graphic.png
```

**Total:** 10 profesionalnih slik!

---

## ⚙️ KONFIGURACIJA:

### **Model Selection:**

Trenutni model:

```python
MODEL_ID = "runwayml/stable-diffusion-v1-5"
```

**Alternative:**

```python
# Better quality (slower)
MODEL_ID = "stabilityai/stable-diffusion-2-1"

# Midjourney style
MODEL_ID = "prompthero/openjourney"

# Anime style
MODEL_ID = "hakurei/waifu-diffusion"

# Realistic photos
MODEL_ID = "runwayml/stable-diffusion-inpainting"
```

### **Quality Settings:**

```python
# Number of inference steps
# More steps = better quality but slower
# Recommended: 30-50
num_inference_steps=50

# Guidance scale
# Higher = more creative, lower = more realistic
# Recommended: 7-8.5
guidance_scale=7.5
```

---

## ⏱️ ČAS GENERIRANJA:

### **CPU (kot imaš zdaj):**

```
1 slika: ~2-5 minut
10 slik: ~20-50 minut
```

### **GPU (če dodaš):**

```
1 slika: ~10-30 sekund
10 slik: ~2-5 minut
```

**Priporočilo:** Pusti čez noč za CPU!

---

## 📂 IZHODNE DATOTEKE:

**Lokacija:**

```
public/images/generated/
├── album-cover-na-zdravje.png
├── album-cover-30let.png
├── band-photo-live.png
├── band-photo-studio.png
└── ...
```

**Format:**

```
- PNG format
- High quality (95%)
- Original dimensions
- Ready for web use
```

---

## 🎨 PRIMERI PROMPTOV:

### **Album Cover:**

```
dark moody rock album cover, vinyl record on turntable,
crimson red spotlight, guitar silhouette, dramatic lighting,
professional photography, high quality, detailed
```

### **Band Photo:**

```
rock band performing on stage, dramatic stage lighting,
silhouettes, concert crowd in background, professional
concert photography, high energy
```

### **Concert Poster:**

```
rock concert poster design, bold typography, coming soon text,
dramatic red and black colors, guitar imagery, professional
graphic design
```

### **Social Media:**

```
instagram square rock concert announcement, bold typography,
dramatic lighting, professional social media graphic,
high engagement design
```

---

## 💡 PRO TIPS:

### **1. Negative Prompts:**

```python
negative = "blurry, low quality, distorted, ugly, text, watermark, bad anatomy, disfigured"
```

### **2. Better Quality:**

```python
# Add to prompt
"masterpiece, best quality, high quality, detailed, professional"
```

### **3. Specific Style:**

```python
# Add to prompt
"in the style of [artist/band]",
"inspired by [genre]",
"[era] aesthetic"
```

### **4. Batch Generation:**

```python
# Generate multiple variations
for seed in range(10):
    image = pipe(prompt, seed=seed)
    image.save(f"output_{seed}.png")
```

---

## 🔧 TROUBLESHOOTING:

### **Issue: Out of Memory**

```
Solution: Reduce image size or use CPU
width=512, height=512  # Smaller size
```

### **Issue: Slow Generation**

```
Solution: Reduce steps
num_inference_steps=20  # Faster but lower quality
```

### **Issue: Bad Quality**

```
Solution: Increase steps and use better prompt
num_inference_steps=50
prompt = "masterpiece, best quality, " + your_prompt
```

---

## 📊 COMPARISON:

### **Local SD vs Online Services:**

| Feature  | Local SD   | Pollinations | Paid Services |
| -------- | ---------- | ------------ | ------------- |
| Cost     | FREE       | FREE         | €10-50/month  |
| Speed    | Slow (CPU) | Fast         | Fast          |
| Quality  | Good       | Good         | Excellent     |
| Privacy  | 100%       | Online       | Online        |
| Control  | Full       | Limited      | Full          |
| Internet | Not needed | Required     | Required      |

---

## 🎯 NEXT STEPS:

### **1. Test Generation:**

```bash
# Generate test image first
python -c "
from diffusers import StableDiffusionPipeline
import torch

pipe = StableDiffusionPipeline.from_pretrained('runwayml/stable-diffusion-v1-5')
image = pipe('test image, rock album cover')[0]
image.save('test.png')
"
```

### **2. Review Results:**

```
Odpri: test.png
Preveri kvaliteto
Prilagodi prompte če treba
```

### **3. Generate All:**

```bash
generate-images-local.bat
```

### **4. Use in Project:**

```jsx
// Update components
<img src="/images/generated/album-cover-na-zdravje.png" />
```

---

## 🚀 ŽELIŠ DA ZAČNEM?

**Lahko takoj generiram:**

**A) Test image** (1 slika, 5 min)

- Preverim če deluje
- Testiram kvaliteto

**B) Vseh 10 slik** (30-50 min)

- Vse album covers
- Band photos
- Marketing graphics

**C) Custom prompts** (po meri)

- Ti napišeš prompte
- Jaz generiram

---

**Kaj želiš?** 🎨🚀

**A)** Testiraj najprej  
**B)** Generiraj vse  
**C)** Custom prompts
