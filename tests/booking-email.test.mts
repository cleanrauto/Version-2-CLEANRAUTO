import test from 'node:test';
import assert from 'node:assert/strict';
import handler, { prepareBooking, renderEmails } from '../netlify/functions/booking-email.mts';
import { BOOKING_TIME_SLOTS, todayInParis, isValidBookingDate, normalizeAddonIds, toggleAddonId } from '../src/utils/bookingRules.js';

const sample = { fullName: 'Client test', phone: '0612345678', email: 'client@example.com', formulaId: 'int-prestige', vehicleType: 'citadine', selectedAddonIds: ['sand'], distanceKm: 20, isWorkplace: false, date: todayInParis(new Date(Date.now() + 86400000)), timeSlot: BOOKING_TIME_SLOTS[0].value, cityName: 'Camaret-sur-Aigues', customAddress: 'Adresse de démonstration', vehicleModelDetails: 'Hyundai i30', comments: '' };
// Use a real existing option identifier, independent of its display name.
const { ADDONS } = await import('../src/data/addons.ts');
sample.selectedAddonIds = [ADDONS.find(item => item.name === 'Sable')!.id];
const req = (body = sample, origin = 'https://cleanrauto.fr') => new Request('https://cleanrauto.fr/.netlify/functions/booking-email', { method: 'POST', headers: { origin, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });

test('server calculates prices and escapes customer HTML', () => {
  const booking = prepareBooking({ ...sample, fullName: '<script>alert(1)</script>', total: '0€' });
  assert.equal(booking.total, '110,50 €');
  const mail = renderEmails(booking, 'CRA-TEST').customer;
  assert.ok(mail.htmlContent.includes('&lt;script&gt;'));
  assert.ok(!mail.htmlContent.includes('<script>'));
  assert.ok(mail.textContent.includes('reste à confirmer'));
});
test('invalid booking and cross-origin requests send no emails', async () => {
  assert.equal((await handler(req(sample, 'https://example.com'))).status, 403);
  assert.equal((await handler(req({ ...sample, email: 'invalid' }))).status, 400);
  assert.equal((await handler(req({ ...sample, distanceKm: -1 }))).status, 400);
});
test('missing configuration fails closed', async () => {
  delete process.env.BREVO_API_KEY;
  assert.equal((await handler(req())).status, 503);
});
test('delivery success and partial failures report the true reception state', async () => {
  process.env.BREVO_API_KEY = 'test-not-a-secret';
  process.env.BOOKING_SENDER_EMAIL = 'sender@example.com';
  process.env.BOOKING_OWNER_EMAIL = 'owner@example.com';
  const original = globalThis.fetch;
  try {
    let sent: any[] = [];
    globalThis.fetch = async (_url, options) => { sent.push(JSON.parse(String(options?.body))); return new Response('{}', { status: 201 }); };
    const success = await handler(req());
    assert.deepEqual({ ...(await success.json()), reference: undefined }, { ok: true, confirmationSent: true, reference: undefined });
    assert.equal(sent.length, 3);
    assert.equal(sent[0].updateEnabled, true);
    assert.deepEqual(sent[0].listIds, [5]);
    assert.equal(sent[0].attributes.VEHICULE, sample.vehicleModelDetails);
    assert.equal(sent[0].attributes.VILLE, sample.cityName);
    assert.equal(sent[0].attributes.TELEPHONE, sample.phone);
    assert.equal(sent[1].to[0].email, 'contact@cleanrauto.fr');
    assert.equal(sent[1].replyTo.email, sample.email);
    assert.equal(sent[2].to[0].email, sample.email);
    globalThis.fetch = async () => new Response('{}', { status: 500 });
    assert.equal((await handler(req())).status, 502);
    let calls = 0;
    globalThis.fetch = async () => new Response('{}', { status: ++calls <= 2 ? 201 : 500 });
    const partial = await (await handler(req())).json();
    assert.equal(partial.ok, true);
    assert.equal(partial.confirmationSent, false);
  } finally { globalThis.fetch = original; }
});

test('compound first and last names are preserved; legacy names are not guessed', () => {
  const booking = prepareBooking({ ...sample, firstName: 'Jean Pierre', lastName: 'De la Tour' });
  assert.equal(booking.name, 'Jean Pierre De la Tour');
  assert.equal(booking.firstName, 'Jean Pierre');
  assert.equal(booking.lastName, 'De la Tour');
  assert.equal(prepareBooking(sample).firstName, '');
  assert.throws(() => prepareBooking({ ...sample, firstName: 'Jean', lastName: '' }));
});

test('booking dates follow Paris time and reject past or impossible dates', () => {
  const now = new Date('2026-10-15T23:30:00Z');
  assert.equal(todayInParis(now), '2026-10-16');
  assert.equal(isValidBookingDate('2026-10-15', now), false);
  assert.equal(isValidBookingDate('2026-10-16', now), true);
  assert.equal(isValidBookingDate('2027-02-30', now), false);
  assert.equal(isValidBookingDate('2028-02-29', now), true);
  assert.throws(() => prepareBooking({ ...sample, date: '2020-01-01' }));
});

test('exterior options replace each other in either order and never charge twice', () => {
  const essential = 'ext-essentiel-option';
  const premium = 'ext-premium-option';
  assert.deepEqual(toggleAddonId(['sand', essential], premium), ['sand', premium]);
  assert.deepEqual(toggleAddonId(['dog-hair', premium], essential), ['dog-hair', essential]);
  assert.deepEqual(toggleAddonId([premium], premium), []);
  assert.deepEqual(normalizeAddonIds([essential, premium]), [premium]);
  assert.throws(() => prepareBooking({ ...sample, selectedAddonIds: [essential, premium] }));
  assert.throws(() => prepareBooking({ ...sample, selectedAddonIds: ['sand', 'sand'] }));
  const booking = prepareBooking({ ...sample, selectedAddonIds: toggleAddonId([essential], premium) });
  assert.equal(booking.total, '135,50 €');
});

test('displayed and submitted time slots match, including older open forms', () => {
  assert.equal(BOOKING_TIME_SLOTS[0].value, '08h30 - 11h30');
  for (const slot of BOOKING_TIME_SLOTS) {
    const booking = prepareBooking({ ...sample, timeSlot: slot.value });
    assert.equal(booking.rows.find(row => row[0] === 'Créneau souhaité')?.[1], slot.value);
  }
  const legacy = prepareBooking({ ...sample, timeSlot: '09h00 - 12h00' });
  assert.equal(legacy.rows.find(row => row[0] === 'Créneau souhaité')?.[1], '08h30 - 11h30');
  assert.throws(() => prepareBooking({ ...sample, timeSlot: '02h00 - 03h00' }));
});
