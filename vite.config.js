/* global process */
import { copyFileSync, existsSync } from 'fs'
import { dirname, join, resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const rootDir = dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'github-pages-spa-fallback',
      closeBundle() {
        const outDir = resolve(rootDir, 'dist')
        const index = join(outDir, 'index.html')
        if (existsSync(index)) {
          copyFileSync(index, join(outDir, '404.html'))
        }
      },
    },
  ],
  base: process.env.VITE_BASE_PATH || '/',
})
