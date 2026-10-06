const origin = 'https://cleanrauto.fr';
const key = '6f6c8946d94d58c8cb7b376d200097cc';

export default {
  async deploySucceeded({ deploy }) {
    if (deploy.context !== 'production' || deploy.branch !== 'main') return;
    const options = { signal: AbortSignal.timeout(15000) };
    const proof = await fetch(`${origin}/${key}.txt`, options);
    if (!proof.ok || (await proof.text()).trim() !== key) {
      throw new Error('IndexNow ownership file is not live');
    }
    const sitemap = await fetch(`${origin}/sitemap.xml`, { signal: AbortSignal.timeout(15000) });
    if (!sitemap.ok) throw new Error(`Sitemap HTTP ${sitemap.status}`);
    const urls = [...(await sitemap.text()).matchAll(/<loc>\s*([^<]+)\s*<\/loc>/g)]
      .map((match) => match[1].trim());
    const urlList = [...new Set(urls)].filter((url) => {
      const parsed = new URL(url);
      return parsed.origin === origin && !parsed.search && !parsed.hash;
    });
    if (!urlList.length || urlList.length > 10000) throw new Error('Invalid sitemap URL count');
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host: 'cleanrauto.fr', key, keyLocation: `${origin}/${key}.txt`, urlList }),
      signal: AbortSignal.timeout(15000),
    });
    if (response.status !== 200 && response.status !== 202) {
      throw new Error(`IndexNow submission HTTP ${response.status}`);
    }
    console.log(`IndexNow received ${urlList.length} URLs, HTTP ${response.status}, deploy ${deploy.id}`);
  },
};
