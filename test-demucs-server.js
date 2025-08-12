// בדיקת Demucs בשרת
const API_BASE_URL = 'https://kr-studio-completeai.fly.dev/api';

async function testDemucsServer() {
  console.log('🔍 ===== בדיקת Demucs בשרת =====');
  
  try {
    // בדיקת Demucs
    console.log('🎵 בודק Demucs...');
    const demucsResponse = await fetch(`${API_BASE_URL}/test-demucs`);
    
    if (!demucsResponse.ok) {
      throw new Error(`Demucs check failed: ${demucsResponse.status} ${demucsResponse.statusText}`);
    }
    
    const demucsData = await demucsResponse.json();
    console.log('✅ בדיקת Demucs:', demucsData);
    
    if (!demucsData.success) {
      throw new Error(`Demucs לא זמין: ${demucsData.error}`);
    }
    
    console.log('✅ Demucs זמין בשרת');
    console.log('🐍 Python version:', demucsData.python);
    console.log('🎵 Demucs status:', demucsData.demucs);
    
    return {
      success: true,
      demucs: demucsData,
      message: 'Demucs זמין בשרת'
    };
    
  } catch (error) {
    console.error('❌ ===== בדיקת Demucs נכשלה =====');
    console.error('❌ שגיאה:', error.message);
    
    return {
      success: false,
      error: error.message,
      message: 'Demucs לא זמין בשרת'
    };
  }
}

// הרצת הבדיקה
testDemucsServer().then(result => {
  console.log('📊 תוצאות בדיקת Demucs:', result);
  
  if (result.success) {
    console.log('✅ Demucs זמין בשרת');
  } else {
    console.log('❌ Demucs לא זמין:', result.error);
  }
}).catch(error => {
  console.error('❌ שגיאה בבדיקת Demucs:', error);
}); 