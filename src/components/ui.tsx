import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

export function Bar({ pct, small }: { pct: number; small?: boolean }) {
  return (
    <div className={small ? 'bar small' : 'bar'} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
      <div style={{ width: `${Math.max(0, Math.min(100, pct))}%` }} />
    </div>
  );
}

export function Ring({ pct, size = 84, label }: { pct: number; size?: number; label?: string }) {
  const r = 34;
  const c = 2 * Math.PI * r;
  return (
    <svg className="ring" width={size} height={size} viewBox="0 0 80 80" role="img" aria-label={`${pct} %`}>
      <circle cx="40" cy="40" r={r} className="ring-bg" />
      <circle cx="40" cy="40" r={r} className="ring-fg" strokeDasharray={`${(pct / 100) * c} ${c}`} transform="rotate(-90 40 40)" />
      <text x="40" y={label ? 40 : 46} textAnchor="middle" className="ring-pct">
        {pct}%
      </text>
      {label && (
        <text x="40" y="54" textAnchor="middle" className="ring-label">
          {label}
        </text>
      )}
    </svg>
  );
}

export function PageHeader({ title, kicker, back, children }: { title: string; kicker?: string; back?: string | true; children?: ReactNode }) {
  const nav = useNavigate();
  return (
    <header className="page-head">
      {back && (
        <button className="back" onClick={() => (back === true ? nav(-1) : nav(back))} aria-label="Retour">
          ‹ Retour
        </button>
      )}
      {kicker && <div className="kicker">{kicker}</div>}
      <h1>{title}</h1>
      {children}
    </header>
  );
}

export function Section({ title, children, id }: { title: string; children: ReactNode; id?: string }) {
  return (
    <section className="section" id={id}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
