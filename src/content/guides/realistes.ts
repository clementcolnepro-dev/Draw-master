import type { Guide } from './types';

/** Planches réalistes au graphite (générées avec Gemini, découpées en étapes). */
const imgs = (dir: string, n: number) => Array.from({ length: n }, (_, i) => `guides/${dir}/${String(i + 1).padStart(2, '0')}.jpg`);

export const oeilRealiste: Guide = {
  id: 'oeil-realiste',
  title: 'Œil réaliste au graphite',
  level: 'Moyen',
  viewBox: '',
  layers: [],
  images: imgs('oeil', 6),
  steps: [
    { title: 'Construction : globe, axes et forme générale', tip: 'Le cercle du globe dépasse largement l’ouverture de l’œil' },
    { title: 'Paupières et position de l’iris' },
    { title: 'Iris, pupille et pli de la paupière' },
    { title: 'Premières ombres : coins de l’œil et orbite' },
    { title: 'Valeurs approfondies, cils et sourcil' },
    { title: 'Rendu final et reflet, construction effacée' }
  ]
};

export const nezRealiste: Guide = {
  id: 'nez-realiste',
  title: 'Nez réaliste au graphite',
  level: 'Moyen',
  viewBox: '',
  layers: [],
  images: imgs('nez', 6),
  steps: [
    { title: 'Le bloc : un coin à trois faces', tip: 'L’arête est la face éclairée, le côté droit est dans l’ombre' },
    { title: 'Trois cercles : la pointe et les deux ailes' },
    { title: 'Contour utile, narine et ailes' },
    { title: 'Premières ombres : dessous et côté du nez' },
    { title: 'Demi-teintes et transitions le long de l’arête' },
    { title: 'Rendu final et reflets, construction effacée' }
  ]
};

export const boucheRealiste: Guide = {
  id: 'bouche-realiste',
  title: 'Bouche réaliste au graphite',
  level: 'Moyen',
  viewBox: '',
  layers: [],
  images: imgs('bouche', 6),
  steps: [
    { title: 'Construction : axe, limites et hauteur des lèvres' },
    { title: 'La ligne de contact entre les lèvres', tip: 'C’est le trait le plus sombre de la bouche' },
    { title: 'Contours : arc de Cupidon et lèvre inférieure' },
    { title: 'Premières ombres : lèvre supérieure, coins, menton' },
    { title: 'Demi-teintes, philtrum et texture des lèvres' },
    { title: 'Rendu final et reflets, construction effacée' }
  ]
};

export const oreilleRealiste: Guide = {
  id: 'oreille-realiste',
  title: 'Oreille réaliste au graphite',
  level: 'Moyen',
  viewBox: '',
  layers: [],
  images: imgs('oreille', 6),
  steps: [
    { title: 'Ovale incliné entre la ligne des sourcils et celle du nez' },
    { title: 'Contour extérieur : hélix et lobe' },
    { title: 'Anthélix en Y et conque' },
    { title: 'Tragus, antitragus et épaisseur du rebord' },
    { title: 'Ombres : la conque est la zone la plus sombre' },
    { title: 'Rendu final, lumières sur les crêtes' }
  ]
};

export const mainVues: Guide = {
  id: 'main-vues',
  title: 'Main : 6 vues pour comprendre la forme',
  level: 'Moyen',
  viewBox: '',
  layers: [],
  images: imgs('main-vues', 6),
  steps: [
    { title: 'Dos de la main, doigts écartés', tip: 'Repère l’arc des jointures et les tendons en éventail' },
    { title: 'Paume de face' },
    { title: 'Profil, côté pouce' },
    { title: 'Poing fermé, de trois quarts' },
    { title: 'Main qui tient un crayon' },
    { title: 'Main détendue, vue du dessus en perspective' }
  ]
};

