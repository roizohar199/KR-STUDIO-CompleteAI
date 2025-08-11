# 🚀 הוראות פריסה - KR-STUDIO CompleteAI

## 📋 **מבנה המערכת**

המערכת מורכבת מ-3 חלקים עיקריים:
1. **Frontend** - React App (Vite)
2. **Backend** - Express Server (Port 10000)
3. **Worker** - Demucs Audio Separation (Port 10001)

## 🔧 **אפשרויות פריסה**

### **אפשרות 1: פריסה על Render (מומלץ)**

#### **שלב 1: פריסת Backend**
```bash
# 1. העלה את הקוד ל-GitHub
git add .
git commit -m "Add worker integration"
git push origin main

# 2. ב-Render, צור Web Service חדש
# 3. השתמש ב-render.yaml הקיים
# 4. הגדר את המשתנים הבאים:
NODE_ENV=production
NODE_OPTIONS=--max-old-space-size=1024
WORKER_URL=https://kr-studio-demucs-worker.onrender.com/api/worker
```

#### **שלב 2: פריסת Worker**
```bash
# 1. ב-Render, צור Worker Service חדש
# 2. השתמש ב-render.yaml הקיים
# 3. הגדר את המשתנים הבאים:
NODE_ENV=production
WORKER_PORT=10001
```

#### **שלב 3: עדכון Frontend**
```bash
# 1. עדכן את API_BASE_URL ב-Frontend
# 2. בנה מחדש:
npm run build

# 3. העלה ל-Hostinger:
npm run deploy
```

### **אפשרות 2: הרצה מקומית (לפיתוח)**

#### **הרצת כל המערכת:**
```bash
npm run dev:full
```

#### **הרצת Backend + Worker בלבד:**
```bash
npm run server:with-worker
```

#### **הרצה נפרדת:**
```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Worker  
npm run worker

# Terminal 3 - Frontend
npm run dev
```

## 🌐 **משתני סביבה**

### **Backend (.env):**
```bash
PORT=10000
WORKER_URL=https://kr-studio-demucs-worker.onrender.com/api/worker
# או להשתמש בפורט מקומי:
# WORKER_PORT=10001
```

### **Worker (.env):**
```bash
WORKER_PORT=10001
NODE_ENV=production
```

## 📁 **קבצי פריסה חשובים**

- `render.yaml` - הגדרות Render
- `Procfile` - הגדרות Heroku/Render
- `package.json` - סקריפטים והתלויות
- `server.js` - שרת Backend
- `demucs-worker.js` - Worker להפרדת אודיו

## 🔍 **בדיקות אחרי פריסה**

### **בדיקת Backend:**
```bash
curl https://your-backend.onrender.com/api/health
```

### **בדיקת Worker:**
```bash
curl https://your-worker.onrender.com/api/health
```

### **בדיקת תקשורת:**
```bash
# בדוק שה-Backend יכול לתקשר עם ה-Worker
curl -X POST https://your-backend.onrender.com/api/separate \
  -H "Content-Type: application/json" \
  -d '{"fileId":"test","projectName":"test"}'
```

## 🚨 **בעיות נפוצות ופתרונות**

### **בעיה: "שגיאה בתקשורת עם Worker"**
**פתרון:** בדוק שה-WORKER_URL מוגדר נכון

### **בעיה: Worker לא עונה**
**פתרון:** בדוק שה-Worker Service רץ ב-Render

### **בעיה: Frontend לא מתחבר**
**פתרון:** בדוק שה-API_BASE_URL מעודכן

## 📞 **תמיכה**

אם יש בעיות, בדוק:
1. Logs ב-Render Dashboard
2. Console ב-Browser
3. Network tab ב-Developer Tools
