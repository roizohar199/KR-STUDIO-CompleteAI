import React, { useState, useMemo, useCallback } from 'react';
import { Music, Mic, Volume2, BarChart3, Play, Pause, Download, Trash2, Plus, Upload, Settings, Users, FileAudio } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [recentProjects, setRecentProjects] = useState([
    { id: 1, name: 'Project Alpha', type: 'vocals', status: 'completed', date: '2024-01-15' },
    { id: 2, name: 'Project Beta', type: 'drums', status: 'processing', date: '2024-01-14' },
    { id: 3, name: 'Project Gamma', type: 'bass', status: 'completed', date: '2024-01-13' }
  ]);

  // Memoization של סטטיסטיקות
  const stats = useMemo(() => ({
    totalProjects: recentProjects.length,
    completedProjects: recentProjects.filter(p => p.status === 'completed').length,
    processingProjects: recentProjects.filter(p => p.status === 'processing').length,
    totalAudioFiles: recentProjects.length * 4 // מניח 4 ערוצים לכל פרויקט
  }), [recentProjects]);

  // Callback משופר לשינוי טאב
  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  // Callback למחיקת פרויקט
  const handleDeleteProject = useCallback((projectId) => {
    setRecentProjects(prev => prev.filter(p => p.id !== projectId));
  }, []);

  // רכיב כרטיס סטטיסטיקה
  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className={`bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-${color}-500 transition-colors`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
        <div className={`p-3 rounded-full bg-${color}-500/20`}>
          <Icon className={`w-6 h-6 text-${color}-500`} />
        </div>
      </div>
    </div>
  );

  // רכיב פרויקט
  const ProjectItem = React.memo(({ project, onDelete }) => (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className={`w-3 h-3 rounded-full ${
            project.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
          }`} />
          <div>
            <h4 className="font-semibold text-white">{project.name}</h4>
            <p className="text-sm text-gray-400">{project.type} • {project.date}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 space-x-reverse">
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <Play className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <Download className="w-4 h-4" />
          </button>
          <button 
            onClick={() => onDelete(project.id)}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="space-y-6">
      {/* כותרת */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">לוח בקרה</h1>
          <p className="text-gray-400">ניהול פרויקטי אודיו והפרדת ערוצים</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 space-x-reverse transition-colors">
          <Plus className="w-4 h-4" />
          <span>פרויקט חדש</span>
        </button>
      </div>

      {/* סטטיסטיקות */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="פרויקטים סה״כ" 
          value={stats.totalProjects} 
          icon={Music} 
          color="blue" 
        />
        <StatCard 
          title="הושלמו" 
          value={stats.completedProjects} 
          icon={BarChart3} 
          color="green" 
        />
        <StatCard 
          title="בתהליך" 
          value={stats.processingProjects} 
          icon={Volume2} 
          color="yellow" 
        />
        <StatCard 
          title="קבצי אודיו" 
          value={stats.totalAudioFiles} 
          icon={FileAudio} 
          color="purple" 
        />
      </div>

      {/* טאבים */}
      <div className="bg-gray-800 rounded-lg p-1">
        <div className="flex space-x-1 space-x-reverse">
          {['overview', 'projects', 'analytics', 'settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {tab === 'overview' && 'סקירה כללית'}
              {tab === 'projects' && 'פרויקטים'}
              {tab === 'analytics' && 'ניתוחים'}
              {tab === 'settings' && 'הגדרות'}
            </button>
          ))}
        </div>
      </div>

      {/* תוכן טאבים */}
      <div className="bg-gray-800 rounded-lg p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">פרויקטים אחרונים</h3>
              <div className="space-y-3">
                {recentProjects.map(project => (
                  <ProjectItem 
                    key={project.id} 
                    project={project} 
                    onDelete={handleDeleteProject}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="text-center py-12">
            <Music className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">ניהול פרויקטים</h3>
            <p className="text-gray-500">כאן תוכל לנהל את כל הפרויקטים שלך</p>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="text-center py-12">
            <BarChart3 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">ניתוחים מתקדמים</h3>
            <p className="text-gray-500">צפה בסטטיסטיקות מפורטות על הפרויקטים שלך</p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="text-center py-12">
            <Settings className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">הגדרות מערכת</h3>
            <p className="text-gray-500">התאם את הגדרות המערכת לצרכים שלך</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 