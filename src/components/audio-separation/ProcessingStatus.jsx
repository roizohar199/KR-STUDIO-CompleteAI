import React, { useState, useEffect } from "react";
import { Music, FileAudio, Zap, CheckCircle, AlertCircle, Clock, Download, Settings, RefreshCw } from "lucide-react";

export default function ProcessingStatus({ step, progress, error, fileName, onRetry }) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(null);

  useEffect(() => {
    let interval;
    if (step === 'uploading' || step === 'separating' || step === 'processing') {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step]);

  useEffect(() => {
    // חישוב זמן משוער לפי התקדמות
    if (progress > 0 && elapsedTime > 0) {
      const totalEstimated = (elapsedTime / progress) * 100;
      const remaining = Math.max(0, totalEstimated - elapsedTime);
      setEstimatedTime(Math.round(remaining));
    }
  }, [progress, elapsedTime]);

  const formatTime = (seconds) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getStepIcon = (step) => {
    switch (step) {
      case 'uploading':
        return <Download className="w-8 h-8 text-blue-400" />;
      case 'processing':
        return <Settings className="w-8 h-8 text-purple-400" />;
      case 'separating':
        return <Zap className="w-8 h-8 text-green-400" />;
      case 'completed':
        return <CheckCircle className="w-8 h-8 text-green-400" />;
      case 'error':
        return <AlertCircle className="w-8 h-8 text-red-400" />;
      default:
        return <Music className="w-8 h-8 text-purple-400" />;
    }
  };

  const getStepColor = (step) => {
    switch (step) {
      case 'uploading':
        return 'from-blue-500 to-blue-600';
      case 'processing':
        return 'from-purple-500 to-purple-600';
      case 'separating':
        return 'from-green-500 to-green-600';
      case 'completed':
        return 'from-green-500 to-green-600';
      case 'error':
        return 'from-red-500 to-red-600';
      default:
        return 'from-purple-500 to-purple-600';
    }
  };

  const getStepText = (step) => {
    switch (step) {
      case 'uploading':
        return 'מעלה קובץ...';
      case 'processing':
        return 'מנתח אודיו...';
      case 'separating':
        return 'מפריד ערוצים...';
      case 'completed':
        return 'הושלם בהצלחה!';
      case 'error':
        return 'שגיאה בעיבוד';
      default:
        return 'מעבד...';
    }
  };

  const getStepDescription = (step) => {
    switch (step) {
      case 'uploading':
        return `מעלה את הקובץ "${fileName}" לשרת`;
      case 'processing':
        return 'מנתח את האודיו ומכין לעיבוד מתקדם';
      case 'separating':
        return 'מפריד את האודיו ל-5 ערוצים נפרדים (ווקאל, בס, תופים, כלי נגינה, אחר)';
      case 'completed':
        return 'האודיו הופרד בהצלחה! אתה יכול להוריד את הערוצים';
      case 'error':
        return 'אירעה שגיאה בעיבוד הקובץ';
      default:
        return 'מעבד את האודיו שלך';
    }
  };

  const getDetailedProgress = (step, progress) => {
    switch (step) {
      case 'uploading':
        return `העלאה: ${progress}%`;
      case 'processing':
        return `ניתוח: ${progress}%`;
      case 'separating':
        return `הפרדה: ${progress}%`;
      default:
        return `${progress}% הושלם`;
    }
  };

  if (error) {
    return (
      <div className="bg-gray-900 rounded-xl p-8 border border-red-500/30">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-semibold text-white mb-2">שגיאה בעיבוד</h2>
          <p className="text-red-400 mb-6">{error}</p>
          
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-6">
            <p className="text-red-400 text-sm">
              נסה שוב או פנה לתמיכה אם הבעיה נמשכת
            </p>
          </div>
          
          {/* כפתור נסה שוב */}
          {onRetry && (
            <button
              onClick={onRetry}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              <RefreshCw className="w-5 h-5" />
              נסה שוב
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
      <div className="text-center">
        <div className={`w-16 h-16 bg-gradient-to-r ${getStepColor(step)} rounded-full flex items-center justify-center mx-auto mb-4 ${
          step === 'processing' || step === 'separating' ? 'animate-spin' : ''
        }`}>
          {getStepIcon(step)}
        </div>
        
        <h2 className="text-2xl font-semibold text-white mb-2">
          {getStepText(step)}
        </h2>
        <p className="text-gray-400 mb-4">{getStepDescription(step)}</p>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
          <div 
            className={`bg-gradient-to-r ${getStepColor(step)} h-3 rounded-full transition-all duration-300`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        {/* Progress Details */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-gray-400">{getDetailedProgress(step, progress)}</p>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Clock className="w-4 h-4" />
            <span>זמן שחלף: {formatTime(elapsedTime)}</span>
            {estimatedTime && step !== 'completed' && (
              <span>• נותר: ~{formatTime(estimatedTime)}</span>
            )}
          </div>
        </div>
        
        {/* Processing Steps */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { step: 'uploading', label: 'העלאה', icon: <Download className="w-4 h-4" /> },
            { step: 'processing', label: 'ניתוח', icon: <Settings className="w-4 h-4" /> },
            { step: 'separating', label: 'הפרדה', icon: <Zap className="w-4 h-4" /> }
          ].map((item, index) => (
            <div key={index} className={`flex items-center gap-3 p-4 rounded-lg ${
              step === item.step 
                ? 'bg-purple-500/20 border border-purple-500/30' 
                : step === 'completed' || (index < ['uploading', 'processing', 'separating'].indexOf(step))
                  ? 'bg-green-500/20 border border-green-500/30'
                  : 'bg-gray-700/50 border border-gray-600/30'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === item.step 
                  ? 'bg-purple-500 text-white animate-pulse' 
                  : step === 'completed' || (index < ['uploading', 'processing', 'separating'].indexOf(step))
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-600 text-gray-400'
              }`}>
                {step === 'completed' || (index < ['uploading', 'processing', 'separating'].indexOf(step)) ? (
                  <CheckCircle className="w-5 h-5" />
                ) : step === item.step ? (
                  item.icon
                ) : (
                  <span className="text-xs font-bold">{index + 1}</span>
                )}
              </div>
              <div className="flex-1">
                <span className={`text-sm font-medium ${
                  step === item.step 
                    ? 'text-purple-400' 
                    : step === 'completed' || (index < ['uploading', 'processing', 'separating'].indexOf(step))
                      ? 'text-green-400'
                      : 'text-gray-400'
                }`}>
                  {item.label}
                </span>
                <p className="text-xs text-gray-500 mt-1">
                  {step === item.step ? 'בתהליך...' : 
                   step === 'completed' || (index < ['uploading', 'processing', 'separating'].indexOf(step)) ? 'הושלם' : 
                   'ממתין...'}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tips */}
        {step === 'separating' && (
          <div className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <p className="text-blue-400 text-sm">
              💡 טיפ: תהליך ההפרדה יכול לקחת 2-5 דקות בהתאם לאורך הקובץ
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 