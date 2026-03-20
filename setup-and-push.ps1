# ====================================
# The Drinkers - Complete GitHub Setup & Push
# ====================================

Write-Host "====================================" -ForegroundColor Cyan
Write-Host "  GitHub Setup & Push - The Drinkers" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Find Git installation
Write-Host "Searching for Git installation..." -ForegroundColor Yellow

$gitPaths = @(
    "C:\Program Files\Git\bin\git.exe",
    "C:\Program Files (x86)\Git\bin\git.exe",
    "$env:ProgramFiles\Git\bin\git.exe",
    "${env:ProgramFiles(x86)}\Git\bin\git.exe",
    "$env:LOCALAPPDATA\Programs\Git\bin\git.exe"
)

$gitExe = $null
foreach ($path in $gitPaths) {
    if (Test-Path $path) {
        $gitExe = $path
        Write-Host "✓ Git found at: $gitExe" -ForegroundColor Green
        break
    }
}

if (-not $gitExe) {
    Write-Host ""
    Write-Host "✗ Git NOT found on your system!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Git first:" -ForegroundColor Cyan
    Write-Host "1. Go to: https://git-scm.com/download/win" -ForegroundColor White
    Write-Host "2. Download and install Git" -ForegroundColor White
    Write-Host "3. Restart this script" -ForegroundColor White
    Write-Host ""
    Write-Host "OR use winget (Windows 11):" -ForegroundColor Yellow
    Write-Host "   winget install Git.Git" -ForegroundColor Gray
    Write-Host ""
    pause
    exit 1
}

# Set Git path
$gitDir = Split-Path (Split-Path $gitExe)
$env:Path = "$gitDir\cmd;$gitDir\bin;" + $env:Path

Write-Host ""
Write-Host "Git version: $(& $gitExe --version)" -ForegroundColor Green
Write-Host ""

# Check if already a Git repository
if (Test-Path ".git") {
    Write-Host "✓ Git repository already initialized" -ForegroundColor Green
} else {
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    & $gitExe init
    & $gitExe branch -M main
    Write-Host "✓ Git repository initialized" -ForegroundColor Green
}

Write-Host ""

# Check if remote is already configured
$remoteUrl = & $gitExe remote get-url origin 2>$null
if ($remoteUrl) {
    Write-Host "✓ Remote 'origin' already configured: $remoteUrl" -ForegroundColor Green
} else {
    Write-Host "Configuring GitHub remote..." -ForegroundColor Yellow
    Write-Host ""
    
    Write-Host "Enter your GitHub username:" -ForegroundColor Cyan
    $githubUser = Read-Host "Username"
    
    Write-Host ""
    Write-Host "Enter repository name (or press Enter for 'the-drinkers-site'):" -ForegroundColor Cyan
    $repoName = Read-Host "Repository name"
    if (-not $repoName) {
        $repoName = "the-drinkers-site"
    }
    
    Write-Host ""
    Write-Host "Choose repository visibility:" -ForegroundColor Cyan
    Write-Host "1) Public (recommended)"
    Write-Host "2) Private"
    $visibility = Read-Host "Choice (1 or 2)"
    
    $repoUrl = "https://github.com/$githubUser/$repoName.git"
    
    Write-Host ""
    Write-Host "Adding remote repository..." -ForegroundColor Yellow
    & $gitExe remote add origin $repoUrl
    Write-Host "✓ Remote added: $repoUrl" -ForegroundColor Green
}

Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "  Preparing to Push              " -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Check what will be committed
Write-Host "Checking files to commit..." -ForegroundColor Yellow
& $gitExe status --short

Write-Host ""
Write-Host "Add all files? (y/n)" -ForegroundColor Cyan
$addFiles = Read-Host "Choice"

if ($addFiles -eq 'y' -or $addFiles -eq 'Y') {
    Write-Host ""
    Write-Host "Adding all files..." -ForegroundColor Yellow
    & $gitExe add .
    
    Write-Host ""
    Write-Host "Enter commit message (or press Enter for default):" -ForegroundColor Cyan
    $commitMsg = Read-Host "Message"
    if (-not $commitMsg) {
        $commitMsg = "Initial commit - The Drinkers website"
    }
    
    Write-Host ""
    Write-Host "Committing..." -ForegroundColor Yellow
    & $gitExe commit -m $commitMsg
    
    Write-Host ""
    Write-Host "Push to GitHub? (y/n)" -ForegroundColor Cyan
    $doPush = Read-Host "Choice"
    
    if ($doPush -eq 'y' -or $doPush -eq 'Y') {
        Write-Host ""
        Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
        Write-Host "You'll be asked for GitHub credentials..." -ForegroundColor Gray
        & $gitExe push -u origin main
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host ""
            Write-Host "====================================" -ForegroundColor Green
            Write-Host "  SUCCESS! Pushed to GitHub! 🎉   " -ForegroundColor Green
            Write-Host "====================================" -ForegroundColor Green
            Write-Host ""
            Write-Host "Your repository:" -ForegroundColor Cyan
            Write-Host "https://github.com/$githubUser/$repoName" -ForegroundColor White
            Write-Host ""
            Write-Host "Next step - Deploy to Vercel:" -ForegroundColor Cyan
            Write-Host "1. Go to: https://vercel.com/new" -ForegroundColor White
            Write-Host "2. Import your GitHub repository" -ForegroundColor White
            Write-Host "3. Click Deploy" -ForegroundColor White
            Write-Host ""
        } else {
            Write-Host ""
            Write-Host "✗ Push failed!" -ForegroundColor Red
            Write-Host ""
            Write-Host "Possible solutions:" -ForegroundColor Yellow
            Write-Host "1. Make sure repository exists on GitHub" -ForegroundColor White
            Write-Host "2. Check your GitHub credentials" -ForegroundColor White
            Write-Host "3. Use GitHub CLI: gh auth login" -ForegroundColor White
            Write-Host ""
            Write-Host "Manual push commands:" -ForegroundColor Cyan
            Write-Host "  git remote -v  (check remote)" -ForegroundColor Gray
            Write-Host "  git push -u origin main  (try again)" -ForegroundColor Gray
            Write-Host ""
        }
    } else {
        Write-Host ""
        Write-Host "Skipping push. You can push later with:" -ForegroundColor Yellow
        Write-Host "  git push -u origin main" -ForegroundColor Gray
        Write-Host ""
    }
} else {
    Write-Host ""
    Write-Host "Skipping commit. You can add files later with:" -ForegroundColor Yellow
    Write-Host "  git add ." -ForegroundColor Gray
    Write-Host "  git commit -m 'your message'" -ForegroundColor Gray
    Write-Host ""
}

Write-Host "====================================" -ForegroundColor Cyan
Write-Host "  Done!                          " -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

pause
