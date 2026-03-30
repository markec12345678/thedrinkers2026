#!/usr/bin/env python
"""
🎨 THE DRINKERS - LOCAL STABLE DIFFUSION IMAGE GENERATOR

Generira slike lokalno z Stable Diffusion modelom.
Brez interneta, brezplačno, neomejeno!

Usage:
    python local-sd-generate.py
"""

import torch
from diffusers import StableDiffusionPipeline, DPMSolverMultistepScheduler
import os
from pathlib import Path

# Configuration
OUTPUT_DIR = Path("public/images/generated")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Model selection
MODEL_ID = "runwayml/stable-diffusion-v1-5"
# Alternative models:
# - "prompthero/openjourney" (Midjourney style)
# - "stabilityai/stable-diffusion-2-1" (Better quality)
# - "runwayml/stable-diffusion-inpainting" (For editing)

print("🎨 Loading Stable Diffusion model...")
print(f"📦 Model: {MODEL_ID}")

# Load model
pipe = StableDiffusionPipeline.from_pretrained(
    MODEL_ID,
    torch_dtype=torch.float32,  # Use float16 if GPU available
    safety_checker=None,  # Disable for faster generation
    requires_safety_checker=False
)

# Use DPM Solver for faster inference
pipe.scheduler = DPMSolverMultistepScheduler.from_config(pipe.scheduler.config)

# Move to GPU if available
if torch.cuda.is_available():
    print("✅ GPU detected! Using CUDA...")
    pipe = pipe.to("cuda")
else:
    print("⚠️  No GPU detected. Using CPU (slower)...")
    pipe = pipe.to("cpu")

print("✅ Model loaded!\n")

# Image prompts for The Drinkers
PROMPTS = [
    {
        "name": "album-cover-na-zdravje",
        "prompt": "dark moody rock album cover, vinyl record on turntable, crimson red spotlight, guitar silhouette, dramatic lighting, professional photography, high quality, detailed",
        "negative": "blurry, low quality, distorted, ugly, text, watermark",
        "width": 1000,
        "height": 1000,
    },
    {
        "name": "album-cover-30let",
        "prompt": "rock album cover design, 30 years anniversary, bold typography, electric guitar, stage lights, concert atmosphere, professional design",
        "negative": "blurry, low quality, text errors, watermark",
        "width": 1000,
        "height": 1000,
    },
    {
        "name": "band-photo-live",
        "prompt": "rock band performing on stage, dramatic stage lighting, silhouettes, concert crowd in background, professional concert photography, high energy",
        "negative": "blurry, faces distorted, low quality, amateur",
        "width": 1000,
        "height": 667,
    },
    {
        "name": "band-photo-studio",
        "prompt": "rock band studio portrait, professional photography, dramatic lighting, dark background, high contrast, band members with instruments",
        "negative": "blurry, low quality, distorted faces, amateur",
        "width": 1000,
        "height": 667,
    },
    {
        "name": "concert-poster",
        "prompt": "rock concert poster design, bold typography, coming soon text, dramatic red and black colors, guitar imagery, professional graphic design",
        "negative": "blurry, text errors, low quality, amateur design",
        "width": 1080,
        "height": 1350,
    },
]

print(f"📝 Found {len(PROMPTS)} prompts to generate\n")

# Generate images
for i, config in enumerate(PROMPTS, 1):
    print(f"🎨 Generating {i}/{len(PROMPTS)}: {config['name']}")
    print(f"   Prompt: {config['prompt'][:80]}...")
    
    try:
        # Generate image
        image = pipe(
            prompt=config["prompt"],
            negative_prompt=config["negative"],
            width=config["width"],
            height=config["height"],
            num_inference_steps=50,  # More steps = better quality
            guidance_scale=7.5,
        ).images[0]
        
        # Save image
        output_path = OUTPUT_DIR / f"{config['name']}.png"
        image.save(output_path, format="PNG", quality=95)
        
        print(f"   ✅ Saved: {output_path}")
        print(f"   Size: {config['width']}x{config['height']}\n")
        
    except Exception as e:
        print(f"   ❌ Error: {e}\n")

print("\n" + "="*60)
print("🎉 GENERATION COMPLETE!")
print("="*60)
print(f"\n📂 Output directory: {OUTPUT_DIR.absolute()}")
print(f"📊 Total images: {len(PROMPTS)}")
print("\n💡 Next steps:")
print("   1. Review generated images")
print("   2. Copy to public/images/")
print("   3. Update components to use new images")
print("\n✨ Tip: Adjust prompts for better results!")
