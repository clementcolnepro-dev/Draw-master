import type { Guide, GuideCategory } from './types';
import { corpsFemme, corpsHomme } from './corps';
import { teteFace, oreille, pied, jean, robe } from './nouveaux';
import { allLessons } from '../index';

/** Réutilise la démonstration illustrée d'une fiche de cours comme dessin guidé. */
function fromLesson(id: string, title: string, level: Guide['level'] = 'Moyen'): Guide {
  const l = allLessons.find((x) => x.id === id)!;
  return { id: `${id}`, title, level, viewBox: l.drawing.viewBox, layers: l.drawing.layers, steps: l.steps.map((s) => ({ title: s.title })) };
}

export const guideCategories: GuideCategory[] = [
  {
    id: 'corps',
    title: 'Corps entier',
    subtitle: 'Des lignes générales à la silhouette',
    icon: '⟟',
    guides: [
      corpsFemme,
      corpsHomme,
      fromLesson('c1-proportions', 'Proportions : la grille de 8 têtes', 'Facile'),
      fromLesson('c2-mannequin', 'Mannequin en volumes (pose naturelle)', 'Facile'),
      fromLesson('c5-mouvement', 'Corps en mouvement', 'Avancé')
    ]
  },
  {
    id: 'tete',
    title: 'Tête',
    subtitle: 'En partant d’un cercle',
    icon: '◯',
    guides: [
      teteFace,
      fromLesson('b1-crane', 'Construction de la tête (Loomis)', 'Facile'),
      fromLesson('b2-face', 'Proportions du visage de face', 'Facile'),
      fromLesson('b3-profil', 'Tête de profil')
    ]
  },
  {
    id: 'visage',
    title: 'Éléments du visage',
    subtitle: 'Œil, nez, bouche, oreille',
    icon: '◉',
    guides: [fromLesson('b4-oeil', 'Œil réaliste'), fromLesson('b5-nez', 'Nez de face'), fromLesson('b6-bouche', 'Bouche et lèvres'), oreille]
  },
  {
    id: 'membres',
    title: 'Parties du corps',
    subtitle: 'Torse, mains, pieds',
    icon: '✋',
    guides: [fromLesson('c3-cage-bassin', 'Torse : cage thoracique et bassin'), fromLesson('c4-mains', 'Main (dos)'), pied]
  },
  {
    id: 'vetements',
    title: 'Vêtements et plis',
    subtitle: 'Tissus, plis, habits',
    icon: '≋',
    guides: [
      fromLesson('d5-tshirt', 'T-shirt'),
      jean,
      robe,
      fromLesson('d1-tension', 'Tissu suspendu (point de tension)', 'Facile'),
      fromLesson('d2-compression', 'Manche retroussée (compression)'),
      fromLesson('d3-suspendus', 'Drapé entre deux points'),
      fromLesson('d4-zigzag', 'Pantalon au genou plié')
    ]
  },
  {
    id: 'bases',
    title: 'Bases : volumes et ombres',
    subtitle: 'Sphère, cube, matières',
    icon: '◐',
    guides: [
      fromLesson('a2-volumes', 'Cube, cylindre, sphère', 'Facile'),
      fromLesson('a4-lumiere', 'Sphère ombrée', 'Facile'),
      fromLesson('a3-perspective', 'Boîte en perspective', 'Facile'),
      fromLesson('a6-mesures', 'Mug d’observation', 'Facile'),
      fromLesson('e1-ombres', 'Ombre portée d’un cube'),
      fromLesson('e2-matieres', 'Matières : mat, brillant, métal, verre', 'Avancé'),
      fromLesson('e3-photo', 'Reproduire une photo (grille)'),
      fromLesson('a1-trait', 'Échauffement du trait', 'Facile'),
      fromLesson('a5-valeurs', 'Valeurs et hachures', 'Facile')
    ]
  }
];

export const allGuides: Guide[] = guideCategories.flatMap((c) => c.guides);
export const guideById = (id: string) => allGuides.find((g) => g.id === id);
export const categoryOfGuide = (id: string) => guideCategories.find((c) => c.guides.some((g) => g.id === id));