export const mainRealiste: Guide = {
  id: 'main-realiste',
  title: 'Main réaliste au graphite (dos)',
  level: 'Moyen',
  viewBox: '',
  layers: [],
  images: imgs('main', 6),
  steps: [
    { title: 'La paume en boîte et l’axe du poignet' },
    { title: 'L’arc des jointures et la direction des doigts', tip: 'Les doigts partent en éventail depuis le poignet' },
    { title: 'Doigts en cylindres segmentés, pouce à la base' },
    { title: 'Contour définitif, plis et ongles' },
    { title: 'Premières ombres' },
    { title: 'Rendu final : tendons, veines, demi-teintes' }
  ]
};

export const piedVues: Guide = {
  id: 'pied-vues',
  title: 'Pied : 6 vues pour comprendre la forme',
  level: 'Moyen',
  viewBox: '',
  layers: [],
  images: imgs('pied-vues', 6),
  steps: [
    { title: 'Profil intérieur : la voûte plantaire', tip: 'Le pied ne touche le sol qu’au talon et à l’avant' },
    { title: 'Profil extérieur : le bord posé à plat' },
    { title: 'De face, en perspective' },
    { title: 'De dos : talon et tendon d’Achille' },
    { title: 'Trois quarts, posé au sol' },
    { title: 'Sur la pointe, talon levé' }
  ]
};

export const piedRealiste: Guide = {
  id: 'pied-realiste',
  title: 'Pied réaliste au graphite',
  level: 'Moyen',
  viewBox: '',
  layers: [],
  images: imgs('pied-real', 6),
  steps: [
    { title: 'Repères : talon, cheville, base des orteils' },
    { title: 'Le bloc en coin du pied', tip: 'Le dessus est éclairé, le côté est dans l’ombre' },
    { title: 'Contour au trait' },
    { title: 'Malléole, tendons, orteils et ombre au sol' },
    { title: 'Ombres et demi-teintes' },
    { title: 'Rendu final, construction effacée' }
  ]
};

export const bassinFemme: Guide = {
  id: 'bassin-femme',
  title: 'Bassin et hanches — femme',
  level: 'Moyen',
  viewBox: '',
  layers: [],
  images: imgs('bassin-femme', 6),
  steps: [
    { title: 'Repères : axe, taille, crêtes iliaques, hanches' },
    { title: 'Squelette du bassin : large et évasé', tip: 'Les têtes des fémurs sont plus écartées que chez l’homme' },
    { title: 'Volumes : bol du bassin, cuisses en cylindres obliques' },
    { title: 'Contour définitif : taille, hanches, haut des cuisses' },
    { title: 'Premières ombres et demi-teintes' },
    { title: 'Rendu final, construction effacée' }
  ]
};

export const bassinHomme: Guide = {
  id: 'bassin-homme',
  title: 'Bassin et hanches — homme',
  level: 'Moyen',
  viewBox: '',
  layers: [],
  images: imgs('bassin-homme', 6),
  steps: [
    { title: 'Repères : axe, taille, crêtes iliaques, pli de l’aine' },
    { title: 'Squelette du bassin : étroit et haut', tip: 'Les crêtes iliaques ressortent sous les obliques' },
    { title: 'Volumes : bassin en coin, cuisses en cylindres' },
    { title: 'Contour définitif : obliques, aine, haut des cuisses' },
    { title: 'Ombres et volumes musculaires' },
    { title: 'Rendu final, construction effacée' }
  ]
};

export const fessiersFemme: Guide = {
  id: 'fessiers-femme',
  title: 'Fessiers — femme (de dos)',
  level: 'Moyen',
  viewBox: '',
  layers: [],
  images: imgs('fessiers-femme', 6),
  steps: [
    { title: 'Ligne d’action, taille, crêtes iliaques, plis fessiers inclinés' },
    { title: 'Blocs : cage en œuf, bassin en boîte, sacrum en losange' },
    { title: 'Volumes : grands fessiers en ovales, cuisses en cylindres', tip: 'Côté appui, le fessier est plus haut et plus contracté' },
    { title: 'Contour fluide en courbes en S' },
    { title: 'Ombres en suivant les volumes' },
    { title: 'Rendu final, construction effacée' }
  ]
};

