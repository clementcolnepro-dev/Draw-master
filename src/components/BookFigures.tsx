import type { BookFig, BookLayer } from '../content/livre';
import { guideById } from '../content/guides';
import { GuideFigure } from './GuideFigure';

/** Illustration d'une page du livre. */
export function BookFigure({ fig }: { fig: BookFig }) {
  if ('g' in fig) {
    const guide = guideById(fig.g);
    if (!guide) return null;
    return <GuideFigure g={guide} step={Math.min(fig.step, guide.steps.length - 1)} />;
  }
  if ('layers' in fig) return <LayerStack layers={fig.layers} />;
  if ('rows' in fig) return <Rows head={fig.head} rows={fig.rows} />;
  if ('list' in fig) return <StepList head={fig.head} items={fig.list} on={fig.on} />;
  if ('brushes' in fig) return <Brushes />;
  return <Workspace />;
}

/** Schéma d'une palette de calques (style générique, pas une capture). */
function LayerStack({ layers }: { layers: BookLayer[] }) {
  return (
    <div className="bf-panel">
      <div className="bf-head">Calques</div>
      {layers.map((l, i) => (
        <div key={i} className={'bf-layer' + (l.hi ? ' hi' : '') + (l.sub ? ' sub' : '') + (l.off ? ' off' : '')}>
          <span className="bf-eye" aria-hidden="true">{l.off ? '–' : '●'}</span>
          {l.clip && <span className="bf-clip" aria-label="écrêté">↳</span>}
          {l.folder ? (
            <span className="bf-folder" aria-hidden="true">▸</span>
          ) : (
            <span className="bf-sw" style={{ background: l.sw || '#ccc' }} aria-hidden="true" />
          )}
          {l.mask && <span className="bf-mask" title="Masque de calque" aria-label="masque" />}
          <span className="bf-name">
            {l.n}
            {l.vec && <em> · vectoriel</em>}
          </span>
          <span className="bf-meta">
            {l.mode && <span>{l.mode}</span>}
            {l.op !== undefined && <span>{l.op} %</span>}
          </span>
        </div>
      ))}
    </div>
  );
}

function Rows({ head, rows }: { head: string; rows: [string, string][] }) {
  return (
    <div className="bf-panel">
      <div className="bf-head">{head}</div>
      {rows.map(([k, v]) => (
        <div key={k} className="bf-row">
          <span>{k}</span>
          <b>{v}</b>
        </div>
      ))}
    </div>
  );
}

function StepList({ head, items, on }: { head: string; items: string[]; on?: number }) {
  return (
    <div className="bf-panel">
      <div className="bf-head">{head}</div>
      <ol className="bf-steps">
        {items.map((s, i) => (
          <li key={s} className={i === on ? 'hi' : ''}>
            <span>{i + 1}</span>
            {s}
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Trois traits types : opaque, doux, texturé. */
function Brushes() {
  const rough = Array.from({ length: 70 }, (_, i) => {
    const x = 40 + i * 4.4;
    const y = 238 + Math.sin(i * 0.35) * 14 + ((i * 37) % 11) - 5;
    const r = 2 + ((i * 13) % 5);
    return <circle key={i} cx={x} cy={y} r={r} fill="#2e2a25" opacity={0.25 + ((i * 7) % 5) / 10} />;
  });
  return (
    <svg className="paper" viewBox="0 0 400 300" role="img" aria-label="Trois types de pinceaux">
      <defs>
        <filter id="bf-soft" x="-20%" y="-50%" width="140%" height="200%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>
      <path d="M40 62 C120 30 200 95 360 52" stroke="#2e2a25" strokeWidth="20" fill="none" strokeLinecap="round" />
      <text x="40" y="104" className="lb" fontSize="14">Opaque : grandes formes, aplats</text>
      <path d="M40 150 C120 122 200 182 360 142" stroke="#2e2a25" strokeWidth="26" fill="none" strokeLinecap="round" opacity=".55" filter="url(#bf-soft)" />
      <text x="40" y="198" className="lb" fontSize="14">Aérographe doux : transitions</text>
      {rough}
      <text x="40" y="284" className="lb" fontSize="14">Texturé : accents, matière</text>
    </svg>
  );
}

/** Disposition schématique de l'espace de travail. */
function Workspace() {
  return (
    <svg className="paper" viewBox="0 0 400 280" role="img" aria-label="Espace de travail : outils, toile, palettes">
      <rect x="12" y="12" width="376" height="18" rx="3" fill="#d9d1c3" />
      <text x="20" y="25" className="lb" fontSize="10">Menus</text>
      <rect x="12" y="36" width="34" height="232" rx="4" fill="#cfc6b6" />
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x="19" y={46 + i * 26} width="20" height="18" rx="3" fill="#f3ede2" />
      ))}
      <rect x="52" y="36" width="58" height="232" rx="4" fill="#e3dccf" />
      <text x="58" y="52" className="lb" fontSize="9">Réglages</text>
      <text x="58" y="64" className="lb" fontSize="9">de l’outil</text>
      <rect x="118" y="36" width="178" height="232" rx="4" fill="#bdb3a3" />
      <rect x="140" y="58" width="134" height="188" fill="#ffffff" stroke="#8b8174" />
      <text x="207" y="156" textAnchor="middle" className="lb" fontSize="14">Toile</text>
      <rect x="304" y="36" width="84" height="100" rx="4" fill="#e3dccf" />
      <circle cx="346" cy="80" r="30" fill="none" stroke="#b4532a" strokeWidth="8" />
      <text x="312" y="128" className="lb" fontSize="9">Couleurs</text>
      <rect x="304" y="142" width="84" height="126" rx="4" fill="#e3dccf" />
      {Array.from({ length: 5 }, (_, i) => (
        <rect key={i} x="311" y={152 + i * 20} width="70" height="14" rx="2" fill={i === 1 ? '#f0c9b4' : '#f3ede2'} />
      ))}
      <text x="312" y="262" className="lb" fontSize="9">Calques</text>
    </svg>
  );
}
