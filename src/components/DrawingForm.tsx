import { useEffect, useState } from 'react';
import { listDrawings } from '../lib/db';
import { guideCategories } from '../content/guides';

export interface DrawingMeta {
  title: string;
  date: string;
  comment: string;
  lessonId?: string;
  guideId?: string;
  series?: string;
}

export function DrawingFields({ value, onChange }: { value: DrawingMeta; onChange: (v: DrawingMeta) => void }) {
  const [series, setSeries] = useState<string[]>([]);
  useEffect(() => {
    listDrawings()
      .then((l) => setSeries([...new Set(l.map((d) => d.series).filter(Boolean) as string[])]))
      .catch(() => {});
  }, []);
  const set = (k: keyof DrawingMeta, v: string) => onChange({ ...value, [k]: v || undefined });

  return (
    <div className="form">
      <label>
        Titre
        <input value={value.title} maxLength={80} placeholder="Ex. : Œil d’après photo" onChange={(e) => onChange({ ...value, title: e.target.value })} />
      </label>
      <label>
        Date du dessin
        <input type="date" value={value.date} onChange={(e) => onChange({ ...value, date: e.target.value })} />
      </label>
      <label>
        Modèle dessiné
        <select value={value.guideId || ''} onChange={(e) => set('guideId', e.target.value)}>
          <option value="">— Aucun (dessin libre) —</option>
          {guideCategories.map((c) => (
            <optgroup key={c.id} label={c.title}>
              {c.guides.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.title}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </label>
      <label>
        Série (pour comparer plusieurs versions)
        <input list="series-list" value={value.series || ''} maxLength={60} placeholder="Ex. : Mon œil gauche" onChange={(e) => set('series', e.target.value)} />
        <datalist id="series-list">
          {series.map((s) => (
            <option key={s} value={s} />
          ))}
        </datalist>
      </label>
      <label>
        Commentaire personnel
        <textarea rows={4} value={value.comment} placeholder="Ce qui a bien marché, ce que je dois retravailler…" onChange={(e) => onChange({ ...value, comment: e.target.value })} />
      </label>
    </div>
  );
}
