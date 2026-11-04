import type { Guide } from '../content/guides/types';
import { StepFigure } from './Figure';

const url = (p: string) => import.meta.env.BASE_URL + p;

/** Affiche une étape d'un dessin guidé : schéma SVG par calques, ou image si le guide est en images. */
export function GuideFigure({ g, step, clean, highlight = true, thumb }: { g: Guide; step: number; clean?: boolean; highlight?: boolean; thumb?: boolean }) {
  if (g.images) {
    return <img className={thumb ? 'guide-img thumb-img' : 'guide-img'} src={url(g.images[Math.min(step, g.images.length - 1)])} alt={`Étape ${step + 1}`} loading={thumb ? 'lazy' : undefined} />;
  }
  return <StepFigure drawing={g} step={step} showAll={clean} clean={clean} highlight={highlight} />;
}

/** Vignette du résultat final. */
export function GuideCover({ g }: { g: Guide }) {
  if (g.images) return <GuideFigure g={g} step={g.images.length - 1} thumb />;
  return <StepFigure drawing={g} step={g.layers.length - 1} showAll clean highlight={false} />;
}
