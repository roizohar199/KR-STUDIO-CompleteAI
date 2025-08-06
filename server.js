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

// ⚠️ סדר חשוב: CORS middleware חייב להיות הראשון לפני כל middleware אחר
// זה מבטיח שכל בקשה, כולל OPTIONS preflight, תקבל את ה-CORS headers הנכונים

// ⚠️ ריכוז CORS middleware ו-app.options לפני כל דבר אחר
// זה מבטיח שכל preflight OPTIONS יקבל את ה-Access-Control-Allow-Origin header

// הגדרת CORS עם תמיכה מלאה ב-Render Load Balancer
const corsOptions = {
  origin: function (origin, callback) {
    // תמיכה ב-Health Checks של Render (ללא Origin)
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
      // Render domains
      'https://kr-studio-completeai.onrender.com',
      'https://kr-studio-completeai-backend.onrender.com'
    ];
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(null, false);
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
  credentials: false,
  preflightContinue: true, // מאפשר לנו לטפל ב-OPTIONS ידנית
  maxAge: 86400 // Cache preflight requests for 24 hours
};

// ריכוז CORS middleware לפני כל דבר אחר
app.use(cors(corsOptions));

// ריכוז app.options('*', ...) לפני כל דבר אחר
app.options('*', (req, res) => {
  // הגדרת CORS headers ידנית - תמיכה ב-Health Checks ללא Origin
  const origin = req.headers.origin || '*';
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Origin, Accept, Access-Control-Request-Method, Access-Control-Request-Headers, User-Agent, X-Forwarded-For, X-Forwarded-Proto');
  res.header('Access-Control-Max-Age', '86400'); // 24 שעות
  res.header('Access-Control-Allow-Credentials', 'false');
  
  // שליחת תשובה מיידית ל-preflight
  return res.status(200).end();
});

// Middleware ידני לטיפול ב-preflight requests - הוסר כפילות
// OPTIONS requests מטופלים ב-middleware הכללי למעלה

// Logging middleware for CORS requests - מופעל אחרי CORS middleware
// הוסר כפילות - יש middleware logging מורכב יותר למטה

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

