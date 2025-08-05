import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs-extra';
import { spawn } from 'child_process';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 10000;

// הגדרות נוספות לשרת
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

// הגדרות נוספות לביצועים
app.use((req, res, next) => {
  // הגדרת timeout ארוך יותר לבקשות
  req.setTimeout(300000); // 5 דקות
  res.setTimeout(300000); // 5 דקות
  
  // הוספת headers לביצועים
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  next();
});

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    // רשימת דומיינים מותרים
    const allowedOrigins = [
      'https://mixifyai.k-rstudio.com',
      'https://kr-studio-completeai.onrender.com',
      'http://localhost:5173',
      'http://localhost:3000',
      'http://localhost:8080',
      'https://k-rstudio.com',
      'https://www.k-rstudio.com'
    ];
    
    // בדיקה אם הדומיין מותר או אם זה request ללא origin (כמו Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log(`🚫 CORS blocked: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Origin', 'Accept'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

app.use(express.static('dist'));

// Handle preflight requests
app.options('*', cors());

// CORS logging middleware
app.use((req, res, next) => {
  console.log(`🌐 CORS Request: ${req.method} ${req.path} from ${req.headers.origin}`);
  
  // הוספת headers נוספים ל-CORS
  if (req.headers.origin) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
  }
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  // טיפול ב-preflight requests
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }
  
  next();
});

// הגדרת Multer לעיבוד קבצים
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    fs.ensureDirSync(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname).toLowerCase();
    
    // ניקוי שם הקובץ מתווים מיוחדים
    const cleanName = file.originalname
      .replace(/[^\w\s-]/g, '') // הסרת תווים מיוחדים
      .replace(/\s+/g, '_') // החלפת רווחים ב-_
      .substring(0, 50); // הגבלת אורך
    
    const filename = `audio_${cleanName}_${uniqueSuffix}${extension}`;
    console.log('📁 שם קובץ חדש:', filename);
    cb(null, filename);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    console.log('🔍 בדיקת קובץ:', file.originalname, file.mimetype);
    
    // בדיקה יותר גמישה של MIME types
    const allowedMimeTypes = [
      'audio/mpeg',
      'audio/mp3', 
      'audio/wav',
      'audio/x-wav',
      'audio/flac',
      'audio/x-flac',
      'audio/m4a',
      'audio/x-m4a',
      'audio/aac',
      'audio/x-aac',
      'audio/mp4',
      'audio/x-mp4'
    ];
    
    const allowedExtensions = /\.(mp3|wav|flac|m4a|aac)$/i;
    const extname = allowedExtensions.test(file.originalname);
    const mimetype = allowedMimeTypes.includes(file.mimetype);
    
    console.log('🔍 בדיקת סיומת:', extname, 'עבור:', file.originalname);
    console.log('🔍 בדיקת MIME type:', file.mimetype, '->', mimetype);
    
    // אם יש MIME type תקין או סיומת תקינה - קבל את הקובץ
    if (mimetype || extname) {
      console.log('✅ קובץ אודיו תקין:', file.originalname);
      return cb(null, true);
    } else {
      // בדיקה נוספת - אולי הקובץ תקין אבל עם תווים מיוחדים
      const cleanName = file.originalname.replace(/[^\w\s-]/g, '');
      const cleanExtname = allowedExtensions.test(cleanName);
      
      console.log('🔍 בדיקה נוספת עם שם נקי:', cleanName, '->', cleanExtname);
      
      if (cleanExtname) {
        console.log('✅ קובץ אודיו תקין (אחרי ניקוי):', file.originalname);
        return cb(null, true);
      } else {
        console.log('❌ קובץ לא נתמך:', file.originalname, file.mimetype);
        cb(new Error(`רק קבצי אודיו נתמכים. קובץ: ${file.originalname}, MIME: ${file.mimetype}`));
      }
    }
  },
  limits: {
    fileSize: 200 * 1024 * 1024, // 200MB
    files: 1,
    fieldSize: 10 * 1024 * 1024 // 10MB
  }
});

