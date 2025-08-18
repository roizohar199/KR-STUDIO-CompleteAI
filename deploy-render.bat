@echo off
echo 🚀 פריסה ל-Render.com - KR-STUDIO CompleteAI
echo ================================================

echo.
echo 📋 בדיקת מצב הפרויקט...
if not exist "package.json" (
    echo ❌ לא נמצא package.json - וודא שאתה בתיקיית הפרויקט
    pause
    exit /b 1
)

echo.
echo 🔧 בניית הפרויקט...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ שגיאה בבנייה
    pause
    exit /b 1
)

echo.
echo ✅ בנייה הושלמה בהצלחה!

echo.
echo 📝 עדכון Git...
git add .
git commit -m "Deploy to Render.com - $(date /t)"
if %errorlevel% neq 0 (
    echo ❌ שגיאה ב-Git commit
    pause
    exit /b 1
)

echo.
echo 🚀 דחיפה ל-GitHub...
git push origin main
if %errorlevel% neq 0 (
    echo ❌ שגיאה ב-Git push
    pause
    exit /b 1
)

echo.
echo 🎉 הפריסה נשלחה בהצלחה!
echo.
echo 📊 Render.com יבנה ויפרס את הפרויקט אוטומטית
echo 🌐 URL: https://kr-studio-completeai.onrender.com
echo.
echo 💡 טיפים:
echo    - בדוק את הלוגים: npm run render:logs
echo    - בדוק סטטוס: npm run render:status
echo    - זמן בנייה: 2-5 דקות
echo.

pause
