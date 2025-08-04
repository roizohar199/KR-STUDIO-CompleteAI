// בדיקת API Key
console.log('🔍 בודק API Key...');

// בדיקה אם ה-API Key מוגדר
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
console.log('API Key קיים:', !!apiKey);
console.log('אורך API Key:', apiKey ? apiKey.length : 0);
console.log('תחילת API Key:', apiKey ? apiKey.substring(0, 10) + '...' : 'לא קיים');

// בדיקת חיבור ל-API
async function testApiConnection() {
  try {
    if (!apiKey) {
      console.log('❌ API Key לא נמצא');
      return;
    }

    console.log('🔗 בודק חיבור ל-OpenAI API...');
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'user', content: 'test' }],
        max_tokens: 5
      })
    });

    console.log('סטטוס תגובה:', response.status);
    console.log('החיבור עובד:', response.ok);
    
    if (response.ok) {
      console.log('✅ API Key תקין והחיבור עובד!');
    } else {
      const errorData = await response.json();
      console.log('❌ שגיאה:', errorData);
    }
  } catch (error) {
    console.log('❌ שגיאה בחיבור:', error.message);
  }
}

testApiConnection(); 