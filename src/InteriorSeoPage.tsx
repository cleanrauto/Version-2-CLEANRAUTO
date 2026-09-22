import React, { useState } from 'react';
import { Award, ChevronDown, ChevronsLeftRight, Clock, ShieldCheck, Sparkles, Wind, Droplets, BrushCleaning } from 'lucide-react';
import { Header } from './components/Header';
import { PillarsExperience } from './components/PillarsExperience';
import { FormulasSection } from './components/FormulasSection';
import { AddonsSection } from './components/AddonsSection';
import { InterventionZone } from './components/InterventionZone';
import { BookingSection } from './components/BookingSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { LegalModal } from './components/LegalModal';
import { StickyMobileBar } from './components/StickyMobileBar';
import { VehicleType, Category } from './types';
import heroInterior from './assets/images/lhd_white_interior_closeup_1785748121657.jpg';
import beforeImage from './assets/images/porsche-cayenne-avant.webp';
import afterImage from './assets/images/porsche-cayenne-apres.webp';

const processSteps = [
  { icon: Wind, title: 'Aspiration minutieuse', text: "Habitacle, coffre, tapis, sièges et recoins difficiles d'accès." },
  { icon: BrushCleaning, title: 'Nettoyage des surfaces', text: 'Plastiques, volant, pédalier, vitres et encadrements de portes.' },
  { icon: Droplets, title: 'Shampouinage ciblé', text: 'Sièges, tapis et moquettes traités à l’injecteur-extracteur selon la formule.' },
  { icon: ShieldCheck, title: 'Finitions et contrôle', text: 'Protection satinée, traitement anti-odeurs et vérification complète du résultat.' },
];

