import React, { useMemo, useCallback } from 'react';
import { Music, Mic, BarChart3, Download, Settings, Users, FileAudio, Home, Upload, Play } from 'lucide-react';

const Sidebar = ({ activePage, setActivePage }) => {
  // Memoization של פריטי הניווט
  const navigationItems = useMemo(() => [
    { id: 'dashboard', label: 'לוח בקרה', icon: Home, color: 'blue' },
    { id: 'audio-separation', label: 'הפרדת אודיו', icon: Music, color: 'green' },
    { id: 'production-recommendations', label: 'המלצות הפקה', icon: Mic, color: 'purple' },
    { id: 'export-versions', label: 'ייצוא גרסאות', icon: Download, color: 'orange' },
    { id: 'sketch-creation', label: 'יצירת סקיצות', icon: Play, color: 'pink' },
    { id: 'credits-contracts', label: 'זכויות וחוזים', icon: FileAudio, color: 'indigo' },
    { id: 'user-verification', label: 'אימות משתמש', icon: Users, color: 'teal' }
  ], []);

  // Callback משופר לשינוי עמוד
  const handlePageChange = useCallback((pageId) => {
    setActivePage(pageId);
  }, [setActivePage]);

  // רכיב פריט ניווט
  const NavigationItem = React.memo(({ item, isActive, onClick }) => (
    <button
      onClick={() => onClick(item.id)}
      className={`w-full flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg transition-all duration-200 group ${
        isActive
          ? `bg-${item.color}-600 text-white shadow-lg`
          : 'text-gray-300 hover:text-white hover:bg-gray-700'
      }`}
    >
      <div className={`p-2 rounded-lg transition-colors ${
        isActive 
          ? 'bg-white/20' 
          : `bg-${item.color}-500/10 group-hover:bg-${item.color}-500/20`
      }`}>
        <item.icon className={`w-5 h-5 ${
          isActive ? 'text-white' : `text-${item.color}-400 group-hover:text-${item.color}-300`
        }`} />
      </div>
      <span className="font-medium">{item.label}</span>
    </button>
  ));

  return (
    <div className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
      {/* לוגו */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Music className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">KR Studio</h1>
            <p className="text-sm text-gray-400">Complete AI</p>
          </div>
        </div>
      </div>

      {/* ניווט ראשי */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => (
          <NavigationItem
            key={item.id}
            item={item}
            isActive={activePage === item.id}
            onClick={handlePageChange}
          />
        ))}
      </nav>

      {/* תחתית */}
      <div className="p-4 border-t border-gray-800">
        <button className="w-full flex items-center space-x-3 space-x-reverse px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
          <Settings className="w-5 h-5" />
          <span>הגדרות</span>
        </button>
      </div>
    </div>
  );
};

export default React.memo(Sidebar);
