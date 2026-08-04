import { InterventionCity } from '../types';

export const BASE_FREE_RADIUS_KM = 10;
export const COST_PER_EXTRA_KM = 0.60;

export function calculateDisplacementFee(distanceKm: number): number {
  if (distanceKm <= BASE_FREE_RADIUS_KM) {
    return 0;
  }
  const extraKm = distanceKm - BASE_FREE_RADIUS_KM;
  return Math.round(extraKm * COST_PER_EXTRA_KM * 100) / 100;
}

export const INTERVENTION_CITIES: InterventionCity[] = [
  // Vaucluse (84) - Cœur & Alentours Proches (< 10 km)
  {
    name: 'Orange',
    zipCode: '84100',
    fee: calculateDisplacementFee(0),
    freeLimitNote: 'Zone Cœur — Frais offerts (< 10 km)',
    distanceKm: 0,
  },
  {
    name: 'Piolenc',
    zipCode: '84420',
    fee: calculateDisplacementFee(6),
    freeLimitNote: 'Zone Cœur — Frais offerts (< 10 km)',
    distanceKm: 6,
  },
  {
    name: 'Camaret-sur-Aigues',
    zipCode: '84850',
    fee: calculateDisplacementFee(7),
    freeLimitNote: 'Zone Cœur — Frais offerts (< 10 km)',
    distanceKm: 7,
  },
  {
    name: 'Courthézon',
    zipCode: '84350',
    fee: calculateDisplacementFee(8),
    freeLimitNote: 'Zone Cœur — Frais offerts (< 10 km)',
    distanceKm: 8,
  },
  {
    name: 'Sérignan-du-Comtat',
    zipCode: '84830',
    fee: calculateDisplacementFee(8),
    freeLimitNote: 'Zone Cœur — Frais offerts (< 10 km)',
    distanceKm: 8,
  },
  {
    name: 'Châteauneuf-du-Pape',
    zipCode: '84230',
    fee: calculateDisplacementFee(9),
    freeLimitNote: 'Zone Cœur — Frais offerts (< 10 km)',
    distanceKm: 9,
  },
  {
    name: 'Jonquières',
    zipCode: '84150',
    fee: calculateDisplacementFee(10),
    freeLimitNote: 'Zone Cœur — Frais offerts (< 10 km)',
    distanceKm: 10,
  },

  // Vaucluse (84) - > 10 km (0.60€/km au-delà de 10km)
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
    name: 'Sorgues',
    zipCode: '84700',
    fee: calculateDisplacementFee(18),
    freeLimitNote: 'Calculé à 0,60€/km au-delà de 10 km',
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
    name: 'Avignon',
    zipCode: '84000',
    fee: calculateDisplacementFee(27),
    freeLimitNote: 'Calculé à 0,60€/km au-delà de 10 km',
    distanceKm: 27,
  },
  {
    name: 'Cavaillon',
    zipCode: '84300',
    fee: calculateDisplacementFee(40),
    freeLimitNote: 'Calculé à 0,60€/km au-delà de 10 km',
    distanceKm: 40,
  },

  // Gard (30)
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

  // Drôme (26)
  {
    name: 'Suze-la-Rousse (Drôme)',
    zipCode: '26790',
    fee: calculateDisplacementFee(18),
    freeLimitNote: 'Drôme (26) — 0,60€/km au-delà de 10 km',
    distanceKm: 18,
  },
  {
    name: 'Pierrelatte (Drôme)',
    zipCode: '26700',
    fee: calculateDisplacementFee(30),
    freeLimitNote: 'Drôme (26) — 0,60€/km au-delà de 10 km',
    distanceKm: 30,
  },
  {
    name: 'Montélimar (Drôme)',
    zipCode: '26200',
    fee: calculateDisplacementFee(48),
    freeLimitNote: 'Drôme (26) — 0,60€/km au-delà de 10 km',
    distanceKm: 48,
  },

  // Bouches-du-Rhône (13)
  {
    name: 'Châteaurenard (13)',
    zipCode: '13160',
    fee: calculateDisplacementFee(32),
    freeLimitNote: 'Bouches-du-Rhône (13) — 0,60€/km au-delà de 10 km',
    distanceKm: 32,
  },
];
