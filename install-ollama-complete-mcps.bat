@echo off
REM ========================================
REM   OLLAMA MCP - COMPLETE ALL MCPs INSTALLER
REM   Standalone installation (F:\ollama_mcp)
REM   ALL AVAILABLE MCPs INCLUDED
REM ========================================

echo.
echo ========================================
echo   OLLAMA MCP - COMPLETE INSTALLER
echo   Installing ALL available MCPs
echo ========================================
echo.

REM Create directory
echo [0/25] Creating F:\ollama_mcp directory...
if not exist "F:\ollama_mcp" mkdir "F:\ollama_mcp"
if not exist "F:\ollama_mcp\files" mkdir "F:\ollama_mcp\files"
if not exist "F:\ollama_mcp\databases" mkdir "F:\ollama_mcp\databases"
if not exist "F:\ollama_mcp\projects" mkdir "F:\ollama_mcp\projects"
echo  Done!

cd /d F:\ollama_mcp

REM Check Node.js
echo.
echo [1/25] Checking Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo  ERROR: Node.js not found!
    echo  Please install from https://nodejs.org
    pause
    exit /b 1
)
echo  Node.js found!

REM Install Core MCPs
echo.
echo [2/25] Installing Ollama MCP...
call npm install -g ollama-mcp-server --silent
echo  [OK] ollama-mcp-server

echo.
echo [3/25] Installing Filesystem MCP...
call npm install -g @modelcontextprotocol/server-filesystem --silent
echo  [OK] @modelcontextprotocol/server-filesystem

echo.
echo [4/25] Installing Git MCP...
call npm install -g @modelcontextprotocol/server-git --silent
echo  [OK] @modelcontextprotocol/server-git

echo.
echo [5/25] Installing Memory MCP...
call npm install -g @modelcontextprotocol/server-memory --silent
echo  [OK] @modelcontextprotocol/server-memory

echo.
echo [6/25] Installing Sequential Thinking MCP...
call npm install -g @modelcontextprotocol/server-sequential-thinking --silent
echo  [OK] @modelcontextprotocol/server-sequential-thinking

echo.
echo [7/25] Installing Time MCP...
call npm install -g @modelcontextprotocol/server-time --silent
echo  [OK] @modelcontextprotocol/server-time

echo.
echo [8/25] Installing Fetch MCP...
call npm install -g @modelcontextprotocol/server-fetch --silent
echo  [OK] @modelcontextprotocol/server-fetch

echo.
echo [9/25] Installing SQLite MCP...
call npm install -g @modelcontextprotocol/server-sqlite --silent
echo  [OK] @modelcontextprotocol/server-sqlite

echo.
echo [10/25] Installing Puppeteer MCP...
call npm install -g @modelcontextprotocol/server-puppeteer --silent
echo  [OK] @modelcontextprotocol/server-puppeteer

REM Install Additional MCPs
echo.
echo [11/25] Installing PostgreSQL MCP...
call npm install -g @modelcontextprotocol/server-postgres --silent
echo  [OK] @modelcontextprotocol/server-postgres

echo.
echo [12/25] Installing Redis MCP...
call npm install -g @modelcontextprotocol/server-redis --silent
echo  [OK] @modelcontextprotocol/server-redis

echo.
echo [13/25] Installing AWS MCP...
call npm install -g @modelcontextprotocol/server-aws --silent
echo  [OK] @modelcontextprotocol/server-aws

echo.
echo [14/25] Installing GitHub MCP...
call npm install -g @modelcontextprotocol/server-github --silent
echo  [OK] @modelcontextprotocol/server-github

echo.
echo [15/25] Installing GitLab MCP...
call npm install -g @modelcontextprotocol/server-gitlab --silent
echo  [OK] @modelcontextprotocol/server-gitlab

echo.
echo [16/25] Installing Slack MCP...
call npm install -g @modelcontextprotocol/server-slack --silent
echo  [OK] @modelcontextprotocol/server-slack

echo.
echo [17/25] Installing Discord MCP...
call npm install -g @modelcontextprotocol/server-discord --silent
echo  [OK] @modelcontextprotocol/server-discord

echo.
echo [18/25] Installing Email MCP...
call npm install -g @modelcontextprotocol/server-email --silent
echo  [OK] @modelcontextprotocol/server-email

echo.
echo [19/25] Installing Calendar MCP...
call npm install -g @modelcontextprotocol/server-calendar --silent
echo  [OK] @modelcontextprotocol/server-calendar

echo.
echo [20/25] Installing Notion MCP...
call npm install -g @modelcontextprotocol/server-notion --silent
echo  [OK] @modelcontextprotocol/server-notion

echo.
echo [21/25] Installing Linear MCP...
call npm install -g @modelcontextprotocol/server-linear --silent
echo  [OK] @modelcontextprotocol/server-linear

echo.
echo [22/25] Installing Jira MCP...
call npm install -g @modelcontextprotocol/server-jira --silent
echo  [OK] @modelcontextprotocol/server-jira

