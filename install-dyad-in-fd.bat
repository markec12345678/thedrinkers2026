@echo off
REM ========================================
REM   Install Dyad Shortcut in F:\d\dyad
REM ========================================

echo.
echo ========================================
echo   Installing Dyad in F:\d\dyad
echo ========================================
echo.

REM Check if dyad.exe exists
set DYAD_EXE=C:\Users\admin\AppData\Local\dyad\dyad.exe
if not exist "%DYAD_EXE%" (
    echo ERROR: Dyad not found at %DYAD_EXE%
    echo Please install Dyad first
    pause
    exit /b 1
)

echo Dyad found at: %DYAD_EXE%
echo.

REM Create shortcut using PowerShell
echo Creating shortcut...
powershell -Command "$shell = New-Object -ComObject WScript.Shell; $shortcut = $shell.CreateShortcut('F:\d\dyad\Dyad.lnk'); $shortcut.TargetPath = '%DYAD_EXE%'; $shortcut.WorkingDirectory = 'C:\Users\admin\AppData\Local\dyad'; $shortcut.Description = 'Dyad AI IDE'; $shortcut.Save()"

if %errorlevel% equ 0 (
    echo  Shortcut created: F:\d\dyad\Dyad.lnk
) else (
    echo  ERROR: Failed to create shortcut
)

REM Create batch launcher
echo.
echo Creating batch launcher...
(
echo @echo off
echo REM Dyad Launcher
echo echo ========================================
echo echo   Starting Dyad AI IDE
echo echo ========================================
echo echo.
echo start "" "%DYAD_EXE%"
echo echo Dyad is starting...
echo echo.
) > "F:\d\dyad\start-dyad.bat"

if %errorlevel% equ 0 (
    echo  Launcher created: F:\d\dyad\start-dyad.bat
) else (
    echo  ERROR: Failed to create launcher
)

echo.
echo ========================================
echo   INSTALLATION COMPLETE!
echo ========================================
echo.
echo Dyad is now available at:
echo   F:\d\dyad\Dyad.lnk
echo.
echo Or run:
echo   F:\d\dyad\start-dyad.bat
echo.
echo ========================================
echo.
pause
