import React from 'react';

// אייקונים בסיסיים שתמיד זמינים
const fallbackIcons = {
  // אייקונים בסיסיים
  default: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
      <circle cx="8.5" cy="8.5" r="1.5"/>
      <polyline points="21,15 16,10 5,21"/>
    </svg>
  ),
  
  // אייקונים נפוצים
  home: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9,22 9,12 15,12 15,22"/>
    </svg>
  ),
  
  music: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 18V5l12-2v13"/>
      <circle cx="6" cy="18" r="3"/>
      <circle cx="18" cy="16" r="3"/>
    </svg>
  ),
  
  settings: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ),
  
  user: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  
  // אייקונים למוזיקה
  headphones: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
    </svg>
  ),
  
  mic: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
      <line x1="12" y1="19" x2="12" y2="23"/>
      <line x1="8" y1="23" x2="16" y2="23"/>
    </svg>
  ),
  
  volume2: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
    </svg>
  ),
  
  play: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="5 3 19 12 5 21 5 3"/>
    </svg>
  ),
  
  pause: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="6" y="4" width="4" height="16"/>
      <rect x="14" y="4" width="4" height="16"/>
    </svg>
  ),
  
  // אייקונים נוספים
  upload: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7,10 12,15 17,10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  
  download: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7,10 12,15 17,10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  
  trash: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="3,6 5,6 21,6"/>
      <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6"/>
    </svg>
  ),
  
  edit: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  ),
  
  search: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8"/>
      <path d="M21 21l-4.35-4.35"/>
    </svg>
  ),
  
  close: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  
  check: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20,6 9,17 4,12"/>
    </svg>
  ),
  
  alert: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  
  info: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="16" x2="12" y2="12"/>
      <line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
  ),
  
  // אייקונים למוזיקה נוספים
  zap: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  
  circleDot: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  
  // אייקונים לניווט
  menu: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="6" x2="21" y2="6"/>
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
  
  chevronRight: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="9,18 15,12 9,6"/>
    </svg>
  ),
  
  chevronLeft: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="15,18 9,12 15,6"/>
    </svg>
  ),
  
  arrowRight: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12,5 19,12 12,19"/>
    </svg>
  ),
  
  arrowLeft: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="19" y1="12" x2="5" y2="12"/>
      <polyline points="12,19 5,12 12,5"/>
    </svg>
  )
};

// מערכת רנדור דינמית של אייקונים
export class IconRenderer {
  constructor() {
    this.iconCache = new Map();
    this.fallbackIcon = fallbackIcons.default;
  }

  // רנדור אייקון לפי שם
  renderIcon(iconName, props = {}) {
    try {
      // בדיקה אם האייקון כבר במטמון
      if (this.iconCache.has(iconName)) {
        const IconComponent = this.iconCache.get(iconName);
        return <IconComponent {...props} />;
      }

      // בדיקה אם האייקון זמין ב-fallback
      if (fallbackIcons[iconName]) {
        const IconComponent = fallbackIcons[iconName];
        this.iconCache.set(iconName, IconComponent);
        return <IconComponent {...props} />;
      }

      // ניסיון לטעון אייקון מ-lucide-react
      this.loadLucideIcon(iconName).then(IconComponent => {
        if (IconComponent) {
          this.iconCache.set(iconName, IconComponent);
        }
      }).catch(() => {
        console.warn(`אייקון לא נמצא: ${iconName}, משתמש באייקון ברירת מחדל`);
      });

      // החזרת אייקון ברירת מחדל
      return <this.fallbackIcon {...props} />;
    } catch (error) {
      console.error(`שגיאה ברנדור אייקון ${iconName}:`, error);
      return <this.fallbackIcon {...props} />;
    }
  }

  // טעינת אייקון מ-lucide-react
  async loadLucideIcon(iconName) {
    try {
      // ניסיון לטעון את הספרייה
      const lucideReact = await import('lucide-react');
      
      if (lucideReact[iconName]) {
        return lucideReact[iconName];
      }
      
      // ניסיון עם שם מותאם
      const adaptedName = this.adaptIconName(iconName);
      if (lucideReact[adaptedName]) {
        return lucideReact[adaptedName];
      }
      
      return null;
    } catch (error) {
      console.warn(`לא ניתן לטעון אייקון ${iconName} מ-lucide-react:`, error);
      return null;
    }
  }

  // התאמת שם אייקון
  adaptIconName(iconName) {
    const adaptations = {
      'headphones': 'Headphones',
      'menuItems': 'Menu',
      'mic': 'Mic',
      'volume2': 'Volume2',
      'play': 'Play',
      'pause': 'Pause',
      'upload': 'Upload',
      'download': 'Download',
      'trash': 'Trash2',
      'edit': 'Edit',
      'search': 'Search',
      'close': 'X',
      'check': 'Check',
      'alert': 'AlertTriangle',
      'info': 'Info',
      'zap': 'Zap',
      'circleDot': 'CircleDot',
      'chevronRight': 'ChevronRight',
      'chevronLeft': 'ChevronLeft',
      'arrowRight': 'ArrowRight',
      'arrowLeft': 'ArrowLeft'
    };
    
    return adaptations[iconName] || iconName;
  }

  // קבלת אייקון ברירת מחדל
  getFallbackIcon() {
    return this.fallbackIcon;
  }

  // ניקוי מטמון
  clearCache() {
    this.iconCache.clear();
  }

  // קבלת סטטוס מטמון
  getCacheStatus() {
    return {
      cachedIcons: Array.from(this.iconCache.keys()),
      cacheSize: this.iconCache.size
    };
  }
}

// יצירת מופע גלובלי
export const iconRenderer = new IconRenderer();

// קומפוננטה פשוטה לשימוש
export const Icon = ({ name, ...props }) => {
  return iconRenderer.renderIcon(name, props);
};

// קומפוננטה עם טיפול בשגיאות
export const SafeIcon = ({ name, fallback = null, ...props }) => {
  try {
    const icon = iconRenderer.renderIcon(name, props);
    return icon;
  } catch (error) {
    console.error(`שגיאה ברנדור אייקון ${name}:`, error);
    if (fallback) {
      return fallback;
    }
          const FallbackIcon = iconRenderer.getFallbackIcon();
      return <FallbackIcon {...props} />;
  }
};

export default Icon;
