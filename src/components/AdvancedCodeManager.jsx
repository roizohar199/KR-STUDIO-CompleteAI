import React, { useState, useEffect } from 'react';
import { codeAnalyzer } from '../lib/codeAnalyzer';
import { smartOptimizer } from '../lib/smartOptimizer';
import { autoTester } from '../lib/autoTester';
import { performanceMonitor } from '../lib/performanceMonitor';

const AdvancedCodeManager = () => {
  const [currentFile, setCurrentFile] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [optimization, setOptimization] = useState(null);
  const [tests, setTests] = useState(null);
  const [performance, setPerformance] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isGeneratingTests, setIsGeneratingTests] = useState(false);

  useEffect(() => {
    // התחלת ניטור ביצועים
    performanceMonitor.startMonitoring();
    
    return () => {
      performanceMonitor.stopMonitoring();
    };
  }, []);

  /**
   * ניתוח קוד מתקדם
   */
  const handleCodeAnalysis = async () => {
    if (!fileContent.trim()) {
      alert('אנא הכנס קוד לניתוח');
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await codeAnalyzer.analyzeCode(fileContent, currentFile || 'unknown-file');
      setAnalysis(result);
      console.log('✅ ניתוח קוד הושלם:', result);
    } catch (error) {
      console.error('❌ שגיאה בניתוח קוד:', error);
      alert('שגיאה בניתוח הקוד');
    } finally {
      setIsAnalyzing(false);
    }
  };

  /**
   * אופטימיזציה חכמה
   */
  const handleCodeOptimization = async () => {
    if (!fileContent.trim()) {
      alert('אנא הכנס קוד לאופטימיזציה');
      return;
    }

    setIsOptimizing(true);
    try {
      const result = await smartOptimizer.optimizeCode(fileContent, { file: currentFile });
      setOptimization(result);
      console.log('✅ אופטימיזציה הושלמה:', result);
    } catch (error) {
      console.error('❌ שגיאה באופטימיזציה:', error);
      alert('שגיאה באופטימיזציה');
    } finally {
      setIsOptimizing(false);
    }
  };

  /**
   * יצירת בדיקות אוטומטיות
   */
  const handleTestGeneration = async () => {
    if (!fileContent.trim()) {
      alert('אנא הכנס קוד ליצירת בדיקות');
      return;
    }

    setIsGeneratingTests(true);
    try {
      const result = await autoTester.generateTests(fileContent, currentFile || 'unknown-file');
      setTests(result);
      console.log('✅ בדיקות נוצרו:', result);
    } catch (error) {
      console.error('❌ שגיאה ביצירת בדיקות:', error);
      alert('שגיאה ביצירת בדיקות');
    } finally {
      setIsGeneratingTests(false);
    }
  };

  /**
   * קבלת סטטיסטיקות ביצועים
   */
  const handlePerformanceCheck = () => {
    const stats = performanceMonitor.getPerformanceStats();
    setPerformance(stats);
    console.log('📊 סטטיסטיקות ביצועים:', stats);
  };

  /**
   * ניקוי כל הנתונים
   */
  const handleClearAll = () => {
    setAnalysis(null);
    setOptimization(null);
    setTests(null);
    setPerformance(null);
    setFileContent('');
    setCurrentFile('');
    
    // ניקוי היסטוריות
    codeAnalyzer.clearHistory();
    smartOptimizer.clearHistory();
    
    console.log('🧹 כל הנתונים נוקו');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          🚀 מנהל קוד מתקדם - Advanced Code Manager
        </h1>

        {/* אזור קלט */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-8 border border-white/20">
          <h2 className="text-2xl font-semibold mb-4">📝 הזנת קוד</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="שם קובץ (אופציונלי)"
              value={currentFile}
              onChange={(e) => setCurrentFile(e.target.value)}
              className="px-4 py-2 bg-white/20 rounded-lg border border-white/30 text-white placeholder-white/60"
            />
            
            <div className="flex gap-2">
              <button
                onClick={handleCodeAnalysis}
                disabled={isAnalyzing || !fileContent.trim()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-lg transition-colors"
              >
                {isAnalyzing ? '🔍 מנתח...' : '🔍 ניתוח קוד'}
              </button>
              
              <button
                onClick={handleCodeOptimization}
                disabled={isOptimizing || !fileContent.trim()}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded-lg transition-colors"
              >
                {isOptimizing ? '🚀 מאפשר...' : '🚀 אופטימיזציה'}
              </button>
              
              <button
                onClick={handleTestGeneration}
                disabled={isGeneratingTests || !fileContent.trim()}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 rounded-lg transition-colors"
              >
                {isGeneratingTests ? '🧪 יוצר...' : '🧪 יצירת בדיקות'}
              </button>
            </div>
          </div>
          
          <textarea
            value={fileContent}
            onChange={(e) => setFileContent(e.target.value)}
            placeholder="הכנס את הקוד שלך כאן..."
            rows={10}
            className="w-full px-4 py-3 bg-white/20 rounded-lg border border-white/30 text-white placeholder-white/60 font-mono text-sm"
          />
        </div>

        {/* כפתורי פעולה מהירים */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <button
            onClick={handlePerformanceCheck}
            className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 rounded-lg transition-colors"
          >
            📊 בדיקת ביצועים
          </button>
          
          <button
            onClick={() => codeAnalyzer.clearHistory()}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            🧹 ניקוי ניתוח
          </button>
          
          <button
            onClick={() => smartOptimizer.clearHistory()}
            className="px-6 py-3 bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors"
          >
            🧹 ניקוי אופטימיזציה
          </button>
          
          <button
            onClick={handleClearAll}
            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
          >
            🗑️ ניקוי הכל
          </button>
        </div>

        {/* תוצאות ניתוח קוד */}
        {analysis && (
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-8 border border-white/20">
            <h2 className="text-2xl font-semibold mb-4">🔍 תוצאות ניתוח קוד</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white/20 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-blue-400">{analysis.overallScore}</div>
                <div className="text-sm text-white/80">ציון כללי</div>
              </div>
              
              <div className="bg-white/20 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-green-400">{analysis.complexity.cyclomaticComplexity}</div>
                <div className="text-sm text-white/80">מורכבות ציקלומטית</div>
              </div>
              
              <div className="bg-white/20 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-yellow-400">{analysis.issues.length}</div>
                <div className="text-sm text-white/80">בעיות שזוהו</div>
              </div>
              
              <div className="bg-white/20 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-purple-400">{analysis.recommendations.length}</div>
                <div className="text-sm text-white/80">המלצות</div>
              </div>
            </div>

            {/* המלצות */}
            {analysis.recommendations.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">💡 המלצות שיפור</h3>
                <div className="space-y-2">
                  {analysis.recommendations.map((rec, index) => (
                    <div key={index} className={`p-3 rounded-lg ${
                      rec.priority === 'CRITICAL' ? 'bg-red-500/20 border border-red-500/50' :
                      rec.priority === 'HIGH' ? 'bg-orange-500/20 border border-orange-500/50' :
                      rec.priority === 'MEDIUM' ? 'bg-yellow-500/20 border border-yellow-500/50' :
                      'bg-blue-500/20 border border-blue-500/50'
                    }`}>
                      <div className="font-semibold">{rec.message}</div>
                      <div className="text-sm text-white/80">{rec.suggestion}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* תוצאות אופטימיזציה */}
        {optimization && (
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-8 border border-white/20">
            <h2 className="text-2xl font-semibold mb-4">🚀 תוצאות אופטימיזציה</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">📊 סטטיסטיקות אופטימיזציה</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>אופטימיזציות שבוצעו:</span>
                    <span className="font-semibold">{optimization.optimizations?.length || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>שיפור ביצועים:</span>
                    <span className="font-semibold text-green-400">
                      {optimization.performanceGain || 0}%
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">📝 קוד מותאם</h3>
                <pre className="bg-black/30 p-4 rounded-lg text-sm overflow-x-auto">
                  {optimization.substring(0, 500)}...
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* בדיקות שנוצרו */}
        {tests && (
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-8 border border-white/20">
            <h2 className="text-2xl font-semibold mb-4">🧪 בדיקות שנוצרו</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(tests).map(([testType, testContent]) => (
                <div key={testType} className="bg-white/20 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-3 capitalize">
                    {testType.replace(/([A-Z])/g, ' $1').trim()}
                  </h3>
                  <pre className="bg-black/30 p-3 rounded-lg text-sm overflow-x-auto max-h-40">
                    {Array.isArray(testContent) ? testContent.join('\n\n') : testContent}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* סטטיסטיקות ביצועים */}
        {performance && (
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-8 border border-white/20">
            <h2 className="text-2xl font-semibold mb-4">📊 סטטיסטיקות ביצועים</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {performance.metrics.memory && (
                <div className="bg-white/20 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-3">💾 זיכרון</h3>
                  <div className="space-y-2 text-sm">
                    <div>שימוש: {(performance.metrics.memory.used / 1024 / 1024).toFixed(2)} MB</div>
                    <div>סה"כ: {(performance.metrics.memory.total / 1024 / 1024).toFixed(2)} MB</div>
                    <div>מגבלה: {(performance.metrics.memory.limit / 1024 / 1024).toFixed(2)} MB</div>
                  </div>
                </div>
              )}
              
              {performance.metrics.cpu && (
                <div className="bg-white/20 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-3">⚡ CPU</h3>
                  <div className="text-2xl font-bold text-blue-400">
                    {performance.metrics.cpu.load.toFixed(1)}ms
                  </div>
                  <div className="text-sm text-white/80">עומס CPU</div>
                </div>
              )}
              
              {performance.metrics.network && (
                <div className="bg-white/20 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-3">🌐 רשת</h3>
                  <div className="space-y-2 text-sm">
                    <div>סוג: {performance.metrics.network.effectiveType}</div>
                    <div>מהירות: {performance.metrics.network.downlink} Mbps</div>
                    <div>RTT: {performance.metrics.network.rtt}ms</div>
                  </div>
                </div>
              )}
            </div>

            {/* התראות */}
            {performance.alerts.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">🚨 התראות</h3>
                <div className="space-y-2">
                  {performance.alerts.map((alert, index) => (
                    <div key={index} className={`p-3 rounded-lg ${
                      alert.severity === 'CRITICAL' ? 'bg-red-500/20 border border-red-500/50' :
                      'bg-yellow-500/20 border border-yellow-500/50'
                    }`}>
                      <div className="font-semibold">{alert.type}</div>
                      <div className="text-sm">{alert.message}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* סטטיסטיקות כללית */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h2 className="text-2xl font-semibold mb-4">📈 סטטיסטיקות כללית</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">
                {codeAnalyzer.getAnalysisStats().totalAnalyses}
              </div>
              <div className="text-sm text-white/80">ניתוחים שבוצעו</div>
            </div>
            
            <div className="bg-white/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-400">
                {smartOptimizer.getOptimizationStats().totalOptimizations}
              </div>
              <div className="text-sm text-white/80">אופטימיזציות שבוצעו</div>
            </div>
            
            <div className="bg-white/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-400">
                {autoTester.getTestStats().totalFiles}
              </div>
              <div className="text-sm text-white/80">קבצים נבדקו</div>
            </div>
            
            <div className="bg-white/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {performance.isMonitoring ? 'פעיל' : 'לא פעיל'}
              </div>
              <div className="text-sm text-white/80">ניטור ביצועים</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedCodeManager;
