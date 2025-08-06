// שינוי ה-API_BASE_URL כדי שהמערכת תעבוד עם השרת החדש
// Backend עובד ב-Render
const API_BASE_URL = 'https://kr-studio-completeai.onrender.com/api';

// אם השרת רץ על דומיין אחר, שנה את זה לכתובת המלאה
// const API_BASE_URL = 'https://your-backend-domain.com/api';

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  try {
    console.log('[API] קריאה לשרת:', endpoint, options);
    const url = `${API_BASE_URL}${endpoint}`;
    console.log('[API] URL מלא:', url);
    
    const fetchOptions = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
      // הגדרות נוספות לביצועים
      signal: AbortSignal.timeout(300000), // 5 דקות timeout
    };
    
    console.log('[API] fetch options:', fetchOptions);
    console.log('[API] method:', fetchOptions.method);
    console.log('[API] headers:', fetchOptions.headers);
    console.log('[API] body:', fetchOptions.body);
    console.log('[API] body type:', typeof fetchOptions.body);
    console.log('[API] body length:', fetchOptions.body ? fetchOptions.body.length : 'N/A');
    
    console.log('[API] לפני fetch...');
    const response = await fetch(url, fetchOptions);
    console.log('[API] אחרי fetch...');
    
    console.log('[API] response status:', response.status);
    console.log('[API] response statusText:', response.statusText);
    console.log('[API] response headers:', response.headers);
    console.log('[API] response ok:', response.ok);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Network error' }));
      console.error('[API] שגיאת fetch:', url, error);
      console.error('[API] response status:', response.status);
      console.error('[API] response statusText:', response.statusText);
      throw new Error(error.error || `HTTP ${response.status}`);
    }
    
    console.log('[API] לפני response.json()...');
    const data = await response.json();
    console.log('[API] אחרי response.json()...');
    console.log('[API] תשובה מהשרת:', endpoint, data);
    console.log('[API] סוג תשובה:', typeof data);
    console.log('[API] האם יש success:', data && data.success);
    return data;
  } catch (err) {
    console.error('[API] שגיאה כללית ב-apiCall:', endpoint, err, err?.stack);
    console.error('[API] שם השגיאה:', err.name);
    console.error('[API] הודעת השגיאה:', err.message);
    console.error('[API] סוג השגיאה:', typeof err);
    
    // טיפול בשגיאות ספציפיות
    if (err.name === 'AbortError') {
      throw new Error('הבקשה נכשלה - timeout');
    }
    if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
      throw new Error('לא ניתן להתחבר לשרת - בדוק את החיבור לאינטרנט');
    }
    
    throw err;
  }
};

