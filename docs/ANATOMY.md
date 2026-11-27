# ANATOMY — 源码结构说明

本文说明 `index.html`（5.2 MB 单文件）拆成 `src/` + `assets/` 之后各块是什么、怎么拼回去、
哪些名字被还原、哪些故意保留压缩名、以及为什么可以认为重建版本与原件行为一致。

## 1. 来源与三层产物

| 层 | 文件 | 说明 |
|----|------|------|
| 原件 | `capture/artifact.html` | 从 frame 文档取回的原始字节（5,039,647 B），**不要改**，是等价性基准 |
| 源码 | `src/` + `assets/` | 资产外置、代码按顶层语句切模块、prettier 美化、boot 显式化 |
| 成品 | `index.html` | `node build.mjs` 生成（5,339,396 B），与原件运行形态相同：单文件、纯静态、零外部请求 |

原件结构（一望即知的三段）：一个 `<script>` 装全部资产（3.56 MB base64），另一个 `<script>`
装全部代码（1.47 MB，esbuild 风格的单个 IIFE）。

## 2. 目录

```
capture/artifact.html        原件（基准）
assets/fonts/  9 个字体       30.6K GeistMono-latin.woff2 … 35.2K unb800.woff      （合计 ≈ 279 KB）
assets/img/   14 张 jpg       23.3K thumb-questions.jpg … 983.6K selectall-earth.jpg（合计 ≈ 2.36 MB）
assets/manifest.json         file / bytes / mime / sha256，构建时据此还原 window.__FONTS / window.__ASSETS
src/index.template.html      HTML 骨架，占位 <!--STYLES--> <!--ASSETS--> <!--DECK-->
src/base.css                 宿主注入的基础样式（body margin、[hidden]、img max-width），渲染依赖它，保留
src/deck.css                 作品自己的样式（#stage 全屏、.notes、.over 缩略图、.help、.toast、.load）
src/vendor/three.min.js      three.js r187，作者自带的压缩版，原样保留（733.7 KB）
src/deck/framework.js        1,753 行  引擎：数学/缓动/噪声、GLSL 前导、WebGL 层、文字渲染、createDeck、HUD、boot、fade
src/deck/audio.js            4,265 行  WebAudio 合成：振荡器、噪声、采样生成、makeAudio（分轨/闪避/静音）
src/deck/shared.js             750 行  画布/贴图工具、METR 数据集与图表绘制、议程文案、相机路径、曝光曲线
src/deck/scenes.js          15,881 行  13 个场景（每个场景自带辅助函数、几何体、着色器）
src/deck/transitions.js      1,332 行  另外 9 个转场：portal-in/out、fold、wash、flaps、slam、daybreak、line、tear
src/deck/boot.js                55 行  deck 入口，把场景/转场/音频接进 boot 助手
tools/extract.mjs            一次性抽取脚本（原件 → src/ + assets/ + docs/scenes.md）
tools/aliases.mjs            生成 docs/three-aliases.md
tools/png.mjs                自写 PNG 解码 + 像素差（本机无 PIL / ImageMagick）
tools/scenes.json            13 个场景 id（顺序）
build.mjs                    src/ + assets/ → index.html
verify.mjs                   原件 vs 成品：报错、deck 状态、逐场景像素差
```

## 3. 模块边界（按原件顶层语句编号）

原代码 IIFE 体共 613 条顶层语句，边界靠断言校验（`tools/extract.mjs` 的 `MARKERS`）：

| 语句区间 | 模块 | 边界（该语句开头） |
|----------|------|--------------------|
| 0–357 | `vendor/three.min.js` | `var cw=Object.defineProperty` |
| 358–377 | `framework.js` | `var Ve=Math.PI*2` |
| 378–409 | `audio.js` | `var So=Math.PI*2` |
| 410–426 | `shared.js` | `var pA=` |
| 427–596 | `scenes.js` | `var Ms=` |
| 597–610 | `transitions.js` | `var Xb={dur:3.2` |
| 611 | `transitions.js` 尾 | `var v2=2.8` |
| 612 | `boot.js` | `C3({createDeck:A3,…})` |

场景常量的原名（`$3`, `My`, `Ky`, …）保留在代码里，`boot.js` 用可读别名把它们映射到场景 id，
`docs/scenes.md` 逐场景列出标题、转场、节拍与备注原文。

## 4. 运行链路

1. `base.css` / `deck.css` 定义全屏 canvas 与所有浮层（`.load` `.over` `.notes` `.help` `.toast`）。
2. 资产 `<script>` 挂 `window.__FONTS` / `window.__ASSETS`（data URI）。
3. deck `<script>` 是单个 IIFE：three.js → 引擎 → 音频 → 共享工具 → 场景 → 转场 → `boot.js`。
4. `A3`（createDeck）加载字体、建 GL 上下文（`b3` → 目标/通道）、建文字渲染器（`S3`）、
   建 HUD（`R3`）、初始化 13 个场景；镜头/鼠标由 `view` 与 `mouse` 统一驱动。
5. `C3`（boot）挂 `window.__deck`、解析 `#scene-beat`、非 `?headless` 时显示 “Opening presentation”
   进度条（进度来自 `deck.warmAll`），最后置 `window.ready = true`。

### deck 对外 API（`window.__deck`，供脚本/深链使用）

