import type { Module, Lesson, DisciplineId } from './types';
import { fondamentaux } from './fondamentaux';
import { portrait } from './portrait';
import { anatomie } from './anatomie';
import { vetements } from './vetements';
import { realisme } from './realisme';

/** Ordre pédagogique du parcours. Pour ajouter un module : créer le fichier et l'ajouter ici. */
export const modules: Module[] = [fondamentaux, portrait, anatomie, vetements, realisme];

export const allLessons: Lesson[] = modules.flatMap((m) => m.lessons);

export const lessonById = (id: string) => allLessons.find((l) => l.id === id);
export const moduleById = (id: string) => modules.find((m) => m.id === id);

export const disciplines: { id: DisciplineId; title: string; subtitle: string; icon: string }[] = [
  { id: 'portrait', title: 'Portrait', subtitle: 'Visage, yeux, nez, bouche', icon: '◐' },
  { id: 'anatomie', title: 'Anatomie', subtitle: 'Proportions, corps, mouvement', icon: '⟟' },
  { id: 'vetements', title: 'Vêtements', subtitle: 'Tissus, plis, matières', icon: '≋' },
  { id: 'techniques', title: 'Techniques', subtitle: 'Fondamentaux et réalisme', icon: '✎' }
];

export const lessonsOfDiscipline = (d: DisciplineId) => modules.filter((m) => m.discipline === d).flatMap((m) => m.lessons);
