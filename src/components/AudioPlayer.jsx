import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Download, Volume2, VolumeX, SkipBack, SkipForward, RotateCcw } from 'lucide-react';

const AudioPlayer = ({ project, onProjectUpdate }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [masterVolume, setMasterVolume] = useState(75);
  const [trackVolumes, setTrackVolumes] = useState({
    vocals: 75,
    drums: 75,
    bass: 75,
    guitar: 75,
    other: 75
  });
  const [mutedTracks, setMutedTracks] = useState({});
  const [audioLoaded, setAudioLoaded] = useState(false);
  
  const audioContextRef = useRef(null);
  const audioBuffersRef = useRef({});
  const audioSourcesRef = useRef({});
  const startTimeRef = useRef(0);
  const intervalRef = useRef(null);

  const TRACK_TYPES = [
    { key: "vocals", name: "ווקאל", color: "from-pink-500 to-rose-500", icon: "🎤" },
    { key: "drums", name: "תופים", color: "from-red-500 to-orange-500", icon: "🥁" },
    { key: "bass", name: "בס", color: "from-purple-500 to-indigo-500", icon: "🎸" },
    { key: "guitar", name: "גיטרה", color: "from-green-500 to-emerald-500", icon: "🎸" },
    { key: "other", name: "אחר", color: "from-blue-500 to-cyan-500", icon: "🎵" }
  ];

  // Initialize audio context and load audio files
  useEffect(() => {
    const initAudio = async () => {
      try {
        setAudioLoaded(false);
        
        // Create audio context
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        
        const buffers = {};
        
        // Load audio files
        for (const track of TRACK_TYPES) {
          const trackUrl = project.separatedTracks[track.key];
          if (trackUrl) {
            try {
              const response = await fetch(`http://localhost:3001${trackUrl}`);
              const arrayBuffer = await response.arrayBuffer();
              const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
              buffers[track.key] = audioBuffer;
              
              // Set duration from first loaded track
              if (!duration) {
                setDuration(audioBuffer.duration);
              }
            } catch (error) {
              console.error(`Error loading ${track.key} audio:`, error);
            }
          }
        }
        
        audioBuffersRef.current = buffers;
        setAudioLoaded(true);
        
      } catch (error) {
        console.error('Error initializing audio:', error);
      }
    };
    
    if (project) {
      initAudio();
    }
    
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      clearInterval(intervalRef.current);
    };
  }, [project]);

  // Handle play/pause
  useEffect(() => {
    if (!audioLoaded || !audioContextRef.current) return;
    
    if (isPlaying) {
      startTimeRef.current = audioContextRef.current.currentTime - currentTime;
      
      intervalRef.current = setInterval(() => {
        if (audioContextRef.current) {
          setCurrentTime(audioContextRef.current.currentTime - startTimeRef.current);
        }
      }, 100);
    } else {
      clearInterval(intervalRef.current);
    }
    
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, audioLoaded, currentTime]);

  const togglePlayback = () => {
    if (!audioLoaded) return;
    
    if (isPlaying) {
      // Stop all sources
      Object.values(audioSourcesRef.current).forEach(source => {
        if (source) source.stop();
      });
      audioSourcesRef.current = {};
      setIsPlaying(false);
    } else {
      // Start all sources
      const sources = {};
      const now = audioContextRef.current.currentTime;
      
      TRACK_TYPES.forEach(track => {
        const buffer = audioBuffersRef.current[track.key];
        if (buffer && !mutedTracks[track.key]) {
          const source = audioContextRef.current.createBufferSource();
          const gainNode = audioContextRef.current.createGain();
          
          source.buffer = buffer;
          source.connect(gainNode);
          gainNode.connect(audioContextRef.current.destination);
          
          // Set volume
          const volume = trackVolumes[track.key] / 100;
          gainNode.gain.value = volume;
          
          source.start(now, currentTime);
          sources[track.key] = source;
        }
      });
      
      audioSourcesRef.current = sources;
      setIsPlaying(true);
    }
  };

  const handleTimeSeek = (value) => {
    if (!audioLoaded) return;
    
    const newTime = (value / 100) * duration;
    setCurrentTime(newTime);
    
    if (isPlaying) {
      // Restart playback from new position
      togglePlayback();
      setTimeout(() => togglePlayback(), 100);
    }
  };

  const handleTrackVolumeChange = (trackKey, volume) => {
    setTrackVolumes(prev => ({ ...prev, [trackKey]: volume }));
    
    // Update gain if playing
    if (isPlaying && audioSourcesRef.current[trackKey]) {
      const gainNode = audioSourcesRef.current[trackKey].gainNode;
      if (gainNode) {
        gainNode.gain.value = volume / 100;
      }
    }
  };

  const toggleTrackMute = (trackKey) => {
    setMutedTracks(prev => ({ ...prev, [trackKey]: !prev[trackKey] }));
    
    if (isPlaying) {
      // Restart playback to apply mute changes
      togglePlayback();
      setTimeout(() => togglePlayback(), 100);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const downloadTrack = async (trackKey) => {
    try {
      const trackUrl = project.separatedTracks[trackKey];
      if (trackUrl) {
        const response = await fetch(`http://localhost:3001${trackUrl}`);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${project.name}_${trackKey}.wav`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error downloading track:', error);
    }
  };

  if (!project) {
    return (
      <div className="glass-effect rounded-2xl p-8 text-center">
        <div className="text-6xl mb-4">🎵</div>
        <h3 className="text-xl font-semibold text-white mb-2">בחר פרויקט</h3>
        <p className="text-gray-400">בחר פרויקט מהרשימה כדי להתחיל לנגן</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-effect rounded-2xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-white">{project.name}</h2>
            <p className="text-gray-400 text-sm">
              {new Date(project.createdAt).toLocaleDateString('he-IL')}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentTime(0)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
              title="חזור להתחלה"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Waveform Placeholder */}
        <div className="w-full h-16 bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
          <div className="flex space-x-1">
            {Array.from({ length: 100 }).map((_, i) => (
              <div
                key={i}
                className="w-1 bg-gray-600 rounded"
                style={{ 
                  height: `${Math.random() * 30 + 5}px`,
                  opacity: isPlaying ? 0.8 : 0.5
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Master Controls */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={togglePlayback}
            disabled={!audioLoaded}
            className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-white" />
            ) : (
              <Play className="w-6 h-6 text-white ml-1" />
            )}
          </button>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">{formatTime(currentTime)}</span>
              <span className="text-sm text-gray-400">{formatTime(duration)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={(currentTime / duration) * 100 || 0}
              onChange={(e) => handleTimeSeek(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${(currentTime / duration) * 100 || 0}%, #374151 ${(currentTime / duration) * 100 || 0}%, #374151 100%)`
              }}
            />
          </div>
        </div>

        {/* Master Volume */}
        <div className="flex items-center space-x-3">
          <Volume2 className="w-5 h-5 text-gray-400" />
          <input
            type="range"
            min="0"
            max="100"
            value={masterVolume}
            onChange={(e) => setMasterVolume(parseFloat(e.target.value))}
            className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${masterVolume}%, #374151 ${masterVolume}%, #374151 100%)`
            }}
          />
          <span className="text-sm text-gray-400 w-12">{masterVolume}%</span>
        </div>
      </div>

      {/* Individual Tracks */}
      <div className="glass-effect rounded-2xl p-6 border border-white/10">
        <h3 className="text-xl font-semibold text-white mb-6">ערוצים מופרדים</h3>
        
        <div className="space-y-4">
          {TRACK_TYPES.map((track) => {
            const isMuted = mutedTracks[track.key];
            const volume = trackVolumes[track.key];
            const hasTrack = project.separatedTracks[track.key];
            
            if (!hasTrack) return null;
            
            return (
              <div key={track.key} className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-lg border border-white/5">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-r ${track.color}`}>
                  <span className="text-2xl">{track.icon}</span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-white">{track.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-400">{volume}%</span>
                      <button
                        onClick={() => toggleTrackMute(track.key)}
                        className={`p-1 rounded transition-colors ${
                          isMuted 
                            ? 'bg-red-500/20 text-red-400' 
                            : 'bg-gray-600/50 text-gray-400 hover:text-white'
                        }`}
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => downloadTrack(track.key)}
                        className="p-1 text-gray-400 hover:text-white transition-colors"
                        title="הורד ערוץ"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => handleTrackVolumeChange(track.key, parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, ${track.color.split(' ')[1]} 0%, ${track.color.split(' ')[1]} ${isMuted ? 0 : volume}%, #374151 ${isMuted ? 0 : volume}%, #374151 100%)`
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer; 