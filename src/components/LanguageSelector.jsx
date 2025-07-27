import React, { useContext } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { LanguageContext } from '../App';

const LanguageSelector = () => {
  const { language, setLanguage } = useContext(LanguageContext);

  const languages = [
    { code: 'he', name: 'עברית', flag: '🇮🇱' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 space-x-reverse bg-studio-gray border border-gray-600 hover:border-studio-primary px-3 py-2 rounded-lg transition-colors">
        <Globe className="w-4 h-4 text-gray-400" />
        <span className="text-white text-sm">{currentLanguage?.flag}</span>
        <span className="text-white text-sm">{currentLanguage?.name}</span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>
      
      <div className="absolute top-full right-0 mt-2 bg-studio-gray border border-gray-600 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`flex items-center space-x-2 space-x-reverse w-full px-3 py-2 text-sm transition-colors ${
              language === lang.code
                ? 'bg-studio-primary text-white'
                : 'text-gray-300 hover:bg-studio-dark hover:text-white'
            }`}
          >
            <span>{lang.flag}</span>
            <span>{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector; 