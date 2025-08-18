const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const path = require('path');
const fs = require('fs').promises;
const { spawn } = require('child_process');

if (isMainThread) {
    // Main thread - מנהל את ה-workers
    class DemucsWorkerManager {
        constructor() {
            this.workers = [];
            this.taskQueue = [];
            this.maxWorkers = process.env.MAX_WORKERS || 2;
            this.isRunning = false;
        }

        async addTask(task) {
            this.taskQueue.push(task);
            if (!this.isRunning) {
                this.startProcessing();
            }
        }

        async startProcessing() {
            this.isRunning = true;
            while (this.taskQueue.length > 0 && this.workers.length < this.maxWorkers) {
                const task = this.taskQueue.shift();
                await this.processTask(task);
            }
            this.isRunning = false;
        }

        async processTask(task) {
            return new Promise((resolve, reject) => {
                const worker = new Worker(__filename, {
                    workerData: task
                });

                this.workers.push(worker);

                worker.on('message', (result) => {
                    console.log(`✅ Worker הושלם: ${task.fileId}`);
                    resolve(result);
                    this.removeWorker(worker);
                });

                worker.on('error', (error) => {
                    console.error(`❌ Worker שגיאה: ${task.fileId}`, error);
                    reject(error);
                    this.removeWorker(worker);
                });

                worker.on('exit', (code) => {
                    if (code !== 0) {
                        console.error(`❌ Worker יצא עם קוד: ${code}`);
                    }
                    this.removeWorker(worker);
                });
            });
        }

        removeWorker(worker) {
            const index = this.workers.indexOf(worker);
            if (index > -1) {
                this.workers.splice(index, 1);
            }
            // המשך עיבוד אם יש עוד משימות
            if (this.taskQueue.length > 0 && !this.isRunning) {
                this.startProcessing();
            }
        }

        getStatus() {
            return {
                activeWorkers: this.workers.length,
                queuedTasks: this.taskQueue.length,
                maxWorkers: this.maxWorkers,
                isRunning: this.isRunning
            };
        }

        async shutdown() {
            console.log('🔄 מכבה את כל ה-workers...');
            const promises = this.workers.map(worker => worker.terminate());
            await Promise.all(promises);
            this.workers = [];
            this.taskQueue = [];
            console.log('✅ כל ה-workers כבויים');
        }
    }

    // יצירת מופע של המנהל
    const workerManager = new DemucsWorkerManager();

    // טיפול בסגירת התהליך
    process.on('SIGINT', async () => {
        console.log('\n🔄 מקבל SIGINT, מכבה...');
        await workerManager.shutdown();
        process.exit(0);
    });

    process.on('SIGTERM', async () => {
        console.log('\n🔄 מקבל SIGTERM, מכבה...');
        await workerManager.shutdown();
        process.exit(0);
    });

    // ייצוא המנהל
    module.exports = workerManager;

    // אם הקובץ רץ ישירות
    if (require.main === module) {
        console.log('🚀 Demucs Worker Manager מופעל...');
        console.log('📊 סטטוס:', workerManager.getStatus());
        
        // דוגמה לשימוש
        setTimeout(() => {
            console.log('📊 סטטוס עדכני:', workerManager.getStatus());
        }, 5000);
    }
} else {
    // Worker thread - מבצע את העבודה
    const task = workerData;
    
    async function processAudioSeparation() {
        try {
            console.log(`🎵 Worker מתחיל עיבוד: ${task.fileId}`);
            
            const { inputPath, outputDir, projectName } = task;
            
            // בדיקה שהקבצים קיימים
            await fs.access(inputPath);
            await fs.mkdir(outputDir, { recursive: true });
            
            // הפעלת Demucs
            const result = await runDemucs(inputPath, outputDir, projectName);
            
            // שליחת התוצאה חזרה ל-main thread
            parentPort.postMessage({
                success: true,
                fileId: task.fileId,
                result: result,
                timestamp: new Date().toISOString()
            });
            
        } catch (error) {
            console.error(`❌ שגיאה בעיבוד: ${task.fileId}`, error);
            parentPort.postMessage({
                success: false,
                fileId: task.fileId,
                error: error.message,
                timestamp: new Date().toISOString()
            });
        }
    }

    async function runDemucs(inputPath, outputDir, projectName) {
        return new Promise((resolve, reject) => {
            console.log(`🎵 מפעיל Demucs עבור: ${projectName}`);
            
            const demucsArgs = [
                '-m', 'demucs',
                '--two-stems=vocals',
                '--mp3',
                '--mp3-bitrate', '320',
                '--float32',
                '--out', outputDir,
                inputPath
            ];
            
            console.log('🎵 Demucs arguments:', demucsArgs.join(' '));
            
            const demucsProcess = spawn('python', demucsArgs, {
                stdio: ['pipe', 'pipe', 'pipe'],
                cwd: process.cwd()
            });
            
            let stdout = '';
            let stderr = '';
            
            demucsProcess.stdout.on('data', (data) => {
                stdout += data.toString();
                console.log('🎵 Demucs stdout:', data.toString().trim());
            });
            
            demucsProcess.stderr.on('data', (data) => {
                stderr += data.toString();
                console.log('❌ Demucs stderr:', data.toString().trim());
            });
            
            demucsProcess.on('close', (code) => {
                if (code === 0) {
                    console.log('✅ Demucs הושלם בהצלחה');
                    resolve({
                        outputDir: outputDir,
                        projectName: projectName,
                        stdout: stdout,
                        stderr: stderr
                    });
                } else {
                    reject(new Error(`Demucs נכשל עם קוד ${code}: ${stderr}`));
                }
            });
            
            demucsProcess.on('error', (error) => {
                reject(new Error(`Demucs process error: ${error.message}`));
            });
            
            // Timeout אחרי 15 דקות
            setTimeout(() => {
                console.error('⏰ Demucs timeout - יותר מ-15 דקות');
                demucsProcess.kill('SIGTERM');
                reject(new Error('Demucs timeout'));
            }, 15 * 60 * 1000);
        });
    }

    // התחלת העיבוד
    processAudioSeparation();
}
