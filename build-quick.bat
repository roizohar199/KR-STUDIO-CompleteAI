@echo off
echo ========================================
echo KR-STUDIO CompleteAI - בנייה מהירה
echo ========================================
echo.

echo 🚀 בנייה מהירה של הפרויקט...
echo.

echo 📦 התקנת dependencies...
npm install --prefer-offline --no-audit --no-fund

echo.
echo 🔧 בניית הפרויקט...
npm run build

echo.
if exist "dist" (
    echo ✅ בנייה הושלמה בהצלחה!
    echo 📁 תיקיית dist נוצרה
    echo.
    echo 🎯 אפשר להפעיל את השרת עכשיו עם:
    echo    start-optimized.bat
) else (
    echo ❌ בנייה נכשלה!
    echo 🔍 בדוק את השגיאות למעלה
)

echo.
pause
