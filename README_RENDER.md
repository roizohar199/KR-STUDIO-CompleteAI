# KR-STUDIO CompleteAI - Render Deployment

## תצורת שרת מעודכנת עם Worker נפרד

### שינויים עיקריים:

1. **הגדלת הזיכרון ל-1GB+** - שרת ראשי עם 1GB RAM
2. **Worker נפרד ל-Demucs** - 2GB RAM לעיבוד אודיו
3. **תיקון סדר Middleware** - CORS ראשון, אחריו body parsers
4. **CORS על כל התשובות** - כולל שגיאות ו-404

### מבנה הפרויקט:

```
├── server.js          # שרת ראשי (1GB RAM)
├── demucs-worker.js   # Worker לעיבוד אודיו (2GB RAM)
├── render.yaml        # תצורת Render
├── Procfile          # הגדרות הפעלה
└── package.json      # תלויות
```

### הוראות הפעלה:

#### 1. התקנת תלויות:
```bash
npm install
```

#### 2. הפעלת שרת מקומי:
```bash
# שרת ראשי
node --max-old-space-size=1024 server.js

# Worker (בטרמינל נפרד)
node --max-old-space-size=2048 demucs-worker.js
```

#### 3. בדיקת השרת:
```bash
node test-local-server.js
```

### תצורת Render:

#### שרת ראשי (Web Service):
- **Instance Type**: `standard-1x` (1GB RAM)
- **Memory**: 1024MB
- **Port**: 10000
- **Health Check**: `/api/health`

#### Worker (Background Service):
- **Instance Type**: `standard-2x` (2GB RAM)
- **Memory**: 2048MB
- **Port**: 10001
- **תפקיד**: עיבוד Demucs בלבד

### סדר Middleware:

1. **CORS middleware** - ראשון
2. **OPTIONS handler** - לטיפול ב-preflight
3. **Body parsers** - express.json, express.urlencoded
4. **Routes** - כל ה-endpoints
5. **Error handlers** - עם CORS headers

### CORS Headers:

כל התשובות כוללות:
```javascript
res.header('Access-Control-Allow-Origin', origin);
res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD, PATCH');
res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Origin, Accept, Access-Control-Request-Method, Access-Control-Request-Headers, User-Agent, X-Forwarded-For, X-Forwarded-Proto');
res.header('Access-Control-Max-Age', '86400');
res.header('Access-Control-Allow-Credentials', 'false');
```

### בדיקת יציבות:

#### Health Check:
```bash
curl -v https://kr-studio-completeai.onrender.com/api/health
```

#### בדיקת CORS:
```bash
curl -X OPTIONS -H "Origin: https://mixifyai.k-rstudio.com" \
  -H "Access-Control-Request-Method: GET" \
  -H "Access-Control-Request-Headers: Content-Type" \
  https://kr-studio-completeai.onrender.com/api/health
```

### ניטור זיכרון:

- **שרת ראשי**: ניקוי כל 5 דקות
- **Worker**: ניקוי כל 3 דקות
- **אזהרה**: מעל 400MB (שרת) / 1.5GB (worker)

### תקשורת בין שרתים:

```javascript
// שליחת משימה ל-worker
const workerResponse = await fetch('http://localhost:10001/api/worker/process', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ fileId, inputPath, outputDir, projectName })
});
```

### פתרון בעיות:

1. **השרת קורס**: בדוק לוגים ב-Render Dashboard
2. **Worker לא מגיב**: בדוק אם רץ על פורט 10001
3. **CORS errors**: וודא שה-middleware בסדר הנכון
4. **Memory issues**: הגדל RAM ב-render.yaml

### Deploy ל-Render:

```bash
# Push לשינויים
git add .
git commit -m "Updated server with worker and CORS fixes"
git push origin main

# Render יבנה אוטומטית
```

### בדיקות אחרי Deploy:

1. **Health Check**: `200 OK` עם CORS headers
2. **Worker Health**: `200 OK` מה-worker
3. **CORS Preflight**: `200 OK` ל-OPTIONS requests
4. **Memory Usage**: פחות מ-80% מהזיכרון הזמין 