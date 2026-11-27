# The Last Boring Slide — 复现 + 源码拆解

复现对象：<https://claude.ai/artifact/Cy2d8Vn63CnzCtonA1LSah>

原页面是 Claude Artifacts 里的一个分享作品 **“The Last Boring Slide”**：13 个场景的演示，开场故意
做成一份无聊的 PPT（“The Future of AI — An Overview”），随后逐场黑化/展开。它不是图文页面，
而是全屏 Canvas + WebGL 的动画放映器 —— three.js 内联、自绘 2D/3D 场景、WebAudio 合成音效、
演讲备注、缩略图总览、深色 HUD。原件是单个 5 MB HTML，代码压缩成一行 25 万字符。

## 用法

```bash
open index.html          # 直接双击也行：无构建、无依赖、无外部请求
python3 -m http.server   # 或起静态服务器
```

快捷键：`→/↓/空格/Enter` 前进，`←` 后退，`Home/End` 首尾，`o` 总览，`n` 备注，`?/h` 帮助，
`p` 演讲者视图，`a` 自动播放，`m` 静音，`f` 全屏，`.` 黑屏，`Esc` 关浮层。
深链：`index.html#office-2`（场景 id + 第几拍，从 1 开始）。`?headless` / `?quick` 跳过预热和开场动画。

## 目录

| 路径 | 内容 |
|------|------|
| `capture/artifact.html` | 从 frame 文档取回的**原件字节**（基准，勿改） |
| `assets/fonts/`、`assets/img/` | 原件内联的 9 个字体 + 14 张图片，已还原成真实文件 |
| `assets/manifest.json` | 每个资产的 mime / 字节数 / sha256 |
| `src/vendor/three.min.js` | three.js r187（作者自带的压缩版，原样保留） |
| `src/deck/*.js` | 引擎 / 音频 / 共享工具 / 13 场景 / 9 转场 / 入口，共 24k 行，已美化 |
| `src/*.css`、`src/index.template.html` | 样式与 HTML 骨架 |
| `index.html` | 构建产物：单文件、纯静态、零外部请求（5.2 MB） |
| `docs/ANATOMY.md` | 源码结构、模块边界、deck API、反混淆做了什么/没做什么、验证方法 |
| `docs/scenes.md` | 13 个场景的 id / 标题 / 转场 / 节拍 / 备注原文 |
| `docs/three-aliases.md` | deck 代码里 80 个 three.js 压缩别名的反查表 |
| `build.mjs`、`verify.mjs`、`tools/` | 构建、比对校验、一次性抽取脚本 |

## 构建与校验

```bash
node build.mjs           # src/ + assets/ → index.html（无依赖）
node verify.mjs          # 原件 vs 成品：逐场景像素比对（需本机 Chrome + rea 的 playwright-core）
npm run record           # 录制成 MP4（需 ffmpeg；约 8 分 10 秒，1280×720，含音效）
```

`last-boring-slide-zh.mp4` 就是录好的成片：H.264 + AAC，8:10，187 MB。录制脚本 `tools/record-mp4.mjs`
用 Playwright 录画面，同时把 deck 自己的 WebAudio 图（所有连到 `ctx.destination` 的节点）镜像到
`MediaStreamDestination`，再用 MediaRecorder 录下来，最后 ffmpeg 合成。想要更小：`ffmpeg -i in.mp4 -crf 26 -c:v libx264 ...`。

`verify.mjs` 用虚拟时钟（`requestAnimationFrame` 时间戳 + `performance.now()` 可手动推进）让两个页面
停在同一动画帧再比像素。**中文版之前**它的结果是 13/13 场景 `mean = 0`、`info()` 一致、0 报错、
0 失败请求（这是“拆解/美化没有改变行为”的证明）；现在成品已是中文，像素必然与英文原件不同，
`verify.mjs` 只保留报错采集的作用，要复跑像素证明请先按下面“中文化”一节回退。截图落在 `/tmp/verify-slides/`。

## 中文化

界面、13 场幻灯片、图表标签、演讲备注、帮助浮层、提示语已全部译为中文，窗口标题为《最无聊的一页幻灯片》。

| 路径 | 作用 |
|------|------|
| `i18n/zh.json` | 英→中映射表（171 条），人工可 review |
| `tools/translate-zh.mjs` | 用 babel 定位字符串字面量并替换，报告命中数；**非幂等**（跑在已翻译源码上时全部 key 都算“未命中”） |
| `assets/img/thumb-*.jpg` | 13 张总览缩略图，已按中文版场景重新截取（800×450） |

```bash
node tools/translate-zh.mjs   # 只跑一次
node build.mjs
```

回退成英文：`node tools/extract.mjs && npx prettier --parser babel --print-width 110 --write src/deck/*.js`
（会整份重写 `src/`，之后重新 `node build.mjs`）。仍保留英文的只有型号名（GPT-4 / o3 / Opus 4.5 / Opus 4.6 /
Mythos Preview / GPT-6 Astra / Claude 3.5 Sonnet / Claude 3.7 Sonnet）和 three.js 内部报错文案。
`docs/scenes.md` 仍是英文原稿（由 `extract.mjs` 从原件生成）。

## 复现路径（REA）

1. `curl` 只能拿到 `claude.ai` 外壳页（frame-shell），正文来自 Cloudflare 保护的
   `<uuid>.frame.claudeusercontent.com/_f/<build>/` 帧文档。
2. `rea capture-browser-scenario` 用**有头** Chrome 打开页面（headless 会被 CF 挑战重定向到
   `/api/challenge_redirect`），采集截图 / DOM / 网络事件；截图确认渲染成功，网络里定位到约 5 MB 的帧文档。
3. 用 Playwright（rea 自带 `playwright-core`）重复同一路径，取该帧文档的**原始响应体** =
   artifact 源码（REA 自身的 network body 预算读不完 54 MB 响应，所以这一步是手写脚本）。
4. 剥掉注入的 `<!-- frame-runtime -->` 桥接脚本，把作品的 `<title>` / `<style>` 归位到 `<head>`
   （宿主注入的基础样式保留，`body{margin:0}` 与 `[hidden]` 规则渲染依赖它）。
5. 反混淆：资产外置 → babel AST 按 613 条顶层语句切模块 → prettier 美化 → 入口可读化 → 重建单文件。

## 与线上差异

- 去掉宿主外壳：顶部“分享 / Sign in / 内容未经核实”横条、评论与分享按钮、遥测上报。
- 宿主注入的 i18n 与自动翻译不在了（作品本身以英文文案渲染）。
- 音效依赖浏览器用户手势解锁（首次按键/点击后才有声），与原站行为一致。

## 来源与权利

原件里的 deck 引擎、场景、文案、METR 数据与备注都由原作品作者创作，本仓库没有重写它们，
只做了「外置资产 → 切模块 → 美化 → 中文化」的可读化处理，语义未变。three.js 部分遵循其 MIT 许可。

原作品是发布在 Claude Artifacts 上的用户生成内容（原页面标注 unverified），本仓库的用途是
源码阅读与技术复现。若原作者希望撤下，请开 issue，我会立即删除仓库或相关文件。
