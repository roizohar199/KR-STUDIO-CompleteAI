# KR-STUDIO Audio Separation Setup Instructions

## Overview
This setup integrates the audio separation system with the main KR-STUDIO application hosted on Hostinger.

## Files to Upload to Hostinger

### Backend Files
1. `server.js` - Main Node.js server
2. `package.json` - Node.js dependencies
3. `requirements.txt` - Python dependencies
4. `merge_stems.py` - Audio post-processing script

### Frontend Files
1. All files from `dist/` folder (after running `npm run build`)

## Installation Steps on Hostinger

### 1. Install Node.js Dependencies
```bash
npm install
```

### 2. Install Python Dependencies
```bash
pip install -r requirements.txt
```

### 3. Install Demucs
```bash
pip install demucs
```

### 4. Create Required Directories
```bash
mkdir uploads
mkdir separated
```

### 5. Start the Server
```bash
npm start
```

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/upload` - Upload audio file
- `POST /api/separate` - Start audio separation
- `GET /api/separate/:fileId/progress` - Get separation progress
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get specific project
- `DELETE /api/projects/:id` - Delete project
- `GET /api/projects/:id/download/:stemName` - Download stem

## Audio Separation Process

1. **Upload**: User uploads audio file
2. **Separation**: Demucs separates into 6 stems (vocals, drums, bass, guitar, piano, other)
3. **Post-processing**: Piano is merged into "other" to create 5 final stems
4. **Download**: User can download individual stems

## Supported Audio Formats
- MP3
- WAV
- FLAC
- M4A
- AAC

## File Size Limit
- Maximum file size: 100MB

## Troubleshooting

### Common Issues
1. **Port 3001 not available**: Change PORT in server.js
2. **Python not found**: Install Python 3.8+
3. **Demucs installation fails**: Use `pip install demucs --no-deps`
4. **Memory issues**: Reduce file size limit or upgrade hosting plan

### Logs
Check server logs for detailed error messages:
```bash
tail -f server.log
```

## Security Notes
- Ensure upload directory is not publicly accessible
- Implement rate limiting for production use
- Add authentication if needed
- Validate file types on server side 