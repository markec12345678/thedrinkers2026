#!/usr/bin/env python
"""
THE DRINKERS - OVERNIGHT AI IMAGE GENERATION

Generates proper album covers, band photos, and tour posters
using Stable Diffusion AI.

Run this before going to sleep - takes 3-4 hours!

Usage: python generate-overnight-ai.py
"""

import torch
from diffusers import StableDiffusionPipeline
import os
from pathlib import Path

# Output directory
OUTPUT_DIR = Path("public/images/ai-generated")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

print("=" * 70)
print("  THE DRINKERS - OVERNIGHT AI IMAGE GENERATION")
print("=" * 70)
print()

# Model
MODEL = "runwayml/stable-diffusion-v1-5"

print(f"Loading model: {MODEL}")
print("This may take 1-2 minutes on first run...")
print()

# Load model
try:
    pipe = StableDiffusionPipeline.from_pretrained(
        MODEL,
        torch_dtype=torch.float32,
        safety_checker=None,
        requires_safety_checker=False
    )
    
    # Check for GPU
    if torch.cuda.is_available():
        print("GPU detected! Using CUDA...")
        pipe = pipe.to("cuda")
    else:
        print("WARNING: No GPU. Using CPU (will be VERY slow - 20 min/image)...")
        pipe = pipe.to("cpu")
    
    print("Model loaded!")
    print()
    
except Exception as e:
    print(f"Error loading model: {e}")
    exit(1)

# Detailed prompts for The Drinkers band
IMAGES = [
    # Album Covers - Specific to The Drinkers
    {
        "filename": "album-na-zdravje-ai.png",
        "prompt": "professional rock album cover, text 'NA ZDRAVJE' visible, text 'THE DRINKERS' visible, dark moody atmosphere, crimson red spotlight, electric guitar silhouette, dramatic stage lighting, high quality album artwork, professional photography",
        "width": 1000,
        "height": 1000,
        "category": "Album Cover - Na Zdravje"
    },
    {
        "filename": "album-30let-ai.png",
        "prompt": "professional rock album cover, text '30 LET' visible, anniversary celebration, electric guitar on stage, concert lights, bold typography, professional album design, high quality",
        "width": 1000,
        "height": 1000,
        "category": "Album Cover - 30 Let"
    },
    {
        "filename": "album-prohibicija-ai.png",
        "prompt": "professional rock album cover, text 'PROHIBICIJA' visible, 1920s speakeasy bar theme, vintage microphone, prohibition era, dramatic red and black colors, professional album artwork",
        "width": 1000,
        "height": 1000,
        "category": "Album Cover - Prohibicija"
    },
    {
        "filename": "album-pivolucija-ai.png",
        "prompt": "professional rock album cover, text 'PIVOLUCIJA' visible, beer revolution theme, beer mug with electric guitar, energetic orange and yellow colors, bold design, professional album design",
        "width": 1000,
        "height": 1000,
        "category": "Album Cover - Pivolucija"
    },
    {
        "filename": "album-zeja-ai.png",
        "prompt": "professional rock album cover, text 'ZEJA' visible, thirst theme, water droplets on glass, electric guitar, blue and cyan colors, modern rock aesthetic, professional design",
        "width": 1000,
        "height": 1000,
        "category": "Album Cover - Zeja"
    },
    
    # Band Photos
    {
        "filename": "band-live-performance-ai.png",
        "prompt": "professional rock band performing live on stage, 5 band members, dramatic stage lighting, silhouettes against bright lights, concert crowd in background, high energy performance, professional concert photography",
        "width": 1000,
        "height": 667,
        "category": "Band Photo - Live"
    },
    {
        "filename": "band-studio-portrait-ai.png",
        "prompt": "professional studio portrait of rock band, 5 band members with instruments (guitars, drums, microphone), dramatic studio lighting, dark background, high contrast, professional band photo",
        "width": 1000,
        "height": 667,
        "category": "Band Photo - Studio"
    },
    {
        "filename": "band-backstage-ai.png",
        "prompt": "rock band backstage candid moment, guitars and amplifiers visible, atmospheric backstage lighting, documentary style photography, authentic moment, professional photography",
        "width": 1000,
        "height": 667,
        "category": "Band Photo - Backstage"
    },
    
    # Tour Posters
    {
        "filename": "tour-2026-poster-ai.png",
        "prompt": "professional concert poster design, bold typography text 'TOUR 2026', text 'THE DRINKERS' visible, dramatic red and black colors, electric guitar imagery, rock concert poster, professional graphic design, vertical format",
        "width": 1080,
        "height": 1350,
        "category": "Tour Poster - 2026"
    },
    {
        "filename": "concert-announcement-ai.png",
        "prompt": "concert announcement poster, text 'COMING SOON' visible, rock concert theme, dramatic stage lighting, bold typography, professional concert poster design, vertical format",
        "width": 1080,
        "height": 1350,
        "category": "Tour Poster - Announcement"
    },
]

print(f"Generating {len(IMAGES)} AI images...")
print(f"Output: {OUTPUT_DIR}")
print()
print("NOTE: This will take 3-4 hours on CPU (20 min/image)")
print("      This will take 30-60 minutes on GPU (3-6 min/image)")
print()
print("You can leave this running overnight!")
print()

completed = 0
failed = 0

# Generate images
for i, img in enumerate(IMAGES, 1):
    progress = f"{i}/{len(IMAGES)}"
    
    print(f"[{progress}] Generating: {img['filename']}")
    print(f"  Category: {img['category']}")
    print(f"  Size: {img['width']}x{img['height']}")
    
    try:
        # Generate image
        image = pipe(
            prompt=img['prompt'],
            width=img['width'],
            height=img['height'],
            num_inference_steps=50,
            guidance_scale=7.5,
        ).images[0]
        
        # Save image
        output_path = OUTPUT_DIR / img['filename']
        image.save(output_path, format="PNG", quality=95)
        
        file_size = output_path.stat().st_size
        
        print(f"  [OK] Saved: {output_path.name} ({file_size / 1024:.1f} KB)")
        print()
        completed += 1
        
    except Exception as e:
        print(f"  [ERROR] {e}")
        print()
        failed += 1

# Summary
print("=" * 70)
print("  GENERATION COMPLETE!")
print("=" * 70)
print()
print(f"Total: {len(IMAGES)} images")
print(f"Success: {completed}")
print(f"Failed: {failed}")
print()
print(f"Output directory: {OUTPUT_DIR.absolute()}")
print()
print("Next steps:")
print("  1. Review generated images")
print("  2. Run: python organize-images.py")
print("  3. Select favorites")
print("  4. Integrate into website")
print()
