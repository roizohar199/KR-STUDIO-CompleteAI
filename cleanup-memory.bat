@echo off
echo ========================================
echo KR-STUDIO CompleteAI - ניקוי זיכרון
echo ========================================
echo.

echo 🧹 מנקה זיכרון...
echo.

echo 🔍 מחפש תהליכים כבדים...
echo.

echo 📊 תהליכי Node.js:
tasklist /FI "IMAGENAME eq node.exe" /FO TABLE 2>NUL

echo.
echo 📊 תהליכי דפדפן:
tasklist /FI "IMAGENAME eq chrome.exe" /FO TABLE 2>NUL
tasklist /FI "IMAGENAME eq firefox.exe" /FO TABLE 2>NUL
tasklist /FI "IMAGENAME eq msedge.exe" /FO TABLE 2>NUL

echo.
echo 🧹 מנקה קבצים זמניים...
if exist "%TEMP%\*" (
    del /Q "%TEMP%\*" >NUL 2>&1
    echo ✅ קבצים זמניים נוקו
) else (
    echo ℹ️ אין קבצים זמניים
)

echo.
echo 🧹 מנקה תיקיות זמניות...
if exist "uploads\*" (
    del /Q "uploads\*" >NUL 2>&1
    echo ✅ תיקיית uploads נוקתה
) else (
    echo ℹ️ תיקיית uploads ריקה
)

if exist "separated\*" (
    del /Q "separated\*" >NUL 2>&1
    echo ✅ תיקיית separated נוקתה
) else (
    echo ℹ️ תיקיית separated ריקה
)

echo.
echo 💡 המלצות לניקוי זיכרון:
echo    1. סגור דפדפנים מיותרים
echo    2. סגור תוכנות כבדות
echo    3. הפעל מחדש את המחשב
echo    4. השאר לפחות 2GB זיכרון פנוי

echo.
echo 📊 זיכרון פנוי:
wmic OS get FreePhysicalMemory /Value | find "FreePhysicalMemory"

echo.
pause
