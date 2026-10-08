import React, { useState, useEffect } from 'react';
import { FORMULAS, VEHICLE_OPTIONS } from '../data/packages';
import { ADDONS } from '../data/addons';
import { AddressPicker, AddressTravel } from './AddressPicker';
import { VehicleType, Category, BookingState } from '../types';
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
    category: FORMULAS.find(formula => formula.id === initialFormulaId)?.category || 'interieur',
    formulaId: initialFormulaId,
    selectedAddonIds: initialAddonIds,
    cityName: '',
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

  const [addressTravel, setAddressTravel] = useState<AddressTravel | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [confirmationSent, setConfirmationSent] = useState(true);
  const [website, setWebsite] = useState('');

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

  const handleAddressChange = (travel: AddressTravel | null) => {
    setAddressTravel(travel);
    setBookingState(prev => ({
      ...prev,
      cityName: travel?.address.city || '',
      customAddress: travel?.address.label || '',
    }));
  };

  // Current calculated prices
  const currentFormula = FORMULAS.find((f) => f.id === bookingState.formulaId) || FORMULAS[1];
  const formulaPrice = currentFormula.prices[bookingState.vehicleType];
  const isDevis = formulaPrice === 'sur Devis';

  const selectedAddons = ADDONS.filter((a) => bookingState.selectedAddonIds.includes(a.id));
  const addonsTotalPrice = selectedAddons.reduce((sum, a) => sum + a.price, 0);

  const displacementFee = addressTravel?.fee || 0;
  const numericFormulaPrice = typeof formulaPrice === 'number' ? formulaPrice : 0;
  const grandTotalNumeric = Number((numericFormulaPrice + addonsTotalPrice + displacementFee).toFixed(2));
  const grandTotalDisplay = isDevis
    ? 'Sur Devis'
    : !addressTravel ? 'Adresse à préciser' : `${grandTotalNumeric.toString().replace('.', ',')}€`;

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
• ${b('Trajet aller depuis le centre-ville d’Orange')} : ${addressTravel?.distanceKm.toFixed(2).replace('.', ',')} km
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
• *Trajet aller depuis le centre-ville d’Orange* : ${addressTravel?.distanceKm.toFixed(2).replace('.', ',')} km
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
    return `mailto:contact@cleanrauto.fr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressTravel) return;
    setIsSubmitting(true);

    setSubmitError('');
    try {
      const response = await fetch('/.netlify/functions/booking-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ ...bookingState, distanceKm: addressTravel.distanceKm, website }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.ok !== true) {
        setSubmitError(result?.error || 'L’envoi n’a pas abouti. Réessayez ou contactez-nous par WhatsApp.');
        return;
      }
      setConfirmationSent(result.confirmationSent === true);
      setSubmitted(true);
    } catch {
      setSubmitError('La réception de votre demande n’a pas pu être confirmée. Contactez-nous par WhatsApp ou téléphone.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
              Merci <strong className="text-white">{bookingState.fullName}</strong>. Notre équipe Clean'R Auto traite votre demande pour <strong className="text-[#25D366]">{currentFormula.name}</strong> à <strong className="text-white">{bookingState.cityName}</strong>. Nous vous recontacterons pour valider le créneau et les modalités d’intervention. Votre rendez-vous reste à confirmer.
            </p>

            <p className="text-sm text-gray-300" role="status">{confirmationSent ? 'Un email récapitulatif vous a été envoyé. Pensez à vérifier vos courriers indésirables.' : 'Votre demande a bien été transmise, mais l’email de confirmation n’a pas pu être envoyé. Vous n’avez pas besoin de renvoyer votre demande.'}</p>
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
                href={addressTravel ? generateWhatsAppMessage() : undefined}
                    aria-disabled={!addressTravel}
                    onClick={event => { if (!addressTravel) event.preventDefault(); }}
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

                {/* 4. Address and road travel fees */}
                <AddressPicker onChange={handleAddressChange} />
                <div>
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

                <div className="absolute -left-[10000px]" aria-hidden="true"><label>Site web<input name="website" value={website} onChange={event => setWebsite(event.target.value)} tabIndex={-1} autoComplete="off" /></label></div>
                {submitError && <p role="alert" className="rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-200">{submitError}</p>}
                {/* Action Submit Buttons */}
                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting || !addressTravel}
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
                    href={addressTravel ? generateWhatsAppMessage() : undefined}
                    aria-disabled={!addressTravel}
                    onClick={event => { if (!addressTravel) event.preventDefault(); }}
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
                  <span className="text-gray-300">Déplacement {bookingState.cityName && '(' + bookingState.cityName + ')'} :</span>
                  <span className={displacementFee === 0 ? 'text-[#25D366] font-semibold' : 'text-[#c5a059] font-bold'}>
                    {!addressTravel ? 'À calculer' : displacementFee === 0
                      ? 'Offert (jusqu’à 10 km)'
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
