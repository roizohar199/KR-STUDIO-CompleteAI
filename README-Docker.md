# 🐳 KR-STUDIO CompleteAI - Docker Instructions

## פתרון בעיות בנייה

הפרויקט עבר בעיות בנייה עם `diffq` ו-`treetable`. יצרנו פתרונות פשוטים יותר:

### 1. קובץ Requirements מינימלי
- `requirements-minimal.txt` - גרסה פשוטה ללא ספריות בעייתיות
- כולל רק את הספריות הבסיסיות הנדרשות

### 2. Dockerfile פשוט
- `Dockerfile.simple` - גרסה פשוטה יותר שעובדת
- `Dockerfile` - גרסה מלאה עם multi-stage build

## הוראות בנייה

### שימוש ב-Dockerfile.simple (מומלץ)
```bash
# בנייה עם Dockerfile פשוט
docker build -f Dockerfile.simple -t kr-studio-completeai:latest .

# או שימוש בסקריפט
chmod +x build-docker.sh
./build-docker.sh
```

### שימוש ב-Docker Compose
```bash
# בנייה והפעלה
docker-compose up --build

# הפעלה ברקע
docker-compose up -d
```

## פתרון בעיות

### בעיה: diffq לא נבנה
**פתרון:** השתמש ב-`requirements-minimal.txt` במקום `requirements.txt`

### בעיה: treetable לא נבנה  
**פתרון:** השתמש ב-`Dockerfile.simple`

### בעיה: זיכרון לא מספיק
**פתרון:** הגדל זיכרון Docker ל-4GB לפחות

## בדיקת הבנייה

### 1. בדיקת Image
```bash
docker images kr-studio-completeai:latest
```

### 2. בדיקת Container
```bash
docker run -p 10000:10000 kr-studio-completeai:latest
```

### 3. בדיקת Health
```bash
curl http://localhost:10000/api/health
```

## קבצים חשובים

- `Dockerfile.simple` - Dockerfile פשוט שעובד
- `requirements-minimal.txt` - דרישות Python מינימליות
- `build-docker.sh` - סקריפט בנייה אוטומטי
- `docker-compose.yml` - הגדרת שירותים

## הערות

- הפרויקט עובד עם Node.js ו-Python יחד
- FFmpeg מותקן לניתוח אודיו
- השרת רץ על פורט 10000
- Health check בודק את השרת כל 30 שניות
