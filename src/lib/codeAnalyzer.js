/**
 * מערכת ניתוח קוד מתקדמת
 * Code Analysis System - Advanced
 */

export class AdvancedCodeAnalyzer {
  constructor() {
    this.issues = [];
    this.metrics = {};
    this.recommendations = [];
    this.analysisHistory = [];
  }

  /**
   * ניתוח קוד מתקדם
   */
  async analyzeCode(code, filePath) {
    console.log('🔍 מתחיל ניתוח קוד מתקדם...');
    
    const analysis = {
      filePath,
      timestamp: new Date().toISOString(),
      issues: [],
      metrics: {},
      recommendations: [],
      complexity: 0,
      maintainability: 0,
      performance: 0,
      security: 0
    };

    try {
      // ניתוח מורכבות
      analysis.complexity = this.analyzeComplexity(code);
      
      // ניתוח ביצועים
      analysis.performance = this.analyzePerformance(code);
      
      // ניתוח אבטחה
      analysis.security = this.analyzeSecurity(code);
      
      // ניתוח תחזוקתיות
      analysis.maintainability = this.analyzeMaintainability(code);
      
      // זיהוי בעיות
      analysis.issues = this.identifyIssues(code);
      
      // המלצות שיפור
      analysis.recommendations = this.generateRecommendations(analysis);
      
      // חישוב ציון כללי
      analysis.overallScore = this.calculateOverallScore(analysis);
      
      this.analysisHistory.push(analysis);
      
      console.log('✅ ניתוח קוד הושלם בהצלחה');
      return analysis;
      
    } catch (error) {
      console.error('❌ שגיאה בניתוח קוד:', error);
      throw error;
    }
  }

  /**
   * ניתוח מורכבות קוד
   */
  analyzeComplexity(code) {
    const metrics = {
      cyclomaticComplexity: 0,
      nestingDepth: 0,
      functionLength: 0,
      parameterCount: 0,
      returnStatements: 0
    };

    try {
      // חישוב מורכבות ציקלומטית
      metrics.cyclomaticComplexity = this.calculateCyclomaticComplexity(code);
      
      // חישוב עומק קינון
      metrics.nestingDepth = this.calculateNestingDepth(code);
      
      // חישוב אורך פונקציות
      metrics.functionLength = this.calculateFunctionLength(code);
      
      // חישוב מספר פרמטרים
      metrics.parameterCount = this.calculateParameterCount(code);
      
      // חישוב מספר return statements
      metrics.returnStatements = this.calculateReturnStatements(code);
      
    } catch (error) {
      console.warn('אזהרה בניתוח מורכבות:', error);
    }

    return metrics;
  }

  /**
   * ניתוח ביצועים
   */
  analyzePerformance(code) {
    const metrics = {
      memoryUsage: 0,
      timeComplexity: 0,
      inefficientPatterns: 0,
      optimizationOpportunities: 0
    };

    try {
      // זיהוי דפוסים לא יעילים
      metrics.inefficientPatterns = this.identifyInefficientPatterns(code);
      
      // זיהוי הזדמנויות אופטימיזציה
      metrics.optimizationOpportunities = this.identifyOptimizationOpportunities(code);
      
      // הערכת מורכבות זמן
      metrics.timeComplexity = this.estimateTimeComplexity(code);
      
      // הערכת שימוש בזיכרון
      metrics.memoryUsage = this.estimateMemoryUsage(code);
      
    } catch (error) {
      console.warn('אזהרה בניתוח ביצועים:', error);
    }

    return metrics;
  }

  /**
   * ניתוח אבטחה
   */
  analyzeSecurity(code) {
    const metrics = {
      vulnerabilities: 0,
      securityScore: 0,
      riskLevel: 'LOW',
      recommendations: []
    };

    try {
      // זיהוי פגיעויות אבטחה
      metrics.vulnerabilities = this.identifySecurityVulnerabilities(code);
      
      // חישוב ציון אבטחה
      metrics.securityScore = this.calculateSecurityScore(code);
      
      // הערכת רמת סיכון
      metrics.riskLevel = this.assessRiskLevel(metrics.securityScore);
      
      // המלצות אבטחה
      metrics.recommendations = this.generateSecurityRecommendations(code);
      
    } catch (error) {
      console.warn('אזהרה בניתוח אבטחה:', error);
    }

    return metrics;
  }

