import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProgress, stats, formatDuration, levels } from '../lib/progress';
import { listDrawings } from '../lib/db';
import { allLessons, moduleById } from '../content';
import { exportBackup, readBackup, restoreDrawings, shareOrDownload } from '../lib/backup';
import { Bar, PageHeader, Ring, Section } from '../components/ui';
import { today } from '../lib/daily';

export default function Progress() {
  const { p, setUnlockAll, replace, reset } = useProgress();
  const s = stats(p);
  const [nDrawings, setN] = useState<number>();
  const [msg, setMsg] = useState<string>();
  const [busy, setBusy] = useState(false);
  const [quota, setQuota] = useState<string>();
  const file = useRef<HTMLInputElement>(null);

  useEffect(() => {
    listDrawings()
      .then((l) => setN(l.length))
      .catch(() => setN(0));
    navigator.storage
      ?.estimate?.()
      .then((e) => e.usage != null && setQuota(`${(e.usage / 1048576).toFixed(1)} Mo utilisés${e.quota ? ` sur ${(e.quota / 1073741824).toFixed(1)} Go disponibles` : ''}`))
      .catch(() => {});
  }, []);

  const skills = allLessons.filter((l) => p.completed[l.id]).sort((a, b) => p.completed[a.id].localeCompare(p.completed[b.id]));
  const streak = (() => {
    const days = new Set([...p.exercises.map((e) => e.date), ...Object.values(p.completed)].map((d) => new Date(d).toLocaleDateString('sv-SE')));
    let n = 0;
    const d = new Date();
    if (!days.has(today())) d.setDate(d.getDate() - 1);
    while (days.has(d.toLocaleDateString('sv-SE'))) {
      n++;
      d.setDate(d.getDate() - 1);
    }
    return n;
  })();

  const doExport = async () => {
    setBusy(true);
    setMsg(undefined);
    try {
      const blob = await exportBackup(p);
      await shareOrDownload(blob, `draw-master-sauvegarde-${today()}.json`);
      setMsg('Sauvegarde créée. Range-la dans « Fichiers » ou sur ton ordinateur.');
    } catch (e) {
      setMsg(`Échec de l’export : ${(e as Error).message}`);
    } finally {
      setBusy(false);
    }
  };

  const doImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = '';
    if (!f) return;
    setBusy(true);
    setMsg(undefined);
    try {
      const data = await readBackup(f);
      if (!confirm(`Restaurer la sauvegarde du ${new Date(data.exportedAt).toLocaleString('fr-FR')} ? Tes données actuelles seront remplacées.`)) return;
      const n = await restoreDrawings(data);
      await replace(data.progress);
      setN(n);
      setMsg(`Sauvegarde restaurée : progression et ${n} dessin(s).`);
    } catch (err) {
      setMsg(`Échec de l’import : ${(err as Error).message}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="page">
      <PageHeader title="Ma progression" kicker="Progression" />

      <div className="card level">
        <Ring pct={s.pct} size={96} />
        <div>
          <div className="kicker">Niveau actuel</div>
          <h3>{s.level}</h3>
          <p className="small muted">{s.nextLevel ? `Prochain niveau (${s.nextLevel.name}) à ${s.nextLevel.min} % du parcours.` : 'Tu as atteint le niveau maximal du parcours actuel.'}</p>
        </div>
      </div>
      <div className="levels">
        {levels.map((l) => (
          <span key={l.name} className={s.pct >= l.min ? 'lv on' : 'lv'}>
            {l.name}
          </span>
        ))}
      </div>

      <Section title="Statistiques">
        <div className="stat-grid">
          <div className="stat">
            <b>
              {s.done}/{s.total}
            </b>
            <span>leçons terminées</span>
          </div>
          <div className="stat">
            <b>{s.exercises}</b>
            <span>exercices réalisés</span>
          </div>
          <div className="stat">
            <b>{formatDuration(s.seconds)}</b>
            <span>temps d’apprentissage</span>
          </div>
          <div className="stat">
            <b>{nDrawings ?? '…'}</b>
            <span>dessins enregistrés</span>
          </div>
          <div className="stat">
            <b>{streak}</b>
            <span>jour{streak > 1 ? 's' : ''} de pratique d’affilée</span>
          </div>
          <div className="stat">
            <b>{new Date(p.startedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</b>
            <span>début de l’apprentissage</span>
          </div>
        </div>
        <p className="tiny muted">Le temps d’apprentissage est compté pendant que tu consultes une leçon ou un outil.</p>
      </Section>

      <Section title="Progression par discipline">
        {s.byDiscipline.map((d) => (
          <div key={d.id} className="disc-row">
            <div className="row between">
              <b>
                {d.icon} {d.title}
              </b>
              <span className="tiny">
                {d.done}/{d.total} · {d.pct} %
              </span>
            </div>
            <Bar pct={d.pct} />
          </div>
        ))}
      </Section>

      <Section title="Compétences pratiquées">
        {skills.length === 0 ? (
          <p className="muted small">Les compétences des leçons terminées apparaîtront ici.</p>
        ) : (
          <ul className="skills">
            {skills.map((l) => (
              <li key={l.id}>
                <span className="pill">{moduleById(l.module)?.letter}</span>
                <span className="grow">
                  <Link to={`/lecon/${l.id}`}>{l.skill}</Link>
                  <span className="tiny"> · {new Date(p.completed[l.id]).toLocaleDateString('fr-FR')}</span>
                </span>
              </li>
            ))}
          </ul>
        )}
        <p className="tiny muted">Une compétence pratiquée n’est pas encore une compétence maîtrisée : reviens régulièrement aux exercices pour la consolider.</p>
      </Section>

      <Section title="Sauvegarde et données">
        <p className="small muted">
          Toutes tes données sont stockées uniquement sur ce téléphone. Exporte régulièrement une sauvegarde : si tu supprimes l’application ou les données du navigateur, elles seraient
          perdues.
        </p>
        {quota && <p className="tiny muted">Stockage : {quota}</p>}
        <div className="row wrap">
          <button className="btn" disabled={busy} onClick={doExport}>
            ⬇ Exporter (JSON)
          </button>
          <button className="btn ghost" disabled={busy} onClick={() => file.current?.click()}>
            ⬆ Importer une sauvegarde
          </button>
          <input ref={file} type="file" accept="application/json,.json" hidden onChange={doImport} />
        </div>
        {msg && <p className="small notice">{msg}</p>}
      </Section>

      <Section title="Réglages">
        <label className="toggle">
          <input type="checkbox" checked={p.unlockAll} onChange={(e) => setUnlockAll(e.target.checked)} />
          <span>
            <b>Tout débloquer</b>
            <span className="tiny">Accéder à toutes les leçons sans suivre l’ordre (utile si tu as déjà des bases).</span>
          </span>
        </label>
        <button
          className="btn danger small"
          onClick={async () => {
            if (confirm('Effacer toute ta progression (leçons, exercices, temps) ? Tes dessins sont conservés.')) await reset();
          }}
        >
          Réinitialiser la progression
        </button>
      </Section>
    </div>
  );
}
