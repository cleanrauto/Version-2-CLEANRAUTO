import React from 'react';
import { REVIEWS } from '../data/reviews';
import { Star, Quote, ShieldCheck, MapPin } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="avis" className="py-24 bg-[#0e1015] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#25D366] font-semibold block mb-3">
            Confiance & Réputation
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-light text-white tracking-tight mb-6">
            L'Avis de nos <span className="green-gradient-text italic font-normal">Clients Exigeants</span>
          </h2>
          <div className="w-16 h-[1px] bg-[#25D366]/50 mx-auto mb-6" />
          <p className="text-sm sm:text-base text-[#a0aab8] font-light leading-relaxed">
            Propriétaires de véhicules de prestige, dirigeants d'entreprises et passionnés d'automobile partagent leur expérience avec Clean'R Auto.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="glass-card rounded-2xl p-8 border border-white/10 hover:border-[#25D366]/40 transition-all duration-300 relative group flex flex-col justify-between"
            >
              <div>
                {/* Top Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#25D366] text-[#25D366]" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-[#25D366]/20 group-hover:text-[#25D366]/40 transition-colors" />
                </div>

                {/* Title & Comment */}
                <h3 className="text-lg font-serif-luxury font-bold text-white mb-3">
                  "{review.title}"
                </h3>

                <p className="text-xs sm:text-sm text-[#a0aab8] font-light leading-relaxed mb-6 italic">
                  "{review.comment}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-sm font-semibold text-white block">{review.author}</span>
                  <div className="flex items-center space-x-1.5 text-[11px] text-[#25D366] font-medium mt-0.5">
                    <MapPin className="w-3 h-3" />
                    <span>{review.location}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-300">{review.vehicle}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 font-medium block">
                    {review.formulaUsed}
                  </span>
                  <span className="text-[10px] text-gray-500">{review.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Aggregate Badge */}
        <div className="glass-card rounded-xl p-4 max-w-xl mx-auto text-center border border-[#25D366]/30 flex items-center justify-center space-x-4">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-[#25D366] text-[#25D366]" />
            ))}
          </div>
          <span className="text-xs uppercase tracking-widest text-white font-bold">
            Note Moyenne : 5.0 / 5.0 (Avis Google & Directs Vérifiés)
          </span>
        </div>
      </div>
    </section>
  );
};
