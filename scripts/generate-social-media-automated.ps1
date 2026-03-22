<#
.SYNOPSIS
    The Drinkers - Automated Social Media Asset Generator
    Generira vse AI vizuale za 7-delno launch kampanjo

.DESCRIPTION
    Ta skripta avtomatizira generiranje vseh social media assetov z uporabo inference.sh AI orodij.
    Podpira generiranje slik in videov za Instagram, Facebook, Twitter/X in TikTok.

.EXAMPLE
    .\generate-social-media-automated.ps1
    
.EXAMPLE
    .\generate-social-media-automated.ps1 -SkipVideos
    
.EXAMPLE
    .\generate-social-media-automated.ps1 -Day 1,3,7
#>

[CmdletBinding()]
param(
    [switch]$SkipVideos,
    [switch]$SkipImages,
    [int[]]$Day = @(1,2,3,4,5,6,7),
    [switch]$DryRun,
    [switch]$Force
)

# Configuration
$OutputBase = "public/images/social"
$LogFile = "logs/social-media-generation-$(Get-Date -Format 'yyyyMMdd-HHmmss').log"
$ErrorActionPreference = "Continue"

# Colors for output
$Colors = @{
    Success = "Green"
    Info    = "Cyan"
    Warning = "Yellow"
    Error   = "Red"
    Header  = "Magenta"
}

# Helper Functions
function Write-ColorOutput {
    param(
        [string]$Message,
        [string]$Color = $Colors.Info,
        [string]$Prefix = ""
    )
    $timestamp = Get-Date -Format "HH:mm:ss"
    Write-Host "[$timestamp] $Prefix" -NoNewline -ForegroundColor Gray
    Write-Host " $Message" -ForegroundColor $Color
}

function Write-Success {
    param([string]$Message)
    Write-ColorOutput $Message -Color $Colors.Success -Prefix "[OK]"
}

function Write-ErrorMsg {
    param([string]$Message)
    Write-ColorOutput $Message -Color $Colors.Error -Prefix "[ERR]"
}

function Write-WarningMsg {
    param([string]$Message)
    Write-ColorOutput $Message -Color $Colors.Warning -Prefix "[WARN]"
}

function Write-Header {
    param([string]$Message)
    Write-Host ""
    Write-Host ("=" * 60) -ForegroundColor $Colors.Header
    Write-Host "  $Message" -ForegroundColor $Colors.Header -BackgroundColor Black
    Write-Host ("=" * 60) -ForegroundColor $Colors.Header
    Write-Host ""
}

function Test-InfshInstalled {
    try {
        $null = infsh --version 2>&1
        return $true
    } catch {
        return $false
    }
}

function Test-InfshLoggedIn {
    try {
        $balance = infsh account balance 2>&1
        return $balance -notlike "*error*" -and $balance -notlike "*not logged in*"
    } catch {
        return $false
    }
}

function Get-InfshBalance {
    try {
        $balance = infsh account balance 2>&1
        return $balance
    } catch {
        return "Unknown"
    }
}

function New-DirectoryIfNotExists {
    param([string]$Path)
    if (-not (Test-Path $Path)) {
        New-Item -ItemType Directory -Path $Path | Out-Null
        Write-ColorOutput "Created: $Path" -Color $Colors.Info
    }
}

