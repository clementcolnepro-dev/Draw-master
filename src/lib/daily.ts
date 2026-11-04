import { warmups } from '../content/warmups';
import { allLessons } from '../content';
import { isUnlocked, nextLesson } from './progress';
import type { ProgressData } from './db';

export const today = () => new Date().toLocaleDateString('sv-SE'); // AAAA-MM-JJ local

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return Math.abs(h);
}

export interface DailyItem {
  key: string;
  kind: 'échauffement' | 'leçon' | 'croquis';
  title: string;
  minutes: number;
  text: string;
  link?: string;
}

/** 3 exercices du jour, stables pour une date donnée. */
export function dailyExercises(p: ProgressData, date = today()): DailyItem[] {
  const h = hash(date);
  const w = warmups[h % warmups.length];
  const pool = allLessons.filter((l) => isUnlocked(l, p));
  const done = pool.filter((l) => p.completed[l.id]);
  // Révision d'une leçon terminée si possible, sinon la leçon en cours.
  const lesson = done.length ? done[(h >> 3) % done.length] : nextLesson(p) || allLessons[0];
  const durations = ['30 s', '1 min', '2 min'];
  return [
    { key: `jour:${date}:w`, kind: 'échauffement', title: w.title, minutes: w.minutes, text: w.text },
    {
      key: `jour:${date}:l`,
      kind: 'leçon',
      title: lesson.exercise.title,
      minutes: parseInt(lesson.exercise.duration) || 30,
      text: `${done.length ? 'Révision' : 'Exercice'} de la leçon « ${lesson.title} ». ${lesson.exercise.instructions[0]}`,
      link: `/lecon/${lesson.id}#exercice`
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
