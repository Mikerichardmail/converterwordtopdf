import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/pdf-lib')) {
            return 'pdf-lib'
          }
          if (id.includes('node_modules/pdfjs-dist')) {
            return 'pdfjs'
          }
          if (id.includes('node_modules/mammoth')) {
            return 'mammoth'
          }
          if (id.includes('node_modules/jszip')) {
            return 'jszip'
          }
        }
      }
    }
  },
  optimizeDeps: {
    exclude: ['pdfjs-dist']
  }
})
