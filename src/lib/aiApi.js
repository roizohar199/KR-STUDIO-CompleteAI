// AI API Service for GPT-4/Claude Integration
// שירות API ל-AI לשילוב GPT-4/Claude

class AIApiService {
  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    this.baseUrl = 'https://api.openai.com/v1/chat/completions';
    this.model = 'gpt-4'; // מודל ראשי
    this.fallbackModel = 'gpt-3.5-turbo'; // מודל גיבוי
    this.maxRetries = 3;
    this.baseDelay = 1000; // 1 שנייה
    
    // Cache מתקדם
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 דקות
    
    // מערכת Queue
    this.requestQueue = [];
    this.isProcessingQueue = false;
    this.queueTimeout = 30000; // 30 שניות
    
    // ניטור מתקדם
    this.metrics = {
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      rateLimitHits: 0,
      averageResponseTime: 0,
      lastRequestTime: 0,
      requestsPerMinute: 0,
      modelUsage: {
        'gpt-4': 0,
        'gpt-3.5-turbo': 0
      }
    };
    
    // Throttling
    this.requestThrottle = {
      maxRequestsPerMinute: 15, // הורדה מ-20 ל-15
      currentRequests: 0,
      lastResetTime: Date.now()
    };
    
    // בדיקת חיבור - רק פעם אחת בטעינה
    this.connectionChecked = false;
    this.connectionCheckInterval = null;
    
    // אוטומטי למודל זול יותר במקרי עומס
    this.autoSwitchToCheaperModel = true;
    this.rateLimitThreshold = 1; // הורדה מ-2 ל-1
    this.currentRateLimitCount = 0;
    this.lastRateLimitTime = 0;
    
