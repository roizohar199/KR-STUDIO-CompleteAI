// בדיקת חיבור לשרת
const API_BASE_URL = 'https://kr-studio-completeai.fly.dev/api';

async function testServerConnection() {
  console.log('🔍 ===== בדיקת חיבור לשרת =====');
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
      projects: projectsData,
      message: 'השרת זמין ועובד כראוי'
    };
    
  } catch (error) {
    console.error('❌ ===== בדיקת חיבור נכשלה =====');
    console.error('❌ שגיאה:', error.message);
    
    return {
      success: false,
      error: error.message,
      message: 'השרת לא זמין או לא מגיב'
    };
  }
}

// הרצת הבדיקה
testServerConnection().then(result => {
  console.log('📊 תוצאות בדיקה:', result);
  
  if (result.success) {
    console.log('✅ השרת עובד כראוי');
  } else {
    console.log('❌ השרת לא עובד:', result.error);
  }
}).catch(error => {
  console.error('❌ שגיאה בבדיקה:', error);
}); 