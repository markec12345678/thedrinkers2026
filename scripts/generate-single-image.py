
import torch
from diffusers import StableDiffusionPipeline, DPMSolverMultistepScheduler
import base64
import io
import sys

MODEL = "runwayml/stable-diffusion-v1-5"
prompt = "test, high quality, detailed, professional artwork"
width = 1024
height = 1024

try:
    pipe = StableDiffusionPipeline.from_pretrained(
        MODEL,
        torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32,
        safety_checker=None,
        requires_safety_checker=False
    )
    pipe.scheduler = DPMSolverMultistepScheduler.from_config(pipe.scheduler.config)
    pipe = pipe.to("cuda" if torch.cuda.is_available() else "cpu")
    
    image = pipe(
        prompt=prompt,
        width=width,
        height=height,
        num_inference_steps=25,
        guidance_scale=7.5
    ).images[0]
    
    buffer = io.BytesIO()
    image.save(buffer, format="PNG")
    img_base64 = base64.b64encode(buffer.getvalue()).decode('utf-8')
    print(f"data:image/png;base64,{img_base64}")
except Exception as e:
    print(f"Error: {e}", file=sys.stderr)
    sys.exit(1)
