import React from 'react';
import { Music, Upload, Play, Download } from 'lucide-react';

const EmptyState = () => {
  return (
    <div className="glass-effect rounded-2xl p-12 text-center border border-white/10">
      <div className="max-w-md mx-auto">
        {/* Icon */}
        <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Music className="w-10 h-10 text-white" />
        </div>
        
        {/* Title */}
        <h2 className="text-2xl font-bold text-white mb-4">
          אין פרויקטים עדיין
        </h2>
        
        {/* Description */}
        <p className="text-gray-400 mb-8 leading-relaxed">
          התחל על ידי העלאת קובץ אודיו והפרדת אותו ל-5 כלי נגינה נפרדים עם AI מתקדם
        </p>
        
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
            <Upload className="w-5 h-5 text-purple-400" />
            <span className="text-sm text-gray-300">העלאת קבצים</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
            <Play className="w-5 h-5 text-blue-400" />
            <span className="text-sm text-gray-300">נגינה מתקדמת</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
            <Download className="w-5 h-5 text-green-400" />
            <span className="text-sm text-gray-300">הורדת קבצים</span>
          </div>
        </div>
        
        {/* CTA Button */}
        <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
          <Upload className="w-5 h-5 inline mr-2" />
          התחל פרויקט חדש
        </button>
        
        {/* Supported Formats */}
        <div className="mt-8">
          <p className="text-sm text-gray-500 mb-3">פורמטים נתמכים:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['MP3', 'WAV', 'FLAC', 'M4A', 'OGG'].map((format) => (
              <span
                key={format}
                className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded-full"
              >
                {format}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState; 