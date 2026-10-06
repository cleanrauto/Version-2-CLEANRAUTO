import { ReviewItem, FaqItem } from '../types';

// Transcribed from the original client-provided Google review screenshots.
// Giuseppe's screenshot ends at Google’s “Plus” link; only the visible text is reproduced.
export const REVIEWS: ReviewItem[] = [
 { id: 'celia', author: 'Célia', rating: 5, date: 'Visité en septembre', location: '', vehicle: '', title: '', formulaUsed: '', comment: 'Super prestation ! Travail sérieux, soigné et professionnel. La voiture est ressortie vraiment impeccable, avec beaucoup d’attention portée aux détails. On voit que le travail est fait avec soin et passion. Ponctuel, sympathique et très sérieux, je recommande sans hésiter ses services pour un nettoyage de qualité' },
 { id: 'giuseppe', author: 'Giuseppe R.', rating: 5, date: 'Visité en septembre', location: '', vehicle: '', title: '', formulaUsed: '', comment: 'J’ai confié mon véhicule pour un nettoyage intérieur complet et le résultat est bluffant. Les sièges ont retrouvé leur éclat d’origine. Si vous cherchez un vrai spécialiste du nettoyage auto à domicile près d’orange, foncez chez Clean R Auto !' },
 { id: 'corentin', author: 'Corentin F.', rating: 5, date: '', location: '', vehicle: '', title: '', formulaUsed: '', comment: 'Je fais appel à ses services régulièrement depuis plusieurs semaines pour plusieurs véhicules et j’en suis toujours aussi content.\n\nIl est ponctuel, professionnel et le travail est toujours très bien réalisé. La qualité est constante et le résultat est impeccable à chaque passage.\n\nJe recommande vivement !' },
 { id: 'lucie', author: 'Lucie M.', rating: 5, date: 'Visité en septembre', location: '', vehicle: '', title: '', formulaUsed: '', comment: 'Une prestation bien au dessus de mes attentes. Sans trop d’espoir pour ma voiture, j’ai eu le plaisir de retrouver une voiture sortie de concession. On ne se lasse jamais du résultat. Le tout avec une amabilité remarquable. Je recommande ! À bientôt pour de nouveaux lavages.' },
];

export const FAQS: FaqItem[] = [
  {
    category: 'Logistique & Déplacement',
    question: 'Avez-vous besoin d\'eau ou d\'électricité sur place ?',
    answer: 'Nous avons besoin d\'une prise de courant standard pour toute formule. De plus, si vous optez pour une formule avec lavage extérieur, une prise d\'eau accessible standard est également requise.',
  },
  {
    category: 'Logistique & Déplacement',
    question: 'Comment sont calculés les frais de déplacement ?',
    answer:
      "Nous intervenons à Orange et aux alentours. Les 10 premiers kilomètres du trajet routier aller depuis le centre-ville d’Orange sont offerts. Au-delà, les frais sont de 0,60 € par kilomètre supplémentaire. Le calcul utilise l’adresse choisie lors de la réservation et le trajet routier le plus court, plutôt que le centre de votre commune.",
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
