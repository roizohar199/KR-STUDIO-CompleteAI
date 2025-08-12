import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs-extra';
import { spawn } from 'child_process';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 10000;

// Startup optimization for Fly.io
let isReady = false;
setTimeout(() => {
  isReady = true;
  console.log('🚀 Server is ready for health checks');
}, 5000); // 5 שניות להתחלה

// הגדרת כתובת בסיס ל-Worker - עכשיו מקומי
const WORKER_BASE_URL = process.env.WORKER_URL || 'http://localhost:10001/api/worker';

// ניהול זיכרון - ניקוי אוטומטי
const memoryCleanup = () => {
  if (global.gc) {
    global.gc();
    console.log('🧹 ניקוי זיכרון אוטומטי');
  }
};

// ניקוי זיכרון כל 5 דקות
setInterval(memoryCleanup, 5 * 60 * 1000);

// ניקוי קבצים ישנים כל 10 דקות
setInterval(async () => {
  try {
    const uploadsDir = path.join(__dirname, 'uploads');
    const separatedDir = path.join(__dirname, 'separated');
    
    // ניקוי קבצים ישנים מ-uploads (יותר מ-שעה)
    if (await fs.pathExists(uploadsDir)) {
      const files = await fs.readdir(uploadsDir);
      const oneHourAgo = Date.now() - (60 * 60 * 1000);
      
      for (const file of files) {
        const filePath = path.join(uploadsDir, file);
        const stats = await fs.stat(filePath);
        
        if (stats.mtime.getTime() < oneHourAgo) {
          await fs.remove(filePath);
          console.log('🗑️ נוקה קובץ ישן:', file);
        }
      }
    }
    
    // ניקוי פרויקטים ישנים מ-separated (יותר מ-שעתיים)
    if (await fs.pathExists(separatedDir)) {
      const projects = await fs.readdir(separatedDir);
      const twoHoursAgo = Date.now() - (2 * 60 * 60 * 1000);
      
      for (const project of projects) {
        const projectPath = path.join(separatedDir, project);
        const stats = await fs.stat(projectPath);
        
        if (stats.mtime.getTime() < twoHoursAgo) {
          await fs.remove(projectPath);
          console.log('🗑️ נוקה פרויקט ישן:', project);
        }
      }
    }
  } catch (error) {
    console.error('❌ שגיאה בניקוי קבצים:', error);
  }
}, 10 * 60 * 1000); // כל 10 דקות

// ניטור זיכרון
setInterval(() => {
  const memUsage = process.memoryUsage();
  console.log('📊 שימוש זיכרון:', {
    rss: Math.round(memUsage.rss / 1024 / 1024) + 'MB',
    heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024) + 'MB',
    heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024) + 'MB',
    external: Math.round(memUsage.external / 1024 / 1024) + 'MB'
  });
  
  // אזהרה אם הזיכרון גבוה מדי
  if (memUsage.rss > 400 * 1024 * 1024) { // 400MB
    console.warn('⚠️ שימוש זיכרון גבוה:', Math.round(memUsage.rss / 1024 / 1024) + 'MB');
    memoryCleanup();
  }
}, 30000); // כל 30 שניות

// ⚠️ סדר חשוב: CORS middleware חייב להיות הראשון לפני כל middleware אחר
// זה מבטיח שכל בקשה, כולל OPTIONS preflight, תקבל את ה-CORS headers הנכונים

// הגדרת CORS עם תמיכה מלאה ב-Fly.io
// תמיכה ב-Health Checks של Fly.io (ללא Origin)
const corsOptions = {
  origin: function (origin, callback) {
    // תמיכה ב-Health Checks של Fly.io (ללא Origin)
    if (!origin) {
      return callback(null, true);
    }
    
    // רשימת Origins מותרים
    const allowedOrigins = [
      'https://mixifyai.k-rstudio.com',
      'http://localhost:5173',
      'http://localhost:3000',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:3000',
      // Fly.io domains
      'https://kr-studio-completeai.fly.dev'
    ];
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      console.log('❌ Origin לא מורשה:', origin);
      return callback(new Error('Origin לא מורשה'), false);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD', 'PATCH'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'X-Requested-With', 
    'Origin', 
    'Accept',
    'Access-Control-Request-Method',
    'Access-Control-Request-Headers',
    'User-Agent',
    'X-Forwarded-For',
    'X-Forwarded-Proto'
  ],
  optionsSuccessStatus: 200,
  credentials: true, // שינוי ל-true לתמיכה ב-credentials
  preflightContinue: false, // שינוי ל-false לטיפול אוטומטי ב-OPTIONS
  maxAge: 86400
};

