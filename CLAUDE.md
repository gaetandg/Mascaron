# Mascaron — jeu d'exploration de lieux remarquables

Projet perso de Gaëtan (usage familial, en pensant à une ouverture future). Gaëtan ne code pas : Claude écrit tout le code et explique en français, simplement.

## Le concept

- Une carte avec plein de lieux remarquables (mascarons, clochers, plaques, fontaines, street art…). **Pas de parcours préfaits** : on explore librement.
- Le **point exact** du lieu est affiché sur la carte. Le défi est de repérer le détail sur place, à l'aide d'une photo (souvent zoomée sur le détail) et d'indices facultatifs.
- Validation par un simple bouton **« J'ai trouvé »** (pas de GPS, la triche n'est pas un problème). On débloque alors une anecdote et le lieu va dans le **carnet**.
- Pas de distinction entre profils enfant et adulte.
- **Mode créateur** pour ajouter ou modifier des lieux (photo, point, indices, anecdote).
- Zone de départ : Bordeaux, autour de la place Nansouty, extensible.

## Décisions

- **Photos** : pas de Google Street View (conditions d'utilisation). Utiliser Wikimedia Commons, Panoramax (photos de rue libres d'OpenStreetMap France / IGN : on extrait une vue des panoramas 360°), Mapillary ou des photos perso, en notant auteur, licence et source. Positions : géocodeur IGN (data.geopf.fr) ou coordonnées des photos.
- **Stack** : React + TypeScript + Vite (PWA à venir), carte MapLibre + tuiles OpenFreeMap. Plus tard, Capacitor pour Android/iOS.
- **À venir** : Supabase pour les lieux partagés et les **comptes joueurs facultatifs** (synchroniser les lieux trouvés entre appareils ; sans compte, la progression reste sur l'appareil). Hébergement sur GitHub Pages (Gaëtan a un compte GitHub).
- Contenu généré par Claude = toujours marqué « à vérifier » tant que la famille n'est pas passée sur place. Ne pas inventer de faits : rester prudent dans les anecdotes. Gaëtan connaît le quartier et corrige (position de la fresque Fonfrède, plaque de la rue Saint-Jean en métal incrusté, etc.) : ses corrections font foi.
- **Direction artistique** : « carnet d'explorateur » (papier crème, encre sépia, cachets de cire bordeaux, carte OpenStreetMap restylée en sépia, tampon « Trouvé » animé, carnet façon polaroïds scotchés). Polices : Fraunces (titres), Caveat (manuscrit), Nunito (texte). Mascotte : un petit mascaron dessiné au trait, qui parle dans une bulle (indices, bravo).
- **Difficulté** de 1 à 3 affichée sur chaque lieu.
- **Lieux de mémoire** (pavés de mémoire, monument aux morts) : traités comme n'importe quel autre lieu (choix de Gaëtan).
- 85 lieux de départ autour de Nansouty / Saint-Genès / Victoire, étendus vers la rue du Mirail, Saint-Michel, Sainte-Croix et le centre (place de la Bourse, Saint-Pierre, Pey-Berland, Grand-Théâtre, Quinconces, mascarons des rues voisines, Jardin public, quais et rive droite, Saint-Seurin, Mériadeck, Chartrons, Bastide, Grand Parc ; ajout par petits lots poussés un par un) (voir `mascaron/src/data/seed.ts`). Photos : Wikimedia Commons et Panoramax. 5 lieux n'ont pas encore de photo (fresque de Rouge Hartley au square de la Croix-du-Sud, Gouzou, pavés de mémoire) : à photographier sur place avec le mode créateur.
- Fresque du square de la Croix-du-Sud (rue Jean-Mermoz) : œuvre de Rouge Hartley (confirmé par Gaëtan).
- **Zoom des photos** : on ne zoome par défaut (`focus.zoom` > 1) que si l'on cherche un petit détail ; sinon `zoom: 1` pour montrer la photo entière (les zooms forts pixelisent).
- Quand une photo montre un mascaron, l'anecdote (texte « trouvé ») le signale. Si le défi pose une question qui a une vraie réponse (combien, lequel…), l'anecdote donne la réponse ; les questions d'observation libre (« à quoi ça te fait penser ? ») sont expliquées aussi quand c'est possible.
- **Carte** : chaque cachet montre l'icône du type de lieu ; rouge = à trouver, vert avec coche = trouvé. Bouton « Types » : légende, compteurs par type et filtre.

## Code

L'app est dans [mascaron/](mascaron/) (voir son README).
