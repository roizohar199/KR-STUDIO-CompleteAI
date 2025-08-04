# 🎵 KR Studio Audio Separation - Render Deployment

## 📋 תיאור הפרויקט

מערכת הפרדת אודיו מתקדמת המבוססת על:
- **Frontend:** React 18, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Audio Separation:** Demucs (Python)
- **File Handling:** Multer, fs-extra

## 🚀 התקנה והפעלה

### דרישות מערכת:
- Node.js 18+
- Python 3.8+
- Git

### שלבי התקנה:

1. **Clone הפרויקט:**
   ```bash
   git clone <repository-url>
   cd kr-studio-audio-separation
   ```

2. **התקן תלויות:**
   ```bash
   npm install
   pip install -r requirements.txt
   ```

3. **בנה את הפרויקט:**
   ```bash
   npm run build
   ```

4. **הפעל את השרת:**
   ```bash
   npm start
   ```

## 🔧 הגדרות Render

### Environment Variables:
```
NODE_ENV=production
PORT=10000
```

### Build Commands:
```
npm install && npm run build
```

### Start Command:
```
npm start
```

## 📁 מבנה הפרויקט

```
├── server.js              # Express server
├── package.json           # Node.js dependencies
├── requirements.txt       # Python dependencies
├── render.yaml           # Render configuration
├── Procfile              # Process file
├── dist/                 # Built React app
├── src/                  # React source code
├── uploads/              # Uploaded audio files
├── separated/            # Separated audio stems
└── merge_stems.py        # Python stem merger
```

## 🎵 תכונות המערכת

### הפרדת ערוצים:
- **Vocals** - קול אנושי
- **Drums** - תופים
- **Bass** - בס
- **Guitar** - גיטרה
- **Other** - כל השאר

### API Endpoints:
- `POST /api/upload` - העלאת קובץ אודיו
- `POST /api/separate` - התחלת הפרדה
- `GET /api/separate/:id/progress` - מעקב התקדמות
- `GET /api/projects` - רשימת פרויקטים
- `GET /api/projects/:id` - פרטי פרויקט
- `GET /api/projects/:id/download/:stem` - הורדת stem
- `DELETE /api/projects/:id` - מחיקת פרויקט
- `GET /api/health` - בדיקת בריאות

## 🔍 פתרון בעיות

### שגיאות נפוצות:

1. **Python/Demucs לא מותקן:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Port כבר בשימוש:**
   - שנה את ה-PORT ב-environment variables

3. **קבצים לא נטענים:**
   - בדוק שה-dist folder קיים
   - הרץ `npm run build`

4. **Demucs לא עובד:**
   - וודא ש-Python 3.8+ מותקן
   - בדוק שה-torch מותקן נכון

## 📞 תמיכה

לבעיות טכניות או שאלות:
- בדוק את הלוגים ב-Render Dashboard
- וודא שכל התלויות מותקנות
- בדוק שה-environment variables נכונים

## 📄 רישיון

פרויקט זה מיועד לשימוש אישי ומקצועי.

---

**הערה:** הפרויקט דורש משאבים משמעותיים להפרדת אודיו. וודא שיש לך מספיק זיכרון וזמן עיבוד. 