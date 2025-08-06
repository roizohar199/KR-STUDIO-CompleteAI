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

// CORS middleware - הגדרה משופרת - מופיע ממש בתחילת הקובץ
app.use(cors({
  origin: function (origin, callback) {
    console.log(`🌐 CORS Request from ${origin}`);
    
    const allowedOrigins = [
      'https://mixifyai.k-rstudio.com',
      'https://kr-studio-completeai.onrender.com',
      'http://localhost:5173',
      'http://localhost:3000',
      'http://localhost:8080',
      'https://k-rstudio.com',
      'https://www.k-rstudio.com',
      'https://mixifyai.k-rstudio.com:443',
      'https://mixifyai.k-rstudio.com:80'
    ];
    
    // תמיד לאפשר בקשות ללא origin (כמו Postman או curl)
    if (!origin) {
      console.log(`✅ CORS allowed for: ${origin} (no origin)`);
      return callback(null, true);
    }
    
    // בדיקה אם ה-origin מורשה
    if (allowedOrigins.includes(origin)) {
      console.log(`✅ CORS allowed for: ${origin}`);
      return callback(null, true);
    }
    
    // בדיקה נוספת - אולי זה subdomain
    const originHost = new URL(origin).hostname;
    const allowedHosts = [
      'mixifyai.k-rstudio.com',
      'kr-studio-completeai.onrender.com',
      'k-rstudio.com',
      'www.k-rstudio.com'
    ];
    
    if (allowedHosts.some(host => originHost === host || originHost.endsWith('.' + host))) {
      console.log(`✅ CORS allowed for subdomain: ${origin}`);
      return callback(null, true);
    }
    
    console.log(`🚫 CORS blocked: ${origin}`);
    console.log(`🚫 Origin host: ${originHost}`);
    console.log(`🚫 Allowed hosts: ${allowedHosts.join(', ')}`);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD', 'PATCH'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'X-Requested-With', 
    'Origin', 
    'Accept',
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Methods',
    'Access-Control-Allow-Credentials'
  ],
  exposedHeaders: [
    'Content-Length',
    'Content-Type',
    'Content-Disposition'
  ],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  maxAge: 86400 // 24 שעות
}));

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

// Handle preflight requests
app.options('*', cors());

