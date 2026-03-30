@echo off
REM 🎨 THE DRINKERS - LOCAL STABLE DIFFUSION GENERATOR
REM 
REM Generates images locally using Stable Diffusion
REM No internet required, completely free!
REM
REM Usage: generate-images-local.bat

echo ╔══════════════════════════════════════════════════════════╗
echo ║                                                          ║
echo ║   🎨  LOCAL STABLE DIFFUSION IMAGE GENERATOR  🎨        ║
echo ║                                                          ║
echo ║   Generating images locally...                          ║
echo ║                                                          ║
echo ╚══════════════════════════════════════════════════════════╝
echo.

REM Check if Python is installed
where python >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python not found!
    echo.
    echo Please install Python 3.8+ from https://python.org
    pause
    exit /b 1
)

echo ✅ Python found!
echo.

REM Check if required packages are installed
echo 🔍 Checking dependencies...
python -c "import torch" 2>nul
if %errorlevel% neq 0 (
    echo ❌ PyTorch not found!
    echo.
    echo Installing PyTorch...
    pip install torch
)

python -c "import diffusers" 2>nul
if %errorlevel% neq 0 (
    echo ❌ Diffusers not found!
    echo.
    echo Installing Diffusers...
    pip install diffusers transformers accelerate
)

echo.
echo ✅ All dependencies ready!
echo.

REM Run the generation script
echo 🎨 Starting image generation...
echo.
python local-sd-generate.py

echo.
echo ╔══════════════════════════════════════════════════════════╗
echo ║                                                          ║
echo ║   ✅  GENERATION COMPLETE!                              ║
echo ║                                                          ║
echo ╚══════════════════════════════════════════════════════════╝
echo.
pause
