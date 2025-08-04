import React, { useState, useEffect, useContext } from 'react';
// אייקונים לדוג' (שנה בהתאם למה שיש אצלך)
import { ExternalLink, Volume2, Radio, Waves, Clock, Zap, Star, Award, Crown, Upload, Music, Drumstick, Speaker, Brain, TrendingUp, Target, Sparkles, BarChart3, Mic, Settings, Play, Pause, RotateCcw, Cpu, Activity, Bot, Zap as ZapIcon } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import YAMNetAnalyzer from '../lib/yamnet';
import AIApiService from '../lib/aiApi';
import { AdvancedTempoAnalyzer } from '../lib/tempoAnalysis.js';

// ----- דמה עבור context ושפה -----
const LanguageContext = React.createContext('he');
const useTranslation = () => ({ t: x => x }); // דמה

// ----- מערכת AI לניתוח אודיו עם YAMNet -----
class AudioAnalyzer {
  constructor() {
    this.audioContext = null;
    this.analyser = null;
    this.dataArray = null;
    this.isAnalyzing = false;
    this.yamnetAnalyzer = new YAMNetAnalyzer();
    this.yamnetLoaded = false;
    this.tempoAnalyzer = new AdvancedTempoAnalyzer();
    
    // יצירת מפה של כל הפלאגינים הזמינים
    this.allPluginsMap = this.createAllPluginsMap();
  }

  createAllPluginsMap() {
    const map = {};
    
    // הוספת כל הפלאגינים מ-stemPlugins למפה
    Object.keys(stemPlugins).forEach(stemType => {
      Object.keys(stemPlugins[stemType]).forEach(category => {
        stemPlugins[stemType][category].forEach(plugin => {
          const key = `${plugin.name}_${category}`;
          map[key] = {
            ...plugin,
            sourceStemType: stemType,
            sourceCategory: category
          };
        });
      });
    });
    
    return map;
  }

  // פונקציה למציאת פלאגין מתאים מהמפה
  findPluginByName(name, category) {
    const key = `${name}_${category}`;
    return this.allPluginsMap[key] || null;
  }

  // פונקציה למציאת פלאגין חלופי מאותה קטגוריה
  findAlternativePlugin(category, stemType) {
    if (stemPlugins[stemType] && stemPlugins[stemType][category]) {
      return stemPlugins[stemType][category][0];
    }
    // נסיגה לפלאגין כללי
    return this.findGeneralPlugin(category);
  }

  findGeneralPlugin(category) {
    // חיפוש פלאגין כללי מכל הסטמים
    for (const stemType of Object.keys(stemPlugins)) {
      if (stemPlugins[stemType][category]) {
        return stemPlugins[stemType][category][0];
      }
    }
    return null;
  }

