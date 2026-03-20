# ====================================
# The Drinkers - Environment Setup Script
# ====================================

Write-Host "====================================" -ForegroundColor Cyan
Write-Host "  The Drinkers - Environment Setup  " -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Check if .env.local already exists
if (Test-Path ".env.local") {
    Write-Host "[WARNING] .env.local already exists!" -ForegroundColor Yellow
    $overwrite = Read-Host "Do you want to overwrite it? (y/n)"
    if ($overwrite -ne 'y' -and $overwrite -ne 'Y') {
        Write-Host "Keeping existing .env.local" -ForegroundColor Green
        Write-Host ""
    } else {
        Copy-Item ".env.example" ".env.local"
        Write-Host "[OK] .env.local created from template" -ForegroundColor Green
    }
} else {
    Copy-Item ".env.example" ".env.local"
    Write-Host "[OK] .env.local created from template" -ForegroundColor Green
}

Write-Host ""
Write-Host "Generating secure NEXTAUTH_SECRET..." -ForegroundColor Yellow

# Generate NextAuth secret
try {
    # Try using openssl if available
    $opensslPath = Get-Command openssl -ErrorAction SilentlyContinue
    if ($opensslPath) {
        $secret = & openssl rand -base64 32
        Write-Host "[OK] Generated with openssl" -ForegroundColor Green
    } else {
        # Fallback to .NET
        $bytes = New-Object byte[] 32
        $rng = [System.Security.Cryptography.RNGCryptoServiceProvider]::Create()
        $rng.GetBytes($bytes)
        $secret = [System.Convert]::ToBase64String($bytes)
        Write-Host "[OK] Generated with .NET" -ForegroundColor Green
    }
} catch {
    # Ultimate fallback
    $secret = [System.Web.Security.Membership]::GeneratePassword(32, 0)
    Write-Host "[OK] Generated with Membership" -ForegroundColor Green
}

Write-Host "Secret: $secret" -ForegroundColor Gray
Write-Host ""

# Update .env.local with generated secret
Write-Host "Updating .env.local with generated secret..." -ForegroundColor Yellow

$envContent = Get-Content ".env.local" -Raw
$envContent = $envContent -replace 'NEXTAUTH_SECRET=.*', "NEXTAUTH_SECRET=$secret"
$envContent | Set-Content ".env.local"

Write-Host "[OK] NEXTAUTH_SECRET added to .env.local" -ForegroundColor Green
Write-Host ""

# Ask for configuration
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "  Quick Configuration              " -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Production URL
$prodUrl = Read-Host "Enter production URL (e.g., https://thedrinkers.si)"
if ($prodUrl) {
    $envContent = Get-Content ".env.local" -Raw
    $envContent = $envContent -replace 'NEXT_PUBLIC_SITE_URL=.*', "NEXT_PUBLIC_SITE_URL=$prodUrl"
    $envContent = $envContent -replace 'NEXTAUTH_URL=.*', "NEXTAUTH_URL=$prodUrl"
    $envContent | Set-Content ".env.local"
    Write-Host "[OK] Production URL configured" -ForegroundColor Green
}

Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "  Setup Complete!                  " -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Review .env.local and add API keys:" -ForegroundColor White
Write-Host "   - Spotify API (optional)" -ForegroundColor Gray
Write-Host "   - YouTube API (optional)" -ForegroundColor Gray
Write-Host "   - Vercel Analytics (optional)" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Start development server:" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "3. For production, add environment variables to Vercel:" -ForegroundColor White
Write-Host "   Project Settings → Environment Variables" -ForegroundColor Gray
Write-Host ""
Write-Host "📖 See ENVIRONMENT_VARIABLES.md for detailed guide" -ForegroundColor Cyan
Write-Host ""
