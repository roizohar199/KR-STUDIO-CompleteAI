import React, { useState, useRef } from "react";
import { Upload, FileAudio, AlertCircle, WifiOff } from "lucide-react";

export default function UploadZone({ onFileSelect, onDrop, disabled = false }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    if (disabled) return;
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    if (disabled) return;
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    if (disabled) return;
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      handleFileSelect(file);
    }
  };

  const handleFileInput = (e) => {
    if (disabled) return;
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleFileSelect = (file) => {
    if (disabled) return;
    
    // Validate file type
    const allowedTypes = [
      'audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/wave', 
      'audio/x-wav', 'audio/flac', 'audio/x-flac', 
      'audio/m4a', 'audio/x-m4a', 'audio/ogg', 'audio/x-ogg'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      alert('אנא בחר קובץ אודיו תקין (MP3, WAV, FLAC, M4A, OGG)');
      return;
    }

    // Validate file size (100MB max)
    const maxSize = 100 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('הקובץ גדול מדי. גודל מקסימלי: 100MB');
      return;
    }

    setSelectedFile(file);
    onFileSelect(file);
  };

  const handleClick = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
          disabled 
            ? 'border-gray-500 bg-gray-800/50 cursor-not-allowed opacity-50'
            : isDragOver
            ? 'border-purple-500 bg-purple-500/10 cursor-pointer'
            : 'border-gray-600 hover:border-purple-500 hover:bg-gray-800/50 cursor-pointer'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          onChange={handleFileInput}
          className="hidden"
          disabled={disabled}
        />
        
        <div className="space-y-4">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
            disabled 
              ? 'bg-gray-600' 
              : 'bg-gradient-to-r from-purple-500 to-blue-500'
          }`}>
            {disabled ? (
              <WifiOff className="w-8 h-8 text-gray-400" />
            ) : (
              <Upload className="w-8 h-8 text-white" />
            )}
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {disabled 
                ? 'שרת לא מחובר' 
                : selectedFile 
                ? 'File Selected' 
                : 'Upload Audio File'
              }
            </h3>
            <p className="text-gray-400 mb-4">
              {disabled 
                ? 'אנא המתן לחיבור לשרת' 
                : selectedFile 
                ? 'File ready for processing' 
                : 'Drag and drop or click to select'
              }
            </p>
          </div>

          {selectedFile && !disabled && (
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <FileAudio className="w-6 h-6 text-green-400" />
                <div className="flex-1">
                  <p className="text-white font-medium">{selectedFile.name}</p>
                  <p className="text-green-400 text-sm">{formatFileSize(selectedFile.size)}</p>
                </div>
              </div>
            </div>
          )}

          {!selectedFile && !disabled && (
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Supported formats: MP3, WAV, FLAC, M4A, OGG</p>
              <p className="text-sm text-gray-500">Max size: 100MB</p>
            </div>
          )}
        </div>
      </div>

      {selectedFile && !disabled && (
        <div className="flex items-center justify-between bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-blue-400" />
            <div>
              <p className="text-white font-medium">File ready for processing</p>
              <p className="text-blue-400 text-sm">Click "Start Separation" to begin</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 