import test from 'node:test';
import assert from 'node:assert/strict';
import handler, { prepareBooking, renderEmails } from '../netlify/functions/booking-email.mts';

const sample = { fullName: 'Client test', phone: '0612345678', email: 'client@example.com', formulaId: 'int-prestige', vehicleType: 'citadine', selectedAddonIds: ['sand'], distanceKm: 20, isWorkplace: false, date: '2026-10-20', timeSlot: 'Matinée', cityName: 'Camaret-sur-Aigues', customAddress: 'Adresse de démonstration', vehicleModelDetails: 'Hyundai i30', comments: '' };
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
