import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Download, Volume2, VolumeX } from "lucide-react";
import TrackChannel from "./TrackChannel";

const TRACK_TYPES = [
  { key: "vocals", name: "Vocals" },
  { key: "drums", name: "Drums" },
  { key: "bass", name: "Bass" },
  { key: "guitar", name: "Guitar" },
  { key: "other", name: "Other" }
];

export default function AudioPlayer({ 
  project, 
  audioFiles, 
  volumeLevels, 
  mutedTracks, 
  playingTrack, 
  onVolumeChange, 
  onToggleMute, 
  onTogglePlay, 
  onMasterPlay, 
  onDownload 
}) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [masterVolume, setMasterVolume] = useState(75);
  
  const audioContextRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    // קביעת משך האודיו מהקובץ הראשון הזמין
    const firstAudio = Object.values(audioFiles)[0];
    if (firstAudio) {
      firstAudio.addEventListener('loadedmetadata', () => {
        setDuration(firstAudio.duration);
      });
    }
    
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [audioFiles]);

  useEffect(() => {
    if (playingTrack === 'master') {
      intervalRef.current = setInterval(() => {
        const firstAudio = Object.values(audioFiles)[0];
        if (firstAudio) {
          setCurrentTime(firstAudio.currentTime);
          
          if (firstAudio.ended) {
            onMasterPlay(); // עצירת master
          }
        }
      }, 100);
    } else {
      clearInterval(intervalRef.current);
    }
    
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [playingTrack, audioFiles, onMasterPlay]);



  const togglePlayback = () => {
    onMasterPlay();
  };

  const handleTimeSeek = (value) => {
    const newTime = value;
    setCurrentTime(newTime);
    
    // עדכון הזמן בכל קבצי האודיו
    Object.values(audioFiles).forEach(audio => {
      if (audio) {
        audio.currentTime = newTime;
      }
    });
  };

  const handleMasterVolumeChange = (value) => {
    setMasterVolume(value);
    
    // עדכון הווליום של כל הערוצים
    Object.keys(audioFiles).forEach(trackKey => {
      const audio = audioFiles[trackKey];
      if (audio) {
        const trackVolume = volumeLevels[trackKey] || 1;
        const isMuted = mutedTracks[trackKey];
        const finalVolume = isMuted ? 0 : (trackVolume * value) / 100;
        audio.volume = finalVolume;
      }
    });
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const downloadTrack = async (trackKey) => {
    onDownload(trackKey);
  };

  return (
    <div className="space-y-6">
      {/* Main Audio Player */}
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">{project.name}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
          </div>
        </div>
        
        {/* Waveform Placeholder */}
        <div className="mb-6">
          <div className="w-full h-16 bg-gray-800 rounded-lg flex items-center justify-center">
            <div className="flex items-center gap-1">
              {Array.from({ length: 50 }, (_, i) => (
                <div
                  key={i}
                  className="w-1 bg-gray-600 rounded-full"
                  style={{
                    height: `${Math.random() * 40 + 10}px`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Playback Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlayback}
              className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 shadow-lg flex items-center justify-center transition-all duration-300"
            >
              {playingTrack === 'master' ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 ml-1 text-white" />}
            </button>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleMasterVolumeChange(masterVolume > 0 ? 0 : 75)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {masterVolume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <input
                type="range"
                value={masterVolume}
                onChange={(e) => handleMasterVolumeChange(parseFloat(e.target.value))}
                max={100}
                className="w-24 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>

          <div className="text-sm text-gray-400">
            Master Volume: {masterVolume}%
          </div>
        </div>
      </div>

      {/* Individual Tracks */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Individual Tracks</h3>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {TRACK_TYPES.map((track) => (
            <TrackChannel
              key={track.key}
              track={track}
              volume={volumeLevels[track.key] ? volumeLevels[track.key] * 100 : 75}
              isMuted={mutedTracks[track.key]}
              onVolumeChange={(volume) => onVolumeChange(track.key, volume / 100)}
              onToggleMute={() => onToggleMute(track.key)}
              onTogglePlay={() => onTogglePlay(track.key)}
              onDownload={() => downloadTrack(track.key)}
              isPlaying={playingTrack === track.key}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 