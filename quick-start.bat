@echo off
echo 🚀 KR-STUDIO CompleteAI - הרצה מהירה
echo =====================================

echo.
echo 🎵 מפעיל Worker...
start "KR-STUDIO Worker" cmd /k "npm run worker"

echo.
echo ⏳ ממתין ל-Worker...
timeout /t 5 /nobreak >nul

echo.
echo 🌐 מפעיל שרת...
start "KR-STUDIO Server" cmd /k "npm run server"

echo.
echo ✅ השרת וה-Worker הופעלו!
echo.
echo 🌐 האתר: http://localhost:10000
echo 🔧 Worker: http://localhost:10001
echo.
echo ⚠️ לחץ Ctrl+C בכל חלון כדי לעצור
pause
