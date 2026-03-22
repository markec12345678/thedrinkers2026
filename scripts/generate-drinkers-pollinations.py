"""
The Drinkers - Social Media Image Generator
Uporaba Pollinations.ai API (Brezplačno, Brez Login)
"""

import os
import time
import requests
from pathlib import Path

# Output directory
OUTPUT_BASE = Path("public/images/social")

# Create directories
def create_directories():
    directories = [
        OUTPUT_BASE / "instagram" / "stories",
        OUTPUT_BASE / "instagram" / "reels",
        OUTPUT_BASE / "facebook" / "posts",
        OUTPUT_BASE / "twitter" / "posts",
        OUTPUT_BASE / "all-platforms",
    ]
    
    for dir_path in directories:
        dir_path.mkdir(parents=True, exist_ok=True)
        print(f"✓ Created: {dir_path}")

# Image generation configs
IMAGES_TO_GENERATE = [
    {
        "day": 1,
        "name": "teaser-day1.jpg",
        "path": OUTPUT_BASE / "instagram" / "stories" / "teaser-day1.jpg",
        "prompt": "Dark moody Instagram story teaser rock band The Drinkers crimson red spotlight guitar silhouette stage fog mysterious atmosphere vertical 9:16 authentic rock aesthetic professional",
        "width": 1080,
        "height": 1920,
        "seed": 42,
    },
    {
        "day": 2,
        "name": "coming-soon-day2.jpg",
        "path": OUTPUT_BASE / "facebook" / "posts" / "coming-soon-day2.jpg",
        "prompt": "Facebook post graphic The Drinkers website launch crimson red black gradient COMING SOON bold typography band logo center professional social media square 1:1",
        "width": 1080,
        "height": 1080,
        "seed": 43,
    },
    {
        "day": 5,
        "name": "poll-day5.jpg",
        "path": OUTPUT_BASE / "instagram" / "stories" / "poll-day5.jpg",
        "prompt": "Instagram story background music poll album covers collage faded crimson red black color scheme space center for poll sticker vertical 9:16 The Drinkers band",
        "width": 1080,
        "height": 1920,
        "seed": 44,
    },
    {
        "day": 6,
        "name": "countdown-3days-day6.jpg",
        "path": OUTPUT_BASE / "facebook" / "posts" / "countdown-3days-day6.jpg",
        "prompt": "Facebook countdown post large number 3 crimson red metallic The Drinkers logo DAYS TO LAUNCH text confetti celebration square 1:1 exciting atmosphere",
        "width": 1080,
        "height": 1080,
        "seed": 45,
    },
    {
        "day": 7,
        "name": "launch-tomorrow-instagram.jpg",
        "path": OUTPUT_BASE / "all-platforms" / "launch-tomorrow-day7-instagram.jpg",
        "prompt": "Launch announcement Instagram post TOMORROW 18:00 bold typography The Drinkers logo crimson red explosion background dramatic lighting square 1:1 professional",
        "width": 1080,
        "height": 1080,
        "seed": 46,
    },
    {
        "day": 7,
        "name": "launch-tomorrow-story.jpg",
        "path": OUTPUT_BASE / "all-platforms" / "launch-tomorrow-day7-story.jpg",
        "prompt": "Launch announcement Instagram story TOMORROW 18:00 large text The Drinkers logo crimson red explosion vertical 9:16 countdown space professional design",
        "width": 1080,
        "height": 1920,
        "seed": 47,
    },
]

def generate_image(config, retry=3):
    """Generate single image using Pollinations.ai"""
    
    print(f"\n{'='*60}")
    print(f"Day {config['day']}: {config['name']}")
    print(f"Size: {config['width']}x{config['height']}")
    print(f"{'='*60}")
    
    # Build URL
    encoded_prompt = config['prompt'].replace(' ', '%20')
    url = f"https://image.pollinations.ai/prompt/{encoded_prompt}?width={config['width']}&height={config['height']}&seed={config['seed']}&model=flux&nologo=true"
    
    for attempt in range(retry):
        try:
            if attempt > 0:
                print(f"Retry {attempt + 1}/{retry}...")
                time.sleep(3 * attempt)  # Exponential backoff
            
            print(f"Downloading from: {url[:100]}...")
            
            response = requests.get(url, timeout=60)
            
            if response.status_code == 200:
                with open(config['path'], 'wb') as f:
                    f.write(response.content)
                
                if config['path'].exists():
                    size = config['path'].stat().st_size / 1024
                    print(f"✓ Saved: {config['path']} ({size:.1f} KB)")
                    return True
            elif response.status_code == 429:
                print(f"⚠ Rate limited, waiting...")
                time.sleep(5)
            else:
                print(f"⚠ HTTP {response.status_code}")
                
        except Exception as e:
            print(f"✗ Error: {e}")
    
    return False

def main():
    print("\n" + "="*60)
    print("   THE DRINKERS - Social Media Image Generator")
    print("   Using Pollinations.ai (Free, No Login)")
    print("="*60 + "\n")
    
    # Create directories
    print("Creating directories...")
    create_directories()
    
    # Generate images with delay between requests
    success_count = 0
    for i, config in enumerate(IMAGES_TO_GENERATE):
        if i > 0:
            print(f"\n⏳ Waiting 3 seconds before next image...")
            time.sleep(3)
        
        if generate_image(config):
            success_count += 1
    
    # Summary
    print("\n" + "="*60)
    print("   Generation Complete!")
    print("="*60)
    print(f"\nSuccess: {success_count}/{len(IMAGES_TO_GENERATE)} images")
    print(f"Output directory: {OUTPUT_BASE}")
    
    if success_count > 0:
        print("\n✓ Generated images:")
        for config in IMAGES_TO_GENERATE:
            if config['path'].exists():
                size = config['path'].stat().st_size / 1024
                print(f"  - {config['name']} ({size:.1f} KB)")
    else:
        print("\n⚠ No images generated. Try:")
        print("  1. Wait a few minutes and run again")
        print("  2. Use web interface: https://inference.sh")
        print("  3. Use alternative: https://bing.com/images/create")
    
    print("\nNext steps:")
    print("  1. Review generated images")
    print("  2. Add text overlays in Canva/Photoshop if needed")
    print("  3. Upload to Meta Business Suite")
    print("  4. Schedule posts per SOCIAL_MEDIA_POSTING_SCHEDULE.md")
    print("")

if __name__ == "__main__":
    main()
