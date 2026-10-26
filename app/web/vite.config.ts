import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// In dev, `npm run dev` serves the UI on :4400 and proxies the API to the Node server on :4401.
export default defineConfig({
  plugins: [react()],
  server: { port: 4400, strictPort: true, proxy: { '/api': 'http://127.0.0.1:4401' } },
  build: { chunkSizeWarningLimit: 1500 },
});
