import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

/** Liste des fichiers d'un dossier (chemins relatifs, avec « / ») */
function listFiles(dir: string, root = dir): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? listFiles(join(dir, e.name), root) : [relative(root, join(dir, e.name)).split('\\').join('/')],
  )
}

/**
 * Écrit dist/sw.js (mode hors-ligne, voir sw.js) avec la liste des fichiers de l'app à garder.
 * Les photos (seed/) n'y sont pas : elles sont gardées au fur et à mesure qu'on les regarde.
 */
function serviceWorker(): Plugin {
  let outDir = 'dist'
  return {
    name: 'mascaron-service-worker',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir
    },
    closeBundle() {
      const files = listFiles(outDir).filter((f) => !f.startsWith('seed/') && f !== 'sw.js')
      const sw = readFileSync('sw.js', 'utf8')
        .replace("'__VERSION__'", JSON.stringify(Date.now().toString(36)))
        .replace('= __PRECACHE__', `= ${JSON.stringify(files)}`)
      writeFileSync(join(outDir, 'sw.js'), sw)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), serviceWorker()],
  // Chemins relatifs : l'app fonctionne aussi bien en local que sur GitHub Pages
  base: './',
  // Accessible depuis un téléphone sur le même Wi-Fi
  server: { host: true, port: 5173 },
  // MapLibre est servi tel quel : son worker se charge à côté de lui (voir MapView)
  optimizeDeps: { exclude: ['maplibre-gl'] },
})
