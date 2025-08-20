/**
 * מערכת אופטימיזציה חכמה
 * Smart Optimization System
 */

export class SmartOptimizer {
  constructor() {
    this.optimizations = new Map();
    this.performanceMetrics = new Map();
    this.optimizationHistory = [];
    this.isEnabled = true;
  }

  /**
   * הפעלת אופטימיזציה חכמה
   */
  async optimizeCode(code, context = {}) {
    if (!this.isEnabled) return code;

    console.log('🚀 מתחיל אופטימיזציה חכמה...');
    
    const originalCode = code;
    const optimizations = [];
    
    try {
      // אופטימיזציה של לולאות
      if (this.shouldOptimizeLoops(code)) {
        code = this.optimizeLoops(code);
        optimizations.push('LOOP_OPTIMIZATION');
      }
      
      // אופטימיזציה של זיכרון
      if (this.shouldOptimizeMemory(code)) {
        code = this.optimizeMemory(code);
        optimizations.push('MEMORY_OPTIMIZATION');
      }
      
      // אופטימיזציה של DOM
      if (this.shouldOptimizeDOM(code)) {
        code = this.optimizeDOM(code);
        optimizations.push('DOM_OPTIMIZATION');
      }
      
      // אופטימיזציה של אלגוריתמים
      if (this.shouldOptimizeAlgorithms(code)) {
        code = this.optimizeAlgorithms(code);
        optimizations.push('ALGORITHM_OPTIMIZATION');
      }
      
      // אופטימיזציה של אסינכרוניות
      if (this.shouldOptimizeAsync(code)) {
        code = this.optimizeAsync(code);
        optimizations.push('ASYNC_OPTIMIZATION');
      }
      
      // שמירת היסטוריית אופטימיזציה
      this.saveOptimizationHistory(originalCode, code, optimizations, context);
      
      console.log('✅ אופטימיזציה חכמה הושלמה בהצלחה');
      return code;
      
    } catch (error) {
      console.error('❌ שגיאה באופטימיזציה:', error);
      return originalCode; // החזרת הקוד המקורי במקרה של שגיאה
    }
  }

  /**
   * בדיקה אם צריך לאופטמז לולאות
   */
  shouldOptimizeLoops(code) {
    return code.includes('for (') || code.includes('while (') || code.includes('forEach(');
  }

  /**
   * אופטימיזציה של לולאות
   */
  optimizeLoops(code) {
    let optimizedCode = code;
    
    // אופטימיזציה של לולאות for
    optimizedCode = this.optimizeForLoops(optimizedCode);
    
    // אופטימיזציה של לולאות while
    optimizedCode = this.optimizeWhileLoops(optimizedCode);
    
    // אופטימיזציה של forEach
    optimizedCode = this.optimizeForEach(optimizedCode);
    
    return optimizedCode;
  }

  /**
   * אופטימיזציה של לולאות for
   */
  optimizeForLoops(code) {
    // אופטימיזציה: שמירת אורך מערך
    code = code.replace(
      /for\s*\(\s*let\s+i\s*=\s*0\s*;\s*i\s*<\s*(\w+)\.length\s*;\s*i\+\+\)/g,
      'for (let i = 0, len = $1.length; i < len; i++)'
    );
    
    // אופטימיזציה: שימוש ב-cached length
    code = code.replace(
      /for\s*\(\s*let\s+i\s*=\s*0\s*;\s*i\s*<\s*(\w+)\.length\s*;\s*i\+\+\)/g,
      'const len = $1.length;\nfor (let i = 0; i < len; i++)'
    );
    
    return code;
  }

  /**
   * אופטימיזציה של לולאות while
   */
  optimizeWhileLoops(code) {
    // אופטימיזציה: הימנעות מלולאות אינסופיות
    code = code.replace(
      /while\s*\(\s*true\s*\)/g,
      'let maxIterations = 1000;\nlet iterationCount = 0;\nwhile (iterationCount < maxIterations)'
    );
    
    return code;
  }

