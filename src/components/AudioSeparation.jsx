import React, { useState, useEffect, useRef } from 'react';
import { Upload, Play, Pause, Download, Trash2, Music, Mic, Volume2, CircleDot, Zap, FileAudio, BarChart3, VolumeX, AlertCircle, Plus, Grid, List, Wifi, WifiOff } from 'lucide-react';
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
  }, [audioFiles]);

  // בדיקת חיבור לשרת
  useEffect(() => {
    checkServerConnection();
  }, []);

  // טעינת פרויקטים קיימים
  useEffect(() => {
    if (serverConnected) {
      loadProjects();
    }
  }, [serverConnected]);

  // בדיקה חוזרת של חיבור לשרת
  const retryConnection = async () => {
    console.log('🔄 מנסה חיבור חוזר לשרת...');
    setError(null);
    
    // הודעה למשתמש
    console.log('🔄 ===== מתחיל חיבור חוזר לשרת =====');
    
    await checkServerConnection();
    
    // הודעה למשתמש
    if (serverConnected) {
      console.log('✅ חיבור חוזר לשרת הצליח');
    } else {
      console.log('❌ חיבור חוזר לשרת נכשל');
    }
  };

  // טעינת פרויקטים
  const loadProjects = async () => {
    if (!serverConnected) return;
    
    try {
      console.log('📋 טוען פרויקטים...');
      const projectsList = await getProjects();
      setProjects(projectsList);
      console.log('✅ פרויקטים נטענו:', projectsList);
      
      // הודעה למשתמש
      if (projectsList.length > 0) {
        console.log(`📋 נטענו ${projectsList.length} פרויקטים`);
      } else {
        console.log('📋 אין פרויקטים זמינים');
      }
      
    } catch (error) {
      console.error('❌ שגיאה בטעינת פרויקטים:', error);
      setError(`שגיאה בטעינת פרויקטים: ${error.message}`);
    }
  };

  // העלאת קובץ
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // בדיקה אם השרת מחובר
    if (!serverConnected) {
      setError('השרת לא מחובר. אנא בדוק את החיבור ונסה שוב.');
      return;
    }

    try {
      console.log('🚀 ===== התחלת תהליך העלאה והפרדה =====');
      console.log('📁 קובץ נבחר:', file.name, 'גודל:', file.size, 'bytes');
      
      setError(null);
      setProcessingStep('uploading');
      setIsProcessing(true);
      setProgress(0);

      console.log('📤 מתחיל העלאה לשרת...');
      
      // בדיקת גודל הקובץ
      const maxSize = 200 * 1024 * 1024; // 200MB
      if (file.size > maxSize) {
        throw new Error(`הקובץ גדול מדי (${Math.round(file.size / 1024 / 1024)}MB). מקסימום: 200MB`);
      }
      
      console.log('✅ גודל קובץ תקין, מתחיל העלאה...');
      
      // הודעה למשתמש
      setError(null); // ניקוי שגיאות קודמות
      
      console.log('📤 מתחיל העלאה לשרת...');
      
      // ניסיון העלאה עם retry ומעקב התקדמות
      let result;
      let retryCount = 0;
      const maxRetries = 3;
      
      while (retryCount < maxRetries) {
        try {
          console.log(`📤 ניסיון העלאה ${retryCount + 1}/${maxRetries}...`);
          
          // יצירת AbortController לביטול העלאה
          const controller = { xhr: null };
          setUploadController(controller);
          
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
          
          console.log('📱 מעבר למסך הסטודיו...');
          // מעבר למסך הסטודיו
          setCurrentView('studio');
          setShowUploadForm(false);
          setUploadedFile(null);
          setProjectName('');
          
          console.log('📋 טוען פרויקטים מחדש...');
          // טעינה מחדש של פרויקטים
          await loadProjects();
          
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
      }
      
      setError(errorMessage);
      setIsProcessing(false);
      setProcessingStep(null);
      setProgress(0);
      
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

      console.log('🎵 מתחיל הפרדה:', projectName);
      
      const result = await separateAudio(uploadedFile.id, projectName);
      
      if (result.success) {
        console.log('✅ הפרדה החלה:', result);
        
        // התחלת polling להתקדמות
        startProgressPolling(uploadedFile.id);
        
        // מעבר למסך הסטודיו
        setCurrentView('studio');
        setShowUploadForm(false);
        setUploadedFile(null);
        setProjectName('');
        
        // טעינה מחדש של פרויקטים
        await loadProjects();
      } else {
        throw new Error('הפרדה נכשלה - תשובה לא תקינה מהשרת');
      }
      
    } catch (error) {
      console.error('❌ שגיאה בהפרדה:', error);
      setError(`שגיאה בהפרדה: ${error.message}`);
      setIsProcessing(false);
      setProcessingStep(null);
      
      // הודעה למשתמש
      console.error('❌ ===== שגיאה בהפרדה =====');
    }
  };

  // Polling להתקדמות
  const startProgressPolling = (fileId) => {
    console.log('🔄 ===== מתחיל polling להתקדמות =====');
    console.log('🔄 fileId:', fileId);
    console.log('🔄 מתחיל בדיקות כל 2 שניות...');
    
    const interval = setInterval(async () => {
      try {
        console.log('📊 ===== בדיקת התקדמות =====');
        console.log('📊 fileId:', fileId);
        console.log('📊 זמן בדיקה:', new Date().toLocaleTimeString());
        console.log('📊 מספר ניסיון:', Math.floor((Date.now() - startTime) / 2000));
        
        const progressData = await getSeparationProgress(fileId);
        
        console.log('📊 נתוני התקדמות מהשרת:', progressData);
        console.log('📊 התקדמות:', progressData.progress + '%');
        console.log('📊 סטטוס:', progressData.status);
        console.log('📊 הודעה:', progressData.message);
        console.log('📊 שגיאה:', progressData.error);
        
        setProgress(progressData.progress);
        
        // עדכון הודעות מפורטות
        if (progressData.message) {
          console.log('📊 הודעת התקדמות:', progressData.message);
        }
        
        if (progressData.status === 'completed') {
          console.log('✅ ===== הפרדה הושלמה בהצלחה! =====');
          console.log('✅ fileId:', fileId);
          console.log('✅ זמן סיום:', new Date().toLocaleTimeString());
          
          clearInterval(interval);
          setIsProcessing(false);
          setProgress(100);
          setProcessingStep('completed');
          
          // הודעה למשתמש
          setError(null); // ניקוי שגיאות קודמות
          
          console.log('📋 טוען פרויקטים מחדש...');
          // טעינה מחדש של פרויקטים
          await loadProjects();
          
          console.log('✅ ===== תהליך polling הסתיים בהצלחה =====');
          
        } else if (progressData.status === 'failed') {
          console.error('❌ ===== הפרדה נכשלה =====');
          console.error('❌ fileId:', fileId);
          console.error('❌ שגיאה:', progressData.error);
          console.error('❌ זמן כשל:', new Date().toLocaleTimeString());
          
          setError(`הפרדה נכשלה: ${progressData.error}`);
          clearInterval(interval);
          setIsProcessing(false);
          setProcessingStep('failed');
          
          // הודעה למשתמש
          console.error('❌ ===== תהליך polling הסתיים בכשל =====');
        } else if (progressData.status === 'processing' || progressData.status === 'separating') {
          console.log('🔄 עדיין מעבד... התקדמות:', progressData.progress + '%');
          
          // בדיקה אם ההתקדמות תקועה
          if (progressData.progress > 0 && progressData.progress < 100) {
            console.log('🔄 התקדמות תקועה ב-', progressData.progress + '%');
          }
        }
        
      } catch (error) {
        console.error('❌ ===== שגיאה בקבלת התקדמות =====');
        console.error('❌ fileId:', fileId);
        console.error('❌ זמן שגיאה:', new Date().toLocaleTimeString());
        console.error('❌ פרטי השגיאה:', error);
        console.error('❌ הודעת שגיאה:', error.message);
        console.error('❌ Stack trace:', error.stack);
        
        // בדיקה אם השגיאה היא בגלל חיבור
        if (error.message.includes('Failed to fetch') || error.message.includes('timeout')) {
          console.error('❌ בעיית חיבור לשרת');
          setError('איבדנו חיבור לשרת - נסה לרענן את הדף');
        } else {
          console.error('❌ שגיאה אחרת');
          setError(`שגיאה בקבלת התקדמות: ${error.message}`);
        }
        
        clearInterval(interval);
        setIsProcessing(false);
        setProcessingStep('failed');
        
        // הודעה למשתמש
        console.error('❌ ===== תהליך polling הסתיים בשגיאה =====');
      }
    }, 2000); // בדיקה כל 2 שניות
    
    setPollingInterval(interval);
    console.log('🔄 polling interval נוצר:', interval);
    
    // שמירת זמן התחלה
    const startTime = Date.now();
  };

  // ניקוי polling
  useEffect(() => {
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    };
  }, [pollingInterval]);

  // ניקוי העלאה בעת עזיבת הקומפוננטה
  useEffect(() => {
    return () => {
      if (uploadController && uploadController.xhr) {
        uploadController.xhr.abort();
      }
    };
  }, [uploadController]);

  // ביטול העלאה
  const cancelUpload = () => {
    try {
      console.log('❌ מבטל העלאה...');
      
      if (uploadController && uploadController.xhr) {
        uploadController.xhr.abort();
        console.log('✅ העלאה בוטלה');
      }
      
      setUploadController(null);
      setIsProcessing(false);
      setProcessingStep(null);
      setProgress(0);
      setError(null);
      
      // הודעה למשתמש
      console.log('✅ מצב העלאה אופס');
      
    } catch (error) {
      console.error('❌ שגיאה בביטול העלאה:', error);
      setError(`שגיאה בביטול העלאה: ${error.message}`);
    }
  };

  // בחירת פרויקט
  const selectProject = async (project) => {
    try {
      console.log('📁 בוחר פרויקט:', project.id);
      
      const fullProject = await getProject(project.id);
      setSelectedProject(fullProject);
      
      // טעינת קבצי אודיו
      await loadAudioFiles(fullProject);
      
      // הודעה למשתמש
      console.log('✅ פרויקט נטען בהצלחה:', fullProject.name);
      setError(null); // ניקוי שגיאות קודמות
      
    } catch (error) {
      console.error('❌ שגיאה בבחירת פרויקט:', error);
      setError(`שגיאה בטעינת פרויקט: ${error.message}`);
    }
  };

  // טעינת קבצי אודיו
  const loadAudioFiles = async (project) => {
    if (!project.separatedTracks) {
      console.log('❌ אין קבצי STEMS לפרויקט');
      setError('אין קבצי STEMS לפרויקט זה');
      return;
    }

    try {
      console.log('🎵 טוען קבצי אודיו...');
      console.log('🎵 separatedTracks:', project.separatedTracks);
      
      const audioFiles = {};
      const stems = ['vocals', 'drums', 'bass', 'guitar', 'other'];
      
      // אתחול ערכי ברירת מחדל
      const defaultVolumeLevels = {};
      const defaultMutedTracks = {};
      
      for (const stem of stems) {
        try {
          const audioUrl = project.separatedTracks[stem];
          if (audioUrl) {
            console.log(`🎵 יוצר אודיו עבור ${stem}:`, audioUrl);
            
            const audio = new Audio();
            
            // הגדרת מאפיינים חשובים
            audio.preload = 'metadata';
            audio.crossOrigin = 'anonymous';
            
            // הוספת event listeners
            audio.addEventListener('loadeddata', () => {
              console.log(`✅ ${stem} נטען בהצלחה, משך: ${audio.duration}s`);
            });
            
            audio.addEventListener('canplay', () => {
              console.log(`🎵 ${stem} מוכן לנגינה`);
            });
            
            audio.addEventListener('error', (e) => {
              console.error(`❌ שגיאה בטעינת ${stem}:`, e);
              console.error(`❌ פרטי שגיאה:`, audio.error);
            });
            
            audio.addEventListener('ended', () => {
              console.log(`⏹️ ${stem} הסתיים`);
              if (playingTrack === stem) {
                setPlayingTrack(null);
              }
            });
            
            // הגדרת ה-URL
            audio.src = audioUrl;
            
            // שמירת האודיו
            audioFiles[stem] = audio;
            
            // אתחול ערכי ברירת מחדל
            defaultVolumeLevels[stem] = 0.75;
            defaultMutedTracks[stem] = false;
            
            // הגדרת עוצמה ברירת מחדל
            audio.volume = 0.75;
            
            console.log(`✅ ${stem} נוצר בהצלחה`);
          } else {
            console.log(`⚠️ אין URL עבור ${stem}`);
          }
        } catch (error) {
          console.error(`❌ שגיאה בטעינת ${stem}:`, error);
        }
      }
      
      setAudioFiles(audioFiles);
      setVolumeLevels(defaultVolumeLevels);
      setMutedTracks(defaultMutedTracks);
      
      console.log('✅ כל קבצי האודיו נטענו:', Object.keys(audioFiles));
      console.log('✅ ערכי ברירת מחדל נקבעו:', defaultVolumeLevels);
      
      // איפוס מצב הפעלה
      setPlayingTrack(null);
      
      // הודעה למשתמש
      if (Object.keys(audioFiles).length > 0) {
        console.log('🎵 הפרויקט מוכן להאזנה!');
      } else {
        console.warn('⚠️ לא נטענו קבצי אודיו');
      }
      
    } catch (error) {
      console.error('❌ שגיאה בטעינת קבצי אודיו:', error);
      setError(`שגיאה בטעינת קבצי אודיו: ${error.message}`);
    }
  };

  // הורדת ערוץ
  const downloadTrack = async (trackName) => {
    if (!selectedProject) return;
    
    try {
      console.log('📥 מוריד ערוץ:', trackName);
      await downloadStem(selectedProject.id, trackName);
      console.log('✅ ערוץ הורד:', trackName);
      
      // הודעה למשתמש
      setError(null); // ניקוי שגיאות קודמות
      
    } catch (error) {
      console.error('❌ שגיאה בהורדת ערוץ:', error);
      setError(`שגיאה בהורדת ערוץ: ${error.message}`);
    }
  };

  // מחיקת פרויקט
  const deleteProject = async (projectId) => {
    try {
      console.log('🗑️ מוחק פרויקט:', projectId);
      await deleteProject(projectId);
      console.log('✅ פרויקט נמחק:', projectId);
      
      // טעינה מחדש של פרויקטים
      await loadProjects();
      
      // אם הפרויקט שנמחק היה נבחר, נקה את הבחירה
      if (selectedProject && selectedProject.id === projectId) {
        setSelectedProject(null);
        setAudioFiles({});
        setPlayingTrack(null);
        setVolumeLevels({});
        setMutedTracks({});
        setError(null);
        console.log('🧹 מצב הפרויקט נוקה');
      }
      
      // הודעה למשתמש
      setError(null); // ניקוי שגיאות קודמות
      
    } catch (error) {
      console.error('❌ שגיאה במחיקת פרויקט:', error);
      setError(`שגיאה במחיקת פרויקט: ${error.message}`);
    }
  };

  // שינוי עוצמה
  const handleVolumeChange = (trackName, newVolume) => {
    try {
      console.log(`🔊 שינוי עוצמה של ${trackName} ל-${newVolume}`);
      
      setVolumeLevels(prev => ({
        ...prev,
        [trackName]: newVolume
      }));
      
      // עדכון עוצמה בקבצי אודיו
      if (audioFiles[trackName]) {
        const audio = audioFiles[trackName];
        const isMuted = mutedTracks[trackName];
        const masterVolume = 0.75; // עוצמה ברירת מחדל
        
        if (isMuted) {
          audio.volume = 0;
        } else {
          audio.volume = newVolume * masterVolume;
        }
        
        console.log(`🔊 עוצמה של ${trackName} עודכנה ל-${audio.volume}`);
      }
      
      console.log(`✅ עוצמה של ${trackName} שונתה בהצלחה`);
      
      // הודעה למשתמש
      setError(null); // ניקוי שגיאות קודמות
      
    } catch (error) {
      console.error('❌ שגיאה בשינוי עוצמה:', error);
      setError(`שגיאה בשינוי עוצמה: ${error.message}`);
    }
  };

  // הפעלה/כיבוי ערוץ
  const toggleMute = (trackName) => {
    try {
      console.log(`🔇 ${trackName} - שינוי מצב השתקה...`);
      
      const newMutedState = !mutedTracks[trackName];
      
      setMutedTracks(prev => ({
        ...prev,
        [trackName]: newMutedState
      }));
      
      // עדכון עוצמה בקבצי אודיו
      if (audioFiles[trackName]) {
        const audio = audioFiles[trackName];
        const trackVolume = volumeLevels[trackName] || 0.75;
        
        if (newMutedState) {
          audio.volume = 0;
          console.log(`🔇 ${trackName} הושתק`);
        } else {
          audio.volume = trackVolume;
          console.log(`🔊 ${trackName} הופעל, עוצמה: ${trackVolume}`);
        }
      }
      
      console.log(`✅ ${trackName} ${newMutedState ? 'הושתק' : 'הופעל'} בהצלחה`);
      
      // הודעה למשתמש
      setError(null); // ניקוי שגיאות קודמות
      
    } catch (error) {
      console.error('❌ שגיאה בהפעלה/כיבוי ערוץ:', error);
      setError(`שגיאה בהפעלה/כיבוי ערוץ: ${error.message}`);
    }
  };

  // עצירת כל הערוצים
  const stopAllTracks = () => {
    try {
      console.log('⏹️ עוצר את כל הערוצים...');
      
      Object.entries(audioFiles).forEach(([trackName, audio]) => {
        if (audio) {
          try {
            audio.pause();
            audio.currentTime = 0;
            console.log(`⏹️ ${trackName} נעצר`);
          } catch (error) {
            console.error(`❌ שגיאה בעצירת ${trackName}:`, error);
          }
        }
      });
      
      setPlayingTrack(null);
      console.log('✅ כל הערוצים נעצרו בהצלחה');
      
      // הודעה למשתמש
      setError(null); // ניקוי שגיאות קודמות
      
    } catch (error) {
      console.error('❌ שגיאה בעצירת ערוצים:', error);
      setError(`שגיאה בעצירת ערוצים: ${error.message}`);
    }
  };

  // הפעלה/עצירה של ערוץ
  const togglePlay = (trackName) => {
    try {
      const audio = audioFiles[trackName];
      if (!audio) {
        console.error(`❌ אין קובץ אודיו עבור ${trackName}`);
        setError(`אין קובץ אודיו עבור ${trackName}`);
        return;
      }
      
      if (playingTrack === trackName) {
        // עצירת הערוץ הנוכחי
        audio.pause();
        setPlayingTrack(null);
        console.log(`⏸️ ${trackName} נעצר`);
        
        // הודעה למשתמש
        setError(null); // ניקוי שגיאות קודמות
      } else {
        // עצירת כל הערוצים האחרים
        stopAllTracks();
        
        // הפעלת הערוץ הנוכחי
        try {
          audio.play().then(() => {
            setPlayingTrack(trackName);
            console.log(`▶️ ${trackName} מופעל בהצלחה`);
            
            // הודעה למשתמש
            setError(null); // ניקוי שגיאות קודמות
          }).catch(error => {
            console.error(`❌ שגיאה בהפעלת ${trackName}:`, error);
            setError(`שגיאה בהפעלת ${trackName}: ${error.message}`);
          });
        } catch (error) {
          console.error(`❌ שגיאה בהפעלת ${trackName}:`, error);
          setError(`שגיאה בהפעלת ${trackName}: ${error.message}`);
        }
      }
    } catch (error) {
      console.error('❌ שגיאה בהפעלה/עצירה של ערוץ:', error);
      setError(`שגיאה בהפעלה/עצירה של ערוץ: ${error.message}`);
    }
  };

  // הפעלה/עצירה של כל הערוצים
  const toggleMasterPlay = () => {
    try {
      if (playingTrack === 'master') {
        // עצירת כל הערוצים
        stopAllTracks();
        console.log('⏸️ כל הערוצים נעצרו');
        
        // הודעה למשתמש
        setError(null); // ניקוי שגיאות קודמות
      } else {
        // הפעלת כל הערוצים
        const playPromises = [];
        
        Object.entries(audioFiles).forEach(([trackName, audio]) => {
          if (audio && !mutedTracks[trackName]) {
            try {
              const playPromise = audio.play().then(() => {
                console.log(`▶️ ${trackName} מופעל בהצלחה`);
              }).catch(error => {
                console.error(`❌ שגיאה בהפעלת ${trackName}:`, error);
              });
              playPromises.push(playPromise);
            } catch (error) {
              console.error(`❌ שגיאה בהפעלת ${trackName}:`, error);
            }
          }
        });
        
        // המתנה שכל הערוצים יופעלו
        Promise.all(playPromises).then(() => {
          setPlayingTrack('master');
          console.log('▶️ כל הערוצים מופעלים');
          
          // הודעה למשתמש
          setError(null); // ניקוי שגיאות קודמות
        }).catch(error => {
          console.error('❌ שגיאה בהפעלת חלק מהערוצים:', error);
          setError(`שגיאה בהפעלת חלק מהערוצים: ${error.message}`);
        });
      }
    } catch (error) {
      console.error('❌ שגיאה בהפעלה/עצירה של כל הערוצים:', error);
      setError(`שגיאה בהפעלה/עצירה של כל הערוצים: ${error.message}`);
    }
  };

  // Navigation
  const handleStudioClick = () => {
    try {
      setCurrentView('studio');
      console.log('🎵 מעבר לסטודיו');
    } catch (error) {
      console.error('❌ שגיאה במעבר לסטודיו:', error);
    }
  };

  const handleUploadClick = () => {
    try {
      setCurrentView('upload');
      console.log('📁 מעבר להעלאה');
    } catch (error) {
      console.error('❌ שגיאה במעבר להעלאה:', error);
    }
  };

  const handleNewProjectClick = () => {
    try {
      setCurrentView('upload');
      setSelectedFile(null);
      setUploadedFile(null);
      setProjectName('');
      setError(null);
      setSelectedProject(null);
      setAudioFiles({});
      setPlayingTrack(null);
      setVolumeLevels({});
      setMutedTracks({});
      console.log('🆕 פרויקט חדש - מצב נוקה');
      
      // הודעה למשתמש
      setError(null); // ניקוי שגיאות קודמות
      
    } catch (error) {
      console.error('❌ שגיאה ביצירת פרויקט חדש:', error);
      setError(`שגיאה ביצירת פרויקט חדש: ${error.message}`);
    }
  };

  // טיפול ב-drop
  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    
    if (files.length > 0) {
      const file = files[0];
      console.log('📁 קובץ נשלף:', file.name);
      
      // הודעה למשתמש
      setError(null); // ניקוי שגיאות קודמות
      
      handleFileInput(file);
    }
  };

  // טיפול בבחירת קובץ
  const handleFileInput = async (file) => {
    if (!file) return;
    
    try {
      console.log('📁 קובץ נבחר:', file.name, 'גודל:', file.size);
      
      // בדיקת גודל הקובץ
      const maxSize = 200 * 1024 * 1024; // 200MB
      if (file.size > maxSize) {
        setError(`הקובץ גדול מדי (${Math.round(file.size / 1024 / 1024)}MB). מקסימום: 200MB`);
        return;
      }
      
      // בדיקת סוג הקובץ
      const allowedTypes = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/flac', 'audio/m4a', 'audio/aac'];
      const allowedExtensions = /\.(mp3|wav|flac|m4a|aac)$/i;
      
      if (!allowedTypes.includes(file.type) && !allowedExtensions.test(file.name)) {
        setError('סוג קובץ לא נתמך. רק קבצי אודיו נתמכים (MP3, WAV, FLAC, M4A, AAC)');
        return;
      }
      
      setSelectedFile(file);
      console.log('✅ קובץ תקין:', file.name);
      
      // הודעה למשתמש
      setError(null); // ניקוי שגיאות קודמות
      
      // התחלת העלאה אוטומטית עם מעקב התקדמות
      console.log('🚀 מתחיל העלאה אוטומטית...');
      await handleFileUpload({ target: { files: [file] } });
      
    } catch (error) {
      console.error('❌ שגיאה בבחירת קובץ:', error);
      setError(`שגיאה בבחירת קובץ: ${error.message}`);
    }
  };

  // Utility functions
  // בדיקת פרויקטים מופרדים
  const hasSeparatedProjects = () => {
    try {
      return projects.length > 0;
    } catch (error) {
      console.error('❌ שגיאה בבדיקת פרויקטים:', error);
      return false;
    }
  };

  // קבלת מספר פרויקטים מופרדים
  const getSeparatedProjectsCount = () => {
    try {
      return projects.length;
    } catch (error) {
      console.error('❌ שגיאה בקבלת מספר פרויקטים:', error);
      return 0;
    }
  };

  // Render functions
  const renderConnectionStatus = () => {
    if (serverStatus === 'checking') {
      return (
        <div className="fixed top-4 right-4 bg-yellow-600 text-white px-4 py-2 rounded-md shadow-lg flex items-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          בודק חיבור לשרת...
        </div>
      );
    }
    
    if (serverStatus === 'disconnected') {
      return (
        <div className="fixed top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-md shadow-lg flex items-center gap-2">
          <WifiOff className="w-4 h-4" />
          שרת לא מחובר
          <button 
            onClick={retryConnection}
            className="ml-2 bg-red-700 hover:bg-red-800 px-2 py-1 rounded text-sm"
          >
            נסה שוב
          </button>
        </div>
      );
    }
    
    if (serverStatus === 'connected') {
      return (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-md shadow-lg flex items-center gap-2">
          <Wifi className="w-4 h-4" />
          שרת מחובר
        </div>
      );
    }
    
    return null;
  };

  const renderUploadForm = () => {
    if (!showUploadForm) return null;

    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Music className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">StemSplit</h2>
            <p className="text-gray-400">Professional Audio Separator</p>
          </div>
          
          {/* Connection Status */}
          {serverStatus === 'disconnected' && (
            <div className="mb-4 p-3 bg-red-900/50 border border-red-500 text-red-300 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <WifiOff className="w-4 h-4" />
                <span className="font-semibold">שרת לא מחובר</span>
              </div>
              <p className="text-sm mb-3">
                {connectionTest?.error || 'לא ניתן להתחבר לשרת'}
              </p>
              <button 
                onClick={retryConnection}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
              >
                נסה חיבור חוזר
              </button>
            </div>
          )}
          
          <div className="space-y-4">
            <UploadZone 
              onFileSelect={handleFileInput}
              onDrop={handleDrop}
              disabled={serverStatus !== 'connected'}
            />
            
            {error && (
              <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderProcessingStatus = () => {
    if (!isProcessing) return null;

    const handleRetry = () => {
      console.log('🔄 מתחיל ניסיון חוזר...');
      setError(null);
      setProgress(0);
      setProcessingStep('uploading');
      setIsProcessing(true);
      
      // הודעה למשתמש
      console.log('🔄 ===== מתחיל ניסיון חוזר =====');
      
      // אם יש קובץ שנבחר, נסה שוב
      if (selectedFile) {
        handleFileUpload({ target: { files: [selectedFile] } });
      }
    };

    return (
      <ProcessingStatus 
        step={processingStep}
        progress={progress}
        error={error}
        fileName={uploadedFile?.name || 'קובץ אודיו'}
        onRetry={handleRetry}
        onCancel={cancelUpload}
      />
    );
  };

  const renderStudio = () => {
    return (
      <div className="min-h-screen bg-black text-white flex">
        {/* Left Panel - Projects List */}
        <div className="w-1/3 bg-gray-900 p-6 border-r border-gray-800">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Music className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">StemSplit</h1>
              <p className="text-gray-400 text-sm">Professional Audio Separator</p>
            </div>
          </div>

          {/* Your Studio Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Your Studio</h2>
            <p className="text-gray-400 text-sm mb-4">Manage and mix your separated audio tracks.</p>
            <button
              onClick={handleNewProjectClick}
              className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-300 flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              New Project
            </button>
          </div>

          {/* Projects List */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            <h3 className="text-lg font-semibold mb-3">Your Projects</h3>
            {hasSeparatedProjects() ? (
              projects.map(project => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isSelected={selectedProject?.id === project.id}
                  onSelect={() => selectProject(project)}
                  onDelete={() => deleteProject(project.id)}
                />
              ))
            ) : (
              <EmptyState onUploadClick={handleUploadClick} />
            )}
          </div>
        </div>

        {/* Right Panel - Audio Player */}
        <div className="flex-1 bg-black p-6">
          {selectedProject ? (
            selectedProject.separatedTracks && Object.keys(selectedProject.separatedTracks).length > 0 ? (
              error ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-red-400 mb-2">שגיאה בטעינת קבצי האודיו</h3>
                    <p className="text-red-300 mb-4">{error}</p>
                    <button
                      onClick={() => {
                        setError(null);
                        if (selectedProject) {
                          loadAudioFiles(selectedProject);
                        }
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-300 mr-2"
                    >
                      נסה שוב
                    </button>
                    <button
                      onClick={handleNewProjectClick}
                      className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-300"
                    >
                      פרויקט חדש
                    </button>
                  </div>
                </div>
              ) : (
                <AudioPlayer
                  project={selectedProject}
                  audioFiles={audioFiles}
                  volumeLevels={volumeLevels}
                  mutedTracks={mutedTracks}
                  playingTrack={playingTrack}
                  onVolumeChange={handleVolumeChange}
                  onToggleMute={toggleMute}
                  onTogglePlay={togglePlay}
                  onMasterPlay={toggleMasterPlay}
                  onDownload={downloadTrack}
                />
              )
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Music className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-400 mb-2">אין קבצי אודיו זמינים</h3>
                  <p className="text-gray-500 mb-4">הפרויקט הזה לא כולל קבצי STEMS מופרדים</p>
                  <button
                    onClick={handleNewProjectClick}
                    className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-300"
                  >
                    צור פרויקט חדש
                  </button>
                </div>
              </div>
            )
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Music className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">לא נבחר פרויקט</h3>
                <p className="text-gray-500">בחר פרויקט מהפאנל השמאלי כדי להתחיל לערבב</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black">
      {renderConnectionStatus()}
      {renderProcessingStatus()}
      
      {currentView === 'upload' ? renderUploadForm() : renderStudio()}
      
      {globalError && (
        <div className="fixed bottom-4 right-4 bg-red-600 text-white px-6 py-3 rounded-md shadow-lg">
          {globalError}
        </div>
      )}
    </div>
  );
};

export default AudioSeparation; 