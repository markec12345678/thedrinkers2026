@echo off
REM ====================================
REM The Drinkers - GitHub Push Script (Batch)
REM ====================================

echo ====================================
echo   Pushing to GitHub
echo ====================================
echo.

REM Check if Git is installed
echo Checking for Git...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Git not found!
    echo Please install Git from: https://git-scm.com/downloads
    pause
    exit /b 1
)
echo [OK] Git found
echo.

REM Check if already a Git repository
if exist ".git" (
    echo [OK] Git repository already initialized
) else (
    echo Initializing Git repository...
    git init
    git branch -M main
    echo [OK] Git repository initialized
)
echo.

REM Check if remote is already configured
git remote get-url origin >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Remote 'origin' already configured
) else (
    echo Configuring GitHub remote...
    echo.
    echo Enter your GitHub username:
    set /p GITHUB_USER=Username: 
    
    echo.
    echo Enter repository name (or press Enter for 'the-drinkers-site'):
    set /p REPO_NAME=Repository name: 
    if "%REPO_NAME%"=="" set REPO_NAME=the-drinkers-site
    
    echo.
    echo Manual steps required:
    echo.
    echo 1. Go to https://github.com/new
    echo 2. Repository name: %REPO_NAME%
    echo 3. Choose Public or Private
    echo 4. Click 'Create repository'
    echo 5. Then run these commands:
    echo.
    echo    git remote add origin https://github.com/%GITHUB_USER%/%REPO_NAME%.git
    echo    git add .
    echo    git commit -m "Initial commit - The Drinkers website"
    echo    git push -u origin main
    echo.
)

echo ====================================
echo  Next Steps
echo ====================================
echo.
echo If you already have a GitHub repository:
echo.
echo 1. Add all files:
echo    git add .
echo.
echo 2. Create first commit:
echo    git commit -m "Initial commit - The Drinkers website"
echo.
echo 3. Push to GitHub:
echo    git push -u origin main
echo.

pause
