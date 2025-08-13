import React, { useState, useCallback, useMemo } from 'react';
import { lazy, Suspense } from 'react';
import UploadZone from './audio-separation/UploadZone';
import ProcessingStatus from './audio-separation/ProcessingStatus';
import ProjectCard from './audio-separation/ProjectCard';
import EmptyState from './audio-separation/EmptyState';

// Lazy loading של רכיבים כבדים
const AudioPlayer = lazy(() => import('./audio-separation/AudioPlayer'));
const TrackChannel = lazy(() => import('./audio-separation/TrackChannel'));

// רכיב טעינה קל
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-4">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
  </div>
);

const AudioSeparation = () => {
  const [projects, setProjects] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  // Memoization של פרויקטים פעילים
  const activeProjects = useMemo(() => 
    projects.filter(p => p.status === 'active'), [projects]
  );

  const completedProjects = useMemo(() => 
    projects.filter(p => p.status === 'completed'), [projects]
  );

  // Callback משופר לטיפול בקבצים
  const handleFileUpload = useCallback(async (files) => {
    if (!files || files.length === 0) return;

    const newProjects = Array.from(files).map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      file: file,
      status: 'pending',
      progress: 0,
      createdAt: new Date(),
      stems: []
    }));

    setProjects(prev => [...prev, ...newProjects]);
    setIsProcessing(true);

    // עיבוד קבצים אחד אחד
    for (const project of newProjects) {
      await processProject(project);
    }

    setIsProcessing(false);
  }, []);

  // עיבוד פרויקט
  const processProject = useCallback(async (project) => {
    try {
      setCurrentProject(project.id);
      
      // עדכון סטטוס
      setProjects(prev => prev.map(p => 
        p.id === project.id ? { ...p, status: 'active', progress: 10 } : p
      ));

      // סימולציה של עיבוד (במקום קריאה אמיתית לשרת)
      for (let progress = 10; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        
        setProjects(prev => prev.map(p => 
          p.id === project.id ? { ...p, progress } : p
        ));
      }

      // השלמת הפרויקט
      setProjects(prev => prev.map(p => 
        p.id === project.id ? { 
          ...p, 
          status: 'completed', 
          progress: 100,
          stems: ['vocals', 'drums', 'bass', 'other']
        } : p
      ));

    } catch (error) {
      console.error('שגיאה בעיבוד פרויקט:', error);
      setProjects(prev => prev.map(p => 
        p.id === project.id ? { ...p, status: 'error', error: error.message } : p
      ));
    } finally {
      setCurrentProject(null);
    }
  }, []);

  // מחיקת פרויקט
  const deleteProject = useCallback((projectId) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
  }, []);

  // פתיחת פרויקט
  const openProject = useCallback((project) => {
    setCurrentProject(project.id);
  }, []);

  return (
    <div className="space-y-6">
      {/* כותרת */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">הפרדת אודיו מתקדמת</h1>
        <p className="text-gray-400">העלה קבצי אודיו וקבל הפרדה איכותית של הערוצים</p>
      </div>

      {/* אזור העלאה */}
      <UploadZone onFileUpload={handleFileUpload} isProcessing={isProcessing} />

      {/* פרויקטים פעילים */}
      {activeProjects.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">פרויקטים בתהליך</h2>
          {activeProjects.map(project => (
            <ProcessingStatus 
              key={project.id}
              project={project}
              onDelete={() => deleteProject(project.id)}
            />
          ))}
        </div>
      )}

      {/* פרויקטים שהושלמו */}
      {completedProjects.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">פרויקטים שהושלמו</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {completedProjects.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={() => openProject(project)}
                onDelete={() => deleteProject(project.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* מצב ריק */}
      {projects.length === 0 && !isProcessing && (
        <EmptyState onUpload={handleFileUpload} />
      )}

      {/* פרויקט פתוח */}
      {currentProject && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">פרויקט פתוח</h3>
              <button
                onClick={() => setCurrentProject(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <Suspense fallback={<LoadingSpinner />}>
              <AudioPlayer />
            </Suspense>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              {['vocals', 'drums', 'bass', 'other'].map(stem => (
                <Suspense key={stem} fallback={<LoadingSpinner />}>
                  <TrackChannel key={stem} name={stem} />
                </Suspense>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioSeparation; 