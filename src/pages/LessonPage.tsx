import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { lessonById, moduleById } from '../content';
import { isUnlocked, useProgress, useStudyTime, formatDuration } from '../lib/progress';
import { Paper, StepPlayer } from '../components/Figure';
import { Rich } from '../components/Rich';
import { PageHeader } from '../components/ui';
import NotFound from './NotFound';

const parts = [
  ['objectif', 'A', 'Objectif'],
  ['theorie', 'B', 'Théorie'],
  ['demonstration', 'C', 'Démonstration'],
  ['conseils', 'D', 'Conseils'],
  ['exercice', 'E', 'Exercice'],
  ['validation', 'F', 'Validation']
] as const;

export default function LessonPage() {
  const { lessonId } = useParams();
  const { hash } = useLocation();
  const lesson = lessonById(lessonId || '');
  const { p, setCompleted, setLastLesson, logExercise } = useProgress();
  const [checks, setChecks] = useState<Record<number, boolean>>({});
  useStudyTime(lesson?.id);

  useEffect(() => {
    if (lesson && isUnlocked(lesson, p)) setLastLesson(lesson.id);
    setChecks({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson?.id]);

  useEffect(() => {
    if (hash) setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 50);
  }, [hash, lesson?.id]);

  if (!lesson) return <NotFound />;
  const m = moduleById(lesson.module)!;
  const idx = m.lessons.findIndex((l) => l.id === lesson.id);
  const next = m.lessons[idx + 1];
  const done = !!p.completed[lesson.id];
  const exKey = `lecon:${lesson.id}`;
  const exCount = p.exercises.filter((e) => e.key === exKey).length;

  if (!isUnlocked(lesson, p))
    return (
      <div className="page">
        <PageHeader title={lesson.title} kicker={`Module ${m.letter} · Leçon ${idx + 1}`} back={`/apprendre/${m.id}`} />
        <div className="card">
          <p>🔒 Cette leçon se débloque quand tu as terminé la leçon précédente :</p>
          <Link className="btn" to={`/lecon/${m.lessons[idx - 1].id}`}>
            {m.lessons[idx - 1].title}
          </Link>
        </div>
      </div>
    );

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="page lesson">
      <PageHeader title={lesson.title} kicker={`Module ${m.letter} · ${m.title} · Leçon ${idx + 1}/${m.lessons.length}`} back={`/apprendre/${m.id}`}>
        <div className="meta">
          <span className="pill">{lesson.difficulty}</span>
          <span className="tiny">≈ {lesson.minutes} min de lecture</span>
          {p.lessonSeconds[lesson.id] ? <span className="tiny">· {formatDuration(p.lessonSeconds[lesson.id])} passées ici</span> : null}
          {done && <span className="pill ok">✓ Lue</span>}
        </div>
      </PageHeader>

      <nav className="lesson-nav" aria-label="Parties de la leçon">
        {parts.map(([id, l, t]) => (
          <button key={id} onClick={() => scrollTo(id)}>
            <b>{l}</b> {t}
          </button>
        ))}
      </nav>

      <section id="objectif" className="section">
        <h2>
          <span className="part">A</span> Objectif
        </h2>
        <p className="lead">{lesson.objective}</p>
        <div className="card why">
          <h4>Pourquoi c’est important</h4>
          <p>{lesson.why}</p>
        </div>
      </section>

      <section id="theorie" className="section">
        <h2>
          <span className="part">B</span> Théorie
        </h2>
        {lesson.theory.map((t, i) => (
          <p key={i}>
            <Rich text={t} />
          </p>
        ))}
        {lesson.theoryFigure && (
          <figure className="fig">
            <Paper viewBox={lesson.theoryFigure.viewBox}>{lesson.theoryFigure.content}</Paper>
            <figcaption>{lesson.theoryFigure.caption}</figcaption>
          </figure>
        )}
      </section>

      <section id="demonstration" className="section">
        <h2>
          <span className="part">C</span> Démonstration pas à pas
        </h2>
        <p className="muted small">
          {lesson.steps.length} étapes. Le trait <span className="sanguine">en sanguine</span> est ce qu’on ajoute à l’étape ; en gris, ce qui est déjà dessiné ; en bleu, les traits de
          construction (très légers sur ton papier).
        </p>
        <StepPlayer drawing={lesson.drawing} steps={lesson.steps} />
        <details className="all-steps">
          <summary>Voir toutes les étapes en texte</summary>
          <ol>
            {lesson.steps.map((s, i) => (
              <li key={i}>
                <b>{s.title}.</b> {s.text}
              </li>
            ))}
          </ol>
        </details>
      </section>

      <section id="conseils" className="section">
        <h2>
          <span className="part">D</span> Conseils techniques
        </h2>
        <div className="tips">
          <div className="card tip bad">
            <h4>Erreurs fréquentes</h4>
            <ul>
              {lesson.tips.errors.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <div className="card tip good">
            <h4>Astuces</h4>
            <ul>
              {lesson.tips.tricks.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <div className="card tip look">
            <h4>Points à observer</h4>
            <ul>
              {lesson.tips.observe.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="exercice" className="section">
        <h2>
          <span className="part">E</span> Exercice pratique
        </h2>
        <div className="card exercise">
          <h3>{lesson.exercise.title}</h3>
          <p className="tiny">⏱ {lesson.exercise.duration}</p>
          <h4>Matériel</h4>
          <ul>
            {lesson.exercise.material.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <h4>Consignes</h4>
          <ol>
            {lesson.exercise.instructions.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ol>
          <div className="row wrap">
            <button className="btn" onClick={() => logExercise(exKey, lesson.exercise.title)}>
              J’ai réalisé l’exercice
            </button>
            <Link className="btn ghost" to={`/dessins/nouveau?lecon=${lesson.id}`}>
              📷 Ajouter mon dessin
            </Link>
          </div>
          {exCount > 0 && <p className="tiny ok-text">Réalisé {exCount} fois. Refaire un exercice est la meilleure façon de progresser.</p>}
        </div>
      </section>

      <section id="validation" className="section">
        <h2>
          <span className="part">F</span> Validation
        </h2>
        <div className="card">
          <h4>Auto-évaluation</h4>
          <p className="small muted">Compare honnêtement ton dessin avec ces critères. Si un point n’est pas acquis, refais l’exercice avant de passer à la suite.</p>
          <ul className="checks">
            {lesson.exercise.selfCheck.map((t, i) => (
              <li key={t}>
                <label>
                  <input type="checkbox" checked={!!checks[i]} onChange={(e) => setChecks({ ...checks, [i]: e.target.checked })} />
                  <span>{t}</span>
                </label>
              </li>
            ))}
          </ul>
          <p className="tiny muted">
            Marquer la fiche comme lue sert seulement à ton suivi personnel.
          </p>
          {done ? (
            <div className="row wrap">
              <span className="pill ok">✓ Lue le {new Date(p.completed[lesson.id]).toLocaleDateString('fr-FR')}</span>
              <button className="btn ghost small" onClick={() => setCompleted(lesson.id, false)}>
                Annuler
              </button>
            </div>
          ) : (
            <button className="btn" onClick={() => setCompleted(lesson.id, true)}>
              Marquer comme lue
            </button>
          )}
        </div>
        {done && next && (
          <Link className="card resume" to={`/lecon/${next.id}`}>
            <div className="kicker">Leçon suivante</div>
            <h3>{next.title}</h3>
            <span className="btn">Continuer →</span>
          </Link>
        )}
        {done && !next && (
          <Link className="card resume" to="/apprendre">
            <div className="kicker">Module terminé</div>
            <h3>Bravo, tu as terminé les leçons disponibles du module {m.letter} !</h3>
            <span className="btn">Choisir un autre module →</span>
          </Link>
        )}
      </section>
    </div>
  );
}
