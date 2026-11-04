import { Link } from 'react-router-dom';
import { tools } from '../tools/registry';
import { PageHeader } from '../components/ui';

export default function Tools() {
  return (
    <div className="page">
      <PageHeader title="Outils de l’atelier" kicker="Outils" back="/" />
      <div className="list">
        {tools.map((t) => (
          <Link key={t.id} to={`/outils/${t.id}`} className="card tool-item">
            <span className="tool-icon" aria-hidden="true">
              {t.icon}
            </span>
            <span className="grow">
              <b>{t.title}</b>
              <span className="tiny">{t.desc}</span>
            </span>
            <span aria-hidden="true">›</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
