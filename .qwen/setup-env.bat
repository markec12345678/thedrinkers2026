@echo off
REM Setup Environment for The Drinkers Website
REM This adds Node.js to PATH for current session

echo ========================================
echo  The Drinkers - Environment Setup
echo ========================================
echo.

REM Add Node.js to PATH
set PATH=%PATH%;C:\Program Files\nodejs

echo Adding Node.js to PATH...
echo Path: C:\Program Files\nodejs
echo.

REM Verify installation
echo Checking installations...
node --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Node.js is available
    node --version
) else (
    echo [ERROR] Node.js not found in PATH
    echo Please restart your terminal
)

npm --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] npm is available
    npm --version
) else (
    echo [ERROR] npm not found
)

echo.
echo ========================================
echo  Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Run: npm install
echo 2. Run: npm run dev
echo.
echo Or restart your terminal for permanent PATH changes.
echo.
pause
