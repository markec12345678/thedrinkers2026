# Ollama Auto-Fix Script
# Run as Administrator for best results

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  OLLAMA AUTO-FIX SCRIPT" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Kill existing Ollama processes
Write-Host "[1/5] Stopping Ollama processes..." -ForegroundColor Yellow
Get-Process ollama -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 2
Write-Host "  Done!" -ForegroundColor Green

# Step 2: Clean temp files
Write-Host "[2/5] Cleaning temporary files..." -ForegroundColor Yellow
$tempFiles = Get-ChildItem -Path $env:TEMP -Filter "ollama*" -ErrorAction SilentlyContinue
if ($tempFiles) {
    $tempFiles | Remove-Item -Force -Recurse
    Write-Host "  Cleaned $($tempFiles.Count) temp files" -ForegroundColor Green
} else {
    Write-Host "  No temp files found" -ForegroundColor Gray
}

# Step 3: Check installation
Write-Host "[3/5] Checking Ollama installation..." -ForegroundColor Yellow
$ollamaPath = "C:\Users\admin\AppData\Local\Programs\Ollama\ollama.exe"
if (Test-Path $ollamaPath) {
    Write-Host "  Found at: $ollamaPath" -ForegroundColor Green
} else {
    Write-Host "  Ollama not found! Download from: https://ollama.com" -ForegroundColor Red
    Write-Host "  Press any key to open download page..." -ForegroundColor Yellow
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    Start-Process "https://ollama.com/download/OllamaSetup.exe"
    exit
}

# Step 4: Check port 11434
Write-Host "[4/5] Checking port 11434..." -ForegroundColor Yellow
$port = Get-NetTCPConnection -LocalPort 11434 -ErrorAction SilentlyContinue
if ($port) {
    Write-Host "  Port 11434 is in use by PID $($port.OwningProcess)" -ForegroundColor Yellow
    Write-Host "  Killing process..." -ForegroundColor Yellow
    Stop-Process -Id $port.OwningProcess -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 2
} else {
    Write-Host "  Port 11434 is free" -ForegroundColor Green
}

# Step 5: Start Ollama server
Write-Host "[5/5] Starting Ollama server..." -ForegroundColor Yellow
Start-Process -FilePath $ollamaPath -ArgumentList "serve" -WindowStyle Normal
Start-Sleep -Seconds 5

# Test connection
Write-Host ""
Write-Host "Testing connection..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "http://localhost:11434/api/tags" -TimeoutSec 10 -ErrorAction Stop
    if ($response.StatusCode -eq 200) {
        Write-Host "  SUCCESS! Ollama is running!" -ForegroundColor Green
        Write-Host "  Models:" -ForegroundColor Cyan
        $models = $response.Content | ConvertFrom-Json
        foreach ($model in $models.models) {
            Write-Host "    - $($model.name)" -ForegroundColor White
        }
    }
} catch {
    Write-Host "  Connection test failed" -ForegroundColor Red
    Write-Host "  Try manually: ollama serve" -ForegroundColor Yellow
}

# Open browser
Write-Host ""
Write-Host "Opening Ollama UI..." -ForegroundColor Cyan
Start-Process "http://localhost:11434"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  OLLAMA IS NOW RUNNING!" -ForegroundColor Green
Write-Host "  UI: http://localhost:11434" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
