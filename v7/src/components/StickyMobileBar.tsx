import React from 'react';
import { Phone, MessageSquare, Sparkles } from 'lucide-react';

interface StickyMobileBarProps {
  onOpenBooking: () => void;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({ onOpenBooking }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-[#0a0b0d]/95 backdrop-blur-lg border-t border-[#25D366]/30 p-2.5 px-4 shadow-2xl">
      <div className="flex items-center justify-between gap-2">
        <a
          href="tel:0617200516"
          className="flex-1 py-2.5 px-3 rounded-xl bg-white/10 text-white text-[11px] font-semibold uppercase tracking-wider flex items-center justify-center space-x-1.5 border border-white/15"
        >
          <Phone className="w-3.5 h-3.5 text-[#25D366]" />
          <span>Appeler</span>
        </a>

        <a
          href="https://wa.me/33617200516?text=Bonjour%20Clean'R%20Auto,%20je%20souhaite%20r%C3%A9server%20un%20soin%20automobile."
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 px-3 rounded-xl bg-[#25D366]/20 text-[#25D366] text-[11px] font-semibold uppercase tracking-wider flex items-center justify-center space-x-1.5 border border-[#25D366]/40"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={onOpenBooking}
          className="flex-1 py-2.5 px-3 rounded-xl green-gradient-bg text-black text-[11px] font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 shadow-lg cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-black" />
          <span>Réserver</span>
        </button>
      </div>
    </div>
  );
};
