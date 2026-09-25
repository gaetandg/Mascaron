import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Chemins relatifs : l'app fonctionne aussi bien en local que sur GitHub Pages
  base: './',
  // Accessible depuis un téléphone sur le même Wi-Fi
  server: { host: true, port: 5173 },
  // MapLibre est servi tel quel : son worker se charge à côté de lui (voir MapView)
  optimizeDeps: { exclude: ['maplibre-gl'] },
})