// Serve static files FIRST - before CORS middleware to avoid CORS issues
// This ensures static files are served without CORS restrictions
app.use('/assets', express.static('dist/assets', {
  setHeaders: (res, path) => {
    // Set proper headers for JavaScript files
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    } else if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
    // Allow all origins for static files
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Encoding, Accept-Language');
  }
}));

app.use(express.static('dist', {
  setHeaders: (res, path) => {
    // Allow all origins for static files
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Encoding, Accept-Language');
  }
}));

// Add explicit route for static files to bypass CORS
app.get('/assets/*', (req, res, next) => {
  const filePath = path.join(__dirname, 'dist', req.url);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    next();
  }
});

// 1. CORS middleware - אחרי הקבצים הסטטיים
app.use(cors(corsOptions));

// 2. OPTIONS handler מפורש לכל הנתיבים
app.options('*', cors(corsOptions));

// 3. Body parsers
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

// Handle preflight requests for all API routes - removed duplicate handler
// OPTIONS requests are now handled in the CORS middleware above

// Logging middleware for all requests
app.use((req, res, next) => {
  console.log(`🌐 ===== Request =====`);
  console.log(`🌐 Method: ${req.method}`);
  console.log(`🌐 URL: ${req.url}`);
  console.log(`🌐 Origin: ${req.headers.origin}`);
  console.log(`🌐 User-Agent: ${req.headers['user-agent']}`);
  console.log(`🌐 Content-Type: ${req.headers['content-type']}`);
  console.log(`🌐 Content-Length: ${req.headers['content-length']}`);
  
  // Log response headers
  const originalSend = res.send;
  const originalJson = res.json;
  
  res.send = function(data) {
    console.log(`🌐 ===== Response =====`);
    console.log(`🌐 Status: ${res.statusCode}`);
    console.log(`🌐 Headers:`, res.getHeaders());
    console.log(`🌐 Data:`, data);
    return originalSend.call(this, data);
  };
  
  res.json = function(data) {
    console.log(`🌐 ===== JSON Response =====`);
    console.log(`🌐 Status: ${res.statusCode}`);
    console.log(`🌐 Headers:`, res.getHeaders());
    console.log(`🌐 Data:`, data);
    return originalJson.call(this, data);
  };
  
  const originalDownload = res.download;
  res.download = function(path, filename, callback) {
    console.log(`🌐 ===== Download Response =====`);
    console.log(`🌐 Status: ${res.statusCode}`);
    console.log(`🌐 Headers:`, res.getHeaders());
    console.log(`🌐 Path:`, path);
    console.log(`🌐 Filename:`, filename);
    return originalDownload.call(this, path, filename, callback);
  };
  
  const originalStatus = res.status;
  res.status = function(code) {
    console.log(`🌐 ===== Status Response =====`);
    console.log(`🌐 Status Code: ${code}`);
    console.log(`🌐 Previous Status: ${res.statusCode}`);
    return originalStatus.call(this, code);
  };
  
  // Log when response ends
  res.on('finish', () => {
    console.log(`🌐 ===== Response Finished =====`);
    console.log(`🌐 Final Status: ${res.statusCode}`);
    console.log(`🌐 Final Headers:`, res.getHeaders());
  });
  
  // Log errors
  res.on('error', (error) => {
    console.error(`🌐 ===== Response Error =====`);
    console.error(`🌐 Error:`, error);
    console.error(`🌐 Status: ${res.statusCode}`);
  });
  
  // Log close
  res.on('close', () => {
    console.log(`🌐 ===== Response Closed =====`);
    console.log(`🌐 Status: ${res.statusCode}`);
  });
  
  // Log timeout
  res.on('timeout', () => {
    console.log(`🌐 ===== Response Timeout =====`);
    console.log(`🌐 Status: ${res.statusCode}`);
  });
  
    // Log request error only
  req.on('error', (error) => {
    console.error(`🌐 ===== Request Error =====`);
    console.error(`🌐 Error:`, error);
    console.error(`🌐 URL: ${req.url}`);
  });
  
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
    cb(null, filename);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
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
    
    // אם יש MIME type תקין או סיומת תקינה - קבל את הקובץ
    if (mimetype || extname) {
      return cb(null, true);
    } else {
      // בדיקה נוספת - אולי הקובץ תקין אבל עם תווים מיוחדים
      const cleanName = file.originalname.replace(/[^\w\s-]/g, '');
      const cleanExtname = allowedExtensions.test(cleanName);
      
      if (cleanExtname) {
        return cb(null, true);
      } else {
        cb(new Error(`רק קבצי אודיו נתמכים. קובץ: ${file.originalname}, MIME: ${file.mimetype}`));
      }
    }
  },
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB - הורדה מ-200MB
    files: 1,
    fieldSize: 10 * 1024 * 1024 // 10MB
  }
});



