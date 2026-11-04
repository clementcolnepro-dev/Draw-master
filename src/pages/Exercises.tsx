import { Link } from 'react-router-dom';
import { useProgress, isUnlocked } from '../lib/progress';
import { dailyExercises, isDone } from '../lib/daily';
import { modules } from '../content';
import { warmups } from '../content/warmups';
import { PageHeader, Section } from '../components/ui';

export default function Exercises() {
  const { p, logExercise } = useProgress();
  const daily = dailyExercises(p);
  const recent = [...p.exercises].reverse().slice(0, 8);

  return (
    <div className="page">
      <PageHeader title="Exercices" kicker="Pratiquer">
        <p className="muted">Le dessin s’apprend avec la main. Lis les leçons, puis pratique ici chaque jour, même 15 minutes.</p>
      </PageHeader>

      <Link to="/outils/minuteur" className="card timer-cta">
        <span className="big" aria-hidden="true">⏱</span>
        <span className="grow">
          <b>Minuteur de croquis rapides</b>
          <span className="tiny">Séances de 30 s à 10 min pour le dessin de gestes</span>
        </span>
        <span>›</span>
      </Link>

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

      <Section title="Exercices des leçons">
        {modules.map((m) => (
          <details key={m.id} className="card fold">
            <summary>
              <b>
                {m.letter}. {m.title}
              </b>
            </summary>
            <ul className="ex-list">
              {m.lessons.map((l) => {
                const open = isUnlocked(l, p);
                const n = p.exercises.filter((e) => e.key === `lecon:${l.id}`).length;
                return (
                  <li key={l.id} className={open ? '' : 'locked'}>
                    {open ? <Link to={`/lecon/${l.id}#exercice`}>{l.exercise.title}</Link> : <span>🔒 {l.exercise.title}</span>}
                    <span className="tiny">
                      {l.exercise.duration}
                      {n ? ` · fait ${n}×` : ''}
                    </span>
                  </li>
                );
              })}
            </ul>
          </details>
        ))}
      </Section>

      <Section title="Échauffements">
        <div className="list">
          {warmups.map((w) => {
            const n = p.exercises.filter((e) => e.key === w.key).length;
            return (
              <div key={w.key} className="card ex compact">
                <div className="grow">
                  <b>{w.title}</b> <span className="tiny">· {w.minutes} min{n ? ` · fait ${n}×` : ''}</span>
                  <p className="small">{w.text}</p>
                </div>
                <button className="btn small ghost" onClick={() => logExercise(w.key, w.title)}>
                  + Fait
                </button>
              </div>
            );
          })}
        </div>
      </Section>

      {recent.length > 0 && (
        <Section title="Journal récent">
          <ul className="journal">
            {recent.map((e) => (
              <li key={e.id}>
                <span>{e.label}</span>
                <span className="tiny">{new Date(e.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </div>
  );
}
