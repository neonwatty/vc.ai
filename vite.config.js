import { defineConfig } from 'vite'

export default defineConfig({
  // GitHub Pages deploys to a subdirectory that matches the repo name
  // Using the repo name as the base, or you can use '/' if deploying to a custom domain
  base: process.env.NODE_ENV === 'production' ? '/vc.ai/' : '/',
})