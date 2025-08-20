import React, { useState, useEffect, Suspense } from 'react';
import { Icon } from './lib/iconRenderer.jsx';
import ErrorBoundary from './components/ErrorBoundary';
import { safetyGuards } from './lib/safetyGuards';
import './index.css';

// קומפוננטת טעינה
const LoadingSpinner = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-400 mx-auto mb-4"></div>
      <h2 className="text-2xl font-bold text-white mb-2">טוען KR-STUDIO</h2>
      <p className="text-purple-200">מכין את המערכת...</p>
    </div>
  </div>
);

// קומפוננטת שגיאה מתקדמת
class AdvancedErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
      retryCount: 0,
      showDetails: false,
      componentStack: []
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      errorId: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error('AdvancedErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo,
      componentStack: errorInfo.componentStack.split('\n').filter(line => line.trim())
    });

    // לוג השגיאה
    this.logError(error, errorInfo);
  }

  logError(error, errorInfo) {
    try {
      const errorData = {
        errorId: this.state.errorId,
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        retryCount: this.state.retryCount
      };

      console.group('🚨 KR-STUDIO Error Report');
      console.error('Error ID:', errorData.errorId);
      console.error('Message:', errorData.message);
      console.error('Component Stack:', errorData.componentStack);
      console.error('Timestamp:', errorData.timestamp);
      console.groupEnd();

      // שליחה לשרת אם אפשר
      if (process.env.NODE_ENV === 'production') {
        fetch('/api/error-log', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(errorData)
        }).catch(() => {
          // התעלם משגיאות שליחת השגיאה
        });
      }
    } catch (e) {
      console.error('Failed to log error:', e);
    }
  }

  handleRetry = () => {
    this.setState(prevState => ({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: prevState.retryCount + 1
    }));
  }

  handleReset = () => {
    try {
      // ניקוי אחסון מקומי
      if (typeof localStorage !== 'undefined') {
        localStorage.clear();
      }
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.clear();
      }
      
      // איפוס state
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
        retryCount: 0
      });
      
      // רענון הדף
      window.location.reload();
    } catch (e) {
      console.error('Failed to reset:', e);
      window.location.reload();
    }
  }

  handleReload = () => {
    window.location.reload();
  }

  toggleDetails = () => {
    this.setState(prevState => ({
      showDetails: !prevState.showDetails
    }));
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center p-4">
          <div className="max-w-3xl w-full bg-white rounded-2xl shadow-2xl border border-red-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-white">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <Icon name="alert" className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">שגיאה כללית - KR-STUDIO</h1>
                  <p className="text-red-100">המערכת נתקלה בבעיה לא צפויה</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="bg-red-100 p-4 rounded-full inline-block mb-4">
                  <Icon name="alert" className="w-12 h-12 text-red-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  משהו השתבש במערכת
                </h2>
                <p className="text-gray-600 mb-4">
                  KR-STUDIO נתקל בשגיאה לא צפויה. אנא נסה שוב או פנה לתמיכה.
                </p>
                
                {this.state.error && (
                  <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600 mb-4">
                    <strong>שגיאה:</strong> {this.state.error.message}
                  </div>
                )}

                {this.state.errorId && (
                  <div className="text-xs text-gray-500 mb-4">
                    מזהה שגיאה: {this.state.errorId}
                  </div>
                )}

                {this.state.retryCount > 0 && (
                  <div className="text-sm text-blue-600 mb-4">
                    ניסיונות: {this.state.retryCount}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <button
                  onClick={this.handleRetry}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Icon name="check" className="w-4 h-4" />
                  <span>נסה שוב</span>
                </button>
                
                <button
                  onClick={this.handleReload}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Icon name="refresh" className="w-4 h-4" />
                  <span>רענן דף</span>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={this.handleReset}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Icon name="trash" className="w-4 h-4" />
                  <span>אפס מערכת</span>
                </button>
                
                <button
                  onClick={this.toggleDetails}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Icon name="info" className="w-4 h-4" />
                  <span>{this.state.showDetails ? 'הסתר פרטים' : 'הצג פרטים'}</span>
                </button>
              </div>

              {/* Error Details */}
              {this.state.showDetails && (
                <div className="mt-6 space-y-4">
                  {this.state.componentStack.length > 0 && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold text-gray-800 mb-3">Component Stack:</h3>
                      <div className="bg-gray-100 p-3 rounded text-xs overflow-x-auto max-h-40 overflow-y-auto">
                        {this.state.componentStack.map((line, index) => (
                          <div key={index} className="font-mono text-gray-700">
                            {line}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {this.state.error && this.state.error.stack && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold text-gray-800 mb-3">Error Stack:</h3>
                      <div className="bg-gray-100 p-3 rounded text-xs overflow-x-auto max-h-40 overflow-y-auto">
                        <pre className="font-mono text-gray-700 whitespace-pre-wrap">
                          {this.state.error.stack}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Help Section */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">צריך עזרה?</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• בדוק שהדפדפן מעודכן</li>
                  <li>• נסה לפתוח את האתר בדפדפן אחר</li>
                  <li>• נקה את המטמון של הדפדפן</li>
                  <li>• פנה לתמיכה עם מזהה השגיאה</li>
                  <li>• בדוק שהאינטרנט עובד</li>
                </ul>
              </div>

              {/* System Info */}
              <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
                <div className="grid grid-cols-2 gap-2">
                  <div>דפדפן: {navigator.userAgent.split(' ').pop()}</div>
                  <div>URL: {window.location.href}</div>
                  <div>זמן: {new Date().toLocaleString('he-IL')}</div>
                  <div>גרסה: KR-STUDIO v2.0</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// קומפוננטת App הראשית
function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadedComponents, setLoadedComponents] = useState(new Map());

  // אתחול SafetyGuards
  useEffect(() => {
    try {
      safetyGuards.initialize();
      console.log('✅ KR-STUDIO App initialized with SafetyGuards');
    } catch (error) {
      console.error('❌ Failed to initialize SafetyGuards:', error);
    }
  }, []);

  // טעינת קומפוננטות דינמית
  const loadComponent = async (componentName) => {
    try {
      // בדיקה אם הקומפוננטה כבר נטענה
      if (loadedComponents.has(componentName)) {
        return loadedComponents.get(componentName);
      }

      let Component;
      
      switch (componentName) {
        case 'dashboard':
          Component = (await import('./components/Dashboard')).default;
          break;
        case 'audio-separation':
          Component = (await import('./components/AudioSeparation')).default;
          break;
        case 'productionRecommendations':
          Component = (await import('./components/ProductionRecommendations')).default;
          break;
        case 'sketches':
          Component = (await import('./components/SketchCreation')).default;
          break;
        case 'export':
          Component = (await import('./components/ExportVersions')).default;
          break;
        case 'credits':
          Component = (await import('./components/CreditsContracts')).default;
          break;
        case 'sessions':
          Component = (await import('./components/SessionManagement')).default;
          break;
        case 'verification':
          Component = (await import('./components/UserVerification')).default;
          break;
        case 'advancedCodeManager':
          Component = (await import('./components/AdvancedCodeManager')).default;
          break;
        case 'statistics-display':
          Component = (await import('./components/StatisticsDisplay')).default;
          break;
        case 'performance-monitor':
          Component = (await import('./components/PerformanceMonitor')).default;
          break;
        case 'waveform-visualizer':
          Component = (await import('./components/WaveformVisualizer')).default;
          break;
        default:
          Component = (await import('./components/Dashboard')).default;
      }

      // שמירת הקומפוננטה במטמון
      setLoadedComponents(prev => new Map(prev).set(componentName, Component));
      
      return Component;
    } catch (error) {
      console.error(`Failed to load component ${componentName}:`, error);
      setError(`שגיאה בטעינת ${componentName}`);
      
      // החזרת קומפוננטת ברירת מחדל
      const Dashboard = (await import('./components/Dashboard')).default;
      return Dashboard;
    }
  };

  // טעינת קומפוננטה עם טיפול בשגיאות
  const DynamicComponent = ({ componentName, fallback = null }) => {
    const [Component, setComponent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const loadComp = async () => {
        try {
          setLoading(true);
          setError(null);
          
          const LoadedComponent = await loadComponent(componentName);
          setComponent(() => LoadedComponent);
        } catch (err) {
          console.error(`Error loading ${componentName}:`, err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      loadComp();
    }, [componentName]);

    if (loading) {
      return fallback || <LoadingSpinner />;
    }

    if (error) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center p-4">
          <div className="text-center">
            <Icon name="alert" className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">שגיאה בטעינה</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              נסה שוב
            </button>
          </div>
        </div>
      );
    }

    if (!Component) {
      return fallback || <LoadingSpinner />;
    }

    return <Component onPageChange={setCurrentPage} />;
  };

  // טעינה ראשונית
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // טעינת קומפוננטת Dashboard ראשונה
        await loadComponent('dashboard');
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to initialize app:', error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  // טיפול בשגיאות
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center p-4">
        <div className="text-center">
          <Icon name="alert" className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">שגיאה באתחול</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            נסה שוב
          </button>
        </div>
      </div>
    );
  }

  // טעינה
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // רנדור הדף
  const renderPage = () => {
    return (
      <DynamicComponent 
        componentName={currentPage} 
        fallback={<LoadingSpinner />}
      />
    );
  };

  return (
    <AdvancedErrorBoundary>
      <div className="App">
        {renderPage()}
      </div>
    </AdvancedErrorBoundary>
  );
}

export default App;