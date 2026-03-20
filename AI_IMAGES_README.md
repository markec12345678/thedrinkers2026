# 🤖 AI Image Generation - The Drinkers

## 📸 Professional AI-Generated Images

This project uses **inference.sh** CLI to generate professional images for The Drinkers rock band website using state-of-the-art AI models.

---

## 🚀 Quick Start

### **1. Install inference.sh CLI**

```bash
# Install
curl -fsSL https://cli.inference.sh | sh && infsh login

# Verify installation
infsh --version
```

### **2. Generate All Images**

```bash
# Navigate to project
cd f:\thedrinkers\the

# Run generation script
node scripts/generate-images.js
```

### **3. Manual Generation**

```bash
# Album Cover
infsh app run bytedance/seedream-4-5 --input '{
  "prompt": "Professional rock album cover for The Drinkers, crimson red and black, beer mug silhouette, 4K quality",
  "aspect_ratio": "1:1"
}' --output "public/images/ai-generated/albums/lep-in-trezni.jpg"

# Band Photo
infsh app run google/gemini-3-pro-image-preview --input '{
  "prompt": "Professional rock band photo, 5 musicians on stage, crimson stage lighting, The Drinkers Slovenian band",
  "aspect_ratio": "16:9"
}' --output "public/images/ai-generated/band/promo-2026.jpg"
```

---

## 🎨 Available Models

| Model | Best For | Quality | Speed |
|-------|----------|---------|-------|
| **Seedream 4.5** | Album covers, posters | ⭐⭐⭐⭐⭐ | Fast |
| **FLUX.2 Klein** | Quick iterations | ⭐⭐⭐⭐ | Very Fast |
| **Gemini 3 Pro** | Band photos | ⭐⭐⭐⭐⭐ | Medium |
| **Grok Imagine** | Social media | ⭐⭐⭐⭐ | Fast |
| **Reve** | Text rendering | ⭐⭐⭐⭐⭐ | Medium |

---

## 📁 Image Categories

### **Albums** (6 images)
- Lepi in trezni
- Žeja
- Pivolucija
- Prohibicija
- Hajdi
- Recidiv

### **Band Photos** (3 images)
- Band Promo 2026
- Live Performance
- Backstage Portrait

### **Social Media** (3 images)
- Instagram Post
- Twitter Header
- Facebook Cover

### **Merchandise** (4 images)
- T-Shirt Mockup
- Hoodie Mockup
- Beer Mug Design
- Vinyl Mockup

### **Tour Posters** (2 images)
- Tour 2026 Poster
- Orto Bar Ljubljana

---

## 🎯 Professional Prompts

### **Album Cover Template**

```bash
infsh app run bytedance/seedream-4-5 --input '{
  "prompt": "Professional rock album cover for [ALBUM NAME] by The Drinkers, Slovenian rock band, [THEME] theme, crimson red (#dc143c) and black (#0a0a0a) color scheme, [SYMBOL] silhouette, modern typography space, high contrast studio lighting, 4K quality, music industry standard",
  "aspect_ratio": "1:1"
}'
```

### **Band Photo Template**

```bash
infsh app run google/gemini-3-pro-image-preview --input '{
  "prompt": "Professional rock band promotional photo, 5 musicians from The Drinkers Slovenian rock band on stage with instruments, dramatic crimson red stage lighting, energetic performance moment, concert atmosphere, photorealistic, award-winning music photography",
  "aspect_ratio": "16:9"
}'
```

### **Tour Poster Template**

```bash
infsh app run falai/reve --input '{
  "prompt": "Concert tour poster for The Drinkers 2026 Slovenian tour, bold text THE DRINKERS, tour dates and cities, crimson red and black color scheme, beer mug and guitar graphics, vintage rock poster aesthetic, screen print style",
  "aspect_ratio": "2:3"
}'
```

---

## 📊 Integration in Next.js

### **1. Import Component**

```tsx
import { AIGallery } from '@/components/sections/AIGallery';

// Use in page
<AIGallery />
```

### **2. Use Generated Images**

```tsx
import Image from 'next/image';

<Image
  src="/images/ai-generated/albums/lepi-in-trezni.jpg"
  alt="Lepi in trezni album cover"
  width={400}
  height={400}
  priority
/>
```

### **3. Dynamic OG Images**

```tsx
// app/opengraph-image.tsx
export default async function Image() {
  return new ImageResponse(
    <div style={{ display: 'flex' }}>
      <img 
        src="/images/ai-generated/band/promo-2026.jpg"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
```

---

## 🔧 Optimization

### **Image Optimization**

```bash
# Upscale with Topaz
infsh app run falai/topaz-image-upscaler --input '{
  "image_url": "https://cdn.thedrinkers.si/images/ai-generated/albums/lepi-in-trezni.jpg"
}' --output "public/images/ai-generated/albums/lepi-in-trezni-4k.jpg"
```

### **Background Removal**

```bash
# Remove background
infsh app run falai/background-removal --input '{
  "image": "public/images/ai-generated/band/promo-2026.jpg"
}' --output "public/images/ai-generated/band/promo-2026-nobg.png"
```

---

## 📈 Performance

| Image Type | Size (Original) | Size (Optimized) | Load Time |
|------------|----------------|------------------|-----------|
| Album Cover | 4K (8MB) | 800x800 (200KB) | < 0.5s |
| Band Photo | 4K (12MB) | 1920x1080 (400KB) | < 1s |
| Social Media | 2K (5MB) | 1080x1080 (150KB) | < 0.3s |

---

## 🎸 The Drinkers Brand Guidelines

### **Colors**
- **Primary:** Crimson Red `#dc143c`
- **Background:** Black `#0a0a0a`
- **Accent:** Silver `#c0c0c0`

### **Elements**
- Beer mugs 🍺
- Electric guitars 🎸
- Vinyl records 💿
- Slovenian flag 🇸🇮

### **Style**
- Rock'n'roll
- High contrast
- Professional
- Authentic
- Slovenian pride

---

## 📚 Resources

- [inference.sh Documentation](https://inference.sh/docs)
- [Seedream 4.5 Guide](https://inference.sh/docs/apps/seedream)
- [FLUX Models](https://inference.sh/docs/apps/flux)
- [AI Image Generation Skill](../skills/ai-image-generation/SKILL.md)

---

## 🤘 Example Output

```bash
🎨 The Drinkers - AI Image Generator

✅ Created: public/images/ai-generated/albums
✅ Created: public/images/ai-generated/band
✅ Created: public/images/ai-generated/social
✅ Created: public/images/ai-generated/merch
✅ Created: public/images/ai-generated/posters

🎯 Category: ALBUMS
==================================================
📷 Generating: lepi-in-trezni (albums)
   Status: ✅ Generated

🎯 Category: BAND
==================================================
📷 Generating: band-promo-2026 (band)
   Status: ✅ Generated

✅ Image generation complete!
📂 Images saved to: public/images/ai-generated/
```

---

**Ready to rock! 🎸**
