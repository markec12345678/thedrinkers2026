# 🚀 Quick Deploy Script for The Drinkers Website
# Run this AFTER installing Git

Write-Host "====================================" -ForegroundColor Cyan
Write-Host "  The Drinkers - Deployment Setup  " -ForegroundColor Cyan
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
    exit 1
}

Write-Host ""

# Check if repository is already initialized
if (Test-Path ".git") {
    Write-Host "✓ Git repository already initialized" -ForegroundColor Green
} else {
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    git init
    git branch -M main
    Write-Host "✓ Git repository initialized" -ForegroundColor Green
}

Write-Host ""

# Check for GitHub CLI
Write-Host "Checking for GitHub CLI..." -ForegroundColor Yellow
try {
    $ghVersion = gh --version 2>&1 | Select-Object -First 1
    Write-Host "✓ GitHub CLI found: $ghVersion" -ForegroundColor Green
    
    # Ask if user wants to create GitHub repo
    Write-Host ""
    $createRepo = Read-Host "Create GitHub repository? (y/n)"
    if ($createRepo -eq 'y' -or $createRepo -eq 'Y') {
        Write-Host "Creating GitHub repository..." -ForegroundColor Yellow
        gh repo create the-drinkers-site --public --source=. --push
        Write-Host "✓ GitHub repository created!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Next steps:" -ForegroundColor Cyan
        Write-Host "1. Go to https://vercel.com/new" -ForegroundColor White
        Write-Host "2. Import your GitHub repository" -ForegroundColor White
        Write-Host "3. Deploy!" -ForegroundColor White
    }
} catch {
    Write-Host "✗ GitHub CLI not found" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Manual setup required:" -ForegroundColor Cyan
    Write-Host "1. Create a new repository on GitHub" -ForegroundColor White
    Write-Host "2. Run these commands:" -ForegroundColor White
    Write-Host ""
    Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/the-drinkers-site.git" -ForegroundColor Gray
    Write-Host "   git add ." -ForegroundColor Gray
    Write-Host "   git commit -m 'Initial commit'" -ForegroundColor Gray
    Write-Host "   git push -u origin main" -ForegroundColor Gray
    Write-Host ""
}

Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "  Setup Complete! 🎸               " -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "For detailed instructions, see DEPLOYMENT.md" -ForegroundColor Yellow
Write-Host ""
