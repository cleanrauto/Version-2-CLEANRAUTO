import before from '../assets/images/utilitaire-interieur-avant.webp';
import after from '../assets/images/utilitaire-interieur-apres.webp';

import renaultBefore from '../assets/images/utilitaire-renault-avant.webp';
import renaultAfter from '../assets/images/utilitaire-renault-apres.webp';

const comparisons = [
  { title: 'Premier utilitaire', photos: [
    { src: before, label: 'Avant', alt: 'Habitacle de l’utilitaire avant nettoyage, avec le plancher et le marchepied encrassés' },
    { src: after, label: 'Après', alt: 'Habitacle de l’utilitaire après nettoyage, vu depuis la porte passager' },
  ] },
  { title: 'Utilitaire Renault', photos: [
    { src: renaultBefore, label: 'Avant', alt: 'Poste de conduite de l’utilitaire Renault avant nettoyage, avec le plancher encrassé' },
    { src: renaultAfter, label: 'Après', alt: 'Poste de conduite de l’utilitaire Renault après nettoyage, avec le plancher propre' },
  ] },
];

export function UtilityRealisation() {
  return (
    <section className="border-b border-white/10 bg-[#0b0c0e] px-5 py-16 sm:py-20" aria-labelledby="utility-title">
      <div className="mx-auto max-w-5xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#25D366]">
          Artisans & entreprises · Orange et alentours
        </p>
        <h2 id="utility-title" className="font-serif-luxury text-3xl text-white sm:text-5xl">
          Remise à neuf de l’intérieur de vos utilitaires
        </h2>
        <p className="mt-5 max-w-2xl leading-relaxed text-gray-300">
          Poussière de chantier, traces de boue, sièges et tapis encrassés. Clean’R Auto remet
          en état l’habitacle de vos utilitaires et intervient directement sur le site de
          votre entreprise, pour un véhicule ou toute une flotte.
        </p>
        {comparisons.map(({ title, photos }) => (
          <div key={title} className="mt-8">
            <h3 className="font-serif-luxury text-2xl text-white">{title}</h3>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:gap-5">
              {photos.map(({ src, label, alt }) => (
                <figure key={label} className="relative aspect-[710/946] overflow-hidden rounded-2xl border border-white/15 bg-black">
                  <img src={src} alt={alt} width={710} height={1536} loading="lazy" className="h-full w-full object-cover object-center" />
                  <figcaption className="absolute left-2 top-2 rounded bg-black/85 px-3 py-2 text-xs font-bold uppercase tracking-widest text-white sm:left-4 sm:top-4">
                    {label}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        ))}
        <a href="/contact/" className="green-gradient-bg mt-7 inline-block rounded-lg px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-black">
          Demander un devis professionnel
        </a>
      </div>
    </section>
  );
}
