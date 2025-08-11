import express from 'express';
import { spawn } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.WORKER_PORT || 10001;

// ניהול זיכרון - ניקוי אוטומטי
const memoryCleanup = () => {
  if (global.gc) {
    global.gc();
    console.log('🧹 ניקוי זיכרון אוטומטי - Worker');
  }
};

// ניקוי זיכרון כל 3 דקות
setInterval(memoryCleanup, 3 * 60 * 1000);

// ניטור זיכרון
setInterval(() => {
  const memUsage = process.memoryUsage();
  console.log('📊 שימוש זיכרון - Worker:', {
    rss: Math.round(memUsage.rss / 1024 / 1024) + 'MB',
    heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024) + 'MB',
    heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024) + 'MB',
    external: Math.round(memUsage.external / 1024 / 1024) + 'MB'
  });
  
  // אזהרה אם הזיכרון גבוה מדי
  if (memUsage.rss > 1500 * 1024 * 1024) { // 1.5GB
    console.warn('⚠️ שימוש זיכרון גבוה - Worker:', Math.round(memUsage.rss / 1024 / 1024) + 'MB');
    memoryCleanup();
  }
}, 30000); // כל 30 שניות

// נתונים זמניים לפרויקטים
const projects = new Map();
const separationProcesses = new Map();

// Middleware
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

