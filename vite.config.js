import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // We converted the object to a function to satisfy the builder
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Check for GSAP specifically
            if (id.includes('gsap')) {
              return 'gsap';
            }
            // Check for React core libraries
            if (
              id.includes('react') || 
              id.includes('react-dom') || 
              id.includes('react-router-dom')
            ) {
              return 'vendor';
            }
            // Fallback for other node_modules
            return 'libs';
          }
        }
      }
    }
  }
})