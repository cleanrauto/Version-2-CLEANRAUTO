import React from 'react';
import { Phone, Mail, MapPin, Shield } from 'lucide-react';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.13-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const TikTokIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.34 22a6.32 6.32 0 0 0 6.33-6.33V9a8.16 8.16 0 0 0 4.92 1.63V7.18a4.85 4.85 0 0 1-1-.49z" />
  </svg>
);

interface FooterProps {
  onOpenLegal: () => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal, onOpenBooking }) => {
  return (
    <footer className="bg-[#07080a] text-[#a0aab8] border-t border-white/10 pt-16 pb-28 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <a href="/" aria-label="Retour à l'accueil Clean'R Auto" className="flex flex-col group">
              <span className="font-cinzel text-xl font-bold tracking-[0.25em] text-white group-hover:text-[#25D366] transition-colors">
                CLEAN<span className="text-[#25D366]">'R</span> AUTO
              </span>
            </a>

            <p className="text-xs text-gray-400 font-light leading-relaxed">
              L'art du détail automobile, lavage de précision pour tous types de véhicules. Un service premium, au plus proche de chez vous.
            </p>
          </div>

          {/* Col 2: Navigation Rapide */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-light">
              <li>
                <a href="/" className="hover:text-[#25D366] transition-colors">
                  Accueil
                </a>
              </li>
              <li>
                <a href="/nettoyage-interieur-voiture-orange/" className="hover:text-[#25D366] transition-colors">
                  Nettoyage intérieur à Orange
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-[#25D366] transition-colors">
                  L'expérience Clean'R Auto
                </a>
              </li>
              <li>
                <a href="#formules" className="hover:text-[#25D366] transition-colors">
                  Nos Formules Intérieur & Extérieur
                </a>
              </li>
              <li>
                <a href="#options" className="hover:text-[#25D366] transition-colors">
                  Prestations Sur-Mesure & Céramique
                </a>
              </li>
              <li>
                <a href="#zone" className="hover:text-[#25D366] transition-colors">
                  Zone d'intervention (Orange 84)
                </a>
              </li>
              <li>
                <a href="#avis" className="hover:text-[#25D366] transition-colors">
                  Témoignages Clients
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#25D366] transition-colors">
                  Foire Aux Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Secteur & Villes */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
              Secteur d'intervention
            </h4>
            <ul className="space-y-1.5 text-xs text-gray-400 font-light">
              <li className="text-white font-medium">• Orange (84100) — Cœur de zone</li>
              <li>• Piolenc, Courthézon, Camaret</li>
              <li>• Châteauneuf-du-Pape, Uchaux, Mornas</li>
              <li>• Bédarrides, Sorgues, Vedène</li>
              <li className="text-gray-200 font-medium pt-1">• Majorations d'accès :</li>
              <li>• Carpentras, Avignon, Bollène (84)</li>
              <li>• Montélimar & Pierrelatte (26)</li>
              <li>• Bagnols-sur-Cèze & Roquemaure (30)</li>
            </ul>
          </div>

          {/* Col 4: Contact & Horaires */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
              Contact & Rendez-vous
            </h4>
            <div className="space-y-2 text-xs">
              <a href="tel:0617200516" className="flex items-center space-x-2 text-gray-300 hover:text-[#25D366] transition-colors">
                <Phone className="w-4 h-4 text-[#25D366]" />
                <span>06 17 20 05 16</span>
              </a>

              <a href="mailto:contact@cleanrauto.fr" className="flex items-center space-x-2 text-gray-300 hover:text-[#25D366] transition-colors">
                <Mail className="w-4 h-4 text-[#25D366]" />
                <span>contact@cleanrauto.fr</span>
              </a>

              <div className="flex items-start space-x-2 text-gray-300">
                <MapPin className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                <span>Intervention à domicile & entreprise à Orange, Vaucluse et départements voisins.</span>
              </div>

              <div className="pt-2 text-[11px] text-[#25D366] font-medium">
                Du Lundi au Samedi : 08h00 - 19h00 (Sur rendez-vous)
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="mt-2 w-full green-gradient-bg text-black font-bold text-xs uppercase tracking-wider py-2.5 rounded shadow-lg hover:brightness-110 transition-all cursor-pointer"
            >
              Réserver un rendez-vous
            </button>
          </div>
        </div>

        {/* Section Réseaux Sociaux Professionnelle & Interactive (Strictement tout en bas du site) */}
        <div className="pt-10 pb-8 border-t border-white/10 flex flex-col items-center justify-center text-center">
          <div className="flex items-center space-x-3 mb-6">
            <div className="h-[1px] w-8 sm:w-16 bg-white/10" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-gray-400 font-semibold">
              Rejoignez Clean'R Auto sur les réseaux
            </span>
            <div className="h-[1px] w-8 sm:w-16 bg-white/10" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 w-full max-w-md px-2">
            {/* Bouton Moderne Instagram avec Hover Zoom */}
            <a
              href="https://www.instagram.com/clean.r.auto/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-1 min-w-[170px] sm:min-w-[190px] flex items-center justify-center space-x-3.5 px-5 py-3 rounded-xl bg-[#111317] hover:bg-[#181a22] border border-white/10 hover:border-[#E1306C]/60 text-white shadow-md hover:shadow-[0_12px_28px_-4px_rgba(225,48,108,0.35)] transition-all duration-300 ease-out hover:scale-[1.08] active:scale-95 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white shadow-sm shrink-0 group-hover:shadow-[0_0_12px_rgba(225,48,108,0.6)] transition-shadow">
                <InstagramIcon className="w-4.5 h-4.5" />
              </div>
              <div className="text-left">
                <span className="block text-xs uppercase tracking-wider font-bold text-white group-hover:text-white transition-colors">
                  Instagram
                </span>
                <span className="block text-[11px] text-gray-400 group-hover:text-pink-300 transition-colors">
                  @clean.r.auto
                </span>
              </div>
            </a>

            {/* Bouton Moderne TikTok avec Hover Zoom */}
            <a
              href="https://www.tiktok.com/@cleanr.auto"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-1 min-w-[170px] sm:min-w-[190px] flex items-center justify-center space-x-3.5 px-5 py-3 rounded-xl bg-[#111317] hover:bg-[#181a22] border border-white/10 hover:border-[#00f2fe]/60 text-white shadow-md hover:shadow-[0_12px_28px_-4px_rgba(0,242,254,0.35)] transition-all duration-300 ease-out hover:scale-[1.08] active:scale-95 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-black border border-white/20 flex items-center justify-center text-white shadow-sm shrink-0 group-hover:border-[#00f2fe]/80 group-hover:shadow-[0_0_12px_rgba(0,242,254,0.5)] transition-all">
                <TikTokIcon className="w-4.5 h-4.5" />
              </div>
              <div className="text-left">
                <span className="block text-xs uppercase tracking-wider font-bold text-white group-hover:text-white transition-colors">
                  TikTok
                </span>
                <span className="block text-[11px] text-gray-400 group-hover:text-cyan-300 transition-colors">
                  @cleanr.auto
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 font-light gap-4">
          <div>
            © {new Date().getFullYear()} Clean'R Auto — Tous droits réservés. Service de detailing et soin automobile haut de gamme.
          </div>

          <div className="flex items-center space-x-6">
            <button
              onClick={onOpenLegal}
              className="hover:text-[#25D366] transition-colors underline cursor-pointer"
            >
              Mentions Légales & CGV
            </button>
            <button
              onClick={onOpenLegal}
              className="hover:text-[#25D366] transition-colors underline cursor-pointer"
            >
              Politique de Confidentialité
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
