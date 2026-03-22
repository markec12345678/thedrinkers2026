# The Drinkers - Social Media Asset Generator (API Version)
# Uporaba inference.sh API neposredno preko curl

param(
    [switch]$SkipVideos,
    [switch]$SkipImages,
    [int[]]$Day = @(1,2,3,4,5,6,7),
    [switch]$DryRun
)

# API Key
$API_KEY = "1nfsh-5n2ewp39yxpxbvzt4gydp19hbe"
$OutputBase = "public/images/social"

# Colors
function Write-Header {
    param([string]$Message)
    Write-Host ""
    Write-Host ("=" * 60) -ForegroundColor Magenta
    Write-Host "  $Message" -ForegroundColor Magenta -BackgroundColor Black
    Write-Host ("=" * 60) -ForegroundColor Magenta
}

function Write-Success {
    param([string]$Message)
    Write-Host "[OK] $Message" -ForegroundColor Green
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERR] $Message" -ForegroundColor Red
}

# Create directories
Write-Header "Creating Directories"
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
        Write-Success "Created: $dir"
    }
}

# Function to generate image via inference.sh API
function Generate-Image {
    param(
        [string]$Model,
        [string]$Prompt,
        [string]$AspectRatio,
        [string]$OutputPath
    )
    
    Write-Host "Generating: $OutputPath" -ForegroundColor Cyan
    
    if ($DryRun) {
        Write-Host "[DRY RUN] Would generate: $OutputPath" -ForegroundColor Yellow
        return
    }
    
    $body = @{
        prompt = $Prompt
        aspect_ratio = $AspectRatio
        output_format = "jpg"
    } | ConvertTo-Json
    
    $headers = @{
        "Authorization" = "Bearer $API_KEY"
        "Content-Type" = "application/json"
    }
    
    try {
        # Use inference.sh API endpoint
        $response = Invoke-RestMethod -Uri "https://api.inference.sh/v1/images/generations" `
            -Method Post `
            -Headers $headers `
            -Body $body `
            -ContentType "application/json"
        
        if ($response.data -and $response.data[0].url) {
            $imageUrl = $response.data[0].url
            Write-Host "Downloading from: $imageUrl" -ForegroundColor Gray
            
            # Download image
            Invoke-WebRequest -Uri $imageUrl -OutFile $OutputPath
            Write-Success "Saved: $OutputPath"
        } else {
            Write-Error "Failed to generate image"
        }
    } catch {
        Write-Error "Error: $($_.Exception.Message)"
    }
}

# Function to generate video via inference.sh API
function Generate-Video {
    param(
        [string]$Model,
        [string]$Prompt,
        [string]$AspectRatio,
        [int]$Duration,
        [string]$OutputPath
    )
    
    Write-Host "Generating video: $OutputPath" -ForegroundColor Cyan
    
    if ($DryRun) {
        Write-Host "[DRY RUN] Would generate: $OutputPath" -ForegroundColor Yellow
        return
    }
    
    Write-Host "Note: Video generation requires premium API access" -ForegroundColor Yellow
    Write-Host "Please use web interface: https://inference.sh" -ForegroundColor Yellow
}

# Generate assets
if (1 -in $Day -and -not $SkipImages) {
    Write-Header "Day 1: Instagram Story Teaser"
    Generate-Image `
        -Model "bytedance/seedream-4-5" `
        -Prompt "Dark moody Instagram story teaser for rock band The Drinkers, crimson red spotlight on black background, electric guitar silhouette, stage fog, mysterious atmosphere, vertical 9:16 format, authentic rock aesthetic" `
        -AspectRatio "9:16" `
        -OutputPath "$OutputBase/instagram/stories/teaser-day1.jpg"
}

if (2 -in $Day -and -not $SkipImages) {
    Write-Header "Day 2: Facebook Post Announcement"
    Generate-Image `
        -Model "falai/flux-2-klein-lora" `
        -Prompt "Facebook post graphic for The Drinkers website launch announcement, crimson red to black gradient background, band logo placeholder in center, COMING SOON bold typography, professional social media design, square 1:1 format" `
        -AspectRatio "1:1" `
        -OutputPath "$OutputBase/facebook/posts/coming-soon-day2.jpg"
}

if (3 -in $Day -and -not $SkipVideos) {
    Write-Header "Day 3: Instagram Reel Video"
    Generate-Video `
        -Model "google/veo-3-1" `
        -Prompt "15 second vertical rock band teaser video, guitar close-up, drummer, singer, beer mug slam, logo reveal, crimson red lighting, vertical 9:16" `
        -AspectRatio "9:16" `
        -Duration 15 `
        -OutputPath "$OutputBase/instagram/reels/teaser-day3.mp4"
}

if (4 -in $Day -and -not $SkipVideos) {
    Write-Header "Day 4: Twitter/X Animation"
    Generate-Video `
        -Model "google/veo-3-1" `
        -Prompt "3 second logo animation loop, The Drinkers logo pulsing crimson red glow, black background, 16:9 horizontal" `
        -AspectRatio "16:9" `
        -Duration 3 `
        -OutputPath "$OutputBase/twitter/posts/logo-pulse-day4.mp4"
}

if (5 -in $Day -and -not $SkipImages) {
    Write-Header "Day 5: Instagram Story Poll Background"
    Generate-Image `
        -Model "bytedance/seedream-4-5" `
        -Prompt "Instagram story background for music poll, album covers collage faded, crimson red and black, space for poll sticker center, vertical 9:16" `
        -AspectRatio "9:16" `
        -OutputPath "$OutputBase/instagram/stories/poll-day5.jpg"
}

if (6 -in $Day -and -not $SkipImages) {
    Write-Header "Day 6: Facebook Countdown Post"
    Generate-Image `
        -Model "google/gemini-3-pro-image-preview" `
        -Prompt "Facebook countdown post graphic, large number 3 in crimson red, The Drinkers logo, DAYS TO LAUNCH text, confetti, square 1:1" `
        -AspectRatio "1:1" `
        -OutputPath "$OutputBase/facebook/posts/countdown-3days-day6.jpg"
}

if (7 -in $Day -and -not $SkipImages) {
    Write-Header "Day 7: Launch Announcement"
    
    Generate-Image `
        -Model "bytedance/seedream-4-5" `
        -Prompt "Launch announcement Instagram post, TOMORROW 18:00 bold typography, The Drinkers logo, crimson red explosion background, square 1:1" `
        -AspectRatio "1:1" `
        -OutputPath "$OutputBase/all-platforms/launch-tomorrow-day7-instagram.jpg"
    
    Generate-Image `
        -Model "falai/flux-dev-lora" `
        -Prompt "Launch announcement Instagram story, TOMORROW 18:00 large text, The Drinkers logo, crimson red explosion, vertical 9:16" `
        -AspectRatio "9:16" `
        -OutputPath "$OutputBase/all-platforms/launch-tomorrow-day7-story.jpg"
}

Write-Header "Summary"
Write-Host "Check output in: $OutputBase" -ForegroundColor Cyan
Write-Host ""
Write-Host "Note: If API calls failed, use web interface at:" -ForegroundColor Yellow
Write-Host "https://inference.sh" -ForegroundColor Cyan
Write-Host ""
