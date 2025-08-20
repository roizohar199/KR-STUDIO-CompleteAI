// מערכת הגנות קטנות למניעת שגיאות
export class SafetyGuards {
  constructor() {
    this.isInitialized = false;
    this.errorCount = 0;
    this.maxErrors = 10;
    this.errorWindow = 60000; // דקה
    this.lastErrorTime = 0;
  }

  // אתחול המערכת
  initialize() {
    try {
      this.setupGlobalErrorHandling();
      this.setupUnhandledRejectionHandling();
      this.setupConsoleErrorHandling();
      this.isInitialized = true;
      console.log('✅ SafetyGuards initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize SafetyGuards:', error);
    }
  }

  // הגדרת טיפול בשגיאות גלובליות
  setupGlobalErrorHandling() {
    if (typeof window !== 'undefined') {
      const originalOnError = window.onerror;
      
      window.onerror = (message, source, lineno, colno, error) => {
        this.handleError('Global Error', {
          message,
          source,
          lineno,
          colno,
          error: error?.stack || 'No stack trace'
        });
        
        // קריאה לפונקציה המקורית אם קיימת
        if (originalOnError) {
          return originalOnError(message, source, lineno, colno, error);
        }
        
        return false; // מניעת הצגת שגיאה ברירת מחדל
      };
    }
  }

  // הגדרת טיפול ב-Promise rejections שלא טופלו
  setupUnhandledRejectionHandling() {
    if (typeof window !== 'undefined') {
      const originalOnUnhandledRejection = window.onunhandledrejection;
      
      window.onunhandledrejection = (event) => {
        this.handleError('Unhandled Promise Rejection', {
          message: event.reason?.message || 'Unknown promise rejection',
          stack: event.reason?.stack || 'No stack trace'
        });
        
        // קריאה לפונקציה המקורית אם קיימת
        if (originalOnUnhandledRejection) {
          return originalOnUnhandledRejection(event);
        }
        
        // מניעת הצגת שגיאה ברירת מחדל
        event.preventDefault();
      };
    }
  }

  // הגדרת טיפול בשגיאות console
  setupConsoleErrorHandling() {
    if (typeof console !== 'undefined') {
      const originalError = console.error;
      const originalWarn = console.warn;
      
      console.error = (...args) => {
        this.handleError('Console Error', {
          message: args.map(arg => String(arg)).join(' '),
          args
        });
        originalError.apply(console, args);
      };
      
      console.warn = (...args) => {
        this.handleError('Console Warning', {
          message: args.map(arg => String(arg)).join(' '),
          args
        });
        originalWarn.apply(console, args);
      };
    }
  }

  // טיפול בשגיאה
  handleError(type, details) {
    try {
      const now = Date.now();
      
      // בדיקה אם עבר זמן מספיק מהשגיאה האחרונה
      if (now - this.lastErrorTime > this.errorWindow) {
        this.errorCount = 0;
      }
      
      this.errorCount++;
      this.lastErrorTime = now;
      
      // לוג השגיאה
      console.group(`🚨 SafetyGuards: ${type}`);
      console.error('Details:', details);
      console.error('Error count:', this.errorCount);
      console.error('Timestamp:', new Date().toISOString());
      console.groupEnd();
      
      // בדיקה אם יש יותר מדי שגיאות
      if (this.errorCount > this.maxErrors) {
        this.handleTooManyErrors();
      }
      
      // שליחת השגיאה לשרת (אופציונלי)
      this.sendErrorToServer(type, details);
      
    } catch (error) {
      console.error('SafetyGuards error handler failed:', error);
    }
  }

