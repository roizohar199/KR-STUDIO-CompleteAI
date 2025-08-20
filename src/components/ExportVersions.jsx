import React, { useContext } from 'react';
import { BarChart3, Download, FileText, Music, Volume2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useTranslation } from '../lib/translations';

const ExportVersions = () => {
  const language = 'he'; // ברירת מחדל לעברית
  const t = useTranslation();

  const exportOptions = [
    {
      id: 'instrumental',
      title: language === 'he' ? 'גרסה אינסטרומנטלית' : 'Instrumental Version',
      description: language === 'he' 
        ? 'השיר ללא ערוץ השירה - מושלם לנגינה חיה או רמיקסים'
        : 'Song without vocal track - perfect for live performance or remixes',
      icon: Music,
      format: 'WAV',
      quality: '24-bit/48kHz'
    },
    {
      id: 'acapella',
      title: language === 'he' ? 'גרסת אקפלה' : 'Acapella Version',
      description: language === 'he'
        ? 'ערוץ השירה בלבד - אידיאלי לרמיקסים וקוברים'
        : 'Vocal track only - ideal for remixes and covers',
      icon: Volume2,
      format: 'WAV',
      quality: '24-bit/48kHz'
    },
    {
      id: 'radio-edit',
      title: language === 'he' ? 'עריכת רדיו' : 'Radio Edit',
      description: language === 'he'
        ? 'גרסה מקוצרת של 3-4 דקות המתאימה לשידור ברדיו'
        : 'Shortened version of 3-4 minutes suitable for radio broadcast',
      icon: BarChart3,
      format: 'MP3',
      quality: '320kbps'
    },
    {
      id: 'stems',
      title: language === 'he' ? 'קבצי STEMS' : 'STEMS Files',
      description: language === 'he'
        ? 'קבצים נפרדים לכל ערוץ - לשימוש מקצועי'
        : 'Separate files for each track - for professional use',
      icon: FileText,
      format: 'WAV',
      quality: '24-bit/48kHz'
    }
  ];

  const handleExport = (optionId) => {
    // כאן תהיה הלוגיקה לייצוא הקובץ
    console.log(`Exporting ${optionId} version`);
    
    // הדמיית ייצוא
    const button = document.querySelector(`[data-export="${optionId}"]`);
    if (button) {
      const originalText = button.textContent;
      button.textContent = language === 'he' ? 'מייצא...' : 'Exporting...';
      button.disabled = true;
      
      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        alert(language === 'he' 
          ? `הקובץ ${exportOptions.find(opt => opt.id === optionId)?.title} יוצא בהצלחה!`
          : `File ${exportOptions.find(opt => opt.id === optionId)?.title} exported successfully!`
        );
      }, 2000);
    }
  };

  return (
    <div className="flex-1 bg-studio-dark p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center mb-2">
          <BarChart3 className="w-8 h-8 text-white ml-3" />
          <h1 className="text-3xl font-bold text-white">
            {language === 'he' ? 'יצוא גרסאות' : 'Export Versions'}
          </h1>
        </div>
        <p className="text-gray-400 text-lg">
          {language === 'he' 
            ? 'ייצא גרסאות שונות של השיר בלחיצת כפתור'
            : 'Export different versions of your song with one click'
          }
        </p>
      </div>

      <div className="max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {exportOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <Card key={option.id} className="bg-studio-gray border-studio-gray hover:border-studio-primary transition-colors">
                <CardHeader>
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <IconComponent className="w-6 h-6 text-studio-primary" />
                    <CardTitle className="text-white">{option.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4">{option.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">{language === 'he' ? 'פורמט:' : 'Format:'}</span> {option.format}
                    </div>
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">{language === 'he' ? 'איכות:' : 'Quality:'}</span> {option.quality}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleExport(option.id)}
                    data-export={option.id}
                    className="w-full bg-studio-primary hover:bg-studio-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 space-x-reverse"
                  >
                    <Download className="w-4 h-4" />
                    <span>{language === 'he' ? 'ייצא' : 'Export'}</span>
                  </button>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* מידע נוסף */}
        <div className="mt-8">
          <Card className="bg-studio-gray border-studio-gray">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                {language === 'he' ? 'מידע על ייצוא' : 'Export Information'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-400">
                <div>
                  <h4 className="font-medium text-white mb-2">
                    {language === 'he' ? 'פורמטים נתמכים:' : 'Supported Formats:'}
                  </h4>
                  <ul className="space-y-1">
                    <li>• WAV - {language === 'he' ? 'איכות גבוהה ללא דחיסה' : 'High quality uncompressed'}</li>
                    <li>• MP3 - {language === 'he' ? 'גודל קטן, איכות טובה' : 'Small size, good quality'}</li>
                    <li>• FLAC - {language === 'he' ? 'דחיסה ללא אובדן' : 'Lossless compression'}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-2">
                    {language === 'he' ? 'איכויות זמינות:' : 'Available Qualities:'}
                  </h4>
                  <ul className="space-y-1">
                    <li>• 16-bit/44.1kHz - {language === 'he' ? 'איכות CD' : 'CD Quality'}</li>
                    <li>• 24-bit/48kHz - {language === 'he' ? 'איכות מקצועית' : 'Professional Quality'}</li>
                    <li>• 320kbps MP3 - {language === 'he' ? 'איכות גבוהה' : 'High Quality'}</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ExportVersions; 