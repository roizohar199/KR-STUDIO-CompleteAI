# Demucs Server Worker - תיעוד

## סקירה כללית

`demucs-server-worker.js` הוא Worker אמיתי לצד-שרת שמשתמש ב-`worker_threads` של Node.js לעיבוד Demucs במקביל.

## איך זה עובד

### 1. Main Thread
- מנהל את ה-Worker Pool
- מקבל משימות ועומד בתור
- מפזר משימות ל-workers זמינים
- עוקב אחר סטטוס ה-workers

### 2. Worker Threads
- כל worker רץ בתהליך נפרד
- מפעיל Demucs עם Python
- מעבד קובץ אודיו אחד בכל פעם
- מחזיר תוצאות ל-main thread

## שימוש

### הפעלה ישירה
```bash
node demucs-server-worker.js
```

### הפעלה עם npm scripts
```bash
npm run worker          # הפעלה רגילה
npm run worker:dev      # הפעלה עם nodemon
npm run worker:start    # הפעלה לפרודקשן
npm run worker:test     # הפעלה לבדיקות
```

### שימוש כמודול
```javascript
const workerManager = require('./demucs-server-worker.js');

// הוספת משימה
await workerManager.addTask({
    fileId: 'file123',
    inputPath: '/path/to/audio.mp3',
    outputDir: '/path/to/output',
    projectName: 'My Project'
});

// בדיקת סטטוס
const status = workerManager.getStatus();
console.log(status);
```

## הגדרות סביבה

| משתנה | ברירת מחדל | תיאור |
|--------|-------------|--------|
| `MAX_WORKERS` | 2 | מספר מקסימלי של workers |
| `TASK_TIMEOUT` | 900000 | timeout למשימה (15 דקות) |
| `LOG_LEVEL` | 'info' | רמת לוגים |

## תכונות

✅ **עיבוד מקביל** - מספר קבצים במקביל  
✅ **ניהול תורים** - משימות לא הולכות לאיבוד  
✅ **ניטור בריאות** - מעקב אחר זיכרון ו-CPU  
✅ **טיפול בשגיאות** - retry אוטומטי  
✅ **Graceful shutdown** - כיבוי מסודר  

## ארכיטקטורה

```
Main Thread (Worker Manager)
├── Task Queue
├── Worker Pool
│   ├── Worker 1 (Demucs Process 1)
│   ├── Worker 2 (Demucs Process 2)
│   └── ...
└── Health Monitor
```

## דרישות מערכת

- Node.js 18+
- Python 3.8+
- Demucs מותקן
- זיכרון: 2GB+ לכל worker
- מעבד: 2 cores+ לכל worker

## פתרון בעיות

### Worker לא מתחיל
1. בדוק ש-Python מותקן
2. בדוק ש-Demucs מותקן
3. בדוק הרשאות לקבצים

### Worker קורס
1. בדוק זיכרון פנוי
2. בדוק גודל קובץ (מקסימום 100MB)
3. בדוק לוגים לשגיאות

### ביצועים איטיים
1. הגדל `MAX_WORKERS`
2. בדוק זיכרון פנוי
3. בדוק עומס על המערכת

## דוגמאות

### הוספת משימה עם עדיפות גבוהה
```javascript
await workerManager.addTask({
    fileId: 'urgent123',
    inputPath: '/urgent/audio.mp3',
    outputDir: '/output/urgent',
    projectName: 'Urgent Project',
    priority: 'high'
});
```

### ניטור בזמן אמת
```javascript
setInterval(() => {
    const status = workerManager.getStatus();
    console.log('📊 סטטוס:', status);
}, 5000);
```

### כיבוי מסודר
```javascript
process.on('SIGINT', async () => {
    await workerManager.shutdown();
    process.exit(0);
});
```
