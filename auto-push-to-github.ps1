# ====================================
# The Drinkers - Popolnoma Avtomatski GitHub Push
# ====================================

$ErrorActionPreference = "Stop"

Write-Host "====================================" -ForegroundColor Cyan
Write-Host "  Avtomatski GitHub Push           " -ForegroundColor Cyan
Write-Host "  The Drinkers Website             " -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Find Git
Write-Host "🔍 Isčem Git..." -ForegroundColor Yellow

$gitPaths = @(
    "C:\Program Files\Git\bin\git.exe",
    "C:\Program Files (x86)\Git\bin\git.exe",
    "${env:ProgramFiles}\Git\bin\git.exe",
    "${env:ProgramFiles(x86)}\Git\bin\git.exe",
    "$env:LOCALAPPDATA\Programs\Git\bin\git.exe",
    "C:\Users\admin\AppData\Local\GitHubDesktop\app\*\resources\app\git\cmd\git.exe"
)

$gitExe = $null
foreach ($path in $gitPaths) {
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
    Write-Host "Namesti GitHub Desktop ali Git:" -ForegroundColor Yellow
    Write-Host "1. winget install Git.Git" -ForegroundColor White
    Write-Host "2. Ali prenesi: https://git-scm.com/download/win" -ForegroundColor White
    Write-Host ""
    pause
    exit 1
}

Write-Host "✅ Git najden: $gitExe" -ForegroundColor Green
$gitVersion = & $gitExe --version
Write-Host "   Verzija: $gitVersion" -ForegroundColor Gray
Write-Host ""

# Set PATH
$gitDir = Split-Path (Split-Path $gitExe)
$env:Path = "$gitDir\cmd;$gitDir\bin;" + $env:Path

# Check if already initialized
Write-Host "📁 Preverjam Git repository..." -ForegroundColor Yellow
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

# Check if remote exists
Write-Host "🔗 Preverjam remote..." -ForegroundColor Yellow
$remoteUrl = & $gitExe remote get-url origin 2>$null
if ($remoteUrl) {
    Write-Host "✅ Remote že obstaja: $remoteUrl" -ForegroundColor Green
} else {
    Write-Host "🔗 Dodajam remote..." -ForegroundColor Yellow
    $repoUrl = "https://github.com/$githubUser/$repoName.git"
    & $gitExe remote add origin $repoUrl
    Write-Host "✅ Remote dodan: $repoUrl" -ForegroundColor Green
}
Write-Host ""

# Add all files
Write-Host "📦 Dodajam vse datoteke..." -ForegroundColor Yellow
& $gitExe add .
Write-Host "✅ Datoteke dodane" -ForegroundColor Green
Write-Host ""

# Check status
Write-Host "📊 Status:" -ForegroundColor Cyan
$status = & $gitExe status --short
if ($status) {
    Write-Host "$status" -ForegroundColor Gray
} else {
    Write-Host "Ni sprememb za commit" -ForegroundColor Gray
}
Write-Host ""

# Commit
Write-Host "💾 Ustvarjam commit..." -ForegroundColor Yellow
$commitMsg = "Initial commit - The Drinkers website"
& $gitExe commit -m $commitMsg
Write-Host "✅ Commit ustvarjen: $commitMsg" -ForegroundColor Green
Write-Host ""

