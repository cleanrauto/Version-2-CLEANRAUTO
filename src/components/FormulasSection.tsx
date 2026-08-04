import React, { useState } from 'react';
import { FORMULAS, VEHICLE_OPTIONS } from '../data/packages';
import { Category, VehicleType, Formula } from '../types';
import { CheckCircle2, Clock, Sparkles, Car, Shield, ArrowRight, HelpCircle } from 'lucide-react';

interface FormulasSectionProps {
  onSelectFormula: (formulaId: string, category: Category, vehicleType: VehicleType) => void;
}

export const FormulasSection: React.FC<FormulasSectionProps> = ({ onSelectFormula }) => {
  const [activeCategory, setActiveCategory] = useState<Category>('interieur');
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType>('citadine');

  const filteredFormulas = FORMULAS.filter((f) => f.category === activeCategory);

  return (
    <section id="formules" className="py-24 bg-[#0b0c0e] relative overflow-hidden">
      {/* Background Subtle Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#25D366]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#25D366] font-semibold block mb-3">
            Tarifs & Prestations Clés en Main
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-light text-white tracking-tight mb-6">
            Nos <span className="green-gradient-text font-normal">Formules de Soin</span>
          </h2>
          <div className="w-16 h-[1px] bg-[#25D366]/50 mx-auto mb-6" />
          <p className="text-sm sm:text-base text-[#a0aab8] font-light leading-relaxed">
            Choisissez votre catégorie d'intervention et adaptez le tarif au gabarit de votre véhicule pour une transparence totale.
          </p>
        </div>

        {/* Vehicle Type Switcher Bar */}
        <div className="glass-card rounded-2xl p-4 sm:p-6 mb-12 border border-[#25D366]/20 max-w-4xl mx-auto">
          <div className="flex items-center space-x-2 mb-3">
            <Car className="w-4 h-4 text-[#25D366]" />
            <span className="text-xs uppercase tracking-wider font-semibold text-gray-300">
              1. Sélectionnez le gabarit de votre véhicule :
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {VEHICLE_OPTIONS.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelectedVehicle(v.id)}
                className={`p-3 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                  selectedVehicle === v.id
                    ? 'bg-[#25D366]/15 border-[#25D366] shadow-lg shadow-[#25D366]/10'
                    : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
                }`}
              >
                <div>
                  <span
                    className={`block text-xs font-bold ${
                      selectedVehicle === v.id ? 'text-[#25D366]' : 'text-white'
                    }`}
                  >
                    {v.label}
                  </span>
                  <span className="text-[10px] text-gray-400 block line-clamp-1 mt-0.5 font-light">
                    {v.examples}
                  </span>
                </div>
                {selectedVehicle === v.id && (
                  <span className="mt-2 text-[9px] uppercase tracking-widest text-[#25D366] font-semibold flex items-center space-x-1">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    <span>Sélectionné</span>
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main Category Tabs (Intérieur vs Extérieur vs Pack Intégral) */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-xl bg-[#12151c] border border-[#25D366]/30 shadow-2xl">
            <button
              onClick={() => setActiveCategory('interieur')}
              className={`px-6 py-3 rounded-lg text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-300 flex items-center space-x-2 cursor-pointer ${
                activeCategory === 'interieur'
                  ? 'green-gradient-bg text-black shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>Formules Intérieur</span>
            </button>

            <button
              onClick={() => setActiveCategory('exterieur')}
              className={`px-6 py-3 rounded-lg text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-300 flex items-center space-x-2 cursor-pointer ${
                activeCategory === 'exterieur'
                  ? 'green-gradient-bg text-black shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>Formules Extérieur</span>
            </button>

            <button
              onClick={() => setActiveCategory('pack_integral')}
              className={`px-6 py-3 rounded-lg text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-300 flex items-center space-x-2 cursor-pointer ${
                activeCategory === 'pack_integral'
                  ? 'green-gradient-bg text-black shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pack Intégral (Combo)</span>
            </button>
          </div>
        </div>

        {/* Formula Cards Grid */}
        <div
          className={`grid grid-cols-1 ${
            filteredFormulas.length === 1
              ? 'max-w-2xl mx-auto'
              : filteredFormulas.length === 2
              ? 'md:grid-cols-2 max-w-4xl mx-auto gap-8'
              : 'md:grid-cols-3 gap-8'
          }`}
        >
          {filteredFormulas.map((formula) => {
            const currentPrice = formula.prices[selectedVehicle];

            return (
              <div
                key={formula.id}
                className={`glass-card rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 relative group ${
                  formula.isPopular
                    ? 'border-[#25D366] shadow-2xl shadow-[#25D366]/10 bg-gradient-to-b from-[#181c26] to-[#0e1015]'
                    : 'hover:border-[#25D366]/40'
                }`}
              >
                {/* Popular Badge */}
                {formula.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 green-gradient-bg text-black px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg flex items-center space-x-1">
                    <Sparkles className="w-3 h-3 text-black" />
                    <span>Formule la plus demandée</span>
                  </div>
                )}

                <div>
                  {/* Category Tagline & Name */}
                  <div className="flex items-center justify-between mb-2 pt-2">
                    <span className="text-[10px] uppercase tracking-widest text-[#25D366] font-bold">
                      {formula.badge || 'Haute Qualité'}
                    </span>
                    <div className="flex items-center space-x-1 text-gray-400 text-xs">
                      <Clock className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>{formula.duration}</span>
                    </div>
                  </div>

                  <h3 className="font-serif-luxury text-2xl font-bold text-white mb-2 group-hover:text-[#25D366] transition-colors">
                    {formula.name}
                  </h3>

                  <p className="text-xs text-[#a0aab8] font-light leading-relaxed mb-6 italic">
                    "{formula.tagline}"
                  </p>

                  {/* Pricing Box */}
                  <div className="py-4 border-y border-white/10 mb-6 bg-white/5 rounded-xl px-4 flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-gray-400 block font-medium">
                        Tarif ({VEHICLE_OPTIONS.find((v) => v.id === selectedVehicle)?.label})
                      </span>
                      <span className="text-xs text-[#25D366]">Intervention mobile incluse</span>
                    </div>
                    <div className="text-right">
                      {typeof currentPrice === 'number' ? (
                        <>
                          <span className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white">
                            {currentPrice}€
                          </span>
                          <span className="text-xs text-gray-400 font-light block">TTC</span>
                        </>
                      ) : (
                        <span className="font-serif-luxury text-xl font-bold text-[#25D366] uppercase tracking-wider">
                          Sur Devis
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bullet Points List */}
                  <div className="space-y-3 mb-8">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-300 block mb-2">
                      Prestations incluses :
                    </span>
                    {formula.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start space-x-2.5 text-xs text-[#cbd5e1] leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <button
                  onClick={() => onSelectFormula(formula.id, formula.category, selectedVehicle)}
                  className={`w-full py-3.5 px-4 rounded-xl text-xs uppercase tracking-[0.15em] font-semibold transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer ${
                    formula.isPopular
                      ? 'green-gradient-bg text-black hover:brightness-110 shadow-lg'
                      : 'bg-white/10 hover:bg-[#25D366] text-white hover:text-black border border-white/15'
                  }`}
                >
                  <span>Réserver cette formule</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom Note on Custom Requests */}
        <div className="mt-12 text-center text-xs text-gray-400 font-light max-w-xl mx-auto flex items-center justify-center space-x-2">
          <HelpCircle className="w-4 h-4 text-[#25D366] shrink-0" />
          <span>
            Véhicule très encrassé, poils d'animaux abondants ou taches profondes ? Un supplément de 20€ à 40€ peut être appliqué après diagnostic visuel.
          </span>
        </div>
      </div>
    </section>
  );
};
