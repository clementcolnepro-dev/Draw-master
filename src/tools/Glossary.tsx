import { useState } from 'react';
import { glossary } from '../content/glossary';

const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export default function Glossary() {
  const [q, setQ] = useState('');
  const list = glossary.filter((g) => !q || norm(g.term + ' ' + g.def).includes(norm(q))).sort((a, b) => a.term.localeCompare(b.term, 'fr'));
  return (
    <>
      <input className="search" type="search" placeholder="Rechercher un terme…" value={q} onChange={(e) => setQ(e.target.value)} />
      <dl className="glossary">
        {list.map((g) => (
          <div key={g.term}>
            <dt>{g.term}</dt>
            <dd>{g.def}</dd>
          </div>
        ))}
      </dl>
      {list.length === 0 && <p className="muted">Aucun terme trouvé.</p>}
    </>
  );
}
