import React, { useEffect, useRef } from 'react';

const WaveformVisualizer = ({ 
  audioData, 
  isPlaying, 
  currentTime = 0, 
  duration = 1,
  height = 80,
  color = '#8b5cf6'
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Generate waveform data if not provided
    const waveformData = audioData || generateMockWaveform(width);

    // Draw waveform
    drawWaveform(ctx, waveformData, width, height, color, currentTime, duration, isPlaying);

    // Animate if playing
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(() => {
        // Update animation
      });
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [audioData, isPlaying, currentTime, duration, color]);

  const generateMockWaveform = (width) => {
    const data = [];
    for (let i = 0; i < width; i++) {
      data.push(Math.random() * 0.8 + 0.2);
    }
    return data;
  };

  const drawWaveform = (ctx, data, width, height, color, currentTime, duration, isPlaying) => {
    const centerY = height / 2;
    const barWidth = Math.max(1, width / data.length);
    const progress = currentTime / duration;

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    data.forEach((value, index) => {
      const x = index * barWidth;
      const barHeight = value * (height * 0.6);
      const isActive = index / data.length < progress;

      // Background bar
      ctx.fillStyle = isActive ? color + '40' : '#374151';
      ctx.fillRect(x, centerY - barHeight / 2, barWidth - 1, barHeight);

      // Active indicator
      if (isActive) {
        ctx.fillStyle = color;
        ctx.fillRect(x, centerY - barHeight / 2, barWidth - 1, barHeight);
      }

      // Playing animation
      if (isPlaying && isActive) {
        const pulseIntensity = Math.sin(Date.now() * 0.01 + index * 0.1) * 0.3 + 0.7;
        ctx.fillStyle = color + Math.floor(pulseIntensity * 255).toString(16).padStart(2, '0');
        ctx.fillRect(x, centerY - barHeight / 2, barWidth - 1, barHeight);
      }
    });

    // Progress line
    const progressX = progress * width;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(progressX, 0);
    ctx.lineTo(progressX, height);
    ctx.stroke();

    // Time indicators
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    
    // Current time
    const currentTimeText = formatTime(currentTime);
    ctx.fillText(currentTimeText, 40, height - 10);
    
    // Total duration
    const durationText = formatTime(duration);
    ctx.fillText(durationText, width - 40, height - 10);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={800}
        height={height}
        className="w-full h-full rounded-lg"
        style={{ 
          background: 'linear-gradient(to bottom, #1f2937, #111827)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      />
      
      {/* Overlay for better visual appeal */}
      <div className="absolute inset-0 rounded-lg pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
      </div>
    </div>
  );
};

export default WaveformVisualizer; 