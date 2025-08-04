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
          'vendor-ui': ['lucide-react'],
          'vendor-utils': ['@tensorflow/tfjs'],
          'components-production': [
            './src/components/ProductionRecommendations.jsx',
            './src/components/ExportVersions.jsx'
          ],
          'components-management': [
            './src/components/SketchCreation.jsx',
            './src/components/SessionManagement.jsx'
          ],
          'components-advanced': [
            './src/components/CreditsContracts.jsx',
            './src/components/UserVerification.jsx'
          ]
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  optimizeDeps: {
    exclude: [
      '@tensorflow/tfjs' // לא לכלול ב-optimizeDeps כי זה WASM
    ]
  },
  server: {
    port: 5173,
    host: true
  }
}) 