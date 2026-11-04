import { Link } from 'react-router-dom';
import { useProgress, stats, nextLesson } from '../lib/progress';
import { dailyExercises, isDone } from '../lib/daily';
import { disciplines, moduleById } from '../content';
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
  const next = nextLesson(p);
  const daily = dailyExercises(p);

  return (
    <div className="page">
      <header className="hero">
        <div>
          <div className="kicker">Draw Master · École de dessin réaliste</div>
          <h1>{greeting()} !</h1>
          <p className="muted">
            {s.done === 0
              ? 'Bienvenue dans ton atelier. Commence par les fondamentaux : tout le reste repose dessus.'
              : 'Content de te revoir à l’atelier. Un peu de pratique chaque jour vaut mieux qu’une longue séance par semaine.'}
          </p>
        </div>
        <Ring pct={s.pct} label={s.level} />
      </header>

      <div className="stat-row">
        <div className="stat">
          <b>{s.done}</b>
          <span>leçon{s.done > 1 ? 's' : ''} terminée{s.done > 1 ? 's' : ''} / {s.total}</span>
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
        <Link to={`/lecon/${next.id}`} className="card resume">
          <div className="kicker">{p.lastLesson === next.id ? 'Reprendre' : 'Leçon suivante'} · Module {moduleById(next.module)?.letter}</div>
          <h3>{next.title}</h3>
          <p className="muted small">{next.objective}</p>
          <span className="btn">Continuer →</span>
        </Link>
      )}
      {!next && (
        <div className="card resume">
          <h3>Toutes les leçons disponibles sont terminées 🎉</h3>
          <p className="muted small">Continue de pratiquer avec les exercices du jour et les outils. De nouvelles leçons pourront être ajoutées au programme.</p>
        </div>
      )}

      <Section title="Les quatre disciplines">
        <div className="grid2">
          {disciplines.map((d) => {
            const st = s.byDiscipline.find((x) => x.id === d.id)!;
            return (
              <Link key={d.id} to={`/apprendre#${d.id}`} className="card disc">
                <span className="disc-icon" aria-hidden="true">
                  {d.icon}
                </span>
                <h3>{d.title}</h3>
                <p className="muted small">{d.subtitle}</p>
                <Bar pct={st.pct} small />
                <span className="tiny">
                  {st.done}/{st.total} leçons
                </span>
              </Link>
            );
          })}
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

      <Section title="Outils de l’atelier">
        <Link to="/outils" className="card tools-link">
          <span>Grilles de proportions, valeurs de gris, guide des ombres, symétrie, visualiseur de références, minuteur de croquis, glossaire</span>
          <span className="btn ghost small">Ouvrir →</span>
        </Link>
      </Section>
    </div>
  );
}
