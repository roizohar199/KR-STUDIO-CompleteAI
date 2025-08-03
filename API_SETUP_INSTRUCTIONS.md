# הוראות הגדרת OpenAI API Key

## שלב 1: קבלת API Key
1. היכנס ל: https://platform.openai.com/api-keys
2. התחבר לחשבון שלך (או צור חשבון חדש)
3. לחץ על "Create new secret key"
4. תן שם ל-API Key (למשל: "KR Studio AI")
5. העתק את ה-API Key שנוצר

## שלב 2: הגדרת הקובץ .env
1. צור קובץ `.env` בתיקיית הפרויקט הראשית
2. הוסף את השורה הבאה:
```
VITE_OPENAI_API_KEY=your_actual_api_key_here
```
3. החלף את `your_actual_api_key_here` עם ה-API Key האמיתי שלך

## שלב 3: הפעלה מחדש
1. עצור את השרת (Ctrl+C)
2. הפעל מחדש את השרת:
```bash
npm run dev
```

## הערות חשובות:
- אל תעלה את קובץ `.env` ל-GitHub!
- קובץ `.env` כבר מוגדר ב-.gitignore
- ה-API Key שלך נשאר פרטי ובטוח
- המערכת תעבוד גם ללא API Key עם המלצות מקומיות

## בדיקה:
לאחר הגדרת ה-API Key, תראה בממשק:
- ✅ "AI מומחה למוזיקה זמין"
- במקום ⚠️ "API Key לא מוגדר"

## תמיכה:
אם יש בעיות, בדוק:
1. שה-API Key נכון
2. שקובץ `.env` נמצא בתיקייה הנכונה
3. שהשרת הופעל מחדש 