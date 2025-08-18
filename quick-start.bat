@echo off
echo 🚀 KR-STUDIO CompleteAI - הרצה מהירה
echo =====================================

echo.
echo 🎵 מפעיל Worker (Hot Reload)...
start "KR-STUDIO Worker (hot)" cmd /k "npm run worker:dev"

echo.
echo ⏳ ממתין ל-Worker...
timeout /t 5 /nobreak >nul

echo.
echo 🌐 מפעיל שרת (Hot Reload)...
start "KR-STUDIO Server (hot)" cmd /k "npm run server:dev"

echo.
echo ✅ השרת וה-Worker הופעלו!
echo.
echo 🌐 האתר: http://localhost:10000
echo 🔧 Worker: http://localhost:10001
echo.
echo ⚠️ לחץ Ctrl+C בכל חלון כדי לעצור
pause
