import React from 'react';
import { Volume2, VolumeX, Play, Pause, Download } from 'lucide-react';

const TrackChannel = ({ 
  track, 
  volume, 
  isMuted, 
  isPlaying, 
  onVolumeChange, 
  onMuteToggle, 
  onPlayToggle, 
  onDownload 
}) => {
  const getTrackColor = (trackKey) => {
    const colors = {
      vocals: 'from-pink-500 to-rose-500',
      drums: 'from-red-500 to-orange-500',
      bass: 'from-purple-500 to-indigo-500',
      guitar: 'from-green-500 to-emerald-500',
      other: 'from-blue-500 to-cyan-500'
    };
    return colors[trackKey] || 'from-gray-500 to-gray-600';
  };

  const getTrackIcon = (trackKey) => {
    const icons = {
      vocals: '🎤',
      drums: '🥁',
      bass: '🎸',
      guitar: '🎸',
      other: '🎵'
    };
    return icons[trackKey] || '🎵';
  };

  const getTrackName = (trackKey) => {
    const names = {
      vocals: 'ווקאל',
      drums: 'תופים',
      bass: 'בס',
      guitar: 'גיטרה',
      other: 'אחר'
    };
    return names[trackKey] || trackKey;
  };

  return (
    <div className="glass-effect rounded-xl p-4 border border-white/10 hover:border-purple-500/30 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-r ${getTrackColor(track.key)}`}>
            <span className="text-lg">{getTrackIcon(track.key)}</span>
          </div>
          <div>
            <h3 className="font-semibold text-white">{getTrackName(track.key)}</h3>
            <p className="text-sm text-gray-400">{volume}%</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Play/Pause Button */}
          <button
            onClick={onPlayToggle}
            className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-110"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-white" />
            ) : (
              <Play className="w-4 h-4 text-white ml-0.5" />
            )}
          </button>
          
          {/* Mute Button */}
          <button
            onClick={onMuteToggle}
            className={`p-2 rounded-lg transition-all duration-300 ${
              isMuted 
                ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                : 'bg-gray-600/50 text-gray-400 hover:text-white hover:bg-gray-600'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          
          {/* Download Button */}
          <button
            onClick={onDownload}
            className="p-2 text-gray-400 hover:text-white transition-colors"
            title="הורד ערוץ"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Volume Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Volume2 className="w-4 h-4 text-gray-400" />
          <span className="text-xs text-gray-400">
            {isMuted ? '0%' : `${volume}%`}
          </span>
        </div>
        
        <input
          type="range"
          min="0"
          max="100"
          value={isMuted ? 0 : volume}
          onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, ${getTrackColor(track.key).split(' ')[1]} 0%, ${getTrackColor(track.key).split(' ')[1]} ${isMuted ? 0 : volume}%, #374151 ${isMuted ? 0 : volume}%, #374151 100%)`
          }}
        />
      </div>

      {/* Status Indicator */}
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isMuted ? 'bg-red-400' : 'bg-green-400 animate-pulse'}`}></div>
          <span className={`text-xs ${isMuted ? 'text-red-400' : 'text-green-400'}`}>
            {isMuted ? 'מושתק' : 'פעיל'}
          </span>
        </div>
        
        {isPlaying && (
          <div className="flex items-center space-x-1">
            <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
            <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackChannel; 