// Outil de vérification : rend chaque leçon (étapes + final) en SVG -> PNG pour relecture visuelle.
// Usage : npx tsx scripts/render-figures.tsx <dossier-sortie> [filtre-id]
import { renderToStaticMarkup } from 'react-dom/server';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { guideCategories } from '../src/content/guides';
import { SvgDefs, StepFigure } from '../src/components/Figure';

const out = process.argv[2] || '/tmp/render';
const filter = process.argv[3] || '';
mkdirSync(out, { recursive: true });
const css = readFileSync(new URL('../src/styles/figures.css', import.meta.url), 'utf8');
const defs = renderToStaticMarkup(<SvgDefs />).replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
for (const c of guideCategories) for (const g of c.guides) { const l = { id: g.id, drawing: { viewBox: g.viewBox, layers: g.layers } } as any;
  if (filter && !l.id.startsWith(filter)) continue;
  const [, , w, h] = l.drawing.viewBox.split(' ').map(Number);
  const n = l.drawing.layers.length;
  const cols = Math.min(4, n + 1), rows = Math.ceil((n + 1) / cols);
  const S = 2; const cw = w, ch = h + 16;
  let body = '';
  for (let i = 0; i <= n; i++) {
    const fin = i === n;
    let svg = renderToStaticMarkup(<StepFigure drawing={l.drawing} step={fin ? n - 1 : i} showAll={fin} />);
    svg = svg.replace('<svg', `<svg x="${(i % cols) * cw}" y="${Math.floor(i / cols) * ch + 14}" width="${w}" height="${h}"`);
    svg = svg.replace(/(<svg[^>]*>)/, `$1<rect x="-1000" y="-1000" width="3000" height="3000" fill="#f3ede2"/>`);
    body += `<text x="${(i % cols) * cw + 4}" y="${Math.floor(i / cols) * ch + 11}" font-size="10" fill="#000">${fin ? 'final' : 'étape ' + (i + 1)}</text>` + svg;
  }
  const full = `<svg xmlns="http://www.w3.org/2000/svg" width="${cols * cw * S}" height="${rows * ch * S}" viewBox="0 0 ${cols * cw} ${rows * ch}"><style>${css.split('\n').filter(l => !l.startsWith('svg.paper {')).join('\n').replace(/svg\.paper/g, '.paper')}</style><defs>${defs}</defs><rect width="100%" height="100%" fill="#fff"/>${body.replace(/class="paper"/g, 'class="paper"')}</svg>`;
  writeFileSync(`${out}/${l.id}.svg`, full);
  execSync(`rsvg-convert ${out}/${l.id}.svg -o ${out}/${l.id}.png`);
  console.log('ok', l.id);
}