    // איפוס אוטומטי של rate limit counter
    this.startRateLimitResetTimer();
  }

  // איפוס אוטומטי של rate limit counter
  startRateLimitResetTimer() {
    setInterval(() => {
      const now = Date.now();
      // איפוס אחרי 5 דקות ללא rate limits
      if (now - this.lastRateLimitTime > 5 * 60 * 1000 && this.currentRateLimitCount > 0) {
        console.log('🔄 איפוס אוטומטי של rate limit counter');
        this.currentRateLimitCount = 0;
        this.logMetric('rate_limit_reset');
      }
    }, 60000); // בדיקה כל דקה
  }

  // ניטור מתקדם
  logMetric(type, details = {}) {
    const timestamp = Date.now();
    
    switch (type) {
      case 'request_start':
        this.metrics.totalRequests++;
        this.metrics.lastRequestTime = timestamp;
        this.requestThrottle.currentRequests++;
        break;
        
      case 'request_success':
        this.metrics.successfulRequests++;
        this.metrics.modelUsage[details.model]++;
        if (details.responseTime) {
          this.metrics.averageResponseTime = 
            (this.metrics.averageResponseTime + details.responseTime) / 2;
        }
        // איפוס rate limit counter אחרי הצלחה
        if (this.currentRateLimitCount > 0) {
          console.log('✅ בקשה הצליחה - איפוס rate limit counter');
          this.currentRateLimitCount = 0;
          this.logMetric('rate_limit_reset');
        }
        break;
        
      case 'request_failed':
        this.metrics.failedRequests++;
        if (details.error?.includes('429')) {
          this.metrics.rateLimitHits++;
          this.currentRateLimitCount++;
          this.lastRateLimitTime = timestamp; // שמירת זמן הגבלת קצב
        }
        break;
        
      case 'rate_limit_reset':
        this.currentRateLimitCount = 0;
        break;
    }
    
    // חישוב בקשות לדקה
    const oneMinuteAgo = timestamp - 60000;
    this.metrics.requestsPerMinute = this.metrics.totalRequests - 
      (this.metrics.totalRequests - this.metrics.successfulRequests - this.metrics.failedRequests);
    
    // Reset throttling כל דקה
    if (timestamp - this.requestThrottle.lastResetTime > 60000) {
      this.requestThrottle.currentRequests = 0;
      this.requestThrottle.lastResetTime = timestamp;
    }
    
    console.log(`📊 Metric [${type}]:`, {
      totalRequests: this.metrics.totalRequests,
      successRate: this.metrics.successfulRequests / this.metrics.totalRequests,
      rateLimitHits: this.metrics.rateLimitHits,
      currentRateLimitCount: this.currentRateLimitCount,
      requestsPerMinute: this.metrics.requestsPerMinute,
      modelUsage: this.metrics.modelUsage
    });
  }

  // בדיקה אם אפשר לבצע בקשה
  canMakeRequest() {
    const now = Date.now();
    
    // Reset throttling כל דקה
    if (now - this.requestThrottle.lastResetTime > 60000) {
      this.requestThrottle.currentRequests = 0;
      this.requestThrottle.lastResetTime = now;
      console.log('🔄 אופס throttling');
    }
    
    // בדיקה אם הגענו למגבלת בקשות
    if (this.requestThrottle.currentRequests >= this.requestThrottle.maxRequestsPerMinute) {
      console.log(`⏳ Throttling: ${this.requestThrottle.currentRequests}/${this.requestThrottle.maxRequestsPerMinute} בקשות בדקה`);
      return false;
    }
    
    // בדיקה אם יש יותר מדי rate limits
    if (this.currentRateLimitCount >= this.rateLimitThreshold) {
      console.log(`⚠️ יותר מדי rate limits (${this.currentRateLimitCount}) - ממתין`);
      return false;
    }
    
    return true;
  }

  // הוספת בקשה לתור
  async addToQueue(requestFn, priority = 'normal') {
    return new Promise((resolve, reject) => {
      const queueItem = {
        id: Date.now() + Math.random(),
        requestFn,
        priority,
        timestamp: Date.now(),
        resolve,
        reject
      };

      // הוספה לפי עדיפות
      if (priority === 'high') {
        this.requestQueue.unshift(queueItem);
      } else {
        this.requestQueue.push(queueItem);
      }

      console.log(`📋 הוספה לתור: ${priority} priority, אורך תור: ${this.requestQueue.length}`);
      
      // התחלת עיבוד התור אם לא רץ
      if (!this.isProcessingQueue) {
        this.processQueue();
      }
    });
  }

  // עיבוד התור
  async processQueue() {
    if (this.isProcessingQueue) {
      return;
    }

    this.isProcessingQueue = true;
    console.log('🔄 מתחיל עיבוד תור...');

    while (this.requestQueue.length > 0) {
      const item = this.requestQueue.shift();
      
      // בדיקת timeout
      if (Date.now() - item.timestamp > this.queueTimeout) {
        console.log('⏰ בקשה פגה - ממשיך לפריט הבא');
        item.reject(new Error('Queue timeout'));
        continue;
      }

      try {
        // בדיקת throttling לפני עיבוד
        if (!this.canMakeRequest()) {
          console.log('⏳ ממתין ל-throttling - מחזיר לתור');
          this.requestQueue.unshift(item);
          await new Promise(resolve => setTimeout(resolve, 5000)); // המתנה 5 שניות
          continue;
        }

        console.log(`🔄 מעבד בקשה ${item.id}...`);
        const result = await item.requestFn();
        item.resolve(result);
        console.log(`✅ בקשה ${item.id} הושלמה בהצלחה`);
        
        // המתנה קצרה בין בקשות
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        console.log(`❌ שגיאה בבקשה ${item.id}:`, error.message);
        
        // אם זו שגיאת rate limit, מחזיר לתור עם עדיפות נמוכה
        if (error.message.includes('429') || error.message.includes('rate limit')) {
          console.log('🔄 מחזיר לתור עקב rate limit...');
          item.priority = 'low';
          this.requestQueue.push(item);
          await new Promise(resolve => setTimeout(resolve, 10000)); // המתנה 10 שניות
        } else {
          item.reject(error);
        }
      }
    }

    this.isProcessingQueue = false;
    console.log('✅ עיבוד תור הושלם');
  }

  // בחירת מודל חכמה
  selectModel() {
    // אם יש rate limits, עובר למודל זול יותר מיד
    if (this.currentRateLimitCount > 0) {
      console.log(`🔄 עובר למודל זול יותר עקב rate limits (${this.currentRateLimitCount})`);
      return this.fallbackModel;
    }
    
    // אם יש יותר מדי בקשות בדקה, עובר למודל זול יותר
    if (this.requestThrottle.currentRequests > this.requestThrottle.maxRequestsPerMinute * 0.7) {
      console.log('🔄 עובר למודל זול יותר עקב עומס בקשות');
      return this.fallbackModel;
    }
    
    // אם יש יותר מדי rate limit hits בסטטיסטיקות
    if (this.metrics.rateLimitHits > 2) {
      console.log('🔄 עובר למודל זול יותר עקב היסטוריית rate limits');
      return this.fallbackModel;
    }
    
    // אם יש יותר מדי שימוש ב-GPT-4
    const gpt4Usage = this.metrics.modelUsage['gpt-4'] || 0;
    const gpt35Usage = this.metrics.modelUsage['gpt-3.5-turbo'] || 0;
    if (gpt4Usage > gpt35Usage * 1.5) {
      console.log('🔄 עובר למודל זול יותר עקב שימוש גבוה ב-GPT-4');
      return this.fallbackModel;
    }
    
    return this.model;
  }

  // retry עם exponential backoff
  async retryWithBackoff(fn, retries = this.maxRetries) {
    const startTime = Date.now();
    
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        this.logMetric('request_start');
        const result = await fn();
        const responseTime = Date.now() - startTime;
        
        this.logMetric('request_success', { 
          responseTime, 
          model: this.model,
          attempt 
        });
        
        return result;
      } catch (error) {
        const responseTime = Date.now() - startTime;
        
        // טיפול מיוחד ב-rate limits
        if (error.message.includes('429') || error.message.includes('rate limit')) {
          this.logMetric('request_failed', { 
            error: error.message, 
            responseTime, 
            attempt,
            isRateLimit: true 
          });
          
          console.log(`🔄 שגיאת rate limit, מנסה שוב בעוד ${this.baseDelay * Math.pow(2, attempt - 1)}ms... (ניסיון ${attempt}/${retries})`);
          
          if (attempt === retries) {
            console.log('❌ נכשלו כל הניסיונות - משתמש במודל גיבוי');
            throw new Error('Rate limit exceeded after all retries');
          }
          
          // המתנה ארוכה יותר ל-rate limits
          await new Promise(resolve => setTimeout(resolve, this.baseDelay * Math.pow(2, attempt - 1) * 2));
        } else {
          this.logMetric('request_failed', { 
            error: error.message, 
            responseTime, 
            attempt 
          });
          
          console.log(`🔄 שגיאה, מנסה שוב בעוד ${this.baseDelay * Math.pow(2, attempt - 1)}ms... (ניסיון ${attempt}/${retries})`);
          
          if (attempt === retries) {
            throw error;
          }
          
          await new Promise(resolve => setTimeout(resolve, this.baseDelay * Math.pow(2, attempt - 1)));
        }
      }
    }
  }

  // יצירת תיאור הערוץ לשליחה ל-AI
  createChannelDescription(analysis) {
    const {
      primaryInstrument,
      confidence,
      features,
      genre,
      mood,
      energy,
      quality,
      recommendations
    } = analysis;

    let description = `ניתוח ערוץ אודיו:\n\n`;
    
    // כלי ראשי
    description += `כלי ראשי: ${primaryInstrument} (ביטחון: ${Math.round(confidence * 100)}%)\n`;
    
    // מאפיינים טכניים
    if (features) {
      description += `\nמאפיינים טכניים:\n`;
      if (features.rms) description += `- עוצמה: ${features.rms.toFixed(3)}\n`;
      if (features.spectralCentroid) description += `- מרכז ספקטרלי: ${features.spectralCentroid.toFixed(1)}Hz\n`;
      if (features.dynamicRange) description += `- טווח דינמי: ${features.dynamicRange.toFixed(1)}dB\n`;
      if (features.tempo) description += `- טמפו: ${features.tempo.toFixed(0)} BPM\n`;
    }
    
    // ז'אנר וסגנון
    if (genre) description += `\nז'אנר: ${genre}\n`;
    if (mood) description += `\nמצב רוח: ${mood}\n`;
    if (energy) description += `\nאנרגיה: ${energy}\n`;
    
    // איכות הקלטה
    if (quality) {
      description += `\nאיכות הקלטה:\n`;
      if (quality.noiseFloor) description += `- רמת רעש: ${quality.noiseFloor.toFixed(1)}dB\n`;
      if (quality.clipping) description += `- קליפינג: ${quality.clipping ? 'כן' : 'לא'}\n`;
      if (quality.phaseIssues) description += `- בעיות פאזה: ${quality.phaseIssues ? 'כן' : 'לא'}\n`;
    }

    return description;
  }

  // יצירת prompt מפורט ל-AI
  createDetailedPrompt(channelDescription, currentRecommendations = {}) {
    return `אתה מומחה למוזיקה וסאונד עם ניסיון של 20 שנה בעיבוד אודיו. 

${channelDescription}

תבסס על הניתוח הזה, אנא צור המלצות מפורטות לפלאגינים והגדרות:

**דרישות:**
1. התמקד בפלאגינים מקצועיים (Waves, FabFilter, Soundtoys, Valhalla, etc.)
2. תן הגדרות ספציפיות לכל פלאגין
3. הסבר את הסיבה לכל המלצה
4. אם זה ווקאל - אל תזהה בס בשום פנים ואופן
5. התמקד בפלאגינים הכי מתאימים לכלי הראשי

**פורמט תשובה (JSON):**
{
  "eq": [
    {
      "name": "שם הפלאגין",
      "reason": "סיבה מפורטת",
      "settings": {
        "הגדרה1": "ערך1",
        "הגדרה2": "ערך2"
      }
    }
  ],
  "compression": [...],
  "reverb": [...],
  "delay": [...],
  "saturation": [...],
  "additional": [...],
  "summary": "סיכום קצר של הגישה הכללית"
}

**המלצות קיימות (אם יש):**
${JSON.stringify(currentRecommendations, null, 2)}

אנא צור המלצות חדשות ומשופרות בהתבסס על הניתוח.`;
  }

  // קריאה ל-OpenAI עם queue ו-throttling
  async callOpenAI(prompt, useFallbackModel = false) {
    return this.addToQueue(async () => {
      return this.retryWithBackoff(async () => {
        if (!this.apiKey) {
          throw new Error('API Key לא מוגדר');
        }
        
        if (!this.canMakeRequest()) {
          throw new Error('Throttling: יותר מדי בקשות');
        }
        
        const modelToUse = useFallbackModel ? this.fallbackModel : this.selectModel();
        console.log(`🤖 משתמש במודל: ${modelToUse}`);
        
        const response = await fetch(this.baseUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          },
          body: JSON.stringify({
            model: modelToUse,
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 1000,
            temperature: 0.7
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
      });
    });
  }

  // איפוס ידני של rate limits
  resetRateLimits() {
    console.log('🔄 איפוס ידני של rate limits');
    this.currentRateLimitCount = 0;
    this.lastRateLimitTime = 0;
    this.metrics.rateLimitHits = 0;
    this.logMetric('rate_limit_reset');
  }

  // ניתוח התשובה מ-JSON
  parseAIResponse(responseText) {
    try {
      // חיפוש JSON בתשובה
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('לא נמצא JSON בתשובה');
      }

      const parsed = JSON.parse(jsonMatch[0]);
      
      // וידוא שיש את כל הקטגוריות הנדרשות
      const requiredCategories = ['eq', 'compression', 'reverb', 'delay', 'saturation', 'additional'];
      const result = {};
      
      requiredCategories.forEach(category => {
        result[category] = Array.isArray(parsed[category]) ? parsed[category] : [];
      });
      
      result.summary = parsed.summary || 'המלצות AI נוצרו בהצלחה';
      
      return result;
    } catch (error) {
      console.error('❌ שגיאה בניתוח תשובת AI:', error);
      console.log('📄 תשובה מלאה:', responseText);
      
      // נסיגה להמלצות ברירת מחדל
      return this.getFallbackRecommendations();
    }
  }

  // המלצות ברירת מחדל במקרה של שגיאה
  getFallbackRecommendations() {
    console.log('🔄 משתמש בהמלצות ברירת מחדל');
    return {
      eq: [
        {
          name: 'FabFilter Pro-Q3',
          reason: 'איקיו מדויק לכלי הנגינה',
          settings: { 'High Pass': '80Hz', 'Presence': '+3dB' }
        }
      ],
      compression: [
        {
          name: 'Waves CLA-2A',
          reason: 'קומפרסור אנלוגי',
          settings: { Attack: '10ms', Release: '100ms', Ratio: '3:1' }
        }
      ],
      reverb: [
        {
          name: 'Valhalla Room',
          reason: 'ריברב טבעי',
          settings: { Size: 'Medium', Decay: '1.5s', Mix: '15%' }
        }
      ],
      delay: [
        {
          name: 'Soundtoys EchoBoy',
          reason: 'דיליי אנלוגי',
          settings: { Time: '1/4', Feedback: '30%', Mix: '20%' }
        }
      ],
      saturation: [
        {
          name: 'Soundtoys Decapitator',
          reason: 'סאטורציה חמה',
          settings: { Drive: '2dB', Style: 'A', Mix: '20%' }
        }
      ],
      additional: [],
      summary: 'המלצות ברירת מחדל (AI לא זמין)'
    };
  }

  // יצירת מפתח cache
  createCacheKey(analysis) {
    const key = JSON.stringify({
      primaryInstrument: analysis.primaryInstrument,
      confidence: Math.round(analysis.confidence * 10),
      genre: analysis.genre,
      mood: analysis.mood,
      energy: analysis.energy
    });
    const cacheKey = btoa(key).substring(0, 20); // מפתח קצר
    console.log('🔑 יצירת cache key:', cacheKey);
    return cacheKey;
  }

  // בדיקה אם יש cache
  getFromCache(cacheKey) {
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      console.log('📋 משתמש ב-cache עבור המלצות AI');
      return cached.data;
    }
    return null;
  }

  // שמירה ב-cache
  setCache(cacheKey, data) {
    this.cache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });
    console.log('💾 שמור ב-cache:', cacheKey);
  }

  // פונקציה ראשית לקבלת המלצות AI עם cache ו-queue
  async getAIRecommendations(analysis, currentRecommendations = {}) {
    try {
      // בדיקת cache
      const cacheKey = this.createCacheKey(analysis);
      console.log('🔍 בודק cache עבור ניתוח דומה...');
      const cachedResult = this.getFromCache(cacheKey);
      if (cachedResult) {
        return {
          success: true,
          recommendations: cachedResult,
          fromCache: true
        };
      } else {
        console.log('❌ לא נמצא ב-cache, שולח בקשה חדשה');
      }

      console.log('🚀 שולח בקשה ל-AI...');
      
      const channelDescription = this.createChannelDescription(analysis);
      const prompt = this.createDetailedPrompt(channelDescription, currentRecommendations);
      
      console.log('📊 תיאור הערוץ:', channelDescription);
      
      // ניסיון עם המודל הראשי
      let aiResponse;
      let usedFallbackModel = false;
      try {
        aiResponse = await this.callOpenAI(prompt, false);
        console.log('✅ תשובת AI (GPT-4):', aiResponse);
      } catch (error) {
        console.log('⚠️ שגיאה עם GPT-4, מנסה עם GPT-3.5:', error.message);
        // ניסיון עם מודל הגיבוי
        aiResponse = await this.callOpenAI(prompt, true);
        usedFallbackModel = true;
        console.log('✅ תשובת AI (GPT-3.5):', aiResponse);
      }
      
      const recommendations = this.parseAIResponse(aiResponse);
      
      console.log('🎯 המלצות AI מעובדות:', recommendations);
      
      // שמירה ב-cache
      console.log('💾 שומר תוצאות ב-cache...');
      this.setCache(cacheKey, recommendations);
      
      console.log('✅ המלצות AI נוצרו בהצלחה');
      return {
        success: true,
        recommendations,
        aiResponse: aiResponse.substring(0, 500) + '...', // לבדיקה
        usedFallbackModel
      };
    } catch (error) {
      console.error('❌ שגיאה בקבלת המלצות AI:', error);
      console.log('🔄 משתמש בהמלצות מקומיות כתחליף');
      
      return {
        success: false,
        error: error.message,
        recommendations: this.getFallbackRecommendations()
      };
    }
  }

  // בדיקה אם API זמין - רק פעם אחת בטעינה
  async testApiConnection() {
    // אם כבר בדקנו, לא נבדוק שוב
    if (this.connectionChecked) {
      return { available: this.connectionChecked, cached: true };
    }

    try {
      if (!this.apiKey) {
        console.log('⚠️ API Key לא נמצא בבדיקה');
        this.connectionChecked = true;
        return { available: false, error: 'API Key לא נמצא' };
      }

      // בדיקת פורמט API Key במקום קריאה אמיתית
      if (this.apiKey.length < 20 || !this.apiKey.startsWith('sk-')) {
        console.log('⚠️ API Key לא תקין');
        this.connectionChecked = true;
        return { available: false, error: 'API Key לא תקין' };
      }

      console.log('✅ API Key תקין - המערכת מוכנה לשימוש');
      console.log('💡 בדיקת חיבור אמיתית תתבצע רק בעת הצורך');
      this.connectionChecked = true;
      return { available: true, message: 'API Key תקין - בדיקה אמיתית תתבצע בעת הצורך' };
      
    } catch (error) {
      console.log('❌ שגיאה בבדיקת API:', error.message);
      this.connectionChecked = true;
      return { available: false, error: error.message };
    }
  }

  // קבלת סטטיסטיקות
  getMetrics() {
    return {
      ...this.metrics,
      queueLength: this.requestQueue.length,
      isProcessingQueue: this.isProcessingQueue,
      canMakeRequest: this.canMakeRequest(),
      currentRateLimitCount: this.currentRateLimitCount
    };
  }

  // איפוס סטטיסטיקות
  resetMetrics() {
    this.metrics = {
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      rateLimitHits: 0,
      averageResponseTime: 0,
      lastRequestTime: 0,
      requestsPerMinute: 0,
      modelUsage: {
        'gpt-4': 0,
        'gpt-3.5-turbo': 0
      }
    };
    this.currentRateLimitCount = 0;
    console.log('🔄 אופס סטטיסטיקות');
  }

  // ניקוי cache ישן
  cleanupCache() {
    const now = Date.now();
    let cleanedCount = 0;
    
    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp > this.cacheTimeout) {
        this.cache.delete(key);
        cleanedCount++;
      }
    }
    
    if (cleanedCount > 0) {
      console.log(`🧹 נוקה ${cleanedCount} פריטים מ-cache`);
    }
  }
}

export default AIApiService; 