function Invoke-AIGenerate {
    param(
        [string]$Model,
        [string]$Prompt,
        [string]$AspectRatio,
        [string]$OutputPath,
        [int]$Duration = 0,
        [string]$Format = "jpg"
    )
    
    if ($DryRun) {
        Write-ColorOutput "[DRY RUN] Would generate: $OutputPath" -Color $Colors.Warning
        return $true
    }
    
    Write-ColorOutput "Generating: $OutputPath" -Color $Colors.Info
    
    try {
        $inputParams = @{
            prompt = $Prompt
            aspect_ratio = $AspectRatio
            output_format = $Format
            quality = "high"
        }
        
        if ($Duration -gt 0) {
            $inputParams.duration = $Duration
            $inputParams.fps = 30
        }
        
        $jsonInput = $inputParams | ConvertTo-Json -Compress
        
        $arguments = @(
            "app", "run", $Model,
            "--input", $jsonInput,
            "--output", $OutputPath
        )
        
        & infsh @arguments 2>&1 | Tee-Object -FilePath $LogFile -Append
        
        if (Test-Path $OutputPath) {
            Write-Success "Generated: $OutputPath"
            return $true
        } else {
            Write-ErrorMsg "Failed to generate: $OutputPath"
            return $false
        }
    } catch {
        Write-ErrorMsg "Error generating $OutputPath`: $($_.Exception.Message)"
        return $false
    }
}

# Main Functions
function Initialize-Directories {
    Write-Header "Initializing Directories"
    
    $directories = @(
        "$OutputBase/instagram/stories",
        "$OutputBase/instagram/reels",
        "$OutputBase/facebook/posts",
        "$OutputBase/twitter/posts",
        "$OutputBase/all-platforms",
        "$OutputBase/source-files",
        "logs"
    )
    
    foreach ($dir in $directories) {
        New-DirectoryIfNotExists $dir
    }
    
    Write-Success "Directories ready"
}

function Test-Prerequisites {
    Write-Header "Testing Prerequisites"
    
    # Check infsh CLI
    if (-not (Test-InfshInstalled)) {
        Write-ErrorMsg "inference.sh CLI not found!"
        Write-Host ""
        Write-Host "Install with:" -ForegroundColor Yellow
        Write-Host "  curl -fsSL https://cli.inference.sh | sh" -ForegroundColor Cyan
        Write-Host "  infsh login" -ForegroundColor Cyan
        Write-Host ""
        exit 1
    }
    Write-Success "inference.sh CLI installed"
    
    # Check login
    if (-not (Test-InfshLoggedIn)) {
        Write-ErrorMsg "Not logged in to inference.sh!"
        Write-Host ""
        Write-Host "Login with:" -ForegroundColor Yellow
        Write-Host "  infsh login" -ForegroundColor Cyan
        Write-Host ""
        exit 1
    }
    Write-Success "Logged in to inference.sh"
    
    # Show balance
    $balance = Get-InfshBalance
    Write-ColorOutput "Account balance: $balance" -Color $Colors.Info
}

function Generate-Day1-InstagramStory {
    if (1 -notin $Day) { return }
    
    Write-Header "Day 1: Instagram Story Teaser"
    
    $prompt = "Dark moody Instagram story teaser for rock band The Drinkers, crimson red spotlight on black background, electric guitar silhouette, stage fog, mysterious atmosphere, vertical 9:16 format, authentic rock aesthetic, raw energy, text space at top, professional but gritty, Slovenian rock band"
    
    Invoke-AIGenerate `
        -Model "bytedance/seedream-4-5" `
        -Prompt $prompt `
        -AspectRatio "9:16" `
        -OutputPath "$OutputBase/instagram/stories/teaser-day1.jpg" `
        -Format "jpg"
}

function Generate-Day2-FacebookPost {
    if (2 -notin $Day) { return }
    
    Write-Header "Day 2: Facebook Post Announcement"
    
    $prompt = "Facebook post graphic for The Drinkers website launch announcement, crimson red to black gradient background, band logo placeholder in center, COMING SOON bold typography, professional social media design, square 1:1 format, clean modern rock aesthetic, Slovenian band"
    
    Invoke-AIGenerate `
        -Model "falai/flux-2-klein-lora" `
        -Prompt $prompt `
        -AspectRatio "1:1" `
        -OutputPath "$OutputBase/facebook/posts/coming-soon-day2.jpg" `
        -Format "jpg"
}

