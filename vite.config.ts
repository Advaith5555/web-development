import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [],
      manifest: {
        name: 'Alex Johnson Portfolio',
        short_name: 'Portfolio',
        theme_color: '#111827',
        background_color: '#111827',
        display: 'standalone',
        icons: []
      }
    })
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
