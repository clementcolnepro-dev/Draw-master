import { useEffect, useRef, useState } from 'react';
import { usePhoto } from './usePhoto';

type Mode = 'original' | 'gauche' | 'droite';

export default function Symmetry() {
  const { url, picker, open } = usePhoto();
  const [axis, setAxis] = useState(50);
  const [mode, setMode] = useState<Mode>('original');
  const canvas = useRef<HTMLCanvasElement>(null);
  const [img, setImg] = useState<HTMLImageElement>();

  useEffect(() => {
    if (!url) return;
    const i = new Image();
    i.onload = () => setImg(i);
    i.src = url;
  }, [url]);

  useEffect(() => {
    const c = canvas.current;
    if (!c || !img) return;
    const scale = Math.min(1, 1400 / img.width);
    const w = img.width * scale, h = img.height * scale;
    const ax = (axis / 100) * w;
    const ctx = c.getContext('2d')!;
    if (mode === 'original') {
      c.width = w; c.height = h;
      ctx.drawImage(img, 0, 0, w, h);
      ctx.strokeStyle = '#c9a96a'; ctx.lineWidth = Math.max(2, w / 300); ctx.setLineDash([12, 8]);
      ctx.beginPath(); ctx.moveTo(ax, 0); ctx.lineTo(ax, h); ctx.stroke();
      return;
    }
    const half = mode === 'gauche' ? ax : w - ax;
    c.width = Math.max(1, half * 2); c.height = h;
    const sx = mode === 'gauche' ? 0 : ax;
    // moitié réelle
    ctx.drawImage(img, sx / scale, 0, half / scale, img.height, mode === 'gauche' ? 0 : half, 0, half, h);
    // moitié miroir
    ctx.save();
    ctx.translate(mode === 'gauche' ? half * 2 : half, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(img, sx / scale, 0, half / scale, img.height, 0, 0, half, h);
    ctx.restore();
  }, [img, axis, mode]);

  return (
    <>
      {picker}
      <p className="small muted">Charge une photo de visage de face. Place l’axe au milieu du visage (entre les yeux, sur l’arête du nez), puis compare les deux visages « parfaitement symétriques » : aucun visage réel ne l’est.</p>
      <button className="btn" onClick={open}>{url ? 'Changer de photo' : '🖼 Choisir une photo'}</button>
      {img && (
        <>
          <div className="chips">
            {(['original', 'gauche', 'droite'] as Mode[]).map((m) => (
              <button key={m} className={mode === m ? 'chip on' : 'chip'} onClick={() => setMode(m)}>
                {m === 'original' ? 'Original + axe' : m === 'gauche' ? 'Gauche + miroir' : 'Droite + miroir'}
              </button>
            ))}
          </div>
          <label className="form">
            Position de l’axe : {axis} %
            <input type="range" min={10} max={90} step={0.5} value={axis} onChange={(e) => setAxis(+e.target.value)} />
          </label>
          <canvas ref={canvas} className="tool-canvas" />
        </>
      )}
      <ul className="rules">
        <li>Utilise l’original avec l’axe pour vérifier les alignements (yeux, ailes du nez, coins de la bouche).</li>
        <li>Les deux versions miroir montrent l’asymétrie naturelle : c’est elle qui fait la ressemblance. Ne « corrige » pas ton modèle.</li>
        <li>Charge aussi la photo de ton propre dessin pour repérer un œil plus haut que l’autre.</li>
      </ul>
    </>
  );
}
