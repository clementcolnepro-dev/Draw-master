import { useParams } from 'react-router-dom';
import { tools } from './registry';
import { PageHeader } from '../components/ui';
import { useStudyTime } from '../lib/progress';
import NotFound from '../pages/NotFound';
import FaceGrid from './FaceGrid';
import BodyGrid from './BodyGrid';
import Values from './Values';
import Light from './Light';
import Symmetry from './Symmetry';
import Viewer from './Viewer';
import Timer from './Timer';
import Glossary from './Glossary';

const map: Record<string, () => JSX.Element> = {
  'grille-visage': FaceGrid,
  'grille-corps': BodyGrid,
  valeurs: Values,
  lumiere: Light,
  symetrie: Symmetry,
  visualiseur: Viewer,
  minuteur: Timer,
  glossaire: Glossary
};

export default function ToolPage() {
  const { toolId } = useParams();
  useStudyTime();
  const t = tools.find((x) => x.id === toolId);
  const C = toolId ? map[toolId] : undefined;
  if (!t || !C) return <NotFound />;
  return (
    <div className="page">
      <PageHeader title={t.title} kicker="Outil" back="/outils" />
      <C />
    </div>
  );
}