  /**
   * ניתוח תחזוקתיות
   */
  analyzeMaintainability(code) {
    const metrics = {
      readability: 0,
      modularity: 0,
      documentation: 0,
      testCoverage: 0,
      technicalDebt: 0
    };

    try {
      // הערכת קריאות
      metrics.readability = this.assessReadability(code);
      
      // הערכת מודולריות
      metrics.modularity = this.assessModularity(code);
      
      // הערכת תיעוד
      metrics.documentation = this.assessDocumentation(code);
      
      // הערכת כיסוי בדיקות
      metrics.testCoverage = this.assessTestCoverage(code);
      
      // חישוב חוב טכני
      metrics.technicalDebt = this.calculateTechnicalDebt(code);
      
    } catch (error) {
      console.warn('אזהרה בניתוח תחזוקתיות:', error);
    }

    return metrics;
  }

  /**
   * זיהוי בעיות בקוד
   */
  identifyIssues(code) {
    const issues = [];
    
    try {
      // זיהוי שגיאות נפוצות
      const commonIssues = this.identifyCommonIssues(code);
      issues.push(...commonIssues);
      
      // זיהוי anti-patterns
      const antiPatterns = this.identifyAntiPatterns(code);
      issues.push(...antiPatterns);
      
      // זיהוי בעיות ביצועים
      const performanceIssues = this.identifyPerformanceIssues(code);
      issues.push(...performanceIssues);
      
      // זיהוי בעיות אבטחה
      const securityIssues = this.identifySecurityIssues(code);
      issues.push(...securityIssues);
      
    } catch (error) {
      console.warn('אזהרה בזיהוי בעיות:', error);
    }

    return issues;
  }

  /**
   * יצירת המלצות שיפור
   */
  generateRecommendations(analysis) {
    const recommendations = [];
    
    try {
      // המלצות למורכבות
      if (analysis.complexity.cyclomaticComplexity > 10) {
        recommendations.push({
          type: 'COMPLEXITY',
          priority: 'HIGH',
          message: 'המורכבות הציקלומטית גבוהה מדי. שקול לפצל את הפונקציה',
          suggestion: 'פיצול פונקציה לפונקציות קטנות יותר'
        });
      }
      
      // המלצות לביצועים
      if (analysis.performance.inefficientPatterns > 5) {
        recommendations.push({
          type: 'PERFORMANCE',
          priority: 'MEDIUM',
          message: 'זוהו דפוסים לא יעילים בקוד',
          suggestion: 'שימוש באלגוריתמים יעילים יותר'
        });
      }
      
      // המלצות לאבטחה
      if (analysis.security.vulnerabilities > 0) {
        recommendations.push({
          type: 'SECURITY',
          priority: 'CRITICAL',
          message: 'זוהו פגיעויות אבטחה בקוד',
          suggestion: 'טיפול מיידי בפגיעויות האבטחה'
        });
      }
      
      // המלצות לתחזוקתיות
      if (analysis.maintainability.technicalDebt > 50) {
        recommendations.push({
          type: 'MAINTAINABILITY',
          priority: 'MEDIUM',
          message: 'רמת החוב הטכני גבוהה',
          suggestion: 'השקעה בשיפור הקוד הקיים'
        });
      }
      
    } catch (error) {
      console.warn('אזהרה ביצירת המלצות:', error);
    }

    return recommendations;
  }

  /**
   * חישוב ציון כללי
   */
  calculateOverallScore(analysis) {
    try {
      const weights = {
        complexity: 0.25,
        performance: 0.25,
        security: 0.25,
        maintainability: 0.25
      };
      
      const scores = {
        complexity: Math.max(0, 100 - analysis.complexity.cyclomaticComplexity * 5),
        performance: Math.max(0, 100 - analysis.performance.inefficientPatterns * 10),
        security: Math.max(0, 100 - analysis.security.vulnerabilities * 20),
        maintainability: Math.max(0, 100 - analysis.maintainability.technicalDebt * 0.5)
      };
      
      const overallScore = Object.keys(weights).reduce((total, key) => {
        return total + (scores[key] * weights[key]);
      }, 0);
      
      return Math.round(overallScore);
      
    } catch (error) {
      console.warn('אזהרה בחישוב ציון כללי:', error);
      return 50; // ציון ברירת מחדל
    }
  }

  // פונקציות עזר לניתוח
  calculateCyclomaticComplexity(code) {
    // לוגיקה פשוטה לחישוב מורכבות
    const complexity = (code.match(/if|else|for|while|case|catch|&&|\|\|/g) || []).length + 1;
    return complexity;
  }

  calculateNestingDepth(code) {
    const lines = code.split('\n');
    let maxDepth = 0;
    let currentDepth = 0;
    
    for (const line of lines) {
      if (line.includes('{')) currentDepth++;
      if (line.includes('}')) currentDepth--;
      maxDepth = Math.max(maxDepth, currentDepth);
    }
    
    return maxDepth;
  }

