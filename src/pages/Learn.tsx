import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { disciplines, modules } from '../content';
import { useProgress, stats } from '../lib/progress';
import { Bar, PageHeader } from '../components/ui';

export default function Learn() {
  const { p } = useProgress();
  const s = stats(p);
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [hash]);

  return (
    <div className="page">
      <PageHeader title="Le parcours" kicker="Apprendre">
        <p className="muted">
          Cinq modules, organisés en quatre disciplines. Les leçons se débloquent dans l’ordre à l’intérieur de chaque module : tu peux avancer en parallèle dans plusieurs modules,
          mais commence de préférence par les fondamentaux.
        </p>
      </PageHeader>
      {disciplines.map((d) => (
        <section key={d.id} id={d.id} className="section">
          <h2>
            <span className="disc-icon inline" aria-hidden="true">
              {d.icon}
            </span>{' '}
            {d.title}
          </h2>
          {modules
            .filter((m) => m.discipline === d.id)
            .map((m) => {
              const st = s.byModule.find((x) => x.id === m.id)!;
              return (
                <Link key={m.id} to={`/apprendre/${m.id}`} className="card module">
                  <div className="module-letter">{m.letter}</div>
                  <div className="grow">
                    <h3>{m.title}</h3>
                    <p className="muted small">{m.subtitle}</p>
                    <Bar pct={st.pct} small />
                    <span className="tiny">
                      {st.done}/{st.total} leçons terminées · {m.planned.length} en préparation
                    </span>
                  </div>
                </Link>
              );
            })}
        </section>
      ))}
    </div>
  );
}
