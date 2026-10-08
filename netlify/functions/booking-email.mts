import { randomUUID } from 'node:crypto';
import { FORMULAS, VEHICLE_OPTIONS } from '../../src/data/packages';
import { ADDONS } from '../../src/data/addons';
import type { VehicleType } from '../../src/types';

const business = { name: 'Clean’R Auto', email: 'contact@cleanrauto.fr', phone: '06 17 20 05 16' };
const escape = (value: unknown) => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]!));
const money = (value: number) => `${value.toFixed(2).replace('.', ',')} €`;
const emailPattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

export function prepareBooking(input: any) {
  const text = (key: string, max: number, required = true) => {
    const value = input?.[key];
    if (typeof value !== 'string' || value.length > max || (required && !value.trim())) throw new Error('invalid');
    return value.trim();
  };
  // Older open forms may still submit only fullName. Never guess compound names.
  const structuredName = input?.firstName !== undefined || input?.lastName !== undefined;
  const firstName = structuredName ? text('firstName', 60) : '';
  const lastName = structuredName ? text('lastName', 60) : '';
  const name = structuredName ? `${firstName} ${lastName}` : text('fullName', 120);
  const email = text('email', 254);
  const phone = text('phone', 30);
  if (!emailPattern.test(email) || !/^\+?[\d\s().-]{8,30}$/.test(phone)) throw new Error('invalid');
  const formula = FORMULAS.find(item => item.id === input.formulaId);
  const vehicle = VEHICLE_OPTIONS.find(item => item.id === input.vehicleType);
  if (!formula || !vehicle) throw new Error('invalid');
  if (!Array.isArray(input.selectedAddonIds) || input.selectedAddonIds.length > ADDONS.length || input.selectedAddonIds.some((id: unknown) => !ADDONS.some(item => item.id === id))) throw new Error('invalid');
  if (typeof input.distanceKm !== 'number' || !Number.isFinite(input.distanceKm) || input.distanceKm < 0 || input.distanceKm > 1000 || typeof input.isWorkplace !== 'boolean') throw new Error('invalid');
  const addons = ADDONS.filter(item => input.selectedAddonIds.includes(item.id));
  const price = formula.prices[vehicle.id as VehicleType];
  const fee = Math.round(Math.max(0, input.distanceKm - 10) * 0.65 * 100) / 100;
  const total = typeof price === 'number' ? money(price + addons.reduce((sum, item) => sum + item.price, 0) + fee) : 'Sur devis';
  const date = text('date', 10, false);
  if (date && (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date)))) throw new Error('invalid');
  const dateLabel = date ? date.split('-').reverse().join('/') : 'À convenir';
  const city = text('cityName', 120);
  const address = text('customAddress', 300);
  const timeSlot = text('timeSlot', 80);
  const details = text('vehicleModelDetails', 1000, false);
  const comments = text('comments', 1000, false);
  return { name, firstName, lastName, vehicle: details || vehicle.label, email, phone, formula: formula.name, total, rows: [
    ['Client', name], ['Téléphone', phone], ['Email', email], ['Véhicule', vehicle.label],
    ['Modèle et remarques', details || 'Non précisé'], ['Formule', formula.name],
    ['Options', addons.map(item => `${item.name} · ${money(item.price)}`).join('\n') || 'Aucune'],
    ['Lieu', input.isWorkplace ? 'Lieu de travail' : 'Domicile'], ['Adresse', address], ['Commune', city],
    ['Date souhaitée', dateLabel], ['Créneau souhaité', timeSlot],
    ['Formule', typeof price === 'number' ? money(price) : 'Sur devis'],
    ['Options', money(addons.reduce((sum, item) => sum + item.price, 0))],
    ['Déplacement estimé', `${money(fee)} · ${input.distanceKm.toFixed(2).replace('.', ',')} km aller`],
    ['Total estimé TTC', total], ...(comments ? [['Informations complémentaires', comments]] : []),
  ] as string[][] };
}

