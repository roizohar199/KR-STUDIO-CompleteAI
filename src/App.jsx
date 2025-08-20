import React, { useState, createContext, useContext, Suspense, lazy, useEffect } from 'react';
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // טעינה דינמית של רכיבים
  const loadComponent = async (componentName) => {
    console.log(`🔄 [App] מתחיל טעינת קומפוננטה: ${componentName}`);
    setLoading(true);
    setError(null);
    
    try {
      console.log(`🔍 [App] מחפש קומפוננטה: ${componentName}`);
      let Component;
      
      switch (componentName) {
        case 'dashboard':
          console.log(`📁 [App] טוען Dashboard...`);
          Component = (await import('./components/Dashboard')).default;
          break;
        case 'audio-separation':
          console.log(`📁 [App] טוען AudioSeparation...`);
          Component = (await import('./components/AudioSeparation')).default;
          break;
        case 'production-recommendations':
          console.log(`📁 [App] טוען ProductionRecommendations...`);
          Component = (await import('./components/ProductionRecommendations')).default;
          break;
        case 'export-versions':
          console.log(`📁 [App] טוען ExportVersions...`);
          Component = (await import('./components/ExportVersions')).default;
          break;
        case 'credits-contracts':
          console.log(`📁 [App] טוען CreditsContracts...`);
          Component = (await import('./components/CreditsContracts')).default;
          break;
        case 'session-management':
          console.log(`📁 [App] טוען SessionManagement...`);
          Component = (await import('./components/SessionManagement')).default;
          break;
        case 'sketch-creation':
          console.log(`📁 [App] טוען SketchCreation...`);
          Component = (await import('./components/SketchCreation')).default;
          break;
        case 'user-verification':
          console.log(`📁 [App] טוען UserVerification...`);
          Component = (await import('./components/UserVerification')).default;
          break;
        case 'performance-monitor':
          console.log(`📁 [App] טוען PerformanceMonitor...`);
          Component = (await import('./components/PerformanceMonitor')).default;
          break;
        case 'statistics-display':
          console.log(`📁 [App] טוען StatisticsDisplay...`);
          Component = (await import('./components/StatisticsDisplay')).default;
          break;
        case 'waveform-visualizer':
          console.log(`📁 [App] טוען WaveformVisualizer...`);
          Component = (await import('./components/WaveformVisualizer')).default;
          break;
        default:
          console.error(`❌ [App] קומפוננטה לא ידועה: ${componentName}`);
          throw new Error(`קומפוננטה לא ידועה: ${componentName}`);
      }
      
      console.log(`✅ [App] קומפוננטה ${componentName} נטענה בהצלחה`);
      setActivePage(componentName);
      return Component;
    } catch (error) {
      console.error(`❌ [App] שגיאה בטעינת קומפוננטה ${componentName}:`, error);
      console.error(`❌ [App] פרטי השגיאה:`, {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      setError(`שגיאה בטעינת ${componentName}: ${error.message}`);
      return null;
    } finally {
      setLoading(false);
      console.log(`🔚 [App] סיים טעינת קומפוננטה: ${componentName}`);
    }
  };

  // רכיבים שנטענים דינמית
  const DynamicComponent = ({ componentName, fallback = null }) => {
    const [Component, setComponent] = useState(null);
    const [componentError, setComponentError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      console.log(`🔄 [DynamicComponent] מתחיל טעינה דינמית של: ${componentName}`);
      setIsLoading(true);
      setComponentError(null);
      
      const loadComp = async () => {
        try {
          console.log(`🔍 [DynamicComponent] מנסה לטעון: ${componentName}`);
          const loadedComponent = await loadComponent(componentName);
          
          if (loadedComponent) {
            console.log(`✅ [DynamicComponent] ${componentName} נטען בהצלחה`);
            setComponent(loadedComponent);
          } else {
            console.error(`❌ [DynamicComponent] ${componentName} לא נטען`);
            setComponentError(`לא ניתן לטעון ${componentName}`);
          }
        } catch (error) {
          console.error(`❌ [DynamicComponent] שגיאה בטעינת ${componentName}:`, error);
          setComponentError(error.message);
        } finally {
          setIsLoading(false);
          console.log(`🔚 [DynamicComponent] סיים טעינה דינמית של: ${componentName}`);
        }
      };

      loadComp();
    }, [componentName]);

    if (isLoading) {
      console.log(`⏳ [DynamicComponent] טוען ${componentName}...`);
      return <LoadingSpinner />;
    }

    if (componentError) {
      console.error(`❌ [DynamicComponent] שגיאה ב-${componentName}:`, componentError);
      return (
        <div className="error-boundary">
          <h2>שגיאה בטעינת {componentName}</h2>
          <p>{componentError}</p>
          <button onClick={() => window.location.reload()}>רענן דף</button>
        </div>
      );
    }

    if (!Component) {
      console.error(`❌ [DynamicComponent] קומפוננטה ${componentName} לא זמינה`);
      return fallback || <div>קומפוננטה לא זמינה</div>;
    }

    console.log(`🎯 [DynamicComponent] מציג ${componentName}`);
    return <Component onPageChange={setActivePage} />;
  };

  // רכיבים שנטענים דינמית
  const renderPage = () => {
    console.log(`🎨 [App] מציג דף: ${activePage}`);
    
    switch (activePage) {
      case 'dashboard':
        console.log(`📊 [App] מציג Dashboard`);
        return <Dashboard onPageChange={setActivePage} />;
      case 'sketches':
        console.log(`✏️ [App] מציג SketchCreation`);
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <DynamicComponent componentName="SketchCreation" />
          </Suspense>
        );
      case 'sessions':
        console.log(`🔐 [App] מציג SessionManagement`);
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <DynamicComponent componentName="SessionManagement" />
          </Suspense>
        );
      case 'productionRecommendations':
        console.log(`🎛️ [App] מציג ProductionRecommendations`);
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <DynamicComponent componentName="ProductionRecommendations" />
          </Suspense>
        );
      case 'export':
        console.log(`📤 [App] מציג ExportVersions`);
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <DynamicComponent componentName="ExportVersions" />
          </Suspense>
        );
      case 'credits':
        console.log(`📋 [App] מציג CreditsContracts`);
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <DynamicComponent componentName="CreditsContracts" />
          </Suspense>
        );
      case 'verification':
        console.log(`👤 [App] מציג UserVerification`);
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <DynamicComponent componentName="UserVerification" />
          </Suspense>
        );
      case 'audio-separation':
        console.log(`🎵 [App] מציג AudioSeparation`);
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
        console.error(`❌ [App] דף לא ידוע: ${activePage}`);
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