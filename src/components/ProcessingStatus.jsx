import React from 'react';
import { Music, CheckCircle, AlertCircle, Clock } from 'lucide-react';

const ProcessingStatus = ({ step, progress, error }) => {
  const getStepIcon = (stepName) => {
    switch (stepName) {
      case 'uploading':
        return <Music className="w-6 h-6" />;
      case 'processing':
        return <Clock className="w-6 h-6" />;
      case 'completed':
        return <CheckCircle className="w-6 h-6" />;
      case 'error':
        return <AlertCircle className="w-6 h-6" />;
      default:
        return <Music className="w-6 h-6" />;
    }
  };

  const getStepColor = (stepName) => {
    switch (stepName) {
      case 'uploading':
        return 'from-blue-500 to-cyan-500';
      case 'processing':
        return 'from-purple-500 to-pink-500';
      case 'completed':
        return 'from-green-500 to-emerald-500';
      case 'error':
        return 'from-red-500 to-rose-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getStepText = (stepName) => {
    switch (stepName) {
      case 'uploading':
        return 'מעלה קובץ...';
      case 'processing':
        return 'מעבד עם AI...';
      case 'completed':
        return 'הושלם בהצלחה!';
      case 'error':
        return 'שגיאה בעיבוד';
      default:
        return 'מעבד...';
    }
  };

  if (error) {
    return (
      <div className="glass-effect rounded-2xl p-8 border border-red-500/30">
        <div className="text-center">
          <div className={`w-16 h-16 bg-gradient-to-r from-red-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4`}>
            <AlertCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-semibold text-white mb-2">שגיאה בעיבוד</h2>
          <p className="text-red-400 mb-6">{error}</p>
          <button className="bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg py-2 px-4 text-sm hover:bg-red-500/30 transition-colors">
            נסה שוב
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-effect rounded-2xl p-8 border border-white/10">
      <div className="text-center">
        {/* Animated Icon */}
        <div className={`w-16 h-16 bg-gradient-to-r ${getStepColor(step)} rounded-full flex items-center justify-center mx-auto mb-4 ${
          step === 'processing' ? 'animate-spin' : ''
        }`}>
          {getStepIcon(step)}
        </div>
        
        {/* Status Text */}
        <h2 className="text-2xl font-semibold text-white mb-2">
          {getStepText(step)}
        </h2>
        
        {/* Progress Bar */}
        {step === 'processing' && (
          <div className="mb-6">
            <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
              <div 
                className={`bg-gradient-to-r ${getStepColor(step)} h-3 rounded-full transition-all duration-300`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-400">{Math.round(progress)}% הושלם</p>
          </div>
        )}
        
        {/* Step Description */}
        <div className="space-y-3">
          {step === 'uploading' && (
            <p className="text-gray-400">מעלה את הקובץ לשרת...</p>
          )}
          {step === 'processing' && (
            <div className="space-y-2">
              <p className="text-gray-400">מפריד את האודיו ל-5 כלי נגינה</p>
              <div className="flex justify-center space-x-2">
                {['🎤', '🥁', '🎸', '🎸', '🎵'].map((icon, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center text-lg animate-pulse"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    {icon}
                  </div>
                ))}
              </div>
            </div>
          )}
          {step === 'completed' && (
            <div className="space-y-2">
              <p className="text-green-400">האודיו הופרד בהצלחה!</p>
              <div className="flex justify-center space-x-2">
                {['🎤', '🥁', '🎸', '🎸', '🎵'].map((icon, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center text-lg"
                  >
                    {icon}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Estimated Time */}
        {step === 'processing' && (
          <div className="mt-6 p-3 bg-gray-800/50 rounded-lg">
            <p className="text-sm text-gray-400">
              זמן משוער: 2-5 דקות
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcessingStatus; 