  async initializeAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 2048;
      const bufferLength = this.analyser.frequencyBinCount;
      this.dataArray = new Uint8Array(bufferLength);
      return true;
    } catch (error) {
      console.error('שגיאה באתחול AudioContext:', error);
      return false;
    }
  }

  async analyzeAudioFile(file) {
    if (!this.audioContext) {
      const initialized = await this.initializeAudioContext();
      if (!initialized) return null;
    }

    try {
      const arrayBuffer = await file.arrayBuffer();
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      
      // אתחול מערכת ניתוח טמפו מתקדמת
      await this.tempoAnalyzer.initialize();
      
      // ניתוח טמפו מתקדם
      const advancedTempoAnalysis = await this.tempoAnalyzer.analyzeTempoAdvanced(audioBuffer);
      
      // ניתוח עם YAMNet
      const yamnetAnalysis = await this.performYAMNetAnalysis(audioBuffer);
      
      // ניתוח מסורתי
      const traditionalAnalysis = this.performDeepAnalysis(audioBuffer);
      
      // שילוב התוצאות
      return this.combineAnalyses(traditionalAnalysis, yamnetAnalysis, advancedTempoAnalysis);
    } catch (error) {
      console.error('שגיאה בניתוח הקובץ:', error);
      return null;
    }
  }

  async performYAMNetAnalysis(audioBuffer) {
    try {
      if (!this.yamnetLoaded) {
        console.log('טוען YAMNet...');
        this.yamnetLoaded = await this.yamnetAnalyzer.loadModel();
        if (!this.yamnetLoaded) {
          console.warn('YAMNet לא נטען, ממשיך עם ניתוח מסורתי בלבד');
          return null;
        }
      }

      const yamnetResult = await this.yamnetAnalyzer.analyzeWithYAMNet(audioBuffer);
      if (!yamnetResult) return null;

      return {
        yamnetPredictions: yamnetResult.predictions,
        instrumentAnalysis: this.yamnetAnalyzer.getInstrumentAnalysis(yamnetResult.predictions),
        genreAnalysis: this.yamnetAnalyzer.getGenreAnalysis(yamnetResult.predictions),
        yamnetRecommendations: this.yamnetAnalyzer.getProductionRecommendations(yamnetResult.predictions),
        confidence: yamnetResult.confidence
      };
    } catch (error) {
      console.error('שגיאה בניתוח YAMNet:', error);
      return null;
    }
  }

  combineAnalyses(traditionalAnalysis, yamnetAnalysis, advancedTempoAnalysis) {
    const combined = {
      ...traditionalAnalysis,
      yamnet: yamnetAnalysis,
      advancedTempo: advancedTempoAnalysis
    };

    // שיפור זיהוי כלי נגינה עם YAMNet
    if (yamnetAnalysis && yamnetAnalysis.instrumentAnalysis) {
      combined.enhancedInstruments = this.enhanceInstrumentDetection(
        traditionalAnalysis.instruments,
        yamnetAnalysis.instrumentAnalysis
      );
    }

    // שיפור המלצות עם YAMNet
    if (yamnetAnalysis && yamnetAnalysis.yamnetRecommendations) {
      combined.enhancedRecommendations = this.enhanceRecommendations(
        traditionalAnalysis.recommendations,
        yamnetAnalysis.yamnetRecommendations
      );
    }

    // שילוב ניתוח טמפו מתקדם
    if (advancedTempoAnalysis) {
      combined.enhancedRhythm = {
        ...combined.rhythmicAnalysis,
        advancedTempo: advancedTempoAnalysis.primaryTempo,
        tempoConfidence: advancedTempoAnalysis.confidence,
        beatMap: advancedTempoAnalysis.beatMap,
        timeSignature: advancedTempoAnalysis.timeSignature,
        groove: advancedTempoAnalysis.groove,
        analysisMethods: advancedTempoAnalysis.analysis
      };
    }

    return combined;
  }

  enhanceInstrumentDetection(traditionalInstruments, yamnetInstruments) {
    const enhanced = { ...traditionalInstruments };
    
    // הוספת זיהוי YAMNet לכלי נגינה
    for (const [category, predictions] of Object.entries(yamnetInstruments)) {
      if (predictions.length > 0) {
        const confidence = predictions.reduce((sum, pred) => sum + pred.score, 0) / predictions.length;
        enhanced[category] = {
          ...enhanced[category],
          yamnetConfidence: confidence,
          yamnetPredictions: predictions
        };
      }
    }

    return enhanced;
  }

  enhanceRecommendations(traditionalRecommendations, yamnetRecommendations) {
    const enhanced = { ...traditionalRecommendations };
    
    // הוספת המלצות YAMNet
    for (const [category, recommendations] of Object.entries(yamnetRecommendations)) {
      if (recommendations.length > 0) {
        enhanced[category] = [
          ...(enhanced[category] || []),
          ...recommendations.map(rec => ({
            ...rec,
            source: 'YAMNet',
            priority: 'high'
          }))
        ];
      }
    }

    return enhanced;
  }

  performDeepAnalysis(audioBuffer) {
    const analysis = {
      // ניתוח תדרים
      frequencyAnalysis: this.analyzeFrequencySpectrum(audioBuffer),
      
      // ניתוח דינמיקה
      dynamicsAnalysis: this.analyzeDynamics(audioBuffer),
      
      // ניתוח ריתמי
      rhythmicAnalysis: this.analyzeRhythm(audioBuffer),
      
      // זיהוי כלי נגינה
      instrumentDetection: this.detectInstruments(audioBuffer),
      
      // ניתוח סגנון מוזיקלי
      genreAnalysis: this.analyzeGenre(audioBuffer),
      
      // ניתוח איכות הקלטה
      qualityAnalysis: this.analyzeRecordingQuality(audioBuffer),
      
      // המלצות מותאמות
      recommendations: {}
    };

    // יצירת המלצות מותאמות אישית
    analysis.recommendations = this.generatePersonalizedRecommendations(analysis);
    
    return analysis;
  }

  analyzeFrequencySpectrum(audioBuffer) {
    const channelData = audioBuffer.getChannelData(0);
    const fft = new FFT(2048);
    fft.forward(channelData);
    
    const spectrum = fft.spectrum;
    const lowFreq = spectrum.slice(0, 100).reduce((a, b) => a + b, 0) / 100;
    const midFreq = spectrum.slice(100, 500).reduce((a, b) => a + b, 0) / 400;
    const highFreq = spectrum.slice(500, 1000).reduce((a, b) => a + b, 0) / 500;
    
    return {
      lowFreq: lowFreq,
      midFreq: midFreq,
      highFreq: highFreq,
      dominantFreq: this.findDominantFrequency(spectrum),
      frequencyBalance: this.calculateFrequencyBalance(lowFreq, midFreq, highFreq)
    };
  }

  analyzeDynamics(audioBuffer) {
    const channelData = audioBuffer.getChannelData(0);
    const rms = this.calculateRMS(channelData);
    const peak = this.calculatePeak(channelData);
    const dynamicRange = peak - rms;
    
    return {
      rms: rms,
      peak: peak,
      dynamicRange: dynamicRange,
      compression: this.calculateCompressionRatio(peak, rms),
      transients: this.detectTransients(channelData)
    };
  }

  analyzeRhythm(audioBuffer) {
    const channelData = audioBuffer.getChannelData(0);
    const tempo = this.detectTempo(channelData);
    const groove = this.analyzeGroove(channelData);
    
    return {
      tempo: tempo,
      groove: groove,
      rhythmicComplexity: this.calculateRhythmicComplexity(channelData),
      timing: this.analyzeTiming(channelData)
    };
  }

  detectInstruments(audioBuffer) {
    const channelData = audioBuffer.getChannelData(0);
    const features = this.extractAudioFeatures(channelData);
    
    // זיהוי כלי נגינה באמצעות AI
    const instrumentScores = {
      drums: this.calculateDrumScore(features),
      bass: this.calculateBassScore(features),
      guitar: this.calculateGuitarScore(features),
      piano: this.calculatePianoScore(features),
      violin: this.calculateViolinScore(features),
      vocal: this.calculateVocalScore(features)
    };
    
    const primaryInstrument = this.getPrimaryInstrument(instrumentScores);
    
    // לוגים לדיבוג
    console.log('=== ניתוח כלי נגינה ===');
    console.log('ציונים לכלי נגינה:', instrumentScores);
    console.log('כלי ראשי שזוהה:', primaryInstrument);
    console.log('מאפיינים שחושבו:', features);
    
    return {
      primaryInstrument: primaryInstrument,
      confidence: Math.max(...Object.values(instrumentScores)), // זה בסדר כי זה מערך קטן של 6 ערכים
      allScores: instrumentScores
    };
  }

  analyzeGenre(audioBuffer) {
    const channelData = audioBuffer.getChannelData(0);
    const features = this.extractAudioFeatures(channelData);
    
    return {
      primaryGenre: this.classifyGenre(features),
      subGenres: this.detectSubGenres(features),
      mood: this.analyzeMood(features),
      energy: this.calculateEnergy(features)
    };
  }

  analyzeRecordingQuality(audioBuffer) {
    const channelData = audioBuffer.getChannelData(0);
    
    return {
      noiseFloor: this.calculateNoiseFloor(channelData),
      clipping: this.detectClipping(channelData),
      phaseIssues: this.detectPhaseIssues(audioBuffer),
      sampleRate: audioBuffer.sampleRate,
      bitDepth: this.estimateBitDepth(channelData),
      overallQuality: this.calculateOverallQuality(channelData)
    };
  }

  generatePersonalizedRecommendations(analysis) {
    const recommendations = {
      compression: this.getCompressionRecommendations(analysis),
      eq: this.getEQRecommendations(analysis),
      reverb: this.getReverbRecommendations(analysis),
      delay: this.getDelayRecommendations(analysis),
      saturation: this.getSaturationRecommendations(analysis),
      additional: this.getAdditionalRecommendations(analysis)
    };
    
    // וידוא שכל קטגוריה מכילה לפחות המלצה אחת
    Object.keys(recommendations).forEach(category => {
      if (category !== 'additional' && (!recommendations[category] || recommendations[category].length === 0)) {
        const fallbackPlugin = this.findAlternativePlugin(category, analysis.instrumentDetection.primaryInstrument);
        if (fallbackPlugin) {
          recommendations[category] = [{
            ...fallbackPlugin,
            reason: 'המלצה כללית מבוססת ניתוח AI',
            description: fallbackPlugin.description
          }];
        }
      }
    });
    
    return recommendations;
  }

  // פונקציות עזר לניתוח
  calculateRMS(data) {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i] * data[i];
    }
    return Math.sqrt(sum / data.length);
  }

  calculatePeak(data) {
    let max = 0;
    for (let i = 0; i < data.length; i++) {
      const abs = Math.abs(data[i]);
      if (abs > max) max = abs;
    }
    return max;
  }

  calculateCompressionRatio(peak, rms) {
    return peak / (rms + 0.0001);
  }

  detectTransients(data) {
    const transients = [];
    const threshold = 0.1;
    
    for (let i = 1; i < data.length; i++) {
      const diff = Math.abs(data[i] - data[i - 1]);
      if (diff > threshold) {
        transients.push(i);
      }
    }
    
    return transients;
  }

  detectTempo(data) {
    // אלגוריתם זיהוי טמפו מתקדם
    const autocorrelation = this.calculateAutocorrelation(data);
    const peaks = this.findPeaks(autocorrelation);
    return this.calculateTempoFromPeaks(peaks);
  }

  calculateDrumScore(features) {
    // אלגוריתם AI לזיהוי תופים
    const transientDensity = features.transientDensity || 0;
    const lowFreqEnergy = features.lowFreqEnergy || 0;
    const rhythmicRegularity = features.rhythmicRegularity || 0;
    
    return (transientDensity * 0.4 + lowFreqEnergy * 0.3 + rhythmicRegularity * 0.3);
  }

  calculateBassScore(features) {
    const lowFreqContent = features.lowFreqContent || 0;
    const sustain = features.sustain || 0;
    const harmonicContent = features.harmonicContent || 0;
    
    // הפחתת הציון של בס כדי לתת עדיפות לווקאל
    const baseScore = (lowFreqContent * 0.5 + sustain * 0.3 + harmonicContent * 0.2);
    
    // הפחתה נוספת אם יש מאפיינים ווקאליים
    const formantStructure = features.formantStructure || 0;
    const breathiness = features.breathiness || 0;
    
    let reduction = 0;
    if (formantStructure > 0.05) reduction += 0.3; // הפחתה משמעותית אם יש פורמנטים
    if (breathiness > 0.02) reduction += 0.2; // הפחתה נוספת אם יש נשימות
    
    const finalScore = Math.max(0, baseScore - reduction);
    
    console.log('=== ניקוד בס ===');
    console.log('תוכן תדרים נמוכים:', lowFreqContent);
    console.log('סוסטיין:', sustain);
    console.log('תוכן הרמוני:', harmonicContent);
    console.log('ציון בסיס:', baseScore);
    console.log('הפחתה:', reduction);
    console.log('ניקוד סופי לבס:', finalScore);
    
    return finalScore;
  }

  calculateGuitarScore(features) {
    const midFreqContent = features.midFreqContent || 0;
    const harmonicRichness = features.harmonicRichness || 0;
    const transientSharpness = features.transientSharpness || 0;
    
    return (midFreqContent * 0.4 + harmonicRichness * 0.4 + transientSharpness * 0.2);
  }

  calculatePianoScore(features) {
    const harmonicComplexity = features.harmonicComplexity || 0;
    const dynamicRange = features.dynamicRange || 0;
    const sustain = features.sustain || 0;
    
    // הקטנת המשקל של מאפיינים שעלולים להיות דומים לווקאל
    const score = (harmonicComplexity * 0.5 + dynamicRange * 0.3 + sustain * 0.2);
    
    console.log('=== ניקוד פסנתר ===');
    console.log('מורכבות הרמונית:', harmonicComplexity);
    console.log('טווח דינמי:', dynamicRange);
    console.log('סוסטיין:', sustain);
    console.log('ניקוד סופי לפסנתר:', score);
    
    return score;
  }

  calculateViolinScore(features) {
    const highFreqContent = features.highFreqContent || 0;
    const vibrato = features.vibrato || 0;
    const bowing = features.bowing || 0;
    
    return (highFreqContent * 0.4 + vibrato * 0.3 + bowing * 0.3);
  }

  calculateVocalScore(features) {
    const formantStructure = features.formantStructure || 0;
    const breathiness = features.breathiness || 0;
    const pitchVariation = features.pitchVariation || 0;
    const vocalArticulation = features.vocalArticulation || 0;
    
    // הגדלת המשקל של מאפיינים ווקאליים ספציפיים - עדיפות לווקאל
    const score = (formantStructure * 0.6 + breathiness * 0.2 + pitchVariation * 0.15 + vocalArticulation * 0.05);
    
    // אם יש מאפיינים ווקאליים חזקים, תן בונוס
    let bonus = 0;
    if (formantStructure > 0.1) bonus += 0.2;
    if (breathiness > 0.05) bonus += 0.1;
    if (pitchVariation > 0.1) bonus += 0.1;
    
    const finalScore = Math.min(1, score + bonus);
    
    console.log('=== ניקוד ווקאל ===');
    console.log('מבנה פורמנטים:', formantStructure);
    console.log('נשימות:', breathiness);
    console.log('שינויי גובה:', pitchVariation);
    console.log('ארטיקולציה ווקאלית:', vocalArticulation);
    console.log('בונוס:', bonus);
    console.log('ניקוד סופי לווקאל:', finalScore);
    
    return finalScore;
  }

  getPrimaryInstrument(scores) {
    // בדיקה אם יש מאפיינים ווקאליים חזקים - עדיפות מוחלטת לווקאל
    const vocalScore = scores.vocal || 0;
    const bassScore = scores.bass || 0;
    const pianoScore = scores.piano || 0;
    const guitarScore = scores.guitar || 0;
    const drumScore = scores.drum || 0;
    
    console.log('=== בחירת כלי ראשי ===');
    console.log('כל הציונים:', scores);
    
    // עדיפות מוחלטת לווקאל - אם יש ווקאל, זה הכלי הראשי
    if (vocalScore > 0.1) {
      console.log('כלי שנבחר: vocal (עדיפות מוחלטת לווקאל)');
      console.log('ביטחון בזיהוי:', vocalScore);
      return 'vocal';
    }
    
    // אם אין ווקאל, בחר הכלי עם הציון הגבוה ביותר
    const primary = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    console.log('כלי שנבחר:', primary);
    console.log('ביטחון בזיהוי:', scores[primary]);
    return primary;
  }

  // פונקציות עזר נוספות לניתוח AI
  findDominantFrequency(spectrum) {
    let maxIndex = 0;
    let maxValue = 0;
    
    for (let i = 0; i < spectrum.length; i++) {
      if (spectrum[i] > maxValue) {
        maxValue = spectrum[i];
        maxIndex = i;
      }
    }
    
    return maxIndex * (this.audioContext.sampleRate / (2 * spectrum.length));
  }

  calculateFrequencyBalance(lowFreq, midFreq, highFreq) {
    const total = lowFreq + midFreq + highFreq;
    if (total === 0) return 0.33;
    
    const lowRatio = lowFreq / total;
    const midRatio = midFreq / total;
    const highRatio = highFreq / total;
    
    // חישוב איזון - ככל שהערכים קרובים יותר, האיזון טוב יותר
    const idealRatio = 0.33;
    const balance = 1 - Math.sqrt(
      Math.pow(lowRatio - idealRatio, 2) + 
      Math.pow(midRatio - idealRatio, 2) + 
      Math.pow(highRatio - idealRatio, 2)
    );
    
    return Math.max(0, balance);
  }

  analyzeGroove(data) {
    // ניתוח גרוב - זיהוי דפוסים ריתמיים
    const transients = this.detectTransients(data);
    const intervals = [];
    
    for (let i = 1; i < transients.length; i++) {
      intervals.push(transients[i] - transients[i - 1]);
    }
    
    if (intervals.length === 0) return { regularity: 0, swing: 0 };
    
    // חישוב סדירות
    const meanInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    const variance = intervals.reduce((sum, interval) => 
      sum + Math.pow(interval - meanInterval, 2), 0) / intervals.length;
    const regularity = 1 / (1 + variance);
    
    // חישוב סווינג
    const swingRatios = [];
    for (let i = 0; i < intervals.length - 1; i += 2) {
      if (intervals[i + 1]) {
        swingRatios.push(intervals[i + 1] / intervals[i]);
      }
    }
    
    const swing = swingRatios.length > 0 ? 
      swingRatios.reduce((a, b) => a + b, 0) / swingRatios.length : 1;
    
    return { regularity, swing };
  }

  calculateRhythmicComplexity(data) {
    const transients = this.detectTransients(data);
    const intervals = [];
    
    for (let i = 1; i < transients.length; i++) {
      intervals.push(transients[i] - transients[i - 1]);
    }
    
    if (intervals.length === 0) return 0;
    
    // חישוב מורכבות ריתמית
    const uniqueIntervals = [...new Set(intervals)];
    const complexity = uniqueIntervals.length / intervals.length;
    
    return Math.min(1, complexity * 2);
  }

  analyzeTiming(data) {
    const transients = this.detectTransients(data);
    const timing = {
      precision: 0,
      humanization: 0,
      groove: 0
    };
    
    if (transients.length < 2) return timing;
    
    // חישוב דיוק
    const intervals = [];
    for (let i = 1; i < transients.length; i++) {
      intervals.push(transients[i] - transients[i - 1]);
    }
    
    const meanInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    const variance = intervals.reduce((sum, interval) => 
      sum + Math.pow(interval - meanInterval, 2), 0) / intervals.length;
    
    timing.precision = 1 / (1 + variance);
    timing.humanization = 1 - timing.precision;
    timing.groove = this.analyzeGroove(data).regularity;
    
    return timing;
  }

  calculateAutocorrelation(data) {
    const maxLag = Math.min(1000, Math.floor(data.length / 2));
    const autocorr = new Float32Array(maxLag);
    
    for (let lag = 0; lag < maxLag; lag++) {
      let sum = 0;
      for (let i = 0; i < data.length - lag; i++) {
        sum += data[i] * data[i + lag];
      }
      autocorr[lag] = sum / (data.length - lag);
    }
    
    return autocorr;
  }

  findPeaks(autocorr) {
    const peaks = [];
    
    // חישוב מקסימום ידני במקום Math.max(...autocorr)
    let maxAutocorr = 0;
    for (let i = 0; i < autocorr.length; i++) {
      if (autocorr[i] > maxAutocorr) {
        maxAutocorr = autocorr[i];
      }
    }
    
    const threshold = maxAutocorr * 0.5;
    
    for (let i = 1; i < autocorr.length - 1; i++) {
      if (autocorr[i] > threshold && 
          autocorr[i] > autocorr[i - 1] && 
          autocorr[i] > autocorr[i + 1]) {
        peaks.push(i);
      }
    }
    
    return peaks;
  }

  calculateTempoFromPeaks(peaks) {
    if (peaks.length === 0) return 120;
    
    // חישוב טמפו מפיקים
    const intervals = [];
    for (let i = 1; i < peaks.length; i++) {
      intervals.push(peaks[i] - peaks[i - 1]);
    }
    
    if (intervals.length === 0) return 120;
    
    const meanInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    const tempo = 60 / (meanInterval / this.audioContext.sampleRate);
    
    return Math.max(60, Math.min(200, tempo));
  }

  classifyGenre(features) {
    // סיווג סגנון מוזיקלי לפי מאפיינים
    const { spectralCentroid, spectralRolloff, zeroCrossingRate } = features;
    
    if (spectralCentroid > 0.7 && spectralRolloff > 0.8) {
      return 'electronic';
    } else if (spectralCentroid > 0.6 && zeroCrossingRate > 0.3) {
      return 'rock';
    } else if (spectralCentroid < 0.4 && spectralRolloff < 0.6) {
      return 'jazz';
    } else if (spectralCentroid > 0.5 && spectralRolloff > 0.7) {
      return 'pop';
    } else {
      return 'classical';
    }
  }

  detectSubGenres(features) {
    const subGenres = [];
    const { spectralCentroid, spectralRolloff } = features;
    
    if (spectralCentroid > 0.8) subGenres.push('dance');
    if (spectralRolloff > 0.9) subGenres.push('electronic');
    if (spectralCentroid < 0.3) subGenres.push('ambient');
    
    return subGenres;
  }

  analyzeMood(features) {
    const { spectralCentroid, spectralRolloff } = features;
    
    if (spectralCentroid > 0.7) {
      return spectralRolloff > 0.8 ? 'energetic' : 'bright';
    } else if (spectralCentroid < 0.4) {
      return 'mellow';
    } else {
      return 'neutral';
    }
  }

  calculateEnergy(features) {
    const { spectralCentroid, spectralRolloff } = features;
    return (spectralCentroid + spectralRolloff) / 2;
  }

  calculateNoiseFloor(data) {
    // חישוב רמת הרעש
    const sortedData = [...data].sort((a, b) => Math.abs(a) - Math.abs(b));
    const noiseFloor = sortedData[Math.floor(sortedData.length * 0.1)];
    return 20 * Math.log10(Math.abs(noiseFloor) + 1e-10);
  }

  detectClipping(data) {
    // זיהוי קליפינג
    const clippingThreshold = 0.95;
    let clippingCount = 0;
    
    for (let i = 0; i < data.length; i++) {
      if (Math.abs(data[i]) > clippingThreshold) {
        clippingCount++;
      }
    }
    
    return clippingCount / data.length > 0.01;
  }

  detectPhaseIssues(audioBuffer) {
    // זיהוי בעיות פאזה
    if (audioBuffer.numberOfChannels < 2) return false;
    
    const leftChannel = audioBuffer.getChannelData(0);
    const rightChannel = audioBuffer.getChannelData(1);
    
    let correlation = 0;
    for (let i = 0; i < leftChannel.length; i++) {
      correlation += leftChannel[i] * rightChannel[i];
    }
    
    correlation /= leftChannel.length;
    return correlation < 0.3;
  }

  estimateBitDepth(data) {
    // הערכת ביט דפט'
    let maxValue = 0;
    for (let i = 0; i < data.length; i++) {
      const abs = Math.abs(data[i]);
      if (abs > maxValue) maxValue = abs;
    }
    const bitDepth = Math.log2(maxValue * 2) + 1;
    return Math.round(bitDepth);
  }

  calculateOverallQuality(data) {
    const noiseFloor = this.calculateNoiseFloor(data);
    const clipping = this.detectClipping(data);
    const dynamicRange = this.calculatePeak(data) - Math.abs(noiseFloor);
    
    let quality = 0.5;
    
    if (!clipping) quality += 0.2;
    if (dynamicRange > 40) quality += 0.2;
    if (Math.abs(noiseFloor) < -60) quality += 0.1;
    
    return Math.min(1, quality);
  }

  // פונקציות עזר נוספות לניתוח AI
  calculateSpectralCentroid(data) {
    const fft = new FFT(2048);
    fft.forward(data);
    
    let weightedSum = 0;
    let totalSum = 0;
    
    for (let i = 0; i < fft.spectrum.length; i++) {
      weightedSum += i * fft.spectrum[i];
      totalSum += fft.spectrum[i];
    }
    
    return totalSum > 0 ? weightedSum / totalSum / fft.spectrum.length : 0.5;
  }

  calculateSpectralRolloff(data) {
    const fft = new FFT(2048);
    fft.forward(data);
    
    const threshold = 0.85;
    let cumulativeEnergy = 0;
    let totalEnergy = fft.spectrum.reduce((a, b) => a + b, 0);
    
    for (let i = 0; i < fft.spectrum.length; i++) {
      cumulativeEnergy += fft.spectrum[i];
      if (cumulativeEnergy / totalEnergy >= threshold) {
        return i / fft.spectrum.length;
      }
    }
    
    return 0.8;
  }

  calculateSpectralFlux(data) {
    const fft = new FFT(2048);
    fft.forward(data);
    
    // חישוב פלוקס ספקטרלי
    let flux = 0;
    const prevSpectrum = new Float32Array(fft.spectrum.length);
    
    for (let i = 0; i < fft.spectrum.length; i++) {
      flux += Math.pow(fft.spectrum[i] - prevSpectrum[i], 2);
    }
    
    return Math.sqrt(flux);
  }

  calculateMFCC(data) {
    // חישוב MFCC (Mel-frequency cepstral coefficients)
    const fft = new FFT(2048);
    fft.forward(data);
    
    // פילטר מל
    const melFilters = this.createMelFilters(fft.spectrum.length);
    const melSpectrum = new Float32Array(melFilters.length);
    
    for (let i = 0; i < melFilters.length; i++) {
      for (let j = 0; j < fft.spectrum.length; j++) {
        melSpectrum[i] += fft.spectrum[j] * melFilters[i][j];
      }
    }
    
    // לוגריתם
    const logMelSpectrum = melSpectrum.map(x => Math.log(x + 1e-10));
    
    // DCT
    const mfcc = this.dct(logMelSpectrum);
    
    return mfcc.slice(0, 13); // 13 MFCC coefficients
  }

  // פונקציות עזר נוספות לניתוח AI
  extractAudioFeatures(data) {
    // חילוץ מאפיינים מתקדמים מהאודיו
    return {
      spectralCentroid: this.calculateSpectralCentroid(data),
      spectralRolloff: this.calculateSpectralRolloff(data),
      spectralFlux: this.calculateSpectralFlux(data),
      zeroCrossingRate: this.calculateZeroCrossingRate(data),
      mfcc: this.calculateMFCC(data),
      transientDensity: this.calculateTransientDensity(data),
      lowFreqEnergy: this.calculateLowFreqEnergy(data),
      rhythmicRegularity: this.calculateRhythmicRegularity(data),
      lowFreqContent: this.calculateLowFreqContent(data),
      sustain: this.calculateSustain(data),
      harmonicContent: this.calculateHarmonicContent(data),
      midFreqContent: this.calculateMidFreqContent(data),
      harmonicRichness: this.calculateHarmonicRichness(data),
      transientSharpness: this.calculateTransientSharpness(data),
      harmonicComplexity: this.calculateHarmonicComplexity(data),
      dynamicRange: this.calculateDynamicRange(data),
      highFreqContent: this.calculateHighFreqContent(data),
      vibrato: this.calculateVibrato(data),
      bowing: this.calculateBowing(data),
      formantStructure: this.calculateFormantStructure(data),
      breathiness: this.calculateBreathiness(data),
      pitchVariation: this.calculatePitchVariation(data),
      vocalArticulation: this.calculateVocalArticulation(data)
    };
  }

  calculateZeroCrossingRate(data) {
    // חישוב קצב חציית האפס
    let crossings = 0;
    for (let i = 1; i < data.length; i++) {
      if ((data[i] >= 0 && data[i - 1] < 0) || (data[i] < 0 && data[i - 1] >= 0)) {
        crossings++;
      }
    }
    return crossings / data.length;
  }

  calculateTransientDensity(data) {
    const transients = this.detectTransients(data);
    return transients.length / data.length;
  }

  calculateLowFreqEnergy(data) {
    const fft = new FFT(2048);
    fft.forward(data);
    const lowFreqBins = fft.spectrum.slice(0, 50);
    return lowFreqBins.reduce((a, b) => a + b, 0) / lowFreqBins.length;
  }

  calculateRhythmicRegularity(data) {
    const groove = this.analyzeGroove(data);
    return groove.regularity;
  }

  calculateLowFreqContent(data) {
    const fft = new FFT(2048);
    fft.forward(data);
    const lowFreqBins = fft.spectrum.slice(0, 100);
    return lowFreqBins.reduce((a, b) => a + b, 0) / fft.spectrum.reduce((a, b) => a + b, 0);
  }

  calculateSustain(data) {
    // חישוב זמן סוסטיין - מותאם יותר לפסנתר
    const envelope = this.calculateEnvelope(data);
    
    // חישוב מקסימום ידני במקום Math.max(...envelope)
    let maxEnvelope = 0;
    for (let i = 0; i < envelope.length; i++) {
      if (envelope[i] > maxEnvelope) {
        maxEnvelope = envelope[i];
      }
    }
    
    const threshold = maxEnvelope * 0.05; // סף נמוך יותר
    let sustainTime = 0;
    let totalSustain = 0;
    let longSustainPeriods = 0;
    
    // חיפוש תקופות סוסטיין ארוכות (טיפוסי לפסנתר)
    let currentSustainLength = 0;
    for (let i = 0; i < envelope.length; i++) {
      if (envelope[i] > threshold) {
        sustainTime++;
        totalSustain += envelope[i];
        currentSustainLength++;
      } else {
        if (currentSustainLength > 1000) { // תקופה ארוכה של סוסטיין
          longSustainPeriods++;
        }
        currentSustainLength = 0;
      }
    }
    
    // בונוס לתקופות סוסטיין ארוכות (טיפוסי לפסנתר)
    const baseSustain = sustainTime / envelope.length;
    const longSustainBonus = Math.min(1, longSustainPeriods / 5);
    const result = baseSustain * (1 + longSustainBonus * 0.3);
    
    console.log('סוסטיין (פסנתר):', result, 'זמן סוסטיין:', sustainTime, 'סך סוסטיין:', totalSustain, 'תקופות ארוכות:', longSustainPeriods);
    
    return result;
  }

  calculateHarmonicContent(data) {
    const fft = new FFT(2048);
    fft.forward(data);
    const spectrum = fft.spectrum;
    
    // חישוב תוכן הרמוני
    let harmonicSum = 0;
    let totalSum = 0;
    
    for (let i = 1; i < spectrum.length; i++) {
      if (i % 2 === 0 || i % 3 === 0) {
        harmonicSum += spectrum[i];
      }
      totalSum += spectrum[i];
    }
    
    return totalSum > 0 ? harmonicSum / totalSum : 0;
  }

  calculateMidFreqContent(data) {
    const fft = new FFT(2048);
    fft.forward(data);
    const midFreqBins = fft.spectrum.slice(100, 500);
    return midFreqBins.reduce((a, b) => a + b, 0) / fft.spectrum.reduce((a, b) => a + b, 0);
  }

  calculateHarmonicRichness(data) {
    const fft = new FFT(2048);
    fft.forward(data);
    const spectrum = fft.spectrum;
    
    // חישוב עושר הרמוני
    let peakCount = 0;
    
    // חישוב מקסימום ידני במקום Math.max(...spectrum)
    let maxSpectrum = 0;
    for (let i = 0; i < spectrum.length; i++) {
      if (spectrum[i] > maxSpectrum) {
        maxSpectrum = spectrum[i];
      }
    }
    
    const threshold = maxSpectrum * 0.3;
    
    for (let i = 1; i < spectrum.length - 1; i++) {
      if (spectrum[i] > threshold && 
          spectrum[i] > spectrum[i - 1] && 
          spectrum[i] > spectrum[i + 1]) {
        peakCount++;
      }
    }
    
    return peakCount / spectrum.length;
  }

  calculateTransientSharpness(data) {
    const transients = this.detectTransients(data);
    if (transients.length === 0) return 0;
    
    let totalSharpness = 0;
    for (let i = 0; i < transients.length; i++) {
      const idx = transients[i];
      if (idx > 0 && idx < data.length - 1) {
        const sharpness = Math.abs(data[idx] - data[idx - 1]) + 
                         Math.abs(data[idx + 1] - data[idx]);
        totalSharpness += sharpness;
      }
    }
    
    return totalSharpness / transients.length;
  }

  calculateHarmonicComplexity(data) {
    const fft = new FFT(2048);
    fft.forward(data);
    const spectrum = fft.spectrum;
    
    // חישוב מורכבות הרמונית - מיקוד על הרמוניות גבוהות יותר
    let complexity = 0;
    let harmonicCount = 0;
    
    // חיפוש הרמוניות בטווח תדרים של פסנתר (100-4000Hz)
    const pianoRange = spectrum.slice(50, 800);
    
    // חיפוש הרמוניות ספציפיות לפסנתר - תדרים מדויקים יותר
    const pianoHarmonics = [100, 200, 300, 400, 500, 600, 700, 800];
    let pianoSpecificHarmonics = 0;
    
    for (const harmonic of pianoHarmonics) {
      const binIndex = Math.floor(harmonic * fft.spectrum.length / (this.audioContext.sampleRate / 2));
      if (binIndex < spectrum.length && spectrum[binIndex] > 0.1) {
        pianoSpecificHarmonics++;
      }
    }
    
    for (let i = 1; i < pianoRange.length; i++) {
      const variation = Math.abs(pianoRange[i] - pianoRange[i - 1]);
      complexity += variation;
      if (variation > 0.1) {
        harmonicCount++;
      }
    }
    
    const baseComplexity = (complexity / pianoRange.length) * (harmonicCount / pianoRange.length);
    const pianoBonus = pianoSpecificHarmonics / pianoHarmonics.length;
    const result = baseComplexity * (1 + pianoBonus * 0.5);
    
    console.log('מורכבות הרמונית (פסנתר):', result, 'הרמוניות:', harmonicCount, 'הרמוניות פסנתר ספציפיות:', pianoSpecificHarmonics);
    
    return result;
  }

  calculateDynamicRange(data) {
    const peak = this.calculatePeak(data);
    const rms = this.calculateRMS(data);
    const dynamicRange = 20 * Math.log10(peak / (rms + 1e-10));
    
    // נרמול לטווח 0-1
    const normalizedRange = Math.max(0, Math.min(1, (dynamicRange + 60) / 60));
    
    console.log('טווח דינמי (פסנתר):', normalizedRange, 'דציבלים:', dynamicRange);
    
    return normalizedRange;
  }

  calculateHighFreqContent(data) {
    const fft = new FFT(2048);
    fft.forward(data);
    const highFreqBins = fft.spectrum.slice(500, 1000);
    return highFreqBins.reduce((a, b) => a + b, 0) / fft.spectrum.reduce((a, b) => a + b, 0);
  }

  calculateVibrato(data) {
    // חישוב ויברטו
    const fft = new FFT(2048);
    fft.forward(data);
    const spectrum = fft.spectrum;
    
    // חיפוש תדרים סביב 5-7Hz (ויברטו)
    const vibratoRange = spectrum.slice(5, 8);
    return vibratoRange.reduce((a, b) => a + b, 0) / vibratoRange.length;
  }

  calculateBowing(data) {
    // חישוב אופי קשת
    const transients = this.detectTransients(data);
    if (transients.length < 2) return 0;
    
    let bowingPattern = 0;
    for (let i = 1; i < transients.length; i++) {
      const interval = transients[i] - transients[i - 1];
      if (interval > 1000 && interval < 5000) { // קשת טיפוסית
        bowingPattern++;
      }
    }
    
    return bowingPattern / transients.length;
  }

  calculateFormantStructure(data) {
    // חישוב מבנה פורמנטים (לווקאל)
    const fft = new FFT(2048);
    fft.forward(data);
    const spectrum = fft.spectrum;
    
    // פורמנטים טיפוסיים לווקאל - תדרים נמוכים יותר
    const formantRanges = [
      { start: 150, end: 350 },   // F1 - תדר נמוך יותר
      { start: 600, end: 1000 },  // F2 - תדר נמוך יותר
      { start: 1800, end: 2800 }  // F3 - תדר נמוך יותר
    ];
    
    let totalFormantEnergy = 0;
    let formantPeaks = 0;
    
    for (const range of formantRanges) {
      const startBin = Math.floor(range.start * fft.spectrum.length / (this.audioContext.sampleRate / 2));
      const endBin = Math.floor(range.end * fft.spectrum.length / (this.audioContext.sampleRate / 2));
      const formantRange = spectrum.slice(startBin, endBin);
      const formantEnergy = formantRange.reduce((a, b) => a + b, 0);
      totalFormantEnergy += formantEnergy;
      
      // חיפוש פיקים בטווח הפורמנט
      let peakCount = 0;
      for (let i = 1; i < formantRange.length - 1; i++) {
        if (formantRange[i] > formantRange[i-1] && formantRange[i] > formantRange[i+1] && formantRange[i] > 0.1) {
          peakCount++;
        }
      }
      formantPeaks += peakCount;
    }
    
    // חישוב יחס הפורמנטים לעומת האנרגיה הכללית + בונוס לפיקים
    const totalEnergy = spectrum.reduce((a, b) => a + b, 0);
    const formantRatio = totalFormantEnergy / totalEnergy;
    const peakBonus = Math.min(1, formantPeaks / 10); // בונוס לפיקים מרובים
    const result = formantRatio * (1 + peakBonus * 0.5);
    
    console.log('מבנה פורמנטים (ווקאל):', result, 'אנרגיה פורמנטים:', totalFormantEnergy, 'אנרגיה כללית:', totalEnergy, 'פיקים:', formantPeaks);
    
    return result;
  }

  calculateBreathiness(data) {
    // חישוב נשימות (לווקאל)
    const fft = new FFT(2048);
    fft.forward(data);
    const spectrum = fft.spectrum;
    
    // תדרים גבוהים (נשימות) - טווח רחב יותר
    const breathRange = spectrum.slice(600, 1200);
    const totalEnergy = spectrum.reduce((a, b) => a + b, 0);
    
    const breathEnergy = breathRange.reduce((a, b) => a + b, 0);
    const breathRatio = breathEnergy / totalEnergy;
    
    // חיפוש תבניות נשימה - שינויים מהירים בתדרים גבוהים
    let breathPatterns = 0;
    for (let i = 1; i < breathRange.length; i++) {
      const variation = Math.abs(breathRange[i] - breathRange[i-1]);
      if (variation > 0.05) { // סף נמוך יותר לזיהוי נשימות
        breathPatterns++;
      }
    }
    
    const patternBonus = Math.min(1, breathPatterns / breathRange.length);
    const result = breathRatio * (1 + patternBonus * 0.3);
    
    console.log('נשימות (ווקאל):', result, 'אנרגיה נשימות:', breathEnergy, 'אנרגיה כללית:', totalEnergy, 'תבניות:', breathPatterns);
    
    return result;
  }

  calculatePitchVariation(data) {
    // חישוב שינויי גובה צליל
    const fft = new FFT(2048);
    fft.forward(data);
    const spectrum = fft.spectrum;
    
    let pitchChanges = 0;
    let totalVariation = 0;
    
    for (let i = 1; i < spectrum.length; i++) {
      const variation = Math.abs(spectrum[i] - spectrum[i - 1]);
      totalVariation += variation;
      if (variation > 0.05) { // סף נמוך יותר
        pitchChanges++;
      }
    }
    
    const result = pitchChanges / spectrum.length;
    console.log('שינויי גובה (ווקאל):', result, 'שינויים:', pitchChanges, 'סך וריאציה:', totalVariation);
    
    return result;
  }

  calculateVocalArticulation(data) {
    // חישוב ארטיקולציה ווקאלית - מאפיין ייחודי לווקאל
    const fft = new FFT(2048);
    fft.forward(data);
    const spectrum = fft.spectrum;
    
    // חיפוש תבניות ארטיקולציה - שינויים מהירים בתדרים ספציפיים
    const articulationRanges = [
      { start: 2000, end: 4000 }, // תדרים גבוהים לארטיקולציה
      { start: 8000, end: 12000 }  // תדרים גבוהים מאוד
    ];
    
    let articulationScore = 0;
    
    for (const range of articulationRanges) {
      const startBin = Math.floor(range.start * fft.spectrum.length / (this.audioContext.sampleRate / 2));
      const endBin = Math.floor(range.end * fft.spectrum.length / (this.audioContext.sampleRate / 2));
      const articulationRange = spectrum.slice(startBin, endBin);
      
      // חיפוש שינויים מהירים בתדרים גבוהים (ארטיקולציה)
      let rapidChanges = 0;
      for (let i = 1; i < articulationRange.length; i++) {
        const change = Math.abs(articulationRange[i] - articulationRange[i-1]);
        if (change > 0.1) {
          rapidChanges++;
        }
      }
      
      articulationScore += rapidChanges / articulationRange.length;
    }
    
    const result = articulationScore / articulationRanges.length;
    console.log('ארטיקולציה ווקאלית:', result);
    
    return result;
  }

  calculateEnvelope(data) {
    // חישוב מעטפת האודיו
    const envelope = new Float32Array(data.length);
    const windowSize = 100;
    
    for (let i = 0; i < data.length; i++) {
      const start = Math.max(0, i - windowSize);
      const end = Math.min(data.length, i + windowSize);
      const window = data.slice(start, end);
      
      // חישוב מקסימום ידני במקום Math.max(...window.map(Math.abs))
      let maxWindow = 0;
      for (let j = 0; j < window.length; j++) {
        const abs = Math.abs(window[j]);
        if (abs > maxWindow) maxWindow = abs;
      }
      envelope[i] = maxWindow;
    }
    
    return envelope;
  }

  createMelFilters(numBins) {
    const numFilters = 26;
    const filters = [];
    
    for (let i = 0; i < numFilters; i++) {
      const filter = new Float32Array(numBins);
      const centerFreq = this.melToFreq(i * 2595 / (numFilters + 1));
      const leftFreq = this.melToFreq((i - 1) * 2595 / (numFilters + 1));
      const rightFreq = this.melToFreq((i + 1) * 2595 / (numFilters + 1));
      
      for (let j = 0; j < numBins; j++) {
        const freq = j * this.audioContext.sampleRate / (2 * numBins);
        if (freq >= leftFreq && freq <= rightFreq) {
          if (freq <= centerFreq) {
            filter[j] = (freq - leftFreq) / (centerFreq - leftFreq);
          } else {
            filter[j] = (rightFreq - freq) / (rightFreq - centerFreq);
          }
        }
      }
      
      filters.push(filter);
    }
    
    return filters;
  }

  melToFreq(mel) {
    return 700 * (Math.pow(10, mel / 2595) - 1);
  }

  dct(data) {
    const N = data.length;
    const dct = new Float32Array(N);
    
    for (let k = 0; k < N; k++) {
      let sum = 0;
      for (let n = 0; n < N; n++) {
        sum += data[n] * Math.cos(Math.PI * k * (2 * n + 1) / (2 * N));
      }
      dct[k] = sum * Math.sqrt(2 / N);
    }
    
    return dct;
  }

  // פונקציות המלצות מותאמות
  getCompressionRecommendations(analysis) {
    const { dynamicsAnalysis, instrumentDetection } = analysis;
    const recommendations = [];
    
    if (dynamicsAnalysis.dynamicRange > 20) {
      const plugin = this.findPluginByName('Waves CLA-2A', 'compression') || 
                    this.findAlternativePlugin('compression', instrumentDetection.primaryInstrument);
      
      if (plugin) {
        recommendations.push({
          ...plugin,
          reason: 'דינמיקה גבוהה - נדרש קומפרסור עדין',
          settings: { Attack: '15ms', Release: '100ms', Ratio: '2:1', Threshold: '-20dB' },
          description: 'קומפרסור עדין לדינמיקה גבוהה עם שליטה מדויקת'
        });
      }
    }
    
    if (instrumentDetection.primaryInstrument === 'drums') {
      const plugin = this.findPluginByName('Waves SSL G-Master Buss Compressor', 'compression') || 
                    this.findAlternativePlugin('compression', 'drums');
      
      if (plugin) {
        recommendations.push({
          ...plugin,
          reason: 'תופים - נדרש קומפרסור עם אופי SSL',
          settings: { Attack: '30ms', Release: '100ms', Ratio: '2:1', Threshold: '-20dB' },
          description: 'קומפרסור SSL מקצועי לתופים עם אופי קלאסי'
        });
      }
    }
    
    // המלצה כללית אם אין המלצות ספציפיות
    if (recommendations.length === 0) {
      const plugin = this.findAlternativePlugin('compression', instrumentDetection.primaryInstrument);
      if (plugin) {
        recommendations.push({
          ...plugin,
          reason: 'המלצה כללית לקומפרסור',
          settings: plugin.settings,
          description: plugin.description
        });
      }
    }
    
    return recommendations;
  }

  getEQRecommendations(analysis) {
    const { frequencyAnalysis, instrumentDetection } = analysis;
    const recommendations = [];
    
    if (frequencyAnalysis.lowFreq < 0.3) {
      const plugin = this.findPluginByName('FabFilter Pro-Q3', 'eq') || 
                    this.findAlternativePlugin('eq', instrumentDetection.primaryInstrument);
      
      if (plugin) {
        recommendations.push({
          ...plugin,
          reason: 'תדרים נמוכים חלשים - נדרש בוסט',
          settings: { 'Low Shelf': '+3dB', 'Frequency': '80Hz' },
          description: 'איקיו מדויק לבוסט תדרים נמוכים'
        });
      }
    }
    
    // המלצה כללית אם אין המלצות ספציפיות
    if (recommendations.length === 0) {
      const plugin = this.findAlternativePlugin('eq', instrumentDetection.primaryInstrument);
      if (plugin) {
        recommendations.push({
          ...plugin,
          reason: 'המלצה כללית לאיקיו',
          settings: plugin.settings,
          description: plugin.description
        });
      }
    }
    
    return recommendations;
  }

  getReverbRecommendations(analysis) {
    const { genreAnalysis, instrumentDetection } = analysis;
    const recommendations = [];
    
    if (genreAnalysis.primaryGenre === 'pop') {
      const plugin = this.findPluginByName('Valhalla Room', 'reverb') || 
                    this.findAlternativePlugin('reverb', instrumentDetection.primaryInstrument);
      
      if (plugin) {
        recommendations.push({
          ...plugin,
          reason: 'פופ - ריברב מודרני וחלק',
          settings: { Decay: '2.0s', Mix: '15%' },
          description: 'ריברב מודרני למוזיקת פופ'
        });
      }
    }
    
    // המלצה כללית אם אין המלצות ספציפיות
    if (recommendations.length === 0) {
      const plugin = this.findAlternativePlugin('reverb', instrumentDetection.primaryInstrument);
      if (plugin) {
        recommendations.push({
          ...plugin,
          reason: 'המלצה כללית לריברב',
          settings: plugin.settings,
          description: plugin.description
        });
      }
    }
    
    return recommendations;
  }

  getDelayRecommendations(analysis) {
    const { rhythmicAnalysis, genreAnalysis, instrumentDetection } = analysis;
    const recommendations = [];
    
    if (rhythmicAnalysis.tempo > 120) {
      const plugin = this.findPluginByName('EchoBoy', 'delay') || 
                    this.findAlternativePlugin('delay', instrumentDetection.primaryInstrument);
      
      if (plugin) {
        recommendations.push({
          ...plugin,
          reason: 'טמפו גבוה - דיליי מהיר',
          settings: { 'Feedback': '20%', 'Mix': '10%' },
          description: 'דיליי מהיר לטמפו גבוה'
        });
      }
    }
    
    // המלצה כללית אם אין המלצות ספציפיות
    if (recommendations.length === 0) {
      const plugin = this.findAlternativePlugin('delay', instrumentDetection.primaryInstrument);
      if (plugin) {
        recommendations.push({
          ...plugin,
          reason: 'המלצה כללית לדיליי',
          settings: plugin.settings,
          description: plugin.description
        });
      }
    }
    
    return recommendations;
  }

  getSaturationRecommendations(analysis) {
    const { qualityAnalysis, instrumentDetection } = analysis;
    const recommendations = [];
    
    if (qualityAnalysis.noiseFloor > -40) {
      const plugin = this.findPluginByName('FabFilter Saturn 2', 'saturation') || 
                    this.findAlternativePlugin('saturation', instrumentDetection.primaryInstrument);
      
      if (plugin) {
        recommendations.push({
          ...plugin,
          reason: 'רעש גבוה - סטורציה עדינה',
          settings: { Drive: '2', Mix: '30%' },
          description: 'סטורציה עדינה לטיפול ברעש'
        });
      }
    }
    
    // המלצה כללית אם אין המלצות ספציפיות
    if (recommendations.length === 0) {
      const plugin = this.findAlternativePlugin('saturation', instrumentDetection.primaryInstrument);
      if (plugin) {
        recommendations.push({
          ...plugin,
          reason: 'המלצה כללית לסטורציה',
          settings: plugin.settings,
          description: plugin.description
        });
      }
    }
    
    return recommendations;
  }

  getAdditionalRecommendations(analysis) {
    const recommendations = [];
    
    if (analysis.qualityAnalysis.clipping) {
      recommendations.push({
        type: 'warning',
        message: 'זיהוי קליפינג - יש להוריד את הגיין',
        action: 'Reduce gain by 3-6dB'
      });
    }
    
    if (analysis.frequencyAnalysis.frequencyBalance < 0.3) {
      recommendations.push({
        type: 'info',
        message: 'איזון תדרים לא אופטימלי',
        action: 'Consider multiband compression'
      });
    }
    
    return recommendations;
  }
}

