import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { emptyProgress, loadProgress, saveProgress, uid, type ProgressData } from './db';
import { allLessons, modules, lessonsOfDiscipline, disciplines } from '../content';
import type { DisciplineId, Lesson } from '../content/types';

interface Ctx {
  p: ProgressData;
  ready: boolean;
  setCompleted: (lessonId: string, done: boolean) => void;
  logExercise: (key: string, label: string) => void;
  addSeconds: (s: number, lessonId?: string) => void;
  setLastLesson: (id: string) => void;
  setUnlockAll: (v: boolean) => void;
  replace: (p: ProgressData) => Promise<void>;
  reset: () => Promise<void>;
}

const ProgressCtx = createContext<Ctx | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [p, setP] = useState<ProgressData>(emptyProgress);
  const [ready, setReady] = useState(false);
  const timer = useRef<number>();
  const latest = useRef(p);

  useEffect(() => {
    loadProgress()
      .then((v) => {
        setP(v);
        latest.current = v;
      })
      .catch((e) => console.error('Chargement progression', e))
      .finally(() => setReady(true));
  }, []);

  // Sauvegarde différée + sauvegarde immédiate quand l'app passe en arrière-plan.
  const update = useCallback((fn: (prev: ProgressData) => ProgressData, immediate = false) => {
    setP((prev) => {
      const next = fn(prev);
      latest.current = next;
      window.clearTimeout(timer.current);
      if (immediate) saveProgress(next).catch(console.error);
      else timer.current = window.setTimeout(() => saveProgress(next).catch(console.error), 800);
      return next;
    });
  }, []);

  useEffect(() => {
    const flush = () => {
      if (document.visibilityState === 'hidden') saveProgress(latest.current).catch(console.error);
    };
    document.addEventListener('visibilitychange', flush);
    window.addEventListener('pagehide', flush);
    return () => {
      document.removeEventListener('visibilitychange', flush);
      window.removeEventListener('pagehide', flush);
    };
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      p,
      ready,
      setCompleted: (id, done) =>
        update((prev) => {
          const completed = { ...prev.completed };
          if (done) completed[id] = new Date().toISOString();
          else delete completed[id];
          return { ...prev, completed };
        }, true),
      logExercise: (key, label) =>
        update((prev) => ({ ...prev, exercises: [...prev.exercises, { id: uid(), key, label, date: new Date().toISOString() }] }), true),
      addSeconds: (s, lessonId) =>
        update((prev) => ({
          ...prev,
          seconds: prev.seconds + s,
          lessonSeconds: lessonId ? { ...prev.lessonSeconds, [lessonId]: (prev.lessonSeconds[lessonId] || 0) + s } : prev.lessonSeconds
        })),
      setLastLesson: (id) => update((prev) => (prev.lastLesson === id ? prev : { ...prev, lastLesson: id })),
      setUnlockAll: (v) => update((prev) => ({ ...prev, unlockAll: v }), true),
      replace: async (np) => {
        const merged = { ...emptyProgress(), ...np };
        await saveProgress(merged);
        latest.current = merged;
        setP(merged);
      },
      reset: async () => {
        const e = emptyProgress();
        await saveProgress(e);
        latest.current = e;
        setP(e);
      }
    }),
    [p, ready, update]
  );

  return <ProgressCtx.Provider value={value}>{children}</ProgressCtx.Provider>;
}

export function useProgress() {
  const c = useContext(ProgressCtx);
  if (!c) throw new Error('ProgressProvider manquant');
  return c;
}

/** Une leçon est accessible si c'est la première de son module, si la précédente est terminée, ou si tout est débloqué. */
export function isUnlocked(lesson: Lesson, p: ProgressData) {
  if (p.unlockAll) return true;
  const m = modules.find((x) => x.id === lesson.module)!;
  const i = m.lessons.findIndex((l) => l.id === lesson.id);
  return i <= 0 || !!p.completed[m.lessons[i - 1].id];
}

export const levels = [
  { name: 'Débutant', min: 0 },
  { name: 'Intermédiaire', min: 25 },
  { name: 'Avancé', min: 50 },
  { name: 'Expert', min: 80 }
];

export function stats(p: ProgressData) {
  const total = allLessons.length;
  const done = allLessons.filter((l) => p.completed[l.id]).length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  const level = [...levels].reverse().find((l) => pct >= l.min)!;
  const nextLevel = levels.find((l) => l.min > pct);
  const byDiscipline = disciplines.map((d) => {
    const ls = lessonsOfDiscipline(d.id as DisciplineId);
    const n = ls.filter((l) => p.completed[l.id]).length;
    return { ...d, done: n, total: ls.length, pct: ls.length ? Math.round((n / ls.length) * 100) : 0 };
  });
  const byModule = modules.map((m) => {
    const n = m.lessons.filter((l) => p.completed[l.id]).length;
    return { id: m.id, done: n, total: m.lessons.length, pct: Math.round((n / m.lessons.length) * 100) };
  });
  return { total, done, pct, level: level.name, nextLevel, byDiscipline, byModule, exercises: p.exercises.length, seconds: p.seconds };
}

/** Prochaine leçon conseillée : dernière consultée si non terminée, sinon première leçon débloquée non terminée. */
export function nextLesson(p: ProgressData): Lesson | undefined {
  const last = allLessons.find((l) => l.id === p.lastLesson);
  if (last && !p.completed[last.id]) return last;
  return allLessons.find((l) => !p.completed[l.id] && isUnlocked(l, p));
}

export function formatDuration(s: number) {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  if (h) return `${h} h ${String(m).padStart(2, '0')}`;
  return `${m} min`;
}

/** Compte le temps passé tant que la page est visible. */
export function useStudyTime(lessonId?: string) {
  const { addSeconds } = useProgress();
  const add = useRef(addSeconds);
  add.current = addSeconds;
  useEffect(() => {
    const STEP = 15;
    const t = window.setInterval(() => {
      if (document.visibilityState === 'visible') add.current(STEP, lessonId);
    }, STEP * 1000);
    return () => window.clearInterval(t);
  }, [lessonId]);
}
