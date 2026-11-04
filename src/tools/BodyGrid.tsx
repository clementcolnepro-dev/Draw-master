import { StepFigure } from '../components/Figure';
import { lessonById } from '../content';

const rows = [
  ['1', 'Menton'],
  ['2', 'Mamelons'],
  ['3', 'Nombril · coudes'],
  ['4', 'Entrejambe · poignets (milieu du corps)'],
  ['5', 'Mi-cuisse · bout des doigts'],
  ['6', 'Sous les genoux'],
  ['7', 'Mi-mollet'],
  ['8', 'Plante des pieds']
];

export default function BodyGrid() {
  const l = lessonById('c1-proportions')!;
  return (
    <>
      <figure className="fig narrow">
        <StepFigure drawing={l.drawing} step={0} showAll />
        <figcaption>Canon de 8 têtes (un adulte réel mesure plutôt 7 à 7,5 têtes)</figcaption>
      </figure>
      <table className="table">
        <thead>
          <tr><th>Tête n°</th><th>Repère (bas de la case)</th></tr>
        </thead>
        <tbody>
          {rows.map(([n, t]) => (
            <tr key={n}><td>{n}</td><td>{t}</td></tr>
          ))}
        </tbody>
      </table>
      <ul className="rules">
        <li><b>Épaules</b> : environ 2 hauteurs de tête de large chez l’homme, un peu moins chez la femme.</li>
        <li><b>Hanches</b> : environ 1,5 tête ; relativement plus larges chez la femme.</li>
        <li><b>Envergure</b> bras tendus ≈ hauteur totale.</li>
        <li><b>Main</b> ≈ longueur du visage (menton → racine des cheveux).</li>
        <li><b>Pied</b> ≈ longueur de l’avant-bras.</li>
      </ul>
    </>
  );
}
