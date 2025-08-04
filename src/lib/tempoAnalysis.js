// ניתוח טמפו מתקדם עם טכנולוגיות מקצועיות
// Advanced Tempo Analysis with Professional Technologies

export class AdvancedTempoAnalyzer {
  constructor() {
    this.audioContext = null;
    this.sampleRate = 44100;
    this.minTempo = 60;
    this.maxTempo = 200;
    this.tempoCandidates = [];
    this.beatMap = [];
    this.confidence = 0;
  }

  // אתחול מערכת ניתוח טמפו
  async initialize() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.sampleRate = this.audioContext.sampleRate;
      console.log('🎵 מערכת ניתוח טמפו מתקדמת אותחלה');
      return true;
    } catch (error) {
      console.error('❌ שגיאה באתחול מערכת ניתוח טמפו:', error);
      return false;
    }
  }

  // ניתוח טמפו מתקדם עם שילוב טכנולוגיות
  async analyzeTempoAdvanced(audioBuffer) {
    console.log('🎵 מתחיל ניתוח טמפו מתקדם...');
    
    const results = {
      primaryTempo: 120,
      confidence: 0,
      beatMap: [],
      timeSignature: { numerator: 4, denominator: 4 },
      groove: { swing: 0, regularity: 0 },
      analysis: {
        autocorrelation: null,
        spectralFlux: null,
        onsetDetection: null,
        beatTracking: null
      }
    };

    try {
      // 1. ניתוח אוטוקורלציה מתקדם
      const autocorrResult = this.performAdvancedAutocorrelation(audioBuffer);
      results.analysis.autocorrelation = autocorrResult;

      // 2. זיהוי Onset מתקדם
      const onsetResult = this.performOnsetDetection(audioBuffer);
      results.analysis.onsetDetection = onsetResult;

      // 3. ניתוח Spectral Flux
      const spectralResult = this.performSpectralFluxAnalysis(audioBuffer);
      results.analysis.spectralFlux = spectralResult;

      // 4. מעקב ביטים מתקדם
      const beatResult = this.performAdvancedBeatTracking(audioBuffer);
      results.analysis.beatTracking = beatResult;

      // 5. משקלול תוצאות
      const finalResult = this.combineTempoResults([
        autocorrResult,
        onsetResult,
        spectralResult,
        beatResult
      ]);

      results.primaryTempo = finalResult.tempo;
      results.confidence = finalResult.confidence;
      results.beatMap = finalResult.beatMap;
      results.groove = finalResult.groove;

      console.log('✅ ניתוח טמפו מתקדם הושלם:', {
        tempo: results.primaryTempo,
        confidence: results.confidence,
        beatCount: results.beatMap.length
      });

      return results;

    } catch (error) {
      console.error('❌ שגיאה בניתוח טמפו מתקדם:', error);
      return results;
    }
  }

  // ניתוח אוטוקורלציה מתקדם (בהשראת Essentia)
  performAdvancedAutocorrelation(audioBuffer) {
    const channelData = audioBuffer.getChannelData(0);
    const frameSize = Math.floor(this.sampleRate * 0.1); // 100ms frames
    const hopSize = Math.floor(frameSize / 2);
    const frames = [];

    // חלוקה לפריימים
    for (let i = 0; i < channelData.length - frameSize; i += hopSize) {
      const frame = channelData.slice(i, i + frameSize);
      frames.push(frame);
    }

    // חישוב אוטוקורלציה לכל פריים
    const autocorrResults = frames.map(frame => {
      return this.calculateAutocorrelation(frame);
    });

    // זיהוי דפוסים ריתמיים
    const tempoCandidates = this.findTempoCandidates(autocorrResults);
    
    return {
      method: 'autocorrelation',
      tempoCandidates: tempoCandidates,
      confidence: this.calculateConfidence(autocorrResults),
      rhythmPatterns: this.extractRhythmPatterns(autocorrResults)
    };
  }

  // חישוב אוטוקורלציה מתקדם
  calculateAutocorrelation(data) {
    const length = data.length;
    const autocorr = new Float32Array(length);
    
    for (let lag = 0; lag < length; lag++) {
      let sum = 0;
      for (let i = 0; i < length - lag; i++) {
        sum += data[i] * data[i + lag];
      }
      autocorr[lag] = sum / (length - lag);
    }
    
    return autocorr;
  }

  // זיהוי Onset מתקדם (בהשראת Aubio)
  performOnsetDetection(audioBuffer) {
    const channelData = audioBuffer.getChannelData(0);
    const frameSize = Math.floor(this.sampleRate * 0.023); // 23ms frames
    const hopSize = Math.floor(frameSize / 2);
    const onsets = [];
    const onsetStrengths = [];

    // חישוב Spectral Flux לכל פריים
    for (let i = 0; i < channelData.length - frameSize; i += hopSize) {
      const frame = channelData.slice(i, i + frameSize);
      const spectrum = this.calculateSpectrum(frame);
      
      if (i > 0) {
        const prevFrame = channelData.slice(i - hopSize, i - hopSize + frameSize);
        const prevSpectrum = this.calculateSpectrum(prevFrame);
        const flux = this.calculateSpectralFlux(prevSpectrum, spectrum);
        onsetStrengths.push(flux);
        
        // זיהוי Onset
        if (flux > this.calculateOnsetThreshold(onsetStrengths)) {
          onsets.push(i / this.sampleRate);
        }
      }
    }

    return {
      method: 'onset_detection',
      onsets: onsets,
      onsetStrengths: onsetStrengths,
      tempoEstimate: this.estimateTempoFromOnsets(onsets),
      confidence: this.calculateOnsetConfidence(onsets, onsetStrengths)
    };
  }

  // חישוב ספקטרום
  calculateSpectrum(data) {
    const fft = new FFT(data.length);
    const spectrum = fft.forward(data);
    return spectrum;
  }

  // חישוב Spectral Flux
  calculateSpectralFlux(prevSpectrum, currentSpectrum) {
    let flux = 0;
    for (let i = 0; i < prevSpectrum.length; i++) {
      const diff = currentSpectrum[i] - prevSpectrum[i];
      flux += Math.max(0, diff); // רק ערכים חיוביים
    }
    return flux;
  }

  // ניתוח Spectral Flux מתקדם
  performSpectralFluxAnalysis(audioBuffer) {
    const channelData = audioBuffer.getChannelData(0);
    const frameSize = Math.floor(this.sampleRate * 0.046); // 46ms frames
    const hopSize = Math.floor(frameSize / 2);
    const fluxValues = [];
    const peaks = [];

    // חישוב Spectral Flux
    for (let i = 0; i < channelData.length - frameSize; i += hopSize) {
      const frame = channelData.slice(i, i + frameSize);
      const spectrum = this.calculateSpectrum(frame);
      
      if (i > 0) {
        const prevFrame = channelData.slice(i - hopSize, i - hopSize + frameSize);
        const prevSpectrum = this.calculateSpectrum(prevFrame);
        const flux = this.calculateSpectralFlux(prevSpectrum, spectrum);
        fluxValues.push(flux);
        
        // זיהוי פיקים
        if (this.isPeak(fluxValues, fluxValues.length - 1)) {
          peaks.push(i / this.sampleRate);
        }
      }
    }

    return {
      method: 'spectral_flux',
      fluxValues: fluxValues,
      peaks: peaks,
      tempoEstimate: this.estimateTempoFromPeaks(peaks),
      confidence: this.calculateFluxConfidence(fluxValues)
    };
  }

  // מעקב ביטים מתקדם (בהשראת BeatNet)
  performAdvancedBeatTracking(audioBuffer) {
    const channelData = audioBuffer.getChannelData(0);
    const frameSize = Math.floor(this.sampleRate * 0.1); // 100ms frames
    const hopSize = Math.floor(frameSize / 2);
    const beatProbabilities = [];
    const beats = [];

    // חישוב הסתברויות ביט לכל פריים
    for (let i = 0; i < channelData.length - frameSize; i += hopSize) {
      const frame = channelData.slice(i, i + frameSize);
      const features = this.extractBeatFeatures(frame);
      const probability = this.calculateBeatProbability(features);
      beatProbabilities.push(probability);
      
      // זיהוי ביט
      if (probability > this.calculateBeatThreshold(beatProbabilities)) {
        beats.push(i / this.sampleRate);
      }
    }

    return {
      method: 'beat_tracking',
      beats: beats,
      beatProbabilities: beatProbabilities,
      tempoEstimate: this.estimateTempoFromBeats(beats),
      confidence: this.calculateBeatConfidence(beats, beatProbabilities)
    };
  }

  // חילוץ מאפיינים לביט טראקינג
  extractBeatFeatures(frame) {
    const features = {
      energy: this.calculateEnergy(frame),
      spectralCentroid: this.calculateSpectralCentroid(frame),
      spectralRolloff: this.calculateSpectralRolloff(frame),
      zeroCrossingRate: this.calculateZeroCrossingRate(frame),
      mfcc: this.calculateMFCC(frame)
    };
    
    return features;
  }

  // חישוב הסתברות ביט
  calculateBeatProbability(features) {
    // מודל פשוט לחישוב הסתברות ביט
    const energyWeight = 0.4;
    const spectralWeight = 0.3;
    const mfccWeight = 0.3;
    
    const energyScore = features.energy;
    const spectralScore = (features.spectralCentroid + features.spectralRolloff) / 2;
    const mfccScore = features.mfcc.reduce((sum, val) => sum + Math.abs(val), 0) / features.mfcc.length;
    
    return energyScore * energyWeight + spectralScore * spectralWeight + mfccScore * mfccWeight;
  }

  // משקלול תוצאות מכל השיטות
  combineTempoResults(results) {
    const tempoEstimates = [];
    const confidences = [];
    const beatMaps = [];

    // איסוף תוצאות מכל השיטות
    results.forEach(result => {
      if (result.tempoEstimate && result.confidence) {
        tempoEstimates.push(result.tempoEstimate);
        confidences.push(result.confidence);
      }
      if (result.beats) {
        beatMaps.push(...result.beats);
      }
    });

    // חישוב טמפו סופי
    const finalTempo = this.calculateWeightedTempo(tempoEstimates, confidences);
    const finalConfidence = this.calculateAverageConfidence(confidences);
    const finalBeatMap = this.mergeBeatMaps(beatMaps);

    return {
      tempo: finalTempo,
      confidence: finalConfidence,
      beatMap: finalBeatMap,
      groove: this.calculateGroove(finalBeatMap)
    };
  }

  // חישוב טמפו משוקלל
  calculateWeightedTempo(tempos, confidences) {
    if (tempos.length === 0) return 120;
    
    let weightedSum = 0;
    let totalWeight = 0;
    
    for (let i = 0; i < tempos.length; i++) {
      weightedSum += tempos[i] * confidences[i];
      totalWeight += confidences[i];
    }
    
    return totalWeight > 0 ? weightedSum / totalWeight : 120;
  }

  // חישוב Groove
  calculateGroove(beatMap) {
    if (beatMap.length < 2) return { swing: 0, regularity: 0 };
    
    const intervals = [];
    for (let i = 1; i < beatMap.length; i++) {
      intervals.push(beatMap[i] - beatMap[i - 1]);
    }
    
    const meanInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    const variance = intervals.reduce((sum, interval) => sum + Math.pow(interval - meanInterval, 2), 0) / intervals.length;
    
    const regularity = Math.max(0, 1 - Math.sqrt(variance) / meanInterval);
    const swing = this.calculateSwing(intervals);
    
    return { swing, regularity };
  }

  // חישוב Swing
  calculateSwing(intervals) {
    if (intervals.length < 2) return 0;
    
    let swingSum = 0;
    for (let i = 0; i < intervals.length - 1; i += 2) {
      if (i + 1 < intervals.length) {
        const ratio = intervals[i + 1] / intervals[i];
        swingSum += Math.abs(ratio - 1);
      }
    }
    
    return Math.min(1, swingSum / Math.floor(intervals.length / 2));
  }

  // פונקציות עזר
  findTempoCandidates(autocorrResults) {
    const candidates = [];
    const minLag = Math.floor(this.sampleRate / this.maxTempo);
    const maxLag = Math.floor(this.sampleRate / this.minTempo);
    
    autocorrResults.forEach(autocorr => {
      for (let lag = minLag; lag < maxLag; lag++) {
        if (this.isPeak(autocorr, lag)) {
          const tempo = 60 / (lag / this.sampleRate);
          candidates.push(tempo);
        }
      }
    });
    
    return this.clusterTempoCandidates(candidates);
  }

  clusterTempoCandidates(candidates) {
    const clusters = [];
    const tolerance = 2; // BPM
    
    candidates.forEach(tempo => {
      let found = false;
      for (let cluster of clusters) {
        if (Math.abs(cluster.tempo - tempo) < tolerance) {
          cluster.count++;
          cluster.tempo = (cluster.tempo + tempo) / 2;
          found = true;
          break;
        }
      }
      if (!found) {
        clusters.push({ tempo, count: 1 });
      }
    });
    
    return clusters.sort((a, b) => b.count - a.count);
  }

  isPeak(data, index) {
    if (index <= 0 || index >= data.length - 1) return false;
    return data[index] > data[index - 1] && data[index] > data[index + 1];
  }

  calculateConfidence(results) {
    // חישוב ביטחון על בסיס עקביות התוצאות
    const confidences = results.map(result => result.confidence || 0);
    return confidences.reduce((a, b) => a + b, 0) / confidences.length;
  }

  extractRhythmPatterns(autocorrResults) {
    // חילוץ דפוסים ריתמיים
    const patterns = [];
    autocorrResults.forEach(autocorr => {
      const peaks = [];
      for (let i = 0; i < autocorr.length; i++) {
        if (this.isPeak(autocorr, i)) {
          peaks.push(i);
        }
      }
      patterns.push(peaks);
    });
    return patterns;
  }

  estimateTempoFromOnsets(onsets) {
    if (onsets.length < 2) return 120;
    
    const intervals = [];
    for (let i = 1; i < onsets.length; i++) {
      intervals.push(onsets[i] - onsets[i - 1]);
    }
    
    const meanInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    return 60 / meanInterval;
  }

  calculateOnsetThreshold(strengths) {
    if (strengths.length === 0) return 0;
    const mean = strengths.reduce((a, b) => a + b, 0) / strengths.length;
    const std = Math.sqrt(strengths.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / strengths.length);
    return mean + std * 1.5;
  }

  calculateOnsetConfidence(onsets, strengths) {
    if (onsets.length === 0) return 0;
    const meanStrength = strengths.reduce((a, b) => a + b, 0) / strengths.length;
    const regularity = this.calculateRegularity(onsets);
    return (meanStrength + regularity) / 2;
  }

  estimateTempoFromPeaks(peaks) {
    if (peaks.length < 2) return 120;
    
    const intervals = [];
    for (let i = 1; i < peaks.length; i++) {
      intervals.push(peaks[i] - peaks[i - 1]);
    }
    
    const meanInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    return 60 / meanInterval;
  }

  calculateFluxConfidence(fluxValues) {
    if (fluxValues.length === 0) return 0;
    const mean = fluxValues.reduce((a, b) => a + b, 0) / fluxValues.length;
    const variance = fluxValues.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / fluxValues.length;
    return Math.max(0, 1 - Math.sqrt(variance) / mean);
  }

  estimateTempoFromBeats(beats) {
    if (beats.length < 2) return 120;
    
    const intervals = [];
    for (let i = 1; i < beats.length; i++) {
      intervals.push(beats[i] - beats[i - 1]);
    }
    
    const meanInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    return 60 / meanInterval;
  }

  calculateBeatThreshold(probabilities) {
    if (probabilities.length === 0) return 0;
    const mean = probabilities.reduce((a, b) => a + b, 0) / probabilities.length;
    const std = Math.sqrt(probabilities.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / probabilities.length);
    return mean + std;
  }

  calculateBeatConfidence(beats, probabilities) {
    if (beats.length === 0) return 0;
    const meanProbability = probabilities.reduce((a, b) => a + b, 0) / probabilities.length;
    const regularity = this.calculateRegularity(beats);
    return (meanProbability + regularity) / 2;
  }

  calculateRegularity(times) {
    if (times.length < 2) return 0;
    
    const intervals = [];
    for (let i = 1; i < times.length; i++) {
      intervals.push(times[i] - times[i - 1]);
    }
    
    const meanInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    const variance = intervals.reduce((sum, interval) => sum + Math.pow(interval - meanInterval, 2), 0) / intervals.length;
    
    return Math.max(0, 1 - Math.sqrt(variance) / meanInterval);
  }

  calculateAverageConfidence(confidences) {
    if (confidences.length === 0) return 0;
    return confidences.reduce((a, b) => a + b, 0) / confidences.length;
  }

  mergeBeatMaps(beatMaps) {
    // מיזוג ביטים מכל השיטות
    const allBeats = [...new Set(beatMaps)].sort((a, b) => a - b);
    return allBeats;
  }

  // פונקציות עזר לחישוב מאפיינים
  calculateEnergy(data) {
    return data.reduce((sum, val) => sum + val * val, 0) / data.length;
  }

  calculateSpectralCentroid(data) {
    const spectrum = this.calculateSpectrum(data);
    let weightedSum = 0;
    let sum = 0;
    
    for (let i = 0; i < spectrum.length; i++) {
      const frequency = i * this.sampleRate / (2 * spectrum.length);
      weightedSum += frequency * spectrum[i];
      sum += spectrum[i];
    }
    
    return sum > 0 ? weightedSum / sum : 0;
  }

  calculateSpectralRolloff(data) {
    const spectrum = this.calculateSpectrum(data);
    const threshold = 0.85;
    let cumulative = 0;
    const total = spectrum.reduce((sum, val) => sum + val, 0);
    
    for (let i = 0; i < spectrum.length; i++) {
      cumulative += spectrum[i];
      if (cumulative / total >= threshold) {
        return i / spectrum.length;
      }
    }
    
    return 1;
  }

  calculateZeroCrossingRate(data) {
    let crossings = 0;
    for (let i = 1; i < data.length; i++) {
      if ((data[i] >= 0 && data[i - 1] < 0) || (data[i] < 0 && data[i - 1] >= 0)) {
        crossings++;
      }
    }
    return crossings / data.length;
  }

  calculateMFCC(data) {
    // חישוב MFCC פשוט
    const spectrum = this.calculateSpectrum(data);
    const melSpectrum = this.applyMelFilterbank(spectrum);
    const mfcc = this.applyDCT(melSpectrum);
    return mfcc.slice(0, 13); // 13 מקדמים ראשונים
  }

  applyMelFilterbank(spectrum) {
    // יישום פשוט של Mel Filterbank
    const numFilters = 26;
    const melSpectrum = new Array(numFilters).fill(0);
    
    for (let i = 0; i < numFilters; i++) {
      for (let j = 0; j < spectrum.length; j++) {
        const melFilter = this.createMelFilter(j, i, spectrum.length);
        melSpectrum[i] += spectrum[j] * melFilter;
      }
    }
    
    return melSpectrum;
  }

  createMelFilter(bin, filterIndex, numBins) {
    // יצירת Mel Filter פשוט
    const centerFreq = this.melToFreq(filterIndex * 2595 / 26);
    const binFreq = bin * this.sampleRate / (2 * numBins);
    const distance = Math.abs(binFreq - centerFreq);
    return Math.max(0, 1 - distance / (centerFreq * 0.5));
  }

  melToFreq(mel) {
    return 700 * (Math.pow(10, mel / 2595) - 1);
  }

  applyDCT(data) {
    // יישום פשוט של DCT
    const N = data.length;
    const dct = new Array(N).fill(0);
    
    for (let k = 0; k < N; k++) {
      for (let n = 0; n < N; n++) {
        dct[k] += data[n] * Math.cos(Math.PI * k * (2 * n + 1) / (2 * N));
      }
    }
    
    return dct;
  }
}