// CORS middleware
app.use((req, res, next) => {
  // אפשר רק את הדומיין של הפרונט
  const allowedOrigin = 'https://mixifyai.k-rstudio.com';
  if (req.path.startsWith('/api/worker/')) {
    res.header('Access-Control-Allow-Origin', allowedOrigin);
  } else {
    res.header('Access-Control-Allow-Origin', '*');
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Origin, Accept, Access-Control-Request-Method, Access-Control-Request-Headers, User-Agent, X-Forwarded-For, X-Forwarded-Proto');
  res.header('Access-Control-Allow-Credentials', 'false');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  next();
});

// Logging middleware
app.use((req, res, next) => {
  console.log(`🔧 Worker Request: ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  const response = { 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    server: 'KR-STUDIO Demucs Worker',
    version: '1.0.0',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    environment: process.env.NODE_ENV || 'development'
  };
  
  res.status(200).json(response);
});

// Worker endpoint לקבלת משימות עיבוד
app.post('/api/worker/process', async (req, res) => {
  try {
    const { fileId, inputPath, outputDir, projectName } = req.body;
    
    console.log('🔧 ===== התחלת עיבוד Worker =====');
    console.log('🔧 fileId:', fileId);
    console.log('🔧 inputPath:', inputPath);
    console.log('🔧 outputDir:', outputDir);
    console.log('🔧 projectName:', projectName);
    
    if (!fileId || !inputPath || !outputDir) {
      return res.status(400).json({ 
        success: false, 
        error: 'חסרים פרמטרים נדרשים' 
      });
    }

    // יצירת תיקיית פלט
    await fs.ensureDir(outputDir);
    console.log('✅ תיקיית פלט נוצרה');

    // אופטימיזציה של הקובץ המקורי לפני ההפרדה
    console.log('🔧 אופטימיזציה של קובץ מקורי...');
    const optimizedPath = await optimizeInputFile(inputPath);
    console.log('✅ קובץ מקורי אופטימז:', optimizedPath);

    // עדכון סטטוס הפרויקט
    const project = {
      id: fileId,
      status: 'processing',
      projectName: projectName,
      outputDir: outputDir,
      progress: 0,
      startedAt: new Date().toISOString()
    };
    
    projects.set(fileId, project);

    console.log('🎵 מתחיל Demucs עם fallback...');
    console.log('🎵 נתיב קובץ:', optimizedPath);
    console.log('🎵 תיקיית פלט:', outputDir);

    // הפעלת Demucs עם fallback
    try {
      await runDemucsWithFallback(optimizedPath, outputDir, project);
      
      console.log('✅ Demucs הושלם בהצלחה');
      project.status = 'completed';
      project.progress = 100;
      project.completedAt = new Date().toISOString();
      
      // יצירת קבצי STEMS
      console.log('🎵 יוצר קבצי STEMS...');
      await createStemsFromDemucs(fileId, outputDir);
      console.log('✅ קבצי STEMS נוצרו');
      
    } catch (error) {
      console.error('❌ Demucs נכשל:', error.message);
      
      if (error.message === 'FALLBACK_NEEDED') {
        console.log('🔄 מנסה fallback עם מודל קל יותר...');
        project.message = 'מנסה מודל קל יותר...';
        project.progress = 50;
        
        try {
          await runDemucsWithFallback(optimizedPath, outputDir, project);
          
          console.log('✅ Demucs הושלם בהצלחה עם fallback');
          project.status = 'completed';
          project.progress = 100;
          project.completedAt = new Date().toISOString();
          
          await createStemsFromDemucs(fileId, outputDir);
          console.log('✅ קבצי STEMS נוצרו');
          
        } catch (fallbackError) {
          console.error('❌ גם fallback נכשל:', fallbackError.message);
          project.status = 'failed';
          project.error = `עיבוד נכשל: ${fallbackError.message}`;
        }
      } else {
        project.status = 'failed';
        project.error = `עיבוד נכשל: ${error.message}`;
      }
    }
    
    const response = { 
      success: true, 
      projectId: fileId,
      status: project.status,
      error: project.error
    };
    
    console.log('✅ תשובה נשלחת:', response);
    res.json(response);
    
  } catch (error) {
    console.error('❌ ===== שגיאה בעיבוד Worker =====');
    console.error('❌ פרטי השגיאה:', error);
    
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// בדיקת סטטוס עיבוד
app.get('/api/worker/status/:fileId', (req, res) => {
  const { fileId } = req.params;
  const project = projects.get(fileId);
  
  if (!project) {
    return res.status(404).json({ 
      success: false, 
      error: 'פרויקט לא נמצא' 
    });
  }
  
  const response = {
    success: true,
    progress: project.progress || 0,
    status: project.status,
    error: project.error,
    message: project.message || 'מעבד...',
    startedAt: project.startedAt,
    completedAt: project.completedAt
  };
  
  res.json(response);
});

// פונקציה לאופטימיזציה של קובץ מקורי
async function optimizeInputFile(inputPath) {
  return new Promise((resolve, reject) => {
    const outputPath = inputPath.replace(/\.[^/.]+$/, '_optimized.mp3');
    
    const ffmpegArgs = [
      '-i', inputPath,
      '-c:a', 'libmp3lame',
      '-b:a', '128k',
      '-ar', '44100',
      '-ac', '2',
      '-f', 'mp3',
      '-y',
      outputPath
    ];
    
    console.log('🔧 אופטימיזציה קובץ מקורי:', inputPath, '->', outputPath);
    
    const ffmpegProcess = spawn('ffmpeg', ffmpegArgs, {
      stdio: ['pipe', 'pipe', 'pipe']
    });
    
    ffmpegProcess.on('close', (code) => {
      if (code === 0) {
        console.log('✅ אופטימיזציה קובץ מקורי הושלמה:', outputPath);
        resolve(outputPath);
      } else {
        console.error('❌ שגיאה באופטימיזציה קובץ מקורי:', code);
        resolve(inputPath);
      }
    });
    
    ffmpegProcess.on('error', (error) => {
      console.error('❌ FFmpeg error:', error);
      resolve(inputPath);
    });
  });
}

// פונקציה להפרדה עם Demucs
async function runDemucsWithFallback(inputPath, outputDir, project) {
  const availableMemory = checkAvailableMemory();
  
  let model = 'htdemucs';
  let twoStems = 'vocals';
  
  if (availableMemory < 200 * 1024 * 1024) {
    console.log('⚠️ זיכרון נמוך, משתמש במודל קל יותר');
    model = 'htdemucs_ft';
    twoStems = 'vocals';
  } else if (availableMemory > 1000 * 1024 * 1024) {
    console.log('✅ זיכרון גבוה, משתמש במודל מלא');
    model = 'htdemucs';
    twoStems = null;
  }
  
  const wavPath = await convertToStandardWav(inputPath);
  
  return new Promise((resolve, reject) => {
    const demucsArgs = [
      '-m', 'demucs',
      '--out', outputDir,
      '--model', model,
      '--mp3',
      '--mp3-bitrate', '192',
      '--mp3-rate', '44100',
      '--mp3-channels', '2',
      '--cpu',
      '--float32',
      '--segment', '10',
      '--overlap', '0.1',
      '--shifts', '0',
      '--split', 'segment',
      '--jobs', '1'
    ];
    
    if (twoStems) {
      demucsArgs.push(`--two-stems=${twoStems}`);
    }
    
    demucsArgs.push(wavPath);
    
    console.log('🎵 הפעלת Demucs עם פרמטרים:', demucsArgs.join(' '));
    
    const demucsProcess = spawn('python', demucsArgs, {
      cwd: __dirname,
      env: {
        ...process.env,
        'OMP_NUM_THREADS': '1',
        'MKL_NUM_THREADS': '1',
        'OPENBLAS_NUM_THREADS': '1',
        'VECLIB_MAXIMUM_THREADS': '1',
        'NUMEXPR_NUM_THREADS': '1',
        'PYTORCH_CUDA_ALLOC_CONF': 'max_split_size_mb:128'
      }
    });
    
    let stdout = '';
    let stderr = '';
    
    demucsProcess.stdout.on('data', (data) => {
      const output = data.toString();
      stdout += output;
      console.log('🎵 Demucs stdout:', output);
      
      if (output.includes('Loading model')) {
        project.message = 'טוען מודל AI...';
        project.progress = Math.max(project.progress, 10);
      } else if (output.includes('Separating')) {
        project.message = 'מפריד ערוצים...';
        project.progress = Math.max(project.progress, 30);
      } else if (output.includes('Saving')) {
        project.message = 'שומר קבצים...';
        project.progress = Math.max(project.progress, 70);
      } else if (output.includes('Done')) {
        project.message = 'מסיים עיבוד...';
        project.progress = Math.max(project.progress, 90);
      }
    });
    
    demucsProcess.stderr.on('data', (data) => {
      const error = data.toString();
      stderr += error;
      console.log('❌ Demucs stderr:', error);
      
      if (error.includes('CUDA') || error.includes('GPU')) {
        project.message = 'משתמש ב-CPU לעיבוד...';
      }
    });
    
    const timeout = setTimeout(() => {
      console.error('⏰ Demucs timeout - יותר מ-20 דקות');
      demucsProcess.kill('SIGTERM');
      reject(new Error('עיבוד נכשל - זמן עיבוד חריג'));
    }, 20 * 60 * 1000);
    
    demucsProcess.on('close', (code) => {
      clearTimeout(timeout);
      console.log('🎵 Demucs process closed with code:', code);
      
      if (code === 0) {
        console.log('✅ Demucs הושלם בהצלחה');
        resolve();
      } else {
        console.error('❌ Demucs נכשל עם קוד:', code);
        console.error('❌ stderr מלא:', stderr);
        
        if (model !== 'htdemucs_ft' && code === 2) {
          console.log('🔄 מנסה fallback עם מודל קל יותר...');
          reject(new Error('FALLBACK_NEEDED'));
        } else {
          reject(new Error(`Demucs failed with code ${code}: ${stderr}`));
        }
      }
    });
    
    demucsProcess.on('error', (error) => {
      clearTimeout(timeout);
      console.error('❌ Demucs process error:', error);
      reject(error);
    });
  });
}

// פונקציה להמרת קובץ ל-WAV סטנדרטי
async function convertToStandardWav(inputPath) {
  const outputPath = inputPath.replace(/\.[^/.]+$/, '_standard.wav');
  
  return new Promise((resolve, reject) => {
    const ffmpegArgs = [
      '-i', inputPath,
      '-c:a', 'pcm_s16le',
      '-ar', '44100',
      '-ac', '2',
      '-f', 'wav',
      '-y',
      outputPath
    ];
    
    console.log('🔄 ממיר ל-WAV סטנדרטי:', inputPath, '->', outputPath);
    
    const ffmpegProcess = spawn('ffmpeg', ffmpegArgs, {
      stdio: ['pipe', 'pipe', 'pipe']
    });
    
    ffmpegProcess.on('close', (code) => {
      if (code === 0) {
        console.log('✅ המרה ל-WAV הושלמה:', outputPath);
        resolve(outputPath);
      } else {
        console.error('❌ שגיאה בהמרה ל-WAV:', code);
        resolve(inputPath);
      }
    });
    
    ffmpegProcess.on('error', (error) => {
      console.error('❌ FFmpeg error בהמרה:', error);
      resolve(inputPath);
    });
  });
}

// פונקציה לבדיקת זיכרון זמין
const checkAvailableMemory = () => {
  const memUsage = process.memoryUsage();
  const availableMemory = process.env.NODE_OPTIONS ? 
    parseInt(process.env.NODE_OPTIONS.match(/--max-old-space-size=(\d+)/)?.[1] || '2048') * 1024 * 1024 :
    2048 * 1024 * 1024; // ברירת מחדל 2GB ל-worker
  
  const usedMemory = memUsage.rss;
  const freeMemory = availableMemory - usedMemory;
  
  console.log('📊 זיכרון זמין - Worker:', Math.round(freeMemory / 1024 / 1024) + 'MB');
  return freeMemory;
};

// יצירת STEMS מ-Demucs
async function createStemsFromDemucs(fileId, outputDir) {
  try {
    const project = projects.get(fileId);
    const demucsOutput = path.join(outputDir, 'separated');
    
    const demucsDirs = await fs.readdir(demucsOutput);
    const audioDir = demucsDirs.find(dir => dir.includes('separated'));
    
    if (!audioDir) {
      throw new Error('לא נמצאו קבצי Demucs');
    }
    
    const audioPath = path.join(demucsOutput, audioDir);
    const files = await fs.readdir(audioPath);
    
    const stems = {
      vocals: files.find(f => f.includes('vocals')),
      no_vocals: files.find(f => f.includes('no_vocals')),
      other: files.find(f => f.includes('other')),
      drums: files.find(f => f.includes('drums')),
      bass: files.find(f => f.includes('bass'))
    };
    
    const stemsDir = path.join(outputDir, 'stems');
    await fs.ensureDir(stemsDir);
    
    for (const [track, filename] of Object.entries(stems)) {
      if (filename) {
        const sourcePath = path.join(audioPath, filename);
        const targetPath = path.join(stemsDir, `${track}.mp3`);
        
        await optimizeAudioFile(sourcePath, targetPath);
      }
    }
    
    project.stems = stems;
    project.stemsDir = stemsDir;
    
    console.log(`🎵 STEMS נוצרו: ${fileId}`);
    
  } catch (error) {
    console.error('שגיאה ביצירת STEMS:', error);
    throw error;
  }
}

// פונקציה לאופטימיזציה של קבצי אודיו
async function optimizeAudioFile(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    const ffmpegArgs = [
      '-i', inputPath,
      '-c:a', 'libmp3lame',
      '-b:a', '192k',
      '-ar', '44100',
      '-ac', '2',
      '-f', 'mp3',
      '-y',
      outputPath
    ];
    
    console.log('🔧 אופטימיזציה עם ffmpeg:', inputPath, '->', outputPath);
    
    const ffmpegProcess = spawn('ffmpeg', ffmpegArgs, {
      stdio: ['pipe', 'pipe', 'pipe']
    });
    
    ffmpegProcess.on('close', (code) => {
      if (code === 0) {
        console.log('✅ אופטימיזציה הושלמה:', outputPath);
        resolve();
      } else {
        console.error('❌ שגיאה באופטימיזציה:', code);
        reject(new Error(`FFmpeg failed with code ${code}`));
      }
    });
    
    ffmpegProcess.on('error', (error) => {
      console.error('❌ FFmpeg error:', error);
      reject(error);
    });
  });
}

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('❌ ===== Worker error =====');
  console.error('❌ Error:', error);
  console.error('❌ Message:', error.message);
  
  res.status(500).json({ 
    error: 'Internal worker error',
    message: error.message,
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🔧 ===== Demucs Worker התחיל =====`);
  console.log(`🔧 Port: ${PORT}`);
  console.log(`🔧 Host: 0.0.0.0 (all interfaces)`);
  console.log(`🔧 Memory: ${JSON.stringify(process.memoryUsage())}`);
  console.log(`✅ ===== Worker מוכן =====`);
});
