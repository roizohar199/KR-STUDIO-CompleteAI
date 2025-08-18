// API Client - שימוש ב-URL דינמי
const API_BASE_URL = typeof process !== 'undefined' && process.env && process.env.WORKER_API_URL
  ? process.env.WORKER_API_URL
  : window.location.origin + '/api';

// Helper function for API calls with improved error handling
const apiCall = async (endpoint, options = {}) => {
  try {
    console.log('[API] קריאה לשרת:', endpoint);
    const url = `${API_BASE_URL}${endpoint}`;
    
    const fetchOptions = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
      // אופטימיזציה: timeout קצר יותר לביצועים טובים יותר
      signal: AbortSignal.timeout(180000), // 3 דקות במקום 5
    };
    
    const response = await fetch(url, fetchOptions);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }
    
    const data = await response.json();
    
    // בדיקה אם התשובה כוללת שדה success
    if (data && typeof data.success === 'boolean') {
      if (!data.success) {
        throw new Error(data.error || 'הבקשה נכשלה');
      }
    }
    
    return data;
  } catch (err) {
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
    console.log('📤 התחלת העלאה:', file.name, `(${Math.round(file.size / 1024 / 1024)}MB)`);
    
    // בדיקת גודל הקובץ
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      throw new Error(`הקובץ גדול מדי (${Math.round(file.size / 1024 / 1024)}MB). מקסימום: 50MB`);
    }
    
    const formData = new FormData();
    formData.append('audio', file);

    // שימוש ב-XMLHttpRequest לתמיכה בהתקדמות
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      
      // הגדרת timeout
      xhr.timeout = 900000; // 15 דקות
      
      // מעקב אחר התקדמות
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable && onProgress) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          onProgress(percentComplete);
        }
      });
      
      // טיפול בתשובה
      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const result = JSON.parse(xhr.responseText);
            console.log('✅ קובץ הועלה בהצלחה!');
            resolve(result);
          } catch (parseError) {
            reject(new Error('תשובה לא תקינה מהשרת'));
          }
        } else {
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
        reject(new Error('שגיאת רשת - בדוק את החיבור לאינטרנט'));
      });
      
      xhr.addEventListener('timeout', () => {
        reject(new Error('העלאה נכשלה - timeout (15 דקות). נסה שוב או בדוק את החיבור לאינטרנט'));
      });
      
      xhr.addEventListener('abort', () => {
        reject(new Error('העלאה בוטלה'));
      });
      
      // שליחת הבקשה
      xhr.open('POST', `${API_BASE_URL}/upload`);
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send(formData);
      
      // אם יש AbortController, שמור את ה-XHR כדי שנוכל לבטל
      if (abortController) {
        abortController.signal.addEventListener('abort', () => {
          xhr.abort();
        });
      }
    });
    
  } catch (error) {
    console.error('❌ שגיאה בהעלאה:', error.message);
    throw error;
  }
};

// Separate audio with Demucs
export const separateAudio = async (fileId, projectName) => {
  try {
    console.log('🎵 התחלת הפרדה:', projectName);
    
    const requestBody = { fileId, projectName };
    
    const result = await apiCall('/separate', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    });
    
    console.log('✅ הפרדה החלה בהצלחה!');
    return result;
  } catch (error) {
    console.error('❌ שגיאה בהפרדה:', error.message);
    throw error;
  }
};

// Get separation progress with polling
export const getSeparationProgress = async (fileId) => {
  try {
    const result = await apiCall(`/separate/${fileId}/progress`);
    return result;
  } catch (error) {
    console.error('❌ שגיאה בקבלת התקדמות:', error.message);
    throw error;
  }
};

// Get all projects
export const getProjects = async () => {
  try {
    const projects = await apiCall('/projects');
    return projects;
  } catch (error) {
    console.error('❌ שגיאה בקבלת פרויקטים:', error.message);
    return [];
  }
};

// Get specific project
export const getProject = async (id) => {
  try {
    const result = await apiCall(`/projects/${id}`);
    return result.project || result;
  } catch (error) {
    console.error('❌ שגיאה בקבלת פרויקט:', error.message);
    return null;
  }
};

// Delete project
export const deleteProject = async (id) => {
  try {
    const result = await apiCall(`/projects/${id}`, {
      method: 'DELETE',
    });
    return result;
  } catch (error) {
    console.error('❌ שגיאה במחיקת פרויקט:', error.message);
    throw error;
  }
};

// Download stem
export const downloadStem = async (projectId, stemName) => {
  try {
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
    console.error('❌ שגיאה בהורדת stem:', error.message);
    throw error;
  }
};

// Health check
export const healthCheck = async () => {
  try {
    const result = await apiCall('/health');
    return result;
  } catch (error) {
    console.error('❌ שרת לא זמין:', error.message);
    
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

// בדיקה נוספת של חיבור לשרת
export const testServerConnection = async () => {
  try {
    // בדיקה ראשונית
    const healthResult = await healthCheck();
    
    // בדיקת פרויקטים
    const projects = await getProjects();
    
    return {
      success: true,
      health: healthResult,
      projects: projects,
      message: 'השרת זמין ועובד כראוי'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      message: 'השרת לא זמין או לא מגיב'
    };
  }
}; 