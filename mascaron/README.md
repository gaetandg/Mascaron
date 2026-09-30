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
- `src/data/progress.ts` : lieux trouvés (sur le téléphone, et en ligne si le joueur a un compte)
- `src/data/supabase.ts`, `src/data/account.ts` : comptes joueurs (Supabase) ; `supabase/schema.sql` : tables et règles de sécurité
- `src/screens/` : Carte, Carnet, Compte
- `sw.js`, `public/manifest.webmanifest`, `public/icons/`, `src/data/install.ts` : app installable sur l'écran d'accueil et utilisable sans réseau (le service worker n'est actif que dans l'app construite, pas avec `npm run dev`)

Stack : React + TypeScript + Vite, carte MapLibre + OpenFreeMap (OpenStreetMap).
