/* Petites briques réutilisables pour les illustrations. */

/** Crayon dont la pointe est en (x, y), orienté selon angle (degrés, 0 = corps vers la droite). */
export function Pencil({ x, y, angle, len = 110 }: { x: number; y: number; angle: number; len?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`}>
      <polygon points={`0,0 18,-6 18,6`} fill="#e8d6b3" stroke="#2e2a25" strokeWidth="1.2" />
      <polygon points={`0,0 6,-2 6,2`} fill="#2e2a25" />
      <rect x="18" y="-6" width={len - 18} height="12" fill="#c9a96a" stroke="#2e2a25" strokeWidth="1.2" />
      <line x1="18" y1="0" x2={len} y2="0" stroke="#2e2a25" strokeWidth=".6" opacity=".5" />
    </g>
  );
}

/** Étiquette simple. */
export function T({ x, y, children, a = 'start', s = 10 }: { x: number; y: number; children: string; a?: 'start' | 'middle' | 'end'; s?: number }) {
  return (
    <text x={x} y={y} className="lb" textAnchor={a} fontSize={s}>
      {children}
    </text>
  );
}

/** Annotation avec trait de rappel (dessin final). */
export function Note({ x, y, tx, ty, children, a = 'start' }: { x: number; y: number; tx: number; ty: number; children: string; a?: 'start' | 'middle' | 'end' }) {
  return (
    <g className="note">
      <line x1={x} y1={y} x2={tx} y2={ty} />
      <circle cx={x} cy={y} r="2" />
      <text x={tx + (a === 'end' ? -3 : a === 'start' ? 3 : 0)} y={ty + 3} textAnchor={a}>
        {children}
      </text>
    </g>
  );
}

/** Point repère. */
export function Dot({ x, y, r = 3 }: { x: number; y: number; r?: number }) {
  return <circle cx={x} cy={y} r={r} className="pt" />;
}
