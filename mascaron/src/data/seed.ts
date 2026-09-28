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

// Vue extraite d'une photo Panoramax (photos de rue libres, OpenStreetMap France / IGN)
const panoramax = (file: string, author: string, license: string, pic: string, focus?: Photo['focus']): Photo => ({
  url: `${import.meta.env.BASE_URL}seed/${file}.jpg`,
  author: `${author} (Panoramax)`,
  license,
  sourceUrl: `https://api.panoramax.xyz/#focus=pic&pic=${pic}`,
  focus,
})
const ETALAB = 'Licence Ouverte 2.0'

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
      { x: 67, y: 52, zoom: 2 },
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
    title: 'La fresque du square de la Croix-du-Sud',
    category: 'street-art',
    difficulty: 1,
    lat: 44.81764,
    lng: -0.57383,
    challenge:
      'Dans ce petit square de la rue Jean-Mermoz, une fresque se cache près de la boîte à livres. Trouve-la et invente-lui un titre !',
    hints: ['Square de la Croix-du-Sud, rue Jean-Mermoz.', 'Commence par chercher la boîte à livres.'],
    story:
      "Le square porte le nom de la « Croix-du-Sud », l'hydravion à bord duquel le pilote Jean Mermoz a disparu au-dessus de l'océan Atlantique le 7 décembre 1936. Voilà pourquoi il est rue Jean-Mermoz ! La fresque est l'œuvre de l'artiste Rouge Hartley, peinte en 2021. Cherche sa signature !",
  }),
  place({
    id: 'seed-octroi-toulouse',
    title: "L'octroi de la barrière de Toulouse",
    category: 'plaque',
    difficulty: 2,
    lat: 44.814859,
    lng: -0.572473,
    challenge:
      "Cette petite maison de briques rouges et de pierre servait à faire payer une taxe à ceux qui entraient dans Bordeaux avec des marchandises. Trouve-la ! Bonus : aux angles, les pierres blanches alternent longues et courtes. À quoi ça te fait penser ?",
    photo: panoramax('octroi-toulouse', 'AlbaireN', 'CC BY-SA 4.0', 'ce4a678d-9784-4a0f-a919-0443df2fe8f8', {
      x: 45,
      y: 45,
      zoom: 1,
    }),
    hints: ['À la barrière de Toulouse, au bout du cours de la Somme.', 'Elle fait l’angle, avec une porte bleue.'],
    story:
      "L'octroi, c'était une taxe sur ce qui entrait en ville : vin, viande, bois… Les « barrières » de Bordeaux (de Toulouse, de Bègles, Saint-Genès…) étaient les portes d'entrée où l'on payait. Le nom est resté, même si la taxe a disparu depuis longtemps. Et ces pierres d'angle, longues puis courtes ? On appelle ça une chaîne d'angle « en harpe » : elles s'emboîtent dans la brique comme les dents d'une fermeture éclair, pour rendre le coin de la maison plus solide.",
  }),
  place({
    id: 'seed-fresque-croix-du-sud',
    title: 'La fresque à la fleur blanche',
    category: 'street-art',
    difficulty: 1,
    lat: 44.816719,
    lng: -0.576044,
    challenge:
      "Sur le grand pignon d'une maison, au bord d'un carrefour, on a peint un rocher, la mer, un coucher de soleil… et une grande fleur blanche. Trouve-la !",
    photo: panoramax('fresque-croix-du-sud', 'trouyer', 'CC BY-SA 4.0', '8fdfccdf-56a0-4220-ba75-332ece9455ad', {
      x: 85,
      y: 36,
      zoom: 1,
    }),
    hints: ['Regarde les grands murs sans fenêtre.', 'La maison abrite une laverie.'],
    story:
      "Les fresques de rue changent : en 2020, ce même mur portait une tout autre fresque, noire, avec les mots « Climax – Global warming » (le réchauffement de la planète). Elle a été remplacée par ce paysage. Prends-le en photo, il ne sera peut-être plus là dans quelques années ! Si tu trouves la signature de l'artiste, note-la.",
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
      "Comme à la barrière de Toulouse, un ancien bureau d'octroi garde l'entrée de la ville. Sous la pointe de son toit, une fenêtre ronde regarde le carrefour comme un œil. Trouve-la !",
    photo: panoramax('octroi-saint-genes', 'Bordeaux Métropole', ETALAB, '9c422341-a1cf-4c2d-aaf2-079b40e37a3d', {
      x: 79,
      y: 16,
      zoom: 3,
    }),
    hints: ['Près de la barrière Saint-Genès, sur les boulevards.', 'Une maison de briques rouges et de pierre, comme celle de la barrière de Toulouse.'],
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
    challenge: 'Derrière une grille, une croix de pierre se dresse sur une haute colonne. Trouve-la, et regarde qui est représenté dessus.',
    photo: panoramax('croix-saint-genes', 'Bordeaux Métropole', ETALAB, '67b77492-cf40-46db-a375-782d6d48f00b', {
      x: 50,
      y: 31,
      zoom: 1,
    }),
    hints: ["Tout près de l'ancien octroi de Saint-Genès.", 'Place Louis-Barthou, contre un vieux mur de pierre.'],
    story:
      "Autrefois, on plantait des croix au bord des routes, aux carrefours ou à l'entrée des villages. Celle-ci porte le Christ en croix : on appelle ça un calvaire. Sur le pilier de pierre juste à côté, une plaque est fixée : que raconte-t-elle ?",
  }),

  // ---------- Quartier Saint-Genès ----------
  place({
    id: 'seed-notre-dame-des-anges',
    title: 'La dame aux anges de la rue de Pessac',
    category: 'eglise',
    difficulty: 2,
    lat: 44.82594,
    lng: -0.58806,
    challenge:
      "Sur le grand pignon gris d'une église, un bas-relief montre une dame entourée d'anges. Et sous les arcades de l'entrée, deux petites têtes sculptées te regardent. Trouve-les !",
    photo: commons(
      'notre-dame-des-anges',
      'JeanWilhelm',
      'CC0',
      '%C3%89glise_Notre_Dame_des_Anges_d%C3%A9cembre_2024.jpg',
      { x: 44, y: 62, zoom: 2.5 },
    ),
    hints: ['Rue de Pessac, près de la gare de Bordeaux-Ségur.', 'L’entrée est sous trois grandes arcades, à côté d’un haut clocher carré.'],
    story:
      "C'est l'église Notre-Dame-des-Anges : la dame du bas-relief, c'est Marie (« Notre-Dame »), et les anges autour d'elle donnent son nom à l'église. Les petites têtes sculptées sous les arcades ressemblent à des mascarons : regarde-les bien, ont-elles des ailes ?",
  }),
  place({
    id: 'seed-dames-de-la-foi',
    title: 'La chapelle des Dames de la Foi',
    category: 'eglise',
    difficulty: 2,
    lat: 44.82548,
    lng: -0.58215,
    challenge:
      "Cette carte postale a plus de 100 ans : elle montre la chapelle d'une grande école de la rue de Saint-Genès. Est-elle toujours là ? Cherche ses hautes fenêtres pointues et sa rosace.",
    photo: commons(
      'dames-de-la-foi',
      'Auteur inconnu (carte postale, vers 1900-1920)',
      'Domaine public',
      'Bordeaux_-_Dames_de_la_Foi_1.jpg',
    ),
    hints: ['Au numéro 171 de la rue de Saint-Genès.', 'Essaie de l’apercevoir depuis le jardin des Dames de la Foi.'],
    story:
      "Les Dames de la Foi étaient des religieuses qui tenaient ici un pensionnat : d'autres cartes postales de la même époque montrent la cour de récréation, le parc et même une grotte de Lourdes. Une partie du parc est aujourd'hui un jardin public. Compare avec la carte postale : qu'est-ce qui a changé en 100 ans ?",
  }),
  place({
    id: 'seed-christ-redempteur',
    title: 'Le clocher carré du Christ-Rédempteur',
    category: 'eglise',
    difficulty: 1,
    lat: 44.81888,
    lng: -0.58285,
    challenge:
      "Juste après la barrière Saint-Genès, un clocher carré se dresse à côté d'une petite chapelle aux portes rouges. Trouve-le, puis fais le tour : ses fenêtres en arc sont-elles les mêmes sur chaque face ?",
    photo: commons(
      'christ-redempteur',
      'Symac',
      'CC BY-SA 3.0',
      'Chapelle_du_christ_r%C3%A9dempteur_(Talence).jpg',
      { x: 73, y: 18, zoom: 1 },
    ),
    hints: ['Côté Talence, à deux pas de la barrière Saint-Genès.', 'Cherche une tour carrée plus haute que les maisons.'],
    story:
      "« Rédempteur », ça veut dire « celui qui sauve » : c'est un autre nom donné au Christ. Ici, tu n'es plus à Bordeaux mais à Talence : la limite entre les deux villes passe juste à côté, à la barrière Saint-Genès.",
  }),

  // ---------- Pavés de mémoire ----------
  place({
    id: 'seed-memoire-borruel',
    title: 'Pavés de mémoire de Marcelle et Ginette Borruel',
    category: 'memoire',
    difficulty: 3,
    lat: 44.821321,
    lng: -0.576235,
    challenge:
      'Au sol, deux petits pavés dorés portent les prénoms de deux sœurs. Trouve-les : en quelle année est née la plus jeune ?',
    hints: ['Marche en regardant le trottoir, devant les portes.', 'Les pavés sont carrés, pas plus grands que ta main.'],
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
    challenge:
      'Deux pavés dorés, avec le même nom de famille, sont scellés dans le trottoir. Trouve-les : en quelle année ont-ils été arrêtés ?',
    hints: ['Marche en regardant le trottoir, devant les portes.', 'Ils sont côte à côte, au pied d’une maison.'],
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
    challenge:
      'Encore deux pavés dorés, cette fois au nom de Cantelaube. Trouve-les et lis les dates : te rappellent-elles d’autres pavés du quartier ?',
    hints: ['Ils sont loin des autres pavés du quartier : regarde bien le point sur la carte.', 'Regarde le trottoir, devant les portes.'],
    story:
      "« Ici habitait… » Jean Cantelaube, né en 1910, arrêté le 22 novembre 1940, interné au camp de Mérignac-Beaudésert, assassiné au camp de Souge le 24 octobre 1941. Germaine Cantelaube, née en 1908, arrêtée le 28 août 1942, internée au fort du Hâ puis à Romainville, déportée en 1943 à Auschwitz, où elle a été assassinée. Ces pavés ont été posés en 2025. As-tu remarqué ? Robert et Georgette Bret ont été arrêtés exactement les mêmes jours que Jean et Germaine.",
  }),

  // ---------- Vers le Sacré-Cœur ----------
  place({
    id: 'seed-galard-plaque',
    title: 'Le numéro caché de la rue de Galard',
    category: 'plaque',
    difficulty: 3,
    lat: 44.82244,
    lng: -0.56945,
    challenge: 'Juste au-dessus du nom de la rue, une toute petite plaque se cache. Trouve-la et lis ce qui est écrit dessus.',
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
      { x: 54, y: 28, zoom: 1 },
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
      { x: 60.5, y: 77, zoom: 1 },
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
      "C'est un repère de nivellement : les géomètres en ont posé partout en France pour mesurer l'altitude au centimètre près. Cherche-en d'autres : on en trouve sur les églises, les mairies, les ponts… Lis ce qui est écrit autour du disque : « CUB », c'est l'ancienne Communauté urbaine de Bordeaux, devenue Bordeaux Métropole.",
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
      zoom: 1,
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
      zoom: 1,
    }),
    hints: ['Passage des Citernes.', 'Viens à la tombée de la nuit : elles s’illuminent.'],
    story:
      "Il y a quatre cuves ! C'est un ancien château d'eau : les cuves en hauteur gardaient de l'eau sous pression pour la distribuer. Il a été conservé au milieu du nouveau quartier. Juste à côté se cache un personnage de street art très célèbre : le Gouzou !",
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
    challenge:
      "Au coin de la rue, une peinture pleine de couleurs recouvre l'ancienne vitrine d'une boutique. Trouve-la et décris-la en trois mots.",
    photo: panoramax('fresque-fonfrede', 'AlbaireN', 'CC BY-SA 4.0', '50ee757d-c15a-4ff2-b66a-a6e5275d7ce0', {
      x: 49,
      y: 66,
      zoom: 2.5,
    }),
    hints: ["À l'angle de la rue Fonfrède et du cours de la Somme.", 'Elle est au rez-de-chaussée, juste à côté d’un panneau sens interdit.'],
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
      zoom: 1,
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
      { x: 50, y: 40, zoom: 1 },
    ),
    hints: ['Cours de la Marne, vers les numéros 60-62.', 'Lève la tête, au niveau du premier étage.'],
    story:
      "On trouve à Bordeaux beaucoup de niches avec des statuettes : des saints, des personnages, parfois des vierges. Celui-ci est bien étrange : observe-le, que tient-il au bout de son bras levé ? Sous la niche, des lettres sont gravées dans la pierre : arrives-tu à les lire ?",
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
      x: 90,
      y: 82,
      zoom: 3,
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
      { x: 48, y: 20, zoom: 1 },
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
      { x: 50, y: 36, zoom: 1 },
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
      zoom: 1,
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
      { x: 50, y: 50, zoom: 2 },
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
      { x: 50, y: 40, zoom: 1 },
    ),
    hints: ['Place Amédée-Larrieu.', 'Il y a plusieurs fontaines sur la place : cherche celle du poisson volant.'],
    story:
      "Un triton, dans la mythologie grecque, c'est une créature marine moitié homme, moitié poisson. Lève les yeux au-dessus de lui : la tête qui crache l'eau, sous l'inscription, c'est un mascaron ! Ces fontaines sont l'œuvre du sculpteur Raoul Verlet. Fais le tour de la place : quelles autres créatures marines trouves-tu ?",
  }),

  place({
    id: 'seed-bourse-du-travail',
    title: 'Le grand bas-relief de la Bourse du travail',
    category: 'sculpture',
    difficulty: 1,
    lat: 44.832039,
    lng: -0.577602,
    challenge:
      "Sur la façade d'un grand bâtiment aux lignes toutes droites, un immense bas-relief blanc est sculpté, plein de personnages. Trouve-le, puis lis la date gravée juste au-dessus !",
    photo: commons('bourse-du-travail', 'JeanWilhelm', 'CC0', 'Bourse_du_Travail_Bordeaux.jpg', { x: 20, y: 50, zoom: 2.5 }),
    hints: ['Cours Aristide-Briand.', 'Les mots « Bourse du travail » sont gravés juste au-dessus.'],
    story:
      "La Bourse du travail, c'est la maison des syndicats : les travailleurs s'y réunissent pour défendre leurs droits. Le bâtiment date des années 1930 et il est de style Art déco : des lignes droites, de grandes fenêtres et des sculptures très géométriques. Compte les personnages du bas-relief : que font-ils ? Chacun représente peut-être un métier…",
  }),

  // ---------- Rue du Mirail / cours Victor-Hugo ----------
  place({
    id: 'seed-mirail-marin',
    title: 'Le vieux marin de la rue du Mirail',
    category: 'sculpture',
    difficulty: 2,
    lat: 44.832848,
    lng: -0.57091,
    challenge:
      "Au-dessus d'une grande porte, un visage d'homme barbu est entouré d'écailles de poisson et de pinces de homard. Trouve ce vieux marin !",
    photo: commons(
      'mirail-marin',
      'Langladure',
      'CC BY-SA 3.0',
      'Bordeaux_Mascaron_rue_du_Mirail_marin.JPG',
      { x: 50, y: 50, zoom: 1 },
    ),
    hints: ['Rue du Mirail.', "Il est au numéro 54, tout en haut de l'arc de la porte."],
    story:
      "Voilà un vrai mascaron, comme le nom de ce jeu ! Il est sculpté sur la clé de voûte : la pierre du milieu de l'arc, celle qui tient toutes les autres. Les écailles et les pinces rappellent la mer : à cette époque, Bordeaux vivait de son port et du commerce par bateau. D'après la personne qui l'a photographié, il daterait de 1720. Promène-toi dans la rue : d'autres visages de pierre te regardent passer…",
  }),
  place({
    id: 'seed-mirail-saint-francois',
    title: 'Les petits anges de la rue du Mirail',
    category: 'facade',
    difficulty: 2,
    lat: 44.834043,
    lng: -0.571097,
    challenge:
      "Au-dessus d'une immense porte de bois sculptée, trois petits anges jouent autour d'une coquille. Et de chaque côté, deux personnages de pierre portent le balcon !",
    photo: commons(
      'mirail-saint-francois',
      'Fran Roy',
      'CC BY-SA 4.0',
      "Porte_de_l'H%C3%B4tel_Saint-Fran%C3%A7ois_rue_du_Mirail.jpg",
      { x: 54, y: 27, zoom: 3 },
    ),
    hints: ['Rue du Mirail, du côté du cours Victor-Hugo.', 'Le numéro 22 est sculpté dans le bois de la porte.'],
    story:
      "Ces petits anges joufflus s'appellent des « putti » (un « putto », en italien). Les personnages qui soutiennent un balcon s'appellent des atlantes quand ce sont des hommes, et des cariatides quand ce sont des femmes. Et ceux-là, hommes ou femmes ? Regarde aussi la porte : on y lit encore le numéro 22.",
  }),
  place({
    id: 'seed-menuts-cariatides',
    title: 'Les dames de pierre de la rue des Menuts',
    category: 'facade',
    difficulty: 2,
    lat: 44.83509,
    lng: -0.568008,
    challenge:
      "Au rez-de-chaussée d'une vieille maison, des dames de pierre soutiennent le balcon, et une autre dame regarde les passants au-dessus d'une porte. Combien sont-elles en tout ?",
    photo: commons('menuts-cariatides', 'Fran Roy', 'CC BY-SA 4.0', 'Rez-de-chauss%C3%A9e_13_rue_des_Menuts.jpg', {
      x: 50,
      y: 60,
      zoom: 1,
    }),
    hints: ['Rue des Menuts, près de Saint-Michel.', 'Au numéro 13.'],
    story:
      "Réponse : trois dames qui soutiennent le balcon, plus un buste au-dessus de la porte de droite, soit quatre en tout. Une statue de femme qui sert de colonne, ça s'appelle une cariatide. Ici, elles sortent d'une sorte de gaine qui se rétrécit vers le bas, comme si elles n'avaient pas de jambes ! La façade est abîmée, mais la maison est protégée comme monument historique. Regarde bien leurs visages : sont-ils tous pareils ?",
  }),
  place({
    id: 'seed-sainte-catherine-christ',
    title: 'La couronne d’épines de la rue Sainte-Catherine',
    category: 'sculpture',
    difficulty: 3,
    lat: 44.836014,
    lng: -0.573482,
    challenge:
      "Au-dessus d'une fenêtre, sous un balcon, un visage sculpté porte une couronne… d'épines. Trouve-le au milieu de la foule de la rue Sainte-Catherine !",
    photo: commons(
      'sainte-catherine-christ',
      'Langladure',
      'CC BY-SA 4.0',
      "Bordeaux_mascaron_t%C3%AAte_du_Christ_portant_une_couronne_d%27%C3%A9pines.jpg",
      { x: 52, y: 26, zoom: 3 },
    ),
    hints: ['Rue Sainte-Catherine, juste après le cours Victor-Hugo quand on vient de la Victoire.', 'Au numéro 158, lève les yeux vers le premier étage.'],
    story:
      "Ce visage sculpté au-dessus d'une fenêtre, c'est un mascaron ! Il représente la tête du Christ : selon les Évangiles, on lui a posé une couronne d'épines sur la tête avant sa crucifixion. La rue Sainte-Catherine est l'une des plus longues rues piétonnes de France, et presque tout le monde y regarde les vitrines… Toi, tu sais maintenant qu'il faut lever les yeux !",
  }),
  place({
    id: 'seed-grosse-cloche',
    title: 'La Grosse Cloche',
    category: 'monument',
    difficulty: 1,
    lat: 44.835446,
    lng: -0.571357,
    challenge:
      "Entre deux tours pointues, une énorme cloche est suspendue au-dessus d'une horloge. Trouve-les ! Et tout en haut, regarde la girouette dorée : quel animal représente-t-elle ?",
    photo: commons(
      'grosse-cloche',
      'Grand Parc – Bordeaux (Flickr)',
      'CC BY 2.0',
      'Bordeaux_-_La_Grosse_Cloche-cr.jpg',
      { x: 49, y: 44, zoom: 1 },
    ),
    hints: ['Cours Victor-Hugo.', 'Elle enjambe une petite rue : on passe dessous !'],
    story:
      "La Grosse Cloche était le beffroi de l'ancien hôtel de ville de Bordeaux : on la sonnait pour appeler les habitants ou annoncer les grands événements. Elle date du XVᵉ siècle, et sa cloche pèse près de 8 tonnes ! La girouette est un léopard doré, un symbole de la Guyenne, l'ancien nom de la région.",
  }),

  // ---------- Saint-Michel / Sainte-Croix ----------
  place({
    id: 'seed-fleche-saint-michel',
    title: 'La flèche Saint-Michel',
    category: 'eglise',
    difficulty: 1,
    lat: 44.834359,
    lng: -0.565941,
    challenge:
      "Ce clocher géant se voit de très loin… et il n'est même pas collé à son église ! Trouve-le, puis cherche l'église dont il est le clocher.",
    photo: commons('fleche-saint-michel', 'Kaelkael', 'CC BY-SA 3.0', 'Clocher-Saint-Michel.JPG', {
      x: 50,
      y: 20,
      zoom: 1,
    }),
    hints: ['Quartier Saint-Michel, près de la Garonne.', 'Cherche le plus haut clocher de Bordeaux.'],
    story:
      "Avec ses 114 mètres, c'est la plus haute flèche du sud de la France ! Elle a été construite séparée de la basilique Saint-Michel, un peu comme un phare. Longtemps, son caveau a abrité des momies que l'on venait visiter en frissonnant.",
  }),
  place({
    id: 'seed-sainte-croix-portail',
    title: 'Le portail sculpté de Sainte-Croix',
    category: 'eglise',
    difficulty: 2,
    lat: 44.8311,
    lng: -0.5615,
    challenge:
      "Autour d'une porte rouge, des arcs de pierre sont couverts de petits personnages, d'animaux et de feuillages sculptés il y a plus de 800 ans. Trouve un animal !",
    photo: commons(
      'sainte-croix-portail',
      'William Ellison',
      'CC BY-SA 4.0',
      'Bordeaux_Ste-Croix_Portail_1.jpg',
      { x: 50, y: 30, zoom: 2.5 },
    ),
    hints: ['Place Pierre-Renaudel, juste à côté de l’école des Beaux-Arts.', 'C’est la grande porte au milieu de la façade.'],
    story:
      "L'abbatiale Sainte-Croix a une façade romane du XIIᵉ siècle : c'est l'un des plus vieux monuments de Bordeaux. Les sculpteurs du Moyen Âge racontaient des histoires en images, car peu de gens savaient lire. Recule sur la place et regarde les deux tours : sont-elles pareilles ? L'une d'elles a été reconstruite bien plus tard, au XIXᵉ siècle.",
  }),
  place({
    id: 'seed-chapelle-orthodoxe',
    title: 'La croix à barre penchée',
    category: 'eglise',
    difficulty: 2,
    lat: 44.83007,
    lng: -0.55957,
    challenge:
      "Sur la façade d'une petite chapelle, une croix n'est pas comme les autres : l'une de ses barres est penchée. Trouve-la !",
    photo: commons('chapelle-orthodoxe', 'Symac', 'CC BY-SA 3.0', 'Bordeaux_-_Chapelle_orthodoxe.jpg', {
      x: 50,
      y: 42,
      zoom: 2.5,
    }),
    hints: ['Rue Peyronnet, près de Sainte-Croix.', 'Lève les yeux : une petite cloche est posée sur le toit.'],
    story:
      "C'est une croix orthodoxe, comme on en voit surtout en Russie et en Europe de l'Est. La petite barre du haut représente l'écriteau cloué au-dessus du Christ, et la barre penchée du bas le support pour ses pieds. Et toi, de quel côté penche-t-elle ?",
  }),

  // ---------- Centre : place de la Bourse / Saint-Pierre ----------
  place({
    id: 'seed-porte-cailhau',
    title: 'La porte Cailhau',
    category: 'monument',
    difficulty: 1,
    lat: 44.838794,
    lng: -0.568481,
    challenge:
      "On dirait l'entrée d'un château de conte de fées, avec ses toits pointus. Trouve cette vieille porte de la ville, et passe dessous : que découvres-tu de l'autre côté ?",
    photo: commons('porte-cailhau', 'Marc Ryckaert (MJJR)', 'CC BY-SA 3.0', 'Bordeaux_Porte_Cailhau_R01.jpg', {
      x: 50,
      y: 50,
      zoom: 1,
    }),
    hints: ['Quartier Saint-Pierre, tout près des quais.', 'Place du Palais.'],
    story:
      "De l'autre côté, c'est la Garonne ! La porte Cailhau a été construite vers 1495, en l'honneur d'une victoire du roi Charles VIII en Italie. C'était une des portes des remparts, côté fleuve : les bateaux accostaient juste devant. Son nom viendrait du gascon « cailhau », le caillou : peut-être à cause des galets que déchargeaient les bateaux.",
  }),
  place({
    id: 'seed-parlement-mascarons',
    title: 'Les barbus de la fontaine du Parlement',
    category: 'fontaine',
    difficulty: 2,
    lat: 44.840616,
    lng: -0.572038,
    challenge:
      "Au milieu d'une jolie place entourée de terrasses, une fontaine a des visages barbus qui crachent de l'eau. Trouve-les !",
    photo: commons('parlement-mascaron', 'Langladure', 'CC BY-SA 3.0', 'Bordeaux_Mascaron_fontaine_du_Parlement.JPG', {
      x: 50,
      y: 40,
      zoom: 1,
    }),
    hints: ['Place du Parlement.', 'Fais le tour du bassin et regarde sous la grande vasque.'],
    story:
      "Ces visages qui crachent l'eau sont des mascarons ! La fontaine a été installée en 1865, dessinée par l'architecte bordelais Louis Garros. La place s'appelle « du Parlement » en souvenir du Parlement de Bordeaux, un grand tribunal d'autrefois. Fais le tour : les visages sont-ils tous pareils ?",
  }),
  place({
    id: 'seed-trois-graces',
    title: 'La fontaine des Trois Grâces',
    category: 'fontaine',
    difficulty: 1,
    lat: 44.8415,
    lng: -0.57002,
    challenge:
      "Au milieu d'une immense place ouverte sur le fleuve, trois dames de bronze se tiennent dos à dos au-dessus d'une fontaine. Trouve-les !",
    photo: commons('trois-graces', 'Romainbehar', 'CC0', 'Bordeaux_-_Fontaine_des_Trois_Gr%C3%A2ces_15.jpg', {
      x: 50,
      y: 40,
      zoom: 1,
    }),
    hints: ['Place de la Bourse.', 'Juste en face du miroir d’eau.'],
    story:
      "Les trois Grâces sont des déesses de la mythologie grecque : elles représentent la beauté, la joie et la gaieté. La fontaine date du XIXᵉ siècle. Avant elle, une statue du roi Louis XV se dressait ici, sur ce qui s'appelait alors la « place Royale » ; elle a été renversée à la Révolution. Bonus : traverse la rue et va te regarder dans le miroir d'eau !",
  }),
  place({
    id: 'seed-bourse-neptune',
    title: 'Le monstre des mers de la place de la Bourse',
    category: 'sculpture',
    difficulty: 3,
    lat: 44.8421,
    lng: -0.570287,
    challenge:
      "Autour de la place, presque chaque fenêtre en arc a son visage sculpté. Parmi eux, trouve celui-ci : un barbu hirsute, la bouche ouverte, avec des sortes d'ailes de chaque côté.",
    photo: commons('bourse-neptune', 'Langladure', 'CC BY-SA 3.0', 'Bordeaux_Mascaron_Place_de_la_Bourse_Neptune.JPG', {
      x: 50,
      y: 50,
      zoom: 1,
    }),
    hints: ['Place de la Bourse : fais le tour des façades.', 'Regarde juste au-dessus des fenêtres du rez-de-chaussée, sous les balcons dorés.'],
    story:
      "C'est un mascaron : on pense qu'il représente Neptune, le dieu de la mer, ou un monstre marin. Sur la place de la Bourse, il y en a des dizaines, tous différents : dieux, hommes, femmes, créatures… Ils rappellent que Bordeaux était un grand port, qui vivait de la mer et du commerce. Lequel est ton préféré ?",
  }),

  // ---------- Centre : Pey-Berland / cathédrale ----------
  place({
    id: 'seed-pey-berland',
    title: 'La dame dorée de la tour Pey-Berland',
    category: 'eglise',
    difficulty: 1,
    lat: 44.837619,
    lng: -0.576556,
    challenge:
      "Une haute tour de pierre, toute seule à côté de la cathédrale… Tout en haut, une statue dorée brille au soleil. Trouve-la !",
    photo: commons('pey-berland', 'W. Bulach', 'CC BY-SA 4.0', '00_0479_Bordeaux_-_Tour_Pey_Berland.jpg', {
      x: 50,
      y: 50,
      zoom: 1,
    }),
    hints: ['Place Pey-Berland, à côté de la cathédrale Saint-André.', 'Lève la tête, tout en haut de la flèche.'],
    story:
      "C'est le clocher de la cathédrale, construit à part au XVᵉ siècle : on dit que c'était pour que les vibrations des cloches n'abîment pas la cathédrale. Il porte le nom de Pey Berland, l'archevêque de Bordeaux qui l'a fait construire. La statue dorée, Notre-Dame d'Aquitaine, a été ajoutée au XIXᵉ siècle. Avec elle, la tour mesure environ 66 mètres. On peut monter tout en haut, par un escalier en colimaçon !",
  }),
  place({
    id: 'seed-portail-royal',
    title: 'Les morts qui se réveillent du portail royal',
    category: 'eglise',
    difficulty: 2,
    lat: 44.83774,
    lng: -0.57807,
    challenge:
      "Au-dessus d'une grande porte rouge de la cathédrale, une rangée de petits personnages de pierre soulèvent le couvercle de leur tombeau pour en sortir ! Trouve-les.",
    photo: commons(
      'portail-royal',
      'GO69',
      'CC BY-SA 4.0',
      'Bordeaux_(33)_Cath%C3%A9drale_Saint-Andr%C3%A9_Portail_royal_03.JPG',
      { x: 50, y: 15, zoom: 2 },
    ),
    hints: ['Cathédrale Saint-André.', 'Ce n’est pas la grande façade : fais le tour, la porte royale est sur un côté.'],
    story:
      "C'est le portail royal, sculpté au Moyen Âge, il y a plus de 700 ans. Il raconte le Jugement dernier : tout en haut, le Christ, et juste au-dessus de la porte, les morts qui sortent de leurs tombeaux pour être jugés. Regarde bien leurs visages et leurs gestes : les sculpteurs ont donné à chacun une attitude différente.",
  }),
  place({
    id: 'seed-gloria-victis',
    title: 'L’ange de Gloria Victis',
    category: 'sculpture',
    difficulty: 1,
    lat: 44.838375,
    lng: -0.577561,
    challenge:
      "Un grand ange de bronze aux ailes déployées emporte un jeune soldat dans ses bras. Trouve cette statue, et lis les deux mots latins gravés sur son socle.",
    photo: commons(
      'gloria-victis',
      'Romainbehar',
      'CC0',
      'Bordeaux_-_Place_Jean_Moulin_-_Gloria_Victis_(Antonin_Merci%C3%A9)_01.jpg',
      { x: 50, y: 40, zoom: 1 },
    ),
    hints: ['Place Jean-Moulin, derrière la cathédrale.', 'Juste au nord de la cathédrale.'],
    story:
      "« Gloria victis » veut dire « Gloire aux vaincus » en latin. Le sculpteur Antonin Mercié a imaginé cette œuvre après la défaite de la France dans la guerre de 1870 : la Gloire, une femme ailée, emporte un soldat mort au combat. C'est une façon de dire que même ceux qui perdent méritent d'être honorés.",
  }),
  place({
    id: 'seed-porte-dijeaux',
    title: 'La porte Dijeaux',
    category: 'monument',
    difficulty: 1,
    lat: 44.8406,
    lng: -0.579722,
    challenge:
      "Une grande porte en arc, toute seule au milieu de la rue : on passe dessous sans rien ouvrir ! Trouve-la, et regarde le blason sculpté tout en haut : que vois-tu dessus ?",
    photo: commons('porte-dijeaux', 'Gzen92', 'CC BY-SA 4.0', 'Porte_Dijeaux_(Bordeaux).jpg', { x: 50, y: 30, zoom: 1 }),
    hints: ['Place Gambetta, côté centre-ville.', 'Elle fait le bout de la rue Porte-Dijeaux.'],
    story:
      "La porte Dijeaux a été construite au XVIIIᵉ siècle, à l'endroit d'une ancienne porte des remparts. Son nom viendrait du latin « porta Jovis », la porte de Jupiter, le roi des dieux romains. Aujourd'hui, les remparts ont disparu : il ne reste que la porte, comme un décor au milieu de la rue.",
  }),

  // ---------- Centre : Grand-Théâtre / Quinconces / quais ----------
  place({
    id: 'seed-grand-theatre',
    title: 'Les statues du Grand-Théâtre',
    category: 'sculpture',
    difficulty: 1,
    lat: 44.8425,
    lng: -0.573611,
    challenge:
      "Sur le toit de ce grand théâtre à colonnes, des statues se tiennent en rang, au-dessus de la place. Trouve-les et compte-les !",
    photo: commons('grand-theatre', 'Marc Ryckaert (MJJR)', 'CC BY-SA 3.0', 'Bordeaux_Grand_Th%C3%A9%C3%A2tre_R01.jpg', {
      x: 50,
      y: 40,
      zoom: 1,
    }),
    hints: ['Place de la Comédie.', 'Lève les yeux au-dessus des douze colonnes.'],
    story:
      "Il y en a douze, une au-dessus de chaque colonne : neuf Muses (les déesses des arts : musique, danse, théâtre, poésie…) et trois déesses, Junon, Vénus et Minerve. Le Grand-Théâtre a été construit par l'architecte Victor Louis et inauguré en 1780 : on y joue toujours des opéras et des ballets.",
  }),
  place({
    id: 'seed-sanna',
    title: 'Sanna, le visage géant',
    category: 'sculpture',
    difficulty: 1,
    lat: 44.8421,
    lng: -0.5752,
    challenge:
      "À côté du Grand-Théâtre, un immense visage de jeune fille, les yeux fermés, semble rêver au milieu de la place. Trouve-la, puis fais-en le tour : à quoi ressemble-t-elle de côté ?",
    hints: ['Place de la Comédie, côté rue Sainte-Catherine.', 'Elle mesure environ 7 mètres de haut !'],
    story:
      "Elle s'appelle Sanna, c'est une œuvre du sculpteur catalan Jaume Plensa, tout en fonte (un métal très lourd, qui rouille et devient brun-orangé). Elle est arrivée en 2013 pour une exposition en plein air, et un mécène l'a achetée pour la laisser aux Bordelais. Jaume Plensa aime les visages aux yeux fermés : il veut inviter les passants à s'arrêter, à se taire et à rêver un instant. Et toi, à quoi penses-tu qu'elle rêve ?",
  }),
  place({
    id: 'seed-girondins-chevaux',
    title: 'Les chevaux du monument aux Girondins',
    category: 'fontaine',
    difficulty: 1,
    lat: 44.8453,
    lng: -0.574722,
    challenge:
      "Au pied d'une immense colonne, des chevaux de bronze sortent de l'eau en se cabrant, comme s'ils galopaient dans les vagues. Trouve-les !",
    photo: commons(
      'girondins-chevaux',
      'Romainbehar',
      'CC0',
      'Bordeaux_-_Monument_aux_Girondins_-_Fontaine_du_Triomphe_de_la_Concorde_01.jpg',
      { x: 50, y: 40, zoom: 1 },
    ),
    hints: ['Place des Quinconces.', 'Il y a deux bassins, un de chaque côté de la colonne : fais le tour !'],
    story:
      "Ce monument rend hommage aux Girondins, des députés de la Révolution française venus de Gironde et guillotinés en 1793. Pendant la Seconde Guerre mondiale, en 1943, les statues de bronze ont été démontées ; elles ne sont revenues à leur place qu'en 1983. Tout en haut de la colonne, une statue de la Liberté brise ses chaînes.",
  }),
  place({
    id: 'seed-colonnes-rostrales',
    title: 'Les ancres des colonnes rostrales',
    category: 'monument',
    difficulty: 2,
    lat: 44.845763,
    lng: -0.571233,
    challenge:
      "Deux hautes colonnes se dressent face au fleuve, décorées d'avant de bateaux et d'ancres sculptées. Trouve une ancre !",
    photo: commons(
      'colonnes-rostrales',
      'Chabe01',
      'CC BY-SA 4.0',
      'Colonnes_Rostrales_Esplanade_Quinconces_-_Bordeaux_(FR33)_-_2022-09-10_-_3.jpg',
      { x: 50, y: 50, zoom: 1 },
    ),
    hints: ['Au bout de la place des Quinconces, côté Garonne.', 'Les ancres sont sculptées sur le fût des colonnes.'],
    story:
      "« Rostrales » vient de « rostres » : chez les Romains, c'était l'éperon à l'avant des navires de guerre. Ces colonnes, sculptées d'avant de bateaux et d'ancres, rappellent que Bordeaux est un grand port. Tout en haut, deux statues représentent le Commerce et la Navigation. Regarde vers le fleuve : quels bateaux vois-tu passer ?",
  }),
  place({
    id: 'seed-porte-bourgogne',
    title: 'La porte de Bourgogne',
    category: 'monument',
    difficulty: 1,
    lat: 44.8361,
    lng: -0.566111,
    challenge:
      "Une grande arche de pierre, sans porte à ouvrir, se dresse face au fleuve. Trouve-la, passe dessous et regarde vers la Garonne : quel pont vois-tu juste en face ?",
    photo: commons('porte-bourgogne', 'Aubry Françon', 'CC BY-SA 3.0', 'Bordeaux_Porte_de_Bourgogne_Vue_n%C2%B03.jpg', {
      x: 50,
      y: 50,
      zoom: 1,
    }),
    hints: ['Place Bir-Hakeim, au bout du cours Victor-Hugo.', 'Tout près des quais, côté Saint-Michel.'],
    story:
      "Juste en face, c'est le pont de pierre, le plus ancien pont de Bordeaux sur la Garonne. La porte de Bourgogne a été construite au XVIIIᵉ siècle, quand on a remplacé les vieilles portes des remparts par de grandes portes élégantes, comme la porte Dijeaux ou la porte d'Aquitaine. Les as-tu toutes trouvées ?",
  }),

  // ---------- Centre : la chasse aux mascarons ----------
  place({
    id: 'seed-mascaron-hercule',
    title: 'Hercule de la rue Émile-Duployé',
    category: 'sculpture',
    difficulty: 2,
    lat: 44.840373,
    lng: -0.569561,
    challenge: "Au-dessus d'une porte, un homme barbu à l'air costaud te regarde passer. C'est un héros très célèbre ! Trouve-le.",
    photo: commons('mascaron-hercule', 'Als33120', 'CC BY-SA 4.0', 'Bordeaux-P1070376.jpg', { x: 50, y: 50, zoom: 1 }),
    hints: ['Rue Émile-Duployé, près de la place de la Bourse.', 'Au numéro 4 : le numéro est juste à côté de lui.'],
    story:
      "C'est un mascaron qui représente Hercule, le héros de la mythologie, célèbre pour sa force et ses douze travaux. On le montre souvent coiffé de la peau du lion de Némée, qu'il avait vaincu à mains nues : la vois-tu sur sa tête ?",
  }),
  place({
    id: 'seed-mascaron-faune',
    title: 'Le faune de la rue Fernand-Philippart',
    category: 'sculpture',
    difficulty: 2,
    lat: 44.841166,
    lng: -0.570656,
    challenge:
      "Un visage barbu avec des cornes enroulées et un gros nœud sur la tête sourit au-dessus d'une fenêtre. Trouve-le ! Attention, il a beaucoup de voisins…",
    photo: commons(
      'mascaron-faune',
      'Romainbehar',
      'CC0',
      'Bordeaux_-_Rue_Fernand-Philippart_-_Mascaron_aux_cornes_et_au_n%C5%93ud.jpg',
      { x: 50, y: 50, zoom: 1 },
    ),
    hints: ['Rue Fernand-Philippart, juste derrière la place de la Bourse.', 'Toute la façade est couverte de mascarons : cherche celui qui a des cornes.'],
    story:
      "C'est un mascaron ! Avec ses cornes et son sourire malicieux, on dirait un faune, un esprit des bois de la mythologie, mi-homme mi-bouc. Dans cette rue, toute une façade est décorée de visages : compte combien tu en trouves.",
  }),
  place({
    id: 'seed-mascaron-belier',
    title: 'La tête à cornes de la place Porto-Riche',
    category: 'sculpture',
    difficulty: 3,
    lat: 44.841837,
    lng: -0.572242,
    challenge:
      "Au-dessus d'une fenêtre ovale, ce n'est pas un visage humain mais une tête d'animal à cornes, avec une guirlande. Trouve-la !",
    photo: commons('mascaron-belier', 'Langladure', 'CC BY-SA 3.0', 'Bordeaux_mascaron_place_Georges_Porto_Rich%C3%A9.JPG', {
      x: 50,
      y: 40,
      zoom: 1,
    }),
    hints: ['Place Georges-de-Porto-Riche, près de la place du Parlement.', 'Lève les yeux vers le premier étage : la fenêtre est ronde comme un œil.'],
    story:
      "Les mascarons ne sont pas toujours des visages humains : on sculptait aussi des têtes d'animaux. Celle-ci ressemble à un bouc ou à un bélier : à toi de décider ! Une fenêtre ronde ou ovale comme celle-ci s'appelle un « œil-de-bœuf ».",
  }),
  place({
    id: 'seed-mascaron-lion',
    title: 'Le lion de la rue Vital-Carles',
    category: 'sculpture',
    difficulty: 2,
    lat: 44.838994,
    lng: -0.577923,
    challenge: "Au-dessus d'une porte, un lion à la crinière bouclée montre les dents. Trouve-le !",
    photo: commons('mascaron-lion', 'Als33120', 'CC BY-SA 4.0', 'Bordeaux-P1090184.jpg', { x: 50, y: 40, zoom: 1 }),
    hints: ['Rue Vital-Carles, entre la cathédrale et le cours de l’Intendance.', 'Au numéro 44.'],
    story:
      "Un mascaron en forme de lion ! Le lion, roi des animaux, symbolise la force et le courage : placé au-dessus d'une porte, il montre qu'on est chez des gens importants… et il fait un peu peur aux visiteurs. Promène-toi dans la rue Vital-Carles : d'autres visages t'attendent au-dessus des portes des numéros 16, 30 et 40.",
  }),
  place({
    id: 'seed-mascaron-gambetta',
    title: 'La jeune fille de la place Gambetta',
    category: 'sculpture',
    difficulty: 3,
    lat: 44.841583,
    lng: -0.579863,
    challenge:
      "Au-dessus d'une fenêtre, le visage d'une jeune fille aux cheveux bouclés, avec un petit nœud, regarde la place. Trouve-la !",
    photo: commons('mascaron-gambetta', 'Thomon', 'CC BY-SA 4.0', '2_place_Gambetta_mascaron.jpg', { x: 50, y: 50, zoom: 1 }),
    hints: ['Place Gambetta.', 'Au numéro 2.'],
    story:
      "Encore un mascaron ! Tous ne font pas peur : certains représentent de jeunes visages souriants, des saisons ou des déesses. La place Gambetta a été construite au XVIIIᵉ siècle : fais le tour des façades, combien d'autres mascarons trouves-tu ?",
  }),

  // ---------- Quais et rive droite ----------
  place({
    id: 'seed-modeste-testas',
    title: 'Modeste Testas, au bord de la Garonne',
    category: 'memoire',
    difficulty: 1,
    lat: 44.84827,
    lng: -0.56989,
    challenge:
      "Au bord du fleuve, une femme de bronze se tient debout, un foulard sur la tête. À ses pieds, un objet de métal ouvert est posé par terre. Trouve-la, et regarde bien ce que c'est.",
    photo: commons(
      'modeste-testas',
      'Paul Arps',
      'CC BY 2.0',
      'Statue_Marthe_Ad%C3%A9la%C3%AFde_Modeste_Testa_Bordeaux.jpg',
      { x: 50, y: 50, zoom: 1 },
    ),
    hints: ['Sur les quais, en face de la Bourse maritime.', 'Côté Garonne, dans l’herbe, au bout d’une allée pavée.'],
    story:
      "À ses pieds, ce sont des chaînes brisées : le symbole de la liberté retrouvée. Cette statue représente Modeste Testas, une femme née en Afrique, réduite en esclavage et achetée par deux négociants bordelais, les frères Testas, qui l'ont emmenée à Saint-Domingue (l'actuelle Haïti). Elle a été libérée plus tard et a vécu très vieille en Haïti. La statue, œuvre de l'artiste haïtien Woodly Caymitte, a été installée en 2019 pour se souvenir que Bordeaux a participé à la traite des esclaves.",
  }),
  place({
    id: 'seed-gare-orleans',
    title: 'L’ancienne gare d’Orléans',
    category: 'monument',
    difficulty: 1,
    lat: 44.84163,
    lng: -0.562075,
    challenge:
      "Sur la rive droite, une grande façade de pierre avec de longues arcades… C'était une gare ! Trouve-la : qu'y a-t-il aujourd'hui à l'intérieur ?",
    photo: commons(
      'gare-orleans',
      'Jefunky',
      'CC0',
      'Ancienne_gare_d%27Orl%C3%A9ans_(Bordeaux)_en_octobre_2023.jpg',
      { x: 50, y: 50, zoom: 1 },
    ),
    hints: ['Quartier de la Bastide, juste après le pont de pierre.', 'Tout près de la place de Stalingrad et de son grand lion bleu.'],
    story:
      "Aujourd'hui, c'est un cinéma ! Mais au XIXᵉ siècle, c'était la gare d'Orléans : les trains venant de Paris s'arrêtaient ici, sur la rive droite, car il n'y avait pas encore de pont de chemin de fer pour traverser la Garonne. Les voyageurs finissaient le trajet à pied ou en voiture à cheval, par le pont de pierre. Regarde bien la façade : on y devine encore la gare d'autrefois.",
  }),
  place({
    id: 'seed-lion-bleu',
    title: 'Le lion bleu de la place de Stalingrad',
    category: 'sculpture',
    difficulty: 1,
    lat: 44.840242,
    lng: -0.560206,
    challenge: "De l'autre côté du pont de pierre, un lion géant, tout bleu, veille sur une place. Trouve-le !",
    hints: ['Rive droite, place de Stalingrad.', 'Juste au bout du pont de pierre : impossible de le rater !'],
    story:
      "C'est « Le Lion », une sculpture de l'artiste Xavier Veilhan, installée en 2005. Le lion n'a pas été choisi par hasard : un léopard (un cousin du lion) figure sur le blason de Bordeaux, et c'est aussi la girouette dorée de la Grosse Cloche. Tourne autour : que regarde-t-il ?",
  }),
  place({
    id: 'seed-meca-enfant-eau',
    title: 'L’enfant qui recueille la pluie',
    category: 'sculpture',
    difficulty: 2,
    lat: 44.828129,
    lng: -0.551065,
    challenge:
      "Près du grand bâtiment de la MÉCA, au bord de la Garonne, un enfant sculpté est assis et tend ses mains en creux pour recueillir l'eau de pluie. Trouve-le !",
    hints: ['Quai de Paludate, sur le parvis Corto-Maltese.', 'Au pied du grand escalier de la MÉCA.'],
    story:
      "Cette sculpture s'appelle « Étude sur la nature des choses : l'eau ». Elle a été installée en 2020, au début d'un parcours d'œuvres entre la gare Saint-Jean et la MÉCA, où un enfant observe l'eau, l'air et la lumière. Regarde sous ses mains : l'eau qui goutte creuse peu à peu la pierre. Bonus : cherche les autres enfants du parcours en allant vers la gare !",
  }),
]
