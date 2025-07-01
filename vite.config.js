import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Add these Netlify-specific optimizations:
  build: {
    outDir: 'dist', // Explicitly set output directory (default is 'dist')
    emptyOutDir: true, // Clear the directory before building
  },
  // For better SPA routing support
  base: '/', // Set base path (important if deploying to subdirectory)
  server: {
    historyApiFallback: true, // Helps with routing during development
  },
  preview: {
    historyApiFallback: true, // Helps with routing in preview mode
  }
})