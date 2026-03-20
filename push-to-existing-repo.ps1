# ====================================
# Push na obstoječi GitHub repository
# ====================================

$ErrorActionPreference = "Stop"

Write-Host "====================================" -ForegroundColor Cyan
Write-Host "  Push na markec12345678/thedrinkers" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Find Git in GitHub Desktop
Write-Host "🔍 Iščem Git..." -ForegroundColor Yellow

$ghPaths = @(
    "C:\Users\admin\AppData\Local\GitHubDesktop\app-*\resources\app\git\bin\git.exe",
    "C:\Program Files\GitHub Desktop\resources\app\git\bin\git.exe"
)

$gitExe = $null
foreach ($path in $ghPaths) {
    $expandedPath = $path -replace '\*', '*'
    $found = Get-ChildItem $expandedPath -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($found) {
        $gitExe = $found.FullName
        break
    }
}

if (-not $gitExe) {
    Write-Host ""
    Write-Host "❌ Git NI najden!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Uporabi GitHub Desktop:" -ForegroundColor Yellow
    Write-Host "1. Odpri GitHub Desktop" -ForegroundColor White
    Write-Host "2. File → Add Local Repository" -ForegroundColor White
    Write-Host "3. Choose: F:\thedrinkers\the" -ForegroundColor White
    Write-Host "4. Publish repository" -ForegroundColor White
    Write-Host ""
    pause
    exit 1
}

Write-Host "✅ Git najden" -ForegroundColor Green
Write-Host ""

# Set PATH
$gitDir = Split-Path (Split-Path $gitExe)
$env:Path = "$gitDir\cmd;$gitDir\bin;" + $env:Path

# GitHub info
$githubUser = "markec12345678"
$repoName = "thedrinkers"
$repoUrl = "https://github.com/$githubUser/$repoName.git"

Write-Host "📦 Repository: $githubUser/$repoName" -ForegroundColor Cyan
Write-Host "🔗 URL: $repoUrl" -ForegroundColor Cyan
Write-Host ""

# Check if .git exists
if (Test-Path ".git") {
    Write-Host "✅ Git repository obstaja" -ForegroundColor Green
} else {
    Write-Host "🔄 Inicializiram Git..." -ForegroundColor Yellow
    & $gitExe init
    & $gitExe branch -M main
    Write-Host "✅ Git inicializiran" -ForegroundColor Green
}
Write-Host ""

# Check and set remote
Write-Host "🔗 Nastavljam remote..." -ForegroundColor Yellow
$existingRemote = & $gitExe remote get-url origin 2>$null
if ($existingRemote) {
    Write-Host "⚠️  Remote že obstaja: $existingRemote" -ForegroundColor Yellow
    Write-Host "   Spreminjam v: $repoUrl" -ForegroundColor Gray
    & $gitExe remote set-url origin $repoUrl
} else {
    & $gitExe remote add origin $repoUrl
}
Write-Host "✅ Remote nastavljen" -ForegroundColor Green
Write-Host ""

# Add all files
Write-Host "📦 Dodajam vse datoteke..." -ForegroundColor Yellow
& $gitExe add .
Write-Host "✅ Datoteke dodane" -ForegroundColor Green
Write-Host ""

# Commit
Write-Host "💾 Ustvarjam commit..." -ForegroundColor Yellow
$commitMsg = "Complete website - The Drinkers band site"
& $gitExe commit -m $commitMsg
Write-Host "✅ Commit: $commitMsg" -ForegroundColor Green
Write-Host ""

# Pull first (to avoid conflicts)
Write-Host "📥 Pullam zadnje spremembe..." -ForegroundColor Yellow
& $gitExe pull origin main --allow-unrelated-histories
Write-Host ""

# Push
Write-Host "🚀 Pusham na GitHub..." -ForegroundColor Yellow
Write-Host "⚠️  Vnesi GitHub credentials..." -ForegroundColor Gray
Write-Host ""

& $gitExe push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "====================================" -ForegroundColor Green
    Write-Host "  ✅ USPEH! 🎉                    " -ForegroundColor Green
    Write-Host "====================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Tvoj repository:" -ForegroundColor Cyan
    Write-Host "https://github.com/$githubUser/$repoName" -ForegroundColor White
    Write-Host ""
    Write-Host "Odpiram repository..." -ForegroundColor Yellow
    Start-Process "https://github.com/$githubUser/$repoName"
    Write-Host ""
    Write-Host "Naslednji korak - Vercel Deploy:" -ForegroundColor Cyan
    Write-Host "1. Pojdi na: https://vercel.com/new" -ForegroundColor White
    Write-Host "2. Importaj ta repository" -ForegroundColor White
    Write-Host "3. Klikni Deploy" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "❌ Push ni uspel!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Rešitev:" -ForegroundColor Yellow
    Write-Host "1. Preveri da si prijavljen v GitHub" -ForegroundColor White
    Write-Host "2. Uporabi GitHub Desktop namesto command line" -ForegroundColor White
    Write-Host ""
    Write-Host "GitHub Desktop navodila:" -ForegroundColor Cyan
    Write-Host "1. File → Add Local Repository" -ForegroundColor White
    Write-Host "2. Choose: F:\thedrinkers\the" -ForegroundColor White
    Write-Host "3. Commit to main" -ForegroundColor White
    Write-Host "4. Publish repository" -ForegroundColor White
}

Write-Host ""
pause
