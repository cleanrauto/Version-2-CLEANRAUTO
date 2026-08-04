import React from 'react';
import { Sparkles, MapPin, ChevronDown, ShieldCheck, Clock, Award } from 'lucide-react';
import heroImgPath from '../assets/images/cleanr_hero_detail_1785743158188.jpg';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative min-h-screen pt-28 pb-16 flex flex-col justify-center overflow-hidden bg-[#0b0c0e]">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImgPath}
          alt="Lavage et soin automobile haut de gamme Clean'R Auto"
          className="w-full h-full object-cover object-center scale-105 filter brightness-75 contrast-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0e] via-[#0b0c0e]/75 to-[#0b0c0e]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0b0c0e]/40 to-[#0b0c0e]" />
      </div>

      {/* Decorative Subtle Green Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#25D366]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Badge Haute Qualité */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-black/60 border border-[#25D366]/40 backdrop-blur-md mb-6 animate-fadeIn">
          <MapPin className="w-3.5 h-3.5 text-[#25D366]" />
          <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#e2e8f0]">
            Intervention à domicile à <strong className="text-[#25D366]">Orange, Vaucluse</strong> et départements voisins.
          </span>
        </div>

        {/* Titre Raffiné avec Serif */}
        <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-light text-white tracking-tight leading-[1.15] mb-6 max-w-4xl">
          L' excellence du <span className="green-gradient-text italic font-normal">soin automobile</span>
          <span className="block mt-2 sm:mt-3">Là où vous êtes</span>
        </h1>

        {/* Sous-titre Épuré */}
        <p className="text-base sm:text-xl text-[#cbd5e1] font-light max-w-2xl leading-relaxed mb-10">
          Clean'R Auto sublime et protège votre véhicule d'exception. Service de detailing mobile haut de gamme et sur-mesure à Orange (84) et ses alentours.
        </p>

        {/* Boutons d'Action */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-16">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto green-gradient-bg text-black font-semibold text-xs sm:text-sm uppercase tracking-[0.18em] px-8 py-4 rounded shadow-2xl hover:brightness-110 transition-all duration-300 flex items-center justify-center space-x-2 group cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-black group-hover:rotate-12 transition-transform" />
            <span>Réserver un soin</span>
          </button>

          <a
            href="#formules"
            className="w-full sm:w-auto text-xs sm:text-sm uppercase tracking-[0.18em] font-medium text-white px-8 py-4 rounded bg-white/5 hover:bg-white/10 border border-white/15 hover:border-[#25D366]/50 transition-all duration-300 text-center backdrop-blur-sm"
          >
            Découvrir nos Formules
          </a>
        </div>

        {/* Reassurance Grid / Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl pt-8 border-t border-white/10">
          <div className="flex items-center space-x-3 p-3.5 rounded-lg bg-black/40 border border-white/5 backdrop-blur-sm">
            <div className="p-2.5 rounded-md bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="block text-xs uppercase tracking-wider text-gray-400 font-medium">Unité Mobile Équipée</span>
              <span className="text-sm font-semibold text-white">Matériel & Soins Sur-Mesure</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3.5 rounded-lg bg-black/40 border border-white/5 backdrop-blur-sm">
            <div className="p-2.5 rounded-md bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20">
              <Award className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="block text-xs uppercase tracking-wider text-gray-400 font-medium">Exigence Haute Couture</span>
              <span className="text-sm font-semibold text-white">Satisfaction Client 5.0 ★</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3.5 rounded-lg bg-black/40 border border-white/5 backdrop-blur-sm">
            <div className="p-2.5 rounded-md bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="block text-xs uppercase tracking-wider text-gray-400 font-medium">Gain de Temps Total</span>
              <span className="text-sm font-semibold text-white">Domicile & Lieu de Travail</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="relative z-10 text-center mt-12">
        <a
          href="#experience"
          className="inline-flex flex-col items-center text-xs uppercase tracking-[0.2em] text-gray-400 hover:text-[#25D366] transition-colors"
        >
          <span className="mb-1 text-[10px]">Explorer l'expérience</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#25D366]" />
        </a>
      </div>
    </section>
  );
};
