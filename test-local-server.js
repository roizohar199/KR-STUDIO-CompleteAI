// בדיקת השרת המקומי
const API_BASE_URL = 'http://localhost:10000/api';

async function testLocalServer() {
  console.log('🔍 ===== בדיקת שרת מקומי =====');
  console.log('🔍 URL:', API_BASE_URL);
  
  try {
    // בדיקה ראשונית - health check
    console.log('🏥 בודק health check...');
    const healthResponse = await fetch(`${API_BASE_URL}/health`);
    
    if (!healthResponse.ok) {
      throw new Error(`Health check failed: ${healthResponse.status} ${healthResponse.statusText}`);
    }
    
    const healthData = await healthResponse.json();
    console.log('✅ Health check הצליח:', healthData);
    
    // בדיקת Demucs
    console.log('🎵 בודק Demucs...');
    const demucsResponse = await fetch(`${API_BASE_URL}/test-demucs`);
    
    if (!demucsResponse.ok) {
      throw new Error(`Demucs check failed: ${demucsResponse.status} ${demucsResponse.statusText}`);
    }
    
    const demucsData = await demucsResponse.json();
    console.log('✅ בדיקת Demucs:', demucsData);
    
    // בדיקת פרויקטים
    console.log('📋 בודק קבלת פרויקטים...');
    const projectsResponse = await fetch(`${API_BASE_URL}/projects`);
    
    if (!projectsResponse.ok) {
      throw new Error(`Projects check failed: ${projectsResponse.status} ${projectsResponse.statusText}`);
    }
    
    const projectsData = await projectsResponse.json();
    console.log('✅ קבלת פרויקטים הצליחה:', projectsData);
    
    console.log('✅ ===== כל הבדיקות הצליחו =====');
    return {
      success: true,
      health: healthData,
      demucs: demucsData,
      projects: projectsData,
      message: 'השרת המקומי עובד כראוי'
    };
    
  } catch (error) {
    console.error('❌ ===== בדיקת שרת מקומי נכשלה =====');
    console.error('❌ שגיאה:', error.message);
    
    return {
      success: false,
      error: error.message,
      message: 'השרת המקומי לא זמין או לא מגיב'
    };
  }
}

// הרצת הבדיקה
testLocalServer().then(result => {
  console.log('📊 תוצאות בדיקה:', result);
  
  if (result.success) {
    console.log('✅ השרת המקומי עובד כראוי');
  } else {
    console.log('❌ השרת המקומי לא עובד:', result.error);
  }
}).catch(error => {
  console.error('❌ שגיאה בבדיקה:', error);
}); 