import requests
import base64
import sys
from urllib.parse import quote

def generate_image(prompt, width=1024, height=1024, seed=None):
    """Generate image using Pollinations.ai and return as base64"""
    if seed is None:
        seed = __import__('random').randint(0, 10000)
    
    # Sanitize prompt
    sanitized = prompt.replace('#', '').replace('%', '').replace('&', '')
    sanitized = '_'.join(sanitized.split())
    
    url = f"https://image.pollinations.ai/prompt/{sanitized}?width={width}&height={height}&seed={seed}&model=flux&nologo=true"
    print(f"Generating: {url}", file=sys.stderr)
    
    try:
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        
        # Convert to base64
        img_base64 = base64.b64encode(response.content).decode('utf-8')
        return f"data:image/png;base64,{img_base64}"
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        return None

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python generate-pollinations.py <prompt> [width] [height]", file=sys.stderr)
        sys.exit(1)
    
    prompt = sys.argv[1]
    width = int(sys.argv[2]) if len(sys.argv) > 2 else 1024
    height = int(sys.argv[3]) if len(sys.argv) > 3 else 1024
    
    result = generate_image(prompt, width, height)
    
    if result:
        print(result)
    else:
        sys.exit(1)
