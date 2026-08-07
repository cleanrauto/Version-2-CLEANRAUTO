import { InterventionCity } from '../types';

export const BASE_FREE_RADIUS_KM = 10;
export const COST_PER_EXTRA_KM = 0.60;
export const ORANGE_COORDS = { lat: 44.1381, lon: 4.8078 }; // Orange (84100)

/**
 * Calcul du montant des frais de déplacement :
 * - Gratuit (0€) jusqu'à 10 km autour d'Orange
 * - 0,60€ par kilomètre supplémentaire au-delà de 10 km
 */
export function calculateDisplacementFee(distanceKm: number): number {
  if (distanceKm <= BASE_FREE_RADIUS_KM) {
    return 0;
  }
  const extraKm = distanceKm - BASE_FREE_RADIUS_KM;
  return Math.round(extraKm * COST_PER_EXTRA_KM * 100) / 100;
}

/**
 * Calcule la distance routière estimée (en km) depuis Orange (84100)
 * basée sur les coordonnées GPS (formule de Haversine + coefficient de tracé routier de 1.25)
 */
export function calculateDistanceKmFromOrange(lat: number, lon: number): number {
  const R = 6371; // Rayon de la Terre en km
  const dLat = ((lat - ORANGE_COORDS.lat) * Math.PI) / 180;
  const dLon = ((lon - ORANGE_COORDS.lon) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((ORANGE_COORDS.lat * Math.PI) / 180) *
      Math.cos((lat * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const straightDistance = R * c;

  if (straightDistance < 1) return 0;
  // Facteur routier réaliste (tracé des routes françaises)
  return Math.round(straightDistance * 1.22);
}

export function formatFeeNote(distanceKm: number, fee: number): string {
  if (fee === 0) {
    return `Zone Cœur (${distanceKm} km) — Déplacement offert (< 10 km)`;
  }
  const extraKm = Math.max(0, distanceKm - BASE_FREE_RADIUS_KM);
  return `${distanceKm} km (${extraKm} km sup. × 0,60€/km)`;
}

// Communes phares pré-configurées (Vaucluse, Gard, Drôme, Bouches-du-Rhône)
export const INTERVENTION_CITIES: InterventionCity[] = [
  // Frais 0€ — Rayon de 10 km (Frais de déplacement offerts)
  {
    name: 'Orange',
    zipCode: '84100',
    fee: 0,
    freeLimitNote: 'Zone Cœur — Frais offerts (< 10 km)',
    distanceKm: 0,
  },
  {
    name: 'Piolenc',
    zipCode: '84420',
    fee: 0,
    freeLimitNote: 'Zone Cœur — Frais offerts (< 10 km)',
    distanceKm: 6,
  },
  {
    name: 'Camaret-sur-Aigues',
    zipCode: '84850',
    fee: 0,
    freeLimitNote: 'Zone Cœur — Frais offerts (< 10 km)',
    distanceKm: 7,
  },
  {
    name: 'Courthézon',
    zipCode: '84350',
    fee: 0,
    freeLimitNote: 'Zone Cœur — Frais offerts (< 10 km)',
    distanceKm: 8,
  },
  {
    name: 'Châteauneuf-du-Pape',
    zipCode: '84230',
    fee: 0,
    freeLimitNote: 'Zone Cœur — Frais offerts (< 10 km)',
    distanceKm: 9,
  },
  // Communes environnantes (0,60€/km au-delà de 10 km)
  {
    name: 'Uchaux',
    zipCode: '84100',
    fee: calculateDisplacementFee(11),
    freeLimitNote: 'Calculé à 0,60€/km au-delà de 10 km',
    distanceKm: 11,
  },
  {
    name: 'Mornas',
    zipCode: '84550',
    fee: calculateDisplacementFee(12),
    freeLimitNote: 'Calculé à 0,60€/km au-delà de 10 km',
    distanceKm: 12,
  },
  {
    name: 'Bédarrides',
    zipCode: '84370',
    fee: calculateDisplacementFee(14),
    freeLimitNote: 'Calculé à 0,60€/km au-delà de 10 km',
    distanceKm: 14,
  },
  {
    name: 'Roquemaure (Gard)',
    zipCode: '30150',
    fee: calculateDisplacementFee(14),
    freeLimitNote: 'Gard (30) — 0,60€/km au-delà de 10 km',
    distanceKm: 14,
  },
  {
    name: 'Saint-Laurent-des-Arbres (Gard)',
    zipCode: '30126',
    fee: calculateDisplacementFee(16),
    freeLimitNote: 'Gard (30) — 0,60€/km au-delà de 10 km',
    distanceKm: 16,
  },
  {
    name: 'Sorgues',
    zipCode: '84700',
    fee: calculateDisplacementFee(18),
    freeLimitNote: 'Calculé à 0,60€/km au-delà de 10 km',
    distanceKm: 18,
  },
  {
    name: 'Suze-la-Rousse (Drôme)',
    zipCode: '26790',
    fee: calculateDisplacementFee(18),
    freeLimitNote: 'Drôme (26) — 0,60€/km au-delà de 10 km',
    distanceKm: 18,
  },
  {
    name: 'Entraigues-sur-la-Sorgue',
    zipCode: '84320',
    fee: calculateDisplacementFee(20),
    freeLimitNote: 'Calculé à 0,60€/km au-delà de 10 km',
    distanceKm: 20,
  },
  {
    name: 'Vedène / Avignon Nord',
    zipCode: '84270',
    fee: calculateDisplacementFee(22),
    freeLimitNote: 'Calculé à 0,60€/km au-delà de 10 km',
    distanceKm: 22,
  },
  {
    name: 'Carpentras',
    zipCode: '84200',
    fee: calculateDisplacementFee(23),
    freeLimitNote: 'Calculé à 0,60€/km au-delà de 10 km',
    distanceKm: 23,
  },
  {
    name: 'Bollène',
    zipCode: '84500',
    fee: calculateDisplacementFee(24),
    freeLimitNote: 'Calculé à 0,60€/km au-delà de 10 km',
    distanceKm: 24,
  },
  {
    name: 'Bagnols-sur-Cèze (Gard)',
    zipCode: '30200',
    fee: calculateDisplacementFee(26),
    freeLimitNote: 'Gard (30) — 0,60€/km au-delà de 10 km',
    distanceKm: 26,
  },
  {
    name: 'Villeneuve-lès-Avignon (Gard)',
    zipCode: '30400',
    fee: calculateDisplacementFee(26),
    freeLimitNote: 'Gard (30) — 0,60€/km au-delà de 10 km',
    distanceKm: 26,
  },
  {
    name: 'Avignon',
    zipCode: '84000',
    fee: calculateDisplacementFee(27),
    freeLimitNote: 'Calculé à 0,60€/km au-delà de 10 km',
    distanceKm: 27,
  },
  {
    name: 'Pierrelatte (Drôme)',
    zipCode: '26700',
    fee: calculateDisplacementFee(30),
    freeLimitNote: 'Drôme (26) — 0,60€/km au-delà de 10 km',
    distanceKm: 30,
  },
  {
    name: 'Châteaurenard (13)',
    zipCode: '13160',
    fee: calculateDisplacementFee(32),
    freeLimitNote: 'Bouches-du-Rhône (13) — 0,60€/km au-delà de 10 km',
    distanceKm: 32,
  },
  {
    name: 'Cavaillon',
    zipCode: '84300',
    fee: calculateDisplacementFee(40),
    freeLimitNote: 'Calculé à 0,60€/km au-delà de 10 km',
    distanceKm: 40,
  },
  {
    name: 'Montélimar (Drôme)',
    zipCode: '26200',
    fee: calculateDisplacementFee(48),
    freeLimitNote: 'Drôme (26) — 0,60€/km au-delà de 10 km',
    distanceKm: 48,
  },
];

interface GeoApiCommune {
  nom: string;
  code: string;
  codesPostaux?: string[];
  codePostal?: string;
  centre?: {
    type: string;
    coordinates: [number, number]; // [lon, lat]
  };
  departement?: {
    code: string;
    nom: string;
  };
  population?: number;
}

/**
 * Recherche dynamique de n'importe quelle commune en France
 * via l'API officielle française (geo.api.gouv.fr)
 * avec calcul automatique instantané de la distance depuis Orange (84100) et des frais
 */
export async function searchFrenchCommunesOnline(query: string): Promise<InterventionCity[]> {
  const trimmed = query.trim();
  if (!trimmed || trimmed.length < 2) {
    return [];
  }

  // Si c'est un code postal (chiffres)
  const isZip = /^[0-9]+$/.test(trimmed);
  const endpoint = isZip
    ? `https://geo.api.gouv.fr/communes?codePostal=${encodeURIComponent(trimmed)}&fields=nom,code,codesPostaux,centre,departement&boost=population&limit=10`
    : `https://geo.api.gouv.fr/communes?nom=${encodeURIComponent(trimmed)}&fields=nom,code,codesPostaux,centre,departement&boost=population&limit=10`;

  try {
    const res = await fetch(endpoint);
    if (!res.ok) {
      throw new Error(`API error: ${res.statusText}`);
    }
    const data: GeoApiCommune[] = await res.json();

    return data.map((commune) => {
      const zipCode = (commune.codesPostaux && commune.codesPostaux[0]) || commune.codePostal || '';
      const dept = commune.departement ? ` (${commune.departement.code})` : '';
      const fullName = `${commune.nom}${dept}`;

      let distanceKm = 10;
      if (commune.centre && commune.centre.coordinates) {
        const [lon, lat] = commune.centre.coordinates;
        distanceKm = calculateDistanceKmFromOrange(lat, lon);
      }

      const fee = calculateDisplacementFee(distanceKm);
      const freeLimitNote = formatFeeNote(distanceKm, fee);

      return {
        name: fullName,
        zipCode,
        fee,
        freeLimitNote,
        distanceKm,
      };
    });
  } catch (err) {
    console.warn('Erreur lors de la recherche de commune en ligne:', err);
    // Fallback : filtrer la liste locale
    return INTERVENTION_CITIES.filter(
      (c) =>
        c.name.toLowerCase().includes(trimmed.toLowerCase()) ||
        c.zipCode.includes(trimmed)
    );
  }
}