// Middleware לטיפול בשגיאות Multer
const handleMulterError = (error, req, res, next) => {
  console.error('❌ ===== שגיאת Multer =====');
  console.error('❌ Error:', error.message);
  
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ 
        error: 'הקובץ גדול מדי (מקסימום 50MB)',
        code: 'FILE_TOO_LARGE',
        maxSize: '50MB'
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

// ה-CORS middleware מטפל ב-OPTIONS אוטומטית - לא צריך handler נוסף

// Audio separation endpoints
app.post('/api/upload', upload.single('audio'), handleMulterError, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'לא נבחר קובץ' });
    }

    // יצירת תיקיית uploads אם לא קיימת
    const uploadDir = path.join(__dirname, 'uploads');
    try {
      await fs.ensureDir(uploadDir);
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
    
    const response = { 
      success: true,
      file: { 
        id: fileId, 
        name: req.file.originalname,
        size: req.file.size 
      },
      message: 'הקובץ הועלה בהצלחה',
      nextStep: 'separation'
    };
    
    // שליחת תשובה מיידית עם CORS headers
    res.status(200).json(response);
  } catch (error) {
    console.error('❌ ===== שגיאה בהעלאה =====');
    console.error('❌ פרטי השגיאה:', error);
    
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

app.post('/api/separate', async (req, res) => {
  try {
    const { fileId, projectName } = req.body;
    
    console.log('🎵 ===== התחלת הפרדה =====');
    console.log('🎵 fileId:', fileId);
    console.log('🎵 projectName:', projectName);
    console.log('🎵 זמן התחלה:', new Date().toLocaleTimeString());
    
    if (!fileId || !projects.has(fileId)) {
      // Fallback: ייתכן שהשרת עבר אתחול וה-Map התרוקן, אך הקובץ עדיין קיים פיזית
      const potentialPath = path.join(__dirname, 'uploads', `${fileId}`);
      const potentialExists = fs.existsSync(potentialPath);

      if (potentialExists) {
        console.log('🔄 Fallback – יוצרים מחדש אובייקט פרויקט מהדיסק:', potentialPath);
        // משחזרים אובייקט פרויקט מינימלי כדי לאפשר המשך תהליך
        projects.set(fileId, {
          id: fileId,
          originalPath: potentialPath,
          status: 'uploaded',
          createdAt: new Date().toISOString(),
        });
      }
    }

    // אם אחרי ה-fallback עדיין אין את הפרויקט – נחזיר 404
    if (!fileId || !projects.has(fileId)) {
      console.log('❌ קובץ לא נמצא:', fileId);
      return res.status(404).json({ 
        success: false, 
        error: 'קובץ לא נמצא' 
      });
    }

    const project = projects.get(fileId);
    const outputDir = path.join(__dirname, 'separated', fileId);

    console.log('🎵 פרויקט נמצא:', project);
    console.log('🎵 תיקיית פלט:', outputDir);

    // עדכון סטטוס הפרויקט
    project.status = 'processing';
    project.projectName = projectName;
    project.outputDir = outputDir;
    project.progress = 0;
    project.startedAt = new Date().toISOString();

    // עיבוד מקומי של האודיו
    console.log('🔧 מתחיל עיבוד מקומי...');
    
    try {
      // הפעלת עיבוד מקומי
      const result = await processAudioLocally(fileId, project.originalPath, outputDir, projectName);
      
      if (result.success) {
        project.status = 'completed';
        project.progress = 100;
        project.completedAt = new Date().toISOString();
        
        // סריקת הקבצים שנוצרו
        try {
          const files = await fs.readdir(outputDir);
          const stems = files.filter(file => file.endsWith('.mp3'));
          project.stems = stems;
          console.log('✅ Stems שנוצרו:', stems);
        } catch (scanError) {
          console.error('❌ שגיאה בסריקת stems:', scanError);
        }
      } else {
        project.status = 'failed';
        project.error = 'עיבוד נכשל';
      }

    } catch (processingError) {
      console.error('❌ Processing error:', processingError);
      project.status = 'failed';
      project.error = `שגיאה בעיבוד: ${processingError.message}`;
    }
    
    const response = { 
      success: true, 
      projectId: fileId,
      message: 'הפרדה החלה'
    };
    
    console.log('✅ תשובה נשלחת:', response);
    
    res.json(response);
    
  } catch (error) {
    console.error('❌ ===== שגיאה בהפרדה =====');
    console.error('❌ פרטי השגיאה:', error);
    console.error('❌ Stack trace:', error.stack);
    console.error('❌ זמן שגיאה:', new Date().toLocaleTimeString());
    console.error('❌ שולח תשובת שגיאה למשתמש...');
    
    const errorResponse = { error: error.message };
    console.error('❌ תשובת שגיאה נשלחת:', errorResponse);
    
    res.status(500).json(errorResponse);
  }
});

app.get('/api/separate/:fileId/progress', async (req, res) => {
  const { fileId } = req.params;
  const project = projects.get(fileId);
  
  console.log('📊 ===== בקשת התקדמות =====');
  console.log('📊 Headers:', req.headers);
  console.log('📊 fileId:', fileId);
  console.log('📊 זמן בקשת התקדמות:', new Date().toLocaleTimeString());
  console.log('📁 פרויקט:', project);
  
  if (!project) {
    console.log('❌ פרויקט לא נמצא:', fileId);
    console.log('❌ פרויקטים קיימים:', Array.from(projects.keys()));
    return res.status(404).json({ 
      success: false, 
      error: 'פרויקט לא נמצא' 
    });
  }
  
  // בדיקת סטטוס מקומי
  if (project.status === 'processing') {
    // אם הפרויקט עדיין מעבד, נחזיר התקדמות בסיסית
    project.progress = Math.min(project.progress + 10, 90); // התקדמות הדרגתית
  }
  
  const response = {
    success: true,
    progress: project.progress,
    status: project.status,
    error: project.error,
    message: project.status === 'completed' ? 'הושלם בהצלחה' : 'מעבד...',
    startedAt: project.startedAt,
    completedAt: project.completedAt
  };
  
  console.log('📊 תשובת התקדמות:', response);
  
  res.json(response);
});

app.get('/api/projects', (req, res) => {
  console.log('📋 ===== בקשת פרויקטים =====');
  console.log('📋 Headers:', req.headers);
  console.log('📋 פרויקטים קיימים:', Array.from(projects.keys()));
  
  const projectsList = Array.from(projects.values()).map(project => ({
    id: project.id,
    name: project.projectName || 'פרויקט ללא שם',
    status: project.status,
    createdAt: project.createdAt,
    progress: project.progress || 0,
    stems: project.stems ? Object.keys(project.stems) : []
  }));
  
  console.log('📋 תשובת פרויקטים:', projectsList);
  
  res.json(projectsList);
});

app.get('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  const project = projects.get(id);
  
  console.log('📁 ===== בקשת פרויקט =====');
  console.log('📁 Headers:', req.headers);
  console.log('📁 ID:', id);
  console.log('📁 פרויקט:', project);
  
  if (!project) {
    console.log('❌ פרויקט לא נמצא:', id);
    return res.status(404).json({ 
      success: false, 
      error: 'פרויקט לא נמצא' 
    });
  }
  
  console.log('✅ פרויקט נמצא ונשלח');
  
  res.json({
    success: true,
    project: project
  });
});

