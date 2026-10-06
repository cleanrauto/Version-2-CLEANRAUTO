import React, { useState } from 'react';
import { ChevronsLeftRight } from 'lucide-react';
import beforeImage from '../assets/images/porsche-cayenne-avant.webp';
import afterImage from '../assets/images/porsche-cayenne-apres.webp';
import exteriorBeforeImage from '../assets/images/porsche-exterieur-avant.webp';
import exteriorAfterImage from '../assets/images/porsche-exterieur-apres.webp';

function Comparison({ exterior = false }: { exterior?: boolean }) {
  const [position, setPosition] = useState(50);
  const title = exterior ? 'Nettoyage extérieur' : 'Nettoyage intérieur';

  return <figure className="min-w-0">
    <h3 className="font-serif-luxury text-2xl sm:text-3xl text-white text-center mb-5">{title}</h3>
    <div style={{ aspectRatio: exterior ? '1086 / 1433' : '946 / 1213' }} className="relative overflow-hidden rounded-2xl border border-[#25D366]/30 bg-black shadow-2xl shadow-black/40 select-none">
      <img src={exterior ? exteriorAfterImage : afterImage}
        alt={exterior ? "Porsche Cayenne après nettoyage extérieur, plaque masquée" : "Intérieur d'une Porsche Cayenne après nettoyage par Clean'R Auto à Orange"}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={exterior ? { transform: 'translate(-0.814%, 1.117%) matrix(1.076823, -0.01145, 0.004927, 1.073153, 0, 0)', transformOrigin: 'center' } : undefined} loading="lazy" draggable={false} />

      <div className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }} aria-hidden="true">
        <img src={exterior ? exteriorBeforeImage : beforeImage} alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={exterior ? { transform: 'scale(1.08)', transformOrigin: 'center' } : undefined} loading="lazy" draggable={false} />
      </div>

      <span className="absolute left-4 top-4 z-20 bg-black/80 border border-white/20 px-4 py-2 rounded text-xs uppercase tracking-widest text-white">Avant</span>
      <span className="absolute right-4 top-4 z-20 bg-[#25D366] px-4 py-2 rounded text-xs uppercase tracking-widest font-bold text-black">Après</span>



      <div className="absolute inset-y-0 z-10 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.8)] pointer-events-none"
        style={{ left: `${position}%` }} aria-hidden="true">
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#25D366] border-4 border-white text-black flex items-center justify-center shadow-xl">
          <ChevronsLeftRight className="w-6 h-6" />
        </span>
      </div>

      <input type="range" min="0" max="100" value={position}
        onChange={event => setPosition(Number(event.target.value))}
        className="absolute inset-0 z-30 w-full h-full opacity-0 cursor-ew-resize focus-visible:opacity-100 focus-visible:h-8 focus-visible:top-auto focus-visible:bottom-2"
        aria-label={exterior ? 'Déplacer le curseur pour comparer les deux vues extérieures de la Porsche Cayenne' : "Déplacer le curseur pour comparer l'intérieur de la Porsche avant et après le nettoyage"} />
    </div>
    <figcaption className="mt-4 text-center text-xs sm:text-sm text-gray-400">
      {exterior ? 'Faites glisser le curseur. Illustration : visuel après retouché, plaques masquées.' : 'Faites glisser le curseur pour comparer les deux vues. Illustration : visuel avant retouché.'}
    </figcaption>
  </figure>;
}

export function BeforeAfter() {
  return <section className="py-24 bg-[#0b0c0e] border-y border-white/5">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="text-xs uppercase tracking-[0.25em] text-[#25D366] font-semibold block mb-3">Résultat visible</span>
        <h2 className="font-serif-luxury text-3xl sm:text-5xl font-light text-white">Avant / <span className="green-gradient-text">Après</span></h2>
        <p className="mt-5 text-gray-300">Découvrez nos réalisations de nettoyage intérieur et extérieur.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
        <Comparison />
        <Comparison exterior />
      </div>
    </div>
  </section>;
}
