import React from 'react';
import { Clock, ShieldCheck, Gem, CheckCircle2, Sparkles } from 'lucide-react';
import whiteLeatherImgPath from '../assets/images/lhd_white_interior_closeup_1785748121657.jpg';

export const PillarsExperience: React.FC = () => {
  const pillars = [
    {
      icon: Clock,
      number: '01',
      title: 'Gain de temps absolu',
      subtitle: 'Sur votre lieu de travail ou à domicile',
      description:
        "Plus besoin de vous déplacer ni d'attendre en station. Notre unité mobile de detailing se déplace à Orange et dans son agglomération. Nous intervenons directement pendant votre journée de travail ou à votre domicile.",
      highlights: ['Unité mobile totalement équipée', 'Intervention discrète sur parking privé ou villa', 'Gestion souple de votre emploi du temps'],
    },
    {
      icon: ShieldCheck,
      number: '02',
      title: 'Chimie de Précision & Mat d\'Origine',
      subtitle: 'Régénération des cuirs, alcantara & plastiques',
      description:
        'Nous appliquons des traitements de précision pour raviver la souplesse d’origine de vos selleries sans aucun film gras ou luisant. Les cuirs retrouvent leur aspect mat usine et bénéficient d\'un bouclier anti-UV longue durée.',
      highlights: ['Effet mat usine & zéro brillance grasse', 'Protection anti-UV contre le dessèchement', 'Action antistatique repousse poussière'],
    },
    {
      icon: Gem,
      number: '03',
      title: 'Finition perfectionniste & Discrétion',
      subtitle: 'Le souci du détail poussé à son paroxysme',
      description:
        'Chaque véhicule est unique. De la calandre jusqu’au moindre bouton de console centrale, nous appliquons une rigueur d’orfèvre avec pinceaux en crin de cheval, microfibres haute densité et nettoyants spécifiques.',
      highlights: ['Contrôle qualité rigoureux post-soin', 'Intervention en toute confidentialité', 'Rendu d\'exception garanti'],
    },
  ];

  return (
    <section id="experience" className="py-24 bg-[#0e1015] relative overflow-hidden border-t border-white/5">
      {/* Background Subtle Accent Lines */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#25D366]/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs uppercase tracking-[0.25em] text-[#25D366] font-semibold block mb-3">
            Savoir-Faire & Philosophie
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-light text-white tracking-tight mb-6">
            L' expérience <span className="green-gradient-text italic font-normal">Clean'R Auto</span>
          </h2>
          <div className="w-16 h-[1px] bg-[#25D366]/50 mx-auto mb-6" />
          <p className="text-sm sm:text-base text-[#a0aab8] font-light leading-relaxed">
            Inspiré par la sobriété et le raffinement des grandes maisons de luxe, Clean'R Auto réinvente le soin automobile à domicile avec un engagement de qualité sans concession.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.number}
                className="glass-card rounded-xl p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#25D366]/50 group relative hover:-translate-y-1"
              >
                <div>
                  {/* Top Bar with Number and Icon */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="p-3.5 rounded-lg bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-cinzel text-2xl font-bold text-white/20 group-hover:text-[#25D366]/40 transition-colors">
                      {pillar.number}
                    </span>
                  </div>

                  {/* Titles */}
                  <h3 className="font-serif-luxury text-2xl font-medium text-white mb-2 group-hover:text-[#25D366] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs uppercase tracking-wider text-[#25D366] font-medium mb-4">
                    {pillar.subtitle}
                  </p>
                  <p className="text-xs text-[#a0aab8] leading-relaxed mb-6 font-light">
                    {pillar.description}
                  </p>
                </div>

                {/* Highlights List */}
                <ul className="space-y-2.5 pt-4 border-t border-white/10">
                  {pillar.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-xs text-[#cbd5e1]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Interior Feature Spotlight Card */}
        <div className="glass-card rounded-2xl p-6 sm:p-10 border border-[#25D366]/25 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gradient-to-r from-[#12151c] to-[#0e1015]">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#25D366]/10 text-[#25D366] text-xs font-medium border border-[#25D366]/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Detailing sur-mesure à Orange (84) & ses alentours</span>
            </div>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-white">
              Soin des matériaux nobles : cuirs, plastiques & finitions d'exception.
            </h3>
            <p className="text-xs sm:text-sm text-[#a0aab8] leading-relaxed font-light">
              Les intérieurs haut de gamme associent cuirs délicats, surfaces laquées piano-black et plastiques travaillés. Clean'R Auto applique des formules nourrissantes et dégraissantes professionnelles pour régénérer la souplesse du cuir, éliminer le sébum luisant des volants et apporter une protection anti-UV durable tout en restaurant le rendu mat usine.
            </p>
            <div className="pt-2 flex flex-wrap gap-3 text-xs text-[#e2e8f0]">
              <div className="flex items-center space-x-2 bg-white/5 px-3 py-2 rounded border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
                <span>Restauration du Toucher Mat Usine (Anti-Luisant)</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/5 px-3 py-2 rounded border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
                <span>Hydratation Cuir & Élimination du Dessèchement</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/5 px-3 py-2 rounded border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
                <span>Protection Anti-UV & Effet Anti-Statique</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative rounded-xl overflow-hidden border border-[#25D366]/30 group">
            <img
              src={whiteLeatherImgPath}
              alt="Intérieur cuir blanc véhicule de prestige soin detailing Clean'R Auto"
              className="w-full h-64 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
              <span className="text-xs font-cinzel tracking-widest text-[#25D366] uppercase">
                Habitacle Cuir Blanc Prestige • Rendu Mat Usine
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
