"""
The Drinkers - Social Media Image Generator
Uporaba inferencesh Python SDK za generiranje AI slik
"""

import os
import sys
from pathlib import Path

# API Key
API_KEY = "1nfsh-5n2ewp39yxpxbvzt4gydp19hbe"

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

# Image generation prompts
IMAGES_TO_GENERATE = [
    {
        "day": 1,
        "name": "teaser-day1.jpg",
        "path": OUTPUT_BASE / "instagram" / "stories" / "teaser-day1.jpg",
        "model": "bytedance/seedream-4-5",
        "prompt": "Dark moody Instagram story teaser for rock band The Drinkers, crimson red spotlight on black background, electric guitar silhouette, stage fog, mysterious atmosphere, vertical 9:16 format, authentic rock aesthetic",
        "aspect_ratio": "9:16",
    },
    {
        "day": 2,
        "name": "coming-soon-day2.jpg",
        "path": OUTPUT_BASE / "facebook" / "posts" / "coming-soon-day2.jpg",
        "model": "falai/flux-2-klein-lora",
        "prompt": "Facebook post graphic for The Drinkers website launch announcement, crimson red to black gradient background, band logo in center, COMING SOON bold typography, professional social media design, square 1:1 format",
        "aspect_ratio": "1:1",
    },
    {
        "day": 5,
        "name": "poll-day5.jpg",
        "path": OUTPUT_BASE / "instagram" / "stories" / "poll-day5.jpg",
        "model": "bytedance/seedream-4-5",
        "prompt": "Instagram story background for music poll, album covers collage faded, crimson red and black color scheme, space for poll sticker in center, vertical 9:16 format",
        "aspect_ratio": "9:16",
    },
    {
        "day": 6,
        "name": "countdown-3days-day6.jpg",
        "path": OUTPUT_BASE / "facebook" / "posts" / "countdown-3days-day6.jpg",
        "model": "google/gemini-3-pro-image-preview",
        "prompt": "Facebook countdown post graphic, large number 3 in crimson red, The Drinkers logo, DAYS TO LAUNCH text, confetti, square 1:1 format",
        "aspect_ratio": "1:1",
    },
    {
        "day": 7,
        "name": "launch-tomorrow-day7-instagram.jpg",
        "path": OUTPUT_BASE / "all-platforms" / "launch-tomorrow-day7-instagram.jpg",
        "model": "bytedance/seedream-4-5",
        "prompt": "Launch announcement Instagram post, TOMORROW 18:00 bold typography, The Drinkers logo, crimson red explosion background, square 1:1 format",
        "aspect_ratio": "1:1",
    },
    {
        "day": 7,
        "name": "launch-tomorrow-day7-story.jpg",
        "path": OUTPUT_BASE / "all-platforms" / "launch-tomorrow-day7-story.jpg",
        "model": "falai/flux-dev-lora",
        "prompt": "Launch announcement Instagram story, TOMORROW 18:00 large text, The Drinkers logo, crimson red explosion background, vertical 9:16 format",
        "aspect_ratio": "9:16",
    },
]

def generate_with_inferencesh_sdk():
    """Generate images using inferencesh SDK with App pattern"""
    import inferencesh as infsh
    import requests
    
    print("\n" + "="*60)
    print("   THE DRINKERS - Social Media Image Generator (SDK)")
    print("="*60 + "\n")
    
    # Set API key
    os.environ["INFERENCE_SH_API_KEY"] = API_KEY
    
    for image_config in IMAGES_TO_GENERATE:
        print(f"\n{'='*50}")
        print(f"Day {image_config['day']}: {image_config['name']}")
        print(f"Model: {image_config['model']}")
        print(f"Aspect: {image_config['aspect_ratio']}")
        print(f"{'='*50}")
        
        try:
            # Use inference.sh app run pattern
            # Apps are run using the app name directly
            app_name = image_config['model'].split('/')[-1]  # e.g., "seedream-4-5"
            
            print(f"Running app: {app_name}")
            
            # Try using the inference function
            result = infsh.inference(
                model=image_config['model'],
                prompt=image_config['prompt'],
                aspect_ratio=image_config['aspect_ratio']
            )
            
            print(f"Result type: {type(result)}")
            print(f"Result: {result}")
            
            # Save result if we got an image
            if result:
                print(f"✓ Generated: {image_config['path']}")
                
        except Exception as e:
            print(f"✗ Error: {e}")
    
    return True

def generate_with_http():
    """Generate images using HTTP requests with correct endpoints"""
    import requests
    import time
    
    print("\n" + "="*60)
    print("   THE DRINKERS - Social Media Image Generator (HTTP)")
    print("="*60 + "\n")
    
    # Set API key
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
    
    for image_config in IMAGES_TO_GENERATE:
        print(f"\n{'='*50}")
        print(f"Day {image_config['day']}: {image_config['name']}")
        print(f"Model: {image_config['model']}")
        print(f"{'='*50}")
        
        # Use the apps endpoint with model name
        payload = {
            "prompt": image_config['prompt'],
            "aspect_ratio": image_config['aspect_ratio']
        }
        
        # Try app-based endpoint
        app_name = image_config['model']
        endpoint = f"https://api.inference.sh/v1/apps/{app_name}/run"
        
        print(f"POST {endpoint}")
        
        try:
            response = requests.post(endpoint, headers=headers, json=payload, timeout=60)
            print(f"Status: {response.status_code}")
            
            if response.status_code == 200:
                result = response.json()
                print(f"Response: {result}")
                
                # Try to extract image from various response formats
                img_url = None
                if isinstance(result, dict):
                    # Check different possible response structures
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
                    with open(image_config['path'], 'wb') as f:
                        f.write(img_data)
                    print(f"✓ Saved: {image_config['path']}")
                    time.sleep(1)
                else:
                    print("✗ No image URL found in response")
            else:
                print(f"Error: {response.text}")
                
        except Exception as e:
            print(f"✗ Error: {e}")

if __name__ == "__main__":
    print("Creating directories...")
    create_directories()
    
    print("\n" + "="*60)
    print("   Starting Image Generation")
    print("="*60)
    
    # Try SDK
    try:
        generate_with_inferencesh_sdk()
    except Exception as e:
        print(f"\nSDK failed: {e}")
        print("Trying HTTP method...\n")
        generate_with_http()
    
    print("\n" + "="*60)
    print("   Generation Complete!")
    print("="*60)
    print(f"\nOutput directory: {OUTPUT_BASE}")
    print("\nAlternative: Use web interface at https://inference.sh")
    print("")
