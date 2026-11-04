import { parseDay } from '../lib/daily';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteDrawing, getDrawing, putDrawing, type DrawingRecord } from '../lib/db';
import { lessonById } from '../content';
import { guideById } from '../content/guides';
import { BlobImg } from '../components/Thumb';
import { DrawingFields, type DrawingMeta } from '../components/DrawingForm';
import { PageHeader } from '../components/ui';

export default function DrawingDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const [d, setD] = useState<DrawingRecord | null | undefined>(undefined);
  const [edit, setEdit] = useState<DrawingMeta | null>(null);
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    getDrawing(id || '')
      .then((r) => setD(r || null))
      .catch(() => setD(null));
  }, [id]);

  if (d === undefined) return <div className="page muted">Chargement…</div>;
  if (d === null)
    return (
      <div className="page">
        <PageHeader title="Dessin introuvable" back="/dessins" />
      </div>
    );

  const lesson = d.lessonId ? lessonById(d.lessonId) : undefined;
  const guide = d.guideId ? guideById(d.guideId) : undefined;

  const save = async () => {
    if (!edit) return;
    const nd = { ...d, ...edit, title: edit.title.trim(), comment: edit.comment.trim(), series: edit.series?.trim() || undefined };
    await putDrawing(nd);
    setD(nd);
    setEdit(null);
  };
  const newVersion = async () => {
    // Range ce dessin dans une série (son titre) s'il n'en a pas, pour pouvoir comparer les versions.
    const serie = d.series || d.title || 'Série ' + parseDay(d.date).toLocaleDateString('fr-FR');
    if (!d.series) await putDrawing({ ...d, series: serie });
    nav(`/dessins/nouveau?serie=${encodeURIComponent(serie)}${d.lessonId ? `&lecon=${d.lessonId}` : ''}${d.guideId ? `&guide=${d.guideId}` : ''}`);
  };
  const remove = async () => {
    if (!confirm('Supprimer définitivement ce dessin ?')) return;
    await deleteDrawing(d.id);
    nav('/dessins', { replace: true });
  };

  return (
    <div className="page">
      <PageHeader title={d.title || 'Sans titre'} kicker={parseDay(d.date).toLocaleDateString('fr-FR', { dateStyle: 'long' })} back="/dessins" />
      <button className={zoom ? 'photo zoom' : 'photo'} onClick={() => setZoom(!zoom)} aria-label="Agrandir">
        <BlobImg blob={d.image} alt={d.title || 'Dessin'} />
      </button>

      {edit ? (
        <>
          <DrawingFields value={edit} onChange={setEdit} />
          <div className="row">
            <button className="btn" onClick={save}>
              Enregistrer
            </button>
            <button className="btn ghost" onClick={() => setEdit(null)}>
              Annuler
            </button>
          </div>
        </>
      ) : (
        <div className="card">
          {guide && (
            <p className="small">
              Modèle : <Link to={`/dessiner/${guide.id}`}>{guide.title}</Link>
            </p>
          )}
          {lesson && (
            <p className="small">
              Leçon : <Link to={`/lecon/${lesson.id}`}>{lesson.title}</Link>
            </p>
          )}
          {d.series && <p className="small">Série : ◫ {d.series}</p>}
          {d.comment ? <p className="comment">{d.comment}</p> : <p className="muted small">Pas de commentaire.</p>}
          <div className="row wrap">
            <button className="btn ghost small" onClick={() => setEdit({ title: d.title, date: d.date, comment: d.comment, lessonId: d.lessonId, guideId: d.guideId, series: d.series })}>
              Modifier
            </button>
            {d.series && (
              <Link className="btn ghost small" to={`/dessins/comparer?serie=${encodeURIComponent(d.series)}`}>
                Comparer la série
              </Link>
            )}
            <button className="btn ghost small" onClick={newVersion}>
              + Nouvelle version
            </button>
            <button className="btn danger small" onClick={remove}>
              Supprimer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
