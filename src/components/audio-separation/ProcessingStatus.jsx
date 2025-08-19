import React, { useState, useEffect } from "react";
import { Music, FileAudio, Zap, CheckCircle, AlertCircle, Clock, Download, Settings, RefreshCw, X } from "lucide-react";

export default function ProcessingStatus({ step, progress, error, fileName, onRetry, onCancel }) {
  console.log(`📊 [ProcessingStatus] רכיב נטען עם:`, {
    step,
    progress,
    error: error?.message,
    fileName
  });

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
    if (!seconds || seconds < 0) return '00:00';
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const result = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    
    console.log(`⏰ [ProcessingStatus] זמן מעוצב: ${seconds}s = ${result}`);
    return result;
  };

  const getStepIcon = (step) => {
    console.log(`🎨 [ProcessingStatus] מחפש אייקון עבור שלב: ${step}`);
    
    switch (step) {
      case 'uploading':
        console.log(`🎨 [ProcessingStatus] אייקון Uploading: Upload`);
        return <Upload className="w-8 h-8 text-blue-400" />;
      case 'separating':
        console.log(`🎨 [ProcessingStatus] אייקון Separating: Split`);
        return <Split className="w-8 h-8 text-purple-400" />;
      case 'monitoring':
        console.log(`🎨 [ProcessingStatus] אייקון Monitoring: Eye`);
        return <Eye className="w-8 h-8 text-green-400" />;
      case 'completed':
        console.log(`🎨 [ProcessingStatus] אייקון Completed: CheckCircle`);
        return <CheckCircle className="w-8 h-8 text-green-400" />;
      case 'error':
        console.log(`🎨 [ProcessingStatus] אייקון Error: XCircle`);
        return <XCircle className="w-8 h-8 text-red-400" />;
      default:
        console.log(`🎨 [ProcessingStatus] אייקון ברירת מחדל עבור: ${step}`);
        return <Circle className="w-8 h-8 text-purple-400" />;
    }
  };

  const getStepColor = (step) => {
    console.log(`🎨 [ProcessingStatus] מחפש צבע עבור שלב: ${step}`);
    
    switch (step) {
      case 'uploading':
        console.log(`🎨 [ProcessingStatus] צבע Uploading: from-blue-500 to-blue-600`);
        return 'from-blue-500 to-blue-600';
      case 'separating':
        console.log(`🎨 [ProcessingStatus] צבע Separating: from-purple-500 to-purple-600`);
        return 'from-purple-500 to-purple-600';
      case 'monitoring':
        console.log(`🎨 [ProcessingStatus] צבע Monitoring: from-green-500 to-green-600`);
        return 'from-green-500 to-green-600';
      case 'completed':
        console.log(`🎨 [ProcessingStatus] צבע Completed: from-green-500 to-green-600`);
        return 'from-green-500 to-green-600';
      case 'error':
        console.log(`🎨 [ProcessingStatus] צבע Error: from-red-500 to-red-600`);
        return 'from-red-500 to-red-600';
      default:
        console.log(`🎨 [ProcessingStatus] צבע ברירת מחדל עבור: ${step}`);
        return 'from-purple-500 to-purple-600';
    }
  };

  const getStepText = (step) => {
    console.log(`📝 [ProcessingStatus] מחפש טקסט עבור שלב: ${step}`);
    
    switch (step) {
      case 'uploading':
        console.log(`📝 [ProcessingStatus] טקסט Uploading: מעלה קובץ...`);
        return 'מעלה קובץ...';
      case 'separating':
        console.log(`📝 [ProcessingStatus] טקסט Separating: מפריד ערוצים...`);
        return 'מפריד ערוצים...';
      case 'monitoring':
        console.log(`📝 [ProcessingStatus] טקסט Monitoring: עוקב אחר התקדמות...`);
        return 'עוקב אחר התקדמות...';
      case 'completed':
        console.log(`📝 [ProcessingStatus] טקסט Completed: הושלם בהצלחה!`);
        return 'הושלם בהצלחה!';
      case 'error':
        console.log(`📝 [ProcessingStatus] טקסט Error: שגיאה בעיבוד`);
        return 'שגיאה בעיבוד';
      default:
        console.log(`📝 [ProcessingStatus] טקסט ברירת מחדל עבור: ${step}`);
        return 'מעבד...';
    }
  };

  const getStepDescription = (step) => {
    console.log(`📄 [ProcessingStatus] מחפש תיאור עבור שלב: ${step}`);
    
    switch (step) {
      case 'uploading':
        console.log(`📄 [ProcessingStatus] תיאור Uploading: מעלה את הקובץ לשרת...`);
        return 'מעלה את הקובץ לשרת...';
      case 'separating':
        console.log(`📄 [ProcessingStatus] תיאור Separating: מפריד את האודיו לערוצים נפרדים...`);
        return 'מפריד את האודיו לערוצים נפרדים...';
      case 'monitoring':
        console.log(`📄 [ProcessingStatus] תיאור Monitoring: עוקב אחר התקדמות ההפרדה...`);
        return 'עוקב אחר התקדמות ההפרדה...';
      case 'completed':
        console.log(`📄 [ProcessingStatus] תיאור Completed: ההפרדה הושלמה בהצלחה!`);
        return 'ההפרדה הושלמה בהצלחה!';
      case 'error':
        console.log(`📄 [ProcessingStatus] תיאור Error: אירעה שגיאה בעיבוד הקובץ`);
        return 'אירעה שגיאה בעיבוד הקובץ';
      default:
        console.log(`📄 [ProcessingStatus] תיאור ברירת מחדל עבור: ${step}`);
        return 'מעבד את הקובץ...';
    }
  };

  const handleRetry = () => {
    console.log(`🔄 [ProcessingStatus] כפתור Retry נלחץ`);
    try {
      onRetry?.();
      console.log(`✅ [ProcessingStatus] Retry הופעל בהצלחה`);
    } catch (error) {
      console.error(`❌ [ProcessingStatus] שגיאה ב-Retry:`, error);
    }
  };

  const handleCancel = () => {
    console.log(`❌ [ProcessingStatus] כפתור Cancel נלחץ`);
    try {
      onCancel?.();
      console.log(`✅ [ProcessingStatus] Cancel הופעל בהצלחה`);
    } catch (error) {
      console.error(`❌ [ProcessingStatus] שגיאה ב-Cancel:`, error);
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
            onClick={handleCancel}
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
            onClick={handleRetry}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>נסה שוב</span>
          </button>
        </div>
      )}
      
      {/* Retry button for loading-project step */}
      {step === 'loading-project' && onRetry && (
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={handleRetry}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>נסה לטעון שוב</span>
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
      
      {/* Loading Project Tips */}
      {step === 'loading-project' && (
        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <RefreshCw className="w-4 h-4 text-green-400" />
            <span className="text-green-200 font-medium">טיפים לטעינת פרויקט</span>
          </div>
          <ul className="text-green-200 text-sm space-y-1">
            <li>• ההפרדה הושלמה! המערכת טוענת את הפרויקט המוכן</li>
            <li>• אם הטעינה נכשלת, לחץ על "נסה לטעון שוב"</li>
            <li>• ניתן גם ללחוץ על "פתח בסטודיו" מהרשימה למטה</li>
            <li>• המערכת תנסה לטעון אוטומטית מספר פעמים</li>
          </ul>
        </div>
      )}
    </div>
  );
} 