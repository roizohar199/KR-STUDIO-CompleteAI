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
  quickConnectionTest
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
  const [loading, setLoading] = useState(false);
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
    console.log('🔍 [AudioSeparation] מתחיל טעינת פרויקטים...');
    try {
      console.log('🔍 [AudioSeparation] בודק פרויקטים ב-localStorage...');
      const savedProjects = localStorage.getItem('audioSeparationProjects');
      if (savedProjects) {
        console.log('🔍 [AudioSeparation] נמצאו פרויקטים ב-localStorage:', JSON.parse(savedProjects).length);
        setProjects(JSON.parse(savedProjects));
      } else {
        console.log('🔍 [AudioSeparation] לא נמצאו פרויקטים ב-localStorage');
      }

      console.log('🔍 [AudioSeparation] מנסה לטעון פרויקטים מהשרת...');
      const serverProjects = await getProjects();
      console.log('🔍 [AudioSeparation] תשובה מהשרת:', serverProjects);
      
      if (serverProjects && serverProjects.length > 0) {
        console.log('🔍 [AudioSeparation] נמצאו פרויקטים בשרת:', serverProjects.length);
        setProjects(serverProjects);
        localStorage.setItem('audioSeparationProjects', JSON.stringify(serverProjects));
      } else {
        console.log('🔍 [AudioSeparation] לא נמצאו פרויקטים בשרת');
      }
    } catch (error) {
      console.error('❌ [AudioSeparation] שגיאה בטעינת פרויקטים:', error);
      console.log('🔍 [AudioSeparation] מנסה לטעון פרויקטים מ-localStorage בלבד...');
      const savedProjects = localStorage.getItem('audioSeparationProjects');
      if (savedProjects) {
        setProjects(JSON.parse(savedProjects));
      }
    }
  };

  // בדיקה מתקדמת של מצב פרויקט
  const checkProjectStatusAdvanced = async (projectId) => {
    console.log(`🔍 [AudioSeparation] בודק סטטוס פרויקט מתקדם: ${projectId}`);
    try {
      console.log(`🔍 [AudioSeparation] שולח בקשה לשרת: /api/separate/${projectId}/progress`);
      const response = await getSeparationProgress(projectId);
      console.log(`🔍 [AudioSeparation] תשובה מהשרת:`, response);
      
      if (response && response.progress !== undefined) {
        console.log(`🔍 [AudioSeparation] עדכון סטטוס: ${response.progress}% - ${response.status}`);
        setProjects(prev => prev.map(p => 
          p.id === projectId 
            ? { ...p, progress: response.progress, status: response.status }
            : p
        ));
        
        if (response.status === 'completed') {
          console.log(`🔍 [AudioSeparation] פרויקט הושלם: ${projectId}`);
          await loadProject(projectId);
        }
      }
    } catch (error) {
      console.error(`❌ [AudioSeparation] שגיאה בבדיקת סטטוס פרויקט ${projectId}:`, error);
      console.log(`🔍 [AudioSeparation] מנסה לטעון פרויקט ישירות...`);
      try {
        await loadProject(projectId);
      } catch (loadError) {
        console.error(`❌ [AudioSeparation] שגיאה בטעינת פרויקט ${projectId}:`, loadError);
      }
    }
  };

  // טעינה חוזרת של פרויקט עם בדיקה מתקדמת
  const retryProjectLoadAdvanced = async (projectId) => {
    console.log(`🔄 [AudioSeparation] מנסה לטעון פרויקט מחדש: ${projectId}`);
    try {
      console.log(`🔍 [AudioSeparation] בודק סטטוס פרויקט...`);
      const statusResponse = await getSeparationProgress(projectId);
      console.log(`🔍 [AudioSeparation] סטטוס פרויקט:`, statusResponse);
      
      if (statusResponse && statusResponse.status === 'completed') {
        console.log(`🔍 [AudioSeparation] פרויקט הושלם, טוען קבצים...`);
        await loadProject(projectId);
      } else if (statusResponse && statusResponse.status === 'processing') {
        console.log(`🔍 [AudioSeparation] פרויקט עדיין בעיבוד, מתחיל מעקב...`);
        startProgressPolling(projectId);
      } else {
        console.log(`🔍 [AudioSeparation] סטטוס לא ידוע, מנסה לטעון פרויקט...`);
        await loadProject(projectId);
      }
    } catch (error) {
      console.error(`❌ [AudioSeparation] שגיאה בניסיון חוזר לטעינת פרויקט ${projectId}:`, error);
      console.log(`🔍 [AudioSeparation] מנסה לטעון פרויקט ישירות...`);
      try {
        await loadProject(projectId);
      } catch (loadError) {
        console.error(`❌ [AudioSeparation] שגיאה בטעינת פרויקט ישירות:`, loadError);
      }
    }
  };

  // טעינת פרויקט ספציפי
  const loadProject = async (projectId) => {
    console.log(`🔍 [AudioSeparation] טוען פרויקט: ${projectId}`);
    try {
      console.log(`🔍 [AudioSeparation] שולח בקשה לשרת: /api/projects/${projectId}`);
      const project = await getProject(projectId);
      console.log(`🔍 [AudioSeparation] תשובה מהשרת:`, project);
      
      if (project) {
        console.log(`🔍 [AudioSeparation] פרויקט נטען בהצלחה:`, project.projectName);
        setProjects(prev => prev.map(p => 
          p.id === projectId 
            ? { ...p, ...project, status: 'completed', progress: 100 }
            : p
        ));
        setSelectedProject(project);
        setCurrentView('studio');
      } else {
        console.log(`🔍 [AudioSeparation] פרויקט לא נמצא בשרת`);
      }
    } catch (error) {
      console.error(`❌ [AudioSeparation] שגיאה בטעינת פרויקט ${projectId}:`, error);
      console.log(`🔍 [AudioSeparation] מנסה לטעון פרויקט מ-localStorage...`);
      const savedProjects = JSON.parse(localStorage.getItem('audioSeparationProjects') || '[]');
      const savedProject = savedProjects.find(p => p.id === projectId);
      if (savedProject) {
        console.log(`🔍 [AudioSeparation] פרויקט נמצא ב-localStorage:`, savedProject.projectName);
        setSelectedProject(savedProject);
        setCurrentView('studio');
      }
    }
  };

  // מחיקת פרויקט
  const handleDeleteProject = async (projectId) => {
    console.log(`🗑️ [AudioSeparation] מוחק פרויקט: ${projectId}`);
    try {
      console.log(`🔍 [AudioSeparation] שולח בקשה מחיקה לשרת: DELETE /api/projects/${projectId}`);
      await deleteProject(projectId);
      console.log(`🔍 [AudioSeparation] פרויקט נמחק מהשרת בהצלחה`);
      
      setProjects(prev => prev.filter(p => p.id !== projectId));
      if (selectedProject?.id === projectId) {
        setSelectedProject(null);
        setCurrentView('upload');
      }
      
      const savedProjects = JSON.parse(localStorage.getItem('audioSeparationProjects') || '[]');
      const updatedProjects = savedProjects.filter(p => p.id !== projectId);
      localStorage.setItem('audioSeparationProjects', JSON.stringify(updatedProjects));
      console.log(`🔍 [AudioSeparation] פרויקט נמחק מ-localStorage`);
    } catch (error) {
      console.error(`❌ [AudioSeparation] שגיאה במחיקת פרויקט ${projectId}:`, error);
      console.log(`🔍 [AudioSeparation] מנסה למחוק מ-localStorage בלבד...`);
      
      setProjects(prev => prev.filter(p => p.id !== projectId));
      if (selectedProject?.id === projectId) {
        setSelectedProject(null);
        setCurrentView('upload');
      }
      
      const savedProjects = JSON.parse(localStorage.getItem('audioSeparationProjects') || '[]');
      const updatedProjects = savedProjects.filter(p => p.id !== projectId);
      localStorage.setItem('audioSeparationProjects', JSON.stringify(updatedProjects));
    }
  };

  // טיפול בהעלאת קובץ
  const handleFileUpload = async (file) => {
    console.log('📁 [AudioSeparation] קובץ נבחר:', file.name, 'גודל:', file.size, 'סוג:', file.type);
    
    if (!file) {
      console.log('❌ [AudioSeparation] קובץ לא תקין');
      return;
    }

    // בדיקת תקינות קובץ
    const validTypes = ['audio/mpeg', 'audio/wav', 'audio/flac', 'audio/mp4', 'audio/ogg'];
    if (!validTypes.includes(file.type)) {
      console.log('❌ [AudioSeparation] סוג קובץ לא נתמך:', file.type);
      alert('סוג קובץ לא נתמך. אנא בחר קובץ אודיו (MP3, WAV, FLAC, M4A, OGG)');
      return;
    }

    if (file.size > 100 * 1024 * 1024) { // 100MB
      console.log('❌ [AudioSeparation] קובץ גדול מדי:', file.size / (1024 * 1024), 'MB');
      alert('הקובץ גדול מדי. גודל מקסימלי: 100MB');
      return;
    }

    console.log('✅ [AudioSeparation] קובץ תקין, ממשיך...');
    setUploadedFile(file);
    setCurrentView('upload');
  };

  // התחלת הפרדה
  const startSeparation = async () => {
    if (!uploadedFile || !projectName.trim()) {
      console.log('❌ [AudioSeparation] חסרים נתונים להפרדה');
      return;
    }

    console.log('🚀 [AudioSeparation] מתחיל הפרדת אודיו...');
    console.log('📁 [AudioSeparation] פרטי הקובץ:', {
      name: uploadedFile.name,
      size: uploadedFile.size,
      type: uploadedFile.type
    });
    console.log('📝 [AudioSeparation] שם הפרויקט:', projectName);

    setIsProcessing(true);
    setProcessingStep('uploading');
    setProcessingProgress(0);

    try {
      console.log('🔍 [AudioSeparation] מתחיל העלאה לשרת...');
      const uploadResult = await uploadAudio(uploadedFile, (progress) => {
        console.log(`📤 [AudioSeparation] התקדמות העלאה: ${progress}%`);
        setProcessingProgress(progress);
      });
      
      console.log('🔍 [AudioSeparation] תוצאת העלאה:', uploadResult);
      
      if (uploadResult && uploadResult.fileId) {
        const fileId = uploadResult.fileId;
        console.log(`🔍 [AudioSeparation] קובץ הועלה בהצלחה, ID: ${fileId}`);
        
        setProcessingStep('separating');
        setProcessingProgress(10);
        
        console.log(`🔍 [AudioSeparation] מתחיל הפרדה...`);
        const separationResult = await separateAudio(fileId, projectName);
        console.log(`🔍 [AudioSeparation] תוצאת הפרדה:`, separationResult);
        
        if (separationResult && separationResult.success) {
          console.log(`🔍 [AudioSeparation] הפרדה החלה בהצלחה`);
          
          const newProject = {
            id: fileId,
            projectName: projectName,
            fileName: uploadedFile.name,
            status: 'processing',
            progress: 10,
            createdAt: new Date().toISOString(),
            stems: []
          };
          
          console.log(`🔍 [AudioSeparation] יוצר פרויקט חדש:`, newProject);
          setProjects(prev => [...prev, newProject]);
          
          const savedProjects = JSON.parse(localStorage.getItem('audioSeparationProjects') || '[]');
          savedProjects.push(newProject);
          localStorage.setItem('audioSeparationProjects', JSON.stringify(savedProjects));
          console.log(`🔍 [AudioSeparation] פרויקט נשמר ב-localStorage`);
          
          setSelectedProject(newProject);
          setCurrentView('studio');
          setProcessingStep('monitoring');
          
          console.log(`🔍 [AudioSeparation] מתחיל מעקב אחר התקדמות...`);
          startProgressPolling(fileId);
        } else {
          console.error(`❌ [AudioSeparation] הפרדה נכשלה:`, separationResult);
          throw new Error(separationResult?.error || 'הפרדה נכשלה');
        }
      } else {
        console.error(`❌ [AudioSeparation] העלאה נכשלה:`, uploadResult);
        throw new Error('העלאה נכשלה');
      }
    } catch (error) {
      console.error('❌ [AudioSeparation] שגיאה בהפרדת אודיו:', error);
      setProcessingError(error.message);
      setProcessingStep('error');
    } finally {
      setIsProcessing(false);
      setProcessingProgress(0);
    }
  };

  // התחלת מעקב אחר התקדמות
  const startProgressPolling = (fileId) => {
    console.log(`🔍 [AudioSeparation] מתחיל מעקב אחר התקדמות: ${fileId}`);
    
    const pollProgress = async () => {
      try {
        console.log(`🔍 [AudioSeparation] בודק התקדמות: ${fileId}`);
        const progress = await getSeparationProgress(fileId);
        console.log(`🔍 [AudioSeparation] התקדמות:`, progress);
        
        if (progress && progress.progress !== undefined) {
          console.log(`🔍 [AudioSeparation] עדכון התקדמות: ${progress.progress}%`);
          setProjects(prev => prev.map(p => 
            p.id === fileId 
              ? { ...p, progress: progress.progress, status: progress.status }
              : p
          ));
          
          if (progress.status === 'completed') {
            console.log(`🔍 [AudioSeparation] פרויקט הושלם: ${fileId}`);
            clearInterval(progressInterval);
            await loadProject(fileId);
          }
        }
      } catch (error) {
        console.error(`❌ [AudioSeparation] שגיאה בבדיקת התקדמות ${fileId}:`, error);
      }
    };

    const progressInterval = setInterval(pollProgress, 2000);
    console.log(`🔍 [AudioSeparation] מעקב התקדמות מופעל כל 2 שניות`);
    
    // ניקוי אוטומטי אחרי 10 דקות
    setTimeout(() => {
      console.log(`🔍 [AudioSeparation] ניקוי מעקב התקדמות אחרי 10 דקות`);
      clearInterval(progressInterval);
    }, 10 * 60 * 1000);
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
    console.log('🔍 [AudioSeparation] בודק פרויקטים קיימים...');
    try {
      console.log('🔍 [AudioSeparation] שולח בקשה לשרת: GET /api/projects');
      const projects = await getProjects();
      console.log('🔍 [AudioSeparation] תשובה מהשרת:', projects);
      
      if (projects && projects.length > 0) {
        console.log(`🔍 [AudioSeparation] נמצאו ${projects.length} פרויקטים בשרת`);
        setProjects(projects);
        localStorage.setItem('audioSeparationProjects', JSON.stringify(projects));
      } else {
        console.log('🔍 [AudioSeparation] לא נמצאו פרויקטים בשרת');
      }
    } catch (error) {
      console.error('❌ [AudioSeparation] שגיאה בבדיקת פרויקטים קיימים:', error);
      console.log('🔍 [AudioSeparation] מנסה לטעון פרויקטים מ-localStorage...');
      const savedProjects = localStorage.getItem('audioSeparationProjects');
      if (savedProjects) {
        setProjects(JSON.parse(savedProjects));
      }
    }
  };

  // בדיקה חוזרת של חיבור לשרת
  const retryConnection = async () => {
    console.log('🔄 [AudioSeparation] מנסה חיבור מחדש...');
    try {
      console.log('🔍 [AudioSeparation] בודק חיבור לשרת...');
      const healthCheck = await healthCheck();
      console.log('🔍 [AudioSeparation] בדיקת בריאות:', healthCheck);
      
      if (healthCheck && healthCheck.status === 'OK') {
        console.log('✅ [AudioSeparation] חיבור לשרת הוחזר');
        setServerStatus('connected');
        await checkExistingProjects();
      } else {
        console.log('❌ [AudioSeparation] שרת לא מגיב');
        setServerStatus('disconnected');
      }
    } catch (error) {
      console.error('❌ [AudioSeparation] שגיאה בבדיקת חיבור:', error);
      setServerStatus('disconnected');
    }
  };

  // בדיקת חיבור לשרת
  const checkServerConnection = async () => {
    console.log('🔍 [AudioSeparation] בודק חיבור לשרת...');
    try {
      console.log('🔍 [AudioSeparation] שולח בדיקת בריאות לשרת...');
      const healthCheck = await healthCheck();
      console.log('🔍 [AudioSeparation] תשובת בדיקת בריאות:', healthCheck);
      
      if (healthCheck && healthCheck.status === 'OK') {
        console.log('✅ [AudioSeparation] שרת מחובר ופעיל');
        setServerStatus('connected');
        await checkExistingProjects();
      } else {
        console.log('❌ [AudioSeparation] שרת לא מגיב כראוי');
        setServerStatus('disconnected');
      }
    } catch (error) {
      console.error('❌ [AudioSeparation] שגיאה בבדיקת חיבור לשרת:', error);
      console.log('🔍 [AudioSeparation] פרטי השגיאה:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      setServerStatus('disconnected');
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