export const InteriorSeoPage: React.FC = () => {
  const [selectedFormulaId, setSelectedFormulaId] = useState('int-prestige');
  const [selectedVehicleType, setSelectedVehicleType] = useState<VehicleType>('citadine');
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);
  const [selectedCityName, setSelectedCityName] = useState('Orange');
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [comparisonPosition, setComparisonPosition] = useState(50);

  const scrollToBooking = (formulaId?: string, _category?: Category, vehicleType?: VehicleType) => {
    if (formulaId) setSelectedFormulaId(formulaId);
    if (vehicleType) setSelectedVehicleType(vehicleType);
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleAddon = (addonId: string) => setSelectedAddonIds((current) => current.includes(addonId) ? current.filter((id) => id !== addonId) : [...current, addonId]);

  return (
    <div className="min-h-screen bg-[#0b0c0e] text-[#e2e8f0] selection:bg-[#25D366] selection:text-black">
      <Header onOpenBooking={() => scrollToBooking()} />

      <main>
        <section className="relative min-h-screen pt-20 sm:pt-24 pb-12 flex flex-col justify-center overflow-hidden bg-[#0b0c0e]">
          <div className="absolute inset-0 z-0">
            <img src={heroInterior} alt="Nettoyage intérieur automobile professionnel à Orange" className="w-full h-full object-cover object-center scale-105 brightness-75 contrast-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0e] via-[#0b0c0e]/60 to-[#0b0c0e]/35" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c0e]/85 via-transparent to-[#0b0c0e]/65" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0b0c0e]/20 to-[#0b0c0e]" />
          </div>
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#25D366]/10 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
            <span className="text-xs uppercase tracking-[0.25em] text-[#25D366] font-semibold mb-5">Clean'R Auto • Orange 84100</span>
            <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-light text-white tracking-tight leading-[1.12] mb-6 max-w-5xl">
              Nettoyage intérieur de voiture <span className="green-gradient-text">à domicile à Orange</span>
            </h1>
            <p className="text-base sm:text-lg text-[#cbd5e1] font-light max-w-3xl leading-relaxed mb-10">
              De l’entretien régulier à la rénovation complète : aspiration, plastiques, vitres, sièges et moquettes traités directement chez vous ou sur votre lieu de travail.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-16">
              <button onClick={() => scrollToBooking('int-prestige')} className="w-full sm:w-auto green-gradient-bg text-black font-semibold text-xs sm:text-sm uppercase tracking-[0.18em] px-8 py-4 rounded shadow-2xl hover:brightness-110 transition-all flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4" />Réserver un nettoyage intérieur
              </button>
              <a href="#formules" className="w-full sm:w-auto text-xs sm:text-sm uppercase tracking-[0.18em] font-medium text-white px-8 py-4 rounded bg-white/5 hover:bg-white/10 border border-white/15 hover:border-[#25D366]/50 transition-all text-center backdrop-blur-sm">Découvrir les formules</a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl pt-8 border-t border-white/10">
              {[
                [ShieldCheck, 'Intervention mobile', 'Domicile & lieu de travail'],
                [Award, 'Satisfaction client', 'Note Google 5.0 ★'],
                [Clock, 'Formules adaptées', 'Dès 44 €'],
              ].map(([Icon, label, value]) => (
                <div key={String(label)} className="flex items-center gap-3 p-3.5 rounded-lg bg-black/40 border border-white/5 backdrop-blur-sm text-left">
                  <div className="p-2.5 rounded-md bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20"><Icon className="w-5 h-5" /></div>
                  <div><span className="block text-xs uppercase tracking-wider text-gray-300 font-medium">{String(label)}</span><span className="text-sm font-semibold text-white">{String(value)}</span></div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative z-10 text-center mt-12"><a href="#experience" className="inline-flex flex-col items-center text-[10px] uppercase tracking-[0.2em] text-gray-400 hover:text-[#25D366]"><span className="mb-1">Découvrir la prestation</span><ChevronDown className="w-4 h-4 animate-bounce text-[#25D366]" /></a></div>
        </section>

        <PillarsExperience />

        <section className="py-24 bg-[#0e1015] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs uppercase tracking-[0.25em] text-[#25D366] font-semibold block mb-3">Une méthode complète</span>
              <h2 className="font-serif-luxury text-3xl sm:text-5xl font-light text-white">Chaque détail de votre <span className="green-gradient-text">habitacle</span></h2>
              <p className="mt-6 text-gray-300 leading-relaxed">Nous adaptons les produits, les accessoires et le niveau de traitement aux matériaux et à l’état réel de votre véhicule.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {processSteps.map(({ icon: Icon, title, text }, index) => (
                <article key={title} className="glass-card rounded-xl p-6 border border-white/10 hover:border-[#25D366]/40 transition-colors">
                  <div className="flex items-center justify-between mb-5"><div className="p-3 rounded-lg bg-[#25D366]/10 border border-[#25D366]/20"><Icon className="w-5 h-5 text-[#25D366]" /></div><span className="text-3xl font-serif-luxury text-white/10">0{index + 1}</span></div>
                  <h3 className="text-base font-semibold text-white mb-2">{title}</h3><p className="text-sm text-gray-300 leading-relaxed">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <FormulasSection onSelectFormula={(id, category, vehicle) => scrollToBooking(id, category, vehicle)} />
        <AddonsSection selectedAddonIds={selectedAddonIds} onToggleAddon={toggleAddon} onOpenBookingWithOptions={() => scrollToBooking()} />

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

        <InterventionZone onSelectCity={(city) => { setSelectedCityName(city); scrollToBooking(); }} />
        <BookingSection initialFormulaId={selectedFormulaId} initialVehicleType={selectedVehicleType} initialAddonIds={selectedAddonIds} initialCityName={selectedCityName} />
        <ReviewsSection />
        <FaqSection />
      </main>

      <Footer onOpenLegal={() => setIsLegalModalOpen(true)} onOpenBooking={() => scrollToBooking()} />
      <StickyMobileBar onOpenBooking={() => scrollToBooking()} />
      <LegalModal isOpen={isLegalModalOpen} onClose={() => setIsLegalModalOpen(false)} />
    </div>
  );
};