| 成员 | 行为 |
|------|------|
| `advance()` / `back()` | 下一拍 / 上一拍；到边界则切场景（转场速度临时 3.5×） |
| `go(index, {with, reverse, beat})` | 切到某场景并指定转场 |
| `jump(idOrIndex, beat = 0)` | 直接跳转（跳过转场，深链与校验都用它） |
| `setAuto(bool)` / `toggleBlack()` / `mute(bool?)` | 自动播放 / 黑屏 / 静音 |
| `info()` | `{scene, index, beat, title, notes}` |
| `on(event, cb)` | 订阅 `move` / `beat` / `back` / `auto` / `mute` 等 |
| `warmAll(cb)` | 预加载/预热所有场景（开场进度条用） |
| getter `auto` / `muted` / `trans` / `cur` | 状态读取 |

键盘映射（`framework.js` 末尾的 `keydown`）：`→ ↓ 空格 PageDown Enter` 前进，`← ↑ PageUp Backspace`
后退，`Home/End` 首尾，`o` 总览，`n` 备注，`p` 演讲者视图，`? h` 帮助，`a` 自动播放，`m` 静音，
`f` 全屏，`.` 黑屏，`Esc` 关浮层；带 `Cmd/Ctrl/Alt` 的组合键一律放行给浏览器。

## 5. 反混淆做了什么

- **资产层**（占体积 70%）：23 个 base64 data URI 还原成真实文件，`assets/manifest.json` 记录
  mime / 字节数 / sha256；构建时按原 key 顺序重新内联。
- **代码层切模块**：用 babel AST 取 IIFE 体的 613 条顶层语句，按边界切成 7 个文件，每个文件带
  行内 banner 说明职责；13 个场景各有一个 `// ── scene <id> · <title>` banner。
- **格式化**：app 层（1.47 MB → 1.73 MB）经 prettier 展开，最长行从 252,981 字符降到可读宽度；
  三元/逗号表达式被拆成独立语句，便于逐行读。
- **入口可读化**：`boot.js` 用 `const createDeck = A3` 这类别名替换压缩名，并把原来一行 257 B 的
  boot 调用展开成带注释的对象字面量；`headless: new URLSearchParams(location.search).has('headless')`
  显式写回（原抽取脚本正则丢过这个字段，等价性 diff 抓到了）。
- **three.js 符号**：`docs/three-aliases.md` 通过 bundle 自带的 export getter 反查，
  列出 deck 代码实际用到的 80 个别名（如 `F`=Vector3、`Zt`=Mesh、`re`=GLSL3、`ge`=Scene）。

## 6. 反混淆没做什么（以及为什么）

- **没有对内部局部变量做重命名**。esbuild 的短名在不同作用域复用（同一个 `W`/`D`/`z` 在几十个函数里
  指不同东西），纯文本替换必然串味；正确做法是 scope-aware 重命名器（babel `scope.rename` +
  全量重建），会把 1.7 MB 代码重排成几万行 diff，无法再和原件做逐行等价性证明。收益/风险比不划算，
  因此保留压缩名，改为在文档里给出入口和关键符号的映射。
- **`vendor/three.min.js` 保持压缩**：第三方代码，MIT 头保留，不做美化（否则体积和噪音都变大）。
- **没有重写逻辑**：所有常量、着色器、文案、METR 数据点、备注原文、音效参数都是原件字节的直接
  搬运，不存在“按理解重写”的部分。

## 7. 验证

1. **静态等价证明**：对原件的代码段和 `index.html` 的代码段分别跑 prettier，去掉空行与注释后
   逐行比对 —— 唯一差异是 `boot.js` 的显式重写（别名 + `headless`），说明切分与美化是纯格式变换。
2. **运行时像素比对**（`node verify.mjs`）：同时打开 `capture/artifact.html` 与 `index.html`，
   用 `addInitScript` 把 `requestAnimationFrame` 时间戳和 `performance.now()` 换成一个可手动推进的
   虚拟时钟（两边逐帧同值推进 120 帧 = 1.92 s），因此动画停在同一帧再截图对比。
   结果（中文化之前）：**13/13 场景 `mean = 0`**（`futures` 有 3 个像素 max=12 的抗锯齿差异），
   `info()` 全部一致，两个页面 0 console error / 0 pageerror / 0 失败请求。
3. **中文化后用同样的方法验排版**：不过 `?headless` 下场景不会预热绘制（截图为空白），
   必须用正常 URL 驱动 `advance()` 逐拍截图；`i18n/zh.json` 的 171 条替换与
   `assets/img/thumb-*.jpg` 的重新截取都以此逐张核对。
4. **入口行为**：`?headless` 两边都跳过开场 loader、`window.ready` 为真；`#office-2` 深链、
   `o`/`n`/`?` 浮层、13 张缩略图总览均正常。

## 8. 重建

```bash
node build.mjs        # src/ + assets/ → index.html（约 1 秒，无依赖）
node verify.mjs       # 需要本机 Chrome + rea 自带的 playwright-core；截图落在 /tmp/verify-slides
node tools/aliases.mjs   # 重新生成 docs/three-aliases.md
```

`tools/extract.mjs` 只在需要从 `capture/artifact.html` 重新抽取时运行（`npm run extract`）：
它输出的模块是原始压缩代码，随后要用 `npx prettier --write src/deck/*.js` 美化（prettier 是
唯一的作者期依赖，`npm i` 装上即可；构建与校验本身零依赖）。
