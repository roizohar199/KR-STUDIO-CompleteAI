import React from 'react';
import { Play, Pause, Volume2, VolumeX, Download, Music, Mic, Volume1, Music2, Music3 } from 'lucide-react';

export default function TrackChannel({ 
  trackId, 
  trackData, 
  isPlaying, 
  volume, 
  isMuted, 
  onPlay, 
  onVolumeChange, 
  onMuteToggle, 
  onDownload 
}) {
  const getTrackIcon = (trackId) => {
    switch (trackId) {
      case 'vocals':
        return <Mic className="w-5 h-5 text-blue-400" />;
      case 'drums':
        return <Music2 className="w-5 h-5 text-green-400" />;
      case 'bass':
        return <Volume1 className="w-5 h-5 text-purple-400" />;
      case 'guitar':
        return <Music3 className="w-5 h-5 text-orange-400" />;
      case 'other':
        return <Music className="w-5 h-5 text-gray-400" />;
      default:
        return <Music className="w-5 h-5 text-gray-400" />;
    }
  };

  const getTrackName = (trackId) => {
    switch (trackId) {
      case 'vocals':
        return 'ווקאל';
      case 'drums':
        return 'תופים';
      case 'bass':
        return 'בס';
      case 'guitar':
        return 'גיטרה';
      case 'other':
        return 'אחר';
      default:
        return trackId;
    }
  };

  const getTrackColor = (trackId) => {
    switch (trackId) {
      case 'vocals':
        return 'border-blue-500 bg-blue-500/10';
      case 'drums':
        return 'border-green-500 bg-green-500/10';
      case 'bass':
        return 'border-purple-500 bg-purple-500/10';
      case 'guitar':
        return 'border-orange-500 bg-orange-500/10';
      case 'other':
        return 'border-gray-500 bg-gray-500/10';
      default:
        return 'border-gray-500 bg-gray-500/10';
    }
  };

  return (
    <div className={`border-2 rounded-lg p-4 ${getTrackColor(trackId)}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {getTrackIcon(trackId)}
          <div>
            <h3 className="font-semibold text-white">{getTrackName(trackId)}</h3>
            <p className="text-sm text-gray-400">
              {trackData?.duration ? `${Math.round(trackData.duration)}s` : 'טוען...'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Play/Pause Button */}
          <button
            onClick={onPlay}
            className={`p-2 rounded-lg transition-colors ${
              isPlaying 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          
          {/* Download Button */}
          <button
            onClick={onDownload}
            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            title="הורד ערוץ"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Volume Controls */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onMuteToggle}
          className={`p-2 rounded-lg transition-colors ${
            isMuted 
              ? 'bg-red-600 hover:bg-red-700 text-white' 
              : 'bg-gray-600 hover:bg-gray-700 text-white'
          }`}
          title={isMuted ? 'הפעל ערוץ' : 'השתק ערוץ'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
        
        <div className="flex-1">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            disabled={isMuted}
          />
        </div>
        
        <span className="text-sm text-gray-400 w-12 text-right">
          {Math.round(volume * 100)}%
        </span>
      </div>
      
      {/* Waveform Placeholder */}
      <div className="mt-4 h-16 bg-gray-800 rounded-lg flex items-center justify-center">
        <div className="text-gray-500 text-sm">גל אודיו</div>
      </div>
    </div>
  );
} 