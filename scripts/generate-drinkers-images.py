"""
The Drinkers - Social Media Image Generator
Uporaba inferencesh SDK za generiranje AI slik
"""

import os
import sys
from pathlib import Path
import requests

# API Key
API_KEY = "1nfsh-5n2ewp39yxpxbvzt4gydp19hbe"
os.environ["INFERENCE_SH_API_KEY"] = API_KEY

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
        "model": "bytedance/seedream-4-5",
        "prompt": "Dark moody Instagram story teaser for rock band The Drinkers, crimson red spotlight on black background #dc143c, electric guitar silhouette, stage fog, mysterious atmosphere, vertical 9:16 format, authentic rock aesthetic, raw energy, professional concert photography",
        "aspect_ratio": "9:16",
    },
    {
        "day": 2,
        "name": "coming-soon-day2.jpg",
        "path": OUTPUT_BASE / "facebook" / "posts" / "coming-soon-day2.jpg",
        "model": "falai/flux-2-klein-lora",
        "prompt": "Facebook post graphic for The Drinkers website launch announcement, crimson red #dc143c to black gradient background, band logo in center, COMING SOON bold typography, professional social media design, square 1:1 format, clean modern rock aesthetic",
        "aspect_ratio": "1:1",
    },
    {
        "day": 5,
        "name": "poll-day5.jpg",
        "path": OUTPUT_BASE / "instagram" / "stories" / "poll-day5.jpg",
        "model": "bytedance/seedream-4-5",
        "prompt": "Instagram story background for music poll, The Drinkers album covers collage faded, crimson red #dc143c and black color scheme, rock band aesthetic, vertical 9:16 format, clear space in center for poll sticker, subtle guitar and beer mug icons",
        "aspect_ratio": "9:16",
    },
    {
        "day": 6,
        "name": "countdown-3days-day6.jpg",
        "path": OUTPUT_BASE / "facebook" / "posts" / "countdown-3days-day6.jpg",
        "model": "google/gemini-3-pro-image-preview",
        "prompt": "Facebook countdown post graphic, large number 3 in crimson red #dc143c with metallic texture, The Drinkers logo at top, DAYS TO LAUNCH text below, confetti and celebration elements in corners, black background, square 1:1 format, bold typography, exciting atmosphere",
        "aspect_ratio": "1:1",
    },
    {
        "day": 7,
        "name": "launch-tomorrow-instagram.jpg",
        "path": OUTPUT_BASE / "all-platforms" / "launch-tomorrow-day7-instagram.jpg",
        "model": "bytedance/seedream-4-5",
        "prompt": "Launch announcement Instagram post, TOMORROW 18:00 bold typography in center, The Drinkers logo prominent, crimson red #dc143c explosion background, dramatic stage lighting, square 1:1 format 1080x1080, professional social media design, Slovenian rock band, urgent exciting atmosphere",
        "aspect_ratio": "1:1",
    },
    {
        "day": 7,
        "name": "launch-tomorrow-story.jpg",
        "path": OUTPUT_BASE / "all-platforms" / "launch-tomorrow-day7-story.jpg",
        "model": "falai/flux-dev-lora",
        "prompt": "Launch announcement Instagram story, TOMORROW 18:00 large text, The Drinkers logo, crimson red #dc143c explosion background, vertical 9:16 format 1080x1920, countdown timer space, link sticker space at bottom, professional design",
        "aspect_ratio": "9:16",
    },
]

def generate_image(config):
    """Generate single image using inference.sh API"""
    import inferencesh as infsh
    
    print(f"\n{'='*60}")
    print(f"Day {config['day']}: {config['name']}")
    print(f"Model: {config['model']}")
    print(f"Aspect: {config['aspect_ratio']}")
    print(f"{'='*60}")
    
    try:
        # Use stream_generate for image generation
        from inferencesh import stream_post
        
        # Prepare request
        payload = {
            "prompt": config['prompt'],
            "aspect_ratio": config['aspect_ratio'],
            "output_format": "jpg"
        }
        
        # Make API request
        endpoint = f"https://api.inference.sh/v1/apps/{config['model']}/run"
        headers = {
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json"
        }
        
        print(f"POST {endpoint}")
        response = requests.post(endpoint, headers=headers, json=payload, timeout=120)
        
        print(f"Status: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print(f"Response keys: {result.keys() if isinstance(result, dict) else 'N/A'}")
            
            # Extract image URL from response
            img_url = None
            if isinstance(result, dict):
                if 'result' in result and 'image_url' in result['result']:
                    img_url = result['result']['image_url']
                elif 'data' in result and len(result['data']) > 0:
                    img_url = result['data'][0].get('url')
                elif 'image_url' in result:
                    img_url = result['image_url']
                elif 'url' in result:
                    img_url = result['url']
            
            if img_url:
                print(f"Downloading from: {img_url}")
                img_data = requests.get(img_url).content
                with open(config['path'], 'wb') as f:
                    f.write(img_data)
                print(f"✓ Saved: {config['path']}")
                return True
            else:
                print(f"✗ No image URL in response: {result}")
                return False
        else:
            print(f"✗ Error: {response.text}")
            return False
            
    except Exception as e:
        print(f"✗ Error: {e}")
        return False

def main():
    print("\n" + "="*60)
    print("   THE DRINKERS - Social Media Image Generator")
    print("   Using inference.sh SDK")
    print("="*60 + "\n")
    
    # Create directories
    print("Creating directories...")
    create_directories()
    
    # Generate images
    success_count = 0
    for config in IMAGES_TO_GENERATE:
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
    
    print("\nNext steps:")
    print("  1. Review generated images")
    print("  2. Add text overlays in Canva/Photoshop if needed")
    print("  3. Upload to Meta Business Suite")
    print("  4. Schedule posts per SOCIAL_MEDIA_POSTING_SCHEDULE.md")
    print("")

if __name__ == "__main__":
    main()
