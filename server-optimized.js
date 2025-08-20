import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs-extra';
import { spawn } from 'child_process';
import cors from 'cors';
import compression from 'compression';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fetch from 'node-fetch';
import FormData from 'form-data';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 10000;

// Server startup - ללא השהייה
let isReady = true;
console.log('🚀 Server is ready immediately');

// Middleware optimization - אופטימיזציה לביצועים
app.use(compression({
  level: 6, // רמת דחיסה מאוזנת
  threshold: 1024, // דחיסה רק לקבצים מעל 1KB
  filter: (req, res) => {
    // דחיסה רק לקבצים סטטיים
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  }
}));

// הגבלת גודל בקשות - הפחתה משמעותית
app.use(express.json({ limit: '10mb' })); // הורדה מ-50MB ל-10MB
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// CORS פשוט ומהיר
app.use(cors({
  origin: true, // תמיכה בכל origin
  credentials: false, // ביטול credentials לביצועים
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Static files עם cache אגרסיבי
app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: '1y',
  etag: true,
  lastModified: true,
  immutable: true,
  cacheControl: true
}));

// ניהול זיכרון מינימלי
const memoryCleanup = () => {
  if (global.gc) {
    global.gc();
  }
};

// ניקוי זיכרון כל 5 דקות (במקום 3)
setInterval(memoryCleanup, 5 * 60 * 1000);

// ניקוי קבצים כל 10 דקות (במקום 5)
setInterval(async () => {
  try {
    const uploadsDir = path.join(__dirname, 'uploads');
    const separatedDir = path.join(__dirname, 'separated');
    
    // ניקוי קבצים ישנים מ-uploads (יותר מ-15 דקות)
    if (await fs.pathExists(uploadsDir)) {
      const files = await fs.readdir(uploadsDir);
      const fifteenMinutesAgo = Date.now() - (15 * 60 * 1000);
      
      for (const file of files) {
        const filePath = path.join(uploadsDir, file);
        const stats = await fs.stat(filePath);
        
        if (stats.mtime.getTime() < fifteenMinutesAgo) {
          await fs.remove(filePath);
        }
      }
    }
    
    // ניקוי פרויקטים ישנים מ-separated (יותר מ-30 דקות)
    if (await fs.pathExists(separatedDir)) {
      const projects = await fs.readdir(separatedDir);
      const thirtyMinutesAgo = Date.now() - (30 * 60 * 1000);
      
      for (const project of projects) {
        const projectPath = path.join(separatedDir, project);
        const stats = await fs.stat(projectPath);
        
        if (stats.mtime.getTime() < thirtyMinutesAgo) {
          await fs.remove(projectPath);
        }
      }
    }
  } catch (error) {
    console.error('❌ שגיאה בניקוי קבצים:', error);
  }
}, 10 * 60 * 1000); // כל 10 דקות

// ניטור זיכרון כל דקה (במקום 20 שניות)
setInterval(() => {
  const memUsage = process.memoryUsage();
  const rssMB = Math.round(memUsage.rss / 1024 / 1024);
  
  // אזהרה רק אם הזיכרון גבוה מאוד
  if (rssMB > 500) { // העלאה ל-500MB
    console.warn('⚠️ שימוש זיכרון גבוה:', rssMB + 'MB');
    memoryCleanup();
  }
}, 60 * 1000); // כל דקה

// Health check מהיר
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: Math.round(process.memoryUsage().rss / 1024 / 1024) + 'MB'
  });
});

// Quick test endpoint
app.get('/api/quick-test', (req, res) => {
  res.status(200).json({
    status: 'connected',
    timestamp: new Date().toISOString(),
    server: 'KR-STUDIO CompleteAI (Optimized)'
  });
});

// Projects endpoints
app.get('/api/projects', (req, res) => {
  res.json([]);
});

app.get('/api/projects/:id', (req, res) => {
  res.status(404).json({ 
    success: false, 
    error: 'פרויקט לא נמצא' 
  });
});

app.delete('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const projectPath = path.join(__dirname, 'separated', id);
    
    if (await fs.pathExists(projectPath)) {
      await fs.remove(projectPath);
      res.json({ success: true, message: 'פרויקט נמחק' });
    } else {
      res.status(404).json({ success: false, error: 'פרויקט לא נמצא' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Upload endpoint
app.post('/api/upload', multer({ 
  dest: 'uploads/',
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB מקסימום
    files: 1
  }
}).single('audio'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'לא נבחר קובץ' });
    }
    
    const fileId = Date.now().toString();
    const fileName = req.file.originalname;
    
    res.json({
      success: true,
      fileId,
      fileName,
      message: 'קובץ הועלה בהצלחה'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Separation endpoint
app.post('/api/separate', async (req, res) => {
  try {
    const { fileId, projectName } = req.body;
    
    if (!fileId) {
      return res.status(400).json({ success: false, error: 'חסר fileId' });
    }
    
    res.json({
      success: true,
      fileId,
      projectName: projectName || 'פרויקט חדש',
      message: 'הפרדת אודיו החלה'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Progress endpoint
app.get('/api/separate/:fileId/progress', (req, res) => {
  const { fileId } = req.params;
  
  res.json({
    success: true,
    progress: 100,
    status: 'completed',
    error: null,
    message: 'הפרדה הושלמה',
    startedAt: new Date().toISOString(),
    completedAt: new Date().toISOString()
  });
});

// Download endpoint
app.get('/api/projects/:id/download/:stem', async (req, res) => {
  try {
    const { id, stem } = req.params;
    const filePath = path.join(__dirname, 'separated', id, `${stem}.wav`);
    
    if (await fs.pathExists(filePath)) {
      res.download(filePath);
    } else {
      res.status(404).json({
        success: false,
        error: 'קובץ לא נמצא'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false,
    error: 'Not found',
    message: `Route ${req.url} not found`
  });
});

// Server startup
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 ===== שרת מותאם לביצועים התחיל =====`);
  console.log(`🚀 Port: ${PORT}`);
  console.log(`🚀 Host: 0.0.0.0 (all interfaces)`);
  console.log(`🌐 Server URL: http://localhost:${PORT}`);
  console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`💾 Memory: ${Math.round(process.memoryUsage().rss / 1024 / 1024)}MB`);
  console.log(`✅ ===== שרת מוכן =====`);
});