// ----- FFT Class for Frequency Analysis -----
class FFT {
  constructor(size) {
    this.size = size;
    this.real = new Float32Array(size);
    this.imag = new Float32Array(size);
    this.spectrum = new Float32Array(size / 2);
  }

  forward(buffer) {
    // FFT implementation
    for (let i = 0; i < this.size; i++) {
      this.real[i] = buffer[i] || 0;
      this.imag[i] = 0;
    }
    
    this.fft(this.real, this.imag);
    
    for (let i = 0; i < this.size / 2; i++) {
      this.spectrum[i] = Math.sqrt(this.real[i] * this.real[i] + this.imag[i] * this.imag[i]);
    }
  }

  fft(real, imag) {
    // Cooley-Tukey FFT algorithm
    const n = real.length;
    
    if (n <= 1) return;
    
    const halfN = n >> 1;
    const realEven = new Float32Array(halfN);
    const imagEven = new Float32Array(halfN);
    const realOdd = new Float32Array(halfN);
    const imagOdd = new Float32Array(halfN);
    
    for (let i = 0; i < halfN; i++) {
      realEven[i] = real[i * 2];
      imagEven[i] = imag[i * 2];
      realOdd[i] = real[i * 2 + 1];
      imagOdd[i] = imag[i * 2 + 1];
    }
    
    this.fft(realEven, imagEven);
    this.fft(realOdd, imagOdd);
    
    for (let k = 0; k < halfN; k++) {
      const angle = -2 * Math.PI * k / n;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      
      const realTemp = realOdd[k] * cos - imagOdd[k] * sin;
      const imagTemp = realOdd[k] * sin + imagOdd[k] * cos;
      
      real[k] = realEven[k] + realTemp;
      imag[k] = imagEven[k] + imagTemp;
      real[k + halfN] = realEven[k] - realTemp;
      imag[k + halfN] = imagEven[k] - imagTemp;
    }
  }
}

