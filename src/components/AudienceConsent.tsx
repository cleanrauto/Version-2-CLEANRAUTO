import React, { useEffect, useState } from 'react';
import { initializeAudience, savedAudienceChoice, setAudienceChoice } from '../utils/analytics';

export function AudienceConsent({ onOpenPrivacy }: { onOpenPrivacy: () => void }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    initializeAudience();
    setOpen(savedAudienceChoice() === null);
  }, []);
  const choose = (choice: 'accepted' | 'refused') => { setAudienceChoice(choice); setOpen(false); };
  return <>
    <button onClick={() => setOpen(true)} className="underline hover:text-[#25D366] cursor-pointer">Gérer les cookies</button>
    {open && <section aria-label="Choix des cookies de mesure d’audience" className="fixed z-[70] bottom-20 sm:bottom-5 left-3 right-3 sm:left-auto sm:right-5 sm:max-w-lg bg-[#101316] text-gray-200 border border-[#25D366]/40 rounded-xl p-5 shadow-2xl text-left text-sm leading-relaxed max-h-[70vh] overflow-y-auto">
      <h2 className="text-base font-bold text-white mb-2">Mesure d’audience</h2>
      <p>Avec votre accord, Clean’R Auto utilise Google Analytics pour mesurer les visites, les clics de contact et les demandes envoyées. Les champs de votre formulaire ne sont pas transmis à Analytics. Refuser n’empêche pas de réserver.</p>
      <p className="mt-2 text-xs text-gray-300">Votre choix est conservé 6 mois. Vous pouvez le modifier à tout moment via « Gérer les cookies » en bas de page.</p>
      <button onClick={onOpenPrivacy} className="underline text-[#25D366] mt-2">En savoir plus sur la confidentialité</button>
      <div className="grid grid-cols-2 gap-3 mt-4">
        <button onClick={() => choose('refused')} className="rounded-lg border border-gray-400 px-4 py-3 text-white bg-[#171b20] font-semibold hover:border-[#25D366] focus-visible:outline-2 focus-visible:outline-[#25D366]">Refuser</button>
        <button onClick={() => choose('accepted')} className="rounded-lg border border-gray-400 px-4 py-3 text-white bg-[#171b20] font-semibold hover:border-[#25D366] focus-visible:outline-2 focus-visible:outline-[#25D366]">Accepter</button>
      </div>
    </section>}
  </>;
}
