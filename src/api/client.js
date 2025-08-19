// API Client - שימוש ב-URL דינמי עם תמיכה ב-Vite env
// קדימות: VITE_API_BASE_URL → אותו דומיין עם /api → localhost לפיתוח
const getApiBaseUrl = () => {
  // שימוש ישיר במשתנה הסביבה של Vite
  const viteEnv = import.meta.env.VITE_API_BASE_URL;

  if (viteEnv && typeof viteEnv === 'string' && viteEnv.length > 0) {
    return viteEnv.replace(/\/$/, '');
  }

  // אם אין משתנה סביבה, נשתמש בכתובת Render.com
  if (typeof window !== 'undefined' && window.location && window.location.origin) {
    // בדיקה אם אנחנו על localhost
    if (window.location.origin.includes('localhost')) {
      return 'http://localhost:10000/api';
    }
    // אם לא, נשתמש ב-Render.com
    return 'https://kr-studio-completeai.onrender.com/api';
  }

  // ברירת מחדל - Render.com
  return 'https://kr-studio-completeai.onrender.com/api';
};

const API_BASE_URL = getApiBaseUrl();

// Helper function for API calls with improved error handling
const apiCall = async (endpoint, options = {}) => {
  const url = `${getApiBaseUrl()}${endpoint}`;
  console.log(`🌐 [API] שולח בקשה ל: ${url}`);
  console.log(`🌐 [API] שיטת בקשה: ${options.method || 'GET'}`);
  console.log(`🌐 [API] כותרות:`, options.headers);
  console.log(`🌐 [API] גוף הבקשה:`, options.body);
  
  try {
    const startTime = performance.now();
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    const responseTime = performance.now() - startTime;
    
    console.log(`🌐 [API] תשובה התקבלה ב: ${responseTime.toFixed(0)}ms`);
    console.log(`🌐 [API] סטטוס תשובה: ${response.status} ${response.statusText}`);
    console.log(`🌐 [API] כותרות תשובה:`, Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      console.error(`❌ [API] שגיאה בתשובה: ${response.status} ${response.statusText}`);
      const errorText = await response.text();
      console.error(`❌ [API] תוכן שגיאה:`, errorText);
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`🌐 [API] נתוני תשובה:`, data);
    
    // בדיקה אם התשובה כוללת שדה success
    if (data && typeof data.success === 'boolean') {
      if (!data.success) {
        console.error(`❌ [API] תשובה נכשלה:`, data.error || 'הבקשה נכשלה');
        throw new Error(data.error || 'הבקשה נכשלה');
      }
      console.log(`✅ [API] תשובה הצליחה`);
    }
    
    return data;
  } catch (error) {
    console.error(`❌ [API] שגיאה בבקשה ל-${url}:`, error);
    console.error(`❌ [API] פרטי השגיאה:`, {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    throw error;
  }
};

// Upload audio file with progress tracking
export const uploadAudio = async (file, onProgress = null, abortController = null) => {
  console.log(`📤 [API] מתחיל העלאת קובץ: ${file.name}`);
  console.log(`📤 [API] גודל קובץ: ${file.size} bytes`);
  console.log(`📤 [API] סוג קובץ: ${file.type}`);
  
  try {
    const formData = new FormData();
    formData.append('audio', file);
    
    console.log(`📤 [API] FormData נוצר עם ${formData.entries().length} שדות`);
    
    const startTime = performance.now();
    const response = await fetch(`${getApiBaseUrl()}/api/upload`, {
      method: 'POST',
      body: formData,
      signal: abortController?.signal,
    });
    const responseTime = performance.now() - startTime;
    
    console.log(`📤 [API] העלאה הושלמה ב: ${responseTime.toFixed(0)}ms`);
    console.log(`📤 [API] סטטוס תשובה: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ [API] שגיאה בהעלאה: ${response.status} ${response.statusText}`);
      console.error(`❌ [API] תוכן שגיאה:`, errorText);
      throw new Error(`העלאה נכשלה: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`📤 [API] תוצאת העלאה:`, data);
    
    if (data && data.fileId) {
      console.log(`✅ [API] קובץ הועלה בהצלחה, ID: ${data.fileId}`);
    } else {
      console.error(`❌ [API] לא התקבל fileId מהשרת`);
      throw new Error('לא התקבל מזהה קובץ מהשרת');
    }
    
    return data;
  } catch (error) {
    console.error(`❌ [API] שגיאה בהעלאת קובץ ${file.name}:`, error);
    throw error;
  }
};

// Separate audio with Demucs
export const separateAudio = async (fileId, projectName) => {
  console.log(`🎵 [API] מתחיל הפרדת אודיו: fileId=${fileId}, projectName=${projectName}`);
  
  try {
    const startTime = performance.now();
    const data = await apiCall('/api/separate', {
      method: 'POST',
      body: JSON.stringify({ fileId, projectName }),
    });
    const responseTime = performance.now() - startTime;
    
    console.log(`🎵 [API] הפרדה הושלמה ב: ${responseTime.toFixed(0)}ms`);
    console.log(`🎵 [API] תוצאת הפרדה:`, data);
    
    return data;
  } catch (error) {
    console.error(`❌ [API] שגיאה בהפרדת אודיו:`, error);
    throw error;
  }
};

// Get separation progress with polling
export const getSeparationProgress = async (fileId) => {
  console.log(`📊 [API] בודק התקדמות הפרדה: fileId=${fileId}`);
  
  try {
    const startTime = performance.now();
    const data = await apiCall(`/api/separate/${fileId}/progress`);
    const responseTime = performance.now() - startTime;
    
    console.log(`📊 [API] התקדמות התקבלה ב: ${responseTime.toFixed(0)}ms`);
    console.log(`📊 [API] נתוני התקדמות:`, data);
    
    return data;
  } catch (error) {
    console.error(`❌ [API] שגיאה בבדיקת התקדמות:`, error);
    throw error;
  }
};

// Get all projects
export const getProjects = async () => {
  console.log(`📁 [API] טוען רשימת פרויקטים`);
  
  try {
    const startTime = performance.now();
    const data = await apiCall('/api/projects');
    const responseTime = performance.now() - startTime;
    
    console.log(`📁 [API] פרויקטים נטענו ב: ${responseTime.toFixed(0)}ms`);
    console.log(`📁 [API] מספר פרויקטים: ${Array.isArray(data) ? data.length : 'לא מערך'}`);
    
    return data;
  } catch (error) {
    console.error(`❌ [API] שגיאה בטעינת פרויקטים:`, error);
    throw error;
  }
};

// Get specific project
export const getProject = async (id) => {
  console.log(`📁 [API] טוען פרויקט: id=${id}`);
  
  try {
    const startTime = performance.now();
    const data = await apiCall(`/api/projects/${id}`);
    const responseTime = performance.now() - startTime;
    
    console.log(`📁 [API] פרויקט נטען ב: ${responseTime.toFixed(0)}ms`);
    console.log(`📁 [API] פרטי פרויקט:`, data);
    
    return data;
  } catch (error) {
    console.error(`❌ [API] שגיאה בטעינת פרויקט ${id}:`, error);
    throw error;
  }
};

// Delete project
export const deleteProject = async (id) => {
  console.log(`🗑️ [API] מוחק פרויקט: id=${id}`);
  
  try {
    const startTime = performance.now();
    const data = await apiCall(`/api/projects/${id}`, {
      method: 'DELETE',
    });
    const responseTime = performance.now() - startTime;
    
    console.log(`🗑️ [API] פרויקט נמחק ב: ${responseTime.toFixed(0)}ms`);
    console.log(`🗑️ [API] תוצאת מחיקה:`, data);
    
    return data;
  } catch (error) {
    console.error(`❌ [API] שגיאה במחיקת פרויקט ${id}:`, error);
    throw error;
  }
};

// Download stem
export const downloadStem = async (projectId, stemName) => {
  console.log(`⬇️ [API] מוריד stem: projectId=${projectId}, stemName=${stemName}`);
  
  try {
    const startTime = performance.now();
    const response = await fetch(`${getApiBaseUrl()}/api/projects/${projectId}/download/${stemName}`);
    const responseTime = performance.now() - startTime;
    
    console.log(`⬇️ [API] הורדה הושלמה ב: ${responseTime.toFixed(0)}ms`);
    console.log(`⬇️ [API] סטטוס הורדה: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ [API] שגיאה בהורדה: ${response.status} ${response.statusText}`);
      console.error(`❌ [API] תוכן שגיאה:`, errorText);
      throw new Error(`הורדה נכשלה: ${response.status} ${response.statusText}`);
    }
    
    const blob = await response.blob();
    console.log(`✅ [API] stem הורד בהצלחה, גודל: ${blob.size} bytes`);
    
    return blob;
  } catch (error) {
    console.error(`❌ [API] שגיאה בהורדת stem:`, error);
    throw error;
  }
};

// Health check
export const healthCheck = async () => {
  console.log(`🏥 [API] בודק בריאות שרת`);
  
  try {
    const startTime = performance.now();
    const data = await apiCall('/api/health');
    const responseTime = performance.now() - startTime;
    
    console.log(`🏥 [API] בדיקת בריאות הושלמה ב: ${responseTime.toFixed(0)}ms`);
    console.log(`🏥 [API] סטטוס שרת:`, data);
    
    return data;
  } catch (error) {
    console.error(`❌ [API] שגיאה בבדיקת בריאות:`, error);
    throw error;
  }
};

// Quick connection test - מהיר יותר
export const quickConnectionTest = async () => {
  console.log(`⚡ [API] בדיקת חיבור מהירה`);
  
  try {
    const startTime = performance.now();
    const data = await apiCall('/api/health');
    const responseTime = performance.now() - startTime;
    
    console.log(`⚡ [API] בדיקת חיבור מהירה הושלמה ב: ${responseTime.toFixed(0)}ms`);
    console.log(`⚡ [API] תוצאת בדיקה:`, data);
    
    return { success: true, responseTime, data };
  } catch (error) {
    console.error(`❌ [API] שגיאה בבדיקת חיבור מהירה:`, error);
    return { success: false, error: error.message };
  }
};

// בדיקה נוספת של חיבור לשרת
export const testServerConnection = async () => {
  console.log(`🔗 [API] בדיקת חיבור לשרת`);
  
  try {
    const startTime = performance.now();
    const data = await apiCall('/api/health');
    const responseTime = performance.now() - startTime;
    
    console.log(`🔗 [API] בדיקת חיבור הושלמה ב: ${responseTime.toFixed(0)}ms`);
    console.log(`🔗 [API] תוצאת בדיקה:`, data);
    
    if (data && data.status === 'OK') {
      console.log(`✅ [API] שרת מחובר ופעיל`);
      return true;
    } else {
      console.log(`❌ [API] שרת לא מגיב כראוי`);
      return false;
    }
  } catch (error) {
    console.error(`❌ [API] שגיאה בבדיקת חיבור לשרת:`, error);
    return false;
  }
}; 