import React from 'react';
import { Icon } from '../lib/iconRenderer';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
      retryCount: 0,
      showDetails: false
    };
  }

  static getDerivedStateFromError(error) {
    // עדכון state כדי להציג את מסך השגיאה
    return {
      hasError: true,
      errorId: this.generateErrorId()
    };
  }

  componentDidCatch(error, errorInfo) {
    // לוג השגיאה
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // שליחת השגיאה לשרת (אופציונלי)
    this.logErrorToServer(error, errorInfo);
  }

  generateErrorId() {
    return `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  logErrorToServer(error, errorInfo) {
    try {
      // שליחת השגיאה לשרת אם יש endpoint
      if (process.env.NODE_ENV === 'production') {
        fetch('/api/error-log', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            errorId: this.state.errorId,
            message: error.message,
            stack: error.stack,
            componentStack: errorInfo.componentStack,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
          })
        }).catch(() => {
          // התעלם משגיאות שליחת השגיאה
        });
      }
    } catch (e) {
      // התעלם משגיאות
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
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0
    });
    
    // ניקוי localStorage אם יש בעיות
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {
      console.warn('לא ניתן לנקות אחסון מקומי:', e);
    }
    
    // רענון הדף
    window.location.reload();
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
          <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl border border-red-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-white">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <Icon name="alert" className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">שגיאה כללית</h1>
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
                  משהו השתבש
                </h2>
                <p className="text-gray-600 mb-4">
                  המערכת נתקלה בשגיאה לא צפויה. אנא נסה שוב או פנה לתמיכה.
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
              {this.state.showDetails && this.state.errorInfo && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">פרטי השגיאה:</h3>
                  <details className="text-sm">
                    <summary className="cursor-pointer text-blue-600 hover:text-blue-800 mb-2">
                      Component Stack
                    </summary>
                    <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                  
                  {this.state.error && (
                    <details className="text-sm mt-3">
                      <summary className="cursor-pointer text-blue-600 hover:text-blue-800 mb-2">
                        Error Stack
                      </summary>
                      <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
                        {this.state.error.stack}
                      </pre>
                    </details>
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
                </ul>
              </div>

              {/* Retry Count */}
              {this.state.retryCount > 0 && (
                <div className="mt-4 text-center text-sm text-gray-500">
                  ניסיונות: {this.state.retryCount}
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// קומפוננטה פשוטה לטיפול בשגיאות
export const withErrorBoundary = (Component, fallback = null) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
      return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
      console.error('Component error:', error, errorInfo);
    }

    render() {
      if (this.state.hasError) {
        if (fallback) {
          return fallback(this.state.error);
        }
        return (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2 text-red-800">
              <Icon name="alert" className="w-5 h-5" />
              <span>שגיאה בקומפוננטה</span>
            </div>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
            >
              נסה שוב
            </button>
          </div>
        );
      }

      return <Component {...this.props} />;
    }
  };
};

// Hook לטיפול בשגיאות
export const useErrorHandler = () => {
  const [error, setError] = React.useState(null);

  const handleError = React.useCallback((error) => {
    console.error('Error caught by useErrorHandler:', error);
    setError(error);
  }, []);

  const clearError = React.useCallback(() => {
    setError(null);
  }, []);

  return { error, handleError, clearError };
};

export default ErrorBoundary;
