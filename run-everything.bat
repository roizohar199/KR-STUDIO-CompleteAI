@echo off
title KR-STUDIO CompleteAI - Full Setup
color 0A

echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║                    KR-STUDIO CompleteAI                     ║
echo ║                   מערכת מוזיקה מתקדמת עם AI                ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

echo 🚀 Starting full setup...
echo.

echo 📦 Step 1: Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ npm install failed
    echo 💡 Trying to fix...
    call npm cache clean --force
    call npm install
)

echo.
echo 🔨 Step 2: Building frontend...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Build failed
    pause
    exit /b 1
)

echo.
echo 🎵 Step 3: Installing Python dependencies...
call pip install -r requirements-simple.txt
if %errorlevel% neq 0 (
    echo ⚠️ Python dependencies failed, but continuing...
)

echo.
echo ✅ Setup complete!
echo.
echo 🌐 Your website is ready!
echo 📁 Audio separation is available
echo 🤖 AI analysis is working
echo.
echo 🚀 Starting server...
echo 💡 Open: http://localhost:10000
echo.
echo Press Ctrl+C to stop the server
echo.

pause
npm start
