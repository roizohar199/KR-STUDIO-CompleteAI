# 🚀 הוראות פריסה - KR-STUDIO CompleteAI (פריסה ידנית)

## 📋 **מבנה המערכת**

המערכת מורכבת מ-3 חלקים עיקריים:
1. **Frontend** - React App (Vite) - מאוחסן ב-Hostinger
2. **Backend** - Express Server (Port 10000) - יפורס על Render
3. **Worker** - Demucs Audio Separation (Port 10001) - יפורס על Render

## 🔧 **פריסה ידנית על Render (Free Plan)**

### **שלב 1: פריסת Backend Service**

1. **היכנס ל-Render Dashboard:** https://dashboard.render.com
2. **לחץ על "New +"** → **"Web Service"**
3. **התחבר ל-GitHub** ובחר את הפרויקט: `roizohar199/KR-STUDIO-CompleteAI`
4. **הגדר את השירות:**
   - **Name:** `kr-studio-backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `node --max-old-space-size=1024 server.js`
   - **Plan:** `Free`

5. **הוסף משתני סביבה:**
   ```
   NODE_ENV=production
   WORKER_URL=https://kr-studio-worker.onrender.com/api/worker
   ```

6. **לחץ על "Create Web Service"**

### **שלב 2: פריסת Worker Service**

1. **לחץ על "New +"** → **"Background Worker"**
2. **בחר את אותו Repository:** `roizohar199/KR-STUDIO-CompleteAI`
3. **הגדר את השירות:**
   - **Name:** `kr-studio-worker`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node --max-old-space-size=2048 demucs-worker.js`
   - **Plan:** `Free`

4. **הוסף משתני סביבה:**
   ```
   NODE_ENV=production
   WORKER_PORT=10001
   ```

5. **לחץ על "Create Background Worker"**

### **שלב 3: עדכון משתני הסביבה**

אחרי ששני השירותים יפורסו:

1. **חזור ל-Backend Service**
2. **עדכן את `WORKER_URL`** לכתובת האמיתית של ה-Worker:
   ```
   WORKER_URL=https://kr-studio-worker.onrender.com/api/worker
   ```
3. **לחץ על "Save Changes"**

## 🌐 **משתני סביבה חשובים**

### **Backend (.env):**
```bash
PORT=10000
WORKER_URL=https://kr-studio-worker.onrender.com/api/worker
```

### **Worker (.env):**
```bash
WORKER_PORT=10001
NODE_ENV=production
```

## 📁 **קבצי פריסה חשובים**

- `Procfile` - הגדרות Render/Heroku
- `package.json` - סקריפטים והתלויות
- `server.js` - שרת Backend
- `demucs-worker.js` - Worker להפרדת אודיו

## 🔍 **בדיקות אחרי פריסה**

### **בדיקת Backend:**
```bash
curl https://kr-studio-backend.onrender.com/api/health
```

### **בדיקת Worker:**
```bash
curl https://kr-studio-worker.onrender.com/api/worker/health
```

## ⚠️ **הערות חשובות**

- **Free Plan** מוגבל ל-750 שעות בחודש
- **Auto-sleep** אחרי 15 דקות של חוסר פעילות
- **Memory limit** של 512MB לכל שירות
- **Build time** מוגבל ל-10 דקות

## 🚀 **הרצה מקומית (לפיתוח)**

```bash
# הרצת כל המערכת
npm run dev:full

# הרצת Backend + Worker בלבד
npm run server:with-worker
```

## ❓ **עזרה נוספת**

אם אתה נתקל בבעיות:
1. בדוק את ה-Logs ב-Render Dashboard
2. וודא שכל משתני הסביבה מוגדרים נכון
3. בדוק שה-Repository מחובר נכון
4. וודא שהקוד עובד מקומית לפני הפריסה
