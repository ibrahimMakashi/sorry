import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const scriptUrl = env.VITE_UMAMI_SCRIPT_URL || process.env.VITE_UMAMI_SCRIPT_URL || 'https://cloud.umami.is/script.js';
  const websiteId = env.VITE_UMAMI_WEBSITE_ID || process.env.VITE_UMAMI_WEBSITE_ID || '';

  const isUmamiConfigured = Boolean(
    websiteId &&
    !websiteId.includes('your_') &&
    websiteId.trim() !== ''
  );

  return {
    plugins: [
      react(),
      {
        name: 'html-umami-transform',
        transformIndexHtml(html) {
          if (isUmamiConfigured) {
            return html
              .replace(/%VITE_UMAMI_SCRIPT_URL%/g, scriptUrl)
              .replace(/%VITE_UMAMI_WEBSITE_ID%/g, websiteId);
          }
          // If variables are missing, remove the script tag cleanly without leaving a broken URL
          return html.replace(
            /\s*<script[^>]*src=["']%VITE_UMAMI_SCRIPT_URL%["'][^>]*><\/script>/gi,
            ''
          );
        }
      }
    ],
    server: {
      host: true,
      port: 3000
    },
    preview: {
      host: true,
      port: 3000
    }
  };
});
