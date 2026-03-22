# ========================================
#   Install & Configure pnpm for Current User
#   No Administrator Required!
# ========================================

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   pnpm Installation & Configuration" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if npm is available
Write-Host "[1/4] Checking npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "  npm found: v$npmVersion" -ForegroundColor Green
} catch {
    Write-Host "  ERROR: npm not found!" -ForegroundColor Red
    Write-Host "  Please install Node.js first" -ForegroundColor Yellow
    exit 1
}

# Check if pnpm is installed
Write-Host ""
Write-Host "[2/4] Checking pnpm..." -ForegroundColor Yellow
$pnpmPath = "$env:APPDATA\npm\pnpm.cmd"
if (Test-Path $pnpmPath) {
    Write-Host "  pnpm already installed" -ForegroundColor Green
    Write-Host "  Location: $pnpmPath" -ForegroundColor Gray
} else {
    Write-Host "  Installing pnpm..." -ForegroundColor Yellow
    npm install -g pnpm
    Write-Host "  pnpm installed!" -ForegroundColor Green
}

# Add to user PATH
Write-Host ""
Write-Host "[3/4] Adding pnpm to user PATH..." -ForegroundColor Yellow

try {
    # Get current user PATH
    $userPath = [Environment]::GetEnvironmentVariable("Path", "User")
    
    # Check if npm global is already in PATH
    $npmGlobalPath = "$env:APPDATA\npm"
    if ($userPath -notlike "*$npmGlobalPath*") {
        # Add to PATH
        $newPath = $userPath + ";" + $npmGlobalPath
        [Environment]::SetEnvironmentVariable("Path", $newPath, "User")
        Write-Host "  Added to user PATH!" -ForegroundColor Green
        Write-Host "  Path: $npmGlobalPath" -ForegroundColor Gray
    } else {
        Write-Host "  Already in user PATH" -ForegroundColor Green
    }
} catch {
    Write-Host "  Could not modify PATH" -ForegroundColor Yellow
    Write-Host "  You can still use pnpm with full path" -ForegroundColor Gray
}

# Test pnpm
Write-Host ""
Write-Host "[4/4] Testing pnpm..." -ForegroundColor Yellow

try {
    # Try with full path first
    & $pnpmPath --version
    Write-Host "  pnpm works!" -ForegroundColor Green
    Write-Host ""
    Write-Host "  IMPORTANT:" -ForegroundColor Yellow
    Write-Host "  Close and reopen your terminal for PATH changes to take effect" -ForegroundColor Gray
    Write-Host ""
    Write-Host "  Or use full path:" -ForegroundColor Gray
    Write-Host "  & '$pnpmPath' install" -ForegroundColor DarkGray
    Write-Host ""
} catch {
    Write-Host "  Test failed, but pnpm is installed" -ForegroundColor Yellow
    Write-Host "  Use: & '$pnpmPath' to run pnpm" -ForegroundColor Gray
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   DONE!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. Close this terminal" -ForegroundColor White
Write-Host "  2. Open new terminal" -ForegroundColor White
Write-Host "  3. Run: pnpm --version" -ForegroundColor White
Write-Host ""
