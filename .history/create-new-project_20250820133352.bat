@echo off
echo.
echo ========================================
echo  Three.js Project Creator
echo ========================================
echo.

set /p projectName="Enter your new project name: "

if "%projectName%"=="" (
    echo Error: Project name cannot be empty!
    pause
    exit /b 1
)

echo.
echo Creating project: %projectName%
echo.

REM Create the new project directory
mkdir "%~dp0..\Three.js Projects\%projectName%" 2>nul

REM Copy template files
xcopy "%~dp0\3d-viewer-template\*" "%~dp0..\Three.js Projects\%projectName%\" /E /I /Y

echo.
echo ✅ Project '%projectName%' created successfully!
echo 📁 Location: %~dp0..\Three.js Projects\%projectName%
echo.
echo Next steps:
echo 1. Open the project folder in VS Code
echo 2. Run 'npm install' to install dependencies
echo 3. Run 'npm run dev' to start development server
echo.

set /p openVSCode="Would you like to open this project in VS Code now? (y/n): "

if /i "%openVSCode%"=="y" (
    echo Opening in VS Code...
    code "%~dp0..\Three.js Projects\%projectName%"
)

echo.
pause
