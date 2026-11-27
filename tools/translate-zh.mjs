// Translate the deck's user-visible strings using i18n/zh.json.
// Literals are located with babel (not by regex) so comments, shaders and
// dynamic template literals are never touched. Each hit is counted.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire('/Users/gml/.nvm/versions/node/v24.22.2/lib/node_modules/rea-agents/package.json');
const babel = require('@babel/parser');

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const map = JSON.parse(fs.readFileSync(path.join(ROOT, 'i18n/zh.json'), 'utf8'));
const FILES = ['src/deck/scenes.js', 'src/deck/shared.js', 'src/deck/framework.js'];
const PREFIX = '(() => {\n';
const hits = new Map();

for (const rel of FILES) {
  const code = fs.readFileSync(path.join(ROOT, rel), 'utf8');
  const ast = babel.parse(PREFIX + code + '\n})();', { sourceType: 'script' });
  const spans = [];
  const walk = (n) => {
    if (!n || typeof n.type !== 'string') return;
    if (n.type === 'StringLiteral' && map[n.value] !== undefined) {
      spans.push({ start: n.start - PREFIX.length, end: n.end - PREFIX.length, en: n.value });
    }
    if (n.type === 'TemplateLiteral' && n.expressions.length === 0) {
      const v = n.quasis.map((q) => q.value.cooked).join('');
      if (map[v] !== undefined) spans.push({ start: n.start - PREFIX.length, end: n.end - PREFIX.length, en: v });
    }
    for (const k of Object.keys(n)) {
      const v = n[k];
      if (Array.isArray(v)) v.forEach(walk);
      else if (v && typeof v.type === 'string') walk(v);
    }
  };
  walk(ast.program);

  let out = code;
  for (const s of spans.sort((a, b) => b.start - a.start)) {
    out = out.slice(0, s.start) + JSON.stringify(map[s.en]) + out.slice(s.end);
    hits.set(s.en, (hits.get(s.en) || 0) + 1);
  }
  fs.writeFileSync(path.join(ROOT, rel), out);
  console.log(`${rel}: ${spans.length} literals translated`);
}

// window title lives in the HTML skeleton
const tpl = 'src/index.template.html';
const tplCode = fs.readFileSync(path.join(ROOT, tpl), 'utf8');
const oldTitle = '<title>The Last Boring Slide</title>';
if (tplCode.includes(oldTitle)) {
  fs.writeFileSync(path.join(ROOT, tpl), tplCode.replace(oldTitle, '<title>最无聊的一页幻灯片</title>'));
  console.log(`${tpl}: title translated`);
}

const unused = Object.keys(map).filter((k) => !hits.has(k));
console.log(`\ntotal literals translated: ${[...hits.values()].reduce((a, b) => a + b, 0)}`);
console.log(`unused map keys: ${unused.length}`);
for (const k of unused) console.log('  unused: ' + JSON.stringify(k).slice(0, 110));
