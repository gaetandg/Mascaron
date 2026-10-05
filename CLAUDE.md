# Mascaron — jeu d'exploration de lieux remarquables

Projet perso de Gaëtan (usage familial, en pensant à une ouverture future). Gaëtan ne code pas : Claude écrit tout le code et explique en français, simplement.

## Le concept

- Une carte avec plein de lieux remarquables (mascarons, clochers, plaques, fontaines, street art…). **Pas de parcours préfaits** : on explore librement.
- Le **point exact** du lieu est affiché sur la carte. Le défi est de repérer le détail sur place, à l'aide d'une photo (souvent zoomée sur le détail) et d'indices facultatifs.
- Validation par un simple bouton **« J'ai trouvé »** (pas de GPS, la triche n'est pas un problème). On débloque alors une anecdote et le lieu va dans le **carnet**.
- Pas de distinction entre profils enfant et adulte.
- **Contenu géré par Claude** : Gaëtan n'a pas besoin du mode créateur ; c'est Claude qui ajoute, corrige et valide les lieux et les photos dans le code (`seed.ts`, `public/seed/`). Plus tard peut-être : permettre aux joueurs de **proposer** de nouveaux lieux (à voir).
- Zone de départ : Bordeaux, autour de la place Nansouty, extensible.

## Décisions