// Upload audio file with progress tracking
export const uploadAudio = async (file, onProgress = null, abortController = null) => {
  try {
    console.log('📤 ===== התחלת העלאה =====');
    console.log('📤 שם קובץ:', file.name);
    console.log('📤 גודל קובץ:', file.size, 'bytes');
    console.log('📤 סוג קובץ:', file.type);
    
    // בדיקת גודל הקובץ
    const maxSize = 200 * 1024 * 1024; // 200MB
    if (file.size > maxSize) {
      throw new Error(`הקובץ גדול מדי (${Math.round(file.size / 1024 / 1024)}MB). מקסימום: 200MB`);
    }
    
    console.log('✅ גודל קובץ תקין, יוצר FormData...');
    const formData = new FormData();
    formData.append('audio', file);

    console.log('📤 שולח בקשת העלאה לשרת...');
    console.log('📤 URL:', `${API_BASE_URL}/upload`);
    
    // שימוש ב-XMLHttpRequest לתמיכה בהתקדמות
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      
      // הגדרת timeout
      xhr.timeout = 900000; // 15 דקות
      
      // מעקב אחר התקדמות
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable && onProgress) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          console.log(`📤 התקדמות העלאה: ${percentComplete}%`);
          onProgress(percentComplete);
        }
      });
      
      // טיפול בתשובה
      xhr.addEventListener('load', () => {
        console.log('📤 תשובה מהשרת:', xhr.status, xhr.statusText);
        
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const result = JSON.parse(xhr.responseText);
            console.log('✅ קובץ הועלה בהצלחה!');
            console.log('✅ תוצאת העלאה:', result);
            console.log('✅ fileId:', result.file.id);
            console.log('✅ ===== העלאה הושלמה בהצלחה =====');
            resolve(result);
          } catch (parseError) {
            console.error('❌ שגיאה בפענוח תשובה:', parseError);
            reject(new Error('תשובה לא תקינה מהשרת'));
          }
        } else {
          console.error('❌ שגיאה בהעלאה:', xhr.status, xhr.statusText);
          try {
            const error = JSON.parse(xhr.responseText);
            reject(new Error(error.error || `HTTP ${xhr.status}`));
          } catch {
            reject(new Error(`HTTP ${xhr.status}`));
          }
        }
      });
      
      // טיפול בשגיאות
      xhr.addEventListener('error', () => {
        console.error('❌ שגיאת רשת בהעלאה');
        reject(new Error('שגיאת רשת - בדוק את החיבור לאינטרנט'));
      });
      
      xhr.addEventListener('timeout', () => {
        console.error('❌ timeout בהעלאה');
        reject(new Error('העלאה נכשלה - timeout (15 דקות). נסה שוב או בדוק את החיבור לאינטרנט'));
      });
      
      xhr.addEventListener('abort', () => {
        console.error('❌ העלאה בוטלה');
        reject(new Error('העלאה בוטלה'));
      });
      
      // שליחת הבקשה
      xhr.open('POST', `${API_BASE_URL}/upload`);
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send(formData);
      
      // אם יש AbortController, שמור את ה-XHR כדי שנוכל לבטל
      if (abortController) {
        abortController.xhr = xhr;
      }
    });
    
  } catch (error) {
    console.error('❌ ===== שגיאה בהעלאה =====');
    console.error('❌ פרטי השגיאה:', error);
    console.error('❌ הודעת שגיאה:', error.message);
    
    // טיפול בשגיאות ספציפיות
    if (error.name === 'AbortError') {
      console.error('❌ timeout בהעלאה');
      throw new Error('העלאה נכשלה - timeout (15 דקות). נסה שוב או בדוק את החיבור לאינטרנט');
    }
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      console.error('❌ בעיית חיבור לשרת');
      throw new Error('לא ניתן להתחבר לשרת - בדוק את החיבור לאינטרנט');
    }
    if (error.message.includes('NetworkError')) {
      console.error('❌ שגיאת רשת');
      throw new Error('שגיאת רשת - בדוק את החיבור לאינטרנט');
    }
    
    throw error;
  }
};

// Separate audio with Demucs
export const separateAudio = async (fileId, projectName) => {
  try {
    console.log('🎵 ===== התחלת הפרדה =====');
    console.log('🎵 fileId:', fileId);
    console.log('🎵 שם פרויקט:', projectName);
    console.log('🎵 API_BASE_URL:', API_BASE_URL);
    console.log('🎵 סוג fileId:', typeof fileId);
    console.log('🎵 סוג projectName:', typeof projectName);
    
    const requestBody = { fileId, projectName };
    console.log('🎵 request body:', requestBody);
    console.log('🎵 JSON stringified body:', JSON.stringify(requestBody));
    
    console.log('📤 שולח בקשת הפרדה לשרת...');
    console.log('📤 URL:', `${API_BASE_URL}/separate`);
    console.log('📤 method: POST');
    console.log('📤 headers: Content-Type: application/json');
    
    console.log('🎵 לפני קריאה ל-apiCall...');
    const result = await apiCall('/separate', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    });
    console.log('🎵 אחרי קריאה ל-apiCall...');
    
    console.log('✅ הפרדה החלה בהצלחה!');
    console.log('✅ תוצאת הפרדה:', result);
    console.log('✅ סוג תוצאה:', typeof result);
    console.log('✅ האם יש success:', result && result.success);
    console.log('✅ ===== הפרדה הושלמה בהצלחה =====');
    return result;
  } catch (error) {
    console.error('❌ ===== שגיאה בהפרדה =====');
    console.error('❌ fileId:', fileId);
    console.error('❌ שם פרויקט:', projectName);
    console.error('❌ פרטי השגיאה:', error);
    console.error('❌ הודעת שגיאה:', error.message);
    console.error('❌ Stack trace:', error.stack);
    console.error('❌ שם השגיאה:', error.name);
    console.error('❌ סוג השגיאה:', typeof error);
    throw error;
  }
};

