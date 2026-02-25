import { defineConfig } from 'vite'
import { resolve } from 'path'
import { htmlIncludePlugin } from './scripts/vite-plugin-html-include.js'

export default defineConfig({
  plugins: [htmlIncludePlugin(resolve(__dirname))],
  // Base path pour le déploiement dans un sous-dossier
  base: './',
  
  // Build options
  build: {
    // Dossier de sortie
    outDir: 'dist',
    
    // Nettoyage du dossier avant build
    emptyOutDir: true,
    
    // Conserver les fichiers HTML
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        etablissements: resolve(__dirname, 'etablissements.html'),
        'etablissement-detail': resolve(__dirname, 'etablissement-detail.html'),
        don: resolve(__dirname, 'don.html'),
        'offre-detail': resolve(__dirname, 'offre-detail.html'),
        postuler: resolve(__dirname, 'postuler.html'),
        carrieres: resolve(__dirname, 'carrieres.html')
      }
    }
  },
  
  // Server options pour le dev local
  server: {
    port: 3000,
    open: false,
    allowedHosts: true
  }
})