app.get('/api/projects/:id/download/:stem', (req, res) => {
  const { id, stem } = req.params;
  const project = projects.get(id);
  
  console.log('⬇️ ===== בקשת הורדה =====');
  console.log('⬇️ Headers:', req.headers);
  console.log('⬇️ ID:', id);
  console.log('⬇️ Stem:', stem);
  console.log('⬇️ פרויקט:', project);
  
  if (!project || !project.stemsDir) {
    console.log('❌ פרויקט או תיקיית stems לא נמצאו');
    return res.status(404).json({ 
      success: false, 
      error: 'קובץ לא נמצא' 
    });
  }
  
  const filePath = path.join(project.stemsDir, `${stem}.mp3`);
  console.log('⬇️ נתיב קובץ:', filePath);
  
  if (!fs.existsSync(filePath)) {
    console.log('❌ קובץ לא קיים:', filePath);
    return res.status(404).json({ 
      success: false, 
      error: 'קובץ לא נמצא' 
    });
  }
  
  console.log('✅ קובץ נמצא ונשלח להורדה');
  
  res.download(filePath);
});

app.delete('/api/projects/:id', async (req, res) => {
  const { id } = req.params;
  const project = projects.get(id);
  
  console.log('🗑️ ===== בקשת מחיקה =====');
  console.log('🗑️ Headers:', req.headers);
  console.log('🗑️ ID:', id);
  console.log('🗑️ פרויקט:', project);
  
  if (!project) {
    console.log('❌ פרויקט לא נמצא:', id);
    return res.status(404).json({ 
      success: false, 
      error: 'פרויקט לא נמצא' 
    });
  }
  
  try {
    // עצירת תהליך הפרדה אם רץ
    const process = separationProcesses.get(id);
    if (process) {
      console.log('🛑 עוצר תהליך הפרדה');
      process.kill();
      separationProcesses.delete(id);
    }
    
    // מחיקת קבצים
    if (project.originalPath) {
      console.log('🗑️ מוחק קובץ מקורי:', project.originalPath);
      await fs.remove(project.originalPath);
    }
    
    if (project.outputDir) {
      console.log('🗑️ מוחק תיקיית פלט:', project.outputDir);
      await fs.remove(project.outputDir);
    }
    
    projects.delete(id);
    
    res.json({ success: true });
  } catch (error) {
    console.error('שגיאה במחיקת פרויקט:', error);
    
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});



// יצירת STEMS מ-Demucs עם אופטימיזציה לזיכרון
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
    
    // העתקת קבצים לתיקיית STEMS עם אופטימיזציה לזיכרון
    const stemsDir = path.join(outputDir, 'stems');
    await fs.ensureDir(stemsDir);
    
    for (const [track, filename] of Object.entries(stems)) {
      if (filename) {
        const sourcePath = path.join(audioPath, filename);
        const targetPath = path.join(stemsDir, `${track}.mp3`);
        
        // שימוש ב-ffmpeg עם אופטימיזציה לזיכרון
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

// פונקציה לאופטימיזציה של קובץ מקורי לפני ההפרדה
async function optimizeInputFile(inputPath) {
  return new Promise((resolve, reject) => {
    const outputPath = inputPath.replace(/\.[^/.]+$/, '_optimized.mp3');
    
    // הגדרות אופטימיזציה לזיכרון לקובץ מקורי
    const ffmpegArgs = [
      '-i', inputPath,
      '-c:a', 'libmp3lame',     // קודק MP3 יעיל
      '-b:a', '128k',           // ביטרייט נמוך לקובץ מקורי
      '-ar', '44100',           // Sample rate סטנדרטי
      '-ac', '2',               // סטריאו
      '-f', 'mp3',              // פורמט MP3
      '-y',                     // דריסת קובץ קיים
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
        // אם נכשל, נחזיר את הקובץ המקורי
        resolve(inputPath);
      }
    });
    
    ffmpegProcess.on('error', (error) => {
      console.error('❌ FFmpeg error:', error);
      // אם נכשל, נחזיר את הקובץ המקורי
      resolve(inputPath);
    });
  });
}

// פונקציה לאופטימיזציה של קבצי אודיו עם ffmpeg
async function optimizeAudioFile(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    // הגדרות אופטימיזציה לזיכרון
    const ffmpegArgs = [
      '-i', inputPath,
      '-c:a', 'libmp3lame',     // קודק MP3 יעיל
      '-b:a', '192k',           // ביטרייט נמוך יותר
      '-ar', '44100',           // Sample rate סטנדרטי
      '-ac', '2',               // סטריאו
      '-f', 'mp3',              // פורמט MP3
      '-y',                     // דריסת קובץ קיים
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

// פונקציה לבדיקת זיכרון זמין
const checkAvailableMemory = () => {
  const memUsage = process.memoryUsage();
  const availableMemory = process.env.NODE_OPTIONS ? 
    parseInt(process.env.NODE_OPTIONS.match(/--max-old-space-size=(\d+)/)?.[1] || '512') * 1024 * 1024 :
    512 * 1024 * 1024; // ברירת מחדל 512MB
  
  const usedMemory = memUsage.rss;
  const freeMemory = availableMemory - usedMemory;
  
  console.log('📊 זיכרון זמין:', Math.round(freeMemory / 1024 / 1024) + 'MB');
  return freeMemory;
};

// פונקציה לחלוקת קובץ גדול לחתיכות קטנות
async function splitLargeFile(inputPath, maxSizeMB = 50) {
  const stats = await fs.stat(inputPath);
  const fileSizeMB = stats.size / (1024 * 1024);
  
  if (fileSizeMB <= maxSizeMB) {
    console.log('📁 קובץ קטן מספיק, לא צריך לחלק:', fileSizeMB.toFixed(2) + 'MB');
    return [inputPath];
  }
  
  console.log('📁 מחלק קובץ גדול:', fileSizeMB.toFixed(2) + 'MB');
  
  const outputDir = path.dirname(inputPath);
  const baseName = path.basename(inputPath, path.extname(inputPath));
  const extension = path.extname(inputPath);
  const chunks = [];
  
  // חלוקה לחתיכות של 10 דקות כל אחת
  const segmentDuration = 600; // 10 דקות בשניות
  
  return new Promise((resolve, reject) => {
    const ffmpegArgs = [
      '-i', inputPath,
      '-f', 'segment',
      '-segment_time', segmentDuration.toString(),
      '-c', 'copy',
      '-reset_timestamps', '1',
      path.join(outputDir, `${baseName}_chunk_%03d${extension}`)
    ];
    
    const ffmpegProcess = spawn('ffmpeg', ffmpegArgs, {
      stdio: ['pipe', 'pipe', 'pipe']
    });
    
    ffmpegProcess.on('close', async (code) => {
      if (code === 0) {
        try {
          const files = await fs.readdir(outputDir);
          const chunkFiles = files
            .filter(f => f.startsWith(`${baseName}_chunk_`) && f.endsWith(extension))
            .sort()
            .map(f => path.join(outputDir, f));
          
          console.log('✅ קובץ חולק ל-', chunkFiles.length, 'חתיכות');
          resolve(chunkFiles);
        } catch (error) {
          reject(error);
        }
      } else {
        reject(new Error(`FFmpeg failed with code ${code}`));
      }
    });
    
    ffmpegProcess.on('error', reject);
  });
};

// פונקציה להמרת קובץ ל-WAV סטנדרטי
async function convertToStandardWav(inputPath) {
  const outputPath = inputPath.replace(/\.[^/.]+$/, '_standard.wav');
  
  return new Promise((resolve, reject) => {
    const ffmpegArgs = [
      '-i', inputPath,
      '-c:a', 'pcm_s16le',    // 16-bit PCM
      '-ar', '44100',          // 44.1 kHz
      '-ac', '2',              // סטריאו
      '-f', 'wav',             // פורמט WAV
      '-y',                    // דריסת קובץ קיים
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
        // אם נכשל, נחזיר את הקובץ המקורי
        resolve(inputPath);
      }
    });
    
    ffmpegProcess.on('error', (error) => {
      console.error('❌ FFmpeg error בהמרה:', error);
      // אם נכשל, נחזיר את הקובץ המקורי
      resolve(inputPath);
    });
  });
};

// פונקציה לבדיקת מודלים זמינים ב-Demucs
async function checkDemucsModels() {
  return new Promise((resolve, reject) => {
    const demucsCheck = spawn('python', ['-m', 'demucs', '--list-models']);
    
    let output = '';
    let error = '';
    
    demucsCheck.stdout.on('data', (data) => {
      output += data.toString();
    });
    
    demucsCheck.stderr.on('data', (data) => {
      error += data.toString();
    });
    
    demucsCheck.on('close', (code) => {
      if (code === 0) {
        console.log('✅ מודלי Demucs זמינים:', output);
        resolve(output);
      } else {
        console.error('❌ שגיאה בבדיקת מודלי Demucs:', error);
        reject(new Error(`Demucs models check failed: ${error}`));
      }
    });
    
    demucsCheck.on('error', reject);
  });
};

// פונקציה להפרדה עם Demucs עם fallback
async function runDemucsWithFallback(inputPath, outputDir, project) {
  const availableMemory = checkAvailableMemory();
  
  // בחירת מודל לפי זיכרון זמין
  let model = 'htdemucs'; // מודל ברירת מחדל
  let twoStems = 'vocals';
  
  if (availableMemory < 200 * 1024 * 1024) { // פחות מ-200MB
    console.log('⚠️ זיכרון נמוך, משתמש במודל קל יותר');
    model = 'htdemucs_ft';
    twoStems = 'vocals';
  } else if (availableMemory > 1000 * 1024 * 1024) { // יותר מ-1GB
    console.log('✅ זיכרון גבוה, משתמש במודל מלא');
    model = 'htdemucs';
    twoStems = null; // הפרדה מלאה
  }
  
  // המרה ל-WAV סטנדרטי
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
    
    // הוספת פרמטר two-stems רק אם נדרש
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
        'PYTORCH_CUDA_ALLOC_CONF': 'max_split_size_mb:128' // הגבלת זיכרון CUDA
      }
    });
    
    let stdout = '';
    let stderr = '';
    
    demucsProcess.stdout.on('data', (data) => {
      const output = data.toString();
      stdout += output;
      console.log('🎵 Demucs stdout:', output);
      
      // מעקב אחר התקדמות
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
    
    // הגבלת זמן עיבוד ל-20 דקות
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
        
        // ניסיון fallback עם מודל קל יותר
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
};

// Health check endpoint - מעודכן לתמיכה ב-Fly.io ו-Render Load Balancer
app.get('/api/health', (req, res) => {
  // בדיקה אם השרת מוכן
  if (!isReady) {
    return res.status(503).json({ 
      status: 'starting', 
      message: 'Server is starting up'
    });
  }
  
  // תשובה מהירה ופשוטה ל-health checks
  res.status(200).json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    server: 'KR-STUDIO CompleteAI Backend'
  });
});

