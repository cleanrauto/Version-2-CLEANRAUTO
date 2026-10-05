import { readFile, writeFile, rm } from 'node:fs/promises';
import { render } from '../.prerender/prerender.js';

for (const [file, page] of [["dist/index.html", "/"], ["dist/nettoyage-interieur-voiture-orange/index.html", "interior"], ["dist/formules/index.html", "/formules/"], ["dist/options/index.html", "/options/"], ["dist/realisations-avis/index.html", "/realisations-avis/"], ["dist/faq/index.html", "/faq/"], ["dist/contact/index.html", "/contact/"]]) {
  const html = await readFile(file, 'utf8');
  const marker = '<div id="root"></div>';
  if (!html.includes(marker)) throw new Error(`Missing React root in ${file}`);
  await writeFile(file, html.replace(marker, `<div id="root">${render(page)}</div>`));
  console.log(`Pre-rendered ${file}`);
}
await rm('.prerender', { recursive: true, force: true });
