import React from 'react';
import { Phone, Mail, MapPin, MessageSquare } from 'lucide-react';
import { SocialLinks } from './SocialLinks';

interface Props { onOpenLegal: () => void; onOpenBooking: () => void; }

export function Footer({ onOpenLegal }: Props) {
  return <footer className="bg-[#07080a] text-gray-400 border-t border-white/10 pt-14 pb-28 sm:pb-12">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12">
        <div className="space-y-5">
          <a href="/" className="font-cinzel text-xl text-white tracking-[0.2em]">CLEAN<span className="text-[#25D366]">’R</span> AUTO</a>
          <p className="text-sm leading-relaxed">L’art du détail automobile. Un lavage soigné, à domicile ou sur votre lieu de travail. Là où vous êtes.</p>
          <a href="https://wa.me/33617200516" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-[#25D366] hover:text-white"><MessageSquare className="w-5 h-5" aria-hidden="true" />Écrivez-nous sur WhatsApp</a>
        </div>
        <nav aria-label="Navigation en bas de page">
          <h2 className="text-sm uppercase tracking-[0.2em] font-bold text-white mb-5">Navigation</h2>
          <ul className="space-y-3 text-sm">
            {[['/', 'Accueil'], ['/reservation/', 'Réserver un nettoyage'], ['/formules/', 'Formules & tarifs'], ['/options/', 'Options de lavage'], ['/realisations-avis/', 'Réalisations & avis'], ['/faq/', 'Questions fréquentes'], ['/contact/', 'Contact'], ['/nettoyage-interieur-voiture-orange/', 'Nettoyage intérieur à Orange']].map(([href, label]) => <li key={href}><a href={href} className="hover:text-[#25D366] transition-colors">{label}</a></li>)}
          </ul>
        </nav>
        <div>
          <h2 className="text-sm uppercase tracking-[0.2em] font-bold text-white mb-5">Contact & rendez-vous</h2>
          <div className="space-y-4 text-sm text-gray-300">
            <a href="tel:0617200516" className="flex items-center gap-3 hover:text-[#25D366]"><Phone className="w-5 h-5 shrink-0 text-[#25D366]" aria-hidden="true" />06 17 20 05 16</a>
            <a href="mailto:contact@cleanrauto.fr" className="flex items-center gap-3 hover:text-[#25D366]"><Mail className="w-5 h-5 shrink-0 text-[#25D366]" aria-hidden="true" /><span className="break-all">contact@cleanrauto.fr</span></a>
            <p className="flex items-start gap-3"><MapPin className="w-5 h-5 shrink-0 text-[#25D366] mt-0.5" aria-hidden="true" /><span>À domicile ou sur votre lieu de travail, à Orange et dans les alentours.</span></p>
            <p className="text-[#25D366] font-medium leading-relaxed">Du lundi au samedi : 08h00 – 19h00<br />(Sur rendez-vous)</p>
          </div>
          <a href="/reservation/" className="mt-6 flex items-center justify-center w-full green-gradient-bg text-black font-bold text-xs uppercase tracking-wider px-4 py-4 rounded-lg hover:brightness-110 transition-all text-center">Réserver un rendez-vous</a>
        </div>
      </div>
      <div className="border-t border-white/10 py-10">
        <h2 className="text-center text-xs sm:text-sm uppercase tracking-[0.2em] font-bold mb-7">Rejoignez Clean’R Auto sur les réseaux</h2>
        <SocialLinks />
      </div>
      <div className="border-t border-white/10 pt-7 flex flex-col lg:flex-row items-center justify-between gap-5 text-xs leading-relaxed text-center lg:text-left">
        <p>© {new Date().getFullYear()} Clean’R Auto — Tous droits réservés.<br />Service de detailing et soin automobile haut de gamme.</p>
        <div className="flex flex-wrap justify-center gap-5">
          <button onClick={onOpenLegal} className="underline hover:text-[#25D366] cursor-pointer">Mentions légales & CGV</button>
          <button onClick={onOpenLegal} className="underline hover:text-[#25D366] cursor-pointer">Politique de confidentialité</button>
        </div>
      </div>
    </div>
  </footer>;
}
