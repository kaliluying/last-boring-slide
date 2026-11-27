// One-time extraction: capture/artifact.html (byte-exact frame document)
//   -> assets/ (base64 blobs), src/ (css, html skeleton, deck modules), docs/scenes.md
// The deck bundle is split at statement boundaries of the top-level IIFE body.
// Boundaries are asserted by content markers so a different capture fails loudly.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire('/Users/gml/.nvm/versions/node/v24.22.2/lib/node_modules/rea-agents/package.json');
const babel = require('@babel/parser');

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const html = fs.readFileSync(path.join(ROOT, 'capture/artifact.html'), 'utf8');

const write = (rel, data) => {
  const file = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, data);
  return data.length;
};

// ---------------------------------------------------------------- html skeleton
const headStart = html.indexOf('<head>') + '<head>'.length;
const headEnd = html.indexOf('</head>');
const head = html.slice(headStart, headEnd);
const bodyStart = html.indexOf('<body>') + '<body>'.length;
const bodyEnd = html.indexOf('</body>');
const body = html.slice(bodyStart, bodyEnd);

const styles = [...head.matchAll(/<style>([\s\S]*?)<\/style>/g)].map((m) => m[1]);
const metas = [...head.matchAll(/<meta [^>]+>/g)].map((m) => m[0]);
const title = head.match(/<title>([\s\S]*?)<\/title>/)[1];
const bodyHtml = body.replace(/<script>[\s\S]*?<\/script>/g, '').trim();
const scripts = [...body.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
if (styles.length !== 2 || scripts.length !== 2) throw new Error(`unexpected structure: ${styles.length} styles, ${scripts.length} scripts`);

write('src/base.css', styles[0].trim() + '\n');
write('src/deck.css', styles[1].trim() + '\n');
write(
  'src/index.template.html',
  `<!doctype html>
<html>
<head>
${metas.join('\n')}
<title>${title}</title>
<!--STYLES-->
</head>
<body>
${bodyHtml}
<!--ASSETS-->
<!--DECK-->
</body>
</html>
`,
);

// --------------------------------------------------------------------- assets
const assetsJs = scripts[0];
const grabObject = (name) => {
  const at = assetsJs.indexOf(`window.${name}=`);
  if (at < 0) throw new Error(`missing window.${name}`);
  let i = assetsJs.indexOf('{', at);
  let depth = 0;
  for (let j = i; j < assetsJs.length; j++) {
    if (assetsJs[j] === '{') depth++;
    else if (assetsJs[j] === '}' && --depth === 0) return JSON.parse(assetsJs.slice(i, j + 1));
  }
  throw new Error('unbalanced object');
};
const fonts = grabObject('__FONTS');
const images = grabObject('__ASSETS');
const MIME = { woff2: 'font/woff2', woff: 'font/woff', jpg: 'image/jpeg', png: 'image/png' };
const manifest = { fonts: {}, images: {} };
const sha = (buf) => crypto.createHash('sha256').update(buf).digest('hex');
for (const [group, map, dir] of [
  ['fonts', fonts, 'assets/fonts'],
  ['images', images, 'assets/img'],
]) {
  for (const [name, uri] of Object.entries(map)) {
    const [meta, b64] = uri.split(',');
    const mime = meta.slice(5, meta.indexOf(';'));
    const buf = Buffer.from(b64, 'base64');
    const ext = name.split('.').pop();
    if (MIME[ext] !== mime) throw new Error(`mime mismatch for ${name}: ${mime}`);
    write(`${dir}/${name}`, buf);
    manifest[group][name] = { file: `${dir}/${name}`, bytes: buf.length, mime, sha256: sha(buf) };
  }
}
write('assets/manifest.json', JSON.stringify(manifest, null, 2) + '\n');

// ------------------------------------------------------------------ deck bundle
const deck = scripts[1];
if (!deck.startsWith('(()=>{') || !deck.trimEnd().endsWith('})();')) throw new Error('unexpected deck wrapper');
const ast = babel.parse(deck, { sourceType: 'script' });
const stmts = ast.program.body[0].expression.callee.body.body;
const text = (st) => deck.slice(st.start, st.end);

// contiguous statement ranges -> module files
const MODULES = [
  ['vendor/three.min.js', 0, 358, 'three.js r187, bundled and minified by the original author (unmodified).'],
  ['deck/framework.js', 358, 378, 'Math/easing/noise, GLSL preludes, WebGL gfx layer, text renderer, deck engine (createDeck), HUD, boot helper, fade transition.'],
  ['deck/audio.js', 378, 410, 'WebAudio synthesis: oscillators, noise/FFT helpers, sample generators, makeAudio (stem mixing, ducking, mute).'],
  ['deck/shared.js', 410, 427, 'Canvas/texture helpers, METR dataset + chart drawing, agenda copy, camera path, exposure/tone curve.'],
  ['deck/scenes.js', 427, 597, 'The 13 scenes, each with its own helper functions, geometry and shaders.'],
  ['deck/transitions.js', 597, 612, 'The remaining 9 scene transitions (portal-in/out, fold, wash, flaps, slam, daybreak, line, tear).'],
];
const MARKERS = [
  [0, 'var cw=Object.defineProperty'],
  [358, 'var Ve=Math.PI*2'],
  [378, 'var So=Math.PI*2'],
  [410, 'var pA='],
  [427, 'var Ms='],
  [597, 'var Xb={dur:3.2'],
  [611, 'var v2=2.8'],
];
for (const [idx, marker] of MARKERS) {
  const head = text(stmts[idx]).slice(0, 80);
  if (!head.startsWith(marker)) throw new Error(`statement ${idx} is not the expected boundary (${marker}); got: ${head}`);
}
const bootStmt = stmts[stmts.length - 1];
if (stmts.length !== 613 || !text(bootStmt).startsWith('C3({createDeck:A3')) throw new Error('unexpected statement count / boot statement');

// scene const -> {id,title,enterWith,beats,notes} (AST based)
const sceneInfo = new Map();
const str = (node) =>
  node.type === 'StringLiteral'
    ? node.value
    : node.type === 'TemplateLiteral' && node.expressions.length === 0
      ? node.quasis.map((q) => q.value.cooked).join('')
      : null;

const declaratorStatement = new Map();
for (let i = 427; i < 597; i++) {
  const st = stmts[i];
  if (st.type !== 'VariableDeclaration') continue;
  for (const { id, init } of st.declarations) {
    if (!init || init.type !== 'ObjectExpression') continue;
    const props = Object.fromEntries(init.properties.filter((p) => p.type === 'ObjectProperty' && p.key.type === 'Identifier').map((p) => [p.key.name, p.value]));
    if (!props.id || str(props.id) === null) continue;
    const beats =
      props.beats?.type === 'ArrayExpression'
        ? props.beats.elements.map((el) =>
            Object.fromEntries(
              (el.properties || []).map((p) => [p.key.name, p.value.type === 'StringLiteral' ? p.value.value : (p.value.value ?? p.value.name ?? '?')]),
            ),
          )
        : [];
    const notes = props.notes?.type === 'ArrayExpression' ? props.notes.elements.map((el) => str(el) ?? '?(dynamic)') : [];
    sceneInfo.set(id.name, { id: str(props.id), title: str(props.title) ?? '', enterWith: str(props.enterWith) ?? '', beats, notes, statement: i });
    declaratorStatement.set(id.name, i);
  }
}
if (sceneInfo.size !== 13) throw new Error(`expected 13 scenes, found ${sceneInfo.size}`);

// write modules, with a banner per file and per scene
for (const [rel, from, to, note] of MODULES) {
  const parts = [];
  parts.push(`// ${rel}`);
  parts.push(`// ${note}`);
  parts.push(`// Part ${from}-${to - 1} of the original 613 top-level statements; all modules are`);
  parts.push('// concatenated back into one IIFE by build.mjs, so they share a single scope.');
  parts.push('');
  for (let i = from; i < to; i++) {
    for (const [name, info] of sceneInfo) {
      if (declaratorStatement.get(name) === i) parts.push(`// ── scene ${info.id} · "${info.title}" · enterWith: ${info.enterWith} ──`);
    }
    parts.push(text(stmts[i]));
    parts.push('');
  }
  write(`src/${rel}`, parts.join('\n'));
}

// boot module: same call, aliased names
const bootText = text(bootStmt);
const callName = bootText.slice(0, bootText.indexOf('('));
const argOf = (key) => bootText.match(new RegExp(`${key}:(\\w+)`))[1];
const sceneList = bootText.match(/scenes:\[([^\]]+)\]/)[1].split(',').map((s) => s.trim());
const transitionList = bootText.match(/transitions:\{([^}]+)\}/)[1];
const idOf = (constName) => {
  const info = sceneInfo.get(constName);
  if (!info) throw new Error(`scene const ${constName} not found`);
  return info.id;
};
const sceneAliases = sceneList.map((c) => `const ${idOf(c)} = ${c};`).join('\n');
const scenesArray = sceneList.map((c) => idOf(c)).join(', ');
const transitions = transitionList
  .split(/,(?=[\w$"]+:)/)
  .map((s) => s.trim())
  .join(', ');
// ?headless switches off the opening loader; keep the original argument verbatim
const headlessLine = /headless:new URLSearchParams\(location\.search\)\.has\("headless"\)/.test(bootText)
  ? "  // ?headless skips the opening loader / warmup path (used by the capture + verify scripts)\n  headless: new URLSearchParams(location.search).has('headless'),\n"
  : '';
write(
  'src/deck/boot.js',
  `// deck/boot.js — deck entry point.
// Original source was a single minified call:
//   ${bootText}
// ${callName} is the boot helper (deck/framework.js), ${argOf('createDeck')} builds the deck, ${argOf('makeAudio')} the audio bank.
// The scene constants keep their minified names; the aliases below give them their
// scene ids, and docs/scenes.md lists what each one is.
const bootDeck = ${callName};
const createDeck = ${argOf('createDeck')};
const makeAudio = ${argOf('makeAudio')};

${sceneAliases}

bootDeck({
  createDeck,
  scenes: [${scenesArray}],
  transitions: { ${transitions} },
  makeAudio,
${headlessLine}});
`,
);

// --------------------------------------------------------------- docs/scenes.md
const rows = [...sceneInfo.values()].sort((a, b) => sceneList.indexOf(a.constName) - sceneList.indexOf(b.constName));
const order = sceneList.map((c) => sceneInfo.get(c));
const md = [
  '# Scenes',
  '',
  'Extracted from `src/deck/scenes.js` (original minified constant in brackets).',
  '',
  '| # | id | title | enterWith | beats | const |',
  '|---|----|-------|-----------|-------|-------|',
  ...order.map((s, i) => `| ${i + 1} | \`${s.id}\` | ${s.title} | ${s.enterWith || '—'} | ${s.beats.length} | \`${sceneList[i]}\` |`),
  '',
  ...order.flatMap((s, i) => [
    `## ${i + 1}. ${s.id} — ${s.title}`,
    '',
    `- const: \`${sceneList[i]}\`, enterWith: \`${s.enterWith || 'fade'}\``,
    s.beats.length ? `- beats: ${s.beats.map((b) => `${b.dur}s + hold ${b.hold}s (page ${b.page})`).join(', ')}` : '- beats: —',
    '',
    ...(s.notes.length ? ['Speaker notes:', '', ...s.notes.map((n) => `> ${n.replace(/\n/g, '\n> ')}`), ''] : ['']),
  ]),
];
write('docs/scenes.md', md.join('\n'));
console.log(
  JSON.stringify(
    {
      styles: styles.map((s) => s.length),
      bodyHtml: bodyHtml.length,
      fonts: Object.keys(fonts).length,
      images: Object.keys(images).length,
      assetBytes: Object.values(manifest.fonts).concat(Object.values(manifest.images)).reduce((a, b) => a + b.bytes, 0),
      statements: stmts.length,
      modules: MODULES.map((m) => m[0]),
      scenes: sceneInfo.size,
    },
    null,
    2,
  ),
);