  /**
   * אופטימיזציה של forEach
   */
  optimizeForEach(code) {
    // אופטימיזציה: החלפת forEach בלולאת for מהירה יותר
    code = code.replace(
      /(\w+)\.forEach\s*\(\s*\([^)]*\)\s*=>\s*\{([^}]*)\}\s*\)/g,
      'for (let i = 0, len = $1.length; i < len; i++) {\n  const item = $1[i];\n  $2\n}'
    );
    
    return code;
  }

  /**
   * בדיקה אם צריך לאופטמז זיכרון
   */
  shouldOptimizeMemory(code) {
    return code.includes('new Array(') || code.includes('new Object(') || code.includes('+= ');
  }

  /**
   * אופטימיזציה של זיכרון
   */
  optimizeMemory(code) {
    let optimizedCode = code;
    
    // אופטימיזציה: שימוש ב-array literals
    optimizedCode = optimizedCode.replace(/new Array\(\)/g, '[]');
    optimizedCode = optimizedCode.replace(/new Object\(\)/g, '{}');
    
    // אופטימיזציה: שרשור מחרוזות יעיל
    optimizedCode = this.optimizeStringConcatenation(optimizedCode);
    
    // אופטימיזציה: שימוש ב-weak references
    optimizedCode = this.optimizeWeakReferences(optimizedCode);
    
    return optimizedCode;
  }

  /**
   * אופטימיזציה של שרשור מחרוזות
   */
  optimizeStringConcatenation(code) {
    // זיהוי שרשור מחרוזות לא יעיל
    const stringConcatPattern = /(\w+)\s*\+=\s*["'][^"']*["']/g;
    let match;
    let optimizedCode = code;
    
    while ((match = stringConcatPattern.exec(code)) !== null) {
      const variable = match[1];
      const optimized = `// אופטימיזציה: שימוש ב-array.join במקום +=
const ${variable}Parts = [${variable}];
// הוסף מחרוזות ל-array במקום +=
// ${variable}Parts.push("text");
${variable} = ${variable}Parts.join('');`;
      
      optimizedCode = optimizedCode.replace(match[0], optimized);
    }
    
    return optimizedCode;
  }

  /**
   * אופטימיזציה של weak references
   */
  optimizeWeakReferences(code) {
    // החלפת Map ב-WeakMap כאשר מתאים
    if (code.includes('new Map()') && code.includes('set(') && code.includes('delete(')) {
      code = code.replace(/new Map\(\)/g, 'new WeakMap()');
      code = code.replace(/Map/g, 'WeakMap');
    }
    
    // החלפת Set ב-WeakSet כאשר מתאים
    if (code.includes('new Set()') && code.includes('add(') && code.includes('delete(')) {
      code = code.replace(/new Set\(\)/g, 'new WeakSet()');
      code = code.replace(/Set/g, 'WeakSet');
    }
    
    return code;
  }

  /**
   * בדיקה אם צריך לאופטמז DOM
   */
  shouldOptimizeDOM(code) {
    return code.includes('document.') || code.includes('getElementById') || code.includes('querySelector');
  }

  /**
   * אופטימיזציה של DOM
   */
  optimizeDOM(code) {
    let optimizedCode = code;
    
    // אופטימיזציה: caching של DOM elements
    optimizedCode = this.optimizeDOMCaching(optimizedCode);
    
    // אופטימיזציה: batch DOM updates
    optimizedCode = this.optimizeBatchUpdates(optimizedCode);
    
    // אופטימיזציה: שימוש ב-fragment
    optimizedCode = this.optimizeDocumentFragment(optimizedCode);
    
    return optimizedCode;
  }

  /**
   * אופטימיזציה של caching DOM
   */
  optimizeDOMCaching(code) {
    // זיהוי קריאות חוזרות ל-DOM
    const domCalls = code.match(/document\.(getElementById|querySelector|querySelectorAll)\([^)]+\)/g) || [];
    const uniqueSelectors = [...new Set(domCalls)];
    
    if (uniqueSelectors.length > 0) {
      const cacheCode = `// אופטימיזציה: caching של DOM elements
const domCache = {
${uniqueSelectors.map(selector => `  ${selector.replace(/[^a-zA-Z0-9]/g, '_')}: ${selector},`).join('\n')}
};`;
      
      code = cacheCode + '\n' + code;
      
      // החלפת קריאות ב-cache
      uniqueSelectors.forEach(selector => {
        const cacheKey = selector.replace(/[^a-zA-Z0-9]/g, '_');
        code = code.replace(new RegExp(selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), `domCache.${cacheKey}`);
      });
    }
    
    return code;
  }

  /**
   * אופטימיזציה של batch updates
   */
  optimizeBatchUpdates(code) {
    // זיהוי עדכונים מרובים של DOM
    if (code.includes('style.') && code.includes('textContent')) {
      const batchCode = `// אופטימיזציה: batch DOM updates
const batchUpdate = (element, updates) => {
  const originalDisplay = element.style.display;
  element.style.display = 'none';
  
  Object.entries(updates).forEach(([property, value]) => {
    if (property === 'textContent') {
      element.textContent = value;
    } else if (property.startsWith('style.')) {
      const styleProp = property.replace('style.', '');
      element.style[styleProp] = value;
    }
  });
  
  element.style.display = originalDisplay;
};`;
      
      code = batchCode + '\n' + code;
    }
    
    return code;
  }

  /**
   * אופטימיזציה של DocumentFragment
   */
  optimizeDocumentFragment(code) {
    // זיהוי יצירת אלמנטים מרובים
    if (code.includes('createElement') && code.includes('appendChild')) {
      const fragmentCode = `// אופטימיזציה: שימוש ב-DocumentFragment
const createElementsBatch = (elementsData) => {
  const fragment = document.createDocumentFragment();
  
  elementsData.forEach(data => {
    const element = document.createElement(data.tag);
    Object.assign(element, data.attributes);
    if (data.textContent) element.textContent = data.textContent;
    fragment.appendChild(element);
  });
  
  return fragment;
};`;
      
      code = fragmentCode + '\n' + code;
    }
    
    return code;
  }

  /**
   * בדיקה אם צריך לאופטמז אלגוריתמים
   */
  shouldOptimizeAlgorithms(code) {
    return code.includes('sort(') || code.includes('filter(') || code.includes('map(');
  }

  /**
   * אופטימיזציה של אלגוריתמים
   */
  optimizeAlgorithms(code) {
    let optimizedCode = code;
    
    // אופטימיזציה: שימוש ב-indexOf במקום includes
    optimizedCode = optimizedCode.replace(/\.includes\(/g, '.indexOf(');
    
    // אופטימיזציה: שימוש ב-Set במקום array.includes
    optimizedCode = this.optimizeArrayIncludes(optimizedCode);
    
    // אופטימיזציה: שימוש ב-Map במקום object lookup
    optimizedCode = this.optimizeObjectLookup(optimizedCode);
    
    return optimizedCode;
  }

  /**
   * אופטימיזציה של array.includes
   */
  optimizeArrayIncludes(code) {
    // זיהוי שימוש ב-array.includes בלולאה
    const includesPattern = /for\s*\([^)]*\)\s*\{\s*if\s*\(\s*(\w+)\.includes\([^)]+\)/g;
    
    if (includesPattern.test(code)) {
      const setCode = `// אופטימיזציה: שימוש ב-Set במקום array.includes
const ${code.match(/(\w+)\.includes/)[1]}Set = new Set(${code.match(/(\w+)\.includes/)[1]});`;
      
      code = setCode + '\n' + code;
      code = code.replace(/\.includes\(/g, 'Set.has(');
    }
    
    return code;
  }

  /**
   * אופטימיזציה של object lookup
   */
  optimizeObjectLookup(code) {
    // זיהוי שימוש ב-object lookup בלולאה
    const lookupPattern = /for\s*\([^)]*\)\s*\{\s*if\s*\(\s*(\w+)\s*\[\s*[^]]+\s*\]/g;
    
    if (lookupPattern.test(code)) {
      const mapCode = `// אופטימיזציה: שימוש ב-Map במקום object lookup
const ${code.match(/(\w+)\s*\[/)[1]}Map = new Map(Object.entries(${code.match(/(\w+)\s*\[/)[1]}));`;
      
      code = mapCode + '\n' + code;
      code = code.replace(/(\w+)\s*\[/g, '$1Map.get(');
    }
    
    return code;
  }

  /**
   * בדיקה אם צריך לאופטמז אסינכרוניות
   */
  shouldOptimizeAsync(code) {
    return code.includes('async') || code.includes('await') || code.includes('Promise');
  }

  /**
   * אופטימיזציה של אסינכרוניות
   */
  optimizeAsync(code) {
    let optimizedCode = code;
    
    // אופטימיזציה: שימוש ב-Promise.all
    optimizedCode = this.optimizePromiseAll(optimizedCode);
    
    // אופטימיזציה: שימוש ב-race conditions
    optimizedCode = this.optimizePromiseRace(optimizedCode);
    
    // אופטימיזציה: שימוש ב-caching promises
    optimizedCode = this.optimizePromiseCaching(optimizedCode);
    
    return optimizedCode;
  }

  /**
   * אופטימיזציה של Promise.all
   */
  optimizePromiseAll(code) {
    // זיהוי promises מרובים שניתן להריץ במקביל
    const awaitPattern = /await\s+(\w+)\([^)]*\)\s*;\s*await\s+(\w+)\([^)]*\)/g;
    
    if (awaitPattern.test(code)) {
      const parallelCode = `// אופטימיזציה: הרצה במקביל עם Promise.all
const [result1, result2] = await Promise.all([
  ${code.match(/await\s+(\w+)\([^)]*\)/g).map(await => await.replace('await ', '')).join(',\n  ')}
]);`;
      
      code = code.replace(awaitPattern, parallelCode);
    }
    
    return code;
  }

  /**
   * אופטימיזציה של Promise.race
   */
  optimizePromiseRace(code) {
    // זיהוי promises שניתן להריץ ב-race
    const racePattern = /const\s+(\w+)\s*=\s*await\s+(\w+)\([^)]*\)\s*;\s*if\s*\(\s*\1\s*\)/g;
    
    if (racePattern.test(code)) {
      const raceCode = `// אופטימיזציה: שימוש ב-Promise.race
const result = await Promise.race([
  ${code.match(/await\s+(\w+)\([^)]*\)/g).map(await => await.replace('await ', '')).join(',\n  ')}
]);`;
      
      code = code.replace(racePattern, raceCode);
    }
    
    return code;
  }

  /**
   * אופטימיזציה של caching promises
   */
  optimizePromiseCaching(code) {
    // זיהוי promises שחוזרים על עצמם
    const cachePattern = /const\s+(\w+)\s*=\s*await\s+(\w+)\([^)]*\)/g;
    const promises = code.match(cachePattern) || [];
    const uniquePromises = [...new Set(promises)];
    
    if (uniquePromises.length > 1) {
      const cacheCode = `// אופטימיזציה: caching של promises
const promiseCache = new Map();
const getCachedPromise = async (key, promiseFn) => {
  if (!promiseCache.has(key)) {
    promiseCache.set(key, promiseFn());
  }
  return promiseCache.get(key);
};`;
      
      code = cacheCode + '\n' + code;
    }
    
    return code;
  }

  /**
   * שמירת היסטוריית אופטימיזציה
   */
  saveOptimizationHistory(originalCode, optimizedCode, optimizations, context) {
    const historyEntry = {
      timestamp: new Date().toISOString(),
      originalSize: originalCode.length,
      optimizedSize: optimizedCode.length,
      sizeReduction: originalCode.length - optimizedCode.length,
      sizeReductionPercent: Math.round(((originalCode.length - optimizedCode.length) / originalCode.length) * 100),
      optimizations,
      context,
      performanceGain: this.calculatePerformanceGain(originalCode, optimizedCode)
    };
    
    this.optimizationHistory.push(historyEntry);
    
    // שמירה ב-localStorage
    try {
      localStorage.setItem('smartOptimizerHistory', JSON.stringify(this.optimizationHistory));
    } catch (error) {
      console.warn('לא ניתן לשמור היסטוריית אופטימיזציה:', error);
    }
  }

  /**
   * חישוב שיפור ביצועים
   */
  calculatePerformanceGain(originalCode, optimizedCode) {
    let gain = 0;
    
    // חישוב שיפור לפי סוגי אופטימיזציה
    if (originalCode.includes('for (') && optimizedCode.includes('len =')) {
      gain += 15; // שיפור לולאות
    }
    
    if (originalCode.includes('new Array(') && optimizedCode.includes('[]')) {
      gain += 10; // שיפור יצירת מערכים
    }
    
    if (originalCode.includes('document.') && optimizedCode.includes('domCache')) {
      gain += 25; // שיפור DOM
    }
    
    if (originalCode.includes('await') && optimizedCode.includes('Promise.all')) {
      gain += 30; // שיפור אסינכרוניות
    }
    
    return Math.min(gain, 100); // מקסימום 100%
  }

  /**
   * קבלת סטטיסטיקות אופטימיזציה
   */
  getOptimizationStats() {
    if (this.optimizationHistory.length === 0) {
      return {
        totalOptimizations: 0,
        averageSizeReduction: 0,
        averagePerformanceGain: 0,
        totalCodeSizeSaved: 0
      };
    }
    
    const totalSizeReduction = this.optimizationHistory.reduce((sum, entry) => {
      return sum + entry.sizeReduction;
    }, 0);
    
    const totalPerformanceGain = this.optimizationHistory.reduce((sum, entry) => {
      return sum + entry.performanceGain;
    }, 0);
    
    return {
      totalOptimizations: this.optimizationHistory.length,
      averageSizeReduction: Math.round(totalSizeReduction / this.optimizationHistory.length),
      averagePerformanceGain: Math.round(totalPerformanceGain / this.optimizationHistory.length),
      totalCodeSizeSaved: totalSizeReduction
    };
  }

  /**
   * ניקוי היסטוריית אופטימיזציה
   */
  clearHistory() {
    this.optimizationHistory = [];
    try {
      localStorage.removeItem('smartOptimizerHistory');
    } catch (error) {
      console.warn('לא ניתן לנקות היסטוריית אופטימיזציה:', error);
    }
    console.log('🧹 היסטוריית אופטימיזציה נוקתה');
  }

  /**
   * טעינת היסטוריית אופטימיזציה מ-localStorage
   */
  loadHistory() {
    try {
      const savedHistory = localStorage.getItem('smartOptimizerHistory');
      if (savedHistory) {
        this.optimizationHistory = JSON.parse(savedHistory);
        console.log('📚 היסטוריית אופטימיזציה נטענה:', this.optimizationHistory.length, 'רשומות');
      }
    } catch (error) {
      console.warn('לא ניתן לטעון היסטוריית אופטימיזציה:', error);
    }
  }

  /**
   * הפעלה/כיבוי מערכת האופטימיזציה
   */
  toggleOptimization() {
    this.isEnabled = !this.isEnabled;
    console.log(`🔄 מערכת אופטימיזציה ${this.isEnabled ? 'הופעלה' : 'כובתה'}`);
    return this.isEnabled;
  }

  /**
   * קבלת המלצות אופטימיזציה
   */
  getOptimizationRecommendations() {
    const recommendations = [];
    
    if (this.optimizationHistory.length > 0) {
      const stats = this.getOptimizationStats();
      
      if (stats.averageSizeReduction < 10) {
        recommendations.push({
          type: 'SIZE',
          priority: 'MEDIUM',
          message: 'שיפור קטן בגודל הקוד. שקול אופטימיזציות נוספות',
          suggestion: 'בדוק הזדמנויות לאופטימיזציה נוספת'
        });
      }
      
      if (stats.averagePerformanceGain < 20) {
        recommendations.push({
          type: 'PERFORMANCE',
          priority: 'HIGH',
          message: 'שיפור נמוך בביצועים. נדרשות אופטימיזציות מתקדמות',
          suggestion: 'השתמש באופטימיזציות מתקדמות יותר'
        });
      }
    }
    
    return recommendations;
  }
}

// יצירת מופע גלובלי
export const smartOptimizer = new SmartOptimizer();

// טעינת היסטוריה בטעינה
smartOptimizer.loadHistory();

// פונקציות עזר מהירות
export const quickOptimize = (code) => {
  return smartOptimizer.optimizeCode(code);
};

export const getOptimizationStats = () => {
  return smartOptimizer.getOptimizationStats();
};
