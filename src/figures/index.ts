import type { Figure } from '../types';
import { sushi } from './sushi';

/** Register new figures here. The first one is the default. Select with ?figure=<id>. */
export const figures: Figure[] = [sushi];

export function pickFigure(): Figure {
  const id = new URLSearchParams(window.location.search).get('figure');
  return figures.find((f) => f.id === id) ?? figures[0];
}
