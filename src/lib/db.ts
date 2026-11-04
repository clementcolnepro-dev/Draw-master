import { openDB, type DBSchema, type IDBPDatabase } from 'idb';

export interface ProgressData {
  version: 1;
  startedAt: string;
  /** id de leçon → date ISO de validation */
  completed: Record<string, string>;
  /** Exercices réalisés (journal). */
  exercises: { id: string; key: string; label: string; date: string }[];
  /** Temps d'apprentissage total (secondes). */
  seconds: number;
  /** Temps par leçon (secondes). */
  lessonSeconds: Record<string, number>;
  lastLesson?: string;
  unlockAll: boolean;
}

export interface DrawingRecord {
  id: string;
  createdAt: string;
  /** Date du dessin (AAAA-MM-JJ), modifiable. */
  date: string;
  title: string;
  comment: string;
  lessonId?: string;
  /** Nom de série pour comparer plusieurs versions d'un même dessin. */
  series?: string;
  image: Blob;
  thumb: Blob;
  width: number;
  height: number;
}

interface DMSchema extends DBSchema {
  kv: { key: string; value: unknown };
  drawings: { key: string; value: DrawingRecord; indexes: { byDate: string } };
}

let dbp: Promise<IDBPDatabase<DMSchema>> | null = null;

export function db() {
  if (!dbp) {
    dbp = openDB<DMSchema>('draw-master', 1, {
      upgrade(d) {
        d.createObjectStore('kv');
        const s = d.createObjectStore('drawings', { keyPath: 'id' });
        s.createIndex('byDate', 'date');
      }
    });
  }
  return dbp;
}

export const emptyProgress = (): ProgressData => ({
  version: 1,
  startedAt: new Date().toISOString(),
  completed: {},
  exercises: [],
  seconds: 0,
  lessonSeconds: {},
  unlockAll: false
});

export async function loadProgress(): Promise<ProgressData> {
  const v = (await (await db()).get('kv', 'progress')) as ProgressData | undefined;
  return v ? { ...emptyProgress(), ...v } : emptyProgress();
}

export async function saveProgress(p: ProgressData) {
  await (await db()).put('kv', p, 'progress');
}

export async function listDrawings(): Promise<DrawingRecord[]> {
  const all = await (await db()).getAll('drawings');
  return all.sort((a, b) => (b.date + b.createdAt).localeCompare(a.date + a.createdAt));
}

export async function getDrawing(id: string) {
  return (await db()).get('drawings', id);
}

export async function putDrawing(d: DrawingRecord) {
  await (await db()).put('drawings', d);
  // Demande un stockage persistant (évite que le navigateur vide les données).
  try {
    await navigator.storage?.persist?.();
  } catch {
    /* ignoré */
  }
}

export async function deleteDrawing(id: string) {
  await (await db()).delete('drawings', id);
}

export async function clearDrawings() {
  await (await db()).clear('drawings');
}

export const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
