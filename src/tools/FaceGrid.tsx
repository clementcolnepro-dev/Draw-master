import { Link } from 'react-router-dom';
import { StepFigure } from '../components/Figure';
import { lessonById } from '../content';

export default function FaceGrid() {
  const face = lessonById('b2-face')!;
  const profile = lessonById('b3-profil')!;
  return (
    <>
      <figure className="fig">
        <StepFigure drawing={face.drawing} step={0} showAll />
        <figcaption>Visage de face : repères classiques</figcaption>
      </figure>
      <ul className="rules">
        <li><b>Yeux</b> à mi-hauteur de la tête (sommet du crâne → menton).</li>
        <li><b>Largeur</b> de la tête au niveau des yeux = 5 largeurs d’œil ; espace entre les yeux = 1 œil.</li>
        <li><b>Trois tiers égaux</b> : cheveux → sourcils, sourcils → base du nez, base du nez → menton.</li>
        <li><b>Nez</b> : ailes à l’aplomb des coins intérieurs des yeux.</li>
        <li><b>Bouche</b> : au premier tiers entre nez et menton ; coins à l’aplomb des pupilles.</li>
        <li><b>Oreilles</b> : entre la ligne des sourcils et la base du nez.</li>
      </ul>
      <figure className="fig">
        <StepFigure drawing={profile.drawing} step={0} showAll />
        <figcaption>Profil : la tête est presque aussi profonde que haute</figcaption>
      </figure>
      <ul className="rules">
        <li>Le cercle latéral (Loomis) donne la ligne des cheveux en haut et la base du nez en bas.</li>
        <li>L’oreille est juste derrière le centre de la tête, inclinée vers l’arrière.</li>
        <li>L’œil de profil est un triangle couché, en retrait de l’arête du nez.</li>
      </ul>
      <Link className="btn ghost" to="/outils/visualiseur">Superposer une grille à une photo →</Link>
    </>
  );
}