// מחלקת FFT פשוטה
class FFT {
  constructor(size) {
    this.size = size;
  }

  forward(data) {
    // יישום פשוט של FFT
    const real = new Float32Array(this.size);
    const imag = new Float32Array(this.size);
    
    for (let i = 0; i < this.size; i++) {
      real[i] = data[i] || 0;
      imag[i] = 0;
    }
    
    this.fft(real, imag);
    
    const magnitude = new Float32Array(this.size / 2);
    for (let i = 0; i < this.size / 2; i++) {
      magnitude[i] = Math.sqrt(real[i] * real[i] + imag[i] * imag[i]);
    }
    
    return magnitude;
  }

  fft(real, imag) {
    // יישום FFT בסיסי
    const N = real.length;
    
    if (N <= 1) return;
    
    const evenReal = new Float32Array(N / 2);
    const evenImag = new Float32Array(N / 2);
    const oddReal = new Float32Array(N / 2);
    const oddImag = new Float32Array(N / 2);
    
    for (let i = 0; i < N / 2; i++) {
      evenReal[i] = real[2 * i];
      evenImag[i] = imag[2 * i];
      oddReal[i] = real[2 * i + 1];
      oddImag[i] = imag[2 * i + 1];
    }
    
    this.fft(evenReal, evenImag);
    this.fft(oddReal, oddImag);
    
    for (let k = 0; k < N / 2; k++) {
      const angle = -2 * Math.PI * k / N;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      
      const tempReal = cos * oddReal[k] - sin * oddImag[k];
      const tempImag = sin * oddReal[k] + cos * oddImag[k];
      
      real[k] = evenReal[k] + tempReal;
      imag[k] = evenImag[k] + tempImag;
      real[k + N / 2] = evenReal[k] - tempReal;
      imag[k + N / 2] = evenImag[k] - tempImag;
    }
  }
} 