import React, { useState, useEffect } from "react";
import { Music, FileAudio, Zap, CheckCircle, AlertCircle, Clock, Download, Settings, RefreshCw, X } from "lucide-react";

export default function ProcessingStatus({ step, progress, error, fileName, onRetry, onCancel }) {
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
      case 'loading-project':
        return <RefreshCw className="w-8 h-8 text-blue-400 animate-spin" />;
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
      case 'loading-project':
        return 'from-blue-500 to-blue-600';
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
      case 'loading-project':
        return 'טוען פרויקט...';
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
      case 'loading-project':
        return 'ההפרדה הושלמה! טוען את הפרויקט המוכן עם כל הערוצים...';
      case 'error':
        return 'אירעה שגיאה בעיבוד הקובץ';
      default:
        return 'מעבד את האודיו שלך';
    }
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className={`w-16 h-16 bg-gradient-to-r ${getStepColor(step)} rounded-xl flex items-center justify-center`}>
            {getStepIcon(step)}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{getStepText(step)}</h3>
            <p className="text-gray-400">{getStepDescription(step)}</p>
          </div>
        </div>
        
        {onCancel && (
          <button
            onClick={onCancel}
            className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            title="בטל תהליך"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">התקדמות</span>
          <span className="text-sm font-medium text-white">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div
            className={`h-3 bg-gradient-to-r ${getStepColor(step)} rounded-full transition-all duration-500 ease-out`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Status Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-700/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400">זמן שחלף</span>
          </div>
          <span className="text-lg font-semibold text-white">{formatTime(elapsedTime)}</span>
        </div>
        
        {estimatedTime !== null && (
          <div className="bg-gray-700/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400">זמן משוער נותר</span>
            </div>
            <span className="text-lg font-semibold text-white">{formatTime(estimatedTime)}</span>
          </div>
        )}
      </div>

      {/* File Info */}
      {fileName && (
        <div className="bg-gray-700/50 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <FileAudio className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400">קובץ</span>
          </div>
          <span className="text-white font-medium truncate">{fileName}</span>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-900/50 border border-red-500 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <span className="text-red-200 font-medium">שגיאה</span>
          </div>
          <p className="text-red-200">{error}</p>
        </div>
      )}

      {/* Actions */}
      {error && onRetry && (
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={onRetry}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>נסה שוב</span>
          </button>
        </div>
      )}

      {/* Processing Tips */}
      {step === 'separating' && (
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-blue-200 font-medium">טיפים לעיבוד</span>
          </div>
          <ul className="text-blue-200 text-sm space-y-1">
            <li>• הפרדת אודיו איכותית לוקחת זמן - אנא המתן בסבלנות</li>
            <li>• איכות התוצאה תלויה באיכות הקובץ המקורי</li>
            <li>• ניתן לסגור את הדף - התהליך ימשיך לפעול בשרת</li>
          </ul>
        </div>
      )}
    </div>
  );
} 