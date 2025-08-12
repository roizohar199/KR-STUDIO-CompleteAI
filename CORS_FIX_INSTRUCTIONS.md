# הוראות תיקון CORS - KR-STUDIO CompleteAI

## הבעיה
המערכת נתקלת בשגיאות CORS בעת ניסיון לגשת ל-API.

## פתרון מהיר

### שלב 1: עדכון ה-API URL
עדכן את `src/api/client.js`:

```javascript
// לפני
const API_BASE_URL = 'https://kr-studio-audio-separation.fly.dev/api';

// אחרי
const API_BASE_URL = 'https://kr-studio-completeai.fly.dev/api';
```

### שלב 2: בדיקת חיבור
1. פתח Developer Tools (F12)
2. עבור לטאב Console
3. חפש שגיאות CORS
4. וודא שהן הולכות ל-URL החדש: `https://kr-studio-completeai.fly.dev/api`

### שלב 3: בדיקת שרת
בדוק שהשרת עובד:

```bash
curl https://kr-studio-completeai.fly.dev/api/health
```

## פתרון מפורט

### 1. עדכון קובץ API Client
```javascript
// src/api/client.js
const API_BASE_URL = 'https://kr-studio-completeai.fly.dev/api';
```

### 2. עדכון משתני סביבה
```bash
# .env
API_BASE_URL=https://kr-studio-completeai.fly.dev/api
```

### 3. בדיקת CORS בשרת
וודא שהשרת מחזיר headers נכונים:

```javascript
// server.js
app.use(cors({
  origin: ['https://mixifyai.k-rstudio.com'],
  credentials: true
}));
```

## בדיקות

### בדיקת חיבור בסיסי
```bash
curl -v https://kr-studio-completeai.fly.dev/api/health
```

### בדיקת CORS Headers
```bash
curl -I -H "Origin: https://mixifyai.k-rstudio.com" \
  https://kr-studio-completeai.fly.dev/api/health
```

### בדיקת Frontend
1. פתח את האתר
2. נסה להעלות קובץ
3. בדוק את הקונסול לשגיאות

## שגיאות נפוצות

### שגיאת CORS
```
❌ Access to fetch at 'https://kr-studio-audio-separation.fly.dev/api/health' 
from origin 'https://mixifyai.k-rstudio.com' has been blocked by CORS policy
```

**פתרון:** עדכן את ה-API URL ל-`https://kr-studio-completeai.fly.dev/api`

### שגיאת 404
```
❌ GET https://kr-studio-completeai.fly.dev/api/health 404
```

**פתרון:** בדוק שהשרת רץ ומוגדר נכון

### שגיאת חיבור
```
❌ Failed to fetch
```

**פתרון:** בדוק חיבור לאינטרנט וזמינות השרת

## סיכום

אחרי העדכונים:
1. ✅ ה-API URL מעודכן ל-Fly.io
2. ✅ CORS מוגדר נכון
3. ✅ השרת עובד
4. ✅ המערכת עובדת

המערכת אמורה לעבוד עכשיו ללא שגיאות CORS! 