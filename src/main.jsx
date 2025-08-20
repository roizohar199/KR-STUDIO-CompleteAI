import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { safetyGuards } from './lib/safetyGuards'

// אתחול SafetyGuards לפני טעינת האפליקציה - עם בדיקות בטוחות
try { 
  safetyGuards?.initialize?.(); 
  console.log('✅ SafetyGuards initialized in main.jsx');
} catch (e) { 
  console.error('❌ Failed to initialize SafetyGuards in main.jsx:', e); 
}

// טיפול בשגיאות גלובליות - עם בדיקות בטוחות
window.addEventListener('error', (event) => {
  console.error('🚨 Global error caught in main.jsx:', event.error);
  safetyGuards?.handleError?.('Global Error', {
    message: event.error?.message || 'Unknown error',
    stack: event.error?.stack || 'No stack trace',
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno
  });
});

// טיפול ב-Promise rejections שלא טופלו - עם בדיקות בטוחות
window.addEventListener('unhandledrejection', (event) => {
  console.error('🚨 Unhandled promise rejection in main.jsx:', event.reason);
  safetyGuards?.handleError?.('Unhandled Promise Rejection', {
    message: event.reason?.message || 'Unknown promise rejection',
    stack: event.reason?.stack || 'No stack trace'
  });
  event.preventDefault(); // מניעת הצגת שגיאה ברירת מחדל
});

// טיפול בשגיאות React - עם בדיקות בטוחות
const originalConsoleError = console.error;
console.error = (...args) => {
  // לוג השגיאה המקורי
  originalConsoleError.apply(console, args);
  
  // בדיקה אם זו שגיאת React
  const errorMessage = args.join(' ');
  if (errorMessage.includes('React') || errorMessage.includes('Warning')) {
    safetyGuards?.handleError?.('React Error', {
      message: errorMessage,
      args: args
    });
  }
};

// פונקציה לטעינה בטוחה של האפליקציה
const renderApp = () => {
  try {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
    console.log('✅ KR-STUDIO App rendered successfully');
  } catch (error) {
    console.error('❌ Failed to render app:', error);
    
    // הצגת מסך שגיאה פשוט
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="
          min-height: 100vh;
          background: linear-gradient(135deg, #fef2f2 0%, #ffffff 50%, #fef2f2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: system-ui, -apple-system, sans-serif;
          padding: 20px;
        ">
          <div style="
            max-width: 500px;
            background: white;
            padding: 40px;
            border-radius: 16px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            text-align: center;
            border: 1px solid #fecaca;
          ">
            <div style="
              background: #fef2f2;
              width: 80px;
              height: 80px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 auto 20px;
              font-size: 40px;
            ">⚠️</div>
            
            <h1 style="
              color: #dc2626;
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 16px;
            ">שגיאה בטעינת האפליקציה</h1>
            
            <p style="
              color: #6b7280;
              margin-bottom: 24px;
              line-height: 1.5;
            ">
              KR-STUDIO נתקל בבעיה בטעינה. אנא רענן את הדף או פנה לתמיכה.
            </p>
            
            <div style="
              background: #f3f4f6;
              padding: 16px;
              border-radius: 8px;
              margin-bottom: 24px;
              text-align: left;
              font-family: monospace;
              font-size: 12px;
              color: #374151;
              max-height: 200px;
              overflow-y: auto;
            ">
              <strong>Error Details:</strong><br>
              ${error.message}<br><br>
              <strong>Stack:</strong><br>
              ${error.stack || 'No stack trace available'}
            </div>
            
            <button onclick="window.location.reload()" style="
              background: #dc2626;
              color: white;
              border: none;
              padding: 12px 24px;
              border-radius: 8px;
              font-weight: 500;
              cursor: pointer;
              transition: background-color 0.2s;
            " onmouseover="this.style.background='#b91c1c'" onmouseout="this.style.background='#dc2626'">
              רענן דף
            </button>
          </div>
        </div>
      `;
    }
  }
};

// ניסיון טעינה ראשוני
try {
  renderApp();
} catch (error) {
  console.error('❌ Critical error during app initialization:', error);
  
  // ניסיון נוסף אחרי השהייה קצרה
  setTimeout(() => {
    try {
      renderApp();
    } catch (retryError) {
      console.error('❌ Failed to render app on retry:', retryError);
      
      // הצגת הודעת שגיאה קריטית
      const rootElement = document.getElementById('root');
      if (rootElement) {
        rootElement.innerHTML = `
          <div style="
            min-height: 100vh;
            background: #dc2626;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: system-ui, -apple-system, sans-serif;
            padding: 20px;
            text-align: center;
          ">
            <div>
              <h1 style="font-size: 32px; margin-bottom: 16px;">🚨 שגיאה קריטית</h1>
              <p style="font-size: 18px; margin-bottom: 24px;">
                KR-STUDIO לא יכול לטעון. אנא פנה לתמיכה טכנית.
              </p>
              <button onclick="window.location.reload()" style="
                background: white;
                color: #dc2626;
                border: none;
                padding: 12px 24px;
                border-radius: 8px;
                font-weight: bold;
                cursor: pointer;
              ">
                נסה שוב
              </button>
            </div>
          </div>
        `;
      }
    }
  }, 2000);
} 