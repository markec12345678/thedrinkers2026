@echo off
REM ====================================
REM The Drinkers - PM2 Deploy Script
REM ====================================

echo ====================================
echo   The Drinkers - PM2 Deployment
echo ====================================
echo.

REM Check if Node.js is installed
echo Checking for Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js not found!
    echo Please install Node.js from: https://nodejs.org/
    pause
    exit /b 1
)
echo [OK] Node.js found
echo.

REM Check if PM2 is installed
echo Checking for PM2...
pm2 --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [INFO] PM2 not found. Installing globally...
    call npm install -g pm2
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to install PM2!
        pause
        exit /b 1
    )
)
echo [OK] PM2 found
echo.

REM Install dependencies
echo Installing dependencies...
call npm install --production
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install dependencies!
    pause
    exit /b 1
)
echo [OK] Dependencies installed
echo.

REM Build the application
echo Building application...
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Build failed!
    pause
    exit /b 1
)
echo [OK] Build completed
echo.

REM Stop existing process (if running)
echo Stopping existing process (if any)...
pm2 stop drinkers-site >nul 2>&1
pm2 delete drinkers-site >nul 2>&1

REM Start with PM2
echo Starting application with PM2...
pm2 start ecosystem.config.js
if %errorlevel% neq 0 (
    echo [ERROR] Failed to start application!
    pause
    exit /b 1
)
echo [OK] Application started
echo.

REM Save PM2 process list
echo Saving PM2 process list...
pm2 save

REM Setup PM2 startup (Windows)
echo.
echo Setting up PM2 startup...
pm2 startup windows

echo.
echo ====================================
echo   Deployment Complete! ^_^
echo ====================================
echo.
echo Your application is running!
echo.
echo Useful commands:
echo   pm2 list              - Show status
echo   pm2 logs drinkers-site - View logs
echo   pm2 monit             - Monitor
echo   pm2 restart drinkers-site - Restart
echo.

pause
