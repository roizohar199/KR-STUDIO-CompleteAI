import React, { useState, useRef } from 'react';
import { Mic, Upload, FileText, Play, Pause, Volume2, Zap } from 'lucide-react';

const VocalAnalysis = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setAudioUrl(URL.createObjectURL(file));
      setAnalysisResults(null);
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && (file.type.includes('audio') || file.name.match(/\.(wav|mp3|flac)$/i))) {
      setSelectedFile(file);
      setAudioUrl(URL.createObjectURL(file));
      setAnalysisResults(null);
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const startAnalysis = async () => {
    if (!selectedFile) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockResults = {
        vocalRange: {
          lowest: 'C3',
          highest: 'A4',
          range: 'אוקטבה וחצי',
          confidence: 92,
          songKey: 'C Major',
          keyConfidence: 89,
          suggestedKeys: ['C Major', 'G Major', 'F Major'],
          vocalType: 'טנור',
          tessitura: 'C3 - E4'
        },
        pitchAnalysis: {
          accuracy: 87,
          stability: 78,
          issues: ['חוסר יציבות בפיץ\' גבוה', 'ויברטו לא אחיד']
        },
        emotionAnalysis: {
          primary: 'תשוקה',
          secondary: 'עוצמה',
          intensity: 85
        },
        technicalAnalysis: {
          breathControl: 82,
          articulation: 91,
          timing: 88,
          dynamics: 76
        },
        mixRecommendations: [
          {
            type: 'EQ',
            description: 'הוסף בוסט של 3dB ב-2.5kHz לבהירות',
            priority: 'high',
            plugins: ['FabFilter Pro-Q 3', 'Waves H-EQ', 'iZotope Ozone EQ'],
            settings: 'High Shelf: 2.5kHz, +3dB, Q: 1.0'
          },
          {
            type: 'Compression',
            description: 'השתמש ב-ratio של 3:1 עם threshold של -18dB',
            priority: 'medium',
            plugins: ['Waves CLA-76', 'Universal Audio LA-2A', 'FabFilter Pro-C 2'],
            settings: 'Ratio: 3:1, Threshold: -18dB, Attack: 5ms, Release: 50ms'
          },
          {
            type: 'Reverb',
            description: 'הוסף reverb קצר (0.8s) עם 15% wet',
            priority: 'low',
            plugins: ['Valhalla Room', 'Waves RVerb', 'FabFilter Pro-R'],
            settings: 'Decay: 0.8s, Wet: 15%, Pre-delay: 5ms'
          },
          {
            type: 'De-essing',
            description: 'הפחת sibilance ב-7kHz עם 3dB cut',
            priority: 'medium',
            plugins: ['Waves DeEsser', 'FabFilter Pro-DS', 'iZotope RX De-ess'],
            settings: 'Frequency: 7kHz, Threshold: -20dB, Reduction: 3dB'
          },
          {
            type: 'Saturation',
            description: 'הוסף saturation עדין לבהירות הקול',
            priority: 'low',
            plugins: ['Soundtoys Decapitator', 'Waves J37', 'FabFilter Saturn 2'],
            settings: 'Drive: 2dB, Type: Tube, Frequency: 2-8kHz'
          },
          {
            type: 'Delay',
            description: 'הוסף delay קצר (1/8 note) עם 20% wet',
            priority: 'low',
            plugins: ['EchoBoy', 'Waves H-Delay', 'FabFilter Timeless 3'],
            settings: 'Time: 1/8 note, Wet: 20%, Feedback: 15%'
          }
        ],
        aiInsights: [
          'הקול שלך מתאים במיוחד לסגנון פופ-רוק',
          'יש לך פוטנציאל מעולה בטווח הגבוה',
          'שפר את שליטת הנשימה בחלקים החזקים'
        ]
      };
      
      setAnalysisResults(mockResults);
      setIsAnalyzing(false);
    }, 3000);
  };

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const width = rect.width;
    const seekTime = (clickX / width) * duration;
    
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  // Add event listeners when audioUrl changes
  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      audioRef.current.addEventListener('ended', handleEnded);
      
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
          audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
          audioRef.current.removeEventListener('ended', handleEnded);
        }
      };
    }
  }, [audioUrl]);

  const generatePDF = () => {
    // Dynamic import of jsPDF
    import('jspdf').then(({ default: jsPDF }) => {
      const doc = new jsPDF();
      
      // Add Hebrew font support
      doc.addFont('https://fonts.gstatic.com/s/heebo/v21/NGSpv5_NC0k9P_v6ZUCbLRAHxK1EiSysdUmj.ttf', 'Heebo', 'normal');
      doc.setFont('Heebo');
      
      // Title
      doc.setFontSize(24);
      doc.setTextColor(255, 107, 53); // studio-primary color
      doc.text('דוח ניתוח ערוץ שירה', 105, 20, { align: 'center' });
      
      // File info
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(`שם קובץ: ${selectedFile?.name || 'לא ידוע'}`, 20, 40);
      doc.text(`תאריך ניתוח: ${new Date().toLocaleString('he-IL')}`, 20, 50);
      doc.text(`גודל קובץ: ${selectedFile ? (selectedFile.size / 1024 / 1024).toFixed(2) + ' MB' : 'לא ידוע'}`, 20, 60);
      
      // Vocal Range Analysis
      doc.setFontSize(16);
      doc.setTextColor(255, 107, 53);
      doc.text('ניתוח טווח קולי', 20, 80);
      
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(`טווח קולי: ${analysisResults.vocalRange.lowest} - ${analysisResults.vocalRange.highest}`, 25, 90);
      doc.text(`סולם השיר: ${analysisResults.vocalRange.songKey}`, 25, 100);
      doc.text(`סוג קול: ${analysisResults.vocalRange.vocalType}`, 25, 110);
      doc.text(`טווח נוח: ${analysisResults.vocalRange.tessitura}`, 25, 120);
      doc.text(`רמת דיוק: ${analysisResults.vocalRange.confidence}%`, 25, 130);
      
      // Pitch Analysis
      doc.setFontSize(16);
      doc.setTextColor(255, 107, 53);
      doc.text('ניתוח פיץ\' ודינמיקה', 20, 150);
      
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(`דיוק פיץ': ${analysisResults.pitchAnalysis.accuracy}%`, 25, 160);
      doc.text(`יציבות: ${analysisResults.pitchAnalysis.stability}%`, 25, 170);
      
      // Technical Analysis
      doc.setFontSize(16);
      doc.setTextColor(255, 107, 53);
      doc.text('ניתוח טכני', 20, 190);
      
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(`שליטת נשימה: ${analysisResults.technicalAnalysis.breathControl}%`, 25, 200);
      doc.text(`הגייה: ${analysisResults.technicalAnalysis.articulation}%`, 25, 210);
      doc.text(`תזמון: ${analysisResults.technicalAnalysis.timing}%`, 25, 220);
      doc.text(`דינמיקה: ${analysisResults.technicalAnalysis.dynamics}%`, 25, 230);
      
      // Emotion Analysis
      doc.setFontSize(16);
      doc.setTextColor(255, 107, 53);
      doc.text('ניתוח רגשי', 20, 250);
      
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(`רגש ראשי: ${analysisResults.emotionAnalysis.primary}`, 25, 260);
      doc.text(`רגש משני: ${analysisResults.emotionAnalysis.secondary}`, 25, 270);
      doc.text(`עוצמה רגשית: ${analysisResults.emotionAnalysis.intensity}%`, 25, 280);
      
      // Mix Recommendations
      doc.addPage();
      doc.setFontSize(16);
      doc.setTextColor(255, 107, 53);
      doc.text('המלצות מיקס מקצועיות', 20, 20);
      
      let yPos = 40;
      analysisResults.mixRecommendations.forEach((rec, index) => {
        if (yPos > 250) {
          doc.addPage();
          yPos = 20;
        }
        
        doc.setFontSize(12);
        doc.setTextColor(255, 107, 53);
        doc.text(`${rec.type} - ${rec.priority === 'high' ? 'גבוה' : rec.priority === 'medium' ? 'בינוני' : 'נמוך'}`, 20, yPos);
        
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.text(rec.description, 25, yPos + 10);
        doc.text(`פלאגינים: ${rec.plugins.join(', ')}`, 25, yPos + 20);
        doc.text(`הגדרות: ${rec.settings}`, 25, yPos + 30);
        
        yPos += 50;
      });
      
      // AI Insights
      doc.addPage();
      doc.setFontSize(16);
      doc.setTextColor(255, 107, 53);
      doc.text('תובנות AI', 20, 20);
      
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      analysisResults.aiInsights.forEach((insight, index) => {
        doc.text(`• ${insight}`, 25, 40 + (index * 15));
      });
      
      // Save PDF
      const fileName = `vocal-analysis-${selectedFile?.name?.replace(/\.[^/.]+$/, '') || 'report'}.pdf`;
      doc.save(fileName);
    }).catch(err => {
      console.error('Error generating PDF:', err);
      alert('שגיאה בייצוא PDF. נסה שוב.');
    });
  };

  return (
    <div className="flex-1 bg-studio-dark p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center mb-2">
          <Mic className="w-8 h-8 text-white ml-3" />
          <h1 className="text-3xl font-bold text-white">ניתוח ערוץ שירה</h1>
        </div>
        <p className="text-gray-400 text-lg">
          נתח ערוץ שירה עם בינה מלאכותית וקבל המלצות מקצועיות למיקס
        </p>
      </div>

      <div className="max-w-6xl space-y-6">
        {/* Upload Audio File */}
        <div className="bg-studio-gray border border-studio-gray rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Upload className="w-5 h-5 text-white ml-2" />
            <h2 className="text-xl font-bold text-white">העלה קובץ אודיו</h2>
          </div>
          
          <div
            className={`border-2 border-dashed border-gray-600 rounded-lg p-8 text-center transition-colors ${
              selectedFile ? 'border-green-500 bg-green-500/10' : 'hover:border-gray-500'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            
            {selectedFile ? (
              <div>
                <h3 className="text-lg font-medium text-white mb-2">קובץ נבחר</h3>
                <div className="flex items-center justify-center space-x-2 space-x-reverse mb-4">
                  <FileText className="w-5 h-5 text-green-500" />
                  <span className="text-green-400">{selectedFile.name}</span>
                </div>
                <p className="text-sm text-gray-400 mb-4">
                  גודל: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
                
                {/* Audio Player */}
                {audioUrl && (
                  <div className="mb-4 p-4 bg-studio-dark rounded-lg">
                    <audio ref={audioRef} src={audioUrl} preload="metadata" />
                    <div className="space-y-3">
                      <div className="flex items-center justify-center space-x-4 space-x-reverse">
                        <button
                          onClick={togglePlayback}
                          className="text-white border border-gray-600 hover:border-studio-primary px-4 py-2 rounded-lg transition-colors"
                        >
                          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                        <Volume2 className="w-5 h-5 text-gray-400" />
                        <span className="text-sm text-gray-400">האזן לקובץ</span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div 
                          className="w-full bg-gray-700 rounded-full h-2 cursor-pointer"
                          onClick={handleSeek}
                        >
                          <div 
                            className="bg-studio-primary h-2 rounded-full transition-all duration-100"
                            style={{width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`}}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-400">
                          <span>{formatTime(currentTime)}</span>
                          <span>{formatTime(duration)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <button 
                  className="w-full bg-studio-primary text-white px-6 py-3 rounded-lg hover:bg-studio-primary/90 transition-colors flex items-center justify-center"
                  onClick={startAnalysis}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></div>
                      מנתח...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 ml-2" />
                      התחל ניתוח AI
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-medium text-white mb-2">גרור קובץ לכאן או לחץ לבחירה</h3>
                <p className="text-gray-400 mb-6">
                  העלה קובץ אודיו לניתוח מקצועי
                </p>
                <input
                  type="file"
                  accept=".wav,.mp3,.flac"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-input"
                />
                <label htmlFor="file-input" className="cursor-pointer">
                  <button className="w-full border border-gray-600 text-white px-6 py-3 rounded-lg hover:border-studio-primary transition-colors">
                    <FileText className="w-5 h-5 ml-2 inline" />
                    בחר קובץ
                  </button>
                </label>
              </div>
            )}
            
            <div className="mt-6 text-sm text-gray-500">
              <p>תומך ב: WAV, MP3, FLAC (עד 50MB)</p>
            </div>
          </div>
        </div>

        {/* Analysis Results */}
        {isAnalyzing && (
          <div className="bg-studio-gray border border-studio-gray rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">מנתח עם AI...</h2>
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-studio-primary mx-auto mb-4"></div>
              <p className="text-gray-400 mb-2">מנתח את הקובץ עם בינה מלאכותית</p>
              <div className="flex justify-center space-x-2 space-x-reverse">
                <div className="w-2 h-2 bg-studio-primary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-studio-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-studio-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}

        {/* Analysis Results */}
        {analysisResults && (
          <div className="space-y-6">
            {/* Vocal Range Analysis */}
            <div className="bg-studio-gray border border-studio-gray rounded-lg p-6">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-white mb-2">ניתוח טווח קולי</h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  ניתוח זה מזהה את הטווח הקולי המדויק של הזמר, כולל הסולם המוזיקלי של השיר. 
                  הטווח הקולי הוא המרחק בין הצליל הנמוך ביותר לגבוה ביותר שהזמר יכול להפיק. 
                  זיהוי הסולם עוזר בהתאמת המלודיה וההרמוניה, ובבחירת המפתח האופטימלי לשיר.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-studio-dark p-4 rounded-lg">
                  <div className="text-2xl font-bold text-studio-primary">{analysisResults.vocalRange.lowest}</div>
                  <div className="text-sm text-gray-400">הטון הנמוך ביותר</div>
                </div>
                <div className="bg-studio-dark p-4 rounded-lg">
                  <div className="text-2xl font-bold text-studio-primary">{analysisResults.vocalRange.highest}</div>
                  <div className="text-sm text-gray-400">הטון הגבוה ביותר</div>
                </div>
                <div className="bg-studio-dark p-4 rounded-lg">
                  <div className="text-2xl font-bold text-studio-primary">{analysisResults.vocalRange.range}</div>
                  <div className="text-sm text-gray-400">טווח קולי</div>
                </div>
                <div className="bg-studio-dark p-4 rounded-lg">
                  <div className="text-2xl font-bold text-studio-primary">{analysisResults.vocalRange.confidence}%</div>
                  <div className="text-sm text-gray-400">רמת דיוק</div>
                </div>
              </div>
              
              {/* Song Key Information */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-studio-dark p-4 rounded-lg">
                  <div className="text-xl font-bold text-studio-primary">{analysisResults.vocalRange.songKey}</div>
                  <div className="text-sm text-gray-400">סולם השיר</div>
                </div>
                <div className="bg-studio-dark p-4 rounded-lg">
                  <div className="text-xl font-bold text-studio-primary">{analysisResults.vocalRange.keyConfidence}%</div>
                  <div className="text-sm text-gray-400">דיוק זיהוי הסולם</div>
                </div>
                <div className="bg-studio-dark p-4 rounded-lg">
                  <div className="text-lg font-bold text-studio-primary">{analysisResults.vocalRange.vocalType}</div>
                  <div className="text-sm text-gray-400">סוג קול</div>
                </div>
                <div className="bg-studio-dark p-4 rounded-lg">
                  <div className="text-lg font-bold text-studio-primary">{analysisResults.vocalRange.tessitura}</div>
                  <div className="text-sm text-gray-400">טווח נוח</div>
                </div>
              </div>
              
              {/* Suggested Keys */}
              <div className="mt-4">
                <h4 className="text-white font-medium mb-2">סולמות מומלצים:</h4>
                <div className="flex flex-wrap gap-2">
                  {analysisResults.vocalRange.suggestedKeys.map((key, index) => (
                    <span key={index} className="px-3 py-1 bg-studio-primary text-white rounded-full text-sm">
                      {key}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Pitch Analysis */}
            <div className="bg-studio-gray border border-studio-gray rounded-lg p-6">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-white mb-2">ניתוח פיץ' ודינמיקה</h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  ניתוח זה בודק את הדיוק של הזמר ביחס לצלילים המוזיקליים הנכונים. 
                  דיוק פיץ' מתייחס לכמה הזמר מדויק בהגיית הצלילים, בעוד שיציבות מתייחסת 
                  ליכולת לשמור על פיץ' יציב לאורך זמן. זיהוי בעיות עוזר בהכוונה לשיפור טכני.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-medium mb-4">מדדים טכניים</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">דיוק פיץ'</span>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <div className="w-24 bg-studio-dark rounded-full h-2">
                          <div className="bg-studio-primary h-2 rounded-full" style={{width: `${analysisResults.pitchAnalysis.accuracy}%`}}></div>
                        </div>
                        <span className="text-white text-sm">{analysisResults.pitchAnalysis.accuracy}%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">יציבות</span>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <div className="w-24 bg-studio-dark rounded-full h-2">
                          <div className="bg-studio-primary h-2 rounded-full" style={{width: `${analysisResults.pitchAnalysis.stability}%`}}></div>
                        </div>
                        <span className="text-white text-sm">{analysisResults.pitchAnalysis.stability}%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-4">בעיות שזוהו</h4>
                  <div className="space-y-2">
                    {analysisResults.pitchAnalysis.issues.map((issue, index) => (
                      <div key={index} className="flex items-center space-x-2 space-x-reverse">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <span className="text-gray-300 text-sm">{issue}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Analysis */}
            <div className="bg-studio-gray border border-studio-gray rounded-lg p-6">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-white mb-2">ניתוח טכני מתקדם</h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  ניתוח זה בודק את הטכניקה הקולית של הזמר. שליטת נשימה מתייחסת ליכולת לנשום נכון תוך כדי שירה, 
                  הגייה בודקת את הבהירות של המילים, תזמון מתייחס לדיוק הקצבי, ודינמיקה בודקת את השינויים בעוצמה. 
                  מדדים אלה קריטיים לאיכות הביצוע הקולי.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-medium mb-4">מדדים טכניים</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400">שליטת נשימה</span>
                        <span className="text-white text-sm">{analysisResults.technicalAnalysis.breathControl}%</span>
                      </div>
                      <div className="w-full bg-studio-dark rounded-full h-2">
                        <div className="bg-studio-primary h-2 rounded-full transition-all duration-500" style={{width: `${analysisResults.technicalAnalysis.breathControl}%`}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400">הגייה</span>
                        <span className="text-white text-sm">{analysisResults.technicalAnalysis.articulation}%</span>
                      </div>
                      <div className="w-full bg-studio-dark rounded-full h-2">
                        <div className="bg-studio-primary h-2 rounded-full transition-all duration-500" style={{width: `${analysisResults.technicalAnalysis.articulation}%`}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400">תזמון</span>
                        <span className="text-white text-sm">{analysisResults.technicalAnalysis.timing}%</span>
                      </div>
                      <div className="w-full bg-studio-dark rounded-full h-2">
                        <div className="bg-studio-primary h-2 rounded-full transition-all duration-500" style={{width: `${analysisResults.technicalAnalysis.timing}%`}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400">דינמיקה</span>
                        <span className="text-white text-sm">{analysisResults.technicalAnalysis.dynamics}%</span>
                      </div>
                      <div className="w-full bg-studio-dark rounded-full h-2">
                        <div className="bg-studio-primary h-2 rounded-full transition-all duration-500" style={{width: `${analysisResults.technicalAnalysis.dynamics}%`}}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-4">פרופיל קולי</h4>
                  <div className="space-y-3">
                    <div className="bg-studio-dark p-3 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-400 text-sm">טווח קולי</span>
                        <span className="text-white text-sm font-medium">{analysisResults.vocalRange.range}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {analysisResults.vocalRange.lowest} - {analysisResults.vocalRange.highest}
                      </div>
                    </div>
                    <div className="bg-studio-dark p-3 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-400 text-sm">סוג קול</span>
                        <span className="text-white text-sm font-medium">{analysisResults.vocalRange.vocalType}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        מתאים לסגנונות: פופ, רוק, R&B
                      </div>
                    </div>
                    <div className="bg-studio-dark p-3 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-400 text-sm">טווח נוח</span>
                        <span className="text-white text-sm font-medium">{analysisResults.vocalRange.tessitura}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        הטווח שבו הקול נשמע טבעי
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Emotion Analysis */}
            <div className="bg-studio-gray border border-studio-gray rounded-lg p-6">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-white mb-2">ניתוח רגשי</h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  ניתוח זה מזהה את הרגשות והטון הרגשי של הביצוע הקולי. זיהוי הרגש הראשי והמשני עוזר 
                  בהבנת הכוונה האמנותית של השיר. עוצמה רגשית מתייחסת לכמה הרגש מועבר בצורה חזקה 
                  ומשכנעת. מידע זה קריטי למיקס ולעיבוד שמדגיש את הרגש הנכון.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-studio-dark p-4 rounded-lg text-center">
                  <div className="text-xl font-bold text-studio-primary mb-2">{analysisResults.emotionAnalysis.primary}</div>
                  <div className="text-sm text-gray-400">רגש ראשי</div>
                </div>
                <div className="bg-studio-dark p-4 rounded-lg text-center">
                  <div className="text-xl font-bold text-studio-primary mb-2">{analysisResults.emotionAnalysis.secondary}</div>
                  <div className="text-sm text-gray-400">רגש משני</div>
                </div>
                <div className="bg-studio-dark p-4 rounded-lg text-center">
                  <div className="text-xl font-bold text-studio-primary mb-2">{analysisResults.emotionAnalysis.intensity}%</div>
                  <div className="text-sm text-gray-400">עוצמה רגשית</div>
                </div>
              </div>
            </div>

            {/* Mix Recommendations */}
            <div className="bg-studio-gray border border-studio-gray rounded-lg p-6">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-white mb-2">המלצות מיקס מקצועיות</h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  המלצות אלה מבוססות על ניתוח מעמיק של הקול ומטרתן להביא את ערוץ השירה לרמה המקצועית הגבוהה ביותר. 
                  כל המלצה כוללת פלאגינים מהשורה הראשונה והגדרות מדויקות. סדר העדיפויות עוזר בתכנון סדר העיבוד.
                </p>
              </div>
              <div className="space-y-4">
                {analysisResults.mixRecommendations.map((rec, index) => (
                  <div key={index} className="flex items-start space-x-4 space-x-reverse p-4 bg-studio-dark rounded-lg">
                    <div className="text-2xl">
                      {rec.priority === 'high' ? '🔴' : rec.priority === 'medium' ? '🟡' : '🟢'}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 space-x-reverse mb-1">
                        <span className="text-white font-medium">{rec.type}</span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          rec.priority === 'high' ? 'text-red-400' : 
                          rec.priority === 'medium' ? 'text-yellow-400' : 'text-green-400'
                        } bg-opacity-20`}>
                          {rec.priority === 'high' ? 'גבוה' : rec.priority === 'medium' ? 'בינוני' : 'נמוך'}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">{rec.description}</p>
                      <div className="space-y-1">
                        <div className="text-xs text-studio-primary font-medium">פלאגינים מומלצים:</div>
                        <div className="text-xs text-gray-400">{rec.plugins.join(' • ')}</div>
                        <div className="text-xs text-studio-primary font-medium mt-2">הגדרות מומלצות:</div>
                        <div className="text-xs text-gray-400">{rec.settings}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-studio-gray border border-studio-gray rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">תובנות AI</h2>
                <button 
                  className="text-white border border-gray-600 hover:border-studio-primary px-4 py-2 rounded-lg transition-colors"
                  onClick={generatePDF}
                >
                  <FileText className="w-4 h-4 ml-2 inline" />
                  ייצא PDF
                </button>
              </div>
              <div className="space-y-3">
                {analysisResults.aiInsights.map((insight, index) => (
                  <div key={index} className="flex items-start space-x-3 space-x-reverse p-3 bg-studio-dark rounded-lg">
                    <div className="w-2 h-2 bg-studio-primary rounded-full mt-2"></div>
                    <p className="text-gray-300">{insight}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VocalAnalysis; 