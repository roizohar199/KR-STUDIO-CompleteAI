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
          console.log(`🔄 מנסה לטעון רכיב: ${componentName}`);
          const Comp = await loadComponent(componentName);
          if (Comp) {
            console.log(`✅ רכיב ${componentName} נטען בהצלחה`);
            setComponent(() => Comp);
          } else {
            console.error(`❌ רכיב ${componentName} לא נטען`);
            setError(`לא ניתן לטעון את הרכיב ${componentName}`);
          }
        } catch (err) {
          console.error(`❌ שגיאה בטעינת רכיב ${componentName}:`, err);
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
              onClick={() => {
                // במקום window.location.reload(), ננסה לטעון מחדש את הקומפוננטה
                setError(null);
                setIsLoading(true);
                loadComp();
              }}
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
      case 'audio-separation':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <DynamicComponent componentName="AudioSeparation" fallback={
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <div className="text-lg text-gray-300">טוען הפרדת אודיו...</div>
                </div>
              </div>
            } />
          </Suspense>
        );
      default:
        return <Dashboard onPageChange={setActivePage} />;
    }
  };

  return (
    <ErrorBoundary>
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <div className="flex h-screen bg-studio-dark" dir={language === 'he' ? 'rtl' : 'ltr'}>
          <Sidebar activePage={activePage} onPageChange={setActivePage} />
          <main className="flex-1 overflow-auto">
            {renderPage()}
          </main>
          <PerformanceMonitor />
        </div>
      </LanguageContext.Provider>
    </ErrorBoundary>
  );
}

export default App;