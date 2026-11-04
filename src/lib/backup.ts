import { clearCustomGuides, clearDrawings, listCustomGuides, listDrawings, putCustomGuide, putDrawing, type CustomGuide, type DrawingRecord, type ProgressData } from './db';
import { blobToDataURL, dataURLToBlob } from './images';

interface BackupFile {
  app: 'draw-master';
  format: 1;
  exportedAt: string;
  progress: ProgressData;
  drawings: (Omit<DrawingRecord, 'image' | 'thumb'> & { image: string; thumb: string })[];
  customGuides?: (Omit<CustomGuide, 'steps'> & { steps: (Omit<CustomGuide['steps'][number], 'image'> & { image: string })[] })[];
}

export async function exportBackup(progress: ProgressData): Promise<Blob> {
  const drawings = await listDrawings();
  const data: BackupFile = {
    app: 'draw-master',
    format: 1,
    exportedAt: new Date().toISOString(),
    progress,
    drawings: await Promise.all(drawings.map(async (d) => ({ ...d, image: await blobToDataURL(d.image), thumb: await blobToDataURL(d.thumb) }))),
    customGuides: await Promise.all(
      (await listCustomGuides()).map(async (g) => ({ ...g, steps: await Promise.all(g.steps.map(async (s) => ({ ...s, image: await blobToDataURL(s.image) }))) }))
    )
  };
  return new Blob([JSON.stringify(data)], { type: 'application/json' });
}

export async function readBackup(file: Blob): Promise<BackupFile> {
  let data: BackupFile;
  try {
    data = JSON.parse(await file.text());
  } catch {
    throw new Error('Ce fichier n’est pas un JSON valide.');
  }
  if (data?.app !== 'draw-master' || !data.progress || !Array.isArray(data.drawings)) throw new Error('Ce fichier n’est pas une sauvegarde Draw Master.');
  return data;
}

/** Remplace toutes les données locales par la sauvegarde. */
export async function restoreDrawings(data: BackupFile) {
  const decoded: DrawingRecord[] = await Promise.all(
    data.drawings.map(async (d) => ({ ...d, image: await dataURLToBlob(d.image), thumb: await dataURLToBlob(d.thumb) }))
  );
  await clearDrawings();
  for (const d of decoded) await putDrawing(d);
  if (data.customGuides) {
    const guides: CustomGuide[] = await Promise.all(
      data.customGuides.map(async (g) => ({ ...g, steps: await Promise.all(g.steps.map(async (s) => ({ ...s, image: await dataURLToBlob(s.image) }))) }))
    );
    await clearCustomGuides();
    for (const g of guides) await putCustomGuide(g);
  }
  return decoded.length;
}

export function download(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

/** Sur iPhone, le partage natif permet d'enregistrer le fichier dans « Fichiers ». */
export async function shareOrDownload(blob: Blob, name: string) {
  const file = new File([blob], name, { type: blob.type });
  const nav = navigator as Navigator & { canShare?: (d: unknown) => boolean };
  if (nav.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title: 'Sauvegarde Draw Master' });
      return;
    } catch (e) {
      if ((e as Error).name === 'AbortError') return;
    }
  }
  download(blob, name);
}
