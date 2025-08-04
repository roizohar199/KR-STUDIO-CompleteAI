import React from 'react';
import { Music, Calendar, Download, Play, Pause } from 'lucide-react';

const ProjectCard = ({ project, isSelected, onSelect, onPlay, isPlaying }) => {
  const trackCount = Object.keys(project.separatedTracks || {}).length;
  const createdAt = new Date(project.createdAt);
  
  const getTrackIcons = () => {
    const icons = [];
    if (project.separatedTracks?.vocals) icons.push('🎤');
    if (project.separatedTracks?.drums) icons.push('🥁');
    if (project.separatedTracks?.bass) icons.push('🎸');
    if (project.separatedTracks?.guitar) icons.push('🎸');
    if (project.separatedTracks?.other) icons.push('🎵');
    return icons;
  };

  return (
    <div
      className={`glass-effect rounded-xl p-4 border transition-all duration-300 cursor-pointer hover:scale-105 ${
        isSelected
          ? 'border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/20'
          : 'border-white/10 hover:border-purple-500/30'
      }`}
      onClick={onSelect}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-white text-lg mb-1 truncate">
            {project.name}
          </h3>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Calendar className="w-4 h-4" />
            <span>{createdAt.toLocaleDateString('he-IL')}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPlay();
            }}
            className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-110"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-white" />
            ) : (
              <Play className="w-4 h-4 text-white ml-0.5" />
            )}
          </button>
        </div>
      </div>

      {/* Track Icons */}
      <div className="flex items-center space-x-2 mb-3">
        {getTrackIcons().map((icon, index) => (
          <div
            key={index}
            className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center text-lg"
          >
            {icon}
          </div>
        ))}
        {trackCount > 0 && (
          <span className="text-sm text-gray-400">
            {trackCount} ערוצים
          </span>
        )}
      </div>

      {/* Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-400">הושלם</span>
        </div>
        
        <div className="flex items-center space-x-1">
          <Download className="w-4 h-4 text-gray-400" />
          <span className="text-xs text-gray-400">הורדה זמינה</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-3 w-full bg-gray-700 rounded-full h-1">
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-1 rounded-full" style={{ width: '100%' }}></div>
      </div>
    </div>
  );
};

export default ProjectCard; 