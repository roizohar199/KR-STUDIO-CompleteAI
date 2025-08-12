// בדיקת Demucs בשרת
const API_BASE_URL = 'https://kr-studio-completeai.fly.dev/api';

async function testDemucs() {
  console.log('🔍 ===== בדיקת Demucs =====');
  
  try {
    // יצירת קובץ אודיו זמני לבדיקה
    const testAudioData = new Uint8Array(1024); // 1KB של נתונים ריקים
    const testFile = new File([testAudioData], 'test.wav', { type: 'audio/wav' });
    
    console.log('📤 מעלה קובץ בדיקה...');
    
    // העלאה
    const formData = new FormData();
    formData.append('audio', testFile);
    
    const uploadResponse = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData
    });
    
    if (!uploadResponse.ok) {
      throw new Error(`Upload failed: ${uploadResponse.status} ${uploadResponse.statusText}`);
    }
    
    const uploadData = await uploadResponse.json();
    console.log('✅ העלאה הצליחה:', uploadData);
    
    // התחלת הפרדה
    console.log('🎵 מתחיל הפרדה...');
    const separateResponse = await fetch(`${API_BASE_URL}/separate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fileId: uploadData.file.id,
        projectName: 'test-demucs'
      })
    });
    
    if (!separateResponse.ok) {
      throw new Error(`Separation failed: ${separateResponse.status} ${separateResponse.statusText}`);
    }
    
    const separateData = await separateResponse.json();
    console.log('✅ הפרדה החלה:', separateData);
    
    // בדיקת התקדמות
    console.log('📊 בודק התקדמות...');
    let attempts = 0;
    const maxAttempts = 10;
    
    while (attempts < maxAttempts) {
      attempts++;
      console.log(`📊 ניסיון ${attempts}/${maxAttempts}...`);
      
      const progressResponse = await fetch(`${API_BASE_URL}/separate/${uploadData.file.id}/progress`);
      
      if (!progressResponse.ok) {
        throw new Error(`Progress check failed: ${progressResponse.status} ${progressResponse.statusText}`);
      }
      
      const progressData = await progressResponse.json();
      console.log('📊 התקדמות:', progressData);
      
      if (progressData.status === 'completed') {
        console.log('✅ הפרדה הושלמה בהצלחה!');
        return { success: true, message: 'Demucs עובד כראוי' };
      }
      
      if (progressData.status === 'failed') {
        throw new Error(`Separation failed: ${progressData.error}`);
      }
      
      // המתנה 5 שניות לפני בדיקה נוספת
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
    
    throw new Error('Timeout - הפרדה לא הושלמה בזמן');
    
  } catch (error) {
    console.error('❌ ===== בדיקת Demucs נכשלה =====');
    console.error('❌ שגיאה:', error.message);
    
    return {
      success: false,
      error: error.message,
      message: 'Demucs לא עובד או לא מותקן'
    };
  }
}

// הרצת הבדיקה
testDemucs().then(result => {
  console.log('📊 תוצאות בדיקת Demucs:', result);
  
  if (result.success) {
    console.log('✅ Demucs עובד כראוי');
  } else {
    console.log('❌ Demucs לא עובד:', result.error);
  }
}).catch(error => {
  console.error('❌ שגיאה בבדיקת Demucs:', error);
}); 