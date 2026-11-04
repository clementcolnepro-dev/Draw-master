import { parseDay } from '../lib/daily';
import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { listDrawings, type DrawingRecord } from '../lib/db';
import { useBlobUrl } from '../lib/useBlobUrl';
import { PageHeader } from '../components/ui';

const fmt = (d: string) => parseDay(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });

export default function Compare() {
  const [params, setParams] = useSearchParams();
  const [items, setItems] = useState<DrawingRecord[]>([]);
  const [a, setA] = useState<string>();
  const [b, setB] = useState<string>();
  const [mode, setMode] = useState<'cote' | 'curseur'>('cote');
  const [cut, setCut] = useState(50);

  useEffect(() => {
    listDrawings().then(setItems).catch(console.error);
  }, []);

  const seriesList = useMemo(() => [...new Set(items.map((d) => d.series).filter(Boolean) as string[])].sort(), [items]);
  const serie = params.get('serie') || '';
  const versions = useMemo(
    () => (serie ? items.filter((d) => d.series === serie) : items).slice().sort((x, y) => (x.date + x.createdAt).localeCompare(y.date + y.createdAt)),
    [items, serie]
  );

  useEffect(() => {
    if (versions.length >= 2) {
      setA(versions[0].id);
      setB(versions[versions.length - 1].id);
    } else {
      setA(versions[0]?.id);
      setB(undefined);
    }
  }, [versions]);

  const da = versions.find((v) => v.id === a);
  const dbb = versions.find((v) => v.id === b);
  const ua = useBlobUrl(da?.image);
  const ub = useBlobUrl(dbb?.image);

  return (
    <div className="page">
      <PageHeader title="Comparer mes dessins" kicker="Mes dessins" back="/dessins">
        <p className="muted small">Choisis une série (plusieurs versions d’un même sujet) ou compare deux dessins quelconques.</p>
      </PageHeader>

      <div className="form">
        <label>
          Série
          <select value={serie} onChange={(e) => setParams(e.target.value ? { serie: e.target.value } : {})}>
            <option value="">Tous mes dessins</option>
            {seriesList.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
      </div>

      {versions.length < 2 ? (
        <div className="card empty">
          <p>Il faut au moins deux dessins pour comparer.</p>
          <p className="small muted">Astuce : sur un dessin, utilise « + Nouvelle version » pour créer une série.</p>
          <Link className="btn" to="/dessins/nouveau">
            Ajouter un dessin
          </Link>
        </div>
      ) : (
        <>
          <div className="pickers">
            {[
              [a, setA, 'Avant'],
              [b, setB, 'Après']
            ].map(([val, set, label]) => (
              <label key={label as string}>
                {label as string}
                <select value={(val as string) || ''} onChange={(e) => (set as (v: string) => void)(e.target.value)}>
                  {versions.map((v) => (
                    <option key={v.id} value={v.id}>
                      {fmt(v.date)} — {v.title || 'Sans titre'}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
          <div className="chips">
            <button className={mode === 'cote' ? 'chip on' : 'chip'} onClick={() => setMode('cote')}>
              Côte à côte
            </button>
            <button className={mode === 'curseur' ? 'chip on' : 'chip'} onClick={() => setMode('curseur')}>
              Superposition avec curseur
            </button>
          </div>

          {mode === 'cote' ? (
            <div className="side">
              {[
                [ua, da],
                [ub, dbb]
              ].map(([u, d], i) => (
                <figure key={i}>
                  {u ? <img src={u as string} alt="" /> : <div className="img-ph" />}
                  <figcaption className="tiny">{d ? fmt((d as DrawingRecord).date) : ''}</figcaption>
                </figure>
              ))}
            </div>
          ) : (
            <div className="slider-cmp">
              <div className="stack">
                {ub && <img src={ub} alt="Après" />}
                {ua && <img src={ua} alt="Avant" className="top" style={{ clipPath: `inset(0 ${100 - cut}% 0 0)` }} />}
                <div className="cut" style={{ left: `${cut}%` }} />
              </div>
              <input type="range" min={0} max={100} value={cut} onChange={(e) => setCut(+e.target.value)} aria-label="Position du curseur" />
              <div className="row between tiny">
                <span>← Avant ({da && fmt(da.date)})</span>
                <span>Après ({dbb && fmt(dbb.date)}) →</span>
              </div>
            </div>
          )}
          {da && dbb && (
            <p className="small muted">
              {Math.max(0, Math.round((parseDay(dbb.date).getTime() - parseDay(da.date).getTime()) / 86400000))} jours entre ces deux dessins.
            </p>
          )}
        </>
      )}
    </div>
  );
}
