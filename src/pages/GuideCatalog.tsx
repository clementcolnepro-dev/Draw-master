import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { guideCategories } from '../content/guides';
import { StepFigure } from '../components/Figure';
import { useProgress } from '../lib/progress';
import { PageHeader } from '../components/ui';

export default function GuideCatalog() {
  const { p } = useProgress();
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [hash]);

  return (
    <div className="page">
      <PageHeader title="Dessiner pas à pas" kicker="Dessins guidés">
        <p className="muted">Choisis un modèle et reproduis-le étape par étape. Tout est accessible : passe d’une étape à l’autre librement.</p>
        <div className="chips">
          {guideCategories.map((c) => (
            <Link key={c.id} className="chip" to={{ pathname: '/dessiner', hash: c.id }} replace>
              {c.icon} {c.title}
            </Link>
          ))}
        </div>
      </PageHeader>

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