echo.
echo [23/25] Installing Sentry MCP...
call npm install -g @modelcontextprotocol/server-sentry --silent
echo  [OK] @modelcontextprotocol/server-sentry

echo.
echo [24/25] Installing Stripe MCP...
call npm install -g @modelcontextprotocol/server-stripe --silent
echo  [OK] @modelcontextprotocol/server-stripe

echo.
echo [25/25] Installing Playwright MCP...
call npm install -g @modelcontextprotocol/server-playwright --silent
echo  [OK] @modelcontextprotocol/server-playwright

REM Create Claude Desktop config
echo.
echo ========================================
echo   Creating Claude Desktop Config...
echo ========================================
echo.

set CLAUDE_CONFIG=%APPDATA%\Claude\claude_desktop_config.json

echo {
echo   "mcpServers": {
echo     "ollama": {
echo       "command": "npx",
echo       "args": ["-y", "ollama-mcp-server"],
echo       "env": {"OLLAMA_HOST": "http://localhost:11434"}
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
echo     },
echo     "puppeteer": {
echo       "command": "npx",
echo       "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
echo     },
echo     "postgresql": {
echo       "command": "npx",
echo       "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://localhost:5432/ollama"]
echo     },
echo     "redis": {
echo       "command": "npx",
echo       "args": ["-y", "@modelcontextprotocol/server-redis", "redis://localhost:6379"]
echo     },
echo     "aws": {
echo       "command": "npx",
echo       "args": ["-y", "@modelcontextprotocol/server-aws"]
echo     },
echo     "github": {
echo       "command": "npx",
echo       "args": ["-y", "@modelcontextprotocol/server-github"]
echo     },
echo     "gitlab": {
echo       "command": "npx",
echo       "args": ["-y", "@modelcontextprotocol/server-gitlab"]
echo     },
echo     "slack": {
echo       "command": "npx",
echo       "args": ["-y", "@modelcontextprotocol/server-slack"]
echo     },
echo     "discord": {
echo       "command": "npx",
echo       "args": ["-y", "@modelcontextprotocol/server-discord"]
echo     },
echo     "email": {
echo       "command": "npx",
echo       "args": ["-y", "@modelcontextprotocol/server-email"]
echo     },
echo     "calendar": {
echo       "command": "npx",
echo       "args": ["-y", "@modelcontextprotocol/server-calendar"]
echo     },
echo     "notion": {
echo       "command": "npx",
echo       "args": ["-y", "@modelcontextprotocol/server-notion"]
echo     },
echo     "linear": {
echo       "command": "npx",
echo       "args": ["-y", "@modelcontextprotocol/server-linear"]
echo     },
echo     "jira": {
echo       "command": "npx",
echo       "args": ["-y", "@modelcontextprotocol/server-jira"]
echo     },
echo     "sentry": {
echo       "command": "npx",
echo       "args": ["-y", "@modelcontextprotocol/server-sentry"]
echo     },
echo     "stripe": {
echo       "command": "npx",
echo       "args": ["-y", "@modelcontextprotocol/server-stripe"]
echo     },
echo     "playwright": {
echo       "command": "npx",
echo       "args": ["-y", "@modelcontextprotocol/server-playwright"]
echo     }
echo   }
echo } > "%CLAUDE_CONFIG%"

echo  Config saved to: %CLAUDE_CONFIG%

echo.
echo ========================================
echo   ALL 24 MCPs INSTALLED SUCCESSFULLY!
echo ========================================
echo.
echo INSTALLED MCPs:
echo.
echo CORE MCPs:
echo   1.  ollama - AI modeli
echo   2.  filesystem - Datoteke
echo   3.  git - Git operacije
echo   4.  memory - Spomin
echo   5.  sequential-thinking - Verižno razmišljanje
echo   6.  time - Čas in datumi
echo   7.  fetch - HTTP requesti
echo   8.  sqlite - SQLite baza
echo   9.  puppeteer - Browser avtomatizacija
echo.
echo DATABASE MCPs:
echo   10. postgresql - PostgreSQL baza
echo   11. redis - Redis cache
echo   12. aws - AWS storitve
echo.
echo CODE PLATFORMS:
echo   13. github - GitHub integracija
echo   14. gitlab - GitLab integracija
echo.
echo COMMUNICATION:
echo   15. slack - Slack integracija
echo   16. discord - Discord integracija
echo   17. email - Email integracija
echo   18. calendar - Google Calendar
echo.
echo PRODUCTIVITY:
echo   19. notion - Notion integracija
echo   20. linear - Linear issue tracking
echo   21. jira - Jira issue tracking
echo.
echo DEVELOPER TOOLS:
echo   22. sentry - Error tracking
echo   23. stripe - Payment processing
echo   24. playwright - Browser testing
echo.
echo ========================================
echo.
echo NEXT STEPS:
echo   1. Restart Claude Desktop
echo   2. All MCPs will be automatically loaded
echo   3. Start using: @ollama, @github, @slack, etc.
echo.
echo TIP: Use @ followed by MCP name to use
echo.
pause
