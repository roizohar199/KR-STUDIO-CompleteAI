# Demucs Node Worker - תיעוד מעודכן

## סקירה כללית

`demucs-node-worker.cjs` הוא Worker ייעודי לצד-שרת שמשתמש ב-`worker_threads` של Node.js לעיבוד Demucs במקביל.

## איך זה עובד

### 1. Main Thread
- מנהל את ה-Worker Pool
- מקבל משימות ועומד בתור
- מפזר משימות ל-workers זמינים
- עוקב אחר סטטוס ה-workers
- אוסף סטטיסטיקות מפורטות

### 2. Worker Threads
- כל worker רץ בתהליך נפרד
- מפעיל Demucs עם Python
- מעבד קובץ אודיו אחד בכל פעם
- מחזיר תוצאות ל-main thread

## שימוש

### הפעלה ישירה
```bash
node demucs-node-worker.cjs
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
const workerManager = require('./demucs-node-worker.cjs');

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

## תכונות חדשות

✅ **עיבוד מקביל** - מספר קבצים במקביל  
✅ **ניהול תורים** - משימות לא הולכות לאיבוד  
✅ **ניטור בריאות** - מעקב אחר זיכרון ו-CPU  
✅ **טיפול בשגיאות** - retry אוטומטי  
✅ **Graceful shutdown** - כיבוי מסודר  
✅ **סטטיסטיקות מפורטות** - מעקב אחר ביצועים  
✅ **לוגים מתקדמים** - הודעות ברורות עם אימוג'י  

## ארכיטקטורה

```
Main Thread (Worker Manager)
├── Task Queue
├── Worker Pool
│   ├── Worker 1 (Demucs Process 1)
│   ├── Worker 2 (Demucs Process 2)
│   └── ...
├── Health Monitor
└── Statistics Collector
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

## הבדל מהגרסה הקודמת

- **שם קובץ**: `demucs-node-worker.cjs` (במקום .js)
- **סיומת**: .cjs לתאימות עם CommonJS
- **סטטיסטיקות**: מעקב מפורט אחר ביצועים
- **לוגים**: הודעות ברורות עם אימוג'י
- **ניהול**: שיפור בניהול Worker Pool

## פריסה ברנדר

הקובץ מוגדר כ-Background Worker ברנדר עם:
- **Start Command**: `node demucs-node-worker.cjs`
- **Build Command**: `npm ci --prefer-offline && pip install -r requirements.txt`
- **Environment Variables**: `MAX_WORKERS=2`, `TASK_TIMEOUT=900000`

## בדיקות

הקובץ עבר בדיקות מקומיות ומוכן לפריסה ברנדר.
