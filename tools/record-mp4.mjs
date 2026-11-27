// Record the deck playing itself into an MP4 (H.264 + AAC, 1280x720).
//   node tools/record-mp4.mjs [output.mp4]
// Video comes from Playwright's recorder, audio is tapped from the deck's own
// WebAudio graph (every node connected to ctx.destination is mirrored into a
// MediaStreamDestination), then both are muxed with ffmpeg.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire('/Users/gml/.nvm/versions/node/v24.22.2/lib/node_modules/rea-agents/package.json');
const { chromium } = require('playwright-core');

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.resolve(process.argv[2] || path.join(ROOT, 'last-boring-slide-zh.mp4'));
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'deck-mp4-'));
const W = 1280;
const H = 720;

// Runs before the page's own scripts: mirrors everything routed to
// ctx.destination into a MediaStreamDestination that MediaRecorder captures.
const TAP = `(() => {
  const OrigAC = window.AudioContext;
  if (!OrigAC) return;
  const origConnect = AudioNode.prototype.connect;
  AudioNode.prototype.connect = function (dest, ...rest) {
    const out = origConnect.call(this, dest, ...rest);
    if (this.context && this.context.__tap && dest === this.context.destination) origConnect.call(this, this.context.__tap);
    return out;
  };
  window.AudioContext = class extends OrigAC {
    constructor(...args) {
      super(...args);
      try {
        this.__tap = this.createMediaStreamDestination();
        const rec = new MediaRecorder(this.__tap.stream, { mimeType: 'audio/webm;codecs=opus', audioBitsPerSecond: 192000 });
        window.__aChunks = [];
        rec.ondataavailable = (e) => e.data.size && window.__aChunks.push(e.data);
        rec.start(1000);
        window.__rec = rec;
      } catch (err) {
        window.__aError = err.message;
      }
    }
  };
})();`;

const browser = await chromium.launch({ headless: false, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
const ctx = await browser.newContext({ viewport: { width: W, height: H }, recordVideo: { dir: TMP, size: { width: W, height: H } } });
await ctx.addInitScript(TAP);
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));

await page.goto(`file://${ROOT}/index.html`);
await page.waitForFunction(() => window.ready === true, null, { timeout: 180000 });
await page.waitForTimeout(1500);
// the deck advances itself and stops when it reaches the last beat of the last scene
await page.keyboard.press('a');
await page.waitForFunction(() => window.__deck.auto === false && window.__deck.info().index === window.__deck.scenes.length - 1, null, {
  timeout: 20 * 60 * 1000,
  polling: 1000,
});
await page.waitForTimeout(3000);

const audio = await page.evaluate(async () => {
  const rec = window.__rec;
  if (!rec) return { error: window.__aError || 'no AudioContext was created' };
  await new Promise((r) => (rec.onstop = r));
  rec.stop();
  const bytes = new Uint8Array(await new Blob(window.__aChunks, { type: 'audio/webm' }).arrayBuffer());
  let s = '';
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  return { b64: btoa(s), bytes: bytes.length };
});
const video = page.video();
const info = await page.evaluate(() => window.__deck.info());
await ctx.close();
await browser.close();

const webm = await video.path();
const audioFile = path.join(TMP, 'audio.webm');
if (!audio.b64) throw new Error(`no audio captured: ${audio.error}`);
fs.writeFileSync(audioFile, Buffer.from(audio.b64, 'base64'));

execFileSync('ffmpeg', [
  '-y', '-v', 'error',
  '-i', webm, '-i', audioFile,
  '-map', '0:v:0', '-map', '1:a:0',
  '-c:v', 'libx264', '-preset', 'medium', '-crf', '22', '-pix_fmt', 'yuv420p',
  '-c:a', 'aac', '-b:a', '160k',
  '-shortest', '-movflags', '+faststart',
  OUT,
]);
fs.rmSync(TMP, { recursive: true, force: true });
const { size } = fs.statSync(OUT);
console.log(JSON.stringify({ out: OUT, mb: +(size / 1024 / 1024).toFixed(1), endedAt: info, errors, audioBytes: audio.bytes }, null, 2));
