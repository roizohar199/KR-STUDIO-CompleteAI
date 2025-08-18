import React from "react";
import { Upload, Music } from "lucide-react";

export default function EmptyState({ onUploadClick }) {
  return (
    <div className="text-center p-6 bg-gray-800/50 rounded-xl border border-gray-700">
      <Music className="w-12 h-12 text-gray-500 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-300 mb-2">אין פרויקטים עדיין</h3>
      <p className="text-gray-400 text-sm mb-4">
        התחל על ידי העלאת קובץ אודיו והפרדתו לערוצים
      </p>
      <button
        onClick={onUploadClick}
        className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-300 flex items-center gap-2 mx-auto"
      >
        <Upload className="w-4 h-4" />
        העלה קובץ אודיו
      </button>
    </div>
  );
} 