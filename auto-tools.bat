@echo off
:main_menu
cls
echo ====================================
echo  THE DRINKERS - AUTO TOOLS
echo ====================================
echo.
echo [1] Generate Device Screenshots
echo [2] Grab Inspiration Websites
echo [3] Analyze Downloaded Code
echo [4] Open Screenshot Folder
echo [5] Open Grabbed Sites Folder
echo [6] Exit
echo.
set /p choice="Choose option (1-6): "

if "%choice%"=="1" goto screenshots
if "%choice%"=="2" goto grab
if "%choice%"=="3" goto analyze
if "%choice%"=="4" goto open_screenshots
if "%choice%"=="5" goto open_grabbed
if "%choice%"=="6" goto end

:screenshots
echo.
echo ====================================
echo  DEVICE SHOTS
echo ====================================
echo.
cd device-shots
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install --silent
)
echo.
echo Generating screenshots for:
echo - iPhone 12
echo - iPhone 13
echo - iPad Pro
echo - Desktop Chrome
echo.
node index.js http://localhost:3000 "iPhone 12, iPhone 13, iPad Pro, Desktop Chrome" fullscreen force-yes
echo.
echo ====================================
echo  DONE!
echo ====================================
echo Screenshoti so v: %CD%\generated-screenshots\
echo.
pause
cd ..
goto main_menu

:grab
echo.
echo ====================================
echo  WEBPAGE GRABBER
echo ====================================
echo.
echo Grabbing inspiration websites...
echo.
cd webpage-grabber
python grab-inspiration.py
echo.
pause
cd ..
goto main_menu

:analyze
echo.
echo ====================================
echo  CODE ANALYSIS
echo ====================================
echo.
echo Opening grabbed sites folder...
explorer webpage-grabber
goto main_menu

:open_screenshots
echo.
echo Opening screenshots folder...
explorer device-shots\generated-screenshots
goto main_menu

:open_grabbed
echo.
echo Opening grabbed sites folder...
explorer webpage-grabber
goto main_menu

:end
echo.
echo Thank you for using THE DRINKERS AUTO TOOLS!
echo Goodbye!
timeout /t 2
exit
