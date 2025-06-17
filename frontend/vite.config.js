import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()], 
  build: {
    outDir: "/var/www/front",
    sourcemap: true,
    cssMinify: true,
    minify: 'terser',
    rollupOptions: {
        output: {
            manualChunks(id) {
                if (id.includes('node_modules')) {
                    return id.toString().split('node_modules/')[1].split('/')[1].toString();
                }
            },
        },
    },
    terserOptions: {
        compress: {
            drop_console: true,
            drop_debugger: true,
        },
        format: {
            comments: false,
        },
    },
  }
})
