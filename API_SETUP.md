# הגדרת OpenAI API Key

## בעיה נוכחית
המערכת מציגה שגיאה: "API Key לא נמצא" כי ה-OpenAI API Key לא מוגדר.

## פתרון

### שלב 1: קבלת API Key
1. היכנס ל: https://platform.openai.com/api-keys
2. צור חשבון או התחבר לחשבון הקיים
3. צור API Key חדש
4. העתק את ה-API Key

### שלב 2: הגדרת ה-API Key
צור קובץ `.env` בתיקיית הפרויקט עם התוכן הבא:

```
VITE_OPENAI_API_KEY=your_actual_api_key_here
```

**חשוב:** החלף את `your_actual_api_key_here` עם ה-API Key האמיתי שלך.

### שלב 3: הפעלה מחדש
1. עצור את השרת (Ctrl+C)
2. הפעל מחדש: `npm run dev`
3. רענן את הדפדפן

## הערות חשובות
- אל תעלה את קובץ `.env` ל-Git (הוא כבר ב-.gitignore)
- שמור על ה-API Key בסוד
- אם אתה משתמש ב-Create React App, השתמש ב-`REACT_APP_OPENAI_API_KEY` במקום `VITE_OPENAI_API_KEY`

## בדיקה
לאחר ההגדרה, המערכת תציג "סטטוס AI API: {available: true}" במקום השגיאה הנוכחית. 