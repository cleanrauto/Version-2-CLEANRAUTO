import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
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

export default function App() {
  const [selectedFormulaId, setSelectedFormulaId] = useState<string>('int-prestige');
  const [selectedVehicleType, setSelectedVehicleType] = useState<VehicleType>('citadine');
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);
  const [selectedCityName, setSelectedCityName] = useState<string>('Orange');
  const [isLegalModalOpen, setIsLegalModalOpen] = useState<boolean>(false);

  // Scroll smoothly to contact/booking section
  const scrollToBooking = (formulaId?: string, category?: Category, vehicleType?: VehicleType) => {
    if (formulaId) setSelectedFormulaId(formulaId);
    if (vehicleType) setSelectedVehicleType(vehicleType);

    const bookingEl = document.getElementById('contact');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleAddon = (addonId: string) => {
    setSelectedAddonIds((prev) => {
      if (prev.includes(addonId)) {
        return prev.filter((id) => id !== addonId);
      } else {
        return [...prev, addonId];
      }
    });
  };

  const handleSelectCity = (cityName: string) => {
    setSelectedCityName(cityName);
    scrollToBooking();
  };

  return (
    <div className="min-h-screen bg-[#0b0c0e] text-[#e2e8f0] selection:bg-[#25D366] selection:text-black">
      {/* Navigation Header */}
      <Header onOpenBooking={() => scrollToBooking()} />

      {/* Main Content Sections */}
      <main>
        {/* Hero Banner */}
        <Hero onOpenBooking={() => scrollToBooking()} />

        {/* 3 Pillars / Clean'R Experience */}
        <PillarsExperience />

        {/* Formules Intérieur & Extérieur */}
        <FormulasSection
          onSelectFormula={(formulaId, category, vehicleType) =>
            scrollToBooking(formulaId, category, vehicleType)
          }
        />

        {/* Prestations Sur-Mesure & Options */}
        <AddonsSection
          selectedAddonIds={selectedAddonIds}
          onToggleAddon={handleToggleAddon}
          onOpenBookingWithOptions={() => scrollToBooking()}
        />

        {/* Zone d'intervention (Orange & Alentours) */}
        <InterventionZone onSelectCity={handleSelectCity} />

        {/* Formulaire de Réservation / Estimateur */}
        <BookingSection
          initialFormulaId={selectedFormulaId}
          initialVehicleType={selectedVehicleType}
          initialAddonIds={selectedAddonIds}
          initialCityName={selectedCityName}
        />

        {/* Témoignages & Avis Clients */}
        <ReviewsSection />

        {/* Foire Aux Questions */}
        <FaqSection />
      </main>

      {/* Footer & Mentions */}
      <Footer
        onOpenLegal={() => setIsLegalModalOpen(true)}
        onOpenBooking={() => scrollToBooking()}
      />

      {/* Sticky Mobile Bar */}
      <StickyMobileBar onOpenBooking={() => scrollToBooking()} />

      {/* Modal Mentions Légales */}
      <LegalModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
      />
    </div>
  );
}
