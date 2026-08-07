import React, { useState } from 'react';
import { FAQS } from '../data/reviews';
import { ChevronDown, HelpCircle, Phone, MessageSquare } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-[#0b0c0e] relative overflow-hidden border-t border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-light text-white tracking-tight mb-6">
            Foire aux <span className="green-gradient-text">Questions</span>
          </h2>
          <div className="w-16 h-[1px] bg-[#25D366]/50 mx-auto mb-6" />
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            Tout ce qu'il faut savoir sur l'organisation de nos interventions de soin et detailing à domicile à Orange et alentours.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4 mb-16">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;

            return (
              <div
                key={idx}
                className="glass-card rounded-xl border border-white/10 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between space-x-4 cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <HelpCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                    <span className="text-sm sm:text-base font-semibold text-white">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#25D366] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-3 text-xs sm:text-sm text-gray-300 font-normal leading-relaxed border-t border-white/5 bg-black/40 animate-fadeIn">
                    <p>{faq.answer}</p>
                    <span className="inline-block mt-3 text-[11px] uppercase tracking-widest text-[#25D366] font-semibold">
                      Catégorie : {faq.category}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA */}
        <div className="glass-card rounded-2xl p-8 text-center border border-[#25D366]/30 bg-gradient-to-r from-[#12151c] to-[#0e1015]">
          <h3 className="font-serif-luxury text-2xl text-white mb-2">
            Une question spécifique sur votre véhicule ?
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 mb-6">
            Notre équipe se tient à votre entière disposition pour vous conseiller le soin le plus adapté.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:0617200516"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-2"
            >
              <Phone className="w-4 h-4 text-[#25D366]" />
              <span>06 17 20 05 16</span>
            </a>

            <a
              href="https://wa.me/33617200516?text=Bonjour%20Clean'R%20Auto,%20j'ai%20une%20question%20concernant%20mon%20v%C3%A9hicule."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#25D366] text-black text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Discussion WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
