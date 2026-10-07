import React from 'react';
import before from '../assets/images/hyundai-i30-avant.webp';
import after from '../assets/images/hyundai-i30-apres.webp';

export function HyundaiRealisation() {
  return <section className="py-16 sm:py-20 bg-[#0b0c0e] border-b border-white/10" aria-labelledby="hyundai-title">
    <article className="max-w-5xl mx-auto px-5">
      <div className="max-w-3xl mb-8">
        <p className="text-[#25D366] uppercase tracking-[0.18em] text-xs font-semibold mb-3">Camaret-sur-Aigues · Pack Intégral Prestige</p>
        <h2 id="hyundai-title" className="font-serif-luxury text-3xl sm:text-4xl text-white">Hyundai i30 : un intérieur retrouvé</h2>
        <p className="text-gray-300 mt-5 leading-relaxed">Cette Hyundai i30 a bénéficié de notre Pack Intégral Prestige pour un nettoyage complet de l’intérieur et de l’extérieur, à Camaret-sur-Aigues, près d’Orange.</p>
        <p className="text-gray-400 mt-3 leading-relaxed">Ces photos montrent le résultat intérieur.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {[{src:before,label:'Avant',alt:'Habitacle de la Hyundai i30 avant nettoyage : poussière sur les plastiques et débris sur le tapis passager'},{src:after,label:'Après',alt:'Habitacle de la Hyundai i30 après le Pack Intégral Prestige à Camaret-sur-Aigues : plastiques, sièges et tapis nettoyés'}].map(({src,label,alt}) => <figure key={label} className="overflow-hidden rounded-2xl border border-white/15 bg-black">
          <div className="relative overflow-hidden" style={{aspectRatio:'710 / 947'}}>
            <img src={src} alt={alt} width="710" height="1536" loading="lazy" className="absolute w-full max-w-none" style={{top:'-31.05%',height:'162.20%'}} />
            <span className={'absolute top-4 left-4 rounded px-4 py-2 text-xs font-bold uppercase tracking-widest '+(label==='Après'?'bg-[#25D366] text-black':'bg-black/80 text-white border border-white/20')}>{label}</span>
          </div>
        </figure>)}
      </div>
      <div className="mt-7 flex flex-col sm:flex-row gap-5 sm:items-center sm:justify-between">
        <p className="text-sm text-gray-400">Clean’R Auto — Là où vous êtes.</p>
        <a href="/reservation/" className="green-gradient-bg rounded-lg px-6 py-4 text-black text-xs font-bold uppercase tracking-wider text-center">Réserver mon nettoyage</a>
      </div>
    </article>
  </section>;
}
