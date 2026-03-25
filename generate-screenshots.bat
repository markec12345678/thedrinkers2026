@echo off
echo ====================================
echo  DEVICE SHOTS - The Drinkers
echo ====================================
echo.

REM Preveri če Node.js obstaja
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js ni nameščen!
    echo Namesti: https://nodejs.org/
    pause
    exit /b 1
)

echo [1/3] Priprava okolja...
cd device-shots

echo [2/3] Nameščam odvisnosti...
call npm install --silent

echo [3/3] Generiram screenshotove...
echo.

REM Generiraj za ključne naprave
node index.js http://localhost:3000 "iPhone 12, iPhone 13, iPad Pro, Desktop Chrome" fullscreen force-yes

echo.
echo ====================================
echo  KONČANO!
echo ====================================
echo Screenshoti so v: generated-screenshots\
echo.
pause
