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
      await healthCheck();
      setServerConnected(true);
      console.log('✅ שרת מחובר');
    } catch (error) {
      setServerConnected(false);
      console.log('❌ שרת לא מחובר:', error.message);
    }
  };

  // טעינת פרויקטים
  const loadProjects = async () => {
    if (!serverConnected) return;
    
    try {
      const projectsList = await getProjects();
      setProjects(projectsList);
      console.log('📋 פרויקטים נטענו:', projectsList);
    } catch (error) {
      console.error('❌ Error loading projects:', error);
      setError('Error loading projects');
    }
  };

  // העלאת קובץ
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setError(null);
      setProcessingStep('uploading');
      setIsProcessing(true);
      setProgress(0);

      console.log('📁 Uploading file:', file.name);
      
      const result = await uploadAudio(file);
      setUploadedFile(result.file);
      setSelectedFile(file);
      setProgress(50);
      
      console.log('✅ קובץ הועלה:', result);
      
      // מעבר לטופס שם פרויקט
      setShowUploadForm(true);
      setProcessingStep('naming');
      
    } catch (error) {
      console.error('❌ Upload error:', error);
      setError('Error uploading file');
      setIsProcessing(false);
    }
  };

  // התחלת הפרדה
  const startSeparation = async () => {
    if (!uploadedFile || !projectName.trim()) {
      setError('Please enter a project name');
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
      }
      
    } catch (error) {
      console.error('❌ Separation error:', error);
      setError('Error separating file');
      setIsProcessing(false);
    }
  };

  // Polling להתקדמות
  const startProgressPolling = (fileId) => {
    const interval = setInterval(async () => {
      try {
        const progressData = await getSeparationProgress(fileId);
        
        setProgress(progressData.progress);
        
        // עדכון הודעות מפורטות
        if (progressData.message) {
          console.log('📊 התקדמות:', progressData.message);
        }
        
        if (progressData.status === 'completed') {
          console.log('✅ הפרדה הושלמה');
          clearInterval(interval);
          setIsProcessing(false);
          setProgress(100);
          
          // טעינה מחדש של פרויקטים
          await loadProjects();
          
        } else if (progressData.status === 'failed') {
          console.error('❌ Separation failed:', progressData.error);
          setError('Separation failed: ' + progressData.error);
          clearInterval(interval);
          setIsProcessing(false);
        }
        
      } catch (error) {
        console.error('❌ שגיאה בקבלת התקדמות:', error);
        clearInterval(interval);
        setIsProcessing(false);
      }
    }, 2000); // בדיקה כל 2 שניות
    
    setPollingInterval(interval);
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
      console.error('❌ Error selecting project:', error);
      setError('Error loading project');
    }
  };

  // טעינת קבצי אודיו
  const loadAudioFiles = async (project) => {
    if (!project.separatedTracks) {
      console.log('❌ No STEMS files for project');
      return;
    }

    try {
      const audioFiles = {};
      const stems = ['vocals', 'drums', 'bass', 'guitar', 'other'];
      
      for (const stem of stems) {
        try {
          const audioUrl = project.separatedTracks[stem];
          if (audioUrl) {
            const audio = new Audio(audioUrl);
            
            audio.addEventListener('loadeddata', () => {
              console.log(`✅ ${stem} loaded`);
            });
            
            audio.addEventListener('error', (e) => {
              console.log(`⚠️ ${stem} not available`);
            });
            
            audioFiles[stem] = audio;
          }
        } catch (error) {
          console.log(`⚠️ Error loading ${stem}:`, error);
        }
      }
      
      setAudioFiles(audioFiles);
      setVolumeLevels({
        vocals: 1,
        drums: 1,
        bass: 1,
        guitar: 1,
        other: 1
      });
      setMutedTracks({
        vocals: false,
        drums: false,
        bass: false,
        guitar: false,
        other: false
      });
      
    } catch (error) {
      console.error('❌ Error loading audio files:', error);
    }
  };

  // הורדת stem
  const downloadTrack = async (trackName) => {
    if (!selectedProject) return;
    
    try {
      await downloadStem(selectedProject.id, trackName);
      console.log('✅ Stem downloaded:', trackName);
    } catch (error) {
      console.error('❌ Error downloading stem:', error);
      setError('Error downloading file');
    }
  };

  // מחיקת פרויקט
  const deleteProject = async (projectId) => {
    try {
      await deleteProject(projectId);
      console.log('✅ Project deleted:', projectId);
      
      // טעינה מחדש של פרויקטים
      await loadProjects();
      
      // אם הפרויקט שנמחק היה נבחר, נקה בחירה
      if (selectedProject && selectedProject.id === projectId) {
        setSelectedProject(null);
        setAudioFiles({});
      }
      
    } catch (error) {
      console.error('❌ Error deleting project:', error);
      setError('Error deleting project');
    }
  };

  // שליטה בעוצמה
  const handleVolumeChange = (trackName, newVolume) => {
    setVolumeLevels(prev => ({
      ...prev,
      [trackName]: newVolume
    }));
    
    if (audioFiles[trackName]) {
      audioFiles[trackName].volume = newVolume;
    }
  };

  // שליטה ב-Mute
  const toggleMute = (trackName) => {
    setMutedTracks(prev => ({
      ...prev,
      [trackName]: !prev[trackName]
    }));
    
    if (audioFiles[trackName]) {
      audioFiles[trackName].muted = !mutedTracks[trackName];
    }
  };

  // עצירת כל הערוצים
  const stopAllTracks = () => {
    Object.values(audioFiles).forEach(audio => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
    setPlayingTrack(null);
  };

  // הפעלה/עצירה של ערוץ
  const togglePlay = (trackName) => {
    const audio = audioFiles[trackName];
    if (!audio) return;

    if (playingTrack === trackName) {
      audio.pause();
      setPlayingTrack(null);
    } else {
      stopAllTracks();
      audio.play();
      setPlayingTrack(trackName);
    }
  };

  // הפעלה/עצירה של master
  const toggleMasterPlay = () => {
    if (playingTrack) {
      stopAllTracks();
    } else {
      // הפעלת כל הערוצים
      Object.keys(audioFiles).forEach(trackName => {
        const audio = audioFiles[trackName];
        if (audio && !mutedTracks[trackName]) {
          audio.play();
        }
      });
      setPlayingTrack('master');
    }
  };

  // Navigation
  const handleStudioClick = () => {
    setCurrentView('studio');
    setShowUploadForm(false);
  };

  const handleUploadClick = () => {
    setCurrentView('upload');
    setShowUploadForm(true);
  };

  const handleNewProjectClick = () => {
    setCurrentView('upload');
    setShowUploadForm(true);
    setUploadedFile(null);
    setProjectName('');
    setError(null);
  };

  // Drag & Drop
  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('audio/')) {
        const event = { target: { files: [file] } };
        handleFileUpload(event);
      }
    }
  };

  const handleFileInput = (file) => {
    // Create a mock event object for handleFileUpload
    const mockEvent = { target: { files: [file] } };
    handleFileUpload(mockEvent);
  };

  // Utility functions
  const hasSeparatedProjects = () => {
    return projects.length > 0;
  };

  const getSeparatedProjectsCount = () => {
    return projects.length;
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
          
          {!uploadedFile ? (
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
          ) : (
            <div className="space-y-4">
              <div className="bg-green-900/50 border border-green-500 text-green-300 px-4 py-3 rounded-lg">
                ✅ File uploaded: {uploadedFile.name}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Project Name</label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Enter project name"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                />
              </div>
              
              <button
                onClick={startSeparation}
                disabled={isProcessing || !projectName.trim()}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-blue-700 disabled:opacity-50 transition-all duration-300"
              >
                {isProcessing ? 'Processing...' : 'Start Separation'}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderProcessingStatus = () => {
    if (!isProcessing) return null;

    return (
      <ProcessingStatus 
        step={processingStep}
        progress={progress}
        error={error}
        fileName={uploadedFile?.name || 'קובץ אודיו'}
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