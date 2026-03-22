# Ollama MCP Namestitvena Skripta
# Run: powershell -ExecutionPolicy Bypass -File F:\thedrinkers\the\install-ollama-mcp.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  OLLAMA MCP NAMESTITEV" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check if Node.js is installed
Write-Host "[1/5] Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "  Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "  Node.js not found! Please install from https://nodejs.org" -ForegroundColor Red
    exit 1
}

# Step 2: Check if Ollama is running
Write-Host "[2/5] Checking Ollama..." -ForegroundColor Yellow
try {
    $ollamaVersion = & "C:\Users\admin\AppData\Local\Programs\Ollama\ollama.exe" --version
    Write-Host "  Ollama found: $ollamaVersion" -ForegroundColor Green
} catch {
    Write-Host "  Ollama not found! Please install from https://ollama.com" -ForegroundColor Red
    exit 1
}

# Step 3: Install ollama-mcp-server
Write-Host "[3/5] Installing ollama-mcp-server..." -ForegroundColor Yellow
try {
    npm install -g ollama-mcp-server 2>&1 | Write-Host
    Write-Host "  Installation complete!" -ForegroundColor Green
} catch {
    Write-Host "  Installation failed! Trying alternative..." -ForegroundColor Yellow
    
    # Try installing mcp-remote instead
    Write-Host "  Installing mcp-remote as fallback..." -ForegroundColor Yellow
    npm install -g mcp-remote 2>&1 | Write-Host
}

# Step 4: Create MCP config
Write-Host "[4/5] Creating MCP config..." -ForegroundColor Yellow
$mcpConfig = @{
    mcpServers = @{
        ollama = @{
            command = "npx"
            args = @("-y", "ollama-mcp-server")
            env = @{
                OLLAMA_HOST = "http://localhost:11434"
            }
        }
    }
} | ConvertTo-Json -Depth 10

$configPath = "$env:APPDATA\Claude\claude_desktop_config.json"
$mcpConfig | Out-File -FilePath $configPath -Encoding utf8 -Force
Write-Host "  Config saved to: $configPath" -ForegroundColor Green

# Step 5: Test connection
Write-Host "[5/5] Testing Ollama connection..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:11434/api/tags" -TimeoutSec 5 -ErrorAction Stop
    if ($response.StatusCode -eq 200) {
        Write-Host "  Ollama is running and accessible!" -ForegroundColor Green
        $models = $response.Content | ConvertFrom-Json
        Write-Host "  Available models:" -ForegroundColor Cyan
        foreach ($model in $models.models) {
            Write-Host "    - $($model.name)" -ForegroundColor White
        }
    }
} catch {
    Write-Host "  Cannot connect to Ollama! Make sure 'ollama serve' is running" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  NAMESTITEV KONČANA!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "NEXT STEPS:" -ForegroundColor Yellow
Write-Host "1. Restart Claude Desktop" -ForegroundColor White
Write-Host "2. Ollama MCP bo samodejno naložen" -ForegroundColor White
Write-Host "3. Uporabljaj: @ollama generate model=llama2 prompt='...'" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