export function renderEmails(booking: ReturnType<typeof prepareBooking>, reference: string) {
  const rows = booking.rows.map(([label, value]) => `<tr><td style="padding:12px 16px;border-bottom:1px solid #29322e;color:#aeb8b2;width:38%;vertical-align:top">${escape(label)}</td><td style="padding:12px 16px;border-bottom:1px solid #29322e;color:#ffffff;white-space:pre-line">${escape(value)}</td></tr>`).join('');
  const layout = (title: string, intro: string, action: string, href: string) => `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(title)}</title></head><body style="margin:0;background:#0b0c0e;font-family:Arial,sans-serif;color:#e2e8f0"><table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td style="padding:30px 16px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;margin:auto"><tr><td style="padding:24px;background:#111513;border-top:3px solid #25d366"><p style="margin:0;font-family:Georgia,serif;font-size:26px;letter-spacing:4px;color:white">CLEAN<span style="color:#25d366">’R</span> AUTO</p><p style="font-size:13px;color:#aeb8b2">Là où vous êtes.</p></td></tr><tr><td style="padding:28px 24px;background:#151917"><p style="color:#25d366;font-size:12px;letter-spacing:2px">DEMANDE ${escape(reference)}</p><h1 style="font-family:Georgia,serif;font-size:28px;font-weight:normal;color:white">${escape(title)}</h1>${intro}<h2 style="font-size:17px;color:white;margin-top:28px">Votre récapitulatif</h2><table width="100%" cellspacing="0" cellpadding="0" style="font-size:14px;border:1px solid #29322e">${rows}</table><p style="font-size:13px;line-height:1.7;color:#aeb8b2">Montant indicatif selon les choix et l’adresse renseignés. La disponibilité, les conditions d’accès et le tarif final seront confirmés avec vous avant l’intervention.</p><p style="margin:28px 0"><a href="${href}" style="display:inline-block;background:#25d366;color:#07110b;text-decoration:none;font-weight:bold;padding:15px 20px;border-radius:6px">${action}</a></p></td></tr><tr><td style="padding:24px;font-size:13px;line-height:1.8;color:#aeb8b2">Clean’R Auto · Orange et alentours<br><a href="tel:0617200516" style="color:#25d366">${business.phone}</a> · <a href="mailto:${business.email}" style="color:#25d366">${business.email}</a><br>Du lundi au samedi, 08h00–19h00 · Sur rendez-vous<br><a href="https://cleanrauto.fr/" style="color:#aeb8b2">cleanrauto.fr</a> · <a href="https://www.instagram.com/clean.r.auto/" style="color:#aeb8b2">Instagram</a> · <a href="https://www.tiktok.com/@cleanr.auto" style="color:#aeb8b2">TikTok</a></td></tr></table></td></tr></table></body></html>`;
  const customerIntro = `<p style="line-height:1.8">Bonjour ${escape(booking.name)},</p><p style="line-height:1.8">Merci d’avoir choisi Clean’R Auto pour prendre soin de votre véhicule. Nous avons bien reçu votre demande pour <strong>${escape(booking.formula)}</strong>.</p><p style="padding:16px;border-left:3px solid #25d366;background:#102219;line-height:1.7"><strong>Votre rendez-vous reste à confirmer.</strong><br>Nous vous recontacterons pour convenir des modalités et valider le créneau souhaité.</p>`;
  const ownerIntro = `<p style="line-height:1.8">Une nouvelle demande a été reçue sur le site : <strong>${escape(booking.name)}</strong> souhaite réserver <strong>${escape(booking.formula)}</strong>.</p><p style="line-height:1.8">Estimation : <strong style="color:#25d366">${escape(booking.total)}</strong>. Contactez le client pour confirmer le rendez-vous.</p>`;
  const plain = booking.rows.map(([label, value]) => `${label} : ${value}`).join('\n');
  return {
    owner: { subject: `Nouvelle demande Clean’R Auto — ${booking.name.replace(/[\r\n]/g, ' ')} — ${reference}`, htmlContent: layout('Nouvelle demande de réservation', ownerIntro, 'Répondre au client', `mailto:${encodeURIComponent(booking.email)}`), textContent: `Nouvelle demande ${reference}\n\n${plain}\n\nRendez-vous à confirmer.`, replyTo: { email: booking.email, name: booking.name } },
    customer: { subject: 'Votre demande a bien été reçue — Clean’R Auto', htmlContent: layout('Merci pour votre confiance', customerIntro, 'Nous contacter sur WhatsApp', 'https://wa.me/33617200516'), textContent: `Bonjour ${booking.name},\nMerci d’avoir choisi Clean’R Auto. Votre demande ${reference} a bien été reçue. Votre rendez-vous reste à confirmer : nous vous recontacterons pour valider ses modalités.\n\n${plain}\n\nEstimation indicative, à confirmer avant intervention.\n${business.phone}\n${business.email}`, replyTo: { email: business.email, name: business.name } },
  };
}

