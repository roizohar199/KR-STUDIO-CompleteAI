import React from "react";
import { Volume2, VolumeX, Download, Play, Pause } from "lucide-react";

const getTrackColor = (trackKey) => {
  const colors = {
    vocals: "from-pink-500 to-rose-500",
    drums: "from-red-500 to-orange-500",
    bass: "from-purple-500 to-indigo-500",
    guitar: "from-green-500 to-emerald-500",
    other: "from-blue-500 to-cyan-500"
  };
  return colors[trackKey] || "from-gray-500 to-gray-600";
};

const getTrackIcon = (trackKey) => {
  const icons = {
    vocals: "🎤",
    drums: "🥁",
    bass: "🎸",
    guitar: "🎸",
    other: "🎵"
  };
  return icons[trackKey] || "🎵";
};

export default function TrackChannel({ 
  track, 
  volume, 
  isMuted, 
  onVolumeChange, 
  onToggleMute, 
  onTogglePlay,
  onDownload, 
  isPlaying
}) {
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    onVolumeChange(newVolume);
  };

  return (
    <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 hover:border-purple-500/30 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 bg-gradient-to-r ${getTrackColor(track.key)} rounded-lg flex items-center justify-center text-white text-lg`}>
            {getTrackIcon(track.key)}
          </div>
          <div>
            <h4 className="text-white font-medium">{track.name}</h4>
            <p className="text-gray-400 text-sm">
              {isMuted ? "Muted" : `${Math.round(volume)}%`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Play/Pause Button */}
          <button
            onClick={onTogglePlay}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
              isPlaying 
                ? 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700' 
                : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
            }`}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-white" />
            ) : (
              <Play className="w-4 h-4 text-white ml-0.5" />
            )}
          </button>

          {/* Mute/Unmute Button */}
          <button
            onClick={onToggleMute}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
              isMuted 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-white" />
            ) : (
              <Volume2 className="w-4 h-4 text-gray-300" />
            )}
          </button>

          {/* Volume Slider */}
          <div className="flex items-center gap-2 min-w-[120px]">
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, ${getTrackColor(track.key).split(' ')[1]} 0%, ${getTrackColor(track.key).split(' ')[1]} ${isMuted ? 0 : volume}%, #374151 ${isMuted ? 0 : volume}%, #374151 100%)`
              }}
            />
          </div>

          {/* Export Button */}
          <button
            onClick={onDownload}
            className="px-3 py-1 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-1 text-sm"
          >
            <Download className="w-3 h-3" />
            Export
          </button>
        </div>
      </div>
    </div>
  );
} 