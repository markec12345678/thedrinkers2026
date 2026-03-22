@echo off
REM ========================================
REM   Use pnpm (without global PATH)
REM ========================================

REM Set pnpm path
set PNPM_PATH=%APPDATA%\npm

REM Add to current session PATH
set PATH=%PNPM_PATH%;%PATH%

REM Execute pnpm with all arguments
pnpm %*
