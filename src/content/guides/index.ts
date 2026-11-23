import type { Guide, GuideCategory } from './types';
import { corpsFemme, corpsHomme } from './corps';
import { corpsFemmeClement } from './clement';
import { oeilRealiste, nezRealiste, boucheRealiste, oreilleRealiste, mainVues, mainRealiste, piedVues, piedRealiste, bassinFemme, bassinHomme, fessiersFemme, basventreFemme, torseFemme, torseHomme, fessiersHomme } from './realistes';
import { teteFace, jean, robe } from './nouveaux';
import { allLessons } from '../index';

/** Modèle en attente : on garde le nom, les schémas vectoriels sont retirés en attendant les planches photo. */
const attente = (g: Guide): Guide => ({ id: g.id, title: g.title, level: g.level, viewBox: '', layers: [], steps: [], pending: true });

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
      corpsFemmeClement,
      attente(corpsFemme),
      attente(corpsHomme),
      attente(fromLesson('c1-proportions', 'Proportions : la grille de 8 têtes', 'Facile')),
      attente(fromLesson('c2-mannequin', 'Mannequin en volumes (pose naturelle)', 'Facile')),
      attente(fromLesson('c5-mouvement', 'Corps en mouvement', 'Avancé'))
    ]
  },
  {
    id: 'tete',
    title: 'Tête',
    subtitle: 'En partant d’un cercle',
    icon: '◯',
    guides: [
      attente(teteFace),
      attente(fromLesson('b1-crane', 'Construction de la tête (Loomis)', 'Facile')),
      attente(fromLesson('b2-face', 'Proportions du visage de face', 'Facile')),
      attente(fromLesson('b3-profil', 'Tête de profil'))
    ]
  },
  {
    id: 'visage',
    title: 'Éléments du visage',
    subtitle: 'Œil, nez, bouche, oreille',
    icon: '◉',
    guides: [oeilRealiste, nezRealiste, boucheRealiste, oreilleRealiste]
  },
  {
    id: 'membres',
    title: 'Parties du corps',
    subtitle: 'Torse, mains, pieds',
    icon: '✋',
    guides: [torseFemme, torseHomme, bassinFemme, bassinHomme, basventreFemme, fessiersFemme, fessiersHomme, attente(fromLesson('c3-cage-bassin', 'Torse : cage thoracique et bassin')), mainRealiste, mainVues, piedRealiste, piedVues]
  },
  {
    id: 'vetements',
    title: 'Vêtements et plis',
    subtitle: 'Tissus, plis, habits',
    icon: '≋',
    guides: [
      attente(fromLesson('d5-tshirt', 'T-shirt')),
      attente(jean),
      attente(robe),
      attente(fromLesson('d1-tension', 'Tissu suspendu (point de tension)', 'Facile')),
      attente(fromLesson('d2-compression', 'Manche retroussée (compression)')),
      attente(fromLesson('d3-suspendus', 'Drapé entre deux points')),
      attente(fromLesson('d4-zigzag', 'Pantalon au genou plié'))
    ]
  },
  {
    id: 'bases',
    title: 'Bases : volumes et ombres',
    subtitle: 'Sphère, cube, matières',
    icon: '◐',
    guides: [
      attente(fromLesson('a2-volumes', 'Cube, cylindre, sphère', 'Facile')),
      attente(fromLesson('a4-lumiere', 'Sphère ombrée', 'Facile')),
      attente(fromLesson('a3-perspective', 'Boîte en perspective', 'Facile')),
      attente(fromLesson('a6-mesures', 'Mug d’observation', 'Facile')),
      attente(fromLesson('e1-ombres', 'Ombre portée d’un cube')),
      attente(fromLesson('e2-matieres', 'Matières : mat, brillant, métal, verre', 'Avancé')),
      attente(fromLesson('e3-photo', 'Reproduire une photo (grille)')),
      attente(fromLesson('a1-trait', 'Échauffement du trait', 'Facile')),
      attente(fromLesson('a5-valeurs', 'Valeurs et hachures', 'Facile'))
    ]
  }
];

export const allGuides: Guide[] = guideCategories.flatMap((c) => c.guides);
/** Modèles réellement disponibles (hors modèles en attente). */
export const readyGuides: Guide[] = allGuides.filter((g) => !g.pending);
export const guideById = (id: string) => allGuides.find((g) => g.id === id);
export const categoryOfGuide = (id: string) => guideCategories.find((c) => c.guides.some((g) => g.id === id));
