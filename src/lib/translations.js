import { useContext } from 'react';
import { LanguageContext } from '../App';

export const translations = {
  he: {
    // כללי
    loading: 'טוען...',
    error: 'שגיאה',
    success: 'הצלחה',
    cancel: 'ביטול',
    save: 'שמור',
    delete: 'מחק',
    edit: 'ערוך',
    close: 'סגור',
    back: 'חזור',
    next: 'הבא',
    previous: 'קודם',
    submit: 'שלח',
    reset: 'אפס',
    export: 'ייצא',
    import: 'ייבא',
    
    // ניווט
    dashboard: 'לוח בקרה',
    vocalAnalysis: 'ניתוח ערוץ שירה',
    sketches: 'יצירת סקיצות',
    sessions: 'ניהול סשנים',
    recommendations: 'המלצות ייצור',
    exportVersions: 'יצוא גרסאות',
    credits: 'קרדיטים וחוזים',
    verification: 'אימות משתמש',
    
    // ניתוח פיץ'
    pitchAnalysis: 'ניתוח פיץ\' ודינמיקה',
    pitchAccuracy: 'דיוק פיץ\'',
    stability: 'יציבות',
    identifiedIssues: 'בעיות שזוהו',
    noSignificantIssues: 'אין בעיות משמעותיות',
    
    // ניתוח טכני
    technicalAnalysis: 'ניתוח טכני מתקדם',
    breathControl: 'שליטת נשימה',
    articulation: 'הגייה',
    timing: 'תזמון',
    dynamics: 'דינמיקה',
    technicalMetrics: 'מדדים טכניים',
    vocalProfile: 'פרופיל קולי',
    
    // ניתוח רגשי
    emotionAnalysis: 'ניתוח רגשי',
    primaryEmotion: 'רגש ראשי',
    secondaryEmotion: 'רגש משני',
    emotionalIntensity: 'עוצמה רגשית',
    
    // המלצות מיקס
    mixRecommendations: 'המלצות מיקס מקצועיות',
    highPriority: 'גבוה',
    mediumPriority: 'בינוני',
    lowPriority: 'נמוך',
    recommendedPlugins: 'פלאגינים מומלצים',
    recommendedSettings: 'הגדרות מומלצות',
    
    // תובנות AI
    aiInsights: 'תובנות AI',
    exportPDF: 'ייצא PDF',
    
    // משוב
    helpSystemLearn: 'עזור למערכת ללמוד',
    feedbackDescription: 'המשוב שלך עוזר למערכת לשפר את הניתוחים הבאים',
    analysisAccuracy: 'דיוק הניתוח',
    recommendationUsefulness: 'שימושיות ההמלצות',
    additionalNotes: 'הערות נוספות לשיפור המערכת...',
    submitFeedback: 'שלח משוב',
    
    // סטטיסטיקות למידה
    learningStats: 'סטטיסטיקות למידה AI',
    totalAnalyses: 'ניתוחים שבוצעו',
    modelVersion: 'גרסת מודל',
    vocalTypesAnalyzed: 'סוגי קול נותחו',
    averageAccuracy: 'דיוק ממוצע',
    systemLearning: 'המערכת לומדת ומשפרת את עצמה עם כל ניתוח!',
    resetData: 'אפס נתונים',
    initialValue: '(ערך התחלתי)',
    
    // הודעות
    fileTooLarge: 'הקובץ גדול מדי. אנא בחר קובץ קטן מ-50MB.',
    unsupportedFileType: 'סוג קובץ לא נתמך. אנא בחר קובץ WAV, MP3 או FLAC.',
    fileTooLong: 'הקובץ ארוך מדי. אנא בחר קובץ קצר מ-10 דקות.',
    analysisFailed: 'לא הצלחנו לנתח את הקובץ. אנא נסה קובץ אחר.',
    browserNotSupported: 'הדפדפן שלך לא תומך בניתוח אודיו. אנא נסה דפדפן אחר.',
    fileCorrupted: 'הקובץ פגום או לא תקין. אנא נסה קובץ אחר.',
    pdfExportError: 'שגיאה בייצוא PDF. נסה שוב.',
    feedbackRequired: 'אנא דרג את הניתוח לפני שליחת המשוב',
    feedbackSubmitted: 'תודה על המשוב! המערכת תשתמש במידע זה כדי לשפר את הניתוחים הבאים.',
    resetConfirmation: 'האם אתה בטוח שברצונך לאפס את נתוני הלמידה? פעולה זו תמחק את כל ההיסטוריה.',
    
    // תיאורים
    vocalRangeDescription: 'ניתוח זה מזהה את הטווח הקולי המדויק של הזמר, כולל הסולם המוזיקלי של השיר.',
    pitchAnalysisDescription: 'ניתוח זה בודק את הדיוק של הזמר ביחס לצלילים המוזיקליים הנכונים.',
    technicalAnalysisDescription: 'ניתוח זה בודק את הטכניקה הקולית של הזמר.',
    emotionAnalysisDescription: 'ניתוח זה מזהה את הרגשות והטון הרגשי של הביצוע הקולי.',
    mixRecommendationsDescription: 'המלצות אלה מבוססות על ניתוח מעמיק של הקול ומטרתן להביא את ערוץ השירה לרמה המקצועית הגבוהה ביותר.',
    
    // דרישות מערכת
    systemRequirements: 'דרישות מערכת',
    maxFileSize: 'גודל קובץ: עד 50MB',
    maxDuration: 'אורך קובץ: עד 10 דקות',
    supportedFormats: 'פורמטים: WAV, MP3, FLAC',
    supportedBrowsers: 'דפדפן: Chrome, Firefox, Safari',
    
    // איך להשתמש
    howToUse: 'איך להשתמש:',
    step1: '1. העלה קובץ אודיו (WAV, MP3, FLAC)',
    step2: '2. לחץ על "התחל ניתוח AI"',
    step3: '3. המתן לסיום הניתוח (2-3 דקות)',
    step4: '4. קבל המלצות מותאמות אישית',
    step5: '5. עבור ל"המלצות ייצור" לקבלת פלאגינים',
    
    // הסר את כל המפתחות והערכים שקשורים ל-advancedAnalysis או לניתוח מתקדם.
    
    // נגן אודיו
    listenToFile: 'האזן לקובץ',
    play: 'נגן',
    pause: 'השהה',
    
    // PDF
    vocalAnalysisReport: 'דוח ניתוח ערוץ שירה',
    fileName: 'שם קובץ',
    analysisDate: 'תאריך ניתוח',
    unknown: 'לא ידוע',
    
    // רגשות
    passion: 'תשוקה',
    intensity: 'עוצמה',
    joy: 'שמחה',
    gentleness: 'עדינות',
    sadness: 'עצב',
    anger: 'כעס',
    
    // סוגי קול
    tenor: 'טנור',
    bass: 'בס',
    baritone: 'בריטון',
    alto: 'אלט',
    soprano: 'סופרן',
    
    // בעיות
    highPitchInstability: 'חוסר יציבות בפיץ\' גבוה',
    unevenVibrato: 'ויברטו לא אחיד',
    sharpVolumeChanges: 'שינויים חדים בעוצמה',
    insufficientData: 'אין מספיק נתונים לניתוח מדויק',
    
    // Export versions translations
    exportVersionsTitle: 'אפשרויות ייצוא',
    exportVersionsSubtitle: 'בחר את סוג הייצוא המתאים לפרויקט שלך',
    instrumental: 'אינסטרומנטל',
    instrumentalDesc: 'גרסה ללא קול לשימוש ברדיו או רקע',
    acapella: 'אקפלה',
    acapellaDesc: 'קול בלבד ללא מוזיקה',
    radio: 'רדיו',
    radioDesc: 'גרסה מותאמת לרדיו עם קומפרסיה',
    stems: 'STEMS',
    stemsDesc: 'קבצים נפרדים לכל ערוץ',
    export: 'ייצא',
    exportInfo: 'מידע על ייצוא',
    supportedFormatsExport: 'פורמטים נתמכים: WAV, MP3, FLAC',
    qualityOptions: 'אפשרויות איכות: 44.1kHz, 48kHz, 96kHz',
    
    // Sidebar translations
    dashboard: 'לוח בקרה',
    vocalAnalysis: 'ניתוח ערוץ שירה',
    sketches: 'יצירת סקיצות',
    sessions: 'ניהול סשנים',
    productionRecommendations: 'המלצות הפקה',
    exportVersions: 'יצוא גרסאות',
    creditsContracts: 'קרדיטים וחוזים',
    userVerification: 'אימות משתמש',
    aiProductionSystem: 'מערכת AI להפקה ומיקס',
    productionTools: 'כלי הפקה',
    quickStats: 'סטטיסטיקות מהירות',
    activeProjects: 'פרויקטים פעילים',
    weeklyAnalyses: 'ניתוחים השבוע',
    sketchesCreated: 'סקיצות שנוצרו',
    premiumActive: 'פרימיום פעיל',
    freeTier: 'חינמי - 1/1 פרויקט',
    basicTier: 'בסיסי - 2/3 פרויקטים',
    expiryDate: 'תוקף',
    activeSessions: 'סשנים פעילים',
    sessionManagement: 'ניהול סשנים',
    sessionManagementDescription: 'עקוב אחר סשנים, קבצים ופידבקים',
    mySessions: 'הסשנים שלי',
    creditsManagement: 'ניהול קרדיטים',
    sessionModuleBuilding: 'מודול ניהול סשנים בבנייה.',
    sessionManagementFeatures: 'כאן תוכל לנהל את כל הסשנים שלך, להזמין משתתפים ולשתף קבצים.',
    
    // Sketch Creation translations
    quickSketchCreation: 'יצירת סקיצות מהירה',
    sketchCreationDescription: 'הפוך רעיון לסקיצה מוזיקלית בכמה לחיצות',
    createNewSketch: 'יצירת סקיצה חדשה',
    selectProject: 'בחר פרויקט',
    selectProjectPlaceholder: '...בחר פרויקט',
    project1: 'פרויקט 1',
    project2: 'פרויקט 2',
    project3: 'פרויקט 3',
    createNewProject: 'צור פרויקט חדש',
    lyricsOrGeneralIdea: 'מילים או רעיון כללי',
    lyricsPlaceholder: 'הכנס את המילים, הרעיון הכללי, או התיאור של השיר...',
    musicalStyle: 'סגנון מוזיקלי',
    musicalStylePlaceholder: '...לדוגמה: פופ קצבי, בלדת רוק, היפ הופ',
    createSketchWithAI: 'צור סקיצה עם AI',
    recentSketches: 'סקיצות אחרונות',
    noSketchesToShow: 'אין סקיצות להצגה',
    aiSettings: 'הגדרות AI',
    highQuality: 'איכות גבוהה',
    automaticHarmonies: 'הרמוניות אוטומטיות',
    
    // Credits and Contracts translations
    creditsAndContracts: 'קרדיטים וחוזים',
    creditsAndContractsDescription: 'נהל זכויות יוצרים, קרדיטים וחוזים בצורה אוטומטית',
    creditsModuleBuilding: 'מודול קרדיטים וחוזים בבנייה.',
    creditsManagementFeatures: 'כאן תוכל לנהל את חלוקת הזכויות וליצור חוזים דיגיטליים.',
    
    // Payment Alert translations
    subscriptionExpired: 'המנוי פג תוקף',
    subscriptionExpiredMessage: 'יש לחדש את המנוי כדי להמשיך להשתמש בשירות',
    renewSubscription: 'חדש מנוי',
    subscriptionExpiringSoon: 'המנוי עומד לפוג',
    renewNow: 'חדש עכשיו',
    paymentFailed: 'תשלום נכשל',
    paymentFailedMessage: 'התשלום האחרון נכשל. יש לבדוק את אמצעי התשלום',
    updatePayment: 'עדכן תשלום',
    projectLimitReached: 'הגעת למגבלת הפרויקטים',
    projectLimitReachedMessage: 'השתמשת בכל הפרויקטים הזמינים במנוי שלך. שדרג למנוי גבוה יותר להמשך שימוש',
    upgradeNow: 'שדרג עכשיו',
    subscriptionActive: 'המנוי פעיל',
    subscriptionActiveMessage: 'כל התכונות זמינות לשימוש',
    
    // Payment Modal translations
    securePayment: 'תשלום מאובטח',
    creditCard: 'כרטיס אשראי',
    creditCardDescription: 'Visa, Mastercard, American Express',
    paypal: 'PayPal',
    paypalDescription: 'תשלום מהיר ובטוח',
    applePay: 'Apple Pay',
    applePayDescription: 'תשלום מהיר עם Apple Pay',
    googlePay: 'Google Pay',
    googlePayDescription: 'תשלום מהיר עם Google Pay',
    cardNumber: 'מספר כרטיס',
    cardNumberPlaceholder: '1234 5678 9012 3456',
    expiryDate: 'תאריך תפוגה',
    expiryPlaceholder: 'MM/YY',
    cvv: 'CVV',
    cvvPlaceholder: '123',
    cardholderName: 'שם בעל הכרטיס',
    namePlaceholder: 'שם מלא',
    payNow: 'שלם עכשיו',
    processing: 'מעבד...',
    paymentSecure: 'התשלום מאובטח ומצפין',
    poweredByStripe: 'מופעל על ידי Stripe',
    
    // --- Dashboard & Sidebar missing translations ---
    mainDashboard: 'לוח בקרה ראשי',
    welcomeMessage: 'ברוך הבא למערכת',
    quickActions: 'פעולות מהירות',
    recentProjects: 'פרויקטים אחרונים',
    showAll: 'הצג הכל',
    lastActivity: 'פעילות אחרונה',
    noActivity: 'אין פעילות',
    popSongExample: 'שיר פופ לדוגמה',
    singerExample: 'זמר לדוגמה',
    mix: 'מיקס',
    pop: 'פופ',
    emotionalBallad: 'בלדה רגשית',
    singerFemaleExample: 'זמרת לדוגמה',
    recording: 'הקלטה',
    folk: 'פולק',
    newProject: 'פרויקט חדש',
    quickActionVocalAnalysisSubtitle: 'בצע ניתוח שירה מהיר',
    quickActionCreateSketchSubtitle: 'צור סקיצה חדשה במהירות',
    quickActionNewSessionSubtitle: 'התחל סשן חדש',
    quickActionProductionRecommendationsSubtitle: 'קבל המלצות הפקה',
  },
  
  en: {
    // General
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    close: 'Close',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    submit: 'Submit',
    reset: 'Reset',
    export: 'Export',
    import: 'Import',
    
    // Navigation
    dashboard: 'Dashboard',
    vocalAnalysis: 'Vocal Analysis',
    sketches: 'Sketch Creation',
    sessions: 'Session Management',
    productionRecommendations: 'Production Recommendations',
    exportVersions: 'Export Versions',
    creditsContracts: 'Credits & Contracts',
    userVerification: 'User Verification',
    aiProductionSystem: 'AI Production & Mixing System',
    productionTools: 'Production Tools',
    quickStats: 'Quick Statistics',
    activeProjects: 'Active Projects',
    weeklyAnalyses: 'Weekly Analyses',
    sketchesCreated: 'Sketches Created',
    premiumActive: 'Premium Active',
    freeTier: 'Free - 1/1 Project',
    basicTier: 'Basic - 2/3 Projects',
    expiryDate: 'Expiry',
    activeSessions: 'Active Sessions',
    sessionManagement: 'Session Management',
    sessionManagementDescription: 'Track sessions, files and feedback',
    mySessions: 'My Sessions',
    creditsManagement: 'Credits Management',
    sessionModuleBuilding: 'Session management module under construction.',
    sessionManagementFeatures: 'Here you can manage all your sessions, invite participants and share files.',
    
    // Sketch Creation translations
    quickSketchCreation: 'Quick Sketch Creation',
    sketchCreationDescription: 'Turn an idea into a musical sketch in a few clicks',
    createNewSketch: 'Create New Sketch',
    selectProject: 'Select Project',
    selectProjectPlaceholder: '...select project',
    project1: 'Project 1',
    project2: 'Project 2',
    project3: 'Project 3',
    createNewProject: 'Create New Project',
    lyricsOrGeneralIdea: 'Lyrics or General Idea',
    lyricsPlaceholder: 'Enter the lyrics, general idea, or description of the song...',
    musicalStyle: 'Musical Style',
    musicalStylePlaceholder: '...for example: upbeat pop, rock ballad, hip hop',
    createSketchWithAI: 'Create Sketch with AI',
    recentSketches: 'Recent Sketches',
    noSketchesToShow: 'No sketches to show',
    aiSettings: 'AI Settings',
    highQuality: 'High Quality',
    automaticHarmonies: 'Automatic Harmonies',
    
    // Credits and Contracts translations
    creditsAndContracts: 'Credits & Contracts',
    creditsAndContractsDescription: 'Manage copyrights, credits and contracts automatically',
    creditsModuleBuilding: 'Credits and contracts module under construction.',
    creditsManagementFeatures: 'Here you can manage rights distribution and create digital contracts.',
    
    // Payment Alert translations
    subscriptionExpired: 'Subscription Expired',
    subscriptionExpiredMessage: 'Please renew your subscription to continue using the service',
    renewSubscription: 'Renew Subscription',
    subscriptionExpiringSoon: 'Subscription Expiring Soon',
    renewNow: 'Renew Now',
    paymentFailed: 'Payment Failed',
    paymentFailedMessage: 'The last payment failed. Please check your payment method',
    updatePayment: 'Update Payment',
    projectLimitReached: 'Project Limit Reached',
    projectLimitReachedMessage: 'You have used all available projects in your subscription. Upgrade to a higher plan to continue',
    upgradeNow: 'Upgrade Now',
    subscriptionActive: 'Subscription Active',
    subscriptionActiveMessage: 'All features are available for use',
    
    // Payment Modal translations
    securePayment: 'Secure Payment',
    creditCard: 'Credit Card',
    creditCardDescription: 'Visa, Mastercard, American Express',
    paypal: 'PayPal',
    paypalDescription: 'Fast and secure payment',
    applePay: 'Apple Pay',
    applePayDescription: 'Fast payment with Apple Pay',
    googlePay: 'Google Pay',
    googlePayDescription: 'Fast payment with Google Pay',
    cardNumber: 'Card Number',
    cardNumberPlaceholder: '1234 5678 9012 3456',
    expiryDate: 'Expiry Date',
    expiryPlaceholder: 'MM/YY',
    cvv: 'CVV',
    cvvPlaceholder: '123',
    cardholderName: 'Cardholder Name',
    namePlaceholder: 'Full Name',
    payNow: 'Pay Now',
    processing: 'Processing...',
    paymentSecure: 'Payment is secure and encrypted',
    poweredByStripe: 'Powered by Stripe',
    
    // הסר את כל המפתחות והערכים שקשורים ל-advancedAnalysis או לניתוח מתקדם.
    
    // Audio Player
    listenToFile: 'Listen to File',
    play: 'Play',
    pause: 'Pause',
    
    // PDF
    vocalAnalysisReport: 'Vocal Analysis Report',
    fileName: 'File Name',
    analysisDate: 'Analysis Date',
    unknown: 'Unknown',
    
    // Emotions
    passion: 'Passion',
    intensity: 'Intensity',
    joy: 'Joy',
    gentleness: 'Gentleness',
    sadness: 'Sadness',
    anger: 'Anger',
    
    // Vocal Types
    tenor: 'Tenor',
    bass: 'Bass',
    baritone: 'Baritone',
    alto: 'Alto',
    soprano: 'Soprano',
    
    // Issues
    highPitchInstability: 'High pitch instability',
    unevenVibrato: 'Uneven vibrato',
    sharpVolumeChanges: 'Sharp volume changes',
    insufficientData: 'Insufficient data for accurate analysis',
    
    // Export versions translations
    exportVersionsTitle: 'Export Options',
    exportVersionsSubtitle: 'Choose the export type that fits your project',
    instrumental: 'Instrumental',
    instrumentalDesc: 'Version without vocals for radio or background use',
    acapella: 'Acapella',
    acapellaDesc: 'Vocals only without music',
    radio: 'Radio',
    radioDesc: 'Radio-optimized version with compression',
    stems: 'STEMS',

    // Auto-ML Technologies
    autoMLTechnologies: 'טכנולוגיות Auto-ML מתקדמות',
    cnnKeyDetection: 'CNN לזיהוי סולמות',
    cnnDescription: 'רשת נוירונים קונבולוציונית לזיהוי דפוסים מתקדם ודיוק גבוה בזיהוי סולמות',
    madmomAnalysis: 'madmom לניתוח מוזיקלי',
    madmomDescription: 'זיהוי ביטים ומקצב, חילוץ מלודיה וניתוח אקורדים מתקדם',
    autoMLLearning: 'Auto-ML למידה עצמית',
    autoMLDescription: 'אופטימיזציה אוטומטית, בחירת מודל חכמה ולמידה מתמשכת',
    stemsDesc: 'Separate files for each channel',
    export: 'Export',
    exportInfo: 'Export Information',
    supportedFormatsExport: 'Supported formats: WAV, MP3, FLAC',
    qualityOptions: 'Quality options: 44.1kHz, 48kHz, 96kHz',
  }
};

// Hook לשימוש בתרגומים
export const useTranslation = () => {
  const { language } = useContext(LanguageContext);
  
  const t = (key) => {
    return translations[language]?.[key] || key;
  };
  
  return t;
}; 