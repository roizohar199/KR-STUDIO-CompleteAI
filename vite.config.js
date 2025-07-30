import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, // הקטנת הגבול לאזהרות
    rollupOptions: {
      output: {
        // חלוקה ידנית של הקבצים
        manualChunks: {
          // ספריות חיצוניות
          'vendor-react': ['react', 'react-dom'],
          'vendor-ui': ['lucide-react', '@radix-ui/react-dropdown-menu', '@radix-ui/react-select', '@radix-ui/react-slot', '@radix-ui/react-tabs'],
          'vendor-styling': ['clsx', 'class-variance-authority', 'tailwind-merge', 'tailwindcss-animate'],
          
          // ספריות AI ו-ML
          'ai-tensorflow': ['@tensorflow/tfjs', '@tensorflow/tfjs-backend-webgl'],
          'ai-essentia': ['essentia.js'],
          
          // ספריות עזר
          'utils-pdf': ['jspdf', 'html2canvas'],
          
          // רכיבים לפי קטגוריות
          'components-core': [
            './src/components/Dashboard.jsx',
            './src/components/Sidebar.jsx',
            './src/components/LanguageSelector.jsx'
          ],
          'components-analysis': [
            './src/components/VocalAnalysis.jsx',
            './src/components/AdvancedAudioAnalysis.jsx'
          ],
          'components-production': [
            './src/components/ProductionRecommendations.jsx',
            './src/components/ExportVersions.jsx',
            './src/components/SketchCreation.jsx'
          ],
          'components-management': [
            './src/components/SessionManagement.jsx',
            './src/components/MusicDatabase.jsx',
            './src/components/CloudProcessing.jsx'
          ],
          'components-business': [
            './src/components/CreditsContracts.jsx',
            './src/components/UserVerification.jsx'
          ],
          'components-ui': [
            './src/components/ui/button.jsx',
            './src/components/ui/card.jsx',
            './src/components/ui/input.jsx',
            './src/components/ui/select.jsx',
            './src/components/ui/textarea.jsx'
          ]
        },
        // הגדרות נוספות לאופטימיזציה
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/').pop() : 'chunk';
          return `js/[name]-[hash].js`;
        },
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/\.(css)$/.test(assetInfo.name)) {
            return `css/[name]-[hash].${ext}`;
          }
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
            return `images/[name]-[hash].${ext}`;
          }
          return `assets/[name]-[hash].${ext}`;
        }
      }
    },
    // אופטימיזציה נוספת
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false, // שמירה על console.log לדיבאג
        drop_debugger: true
      }
    }
  },
  // אופטימיזציה לפיתוח
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'lucide-react',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-select',
      '@radix-ui/react-slot',
      '@radix-ui/react-tabs'
    ],
    exclude: [
      'essentia.js', // לא לכלול ב-optimizeDeps כי זה WASM
      '@tensorflow/tfjs' // לא לכלול כי זה נטען דינמית
    ]
  }
}) 