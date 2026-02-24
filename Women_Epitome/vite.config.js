import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Split vendor libraries into a separate cached chunk
    rollupOptions: {
      output: {
        manualChunks: {
          // React core — rarely changes, cached forever
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Lucide icons — large but static
          'vendor-icons': ['lucide-react'],
        },
      },
    },
    // Raise the warning threshold — each lazy page is small on its own
    chunkSizeWarningLimit: 600,
  },
})
