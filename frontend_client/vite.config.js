// This file tells the development server to handle client-side routing properly
import fs from 'fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'spa-fallback',
      configureServer(server) {
        return () => {
          server.middlewares.use((req, res, next) => {
            if (req.url.includes('.')) {
              // Let Vite handle static assets
              return next();
            }
            
            // For all other routes, serve index.html
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(fs.readFileSync(path.resolve(__dirname, 'index.html')));
          });
        };
      },
    },
  ],
  server: {
    port: 5173,
    // This ensures proper handling of client-side routing
    open: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
  },
});
