# KR-STUDIO CompleteAI - מערכת ניתוח והפרדת מוזיקה מתקדמת

## 🎵 מערכת הפרדה מתקדמת עם Demucs

המערכת כוללת מערכת הפרדה מתקדמת עם:
- **Demucs** לפרדת אודיו מקצועית
- **Node.js + Express.js** לשרת Backend
- **React 18 + Vite** ל-Frontend
- **WebSocket-like polling** לעדכונים בזמן אמת
- **Radix UI** לממשק משתמש מתקדם

### 🚀 תכונות המערכת:

#### הפרדת אודיו מתקדמת
- הפרדת 5 ערוצים: ווקאל, בס, תופים, גיטרה, אחר
- שימוש ב-Demucs לפרדה מקצועית
- עיבוד מקביל ומהיר
- תמיכה בפורמטים רבים (MP3, WAV, FLAC, M4A, AAC)

#### ניתוח קול מתקדם
- זיהוי סולמות אוטומטי
- ניתוח טווח קולי
- זיהוי אקורדים
- ניתוח קצב ומלודיה

#### ניתוח אודיו מתקדם
- ניתוח ספקטרלי
- זיהוי רגשות
- ניתוח דינמיקה
- חיזוי ז'אנר

#### עיבוד ענן
- עיבוד מקביל
- אופטימיזציה אוטומטית
- ניתוח קבצים גדולים

### 📦 התקנה והפעלה:

#### שלב 1: התקנת Node.js Dependencies
```bash
# התקנת תלויות Node.js
npm install

# התקנת תלויות נוספות
npm install express cors multer fs-extra concurrently
```

#### שלב 2: התקנת Python Dependencies
```bash
# התקנת Python dependencies
pip install -r requirements.txt

# או התקנה ידנית של Demucs
pip install demucs
```

#### שלב 3: הפעלת המערכת
```bash
# הפעלת Frontend ו-Backend יחד
npm run dev:full

# או הפעלה נפרדת
npm run dev          # Frontend
npm run server       # Backend
```

#### שלב 4: בנייה לפרודקשן
```bash
# בנייה
npm run build

# פריסה
npm run deploy
```

### 🎯 איך להשתמש:

#### 1. העלאת קובץ אודיו
- לחץ על "פרויקט חדש"
- העלה קובץ אודיו (MP3, WAV, FLAC, M4A, AAC)
- הכנס שם לפרויקט
- לחץ על "התחל הפרדה"

#### 2. מעקב אחר התקדמות
- המערכת תציג התקדמות בזמן אמת
- Polling אוטומטי כל 2 שניות
- הודעות סטטוס ברורות

#### 3. האזנה והעריכה
- בחר פרויקט מהרשימה
- האזן לכל ערוץ בנפרד
- שלוט בעוצמה ו-Mute
- הורד קבצי STEMS

### 🔧 ארכיטקטורה:

#### Frontend (React 18 + Vite)
```
src/
├── components/
│   ├── AudioSeparation.jsx      # קומפוננטה ראשית
│   └── audio-separation/        # קומפוננטות הפרדה
├── api/
│   └── client.js                # API Client
└── lib/
    └── translations.js          # תרגומים
```

#### Backend (Node.js + Express.js)
```
server.js                        # שרת Express
├── /api/upload                  # העלאת קבצים
├── /api/separate                # הפרדה עם Demucs
├── /api/projects                # ניהול פרויקטים
└── /api/health                  # בדיקת חיבור
```

#### Python (Demucs)
```
demucs --out output_dir --two-stems=vocals input_file
```

### 📊 API Endpoints:

#### העלאת קובץ
```http
POST /api/upload
Content-Type: multipart/form-data
```

#### התחלת הפרדה
```http
POST /api/separate
Content-Type: application/json
{
  "fileId": "1234567890",
  "projectName": "My Project"
}
```

#### מעקב התקדמות
```http
GET /api/separate/:fileId/progress
```

#### רשימת פרויקטים
```http
GET /api/projects
```

#### הורדת STEM
```http
GET /api/projects/:id/download/:stem
```

### 🎵 קבצי STEMS:

המערכת יוצרת 5 קבצי STEMS:
- **vocals.mp3** - ערוץ השירה
- **no_vocals.mp3** - הכל ללא שירה
- **drums.mp3** - תופים
- **bass.mp3** - בס
- **other.mp3** - כלים אחרים

### 🔍 פתרון בעיות:

#### שרת לא מחובר
```bash
# בדיקת פורט 3001
netstat -an | grep 3001

# הפעלה מחדש
npm run server
```

#### Demucs לא עובד
```bash
# בדיקת התקנה
python -c "import demucs; print('OK')"

# התקנה מחדש
pip install --upgrade demucs
```

#### שגיאות CORS
```bash
# בדיקת הגדרות CORS ב-server.js
# וידוא שהשרת רץ על localhost:3001
```

### 📈 ביצועים:

- **זמן עיבוד**: 2-5 דקות לקובץ של 3-4 דקות
- **איכות**: 320kbps MP3
- **גודל קובץ מקסימלי**: 100MB
- **פורמטים נתמכים**: MP3, WAV, FLAC, M4A, AAC

### 🔒 אבטחה:

- **CORS** מוגדר לפתחים מקומיים
- **File validation** לקבצי אודיו בלבד
- **Size limits** למניעת עומס
- **Error handling** מקיף

### 🚀 פריסה:

#### Hostinger
```bash
# בנייה
npm run build

# העלאה
npm run deploy
```

#### VPS/Server
```bash
# התקנת Node.js ו-Python
# העתקת קבצים
# הפעלת PM2
pm2 start server.js
```

### 📝 הערות חשובות:

1. **Demucs דורש GPU** לביצועים אופטימליים
2. **זיכרון נדרש**: לפחות 4GB RAM
3. **מרחב דיסק**: 10x גודל הקובץ המקורי
4. **Python 3.8+** נדרש

### 🎼 דוגמאות שימוש:

#### הפרדת שיר פופ
```javascript
// העלאת קובץ
const file = new File(['audio'], 'song.mp3');
const result = await uploadAudio(file);

// התחלת הפרדה
await separateAudio(result.file.id, 'My Pop Song');

// מעקב התקדמות
const progress = await getSeparationProgress(result.file.id);
```

#### הורדת STEMS
```javascript
// הורדת ווקאל
await downloadStem(projectId, 'vocals');

// הורדת תופים
await downloadStem(projectId, 'drums');
```

### 🔄 עדכונים עתידיים:

- [ ] שילוב AI לניתוח אוטומטי
- [ ] תמיכה בפורמטים נוספים
- [ ] עיבוד מקביל מתקדם
- [ ] ממשק משתמש משופר
- [ ] תמיכה במובייל

---

**KR-STUDIO CompleteAI** - מערכת הפרדת מוזיקה מתקדמת עם Demucs 🎵 