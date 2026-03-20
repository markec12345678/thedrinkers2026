# ====================================
# Setup Git PATH and Start Windsurf
# ====================================

Write-Host "====================================" -ForegroundColor Cyan
Write-Host "  Setting up Git PATH              " -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Git path
$gitPath = "F:\OllamaModels\Git\cmd"

# Add to current session PATH
$env:Path = "$gitPath;$env:Path"

# Verify Git
Write-Host "Testing Git..." -ForegroundColor Yellow
$gitVersion = & "$gitPath\git.exe" --version
Write-Host "✅ $gitVersion" -ForegroundColor Green
Write-Host ""

# Save to user PATH permanently
Write-Host "Saving to user PATH..." -ForegroundColor Yellow
[Environment]::SetEnvironmentVariable("Path", $env:Path, "User")
Write-Host "✅ PATH saved!" -ForegroundColor Green
Write-Host ""

Write-Host "====================================" -ForegroundColor Green
Write-Host "  Git je pripravljen!               " -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Green
Write-Host ""
Write-Host "Zdaj lahko:" -ForegroundColor Cyan
Write-Host "1. Restartaj Windsurf" -ForegroundColor White
Write-Host "2. Zaženi: git --version" -ForegroundColor White
Write-Host ""
Write-Host "Pritisni Enter za nadaljevanje..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
