import { defineConfig } from 'vite';
import viteImagemin from 'vite-plugin-imagemin';

export default defineConfig({
  base: '',
  build: {
    outDir: 'dist',
    emptyOutDir: true,

    target: 'esnext',
    minify: false,

    cssCodeSplit: true,
    cssMinify: false,

    rollupOptions: {
      input: {
        main: 'index.html',
      },
      output: {
        entryFileNames: 'script.js',
        chunkFileNames: '[name].js',
        assetFileNames: (assetInfo) => {
          const ext = assetInfo.name?.split('.').pop()

          if (ext && ['woff', 'woff2'].includes(ext)) {
            return 'fonts/[name][extname]'
          }

          if (ext && ['png', 'jpg', 'jpeg', 'svg', 'gif', 'webp', 'avif'].includes(ext)) {
            return 'img/[name][extname]'
          }

          return '[name][extname]'
        },
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'modules'
          }
        }
      }
    }
  },
})
