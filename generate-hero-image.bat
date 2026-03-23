@echo off
REM ========================================
REM   Generate Hero Image for The Drinkers
REM ========================================

echo.
echo ========================================
echo   Generating Hero Background Image
echo ========================================
echo.

cd /d F:\thedrinkers\the\public\images

REM Check if inference.sh is installed
where infsh >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: inference.sh CLI not found!
    echo Please install: curl -fsSL https://cli.inference.sh | sh
    pause
    exit /b 1
)

echo Generating hero background with Seedream 4.5...
echo.

REM Generate hero image
infsh app run bytedance/seedream-4-5 --input '{
  "prompt": "Epic rock concert background, The Drinkers band silhouette on stage, dramatic crimson red stage lighting #dc143c, beer mugs in foreground, electric guitars, drum set, dark atmospheric smoke, concert venue, professional music photography, cinematic lighting, 16:9 aspect ratio, high quality, dramatic shadows, rock and roll aesthetic, Slovenian rock band, energetic performance, crowd silhouettes, stage spotlights",
  "aspect_ratio": "16:9",
  "output_format": "jpg",
  "quality": "high"
}' --output hero-poster.jpg

if %errorlevel% equ 0 (
    echo.
    echo SUCCESS! Hero image generated!
    echo Location: F:\thedrinkers\the\public\images\hero-poster.jpg
    echo.
) else (
    echo.
    echo ERROR: Failed to generate image
    echo Try manual generation with:
    echo infsh app run bytedance/seedream-4-5 --input '{"prompt": "rock concert background", "aspect_ratio": "16:9"}'
    echo.
)

pause
