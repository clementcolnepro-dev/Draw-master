import { useEffect, useState } from 'react';
import { listCustomGuides, type CustomGuide } from '../lib/db';
import { BlobImg } from '../components/Thumb';
import { Link, useLocation } from 'react-router-dom';
import { guideCategories } from '../content/guides';
import { StepFigure } from '../components/Figure';
import { useProgress } from '../lib/progress';
import { PageHeader } from '../components/ui';

export default function GuideCatalog() {
  const { p } = useProgress();
  const { hash } = useLocation();
  const [mine, setMine] = useState<CustomGuide[]>([]);
  useEffect(() => {
    listCustomGuides().then(setMine).catch(console.error);
  }, []);
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [hash]);

  return (
    <div className="page">
      <PageHeader title="Dessiner pas à pas" kicker="Dessins guidés">
        <p className="muted">Choisis un modèle et reproduis-le étape par étape. Tout est accessible : passe d’une étape à l’autre librement.</p>
        <div className="chips">
          <Link className="chip" to={{ pathname: '/dessiner', hash: 'perso' }} replace>
            ★ Mes modèles
          </Link>
          {guideCategories.map((c) => (
            <Link key={c.id} className="chip" to={{ pathname: '/dessiner', hash: c.id }} replace>
              {c.icon} {c.title}
            </Link>
          ))}
        </div>
      </PageHeader>

      <section id="perso" className="section">
        <h2>
          <span className="disc-icon inline" aria-hidden="true">
            ★
          </span>{' '}
          Mes modèles
        </h2>
        <p className="muted small">Crée tes propres pas à pas avec tes images (captures de tutoriels, photos). Ils restent sur ce téléphone.</p>
        <div className="guide-grid">
          {mine.map((g) => (
            <Link key={g.id} to={`/dessiner/perso/${g.id}`} className="guide-card">
              <div className="guide-thumb">
                <BlobImg blob={g.steps[g.steps.length - 1]?.image} alt="" className="photo-thumb" />
                {p.guides[`perso:${g.id}`] && <span className="done-badge">✓</span>}
              </div>
              <b>{g.title}</b>
              <span className="tiny">{g.steps.length} étapes · perso</span>
            </Link>
          ))}
          <Link to="/dessiner/perso/nouveau" className="guide-card add-card">
            <span className="plus">＋</span>
            <b>Créer un modèle</b>
            <span className="tiny">à partir de mes images</span>
          </Link>
        </div>
      </section>

      {guideCategories.map((c) => (
        <section key={c.id} id={c.id} className="section">
          <h2>
            <span className="disc-icon inline" aria-hidden="true">
              {c.icon}
            </span>{' '}
            {c.title}
          </h2>
          <p className="muted small">{c.subtitle}</p>
          <div className="guide-grid">
            {c.guides.map((g) => (
              <Link key={g.id} to={`/dessiner/${g.id}`} className="guide-card">
                <div className="guide-thumb">
                  <StepFigure drawing={g} step={g.layers.length - 1} showAll clean highlight={false} />
                  {p.guides[g.id] && <span className="done-badge">✓</span>}
                </div>
                <b>{g.title}</b>
                <span className="tiny">
                  {g.steps.length} étapes · {g.level}
                </span>
              </Link>
            ))}
          </div>
        </section>
      ))}

      <Link to="/apprendre" className="card tools-link">
        <span>
          <b>Fiches théorie</b> — les explications détaillées (proportions, lumière, plis…) si tu veux comprendre le pourquoi.
        </span>
        <span className="btn ghost small">Ouvrir →</span>
      </Link>
    </div>
  );
}
