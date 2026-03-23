@echo off
REM ========================================
REM   Disk Cleanup - Find & Clean
REM   SAFE - Only shows files, doesn't delete!
REM ========================================

echo.
echo ========================================
echo   DISK CLEANUP ANALYZER
echo   Finding files that can be deleted
echo ========================================
echo.

REM Check disk space
echo [1/6] Checking disk space...
wmic logicaldisk get size,freespace,caption
echo.

REM Find temporary files
echo [2/6] Finding temporary files...
echo.
echo === TEMP FILES ===
dir %TEMP%\*.tmp /s 2>nul | findstr /C:"File(s)"
dir C:\Windows\Temp\*.tmp /s 2>nul | findstr /C:"File(s)"
echo.

REM Find cache files
echo [3/6] Finding cache files...
echo.
echo === CACHE FILES ===
dir %LOCALAPPDATA%\Microsoft\Windows\INetCache\ /s 2>nul | findstr /C:"File(s)"
dir %LOCALAPPDATA%\npm-cache /s 2>nul | findstr /C:"File(s)"
dir %LOCALAPPDATA%\pnpm-cache /s 2>nul | findstr /C:"File(s)"
echo.

REM Find large files
echo [4/6] Finding large files (>100MB)...
echo.
echo === LARGE FILES ===
forfiles /p C:\ /s /m *.* /c "cmd /c if @fsize GEQ 104857600 echo @path @fsize" 2>nul | head -20
echo.

REM Find old downloads
echo [5/6] Finding old downloads...
echo.
echo === OLD DOWNLOADS ===
dir %USERPROFILE%\Downloads\*.exe /s 2>nul | findstr /C:"File(s)"
dir %USERPROFILE%\Downloads\*.zip /s 2>nul | findstr /C:"File(s)"
echo.

REM Node.js specific
echo [6/6] Finding Node.js cache...
echo.
echo === NODE.JS CACHE ===
dir %APPDATA%\npm-cache /s 2>nul | findstr /C:"File(s)"
dir %LOCALAPPDATA%\pnpm-store /s 2>nul | findstr /C:"File(s)"
echo.

echo ========================================
echo   ANALYSIS COMPLETE!
echo ========================================
echo.
echo SAFE TO DELETE:
echo   - %TEMP%\*.tmp
echo   - C:\Windows\Temp\*.tmp
echo   - %LOCALAPPDATA%\Microsoft\Windows\INetCache\*
echo   - %APPDATA%\npm-cache\*
echo   - %LOCALAPPDATA%\pnpm-store\*
echo   - Old downloads in %USERPROFILE%\Downloads\
echo.
echo WARNING: Review files before deleting!
echo.
pause
