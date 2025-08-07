# בדיקת Demucs ידנית ופתרון בעיות

## בדיקת מודלים זמינים
```bash
python -m demucs --list-models
```

## בדיקה ידנית של Demucs
```bash
# בדיקה בסיסית
python -m demucs --help

# בדיקה עם קובץ קטן
python -m demucs --two-stems=vocals --cpu --float32 test.mp3

# בדיקה עם פרמטרים מלאים
python -m demucs \
  --out ./output \
  --two-stems=vocals \
  --mp3 \
  --mp3-bitrate 192 \
  --cpu \
  --float32 \
  --segment 10 \
  --overlap 0.1 \
  --shifts 0 \
  --split segment \
  --jobs 1 \
  test.mp3
```

## בדיקת זיכרון
```bash
# בדיקת זיכרון זמין
free -h

# בדיקת שימוש בזיכרון בזמן עיבוד
watch -n 1 'ps aux | grep demucs'
```

## המרה ל-WAV סטנדרטי
```bash
# המרה ל-WAV 16-bit, 44.1kHz
ffmpeg -i input.mp3 -c:a pcm_s16le -ar 44100 -ac 2 -f wav output.wav

# בדיקה של הקובץ
ffprobe output.wav
```

## חלוקת קובץ גדול
```bash
# חלוקה לחתיכות של 10 דקות
ffmpeg -i large_file.mp3 -f segment -segment_time 600 -c copy chunk_%03d.mp3
```

## פתרון בעיות נפוצות

### שגיאת OOM (Out of Memory)
1. השתמש במודל קל יותר: `--model htdemucs_ft`
2. השתמש ב-two-stems: `--two-stems=vocals`
3. הגדל את הזיכרון הזמין
4. חלק את הקובץ לחתיכות קטנות

### שגיאת CUDA/GPU
1. כפייה לשימוש ב-CPU: `--cpu`
2. השתמש ב-float32: `--float32`

### שגיאת קובץ לא נתמך
1. המר ל-WAV סטנדרטי
2. בדוק שהקובץ תקין עם ffprobe

## בדיקת ביצועים
```bash
# מדידת זמן עיבוד
time python -m demucs --two-stems=vocals test.mp3

# מדידת זיכרון
python -c "
import psutil
import os
process = psutil.Process(os.getpid())
print(f'Memory usage: {process.memory_info().rss / 1024 / 1024:.2f} MB')
"
```

## הגדרות סביבה מומלצות
```bash
export OMP_NUM_THREADS=1
export MKL_NUM_THREADS=1
export OPENBLAS_NUM_THREADS=1
export VECLIB_MAXIMUM_THREADS=1
export NUMEXPR_NUM_THREADS=1
export PYTORCH_CUDA_ALLOC_CONF=max_split_size_mb:128
```

## בדיקת לוגים
```bash
# בדיקת לוגים של השרת
tail -f /var/log/syslog | grep demucs

# בדיקת לוגים של Node.js
tail -f server.log
```
