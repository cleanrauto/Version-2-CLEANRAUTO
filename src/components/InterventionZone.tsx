import React, { useState } from 'react';
import { INTERVENTION_CITIES } from '../data/cities';
import { MapPin, Search, CheckCircle2, Navigation, Phone, MessageSquare } from 'lucide-react';

interface InterventionZoneProps {
  onSelectCity: (cityName: string) => void;
}

export const InterventionZone: React.FC<InterventionZoneProps> = ({ onSelectCity }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCities = INTERVENTION_CITIES.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.zipCode.includes(searchTerm)
  );

  return (
    <section id="zone" className="py-24 bg-[#0e1015] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#25D366] font-semibold block mb-3">
            Mobile à Orange (84) & Départements Proches (30, 26, 13)
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-light text-white tracking-tight mb-6">
            Zone d' intervention <span className="green-gradient-text italic font-normal">Orange & Alentours</span>
          </h2>
          <div className="w-16 h-[1px] bg-[#25D366]/50 mx-auto mb-6" />
          <p className="text-sm sm:text-base text-[#a0aab8] font-light leading-relaxed">
            Intervention à votre domicile ou sur votre lieu de travail. <strong className="text-white">Frais de déplacement offerts dans un rayon de 10 km</strong> autour d'Orange. Au-delà, un tarif transparent de <strong className="text-[#c5a059] font-bold">0,60€ / km</strong> est appliqué (Vaucluse, Gard, Drôme & Bouches-du-Rhône proches).
          </p>
        </div>

        {/* Search Widget & Interactive Map Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Column: Search & City Pills */}
          <div className="lg:col-span-7 glass-card rounded-2xl p-6 sm:p-8 border border-[#25D366]/25">
            <div className="flex items-center space-x-2 mb-4">
              <Search className="w-4 h-4 text-[#25D366]" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                Sélectionnez votre commune ou code postal :
              </h3>
            </div>

            {/* Input Bar */}
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Ex: Orange, Châteauneuf-du-Pape, Sorgues, Roquemaure..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-black/50 border border-white/15 focus:border-[#25D366] rounded-xl px-4 py-3.5 text-xs text-white placeholder-gray-500 focus:outline-none transition-colors pr-10"
              />
              <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            </div>

            {/* City Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
              {filteredCities.length > 0 ? (
                filteredCities.map((city) => {
                  const feeDisplay =
                    city.fee === 0
                      ? 'Frais 0€'
                      : `+${city.fee.toFixed(2).replace('.', ',')}€`;

                  return (
                    <div
                      key={city.name}
                      onClick={() => onSelectCity(city.name)}
                      className="p-3 rounded-xl bg-white/5 hover:bg-[#25D366]/15 border border-white/10 hover:border-[#25D366] transition-all flex items-center justify-between cursor-pointer group"
                    >
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#25D366]" />
                          <span className="text-xs font-semibold text-white group-hover:text-[#25D366]">
                            {city.name}
                          </span>
                          <span className="text-[10px] text-gray-400 font-mono">({city.zipCode})</span>
                        </div>
                        <span className="text-[10px] text-gray-400 block mt-0.5">
                          {city.freeLimitNote}
                        </span>
                      </div>

                      <div className="text-right shrink-0">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            city.fee === 0
                              ? 'bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20'
                              : 'bg-[#c5a059]/20 text-[#c5a059] border border-[#c5a059]/40'
                          }`}
                        >
                          {feeDisplay}
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-2 py-6 text-center text-xs text-gray-400">
                  Votre commune n'est pas répertoriée ? Nous intervenons sur demande dans tout le Vaucluse et départements limitrophes (30, 26, 13).{' '}
                  <a
                    href="tel:0617200516"
                    className="text-[#25D366] underline font-semibold block mt-1"
                  >
                    Contactez-nous directement au 06 17 20 05 16
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Visual Map Representation Card */}
          <div className="lg:col-span-5 glass-card rounded-2xl p-6 sm:p-8 border border-[#25D366]/25 bg-gradient-to-br from-[#12151c] to-[#0a0b0d] flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-[#25D366] font-bold mb-4">
                <Navigation className="w-4 h-4" />
                <span>Rayon d'action principal</span>
              </div>

              <h3 className="font-serif-luxury text-2xl text-white mb-4">
                Intervention directe sur le lieu de votre choix
              </h3>

              <p className="text-xs text-[#a0aab8] leading-relaxed mb-6 font-light">
                Propriété privée, domaine viticole, entreprise ou parking : notre unité mobile de detailing se déplace à Orange (84) et dans ses alentours proches.
              </p>

              {/* Highlights */}
              <div className="space-y-3 mb-8">
                <div className="flex items-start space-x-2 text-xs text-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                  <span>Unité mobile d'intervention entièrement équipée</span>
                </div>
                <div className="flex items-start space-x-2 text-xs text-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                  <span>Matériel de detailing haute précision & soin sur-mesure</span>
                </div>
                <div className="flex items-start space-x-2 text-xs text-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                  <span>Bâches de travail & protections de sol professionnelles</span>
                </div>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/33617200516?text=Bonjour,%20je%20souhaite%20verifier%20si%20vous%20intervenez%20dans%20ma%20commune."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Question WhatsApp</span>
              </a>

              <a
                href="tel:0617200516"
                className="flex-1 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all"
              >
                <Phone className="w-4 h-4 text-[#25D366]" />
                <span>06 17 20 05 16</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