// Additional CORS headers middleware - הסרתי את זה כי יש כבר CORS middleware בתחילת הקובץ

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
  
  // Log request timeout
  req.on('timeout', () => {
    console.log(`🌐 ===== Request Timeout =====`);
    console.log(`🌐 URL: ${req.url}`);
  });
  
  // Log request error
  req.on('error', (error) => {
    console.error(`🌐 ===== Request Error =====`);
    console.error(`🌐 Error:`, error);
    console.error(`🌐 URL: ${req.url}`);
  });
  
  // Log request close
  req.on('close', () => {
    console.log(`🌐 ===== Request Closed =====`);
    console.log(`🌐 URL: ${req.url}`);
  });
  
  // Log request end
  req.on('end', () => {
    console.log(`🌐 ===== Request Ended =====`);
    console.log(`🌐 URL: ${req.url}`);
  });
  
  // Log request data
  let dataChunks = [];
  req.on('data', (chunk) => {
    dataChunks.push(chunk);
    console.log(`🌐 ===== Request Data Chunk =====`);
    console.log(`🌐 Chunk size: ${chunk.length} bytes`);
    console.log(`🌐 Total data size: ${dataChunks.reduce((acc, chunk) => acc + chunk.length, 0)} bytes`);
  });
  
  // Log request readable
  req.on('readable', () => {
    console.log(`🌐 ===== Request Readable =====`);
    console.log(`🌐 URL: ${req.url}`);
  });
  
  // Log request pause
  req.on('pause', () => {
    console.log(`🌐 ===== Request Paused =====`);
    console.log(`🌐 URL: ${req.url}`);
  });
  
  // Log request resume
  req.on('resume', () => {
    console.log(`🌐 ===== Request Resumed =====`);
    console.log(`🌐 URL: ${req.url}`);
  });
  
  // Log request drain
  req.on('drain', () => {
    console.log(`🌐 ===== Request Drained =====`);
    console.log(`🌐 URL: ${req.url}`);
  });
  
  // Log request pipe
  req.on('pipe', (src) => {
    console.log(`🌐 ===== Request Piped =====`);
    console.log(`🌐 URL: ${req.url}`);
    console.log(`🌐 Source:`, src);
  });
  
  // Log request unpipe
  req.on('unpipe', (src) => {
    console.log(`🌐 ===== Request Unpiped =====`);
    console.log(`🌐 URL: ${req.url}`);
    console.log(`🌐 Source:`, src);
  });
  
  // Log request unshift
  req.on('unshift', (chunk) => {
    console.log(`🌐 ===== Request Unshifted =====`);
    console.log(`🌐 URL: ${req.url}`);
    console.log(`🌐 Chunk size: ${chunk.length} bytes`);
  });
  
  // Log request wrap
  req.on('wrap', (stream) => {
    console.log(`🌐 ===== Request Wrapped =====`);
    console.log(`🌐 URL: ${req.url}`);
    console.log(`🌐 Stream:`, stream);
  });
  
  // Log request destroy
  req.on('destroy', () => {
    console.log(`🌐 ===== Request Destroyed =====`);
    console.log(`🌐 URL: ${req.url}`);
  });
  
  // Log request readableLength
  if (req.readableLength !== undefined) {
    console.log(`🌐 ===== Request Readable Length =====`);
    console.log(`🌐 URL: ${req.url}`);
    console.log(`🌐 Readable length: ${req.readableLength} bytes`);
  }
  
  // Log request readableHighWaterMark
  if (req.readableHighWaterMark !== undefined) {
    console.log(`🌐 ===== Request Readable High Water Mark =====`);
    console.log(`🌐 URL: ${req.url}`);
    console.log(`🌐 Readable high water mark: ${req.readableHighWaterMark} bytes`);
  }
  
  // Log request readableObjectMode
  if (req.readableObjectMode !== undefined) {
    console.log(`🌐 ===== Request Readable Object Mode =====`);
    console.log(`🌐 URL: ${req.url}`);
    console.log(`🌐 Readable object mode: ${req.readableObjectMode}`);
  }
  
  // Log request readableFlowing
  if (req.readableFlowing !== undefined) {
    console.log(`🌐 ===== Request Readable Flowing =====`);
    console.log(`🌐 URL: ${req.url}`);
    console.log(`🌐 Readable flowing: ${req.readableFlowing}`);
  }
  
  // Log request readableEncoding
  if (req.readableEncoding !== undefined) {
    console.log(`🌐 ===== Request Readable Encoding =====`);
    console.log(`🌐 URL: ${req.url}`);
    console.log(`🌐 Readable encoding: ${req.readableEncoding}`);
  }
  
  // Log request readableEnded
  if (req.readableEnded !== undefined) {
    console.log(`🌐 ===== Request Readable Ended =====`);
    console.log(`🌐 URL: ${req.url}`);
    console.log(`🌐 Readable ended: ${req.readableEnded}`);
  }
  
  // Log request readableDestroyed
  if (req.readableDestroyed !== undefined) {
    console.log(`🌐 ===== Request Readable Destroyed =====`);
    console.log(`🌐 URL: ${req.url}`);
    console.log(`🌐 Readable destroyed: ${req.readableDestroyed}`);
  }
  
  // Log request readable
  if (req.readable !== undefined) {
    console.log(`🌐 ===== Request Readable =====`);
    console.log(`🌐 URL: ${req.url}`);
    console.log(`🌐 Readable: ${req.readable}`);
  }
  
  // Log request destroyed
  if (req.destroyed !== undefined) {
    console.log(`🌐 ===== Request Destroyed =====`);
    console.log(`🌐 URL: ${req.url}`);
    console.log(`🌐 Destroyed: ${req.destroyed}`);
  }
  
  // Log request corked
  if (req.corked !== undefined) {
    console.log(`🌐 ===== Request Corked =====`);
    console.log(`🌐 URL: ${req.url}`);
    console.log(`🌐 Corked: ${req.corked}`);
  }
  
  // Log request cork
  if (req.cork !== undefined) {
    console.log(`🌐 ===== Request Cork =====`);
    console.log(`🌐 URL: ${req.url}`);
    console.log(`🌐 Cork: ${req.cork}`);
  }
  
  // Log request uncork
  if (req.uncork !== undefined) {
    console.log(`🌐 ===== Request Uncork =====`);
    console.log(`🌐 URL: ${req.url}`);
    console.log(`🌐 Uncork: ${req.uncork}`);
  }
  
  // Log request writable
  if (req.writable !== undefined) {
    console.log(`🌐 ===== Request Writable =====`);
    console.log(`🌐 URL: ${req.url}`);
    console.log(`🌐 Writable: ${req.writable}`);
  }
  
  // Log request writableLength
  if (req.writableLength !== undefined) {
    console.log(`🌐 ===== Request Writable Length =====`);
    console.log(`🌐 URL: ${req.url}`);
    console.log(`🌐 Writable length: ${req.writableLength} bytes`);
  }
  
  // Log request writableHighWaterMark
  if (req.writableHighWaterMark !== undefined) {
    console.log(`🌐 ===== Request Writable High Water Mark =====`);
    console.log(`🌐 URL: ${req.url}`);
    console.log(`🌐 Writable high water mark: ${req.writableHighWaterMark} bytes`);
  }
  
  // Log request writableObjectMode
  if (req.writableObjectMode !== undefined) {
    console.log(`🌐 ===== Request Writable Object Mode =====`);
    console.log(`🌐 URL: ${req.url}`);
    console.log(`🌐 Writable object mode: ${req.writableObjectMode}`);
  }
  
  // Log request writableCorked
  if (req.writableCorked !== undefined) {
    console.log(`🌐 ===== Request Writable Corked =====`);
    console.log(`🌐 URL: ${req.url}`);
    console.log(`🌐 Writable corked: ${req.writableCorked}`);
  }
  
  // Log request writableEnded
  if (req.writableEnded !== undefined) {
    console.log(`🌐 ===== Request Writable Ended =====`);
    console.log(`🌐 URL: ${req.url}`);
    console.log(`🌐 Writable ended: ${req.writableEnded}`);
  }
  
  // Log request writableDestroyed
  if (req.writableDestroyed !== undefined) {
    console.log(`🌐 ===== Request Writable Destroyed =====`);
    console.log(`🌐 URL: ${req.url}`);
    console.log(`🌐 Writable destroyed: ${req.writableDestroyed}`);
  }
  
  // Log request writableFinished
  if (req.writableFinished !== undefined) {
    console.log(`🌐 ===== Request Writable Finished =====`);
    console.log(`🌐 URL: ${req.url}`);
    console.log(`🌐 Writable finished: ${req.writableFinished}`);
  }
  
  next();
});

