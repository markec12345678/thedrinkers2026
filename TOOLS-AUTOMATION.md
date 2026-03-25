# 🚀 THE DRINKERS - AVTOMATIZACIJA

**Lokacija**: `F:\thedrinkers\the\tools-automation\`

---

## 📦 Nameščena Orodja

### 1. **device-shots** 📸

- **Namen**: Generiranje screenshotov za različne naprave
- **Lokacija**: `device-shots/`
- **Tehnologija**: Node.js + Puppeteer

### 2. **webpage-grabber** 🕷️

- **Namen**: Prenos HTML/CSS iz spletnih strani
- **Lokacija**: `webpage-grabber/`
- **Tehnologija**: Python + Requests

---

## 🎯 Samodejna Uporaba

### **1. Generiraj Screenshotove**

#### Opcija A: Batch Datoteka

Ustvari `generate-shots.bat` v glavni mapi:

```batch
@echo off
echo ====================================
echo  DEVICE SHOTS - The Drinkers
echo ====================================
echo.

REM Preveri če Node.js obstaja
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js ni nameščen!
    echo Namesti: https://nodejs.org/
    pause
    exit /b 1
)

echo [1/3] Priprava okolja...
cd device-shots

echo [2/3] Nameščam odvisnosti...
call npm install --silent

echo [3/3] Generiram screenshotove...
echo.

REM Generiraj za ključne naprave
node index.js http://localhost:3000 "iPhone 12, iPhone 13, iPad Pro, Desktop Chrome" fullscreen force-yes

echo.
echo ====================================
echo  KONČANO!
echo ====================================
echo Screenshoti so v: generated-screenshots\
echo.
pause
```

#### Opcija B: PowerShell Skripta

Ustvari `Generate-Screenshots.ps1`:

```powershell
# Generate-Screenshots.ps1
param(
    [string]$Url = "http://localhost:3000",
    [string]$Devices = "iPhone 12, iPhone 13, iPad Pro, Desktop Chrome"
)

