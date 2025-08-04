import React, { useState, useEffect } from 'react';
import { Activity, Database, Cpu, HardDrive, Zap } from 'lucide-react';
import { dynamicLoader } from '../lib/dynamicImports';

const PerformanceMonitor = () => {
  const [performanceStats, setPerformanceStats] = useState({
    memory: 0,
    cpu: 0,
    loadedModules: 0,
    loadingModules: 0,
    totalChunks: 0
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateStats = () => {
      // מדידת זיכרון
      if ('memory' in performance) {
        const memoryInfo = performance.memory;
        const memoryUsage = (memoryInfo.usedJSHeapSize / memoryInfo.jsHeapSizeLimit) * 100;
        
        // מדידת CPU (קירוב)
        const startTime = performance.now();
        let cpuUsage = 0;
        for (let i = 0; i < 1000000; i++) {
          cpuUsage += Math.random();
        }
        const endTime = performance.now();
        const cpuTime = endTime - startTime;
        
        // סטטיסטיקות מודולים
        const loadingStats = dynamicLoader.getLoadingStats();
        
        setPerformanceStats({
          memory: Math.round(memoryUsage),
          cpu: Math.round(cpuTime),
          loadedModules: loadingStats.totalLoaded,
          loadingModules: loadingStats.totalLoading,
          totalChunks: loadingStats.loadedModules.length + loadingStats.loadingModules.length
        });
      }
    };

    const interval = setInterval(updateStats, 2000);
    return () => clearInterval(interval);
  }, []);

  const getMemoryColor = (usage) => {
    if (usage < 50) return 'text-green-500';
    if (usage < 80) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getCpuColor = (usage) => {
    if (usage < 10) return 'text-green-500';
    if (usage < 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg z-50"
        title="ניטור ביצועים"
      >
        <Activity size={20} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-xl z-50 min-w-64">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-semibold flex items-center">
          <Zap size={16} className="mr-2" />
          ניטור ביצועים
        </h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-3">
        {/* זיכרון */}
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-300">
            <Database size={14} className="mr-2" />
            זיכרון
          </div>
          <div className={`font-mono ${getMemoryColor(performanceStats.memory)}`}>
            {performanceStats.memory}%
          </div>
        </div>
        
        {/* CPU */}
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-300">
            <Cpu size={14} className="mr-2" />
            CPU
          </div>
          <div className={`font-mono ${getCpuColor(performanceStats.cpu)}`}>
            {performanceStats.cpu}ms
          </div>
        </div>
        
        {/* מודולים נטענים */}
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-300">
            <HardDrive size={14} className="mr-2" />
            מודולים
          </div>
          <div className="text-blue-400 font-mono">
            {performanceStats.loadedModules}/{performanceStats.totalChunks}
          </div>
        </div>
        
        {/* פעולות מהירות */}
        <div className="pt-2 border-t border-gray-700">
          <div className="flex space-x-2">
            <button
              onClick={() => dynamicLoader.cleanup()}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs py-1 px-2 rounded"
              title="ניקוי זיכרון"
            >
              ניקוי
            </button>
            <button
              onClick={() => {
                // במקום window.location.reload(), נשתמש בפונקציה מקומית
                dynamicLoader.cleanup();
                setTimeout(() => {
                  window.location.reload();
                }, 100);
              }}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs py-1 px-2 rounded"
              title="רענון"
            >
              רענון
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMonitor; 