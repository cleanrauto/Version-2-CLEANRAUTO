# Emails de réservation Clean’R Auto

Le formulaire appelle `/.netlify/functions/booking-email`. Les deux modèles HTML et texte sont définis dans `netlify/functions/booking-email.mts` : couleurs, textes, coordonnées, objets et récapitulatif sont personnalisables dans le dépôt.

## Activation avant publication

1. Configurer le compte Brevo et son service d’emails transactionnels.
2. Vérifier l’expéditeur `contact@cleanrauto.fr` et authentifier le domaine avec les enregistrements fournis par Brevo. Conserver les enregistrements de messagerie existants.
3. Ajouter dans Netlify, pour les Functions uniquement, `BREVO_API_KEY`, `BOOKING_SENDER_EMAIL` (expéditeur vérifié) et `BOOKING_OWNER_EMAIL` (boîte recevant les devis). Aucune clé ne doit être ajoutée au dépôt ni aux variables VITE publiques.
4. Déployer en aperçu, puis envoyer une demande de test autorisée vers les boîtes du propriétaire. Vérifier réception, récapitulatif, réponses et courrier indésirable. Les tests locaux simulent l’API et ne prouvent pas la délivrabilité.
5. Publier après validation de ce test. Formspree reste utilisé en production jusqu’à cette bascule.

## Comportement

- Tarifs des formules et options recalculés côté serveur depuis les données du site. Frais calculés à 0,65 €/km au-delà de 10 km, selon la distance déclarée par le calculateur du navigateur. Il s’agit d’une estimation à confirmer, pas d’une vérification routière indépendante côté serveur.
- Validation des champs, contenu échappé, champ anti-robot et limite native Netlify de 3 requêtes par IP/domaine sur 180 secondes.
- Notification propriétaire envoyée en premier. Une erreur de ce premier envoi ne doit pas afficher une réussite.
- Si seule la confirmation client échoue, la demande reste reçue et le client est informé sans être invité à soumettre une seconde fois.
- L’acceptation par l’API ne garantit pas la livraison finale en boîte de réception. Consulter les journaux transactionnels Brevo pour les rejets ultérieurs.
- Aucun accusé de réception automatique ne confirme le rendez-vous.

## Vérifications

`npm run lint`

`npm run build`

`node --import tsx --test tests/booking-email.test.mts`

## Fichier clients automatique
Chaque demande POST validée enregistre un contact Brevo avant les emails. La liste « Clients site Clean’R Auto » a l’ID 5. Attributs texte existants : NOM, PRENOM, VEHICULE, VILLE, TELEPHONE. Ville et téléphone proviennent de chaque demande ; TELEPHONE conserve le numéro tel que saisi sans inscription SMS. Le formulaire collecte nom et prénom séparément. Les anciens formulaires conservent le nom complet dans NOM, sans deviner son découpage.
L’email normalisé identifie la fiche (`updateEnabled: true`) : les demandes suivantes actualisent le véhicule sans doublon. Aucun consentement marketing ni statut de blocage n’est modifié. Un échec d’enregistrement retourne une erreur au formulaire, sans annoncer une réception réussie. La liste est exportable depuis Brevo ; les téléchargements sont des copies à la date de l’export.
