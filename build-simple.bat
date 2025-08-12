@echo off
echo 🚀 Building KR-STUDIO CompleteAI...
echo.

echo 📦 Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ npm install failed
    pause
    exit /b 1
)

echo.
echo 🔨 Building frontend...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Build failed
    pause
    exit /b 1
)

echo.
echo ✅ Build successful!
echo 🎵 Your website is ready!
echo.
echo 🚀 To start the server:
echo    npm start
echo.
pause