  // טיפול במצב של יותר מדי שגיאות
  handleTooManyErrors() {
    console.error('🚨 Too many errors detected! Taking protective measures...');
    
    try {
      // ניקוי localStorage אם יש בעיות
      if (typeof localStorage !== 'undefined') {
        localStorage.clear();
      }
      
      // ניקוי sessionStorage
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.clear();
      }
      
      // איפוס מונה השגיאות
      this.errorCount = 0;
      
      // הצגת הודעה למשתמש
      this.showUserMessage();
      
    } catch (error) {
      console.error('Failed to handle too many errors:', error);
    }
  }

  // הצגת הודעה למשתמש
  showUserMessage() {
    try {
      // יצירת אלמנט הודעה
      const messageDiv = document.createElement('div');
      messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ef4444;
        color: white;
        padding: 16px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 999999;
        max-width: 300px;
        font-family: system-ui, -apple-system, sans-serif;
      `;
      
      messageDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          <span style="font-size: 20px;">⚠️</span>
          <strong>בעיה במערכת</strong>
        </div>
        <p style="margin: 0; font-size: 14px;">
          המערכת נתקלה בבעיות רבות. אנא רענן את הדף או פנה לתמיכה.
        </p>
        <button onclick="this.parentElement.remove()" style="
          background: white;
          color: #ef4444;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          margin-top: 8px;
          cursor: pointer;
          font-weight: 500;
        ">הבנתי</button>
      `;
      
      document.body.appendChild(messageDiv);
      
      // הסרה אוטומטית אחרי 10 שניות
      setTimeout(() => {
        if (messageDiv.parentElement) {
          messageDiv.remove();
        }
      }, 10000);
      
    } catch (error) {
      console.error('Failed to show user message:', error);
    }
  }

  // שליחת שגיאה לשרת
  async sendErrorToServer(type, details) {
    try {
      if (process.env.NODE_ENV === 'production') {
        await fetch('/api/error-log', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type,
            details,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href,
            errorCount: this.errorCount
          })
        });
      }
    } catch (error) {
      // התעלם משגיאות שליחת השגיאה
    }
  }

  // בדיקת תקינות אובייקט
  validateObject(obj, fallback = {}) {
    try {
      if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
        return obj;
      }
      return fallback;
    } catch (error) {
      console.warn('Object validation failed:', error);
      return fallback;
    }
  }

  // בדיקת תקינות מערך
  validateArray(arr, fallback = []) {
    try {
      if (Array.isArray(arr)) {
        return arr;
      }
      return fallback;
    } catch (error) {
      console.warn('Array validation failed:', error);
      return fallback;
    }
  }

  // בדיקת תקינות פונקציה
  validateFunction(func, fallback = () => {}) {
    try {
      if (typeof func === 'function') {
        return func;
      }
      return fallback;
    } catch (error) {
      console.warn('Function validation failed:', error);
      return fallback;
    }
  }

  // בדיקת תקינות מחרוזת
  validateString(str, fallback = '') {
    try {
      if (typeof str === 'string') {
        return str;
      }
      return fallback;
    } catch (error) {
      console.warn('String validation failed:', error);
      return fallback;
    }
  }

  // בדיקת תקינות מספר
  validateNumber(num, fallback = 0) {
    try {
      if (typeof num === 'number' && !isNaN(num) && isFinite(num)) {
        return num;
      }
      return fallback;
    } catch (error) {
      console.warn('Number validation failed:', error);
      return fallback;
    }
  }

  // בדיקת תקינות בוליאן
  validateBoolean(bool, fallback = false) {
    try {
      if (typeof bool === 'boolean') {
        return bool;
      }
      return fallback;
    } catch (error) {
      console.warn('Boolean validation failed:', error);
      return fallback;
    }
  }

  // הרצה בטוחה של פונקציה
  safeExecute(func, fallback = null, ...args) {
    try {
      if (typeof func === 'function') {
        return func(...args);
      }
      return fallback;
    } catch (error) {
      this.handleError('Safe Execute Error', {
        message: error.message,
        stack: error.stack,
        function: func.toString(),
        args
      });
      return fallback;
    }
  }

  // הרצה אסינכרונית בטוחה
  async safeExecuteAsync(func, fallback = null, ...args) {
    try {
      if (typeof func === 'function') {
        return await func(...args);
      }
      return fallback;
    } catch (error) {
      this.handleError('Safe Execute Async Error', {
        message: error.message,
        stack: error.stack,
        function: func.toString(),
        args
      });
      return fallback;
    }
  }

  // קבלת סטטוס המערכת
  getStatus() {
    return {
      isInitialized: this.isInitialized,
      errorCount: this.errorCount,
      maxErrors: this.maxErrors,
      lastErrorTime: this.lastErrorTime,
      timeSinceLastError: Date.now() - this.lastErrorTime
    };
  }

  // איפוס מונה השגיאות
  resetErrorCount() {
    this.errorCount = 0;
    this.lastErrorTime = 0;
    console.log('✅ SafetyGuards error count reset');
  }

  // ניקוי המערכת
  cleanup() {
    try {
      this.errorCount = 0;
      this.lastErrorTime = 0;
      this.isInitialized = false;
      console.log('🧹 SafetyGuards cleaned up');
    } catch (error) {
      console.error('Failed to cleanup SafetyGuards:', error);
    }
  }
}

// יצירת מופע גלובלי
export const safetyGuards = new SafetyGuards();

// פונקציות עזר מהירות
export const safe = {
  // בדיקות תקינות מהירות
  object: (obj, fallback = {}) => safetyGuards.validateObject(obj, fallback),
  array: (arr, fallback = []) => safetyGuards.validateArray(arr, fallback),
  function: (func, fallback = () => {}) => safetyGuards.validateFunction(func, fallback),
  string: (str, fallback = '') => safetyGuards.validateString(str, fallback),
  number: (num, fallback = 0) => safetyGuards.validateNumber(num, fallback),
  boolean: (bool, fallback = false) => safetyGuards.validateBoolean(bool, fallback),
  
  // הרצה בטוחה
  execute: (func, fallback = null, ...args) => safetyGuards.safeExecute(func, fallback, ...args),
  executeAsync: (func, fallback = null, ...args) => safetyGuards.safeExecuteAsync(func, fallback, ...args),
  
  // גישה בטוחה לפרופרטי
  get: (obj, path, fallback = undefined) => {
    try {
      return path.split('.').reduce((current, key) => current?.[key], obj) ?? fallback;
    } catch (error) {
      return fallback;
    }
  },
  
  // הגדרה בטוחה של פרופרטי
  set: (obj, path, value) => {
    try {
      const keys = path.split('.');
      const lastKey = keys.pop();
      const target = keys.reduce((current, key) => {
        if (!current[key] || typeof current[key] !== 'object') {
          current[key] = {};
        }
        return current[key];
      }, obj);
      target[lastKey] = value;
      return true;
    } catch (error) {
      return false;
    }
  }
};

export default safetyGuards;
