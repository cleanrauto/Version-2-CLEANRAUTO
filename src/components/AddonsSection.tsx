import React from 'react';
import { ADDONS } from '../data/addons';
import { ShieldCheck, Sparkles, Droplets, Disc, Eye, Cpu, Sun, Wind, Plus, Check } from 'lucide-react';

interface AddonsSectionProps {
  selectedAddonIds: string[];
  onToggleAddon: (addonId: string) => void;
  onOpenBookingWithOptions: () => void;
}

export const AddonsSection: React.FC<AddonsSectionProps> = ({
  selectedAddonIds,
  onToggleAddon,
  onOpenBookingWithOptions,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[#25D366]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#25D366]" />;
      case 'Droplets':
        return <Droplets className="w-5 h-5 text-[#25D366]" />;
      case 'Disc':
        return <Disc className="w-5 h-5 text-[#25D366]" />;
      case 'Eye':
        return <Eye className="w-5 h-5 text-[#25D366]" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-[#25D366]" />;
      case 'Sun':
        return <Sun className="w-5 h-5 text-[#25D366]" />;
      case 'Wind':
        return <Wind className="w-5 h-5 text-[#25D366]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#25D366]" />;
    }
  };

  return (
    <section id="options" className="py-24 bg-[#0e1015] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#25D366] font-semibold block mb-3">
            Soin Haute Réponse
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-light text-white tracking-tight mb-6">
            Options & <span className="green-gradient-text italic font-normal">Prestations Sur-Mesure</span>
          </h2>
          <div className="w-16 h-[1px] bg-[#25D366]/50 mx-auto mb-6" />
          <p className="text-sm sm:text-base text-[#a0aab8] font-light leading-relaxed">
            Combinez ces suppléments ciblés à votre formule principale : shampouinage de sièges, supplément extérieur ou élimination des poils d'animaux.
          </p>
        </div>

        {/* Addons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {ADDONS.map((addon) => {
            const isSelected = selectedAddonIds.includes(addon.id);

            return (
              <div
                key={addon.id}
                onClick={() => onToggleAddon(addon.id)}
                className={`glass-card rounded-xl p-6 border transition-all duration-300 flex flex-col justify-between cursor-pointer group ${
                  isSelected
                    ? 'border-[#25D366] bg-[#25D366]/10 shadow-xl shadow-[#25D366]/10'
                    : 'border-white/10 hover:border-[#25D366]/40 hover:bg-white/5'
                }`}
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-lg bg-[#25D366]/10 border border-[#25D366]/20">
                      {getIcon(addon.icon)}
                    </div>

                    <div className="flex items-center space-x-2">
                      {addon.badge && (
                        <span className="text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-[#25D366]/20 text-[#25D366]">
                          {addon.badge}
                        </span>
                      )}
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                          isSelected ? 'green-gradient-bg text-black' : 'bg-white/10 text-gray-400'
                        }`}
                      >
                        {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Plus className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-base font-semibold text-white mb-1 group-hover:text-[#25D366] transition-colors">
                    {addon.name}
                  </h3>
                  <p className="text-xs text-[#25D366] font-medium mb-3">{addon.tagline}</p>
                  <p className="text-xs text-[#a0aab8] font-light leading-relaxed mb-4">
                    {addon.description}
                  </p>
                </div>

                {/* Pricing */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">
                    Option / Supp.
                  </span>
                  <div className="text-right">
                    <span className="font-serif-luxury text-xl font-bold text-[#25D366]">+{addon.price}€</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Options Summary Bar */}
        {selectedAddonIds.length > 0 && (
          <div className="glass-card rounded-2xl p-6 border border-[#25D366] bg-[#12151c] max-w-3xl mx-auto text-center animate-fadeIn shadow-2xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left">
                <span className="text-xs uppercase tracking-widest text-[#25D366] font-bold block">
                  {selectedAddonIds.length} option{selectedAddonIds.length > 1 ? 's' : ''} sélectionnée{selectedAddonIds.length > 1 ? 's' : ''}
                </span>
                <p className="text-xs text-gray-300 font-light">
                  {selectedAddonIds
                    .map((id) => ADDONS.find((a) => a.id === id)?.name)
                    .filter(Boolean)
                    .join(', ')}
                </p>
              </div>

              <button
                onClick={onOpenBookingWithOptions}
                className="green-gradient-bg text-black px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all shrink-0 cursor-pointer"
              >
                Réserver avec ces options
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
