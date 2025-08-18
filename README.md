# 🚀 KR-STUDIO CompleteAI

## 📋 **תיאור הפרויקט**

KR-STUDIO CompleteAI הוא פלטפורמה מתקדמת להפרדת אודיו באמצעות AI, המבוססת על React ו-Node.js. המערכת מספקת כלים מתקדמים לעיבוד אודיו עם ממשק משתמש מודרני ואינטואיטיבי.

## 🌐 **פריסה (Deployment)**

### **Render.com (מומלץ)**
הפרויקט מופרס על Render.com - פלטפורמת ענן מודרנית עם:
- **750 שעות חינמיות** בחודש
- **שרת לא "נרדם"** (בניגוד לפלטפורמות אחרות)
- **MongoDB מובנה** (חינמי)
- **Persistent Disk** (לקבצי אודיו)
- **SSL אוטומטי**
- **Auto-deploy מ-GitHub**
- **Health checks אוטומטיים**

### **פריסה מהירה**
```bash
# פריסה אוטומטית
npm run render:deploy

# בדיקת לוגים
npm run render:logs

# בדיקת סטטוס
npm run render:status
```

### **סקריפטים מוכנים**
- `deploy-render.bat` - פריסה מלאה עם בדיקות
- `RENDER_DEPLOYMENT.md` - מדריך מפורט

## 🛠️ **טכנולוגיות**

### **Frontend**
- **React 18** - ממשק משתמש מודרני
- **Vite** - בנייה מהירה
- **Tailwind CSS** - עיצוב מתקדם
- **Radix UI** - רכיבים נגישים

### **Backend**
- **Node.js** - שרת JavaScript
- **Express.js** - מסגרת שרת
- **Multer** - עיבוד קבצים
- **CORS** - אבטחה בין דומיינים

### **AI & Audio Processing**
- **Demucs** - הפרדת אודיו מתקדמת
- **FFmpeg** - עיבוד אודיו
- **TensorFlow.js** - מודלים של AI

## 🚀 **הפעלה מקומית**

### **דרישות מקדימות**
- Node.js 18.x
- npm 9.x
- Python 3.8+ (עבור Demucs)
- FFmpeg

### **התקנה**
```bash
# התקנת תלויות
npm install

# בניית הפרויקט
npm run build

# הפעלת שרת
npm run start:local
```

### **פיתוח**
```bash
# שרת פיתוח עם hot reload
npm run start:hot

# בנייה ובדיקה
npm run quick
```

## 📁 **מבנה הפרויקט**

```
KR-STUDIO CompleteAI/
├── src/                    # קוד React
│   ├── components/         # רכיבי UI
│   ├── hooks/             # React hooks
│   └── lib/               # ספריות עזר
├── server.js              # שרת Express
├── render.yaml             # הגדרות Render.com
├── package.json           # תלויות וסקריפטים
└── README.md              # מדריך זה
```

## 🔧 **API Endpoints**

### **אודיו**
- `POST /api/upload` - העלאת קובץ אודיו
- `POST /api/separate` - התחלת הפרדה
- `GET /api/separate/:id/progress` - מעקב התקדמות
- `GET /api/projects/:id/download/:stem` - הורדת stem

### **פרויקטים**
- `GET /api/projects` - רשימת פרויקטים
- `GET /api/projects/:id` - פרטי פרויקט
- `DELETE /api/projects/:id` - מחיקת פרויקט

### **בריאות המערכת**
- `GET /api/health` - בדיקת בריאות בסיסית
- `GET /api/health/detailed` - בדיקת בריאות מפורטת
- `GET /api/test-demucs` - בדיקת Demucs

## 🌍 **URLs**

### **Production**
- **Frontend**: `https://mixifyai.k-rstudio.com`
- **Backend**: `https://kr-studio-completeai.cyclic.app`

### **Development**
- **Frontend**: `http://localhost:5173`
- **Backend**: `http://localhost:10000`

## 📊 **ביצועים**

- **זיכרון**: אופטימיזציה אוטומטית
- **קבצים**: ניקוי אוטומטי של קבצים ישנים
- **CORS**: תמיכה מלאה ב-cross-origin requests
- **Compression**: דחיסה אוטומטית של תגובות

## 🔒 **אבטחה**

- **CORS**: הגבלת גישה לפי דומיין
- **File Validation**: בדיקת קבצים מועלים
- **Rate Limiting**: הגבלת בקשות
- **Input Sanitization**: ניקוי קלט משתמש

## 🚨 **בעיות נפוצות**

### **CORS Errors**
וודא שה-CORS מוגדר נכון לכלול את הדומיין החדש.

### **Port Issues**
Cyclic.sh דורש שהשרת יאזין ל-`process.env.PORT`.

### **Build Failures**
וודא שה-build script עובד מקומית לפני הפריסה.

## 📞 **תמיכה**

- **Cyclic.sh Docs**: https://docs.cyclic.sh
- **Cyclic.sh Discord**: https://discord.gg/cyclic
- **Issues**: פתח issue ב-GitHub

## 📄 **רישיון**

פרויקט זה מוגן בזכויות יוצרים של KR-STUDIO.

---

**בהצלחה! 🚀**