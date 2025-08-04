# 🚀 מדריך העלאה ל-Render

## שלב 1: הכנת הפרויקט

1. **וודא שכל הקבצים מוכנים:**
   - `server.js` - השרת הראשי
   - `package.json` - תלויות Node.js
   - `requirements.txt` - תלויות Python
   - `render.yaml` - הגדרות Render
   - `Procfile` - פקודת הפעלה

2. **בנה את הפרויקט:**
   ```bash
   npm run build
   ```

## שלב 2: העלאה ל-GitHub

1. **צור repository חדש ב-GitHub**
2. **העלה את הפרויקט:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit for Render deployment"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

## שלב 3: חיבור ל-Render

1. **היכנס ל-Render Dashboard**
2. **לחץ על "New +"**
3. **בחר "Web Service"**
4. **חבר את ה-GitHub repository**
5. **הגדר את השירות:**
   - **Name:** kr-studio-audio-separation
   - **Environment:** Node
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Port:** 10000

## שלב 4: הגדרת Environment Variables

הוסף את המשתנים הבאים ב-Render:

```
NODE_ENV=production
PORT=10000
```

## שלב 5: בדיקת הפריסה

1. **המתן לבנייה להסתיים** (יכול לקחת 10-15 דקות)
2. **בדוק את הלוגים** אם יש שגיאות
3. **בדוק את ה-URL** שניתן לך

## שלב 6: עדכון ה-API URL

אחרי שהשירות עובד, עדכן את `src/api/client.js`:

```javascript
const API_BASE_URL = 'https://YOUR_RENDER_URL.onrender.com/api';
```

## פתרון בעיות נפוצות

### שגיאת Python/Demucs:
- וודא ש-`requirements.txt` מכיל את כל התלויות
- בדוק שהפקודה `postinstall` עובדת

### שגיאת Port:
- וודא שה-PORT מוגדר ל-10000
- בדוק שה-`server.js` מקשיב לפורט הנכון

### שגיאת Build:
- בדוק שה-`package.json` מכיל את כל התלויות
- וודא שה-`npm run build` עובד מקומית

## מבנה הקבצים הנדרש:

```
├── server.js              # השרת הראשי
├── package.json           # תלויות Node.js
├── requirements.txt       # תלויות Python
├── render.yaml           # הגדרות Render
├── Procfile              # פקודת הפעלה
├── dist/                 # קבצי הבנייה
├── src/                  # קוד המקור
└── uploads/              # תיקיית העלאות
```

## קישורים שימושיים:

- [Render Documentation](https://render.com/docs)
- [Node.js on Render](https://render.com/docs/deploy-node-express-app)
- [Python on Render](https://render.com/docs/deploy-python-app) 