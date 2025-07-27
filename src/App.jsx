import React, { useState, createContext, useContext } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import VocalAnalysis from './components/VocalAnalysis';
import SketchCreation from './components/SketchCreation';
import SessionManagement from './components/SessionManagement';
import ProductionRecommendations from './components/ProductionRecommendations';
import ExportVersions from './components/ExportVersions';
import CreditsContracts from './components/CreditsContracts';
import UserVerification from './components/UserVerification';
import LanguageSelector from './components/LanguageSelector';

// יצירת context לשפה
export const LanguageContext = createContext();

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [language, setLanguage] = useState('he'); // ברירת מחדל: עברית

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard onPageChange={setActivePage} />;
      case 'vocal-analysis':
        return <VocalAnalysis />;
      case 'sketches':
        return <SketchCreation />;
      case 'sessions':
        return <SessionManagement />;
      case 'recommendations':
        return <ProductionRecommendations />;
      case 'export':
        return <ExportVersions />;
      case 'credits':
        return <CreditsContracts />;
      case 'verification':
        return <UserVerification />;
      default:
        return <Dashboard onPageChange={setActivePage} />;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <div className="flex h-screen bg-studio-dark" dir={language === 'he' ? 'rtl' : 'ltr'}>
        <Sidebar activePage={activePage} onPageChange={setActivePage} />
        <main className="flex-1 overflow-auto">
          {renderPage()}
        </main>
      </div>
    </LanguageContext.Provider>
  );
}

export default App;