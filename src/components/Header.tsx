import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Menu, X, Shield, Calendar, MapPin, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenBooking: (formulaId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Expérience', href: '#experience' },
    { name: 'Nos Formules', href: '#formules' },
    { name: 'Options Sur-Mesure', href: '#options' },
    { name: 'Zone Orange (84)', href: '#zone' },
    { name: 'Avis Clients', href: '#avis' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0b0c0e]/95 backdrop-blur-md border-b border-[#25D366]/20 shadow-2xl py-3.5'
          : 'bg-gradient-to-b from-[#0b0c0e]/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo Textuel Soigné */}
          <a href="#" className="flex items-center space-x-2 group shrink-0">
            <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-[0.2em] text-white group-hover:text-[#25D366] transition-colors">
              CLEAN<span className="text-[#25D366]">'R</span> AUTO
            </span>
          </a>

          {/* Desktop Navigation Équilibrée */}
          <nav className="hidden lg:flex items-center space-x-7 xl:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-medium uppercase tracking-[0.15em] text-[#cbd5e1] hover:text-[#25D366] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#25D366] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs: Pilule de contact fine & Bouton Réserver */}
          <div className="hidden sm:flex items-center space-x-3">
            <div className="flex items-center space-x-2 border border-white/10 rounded-full px-3.5 py-1.5 bg-white/5 hover:border-[#25D366]/40 transition-all backdrop-blur-sm">
              <a
                href="tel:0617200516"
                className="flex items-center space-x-1.5 text-xs font-semibold text-white hover:text-[#25D366] transition-colors whitespace-nowrap"
                title="Appeler Clean'R Auto"
              >
                <Phone className="w-3.5 h-3.5 text-[#25D366]" />
                <span>06 17 20 05 16</span>
              </a>

              <span className="text-white/20 text-xs select-none">•</span>

              <a
                href="https://wa.me/33617200516?text=Bonjour%20Clean'R%20Auto,%20je%20souhaite%20des%20renseignements%20pour%20un%20soin%20automobile."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-xs font-medium text-gray-300 hover:text-[#25D366] transition-colors whitespace-nowrap"
                title="Contacter sur WhatsApp"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp</span>
              </a>
            </div>

            <button
              onClick={() => onOpenBooking()}
              className="green-gradient-bg text-black font-semibold text-xs uppercase tracking-[0.15em] px-5 py-2.5 rounded shadow-lg hover:brightness-110 transition-all duration-300 flex items-center space-x-2 group cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-black group-hover:rotate-12 transition-transform" />
              <span>Réserver</span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center space-x-3 lg:hidden">
            <button
              onClick={() => onOpenBooking()}
              className="green-gradient-bg text-black text-[11px] uppercase font-bold tracking-wider px-3 py-1.5 rounded sm:hidden"
            >
              Réserver
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-white focus:outline-none rounded-lg bg-white/5 border border-white/10"
              aria-label="Menu Mobile"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e1015] border-b border-[#25D366]/20 px-4 pt-4 pb-6 space-y-3 animate-fadeIn">
          <nav className="flex flex-col space-y-3 border-b border-white/10 pb-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium uppercase tracking-[0.15em] text-gray-300 hover:text-[#25D366] py-1.5 px-2 rounded hover:bg-white/5"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="pt-2 flex flex-col space-y-2.5">
            <a
              href="tel:0617200516"
              className="flex items-center justify-center space-x-2 text-xs uppercase tracking-wider font-semibold py-3 bg-white/5 border border-white/10 rounded text-white"
            >
              <Phone className="w-4 h-4 text-[#25D366]" />
              <span>Appeler le 06 17 20 05 16</span>
            </a>

            <a
              href="https://wa.me/33617200516?text=Bonjour%20Clean'R%20Auto,%20je%20souhaite%20reserver%20un%20soin%20automobile."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 text-xs uppercase tracking-wider font-semibold py-3 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] rounded"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Discussion WhatsApp Directe</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="green-gradient-bg text-black text-xs font-bold uppercase tracking-wider py-3.5 rounded text-center shadow-lg"
            >
              Réserver mon Soin Automobile
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
