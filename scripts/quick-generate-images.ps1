# The Drinkers - Quick Image Generator
# Avtomatsko ustvari mape in odpre Bing Image Creator s prompti

Write-Host ""
Write-Host "========================================================" -ForegroundColor Magenta
Write-Host "   THE DRINKERS - Quick Image Generator               " -ForegroundColor Magenta
Write-Host "========================================================" -ForegroundColor Magenta
Write-Host ""

# Create directories
Write-Host "Creating directories..." -ForegroundColor Cyan
$directories = @(
    "public\images\social\instagram\stories",
    "public\images\social\instagram\reels",
    "public\images\social\facebook\posts",
    "public\images\social\twitter\posts",
    "public\images\social\all-platforms"
)

foreach ($dir in $directories) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
        Write-Host "  ✓ Created: $dir" -ForegroundColor Green
    } else {
        Write-Host "  ✓ Exists: $dir" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "========================================================" -ForegroundColor Magenta
Write-Host "   NAVODILA ZA GENERIRANJE                            " -ForegroundColor Magenta
Write-Host "========================================================" -ForegroundColor Magenta
Write-Host ""

Write-Host "1. OTPRI BING IMAGE CREATOR:" -ForegroundColor Yellow
Write-Host "   https://www.bing.com/images/create" -ForegroundColor Cyan
Write-Host ""

Write-Host "2. KOPIRAJ PROMPTE (enega za drugim):" -ForegroundColor Yellow
Write-Host ""

# Prompts
$prompts = @(
    @{
        Day = "1"
        Name = "teaser-day1.jpg"
        Prompt = "Dark moody Instagram story vertical 9:16, crimson red spotlight on black background, electric guitar silhouette, stage fog, mysterious atmosphere, rock band aesthetic, professional photography, The Drinkers band"
        Path = "public\images\social\instagram\stories\"
    },
    @{
        Day = "2"
        Name = "coming-soon-day2.jpg"
        Prompt = "Facebook post square 1:1, crimson red to black gradient background, COMING SOON bold typography in center, professional social media graphic, rock band The Drinkers launch announcement"
        Path = "public\images\social\facebook\posts\"
    },
    @{
        Day = "5"
        Name = "poll-day5.jpg"
        Prompt = "Instagram story vertical 9:16, music album covers collage faded background, crimson red and black color scheme, space in center for poll sticker, rock band aesthetic"
        Path = "public\images\social\instagram\stories\"
    },
    @{
        Day = "6"
        Name = "countdown-day6.jpg"
        Prompt = "Facebook post square 1:1, large number 3 in crimson red metallic texture, DAYS TO LAUNCH text, confetti celebration elements, The Drinkers logo, exciting atmosphere"
        Path = "public\images\social\facebook\posts\"
    },
    @{
        Day = "7a"
        Name = "launch-instagram.jpg"
        Prompt = "Instagram post square 1:1, TOMORROW 18:00 bold typography center, crimson red explosion background, The Drinkers band logo, dramatic stage lighting, launch announcement"
        Path = "public\images\social\all-platforms\"
    },
    @{
        Day = "7b"
        Name = "launch-story.jpg"
        Prompt = "Instagram story vertical 9:16, TOMORROW 18:00 large text, crimson red explosion background, The Drinkers logo, countdown timer space at bottom"
        Path = "public\images\social\all-platforms\"
    }
)

$i = 1
foreach ($p in $prompts) {
    Write-Host "─────────────────────────────────────────────────────" -ForegroundColor DarkGray
    Write-Host "  SLIKA $i/$($prompts.Count) - Dan $($p.Day): $($p.Name)" -ForegroundColor Magenta
    Write-Host "  Shrani v: $($p.Path)" -ForegroundColor Gray
    Write-Host ""
    Write-Host "  PROMPT (kopiraj v Bing):" -ForegroundColor Yellow
    Write-Host "  $($p.Prompt)" -ForegroundColor White
    Write-Host ""
    $i++
}

Write-Host "========================================================" -ForegroundColor Magenta
Write-Host ""
Write-Host "3. POSTOPEK:" -ForegroundColor Yellow
Write-Host "   a) Odpri https://www.bing.com/images/create" -ForegroundColor White
Write-Host "   b) Prijavi se z Microsoft accountom (brezplačno)" -ForegroundColor White
Write-Host "   c) Kopiraj prvi prompt in prilepi v Bing" -ForegroundColor White
Write-Host "   d) Klikni 'Create' in počakaj 10-30 sekund" -ForegroundColor White
Write-Host "   e) Izberi najboljšo sliko in jo downloadaj" -ForegroundColor White
Write-Host "   f) Shrani v pravo mapo (glej zgoraj)" -ForegroundColor White
Write-Host "   g) Ponovi za vse slike" -ForegroundColor White
Write-Host ""
Write-Host "4. KO SO VSE SLIKE GENERIRANE:" -ForegroundColor Yellow
Write-Host "   - Odpri SOCIAL_MEDIA_POSTING_SCHEDULE.md" -ForegroundColor White
Write-Host "   - Sledi navodilom za objavljanje" -ForegroundColor White
Write-Host ""

Write-Host "========================================================" -ForegroundColor Magenta
Write-Host ""
Write-Host "Želiš odpreti Bing Image Creator zdaj? (Y/N)" -ForegroundColor Yellow
$answer = Read-Host

if ($answer -eq "Y" -or $answer -eq "y") {
    Start-Process "https://www.bing.com/images/create"
    Write-Host ""
    Write-Host "✓ Bing Image Creator odprt v brskalniku!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Začni s kopiranjem prvega prompta (Dan 1) zgoraj." -ForegroundColor Cyan
    Write-Host ""
}

Write-Host "Good luck! 🤘🍺" -ForegroundColor Magenta
Write-Host ""