// Detailed health check endpoint
app.get('/api/health/detailed', (req, res) => {
  // הוספת CORS headers לתשובה
  const origin = req.headers.origin || '*';
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Origin, Accept, Access-Control-Request-Method, Access-Control-Request-Headers, User-Agent, X-Forwarded-For, X-Forwarded-Proto');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Max-Age', '86400');
  
  const response = { 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    server: 'KR-STUDIO CompleteAI Backend',
    version: '1.0.0',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    environment: process.env.NODE_ENV || 'development',
    render: {
      healthCheck: true,
      loadBalancer: 'Render',
      origin: origin
    }
  };
  
  res.status(200).json(response);
});

// בדיקת Demucs
app.get('/api/test-demucs', async (req, res) => {
  try {
    console.log('🔍 ===== בדיקת Demucs =====');
    
    // בדיקה אם Python מותקן
    const pythonCheck = spawn('python', ['--version']);
    let pythonVersion = '';
    
    pythonCheck.stdout.on('data', (data) => {
      pythonVersion = data.toString().trim();
      console.log('🐍 Python version:', pythonVersion);
    });
    
    await new Promise((resolve, reject) => {
      pythonCheck.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error('Python לא מותקן'));
        }
      });
    });
    
    // בדיקה אם Demucs מותקן
    const demucsCheck = spawn('python', ['-m', 'demucs', '--help']);
    let demucsAvailable = false;
    
    demucsCheck.stdout.on('data', (data) => {
      console.log('🎵 Demucs help:', data.toString());
      demucsAvailable = true;
    });
    
    demucsCheck.stderr.on('data', (data) => {
      console.log('❌ Demucs error:', data.toString());
    });
    
    await new Promise((resolve, reject) => {
      demucsCheck.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error('Demucs לא מותקן'));
        }
      });
    });
    
    const response = {
      success: true,
      python: pythonVersion,
      demucs: demucsAvailable ? 'installed' : 'not installed',
      message: 'Demucs זמין לשימוש'
    };
    
    console.log('✅ Demucs check successful:', response);
    res.json(response);
    
  } catch (error) {
    console.error('❌ Demucs check failed:', error);
    
    const response = {
      success: false,
      error: error.message,
      message: 'Demucs לא זמין'
    };
    
    res.status(500).json(response);
  }
});

