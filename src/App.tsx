import { Component, useEffect, type ReactNode } from 'react';
import { HashRouter, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { ProgressProvider, useProgress } from './lib/progress';
import { SvgDefs } from './components/Figure';
import Home from './pages/Home';
import GuideCatalog from './pages/GuideCatalog';
import GuideViewer from './pages/GuideViewer';
import Learn from './pages/Learn';
import ModulePage from './pages/ModulePage';
import LessonPage from './pages/LessonPage';
import Exercises from './pages/Exercises';
import Drawings from './pages/Drawings';
import DrawingNew from './pages/DrawingNew';
import DrawingDetail from './pages/DrawingDetail';
import Compare from './pages/Compare';
import Progress from './pages/Progress';
import Tools from './pages/Tools';
import ToolPage from './tools/ToolPage';
import NotFound from './pages/NotFound';

const tabs = [
  { to: '/', label: 'Accueil', icon: 'M3 11 L12 4 L21 11 V20 H14 V14 H10 V20 H3 Z' },
  { to: '/dessiner', label: 'Dessiner', icon: 'M16 3 L21 8 L9 20 L3 21 L4 15 Z M14 5 L19 10' },
  { to: '/exercices', label: 'Exercices', icon: 'M12 8 V13 L15 15 M12 21 a8 8 0 1 0 0.01 0 M9 2 H15' },
  { to: '/dessins', label: 'Mes dessins', icon: 'M3 6 H21 V19 H3 Z M3 16 L9 11 L13 15 L16 12 L21 17 M15 9.5 a1.5 1.5 0 1 0 0.01 0' },
  { to: '/progression', label: 'Progression', icon: 'M4 20 V14 M10 20 V9 M16 20 V12 M22 20 V4 M2 20 H22' }
];

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Shell() {
  const { ready } = useProgress();
  if (!ready)
    return (
      <div className="boot-splash">
        <p>Chargement…</p>
      </div>
    );
  return (
    <>
      <ScrollTop />
      <main className="main">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dessiner" element={<GuideCatalog />} />
            <Route path="/dessiner/:guideId" element={<GuideViewer />} />
            <Route path="/apprendre" element={<Learn />} />
            <Route path="/apprendre/:moduleId" element={<ModulePage />} />
            <Route path="/lecon/:lessonId" element={<LessonPage />} />
            <Route path="/exercices" element={<Exercises />} />
            <Route path="/dessins" element={<Drawings />} />
            <Route path="/dessins/nouveau" element={<DrawingNew />} />
            <Route path="/dessins/comparer" element={<Compare />} />
            <Route path="/dessins/:id" element={<DrawingDetail />} />
            <Route path="/progression" element={<Progress />} />
            <Route path="/outils" element={<Tools />} />
            <Route path="/outils/:toolId" element={<ToolPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </main>
      <nav className="tabbar" aria-label="Navigation principale">
        {tabs.map((t) => (
          <NavLink key={t.to} to={t.to} end={t.to === '/'} className={({ isActive }) => (isActive ? 'tab on' : 'tab')}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d={t.icon} />
            </svg>
            <span>{t.label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}

class ErrorBoundary extends Component<{ children: ReactNode }, { error?: Error }> {
  state: { error?: Error } = {};
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidCatch(e: Error) {
    console.error(e);
  }
  render() {
    if (this.state.error)
      return (
        <div className="page">
          <h1>Une erreur est survenue</h1>
          <p className="muted">{this.state.error.message}</p>
          <p>Tes données sont conservées sur ton téléphone. Recharge l’application pour continuer.</p>
          <button className="btn" onClick={() => (window.location.hash = '#/', window.location.reload())}>
            Revenir à l’accueil
          </button>
        </div>
      );
    return this.props.children;
  }
}

export default function App() {
  return (
    <ProgressProvider>
      <SvgDefs />
      <HashRouter>
        <Shell />
      </HashRouter>
    </ProgressProvider>
  );
}
