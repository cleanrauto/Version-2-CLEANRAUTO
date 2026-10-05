import React from 'react';
interface Props { onOpenLegal: () => void; onOpenBooking: () => void; }
export function Footer({onOpenLegal}: Props) {
 return <footer className="bg-[#07080a] border-t border-white/10 px-5 pt-9 pb-28 sm:pb-9 text-gray-400">
  <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5 text-center text-xs">
   <a href="/" className="font-cinzel text-white tracking-widest">CLEAN<span className="text-[#25D366]">'R</span> AUTO</a>
   <nav className="flex flex-wrap justify-center gap-5"><a href="/formules/">Formules</a><a href="/realisations-avis/">Réalisations & Avis</a><a href="/contact/">Contact</a><a href="/nettoyage-interieur-voiture-orange/">Nettoyage intérieur à Orange</a></nav>
   <button onClick={onOpenLegal} className="underline cursor-pointer">Mentions légales & CGV</button>
  </div>
 </footer>;
}