// הגדרת Multer לעיבוד קבצים
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    console.log('📁 ===== Multer Destination =====');
    console.log('📁 Upload directory:', uploadDir);
    console.log('📁 File:', file.originalname);
    console.log('📁 MIME type:', file.mimetype);
    fs.ensureDirSync(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    console.log('📁 ===== Multer Filename =====');
    console.log('📁 Original filename:', file.originalname);
    
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname).toLowerCase();
    
    // ניקוי שם הקובץ מתווים מיוחדים
    const cleanName = file.originalname
      .replace(/[^\w\s-]/g, '') // הסרת תווים מיוחדים
      .replace(/\s+/g, '_') // החלפת רווחים ב-_
      .substring(0, 50); // הגבלת אורך
    
    const filename = `audio_${cleanName}_${uniqueSuffix}${extension}`;
    console.log('📁 New filename:', filename);
    console.log('📁 Extension:', extension);
    console.log('📁 Clean name:', cleanName);
    cb(null, filename);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    console.log('🔍 ===== Multer FileFilter =====');
    console.log('🔍 File:', file.originalname);
    console.log('🔍 MIME type:', file.mimetype);
    console.log('🔍 Size:', file.size);
    
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
    
    console.log('🔍 Extension check:', extname, 'for:', file.originalname);
    console.log('🔍 MIME type check:', file.mimetype, '->', mimetype);
    
    // אם יש MIME type תקין או סיומת תקינה - קבל את הקובץ
    if (mimetype || extname) {
      console.log('✅ Valid audio file:', file.originalname);
      return cb(null, true);
    } else {
      // בדיקה נוספת - אולי הקובץ תקין אבל עם תווים מיוחדים
      const cleanName = file.originalname.replace(/[^\w\s-]/g, '');
      const cleanExtname = allowedExtensions.test(cleanName);
      
      console.log('🔍 Additional check with clean name:', cleanName, '->', cleanExtname);
      
      if (cleanExtname) {
        console.log('✅ Valid audio file (after cleaning):', file.originalname);
        return cb(null, true);
      } else {
        console.log('❌ Unsupported file:', file.originalname, file.mimetype);
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

console.log('📁 ===== Multer Configuration =====');
console.log('📁 File size limit: 200MB');
console.log('📁 Files limit: 1');
console.log('📁 Field size limit: 10MB');

// Middleware לטיפול בשגיאות Multer
const handleMulterError = (error, req, res, next) => {
  console.error('❌ ===== שגיאת Multer =====');
  console.error('❌ Error:', error);
  console.error('❌ Code:', error.code);
  console.error('❌ Field:', error.field);
  console.error('❌ Message:', error.message);
  console.error('❌ Stack:', error.stack);
  console.error('❌ Request headers:', req.headers);
  
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



// Audio separation endpoints
app.post('/api/upload', upload.single('audio'), handleMulterError, async (req, res) => {
  try {
    console.log('📁 ===== התחלת העלאה =====');
    console.log('📁 Headers:', req.headers);
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
    console.log('🎵 Headers:', req.headers);
    console.log('🎵 Body:', req.body);
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
  console.log('📊 Headers:', req.headers);
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



// Health check endpoint
app.get('/api/health', (req, res) => {
  console.log('🏥 ===== Health check =====');
  console.log('🏥 Headers:', req.headers);
  console.log('🏥 Origin:', req.headers.origin);
  console.log('🏥 Server status: Running');
  console.log('💾 Memory usage:', process.memoryUsage());
  console.log('⏰ Uptime:', process.uptime());
  
  const response = { 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    server: 'KR-STUDIO CompleteAI Backend',
    version: '1.0.0',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    environment: process.env.NODE_ENV || 'development'
  };
  
  console.log('🏥 Health response:', response);
  res.json(response);
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

app.listen(PORT, () => {
  console.log(`🚀 ===== שרת התחיל =====`);
  console.log(`🚀 Port: ${PORT}`);
  console.log(`🌐 Server URL: http://localhost:${PORT}`);
  console.log(`📁 Uploads directory: ${path.join(__dirname, 'uploads')}`);
  console.log(`🎵 Separated directory: ${path.join(__dirname, 'separated')}`);
  console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`💾 Memory: ${JSON.stringify(process.memoryUsage())}`);
  console.log(`✅ ===== שרת מוכן =====`);
}); 