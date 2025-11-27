import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'components': fileURLToPath(new URL('./src/components', import.meta.url)),
      'data': fileURLToPath(new URL('./src/data', import.meta.url)),
      'hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
      'lib': fileURLToPath(new URL('./src/lib', import.meta.url)),
      'pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      'stores': fileURLToPath(new URL('./src/stores', import.meta.url)),
      'styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
      'types': fileURLToPath(new URL('./src/types', import.meta.url)),
      'utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})

