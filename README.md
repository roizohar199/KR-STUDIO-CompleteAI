# KR-STUDIO CompleteAI - Advanced Audio Analysis Platform

## טכנולוגיות מתקדמות לניתוח שמע

האתר כולל טכנולוגיות מתקדמות לניתוח שמע מבוססות על:

### 🎵 Essentia.js - ניתוח שמע מתקדם
- **זיהוי מפתח מוזיקלי מתקדם** עם אלגוריתמים מרובים:
  - Temperley Key Detection
  - Krumhansl-Schmuckler Key Detection  
  - Edmaat Key Detection
  - ניתוח כורדים (Chord Analysis)
  - ניתוח ספקטרלי (Spectral Analysis)
- **ניתוח קצב (Rhythm Analysis)** - זיהוי BPM, גרוב, ומידות
- **ניתוח הרמוני (Harmonic Analysis)** - זיהוי כורדים, פרוגרסיות
- **ניתוח מלודי (Melodic Analysis)** - זיהוי מלודיות, אינטרוולים
- **ניתוח דינמי (Dynamics Analysis)** - עוצמה, דחיסה, טווח דינמי

### 🤖 TensorFlow.js - למידת מכונה
- **ניתוח רגשות (Sentiment Analysis)** - אנרגיה, valence, danceability
- **חיזוי ז'אנר** מבוסס על מאפיינים מוזיקליים
- **ניתוח דמיון** לשירים אחרים
- **זיהוי השפעות מוזיקליות**

### 🎯 שיפורים אחרונים בזיהוי מפתח מוזיקלי

#### בעיות שטופלו:
- **עקביות זיהוי**: תיקון בעיית זיהוי מפתח שונה בכל פעם
- **דיוק מוגבר**: שילוב 5 אלגוריתמים שונים לזיהוי מפתח
- **עיבוד מקדים**: נרמול נתונים והסרת רעשי רקע
- **ניתוח הסכמה**: בחירת התוצאה הטובה ביותר מתוך כל האלגוריתמים

#### טכניקות חדשות:
- **עיבוד מקדים דטרמיניסטי**: נרמול נתונים וסינון רעשים
- **ניתוח כורדים**: זיהוי מפתח על בסיס כורדים בשיר
- **ניתוח ספקטרלי**: זיהוי מפתח על בסיס תדרים דומיננטיים
- **מערכת הסכמה**: בחירת מפתח לפי הסכמה בין אלגוריתמים
- **Seed קבוע**: הבטחת עקביות בתוצאות

### 📊 בסיס נתונים מוזיקלי (Music Database)
- **חיפוש שירים** עם פרמטרים מתקדמים
- **סינון ומיון** לפי מפתח, BPM, ז'אנר
- **ניתוח דמיון** לשירים אחרים
- **המלצות** מבוססות על העדפות המשתמש

### ☁️ עיבוד בענן (Cloud Processing)
- **הסרת ווקאלים** עם GPU acceleration
- **Mastering אוטומטי** עם אלגוריתמים מתקדמים
- **הפרדת stems** (כלי, תופים, בס, ווקאלים)
- **עיבוד מקביל** על שרתי GPU

### 🎨 ממשק משתמש מתקדם
- **עיצוב מודרני** עם Tailwind CSS
- **תמיכה בשפות** - עברית ואנגלית
- **ניתוח בזמן אמת** עם ויזואליזציות
- **ייצוא תוצאות** ל-PDF ו-Excel

## התקנה והפעלה

```bash
# התקנת תלויות
npm install

# הפעלה בפיתוח
npm run dev

# בנייה לפרודקשן
npm run build

# העלאה לשרת
node deploy.js
```

## תלויות עיקריות

- **React 18** - ספריית UI
- **Essentia.js** - ניתוח שמע מתקדם
- **TensorFlow.js** - למידת מכונה
- **Tailwind CSS** - עיצוב
- **Vite** - כלי בנייה

## תכונות מתקדמות

### ניתוח מפתח מוזיקלי משופר
- **5 אלגוריתמים שונים** לזיהוי מפתח
- **ניתוח הסכמה** בין אלגוריתמים
- **עיבוד מקדים** לנתונים עקביים
- **זיהוי כורדים וספקטרום** לתמיכה נוספת

### ניתוח רגשות מתקדם
- **אנרגיה** - רמת האנרגיה בשיר
- **Valence** - אופי השיר (חיובי/שלילי)
- **Danceability** - מידת הריקודיות
- **חיזוי ז'אנר** מבוסס על מאפיינים

### עיבוד בענן
- **הסרת ווקאלים** אוטומטית
- **Mastering** עם אלגוריתמים מתקדמים
- **הפרדת stems** לקבצים נפרדים
- **עיבוד מקביל** על GPU

## רישיון

MIT License - פרויקט פתוח לשימוש חופשי 