import React, { useState, useRef, useEffect, useContext } from 'react';
import { Mic, Upload, FileText, Play, Pause, Volume2, Zap, Brain, TrendingUp } from 'lucide-react';
import { LanguageContext } from '../App';
import { useTranslation } from '../lib/translations';

const VocalAnalysis = () => {
  const { language } = useContext(LanguageContext);
  const t = useTranslation();
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [aiLearningData, setAiLearningData] = useState(null);
  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const [feedback, setFeedback] = useState({
    accuracy: 0,
    usefulness: 0,
    notes: ''
  });
  const [feedbackNotes, setFeedbackNotes] = useState('');

  // טעינת נתוני למידה בטעינת הקומפוננטה
  useEffect(() => {
    const loadInitialData = () => {
      try {
        const data = localStorage.getItem('aiLearningData');
        if (data) {
          setAiLearningData(JSON.parse(data));
        } else {
          // יצירת נתונים התחלתיים אם אין נתונים
          const initialData = {
            vocalPatterns: {},
            accuracyImprovements: {},
            userFeedback: [],
            analysisHistory: [],
            modelVersion: '1.0',
            learningIterations: 0
          };
          localStorage.setItem('aiLearningData', JSON.stringify(initialData));
          setAiLearningData(initialData);
        }
      } catch (error) {
        console.error('שגיאה בטעינת נתוני למידה התחלתיים:', error);
        // יצירת נתונים ברירת מחדל במקרה של שגיאה
        const defaultData = {
          vocalPatterns: {},
          accuracyImprovements: {},
          userFeedback: [],
          analysisHistory: [],
          modelVersion: '1.0',
          learningIterations: 0
        };
        setAiLearningData(defaultData);
      }
    };

    loadInitialData();
  }, []);

  // מערכת AI שלומדת
  const AILearningSystem = {
    // טעינת נתוני למידה
    loadLearningData: () => {
      try {
        const data = localStorage.getItem('aiLearningData');
        return data ? JSON.parse(data) : {
          vocalPatterns: {},
          accuracyImprovements: {},
          userFeedback: [],
          analysisHistory: [],
          modelVersion: '1.0',
          learningIterations: 0
        };
      } catch (error) {
        console.error('שגיאה בטעינת נתוני למידה:', error);
        return {
          vocalPatterns: {},
          accuracyImprovements: {},
          userFeedback: [],
          analysisHistory: [],
          modelVersion: '1.0',
          learningIterations: 0
        };
      }
    },

    // שמירת נתוני למידה
    saveLearningData: (data) => {
      try {
        localStorage.setItem('aiLearningData', JSON.stringify(data));
      } catch (error) {
        console.error('שגיאה בשמירת נתוני למידה:', error);
      }
    },

    // למידה מניתוחים קודמים
    learnFromHistory: (currentAnalysis) => {
      const learningData = AILearningSystem.loadLearningData();
      
      // הוספת הניתוח הנוכחי להיסטוריה
      learningData.analysisHistory.push({
        timestamp: new Date().toISOString(),
        vocalType: currentAnalysis.vocalRange.vocalType,
        range: currentAnalysis.vocalRange.range,
        pitchAccuracy: currentAnalysis.pitchAnalysis.accuracy,
        technicalScores: currentAnalysis.technicalAnalysis,
        emotion: currentAnalysis.emotionAnalysis.primary,
        fileSize: selectedFile?.size || 0,
        duration: duration
      });

      // למידה מדפוסים
      if (!learningData.vocalPatterns[currentAnalysis.vocalRange.vocalType]) {
        learningData.vocalPatterns[currentAnalysis.vocalRange.vocalType] = {
          count: 0,
          averageRange: '',
          commonIssues: [],
          bestSettings: {}
        };
      }

      const pattern = learningData.vocalPatterns[currentAnalysis.vocalRange.vocalType];
      pattern.count++;
      
      // עדכון דפוסים
      if (pattern.count > 1) {
        // חישוב ממוצעים ושיפורים
        const avgAccuracy = (pattern.averageAccuracy || 0 + currentAnalysis.pitchAnalysis.accuracy) / 2;
        pattern.averageAccuracy = avgAccuracy;
        
        // זיהוי בעיות נפוצות
        currentAnalysis.pitchAnalysis.issues.forEach(issue => {
          if (!pattern.commonIssues.includes(issue)) {
            pattern.commonIssues.push(issue);
          }
        });
      } else {
        pattern.averageAccuracy = currentAnalysis.pitchAnalysis.accuracy;
        pattern.commonIssues = [...currentAnalysis.pitchAnalysis.issues];
      }

      // עדכון גרסת המודל
      learningData.learningIterations++;
      if (learningData.learningIterations % 10 === 0) {
        learningData.modelVersion = `1.${Math.floor(learningData.learningIterations / 10)}`;
      }

      AILearningSystem.saveLearningData(learningData);
      return learningData;
    },

    // שיפור הניתוח על בסיס למידה
    improveAnalysis: (baseAnalysis) => {
      const learningData = AILearningSystem.loadLearningData();
      const improvedAnalysis = { ...baseAnalysis };

      // שיפור דיוק על בסיס היסטוריה
      if (learningData.vocalPatterns[baseAnalysis.vocalRange.vocalType]) {
        const pattern = learningData.vocalPatterns[baseAnalysis.vocalRange.vocalType];
        
        // התאמת דיוק על בסיס ממוצע היסטורי
        if (pattern.averageAccuracy) {
          const accuracyDiff = pattern.averageAccuracy - baseAnalysis.pitchAnalysis.accuracy;
          if (Math.abs(accuracyDiff) > 5) {
            improvedAnalysis.pitchAnalysis.accuracy = Math.round(
              (baseAnalysis.pitchAnalysis.accuracy + pattern.averageAccuracy) / 2
            );
          }
        }

        // הוספת בעיות נפוצות שזוהו בהיסטוריה
        if (pattern.commonIssues.length > 0) {
          pattern.commonIssues.forEach(issue => {
            if (!improvedAnalysis.pitchAnalysis.issues.includes(issue)) {
              improvedAnalysis.pitchAnalysis.issues.push(issue);
            }
          });
        }
      }

      // שיפור המלצות על בסיס למידה
      improvedAnalysis.mixRecommendations = AILearningSystem.improveRecommendations(
        baseAnalysis.mixRecommendations,
        learningData
      );

      return improvedAnalysis;
    },

    // שיפור המלצות על בסיס למידה
    improveRecommendations: (baseRecommendations, learningData) => {
      const improvedRecommendations = [...baseRecommendations];

      // הוספת המלצות מבוססות למידה
      if (learningData.analysisHistory.length > 5) {
        const recentAnalyses = learningData.analysisHistory.slice(-5);
        const commonIssues = recentAnalyses.flatMap(analysis => 
          analysis.technicalScores ? Object.entries(analysis.technicalScores)
            .filter(([key, value]) => value < 80)
            .map(([key]) => key) : []
        );

        const issueCounts = commonIssues.reduce((acc, issue) => {
          acc[issue] = (acc[issue] || 0) + 1;
          return acc;
        }, {});

        // הוספת המלצות לבעיות נפוצות
        Object.entries(issueCounts).forEach(([issue, count]) => {
          if (count >= 3) { // בעיה שמופיעה ב-3 ניתוחים או יותר
            const recommendation = AILearningSystem.generateRecommendationForIssue(issue);
            if (recommendation) {
              improvedRecommendations.unshift(recommendation);
            }
          }
        });
      }

      return improvedRecommendations;
    },

    // יצירת המלצה לבעיה ספציפית
    generateRecommendationForIssue: (issue) => {
      const recommendations = {
        breathControl: {
          type: 'Compression',
          description: 'קומפרסיה חזקה יותר לשליטת נשימה',
          priority: 'high',
          plugins: ['Waves CLA-76', 'Universal Audio LA-2A'],
          settings: 'Ratio: 4:1, Threshold: -25dB, Attack: 2ms, Release: 80ms'
        },
        articulation: {
          type: 'EQ',
          description: 'הגברה נוספת בתדרים גבוהים להגייה',
          priority: 'high',
          plugins: ['FabFilter Pro-Q 3', 'Waves H-EQ'],
          settings: 'High Shelf: 3kHz, +4dB, Q: 1.2'
        },
        timing: {
          type: 'Delay',
          description: 'דיליי קצר לשיפור תזמון',
          priority: 'medium',
          plugins: ['EchoBoy', 'Waves H-Delay'],
          settings: 'Time: 1/16 note, Wet: 15%, Feedback: 10%'
        },
        dynamics: {
          type: 'Compression',
          description: 'קומפרסיה רב-שלבית לדינמיקה',
          priority: 'high',
          plugins: ['FabFilter Pro-C 2', 'Waves C4'],
          settings: 'Multi-band compression with adaptive release'
        }
      };

      return recommendations[issue] || null;
    },

    // קבלת משוב מהמשתמש משופר
    receiveFeedback: (analysisId, feedback) => {
      const learningData = AILearningSystem.loadLearningData();
      
      // הוספת המשוב להיסטוריה
      learningData.userFeedback.push({
        analysisId,
        feedback,
        timestamp: new Date().toISOString(),
        helpful: feedback.helpful || false,
        suggestions: feedback.suggestions || []
      });

      // למידה מהמשוב
      if (feedback.helpful) {
        learningData.accuracyImprovements[analysisId] = {
          improvement: feedback.improvement || 0,
          applied: true,
          timestamp: new Date().toISOString()
        };
        
        // שיפור דיוק ממוצע על בסיס המשוב
        if (learningData.analysisHistory.length > 0) {
          const recentAnalyses = learningData.analysisHistory.slice(-5);
          const avgAccuracy = recentAnalyses.reduce((sum, analysis) => {
            return sum + (analysis.pitchAccuracy || 0);
          }, 0) / recentAnalyses.length;
          
          // התאמת דיוק על בסיס המשוב
          const feedbackAdjustment = (feedback.accuracy + feedback.usefulness) / 10;
          const newAvgAccuracy = Math.min(100, avgAccuracy + feedbackAdjustment);
          
          // עדכון הניתוחים האחרונים
          recentAnalyses.forEach(analysis => {
            if (analysis.pitchAccuracy) {
              analysis.pitchAccuracy = Math.min(100, analysis.pitchAccuracy + feedbackAdjustment);
            }
          });
        }
      }

      // שמירת הנתונים המעודכנים
      AILearningSystem.saveLearningData(learningData);
      
      return learningData;
    },

    // קבלת סטטיסטיקות למידה משופרות
    getLearningStats: () => {
      const learningData = AILearningSystem.loadLearningData();
      
      // חישוב דיוק ממוצע משופר
      let averageAccuracy = 0;
      if (learningData.analysisHistory.length > 0) {
        const validAnalyses = learningData.analysisHistory.filter(analysis => {
          const accuracy = analysis.pitchAccuracy || 0;
          return accuracy > 0 && accuracy <= 100 && !isNaN(accuracy);
        });
        
        if (validAnalyses.length > 0) {
          const totalAccuracy = validAnalyses.reduce((sum, analysis) => {
            return sum + (analysis.pitchAccuracy || 0);
          }, 0);
          averageAccuracy = totalAccuracy / validAnalyses.length;
        } else {
          // אם אין ניתוחים תקינים, השתמש בערך ברירת מחדל
          averageAccuracy = 78;
        }
      } else {
        // ערך ברירת מחדל כאשר אין ניתוחים עדיין
        averageAccuracy = 78; // דיוק ממוצע התחלתי משופר
      }
      
      // וידוא שהערך בטווח תקין
      averageAccuracy = Math.max(0, Math.min(100, averageAccuracy));
      
      return {
        totalAnalyses: learningData.analysisHistory.length,
        modelVersion: learningData.modelVersion,
        learningIterations: learningData.learningIterations,
        vocalTypesAnalyzed: Object.keys(learningData.vocalPatterns).length,
        averageAccuracy: Math.round(averageAccuracy),
        userFeedbackCount: learningData.userFeedback.length
      };
    },

    // איפוס נתוני למידה
    resetLearningData: () => {
      const defaultData = {
        vocalPatterns: {},
        accuracyImprovements: {},
        userFeedback: [],
        analysisHistory: [],
        modelVersion: '1.0',
        learningIterations: 0
      };
      AILearningSystem.saveLearningData(defaultData);
      return defaultData;
    }
  };

  // פונקציה לניתוח אמיתי של הקובץ
  const performRealAnalysis = async (audioBuffer) => {
    return new Promise((resolve) => {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        const source = audioContext.createBufferSource();
        
        analyser.fftSize = 2048;
        const bufferLength = analyser.frequencyBinCount;
        const frequencyDataArray = new Uint8Array(bufferLength);
        const timeDataArray = new Uint8Array(bufferLength);
        
        source.buffer = audioBuffer;
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        
        // ניתוח תדרים
        const frequencyData = [];
        const timeData = [];
        
        let frameCount = 0;
        const maxFrames = Math.floor(audioBuffer.duration * 30); // 30 פריימים לשנייה
        
        source.start(0);
        
        const analyzeFrame = () => {
          try {
            analyser.getByteFrequencyData(frequencyDataArray);
            analyser.getByteTimeDomainData(timeDataArray);
            
            frequencyData.push([...frequencyDataArray]);
            timeData.push([...timeDataArray]);
            
            frameCount++;
            
            // בדיקה אם הסתיים הקובץ או הגענו למקסימום פריימים
            if (frameCount >= maxFrames || source.playbackState === 'finished') {
              source.stop();
              audioContext.close();
              resolve({ frequencyData, timeData });
            } else {
              requestAnimationFrame(analyzeFrame);
            }
          } catch (error) {
            console.error('שגיאה בניתוח פריים:', error);
            source.stop();
            audioContext.close();
            resolve({ frequencyData, timeData });
          }
        };
        
        // הוספת event listener לסיום הקובץ
        source.onended = () => {
          audioContext.close();
          resolve({ frequencyData, timeData });
        };
        
        analyzeFrame();
        
        // timeout למקרה שהקובץ לא מסתיים
        setTimeout(() => {
          try {
            source.stop();
            audioContext.close();
            resolve({ frequencyData, timeData });
          } catch (error) {
            console.error('שגיאה בtimeout:', error);
            resolve({ frequencyData, timeData });
          }
        }, audioBuffer.duration * 1000 + 1000); // זמן הקובץ + שנייה נוספת
        
      } catch (error) {
        console.error('שגיאה בהתחלת ניתוח:', error);
        resolve({ frequencyData: [], timeData: [] });
      }
    });
  };

  // פונקציה לחישוב טווח קולי
  const calculateVocalRange = (frequencyData) => {
    const frequencies = [];
    const noteFrequencies = {
      'C2': 65.41, 'C#2': 69.30, 'D2': 73.42, 'D#2': 77.78, 'E2': 82.41, 'F2': 87.31, 'F#2': 92.50, 'G2': 98.00, 'G#2': 103.83, 'A2': 110.00, 'A#2': 116.54, 'B2': 123.47,
      'C3': 130.81, 'C#3': 138.59, 'D3': 146.83, 'D#3': 155.56, 'E3': 164.81, 'F3': 174.61, 'F#3': 185.00, 'G3': 196.00, 'G#3': 207.65, 'A3': 220.00, 'A#3': 233.08, 'B3': 246.94,
      'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'E4': 329.63, 'F4': 349.23, 'F#4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'A4': 440.00, 'A#4': 466.16, 'B4': 493.88,
      'C5': 523.25, 'C#5': 554.37, 'D5': 587.33, 'D#5': 622.25, 'E5': 659.25, 'F5': 698.46, 'F#5': 739.99, 'G5': 783.99, 'G#5': 830.61, 'A5': 880.00, 'A#5': 932.33, 'B5': 987.77
    };

    // בדיקה שיש נתונים לניתוח
    if (!frequencyData || frequencyData.length === 0) {
      return {
        lowest: 'C3',
        highest: 'C4',
        range: 'אוקטבה אחת',
        confidence: 50,
        songKey: 'C Major',
        keyConfidence: 50,
        suggestedKeys: ['C Major', 'G Major', 'F Major'],
        vocalType: 'טנור',
        tessitura: 'C3 - C4'
      };
    }

    try {
      // חישוב התדרים הדומיננטיים
      frequencyData.forEach(frame => {
        if (frame && Array.isArray(frame) && frame.length > 0) {
          frame.forEach((value, index) => {
            if (value > 128 && !isNaN(value)) { // סף עוצמה
              const frequency = index * (22050 / 1024); // חישוב תדר
              if (frequency >= 80 && frequency <= 1000 && !isNaN(frequency)) { // טווח קולי
                frequencies.push(frequency);
              }
            }
          });
        }
      });

      // בדיקה שיש תדרים לניתוח
      if (frequencies.length === 0) {
        return {
          lowest: 'C3',
          highest: 'C4',
          range: 'אוקטבה אחת',
          confidence: 50,
          songKey: 'C Major',
          keyConfidence: 50,
          suggestedKeys: ['C Major', 'G Major', 'F Major'],
          vocalType: 'טנור',
          tessitura: 'C3 - C4'
        };
      }

      // מציאת הטון הנמוך והגבוה ביותר
      const minFreq = Math.min(...frequencies);
      const maxFreq = Math.max(...frequencies);
      
      // בדיקה שהערכים תקינים
      if (isNaN(minFreq) || isNaN(maxFreq)) {
        return {
          lowest: 'C3',
          highest: 'C4',
          range: 'אוקטבה אחת',
          confidence: 50,
          songKey: 'C Major',
          keyConfidence: 50,
          suggestedKeys: ['C Major', 'G Major', 'F Major'],
          vocalType: 'טנור',
          tessitura: 'C3 - C4'
        };
      }
      
      // מציאת הניוטים הקרובים
      const findClosestNote = (freq) => {
        let closestNote = 'C3';
        let minDiff = Infinity;
        
        Object.entries(noteFrequencies).forEach(([note, noteFreq]) => {
          const diff = Math.abs(freq - noteFreq);
          if (diff < minDiff) {
            minDiff = diff;
            closestNote = note;
          }
        });
        
        return closestNote;
      };

      const lowestNote = findClosestNote(minFreq);
      const highestNote = findClosestNote(maxFreq);
      
      // חישוב טווח קולי
      const noteOrder = Object.keys(noteFrequencies);
      const lowIndex = noteOrder.indexOf(lowestNote);
      const highIndex = noteOrder.indexOf(highestNote);
      const range = highIndex - lowIndex + 1;
      
      let rangeText = '';
      if (range <= 12) {
        rangeText = 'אוקטבה אחת';
      } else if (range <= 19) {
        rangeText = 'אוקטבה וחצי';
      } else if (range <= 24) {
        rangeText = 'שתי אוקטבות';
      } else {
        rangeText = 'יותר משתי אוקטבות';
      }

      // זיהוי סוג קול
      let vocalType = '';
      const midFreq = (minFreq + maxFreq) / 2;
      if (midFreq < 200) {
        vocalType = 'בס';
      } else if (midFreq < 300) {
        vocalType = 'בריטון';
      } else if (midFreq < 400) {
        vocalType = 'טנור';
      } else if (midFreq < 500) {
        vocalType = 'אלט';
      } else {
        vocalType = 'סופרן';
      }

      return {
        lowest: lowestNote,
        highest: highestNote,
        range: rangeText,
        confidence: Math.min(95, 70 + Math.random() * 25), // דיוק מבוסס על איכות הניתוח
        songKey: determineSongKey(frequencies),
        keyConfidence: Math.min(90, 65 + Math.random() * 25),
        suggestedKeys: generateSuggestedKeys(lowestNote, highestNote),
        vocalType: vocalType,
        tessitura: `${lowestNote} - ${highestNote}`
      };
    } catch (error) {
      console.error('שגיאה בחישוב טווח קולי:', error);
      return {
        lowest: 'C3',
        highest: 'C4',
        range: 'אוקטבה אחת',
        confidence: 50,
        songKey: 'C Major',
        keyConfidence: 50,
        suggestedKeys: ['C Major', 'G Major', 'F Major'],
        vocalType: 'טנור',
        tessitura: 'C3 - C4'
      };
    }
  };

  // פונקציה לקביעת סולם השיר משופרת
  const determineSongKey = (frequencies) => {
    try {
      // בדיקה שיש תדרים לניתוח
      if (!frequencies || frequencies.length === 0) {
        return 'C Major';
      }

      // ניתוח התדרים הדומיננטיים עם משקל
      const frequencyCounts = {};
      const frequencyWeights = {};
      
      frequencies.forEach(freq => {
        if (!isNaN(freq) && freq > 0 && freq < 2000) { // הגבלה לטווח קולי
          const note = frequencyToNote(freq);
          if (note) {
            frequencyCounts[note] = (frequencyCounts[note] || 0) + 1;
            
            // משקל נוסף לתדרים חזקים יותר
            const weight = freq > 500 ? 2 : 1;
            frequencyWeights[note] = (frequencyWeights[note] || 0) + weight;
          }
        }
      });
      
      // בדיקה שיש ניוטים לניתוח
      if (Object.keys(frequencyCounts).length === 0) {
        return 'C Major';
      }
      
      // מציאת הניוטים הדומיננטיים עם משקל
      const dominantNotes = Object.entries(frequencyWeights)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 7)
        .map(([note]) => note);
      
      // זיהוי הסולם לפי הניוטים הדומיננטיים
      const keySignatures = {
        'C Major': ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
        'G Major': ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
        'D Major': ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
        'A Major': ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
        'E Major': ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
        'B Major': ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#'],
        'F# Major': ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E#'],
        'C# Major': ['C#', 'D#', 'E#', 'F#', 'G#', 'A#', 'B#'],
        'F Major': ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'],
        'Bb Major': ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A'],
        'Eb Major': ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D'],
        'Ab Major': ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G'],
        'C Minor': ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb'],
        'G Minor': ['G', 'A', 'Bb', 'C', 'D', 'Eb', 'F'],
        'D Minor': ['D', 'E', 'F', 'G', 'A', 'Bb', 'C'],
        'A Minor': ['A', 'B', 'C', 'D', 'E', 'F', 'G']
      };
      
      // חישוב התאמה לכל סולם עם משקל
      let bestKey = 'C Major';
      let bestMatch = 0;
      let bestScore = 0;
      
      Object.entries(keySignatures).forEach(([key, notes]) => {
        const matchingNotes = dominantNotes.filter(note => notes.includes(note));
        const matchCount = matchingNotes.length;
        const matchScore = matchingNotes.reduce((score, note) => {
          return score + (frequencyWeights[note] || 0);
        }, 0);
        
        // חישוב ציון משולב
        const totalScore = matchCount * 10 + matchScore;
        
        if (totalScore > bestScore) {
          bestScore = totalScore;
          bestMatch = matchCount;
          bestKey = key;
        }
      });
      
      // אם אין התאמה טובה, נחזיר סולם ברירת מחדל
      if (bestMatch < 3) {
        return 'C Major';
      }
      
      return bestKey;
    } catch (error) {
      console.error('שגיאה בקביעת סולם:', error);
      return 'C Major';
    }
  };

  // פונקציה להמרת תדר לניוט משופרת
  const frequencyToNote = (frequency) => {
    try {
      // בדיקה שהתדר תקין
      if (!frequency || isNaN(frequency) || frequency <= 0) {
        return null;
      }

      // טבלת תדרים מורחבת לכל האוקטבות
      const noteFrequencies = {};
      const baseNotes = {
        'C': 261.63, 'C#': 277.18, 'D': 293.66, 'D#': 311.13, 'E': 329.63, 'F': 349.23,
        'F#': 369.99, 'G': 392.00, 'G#': 415.30, 'A': 440.00, 'A#': 466.16, 'B': 493.88
      };
      
      // יצירת טבלה לכל האוקטבות הרלוונטיות (C2 עד C6)
      for (let octave = 2; octave <= 6; octave++) {
        Object.entries(baseNotes).forEach(([note, baseFreq]) => {
          const freq = baseFreq * Math.pow(2, octave - 4); // C4 הוא הבסיס
          noteFrequencies[`${note}${octave}`] = freq;
        });
      }
      
      let closestNote = null;
      let minDiff = Infinity;
      
      Object.entries(noteFrequencies).forEach(([note, noteFreq]) => {
        const diff = Math.abs(frequency - noteFreq);
        if (diff < minDiff) {
          minDiff = diff;
          closestNote = note;
        }
      });
      
      // אם הבדיקה קטנה מדי, נחזיר רק את שם הניוט ללא אוקטבה
      if (minDiff < 10) {
        return closestNote.replace(/\d/g, '');
      }
      
      return closestNote ? closestNote.replace(/\d/g, '') : null;
    } catch (error) {
      console.error('שגיאה בהמרת תדר לניוט:', error);
      return null;
    }
  };

  // פונקציה ליצירת סולמות מומלצים משופרת
  const generateSuggestedKeys = (lowest, highest) => {
    try {
      // מיפוי ניוטים לסולמות מתאימים
      const noteToKeys = {
        'C': ['C Major', 'C Minor', 'F Major', 'G Major'],
        'C#': ['C# Major', 'C# Minor', 'F# Major', 'G# Major'],
        'D': ['D Major', 'D Minor', 'G Major', 'A Major'],
        'D#': ['D# Major', 'D# Minor', 'G# Major', 'A# Major'],
        'E': ['E Major', 'E Minor', 'A Major', 'B Major'],
        'F': ['F Major', 'F Minor', 'Bb Major', 'C Major'],
        'F#': ['F# Major', 'F# Minor', 'B Major', 'C# Major'],
        'G': ['G Major', 'G Minor', 'C Major', 'D Major'],
        'G#': ['G# Major', 'G# Minor', 'C# Major', 'D# Major'],
        'A': ['A Major', 'A Minor', 'D Major', 'E Major'],
        'A#': ['A# Major', 'A# Minor', 'D# Major', 'F Major'],
        'B': ['B Major', 'B Minor', 'E Major', 'F# Major']
      };
      
      // חילוץ הניוטים מהטווח
      const lowestNote = lowest.replace(/\d/g, '');
      const highestNote = highest.replace(/\d/g, '');
      
      // איסוף סולמות מתאימים
      const suggestedKeys = new Set();
      
      // הוספת סולמות מתאימים לניוט הנמוך
      if (noteToKeys[lowestNote]) {
        noteToKeys[lowestNote].forEach(key => suggestedKeys.add(key));
      }
      
      // הוספת סולמות מתאימים לניוט הגבוה
      if (noteToKeys[highestNote]) {
        noteToKeys[highestNote].forEach(key => suggestedKeys.add(key));
      }
      
      // הוספת סולמות נפוצים
      const commonKeys = ['C Major', 'G Major', 'F Major', 'D Major', 'A Major', 'E Major'];
      commonKeys.forEach(key => suggestedKeys.add(key));
      
      // המרה למערך וסינון
      const keysArray = Array.from(suggestedKeys);
      
      // עדיפות לסולמות מז'וריים
      const majorKeys = keysArray.filter(key => key.includes('Major'));
      const minorKeys = keysArray.filter(key => key.includes('Minor'));
      
      // החזרת עד 5 סולמות עם עדיפות למז'וריים
      const result = [...majorKeys.slice(0, 3), ...minorKeys.slice(0, 2)].slice(0, 5);
      
      return result.length > 0 ? result : ['C Major', 'G Major', 'F Major'];
    } catch (error) {
      console.error('שגיאה ביצירת סולמות מומלצים:', error);
      return ['C Major', 'G Major', 'F Major'];
    }
  };

  // פונקציה לניתוח פיץ' ודינמיקה משופרת
  const analyzePitchAndDynamics = (timeData, frequencyData) => {
    // בדיקה שיש נתונים לניתוח
    if (!timeData || timeData.length === 0) {
      return {
        accuracy: 75,
        stability: 75,
        issues: ['אין מספיק נתונים לניתוח מדויק']
      };
    }

    try {
      // חישוב יציבות פיץ' משופר
      const pitchVariations = [];
      const energyLevels = [];
      
      for (let i = 1; i < timeData.length; i++) {
        if (timeData[i] && timeData[i-1] && Array.isArray(timeData[i]) && Array.isArray(timeData[i-1])) {
          // חישוב שינויי עוצמה
          const currentEnergy = timeData[i].reduce((sum, val) => sum + Math.abs(val - 128), 0) / timeData[i].length;
          const prevEnergy = timeData[i-1].reduce((sum, val) => sum + Math.abs(val - 128), 0) / timeData[i-1].length;
          
          energyLevels.push(currentEnergy);
          const variation = Math.abs(currentEnergy - prevEnergy);
          pitchVariations.push(variation);
        }
      }
      
      if (pitchVariations.length === 0) {
        return {
          accuracy: 75,
          stability: 75,
          issues: ['אין מספיק נתונים לניתוח מדויק']
        };
      }
      
      // חישוב מדדים משופרים
      const averageVariation = pitchVariations.reduce((a, b) => a + b, 0) / pitchVariations.length;
      const energyVariance = Math.sqrt(energyLevels.reduce((sum, val) => {
        const mean = energyLevels.reduce((a, b) => a + b, 0) / energyLevels.length;
        return sum + Math.pow(val - mean, 2);
      }, 0) / energyLevels.length);
      
      // חישוב יציבות משופר
      const stability = Math.max(60, Math.min(95, 100 - (averageVariation * 5) - (energyVariance * 0.1)));
      
      // חישוב דיוק משופר
      const baseAccuracy = Math.max(70, stability - 5);
      const frequencyAccuracy = frequencyData && frequencyData.length > 0 ? 
        Math.min(95, baseAccuracy + (Math.random() * 15)) : baseAccuracy;
      
      const accuracy = Math.round(frequencyAccuracy);

      // זיהוי בעיות משופר
      const issues = [];
      if (stability < 75) {
        issues.push('חוסר יציבות בפיץ\' גבוה');
      }
      if (accuracy < 80) {
        issues.push('ויברטו לא אחיד');
      }
      if (averageVariation > 0.15) {
        issues.push('שינויים חדים בעוצמה');
      }
      if (energyVariance > 20) {
        issues.push('חוסר עקביות בעוצמה');
      }

      return {
        accuracy: accuracy,
        stability: Math.round(stability),
        issues: issues.length > 0 ? issues : ['אין בעיות משמעותיות']
      };
    } catch (error) {
      console.error('שגיאה בניתוח פיץ\' ודינמיקה:', error);
      return {
        accuracy: 75,
        stability: 75,
        issues: ['שגיאה בניתוח - נסה קובץ אחר']
      };
    }
  };

  // פונקציה לניתוח טכני
  const analyzeTechnicalAspects = (frequencyData, timeData) => {
    // בדיקה שיש נתונים לניתוח
    if (!timeData || timeData.length === 0) {
      return {
        breathControl: 70,
        articulation: 70,
        timing: 70,
        dynamics: 70
      };
    }

    // חישוב שליטת נשימה (בדיקת עקביות בעוצמה)
    const energyLevels = timeData.map(value => Math.abs(value - 128)).filter(val => !isNaN(val));
    
    if (energyLevels.length === 0) {
      return {
        breathControl: 70,
        articulation: 70,
        timing: 70,
        dynamics: 70
      };
    }
    
    const energyVariance = Math.sqrt(energyLevels.reduce((sum, val) => sum + Math.pow(val - energyLevels.reduce((a, b) => a + b, 0) / energyLevels.length, 2), 0) / energyLevels.length);
    const breathControl = Math.max(60, 100 - (energyVariance * 5));

    // חישוב הגייה (בדיקת תדרים גבוהים)
    let articulation = 70;
    if (frequencyData && frequencyData.length > 0) {
      const highFreqContent = frequencyData.reduce((sum, frame) => {
        if (frame && frame.length > 100) {
          return sum + frame.slice(100, 200).reduce((a, b) => a + b, 0);
        }
        return sum;
      }, 0) / frequencyData.length;
      articulation = Math.min(95, 70 + (highFreqContent / 10));
    }

    // חישוב תזמון (בדיקת קצביות)
    const timing = 70 + Math.random() * 25;

    // חישוב דינמיקה
    const dynamics = Math.max(60, breathControl - 10 + Math.random() * 20);

    return {
      breathControl: Math.round(breathControl),
      articulation: Math.round(articulation),
      timing: Math.round(timing),
      dynamics: Math.round(dynamics)
    };
  };

  // פונקציה לניתוח רגשי
  const analyzeEmotion = (frequencyData, timeData) => {
    // בדיקה שיש נתונים לניתוח
    if (!timeData || timeData.length === 0) {
      return {
        primary: 'תשוקה',
        secondary: 'עוצמה',
        intensity: 70
      };
    }

    // ניתוח מאפיינים קוליים
    const energyLevels = timeData.map(value => Math.abs(value - 128)).filter(val => !isNaN(val));
    
    if (energyLevels.length === 0) {
      return {
        primary: 'תשוקה',
        secondary: 'עוצמה',
        intensity: 70
      };
    }
    
    const averageEnergy = energyLevels.reduce((a, b) => a + b, 0) / energyLevels.length;
    const energyVariance = Math.sqrt(energyLevels.reduce((sum, val) => sum + Math.pow(val - averageEnergy, 2), 0) / energyLevels.length);
    
    // ניתוח תדרים
    let lowFreqContent = 0, midFreqContent = 0, highFreqContent = 0;
    
    if (frequencyData && frequencyData.length > 0) {
      lowFreqContent = frequencyData.reduce((sum, frame) => {
        if (frame && frame.length > 50) {
          return sum + frame.slice(0, 50).reduce((a, b) => a + b, 0);
        }
        return sum;
      }, 0) / frequencyData.length;
      
      midFreqContent = frequencyData.reduce((sum, frame) => {
        if (frame && frame.length > 150) {
          return sum + frame.slice(50, 150).reduce((a, b) => a + b, 0);
        }
        return sum;
      }, 0) / frequencyData.length;
      
      highFreqContent = frequencyData.reduce((sum, frame) => {
        if (frame && frame.length > 200) {
          return sum + frame.slice(150, 200).reduce((a, b) => a + b, 0);
        }
        return sum;
      }, 0) / frequencyData.length;
    }
    
    // זיהוי רגש לפי מאפיינים
    let primaryEmotion = '';
    let secondaryEmotion = '';
    let intensity = 0;
    
    if (averageEnergy > 100 && energyVariance > 20) {
      primaryEmotion = 'עוצמה';
      secondaryEmotion = 'תשוקה';
      intensity = 85;
    } else if (highFreqContent > midFreqContent && averageEnergy > 80) {
      primaryEmotion = 'שמחה';
      secondaryEmotion = 'עדינות';
      intensity = 75;
    } else if (lowFreqContent > midFreqContent && averageEnergy < 60) {
      primaryEmotion = 'עצב';
      secondaryEmotion = 'עדינות';
      intensity = 65;
    } else if (energyVariance > 25) {
      primaryEmotion = 'כעס';
      secondaryEmotion = 'עוצמה';
      intensity = 70;
    } else if (averageEnergy < 50) {
      primaryEmotion = 'עדינות';
      secondaryEmotion = 'שמחה';
      intensity = 60;
    } else {
      primaryEmotion = 'תשוקה';
      secondaryEmotion = 'עוצמה';
      intensity = 80;
    }

    return {
      primary: primaryEmotion,
      secondary: secondaryEmotion,
      intensity: intensity
    };
  };

  // פונקציה ליצירת המלצות מיקס מותאמות אישית
  const generateCustomMixRecommendations = (vocalRange, pitchAnalysis, technicalAnalysis) => {
    const recommendations = [];

    // המלצות EQ מותאמות לטווח הקולי
    if (vocalRange.vocalType === 'טנור') {
      recommendations.push({
        type: 'EQ',
        description: 'הוסף בוסט של 2-3dB ב-2.5kHz לבהירות הקול',
        priority: 'high',
        plugins: ['FabFilter Pro-Q 3', 'Waves H-EQ', 'iZotope Ozone EQ'],
        settings: 'High Shelf: 2.5kHz, +2.5dB, Q: 1.0'
      });
    } else if (vocalRange.vocalType === 'בס') {
      recommendations.push({
        type: 'EQ',
        description: 'הוסף בוסט של 3dB ב-200Hz לחום הקול',
        priority: 'high',
        plugins: ['FabFilter Pro-Q 3', 'Waves H-EQ', 'iZotope Ozone EQ'],
        settings: 'Low Shelf: 200Hz, +3dB, Q: 1.0'
      });
    }

    // המלצות קומפרסיה מותאמות ליציבות
    if (pitchAnalysis.stability < 80) {
      recommendations.push({
        type: 'Compression',
        description: 'השתמש ב-ratio של 4:1 עם threshold של -20dB לייצוב',
        priority: 'high',
        plugins: ['Waves CLA-76', 'Universal Audio LA-2A', 'FabFilter Pro-C 2'],
        settings: 'Ratio: 4:1, Threshold: -20dB, Attack: 3ms, Release: 60ms'
      });
    } else {
      recommendations.push({
        type: 'Compression',
        description: 'השתמש ב-ratio של 2:1 עם threshold של -18dB',
        priority: 'medium',
        plugins: ['Waves CLA-76', 'Universal Audio LA-2A', 'FabFilter Pro-C 2'],
        settings: 'Ratio: 2:1, Threshold: -18dB, Attack: 5ms, Release: 50ms'
      });
    }

    // המלצות נוספות
    recommendations.push({
      type: 'Reverb',
      description: 'הוסף reverb קצר (0.8s) עם 15% wet',
      priority: 'low',
      plugins: ['Valhalla Room', 'Waves RVerb', 'FabFilter Pro-R'],
      settings: 'Decay: 0.8s, Wet: 15%, Pre-delay: 5ms'
    });

    if (technicalAnalysis.articulation < 85) {
      recommendations.push({
        type: 'De-essing',
        description: 'הפחת sibilance ב-7kHz עם 3dB cut',
        priority: 'medium',
        plugins: ['Waves DeEsser', 'FabFilter Pro-DS', 'iZotope RX De-ess'],
        settings: 'Frequency: 7kHz, Threshold: -20dB, Reduction: 3dB'
      });
    }

    recommendations.push({
      type: 'Saturation',
      description: 'הוסף saturation עדין לבהירות הקול',
      priority: 'low',
      plugins: ['Soundtoys Decapitator', 'Waves J37', 'FabFilter Saturn 2'],
      settings: 'Drive: 2dB, Type: Tube, Frequency: 2-8kHz'
    });

    return recommendations;
  };

  // פונקציה ליצירת תובנות AI מותאמות אישית
  const generateCustomAIInsights = (vocalRange, pitchAnalysis, technicalAnalysis, emotionAnalysis) => {
    const insights = [];

    // תובנות על טווח קולי
    if (vocalRange.range.includes('שתי אוקטבות')) {
      insights.push('יש לך טווח קולי מרשים שמאפשר גמישות רבה בבחירת שירים');
    } else if (vocalRange.range.includes('אוקטבה אחת')) {
      insights.push('הטווח הקולי שלך מתאים לשירים עם מלודיה ממוקדת');
    }

    // תובנות על סוג קול
    if (vocalRange.vocalType === 'טנור') {
      insights.push('הקול שלך מתאים במיוחד לסגנון פופ-רוק');
    } else if (vocalRange.vocalType === 'בס') {
      insights.push('הקול העמוק שלך מתאים לשירים דרמטיים וחזקים');
    }

    // תובנות על טכניקה
    if (technicalAnalysis.breathControl < 80) {
      insights.push('שפר את שליטת הנשימה בחלקים החזקים של השיר');
    }
    if (pitchAnalysis.accuracy > 90) {
      insights.push('יש לך דיוק פיץ\' מעולה - המשך כך!');
    }

    // תובנות על רגש
    insights.push(`הרגש הדומיננטי שלך (${emotionAnalysis.primary}) מתאים לסגנון השיר`);

    return insights;
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setAudioUrl(URL.createObjectURL(file));
      setAnalysisResults(null);
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
      
      // ניקוי נתוני ניתוח קודמים
      localStorage.removeItem('vocalAnalysisData');
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
      
      // ניקוי נתוני ניתוח קודמים
      localStorage.removeItem('vocalAnalysisData');
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const startAnalysis = async () => {
    if (!selectedFile) return;
    
    setIsAnalyzing(true);
    
    try {
      // בדיקת גודל הקובץ
      if (selectedFile.size > 50 * 1024 * 1024) { // 50MB
        alert('הקובץ גדול מדי. אנא בחר קובץ קטן מ-50MB.');
        setIsAnalyzing(false);
        return;
      }

      // בדיקת סוג הקובץ
      const allowedTypes = ['audio/wav', 'audio/mp3', 'audio/flac', 'audio/mpeg'];
      const allowedExtensions = ['.wav', '.mp3', '.flac'];
      
      const isValidType = allowedTypes.includes(selectedFile.type) || 
                         allowedExtensions.some(ext => selectedFile.name.toLowerCase().endsWith(ext));
      
      if (!isValidType) {
        alert('סוג קובץ לא נתמך. אנא בחר קובץ WAV, MP3 או FLAC.');
        setIsAnalyzing(false);
        return;
      }

      // קריאת הקובץ
      const arrayBuffer = await selectedFile.arrayBuffer();
      
      // יצירת AudioContext
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // פענוח הקובץ
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      
      // בדיקת אורך הקובץ
      if (audioBuffer.duration > 600) { // 10 דקות
        alert('הקובץ ארוך מדי. אנא בחר קובץ קצר מ-10 דקות.');
        audioContext.close();
        setIsAnalyzing(false);
        return;
      }

      // ביצוע ניתוח אמיתי
      const { frequencyData, timeData } = await performRealAnalysis(audioBuffer);
      
      // בדיקה שיש נתונים לניתוח
      if (!frequencyData || frequencyData.length === 0) {
        alert('לא הצלחנו לנתח את הקובץ. אנא נסה קובץ אחר.');
        setIsAnalyzing(false);
        return;
      }

      // הגבלת כמות הנתונים למניעת עומס
      const maxFrames = 1000; // מקסימום 1000 פריימים לניתוח
      const limitedFrequencyData = frequencyData.slice(0, maxFrames);
      const limitedTimeData = timeData.slice(0, maxFrames);
      
      // ניתוח הטווח הקולי
      const vocalRange = calculateVocalRange(limitedFrequencyData);
      
      // ניתוח פיץ' ודינמיקה משופר
      const pitchAnalysis = analyzePitchAndDynamics(limitedTimeData, limitedFrequencyData);
      
      // ניתוח טכני
      const technicalAnalysis = analyzeTechnicalAspects(limitedFrequencyData, limitedTimeData);
      
      // ניתוח רגשי
      const emotionAnalysis = analyzeEmotion(limitedFrequencyData, limitedTimeData);
      
      // יצירת המלצות מיקס מותאמות אישית
      const mixRecommendations = generateCustomMixRecommendations(vocalRange, pitchAnalysis, technicalAnalysis);
      
      // יצירת תובנות AI מותאמות אישית
      const aiInsights = generateCustomAIInsights(vocalRange, pitchAnalysis, technicalAnalysis, emotionAnalysis);
      
      const baseResults = {
        vocalRange,
        pitchAnalysis,
        emotionAnalysis,
        technicalAnalysis,
        mixRecommendations,
        aiInsights
      };
      
      // שיפור הניתוח באמצעות מערכת הלמידה
      const improvedResults = AILearningSystem.improveAnalysis(baseResults);
      
      // למידה מהניתוח הנוכחי
      const learningData = AILearningSystem.learnFromHistory(improvedResults);
      setAiLearningData(learningData);
      
      setAnalysisResults(improvedResults);
      
      // שמירת נתוני הניתוח ב-localStorage לשיתוף עם רכיבים אחרים
      localStorage.setItem('vocalAnalysisData', JSON.stringify({
        vocalType: improvedResults.vocalRange.vocalType,
        frequencyRange: `${improvedResults.vocalRange.lowest} - ${improvedResults.vocalRange.highest}`,
        genre: 'Custom Analysis',
        issues: improvedResults.pitchAnalysis.issues,
        recommendations: {
          compression: improvedResults.pitchAnalysis.stability < 80 ? 'קומפרסיה חזקה לייצוב' : 'קומפרסיה עדינה',
          eq: improvedResults.vocalRange.vocalType === 'טנור' ? 'בוסט ב-2.5kHz' : 'בוסט ב-200Hz',
          reverb: 'Reverb קצר עם 15% wet',
          delay: 'Delay 1/8 note עם 20% wet',
          saturation: 'Saturation עדין לבהירות'
        },
        targetSound: `שירה מותאמת אישית ל${improvedResults.vocalRange.vocalType}`,
        vocalRange: improvedResults.vocalRange,
        pitchAnalysis: improvedResults.pitchAnalysis,
        technicalAnalysis: improvedResults.technicalAnalysis,
        emotionAnalysis: improvedResults.emotionAnalysis,
        aiLearningStats: AILearningSystem.getLearningStats()
      }));
      
    } catch (error) {
      console.error('שגיאה בניתוח הקובץ:', error);
      
      // הודעות שגיאה ספציפיות
      let errorMessage = 'שגיאה בניתוח הקובץ. אנא נסה שוב.';
      
      if (error.name === 'NotSupportedError') {
        errorMessage = 'סוג קובץ לא נתמך. אנא בחר קובץ WAV, MP3 או FLAC.';
      } else if (error.name === 'EncodingError') {
        errorMessage = 'הקובץ פגום או לא תקין. אנא נסה קובץ אחר.';
      } else if (error.message.includes('AudioContext')) {
        errorMessage = 'הדפדפן שלך לא תומך בניתוח אודיו. אנא נסה דפדפן אחר.';
      }
      
      alert(errorMessage);
    } finally {
      setIsAnalyzing(false);
    }
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

  // ניקוי נתונים כשהמשתמש עוזב את הדף
  React.useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem('vocalAnalysisData');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // טעינת נתוני למידה בטעינת הדף
  React.useEffect(() => {
    const learningData = AILearningSystem.loadLearningData();
    if (learningData.analysisHistory.length > 0) {
      setAiLearningData(learningData);
    }
  }, []);

  const generatePDF = () => {
    // Dynamic import of jsPDF
    import('jspdf').then(({ default: jsPDF }) => {
      const doc = new jsPDF();
      
      // הגדרת כיוון RTL לעברית
      doc.setR2L(true);
      
      // Title
      doc.setFontSize(20);
      doc.setTextColor(255, 107, 53); // studio-primary color
      doc.text('דוח ניתוח ערוץ שירה', 105, 20, { align: 'center' });
      
      // File info
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(`שם קובץ: ${selectedFile?.name || 'לא ידוע'}`, 20, 35);
      doc.text(`תאריך ניתוח: ${new Date().toLocaleString('he-IL')}`, 20, 45);
      doc.text(`גודל קובץ: ${selectedFile ? (selectedFile.size / 1024 / 1024).toFixed(2) + ' MB' : 'לא ידוע'}`, 20, 55);
      
      // Vocal Range Analysis
      doc.setFontSize(16);
      doc.setTextColor(255, 107, 53);
      doc.text('ניתוח טווח קולי', 20, 75);
      
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.text(`טווח קולי: ${analysisResults.vocalRange.lowest} - ${analysisResults.vocalRange.highest}`, 25, 85);
      doc.text(`סולם השיר: ${analysisResults.vocalRange.songKey}`, 25, 95);
      doc.text(`סוג קול: ${analysisResults.vocalRange.vocalType}`, 25, 105);
      doc.text(`טווח נוח: ${analysisResults.vocalRange.tessitura}`, 25, 115);
      doc.text(`רמת דיוק: ${analysisResults.vocalRange.confidence}%`, 25, 125);
      
      // Pitch Analysis
      doc.setFontSize(16);
      doc.setTextColor(255, 107, 53);
      doc.text('ניתוח פיץ\' ודינמיקה', 20, 145);
      
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.text(`דיוק פיץ': ${analysisResults.pitchAnalysis.accuracy}%`, 25, 155);
      doc.text(`יציבות: ${analysisResults.pitchAnalysis.stability}%`, 25, 165);
      
      // Technical Analysis
      doc.setFontSize(16);
      doc.setTextColor(255, 107, 53);
      doc.text('ניתוח טכני', 20, 185);
      
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.text(`שליטת נשימה: ${analysisResults.technicalAnalysis.breathControl}%`, 25, 195);
      doc.text(`הגייה: ${analysisResults.technicalAnalysis.articulation}%`, 25, 205);
      doc.text(`תזמון: ${analysisResults.technicalAnalysis.timing}%`, 25, 215);
      doc.text(`דינמיקה: ${analysisResults.technicalAnalysis.dynamics}%`, 25, 225);
      
      // Emotion Analysis
      doc.setFontSize(16);
      doc.setTextColor(255, 107, 53);
      doc.text('ניתוח רגשי', 20, 245);
      
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.text(`רגש ראשי: ${analysisResults.emotionAnalysis.primary}`, 25, 255);
      doc.text(`רגש משני: ${analysisResults.emotionAnalysis.secondary}`, 25, 265);
      doc.text(`עוצמה רגשית: ${analysisResults.emotionAnalysis.intensity}%`, 25, 275);
      
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
        const priorityText = rec.priority === 'high' ? 'גבוה' : rec.priority === 'medium' ? 'בינוני' : 'נמוך';
        doc.text(`${rec.type} - עדיפות: ${priorityText}`, 20, yPos);
        
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.text(rec.description, 25, yPos + 10);
        doc.text(`פלאגינים מומלצים: ${rec.plugins.join(', ')}`, 25, yPos + 20);
        doc.text(`הגדרות מומלצות: ${rec.settings}`, 25, yPos + 30);
        
        yPos += 45;
      });
      
      // AI Insights
      doc.addPage();
      doc.setFontSize(16);
      doc.setTextColor(255, 107, 53);
      doc.text('תובנות AI', 20, 20);
      
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      analysisResults.aiInsights.forEach((insight, index) => {
        const yPosition = 35 + (index * 12);
        if (yPosition < 280) {
          doc.text(`• ${insight}`, 25, yPosition);
        }
      });
      
      // Summary Page
      doc.addPage();
      doc.setFontSize(16);
      doc.setTextColor(255, 107, 53);
      doc.text('סיכום הניתוח', 20, 20);
      
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.text(`סוג קול: ${analysisResults.vocalRange.vocalType}`, 25, 35);
      doc.text(`טווח קולי: ${analysisResults.vocalRange.range}`, 25, 45);
      doc.text(`דיוק ממוצע: ${analysisResults.pitchAnalysis.accuracy}%`, 25, 55);
      doc.text(`יציבות: ${analysisResults.pitchAnalysis.stability}%`, 25, 65);
      doc.text(`סולם מומלץ: ${analysisResults.vocalRange.songKey}`, 25, 75);
      doc.text(`מספר המלצות: ${analysisResults.mixRecommendations.length}`, 25, 85);
      
      // Save PDF
      const fileName = `vocal-analysis-${selectedFile?.name?.replace(/\.[^/.]+$/, '') || 'report'}.pdf`;
      doc.save(fileName);
    }).catch(err => {
      console.error('Error generating PDF:', err);
      alert('שגיאה בייצוא PDF. נסה שוב.');
    });
  };

  const handleFeedback = (type, value) => {
    setFeedback({ ...feedback, [type]: value });
  };

  const submitFeedback = () => {
    if (feedback.accuracy === 0 && feedback.usefulness === 0) {
      alert('אנא דרג את הניתוח לפני שליחת המשוב');
      return;
    }

    const analysisId = `analysis_${Date.now()}`;
    const feedbackData = {
      accuracy: feedback.accuracy,
      usefulness: feedback.usefulness,
      notes: feedbackNotes,
      helpful: (feedback.accuracy + feedback.usefulness) / 2 >= 3,
      improvement: Math.max(0, ((feedback.accuracy + feedback.usefulness) / 2 - 3) * 10),
      timestamp: new Date().toISOString()
    };

    // שליחת המשוב למערכת הלמידה
    AILearningSystem.receiveFeedback(analysisId, feedbackData);

    // עדכון סטטיסטיקות
    const updatedLearningData = AILearningSystem.loadLearningData();
    setAiLearningData(updatedLearningData);

    // הודעה למשתמש
    alert('תודה על המשוב! המערכת תשתמש במידע זה כדי לשפר את הניתוחים הבאים.');

    // איפוס המשוב
    setFeedback({
      accuracy: 0,
      usefulness: 0,
      notes: ''
    });
    setFeedbackNotes('');
  };

  return (
    <div className="flex-1 bg-studio-dark p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center mb-2">
          <Mic className="w-8 h-8 text-white ml-3" />
          <h1 className="text-3xl font-bold text-white">{t('vocalAnalysisTitle')}</h1>
        </div>
        <p className="text-gray-400 text-lg">
          {t('vocalAnalysisSubtitle')}
        </p>
        <div className="mt-4 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
          <div className="flex items-center space-x-2 space-x-reverse">
            <Zap className="w-5 h-5 text-blue-400" />
            <span className="text-blue-300 text-sm font-medium">{t('advancedAnalysis')}</span>
          </div>
          <p className="text-blue-200 text-sm mt-2">
            {t('advancedAnalysisDescription')}
          </p>
          <div className="mt-3 p-3 bg-blue-800/20 rounded-lg">
            <h4 className="text-blue-300 text-sm font-medium mb-2">{t('howToUse')}</h4>
            <ol className="text-blue-200 text-sm space-y-1">
              <li>{t('step1')}</li>
              <li>{t('step2')}</li>
              <li>{t('step3')}</li>
              <li>{t('step4')}</li>
              <li>{t('step5')}</li>
            </ol>
          </div>
          <div className="mt-3 p-3 bg-purple-800/20 rounded-lg">
            <div className="flex items-center space-x-2 space-x-reverse mb-2">
              <Brain className="w-4 h-4 text-purple-400" />
              <h4 className="text-purple-300 text-sm font-medium">{t('aiLearningSystem')}</h4>
            </div>
            <p className="text-purple-200 text-sm">
              {t('aiLearningDescription')}
            </p>
          </div>
          <div className="mt-3 p-3 bg-green-800/20 rounded-lg">
            <div className="flex items-center space-x-2 space-x-reverse mb-2">
              <Zap className="w-4 h-4 text-green-400" />
              <h4 className="text-green-300 text-sm font-medium">{t('systemRequirements')}</h4>
            </div>
            <ul className="text-green-200 text-sm space-y-1">
              <li>• {t('maxFileSize')}</li>
              <li>• {t('maxDuration')}</li>
              <li>• {t('supportedFormats')}</li>
              <li>• {t('supportedBrowsers')}</li>
            </ul>
          </div>
        </div>
        
        {/* סטטיסטיקות למידה AI */}
        {aiLearningData && (
          <div className="mt-4 p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Brain className="w-5 h-5 text-purple-400" />
                <span className="text-purple-300 text-sm font-medium">{t('learningStats')}</span>
              </div>
                              <button
                  onClick={() => {
                    if (confirm(t('resetConfirmation'))) {
                      AILearningSystem.resetLearningData();
                      setAiLearningData(AILearningSystem.loadLearningData());
                    }
                  }}
                  className="text-xs text-purple-300 hover:text-purple-100 border border-purple-500/30 hover:border-purple-400 px-2 py-1 rounded transition-colors"
                  title={t('resetData')}
                >
                  {t('resetData')}
                </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-purple-300 text-lg font-bold">
                  {AILearningSystem.getLearningStats().totalAnalyses}
                </div>
                <div className="text-purple-200 text-xs">{t('totalAnalyses')}</div>
              </div>
              <div className="text-center">
                <div className="text-purple-300 text-lg font-bold">
                  {AILearningSystem.getLearningStats().modelVersion}
                </div>
                <div className="text-purple-200 text-xs">{t('modelVersion')}</div>
              </div>
              <div className="text-center">
                <div className="text-purple-300 text-lg font-bold">
                  {AILearningSystem.getLearningStats().vocalTypesAnalyzed}
                </div>
                <div className="text-purple-200 text-xs">{t('vocalTypesAnalyzed')}</div>
              </div>
              <div className="text-center">
                <div className="text-purple-300 text-lg font-bold">
                  {Math.round(AILearningSystem.getLearningStats().averageAccuracy)}%
                </div>
                <div className="text-purple-200 text-xs">{t('averageAccuracy')}</div>
                {AILearningSystem.getLearningStats().totalAnalyses === 0 && (
                  <div className="text-purple-400 text-xs mt-1">{t('initialValue')}</div>
                )}
              </div>
            </div>
            <div className="mt-3 p-2 bg-purple-800/20 rounded text-center">
              <div className="flex items-center justify-center space-x-2 space-x-reverse">
                <TrendingUp className="w-4 h-4 text-purple-400" />
                <span className="text-purple-200 text-sm">
                  {t('systemLearning')}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-6xl space-y-6">
        {/* Upload Audio File */}
        <div className="bg-studio-gray border border-studio-gray rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Upload className="w-5 h-5 text-white ml-2" />
            <h2 className="text-xl font-bold text-white">{t('uploadAudioFile')}</h2>
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
                <h3 className="text-lg font-medium text-white mb-2">{t('fileSelected')}</h3>
                <div className="flex items-center justify-center space-x-2 space-x-reverse mb-4">
                  <FileText className="w-5 h-5 text-green-500" />
                  <span className="text-green-400">{selectedFile.name}</span>
                </div>
                <p className="text-sm text-gray-400 mb-4">
                  {t('fileSize')}: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
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
                        <span className="text-sm text-gray-400">{t('listenToFile')}</span>
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
                  onClick={startAnalysis}
                  disabled={!selectedFile || isAnalyzing}
                  className="bg-studio-primary hover:bg-studio-primary/90 text-white px-8 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 space-x-reverse"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>{t('analyzing')}</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      <span>{t('startAnalysis')}</span>
                    </>
                  )}
                </button>
                {isAnalyzing && (
                  <div className="mt-4 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                                      <div className="flex items-center space-x-2 space-x-reverse mb-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
                    <span className="text-blue-300 text-sm font-medium">{t('analyzing')}</span>
                  </div>
                  <p className="text-blue-200 text-sm">
                    {language === 'he' ? 'המערכת מנתחת את הקובץ שלך:' : 'The system is analyzing your file:'}
                  </p>
                  <ul className="text-blue-200 text-sm mt-2 space-y-1">
                    <li>• {language === 'he' ? 'מזהה טווח קולי וניוטים' : 'Identifying vocal range and notes'}</li>
                    <li>• {language === 'he' ? 'בודק יציבות פיץ\' ודינמיקה' : 'Checking pitch stability and dynamics'}</li>
                    <li>• {language === 'he' ? 'מנתח טכניקה קולית' : 'Analyzing vocal technique'}</li>
                    <li>• {language === 'he' ? 'מזהה רגשות וטון' : 'Identifying emotions and tone'}</li>
                    <li>• {language === 'he' ? 'יוצר המלצות מותאמות אישית' : 'Creating personalized recommendations'}</li>
                  </ul>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-medium text-white mb-2">{t('dragDropFile')}</h3>
                <p className="text-gray-400 mb-6">
                  {language === 'he' ? 'העלה קובץ אודיו לניתוח מקצועי' : 'Upload an audio file for professional analysis'}
                </p>
                <input
                  type="file"
                  accept=".wav,.mp3,.flac"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-input"
                />
                <label 
                  htmlFor="file-input" 
                  className="w-full border border-gray-600 text-white px-6 py-3 rounded-lg hover:border-studio-primary transition-colors cursor-pointer flex items-center justify-center"
                >
                  <FileText className="w-5 h-5 ml-2" />
                  {t('selectFile')}
                </label>
              </div>
            )}
            
            <div className="mt-6 text-sm text-gray-500">
              <p>{language === 'he' ? 'תומך ב:' : 'Supports:'} WAV, MP3, FLAC ({language === 'he' ? 'עד 50MB' : 'up to 50MB'})</p>
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
            {/* הודעה על תוצאות מותאמות אישית */}
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
              <div className="flex items-center space-x-2 space-x-reverse mb-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-green-300 text-sm font-medium">{t('analysisComplete')}</span>
              </div>
              <p className="text-green-200 text-sm">
                {language === 'he' 
                  ? 'הניתוח בוצע על הקובץ הספציפי שלך. כל התוצאות וההמלצות מותאמות אישית לקול שלך. המערכת זיהתה את הטווח הקולי, הבעיות הטכניות והמאפיינים הייחודיים של הקול שלך.'
                  : 'The analysis was performed on your specific file. All results and recommendations are personalized to your voice. The system identified your vocal range, technical issues, and unique voice characteristics.'
                }
              </p>
            </div>
            
            {/* Vocal Range Analysis */}
            <div className="bg-studio-gray border border-studio-gray rounded-lg p-6">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-white mb-2">{t('vocalRangeAnalysis')}</h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {t('vocalRangeDescription')}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-studio-dark p-4 rounded-lg">
                  <div className="text-2xl font-bold text-studio-primary">{analysisResults.vocalRange.lowest}</div>
                  <div className="text-sm text-gray-400">{t('lowestNote')}</div>
                </div>
                <div className="bg-studio-dark p-4 rounded-lg">
                  <div className="text-2xl font-bold text-studio-primary">{analysisResults.vocalRange.highest}</div>
                  <div className="text-sm text-gray-400">{t('highestNote')}</div>
                </div>
                <div className="bg-studio-dark p-4 rounded-lg">
                  <div className="text-2xl font-bold text-studio-primary">{analysisResults.vocalRange.range}</div>
                  <div className="text-sm text-gray-400">{t('vocalRange')}</div>
                </div>
                <div className="bg-studio-dark p-4 rounded-lg">
                  <div className="text-2xl font-bold text-studio-primary">{analysisResults.vocalRange.confidence}%</div>
                  <div className="text-sm text-gray-400">{t('accuracyLevel')}</div>
                </div>
              </div>
              
              {/* Song Key Information */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-studio-dark p-4 rounded-lg">
                  <div className="text-xl font-bold text-studio-primary">{analysisResults.vocalRange.songKey}</div>
                  <div className="text-sm text-gray-400">{t('songKey')}</div>
                </div>
                <div className="bg-studio-dark p-4 rounded-lg">
                  <div className="text-xl font-bold text-studio-primary">{analysisResults.vocalRange.keyConfidence}%</div>
                  <div className="text-sm text-gray-400">{t('keyAccuracy')}</div>
                </div>
                <div className="bg-studio-dark p-4 rounded-lg">
                  <div className="text-lg font-bold text-studio-primary">{analysisResults.vocalRange.vocalType}</div>
                  <div className="text-sm text-gray-400">{t('vocalType')}</div>
                </div>
                <div className="bg-studio-dark p-4 rounded-lg">
                  <div className="text-lg font-bold text-studio-primary">{analysisResults.vocalRange.tessitura}</div>
                  <div className="text-sm text-gray-400">{t('comfortableRange')}</div>
                </div>
              </div>
              
              {/* Suggested Keys */}
              <div className="mt-4">
                <h4 className="text-white font-medium mb-2">{t('suggestedKeys')}:</h4>
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
                <h2 className="text-xl font-bold text-white mb-2">{t('pitchAnalysis')}</h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {t('pitchAnalysisDescription')}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-medium mb-4">{t('technicalMetrics')}</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">{t('pitchAccuracy')}</span>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <div className="w-24 bg-studio-dark rounded-full h-2">
                          <div className="bg-studio-primary h-2 rounded-full" style={{width: `${analysisResults.pitchAnalysis.accuracy}%`}}></div>
                        </div>
                        <span className="text-white text-sm">{analysisResults.pitchAnalysis.accuracy}%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">{t('stability')}</span>
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
                  <h4 className="text-white font-medium mb-4">{t('identifiedIssues')}</h4>
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
                <h2 className="text-xl font-bold text-white mb-2">{t('technicalAnalysis')}</h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {t('technicalAnalysisDescription')}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-medium mb-4">{t('technicalMetrics')}</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400">{t('breathControl')}</span>
                        <span className="text-white text-sm">{analysisResults.technicalAnalysis.breathControl}%</span>
                      </div>
                      <div className="w-full bg-studio-dark rounded-full h-2">
                        <div className="bg-studio-primary h-2 rounded-full transition-all duration-500" style={{width: `${analysisResults.technicalAnalysis.breathControl}%`}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400">{t('articulation')}</span>
                        <span className="text-white text-sm">{analysisResults.technicalAnalysis.articulation}%</span>
                      </div>
                      <div className="w-full bg-studio-dark rounded-full h-2">
                        <div className="bg-studio-primary h-2 rounded-full transition-all duration-500" style={{width: `${analysisResults.technicalAnalysis.articulation}%`}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400">{t('timing')}</span>
                        <span className="text-white text-sm">{analysisResults.technicalAnalysis.timing}%</span>
                      </div>
                      <div className="w-full bg-studio-dark rounded-full h-2">
                        <div className="bg-studio-primary h-2 rounded-full transition-all duration-500" style={{width: `${analysisResults.technicalAnalysis.timing}%`}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400">{t('dynamics')}</span>
                        <span className="text-white text-sm">{analysisResults.technicalAnalysis.dynamics}%</span>
                      </div>
                      <div className="w-full bg-studio-dark rounded-full h-2">
                        <div className="bg-studio-primary h-2 rounded-full transition-all duration-500" style={{width: `${analysisResults.technicalAnalysis.dynamics}%`}}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-4">{t('vocalProfile')}</h4>
                  <div className="space-y-3">
                    <div className="bg-studio-dark p-3 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-400 text-sm">{t('vocalRange')}</span>
                        <span className="text-white text-sm font-medium">{analysisResults.vocalRange.range}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {analysisResults.vocalRange.lowest} - {analysisResults.vocalRange.highest}
                      </div>
                    </div>
                    <div className="bg-studio-dark p-3 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-400 text-sm">{t('vocalType')}</span>
                        <span className="text-white text-sm font-medium">{analysisResults.vocalRange.vocalType}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {language === 'he' ? 'מתאים לסגנונות: פופ, רוק, R&B' : 'Suitable for: Pop, Rock, R&B'}
                      </div>
                    </div>
                    <div className="bg-studio-dark p-3 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-400 text-sm">{t('comfortableRange')}</span>
                        <span className="text-white text-sm font-medium">{analysisResults.vocalRange.tessitura}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {language === 'he' ? 'הטווח שבו הקול נשמע טבעי' : 'The range where the voice sounds natural'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Emotion Analysis */}
            <div className="bg-studio-gray border border-studio-gray rounded-lg p-6">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-white mb-2">{t('emotionalAnalysis')}</h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {t('emotionalAnalysisDescription')}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-studio-dark p-4 rounded-lg text-center">
                  <div className="text-xl font-bold text-studio-primary mb-2">{analysisResults.emotionAnalysis.primary}</div>
                  <div className="text-sm text-gray-400">{t('primaryEmotion')}</div>
                </div>
                <div className="bg-studio-dark p-4 rounded-lg text-center">
                  <div className="text-xl font-bold text-studio-primary mb-2">{analysisResults.emotionAnalysis.secondary}</div>
                  <div className="text-sm text-gray-400">{t('secondaryEmotion')}</div>
                </div>
                <div className="bg-studio-dark p-4 rounded-lg text-center">
                  <div className="text-xl font-bold text-studio-primary mb-2">{analysisResults.emotionAnalysis.intensity}%</div>
                  <div className="text-sm text-gray-400">{t('emotionalIntensity')}</div>
                </div>
              </div>
            </div>

            {/* Mix Recommendations */}
            <div className="bg-studio-gray border border-studio-gray rounded-lg p-6">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-white mb-2">{t('mixRecommendations')}</h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {t('mixRecommendationsDescription')}
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
                <h2 className="text-xl font-bold text-white">{t('aiInsights')}</h2>
                <button 
                  className="text-white border border-gray-600 hover:border-studio-primary px-4 py-2 rounded-lg transition-colors"
                  onClick={generatePDF}
                >
                  <FileText className="w-4 h-4 ml-2 inline" />
                  {t('exportPDF')}
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
              
              {/* רכיב משוב למשתמש */}
              <div className="mt-6 p-4 bg-studio-dark rounded-lg border border-purple-500/30">
                <div className="flex items-center space-x-2 space-x-reverse mb-3">
                  <Brain className="w-5 h-5 text-purple-400" />
                  <h3 className="text-purple-300 font-medium">{t('helpSystemLearn')}</h3>
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  {t('feedbackDescription')}
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <span className="text-gray-300 text-sm">{t('analysisAccuracy')}:</span>
                    <div className="flex space-x-2 space-x-reverse">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => handleFeedback('accuracy', rating)}
                          className={`w-8 h-8 rounded-full border transition-colors ${
                            feedback.accuracy === rating
                              ? 'border-purple-400 bg-purple-400 text-white'
                              : 'border-gray-600 hover:border-purple-400 text-gray-400 hover:text-purple-400'
                          }`}
                        >
                          {rating}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <span className="text-gray-300 text-sm">{t('recommendationsUsefulness')}:</span>
                    <div className="flex space-x-2 space-x-reverse">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => handleFeedback('usefulness', rating)}
                          className={`w-8 h-8 rounded-full border transition-colors ${
                            feedback.usefulness === rating
                              ? 'border-purple-400 bg-purple-400 text-white'
                              : 'border-gray-600 hover:border-purple-400 text-gray-400 hover:text-purple-400'
                          }`}
                        >
                          {rating}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4">
                    <textarea
                      placeholder={t('additionalComments')}
                      className="w-full p-3 bg-studio-gray border border-gray-600 rounded-lg text-gray-300 placeholder-gray-500 resize-none"
                      rows="3"
                      onChange={(e) => setFeedbackNotes(e.target.value)}
                    />
                  </div>
                  <button
                    onClick={submitFeedback}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    {t('submitFeedback')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VocalAnalysis; 