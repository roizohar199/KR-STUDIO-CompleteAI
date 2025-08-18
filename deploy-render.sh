#!/bin/bash

echo "🚀 פריסה ל-Render.com - KR-STUDIO CompleteAI"
echo "================================================"

echo ""
echo "📋 בדיקת מצב הפרויקט..."
if [ ! -f "package.json" ]; then
    echo "❌ לא נמצא package.json - וודא שאתה בתיקיית הפרויקט"
    exit 1
fi

echo ""
echo "🔧 בניית הפרויקט..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ שגיאה בבנייה"
    exit 1
fi

echo ""
echo "✅ בנייה הושלמה בהצלחה!"

echo ""
echo "📝 עדכון Git..."
git add .
git commit -m "Deploy to Render.com - $(date)"
if [ $? -ne 0 ]; then
    echo "❌ שגיאה ב-Git commit"
    exit 1
fi

echo ""
echo "🚀 דחיפה ל-GitHub..."
git push origin main
if [ $? -ne 0 ]; then
    echo "❌ שגיאה ב-Git push"
    exit 1
fi

echo ""
echo "🎉 הפריסה נשלחה בהצלחה!"
echo ""
echo "📊 Render.com יבנה ויפרס את הפרויקט אוטומטית"
echo "🌐 URL: https://kr-studio-completeai.onrender.com"
echo ""
echo "💡 טיפים:"
echo "   - בדוק את הלוגים: npm run render:logs"
echo "   - בדוק סטטוס: npm run render:status"
echo "   - זמן בנייה: 2-5 דקות"
echo ""

# הפיכת הסקריפט לניתן להרצה
chmod +x deploy-render.sh
