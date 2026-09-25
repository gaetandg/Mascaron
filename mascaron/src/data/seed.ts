import type { Photo, Place } from '../types'

// Lieux de départ autour de Nansouty / Saint-Genès / Victoire.
// Positions : OpenStreetMap ou position de la photo. Photos : Wikimedia Commons (licences libres).
// Tout est marqué « à vérifier » tant que la famille n'est pas passée sur place.
// Règle : ne jamais inventer de fait. En cas de doute, poser une question plutôt qu'affirmer.

type SeedInput = Omit<Place, 'origin' | 'createdAt' | 'toVerify'>

const place = (p: SeedInput): Place => ({ toVerify: true, origin: 'seed', createdAt: '2026-09-25', ...p })

const commons = (file: string, author: string, license: string, page: string, focus?: Photo['focus']): Photo => ({
  url: `${import.meta.env.BASE_URL}seed/${file}.jpg`,
  author,
  license,
  sourceUrl: `https://commons.wikimedia.org/wiki/File:${page}`,
  focus,
})

// Photographe de la plupart des photos du quartier sur Wikimedia
const rb = (file: string, page: string, focus?: Photo['focus']) => commons(file, 'Romainbehar', 'CC0', page, focus)

export const SEED_PLACES: Place[] = [
  // ---------- Nansouty / Saint-Genès ----------
  place({
    id: 'seed-fontaine-nansouty',
    title: 'La fontaine de la place Nansouty',
    category: 'fontaine',
    difficulty: 1,
    lat: 44.819868,
    lng: -0.572241,
    challenge:
      "Cette carte postale a plus de 100 ans. Retrouve la fontaine et le visage sculpté d'où sortait l'eau.",
    photo: commons(
      'fontaine-nansouty',
      'Jean Barreau (carte postale ancienne)',
      'Domaine public',
      'Bordeaux_-_Place_Nansouty_-_la_fontaine.jpg',
      { x: 33, y: 66, zoom: 3 },
    ),
    hints: ['Elle est sur la place Nansouty elle-même.', "Le visage est juste au-dessus du bassin, là où coulait l'eau."],
    story:
      "Un visage sculpté qui sert de décor (ou de bouche de fontaine), c'est justement ça, un mascaron ! Sur la carte postale, on voit même des publicités collées sur la fontaine (Maggi, Papillon noir). Compare avec aujourd'hui : qu'est-ce qui a changé ?",
  }),
  place({
    id: 'seed-boite-nansouty',
    title: 'La boîte à livres de la place Nansouty',
    category: 'autre',
    difficulty: 1,
    lat: 44.82003,
    lng: -0.57221,
    challenge: 'Sur la place, une petite armoire en bois garde des trésors en papier. Trouve-la !',
    photo: commons(
      'boite-nansouty',
      'Sylvain Machefert',
      'CC BY-SA 4.0',
      'Bordeaux_-_place_Nansouty_-_boite_%C3%A0_livres.jpg',
      { x: 67, y: 52, zoom: 4 },
    ),
    hints: ['Pas loin de la fontaine.'],
    story:
      "Une boîte à livres, c'est une bibliothèque gratuite et sans bibliothécaire : on prend un livre, on en dépose un autre. Regarde ce qu'il y a dedans aujourd'hui ! Il y en a plein d'autres dans le quartier : combien vas-tu en trouver ?",
  }),
  place({
    id: 'seed-sainte-genevieve',
    title: 'Les lettres grecques de Sainte-Geneviève',
    category: 'eglise',
    difficulty: 2,
    lat: 44.818651,
    lng: -0.575689,
    challenge: 'Sur la façade de cette église se cache un cercle avec quatre lettres grecques. Trouve-le !',
    photo: commons(
      'sainte-genevieve',
      'JeanWilhelm',
      'CC0',
      '%C3%89glise_sainte_genevi%C3%A8ve_bordeaux.jpg',
      { x: 57, y: 34, zoom: 3.5 },
    ),
    hints: ["C'est tout en haut de la façade, sous le toit.", 'Juste au-dessus du grand demi-cercle peint.'],
    story:
      "Le P barré d'un X, c'est le « Chi-Rho » : les deux premières lettres de « Christ » en grec. Le A et le Ω (alpha et oméga) sont la première et la dernière lettre de l'alphabet grec : « le commencement et la fin ». Bonus : sous les arcades, cherche les deux créatures ailées face à face autour d'un vase.",
  }),
  place({
    id: 'seed-boite-croix-du-sud',
    title: 'La boîte à livres du square de la Croix-du-Sud',
    category: 'autre',
    difficulty: 1,
    lat: 44.81764,
    lng: -0.57383,
    challenge: 'Dans ce square, une boîte à livres se tient près des jeux. Trouve-la et regarde ce qu’elle contient.',
    photo: commons(
      'boite-croix-du-sud',
      'Sylvain Machefert',
      'CC BY-SA 4.0',
      'Bordeaux_-_square_de_la_croix_du_sud_-_boite_%C3%A0_livres.jpg',
      { x: 45, y: 30, zoom: 2 },
    ),
    hints: ['Square de la Croix-du-Sud.'],
    story:
      "Les boîtes à livres de la ville portent ce grand panneau « Ceci est une boîte à lire ». Petit défi : dépose un livre que tu as fini, et note ici son titre pour t'en souvenir.",
  }),
  place({
    id: 'seed-octroi-toulouse',
    title: "L'octroi de la barrière de Toulouse",
    category: 'plaque',
    difficulty: 2,
    lat: 44.814859,
    lng: -0.572473,
    challenge:
      "Ce petit bâtiment servait à faire payer une taxe à tous ceux qui entraient dans Bordeaux avec des marchandises. Trouve-le, et cherche une date ou une inscription sur sa façade.",
    hints: ['À la barrière de Toulouse, au bout du cours de la Somme.', 'Il a été construit en 1867.'],
    story:
      "L'octroi, c'était une taxe sur ce qui entrait en ville : vin, viande, bois… Les « barrières » de Bordeaux (de Toulouse, de Bègles, Saint-Genès…) étaient les portes d'entrée où l'on payait. Le nom est resté, même si la taxe a disparu depuis longtemps.",
  }),
  place({
    id: 'seed-fresque-croix-du-sud',
    title: 'Une fresque près de la Croix-du-Sud',
    category: 'street-art',
    difficulty: 2,
    lat: 44.816719,
    lng: -0.576044,
    challenge: "Une fresque est peinte sur un mur par ici. Trouve-la, et invente-lui un titre !",
    hints: ['Regarde les grands murs sans fenêtre.'],
    story:
      "Les fresques de rue changent parfois : certaines sont repeintes, d'autres effacées. Prends-la en photo, elle ne sera peut-être plus là l'an prochain. Si tu trouves la signature de l'artiste, note-la !",
  }),

  // ---------- Barrière Saint-Genès ----------
  place({
    id: 'seed-octroi-saint-genes',
    title: "L'ancien octroi de la barrière Saint-Genès",
    category: 'plaque',
    difficulty: 2,
    lat: 44.821484,
    lng: -0.582912,
    challenge:
      "Comme à la barrière de Toulouse, un ancien bureau d'octroi garde l'entrée de la ville. Trouve-le. Ressemble-t-il à celui de la barrière de Toulouse ?",
    hints: ['Près de la barrière Saint-Genès, sur les boulevards.'],
    story:
      "Les bureaux d'octroi se ressemblent souvent : ce sont de petites maisons de garde, construites au bord des routes qui entraient dans Bordeaux. Si tu as trouvé les deux, compare-les !",
  }),
  place({
    id: 'seed-croix-saint-genes',
    title: 'La croix de la barrière Saint-Genès',
    category: 'monument',
    difficulty: 2,
    lat: 44.821861,
    lng: -0.582685,
    challenge: 'Une croix se dresse au bord du chemin, tout près des boulevards. Trouve-la.',
    hints: ["Tout près de l'ancien octroi de Saint-Genès."],
    story:
      "Autrefois, on plantait des croix au bord des routes, aux carrefours ou à l'entrée des villages. Regarde-la bien : en quoi est-elle faite ? Y a-t-il une date ou une inscription ?",
  }),

  // ---------- Pavés de mémoire ----------
  place({
    id: 'seed-memoire-borruel',
    title: 'Pavés de mémoire de Marcelle et Ginette Borruel',
    category: 'memoire',
    difficulty: 3,
    lat: 44.821321,
    lng: -0.576235,
    challenge: 'Au sol, devant une maison, deux petits pavés dorés portent des noms. Trouve-les et lis-les.',
    hints: ['Regarde le trottoir, devant les portes.'],
    story:
      "« Ici habitait… » Marcelle Borruel, née en 1928, et Ginette Borruel, née en 1937, ont été arrêtées le 10 janvier 1944, internées à Drancy puis déportées à Auschwitz, où elles ont été assassinées le 20 janvier 1944. Ginette avait 6 ou 7 ans. Ces pavés, posés en 2022, font partie des « Stolpersteine » imaginés par l'artiste Gunter Demnig : ils rappellent les victimes du nazisme devant leur dernier domicile.",
  }),
  place({
    id: 'seed-memoire-bret',
    title: 'Pavés de mémoire de Robert et Georgette Bret',
    category: 'memoire',
    difficulty: 3,
    lat: 44.821472,
    lng: -0.577695,
    challenge: 'Au sol, devant une maison, deux petits pavés dorés portent des noms. Trouve-les et lis-les.',
    hints: ['Regarde le trottoir, devant les portes.'],
    story:
      "« Ici habitait… » Robert Bret, né en 1906, arrêté le 22 novembre 1940, interné au fort du Hâ, assassiné au camp de Souge. Georgette Bret, née en 1905, arrêtée le 28 août 1942, internée au fort du Hâ puis à Romainville, déportée en 1943 à Auschwitz, où elle a été assassinée. Ces pavés ont été posés en 2025.",
  }),
  place({
    id: 'seed-memoire-cantelaube',
    title: 'Pavés de mémoire de Jean et Germaine Cantelaube',
    category: 'memoire',
    difficulty: 3,
    lat: 44.818328,
    lng: -0.564465,
    challenge: 'Au sol, devant une maison, deux petits pavés dorés portent des noms. Trouve-les et lis-les.',
    hints: ['Regarde le trottoir, devant les portes.'],
    story:
      "« Ici habitait… » Jean Cantelaube, né en 1910, arrêté le 22 novembre 1940, interné au camp de Mérignac-Beaudésert, assassiné au camp de Souge le 24 octobre 1941. Germaine Cantelaube, née en 1908, arrêtée le 28 août 1942, internée au fort du Hâ puis à Romainville, déportée en 1943 à Auschwitz, où elle a été assassinée. Ces pavés ont été posés en 2025.",
  }),

  // ---------- Vers le Sacré-Cœur ----------
  place({
    id: 'seed-galard-plaque',
    title: 'Le numéro caché de la rue de Galard',
    category: 'plaque',
    difficulty: 3,
    lat: 44.82244,
    lng: -0.56945,
    challenge: "Juste au-dessus du nom de la rue, une toute petite plaque porte un numéro. Lequel ?",
    photo: rb('galard-plaque', 'Bordeaux_-_Rue_de_Galard_-_Plaque.jpg', { x: 51, y: 50, zoom: 5 }),
    hints: ["Cherche la plaque bleue « Rue de Galard » sur l'angle d'une maison.", 'Le numéro est suivi de « Arr ».'],
    story:
      "« 6ᵉ Arr » : ces petites plaques indiquent l'ancien arrondissement (une sorte de quartier administratif) de la rue. Bonus : sur la même maison, lève les yeux vers la frise sculptée en haut du mur. Et va voir la rue de la Réole, toute proche : même numéro ?",
  }),
  place({
    id: 'seed-galard-echoppes',
    title: 'Les échoppes décorées de la rue de Galard',
    category: 'facade',
    difficulty: 2,
    lat: 44.82211,
    lng: -0.5698,
    challenge: 'Une rangée de maisons basses en pierre. Au-dessus des fenêtres, des décors sculptés : trouve-les.',
    photo: rb('galard-maisons', 'Bordeaux_-_Rue_de_Galard_-_Maisons_du_10_au_14.jpg', { x: 56, y: 24, zoom: 4 }),
    hints: ['Rue de Galard, autour des numéros 10 à 14.', "Lève les yeux : c'est juste sous le toit, au-dessus des fenêtres."],
    story:
      "Ces maisons d'un seul étage s'appellent des échoppes : c'est la maison typique de Bordeaux. Beaucoup ont des façades décorées de fleurs, de rubans ou de visages sculptés. Maintenant que tu sais les voir, compte combien de décors différents il y a dans la rue !",
  }),
  place({
    id: 'seed-reole-plaque',
    title: 'Le numéro caché de la rue de la Réole',
    category: 'plaque',
    difficulty: 3,
    lat: 44.82203,
    lng: -0.56779,
    challenge: 'Au-dessus de la plaque « Rue de la Réole », une petite plaque indique un numéro. Est-ce le même que rue de Galard ?',
    photo: rb('reole-plaque', 'Bordeaux_-_Rue_de_la_R%C3%A9ole_-_Plaque.jpg', { x: 50, y: 34, zoom: 4 }),
    hints: ["Cherche la plaque de rue à l'angle d'un mur.", 'Le numéro est suivi de « Arr ».'],
    story:
      "Ici, c'est le 7ᵉ arrondissement, alors que la rue de Galard, juste à côté, est dans le 6ᵉ ! Tu viens de franchir une ancienne frontière entre deux quartiers sans t'en rendre compte.",
  }),
  place({
    id: 'seed-boite-malbec',
    title: 'La boîte à livres de la rue Malbec',
    category: 'autre',
    difficulty: 1,
    lat: 44.82273,
    lng: -0.56746,
    challenge: 'Rue Malbec, une boîte à livres attend les lecteurs près d’un banc. Trouve-la.',
    photo: commons(
      'boite-malbec',
      'Sylvain Machefert',
      'CC BY-SA 4.0',
      'Bordeaux_-_rue_Malbec_-_boite_%C3%A0_livres.jpg',
      { x: 55, y: 42, zoom: 4 },
    ),
    hints: ['Près d’un banc et d’un arbre.'],
    story: "Encore une ! Est-ce qu'elle ressemble à celle de la place Nansouty ? Regarde si tu y trouves un livre pour toi.",
  }),
  place({
    id: 'seed-sacre-coeur',
    title: 'Les clochers jumeaux du Sacré-Cœur',
    category: 'eglise',
    difficulty: 1,
    lat: 44.822598,
    lng: -0.563449,
    challenge: "Deux clochers presque identiques… et une grande rosace. Combien d'horloges comptes-tu sur la façade ?",
    photo: commons(
      'sacre-coeur',
      'Olivier432',
      'CC BY-SA 3.0',
      'Eglise_du_Sacr%C3%A9-Coeur_de_Bordeaux.jpg',
      { x: 60.5, y: 77, zoom: 3 },
    ),
    hints: ['Les deux clochers pointus se voient de loin, cherche-les au-dessus des toits.', 'La rosace est au-dessus de la porte principale.'],
    story:
      "Une rosace, c'est une grande fenêtre ronde découpée comme une fleur. Il y a une horloge sur chaque clocher : vérifie si elles indiquent la même heure ! L'église date de la fin du XIXᵉ siècle.",
  }),
  place({
    id: 'seed-sacre-coeur-repere',
    title: 'Le repère secret du Sacré-Cœur',
    category: 'plaque',
    difficulty: 3,
    lat: 44.82241,
    lng: -0.56381,
    challenge: "Sur un mur de l'église, un petit disque de métal est scellé dans la pierre. Il connaît un secret : l'altitude exacte de cet endroit !",
    photo: rb('sacre-coeur-borne', 'Bordeaux_-_%C3%89glise_du_Sacr%C3%A9-C%C5%93ur_-_Borne_de_nivellement.jpg', {
      x: 50,
      y: 52,
      zoom: 2.5,
    }),
    hints: ["Fais le tour de l'église en regardant les murs, pas très haut.", 'Il est rond, en métal sombre, à peu près grand comme une paume de main.'],
    story:
      "C'est un repère de nivellement : les géomètres en ont posé partout en France pour mesurer l'altitude au centimètre près. Cherche-en d'autres : on en trouve sur les églises, les mairies, les ponts… Lis ce qui est écrit autour du disque.",
  }),
  place({
    id: 'seed-coq-furtado',
    title: 'Le coq de la rue Furtado',
    category: 'sculpture',
    difficulty: 2,
    lat: 44.82462,
    lng: -0.56016,
    challenge: "À l'angle de deux rues, un coq sculpté est entouré de feuilles et de fruits. Trouve-le !",
    photo: rb('coq-furtado', 'Bordeaux_-_Rue_Furtado_-_Relief_de_coq,_%C3%A0_l%27angle_de_la_rue_Fieff%C3%A9.jpg', {
      x: 47,
      y: 52,
      zoom: 2.5,
    }),
    hints: ['À l’angle de la rue Furtado et de la rue Fieffé.', 'Lève les yeux, au-dessus du rez-de-chaussée.'],
    story:
      "Regarde bien ce qui entoure le coq : ce sont des grappes de raisin et des feuilles de vigne, très bordelais ! Qu'est-ce que le coq tient ou regarde ? À ton avis, pourquoi l'a-t-on sculpté ici ?",
  }),

  // ---------- Belcier ----------
  place({
    id: 'seed-citernes',
    title: 'Les citernes perchées',
    category: 'monument',
    difficulty: 1,
    lat: 44.82098,
    lng: -0.55905,
    challenge: 'Au-dessus de grandes arches de pierre, d’énormes cuves sont perchées. Combien y en a-t-il, et quels numéros portent-elles ?',
    photo: rb('citernes', 'Bordeaux_-_Passage_des_Citernes_-_Vue_sur_l%27ancien_ch%C3%A2teau_d%27eau,_de_nuit.jpg', {
      x: 50,
      y: 18,
      zoom: 2,
    }),
    hints: ['Passage des Citernes.', 'Viens à la tombée de la nuit : elles s’illuminent.'],
    story:
      "C'est un ancien château d'eau : les cuves en hauteur gardaient de l'eau sous pression pour la distribuer. Il a été conservé au milieu du nouveau quartier. Juste à côté se cache un personnage de street art très célèbre : le Gouzou !",
  }),
  place({
    id: 'seed-gouzou',
    title: 'Le Gouzou',
    category: 'street-art',
    difficulty: 2,
    lat: 44.821157,
    lng: -0.559298,
    challenge: "Un drôle de personnage sans visage est peint sur un mur du quartier. Trouve-le : qu'est-il en train de faire ?",
    hints: ['Tout près des citernes perchées.', 'Il est tout blanc… et il n’a pas de visage.'],
    story:
      "Le Gouzou est le personnage de Jace, un artiste de l'île de La Réunion. Il en a peint des centaines dans le monde entier, souvent dans des situations rigolotes. Si tu en croises un autre ailleurs, tu le reconnaîtras !",
  }),
  place({
    id: 'seed-fresque-fonfrede',
    title: 'La fresque de la rue Fonfrède',
    category: 'street-art',
    difficulty: 1,
    lat: 44.82572,
    lng: -0.57245,
    challenge: 'Une grande fresque est peinte sur un mur, tout près du cours de la Somme. Trouve-la et décris-la en trois mots.',
    hints: ["À l'angle de la rue Fonfrède et du cours de la Somme."],
    story:
      "Les artistes signent souvent leurs fresques dans un coin. Cherche la signature, et note-la : tu pourras chercher ses autres œuvres dans Bordeaux.",
  }),
  place({
    id: 'seed-memoire-sante-navale',
    title: "Le monument aux morts de l'École de santé navale",
    category: 'memoire',
    difficulty: 1,
    lat: 44.82833,
    lng: -0.56309,
    challenge: "Un monument de pierre porte un symbole : des serpents enroulés autour d'un bâton. Trouve-le.",
    photo: rb('sante-navale-monument', 'Bordeaux_-_All%C3%A9e_de_l%27%C3%89cole_Sant%C3%A9_Navale_-_Monument_aux_morts_01.jpg', {
      x: 50,
      y: 35,
      zoom: 2,
    }),
    hints: ["Allée de l'École-de-Santé-Navale."],
    story:
      "Ici se trouvait l'École de santé navale, qui formait les médecins et pharmaciens de la Marine. Le monument rend hommage aux morts de l'école. Le serpent autour d'un bâton est un symbole ancien de la médecine.",
  }),

  // ---------- Vers les Capucins ----------
  place({
    id: 'seed-saint-jean-plaques',
    title: 'Les deux plaques de la rue Saint-Jean',
    category: 'plaque',
    difficulty: 3,
    lat: 44.82682,
    lng: -0.56828,
    challenge: 'Une seule rue… mais deux plaques ! Trouve la plus ancienne, une plaque de métal incrustée dans la pierre du mur.',
    photo: rb('saint-jean-plaques', 'Bordeaux_-_Rue_Saint-Jean_-_Plaques.jpg', { x: 48, y: 25, zoom: 3.5 }),
    hints: ["À l'angle d'une maison de la rue Saint-Jean.", 'Elle est au-dessus de la plaque bleue.'],
    story:
      "Avant les plaques émaillées bleues, le nom des rues était parfois écrit sur des plaques de métal encastrées dans la pierre des maisons. Avec le temps, le métal a foncé et les lettres sont devenues difficiles à lire. Arrives-tu à la déchiffrer ?",
  }),
  place({
    id: 'seed-la-brede-plaques',
    title: 'La plaque cachée de la rue de La Brède',
    category: 'plaque',
    difficulty: 3,
    lat: 44.82765,
    lng: -0.56774,
    challenge: 'Ici aussi il y a deux plaques de rue. Mais la deuxième se cache derrière une plante grimpante… Trouve-la !',
    photo: rb('la-brede-plaques', 'Bordeaux_-_Rue_de_La_Br%C3%A8de_-_Plaques.jpg', { x: 50, y: 50, zoom: 2.5 }),
    hints: ['Sous la plaque bleue.', 'La plante a de petits fruits orange.'],
    story:
      "La Brède est un village au sud de Bordeaux, célèbre pour son château où vivait l'écrivain Montesquieu. Beaucoup de rues du quartier portent le nom de la ville ou du village vers lequel elles menaient : rue de Bègles, rue de la Réole, route de Toulouse…",
  }),
  place({
    id: 'seed-statuette-niche',
    title: 'Le petit personnage de la niche',
    category: 'sculpture',
    difficulty: 2,
    lat: 44.82998,
    lng: -0.56856,
    challenge: 'Au-dessus des passants, un petit personnage vit dans une niche creusée dans le mur, debout sur une boule. Trouve-le !',
    photo: commons(
      'statuette-niche',
      'Tylwyth Eldar',
      'CC BY-SA 4.0',
      'Bordeaux_-_Statuette_dans_sa_niche_01.jpg',
      { x: 50, y: 40, zoom: 2 },
    ),
    hints: ['Cours de la Marne, vers les numéros 60-62.', 'Lève la tête, au niveau du premier étage.'],
    story:
      "On trouve à Bordeaux beaucoup de niches avec des statuettes : des saints, des personnages, parfois des vierges. Elles protégeaient symboliquement la maison. Observe-le : que tient-il, et que regarde-t-il ?",
  }),

  // ---------- Place de la Victoire ----------
  place({
    id: 'seed-porte-aquitaine',
    title: "Le fronton de la porte d'Aquitaine",
    category: 'monument',
    difficulty: 1,
    lat: 44.83115,
    lng: -0.572748,
    challenge: 'Tout en haut de cette grande porte, des personnages sculptés entourent un blason. Trouve-les.',
    photo: commons('porte-aquitaine', 'Patrick Despoix', 'CC BY-SA 3.0', '022_-_Place_de_la_Victoire_-_Bordeaux.jpg', {
      x: 62,
      y: 15,
      zoom: 3.5,
    }),
    hints: ['Place de la Victoire.', 'Lève la tête vers le triangle en haut de la porte.'],
    story:
      "La porte d'Aquitaine est une ancienne porte de la ville, construite au XVIIIᵉ siècle. Une porte qui ne ferme plus rien, en plein milieu d'une place ! Regarde bien des deux côtés : le fronton est-il le même ?",
  }),
  place({
    id: 'seed-colonne-victoire',
    title: 'La colonne rose de la Victoire',
    category: 'sculpture',
    difficulty: 1,
    lat: 44.830854,
    lng: -0.572708,
    challenge: 'Au pied de cette haute colonne, des animaux en bronze se cachent. Lesquels ?',
    photo: commons('colonne-victoire', 'Patrick Despoix', 'CC BY-SA 3.0', '021_-_Place_de_la_Victoire_-_Bordeaux.jpg', {
      x: 88,
      y: 50,
      zoom: 2,
    }),
    hints: ["C'est la colonne en pierre rose, place de la Victoire.", 'Les animaux sont lents… et ont une carapace.'],
    story:
      'Ce sont des tortues ! La colonne est une œuvre contemporaine, installée au début des années 2000. Des plaques en bronze décorent sa base : regarde les dessins de près, que racontent-ils ?',
  }),
  place({
    id: 'seed-victoire-statues',
    title: "Les deux statues de l'ancienne faculté",
    category: 'sculpture',
    difficulty: 2,
    lat: 44.83128,
    lng: -0.57196,
    challenge: "Devant un grand bâtiment de la place, deux statues de femmes se font face. L'une d'elles retire le voile qui couvre sa tête. Trouve-les.",
    photo: rb(
      'victoire-nature',
      'Bordeaux_-_Place_de_la_Victoire_-_La_Nature_se_d%C3%A9voilant_devant_la_Science_(Louis-Ernest_Barrias)_01.jpg',
      { x: 48, y: 20, zoom: 2.5 },
    ),
    hints: ["Devant l'ancienne faculté de médecine, place de la Victoire.", 'Elles sont devant la façade du bâtiment.'],
    story:
      "La première s'appelle « La Nature se dévoilant devant la Science », du sculpteur Louis-Ernest Barrias. En face, « La Science », de Jules Cavelier. Le bâtiment était une faculté de médecine : l'idée, c'est que la science découvre les secrets de la nature.",
  }),
  place({
    id: 'seed-fontaine-wallace',
    title: 'La fontaine Wallace',
    category: 'fontaine',
    difficulty: 1,
    lat: 44.832315,
    lng: -0.572724,
    challenge: 'Quatre dames portent un dôme sur leur tête. Trouve cette fontaine vert foncé.',
    photo: commons(
      'fontaine-wallace',
      'Chabe01',
      'CC BY-SA 4.0',
      'Fontaine_Wallace_Place_G%C3%A9n%C3%A9ral_Sarrail_-_Bordeaux_(FR33)_-_2022-09-10_-_1.jpg',
      { x: 50, y: 36, zoom: 2.5 },
    ),
    hints: ['Place du Général-Sarrail, tout près de la place de la Victoire.', 'Elle est au milieu de la place piétonne, entre les terrasses.'],
    story:
      "Ce modèle de fontaine a été imaginé dans les années 1870 par Richard Wallace, un riche Anglais qui voulait que tout le monde puisse boire de l'eau gratuitement dans les rues de Paris. Le modèle a eu tellement de succès qu'on l'a ensuite installé dans d'autres villes, dont Bordeaux. Les quatre dames s'appellent la Bonté, la Simplicité, la Charité et la Sobriété. Regarde bien leurs visages et leurs robes : sont-elles vraiment identiques ?",
  }),
  place({
    id: 'seed-spiritains',
    title: 'La rosace de la chapelle des Spiritains',
    category: 'eglise',
    difficulty: 2,
    lat: 44.83205,
    lng: -0.57033,
    challenge: 'Tout en haut de la façade de cette chapelle, une rosace est entourée de pointes de pierre. Trouve-la.',
    photo: rb('spiritains', 'Bordeaux_-_Rue_Gratiolet_-_Chapelle_des_Spiritains_-_Sommet_de_la_fa%C3%A7ade.jpg', {
      x: 50,
      y: 38,
      zoom: 2.5,
    }),
    hints: ['Rue Gratiolet.', "La rue est étroite : recule autant que tu peux et lève la tête."],
    story:
      "Les petites pointes sculptées qui hérissent la façade s'appellent des pinacles. Ce style imite les églises gothiques du Moyen Âge : quand on le construit bien plus tard, on l'appelle néo-gothique. Combien de pinacles comptes-tu ?",
  }),
  place({
    id: 'seed-leyteire-coquille',
    title: 'Les coquilles de la rue Leyteire',
    category: 'plaque',
    difficulty: 2,
    lat: 44.83249,
    lng: -0.56968,
    challenge: 'Une plaque de rue un peu spéciale est décorée de deux coquillages. Trouve-la !',
    photo: rb(
      'leyteire-coquille',
      'Bordeaux_-_Rue_Leyteire_-_Plaque_Chemins_Saint-Jacques-de-Compostelle.jpg',
      { x: 50, y: 50, zoom: 3 },
    ),
    hints: ['Rue Leyteire.', "Lis la petite ligne écrite sous le nom de la rue."],
    story:
      "La coquille Saint-Jacques est le symbole des pèlerins qui marchent jusqu'à Saint-Jacques-de-Compostelle, en Espagne. Un des grands chemins passe par Bordeaux, et cette rue en fait partie. Certains pèlerins font plus de 1 000 km à pied !",
  }),
  place({
    id: 'seed-larrieu-triton',
    title: 'Le triton de la place Amédée-Larrieu',
    category: 'fontaine',
    difficulty: 1,
    lat: 44.83037,
    lng: -0.58148,
    challenge: 'Dans une fontaine, un personnage mi-homme mi-poisson se bat avec un poisson… qui a des ailes !',
    photo: rb(
      'larrieu-triton',
      'Bordeaux_-_Place_Amédée_Larrieu_-_Fontaine_(Raoul_Verlet)_-_Triton_terrassant_un_poisson_volant.jpg',
      { x: 50, y: 40, zoom: 2 },
    ),
    hints: ['Place Amédée-Larrieu.', 'Il y a plusieurs fontaines sur la place : cherche celle du poisson volant.'],
    story:
      "Un triton, dans la mythologie grecque, c'est une créature marine moitié homme, moitié poisson. Ces fontaines sont l'œuvre du sculpteur Raoul Verlet. Fais le tour de la place : quelles autres créatures marines trouves-tu ?",
  }),
]
