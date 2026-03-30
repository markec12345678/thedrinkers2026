#!/usr/bin/env python
"""
THE DRINKERS - IMAGE GENERATOR (Using Lorem Picsum)

Generates real placeholder images using Lorem Picsum API
Fast, reliable, free!

Usage: python generate-images-fast.py
"""

import urllib.request
import os
from pathlib import Path

# Output directory
OUTPUT_DIR = Path("public/images/ai-generated")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

print("=" * 70)
print("  THE DRINKERS - FAST IMAGE GENERATOR")
print("=" * 70)
print()

# Image definitions with Lorem Picsum URLs
IMAGES = [
    # Album Covers (8)
    {"filename": "album-na-zdravje.jpg", "url": "https://picsum.photos/seed/drinkers1/1000/1000", "width": 1000, "height": 1000, "category": "Album Cover"},
    {"filename": "album-30let.jpg", "url": "https://picsum.photos/seed/drinkers2/1000/1000", "width": 1000, "height": 1000, "category": "Album Cover"},
    {"filename": "album-prohibicija.jpg", "url": "https://picsum.photos/seed/drinkers3/1000/1000", "width": 1000, "height": 1000, "category": "Album Cover"},
    {"filename": "album-pivolucija.jpg", "url": "https://picsum.photos/seed/drinkers4/1000/1000", "width": 1000, "height": 1000, "category": "Album Cover"},
    {"filename": "album-zeja.jpg", "url": "https://picsum.photos/seed/drinkers5/1000/1000", "width": 1000, "height": 1000, "category": "Album Cover"},
    {"filename": "album-zivljenje.jpg", "url": "https://picsum.photos/seed/drinkers6/1000/1000", "width": 1000, "height": 1000, "category": "Album Cover"},
    {"filename": "lep-in-trezni.jpg", "url": "https://picsum.photos/seed/drinkers7/1000/1000", "width": 1000, "height": 1000, "category": "Album Cover"},
    {"filename": "album-random-1.jpg", "url": "https://picsum.photos/seed/drinkers8/1000/1000", "width": 1000, "height": 1000, "category": "Album Cover"},
    
    # Band Photos (5)
    {"filename": "band-live-performance.jpg", "url": "https://picsum.photos/seed/band1/1000/667", "width": 1000, "height": 667, "category": "Band Photo"},
    {"filename": "band-studio-portrait.jpg", "url": "https://picsum.photos/seed/band2/1000/667", "width": 1000, "height": 667, "category": "Band Photo"},
    {"filename": "band-backstage.jpg", "url": "https://picsum.photos/seed/band3/1000/667", "width": 1000, "height": 667, "category": "Band Photo"},
    {"filename": "band-concert.jpg", "url": "https://picsum.photos/seed/band4/1000/667", "width": 1000, "height": 667, "category": "Band Photo"},
    {"filename": "band-group.jpg", "url": "https://picsum.photos/seed/band5/1000/667", "width": 1000, "height": 667, "category": "Band Photo"},
    
    # Tour Posters (3)
    {"filename": "tour-2026-poster.jpg", "url": "https://picsum.photos/seed/tour1/1080/1350", "width": 1080, "height": 1350, "category": "Tour Poster"},
    {"filename": "concert-announcement.jpg", "url": "https://picsum.photos/seed/tour2/1080/1350", "width": 1080, "height": 1350, "category": "Tour Poster"},
    {"filename": "tour-poster-2.jpg", "url": "https://picsum.photos/seed/tour3/1080/1350", "width": 1080, "height": 1350, "category": "Tour Poster"},
]

print(f"Downloading {len(IMAGES)} images...")
print(f"Output: {OUTPUT_DIR}")
print()

completed = 0
failed = 0

# Download images
for i, img in enumerate(IMAGES, 1):
    progress = f"{i}/{len(IMAGES)}"
    
    print(f"[{progress}] Downloading: {img['filename']}")
    print(f"  Category: {img['category']}")
    print(f"  Size: {img['width']}x{img['height']}")
    
    try:
        # Download image
        urllib.request.urlretrieve(img['url'], OUTPUT_DIR / img['filename'])
        
        # Verify file size
        file_size = (OUTPUT_DIR / img['filename']).stat().st_size
        
        if file_size > 1000:  # At least 1KB
            print(f"  [OK] Success! ({file_size / 1024:.1f} KB)")
            print()
            completed += 1
        else:
            print(f"  [ERROR] File too small, deleting...")
            (OUTPUT_DIR / img['filename']).unlink()
            print()
            failed += 1
        
    except Exception as e:
        print(f"  [ERROR] {e}")
        print()
        failed += 1

# Summary
print("=" * 70)
print("  DOWNLOAD COMPLETE!")
print("=" * 70)
print()
print(f"Total: {len(IMAGES)} images")
print(f"Success: {completed}")
print(f"Failed: {failed}")
print()
print(f"Output directory: {OUTPUT_DIR.absolute()}")
print()
print("Next steps:")
print("  1. Run: python organize-images.py")
print("  2. Images will be organized into folders")
print("  3. Review and select favorites")
print("  4. Integrate into website")
print()
