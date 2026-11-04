import { Link, useParams } from 'react-router-dom';
import { moduleById } from '../content';
import { isUnlocked, useProgress, stats } from '../lib/progress';
import { Bar, PageHeader, Section } from '../components/ui';
import NotFound from './NotFound';

export default function ModulePage() {
  const { moduleId } = useParams();
  const m = moduleById(moduleId || '');
  const { p } = useProgress();
  if (!m) return <NotFound />;
  const st = stats(p).byModule.find((x) => x.id === m.id)!;

  return (
    <div className="page">
      <PageHeader title={m.title} kicker={`Module ${m.letter}`} back="/apprendre">
        <p className="muted">{m.description}</p>
        <Bar pct={st.pct} />
        <span className="tiny">
          {st.done}/{st.total} leçons terminées
        </span>
      </PageHeader>

      <Section title="Leçons">
        <ol className="lesson-list">
          {m.lessons.map((l, i) => {
            const done = !!p.completed[l.id];
            const open = isUnlocked(l, p);
            const inner = (
              <>
                <span className={done ? 'num done' : 'num'}>{done ? '✓' : i + 1}</span>
                <span className="grow">
                  <b>{l.title}</b>
                  <span className="tiny">
                    {l.difficulty} · {l.minutes} min · {l.steps.length} étapes illustrées
                  </span>
                </span>
                <span aria-hidden="true">{open ? '›' : '🔒'}</span>
              </>
            );
            return (
              <li key={l.id}>
                {open ? (
                  <Link className="card lesson-item" to={`/lecon/${l.id}`}>
                    {inner}
                  </Link>
                ) : (
                  <div className="card lesson-item locked" aria-disabled="true" title="Termine la leçon précédente pour débloquer">
                    {inner}
                  </div>
                )}
              </li>
            );
          })}
        </ol>
        {m.lessons.some((l) => !isUnlocked(l, p)) && (
          <p className="tiny muted">🔒 Termine la leçon précédente pour débloquer la suivante (ou active « tout débloquer » dans Progression).</p>
        )}
      </Section>

      {m.planned.length > 0 && (
        <Section title="Au programme (en préparation)">
          <p className="muted small">Ces leçons font partie du programme complet du module. Elles ne sont pas encore rédigées : elles ne sont donc pas cliquables.</p>
          <ul className="planned">
            {m.planned.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </Section>
      )}
    </div>
  );
}
