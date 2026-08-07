import React, { useState, useEffect, useRef } from 'react';
import { FORMULAS, VEHICLE_OPTIONS } from '../data/packages';
import { ADDONS } from '../data/addons';
import {
  INTERVENTION_CITIES,
  calculateDisplacementFee,
  searchFrenchCommunesOnline,
  calculateDistanceKmFromOrange,
} from '../data/cities';
import { VehicleType, Category, BookingState, InterventionCity } from '../types';
import {
  Sparkles,
  Calendar,
  Clock,
  Car,
  MapPin,
  User,
  Phone,
  Mail,
  CheckCircle2,
  MessageSquare,
  Building2,
  Home,
  ShieldCheck,
  Send,
  Loader2,
  Search,
  Check,
} from 'lucide-react';

interface BookingSectionProps {
  initialFormulaId?: string;
  initialVehicleType?: VehicleType;
  initialAddonIds?: string[];
  initialCityName?: string;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  initialFormulaId = 'int-confort',
  initialVehicleType = 'citadine',
  initialAddonIds = [],
  initialCityName = 'Orange',
}) => {
  const [bookingState, setBookingState] = useState<BookingState>({
    vehicleType: initialVehicleType,
    category: 'interieur',
    formulaId: initialFormulaId,
    selectedAddonIds: initialAddonIds,
    cityName: initialCityName,
    customAddress: '',
    isWorkplace: false,
    date: '',
    timeSlot: '09h00 - 12h00',
    fullName: '',
    phone: '',
    email: '',
    vehicleModelDetails: '',
    comments: '',
  });

  // Dynamic displacement calculation state
  const [cityDistanceKm, setCityDistanceKm] = useState<number>(0);
  const [calculatedDisplacementFee, setCalculatedDisplacementFee] = useState<number>(0);
  const [citySearchInput, setCitySearchInput] = useState<string>(initialCityName);
  const [citySuggestions, setCitySuggestions] = useState<InterventionCity[]>([]);
  const [isSearchingCity, setIsSearchingCity] = useState<boolean>(false);
  const [showCityDropdown, setShowCityDropdown] = useState<boolean>(false);
  const cityDropdownRef = useRef<HTMLDivElement>(null);

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync state if props change
  useEffect(() => {
    if (initialFormulaId) {
      const formula = FORMULAS.find((f) => f.id === initialFormulaId);
      if (formula) {
        setBookingState((prev) => ({
          ...prev,
          formulaId: initialFormulaId,
          category: formula.category,
        }));
      }
    }
  }, [initialFormulaId]);

  useEffect(() => {
    if (initialVehicleType) {
      setBookingState((prev) => ({ ...prev, vehicleType: initialVehicleType }));
    }
  }, [initialVehicleType]);

  useEffect(() => {
    if (initialAddonIds && initialAddonIds.length > 0) {
      setBookingState((prev) => ({ ...prev, selectedAddonIds: initialAddonIds }));
    }
  }, [initialAddonIds]);

  // Recalculate displacement fee whenever city changes or initialCityName is set
  const updateCityFee = (cityNameToSet: string) => {
    const known = INTERVENTION_CITIES.find(
      (c) => c.name.toLowerCase() === cityNameToSet.toLowerCase() || c.name.toLowerCase().startsWith(cityNameToSet.toLowerCase())
    );
    if (known) {
      setCityDistanceKm(known.distanceKm);
      setCalculatedDisplacementFee(known.fee);
    } else {
      // Default: perform online lookup or fallback
      searchFrenchCommunesOnline(cityNameToSet).then((results) => {
        if (results && results.length > 0) {
          const match = results[0];
          setCityDistanceKm(match.distanceKm);
          setCalculatedDisplacementFee(match.fee);
        }
      });
    }
  };

  useEffect(() => {
    if (initialCityName) {
      setBookingState((prev) => ({ ...prev, cityName: initialCityName }));
      setCitySearchInput(initialCityName);
      updateCityFee(initialCityName);
    }
  }, [initialCityName]);

  // Handle outside click to close city suggestions dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target as Node)) {
        setShowCityDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search for French communes
  useEffect(() => {
    if (!citySearchInput || citySearchInput.trim().length < 2) {
      // Filter from local list
      const localMatches = INTERVENTION_CITIES.filter((c) =>
        c.name.toLowerCase().includes((citySearchInput || '').toLowerCase())
      );
      setCitySuggestions(localMatches.slice(0, 6));
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearchingCity(true);
      try {
        const results = await searchFrenchCommunesOnline(citySearchInput);
        setCitySuggestions(results.slice(0, 8));
      } catch (e) {
        const local = INTERVENTION_CITIES.filter((c) =>
          c.name.toLowerCase().includes(citySearchInput.toLowerCase())
        );
        setCitySuggestions(local);
      } finally {
        setIsSearchingCity(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [citySearchInput]);

  const handleSelectCommune = (city: InterventionCity) => {
    setBookingState((prev) => ({ ...prev, cityName: city.name }));
    setCitySearchInput(city.name);
    setCityDistanceKm(city.distanceKm);
    setCalculatedDisplacementFee(city.fee);
    setShowCityDropdown(false);
  };

  // Current calculated prices
  const currentFormula = FORMULAS.find((f) => f.id === bookingState.formulaId) || FORMULAS[1];
  const formulaPrice = currentFormula.prices[bookingState.vehicleType];
  const isDevis = formulaPrice === 'sur Devis';

  const selectedAddons = ADDONS.filter((a) => bookingState.selectedAddonIds.includes(a.id));
  const addonsTotalPrice = selectedAddons.reduce((sum, a) => sum + a.price, 0);

  const displacementFee = calculatedDisplacementFee;
  const numericFormulaPrice = typeof formulaPrice === 'number' ? formulaPrice : 0;
  const grandTotalNumeric = Number((numericFormulaPrice + addonsTotalPrice + displacementFee).toFixed(2));
  const grandTotalDisplay = isDevis
    ? 'Sur Devis'
    : `${grandTotalNumeric.toString().replace('.', ',')}€`;

  const handleVehicleChange = (v: VehicleType) => {
    setBookingState((prev) => ({ ...prev, vehicleType: v }));
  };

  const handleFormulaChange = (id: string) => {
    const f = FORMULAS.find((item) => item.id === id);
    if (f) {
      setBookingState((prev) => ({ ...prev, formulaId: id, category: f.category }));
    }
  };

  const handleToggleAddon = (addonId: string) => {
    setBookingState((prev) => {
      const exists = prev.selectedAddonIds.includes(addonId);
      const updated = exists
        ? prev.selectedAddonIds.filter((id) => id !== addonId)
        : [...prev.selectedAddonIds, addonId];
      return { ...prev, selectedAddonIds: updated };
    });
  };

  // Helper to generate the beautifully structured email and message body
  const generateStructuredBookingDetails = (isMarkdown: boolean = false) => {
    const vehicleLabel = VEHICLE_OPTIONS.find((v) => v.id === bookingState.vehicleType)?.label || bookingState.vehicleType.toUpperCase();
    const priceLabel = isDevis ? 'Sur Devis' : `${formulaPrice}€`;
    const feeText =
      displacementFee === 0
        ? '0,00€ (Orange et < 10 km)'
        : `${displacementFee.toFixed(2).replace('.', ',')}€ (${bookingState.cityName})`;

    const b = (text: string) => (isMarkdown ? `**${text}**` : text);

    const optionsList =
      selectedAddons.length > 0
        ? selectedAddons.map((a) => `• ${b(a.name)} : +${a.price}€`).join('\n')
        : '• Aucune option complémentaire';

    const optionsTotalText = addonsTotalPrice > 0 ? `${addonsTotalPrice}€` : '0€';
    const addressText = bookingState.customAddress?.trim() || 'Non renseignée';

    return `========================================
📋 ${b(" NOUVELLE DEMANDE DE RÉSERVATION CLEAN'R AUTO ")}
========================================

👤 ${b('INFORMATIONS CLIENT')}
• ${b('Nom & Prénom')} : ${bookingState.fullName.trim() || 'Non renseigné'}
• ${b('Téléphone')} : ${bookingState.phone.trim() || 'Non renseigné'}
• ${b('Email')} : ${bookingState.email.trim() || 'Non renseigné'}

🚗 ${b('DÉTAILS DU VÉHICULE')}
• ${b('Catégorie')} : ${vehicleLabel}
• ${b('Modèle/Détails')} : ${bookingState.vehicleModelDetails?.trim() || 'Non spécifié'}

🧽 ${b('PRESTATION & FORMULE')}
• ${b('Formule choisie')} : ${currentFormula.name} (${priceLabel})

➕ ${b('OPTIONS COMPLÉMENTAIRES SÉLECTIONNÉES')}
${optionsList}

📍 ${b("LIEU ET CRÉNEAU D'INTERVENTION")}
• ${b('Commune')} : ${bookingState.cityName}
• ${b('Type de lieu')} : ${bookingState.isWorkplace ? 'Lieu de travail' : 'Domicile'}
• ${b('Adresse')} : ${addressText}
• ${b('Date souhaitée')} : ${bookingState.date || 'À convenir'}
• ${b('Créneau horaire')} : ${bookingState.timeSlot}

💰 ${b('DÉTAIL DU TARIF & ESTIMATION TOTAL')}
• ${b('Prix de la formule')} : ${priceLabel}
• ${b('Total des options')} : ${optionsTotalText}
• ${b('Frais de déplacement')} : ${feeText}
----------------------------------------
• ${b('TOTAL ESTIMÉ TTC')} : ${b(grandTotalDisplay)}
========================================`;
  };

  // Generate Prefilled WhatsApp URL
  const generateWhatsAppMessage = () => {
    const vehicleLabel = VEHICLE_OPTIONS.find((v) => v.id === bookingState.vehicleType)?.label || bookingState.vehicleType.toUpperCase();
    const priceLabel = isDevis ? 'Sur Devis' : `${formulaPrice}€`;
    const feeText =
      displacementFee === 0
        ? '0,00€ (Orange et < 10 km)'
        : `${displacementFee.toFixed(2).replace('.', ',')}€ (${bookingState.cityName})`;

    const optionsList =
      selectedAddons.length > 0
        ? selectedAddons.map((a) => `• *${a.name}* : +${a.price}€`).join('\n')
        : '• Aucune option complémentaire';

    const optionsTotalText = addonsTotalPrice > 0 ? `${addonsTotalPrice}€` : '0€';
    const addressText = bookingState.customAddress?.trim() || 'Non renseignée';

    const text = `========================================
📋 * NOUVELLE DEMANDE DE RÉSERVATION CLEAN'R AUTO *
========================================

👤 *INFORMATIONS CLIENT*
• *Nom & Prénom* : ${bookingState.fullName.trim() || 'Non renseigné'}
• *Téléphone* : ${bookingState.phone.trim() || 'Non renseigné'}
• *Email* : ${bookingState.email.trim() || 'Non renseigné'}

🚗 *DÉTAILS DU VÉHICULE*
• *Catégorie* : ${vehicleLabel}
• *Modèle/Détails* : ${bookingState.vehicleModelDetails?.trim() || 'Non spécifié'}

🧽 *PRESTATION & FORMULE*
• *Formule choisie* : ${currentFormula.name} (${priceLabel})

➕ *OPTIONS COMPLÉMENTAIRES SÉLECTIONNÉES*
${optionsList}

📍 *LIEU ET CRÉNEAU D'INTERVENTION*
• *Commune* : ${bookingState.cityName}
• *Type de lieu* : ${bookingState.isWorkplace ? 'Lieu de travail' : 'Domicile'}
• *Adresse* : ${addressText}
• *Date souhaitée* : ${bookingState.date || 'À convenir'}
• *Créneau horaire* : ${bookingState.timeSlot}

💰 *DÉTAIL DU TARIF & ESTIMATION TOTAL*
• *Prix de la formule* : ${priceLabel}
• *Total des options* : ${optionsTotalText}
• *Frais de déplacement* : ${feeText}
----------------------------------------
• *TOTAL ESTIMÉ TTC* : *${grandTotalDisplay}*
========================================`;

    return `https://wa.me/33617200516?text=${encodeURIComponent(text)}`;
  };

  // Generate Email mailto URL
  const generateEmailMessage = () => {
    const subject = `[Réservation Clean'R Auto] - ${bookingState.fullName.trim() || 'Client'} (${bookingState.cityName} - ${grandTotalDisplay})`;
    const body = generateStructuredBookingDetails(false);
    return `mailto:cleanr.autopro@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formattedMessage = generateStructuredBookingDetails(false);

    // Only send the exact formatted reservation text, without duplicated individual form fields
    const payload = {
      _subject: `📋 [Réservation Clean'R] ${bookingState.fullName.trim() || 'Client'} - ${bookingState.cityName} (${grandTotalDisplay})`,
      _replyto: bookingState.email.trim() || undefined,
      DEMANDE_DE_RESERVATION: formattedMessage,
    };

    try {
      const response = await fetch('https://formspree.io/f/xkjwwjww', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        setSubmitted(true);
      }
    } catch (err) {
      console.error('Erreur envoi Formspree:', err);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Popular quick city picks
  const POPULAR_QUICK_CITIES: InterventionCity[] = INTERVENTION_CITIES.slice(0, 8);

  return (
    <section id="contact" className="py-24 bg-[#0b0c0e] relative overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#25D366]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#25D366] font-semibold block mb-3">
            Réservation & Estimation
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-light text-white tracking-tight mb-6">
            Réserver votre <span className="green-gradient-text">Soin Automobile</span>
          </h2>
          <div className="w-16 h-[1px] bg-[#25D366]/50 mx-auto mb-6" />
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            Configurez vos choix, obtenez votre tarif instantané et réservez par formulaire ou directement sur WhatsApp.
          </p>
        </div>

        {submitted ? (
          <div className="glass-card rounded-2xl p-8 sm:p-12 border border-[#25D366] max-w-2xl mx-auto text-center space-y-6 shadow-2xl animate-fadeIn">
            <div className="w-16 h-16 rounded-full green-gradient-bg flex items-center justify-center mx-auto text-black shadow-lg">
              <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
            </div>

            <h3 className="font-serif-luxury text-3xl text-white">Demande transmise avec succès !</h3>

            <p className="text-sm text-[#a0aab8] font-light leading-relaxed">
              Merci <strong className="text-white">{bookingState.fullName}</strong>. Notre équipe Clean'R Auto traite votre demande pour <strong className="text-[#25D366]">{currentFormula.name}</strong> à <strong className="text-white">{bookingState.cityName}</strong> et vous rappelle sous 2 heures ouvrées pour confirmer l'horaire précis.
            </p>

            <div className="p-4 bg-white/5 rounded-xl text-xs text-gray-300 border border-white/10 space-y-1 text-left max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-gray-400">Véhicule :</span>
                <span className="font-semibold text-white">{bookingState.vehicleModelDetails || 'Véhicule'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Estimé :</span>
                <span className="font-bold text-[#25D366]">{grandTotalDisplay}</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={generateEmailMessage()}
                className="bg-white/10 hover:bg-white/20 text-white px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 border border-white/10 transition-colors"
              >
                <Mail className="w-4 h-4 text-[#25D366]" />
                <span>Envoyer à contact@cleanrauto.fr</span>
              </a>

              <a
                href={generateWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="green-gradient-bg text-black px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 hover:brightness-110 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Poursuivre sur WhatsApp</span>
              </a>

              <button
                onClick={() => setSubmitted(false)}
                className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium uppercase tracking-wider border border-white/10 transition-colors"
              >
                Nouvelle réservation
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Column */}
            <div className="lg:col-span-7 glass-card rounded-2xl p-6 sm:p-8 border border-[#25D366]/25 shadow-2xl">
              <form onSubmit={handleSubmitForm} className="space-y-6">
                {/* 1. Vehicle Selection */}
                <div>
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#25D366] block mb-2 flex items-center space-x-1.5">
                    <Car className="w-4 h-4" />
                    <span>1. Catégorie du véhicule</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {VEHICLE_OPTIONS.map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => handleVehicleChange(v.id)}
                        className={`p-2.5 rounded-lg border text-left transition-all text-xs sm:text-sm cursor-pointer ${
                          bookingState.vehicleType === v.id
                            ? 'bg-[#25D366]/20 border-[#25D366] text-white font-semibold shadow-md'
                            : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                        }`}
                      >
                        {v.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Formula Selection */}
                <div>
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#25D366] block mb-2 flex items-center space-x-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>2. Choix de la formule principale</span>
                  </label>
                  <select
                    value={bookingState.formulaId}
                    onChange={(e) => handleFormulaChange(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#25D366] text-white text-xs rounded-xl p-3.5 focus:outline-none"
                  >
                    <optgroup label="Formules Intérieur">
                      {FORMULAS.filter((f) => f.category === 'interieur').map((f) => {
                        const priceVal = f.prices[bookingState.vehicleType];
                        return (
                          <option key={f.id} value={f.id}>
                            {f.name} — {typeof priceVal === 'number' ? `${priceVal}€` : priceVal}
                          </option>
                        );
                      })}
                    </optgroup>
                    <optgroup label="Formules Extérieur">
                      {FORMULAS.filter((f) => f.category === 'exterieur').map((f) => {
                        const priceVal = f.prices[bookingState.vehicleType];
                        return (
                          <option key={f.id} value={f.id}>
                            {f.name} — {typeof priceVal === 'number' ? `${priceVal}€` : priceVal}
                          </option>
                        );
                      })}
                    </optgroup>
                    <optgroup label="Pack Intégral">
                      {FORMULAS.filter((f) => f.category === 'pack_integral').map((f) => {
                        const priceVal = f.prices[bookingState.vehicleType];
                        return (
                          <option key={f.id} value={f.id}>
                            {f.name} — {typeof priceVal === 'number' ? `${priceVal}€` : priceVal}
                          </option>
                        );
                      })}
                    </optgroup>
                  </select>
                </div>

                {/* 3. Addon Checkboxes */}
                <div>
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#25D366] block mb-2">
                    3. Options complémentaires souhaitées (Facultatif)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {ADDONS.map((addon) => {
                      const checked = bookingState.selectedAddonIds.includes(addon.id);
                      return (
                        <button
                          key={addon.id}
                          type="button"
                          onClick={() => handleToggleAddon(addon.id)}
                          className={`p-2.5 rounded-lg border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                            checked
                              ? 'bg-[#25D366]/20 border-[#25D366] text-white font-medium'
                              : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                          }`}
                        >
                          <span className="line-clamp-1">{addon.name}</span>
                          <span className="font-bold text-[#25D366] shrink-0 pl-1">+{addon.price}€</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Location & Address with Dynamic Commune Search & Distance Calculation */}
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Commune Search & Autocomplete */}
                    <div className="relative" ref={cityDropdownRef}>
                      <label className="text-xs uppercase tracking-wider font-semibold text-[#25D366] block mb-1.5 flex items-center justify-between">
                        <span className="flex items-center space-x-1.5">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>Commune d'intervention <strong className="text-[#25D366]">*</strong></span>
                        </span>
                        {isSearchingCity && (
                          <span className="text-[10px] text-gray-400 flex items-center space-x-1">
                            <Loader2 className="w-3 h-3 animate-spin text-[#25D366]" />
                            <span>Calcul distance...</span>
                          </span>
                        )}
                      </label>

                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Tapez votre ville ou code postal (ex: Orange, Sorgues, Avignon, 30150...)"
                          value={citySearchInput}
                          onFocus={() => setShowCityDropdown(true)}
                          onChange={(e) => {
                            const val = e.target.value;
                            setCitySearchInput(val);
                            setBookingState((prev) => ({ ...prev, cityName: val }));
                            setShowCityDropdown(true);
                            updateCityFee(val);
                          }}
                          className="w-full bg-black/60 border border-white/15 focus:border-[#25D366] text-white text-xs rounded-xl p-3 pr-9 focus:outline-none transition-colors"
                          required
                        />
                        <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>

                      {/* Dropdown Suggestions */}
                      {showCityDropdown && citySuggestions.length > 0 && (
                        <div className="absolute left-0 right-0 top-full mt-1.5 bg-[#141720] border border-[#25D366]/40 rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto divide-y divide-white/5">
                          <div className="p-2 text-[10px] uppercase font-bold text-gray-400 bg-black/40 flex justify-between">
                            <span>Communes trouvées (France)</span>
                            <span className="text-[#25D366]">Calcul auto depuis Orange</span>
                          </div>
                          {citySuggestions.map((city, idx) => {
                            const isFree = city.fee === 0;
                            return (
                              <div
                                key={`${city.name}-${city.zipCode}-${idx}`}
                                onClick={() => handleSelectCommune(city)}
                                className="p-2.5 hover:bg-[#25D366]/15 cursor-pointer flex items-center justify-between transition-colors group"
                              >
                                <div>
                                  <div className="flex items-center space-x-1.5">
                                    <MapPin className="w-3.5 h-3.5 text-[#25D366]" />
                                    <span className="text-xs font-semibold text-white group-hover:text-[#25D366]">
                                      {city.name}
                                    </span>
                                    {city.zipCode && (
                                      <span className="text-[10px] text-gray-400 font-mono">
                                        ({city.zipCode})
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-[10px] text-gray-400 block pl-5">
                                    {city.distanceKm} km depuis Orange • {city.freeLimitNote || (isFree ? 'Frais offerts (< 10 km)' : '0,60€/km au-delà de 10 km')}
                                  </span>
                                </div>

                                <span
                                  className={`text-[10px] font-bold px-2 py-0.5 rounded shrink-0 ${
                                    isFree
                                      ? 'bg-[#25D366]/15 text-[#25D366] border border-[#25D366]/30'
                                      : 'bg-[#c5a059]/20 text-[#c5a059] border border-[#c5a059]/40'
                                  }`}
                                >
                                  {isFree ? 'Frais 0€' : `+${city.fee.toFixed(2).replace('.', ',')}€`}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Location Type (Domicile vs Lieu de travail) */}
                    <div>
                      <label className="text-xs uppercase tracking-wider font-semibold text-gray-300 block mb-1.5">
                        Type de lieu
                      </label>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setBookingState((prev) => ({ ...prev, isWorkplace: false }))}
                          className={`flex-1 p-2.5 rounded-xl border text-xs flex items-center justify-center space-x-1.5 cursor-pointer ${
                            !bookingState.isWorkplace
                              ? 'bg-[#25D366]/20 border-[#25D366] text-white font-semibold'
                              : 'bg-white/5 border-white/10 text-gray-400'
                          }`}
                        >
                          <Home className="w-3.5 h-3.5" />
                          <span>Domicile</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setBookingState((prev) => ({ ...prev, isWorkplace: true }))}
                          className={`flex-1 p-2.5 rounded-xl border text-xs flex items-center justify-center space-x-1.5 cursor-pointer ${
                            bookingState.isWorkplace
                              ? 'bg-[#25D366]/20 border-[#25D366] text-white font-semibold'
                              : 'bg-white/5 border-white/10 text-gray-400'
                          }`}
                        >
                          <Building2 className="w-3.5 h-3.5" />
                          <span>Lieu de travail</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Calculated Distance & Fee Feedback Banner */}
                  <div className={`p-3 rounded-xl border text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 ${
                    displacementFee === 0
                      ? 'bg-[#25D366]/10 border-[#25D366]/30 text-white'
                      : 'bg-[#c5a059]/10 border-[#c5a059]/30 text-white'
                  }`}>
                    <div className="flex items-center space-x-2">
                      {displacementFee === 0 ? (
                        <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0" />
                      ) : (
                        <MapPin className="w-4 h-4 text-[#c5a059] shrink-0" />
                      )}
                      <div>
                        <span className="font-semibold text-white">
                          {bookingState.cityName || 'Orange'}
                        </span>
                        <span className="text-gray-300 ml-1.5">
                          ({cityDistanceKm} km depuis base Orange)
                        </span>
                        <span className="block text-[11px] text-gray-400">
                          {displacementFee === 0
                            ? 'Frais de déplacement offerts (Rayon de 10 km)'
                            : `Frais calculés automatiquement : 10 km offerts + ${Math.max(0, cityDistanceKm - 10)} km × 0,60€/km`}
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                        displacementFee === 0
                          ? 'bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/40'
                          : 'bg-[#c5a059]/25 text-[#c5a059] border border-[#c5a059]/50'
                      }`}>
                        {displacementFee === 0 ? 'Frais déplacement : 0€' : `Frais déplacement : +${displacementFee.toFixed(2).replace('.', ',')}€`}
                      </span>
                    </div>
                  </div>

                  {/* Quick Select Popular Towns */}
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-gray-400 font-medium block mb-1.5">
                      Suggestions rapides communes proches :
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {POPULAR_QUICK_CITIES.map((c) => {
                        const isSelected = bookingState.cityName.toLowerCase() === c.name.toLowerCase();
                        return (
                          <button
                            key={c.name}
                            type="button"
                            onClick={() => handleSelectCommune(c)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] border transition-all cursor-pointer flex items-center space-x-1 ${
                              isSelected
                                ? 'bg-[#25D366]/25 border-[#25D366] text-white font-semibold'
                                : 'bg-white/5 hover:bg-white/10 border-white/10 text-gray-300'
                            }`}
                          >
                            <span>{c.name}</span>
                            <span className={`text-[10px] font-bold ${c.fee === 0 ? 'text-[#25D366]' : 'text-[#c5a059]'}`}>
                              ({c.fee === 0 ? '0€' : `+${c.fee}€`})
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Address details */}
                <div>
                  <input
                    type="text"
                    placeholder="Adresse précise ou Nom de l'entreprise (ex: 15 Rue de la République)"
                    value={bookingState.customAddress}
                    onChange={(e) => setBookingState((prev) => ({ ...prev, customAddress: e.target.value }))}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#25D366] text-white text-xs rounded-xl p-3 focus:outline-none"
                  />
                </div>

                {/* 5. Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase tracking-wider font-semibold text-gray-300 block mb-1.5 flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>Date souhaitée</span>
                    </label>
                    <input
                      type="date"
                      value={bookingState.date}
                      onChange={(e) => setBookingState((prev) => ({ ...prev, date: e.target.value }))}
                      className="w-full bg-black/60 border border-white/15 focus:border-[#25D366] text-white text-xs rounded-xl p-3 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider font-semibold text-gray-300 block mb-1.5 flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>Créneau horaire</span>
                    </label>
                    <select
                      value={bookingState.timeSlot}
                      onChange={(e) => setBookingState((prev) => ({ ...prev, timeSlot: e.target.value }))}
                      className="w-full bg-black/60 border border-white/15 focus:border-[#25D366] text-white text-xs rounded-xl p-3 focus:outline-none"
                    >
                      <option value="08h30 - 11h30">Matinée (08h30 - 11h30)</option>
                      <option value="12h00 - 15h00">Milieu de journée (12h00 - 15h00)</option>
                      <option value="15h00 - 18h00">Après-midi (15h00 - 18h00)</option>
                    </select>
                  </div>
                </div>

                {/* 6. Contact Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-white/10">
                  <div>
                    <label className="text-xs uppercase tracking-wider font-semibold text-gray-300 block mb-1.5 flex items-center space-x-1.5">
                      <User className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>Nom & Prénom <strong className="text-[#25D366]">*</strong></span>
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: M. Jean Dupont"
                      value={bookingState.fullName}
                      onChange={(e) => setBookingState((prev) => ({ ...prev, fullName: e.target.value }))}
                      className="w-full bg-black/60 border border-white/15 focus:border-[#25D366] text-white text-xs rounded-xl p-3 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider font-semibold text-gray-300 block mb-1.5 flex items-center space-x-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>Téléphone <strong className="text-[#25D366]">*</strong></span>
                    </label>
                    <input
                      type="tel"
                      placeholder="Ex: 06 12 34 56 78"
                      value={bookingState.phone}
                      onChange={(e) => setBookingState((prev) => ({ ...prev, phone: e.target.value }))}
                      className="w-full bg-black/60 border border-white/15 focus:border-[#25D366] text-white text-xs rounded-xl p-3 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider font-semibold text-gray-300 block mb-1.5 flex items-center space-x-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>Adresse E-mail <strong className="text-[#25D366]">*</strong></span>
                    </label>
                    <input
                      type="email"
                      placeholder="Ex: client@exemple.fr"
                      value={bookingState.email}
                      onChange={(e) => setBookingState((prev) => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-black/60 border border-white/15 focus:border-[#25D366] text-white text-xs rounded-xl p-3 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider font-semibold text-gray-300 block mb-1">
                    Modèle exact du véhicule & remarques
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Porsche 911 Carrera 4S (Noir métallisé) / Cuir beige à traiter"
                    value={bookingState.vehicleModelDetails}
                    onChange={(e) => setBookingState((prev) => ({ ...prev, vehicleModelDetails: e.target.value }))}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#25D366] text-white text-xs rounded-xl p-3 focus:outline-none"
                  />
                </div>

                {/* Action Submit Buttons */}
                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 green-gradient-bg text-black py-4 rounded-xl text-xs uppercase tracking-[0.15em] font-bold shadow-xl hover:brightness-110 transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-black" />
                        <span>Envoi en cours...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Envoyer la demande en ligne</span>
                      </>
                    )}
                  </button>

                  <a
                    href={generateWhatsAppMessage()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#25D366] hover:bg-[#20ba59] text-black py-4 rounded-xl text-xs uppercase tracking-[0.15em] font-bold shadow-xl transition-all flex items-center justify-center space-x-2"
                  >
                    <MessageSquare className="w-4 h-4 text-black" />
                    <span>Réserver par WhatsApp</span>
                  </a>
                </div>
              </form>
            </div>

            {/* Price Summary Column */}
            <div className="lg:col-span-5 glass-card rounded-2xl p-6 sm:p-8 border border-[#25D366] bg-gradient-to-b from-[#181c26] to-[#0d0e12] sticky top-28 shadow-2xl">
              <span className="text-xs uppercase tracking-[0.2em] text-[#25D366] font-bold block mb-4">
                Récapitulatif financier
              </span>

              <h3 className="font-serif-luxury text-2xl text-white mb-6">
                Estimation instantanée
              </h3>

              <div className="space-y-4 text-xs border-y border-white/10 py-6 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Formule : <strong className="text-white">{currentFormula.name}</strong></span>
                  <span className="font-semibold text-white">
                    {typeof formulaPrice === 'number' ? `${formulaPrice}€` : formulaPrice}
                  </span>
                </div>

                <div className="flex justify-between items-center text-gray-400">
                  <span>Gabarit véhicule :</span>
                  <span className="text-gray-200">{VEHICLE_OPTIONS.find((v) => v.id === bookingState.vehicleType)?.label}</span>
                </div>

                {selectedAddons.length > 0 && (
                  <div className="pt-2 border-t border-white/5 space-y-1.5">
                    <span className="text-gray-400 block font-medium">Options complémentaires ({selectedAddons.length}) :</span>
                    {selectedAddons.map((addon) => (
                      <div key={addon.id} className="flex justify-between text-gray-300 pl-2">
                        <span className="line-clamp-1">• {addon.name}</span>
                        <span className="text-[#25D366] font-semibold">+{addon.price}€</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex justify-between items-center pt-2 border-t border-white/5">
                  <span className="text-gray-300">Déplacement ({bookingState.cityName}) :</span>
                  <span className={displacementFee === 0 ? 'text-[#25D366] font-semibold' : 'text-[#c5a059] font-bold'}>
                    {displacementFee === 0
                      ? 'Offert (< 10km)'
                      : `+${displacementFee.toFixed(2).replace('.', ',')}€`}
                  </span>
                </div>
              </div>

              {/* Total Box */}
              <div className="p-4 rounded-xl bg-black/60 border border-[#25D366]/40 mb-6 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 font-medium block">
                    Total TTC Estimé
                  </span>
                  <span className="text-[10px] text-[#25D366]">Paiement après intervention</span>
                </div>
                <div className="text-right">
                  <span className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white">
                    {grandTotalDisplay}
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-[11px] text-gray-400 font-light">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-[#25D366] shrink-0" />
                  <span>Sans engagement — validation téléphonique préalable</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0" />
                  <span>Paiement par CB TPE, Virement ou Espèces</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
