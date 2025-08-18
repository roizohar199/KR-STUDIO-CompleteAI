import React from 'react';
import { Music, Upload, FileAudio } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="text-center py-12">
      <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
        <Music className="w-12 h-12 text-gray-400" />
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-3">
        אין ערוצי אודיו זמינים
      </h3>
      
      <p className="text-gray-400 mb-6 max-w-md mx-auto">
        עדיין לא הופרדו ערוצי אודיו לפרויקט זה. אנא המתן לסיום התהליך או צור פרויקט חדש.
      </p>
      
      <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
        <div className="flex items-center space-x-2">
          <FileAudio className="w-4 h-4" />
          <span>ווקאל</span>
        </div>
        <div className="flex items-center space-x-2">
          <FileAudio className="w-4 h-4" />
          <span>תופים</span>
        </div>
        <div className="flex items-center space-x-2">
          <FileAudio className="w-4 h-4" />
          <span>בס</span>
        </div>
        <div className="flex items-center space-x-2">
          <FileAudio className="w-4 h-4" />
          <span>גיטרה</span>
        </div>
        <div className="flex items-center space-x-2">
          <FileAudio className="w-4 h-4" />
          <span>אחר</span>
        </div>
      </div>
    </div>
  );
} 