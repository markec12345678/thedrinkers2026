#!/usr/bin/env python
"""
THE DRINKERS - COMPLETE IMAGE GENERATOR

Generates all required images using Stable Diffusion
Album covers, band photos, tour posters, etc.

Usage: python generate-all-images.py
"""

import torch
from diffusers import StableDiffusionPipeline
import os
from pathlib import Path

# Output directory
OUTPUT_DIR = Path("public/images/generated")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

print("=" * 70)
print("  THE DRINKERS - COMPLETE IMAGE GENERATOR")
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
        print("✅ GPU detected! Using CUDA...")
        pipe = pipe.to("cuda")
    else:
        print("⚠️  No GPU. Using CPU (will be slower)...")
        pipe = pipe.to("cpu")
    
    print("✅ Model loaded!")
    print()
    
except Exception as e:
    print(f"❌ Error loading model: {e}")
    exit(1)

# Image prompts
IMAGES = [
    # Album Covers (5)
    {
        "filename": "album-na-zdravje.png",
        "prompt": "dark moody rock album cover, vinyl record on turntable, crimson red spotlight, guitar silhouette, dramatic lighting, professional photography, high quality, detailed",
        "width": 1000,
        "height": 1000,
        "category": "Album Cover"
    },
    {
        "filename": "album-30let.png",
        "prompt": "rock album cover design, 30 years anniversary, bold typography, electric guitar, stage lights, concert atmosphere, professional design",
        "width": 1000,
        "height": 1000,
        "category": "Album Cover"
    },
    {
        "filename": "album-prohibicija.png",
        "prompt": "dark rock album cover, prohibition theme, speakeasy bar, vintage microphone, dramatic red and black colors, professional album artwork",
        "width": 1000,
        "height": 1000,
        "category": "Album Cover"
    },
    {
        "filename": "album-pivolucija.png",
        "prompt": "rock album cover, beer revolution theme, beer mug with guitar, bold typography, energetic colors, professional design",
        "width": 1000,
        "height": 1000,
        "category": "Album Cover"
    },
    {
        "filename": "album-zeja.png",
        "prompt": "rock album cover, thirst theme, water droplets, electric guitar, dramatic lighting, modern rock aesthetic",
        "width": 1000,
        "height": 1000,
        "category": "Album Cover"
    },
    
    # Band Photos (3)
    {
        "filename": "band-live-performance.png",
        "prompt": "rock band performing on stage, dramatic stage lighting, silhouettes, concert crowd in background, professional concert photography, high energy",
        "width": 1000,
        "height": 667,
        "category": "Band Photo"
    },
    {
        "filename": "band-studio-portrait.png",
        "prompt": "professional rock band photo, 5 band members with instruments, dramatic studio lighting, dark background, high contrast",
        "width": 1000,
        "height": 667,
        "category": "Band Photo"
    },
    {
        "filename": "band-backstage.png",
        "prompt": "rock band backstage, candid moment, guitars and equipment, atmospheric lighting, documentary style photography",
        "width": 1000,
        "height": 667,
        "category": "Band Photo"
    },
    
    # Tour Posters (2)
    {
        "filename": "tour-2026-poster.png",
        "prompt": "rock concert poster design, bold typography, tour 2026 text, dramatic red and black colors, guitar imagery, professional graphic design",
        "width": 1080,
        "height": 1350,
        "category": "Tour Poster"
    },
    {
        "filename": "concert-announcement.png",
        "prompt": "concert announcement poster, coming soon text, rock concert theme, dramatic lighting, bold design",
        "width": 1080,
        "height": 1350,
        "category": "Tour Poster"
    },
]

print(f"Generating {len(IMAGES)} images...")
print(f"Output: {OUTPUT_DIR}")
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
        
        print(f"  ✅ Saved: {output_path}")
        print()
        completed += 1
        
    except Exception as e:
        print(f"  ❌ Error: {e}")
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
print("  2. Copy to appropriate folders:")
print("     - Album covers → public/images/albums/")
print("     - Band photos → public/images/band/")
print("     - Tour posters → public/images/tour/")
print("  3. Update components to use new images")
print()
