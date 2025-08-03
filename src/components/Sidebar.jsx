import React, { useContext } from 'react';
import { 
  Home, 
  Mic, 
  Brain,
  Database,
  Cloud,
  Music, 
  Users, 
  Lightbulb, 
  BarChart3, 
  FileText,
  Headphones,
  Shield
} from 'lucide-react';
import { LanguageContext } from '../App';
import { useTranslation } from '../lib/translations';
import LanguageSelector from './LanguageSelector';

const Sidebar = ({ activePage, onPageChange }) => {
  const { language } = useContext(LanguageContext);
  const t = useTranslation();
  
  const menuItems = [
    { id: 'dashboard', label: t('dashboard'), icon: Home },
    { id: 'sketches', label: t('sketches'), icon: Music },
    { id: 'sessions', label: t('sessions'), icon: Users },
    { id: 'productionRecommendations', label: t('productionRecommendations'), icon: Lightbulb },
    { id: 'export', label: t('exportVersions'), icon: BarChart3 },
    { id: 'credits', label: t('creditsContracts'), icon: FileText },
    { id: 'verification', label: t('userVerification'), icon: Shield },
  ];

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