/**
 * Photos de modèles pour le minuteur de croquis, chargées en direct depuis Internet par le téléphone.
 * - Muybridge (Animal Locomotion, 1887) via l'API de Wikimedia Commons : domaine public, sans clé.
 * - Unsplash : photos modernes, nécessite une clé d'accès gratuite (enregistrée sur l'appareil).
 */

export type PoseSource = 'aucune' | 'muybridge' | 'unsplash' | 'melange';

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

// --- Muybridge / Wikimedia Commons ---

/** Recherches ciblées sur les planches de figures humaines adultes. */
const MUY_QUERIES = [
  'Muybridge "Animal Locomotion" woman',
  'Muybridge "Animal Locomotion" man',
  'Muybridge "Animal Locomotion" nude',
  'Muybridge "Animal Locomotion" athlete',
  'Muybridge "Animal Locomotion" walking',
  'Muybridge "Animal Locomotion" running',
  'Muybridge "Animal Locomotion" jumping',
  'Muybridge "Animal Locomotion" lifting',
  'Muybridge "Animal Locomotion" throwing',
  'Muybridge "Animal Locomotion" dancing'
];
const EXCLUDE = ' -horse -mule -donkey -dog -cat -bird -ox -buffalo -deer -elephant -pig -goat -camel -lion -tiger -child -children -boy -girl -infant -baby -abnormal';
/** Filtre de sécurité côté appli : animaux, enfants, cas pathologiques. */
const REJECT = /(horse|mule|donkey|\bass\b|dog|cat\b|bird|pigeon|ox\b|buffalo|deer|elephant|pig\b|goat|camel|lion|tiger|cockatoo|eagle|child|children|boy|girl|infant|baby|kid\b|enfant|abnormal|infantile|cripple|amputee|deformed|paralys)/i;

interface CommonsPage {
  title: string;
  imageinfo?: { thumburl?: string; url: string; descriptionurl: string; extmetadata?: Record<string, { value: string }> }[];
}

async function fetchMuybridge(n: number): Promise<PosePhoto[]> {
  const out: PosePhoto[] = [];
  const queries = shuffle(MUY_QUERIES).slice(0, 3);
  for (const q of queries) {
    const params = new URLSearchParams({
      action: 'query',
      format: 'json',
      origin: '*',
      generator: 'search',
      gsrsearch: q + EXCLUDE,
      gsrnamespace: '6',
      gsrlimit: '40',
      gsroffset: String(Math.floor(Math.random() * 4) * 40),
      prop: 'imageinfo',
      iiprop: 'url|extmetadata',
      iiextmetadatafilter: 'ImageDescription|ObjectName',
      iiurlwidth: '1400'
    });
    const r = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`);
    if (!r.ok) continue;
    const data = (await r.json()) as { query?: { pages?: Record<string, CommonsPage> } };
    for (const p of Object.values(data.query?.pages || {})) {
      const info = p.imageinfo?.[0];
      if (!info || !/\.(jpe?g|png|tiff?)$/i.test(p.title)) continue;
      const desc = (info.extmetadata?.ImageDescription?.value || '') + ' ' + (info.extmetadata?.ObjectName?.value || '');
      if (REJECT.test(p.title) || REJECT.test(desc)) continue;
      out.push({ url: info.thumburl || info.url, credit: 'Eadweard Muybridge, 1887 · domaine public · Wikimedia Commons', link: info.descriptionurl });
    }
    if (out.length >= n * 2) break;
  }
  const seen = new Set<string>();
  return shuffle(out.filter((x) => !seen.has(x.url) && seen.add(x.url))).slice(0, n);
}

// --- Unsplash ---

const UNS_QUERIES = ['full body pose', 'dancer', 'athlete', 'yoga pose', 'model standing', 'person sitting', 'ballet', 'gymnast', 'fashion model full body', 'martial arts'];

interface UnsplashPhoto {
  urls: { regular: string };
  user: { name: string; links: { html: string } };
  links: { html: string; download_location: string };
}

async function fetchUnsplash(n: number, key: string): Promise<PosePhoto[]> {
  const out: PosePhoto[] = [];
  const queries = shuffle(UNS_QUERIES).slice(0, Math.min(3, Math.ceil(n / 10) + 1));
  for (const q of queries) {
    const params = new URLSearchParams({ query: q, count: String(Math.min(30, Math.ceil(n / queries.length) + 2)), content_filter: 'high', orientation: 'portrait' });
    const r = await fetch(`https://api.unsplash.com/photos/random?${params}`, { headers: { Authorization: `Client-ID ${key}`, 'Accept-Version': 'v1' } });
    if (r.status === 401) throw new Error('Clé Unsplash refusée : vérifie l’« Access Key ».');
    if (r.status === 403) throw new Error('Limite Unsplash atteinte pour cette heure : réessaie plus tard.');
    if (!r.ok) continue;
    const list = (await r.json()) as UnsplashPhoto[];
    for (const ph of list) {
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
  if (source === 'aucune') return [];
  const key = getUnsplashKey();
  if (source === 'muybridge') return fetchMuybridge(n);
  if (source === 'unsplash') {
    if (!key) throw new Error('Ajoute d’abord ta clé Unsplash.');
    return fetchUnsplash(n, key);
  }
  // Mélange : moitié-moitié, ou Muybridge seul sans clé.
  if (!key) return fetchMuybridge(n);
  const half = Math.ceil(n / 2);
  const [a, b] = await Promise.all([fetchMuybridge(half).catch(() => []), fetchUnsplash(n - half + 2, key).catch(() => [])]);
  return shuffle([...a, ...b]).slice(0, n);
}