// Middleware לטיפול בשגיאות Multer
const handleMulterError = (error, req, res, next) => {
  console.error('❌ שגיאת Multer:', error);
  console.error('❌ פרטי שגיאה:', {
    code: error.code,
    field: error.field,
    message: error.message,
    stack: error.stack
  });
  
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ 
        error: 'הקובץ גדול מדי (מקסימום 200MB)',
        code: 'FILE_TOO_LARGE',
        maxSize: '200MB'
      });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ 
        error: 'יותר מדי קבצים (מקסימום קובץ אחד)',
        code: 'TOO_MANY_FILES',
        maxFiles: 1
      });
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ 
        error: 'שדה לא צפוי',
        code: 'UNEXPECTED_FIELD'
      });
    }
    return res.status(400).json({ 
      error: 'שגיאה בהעלאת קובץ',
      code: error.code,
      message: error.message
    });
  }
  
  // שגיאות אחרות
  return res.status(400).json({ 
    error: 'שגיאה בהעלאת קובץ',
    message: error.message
  });
};

// נתונים זמניים לפרויקטים
const projects = new Map();
const separationProcesses = new Map();

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Audio separation endpoints
app.post('/api/upload', upload.single('audio'), async (req, res) => {
  try {
    console.log('📁 ===== התחלת העלאה =====');
    console.log('📁 קובץ:', req.file ? req.file.originalname : 'לא קובץ');
    console.log('📁 גודל:', req.file ? req.file.size : 'לא ידוע');
    console.log('📁 סוג:', req.file ? req.file.mimetype : 'לא ידוע');
    
    if (!req.file) {
      console.log('❌ לא נבחר קובץ');
      return res.status(400).json({ error: 'לא נבחר קובץ' });
    }

    // יצירת תיקיית uploads אם לא קיימת
    const uploadDir = path.join(__dirname, 'uploads');
    try {
      await fs.ensureDir(uploadDir);
      console.log('✅ תיקיית uploads נוצרה/קיימת:', uploadDir);
    } catch (dirError) {
      console.error('❌ שגיאה ביצירת תיקיית uploads:', dirError);
      return res.status(500).json({ error: 'שגיאה ביצירת תיקיית העלאות' });
    }

    const fileId = Date.now().toString();
    const projectData = {
      id: fileId,
      originalFile: req.file.filename,
      originalPath: req.file.path,
      createdAt: new Date().toISOString(),
      status: 'uploaded'
    };

    projects.set(fileId, projectData);

    console.log(`✅ קובץ הועלה בהצלחה!`);
    console.log(`📁 שם מקורי: ${req.file.originalname}`);
    console.log(`📁 fileId: ${fileId}`);
    console.log(`📁 נתיב קובץ: ${req.file.path}`);
    console.log(`📁 גודל קובץ: ${req.file.size} bytes`);
    console.log(`📁 פרויקט נוצר:`, projectData);
    
    const response = { 
      file: { 
        id: fileId, 
        name: req.file.originalname,
        size: req.file.size 
      } 
    };
    
    console.log('📁 תשובת העלאה:', response);
    console.log('✅ ===== העלאה הושלמה בהצלחה =====');
    
    res.json(response);
  } catch (error) {
    console.error('❌ ===== שגיאה בהעלאה =====');
    console.error('❌ פרטי השגיאה:', error);
    console.error('❌ Stack trace:', error.stack);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/separate', async (req, res) => {
  try {
    const { fileId, projectName } = req.body;
    
    console.log('🎵 ===== התחלת הפרדה =====');
    console.log('🎵 fileId:', fileId);
    console.log('🎵 שם פרויקט:', projectName);
    console.log('🎵 זמן התחלה:', new Date().toLocaleTimeString());
    
    if (!fileId || !projects.has(fileId)) {
      console.log('❌ קובץ לא נמצא:', fileId);
      console.log('❌ פרויקטים קיימים:', Array.from(projects.keys()));
      return res.status(404).json({ error: 'קובץ לא נמצא' });
    }

    const project = projects.get(fileId);
    console.log('📁 פרויקט נמצא:', project);
    
    const outputDir = path.join(__dirname, 'separated', fileId);

    // יצירת תיקיית פלט
    await fs.ensureDir(outputDir);
    console.log('📁 תיקיית פלט נוצרה:', outputDir);

    // עדכון סטטוס הפרויקט
    project.status = 'processing';
    project.projectName = projectName;
    project.outputDir = outputDir;
    project.progress = 0;
    project.startedAt = new Date().toISOString();

    console.log('🎵 מתחיל Demucs עם נתיב:', project.originalPath);
    console.log('🎵 תיקיית פלט:', outputDir);

    // הפעלת Demucs
    const demucsProcess = spawn(
      'python',
      [
        '-m', 'demucs',
        '--out', outputDir,
        '--two-stems=vocals',
        '--mp3',
        '--mp3-bitrate', '320',
        project.originalPath
      ],
      { cwd: __dirname }
    );

    console.log('🎵 תהליך Demucs התחיל');
    console.log('🎵 PID:', demucsProcess.pid);

    // מעקב אחר התקדמות אמיתית
    let progress = 0;
    let processingStage = 'initializing';
    
    const progressInterval = setInterval(() => {
      // התקדמות איטית יותר וריאליסטית
      if (progress < 85) {
        const increment = Math.random() * 2 + 0.5; // 0.5-2.5 אחוזים
        progress += increment;
        project.progress = Math.min(progress, 85);
        
        console.log('📊 התקדמות:', project.progress.toFixed(1) + '%');
        
        // הודעות מפורטות לפי התקדמות
        if (progress < 15) {
          project.status = 'processing';
          project.message = 'מנתח אודיו ומכין לעיבוד...';
        } else if (progress < 35) {
          project.status = 'separating';
          project.message = 'מפריד ערוצים - ווקאל ובס...';
        } else if (progress < 60) {
          project.message = 'מפריד ערוצים - תופים וכלי נגינה...';
        } else if (progress < 85) {
          project.message = 'מסיים עיבוד ומכין קבצים...';
        }
      }
    }, 3000); // כל 3 שניות

    demucsProcess.stdout.on('data', (data) => {
      const output = data.toString();
      console.log(`🎵 Demucs stdout: ${output}`);
      
      // מעקב אחר התקדמות אמיתית לפי הפלט של Demucs
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
      console.log(`⚠️ Demucs stderr: ${error}`);
      
      // עדכון הודעה אם יש שגיאה
      if (error.includes('CUDA') || error.includes('GPU')) {
        project.message = 'משתמש ב-CPU לעיבוד...';
      }
    });

    demucsProcess.on('close', async (code) => {
      clearInterval(progressInterval);
      
      console.log('🎵 Demucs הסתיים עם קוד:', code);
      console.log('🎵 זמן סיום:', new Date().toLocaleTimeString());
      
      if (code === 0) {
        project.status = 'completed';
        project.progress = 100;
        project.completedAt = new Date().toISOString();
        
        console.log('✅ Demucs הושלם בהצלחה, יוצר STEMS...');
        // יצירת קבצי STEMS
        await createStemsFromDemucs(fileId, outputDir);
        
        console.log(`✅ הפרדה הושלמה בהצלחה: ${fileId}`);
        console.log('✅ ===== הפרדה הושלמה בהצלחה =====');
      } else {
        project.status = 'failed';
        project.error = `Demucs failed with code ${code}`;
        console.error(`❌ הפרדה נכשלה: ${fileId}`);
        console.error('❌ ===== הפרדה נכשלה =====');
      }
    });

    separationProcesses.set(fileId, demucsProcess);
    
    console.log('✅ הפרדה החלה בהצלחה');
    console.log('✅ ===== תהליך הפרדה התחיל =====');
    
    res.json({ 
      success: true, 
      projectId: fileId,
      message: 'הפרדה החלה'
    });
    
  } catch (error) {
    console.error('❌ ===== שגיאה בהפרדה =====');
    console.error('❌ פרטי השגיאה:', error);
    console.error('❌ Stack trace:', error.stack);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/separate/:fileId/progress', (req, res) => {
  const { fileId } = req.params;
  const project = projects.get(fileId);
  
  console.log('📊 ===== בקשת התקדמות =====');
  console.log('📊 fileId:', fileId);
  console.log('📊 זמן בקשת התקדמות:', new Date().toLocaleTimeString());
  console.log('📁 פרויקט:', project);
  
  if (!project) {
    console.log('❌ פרויקט לא נמצא:', fileId);
    console.log('❌ פרויקטים קיימים:', Array.from(projects.keys()));
    return res.status(404).json({ error: 'פרויקט לא נמצא' });
  }
  
  const response = {
    progress: project.progress || 0,
    status: project.status,
    error: project.error,
    message: project.message || 'מעבד...'
  };
  
  console.log('📊 תשובת התקדמות:', response);
  console.log('📊 ===== תשובת התקדמות נשלחה =====');
  
  res.json(response);
});

app.get('/api/projects', (req, res) => {
  const projectsList = Array.from(projects.values()).map(project => ({
    id: project.id,
    name: project.projectName || 'פרויקט ללא שם',
    status: project.status,
    createdAt: project.createdAt,
    progress: project.progress || 0,
    stems: project.stems ? Object.keys(project.stems) : []
  }));
  
  res.json(projectsList);
});

app.get('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  const project = projects.get(id);
  
  if (!project) {
    return res.status(404).json({ error: 'פרויקט לא נמצא' });
  }
  
  res.json(project);
});

app.get('/api/projects/:id/download/:stem', (req, res) => {
  const { id, stem } = req.params;
  const project = projects.get(id);
  
  if (!project || !project.stemsDir) {
    return res.status(404).json({ error: 'קובץ לא נמצא' });
  }
  
  const filePath = path.join(project.stemsDir, `${stem}.mp3`);
  
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'קובץ לא נמצא' });
  }
  
  res.download(filePath);
});