Write-Host "====================================" -ForegroundColor Cyan
Write-Host " DEVICE SHOTS - The Drinkers" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
$nodeExists = Get-Command node -ErrorAction SilentlyContinue
if (-not $nodeExists) {
    Write-Host "ERROR: Node.js ni nameščen!" -ForegroundColor Red
    Write-Host "Namesti: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

Write-Host "[1/3] Priprava okolja..." -ForegroundColor Yellow
Set-Location -Path "$PSScriptRoot\device-shots"

Write-Host "[2/3] Nameščam odvisnosti..." -ForegroundColor Yellow
npm install --silent

Write-Host "[3/3] Generiram screenshotove za: $Devices" -ForegroundColor Green
Write-Host ""

node index.js $Url "$Devices" fullscreen force-yes

Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host " KONČANO!" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Screenshoti so v: generated-screenshots\" -ForegroundColor White
Write-Host ""
```

---

### **2. Grabaj Spletne Strani**

#### Opcija A: Python Skripta

Ustvari `grab-inspiration.py` v `webpage-grabber/`:

```python
#!/usr/bin/env python3
"""
Grab multiple websites for inspiration
"""
import requests
import os
import time
from datetime import datetime

# Seznam strani za analizo
INSPIRATION_SITES = [
    ("https://linear.app", "linear_design_system"),
    ("https://stripe.com", "stripe_payment_ui"),
    ("https://vercel.com", "vercel_hosting_landing"),
    ("https://framer.com", "framer_interactions"),
    ("https://apple.com", "apple_product_showcase"),
]

def grab_website(url, folder):
    """Download HTML and CSS from website"""
    print(f"\n{'='*60}")
    print(f"Grabbing: {url}")
    print(f"Folder: {folder}")
    print(f"{'='*60}")

    # Create folder
    if not os.path.exists(folder):
        os.makedirs(folder)

    # Download HTML
    try:
        print("⏳ Downloading HTML...")
        response = requests.get(url, timeout=15, headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
        html = response.text

        with open(f'{folder}/index.html', 'w', encoding='utf-8') as f:
            f.write(html)
        print(f"✓ HTML saved ({len(html)} bytes)")
    except Exception as e:
        print(f"✗ Failed to download HTML: {e}")
        return False

    # Download CSS
    try:
        print("⏳ Downloading CSS...")
        css_url = url.rstrip('/') + '/style.css'
        css_response = requests.get(css_url, timeout=15)

        if css_response.status_code == 200:
            with open(f'{folder}/style.css', 'w', encoding='utf-8') as f:
                f.write(css_response.text)
            print(f"✓ CSS saved ({len(css_response.text)} bytes)")
        else:
            print(f"⚠ No style.css found at {css_url}")
    except Exception as e:
        print(f"⚠ CSS download failed: {e}")

    print(f"\n✓ Done! Files saved in {folder}/")
    return True

def main():
    print("\n" + "="*60)
    print(" WEBPAGE GRABBER - The Drinkers")
    print("="*60)
    print(f"Started: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"Sites to grab: {len(INSPIRATION_SITES)}")

    success_count = 0

    for url, folder in INSPIRATION_SITES:
        if grab_website(url, folder):
            success_count += 1
        time.sleep(2)  # Rate limiting

    print("\n" + "="*60)
    print(f" COMPLETED: {success_count}/{len(INSPIRATION_SITES)} sites")
    print("="*60)

if __name__ == "__main__":
    main()
```

#### Opcija B: Interactive Menu

Ustvari `grab-menu.bat`:

```batch
@echo off
:menu
cls
echo ====================================
echo  WEBPAGE GRABBER - Menu
echo ====================================
echo.
echo [1] Grab Linear.app
echo [2] Grab Stripe.com
echo [3] Grab Vercel.com
echo [4] Custom URL
echo [5] Exit
echo.
set /p choice="Choose option (1-5): "

if "%choice%"=="1" (
    echo Grabbing Linear.app...
    python webpage-grabber\web.py
) else if "%choice%"=="2" (
    echo Grabbing Stripe.com...
    python webpage-grabber\web.py
) else if "%choice%"=="3" (
    echo Grabbing Vercel.com...
    python webpage-grabber\web.py
) else if "%choice%"=="4" (
    python webpage-grabber\web.py
) else if "%choice%"=="5" (
    exit
) else (
    echo Invalid option!
    timeout /t 2
    goto menu
)

pause
goto menu
```

---

## 🎯 Kompletna Avtomatizacija

### **Glavna Skripta: `auto-tools.bat`**

Ustvari v glavni mapi:

```batch
@echo off
:main_menu
cls
echo ====================================
echo  THE DRINKERS - AUTO TOOLS
echo ====================================
echo.
echo [1] Generate Device Screenshots
echo [2] Grab Inspiration Websites
echo [3] Analyze Downloaded Code
echo [4] Open Screenshot Folder
echo [5] Exit
echo.
set /p choice="Choose option (1-5): "

if "%choice%"=="1" goto screenshots
if "%choice%"=="2" goto grab
if "%choice%"=="3" goto analyze
if "%choice%"=="4" goto open_folder
if "%choice%"=="5" goto end

:screenshots
echo.
echo Starting Device Screenshots...
call device-shots\generate-screenshots.bat
goto main_menu

:grab
echo.
echo Starting Webpage Grabber...
python webpage-grabber\grab-inspiration.py
pause
goto main_menu

:analyze
echo.
echo Opening code analysis folder...
explorer webpage-grabber
goto main_menu

:open_folder
echo.
echo Opening screenshots folder...
explorer device-shots\generated-screenshots
goto main_menu

:end
echo Goodbye!
exit
```

---

## 📊 Rezultati

### **Screenshoti**

```
device-shots/generated-screenshots/
├── iPhone 12.jpg
├── iPhone 13.jpg
├── iPad Pro.jpg
└── Desktop Chrome.jpg
```

### **Grabbed Websites**

```
webpage-grabber/
├── linear_design_system/
│   ├── index.html
│   └── style.css
├── stripe_payment_ui/
│   ├── index.html
│   └── style.css
└── vercel_hosting_landing/
    ├── index.html
    └── style.css
```

---

## 💡 Primeri Uporabe

### **1. Pred Launchom**

```bash
# 1. Generiraj screenshotove
npm run screenshots

# 2. Uporabi za social media
# - Instagram: iPhone 12 screenshot
# - LinkedIn: Desktop Chrome screenshot
# - Twitter: iPad Pro screenshot
```

### **2. Dizajn Inspiracija**

```bash
# 1. Grabaj Linear.app
python webpage-grabber\grab-inspiration.py

# 2. Analiziraj CSS
# - Odpri linear_design_system/style.css
# - Kopiraj barvne sheme
# - Uporabi animacije
```

### **3. Konkurenčna Analiza**

```bash
# 1. Grabaj konkurenco
# 2. Primerjaj strukturo
# 3. Identificiraj best practices
# 4. Implementiraj pri sebi
```

---

## ⚙️ Konfiguracija

### **Dodaj NPM Skripte**

Uredi `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "screenshots": "cd device-shots && node index.js http://localhost:3000 \"iPhone 12, iPad Pro, Desktop Chrome\" fullscreen force-yes",
    "grab": "cd webpage-grabber && python grab-inspiration.py",
    "tools": "auto-tools.bat"
  }
}
```

### **Uporaba**

```bash
# Generiraj screenshotove
npm run screenshots

# Grabaj inspiracijo
npm run grab

# Odpri orodja
npm run tools
```

---

## 📚 Dokumentacija

- `device-shots/UPORABA.md` - Detajlna navodila
- `webpage-grabber/UPORABA.md` - Detajlna navodila
- `device-shots/README.md` - Originalna dokumentacija
- `webpage-grabber/README.md` - Originalna dokumentacija

---

**Ustvaril: AI Assistant**  
**Za: The Drinkers - Glow & Explore**  
**Datum: 24. marec 2026**
