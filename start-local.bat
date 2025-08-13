@echo off
echo 🚀 KR-STUDIO CompleteAI - הרצה מקומית
echo ======================================

echo.
echo 📦 בודק תלויות Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js לא מותקן! אנא התקן מ: https://nodejs.org/
    pause
    exit /b 1
)

echo 📦 בודק תלויות Python...
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python לא מותקן! אנא התקן מ: https://python.org/
    pause
    exit /b 1
)

echo.
echo 🔧 מתקין תלויות Node.js...
call npm install

echo.
echo 🔧 מתקין תלויות Python...
call pip install -r requirements-minimal.txt

echo.
echo 🎵 בודק אם Demucs מותקן...
python -m demucs --help >nul 2>&1
if errorlevel 1 (
    echo ⚠️ Demucs לא מותקן, מתקין...
    call pip install demucs
)

echo.
echo 🏗️ בונה את הפרונטנד...
call npm run build

echo.
echo 🚀 מפעיל את השרת...
echo.
echo 💡 האתר יהיה זמין ב: http://localhost:10000
echo 💡 Worker יהיה זמין ב: http://localhost:10001
echo.
echo ⚠️ לחץ Ctrl+C כדי לעצור
echo.

start "KR-STUDIO Worker" cmd /k "npm run worker"
timeout /t 3 /nobreak >nul
start "KR-STUDIO Server" cmd /k "npm run server"

echo ✅ השרת וה-Worker הופעלו!
pause
