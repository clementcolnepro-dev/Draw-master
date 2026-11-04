import { Link } from 'react-router-dom';
export default function NotFound() {
  return (
    <div className="page">
      <h1>Page introuvable</h1>
      <p className="muted">Cette page n’existe pas (ou plus).</p>
      <Link className="btn" to="/">Retour à l’accueil</Link>
    </div>
  );
}
