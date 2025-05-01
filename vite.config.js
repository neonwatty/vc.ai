import { defineConfig } from 'vite'

export default defineConfig({
  // GitHub Pages deploys to a subdirectory that matches the repo name
  // Ensuring all assets are loaded from https://neonwatty.github.io/vc.ai/
  base: process.env.NODE_ENV === 'production' ? 'https://neonwatty.github.io/vc.ai/' : '/',
})