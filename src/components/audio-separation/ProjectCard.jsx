import React from 'react';
import { Music, Calendar, Clock, Play, Trash2, Download } from 'lucide-react';

export default function ProjectCard({ project, onSelect, onDelete }) {
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('he-IL', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'תאריך לא ידוע';
    }
  };

  const getProjectStatus = (project) => {
    if (project.status === 'completed') {
      return { text: 'הושלם', color: 'text-green-400', bg: 'bg-green-500/10' };
    } else if (project.status === 'processing') {
      return { text: 'מעבד', color: 'text-yellow-400', bg: 'bg-yellow-500/10' };
    } else if (project.status === 'failed') {
      return { text: 'נכשל', color: 'text-red-400', bg: 'bg-red-500/10' };
    } else {
      return { text: 'לא ידוע', color: 'text-gray-400', bg: 'bg-gray-500/10' };
    }
  };

  const getStemsCount = (project) => {
    if (project.stems) {
      return Object.keys(project.stems).length;
    }
    return 0;
  };

  const status = getProjectStatus(project);

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-purple-500/50 transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <Music className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-lg truncate max-w-32">
              {project.name || 'פרויקט ללא שם'}
            </h3>
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${status.bg} ${status.color}`}>
              {status.text}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onSelect(project)}
            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            title="פתח פרויקט"
          >
            <Play className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => onDelete(project.id)}
            className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            title="מחק פרויקט"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Project Info */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">ערוצים מופרדים:</span>
          <span className="text-white font-medium">{getStemsCount(project)}/5</span>
        </div>
        
        {project.createdAt && (
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(project.createdAt)}</span>
          </div>
        )}
        
        {project.duration && (
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Clock className="w-4 h-4" />
            <span>{Math.round(project.duration)}s</span>
          </div>
        )}
      </div>

      {/* Stems Preview */}
      {project.stems && Object.keys(project.stems).length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-300">ערוצים זמינים:</h4>
          <div className="flex flex-wrap gap-2">
            {Object.keys(project.stems).map((stem) => (
              <span
                key={stem}
                className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full"
              >
                {stem === 'vocals' ? 'ווקאל' : 
                 stem === 'drums' ? 'תופים' : 
                 stem === 'bass' ? 'בס' : 
                 stem === 'guitar' ? 'גיטרה' : 
                 stem === 'other' ? 'אחר' : stem}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="mt-4 pt-3 border-t border-gray-700">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onSelect(project)}
            className="flex-1 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 mr-2"
          >
            פתח בסטודיו
          </button>
          
          {project.stems && Object.keys(project.stems).length > 0 && (
            <button
              onClick={() => {
                // הורדת כל הערוצים
                Object.keys(project.stems).forEach(stem => {
                  // כאן תהיה לוגיקה להורדת כל הערוצים
                });
              }}
              className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              title="הורד את כל הערוצים"
            >
              <Download className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 