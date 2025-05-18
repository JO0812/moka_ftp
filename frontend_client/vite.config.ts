import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

// Get directory name in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'spa-fallback',
      configureServer(server) {
        return () => {
          server.middlewares.use((req: any, res: any, next: () => void) => {
            if (req.url && req.url.includes('.')) {
              // Let Vite handle static assets
              return next();
            }
            
            // For all other routes, serve index.html for SPA client-side routing
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(fs.readFileSync(path.resolve(__dirname, 'index.html')));
          });
        };
      },
    },
  ],
  server: {
    port: 5173,
    open: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // For proper SPA behavior with client-side routing
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
  },
})
    