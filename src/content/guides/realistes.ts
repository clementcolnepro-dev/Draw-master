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
