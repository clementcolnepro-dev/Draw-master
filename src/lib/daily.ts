import { warmups } from '../content/warmups';
import { allGuides } from '../content/guides';
import type { ProgressData } from './db';

export const today = () => new Date().toLocaleDateString('sv-SE'); // AAAA-MM-JJ local

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return Math.abs(h);
}

export interface DailyItem {
  key: string;
  kind: 'échauffement' | 'dessin guidé' | 'croquis';
  title: string;
  minutes: number;
  text: string;
  link?: string;
}

/** 3 exercices du jour, stables pour une date donnée. */
export function dailyExercises(p: ProgressData, date = today()): DailyItem[] {
  const h = hash(date);
  const w = warmups[h % warmups.length];
  // Dessin du jour : de préférence un modèle pas encore dessiné.
  const todo = allGuides.filter((g) => !p.guides[g.id]);
  const pool = todo.length ? todo : allGuides;
  const guide = pool[(h >> 3) % pool.length];
  const durations = ['30 s', '1 min', '2 min'];
  return [
    { key: `jour:${date}:w`, kind: 'échauffement', title: w.title, minutes: w.minutes, text: w.text },
    {
      key: `jour:${date}:l`,
      kind: 'dessin guidé',
      title: guide.title,
      minutes: 20,
      text: `Reproduis ce modèle en ${guide.steps.length} étapes. Garde les premières étapes très légères.`,
      link: `/dessiner/${guide.id}`
    },
    {
      key: `jour:${date}:c`,
      kind: 'croquis',
      title: `Croquis rapides de ${durations[(h >> 5) % 3]}`,
      minutes: 10,
      text: 'Séance de croquis de personnages d’après photos avec le minuteur : capte la ligne d’action et les grandes masses, sans détails.',
      link: '/outils/minuteur'
    }
  ];
}

export const isDone = (p: ProgressData, key: string) => p.exercises.some((e) => e.key === key);

/** Interprète « AAAA-MM-JJ » en date locale (et non UTC). */
export const parseDay = (d: string) => (/^\d{4}-\d{2}-\d{2}$/.test(d) ? new Date(d + 'T12:00:00') : new Date(d));
