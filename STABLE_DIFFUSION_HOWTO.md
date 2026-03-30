# 🎨 STABLE DIFFUSION - HOW TO USE GUIDE

**Popoln vodič za lokalno generiranje slik**

---

## 📖 KAZALO:

1. [Kako Deluje](#kako-deluje)
2. [Namestitev](#namestitev)
3. [Testiranje](#testiranje)
4. [Generiranje](#generiranje)
5. [Prilagajanje](#prilagajanje)
6. [Troubleshooting](#troubleshooting)

---

## 🔍 KAKO DELUJE?

### **Stable Diffusion Process:**

```
1. Napišeš PROMPT (besedilo)
   ↓
2. AI Model obdela
   ↓
3. Generira SLIKO
   ↓
4. Shraniš datoteko
```

### **Primer:**

**Input (Prompt):**

```
"rock album cover, dark moody lighting, vinyl record, guitar"
```

**Output:**

```
📂 album-cover.png (512x512 pixels)
```

---

## 💾 NAMESTITEV

### **Korak 1: Preveri Namestitev**

```bash
# Odpri Command Prompt
cd F:\thedrinkers\the

# Preveri Python
python --version
# Pričakovano: Python 3.14.x

# Preveri package
python -c "import torch; print('OK')"
# Pričakovano: OK
```

### **Korak 2: Namesti Če Manjka**

```bash
# Če manjka torch
pip install torch

# Če manjka diffusers
pip install diffusers transformers accelerate
```

---

## 🧪 TESTIRANJE

### **Option A: Hitri Test**

```bash
# Zaženi test skripto
python test-sd-quick.py
```

**Kaj se zgodi:**

1. Naloži model (1-2 min)
2. Generira testno sliko (2-5 min)
3. Shrani `test-output.png`

**Rezultat:**

```
✅ SUCCESS!
📂 Image saved to: test-output.png
```

### **Option B: Ročni Test**

```python
# Ustvari test.py
from diffusers import StableDiffusionPipeline
import torch

pipe = StableDiffusionPipeline.from_pretrained("runwayml/stable-diffusion-v1-5")
image = pipe("red apple")[0]
image.save("apple.png")
```

---

## 🎨 GENERIRANJE

### **Option 1: Batch Script**

```bash
# Windows
generate-images-local.bat

# Samo odpri in počakaj!
```

### **Option 2: Python Script**

```bash
python local-sd-generate.py
```

**Kaj generira:**

- 10+ slik
- Album covers
- Band photos
- Marketing graphics

### **Option 3: Custom**

Uredi `local-sd-generate.py`:

```python
PROMPTS = [
    {
        "name": "my-image",
        "prompt": "your prompt here",
        "width": 1000,
        "height": 1000,
    },
]
```

---

## ✏️ PRILAGAJANJE

### **Prompt Writing:**

**Dobra formula:**

```
[Subject], [Style], [Lighting], [Quality], [Details]
```

**Primer:**

```
"rock album cover, dark moody style, dramatic lighting,
high quality, detailed vinyl record"
```

### **Negative Prompts:**

**Česa se izogniti:**

```
"blurry, low quality, distorted, ugly, text, watermark,
bad anatomy, disfigured, amateur"
```

### **Quality Settings:**

```python
# Višje = bolje, a počasneje
num_inference_steps=50  # 30-50 recommended

# Višje = bolj kreativno
guidance_scale=7.5  # 7-8.5 recommended

# Size
width=1000, height=1000  # Square
width=1000, height=667   # Landscape
width=667, height=1000   # Portrait
```

---

## 🎯 PRIMERI PROMPTOV

### **Album Covers:**

```python
{
    "name": "album-rock",
    "prompt": "dark rock album cover, vinyl record on turntable, crimson red spotlight, guitar silhouette, dramatic lighting, professional photography, high quality, detailed",
    "negative": "blurry, low quality, distorted, ugly, text, watermark",
    "width": 1000,
    "height": 1000,
}
```

### **Band Photos:**

```python
{
    "name": "band-live",
    "prompt": "rock band performing on stage, dramatic stage lighting, silhouettes, concert crowd in background, professional concert photography, high energy",
    "negative": "blurry, faces distorted, low quality, amateur",
    "width": 1000,
    "height": 667,
}
```

### **Marketing Graphics:**

```python
{
    "name": "concert-poster",
    "prompt": "rock concert poster design, bold typography, coming soon text, dramatic red and black colors, guitar imagery, professional graphic design",
    "negative": "blurry, text errors, low quality, amateur design",
    "width": 1080,
    "height": 1350,
}
```

---

## 🔧 TROUBLESHOOTING

### **Issue: Out of Memory**

**Error:**

```
RuntimeError: CUDA out of memory
```

**Solution:**

```python
# Zmanjšaj size
width=512, height=512

# Ali uporabi CPU
pipe = pipe.to("cpu")
```

---

### **Issue: Very Slow**

**Problem:**

```
Generation takes 10+ minutes per image
```

**Solution:**

```python
# Zmanjšaj korake
num_inference_steps=20  # Namesto 50

# Uporabi GPU če imaš
if torch.cuda.is_available():
    pipe = pipe.to("cuda")
```

---

### **Issue: Bad Quality**

**Problem:**

```
Images look blurry or distorted
```

**Solution:**

```python
# Povečaj korake
num_inference_steps=50

# Dodaj quality words
prompt = "masterpiece, best quality, high quality, " + prompt

# Povečaj guidance
guidance_scale=8.5
```

---

### **Issue: Model Download Fails**

**Error:**

```
ConnectionError during model download
```

**Solution:**

```bash
# Preveri internet
ping huggingface.co

# Ročno prenesi model
# https://huggingface.co/runwayml/stable-diffusion-v1-5
```

---

## 📊 COMPARISON

### **CPU vs GPU:**

| Metric         | CPU            | GPU                 |
| -------------- | -------------- | ------------------- |
| Time (1 image) | 3-5 min        | 30-60 sec           |
| Quality        | Same           | Same                |
| Cost           | Free           | Need GPU            |
| Recommendation | OK for testing | Best for production |

---

## 💡 PRO TIPS

### **1. Batch Processing:**

```python
# Generiraj več variant
for seed in range(5):
    image = pipe(prompt, seed=seed)
    image.save(f"output_{seed}.png")
```

### **2. Upscaling:**

```python
# After generating, upscale
from PIL import Image

image = image.resize((2000, 2000), Image.LANCZOS)
image.save("upscaled.png")
```

### **3. Optimization:**

```python
# Use half precision for speed
torch_dtype=torch.float16

# Disable safety checker
safety_checker=None
```

---

## 🎯 NEXT STEPS

### **After Testing:**

1. ✅ Test works → Good!
2. 📝 Adjust prompts
3. 🎨 Generate all images
4. 📂 Organize in `public/images/`
5. 🖼️ Update components

### **Best Practices:**

```
✅ Generate multiple variants
✅ Choose best one
✅ Upscale for production
✅ Optimize for web (compress)
✅ Use consistent style
```

---

## 📚 RESOURCES

### **Documentation:**

- [Stable Diffusion Docs](https://github.com/CompVis/stable-diffusion)
- [Diffusers Docs](https://huggingface.co/docs/diffusers)
- [Prompt Guide](https://promptengineering.org)

### **Models:**

- [HuggingFace Models](https://huggingface.co/models)
- [CivitAI](https://civitai.com)
- [Stability AI](https://stability.ai)

---

## 🚀 ŽELIŠ DA TESTIRAM?

**Lahko takoj:**

**A) Run test script** (5 min)

```
python test-sd-quick.py
```

**B) Show me examples** (10 min)

```
Generiraj 3 primere
Different styles
```

**C) I'll do it myself**

```
Ti generiraš sam
Jaz pomagam če treba
```

---

**Kaj želiš?** 🎨

**A)** Testiraj zdaj  
**B)** Pokaži primere  
**C)** Sam bom
