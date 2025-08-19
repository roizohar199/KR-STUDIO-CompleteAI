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
  useEffect(() => {
    if (serverConnected) {
      try {
        loadProjects();
        
        // בדיקה אוטומטית של פרויקטים קיימים אחרי 3 שניות
        setTimeout(() => {
          checkExistingProjects();
        }, 3000);
      } catch (error) {
        console.error('❌ שגיאה בטעינת פרויקטים:', error);
        setError('שגיאה בטעינת פרויקטים - נסה לרענן את הדף');
      }
    }
  }, [serverConnected]);

  // בדיקה חוזרת של חיבור לשרת
  const retryConnection = async () => {
    console.log('🔄 מנסה חיבור חוזר לשרת...');
    setError(null);
    setGlobalError(null);
    
    // הודעה למשתמש
    console.log('🔄 ===== מתחיל חיבור חוזר לשרת =====');
    
    try {
      const retryStartTime = performance.now();
      await checkServerConnection();
      const retryTotalTime = performance.now() - retryStartTime;
      
      // הודעה למשתמש
      if (serverConnected) {
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
    } catch (error) {
      console.error('❌ שגיאה בחיבור חוזר:', error);
      setError('חיבור חוזר לשרת נכשל - נסה שוב או פנה לתמיכה');
    }
  };

  // בדיקת חיבור לשרת
  const checkServerConnection = async () => {
    try {
      setServerStatus('checking');
      console.log('🔍 בודק חיבור לשרת...');
      
      // בדיקה מהירה של בריאות השרת
      const startTime = performance.now();
      const result = await healthCheck();
      const responseTime = performance.now() - startTime;
      
      console.log(`✅ בדיקת בריאות הצליחה (${responseTime.toFixed(0)}ms):`, result);
      
      setServerConnected(true);
      setServerStatus('connected');
      setGlobalError(null);
      
      // בדיקת חיבור נוספת רק אם הבדיקה הראשונה הצליחה
      if (responseTime < 1000) { // אם התגובה מהירה, נבדוק חיבור נוסף
        try {
          const connectionStartTime = performance.now();
          const connectionResult = await testServerConnection();
          const connectionResponseTime = performance.now() - connectionStartTime;
          
          console.log(`✅ בדיקת חיבור הצליחה (${connectionResponseTime.toFixed(0)}ms):`, connectionResult);
          setConnectionTest(connectionResult);
          
          // לוג ביצועים
          if (connectionResponseTime > 2000) {
            console.warn(`⚠️ תגובה איטית: ${connectionResponseTime.toFixed(0)}ms`);
          }
        } catch (connectionError) {
          console.warn('⚠️ בדיקת חיבור נכשלה:', connectionError.message);
          setConnectionTest({ success: false, error: connectionError.message });
        }
      } else {
        console.log(`⏱️ תגובה איטית (${responseTime.toFixed(0)}ms) - דילוג על בדיקת חיבור נוספת`);
      }
      
    } catch (error) {
      console.error('❌ בדיקת בריאות נכשלה:', error);
      
      // הודעה מפורטת יותר למשתמש
      let errorMessage = error.message;
      if (error.message.includes('timeout')) {
        errorMessage = 'בדיקת חיבור לשרת נכשלה - זמן המתנה ארוך מדי';
      } else if (error.message.includes('Failed to fetch')) {
        errorMessage = 'לא ניתן להתחבר לשרת - בדוק את החיבור לאינטרנט';
      } else if (error.message.includes('NetworkError')) {
        errorMessage = 'שגיאת רשת - בדוק את החיבור לאינטרנט';
      } else if (error.message.includes('500')) {
        errorMessage = 'שגיאת שרת - נסה שוב מאוחר יותר';
      } else if (error.message.includes('503')) {
        errorMessage = 'השרת לא זמין כרגע - נסה שוב מאוחר יותר';
      } else if (error.message.includes('CORS')) {
        errorMessage = 'בעיית הרשאות - השרת לא מאפשר גישה מהדפדפן';
      }
      
      setServerConnected(false);
      setServerStatus('disconnected');
      setGlobalError(`לא ניתן להתחבר לשרת: ${errorMessage}`);
    }
  };

  // טעינת פרויקטים
  const loadProjects = async () => {
    try {
      console.log('📋 טוען פרויקטים...');
      const startTime = performance.now();
      
      const projectsData = await getProjects();
      const loadTime = performance.now() - startTime;
      
      console.log(`📋 פרויקטים נטענו (${loadTime.toFixed(0)}ms):`, projectsData);
      
      if (projectsData && Array.isArray(projectsData)) {
        // בדיקת תקינות הנתונים
        const validProjects = projectsData.filter(project => 
          project && project.id && project.name && project.status
        );
        
        if (validProjects.length !== projectsData.length) {
          console.warn(`⚠️ ${projectsData.length - validProjects.length} פרויקטים לא תקינים נסרקו`);
        }
        
        setProjects(validProjects);
        console.log(`✅ ${validProjects.length} פרויקטים נטענו בהצלחה`);
        
        // לוג ביצועים
        if (loadTime > 2000) {
          console.warn(`⏱️ טעינת פרויקטים איטית: ${loadTime.toFixed(0)}ms`);
        }
      } else {
        console.warn('⚠️ תשובה לא תקינה מ-getProjects:', projectsData);
        setProjects([]);
      }
    } catch (error) {
      console.error('❌ שגיאה בטעינת פרויקטים:', error);
      
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
      
      setError(errorMessage);
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

  // העלאת קובץ והתחלת הפרדה
  const handleFileUpload = async (file) => {
    if (!file) {
      setError('אנא בחר קובץ אודיו');
      return;
    }

    // בדיקת סוג קובץ
    const allowedTypes = [
      'audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/wave', 
      'audio/x-wav', 'audio/flac', 'audio/x-flac', 
      'audio/m4a', 'audio/x-m4a', 'audio/ogg', 'audio/x-ogg'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      setError('סוג קובץ לא נתמך. אנא בחר קובץ אודיו (MP3, WAV, FLAC, M4A, OGG)');
      return;
    }

    // בדיקת גודל קובץ
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      setError(`הקובץ גדול מדי (${Math.round(file.size / 1024 / 1024)}MB). מקסימום: 50MB`);
      return;
    }

    try {
      setError(null);
      setIsProcessing(true);
      setProcessingStep('uploading');
      setProgress(0);
      
      console.log('📤 ===== מתחיל תהליך העלאה =====');
      console.log('📤 שם קובץ:', file.name);
      console.log('📤 גודל קובץ:', Math.round(file.size / 1024 / 1024), 'MB');
      console.log('📤 סוג קובץ:', file.type);

      // יצירת AbortController לביטול
      const controller = new AbortController();
      setUploadController(controller);

      // ניסיונות העלאה עם retry
      let result;
      const maxRetries = 3;
      let retryCount = 0;

      while (retryCount < maxRetries) {
        try {
          console.log(`📤 ניסיון העלאה ${retryCount + 1}/${maxRetries}...`);
          
          // העלאה עם מעקב התקדמות
          result = await uploadAudio(file, (progress) => {
            console.log(`📤 התקדמות העלאה: ${progress}%`);
            setProgress(progress);
          }, controller);
          
          // ניקוי ה-controller
          setUploadController(null);
          
          break; // אם הצליח, צא מהלולאה
        } catch (uploadError) {
          retryCount++;
          console.error(`❌ ניסיון ${retryCount} נכשל:`, uploadError.message);
          
          if (retryCount >= maxRetries) {
            throw new Error(`העלאה נכשלה אחרי ${maxRetries} ניסיונות: ${uploadError.message}`);
          }
          
          // איפוס התקדמות לפני ניסיון נוסף
          setProgress(0);
          
          // המתנה לפני ניסיון נוסף
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }
      
      console.log('📤 תוצאת uploadAudio:', result);
      
      if (!result || !result.file || !result.file.id) {
        throw new Error('תשובה לא תקינה מהשרת - חסר מזהה קובץ');
      }
      
      setUploadedFile(result.file);
      setSelectedFile(file);
      setProgress(100); // עדכון ל-100% כאשר ההעלאה מסתיימת
      
      console.log('✅ קובץ הועלה בהצלחה!');
      console.log('📁 fileId:', result.file.id);
      console.log('📁 שם קובץ:', result.file.name);
      console.log('📁 גודל קובץ:', result.file.size);
      
      // הודעה למשתמש
      setError(null); // ניקוי שגיאות קודמות
      
                // התחלת הפרדה אוטומטית
          console.log('🎵 ===== מתחיל תהליך הפרדה =====');
          console.log('🎵 בדיקת תוצאת העלאה:', result);
          console.log('🎵 האם יש file:', !!result.file);
          console.log('🎵 האם יש file.id:', !!result.file?.id);
          
          setProcessingStep('separating');
          setProgress(0); // איפוס התקדמות לתחילת הפרדה
          
          // יצירת שם פרויקט אוטומטי
          const autoProjectName = file.name.replace(/\.[^/.]+$/, '') + '_' + Date.now();
          setProjectName(autoProjectName);
          
          console.log('🎵 שם פרויקט אוטומטי:', autoProjectName);
          console.log('🎵 fileId לפרדה:', result.file.id);
          
          // התחלת הפרדה
          console.log('📤 שולח בקשת הפרדה לשרת...');
          console.log('📤 קריאה ל-separateAudio עם פרמטרים:', { fileId: result.file.id, projectName: autoProjectName });
          
          try {
            console.log('🎵 לפני קריאה ל-separateAudio...');
            const separationResult = await separateAudio(result.file.id, autoProjectName);
            console.log('🎵 אחרי קריאה ל-separateAudio...');
            
            console.log('🎵 תוצאת הפרדה מהשרת:', separationResult);
            console.log('🎵 סוג תוצאה:', typeof separationResult);
            console.log('🎵 האם יש success:', separationResult && separationResult.success);
            
            if (separationResult && separationResult.success) {
              console.log('✅ הפרדה החלה בהצלחה!');
              console.log('🔄 מתחיל polling להתקדמות...');
              
              // הודעה למשתמש
              setError(null); // ניקוי שגיאות קודמות
              
              // התחלת polling להתקדמות
              startProgressPolling(result.file.id);
              
              console.log('📱 נשארים במסך ההתקדמות עד שההפרדה תסתיים...');
              // נשארים במסך ההתקדמות במקום לעבור לסטודיו
              // setCurrentView('studio');
              // setShowUploadForm(false);
              
              // לא מאפסים את uploadedFile ו-projectName עד שההפרדה תסתיים
              // setUploadedFile(null);
              // setProjectName('');
              
              console.log('📋 לא טוענים פרויקטים עד שההפרדה תסתיים...');
              // לא טוענים פרויקטים עד שההפרדה תסתיים
              // await loadProjects();
              
              console.log('✅ ===== תהליך העלאה והפרדה הושלם בהצלחה =====');
            } else {
              console.error('❌ הפרדה נכשלה - תשובה לא תקינה מהשרת');
              console.error('❌ separationResult:', separationResult);
              console.error('❌ סוג separationResult:', typeof separationResult);
              throw new Error('הפרדה נכשלה - תשובה לא תקינה מהשרת');
            }
          } catch (separationError) {
            console.error('❌ ===== שגיאה בהפרדה =====');
            console.error('❌ פרטי השגיאה:', separationError);
            console.error('❌ הודעת שגיאה:', separationError.message);
            console.error('❌ Stack trace:', separationError.stack);
            console.error('❌ שם השגיאה:', separationError.name);
            throw separationError;
          }
      
    } catch (error) {
      console.error('❌ ===== שגיאה בתהליך העלאה/הפרדה =====');
      console.error('❌ פרטי השגיאה:', error);
      console.error('❌ הודעת שגיאה:', error.message);
      console.error('❌ Stack trace:', error.stack);
      
      // הודעה מפורטת יותר למשתמש
      let errorMessage = error.message;
      if (error.message.includes('timeout')) {
        errorMessage = 'העלאה נכשלה - זמן המתנה ארוך מדי. נסה שוב או בדוק את החיבור לאינטרנט';
      } else if (error.message.includes('Failed to fetch')) {
        errorMessage = 'לא ניתן להתחבר לשרת - בדוק את החיבור לאינטרנט';
      } else if (error.message.includes('NetworkError')) {
        errorMessage = 'שגיאת רשת - בדוק את החיבור לאינטרנט';
      } else if (error.message.includes('413')) {
        errorMessage = 'הקובץ גדול מדי - מקסימום 50MB';
      } else if (error.message.includes('415')) {
        errorMessage = 'סוג קובץ לא נתמך - אנא בחר קובץ אודיו (MP3, WAV, FLAC, M4A, OGG)';
      } else if (error.message.includes('500')) {
        errorMessage = 'שגיאת שרת - נסה שוב מאוחר יותר או פנה לתמיכה';
      } else if (error.message.includes('503')) {
        errorMessage = 'השרת לא זמין כרגע - נסה שוב מאוחר יותר';
      }
      
      setError(errorMessage);
      setIsProcessing(false);
      setProcessingStep(null);
      setProgress(0);
      
      // איפוס המצב כאשר יש שגיאה
      setUploadedFile(null);
      setProjectName('');
      
      // הודעה למשתמש
      console.error('❌ ===== שגיאה בתהליך העלאה/הפרדה =====');
    }
  };

  // התחלת הפרדה
  const startSeparation = async () => {
    if (!uploadedFile || !projectName.trim()) {
      setError('אנא הכנס שם לפרויקט');
      return;
    }

    try {
      setError(null);
      setProcessingStep('separating');
      setIsProcessing(true);
      setProgress(0);

      console.log('🎵 ===== מתחיל הפרדה =====');
      console.log('🎵 שם פרויקט:', projectName);
      console.log('🎵 fileId:', uploadedFile.id);
      console.log('🎵 נשארים במסך ההתקדמות...');
      console.log('🎵 מצב עיבוד:', { isProcessing: true, processingStep: 'separating', progress: 0, currentView: 'upload' });
      
      const result = await separateAudio(uploadedFile.id, projectName);
      
      if (result && result.success) {
        console.log('✅ הפרדה החלה:', result);
        console.log('🔄 נשארים במסך ההתקדמות - לא עוברים לסטודיו עד שההפרדה תסתיים');
        console.log('🔄 מצב עיבוד אחרי התחלת הפרדה:', { isProcessing: true, processingStep: 'separating', progress: 0, currentView: 'upload' });
        
        // התחלת polling להתקדמות
        startProgressPolling(uploadedFile.id);
        
        // נשארים במסך ההתקדמות במקום לעבור לסטודיו
        // setCurrentView('studio');
        // setShowUploadForm(false);
        
        console.log('🔄 נשארים במסך ההתקדמות...');
        
        // לא מאפסים את uploadedFile ו-projectName עד שההפרדה תסתיים
        // setUploadedFile(null);
        // setProjectName('');
        
        // לא טוענים פרויקטים עד שההפרדה תסתיים
        // await loadProjects();
      } else {
        throw new Error('הפרדה נכשלה - תשובה לא תקינה מהשרת');
      }
      
    } catch (error) {
      console.error('❌ שגיאה בהפרדה:', error);
      
      // הודעה מפורטת יותר למשתמש
      let errorMessage = error.message;
      if (error.message.includes('timeout')) {
        errorMessage = 'הפרדה נכשלה - זמן המתנה ארוך מדי. נסה שוב או בדוק את החיבור לאינטרנט';
      } else if (error.message.includes('Failed to fetch')) {
        errorMessage = 'לא ניתן להתחבר לשרת - בדוק את החיבור לאינטרנט';
      } else if (error.message.includes('NetworkError')) {
        errorMessage = 'שגיאה ברשת - בדוק את החיבור לאינטרנט';
      } else if (error.message.includes('500')) {
        errorMessage = 'שגיאת שרת - נסה שוב מאוחר יותר או פנה לתמיכה';
      } else if (error.message.includes('503')) {
        errorMessage = 'השרת לא זמין כרגע - נסה שוב מאוחר יותר';
      }
      
      setError(errorMessage);
      setIsProcessing(false);
      setProcessingStep(null);
      setProgress(0);
      
      // איפוס המצב כאשר יש שגיאה
      setUploadedFile(null);
      setProjectName('');
      
      // הודעה למשתמש
      console.error('❌ ===== שגיאה בהפרדה =====');
    }
  };

  // Polling להתקדמות
  const startProgressPolling = (fileId) => {
    console.log('🔄 ===== מתחיל polling להתקדמות =====');
    console.log('🔄 fileId:', fileId);
    console.log('🔄 מתחיל בדיקות כל 2 שניות...');
    console.log('🔄 המערכת נשארת במסך ההתקדמות עד שההפרדה תסתיים');
    
    // שמירת זמן התחלה
    const startTime = Date.now();
    
    const interval = setInterval(async () => {
      try {
        console.log('📊 ===== בדיקת התקדמות =====');
        console.log('📊 fileId:', fileId);
        console.log('📊 זמן בדיקה:', new Date().toLocaleTimeString());
        console.log('📊 מספר ניסיון:', Math.floor((Date.now() - startTime) / 2000));
        console.log('📊 מצב עיבוד נוכחי:', { isProcessing, processingStep, progress, currentView });
        
        const progressData = await getSeparationProgress(fileId);
        
        console.log('📊 נתוני התקדמות מהשרת:', progressData);
        console.log('📊 התקדמות:', progressData.progress + '%');
        console.log('📊 סטטוס:', progressData.status);
        console.log('📊 הודעה:', progressData.message);
        console.log('📊 שגיאה:', progressData.error);
        
        if (progressData.error) {
          console.error('❌ שגיאה מהשרת:', progressData.error);
          setError(`שגיאה מהשרת: ${progressData.error}`);
          setIsProcessing(false);
          setProcessingStep(null);
          setProgress(0);
          
          // איפוס המצב כאשר יש שגיאה
          setUploadedFile(null);
          setProjectName('');
          
          clearInterval(interval);
          return;
        }
        
        if (progressData.status === 'completed') {
          console.log('✅ הפרדה הושלמה בהצלחה!');
          console.log('⏳ ממתין לטעינת הפרויקט המוכן...');
          setProgress(100);
          setProcessingStep('loading-project');
          
          // השאר את מסך ההתקדמות פעיל
          console.log('📊 נשאר במסך ההתקדמות עד שהפרויקט נטען');
          
          clearInterval(interval);
          
          // המתן יותר זמן לוודא שהקבצים מוכנים בשרת
          setTimeout(async () => {
            console.log('🔄 מתחיל לבדוק אם הפרויקט מוכן...');
            
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
                  let latestProject = newProjects.find(p => p.id === fileId);
                  if (!latestProject) {
                    latestProject = newProjects[newProjects.length - 1];
                  }
                  
                  if (latestProject && latestProject.id) {
                    console.log('📁 נמצא פרויקט:', latestProject.id);
                    
                    // בדיקה שהפרויקט מוכן
                    const projectData = await getProject(latestProject.id);
                    console.log('📊 נתוני פרויקט:', projectData);
                    
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
                          // עכשיו אפשר לעבור לסטודיו
                          setIsProcessing(false);
                          setUploadedFile(null);
                          setProjectName('');
                          setError(null); // ניקוי שגיאות קודמות
                          console.log('🎉 הפרויקט נטען בהצלחה!');
                          return; // יציאה מוצלחת
                        } else {
                          console.warn('⚠️ הפרויקט לא נטען בהצלחה, מנסה שוב...');
                        }
                      } else {
                        console.warn('⚠️ הפרויקט לא מוכן לחלוטין:', advancedStatus.reason);
                        console.log('📊 פרטים:', advancedStatus.details);
                      }
                    } else {
                      console.warn('⚠️ הפרויקט עדיין לא מוכן:', {
                        success: projectData?.success,
                        hasProject: !!projectData?.project,
                        stemsCount: projectData?.project?.stems ? Object.keys(projectData.project.stems).length : 0
                      });
                    }
                  } else {
                    console.warn('⚠️ לא נמצא פרויקט עם ID תקין');
                  }
                } else {
                  console.warn('⚠️ לא נמצאו פרויקטים ברשימה');
                }
                
                // אם לא הצלחנו, נסה שוב אחרי המתנה
                if (attempts < maxAttempts) {
                  // זמני המתנה חכמים - המתנה ארוכה יותר ככל שמספר הניסיונות עולה
                  const waitTime = Math.min(2000 + (attempts * 1000), 10000); // 2-10 שניות
                  console.log(`⏳ ממתין ${waitTime/1000} שניות לפני ניסיון נוסף... (${attempts}/${maxAttempts})`);
                  setTimeout(tryToLoadProject, waitTime);
                } else {
                  console.error('❌ הגענו למספר המקסימלי של ניסיונות');
                  setError('הפרויקט לא נטען לאחר מספר ניסיונות. נסה לרענן את הדף או לחץ על "פתח בסטודיו" מהרשימה.');
                  setIsProcessing(false);
                  setUploadedFile(null);
                  setProjectName('');
                }
                
              } catch (loadError) {
                console.error(`❌ שגיאה בניסיון ${attempts}:`, loadError);
                
                if (attempts < maxAttempts) {
                  // זמני המתנה חכמים גם במקרה של שגיאה
                  const waitTime = Math.min(3000 + (attempts * 1000), 12000); // 3-12 שניות
                  console.log(`⏳ ממתין ${waitTime/1000} שניות לפני ניסיון נוסף... (${attempts}/${maxAttempts})`);
                  setTimeout(tryToLoadProject, waitTime);
                } else {
                  console.error('❌ הגענו למספר המקסימלי של ניסיונות');
                  setError('שגיאה בטעינת הפרויקט לאחר מספר ניסיונות. נסה לרענן את הדף או לחץ על "פתח בסטודיו" מהרשימה.');
                  setIsProcessing(false);
                  setUploadedFile(null);
                  setProjectName('');
                }
              }
            };
            
            // התחל את הניסיונות אחרי המתנה קצרה יותר
            setTimeout(tryToLoadProject, 3000); // המתן 3 שניות במקום 5
            
          }, 5000); // המתן 5 שניות לפני התחלת הניסיונות
          
          return;
        }
        
        // עדכון התקדמות
        if (progressData.progress !== undefined) {
          setProgress(progressData.progress);
          console.log(`📈 התקדמות עודכנה ל: ${progressData.progress}%`);
        }
        
        // עדכון שלב העיבוד
        if (progressData.status) {
          setProcessingStep(progressData.status);
          console.log(`🔄 שלב עיבוד עודכן ל: ${progressData.status}`);
        }
        
        // עדכון הודעת עיבוד
        if (progressData.message) {
          console.log(`💬 הודעת עיבוד: ${progressData.message}`);
        }
        
        // בדיקה אם התהליך תקוע
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime > 300000) { // 5 דקות
          console.warn('⚠️ התהליך תקוע יותר מ-5 דקות');
          setError('התהליך תקוע - נסה שוב או פנה לתמיכה');
          setIsProcessing(false);
          setProcessingStep(null);
          setProgress(0);
          
          // איפוס המצב כאשר התהליך תקוע
          setUploadedFile(null);
          setProjectName('');
          
          clearInterval(interval);
        }
        
      } catch (error) {
        console.error('❌ שגיאה בבדיקת התקדמות:', error);
        
        // בדיקה אם השגיאה היא בגלל שהקובץ לא נמצא (אולי הושלם)
        if (error.message.includes('not found') || error.message.includes('404')) {
          console.log('📁 הקובץ לא נמצא - ייתכן שההפרדה הושלמה');
          
          // בדיקה אם יש פרויקטים חדשים
          await loadProjects();
          
          // אם יש פרויקטים, כנראה שההפרדה הושלמה
          if (projects.length > 0) {
            console.log('✅ הפרדה הושלמה בהצלחה!');
            console.log('🔄 עוברים לסטודיו...');
            setProgress(100);
            setIsProcessing(false);
            setProcessingStep('completed');
            
            // מעבר לסטודיו
            setCurrentView('studio');
            setShowUploadForm(false);
            
            clearInterval(interval);
            return;
          }
        }
        
        // אם השגיאה נמשכת, עצור את ה-polling
        if (Date.now() - startTime > 60000) { // דקה
          console.error('❌ יותר מדי שגיאות - עצירת polling');
          setError('שגיאה בבדיקת התקדמות - נסה שוב');
          setIsProcessing(false);
          setProcessingStep(null);
          setProgress(0);
          
          // איפוס המצב כאשר יש יותר מדי שגיאות
          setUploadedFile(null);
          setProjectName('');
          
          clearInterval(interval);
        }
        
        // הצג שגיאה למשתמש
        if (error.message.includes('timeout')) {
          setError('בדיקת התקדמות נכשלה - זמן המתנה ארוך מדי');
        } else if (error.message.includes('Failed to fetch')) {
          setError('לא ניתן להתחבר לשרת - בדוק את החיבור לאינטרנט');
        } else if (error.message.includes('NetworkError')) {
          setError('שגיאה ברשת - בדוק את החיבור לאינטרנט');
        } else {
          setError(`שגיאה בבדיקת התקדמות: ${error.message}`);
        }
      }
    }, 2000);
    
    setPollingInterval(interval);
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