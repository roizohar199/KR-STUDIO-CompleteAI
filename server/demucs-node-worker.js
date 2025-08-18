const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const path = require('path');
const fs = require('fs').promises;

if (isMainThread) {
    // Main thread - מנהל את ה-workers
    class DemucsWorkerManager {
        constructor() {
            this.workers = new Map();
            this.taskQueue = [];
            this.isProcessing = false;
            this.maxWorkers = 4;
        }

        async addTask(task) {
            this.taskQueue.push(task);
            console.log(`Task added to queue. Queue length: ${this.taskQueue.length}`);
            
            if (!this.isProcessing) {
                this.processQueue();
            }
        }

        async processQueue() {
            if (this.taskQueue.length === 0) {
                this.isProcessing = false;
                console.log('Queue processing completed');
                return;
            }

            this.isProcessing = true;
            const task = this.taskQueue.shift();
            
            try {
                console.log(`Processing task: ${task.type}`);
                const result = await this.processTask(task);
                console.log('Task completed successfully:', result);
            } catch (error) {
                console.error('Task failed:', error);
            }

            // המשך עיבוד התור
            setImmediate(() => this.processQueue());
        }

        async processTask(task) {
            return new Promise((resolve, reject) => {
                const worker = new Worker(__filename, {
                    workerData: task
                });

                worker.on('message', (result) => {
                    console.log('Worker message received:', result);
                    resolve(result);
                    worker.terminate();
                });

                worker.on('error', (error) => {
                    console.error('Worker error:', error);
                    reject(error);
                    worker.terminate();
                });

                worker.on('exit', (code) => {
                    if (code !== 0) {
                        reject(new Error(`Worker stopped with exit code ${code}`));
                    }
                });
            });
        }

        getQueueStatus() {
            return {
                queueLength: this.taskQueue.length,
                isProcessing: this.isProcessing,
                activeWorkers: this.workers.size
            };
        }
    }

    // יצירת instance של המנהל
    const workerManager = new DemucsWorkerManager();

    // דוגמה לשימוש
    if (require.main === module) {
        console.log('Starting Demucs Worker Manager...');
        
        // הוספת משימה לדוגמה
        workerManager.addTask({
            type: 'audio_separation',
            inputFile: 'test.mp3',
            outputDir: './separated'
        });

        // הצגת סטטוס כל 5 שניות
        setInterval(() => {
            const status = workerManager.getQueueStatus();
            console.log('Worker Status:', status);
        }, 5000);
    }

    module.exports = workerManager;

} else {
    // Worker thread - מבצע את העבודה
    const task = workerData;
    
    async function processAudioSeparation() {
        try {
            console.log(`Worker processing task: ${task.type}`);
            console.log(`Input file: ${task.inputFile}`);
            console.log(`Output directory: ${task.outputDir}`);
            
            // סימולציה של עיבוד Demucs
            console.log('Starting audio separation...');
            await new Promise(resolve => setTimeout(resolve, 3000));
            
            const result = {
                success: true,
                taskId: Date.now(),
                taskType: task.type,
                inputFile: task.inputFile,
                outputDir: task.outputDir,
                timestamp: new Date().toISOString(),
                message: `Successfully processed ${task.inputFile}`
            };
            
            console.log('Task completed, sending result to main thread');
            parentPort.postMessage(result);
        } catch (error) {
            console.error('Worker error:', error);
            parentPort.postMessage({
                success: false,
                error: error.message,
                taskId: Date.now(),
                taskType: task.type
            });
        }
    }

    processAudioSeparation();
}
