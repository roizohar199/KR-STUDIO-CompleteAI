import React from 'react';
import { 
  Home, 
  Mic, 
  Music, 
  Users, 
  Lightbulb, 
  BarChart3, 
  FileText,
  Headphones,
  Shield
} from 'lucide-react';

const Sidebar = ({ activePage, onPageChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'לוח בקרה', icon: Home },
    { id: 'vocal-analysis', label: 'ניתוח ערוץ שירה', icon: Mic },
    { id: 'sketches', label: 'יצירת סקיצות', icon: Music },
    { id: 'sessions', label: 'ניהול סשנים', icon: Users },
    { id: 'recommendations', label: 'המלצות הפקה', icon: Lightbulb },
    { id: 'export', label: 'יצוא גרסאות', icon: BarChart3 },
    { id: 'credits', label: 'קרדיטים וחוזים', icon: FileText },
    { id: 'verification', label: 'אימות משתמש', icon: Shield },
  ];

  const quickStats = [
    { label: 'פרויקטים פעילים', value: '0', color: 'text-green-500' },
    { label: 'ניתוחים השבוע', value: '0', color: 'text-orange-500' },
    { label: 'סקיצות שנוצרו', value: '0', color: 'text-blue-500' },
  ];

  return (
    <div className="w-64 h-screen bg-studio-lightGray flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
            <Headphones className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">StudioAI</h1>
            <p className="text-xs text-gray-600">מערכת AI להפקה ומיקס</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 p-4">
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">כלי הפקה</h3>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`w-full flex items-center space-x-3 space-x-reverse px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-gradient-to-r from-orange-400 to-yellow-400 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Quick Statistics */}
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">סטטיסטיקות מהירות</h3>
          <div className="space-y-2">
            {quickStats.map((stat, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span className="text-gray-600">{stat.label}</span>
                <span className={`font-semibold ${stat.color}`}>{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-semibold">R</span>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-900">roizohar111@gmail.com</p>
            <div className="flex items-center mt-1">
              <div className="w-2 h-2 bg-green-500 rounded-full ml-2"></div>
              <span className="text-xs text-green-600 font-medium">פרימיום פעיל</span>
            </div>
            {/* Free tier indicator */}
            <div className="flex items-center mt-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full ml-2"></div>
              <span className="text-xs text-gray-500">חינמי - 1/1 פרויקט</span>
            </div>
            {/* Basic tier indicator */}
            <div className="flex items-center mt-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full ml-2"></div>
              <span className="text-xs text-blue-500">בסיסי - 2/3 פרויקטים</span>
            </div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-gray-500">תוקף: 31/12/2025</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 