# 🚀 KR-STUDIO CompleteAI - הרצה מקומית

## 📋 דרישות מערכת
- **Node.js** 18+ (https://nodejs.org/)
- **Python** 3.8+ (https://python.org/)
- **FFmpeg** (https://ffmpeg.org/)

## 🚀 הרצה מהירה

### אפשרות 1: סקריפט אוטומטי (מומלץ)
```bash
# הרצה מלאה עם התקנה
start-local.bat

# הרצה מהירה (אם כבר התקנת הכל)
quick-start.bat
```

### אפשרות 2: הרצה ידנית
```bash
# התקנת תלויות
npm install
pip install -r requirements-minimal.txt

# בניית הפרונטנד
npm run build

# הפעלת Worker (חלון ראשון)
npm run worker

# הפעלת שרת (חלון שני)
npm run server
```

### אפשרות 3: הרצה עם npm
```bash
# הכל בפקודה אחת
npm run quick
```

## 🌐 כתובות גישה
- **האתר הראשי**: http://localhost:10000
- **Worker API**: http://localhost:10001
- **Health Check**: http://localhost:10000/api/health

## 🔧 פתרון בעיות

### בעיה: Python לא נמצא
```bash
# Windows - הוסף ל-PATH
set PATH=%PATH%;C:\Python39\

# או השתמש ב-python3
python3 --version
```

### בעיה: Demucs לא מותקן
```bash
pip install demucs
# או
pip install -r requirements-minimal.txt
```

### בעיה: פורט תפוס
```bash
# בדוק מה רץ על הפורט
netstat -ano | findstr :10000
netstat -ano | findstr :10001

# עצור תהליך
taskkill /PID <PID> /F
```

## 📁 מבנה תיקיות
```
KR-STUDIO CompleteAI/
├── uploads/          # קבצים שהועלו
├── separated/        # קבצים מופרדים
├── dist/            # פרונטנד מוכן
├── server.js        # שרת ראשי
└── demucs-worker.js # Worker לעיבוד אודיו
```

## ✅ בדיקת תקינות
1. **בדיקת שרת**: http://localhost:10000/api/health
2. **בדיקת Worker**: http://localhost:10001/api/health
3. **בדיקת Demucs**: http://localhost:10000/api/test-demucs

## 🎯 טיפים
- הפעל קודם את ה-Worker, אחר כך את השרת
- השתמש ב-`start-local.bat` בפעם הראשונה
- השתמש ב-`quick-start.bat` להרצות מהירות
- אם יש בעיה, נסה `npm run setup` להתקנה מחדש
