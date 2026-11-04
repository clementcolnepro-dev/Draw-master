import type { ReactNode } from 'react';

export type ModuleId = 'fondamentaux' | 'portrait' | 'anatomie' | 'vetements' | 'realisme';
export type DisciplineId = 'portrait' | 'anatomie' | 'vetements' | 'techniques';
export type Difficulty = 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Expert';

/** Une étape de démonstration. Chaque étape correspond à un calque du dessin :
 *  l'étape n affiche les calques 0..n, le calque n étant mis en évidence. */
export interface LessonStep {
  title: string;
  text: string;
}

export interface Drawing {
  viewBox: string;
  /** Un calque par étape, dans l'ordre. */
  layers: ReactNode[];
  /** Annotations affichées uniquement sur la vue « résultat final ». */
  annotations?: ReactNode;
}

export interface Exercise {
  title: string;
  duration: string;
  material: string[];
  instructions: string[];
  selfCheck: string[];
}

export interface Lesson {
  id: string;
  module: ModuleId;
  title: string;
  difficulty: Difficulty;
  minutes: number;
  /** Compétence travaillée (affichée dans « compétences pratiquées »). */
  skill: string;
  objective: string;
  why: string;
  theory: string[];
  /** Schéma théorique optionnel, avec légende. */
  theoryFigure?: { viewBox: string; content: ReactNode; caption: string };
  drawing: Drawing;
  steps: LessonStep[];
  tips: { errors: string[]; tricks: string[]; observe: string[] };
  exercise: Exercise;
}

export interface Module {
  id: ModuleId;
  letter: string;
  discipline: DisciplineId;
  title: string;
  subtitle: string;
  description: string;
  lessons: Lesson[];
  /** Leçons du programme pas encore rédigées (affichées comme « en préparation »). */
  planned: string[];
}