function Generate-Day3-InstagramReel {
    if (3 -notin $Day) { return }
    
    Write-Header "Day 3: Instagram Reel Video"
    
    $prompt = "15 second vertical rock band teaser video for Instagram Reel, sequence: black screen text 30 LET, extreme close-up electric guitar strings vibrating with crimson red lighting, drummer hands hitting snare drum, singer hand grabbing vintage microphone, beer mug slamming on wooden table, The Drinkers band logo reveal with crimson red glow, authentic concert footage aesthetic, raw energy, fast-paced cuts, vertical 9:16 format, 30fps, Slovenian rock band"
    
    Invoke-AIGenerate `
        -Model "google/veo-3-1" `
        -Prompt $prompt `
        -AspectRatio "9:16" `
        -OutputPath "$OutputBase/instagram/reels/teaser-day3.mp4" `
        -Duration 15 `
        -Format "mp4"
}

function Generate-Day4-TwitterAnimation {
    if (4 -notin $Day) { return }
    
    Write-Header "Day 4: Twitter/X Animation"
    
    $prompt = "3 second seamless looping animated GIF for Twitter/X, The Drinkers band logo in center with pulsing crimson red glow effect, black background, subtle smoke particles floating, minimal rock aesthetic, 16:9 horizontal format, professional social media banner animation, smooth loop"
    
    Invoke-AIGenerate `
        -Model "google/veo-3-1" `
        -Prompt $prompt `
        -AspectRatio "16:9" `
        -OutputPath "$OutputBase/twitter/posts/logo-pulse-day4.mp4" `
        -Duration 3 `
        -Format "mp4"
}

function Generate-Day5-InstagramStoryPoll {
    if (5 -notin $Day) { return }
    
    Write-Header "Day 5: Instagram Story Poll Background"
    
    $prompt = "Instagram story background for music poll, The Drinkers album covers collage faded in background, crimson red and black color scheme, rock band aesthetic, vertical 9:16 format, clear space in center for Instagram poll sticker, subtle guitar and beer mug icons, Slovenian rock band branding"
    
    Invoke-AIGenerate `
        -Model "bytedance/seedream-4-5" `
        -Prompt $prompt `
        -AspectRatio "9:16" `
        -OutputPath "$OutputBase/instagram/stories/poll-day5.jpg" `
        -Format "jpg"
}

function Generate-Day6-FacebookCountdown {
    if (6 -notin $Day) { return }
    
    Write-Header "Day 6: Facebook Countdown Post"
    
    $prompt = "Facebook countdown post graphic, large number 3 in crimson red with metallic texture, The Drinkers logo at top, DAYS TO LAUNCH text below number, confetti and celebration elements in corners, black background, square 1:1 format, bold typography, exciting atmosphere, Slovenian rock band branding"
    
    Invoke-AIGenerate `
        -Model "google/gemini-3-pro-image-preview" `
        -Prompt $prompt `
        -AspectRatio "1:1" `
        -OutputPath "$OutputBase/facebook/posts/countdown-3days-day6.jpg" `
        -Format "jpg"
}

