# 🚀 הוראות פריסה - KR-STUDIO CompleteAI (פריסה על Fly.io)

## 📋 **מבנה המערכת**

המערכת מורכבת מ-3 חלקים עיקריים:
1. **Frontend** - React App (Vite) - מאוחסן ב-Hostinger
2. **Backend** - Express Server (Port 10000) - יפורס על Fly.io
3. **Worker** - Demucs Audio Separation (Port 10001) - יפורס על Fly.io

## 🔧 **פריסה על Fly.io**

### **שלב 1: התקנת Fly CLI**

1. **התקן Fly CLI:**
   ```bash
   # macOS
   brew install flyctl
   
   # Windows
   winget install Fly.Flyctl
   
   # Linux
   curl -L https://fly.io/install.sh | sh
   ```

2. **התחבר לחשבון Fly.io:**
   ```bash
   fly auth login
   ```

### **שלב 2: פריסת Backend Service**

1. **עבור לתיקיית הפרויקט:**
   ```bash
   cd KR-STUDIO-CompleteAI
   ```

2. **פרוס את השרת הראשי:**
   ```bash
   fly deploy
   ```

3. **בדוק שהשרת עובד:**
   ```bash
   fly status
   ```

### **שלב 3: פריסת Worker Service**

1. **פרוס את ה-Worker:**
   ```bash
   fly deploy -f fly.worker.toml
   ```

2. **בדוק שה-Worker עובד:**
   ```bash
   fly status -a kr-studio-worker
   ```

## 🌐 **משתני סביבה חשובים**

### **Backend (.env):**
```bash
PORT=10000
WORKER_URL=https://kr-studio-worker.fly.dev/api/worker
```

### **Worker (.env):**
```bash
WORKER_PORT=10001
NODE_ENV=production
```

## 📁 **קבצי פריסה חשובים**

- `fly.toml` - הגדרות Fly.io לשרת הראשי
- `fly.worker.toml` - הגדרות Fly.io ל-Worker
- `package.json` - סקריפטים והתלויות
- `server.js` - שרת Backend
- `demucs-worker.js` - Worker להפרדת אודיו

## 🔍 **בדיקות אחרי פריסה**

### **בדיקת Backend:**
```bash
curl https://kr-studio-completeai.fly.dev/api/health
```

### **בדיקת Worker:**
```bash
curl https://kr-studio-worker.fly.dev/api/worker/health
```

## ⚠️ **הערות חשובות**

- **Fly.io** מספק 3GB RAM בחינם
- **Auto-scaling** אוטומטי
- **Global CDN** עם 30+ נקודות קצה
- **SSL אוטומטי** לכל השירותים
- **Monitoring** מתקדם עם Grafana

## 🚀 **יתרונות Fly.io**

- **ביצועים גבוהים** יותר מ-Fly.io
- **זיכרון גדול יותר** (3GB vs 512MB)
- **אין auto-sleep** - השרת תמיד זמין
- **Global deployment** עם CDN
- **Monitoring מתקדם** עם Grafana
