import type { ReactNode } from 'react';

/* Outils de dessin pour les guides pas à pas. */

export type P = [number, number];

/** Duplique un groupe en miroir autour de l'axe vertical x = cx (vues de face symétriques). */
export function Mirror({ cx, children }: { cx: number; children: ReactNode }) {
  return (
    <>
      {children}
      <g transform={`matrix(-1 0 0 1 ${2 * cx} 0)`}>{children}</g>
    </>
  );
}

/** Tube effilé de a vers b (rayons r1 → r2), extrémités arrondies : volume de construction d'un membre. */
export function Tube({ a, b, r1, r2, cls = 'cs' }: { a: P; b: P; r1: number; r2: number; cls?: string }) {
  const dx = b[0] - a[0], dy = b[1] - a[1];
  const L = Math.hypot(dx, dy) || 1;
  const nx = -dy / L, ny = dx / L;
  const p = (q: P, r: number, s: number) => `${(q[0] + nx * r * s).toFixed(1)} ${(q[1] + ny * r * s).toFixed(1)}`;
  const d = `M${p(a, r1, 1)} L${p(b, r2, 1)} A${r2} ${r2} 0 0 0 ${p(b, r2, -1)} L${p(a, r1, -1)} A${r1} ${r1} 0 0 0 ${p(a, r1, 1)} Z`;
  return <path className={cls} d={d} />;
}

/** Articulation (sphère). */
export const J = ({ p, r = 4.5 }: { p: P; r?: number }) => <circle className="cs" cx={p[0]} cy={p[1]} r={r} />;

/** Grille de proportions en hauteurs de tête. */
export function HeadGrid({ top, unit, n, x1, x2, labels = true }: { top: number; unit: number; n: number; x1: number; x2: number; labels?: boolean }) {
  return (
    <g>
      {Array.from({ length: n + 1 }, (_, i) => (
        <line key={i} className="cn" x1={x1} y1={top + i * unit} x2={x2} y2={top + i * unit} />
      ))}
      {labels &&
        Array.from({ length: n }, (_, i) => (
          <text key={i} className="lb" x={x2 + 4} y={top + i * unit + unit / 2 + 3} fontSize="9">
            {i + 1}
          </text>
        ))}
    </g>
  );
}
