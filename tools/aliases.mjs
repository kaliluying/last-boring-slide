// Generate docs/three-aliases.md: which minified identifiers in the deck code are
// three.js exports, resolved through the bundle's own export getter objects.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire('/Users/gml/.nvm/versions/node/v24.22.2/lib/node_modules/rea-agents/package.json');
const babel = require('@babel/parser');

const ROOT = path.dirname(fileURLToPath(import.meta.url)) + '/..';
const three = fs.readFileSync(`${ROOT}/src/vendor/three.min.js`, 'utf8');

const aliasToName = new Map();
for (const m of three.matchAll(/\{([A-Za-z_$][\w$]*:\(\)=>[A-Za-z_$][\w$]*,){10,}/g)) {
  for (const pair of m[0].slice(1).split(',')) {
    const [name, ident] = pair.split(':()=>');
    if (name && ident && !aliasToName.has(ident)) aliasToName.set(ident, name);
  }
}

const DECK = ['deck/framework.js', 'deck/audio.js', 'deck/shared.js', 'deck/scenes.js', 'deck/transitions.js', 'deck/boot.js'];
const code = `(()=>{\n${DECK.map((f) => fs.readFileSync(`${ROOT}/src/${f}`, 'utf8')).join('\n')}\n})();`;
const ast = babel.parse(code, { sourceType: 'script' });

const counts = new Map();
const skip = new WeakSet();
const walk = (node, parent) => {
  if (!node || typeof node.type !== 'string') return;
  if (node.type === 'MemberExpression') skip.add(node.property);
  if (node.type === 'ObjectProperty' || node.type === 'ObjectMethod' || node.type === 'ClassMethod') {
    if (!node.computed) skip.add(node.key);
  }
  if (node.type === 'Identifier' && !skip.has(node) && aliasToName.has(node.name)) {
    counts.set(node.name, (counts.get(node.name) || 0) + 1);
  }
  for (const key of Object.keys(node)) {
    if (key === 'loc' || key === 'start' || key === 'end' || key === 'leadingComments' || key === 'trailingComments') continue;
    const value = node[key];
    if (Array.isArray(value)) value.forEach((child) => walk(child, node));
    else if (value && typeof value.type === 'string') walk(value, node);
  }
};
walk(ast.program, null);

const rows = [...counts.entries()].sort((a, b) => b[1] - a[1]);
const md = [
  '# three.js aliases used by the deck code',
  '',
  'The bundle re-exports three.js through getter objects, so every `THREE.X` in the original',
  'source became a short local name. This table resolves the aliases that appear in',
  `\`src/deck/*.js\` (${rows.length} symbols; identifier nodes counted with babel, so`,
  'property names and `for (... of ...)` are not miscounted).',
  '',
  '| alias | three.js export | uses |',
  '|-------|-----------------|------|',
  ...rows.map(([alias, n]) => `| \`${alias}\` | \`${aliasToName.get(alias)}\` | ${n} |`),
];
fs.writeFileSync(`${ROOT}/docs/three-aliases.md`, md.join('\n') + '\n');
console.log(`${rows.length} aliases -> docs/three-aliases.md`);
console.log(rows.slice(0, 15).map(([a, n]) => `${a}=${aliasToName.get(a)}:${n}`).join(' '));
