import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { getCustomGuide, type CustomGuide } from '../lib/db';
import { useProgress, useStudyTime } from '../lib/progress';
import { PageHeader } from '../components/ui';

export default function CustomGuideViewer() {
  const { id } = useParams();
  const [params, setParams] = useSearchParams();
  const [g, setG] = useState<CustomGuide | null | undefined>();
  const { p, setGuideDone } = useProgress();
  const strip = useRef<HTMLDivElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const [zoom, setZoom] = useState(false);
  useStudyTime();

  useEffect(() => {
    getCustomGuide(id || '')
      .then((r) => setG(r || null))
      .catch(() => setG(null));
  }, [id]);

  const urls = useMemo(() => (g ? g.steps.map((s) => URL.createObjectURL(s.image)) : []), [g]);
  useEffect(() => () => urls.forEach((u) => URL.revokeObjectURL(u)), [urls]);

  const n = g?.steps.length || 0;
  const raw = parseInt(params.get('etape') || '1', 10);
  const step = Math.min(Math.max(1, isNaN(raw) ? 1 : raw), Math.max(1, n)) - 1;

  useEffect(() => {
    const box = strip.current;
    const el = box?.children[step] as HTMLElement | undefined;
    if (box && el) box.scrollTo({ left: el.offsetLeft - box.clientWidth / 2 + el.clientWidth / 2, behavior: 'smooth' });
  }, [step]);

  if (g === undefined) return <div className="page muted">Chargement…</div>;
  if (g === null || !n)
    return (
      <div className="page">
        <PageHeader title="Modèle introuvable" back="/dessiner" />
      </div>
    );

  const go = (i: number) => setParams({ etape: String(Math.max(0, Math.min(n - 1, i)) + 1) }, { replace: true });
  const key = `perso:${g.id}`;
  const done = !!p.guides[key];
  const caption = g.steps[step].caption;

  return (
    <div className="page guide">
      <PageHeader title={g.title} kicker="★ Mes modèles" back="/dessiner#perso" />

      <div
        className={zoom ? 'viewer-fig photo-step zoom' : 'viewer-fig photo-step'}
        onClick={() => setZoom(!zoom)}
        onTouchStart={(e) => (touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY })}
        onTouchEnd={(e) => {
          const t = touch.current;
          touch.current = null;
          if (!t || zoom) return;
          const dx = e.changedTouches[0].clientX - t.x;
          const dy = e.changedTouches[0].clientY - t.y;
          if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) go(step + (dx < 0 ? 1 : -1));
        }}
      >
        <img src={urls[step]} alt={`Étape ${step + 1}`} />
        <div className="step-badge">
          {step + 1} / {n}
        </div>
      </div>

      <div className="step-caption">{caption ? <b>{caption}</b> : <span className="tiny">Touche l’image pour l’agrandir.</span>}</div>

      <div className="step-nav">
        <button className="btn ghost" disabled={step === 0} onClick={() => go(step - 1)} aria-label="Étape précédente">
          ←
        </button>
        <button className="btn" disabled={step === n - 1} onClick={() => go(step + 1)}>
          {step === n - 1 ? 'Dernière étape' : 'Étape suivante →'}
        </button>
      </div>

      <div className="thumbs" ref={strip} role="tablist" aria-label="Toutes les étapes">
        {urls.map((u, i) => (
          <button key={i} role="tab" aria-selected={i === step} className={i === step ? 'thumb on' : 'thumb'} onClick={() => go(i)}>
            <img src={u} alt="" />
            <span>{i + 1}</span>
          </button>
        ))}
      </div>

      <div className="card">
        <div className="row wrap">
          <button className={done ? 'btn ghost' : 'btn'} onClick={() => setGuideDone(key, !done)}>
            {done ? '✓ Dessiné — annuler' : 'J’ai dessiné ce modèle'}
          </button>
          <Link className="btn ghost" to={`/dessins/nouveau?serie=${encodeURIComponent(g.title)}`}>
            📷 Ajouter mon dessin
          </Link>
          <Link className="btn ghost small" to={`/dessiner/perso/${g.id}/modifier`}>
            Modifier
          </Link>
        </div>
      </div>
    </div>
  );
}
