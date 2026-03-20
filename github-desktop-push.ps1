# ====================================
# The Drinkers - Uporabi GitHub Desktop Git
# ====================================

$ErrorActionPreference = "Stop"

Write-Host "====================================" -ForegroundColor Cyan
Write-Host "  GitHub Desktop Git Push          " -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Find GitHub Desktop installation
Write-Host "🔍 Iščem GitHub Desktop Git..." -ForegroundColor Yellow

$ghPaths = @(
    "C:\Users\admin\AppData\Local\GitHubDesktop\app-*\resources\app\git\bin\git.exe",
    "C:\Program Files\GitHub Desktop\resources\app\git\bin\git.exe",
    "$env:LOCALAPPDATA\GitHubDesktop\app-*\resources\app\git\bin\git.exe"
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
    Write-Host "❌ GitHub Desktop Git NI najden!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Odpiram GitHub Desktop..." -ForegroundColor Yellow
    Start-Process "C:\Users\admin\AppData\Local\GitHubDesktop\GitHubDesktop.exe"
    Write-Host ""
    Write-Host "Uporabi GitHub Desktop GUI:" -ForegroundColor Cyan
    Write-Host "1. File → Add Local Repository" -ForegroundColor White
    Write-Host "2. Choose: F:\thedrinkers\the" -ForegroundColor White
    Write-Host "3. Commit to main" -ForegroundColor White
    Write-Host "4. Publish repository" -ForegroundColor White
    Write-Host ""
    pause
    exit 1
}

Write-Host "✅ GitHub Desktop Git najden!" -ForegroundColor Green
Write-Host "   Pot: $gitExe" -ForegroundColor Gray
$gitVersion = & $gitExe --version
Write-Host "   Verzija: $gitVersion" -ForegroundColor Gray
Write-Host ""

# Set PATH
$gitDir = Split-Path (Split-Path $gitExe)
$env:Path = "$gitDir\cmd;$gitDir\bin;" + $env:Path

Write-Host "📁 Delovna mapa: $(Get-Location)" -ForegroundColor Cyan
Write-Host ""

# Check if already initialized
if (Test-Path ".git") {
    Write-Host "✅ Git že inicializiran" -ForegroundColor Green
} else {
    Write-Host "🔄 Inicializiram Git..." -ForegroundColor Yellow
    & $gitExe init
    & $gitExe branch -M main
    Write-Host "✅ Git inicializiran" -ForegroundColor Green
}
Write-Host ""

# Get GitHub username
Write-Host "👤 GitHub Uporabnik" -ForegroundColor Cyan
Write-Host ""
$githubUser = Read-Host "Vnesi svoj GitHub username"

if (-not $githubUser) {
    Write-Host "❌ Username je obvezen!" -ForegroundColor Red
    pause
    exit 1
}

$repoName = "the-drinkers-site"
Write-Host ""
Write-Host "📦 Repository: $repoName" -ForegroundColor Cyan
Write-Host ""

# Check remote
Write-Host "🔗 Preverjam remote..." -ForegroundColor Yellow
$remoteUrl = & $gitExe remote get-url origin 2>$null
if ($remoteUrl) {
    Write-Host "✅ Remote obstaja: $remoteUrl" -ForegroundColor Green
} else {
    Write-Host "🔗 Dodajam remote..." -ForegroundColor Yellow
    $repoUrl = "https://github.com/$githubUser/$repoName.git"
    & $gitExe remote add origin $repoUrl
    Write-Host "✅ Remote dodan" -ForegroundColor Green
}
Write-Host ""

# Add files
Write-Host "📦 Dodajam datoteke..." -ForegroundColor Yellow
& $gitExe add .
Write-Host "✅ Datoteke dodane" -ForegroundColor Green
Write-Host ""

# Commit
Write-Host "💾 Ustvarjam commit..." -ForegroundColor Yellow
$commitMsg = "Initial commit - The Drinkers website"
& $gitExe commit -m $commitMsg
Write-Host "✅ Commit: $commitMsg" -ForegroundColor Green
Write-Host ""

# Push
Write-Host "🚀 Pusham na GitHub..." -ForegroundColor Yellow
Write-Host "⚠️  Vnesel boš GitHub credentials..." -ForegroundColor Gray
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
    Write-Host "Odpiram repository v browserju..." -ForegroundColor Yellow
    Start-Process "https://github.com/$githubUser/$repoName"
    Write-Host ""
    Write-Host "Naslednji korak - Vercel Deploy:" -ForegroundColor Cyan
    Write-Host "1. Pojdi na: https://vercel.com/new" -ForegroundColor White
    Write-Host "2. Importaj GitHub repository" -ForegroundColor White
    Write-Host "3. Klikni Deploy" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "❌ Push ni uspel!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Rešitev:" -ForegroundColor Yellow
    Write-Host "1. Preveri GitHub username" -ForegroundColor White
    Write-Host "2. Ustvari repository na: https://github.com/new" -ForegroundColor White
    Write-Host "3. Poskusi ponovno" -ForegroundColor White
}

Write-Host ""
pause
