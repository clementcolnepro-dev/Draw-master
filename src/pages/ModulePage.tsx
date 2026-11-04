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
          {st.done}/{st.total} fiches lues
        </span>
      </PageHeader>

      <Section title="Fiches">
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
                    {l.difficulty} · {l.minutes} min de lecture
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
      </Section>

      {m.planned.length > 0 && (
        <Section title="Fiches à venir">
          <p className="muted small">Pas encore rédigées.</p>
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
