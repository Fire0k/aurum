import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,

    target: 'esnext',
    minify: 'esbuild',

    cssCodeSplit: true,

    rollupOptions: {
      input: {
        main: 'index.html',
        uiKit: 'ui-kit.less'
      },
      output: {
        entryFileNames: 'script.js',
        chunkFileNames: '[name].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'ui-kit.css') {
            return 'ui-kit.css'
          }
          if (assetInfo.name === 'style.css') {
            return 'style.css'
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
  }
})
