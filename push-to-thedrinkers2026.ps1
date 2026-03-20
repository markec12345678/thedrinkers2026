# ====================================
# The Drinkers - Push to thedrinkers2026
# ====================================

$ErrorActionPreference = "Stop"

Write-Host "====================================" -ForegroundColor Cyan
Write-Host "  Push to thedrinkers2026          " -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# GitHub Desktop Git path
$gitExe = "C:\Users\admin\AppData\Local\GitHubDesktop\app-3.5.6\resources\app\git\cmd\git.exe"

if (-not (Test-Path $gitExe)) {
    Write-Host "❌ Git not found!" -ForegroundColor Red
    pause
    exit 1
}

Write-Host "✅ Using Git from GitHub Desktop" -ForegroundColor Green
Write-Host ""

# Change to project directory
Set-Location "f:\thedrinkers\the"

# Initialize Git if needed
if (Test-Path ".git") {
    Write-Host "✅ Git already initialized" -ForegroundColor Green
} else {
    Write-Host "🔄 Initializing Git..." -ForegroundColor Yellow
    & $gitExe init
    & $gitExe branch -M main
    Write-Host "✅ Git initialized" -ForegroundColor Green
}
Write-Host ""

# Set remote
$remoteUrl = "https://github.com/markec12345678/thedrinkers2026.git"
Write-Host "🔗 Setting remote to: $remoteUrl" -ForegroundColor Yellow

$checkRemote = & $gitExe remote 2>$null
if ($checkRemote -contains 'origin') {
    Write-Host "🔄 Updating existing remote..." -ForegroundColor Gray
    & $gitExe remote set-url origin $remoteUrl
} else {
    Write-Host "➕ Adding remote..." -ForegroundColor Gray
    & $gitExe remote add origin $remoteUrl
}
Write-Host "✅ Remote configured" -ForegroundColor Green
Write-Host ""

# Add all files
Write-Host "📦 Adding files..." -ForegroundColor Yellow
& $gitExe add .
Write-Host "✅ Files staged" -ForegroundColor Green
Write-Host ""

# Commit
Write-Host "💾 Creating commit..." -ForegroundColor Yellow
$commitMsg = "Initial commit - The Drinkers 2026"
$commitResult = & $gitExe commit -m $commitMsg 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Committed: $commitMsg" -ForegroundColor Green
} else {
    Write-Host "⚠️  Nothing to commit or already committed" -ForegroundColor Yellow
}
Write-Host ""

# Push
Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Cyan
Write-Host "⚠️  You'll be prompted for GitHub credentials..." -ForegroundColor Gray
Write-Host "   Use your GitHub username and password/token" -ForegroundColor Gray
Write-Host "⚠️  Force pushing to overwrite remote README..." -ForegroundColor Yellow
Write-Host ""

& $gitExe push -u origin main --force

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "====================================" -ForegroundColor Green
    Write-Host "  ✅ SUCCESS! 🎉                   " -ForegroundColor Green
    Write-Host "====================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Repository:" -ForegroundColor Cyan
    Write-Host "https://github.com/markec12345678/thedrinkers2026" -ForegroundColor White
    Write-Host ""
    Write-Host "Opening repository in browser..." -ForegroundColor Yellow
    Start-Process "https://github.com/markec12345678/thedrinkers2026"
} else {
    Write-Host ""
    Write-Host "❌ Push failed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Troubleshooting:" -ForegroundColor Yellow
    Write-Host "1. Make sure repository exists: https://github.com/markec12345678/thedrinkers2026" -ForegroundColor White
    Write-Host "2. Check your GitHub credentials" -ForegroundColor White
    Write-Host "3. Try using a Personal Access Token instead of password" -ForegroundColor White
}

Write-Host ""
pause