export const basventreFemme: Guide = {
  id: 'basventre-femme',
  title: 'Bas-ventre et aine — femme',
  level: 'Moyen',
  viewBox: '',
  layers: [],
  images: imgs('basventre-femme', 6),
  steps: [
    { title: 'Repères : axe, nombril, crêtes iliaques, plis de l’aine en V' },
    { title: 'Blocs : bassin en boîte inclinée, épines iliaques, cuisses' },
    { title: 'Volumes : écusson du bas-ventre et masse des hanches' },
    { title: 'Contour fluide en courbes en S' },
    { title: 'Ombres en suivant les volumes' },
    { title: 'Rendu final façon marbre' }
  ]
};

export const torseFemme: Guide = {
  id: 'torse-femme',
  title: 'Torse — femme (de face)',
  level: 'Moyen',
  viewBox: '',
  layers: [],
  images: imgs('torse-femme', 6),
  steps: [
    { title: 'Repères : axe, épaules, clavicules, poitrine, taille' },
    { title: 'Blocs : cage en œuf, cou, épaules en sphères, arc costal' },
    { title: 'Volumes : pectoraux et poitrine en gouttes, ventre en ovale', tip: 'La poitrine s’oriente légèrement vers l’extérieur' },
    { title: 'Contour fluide' },
    { title: 'Ombres en suivant les volumes' },
    { title: 'Rendu final façon marbre' }
  ]
};

export const torseHomme: Guide = {
  id: 'torse-homme',
  title: 'Torse — homme (de face)',
  level: 'Moyen',
  viewBox: '',
  layers: [],
  images: imgs('torse-homme', 11),
  steps: [
    { title: 'Axe central et ligne des épaules' },
    { title: 'Ovale de la cage, cylindre du cou, ovale du bassin' },
    { title: 'Cercles des épaules et bras en tubes' },
    { title: 'Ligne de la taille et premières liaisons' },
    { title: 'Clavicules, sternum, arc costal, nombril' },
    { title: 'Premier contour léger du torse' },
    { title: 'Blocs : cou, épaules, cage et arc costal', tip: 'Les épaules sont des sphères posées aux extrémités des clavicules' },
    { title: 'Masses musculaires : pectoraux, deltoïdes, abdominaux' },
    { title: 'Contour définitif plus anguleux' },
    { title: 'Ombres en hachures' },
    { title: 'Rendu final façon marbre' }
  ]
};

export const fessiersHomme: Guide = {
  id: 'fessiers-homme',
  title: 'Fessiers — homme (de dos)',
  level: 'Moyen',
  viewBox: '',
  layers: [],
  images: imgs('fessiers-homme', 7),
  steps: [
    { title: 'Axe de la colonne et ligne des crêtes iliaques' },
    { title: 'Le bassin en boîte et les deux masses fessières' },
    { title: 'Construction complète : sacrum, ovales, cuisses en cylindres', tip: 'Le sacrum en losange marque le centre du bassin' },
    { title: 'Formes des muscles sur la construction' },
    { title: 'Contour définitif au trait' },
    { title: 'Grandes masses d’ombre en hachures' },
    { title: 'Rendu final' }
  ]
};

export const basventreHomme: Guide = {
  id: 'basventre-homme',
  title: 'Bas-ventre et aine — homme',
  level: 'Moyen',
  viewBox: '',
  layers: [],
  images: imgs('basventre-homme', 4),
  steps: [
    { title: 'Construction : bassin en boîte, épines iliaques, cuisses', tip: 'Les épines iliaques sont les deux bosses osseuses à l’avant des hanches' },
    { title: 'Contour : abdominaux, obliques, plis de l’aine' },
    { title: 'Ombres en hachures' },
    { title: 'Rendu final façon marbre' }
  ]
};
