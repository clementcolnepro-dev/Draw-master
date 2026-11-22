import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent as RPointerEvent } from 'react';
import { books, flatPages, type Book as BookT } from '../content/livre';
import { BookFigure } from '../components/BookFigures';
import { useStudyTime } from '../lib/progress';
import '../styles/book.css';

const STORE = 'dm-livre';
type Saved = { book: string; pages: Record<string, number> };

function loadSaved(): Saved {
  try {
    const s = JSON.parse(localStorage.getItem(STORE) || 'null');
    if (s && typeof s.book === 'string') return { book: s.book, pages: s.pages || {} };
  } catch {
    /* stockage indisponible */
  }
  return { book: books[0].id, pages: {} };
}

/** Animation en cours : on tourne de la page `from` vers la page `to`, avancement p de 0 à 1. */
type Flip = { from: number; to: number; p: number };

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export default function Book() {
  useStudyTime();
  const [saved, setSaved] = useState(loadSaved);
  const book = books.find((b) => b.id === saved.book) || books[0];
  const pages = useMemo(() => flatPages(book), [book]);
  const total = pages.length + 1; // + couverture
  const idx = Math.min(saved.pages[book.id] || 0, total - 1);

  const [flip, setFlip] = useState<Flip | null>(null);
  const flipRef = useRef<Flip | null>(null);
  const raf = useRef(0);
  const stage = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; t: number; id: number; active: boolean; dx: number } | null>(null);

  const setFlipBoth = (f: Flip | null) => {
    flipRef.current = f;
    setFlip(f);
  };

  useEffect(() => {
    try {
      localStorage.setItem(STORE, JSON.stringify(saved));
    } catch {
      /* stockage indisponible */
    }
  }, [saved]);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const setPage = useCallback(
    (n: number) => setSaved((s) => ({ ...s, pages: { ...s.pages, [s.book]: n } })),
    []
  );

  /** Termine (target = 1) ou annule (target = 0) l'animation en cours. */
  const settle = useCallback(
    (target: 0 | 1) => {
      const f0 = flipRef.current;
      if (!f0) return;
      cancelAnimationFrame(raf.current);
      const start = performance.now();
      const from = f0.p;
      const dur = 120 + 480 * Math.abs(target - from);
      const tick = (now: number) => {
        const f = flipRef.current;
        if (!f) return;
        const t = Math.min(1, (now - start) / dur);
        const p = from + (target - from) * easeOut(t);
        if (t < 1) {
          setFlipBoth({ ...f, p });
          raf.current = requestAnimationFrame(tick);
        } else {
          if (target === 1) setPage(f.to);
          setFlipBoth(null);
        }
      };
      raf.current = requestAnimationFrame(tick);
    },
    [setPage]
  );

  const goTo = useCallback(
    (to: number) => {
      if (flipRef.current || to === idx || to < 0 || to >= total) return;
      setFlipBoth({ from: idx, to, p: 0 });
      settle(1);
    },
    [idx, total, settle]
  );

  const next = () => goTo(idx + 1);
  const prev = () => goTo(idx - 1);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goTo(idx + 1);
      if (e.key === 'ArrowLeft') goTo(idx - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goTo, idx]);

  const openBook = (b: BookT) => {
    if (flipRef.current || b.id === book.id) return;
    setSaved((s) => ({ ...s, book: b.id }));
  };

  // --- Tourner la page au doigt ---
  const onDown = (e: RPointerEvent) => {
    if (flipRef.current || (e.pointerType === 'mouse' && e.button !== 0)) return;
    drag.current = { x: e.clientX, y: e.clientY, t: performance.now(), id: e.pointerId, active: false, dx: 0 };
  };
  const onMove = (e: RPointerEvent) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    d.dx = dx;
    const w = (stage.current?.clientWidth || 360) * 0.9;
    if (!d.active) {
      if (Math.abs(dx) < 10 || Math.abs(dx) < Math.abs(dy)) return;
      const to = dx < 0 ? idx + 1 : idx - 1;
      if (to < 0 || to >= total) {
        drag.current = null;
        return;
      }
      d.active = true;
      stage.current?.setPointerCapture(e.pointerId);
      setFlipBoth({ from: idx, to, p: 0 });
    }
    const f = flipRef.current;
    if (!f) return;
    const forward = f.to > f.from;
    const p = Math.max(0, Math.min(1, (forward ? -dx : dx) / w));
    setFlipBoth({ ...f, p });
  };
  const onUp = (e: RPointerEvent) => {
    const d = drag.current;
    drag.current = null;
    if (!d || d.id !== e.pointerId) return;
    if (d.active) {
      const f = flipRef.current;
      if (!f) return;
      const forward = f.to > f.from;
      const v = (forward ? -d.dx : d.dx) / Math.max(1, performance.now() - d.t);
      settle(f.p > 0.35 || v > 0.6 ? 1 : 0);
      return;
    }
    // Simple toucher : bords de la page
    if ((e.target as HTMLElement).closest('button, a')) return;
    const r = stage.current?.getBoundingClientRect();
    if (!r) return;
    const x = (e.clientX - r.left) / r.width;
    if (x > 0.72) next();
    else if (x < 0.28) prev();
  };
  const onCancel = () => {
    const d = drag.current;
    drag.current = null;
    if (d?.active) settle(0);
  };

  // --- Rôles des feuilles ---
  // En avançant, la page courante (from) se soulève et découvre la suivante (to).
  // En reculant, la page précédente (to) revient se poser sur la page courante.
  type Role = { i: number; leaf: boolean; angle: number };
  let sheets: Role[];
  if (!flip) sheets = [{ i: idx, leaf: false, angle: 0 }];
  else if (flip.to > flip.from)
    sheets = [
      { i: flip.to, leaf: false, angle: 0 },
      { i: flip.from, leaf: true, angle: 180 * flip.p }
    ];
  else
    sheets = [
      { i: flip.from, leaf: false, angle: 0 },
      { i: flip.to, leaf: true, angle: 180 * (1 - flip.p) }
    ];
  const leafAngle = sheets.find((s) => s.leaf)?.angle ?? 180;
  const shownIdx = flip && flip.p > 0.5 ? flip.to : idx;
  const chapterOf = (i: number) => (i === 0 ? -1 : pages[i - 1].chapter);
  const firstOfChapter = book.chapters.map((_, ci) => pages.findIndex((x) => x.chapter === ci) + 1);
  const curChapter = chapterOf(shownIdx);

  return (
    <div className="page book-page">
      <div className="bk-tabs" role="tablist" aria-label="Livres">
        {books.map((b) => (
          <button key={b.id} role="tab" aria-selected={b.id === book.id} className={b.id === book.id ? 'on' : ''} onClick={() => openBook(b)}>
            {b.title}
          </button>
        ))}
      </div>

      <div className="bk-bar">
        <button className="bk-btn" onClick={() => goTo(0)} disabled={shownIdx === 0} aria-label="Sommaire">
          ☰
        </button>
        <span className="bk-where">{curChapter < 0 ? 'Sommaire' : book.chapters[curChapter].title}</span>
        <button className="bk-btn" onClick={prev} disabled={idx === 0} aria-label="Page précédente">
          ‹
        </button>
        <span className="bk-count">
          {shownIdx === 0 ? '—' : shownIdx} / {total - 1}
        </span>
        <button className="bk-btn" onClick={next} disabled={idx === total - 1} aria-label="Page suivante">
          ›
        </button>
      </div>

      <div
        ref={stage}
        className={flip ? 'bk-stage turning' : 'bk-stage'}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onCancel}
      >
        {sheets.map((s) => (
          <div
            key={`${book.id}-${s.i}`}
            className={s.leaf ? 'bk-sheet leaf' : 'bk-sheet'}
            style={s.leaf ? { transform: `rotateY(${-s.angle}deg)`, zIndex: 2 } : { zIndex: 1 }}
          >
            <div className="bk-face">
              {s.i === 0 ? (
                <Cover book={book} onOpen={(n) => goTo(n)} firsts={firstOfChapter} />
              ) : (
                <PageView book={book} n={s.i} total={total - 1} item={pages[s.i - 1]} />
              )}
              {s.leaf && <div className="bk-fold" style={{ opacity: Math.min(1, s.angle / 90) * 0.55 }} />}
              {!s.leaf && flip && <div className="bk-under" style={{ opacity: Math.max(0, 1 - leafAngle / 110) * 0.45 }} />}
            </div>
            {s.leaf && <div className="bk-verso" />}
          </div>
        ))}
      </div>

      <div className="bk-progress" aria-hidden="true">
        <div style={{ width: `${(shownIdx / (total - 1)) * 100}%` }} />
      </div>
      <p className="bk-hint">Fais glisser la page du doigt, ou touche ses bords.</p>
    </div>
  );
}

