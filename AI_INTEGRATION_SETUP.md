# AI Integration Setup Guide
# מדריך הגדרת שילוב AI

## OpenAI API Setup
## הגדרת OpenAI API

### 1. קבלת מפתח API
1. היכנס ל-[OpenAI Platform](https://platform.openai.com/)
2. צור חשבון או התחבר
3. עבור ל-API Keys
4. צור מפתח API חדש
5. העתק את המפתח

### 2. הגדרת המפתח בפרויקט
צור קובץ `.env` בתיקיית הפרויקט והוסף:

```env
VITE_OPENAI_API_KEY=your_actual_api_key_here
```

**חשוב:** החלף את `your_actual_api_key_here` במפתח API האמיתי שלך.

### 3. אבטחה
- אל תעלה את קובץ `.env` ל-Git
- הוסף `.env` ל-.gitignore
- שמור על המפתח בסוד

## תכונות AI חדשות
## New AI Features

### 1. ניתוח מתקדם של ערוצים
- זיהוי כלי נגינה מדויק יותר
- ניתוח מאפיינים ווקאליים מתקדם
- מניעת זיהוי שגוי של בס במקום ווקאל

### 2. המלצות AI מתקדמות
- המלצות פלאגינים מותאמות אישית
- הגדרות ספציפיות לכל פלאגין
- הסברים מפורטים לכל המלצה

### 3. שילוב GPT-4/Claude
- שליחת תיאור הערוץ ל-AI
- קבלת המלצות מבוססות ניתוח מתקדם
- תמיכה בפלאגינים מקצועיים

## איך זה עובד
## How It Works

1. **ניתוח אודיו**: המערכת מנתחת את הקובץ עם YAMNet וניתוח מסורתי
2. **יצירת תיאור**: נוצר תיאור מפורט של הערוץ עם כל המאפיינים
3. **שליחה ל-AI**: התיאור נשלח ל-GPT-4 לקבלת המלצות
4. **עיבוד תשובה**: התשובה מעובדת ומוצגת למשתמש

## פלאגינים נתמכים
## Supported Plugins

### EQ Plugins
- FabFilter Pro-Q3
- Waves H-EQ
- iZotope Ozone

### Compression
- Waves CLA-2A
- FabFilter Pro-C2
- Universal Audio LA-2A

### Reverb
- Valhalla Room
- Waves H-Reverb
- FabFilter Pro-R

### Delay
- Soundtoys EchoBoy
- Waves H-Delay
- FabFilter Timeless

### Saturation
- Soundtoys Decapitator
- Waves Kramer Tape
- FabFilter Saturn

## פתרון בעיות
## Troubleshooting

### API Key לא עובד
1. בדוק שהמפתח נכון
2. בדוק שיש לך קרדיטים ב-OpenAI
3. בדוק שהמפתח לא פג תוקף

### AI לא מגיב
1. בדוק חיבור לאינטרנט
2. בדוק שהמפתח מוגדר נכון
3. בדוק קונסול לשגיאות

### זיהוי שגוי של כלי נגינה
1. המערכת נותנת עדיפות לווקאל
2. אם יש ווקאל, לא יזוהה בס
3. בדוק את הקונסול לפרטים

## עדכונים עתידיים
## Future Updates

- שילוב Claude API
- תמיכה בפלאגינים נוספים
- ניתוח מתקדם יותר
- המלצות מותאמות לז'אנר 