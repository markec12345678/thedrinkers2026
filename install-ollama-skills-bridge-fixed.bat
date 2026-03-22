@echo off
REM ========================================
REM   OLLAMA SKILLS BRIDGE - FIXED INSTALLER
REM ========================================

echo.
echo ========================================
echo   OLLAMA SKILLS BRIDGE INSTALLER
echo   Connecting 424 skills to Ollama
echo ========================================
echo.

cd /d F:\ollama_mcp

REM Create structure
echo [1/6] Creating directory structure...
if not exist "skills" mkdir skills
if not exist "config" mkdir config
if not exist "files" mkdir files
if not exist "databases" mkdir databases
if not exist "logs" mkdir logs
echo  Done!

REM Copy files from The Drinkers project
echo.
echo [2/6] Copying MCP server files...
copy /Y "F:\thedrinkers\the\ollama-mcp-index.js" "index.js"
copy /Y "F:\thedrinkers\the\ollama-mcp-skills-bridge.js" "skills-bridge.js"
echo  Done!

REM Create package.json if not exists
echo.
echo [3/6] Creating package.json...
if not exist "package.json" (
    echo { > package.json
    echo   "name": "ollama-skills-bridge", >> package.json
    echo   "version": "1.0.0", >> package.json
    echo   "description": "Connect 424 skills to Ollama via MCP", >> package.json
    echo   "main": "index.js", >> package.json
    echo   "scripts": { >> package.json
    echo     "start": "node index.js", >> package.json
    echo     "dev": "nodemon index.js" >> package.json
    echo   }, >> package.json
    echo   "dependencies": { >> package.json
    echo     "@modelcontextprotocol/sdk": "latest", >> package.json
    echo     "ollama": "latest" >> package.json
    echo   } >> package.json
    echo } >> package.json
)
echo  Done!

REM Install dependencies
echo.
echo [4/6] Installing dependencies...
call npm install --silent
echo  Done!

REM Create config
echo.
echo [5/6] Creating config...
echo { > config\ollama-config.json
echo   "ollama": { >> config\ollama-config.json
echo     "host": "http://localhost:11434", >> config\ollama-config.json
echo     "defaultModel": "llama2" >> config\ollama-config.json
echo   }, >> config\ollama-config.json
echo   "bridge": { >> config\ollama-config.json
echo     "skillsDir": "./skills", >> config\ollama-config.json
echo     "autoLoad": true >> config\ollama-config.json
echo   } >> config\ollama-config.json
echo } >> config\ollama-config.json
echo  Done!

REM Update Claude config
echo.
echo [6/6] Updating Claude Desktop config...
set CLAUDE_CONFIG=%APPDATA%\Claude\claude_desktop_config.json

echo { > "%CLAUDE_CONFIG%"
echo   "mcpServers": { >> "%CLAUDE_CONFIG%"
echo     "ollama-skills-bridge": { >> "%CLAUDE_CONFIG%"
echo       "command": "node", >> "%CLAUDE_CONFIG%"
echo       "args": ["F:\\ollama_mcp\\index.js"] >> "%CLAUDE_CONFIG%"
echo     }, >> "%CLAUDE_CONFIG%"
echo     "filesystem": { >> "%CLAUDE_CONFIG%"
echo       "command": "npx", >> "%CLAUDE_CONFIG%"
echo       "args": ["-y", "@modelcontextprotocol/server-filesystem", "F:\\ollama_mcp\\files"] >> "%CLAUDE_CONFIG%"
echo     } >> "%CLAUDE_CONFIG%"
echo   } >> "%CLAUDE_CONFIG%"
echo } >> "%CLAUDE_CONFIG%"
echo  Config saved!

echo.
echo ========================================
echo   INSTALLATION COMPLETE!
echo ========================================
echo.
echo Files created:
echo   ✓ index.js ^(^MCP server^)
echo   ✓ skills-bridge.js
echo   ✓ package.json
echo   ✓ config/ollama-config.json
echo.
echo Next steps:
echo   1. Add your skills to F:\ollama_mcp\skills\
echo   2. Restart Claude Desktop
echo   3. Test: @ollama-skills-bridge list
echo.
echo Documentation: F:\thedrinkers\the\OLLAMA_SKILLS_BRIDGE_FINAL.md
echo.
pause
