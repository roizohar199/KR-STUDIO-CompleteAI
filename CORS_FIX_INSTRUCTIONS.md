# 🔧 תיקון בעיית CORS - הוראות למשתמש

## הבעיה:
המערכת מנסה לגשת ל-URL הישן במקום החדש, מה שגורם לשגיאת CORS.

## פתרון:

### שלב 1: ניקוי Cache בדפדפן
1. **פתח Developer Tools** (F12)
2. **לחץ על F1** או **Settings**
3. **חפש "Clear storage"** או **"Clear site data"**
4. **לחץ על "Clear site data"**
5. **רענן את הדף** (Ctrl+F5)

### שלב 2: בדיקה שהקובץ עודכן
1. **פתח Developer Tools** (F12)
2. **עבור לטאב Network**
3. **רענן את הדף**
4. **חפש בקשות ל-API**
5. **וודא שהן הולכות ל-URL החדש**: `https://kr-studio-completeai.onrender.com/api`

### שלב 3: בדיקת הקונסול
אחרי ניקוי ה-cache, הקונסול צריך להראות:
```
✅ [API] קריאה לשרת: /health
✅ [API] תשובה מהשרת: /health {"status":"OK"}
```

## אם הבעיה נמשכת:

### פתרון 1: שימוש בדפדפן אחר
- נסה Chrome במקום Firefox
- או Firefox במקום Chrome

### פתרון 2: ניקוי מלא
1. **סגור את הדפדפן**
2. **פתח מחדש**
3. **היכנס ל-`https://mixifyai.k-rstudio.com`**
4. **נסה שוב**

### פתרון 3: בדיקת הקבצים
וודא שהקבצים עודכנו:
- `src/api/client.js` - מכיל את ה-URL החדש
- `dist/` - מכיל את הקבצים המעודכנים

## בדיקת תקינות:

### בדיקת Backend:
```bash
node test-backend.js
```

### בדיקת Frontend:
- היכנס ל-`https://mixifyai.k-rstudio.com`
- פתח Developer Tools (F12)
- עבור לטאב Console
- חפש הודעות שגיאה

## הודעות תקינות:
```
✅ [API] קריאה לשרת: /health
✅ [API] תשובה מהשרת: /health {"status":"OK"}
✅ 📁 מעלה קובץ: filename.mp3
✅ קובץ הועלה בהצלחה
```

## הודעות שגיאה שצריכות להיעלם:
```
❌ Access to fetch at 'https://kr-studio-audio-separation.onrender.com/api/health'
❌ CORS policy: Response to preflight request doesn't pass access control check
❌ Failed to fetch
```

## אם הכל עובד:
- ✅ Backend עובד
- ✅ Frontend עובד
- ✅ חיבור תקין
- ✅ העלאת קבצים עובדת
- ✅ הפרדת אודיו עובדת

**האתר זמין ב**: `https://mixifyai.k-rstudio.com` 