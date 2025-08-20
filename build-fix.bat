@echo off
echo Building KR-STUDIO with fixed configuration...
echo.

REM Clean previous build
echo Cleaning previous build...
if exist dist rmdir /s /q dist
echo.

REM Install dependencies if needed
echo Installing dependencies...
call npm install
echo.

REM Build with new configuration
echo Building project...
call npm run build
echo.

REM Check if build was successful
if exist dist\index.html (
    echo ✅ Build completed successfully!
    echo.
    echo Files created:
    dir dist /b
    echo.
    echo Please upload the contents of the 'dist' folder to Hostinger
) else (
    echo ❌ Build failed!
    echo Please check the error messages above
)

echo.
pause
