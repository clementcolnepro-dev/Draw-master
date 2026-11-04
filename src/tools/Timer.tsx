import { useEffect, useRef, useState } from 'react';
import { useProgress } from '../lib/progress';

const presets = [30, 60, 120, 300, 600];
const label = (s: number) => (s < 60 ? `${s} s` : `${s / 60} min`);

type WakeLockSentinelLike = { release: () => Promise<void> };

function beep(ctx: AudioContext | null, f = 880, d = 0.18) {
  if (!ctx) return;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.frequency.value = f;
  g.gain.setValueAtTime(0.25, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + d);
  o.connect(g).connect(ctx.destination);
  o.start();
  o.stop(ctx.currentTime + d);
}

export default function Timer() {
  const { logExercise } = useProgress();
  const [dur, setDur] = useState(60);
  const [rounds, setRounds] = useState(10);
  const [pause, setPause] = useState(5);
  const [state, setState] = useState<'idle' | 'run' | 'rest' | 'paused' | 'done'>('idle');
  const [round, setRound] = useState(1);
  const [left, setLeft] = useState(0);
  const prevState = useRef<'run' | 'rest'>('run');
  const audio = useRef<AudioContext | null>(null);
  const wake = useRef<WakeLockSentinelLike | null>(null);
  const end = useRef(0);

  const lock = async () => {
    try {
      wake.current = await (navigator as unknown as { wakeLock?: { request: (t: string) => Promise<WakeLockSentinelLike> } }).wakeLock?.request('screen') ?? null;
    } catch {
      /* non disponible */
    }
  };
  const unlock = () => {
    wake.current?.release().catch(() => {});
    wake.current = null;
  };

  const start = () => {
    try {
      audio.current = audio.current || new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      audio.current.resume();
    } catch {
      audio.current = null;
    }
    setRound(1);
    setLeft(dur);
    end.current = Date.now() + dur * 1000;
    setState('run');
    beep(audio.current, 660);
    lock();
  };

  useEffect(() => {
    if (state !== 'run' && state !== 'rest') return;
    const t = setInterval(() => {
      const l = Math.max(0, Math.ceil((end.current - Date.now()) / 1000));
      setLeft(l);
      if (l <= 3 && l > 0 && state === 'run') beep(audio.current, 520, 0.08);
      if (l === 0) {
        if (state === 'run') {
          navigator.vibrate?.(200);
          beep(audio.current, 990, 0.35);
          if (round >= rounds) {
            setState('done');
            unlock();
            logExercise('croquis', `Croquis rapides : ${rounds} × ${label(dur)}`);
          } else if (pause > 0) {
            end.current = Date.now() + pause * 1000;
            setLeft(pause);
            setState('rest');
          } else {
            setRound((r) => r + 1);
            end.current = Date.now() + dur * 1000;
            setLeft(dur);
          }
        } else {
          setRound((r) => r + 1);
          end.current = Date.now() + dur * 1000;
          setLeft(dur);
          setState('run');
          beep(audio.current, 660);
        }
      }
    }, 200);
    return () => clearInterval(t);
  }, [state, round, rounds, dur, pause, logExercise]);

  useEffect(() => () => unlock(), []);

  const togglePause = () => {
    if (state === 'paused') {
      end.current = Date.now() + left * 1000;
      setState(prevState.current);
    } else if (state === 'run' || state === 'rest') {
      prevState.current = state;
      setState('paused');
    }
  };
  const skip = () => {
    end.current = Date.now();
  };
  const stop = () => {
    setState('idle');
    unlock();
  };

  const mm = Math.floor(left / 60);
  const ss = String(left % 60).padStart(2, '0');

  if (state === 'idle' || state === 'done')
    return (
      <>
        {state === 'done' && <div className="card notice">Séance terminée : {rounds} croquis de {label(dur)}. Elle a été ajoutée à tes exercices.</div>}
        <p className="small muted">
          Ouvre des photos de poses (sport, danse, modèles vivants) dans une autre application ou sur un autre écran. Pour chaque pose : ligne d’action d’abord, puis grandes masses. Pas de
          détails !
        </p>
        <div className="form">
          <span className="label">Durée par croquis</span>
          <div className="chips">
            {presets.map((p) => (
              <button key={p} className={dur === p ? 'chip on' : 'chip'} onClick={() => setDur(p)}>
                {label(p)}
              </button>
            ))}
          </div>
          <label>
            Nombre de croquis : {rounds}
            <input type="range" min={1} max={30} value={rounds} onChange={(e) => setRounds(+e.target.value)} />
          </label>
          <label>
            Pause entre deux croquis : {pause} s
            <input type="range" min={0} max={30} value={pause} onChange={(e) => setPause(+e.target.value)} />
          </label>
        </div>
        <p className="tiny muted">Durée totale ≈ {Math.round((rounds * dur + (rounds - 1) * pause) / 60)} min</p>
        <button className="btn wide" onClick={start}>
          ▶ Démarrer
        </button>
      </>
    );

  return (
    <div className={`timer ${state}`}>
      <div className="tiny">
        Croquis {round} / {rounds}
      </div>
      <div className="clock" aria-live="polite">
        {mm}:{ss}
      </div>
      <div className="tiny">{state === 'rest' ? 'Pause — change de photo' : state === 'paused' ? 'En pause' : 'Dessine !'}</div>
      <div className="row center">
        <button className="btn ghost" onClick={togglePause}>
          {state === 'paused' ? '▶ Reprendre' : '❚❚ Pause'}
        </button>
        <button className="btn ghost" onClick={skip}>
          ⏭ Suivant
        </button>
        <button className="btn danger" onClick={stop}>
          ■ Arrêter
        </button>
      </div>
    </div>
  );
}
