import React from 'react';
import { X, Shield, FileText, Lock } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-card rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 border border-[#25D366]/40 relative bg-[#0e1015] shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <Shield className="w-6 h-6 text-[#25D366]" />
          <div>
            <h2 className="font-serif-luxury text-2xl font-bold text-white">Mentions Légales & CGV</h2>
            <p className="text-xs text-gray-400 font-light">Clean'R Auto — Soin Automobile Haut de Gamme</p>
          </div>
        </div>

        <div className="space-y-6 text-xs text-[#a0aab8] leading-relaxed font-light border-t border-white/10 pt-6">
          {/* Section 1 */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-2 flex items-center space-x-2">
              <FileText className="w-4 h-4 text-[#25D366]" />
              <span>1. Éditeur du Site & Exploitation</span>
            </h3>
            <p>
              Le site web Clean'R Auto est édité par la société Clean'R Auto, spécialisée dans le nettoyage et la rénovation esthétique automobile mobile.
              <br />
              <strong>Siège social :</strong> Orange (84100), France.
              <br />
              <strong>Directeur de la publication :</strong> Clean'R Auto.
              <br />
              <strong>Contact e-mail :</strong> contact@cleanrauto.fr | <strong>Téléphone :</strong> 06 17 20 05 16.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-2 flex items-center space-x-2">
              <Lock className="w-4 h-4 text-[#25D366]" />
              <span>2. Hébergement & Propriété Intellectuelle</span>
            </h3>
            <p>
              L'ensemble des contenus (textes, logos, photographies, vidéos, design system) présents sur ce site est protégé par les lois internationales relatives à la propriété intellectuelle. Toute reproduction non autorisée constitue une contrefaçon.
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-2">3. Conditions Générales de Vente (CGV)</h3>
            <p>
              • <strong>Prestations :</strong> Les interventions s'effectuent sur le lieu désigné par le client (domicile ou travail) à Orange et communes desservies.
              <br />
              • <strong>Équipements requis :</strong> Prévoir une prise de courant standard pour toute prestation, ainsi qu'un accès à un point d'eau pour les formules extérieures.
              <br />
              • <strong>Paiement :</strong> Le règlement s'effectue au terme de la prestation après vérification visuelle conjointe par Carte Bancaire, Virement instantané ou Espèces.
              <br />
              • <strong>Annulation :</strong> Toute annulation doit être formulée au moins 24 heures à l'avance sans frais.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-2">4. Protection des Données (RGPD)</h3>
            <p>
              Les informations collectées dans les formulaires de réservation (nom, téléphone, adresse, véhicule) servent exclusivement au traitement de votre demande de rendez-vous et ne sont jamais cédées ni vendues à des tiers.
            </p>
            <h3 className="text-sm font-semibold text-white mt-4 mb-2">Mesure d’audience et cookies</h3>
            <p>Avec votre consentement, Clean’R Auto utilise Google Analytics, fourni par Google, pour mesurer les visites et les actions sur le site : clics téléphone, WhatsApp et email, ainsi que les demandes dont la réception a été confirmée. Cette mesure est facultative et ne démarre pas avant votre acceptation. Les champs du formulaire et les coordonnées contenues dans les liens de contact ne sont pas envoyés à Analytics. La personnalisation publicitaire est désactivée.</p>
            <p className="mt-2">Votre choix et les cookies Analytics sont conservés au maximum 6 mois. Vous pouvez refuser ou retirer votre accord à tout moment avec « Gérer les cookies », en bas de chaque page ; le refus ne limite pas l’accès aux prestations ni au formulaire. Pour toute question sur vos données, contactez contact@cleanrauto.fr. Consultez également la <a href="https://policies.google.com/privacy?hl=fr" target="_blank" rel="noopener noreferrer" className="text-[#25D366] underline">politique de confidentialité de Google</a>.</p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-8 pt-4 border-t border-white/10 text-center">
          <button
            onClick={onClose}
            className="green-gradient-bg text-black font-semibold text-xs uppercase tracking-widest px-8 py-3 rounded-xl hover:brightness-110 transition-all cursor-pointer"
          >
            J'ai compris et j'accepte
          </button>
        </div>
      </div>
    </div>
  );
};
