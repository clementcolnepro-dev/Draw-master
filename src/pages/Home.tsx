import { Link } from 'react-router-dom';
import { useProgress, stats } from '../lib/progress';
import { dailyExercises, isDone } from '../lib/daily';
import { allGuides, guideById, categoryOfGuide } from '../content/guides';
import { GuideCover } from '../components/GuideFigure';
import { Bar, Ring, Section } from '../components/ui';

function greeting() {
  const h = new Date().getHours();
  if (h < 5) return 'Bonne nuit';
  if (h < 18) return 'Bonjour';
  return 'Bonsoir';
}

export default function Home() {
  const { p, logExercise } = useProgress();
  const s = stats(p);
  const next = (p.lastGuide && guideById(p.lastGuide)) || allGuides.find((g) => !p.guides[g.id]);
  const daily = dailyExercises(p);

  return (
    <div className="page">
      <header className="hero">
        <div>
          <div className="kicker">Draw Master · École de dessin réaliste</div>
          <h1>{greeting()} !</h1>
          <p className="muted">
            {s.done === 0
              ? 'Bienvenue dans ton atelier. Choisis un modèle et dessine-le étape par étape.'
              : 'Content de te revoir à l’atelier. Un peu de pratique chaque jour vaut mieux qu’une longue séance par semaine.'}
          </p>
        </div>
        <Ring pct={s.pct} label={s.level} />
      </header>

      <div className="stat-row">
        <div className="stat">
          <b>{s.done}</b>
          <span>modèle{s.done > 1 ? 's' : ''} dessiné{s.done > 1 ? 's' : ''} / {s.total}</span>
        </div>
        <div className="stat">
          <b>{s.level}</b>
          <span>{s.nextLevel ? `prochain niveau à ${s.nextLevel.min} %` : 'niveau maximal'}</span>
        </div>
        <div className="stat">
          <b>{s.exercises}</b>
          <span>exercice{s.exercises > 1 ? 's' : ''} réalisé{s.exercises > 1 ? 's' : ''}</span>
        </div>
      </div>

      {next && (
        <Link to={`/dessiner/${next.id}`} className="card resume resume-guide">
          <div className="resume-thumb">
            <GuideCover g={next} />
          </div>
          <div className="grow">
            <div className="kicker">{p.lastGuide === next.id ? 'Reprendre' : 'À dessiner'} · {categoryOfGuide(next.id)?.title}</div>
            <h3>{next.title}</h3>
            <span className="tiny">{next.steps.length} étapes</span>
            <span className="btn small">Ouvrir →</span>
          </div>
        </Link>
      )}

      <Section title="Dessiner pas à pas">
        <div className="grid2">
          {s.byCategory.map((c) => (
            <Link key={c.id} to={`/dessiner#${c.id}`} className="card disc">
              <span className="disc-icon" aria-hidden="true">
                {c.icon}
              </span>
              <h3>{c.title}</h3>
              <Bar pct={c.pct} small />
              <span className="tiny">
                {c.done}/{c.total} modèles
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section title="Exercices du jour">
        <div className="list">
          {daily.map((d) => {
            const done = isDone(p, d.key);
            return (
              <div key={d.key} className={done ? 'card ex done' : 'card ex'}>
                <div className="ex-head">
                  <span className="pill">{d.kind}</span>
                  <span className="tiny">{d.minutes} min</span>
                </div>
                <h3>{d.title}</h3>
                <p className="small">{d.text}</p>
                <div className="row">
                  {d.link && (
                    <Link to={d.link} className="btn ghost small">
                      Ouvrir
                    </Link>
                  )}
                  <button className="btn small" disabled={done} onClick={() => logExercise(d.key, d.title)}>
                    {done ? '✓ Réalisé' : 'Je l’ai fait'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <Section title="Atelier">
        <Link to="/apprendre" className="card tools-link">
          <span>Fiches théorie : proportions, lumière, plis… expliqués en détail</span>
          <span className="btn ghost small">Lire →</span>
        </Link>
        <Link to="/outils" className="card tools-link">
          <span>Grilles de proportions, valeurs de gris, guide des ombres, symétrie, visualiseur de références, minuteur de croquis, glossaire</span>
          <span className="btn ghost small">Ouvrir →</span>
        </Link>
    </Section>
    </div>
  );
}
