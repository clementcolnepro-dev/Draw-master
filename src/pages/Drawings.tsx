import { parseDay } from '../lib/daily';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { listDrawings, type DrawingRecord } from '../lib/db';
import { lessonById } from '../content';
import { BlobImg } from '../components/Thumb';
import { PageHeader } from '../components/ui';

export default function Drawings() {
  const [items, setItems] = useState<DrawingRecord[] | null>(null);
  const [error, setError] = useState<string>();
  const [filter, setFilter] = useState('');

  useEffect(() => {
    listDrawings()
      .then(setItems)
      .catch((e) => setError(String(e)));
  }, []);

  const series = useMemo(() => [...new Set((items || []).map((d) => d.series).filter(Boolean) as string[])].sort(), [items]);
  const shown = (items || []).filter((d) => !filter || d.series === filter || d.lessonId === filter);
  const lessonIds = [...new Set((items || []).map((d) => d.lessonId).filter(Boolean) as string[])];

  return (
    <div className="page">
      <PageHeader title="Mes dessins" kicker="Espace personnel">
        <p className="muted">Photographie tes dessins pour suivre ta progression. Les images restent sur ton téléphone.</p>
        <div className="row wrap">
          <Link to="/dessins/nouveau" className="btn">
            📷 Ajouter un dessin
          </Link>
          <Link to="/dessins/comparer" className="btn ghost">
            Comparer
          </Link>
        </div>
      </PageHeader>

      {error && <p className="error">Impossible de lire tes dessins : {error}</p>}
      {items === null && !error && <p className="muted">Chargement…</p>}

      {items && items.length > 0 && (series.length > 0 || lessonIds.length > 0) && (
        <div className="chips" role="group" aria-label="Filtrer">
          <button className={!filter ? 'chip on' : 'chip'} onClick={() => setFilter('')}>
            Tous ({items.length})
          </button>
          {series.map((s) => (
            <button key={s} className={filter === s ? 'chip on' : 'chip'} onClick={() => setFilter(s)}>
              ◫ {s}
            </button>
          ))}
          {lessonIds.map((id) => (
            <button key={id} className={filter === id ? 'chip on' : 'chip'} onClick={() => setFilter(id)}>
              {lessonById(id)?.title || id}
            </button>
          ))}
        </div>
      )}

      {items && items.length === 0 && (
        <div className="card empty">
          <p>Aucun dessin pour l’instant.</p>
          <p className="small muted">
            Après chaque exercice, prends ton dessin en photo (bien à plat, à la lumière du jour). En regroupant plusieurs versions d’un même sujet dans une « série », tu pourras les comparer
            côte à côte et voir tes progrès.
          </p>
        </div>
      )}

      <div className="gallery">
        {shown.map((d) => (
          <Link key={d.id} to={`/dessins/${d.id}`} className="g-item">
            <BlobImg blob={d.thumb} alt={d.title || 'Dessin'} />
            <span className="g-cap">
              <b>{d.title || 'Sans titre'}</b>
              <span className="tiny">{parseDay(d.date).toLocaleDateString('fr-FR')}</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
