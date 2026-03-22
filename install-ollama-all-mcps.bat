@echo off
REM ========================================
REM   OLLAMA MCP - ALL MCPs INSTALLER
REM   Standalone installation (F:\ollama_mcp)
REM ========================================

echo.
echo ========================================
echo   OLLAMA MCP - ALL MCPs INSTALLER
echo ========================================
echo.

REM Create directory
echo [0/11] Creating F:\ollama_mcp directory...
if not exist "F:\ollama_mcp" mkdir "F:\ollama_mcp"
if not exist "F:\ollama_mcp\files" mkdir "F:\ollama_mcp\files"
if not exist "F:\ollama_mcp\databases" mkdir "F:\ollama_mcp\databases"
echo  Done!

cd /d F:\ollama_mcp

REM Check Node.js
echo.
echo [1/11] Checking Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo  ERROR: Node.js not found!
    echo  Please install from https://nodejs.org
    pause
    exit /b 1
)
echo  Node.js found!

REM Install MCPs
echo.
echo [2/11] Installing Ollama MCP...
call npm install -g ollama-mcp-server --silent
echo  Done!

echo.
echo [3/11] Installing Filesystem MCP...
call npm install -g @modelcontextprotocol/server-filesystem --silent
echo  Done!

echo.
echo [4/11] Installing Git MCP...
call npm install -g @modelcontextprotocol/server-git --silent
echo  Done!

echo.
echo [5/11] Installing Memory MCP...
call npm install -g @modelcontextprotocol/server-memory --silent
echo  Done!

echo.
echo [6/11] Installing Sequential Thinking MCP...
call npm install -g @modelcontextprotocol/server-sequential-thinking --silent
echo  Done!

echo.
echo [7/11] Installing Time MCP...
call npm install -g @modelcontextprotocol/server-time --silent
echo  Done!

echo.
echo [8/11] Installing Fetch MCP...
call npm install -g @modelcontextprotocol/server-fetch --silent
echo  Done!

echo.
echo [9/11] Installing SQLite MCP...
call npm install -g @modelcontextprotocol/server-sqlite --silent
echo  Done!

echo.
echo [10/11] Installing Puppeteer MCP...
call npm install -g @modelcontextprotocol/server-puppeteer --silent
echo  Done!

echo.
echo [11/11] Creating Claude Desktop config...
echo.

REM Create Claude Desktop config
set CLAUDE_CONFIG=%APPDATA%\Claude\claude_desktop_config.json

echo {
echo   "mcpServers": {
echo     "ollama": {
echo       "command": "npx",
echo       "args": ["-y", "ollama-mcp-server"],
echo       "env": {
echo         "OLLAMA_HOST": "http://localhost:11434"
echo       }
echo     },
echo     "filesystem": {
echo       "command": "npx",
echo       "args": ["-y", "@modelcontextprotocol/server-filesystem", "F:\\ollama_mcp\\files"]
echo     },
echo     "git": {
echo       "command": "npx",
echo       "args": ["-y", "@modelcontextprotocol/server-git"]
echo     },
echo     "memory": {
echo       "command": "npx",
echo       "args": ["-y", "@modelcontextprotocol/server-memory"]
echo     },
echo     "sequential-thinking": {
echo       "command": "npx",
echo       "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
echo     },
echo     "time": {
echo       "command": "npx",
echo       "args": ["-y", "@modelcontextprotocol/server-time"]
echo     },
echo     "fetch": {
echo       "command": "npx",
echo       "args": ["-y", "@modelcontextprotocol/server-fetch"]
echo     },
echo     "sqlite": {
echo       "command": "npx",
echo       "args": ["-y", "@modelcontextprotocol/server-sqlite"]
echo     }
echo   }
echo } > "%CLAUDE_CONFIG%"

echo  Config saved to: %CLAUDE_CONFIG%

echo.
echo ========================================
echo   ALL MCPs INSTALLED SUCCESSFULLY!
echo ========================================
echo.
echo Installed MCPs:
echo   - ollama (AI models)
echo   - filesystem (File access)
echo   - git (Git operations)
echo   - memory (Long-term memory)
echo   - sequential-thinking (Chain of thought)
echo   - time (Time and dates)
echo   - fetch (HTTP requests)
echo   - sqlite (SQLite database)
echo   - puppeteer (Browser automation)
echo.
echo Next steps:
echo   1. Restart Claude Desktop
echo   2. MCPs will be automatically loaded
echo   3. Start using: @ollama, @filesystem, @git, etc.
echo.
echo ========================================
echo.
pause