// Serve React app
app.get('*', (req, res) => {
  console.log('📄 ===== Serving React app =====');
  console.log('📄 Path:', req.path);
  console.log('📄 Headers:', req.headers);
  console.log('📄 File path:', path.join(__dirname, 'dist', 'index.html'));
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('❌ ===== Server error =====');
  console.error('❌ Error:', error);
  console.error('❌ Message:', error.message);
  console.error('❌ Stack:', error.stack);
  console.error('❌ Request URL:', req.url);
  console.error('❌ Request method:', req.method);
  console.error('❌ Request headers:', req.headers);
  
  // הוספת CORS headers לשגיאות
  const origin = req.headers.origin || '*';
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Origin, Accept, Access-Control-Request-Method, Access-Control-Request-Headers, User-Agent, X-Forwarded-For, X-Forwarded-Proto');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  res.status(500).json({ 
    error: 'Internal server error',
    message: error.message,
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  console.log('❌ ===== 404 Not Found =====');
  console.log('❌ URL:', req.url);
  console.log('❌ Method:', req.method);
  console.log('❌ Origin:', req.headers.origin);
  
  // הוספת CORS headers ל-404
  const origin = req.headers.origin || '*';
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Origin, Accept, Access-Control-Request-Method, Access-Control-Request-Headers, User-Agent, X-Forwarded-For, X-Forwarded-Proto');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  res.status(404).json({ 
    error: 'Not found',
    message: `Route ${req.url} not found`,
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 ===== שרת התחיל =====`);
  console.log(`🚀 Port: ${PORT}`);
  console.log(`🚀 Host: 0.0.0.0 (all interfaces)`);
  console.log(`🌐 Server URL: http://localhost:${PORT}`);
  console.log(`🌐 External URL: http://0.0.0.0:${PORT}`);
  console.log(`📁 Uploads directory: ${path.join(__dirname, 'uploads')}`);
  console.log(`🎵 Separated directory: ${path.join(__dirname, 'separated')}`);
  console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`💾 Memory: ${JSON.stringify(process.memoryUsage())}`);
  console.log(`✅ ===== שרת מוכן =====`);
}); 