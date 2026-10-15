import { readFile, writeFile, rm } from 'node:fs/promises';
import { render } from '../.prerender/prerender.js';

for (const [file, page] of [["dist/index.html", "/"], ["dist/nettoyage-interieur-voiture-orange/index.html", "interior"], ["dist/formules/index.html", "/formules/"], ["dist/options/index.html", "/options/"], ["dist/realisations-avis/index.html", "/realisations-avis/"], ["dist/faq/index.html", "/faq/"], ["dist/contact/index.html", "/contact/"], ["dist/reservation/index.html", "/reservation/"]]) {
  const html = await readFile(file, 'utf8');
  const marker = '<div id="root"></div>';
  if (!html.includes(marker)) throw new Error(`Missing React root in ${file}`);
  const shareImage = 'https://cleanrauto.fr/images/cleanrauto-partage.jpg';
  const socialTags = `
    <meta property="og:image" content="${shareImage}" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:width" content="1376" />
    <meta property="og:image:height" content="768" />
    <meta property="og:image:alt" content="Voiture de sport — visuel d’accueil Clean’R Auto" />
    <meta name="twitter:image" content="${shareImage}" />
    <meta name="twitter:image:alt" content="Voiture de sport — visuel d’accueil Clean’R Auto" />
  `;
  await writeFile(file, html.replace('</head>', `${socialTags}</head>`).replace(marker, `<div id="root">${render(page)}</div>`));
  console.log(`Pre-rendered ${file}`);
}
await rm('.prerender', { recursive: true, force: true });
