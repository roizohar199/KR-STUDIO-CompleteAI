// API client משופר עם caching ו-optimization
class AIClient {
  constructor() {
    // קדימות: VITE_API_BASE_URL → אותו דומיין עם /api → localhost לפיתוח
    const viteEnv = import.meta.env.VITE_API_BASE_URL;

    if (viteEnv && typeof viteEnv === 'string' && viteEnv.length > 0) {
      this.baseURL = viteEnv.replace(/\/$/, '');
    } else if (typeof window !== 'undefined' && window.location && window.location.origin) {
      this.baseURL = `${window.location.origin}/api`;
    } else {
      this.baseURL = 'http://localhost:10000/api';
    }
    
    this.cache = new Map();
    this.requestQueue = new Map();
    this.maxRetries = 3;
    this.retryDelay = 1000;
  }

  // Cache management
  getCacheKey(endpoint, params) {
    return `${endpoint}:${JSON.stringify(params)}`;
  }

  getFromCache(key) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < 5 * 60 * 1000) { // 5 דקות
      return cached.data;
    }
    return null;
  }

  setCache(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  // Request deduplication
  async makeRequest(endpoint, options = {}, useCache = true) {
    const cacheKey = this.getCacheKey(endpoint, options);
    
    // בדיקה אם יש בקשה דומה בתהליך
    if (this.requestQueue.has(cacheKey)) {
      return this.requestQueue.get(cacheKey);
    }

    // בדיקת cache
    if (useCache) {
      const cached = this.getFromCache(cacheKey);
      if (cached) {
        console.log('📦 מחזיר מ-cache:', endpoint);
        return cached;
      }
    }

    // יצירת promise חדש
    const requestPromise = this._executeRequest(endpoint, options, cacheKey);
    this.requestQueue.set(cacheKey, requestPromise);
    
    try {
      const result = await requestPromise;
      if (useCache) {
        this.setCache(cacheKey, result);
      }
      return result;
    } finally {
      this.requestQueue.delete(cacheKey);
    }
  }

  async _executeRequest(endpoint, options, cacheKey) {
    let lastError;
    
    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
          method: options.method || 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...options.headers
          },
          ...options
        };

        if (options.body) {
          config.body = JSON.stringify(options.body);
        }

        console.log(`🚀 ניסיון ${attempt}/${this.maxRetries}:`, endpoint);
        
        const response = await fetch(url, config);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(`✅ הצלחה:`, endpoint);
        return data;

      } catch (error) {
        lastError = error;
        console.warn(`⚠️ ניסיון ${attempt} נכשל:`, error.message);
        
        if (attempt < this.maxRetries) {
          await new Promise(resolve => setTimeout(resolve, this.retryDelay * attempt));
        }
      }
    }

    throw new Error(`כל הניסיונות נכשלו: ${lastError.message}`);
  }

  // Audio separation API
  async separateAudio(audioFile, options = {}) {
    const formData = new FormData();
    formData.append('audio', audioFile);
    
    if (options.model) formData.append('model', options.model);
    if (options.stems) formData.append('stems', options.stems);

    return this.makeRequest('/separate', {
      method: 'POST',
      body: formData,
      headers: {} // לא Content-Type כי זה FormData
    }, false); // לא cache עבור הפרדת אודיו
  }

  // Get separation status
  async getSeparationStatus(projectId) {
    return this.makeRequest(`/status/${projectId}`);
  }

  // Get project files
  async getProjectFiles(projectId) {
    return this.makeRequest(`/files/${projectId}`);
  }

  // Production recommendations
  async getProductionRecommendations(audioData) {
    return this.makeRequest('/recommendations', {
      method: 'POST',
      body: audioData
    });
  }

  // Export versions
  async exportVersions(projectId, format = 'wav') {
    return this.makeRequest(`/export/${projectId}`, {
      method: 'POST',
      body: { format }
    }, false);
  }

  // Clear cache
  clearCache() {
    this.cache.clear();
    console.log('🧹 Cache נוקה');
  }

  // Get cache stats
  getCacheStats() {
    const size = this.cache.size;
    const keys = Array.from(this.cache.keys());
    return { size, keys };
  }
}

// יצירת instance יחיד
const aiClient = new AIClient();

export default aiClient; 