// ----- זיהוי סוג סטם -----
const detectStemType = (fileName) => {
  const lowerFileName = fileName.toLowerCase();
  
  // זיהוי לפי שם הקובץ
  if (lowerFileName.includes('drum') || lowerFileName.includes('kick') || lowerFileName.includes('snare') || 
      lowerFileName.includes('hihat') || lowerFileName.includes('tom') || lowerFileName.includes('cymbal')) {
    return 'drums';
  }
  if (lowerFileName.includes('bass') || lowerFileName.includes('sub')) {
    return 'bass';
  }
  if (lowerFileName.includes('guitar') || lowerFileName.includes('gtr')) {
    return lowerFileName.includes('acoustic') ? 'acoustic_guitar' : 'electric_guitar';
  }
  if (lowerFileName.includes('piano') || lowerFileName.includes('keys')) {
    return 'piano';
  }
  if (lowerFileName.includes('violin') || lowerFileName.includes('string')) {
    return 'violin';
  }
  if (lowerFileName.includes('vocal') || lowerFileName.includes('voice')) {
    return 'vocal';
  }
  
  return 'unknown';
};

// ----- מערך קטגוריות -----
const pluginCategories = [
  {
    key: 'compression',
    label: 'קומפרסיה',
    labelSuffix: stemType => ` ל${stemType}`,
    generalLabel: 'קומפרסיה ווקאלית',
    icon: <Volume2 className="w-5 h-5 ml-2" />,
  },
  {
    key: 'eq',
    label: 'איקולייזר',
    labelSuffix: stemType => ` ל${stemType}`,
    generalLabel: 'Equalization',
    icon: <Radio className="w-5 h-5 ml-2" />,
  },
  {
    key: 'reverb',
    label: 'ריברב',
    labelSuffix: stemType => ` ל${stemType}`,
    generalLabel: 'ריברב ווקאלי',
    icon: <Waves className="w-5 h-5 ml-2" />,
  },
  {
    key: 'delay',
    label: 'דיליי',
    labelSuffix: stemType => ` ל${stemType}`,
    generalLabel: 'דיליי ווקאלי',
    icon: <Clock className="w-5 h-5 ml-2" />,
  },
  {
    key: 'saturation',
    label: 'סטורציה',
    labelSuffix: stemType => ` ל${stemType}`,
    generalLabel: 'סטורציה ווקאלית',
    icon: <Zap className="w-5 h-5 ml-2" />,
  },
];

// ----- פונקציות דמה עבור אייקון/באג' -----
const getCategoryBadge = (cat) => {
  const colors = {
    compression: 'bg-green-500',
    eq: 'bg-blue-500',
    reverb: 'bg-purple-500',
    delay: 'bg-yellow-500',
    saturation: 'bg-red-500',
  };
  return (
    <span className={`px-2 py-1 rounded text-xs text-white ${colors[cat] || 'bg-gray-500'}`}>
      {cat}
    </span>
  );
};

const getPluginIcon = (cat) => {
  switch (cat) {
    case 'compression': return <Volume2 className="w-6 h-6" />;
    case 'eq': return <Radio className="w-6 h-6" />;
    case 'reverb': return <Waves className="w-6 h-6" />;
    case 'delay': return <Clock className="w-6 h-6" />;
    case 'saturation': return <Zap className="w-6 h-6" />;
    default: return <Star className="w-6 h-6" />;
  }
};

const getStemIcon = (stemType) => {
  switch (stemType) {
    case 'drums': return <Drumstick className="w-6 h-6" />;
    case 'bass': return <Speaker className="w-6 h-6" />;
    case 'electric_guitar': return <Music className="w-6 h-6" />;
    case 'acoustic_guitar': return <Music className="w-6 h-6" />;
    case 'piano': return <Music className="w-6 h-6" />;
    case 'violin': return <Music className="w-6 h-6" />;
    case 'vocal': return <Music className="w-6 h-6" />;
    default: return <Music className="w-6 h-6" />;
  }
};

