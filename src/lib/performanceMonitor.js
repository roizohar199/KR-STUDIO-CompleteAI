/**
 * מערכת ניטור ביצועים מתקדמת
 * Advanced Performance Monitoring System
 */

export class PerformanceMonitor {
  constructor() {
    this.metrics = new Map();
    this.thresholds = new Map();
    this.alerts = [];
    this.isMonitoring = false;
  }

  /**
   * התחלת ניטור
   */
  startMonitoring() {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    this.monitorMemory();
    this.monitorCPU();
    this.monitorNetwork();
    
    console.log('📊 ניטור ביצועים הופעל');
  }

  /**
   * ניטור זיכרון
   */
  monitorMemory() {
    if (!this.isMonitoring) return;
    
    setInterval(() => {
      if ('memory' in performance) {
        const memory = performance.memory;
        this.metrics.set('memory', {
          used: memory.usedJSHeapSize,
          total: memory.totalJSHeapSize,
          limit: memory.jsHeapSizeLimit,
          timestamp: Date.now()
        });
        
        this.checkMemoryThresholds(memory);
      }
    }, 5000);
  }

  /**
   * ניטור CPU
   */
  monitorCPU() {
    if (!this.isMonitoring) return;
    
    setInterval(() => {
      const startTime = performance.now();
      
      // מדידת עומס CPU פשוטה
      setTimeout(() => {
        const endTime = performance.now();
        const cpuLoad = endTime - startTime;
        
        this.metrics.set('cpu', {
          load: cpuLoad,
          timestamp: Date.now()
        });
        
        this.checkCPUThresholds(cpuLoad);
      }, 100);
    }, 2000);
  }

  /**
   * ניטור רשת
   */
  monitorNetwork() {
    if (!this.isMonitoring) return;
    
    if ('connection' in navigator) {
      const connection = navigator.connection;
      
      this.metrics.set('network', {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        timestamp: Date.now()
      });
    }
  }

  /**
   * בדיקת ספי זיכרון
   */
  checkMemoryThresholds(memory) {
    const usagePercent = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
    
    if (usagePercent > 80) {
      this.createAlert('MEMORY', 'CRITICAL', `שימוש בזיכרון גבוה: ${usagePercent.toFixed(1)}%`);
    } else if (usagePercent > 60) {
      this.createAlert('MEMORY', 'WARNING', `שימוש בזיכרון גבוה: ${usagePercent.toFixed(1)}%`);
    }
  }

  /**
   * בדיקת ספי CPU
   */
  checkCPUThresholds(cpuLoad) {
    if (cpuLoad > 100) {
      this.createAlert('CPU', 'CRITICAL', `עומס CPU גבוה: ${cpuLoad.toFixed(1)}ms`);
    } else if (cpuLoad > 50) {
      this.createAlert('CPU', 'WARNING', `עומס CPU גבוה: ${cpuLoad.toFixed(1)}ms`);
    }
  }

  /**
   * יצירת התראה
   */
  createAlert(type, severity, message) {
    const alert = {
      type,
      severity,
      message,
      timestamp: new Date().toISOString()
    };
    
    this.alerts.push(alert);
    console.warn(`🚨 ${type} ${severity}: ${message}`);
  }

  /**
   * קבלת סטטיסטיקות ביצועים
   */
  getPerformanceStats() {
    const stats = {};
    
    this.metrics.forEach((value, key) => {
      stats[key] = value;
    });
    
    return {
      metrics: stats,
      alerts: this.alerts,
      isMonitoring: this.isMonitoring
    };
  }

  /**
   * עצירת ניטור
   */
  stopMonitoring() {
    this.isMonitoring = false;
    console.log('⏹️ ניטור ביצועים הופסק');
  }
}

export const performanceMonitor = new PerformanceMonitor();
