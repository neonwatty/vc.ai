import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  // Base path for GitHub Pages - using repository name
  base: '/vc.ai/',
  
  build: {
    // Specify output directory
    outDir: 'dist',
    
    // Ensure CSS is properly extracted and handled
    cssCodeSplit: true,
    
    // Configure Rollup output options for proper file naming
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  },
  
  plugins: [
    // Copy static assets from src to ensure they're available in the build
    viteStaticCopy({
      targets: [
        {
          src: 'src/*',
          dest: 'src',
        }
      ]
    })
  ]
})