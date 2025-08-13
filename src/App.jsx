import React, { useState, createContext, useContext, Suspense, lazy } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import LanguageSelector from './components/LanguageSelector';
import PerformanceMonitor from './components/PerformanceMonitor';

// יצירת context לשפה
export const LanguageContext = createContext();

// רכיב טעינה משופר
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-full">
    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
    <div className="mr-4 text-sm text-gray-300">טוען...</div>
  </div>
);

// רכיבים שנטענים דינמית - רק מה שבאמת צריך
const AudioSeparation = lazy(() => import('./components/AudioSeparation'));
const ProductionRecommendations = lazy(() => import('./components/ProductionRecommendations'));
const ExportVersions = lazy(() => import('./components/ExportVersions'));
const SketchCreation = lazy(() => import('./components/SketchCreation'));
const CreditsContracts = lazy(() => import('./components/CreditsContracts'));
const UserVerification = lazy(() => import('./components/UserVerification'));

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error('שגיאה גלובלית:', error, errorInfo);
  }
  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
          <div className="text-3xl mb-4">❌ שגיאה כללית באפליקציה</div>
          <div className="text-lg mb-4">{this.state.error?.message || 'אירעה שגיאה לא צפויה.'}</div>
          <button onClick={this.handleReload} className="px-6 py-2 bg-blue-600 rounded hover:bg-blue-700">רענן דף</button>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [language, setLanguage] = useState('he'); // ברירת מחדל: עברית

  // פונקציה פשוטה לניווט
  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'audio-separation':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <AudioSeparation />
          </Suspense>
        );
      case 'production-recommendations':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <ProductionRecommendations />
          </Suspense>
        );
      case 'export-versions':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <ExportVersions />
          </Suspense>
        );
      case 'sketch-creation':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <SketchCreation />
          </Suspense>
        );
      case 'credits-contracts':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <CreditsContracts />
          </Suspense>
        );
      case 'user-verification':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <UserVerification />
          </Suspense>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <ErrorBoundary>
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
          <Sidebar activePage={activePage} setActivePage={setActivePage} />
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h1 className="text-xl font-semibold">
                {activePage === 'dashboard' && 'לוח בקרה'}
                {activePage === 'audio-separation' && 'הפרדת אודיו'}
                {activePage === 'production-recommendations' && 'המלצות הפקה'}
                {activePage === 'export-versions' && 'ייצוא גרסאות'}
                {activePage === 'sketch-creation' && 'יצירת סקיצות'}
                {activePage === 'credits-contracts' && 'זכויות וחוזים'}
                {activePage === 'user-verification' && 'אימות משתמש'}
              </h1>
              <div className="flex items-center space-x-4 space-x-reverse">
                <PerformanceMonitor />
                <LanguageSelector />
              </div>
            </div>
            <main className="flex-1 overflow-auto p-6">
              {renderPage()}
            </main>
          </div>
        </div>
      </LanguageContext.Provider>
    </ErrorBoundary>
  );
}

export default App;