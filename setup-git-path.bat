@echo off
REM ====================================
REM Add Git to PATH
REM ====================================

echo Setting up Git...

REM Git path from OllamaModels
set "GIT_PATH=F:\OllamaModels\Git\cmd"

REM Add to PATH for current session
set "PATH=%GIT_PATH%;%PATH%"

REM Verify Git is working
git --version

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ Git is now available in this session!
    echo.
    echo Path: %GIT_PATH%
    echo.
    echo Git version: 
    git --version
    echo.
    echo ========================================
    echo ZAGNI WINDSURF ROČNO - Git je pripravljen!
    echo ========================================
    echo.
) else (
    echo.
    echo ❌ Git not found!
    echo.
    echo Preveri pot: %GIT_PATH%
    echo.
)

pause
