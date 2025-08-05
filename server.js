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

// Middleware
app.use(cors({
  origin: [
    'https://mixifyai.k-rstudio.com',
    'https://kr-studio-completeai.onrender.com',
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:8080'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
app.use(express.json());
app.use(express.static('dist'));

// Handle preflight requests
app.options('*', cors());

// CORS logging middleware
app.use((req, res, next) => {
  console.log(`🌐 CORS Request: ${req.method} ${req.path} from ${req.headers.origin}`);
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
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    console.log('🔍 בדיקת קובץ:', file.originalname, file.mimetype);
    const allowedTypes = /mp3|wav|flac|m4a|aac/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      console.log('✅ קובץ אודיו תקין:', file.originalname);
      return cb(null, true);
    } else {
      console.log('❌ קובץ לא נתמך:', file.originalname, file.mimetype);
      cb(new Error('רק קבצי אודיו נתמכים'));
    }
  },
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB
  }
});

// Middleware לטיפול בשגיאות Multer
const handleMulterError = (error, req, res, next) => {
  console.error('❌ שגיאת Multer:', error);
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'הקובץ גדול מדי (מקסימום 100MB)' });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ error: 'יותר מדי קבצים' });
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ error: 'שדה לא צפוי' });
    }
  }
  res.status(400).json({ error: error.message });
};

// נתונים זמניים לפרויקטים
const projects = new Map();
const separationProcesses = new Map();

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Audio separation endpoints
app.post('/api/upload', upload.single('audio'), handleMulterError, async (req, res) => {
  try {
    console.log('📁 התחלת העלאה:', req.file ? req.file.originalname : 'לא קובץ');
    
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

    console.log(`📁 קובץ הועלה: ${req.file.originalname} -> ${fileId}`);
    console.log(`📁 נתיב קובץ: ${req.file.path}`);
    console.log(`📁 גודל קובץ: ${req.file.size} bytes`);
    
    res.json({ 
      file: { 
        id: fileId, 
        name: req.file.originalname,
        size: req.file.size 
      } 
    });
  } catch (error) {
    console.error('❌ שגיאה בהעלאה:', error);
    console.error('❌ Stack trace:', error.stack);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/separate', async (req, res) => {
  try {
    const { fileId, projectName } = req.body;
    
    if (!fileId || !projects.has(fileId)) {
      return res.status(404).json({ error: 'קובץ לא נמצא' });
    }

    const project = projects.get(fileId);
    const outputDir = path.join(__dirname, 'separated', fileId);
    
    // יצירת תיקיית פלט
    await fs.ensureDir(outputDir);
    
    // עדכון סטטוס הפרויקט
    project.status = 'processing';
    project.projectName = projectName;
    project.outputDir = outputDir;
    project.progress = 0;
    project.startedAt = new Date().toISOString();
    
    // הפעלת Demucs
    const demucsProcess = spawn('python', [
      '-m', 'demucs',
      '--out', outputDir,
      '--two-stems=vocals',
      '--mp3',
      '--mp3-bitrate', '320',
      project.originalPath
    ], {
      cwd: __dirname
    });

    // מעקב אחר התקדמות
    let progress = 0;
    const progressInterval = setInterval(() => {
      if (progress < 90) {
        progress += Math.random() * 10;
        project.progress = Math.min(progress, 90);
      }
    }, 1000);

    demucsProcess.stdout.on('data', (data) => {
      console.log(`🎵 Demucs: ${data.toString()}`);
    });

    demucsProcess.stderr.on('data', (data) => {
      console.log(`⚠️ Demucs Error: ${data.toString()}`);
    });

    demucsProcess.on('close', async (code) => {
      clearInterval(progressInterval);
      
      if (code === 0) {
        project.status = 'completed';
        project.progress = 100;
        project.completedAt = new Date().toISOString();
        
        // יצירת קבצי STEMS
        await createStemsFromDemucs(fileId, outputDir);
        
        console.log(`✅ הפרדה הושלמה: ${fileId}`);
      } else {
        project.status = 'failed';
        project.error = `Demucs failed with code ${code}`;
        console.error(`❌ הפרדה נכשלה: ${fileId}`);
      }
    });

    separationProcesses.set(fileId, demucsProcess);
    
    res.json({ 
      success: true, 
      projectId: fileId,
      message: 'הפרדה החלה'
    });
    
  } catch (error) {
    console.error('שגיאה בהפרדה:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/separate/:fileId/progress', (req, res) => {
  const { fileId } = req.params;
  const project = projects.get(fileId);
  
  if (!project) {
    return res.status(404).json({ error: 'פרויקט לא נמצא' });
  }
  
  res.json({
    progress: project.progress || 0,
    status: project.status,
    error: project.error
  });
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



// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 שרת פועל על פורט ${PORT}`);
  console.log(`📁 תיקיית העלאות: ${path.join(__dirname, 'uploads')}`);
  console.log(`🎵 תיקיית הפרדות: ${path.join(__dirname, 'separated')}`);
}); 