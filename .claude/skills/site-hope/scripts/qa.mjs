#!/usr/bin/env node
// QA visual + técnico de uma página estática gerada pelo /site-hope.
// Uso: node .claude/skills/site-hope/scripts/qa.mjs <caminho/index.html | http(s)://url> [pasta-saida]
import { createRequire } from 'node:module';
import { existsSync, mkdirSync, createReadStream, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { resolve, dirname, join, basename, extname, normalize } from 'node:path';

const require = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = require('playwright'));
} catch {
  console.error('Playwright não encontrado. Instale com: npm i -g playwright (o Chromium já vem em /opt/pw-browsers nas sessões em nuvem).');
  process.exit(2);
}

const target = process.argv[2];
if (!target) {
  console.error('Uso: node qa.mjs <arquivo.html | url> [pasta-saida]');
  process.exit(2);
}
const isUrl = /^https?:\/\//.test(target);

// Arquivo local: serve a pasta do HTML por HTTP para que caminhos absolutos (/assets/...) funcionem.
const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.avif': 'image/avif', '.gif': 'image/gif', '.ico': 'image/x-icon', '.woff2': 'font/woff2',
  '.woff': 'font/woff', '.mp4': 'video/mp4', '.webm': 'video/webm', '.txt': 'text/plain', '.xml': 'application/xml' };
let server;
let url = target;
if (!isUrl) {
  const root = dirname(resolve(target));
  server = createServer((req, res) => {
    let p = normalize(join(root, decodeURIComponent(req.url.split('?')[0])));
    if (!p.startsWith(root)) { res.writeHead(403).end(); return; }
    if (existsSync(p) && statSync(p).isDirectory()) p = join(p, 'index.html');
    if (!existsSync(p)) { res.writeHead(404).end(); return; }
    res.writeHead(200, { 'Content-Type': MIME[extname(p).toLowerCase()] || 'application/octet-stream' });
    createReadStream(p).pipe(res);
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  url = `http://127.0.0.1:${server.address().port}/${basename(target)}`;
}
const outDir = resolve(process.argv[3] || (isUrl ? '_qa' : join(dirname(resolve(target)), '_qa')));
mkdirSync(outDir, { recursive: true });

async function launch() {
  try {
    return await chromium.launch();
  } catch (err) {
    if (existsSync('/opt/pw-browsers/chromium')) {
      return chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
    }
    throw err;
  }
}

const viewports = [
  { name: 'mobile-390', width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 },
  { name: 'desktop-1440', width: 1440, height: 900, isMobile: false, deviceScaleFactor: 1 },
];

const browser = await launch();
const report = { url, viewports: {} };
let problems = 0;

for (const vp of viewports) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    isMobile: vp.isMobile,
    deviceScaleFactor: vp.deviceScaleFactor,
  });
  const page = await ctx.newPage();
  const consoleErrors = [];
  const brokenResources = [];
  page.on('console', (m) => m.type() === 'error' && !m.text().startsWith('Failed to load resource') && consoleErrors.push(m.text()));
  page.on('response', (r) => r.status() >= 400 && brokenResources.push(`${r.status()} ${r.url()}`));
  page.on('requestfailed', (r) => brokenResources.push(`falhou ${r.url()}`));
  page.on('pageerror', (e) => consoleErrors.push(String(e)));
  await page.goto(url, { waitUntil: 'networkidle' }).catch(() => page.goto(url, { waitUntil: 'load' }));
  await page.waitForTimeout(800);

  const fold = join(outDir, `${vp.name}-dobra.png`);
  const full = join(outDir, `${vp.name}-completa.png`);
  await page.screenshot({ path: fold });
  await page.screenshot({ path: full, fullPage: true });

  const checks = await page.evaluate(() => {
    const q = (s) => document.querySelector(s);
    const imgs = [...document.images];
    const ld = [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => {
      try {
        const j = JSON.parse(s.textContent);
        const nodes = j['@graph'] || (Array.isArray(j) ? j : [j]);
        return { ok: true, types: nodes.map((n) => n['@type']).flat() };
      } catch (e) {
        return { ok: false, error: String(e) };
      }
    });
    const desc = q('meta[name="description"]')?.content || '';
    return {
      domNodes: document.getElementsByTagName('*').length,
      lang: document.documentElement.lang,
      title: document.title,
      titleLength: document.title.length,
      descriptionLength: desc.length,
      canonical: q('link[rel="canonical"]')?.href || null,
      h1Count: document.querySelectorAll('h1').length,
      h2: [...document.querySelectorAll('h2')].map((h) => h.textContent.trim().replace(/\s+/g, ' ')),
      imgsWithoutDims: imgs.filter((i) => !i.getAttribute('width') || !i.getAttribute('height')).map((i) => i.src.split('/').pop()),
      imgsWithoutAlt: imgs.filter((i) => !i.hasAttribute('alt')).map((i) => i.src.split('/').pop()),
      jsonLd: ld,
      horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
      placeholders: (document.body.innerText.match(/\[\[PREENCHER[^\]]*\]\]/g) || []).length,
      smallTapTargets: [...document.querySelectorAll('a, button, [role="button"], input, select, textarea')]
        .filter((el) => {
          const r = el.getBoundingClientRect();
          return r.width > 0 && r.height > 0 && (r.width < 44 || r.height < 44) && getComputedStyle(el).display !== 'inline';
        }).length,
    };
  });
  checks.consoleErrors = consoleErrors;
  checks.brokenResources = [...new Set(brokenResources)];
  checks.screenshots = [fold, full];
  report.viewports[vp.name] = checks;
  await ctx.close();
}
await browser.close();
server?.close();

