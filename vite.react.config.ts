import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const reactRoot = fileURLToPath(new URL('./src-react', import.meta.url))
const projectRoot = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  root: reactRoot,
  publicDir: fileURLToPath(new URL('./public', import.meta.url)),
  envDir: projectRoot,
  plugins: [
    react(),
    tailwindcss(),
  ],
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'react',
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src-react', import.meta.url)),
    },
  },
  server: {
    fs: {
      allow: [reactRoot, projectRoot],
    },
  },
  build: {
    outDir: fileURLToPath(new URL('./dist-react', import.meta.url)),
    emptyOutDir: true,
  },
})

