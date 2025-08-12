// בדיקת חיבור Backend
const testBackendConnection = async () => {
  const testUrls = [
    'https://kr-studio-completeai.fly.dev/api/health',
    'https://kr-studio-completeai.fly.dev/',
    'https://kr-studio-completeai.fly.dev'
  ];

  console.log('🔍 בודק חיבור Backend...');

  for (const url of testUrls) {
    try {
      console.log(`\n📡 בודק: ${url}`);
      const response = await fetch(url);
      console.log(`✅ סטטוס: ${response.status} ${response.statusText}`);
      
      if (response.ok) {
        const data = await response.text();
        console.log(`📄 תשובה: ${data.substring(0, 200)}...`);
      }
    } catch (error) {
      console.log(`❌ שגיאה: ${error.message}`);
    }
  }
};

// בדיקת חיבור Frontend
const testFrontendConnection = async () => {
  const urls = [
    'https://mixifyai.k-rstudio.com',
    'https://mixifyai.k-rstudio.com/'
  ];

  console.log('\n🔍 בודק חיבור Frontend...');

  for (const url of urls) {
    try {
      console.log(`\n📡 בודק: ${url}`);
      const response = await fetch(url);
      console.log(`✅ סטטוס: ${response.status} ${response.statusText}`);
      
      if (response.ok) {
        const data = await response.text();
        console.log(`📄 תשובה: ${data.substring(0, 200)}...`);
      }
    } catch (error) {
      console.log(`❌ שגיאה: ${error.message}`);
    }
  }
};

// הרצת הבדיקות
const runTests = async () => {
  console.log('🚀 מתחיל בדיקות חיבור...\n');
  
  await testBackendConnection();
  await testFrontendConnection();
  
  console.log('\n✅ בדיקות הושלמו!');
};

runTests().catch(console.error); 