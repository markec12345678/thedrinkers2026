# ====================================
# The Drinkers - GitHub Push Script
# ====================================

Write-Host "====================================" -ForegroundColor Cyan
Write-Host "  Pushing to GitHub                " -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Check if Git is installed
Write-Host "Checking for Git..." -ForegroundColor Yellow
try {
    $gitVersion = git --version 2>&1
    Write-Host "✓ Git found: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Git not found!" -ForegroundColor Red
    Write-Host "Please install Git from: https://git-scm.com/downloads" -ForegroundColor Yellow
    pause
    exit 1
}

Write-Host ""

# Check if already a Git repository
if (Test-Path ".git") {
    Write-Host "✓ Git repository already initialized" -ForegroundColor Green
} else {
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    git init
    git branch -M main
    Write-Host "✓ Git repository initialized" -ForegroundColor Green
}

Write-Host ""

# Check if remote is already configured
$remoteUrl = git remote get-url origin 2>$null
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
    Write-Host "1) Public (recommended for open source)"
    Write-Host "2) Private"
    $visibility = Read-Host "Choice (1 or 2)"
    
    if ($visibility -eq "1") {
        $repoVisibility = "public"
    } else {
        $repoVisibility = "private"
    }
    
    Write-Host ""
    Write-Host "Creating GitHub repository..." -ForegroundColor Yellow
    
    # Try to create with GitHub CLI if available
    try {
        $ghVersion = gh --version 2>&1 | Select-Object -First 1
        Write-Host "✓ GitHub CLI found: $ghVersion" -ForegroundColor Green
        
        gh repo create $repoName --$repoVisibility --source=. --push
        Write-Host "✓ GitHub repository created and pushed!" -ForegroundColor Green
    } catch {
        Write-Host "✗ GitHub CLI not found" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Manual steps required:" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "1. Go to https://github.com/new" -ForegroundColor White
        Write-Host "2. Repository name: $repoName" -ForegroundColor White
        Write-Host "3. Choose $repoVisibility" -ForegroundColor White
        Write-Host "4. Click 'Create repository'" -ForegroundColor White
        Write-Host "5. Then run these commands:" -ForegroundColor White
        Write-Host ""
        Write-Host "   git remote add origin https://github.com/$githubUser/$repoName.git" -ForegroundColor Gray
        Write-Host "   git add ." -ForegroundColor Gray
        Write-Host "   git commit -m 'Initial commit - The Drinkers website'" -ForegroundColor Gray
        Write-Host "   git push -u origin main" -ForegroundColor Gray
        Write-Host ""
    }
}

Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "  Next Steps                       " -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

if (-not $remoteUrl) {
    Write-Host "If you created the repo manually on GitHub:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. Add all files:" -ForegroundColor White
    Write-Host "   git add ." -ForegroundColor Gray
    Write-Host ""
    Write-Host "2. Create first commit:" -ForegroundColor White
    Write-Host "   git commit -m 'Initial commit - The Drinkers website'" -ForegroundColor Gray
    Write-Host ""
    Write-Host "3. Push to GitHub:" -ForegroundColor White
    Write-Host "   git push -u origin main" -ForegroundColor Gray
    Write-Host ""
}

Write-Host "After pushing to GitHub:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Deploy to Vercel:" -ForegroundColor White
Write-Host "   - Go to https://vercel.com/new" -ForegroundColor Gray
Write-Host "   - Import your GitHub repository" -ForegroundColor Gray
Write-Host "   - Click Deploy" -ForegroundColor Gray
Write-Host ""
Write-Host "2. View your site:" -ForegroundColor White
Write-Host "   - GitHub: https://github.com/YOUR_USERNAME/$repoName" -ForegroundColor Gray
Write-Host "   - Vercel: https://$repoName.vercel.app" -ForegroundColor Gray
Write-Host ""

pause
