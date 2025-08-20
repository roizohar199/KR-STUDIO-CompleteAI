// קובץ בדיקה לתכונות החדשות
// Test file for new features

console.log('🧪 בדיקת תכונות חדשות - Testing New Features');

// בדיקת מערכת ניתוח קוד
async function testCodeAnalysis() {
  console.log('\n🔍 בדיקת מערכת ניתוח קוד...');
  
  const testCode = `
function complexFunction(a, b, c) {
  let result = 0;
  for(let i = 0; i < a.length; i++) {
    if(a[i] > 0) {
      for(let j = 0; j < b.length; j++) {
        if(b[j] < 0) {
          result += a[i] * b[j];
        }
      }
    }
  }
  return result;
}
  `;
  
  try {
    // ייבוא דינמי של המודולים
    const { codeAnalyzer } = await import('./src/lib/codeAnalyzer.js');
    const result = await codeAnalyzer.analyzeCode(testCode, 'test.js');
    console.log('✅ ניתוח קוד הושלם:', result.score);
    console.log('📊 בעיות שזוהו:', result.issues.length);
  } catch (error) {
    console.log('❌ שגיאה בניתוח קוד:', error.message);
  }
}

// בדיקת מערכת אופטימיזציה
async function testOptimization() {
  console.log('\n⚡ בדיקת מערכת אופטימיזציה...');
  
  const testCode = `
for(let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
  `;
  
  try {
    const { smartOptimizer } = await import('./src/lib/smartOptimizer.js');
    const optimized = await smartOptimizer.optimizeCode(testCode);
    console.log('✅ אופטימיזציה הושלמה');
    console.log('📈 קוד מקורי:', testCode.length, 'תווים');
    console.log('📈 קוד מאופטם:', optimized.length, 'תווים');
  } catch (error) {
    console.log('❌ שגיאה באופטימיזציה:', error.message);
  }
}

// בדיקת מערכת בדיקות
async function testAutoTesting() {
  console.log('\n🧪 בדיקת מערכת בדיקות אוטומטיות...');
  
  const testCode = `
function add(a, b) {
  return a + b;
}
  `;
  
  try {
    const { autoTester } = await import('./src/lib/autoTester.js');
    const tests = await autoTester.generateTests(testCode, 'math.js');
    console.log('✅ יצירת בדיקות הושלמה');
    console.log('📝 בדיקות יחידה:', tests.unitTests.length);
    console.log('🔗 בדיקות אינטגרציה:', tests.integrationTests.length);
  } catch (error) {
    console.log('❌ שגיאה ביצירת בדיקות:', error.message);
  }
}

// בדיקת מערכת ניטור
async function testPerformanceMonitoring() {
  console.log('\n📊 בדיקת מערכת ניטור ביצועים...');
  
  try {
    const { performanceMonitor } = await import('./src/lib/performanceMonitor.js');
    performanceMonitor.startMonitoring();
    
    // המתנה קצרה לניטור
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const stats = performanceMonitor.getPerformanceStats();
    console.log('✅ ניטור ביצועים הושלם');
    console.log('💾 זיכרון:', stats.memory?.used || 'לא זמין');
    console.log('🖥️ CPU:', stats.cpu?.load || 'לא זמין');
    
    performanceMonitor.stopMonitoring();
  } catch (error) {
    console.log('❌ שגיאה בניטור ביצועים:', error.message);
  }
}

// הרצת כל הבדיקות
async function runAllTests() {
  console.log('🚀 התחלת בדיקת כל התכונות...\n');
  
  await testCodeAnalysis();
  await testOptimization();
  await testAutoTesting();
  await testPerformanceMonitoring();
  
  console.log('\n🎉 כל הבדיקות הושלמו!');
  console.log('💡 עכשיו תוכל להשתמש בממשק המשתמש לבדיקת התכונות');
}

// הרצה אוטומטית אם הקובץ רץ ישירות
if (typeof window === 'undefined') {
  // Node.js environment
  runAllTests().catch(console.error);
} else {
  // Browser environment
  window.testNewFeatures = runAllTests;
  console.log('🌐 הקובץ רץ בדפדפן. השתמש ב-testNewFeatures() לבדיקה');
}
