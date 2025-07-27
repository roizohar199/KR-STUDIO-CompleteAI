import React, { useState, useEffect } from 'react';
import { Lightbulb, Music, Mic, Settings, Star, ExternalLink, Volume2, Radio, Waves, Clock, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

const ProductionRecommendations = () => {
  const [analysisData, setAnalysisData] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('pop');
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);

  // נתוני הפלאגינים המובילים
  const topPlugins = {
    vocalCompression: [
      {
        name: "UAD Teletronix LA-2A",
        image: null,
        price: "$299",
        description: "אמולציה מדויקת של קומפרסור קלאסי לשירה",
        settings: {
          ratio: "Variable (2:1 - 20:1)",
          threshold: "-20dB to -5dB",
          attack: "10ms",
          release: "Auto (60ms - 5s)",
          makeup: "5-15dB"
        },
        features: ["Optical Compression", "Classic Sound", "Vocal Magic", "UAD Quality"],
        color: "bg-gradient-to-br from-red-500 to-red-700"
      },
      {
        name: "Waves CLA-2A",
        image: null,
        price: "$79",
        description: "אמולציה של קומפרסור אופטי קלאסי לשירה",
        settings: {
          ratio: "Variable (2:1 - 20:1)",
          threshold: "-20dB to -5dB",
          attack: "10ms",
          release: "Auto (60ms - 5s)",
          makeup: "5-15dB"
        },
        features: ["Optical Compression", "Classic Sound", "Vocal Magic"],
        color: "bg-gradient-to-br from-purple-500 to-purple-700"
      },
      {
        name: "ReaComp (Free)",
        image: null,
        price: "חינמי",
        description: "קומפרסור חינמי עם איכות מקצועית",
        settings: {
          ratio: "2:1 - 4:1",
          threshold: "-18dB to -12dB",
          attack: "5-15ms",
          release: "50-100ms",
          makeup: "2-6dB"
        },
        features: ["Free", "Professional", "Clean Sound"],
        color: "bg-gradient-to-br from-lime-500 to-lime-700"
      },
      {
        name: "FabFilter Pro-C 2",
        image: null,
        price: "€169",
        description: "קומפרסור ווקאלי מתקדם עם איכות מקצועית",
        settings: {
          ratio: "2:1 - 4:1",
          threshold: "-18dB to -12dB",
          attack: "5-15ms",
          release: "50-100ms",
          makeup: "2-6dB"
        },
        features: ["Multiband", "Sidechain", "Visual Feedback", "Auto Release"],
        color: "bg-gradient-to-br from-blue-500 to-blue-700"
      },
      {
        name: "Waves CLA-76",
        image: null,
        price: "$29",
        description: "אמולציה של קומפרסור קלאסי לשירה",
        settings: {
          ratio: "4:1",
          threshold: "-20dB to -10dB",
          attack: "Fast",
          release: "Auto",
          makeup: "3-8dB"
        },
        features: ["Classic Sound", "Fast Attack", "Musical Compression"],
        color: "bg-gradient-to-br from-orange-500 to-orange-700"
      }
    ],
    vocalEQ: [
      {
        name: "UAD Manley Massive Passive",
        image: null,
        price: "$349",
        description: "אמולציה של EQ אנלוגי מקצועי לשירה",
        settings: {
          lowCut: "80-120Hz",
          presence: "2-5kHz (+2-4dB)",
          air: "8-12kHz (+1-3dB)",
          notch: "200-400Hz (-2-4dB)"
        },
        features: ["Tube EQ", "Classic Sound", "Vocal Enhancement", "UAD Quality"],
        color: "bg-gradient-to-br from-yellow-500 to-yellow-700"
      },
      {
        name: "Waves API 550A",
        image: null,
        price: "$79",
        description: "אמולציה של EQ אנלוגי קלאסי לשירה",
        settings: {
          lowCut: "80-120Hz",
          presence: "2-5kHz (+2-4dB)",
          air: "8-12kHz (+1-3dB)",
          notch: "200-400Hz (-2-4dB)"
        },
        features: ["Classic API", "Vocal Enhancement", "Musical EQ"],
        color: "bg-gradient-to-br from-orange-500 to-orange-700"
      },
      {
        name: "ReaEQ (Free)",
        image: null,
        price: "חינמי",
        description: "EQ חינמי עם איכות מקצועית",
        settings: {
          lowCut: "80-120Hz",
          presence: "2-5kHz (+2-4dB)",
          air: "8-12kHz (+1-3dB)",
          notch: "200-400Hz (-2-4dB)"
        },
        features: ["Free", "Professional", "Clean Interface"],
        color: "bg-gradient-to-br from-gray-500 to-gray-700"
      },
      {
        name: "FabFilter Pro-Q 3",
        image: null,
        price: "€169",
        description: "EQ מתקדם עם ניתוח ספקטרלי בזמן אמת",
        settings: {
          lowCut: "80-120Hz",
          presence: "2-5kHz (+2-4dB)",
          air: "8-12kHz (+1-3dB)",
          notch: "200-400Hz (-2-4dB)"
        },
        features: ["Linear Phase", "Spectrum Analyzer", "Dynamic EQ", "M/S Processing"],
        color: "bg-gradient-to-br from-green-500 to-green-700"
      },
      {
        name: "Waves F6",
        image: null,
        price: "$49",
        description: "EQ דינמי עם 6 פסים",
        settings: {
          lowCut: "100Hz",
          lowMid: "250Hz (-2dB)",
          mid: "1kHz (+1dB)",
          highMid: "3kHz (+2dB)",
          presence: "5kHz (+3dB)",
          air: "10kHz (+2dB)"
        },
        features: ["Dynamic EQ", "6 Bands", "RTA Display"],
        color: "bg-gradient-to-br from-purple-500 to-purple-700"
      }
    ],
    vocalReverb: [
      {
        name: "UAD Lexicon 224",
        image: null,
        price: "$299",
        description: "אמולציה של ריברב קלאסי מקצועי לשירה",
        settings: {
          size: "Large",
          decay: "2.5-3.5s",
          preDelay: "20-40ms",
          mix: "15-25%",
          highCut: "8kHz"
        },
        features: ["Classic Lexicon", "Vocal Reverb", "Studio Quality", "UAD Processing"],
        color: "bg-gradient-to-br from-pink-500 to-pink-700"
      },
      {
        name: "Waves IR-L",
        image: null,
        price: "$99",
        description: "ריברב Impulse Response לשירה",
        settings: {
          size: "Large",
          decay: "2.5-3.5s",
          preDelay: "20-40ms",
          mix: "15-25%",
          highCut: "8kHz"
        },
        features: ["IR Reverb", "Real Spaces", "Vocal Reverb"],
        color: "bg-gradient-to-br from-emerald-500 to-emerald-700"
      },
      {
        name: "Valhalla Room",
        image: null,
        price: "$50",
        description: "ריברב איכותי לשירה עם איכות מקצועית",
        settings: {
          size: "Large",
          decay: "2.5-3.5s",
          preDelay: "20-40ms",
          mix: "15-25%",
          highCut: "8kHz"
        },
        features: ["Algorithmic Reverb", "Multiple Algorithms", "High Quality"],
        color: "bg-gradient-to-br from-indigo-500 to-indigo-700"
      },
      {
        name: "Waves H-Reverb",
        image: null,
        price: "$99",
        description: "ריברב היברידי מתקדם",
        settings: {
          size: "Medium-Large",
          decay: "2-3s",
          preDelay: "30ms",
          mix: "20%",
          diffusion: "70%"
        },
        features: ["Hybrid Algorithm", "Modulation", "EQ Section"],
        color: "bg-gradient-to-br from-teal-500 to-teal-700"
      },
      {
        name: "ReaVerb (Free)",
        image: null,
        price: "חינמי",
        description: "ריברב חינמי עם איכות מקצועית",
        settings: {
          size: "Medium-Large",
          decay: "2-3s",
          preDelay: "30ms",
          mix: "20%",
          diffusion: "70%"
        },
        features: ["Free", "Professional", "Convolution"],
        color: "bg-gradient-to-br from-slate-500 to-slate-700"
      }
    ],
    vocalDelay: [
      {
        name: "UAD Cooper Time Cube",
        image: null,
        price: "$199",
        description: "אמולציה של דיליי אנלוגי קלאסי לשירה",
        settings: {
          time: "1/4 Note",
          feedback: "25-35%",
          mix: "15-20%",
          filter: "8kHz"
        },
        features: ["Analog Delay", "Classic Sound", "Vocal Delay", "UAD Quality"],
        color: "bg-gradient-to-br from-cyan-500 to-cyan-700"
      },
      {
        name: "Waves SuperTap",
        image: null,
        price: "$79",
        description: "דיליי מתקדם עם 6 taps לשירה",
        settings: {
          time: "1/4 Note",
          feedback: "25-35%",
          mix: "15-20%",
          filter: "8kHz"
        },
        features: ["6 Taps", "Tempo Sync", "Modulation"],
        color: "bg-gradient-to-br from-violet-500 to-violet-700"
      },
      {
        name: "Soundtoys EchoBoy",
        image: null,
        price: "$199",
        description: "דיליי אנלוגי עם אמולציות קלאסיות",
        settings: {
          time: "1/4 Note",
          feedback: "25-35%",
          mix: "15-20%",
          filter: "8kHz"
        },
        features: ["Analog Emulations", "Tempo Sync", "Filter Section"],
        color: "bg-gradient-to-br from-pink-500 to-pink-700"
      },
      {
        name: "Waves H-Delay",
        image: null,
        price: "$49",
        description: "דיליי היברידי עם איכות גבוהה",
        settings: {
          time: "1/4D",
          feedback: "30%",
          mix: "18%",
          filter: "7kHz"
        },
        features: ["Hybrid Algorithm", "Tempo Sync", "Modulation"],
        color: "bg-gradient-to-br from-red-500 to-red-700"
      },
      {
        name: "ReaDelay (Free)",
        image: null,
        price: "חינמי",
        description: "דיליי חינמי עם איכות מקצועית",
        settings: {
          time: "1/4 Note",
          feedback: "25-35%",
          mix: "15-20%",
          filter: "8kHz"
        },
        features: ["Free", "Professional", "Multiple Taps"],
        color: "bg-gradient-to-br from-indigo-500 to-indigo-700"
      }
    ],
    vocalSaturation: [
      {
        name: "UAD Studer A800",
        image: null,
        price: "$299",
        description: "אמולציה של טייפ מקצועי לסטורציה ווקאלית",
        settings: {
          drive: "2-4",
          tone: "50%",
          mix: "20-30%",
          algorithm: "Tape"
        },
        features: ["Tape Saturation", "Classic Sound", "Vocal Warmth", "UAD Quality"],
        color: "bg-gradient-to-br from-amber-500 to-amber-700"
      },
      {
        name: "Waves J37",
        image: null,
        price: "$99",
        description: "אמולציה של טייפ Abbey Road לשירה",
        settings: {
          drive: "2-4",
          tone: "50%",
          mix: "20-30%",
          algorithm: "Tape"
        },
        features: ["Abbey Road", "Tape Saturation", "Vocal Warmth"],
        color: "bg-gradient-to-br from-rose-500 to-rose-700"
      },
      {
        name: "ReaXcomp (Free)",
        image: null,
        price: "חינמי",
        description: "קומפרסור מולטיבנד חינמי לסטורציה",
        settings: {
          drive: "2-4",
          tone: "50%",
          mix: "20-30%",
          algorithm: "Multiband"
        },
        features: ["Free", "Multiband", "Professional"],
        color: "bg-gradient-to-br from-fuchsia-500 to-fuchsia-700"
      },
      {
        name: "Soundtoys Decapitator",
        image: null,
        price: "$199",
        description: "סטורציה אנלוגית עם 5 אלגוריתמים",
        settings: {
          drive: "2-4",
          tone: "50%",
          mix: "20-30%",
          algorithm: "A"
        },
        features: ["5 Algorithms", "Drive Control", "Tone Shaping"],
        color: "bg-gradient-to-br from-yellow-500 to-yellow-700"
      },
      {
        name: "FabFilter Saturn 2",
        image: null,
        price: "€199",
        description: "סטורציה מולטיבנד מתקדמת",
        settings: {
          drive: "15-25%",
          mix: "25%",
          bands: "3-4 bands"
        },
        features: ["Multiband", "Multiple Algorithms", "Modulation"],
        color: "bg-gradient-to-br from-cyan-500 to-cyan-700"
      },
      {
        name: "TDR Nova (Free)",
        image: null,
        price: "חינמי",
        description: "EQ דינמי חינמי באיכות מקצועית",
        settings: {
          drive: "15-25%",
          mix: "25%",
          bands: "4 bands"
        },
        features: ["Dynamic EQ", "Free", "Professional Quality"],
        color: "bg-gradient-to-br from-green-500 to-green-700"
      },
      {
        name: "ReaComp (Free)",
        image: null,
        price: "חינמי",
        description: "קומפרסור חינמי עם איכות מקצועית",
        settings: {
          ratio: "2:1 - 4:1",
          threshold: "-18dB to -12dB",
          attack: "5-15ms",
          release: "50-100ms"
        },
        features: ["Free", "Professional", "Clean Sound"],
        color: "bg-gradient-to-br from-blue-500 to-blue-700"
      }
    ]
  };

  // נתונים לסגנונות מוזיקליים שונים
  const genreSettings = {
    pop: {
      name: "פופ",
      compression: "קומפרסיה מתונה עם attack מהיר",
      eq: "הגברת נוכחות ב-2-4kHz, ניקוי פריקוונסי נמוך",
      reverb: "ריברב קצר ובינוני",
      delay: "דיליי קצר לסינק",
      saturation: "סטורציה קלה לחום"
    },
    rock: {
      name: "רוק",
      compression: "קומפרסיה חזקה יותר עם attack מהיר",
      eq: "הגברת נוכחות ב-3-5kHz, חום ב-200-400Hz",
      reverb: "ריברב בינוני עד ארוך",
      delay: "דיליי בינוני",
      saturation: "סטורציה בינונית לאגרסיביות"
    },
    rnb: {
      name: "R&B",
      compression: "קומפרסיה רכה עם attack איטי",
      eq: "חום ב-200-400Hz, אוויר ב-8-12kHz",
      reverb: "ריברב ארוך ורך",
      delay: "דיליי ארוך ורך",
      saturation: "סטורציה רכה לחום"
    },
    electronic: {
      name: "אלקטרוני",
      compression: "קומפרסיה מדויקת עם attack מהיר",
      eq: "ניקוי פריקוונסי נמוך, הגברת נוכחות",
      reverb: "ריברב קצר ומדויק",
      delay: "דיליי קצר ומדויק",
      saturation: "סטורציה קלה לחום"
    },
    acoustic: {
      name: "אקוסטי",
      compression: "קומפרסיה רכה מאוד",
      eq: "חום טבעי, הגברת נוכחות עדינה",
      reverb: "ריברב טבעי וארוך",
      delay: "דיליי עדין",
      saturation: "סטורציה מינימלית"
    }
  };

  // פונקציה להחזרת האייקון המתאים לכל סוג פלאגין
  const getPluginIcon = (category) => {
    switch (category) {
      case 'compression':
        return <Volume2 className="w-10 h-10 text-white" />;
      case 'eq':
        return <Radio className="w-10 h-10 text-white" />;
      case 'reverb':
        return <Waves className="w-10 h-10 text-white" />;
      case 'delay':
        return <Clock className="w-10 h-10 text-white" />;
      case 'saturation':
        return <Zap className="w-10 h-10 text-white" />;
      default:
        return <Music className="w-10 h-10 text-white" />;
    }
  };

  // פונקציה לניתוח ערוץ השירה
  const analyzeVocalTrack = async () => {
    setIsAnalyzing(true);
    
    try {
      // בדיקה אם יש קובץ שנבחר ברכיב הניתוח הקולי
      const vocalAnalysisData = localStorage.getItem('vocalAnalysisData');
      
      if (vocalAnalysisData) {
        const analysis = JSON.parse(vocalAnalysisData);
        setAnalysisData(analysis);
      } else {
        // אם אין נתונים קודמים, נבצע ניתוח בסיסי
        const selectedGenreData = genreSettings[selectedGenre];
        const analysis = {
          vocalType: "Tenor",
          frequencyRange: "80Hz - 8kHz",
          genre: selectedGenreData.name,
          issues: [
            "פריקוונסי נמוך מ-200Hz דורש ניקוי",
            "פריקוונסי 2-4kHz דורש הגברה קלה",
            "נוכחות ב-5-8kHz דורשת הגברה"
          ],
          recommendations: {
            compression: selectedGenreData.compression,
            eq: selectedGenreData.eq,
            reverb: selectedGenreData.reverb,
            delay: selectedGenreData.delay,
            saturation: selectedGenreData.saturation
          },
          targetSound: `שירה ברורה, חמה ומקצועית בסגנון ${selectedGenreData.name}`
        };
        
        setAnalysisData(analysis);
      }
    } catch (error) {
      console.error('שגיאה בניתוח:', error);
      alert('שגיאה בניתוח הקובץ. אנא נסה שוב.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const PluginCard = ({ plugin, category }) => (
    <Card className="bg-studio-gray border-studio-gray hover:border-blue-500 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4 space-x-reverse">
          <div className={`w-24 h-24 ${plugin.color} rounded-lg flex items-center justify-center shadow-lg`}>
            {getPluginIcon(category)}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-white">{plugin.name}</h3>
                          <div className="flex items-center space-x-2 space-x-reverse">
              <span className={`font-semibold ${
                plugin.price === 'חינמי' ? 'text-green-400' : 
                plugin.price.includes('$299') || plugin.price.includes('€199') ? 'text-purple-400' : 
                'text-blue-400'
              }`}>
                {plugin.price}
              </span>
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
            </div>
            </div>
            
            <p className="text-gray-400 text-sm mb-3">{plugin.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              {Object.entries(plugin.settings).map(([key, value]) => (
                <div key={key} className="bg-studio-dark p-2 rounded">
                  <div className="text-xs text-gray-500">{key}</div>
                  <div className="text-sm text-white font-medium">{value}</div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {plugin.features.map((feature, index) => (
                <span key={index} className="px-2 py-1 bg-blue-600 text-white text-xs rounded">
                  {feature}
                </span>
              ))}
            </div>
            
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              <ExternalLink className="w-4 h-4 ml-2" />
              למידע נוסף
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex-1 bg-studio-dark p-6 overflow-y-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center mb-2">
          <Lightbulb className="w-8 h-8 text-white ml-3" />
          <h1 className="text-3xl font-bold text-white">המלצות מיקס מקצועיות</h1>
        </div>
        <p className="text-gray-400 text-lg">
          קבל המלצות מיקס מקצועיות מותאמות אישית לערוץ השירה שלך
        </p>
        <div className="mt-4 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
          <div className="flex items-center space-x-2 space-x-reverse">
            <Zap className="w-5 h-5 text-green-400" />
            <span className="text-green-300 text-sm font-medium">המלצות מותאמות אישית</span>
          </div>
          <p className="text-green-200 text-sm mt-2">
            ההמלצות מתחברות לניתוח הקולי האמיתי שביצעת. 
            המערכת מתאימה את ההמלצות לטווח הקולי, סוג הקול והבעיות שזוהו.
            כל המלצה כוללת פלאגינים והגדרות מדויקות.
          </p>
          <div className="mt-3 p-3 bg-green-800/20 rounded-lg">
            <h4 className="text-green-300 text-sm font-medium mb-2">איך לקבל המלצות מותאמות אישית:</h4>
            <ol className="text-green-200 text-sm space-y-1">
              <li>1. עבור ל"ניתוח ערוץ שירה"</li>
              <li>2. העלה קובץ אודיו ובצע ניתוח</li>
              <li>3. חזור לכאן ולחץ על "התחל ניתוח AI"</li>
              <li>4. קבל המלצות מותאמות לקול שלך</li>
            </ol>
          </div>
        </div>
      </div>

      <div className="max-w-6xl">
        {/* ניתוח AI */}
        <Card className="bg-studio-gray border-studio-gray mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Mic className="w-5 h-5 ml-2" />
              ניתוח ערוץ השירה
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!analysisData ? (
              <div className="space-y-6">
                {/* בחירת סגנון מוזיקלי */}
                <div className="bg-studio-dark p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-3">בחר סגנון מוזיקלי</h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {Object.entries(genreSettings).map(([key, genre]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedGenre(key)}
                        className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                          selectedGenre === key
                            ? 'bg-blue-600 text-white'
                            : 'bg-studio-gray text-gray-400 hover:bg-studio-gray/80'
                        }`}
                      >
                        {genre.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* הגדרות מתקדמות */}
                <div className="bg-studio-dark p-4 rounded-lg">
                  <button
                    onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
                    className="flex items-center justify-between w-full text-white font-semibold"
                  >
                    <span>הגדרות מתקדמות</span>
                    <Settings className={`w-4 h-4 transition-transform ${showAdvancedSettings ? 'rotate-90' : ''}`} />
                  </button>
                  
                  {showAdvancedSettings && (
                    <div className="mt-4 space-y-3 text-gray-400 text-sm">
                      <p>• ניתוח פריקוונסי מתקדם</p>
                      <p>• זיהוי אוטומטי של סוג קול</p>
                      <p>• המלצות מותאמות לסגנון</p>
                      <p>• ניתוח דינמיקה ורמת קול</p>
                    </div>
                  )}
                </div>

                <div className="text-center py-4">
                  <Button 
                    onClick={analyzeVocalTrack}
                    disabled={isAnalyzing}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></div>
                        מנתח...
                      </>
                    ) : (
                      <>
                        <Settings className="w-4 h-4 ml-2" />
                        התחל ניתוח AI
                      </>
                    )}
                  </Button>
                  <p className="text-gray-400 mt-4">
                    המערכת תנתח את ערוץ השירה ותיתן המלצות מותאמות אישית לסגנון {genreSettings[selectedGenre].name}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* הודעה על המלצות מותאמות אישית */}
                {analysisData && (
                  <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                    <div className="flex items-center space-x-2 space-x-reverse mb-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <span className="text-green-300 text-sm font-medium">המלצות מותאמות אישית</span>
                    </div>
                    <p className="text-green-200 text-sm">
                      ההמלצות מתחברות לניתוח הקולי שביצעת. המערכת התאימה את ההמלצות לטווח הקולי שלך ({analysisData.frequencyRange}), 
                      סוג הקול ({analysisData.vocalType}) והבעיות שזוהו. כל המלצה כוללת פלאגינים והגדרות מדויקות.
                    </p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-studio-dark p-4 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">סוג קול</h4>
                    <p className="text-blue-400">{analysisData.vocalType}</p>
                  </div>
                  <div className="bg-studio-dark p-4 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">סגנון מוזיקלי</h4>
                    <p className="text-blue-400">{analysisData.genre}</p>
                  </div>
                  <div className="bg-studio-dark p-4 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">טווח פריקוונסי</h4>
                    <p className="text-blue-400">{analysisData.frequencyRange}</p>
                  </div>
                  <div className="bg-studio-dark p-4 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">מטרת סאונד</h4>
                    <p className="text-blue-400">{analysisData.targetSound}</p>
                  </div>
                </div>
                
                <div className="bg-studio-dark p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-3">בעיות שזוהו</h4>
                  <ul className="space-y-2">
                    {analysisData.issues.map((issue, index) => (
                      <li key={index} className="text-red-400 flex items-center">
                        <div className="w-2 h-2 bg-red-400 rounded-full ml-2"></div>
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-studio-dark p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-3">המלצות כלליות</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(analysisData.recommendations).map(([key, value]) => (
                      <div key={key} className="flex items-start">
                        <div className="w-3 h-3 bg-green-400 rounded-full mt-2 ml-2 flex-shrink-0"></div>
                        <div>
                          <div className="text-white font-medium capitalize">{key}</div>
                          <div className="text-gray-400 text-sm">{value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* כפתור לניתוח מחדש */}
                <div className="text-center pt-4">
                  <Button 
                    onClick={() => setAnalysisData(null)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2"
                  >
                    <Settings className="w-4 h-4 ml-2" />
                    ניתוח מחדש
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* המלצות פלאגינים */}
        <div className="space-y-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">פלאגינים מומלצים מהשורה הראשונה</h2>
            <div className="flex space-x-2 space-x-reverse">
              <span className="px-3 py-1 bg-green-600 text-white text-sm rounded-full">חינמי</span>
              <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">מקצועי</span>
              <span className="px-3 py-1 bg-purple-600 text-white text-sm rounded-full">פרימיום</span>
            </div>
          </div>
          
          {/* קומפרסיה */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Settings className="w-5 h-5 ml-2" />
              קומפרסיה ווקאלית
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {topPlugins.vocalCompression.map((plugin, index) => (
                <PluginCard key={index} plugin={plugin} category="compression" />
              ))}
            </div>
          </div>

          {/* EQ */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Settings className="w-5 h-5 ml-2" />
              Equalization
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {topPlugins.vocalEQ.map((plugin, index) => (
                <PluginCard key={index} plugin={plugin} category="eq" />
              ))}
            </div>
          </div>

          {/* ריברב */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Settings className="w-5 h-5 ml-2" />
              ריברב ווקאלי
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {topPlugins.vocalReverb.map((plugin, index) => (
                <PluginCard key={index} plugin={plugin} category="reverb" />
              ))}
            </div>
          </div>

          {/* דיליי */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Settings className="w-5 h-5 ml-2" />
              דיליי ווקאלי
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {topPlugins.vocalDelay.map((plugin, index) => (
                <PluginCard key={index} plugin={plugin} category="delay" />
              ))}
            </div>
          </div>

          {/* סטורציה */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Settings className="w-5 h-5 ml-2" />
              סטורציה ווקאלית
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {topPlugins.vocalSaturation.map((plugin, index) => (
                <PluginCard key={index} plugin={plugin} category="saturation" />
              ))}
            </div>
          </div>
        </div>

        {/* טיפים מקצועיים */}
        <Card className="bg-studio-gray border-studio-gray mt-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Lightbulb className="w-5 h-5 ml-2" />
              טיפים מקצועיים למיקס ווקאלי
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-studio-dark p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">סדר עיבוד מומלץ</h4>
                  <ol className="text-gray-400 text-sm space-y-1">
                    <li>1. ניקוי EQ בסיסי</li>
                    <li>2. קומפרסיה ראשונית</li>
                    <li>3. סטורציה קלה</li>
                    <li>4. EQ מתקדם</li>
                    <li>5. קומפרסיה שניונית</li>
                    <li>6. אפקטים (דיליי, ריברב)</li>
                  </ol>
                </div>
                
                <div className="bg-studio-dark p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">פריקוונסי קריטיים</h4>
                  <ul className="text-gray-400 text-sm space-y-1">
                    <li>• 80-120Hz: בסיס הקול</li>
                    <li>• 200-400Hz: חום וגוף</li>
                    <li>• 2-4kHz: נוכחות וצלילות</li>
                    <li>• 5-8kHz: אוויר וברק</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-studio-dark p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">הגדרות קומפרסיה</h4>
                  <ul className="text-gray-400 text-sm space-y-1">
                    <li>• Ratio: 2:1 - 4:1 לשירה</li>
                    <li>• Attack: 5-15ms (מהיר)</li>
                    <li>• Release: 50-100ms</li>
                    <li>• Threshold: -18dB עד -12dB</li>
                  </ul>
                </div>
                
                <div className="bg-studio-dark p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">אפקטים ווקאליים</h4>
                  <ul className="text-gray-400 text-sm space-y-1">
                    <li>• ריברב: 15-25% mix</li>
                    <li>• דיליי: 1/4 או 1/8 note</li>
                    <li>• סטורציה: 20-30% mix</li>
                    <li>• Pre-delay: 20-40ms</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductionRecommendations; 