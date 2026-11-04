import { useState } from 'react';
import { Paper } from '../components/Figure';

const zones = [
  ['Point lumineux', 'Le plus clair, face à la source, vers l’œil.'],
  ['Lumière', 'Zone directement éclairée.'],
  ['Demi-teinte', 'La surface commence à se détourner.'],
  ['Ligne de terminaison', 'Frontière lumière / ombre.'],
  ['Ombre propre', 'Zone qui ne reçoit pas la lumière ; ombre de cœur juste après la terminaison.'],
  ['Lumière réfléchie', 'Éclaircit le bord de l’ombre ; reste plus sombre que la demi-teinte.'],
  ['Ombre portée', 'Projetée sur le sol, opposée à la lumière ; occlusion au contact.']
];

export default function Light() {
  const [angle, setAngle] = useState(135);
  const [height, setHeight] = useState(55);
  const a = (angle * Math.PI) / 180;
  const k = 0.25 + (height / 100) * 0.3;
  const hx = 50 + Math.cos(a) * 32 * (1 - height / 160);
  const hy = 50 - Math.sin(a) * 32 * (1 - height / 160);
  const sx = 150 - Math.cos(a) * (95 - height * 0.6);
  return (
    <>
      <div className="fig">
        <Paper viewBox="0 0 300 220">
          <defs>
            <radialGradient id="liveSphere" cx={`${hx}%`} cy={`${hy}%`} r="78%">
              <stop offset="0" stopColor="#fffdf8" />
              <stop offset=".06" stopColor="#f3ede2" />
              <stop offset={k + 0.12} stopColor="#c9c0b2" />
              <stop offset={k + 0.3} stopColor="#5a534a" />
              <stop offset={k + 0.38} stopColor="#3a352f" />
              <stop offset="1" stopColor="#6f675d" />
            </radialGradient>
          </defs>
          <line x1="0" y1="180" x2="300" y2="180" stroke="#2e2a25" opacity=".25" />
          <ellipse cx={sx} cy="182" rx={60 + (100 - height) * 0.5} ry="11" fill="url(#castShadow)" />
          <ellipse cx="150" cy="180" rx="26" ry="3.5" fill="#25211d" />
          <circle cx="150" cy="110" r="70" fill="url(#liveSphere)" />
          <g transform={`translate(${150 + Math.cos(a) * 125} ${110 - Math.sin(a) * 95})`}>
            <circle r="9" fill="#f5c15a" stroke="#b4532a" />
          </g>
        </Paper>
      </div>
      <div className="form">
        <label>
          Direction de la lumière : {angle}°
          <input type="range" min={0} max={360} value={angle} onChange={(e) => setAngle(+e.target.value)} />
        </label>
        <label>
          Hauteur / frontalité : {height} %
          <input type="range" min={0} max={100} value={height} onChange={(e) => setHeight(+e.target.value)} />
        </label>
      </div>
      <p className="small muted">Déplace la lumière et observe : le point lumineux se déplace vers la source, l’ombre propre et l’ombre portée passent du côté opposé. Plus la lumière est frontale, plus la zone d’ombre se réduit.</p>
      <ol className="zones">
        {zones.map(([t, d]) => (
          <li key={t}>
            <b>{t}</b> — {d}
          </li>
        ))}
      </ol>
    </>
  );
}