  calculateFunctionLength(code) {
    const functions = code.match(/function\s+\w+\s*\([^)]*\)\s*\{[^}]*\}/g) || [];
    if (functions.length === 0) return 0;
    
    const totalLines = functions.reduce((total, func) => {
      return total + func.split('\n').length;
    }, 0);
    
    return Math.round(totalLines / functions.length);
  }

  calculateParameterCount(code) {
    const functions = code.match(/function\s+\w+\s*\([^)]*\)/g) || [];
    if (functions.length === 0) return 0;
    
    const totalParams = functions.reduce((total, func) => {
      const params = func.match(/\(([^)]*)\)/);
      if (params && params[1].trim()) {
        return total + params[1].split(',').length;
      }
      return total;
    }, 0);
    
    return Math.round(totalParams / functions.length);
  }

  calculateReturnStatements(code) {
    return (code.match(/return\s+/g) || []).length;
  }

  identifyInefficientPatterns(code) {
    let count = 0;
    
    // זיהוי לולאות לא יעילות
    if (code.includes('for (let i = 0; i < array.length; i++)')) count++;
    
    // זיהוי יצירת אובייקטים מיותרת
    if (code.includes('new Object()')) count++;
    
    // זיהוי שרשור מחרוזות לא יעיל
    if (code.includes('str += "text"')) count++;
    
    return count;
  }

  identifyOptimizationOpportunities(code) {
    let count = 0;
    
    // זיהוי הזדמנויות caching
    if (code.includes('document.getElementById') && code.includes('document.getElementById')) count++;
    
    // זיהוי הזדמנויות lazy loading
    if (code.includes('import(') && code.includes('import(')) count++;
    
    return count;
  }

  estimateTimeComplexity(code) {
    if (code.includes('nested for loops')) return 'O(n²)';
    if (code.includes('for loop')) return 'O(n)';
    if (code.includes('recursion')) return 'O(2^n)';
    return 'O(1)';
  }

  estimateMemoryUsage(code) {
    let usage = 0;
    
    // הערכת שימוש בזיכרון לפי סוגי נתונים
    if (code.includes('Array')) usage += 10;
    if (code.includes('Object')) usage += 5;
    if (code.includes('Map')) usage += 8;
    if (code.includes('Set')) usage += 8;
    
    return usage;
  }

  identifySecurityVulnerabilities(code) {
    let count = 0;
    
    // זיהוי SQL Injection
    if (code.includes('innerHTML') || code.includes('eval(')) count++;
    
    // זיהוי XSS
    if (code.includes('document.write') || code.includes('innerHTML')) count++;
    
    // זיהוי CSRF
    if (code.includes('XMLHttpRequest') && !code.includes('CSRF')) count++;
    
    return count;
  }

  calculateSecurityScore(code) {
    const vulnerabilities = this.identifySecurityVulnerabilities(code);
    return Math.max(0, 100 - vulnerabilities * 25);
  }

  assessRiskLevel(securityScore) {
    if (securityScore >= 80) return 'LOW';
    if (securityScore >= 60) return 'MEDIUM';
    if (securityScore >= 40) return 'HIGH';
    return 'CRITICAL';
  }

  generateSecurityRecommendations(code) {
    const recommendations = [];
    
    if (code.includes('innerHTML')) {
      recommendations.push('החלף innerHTML ב-textContent למניעת XSS');
    }
    
    if (code.includes('eval(')) {
      recommendations.push('החלף eval() בפונקציות בטוחות יותר');
    }
    
    return recommendations;
  }

  assessReadability(code) {
    let score = 100;
    
    // הפחתת נקודות על קוד לא קריא
    if (code.includes('var x = 1; var y = 2; var z = 3;')) score -= 20;
    if (code.includes('function a(){if(b){if(c){if(d){return e;}}}}')) score -= 30;
    
    return Math.max(0, score);
  }

  assessModularity(code) {
    let score = 100;
    
    // בדיקת מודולריות
    const functions = code.match(/function\s+\w+/g) || [];
    if (functions.length < 2) score -= 20;
    if (functions.length > 10) score -= 10;
    
    return Math.max(0, score);
  }

  assessDocumentation(code) {
    let score = 100;
    
    // בדיקת תיעוד
    if (!code.includes('/**') && !code.includes('//')) score -= 40;
    if (!code.includes('@param') && !code.includes('@return')) score -= 20;
    
    return Math.max(0, score);
  }

  assessTestCoverage(code) {
    // הערכת כיסוי בדיקות (פשוטה)
    return 50; // ברירת מחדל
  }

  calculateTechnicalDebt(code) {
    let debt = 0;
    
    // חישוב חוב טכני
    if (code.includes('TODO')) debt += 10;
    if (code.includes('FIXME')) debt += 20;
    if (code.includes('HACK')) debt += 30;
    if (code.includes('// temporary')) debt += 15;
    
    return debt;
  }

  identifyCommonIssues(code) {
    const issues = [];
    
    // זיהוי בעיות נפוצות
    if (code.includes('console.log(')) {
      issues.push({
        type: 'COMMON',
        severity: 'LOW',
        message: 'console.log נשאר בקוד ייצור',
        line: this.findLineNumber(code, 'console.log(')
      });
    }
    
    if (code.includes('debugger;')) {
      issues.push({
        type: 'COMMON',
        severity: 'MEDIUM',
        message: 'debugger statement נשאר בקוד',
        line: this.findLineNumber(code, 'debugger;')
      });
    }
    
    return issues;
  }

  identifyAntiPatterns(code) {
    const issues = [];
    
    // זיהוי anti-patterns
    if (code.includes('new Array()')) {
      issues.push({
        type: 'ANTI_PATTERN',
        severity: 'MEDIUM',
        message: 'שימוש ב-new Array() במקום []',
        line: this.findLineNumber(code, 'new Array()')
      });
    }
    
    return issues;
  }

  identifyPerformanceIssues(code) {
    const issues = [];
    
    // זיהוי בעיות ביצועים
    if (code.includes('innerHTML') && code.includes('for')) {
      issues.push({
        type: 'PERFORMANCE',
        severity: 'HIGH',
        message: 'שימוש ב-innerHTML בלולאה עלול לגרום לבעיות ביצועים',
        line: this.findLineNumber(code, 'innerHTML')
      });
    }
    
    return issues;
  }

  identifySecurityIssues(code) {
    const issues = [];
    
    // זיהוי בעיות אבטחה
    if (code.includes('eval(')) {
      issues.push({
        type: 'SECURITY',
        severity: 'CRITICAL',
        message: 'שימוש ב-eval() עלול לגרום לפגיעויות אבטחה',
        line: this.findLineNumber(code, 'eval(')
      });
    }
    
    return issues;
  }

  findLineNumber(code, searchTerm) {
    const lines = code.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes(searchTerm)) {
        return i + 1;
      }
    }
    return 0;
  }

  /**
   * קבלת סטטיסטיקות ניתוח
   */
  getAnalysisStats() {
    return {
      totalAnalyses: this.analysisHistory.length,
      averageScore: this.calculateAverageScore(),
      issuesByType: this.groupIssuesByType(),
      recommendationsByPriority: this.groupRecommendationsByPriority()
    };
  }

  calculateAverageScore() {
    if (this.analysisHistory.length === 0) return 0;
    
    const totalScore = this.analysisHistory.reduce((sum, analysis) => {
      return sum + (analysis.overallScore || 0);
    }, 0);
    
    return Math.round(totalScore / this.analysisHistory.length);
  }

  groupIssuesByType() {
    const grouped = {};
    
    this.analysisHistory.forEach(analysis => {
      analysis.issues.forEach(issue => {
        if (!grouped[issue.type]) {
          grouped[issue.type] = 0;
        }
        grouped[issue.type]++;
      });
    });
    
    return grouped;
  }

  groupRecommendationsByPriority() {
    const grouped = {
      CRITICAL: 0,
      HIGH: 0,
      MEDIUM: 0,
      LOW: 0
    };
    
    this.analysisHistory.forEach(analysis => {
      analysis.recommendations.forEach(rec => {
        if (grouped[rec.priority]) {
          grouped[rec.priority]++;
        }
      });
    });
    
    return grouped;
  }

  /**
   * ניקוי היסטוריית ניתוח
   */
  clearHistory() {
    this.analysisHistory = [];
    console.log('🧹 היסטוריית ניתוח נוקתה');
  }

  /**
   * ייצוא נתוני ניתוח
   */
  exportAnalysis() {
    return {
      stats: this.getAnalysisStats(),
      history: this.analysisHistory,
      timestamp: new Date().toISOString()
    };
  }
}

// יצירת מופע גלובלי
export const codeAnalyzer = new AdvancedCodeAnalyzer();

// פונקציות עזר מהירות
export const quickAnalyze = (code, filePath) => {
  return codeAnalyzer.analyzeCode(code, filePath);
};

export const getCodeScore = (code) => {
  return codeAnalyzer.analyzeCode(code, 'quick-analysis').then(analysis => analysis.overallScore);
};
