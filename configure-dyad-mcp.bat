@echo off
REM ========================================
REM   Configure Dyad with MCP Servers
REM   Desktop Commander + All MCPs
REM ========================================

echo.
echo ========================================
echo   Configuring Dyad with MCP Servers
echo ========================================
echo.

REM Find Dyad config location
set DYAD_CONFIG=%APPDATA%\dyad\config.json
set DYAD_CONFIG2=%LOCALAPPDATA%\dyad\config.json

echo Checking Dyad installation...
if exist "%DYAD_CONFIG%" (
    echo  Found: %DYAD_CONFIG%
    set "FINAL_CONFIG=%DYAD_CONFIG%"
) else if exist "%DYAD_CONFIG2%" (
    echo  Found: %DYAD_CONFIG2%
    set "FINAL_CONFIG=%DYAD_CONFIG2%"
) else (
    echo  Dyad config not found, creating...
    mkdir "%APPDATA%\dyad" 2>nul
    set "FINAL_CONFIG=%APPDATA%\dyad\config.json"
)

echo.
echo Creating MCP configuration...

REM Create the config
echo { > "%FINAL_CONFIG%"
echo   "mcpServers": { >> "%FINAL_CONFIG%"
echo     "desktop-commander": { >> "%FINAL_CONFIG%"
echo       "command": "npx", >> "%FINAL_CONFIG%"
echo       "args": ["-y", "@wonderwhy-er/desktop-commander"], >> "%FINAL_CONFIG%"
echo       "env": {} >> "%FINAL_CONFIG%"
echo     }, >> "%FINAL_CONFIG%"
echo     "filesystem": { >> "%FINAL_CONFIG%"
echo       "command": "npx", >> "%FINAL_CONFIG%"
echo       "args": ["-y", "@modelcontextprotocol/server-filesystem", "F:\\\\d"], >> "%FINAL_CONFIG%"
echo       "env": {} >> "%FINAL_CONFIG%"
echo     }, >> "%FINAL_CONFIG%"
echo     "git": { >> "%FINAL_CONFIG%"
echo       "command": "npx", >> "%FINAL_CONFIG%"
echo       "args": ["-y", "@modelcontextprotocol/server-git"], >> "%FINAL_CONFIG%"
echo       "env": {} >> "%FINAL_CONFIG%"
echo     }, >> "%FINAL_CONFIG%"
echo     "ollama": { >> "%FINAL_CONFIG%"
echo       "command": "npx", >> "%FINAL_CONFIG%"
echo       "args": ["-y", "ollama-mcp-server"], >> "%FINAL_CONFIG%"
echo       "env": { >> "%FINAL_CONFIG%"
echo         "OLLAMA_HOST": "http://localhost:11434" >> "%FINAL_CONFIG%"
echo       } >> "%FINAL_CONFIG%"
echo     }, >> "%FINAL_CONFIG%"
echo     "ollama-skills-bridge": { >> "%FINAL_CONFIG%"
echo       "command": "node", >> "%FINAL_CONFIG%"
echo       "args": ["F:\\\\ollama_mcp\\\\index.js"], >> "%FINAL_CONFIG%"
echo       "env": {} >> "%FINAL_CONFIG%"
echo     } >> "%FINAL_CONFIG%"
echo   } >> "%FINAL_CONFIG%"
echo } >> "%FINAL_CONFIG%"

echo.
echo Configuration saved to: %FINAL_CONFIG%
echo.

REM Copy backup to project
echo Creating backup in project...
copy /Y "%FINAL_CONFIG%" "F:\thedrinkers\the\dyad-config-backup.json"

echo.
echo ========================================
echo   DYAD CONFIGURATION COMPLETE!
echo ========================================
echo.
echo Configured MCP Servers:
echo   1. Desktop Commander - File operations ^& terminal
echo   2. Filesystem - File access ^F:\d^)
echo   3. Git - Git operations
echo   4. Ollama - AI models
echo   5. Ollama Skills Bridge - 424 skills
echo.
echo Next steps:
echo   1. Restart Dyad
echo   2. MCP servers will be automatically loaded
echo   3. Start using: @desktop-commander, @ollama, etc.
echo.
echo Backup saved: F:\thedrinkers\the\dyad-config-backup.json
echo.
pause
