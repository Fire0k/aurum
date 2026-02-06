import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,

    target: 'esnext',
    minify: 'esbuild',

    cssCodeSplit: true,
    cssMinify: false,

    rollupOptions: {
      input: {
        main: 'index.html',
        'ui-kit': 'ui-kit.less'
      },
      output: {
        entryFileNames: 'script.js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name][extname]',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'modules'
          }
        }
      }
    }
  },
})
