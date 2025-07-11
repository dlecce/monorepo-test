import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'bundle-stats.html',
      gzipSize: true
    })
  ],
  build: {
    rollupOptions: {
      input: {
        'diff-view': resolve(__dirname, 'src/components/diff-view.ts'),
        'hex-color-picker': resolve(__dirname, 'src/components/hex-color-picker.ts'),
      },
      output: {
        entryFileNames: 'components/[name].js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        format: 'es'
      }
    },
    target: 'esnext',
    outDir: 'dist',
    emptyOutDir: true,
    lib: false
  },
  resolve: {
    alias: {
      '@git-diff-view/lowlight': resolve(__dirname, 'src/utils/lowlight/index.ts')
    }
  }
});