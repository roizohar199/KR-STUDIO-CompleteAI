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
    
    const fetchOptions = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
      // הגדרות נוספות לביצועים
      signal: AbortSignal.timeout(300000), // 5 דקות timeout
    };
    
    const response = await fetch(url, fetchOptions);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Network error' }));
      console.error('[API] שגיאת fetch:', url, error);
      throw new Error(error.error || `HTTP ${response.status}`);
    }
    
    const data = await response.json();
    console.log('[API] תשובה מהשרת:', endpoint, data);
    return data;
  } catch (err) {
    console.error('[API] שגיאה כללית ב-apiCall:', endpoint, err, err?.stack);
    
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

// Upload audio file
export const uploadAudio = async (file) => {
  try {
    console.log('📁 מעלה קובץ:', file.name, 'גודל:', file.size);
    
    // בדיקת גודל הקובץ
    const maxSize = 200 * 1024 * 1024; // 200MB
    if (file.size > maxSize) {
      throw new Error(`הקובץ גדול מדי (${Math.round(file.size / 1024 / 1024)}MB). מקסימום: 200MB`);
    }
    
    const formData = new FormData();
    formData.append('audio', file);

    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
      signal: AbortSignal.timeout(600000), // 10 דקות timeout להעלאה
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Upload failed' }));
      console.error('❌ שגיאה בהעלאה:', error);
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ קובץ הועלה בהצלחה:', result);
    return result;
  } catch (error) {
    console.error('❌ שגיאה בהעלאה:', error);
    
    // טיפול בשגיאות ספציפיות
    if (error.name === 'AbortError') {
      throw new Error('העלאה נכשלה - timeout (10 דקות)');
    }
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      throw new Error('לא ניתן להתחבר לשרת - בדוק את החיבור לאינטרנט');
    }
    
    throw error;
  }
};

// Separate audio with Demucs
export const separateAudio = async (fileId, projectName) => {
  try {
    console.log('🎵 מתחיל הפרדה עם Demucs:', fileId, projectName);
    
    const result = await apiCall('/separate', {
      method: 'POST',
      body: JSON.stringify({ fileId, projectName }),
    });
    
    console.log('✅ הפרדה החלה:', result);
    return result;
  } catch (error) {
    console.error('❌ שגיאה בהפרדה:', error);
    throw error;
  }
};

// Get separation progress with polling
export const getSeparationProgress = async (fileId) => {
  try {
    const result = await apiCall(`/separate/${fileId}/progress`);
    console.log('📊 התקדמות הפרדה:', result);
    return result;
  } catch (error) {
    console.error('❌ שגיאה בקבלת התקדמות:', error);
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