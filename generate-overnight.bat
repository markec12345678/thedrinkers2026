@echo off
REM THE DRINKERS - OVERNIGHT IMAGE GENERATION
REM 
REM This script generates all required images overnight
REM Estimated time: 3-4 hours (20 min per image)
REM
REM Usage: generate-overnight.bat
REM Run this before you go to sleep

echo ============================================================
echo   THE DRINKERS - OVERNIGHT IMAGE GENERATION
echo ============================================================
echo.
echo Starting Stable Diffusion image generation...
echo Estimated time: 3-4 hours
echo.
echo This will run in the background
echo Check progress in: logs\image-generation.log
echo.

REM Create logs directory
if not exist "logs" mkdir logs

REM Start generation in background
start /B cmd /c "python generate-all-images.py > logs\image-generation.log 2>&1"

echo ✅ Generation started!
echo.
echo Progress will be saved to: logs\image-generation.log
echo.
echo To check progress:
echo   type logs\image-generation.log
echo.
echo Images will be saved to:
echo   public\images\generated\
echo.
echo ============================================================
echo   GOOD NIGHT! See you in the morning! 🌙
echo ============================================================
echo.
