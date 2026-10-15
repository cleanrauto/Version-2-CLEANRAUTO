export const BOOKING_TIME_SLOTS = [
  { value: '08h30 - 11h30', label: 'Matinée (08h30 - 11h30)' },
  { value: '12h00 - 15h00', label: 'Milieu de journée (12h00 - 15h00)' },
  { value: '15h00 - 18h00', label: 'Après-midi (15h00 - 18h00)' },
];

export function todayInParis(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(now);
  const part = key => parts.find(item => item.type === key).value;
  return `${part('year')}-${part('month')}-${part('day')}`;
}

export function isValidBookingDate(value, now = new Date()) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(value + 'T12:00:00Z');
  return Number.isFinite(parsed.getTime()) &&
    parsed.toISOString().slice(0, 10) === value && value >= todayInParis(now);
}

const EXTERIOR_ADDONS = ['ext-essentiel-option', 'ext-premium-option'];

/** @param {string[]} ids @returns {string[]} */
export function normalizeAddonIds(ids) {
  const unique = [...new Set(ids)];
  const exterior = unique.filter(id => EXTERIOR_ADDONS.includes(id)).at(-1);
  return unique.filter(id => !EXTERIOR_ADDONS.includes(id) || id === exterior);
}

/** @param {string[]} ids @param {string} id @returns {string[]} */
export function toggleAddonId(ids, id) {
  return ids.includes(id)
    ? normalizeAddonIds(ids.filter(current => current !== id))
    : normalizeAddonIds([...ids, id]);
}
