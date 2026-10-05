import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FormulasSection } from './components/FormulasSection';
import { AddonsSection } from './components/AddonsSection';
import { BookingSection } from './components/BookingSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { LegalModal } from './components/LegalModal';
import { StickyMobileBar } from './components/StickyMobileBar';
import { BeforeAfter } from './components/BeforeAfter';
import { VehicleType, Category } from './types';
import { Phone, Mail, MessageSquare, Instagram, Music2, ArrowUpRight } from 'lucide-react';

export const PAGES = {
 '/': { title: 'Lavage auto à Orange', heading: 'Lavage auto à Orange' },
 '/formules/': { title: 'Formules et tarifs de lavage auto à Orange', heading: 'Nos formules de nettoyage automobile' },
 '/options/': { title: 'Options de nettoyage automobile à Orange', heading: 'Des soins adaptés à votre véhicule' },
 '/realisations-avis/': { title: 'Réalisations et avis Clean’R Auto à Orange', heading: 'Nos réalisations & vos avis' },
 '/faq/': { title: 'Questions sur le lavage auto à domicile à Orange', heading: 'Vos questions, nos réponses' },
 '/contact/': { title: 'Contact et réservation Clean’R Auto à Orange', heading: 'Contactez Clean’R Auto' },
};
export default function App({ page = '/' }: { page?: string }) {
 const [legal, setLegal] = useState(false);
 const [addons, setAddons] = useState<string[]>([]);
 const [booking, setBooking] = useState({formula: 'int-prestige', vehicle: 'citadine' as VehicleType, addons: [] as string[], city: 'Orange'});
 useEffect(() => {
  const query = new URLSearchParams(window.location.search);
  if (page === '/contact/') setBooking({formula: query.get('formule') || 'int-prestige', vehicle: (query.get('vehicule') || 'citadine') as VehicleType, addons: query.getAll('option'), city: query.get('ville') || 'Orange'});
 }, [page]);
 const reserve = (formula?: string, _category?: Category, vehicle?: VehicleType) => {
  if (page === '/contact/' && !formula) { document.getElementById('contact')?.scrollIntoView({behavior:'smooth'}); return; }
  const query = new URLSearchParams();
  if (formula) query.set('formule', formula);
  if (vehicle) query.set('vehicule', vehicle);
  addons.forEach(id => query.append('option', id));
  window.location.assign('/contact/' + (query.size ? '?' + query : ''));
 };
 const info = PAGES[page as keyof typeof PAGES] || PAGES['/'];
 return <div className="min-h-screen bg-[#0b0c0e] text-[#e2e8f0]">
  <Header onOpenBooking={() => reserve()} />
  <main>
   {page === '/' ? <><Hero onOpenBooking={() => reserve()} /><section className="max-w-6xl mx-auto px-5 py-14 grid md:grid-cols-3 gap-5">
    {[['/formules/', 'Formules & tarifs', 'Nettoyage intérieur, extérieur ou complet : choisissez la formule adaptée à votre voiture.'], ['/realisations-avis/', 'Réalisations & avis', 'Découvrez le résultat d’une intervention avec notre comparateur avant / après.'], ['/contact/', 'Contact & réservation', 'Appelez-nous ou échangez directement sur WhatsApp pour préparer votre nettoyage.']].map(([href,title,text]) => <a key={href} href={href} className="glass-card rounded-xl p-6 hover:border-[#25D366] transition-colors"><h2 className="text-2xl text-white mb-3">{title}</h2><p className="text-sm text-gray-300 leading-relaxed">{text}</p><ArrowUpRight className="mt-5 w-5 h-5 text-[#25D366]" /></a>)}
   </section></> : <section className="pt-32 pb-8 px-5 text-center max-w-5xl mx-auto"><a href="/" className="text-xs text-[#25D366] uppercase tracking-widest">Clean’R Auto • Orange 84100</a><h1 className="font-serif-luxury text-4xl sm:text-6xl text-white mt-5">{info.heading}</h1></section>}
   {page === '/formules/' && <FormulasSection onSelectFormula={reserve} />}
   {page === '/options/' && <AddonsSection selectedAddonIds={addons} onToggleAddon={id => setAddons(current => current.includes(id) ? current.filter(x => x !== id) : [...current, id])} onOpenBookingWithOptions={() => reserve()} />}
   {page === '/faq/' && <FaqSection />}
   {page === '/realisations-avis/' && <><BeforeAfter /><section className="max-w-3xl mx-auto text-center px-5 py-14"><h2 className="text-3xl text-white mb-5">Les avis de nos clients</h2><a className="inline-flex items-center gap-2 border border-[#25D366]/40 rounded px-6 py-4 text-[#25D366]" href="https://www.google.com/maps/search/?api=1&query=Clean%27R%20Auto%20Orange%2006%2017%2020%2005%2016" target="_blank" rel="noopener noreferrer">Consulter nos avis sur Google <ArrowUpRight className="w-4 h-4" /></a></section></>}
   {page === '/contact/' && <>
    <section className="max-w-4xl mx-auto px-5 pt-5 pb-8">
     <div className="grid sm:grid-cols-3 gap-4">
      {[{href:'tel:0617200516', icon:Phone, label:'Téléphone', text:'06 17 20 05 16'}, {href:'https://wa.me/33617200516', icon:MessageSquare, label:'WhatsApp', text:'Écrivez-nous directement'}, {href:'mailto:contact@cleanrauto.fr', icon:Mail, label:'Email', text:'contact@cleanrauto.fr'}].map(({href,icon:Icon,label,text}) => <a key={label} href={href} className="glass-card p-5 rounded-xl text-center flex flex-col items-center gap-3"><Icon className="w-6 h-6 text-[#25D366]" /><span className="text-white font-medium">{label}</span><span className="text-sm break-all text-gray-300">{text}</span></a>)}
     </div>
     <div className="flex justify-center items-center gap-6 mt-7">
      <a href="https://www.instagram.com/clean.r.auto/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 p-3 text-sm"><Instagram className="w-6 h-6 text-[#25D366]" />Instagram</a>
      <a href="https://www.tiktok.com/@cleanr.auto" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 p-3 text-sm"><Music2 className="w-6 h-6 text-[#25D366]" />TikTok</a>
     </div>
    </section>
    <BookingSection key={JSON.stringify(booking)} initialFormulaId={booking.formula} initialVehicleType={booking.vehicle} initialAddonIds={booking.addons} initialCityName={booking.city} />
   </>}
  </main>
  <Footer onOpenLegal={() => setLegal(true)} onOpenBooking={() => reserve()} />
  <StickyMobileBar onOpenBooking={() => reserve()} />
  <LegalModal isOpen={legal} onClose={() => setLegal(false)} />
 </div>;
}
