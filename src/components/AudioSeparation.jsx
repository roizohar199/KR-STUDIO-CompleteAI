import React, { useState, useEffect, useRef } from 'react';
import { Upload, Play, Pause, Download, Trash2, Music, Mic, Volume2, CircleDot, Zap, FileAudio, BarChart3, VolumeX, AlertCircle, Plus, Grid, List } from 'lucide-react';
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
  healthCheck 
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
    loadProjects();
  }, [serverConnected]);

  // בדיקת חיבור לשרת
  const checkServerConnection = async () => {
    try {
      console.log('🔍 בודק חיבור לשרת...');
      await healthCheck();
      setServerConnected(true);
      console.log('✅ שרת מחובר');
    } catch (error) {
      setServerConnected(false);
      console.log('❌ שרת לא מחובר:', error.message);
      
      // הצגת הודעת שגיאה למשתמש
      setError(`לא ניתן להתחבר לשרת: ${error.message}`);
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
    } catch (error) {
      console.error('❌ שגיאה בטעינת פרויקטים:', error);
      setError(`שגיאה בטעינת פרויקטים: ${error.message}`);
    }
  };

  // העלאת קובץ
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

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
      
      // ניסיון העלאה עם retry
      let result;
      let retryCount = 0;
      const maxRetries = 3;
      
      while (retryCount < maxRetries) {
        try {
          console.log(`📤 ניסיון העלאה ${retryCount + 1}/${maxRetries}...`);
          result = await uploadAudio(file);
          break; // אם הצליח, צא מהלולאה
        } catch (uploadError) {
          retryCount++;
          console.error(`❌ ניסיון ${retryCount} נכשל:`, uploadError.message);
          
          if (retryCount >= maxRetries) {
            throw new Error(`העלאה נכשלה אחרי ${maxRetries} ניסיונות: ${uploadError.message}`);
          }
          
          // המתנה לפני ניסיון נוסף
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }
      
      console.log('📤 תוצאת uploadAudio:', result);
      
      setUploadedFile(result.file);
      setSelectedFile(file);
      setProgress(50);
      
      console.log('✅ קובץ הועלה בהצלחה!');
      console.log('📁 fileId:', result.file.id);
      console.log('📁 שם קובץ:', result.file.name);
      console.log('📁 גודל קובץ:', result.file.size);
      
      // התחלת הפרדה אוטומטית
      console.log('🎵 ===== מתחיל תהליך הפרדה =====');
      setProcessingStep('separating');
      setProgress(50);
      
      // יצירת שם פרויקט אוטומטי
      const autoProjectName = file.name.replace(/\.[^/.]+$/, '') + '_' + Date.now();
      setProjectName(autoProjectName);
      
      console.log('🎵 שם פרויקט אוטומטי:', autoProjectName);
      console.log('🎵 fileId לפרדה:', result.file.id);
      
      // התחלת הפרדה
      console.log('📤 שולח בקשת הפרדה לשרת...');
      const separationResult = await separateAudio(result.file.id, autoProjectName);
      
      console.log('🎵 תוצאת הפרדה מהשרת:', separationResult);
      
      if (separationResult.success) {
        console.log('✅ הפרדה החלה בהצלחה!');
        console.log('🔄 מתחיל polling להתקדמות...');
        
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
        throw new Error('הפרדה נכשלה - תשובה לא תקינה מהשרת');
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
        
        const progressData = await getSeparationProgress(fileId);
        
        console.log('📊 נתוני התקדמות מהשרת:', progressData);
        console.log('📊 התקדמות:', progressData.progress + '%');
        console.log('📊 סטטוס:', progressData.status);
        console.log('📊 הודעה:', progressData.message);
        
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
          
          console.error('❌ ===== תהליך polling הסתיים בכשל =====');
        }
        
      } catch (error) {
        console.error('❌ ===== שגיאה בקבלת התקדמות =====');
        console.error('❌ fileId:', fileId);
        console.error('❌ זמן שגיאה:', new Date().toLocaleTimeString());
        console.error('❌ פרטי השגיאה:', error);
        console.error('❌ הודעת שגיאה:', error.message);
        
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
        
        console.error('❌ ===== תהליך polling הסתיים בשגיאה =====');
      }
    }, 2000); // בדיקה כל 2 שניות
    
    setPollingInterval(interval);
    console.log('🔄 polling interval נוצר:', interval);
  };

  // ניקוי polling
  useEffect(() => {
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    };
  }, [pollingInterval]);

  // בחירת פרויקט
  const selectProject = async (project) => {
    try {
      console.log('📁 בוחר פרויקט:', project.id);
      
      const fullProject = await getProject(project.id);
      setSelectedProject(fullProject);
      
      // טעינת קבצי אודיו
      await loadAudioFiles(fullProject);
      
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
      const audioFiles = {};
      const stems = ['vocals', 'drums', 'bass', 'guitar', 'other'];
      
      for (const stem of stems) {
        try {
          const audioUrl = project.separatedTracks[stem];
          if (audioUrl) {
            const audio = new Audio(audioUrl);
            
            audio.addEventListener('loadeddata', () => {
              console.log(`✅ ${stem} נטען`);
            });
            
            audio.addEventListener('error', (e) => {
              console.error(`❌ שגיאה בטעינת ${stem}:`, e);
            });
            
            audioFiles[stem] = audio;
          }
        } catch (error) {
          console.error(`❌ שגיאה בטעינת ${stem}:`, error);
        }
      }
      
      setAudioFiles(audioFiles);
      console.log('✅ כל קבצי האודיו נטענו');
      
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
      }
      
    } catch (error) {
      console.error('❌ שגיאה במחיקת פרויקט:', error);
      setError(`שגיאה במחיקת פרויקט: ${error.message}`);
    }
  };

  // שינוי עוצמה
  const handleVolumeChange = (trackName, newVolume) => {
    try {
      setVolumeLevels(prev => ({
        ...prev,
        [trackName]: newVolume
      }));
      
      // עדכון עוצמה בקבצי אודיו
      if (audioFiles[trackName]) {
        audioFiles[trackName].volume = newVolume;
      }
      
      console.log(`🔊 עוצמה של ${trackName} שונתה ל-${newVolume}`);
    } catch (error) {
      console.error('❌ שגיאה בשינוי עוצמה:', error);
    }
  };

  // הפעלה/כיבוי ערוץ
  const toggleMute = (trackName) => {
    try {
      setMutedTracks(prev => ({
        ...prev,
        [trackName]: !prev[trackName]
      }));
      
      console.log(`${trackName} ${mutedTracks[trackName] ? 'הופעל' : 'כובה'}`);
    } catch (error) {
      console.error('❌ שגיאה בהפעלה/כיבוי ערוץ:', error);
    }
  };

  // עצירת כל הערוצים
  const stopAllTracks = () => {
    try {
      Object.values(audioFiles).forEach(audio => {
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
      });
      setPlayingTrack(null);
      console.log('⏹️ כל הערוצים נעצרו');
    } catch (error) {
      console.error('❌ שגיאה בעצירת ערוצים:', error);
    }
  };

  // הפעלה/עצירה של ערוץ
  const togglePlay = (trackName) => {
    try {
      const audio = audioFiles[trackName];
      if (!audio) return;
      
      if (playingTrack === trackName) {
        audio.pause();
        setPlayingTrack(null);
        console.log(`⏸️ ${trackName} נעצר`);
      } else {
        // עצירת כל הערוצים האחרים
        stopAllTracks();
        
        // הפעלת הערוץ הנוכחי
        audio.play();
        setPlayingTrack(trackName);
        console.log(`▶️ ${trackName} מופעל`);
      }
    } catch (error) {
      console.error('❌ שגיאה בהפעלה/עצירה של ערוץ:', error);
      setError(`שגיאה בהפעלה/עצירה של ערוץ: ${error.message}`);
    }
  };

  // הפעלה/עצירה של כל הערוצים
  const toggleMasterPlay = () => {
    try {
      if (playingTrack) {
        stopAllTracks();
        console.log('⏸️ כל הערוצים נעצרו');
      } else {
        // הפעלת כל הערוצים
        Object.entries(audioFiles).forEach(([trackName, audio]) => {
          if (audio && !mutedTracks[trackName]) {
            audio.play();
          }
        });
        setPlayingTrack('all');
        console.log('▶️ כל הערוצים מופעלים');
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
      console.log('🆕 פרויקט חדש');
    } catch (error) {
      console.error('❌ שגיאה ביצירת פרויקט חדש:', error);
    }
  };

  // טיפול ב-drop
  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    
    if (files.length > 0) {
      const file = files[0];
      console.log('📁 קובץ נשלף:', file.name);
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
      
      // התחלת העלאה אוטומטית
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
          
          <div className="space-y-4">
            <UploadZone 
              onFileSelect={handleFileInput}
              onDrop={handleDrop}
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
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Music className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No Project Selected</h3>
                <p className="text-gray-500">Select a project from the left panel to start mixing</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black">
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