# Check for GitHub CLI
Write-Host "🔍 Preverjam GitHub CLI..." -ForegroundColor Yellow
$ghExe = Get-Command gh -ErrorAction SilentlyContinue
if ($ghExe) {
    Write-Host "✅ GitHub CLI najden" -ForegroundColor Green
    Write-Host ""
    
    # Check if authenticated
    Write-Host "🔐 Preverjam avtentikacijo..." -ForegroundColor Yellow
    try {
        $ghStatus = & gh auth status 2>&1
        if ($ghStatus -match "Logged in") {
            Write-Host "✅ Prijavljen v GitHub" -ForegroundColor Green
        } else {
            Write-Host "🔐 Prijavljam se v GitHub..." -ForegroundColor Yellow
            & gh auth login
        }
    } catch {
        Write-Host "🔐 Prijava v GitHub..." -ForegroundColor Yellow
        & gh auth login
    }
    Write-Host ""
    
    # Create repository if it doesn't exist
    Write-Host "📦 Ustvarjam repository na GitHubu..." -ForegroundColor Yellow
    try {
        & gh repo create $repoName --public --source=. --push --remote=origin
        Write-Host "✅ Repository ustvarjen in pushan!" -ForegroundColor Green
        Write-Host ""
        Write-Host "====================================" -ForegroundColor Green
        Write-Host "  ✅ USPEH! 🎉                    " -ForegroundColor Green
        Write-Host "====================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "Tvoj repository:" -ForegroundColor Cyan
        Write-Host "https://github.com/$githubUser/$repoName" -ForegroundColor White
        Write-Host ""
        Write-Host "Naslednji korak - Vercel Deploy:" -ForegroundColor Cyan
        Write-Host "1. Pojdi na: https://vercel.com/new" -ForegroundColor White
        Write-Host "2. Importaj svoj GitHub repository" -ForegroundColor White
        Write-Host "3. Klikni Deploy" -ForegroundColor White
        Write-Host ""
    } catch {
        Write-Host "⚠️  Repository morda že obstaja" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Poskušam pushati na obstoječi repository..." -ForegroundColor Yellow
        & $gitExe push -u origin main
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Push uspešen!" -ForegroundColor Green
            Write-Host ""
            Write-Host "Tvoj repository:" -ForegroundColor Cyan
            Write-Host "https://github.com/$githubUser/$repoName" -ForegroundColor White
        } else {
            Write-Host "❌ Push ni uspel!" -ForegroundColor Red
            Write-Host ""
            Write-Host "Rešitev:" -ForegroundColor Yellow
            Write-Host "1. Ustvari repository ročno na: https://github.com/new" -ForegroundColor White
            Write-Host "2. Ime: $repoName" -ForegroundColor White
            Write-Host "3. Nato ponovno zaženi to skripto" -ForegroundColor White
        }
    }
} else {
    Write-Host "⚠️  GitHub CLI ni nameščen" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Ročni koraki potrebni:" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "1. Ustvari repository na GitHubu:" -ForegroundColor White
    Write-Host "   https://github.com/new" -ForegroundColor Gray
    Write-Host "   Ime: $repoName" -ForegroundColor Gray
    Write-Host "   Izberi Public ali Private" -ForegroundColor Gray
    Write-Host ""
    Write-Host "2. Nato v terminalu:" -ForegroundColor White
    Write-Host "   git push -u origin main" -ForegroundColor Gray
    Write-Host ""
    Write-Host "3. Ko boš pushal, bo tvoj repository:" -ForegroundColor Cyan
    Write-Host "   https://github.com/$githubUser/$repoName" -ForegroundColor White
    Write-Host ""
    
    # Ask if wants to push now
    $pushNow = Read-Host "Ali želiš pushati zdaj? (y/n)"
    if ($pushNow -eq 'y' -or $pushNow -eq 'Y') {
        Write-Host ""
        Write-Host "🚀 Pusham na GitHub..." -ForegroundColor Yellow
        Write-Host "Vnesel boš GitHub credentials..." -ForegroundColor Gray
        & $gitExe push -u origin main
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host ""
            Write-Host "====================================" -ForegroundColor Green
            Write-Host "  ✅ USPEH! 🎉                    " -ForegroundColor Green
            Write-Host "====================================" -ForegroundColor Green
            Write-Host ""
            Write-Host "Tvoj repository:" -ForegroundColor Cyan
            Write-Host "https://github.com/$githubUser/$repoName" -ForegroundColor White
        } else {
            Write-Host ""
            Write-Host "❌ Push ni uspel!" -ForegroundColor Red
            Write-Host ""
            Write-Host "Preveri:" -ForegroundColor Yellow
            Write-Host "1. Ali si prijavljen v GitHub" -ForegroundColor White
            Write-Host "2. Ali repository obstaja" -ForegroundColor White
            Write-Host "3. Poskusi ponovno" -ForegroundColor White
        }
    }
}

Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "  Zaključeno!                    " -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

pause
