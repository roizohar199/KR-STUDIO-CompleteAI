import React, { useRef } from 'react';
import { Upload, Music, FileAudio, X } from 'lucide-react';

const UploadZone = ({ 
  onFileSelect, 
  onDrop, 
  uploadedFile, 
  onRemoveFile,
  isDragOver = false 
}) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType) => {
    if (fileType.includes('audio')) {
      return <Music className="w-8 h-8 text-purple-400" />;
    }
    return <FileAudio className="w-8 h-8 text-gray-400" />;
  };

  return (
    <div className="space-y-4">
      {/* Upload Zone */}
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer ${
          isDragOver
            ? 'border-purple-500 bg-purple-500/10'
            : 'border-gray-600 hover:border-purple-500 hover:bg-gray-800/50'
        }`}
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={(e) => e.preventDefault()}
        onDragLeave={(e) => e.preventDefault()}
        onClick={handleClick}
      >
        {!uploadedFile ? (
          <>
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              גרור קובץ לכאן או לחץ לבחירה
            </h3>
            <p className="text-gray-400 mb-4">
              תמיכה בפורמטים: MP3, WAV, FLAC, M4A, OGG
            </p>
            <p className="text-sm text-gray-500">
              גודל מקסימלי: 100MB
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              onChange={handleFileInput}
              className="hidden"
            />
          </>
        ) : (
          <div className="flex items-center justify-center space-x-4">
            {getFileIcon(uploadedFile.type)}
            <div className="text-left">
              <h3 className="text-lg font-semibold text-white">
                {uploadedFile.name}
              </h3>
              <p className="text-gray-400 text-sm">
                {formatFileSize(uploadedFile.size)}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemoveFile();
              }}
              className="p-2 text-gray-400 hover:text-red-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* File Info */}
      {uploadedFile && (
        <div className="glass-effect rounded-lg p-4 border border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getFileIcon(uploadedFile.type)}
              <div>
                <h4 className="font-semibold text-white">{uploadedFile.name}</h4>
                <p className="text-sm text-gray-400">
                  {formatFileSize(uploadedFile.size)} • {uploadedFile.type}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-400">מוכן לעיבוד</span>
            </div>
          </div>
        </div>
      )}

      {/* Supported Formats Info */}
      <div className="bg-gray-800/50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-white mb-3">פורמטים נתמכים:</h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {[
            { format: 'MP3', desc: 'נפוץ וקטן' },
            { format: 'WAV', desc: 'איכות גבוהה' },
            { format: 'FLAC', desc: 'ללא דחיסה' },
            { format: 'M4A', desc: 'Apple' },
            { format: 'OGG', desc: 'חופשי' }
          ].map((item) => (
            <div key={item.format} className="text-center p-2 bg-gray-700/50 rounded">
              <div className="font-medium text-white text-sm">{item.format}</div>
              <div className="text-xs text-gray-400">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadZone; 