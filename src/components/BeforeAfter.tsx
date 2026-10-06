import React, { useState } from 'react';
import { ChevronsLeftRight } from 'lucide-react';
import beforeImage from '../assets/images/porsche-cayenne-avant.webp';
import afterImage from '../assets/images/porsche-cayenne-apres.webp';
export function BeforeAfter() {
 const [comparisonPosition, setComparisonPosition] = useState(50);
 return (
        <section className="py-24 bg-[#0b0c0e] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14"><span className="text-xs uppercase tracking-[0.25em] text-[#25D366] font-semibold block mb-3">Résultat visible</span><h2 className="font-serif-luxury text-3xl sm:text-5xl font-light text-white">Avant / <span className="green-gradient-text">Après</span></h2><p className="mt-5 text-gray-300">Un nettoyage approfondi pour retrouver un intérieur propre, sain et agréable.</p></div>
            <div className="max-w-3xl mx-auto">
              <figure className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-[#25D366]/30 bg-black shadow-2xl shadow-black/40 select-none">
                <img
                  src={afterImage}
                  alt="Intérieur d'une Porsche Cayenne après nettoyage par Clean'R Auto à Orange"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  loading="lazy"
                  draggable={false}
                />

                <div
                  className="absolute inset-0 overflow-hidden pointer-events-none"
                  style={{ clipPath: `inset(0 ${100 - comparisonPosition}% 0 0)` }}
                  aria-hidden="true"
                >
                  <img
                    src={beforeImage}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    draggable={false}
                  />
                </div>

                <span className="absolute left-4 top-4 z-20 bg-black/80 border border-white/20 px-4 py-2 rounded text-xs uppercase tracking-widest text-white">Avant</span>
                <span className="absolute right-4 top-4 z-20 bg-[#25D366] px-4 py-2 rounded text-xs uppercase tracking-widest font-bold text-black">Après</span>

                <div
                  className="absolute inset-y-0 z-20 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.8)] pointer-events-none"
                  style={{ left: `${comparisonPosition}%` }}
                  aria-hidden="true"
                >
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#25D366] border-4 border-white text-black flex items-center justify-center shadow-xl">
                    <ChevronsLeftRight className="w-6 h-6" />
                  </span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={comparisonPosition}
                  onChange={(event) => setComparisonPosition(Number(event.target.value))}
                  className="absolute inset-0 z-30 w-full h-full opacity-0 cursor-ew-resize"
                  aria-label="Déplacer le curseur pour comparer l'intérieur de la Porsche avant et après le nettoyage"
                />
              </figure>
              <figcaption className="mt-4 text-center text-xs sm:text-sm text-gray-400">
                Faites glisser le curseur pour découvrir le résultat sur cette Porsche Cayenne.
              </figcaption>
            </div>
          </div>
        </section>

 );
}
