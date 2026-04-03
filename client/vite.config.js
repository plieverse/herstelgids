import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'HerstelGids',
        short_name: 'HerstelGids',
        lang: 'nl',
        description: 'Uw persoonlijke gids voor herstel na een maag- of slokdarmoperatie',
        theme_color: '#4f7c6e',
        background_color: '#fafaf8',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /\/api\/articles/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'articles-cache',
              expiration: { maxAgeSeconds: 7 * 24 * 60 * 60 },
            },
          },
        ],
      },
    }),
  ],
  server: {
    port: parseInt(process.env.PORT || '5173'),
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
});
