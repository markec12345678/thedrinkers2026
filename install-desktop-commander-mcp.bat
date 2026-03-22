@echo off
REM ========================================
REM   Desktop Commander MCP Installer
REM ========================================

echo.
echo ========================================
echo   Desktop Commander MCP Installer
echo ========================================
echo.

REM Check if npm is available
echo [1/4] Checking npm...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: npm not found!
    echo Please install Node.js first
    pause
    exit /b 1
)
echo  npm found!

REM Install Desktop Commander MCP
echo.
echo [2/4] Installing Desktop Commander MCP...
call npm install -g @wonderwhy-er/desktop-commander --silent
if %errorlevel% equ 0 (
    echo  Desktop Commander MCP installed!
) else (
    echo  Installation failed, trying with pnpm...
    call pnpm add -g @wonderwhy-er/desktop-commander
)

REM Install additional MCPs
echo.
echo [3/4] Installing additional MCPs...
echo  Installing filesystem MCP...
call npm install -g @modelcontextprotocol/server-filesystem --silent

echo  Installing git MCP...
call npm install -g @modelcontextprotocol/server-git --silent

echo  Done!

REM Update Claude config
echo.
echo [4/4] Updating Claude Desktop config...
set CLAUDE_CONFIG=%APPDATA%\Claude\claude_desktop_config.json

echo { > "%CLAUDE_CONFIG%"
echo   "mcpServers": { >> "%CLAUDE_CONFIG%"
echo     "desktop-commander": { >> "%CLAUDE_CONFIG%"
echo       "command": "npx", >> "%CLAUDE_CONFIG%"
echo       "args": ["-y", "@wonderwhy-er/desktop-commander"] >> "%CLAUDE_CONFIG%"
echo     }, >> "%CLAUDE_CONFIG%"
echo     "filesystem": { >> "%CLAUDE_CONFIG%"
echo       "command": "npx", >> "%CLAUDE_CONFIG%"
echo       "args": ["-y", "@modelcontextprotocol/server-filesystem", "F:\\d"] >> "%CLAUDE_CONFIG%"
echo     }, >> "%CLAUDE_CONFIG%"
echo     "git": { >> "%CLAUDE_CONFIG%"
echo       "command": "npx", >> "%CLAUDE_CONFIG%"
echo       "args": ["-y", "@modelcontextprotocol/server-git"] >> "%CLAUDE_CONFIG%"
echo     } >> "%CLAUDE_CONFIG%"
echo   } >> "%CLAUDE_CONFIG%"
echo } >> "%CLAUDE_CONFIG%"

echo  Config saved!

echo.
echo ========================================
echo   INSTALLATION COMPLETE!
echo ========================================
echo.
echo Installed:
echo   - Desktop Commander MCP
echo   - Filesystem MCP
echo   - Git MCP
echo.
echo Next steps:
echo   1. Restart Claude Desktop
echo   2. Use: @desktop-commander, @filesystem, @git
echo.
echo Documentation: F:\thedrinkers\the\DESKTOP_COMMANDER_MCP.md
echo.
pause