function Generate-Day7-LaunchAnnouncement {
    if (7 -notin $Day) { return }
    
    Write-Header "Day 7: Launch Announcement (All Platforms)"
    
    # Instagram Post
    Write-ColorOutput "Instagram Post..." -Color $Colors.Info
    Invoke-AIGenerate `
        -Model "bytedance/seedream-4-5" `
        -Prompt "Launch announcement Instagram post, TOMORROW 18:00 bold typography in center, The Drinkers logo prominent, crimson red explosion background, dramatic stage lighting, square 1:1 format, professional social media design, Slovenian rock band, urgent exciting atmosphere" `
        -AspectRatio "1:1" `
        -OutputPath "$OutputBase/all-platforms/launch-tomorrow-day7-instagram.jpg" `
        -Format "jpg"
    
    # Instagram Story
    Write-ColorOutput "Instagram Story..." -Color $Colors.Info
    Invoke-AIGenerate `
        -Model "falai/flux-dev-lora" `
        -Prompt "Launch announcement Instagram story, TOMORROW 18:00 large text, The Drinkers logo, crimson red explosion background, vertical 9:16 format, countdown timer space, link sticker space at bottom, professional design" `
        -AspectRatio "9:16" `
        -OutputPath "$OutputBase/all-platforms/launch-tomorrow-day7-story.jpg" `
        -Format "jpg"
    
    # Facebook Post
    Write-ColorOutput "Facebook Post..." -Color $Colors.Info
    Invoke-AIGenerate `
        -Model "google/gemini-3-pro-image-preview" `
        -Prompt "Facebook launch announcement post, JUTRI OB 18:00 Slovenian text, The Drinkers logo, crimson red and black color scheme, square 1:1 format, professional social media graphic, rock band aesthetic" `
        -AspectRatio "1:1" `
        -OutputPath "$OutputBase/all-platforms/launch-tomorrow-day7-facebook.jpg" `
        -Format "jpg"
    
    # Twitter Header
    Write-ColorOutput "Twitter Header..." -Color $Colors.Info
    Invoke-AIGenerate `
        -Model "falai/flux-2-klein-lora" `
        -Prompt "Twitter/X header launch announcement, TOMORROW 18:00 bold text, The Drinkers logo, crimson red explosion, 16:9 horizontal format, professional social media banner" `
        -AspectRatio "16:9" `
        -OutputPath "$OutputBase/all-platforms/launch-tomorrow-day7-twitter.jpg" `
        -Format "jpg"
    
    # TikTok Video
    Write-ColorOutput "TikTok Video..." -Color $Colors.Info
    Invoke-AIGenerate `
        -Model "google/veo-3-1" `
        -Prompt "10 second hype video for TikTok, fast text animations: JUTRI, OB 18:00, thedrinkers.si, The Drinkers logo, SET YOUR ALARMS, crimson red explosion transitions, vertical 9:16 format, energetic, Slovenian rock band" `
        -AspectRatio "9:16" `
        -OutputPath "$OutputBase/all-platforms/launch-tomorrow-day7-tiktok.mp4" `
        -Duration 10 `
        -Format "mp4"
}

function Show-Summary {
    Write-Header "Generation Summary"
    
    $generatedFiles = Get-ChildItem -Path $OutputBase -Recurse -File | 
        Where-Object { $_.LastWriteTime -gt (Get-Date).AddMinutes(-30) }
    
    if ($generatedFiles.Count -eq 0) {
        Write-WarningMsg "No new files generated"
    } else {
        Write-Success "Generated $($generatedFiles.Count) files:"
        $generatedFiles | ForEach-Object {
            Write-Host "  - $($_.FullName)" -ForegroundColor Green
        }
    }
    
    Write-Host ""
    Write-Host "Next Steps:" -ForegroundColor Cyan
    Write-Host "  1. Add text overlays in Canva/Photoshop" -ForegroundColor White
    Write-Host "  2. Upload to Meta Business Suite" -ForegroundColor White
    Write-Host "  3. Schedule posts according to timetable" -ForegroundColor White
    Write-Host "  4. Monitor engagement" -ForegroundColor White
    Write-Host ""
}

# Main Execution
try {
    Write-Host ""
    Write-Host "========================================================" -ForegroundColor Magenta
    Write-Host "   THE DRINKERS - Social Media Asset Generator 2026    " -ForegroundColor Magenta
    Write-Host "========================================================" -ForegroundColor Magenta
    Write-Host ""
    
    Initialize-Directories
    Test-Prerequisites
    
    if (-not $SkipImages) {
        Generate-Day1-InstagramStory
        Generate-Day2-FacebookPost
        Generate-Day5-InstagramStoryPoll
        Generate-Day6-FacebookCountdown
        Generate-Day7-LaunchAnnouncement
    }
    
    if (-not $SkipVideos) {
        Generate-Day3-InstagramReel
        Generate-Day4-TwitterAnimation
        Generate-Day7-LaunchAnnouncement # Includes TikTok video
    }
    
    Show-Summary
    
} catch {
    Write-ErrorMsg "Fatal error: $($_.Exception.Message)"
    exit 1
}