- **Photos** : pas de Google Street View (conditions d'utilisation). Utiliser Wikimedia Commons, Panoramax (photos de rue libres d'OpenStreetMap France / IGN : on extrait une vue des panoramas 360°), Mapillary ou des photos perso, en notant auteur, licence et source. Positions : géocodeur IGN (data.geopf.fr) ou coordonnées des photos.
- **Stack** : React + TypeScript + Vite, carte MapLibre + tuiles OpenFreeMap. **PWA** : installable sur l'écran d'accueil (encart dans l'onglet « Compte ») et utilisable sans réseau (service worker `mascaron/sw.js` : la page vient toujours du réseau s'il y en a, pour avoir la dernière version ; photos, polices et tuiles gardées au fur et à mesure). Sur iPhone, l'app installée a un carnet séparé de Safari (d'où l'intérêt du compte). Plus tard, Capacitor pour Android/iOS.
- **À venir** : Supabase (formule gratuite) pour les **comptes joueurs facultatifs** : synchroniser les lieux trouvés entre appareils ; sans compte, la progression reste sur l'appareil. Connexion (onglet « Compte », proposée une fois au premier lieu trouvé sans compte ; après connexion, retour sur la carte ; à la connexion, le carnet du téléphone et celui du compte sont fusionnés ; à la déconnexion, le carnet est sauvegardé puis vidé du téléphone, pour les téléphones partagés, choix de Gaëtan) : Google, e-mail + mot de passe, lien magique par e-mail ; Apple plus tard avec l'app iOS. Projet Supabase `hzpixgfuzocoxwtqhqzh`, table `found` (script `mascaron/supabase/schema.sql`, à coller par Gaëtan dans le SQL Editor), clé publique dans `src/data/supabase.ts`. Les e-mails (lien magique, confirmation, mot de passe oublié) nécessiteront un SMTP perso (Brevo conseillé) avant l'ouverture au public : le SMTP intégré n'envoie qu'aux membres de l'équipe Supabase. Pas de photos dans Supabase : elles restent sur GitHub Pages. Tâche GitHub Actions quotidienne (`.github/workflows/keepalive.yml`) pour éviter la pause des projets gratuits inactifs. Hébergement sur GitHub Pages (Gaëtan a un compte GitHub) ; un nom de domaine perso pourra être branché plus tard (attention : changer d'adresse fait perdre la progression enregistrée sur l'appareil, d'où l'intérêt des comptes).
- Contenu généré par Claude = toujours marqué « à vérifier » tant que la famille n'est pas passée sur place. Ne pas inventer de faits : rester prudent dans les anecdotes. Gaëtan connaît le quartier et corrige (position de la fresque Fonfrède, plaque de la rue Saint-Jean en métal incrusté, etc.) : ses corrections font foi.
- **Direction artistique** : « carnet d'explorateur » (papier crème, encre sépia, cachets de cire bordeaux, carte OpenStreetMap restylée en sépia, tampon « Trouvé » animé, carnet façon polaroïds scotchés). Polices : Fraunces (titres), Caveat (manuscrit), Nunito (texte). Mascotte : un petit mascaron dessiné au trait, qui parle dans une bulle (indices, bravo).
- **Difficulté** de 1 à 3 affichée sur chaque lieu.
- **Lieux de mémoire** (pavés de mémoire, monument aux morts) : traités comme n'importe quel autre lieu (choix de Gaëtan).
- 133 lieux de départ autour de Nansouty / Saint-Genès / Victoire, étendus vers la rue du Mirail, Saint-Michel, Sainte-Croix et le centre (place de la Bourse, Saint-Pierre, Pey-Berland, Grand-Théâtre, Quinconces, mascarons des rues voisines, Jardin public, quais et rive droite, Saint-Seurin, Fondaudège, Mériadeck, Chartrons, Bacalan, Bastide, Belcier, Grand Parc, plus quelques curiosités et coins de nature dans toute la ville : miroir d'eau, parc Bordelais, square Dom-Bedos, jardin de la Mairie, parc floral, églises Notre-Dame, Saint-Pierre et Saint-Amand de Caudéran, porte de la Monnaie, monument aux morts de Caudéran, Jaguar du parking Victor-Hugo, place Camille-Jullian (colonne romaine, cinéma Utopia), fontaine Saint-Projet, Galerie bordelaise, églises Saint-Rémi et Saint-Paul, cour Mably, porte de la Chartreuse, Le Vaincu au parc Bordelais ; ajout par petits lots poussés un par un) (voir `mascaron/src/data/seed.ts`). Photos : Wikimedia Commons et Panoramax. 5 lieux n'ont pas encore de photo (fresque de Rouge Hartley au square de la Croix-du-Sud, Gouzou, pavés de mémoire) : à photographier sur place (Gaëtan enverra les photos à Claude).
- Fresque du square de la Croix-du-Sud (rue Jean-Mermoz) : œuvre de Rouge Hartley (confirmé par Gaëtan).
- **Zoom des photos** : on ne zoome par défaut (`focus.zoom` > 1) que si l'on cherche un petit détail ; sinon `zoom: 1` pour montrer la photo entière (les zooms forts pixelisent).
- Quand une photo montre un mascaron, l'anecdote (texte « trouvé ») le signale. Si le défi pose une question qui a une vraie réponse (combien, lequel…), l'anecdote donne la réponse ; les questions d'observation libre (« à quoi ça te fait penser ? ») sont expliquées aussi quand c'est possible.
- **Carnet** : un album rangé par quartier (Nansouty, Saint-Genès, Victoire, Saint-Michel, Belcier, Centre, Mériadeck, Saint-Seurin – Fondaudège, Caudéran, Chartrons – Grand Parc, Bacalan – Le Lac, La Bastide). Chaque lieu a sa case fixe : les cases trouvées (photo + tampon) sont mêlées aux cases vides, qui ne montrent **aucun indice** (juste « ? »). Limites des quartiers : IRIS Insee 2024 (open data Bordeaux Métropole, jeu `se_iri24_s`), l'IRIS « Nansouty » coupé au cours de la Somme (Saint-Genès à l'ouest). Chaque lieu de départ a un champ `quartier` ; un lieu créé dans l'app prend celui du lieu de départ le plus proche. Pas de Google Maps.
- **Carte** : chaque cachet montre l'icône du type de lieu ; rouge = à trouver, vert avec coche = trouvé. Bouton « Types » : légende, compteurs par type et filtre. À l'ouverture de l'app, la carte montre tout Bordeaux (tous les lieux) et le point GPS du joueur (vue élargie s'il est dans les environs) ; les cachets gardent toujours leur taille (Gaëtan n'aime pas les cachets qui rapetissent).

## À faire plus tard

- **Suivi de fréquentation (« tracking »)** : mesurer les visites et l'usage (lieux ouverts, trouvés…). Choisir un outil respectueux de la vie privée (sans cookies, pour éviter un bandeau RGPD) ; à discuter avec Gaëtan avant de brancher quoi que ce soit.
- **E-mails** : nom de domaine + Brevo (SMTP) branchés dans Supabase, limite horaire relevée, modèles d'e-mails en français.
- **Connexion Google** : Gaëtan crée l'ID client OAuth dans Google Cloud et le colle dans Supabase (le bouton apparaît tout seul).
- Apple (connexion) avec l'app iOS ; propositions de lieux par les joueurs.

## Code

L'app est dans [mascaron/](mascaron/) (voir son README).
