import react from '@vitejs/plugin-react-swc';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
    visualizer({
      template: 'sunburst',
      brotliSize: true,
      gzipSize: true,
      filename: 'dist/stats.html',
    }),
  ],
  server: {
    open: '/',
  },
});
