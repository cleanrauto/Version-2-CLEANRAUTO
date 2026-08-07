import { ReviewItem, FaqItem } from '../types';

export const REVIEWS: ReviewItem[] = [
  {
    id: '1',
    author: 'Alexandre M.',
    location: 'Orange (84100)',
    vehicle: 'Volkswagen Golf 8',
    rating: 5,
    date: 'Il y a 1 semaine',
    title: 'Service très pratique sur mon lieu de travail',
    comment: 'Clean\'R Auto est intervenu directement sur le parking de mon entreprise pendant mes réunions. Retrouver ma Golf 8 impeccable, habitacle propre et cuirs bien nourris sans perdre de temps. Très satisfait du service.',
    formulaUsed: 'La Prestige Intérieur',
  },
  {
    id: '2',
    author: 'Mathieu V.',
    location: 'Châteauneuf-du-Pape',
    vehicle: 'Range Rover Autobiography',
    rating: 5,
    date: 'Il y a 3 semaines',
    title: 'Qualité digne d\'un vrai professionnel',
    comment: 'J\'ai testé la formule Prestige Intérieur pour mon Range Rover suite à des vacances en famille. Les cuirs sont ressortis mats et le véhicule est comme neuf, tout juste sorti de concession malgré ses quelques années. Travail très soigné.',
    formulaUsed: 'La Prestige Intérieur',
  },
  {
    id: '3',
    author: 'Élodie & Laurent B.',
    location: 'Montélimar',
    vehicle: 'Porsche Taycan',
    rating: 5,
    date: 'Il y a 1 mois',
    title: 'Très belle prestation sur notre Taycan',
    comment: 'Le Pack Intégral Prestige réalisé sur notre Taycan à Montélimar est parfait. Habitacle comme neuf, cuirs bien entretenus et carrosserie très brillante. Ponctualité remarquable et matériel professionnel.',
    formulaUsed: 'Pack Intégral Prestige',
  },
  {
    id: '4',
    author: 'Élodie K.',
    location: 'Montfavet',
    vehicle: 'MINI Cooper S',
    rating: 5,
    date: 'Il y a 1 mois',
    title: 'Très satisfaite de la prestation',
    comment: 'Nettoyage intérieur impeccable sur ma MINI Cooper S à Montfavet avec la formule Prestige Intérieur. Les moindres détails et les sièges sont ressortis très propres. Service à domicile très pratique et intervenant très professionnel.',
    formulaUsed: 'La Prestige Intérieur',
  },
];

export const FAQS: FaqItem[] = [
  {
    category: 'Logistique & Déplacement',
    question: 'Avez-vous besoin d\'eau ou d\'électricité sur place ?',
    answer: 'Nous avons besoin d\'une prise de courant standard pour toute formule. De plus, si vous optez pour une formule avec lavage extérieur, une prise d\'eau accessible standard est également requise.',
  },
  {
    category: 'Logistique & Déplacement',
    question: 'Quelles sont les villes couvertes sans frais supplémentaires ?',
    answer:
      'Les frais de déplacement sont entièrement offerts dans un rayon de 10 km autour d\'Orange (Orange, Piolenc, Camaret-sur-Aigues, Courthézon, Sérignan-du-Comtat, Châteauneuf-du-Pape et Jonquières). Au-delà de 10 km, un tarif de 0,60€ par kilomètre supplémentaire est appliqué.',
  },
  {
    category: 'Soin & Matériaux',
    question: 'Quels produits utilisez-vous pour les cuirs et carrosseries d\'exception ?',
    answer: 'Nous sélectionnons exclusivement des formules haut de gamme biodégradables, pH neutres et certifiées detailing (Gtechniq, Koch Chemie, Colourlock, Swissvax). Chaque matière (cuir Nappa, Alcantara, carbone, vernis céramique) reçoit un soin spécifique dédié sans risque d\'altération.',
  },
  {
    category: 'Météo & Réservation',
    question: 'Que se passe-t-il en cas de mauvais temps ou de pluie le jour de l\'intervention ?',
    answer: 'Si votre véhicule est garé sous abri ou dans un garage couvert, l\'intervention se déroule normalement. Si le véhicule est en extérieur et qu\'une météo capricieuse survient, nous vous recontactons immédiatement pour décaler le rendez-vous sans le moindre frais.',
  },
  {
    category: 'Paiement & Facturation',
    question: 'Quels sont les moyens de paiement acceptés ?',
    answer: 'Nous acceptons la Carte Bancaire (terminal TPE mobile sécurisé), les virements instantanés, les espèces ainsi que les paiements sur facture pour les professionnels et flottes d\'entreprise. Une facture détaillée vous est transmise après chaque soin.',
  },
  {
    category: 'Assurance & Sécurité',
    question: 'Votre intervention est-elle assurée pour les véhicules de luxe et supercars ?',
    answer: 'Absolument. Clean\'R Auto bénéficie d\'une assurance Responsabilité Civile Professionnelle spécifique à la préparation et au soin de véhicules de prestige et de collection. Votre véhicule est manipulé avec le plus grand respect.',
  },
];
