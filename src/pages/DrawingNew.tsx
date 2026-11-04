import { useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { compressImage } from '../lib/images';
import { putDrawing, uid } from '../lib/db';
import { today } from '../lib/daily';
import { DrawingFields, type DrawingMeta } from '../components/DrawingForm';
import { PageHeader } from '../components/ui';
import { lessonById } from '../content';
import { useBlobUrl } from '../lib/useBlobUrl';

export default function DrawingNew() {
  const [params] = useSearchParams();
  const lessonId = params.get('lecon') || undefined;
  const nav = useNavigate();
  const cam = useRef<HTMLInputElement>(null);
  const lib = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<Blob>();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string>();
  const [meta, setMeta] = useState<DrawingMeta>({
    title: lessonId ? lessonById(lessonId)?.exercise.title || '' : '',
    date: today(),
    comment: '',
    lessonId,
    series: params.get('serie') || undefined
  });
  const preview = useBlobUrl(file);

  const pick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setError(undefined);
    }
    e.target.value = '';
  };

  const save = async () => {
    if (!file) return;
    setBusy(true);
    setError(undefined);
    try {
      const big = await compressImage(file, 1800, 0.85);
      const small = await compressImage(file, 480, 0.75);
      const id = uid();
      await putDrawing({
        id,
        createdAt: new Date().toISOString(),
        date: meta.date || today(),
        title: meta.title.trim(),
        comment: meta.comment.trim(),
        lessonId: meta.lessonId,
        series: meta.series?.trim() || undefined,
        image: big.blob,
        thumb: small.blob,
        width: big.width,
        height: big.height
      });
      nav(`/dessins/${id}`, { replace: true });
    } catch (e) {
      setError(
        e instanceof DOMException && e.name === 'QuotaExceededError'
          ? 'Espace de stockage plein sur ce téléphone. Exporte une sauvegarde puis supprime d’anciens dessins.'
          : `Enregistrement impossible : ${(e as Error).message}`
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="page">
      <PageHeader title="Ajouter un dessin" kicker="Mes dessins" back="/dessins" />
      <input ref={cam} type="file" accept="image/*" capture="environment" hidden onChange={pick} />
      <input ref={lib} type="file" accept="image/*" hidden onChange={pick} />

      {preview ? (
        <div className="preview">
          <img src={preview} alt="Aperçu" />
          <button className="btn ghost small" onClick={() => lib.current?.click()}>
            Changer de photo
          </button>
        </div>
      ) : (
        <div className="card pick">
          <p>Prends ton dessin en photo bien à plat, à la lumière du jour, sans ombre de ton téléphone.</p>
          <div className="row wrap">
            <button className="btn" onClick={() => cam.current?.click()}>
              📷 Prendre une photo
            </button>
            <button className="btn ghost" onClick={() => lib.current?.click()}>
              🖼 Choisir dans la galerie
            </button>
          </div>
        </div>
      )}

      <DrawingFields value={meta} onChange={setMeta} />
      {error && <p className="error">{error}</p>}
      <button className="btn wide" disabled={!file || busy} onClick={save}>
        {busy ? 'Enregistrement…' : 'Enregistrer'}
      </button>
    </div>
  );
}
