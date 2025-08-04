import React from "react";
import { Play, Pause, Calendar, Music, Clock, CheckCircle } from "lucide-react";

export default function ProjectCard({ project, isSelected, onSelect, isPlaying }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  const formatDuration = (seconds) => {
    if (!seconds) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className={`rounded-xl p-4 border transition-all duration-300 cursor-pointer hover:scale-105 ${
        isSelected
          ? 'border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/20'
          : 'border-gray-700 bg-gray-800/50 hover:border-purple-500/30 hover:bg-gray-800/70'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-start gap-3">
        {/* Music Icon */}
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <Music className="w-5 h-5 text-white" />
        </div>
        
        {/* Project Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-medium text-sm mb-1 truncate">{project.name}</h3>
          
          {/* Status */}
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1 text-green-400 text-xs">
              <CheckCircle className="w-3 h-3" />
              <span>completed</span>
            </div>
          </div>
          
          {/* Date and Duration */}
          <div className="flex items-center gap-4 text-gray-400 text-xs">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(project.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>Duration: {formatDuration(project.duration)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 