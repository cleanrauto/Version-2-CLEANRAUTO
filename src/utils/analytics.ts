export const MEASUREMENT_ID = 'G-M5698HXQY1';
export const CONSENT_KEY = 'cleanr-audience-v1';
const SIX_MONTHS = 180 * 24 * 60 * 60 * 1000;
type Choice = 'accepted' | 'refused';
type AnalyticsWindow = Window & {
  cleanrAudienceLayer?: unknown[];
  cleanrAudienceCommand?: (...args: unknown[]) => void;
};
let accepted = false;
let started = false;
let listening = false;

function command(...args: unknown[]) {
  const target = window as AnalyticsWindow;
  // Keep Analytics separate from the existing Tag Manager verification container.
  // Otherwise GTM can also load this destination when it sees a config command.
  target.cleanrAudienceLayer = target.cleanrAudienceLayer || [];
  target.cleanrAudienceCommand = target.cleanrAudienceCommand || function () { target.cleanrAudienceLayer!.push(arguments); };
  target.cleanrAudienceCommand(...args);
}

export function savedAudienceChoice(): Choice | null {
  try {
    const saved = JSON.parse(localStorage.getItem(CONSENT_KEY) || 'null');
    if (saved && (saved.choice === 'accepted' || saved.choice === 'refused') &&
        Number.isFinite(saved.at) && saved.at <= Date.now() && Date.now() - saved.at < SIX_MONTHS) return saved.choice;
  } catch { /* A blocked storage must never imply consent. */ }
  return null;
}

function clearAnalyticsCookies() {
  const domains = ['', location.hostname, '.' + location.hostname, '.cleanrauto.fr'];
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.split('=')[0].trim();
    if (!/^_ga(?:_|$)|^_gid$|^_gat(?:_|$)/.test(name)) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax${domain ? '; domain=' + domain : ''}`;
    }
  }
}

function pageAddress() { return location.origin + location.pathname; }
function safeReferrer() {
  try { const referrer = new URL(document.referrer); return referrer.origin + referrer.pathname; }
  catch { return ''; }
}

export function audienceEvent(name: 'generate_lead' | 'click_phone' | 'click_whatsapp' | 'click_email') {
  if (!accepted || !started) return;
  // Only fixed event names and a query-free page address are sent. Never form fields or contact URLs.
  command('event', name, { send_to: MEASUREMENT_ID, page_location: pageAddress() });
}

function startAudience() {
  if (started) return;
  started = true;
  (window as unknown as Record<string, unknown>)['ga-disable-' + MEASUREMENT_ID] = false;
  command('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  command('js', new Date());
  command('config', MEASUREMENT_ID, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    cookie_expires: SIX_MONTHS / 1000,
    cookie_update: false,
    page_location: pageAddress(),
    page_referrer: safeReferrer(),
  });
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + MEASUREMENT_ID + '&l=cleanrAudienceLayer';
  script.id = 'cleanr-audience-script';
  document.head.appendChild(script);
  command('event', 'page_view', { send_to: MEASUREMENT_ID, page_location: pageAddress(), page_referrer: safeReferrer() });
}

export function initializeAudience() {
  if (typeof window === 'undefined') return;
  if (!listening) {
    listening = true;
    document.addEventListener('click', (event) => {
      const anchor = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (!anchor) return;
      const href = anchor.getAttribute('href') || '';
      if (/^tel:/i.test(href)) audienceEvent('click_phone');
      else if (/^mailto:/i.test(href)) audienceEvent('click_email');
      else {
        try { const url = new URL(href, location.origin); if (url.hostname === 'wa.me' || url.hostname === 'api.whatsapp.com') audienceEvent('click_whatsapp'); }
        catch { /* Ignore malformed links. */ }
      }
    });
  }
  accepted = savedAudienceChoice() === 'accepted';
  if (accepted) startAudience();
  else (window as unknown as Record<string, unknown>)['ga-disable-' + MEASUREMENT_ID] = true;
}

export function setAudienceChoice(choice: Choice) {
  try { localStorage.setItem(CONSENT_KEY, JSON.stringify({ choice, at: Date.now() })); } catch { /* Respect the choice for this page even without storage. */ }
  accepted = choice === 'accepted';
  if (accepted) {
    (window as unknown as Record<string, unknown>)['ga-disable-' + MEASUREMENT_ID] = false;
    if (started) command('consent', 'update', { analytics_storage: 'granted' });
    else startAudience();
  } else {
    // Disable synchronously before reloading so a subsequent click cannot be collected.
    (window as unknown as Record<string, unknown>)['ga-disable-' + MEASUREMENT_ID] = true;
    clearAnalyticsCookies();
    if (started) window.location.reload();
  }
}
