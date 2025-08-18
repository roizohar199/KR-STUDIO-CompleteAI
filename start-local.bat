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
echo 🏗️ מפעיל מצב פיתוח עם Hot Reload...
echo.
echo 💡 חלון 1: Worker (reload אוטומטי)
echo 💡 חלון 2: Server (reload אוטומטי)

echo.
echo 🚀 מפעיל את השרת...
echo.
echo 💡 האתר יהיה זמין ב: http://localhost:10000
echo 💡 Worker יהיה זמין ב: http://localhost:10001
echo.
echo ⚠️ לחץ Ctrl+C כדי לעצור
echo.

start "KR-STUDIO Worker (hot)" cmd /k "npm run worker:dev"
timeout /t 2 /nobreak >nul
start "KR-STUDIO Server (hot)" cmd /k "npm run server:dev"

echo ✅ השרת וה-Worker הופעלו!
pause
