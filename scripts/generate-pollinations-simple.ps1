# The Drinkers - Social Media Image Generator
# Uporaba Pollinations.ai (Brezplačno, Brez Login)

$OutputBase = "public/images/social"

# Create directories
Write-Host "Creating directories..." -ForegroundColor Cyan
$directories = @(
    "$OutputBase/instagram/stories",
    "$OutputBase/facebook/posts",
    "$OutputBase/all-platforms"
)

foreach ($dir in $directories) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
        Write-Host "Created: $dir" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "========================================================" -ForegroundColor Magenta
Write-Host "   THE DRINKERS - Image Generator (Pollinations.ai)   " -ForegroundColor Magenta
Write-Host "========================================================" -ForegroundColor Magenta
Write-Host ""

# Simple URL encode function
function Get-EncodedPrompt($prompt) {
    return [System.Uri]::EscapeDataString($prompt)
}

# Image 1 - Day 1: Instagram Story Teaser
Write-Host "=== Day 1: Instagram Story Teaser ===" -ForegroundColor Magenta
$prompt1 = "Dark moody Instagram story teaser rock band crimson red spotlight guitar silhouette mysterious atmosphere vertical"
$url1 = "https://image.pollinations.ai/prompt/$prompt1?width=1080&height=1920&seed=42&model=flux&nologo=true"
Write-Host "Downloading Day 1..." -ForegroundColor Yellow
try {
    Invoke-WebRequest -Uri $url1 -OutFile "$OutputBase/instagram/stories/teaser-day1.jpg" -UseBasicParsing
    Write-Host "✓ Saved: teaser-day1.jpg" -ForegroundColor Green
} catch {
    Write-Host "✗ Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Image 2 - Day 2: Facebook Post
Write-Host ""
Write-Host "=== Day 2: Facebook Post Coming Soon ===" -ForegroundColor Magenta
$prompt2 = "Facebook post graphic crimson red black gradient COMING SOON typography professional square"
$url2 = "https://image.pollinations.ai/prompt/$prompt2?width=1080&height=1080&seed=43&model=flux&nologo=true"
Write-Host "Downloading Day 2..." -ForegroundColor Yellow
try {
    Invoke-WebRequest -Uri $url2 -OutFile "$OutputBase/facebook/posts/coming-soon-day2.jpg" -UseBasicParsing
    Write-Host "✓ Saved: coming-soon-day2.jpg" -ForegroundColor Green
} catch {
    Write-Host "✗ Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Image 3 - Day 5: Poll Background
Write-Host ""
Write-Host "=== Day 5: Instagram Story Poll Background ===" -ForegroundColor Magenta
$prompt3 = "Instagram story background music poll album covers collage crimson red black vertical"
$url3 = "https://image.pollinations.ai/prompt/$prompt3?width=1080&height=1920&seed=44&model=flux&nologo=true"
Write-Host "Downloading Day 5..." -ForegroundColor Yellow
try {
    Invoke-WebRequest -Uri $url3 -OutFile "$OutputBase/instagram/stories/poll-day5.jpg" -UseBasicParsing
    Write-Host "✓ Saved: poll-day5.jpg" -ForegroundColor Green
} catch {
    Write-Host "✗ Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Image 4 - Day 6: Countdown
Write-Host ""
Write-Host "=== Day 6: Facebook Countdown 3 Days ===" -ForegroundColor Magenta
$prompt4 = "Facebook countdown post large number 3 crimson red confetti celebration square"
$url4 = "https://image.pollinations.ai/prompt/$prompt4?width=1080&height=1080&seed=45&model=flux&nologo=true"
Write-Host "Downloading Day 6..." -ForegroundColor Yellow
try {
    Invoke-WebRequest -Uri $url4 -OutFile "$OutputBase/facebook/posts/countdown-3days-day6.jpg" -UseBasicParsing
    Write-Host "✓ Saved: countdown-3days-day6.jpg" -ForegroundColor Green
} catch {
    Write-Host "✗ Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Image 5 - Day 7: Launch Instagram Post
Write-Host ""
Write-Host "=== Day 7: Launch Announcement Instagram Post ===" -ForegroundColor Magenta
$prompt5 = "Launch announcement Instagram post TOMORROW 18:00 typography crimson red explosion square"
$url5 = "https://image.pollinations.ai/prompt/$prompt5?width=1080&height=1080&seed=46&model=flux&nologo=true"
Write-Host "Downloading Day 7 Instagram..." -ForegroundColor Yellow
try {
    Invoke-WebRequest -Uri $url5 -OutFile "$OutputBase/all-platforms/launch-tomorrow-day7-instagram.jpg" -UseBasicParsing
    Write-Host "✓ Saved: launch-tomorrow-day7-instagram.jpg" -ForegroundColor Green
} catch {
    Write-Host "✗ Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Image 6 - Day 7: Launch Story
Write-Host ""
Write-Host "=== Day 7: Launch Announcement Story ===" -ForegroundColor Magenta
$prompt6 = "Launch announcement Instagram story TOMORROW 18:00 text crimson red vertical"
$url6 = "https://image.pollinations.ai/prompt/$prompt6?width=1080&height=1920&seed=47&model=flux&nologo=true"
Write-Host "Downloading Day 7 Story..." -ForegroundColor Yellow
try {
    Invoke-WebRequest -Uri $url6 -OutFile "$OutputBase/all-platforms/launch-tomorrow-day7-story.jpg" -UseBasicParsing
    Write-Host "✓ Saved: launch-tomorrow-day7-story.jpg" -ForegroundColor Green
} catch {
    Write-Host "✗ Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================================" -ForegroundColor Magenta
Write-Host "   Generation Complete!                                  " -ForegroundColor Magenta
Write-Host "========================================================" -ForegroundColor Magenta
Write-Host ""
Write-Host "Check output in: $OutputBase" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. Review images" -ForegroundColor White
Write-Host "  2. Add text overlays in Canva if needed" -ForegroundColor White
Write-Host "  3. Upload to Meta Business Suite" -ForegroundColor White
Write-Host "  4. Schedule posts" -ForegroundColor White
Write-Host ""
