module.exports = {
    // הגדרות כלליות
    maxWorkers: process.env.MAX_WORKERS || 2,
    taskTimeout: process.env.TASK_TIMEOUT || 900000, // 15 minutes
    retryAttempts: 3,
    
    // הגדרות Worker Pool
    workerPool: {
        minWorkers: 1,
        maxWorkers: 4,
        idleTimeout: 300000, // 5 minutes
        maxConcurrency: 2
    },
    
    // הגדרות עיבוד אודיו
    audioProcessing: {
        supportedFormats: ['mp3', 'wav', 'flac', 'm4a', 'ogg'],
        maxFileSize: 100 * 1024 * 1024, // 100MB
        outputQuality: '320kbps',
        outputFormat: 'mp3'
    },
    
    // הגדרות Queue
    queue: {
        priorityLevels: ['high', 'normal', 'low'],
        maxQueueSize: 100,
        processInterval: 1000 // 1 second
    },
    
    // הגדרות לוגים
    logging: {
        level: process.env.LOG_LEVEL || 'info',
        enableFileLogging: false,
        logDirectory: './logs'
    },
    
    // הגדרות Demucs
    demucs: {
        model: 'htdemucs',
        twoStems: 'vocals',
        mp3Bitrate: '320',
        float32: true,
        timeout: 900000 // 15 minutes
    },
    
    // הגדרות בריאות המערכת
    health: {
        checkInterval: 30000, // 30 seconds
        maxMemoryUsage: 0.8, // 80%
        maxCpuUsage: 0.9 // 90%
    }
};
