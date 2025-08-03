import React, { useState, createContext, useContext, Suspense, lazy } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import LanguageSelector from './components/LanguageSelector';
import PerformanceMonitor from './components/PerformanceMonitor';
import { dynamicLoader } from './lib/dynamicImports';

// יצירת context לשפה
export const LanguageContext = createContext();

// רכיב טעינה
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-full">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
    <div className="mr-4 text-lg text-gray-300">טוען...</div>
  </div>
);

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [language, setLanguage] = useState('he'); // ברירת מחדל: עברית
  const [loadedComponents, setLoadedComponents] = useState(new Map());

  // טעינה דינמית של רכיבים
  const loadComponent = async (componentName) => {
    if (loadedComponents.has(componentName)) {
      return loadedComponents.get(componentName);
    }

    try {
      const Component = await dynamicLoader.loadComponent(componentName);
      setLoadedComponents(prev => new Map(prev).set(componentName, Component));
      return Component;
    } catch (error) {
      console.error(`שגיאה בטעינת רכיב ${componentName}:`, error);
      return null;
    }
  };

  // רכיבים שנטענים דינמית
  const DynamicComponent = ({ componentName, fallback = null }) => {
    const [Component, setComponent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    React.useEffect(() => {
      const loadComp = async () => {
        try {
          setIsLoading(true);
          setError(null);
          const Comp = await loadComponent(componentName);
          if (Comp) {
            setComponent(() => Comp);
          } else {
            setError(`לא ניתן לטעון את הרכיב ${componentName}`);
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };

      loadComp();
    }, [componentName]);

    if (isLoading) {
      return fallback || <LoadingSpinner />;
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-red-500 text-center">
            <div className="text-2xl mb-4">❌ שגיאה בטעינה</div>
            <div className="text-lg">{error}</div>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              נסה שוב
            </button>
          </div>
        </div>
      );
    }

    return Component ? <Component /> : null;
  };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard onPageChange={setActivePage} />;
      case 'sketches':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <DynamicComponent componentName="SketchCreation" />
          </Suspense>
        );
      case 'sessions':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <DynamicComponent componentName="SessionManagement" />
          </Suspense>
        );
      case 'productionRecommendations':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <DynamicComponent componentName="ProductionRecommendations" />
          </Suspense>
        );
      case 'export':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <DynamicComponent componentName="ExportVersions" />
          </Suspense>
        );
      case 'credits':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <DynamicComponent componentName="CreditsContracts" />
          </Suspense>
        );
      case 'verification':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <DynamicComponent componentName="UserVerification" />
          </Suspense>
        );
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
        <PerformanceMonitor />
      </div>
    </LanguageContext.Provider>
  );
}

export default App;