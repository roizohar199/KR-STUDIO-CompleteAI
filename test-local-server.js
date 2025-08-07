import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:10000';
const WORKER_URL = 'http://localhost:10001';

async function testServer() {
  console.log('🧪 ===== בדיקת שרת מקומי =====');
  
  try {
    // בדיקת health check
    console.log('🔍 בודק health check...');
    const healthResponse = await fetch(`${BASE_URL}/api/health`);
    const healthData = await healthResponse.json();
    
    console.log('✅ Health check status:', healthResponse.status);
    console.log('✅ Health check data:', healthData);
    
    // בדיקת CORS headers
    console.log('🔍 בודק CORS headers...');
    const corsHeaders = healthResponse.headers;
    console.log('✅ CORS headers:', {
      'Access-Control-Allow-Origin': corsHeaders.get('Access-Control-Allow-Origin'),
      'Access-Control-Allow-Methods': corsHeaders.get('Access-Control-Allow-Methods'),
      'Access-Control-Allow-Headers': corsHeaders.get('Access-Control-Allow-Headers'),
      'Access-Control-Max-Age': corsHeaders.get('Access-Control-Max-Age')
    });
    
    // בדיקת worker health
    console.log('🔍 בודק worker health...');
    try {
      const workerHealthResponse = await fetch(`${WORKER_URL}/api/health`);
      const workerHealthData = await workerHealthResponse.json();
      
      console.log('✅ Worker health status:', workerHealthResponse.status);
      console.log('✅ Worker health data:', workerHealthData);
    } catch (workerError) {
      console.log('⚠️ Worker לא זמין:', workerError.message);
    }
    
    // בדיקת OPTIONS request
    console.log('🔍 בודק OPTIONS request...');
    const optionsResponse = await fetch(`${BASE_URL}/api/health`, {
      method: 'OPTIONS',
      headers: {
        'Origin': 'http://localhost:5173',
        'Access-Control-Request-Method': 'GET',
        'Access-Control-Request-Headers': 'Content-Type'
      }
    });
    
    console.log('✅ OPTIONS status:', optionsResponse.status);
    console.log('✅ OPTIONS headers:', {
      'Access-Control-Allow-Origin': optionsResponse.headers.get('Access-Control-Allow-Origin'),
      'Access-Control-Allow-Methods': optionsResponse.headers.get('Access-Control-Allow-Methods'),
      'Access-Control-Allow-Headers': optionsResponse.headers.get('Access-Control-Allow-Headers')
    });
    
    console.log('✅ ===== בדיקה הושלמה בהצלחה =====');
    
  } catch (error) {
    console.error('❌ ===== שגיאה בבדיקה =====');
    console.error('❌ Error:', error.message);
  }
}

// הפעלת הבדיקה
testServer(); 