// Build: src/ + assets/ -> index.html (single self-contained file, same runtime shape as the original).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8');
const readBuf = (rel) => fs.readFileSync(path.join(ROOT, rel));

// deck modules, in original statement order
const MODULES = ['vendor/three.min.js', 'deck/framework.js', 'deck/audio.js', 'deck/shared.js', 'deck/scenes.js', 'deck/transitions.js', 'deck/boot.js'];

// assets -> data URIs, original key order preserved via manifest
const manifest = JSON.parse(read('assets/manifest.json'));
const toUri = (entry) => `data:${entry.mime};base64,${readBuf(entry.file).toString('base64')}`;
const fontsJs = `window.__FONTS=${JSON.stringify(Object.fromEntries(Object.entries(manifest.fonts).map(([k, v]) => [k, toUri(v)])))};`;
const imagesJs = `window.__ASSETS=${JSON.stringify(Object.fromEntries(Object.entries(manifest.images).map(([k, v]) => [k, toUri(v)])))};`;

const deckJs = `(()=>{\n${MODULES.map((m) => read(`src/${m}`)).join('\n')}\n})();`;

let html = read('src/index.template.html');
const fill = (html, token, value) => html.split(token).join(value);
html = fill(html, '<!--STYLES-->', `<style>${read('src/base.css').trim()}</style>\n<style>${read('src/deck.css').trim()}</style>`);
html = fill(html, '<!--ASSETS-->', `<script>${fontsJs}${imagesJs}</script>`);
html = fill(html, '<!--DECK-->', `<script>${deckJs}</script>`);

fs.writeFileSync(path.join(ROOT, 'index.html'), html);
const kb = (n) => `${(n / 1024).toFixed(0)} KB`;
console.log(`index.html ${kb(html.length)}  (assets ${kb(fontsJs.length + imagesJs.length)}, deck ${kb(deckJs.length)})`);