function Cover({ book, onOpen, firsts }: { book: BookT; onOpen: (n: number) => void; firsts: number[] }) {
  return (
    <div className="bk-cover">
      <div className="bk-kicker">Le carnet du dessinateur</div>
      <div className="bk-emblem" aria-hidden="true">
        {book.icon}
      </div>
      <h1>{book.title}</h1>
      <p className="bk-sub">{book.subtitle}</p>
      <div className="bk-toc">
        {book.chapters.map((c, i) => (
          <button key={c.title} onClick={() => onOpen(firsts[i])}>
            <span className="bk-toc-n">{String(i + 1).padStart(2, '0')}</span>
            <span className="bk-toc-t">{c.title}</span>
            <span className="bk-toc-p">p. {firsts[i]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function PageView({ book, n, total, item }: { book: BookT; n: number; total: number; item: ReturnType<typeof flatPages>[number] }) {
  const chapter = book.chapters[item.chapter];
  return (
    <article className="bk-lesson">
      <div className="bk-top">
        <span>
          {String(item.chapter + 1).padStart(2, '0')} · {chapter.title}
        </span>
        <span>{book.title}</span>
      </div>
      <h2>{item.page.title}</h2>
      <div className="bk-fig">
        <BookFigure fig={item.page.fig} />
      </div>
      <p className="bk-text">{item.page.text}</p>
      <div className="bk-foot">{n} / {total}</div>
    </article>
  );
}
