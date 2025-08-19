# 🚀 הוראות פריסה - KR-STUDIO CompleteAI (פריסה על Render.com)

## 📋 **מבנה המערכת**

המערכת מורכבת מ-3 חלקים עיקריים:
1. **Frontend** - React App (Vite) - מאוחסן ב-Hostinger
2. **Backend** - Express Server (Port 10000) - יפורס על Render.com
3. **Worker** - Demucs Audio Separation (Port 10001) - יפורס על Render.com

## 🔧 **פריסה על Render.com**

### **שלב 1: הגדרת Backend Service**

1. **היכנס ל-Render Dashboard:**
   - לך ל: https://dashboard.render.com
   - לחץ על "New +" → "Web Service"

2. **הגדר את השירות:**
   - **Name**: `kr-studio-completeai`
   - **Repository**: `roizohar199/KR-STUDIO-CompleteAI`
   - **Branch**: `main`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

### **שלב 2: הגדרת Worker Service**

1. **צור שירות חדש:**
   - לחץ על "New +" → "Web Service"
   - **Name**: `kr-studio-worker`

2. **הגדר את ה-Worker:**
   - **Repository**: `roizohar199/KR-STUDIO-CompleteAI`
   - **Branch**: `main`
   - **Build Command**: `npm install`
   - **Start Command**: `node demucs-node-worker.cjs`

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

- `render.yaml` - הגדרות Render.com
- `package.json` - סקריפטים והתלויות
- `server.js` - שרת Backend
- `demucs-node-worker.cjs` - Worker להפרדת אודיו

## 🔍 **בדיקות אחרי פריסה**

### **בדיקת Backend:**
```bash
curl https://kr-studio-completeai.onrender.com/api/health
```

### **בדיקת Worker:**
```bash
curl https://kr-studio-worker.onrender.com/api/worker/health
```

## ⚠️ **הערות חשובות**

- **Render.com** מספק 512MB RAM בחינם
- **Auto-sleep** אחרי 15 דקות של חוסר פעילות
- **SSL אוטומטי** לכל השירותים
- **GitHub integration** אוטומטי

## 🚀 **יתרונות Render.com**

- **פריסה פשוטה** עם GitHub integration
- **SSL אוטומטי** לכל השירותים
- **Persistent disk** לקבצים
- **Health checks** אוטומטיים
