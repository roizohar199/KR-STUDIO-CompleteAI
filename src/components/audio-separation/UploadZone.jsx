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

    // Validate file size (50MB max)
    const maxSize = 50 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('הקובץ גדול מדי. גודל מקסימלי: 50MB');
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
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto">
            <Upload className="w-8 h-8 text-white" />
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              העלה קובץ אודיו
            </h3>
            <p className="text-gray-400">
              גרור וזרוק קובץ אודיו לכאן, או לחץ לבחירה
            </p>
          </div>
          
          <div className="text-sm text-gray-500 space-y-1">
            <p>קבצים נתמכים: MP3, WAV, FLAC, M4A, OGG</p>
            <p>גודל מקסימלי: 50MB</p>
          </div>
        </div>
      </div>

      {/* Selected File Info */}
      {selectedFile && (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <FileAudio className="w-8 h-8 text-blue-400" />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-white truncate">{selectedFile.name}</h4>
              <p className="text-sm text-gray-400">
                {formatFileSize(selectedFile.size)} • {selectedFile.type}
              </p>
            </div>
            <div className="text-green-400 text-sm font-medium">נבחר</div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
        <h4 className="font-medium text-blue-200 mb-2">איך זה עובד?</h4>
        <ol className="text-blue-200 text-sm space-y-1 list-decimal list-inside">
          <li>העלה קובץ אודיו (שיר, הקלטה, או כל קובץ אודיו אחר)</li>
          <li>המערכת תנתח את האודיו ותפריד אותו ל-5 ערוצים נפרדים</li>
          <li>קבל גישה לכל ערוץ בנפרד: ווקאל, תופים, בס, גיטרה ואחר</li>
          <li>הורד כל ערוץ בנפרד או ערבב אותם מחדש בסטודיו</li>
        </ol>
      </div>

      {/* Tips */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
        <h4 className="font-medium text-white mb-2">טיפים לאודיו איכותי</h4>
        <ul className="text-gray-300 text-sm space-y-1">
          <li>• השתמש בקבצי אודיו באיכות גבוהה (320kbps MP3 או WAV)</li>
          <li>• הימנע מקבצים עם רעש רקע מוגזם</li>
          <li>• אורך אופטימלי: 1-10 דקות</li>
          <li>• תהליך ההפרדה לוקח 2-5 דקות בהתאם לאורך הקובץ</li>
        </ul>
      </div>
    </div>
  );
} 