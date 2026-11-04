import type { Guide } from './types';

const img = (n: number) => `guides/corps-femme/${String(n).padStart(2, '0')}.jpg`;

/** Pas à pas dessiné par Clément (images dans public/guides/corps-femme). */
export const corpsFemmeClement: Guide = {
  id: 'corps-femme-croquis',
  title: 'Corps de femme — croquis pas à pas',
  level: 'Moyen',
  author: 'Clément',
  viewBox: '',
  layers: [],
  images: Array.from({ length: 16 }, (_, i) => img(i + 1)),
  steps: [
    { title: 'Tête, axe du corps, ligne des épaules et cage thoracique', tip: 'La cage thoracique est un grand œuf sous la tête' },
    { title: 'Mesurer : la cage thoracique fait environ une tête et demie' },
    { title: 'Ajouter le bassin sous la cage thoracique' },
    { title: 'Formes de base du torse : épaules, taille, bassin' },
    { title: 'Bras en cylindres, articulations en sphères (zoom)' },
    { title: 'Placer les bras, les mains et le haut des cuisses' },
    { title: 'Mannequin complet en formes simples', tip: 'Cylindres pour les membres, sphères aux articulations' },
    { title: 'Visage et cou (zoom)' },
    { title: 'Épaules, clavicules et contour des bras (zoom)' },
    { title: 'Ensemble : visage et premiers contours' },
    { title: 'Poitrine et contour du torse (zoom)' },
    { title: 'Ensemble : haut du corps dessiné' },
    { title: 'Bassin, hanches et cuisses (zoom)' },
    { title: 'Contour complet du corps, construction effacée' },
    { title: 'Cheveux et finitions (zoom)' },
    { title: 'Dessin final' }
  ]
};
