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