// Get separation progress with polling
export const getSeparationProgress = async (fileId) => {
  try {
    console.log('📊 ===== בדיקת התקדמות =====');
    console.log('📊 fileId:', fileId);
    console.log('📊 URL:', `${API_BASE_URL}/separate/${fileId}/progress`);
    
    const result = await apiCall(`/separate/${fileId}/progress`);
    console.log('📊 תשובת התקדמות מהשרת:', result);
    console.log('📊 התקדמות:', result.progress + '%');
    console.log('📊 סטטוס:', result.status);
    console.log('📊 הודעה:', result.message);
    console.log('📊 ===== בדיקת התקדמות הושלמה =====');
    return result;
  } catch (error) {
    console.error('❌ ===== שגיאה בקבלת התקדמות =====');
    console.error('❌ fileId:', fileId);
    console.error('❌ פרטי השגיאה:', error);
    console.error('❌ הודעת שגיאה:', error.message);
    throw error;
  }
};

// Get all projects
export const getProjects = async () => {
  try {
    const projects = await apiCall('/projects');
    console.log('📋 פרויקטים:', projects);
    return projects;
  } catch (error) {
    console.error('❌ שגיאה בקבלת פרויקטים:', error);
    return [];
  }
};

// Get specific project
export const getProject = async (id) => {
  try {
    const project = await apiCall(`/projects/${id}`);
    console.log('📁 פרויקט:', project);
    return project;
  } catch (error) {
    console.error('❌ שגיאה בקבלת פרויקט:', error);
    return null;
  }
};

// Delete project
export const deleteProject = async (id) => {
  try {
    console.log('🗑️ מוחק פרויקט:', id);
    const result = await apiCall(`/projects/${id}`, {
      method: 'DELETE',
    });
    console.log('✅ פרויקט נמחק:', result);
    return result;
  } catch (error) {
    console.error('❌ שגיאה במחיקת פרויקט:', error);
    throw error;
  }
};

// Download stem
export const downloadStem = async (projectId, stemName) => {
  try {
    console.log('⬇️ מוריד stem:', stemName, 'מפרויקט:', projectId);
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}/download/${stemName}`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${stemName}.mp3`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    console.log('✅ Stem הורד בהצלחה:', stemName);
  } catch (error) {
    console.error('❌ שגיאה בהורדת stem:', error);
    throw error;
  }
};

// Health check
export const healthCheck = async () => {
  try {
    console.log('🏥 בודק חיבור לשרת...');
    const result = await apiCall('/health');
    console.log('✅ שרת זמין:', result);
    return result;
  } catch (error) {
    console.error('❌ שרת לא זמין:', error);
    
    // טיפול בשגיאות ספציפיות
    if (error.message.includes('Failed to fetch')) {
      throw new Error('לא ניתן להתחבר לשרת - בדוק את החיבור לאינטרנט');
    }
    if (error.message.includes('timeout')) {
      throw new Error('השרת לא מגיב - נסה שוב מאוחר יותר');
    }
    if (error.message.includes('502')) {
      throw new Error('השרת זמנית לא זמין - נסה שוב בעוד כמה דקות');
    }
    
    throw new Error(`שגיאה בחיבור לשרת: ${error.message}`);
  }
};

// AudioProject class for better organization
export class AudioProject {
  static async list(sortBy = '-createdAt') {
    return getProjects();
  }

  static async create(projectData) {
    // This would be implemented if we add project creation endpoint
    console.log('יצירת פרויקט:', projectData);
  }

  static async get(id) {
    return getProject(id);
  }

  static async delete(id) {
    return deleteProject(id);
  }
}

// Upload file helper
export const UploadFile = async ({ file }) => {
  return uploadAudio(file);
};

// LLM invocation (for future AI features)
export const InvokeLLM = async (prompt) => {
  // This would be implemented for AI features
  console.log('AI prompt:', prompt);
  return { response: 'AI feature coming soon' };
}; 