# Demucs Worker System

## תיאור
מערכת עובדים (Workers) לעיבוד אודיו באמצעות Demucs, המשתמשת ב-Node.js worker_threads.

## הפעלה

### הפעלה מקומית
```bash
npm run worker
```

### הפעלה עם nodemon (פיתוח)
```bash
npm run worker:dev
```

### הפעלה ברנדר
המערכת מוגדרת לרוץ אוטומטית כ-Background Worker ברנדר.

## מבנה המערכת

### DemucsWorkerManager
- מנהל את תור המשימות
- מקצה עובדים לעיבוד
- מנטר את הסטטוס

### Worker Threads
- מבצעים את העבודה בפועל
- עיבוד אודיו עם Demucs
- החזרת תוצאות

## הגדרות
כל ההגדרות נמצאות ב-`worker-config.js`:
- מספר מקסימלי של עובדים
- זמן המתנה למשימות
- פורמטים נתמכים
- רמות עדיפות

## שימוש בקוד
```javascript
const workerManager = require('./demucs-node-worker.js');

// הוספת משימה
await workerManager.addTask({
    type: 'audio_separation',
    inputFile: 'audio.mp3',
    outputDir: './output'
});

// בדיקת סטטוס
const status = workerManager.getQueueStatus();
```

## לוגים
המערכת מפיקה לוגים מפורטים לכל הפעולות:
- הוספת משימות
- התחלת עיבוד
- השלמת משימות
- שגיאות

## תמיכה
לשאלות ותמיכה, פנה לצוות הפיתוח.
