import { useState, type ReactNode } from 'react';
import type { Drawing } from '../content/types';

/**
 * Définitions SVG partagées (hachures, dégradés). Montées une seule fois dans l'app :
 * toutes les illustrations y font référence via url(#id).
 */
export function SvgDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="#2e2a25" strokeWidth="1" opacity=".55" />
        </pattern>
        <pattern id="hatchLight" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="8" stroke="#2e2a25" strokeWidth=".8" opacity=".35" />
        </pattern>
        <pattern id="hatchDense" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="4" stroke="#2e2a25" strokeWidth="1.1" opacity=".7" />
        </pattern>
        <pattern id="cross" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="#2e2a25" strokeWidth="1" opacity=".6" />
          <line x1="0" y1="0" x2="6" y2="0" stroke="#2e2a25" strokeWidth="1" opacity=".6" />
        </pattern>
        <pattern id="hatchV" width="5" height="5" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="5" stroke="#2e2a25" strokeWidth=".9" opacity=".5" />
        </pattern>
        <pattern id="denim" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(-30)">
          <line x1="0" y1="0" x2="0" y2="4" stroke="#2e2a25" strokeWidth=".7" opacity=".45" />
        </pattern>
        <radialGradient id="sphereShade" cx="35%" cy="30%" r="75%">
          <stop offset="0" stopColor="#fbf7ef" />
          <stop offset=".35" stopColor="#d9d1c3" />
          <stop offset=".62" stopColor="#8f867a" />
          <stop offset=".8" stopColor="#4b453e" />
          <stop offset="1" stopColor="#6f675d" />
        </radialGradient>
        <radialGradient id="sphereMat" cx="35%" cy="30%" r="80%">
          <stop offset="0" stopColor="#e9e2d5" />
          <stop offset=".55" stopColor="#a69d90" />
          <stop offset=".85" stopColor="#5a534a" />
          <stop offset="1" stopColor="#6e665c" />
        </radialGradient>
        <radialGradient id="sphereGloss" cx="40%" cy="38%" r="70%">
          <stop offset="0" stopColor="#4d473f" />
          <stop offset=".7" stopColor="#26221e" />
          <stop offset="1" stopColor="#4a443c" />
        </radialGradient>
        <radialGradient id="castShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#2e2a25" stopOpacity=".75" />
          <stop offset="1" stopColor="#2e2a25" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="skinShade" cx="45%" cy="35%" r="70%">
          <stop offset="0" stopColor="#efe6d6" stopOpacity="0" />
          <stop offset=".7" stopColor="#8f867a" stopOpacity=".15" />
          <stop offset="1" stopColor="#4b453e" stopOpacity=".45" />
        </radialGradient>
        <linearGradient id="gradH" x1="0" x2="1">
          <stop offset="0" stopColor="#f6f1e7" />
          <stop offset="1" stopColor="#25211d" />
        </linearGradient>
        <linearGradient id="cylShade" x1="0" x2="1">
          <stop offset="0" stopColor="#8f867a" />
          <stop offset=".25" stopColor="#efe8da" />
          <stop offset=".6" stopColor="#a69d90" />
          <stop offset=".85" stopColor="#4b453e" />
          <stop offset="1" stopColor="#6f675d" />
        </linearGradient>
        <linearGradient id="foldShade" x1="0" x2="1">
          <stop offset="0" stopColor="#2e2a25" stopOpacity="0" />
          <stop offset=".5" stopColor="#2e2a25" stopOpacity=".45" />
          <stop offset="1" stopColor="#2e2a25" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="lipShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4b453e" stopOpacity=".7" />
          <stop offset="1" stopColor="#8f867a" stopOpacity=".25" />
        </linearGradient>
        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="#b4532a" />
        </marker>
        <marker id="arrowG" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="#5d7491" />
        </marker>
      </defs>
    </svg>
  );
}

/** Feuille de papier contenant une illustration. */
export function Paper({ viewBox, children, label }: { viewBox: string; children: ReactNode; label?: string }) {
  return (
    <svg className="paper" viewBox={viewBox} role="img" aria-label={label} preserveAspectRatio="xMidYMid meet">
      {children}
    </svg>
  );
}

/** Affiche le dessin à l'étape donnée : calques précédents en graphite, calque courant en sanguine. */
export function StepFigure({ drawing, step, showAll }: { drawing: Drawing; step: number; showAll?: boolean }) {
  const last = showAll ? drawing.layers.length - 1 : step;
  return (
    <Paper viewBox={drawing.viewBox} label={`Étape ${step + 1}`}>
      {drawing.layers.slice(0, last + 1).map((layer, i) => (
        <g key={i} className={!showAll && i === step ? 'new' : 'old'}>
          {layer}
        </g>
      ))}
      {showAll && drawing.annotations}
    </Paper>
  );
}

/** Lecteur d'étapes : illustration + navigation + texte. */
export function StepPlayer({
  drawing,
  steps
}: {
  drawing: Drawing;
  steps: { title: string; text: string }[];
}) {
  const [step, setStep] = useState(0);
  const [final, setFinal] = useState(false);
  const n = steps.length;
  const go = (i: number) => {
    setFinal(false);
    setStep(Math.max(0, Math.min(n - 1, i)));
  };
  return (
    <div className="player">
      <div className="fig">
        <StepFigure drawing={drawing} step={step} showAll={final} />
        <div className="fig-legend">
          {final ? (
            <span>Résultat final{drawing.annotations ? ' annoté' : ''}</span>
          ) : (
            <>
              <span className="dot dot-new" /> nouveau trait
              <span className="dot dot-old" /> étapes précédentes
            </>
          )}
        </div>
      </div>
      <div className="step-dots" role="tablist" aria-label="Étapes">
        {steps.map((s, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={!final && i === step}
            aria-label={`Étape ${i + 1} : ${s.title}`}
            className={!final && i === step ? 'on' : i < step || final ? 'done' : ''}
            onClick={() => go(i)}
          >
            {i + 1}
          </button>
        ))}
        <button className={final ? 'on final' : 'final'} onClick={() => setFinal(true)} aria-label="Résultat final">
          ★
        </button>
      </div>
      {final ? (
        <div className="step-text">
          <h4>Le dessin complet</h4>
          <p>Observe l'ensemble : les traits de construction (en bleu) restent légers et disparaissent presque sous le rendu final. Sur ton papier, gomme-les ou estompe-les avant les dernières valeurs.</p>
        </div>
      ) : (
        <div className="step-text">
          <h4>
            <span className="step-num">Étape {step + 1}/{n}</span> {steps[step].title}
          </h4>
          <p>{steps[step].text}</p>
        </div>
      )}
      <div className="step-nav">
        <button className="btn ghost" disabled={step === 0 && !final} onClick={() => (final ? go(n - 1) : go(step - 1))}>
          ← Précédente
        </button>
        {step < n - 1 && !final ? (
          <button className="btn" onClick={() => go(step + 1)}>
            Suivante →
          </button>
        ) : (
          <button className="btn" disabled={final} onClick={() => setFinal(true)}>
            Voir le résultat ★
          </button>
        )}
      </div>
    </div>
  );
}
