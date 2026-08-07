import React from 'react';
import { REVIEWS } from '../data/reviews';
import { Star, Quote, MapPin } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="avis" className="py-20 bg-[#0e1015] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-light text-white tracking-tight mb-4">
            L'avis de nos <span className="green-gradient-text">clients</span>
          </h2>
          <div className="w-16 h-[1px] bg-[#25D366]/50 mx-auto mb-4" />
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            Propriétaires de véhicules de prestige, dirigeants d'entreprises et passionnés d'automobile partagent leur expérience avec Clean'R Auto.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="glass-card rounded-xl p-5 sm:p-6 border border-white/10 hover:border-[#25D366]/40 transition-all duration-300 relative group flex flex-col justify-between"
            >
              <div>
                {/* Top Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#25D366] text-[#25D366]" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#25D366]/20 group-hover:text-[#25D366]/40 transition-colors" />
                </div>

                {/* Title & Comment */}
                <h3 className="text-base font-serif-luxury font-bold text-white mb-2">
                  "{review.title}"
                </h3>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4">
                  "{review.comment}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
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
      </div>
    </section>
  );
};

