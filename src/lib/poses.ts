import { db } from './db';

/**
 * Photos de modèles pour le minuteur de croquis, chargées en direct depuis Internet par le téléphone.
 * - Unsplash : photos nettes d'une seule personne, en studio de préférence ; clé d'accès gratuite enregistrée sur l'appareil.
 * - Mes photos : photos choisies par l'utilisateur (ex. nus académiques), enregistrées dans le téléphone.
 */

export type PoseSource = 'unsplash' | 'mes' | 'melange';

export interface PosePhoto {
  url: string;
  credit: string;
  link: string;
  /** URL à appeler quand la photo est utilisée (exigence d'Unsplash). */
  ping?: string;
}

const KEY_STORE = 'dm-unsplash-key';
export const getUnsplashKey = () => {
  try {
    return localStorage.getItem(KEY_STORE) || '';
  } catch {
    return '';
  }
};
export const setUnsplashKey = (k: string) => {
  try {
    if (k) localStorage.setItem(KEY_STORE, k.trim());
    else localStorage.removeItem(KEY_STORE);
  } catch {
    /* stockage indisponible */
  }
};

const shuffle = <T,>(a: T[]) => {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
};

// --- Mes photos (enregistrées sur l'appareil) ---

const MY_KEY = 'pose-photos';

export async function loadMyPoses(): Promise<Blob[]> {
  try {
    const d = await db();
    return ((await d.get('kv', MY_KEY)) as Blob[] | undefined) || [];
  } catch {
    return [];
  }
}

export async function saveMyPoses(list: Blob[]) {
  const d = await db();
  await d.put('kv', list, MY_KEY);
}

/** Réduit une photo à 1600 px de côté pour économiser la place sur le téléphone. */
export async function shrinkPhoto(file: Blob): Promise<Blob> {
  try {
    const bmp = await createImageBitmap(file);
    const k = Math.min(1, 1600 / Math.max(bmp.width, bmp.height));
    if (k === 1 && file.size < 900_000) return file;
    const c = document.createElement('canvas');
    c.width = Math.round(bmp.width * k);
    c.height = Math.round(bmp.height * k);
    c.getContext('2d')!.drawImage(bmp, 0, 0, c.width, c.height);
    return await new Promise<Blob>((res) => c.toBlob((b) => res(b || file), 'image/jpeg', 0.86));
  } catch {
    return file;
  }
}

async function myPoses(n: number): Promise<PosePhoto[]> {
  const list = await loadMyPoses();
  return shuffle(list)
    .slice(0, n)
    .map((b) => ({ url: URL.createObjectURL(b), credit: 'Ta photo', link: '' }));
}

// --- Unsplash ---

const UNS_QUERIES = [
  'full body model studio',
  'dancer studio',
  'ballet dancer studio',
  'athlete studio portrait',
  'yoga pose studio',
  'contemporary dancer',
  'woman posing full body',
  'man posing full body',
  'fitness model studio',
  'model sitting studio'
];
/** Écarte les photos où l'on devine plusieurs personnes. */
const MANY = /\b(people|group|couple|two|three|crowd|friends|family|team|men|women|kids|children|pair|together|duo)\b/i;

interface UnsplashPhoto {
  alt_description?: string | null;
  description?: string | null;
  width: number;
  height: number;
  urls: { regular: string };
  user: { name: string; links: { html: string } };
  links: { html: string; download_location: string };
}

async function fetchUnsplash(n: number, key: string): Promise<PosePhoto[]> {
  const out: PosePhoto[] = [];
  const queries = shuffle(UNS_QUERIES).slice(0, Math.min(3, Math.ceil(n / 10) + 1));
  for (const q of queries) {
    const params = new URLSearchParams({ query: q, count: String(Math.min(30, Math.ceil((n * 1.6) / queries.length) + 3)), content_filter: 'high', orientation: 'portrait' });
    const r = await fetch(`https://api.unsplash.com/photos/random?${params}`, { headers: { Authorization: `Client-ID ${key}`, 'Accept-Version': 'v1' } });
    if (r.status === 401) throw new Error('Clé Unsplash refusée : vérifie l’« Access Key ».');
    if (r.status === 403) throw new Error('Limite Unsplash atteinte pour cette heure : réessaie plus tard.');
    if (!r.ok) continue;
    const list = (await r.json()) as UnsplashPhoto[];
    for (const ph of list) {
      const text = `${ph.alt_description || ''} ${ph.description || ''}`;
      if (MANY.test(text) || ph.height < ph.width) continue;
      out.push({
        url: ph.urls.regular,
        credit: `Photo : ${ph.user.name} · Unsplash`,
        link: `${ph.links.html}?utm_source=draw_master&utm_medium=referral`,
        ping: ph.links.download_location
      });
    }
  }
  return shuffle(out).slice(0, n);
}

/** Signale à Unsplash qu'une photo est utilisée (obligatoire dans leurs règles). */
export function pingUnsplash(p: PosePhoto) {
  const key = getUnsplashKey();
  if (!p.ping || !key) return;
  fetch(p.ping, { headers: { Authorization: `Client-ID ${key}` } }).catch(() => {});
}

/** Récupère n photos pour la séance. */
export async function fetchPoses(source: PoseSource, n: number): Promise<PosePhoto[]> {
  const key = getUnsplashKey();
  if (source === 'mes') return myPoses(n);
  if (source === 'unsplash') {
    if (!key) throw new Error('Ajoute d’abord ta clé Unsplash.');
    return fetchUnsplash(n, key);
  }
  const half = Math.ceil(n / 2);
  const [a, b] = await Promise.all([myPoses(half), key ? fetchUnsplash(n - half + 2, key).catch(() => []) : Promise.resolve([])]);
  return shuffle([...a, ...b]).slice(0, n);
}
