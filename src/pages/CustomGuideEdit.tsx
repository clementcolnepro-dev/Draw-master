import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteCustomGuide, getCustomGuide, putCustomGuide, uid, type CustomGuide } from '../lib/db';
import { compressImage } from '../lib/images';
import { BlobImg } from '../components/Thumb';
import { PageHeader } from '../components/ui';

type Step = CustomGuide['steps'][number];

export default function CustomGuideEdit() {
  const { id } = useParams();
  const nav = useNavigate();
  const input = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState('');
  const [steps, setSteps] = useState<Step[]>([]);
  const [createdAt, setCreatedAt] = useState(new Date().toISOString());
  const [busy, setBusy] = useState<string>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (!id) return;
    getCustomGuide(id).then((g) => {
      if (!g) return;
      setTitle(g.title);
      setSteps(g.steps);
      setCreatedAt(g.createdAt);
    });
  }, [id]);

  const add = async (files: FileList | null) => {
    if (!files?.length) return;
    setError(undefined);
    const list = [...files]; // ordre de sélection
    const out: Step[] = [];
    for (let i = 0; i < list.length; i++) {
      setBusy(`Préparation des images… ${i + 1}/${list.length}`);
      try {
        const c = await compressImage(list[i], 1600, 0.85);
        out.push({ image: c.blob, width: c.width, height: c.height, caption: '' });
      } catch (e) {
        setError((e as Error).message);
      }
    }
    setSteps((s) => [...s, ...out]);
    setBusy(undefined);
  };

  const move = (i: number, d: number) =>
    setSteps((s) => {
      const j = i + d;
      if (j < 0 || j >= s.length) return s;
      const c = [...s];
      [c[i], c[j]] = [c[j], c[i]];
      return c;
    });

  const save = async () => {
    setBusy('Enregistrement…');
    setError(undefined);
    try {
      const gid = id || uid();
      await putCustomGuide({ id: gid, createdAt, title: title.trim() || 'Mon modèle', steps });
      nav(`/dessiner/perso/${gid}`, { replace: true });
    } catch (e) {
      setError(
        e instanceof DOMException && e.name === 'QuotaExceededError' ? 'Stockage plein sur ce téléphone.' : `Enregistrement impossible : ${(e as Error).message}`
      );
    } finally {
      setBusy(undefined);
    }
  };

  return (
    <div className="page">
      <PageHeader title={id ? 'Modifier mon modèle' : 'Nouveau modèle perso'} kicker="Mes modèles" back={id ? `/dessiner/perso/${id}` : '/dessiner'}>
        <p className="muted small">
          Ajoute les images de chaque étape (captures d’un tutoriel, photos de tes croquis…). Elles restent uniquement sur ce téléphone et ne sont jamais publiées.
        </p>
      </PageHeader>

      <div className="form">
        <label>
          Nom du modèle
          <input value={title} maxLength={60} placeholder="Ex. : Corps de femme debout" onChange={(e) => setTitle(e.target.value)} />
        </label>
      </div>

      <input ref={input} type="file" accept="image/*" multiple hidden onChange={(e) => (add(e.target.files), (e.target.value = ''))} />
      <button className="btn ghost wide" onClick={() => input.current?.click()} disabled={!!busy}>
        🖼 Ajouter des images (plusieurs à la fois)
      </button>
      <p className="tiny muted">Sélectionne les images dans l’ordre des étapes. Les flèches permettent de corriger l’ordre ensuite.</p>

      <ol className="cg-list">
        {steps.map((s, i) => (
          <li key={i} className="card cg-item">
            <div className="cg-img">
              <BlobImg blob={s.image} alt={`Étape ${i + 1}`} />
              <span className="cg-num">{i + 1}</span>
            </div>
            <div className="grow">
              <input
                value={s.caption}
                maxLength={120}
                placeholder={`Légende de l’étape ${i + 1} (facultatif)`}
                onChange={(e) => setSteps((st) => st.map((x, k) => (k === i ? { ...x, caption: e.target.value } : x)))}
              />
              <div className="row">
                <button className="btn ghost small" disabled={i === 0} onClick={() => move(i, -1)} aria-label="Monter">
                  ↑
                </button>
                <button className="btn ghost small" disabled={i === steps.length - 1} onClick={() => move(i, 1)} aria-label="Descendre">
                  ↓
                </button>
                <button className="btn danger small" onClick={() => setSteps((st) => st.filter((_, k) => k !== i))} aria-label="Retirer">
                  ✕
                </button>
              </div>
            </div>
          </li>
        ))}
      </ol>

      {busy && <p className="small muted">{busy}</p>}
      {error && <p className="error">{error}</p>}
      <button className="btn wide" disabled={!steps.length || !!busy} onClick={save}>
        Enregistrer ({steps.length} étape{steps.length > 1 ? 's' : ''})
      </button>
      {id && (
        <button
          className="btn danger wide"
          onClick={async () => {
            if (!confirm('Supprimer ce modèle et ses images ?')) return;
            await deleteCustomGuide(id);
            nav('/dessiner', { replace: true });
          }}
        >
          Supprimer ce modèle
        </button>
      )}
    </div>
  );
}
