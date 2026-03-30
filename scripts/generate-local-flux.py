"""
Local Image Generator using diffusers
Supports: SDXL Turbo (fast), FLUX (high quality)
Generates images locally - FREE, no API key needed!
"""
import sys
import base64
import io
import torch
from diffusers import AutoPipelineForText2Image

def generate_image(prompt, width=1024, height=1024, seed=None, use_sdxl=True):
    """Generate image using local diffusion model"""
    if seed is None:
        import random
        seed = random.randint(0, 10000)
    
    generator = torch.Generator(device="cuda" if torch.cuda.is_available() else "cpu").manual_seed(seed)
    
    model_name = "stabilityai/sdxl-turbo" if use_sdxl else "black-forest-labs/FLUX.1-dev"
    print(f"Loading {model_name}...", file=sys.stderr)
    
    try:
        # Load pipeline
        pipe = AutoPipelineForText2Image.from_pretrained(
            model_name,
            torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32,
            variant="fp16" if torch.cuda.is_available() else None,
        )
        
        # Move to GPU if available
        if torch.cuda.is_available():
            pipe = pipe.to("cuda")
            print(f"Using GPU: {torch.cuda.get_device_name(0)}", file=sys.stderr)
        else:
            print("Using CPU (slow!)", file=sys.stderr)
        
        # SDXL Turbo is fast (1-4 steps), FLUX needs 25 steps
        num_steps = 4 if use_sdxl else 25
        
        print(f"Generating image: {prompt}", file=sys.stderr)
        
        # Generate image
        result = pipe(
            prompt=prompt,
            height=height,
            width=width,
            num_inference_steps=num_steps,
            generator=generator,
        )
        
        image = result.images[0]
        
        # Convert to base64
        buffer = io.BytesIO()
        image.save(buffer, format="PNG")
        img_base64 = base64.b64encode(buffer.getvalue()).decode('utf-8')
        
        print(f"Image generated successfully!", file=sys.stderr)
        return f"data:image/png;base64,{img_base64}"
        
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        import traceback
        traceback.print_exc(file=sys.stderr)
        return None

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python generate-local-image.py <prompt> [width] [height] [seed] [sdxl|flux]", file=sys.stderr)
        sys.exit(1)
    
    prompt = sys.argv[1]
    width = int(sys.argv[2]) if len(sys.argv) > 2 else 1024
    height = int(sys.argv[3]) if len(sys.argv) > 3 else 1024
    seed = int(sys.argv[4]) if len(sys.argv) > 4 else None
    model = sys.argv[5] if len(sys.argv) > 5 else "sdxl"
    
    use_sdxl = model.lower() != "flux"
    result = generate_image(prompt, width, height, seed, use_sdxl)
    
    if result:
        print(result)
    else:
        sys.exit(1)