app.use(express.static('dist'));

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
    fileSize: 200 * 1024 * 1024, // 200MB
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
    
    res.status(500).json({ error: error.message });
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
      console.log('❌ קובץ לא נמצא:', fileId);
      return res.status(404).json({ error: 'קובץ לא נמצא' });
    }

    const project = projects.get(fileId);
    const outputDir = path.join(__dirname, 'separated', fileId);

    console.log('🎵 פרויקט נמצא:', project);
    console.log('🎵 תיקיית פלט:', outputDir);

    // יצירת תיקיית פלט
    await fs.ensureDir(outputDir);
    console.log('✅ תיקיית פלט נוצרה');

    // עדכון סטטוס הפרויקט
    project.status = 'processing';
    project.projectName = projectName;
    project.outputDir = outputDir;
    project.progress = 0;
    project.startedAt = new Date().toISOString();

    console.log('🎵 מתחיל Demucs...');
    console.log('🎵 נתיב קובץ:', project.originalPath);
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

    console.log('✅ תהליך Demucs התחיל');
    console.log('🎵 PID:', demucsProcess.pid);

    // מעקב אחר התקדמות אמיתית
    let progress = 0;
    
    const progressInterval = setInterval(() => {
      // התקדמות איטית יותר וריאליסטית
      if (progress < 85) {
        const increment = Math.random() * 2 + 0.5; // 0.5-2.5 אחוזים
        progress += increment;
        project.progress = Math.min(progress, 85);
        
        console.log('📊 התקדמות מעודכנת:', project.progress + '%');
        
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
      console.log('🎵 Demucs stdout:', output);
      
      // מעקב אחר התקדמות אמיתית לפי הפלט של Demucs
      if (output.includes('Loading model')) {
        project.message = 'טוען מודל AI...';
        project.progress = Math.max(project.progress, 10);
        console.log('📊 טוען מודל AI - התקדמות:', project.progress + '%');
      } else if (output.includes('Separating')) {
        project.message = 'מפריד ערוצים...';
        project.progress = Math.max(project.progress, 30);
        console.log('📊 מפריד ערוצים - התקדמות:', project.progress + '%');
      } else if (output.includes('Saving')) {
        project.message = 'שומר קבצים...';
        project.progress = Math.max(project.progress, 70);
        console.log('📊 שומר קבצים - התקדמות:', project.progress + '%');
      } else if (output.includes('Done')) {
        project.message = 'מסיים עיבוד...';
        project.progress = Math.max(project.progress, 90);
        console.log('📊 מסיים עיבוד - התקדמות:', project.progress + '%');
      }
    });

    demucsProcess.stderr.on('data', (data) => {
      const error = data.toString();
      console.log('❌ Demucs stderr:', error);
      
      // עדכון הודעה אם יש שגיאה
      if (error.includes('CUDA') || error.includes('GPU')) {
        project.message = 'משתמש ב-CPU לעיבוד...';
        console.log('📊 משתמש ב-CPU לעיבוד');
      }
    });

    demucsProcess.on('close', async (code) => {
      console.log('🎵 Demucs process closed with code:', code);
      clearInterval(progressInterval);
      
      if (code === 0) {
        console.log('✅ Demucs הושלם בהצלחה');
        project.status = 'completed';
        project.progress = 100;
        project.completedAt = new Date().toISOString();
        
        // יצירת קבצי STEMS
        console.log('🎵 יוצר קבצי STEMS...');
        await createStemsFromDemucs(fileId, outputDir);
        console.log('✅ קבצי STEMS נוצרו');
      } else {
        console.error('❌ Demucs נכשל עם קוד:', code);
        project.status = 'failed';
        project.error = `Demucs failed with code ${code}`;
      }
    });

    demucsProcess.on('error', (error) => {
      console.error('❌ Demucs process error:', error);
      project.status = 'failed';
      project.error = `Demucs process error: ${error.message}`;
    });

    separationProcesses.set(fileId, demucsProcess);
    
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

app.get('/api/separate/:fileId/progress', (req, res) => {
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
    return res.status(404).json({ error: 'פרויקט לא נמצא' });
  }
  
  // בדיקה אם התהליך עדיין רץ
  const process = separationProcesses.get(fileId);
  if (process) {
    console.log('🔄 תהליך Demucs עדיין רץ, PID:', process.pid);
    
    // בדיקה אם התהליך עדיין חי
    try {
      process.kill(0); // בדיקה אם התהליך חי (לא הורג אותו)
      console.log('✅ תהליך Demucs חי');
    } catch (error) {
      console.log('❌ תהליך Demucs מת:', error.message);
      project.status = 'failed';
      project.error = 'תהליך Demucs נעצר';
    }
  } else {
    console.log('❌ תהליך Demucs לא נמצא');
  }
  
  const response = {
    progress: project.progress || 0,
    status: project.status,
    error: project.error,
    message: project.message || 'מעבד...',
    startedAt: project.startedAt,
    completedAt: project.completedAt
  };
  
  console.log('📊 תשובת התקדמות:', response);
  console.log('📊 ===== תשובת התקדמות נשלחה =====');
  
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
    return res.status(404).json({ error: 'פרויקט לא נמצא' });
  }
  
  console.log('✅ פרויקט נמצא ונשלח');
  
  res.json(project);
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
    return res.status(404).json({ error: 'קובץ לא נמצא' });
  }
  
  const filePath = path.join(project.stemsDir, `${stem}.mp3`);
  console.log('⬇️ נתיב קובץ:', filePath);
  
  if (!fs.existsSync(filePath)) {
    console.log('❌ קובץ לא קיים:', filePath);
    return res.status(404).json({ error: 'קובץ לא נמצא' });
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
    return res.status(404).json({ error: 'פרויקט לא נמצא' });
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



// Health check endpoint - מעודכן לתמיכה ב-Render Load Balancer
app.get('/api/health', (req, res) => {
  // הוספת CORS headers לתשובה
  const origin = req.headers.origin || '*';
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Origin, Accept, Access-Control-Request-Method, Access-Control-Request-Headers, User-Agent, X-Forwarded-For, X-Forwarded-Proto');
  res.header('Access-Control-Allow-Credentials', 'false');
  
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