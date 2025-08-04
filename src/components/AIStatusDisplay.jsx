import React from 'react';
import { Brain, Zap, AlertCircle, CheckCircle, Clock, Wifi, WifiOff } from 'lucide-react';

const AIStatusDisplay = ({ 
  status = 'available', 
  isProcessing = false, 
  enhancedRecommendations = null,
  aiSummary = null 
}) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'available':
        return {
          icon: <Brain className="w-5 h-5" />,
          color: 'text-green-400',
          bgColor: 'bg-green-500/20',
          borderColor: 'border-green-500/30',
          text: 'AI זמין',
          description: 'AI מתקדם זמין להמלצות'
        };
      case 'processing':
        return {
          icon: <Clock className="w-5 h-5" />,
          color: 'text-blue-400',
          bgColor: 'bg-blue-500/20',
          borderColor: 'border-blue-500/30',
          text: 'AI מעבד',
          description: 'AI מעבד את הניתוח...'
        };
      case 'unavailable':
        return {
          icon: <WifiOff className="w-5 h-5" />,
          color: 'text-red-400',
          bgColor: 'bg-red-500/20',
          borderColor: 'border-red-500/30',
          text: 'AI לא זמין',
          description: 'AI לא זמין כרגע'
        };
      case 'error':
        return {
          icon: <AlertCircle className="w-5 h-5" />,
          color: 'text-red-400',
          bgColor: 'bg-red-500/20',
          borderColor: 'border-red-500/30',
          text: 'שגיאה ב-AI',
          description: 'שגיאה בחיבור ל-AI'
        };
      default:
        return {
          icon: <Brain className="w-5 h-5" />,
          color: 'text-gray-400',
          bgColor: 'bg-gray-500/20',
          borderColor: 'border-gray-500/30',
          text: 'AI לא ידוע',
          description: 'סטטוס AI לא ידוע'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <div className="space-y-4">
      {/* AI Status Card */}
      <div className={`glass-effect rounded-xl p-4 border ${config.borderColor} ${config.bgColor}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${config.bgColor} ${config.color}`}>
              {isProcessing ? (
                <div className="animate-spin">
                  {config.icon}
                </div>
              ) : (
                config.icon
              )}
            </div>
            <div>
              <h3 className={`font-semibold ${config.color}`}>
                {config.text}
              </h3>
              <p className="text-sm text-gray-400">
                {config.description}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {isProcessing && (
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            )}
            {status === 'available' && (
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Recommendations */}
      {enhancedRecommendations && (
        <div className="glass-effect rounded-xl p-6 border border-white/10">
          <div className="flex items-center space-x-3 mb-4">
            <Zap className="w-6 h-6 text-yellow-400" />
            <h3 className="text-lg font-semibold text-white">המלצות AI מתקדמות</h3>
          </div>
          
          <div className="space-y-4">
            {Object.entries(enhancedRecommendations).map(([category, recommendations]) => (
              <div key={category} className="space-y-2">
                <h4 className="font-medium text-white capitalize">{category}</h4>
                <div className="space-y-2">
                  {Array.isArray(recommendations) ? (
                    recommendations.map((rec, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span className="text-sm text-gray-300">{rec}</span>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{recommendations}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Summary */}
      {aiSummary && (
        <div className="glass-effect rounded-xl p-6 border border-white/10">
          <div className="flex items-center space-x-3 mb-4">
            <Brain className="w-6 h-6 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">סיכום AI</h3>
          </div>
          
          <div className="space-y-3">
            {Object.entries(aiSummary).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                <span className="text-sm text-gray-400 capitalize">{key}</span>
                <span className="text-sm text-white font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Features Info */}
      <div className="glass-effect rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">יכולות AI</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
            <Brain className="w-5 h-5 text-purple-400" />
            <div>
              <h4 className="font-medium text-white text-sm">ניתוח מתקדם</h4>
              <p className="text-xs text-gray-400">זיהוי כלי נגינה מדויק</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
            <Zap className="w-5 h-5 text-yellow-400" />
            <div>
              <h4 className="font-medium text-white text-sm">המלצות מותאמות</h4>
              <p className="text-xs text-gray-400">פלאגינים מותאמים אישית</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <div>
              <h4 className="font-medium text-white text-sm">איכות גבוהה</h4>
              <p className="text-xs text-gray-400">תוצאות ברמה מקצועית</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
            <Clock className="w-5 h-5 text-blue-400" />
            <div>
              <h4 className="font-medium text-white text-sm">עיבוד מהיר</h4>
              <p className="text-xs text-gray-400">תוצאות תוך דקות</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIStatusDisplay; 