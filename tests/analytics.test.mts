import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const code = ts.transpileModule(readFileSync(new URL('../src/utils/analytics.ts', import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
function harness(saved: unknown = null, blockedStorage = false) {
  const scripts: any[] = [];
  const listeners: Record<string, Function> = {};
  let stored = saved ? JSON.stringify(saved) : null;
  let reloads = 0;
  const window: any = { location: { reload: () => { reloads++; } } };
  class Element { constructor(public href: string) {} closest() { return this; } getAttribute() { return this.href; } }
  const document: any = { cookie: '', referrer: 'https://www.google.com/search?q=private', createElement: () => ({}), head: { appendChild: (el: any) => scripts.push(el) }, addEventListener: (name: string, callback: Function) => { listeners[name] = callback; } };
  const exports: any = {};
  vm.runInNewContext(code, { exports, window, document, Element, URL, Date, location: { origin: 'https://cleanrauto.fr', hostname: 'cleanrauto.fr', pathname: '/reservation/', search: '?email=private@example.com' }, localStorage: { getItem: () => { if (blockedStorage) throw Error(); return stored; }, setItem: (_key: string, value: string) => { if (blockedStorage) throw Error(); stored = value; } } });
  return { api: exports, window, scripts, reloads: () => reloads, click: (href: string) => listeners.click({ target: new Element(href) }), commands: () => (window.cleanrAudienceLayer || []).map((args: any) => Array.from(args)) };
}

test('no Analytics script or event before consent, after refusal, or when storage is blocked', () => {
  for (const h of [harness(), harness({ choice: 'refused', at: Date.now() }), harness(null, true)]) {
    h.api.initializeAudience(); h.api.audienceEvent('generate_lead'); h.click('tel:0617200516');
    assert.equal(h.scripts.length, 0); assert.equal(h.commands().length, 0);
  }
});
test('acceptance loads Analytics once and strips personal query strings', () => {
  const h = harness(); h.api.initializeAudience(); h.api.setAudienceChoice('accepted'); h.api.initializeAudience();
  assert.equal(h.scripts.length, 1);
  assert.match(h.scripts[0].src, /[&]l=cleanrAudienceLayer/);
  assert.equal(h.window.dataLayer, undefined);
  assert.equal(h.commands().filter((c: any) => c[1] === 'page_view').length, 1);
  const config: any = h.commands().find((c: any) => c[0] === 'config');
  assert.equal(config[2].page_location, 'https://cleanrauto.fr/reservation/');
  assert.equal(config[2].page_referrer, 'https://www.google.com/search');
  assert.equal(config[2].allow_google_signals, false);
  assert.equal(JSON.stringify(h.commands()).includes('private'), false);
});
test('contact clicks send fixed event names without contact URLs or message contents', () => {
  const h = harness({ choice: 'accepted', at: Date.now() }); h.api.initializeAudience(); h.api.initializeAudience();
  h.click('tel:0617200516'); h.click('https://wa.me/33617200516?text=PRIVATE'); h.click('mailto:private@example.com'); h.click('/formules/');
  const names = h.commands().filter((c: any) => c[0] === 'event').map((c: any) => c[1]);
  assert.deepEqual(Array.from(names), ['page_view', 'click_phone', 'click_whatsapp', 'click_email']);
  assert.doesNotMatch(JSON.stringify(h.commands()), /0617200516|PRIVATE|private@example/);
});
test('withdrawal immediately blocks events and expires the stored choice after six months', () => {
  const h = harness({ choice: 'accepted', at: Date.now() }); h.api.initializeAudience();
  const before = h.commands().length; h.api.setAudienceChoice('refused'); h.api.audienceEvent('generate_lead');
  assert.equal(h.window['ga-disable-G-M5698HXQY1'], true); assert.equal(h.commands().length, before); assert.equal(h.reloads(), 1);
  for (const saved of [{ choice: 'accepted', at: 0 }, { choice: 'accepted', at: Date.now() + 100000 }]) {
    const expired = harness(saved); expired.api.initializeAudience(); assert.equal(expired.scripts.length, 0);
  }
});
