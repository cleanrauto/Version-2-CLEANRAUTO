import { calculateDisplacementFee, ORANGE_COORDS } from './cities';

export interface AddressSuggestion {
  label: string;
  city: string;
  coordinates: [number, number];
}

async function fetchJson(url: string, signal?: AbortSignal) {
  const controller = new AbortController();
  const abort = () => controller.abort();
  if (signal?.aborted) controller.abort();
  signal?.addEventListener('abort', abort, { once: true });
  const timeout = setTimeout(abort, 15000);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error('Service indisponible');
    return await response.json();
  } finally {
    clearTimeout(timeout);
    signal?.removeEventListener('abort', abort);
  }
}

export async function searchAddresses(query: string, signal?: AbortSignal): Promise<AddressSuggestion[]> {
  const params = new URLSearchParams({ q: query, index: 'address', limit: '8' });
  const data = await fetchJson('https://data.geopf.fr/geocodage/search?' + params, signal);
  return (data.features || [])
    .filter((feature: any) =>
      ['housenumber', 'street', 'locality'].includes(feature.properties?.type) &&
      feature.geometry?.type === 'Point' &&
      feature.geometry.coordinates?.length === 2)
    .map((feature: any) => ({
      label: feature.properties.label,
      city: feature.properties.city || '',
      coordinates: feature.geometry.coordinates,
    }));
}

export async function calculateAddressTravel(address: AddressSuggestion, signal?: AbortSignal) {
  const params = new URLSearchParams({
    resource: 'bdtopo-osrm',
    start: ORANGE_COORDS.lon + ',' + ORANGE_COORDS.lat,
    end: address.coordinates.join(','),
    profile: 'car',
    optimization: 'shortest',
    distanceUnit: 'kilometer',
    getSteps: 'false',
    getBbox: 'false',
  });
  const data = await fetchJson('https://data.geopf.fr/navigation/itineraire?' + params, signal);
  const distanceKm = data.distance;
  if (typeof distanceKm !== 'number' || !Number.isFinite(distanceKm) || distanceKm < 0) throw new Error('Distance indisponible');
  // Keep full route precision for billing; round only the displayed distance.
  return { distanceKm, fee: calculateDisplacementFee(distanceKm) };
}
