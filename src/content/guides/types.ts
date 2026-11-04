import type { ReactNode } from 'react';

export interface GuideStep {
  title: string;
  /** Astuce courte, facultative (affichée sous l'image). */
  tip?: string;
}

export interface Guide {
  id: string;
  title: string;
  level: 'Facile' | 'Moyen' | 'Avancé';
  viewBox: string;
  /** Un calque par étape ; l'étape n affiche les calques 0..n. */
  layers: ReactNode[];
  /** Variante en images : une image par étape (chemins relatifs à public/). Remplace les calques. */
  images?: string[];
  /** Auteur des dessins, si ce n'est pas un schéma généré. */
  author?: string;
  steps: GuideStep[];
}

export interface GuideCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  guides: Guide[];
}
