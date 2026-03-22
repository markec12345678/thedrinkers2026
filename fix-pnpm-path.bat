@echo off
REM ========================================
REM   Fix pnpm PATH Issue
REM   Run as Administrator!
REM ========================================

echo.
echo ========================================
echo   Fixing pnpm PATH
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

REM Add pnpm to PATH (it's installed in AppData by default)
echo Adding pnpm to PATH...
setx /M PATH "%OLD_PATH%;%APPDATA%\npm"

if %errorlevel% equ 0 (
    echo.
    echo SUCCESS! pnpm added to global PATH
    echo.
    echo Path: %APPDATA%\npm
    echo.
    echo IMPORTANT: Close and reopen your terminal for changes to take effect!
    echo.
    echo After reopening, test with: pnpm --version
    echo.
) else (
    echo.
    echo ERROR: Failed to add to PATH
    echo.
)

echo ========================================
echo.
pause