const json = (status: number, body: object) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
export default async function handler(request: Request) {
  if (request.method !== 'POST') return json(405, { error: 'Méthode non autorisée.' });
  if (request.headers.get('origin') !== new URL(request.url).origin) return json(403, { error: 'Origine non autorisée.' });
  if (!request.headers.get('content-type')?.includes('application/json')) return json(415, { error: 'Format non pris en charge.' });
  const raw = await request.text();
  if (raw.length > 10000) return json(413, { error: 'Demande trop longue.' });
  let booking: ReturnType<typeof prepareBooking>;
  try {
    const input = JSON.parse(raw);
    if (input.website) return json(400, { error: 'Demande non valide.' });
    booking = prepareBooking(input);
  } catch { return json(400, { error: 'Vérifiez les informations renseignées.' }); }
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BOOKING_SENDER_EMAIL;
  const ownerEmail = process.env.BOOKING_OWNER_EMAIL;
  if (!apiKey || !senderEmail || !ownerEmail || !emailPattern.test(senderEmail) || !emailPattern.test(ownerEmail)) return json(503, { error: 'L’envoi en ligne est momentanément indisponible. Contactez-nous par WhatsApp ou téléphone.' });
  const reference = `CRA-${randomUUID().slice(0, 8).toUpperCase()}`;
  const templates = renderEmails(booking, reference);
  const send = async (recipient: string, template: typeof templates.owner) => {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST', headers: { 'api-key': apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({ sender: { name: business.name, email: senderEmail }, to: [{ email: recipient }], ...template, tags: ['cleanrauto-booking'] }),
      signal: AbortSignal.timeout(12000),
    });
    if (!response.ok) throw new Error('mail_failed');
  };
  // This dedicated list is the client directory, not a marketing subscription.
  // updateEnabled upserts by email and preserves existing opt-outs.
  try {
    const contact = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST', headers: { 'api-key': apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: booking.email.toLowerCase(), updateEnabled: true, listIds: [5],
        attributes: { NOM: booking.lastName || booking.name,
          ...(booking.firstName ? { PRENOM: booking.firstName } : {}), VEHICULE: booking.vehicle } }),
      signal: AbortSignal.timeout(12000),
    });
    if (!contact.ok) throw new Error('contact_failed');
  } catch { return json(502, { error: 'L’enregistrement de votre demande n’a pas pu être confirmé. Réessayez ou contactez-nous par WhatsApp ou téléphone.' }); }
  try { await send(ownerEmail, templates.owner); }
  catch { return json(502, { error: 'La réception de votre demande n’a pas pu être confirmée. Contactez-nous par WhatsApp ou téléphone.' }); }
  // The owner has received the request: a failed confirmation must not invite a duplicate submission.
  try { await send(booking.email, templates.customer); return json(200, { ok: true, reference, confirmationSent: true }); }
  catch { return json(200, { ok: true, reference, confirmationSent: false }); }
}

export const config = { rateLimit: { windowLimit: 3, windowSize: 180, aggregateBy: ['ip', 'domain'] } };
