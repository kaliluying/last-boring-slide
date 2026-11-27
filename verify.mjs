// Verify: capture/artifact.html (pristine) vs index.html (built from src/).
// Checks: no console/page errors, identical deck info for all 13 scenes, pixel diff
// under a virtual clock (requestAnimationFrame/performance.now stubbed so both pages
// render the exact same animation frame).
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { diffPng } from './tools/png.mjs';

const require = createRequire('/Users/gml/.nvm/versions/node/v24.22.2/lib/node_modules/rea-agents/package.json');
const { chromium } = require('playwright-core');

const ROOT = '/Users/gml/code/last-boring-slide';
const SCENES = JSON.parse(fs.readFileSync(`${ROOT}/tools/scenes.json`, 'utf8'));
const OUT = '/tmp/verify-slides';
fs.mkdirSync(OUT, { recursive: true });

const CLOCK = `(() => {
  let vt = 0;
  const realRaf = window.requestAnimationFrame.bind(window);
  Object.defineProperty(window, 'performance', { value: { now: () => vt } });
  const realDateNow = Date.now;
  Date.now = () => 1700000000000 + vt;
  window.requestAnimationFrame = (cb) => realRaf(() => cb(vt));
  window.__step = (ms) => new Promise((r) => { vt += ms; realRaf(() => realRaf(r)); });
})();`;

const browser = await chromium.launch({ headless: false, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.addInitScript(CLOCK);

async function open(file) {
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  page.on('console', (m) => m.type() === 'error' && errors.push(`console: ${m.text()}`));
  page.on('requestfailed', (r) => errors.push(`requestfailed: ${r.url()}`));
  await page.goto(`file://${ROOT}/${file}`);
  await page.waitForFunction(() => window.ready === true, null, { timeout: 180000 });
  return { page, errors };
}

const step = async (page, ms) => page.evaluate((n) => window.__step(n), ms);

const a = await open('capture/artifact.html');
const b = await open('index.html');

const report = [];
let failures = 0;
for (const id of SCENES) {
  for (const p of [a.page, b.page]) await p.evaluate((s) => window.__deck.jump(s, 0), id);
  for (let i = 0; i < 120; i++) {
    await step(a.page, 16);
    await step(b.page, 16);
  }
  const infoA = await a.page.evaluate(() => window.__deck.info());
  const infoB = await b.page.evaluate(() => window.__deck.info());
  const shotA = await a.page.screenshot();
  const shotB = await b.page.screenshot();
  fs.writeFileSync(`${OUT}/${id}.orig.png`, shotA);
  fs.writeFileSync(`${OUT}/${id}.built.png`, shotB);
  const diff = diffPng(shotA, shotB);
  const infoSame = JSON.stringify(infoA) === JSON.stringify(infoB);
  const ok = infoSame && diff.mean < 0.5 && diff.pctOver16 < 0.2;
  if (!ok) failures++;
  report.push({ id, title: infoA.title, infoSame, mean: +diff.mean?.toFixed(4), max: diff.max, pctOver16: +diff.pctOver16?.toFixed(3), ok });
}

console.log(JSON.stringify({ errorsOrig: a.errors, errorsBuilt: b.errors, scenes: report, failures }, null, 2));
await browser.close();
process.exit(failures || a.errors.length || b.errors.length ? 1 : 0);
