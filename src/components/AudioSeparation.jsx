import React, { useState, useEffect, useRef } from 'react';
import { Upload, Play, Pause, Download, Trash2, Music, Mic, Volume2, CircleDot, Zap, FileAudio, BarChart3, VolumeX, AlertCircle, Plus, Grid, List, Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { useTranslation } from '../lib/translations';

// Import API functions
import { 
  uploadAudio, 
  separateAudio, 
  getSeparationProgress, 
  getProjects, 
  getProject, 
  deleteProject,
  downloadStem,
  healthCheck,
  testServerConnection 
} from '../api/client';

// Import new components
import AudioPlayer from './audio-separation/AudioPlayer';
import ProjectCard from './audio-separation/ProjectCard';
import EmptyState from './audio-separation/EmptyState';
import UploadZone from './audio-separation/UploadZone';
import ProcessingStatus from './audio-separation/ProcessingStatus';
import TrackChannel from './audio-separation/TrackChannel';

const AudioSeparation = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [projectName, setProjectName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [audioFiles, setAudioFiles] = useState({});
  const [playingTrack, setPlayingTrack] = useState(null);
  const [audioElements, setAudioElements] = useState({});
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volumeLevels, setVolumeLevels] = useState({});
  const [mutedTracks, setMutedTracks] = useState({});
  const [currentView, setCurrentView] = useState('upload'); // 'studio', 'upload'
  const [showUploadForm, setShowUploadForm] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [processingStep, setProcessingStep] = useState('uploading');
  const [serverConnected, setServerConnected] = useState(false);
  const [error, setError] = useState(null);
  const [globalError, setGlobalError] = useState(null);
  const [pollingInterval, setPollingInterval] = useState(null);
  const [uploadController, setUploadController] = useState(null);
  const [serverStatus, setServerStatus] = useState('checking'); // 'checking', 'connected', 'disconnected'
  const [connectionTest, setConnectionTest] = useState(null);
  const fileInputRef = useRef();
  const audioContextRef = useRef();
  const t = useTranslation();

  // יצירת AudioContext
  useEffect(() => {
    try {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      return () => {
        if (audioContextRef.current) {
          audioContextRef.current.close();
        }
        // ניקוי כל הערוצים בעת עזיבת הקומפוננטה
        if (Object.keys(audioFiles).length > 0) {
          stopAllTracks();
        }
      };
    } catch (error) {
      console.error('❌ שגיאה ביצירת AudioContext:', error);
      setError('שגיאה באתחול מערכת האודיו - נסה לרענן את הדף');
    }
  }, [audioFiles]);

  // בדיקת חיבור לשרת
  useEffect(() => {
    try {
      checkServerConnection();
    } catch (error) {
      console.error('❌ שגיאה בבדיקת חיבור לשרת:', error);
      setError('שגיאה בבדיקת חיבור לשרת - נסה לרענן את הדף');
    }
  }, []);

  // טעינת פרויקטים קיימים
  const loadProjects = async () => {
    console.log('📁 ===== מתחיל טעינת פרויקטים =====');
    console.log('⏰ זמן טעינה:', new Date().toISOString());
    console.log('🔗 מצב חיבור לשרת:', serverConnected);
    
    if (!serverConnected) {
      console.warn('⚠️ אין חיבור לשרת, דילוג על טעינת פרויקטים');
      return;
    }
    
    try {
      console.log('🔍 שלב 1: שליחת בקשה לשרת...');
      const startTime = performance.now();
      
      const projectsData = await getProjects();
      const responseTime = performance.now() - startTime;
      
      console.log(`⏱️ זמן תגובה: ${responseTime.toFixed(0)}ms`);
      console.log('📊 נתוני פרויקטים שהתקבלו:', projectsData);
      
      if (!projectsData) {
        console.warn('⚠️ לא התקבלו נתוני פרויקטים');
        setProjects([]);
        return;
      }
      
      if (!Array.isArray(projectsData)) {
        console.warn('⚠️ התקבלה תשובה לא צפויה:', typeof projectsData);
        console.warn('📊 תוכן התשובה:', projectsData);
        setProjects([]);
        return;
      }
      
      console.log(`✅ התקבלו ${projectsData.length} פרויקטים מהשרת`);
      
      // בדיקת תקינות הפרויקטים
      console.log('🔍 שלב 2: בדיקת תקינות הפרויקטים...');
      const validProjects = [];
      const invalidProjects = [];
      
      for (let i = 0; i < projectsData.length; i++) {
        const project = projectsData[i];
        console.log(`🔍 בודק פרויקט ${i + 1}/${projectsData.length}:`, {
          id: project.id,
          name: project.name,
          status: project.status,
          hasStems: !!project.stems,
          stemsCount: project.stems ? Object.keys(project.stems).length : 0
        });
        
        if (project && project.id && project.name) {
          validProjects.push(project);
          console.log(`✅ פרויקט ${i + 1} תקין`);
        } else {
          invalidProjects.push(project);
          console.warn(`⚠️ פרויקט ${i + 1} לא תקין:`, project);
        }
      }
      
      console.log(`📊 סיכום בדיקת תקינות:`, {
        total: projectsData.length,
        valid: validProjects.length,
        invalid: invalidProjects.length
      });
      
      if (invalidProjects.length > 0) {
        console.warn('⚠️ נמצאו פרויקטים לא תקינים:', invalidProjects);
      }
      
      // עדכון המצב
      console.log('💾 שלב 3: עדכון מצב הפרויקטים...');
      setProjects(validProjects);
      
      console.log('✅ ===== טעינת פרויקטים הושלמה בהצלחה =====');
      console.log('📊 סיכום:', {
        projectsLoaded: validProjects.length,
        responseTime: responseTime.toFixed(0) + 'ms',
        timestamp: new Date().toISOString()
      });
      
      // בדיקה אם יש פרויקט נבחר
      if (selectedProject && !validProjects.find(p => p.id === selectedProject.id)) {
        console.warn('⚠️ הפרויקט הנבחר לא נמצא ברשימה המעודכנת, איפוס בחירה');
        setSelectedProject(null);
      }
      
    } catch (error) {
      console.error('❌ ===== שגיאה בטעינת פרויקטים =====');
      console.error('📊 פרטי השגיאה:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      
      // הודעה מפורטת יותר למשתמש
      let errorMessage = error.message;
      if (error.message.includes('timeout')) {
        errorMessage = 'טעינת פרויקטים נכשלה - זמן המתנה ארוך מדי';
      } else if (error.message.includes('Failed to fetch')) {
        errorMessage = 'לא ניתן להתחבר לשרת - בדוק את החיבור לאינטרנט';
      } else if (error.message.includes('NetworkError')) {
        errorMessage = 'שגיאת רשת - בדוק את החיבור לאינטרנט';
      } else if (error.message.includes('500')) {
        errorMessage = 'שגיאת שרת - נסה שוב מאוחר יותר';
      } else if (error.message.includes('503')) {
        errorMessage = 'השרת לא זמין כרגע - נסה שוב מאוחר יותר';
      }
      
      setError(`שגיאה בטעינת פרויקטים: ${errorMessage}`);
      
      // איפוס הפרויקטים במקרה של שגיאה
      setProjects([]);
    }
  };

  // בדיקה מתקדמת של מצב פרויקט
  const checkProjectStatusAdvanced = async (projectId) => {
    try {
      console.log('🔍 בדיקה מתקדמת של מצב פרויקט:', projectId);
      
      // בדיקה ראשונית של הפרויקט
      const projectData = await getProject(projectId);
      if (!projectData || !projectData.success || !projectData.project) {
        console.warn('⚠️ לא ניתן לטעון נתוני פרויקט');
        return {
          isReady: false,
          reason: 'לא ניתן לטעון נתוני פרויקט',
          details: projectData
        };
      }
      
      const project = projectData.project;
      console.log('📊 מצב פרויקט:', project.status);
      console.log('📁 ערוצים זמינים:', project.stems ? Object.keys(project.stems) : 'אין');
      
      // בדיקת סטטוס הפרויקט
      if (project.status !== 'completed') {
        return {
          isReady: false,
          reason: `הפרויקט עדיין בעיבוד: ${project.status}`,
          details: { status: project.status }
        };
      }
      
      // בדיקת ערוצים
      const stems = project.stems || {};
      const stemCount = Object.keys(stems).length;
      
      if (stemCount < 5) {
        return {
          isReady: false,
          reason: `רק ${stemCount} ערוצים מוכנים מתוך 5`,
          details: { 
            availableStems: Object.keys(stems),
            expectedCount: 5,
            actualCount: stemCount
          }
        };
      }
      
      // בדיקת ערוצים נדרשים
      const expectedStems = ['vocals', 'drums', 'bass', 'guitar', 'other'];
      const availableStems = Object.keys(stems);
      const missingStems = expectedStems.filter(s => !availableStems.includes(s));
      
      if (missingStems.length > 0) {
        return {
          isReady: false,
          reason: `חסרים ערוצים: ${missingStems.join(', ')}`,
          details: { 
            missingStems,
            availableStems,
            expectedStems
          }
        };
      }
      
      // בדיקה שכל הערוצים מכילים קבצים אמיתיים
      const stemsWithFiles = Object.entries(stems).filter(([key, value]) => {
        return value && typeof value === 'object' && value.url;
      });
      
      if (stemsWithFiles.length < 5) {
        const stemsWithoutFiles = Object.entries(stems).filter(([key, value]) => {
          return !value || typeof value !== 'object' || !value.url;
        });
        
        return {
          isReady: false,
          reason: `חלק מהערוצים לא מכילים קבצים`,
          details: { 
            stemsWithFiles: stemsWithFiles.length,
            stemsWithoutFiles: stemsWithoutFiles.map(([key]) => key),
            totalExpected: 5
          }
        };
      }
      
      // בדיקה נוספת - גודל הקבצים
      const fileSizes = {};
      for (const [stemKey, stemData] of stemsWithFiles) {
        if (stemData && stemData.url) {
          try {
            // בדיקה שהקובץ זמין
            const response = await fetch(stemData.url, { method: 'HEAD' });
            if (response.ok) {
              const contentLength = response.headers.get('content-length');
              fileSizes[stemKey] = contentLength ? parseInt(contentLength) : 'unknown';
            } else {
              fileSizes[stemKey] = 'error';
            }
          } catch (error) {
            fileSizes[stemKey] = 'error';
          }
        }
      }
      
      console.log('📏 גודלי קבצים:', fileSizes);
      
      // בדיקה סופית
      const allFilesValid = Object.values(fileSizes).every(size => 
        size !== 'error' && (typeof size === 'number' ? size > 0 : true)
      );
      
      if (!allFilesValid) {
        return {
          isReady: false,
          reason: 'חלק מהקבצים לא זמינים או ריקים',
          details: { fileSizes }
        };
      }
      
      // הכל מוכן!
      return {
        isReady: true,
        reason: 'הפרויקט מוכן לחלוטין',
        details: { 
          stems: Object.keys(stems),
          fileSizes,
          totalStems: stemsWithFiles.length
        }
      };
      
    } catch (error) {
      console.error('❌ שגיאה בבדיקה מתקדמת:', error);
      return {
        isReady: false,
        reason: `שגיאה בבדיקה: ${error.message}`,
        details: { error: error.message }
      };
    }
  };

  // טעינה חוזרת של פרויקט עם בדיקה מתקדמת
  const retryProjectLoadAdvanced = async (projectId) => {
    try {
      console.log('🔄 מנסה טעינה חוזרת מתקדמת של פרויקט:', projectId);
      setError(null);
      
      // בדיקה מתקדמת של מצב הפרויקט
      const status = await checkProjectStatusAdvanced(projectId);
      console.log('🔍 סטטוס פרויקט:', status);
      
      if (status.isReady) {
        // הפרויקט מוכן, נסה לטעון אותו
        const loadSuccess = await loadProject(projectId);
        
        if (loadSuccess) {
          console.log('🎉 הפרויקט נטען בהצלחה!');
          setError(null);
          return true;
        } else {
          console.error('❌ הפרויקט לא נטען למרות שהוא מוכן');
          setError('הפרויקט מוכן אבל לא נטען. נסה לרענן את הדף.');
          return false;
        }
      } else {
        // הפרויקט לא מוכן, הצג מידע מפורט
        console.warn('⚠️ הפרויקט לא מוכן:', status.reason);
        console.log('📊 פרטים:', status.details);
        
        // הודעה מפורטת למשתמש
        let userMessage = status.reason;
        if (status.details && status.details.missingStems) {
          userMessage += ` (חסרים: ${status.details.missingStems.join(', ')})`;
        }
        if (status.details && status.details.fileSizes) {
          const errorFiles = Object.entries(status.details.fileSizes)
            .filter(([key, size]) => size === 'error')
            .map(([key]) => key);
          if (errorFiles.length > 0) {
            userMessage += ` (קבצים לא זמינים: ${errorFiles.join(', ')})`;
          }
        }
        
        setError(userMessage);
        return false;
      }
      
    } catch (error) {
      console.error('❌ שגיאה בטעינה חוזרת מתקדמת:', error);
      setError(`שגיאה בטעינה חוזרת: ${error.message}`);
      return false;
    }
  };

  // טעינת פרויקט ספציפי
  const loadProject = async (projectId) => {
    try {
      console.log('📁 טוען פרויקט:', projectId);
      const projectData = await getProject(projectId);
      console.log('📁 פרויקט נטען:', projectData);
      
      if (projectData && projectData.success && projectData.project) {
        const project = projectData.project;
        
        // בדיקה שהפרויקט מוכן באמת
        if (project.status !== 'completed') {
          console.warn('⚠️ הפרויקט עדיין לא הושלם:', project.status);
          setError('הפרויקט עדיין בעיבוד, אנא המתן...');
          return false; // החזרת false במקום return ריק
        }
        
        // בדיקה שיש קבצים מופרדים
        const stems = project.stems || {};
        const stemCount = Object.keys(stems).length;
        console.log('🎵 מספר ערוצים שנמצאו:', stemCount);
        console.log('🎵 ערוצים זמינים:', Object.keys(stems));
        
        if (stemCount < 5) {
          console.warn('⚠️ לא כל הערוצים מוכנים עדיין:', stemCount, 'מתוך 5');
          setError(`רק ${stemCount} ערוצים מוכנים מתוך 5. אנא המתן...`);
          return false; // החזרת false במקום retry אוטומטי
        }
        
        // בדיקה שכל הערוצים הנדרשים קיימים
        const expectedStems = ['vocals', 'drums', 'bass', 'guitar', 'other'];
        const availableStems = Object.keys(stems);
        const allStemsReady = expectedStems.every(stem => 
          availableStems.includes(stem)
        );
        
        if (!allStemsReady) {
          const missingStems = expectedStems.filter(s => !availableStems.includes(s));
          console.warn('⚠️ חסרים ערוצים:', missingStems);
          setError(`חסרים ערוצים: ${missingStems.join(', ')}. אנא המתן...`);
          return false; // החזרת false במקום retry אוטומטי
        }
        
        // בדיקה נוספת שכל הערוצים מכילים קבצים אמיתיים
        const stemsWithFiles = Object.entries(stems).filter(([key, value]) => {
          return value && typeof value === 'object' && value.url;
        });
        
        if (stemsWithFiles.length < 5) {
          console.warn('⚠️ חלק מהערוצים לא מכילים קבצים:', stemsWithFiles.length, 'מתוך 5');
          setError(`חלק מהערוצים לא מכילים קבצים. אנא המתן...`);
          return false; // החזרת false במקום retry אוטומטי
        }
        
        console.log('✅ כל הערוצים מוכנים עם קבצים!');
        console.log('🎵 ערוצים עם קבצים:', stemsWithFiles.map(([key, value]) => `${key}: ${value.url ? 'יש קובץ' : 'אין קובץ'}`));
        
        setSelectedProject(project);
        setAudioFiles(stems);
        
        // הגדרת עוצמות ברירת מחדל
        const defaultVolumes = {};
        Object.keys(stems).forEach(stem => {
          defaultVolumes[stem] = 1.0;
        });
        setVolumeLevels(defaultVolumes);
        
        // עכשיו אפשר לעבור למסך הסטודיו
        console.log('🎬 עובר למסך הסטודיו...');
        setCurrentView('studio');
        setShowUploadForm(false);
        
        return true; // החזרת true במקרה של הצלחה
      } else {
        console.error('❌ נתוני פרויקט לא תקינים:', {
          hasData: !!projectData,
          success: projectData?.success,
          hasProject: !!projectData?.project
        });
        throw new Error('פרויקט לא נמצא או שגיאה בטעינה');
      }
    } catch (error) {
      console.error('❌ שגיאה בטעינת פרויקט:', error);
      setError(`שגיאה בטעינת הפרויקט: ${error.message}`);
      return false; // החזרת false במקרה של שגיאה
    }
  };

  // מחיקת פרויקט
  const handleDeleteProject = async (projectId) => {
    try {
      console.log('🗑️ מוחק פרויקט:', projectId);
      const result = await deleteProject(projectId);
      
      if (result.success) {
        console.log('✅ פרויקט נמחק בהצלחה');
        
        // הסרת הפרויקט מהרשימה
        setProjects(prev => prev.filter(p => p.id !== projectId));
        
        // אם זה הפרויקט הנבחר, נקה אותו
        if (selectedProject && selectedProject.id === projectId) {
          setSelectedProject(null);
          setAudioFiles({});
          setCurrentView('upload');
          setShowUploadForm(true);
        }
      } else {
        throw new Error('מחיקה נכשלה');
      }
    } catch (error) {
      console.error('❌ שגיאה במחיקת פרויקט:', error);
      
      // הודעה מפורטת יותר למשתמש
      let errorMessage = error.message;
      if (error.message.includes('timeout')) {
        errorMessage = 'מחיקת פרויקט נכשלה - זמן המתנה ארוך מדי';
      } else if (error.message.includes('Failed to fetch')) {
        errorMessage = 'לא ניתן להתחבר לשרת - בדוק את החיבור לאינטרנט';
      } else if (error.message.includes('NetworkError')) {
        errorMessage = 'שגיאת רשת - בדוק את החיבור לאינטרנט';
      } else if (error.message.includes('404')) {
        errorMessage = 'הפרויקט לא נמצא - ייתכן שנמחק או שאין לך הרשאה לגשת אליו';
      } else if (error.message.includes('500')) {
        errorMessage = 'שגיאת שרת - נסה שוב מאוחר יותר';
      } else if (error.message.includes('503')) {
        errorMessage = 'השרת לא זמין כרגע - נסה שוב מאוחר יותר';
      }
      
      setError(errorMessage);
    }
  };

  // טיפול בהעלאת קובץ
  const handleFileUpload = async (file) => {
    console.log('📁 ===== מתחיל טיפול בקובץ שהועלה =====');
    console.log('📁 פרטי הקובץ:', {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: new Date(file.lastModified).toISOString()
    });

    try {
      // בדיקת תקינות הקובץ
      console.log('🔍 שלב 1: בדיקת תקינות הקובץ...');
      
      if (!file) {
        console.error('❌ לא התקבל קובץ');
        setError('לא התקבל קובץ');
        return;
      }

      // בדיקת סוג הקובץ
      const allowedTypes = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/flac', 'audio/m4a', 'audio/ogg'];
      console.log('🎵 סוג קובץ שהתקבל:', file.type);
      console.log('✅ סוגי קבצים מותרים:', allowedTypes);
      
      if (!allowedTypes.includes(file.type)) {
        console.error('❌ סוג קובץ לא נתמך:', file.type);
        setError('סוג קובץ לא נתמך. אנא העלה קובץ MP3, WAV, FLAC, M4A או OGG');
        return;
      }

      // בדיקת גודל הקובץ
      const maxSizeMB = 100;
      const fileSizeMB = file.size / (1024 * 1024);
      console.log('📏 גודל קובץ:', fileSizeMB.toFixed(2), 'MB');
      console.log('📏 גודל מקסימלי מותר:', maxSizeMB, 'MB');
      
      if (fileSizeMB > maxSizeMB) {
        console.error('❌ קובץ גדול מדי:', fileSizeMB.toFixed(2), 'MB');
        setError(`הקובץ גדול מדי (${fileSizeMB.toFixed(2)}MB). הגודל המקסימלי הוא ${maxSizeMB}MB`);
        return;
      }

      console.log('✅ בדיקת תקינות עברה בהצלחה');
      
      // בדיקת חיבור לשרת
      console.log('🔗 שלב 2: בדיקת חיבור לשרת...');
      console.log('🔗 מצב חיבור נוכחי:', serverConnected);
      
      if (!serverConnected) {
        console.warn('⚠️ אין חיבור לשרת, מנסה חיבור חוזר...');
        await checkServerConnection();
        
        if (!serverConnected) {
          console.error('❌ לא ניתן להתחבר לשרת');
          setError('לא ניתן להתחבר לשרת. בדוק את החיבור לאינטרנט ונסה שוב');
          return;
        }
      }
      
      console.log('✅ חיבור לשרת תקין');

      // בדיקת זיכרון פנוי
      console.log('💾 שלב 3: בדיקת זיכרון פנוי...');
      if ('memory' in performance) {
        const memoryInfo = performance.memory;
        const usedMemoryMB = memoryInfo.usedJSHeapSize / (1024 * 1024);
        const totalMemoryMB = memoryInfo.totalJSHeapSize / (1024 * 1024);
        const limitMemoryMB = memoryInfo.jsHeapSizeLimit / (1024 * 1024);
        
        console.log('💾 זיכרון בשימוש:', usedMemoryMB.toFixed(2), 'MB');
        console.log('💾 זיכרון כולל:', totalMemoryMB.toFixed(2), 'MB');
        console.log('💾 מגבלת זיכרון:', limitMemoryMB.toFixed(2), 'MB');
        
        if (usedMemoryMB > limitMemoryMB * 0.8) {
          console.warn('⚠️ זיכרון כמעט מלא, ייתכן שיהיו בעיות ביצועים');
        }
      } else {
        console.log('💾 מידע זיכרון לא זמין בדפדפן זה');
      }

      // שמירת הקובץ במצב
      console.log('💾 שלב 4: שמירת הקובץ במצב...');
      setUploadedFile(file);
      setError(null);
      
      console.log('✅ קובץ נשמר במצב בהצלחה');
      console.log('📁 מצב קובץ:', {
        hasFile: !!file,
        fileName: file.name,
        fileSize: file.size
      });

      // בדיקת פרויקטים קיימים
      console.log('📁 שלב 5: בדיקת פרויקטים קיימים...');
      try {
        await loadProjects();
        console.log(`✅ נטענו ${projects.length} פרויקטים קיימים`);
      } catch (error) {
        console.warn('⚠️ שגיאה בטעינת פרויקטים קיימים:', error);
        // זה לא קריטי, נמשיך
      }

      console.log('🎉 ===== טיפול בקובץ הושלם בהצלחה =====');
      console.log('📋 הקובץ מוכן להפרדה. הזן שם לפרויקט ולחץ על "התחל הפרדת אודיו"');

    } catch (error) {
      console.error('❌ ===== שגיאה בטיפול בקובץ =====');
      console.error('📊 פרטי השגיאה:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      
      setError(`שגיאה בטיפול בקובץ: ${error.message}`);
      
      // איפוס המצב במקרה של שגיאה
      setUploadedFile(null);
      setProjectName('');
    }
  };

  // התחלת הפרדה
  const startSeparation = async () => {
    if (!uploadedFile || !projectName.trim()) {
      console.error('❌ חסרים נתונים להפרדה:', { 
        hasFile: !!uploadedFile, 
        projectName: projectName 
      });
      setError('נדרש קובץ אודיו ושם פרויקט');
      return;
    }

    console.log('🚀 ===== מתחיל תהליך הפרדת אודיו =====');
    console.log('📁 פרטי הקובץ:', {
      name: uploadedFile.name,
      size: uploadedFile.size,
      type: uploadedFile.type,
      lastModified: new Date(uploadedFile.lastModified).toISOString()
    });
    console.log('🏷️ שם הפרויקט:', projectName);
    console.log('🔗 חיבור לשרת:', serverConnected);

    try {
      setError(null);
      setIsProcessing(true);
      setProcessingStep('uploading');
      setProgress(0);

      console.log('📤 שלב 1: העלאת קובץ לשרת...');
      const uploadStartTime = performance.now();
      
      const uploadResult = await uploadAudio(uploadedFile, (progress) => {
        console.log(`📤 התקדמות העלאה: ${progress}%`);
        setProgress(progress);
      });

      const uploadTime = performance.now() - uploadStartTime;
      console.log(`✅ העלאה הושלמה בהצלחה (${uploadTime.toFixed(0)}ms)`);
      console.log('📤 תוצאת העלאה:', uploadResult);

      if (!uploadResult || !uploadResult.fileId) {
        throw new Error('לא התקבל fileId מהשרת');
      }

      const fileId = uploadResult.fileId;
      console.log('🆔 מזהה קובץ שהתקבל:', fileId);

      setProcessingStep('separating');
      setProgress(25);
      console.log('🎵 שלב 2: התחלת הפרדת אודיו...');

      const separationStartTime = performance.now();
      const separationResult = await separateAudio(fileId, projectName);
      const separationTime = performance.now() - separationStartTime;

      console.log(`✅ בקשת הפרדה נשלחה (${separationTime.toFixed(0)}ms)`);
      console.log('🎵 תוצאת הפרדה:', separationResult);

      if (!separationResult || !separationResult.success) {
        throw new Error(separationResult?.error || 'הפרדת האודיו נכשלה');
      }

      setProgress(50);
      console.log('⏳ שלב 3: המתנה לסיום הפרדה...');
      console.log('🔄 מתחיל מעקב אחר התקדמות...');

      // התחלת מעקב אחר התקדמות
      startProgressPolling(fileId);

    } catch (error) {
      console.error('❌ שגיאה בתהליך ההפרדה:', error);
      console.error('📊 פרטי השגיאה:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      
      setError(`שגיאה בהפרדת האודיו: ${error.message}`);
      setIsProcessing(false);
      setProcessingStep('error');
      setProgress(0);
    }
  };

  // התחלת מעקב אחר התקדמות
  const startProgressPolling = (fileId) => {
    console.log('🔄 ===== מתחיל מעקב אחר התקדמות =====');
    console.log('🆔 מזהה קובץ למעקב:', fileId);
    console.log('⏰ זמן התחלה:', new Date().toISOString());

    let attempts = 0;
    const maxAttempts = 300; // 5 דקות עם polling כל שנייה
    let lastProgress = 0;

    const pollProgress = async () => {
      attempts++;
      console.log(`📊 ניסיון ${attempts}/${maxAttempts} - בדיקת התקדמות...`);
      
      try {
        const startTime = performance.now();
        const progressData = await getSeparationProgress(fileId);
        const responseTime = performance.now() - startTime;
        
        console.log(`⏱️ זמן תגובה: ${responseTime.toFixed(0)}ms`);
        console.log('📊 נתוני התקדמות שהתקבלו:', progressData);

        if (!progressData) {
          console.warn('⚠️ לא התקבלו נתוני התקדמות');
          if (attempts >= maxAttempts) {
            console.error('❌ הגעת למספר המקסימלי של ניסיונות');
            setError('הפרדת האודיו לוקחת יותר מדי זמן - נסה שוב');
            setIsProcessing(false);
            setProcessingStep('error');
            setProgress(0);
            return;
          }
          // נסה שוב אחרי שנייה
          setTimeout(pollProgress, 1000);
          return;
        }

        // בדיקה אם יש שגיאה
        if (progressData.error) {
          console.error('❌ שגיאה בהתקדמות:', progressData.error);
          setError(`שגיאה בהפרדה: ${progressData.error}`);
          setIsProcessing(false);
          setProcessingStep('error');
          setProgress(0);
          return;
        }

        // עדכון התקדמות
        const currentProgress = progressData.progress || 0;
        const currentStatus = progressData.status || 'unknown';
        const currentMessage = progressData.message || 'אין הודעה';
        
        console.log('📈 פרטי התקדמות:', {
          progress: currentProgress,
          status: currentStatus,
          message: currentMessage,
          previousProgress: lastProgress,
          change: currentProgress - lastProgress
        });

        // עדכון UI רק אם יש שינוי
        if (currentProgress !== lastProgress) {
          console.log(`🔄 עדכון התקדמות: ${lastProgress}% → ${currentProgress}%`);
          setProgress(currentProgress);
          lastProgress = currentProgress;
        }

        // עדכון סטטוס
        if (currentStatus !== processingStep) {
          console.log(`🔄 עדכון סטטוס: ${processingStep} → ${currentStatus}`);
          setProcessingStep(currentStatus);
        }

        // בדיקה אם ההפרדה הושלמה
        if (currentStatus === 'completed' || currentProgress >= 100) {
          console.log('🎉 ===== הפרדה הושלמה בהצלחה! =====');
          console.log('📊 התקדמות סופית:', currentProgress);
          console.log('✅ סטטוס סופי:', currentStatus);
          console.log('💬 הודעה סופית:', currentMessage);
          
          setIsProcessing(false);
          setProcessingStep('completed');
          setProgress(100);
          
          // המתנה קצרה ואז טעינת הפרויקט
          console.log('⏳ המתנה 3 שניות לפני טעינת הפרויקט...');
          setTimeout(async () => {
            console.log('🔄 מתחיל טעינת הפרויקט המוכן...');
            await loadProjects();
            
            // ניסיון לטעון את הפרויקט החדש
            const newProjects = await getProjects();
            if (newProjects && Array.isArray(newProjects) && newProjects.length > 0) {
              console.log(`📁 נמצאו ${newProjects.length} פרויקטים`);
              
              // מצא את הפרויקט החדש (האחרון ברשימה או לפי fileId)
              let latestProject = newProjects.find(p => p.id == fileId) || newProjects[newProjects.length - 1];
              console.log('🎯 פרויקט חדש שנמצא:', latestProject);
              
              if (latestProject && latestProject.id) {
                console.log('🔄 מנסה לטעון את הפרויקט החדש...');
                
                // נסה כמה פעמים עם המתנה בין הניסיונות
                let attempts = 0;
                const maxAttempts = 15; // הגדלת מספר הניסיונות ל-15
                
                const tryToLoadProject = async () => {
                  attempts++;
                  console.log(`🔄 ניסיון ${attempts}/${maxAttempts} לטעינת הפרויקט...`);
                  
                  try {
                    // טעינה מחדש של פרויקטים
                    await loadProjects();
                    
                    // טעינת הפרויקט החדש שנוצר
                    const newProjects = await getProjects();
                    if (newProjects && Array.isArray(newProjects) && newProjects.length > 0) {
                      // מצא את הפרויקט החדש (האחרון ברשימה או לפי fileId)
                      let latestProject = newProjects.find(p => p.id == fileId) || newProjects[newProjects.length - 1];
                      
                      if (latestProject && latestProject.id) {
                        console.log('🔍 בודק אם הפרויקט מוכן...');
                        
                        // בדיקה שהפרויקט מוכן באמת
                        const projectData = await getProject(latestProject.id);
                        if (projectData && projectData.success && 
                            projectData.project && projectData.project.stems &&
                            Object.keys(projectData.project.stems).length >= 5) {
                          
                          console.log('✅ פרויקט מוכן עם', Object.keys(projectData.project.stems).length, 'ערוצים');
                          
                          // בדיקה מתקדמת של מצב הפרויקט
                          const advancedStatus = await checkProjectStatusAdvanced(latestProject.id);
                          console.log('🔍 בדיקה מתקדמת:', advancedStatus);
                          
                          if (advancedStatus.isReady) {
                            // נסה לטעון את הפרויקט
                            const loadSuccess = await loadProject(latestProject.id);
                            
                            if (loadSuccess) {
                              console.log('🎉 הפרויקט נטען בהצלחה!');
                              setError(null);
                              setCurrentView('studio');
                              setShowUploadForm(false);
                              setUploadedFile(null);
                              setProjectName('');
                              return;
                            } else {
                              console.error('❌ הפרויקט לא נטען למרות שהוא מוכן');
                              setError('הפרויקט מוכן אבל לא נטען. נסה לרענן את הדף.');
                              return;
                            }
                          } else {
                            console.log('⚠️ הפרויקט עדיין לא מוכן:', advancedStatus.reason);
                          }
                        } else {
                          console.log('⚠️ הפרויקט לא מכיל מספיק ערוצים');
                        }
                      }
                    }
                    
                    // אם הגענו לכאן, הפרויקט עדיין לא מוכן
                    if (attempts >= maxAttempts) {
                      console.error('❌ הגעת למספר המקסימלי של ניסיונות לטעינת הפרויקט');
                      setError('הפרויקט לא נטען אחרי ניסיונות רבים. נסה לרענן את הדף.');
                      return;
                    }
                    
                    // המתנה לפני הניסיון הבא
                    const waitTime = Math.min(2000 + (attempts * 1000), 12000); // 2-12 שניות
                    console.log(`⏳ המתנה ${waitTime}ms לפני ניסיון נוסף...`);
                    setTimeout(tryToLoadProject, waitTime);
                    
                  } catch (error) {
                    console.error(`❌ שגיאה בניסיון ${attempts}:`, error);
                    
                    if (attempts >= maxAttempts) {
                      console.error('❌ הגעת למספר המקסימלי של ניסיונות');
                      setError('הפרויקט לא נטען אחרי ניסיונות רבים. נסה לרענן את הדף.');
                      return;
                    }
                    
                    // המתנה לפני הניסיון הבא
                    const waitTime = Math.min(2000 + (attempts * 1000), 12000);
                    console.log(`⏳ המתנה ${waitTime}ms לפני ניסיון נוסף...`);
                    setTimeout(tryToLoadProject, waitTime);
                  }
                };
                
                // התחלת הניסיונות אחרי המתנה קצרה
                setTimeout(tryToLoadProject, 3000);
                
              } else {
                console.error('❌ לא נמצא פרויקט חדש');
                setError('הפרויקט לא נמצא אחרי השלמת ההפרדה');
              }
            } else {
              console.error('❌ לא התקבלו פרויקטים מהשרת');
              setError('לא התקבלו פרויקטים מהשרת אחרי השלמת ההפרדה');
            }
          }, 3000);
          
          return;
        }

        // בדיקה אם יש שגיאה
        if (currentStatus === 'error' || currentStatus === 'failed') {
          console.error('❌ הפרדה נכשלה:', currentMessage);
          setError(`הפרדה נכשלה: ${currentMessage}`);
          setIsProcessing(false);
          setProcessingStep('error');
          setProgress(0);
          return;
        }

        // המשך polling אם לא הושלם
        if (attempts >= maxAttempts) {
          console.error('❌ הגעת למספר המקסימלי של ניסיונות');
          setError('הפרדת האודיו לוקחת יותר מדי זמן - נסה שוב');
          setIsProcessing(false);
          setProcessingStep('error');
          setProgress(0);
          return;
        }

        // המתנה לפני הבדיקה הבאה
        const nextPollDelay = 1000; // שנייה אחת
        console.log(`⏳ המתנה ${nextPollDelay}ms לפני בדיקה הבאה...`);
        setTimeout(pollProgress, nextPollDelay);

      } catch (error) {
        console.error(`❌ שגיאה בניסיון ${attempts}:`, error);
        console.error('📊 פרטי השגיאה:', {
          message: error.message,
          stack: error.stack,
          name: error.name
        });
        
        if (attempts >= maxAttempts) {
          console.error('❌ הגעת למספר המקסימלי של ניסיונות');
          setError('הפרדת האודיו לוקחת יותר מדי זמן - נסה שוב');
          setIsProcessing(false);
          setProcessingStep('error');
          setProgress(0);
          return;
        }
        
        // המתנה לפני הניסיון הבא
        const waitTime = Math.min(2000 + (attempts * 1000), 12000);
        console.log(`⏳ המתנה ${waitTime}ms לפני ניסיון נוסף...`);
        setTimeout(pollProgress, waitTime);
      }
    };

    // התחלת polling
    console.log('🚀 מתחיל polling ראשון...');
    pollProgress();
  };

  // טעינה חוזרת של פרויקט ספציפי (לכפתור "נסה לטעון שוב")
  const retrySpecificProject = async (projectId) => {
    try {
      console.log('🔄 מנסה טעינה חוזרת של פרויקט ספציפי:', projectId);
      setError(null);
      
      // בדיקה מתקדמת של מצב הפרויקט
      const status = await checkProjectStatusAdvanced(projectId);
      console.log('🔍 סטטוס פרויקט:', status);
      
      if (status.isReady) {
        // הפרויקט מוכן, נסה לטעון אותו
        const loadSuccess = await loadProject(projectId);
        
        if (loadSuccess) {
          console.log('🎉 הפרויקט נטען בהצלחה!');
          setError(null);
          return true;
        } else {
          console.error('❌ הפרויקט לא נטען למרות שהוא מוכן');
          setError('הפרויקט מוכן אבל לא נטען. נסה לרענן את הדף.');
          return false;
        }
      } else {
        // הפרויקט לא מוכן, הצג מידע מפורט
        console.warn('⚠️ הפרויקט לא מוכן:', status.reason);
        console.log('📊 פרטים:', status.details);
        
        // הודעה מפורטת למשתמש
        let userMessage = status.reason;
        if (status.details && status.details.missingStems) {
          userMessage += ` (חסרים: ${status.details.missingStems.join(', ')})`;
        }
        if (status.details && status.details.fileSizes) {
          const errorFiles = Object.entries(status.details.fileSizes)
            .filter(([key, size]) => size === 'error')
            .map(([key]) => key);
          if (errorFiles.length > 0) {
            userMessage += ` (קבצים לא זמינים: ${errorFiles.join(', ')})`;
          }
        }
        
        setError(userMessage);
        
        // אם זה שלב טעינת פרויקט, נסה שוב אחרי המתנה
        if (processingStep === 'loading-project') {
          console.log('⏳ ממתין 5 שניות ונסה שוב...');
          setTimeout(() => {
            retrySpecificProject(projectId);
          }, 5000);
        }
        
        return false;
      }
      
    } catch (error) {
      console.error('❌ שגיאה בטעינה חוזרת של פרויקט ספציפי:', error);
      setError(`שגיאה בטעינה חוזרת: ${error.message}`);
      return false;
    }
  };

  // ניסיון חוזר לתהליך
  const retryProcessing = async () => {
    console.log('🔄 מנסה שוב את התהליך...');
    setError(null);
    
    try {
      // אם יש פרויקט שנבחר, נסה לטעון אותו מחדש
      if (selectedProject && selectedProject.id) {
        console.log('🔄 מנסה לטעון פרויקט קיים:', selectedProject.id);
        
        // בדיקה מתקדמת של מצב הפרויקט
        const status = await checkProjectStatusAdvanced(selectedProject.id);
        console.log('🔍 סטטוס פרויקט:', status);
        
        if (status.isReady) {
          // הפרויקט מוכן, נסה לטעון אותו
          const loadSuccess = await loadProject(selectedProject.id);
          
          if (loadSuccess) {
            console.log('🎉 הפרויקט נטען בהצלחה!');
            setError(null);
            return;
          } else {
            console.error('❌ הפרויקט לא נטען למרות שהוא מוכן');
            setError('הפרויקט מוכן אבל לא נטען. נסה לרענן את הדף.');
            return;
          }
        } else {
          // הפרויקט לא מוכן, הצג מידע מפורט
          console.warn('⚠️ הפרויקט לא מוכן:', status.reason);
          setError(status.reason);
          
          // אם זה שלב טעינת פרויקט, נסה שוב אחרי המתנה
          if (processingStep === 'loading-project') {
            console.log('⏳ ממתין 5 שניות ונסה שוב...');
            setTimeout(() => {
              retryProcessing();
            }, 5000);
          }
          return;
        }
      }
      
      // אם אין פרויקט נבחר או שהטעינה נכשלה, נסה עם הקובץ המקורי
      if (selectedFile) {
        console.log('🔄 מנסה שוב עם הקובץ המקורי...');
        await handleFileUpload(selectedFile);
      } else if (uploadedFile) {
        console.log('🔄 מנסה שוב עם הקובץ שהועלה...');
        await handleFileUpload(uploadedFile);
      } else {
        // אם אין קובץ, חזור למסך העלאה
        console.log('🔄 אין קובץ זמין, חוזר למסך העלאה...');
        resetToUpload();
      }
    } catch (error) {
      console.error('❌ שגיאה בניסיון חוזר:', error);
      setError(`ניסיון חוזר נכשל: ${error.message}`);
    }
  };

  // ביטול תהליך
  const cancelProcessing = () => {
    console.log('❌ מבטל תהליך...');
    
    try {
      // ביטול העלאה אם יש
      if (uploadController) {
        uploadController.abort();
        setUploadController(null);
      }
      
      // עצירת polling
      if (pollingInterval) {
        clearInterval(pollingInterval);
        setPollingInterval(null);
      }
      
      // איפוס מצב
      setIsProcessing(false);
      setProcessingStep(null);
      setProgress(0);
      setError(null);
      setUploadedFile(null);
      setSelectedFile(null);
      setProjectName(''); // איפוס שם הפרויקט גם בביטול
      
      console.log('✅ תהליך בוטל');
    } catch (error) {
      console.error('❌ שגיאה בביטול תהליך:', error);
      setError('שגיאה בביטול התהליך - נסה שוב');
    }
  };

  // הורדת ערוץ
  const handleDownloadStem = async (projectId, stemType) => {
    try {
      console.log('📥 מוריד ערוץ:', stemType, 'מפרויקט:', projectId);
      
      const result = await downloadStem(projectId, stemType);
      
      if (result && result.url) {
        // יצירת קישור הורדה
        const link = document.createElement('a');
        link.href = result.url;
        link.download = `${stemType}_${projectId}.wav`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        console.log('✅ ערוץ הורד בהצלחה');
      } else {
        throw new Error('לא התקבל קישור הורדה מהשרת');
      }
    } catch (error) {
      console.error('❌ שגיאה בהורדת ערוץ:', error);
      
      // הודעה מפורטת יותר למשתמש
      let errorMessage = error.message;
      if (error.message.includes('timeout')) {
        errorMessage = 'הורדת ערוץ נכשלה - זמן המתנה ארוך מדי';
      } else if (error.message.includes('Failed to fetch')) {
        errorMessage = 'לא ניתן להתחבר לשרת - בדוק את החיבור לאינטרנט';
      } else if (error.message.includes('NetworkError')) {
        errorMessage = 'שגיאת רשת - בדוק את החיבור לאינטרנט';
      } else if (error.message.includes('404')) {
        errorMessage = 'הערוץ לא נמצא - ייתכן שהפרויקט לא הושלם עדיין';
      } else if (error.message.includes('403')) {
        errorMessage = 'אין לך הרשאה להוריד ערוץ זה';
      } else if (error.message.includes('500')) {
        errorMessage = 'שגיאת שרת - נסה שוב מאוחר יותר';
      } else if (error.message.includes('503')) {
        errorMessage = 'השרת לא זמין כרגע - נסה שוב מאוחר יותר';
      }
      
      setError(errorMessage);
    }
  };

  // ניהול אודיו
  const playTrack = (trackId) => {
    try {
      if (playingTrack === trackId) {
        // עצירת הפעלה
        if (audioElements[trackId]) {
          audioElements[trackId].pause();
          audioElements[trackId].currentTime = 0;
        }
        setPlayingTrack(null);
      } else {
        // עצירת כל הפעלות אחרות
        stopAllTracks();
        
        // הפעלת הערוץ הנבחר
        if (audioFiles[trackId]) {
          const audio = new Audio(audioFiles[trackId].url);
          audio.volume = volumeLevels[trackId] || 1.0;
          audio.muted = mutedTracks[trackId] || false;
          
          audio.addEventListener('ended', () => setPlayingTrack(null));
          audio.addEventListener('timeupdate', () => setCurrentTime(audio.currentTime));
          audio.addEventListener('loadedmetadata', () => setDuration(audio.duration));
          
          audio.play();
          setAudioElements(prev => ({ ...prev, [trackId]: audio }));
          setPlayingTrack(trackId);
        }
      }
    } catch (error) {
      console.error('❌ שגיאה בהפעלת ערוץ:', error);
      setError('שגיאה בהפעלת ערוץ - נסה שוב');
    }
  };

  const stopAllTracks = () => {
    try {
      Object.values(audioElements).forEach(audio => {
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
      });
      setAudioElements({});
      setPlayingTrack(null);
      setCurrentTime(0);
    } catch (error) {
      console.error('❌ שגיאה בעצירת כל הערוצים:', error);
      // לא מציג שגיאה למשתמש כי זה לא קריטי
    }
  };

  const setTrackVolume = (trackId, volume) => {
    try {
      setVolumeLevels(prev => ({ ...prev, [trackId]: volume }));
      
      if (audioElements[trackId]) {
        audioElements[trackId].volume = volume;
      }
    } catch (error) {
      console.error('❌ שגיאה בעדכון עוצמת ערוץ:', error);
      // לא מציג שגיאה למשתמש כי זה לא קריטי
    }
  };

  const toggleTrackMute = (trackId) => {
    try {
      setMutedTracks(prev => ({ ...prev, [trackId]: !prev[trackId] }));
      
      if (audioElements[trackId]) {
        audioElements[trackId].muted = !mutedTracks[trackId];
      }
    } catch (error) {
      console.error('❌ שגיאה בעדכון השתקת ערוץ:', error);
      // לא מציג שגיאה למשתמש כי זה לא קריטי
    }
  };

  const resetToUpload = () => {
    try {
      setCurrentView('upload');
      setShowUploadForm(true);
      setSelectedProject(null);
      setAudioFiles({});
      setError(null);
      setProgress(0);
      setProcessingStep(null);
      setIsProcessing(false);
      
      // עצירת כל האודיו
      stopAllTracks();
      
      // ניקוי polling
      if (pollingInterval) {
        clearInterval(pollingInterval);
        setPollingInterval(null);
      }
      
      console.log('✅ חזרה למסך העלאה');
    } catch (error) {
      console.error('❌ שגיאה בחזרה למסך העלאה:', error);
      setError('שגיאה בחזרה למסך העלאה - נסה שוב');
    }
  };

  // ניקוי בעת עזיבת הקומפוננטה
  useEffect(() => {
    return () => {
      try {
        if (pollingInterval) {
          clearInterval(pollingInterval);
        }
        if (uploadController) {
          uploadController.abort();
        }
        stopAllTracks();
      } catch (error) {
        console.error('❌ שגיאה בניקוי הקומפוננטה:', error);
        // לא מציג שגיאה למשתמש כי זה לא קריטי
      }
    };
  }, [pollingInterval, uploadController]);

  // אם השרת לא מחובר, הצג הודעת שגיאה
  if (serverStatus === 'disconnected') {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-6">
            <div className="text-6xl">🎵</div>
            <h1 className="text-3xl font-bold text-red-400">לא ניתן להתחבר לשרת</h1>
            <p className="text-gray-300 text-lg">
              השרת לא זמין כרגע. אנא נסה שוב מאוחר יותר או פנה לתמיכה.
            </p>
            {globalError && (
              <div className="bg-red-900/50 border border-red-500 rounded-lg p-4 max-w-md mx-auto">
                <p className="text-red-200">{globalError}</p>
              </div>
            )}
            <button
              onClick={retryConnection}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              נסה שוב
            </button>
          </div>
        </div>
      </div>
    );
  }

  // אם השרת בודק חיבור, הצג טעינה
  if (serverStatus === 'checking') {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-6">
            <div className="text-6xl animate-pulse">🎵</div>
            <h1 className="text-3xl font-bold">בודק חיבור לשרת...</h1>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  // בדיקה אוטומטית של פרויקטים קיימים
  const checkExistingProjects = async () => {
    try {
      console.log('🔍 בודק פרויקטים קיימים...');
      
      const projects = await getProjects();
      if (!projects || !Array.isArray(projects) || projects.length === 0) {
        console.log('📭 אין פרויקטים קיימים');
        return;
      }
      
      console.log(`📁 נמצאו ${projects.length} פרויקטים`);
      
      // בדוק כל פרויקט
      for (const project of projects) {
        if (project.id) {
          console.log(`🔍 בודק פרויקט: ${project.id} (${project.name || 'ללא שם'})`);
          
          const status = await checkProjectStatusAdvanced(project.id);
          console.log(`📊 סטטוס פרויקט ${project.id}:`, status);
          
          if (status.isReady) {
            console.log(`✅ פרויקט ${project.id} מוכן לטעינה!`);
            
            // אם אין פרויקט נבחר כרגע, הצע לטעון את זה
            if (!selectedProject) {
              console.log(`💡 מציע לטעון פרויקט ${project.id}`);
              setError(`הפרויקט "${project.name || project.id}" מוכן! לחץ על "נסה לטעון שוב" כדי לטעון אותו.`);
              return;
            }
          } else {
            console.log(`⚠️ פרויקט ${project.id} לא מוכן:`, status.reason);
          }
        }
      }
      
    } catch (error) {
      console.error('❌ שגיאה בבדיקת פרויקטים קיימים:', error);
    }
  };

  // בדיקה חוזרת של חיבור לשרת
  const retryConnection = async () => {
    console.log('🔄 ===== מתחיל חיבור חוזר לשרת =====');
    console.log('⏰ זמן התחלה:', new Date().toISOString());
    setError(null);
    setGlobalError(null);
    
    try {
      const retryStartTime = performance.now();
      console.log('🔍 שלב 1: בדיקת חיבור לשרת...');
      
      const connectionSuccess = await checkServerConnection();
      const retryTotalTime = performance.now() - retryStartTime;
      
      console.log(`⏱️ זמן חיבור חוזר: ${retryTotalTime.toFixed(0)}ms`);
      console.log('🔗 תוצאת חיבור:', connectionSuccess);
      
      if (connectionSuccess) {
        console.log(`✅ חיבור חוזר לשרת הצליח (${retryTotalTime.toFixed(0)}ms)`);
        setError(null);
        
        // טעינת פרויקטים אוטומטית אחרי חיבור מוצלח
        if (retryTotalTime < 3000) { // רק אם החיבור מהיר
          console.log('📋 טוען פרויקטים אחרי חיבור מוצלח...');
          setTimeout(() => {
            loadProjects().catch(err => {
              console.warn('⚠️ שגיאה בטעינת פרויקטים אחרי חיבור:', err);
            });
          }, 500);
        }
      } else {
        console.log(`❌ חיבור חוזר לשרת נכשל (${retryTotalTime.toFixed(0)}ms)`);
        setError('חיבור חוזר לשרת נכשל - נסה שוב או פנה לתמיכה');
      }
      
      console.log('🔄 ===== חיבור חוזר הושלם =====');
      
    } catch (error) {
      console.error('❌ ===== שגיאה בחיבור חוזר =====');
      console.error('📊 פרטי השגיאה:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      
      setError('חיבור חוזר לשרת נכשל - נסה שוב או פנה לתמיכה');
    }
  };

  // בדיקת חיבור לשרת
  const checkServerConnection = async () => {
    console.log('🔗 ===== מתחיל בדיקת חיבור לשרת =====');
    console.log('⏰ זמן בדיקה:', new Date().toISOString());
    
    try {
      setServerConnected(false);
      setGlobalError(null);
      
      console.log('🔍 שלב 1: בדיקת חיבור בסיסי...');
      const startTime = performance.now();
      
      const healthResult = await healthCheck();
      const responseTime = performance.now() - startTime;
      
      console.log(`⏱️ זמן תגובה: ${responseTime.toFixed(0)}ms`);
      console.log('📊 תוצאת בדיקת בריאות:', healthResult);
      
      if (!healthResult) {
        console.error('❌ לא התקבלה תשובה מבדיקת הבריאות');
        setGlobalError('השרת לא מגיב - בדוק את החיבור לאינטרנט');
        return false;
      }
      
      if (healthResult.error) {
        console.error('❌ שגיאה בבדיקת הבריאות:', healthResult.error);
        setGlobalError(`שגיאה בשרת: ${healthResult.error}`);
        return false;
      }
      
      console.log('✅ בדיקת בריאות עברה בהצלחה');
      
      console.log('🔍 שלב 2: בדיקת חיבור מתקדמת...');
      const advancedStartTime = performance.now();
      
      const connectionResult = await testServerConnection();
      const advancedResponseTime = performance.now() - advancedStartTime;
      
      console.log(`⏱️ זמן תגובה מתקדם: ${advancedResponseTime.toFixed(0)}ms`);
      console.log('📊 תוצאת בדיקת חיבור מתקדמת:', connectionResult);
      
      if (!connectionResult) {
        console.error('❌ לא התקבלה תשובה מבדיקת החיבור המתקדמת');
        setGlobalError('השרת לא מגיב לבדיקות מתקדמות');
        return false;
      }
      
      if (connectionResult.error) {
        console.error('❌ שגיאה בבדיקת חיבור מתקדמת:', connectionResult.error);
        setGlobalError(`שגיאה בחיבור מתקדם: ${connectionResult.error}`);
        return false;
      }
      
      console.log('✅ בדיקת חיבור מתקדמת עברה בהצלחה');
      
      console.log('🔍 שלב 3: בדיקת זמינות endpoints...');
      const endpointsStartTime = performance.now();
      
      try {
        // בדיקת endpoint של פרויקטים
        const projectsResult = await getProjects();
        const projectsResponseTime = performance.now() - endpointsStartTime;
        
        console.log(`⏱️ זמן תגובה פרויקטים: ${projectsResponseTime.toFixed(0)}ms`);
        console.log('📊 תוצאת בדיקת פרויקטים:', projectsResult);
        
        if (Array.isArray(projectsResult)) {
          console.log(`✅ endpoint פרויקטים עובד - נמצאו ${projectsResult.length} פרויקטים`);
        } else {
          console.warn('⚠️ endpoint פרויקטים החזיר תשובה לא צפויה:', typeof projectsResult);
        }
        
      } catch (endpointError) {
        console.warn('⚠️ שגיאה בבדיקת endpoint פרויקטים:', endpointError.message);
        // זה לא קריטי, נמשיך
      }
      
      // עדכון מצב החיבור
      console.log('✅ ===== כל בדיקות החיבור עברו בהצלחה =====');
      console.log('📊 סיכום ביצועים:', {
        healthCheck: responseTime.toFixed(0) + 'ms',
        advancedCheck: advancedResponseTime.toFixed(0) + 'ms',
        totalTime: (responseTime + advancedResponseTime).toFixed(0) + 'ms'
      });
      
      setServerConnected(true);
      setGlobalError(null);
      
      return true;
      
    } catch (error) {
      console.error('❌ ===== שגיאה בבדיקת חיבור לשרת =====');
      console.error('📊 פרטי השגיאה:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      
      // הודעה מפורטת יותר למשתמש
      let errorMessage = error.message;
      if (error.message.includes('timeout')) {
        errorMessage = 'בדיקת חיבור נכשלה - זמן המתנה ארוך מדי. בדוק את החיבור לאינטרנט';
      } else if (error.message.includes('Failed to fetch')) {
        errorMessage = 'לא ניתן להתחבר לשרת - בדוק את החיבור לאינטרנט';
      } else if (error.message.includes('NetworkError')) {
        errorMessage = 'שגיאת רשת - בדוק את החיבור לאינטרנט';
      } else if (error.message.includes('500')) {
        errorMessage = 'שגיאת שרת - נסה שוב מאוחר יותר';
      } else if (error.message.includes('503')) {
        errorMessage = 'השרת לא זמין כרגע - נסה שוב מאוחר יותר';
      }
      
      setGlobalError(errorMessage);
      setServerConnected(false);
      
      return false;
    }
  };

  // טעינת פרויקטים קיימים
  useEffect(() => {
    if (serverConnected) {
      try {
        console.log('📁 ===== טעינה אוטומטית של פרויקטים =====');
        console.log('⏰ זמן טעינה:', new Date().toISOString());
        
        loadProjects();
        
        // בדיקה אוטומטית של פרויקטים קיימים אחרי 3 שניות
        setTimeout(() => {
          console.log('🔍 ===== בדיקה אוטומטית של פרויקטים קיימים =====');
          checkExistingProjects();
        }, 3000);
        
      } catch (error) {
        console.error('❌ שגיאה בטעינת פרויקטים:', error);
        setError('שגיאה בטעינת פרויקטים - נסה לרענן את הדף');
      }
    }
  }, [serverConnected]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Music className="w-8 h-8 text-purple-400" />
              <h1 className="text-xl font-bold">הפרדת אודיו מתקדמת</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Server Status */}
              <div className="flex items-center space-x-2">
                {serverStatus === 'connected' ? (
                  <Wifi className="w-5 h-5 text-green-400" />
                ) : (
                  <WifiOff className="w-5 h-5 text-red-400" />
                )}
                <span className="text-sm text-gray-300">
                  {serverStatus === 'connected' ? 'מחובר' : 'מנותק'}
                </span>
              </div>
              
              {/* View Toggle */}
              {currentView === 'studio' && (
                <button
                  onClick={resetToUpload}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  פרויקט חדש
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'upload' ? (
          // Upload View
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="text-center space-y-4">
              <div className="text-6xl">🎵</div>
              <h2 className="text-3xl font-bold text-white">
                הפרדת אודיו מתקדמת עם AI
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                הפרד את האודיו שלך ל-5 ערוצים נפרדים: ווקאל, בס, תופים, כלי נגינה ואחר
              </p>
            </div>

            {/* Upload Zone - הצג רק כאשר אין עיבוד */}
            {!isProcessing && (
              <div className="max-w-2xl mx-auto">
                <UploadZone
                  onFileSelect={handleFileUpload}
                  disabled={isProcessing}
                />
              </div>
            )}

            {/* Processing Status - הצג כאשר יש עיבוד */}
            {isProcessing && (
              <div className="max-w-2xl mx-auto">
                {console.log('🔄 מציג מסך התקדמות - isProcessing:', isProcessing, 'step:', processingStep, 'progress:', progress)}
                <ProcessingStatus
                  step={processingStep}
                  progress={progress}
                  error={error}
                  fileName={uploadedFile?.name || selectedFile?.name}
                  onCancel={cancelProcessing}
                  onRetry={selectedProject && selectedProject.id ? 
                    () => retrySpecificProject(selectedProject.id) : 
                    retryProcessing
                  }
                />
              </div>
            )}

            {/* Error Display */}
            {error && (
              <div className="max-w-2xl mx-auto">
                <div className="bg-red-900/50 border border-red-500 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <span className="text-red-200">{error}</span>
                  </div>
                  
                  {/* כפתורי פעולה נוספים */}
                  <div className="flex items-center justify-center space-x-3">
                    <button
                      onClick={checkExistingProjects}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>בדוק פרויקטים קיימים</span>
                    </button>
                    
                    {selectedProject && selectedProject.id && (
                      <button
                        onClick={() => retrySpecificProject(selectedProject.id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span>נסה לטעון שוב</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Existing Projects - הצג רק כאשר אין עיבוד */}
            {!isProcessing && projects.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-center">פרויקטים קיימים</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onSelect={() => loadProject(project.id)}
                      onDelete={() => handleDeleteProject(project.id)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          // Studio View
          <div className="space-y-8">
            {console.log('🔄 מציג מסך סטודיו - currentView:', currentView)}
            {/* Studio Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">סטודיו אודיו</h2>
                {selectedProject && (
                  <p className="text-gray-400">פרויקט: {selectedProject.name}</p>
                )}
              </div>
              
              <button
                onClick={resetToUpload}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                פרויקט חדש
              </button>
            </div>

            {/* Audio Tracks */}
            {Object.keys(audioFiles).length > 0 ? (
              <div className="space-y-6">
                {Object.entries(audioFiles).map(([trackId, trackData]) => (
                  <TrackChannel
                    key={trackId}
                    trackId={trackId}
                    trackData={trackData}
                    isPlaying={playingTrack === trackId}
                    volume={volumeLevels[trackId] || 1.0}
                    isMuted={mutedTracks[trackId] || false}
                    onPlay={() => playTrack(trackId)}
                    onVolumeChange={(volume) => setTrackVolume(trackId, volume)}
                    onMuteToggle={() => toggleTrackMute(trackId)}
                    onDownload={() => handleDownloadStem(selectedProject.id, trackId)}
                  />
                ))}
              </div>
            ) : (
              // הצג EmptyState רק כאשר אין ערוצי אודיו ואין עיבוד פעיל
              !isProcessing ? (
                <EmptyState />
              ) : (
                // הצג מסך התקדמות כאשר יש עיבוד פעיל
                <div className="max-w-2xl mx-auto">
                  <ProcessingStatus
                    step={processingStep}
                    progress={progress}
                    error={error}
                    fileName={uploadedFile?.name || selectedFile?.name}
                    onCancel={cancelProcessing}
                    onRetry={selectedProject && selectedProject.id ? 
                      () => retrySpecificProject(selectedProject.id) : 
                      retryProcessing
                    }
                  />
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioSeparation; 