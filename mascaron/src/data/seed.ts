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
    quartier: 'nansouty',
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
      { x: 33, y: 66, zoom: 2 },
    ),
    hints: ['Elle est sur la place Nansouty elle-même.', "Le visage est juste au-dessus du bassin, là où coulait l'eau."],
    story:
      "Un visage sculpté qui sert de décor (ou de bouche de fontaine), c'est justement ça, un mascaron ! Sur la carte postale, on voit même des publicités collées sur la fontaine (Maggi, Papillon noir). Compare avec aujourd'hui : qu'est-ce qui a changé ?",
  }),
  place({
    id: 'seed-boite-nansouty',
    title: 'La boîte à livres de la place Nansouty',
    category: 'autre',
    quartier: 'nansouty',
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
    quartier: 'saint-genes',
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
    quartier: 'saint-genes',
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
    quartier: 'nansouty',
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
    quartier: 'saint-genes',
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
    quartier: 'saint-genes',
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
    quartier: 'saint-genes',
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
    quartier: 'saint-genes',
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
    quartier: 'saint-genes',
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
    quartier: 'saint-genes',
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
    quartier: 'saint-genes',
    difficulty: 3,
    lat: 44.821321,
    lng: -0.576235,
    challenge:
      'Au sol, deux petits pavés dorés portent les prénoms de deux sœurs. Trouve-les : en quelle année est née la plus jeune ? (La photo montre d’autres pavés de mémoire de Bordeaux, pour que tu saches à quoi ils ressemblent.)',
    photo: commons('paves-memoire', 'Christian Michelides', 'CC BY-SA 4.0', 'Stolpersteine_in_Bordeaux_4.jpg', { x: 50, y: 45, zoom: 1 }),
    hints: ['Marche en regardant le trottoir, devant les portes.', 'Les pavés sont carrés, pas plus grands que ta main.'],
    story:
      "« Ici habitait… » Marcelle Borruel, née en 1928, et Ginette Borruel, née en 1937, ont été arrêtées le 10 janvier 1944, internées à Drancy puis déportées à Auschwitz, où elles ont été assassinées le 20 janvier 1944. Ginette avait 6 ou 7 ans. Ces pavés, posés en 2022, font partie des « Stolpersteine » imaginés par l'artiste Gunter Demnig : ils rappellent les victimes du nazisme devant leur dernier domicile.",
  }),
  place({
    id: 'seed-memoire-bret',
    title: 'Pavés de mémoire de Robert et Georgette Bret',
    category: 'memoire',
    quartier: 'saint-genes',
    difficulty: 3,
    lat: 44.821472,
    lng: -0.577695,
    challenge:
      'Deux pavés dorés, avec le même nom de famille, sont scellés dans le trottoir. Trouve-les : en quelle année ont-ils été arrêtés ? (La photo montre d’autres pavés de mémoire de Bordeaux, pour que tu saches à quoi ils ressemblent.)',
    photo: commons('paves-memoire', 'Christian Michelides', 'CC BY-SA 4.0', 'Stolpersteine_in_Bordeaux_4.jpg', { x: 50, y: 45, zoom: 1 }),
    hints: ['Marche en regardant le trottoir, devant les portes.', 'Ils sont côte à côte, au pied d’une maison.'],
    story:
      "« Ici habitait… » Robert Bret, né en 1906, arrêté le 22 novembre 1940, interné au fort du Hâ, assassiné au camp de Souge. Georgette Bret, née en 1905, arrêtée le 28 août 1942, internée au fort du Hâ puis à Romainville, déportée en 1943 à Auschwitz, où elle a été assassinée. Ces pavés ont été posés en 2025.",
  }),
  place({
    id: 'seed-memoire-cantelaube',
    title: 'Pavés de mémoire de Jean et Germaine Cantelaube',
    category: 'memoire',
    quartier: 'belcier',
    difficulty: 3,
    lat: 44.818328,
    lng: -0.564465,
    challenge:
      'Encore deux pavés dorés, cette fois au nom de Cantelaube. Trouve-les et lis les dates : te rappellent-elles d’autres pavés du quartier ? (La photo montre d’autres pavés de mémoire de Bordeaux, pour que tu saches à quoi ils ressemblent.)',
    photo: commons('paves-memoire', 'Christian Michelides', 'CC BY-SA 4.0', 'Stolpersteine_in_Bordeaux_4.jpg', { x: 50, y: 45, zoom: 1 }),
    hints: ['Ils sont loin des autres pavés du quartier : regarde bien le point sur la carte.', 'Regarde le trottoir, devant les portes.'],
    story:
      "« Ici habitait… » Jean Cantelaube, né en 1910, arrêté le 22 novembre 1940, interné au camp de Mérignac-Beaudésert, assassiné au camp de Souge le 24 octobre 1941. Germaine Cantelaube, née en 1908, arrêtée le 28 août 1942, internée au fort du Hâ puis à Romainville, déportée en 1943 à Auschwitz, où elle a été assassinée. Ces pavés ont été posés en 2025. As-tu remarqué ? Robert et Georgette Bret ont été arrêtés exactement les mêmes jours que Jean et Germaine.",
  }),

  // ---------- Vers le Sacré-Cœur ----------
  place({
    id: 'seed-galard-plaque',
    title: 'Le numéro caché de la rue de Galard',
    category: 'plaque',
    quartier: 'nansouty',
    difficulty: 3,
    lat: 44.82244,
    lng: -0.56945,
    challenge: 'Juste au-dessus du nom de la rue, une toute petite plaque se cache. Trouve-la et lis ce qui est écrit dessus.',
    photo: rb('galard-plaque', 'Bordeaux_-_Rue_de_Galard_-_Plaque.jpg', { x: 51, y: 50, zoom: 4 }),
    hints: ["Cherche la plaque bleue « Rue de Galard » sur l'angle d'une maison.", 'Le numéro est suivi de « Arr ».'],
    story:
      "« 6ᵉ Arr » : ces petites plaques indiquent l'ancien arrondissement (une sorte de quartier administratif) de la rue. Bonus : sur la même maison, lève les yeux vers la frise sculptée en haut du mur. Et va voir la rue de la Réole, toute proche : même numéro ?",
  }),
  place({
    id: 'seed-galard-echoppes',
    title: 'Les échoppes décorées de la rue de Galard',
    category: 'facade',
    quartier: 'nansouty',
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
    quartier: 'nansouty',
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
    quartier: 'nansouty',
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
    quartier: 'belcier',
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
    quartier: 'belcier',
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
    quartier: 'belcier',
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
    quartier: 'belcier',
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
      "Il y a quatre cuves, numérotées de 1 à 4… en partant de la droite ! C'est un ancien château d'eau : les cuves en hauteur gardaient de l'eau sous pression pour la distribuer. Il a été conservé au milieu du nouveau quartier. Juste à côté se cache un personnage de street art très célèbre : le Gouzou !",
  }),
  place({
    id: 'seed-gouzou',
    title: 'Le Gouzou',
    category: 'street-art',
    quartier: 'belcier',
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
    quartier: 'nansouty',
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
    quartier: 'victoire',
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
    quartier: 'nansouty',
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
    quartier: 'victoire',
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
    quartier: 'saint-michel',
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
      "On trouve à Bordeaux beaucoup de niches avec des statuettes : des saints, des personnages, parfois des vierges. Celui-ci est bien étrange : au bout de son bras levé, il brandit… une tête ! Sous la niche, des lettres sont gravées dans la pierre : on y devine « SAINT » et « JEAN ». Arrives-tu à lire le reste ?",
  }),

  // ---------- Place de la Victoire ----------
  place({
    id: 'seed-porte-aquitaine',
    title: "Le fronton de la porte d'Aquitaine",
    category: 'monument',
    quartier: 'victoire',
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
    quartier: 'victoire',
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
    quartier: 'victoire',
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
    quartier: 'victoire',
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
    quartier: 'victoire',
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
    quartier: 'victoire',
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
    title: 'Le poisson volant de la place Amédée-Larrieu',
    category: 'fontaine',
    quartier: 'meriadeck',
    difficulty: 1,
    lat: 44.83037,
    lng: -0.58148,
    challenge: 'Dans une fontaine, un jeune garçon se bat avec un gros poisson… qui a des ailes !',
    photo: rb(
      'larrieu-triton',
      'Bordeaux_-_Place_Amédée_Larrieu_-_Fontaine_(Raoul_Verlet)_-_Triton_terrassant_un_poisson_volant.jpg',
      { x: 50, y: 40, zoom: 1 },
    ),
    hints: ['Place Amédée-Larrieu.', 'Il y a plusieurs fontaines sur la place : cherche celle du poisson volant.'],
    story:
      "L'œuvre s'appelle « Triton terrassant un poisson volant ». Dans la mythologie grecque, un triton est mi-homme mi-poisson… mais celui-ci a bien des jambes : regarde-le ! Le poisson, lui, a de grandes nageoires en forme d'ailes. Lève les yeux au-dessus d'eux : la tête qui crache l'eau, sous l'inscription, c'est un mascaron ! Ces fontaines sont l'œuvre du sculpteur Raoul Verlet. Fais le tour de la place : quelles autres créatures marines trouves-tu ?",
  }),

  place({
    id: 'seed-bourse-du-travail',
    title: 'Le grand bas-relief de la Bourse du travail',
    category: 'sculpture',
    quartier: 'centre',
    difficulty: 1,
    lat: 44.832039,
    lng: -0.577602,
    challenge:
      "Sur la façade d'un grand bâtiment aux lignes toutes droites, un immense bas-relief blanc est sculpté, plein de personnages. Trouve-le, puis lis la date gravée juste au-dessus !",
    photo: commons('bourse-du-travail', 'JeanWilhelm', 'CC0', 'Bourse_du_Travail_Bordeaux.jpg', { x: 20, y: 50, zoom: 2.5 }),
    hints: ['Cours Aristide-Briand.', 'Les mots « Bourse du travail » sont gravés juste au-dessus.'],
    story:
      "La date gravée, c'est 1936. La Bourse du travail, c'est la maison des syndicats : les travailleurs s'y réunissent pour défendre leurs droits. Le bâtiment date des années 1930 et il est de style Art déco : des lignes droites, de grandes fenêtres et des sculptures très géométriques. Compte les personnages du bas-relief : que font-ils ? Chacun représente peut-être un métier…",
  }),

  // ---------- Rue du Mirail / cours Victor-Hugo ----------
  place({
    id: 'seed-mirail-marin',
    title: 'Le vieux marin de la rue du Mirail',
    category: 'sculpture',
    quartier: 'victoire',
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
    quartier: 'victoire',
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
      "Ces petits anges joufflus s'appellent des « putti » (un « putto », en italien). Les personnages qui soutiennent un balcon s'appellent des atlantes quand ce sont des hommes, et des cariatides quand ce sont des femmes. Regarde bien leurs gestes : ils ne font pas que porter le balcon ! Et sur la porte, on lit encore le numéro 22.",
  }),
  place({
    id: 'seed-menuts-cariatides',
    title: 'Les dames de pierre de la rue des Menuts',
    category: 'facade',
    quartier: 'saint-michel',
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
    quartier: 'centre',
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
    quartier: 'centre',
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
    quartier: 'saint-michel',
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
    quartier: 'saint-michel',
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
    quartier: 'saint-michel',
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
      "C'est une croix orthodoxe, comme on en voit surtout en Russie et en Europe de l'Est. La petite barre du haut représente l'écriteau cloué au-dessus du Christ, et la barre penchée du bas le support pour ses pieds. Ici, quand on est face à la chapelle, la barre du bas descend vers la droite.",
  }),

  // ---------- Centre : place de la Bourse / Saint-Pierre ----------
  place({
    id: 'seed-porte-cailhau',
    title: 'La porte Cailhau',
    category: 'monument',
    quartier: 'centre',
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
    quartier: 'centre',
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
    quartier: 'centre',
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
    quartier: 'centre',
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
    quartier: 'centre',
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
    quartier: 'centre',
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
    quartier: 'centre',
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
    quartier: 'centre',
    difficulty: 1,
    lat: 44.8406,
    lng: -0.579722,
    challenge:
      "Une grande porte en arc, toute seule au milieu de la rue : on passe dessous sans rien ouvrir ! Trouve-la, et regarde le blason sculpté tout en haut : que vois-tu dessus ?",
    photo: commons('porte-dijeaux', 'Gzen92', 'CC BY-SA 4.0', 'Porte_Dijeaux_(Bordeaux).jpg', { x: 50, y: 30, zoom: 1 }),
    hints: ['Place Gambetta, côté centre-ville.', 'Elle fait le bout de la rue Porte-Dijeaux.'],
    story:
      "Sous une couronne, le blason montre un château : c'est le blason de Bordeaux (on dit que ce château représente la Grosse Cloche). Et juste en dessous, sur la pierre du milieu de l'arc, un visage barbu te regarde : c'est un mascaron ! La porte Dijeaux a été construite au XVIIIᵉ siècle, à l'endroit d'une ancienne porte des remparts. Son nom viendrait du latin « porta Jovis », la porte de Jupiter, le roi des dieux romains. Aujourd'hui, les remparts ont disparu : il ne reste que la porte, comme un décor au milieu de la rue.",
  }),

  // ---------- Centre : Grand-Théâtre / Quinconces / quais ----------
  place({
    id: 'seed-grand-theatre',
    title: 'Les statues du Grand-Théâtre',
    category: 'sculpture',
    quartier: 'centre',
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
    quartier: 'centre',
    difficulty: 1,
    lat: 44.842144,
    lng: -0.574311,
    challenge:
      "À côté du Grand-Théâtre, un immense visage de jeune fille, les yeux fermés, semble rêver au milieu de la place. Trouve-la, puis fais-en le tour : à quoi ressemble-t-elle de côté ?",
    photo: panoramax('sanna', 'Bordeaux Métropole', ETALAB, '787d8d8b-44f3-4edc-8551-b210c5a90091', { x: 60, y: 70, zoom: 1 }),
    hints: ['Place de la Comédie, côté rue Sainte-Catherine.', 'Elle mesure environ 7 mètres de haut !'],
    story:
      "Elle s'appelle Sanna, c'est une œuvre du sculpteur catalan Jaume Plensa, tout en fonte (un métal très lourd, qui rouille et devient brun-orangé). Elle est arrivée en 2013 pour une exposition en plein air, et un mécène l'a achetée pour la laisser aux Bordelais. Jaume Plensa aime les visages aux yeux fermés : il veut inviter les passants à s'arrêter, à se taire et à rêver un instant. Et toi, à quoi penses-tu qu'elle rêve ?",
  }),
  place({
    id: 'seed-girondins-chevaux',
    title: 'Les chevaux du monument aux Girondins',
    category: 'fontaine',
    quartier: 'centre',
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
    quartier: 'centre',
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
    quartier: 'saint-michel',
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
    quartier: 'centre',
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
    quartier: 'centre',
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
    quartier: 'centre',
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
    quartier: 'centre',
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
    quartier: 'centre',
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
    quartier: 'chartrons',
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
    quartier: 'bastide',
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
    quartier: 'bastide',
    difficulty: 1,
    lat: 44.840242,
    lng: -0.560206,
    challenge: "De l'autre côté du pont de pierre, un lion géant, tout bleu, veille sur une place. Trouve-le !",
    photo: panoramax('lion-bleu', 'trouyer', 'CC BY-SA 4.0', '47a4142d-21eb-4866-8a1c-23f86313ad3f', { x: 50, y: 50, zoom: 1 }),
    hints: ['Rive droite, place de Stalingrad.', 'Juste au bout du pont de pierre : impossible de le rater !'],
    story:
      "C'est « Le Lion », une sculpture de l'artiste Xavier Veilhan, installée en 2005. Le lion n'a pas été choisi par hasard : un léopard (un cousin du lion) figure sur le blason de Bordeaux, et c'est aussi la girouette dorée de la Grosse Cloche. Tourne autour : que regarde-t-il ?",
  }),
  place({
    id: 'seed-meca-enfant-eau',
    title: 'L’enfant qui recueille la pluie',
    category: 'sculpture',
    quartier: 'belcier',
    difficulty: 2,
    lat: 44.828129,
    lng: -0.551065,
    challenge:
      "Près du grand bâtiment de la MÉCA, au bord de la Garonne, un enfant sculpté est assis et tend ses mains en creux pour recueillir l'eau de pluie. Trouve-le !",
    hints: ['Quai de Paludate, sur le parvis Corto-Maltese.', 'Au pied du grand escalier de la MÉCA.'],
    story:
      "Cette sculpture s'appelle « Étude sur la nature des choses : l'eau ». Elle a été installée en 2020, au début d'un parcours d'œuvres entre la gare Saint-Jean et la MÉCA, où un enfant observe l'eau, l'air et la lumière. Regarde sous ses mains : l'eau qui goutte creuse peu à peu la pierre. Bonus : cherche les autres enfants du parcours en allant vers la gare !",
  }),

  // ---------- Jardin public / Tourny ----------
  place({
    id: 'seed-jeunesse-chimere',
    title: 'Le garçon et la chimère',
    category: 'sculpture',
    quartier: 'saint-seurin',
    difficulty: 2,
    lat: 44.847411,
    lng: -0.578149,
    challenge:
      "Dans le Jardin public, un jeune garçon est assis à califourchon sur un drôle d'animal à ailes. Trouve-les ! À quoi ressemble ce monstre ?",
    photo: commons(
      'jeunesse-chimere',
      'Symac / Sylvain Machefert',
      'CC BY-SA 4.0',
      'Jeunesse_et_chim%C3%A8re,_jardin_public_de_Bordeaux,_octobre_2014.JPG',
      { x: 50, y: 50, zoom: 1 },
    ),
    hints: ['Jardin public, près des bâtiments en pierre.', 'Cherche dans les massifs de fleurs, pas loin du Muséum.'],
    story:
      "Cette sculpture s'appelle « Jeunesse et Chimère », du sculpteur Pierre Granet (1892). Une chimère, dans la mythologie grecque, c'est un monstre fabriqué avec des morceaux de plusieurs animaux : tête de lion, corps de chèvre, queue de serpent… Aujourd'hui, on dit aussi « une chimère » pour parler d'un rêve impossible. Et si le garçon chevauchait ses rêves ?",
  }),
  place({
    id: 'seed-jardin-public-pont',
    title: 'Le petit pont du Jardin public',
    category: 'nature',
    quartier: 'saint-seurin',
    difficulty: 1,
    lat: 44.84854,
    lng: -0.57739,
    challenge:
      "Au milieu du Jardin public, un joli pont de métal enjambe une rivière où glissent les canards. Trouve-le, et traverse-le !",
    photo: commons('jardin-public-pont', 'Marc Ryckaert (MJJR)', 'CC BY 3.0', 'Bordeaux_Jardin_Public_R02.jpg', {
      x: 50,
      y: 50,
      zoom: 1,
    }),
    hints: ['Jardin public, entrée cours de Verdun ou place du Champ-de-Mars.', 'Suis la rivière qui serpente dans le jardin.'],
    story:
      "Le Jardin public a été créé au XVIIIᵉ siècle, à l'époque de l'intendant Tourny, avec des allées bien droites « à la française ». Au XIXᵉ siècle, on l'a transformé en jardin « à l'anglaise », avec des chemins qui tournent, une rivière et ce petit pont, pour donner l'impression d'une promenade dans la nature. Regarde sous le pont : combien de canards vois-tu ?",
  }),
  place({
    id: 'seed-fontaine-gruet',
    title: 'La fontaine de la place Gruet',
    category: 'fontaine',
    quartier: 'centre',
    difficulty: 2,
    lat: 44.847,
    lng: -0.58,
    challenge:
      "Sur une petite place ombragée, une fontaine de pierre abrite un personnage sous son arche. Et tout en haut, un visage barbu veille. Trouve-les !",
    photo: commons('fontaine-gruet', 'Zairon', 'CC BY-SA 4.0', 'Bordeaux_Place_Gruet_1.jpg', { x: 50, y: 50, zoom: 1 }),
    hints: ['Place Charles-Gruet, tout près du Jardin public.', 'La place est entourée de platanes et de terrasses.'],
    story:
      "Le visage barbu sculpté tout en haut de la fontaine, c'est un mascaron ! Regarde bien le personnage sous l'arche : que tient-il, que fait-il ? La place porte le nom de Charles Gruet, un ancien maire de Bordeaux. Fais le tour de la fontaine : d'autres décors se cachent sur ses côtés.",
  }),
  place({
    id: 'seed-tourny',
    title: 'Le marquis de Tourny',
    category: 'monument',
    quartier: 'centre',
    difficulty: 1,
    lat: 44.845103,
    lng: -0.577942,
    challenge:
      "Au milieu d'une place, un homme en bronze, avec une perruque et un long manteau, regarde la ville qu'il a transformée. Trouve-le !",
    photo: commons('tourny', 'Marc Ryckaert', 'CC BY 3.0', 'Bordeaux_Statue_Tourny_R01.jpg', { x: 50, y: 50, zoom: 1 }),
    hints: ['Place Tourny, entre le Jardin public et les allées de Tourny.', 'Il est tout en haut d’un grand socle de pierre.'],
    story:
      "Louis-Urbain Aubert, marquis de Tourny, était l'intendant de Bordeaux (le représentant du roi) de 1743 à 1757. C'est lui qui a fait abattre une partie des vieux remparts pour ouvrir de grandes places, des allées et le Jardin public : le Bordeaux élégant du XVIIIᵉ siècle, c'est un peu grâce à lui. Des places et des allées portent son nom : combien en connais-tu ?",
  }),
  place({
    id: 'seed-montaigne',
    title: 'Montaigne dans sa grande robe',
    category: 'sculpture',
    quartier: 'centre',
    difficulty: 1,
    lat: 44.845007,
    lng: -0.572837,
    challenge:
      "Au bord d'une immense place, un homme en marbre blanc porte une grande collerette plissée autour du cou. Trouve-le, et lis son nom gravé sur le socle !",
    photo: commons('montaigne', 'Symac', 'CC BY-SA 3.0', 'Place_des_Quinconces_-_Michel_de_Montaigne.jpg', {
      x: 50,
      y: 50,
      zoom: 1,
    }),
    hints: ['Place des Quinconces, côté Grand-Théâtre.', 'Il a un voisin, lui aussi en marbre : Montesquieu.'],
    story:
      "C'est Michel de Montaigne, un écrivain et philosophe du XVIᵉ siècle, qui a été maire de Bordeaux. Il a écrit les « Essais », où il raconte ce qu'il pense de tout et de rien, pour mieux se connaître lui-même. Sa collerette plissée s'appelle une fraise : c'était la mode de son époque ! La statue est du sculpteur Dominique Maggesi.",
  }),

  // ---------- Saint-Seurin / Fondaudège / Mériadeck ----------
  place({
    id: 'seed-palais-gallien',
    title: 'Les arènes du palais Gallien',
    category: 'monument',
    quartier: 'saint-seurin',
    difficulty: 1,
    lat: 44.84759,
    lng: -0.58271,
    challenge:
      "Au milieu des maisons, de vieux murs de briques et de pierres percés de grandes arches… Ce sont les restes d'un monument vieux de près de 2 000 ans ! Trouve-les, et regarde bien les murs : de quoi sont faites les fines rayures rouges ?",
    photo: commons('palais-gallien', 'Marc Ryckaert (MJJR)', 'CC BY-SA 3.0', 'Bordeaux_Palais_Gallien_R01.jpg', {
      x: 50,
      y: 50,
      zoom: 1,
    }),
    hints: ['Rue du Docteur-Albert-Barraud, quartier Fondaudège.', 'Les ruines se voient à travers les grilles, entre les immeubles.'],
    story:
      "Malgré son nom, ce n'était pas un palais : c'était un amphithéâtre romain, comme une arène, où des milliers de spectateurs venaient voir des combats et des spectacles, à l'époque où Bordeaux s'appelait Burdigala. Il a été construit autour du IIᵉ siècle. Et les rayures rouges ? Ce sont des rangées de briques : les Romains alternaient des rangées de petites pierres et des rangées de briques, pour rendre les murs plus solides.",
  }),
  place({
    id: 'seed-saint-seurin-portail',
    title: 'Le porche sculpté de Saint-Seurin',
    category: 'eglise',
    quartier: 'saint-seurin',
    difficulty: 2,
    lat: 44.843212,
    lng: -0.585719,
    challenge:
      "Sous un grand porche, des dizaines de saints de pierre sont alignés de chaque côté de la porte, et au-dessus, une foule de petits personnages. Trouve ce portail : qui est assis tout au milieu, au-dessus de la porte, les mains levées ?",
    photo: commons(
      'saint-seurin-portail',
      'Zairon',
      'CC BY-SA 4.0',
      'Bordeaux_Basilique_Saint-Seurin_Ext%C3%A9rieure_Portail_Sud_2.jpg',
      { x: 50, y: 50, zoom: 1 },
    ),
    hints: ['Basilique Saint-Seurin, place des Martyrs-de-la-Résistance.', 'Ce n’est pas l’entrée principale : fais le tour, le porche est sur le côté.'],
    story:
      "C'est le Christ, entouré d'anges : juste en dessous, de petits personnages sortent de leurs tombeaux. Comme au portail royal de la cathédrale, c'est le Jugement dernier ! Parmi les grands saints alignés, cherche celui qui tient des clés : c'est saint Pierre. La basilique Saint-Seurin est l'une des plus anciennes églises de Bordeaux : sous elle se cache une crypte et une nécropole (un ancien cimetière) de l'Antiquité. Ce portail sculpté date du Moyen Âge. Les pèlerins en route vers Saint-Jacques-de-Compostelle s'arrêtaient ici : la basilique fait partie des monuments classés au patrimoine mondial de l'Unesco au titre des chemins de Compostelle.",
  }),
  place({
    id: 'seed-alhambra-mascaron',
    title: 'Le masque du théâtre de l’Alhambra',
    category: 'sculpture',
    quartier: 'saint-seurin',
    difficulty: 3,
    lat: 44.841797,
    lng: -0.588868,
    challenge:
      "Sur la façade d'un théâtre, un visage sculpté grimace entre deux grosses volutes, avec une couronne de plumes sur la tête. Trouve-le !",
    photo: commons('alhambra-mascaron', 'Clalrt', 'CC BY-SA 4.0', 'Mascaron_de_la_fa%C3%A7ade_.JPG', { x: 50, y: 50, zoom: 1 }),
    hints: ['Théâtre de l’Alhambra, quartier Saint-Seurin.', 'Lève les yeux vers le haut de la façade.'],
    story:
      "C'est un mascaron qui ressemble à un masque de théâtre : parfait pour décorer la façade d'une salle de spectacle ! Dans l'Antiquité, les acteurs grecs portaient des masques pour jouer : un masque qui rit pour la comédie, un masque qui pleure pour la tragédie. Et celui-ci, il rit ou il pleure ?",
  }),
  place({
    id: 'seed-meriadeck-caisse-epargne',
    title: 'La tour ronde de Mériadeck',
    category: 'facade',
    quartier: 'meriadeck',
    difficulty: 1,
    lat: 44.838556,
    lng: -0.583465,
    challenge:
      "Dans un quartier de dalles et de passerelles, un drôle de bâtiment en béton empile des étages arrondis, comme des soucoupes, autour d'une tour ronde. Trouve-le !",
    photo: commons(
      'meriadeck-caisse-epargne',
      'Lionel CLOT',
      'CC BY 4.0',
      'Caisse_d%27%C3%A9pargne_bordeaux_m%C3%A9riadeck_photographie_3.jpg',
      { x: 50, y: 50, zoom: 1 },
    ),
    hints: ['Quartier Mériadeck, près de la patinoire et du centre commercial.', 'C’est le bâtiment de la Caisse d’épargne.'],
    story:
      "Mériadeck est un quartier construit dans les années 1970, sur une grande dalle : les voitures roulent en dessous, les piétons marchent au-dessus, sur des passerelles. Ce bâtiment en béton brut, aux formes arrondies, est typique de cette époque. Compare avec les vieilles façades en pierre du centre : lequel préfères-tu ?",
  }),
  place({
    id: 'seed-saint-bruno',
    title: 'La façade de Saint-Bruno',
    category: 'eglise',
    quartier: 'meriadeck',
    difficulty: 2,
    lat: 44.8376,
    lng: -0.589892,
    challenge:
      "Une église à la façade très décorée, avec des volutes et une statue dans une niche, tout en haut. Trouve-la : qui est dans la niche ?",
    photo: commons('saint-bruno', 'Marc Ryckaert (MJJR)', 'CC BY-SA 3.0', 'Bordeaux_Saint-Bruno_R01.jpg', { x: 50, y: 50, zoom: 1 }),
    hints: ['Rue François-de-Sourdis, derrière Mériadeck.', 'Juste à côté de l’entrée du grand cimetière de la Chartreuse.'],
    story:
      "L'église Saint-Bruno était la chapelle d'un couvent de chartreux, des moines qui vivaient dans le silence, construit au XVIIᵉ siècle. C'est pour ça que le grand cimetière juste à côté s'appelle « la Chartreuse ». Saint Bruno est justement le fondateur des chartreux. La statue de la niche le représente peut-être : à toi de vérifier sur place !",
  }),

  // ---------- Chartrons ----------
  place({
    id: 'seed-statue-liberte',
    title: 'La petite statue de la Liberté',
    category: 'sculpture',
    quartier: 'chartrons',
    difficulty: 1,
    lat: 44.855325,
    lng: -0.571423,
    challenge:
      "Pas besoin d'aller à New York : sur une place des Chartrons, une dame couronnée lève une torche vers le ciel. Trouve-la !",
    photo: commons('statue-liberte', 'Sylvain Machefert', 'CC BY-SA 4.0', 'Bordeaux_-_place_Picard_-_statue_de_la_libert%C3%A9.jpg', {
      x: 50,
      y: 50,
      zoom: 1,
    }),
    hints: ['Place Picard, aux Chartrons.', 'Elle est bien plus petite que celle de New York…'],
    story:
      "C'est une réplique de la statue de la Liberté du sculpteur Bartholdi, celle qui accueille les bateaux à New York. Bordeaux avait déjà une statue comme celle-ci à la fin du XIXᵉ siècle, mais elle a disparu pendant la Seconde Guerre mondiale, quand l'occupant fondait le métal des statues. Celle-ci l'a remplacée bien plus tard. Dans sa main gauche, elle tient une tablette : sur celle de New York est gravée la date de l'indépendance des États-Unis, le 4 juillet 1776.",
  }),
  place({
    id: 'seed-saint-louis-chartrons',
    title: 'Les deux flèches de Saint-Louis-des-Chartrons',
    category: 'eglise',
    quartier: 'chartrons',
    difficulty: 1,
    lat: 44.851564,
    lng: -0.572181,
    challenge:
      "Deux flèches pointues et une grande fenêtre ronde, découpée comme une dentelle : trouve cette église des Chartrons. À quoi te fait penser sa fenêtre ronde ?",
    photo: commons(
      'saint-louis-chartrons',
      'Zairon',
      'CC BY-SA 4.0',
      'Bordeaux_%C3%89glise_Saint-Louis-des-Chartrons_Ext%C3%A9rieure_Facade_1.jpg',
      { x: 50, y: 50, zoom: 1 },
    ),
    hints: ['Rue Notre-Dame, aux Chartrons.', 'Ses deux flèches dépassent des toits : cherche-les !'],
    story:
      "L'église Saint-Louis-des-Chartrons a été construite au XIXᵉ siècle dans le style néo-gothique : elle imite les cathédrales du Moyen Âge, avec ses flèches, ses pinacles et sa rosace. Le quartier des Chartrons doit son nom aux moines chartreux qui s'y étaient installés autrefois. La grande fenêtre ronde s'appelle une rosace, parce qu'elle ressemble à une rose qui s'ouvre, avec ses pétales de pierre.",
  }),
  place({
    id: 'seed-hotel-fenwick',
    title: 'Les tours de guet de l’hôtel Fenwick',
    category: 'facade',
    quartier: 'chartrons',
    difficulty: 2,
    lat: 44.848869,
    lng: -0.571091,
    challenge:
      "Face au fleuve, un grand immeuble de pierre porte sur son toit deux petites tourelles avec des fenêtres de tous les côtés. Trouve-les : à quoi pouvaient-elles bien servir ?",
    photo: commons('hotel-fenwick', 'Pierre-Yves Beaudouin', 'CC BY-SA 3.0', 'Bordeaux_-_H%C3%B4tel_Fenwick_01.jpg', {
      x: 50,
      y: 50,
      zoom: 1,
    }),
    hints: ['Au bout de la place des Quinconces, côté Chartrons, face au fleuve.', 'Regarde tout en haut du toit.'],
    story:
      "Ces petites tours s'appellent des belvédères : on dit que du haut, on guettait l'arrivée des bateaux sur la Garonne ! L'hôtel a été construit à la fin du XVIIIᵉ siècle pour Joseph Fenwick, l'un des tout premiers consuls des États-Unis, envoyé à Bordeaux juste après leur indépendance. Bordeaux faisait alors beaucoup de commerce avec l'Amérique.",
  }),
  place({
    id: 'seed-maisons-hollandaises',
    title: 'Les maisons hollandaises',
    category: 'facade',
    quartier: 'chartrons',
    difficulty: 2,
    lat: 44.850575,
    lng: -0.569969,
    challenge:
      "Deux vieilles maisons côte à côte ont un toit en forme de triangle bien pointu, tourné vers la rue : ça ne ressemble pas aux autres façades de Bordeaux ! Trouve-les.",
    photo: commons(
      'maisons-hollandaises',
      'Chabe01',
      'CC BY-SA 4.0',
      'Maison_Hollandaise_-_Bordeaux_(FR33)_-_2022-09-10_-_1.jpg',
      { x: 50, y: 50, zoom: 1 },
    ),
    hints: ['Aux Chartrons, entre les quais et la rue Notre-Dame.', 'Cherche des pignons pointus, comme sur les maisons d’Amsterdam.'],
    story:
      "On les appelle les maisons hollandaises à cause de leurs pignons pointus tournés vers la rue, comme aux Pays-Bas. Ce sont parmi les plus vieilles maisons des Chartrons, un quartier où vivaient de nombreux marchands de vin venus de l'étranger (Hollande, Angleterre, Allemagne…). Compare-les avec les façades plates du reste du quartier !",
  }),
  place({
    id: 'seed-entrepot-laine',
    title: 'L’entrepôt Lainé',
    category: 'monument',
    quartier: 'centre',
    difficulty: 1,
    lat: 44.8485,
    lng: -0.571986,
    challenge:
      "Un énorme bâtiment de pierre, aux murs épais et aux petites fenêtres, porte un seul mot gravé au-dessus de sa porte. Trouve-le et lis ce mot !",
    photo: commons('entrepot-laine', 'Pierre-Yves Beaudouin', 'CC BY-SA 3.0', 'Bordeaux_-_Entrep%C3%B4t_Lain%C3%A9_01.jpg', {
      x: 50,
      y: 50,
      zoom: 1,
    }),
    hints: ['Rue Ferrère, entre les Quinconces et les Chartrons.', 'Aujourd’hui, c’est un musée d’art contemporain.'],
    story:
      "Le mot, c'est « ENTREPÔT » ! Au XIXᵉ siècle, on y stockait les « denrées coloniales » arrivées par bateau : sucre, café, cacao, épices… avant de payer les taxes. Aujourd'hui, c'est le CAPC, un musée d'art contemporain : à l'intérieur, les immenses arcades de pierre sont impressionnantes.",
  }),

  place({
    id: 'seed-halle-chartrons',
    title: 'La halle des Chartrons',
    category: 'monument',
    quartier: 'chartrons',
    difficulty: 1,
    lat: 44.852008,
    lng: -0.572442,
    challenge:
      "Au milieu d'une place, un bâtiment de pierre est entouré d'un grand toit de verre et de fer posé sur de fines colonnes. Trouve cette halle !",
    photo: commons('halle-chartrons', 'Chabe01', 'CC BY-SA 4.0', 'Halle_Chartrons_-_Bordeaux_(FR33)_-_2022-09-10_-_1.jpg', {
      x: 50,
      y: 50,
      zoom: 1,
    }),
    hints: ['Place du Marché-des-Chartrons.', 'Tout près de l’église Saint-Louis et de ses deux flèches.'],
    story:
      "C'était le marché couvert du quartier, construit au XIXᵉ siècle : le toit de fer et de verre laissait entrer la lumière tout en protégeant les étals de la pluie. Aujourd'hui, la halle accueille des expositions et des événements. Regarde les fines colonnes en fonte (un métal moulé) : elles portent tout le toit !",
  }),
  place({
    id: 'seed-saint-martial',
    title: 'L’inscription latine de Saint-Martial',
    category: 'eglise',
    quartier: 'chartrons',
    difficulty: 2,
    lat: 44.85837,
    lng: -0.56524,
    challenge:
      "Sur le haut de la façade d'une église toute simple, sous une horloge, une longue phrase est gravée en grandes lettres… en latin ! Trouve-la et essaie de la lire.",
    photo: commons('saint-martial', 'JeanWilhelm', 'CC0', 'Facade_saint_martial.jpg', { x: 50, y: 50, zoom: 1 }),
    hints: ['Entre les Chartrons et Bacalan.', 'La façade ressemble à un petit temple grec, avec un triangle au-dessus.'],
    story:
      "La phrase dit « Sub invocatione Sancti Martialis », ce qui veut dire « sous la protection de saint Martial ». Saint Martial était, selon la tradition, le premier évêque de Limoges. Autrefois, beaucoup d'églises portaient leur nom en latin sur la façade, la langue de l'Église catholique.",
  }),
  place({
    id: 'seed-secrestat',
    title: 'La façade de la distillerie Sécrestat',
    category: 'facade',
    quartier: 'chartrons',
    difficulty: 2,
    lat: 44.857525,
    lng: -0.566302,
    challenge:
      "Une façade élégante mélange la pierre blonde et la brique rouge, avec une grande fenêtre en arc et un balcon de fer. Pourtant, ce n'était pas une maison ! Trouve-la.",
    photo: commons('secrestat', 'picotche', 'CC BY-SA 3.0', 'Distillerie_S%C3%A9crestat_2012-10-05_15-56-59.jpg', {
      x: 50,
      y: 50,
      zoom: 1,
    }),
    hints: ['Aux Chartrons, côté Bacalan.', 'Près de l’église Saint-Martial.'],
    story:
      "C'était la distillerie Sécrestat, une fabrique de liqueurs et d'apéritifs. Aux Chartrons, beaucoup de négociants et de fabricants de boissons avaient leurs bâtiments près du port, pour charger facilement les bouteilles sur les bateaux. Une usine aussi jolie qu'un palais, ça montrait que l'entreprise était riche et sérieuse !",
  }),

  place({
    id: 'seed-temple-chartrons',
    title: 'Le temple à colonnes des Chartrons',
    category: 'eglise',
    quartier: 'chartrons',
    difficulty: 1,
    lat: 44.849778,
    lng: -0.572486,
    challenge:
      "On dirait un temple grec, avec son fronton en triangle et ses grosses colonnes rondes… mais c'est un lieu de culte ! Trouve-le : combien de colonnes vois-tu sur la façade ?",
    photo: commons('temple-chartrons', 'Gzen92', 'CC BY-SA 4.0', 'Temple_des_Chartrons_(Bordeaux).jpg', { x: 50, y: 50, zoom: 1 }),
    hints: ['Aux Chartrons, près du cours Xavier-Arnozan.', 'Cherche une façade claire avec un triangle au sommet.'],
    story:
      "Il y a quatre colonnes ! C'est le temple des Chartrons, un temple protestant construit au XIXᵉ siècle. Beaucoup de négociants en vin des Chartrons venaient d'Angleterre, de Hollande ou d'Allemagne, et ils étaient protestants : ils avaient besoin d'un lieu de culte. Chez les protestants, on dit « temple » plutôt qu'« église ».",
  }),
  place({
    id: 'seed-wallace-arnozan',
    title: 'L’autre fontaine Wallace',
    category: 'fontaine',
    quartier: 'centre',
    difficulty: 1,
    lat: 44.849136,
    lng: -0.572944,
    challenge:
      "Tu connais peut-être déjà la fontaine Wallace de la place Sarrail, près de la Victoire… Il en existe une autre ! Trouve-la, à l'ombre des arbres d'un grand cours.",
    photo: commons(
      'wallace-arnozan',
      'Chabe01',
      'CC BY-SA 4.0',
      'Fontaine_Wallace_Cours_Xavier_Arnozan_-_Bordeaux_(FR33)_-_2022-09-10_-_1.jpg',
      { x: 50, y: 50, zoom: 1 },
    ),
    hints: ['Cours Xavier-Arnozan, aux Chartrons.', 'Juste à côté du temple des Chartrons.'],
    story:
      "Comme celle de la place Sarrail, elle a quatre dames qui portent un dôme : la Bonté, la Simplicité, la Charité et la Sobriété. Ces fontaines ont été imaginées au XIXᵉ siècle pour que tout le monde puisse boire gratuitement. Si tu as trouvé les deux, tu es un vrai chasseur de fontaines Wallace !",
  }),
  place({
    id: 'seed-eglise-grecque',
    title: 'La cloche de l’église grecque',
    category: 'eglise',
    quartier: 'chartrons',
    difficulty: 2,
    lat: 44.86192,
    lng: -0.56945,
    challenge:
      "Une petite église couleur sable a sa cloche bien visible, suspendue dans une arche tout en haut de la façade. Trouve-la, et regarde les drapeaux à côté de la porte !",
    photo: commons('eglise-grecque', 'JeanWilhelm', 'CC0', '%C3%89glise_orthodoxe_grecque_rue_du_Jardin_public.jpg', {
      x: 50,
      y: 50,
      zoom: 1,
    }),
    hints: ['Rue du Jardin-Public, vers le nord des Chartrons.', 'Un portail bleu et blanc, comme le drapeau grec.'],
    story:
      "C'est une église orthodoxe grecque. Le bleu et le blanc du portail rappellent le drapeau de la Grèce ! Les communautés venues d'autres pays, souvent grâce au port et au commerce, ont construit leurs propres lieux de culte à Bordeaux. Compare avec la croix orthodoxe à barre penchée de la rue Peyronnet.",
  }),

  // ---------- Bastide / Grand Parc ----------
  place({
    id: 'seed-sainte-marie-bastide',
    title: 'Le clocher de Sainte-Marie de la Bastide',
    category: 'eglise',
    quartier: 'bastide',
    difficulty: 1,
    lat: 44.84306,
    lng: -0.556664,
    challenge:
      "Sur la rive droite, un très haut clocher de pierre dorée se termine par un petit dôme arrondi. Trouve cette église : de quelle forme est le sommet du clocher ?",
    photo: commons('sainte-marie-bastide', 'Guerinf', 'CC BY-SA 4.0', 'Sainte-Marie_de_la_Bastide_(1).jpg', {
      x: 50,
      y: 50,
      zoom: 1,
    }),
    hints: ['Quartier de la Bastide, près de l’avenue Thiers.', 'Son haut clocher dépasse des toits de la rive droite : cherche-le au-dessus des maisons.'],
    story:
      "Le sommet du clocher est en forme de bulbe, comme un gros oignon de pierre. L'église a été construite au XIXᵉ siècle par l'architecte Paul Abadie, celui qui a dessiné le Sacré-Cœur de Montmartre à Paris : les deux églises se ressemblent un peu ! Sur une plaque au sol devant l'église, on raconte qu'elle a été bâtie sur un terrain marécageux, de la tourbe. Cherche cette plaque et lis-la.",
  }),
  place({
    id: 'seed-maison-cantonale',
    title: 'La maison cantonale de la Bastide',
    category: 'facade',
    quartier: 'bastide',
    difficulty: 2,
    lat: 44.8415,
    lng: -0.552785,
    challenge:
      "Un drôle de bâtiment blanc au grand toit brun, avec une petite tour à horloge et des lucarnes pointues bordées de rouge. On dirait un chalet géant ! Trouve-le.",
    photo: panoramax('maison-cantonale', 'Bordeaux Métropole', ETALAB, '1b4e3949-0051-4bc3-8697-edece8171d1f', {
      x: 50,
      y: 50,
      zoom: 1,
    }),
    hints: ['Quartier de la Bastide, à quelques rues de l’église Sainte-Marie.', 'Il donne sur une petite place pavée, avec des boules de pierre devant les marches.'],
    story:
      "La maison cantonale était un bâtiment public pour les habitants de la rive droite, qui ont longtemps été un peu à part du reste de Bordeaux, de l'autre côté du fleuve. Son style, avec ses grands toits, ses lucarnes et son horloge, ne ressemble à aucun autre bâtiment de la ville. Quelle heure indique l'horloge quand tu passes ?",
  }),
  place({
    id: 'seed-jardin-botanique',
    title: 'Le jardin botanique de la Bastide',
    category: 'nature',
    quartier: 'bastide',
    difficulty: 1,
    lat: 44.846,
    lng: -0.5623,
    challenge:
      "Au bord de la Garonne, un grand jardin est rangé comme une bibliothèque de plantes, en longues bandes. Trouve-le, et trouve une fleur que tu ne connais pas !",
    photo: commons('jardin-botanique', 'Franck-fnba', 'CC BY-SA 4.0', 'Bordeaux_jardin_botanique_bastide_2025-11.jpg', {
      x: 50,
      y: 50,
      zoom: 1,
    }),
    hints: ['Rive droite, derrière les quais de la Bastide.', 'Juste à côté de la grande pelouse du parc des Berges.'],
    story:
      "Un jardin botanique, c'est un jardin où l'on cultive des plantes pour les étudier et les faire connaître. Celui de la Bastide a été ouvert en 2003. Regarde les petites étiquettes : elles donnent le nom de chaque plante, souvent en latin. Et toi, quelle fleur as-tu découverte ?",
  }),
  place({
    id: 'seed-pont-de-pierre',
    title: 'Les arches du pont de pierre',
    category: 'monument',
    quartier: 'bastide',
    difficulty: 1,
    lat: 44.83847,
    lng: -0.56278,
    challenge:
      "Le plus vieux pont de Bordeaux traverse la Garonne sur une longue file d'arches en briques et en pierre. Compte ses arches !",
    photo: commons('pont-de-pierre', 'Marc Ryckaert (MJJR)', 'CC BY-SA 3.0', 'Bordeaux_Pont_de_pierre_R02.jpg', {
      x: 50,
      y: 50,
      zoom: 1,
    }),
    hints: ['Entre la porte de Bourgogne et la place de Stalingrad.', 'Pour bien compter, regarde-le depuis les quais, pas depuis le pont.'],
    story:
      "Il y a 17 arches ! On raconte que c'est parce que « Napoléon Bonaparte » compte 17 lettres : c'est lui qui avait ordonné sa construction. C'est sans doute une légende, mais elle est jolie. Le pont a été terminé en 1822 : avant lui, pour traverser la Garonne, il fallait prendre un bateau. Regarde aussi les médaillons blancs entre les arches.",
  }),
  place({
    id: 'seed-darwin',
    title: 'La grande fresque de Darwin',
    category: 'street-art',
    quartier: 'bastide',
    difficulty: 1,
    lat: 44.848975,
    lng: -0.560053,
    challenge:
      "Dans une ancienne caserne de la rive droite, les murs des hangars sont couverts de peintures géantes. Trouve le visage de femme peint au milieu de grands hexagones bleus !",
    photo: commons('darwin', 'A1AA1A', 'CC BY-SA 4.0', 'Darwin_-_hangars.jpg', { x: 50, y: 50, zoom: 1 }),
    hints: ['Quai des Queyries, sur la rive droite.', 'C’est le lieu appelé « Darwin », dans l’ancienne caserne Niel.'],
    story:
      "Darwin est installé dans l'ancienne caserne Niel, où vivaient des soldats. Aujourd'hui, c'est un lieu plein de vie : ateliers, skatepark, restaurants… et des murs entiers couverts de street art, qui changent souvent. Promène-toi entre les hangars : combien de fresques trouves-tu ? Attention, celle de la photo a peut-être déjà été repeinte !",
  }),
  place({
    id: 'seed-trinite-grand-parc',
    title: 'Le clocher-flèche du Grand Parc',
    category: 'eglise',
    quartier: 'chartrons',
    difficulty: 1,
    lat: 44.86036,
    lng: -0.57917,
    challenge:
      "Au milieu des grands immeubles, une église toute simple a un clocher qui ne ressemble pas du tout à ceux du centre : une haute lame de béton surmontée d'une croix. Trouve-la !",
    photo: commons('trinite-grand-parc', 'JeanWilhelm', 'CC0', '%C3%89glise_de_la_Trinit%C3%A9_bordeaux.jpg', {
      x: 50,
      y: 50,
      zoom: 1,
    }),
    hints: ['Cité du Grand Parc.', 'Cherche le nom de l’église, écrit en grandes lettres sur la façade.'],
    story:
      "C'est l'église de la Trinité, construite en même temps que la cité du Grand Parc, ce quartier de grands immeubles bâti à partir des années 1960. Pas de pierre sculptée ni de gargouilles ici : c'est une église moderne, en béton, avec des formes très simples. Compare avec la flèche Saint-Michel ou les clochers de Saint-Louis : lequel préfères-tu ?",
  }),

  // ---------- Bacalan ----------
  place({
    id: 'seed-cite-du-vin',
    title: 'La carafe géante de la Cité du Vin',
    category: 'monument',
    quartier: 'bacalan',
    difficulty: 1,
    lat: 44.862418,
    lng: -0.550044,
    challenge:
      "Au bord de la Garonne, un bâtiment tout en courbes brille au soleil, avec une tour de verre qui se tortille vers le ciel. Trouve-le : à quoi te fait-il penser ?",
    photo: panoramax('cite-du-vin', 'Hindediou', 'CC BY-SA 4.0', '12ec998f-6621-42f1-ac5e-b46dcf70bf60', { x: 50, y: 50, zoom: 1 }),
    hints: ['Quartier de Bacalan, au bord du fleuve.', 'Arrêt de tram « La Cité du Vin ».'],
    story:
      "La Cité du Vin a ouvert en 2016. Ses architectes voulaient que sa forme évoque le vin qui tourne dans un verre qu'on fait tourbillonner, ou les remous de la Garonne. Certains y voient aussi une carafe ! Bordeaux est connue dans le monde entier pour ses vins, et ce musée raconte leur histoire.",
  }),
  place({
    id: 'seed-bassins-a-flot',
    title: 'La vieille grue des bassins à flot',
    category: 'monument',
    quartier: 'bacalan',
    difficulty: 1,
    lat: 44.867559,
    lng: -0.558822,
    challenge:
      "Au bord d'un grand bassin où dorment des bateaux, une vieille grue de métal rouillé tend son bras vers le ciel. Trouve-la !",
    photo: commons('bassins-a-flot', 'Zairon', 'CC BY-SA 4.0', 'Bordeaux_Bassin_%C3%A0_Flot_10.jpg', { x: 50, y: 50, zoom: 1 }),
    hints: ['Quartier de Bacalan, aux bassins à flot.', 'Juste en face de l’énorme bloc de béton de la base sous-marine.'],
    story:
      "Les bassins à flot ont été creusés au XIXᵉ siècle : grâce à des écluses, l'eau y reste toujours au même niveau, même quand la marée fait monter et descendre la Garonne. Les bateaux pouvaient ainsi charger et décharger tranquillement. Les grues comme celle-ci soulevaient les marchandises : elles sont restées comme souvenir du port.",
  }),
  place({
    id: 'seed-base-sous-marine',
    title: 'La base sous-marine',
    category: 'memoire',
    quartier: 'bacalan',
    difficulty: 1,
    lat: 44.869909,
    lng: -0.558644,
    challenge:
      "Un bâtiment gigantesque en béton, sans fenêtres, au toit épais comme une muraille. Il a été construit pendant la guerre pour cacher… des sous-marins ! Trouve-le.",
    photo: commons('base-sous-marine', 'Rc1959', 'CC BY-SA 4.0', 'Base_sous-marine_de_Bordeaux.20151222_133211.jpg', {
      x: 50,
      y: 50,
      zoom: 1,
    }),
    hints: ['Quartier de Bacalan, au bout des bassins à flot.', 'Impossible de le rater : c’est le plus gros bloc de béton du quartier.'],
    story:
      "Pendant la Seconde Guerre mondiale, l'armée allemande qui occupait Bordeaux a fait construire cette base pour abriter ses sous-marins, avec un toit en béton de plusieurs mètres d'épaisseur pour résister aux bombes. Regarde le bord du toit : le béton est abîmé par endroits. Aujourd'hui, ce lieu de mémoire accueille des expositions d'art.",
  }),
  place({
    id: 'seed-pont-chaban',
    title: 'Le pont qui se lève',
    category: 'monument',
    quartier: 'chartrons',
    difficulty: 1,
    lat: 44.859048,
    lng: -0.552582,
    challenge:
      "Quatre hautes tours grises au-dessus de la Garonne… et entre elles, la route peut monter comme un ascenseur ! Trouve ce pont.",
    photo: commons('pont-chaban', 'Prométhée33', 'CC BY-SA 3.0', 'Pont_Jacques-Chaban-Delmas_lev%C3%A9_01.JPG', {
      x: 50,
      y: 50,
      zoom: 1,
    }),
    hints: ['Entre Bacalan et la Bastide.', 'Tout près de la Cité du Vin.'],
    story:
      "C'est le pont Jacques-Chaban-Delmas, inauguré en 2013. C'est un pont levant : la partie centrale monte le long des quatre piliers pour laisser passer les grands bateaux, comme les paquebots de croisière et les grands voiliers. Sur la photo, il est levé ! Si tu as de la chance, tu le verras peut-être monter.",
  }),

  place({
    id: 'seed-requin-mer-marine',
    title: 'Le requin d’argent de Bacalan',
    category: 'sculpture',
    quartier: 'bacalan',
    difficulty: 1,
    lat: 44.867441,
    lng: -0.554225,
    challenge:
      "Devant un musée, un énorme requin brillant comme un miroir est suspendu à un portique de métal rouillé, la gueule grande ouverte. Trouve-le… si tu n'as pas peur !",
    photo: commons('requin-mer-marine', 'CGE', 'CC0', 'Requin_de_Philippe_Pasqua_-_1.jpg', { x: 50, y: 50, zoom: 1 }),
    hints: ['Devant le musée Mer Marine, à Bacalan.', 'Entre les bassins à flot et la Cité du Vin.'],
    story:
      "Ce requin est une sculpture de l'artiste Philippe Pasqua, installée devant le musée Mer Marine. Il est en acier poli, si brillant qu'on s'y voit comme dans un miroir. Suspendu comme une prise de pêche, il fait réfléchir à la place des requins, souvent chassés par les humains. Approche-toi : vois-tu ton reflet sur son flanc ?",
  }),
  place({
    id: 'seed-formes-de-radoub',
    title: 'Les formes de radoub',
    category: 'monument',
    quartier: 'bacalan',
    difficulty: 2,
    lat: 44.865717,
    lng: -0.554423,
    challenge:
      "Près des bassins à flot, d'immenses bassins de pierre en forme de bateau sont… vides ! Trouve-les : à quoi pouvaient-ils servir ?",
    photo: commons('formes-de-radoub', 'picotche', 'CC BY-SA 3.0', 'Formes_de_radoub_du_port_2012-09-26_14-07-16.jpg', {
      x: 50,
      y: 50,
      zoom: 1,
    }),
    hints: ['Bacalan, entre les bassins à flot et la Garonne.', 'Ils ont la forme allongée d’une coque de bateau.'],
    story:
      "Ce sont des formes de radoub : on y faisait entrer un bateau, on fermait la porte, puis on vidait l'eau. Le bateau se retrouvait au sec, posé sur des cales, et on pouvait réparer ou nettoyer sa coque. « Radouber », ça veut dire réparer un navire ! Regarde les marches sur les côtés : les ouvriers descendaient par là.",
  }),
  place({
    id: 'seed-magasin-vivres',
    title: 'Le magasin des vivres de la Marine',
    category: 'facade',
    quartier: 'bacalan',
    difficulty: 2,
    lat: 44.8645,
    lng: -0.549649,
    challenge:
      "Le long des rails du tram, un très long bâtiment de pierre aux fenêtres grillagées aligne ses arcades. Trouve-le : à ton avis, qu'est-ce qu'on y rangeait ?",
    photo: commons('magasin-vivres', 'Symac', 'CC BY-SA 3.0', 'Magasin_aux_vivres,_Bordeaux_(2).jpg', { x: 50, y: 50, zoom: 1 }),
    hints: ['Quai de Bacalan.', 'Un bâtiment très long et bas, au bord du tram.'],
    story:
      "C'était le magasin des vivres de la Marine : on y stockait la nourriture (biscuits, farine, viande salée…) destinée aux marins des navires de guerre. Un long voyage en mer demandait des tonnes de provisions ! Les grilles aux fenêtres protégeaient ces réserves précieuses.",
  }),
  place({
    id: 'seed-plaque-favreau',
    title: 'Le prêtre des dockers',
    category: 'memoire',
    quartier: 'bacalan',
    difficulty: 3,
    lat: 44.8697725,
    lng: -0.5479997,
    challenge:
      "Rue Achard, une plaque de marbre avec une photo encadrée rend hommage à un homme qui était à la fois prêtre… et docker. Trouve-la et lis son nom.",
    photo: commons('plaque-favreau', 'Als33120', 'CC BY-SA 4.0', 'Bacalan-rueAchard-04.jpg', { x: 50, y: 50, zoom: 1 }),
    hints: ['Rue Achard, à Bacalan.', 'Cherche près de l’église Saint-Rémi.'],
    story:
      "C'est Michel Favreau, un « prêtre-ouvrier » : au lieu de rester seulement à l'église, il travaillait comme docker sur le port, pour vivre comme les ouvriers du quartier. Il est mort dans un accident au travail, au dock n°2, le 7 avril 1951 : il n'avait même pas 30 ans. Bacalan était un quartier de travailleurs du port, et les habitants se souviennent de lui.",
  }),

  // ---------- Belcier ----------
  place({
    id: 'seed-belcier-sarrette',
    title: 'Le visage de la rue Sarrette',
    category: 'sculpture',
    quartier: 'belcier',
    difficulty: 3,
    lat: 44.82315,
    lng: -0.552267,
    challenge: "Au-dessus d'une porte en bois, un visage de femme entouré de volutes veille sur la rue. Trouve-le !",
    photo: commons('belcier-sarrette', 'Bétium217', 'CC BY-SA 4.0', 'Bordeaux_belcier_2017_0827.jpg', { x: 50, y: 50, zoom: 1 }),
    hints: ['Rue Sarrette, à Belcier.', 'Marche en levant les yeux au-dessus des portes.'],
    story:
      "C'est un mascaron ! Même dans Belcier, un quartier d'ouvriers et d'usines, entre la gare et la Garonne, on décorait les façades. La rue porte le nom de Bernard Sarrette, le fondateur du Conservatoire de musique de Paris.",
  }),
  place({
    id: 'seed-belcier-paludate',
    title: 'Le caducée et les raisins du quai de Paludate',
    category: 'facade',
    quartier: 'belcier',
    difficulty: 2,
    lat: 44.827788,
    lng: -0.55199,
    challenge:
      "Au-dessus de deux grandes portes en arc, un écusson est sculpté dans la pierre : deux serpents s'enroulent autour d'un bâton, entourés de grappes. Trouve-le : de quels fruits sont les grappes ?",
    photo: commons('belcier-paludate', 'Bétium217', 'CC BY-SA 4.0', 'Bordeaux_belcier_2017_0876.jpg', { x: 50, y: 50, zoom: 1 }),
    hints: ['Quai de Paludate, au numéro 78.', 'Côté Garonne, entre la gare et la MÉCA.'],
    story:
      "Ce sont des grappes de raisin ! Et les deux serpents enroulés autour d'un bâton, c'est un caducée : le symbole de Mercure, le dieu romain du commerce et des marchands. Raisin + commerce… ce bâtiment appartenait sans doute à un négociant en vin. Les grandes portes en arc laissaient passer les charrettes chargées de barriques. Attention, ne confonds pas avec le symbole des médecins et des pharmaciens, qui n'a souvent qu'un seul serpent !",
  }),
  place({
    id: 'seed-belcier-ecole',
    title: 'L’école de filles de Belcier',
    category: 'plaque',
    quartier: 'belcier',
    difficulty: 2,
    lat: 44.82419,
    lng: -0.551328,
    challenge:
      "Au-dessus de la porte d'une école, trois mots sont gravés dans la pierre. Trouve-les : pourquoi seraient-ils bizarres aujourd'hui ?",
    photo: commons('belcier-ecole', 'Bétium217', 'CC BY-SA 4.0', 'Bordeaux_belcier_2017_0817.jpg', { x: 50, y: 50, zoom: 1 }),
    hints: ['Place Ferdinand-Buisson, à Belcier.', 'Lève les yeux au-dessus de la porte d’entrée.'],
    story:
      "Il est écrit « ÉCOLE DE FILLES » ! Autrefois, les filles et les garçons n'allaient pas dans la même école. Aujourd'hui, c'est une école pour tout le monde, mais l'inscription est restée. La place porte le nom de Ferdinand Buisson, qui a participé à la création de l'école publique, gratuite et laïque, à la fin du XIXᵉ siècle.",
  }),
  place({
    id: 'seed-belcier-beck',
    title: 'Le belvédère de la rue Beck',
    category: 'facade',
    quartier: 'belcier',
    difficulty: 2,
    lat: 44.82203,
    lng: -0.550368,
    challenge:
      "Tout en haut d'un toit d'ardoise, une petite terrasse entourée d'une rambarde domine le quartier, comme une vigie. Trouve-la !",
    photo: commons('belcier-beck', 'Bétium217', 'CC BY-SA 4.0', 'Bordeaux_belcier_2017_0795.jpg', { x: 50, y: 50, zoom: 1 }),
    hints: ['Rue Beck, au numéro 26.', 'Lève les yeux au-dessus des lucarnes.'],
    story:
      "Une petite terrasse comme celle-ci, au sommet d'un toit, s'appelle un belvédère : c'est un endroit d'où l'on a une belle vue. D'en haut, on devait voir la Garonne et les bateaux. Le quartier Belcier doit son nom à François de Belcier, un juriste bordelais du XVIᵉ siècle.",
  }),

  // ---------- Fondaudège ----------
  place({
    id: 'seed-saint-ferdinand',
    title: 'Le clocher de Saint-Ferdinand',
    category: 'eglise',
    quartier: 'saint-seurin',
    difficulty: 1,
    lat: 44.85021,
    lng: -0.58719,
    challenge:
      "Au bout d'une rue, une grande église sombre dresse son clocher carré, avec une horloge ronde tout en haut. Trouve-la : quelle heure indique l'horloge ?",
    photo: commons('saint-ferdinand', 'Sylvain Machefert / Symac', 'CC BY-SA 3.0', '%C3%89glise_Saint-Ferdinand,_Bordeaux.jpg', {
      x: 50,
      y: 50,
      zoom: 1,
    }),
    hints: ['Quartier Fondaudège, côté nord.', 'Son clocher dépasse des toits des échoppes.'],
    story:
      "L'église Saint-Ferdinand a été construite au XIXᵉ siècle, quand le quartier se remplissait de maisons et d'habitants. Regarde les grandes fenêtres pointues et les contreforts, ces piliers collés aux murs qui les empêchent de s'écarter. Quant à l'heure, c'est à toi de la noter !",
  }),
  place({
    id: 'seed-carmes-stereo',
    title: 'L’église des Carmes, d’hier à aujourd’hui',
    category: 'eglise',
    quartier: 'chartrons',
    difficulty: 2,
    lat: 44.8517,
    lng: -0.57784,
    challenge:
      "Cette vieille photo en double (on la regardait avec des lunettes spéciales pour voir en relief !) montre une église avec un clocher pointu. Trouve-la et compare : qu'est-ce qui a changé ?",
    photo: commons(
      'carmes-stereo',
      'Rijksmuseum (photo stéréoscopique ancienne)',
      'CC0',
      'Exterieur_van_de_%C3%89glise_des_Carmes_te_Bordeaux_%C3%89glise_des_Carmes,_%C3%A0_Bordeaux_(titel_op_object),_RP-F-F06375.jpg',
      { x: 50, y: 50, zoom: 1 },
    ),
    hints: ['Entre Fondaudège et les Chartrons, près du cours Portal.', 'Aujourd’hui, c’est la chapelle d’une résidence.'],
    story:
      "Ce type de photo s'appelle une vue stéréoscopique : deux photos presque identiques, prises côte à côte, comme vues par l'œil gauche et l'œil droit. Dans un appareil spécial, elles donnaient l'illusion du relief, un peu comme la 3D ! Elle a sans doute été prise au XIXᵉ siècle, quand ces photos en relief étaient à la mode. L'église des Carmes était celle d'un couvent de carmes, des religieux.",
  }),
  place({
    id: 'seed-labottiere',
    title: 'La porte bleue du petit hôtel Labottière',
    category: 'facade',
    quartier: 'saint-seurin',
    difficulty: 2,
    lat: 44.849046,
    lng: -0.582216,
    challenge:
      "Une porte bleu canard, en arc, entre deux fenêtres à barreaux, avec une guirlande sculptée au-dessus. Trouve-la, et regarde ce qui sert à frapper à la porte !",
    photo: commons('labottiere', 'Sylvain Machefert / Symac', 'CC BY-SA 3.0', 'Petit_h%C3%B4tel_Labotti%C3%A8re.jpg', {
      x: 50,
      y: 50,
      zoom: 1,
    }),
    hints: ['Quartier Fondaudège, près du Jardin public.', 'Une maison basse en pierre, avec un petit toit d’ardoise.'],
    story:
      "C'est le petit hôtel Labottière, une maison ancienne, sans doute du XVIIIᵉ siècle. Un « hôtel », autrefois, c'était la grande maison d'une famille riche en ville, pas un endroit où l'on dort en voyage ! L'objet en métal fixé sur la porte s'appelle un heurtoir : avant les sonnettes, on le soulevait pour frapper.",
  }),
  place({
    id: 'seed-rosa-bonheur',
    title: 'Rosa Bonheur sur la terrasse',
    category: 'sculpture',
    quartier: 'saint-seurin',
    difficulty: 1,
    lat: 44.847803,
    lng: -0.579308,
    challenge:
      "Sur la terrasse du Jardin public, une dame de marbre blanc est assise, un carnet de dessin sur les genoux. Trouve-la et lis son nom et ses dates sur le socle.",
    photo: commons('rosa-bonheur', 'Didier-CTP', 'CC BY-SA 4.0', 'Statue-Rosa-Bonheur_face_10-2018.jpg', { x: 50, y: 50, zoom: 1 }),
    hints: ['Jardin public, sur la terrasse devant les arcades.', 'Côté cours de Verdun.'],
    story:
      "C'est Rosa Bonheur, une peintre née à Bordeaux en 1822, célèbre dans le monde entier pour ses tableaux d'animaux : chevaux, vaches, lions… À une époque où les femmes artistes étaient rares, elle est devenue l'une des peintres les plus connues de son temps. La statue a été sculptée par Gaston Veuvenot Leroux et installée en 1910.",
  }),
  place({
    id: 'seed-berger-flute',
    title: 'Le berger à la flûte',
    category: 'sculpture',
    quartier: 'saint-seurin',
    difficulty: 2,
    lat: 44.847879,
    lng: -0.579639,
    challenge:
      "Dans un massif de fleurs du Jardin public, un jeune berger de pierre est assis sur un rocher et joue de la flûte. Trouve-le !",
    photo: commons('berger-flute', 'Symac / Sylvain Machefert', 'CC BY-SA 4.0', 'Berger_jouant_de_la_fl%C3%BBte,_octobre_2014.JPG', {
      x: 50,
      y: 50,
      zoom: 1,
    }),
    hints: ['Jardin public, près des bâtiments en pierre.', 'Pas loin de Rosa Bonheur et du garçon sur sa chimère.'],
    story:
      "Cette statue s'appelle « Berger jouant de la flûte », du sculpteur Henri-Charles Maniglier. Le temps et la pluie ont un peu usé la pierre : ses mains et sa flûte sont abîmées. Tends l'oreille : entends-tu une musique ? Non ? C'est normal, c'est une flûte de pierre !",
  }),
  place({
    id: 'seed-guignol-guerin',
    title: 'Le théâtre de Guignol',
    category: 'autre',
    quartier: 'saint-seurin',
    difficulty: 1,
    lat: 44.84825,
    lng: -0.57703,
    challenge:
      "Dans le Jardin public, un petit théâtre à rideaux rouges accueille des marionnettes qui se donnent des coups de bâton ! Trouve le castelet de Guignol.",
    photo: commons('guignol-guerin', 'Guignol Guérin', 'CC BY-SA 4.0', 'Castelet_du_Guignol_Guerin.jpg', { x: 50, y: 50, zoom: 1 }),
    hints: ['Jardin public.', 'Les spectacles n’ont pas lieu tous les jours : renseigne-toi avant !'],
    story:
      "Le Guignol Guérin joue pour les enfants de Bordeaux depuis 1853 : c'est l'un des plus vieux théâtres de marionnettes de France ! Guignol est une marionnette née à Lyon, qui se moque des gendarmes et des méchants. Si tu assistes à un spectacle, crie bien fort pour le prévenir quand le voleur arrive !",
  }),
  // ---------- Curiosités et nature (toute la ville) ----------
  place({
    id: 'seed-miroir-eau',
    title: "Le miroir d'eau",
    category: 'autre',
    quartier: 'centre',
    difficulty: 1,
    lat: 44.84169,
    lng: -0.56908,
    challenge:
      'Sur les quais, face à la place de la Bourse, le sol devient un immense miroir. Regarde bien dans le reflet : trouve la flèche Saint-Michel… la tête en bas !',
    photo: commons('miroir-eau', 'Léna', 'CC BY 3.0', 'Miroir_d%27eau_Bordeaux_3.jpg', { x: 50, y: 50, zoom: 1 }),
    hints: ['Face à la place de la Bourse, entre la route et la Garonne.', 'Tourne-toi vers le pont de pierre.'],
    story:
      "C'est le miroir d'eau, ouvert en 2006 : une immense dalle de pierre recouverte de seulement 2 centimètres d'eau, juste assez pour refléter le ciel et les façades. De temps en temps, il se vide puis souffle un brouillard d'eau : attends un peu pour le voir ! La grande pointe qui se reflète, c'est bien la flèche Saint-Michel, le plus haut clocher de Bordeaux (114 mètres). Attention : il est souvent arrêté en hiver.",
  }),
  place({
    id: 'seed-parc-bordelais-cygnes',
    title: 'Les cygnes du parc Bordelais',
    category: 'nature',
    quartier: 'cauderan',
    difficulty: 1,
    lat: 44.853644,
    lng: -0.6041,
    challenge:
      "Dans ce grand parc, cherche l'étang au pied d'un gros rocher. Qui nage ici, avec un bec orange et une bosse noire ?",
    photo: commons(
      'parc-bordelais-cygne',
      'Matthew Perosi',
      'CC BY-SA 3.0',
      'Friendly_goose_at_Parc_Bordelais_-_panoramio.jpg',
      { x: 50, y: 50, zoom: 1 },
    ),
    hints: ["C'est dans le parc Bordelais, à Caudéran.", "Suis les allées jusqu'à l'eau, près des rochers."],
    story:
      "Le parc Bordelais a ouvert à la fin du XIXᵉ siècle : c'est l'un des plus grands parcs de la ville, avec ses allées, ses grands arbres et ses étangs. L'oiseau au bec orange avec une bosse noire, c'est un cygne tuberculé : la bosse s'appelle un « tubercule ». Sur la photo, il n'a pas l'air timide ! Mais ne lui donne pas de pain : ce n'est pas bon pour les oiseaux.",
  }),
  place({
    id: 'seed-dom-bedos-ginkgos',
    title: 'Les arbres aux éventails du square Dom-Bedos',
    category: 'nature',
    quartier: 'saint-michel',
    difficulty: 2,
    lat: 44.83107,
    lng: -0.56028,
    challenge:
      "Derrière l'église Sainte-Croix, un square cache une rangée d'arbres dont les feuilles ont la forme de petits éventails. En automne, ils deviennent jaune d'or. Trouve-les et ramasse une feuille !",
    photo: commons(
      'dom-bedos-ginkgos',
      'Tylwyth Eldar',
      'CC BY-SA 4.0',
      'Bordeaux_-_Square_Dom_Bedos_12.jpg',
      { x: 50, y: 50, zoom: 1 },
    ),
    hints: ["C'est le square Dom-Bedos, juste derrière l'église Sainte-Croix.", 'Les arbres sont alignés devant le grand bâtiment, au bord de la pelouse.'],
    story:
      "Ces arbres sont sans doute des ginkgos : vérifie, leurs feuilles ressemblent à de petits éventails. Le ginkgo est un arbre très ancien : sa famille existait déjà au temps des dinosaures ! On l'appelle aussi « l'arbre aux quarante écus ». Et Dom Bedos ? C'était un moine du XVIIIᵉ siècle, grand fabricant d'orgues : c'est lui qui a construit l'orgue de l'église Sainte-Croix, juste à côté.",
  }),
  place({
    id: 'seed-jardin-mairie',
    title: 'Le jardin caché de la mairie',
    category: 'nature',
    quartier: 'centre',
    difficulty: 1,
    lat: 44.83775,
    lng: -0.58105,
    challenge:
      "Derrière l'hôtel de ville se cache un jardin, entre les deux ailes du musée des Beaux-Arts. Cette carte postale a plus de 100 ans : retrouve l'endroit d'où le photographe a pris la photo !",
    photo: commons(
      'jardin-mairie',
      'Anonyme (carte postale ancienne)',
      'Domaine public',
      'Bordeaux_-_Jardin_de_la_Mairie.jpg',
      { x: 50, y: 50, zoom: 1 },
    ),
    hints: ["On y entre par le cours d'Albret, entre les deux ailes du musée.", "Mets-toi face à la grande façade de l'hôtel de ville."],
    story:
      "Le grand bâtiment, c'est le palais Rohan, construit au XVIIIᵉ siècle pour un archevêque de Bordeaux, Ferdinand Maximilien Mériadec de Rohan : le quartier Mériadeck porte son nom ! Il est devenu l'hôtel de ville au XIXᵉ siècle. Les deux bâtiments qui encadrent le jardin abritent le musée des Beaux-Arts. Le petit poème en haut de la carte postale est écrit en gascon, la langue d'autrefois de la région. Compare avec aujourd'hui : qu'est-ce qui a changé ?",
  }),
  place({
    id: 'seed-parc-floral-japon',
    title: 'La lanterne du jardin japonais',
    category: 'nature',
    quartier: 'bacalan',
    difficulty: 2,
    lat: 44.90244,
    lng: -0.56282,
    challenge:
      "Au parc floral, près du lac, un petit jardin japonais se cache derrière un portail en bois. Trouve la lanterne de pierre au bord de l'eau !",
    photo: commons(
      'parc-floral-fukuoka',
      'Jefunky',
      'CC BY-SA 4.0',
      'Parc_floral_de_Bordeaux%2C_pavillon_de_Fukuoka_2.jpg',
      { x: 56, y: 62, zoom: 1.5 },
    ),
    hints: ['Parc floral de Bordeaux, au nord de la ville, près du lac.', 'Cherche le portail en bois de style japonais.'],
    story:
      "Cette lanterne de pierre s'appelle un « tōrō » : dans les jardins japonais, elle éclairait les chemins la nuit. Le jardin porte le nom de Fukuoka, une ville du Japon jumelée avec Bordeaux. Le parc floral a été créé au début des années 1990 pour une grande fête des fleurs, les Floralies. Et pourquoi l'eau est-elle si verte sur la photo ? Ce sont des lentilles d'eau, de toutes petites plantes qui flottent à la surface.",
  }),

  // ---------- Églises, porte et monument (Centre, Sainte-Croix, Caudéran) ----------
  place({
    id: 'seed-porte-monnaie',
    title: 'La porte de la Monnaie',
    category: 'monument',
    quartier: 'saint-michel',
    difficulty: 1,
    lat: 44.833123,
    lng: -0.561852,
    challenge:
      'Cette porte de pierre, plus petite et plus simple que ses grandes sœurs, se dresse pile entre deux quais. Sur ses piliers, deux plaques bleues donnent leurs noms : lesquels ?',
    photo: commons('porte-monnaie', 'Sylvain Machefert', 'CC BY-SA 3.0', 'Porte_de_la_monnaie_depuis_les_quais.jpg', {
      x: 50,
      y: 50,
      zoom: 1,
    }),
    hints: ['Sur les quais, entre le pont de pierre et le pont Saint-Jean.', 'Tout près du conservatoire de musique, côté Sainte-Croix.'],
    story:
      "Sur la photo, à gauche, c'est le quai Sainte-Croix ; à droite, le quai de la Monnaie. La porte a été construite en 1758 et 1759 pour que les habitants du quartier puissent rejoindre le port à travers les remparts. Elle doit son nom à l'hôtel de la Monnaie, au bout de la rue qui part de l'arche : c'est là qu'on fabriquait les pièces de monnaie du royaume ! Autrefois, on écrivait même « Monnoye ». Passe sous la porte et remonte la rue pour voir l'ancien atelier.",
  }),
  place({
    id: 'seed-notre-dame-chapelet',
    title: 'Le cadeau du ciel de Notre-Dame',
    category: 'eglise',
    quartier: 'centre',
    difficulty: 2,
    lat: 44.8428,
    lng: -0.57625,
    challenge:
      "Au-dessus de la grande porte de cette église toute sculptée, un homme à genoux reçoit un cadeau venu du ciel, entouré d'anges. Qu'est-ce que c'est ? Le nom de la place te donnera un indice !",
    photo: commons('notre-dame-chapelet', 'Christophe Finot', 'CC BY-SA 2.5', 'Bordeaux_-_Eglise_Notre-Dame_1.jpg', {
      x: 37,
      y: 63,
      zoom: 2,
    }),
    hints: ['Tout près du Grand-Théâtre, rue Mably.', "L'église donne sur la place du Chapelet."],
    story:
      "C'est un chapelet (on dit aussi un « rosaire ») ! La scène montre la Vierge Marie qui le donne à saint Dominique, le fondateur des moines dominicains, qui ont construit cette église entre 1684 et 1707. C'est cette remise du chapelet qui a donné son nom à la place. La façade, de style baroque, s'inspire d'une célèbre église de Rome, le Gesù. Autre curiosité : contrairement à presque toutes les églises, son entrée est tournée vers l'est. Dans les niches, quatre statues représentent de grands savants de l'Église : saint Ambroise, saint Augustin, saint Jérôme et saint Grégoire.",
  }),
  place({
    id: 'seed-saint-pierre-horloge',
    title: "L'horloge cachée de Saint-Pierre",
    category: 'eglise',
    quartier: 'centre',
    difficulty: 2,
    lat: 44.839795,
    lng: -0.570261,
    challenge:
      "Tout en haut de la façade de cette église gothique, juste sous la croix, une petite rosace ronde cache un objet qu'on n'attend pas dans une église. Lequel ?",
    photo: commons('saint-pierre-horloge', 'Chris06', 'CC BY-SA 4.0', '2023_Eglise_Saint-Pierre_de_Bordeaux_%282%29.jpg', {
      x: 50,
      y: 50,
      zoom: 1,
    }),
    hints: ['Au cœur du quartier Saint-Pierre, sur la place du même nom.', 'Lève la tête bien au-dessus du grand vitrail.'],
    story:
      "Une horloge ! Elle est logée dans une rosace de pierre, comme au centre d'une fleur. L'église Saint-Pierre est très ancienne : il y avait déjà une église ici il y a plus de 1 400 ans, près du port antique de Bordeaux, là où une petite rivière, la Devèze, se jetait dans la Garonne. La rivière s'est peu à peu envasée et le quartier a été construit par-dessus. L'église d'aujourd'hui a été rebâtie du XIVᵉ au XVᵉ siècle, puis remaniée en 1882.",
  }),
  place({
    id: 'seed-cauderan-saint-amand',
    title: "La rosace de l'église de Caudéran",
    category: 'eglise',
    quartier: 'cauderan',
    difficulty: 1,
    lat: 44.85168,
    lng: -0.614871,
    challenge:
      'Au cœur de Caudéran, cherche un grand clocher pointu qui se voit de loin. Puis trouve la grande rosace ronde au-dessus de la porte : à quoi te fait-elle penser, une fleur ou une roue ?',
    photo: commons('cauderan-saint-amand', 'PA', 'CC BY-SA 4.0', '%C3%89glise_Caud%C3%A9ran.jpg', { x: 50, y: 50, zoom: 1 }),
    hints: ['Au centre de Caudéran, dans le vieux bourg de Saint-Amand.', 'La grande porte en bois est juste sous la rosace.'],
    story:
      "Les deux ! Une rosace, c'est un grand vitrail rond découpé dans la pierre : ses rayons partent du centre comme ceux d'une roue, et ses lobes font comme des pétales. Cette église porte le nom de saint Amand, car Caudéran s'est formé autour du bourg de Saint-Amand. Et Caudéran n'a pas toujours été un quartier de Bordeaux : c'était une commune à part entière, avec son propre maire, jusqu'en 1965 ! Son nom est aussi celui d'une petite rivière, la Caudéran.",
  }),
  place({
    id: 'seed-cauderan-monument',
    title: 'Le monument aux morts de Caudéran',
    category: 'memoire',
    quartier: 'cauderan',
    difficulty: 1,
    lat: 44.850827,
    lng: -0.606782,
    challenge:
      "Sur cette vieille carte postale, un soldat lève le bras tout en haut d'une colonne, et deux canons entourent le monument. Retrouve-le : les canons sont-ils toujours là ?",
    photo: commons(
      'cauderan-monument',
      'Auteur inconnu (carte postale ancienne)',
      'Domaine public',
      'Caud%C3%A9ran_-_Monument_aux_morts_1.jpg',
      { x: 50, y: 50, zoom: 1 },
    ),
    hints: ['À Caudéran, sur la place du Monument-aux-Morts.', 'Cherche une haute colonne surmontée d’une statue de soldat.'],
    story:
      "Ce monument rend hommage aux habitants de Caudéran morts pendant la Première Guerre mondiale. Sur la carte postale, on lit « 1914-1918 – Aux héros de la Grande Guerre », et les longs murs autour portent des listes de noms. Le soldat du haut est un « poilu » : c'est comme ça qu'on appelait les soldats français de 14-18. En dessous, une femme lève une grande palme, symbole d'hommage et de victoire. Et les canons ? À toi de voir ! Regarde aussi si d'autres dates ont été ajoutées depuis.",
  }),

  // ---------- Hyper-centre : place Camille-Jullian et alentours ----------
  place({
    id: 'seed-jaguar-victor-hugo',
    title: 'La Jaguar suspendue dans le vide',
    category: 'sculpture',
    quartier: 'centre',
    difficulty: 1,
    lat: 44.835094,
    lng: -0.571917,
    challenge:
      "En hauteur, sur la façade d'un parking, une vieille voiture verte a l'air d'avoir défoncé le mur… et d'être sur le point de tomber ! Trouve-la, puis regarde bien : comment tient-elle ?",
    photo: commons('jaguar-victor-hugo', 'Van de Schaufel', 'CC BY 4.0', 'Parkhaus_in_Bordeaux.jpg', { x: 50, y: 50, zoom: 1 }),
    hints: ['Sur le cours Victor-Hugo, sur la façade du parking.', 'Lève la tête : elle est à plusieurs étages du sol.'],
    story:
      "Pas d'inquiétude, ce n'est pas un accident : c'est une œuvre d'art ! Cette vieille Jaguar anglaise (un modèle des années 1950-1960) a été installée au début des années 1990, quand le parking a été rénové. L'idée vient de l'architecte bordelais Jean-François Dosso. La voiture repose en fait sur la structure du parking (regarde les poteaux en dessous), et on lui a retiré son moteur pour qu'elle soit plus légère. Depuis, elle fait sursauter les passants !",
  }),
  place({
    id: 'seed-camille-jullian-colonne',
    title: 'La colonne romaine de la place Camille-Jullian',
    category: 'monument',
    quartier: 'centre',
    difficulty: 2,
    lat: 44.838841,
    lng: -0.572375,
    challenge:
      "Cette colonne est faite de vraies pierres romaines. Mais regarde bien : le chapiteau (le haut d'une colonne sculpté de feuilles) se trouve à un drôle d'endroit. Où ?",
    photo: commons('camille-jullian-colonne', 'Als33120', 'CC BY-SA 4.0', 'Bordeaux%2C_Monument_%C3%A0_Camille_Jullian.JPG', {
      x: 50,
      y: 50,
      zoom: 1,
    }),
    hints: ['Place Camille-Jullian, au croisement de la rue Saint-Siméon et de la rue du Pas-Saint-Georges.', 'Compare le haut et le bas de la colonne.'],
    story:
      "Il y en a deux ! Un en haut, comme d'habitude, et un autre… en dessous, qui sert de socle : la colonne est posée sur un chapiteau. Ces pierres ont été découvertes en 1921 dans le mur d'enceinte de la ville romaine, Burdigala. Le monument rend hommage à Camille Jullian (1859-1933), le grand historien des Gaulois et de Bordeaux, qui s'est passionné pour les fouilles et les inscriptions du Bordeaux romain. Lis l'inscription gravée sur le socle : c'est la ville de Bordeaux qui rend hommage à « son historien ».",
  }),
  place({
    id: 'seed-utopia-saint-simeon',
    title: "Le cinéma dans l'église",
    category: 'eglise',
    quartier: 'centre',
    difficulty: 1,
    lat: 44.839068,
    lng: -0.572356,
    challenge:
      "Sur la place Camille-Jullian, un cinéma a un drôle d'air : grande fenêtre pointue, vitrail, gros contreforts de pierre… Qu'était ce bâtiment avant ?",
    photo: commons(
      'utopia-saint-simeon',
      'Patrick Despoix',
      'CC BY-SA 4.0',
      '013_-_Cin%C3%A9ma_Utopia_Saint-Sim%C3%A9on_Place_Camille_Jullian_-_Bordeaux.jpg',
      { x: 50, y: 50, zoom: 1 },
    ),
    hints: ['Place Camille-Jullian, côté nord.', 'Son nom est écrit sur les panneaux de la terrasse.'],
    story:
      "Une église ! L'église Saint-Siméon, construite entre le XIVᵉ et le XVIIᵉ siècle. Après la Révolution, elle a eu plein d'autres vies : on y a fabriqué du salpêtre (pour la poudre à canon), puis elle est devenue en 1836 une école pour les mousses, les apprentis marins. En 1892, une fabrique de conserves s'y installe : on raconte que c'est là qu'a été inventée la petite clé qui ouvre les boîtes de sardines ! Elle a ensuite servi de garage, avant de devenir le cinéma Utopia en 1999.",
  }),
  place({
    id: 'seed-fontaine-saint-projet',
    title: 'Les deux rivières de la fontaine Saint-Projet',
    category: 'fontaine',
    quartier: 'centre',
    difficulty: 2,
    lat: 44.838625,
    lng: -0.574208,
    challenge:
      "Tout en haut de cette fontaine, une femme et un vieux barbu sont allongés. Ils représentent deux choses qui ont fait naître Bordeaux : lesquelles ? Bonus : entre eux, trouve le symbole de la ville.",
    photo: commons('fontaine-saint-projet', 'Marc Ryckaert (MJJR)', 'CC BY-SA 3.0', 'Bordeaux_Fontaine_StProjet_R01.jpg', {
      x: 50,
      y: 50,
      zoom: 1,
    }),
    hints: ['Place Saint-Projet, sur la rue Sainte-Catherine.', 'La fontaine est dans le mur, au fond de la place.'],
    story:
      "Deux rivières : le Peugue et la Devèze ! C'est à l'endroit où elles se jetaient dans la Garonne que Bordeaux est née. Entre les deux statues, les trois croissants de lune entremêlés, c'est le symbole de Bordeaux, le « port de la Lune ». La fontaine date de 1715 et a été sculptée par Michiel van der Voort, un artiste venu des Pays-Bas du Sud. Plus bas, cherche les coquilles Saint-Jacques et les trophées marins (gouvernail, trident…). Et son eau est potable : appuie sur un des trois robinets !",
  }),
  place({
    id: 'seed-galerie-bordelaise',
    title: 'Le passage secret de la Galerie bordelaise',
    category: 'facade',
    quartier: 'centre',
    difficulty: 1,
    lat: 44.841531,
    lng: -0.574012,
    challenge:
      "Rue Sainte-Catherine, une grande arche ouvre sur un passage couvert d'une verrière. Entre, traverse-le jusqu'au bout : dans quelle rue ressors-tu ?",
    photo: commons('galerie-bordelaise', 'Guiguilacagouille', 'CC BY-SA 3.0', 'Galerie_Bordelaise_1.jpg', {
      x: 50,
      y: 50,
      zoom: 1,
    }),
    hints: ['Rue Sainte-Catherine, pas loin du Grand-Théâtre.', "L'entrée ressemble à une grande porte en arc."],
    story:
      "Tu ressors rue des Piliers-de-Tutelle ! Le passage traverse le pâté de maisons en diagonale, ce qui est très rare. La Galerie bordelaise a été construite en 1833 et 1834 par l'architecte Gabriel-Joseph Durand, pour faire aussi bien que les célèbres passages couverts de Paris. La verrière laisse entrer la lumière pour les boutiques, à l'abri de la pluie.",
  }),
  place({
    id: 'seed-saint-remi',
    title: "L'église cachée de la rue Jouannet",
    category: 'eglise',
    quartier: 'centre',
    difficulty: 2,
    lat: 44.841783,
    lng: -0.57197,
    challenge:
      "Dans une rue étroite, une vieille église se cache entre les immeubles : on ne voit que son clocher et un bout de façade. Trouve-la ! Elle ne sert plus pour la messe : à quoi sert-elle aujourd'hui ?",
    photo: commons('saint-remi', 'Sylvain Machefert', 'CC BY-SA 3.0', '%C3%89glise_Saint-R%C3%A9mi_de_Bordeaux%2C_vue_d%27ensemble.jpg', {
      x: 50,
      y: 50,
      zoom: 1,
    }),
    hints: ['Quartier Saint-Pierre, rue Jouannet, tout près de la place de la Bourse.', 'Cherche une grande banderole rouge.'],
    story:
      "C'est devenu un lieu d'expositions, l'« Espace Saint-Rémi » ! L'église Saint-Rémi est très ancienne : une première église romane au XIᵉ siècle, puis une reconstruction en style gothique à partir du XIVᵉ siècle, l'époque de son clocher. Selon une vieille tradition, elle aurait été bâtie à l'emplacement d'un temple romain dédié à Jupiter, près d'un mur romain. Toute petite aujourd'hui, sa paroisse s'étendait autrefois jusqu'à Bacalan ! Elle a été fermée à la Révolution, puis vendue aux enchères en 1792.",
  }),
  place({
    id: 'seed-saint-paul',
    title: 'Le saint déguisé de Saint-Paul',
    category: 'eglise',
    quartier: 'centre',
    difficulty: 2,
    lat: 44.836457,
    lng: -0.572862,
    challenge:
      "Cette église a été construite par les Jésuites. À l'intérieur, au-dessus de l'autel, saint François Xavier s'envole vers le ciel. Pendant la Révolution, des fidèles l'ont « déguisé » pour le sauver. Si l'église est ouverte, entre le voir : à ton avis, en quoi l'ont-ils déguisé ?",
    photo: commons(
      'saint-paul',
      'Chris06',
      'CC BY-SA 4.0',
      '2023_%C3%89glise_Saint-Paul-Saint-Fran%C3%A7ois-Xavier_Bordeaux_%282%29.jpg',
      { x: 50, y: 50, zoom: 1 },
    ),
    hints: ['Rue des Ayres, tout près du cours Victor-Hugo.', 'Cherche le clocher surmonté d’un petit dôme.'],
    story:
      "En révolutionnaire ! Pendant la Révolution, on détruisait les statues religieuses. Pour sauver celle-ci, des fidèles lui ont mis un bonnet phrygien (le bonnet des révolutionnaires), lui ont dessiné une moustache au charbon et lui ont mis une hache et une lance dans les mains. La statue avait l'air si ridicule qu'on l'a laissée tranquille ! Elle a été sculptée par Guillaume Coustou quand il avait 28 ans. L'église, de style baroque, a été construite entre 1661 et 1673, grâce aux dons d'Olive de Lestonnac.",
  }),
  // ---------- Mériadeck et Caudéran ----------
  place({
    id: 'seed-porte-chartreuse',
    title: 'La grande porte de la Chartreuse',
    category: 'monument',
    quartier: 'meriadeck',
    difficulty: 1,
    lat: 44.835505,
    lng: -0.594174,
    challenge:
      "Derrière cette grande porte de pierre, surmontée d'une croix, s'étend le plus grand cimetière de Bordeaux. Un peintre espagnol très célèbre y a été enterré. Lequel ?",
    photo: commons('porte-chartreuse', 'Sylvain Machefert', 'CC BY-SA 3.0', 'Porte_du_cimeti%C3%A8re_de_la_chartreuse%2C_Bordeaux.jpg', {
      x: 50,
      y: 50,
      zoom: 1,
    }),
    hints: ['Place du 11-Novembre, tout près de l’église Saint-Bruno.', 'Son nom commence par un G… et il a peint des rois d’Espagne.'],
    story:
      "C'est Francisco Goya ! Il a passé ses dernières années à Bordeaux et y est mort en 1828. Son corps a ensuite été ramené en Espagne, à Madrid, mais un monument lui rend toujours hommage dans le cimetière. Le cimetière de la Chartreuse est le plus ancien et le plus grand de Bordeaux : il a été aménagé à la fin du XVIIIᵉ siècle sur les jardins d'un couvent de moines chartreux, dont il ne resterait que cette porte. Avant, tout le quartier était un marais ! Sur les côtés de la porte, regarde les anges sculptés.",
  }),
  place({
    id: 'seed-le-vaincu',
    title: 'Le géant à genoux du parc Bordelais',
    category: 'sculpture',
    quartier: 'cauderan',
    difficulty: 2,
    lat: 44.85115,
    lng: -0.603962,
    challenge:
      "Dans le parc, un géant de marbre est à genoux contre un gros bloc de pierre, la tête baissée. Pourquoi ne peut-il pas se relever ? Regarde bien ses mains.",
    photo: rb('le-vaincu', 'Bordeaux_-_Parc_bordelais_-_Le_Vaincu_%28Gabrielle_Dumontet%29_01.jpg', { x: 50, y: 50, zoom: 1 }),
    hints: ['Parc Bordelais, à Caudéran.', 'Cherche une grande sculpture blanche près des allées, au milieu des arbres.'],
    story:
      "Ses mains sont attachées dans son dos ! Cette sculpture s'appelle « Le Vaincu » (ou « La Force enchaînée »). Elle a été sculptée en 1900 par Gabrielle Dumontet, une artiste née à Bordeaux, à une époque où les femmes sculptrices étaient rares. Elle racontait que si l'homme se relevait, il mesurerait quatre mètres de haut ! L'œuvre appartient au musée des Beaux-Arts et a été installée dans le parc en 1952. Cherche la signature de l'artiste et la date, gravées en bas à droite.",
  }),
  place({
    id: 'seed-cour-mably',
    title: 'Le cloître de la cour Mably',
    category: 'monument',
    quartier: 'centre',
    difficulty: 2,
    lat: 44.842983,
    lng: -0.576661,
    challenge:
      "Derrière une porte de la rue Mably se cache une grande cour entourée d'arcades, très calme en plein centre-ville. Entre et lève les yeux : de quelle église voit-on dépasser le clocher ?",
    photo: commons('cour-mably', 'Gzen92', 'CC BY-SA 4.0', 'Couvent_des_Jacobins_-_cour_Mably_%28Bordeaux%29.jpg', {
      x: 50,
      y: 50,
      zoom: 1,
    }),
    hints: ['Rue Mably, tout près du Grand-Théâtre.', "La cour est collée à une église toute sculptée que tu as peut-être déjà trouvée."],
    story:
      "C'est le clocher de l'église Notre-Dame, juste à côté ! Cette cour était le cloître du couvent des Dominicains (on les appelait aussi les Jacobins), construit à la fin du XVIIᵉ siècle en même temps que l'église. Les moines s'y promenaient à l'abri des arcades. Le couvent avait deux cloîtres : celui-ci est le seul qui reste. Aujourd'hui, la cour accueille souvent des expositions et des événements.",
  }),
  // ---------- Repérés par Gaëtan en se baladant ----------
  place({
    id: 'seed-sainte-croix-chevalier',
    title: 'Le chevalier de Sainte-Croix',
    category: 'sculpture',
    quartier: 'saint-michel',
    difficulty: 2,
    lat: 44.83118,
    lng: -0.56165,
    challenge:
      "Sur la façade de l'église Sainte-Croix, un chevalier à cheval est sculpté dans la pierre. Trouve-le ! Que combat-il, sous les sabots de son cheval ?",
    photo: commons(
      'sainte-croix-chevalier',
      'Chris06',
      'CC BY-SA 4.0',
      '2023_Abbatiale_Sainte_Croix_(Bordeaux)_(01).jpg',
      { x: 32, y: 47, zoom: 2.5 },
    ),
    hints: [
      'Lève les yeux : il est à mi-hauteur, pas au niveau des portes.',
      'Regarde au-dessus de la petite porte rouge, à gauche du grand portail.',
    ],
    story:
      "Le chevalier porte un casque, une cotte de mailles et un bouclier, et il plante sa lance dans une créature couchée sous son cheval, sans doute un dragon : c'est la pose de saint Georges terrassant le dragon. Les églises romanes de la région ont souvent un cavalier sculpté sur leur façade. Celle de Sainte-Croix a été beaucoup restaurée au XIXᵉ siècle : regarde, l'arc au-dessus du chevalier est pointu, alors que les arcs plus anciens de l'église sont tout ronds.",
  }),
  place({
    id: 'seed-fronton-quai',
    title: 'Le fronton de pelote basque des quais',
    category: 'autre',
    quartier: 'belcier',
    difficulty: 1,
    lat: 44.83257,
    lng: -0.5588,
    challenge:
      'Au bord de la Garonne, près du pont Saint-Jean, un grand mur rouge au sommet arrondi attend les joueurs. Trouve-le ! Que dit l’inscription tout en haut du mur ?',
    photo: panoramax('fronton-quai', 'Bordeaux Métropole', ETALAB, 'bd09b894-9de4-4e7e-82a3-66add05e84f6', {
      x: 50,
      y: 50,
      zoom: 1,
    }),
    hints: [
      'Sur les quais, côté ville, un peu avant le pont Saint-Jean quand on vient du centre.',
      'Cherche les grands projecteurs et les grilles blanches.',
    ],
    story:
      "C'est un fronton de pelote basque, un jeu venu du Pays basque : on frappe une petite balle très dure contre le mur, à main nue, avec une raquette en bois (la pala) ou avec un grand panier en osier attaché au bras (la chistera). Les lignes au sol marquent les limites du terrain, et les projecteurs permettent de jouer le soir. Sur la photo prise en 2021, l'inscription en haut du mur dit « Bordeaux ma ville sportive ». Est-ce toujours la même ?",
  }),
  // ---------- Pixel art ----------
  place({
    id: 'seed-rousselle-pixels',
    title: 'Le chantier en pixels de la rue de la Rousselle',
    category: 'street-art',
    quartier: 'centre',
    difficulty: 1,
    lat: 44.83756,
    lng: -0.568723,
    challenge:
      "Rue de la Rousselle, des ouvriers et des animaux dessinés en gros carrés de couleur, comme dans un vieux jeu vidéo, construisent un château imaginaire. Trouve-les ! Lequel est ton préféré ?",
    hints: ['Vers les numéros 19 et 21 de la rue de la Rousselle.', 'Regarde les grands panneaux qui ferment un terrain sans maison.'],
    story:
      "C'est « Château Rousselle », une œuvre en pixel art des artistes Landroïd et Vincent Sereks (collectif 1000 m²), peinte en octobre 2023. Le pixel art, c'est dessiner avec de petits carrés, comme les images des premiers jeux vidéo. Elle a été faite là où d'anciens immeubles se sont effondrés : un chantier imaginaire sur un vrai terrain vide ! Les œuvres de chantier ne restent pas toujours longtemps : si elle a disparu, dis-le-nous. Toute la rue de la Rousselle est d'ailleurs pleine de fresques : ouvre l'œil !",
  }),
  place({
    id: 'seed-palais-mini-mosaiques',
    title: 'Les mini-mosaïques de la place du Palais',
    category: 'street-art',
    quartier: 'centre',
    difficulty: 3,
    lat: 44.838387,
    lng: -0.569388,
    challenge:
      'Sur les murs de la place du Palais, des artistes ont collé de toutes petites mosaïques en carreaux de couleur, comme des pixels de jeu vidéo. Ouvre grand les yeux : combien en trouves-tu ?',
    hints: ['Autour de la place, près de la porte Cailhau.', 'Regarde en hauteur, au-dessus des portes et au coin des murs.'],
    story:
      "Ces petites œuvres discrètes sont signées par des artistes de rue comme Diamantaire ou Céramique F2B. Elles font penser aux célèbres « Space Invaders » de l'artiste Invader : depuis la fin des années 1990, il colle dans les rues du monde entier des petits extraterrestres en carreaux de mosaïque, inspirés d'un jeu vidéo de 1978 ; Bordeaux en a eu aussi. Le nombre de mosaïques change avec le temps (certaines sont décollées, d'autres ajoutées) : note ton score dans ton carnet !",
  }),
  // ---------- Saint-Augustin ----------
  place({
    id: 'seed-stade-anneaux',
    title: 'La tour aux anneaux du stade Chaban-Delmas',
    category: 'monument',
    quartier: 'saint-augustin',
    difficulty: 1,
    lat: 44.82868,
    lng: -0.5998,
    challenge:
      "À l'entrée du grand stade, une haute tour blanche monte vers le ciel. Trouve-la ! Combien d'anneaux sont dessinés à son pied ?",
    photo: panoramax('stade-anneaux', 'Bordeaux Métropole', ETALAB, '17fdd70e-2970-4cfb-a2fd-3620024ee9c3', {
      x: 50,
      y: 50,
      zoom: 1,
    }),
    hints: ['Le stade est tout près de l’hôpital Pellegrin.', 'Fais le tour du stade jusqu’aux grandes portes rouges.'],
    story:
      "Il y a 5 anneaux : ce sont les anneaux des Jeux olympiques, un pour chaque continent. Le stade a été inauguré en 1938, pour la Coupe du monde de football qui avait lieu en France : on l'appelait alors le parc Lescure. Il porte depuis 2001 le nom de Jacques Chaban-Delmas, ancien maire de Bordeaux. Sa tour toute droite et ses lignes simples sont typiques du style « art déco » de cette époque. Aujourd'hui, on y joue surtout au rugby.",
  }),
  place({
    id: 'seed-saint-augustin',
    title: "L'église Saint-Augustin",
    category: 'eglise',
    quartier: 'saint-augustin',
    difficulty: 1,
    lat: 44.83261,
    lng: -0.61072,
    challenge:
      'Au cœur du quartier Saint-Augustin, une église dresse son clocher pointu. Trouve son horloge et sa rosace ronde. Combien de portes bleues vois-tu sur la façade ?',
    photo: commons('saint-augustin', 'JeanWilhelm', 'CC0', '%C3%89glise_saint_augustin_bordeaux17_02_25.jpg', {
      x: 50,
      y: 50,
      zoom: 1,
    }),
    hints: ['Place de l’Église-Saint-Augustin.', 'Lève les yeux vers le clocher : l’horloge est juste au-dessus de la rosace.'],
    story:
      "Sur la photo, il y a 2 portes bleues, de chaque côté du grand porche du milieu. La rosace, c'est la fenêtre ronde au-dessus des trois fenêtres étroites. Le quartier et l'église portent le nom de saint Augustin, un évêque d'Afrique du Nord qui a vécu il y a plus de 1 600 ans et dont les livres sont encore lus aujourd'hui.",
  }),
  place({
    id: 'seed-chartreuse-caoulet',
    title: 'La chartreuse le Caoulet',
    category: 'facade',
    quartier: 'saint-augustin',
    difficulty: 2,
    lat: 44.823329,
    lng: -0.595555,
    challenge:
      "Derrière une haie, une longue maison de pierre sans étage cache un œil rond tout en haut de sa façade. Trouve-le !",
    photo: commons(
      'chartreuse-caoulet',
      'Symac / Sylvain Machefert',
      'CC BY-SA 3.0',
      'Chartreuse_le_Caoulet_-_Bordeaux_(201202)_-_3.jpg',
      { x: 50, y: 50, zoom: 1 },
    ),
    hints: ['Dans le quartier Saint-Augustin, au sud du stade Chaban-Delmas.', 'Regarde le haut du mur arrondi, au-dessus des fenêtres.'],
    story:
      "C'est une « chartreuse » : à Bordeaux, on appelle ainsi les élégantes maisons de campagne, souvent tout en longueur et sans étage, que les riches Bordelais faisaient construire hors de la ville, surtout au XVIIIᵉ siècle. Aujourd'hui, la ville les a rattrapées ! La fenêtre ronde s'appelle un « œil-de-bœuf ». C'est une maison privée : on la regarde depuis la rue.",
  }),
  place({
    id: 'seed-carmes-haut-brion',
    title: 'La vigne cachée dans la ville',
    category: 'nature',
    quartier: 'saint-augustin',
    difficulty: 2,
    lat: 44.822345,
    lng: -0.610047,
    challenge:
      'En pleine ville, derrière des grilles, poussent de vrais rangs de vigne qui servent à faire du vin, avec un petit château à tourelle au fond. Trouve-les !',
    photo: commons(
      'carmes-haut-brion',
      'Philippe Labeguerie',
      'CC BY 3.0',
      'Photographie_Ch%C3%A2teau_les_Carmes-Haut-Brion.jpg',
      { x: 50, y: 50, zoom: 1 },
    ),
    hints: ['Rue des Carmes, dans le quartier Saint-Augustin.', 'Regarde à travers les grilles et les portails.'],
    story:
      "C'est le château Les Carmes Haut-Brion, l'un des très rares vignobles encore à l'intérieur de Bordeaux. Son nom vient des Carmes, des moines qui ont cultivé ces vignes pendant longtemps. C'est une propriété privée : on la regarde depuis la rue, sans entrer.",
  }),
  // ---------- Saint-Bruno / Saint-Victor ----------
  place({
    id: 'seed-manufacture-tabacs',
    title: "Le portail bleu de l'ancienne manufacture",
    category: 'facade',
    quartier: 'meriadeck',
    difficulty: 1,
    lat: 44.833887,
    lng: -0.584852,
    challenge:
      "Un long bâtiment de pierre, un grand portail bleu en arc et deux fenêtres rondes au-dessus. Trouve-le ! À ton avis, que fabriquait-on ici autrefois ?",
    photo: commons(
      'manufacture-tabacs',
      'Lantus',
      'CC BY-SA 3.0',
      'Espace_Rodesse_Manufacture_de_Tabac_20250709.jpg',
      { x: 50, y: 50, zoom: 1 },
    ),
    hints: ['Entre Mériadeck et la place Amédée-Larrieu.', 'Cherche le panneau « Espace Rodesse » au-dessus du portail.'],
    story:
      "On y fabriquait… du tabac ! Ce bâtiment faisait partie de l'ancienne manufacture des tabacs de Bordeaux, une grande usine où travaillaient beaucoup d'ouvrières, qui roulaient cigares et cigarettes à la main. L'usine a fermé depuis longtemps et ses bâtiments ont été transformés. Les deux fenêtres rondes, de chaque côté du panneau, s'appellent des « œils-de-bœuf ».",
  }),
  place({
    id: 'seed-chartreuse-femme-allongee',
    title: 'La femme en bronze de la Chartreuse',
    category: 'sculpture',
    quartier: 'meriadeck',
    difficulty: 3,
    lat: 44.836542,
    lng: -0.597583,
    challenge:
      "Dans le cimetière de la Chartreuse, une femme en bronze est allongée sur une tombe, la tête penchée et les mains jointes. Trouve-la, en marchant calmement et sans bruit !",
    photo: commons(
      'chartreuse-femme-allongee',
      'Tylwyth Eldar',
      'Domaine public',
      'Cimeti%C3%A8re_de_la_chartreuse_-_Femme_allong%C3%A9e_04.jpg',
      { x: 50, y: 50, zoom: 1 },
    ),
    hints: ['Entre par la grande porte de la Chartreuse, rue Saint-Bruno ou cours d’Ornano.', 'Elle est assez loin de l’entrée, du côté du boulevard.'],
    story:
      "Les statues de ce genre, qui semblent pleurer sur une tombe, montrent le chagrin de la famille. Celle-ci est en bronze : sur le socle, on peut lire le nom du fondeur, Denonvilliers, l'artisan qui a coulé le métal dans un moule. Le cimetière de la Chartreuse est l'un des plus anciens de Bordeaux : c'est un endroit calme où l'on se promène avec respect.",
  }),
  place({
    id: 'seed-frere-alphonse',
    title: 'Le Frère Alphonse, ami des pauvres',
    category: 'monument',
    quartier: 'meriadeck',
    difficulty: 2,
    lat: 44.835572,
    lng: -0.598403,
    challenge:
      "Dans le cimetière de la Chartreuse, un religieux en bronze, en longue cape, se tient debout sur un haut socle. Trouve-le ! Que tient-il dans la main, le long de son corps ?",
    photo: commons(
      'frere-alphonse',
      'Tylwyth Eldar',
      'CC BY-SA 4.0',
      'Cimeti%C3%A8re_de_la_chartreuse_-_Statue_du_Fr%C3%A8re_Alphonse_03.jpg',
      { x: 50, y: 50, zoom: 1 },
    ),
    hints: ['Dans le cimetière de la Chartreuse.', 'Il est près d’une chapelle aux petits clochetons pointus.'],
    story:
      "Il tient son chapeau à la main. Le Frère Alphonse, né en 1791 à Castelnaudary, a passé sa vie à aider les pauvres de Bordeaux ; il a reçu la Légion d'honneur en 1866 et il est mort en 1876. Cette statue lui rend hommage. Regarde le socle : l'étoile à cinq branches rappelle sans doute sa Légion d'honneur.",
  }),
  // ---------- Ouest de Caudéran, Bastide est ----------
  place({
    id: 'seed-gare-cauderan',
    title: 'La petite gare de Caudéran-Mérignac',
    category: 'facade',
    quartier: 'cauderan',
    difficulty: 1,
    lat: 44.842631,
    lng: -0.627669,
    challenge:
      'Une petite gare au grand toit qui dépasse des murs. Trouve-la ! Combien de portes et fenêtres en arc vois-tu au rez-de-chaussée, sur la façade ?',
    photo: commons('gare-cauderan', 'Marcel Roblin', 'CC BY-SA 4.0', 'Gare_Caud%C3%A9ran-M%C3%A9rignac.jpg', {
      x: 50,
      y: 50,
      zoom: 1,
    }),
    hints: ['À l’ouest de Caudéran, tout près de la limite avec Mérignac.', 'Suis la voie ferrée.'],
    story:
      "Sur la photo, il y en a 3, toutes arrondies en haut et peintes en rouge sombre. C'est la gare de Caudéran-Mérignac : des trains régionaux s'y arrêtent encore, sur la ligne qui part vers le Médoc. Son grand toit qui dépasse beaucoup des murs protège la façade de la pluie et du soleil.",
  }),
  place({
    id: 'seed-travailleurs-indochinois',
    title: 'Le monument aux travailleurs indochinois',
    category: 'memoire',
    quartier: 'cauderan',
    difficulty: 2,
    lat: 44.859253,
    lng: -0.620933,
    challenge:
      "Dans le cimetière des Pins-Francs, une colonne blanche est couverte de grands caractères d'une écriture venue d'Asie. Trouve-la, en marchant calmement !",
    photo: commons(
      'travailleurs-indochinois',
      'Jefunky',
      'CC BY-SA 4.0',
      'Monument_aux_travailleurs_indochinois_de_la_1%C3%A8re_Guerre_mondiale,_cimeti%C3%A8re_des_Pins_Francs,_Bordeaux.jpg',
      { x: 50, y: 50, zoom: 1 },
    ),
    hints: ['Cimetière des Pins-Francs, à Caudéran.', 'Cherche les longues rangées de croix blanches des soldats : la colonne est tout près.'],
    story:
      "Pendant la Première Guerre mondiale (1914-1918), des dizaines de milliers de travailleurs venus d'Indochine (aujourd'hui le Viêt Nam, le Laos et le Cambodge) sont venus en France pour remplacer, dans les usines, les hommes partis au front. Certains sont morts loin de chez eux : ce monument leur rend hommage. Les grands caractères sont écrits à la manière chinoise, une écriture qu'on utilisait autrefois aussi au Viêt Nam.",
  }),
  place({
    id: 'seed-cypressat',
    title: "L'église du Cypressat",
    category: 'eglise',
    quartier: 'bastide',
    difficulty: 1,
    lat: 44.85109,
    lng: -0.54152,
    challenge:
      "Sur la rive droite, une église au clocher pointu porte une horloge. Trouve-la ! Au-dessus de sa porte, un cercle de pierre est décoré d'un symbole : lequel ?",
    photo: commons('cypressat', 'JeanWilhelm', 'CC0', '%C3%89glise_Notre_Dame_du_Cypressat.jpg', { x: 50, y: 50, zoom: 1 }),
    hints: ['À l’est de la Bastide, vers les coteaux de Cenon.', 'Le cercle est juste au-dessus de la porte rouge.'],
    story:
      "C'est l'église Notre-Dame-de-Lourdes du Cypressat. Son nom rappelle Lourdes, dans les Pyrénées, où une jeune fille, Bernadette, a dit avoir vu la Vierge Marie en 1858. Le symbole du cercle est une croix dont chaque bras se termine par de petites boules arrondies, entourée de deux arcs de pierre comme des ailes.",
  }),
  // ---------- Caudéran / Saint-Seurin ouest ----------
  place({
    id: 'seed-mascaron-compas',
    title: 'Le mascaron au compas de la rue Mexico',
    category: 'sculpture',
    quartier: 'cauderan',
    difficulty: 2,
    lat: 44.849107,
    lng: -0.59882,
    challenge:
      "Au-dessus d'une grande porte, un visage de pierre aux boucles d'oreilles cache deux outils. Trouve-le ! Quels sont ces deux outils ?",
    photo: commons(
      'mascaron-compas',
      'Langladure',
      'CC BY-SA 3.0',
      'Bordeaux_Mascaron_art_d%C3%A9co_symbole_ma%C3%A7on.jpg',
      { x: 50, y: 50, zoom: 1 },
    ),
    hints: ['Rue Mexico, près de l’avenue Charles-de-Gaulle.', 'Cherche la porte au numéro 9.'],
    story:
      "Un compas posé sur la tête et une équerre en forme de triangle sur le visage ! Ce visage sculpté est un mascaron. Le compas et l'équerre sont les outils des bâtisseurs ; ensemble, ils forment aussi le symbole des francs-maçons, une association dont les membres se disent « bâtisseurs ». Le cadre en marches d'escalier est typique du style art déco, des années 1920-1930.",
  }),
  place({
    id: 'seed-villa-jeanne',
    title: 'Les gardiens de la villa Jeanne',
    category: 'facade',
    quartier: 'saint-seurin',
    difficulty: 1,
    lat: 44.855201,
    lng: -0.595075,
    challenge:
      "Une villa au toit d'ardoise pointu, avec des briques, de la pierre sculptée et des fenêtres rondes. Deux statues couchées gardent son portail : lions ou sphinx ?",
    photo: commons('villa-jeanne', 'Florent Martin', 'CC BY-SA 3.0', 'Maison_dite_Villa_Jeanne.JPG', {
      x: 50,
      y: 50,
      zoom: 1,
    }),
    hints: ['Juste de l’autre côté du boulevard, au Bouscat, avenue de la Libération.', 'Cherche le numéro 41 sur les piliers du portail.'],
    story:
      "Un gardien couché sur chaque pilier du portail ! Avec leur corps d'animal et leur tête coiffée d'une sorte de foulard, on dirait des sphinx, ces lions à tête humaine de l'Égypte ancienne : regarde bien leur visage et décide. C'est la villa Jeanne, construite en 1898 par l'architecte Bertrand-Alfred Duprat et son fils Cyprien-Alfred. Elle mélange plein de styles à la fois, briques, pierre sculptée, ardoise et pointes de métal sur le toit : on appelle ça l'« éclectisme ». C'est une maison privée : on l'admire depuis le trottoir.",
  }),
  place({
    id: 'seed-tour-333',
    title: 'La tour aux trois 3',
    category: 'autre',
    quartier: 'saint-seurin',
    difficulty: 1,
    lat: 44.852056,
    lng: -0.591454,
    challenge:
      "Rue Ulysse-Gayon, une tour coiffée d'un grand chapeau plat, comme une soucoupe volante, porte des chiffres géants. Trouve-la ! Qu'est-il écrit ?",
    photo: rb('tour-333', 'Bordeaux_-_Rue_Ulysse_Gayon_-_Vue_sur_la_tour_%C3%A0_l%27angle_de_la_rue_Ernest_Renan.jpg', {
      x: 50,
      y: 50,
      zoom: 1,
    }),
    hints: ['À l’angle de la rue Ulysse-Gayon et de la rue Ernest-Renan.', 'Lève les yeux : c’est tout en haut.'],
    story:
      "On y lit « 3 3 3 », trois fois le chiffre 3, chacun précédé d'un petit point. Mystère : nous n'avons pas encore trouvé ce que veulent dire ces chiffres ! Si tu le découvres en te renseignant dans le quartier, dis-le-nous. Le grand toit plat qui dépasse tout autour fait penser à l'architecture des années 1950-1960.",
  }),
  // ---------- Grand Parc, Le Lac ----------
  place({
    id: 'seed-salle-fetes-grand-parc',
    title: 'La mosaïque de la salle des fêtes du Grand Parc',
    category: 'facade',
    quartier: 'chartrons',
    difficulty: 1,
    lat: 44.857122,
    lng: -0.578857,
    challenge:
      "Au Grand Parc, une grande salle est couverte d'une mosaïque géante de rectangles de couleur. Au milieu, un symbole noir est dessiné : que représente-t-il ?",
    photo: panoramax('salle-fetes-grand-parc', 'Bordeaux Métropole', ETALAB, '79a9a310-7673-4b78-99bf-6a4a6c7c9cb2', {
      x: 50,
      y: 50,
      zoom: 1,
    }),
    hints: ['Au cœur de la cité du Grand Parc.', 'Cherche le grand toit plat posé sur des piliers, au-dessus des portes vitrées.'],
    story:
      "Ce sont trois croissants de lune entrelacés, l'emblème de Bordeaux ! On surnomme Bordeaux le « port de la Lune », car la Garonne y dessine une grande courbe en forme de croissant. La salle des fêtes a été construite dans les années 1960, en même temps que les grands immeubles du Grand Parc. Fermée pendant des années, elle a été rénovée et a rouvert en 2018.",
  }),
  place({
    id: 'seed-notre-dame-du-lac',
    title: "L'église en forme de vague",
    category: 'eglise',
    quartier: 'bacalan',
    difficulty: 1,
    lat: 44.87745,
    lng: -0.5704,
    challenge:
      "Dans le quartier Ginko, près du lac, un grand mur gris monte vers le ciel comme une vague, avec une immense croix incrustée dedans. Trouve-le ! À quoi te fait penser sa forme ?",
    photo: panoramax('notre-dame-du-lac', 'Bordeaux Métropole', ETALAB, '5df12979-2899-4b67-936c-b09916eed168', {
      x: 50,
      y: 50,
      zoom: 1,
    }),
    hints: ['Quartier Ginko, au nord de la ville, près du lac.', 'Pas de clocher : c’est le mur lui-même qui monte en pointe.'],
    story:
      "C'est l'église Notre-Dame-du-Lac, construite récemment, en même temps que le quartier Ginko, un « éco-quartier » sorti de terre près du lac depuis les années 2000. Elle n'a pas de clocher classique : son mur se relève en pointe, comme une vague qui se dresse, une voile ou une flèche. Chacun y voit autre chose : et toi ?",
  }),
]
