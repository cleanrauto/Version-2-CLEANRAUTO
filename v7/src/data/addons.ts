import { AddonOption } from '../types';

export const ADDONS: AddonOption[] = [
  {
    id: 'seat-shampoo-front',
    name: 'Shampouinage Sièges Avant (+15€)',
    tagline: 'Nettoyage injecteur-extracteur des 2 sièges avant',
    price: 15,
    description: 'Extraction en profondeur des salissures, auréoles et taches incrustées sur les sièges avant (+15€).',
    icon: 'Droplets',
    badge: '+15€ Avant',
  },
  {
    id: 'seat-shampoo-rear',
    name: 'Shampouinage Sièges Arrière (+15€)',
    tagline: 'Nettoyage injecteur-extracteur de la banquette arrière',
    price: 15,
    description: 'Extraction en profondeur des salissures et taches incrustées sur la banquette / sièges arrière (+15€).',
    icon: 'Droplets',
    badge: '+15€ Arrière',
  },
  {
    id: 'ext-essentiel-option',
    name: 'Formule Extérieur ESSENTIEL (Option)',
    tagline: 'Ajoutez le lavage extérieur rapide à votre formule intérieure',
    price: 20,
    description: 'Prélavage mousse active, lavage manuel de la carrosserie, jantes et séchage microfibre.',
    icon: 'Sparkles',
  },
  {
    id: 'ext-premium-option',
    name: 'Formule Extérieur PREMIUM (Option)',
    tagline: 'Ajoutez la formule extérieure complète avec cire et décontamination',
    price: 35,
    description: 'Comprend la décontamination ferreuse, la pose de cire express, passages de roues et dressing pneus.',
    icon: 'ShieldCheck',
  },
  {
    id: 'dog-hair',
    name: 'Traitement Poils de Chien / Animaux',
    tagline: 'Élimination brossée et aspirée spécifique des poils incrustés',
    price: 10,
    description: 'Brossage spécial électrostatique des moquettes et coffre pour retirer intégralement les poils d\'animaux tenaces.',
    icon: 'Wind',
  },
];