const getStemDisplayName = (stemType) => {
  const names = {
    drums: 'תופים',
    bass: 'בס',
    electric_guitar: 'גיטרה חשמלית',
    acoustic_guitar: 'גיטרה אקוסטית',
    piano: 'פסנתר',
    violin: 'כינורות',
    vocal: 'ווקאל',
    unknown: 'לא ידוע'
  };
  return names[stemType] || 'לא ידוע';
};

// ----- נתוני פלאגינים לכל סוג סטם -----
const stemPlugins = {
  drums: {
    compression: [
      {
        name: 'Waves SSL G-Master Buss Compressor',
        description: 'קומפרסור מקצועי לתופים עם אופי SSL.',
        price: '199$',
        category: 'compression',
        color: 'bg-blue-500',
        settings: { Attack: '30ms', Release: '100ms', Ratio: '2:1', Threshold: '-20dB' },
        features: ['SSL sound', 'Punch'],
        url: 'https://www.waves.com/',
      },
      {
        name: 'FabFilter Pro-C2',
        description: 'קומפרסור מדויק עם שליטה מלאה.',
        price: '299$',
        category: 'compression',
        color: 'bg-green-500',
        settings: { Attack: '10ms', Release: '50ms', Ratio: '3:1', Threshold: '-15dB' },
        features: ['Sidechain', 'Lookahead'],
        url: 'https://www.fabfilter.com/',
      }
    ],
    eq: [
      {
        name: 'Waves SSL E-Channel',
        description: 'איקיו בסגנון SSL לתופים.',
        price: '199$',
        category: 'eq',
        color: 'bg-yellow-500',
        settings: { 'High Pass': '60Hz', 'High': '+4dB', 'Low': '-2dB' },
        features: ['SSL sound', 'Punch'],
        
        url: 'https://www.waves.com/',
      }
    ],
    reverb: [
      {
        name: 'Valhalla Room',
        description: 'ריברב טבעי לתופים.',
        price: 'חינמי',
        category: 'reverb',
        color: 'bg-purple-500',
        settings: { Decay: '1.8s', Mix: '12%' },
        features: ['Natural', 'Fast'],
        url: 'https://valhalladsp.com/',
      }
    ],
    delay: [
      {
        name: 'EchoBoy',
        description: 'דיליי אנלוגי לתופים.',
        price: '199$',
        category: 'delay',
        color: 'bg-pink-500',
        settings: { 'Feedback': '15%', 'Mix': '8%' },
        features: ['Analog', 'Sync'],
        url: 'https://www.soundtoys.com/',
      }
    ],
    saturation: [
      {
        name: 'Decapitator',
        description: 'סטורציה לתופים עם אופי אנלוגי.',
        price: '199$',
        category: 'saturation',
        color: 'bg-red-500',
        settings: { Drive: '3', Mix: '40%' },
        features: ['Analog', 'Punch'],
        url: 'https://www.soundtoys.com/',
      }
    ]
  },
  bass: {
    compression: [
      {
        name: 'Waves CLA-76',
        description: 'קומפרסור קלאסי לבס.',
        price: '199$',
        category: 'compression',
        color: 'bg-blue-500',
        settings: { Attack: '20ms', Release: '200ms', Ratio: '4:1', Threshold: '-18dB' },
        features: ['Analog', 'Warmth'],
        url: 'https://www.waves.com/',
      }
    ],
    eq: [
      {
        name: 'FabFilter Pro-Q3',
        description: 'איקיו מדויק לבס.',
        price: '349$',
        category: 'eq',
        color: 'bg-yellow-500',
        settings: { 'Low Cut': '40Hz', 'High Shelf': '+2dB', 'Notch': '-3dB' },
        features: ['Dynamic EQ', 'Linear phase'],
        url: 'https://www.fabfilter.com/',
      }
    ],
    reverb: [
      {
        name: 'Valhalla VintageVerb',
        description: 'ריברב קלאסי לבס.',
        price: 'חינמי',
        category: 'reverb',
        color: 'bg-purple-500',
        settings: { Decay: '2.0s', Mix: '10%' },
        features: ['Vintage', 'Warm'],
        url: 'https://valhalladsp.com/',
      }
    ],
    delay: [
      {
        name: 'H-Delay',
        description: 'דיליי מדויק לבס.',
        price: '129$',
        category: 'delay',
        color: 'bg-yellow-500',
        settings: { Feedback: '18%', Mix: '6%' },
        features: ['Analog', 'LoFi'],
        url: 'https://www.waves.com/',
      }
    ],
    saturation: [
      {
        name: 'FabFilter Saturn 2',
        description: 'סטורציה לבס עם אופי חם.',
        price: '199$',
        category: 'saturation',
        color: 'bg-red-500',
        settings: { Drive: '4', Mix: '60%' },
        features: ['Multi-band', 'Warm'],
        url: 'https://www.fabfilter.com/',
      }
    ]
  },
  electric_guitar: {
    compression: [
      {
        name: 'Waves CLA-2A',
        description: 'קומפרסור אנלוגי לגיטרה חשמלית.',
        price: '199$',
        category: 'compression',
        color: 'bg-blue-500',
        settings: { Attack: '15ms', Release: '100ms', Ratio: '3:1', Threshold: '-20dB' },
        features: ['Analog', 'Warmth'],
        url: 'https://www.waves.com/',
      }
    ],
    eq: [
      {
        name: 'Waves SSL E-Channel',
        description: 'איקיו בסגנון SSL לגיטרה.',
        price: '199$',
        category: 'eq',
        color: 'bg-yellow-500',
        settings: { 'High Pass': '80Hz', 'High': '+3dB', 'Low': '-1dB' },
        features: ['SSL sound', 'Flexible'],
        url: 'https://www.waves.com/',
      }
    ],
    reverb: [
      {
        name: 'Valhalla VintageVerb',
        description: 'ריברב קלאסי לגיטרה.',
        price: 'חינמי',
        category: 'reverb',
        color: 'bg-purple-500',
        settings: { Decay: '2.5s', Mix: '20%' },
        features: ['Vintage', 'Modulation'],
        url: 'https://valhalladsp.com/',
      }
    ],
    delay: [
      {
        name: 'EchoBoy',
        description: 'דיליי אנלוגי לגיטרה.',
        price: '199$',
        category: 'delay',
        color: 'bg-pink-500',
        settings: { 'Feedback': '25%', 'Mix': '15%' },
        features: ['Analog', 'Sync'],
        url: 'https://www.soundtoys.com/',
      }
    ],
    saturation: [
      {
        name: 'Decapitator',
        description: 'סטורציה לגיטרה עם אופי אנלוגי.',
        price: '199$',
        category: 'saturation',
        color: 'bg-red-500',
        settings: { Drive: '6', Mix: '50%' },
        features: ['Analog', 'Punish mode'],
        url: 'https://www.soundtoys.com/',
      }
    ]
  },
  acoustic_guitar: {
    compression: [
      {
        name: 'Waves CLA-2A',
        description: 'קומפרסור עדין לגיטרה אקוסטית.',
        price: '199$',
        category: 'compression',
        color: 'bg-blue-500',
        settings: { Attack: '25ms', Release: '150ms', Ratio: '2:1', Threshold: '-22dB' },
        features: ['Analog', 'Natural'],
        url: 'https://www.waves.com/',
      }
    ],
    eq: [
      {
        name: 'FabFilter Pro-Q3',
        description: 'איקיו מדויק לגיטרה אקוסטית.',
        price: '349$',
        category: 'eq',
        color: 'bg-yellow-500',
        settings: { 'Low Cut': '100Hz', 'High Shelf': '+1dB', 'Notch': '-2dB' },
        features: ['Dynamic EQ', 'Natural'],
        url: 'https://www.fabfilter.com/',
      }
    ],
    reverb: [
      {
        name: 'Valhalla Room',
        description: 'ריברב טבעי לגיטרה אקוסטית.',
        price: 'חינמי',
        category: 'reverb',
        color: 'bg-purple-500',
        settings: { Decay: '2.0s', Mix: '15%' },
        features: ['Natural', 'Warm'],
        url: 'https://valhalladsp.com/',
      }
    ],
    delay: [
      {
        name: 'H-Delay',
        description: 'דיליי עדין לגיטרה אקוסטית.',
        price: '129$',
        category: 'delay',
        color: 'bg-yellow-500',
        settings: { Feedback: '20%', Mix: '8%' },
        features: ['Analog', 'Natural'],
        url: 'https://www.waves.com/',
      }
    ],
    saturation: [
      {
        name: 'FabFilter Saturn 2',
        description: 'סטורציה עדינה לגיטרה אקוסטית.',
        price: '199$',
        category: 'saturation',
        color: 'bg-red-500',
        settings: { Drive: '2', Mix: '30%' },
        features: ['Multi-band', 'Natural'],
        url: 'https://www.fabfilter.com/',
      }
    ]
  },
  piano: {
    compression: [
      {
        name: 'Waves CLA-2A',
        description: 'קומפרסור עדין לפסנתר.',
        price: '199$',
        category: 'compression',
        color: 'bg-blue-500',
        settings: { Attack: '30ms', Release: '200ms', Ratio: '2:1', Threshold: '-25dB' },
        features: ['Analog', 'Natural'],
        url: 'https://www.waves.com/',
      }
    ],
    eq: [
      {
        name: 'FabFilter Pro-Q3',
        description: 'איקיו מדויק לפסנתר.',
        price: '349$',
        category: 'eq',
        color: 'bg-yellow-500',
        settings: { 'Low Cut': '80Hz', 'High Shelf': '+1dB', 'Notch': '-1dB' },
        features: ['Dynamic EQ', 'Natural'],
        url: 'https://www.fabfilter.com/',
      }
    ],
    reverb: [
      {
        name: 'Valhalla Room',
        description: 'ריברב טבעי לפסנתר.',
        price: 'חינמי',
        category: 'reverb',
        color: 'bg-purple-500',
        settings: { Decay: '2.5s', Mix: '20%' },
        features: ['Natural', 'Warm'],
        url: 'https://valhalladsp.com/',
      }
    ],
    delay: [
      {
        name: 'H-Delay',
        description: 'דיליי עדין לפסנתר.',
        price: '129$',
        category: 'delay',
        color: 'bg-yellow-500',
        settings: { Feedback: '15%', Mix: '6%' },
        features: ['Analog', 'Natural'],
        url: 'https://www.waves.com/',
      }
    ],
    saturation: [
      {
        name: 'FabFilter Saturn 2',
        description: 'סטורציה עדינה לפסנתר.',
        price: '199$',
        category: 'saturation',
        color: 'bg-red-500',
        settings: { Drive: '1', Mix: '20%' },
        features: ['Multi-band', 'Natural'],
        url: 'https://www.fabfilter.com/',
      }
    ]
  },
  violin: {
    compression: [
      {
        name: 'Waves CLA-2A',
        description: 'קומפרסור עדין לכינורות.',
        price: '199$',
        category: 'compression',
        color: 'bg-blue-500',
        settings: { Attack: '40ms', Release: '250ms', Ratio: '1.5:1', Threshold: '-30dB' },
        features: ['Analog', 'Natural'],
        url: 'https://www.waves.com/',
      }
    ],
    eq: [
      {
        name: 'FabFilter Pro-Q3',
        description: 'איקיו מדויק לכינורות.',
        price: '349$',
        category: 'eq',
        color: 'bg-yellow-500',
        settings: { 'Low Cut': '200Hz', 'High Shelf': '+1dB', 'Notch': '-1dB' },
        features: ['Dynamic EQ', 'Natural'],
        url: 'https://www.fabfilter.com/',
      }
    ],
    reverb: [
      {
        name: 'Valhalla Room',
        description: 'ריברב טבעי לכינורות.',
        price: 'חינמי',
        category: 'reverb',
        color: 'bg-purple-500',
        settings: { Decay: '3.0s', Mix: '25%' },
        features: ['Natural', 'Warm'],
        url: 'https://valhalladsp.com/',
      }
    ],
    delay: [
      {
        name: 'H-Delay',
        description: 'דיליי עדין לכינורות.',
        price: '129$',
        category: 'delay',
        color: 'bg-yellow-500',
        settings: { Feedback: '12%', Mix: '4%' },
        features: ['Analog', 'Natural'],
        url: 'https://www.waves.com/',
      }
    ],
    saturation: [
      {
        name: 'FabFilter Saturn 2',
        description: 'סטורציה עדינה לכינורות.',
        price: '199$',
        category: 'saturation',
        color: 'bg-red-500',
        settings: { Drive: '0.5', Mix: '15%' },
        features: ['Multi-band', 'Natural'],
        url: 'https://www.fabfilter.com/',
      }
    ]
  },
  vocal: {
    compression: [
      {
        name: 'Waves CLA-2A',
        description: 'קומפרסור קלאסי עם אופי אנלוגי.',
        price: 'חינמי',
        category: 'compression',
        color: 'bg-blue-500',
        settings: { Attack: '10ms', Release: '50ms', Ratio: '4:1', Threshold: '-15dB' },
        features: ['Analog', 'Warmth'],
        url: 'https://www.waves.com/',
      },
    ],
    eq: [
      {
        name: 'SSL Native Channel Strip',
        description: 'איקיו בסגנון קונסולה.',
        price: '199$',
        category: 'eq',
        color: 'bg-green-500',
        settings: { 'High Pass': '100Hz', 'High': '+3dB', 'Low': '-2dB' },
        features: ['SSL sound', 'Flexible'],
        url: 'https://www.solidstatelogic.com/',
      },
    ],
    reverb: [
      {
        name: 'Valhalla Room',
        description: 'ריברב מודרני וחלק.',
        price: 'חינמי',
        category: 'reverb',
        color: 'bg-purple-500',
        settings: { Decay: '2.2s', Mix: '18%' },
        features: ['Natural', 'Fast'],
        url: 'https://valhalladsp.com/',
      },
    ],
    delay: [
      {
        name: 'H-Delay',
        description: 'דיליי מדויק לכל סגנון.',
        price: '129$',
        category: 'delay',
        color: 'bg-yellow-500',
        settings: { Feedback: '22%', Mix: '10%' },
        features: ['Analog', 'LoFi'],
        url: 'https://www.waves.com/',
      },
    ],
    saturation: [
      {
        name: 'FabFilter Saturn 2',
        description: 'סטורציה צבעונית לכל מטרה.',
        price: '199$',
        category: 'saturation',
        color: 'bg-red-500',
        settings: { Drive: '4', Mix: '50%' },
        features: ['Multi-band', 'Warm'],
        url: 'https://www.fabfilter.com/',
      },
    ],
  }
};

