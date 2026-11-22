import { useEffect, useRef, useState } from 'react';
import { useProgress } from '../lib/progress';
import { fetchPoses, getUnsplashKey, pingUnsplash, setUnsplashKey, type PosePhoto, type PoseSource } from '../lib/poses';

const SRC_STORE = 'dm-timer-source';
const sources: { id: PoseSource; label: string }[] = [
  { id: 'aucune', label: 'Mes photos' },
  { id: 'muybridge', label: 'Mouvement (Muybridge)' },
  { id: 'unsplash', label: 'Poses modernes' },
  { id: 'melange', label: 'Mélange' }
];
const loadSource = (): PoseSource => {
  try {
    const v = localStorage.getItem(SRC_STORE) as PoseSource | null;
    return v && sources.some((x) => x.id === v) ? v : 'muybridge';
  } catch {
    return 'muybridge';
  }
};

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
  const [source, setSource] = useState<PoseSource>(loadSource);
  const [photos, setPhotos] = useState<PosePhoto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [keyInput, setKeyInput] = useState('');
  const [hasKey, setHasKey] = useState(!!getUnsplashKey());
  const [mirror, setMirror] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(SRC_STORE, source);
    } catch {
      /* stockage indisponible */
    }
  }, [source]);

  const photo = photos.length ? photos[(round - 1) % photos.length] : undefined;
  const nextPhoto = photos.length ? photos[round % photos.length] : undefined;
  useEffect(() => {
    if (photo && state === 'run') pingUnsplash(photo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photo?.url, state === 'run']);

  // Précharge la photo suivante pendant le croquis en cours.
  useEffect(() => {
    if (nextPhoto) new Image().src = nextPhoto.url;
  }, [nextPhoto?.url]);

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

  const start = async () => {
    setError('');
    // Le son doit être activé pendant le toucher, avant tout chargement (exigence iOS).
    try {
      audio.current = audio.current || new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      audio.current.resume();
    } catch {
      audio.current = null;
    }
    let list: PosePhoto[] = [];
    if (source !== 'aucune') {
      setLoading(true);
      try {
        list = await fetchPoses(source, rounds);
        if (!list.length) throw new Error('Aucune photo trouvée. Vérifie ta connexion et réessaie.');
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Impossible de charger les photos.');
        return;
      } finally {
        setLoading(false);
      }
      // Attend la première photo pour ne pas lancer le chrono sur un écran vide.
      await new Promise<void>((res) => {
        const img = new Image();
        img.onload = img.onerror = () => res();
        img.src = list[0].url;
        setTimeout(res, 6000);
      });
    }
    setPhotos(list);
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
        {error && <div className="card notice error-notice">{error}</div>}
        {state === 'done' && <div className="card notice">Séance terminée : {rounds} croquis de {label(dur)}. Elle a été ajoutée à tes exercices.</div>}
        <div className="form">
          <span className="label">Modèles</span>
          <div className="chips">
            {sources.map((x) => (
              <button key={x.id} className={source === x.id ? 'chip on' : 'chip'} onClick={() => setSource(x.id)}>
                {x.label}
              </button>
            ))}
          </div>
          <p className="tiny muted">
            {source === 'aucune' && 'Ouvre tes propres photos de poses dans une autre application ou sur un autre écran.'}
            {source === 'muybridge' && 'Photos d’Eadweard Muybridge (1887) : hommes et femmes en mouvement, souvent nus. Domaine public, idéal pour l’anatomie et le geste.'}
            {source === 'unsplash' && 'Photos modernes de poses (danse, sport, mode), habillées, en couleur.'}
            {source === 'melange' && (hasKey ? 'Moitié Muybridge, moitié photos modernes, dans un ordre aléatoire.' : 'Sans clé Unsplash, seules les photos de Muybridge sont utilisées.')}
          </p>
          {(source === 'unsplash' || source === 'melange') &&
            (hasKey ? (
              <button
                className="btn ghost small"
                onClick={() => {
                  setUnsplashKey('');
                  setHasKey(false);
                }}
              >
                Changer la clé Unsplash
              </button>
            ) : (
              <label>
                Clé d’accès Unsplash (Access Key)
                <div className="row">
                  <input value={keyInput} onChange={(e) => setKeyInput(e.target.value)} placeholder="Colle ta clé ici" autoCapitalize="off" autoCorrect="off" spellCheck={false} style={{ flex: 1 }} />
                  <button
                    className="btn small"
                    disabled={keyInput.trim().length < 20}
                    onClick={() => {
                      setUnsplashKey(keyInput);
                      setHasKey(true);
                      setKeyInput('');
                    }}
                  >
                    OK
                  </button>
                </div>
                <span className="tiny">Gratuite sur unsplash.com/developers. Elle reste sur ce téléphone.</span>
              </label>
            ))}
        </div>
        <p className="small muted">Pour chaque pose : ligne d’action d’abord, puis grandes masses. Pas de détails !</p>
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
        <button className="btn wide" onClick={start} disabled={loading}>
          {loading ? 'Chargement des photos…' : '▶ Démarrer'}
        </button>
      </>
    );

  if (photos.length) {
    const shown = state === 'rest' ? nextPhoto : photo;
    return (
      <div className={`timer pose ${state}`}>
        <div className="pose-head">
          <span>
            Croquis {round} / {rounds}
          </span>
          <span className="pose-clock" aria-live="polite">
            {mm}:{ss}
          </span>
          <span>{state === 'rest' ? 'Pause' : state === 'paused' ? 'En pause' : 'Dessine !'}</span>
        </div>
        <div className={state === 'rest' ? 'pose-photo resting' : 'pose-photo'} onClick={() => setMirror((m) => !m)}>
          {shown && <img src={shown.url} alt="Modèle à dessiner" style={mirror ? { transform: 'scaleX(-1)' } : undefined} />}
          {state === 'rest' && <div className="pose-next">Pose suivante dans {left} s</div>}
        </div>
        {shown && (
          <a className="pose-credit" href={shown.link} target="_blank" rel="noreferrer">
            {shown.credit}
          </a>
        )}
        <div className="row center">
          <button className="btn ghost small" onClick={togglePause}>
            {state === 'paused' ? '▶ Reprendre' : '❚❚ Pause'}
          </button>
          <button className="btn ghost small" onClick={skip}>
            ⏭ Suivant
          </button>
          <button className="btn danger small" onClick={stop}>
            ■ Arrêter
          </button>
        </div>
        <p className="tiny muted">Touche la photo pour la retourner en miroir.</p>
      </div>
    );
  }

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
