import React from 'react';
import { Phone, Mail, MapPin, MessageSquare, Shield, Instagram } from 'lucide-react';

const TikTokIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
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
            <a href="#" className="flex flex-col group">
              <span className="font-cinzel text-xl font-bold tracking-[0.25em] text-white group-hover:text-[#25D366] transition-colors">
                CLEAN<span className="text-[#25D366]">'R</span> AUTO
              </span>
            </a>

            <p className="text-xs text-gray-400 font-light leading-relaxed">
              L'art du détail automobile, lavage de précision pour tous types de véhicules. Un service premium, au plus proche de chez vous.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://www.instagram.com/clean.r.auto/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 hover:bg-[#25D366]/20 text-gray-300 hover:text-[#25D366] border border-white/10 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.tiktok.com/@cleanr.auto"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 hover:bg-[#25D366]/20 text-gray-300 hover:text-[#25D366] border border-white/10 transition-colors"
                aria-label="TikTok"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/33617200516"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 hover:bg-[#25D366]/20 text-gray-300 hover:text-[#25D366] border border-white/10 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Rapide */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-light">
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
              <li>• Piolenc, Courthézon, Sérignan</li>
              <li>• Camaret, Châteauneuf-du-Pape, Jonquières</li>
              <li>• Uchaux, Mornas, Bédarrides, Sorgues</li>
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
              className="mt-2 w-full green-gradient-bg text-black font-bold text-xs uppercase tracking-wider py-2.5 rounded shadow-lg hover:brightness-110 transition-all"
            >
              Réserver un rendez-vous
            </button>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 font-light gap-4">
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
