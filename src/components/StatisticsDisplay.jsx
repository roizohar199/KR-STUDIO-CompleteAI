import React from 'react';
import { BarChart3, TrendingUp, Users, Clock, Download, Play, Music } from 'lucide-react';

const StatisticsDisplay = ({ 
  totalProjects = 0,
  totalProcessingTime = 0,
  totalDownloads = 0,
  totalPlayTime = 0,
  averageQuality = 0,
  successRate = 0
}) => {
  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours} שעות ${mins} דקות`;
    }
    return `${mins} דקות`;
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const getQualityColor = (quality) => {
    if (quality >= 90) return 'text-green-400';
    if (quality >= 80) return 'text-yellow-400';
    if (quality >= 70) return 'text-orange-400';
    return 'text-red-400';
  };

  const getSuccessRateColor = (rate) => {
    if (rate >= 95) return 'text-green-400';
    if (rate >= 85) return 'text-yellow-400';
    if (rate >= 75) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <BarChart3 className="w-6 h-6 text-purple-400" />
        <h2 className="text-2xl font-bold text-white">סטטיסטיקות מערכת</h2>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Projects */}
        <div className="glass-effect rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <Music className="w-6 h-6 text-purple-400" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">
            {formatNumber(totalProjects)}
          </h3>
          <p className="text-gray-400 text-sm">פרויקטים סה"כ</p>
        </div>

        {/* Processing Time */}
        <div className="glass-effect rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Clock className="w-6 h-6 text-blue-400" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">
            {formatTime(totalProcessingTime)}
          </h3>
          <p className="text-gray-400 text-sm">זמן עיבוד סה"כ</p>
        </div>

        {/* Total Downloads */}
        <div className="glass-effect rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <Download className="w-6 h-6 text-green-400" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">
            {formatNumber(totalDownloads)}
          </h3>
          <p className="text-gray-400 text-sm">הורדות סה"כ</p>
        </div>

        {/* Play Time */}
        <div className="glass-effect rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-500/20 rounded-lg">
              <Play className="w-6 h-6 text-yellow-400" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">
            {formatTime(totalPlayTime)}
          </h3>
          <p className="text-gray-400 text-sm">זמן נגינה סה"כ</p>
        </div>

        {/* Average Quality */}
        <div className="glass-effect rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-emerald-500/20 rounded-lg">
              <BarChart3 className="w-6 h-6 text-emerald-400" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <h3 className={`text-2xl font-bold mb-1 ${getQualityColor(averageQuality)}`}>
            {averageQuality}%
          </h3>
          <p className="text-gray-400 text-sm">איכות ממוצעת</p>
        </div>

        {/* Success Rate */}
        <div className="glass-effect rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-rose-500/20 rounded-lg">
              <Users className="w-6 h-6 text-rose-400" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <h3 className={`text-2xl font-bold mb-1 ${getSuccessRateColor(successRate)}`}>
            {successRate}%
          </h3>
          <p className="text-gray-400 text-sm">אחוז הצלחה</p>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quality Distribution */}
        <div className="glass-effect rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">התפלגות איכות</h3>
          <div className="space-y-3">
            {[
              { label: 'מצוין (90%+)', value: 45, color: 'bg-green-500' },
              { label: 'טוב (80-89%)', value: 30, color: 'bg-yellow-500' },
              { label: 'בינוני (70-79%)', value: 20, color: 'bg-orange-500' },
              { label: 'נמוך (<70%)', value: 5, color: 'bg-red-500' }
            ].map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">{item.label}</span>
                  <span className="text-sm text-white font-medium">{item.value}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${item.color} transition-all duration-300`}
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Processing Trends */}
        <div className="glass-effect rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">מגמות עיבוד</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-sm text-gray-300">פרויקטים היום</span>
              </div>
              <span className="text-sm text-white font-medium">12</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span className="text-sm text-gray-300">פרויקטים השבוע</span>
              </div>
              <span className="text-sm text-white font-medium">87</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                <span className="text-sm text-gray-300">פרויקטים החודש</span>
              </div>
              <span className="text-sm text-white font-medium">342</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <span className="text-sm text-gray-300">זמן ממוצע לעיבוד</span>
              </div>
              <span className="text-sm text-white font-medium">3.2 דקות</span>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="glass-effect rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">מדדי ביצועים</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-800/50 rounded-lg">
            <div className="text-2xl font-bold text-green-400 mb-1">99.8%</div>
            <div className="text-sm text-gray-400">זמינות שרת</div>
          </div>
          
          <div className="text-center p-4 bg-gray-800/50 rounded-lg">
            <div className="text-2xl font-bold text-blue-400 mb-1">1.2s</div>
            <div className="text-sm text-gray-400">זמן תגובה ממוצע</div>
          </div>
          
          <div className="text-center p-4 bg-gray-800/50 rounded-lg">
            <div className="text-2xl font-bold text-purple-400 mb-1">2.5GB</div>
            <div className="text-sm text-gray-400">עיבוד יומי</div>
          </div>
          
          <div className="text-center p-4 bg-gray-800/50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-400 mb-1">1,247</div>
            <div className="text-sm text-gray-400">משתמשים פעילים</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsDisplay; 