const m = report.viewports['mobile-390'];
const issues = [];
if (m.h1Count !== 1) issues.push(`H1 deveria ser 1, encontrado ${m.h1Count}`);
if (m.domNodes > 1000) issues.push(`DOM com ${m.domNodes} nós (> 1000)`);
if (!m.lang) issues.push('<html lang> ausente');
if (m.titleLength < 30 || m.titleLength > 65) issues.push(`title com ${m.titleLength} caracteres (alvo 50–60)`);
if (m.descriptionLength < 70 || m.descriptionLength > 165) issues.push(`meta description com ${m.descriptionLength} caracteres (alvo 140–160)`);
if (!m.canonical) issues.push('canonical ausente');
if (!m.jsonLd.length) issues.push('nenhum JSON-LD');
m.jsonLd.filter((j) => !j.ok).forEach((j) => issues.push(`JSON-LD inválido: ${j.error}`));
if (m.imgsWithoutDims.length) issues.push(`imagens sem width/height: ${m.imgsWithoutDims.join(', ')}`);
if (m.imgsWithoutAlt.length) issues.push(`imagens sem alt: ${m.imgsWithoutAlt.join(', ')}`);
for (const [name, v] of Object.entries(report.viewports)) {
  if (v.horizontalOverflow) issues.push(`overflow horizontal em ${name}`);
  if (v.brokenResources.length) issues.push(`recursos quebrados em ${name}: ${v.brokenResources.slice(0, 5).join(' | ')}`);
  if (v.consoleErrors.length) issues.push(`erros de console em ${name}: ${v.consoleErrors.slice(0, 3).join(' | ')}`);
}
if (m.smallTapTargets) issues.push(`${m.smallTapTargets} alvos de toque menores que 44px no mobile (revisar)`);
problems = issues.length;

console.log(JSON.stringify(report, null, 2));
console.log('\n== RESUMO ==');
console.log(`Screenshots em: ${outDir}`);
console.log(`[[PREENCHER]] pendentes: ${m.placeholders}`);
console.log(problems ? issues.map((i) => `✗ ${i}`).join('\n') : '✓ Nenhum problema automático encontrado — agora revise os screenshots.');
process.exit(problems ? 1 : 0);
