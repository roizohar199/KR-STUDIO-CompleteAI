@echo off
echo ========================================
echo KR-STUDIO CompleteAI - שרת מותאם לביצועים
echo ========================================
echo.

echo 🚀 מתחיל שרת מותאם לביצועים...
echo.

echo 📁 בדיקת תיקיות...
if not exist "uploads" mkdir uploads
if not exist "separated" mkdir separated
if not exist "dist" (
    echo ❌ תיקיית dist לא קיימת! יש לבנות את הפרויקט קודם
    echo.
    echo 🔧 בניית הפרויקט...
    npm run build
    echo.
)

echo.
echo 🎯 הפעלת שרת מותאם לביצועים...
echo 🌐 השרת יהיה זמין ב: http://localhost:10000
echo.
echo 💡 טיפים לביצועים:
echo    - סגור דפדפנים אחרים
echo    - סגור תוכנות כבדות
echo    - השאר לפחות 2GB זיכרון פנוי
echo.

echo 🔄 מתחיל שרת...
node server-optimized.js

pause
