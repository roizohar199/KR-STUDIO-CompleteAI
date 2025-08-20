import React, { useContext } from 'react';
import {
  Mic,
  Brain,
  Database,
  Cloud,
  Settings,
  Download,
  Edit3,
  ShieldCheck,
  Circle
} from 'lucide-react';
// LanguageContext removed - using default Hebrew
import { useTranslation } from '../lib/translations';
import LanguageSelector from './LanguageSelector';
import { menuItems, menuConfig } from '../lib/menuConfig';

const Sidebar = ({ activePage, onPageChange }) => {
  const handleMenuClick = (item) => {
    console.log(`🖱️ [Sidebar] לחיצה על תפריט: ${item.key}`);
    console.log(`🖱️ [Sidebar] דף נוכחי: ${activePage}`);
    console.log(`🖱️ [Sidebar] עובר לדף: ${item.key}`);
    
    try {
      onPageChange(item.key);
      console.log(`✅ [Sidebar] ניווט הצליח: ${activePage} → ${item.key}`);
    } catch (error) {
      console.error(`❌ [Sidebar] שגיאה בניווט:`, error);
      console.error(`❌ [Sidebar] פרטי השגיאה:`, {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
    }
  };

  const getMenuIcon = (item) => {
    console.log(`🎨 [Sidebar] מחפש אייקון עבור: ${item.key}`);
    
    switch (item.key) {
      case 'dashboard':
        console.log(`🎨 [Sidebar] אייקון Dashboard: Home`);
        return <Home className="w-5 h-5" />;
      case 'audio-separation':
        console.log(`🎨 [Sidebar] אייקון AudioSeparation: Mic`);
        return <Mic className="w-5 h-5" />;
      case 'productionRecommendations':
        console.log(`🎨 [Sidebar] אייקון ProductionRecommendations: Settings`);
        return <Settings className="w-5 h-5" />;
      case 'export':
        console.log(`🎨 [Sidebar] אייקון Export: Download`);
        return <Download className="w-5 h-5" />;
      case 'credits':
        console.log(`🎨 [Sidebar] אייקון Credits: FileText`);
        return <FileText className="w-5 h-5" />;
      case 'sessions':
        console.log(`🎨 [Sidebar] אייקון Sessions: Users`);
        return <Users className="w-5 h-5" />;
      case 'sketches':
        console.log(`🎨 [Sidebar] אייקון Sketches: Edit3`);
        return <Edit3 className="w-5 h-5" />;
      case 'verification':
        console.log(`🎨 [Sidebar] אייקון Verification: ShieldCheck`);
        return <ShieldCheck className="w-5 h-5" />;
      default:
        console.log(`🎨 [Sidebar] אייקון ברירת מחדל עבור: ${item.key}`);
        return <Circle className="w-5 h-5" />;
    }
  };

  const isActive = (itemKey) => {
    const active = activePage === itemKey;
    console.log(`🔍 [Sidebar] בדיקת פעילות: ${itemKey} = ${active}`);
    return active;
  };

  const language = 'he'; // ברירת מחדל לעברית
  const t = useTranslation();
  
  // עדכון התגיות עם תרגומים
  const translatedMenuItems = menuItems.map(item => ({
    ...item,
    label: t(item.label)
  }));

  const quickStats = [
    { label: t('activeProjects'), value: '0', color: 'text-green-500' },
    { label: t('weeklyAnalyses'), value: '0', color: 'text-orange-500' },
    { label: t('sketchesCreated'), value: '0', color: 'text-blue-500' },
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
            <h1 className="text-lg font-bold text-gray-900">KR-STUDIO</h1>
            <p className="text-xs text-gray-600">{t('aiProductionSystem')}</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 p-4">
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">{t('productionTools')}</h3>
          <nav className="space-y-1">
            {translatedMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item)}
                  className={`w-full flex items-center space-x-3 space-x-reverse px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-gradient-to-r from-orange-400 to-yellow-400 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  } ${item.external ? 'border-l-2 border-blue-500' : ''}`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                  {item.external && (
                    <span className="text-xs text-blue-500 mr-auto"></span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Quick Statistics */}
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">{t('quickStats')}</h3>
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
        {/* Language Selector above email */}
        <div className={`mb-3 flex ${language === 'he' ? 'justify-start' : 'justify-end'}`}>
          <LanguageSelector />
        </div>
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-semibold">R</span>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-900">roizohar111@gmail.com</p>
            <div className="flex items-center mt-1">
              <div className="w-2 h-2 bg-green-500 rounded-full ml-2"></div>
              <span className="text-xs text-green-600 font-medium">{t('premiumActive')}</span>
            </div>
            {/* Free tier indicator */}
            <div className="flex items-center mt-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full ml-2"></div>
              <span className="text-xs text-gray-500">{t('freeTier')}</span>
            </div>
            {/* Basic tier indicator */}
            <div className="flex items-center mt-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full ml-2"></div>
              <span className="text-xs text-blue-500">{t('basicTier')}</span>
            </div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-gray-500">{t('expiryDate')}: 31/12/2025</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
