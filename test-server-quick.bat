@echo off
echo ========================================
echo KR-STUDIO CompleteAI - בדיקה מהירה
echo ========================================
echo.

echo 🔍 בדיקת חיבור לשרת...
echo.

echo 📡 בדיקת localhost:10000...
curl -s http://localhost:10000/api/health >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ השרת עובד!
    echo 🌐 גש ל: http://localhost:10000
) else (
    echo ❌ השרת לא עובד
    echo 🔧 הפעל את השרת עם: start-optimized.bat
)

echo.
echo 🔍 בדיקת quick-test...
curl -s http://localhost:10000/api/quick-test >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ API עובד!
) else (
    echo ❌ API לא עובד
)

echo.
echo 🔍 בדיקת projects...
curl -s http://localhost:10000/api/projects >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Projects API עובד!
) else (
    echo ❌ Projects API לא עובד
)

echo.
echo 📊 סיכום בדיקה:
echo    - שרת: %errorlevel%
echo    - quick-test: %errorlevel%
echo    - projects: %errorlevel%

echo.
pause
