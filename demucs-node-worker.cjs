const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const path = require('path');
const fs = require('fs').promises;
const { spawn } = require('child_process');

if (isMainThread) {
    // Main thread - מנהל את ה-workers
    class DemucsNodeWorker {
        constructor() {
            this.workers = [];
            this.taskQueue = [];
            this.maxWorkers = process.env.MAX_WORKERS || 2;
            this.isRunning = false;
            this.stats = {
                totalTasks: 0,
                completedTasks: 0,
                failedTasks: 0,
                startTime: new Date()
            };
        }

        async addTask(task) {
            console.log(`📥 הוספת משימה: ${task.fileId}`);
            this.taskQueue.push(task);
            this.stats.totalTasks++;
            
            if (!this.isRunning) {
                this.startProcessing();
            }
        }

        async startProcessing() {
            this.isRunning = true;
            console.log('🚀 מתחיל עיבוד משימות...');
            
            while (this.taskQueue.length > 0 && this.workers.length < this.maxWorkers) {
                const task = this.taskQueue.shift();
                await this.processTask(task);
            }
            
            this.isRunning = false;
            console.log('⏸️ עיבוד הושלם, ממתין למשימות נוספות...');
        }

        async processTask(task) {
            return new Promise((resolve, reject) => {
                console.log(`🎵 יצירת Worker עבור: ${task.fileId}`);
                
                const worker = new Worker(__filename, {
                    workerData: task
                });

                this.workers.push(worker);

                worker.on('message', (result) => {
                    if (result.success) {
                        console.log(`✅ Worker הושלם בהצלחה: ${task.fileId}`);
                        this.stats.completedTasks++;
                    } else {
                        console.error(`❌ Worker נכשל: ${task.fileId} - ${result.error}`);
                        this.stats.failedTasks++;
                    }
                    
                    resolve(result);
                    this.removeWorker(worker);
                });

                worker.on('error', (error) => {
                    console.error(`❌ Worker שגיאה: ${task.fileId}`, error);
                    this.stats.failedTasks++;
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
                isRunning: this.isRunning,
                stats: this.stats,
                uptime: Date.now() - this.stats.startTime.getTime()
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

    // יצירת מופע של ה-Worker
    const demucsWorker = new DemucsNodeWorker();

    // טיפול בסגירת התהליך
    process.on('SIGINT', async () => {
        console.log('\n🔄 מקבל SIGINT, מכבה...');
        await demucsWorker.shutdown();
        process.exit(0);
    });

    process.on('SIGTERM', async () => {
        console.log('\n🔄 מקבל SIGTERM, מכבה...');
        await demucsWorker.shutdown();
        process.exit(0);
    });

    // ייצוא ה-Worker
    module.exports = demucsWorker;

    // אם הקובץ רץ ישירות
    if (require.main === module) {
        console.log('🚀 Demucs Node Worker מופעל...');
        console.log('📊 סטטוס:', demucsWorker.getStatus());
        
        // דוגמה לשימוש
        setTimeout(() => {
            console.log('📊 סטטוס עדכני:', demucsWorker.getStatus());
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
