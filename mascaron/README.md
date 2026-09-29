# Mascaron

Jeu d'exploration familial : trouver des détails remarquables (mascarons, clochers, plaques, fontaines…) à Bordeaux.

**Jouer en ligne : https://gaetandg.github.io/Mascaron/**

L'app est republiée automatiquement à chaque envoi de code sur la branche `main` (voir `.github/workflows/deploy.yml`).

## Lancer l'app sur l'ordinateur

```bash
npm install     # la première fois seulement
npm run dev
```

Puis ouvrir http://localhost:5173 (sur un téléphone du même Wi-Fi : l'adresse « Network » affichée dans le terminal).

## Organisation

- `src/data/seed.ts` : tous les lieux (photos dans `public/seed/`), ajoutés et corrigés par Claude
- `src/quartiers.ts` : quartiers du carnet
- `src/data/progress.ts` : lieux trouvés (stockés dans le navigateur pour l'instant)
- `src/screens/` : Carte, Carnet

Stack : React + TypeScript + Vite, carte MapLibre + OpenFreeMap (OpenStreetMap).
