import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // הגדרת sourcemaps
  build: {
    sourcemap: true, // הפעלת sourcemaps לבילד
    minify: 'terser', // שימוש ב-terser למיניפיקציה
    rollupOptions: {
      output: {
        manualChunks: {
          // הפרדת vendor chunks - רק לקבצים שמותקנים
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react']
          // הסרת lodash ו-date-fns שלא מותקנים
        }
      }
    },
    // הגדרות נוספות לבילד
    target: 'es2015', // תמיכה בדפדפנים ישנים יותר
    outDir: 'dist',
    assetsDir: 'assets',
    // הגדרת chunk size warnings
    chunkSizeWarningLimit: 1000
  },
  
  // הגדרות פיתוח
  server: {
    port: 10000,
    host: true,
    open: true
  },
  
  // הגדרות preview
  preview: {
    port: 10000,
    host: true
  },
  
  // הגדרות אופטימיזציה
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react'],
    exclude: ['@vite/client', '@vite/env']
  },
  
  // הגדרות CSS
  css: {
    devSourcemap: true, // sourcemaps ל-CSS בפיתוח
    postcss: './postcss.config.js'
  },
  
  // הגדרות resolve
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@lib': '/src/lib',
      '@utils': '/src/utils'
    }
  },
  
  // הגדרות define
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
    __PROD__: JSON.stringify(process.env.NODE_ENV === 'production'),
    __VERSION__: JSON.stringify('2.0.0')
  }
}) 