#!/usr/bin/env python
"""
THE DRINKERS - IMAGE ORGANIZER

Organizes generated images into proper folders
Album covers -> /albums/
Band photos -> /band/
Tour posters -> /tour/

Usage: python organize-images.py
"""

import os
import shutil
from pathlib import Path

# Directories
SOURCE_DIR = Path("public/images/ai-generated")
ALBUMS_DIR = Path("public/images/albums")
BAND_DIR = Path("public/images/band")
TOUR_DIR = Path("public/images/tour")

# Create destination directories
ALBUMS_DIR.mkdir(parents=True, exist_ok=True)
BAND_DIR.mkdir(parents=True, exist_ok=True)
TOUR_DIR.mkdir(parents=True, exist_ok=True)

print("=" * 70)
print("  THE DRINKERS - IMAGE ORGANIZER")
print("=" * 70)
print()

# Image mappings
IMAGES = {
    # Album covers
    "album-na-zdravje": ALBUMS_DIR,
    "album-30let": ALBUMS_DIR,
    "album-prohibicija": ALBUMS_DIR,
    "album-pivolucija": ALBUMS_DIR,
    "album-zeja": ALBUMS_DIR,
    "lep-in-trezni": ALBUMS_DIR,
    
    # Band photos
    "band-live": BAND_DIR,
    "band-photo-live": BAND_DIR,
    "band-studio": BAND_DIR,
    "band-photo-studio": BAND_DIR,
    "band-backstage": BAND_DIR,
    
    # Tour posters
    "tour-2026-poster": TOUR_DIR,
    "tour-poster": TOUR_DIR,
    "concert-announcement": TOUR_DIR,
    "concert-poster": TOUR_DIR,
}

print("Organizing images...")
print()

organized = 0
not_found = 0

for base_name, dest_dir in IMAGES.items():
    # Look for matching files
    found = False
    
    for file in SOURCE_DIR.glob("*"):
        if file.stem.startswith(base_name) and file.suffix.lower() in ['.jpg', '.png', '.svg']:
            # Copy to destination
            dest_file = dest_dir / file.name
            shutil.copy2(file, dest_file)
            print(f"[OK] {file.name} -> {dest_dir.name}/")
            found = True
            organized += 1
    
    if not found:
        print(f"[..] {base_name}* - Not found yet (will be generated)")
        not_found += 1

print()
print("=" * 70)
print("  ORGANIZATION COMPLETE!")
print("=" * 70)
print()
print(f"Organized: {organized} images")
print(f"Not found: {not_found} images (will be added after generation)")
print()
print("Folders:")
print(f"  Albums: {ALBUMS_DIR.absolute()}")
print(f"  Band: {BAND_DIR.absolute()}")
print(f"  Tour: {TOUR_DIR.absolute()}")
print()
