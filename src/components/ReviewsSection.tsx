import React from 'react';
import { REVIEWS } from '../data/reviews';
import { Star, Quote, ArrowUpRight } from 'lucide-react';

const googleReviewsUrl = "https://www.google.com/maps/search/?api=1&query=Clean%27R%20Auto%20Orange%2006%2017%2020%2005%2016";
export function ReviewsSection() {
 return <section id="avis" className="py-16 sm:py-20 bg-[#0e1015] border-t border-white/5">
  <div className="max-w-6xl mx-auto px-5 sm:px-6">
   <div className="text-center mb-10"><span className="text-xs uppercase tracking-[0.22em] text-[#25D366]">Leurs mots, notre travail</span><h2 className="font-serif-luxury text-3xl sm:text-5xl text-white mt-3">Vos avis sur <span className="green-gradient-text">Clean’R Auto</span></h2></div>
   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
    {REVIEWS.map(review => <article key={review.id} className="glass-card rounded-xl p-6 sm:p-8 flex flex-col">
     <div className="flex items-center justify-between mb-5"><div className="flex gap-1" aria-label="5 étoiles sur 5">{Array.from({length:5}, (_,i) => <Star key={i} className="w-4 h-4 fill-[#25D366] text-[#25D366]" aria-hidden="true" />)}</div><Quote className="w-7 h-7 text-[#25D366]/25" aria-hidden="true" /></div>
     <blockquote className="text-sm sm:text-base text-gray-200 leading-relaxed whitespace-pre-line flex-1">{review.comment}</blockquote>
     <div className="border-t border-white/10 mt-6 pt-4 flex items-center justify-between gap-4"><span className="font-medium text-white">{review.author}</span><span className="text-xs text-[#25D366] text-right">Avis Google · 5/5 étoiles</span></div>
    </article>)}
   </div>
   <div className="text-center mt-9"><a href={googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 border border-[#25D366]/40 rounded text-sm text-[#25D366] hover:bg-[#25D366]/10">Tous nos avis sur Google <ArrowUpRight className="w-4 h-4" /></a></div>
  </div>
 </section>;
}
