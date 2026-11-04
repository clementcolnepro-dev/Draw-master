import { useState } from 'react';

const pencils = [
  ['2H', 1, 3], ['H', 1, 4], ['HB', 2, 5], ['B', 2, 6], ['2B', 3, 7], ['4B', 4, 8], ['6B', 5, 9], ['8B', 6, 10]
] as const;

export default function Values() {
  const [n, setN] = useState(10);
  const [sel, setSel] = useState<number | null>(null);
  const shade = (i: number) => {
    const v = Math.round(246 - (i / (n - 1)) * (246 - 30));
    return `rgb(${v},${v - 4},${v - 12})`;
  };
  return (
    <>
      <div className="chips">
        {[5, 7, 10].map((k) => (
          <button key={k} className={n === k ? 'chip on' : 'chip'} onClick={() => { setN(k); setSel(null); }}>
            {k} valeurs
          </button>
        ))}
      </div>
      <div className="vscale" style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
        {Array.from({ length: n }, (_, i) => (
          <button key={i} style={{ background: shade(i) }} className={sel === i ? 'on' : ''} onClick={() => setSel(i)} aria-label={`Valeur ${i + 1}`}>
            <span style={{ color: i < n / 2 ? '#25211d' : '#f3ede2' }}>{i + 1}</span>
          </button>
        ))}
      </div>
      {sel !== null && (
        <div className="vcompare">
          <div style={{ background: shade(sel) }} />
          <p className="small">
            Valeur <b>{sel + 1}</b> sur {n}. Pose ton téléphone à côté de ton dessin et plisse les yeux : la zone de ton dessin est-elle plus claire ou plus sombre ?
            (Pense à régler la luminosité de l’écran à environ 50 %.)
          </p>
        </div>
      )}
      <h3>Quel crayon pour quelle valeur ?</h3>
      <div className="pencils">
        {pencils.map(([name, a, b]) => (
          <div key={name} className="prow">
            <b>{name}</b>
            <div className="ptrack">
              <div style={{ left: `${((a - 1) / 10) * 100}%`, width: `${((b - a + 1) / 10) * 100}%` }} />
            </div>
          </div>
        ))}
        <div className="prow tiny"><span /> <div className="row between"><span>clair</span><span>foncé</span></div></div>
      </div>
      <ul className="rules">
        <li>Ne force jamais un crayon dur pour obtenir un noir : change de crayon.</li>
        <li>Construis les valeurs par couches légères successives.</li>
        <li>Les blancs les plus purs sont le papier lui-même : réserve-les dès le début.</li>
        <li>Plisse les yeux pour comparer les grandes masses de valeurs.</li>
      </ul>
    </>
  );
}