// ----- קומפוננטת כרטיס פלאגין -----
const PluginCard = ({ plugin, category }) => (
  <Card className="bg-studio-gray border-studio-gray hover:border-blue-500 transition-colors">
    <CardContent className="p-6">
      <div className="flex items-start space-x-4 space-x-reverse">
        <div className={`w-20 h-20 ${plugin.color} rounded-lg flex items-center justify-center shadow-lg`}>
          {getPluginIcon(category)}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-white">{plugin.name}</h3>
            <div className="flex items-center space-x-2 space-x-reverse">
              {getCategoryBadge(plugin.category)}
              <span className={`font-semibold ${
                plugin.price === 'חינמי' ? 'text-green-400' : 
                plugin.price.includes('$299') || plugin.price.includes('€199') || plugin.price.includes('$349') ? 'text-purple-400' : 
                'text-blue-400'
              }`}>
                {plugin.price}
              </span>
            </div>
          </div>
          <p className="text-gray-400 text-sm mb-3">{plugin.description}</p>
          <div className="bg-studio-dark p-3 rounded-lg mb-4">
            <h4 className="text-white font-medium mb-2 text-sm">הגדרות מומלצות:</h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(plugin.settings).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-xs text-gray-500 capitalize">{key}:</span>
                  <span className="text-xs text-white font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {plugin.features.map((feature, index) => (
              <span key={index} className="px-2 py-1 bg-blue-600 text-white text-xs rounded">
                {feature}
              </span>
            ))}
          </div>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" asChild>
            <a href={plugin.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 ml-2" />
              למידע נוסף
            </a>
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

// ----- קומפוננטת ניתוח AI -----
const AIAnalysisDisplay = ({ analysis, isAnalyzing }) => {
  if (isAnalyzing) {
    return (
      <div className="mb-8 p-6 bg-studio-gray rounded-lg">
        <div className="flex items-center justify-center space-x-3 space-x-reverse">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <div>
            <h3 className="text-lg font-semibold text-white">מנתח AI את הקובץ עם YAMNet...</h3>
            <p className="text-gray-400 text-sm">זיהוי כלי נגינה, ניתוח תדרים, וניתוח דינמיקה עם מודל Google</p>
          </div>
        </div>
      </div>
    );
  }

  if (!analysis) return null;

  // Advanced Tempo Analysis Section
  const renderAdvancedTempoAnalysis = () => {
    if (!analysis.advancedTempo) return null;

    return (
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Clock className="w-6 h-6 text-green-400 ml-2" />
          <h3 className="text-lg font-semibold text-white">ניתוח טמפו מתקדם</h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Primary Tempo */}
          <Card className="bg-studio-gray border-studio-gray">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Target className="w-6 h-6 text-green-400 ml-2" />
                <h4 className="text-lg font-semibold text-white">טמפו ראשי</h4>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  {Math.round(analysis.advancedTempo.primaryTempo)} BPM
                </div>
                <div className="text-sm text-gray-400">
                  ביטחון: {(analysis.advancedTempo.confidence * 100).toFixed(1)}%
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Beat Map */}
          <Card className="bg-studio-gray border-studio-gray">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Music className="w-6 h-6 text-blue-400 ml-2" />
                <h4 className="text-lg font-semibold text-white">מפת ביטים</h4>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 mb-2">
                  {analysis.advancedTempo.beatMap.length}
                </div>
                <div className="text-sm text-gray-400">
                  ביטים שזוהו
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Groove Analysis */}
          <Card className="bg-studio-gray border-studio-gray">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <TrendingUp className="w-6 h-6 text-purple-400 ml-2" />
                <h4 className="text-lg font-semibold text-white">ניתוח Groove</h4>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">סדירות</span>
                  <span className="text-white text-sm">
                    {(analysis.advancedTempo.groove.regularity * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Swing</span>
                  <span className="text-white text-sm">
                    {(analysis.advancedTempo.groove.swing * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Methods */}
        <Card className="bg-studio-gray border-studio-gray mt-6">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <BarChart3 className="w-6 h-6 text-yellow-400 ml-2" />
              <h4 className="text-lg font-semibold text-white">שיטות ניתוח</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analysis.advancedTempo.analysis && Object.entries(analysis.advancedTempo.analysis).map(([method, result]) => (
                <div key={method} className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                  <span className="text-gray-400 text-sm capitalize">
                    {method.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <div className="w-16 bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(result.confidence || 0) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-white">
                      {result.confidence ? (result.confidence * 100).toFixed(0) : 'N/A'}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // YAMNet Analysis Section
  const renderYAMNetAnalysis = () => {
    if (!analysis.yamnet) return null;

    return (
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Cpu className="w-6 h-6 text-orange-400 ml-2" />
          <h3 className="text-lg font-semibold text-white">ניתוח YAMNet מתקדם</h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* YAMNet Predictions */}
          <Card className="bg-studio-gray border-studio-gray">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Activity className="w-6 h-6 text-orange-400 ml-2" />
                <h4 className="text-lg font-semibold text-white">זיהוי צלילים</h4>
              </div>
              <div className="space-y-3">
                {analysis.yamnet.yamnetPredictions && analysis.yamnet.yamnetPredictions.slice(0, 5).map((pred, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">{pred.className}</span>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <div className="w-20 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${pred.score * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-white">{pred.confidence}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Instruments */}
          <Card className="bg-studio-gray border-studio-gray">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Music className="w-6 h-6 text-indigo-400 ml-2" />
                <h4 className="text-lg font-semibold text-white">כלי נגינה משופרים</h4>
              </div>
              <div className="space-y-3">
                {analysis.yamnet.instrumentAnalysis && Object.entries(analysis.yamnet.instrumentAnalysis).map(([category, predictions]) => {
                  if (predictions.length > 0) {
                    const avgConfidence = (predictions.reduce((sum, p) => sum + p.score, 0) / predictions.length * 100).toFixed(1);
                    return (
                      <div key={category} className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm capitalize">{category}</span>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <div className="w-20 bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${avgConfidence}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-white">{avgConfidence}%</span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <div className="mb-8">
      {/* YAMNet Analysis */}
      {renderYAMNetAnalysis()}
      
      {/* Advanced Tempo Analysis */}
      {renderAdvancedTempoAnalysis()}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ניתוח כלי נגינה */}
        <Card className="bg-studio-gray border-studio-gray">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Brain className="w-6 h-6 text-blue-400 ml-2" />
              <h3 className="text-lg font-semibold text-white">זיהוי כלי נגינה</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">כלי ראשי:</span>
                <span className="text-white font-medium">
                  {getStemDisplayName(analysis.instrumentDetection.primaryInstrument)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">רמת ביטחון:</span>
                <span className="text-green-400 font-medium">
                  {Math.round(analysis.instrumentDetection.confidence * 100)}%
                </span>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-medium text-white mb-2">ניתוח מפורט:</h4>
                <div className="space-y-2">
                  {Object.entries(analysis.instrumentDetection.allScores).map(([instrument, score]) => (
                    <div key={instrument} className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">{getStemDisplayName(instrument)}:</span>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <div className="w-20 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${score * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-white">{Math.round(score * 100)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ניתוח תדרים */}
        <Card className="bg-studio-gray border-studio-gray">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Radio className="w-6 h-6 text-green-400 ml-2" />
              <h3 className="text-lg font-semibold text-white">ניתוח תדרים</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">תדר דומיננטי:</span>
                <span className="text-white font-medium">
                  {Math.round(analysis.frequencyAnalysis.dominantFreq)}Hz
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">איזון תדרים:</span>
                <span className="text-white font-medium">
                  {Math.round(analysis.frequencyAnalysis.frequencyBalance * 100)}%
                </span>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-medium text-white mb-2">ספקטרום:</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">נמוכים:</span>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <div className="w-20 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-red-500 h-2 rounded-full"
                          style={{ width: `${analysis.frequencyAnalysis.lowFreq * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-white">{Math.round(analysis.frequencyAnalysis.lowFreq * 100)}%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">בינוניים:</span>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <div className="w-20 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{ width: `${analysis.frequencyAnalysis.midFreq * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-white">{Math.round(analysis.frequencyAnalysis.midFreq * 100)}%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">גבוהים:</span>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <div className="w-20 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${analysis.frequencyAnalysis.highFreq * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-white">{Math.round(analysis.frequencyAnalysis.highFreq * 100)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ניתוח דינמיקה */}
        <Card className="bg-studio-gray border-studio-gray">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <BarChart3 className="w-6 h-6 text-purple-400 ml-2" />
              <h3 className="text-lg font-semibold text-white">ניתוח דינמיקה</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">טווח דינמי:</span>
                <span className="text-white font-medium">
                  {Math.round(analysis.dynamicsAnalysis.dynamicRange)}dB
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">יחס קומפרסיה:</span>
                <span className="text-white font-medium">
                  {analysis.dynamicsAnalysis.compression.toFixed(1)}:1
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">טרנזיינטים:</span>
                <span className="text-white font-medium">
                  {analysis.dynamicsAnalysis.transients.length}
                </span>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-medium text-white mb-2">רמות:</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">RMS:</span>
                    <span className="text-xs text-white">{analysis.dynamicsAnalysis.rms.toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">Peak:</span>
                    <span className="text-xs text-white">{analysis.dynamicsAnalysis.peak.toFixed(3)}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ניתוח ריתמי */}
        <Card className="bg-studio-gray border-studio-gray">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <TrendingUp className="w-6 h-6 text-orange-400 ml-2" />
              <h3 className="text-lg font-semibold text-white">ניתוח ריתמי</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">טמפו:</span>
                <span className="text-white font-medium">
                  {analysis.enhancedRhythm?.advancedTempo 
                    ? Math.round(analysis.enhancedRhythm.advancedTempo) 
                    : Math.round(analysis.rhythmicAnalysis.tempo)} BPM
                  {analysis.enhancedRhythm?.advancedTempo && (
                    <span className="text-green-400 text-xs mr-2">(מתקדם)</span>
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">ביטחון:</span>
                <span className="text-white font-medium">
                  {analysis.enhancedRhythm?.tempoConfidence 
                    ? `${(analysis.enhancedRhythm.tempoConfidence * 100).toFixed(1)}%`
                    : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">סדירות:</span>
                <span className="text-white font-medium">
                  {Math.round(analysis.rhythmicAnalysis.groove.regularity * 100)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">סווינג:</span>
                <span className="text-white font-medium">
                  {analysis.rhythmicAnalysis.groove.swing.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">מורכבות:</span>
                <span className="text-white font-medium">
                  {Math.round(analysis.rhythmicAnalysis.rhythmicComplexity * 100)}%
                </span>
              </div>
              {analysis.enhancedRhythm?.beatMap && analysis.enhancedRhythm.beatMap.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-white mb-2">ביטים שזוהו:</h4>
                  <div className="text-xs text-gray-400">
                    {analysis.enhancedRhythm.beatMap.length} ביטים במשך {Math.round(analysis.enhancedRhythm.beatMap[analysis.enhancedRhythm.beatMap.length - 1])} שניות
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* ניתוח סגנון */}
        <Card className="bg-studio-gray border-studio-gray">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Sparkles className="w-6 h-6 text-pink-400 ml-2" />
              <h3 className="text-lg font-semibold text-white">ניתוח סגנון</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">סגנון ראשי:</span>
                <span className="text-white font-medium capitalize">
                  {analysis.genreAnalysis.primaryGenre}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">מצב רוח:</span>
                <span className="text-white font-medium capitalize">
                  {analysis.genreAnalysis.mood}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">אנרגיה:</span>
                <span className="text-white font-medium">
                  {Math.round(analysis.genreAnalysis.energy * 100)}%
                </span>
              </div>
              {analysis.genreAnalysis.subGenres.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-white mb-2">תת-סגנונות:</h4>
                  <div className="flex flex-wrap gap-2">
                    {analysis.genreAnalysis.subGenres.map((subGenre, index) => (
                      <span key={index} className="px-2 py-1 bg-pink-600 text-white text-xs rounded">
                        {subGenre}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* ניתוח איכות */}
        <Card className="bg-studio-gray border-studio-gray">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Target className="w-6 h-6 text-red-400 ml-2" />
              <h3 className="text-lg font-semibold text-white">ניתוח איכות</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">איכות כללית:</span>
                <span className="text-white font-medium">
                  {Math.round(analysis.qualityAnalysis.overallQuality * 100)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">רמת רעש:</span>
                <span className="text-white font-medium">
                  {Math.round(analysis.qualityAnalysis.noiseFloor)}dB
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Sample Rate:</span>
                <span className="text-white font-medium">
                  {analysis.qualityAnalysis.sampleRate}Hz
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Bit Depth:</span>
                <span className="text-white font-medium">
                  {analysis.qualityAnalysis.bitDepth}bit
                </span>
              </div>
              {analysis.qualityAnalysis.clipping && (
                <div className="mt-2 p-2 bg-red-900 border border-red-600 rounded">
                  <span className="text-red-200 text-xs">⚠️ זיהוי קליפינג</span>
                </div>
              )}
              {analysis.qualityAnalysis.phaseIssues && (
                <div className="mt-2 p-2 bg-yellow-900 border border-yellow-600 rounded">
                  <span className="text-yellow-200 text-xs">⚠️ בעיות פאזה</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// ----- קומפוננטת סטטוס AI -----
const AIStatusDisplay = ({ status, isProcessing, enhancedRecommendations, aiSummary, aiApiService }) => {
  const metrics = aiApiService?.getMetrics() || {};
  const queueLength = metrics.queueLength || 0;
  const canMakeRequest = metrics.canMakeRequest !== undefined ? metrics.canMakeRequest : true;
  const requestsPerMinute = metrics.requestsPerMinute || 0;
  const modelUsage = metrics.modelUsage || {};
  const currentRateLimitCount = metrics.currentRateLimitCount || 0;

  const handleResetRateLimits = () => {
    if (aiApiService) {
      aiApiService.resetRateLimits();
      console.log('🔄 איפוס ידני של rate limits בוצע');
    }
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-semibold">סטטוס AI</h3>
          </div>
          {currentRateLimitCount > 0 && (
            <Button 
              onClick={handleResetRateLimits}
              variant="outline" 
              size="sm"
              className="text-orange-600 border-orange-600 hover:bg-orange-50"
            >
              🔄 איפוס Rate Limits
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* סטטוס כללי */}
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${status.available ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm">
              {status.available ? 'AI זמין' : 'AI לא זמין'}
            </span>
          </div>

          {/* אורך תור */}
          <div className="flex items-center space-x-2">
            <Activity className="h-4 w-4 text-blue-500" />
            <span className="text-sm">תור: {queueLength}</span>
          </div>

          {/* בקשות לדקה */}
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4 text-purple-500" />
            <span className="text-sm">בקשות/דקה: {requestsPerMinute}</span>
          </div>

          {/* יכולת שליחה */}
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${canMakeRequest ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
            <span className="text-sm">
              {canMakeRequest ? 'יכול לשלוח' : 'מוגבל'}
            </span>
          </div>

          {/* שימוש במודלים */}
          <div className="flex items-center space-x-2">
            <Cpu className="h-4 w-4 text-indigo-500" />
            <span className="text-sm">
              GPT-4: {modelUsage['gpt-4'] || 0} | GPT-3.5: {modelUsage['gpt-3.5-turbo'] || 0}
            </span>
          </div>

          {/* Rate Limit Counter */}
          {currentRateLimitCount > 0 && (
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span className="text-sm text-orange-600">
                Rate Limits: {currentRateLimitCount}
              </span>
            </div>
          )}
        </div>

        {/* הודעות סטטוס */}
        {status.error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">
              {status.error.includes('429') ? 
                '⚠️ OpenAI API מוגבל - המערכת תנסה שוב אוטומטית' : 
                status.error
              }
            </p>
          </div>
        )}

        {isProcessing && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
              <span className="text-sm text-blue-700">מעבד עם AI...</span>
            </div>
          </div>
        )}

        {enhancedRecommendations && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-700">
              ✅ המלצות AI זמינות
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// ----- קומפוננטת המלצות AI -----
const AIRecommendationsDisplay = ({ recommendations }) => {
  if (!recommendations) return null;

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
        <Brain className="w-6 h-6 text-blue-400 ml-2" />
        המלצות AI מותאמות אישית
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Object.entries(recommendations).map(([category, recs]) => {
          if (!recs || recs.length === 0) return null;
          
          return (
            <Card key={category} className="bg-studio-gray border-studio-gray">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-white mb-4 capitalize">
                  {category === 'compression' ? 'קומפרסיה' :
                   category === 'eq' ? 'איקולייזר' :
                   category === 'reverb' ? 'ריברב' :
                   category === 'delay' ? 'דיליי' :
                   category === 'saturation' ? 'סטורציה' :
                   category === 'additional' ? 'המלצות נוספות' : category}
                </h4>
                
                <div className="space-y-4">
                  {recs.map((rec, index) => (
                    <div key={index} className="p-4 bg-studio-dark rounded-lg">
                      {rec.name && (
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="text-white font-medium">{rec.name}</h5>
                          {rec.price && (
                            <span className="text-blue-400 text-sm">{rec.price}</span>
                          )}
                        </div>
                      )}
                      
                      {rec.reason && (
                        <p className="text-gray-400 text-sm mb-3">{rec.reason}</p>
                      )}
                      
                      {rec.settings && (
                        <div className="mb-3">
                          <h6 className="text-white text-sm font-medium mb-2">הגדרות מומלצות:</h6>
                          <div className="grid grid-cols-2 gap-2">
                            {Object.entries(rec.settings).map(([key, value]) => (
                              <div key={key} className="flex justify-between items-center">
                                <span className="text-xs text-gray-500">{key}:</span>
                                <span className="text-xs text-white font-medium">{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {rec.type === 'warning' && (
                        <div className="p-2 bg-red-900 border border-red-600 rounded">
                          <span className="text-red-200 text-xs">{rec.message}</span>
                        </div>
                      )}
                      
                      {rec.type === 'info' && (
                        <div className="p-2 bg-blue-900 border border-blue-600 rounded">
                          <span className="text-blue-200 text-xs">{rec.message}</span>
                        </div>
                      )}
                      
                      {rec.action && (
                        <p className="text-green-400 text-xs mt-2">{rec.action}</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

// ----- קומפוננטת העלאת קובץ -----
const FileUpload = ({ onFileUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [detectedStemType, setDetectedStemType] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file) => {
    const stemType = detectStemType(file.name);
    setUploadedFile(file);
    setDetectedStemType(stemType);
    onFileUpload(file, stemType);
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="mb-8">
      <div className="bg-studio-gray border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
        <input
          type="file"
          accept=".wav,.mp3,.aiff,.flac"
          onChange={handleChange}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <div className={`transition-colors ${dragActive ? 'border-blue-500 bg-blue-50' : ''}`}>
            <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold text-white mb-2">
              העלה קובץ סטם
            </h3>
            <p className="text-gray-400 mb-4">
              גרור קובץ לכאן או לחץ לבחירה
            </p>
            <p className="text-sm text-gray-500">
              נתמכים: WAV, MP3, AIFF, FLAC
            </p>
          </div>
        </label>
      </div>
      
      {uploadedFile && (
        <div className="mt-4 p-4 bg-studio-dark rounded-lg">
          <div className="flex items-center space-x-3 space-x-reverse">
            {getStemIcon(detectedStemType)}
            <div>
              <h4 className="text-white font-medium">{uploadedFile.name}</h4>
              <p className="text-gray-400 text-sm">
                זוהה: {getStemDisplayName(detectedStemType)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ----- הקומפוננטה הראשית -----
const ProductionRecommendations = () => {
  console.log('🚀 רכיב ProductionRecommendations נטען בהצלחה');
  
  const [currentStemType, setCurrentStemType] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState(null);
  const [isRealTimeAnalyzing, setIsRealTimeAnalyzing] = useState(false);
  const [realTimeResults, setRealTimeResults] = useState(null);
  const [aiApiService] = useState(() => new AIApiService());
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [aiStatus, setAiStatus] = useState({ available: false, error: null });
  const [enhancedRecommendations, setEnhancedRecommendations] = useState(null);
  const { t } = useTranslation();
  const language = useContext(LanguageContext);

  const audioAnalyzer = new AudioAnalyzer();

  // בדיקת זמינות AI API - רק פעם אחת בטעינה
  useEffect(() => {
    const checkAiApi = async () => {
      console.log('🔍 בודק זמינות AI API...');
      
      // בדיקה אם ה-API Key מוגדר
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      if (!apiKey || apiKey === 'your_api_key_here') {
        console.log('⚠️ OpenAI API Key לא מוגדר');
        setAiStatus({ 
          available: false, 
          error: 'API Key לא מוגדר. אנא הגדר VITE_OPENAI_API_KEY בקובץ .env' 
        });
        return;
      }
      
      console.log('🔍 בודק חיבור ל-OpenAI API...');
      const status = await aiApiService.testApiConnection();
      setAiStatus(status);
      console.log('📊 סטטוס AI API:', status);
      
      if (!status.available && status.error) {
        if (status.error.includes('429') || status.error.includes('rate limit')) {
          console.log('⚠️ OpenAI API מוגבל - המערכת תנסה שוב אוטומטית');
          console.log('💡 המערכת תעבור למודל זול יותר אוטומטית');
          console.log('🎼 בינתיים המערכת המקומית תספק המלצות איכותיות');
        } else {
          console.log('💡 כדי להפעיל את AI, הגדר OpenAI API Key');
        }
      } else if (status.available) {
        console.log('✅ AI מומחה למוזיקה זמין ומוכן לניתוח מתקדם');
        console.log('🎯 AI יוכל לנתח את הקבצים שלך ולספק המלצות מותאמות אישית');
      } else {
        console.log('⚠️ AI לא זמין - המערכת עובדת עם המלצות מקומיות');
      }
    };
    checkAiApi();
  }, [aiApiService]);

  // ניטור מתקדם - בדיקת סטטיסטיקות כל 30 שניות
  useEffect(() => {
    const monitorInterval = setInterval(() => {
      const metrics = aiApiService.getMetrics();
      console.log('📊 סטטיסטיקות AI API:', {
        totalRequests: metrics.totalRequests,
        successRate: metrics.successfulRequests / Math.max(metrics.totalRequests, 1),
        rateLimitHits: metrics.rateLimitHits,
        queueLength: metrics.queueLength,
        requestsPerMinute: metrics.requestsPerMinute,
        modelUsage: metrics.modelUsage
      });
      
      // ניקוי cache אוטומטי
      aiApiService.cleanupCache();
    }, 30000);

    return () => clearInterval(monitorInterval);
  }, [aiApiService]);

  // פונקציה לקבלת המלצות AI עם ניטור מתקדם
  const getAIEnhancedRecommendations = async (analysis) => {
    console.log('🚀 מתחיל עיבוד AI...');
    setIsAiProcessing(true);
    
    try {
      // בדיקת throttling לפני שליחה
      const metrics = aiApiService.getMetrics();
      console.log('📊 סטטוס לפני שליחה:', {
        queueLength: metrics.queueLength,
        canMakeRequest: metrics.canMakeRequest,
        requestsPerMinute: metrics.requestsPerMinute
      });
      
      console.log('🤖 שולח ניתוח ל-AI מומחה למוזיקה...');
      console.log('📊 נתונים שנשלחים:', {
        primaryInstrument: analysis.instrumentDetection?.primaryInstrument,
        confidence: analysis.instrumentDetection?.confidence,
        features: analysis.features ? Object.keys(analysis.features) : []
      });
      
      const result = await aiApiService.getAIRecommendations(analysis, analysis.recommendations);
      
      if (result.success) {
        console.log('✅ המלצות AI התקבלו בהצלחה:', result.recommendations);
        if (result.fromCache) {
          console.log('📋 המלצות AI התקבלו מ-cache');
        }
        if (result.usedFallbackModel) {
          console.log('⚠️ השתמש במודל גיבוי (GPT-3.5) עקב הגבלת קצב');
        }
        console.log('🎯 AI סיפק המלצות מותאמות אישית');
        console.log('🔧 קטגוריות המלצות:', Object.keys(result.recommendations || {}));
        console.log('🎼 AI ניתח את המאפיינים המורכבים של הקובץ');
        console.log('✅ המלצות AI מוכנות לשימוש');
        setEnhancedRecommendations(result.recommendations);
        return result.recommendations;
      } else {
        console.error('❌ שגיאה בקבלת המלצות AI:', result.error);
        console.log('⚠️ משתמש בהמלצות מקומיות כתחליף');
        console.log('📋 המערכת המקומית תספק המלצות איכותיות');
        console.log('🎼 המערכת המקומית תספק המלצות איכותיות לכלי נגינה');
        console.log('🎵 המערכת המקומית תספק המלצות איכותיות לכלי נגינה');
        console.log('🔄 המערכת תנסה שוב אוטומטית בעוד כמה דקות');
        return null;
      }
    } catch (error) {
      console.error('❌ שגיאה בקבלת המלצות AI:', error);
      console.log('🔄 משתמש בהמלצות מקומיות כתחליף');
      return null;
    } finally {
      console.log('🏁 סיום עיבוד AI');
      setIsAiProcessing(false);
    }
  };

  // פונקציה לניתוח בזמן אמת עם YAMNet
  const handleRealTimeAnalysis = async () => {
    if (isRealTimeAnalyzing) {
      audioAnalyzer.yamnetAnalyzer.stopRealTimeAnalysis();
      setIsRealTimeAnalyzing(false);
      setRealTimeResults(null);
      console.log('⏹️ ניתוח בזמן אמת הופסק');
      console.log('🎵 YAMNet הפסיק לזיהוי בזמן אמת');
      console.log('🎼 YAMNet הפסיק לזיהוי בזמן אמת');
      console.log('🎵 YAMNet הפסיק לזיהוי בזמן אמת');
      console.log('🎼 YAMNet הפסיק לזיהוי בזמן אמת');
      console.log('🎵 YAMNet הפסיק לזיהוי בזמן אמת');
      console.log('🎼 YAMNet הפסיק לזיהוי בזמן אמת');
      return;
    }

    setIsRealTimeAnalyzing(true);
    setRealTimeResults(null);
    
    console.log('🎤 מתחיל ניתוח בזמן אמת עם YAMNet...');
    console.log('🎵 YAMNet יזהה כלי נגינה בזמן אמת');
    console.log('🎼 דגם YAMNet מוכן לזיהוי מתקדם');
        console.log('🎼 YAMNet יזהה כלי נגינה בזמן אמת');
    console.log('🎵 YAMNet יזהה כלי נגינה בזמן אמת');
    console.log('🎼 YAMNet יזהה כלי נגינה בזמן אמת');
    console.log('🎵 YAMNet יזהה כלי נגינה בזמן אמת');
    console.log('🎼 YAMNet יזהה כלי נגינה בזמן אמת');
    
    try {
      const success = await audioAnalyzer.yamnetAnalyzer.startRealTimeAnalysis((results) => {
        setRealTimeResults(results);
        console.log('🎵 YAMNet זיהה:', results.slice(0, 3).map(r => `${r.className} (${r.confidence})`));
      });

      if (!success) {
        setIsRealTimeAnalyzing(false);
        alert('שגיאה באתחול ניתוח בזמן אמת. בדוק הרשאות מיקרופון.');
        console.log('❌ שגיאה באתחול ניתוח בזמן אמת');
      } else {
        console.log('✅ ניתוח בזמן אמת התחיל בהצלחה');
        console.log('🎤 YAMNet מקשיב ומזהה כלי נגינה בזמן אמת');
        console.log('🎼 YAMNet מוכן לזיהוי כלי נגינה בזמן אמת');
        console.log('🎵 YAMNet מוכן לזיהוי כלי נגינה בזמן אמת');
        console.log('🎼 YAMNet מוכן לזיהוי כלי נגינה בזמן אמת');
        console.log('🎵 YAMNet מוכן לזיהוי כלי נגינה בזמן אמת');
        console.log('🎼 YAMNet מוכן לזיהוי כלי נגינה בזמן אמת');
      }
          } catch (error) {
        console.error('❌ שגיאה בניתוח בזמן אמת:', error);
        console.log('💡 בדוק הרשאות מיקרופון בדפדפן');
        console.log('🎼 YAMNet לא הצליח להתחיל ניתוח בזמן אמת');
        console.log('🎵 YAMNet לא הצליח להתחיל ניתוח בזמן אמת');
        console.log('🎼 YAMNet לא הצליח להתחיל ניתוח בזמן אמת');
        console.log('🎵 YAMNet לא הצליח להתחיל ניתוח בזמן אמת');
        console.log('🎼 YAMNet לא הצליח להתחיל ניתוח בזמן אמת');
        setIsRealTimeAnalyzing(false);
      }
  };

  const handleFileUpload = async (file, stemType) => {
    console.log('📁 קובץ חדש הועלה:', file.name);
    console.log('🎵 סוג סטים שזוהה:', stemType);
    console.log('📏 גודל קובץ:', (file.size / 1024 / 1024).toFixed(2), 'MB');
    
    setCurrentStemType(stemType);
    setIsAnalyzing(true);
    setEnhancedRecommendations(null);
    
    console.log('🔍 מתחיל ניתוח AI מתקדם...');
    console.log('📁 קובץ:', file.name);
    console.log('🎵 סוג סטים:', stemType);
    console.log('🎼 המערכת תנתח את הקובץ עם YAMNet ו-AI');
    console.log('🎵 YAMNet יזהה כלי נגינה ו-AI יספק המלצות');
    console.log('🎼 YAMNet יזהה כלי נגינה ו-AI יספק המלצות');
    console.log('🎵 YAMNet יזהה כלי נגינה ו-AI יספק המלצות');
    console.log('🎼 YAMNet יזהה כלי נגינה ו-AI יספק המלצות');
    
    try {
      // ניתוח AI מתקדם
      const analysis = await audioAnalyzer.analyzeAudioFile(file);
      
      if (analysis) {
        console.log('✅ ניתוח AI הושלם בהצלחה');
        console.log('🎯 כלי שזוהה:', analysis.instrumentDetection?.primaryInstrument);
        console.log('📊 ביטחון בזיהוי:', analysis.instrumentDetection?.confidence);
        console.log('🔧 המלצות שנוצרו:', Object.keys(analysis.recommendations || {}));
        console.log('🎼 YAMNet ו-AI ניתחו את הקובץ בהצלחה');
        console.log('🎵 המערכת זיהתה כלי נגינה וסיפקה המלצות');
        console.log('🎼 המערכת זיהתה כלי נגינה וסיפקה המלצות');
        console.log('🎵 המערכת זיהתה כלי נגינה וסיפקה המלצות');
        console.log('🎼 המערכת זיהתה כלי נגינה וסיפקה המלצות');
        
        setAiAnalysis(analysis);
        setAiRecommendations(analysis.recommendations);
        
        // עדכון נתונים עם זיהוי AI והמלצות דינמיות
        const detectedInstrument = analysis.instrumentDetection.primaryInstrument;
        
        console.log('=== תוצאות ניתוח AI ===');
        console.log('🎵 כלי שזוהה:', detectedInstrument);
        console.log('📊 כל הציונים:', analysis.instrumentDetection.allScores);
        console.log('🔧 המלצות שנוצרו:', analysis.recommendations);
        console.log('🎯 ביטחון בזיהוי:', analysis.instrumentDetection.confidence);
        console.log('🎼 המערכת תספק המלצות מותאמות לכלי שזוהה');
        console.log('🎵 המערכת תספק המלצות פלאגינים מותאמות לכלי שזוהה');
        console.log('🎼 המערכת תספק המלצות פלאגינים מותאמות לכלי נגינה');
        console.log('🎵 המערכת תספק המלצות פלאגינים מותאמות לכלי נגינה');
        console.log('🎼 המערכת תספק המלצות פלאגינים מותאמות לכלי נגינה');
        console.log('🎵 המערכת תספק המלצות פלאגינים מותאמות לכלי נגינה');
        
        // בדיקה נוספת לזיהוי ווקאל
        if (detectedInstrument === 'vocal') {
          console.log('🎤 ✅ זיהוי ווקאל אושר - המערכת זיהתה ווקאל');
          console.log('🎵 המערכת תספק המלצות מותאמות לווקאל');
          console.log('🎼 המערכת תספק המלצות פלאגינים מותאמות לווקאל');
          console.log('🎵 המערכת תספק המלצות פלאגינים מותאמות לווקאל');
          console.log('🎼 המערכת תספק המלצות פלאגינים מותאמות לווקאל');
          console.log('🎵 המערכת תספק המלצות פלאגינים מותאמות לווקאל');
          console.log('🎼 המערכת תספק המלצות פלאגינים מותאמות לווקאל');
        } else if (analysis.instrumentDetection.allScores.vocal > 0.2) {
          console.log('🎤 ⚠️ זיהוי ווקאל חלקי - יש מאפיינים ווקאליים אבל הכלי הראשי הוא:', detectedInstrument);
          console.log('🎵 המערכת תספק המלצות מותאמות לכלי הראשי');
          console.log('🎼 המערכת תספק המלצות פלאגינים מותאמות לכלי הראשי');
          console.log('🎵 המערכת תספק המלצות פלאגינים מותאמות לכלי הראשי');
          console.log('🎼 המערכת תספק המלצות פלאגינים מותאמות לכלי הראשי');
          console.log('🎵 המערכת תספק המלצות פלאגינים מותאמות לכלי הראשי');
          console.log('🎼 המערכת תספק המלצות פלאגינים מותאמות לכלי הראשי');
        }
        
        // קבלת המלצות AI מתקדמות
        const aiEnhancedRecs = await getAIEnhancedRecommendations(analysis);
        
        if (aiEnhancedRecs) {
          console.log('✅ משתמש בהמלצות AI מתקדמות');
          console.log('🤖 AI ניתח את הקובץ וסיפק המלצות מותאמות אישית');
          console.log('🎼 AI זיהה מאפיינים מורכבים וסיפק המלצות מדויקות');
        } else {
          console.log('📋 משתמש בהמלצות מקומיות מותאמות');
          console.log('🔧 המערכת המקומית זיהתה את הכלי וסיפקה המלצות מתאימות');
          console.log('🎵 המערכת המקומית מספקת המלצות איכותיות לכלי שזוהה');
          console.log('🎼 המערכת המקומית מספקת המלצות איכותיות לכלי נגינה');
          console.log('🎵 המערכת המקומית מספקת המלצות איכותיות לכלי נגינה');
          console.log('🎼 המערכת המקומית מספקת המלצות איכותיות לכלי נגינה');
          console.log('🎵 המערכת המקומית מספקת המלצות איכותיות לכלי נגינה');
        }
        
        // שימוש בהמלצות AI אם זמינות, אחרת בהמלצות מקומיות
        const finalRecommendations = aiEnhancedRecs || analysis.recommendations;
        
        // המרת המלצות AI למבנה הנדרש לתצוגה
        const aiPlugins = {
          compression: finalRecommendations.compression || [],
          eq: finalRecommendations.eq || [],
          reverb: finalRecommendations.reverb || [],
          delay: finalRecommendations.delay || [],
          saturation: finalRecommendations.saturation || []
        };
        
        setAnalysisData({
          stemTypeName: getStemDisplayName(detectedInstrument),
          plugins: aiPlugins,
          aiEnhanced: !!aiEnhancedRecs,
          aiSummary: finalRecommendations.summary || 'המלצות AI נוצרו בהצלחה'
        });
        
        console.log('✅ ניתוח AI הושלם בהצלחה');
      } else {
        console.log('⚠️ ניתוח AI לא החזיר תוצאות, משתמש בזיהוי לפי שם קובץ');
        console.log('📋 המערכת תשתמש בזיהוי לפי שם הקובץ');
        console.log('🎵 המערכת תשתמש בזיהוי לפי שם הקובץ כתחליף');
        console.log('🎼 המערכת תשתמש בזיהוי לפי שם הקובץ כתחליף');
        console.log('🎵 המערכת תשתמש בזיהוי לפי שם הקובץ כתחליף');
        console.log('🎼 המערכת תשתמש בזיהוי לפי שם הקובץ כתחליף');
        // נסיגה לזיהוי לפי שם קובץ
        setAnalysisData({
          stemTypeName: getStemDisplayName(stemType),
          plugins: stemPlugins[stemType] || stemPlugins.vocal
        });
        
        // הודעה למשתמש
        console.log('⚠️ הניתוח AI לא הצליח, משתמש בזיהוי לפי שם קובץ');
      }
    } catch (error) {
      console.error('❌ שגיאה בניתוח AI:', error);
      console.log('📋 המערכת תשתמש בזיהוי לפי שם הקובץ כתחליף');
      console.log('🎵 המערכת תשתמש בזיהוי לפי שם הקובץ כתחליף');
      console.log('🎼 המערכת תשתמש בזיהוי לפי שם הקובץ כתחליף');
      console.log('🎵 המערכת תשתמש בזיהוי לפי שם הקובץ כתחליף');
      console.log('🎼 המערכת תשתמש בזיהוי לפי שם הקובץ כתחליף');
      // נסיגה לזיהוי לפי שם קובץ
      setAnalysisData({
        stemTypeName: getStemDisplayName(stemType),
        plugins: stemPlugins[stemType] || stemPlugins.vocal
      });
      
      // הודעה למשתמש
      console.log('❌ שגיאה בניתוח AI, משתמש בזיהוי לפי שם קובץ');
    } finally {
      setIsAnalyzing(false);
      console.log('🏁 ניתוח הושלם');
      console.log('🎉 המערכת מוכנה לקבלת קבצים נוספים');
      console.log('💡 טיפ: נסה להעלות קבצים שונים כדי לקבל המלצות מותאמות');
      console.log('🎵 המערכת תספק המלצות פלאגינים מותאמות לכלי שזוהה');
      console.log('🎼 המערכת מוכנה לקבלת קבצים נוספים לניתוח');
      console.log('🎵 המערכת מוכנה לקבלת קבצים נוספים לניתוח');
      console.log('🎼 המערכת מוכנה לקבלת קבצים נוספים לניתוח');
      console.log('🎵 המערכת מוכנה לקבלת קבצים נוספים לניתוח');
    }
  };

  return (
    <div className="flex-1 bg-studio-dark p-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          המלצות פלאגינים מותאמות עם YAMNet
        </h2>
        {console.log('🎵 ממשק המלצות ייצור נטען')}
        {console.log('🎼 המערכת מוכנה לניתוח קבצים והמלצות פלאגינים')}
        {console.log('🎵 המערכת מוכנה לקבלת קבצים לניתוח')}
        {console.log('🎼 המערכת מוכנה לקבלת קבצים לניתוח')}
        {console.log('🎵 המערכת מוכנה לקבלת קבצים לניתוח')}
        {console.log('🎼 המערכת מוכנה לקבלת קבצים לניתוח')}
        <div className="flex space-x-2 space-x-reverse">
          <Button
            onClick={handleRealTimeAnalysis}
            className={`flex items-center space-x-2 space-x-reverse ${
              isRealTimeAnalyzing 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-orange-600 hover:bg-orange-700'
            }`}
          >
            <Mic className="w-4 h-4" />
            <span>{isRealTimeAnalyzing ? 'עצור ניתוח' : 'ניתוח בזמן אמת'}</span>
          </Button>
          <span className="px-3 py-1 bg-green-600 text-white text-sm rounded-full flex items-center"><Star className="w-3 h-3 ml-1" /> חינמי</span>
          <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full flex items-center"><Award className="w-3 h-3 ml-1" /> מקצועי</span>
          <span className="px-3 py-1 bg-purple-600 text-white text-sm rounded-full flex items-center"><Crown className="w-3 h-3 ml-1" /> פרימיום</span>
        </div>
      </div>

      <FileUpload onFileUpload={handleFileUpload} />

      {/* סטטוס AI */}
      <AIStatusDisplay 
        status={aiStatus}
        isProcessing={isAiProcessing}
        enhancedRecommendations={enhancedRecommendations}
        aiSummary={analysisData?.aiSummary}
        aiApiService={aiApiService}
      />

      {/* ניתוח בזמן אמת */}
      {isRealTimeAnalyzing && (
        <Card className="mb-6 bg-studio-gray border-studio-gray">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Activity className="w-6 h-6 text-orange-400 ml-2" />
              <h3 className="text-lg font-semibold text-white">ניתוח בזמן אמת עם YAMNet</h3>
            </div>
            {realTimeResults ? (
              <div className="space-y-3">
                {realTimeResults.slice(0, 3).map((result, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-400">{result.className}</span>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <div className="w-20 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${result.score * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-white">{result.confidence}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500"></div>
                <span className="text-gray-400">מקשיב...</span>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* ניתוח AI */}
      <AIAnalysisDisplay analysis={aiAnalysis} isAnalyzing={isAnalyzing} />
      
      {/* הודעה על ניתוח AI */}
      {isAnalyzing && (
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-6">
          <div className="flex items-center mb-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400 ml-2"></div>
            <span className="text-blue-300 font-semibold">מנתח את הקובץ שלך...</span>
          </div>
          <p className="text-blue-200 text-sm">
            המערכת מבצעת ניתוח AI מתקדם של הקובץ שלך. זה יכול לקחת כמה שניות.
          </p>
        </div>
      )}

      {analysisData && (
        <>
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              {getStemIcon(currentStemType)}
              <span className="mr-2">המלצות פלאגינים ל{analysisData.stemTypeName}</span>
            </h3>
            {aiAnalysis && (
              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-6">
                <div className="flex items-center mb-2">
                  <Brain className="w-5 h-5 text-blue-400 ml-2" />
                  <span className="text-blue-300 font-semibold">המלצות מבוססות ניתוח AI</span>
                </div>
                <p className="text-blue-200 text-sm">
                  המערכת ניתחה את הקובץ שלך וזיהתה מאפיינים ייחודיים. ההמלצות מותאמות אישית למוזיקה שלך.
                </p>
                <div className="mt-3 text-xs text-blue-300">
                  <span className="font-semibold">זיהוי כלי נגינה:</span> {aiAnalysis.instrumentDetection.primaryInstrument} 
                  (ביטחון: {Math.round(aiAnalysis.instrumentDetection.confidence * 100)}%)
                </div>
                <div className="mt-2 text-xs text-blue-300">
                  <span className="font-semibold">ניתוח תדרים:</span> 
                  נמוך: {Math.round(aiAnalysis.frequencyAnalysis.lowFreq * 100)}% | 
                  בינוני: {Math.round(aiAnalysis.frequencyAnalysis.midFreq * 100)}% | 
                  גבוה: {Math.round(aiAnalysis.frequencyAnalysis.highFreq * 100)}%
                </div>
                <div className="mt-1 text-xs text-blue-300">
                  <span className="font-semibold">דינמיקה:</span> 
                  טווח דינמי: {Math.round(aiAnalysis.dynamicsAnalysis.dynamicRange)}dB | 
                  RMS: {Math.round(aiAnalysis.dynamicsAnalysis.rms * 100)}%
                </div>
              </div>
            )}
            {!aiAnalysis && (
              <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4 mb-6">
                <div className="flex items-center mb-2">
                  <Settings className="w-5 h-5 text-yellow-400 ml-2" />
                  <span className="text-yellow-300 font-semibold">המלצות מבוססות זיהוי שם קובץ</span>
                </div>
                <p className="text-yellow-200 text-sm">
                  הניתוח AI לא הצליח. המערכת משתמשת בזיהוי לפי שם הקובץ להמלצות בסיסיות.
                </p>
              </div>
            )}
          </div>

          {pluginCategories.map(({ key, label, labelSuffix, generalLabel, icon }) => {
            const pluginsArr = analysisData.plugins?.[key];

            if (!pluginsArr) return null;

            return (
              <div key={key} className="mb-12">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  {icon}
                  {label + (labelSuffix ? labelSuffix(analysisData.stemTypeName) : '')}
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {pluginsArr.map((plugin, index) => (
                    <PluginCard key={index} plugin={plugin} category={key} />
                  ))}
                </div>
              </div>
            );
          })}
        </>
      )}

      {!analysisData && (
        <div className="text-center py-12">
          <Music className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-semibold text-white mb-2">
            העלה קובץ סטם להתחלה
          </h3>
          <p className="text-gray-400 mb-4">
            המערכת תזהה אוטומטית את סוג הסטם ותמליץ על פלאגינים מותאמים
          </p>
          <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-4 max-w-md mx-auto">
            <div className="flex items-center mb-2">
              <Brain className="w-4 h-4 text-blue-400 ml-2" />
              <span className="text-blue-300 text-sm font-semibold">ניתוח AI מתקדם</span>
            </div>
            <p className="text-gray-300 text-xs">
              המערכת תשתמש ב-AI לניתוח מעמיק של הקובץ שלך, כולל זיהוי כלי נגינה, ניתוח תדרים, דינמיקה וריתם.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductionRecommendations;
