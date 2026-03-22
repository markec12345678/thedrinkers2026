@echo off
REM ========================================
REM   Add Node.js to Global PATH
REM   Run as Administrator!
REM ========================================

echo.
echo ========================================
echo   Adding Node.js to Global PATH
echo ========================================
echo.

REM Check if running as administrator
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo ERROR: Not running as Administrator!
    echo.
    echo Please right-click and select "Run as administrator"
    echo.
    pause
    exit /b 1
)

echo Running as Administrator...
echo.

REM Get current PATH
for /f "tokens=2*" %%a in ('reg query "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Environment" /v Path 2^>nul') do set "OLD_PATH=%%b"

REM Add Node.js to PATH
echo Adding C:\Program Files\nodejs to PATH...
setx /M PATH "%OLD_PATH%;C:\Program Files\nodejs"

if %errorlevel% equ 0 (
    echo.
    echo SUCCESS! Node.js added to global PATH
    echo.
    echo Path: C:\Program Files\nodejs
    echo.
    echo IMPORTANT: Close and reopen your terminal for changes to take effect!
    echo.
) else (
    echo.
    echo ERROR: Failed to add to PATH
    echo.
)

echo ========================================
echo.
pause
