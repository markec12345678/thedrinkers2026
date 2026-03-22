# The Drinkers - Social Media Image Generator
# Uporaba Pollinations.ai (Brezplačno, Brez Login)
# https://image.pollinations.ai

$OutputBase = "public/images/social"

# Create directories
Write-Host "Creating directories..." -ForegroundColor Cyan
$directories = @(
    "$OutputBase/instagram/stories",
    "$OutputBase/instagram/reels",
    "$OutputBase/facebook/posts",
    "$OutputBase/twitter/posts",
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

# Image generation URLs
$images = @(
    @{
        Day = 1
        Name = "teaser-day1.jpg"
        Path = "$OutputBase/instagram/stories/teaser-day1.jpg"
        Prompt = "Dark moody Instagram story teaser rock band The Drinkers crimson red spotlight guitar silhouette stage fog mysterious atmosphere vertical format authentic rock aesthetic"
        Width = 1080
        Height = 1920
        Seed = 42
    },
    @{
        Day = 2
        Name = "coming-soon-day2.jpg"
        Path = "$OutputBase/facebook/posts/coming-soon-day2.jpg"
        Prompt = "Facebook post graphic crimson red black gradient COMING SOON bold typography The Drinkers website launch professional social media design square format"
        Width = 1080
        Height = 1080
        Seed = 43
    },
    @{
        Day = 5
        Name = "poll-day5.jpg"
        Path = "$OutputBase/instagram/stories/poll-day5.jpg"
        Prompt = "Instagram story background music poll album covers collage faded crimson red black color scheme space for poll sticker center vertical format The Drinkers"
        Width = 1080
        Height = 1920
        Seed = 44
    },
    @{
        Day = 6
        Name = "countdown-3days-day6.jpg"
        Path = "$OutputBase/facebook/posts/countdown-3days-day6.jpg"
        Prompt = "Facebook countdown post graphic large number 3 crimson red metallic texture The Drinkers logo DAYS TO LAUNCH text confetti celebration elements square format"
        Width = 1080
        Height = 1080
        Seed = 45
    },
    @{
        Day = 7
        Name = "launch-tomorrow-day7-instagram.jpg"
        Path = "$OutputBase/all-platforms/launch-tomorrow-day7-instagram.jpg"
        Prompt = "Launch announcement Instagram post TOMORROW 18:00 bold typography The Drinkers logo crimson red explosion background dramatic stage lighting square format"
        Width = 1080
        Height = 1080
        Seed = 46
    },
    @{
        Day = 7
        Name = "launch-tomorrow-day7-story.jpg"
        Path = "$OutputBase/all-platforms/launch-tomorrow-day7-story.jpg"
        Prompt = "Launch announcement Instagram story TOMORROW 18:00 large text The Drinkers logo crimson red explosion background vertical format countdown timer space"
        Width = 1080
        Height = 1920
        Seed = 47
    }
)

# Generate images
foreach ($image in $images) {
    Write-Host ""
    Write-Host "=== Day $($image.Day): $($image.Name) ===" -ForegroundColor Magenta
    Write-Host "Prompt: $($image.Prompt)" -ForegroundColor Gray
    Write-Host "Size: $($image.Width)x$($image.Height)" -ForegroundColor Gray
    
    # Build URL
    $encodedPrompt = [System.Web.HttpUtility]::UrlEncode($image.Prompt)
    $url = "https://image.pollinations.ai/prompt/$encodedPrompt?width=$($image.Width)&height=$($image.Height)&seed=$($image.Seed)&model=flux&nologo=true"
    
    Write-Host "URL: $url" -ForegroundColor Cyan
    
    try {
        # Download image
        Write-Host "Downloading..." -ForegroundColor Yellow
        
        Invoke-WebRequest -Uri $url -OutFile $image.Path -UseBasicParsing
        
        if (Test-Path $image.Path) {
            $size = (Get-Item $image.Path).Length / 1KB
            Write-Host "✓ Saved: $($image.Path) ($([math]::Round($size, 2)) KB)" -ForegroundColor Green
        } else {
            Write-Host "✗ Failed to save image" -ForegroundColor Red
        }
    } catch {
        Write-Host "✗ Error: $($_.Exception.Message)" -ForegroundColor Red
        
        # Try alternative without encoded prompt
        Write-Host "Trying alternative method..." -ForegroundColor Yellow
        try {
            $altUrl = "https://image.pollinations.ai/prompt/$($image.Prompt)?width=$($image.Width)&height=$($image.Height)&seed=$($image.Seed)&model=flux"
            Invoke-WebRequest -Uri $altUrl -OutFile $image.Path -UseBasicParsing
            
            if (Test-Path $image.Path) {
                Write-Host "✓ Saved (alternative): $($image.Path)" -ForegroundColor Green
            }
        } catch {
            Write-Host "✗ Alternative also failed" -ForegroundColor Red
        }
    }
}

Write-Host ""
Write-Host "========================================================" -ForegroundColor Magenta
Write-Host "   Generation Complete!                                  " -ForegroundColor Magenta
Write-Host "========================================================" -ForegroundColor Magenta
Write-Host ""
Write-Host "Output directory: $OutputBase" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. Review generated images" -ForegroundColor White
Write-Host "  2. Add text overlays in Canva/Photoshop if needed" -ForegroundColor White
Write-Host "  3. Upload to Meta Business Suite" -ForegroundColor White
Write-Host "  4. Schedule posts according to SOCIAL_MEDIA_POSTING_SCHEDULE.md" -ForegroundColor White
Write-Host ""
Write-Host "For videos, use: https://inference.sh or https://runwayml.com" -ForegroundColor Cyan
Write-Host ""
