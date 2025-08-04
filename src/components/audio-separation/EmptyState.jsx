import React from "react";
import { Upload, Music, Mic, CircleDot, Zap } from "lucide-react";

export default function EmptyState({ onUploadClick }) {
  const features = [
    { icon: Mic, title: "Vocals", description: "Clear voice separation" },
    { icon: CircleDot, title: "Drums", description: "Precise rhythm" },
    { icon: Zap, title: "Bass", description: "Depth and sound" },
    { icon: Zap, title: "Guitar", description: "Pure melody" },
    { icon: Music, title: "Other", description: "Additional instruments" }
  ];

  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
        <Music className="w-8 h-8 text-white" />
      </div>
      
      <h2 className="text-lg font-semibold text-white mb-2">No projects yet</h2>
      <p className="text-gray-400 text-sm mb-6">
        Start a new project to separate your music into 5 individual tracks
      </p>

      <button 
        onClick={onUploadClick}
        className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 text-sm"
      >
        <Upload className="w-4 h-4 inline mr-2" />
        New Project
      </button>

      <div className="mt-6">
        <h3 className="text-sm font-semibold text-white mb-4">What you can do</h3>
        <div className="grid grid-cols-5 gap-2">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-3 border border-gray-700">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                <feature.icon className="w-4 h-4 text-white" />
              </div>
              <h4 className="text-white font-medium text-xs mb-1">{feature.title}</h4>
              <p className="text-gray-400 text-xs">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-500">
        <p>Supported: MP3, WAV, FLAC, M4A, OGG</p>
        <p>Max size: 100MB</p>
      </div>
    </div>
  );
} 