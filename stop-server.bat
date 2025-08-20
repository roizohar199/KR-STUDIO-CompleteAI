@echo off
echo ========================================
echo KR-STUDIO CompleteAI - עצירת שרת
echo ========================================
echo.

echo 🛑 עוצר את השרת...
echo.

echo 🔍 מחפש תהליכי Node.js...
tasklist /FI "IMAGENAME eq node.exe" 2>NUL | find /I "node.exe" >NUL
if %errorlevel% equ 0 (
    echo ✅ נמצאו תהליכי Node.js
    echo.
    echo 🚫 עוצר תהליכים...
    taskkill /F /IM node.exe >NUL 2>&1
    if %errorlevel% equ 0 (
        echo ✅ כל התהליכים נעצרו
    ) else (
        echo ❌ לא ניתן לעצור תהליכים
    )
) else (
    echo ℹ️ לא נמצאו תהליכי Node.js
)

echo.
echo 🔍 בדיקה נוספת...
tasklist /FI "IMAGENAME eq node.exe" 2>NUL | find /I "node.exe" >NUL
if %errorlevel% equ 0 (
    echo ❌ עדיין יש תהליכים רצים
    echo 🔧 נסה לסגור את החלון באופן ידני
) else (
    echo ✅ כל התהליכים נעצרו בהצלחה
)

echo.
echo 💡 טיפים:
echo    - אם השרת עדיין רץ, סגור את החלון
echo    - אם יש בעיות, הפעל מחדש את המחשב
echo    - לבדיקה: test-server-quick.bat

echo.
pause
