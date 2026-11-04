import { useRef, useState } from 'react';
import { usePhoto } from './usePhoto';

interface View {
  s: number;
  x: number;
  y: number;
}

export default function Viewer() {
  const { url, picker, open } = usePhoto();
  const [v, setV] = useState<View>({ s: 1, x: 0, y: 0 });
  const [grid, setGrid] = useState(4);
  const [diag, setDiag] = useState(false);
  const [gray, setGray] = useState(false);
  const [contrast, setContrast] = useState(false);
  const [blur, setBlur] = useState(false);
  const [mirror, setMirror] = useState(false);
  const pts = useRef(new Map<number, { x: number; y: number }>());
  const last = useRef<{ d: number; mx: number; my: number } | null>(null);
  const box = useRef<HTMLDivElement>(null);

  const clamp = (s: number) => Math.max(1, Math.min(8, s));

  const zoomAt = (factor: number, cx: number, cy: number) =>
    setV((o) => {
      const s = clamp(o.s * factor);
      const f = s / o.s;
      return { s, x: cx - (cx - o.x) * f, y: cy - (cy - o.y) * f };
    });

  const local = (e: { clientX: number; clientY: number }) => {
    const r = box.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const onDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    pts.current.set(e.pointerId, local(e));
    last.current = null;
  };
  const onMove = (e: React.PointerEvent) => {
    if (!pts.current.has(e.pointerId)) return;
    const prev = pts.current.get(e.pointerId)!;
    const cur = local(e);
    pts.current.set(e.pointerId, cur);
    const all = [...pts.current.values()];
    if (all.length === 1) {
      setV((o) => ({ ...o, x: o.x + cur.x - prev.x, y: o.y + cur.y - prev.y }));
    } else if (all.length >= 2) {
      const [a, b] = all;
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
      if (last.current) {
        const f = d / last.current.d;
        const dx = mx - last.current.mx, dy = my - last.current.my;
        setV((o) => {
          const s = clamp(o.s * f);
          const k = s / o.s;
          return { s, x: mx - (mx - o.x) * k + dx, y: my - (my - o.y) * k + dy };
        });
      }
      last.current = { d, mx, my };
    }
  };
  const onUp = (e: React.PointerEvent) => {
    pts.current.delete(e.pointerId);
    last.current = null;
  };

  const filter = [gray && 'grayscale(1)', contrast && 'contrast(1.7)', blur && 'blur(3px)'].filter(Boolean).join(' ') || 'none';

  return (
    <>
      {picker}
      <p className="small muted">Charge une photo de référence. Pince pour zoomer, glisse pour déplacer. La grille sert à la mise au carreau (leçon E3) ; le noir et blanc et le flou aident à lire les valeurs.</p>
      <button className="btn" onClick={open}>
        {url ? 'Changer de photo' : '🖼 Choisir une photo'}
      </button>
      {url && (
        <>
          <div
            ref={box}
            className="viewer"
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            onWheel={(e) => {
              const p = local(e);
              zoomAt(e.deltaY < 0 ? 1.15 : 1 / 1.15, p.x, p.y);
            }}
            onDoubleClick={() => setV({ s: 1, x: 0, y: 0 })}
          >
            <div className="viewer-inner" style={{ transform: `translate(${v.x}px, ${v.y}px) scale(${v.s})` }}>
              <img src={url} alt="Référence" draggable={false} style={{ filter, transform: mirror ? 'scaleX(-1)' : undefined }} />
              <svg className="viewer-grid" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                {grid > 0 &&
                  Array.from({ length: grid - 1 }, (_, i) => {
                    const p = ((i + 1) * 100) / grid;
                    return (
                      <g key={i}>
                        <line x1={p} y1="0" x2={p} y2="100" />
                        <line x1="0" y1={p} x2="100" y2={p} />
                      </g>
                    );
                  })}
                {diag && (
                  <>
                    <line x1="0" y1="0" x2="100" y2="100" />
                    <line x1="100" y1="0" x2="0" y2="100" />
                  </>
                )}
                {grid > 0 && <rect x="0" y="0" width="100" height="100" fill="none" />}
              </svg>
            </div>
          </div>
          <div className="row between tiny">
            <span>Zoom ×{v.s.toFixed(1)}</span>
            <button className="btn ghost small" onClick={() => setV({ s: 1, x: 0, y: 0 })}>
              Recentrer
            </button>
          </div>
          <div className="chips">
            {[0, 3, 4, 6, 8].map((n) => (
              <button key={n} className={grid === n ? 'chip on' : 'chip'} onClick={() => setGrid(n)}>
                {n ? `Grille ${n}×${n}` : 'Sans grille'}
              </button>
            ))}
          </div>
          <div className="chips">
            <button className={diag ? 'chip on' : 'chip'} onClick={() => setDiag(!diag)}>
              Diagonales
            </button>
            <button className={gray ? 'chip on' : 'chip'} onClick={() => setGray(!gray)}>
              Noir et blanc
            </button>
            <button className={contrast ? 'chip on' : 'chip'} onClick={() => setContrast(!contrast)}>
              Contraste +
            </button>
            <button className={blur ? 'chip on' : 'chip'} onClick={() => setBlur(!blur)}>
              Plisser les yeux
            </button>
            <button className={mirror ? 'chip on' : 'chip'} onClick={() => setMirror(!mirror)}>
              Miroir
            </button>
          </div>
        </>
      )}
    </>
  );
}
