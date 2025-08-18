module.exports = {
    // הגדרות כלליות
    maxWorkers: 4,
    taskTimeout: 300000, // 5 minutes
    retryAttempts: 3,
    
    // הגדרות Worker Pool
    workerPool: {
        min: 2,
        max: 8,
        idleTimeout: 60000 // 1 minute
    },
    
    // הגדרות עיבוד אודיו
    audioProcessing: {
        supportedFormats: ['mp3', 'wav', 'flac', 'm4a'],
        maxFileSize: 100 * 1024 * 1024, // 100MB
        outputFormats: ['wav', 'mp3'],
        quality: 'high'
    },
    
    // הגדרות תור משימות
    queue: {
        priorityLevels: ['high', 'normal', 'low'],
        maxQueueSize: 100,
        processInterval: 1000 // 1 second
    },
    
    // הגדרות לוגים
    logging: {
        level: 'info',
        enableConsole: true,
        enableFile: false,
        logFile: './worker.log'
    }
};
