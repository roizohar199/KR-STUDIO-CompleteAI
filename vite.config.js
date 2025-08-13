import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-ui': ['lucide-react', '@radix-ui/react-dropdown-menu', '@radix-ui/react-select', '@radix-ui/react-slot', '@radix-ui/react-tabs'],
          'vendor-utils': ['@tensorflow/tfjs', '@tensorflow/tfjs-backend-webgl'],
          'vendor-forms': ['class-variance-authority', 'clsx', 'tailwind-merge'],
          'components-core': [
            './src/components/Dashboard.jsx',
            './src/components/Sidebar.jsx',
            './src/components/AudioPlayer.jsx'
          ],
          'components-audio': [
            './src/components/AudioSeparation.jsx',
            './src/components/UploadZone.jsx',
            './src/components/ProcessingStatus.jsx'
          ],
          'components-advanced': [
            './src/components/ProductionRecommendations.jsx',
            './src/components/ExportVersions.jsx',
            './src/components/SketchCreation.jsx'
          ]
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'lucide-react',
      'class-variance-authority',
      'clsx',
      'tailwind-merge'
    ],
    exclude: [
      '@tensorflow/tfjs',
      '@tensorflow/tfjs-backend-webgl'
    ]
  },
  server: {
    port: 5173,
    host: true
  },
  preview: {
    port: 4173,
    host: true
  }
}) 