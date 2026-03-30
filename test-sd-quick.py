#!/usr/bin/env python
"""
TEST STABLE DIFFUSION - Quick Test

Generiraj eno testno sliko da preveriš če deluje.

Usage:
    python test-sd-quick.py
"""

import torch
from diffusers import StableDiffusionPipeline
import os

print("=" * 60)
print("  QUICK STABLE DIFFUSION TEST")
print("=" * 60)
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
        print("No GPU. Using CPU (will be slower)...")
        pipe = pipe.to("cpu")
    
    print("Model loaded!")
    print()
    
except Exception as e:
    print(f"Error loading model: {e}")
    print("\nMake sure you have internet connection for first download")
    exit(1)

# Test prompt
PROMPT = "a simple red apple on a white background, clean, simple, high quality"
NEGATIVE = "blurry, low quality, distorted, ugly"

print(f"Prompt: {PROMPT}")
print(f"Negative: {NEGATIVE}")
print()
print("Generating image (this takes 1-5 minutes)...")
print()

# Generate
try:
    image = pipe(
        prompt=PROMPT,
        negative_prompt=NEGATIVE,
        width=512,
        height=512,
        num_inference_steps=30,
        guidance_scale=7.5,
    ).images[0]
    
    # Save
    output_path = "test-output.png"
    image.save(output_path)
    
    print("SUCCESS!")
    print(f"Image saved to: {output_path}")
    print(f"Size: 512x512 pixels")
    print(f"File size: {os.path.getsize(output_path) / 1024:.1f} KB")
    print()
    print("Stable Diffusion is working!")
    print()
    print("Next steps:")
    print("   1. Open test-output.png to see the result")
    print("   2. If good, run: generate-images-local.bat")
    print("   3. Or edit local-sd-generate.py for custom images")
    
except Exception as e:
    print(f"Error generating image: {e}")
    print()
    print("Troubleshooting:")
    print("   - Check if you have enough RAM (4GB+ recommended)")
    print("   - CPU generation is slow (be patient)")
    print("   - Make sure Python packages are installed")
