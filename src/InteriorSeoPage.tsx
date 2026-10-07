import React, { useState } from 'react';
import { Award, ChevronDown, Clock, ShieldCheck, Sparkles, Wind, Droplets, BrushCleaning } from 'lucide-react';
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
import { HyundaiRealisation } from './components/HyundaiRealisation';

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

  const scrollToBooking = (formulaId?: string, _category?: Category, vehicleType?: VehicleType) => {
    if (formulaId) setSelectedFormulaId(formulaId);
    if (vehicleType) setSelectedVehicleType(vehicleType);
    const query = new URLSearchParams();
    if (formulaId) query.set('formule', formulaId);
    if (vehicleType) query.set('vehicule', vehicleType);
    window.location.assign('/reservation/' + (query.size ? '?' + query : ''));
  };

  const toggleAddon = (addonId: string) => setSelectedAddonIds((current) => current.includes(addonId) ? current.filter((id) => id !== addonId) : [...current, addonId]);

  return (
    <div className="min-h-screen bg-[#0b0c0e] text-[#e2e8f0] selection:bg-[#25D366] selection:text-black">
      <Header currentPath="/nettoyage-interieur-voiture-orange/" onOpenBooking={() => scrollToBooking()} />

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



        <section id="experience" className="py-24 bg-[#0e1015] border-y border-white/5 scroll-mt-24">
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

        <FormulasSection isInteriorLandingPage onSelectFormula={(id, category, vehicle) => scrollToBooking(id, category, vehicle)} />

        <HyundaiRealisation />

        <section className="py-16 sm:py-20 px-5 bg-[#0b0c0e]" aria-labelledby="interior-questions-title">
          <div className="max-w-4xl mx-auto">
            <p className="text-[#25D366] text-xs uppercase tracking-[0.18em] font-semibold mb-3">Préparer votre rendez-vous</p>
            <h2 id="interior-questions-title" className="font-serif-luxury text-3xl sm:text-4xl text-white mb-8">Vos questions sur le nettoyage intérieur</h2>
            <div className="space-y-4">
              <details open className="glass-card rounded-xl border border-white/10 p-5 sm:p-6">
                <summary className="text-white font-semibold cursor-pointer">Que comprend un nettoyage intérieur ?</summary>
                <p className="mt-4 text-sm text-gray-300 leading-relaxed">Toutes nos formules intérieures comprennent l’aspiration de l’habitacle et du coffre, le nettoyage des plastiques et des vitres. Confort Intérieur ajoute notamment le shampouinage des tapis et moquettes ; Prestige Intérieur comprend aussi le shampouinage des sièges. Consultez le détail de chaque formule pour choisir les soins adaptés à votre véhicule.</p>
              </details>
              <details className="glass-card rounded-xl border border-white/10 p-5 sm:p-6">
                <summary className="text-white font-semibold cursor-pointer">Quelle formule choisir pour ma voiture ?</summary>
                <p className="mt-4 text-sm text-gray-300 leading-relaxed">Essentiel Intérieur, dès 44 €, convient à l’entretien régulier. Confort Intérieur, dès 64 €, apporte un soin approfondi aux tapis et moquettes. Prestige Intérieur, dès 94 €, inclut le shampouinage des sièges et un traitement antibactérien et anti-odeurs. Ces tarifs correspondent à une citadine ; sélectionnez le gabarit de votre véhicule pour consulter son prix. Les options et les éventuels frais de déplacement s’ajoutent selon votre réservation.</p>
              </details>
              <details className="glass-card rounded-xl border border-white/10 p-5 sm:p-6">
                <summary className="text-white font-semibold cursor-pointer">Comment se déroule l’intervention à domicile ?</summary>
                <p className="mt-4 text-sm text-gray-300 leading-relaxed">Vous choisissez votre véhicule et votre formule, puis renseignez votre adresse et votre demande de rendez-vous. Nous convenons avec vous des modalités d’intervention à domicile ou sur votre lieu de travail, à Orange et dans les alentours. Prévoyez un accès au véhicule et retirez vos effets personnels avant le nettoyage. Vous pouvez nous contacter pour vérifier les conditions d’accès ou être conseillé sur la formule.</p>
              </details>
            </div>
            <div className="mt-7 flex flex-wrap gap-5 text-sm">
              <a href="/reservation/" className="text-[#25D366] underline underline-offset-4">Réserver mon nettoyage intérieur</a>
              <a href="/contact/" className="text-gray-300 underline underline-offset-4">Demander conseil</a>
            </div>
          </div>
        </section>


      </main>

      <Footer onOpenLegal={() => setIsLegalModalOpen(true)} onOpenBooking={() => scrollToBooking()} />
      <StickyMobileBar onOpenBooking={() => scrollToBooking()} />
      <LegalModal isOpen={isLegalModalOpen} onClose={() => setIsLegalModalOpen(false)} />
    </div>
  );
};
