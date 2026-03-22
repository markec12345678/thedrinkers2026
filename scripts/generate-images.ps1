# The Drinkers - Social Media Image Generator
# Uporaba inference.sh API za generiranje slik

$API_KEY = "1nfsh-5n2ewp39yxpxbvzt4gydp19hbe"
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

# Function to generate image via inference.sh
function Generate-Image {
    param(
        [string]$AppName,
        [string]$Prompt,
        [string]$AspectRatio,
        [string]$OutputPath
    )
    
    Write-Host ""
    Write-Host "Generating: $OutputPath" -ForegroundColor Cyan
    Write-Host "Model: $AppName" -ForegroundColor Gray
    Write-Host "Prompt: $Prompt" -ForegroundColor Gray
    
    $body = @{
        prompt = $Prompt
        aspect_ratio = $AspectRatio
    } | ConvertTo-Json -Compress
    
    $headers = @{
        "Authorization" = "Bearer $API_KEY"
        "Content-Type" = "application/json"
    }
    
    try {
        # Call inference.sh app run endpoint
        $uri = "https://api.inference.sh/v1/apps/$AppName/run"
        
        $response = Invoke-RestMethod -Uri $uri `
            -Method Post `
            -Headers $headers `
            -Body $body `
            -ContentType "application/json"
        
        Write-Host "Response: $($response | ConvertTo-Json)" -ForegroundColor Gray
        
        # Extract image URL and download
        if ($response.result -and $response.result.image_url) {
            $imageUrl = $response.result.image_url
            Write-Host "Downloading from: $imageUrl" -ForegroundColor Green
            
            Invoke-WebRequest -Uri $imageUrl -OutFile $OutputPath
            Write-Host "Saved: $OutputPath" -ForegroundColor Green
        } elseif ($response.data -and $response.data[0].url) {
            $imageUrl = $response.data[0].url
            Write-Host "Downloading from: $imageUrl" -ForegroundColor Green
            
            Invoke-WebRequest -Uri $imageUrl -OutFile $OutputPath
            Write-Host "Saved: $OutputPath" -ForegroundColor Green
        } else {
            Write-Host "Check response above for image URL" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
        Write-Host "Response: $($_.ErrorDetails.Message)" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "========================================================" -ForegroundColor Magenta
Write-Host "   THE DRINKERS - Social Media Image Generator         " -ForegroundColor Magenta
Write-Host "========================================================" -ForegroundColor Magenta
Write-Host ""
Write-Host "API Key: $API_KEY" -ForegroundColor Gray
Write-Host ""

# Day 1 - Instagram Story
Write-Host "=== Day 1: Instagram Story Teaser ===" -ForegroundColor Magenta
Generate-Image `
    -AppName "bytedance/seedream-4-5" `
    -Prompt "Dark moody Instagram story teaser for rock band The Drinkers, crimson red spotlight on black background, electric guitar silhouette, stage fog, mysterious atmosphere, vertical 9:16 format, authentic rock aesthetic" `
    -AspectRatio "9:16" `
    -OutputPath "$OutputBase/instagram/stories/teaser-day1.jpg"

# Day 2 - Facebook Post
Write-Host ""
Write-Host "=== Day 2: Facebook Post Announcement ===" -ForegroundColor Magenta
Generate-Image `
    -AppName "falai/flux-2-klein-lora" `
    -Prompt "Facebook post graphic for The Drinkers website launch announcement, crimson red to black gradient background, band logo placeholder in center, COMING SOON bold typography, professional social media design, square 1:1 format" `
    -AspectRatio "1:1" `
    -OutputPath "$OutputBase/facebook/posts/coming-soon-day2.jpg"

# Day 5 - Instagram Story Poll
Write-Host ""
Write-Host "=== Day 5: Instagram Story Poll Background ===" -ForegroundColor Magenta
Generate-Image `
    -AppName "bytedance/seedream-4-5" `
    -Prompt "Instagram story background for music poll, album covers collage faded, crimson red and black color scheme, space for poll sticker in center, vertical 9:16 format" `
    -AspectRatio "9:16" `
    -OutputPath "$OutputBase/instagram/stories/poll-day5.jpg"

# Day 6 - Facebook Countdown
Write-Host ""
Write-Host "=== Day 6: Facebook Countdown Post ===" -ForegroundColor Magenta
Generate-Image `
    -AppName "google/gemini-3-pro-image-preview" `
    -Prompt "Facebook countdown post graphic, large number 3 in crimson red with metallic texture, The Drinkers logo at top, DAYS TO LAUNCH text, confetti and celebration elements, square 1:1 format" `
    -AspectRatio "1:1" `
    -OutputPath "$OutputBase/facebook/posts/countdown-3days-day6.jpg"

# Day 7 - Launch Announcement (Instagram)
Write-Host ""
Write-Host "=== Day 7: Launch Announcement Instagram ===" -ForegroundColor Magenta
Generate-Image `
    -AppName "bytedance/seedream-4-5" `
    -Prompt "Launch announcement Instagram post, TOMORROW 18:00 bold typography in center, The Drinkers logo prominent, crimson red explosion background, dramatic stage lighting, square 1:1 format" `
    -AspectRatio "1:1" `
    -OutputPath "$OutputBase/all-platforms/launch-tomorrow-day7-instagram.jpg"

# Day 7 - Launch Announcement (Story)
Write-Host ""
Write-Host "=== Day 7: Launch Announcement Story ===" -ForegroundColor Magenta
Generate-Image `
    -AppName "falai/flux-dev-lora" `
    -Prompt "Launch announcement Instagram story, TOMORROW 18:00 large text, The Drinkers logo, crimson red explosion background, vertical 9:16 format" `
    -AspectRatio "9:16" `
    -OutputPath "$OutputBase/all-platforms/launch-tomorrow-day7-story.jpg"

Write-Host ""
Write-Host "========================================================" -ForegroundColor Magenta
Write-Host "   Generation Complete!                                  " -ForegroundColor Magenta
Write-Host "========================================================" -ForegroundColor Magenta
Write-Host ""
Write-Host "Output directory: $OutputBase" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. Add text overlays in Canva or Photoshop" -ForegroundColor White
Write-Host "  2. Upload to Meta Business Suite" -ForegroundColor White
Write-Host "  3. Schedule posts" -ForegroundColor White
Write-Host ""
