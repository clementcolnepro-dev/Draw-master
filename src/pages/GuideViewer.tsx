import { useEffect, useRef, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { categoryOfGuide, guideById } from '../content/guides';
import { StepFigure } from '../components/Figure';
import { useProgress, useStudyTime } from '../lib/progress';
import { PageHeader } from '../components/ui';
import NotFound from './NotFound';

const PREF = 'dm-viewer-prefs';
const loadPrefs = () => {
  try {
    return { highlight: true, ...JSON.parse(localStorage.getItem(PREF) || '{}') } as { highlight: boolean };
  } catch {
    return { highlight: true };
  }
};

export default function GuideViewer() {
  const { guideId } = useParams();
  const [params, setParams] = useSearchParams();
  const g = guideById(guideId || '');
  const cat = g ? categoryOfGuide(g.id) : undefined;
  const { p, setGuideDone, setLastGuide } = useProgress();
  const [prefs, setPrefs] = useState(loadPrefs);
  const [clean, setClean] = useState(false);
  const strip = useRef<HTMLDivElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  useStudyTime();

  const n = g ? g.steps.length : 0;
  const raw = parseInt(params.get('etape') || '1', 10);
  const step = Math.min(Math.max(1, isNaN(raw) ? 1 : raw), n) - 1;

  useEffect(() => {
    if (g) setLastGuide(g.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [g?.id]);

  useEffect(() => {
    try {
      localStorage.setItem(PREF, JSON.stringify(prefs));
    } catch {
      /* stockage indisponible */
    }
  }, [prefs]);

  // Garde la miniature de l'étape courante visible.
  useEffect(() => {
    const box = strip.current;
    const el = box?.children[step] as HTMLElement | undefined;
    if (box && el) box.scrollTo({ left: el.offsetLeft - box.clientWidth / 2 + el.clientWidth / 2, behavior: 'smooth' });
  }, [step]);

  if (!g || !cat) return <NotFound />;

  const go = (i: number) => {
    const s = Math.max(0, Math.min(n - 1, i));
    setClean(false);
    setParams({ etape: String(s + 1) }, { replace: true });
  };
  const idx = cat.guides.findIndex((x) => x.id === g.id);
  const prevG = cat.guides[idx - 1];
  const nextG = cat.guides[idx + 1];
  const done = !!p.guides[g.id];
  const last = step === n - 1;

  return (
    <div className="page guide">
      <PageHeader title={g.title} kicker={`${cat.icon} ${cat.title}`} back={`/dessiner#${cat.id}`} />

      <div
        className="viewer-fig"
        onTouchStart={(e) => (touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY })}
        onTouchEnd={(e) => {
          const t = touch.current;
          touch.current = null;
          if (!t) return;
          const dx = e.changedTouches[0].clientX - t.x;
          const dy = e.changedTouches[0].clientY - t.y;
          if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) go(step + (dx < 0 ? 1 : -1));
        }}
      >
        <StepFigure drawing={g} step={step} clean={clean} highlight={prefs.highlight && !clean} />
        <div className="step-badge">
          {step + 1} / {n}
        </div>
      </div>

      <div className="step-caption">
        <b>{g.steps[step].title}</b>
        {g.steps[step].tip && <span className="tiny"> — {g.steps[step].tip}</span>}
      </div>

      <div className="step-nav">
        <button className="btn ghost" disabled={step === 0} onClick={() => go(step - 1)} aria-label="Étape précédente">
          ←
        </button>
        <button className="btn" disabled={last} onClick={() => go(step + 1)}>
          {last ? 'Dernière étape' : 'Étape suivante →'}
        </button>
      </div>

      <div className="thumbs" ref={strip} role="tablist" aria-label="Toutes les étapes">
        {g.steps.map((s, i) => (
          <button key={i} role="tab" aria-selected={i === step} className={i === step ? 'thumb on' : 'thumb'} onClick={() => go(i)} title={s.title}>
            <StepFigure drawing={g} step={i} highlight={prefs.highlight} />
            <span>{i + 1}</span>
          </button>
        ))}
      </div>

      <div className="chips">
        <button className={prefs.highlight ? 'chip on' : 'chip'} onClick={() => setPrefs({ ...prefs, highlight: !prefs.highlight })}>
          Nouveau trait en couleur
        </button>
        <button
          className={clean ? 'chip on' : 'chip'}
          onClick={() => {
            if (!clean && !last) go(n - 1);
            setTimeout(() => setClean(!clean), 0);
          }}
        >
          Dessin fini sans construction
        </button>
      </div>

      <div className="card">
        <div className="row wrap">
          <button className={done ? 'btn ghost' : 'btn'} onClick={() => setGuideDone(g.id, !done)}>
            {done ? '✓ Dessiné — annuler' : 'J’ai dessiné ce modèle'}
          </button>
          <Link className="btn ghost" to={`/dessins/nouveau?guide=${g.id}`}>
            📷 Ajouter mon dessin
          </Link>
        </div>
        <p className="tiny muted">Garde les premières étapes très légères au crayon : elles seront recouvertes ou gommées.</p>
      </div>

      <div className="row between">
        {prevG ? (
          <Link className="btn ghost small" to={`/dessiner/${prevG.id}`}>
            ← {prevG.title}
          </Link>
        ) : (
          <span />
        )}
        {nextG && (
          <Link className="btn ghost small" to={`/dessiner/${nextG.id}`}>
            {nextG.title} →
          </Link>
        )}
      </div>
    </div>
  );
}