app.delete('/api/projects/:id', async (req, res) => {
  const { id } = req.params;
  const project = projects.get(id);
  
  if (!project) {
    return res.status(404).json({ error: 'פרויקט לא נמצא' });
  }
  
  try {
    // עצירת תהליך הפרדה אם רץ
    const process = separationProcesses.get(id);
    if (process) {
      process.kill();
      separationProcesses.delete(id);
    }
    
    // מחיקת קבצים
    if (project.originalPath) {
      await fs.remove(project.originalPath);
    }
    
    if (project.outputDir) {
      await fs.remove(project.outputDir);
    }
    
    projects.delete(id);
    
    res.json({ success: true });
  } catch (error) {
    console.error('שגיאה במחיקת פרויקט:', error);
    res.status(500).json({ error: error.message });
  }
});



// יצירת STEMS מ-Demucs
async function createStemsFromDemucs(fileId, outputDir) {
  try {
    const project = projects.get(fileId);
    const demucsOutput = path.join(outputDir, 'separated');
    
    // חיפוש תיקיית Demucs
    const demucsDirs = await fs.readdir(demucsOutput);
    const audioDir = demucsDirs.find(dir => dir.includes('separated'));
    
    if (!audioDir) {
      throw new Error('לא נמצאו קבצי Demucs');
    }
    
    const audioPath = path.join(demucsOutput, audioDir);
    const files = await fs.readdir(audioPath);
    
    // יצירת STEMS
    const stems = {
      vocals: files.find(f => f.includes('vocals')),
      no_vocals: files.find(f => f.includes('no_vocals')),
      other: files.find(f => f.includes('other')),
      drums: files.find(f => f.includes('drums')),
      bass: files.find(f => f.includes('bass'))
    };
    
    // העתקת קבצים לתיקיית STEMS
    const stemsDir = path.join(outputDir, 'stems');
    await fs.ensureDir(stemsDir);
    
    for (const [track, filename] of Object.entries(stems)) {
      if (filename) {
        const sourcePath = path.join(audioPath, filename);
        const targetPath = path.join(stemsDir, `${track}.mp3`);
        await fs.copy(sourcePath, targetPath);
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



// Health check endpoint
app.get('/api/health', (req, res) => {
  console.log('🏥 Health check request from:', req.headers.origin);
  console.log('🌐 Request headers:', req.headers);
  console.log('📊 Server status: Running');
  console.log('💾 Memory usage:', process.memoryUsage());
  console.log('⏰ Uptime:', process.uptime());
  
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    server: 'KR-STUDIO CompleteAI Backend',
    version: '1.0.0',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Serve React app
app.get('*', (req, res) => {
  console.log('📄 Serving React app for:', req.path);
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('❌ Server error:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    message: error.message,
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 שרת פועל על פורט ${PORT}`);
  console.log(`🌐 Server URL: http://localhost:${PORT}`);
  console.log(`📁 תיקיית העלאות: ${path.join(__dirname, 'uploads')}`);
  console.log(`🎵 תיקיית הפרדות: ${path.join(__dirname, 'separated')}`);
  console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`💾 Memory: ${JSON.stringify(process.memoryUsage())}`);
}); 