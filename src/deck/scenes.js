// deck/scenes.js
// The 13 scenes, each with its own helper functions, geometry and shaders.
// Part 427-596 of the original 613 top-level statements; all modules are
// concatenated back into one IIFE by build.mjs, so they share a single scope.

// ── scene office · "The Future of AI" · enterWith: fade ──
var Ms = co[co.length - 1],
  bA = Ms + 2.6,
  wA = ["开场", "收益与挑战", "最佳实践", "下一步", "提问"],
  $3 = {
    id: "office",
    title: "AI 的未来",
    enterWith: "fade",
    hud: {
      color: (i) =>
        i.beat < 2 || i.at(2) < js || i.at(2) > Ms + 0.3
          ? "#7f7f7f"
          : [
              "#7f7f7f",
              "#0c0d0f",
              "#0b2346",
              "#15110a",
              "#0d3b2a",
              "#ffffff",
              "#6b0f2c",
              "#5a1404",
              "#ffffff",
              "#ffffff",
            ][Math.min(9, Math.max(0, co.findIndex((t) => t > i.at(2)) - 1))],
      font: (i) => (i.beat < 2 || i.at(2) < js ? "arial" : "monoMed"),
      alpha: 0.9,
    },
    beats: [
      { dur: 0.5, hold: 4, page: "1" },
      { dur: 4.2, hold: 3.5, page: "2" },
      { dur: bA, hold: 1.5, page: "3" },
    ],
    notes: [
      "各位好。今天聊聊 AI 的未来。\n（说得很平。让这页幻灯片无聊下去。等一等。）",
      "这是议程。我们先做个开场，然后看收益与挑战……\n（把这几条慢慢念出来。然后按下一页，闭嘴。）",
      "什么都别动。让这套片子自己演。等图表出现在屏幕上，再开口。",
    ],
    create(i) {
      let { gfx: t, view: e } = i,
        n = t.target({}),
        o = t.target({}),
        s = null,
        a = i.overlay(),
        r = new Qn({ color: "#ffffff", order: -10 });
      a.add(r);
      let l = Wf(i, a),
        c = i.text("AI 的未来", {
          x: 960,
          y: 450,
          size: 96,
          font: "arial",
          color: "#000000",
          align: "center",
          valign: "middle",
        }),
        u = i.text("综述", {
          x: 960,
          y: 590,
          size: 44,
          font: "arial",
          color: "#7f7f7f",
          align: "center",
          valign: "middle",
        });
      a.add(c, u);
      let f = i.overlay(),
        h = new Qn({ color: "#ffffff", order: -10 });
      f.add(h);
      let d = Wf(i, f),
        p = i.text("议程", { x: 130, y: 150, size: 80, font: "arial", color: "#000000", valign: "middle" }),
        x = wA.map((Z, H) => {
          let Y = i.text("\u2022   " + Z, {
            x: 150,
            y: 330 + H * 108,
            size: 46,
            font: "arial",
            color: "#262626",
            valign: "middle",
          });
          return (f.add(Y), Y);
        }),
        v = X3(),
        m = new Qn({ tex: v.tex, order: 3 });
      f.add(m, p);
      let g = new Qn({ color: "#000000", order: 5 });
      f.add(g);
      let b = new i.SelectBox(),
        y = i.overlay();
      y.add(b);
      let S = t.pass(
          Fe +
            `uniform sampler2D tA,tB; uniform float p; uniform int mode; uniform vec4 v;
      float cov(vec2 uv){ float asp=uRes.x/uRes.y; vec2 q=vec2(uv.x*asp,uv.y); float w=2.2/uRes.y;
       if(mode==0){ vec2 n=vec2(10.,6.); vec2 c=floor(uv*n); vec2 f=fract(uv*n); float odd=mod(c.x+c.y,2.); float k=clamp(p*2.-odd,0.,1.); return step(f.x,k); }
       if(mode==1){ float d=dot(uv-.5,normalize(vec2(1.,.35)))+.68; return 1.-smoothstep(-.0015,.0015,d-p*1.36); }
       if(mode==2){ vec2 c=vec2(.72*asp,.62); float r=p*p*(3.-2.*p)*2.3; return 1.-smoothstep(-w,w,length(q-c)-r); }
       if(mode==3){ float s=fract(uv.y*9.); float k=clamp(p*1.6-uv.x*.6,0.,1.); return 1.-smoothstep(-.01,.01,abs(s-.5)*2.-(k*1.04-.02)); }
       if(mode==4){ float n=9.; float i=floor(uv.x*n); float k=clamp(p*1.7-i/n*.7,0.,1.); k=k*k*(3.-2.*k); float y=mod(i,2.)<.5?uv.y:1.-uv.y; return 1.-smoothstep(-.001,.001,y-k); }
       if(mode==5){ vec2 c=floor(uv*vec2(32.,18.)); float d=length((c/vec2(32.,18.)-.5)*vec2(asp,1.)); return step(d+.25*hash12(c),p*1.45-.1); }
       if(mode==6){ float a=atan(uv.y-.5,(uv.x-.5)*asp)/6.28318+.5; float k=fract(a*5.+p*.4); return 1.-smoothstep(-.01,.01,k-p*1.02); }
       if(mode==7){ float s=sin(length(q-vec2(.5*asp,.5))*16.-p*6.)*.10*(1.-p); return 1.-smoothstep(-w,w,length(q-vec2(.5*asp,.5))+s-p*1.15); }
       if(mode==8){ float d=uv.x+.05*sin(uv.y*9.+p*7.)+.03*sin(uv.y*23.-p*9.); return 1.-smoothstep(-.002,.002,d-(p*1.2-.1)); }
       return p; }
      void main(){ float k=cov(vUv); vec3 a=texture(tA,vUv).rgb,b=texture(tB,vUv).rgb; o=vec4(mix(a,b,k),1.); }`,
          { tA: null, tB: null, p: 0, mode: 0, v: new ie() },
        ),
        M = null,
        w = null,
        E = i.overlay(),
        T = new Qn({ order: 0 });
      E.add(T);
      let _ = new Qn({ color: "#ffffff", order: -5 });
      E.add(_);
      function R() {
        if (!a0) return;
        let Z = t.aspect,
          H = Math.min(3072, Math.max(1280, Math.round(e.ppu * (Z >= 16 / 9 ? e.w : (e.h * 16) / 9)))),
          Y = Math.round((H * 9) / 16);
        ((w = w || document.createElement("canvas")),
          (w.width = H),
          (w.height = Y),
          $f(w.getContext("2d"), H, Y, {}),
          M && M.dispose(),
          (M = new Hn(w)),
          (M.colorSpace = Mn),
          (M.generateMipmaps = !1),
          (M.minFilter = He),
          (M.flipY = !1),
          (T.mat.uniforms.tA.value = M),
          (T.mat.uniforms.uT.value = 1),
          s && s.face.set(M));
      }
      let L = (Z, H, Y, q = 17) => Z.slice(0, Math.max(0, Math.floor((Y - H) * q))),
        k = -1,
        P = {},
        C = (Z, H, Y, q) => {
          (H && !P[Z] && q.dt > 0 && q.dir > 0 && Y(), (P[Z] = H));
        },
        A = [0, 0, 100, 100],
        N = 0,
        G = -1,
        B = -1,
        ot = 0,
        ut = "3";
      function lt(Z) {
        return Z < 1.9
          ? "议程"
          : Z < 2.5
            ? "议程".slice(0, Math.max(0, 6 - Math.floor((Z - 1.9) * 12)))
            : Z < 4.6
              ? L("这页幻灯片很糟。", 2.5, Z) || " "
              : Z < 7.4
                ? "这页幻灯片很糟。"
                : Z < 8
                  ? "这页幻灯片很糟。".slice(0, Math.max(0, 18 - Math.floor((Z - 7.4) * 34))) || " "
                  : L("我能修好它。", 8, Z, 20) || " ";
      }
      return {
        init() {
          ((s = Y3(i)),
            R(),
            s.forEach((Z, H) => {
              (Z.update(0.6, 1, {}), Z.render(n));
            }));
        },
        enter(Z) {
          ((P = {}), (k = -1));
        },
        resize() {
          R();
        },
        page(Z) {
          if (Z.beat < 2) return Z.beat + 1;
          let H = Z.at(2);
          if (H < js) return "3";
          let Y = co.findIndex((q) => q > H);
          return Y < 0 ? " " : String(Y + 3);
        },
        update(Z) {
          for (let rt of [r, h, _]) rt.set(e.x0, e.y0, e.w, e.h);
          (l.update(), d.update(), c.animate(), u.animate());
          let H = Z.at(2),
            Y = Z.p[2] > 0,
            q = (rt) => bt.out2(Z.k(1, 1.3 + rt * 0.55, 1.75 + rt * 0.55, bt.lin)),
            st = Y ? lt(H) : "议程";
          (st !== p.text &&
            (st.length !== k && Z.dir > 0 && Z.dt > 0 && i.sfx("type", { gain: 0.8 }),
            (k = st.length),
            p.set(st)),
            p.animate());
          let ct = (rt) => H > 5.35 + rt * 0.13;
          x.forEach((rt, U) => {
            let j = q(U);
            ((rt.x = K(-900, 150, j)),
              (rt.alpha = j > 0 && !(Y && ct(U)) ? 1 : 0),
              rt.animate(),
              Y && C("db" + U, ct(U), () => i.sfx("delete", { gain: 0.7, pitch: 1 + U * 0.04 }), Z));
          });
          let V = bt.io3(Te(6.15, 7, H)) * (Y ? 1 : 0);
          (v.draw(V, 0, bt.out2(Te(6.9, 7.35, H)) * (Y ? 1 : 0)),
            m.set(1060, -200, 750, 980),
            m.alpha(Z.k(1, 0.2, 0.3) * (H > 8.6 && Y ? 0 : 1)));
          let ft = Y && ((H > 1.9 && H < 4.4) || (H > 7.4 && H < 9));
          g.set(p.x + (p.text.trim() ? p.width : 0) + 5, 112, 4, 76).alpha(
            ft && (Math.sin(H * 9) > -0.4 || H < 4) ? 1 : 0,
          );
          let nt = null,
            Mt = 0,
            Et = Y,
            at = [p.x - 24, 92, Math.max(120, p.width) + 48, 116];
          if (H < 4.7) ((nt = [106, 92, Math.max(300, p.width) + 48, 116]), (Mt = Te(0.85, 1.15, H)));
          else if (H < 5.55) {
            if (((nt = [126, 272, 660, 548]), (Mt = Te(4.75, 5, H)), H > 5.35)) {
              let U = Te(5.35, 6, H);
              nt = [126, 272 + 548 * U, 660, 548 * (1 - U) + 2];
            }
          } else if (H < 7.25) {
            let rt = v.tip,
              U = 1060 + rt[0],
              j = 190 + rt[1],
              J = bt.io3(Te(5.6, 5.95, H));
            ((nt = [K(1060, U - 34, J), K(250, j - 34, J), K(750, 68, J), K(540, 68, J)]),
              (Mt = Te(5.55, 5.8, H)));
          } else H < js && ((nt = at), (Mt = Te(7.28, 7.45, H)));
          if (
            (C("sel1", Y && H > 0.85, () => i.sfx("select"), Z),
            C("sel2", Y && H > 4.75, () => i.sfx("select"), Z),
            C("sel3", Y && H > 5.6, () => i.sfx("select"), Z),
            C("bend", Y && H > 6.1, () => i.sfx("rise", { gain: 0.6 }), Z),
            C("sel4", Y && H > 7.3, () => i.sfx("select"), Z),
            (G = -1),
            (B = -1),
            Y && H >= js - 0.5)
          ) {
            let rt = 0;
            for (; rt < To.length - 1 && H >= co[rt + 1];) rt++;
            let U = H - co[rt],
              j = Math.min(0.62, To[rt] * 0.46);
            if (H < js) ((G = -1), (B = -1));
            else {
              let J = Te(0, j, U);
              ((G = rt - 1),
                (B = rt),
                (ot = bt.io3(J)),
                (N = [1, 2, 3, 4, 5, 6, 8, 7, 2, 1][rt]),
                J >= 1 && (G = B));
              for (let Pt of new Set([G, B])) Pt >= 0 && s[Pt].update(Math.max(0, H - co[Pt]), To[Pt], Z);
            }
            if (
              ((s.face.k = M ? Te(Ms - 1.15, Ms + 0.35, H) : 0),
              H >= Ms - 1.2 && s[To.length - 1].update(H - co[To.length - 1], To[To.length - 1], Z),
              H >= Ms && ((G = B = To.length - 1), (H >= Ms + 0.36 || !M) && (G = B = 99)),
              H >= js && H < Ms)
            ) {
              let J = s[rt],
                Pt = rt ? s[rt - 1].rect() : at,
                $ = bt.outBack(Te(0, 0.34, U), 1.1);
              ((nt = J.rect().map((D, z) => K(Pt[z], D, $))), (Mt = 1));
              let W = Math.sin(H * 7) * 3;
              ((nt = [nt[0] - W, nt[1] - W, nt[2] + W * 2, nt[3] + W * 2]),
                rt === To.length - 1 && (Mt = 1 - Te(To[rt] * 0.45, To[rt] * 0.6, U)));
            } else H >= Ms && (Mt = 0);
            for (let J = 0; J < To.length; J++)
              C(
                "g" + J,
                H > co[J],
                () => {
                  (i.sfx("select", { pitch: 1 + J * 0.07 }),
                    i.sfx(J > 6 ? "boom" : "pop", { gain: 0.5 + J * 0.04, pitch: 1 + J * 0.05 }));
                },
                Z,
              );
            C("end", H > Ms, () => i.sfx("shimmer"), Z);
          }
          if ((b.color(Y && H > co[5] && H < co[6] ? "#ffffff" : i.SELECT), nt && Et)) {
            let rt = H < js && H > 0.8 ? bt.outBack(Ct(Mt), 2) : 1;
            b.set(...nt)
              .alpha(Ct(Mt * 3))
              .size(Math.max(0.05, rt))
              .knob(nt[2] > 160);
          } else b.alpha(0);
          if (a0) {
            let rt = t.aspect,
              U = rt >= 16 / 9 ? e.w : (e.h * 16) / 9,
              j = (U * 9) / 16;
            T.set(960 - U / 2, 540 - j / 2, U, j);
          }
        },
        render(Z, H) {
          let Y = (st, ct) => {
            st === 99 ? E.render(ct) : st < 0 ? f.render(ct) : s[st].render(ct);
          };
          if (H.p[2] > 0 && B !== -1) {
            if (G === B) {
              (Y(B, Z), y.render(Z));
              return;
            }
            (Y(G, n),
              Y(B, o),
              (S.u.tA.value = n.texture),
              (S.u.tB.value = o.texture),
              (S.u.p.value = ot),
              (S.u.mode.value = N),
              S.render(Z),
              y.render(Z));
            return;
          }
          let q = H.k(1, 0, 1.1, bt.lin);
          if (q <= 0) {
            a.render(Z);
            return;
          }
          if (q >= 1) {
            (f.render(Z), y.render(Z));
            return;
          }
          (a.render(n),
            f.render(o),
            (S.u.tA.value = n.texture),
            (S.u.tB.value = o.texture),
            (S.u.p.value = q),
            (S.u.mode.value = 0),
            S.render(Z));
        },
      };
    },
  };

var Ss = 30,
  fc = 53.33333,
  cv = 47,
  Xi = (() => {
    let i = [],
      t = 0,
      e = 0,
      n = 0,
      o = Uo[0].t,
      s = Yf.t,
      a = 6e4,
      r = -1e9;
    for (let l = 0; l <= a; l++) {
      let c = o + ((s - o) * l) / a,
        u = jf(c),
        f = Er(c),
        h = ns(u);
      (l && (n += Math.hypot((f - t) * fc, (h - e) * Ss)), (t = f), (e = h));
      let d = n < 90 ? 0.25 : n < 400 ? 0.7 : 1.5;
      (n - r >= d || l === a) && (i.push({ x: f, y: h, s: n, h: u, t: c }), (r = n));
    }
    for (let l = 0; l < i.length; l++) {
      let c = i[Math.max(0, l - 1)],
        u = i[Math.min(i.length - 1, l + 1)],
        f = (u.x - c.x) * fc,
        h = (u.y - c.y) * Ss,
        d = Math.hypot(f, h);
      ((i[l].tx = f / d), (i[l].ty = h / d));
    }
    return i;
  })(),
  uv = (i, t) => {
    let e = 0,
      n = Xi.length - 1;
    for (; n - e > 1;) {
      let r = (e + n) >> 1;
      Xi[r][i] < t ? (e = r) : (n = r);
    }
    let o = Xi[e],
      s = Xi[n],
      a = Ct((t - o[i]) / Math.max(1e-9, s[i] - o[i]));
    return [o, s, a];
  },
  fv = (i, t = {}) => {
    let [e, n, o] = uv("s", i);
    return ((t.x = K(e.x, n.x, o)), (t.y = K(e.y, n.y, o)), (t.h = K(e.h, n.h, o)), t);
  },
  Ta = (i) => {
    let [t, e, n] = uv("t", i);
    return K(t.s, e.s, n);
  },
  MA = Ta(ws["GPT-4"].t),
  ty = Ta(ws["Opus 4.5"].t),
  hc = Ta(ws["GPT-6 Astra"].t),
  SA = Xi[Xi.length - 1].s,
  EA = (i, t, e) => {
    i = Ct(i);
    let n = i ** t,
      o = (1 - i) ** e;
    return n / (n + o);
  },
  ey = [
    [5.15, ty],
    [7, Ta(ws["Opus 4.6"].t)],
    [8.25, Ta(ws["Mythos Preview"].t)],
    [9.7, hc - 52],
    [11.3, hc],
  ],
  ny = (i) => {
    let t = i.length,
      e = new Array(t).fill(0);
    for (let n = 1; n < t - 1; n++) {
      let o = i[n][0] - i[n - 1][0],
        s = i[n + 1][0] - i[n][0],
        a = (i[n][1] - i[n - 1][1]) / o,
        r = (i[n + 1][1] - i[n][1]) / s;
      e[n] = (3 * (o + s)) / ((2 * s + o) / a + (s + 2 * o) / r);
    }
    return e;
  },
  Z3 = (i) => {
    let [t, e, n] = uv("y", i);
    return K(t.s, e.s, n);
  },
  iy = [
    [0.1, MA],
    [1.35, Z3(0.0645 + 0.5 / Kf)],
    [2.25, Ta(ws.o3.t)],
    [3, Z3(1)],
    [4.45, ty],
  ];

function J3(i, t, e) {
  if (i <= t[0][0]) return t[0][1];
  let n = t.length - 1;
  if (i >= t[n][0]) return t[n][1];
  let o = 0;
  for (; i > t[o + 1][0];) o++;
  let s = t[o + 1][0] - t[o][0],
    a = (i - t[o][0]) / s,
    r = a * a,
    l = r * a;
  return (
    (2 * l - 3 * r + 1) * t[o][1] +
    (l - 2 * r + a) * s * e[o] +
    (-2 * l + 3 * r) * t[o + 1][1] +
    (l - r) * s * e[o + 1]
  );
}

var _A = ny(ey),
  TA = ny(iy);

function hv(i) {
  return i < 5 ? J3(i, iy, TA) : i < 12 ? J3(i, ey, _A) : K(hc, SA, EA((i - 12.1) / 6, 2.3, 2));
}

var AA = (i) => {
  if (i <= 0) return 0;
  if (i < 0.8) return Fn(i / 0.8) * 0.55 + bt.in2(i / 0.8) * 0.45;
  let t = (i - 0.8) * 5;
  return 1 + 0.085 * Math.sin(t * 2.3) * Math.exp(-t * 0.9);
};

function r0(i, t, e) {
  let n = Ss,
    o = 0;
  ((e[0] = 0), (e[1] = 0), (e[2] = 0), (e[3] = 0.02));
  let s = Ss,
    a = 1;
  for (let l = 0; l < 23; l++) {
    let c = 1 + 2 * l,
      u,
      f;
    if (l === 0) ((u = 0.55), (f = 0.62));
    else if (l === 1) ((u = 2.12), (f = 0.95));
    else {
      let y = Ct((l - 2) / 6);
      ((u = K(3, 4.6, y)), (f = K(2.5, 3.6, y)));
    }
    let h = (i - c + u) / f,
      d = AA(h),
      p = h > 0 && h < 0.8 ? Math.sin((Math.PI * h) / 0.8) : 0;
    d += p * 0.018 * Math.sin(t * 1.15 + l * 1.3);
    let x = (Math.PI / 2) * 0.985 * (1 - d),
      v = h > 0.002,
      m = Math.cos(x),
      g = Math.sin(x),
      b = v ? 0.07 + 0.62 * kt(h) * Math.exp(-Math.max(0, h - 0.75) * 2.1) + 0.05 * Ys(l + 3) : 0;
    for (let y = 0; y < 2; y++) {
      let S = (c + y) * 4,
        M = y ? 1 : -1;
      ((e[S] = v ? n : -900),
        (e[S + 1] = o),
        (e[S + 2] = x * M),
        (e[S + 3] = b),
        v && ((n += m * Ss), (o += g * M * Ss)));
    }
    v && ((s = n), (a = c + 2));
  }
  let r = a + 4 - (t / 8 - Math.floor(t / 8)) * (a + 12);
  for (let l = 0; l < a; l++) {
    let c = (l - r) / 1.6;
    e[l * 4 + 3] += (l ? 0.34 : 0.1) * Math.exp(-c * c);
  }
  return ((r0.count = a), s);
}

var _a = [
    { T: 0, x: -23, y: 5, z: 81, lx: -6, ly: 13.4, lz: 0, fov: 31, r: 0, f: 0 },
    { T: 2.3, x: -29, y: 4.6, z: 62, lx: -8, ly: 19.5, lz: 0, fov: 45, r: 0, f: 0 },
    { T: 5, x: -43, y: 5.5, z: 52, lx: -24, ly: 43, lz: 0, fov: 66, r: -0.01, f: 0, stop: 1 },
    { T: 6.6, x: -38, y: 34, z: 30, lx: -2, ly: 66, lz: -4, fov: 62, r: -0.02, f: 0 },
    { T: 8.1, x: -10, y: -8, z: 31, lx: 1, ly: 3, lz: 0, fov: 62, r: -0.05, f: 1 },
    { T: 9.2, x: 4, y: -14, z: 15, lx: 12, ly: 10, lz: 0, fov: 70, r: 0.06, f: 1 },
    { T: 10.3, x: -12, y: -8, z: 34, lx: 4, ly: 10, lz: 0, fov: 64, r: 0.03, f: 1 },
    { T: 12, x: -84, y: 7, z: 92, lx: -45, ly: 11, lz: 0, fov: 45, r: 0, f: 1, stop: 1 },
    { T: 14.2, x: 36, y: -10, z: 22, lx: 16, ly: 18, lz: -4, fov: 64, r: 0.05, f: 1 },
    { T: 16.2, x: 12, y: -15, z: 16, lx: 16, ly: 16, lz: 0, fov: 72, r: -0.06, f: 1 },
    { T: 18, x: -6, y: 2, z: 44, lx: -6, ly: 2, lz: -8, fov: 66, r: -0.02, f: 1 },
    { T: 19.3, x: -14, y: 24, z: 48, lx: -20, ly: -8, lz: 2, fov: 70, r: 0.03, f: 1 },
    { T: 21, x: -14, y: 22, z: 44, lx: -19.5, ly: -27, lz: 6, fov: 76, r: 0, f: 1, stop: 1 },
  ],
  rv = ["x", "y", "z", "lx", "ly", "lz", "fov", "r", "f"],
  Q3 = rv.map((i) =>
    _a.map((t, e) => {
      if (t.stop || e === 0 || e === _a.length - 1) return 0;
      let n = _a[e - 1],
        o = _a[e + 1];
      return (o[i] - n[i]) / (o.T - n.T);
    }),
  );

function oy(i, t) {
  i = Ct(i, 0, 21);
  let e = 0;
  for (; e < _a.length - 2 && i > _a[e + 1].T;) e++;
  let n = _a[e],
    o = _a[e + 1],
    s = o.T - n.T,
    a = Ct((i - n.T) / s),
    r = a * a,
    l = r * a;
  for (let c = 0; c < rv.length; c++) {
    let u = rv[c];
    t[u] =
      (2 * l - 3 * r + 1) * n[u] +
      (l - 2 * r + a) * s * Q3[c][e] +
      (-2 * l + 3 * r) * o[u] +
      (l - r) * s * Q3[c][e + 1];
  }
  return ((t.f = Ct(t.f)), t);
}

var $s =
    Bn +
    `
uniform vec3 uSun,uCam,uF,uX,uY; uniform float uAlt,uSp,uDay,uR,uDip,uT,uPx; uniform sampler3D tN3; uniform sampler2D tN2; uniform vec2 uTop; uniform vec4 uCl;
const float HW=26.6667;
vec3 rayDir(vec2 uv){ vec2 q=uv*2.-1.; return normalize(uF+uX*q.x+uY*q.y); }
vec3 sky(vec3 d){
  float el=max(asin(clamp(d.y,-1.,1.))+uDip,0.); float az=dot(normalize(d.xz+vec2(1e-5)),normalize(uSun.xz))*.5+.5, w=az*az*az;
  vec3 hA=mix(vec3(.80,.50,.42),vec3(3.1,1.28,.34),w), mA=mix(vec3(.30,.40,.48),vec3(.98,.72,.46),w), zA=vec3(.022,.085,.20);
  vec3 c=zA+(mA-zA)*exp(-el*3.1)+(hA-mA)*exp(-el*9.);
  if(uDay>0.){ vec3 hB=mix(vec3(.80,.84,.86),vec3(1.7,1.25,.78),w), mB=mix(vec3(.20,.42,.70),vec3(.42,.60,.78),w), zB=vec3(.014,.075,.25); c=mix(c,zB+(mB-zB)*exp(-el*3.6)+(hB-mB)*exp(-el*17.),uDay); }
  if(uSp>0.){ vec3 hC=mix(vec3(.42,.72,1.05),vec3(1.8,1.2,.8),w*w)*1.15, mC=mix(vec3(.02,.11,.36),vec3(.05,.17,.42),w), zC=vec3(.0015,.004,.013); float nt=mix(1.,.10+.90*smoothstep(.12,.62,az),uSp); c=mix(c,zC+nt*((mC-zC)*exp(-el*mix(5.,11.,uSp))+(hC-mC)*exp(-el*mix(20.,75.,uSp))),uSp); }
  float m=max(dot(d,uSun),0.); vec3 sc=mix(vec3(1.,.55,.22),vec3(1.,.9,.75),max(uDay,uSp));
  c+=sc*(.5*pow(m,24.)*(1.-.7*uSp)+1.4*pow(m,180.)+9.*pow(m,2200.));
  return c; }
vec3 hazeCol(vec3 d){ vec3 h=normalize(vec3(d.x,0.,d.z)+1e-5); h.y=.012-sin(uDip); return sky(normalize(h)); }
float fogAmt(vec3 o,vec3 d,float t){ float b=1./15.; float y=d.y*b; float e0=exp(-max(o.y,0.)*b), e1=exp(-clamp((o.y+d.y*t)*b,0.,60.)); float k=abs(y)<1e-5?t*e0:max((e0-e1)/y,0.); return 1.-exp(-.0011*k-t*.000055); }
// sunlight reaching a point at this height: soft under the deck, gone inside it, hard above it
float sunAt(float y){ float a=smoothstep(uCl.x-30.,uCl.x+12.,y), b=smoothstep(uCl.y-26.,uCl.y+6.,y); return mix(mix(1.,.12,a*uCl.z),1.,b); }
vec3 sunCol(float y){ float b=smoothstep(uCl.y-30.,uCl.y+160.,y); return mix(vec3(2.75,1.62,.92),vec3(3.9,3.3,2.7),b); }
vec3 ambCol(vec3 n,float y){ float b=smoothstep(uCl.y-40.,uCl.y+60.,y), sp=smoothstep(500.,1300.,y); vec3 up=mix(mix(vec3(.44,.56,.72),vec3(.36,.54,.86),b),vec3(.20,.32,.58),sp), dn=mix(vec3(.52,.50,.52),mix(vec3(.74,.76,.80),vec3(.42,.52,.68),sp),b); float ins=smoothstep(uCl.x-20.,uCl.x+20.,y)*(1.-smoothstep(uCl.y-40.,uCl.y,y))*uCl.z; return mix(mix(dn,up,n.y*.5+.5),vec3(.74,.76,.80),ins); }
`,
  dv = `
vec2 hitAlt(vec3 o,vec3 d,float h){ float a=dot(d.xz,d.xz)/(2.*uR), b=d.y+dot(o.xz,d.xz)/uR, c=o.y+dot(o.xz,o.xz)/(2.*uR)-h; float D=b*b-4.*a*c; if(D<0.) return vec2(-1.); float q=-.5*(b+(b<0.?-1.:1.)*sqrt(D)); float t0=abs(a)<1e-12?1e9:q/a, t1=abs(q)<1e-12?1e9:c/q; return vec2(min(t0,t1),max(t0,t1)); }
float altOf(vec3 p){ return p.y+dot(p.xz,p.xz)/(2.*uR); }
`,
  Zf = `
uniform vec4 uS[48]; uniform float uTime2,uMir,uPxS; const float H=30., W=53.33333;
float wob(float k,vec2 q,float amp){ float t=uTime2; float e=sin(3.14159*clamp(q.y,0.,1.)); return e*(amp*(.55*sin(q.x*5.1+t*1.9+k*1.7)+.3*sin(q.x*11.3-t*3.1+k*2.3+q.y*3.)+.22*sin(q.x*3.-t*1.1+q.y*5.+k))+.42*sin(k*12.9+.5)+.50*sin(k*7.7+q.x*2.6+1.)+.22*sin(q.x*6.+k*4.1)); }
// x: -.5...5 across, Y: sheets up. returns world position, lifted off the paper; n = world normal
vec3 onSheet(float k,vec2 q,float lift,out vec3 n){ vec4 s=uS[int(k)]; float ca=cos(s.z), sa=sin(s.z); float w=wob(k,q,s.w); const float e=.012; float dx=(wob(k,q+vec2(e,0),s.w)-w)/(e*W), dy=(wob(k,q+vec2(0,e),s.w)-w)/(e*H);
  vec3 T=vec3(0.,ca,sa), N=vec3(0.,-sa,ca); n=normalize(N-vec3(1.,0.,0.)*dx-T*dy); vec3 p=vec3(q.x*W,s.x,s.y)+T*(q.y*H)+N*w+n*lift; return p; }
`,
  Aa = "precision highp float; uniform mat4 projectionMatrix,viewMatrix; uniform vec3 uCamV;",
  sy =
    Aa +
    Zf +
    `in vec3 position; in float iK; out vec2 vQ; out vec3 vP,vN; flat out float vK;
void main(){ vec2 q=position.xy; q.y=mix(.0013,.9987,q.y); vec3 n; vec3 p=onSheet(iK,q,0.,n); vQ=q; vK=iK; vP=p; vN=n; p.y*=uMir; gl_Position=projectionMatrix*viewMatrix*vec4(p,1.); }`,
  ay =
    "precision highp float; precision highp sampler3D; in vec2 vQ; in vec3 vP,vN; flat in float vK; out vec4 o; uniform sampler2D tFace; uniform float uBase,uHps,uMir,uHead,uPass2; uniform sampler2D tCv; uniform vec3 uRed; uniform vec4 uHeadP;" +
    $s +
    Sn +
    `
void main(){ vec3 V=normalize(uCam-vP); vec3 N=normalize(vN); bool back=dot(N,V)<0.; if(uMir<0.) back=dot(N,vec3(V.x,-V.y,V.z))<0.; float px=max(fwidth(vQ.y)*30.,1e-4), pxx=max(fwidth(vQ.x)*53.333,1e-4);
  float dist=length(uCam-vP);
  vec3 alb=vec3(.93); vec3 ink=vec3(1.);
  if(vK<.5) ink=toLin(texture(tFace,vec2(vQ.x+.5,vQ.y)).rgb);
  else { float hr=(vK+vQ.y-uBase)*uHps; float f=abs(fract(hr+.5)-.5)/uHps*30.; float four=step(abs(mod(hr+.5,4.)-.5),.5); float w=mix(.022,.05,four); float L=(1.-smoothstep(w,w+px,f))*min(1.,w*2./px+.1)*step(abs(vQ.x),.5-.055); L*=smoothstep(9.,1.,px); ink=vec3(1.)-vec3(.27,.25,.22)*mix(.6,2.,four)*L; }
  // fibre
  float fb=texture(tN2,vP.xy*.21).r*.5+texture(tN2,vP.xy*.031+.3).g*.5; alb*=1.+(fb-.5)*.10*smoothstep(160.,10.,dist); if(vK>.5) alb*=1.-.055*hash11(vK*3.7+1.);
  // seams
  float ed=min(vQ.y,1.-vQ.y)*30., sw=max(.10,px*1.1); float seam=(1.-smoothstep(0.,sw,ed))*min(1.,.45/px)*smoothstep(12.,1.5,px); float soft=exp(-ed*1.3)*.10*smoothstep(6.,.5,px); if(vK<.5&&vQ.y<.5){ seam=0.; soft*=1.5; }
  float sx=(.5-abs(vQ.x))*53.33; soft+=exp(-sx*2.)*.03;
  float und=vK<.5?.45:1.; N=normalize(N+und*vec3(.085*sin(vP.x*.115+vK*2.1+sin(vP.y*.07+vK)+uT*.22)+.05*sin(vP.x*.27-vP.y*.15+vK*4.)-.02,0.,0.)+vec3(0.,.10*(smoothstep(3.5,0.,vQ.y*30.)-smoothstep(3.5,0.,(1.-vQ.y)*30.)),0.)); vec3 Nf=back?-N:N; float nl=dot(Nf,uSun); float lit=max(nl,0.), thru=max(-nl,0.); float sh=sunAt(vP.y);
  // the stack overhead: a little shade on the sheet just under a half-open fold
  vec3 E=sunCol(vP.y)*sh*(lit*1.12+thru*.40+.035)+ambCol(Nf,vP.y)*mix(.92,.62,smoothstep(120.,320.,vP.y))*(1.-.45*uSp);
  E*=1.+.07*sin(vP.x*.055+vP.y*.02-uT*.21)+.04*sin(vP.x*.11-vP.y*.05+uT*.13);
  E*=1.-.16*exp(-vP.y*.28);
  // the line is thick: it throws a shadow away from the sun and a little red onto the paper
  vec4 cv=texture(tCv,vec2((vK+vQ.y)/47.,.5)); float lw=(.125+.35*smoothstep(1.,5.,vK+vQ.y)); float dx=(vQ.x+.5-cv.r)*53.3333; float on=step(cv.g,uHead)*cv.b*(back?0.:1.); if(cv.g>uPass2){ float f=abs(mod(cv.g-uPass2+11.,22.)-11.); on*=smoothstep(7.2,6.2,f); }
  float sl=lw*.36*min(uSun.x/max(uSun.z,.05),7.)*.55; float shd=smoothstep(-lw-sl-.25,-lw-sl*.45,dx)*smoothstep(0.,-lw*.5,dx)*on; E-=sunCol(vP.y)*sh*lit*shd*.85; E*=1.-.12*on*exp(-abs(dx)/(lw*2.)); E+=uRed*sunCol(vP.y)*sh*on*.10*exp(-max(dx-lw,0.)/1.3)*step(0.,dx);
  vec3 c=alb*mix(ink,vec3(1.),back?.82:0.)*E; c*=1.-seam*.5; c*=1.-soft;
  // light carried through the paper when the sun is behind it
  vec3 rim=sunCol(vP.y)*sh*pow(max(dot(-V,uSun),0.),6.)*.10; c+=rim*alb;
  vec3 rd=-V; float t=dist; if(uMir<0.) rd.y=-rd.y; float fg=fogAmt(uCam,normalize(vP-uCam),t); c=mix(c,hazeCol(rd),fg*.9);
  o=vec4(c,1.); }`,
  ry =
    Aa +
    Zf +
    `in vec4 aP; in vec3 aT; in float aH; out vec3 vN,vP; out float vSs,vHh,vTh; out vec3 vTn; uniform float uW;
void main(){ float k=floor(aP.y), v=aP.y-k; vec3 n; vec3 p0=onSheet(k,vec2(aP.x-.5,v),0.,n); float d=length(uCamV-p0); float w=max(uW+.35*smoothstep(1.,5.,aP.y),d*uPxS*1.55); vec3 T=normalize(vec3(aT.xy,0.)); vec3 A=normalize(cross(n,T)); float c=cos(aT.z), s=sin(aT.z); vec3 p=p0+A*w*c+n*(w*.36*s+.015+d*.0005); vN=normalize(A*c*.55*(abs(c)*.6+.4)+n*(s*.9+.1)); vTn=T; vP=p; vSs=aP.z; vHh=aH; vTh=aT.z; p.y*=uMir; gl_Position=projectionMatrix*viewMatrix*vec4(p,1.); }`,
  ly =
    "precision highp float; precision highp sampler3D; in vec3 vN,vP,vTn; in float vSs,vHh,vTh; out vec4 o; uniform float uHead,uMir,uDash0; uniform vec3 uRed; " +
    $s +
    `
void main(){ float a=1.; float fw=fwidth(vSs); if(vSs>uHead) discard; if(vSs>uDash0){ float s=vSs-uDash0; float per=22.; float f=abs(mod(s+per*.5,per)-per*.5); float on=1.-smoothstep(6.8-fw,6.8+fw,f); on=mix(on,.62,smoothstep(per*.5,per*1.4,fw)); a=on; if(a<.02) discard; }
 vec3 V=normalize(uCam-vP), N=normalize(vN); float sh=sunAt(vP.y); float l=max(dot(N,uSun),0.); vec3 H2=normalize(V+uSun); float sp=pow(max(dot(N,H2),0.),60.)*1.1; float fr=pow(1.-max(dot(N,V),0.),4.);
 vec3 c=uRed*(sunCol(vP.y)*sh*(l*.85+.10)+ambCol(N,vP.y)*.62)+sunCol(vP.y)*sh*sp*.22+sky(reflect(-V,N))*(.02+.10*fr); 
 float t=length(uCam-vP); vec3 rd=-V; if(uMir<0.) rd.y=-rd.y; c=mix(c,hazeCol(rd),fogAmt(uCam,-V,t)*.8); o=vec4(c*a,a); }`,
  cy =
    Aa +
    Zf +
    `in vec2 position; in vec4 aU; out vec2 vU; out float vR,vD; out vec3 vP,vN; uniform float uHead;
void main(){ float k=floor(position.y), v=position.y-k; vec3 n; vec3 p0=onSheet(k,vec2(position.x-.5,v),0.,n); float d=length(uCamV-p0); vec3 p=p0+n*(.012+d*.0006); vU=aU.xy; vR=aU.z; vD=aU.w; vP=p; vN=n; p.y*=uMir; gl_Position=projectionMatrix*viewMatrix*vec4(p,1.); }`,
  uy =
    "precision highp float; precision highp sampler3D; in vec2 vU; in float vR,vD; in vec3 vP,vN; out vec4 o; uniform sampler2D tW; uniform float uHead,uMir; " +
    $s +
    `
void main(){ if(dot(normalize(vN),normalize(uCam-vP))<0.) discard; float a=texture(tW,vU).a; float r=vR<0.?1.:smoothstep(0.,1.,(uHead-vR)/4.-vD*1.6+.2); a*=r; if(a<.01) discard; float grey=vR>-1.5&&vR<0.?.17:.018; vec3 c=vec3(grey)*(sunCol(vP.y)*sunAt(vP.y)*.35+ambCol(vec3(0,0,1),vP.y)); vec3 rd=normalize(vP-uCam); float f=fogAmt(uCam,rd,length(vP-uCam)); c=mix(c,hazeCol(rd),f*.9); o=vec4(c*a,a); }`,
  fy =
    Aa +
    Zf +
    `in vec3 position,normal; in vec4 iD; out vec3 vN,vP; uniform float uHead; float ob(float t){ t=clamp(t,0.,1.)-1.; return 1.+2.6*t*t*t+1.6*t*t; }
void main(){ float k=floor(iD.y), v=iD.y-k; vec3 n; vec3 p0=onSheet(k,vec2(iD.x-.5,v),0.,n); float d=length(uCamV-p0); float r=max(iD.z,min(d,260.)*uPxS*2.6)*ob((uHead-iD.w)/1.6+.02); vec3 A=normalize(cross(vec3(0,1,0),n)), B=cross(n,A); vec3 p=p0+A*position.x*r+B*position.y*r+n*(position.z*(iD.z*.34)+.02+d*.0007); vN=A*normal.x+B*normal.y+n*normal.z; vP=p; p.y*=uMir; gl_Position=projectionMatrix*viewMatrix*vec4(p,1.); }`,
  pv =
    "precision highp float; precision highp sampler3D; in vec3 vN,vP; out vec4 o; uniform vec3 uCol; uniform float uMir,uGl; " +
    $s +
    `
void main(){ vec3 V=normalize(uCam-vP), N=normalize(vN); float sh=sunAt(vP.y); float l=max(dot(N,uSun),0.); float sp=pow(max(dot(N,normalize(V+uSun)),0.),50.); float fr=pow(1.-max(dot(N,V),0.),4.); vec3 c=uCol*(sunCol(vP.y)*sh*(l*.9+.06)+ambCol(N,vP.y)*.7)+sunCol(vP.y)*sh*sp*.3+sky(reflect(-V,N))*(.025+.12*fr)*uGl; c=mix(c,hazeCol(-V),fogAmt(uCam,-V,length(uCam-vP))*.8); o=vec4(c,1.); }`,
  hy =
    Aa +
    Zf +
    "in vec3 position,normal; uniform vec4 uHeadP; uniform float uHeadR; out vec3 vN,vP; void main(){ float k=floor(uHeadP.y), v=uHeadP.y-k; vec3 n; vec3 p0=onSheet(k,vec2(uHeadP.x-.5,v),0.,n); float d=length(uCamV-p0); float r=max(uHeadR,d*uPxS*4.); vec3 A=normalize(cross(vec3(0,1,0),n)),B=cross(n,A); vec3 q=position*vec3(1.,1.,.5); vec3 p=p0+(A*q.x+B*q.y+n*(q.z+.34))*r; vec3 m=normalize(normal*vec3(1.,1.,1.8)); vN=A*m.x+B*m.y+n*m.z; vP=p; p.y*=uMir; gl_Position=projectionMatrix*viewMatrix*vec4(p,1.); }",
  dy =
    Aa +
    "in vec3 position; uniform vec3 uAt; uniform float uMir; out vec2 vQ; out vec3 vP; void main(){ vec3 r=normalize(vec3(viewMatrix[0][0],0.,viewMatrix[2][0])); vec3 p=uAt+r*position.x*1.3+vec3(0.,(position.y+.5)*1.95,0.); vQ=vec2(position.x*1.3,(position.y+.5)*1.95); vP=p; p.y*=uMir; gl_Position=projectionMatrix*viewMatrix*vec4(p,1.); }",
  py =
    "precision highp float; precision highp sampler3D; in vec2 vQ; in vec3 vP; out vec4 o; uniform float uMir; " +
    $s +
    `
float seg(vec2 p,vec2 a,vec2 b,float ra,float rb){ vec2 pa=p-a,ba=b-a; float h=clamp(dot(pa,ba)/dot(ba,ba),0.,1.); return length(pa-ba*h)-mix(ra,rb,h); }
void main(){ float sw=sin(uT*.5)*.02; vec2 p=vQ; p.x-=sw*p.y; float d=length((p-vec2(0.,1.63))*vec2(1.12,.95))-.115; d=min(d,seg(p,vec2(0.,1.42),vec2(0.,.98),.20,.15)); d=min(d,seg(p,vec2(-.08,.92),vec2(-.13,.04),.105,.06)); d=min(d,seg(p,vec2(.08,.92),vec2(.12,.04),.105,.06)); d=min(d,seg(p,vec2(-.2,1.4),vec2(-.27,.86),.06,.045)); d=min(d,seg(p,vec2(.2,1.4),vec2(.26,.86),.06,.045)); float e=fwidth(d); float a=1.-smoothstep(-e*.6,e*.6,d); if(a<.02) discard; float rim=smoothstep(.06,.0,-d)*step(0.,p.x); vec3 c=vec3(.022,.026,.034)+rim*vec3(1.2,.55,.22)*.6; vec3 rd=normalize(vP-uCam); c=mix(c,hazeCol(rd),fogAmt(uCam,rd,length(vP-uCam))); o=vec4(c*a,a); }`,
  mv =
    Aa +
    "in vec3 position; in vec4 iB; uniform float uMir; uniform float uTime2; uniform vec3 uFl,uFd; out vec3 vP; void main(){ float t=uTime2*(5.+iB.w*2.)+iB.w*40.; float gl=smoothstep(-.2,.5,sin(uTime2*.6+iB.w*9.)); float f=sin(t)*(.25+.55*gl); vec3 fd=normalize(uFd), r=normalize(cross(fd,vec3(0,1,0))); vec3 p=uFl+r*iB.x+fd*iB.y+vec3(0.,iB.z+sin(uTime2*.7+iB.w*20.)*.8,0.); float sp=.62; vec3 q=r*position.x*sp*cos(f*position.x*position.x)+fd*position.z*.5+vec3(0.,abs(position.x)*f*sp,0.); p+=q; vP=p; p.y*=uMir; gl_Position=projectionMatrix*viewMatrix*vec4(p,1.); }",
  vv =
    "precision highp float; precision highp sampler3D; in vec3 vP; out vec4 o; " +
    $s +
    "uniform vec3 uCol; void main(){ vec3 rd=normalize(vP-uCam); vec3 c=mix(uCol,hazeCol(rd),fogAmt(uCam,rd,length(vP-uCam))); o=vec4(c,1.); }",
  my =
    $s +
    dv +
    `
uniform float uSeg,uSteps,uCov,uErode,uNear;
float ign(vec2 p){ return fract(52.9829189*fract(dot(p,vec2(.06711056,.00583715)))); }
float dens(vec3 p,float lod){ float al=altOf(p); float h=(al-uCl.x)/(uCl.y-uCl.x); if(h<0.||h>1.) return 0.; vec3 w=p+vec3(uT*7.,0.,uT*2.); vec2 big=texture(tN2,w.xz/3400.).rg; float top=mix(.34,1.,smoothstep(.30,.72,big.g)); top=mix(top,.86,uNear*2.*exp(-dot(p.xz,p.xz)/36000.)); float hh=h/top; if(hh>1.) return 0.; float prof=smoothstep(0.,.16,hh)*(1.-smoothstep(.35,1.,hh)); vec4 n=texture(tN3,w/vec3(980.,620.,980.)); float cov=uCov+(big.r-.5)*.55; float rr=length(p.xz); float hole=smoothstep(150.,20.,length(p.xz-vec2(8.,10.)))*uCl.w; cov+=uNear*exp(-rr*rr/36000.)-hole*.5; float b=n.r*.75+n.g*.25; float d=b*prof-(1.-cov); if(d<=0.) return 0.; d=min(d*3.2,1.); if(lod<1.5){ float e=texture(tN3,w/210.+vec3(0.,-uT*.012,0.)).g; float f=1.-e; if(lod<.5){ float e2=texture(tN3,w/64.+vec3(uT*.01,0.,0.)).g; f=f*.62+(1.-e2)*.38; } d-=f*.95*(1.-d*.62)*uErode; } return max(d,0.); }
float towerShade(vec3 p){ float t=-p.z/uSun.z; if(t<0.) return 1.; vec3 q=p+uSun*t; float sx=max(1.5,t*.006); return 1.-.8*smoothstep(HW+sx,HW-sx,abs(q.x))*step(0.,q.y)*smoothstep(uTop.x+sx,uTop.x-sx,q.y); }
void main(){ vec3 d=rayDir(vUv); float ta=0.,tb=1e6; float tz=abs(d.z)<1e-6?-1.:-uCam.z/d.z; if(uSeg<.5){ if(tz>0.) tb=tz; } else { if(tz<=0.){ o=vec4(0.,0.,0.,1.); return; } ta=tz; }
  vec2 g=hitAlt(uCam,d,0.); if(g.x>0.) tb=min(tb,g.x); else if(g.y>0.&&uAlt<0.) tb=min(tb,g.y);
  vec2 a=hitAlt(uCam,d,uCl.y), b=hitAlt(uCam,d,uCl.x); float al=uAlt; float e0,e1; 
  if(al>uCl.y){ if(a.x<0.){ o=vec4(0.,0.,0.,1.); return; } e0=a.x; e1=b.x>0.?b.x:a.y; }
  else if(al>uCl.x){ e0=0.; e1=b.x>0.?b.x:a.y; }
  else { e0=b.y; e1=a.y; if(e0<0.){ o=vec4(0.,0.,0.,1.); return; } }
  ta=max(ta,e0); tb=min(tb,e1); float far=mix(5200.,16000.,uSp); tb=min(tb,ta+far*.8); if(tb<=ta||ta>far){ o=vec4(0.,0.,0.,1.); return; }
  int N=int(uSteps); float j=ign(gl_FragCoord.xy+floor(fract(uT*.0)*7.)); float L=tb-ta; vec3 C=vec3(0.); float T=1.; float tc=ta; float mu=dot(d,uSun); float ph=.55+.75*pow(max(mu*.5+.5,0.),4.)+1.6*pow(max(mu,0.),14.); vec3 hz=hazeCol(d); float tp=0.;
  for(int i=0;i<N;i++){ float dt=min(clamp(.032*tc,max(L/90.,3.),max(L/14.,3.)),tb-tc); if(dt<=.01) break; float t=tc+dt*j; vec3 p=uCam+d*t; float r=dens(p,t>1800.?1.:0.); if(t<170.&&r>0.){ float wi=texture(tN3,p/vec3(96.,70.,96.)).g*.6+texture(tN3,p/vec3(37.,30.,37.)).g*.4; r*=mix(1.,.08+3.1*smoothstep(.40,.80,wi),smoothstep(170.,70.,t)); } if(r<=.003) dt*=1.7; tc+=dt; if(r>.003){ float s=0.; s+=dens(p+uSun*11.,1.)*16.; s+=dens(p+uSun*38.,1.)*34.; s+=dens(p+uSun*110.,2.)*80.; float hgt=clamp((altOf(p)-uCl.x)/(uCl.y-uCl.x),0.,1.); float bl=exp(-s*.048)*.85+exp(-s*.008)*.15; float pd=1.-.55*exp(-r*6.); float nd=dot(normalize(vec3(p.x/uR,1.,p.z/uR)),uSun); float term=mix(1.,smoothstep(-.03,.16,nd),uSp); vec3 sun=mix(vec3(2.9,1.55,.66),sunCol(uCl.y+60.*uDay),mix(1.,smoothstep(0.,.16,nd),uSp))*mix(.55,1.,uDay)*bl*pd*ph*towerShade(p)*term; vec3 am=mix(vec3(.26,.33,.44),vec3(.24,.36,.58),uDay)*mix(.45,1.15,hgt); am=mix(am,vec3(.17,.23,.31)*mix(.45,1.15,hgt)*(.25+.75*term),uSp); vec3 col=sun*mix(.80,.92,uDay)+am*mix(.80,.66,uDay)+sunCol(uCl.y+60.)*vec3(.17,.16,.16)*exp(-(1.-hgt)*2.2)*(1.-uSp)*mix(.35,1.,uDay); float fg=1.-exp(-t*mix(.00032,.00012,uSp)); col=mix(col,hz,fg); float e=exp(-r*dt*.045); C+=T*(1.-e)*col; T*=e; if(T<.012){ T=0.; break; } } }
  float ff=smoothstep(far,far*.45,ta); o=vec4(C*ff,mix(1.,T,ff)); }`,
  vy =
    $s +
    dv +
    Sn +
    `
uniform sampler2D tRefl,tBack; uniform float uStar,uReflOn,uMist;
vec2 vor(vec2 x){ vec2 n=floor(x),f=fract(x); vec2 mg,mr; float md=8.; for(int j=-1;j<=1;j++)for(int i=-1;i<=1;i++){ vec2 g=vec2(i,j); vec2 oo=hash22(n+g)*.8+.1; vec2 r=g+oo-f; float d=dot(r,r); if(d<md){ md=d; mr=r; mg=g; } } md=8.; for(int j=-2;j<=2;j++)for(int i=-2;i<=2;i++){ vec2 g=mg+vec2(i,j); vec2 oo=hash22(n+g)*.8+.1; vec2 r=g+oo-f; if(dot(mr-r,mr-r)>1e-4) md=min(md,dot(.5*(mr+r),normalize(r-mr))); } return vec2(md,hash12(n+mg)); }
vec3 stars(vec3 d){ vec3 c=vec3(0.); for(int l=0;l<2;l++){ float s=l==0?190.:90.; vec3 a=abs(d); vec2 uv; float f; if(a.x>a.y&&a.x>a.z){uv=d.yz/d.x;f=1.+step(0.,d.x);} else if(a.y>a.z){uv=d.xz/d.y;f=3.+step(0.,d.y);} else {uv=d.xy/d.z;f=5.+step(0.,d.z);} uv*=s; vec2 id=floor(uv); vec2 h=hash22(id+f*31.7+float(l)*71.); float b=hash12(id*1.7+f*9.1+float(l)*13.); b=pow(b,l==0?22.:15.); vec2 q=fract(uv)-.2-.6*h; float tw=.82+.18*sin(uT*(1.+h.x*2.)+h.y*30.); float r=mix(.10,.075,float(l)); c+=mix(vec3(.75,.86,1.),vec3(1.,.9,.75),h.y)*b*tw*smoothstep(r,0.,length(q))*(l==0?1.1:2.2); } return c; }
float ridge(float az,float s){ return texture(tN2,vec2(az*s,.37)).r*.6+texture(tN2,vec2(az*s*3.1,.71)).g*.28+texture(tN2,vec2(az*s*9.,.2)).b*.12; }
vec3 skyFull(vec3 d){ vec3 c=sky(d); if(uStar>.001){ float el=asin(clamp(d.y,-1.,1.))+uDip; c+=stars(d)*uStar*smoothstep(.02,.25,el); }
  float m=1.-smoothstep(30.,170.,uAlt); if(m>0.&&d.y<.09&&d.y>-.01){ float az=atan(d.x,-d.z); for(int i=0;i<2;i++){ float k=float(i); float r=.002+.060*pow(ridge(az+k*2.,.21+.09*k),2.6)*(1.-.35*k); float e=fwidth(d.y)+1e-4; vec3 mc=mix(hazeCol(d)*vec3(.80,.82,.88),vec3(.13,.17,.24),mix(.22,.42,k)); c=mix(c,mc,smoothstep(r+e,r-e,d.y)*m*mix(.75,.9,k)); } }
  return c; }
vec4 card(vec3 o,vec3 d,float z,float h,float sd){ if(d.z*(z-o.z)<=0.) return vec4(0.); float t=(z-o.z)/d.z; vec3 p=o+d*t; if(p.y<-.5) return vec4(0.); float n=texture(tN2,vec2(p.x*.0042+uT*.0022+sd,p.y*.016+sd*.7)).r*.6+texture(tN2,vec2(p.x*.013-uT*.004+sd*2.,p.y*.034+uT*.002)).g*.4; float a=smoothstep(.36,.80,n+.16*exp(-p.y/3.))*exp(-max(p.y,0.)/h)*smoothstep(2.,18.,abs(z-o.z)); return vec4(hazeCol(d)*1.04,a); }
void main(){ vec3 d=rayDir(vUv); vec3 c; vec2 g=hitAlt(uCam,d,0.); float t=g.x>0.?g.x:-1.; 
  if(t<0.){ c=skyFull(d); }
  else { vec3 p=uCam+d*t; float el=-d.y; float near=1.-smoothstep(35.,170.,t); 
    vec2 q=p.xz; float s1=texture(tN2,q*.045+uT*.012).r-.5, s2=texture(tN2,q*.045+vec2(.31,.17)-uT*.010).g-.5, s3=texture(tN2,q*.23+uT*.03).r-.5, s4=texture(tN2,q*.23+vec2(.4,.1)-uT*.027).g-.5; vec3 n=normalize(vec3((s1*.030+s3*.016)*(.35+near),1.,(s2*.030+s4*.016)*(.35+near)));
    vec3 r=reflect(d,n); r.y=abs(r.y); float fr=.20+.80*pow(1.-max(dot(-d,n),0.),2.6); vec3 rs=skyFull(normalize(r));
    vec3 deep=mix(vec3(.035,.085,.115),vec3(.13,.16,.17),smoothstep(.3,.7,texture(tN2,q*.0011).g));
    vec3 w=mix(deep*ambCol(vec3(0,1,0),0.),rs,fr);
    if(uReflOn>.001){ vec2 uv=gl_FragCoord.xy/uRes; vec2 off=n.xz*vec2(.22,1.)*min(1.,40./t+.25); vec4 m=vec4(0.); float bl=mix(.0022,.006,smoothstep(40.,160.,t)); for(int i=-2;i<=2;i++) m+=texture(tRefl,uv+off+vec2(0.,float(i)*bl)); m*=.2; w=mix(w,m.rgb/max(m.a,1e-3)*mix(.72,.96,fr),m.a*uReflOn); }
    if(t<260.&&uAlt<90.){ vec2 v=vor(q/4.6+.25*vec2(s1,s2)); float wd=.010+.034*v.y*v.y; float e=max(fwidth(v.x)*.8,.004); float ln=(1.-smoothstep(wd-e,wd+e,v.x+(s3+s4)*.05))*smoothstep(.35,.6,texture(tN2,q*.011+.2).b+.15); float k=ln*(1.-smoothstep(50.,240.,t))*.75; vec3 salt=vec3(.86)*(sunCol(0.)*(.16+.10*s3*4.)+ambCol(vec3(0,1,0),0.)*.75); w=mix(w,salt,k); float fl=smoothstep(.62,.78,texture(tN2,q*.0135+.5).g); w=mix(w,salt*.92,fl*.22*(1.-smoothstep(60.,260.,t))); }
    // from very high up: salt, shallow water, haze
    float hi=smoothstep(60.,420.,uAlt); if(hi>0.){ float a1=texture(tN2,q/5200.).r*.6+texture(tN2,q/1300.+.3).g*.4; vec3 gnd=mix(vec3(.05,.13,.20),vec3(.50,.49,.46),smoothstep(.42,.62,a1)); gnd*=mix(.75,1.1,texture(tN2,q/260.).b); float nd=dot(normalize(vec3(q.x/uR,1.,q.y/uR)),uSun); float term=mix(1.,smoothstep(-.03,.16,nd),uSp); w=mix(w,gnd*(sunCol(400.)*.16*term+vec3(.16,.23,.34)*mix(1.,.4,uSp)),hi); }
    float fg=fogAmt(uCam,d,t); vec3 hz=hazeCol(d); hz=mix(hz,vec3(.10,.22,.44),hi*.7); { float nd=dot(normalize(vec3(q.x/uR,1.,q.y/uR)),uSun); hz*=mix(1.,.12+.88*smoothstep(-.06,.2,nd),uSp); } fg=max(fg,hi*(1.-exp(-t*.00028))); c=mix(w,hz,fg); }
  if(uMist>.001){ for(int i=0;i<3;i++){ float fi=float(i); vec4 m=card(uCam,d,fi==0.?-420.:fi==1.?-150.:-34.,fi==0.?16.:fi==1.?9.:5.,fi*.37+.11); c=mix(c,m.rgb,m.a*uMist*(fi==2.?.55:.75)); } }
  vec4 b=vec4(0.); float bw=0.; vec2 bp=1./vec2(textureSize(tBack,0)); for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){ float k=(x==0?1.:.6)*(y==0?1.:.6); b+=texture(tBack,vUv+vec2(x,y)*bp)*k; bw+=k; } b/=bw; c=c*b.a+b.rgb;
  o=vec4(c,1.); }`,
  xy =
    $s +
    dv +
    `
uniform sampler2D tA,tFront; uniform mat4 uPrev; uniform float uMB,uMist,uFrontOn;
vec4 card(vec3 o,vec3 d,float z,float h,float sd){ if(d.z*(z-o.z)<=0.) return vec4(0.); float t=(z-o.z)/d.z; vec3 p=o+d*t; if(p.y<-.5) return vec4(0.); float n=texture(tN2,vec2(p.x*.0052+uT*.003+sd,p.y*.02+sd*.7)).r*.6+texture(tN2,vec2(p.x*.017-uT*.005+sd*2.,p.y*.05+uT*.003)).g*.4; float a=smoothstep(.40,.85,n+.14*exp(-p.y/2.))*exp(-max(p.y,0.)/h)*smoothstep(4.,26.,abs(z-o.z)); return vec4(hazeCol(d)*1.03,a); }
void main(){ vec3 d=rayDir(vUv); vec3 c;
  if(uMB>.001){ float tz=-uCam.z/d.z; vec3 p; vec3 q=uCam+d*tz; if(tz>0.&&abs(q.x)<HW+.5&&q.y>0.&&q.y<uTop.y) p=q; else { vec2 g=hitAlt(uCam,d,uAlt>uCl.y+20.?uCl.y-20.:0.); p=uCam+d*(g.x>0.?min(g.x,3000.):3000.); }
    vec4 k=uPrev*vec4(p,1.); vec2 v=(vUv-(k.xy/k.w*.5+.5))*uMB; float L=length(v*uRes); v*=min(1.,uRes.y*.09/max(L,1e-3)); if(L<1.){ c=texture(tA,vUv).rgb; } else { float j=fract(52.9829189*fract(dot(gl_FragCoord.xy,vec2(.06711056,.00583715))))-.5; c=vec3(0.); for(int i=0;i<11;i++){ c+=min(texture(tA,vUv+v*((float(i)+j)/10.-.5)).rgb,vec3(6.)); } c/=11.; } }
  else c=texture(tA,vUv).rgb;
  if(uMist>.001){ for(int i=0;i<2;i++){ float fi=float(i); vec4 m=card(uCam,d,fi==0.?11.:34.,fi==0.?3.4:2.4,fi*.53+.21); c=mix(c,m.rgb,m.a*uMist*.8); } }
  if(uFrontOn>.5){ vec4 b=vec4(0.); float bw=0.; vec2 bp=1./vec2(textureSize(tFront,0)); for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){ float k=(x==0?1.:.6)*(y==0?1.:.6); b+=texture(tFront,vUv+vec2(x,y)*bp)*k; bw+=k; } b/=bw; c=c*b.a+b.rgb; }
  o=vec4(c,1.); }`,
  gy =
    "precision highp float; in vec2 vUv; out vec4 o; uniform float uZ; " +
    Bn +
    `
vec3 h3(vec3 p,float per){ return hash33(mod(p,per)+.5)*2.-1.; }
float gn(vec3 p,float per){ vec3 i=floor(p),f=fract(p),u=f*f*f*(f*(f*6.-15.)+10.); float r=0.; float c[8]; for(int k=0;k<8;k++){ vec3 g=vec3(k&1,(k>>1)&1,(k>>2)&1); c[k]=dot(h3(i+g,per),f-g); } return mix(mix(mix(c[0],c[1],u.x),mix(c[2],c[3],u.x),u.y),mix(mix(c[4],c[5],u.x),mix(c[6],c[7],u.x),u.y),u.z); }
float wo(vec3 p,float per){ vec3 i=floor(p),f=fract(p); float d=9.; for(int z=-1;z<=1;z++)for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){ vec3 g=vec3(x,y,z); vec3 r=g+hash33(mod(i+g,per)+7.5)-f; d=min(d,dot(r,r)); } return 1.-clamp(sqrt(d),0.,1.); }
void main(){ vec3 p=vec3(vUv,uZ); float P=0.,a=.5,f=4.; for(int i=0;i<4;i++){ P+=a*gn(p*f,f); f*=2.; a*=.55; } P=clamp(P*.95+.5,0.,1.); float w1=wo(p*4.,4.)*.625+wo(p*8.,8.)*.25+wo(p*16.,16.)*.125; float w2=wo(p*6.,6.)*.55+wo(p*12.,12.)*.3+wo(p*24.,24.)*.15; float pw=clamp((P-(w1-1.)*-.0)/(1.),0.,1.); pw=clamp(w1+(P-.5)*1.1*(1.-w1*.4)+.06,0.,1.); o=vec4(pw,w2,P,w1); }`,
  yy =
    "precision highp float; in vec2 vUv; out vec4 o; " +
    Bn +
    `
vec2 g2(vec2 p,float per,float s){ return hash22(mod(p,per)+s)*2.-1.; }
float gn(vec2 p,float per,float s){ vec2 i=floor(p),f=fract(p),u=f*f*f*(f*(f*6.-15.)+10.); return mix(mix(dot(g2(i,per,s),f),dot(g2(i+vec2(1,0),per,s),f-vec2(1,0)),u.x),mix(dot(g2(i+vec2(0,1),per,s),f-vec2(0,1)),dot(g2(i+vec2(1,1),per,s),f-vec2(1,1)),u.x),u.y); }
float fb(vec2 p,float per,float s){ float a=.5,r=0.; for(int i=0;i<6;i++){ r+=a*gn(p*per,per,s+float(i)*11.3); per*=2.; a*=.52; } return clamp(r*1.15+.5,0.,1.); }
void main(){ o=vec4(fb(vUv,4.,3.),fb(vUv,4.,41.),fb(vUv,5.,77.),fb(vUv,8.,19.)); }`,
  by =
    Aa +
    "in vec2 position; in vec4 iM; uniform vec3 uVel,uBox; uniform float uMoA,uPxS; out float vA; out vec2 vQ; void main(){ vec3 p=uCamV+mod(iM.xyz*uBox-uCamV,uBox)-uBox*.5; float d=length(p-uCamV); vec4 c=viewMatrix*vec4(p,1.); vec3 ve=(viewMatrix*vec4(uVel,0.)).xyz; vec4 a=projectionMatrix*(c+vec4(ve*.5,0.)), b=projectionMatrix*(c-vec4(ve*.5,0.)); vec4 o=position.y>0.?a:b; vec2 dir=a.xy/max(a.w,.01)-b.xy/max(b.w,.01); float asp=projectionMatrix[1][1]/projectionMatrix[0][0]; vec2 dd=vec2(dir.x*asp,dir.y); float l=length(dd); vec2 nn=l>1e-5?vec2(-dd.y,dd.x)/l:vec2(1.,0.); float w=mix(.0011,.0022,iM.w); o.xy+=nn*position.x*w*vec2(1./asp,1.)*o.w; float ok=step(.2,p.z)*step(1.,a.w)*step(1.,b.w); vA=uMoA*smoothstep(28.,12.,d)*smoothstep(1.,6.,d)*ok*(.4+.6*iM.w); vQ=position; gl_Position=ok>0.5?o:vec4(2.,2.,2.,1.); }",
  wy =
    "precision highp float; in float vA; in vec2 vQ; out vec4 o; void main(){ float a=vA*(1.-vQ.x*vQ.x)*(1.-vQ.y*vQ.y); o=vec4(vec3(1.3)*a,a); }";

var xv = (i) => Do(i).map((t) => (t <= 0.04045 ? t / 12.92 : ((t + 0.055) / 1.055) ** 2.4));

// ── scene tower · "The real chart" · enterWith: portal-in ──
var My = {
  id: "tower",
  title: "真实的曲线",
  enterWith: "portal-in",
  hud: { font: "monoMed", color: (i) => (i.p[3] > 0.12 ? "#ffffff" : "#243039") },
  beats: [
    { dur: 4, hold: 4, delay: 1.8, page: "21" },
    { dur: 5, hold: 4, page: "34" },
    { dur: 7, hold: 4, page: "55" },
    { dur: 9, hold: 6, page: "89" },
  ],
  notes: [
    "METR 测量的是：AI 有一半概率能独立完成多长的任务。GPT-4 大约能撑四分钟。这张图是线性刻度，所以几乎所有点都趴在地板上。",
    "2025 年 4 月，o3 到了两小时。2025 年 11 月，Opus 4.5 到了 4.9 小时，曲线直接冲出了这页幻灯片。数据来源：METR 时间跨度，50% 成功率。",
    "2026 年 2 月，Opus 4.6，十二小时。4 月，Mythos Preview，十七小时。METR 在 2026 年 11 月报告 GPT-6 Astra 约四十小时，并把最近的翻倍时间定在 3.6 个月。误差范围要说实话：四十小时这个点的区间是 13 到 2,645 小时，因为题库里已经没有更长的任务了。",
    "虚线只是把趋势继续画下去，不是测量值：2027 年 7 月，200 小时。往下看。2025 年之前的一切，都压在最低处。",
  ],
  create(i) {
    let { gfx: t, view: e } = i,
      n = t.r,
      o = t.target({ samples: 4, depth: !0 }),
      s = t.target({}),
      a = t.target({ scale: 0.5, depth: !0 }),
      r = t.target({ scale: 0.5 }),
      l = t.target({ scale: 0.5 }),
      c = i.overlay(),
      u = new Ye(35, 1, 0.4, 3e4),
      f = F,
      h = (et) => ({ value: et }),
      d = {
        uSun: h(new f()),
        uCam: h(new f()),
        uCamV: null,
        uF: h(new f()),
        uX: h(new f()),
        uY: h(new f()),
        uAlt: h(0),
        uSp: h(0),
        uDay: h(0),
        uR: h(2e6),
        uDip: h(0),
        uT: h(0),
        uTime2: null,
        uPx: h(0),
        uPxS: h(0),
        tN3: h(null),
        tN2: h(null),
        uTop: h(new Nt(30, 30)),
        uCl: h(new ie(150, 272, 1, 0)),
        uS: h([]),
        uMir: h(1),
        uHead: h(0),
        uHeadP: h(new ie()),
        uHeadR: h(0.3),
        uBase: h(0.0645),
        uHps: h(Kf),
        uPrev: h(new ne()),
        uMB: h(0),
        uMist: h(1),
        uStar: h(0),
        uCov: h(0.3),
        uErode: h(1),
        uNear: h(0),
      };
    ((d.uCamV = d.uCam), (d.uTime2 = d.uT));
    let p = new Float32Array(192);
    d.uS.value = Array.from({ length: 48 }, () => new ie());
    let x = new gl(96, 96, 96, { depthBuffer: !1, type: $e, format: Un, minFilter: He, magFilter: He });
    x.texture.wrapS = x.texture.wrapT = x.texture.wrapR = an;
    let v = t.target({ w: 512, h: 512, type: $e, wrap: an, mips: !0 });
    ((v.texture.anisotropy = 8), (d.tN3.value = x.texture), (d.tN2.value = v.texture));
    let m =
        "precision highp float; in vec3 position; out vec2 vUv; void main(){ vUv=position.xy*.5+.5; gl_Position=vec4(position.xy,0.,1.); }",
      g = (et, Tt, vt = {}, zt = {}) =>
        new ce({
          vertexShader: et,
          fragmentShader: Tt,
          glslVersion: re,
          uniforms: { ...d, ...vt },
          side: oe,
          ...zt,
        }),
      b = { transparent: !0, blending: Ie, blendSrc: pe, blendDst: je, blendSrcAlpha: pe, blendDstAlpha: je },
      y = new ge();
    y.matrixWorldAutoUpdate = !1;
    let S = (et, Tt, vt = 0) => {
        let zt = new Zt(et, Tt);
        return ((zt.frustumCulled = !1), (zt.renderOrder = vt), y.add(zt), zt);
      },
      M = (() => {
        let Tt = new Float32Array(32768),
          vt = 0;
        for (let Ft = 0; Ft < 8192; Ft++) {
          let wt = ((Ft + 0.5) / 8192) * 47;
          for (; vt < Xi.length - 2 && Xi[vt + 1].y < wt;) vt++;
          let mt = Xi[vt],
            Dt = Xi[vt + 1],
            it = Ct((wt - mt.y) / Math.max(1e-9, Dt.y - mt.y));
          ((Tt[Ft * 4] = K(mt.x, Dt.x, it)),
            (Tt[Ft * 4 + 1] = wt < Xi[0].y || wt > Xi[Xi.length - 1].y ? 1e6 : K(mt.s, Dt.s, it)),
            (Tt[Ft * 4 + 2] = kt((mt.ty - 0.55) / 0.4)),
            (Tt[Ft * 4 + 3] = 1));
        }
        let zt = new Tn(Tt, 8192, 1, Un, An);
        return ((zt.minFilter = zt.magFilter = He), (zt.needsUpdate = !0), zt);
      })(),
      w = document.createElement("canvas");
    ((w.width = 2560), (w.height = 1440));
    let E = new Hn(w);
    ((E.colorSpace = Mn), (E.anisotropy = 16), (E.generateMipmaps = !0), (E.minFilter = Pn));
    let T = new Oe();
    {
      let et = new Ke(1, 1, 40, 10);
      (et.translate(0, 0.5, 0),
        (T.index = et.index),
        T.setAttribute("position", et.getAttribute("position")),
        T.setAttribute(
          "iK",
          new Ue(
            Float32Array.from({ length: cv }, (Tt, vt) => vt),
            1,
          ),
        ),
        (T.instanceCount = cv));
    }
    let _ = S(T, g(sy, ay, { tFace: h(E), tCv: h(M), uRed: h(new f(...xv(uc))), uPass2: h(hc + 0.4) }));
    {
      let Tt = Xi.length,
        vt = new Float32Array(Tt * 9 * 4),
        zt = new Float32Array(Tt * 9 * 3),
        Ft = new Float32Array(Tt * 9),
        wt = [];
      Xi.forEach((Dt, it) => {
        for (let Rt = 0; Rt < 9; Rt++) {
          let xt = it * 9 + Rt;
          if (
            (vt.set([Dt.x, Dt.y, Dt.s, 0], xt * 4),
            zt.set([Dt.tx, Dt.ty, (Math.PI * Rt) / 8], xt * 3),
            (Ft[xt] = Dt.h),
            it && Rt)
          ) {
            let Wt = xt,
              Xt = xt - 1,
              Vt = xt - 9,
              Q = xt - 9 - 1;
            wt.push(Q, Vt, Xt, Xt, Vt, Wt);
          }
        }
      });
      let mt = new Qt();
      (mt.setAttribute("aP", new $t(vt, 4)),
        mt.setAttribute("aT", new $t(zt, 3)),
        mt.setAttribute("aH", new $t(Ft, 1)),
        mt.setIndex(wt),
        (mt.boundingSphere = new Be(new f(), 1e6)),
        S(mt, g(ry, ly, { uW: h(0.125), uDash0: h(hc + 0.4), uRed: h(new f(...xv(uc))) }, b), 2));
    }
    let R = Uo.map((et) => ({ ...et, s: Ta(et.t) }));
    {
      let et = new Oe(),
        Tt = new On(0.92, 1, 1, 40, 1);
      (Tt.rotateX(Math.PI / 2),
        Tt.translate(0, 0, 0.5),
        (et.index = Tt.index),
        et.setAttribute("position", Tt.getAttribute("position")),
        et.setAttribute("normal", Tt.getAttribute("normal")));
      let vt = (Ft) =>
          ({ "Opus 4.5": 1.25, "GPT-5.2": 1.35, "Opus 4.6": 2.3, "Mythos Preview": 3, "GPT-6 Astra": 3.5 })[
            Ft
          ] || 1,
        zt = new Float32Array([...R.flatMap((Ft) => [Er(Ft.t), ns(Ft.h), 0.264 * vt(Ft.n), Ft.s])]);
      (et.setAttribute("iD", new Ue(zt, 4)),
        (et.instanceCount = zt.length / 4),
        S(et, g(fy, pv, { uCol: h(new f(0.012, 0.014, 0.018)), uGl: h(1) }), 3));
    }
    let L = new ci(1, 32, 24),
      k = S(L, g(hy, pv, { uCol: h(new f(...xv(uc))), uGl: h(1.4) }), 4),
      P = document.createElement("canvas");
    ((P.width = 2048), (P.height = 2048));
    let C = new Hn(P);
    ((C.colorSpace = Mn),
      (C.anisotropy = 16),
      (C.generateMipmaps = !0),
      (C.minFilter = Pn),
      (C.premultiplyAlpha = !1));
    let A = new Qt();
    S(A, g(cy, uy, { tW: h(C) }, { ...b, depthWrite: !1 }), 1);
    function N() {
      let et = P.getContext("2d");
      (et.clearRect(0, 0, 2048, 2048), (et.fillStyle = "#000"), (et.textBaseline = "alphabetic"));
      let Tt = [],
        vt = [],
        zt = [],
        Ft = 8,
        wt = 8,
        mt = 0,
        Dt = (Rt, xt, Wt, Xt, Vt, Q, Lt, yt, It) => {
          et.font = Ln(Wt, xt);
          let St = Math.ceil(et.measureText(Rt).width) + 16,
            _t = Math.ceil(xt * 1.36);
          (Ft + St > 2040 && ((Ft = 8), (wt += mt + 6), (mt = 0)), et.fillText(Rt, Ft + 8, wt + xt * 1.02));
          let Yt = Ft / 2048,
            jt = (Ft + St) / 2048,
            le = 1 - (wt + _t) / 2048,
            ye = 1 - wt / 2048;
          ((Ft += St + 6), (mt = Math.max(mt, _t)));
          let Jt = Xt / xt,
            te = (St * Jt) / fc,
            se = (_t * Jt) / Ss,
            ee = Lt === "r" ? Vt - te + (8 * Jt) / fc : Vt - (8 * Jt) / fc,
            me = Q - ((_t - xt * 1.02) * Jt) / Ss,
            be = Tt.length / 2;
          for (let Ae = 0; Ae < 2; Ae++)
            for (let ln = 0; ln <= It; ln++) {
              let mn = ln / It;
              if (
                (Tt.push(ee + te * mn, me + se * Ae), vt.push(K(Yt, jt, mn), Ae ? ye : le, yt, mn), Ae && ln)
              ) {
                let un = be + (It + 1) + ln,
                  Re = un - 1,
                  Ne = be + ln,
                  Ge = Ne - 1;
                zt.push(Ge, Ne, Re, Re, Ne, un);
              }
            }
        },
        it = {
          "GPT-4": [48 / 36, 14 / 1920, 0.0333],
          o3: [48 / 36, -34 / 1920, -0.0148],
          "Opus 4.5": [1.9, -0.03, -0.02],
          "Opus 4.6": [2.5, -0.03, 0.016],
          "Mythos Preview": [2.5, -0.028, -0.028],
          "GPT-6 Astra": [3.1, -0.036, 0.016],
        };
      for (let Rt in it) {
        let xt = R.find((Q) => Q.n === Rt),
          [Wt, Xt, Vt] = it[Rt];
        Dt(
          xt.label,
          118,
          "textMed",
          Wt,
          Er(xt.t) + Xt,
          ns(xt.h) + Vt,
          "r",
          Rt === "GPT-4" ? -2 : xt.s - (Rt === "GPT-6 Astra" || Rt === "Opus 4.5" ? 9 : Rt === "o3" ? 2 : 8),
          24,
        );
      }
      for (let Rt = 4; Rt <= 200; Rt += 4)
        Rt !== 40 &&
          Dt(
            Rt + " 小时",
            62,
            "text",
            Rt === 4 ? 1.1 : 2.1,
            110 / 1920,
            ns(Rt) + (ns(Rt) % 1 > 0.925 ? -0.062 : 0.0125),
            "l",
            -1,
            4,
          );
      (A.setAttribute("position", new $t(new Float32Array(Tt), 2)),
        A.setAttribute("aU", new $t(new Float32Array(vt), 4)),
        A.setIndex(zt),
        (A.boundingSphere = new Be(new f(), 1e6)),
        (C.needsUpdate = !0));
    }
    let G = S(new Ke(1, 1), g(dy, py, { uAt: h(new f(-31.5, 0, 9)) }, b), 5),
      B = (et, Tt, vt, zt) => {
        let Ft = ze(Tt),
          wt = new Oe();
        (wt.setAttribute(
          "position",
          new $t(
            new Float32Array([0, 0, 0.55, 0, 0, -0.35, -1, 0, -0.15, 0, 0, 0.55, 1, 0, -0.15, 0, 0, -0.35]),
            3,
          ),
        ),
          wt.setIndex([0, 1, 2, 3, 4, 5]));
        let mt = [];
        for (let Dt = 0; Dt < et; Dt++)
          mt.push((Ft() - 0.5) * vt, (Ft() - 0.5) * vt * 1.3, (Ft() - 0.5) * zt, Ft());
        return (wt.setAttribute("iB", new Ue(new Float32Array(mt), 4)), (wt.instanceCount = et), wt);
      },
      ot = S(
        B(22, 5, 17, 7),
        g(mv, vv, { uFl: h(new f()), uFd: h(new f(1, 0, 0)), uCol: h(new f(0.03, 0.035, 0.045)) }),
        5,
      ),
      ut = S(
        B(16, 9, 15, 8),
        g(mv, vv, { uFl: h(new f()), uFd: h(new f(1, 0, 0)), uCol: h(new f(0.035, 0.05, 0.08)) }),
        5,
      ),
      lt = (() => {
        let et = ze(11),
          Tt = new Oe();
        return (
          Tt.setAttribute("position", new $t(new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1]), 2)),
          Tt.setIndex([0, 1, 2, 0, 2, 3]),
          Tt.setAttribute("iM", new Ue(Float32Array.from({ length: 420 * 4 }, et), 4)),
          (Tt.instanceCount = 420),
          (Tt.boundingSphere = new Be(new f(), 1e6)),
          S(
            Tt,
            g(by, wy, { uVel: h(new f()), uBox: h(new f(46, 40, 46)), uMoA: h(0) }, { ...b, depthWrite: !1 }),
            6,
          )
        );
      })(),
      Z = new f(),
      H = 0,
      Y = (et, Tt = {}) => t.pass(et, { ...d, ...Tt }),
      q = Y(my, { uSeg: h(0), uSteps: h(30) }),
      st = Y(vy, { tRefl: h(a.texture), tBack: h(l.texture), uReflOn: h(1) }),
      ct = Y(xy, { tA: h(o.texture), tFront: h(r.texture), uFrontOn: h(0) }),
      V = i.text(
        "2025 年 11 月，\n它冲出了\n这张幻灯片。",
        {
          x: 110,
          y: 400,
          size: 80,
          font: "display",
          color: "#ffffff",
          leading: 1.16,
          tracking: -0.02,
          valign: "middle",
        },
      ),
      ft = i.text(
        "每 3.6 个月\n翻一番。",
        {
          x: 110,
          y: 250,
          size: 100,
          font: "display",
          color: "#ffffff",
          leading: 1.14,
          tracking: -0.02,
          valign: "middle",
        },
      ),
      nt = i.text("METR，2026 年 11 月", {
        x: 114,
        y: 412,
        size: 28,
        font: "text",
        color: "#ffffff",
        valign: "middle",
      }),
      Mt = i.text(
        "200 小时。\n若趋势延续，\n就是 2027 年 7 月。",
        {
          x: 110,
          y: 590,
          size: 80,
          font: "display",
          color: "#ffffff",
          leading: 1.18,
          tracking: -0.02,
          valign: "middle",
        },
      ),
      Et = i.text("2025 年之前的一切，都压在最低处。", {
        x: 114,
        y: 784,
        size: 34,
        font: "text",
        color: "#ffffff",
        valign: "middle",
      });
    c.add(V, ft, nt, Mt, Et);
    let at = {},
      rt = {},
      U = {},
      j = {},
      J = new f(),
      Pt = new f(),
      $ = new f(),
      tt = new ne(),
      W = Array.from({ length: 4 }, () => [0, 0]),
      D = !1,
      z = -1,
      pt = 0,
      ht = new ne(),
      gt = 0,
      dt = 0,
      Kt = 1,
      Ot = (et) => et.p[1] * 5 + et.p[2] * 7 + et.p[3] * 9,
      Ut = (et) => Math.exp(K(Math.log(16e5), Math.log(28e3), kt((et - 260) / 1e3)));
    function O(et, Tt, vt) {
      (oy(Tt, at), fv(hv(Math.max(0, Tt - 0.22)), U));
      let zt = U.y * Ss,
        Ft = at.y + at.f * zt,
        wt = at.ly + at.f * zt,
        mt = et.t,
        Dt = 1 - kt((Tt - 18) / 2),
        it = at.x,
        Rt = at.z,
        xt = Math.sin(mt * 0.21) * 0.9 + Math.sin(mt * 0.13 + 1) * 0.6,
        Wt = Math.sin(mt * 0.27 + 2) * 0.35,
        Xt = (Tt < 0.001, 1);
      ((it += xt * Xt * (1 + at.z * 0.01)),
        (vt.y = Ft + Wt * (Tt < 6 ? 0.7 : 1.4)),
        (vt.ly = wt + Math.sin(mt * 0.17) * 0.5),
        (it += et.mouse.x * at.z * 0.055),
        (vt.y += et.mouse.y * Math.min(at.z * 0.04, 2.2)),
        Tt < 6 && (vt.y = Math.max(vt.y, 2.2)),
        (vt.x = it),
        (vt.z = Rt + Math.sin(mt * 0.19 + 0.6) * 1.2),
        (vt.lx = at.lx + Math.sin(mt * 0.15 + 4) * 0.4),
        (vt.lz = at.lz),
        (vt.fov = at.fov),
        (vt.r = at.r + Math.sin(mt * 0.16) * 0.006));
      let Vt = kt((Tt - 18.5) / 2.5);
      if (Vt > 0) {
        vt.r += Vt * Math.sin(mt * 0.085) * 0.09;
        let Q = Vt * Math.sin(mt * 0.11) * 4.5;
        ((vt.x += Q),
          (vt.lx += Q * 0.8),
          (vt.z += Vt * Math.sin(mt * 0.09 + 1) * 3),
          (vt.y += Vt * Math.sin(mt * 0.13) * 3));
      }
      return vt;
    }
    let I = {
      async init() {
        let et = w.getContext("2d");
        ($f(et, 2560, 1440, { curve: !1, labels: !1 }), (E.needsUpdate = !0), N());
        let Tt = new Qt();
        Tt.setAttribute("position", new $t(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3));
        let vt = new ce({
            vertexShader: m,
            fragmentShader: gy,
            glslVersion: re,
            uniforms: { uZ: h(0) },
            depthTest: !1,
            depthWrite: !1,
          }),
          zt = new Zt(Tt, vt);
        zt.frustumCulled = !1;
        let Ft = new ge();
        Ft.add(zt);
        let wt = new In();
        for (let mt = 0; mt < 96; mt++)
          ((vt.uniforms.uZ.value = (mt + 0.5) / 96), n.setRenderTarget(x, mt), n.render(Ft, wt));
        ((zt.material = new ce({
          vertexShader: m,
          fragmentShader: yy,
          glslVersion: re,
          depthTest: !1,
          depthWrite: !1,
        })),
          n.setRenderTarget(v),
          n.render(Ft, wt),
          n.setRenderTarget(null),
          I.update({
            t: 0,
            dt: 0,
            p: [0, 0, 0, 0],
            beat: 0,
            enter: 1,
            exit: 0,
            q: 1,
            mouse: { x: 0, y: 0 },
            since: () => 30,
            k: () => 0,
          }),
          t.draw(y, u, a, { color: 0, alpha: 0 }),
          q.render(r),
          st.render(s),
          ct.render(s),
          (D = !1));
      },
      enter() {
        ((D = !1), (pt = -1));
      },
      exit() {
        i.headless || (i.audio.param("wind", 0), i.audio.param("speed", 0));
      },
      update(et) {
        ((gt = Ot(et)), (d.uT.value = et.t));
        let Tt = kt(et.enter),
          vt = Fn(et.since(0) / 7);
        ((dt = Tt * (0.36 + 0.64 * vt)),
          (dt = 1 - (1 - dt) * (1 - kt(gt / 2.2))),
          dt > 0.99999 && (dt = 1),
          O(et, gt, rt));
        let zt = Math.tan((30 * Math.PI) / 360),
          Ft = Math.min(15 / zt, 26.66667 / (zt * t.aspect));
        if (dt < 1) {
          let St = dt,
            _t = Math.exp(K(Math.log(Ft), Math.log(rt.z), St)),
            Yt = (_t - Ft) / (rt.z - Ft),
            jt = kt(Yt * 0.55 + St * 0.45);
          ((rt.z = _t),
            (rt.x = K(0, rt.x, jt * jt * 0.4 + Yt * 0.6 * jt)),
            (rt.y = K(15, rt.y, jt)),
            (rt.lx = K(0, rt.lx, jt)),
            (rt.ly = K(15, rt.ly, jt)),
            (rt.r *= St),
            (rt.fov = K(30, rt.fov, St)));
        }
        let wt = rt.fov;
        (t.aspect < 16 / 9 &&
          (wt =
            (2 * Math.atan(Math.tan((wt * Math.PI) / 360) * K(1, 16 / 9 / t.aspect, dt * 0.8)) * 180) /
            Math.PI),
          (u.fov = wt),
          (u.aspect = t.aspect),
          u.position.set(rt.x, rt.y, rt.z));
        {
          let St = rt.lx - rt.x,
            _t = rt.ly - rt.y,
            Yt = rt.lz - rt.z;
          u.rotation.set(Math.atan2(_t, Math.hypot(St, Yt)), Math.atan2(-St, -Yt), -rt.r, "YXZ");
        }
        (u.updateMatrixWorld(),
          u.updateProjectionMatrix(),
          D && d.uPrev.value.copy(ht),
          ht.multiplyMatrices(u.projectionMatrix, u.matrixWorldInverse),
          D || d.uPrev.value.copy(ht),
          (D = !0));
        let mt = (gt > 5.2 && gt < 11.9) || (gt > 12.1 && gt < 19.8) || (gt > 0 && gt < 4.6);
        d.uMB.value = et.dt > 5e-4 && mt ? 0.55 * Math.min(1.6, 1 / 60 / et.dt) : 0;
        {
          let St = lt.material.uniforms.uVel.value;
          (et.dt > 5e-4 &&
            (St.copy(u.position)
              .sub(Z)
              .multiplyScalar(0.75 * Math.min(1.5, 1 / 60 / et.dt)),
            (H = St.length()),
            H > 30 && St.multiplyScalar(0)),
            Z.copy(u.position),
            (lt.material.uniforms.uMoA.value = gt > 5 ? 0.42 * kt((H - 0.12) / 0.6) : 0),
            (lt.visible = lt.material.uniforms.uMoA.value > 0.01));
        }
        let Dt = rt.y,
          it = kt((Dt - 420) / 820),
          Rt = kt((Dt - 110) / 190);
        ((d.uSp.value = it),
          (d.uDay.value = Rt),
          (d.uAlt.value = Dt),
          (d.uR.value = Ut(Dt)),
          (d.uDip.value = Math.acos(d.uR.value / (d.uR.value + Math.max(0, Dt)))),
          (d.uStar.value = kt((Dt - 650) / 600) * 1.1));
        let xt = K(K(0.32, 0.29, Rt), 0.235, it),
          Wt = K(K(0.085, 0.15, kt((Dt - 120) / 160)), 0.115, kt((Dt - 500) / 800));
        (d.uSun.value.set(Math.cos(xt) * Math.cos(Wt), Math.sin(Wt), Math.sin(xt) * Math.cos(Wt)).normalize(),
          (d.uCov.value = K(0.4, 0.62, kt((gt - 4.4) / 3.4))),
          (d.uCl.value.z = kt((gt - 4.4) / 3)),
          (d.uCl.value.w = kt((Dt - 600) / 600)),
          (d.uNear.value = 0.42 * kt((gt - 5) / 2) * (1 - kt((Dt - 420) / 300))),
          (d.uMist.value = 1 - kt((Dt - 14) / 60)),
          d.uCam.value.copy(u.position));
        let Xt = Math.tan((wt * Math.PI) / 360),
          Vt = u.matrixWorld.elements;
        (d.uX.value.set(Vt[0], Vt[1], Vt[2]).multiplyScalar(Xt * t.aspect),
          d.uY.value.set(Vt[4], Vt[5], Vt[6]).multiplyScalar(Xt),
          d.uF.value.set(-Vt[8], -Vt[9], -Vt[10]),
          (d.uPxS.value = (2 * Xt) / t.H));
        let Q = hv(gt);
        (fv(Q, U), (d.uHead.value = Q), d.uHeadP.value.set(U.x, U.y, Q, U.h));
        let Lt = r0(U.y, et.t, p);
        for (let St = 0; St < 48; St++) d.uS.value[St].fromArray(p, St * 4);
        ((T.instanceCount = r0.count),
          d.uTop.value.set(Lt, Lt),
          (d.uHeadR.value =
            (K(0.21, 0.3, kt(gt / 4)) + 0.34 * kt((U.y - 1) / 4)) * (1 + 0.05 * Math.sin(et.t * 2.4))));
        let yt = et.t * 0.075 + 1.9;
        (ot.material.uniforms.uFl.value.set(
          Math.sin(yt * 1.6) * 21 - 40,
          23 + Math.sin(yt * 2.1) * 4,
          -20 + Math.cos(yt * 1.6) * 26,
        ),
          ot.material.uniforms.uFd.value.set(Math.cos(yt * 1.6) * 21, 0, -Math.sin(yt * 1.6) * 26),
          (ot.visible = Dt < 120),
          ut.material.uniforms.uFl.value.set(
            -34 + Math.cos(yt) * 34,
            284 + Math.sin(yt * 1.7) * 4,
            26 + Math.sin(yt) * 22,
          ),
          ut.material.uniforms.uFd.value.set(-Math.sin(yt) * 34, 0, Math.cos(yt) * 22),
          (ut.visible = Dt > 230 && Dt < 520),
          (G.visible = Dt < 140));
        let It = bt.lin;
        if (
          (V.show(et.k(1, 3.1, 4.9, It), { style: "rise", by: "word", q: et.k(2, 0, 0.8, It) }),
          ft.show(et.k(2, 5.7, 7, It), { style: "rise", by: "word", q: et.k(3, 0, 0.8, It) }),
          nt.show(et.k(2, 6, 7, It), { style: "blur", q: et.k(3, 0, 0.6, It) }),
          Mt.show(et.k(3, 6.4, 8, It), { style: "rise", by: "word" }),
          Et.show(et.k(3, 8.1, 9, It), { style: "blur" }),
          et.dt > 0 && !i.headless && et.dir !== 0)
        ) {
          let St = U.y;
          if (pt >= 0 && St > pt) {
            Math.floor(St * 0.5 - 0.2) > Math.floor(pt * 0.5 - 0.2) &&
              i.sfx("paper", { gain: 0.5, pitch: 1 + U.h * 0.002 });
            for (let _t of R) _t.label && ns(_t.h) > pt && ns(_t.h) <= St && i.sfx("pop", { gain: 0.5 });
            (pt < 1 && St >= 1 && i.sfx("whoosh", { gain: 0.6 }),
              pt < 9 && St >= 8.6 && pt < 8.6 && i.sfx("riser", { gain: 0.5 }));
          }
          ((pt = St),
            et.dt > 0.002 && i.audio.param("wind", Ct(0.15 + kt(Dt / 300) * 0.5 - it * 0.5)),
            et.dt > 0.002 && i.audio.param("speed", d.uMB.value > 0 ? Ct(0.15 + H * 0.25) : 0));
        }
      },
      render(et, Tt) {
        n.setClearColor(0, 0);
        let vt = d.uAlt.value < 160 && d.uF.value.y < 0.9;
        (vt && ((d.uMir.value = -1), t.draw(y, u, a, { color: 0, alpha: 0 }), (d.uMir.value = 1)),
          (st.u.uReflOn.value = vt ? 1 - kt((d.uAlt.value - 90) / 70) : 0));
        let zt = d.uAlt.value,
          Ft = Math.round((zt < 110 ? 30 : 46) * Tt.q);
        ((q.u.uSteps.value = Ft),
          (q.u.uSeg.value = 1),
          q.render(l),
          (ct.u.uFrontOn.value = 1),
          (q.u.uSeg.value = 0),
          q.render(r),
          n.setRenderTarget(o),
          n.clear(!0, !0, !1),
          st.render(o),
          n.render(y, u),
          ct.render(s),
          t.post(s, et, {
            exposure: K(0.8, 0.88, d.uSp.value),
            bloom: 0.3,
            threshold: 1.6,
            tone: "aces",
            contrast: K(1.1, 1.05, d.uDay.value),
            saturation: 1.08,
            vignette: 0.1,
            grain: 0.022,
            time: Tt.t,
          }),
          c.render(et));
      },
      portal: {
        in(et) {
          let Tt = Math.tan((30 * Math.PI) / 360),
            vt = Math.min(15 / Tt, 26.66667 / (Tt * t.aspect)),
            zt = Tt * vt,
            Ft = zt * t.aspect,
            wt = [
              [-Ft, 15 + zt],
              [Ft, 15 + zt],
              [Ft, 15 - zt],
              [-Ft, 15 - zt],
            ];
          for (let mt = 0; mt < 4; mt++)
            ($.set(wt[mt][0], wt[mt][1], 0).project(u), (W[mt][0] = $.x), (W[mt][1] = $.y));
          return (
            et.enter <= 0 &&
              ((W[0][0] = W[3][0] = -1),
              (W[1][0] = W[2][0] = 1),
              (W[0][1] = W[1][1] = 1),
              (W[2][1] = W[3][1] = -1)),
            { c: W, a: 1 - kt((et.enter - 0.12) / 0.6), shade: K(1, 0.94, kt(et.enter / 0.5)) }
          );
        },
      },
    };
    return I;
  },
};

var Ra = 46,
  Ho = 5.7,
  _r = 28,
  dc = 34,
  Jf = 0.85,
  CA = 9.81;

function Sy(i, t, e, n, o, s, a, r, l) {
  let c = ze(i),
    u = [];
  for (let f = 0; f < t; f++) {
    let h = (f + 0.5) / t,
      d = n * Math.pow(o / n, h),
      p = s + (c() + c() + c() - 1.5) * a * K(0.7, 1.6, h),
      x = Math.round(Math.cos(p) * d),
      v = Math.round(Math.sin(p) * d);
    !x && !v && (x = 1);
    let m = (Ve * Math.hypot(x, v)) / e;
    u.push({
      kx: (Ve * x) / e,
      kz: (Ve * v) / e,
      k: m,
      a: ((r * Math.pow(d / n, l)) / m) * (0.7 + 0.6 * c()),
      w: Math.sqrt(CA * m),
      ph: c() * Ve,
    });
  }
  return u;
}

var l0 = class {
    constructor() {
      ((this.A = Sy(5, _r, Ra, 1, 17, 1.95, 0.95, 0.052, 0.04)),
        (this.B = Sy(11, dc, Ho, 2, 38, 1.8, 1.5, 0.05, 0.05)),
        (this.ua = new Float32Array(_r * 4)),
        (this.ub = new Float32Array(dc * 4)),
        (this.sw = new Float32Array(12)),
        (this.sl = 4.3),
        (this.t = 0));
      let t = (e, n) => [(Math.cos(n) * Ve) / e, (Math.sin(n) * Ve) / e];
      this.S = [
        [...t(122, 1.12), 1, 0.33, 2.5],
        [...t(83, 1.66), 0.34, 0.44, 1.1],
        [...t(190, 0.86), 0.6, 0.25, 0.5],
      ];
    }
    set(t, e, n, o, s) {
      this.t = t;
      for (let a = 0; a < _r; a++) {
        let r = this.A[a],
          l = a * 4;
        ((this.ua[l] = r.kx),
          (this.ua[l + 1] = r.kz),
          (this.ua[l + 2] = r.a * e),
          (this.ua[l + 3] = (r.ph - r.w * t) % Ve));
      }
      for (let a = 0; a < dc; a++) {
        let r = this.B[a],
          l = a * 4;
        ((this.ub[l] = r.kx),
          (this.ub[l + 1] = r.kz),
          (this.ub[l + 2] = r.a * n),
          (this.ub[l + 3] = (r.ph - r.w * t) % Ve));
      }
      for (let a = 0; a < 3; a++) {
        let r = this.S[a],
          l = a * 4;
        ((this.sw[l] = r[0]),
          (this.sw[l + 1] = r[1]),
          (this.sw[l + 2] = r[2] * o),
          (this.sw[l + 3] = (r[4] - r[3] * s) % Ve));
      }
      this.top = 0.42 * e + o * 2.25 + 0.12;
    }
    swell(t, e) {
      let n = 0;
      for (let o = 0; o < 12; o += 4) {
        let s = this.sw[o] * t + this.sw[o + 1] * e + this.sw[o + 3];
        n += this.sw[o + 2] * (Math.cos(s) + 0.16 * Math.cos(2 * s));
      }
      return n;
    }
    h(t, e) {
      let n = this.ua,
        o = t,
        s = e,
        a = 0;
      for (let r = 0; r < 3; r++) {
        let l = 0,
          c = 0;
        a = 0;
        for (let u = 0; u < _r; u++) {
          let f = u * 4,
            h = n[f] * o + n[f + 1] * s + n[f + 3],
            d = Math.sin(h),
            p = this.A[u].k;
          ((a += n[f + 2] * Math.cos(h)),
            (l -= ((Jf * n[f]) / p) * n[f + 2] * d),
            (c -= ((Jf * n[f + 1]) / p) * n[f + 2] * d));
        }
        r < 2 && ((o = t - l), (s = e - c));
      }
      return this.sl + this.swell(t, e) + a;
    }
  },
  c0 = class {
    constructor(t, e) {
      ((this.n = t),
        (this.pitch = e),
        (this.p = new Float64Array((t + 1) * 3)),
        (this.q = new Float64Array((t + 1) * 3)),
        (this.cut = -1));
    }
    lay(t, e) {
      for (let n = 0; n <= this.n; n++) {
        let o = n / this.n;
        for (let s = 0; s < 3; s++) this.p[n * 3 + s] = this.q[n * 3 + s] = K(t[s], e[s], o);
      }
    }
    step(t, e, n, o, s) {
      if (t <= 0) return;
      let { p: a, q: r, n: l, pitch: c } = this,
        u = l + 1,
        f = 3,
        h = t / f;
      for (let d = 0; d < f; d++) {
        for (let p = 0; p < u; p++) {
          let x = p * 3,
            v = a[x + 1] < o,
            m = Math.exp(-(v ? 2.4 : 0.35) * h),
            g = v ? -3.9 : -9.8;
          for (let b = 0; b < 3; b++) {
            let y = (a[x + b] - r[x + b]) * m;
            ((y = Ct(y, -0.16, 0.16)), (r[x + b] = a[x + b]), (a[x + b] += y + (b === 1 ? g * h * h : 0)));
          }
        }
        for (let p = 0; p < 22; p++) {
          ((a[0] = e[0]), (a[1] = e[1]), (a[2] = e[2]));
          let x = l * 3;
          ((a[x] = n[0]), (a[x + 1] = n[1]), (a[x + 2] = n[2]));
          for (let v = 0; v < l; v++) {
            if (v === this.cut) continue;
            let m = v * 3,
              g = m + 3,
              b = a[g] - a[m],
              y = a[g + 1] - a[m + 1],
              S = a[g + 2] - a[m + 2],
              M = Math.hypot(b, y, S) || 1e-6,
              w = ((M - c) / M) * 0.5,
              E = v === 0 ? 0 : 1,
              T = v === l - 1 ? 0 : 1,
              _ = E + T ? (2 * E) / (E + T) : 0,
              R = E + T ? (2 * T) / (E + T) : 0;
            ((a[m] += b * w * _),
              (a[m + 1] += y * w * _),
              (a[m + 2] += S * w * _),
              (a[g] -= b * w * R),
              (a[g + 1] -= y * w * R),
              (a[g + 2] -= S * w * R));
          }
          for (let v = 1; v < l; v++) {
            let m = v * 3 + 1;
            a[m] < 0.05 &&
              ((a[m] = 0.05),
              (r[m - 1] = K(r[m - 1], a[m - 1], 0.2)),
              (r[m + 1] = K(r[m + 1], a[m + 1], 0.2)));
          }
        }
        ((a[0] = e[0]), (a[1] = e[1]), (a[2] = e[2]));
      }
    }
    whip(t) {
      let e = this.cut;
      for (let n = 1; n < this.n; n++) {
        let o = n <= e,
          s = o ? n / Math.max(1, e) : 1 - (n - e - 1) / (this.n - e),
          a = s * s,
          r = n * 3;
        ((this.q[r] -= (o ? -0.022 : -0.03) * a + (t() - 0.5) * 0.012),
          (this.q[r + 1] -= (o ? 0.05 : -0.03) * a),
          (this.q[r + 2] -= Math.sin(n * 1.3 + 1) * 0.026 * a));
      }
    }
  };

var Zs = (i) => i.toFixed(5),
  Ey = `
uniform vec4 uW[${_r}];
void main(){ vec2 x=vUv*${Zs(Ra)}; vec2 x0=x; float h; vec2 d,g; float j11,j12,j22;
 for(int it=0;it<3;it++){ h=0.; d=vec2(0); g=vec2(0); j11=0.; j12=0.; j22=0.;
  for(int i=0;i<${_r};i++){ vec4 w=uW[i]; float k=length(w.xy), th=dot(w.xy,x0)+w.w, s=sin(th), c=cos(th); vec2 n=w.xy/k; h+=w.z*c; d-=${Zs(Jf)}*n*w.z*s; g-=w.xy*w.z*s; float q=-${Zs(Jf)}*w.z*c/k; j11+=q*w.x*w.x; j12+=q*w.x*w.y; j22+=q*w.y*w.y; }
  if(it<2) x0=x-d; }
 float a=1.+j11,b=j12,e=1.+j22,det=a*e-b*b; vec2 s=vec2(e*g.x-b*g.y,a*g.y-b*g.x)/max(det,.2); o=vec4(h,s,det); }`,
  _y = `
uniform vec4 uW[${dc}];
void main(){ vec2 x=vUv*${Zs(Ho)}; vec2 x0=x; float h; vec2 d,g;
 for(int it=0;it<2;it++){ h=0.; d=vec2(0); g=vec2(0); for(int i=0;i<${dc};i++){ vec4 w=uW[i]; float k=length(w.xy), th=dot(w.xy,x0)+w.w, s=sin(th); h+=w.z*cos(th); d-=.7*w.xy/k*w.z*s; g-=w.xy*w.z*s; } if(it<1) x0=x-d; }
 o=vec4(h,g,1.); }`,
  Ty =
    Fe +
    `
float tn(vec2 p,float n){ vec2 i=floor(p),q=fract(p); q=q*q*q*(q*(q*6.-15.)+10.); vec2 a=mod(i,n),b=mod(i+1.,n); return mix(mix(hash12(a),hash12(vec2(b.x,a.y)),q.x),mix(hash12(vec2(a.x,b.y)),hash12(b),q.x),q.y); }
float tf(vec2 p,float n){ float s=0.,a=.5; for(int i=0;i<6;i++){ s+=a*tn(p,n); p*=2.; n*=2.; a*=.5; } return s; }
float wor(vec2 p,float n){ vec2 i=floor(p),q=fract(p); float a=9.,b=9.; for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){ vec2 g=vec2(x,y); vec2 r=g+hash22(mod(i+g,n))-q; float d=dot(r,r); if(d<a){ b=a; a=d; } else b=min(b,d); } return sqrt(b)-sqrt(a); }
void main(){ vec2 p=vUv; vec2 w=vec2(tf(p*6.,6.),tf(p*6.+3.,6.))-.5; float c1=1.-smoothstep(.02,.30,wor((p+w*.06)*11.,11.)), c2=1.-smoothstep(.02,.34,wor((p+w*.05)*26.,26.)), c3=1.-smoothstep(.0,.4,wor(p*60.,60.));
 o=vec4(tf(p*8.,8.), clamp(c1*.75+c2*.5+c3*.3,0.,1.2)/1.2, tf(p*64.,64.), tf(p*3.,3.)); }`,
  pc =
    Fe +
    Sn +
    `
uniform sampler2D tA,tB,tSky,tCau,tN; uniform vec4 uSw0,uSw1,uSw2; uniform float uSL,uTop,uOpen,uT; uniform vec3 uSun,uSunW; uniform vec4 uCalm; uniform float uBamp,uFoam,uLow;
float calm(vec2 p){ return mix(uCalm.z,1.,smoothstep(uCalm.w*.12,uCalm.w,length(p-uCalm.xy))); }
float swell(vec2 p){ vec4 w=uSw0; float a=dot(w.xy,p)+w.w,h=w.z*(cos(a)+.16*cos(2.*a)); w=uSw1; a=dot(w.xy,p)+w.w; h+=w.z*(cos(a)+.16*cos(2.*a)); w=uSw2; a=dot(w.xy,p)+w.w; return h+w.z*(cos(a)+.16*cos(2.*a)); }
vec2 swellS(vec2 p){ vec4 w=uSw0; float a=dot(w.xy,p)+w.w; vec2 s=-w.xy*w.z*(sin(a)+.32*sin(2.*a)); w=uSw1; a=dot(w.xy,p)+w.w; s-=w.xy*w.z*(sin(a)+.32*sin(2.*a)); w=uSw2; a=dot(w.xy,p)+w.w; return s-w.xy*w.z*(sin(a)+.32*sin(2.*a)); }
float H(vec2 p){ return uSL+swell(p)+textureLod(tA,p/${Zs(Ra)},0.).x*calm(p); }
float Hf(vec2 p){ return uSL+swell(p)+(textureLod(tA,p/${Zs(Ra)},0.).x+textureLod(tB,p/${Zs(Ho)},0.).x*1.2)*calm(p); }
vec3 skyMap(vec3 d,float lod){ float y=max(d.y,0.); return textureLod(tSky,vec2(atan(d.x,-d.z)/6.2831853+.5,sqrt(y)),lod).rgb; }
// light under water
const vec3 SIG=vec3(.30,.085,.10);
vec3 waterFog(vec3 rd,float depth){ float up=rd.y*.5+.5; vec3 c=mix(vec3(.0005,.0032,.0052),vec3(.0024,.0205,.0245),smoothstep(.20,.64,up)); float g=max(dot(rd,uSunW),0.); c+=vec3(.010,.036,.031)*pow(g,4.)+vec3(.05,.085,.055)*pow(g,20.); return c*exp(-max(depth,0.)*vec3(.16,.075,.07))*mix(1.,1.5,uOpen); }
float caustic(vec3 p,float depth){ vec2 q=p.xz-uSunW.xz/uSunW.y*(p.y-uSL); float l=clamp(1.2+depth*.22,0.,4.); float a=textureLod(tCau,q/${Zs(Ho)},l).x, b=textureLod(tCau,mat2(.8,.6,-.6,.8)*q/${Zs(Ho * 1.73)}+.37,l).x; return pow(max(a*.55+b*.55,0.),1.5); }
`,
  gv = `
float cloudF(vec2 q){ float s=0.,a=.5; mat2 m=mat2(.8,.6,-.6,.8); vec2 w=vec2(textureLod(tN,q*.021+uT*.0006,1.).x,textureLod(tN,q*.021+.5,1.).x)-.5; q+=w*9.; for(int i=0;i<4;i++){ s+=a*textureLod(tN,q*.0165,float(i)*.0).x; q=m*q*2.1+uT*.05; a*=.48; } return s; }
vec3 sky(vec3 d){ float y=d.y; vec3 hs=normalize(vec3(uSun.x,0.,uSun.z)); float az=max(dot(normalize(vec3(d.x,1e-4,d.z)),hs),0.); float s=max(dot(d,uSun),0.); float far=pow(az,mix(5.,2.5,uOpen));
 // the clear band behind the storm: pale and cold first, gold once it opens
 vec3 lo=mix(vec3(.95,.70,.36),vec3(1.45,.64,.18),uOpen), hi=mix(vec3(.46,.48,.44),vec3(.50,.50,.42),uOpen);
 vec3 c=mix(mix(vec3(.15,.19,.22),lo,far),mix(vec3(.13,.19,.25),hi,far),smoothstep(0.,mix(.10,.20,uOpen),y)); c=mix(c,mix(vec3(.10,.18,.28),vec3(.13,.24,.36),uOpen),smoothstep(.10,.62,y));
 c+=mix(vec3(.50,.36,.18),vec3(1.0,.46,.13),uOpen)*pow(s,40.)+mix(vec3(1.2,.85,.45),vec3(3.,1.5,.5),uOpen)*pow(s,500.)+vec3(130.,84.,44.)*smoothstep(.99968,.99982,s)*mix(.025,1.,uOpen);
 vec2 ap=vec2(atan(d.x,-d.z),y);
 float bank=textureLod(tN,vec2(ap.x*.42+uT*.0006,ap.y*1.4),1.).x; float bk=smoothstep(.05,.0,y-(bank-.5)*.10-.008); c=mix(c,mix(vec3(.10,.125,.145),mix(vec3(.30,.22,.13),vec3(.62,.28,.10),uOpen),far),bk*.82*(1.-.6*smoothstep(.985,.9995,s)));
 // the deck, seen in perspective, lit from under its far edge
 float edge=mix(.060,.145,uOpen)-.062*uOpen*smoothstep(-.22,-.62,ap.x); vec2 q=d.xz/max(y+.045,.02)*2.7; q+=vec2(.4,-.3)*uT*.5; float n=cloudF(q);
 float rag=textureLod(tN,vec2(ap.x*.5+uT*.0008,y*.8),0.).x*.7+textureLod(tN,vec2(ap.x*1.7-uT*.001,y*2.3),0.).x*.3; float cover=smoothstep(-.02,.035,y-edge-(rag-.5)*mix(.10,.34,uOpen)-(1.-far)*mix(-.03,-.04,uOpen));
 float dens=cover*smoothstep(mix(.02,.22,uOpen),mix(.30,.50,uOpen),n+mix(.16,.06,uOpen)*1.);
 vec2 L2=normalize(uSun.xz); float nl=cloudF(q+L2*1.6); float lit=clamp((n-nl)*4.2+.40,0.,1.); float under=exp(-max(y-edge,0.)*mix(13.,10.,uOpen));
 vec3 dark=mix(vec3(.016,.023,.032),vec3(.070,.088,.105),lit*.75+.25*n)*(.45+1.1*n); dark=mix(dark,dark*vec3(1.12,1.16,1.25)+vec3(.006,.005,.006),uOpen);
 vec3 gl=mix(mix(vec3(.07,.08,.085),vec3(.50,.38,.21),far),mix(vec3(.12,.09,.085),vec3(1.5,.56,.17),far),uOpen)*under*(.06+lit*lit*1.1);
  c=mix(c,dark+gl,dens*mix(.985,.98,uOpen)); c+=vec3(1.3,.62,.2)*uOpen*far*pow(1.-abs(dens*2.-1.),3.)*.22*step(.02,dens);
 // rain falling out of it
 float rn=textureLod(tN,vec2(ap.x*1.6+uT*.002,y*.18+ap.x*.4),0.).x; float rp=smoothstep(.50,.72,textureLod(tN,vec2(ap.x*.28+.2,.2),0.).w); float rz=smoothstep(edge+.07,edge-.03,y)*smoothstep(-.01,.02,y); c=mix(c,vec3(.055,.072,.086)+vec3(.20,.14,.07)*far*.6,clamp(rp*smoothstep(.30,.62,rn)*rz*(1.-smoothstep(.90,.99,s))*1.1*(1.-uOpen*.9),0.,.92));
 return max(c,0.); }
`,
  Ay = `
uniform float uQ;
float traceAir(vec3 ro,vec3 rd,float tmax){
 float top=uSL+uTop,t=0.; if(ro.y>top){ if(rd.y>=-1e-4) return -1.; t=(top-ro.y)/rd.y; } float lh=length(rd.xz),sl=mix(.42,.62,clamp(uTop*.2,0.,1.)),pt=t; int N=int(92.*uQ);
 for(int i=0;i<N;i++){ vec3 p=ro+rd*t; if(rd.y>0.&&p.y>top) return -1.; float d=p.y-H(p.xz); if(d<.0006*t){ float a=pt,b=t; for(int k=0;k<7;k++){ float m=(a+b)*.5; vec3 pm=ro+rd*m; if(pm.y<H(pm.xz)) b=m; else a=m; } return b; } pt=t; t+=max(d/(sl*lh-rd.y+.02)*.95,.012+.022*t); if(t>tmax) break; }
 if(rd.y<-1e-5){ float tp=(uSL-ro.y)/rd.y; if(tp>0.) return max(tp,t*.98); } return -1.; }
float traceUnder(vec3 ro,vec3 rd,float tmax){ float lh=length(rd.xz),t=.0,pt=0.; int N=int(40.*uQ); for(int i=0;i<N;i++){ vec3 p=ro+rd*t; float d=H(p.xz)-p.y; if(d<0.){ float a=pt,b=t; for(int k=0;k<8;k++){ float m=(a+b)*.5; vec3 pm=ro+rd*m; if(pm.y>H(pm.xz)) b=m; else a=m; } return b; } pt=t; t+=max(d/(.6*lh+rd.y+.05)*.95,.03+.02*t); if(d>2.&&rd.y<0.) return -1.; if(t>tmax) return rd.y>0.?t:-1.; } return rd.y>0.?max((uSL-ro.y)/rd.y,t):-1.; }
`,
  u0 = `
uniform vec3 uTri[48]; uniform vec4 uBoatS; uniform vec3 uSunC;
bool boatRay(vec3 ro,vec3 rd,out float tb,out vec3 n){ tb=1e9; vec3 oc=ro-uBoatS.xyz; float b=dot(oc,rd),c=dot(oc,oc)-uBoatS.w*uBoatS.w; if(b*b-c<0.) return false; bool hit=false;
 for(int i=0;i<14;i++){ vec3 a=uTri[i*3],e1=uTri[i*3+1]-a,e2=uTri[i*3+2]-a,p=cross(rd,e2); float det=dot(e1,p); if(abs(det)<1e-6) continue; float inv=1./det; vec3 tv=ro-a; float u=dot(tv,p)*inv; if(u<0.||u>1.) continue; vec3 q=cross(tv,e1); float v=dot(rd,q)*inv; if(v<0.||u+v>1.) continue; float t=dot(e2,q)*inv; if(t>.005&&t<tb){ tb=t; n=normalize(cross(e1,e2)); hit=true; } }
 return hit; }
vec3 boatShade(vec3 n,vec3 rd){ if(dot(n,rd)>0.) n=-n; float l=max(dot(n,uSun),0.),tr=max(-dot(n,uSun),0.); return vec3(.8)*(uSunC*(l*.8+tr*.42*vec3(1.,.8,.55))+mix(vec3(.10,.13,.14),vec3(.34,.40,.46),n.y*.5+.5)); }
`;

var Ca = (i) => i.toFixed(5),
  Ry =
    pc +
    gv +
    "void main(){ float a=(vUv.x-.5)*6.2831853; float y=vUv.y*vUv.y; float c=sqrt(max(1.-y*y,0.)); vec3 d=vec3(sin(a)*c,y,-cos(a)*c); o=vec4(min(sky(d),vec3(40.)),1.); }",
  Cy = `uniform vec3 uCam,uF,uR,uU; uniform vec2 uTan; uniform float uLens,uMen; uniform sampler2D tO,tD;
vec2 proj(vec3 d){ float z=max(dot(d,uF),1e-3); return vec2(dot(d,normalize(uR))/z/uTan.x,dot(d,normalize(uU))/z/uTan.y)*.5+.5; }
float sandH(vec2 p){ float r=length(p-vec2(1.,0.)); return (textureLod(tN,p*.035,1.).w-.5)*.5+(textureLod(tN,p*.09+.3,1.).x-.5)*.22-smoothstep(14.,70.,r)*9.; }
`,
  Py =
    pc +
    Cy +
    `
float ign(vec2 p){ return fract(52.9829189*fract(dot(p,vec2(.06711056,.00583715)))); }
void main(){ vec2 n=vUv*2.-1.; vec3 rd=normalize(uF+n.x*uR+n.y*uU); float z=dot(rd,uF); vec3 lp=uCam+rd*(uLens/z); float e=lp.y-Hf(lp.xz); if(e>uMen*2.){ o=vec4(0); return; }
 vec4 ob=texture(tO,vUv); float tm=ob.a>.3?texture(tD,vUv).x/ob.a:1e3; float t0=uLens/z; if(rd.y<-.02) tm=min(tm,(0.-uCam.y)/rd.y); if(rd.y>.004) tm=min(tm,max((uSL+.22-uCam.y)/rd.y,t0+.4)); tm=min(tm,22.);
 float acc=0.,tot=0.; int N=18; float dt=(tm-t0)/float(N); float j=ign(gl_FragCoord.xy+floor(fract(uT*3.1)*8.)*5.588); vec3 s=vec3(0);
 for(int i=0;i<N;i++){ float t=t0+(float(i)+j)*dt; vec3 p=uCam+rd*t; float d=max(uSL-p.y,0.); vec2 q=p.xz-uSunW.xz/uSunW.y*(p.y-uSL); float c=textureLod(tCau,q/${Ca(Ho * 1.9)},3.4).x*.62+textureLod(tCau,mat2(.8,.6,-.6,.8)*q/${Ca(Ho * 0.9)},3.9).x*.38; c=max(c-1.02,0.)*3.0; float big=textureLod(tN,q*.028+uT*.004,1.).w; c*=smoothstep(.30,.62,big)*1.7; s+=c*exp(-vec3(.30,.20,.19)*d*1.0-SIG*t*.75)*dt; }
 float g=max(dot(rd,uSunW),0.); o=vec4(s*(.35+1.4*pow(g,4.)),1.); }`,
  Ly =
    pc +
    gv +
    Ay +
    u0 +
    Cy +
    `
uniform sampler2D tS; uniform mat4 uBoatInv; uniform float uDeep; uniform float uSwamp,uSplash,uQuiet,uSpray; uniform vec4 uRing;
vec3 waterN(vec3 p,float t,out float rough,out float foam,out float det){ float c=calm(p.xz); float px=t*.0011; float gz=1.; float la=log2(max(px*256./${Ca(Ra)},1e-3)), lb=log2(max(px*512./${Ca(Ho)}*2.2,1e-3)); vec4 a=textureLod(tA,p.xz/${Ca(Ra)},max(la,0.)); vec4 b=textureLod(tB,p.xz/${Ca(Ho)},max(lb,0.)); vec4 b2=textureLod(tB,mat2(.8,.6,-.6,.8)*p.xz/${Ca(Ho * 2.63)}+uT*.01,max(lb-1.3,0.)); 
 float gust=mix(mix(.45,.8,uOpen),1.35,smoothstep(.35,.65,textureLod(tN,p.xz*.0075+uT*.004,1.).x)); vec2 s=(a.yz+(b.yz+b2.yz*.7)*uBamp*gust)*c+swellS(p.xz); det=a.w; foam=smoothstep(uFoam,uFoam-.22,a.w); rough=clamp(.03+.055*log2(1.+t*.25)*(.5+uBamp*.6),.03,.36); return normalize(vec3(-s.x,1.,-s.y)); }
float foamTex(vec2 p,float k,float l){ float a=textureLod(tN,p*.31+uT*vec2(.006,-.004),l).y, b=textureLod(tN,p*.83-uT*vec2(.01,.006),l+1.4).y, c=textureLod(tN,p*.055,0.).x; float f=a*.62+b*.5; return smoothstep(1.-k,1.25-k*.75,f*(.6+.8*c)+k*.15); }
// hull outline on the water: <0 inside, metres outside
float hull(vec3 p,out vec3 l){ l=(uBoatInv*vec4(p,1.)).xyz; float g=clamp((l.y+.29)/.55,0.,1.2); float a=mix(.48,1.0,g),b=mix(.15,.42,g); float d=(abs(l.x)/a+abs(l.z)/b-1.)*b*1.1; return l.y>.6?9.:d*${Ca(1.75)}; }
vec3 sand(vec3 p,float depth){ vec2 e=vec2(.08,0.); float rp=0.; float w=textureLod(tN,p.xz*.06,1.).x*5.; float ph=p.x*8.5+p.z*3.2+w*3.; float r=sin(ph)+.35*sin(ph*2.1+1.); vec2 rs=vec2(8.5,3.2)*cos(ph)*.018; vec2 s=vec2(sandH(p.xz+e)-sandH(p.xz-e),sandH(p.xz+e.yx)-sandH(p.xz-e.yx))/(2.*e.x)+rs; vec3 n=normalize(vec3(-s.x,1.,-s.y)); float gr=textureLod(tN,p.xz*1.9,0.).z; vec3 alb=mix(vec3(.30,.27,.19),vec3(.46,.42,.31),.5+.25*r+.3*(gr-.5)); alb*=.8+.4*textureLod(tN,p.xz*.4,0.).x;
 float c=caustic(p,depth); vec3 ab=exp(-vec3(.34,.17,.155)*max(depth,0.)); vec3 ao=vec3(smoothstep(.0,1.1,length((p.xz-uRing.xy)*vec2(.8,1.3)))*.6+.4); return alb*(vec3(.80,.95,.78)*mix(.62,1.3,uOpen)*ab*max(dot(n,uSunW),0.)*mix(.26,c,.92)*1.1+vec3(.018,.066,.068)*exp(-depth*vec3(.22,.10,.09))*1.1)*ao; }
vec3 underBelow(vec3 p,vec3 rd,float depth0,vec2 uv,float tW){ // what is seen looking down into the water from the air
 float t=40.; if(rd.y<-.02) t=min((sandH(p.xz+rd.xz*3.)-p.y)/rd.y,40.); t=max(t,0.); vec3 q=p+rd*t; vec3 c=vec3(0.); float dp=max(uSL-q.y,0.); vec3 fog=vec3(.0030,.0120,.0155)*mix(1.,1.4,uOpen); c=sand(q,dp)*exp(-SIG*t*1.15)*(1.-uDeep); vec4 ob=texture(tO,uv); if(ob.a>.02){ float d=texture(tD,uv).x/ob.a-tW; if(d>0.) c=mix(c,ob.rgb/ob.a*vec3(.62,.50,.52)*exp(-SIG*(d+uDeep*14.)),ob.a); t=min(t,mix(t,max(d,0.),ob.a)); } return c*vec3(.24,.19,.23)+fog*(1.-exp(-t*vec3(.55,.30,.30))); }
void main(){ vec2 n=vUv*2.-1.; vec3 rd0=normalize(uF+n.x*uR+n.y*uU); float z=dot(rd0,uF); float t0=uLens/z; vec3 lp=uCam+rd0*t0; float hl=Hf(lp.xz)+(textureLod(tN,lp.xz*.35+uT*.05,1.).x-.5)*.015; float e=lp.y-hl; float m=1.-smoothstep(0.,uMen,abs(e)); bool under=e<0.; vec3 rd=normalize(rd0+uU/max(length(uU),1e-3)*(under?-1.:1.)*m*m*.42); vec2 uv=m>0.?clamp(proj(rd),.001,.999):vUv;
 vec4 ob=texture(tO,uv); float tO_=ob.a>.004?texture(tD,uv).x/ob.a:1e6; vec3 col; float tb; vec3 bn;
 if(!under){
  float tW=traceAir(lp,rd,420.); vec3 hl3; float hd=9.; vec3 p; if(tW>=0.){ tW+=t0; p=uCam+rd*tW; hd=tW<60.?hull(p,hl3):9.; if(hd<-.02&&ob.a>.5&&hl3.x<mix(1.3,-.2,uSwamp)&&hl3.y>-.35&&tO_>tW){ tW=-1.; } }
  if(tW<0.) col=sky(rd);
  else { float rough,foam,det; vec3 N=waterN(p,tW,rough,foam,det); float ring=uRing.w>0.?uRing.w*sin((length(p.xz-uBoatS.xz)-uRing.z)*7.)*exp(-pow((length(p.xz-uBoatS.xz)-uRing.z)*.9,2.)):0.; N=normalize(N+vec3(normalize(p.xz-uBoatS.xz+1e-4)*ring,0.).xzy*vec3(1,0,1));
   vec3 V=-rd; float nv=max(dot(N,V),.02); nv=mix(nv,max(nv,.12),clamp(tW/200.,0.,1.)); float F=.02+.98*pow(1.-nv,5.)*(1.-rough*.9); vec3 R=reflect(rd,N); R.y=abs(R.y)+.01; R=normalize(R); vec3 refl=skyMap(R,clamp(log2(1.+rough*28.),0.,6.)); 
   if(tW<40.&&boatRay(p+N*.01,R,tb,bn)) refl=boatShade(bn,R); else { float sl=max(dot(R,uSun),0.); float pw=mix(2600.,90.,smoothstep(.03,.36,rough)); refl+=uSunC*(pw*.011)*pow(sl,pw)*mix(1.,1.6,uOpen); }
   vec3 rf=refract(rd,N,.75); vec2 uv2=uv+(N.xz*vec2(1,-1))*.05/(1.+tW*.12)*vec2(1.,.6); vec3 body=underBelow(p,rf,0.,clamp(uv2,.001,.999),tW);
   // light through thin crests
   float crest=smoothstep(-.05,.9,(p.y-uSL-uLow)*mix(1.8,.23,clamp(uTop*.12,0.,1.))); vec3 hs=normalize(vec3(uSun.x,0.,uSun.z)); float sss=pow(max(dot(rd,hs),0.),3.)*pow(clamp(1.-N.y+.15+max(dot(N,-hs),0.)*.0,0.,1.),1.)*(.2+crest)*pow(max(1.-F,0.),2.); body+=sss*mix(vec3(.012,.048,.044),vec3(.15,.20,.085),uOpen); body+=vec3(.005,.013,.014)*(1.+crest)*uOpen;
   col=mix(body,refl,F);
   // foam: whitecaps, the hull's edge, the landing ring
   float fa=foam*.9; float lace=textureLod(tN,p.xz*.02+uT*.003,1.).x; float hf=hd<1.6?exp(-max(hd,0.)*mix(5.5,2.6,uSplash))*(.45+.9*uSplash):0.; float tr=0.; { float lx=-hl3.x; if(hd<9.&&uSpray>0.){ float w=.16+.16*max(lx,0.); tr=smoothstep(w,w*.35,abs(abs(hl3.z)-.08*max(lx,0.)))*smoothstep(-.2,.4,lx)*exp(-max(lx,0.)*.28)*uSpray; } }
   float k=clamp(fa*.75+hf+tr*.5+uQuiet*smoothstep(.56,.74,lace)*.24,0.,1.); float ft=k>.01?foamTex(p.xz*2.6,k,clamp(log2(tW*.0011*1024.*.85),0.,6.))*smoothstep(.0,.25,k):0.; ft*=mix(1.,.6,smoothstep(20.,160.,tW)); vec3 fl=uSunC*(.16+.5*max(dot(N,uSun),0.))+vec3(.30,.35,.38); col=mix(col,fl*.72,ft*.85);
   // distance haze
   float hz=1.-exp(-max(tW-18.,0.)*.0042); vec3 hc=skyMap(normalize(vec3(rd.x,.016,rd.z)),2.5)*mix(.8,1.,uOpen); col=mix(col,hc,hz*hz*.92); }
  float tb2=tW<0.?1e7:tW; if(ob.a>.004&&tO_<tb2+.02) col=mix(col,ob.rgb/ob.a,ob.a);
 } else {
  vec3 ro=lp; float dep=max(uSL-lp.y,0.); float tB=1e5; if(rd.y<-.004){ float t=(0.-ro.y)/rd.y; for(int i=0;i<4;i++){ vec3 q=ro+rd*t; t=(sandH(q.xz)-ro.y)/rd.y; } if(t>0.) tB=t; }
  float tU=traceUnder(ro,rd,40.); vec3 fog=waterFog(rd,dep); float tH=min(tB,tU>=0.?tU:1e5); vec3 bg=fog;
  if(tU>=0.&&tU<tB){ vec3 p=ro+rd*tU; float rough,foam,det; vec3 N=waterN(p,tU,rough,foam,det); N.xz*=1.25; N=normalize(N); vec3 Nu=dot(rd,N)>0.?-N:N; vec3 T=refract(rd,Nu,1.333); if(T.y<.02) T=vec3(0.); float c=max(dot(rd,N),0.); float F=1.; vec3 sk=vec3(0); if(dot(T,T)>.01){ float st=max(dot(T,N),0.); F=.02+.98*pow(1.-st,5.); if(boatRay(p+N*.01,T,tb,bn)) sk=boatShade(bn,T); else { sk=skyMap(T,1.5); sk+=uSunC*6.*pow(max(dot(T,uSun),0.),200.); } }
   vec3 R=reflect(rd,-N); vec3 rc=waterFog(normalize(vec3(R.x,max(R.y,-.9)*.3+.12,R.z)),0.)*1.5; { float gl=textureLod(tCau,p.xz/5.7*.8+N.xz*.25,1.5).x; rc+=vec3(.008,.030,.028)*max(gl-.55,0.)*1.2; rc+=texture(tS,clamp(proj(normalize(vec3(R.x,min(R.y,-.02),R.z))),.01,.99)).rgb*vec3(.62,1.,.80)*.032; } if(boatRay(p-N*.02,R,tb,bn)) rc=mix(rc,vec3(.08,.16,.16)*(.5+.5*abs(bn.y)),exp(-tb*.2)); else if(R.y<-.05){ float ts=(0.-p.y)/R.y; vec3 q=p+R*ts; rc=mix(rc,sand(q,max(uSL-q.y,0.)),exp(-ts*.28)); }
   bg=mix(sk*vec3(1.2,2.1,2.0)+vec3(.006,.030,.032),rc,F); bg+=vec3(.05,.12,.10)*pow(1.-abs(N.y),1.)*.3; }
  else if(tB<1e4){ vec3 p=ro+rd*tB; bg=sand(p,max(uSL-p.y,0.)); }
  if(ob.a>.004&&tO_-t0<tH+.05){ bg=mix(bg,ob.rgb/ob.a,ob.a); tH=mix(tH,tO_-t0,ob.a); }
  vec3 Tr=exp(-SIG*min(tH,60.)*.30-min(tH,60.)*.012); col=bg*Tr+fog*(1.-Tr);
  vec2 sp=2./uRes; vec3 sh=vec3(0); for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++) sh+=texture(tS,uv+vec2(x,y)*sp).rgb; sh/=9.; col+=sh*vec3(.55,1.,.84)*mix(.030,.05,uOpen); { float l=dot(col,vec3(.25,.6,.15)); col*=mix(mix(.24,.85,smoothstep(-.05,.02,rd.y)),1.,smoothstep(-.004,.085,l)); col=max(mix(vec3(l),col,1.10),0.)*vec3(.70,.78,.85); }
 }
 // the line itself: water climbing the glass
 float ed=abs(e)/uMen; float line=exp(-ed*ed*26.)*.9; vec3 lc=under?vec3(.02,.12,.12):col; col=mix(col,col*.30+vec3(.004,.02,.022),exp(-pow((e/uMen+.30)*3.2,2.))*.75); col+=exp(-pow((e/uMen-.05)*9.,2.))*(skyMap(normalize(vec3(rd0.x,.12,rd0.z)),3.)*.55);
 col=mix(col,skyMap(normalize(vec3(rd0.x,.10,rd0.z)),3.)*.34+vec3(.003,.014,.016),exp(-pow((e/uMen-.10)*4.6,2.))*.9); o=vec4(min(max(col,0.),vec3(80.)),smoothstep(.0,-uMen*.4,e)); }`,
  zy =
    "precision highp float; in vec2 position; uniform sampler2D tB; uniform float uFocus; out vec2 vA,vC; void main(){ vec2 s=textureLod(tB,position,2.2).yz; vec2 q=position+s*uFocus; vA=position; vC=q; gl_Position=vec4(q*2.-1.,0.,1.); }",
  Iy =
    "precision highp float; in vec2 vA,vC; out vec4 o; void main(){ float a=length(dFdx(vA))*length(dFdy(vA)), b=length(dFdx(vC))*length(dFdy(vC)); o=vec4(min(a/max(b,1e-9),9.)); }";

function Qf(i, t = !1) {
  let e = i[0].index !== null,
    n = new Set(Object.keys(i[0].attributes)),
    o = new Set(Object.keys(i[0].morphAttributes)),
    s = {},
    a = {},
    r = i[0].morphTargetsRelative,
    l = new Qt();
  l.morphTargetsRelative = r;
  let c = 0;
  for (let u = 0; u < i.length; ++u) {
    let f = i[u],
      h = 0,
      d = 0;
    if (e !== (f.index !== null))
      return (
        console.error(
          "THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " +
            u +
            ". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.",
        ),
        null
      );
    for (let p in f.attributes) {
      if (!n.has(p))
        return (
          console.error(
            "THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " +
              u +
              '. All geometries must have compatible attributes; make sure "' +
              p +
              '" attribute exists among all geometries, or in none of them.',
          ),
          null
        );
      (s[p] === void 0 && (s[p] = []), s[p].push(f.attributes[p]), h++);
    }
    if (h !== n.size)
      return (
        console.error(
          "THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " +
            u +
            ". Make sure all geometries have the same number of attributes.",
        ),
        null
      );
    if (r !== f.morphTargetsRelative)
      return (
        console.error(
          "THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " +
            u +
            ". .morphTargetsRelative must be consistent throughout all geometries.",
        ),
        null
      );
    for (let p in f.morphAttributes) {
      if (!o.has(p))
        return (
          console.error(
            "THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " +
              u +
              ".  .morphAttributes must be consistent throughout all geometries.",
          ),
          null
        );
      if (f.morphAttributes[p].length !== i[0].morphAttributes[p].length)
        return (
          console.error(
            "THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " +
              u +
              '. All geometries must have the same number of morph targets for the "' +
              p +
              '" morph attribute.',
          ),
          null
        );
      (a[p] === void 0 && (a[p] = []), a[p].push(f.morphAttributes[p]), d++);
    }
    if (d !== o.size)
      return (
        console.error(
          "THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " +
            u +
            ". Make sure all geometries have the same number of morph attributes.",
        ),
        null
      );
    if (t) {
      let p;
      if (e) p = f.index.count;
      else if (f.attributes.position !== void 0) p = f.attributes.position.count;
      else
        return (
          console.error(
            "THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " +
              u +
              ". The geometry must have either an index or a position attribute",
          ),
          null
        );
      (l.addGroup(c, p, u), (c += p));
    }
  }
  if (e) {
    let u = 0,
      f = [];
    for (let h = 0; h < i.length; ++h) {
      let d = i[h].index;
      for (let p = 0; p < d.count; ++p) f.push(d.getX(p) + u);
      u += i[h].attributes.position.count;
    }
    l.setIndex(f);
  }
  for (let u in s) {
    let f = Ny(s[u]);
    if (!f)
      return (
        console.error(
          "THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " +
            u +
            " attribute.",
        ),
        null
      );
    l.setAttribute(u, f);
  }
  for (let u in a) {
    let f = a[u][0].length;
    if (f !== 0) {
      ((l.morphAttributes = l.morphAttributes || {}), (l.morphAttributes[u] = []));
      for (let h = 0; h < f; ++h) {
        let d = [];
        for (let x = 0; x < a[u].length; ++x) d.push(a[u][x][h]);
        let p = Ny(d);
        if (!p)
          return (
            console.error(
              "THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " +
                u +
                " morphAttribute.",
            ),
            null
          );
        l.morphAttributes[u].push(p);
      }
    }
  }
  return l;
}

function Ny(i) {
  let t,
    e,
    n,
    o = -1,
    s = 0;
  for (let c = 0; c < i.length; ++c) {
    let u = i[c];
    if ((t === void 0 && (t = u.array.constructor), t !== u.array.constructor))
      return (
        console.error(
          "THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.",
        ),
        null
      );
    if ((e === void 0 && (e = u.itemSize), e !== u.itemSize))
      return (
        console.error(
          "THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.",
        ),
        null
      );
    if ((n === void 0 && (n = u.normalized), n !== u.normalized))
      return (
        console.error(
          "THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.",
        ),
        null
      );
    if ((o === -1 && (o = u.gpuType), o !== u.gpuType))
      return (
        console.error(
          "THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.",
        ),
        null
      );
    s += u.count * e;
  }
  let a = new t(s),
    r = new $t(a, e, n),
    l = 0;
  for (let c = 0; c < i.length; ++c) {
    let u = i[c];
    if (u.isInterleavedBufferAttribute) {
      let f = l / e;
      for (let h = 0, d = u.count; h < d; h++)
        for (let p = 0; p < e; p++) {
          let x = u.getComponent(h, p);
          r.setComponent(h + f, p, x);
        }
    } else a.set(u.array, l);
    l += u.count * e;
  }
  return (o !== void 0 && (r.gpuType = o), r);
}

var f0 = 1.75,
  mc = {
    B: [1.04, 0.47, 0],
    S: [-1.04, 0.47, 0],
    K1: [0.5, -0.26, 0],
    K2: [-0.5, -0.26, 0],
    Mp: [0, -0.29, 0.17],
    Mn: [0, -0.29, -0.17],
    Rp: [0, 0.27, 0.42],
    Rn: [0, 0.27, -0.42],
    A: [0, 1.02, 0],
    E1: [0.52, 0.2, 0],
    E2: [-0.52, 0.2, 0],
    Gp: [0, 0.02, 0.2],
    Gn: [0, 0.02, -0.2],
  },
  Fy = [
    ["B", "K1", "Rp", 0, [0, 0], [0.25, 0.5], [0.5, 0]],
    ["K1", "Mp", "Rp", 0, [0.25, 0.5], [0.5, 0.55], [0.5, 0]],
    ["Mp", "K2", "Rp", 0, [0.5, 0.55], [0.75, 0.5], [0.5, 0]],
    ["K2", "S", "Rp", 0, [0.75, 0.5], [1, 0], [0.5, 0]],
    ["B", "Rn", "K1", 0, [1, 1], [0.5, 1], [0.75, 0.5]],
    ["K1", "Rn", "Mn", 0, [0.75, 0.5], [0.5, 1], [0.5, 0.45]],
    ["Mn", "Rn", "K2", 0, [0.5, 0.45], [0.5, 1], [0.25, 0.5]],
    ["K2", "Rn", "S", 0, [0.25, 0.5], [0.5, 1], [0, 1]],
    ["K1", "Mn", "Mp", 2, [0.2, 0.2], [0.3, 0.4], [0.4, 0.2]],
    ["K2", "Mp", "Mn", 2, [0.2, 0.2], [0.3, 0.4], [0.4, 0.2]],
    ["A", "E1", "Gp", 1, [0.5, 1], [0.98, 0.06], [0.5, 0.02]],
    ["A", "Gp", "E2", 1, [0.5, 1], [0.5, 0.02], [0.02, 0.06]],
    ["A", "Gn", "E1", 1, [0.5, 1], [0.5, 0.02], [0.98, 0.06]],
    ["A", "E2", "Gn", 1, [0.5, 1], [0.02, 0.06], [0.5, 0.02]],
    ["E1", "B", "Rp", 3, [0.3, 0.3], [0.5, 0.5], [0.5, 0.2]],
    ["E2", "Rp", "S", 3, [0.3, 0.3], [0.5, 0.5], [0.5, 0.2]],
  ],
  ky = Fy.slice(0, 14).map((i) => [mc[i[0]], mc[i[1]], mc[i[2]]]);

function Dy(i = 7) {
  let t = [],
    e = [],
    n = [],
    o = [],
    s = [],
    a = new F(),
    r = new F();
  Fy.slice(0, 14).forEach((c, u) => {
    let f = new F(...mc[c[0]]),
      h = new F(...mc[c[1]]),
      d = new F(...mc[c[2]]);
    r.copy(h).sub(f).cross(new F().copy(d).sub(f)).normalize();
    let p = c[3],
      x = p === 1 ? 0.1 : p === 0 ? -0.06 : 0,
      v = u * 1.7,
      m = (y, S, M) => {
        let w = new F().addScaledVector(f, y).addScaledVector(h, S).addScaledVector(d, M),
          E = y * S * M * 27,
          T = Math.sin(y * 5 + v) * Math.cos(S * 7 - v) * 0.012 * Math.min(1, E * 2);
        return w.addScaledVector(r, x * E * 0.55 + T);
      },
      g = (y, S) => {
        let M = y / i,
          w = S / i;
        return [M, w, 1 - M - w];
      },
      b = (y) => {
        let M = m(...y),
          w = m(y[0] + 0.004, y[1] - 0.004, y[2]),
          E = m(y[0], y[1] + 0.004, y[2] - 0.004),
          T = w.sub(M).cross(E.sub(M)).normalize();
        (T.dot(r) < 0 && T.negate(), t.push(M.x, M.y, M.z), e.push(T.x, T.y, T.z));
        let [_, R, L] = y;
        (n.push(c[4][0] * _ + c[5][0] * R + c[6][0] * L, c[4][1] * _ + c[5][1] * R + c[6][1] * L),
          o.push(_, R, L),
          s.push(p, u));
      };
    for (let y = 0; y < i; y++)
      for (let S = 0; S < i - y; S++)
        (b(g(y, S)),
          b(g(y + 1, S)),
          b(g(y, S + 1)),
          y + S < i - 1 && (b(g(y + 1, S)), b(g(y + 1, S + 1)), b(g(y, S + 1))));
  });
  let l = new Qt();
  (l.setAttribute("position", new ae(t, 3)), l.setAttribute("normal", new ae(e, 3)));
  for (let c = 0; c < n.length / 2; c++) {
    let u = t[c * 3],
      f = t[c * 3 + 1],
      h = t[c * 3 + 2] < 0 ? -1 : 1;
    s[c * 2] === 1
      ? ((n[c * 2] = 0.5 + u * 0.62 * h), (n[c * 2 + 1] = 0.02 + f * 0.9))
      : ((n[c * 2] = 0.5 - u * 0.46 * h), (n[c * 2 + 1] = 0.62 - f * 0.95));
  }
  return (
    l.setAttribute("uv", new ae(n, 2)),
    l.setAttribute("aB", new ae(o, 3)),
    l.setAttribute("aK", new ae(s, 2)),
    l
  );
}

function Uy(i, t) {
  let e = i * 0.34,
    n = (i + t * 2 - 2 * e) * 0.5,
    o = [];
  class s extends Ai {
    getPoint(c, u = new F()) {
      let f = 2 * Math.PI * e + 4 * n,
        h = (((c % 1) + 1) % 1) * f;
      if (h < 2 * n) return u.set(-n + h, -e, 0);
      if (((h -= 2 * n), h < Math.PI * e)) {
        let p = -Math.PI / 2 + h / e;
        return u.set(n + Math.cos(p) * e, Math.sin(p) * e, 0);
      }
      if (((h -= Math.PI * e), h < 2 * n)) return u.set(n - h, e, 0);
      h -= 2 * n;
      let d = Math.PI / 2 + h / e;
      return u.set(-n + Math.cos(d) * e, Math.sin(d) * e, 0);
    }
  }
  o.push(new Io(new s(), 44, t, 10, !0));
  let a = new On(t * 0.72, t * 0.72, e * 2, 8);
  return (o.push(a), Qf(o.map((l) => l.toNonIndexed())));
}

function Hy() {
  let i = [],
    t = (l, c) => {
      let u = l.index ? l.toNonIndexed() : l;
      (u.deleteAttribute("uv"), c && u.applyMatrix4(c), i.push(u));
    },
    e = new ne();
  (t(new On(0.075, 0.125, 2.1, 14, 6), e.clone().makeTranslation(0, 1.05, 0)),
    t(new yo(0.17, 0.042, 10, 28), e.clone().makeTranslation(0, 2.26, 0)),
    t(new ci(0.115, 12, 8), e.clone().makeTranslation(0, 2.07, 0)));
  let n = new On(0.05, 0.085, 0.92, 12, 4),
    o = n.clone();
  (t(
    n,
    e
      .clone()
      .makeRotationX(Math.PI / 2)
      .premultiply(e.clone().makeTranslation(0, 1.86, 0.48)),
  ),
    t(
      o,
      e
        .clone()
        .makeRotationX(-Math.PI / 2)
        .premultiply(e.clone().makeTranslation(0, 1.86, -0.48)),
    ));
  for (let l of [-0.98, 0.98]) t(new ci(0.085, 12, 8), e.clone().makeTranslation(0, 1.86, l));
  class s extends Ai {
    getPoint(c, u = new F()) {
      let f = K(-0.98, 0.98, c),
        h = 1.12;
      return u.set(Math.sin(f) * h, 1.14 - Math.cos(f) * h, 0);
    }
  }
  let a = new Io(new s(), 40, 0.115, 12, !1);
  {
    let l = a.attributes.position,
      c = new F(),
      u = new s();
    for (let f = 0; f < l.count; f++) {
      let h = Math.floor(f / 13) / 40;
      u.getPoint(h, c);
      let d = K(1.2, 0.42, Math.abs(h - 0.5) * 2);
      l.setXYZ(f, c.x + (l.getX(f) - c.x) * d, c.y + (l.getY(f) - c.y) * d, c.z + (l.getZ(f) - c.z) * d);
    }
    a.computeVertexNormals();
  }
  (t(a), t(new ci(0.17, 14, 10), e.clone().makeTranslation(0, 0.03, 0)));
  for (let l of [-1, 1]) {
    let c = new ro();
    (c.moveTo(0, 0.42),
      c.quadraticCurveTo(0.3, 0.1, 0.25, -0.24),
      c.lineTo(0, -0.12),
      c.lineTo(-0.25, -0.24),
      c.quadraticCurveTo(-0.3, 0.1, 0, 0.42));
    let u = new Ws(c, {
      depth: 0.05,
      bevelEnabled: !0,
      bevelSize: 0.014,
      bevelThickness: 0.014,
      bevelSegments: 2,
      curveSegments: 10,
    });
    u.translate(0, 0, -0.02);
    let f = e.clone().makeRotationY(Math.PI / 2);
    (f.premultiply(e.clone().makeRotationZ(l * -0.62)),
      f.premultiply(e.clone().makeTranslation(l * 0.83, 0.5, 0)),
      t(u, f));
  }
  let r = Qf(i);
  return (
    r.computeVertexNormals(),
    r.setAttribute("uv", new $t(new Float32Array(r.attributes.position.count * 2), 2)),
    r
  );
}

function yv(i) {
  let t = new go(1, 4),
    e = t.attributes.position,
    n = new F(),
    o = ze(i),
    s = Array.from({ length: 9 }, () => new F(o() - 0.5, o() - 0.5, o() - 0.5).normalize()),
    a = s.map(() => K(0.55, 0.95, o()));
  for (let r = 0; r < e.count; r++) {
    n.fromBufferAttribute(e, r).normalize();
    let l = 1;
    (s.forEach((c, u) => {
      let f = n.dot(c);
      f > 0 && (l = Math.min(l, a[u] / f));
    }),
      (l *= 1 + 0.04 * Math.sin(n.x * 9 + n.y * 7) * Math.sin(n.z * 8)),
      e.setXYZ(r, n.x * l, n.y * l * 0.7, n.z * l));
  }
  return (t.computeVertexNormals(), t);
}

function By(i = 10) {
  let t = new Ke(1, 1, 2, i);
  return (t.translate(0, 0.5, 0), t);
}

function Oy() {
  let i = [],
    t = [],
    e = [],
    s = (c) => (c < 0.78 ? 0.17 * Math.pow(Math.sin(Math.PI * Math.pow(c / 0.8, 0.72)), 0.8) + 0.012 : 0.02),
    a = (c, u) => {
      let f = (c / 10) * 0.8,
        h = (u / 8) * Ve,
        d = s(f);
      return [0.5 - f, Math.sin(h) * d, Math.cos(h) * d * 0.42];
    },
    r = (c, u, f) => {
      let h = new F(...c),
        d = new F(...u),
        p = new F(...f),
        x = d.clone().sub(h).cross(p.clone().sub(h)).normalize();
      for (let v of [c, u, f]) (i.push(...v), t.push(x.x, x.y, x.z), e.push(v[0] + 0.5, v[1]));
    };
  for (let c = 0; c < 10; c++)
    for (let u = 0; u < 8; u++) {
      let f = a(c, u),
        h = a(c + 1, u),
        d = a(c + 1, u + 1),
        p = a(c, u + 1);
      (r(f, h, d), r(f, d, p));
    }
  (r([-0.28, 0, 0], [-0.5, 0.15, 0], [-0.43, 0, 0]),
    r([-0.28, 0, 0], [-0.43, 0, 0], [-0.5, -0.15, 0]),
    r([0.12, 0.14, 0], [-0.1, 0.22, 0], [-0.14, 0.1, 0]));
  let l = new Qt();
  return (
    l.setAttribute("position", new ae(i, 3)),
    l.setAttribute("normal", new ae(t, 3)),
    l.setAttribute("uv", new ae(e, 2)),
    l
  );
}

var PA = `precision highp float; precision highp int;
in vec3 position,normal; in vec2 uv;
#ifdef INST
in mat4 instanceMatrix; in vec4 aS;
#endif
#if KIND==0
in vec3 aB; in vec2 aK; out vec3 vB; flat out vec2 vK; out vec3 vL;
#endif
uniform mat4 modelMatrix,viewMatrix,projectionMatrix; uniform float uT,uFlut,uTen,uSL; uniform vec3 uFishC; out vec3 vP,vN; out vec2 vUv; out vec3 vO;
void main(){ vec3 p=position,n=normal; vUv=uv; vO=position; mat4 M=modelMatrix;
#ifdef INST
 M=M*instanceMatrix;
#endif
#if KIND==0
 vB=aB; vK=aK; vL=position; float up=smoothstep(.2,1.04,p.y); p.z+=up*up*(sin(uT*2.3+p.x*2.)*.018+sin(uT*5.1+p.y*6.)*.008)*uFlut; float bw=smoothstep(.45,1.04,p.x); p.y-=bw*bw*.10*uTen; p.z+=bw*uTen*sin(p.y*16.+uT*9.)*.012; p.z*=1.-bw*.25*uTen;
#endif
#if KIND==3
 { float y=p.y; float ph=aS.x*6.28; float w=sin(uT*.9+ph+instanceMatrix[3].x*.6)*.16+sin(uT*.37+ph*2.)*.14+.10; p.x*=(1.-y*.85)*(.6+.4*sin(y*9.+ph)); p.x+=y*y*w*aS.y; p.z+=y*y*sin(uT*.7+ph*1.7)*.16*aS.y+.05*sin(y*8.+ph); n=vec3(0.,0.,1.); }
#endif
#if KIND==4
 { float a=uT*(.10+.012*aS.w)+aS.x*.55; vec3 c=uFishC+vec3(cos(a)*(2.6+aS.y*.8),(aS.z-.5)*1.5+sin(a*1.7+aS.x*9.)*.35,sin(a)*(1.6+aS.y*.6)); c.y=min(c.y,uSL-.75-.3*aS.z); vec3 d=normalize(vec3(-sin(a)*2.6,.35*1.7*cos(a*1.7+aS.x*9.)*.4,cos(a)*1.9)); float sw=sin(uT*(7.+aS.w*3.)+aS.x*40.-p.x*5.)*.07*(.6-p.x); p.z+=sw; vec3 r=normalize(cross(vec3(0,1,0),d)),u=cross(d,r); float sz=.17+.14*aS.w; vec3 q=c+(d*p.x+u*p.y+r*p.z)*sz; vP=q; vN=normalize(d*n.x+u*n.y+r*n.z); gl_Position=projectionMatrix*viewMatrix*vec4(q,1.); return; }
#endif
 vec4 w=M*vec4(p,1.); vP=w.xyz; vN=normalize(mat3(M)*n); gl_Position=projectionMatrix*viewMatrix*w; }`,
  LA =
    `precision highp float; precision highp int; precision highp sampler2D;
layout(location=0) out vec4 o0; layout(location=1) out vec4 o1; in vec3 vP,vN,vO; in vec2 vUv; uniform vec3 uCam; uniform float uSoak,uFlut,uSwamp;
#if KIND==0
in vec3 vB; flat in vec2 vK; in vec3 vL; uniform sampler2D tInk,tPrev; uniform float uPrev;
#endif
` +
    pc +
    u0 +
    `
float sheets(vec3 ro,vec3 rd){ float c=0.; for(int i=0;i<14;i++){ vec3 a=uTri[i*3],e1=uTri[i*3+1]-a,e2=uTri[i*3+2]-a,p=cross(rd,e2); float det=dot(e1,p); if(abs(det)<1e-6) continue; float inv=1./det; vec3 tv=ro-a; float u=dot(tv,p)*inv; if(u<0.||u>1.) continue; vec3 q=cross(tv,e1); float v=dot(rd,q)*inv; if(v<0.||u+v>1.) continue; float t=dot(e2,q)*inv; if(t>.06) c+=smoothstep(.06,.16,t); } return c; }
void main(){ vec3 V=normalize(uCam-vP); vec3 N=normalize(vN); bool face=dot(N,V)>0.; if(!face) N=-N; float sea=H(vP.xz), dep=sea-vP.y; float under=smoothstep(-.01,.02,dep); vec3 col;
 vec3 ab=exp(-vec3(.34,.15,.14)*max(dep,0.)*1.1); float cau=dep>0.?caustic(vP,dep):1.; vec3 sunW=vec3(.85,1.0,.82)*ab*mix(.75,1.4,uOpen); vec3 ambW=mix(vec3(.005,.026,.030),vec3(.040,.130,.135),N.y*.5+.5)*exp(-max(dep,0.)*vec3(.22,.10,.09));
 vec3 ambA=mix(vec3(.075,.095,.105),mix(vec3(.19,.235,.285),vec3(.17,.20,.25),uOpen),N.y*.5+.5);
#if KIND==0
 // paper (the inside of the hull stays dry until it is swamped)
 { bool ins=vK.x<.5?face:(vK.x>1.5?V.y>0.:true); if(ins) under*=clamp(uSwamp*2.5,0.,1.); }
 float fib=textureLod(tN,vUv*vec2(3.1,2.3),0.).z*.5+textureLod(tN,vUv*9.,0.).z*.5; vec3 paper=vec3(.885,.88,.862)*(.95+.08*fib);
 vec2 iu=vUv; float ink=texture(tInk,iu).r; paper*=mix(vec3(1.),vec3(.70,.75,.84),ink*(vK.x>.5&&vK.x<1.5?.85:.22));
 if(uPrev>.001){ vec3 pv=toLin(texture(tPrev,vec2(iu.x,iu.y)).rgb); paper=mix(paper,pv*1.15,uPrev); }
 // creases: along every face edge the fibre is broken and bright on the fold, darker beside it
 vec3 db=fwidth(vB); vec3 e3=vB/max(db,1e-5); float e=min(vB.x,min(vB.y,vB.z)); float eo=min(e3.x,min(e3.y,e3.z)); float cr=1.-smoothstep(.0,.030,e); paper*=1.-.11*cr; float line=1.-smoothstep(.6,1.7,eo);
 float wl=dep+uSoak*(.55+.9*textureLod(tN,vP.xz*.21+vP.y*.17,0.).x)+(textureLod(tN,vUv*2.3,0.).x-.5)*.14; float wet=smoothstep(-.12,.03,wl); if((vK.x<.5?face:vK.x<1.5)&&uSwamp<.4) wet*=.35;
 paper=mix(paper,paper*vec3(.56,.60,.62),wet*.82);
 float T=mix(.34,.50,wet); float sh=sheets(vP,uSun); if(vK.x<.5) sh=min(sh,1.); float through=pow(.70,sh);
 float nl=dot(N,uSun); vec3 sunA=uSunC*through; vec3 airc=paper*(sunA*max(nl,0.)*.85+sunA*max(-nl,0.)*T*mix(vec3(.80,.81,.80),vec3(1.06,.85,.62),uOpen)*1.25);
 // ambient with the folds closing it off
 float cav=vK.x>.5&&vK.x<1.5?smoothstep(-.05,.42,vL.y):mix(.62,1.,smoothstep(-.3,.25,vL.y)); airc+=paper*ambA*cav; { vec3 kd=normalize(vec3(-.55,.55,.62)); airc+=paper*vec3(.33,.37,.42)*pow(max(dot(N,kd)*.6+.4,0.),2.2)*cav*mix(1.,.55,uOpen); } airc+=paper*vec3(.030,.052,.050)*(1.-N.y)*.8; airc+=line*vec3(.10)*dot(airc,vec3(.33))*2.;
 float gl=wet*pow(max(dot(reflect(-V,N),vec3(0.,.8,.0)+uSun*.6),0.),10.)*.12; airc+=gl*vec3(.8,.85,.9);
 float nw=dot(N,uSunW), shw=pow(.5,sheets(vP,uSunW)); vec3 wc=paper*1.1*(sunW*shw*(max(nw,0.)*.75+max(-nw,0.)*.55+.12)*mix(.65,cau,.72)+ambW*1.35);
 col=mix(airc,wc,under);
#elif KIND==1
 float n1=textureLod(tN,vO.xy*1.1+vO.z*.7,1.).x, n2=textureLod(tN,vO.zy*4.3+vO.x*2.,0.).x; float rust=smoothstep(.42,.62,n1*.6+n2*.45); vec3 alb=mix(vec3(.030,.032,.034),vec3(.085,.040,.022),rust); alb=mix(alb,vec3(.10,.115,.08),smoothstep(.45,.75,n2)*.4); vec3 bn=normalize(N+(vec3(n2,n1,textureLod(tN,vO.xz*5.,0.).x)-.5)*.55);
 float nw=max(dot(bn,uSunW),0.); vec3 hv=normalize(uSunW+V); float sp=pow(max(dot(bn,hv),0.),28.)*mix(.9,.25,rust); float fr=pow(1.-max(dot(bn,V),0.),4.);
 vec3 wc=alb*(sunW*nw*mix(.5,cau,.8)*1.5+ambW*.9)+sunW*sp*cau*.40+fr*waterFog(reflect(-V,bn),dep)*.5; float nl=max(dot(bn,uSun),0.); vec3 ha=normalize(uSun+V); vec3 ac=alb*(uSunC*nl+ambA)+uSunC*pow(max(dot(bn,ha),0.),60.)*.18+fr*ambA*1.3+ambA*.045; col=mix(ac,wc,under); float ao=smoothstep(-.05,.35,vP.y); col*=mix(.35,1.,ao);
#elif KIND==2
 float n1=textureLod(tN,vO.xz*.7+vO.y*.4,0.).x,n2=textureLod(tN,vO.xy*2.1,0.).x; vec3 bn=normalize(N+(vec3(n2,n1,n2*n1*2.)-.5)*.8); vec3 alb=mix(vec3(.055,.060,.052),vec3(.12,.14,.085),n1*smoothstep(.0,.8,N.y)); col=alb*(sunW*max(dot(bn,uSunW),0.)*mix(.4,cau,.85)*1.5+ambW*1.9)*mix(.4,1.,smoothstep(0.,.3,vP.y));
#elif KIND==3
 vec3 alb=mix(vec3(.020,.050,.018),vec3(.10,.15,.035),vO.y); float tr=.55+.45*abs(dot(N,uSunW)); col=alb*(sunW*tr*mix(.5,cau,.7)*1.9+ambW*2.2);
#elif KIND==4
 float b=smoothstep(-.35,.5,N.y); vec3 alb=mix(vec3(.55,.60,.60),vec3(.045,.085,.095),b); float sp=pow(max(dot(normalize(uSunW+V),N),0.),24.); col=alb*(sunW*max(dot(N,uSunW),0.)*cau*1.1+ambW*1.8)+sunW*sp*.9*cau;
#endif
 o0=vec4(min(max(col,0.),vec3(60.)),1.); o1=vec4(length(uCam-vP),0.,0.,1.); }`;

function Tr(i, t, e = !1) {
  return new ce({
    vertexShader: PA,
    fragmentShader: LA,
    glslVersion: re,
    uniforms: t,
    defines: e ? { KIND: i, INST: 1 } : { KIND: i },
    side: oe,
  });
}

function Vy() {
  let i = document.createElement("canvas");
  ((i.width = 1024), (i.height = 576));
  let t = i.getContext("2d");
  ((t.fillStyle = "#000"),
    t.fillRect(0, 0, 1024, 576),
    (t.strokeStyle = t.fillStyle = "#fff"),
    (t.lineWidth = 5),
    t.beginPath(),
    t.moveTo(150, 70),
    t.lineTo(150, 490),
    t.lineTo(900, 490),
    t.stroke(),
    (t.globalAlpha = 0.75),
    [38, 62, 96, 140, 196, 270, 360].forEach((e, n) => t.fillRect(200 + n * 98, 487 - e, 56, e)),
    (t.globalAlpha = 1),
    (t.lineWidth = 7),
    t.beginPath());
  for (let e = 0; e <= 60; e++) {
    let n = 170 + e * 11.8,
      o = 470 - 30 * Math.exp((e / 60) * 2.55);
    e ? t.lineTo(n, o) : t.moveTo(n, o);
  }
  (t.stroke(), (t.globalAlpha = 0.35), (t.lineWidth = 2));
  for (let e = 1; e < 5; e++)
    (t.beginPath(), t.moveTo(150, 490 - e * 90), t.lineTo(900, 490 - e * 90), t.stroke());
  return i;
}

var Gy = new Ke(1, 1);

function zA(i, t) {
  let e = new Oe();
  ((e.index = Gy.index), e.setAttribute("position", Gy.attributes.position));
  let n = ze(t),
    o = new Float32Array(i * 4),
    s = new Float32Array(i * 4);
  for (let a = 0; a < i * 4; a++) ((o[a] = n()), (s[a] = n()));
  return (
    e.setAttribute("aA", new Ue(o, 4)),
    e.setAttribute("aC", new Ue(s, 4)),
    (e.instanceCount = i),
    (e.boundingSphere = new Be(new F(), 1e6)),
    e
  );
}

var Xy =
    "precision highp float; in vec3 position; in vec4 aA,aC; uniform mat4 viewMatrix,projectionMatrix; uniform vec3 uCam,uP,uDir; uniform float uSea; uniform float uTau,uPow,uLoop,uKind,uT,uWide; out vec2 vQ; out float vA; out float vK; out vec2 vS;",
  th =
    Xy +
    `
void main(){ float kind=step(aC.w,.07)*uKind; float T=1.15+aC.x*.9; float tau=uLoop>.5?mod(uT*(.7+.3*aC.y)+aA.w*T,T):uTau-aA.w*.16; if(tau<=0.||tau>T*1.5){ gl_Position=vec4(2.,2.,2.,1.); return; }
 float jet=floor(aA.x*23.), jh=fract(sin(jet*91.7+uWide*3.)*437.5); float an=(jet+(aC.y-.5)*(.9+kind))/23.*6.2831853, up=.22+.78*sqrt(aA.y); float js=.45+.75*jh; vec3 v=vec3(cos(an)*(.45+.95*jh)*uWide,1.0+3.4*js*(.5+.5*aA.z),sin(an)*(.45+.95*jh)*uWide*.75)*uPow*up+(vec3(aC.x,aC.z,aA.z)-.5)*.5*uPow+uDir*(.4+aC.z); float dr=1.1+kind*1.6; vec3 p0=uP+vec3(cos(an),0.,sin(an)*.5)*(.15+.5*aC.y)*min(uWide,1.); float ex=(1.-exp(-dr*tau))/dr; vec3 p=p0+v*ex+vec3(0.,-1.,0.)*(3.6*(1.-kind*.75))*tau*tau; vec3 vel=v*exp(-dr*tau)-vec3(0.,7.2*(1.-kind*.75),0.)*tau;
 vec4 c=viewMatrix*vec4(p,1.); vec3 vv=mat3(viewMatrix)*vel; float sp=length(vv.xy); vec2 d=sp>1e-3?vv.xy/sp:vec2(0,1); float r=kind>.5?(.12+.42*aC.z)*(1.+tau*1.5):(.003+.015*aC.z*aC.z*aC.z)*(1.+uPow*.18); float len=kind>.5?r:r+min(sp*.011,.12); vec2 q=position.xy*2.; c.xy+=(d*q.y*len+vec2(d.y,-d.x)*q.x*r); vQ=q; vK=kind; vS=aC.xy; float f=tau/T; vA=smoothstep(0.,.05,tau)*smoothstep(1.25,.45,f)*(kind>.5?smoothstep(uSea-.1,uSea+.7,p.y):smoothstep(uSea-.12,uSea+.03,p.y))*(kind>.5?.030:1.); gl_Position=projectionMatrix*c; }`,
  eh =
    "precision highp float; in vec2 vQ; in float vA; in float vK; in vec2 vS; out vec4 o; uniform sampler2D tN; uniform vec3 uCol,uGold; uniform float uGain; void main(){ float r=length(vQ); if(r>1.) discard; float a=vK>.5?pow(1.-r,1.4)*smoothstep(.40,.72,texture(tN,vQ*.05+vS*7.).x)*2.2:smoothstep(1.,.35,r); vec3 c=mix(uCol,uGold,vK>.5?.45:.35+.5*smoothstep(.2,-.8,vQ.y+vQ.x)); a*=vA*uGain; a*=vK>.5?1.:.75; o=vec4(c*a,a*.7); }",
  qy =
    Xy +
    `
void main(){ float T=1.6+aC.x*1.8; float tau=uLoop>.5?mod(uT*.6+aA.w*T,T):uTau-aA.w*.5; if(tau<=0.||tau>T){ gl_Position=vec4(2.,2.,2.,1.); return; } float an=aA.x*6.2831853; vec3 v=vec3(cos(an)*aA.z,(aA.y-.35)*1.8,sin(an)*aA.z)*uPow; vec3 p=uP+(aC.xyz-.5)*vec3(1.9,1.2,.8)*uPow*.34+uDir*aC.y*1.2+v*(1.-exp(-2.2*tau))/2.2+vec3(sin(uT*5.+aC.z*40.)*.04,tau*(.35+.7*aC.z),0.); vec4 c=viewMatrix*vec4(p,1.); float r=.010+.045*aC.z*aC.z*aC.z; c.xy+=position.xy*2.*r; vQ=position.xy*2.; vK=aC.z; vA=smoothstep(0.,.08,tau)*smoothstep(T,T*.7,tau)*(p.y>uWide?0.:1.); gl_Position=projectionMatrix*c; }`,
  Wy =
    "precision highp float; in vec2 vQ; in float vA; in float vK; out vec4 o; uniform vec3 uCol,uGold; uniform float uGain; void main(){ float r=length(vQ); if(r>1.) discard; float ring=smoothstep(.45,.95,r)*smoothstep(1.,.93,r); float hi=smoothstep(.35,.0,length(vQ-vec2(-.35,.45))); float a=(ring*.7+hi+.08)*vA*uGain; o=vec4(uCol*a,a*.3); }",
  IA =
    "precision highp float; in vec3 position; in vec4 aA,aC; uniform mat4 viewMatrix,projectionMatrix; uniform vec3 uCam; uniform float uT,uSL; out vec2 vQ; out float vA; void main(){ vec3 B=vec3(11.,7.5,11.); vec3 p=(aA.xyz)*B; p+=vec3(sin(uT*.21+aA.w*30.)*.4+uT*.10,-uT*.045+sin(uT*.3+aC.x*20.)*.2,cos(uT*.17+aC.y*30.)*.4); vec3 c0=uCam+vec3(0.,-1.2,-5.4); p=mod(p-c0+B*.5,B)+c0-B*.5; vec4 c=viewMatrix*vec4(p,1.); float d=-c.z; float r=(.0035+.011*aC.z*aC.z*aC.z)*(1.+.7*smoothstep(2.2,.6,d)); c.xy+=position.xy*2.*r; vQ=position.xy*2.; vA=smoothstep(.5,1.5,d)*exp(-d*.20)*step(p.y,uSL-.15)*step(.02,p.y)*(.25+.75*aC.w); gl_Position=projectionMatrix*c; }",
  NA =
    "precision highp float; in vec2 vQ; in float vA; out vec4 o; void main(){ float r=length(vQ); float a=smoothstep(1.,.0,r); o=vec4(vec3(.42,.72,.62)*a*a*vA,0.); }";

function Yy(i) {
  let t = new ge(),
    e = {},
    n = (o, s, a, r, l, c = {}) => {
      let u = new ce({
          vertexShader: o,
          fragmentShader: s,
          glslVersion: re,
          transparent: !0,
          depthTest: !1,
          depthWrite: !1,
          blending: Ie,
          blendSrc: l ? Zu : Ju,
          blendDst: l ? pe : je,
          blendSrcAlpha: wo,
          blendDstAlpha: pe,
          uniforms: {
            uCam: i.uCam,
            tN: i.tN,
            uT: i.uT,
            uSL: i.uSL,
            uP: { value: new F() },
            uDir: { value: new F() },
            uTau: { value: -1 },
            uSea: { value: 0 },
            uPow: { value: 1 },
            uLoop: { value: 0 },
            uKind: { value: 1 },
            uWide: { value: 1 },
            uGain: { value: 1 },
            uCol: { value: new F(0.42, 0.48, 0.52) },
            uGold: { value: new F(1.7, 1.05, 0.52) },
            ...c,
          },
        }),
        f = new Zt(zA(a, r), u);
      return ((f.frustumCulled = !1), t.add(f), { mesh: f, u: u.uniforms });
    };
  return (
    (e.land = n(th, eh, 900, 2, !1)),
    (e.breach = n(th, eh, 3600, 3, !1)),
    (e.fall = n(th, eh, 1500, 4, !1)),
    (e.bow = n(th, eh, 900, 5, !1)),
    (e.wash = n(th, eh, 600, 6, !1)),
    (e.bub = n(qy, Wy, 700, 7, !0, { uCol: { value: new F(0.5, 0.85, 0.78) } })),
    (e.leak = n(qy, Wy, 160, 8, !0, { uCol: { value: new F(0.45, 0.8, 0.72) } })),
    (e.snow = n(IA, NA, 900, 9, !0)),
    (e.bow.u.uLoop.value = 1),
    (e.wash.u.uLoop.value = 1),
    (e.leak.u.uLoop.value = 1),
    { scene: t, ...e }
  );
}

// ── scene boat · "Anchor" · enterWith: fold ──
var nh = 4.15,
  h0 = 5.65,
  p0 = 0.36,
  _s = 10,
  Es = 4,
  bv = 0.12,
  kn = 1.15,
  Li = new F(0.3, 1.66, -0.1),
  FA = _s * p0 * 0.998,
  d0 = new F(0.9, 0.26, 0).multiplyScalar(f0),
  kA = new F(-0.86, 0.05, 0).multiplyScalar(f0),
  Ky = {
    id: "boat",
    title: "锚",
    enterWith: "fold",
    hud: { color: "#ffffff", font: "monoMed" },
    beats: [
      { dur: 4, delay: 2.2, hold: 2.5, page: "233" },
      { dur: 6, hold: 3.5, page: "610" },
      { dur: 6, hold: 5, page: "1,597" },
    ],
    notes: [
      "我们大多数人就是这样预测的：看看今天，然后假设明天差不多。平静的海，小小的船。",
      "心理学家管这叫锚定。海面是 AI 的进展，它一直在涨。铁链的长度还停在当初我们下判断的那一刻，于是它把我们拖下水。",
      "你没法及时把链子放得更长。你只能松手。",
    ],
    create(i) {
      let { gfx: t, view: e } = i,
        n = (Q = 0, Lt = 0, yt = 0) => new F(Q, Lt, yt),
        o = new l0(),
        s = new c0(_s, p0),
        a = ze(77),
        r = t.target({ w: 256, h: 256, wrap: an, mips: !0 }),
        l = t.target({ w: 512, h: 512, wrap: an, mips: !0 }),
        c = t.target({ w: 1024, h: 384, wrap: an, mips: !0 }),
        u = t.target({ w: 512, h: 512, wrap: an, mips: !0 }),
        f = t.target({ w: 1024, h: 1024, wrap: an, mips: !0, type: $e });
      ((c.texture.wrapT = ei), (f.texture.anisotropy = 4));
      let h = t.target({ samples: 4, depth: !0, count: 2 });
      h.textures[1].format = ts;
      let d = t.target({ scale: 0.5 }),
        p = t.target({}),
        x = (Q) => ({ value: Q }),
        v = {
          tA: x(r.texture),
          tB: x(l.texture),
          tSky: x(c.texture),
          tCau: x(u.texture),
          tN: x(f.texture),
          uSw0: x(new ie()),
          uSw1: x(new ie()),
          uSw2: x(new ie()),
          uSL: x(nh),
          uTop: x(0.5),
          uOpen: x(0),
          uT: x(0),
          uSun: x(n(-0.15, 0.062, -1).normalize()),
          uSunW: x(n(-0.3, 1, -0.5).normalize()),
          uSunC: x(n(2.4, 1.5, 0.75)),
          uCalm: x(new ie(0, 0, 0.3, 5)),
          uBamp: x(0.6),
          uFoam: x(0.5),
          uLow: x(0),
          uTri: x(Array.from({ length: 48 }, () => n())),
          uBoatS: x(new ie(0, 0, 0, 2.4)),
          uCam: x(n()),
          uF: x(n()),
          uR: x(n()),
          uU: x(n()),
          uTan: x(new Nt()),
          uLens: x(1.2),
          uMen: x(0.03),
          tO: x(h.textures[0]),
          tD: x(h.textures[1]),
          tS: x(d.texture),
          uBoatInv: x(new ne()),
          uDeep: x(0),
          uSwamp: x(0),
          uSplash: x(0),
          uQuiet: x(0),
          uSpray: x(0),
          uRing: x(new ie(Li.x, Li.z, 0, 0)),
          uQ: x(1),
          uSoak: x(0),
          uFlut: x(1),
          uTen: x(0),
          tInk: x(null),
          tPrev: x(null),
          uPrev: x(0),
          uFishC: x(n(0.6, 2.6, -1.2)),
        },
        m = t.pass(Ey, { uW: x(Array.from({ length: 28 }, () => new ie())) }),
        g = t.pass(_y, { uW: x(Array.from({ length: 34 }, () => new ie())) }),
        b = t.pass(Ty),
        y = t.pass(Ry, v),
        S = t.pass(Py, v),
        M = t.pass(Ly, v),
        w = new ce({
          vertexShader: zy,
          fragmentShader: Iy,
          glslVersion: re,
          uniforms: { tB: v.tB, uFocus: x(0.3) },
          blending: Ie,
          blendSrc: pe,
          blendDst: pe,
          depthTest: !1,
          depthWrite: !1,
          side: oe,
        }),
        E = new ge(),
        T = new In();
      {
        let Lt = [],
          yt = [];
        for (let _t = 0; _t <= 190; _t++)
          for (let Yt = 0; Yt <= 190; Yt++) Lt.push(-0.16 + (1.32 * Yt) / 190, -0.16 + (1.32 * _t) / 190);
        for (let _t = 0; _t < 190; _t++)
          for (let Yt = 0; Yt < 190; Yt++) {
            let jt = _t * 191 + Yt;
            yt.push(jt, jt + 1, jt + 190 + 1, jt + 1, jt + 190 + 2, jt + 190 + 1);
          }
        let It = new Qt();
        (It.setAttribute("position", new ae(Lt, 2)), It.setIndex(yt), (It.boundingSphere = new Be(n(), 1e6)));
        let St = new Zt(It, w);
        ((St.frustumCulled = !1), E.add(St));
      }
      let _ = new ge(),
        R = new Ye(40, 1, 0.12, 120),
        L = new Hn(Vy());
      ((L.generateMipmaps = !0),
        (L.minFilter = Pn),
        (L.anisotropy = 8),
        (v.tInk.value = L),
        (v.tPrev.value = L));
      let k = new Zt(Dy(9), Tr(0, v));
      ((k.matrixAutoUpdate = !1), (k.frustumCulled = !1), _.add(k));
      let P = (Q, Lt, yt) => {
          let It = ze(yt),
            St = new Float32Array(Lt * 4);
          for (let _t = 0; _t < Lt * 4; _t++) St[_t] = It();
          return (Q.setAttribute("aS", new Ue(St, 4)), Q);
        },
        C = new Hi(P(Uy(p0, 0.04), _s + 1, 1), Tr(1, v, !0), _s + 1);
      ((C.frustumCulled = !1), _.add(C));
      let A = new Zt(Hy(), Tr(1, v));
      ((A.frustumCulled = !1), _.add(A));
      {
        let Q = new Cn(-0.1, 0.42, -0.5, "YXZ");
        A.rotation.copy(Q);
        let Lt = n(0, 2.34, 0).applyEuler(Q),
          yt = 0.94;
        (A.scale.setScalar(yt), A.position.copy(Li).addScaledVector(Lt, -yt));
      }
      let N = ze(12),
        G = new ne(),
        B = new qe(),
        ot = new Cn(),
        ut = n(),
        lt = n();
      {
        let Q = [yv(3), yv(8)];
        [
          [-3.4, -2.6, 0.9, 0],
          [-4.3, -1.4, 0.55, 1],
          [3.9, -2.8, 1.1, 1],
          [5, -1.2, 0.6, 0],
          [2.7, 1.5, 0.32, 0],
          [-1.9, 2.3, 0.26, 1],
          [0.4, -5.2, 1.4, 0],
          [-6.4, -5.5, 1.8, 1],
          [7.4, -6, 2, 0],
          [-2.2, -1.1, 0.22, 1],
        ].forEach(([Lt, yt, It, St]) => {
          let _t = new Zt(Q[St], Tr(2, v));
          (_t.position.set(Lt, -0.12 * It, yt),
            (_t.rotation.y = Lt * 2.1),
            _t.scale.set(It, It * 0.8, It),
            (_t.frustumCulled = !1),
            _.add(_t));
        });
      }
      let Z = 240,
        H = new Hi(P(By(9), Z, 4), Tr(3, v, !0), Z);
      {
        let Q = [
          [-3.3, -1.7],
          [-4, -2.2],
          [3.5, -2],
          [4.4, -1.6],
          [2.6, 1.8],
          [-2.1, 2.5],
          [-5.5, -4],
          [6, -5],
          [-1.4, -3.6],
          [5.6, 0.4],
        ];
        for (let Lt = 0; Lt < Z; Lt++) {
          let yt = Q[Lt % Q.length],
            It = Math.sqrt(N()) * 0.75,
            St = N() * Ve;
          (G.compose(
            ut.set(yt[0] + Math.cos(St) * It, -0.05, yt[1] + Math.sin(St) * It * 0.6),
            B.setFromEuler(ot.set(0, N() * Ve, (N() - 0.5) * 0.25)),
            lt.set(0.06 + 0.07 * N(), 0.5 + N() * N() * 1.5, 1),
          ),
            H.setMatrixAt(Lt, G));
        }
      }
      ((H.frustumCulled = !1), _.add(H));
      let Y = 46,
        q = new Hi(P(Oy(), Y, 6), Tr(4, v, !0), Y);
      for (let Q = 0; Q < Y; Q++) q.setMatrixAt(Q, G.identity());
      ((q.frustumCulled = !1), _.add(q));
      let st = Yy(v),
        ct = i.overlay(),
        V = (Q, Lt) => i.text(Q, { font: "display", color: "#ffffff", ...Lt }),
        ft = V(
          "直觉总以为\n明天还是今天这样。",
          { x: 120, y: 208, size: 80, leading: 1.2 },
        ),
        nt = V("这就是锚。", { x: 120, y: 640, size: 82 }),
        Mt = V("松手。", { x: 120, y: 244, size: 164, valign: "middle" }),
        Et = new i.SelectBox({ handle: 11, line: 3.4, fill: 0.1 });
      ct.add(ft, nt, Mt, Et);
      let at = 99,
        rt = 0,
        U = 0,
        j = !1,
        J = -1,
        Pt = !1,
        $ = 0,
        tt = n(),
        W = new qe(),
        D = n(),
        z = n(),
        pt = n(),
        ht = new qe(),
        gt = new qe(),
        dt = new qe(),
        Kt = new qe(),
        Ot = new ne(),
        Ut = n(),
        O = n(),
        I = n(),
        et = n(),
        Tt = n(),
        vt = n(),
        zt = { x: 0 },
        Ft = n(0, 1, 0),
        wt = n(0, 0, 1),
        mt = 0,
        Dt = 0;
      function it(Q, Lt, yt, It, St) {
        let _t = Math.cos(yt),
          Yt = -Math.sin(yt),
          jt = 1.15,
          le = 0.55,
          ye = o.h(Q + _t * jt, Lt + Yt * jt),
          Jt = o.h(Q - _t * jt, Lt - Yt * jt),
          te = o.h(Q - Yt * le, Lt + _t * le),
          se = o.h(Q + Yt * le, Lt - _t * le);
        It.set(Q, (ye + Jt) * 0.5 + 0.1, Lt);
        let ee = Math.atan2(ye - Jt, 2 * jt) * 0.85,
          me = Math.atan2(te - se, 2 * le) * 0.7;
        return (
          St.setFromEuler(ot.set(me * -1, 0, ee, "YZX")),
          Kt.setFromAxisAngle(Ft, yt),
          St.premultiply(Kt),
          (ye + Jt) * 0.5
        );
      }
      function Rt(Q) {
        let Lt = Q.at(2),
          yt = Lt - kn,
          It = kt(Ct(yt / 0.9)),
          St =
            K(Math.PI, Math.PI * 0.735, Q.k(2, kn + 0.5, 5.2, Fn)) + Math.sin(Q.t * 0.23) * 0.05 * (1 + It),
          _t = -0.72,
          Yt = -0.69,
          jt = 2.15 + Math.sin(Q.t * 0.31) * 0.07,
          le = Math.sin(Q.t * 0.27) * 0.08,
          ye = jt + _t * U,
          Jt = le + Yt * U;
        (it(ye, Jt, St, tt, ht), W.copy(ht), D.copy(d0).applyQuaternion(W).add(tt));
        let te = D.distanceTo(Li),
          se = FA + It * It * 60 + U * 3,
          ee = te - se;
        if (((mt = Ct(ee / 0.9) * (1 - It)), ee > 0)) {
          (et
            .copy(D)
            .sub(Li)
            .multiplyScalar(se / te)
            .add(Li),
            Tt.copy(kA).sub(d0));
          let me = Tt.length(),
            be = Math.atan2(Tt.y, -Tt.x),
            Ae = o.h(tt.x + 1.4, tt.z) * 0.7 + o.sl * 0.3 + 0.16 + 0.62 * mt,
            ln = Ct((Ae - et.y) / me, -0.4, 0.86),
            mn = Math.asin(ln) - be;
          (gt.setFromEuler(
            ot.set(Math.sin(Q.t * 1.3) * 0.05 * mt + Si(Q.t * 2.1) * 0.03 * mt, 0, -mn, "YZX"),
          ),
            Kt.setFromAxisAngle(Ft, St),
            gt.premultiply(Kt));
          let un = kt(Ct(ee / 0.35));
          (W.slerp(gt, un), tt.copy(d0).applyQuaternion(W).negate().add(et), D.copy(et));
        }
        if (yt > 0) {
          let me = Ct((yt - 0.04) / 1.8),
            be = Math.sin(Math.PI * Math.pow(me, 0.66));
          tt.y += be * 2.2;
          let Ae =
            be * 0.75 * Math.cos(me * 2.9) +
            (me >= 1 ? Math.sin((yt - 1.84) * 5) * 0.16 * Math.exp(-(yt - 1.84) * 1.7) : 0);
          (dt.setFromAxisAngle(wt, Ae),
            W.multiply(dt),
            (tt.y += me >= 1 ? -Math.sin((yt - 1.84) * 5.2) * 0.24 * Math.exp(-(yt - 1.84) * 1.9) : 0));
        }
        if (at < 6) {
          let me = Math.max(0, at);
          ((tt.y += -Math.sin(me * 4.6) * 0.34 * Math.exp(-me * 1.4)),
            dt.setFromAxisAngle(wt, Math.sin(me * 3.9 + 0.6) * 0.13 * Math.exp(-me * 1.1)),
            W.multiply(dt),
            at <= 0 && (tt.y += 0));
        }
        (D.copy(d0).applyQuaternion(W).add(tt), Ot.compose(tt, W, ut.setScalar(f0)));
      }
      function xt(Q) {
        let Lt = Q.k(1, 0.1, 3.6, Fn),
          yt = Q.k(1, 1.2, 6, Fn),
          It = ((Ae) => bt.out3(Ae) * kt(Ae * 5))(Q.k(2, kn, kn + 3.6, bt.lin)),
          St = Q.k(2, 0, 1, bt.io3) * (1 - Q.k(2, kn, 2.2, Fn)),
          _t = Q.t,
          Yt = o.sl,
          jt = o.swell(tt.x, tt.z);
        (z.set(0.55 + Math.sin(_t * 0.11) * 0.25, nh + 1 + Math.sin(_t * 0.23) * 0.05, 10.2),
          pt.set(0.15, nh + 1.42, 0));
        let le = 32,
          ye = 1.2;
        (et.set(-1 + Math.sin(_t * 0.16) * 0.1, Yt + K(0.18, 0.06, yt) + Math.sin(_t * 0.5) * 0.015, 7.9),
          Tt.set(-1.15, Yt - K(1.5, 1.62, yt), 0),
          z.lerp(et, Lt),
          pt.lerp(Tt, Lt),
          (le = K(le, 55, Lt)),
          St > 0 &&
            (vt.set((s.p[Es * 3] + s.p[Es * 3 + 3]) * 0.5, (s.p[Es * 3 + 1] + s.p[Es * 3 + 4]) * 0.5, 0),
            et.copy(z).lerp(vt, 0.26),
            (et.y = z.y),
            z.lerp(et, St),
            Tt.copy(pt).lerp(vt, 0.1),
            (Tt.y = z.y - (z.y - pt.y) * 0.74),
            pt.lerp(Tt, St),
            (le -= St * 3)));
        let Jt = Q.at(2) - kn;
        if ((Jt > 0 && (pt.y += Math.max(0, tt.y - Yt) * 0.62 * kt(Ct(Jt / 0.35))), It > 0)) {
          let Ae = Math.sin(_t * 0.13) * 0.5,
            ln = Math.max(0, tt.y - Yt - jt) * 0.55;
          (et.set(
            tt.x - 0.9 + Ae,
            Yt + K(jt, o.swell(tt.x, tt.z + 6.8), 0.35) + 1.65 + ln * 0.5 + Math.sin(_t * 0.19) * 0.25,
            tt.z + 7.3 + Math.sin(_t * 0.09) * 0.4,
          ),
            Tt.set(tt.x - 2.05 + Ae * 0.4, Yt + jt + 1.9 + ln, tt.z));
          {
            let Re = Math.hypot(et.x - tt.x, et.z - tt.z),
              Ne = o.h(et.x, et.z) + 0.95;
            et.y < Ne && (et.y = Ne);
            let Ge = et.y;
            for (let At of [0.2, 0.4, 0.6, 0.78]) {
              let qt = o.h(K(et.x, tt.x, At), K(et.z, tt.z, At)) + 0.3,
                Ht = (qt - (tt.y + 0.25) * At) / (1 - At);
              Ht > Ge && (Ge = Ht);
            }
            ((Dt += (Math.min(Ge - et.y, 5) - Dt) * (Q.dt > 0 ? 1 - Math.exp(-3.5 * Q.dt) : 0)),
              (et.y += Dt));
            let yn = Math.atan2(tt.y + 0.35 - et.y, Re),
              si = yn + 0.1,
              gi = yn + 0.235,
              no = (si + gi) / 2,
              as = (gi - si) / 2,
              Ls = (0.025 + ln * 0.12 - no) / as;
            Ls = Ls / Math.cbrt(1 + Math.abs(Ls) ** 3);
            let X = no + as * Ls;
            Tt.y = et.y + Math.tan(X) * Math.hypot(et.x - Tt.x, et.z - Tt.z);
          }
          (z.lerp(et, It), pt.lerp(Tt, It), (le = K(le, 44, It)));
          let mn = o.h(z.x, z.z) + 0.75,
            un = kt(Ct((It - 0.35) * 2.2));
          z.y < mn && (z.y = K(z.y, mn, un));
        }
        let te = t.aspect,
          se = te < 16 / 9 ? 16 / 9 / te : 1;
        ((R.fov = (2 * Math.atan(Math.tan((le * Math.PI) / 360) * se) * 180) / Math.PI),
          (R.aspect = te),
          (z.x += Q.mouse.x * 0.45),
          (z.y += Q.mouse.y * K(0.22, 0.02, Lt * (1 - It))),
          R.position.copy(z),
          R.up.set(Math.sin(_t * 0.29) * 0.012 + Math.sin(_t * 0.41) * 0.03 * It, 1, 0).normalize(),
          R.lookAt(pt),
          R.updateProjectionMatrix(),
          R.updateMatrixWorld(),
          R.matrixWorldInverse.copy(R.matrixWorld).invert());
        let ee = R.matrixWorld.elements,
          me = Math.tan((R.fov * Math.PI) / 360),
          be = me * te;
        (v.uCam.value.copy(z),
          v.uR.value.set(ee[0], ee[1], ee[2]).multiplyScalar(be),
          v.uU.value.set(ee[4], ee[5], ee[6]).multiplyScalar(me),
          v.uF.value.set(-ee[8], -ee[9], -ee[10]),
          v.uTan.value.set(be, me),
          (v.uLens.value = ye),
          (v.uMen.value = 0.022 + 0.01 * me),
          v.uCalm.value.set(z.x, z.z - 1, K(0.5, K(0.34, 1, It), Math.max(Lt, 0)), 6.5));
      }
      function Wt(Q) {
        let Lt = Q.k(1, 0.6, 5.6, Fn),
          yt = Q.k(2, kn + 0.1, 4.4, Fn);
        o.sl = K(nh, h0, Lt);
        let It = 4.1 * yt;
        o.set(Q.t, K(0.42, K(0.74, 0.95, yt), Lt), K(0.55, K(0.9, 1, yt), Lt), It, rt);
        for (let St = 0; St < 28; St++) m.u.uW.value[St].fromArray(o.ua, St * 4);
        for (let St = 0; St < 34; St++) g.u.uW.value[St].fromArray(o.ub, St * 4);
        (v.uSw0.value.fromArray(o.sw, 0),
          v.uSw1.value.fromArray(o.sw, 4),
          v.uSw2.value.fromArray(o.sw, 8),
          (v.uSL.value = o.sl),
          (v.uTop.value = o.top),
          (v.uT.value = Q.t),
          (v.uOpen.value = Q.k(2, 1.4, 5.8, Fn)),
          (v.uBamp.value = K(K(0.75, 1, Lt), 1.3, yt)));
        {
          let St = v.uOpen.value;
          v.uSunC.value.set(K(1.7, 3.2, St), K(1.22, 1.62, St), K(0.74, 0.62, St));
        }
        ((v.uFoam.value = K(0.28, K(0.5, 0.52, yt), Lt)),
          (v.uLow.value = It * -0.1),
          (v.uQuiet.value = K(0, K(0.5, 0.35, yt), Lt)));
      }
      function Xt(Q) {
        let Lt = s.p,
          yt = Math.exp(-(Q.t % 2.7) * 1.6) * mt,
          It = 0.03 * yt + 0.006 * mt,
          St = ut,
          _t = Ut,
          Yt = O;
        for (let jt = 0; jt < _s; jt++) {
          let le = jt * 3,
            ye = (be) =>
              Math.sin(((Math.PI * be) / _s) * 3) * Math.sin(Q.t * 46 + be) * It +
              Math.sin((Math.PI * be) / _s) * Math.sin(Q.t * 31) * It * 0.6,
            Jt = ye(jt),
            te = ye(jt + 1);
          (vt.set(Lt[le], Lt[le + 1], Lt[le + 2]),
            lt.set(Lt[le + 3], Lt[le + 4], Lt[le + 5]),
            (vt.x += Jt),
            (vt.z += Jt * 0.5),
            (lt.x += te),
            (lt.z += te * 0.5),
            St.copy(lt).sub(vt).normalize(),
            Yt.set(0, 0, 1),
            Math.abs(St.z) > 0.9 && Yt.set(1, 0, 0),
            _t.copy(Yt).cross(St).normalize(),
            Yt.copy(St).cross(_t));
          let se =
              ((jt % 2 ? 1 : 0) * Math.PI) / 2 +
              0.55 +
              Math.sin(jt * 2.3) * 0.09 +
              Math.sin(Q.t * 1.1 + jt) * 0.03,
            ee = Math.cos(se),
            me = Math.sin(se);
          (I.copy(_t).multiplyScalar(ee).addScaledVector(Yt, me),
            Yt.multiplyScalar(ee).addScaledVector(_t, -me),
            G.makeBasis(St, I, Yt),
            G.setPosition((vt.x + lt.x) / 2, (vt.y + lt.y) / 2, (vt.z + lt.z) / 2),
            jt === Es && j && G.makeScale(0, 0, 0),
            C.setMatrixAt(jt, G));
        }
        (G.makeScale(0, 0, 0), C.setMatrixAt(_s, G), (C.instanceMatrix.needsUpdate = !0));
      }
      function Vt(Q, Lt) {
        let yt = Q.at(2);
        (yt > 0 ? ((rt += Lt), (U += Lt * 4.6 * kt(Ct((yt - kn - 0.4) / 3)))) : ((rt = 0), (U = 0)),
          yt < 6 && Q.beat < 2 && (U *= Math.exp(-Lt * 3.5)),
          Wt(Q),
          Rt(Q));
        let It = yt >= kn;
        (It !== j && ((j = It), (s.cut = j ? Es : -1), j && Lt > 0 && s.whip(a)),
          s.step(Lt, [D.x, D.y, D.z], [Li.x, Li.y, Li.z], o.sl + o.swell(tt.x, tt.z)));
      }
      return {
        init() {
          (b.render(f),
            m.render(r),
            g.render(l),
            t.draw(E, T, u, { color: 0, alpha: 0 }),
            y.render(c),
            t.draw(_, R, h, { color: 0, alpha: 0 }),
            S.render(d),
            M.render(p),
            t.draw(st.scene, R, p, { clear: !1 }));
        },
        enter(Q) {
          ((j = !1),
            (s.cut = -1),
            (rt = 0),
            (U = 0),
            (Dt = 0),
            (at = Q.beat > 0 || Q.p[0] > 0 ? 99 : -1),
            (J = -1),
            (o.sl = nh),
            Wt(Q),
            Rt(Q));
          let Lt = [D.x, D.y, D.z];
          if ((s.lay(Lt, [Li.x, Li.y, Li.z]), Q.p[2] >= 1)) {
            ((rt = 14), (U = 40), (j = !0), (s.cut = Es), Wt(Q), Rt(Q));
            for (let yt = 0; yt <= Es; yt++) {
              let It = yt * 3;
              ((s.p[It] = s.q[It] = D.x),
                (s.p[It + 1] = s.q[It + 1] = D.y - yt * p0),
                (s.p[It + 2] = s.q[It + 2] = D.z));
            }
            for (let yt = Es + 1; yt <= _s; yt++) {
              let It = yt * 3;
              ((s.p[It] = s.q[It] = Li.x + (_s - yt) * 0.2),
                (s.p[It + 1] = s.q[It + 1] = 0.1),
                (s.p[It + 2] = s.q[It + 2] = Li.z));
            }
          }
          for (let yt = 0; yt < 90; yt++) s.step(1 / 60, [D.x, D.y, D.z], [Li.x, Li.y, Li.z], o.sl);
        },
        update(Q) {
          Q.enter < 0.94
            ? (at = -1)
            : at < 0
              ? ((at = 0), Q.dt > 0 && i.sfx("wave", { gain: 0.7, pitch: 1.3 }))
              : at < 90 && (at += Q.dt);
          let Lt = Q.at(2),
            yt = $;
          (Vt(Q, Q.dt),
            xt(Q),
            Xt(Q),
            k.matrix.copy(Ot),
            k.matrixWorld.copy(Ot),
            v.uBoatInv.value.copy(Ot).invert());
          for (let se = 0; se < 14; se++)
            for (let ee = 0; ee < 3; ee++) v.uTri.value[se * 3 + ee].set(...ky[se][ee]).applyMatrix4(Ot);
          let It = at >= 0;
          ((k.visible = C.visible = It),
            v.uBoatS.value.set(tt.x, tt.y + 0.6, tt.z, It ? 2.5 : 0),
            It || v.uBoatInv.value.setPosition(0, 99, 0));
          let St = Q.k(1, 0.6, 5.6, Fn),
            _t = Q.k(2, kn, kn + 1.2, kt);
          ((v.uSwamp.value = St * (1 - _t)),
            (v.uSoak.value = K(0.1, 0.62, Q.k(1, 2, 6)) * (1 - 0.55 * Q.k(2, 2.4, 6))),
            (v.uTen.value = mt),
            (v.uFlut.value = 1 + _t * 0.8),
            v.uFishC.value.set(-0.6 + Math.sin(Q.t * 0.05) * 1, 3.05 + Math.sin(Q.t * 0.07) * 0.35, -0.9),
            (v.uDeep.value = Q.k(2, kn + 0.2, kn + 2, kt)));
          let Yt = at < 0 ? 0 : at;
          ((v.uSplash.value = Math.max(at < 0 ? 0 : Math.exp(-Yt * 0.9), St * 0.75 * (1 - _t), _t * 0.55)),
            (v.uRing.value.z = Yt * 1.9),
            (v.uRing.value.w = at < 0 ? 0 : 0.55 * Math.exp(-Yt * 0.7)),
            (v.uSpray.value = Q.k(2, 2.6, 4.6, kt)),
            (v.uPrev.value = i.snapshots.tower ? 0.09 : 0),
            i.snapshots.tower && (v.tPrev.value = i.snapshots.tower.texture));
          let jt = Lt - kn,
            le = o.sl + o.swell(tt.x, tt.z);
          for (let se of ["land", "breach", "fall", "bow", "wash"]) st[se].u.uSea.value = le;
          ((st.land.u.uTau.value = at < 0 ? -1 : Yt),
            st.land.u.uP.value.set(2.15, o.sl + 0.05, 0),
            (st.land.u.uPow.value = 1.35),
            (st.land.u.uWide.value = 1.7),
            (st.breach.u.uTau.value = Lt > kn ? jt - 0.22 : -1),
            st.breach.u.uP.value.set(1.9, h0 + 0.05, 0.1),
            (st.breach.u.uPow.value = 3.1),
            (st.breach.u.uWide.value = 1.35),
            (st.fall.u.uTau.value = Lt > kn ? jt - 1.76 : -1),
            jt < 1.9 && st.fall.u.uP.value.set(tt.x, le + 0.1, tt.z),
            (st.fall.u.uPow.value = 1.7),
            (st.fall.u.uWide.value = 1.7),
            vt.set(0.98, 0.05, 0).applyMatrix4(Ot));
          let ye = Q.k(2, 3, 5, kt);
          (st.bow.u.uP.value.set(vt.x, Math.max(vt.y, le) + 0.02, vt.z),
            st.bow.u.uDir.value.set(1.6, 0.1, 1.5),
            (st.bow.u.uPow.value = 0.62),
            (st.bow.u.uGain.value = ye * (0.45 + 0.55 * Ct(0.5 + Math.sin(Q.t * 0.9)))),
            (st.bow.mesh.visible = ye > 0.01),
            (st.bow.u.uWide.value = 0.9));
          let Jt = Q.k(1, 3.4, 5.6, kt) * (1 - Q.k(2, kn, kn + 0.3));
          (st.wash.u.uP.value.set(tt.x - 0.2, o.sl + 0.02, tt.z),
            (st.wash.u.uPow.value = 0.5),
            (st.wash.u.uWide.value = 2.2),
            (st.wash.u.uGain.value = Jt * (0.25 + 0.75 * Ct(0.3 + Math.sin(Q.t * 1.9) * 0.9))),
            (st.wash.mesh.visible = Jt > 0.01),
            (st.bub.u.uTau.value = Lt > kn ? jt + 0.02 : -1),
            st.bub.u.uP.value.set(1.3, h0 - 0.9, 0),
            (st.bub.u.uPow.value = 2.6),
            (st.bub.u.uWide.value = h0 - 0.02),
            st.leak.u.uP.value.set(vt.x, vt.y, vt.z),
            (st.leak.u.uPow.value = 0.5),
            (st.leak.u.uWide.value = o.sl),
            (st.leak.u.uGain.value = St * (1 - _t)),
            (st.leak.mesh.visible = St * (1 - _t) > 0.02),
            ft.show(Q.k(0, 1, 3.2, bt.lin), { style: "rise", by: "word", q: Q.k(1, 0, 1.1, bt.lin) }),
            nt.show(Q.k(1, 2.6, 4.2, bt.lin), {
              style: "rise",
              by: "word",
              q: Q.k(2, kn, kn + 0.42, bt.lin),
            }),
            Mt.show(Q.k(2, 3.2, 4.9, bt.lin), { style: "rise", by: "word", stagger: 0.35 }));
          let te = Q.k(2, bv, bv + 0.34, bt.lin);
          if (te > 0 && Lt < kn) {
            let se = Es * 3,
              ee = [];
            for (let be = 0; be < 2; be++)
              for (let Ae of [-0.13, 0.13])
                for (let ln of [-0.06, 0.06])
                  ee.push(n(s.p[se + be * 3] + Ae, s.p[se + be * 3 + 1] + ln, s.p[se + be * 3 + 2]));
            let me = i.rectOf(ee, R, e);
            Et.set(me.x - 16, me.y - 16, me.w + 32, me.h + 32).appear(te);
          } else Et.alpha(0);
          if (Q.dt > 0 && Q.dir >= 0) {
            let se = (me, be, Ae) => {
              Q.beat === 2 && $ < me && Lt >= me && i.sfx(be, Ae);
            };
            (se(bv, "select", { gain: 0.8 }),
              se(kn, "delete", { gain: 1 }),
              se(kn + 0.04, "snap", { gain: 1 }),
              se(kn + 0.34, "wave", { gain: 1 }),
              se(kn + 0.3, "boom", { gain: 0.8 }),
              se(kn + 1.8, "wave", { gain: 0.7, pitch: 0.85 }));
            let ee = Math.floor(Q.t / 2.7);
            (mt > 0.25 &&
              ee !== J &&
              ((J = ee), i.sfx("creak", { gain: 0.35 + 0.5 * mt, pitch: 0.85 + 0.3 * ((ee * 0.37) % 1) })),
              i.audio.param("water", Ct(0.35 + 0.35 * St + 0.2 * _t)),
              i.audio.param("tension", mt),
              i.audio.param("wind", 0.25 + 0.5 * _t));
          }
          $ = Lt;
        },
        render(Q, Lt) {
          let yt = t.r;
          ((v.uQ.value = K(0.75, 1, Ct((Lt.q - 0.58) / 0.42))),
            m.render(r),
            g.render(l),
            (v.uT.value = Lt.t),
            t.draw(E, T, u, { color: 0, alpha: 0 }),
            y.render(c),
            t.draw(_, R, h, { color: 0, alpha: 0 }),
            (S.u.uTime.value = Lt.t),
            S.render(d),
            M.render(p),
            t.draw(st.scene, R, p, { clear: !1 }));
          let It = v.uOpen.value,
            St = Lt.k(1, 0.1, 3.6, Fn) * (1 - It);
          (t.post(p, Q, {
            exposure: K(1.15, 1.2, St),
            bloom: K(0.28, 0.36, It),
            threshold: 1.25,
            radius: 0.9,
            tone: "agx",
            contrast: K(1.28, 1.36, It),
            saturation: K(1.22, 1.28, It),
            vignette: 0.34,
            grain: 0.03,
            halation: 0.5,
            ca: 0.004,
            lift: [0.004, 0.012, 0.018],
            gain: [1.02, 1, 0.985],
            time: Lt.t,
          }),
            ct.render(Q));
        },
        anchor(Q) {
          let Lt = R;
          (lt.set(-1.04, 0.4, 0).applyMatrix4(Ot).project(Lt),
            vt.set(1.04, 0.4, 0).applyMatrix4(Ot).project(Lt),
            ut.set(0, 0.33, 0).applyMatrix4(Ot).project(Lt));
          let [yt, It] = e.fromClip(ut.x, ut.y),
            [St, _t] = e.fromClip(lt.x, lt.y),
            [Yt, jt] = e.fromClip(vt.x, vt.y);
          return {
            x: yt,
            y: It,
            size: Math.hypot(Yt - St, jt - _t) * 0.97,
            angle: Math.atan2(_t - jt, St - Yt),
          };
        },
      };
    },
  };

var m0 = `precision highp float; precision highp int; in vec2 vP; out vec4 o; uniform float uT,uPx,uK,uV; uniform vec4 uChild; uniform vec3 uMean;
const float PI=3.14159265,TAU=6.28318531;
const vec3 RED=vec3(.937,.255,.161),BLU=vec3(.09,.58,.87),YEL=vec3(1.,.765,.07),MNT=vec3(.58,.86,.74),PNK=vec3(.975,.725,.655),ULT=vec3(.16,.175,.64),BLK=vec3(.085,.078,.07),PAP=vec3(.957,.937,.885),ORG=vec3(1.,.49,.13),GRN=vec3(.05,.47,.36);
float h11(float p){p=fract(p*.1031);p*=p+33.33;p*=p+p;return fract(p);}
float h12(vec2 p){vec3 q=fract(vec3(p.xyx)*.1031);q+=dot(q,q.yzx+33.33);return fract((q.x+q.y)*q.z);}
float vn(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h12(i),h12(i+vec2(1,0)),f.x),mix(h12(i+vec2(0,1)),h12(i+vec2(1,1)),f.x),f.y);}
mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,s,-s,c);}
float bx(vec2 p,vec2 b){vec2 q=abs(p)-b;return length(max(q,0.))+min(max(q.x,q.y),0.);}
float sg(vec2 p,vec2 a,vec2 b){vec2 u=p-a,v=b-a;return length(u-v*clamp(dot(u,v)/dot(v,v),0.,1.));}
float fil(float d){return clamp(.5-d/uPx,0.,1.);}
float fiw(float d){return clamp(.5-d/max(fwidth(d),1e-5),0.,1.);}
void ink(inout vec3 c,vec3 k,float d){c=mix(c,k,fil(d));}
void over(inout vec3 c,vec3 k,float d){c*=mix(vec3(1.),k,fil(d));}
float io(float x){x=clamp(x,0.,1.);return x*x*x*(x*(x*6.-15.)+10.);}
// half disc facing angle a
float half_(vec2 p,float r,float a){p=rot(-a)*p;return max(length(p)-r,-p.x);}
float pie(vec2 p,float r,float a,float w){p=rot(-a)*p;p.y=abs(p.y);vec2 n=vec2(-sin(w),cos(w));return max(length(p)-r,dot(p,n));}
vec2 toChild(vec2 p){return rot(-uChild.w)*(p-uChild.xy)/uChild.z;}
float childD(vec2 p){return bx(rot(-uChild.w)*(p-uChild.xy),vec2(16,9)*uChild.z);}
// the next sheet lies here: hard offset shadow and a paper margin
void bed(inout vec3 c,vec2 p,vec3 sh,float off){ink(c,sh,childD(p-vec2(off,-off))-.16);ink(c,PAP,childD(p)-.16);}
vec3 tooth(vec3 c,vec2 p){float l=log2(uPx*1.7),i=floor(l),f=l-i,s=exp2(-i);float n=mix(vn(p*s),vn(p*s*.5),f)-.5;float m=vn(p*1.3+7.)-.5;return c*(1.+n*.035+m*.02);}
`,
  jy =
    "void main(){vec3 c=poster(vP);c=tooth(c,vP);c=mix(c,uMean,smoothstep(.5,1.7,uPx));o=vec4(clamp(c,0.,1.),1.);}";

var Pa = [
    {
      child: [9.4, -3.62, 0.27, 0],
      mean: [0.86, 0.55, 0.1],
      bleed: 2.6,
      glsl: `
vec3 poster(vec2 p){ vec3 c=YEL; float S=6.8,y0=-6.2,x0=-12.1; float wob=(vn(p*1.1)-.5)*.16+(vn(p*5.)-.5)*.05;
 for(int i=0;i<3;i++){ vec2 q=p-vec2(x0+float(i)*S,y0+S*.5); ink(c,vec3(1.,.69,.03),bx(q,vec2(S*.5-.1))+wob*.6); }
 float u=mod(uT/1.55,4.),fw=step(u,2.),st=fw>.5?u:4.-u,i=min(floor(st),1.),g=fw>.5?st-i:1.-(st-i);
 float x=clamp((g-.12)/.6,0.,1.),e=x*x*(2.2-1.2*x); float b=g>.72?(g-.72)/.28:0.; e-=sin(b*PI*2.)*exp(-b*4.)*.045*step(.001,b); float ang=(fw>.5?e:1.-e)*PI*.5;
 vec2 piv=vec2(x0+(i+.5)*S,y0); vec2 q=rot(ang)*(p-piv)+vec2(S*.5,-S*.5);
 bed(c,p,ORG,.0);
 float sw=(vn(q*1.2+3.)-.5)*.14+(vn(q*6.)-.5)*.05; float d=bx(q,vec2(S*.5))+sw; float sh=max(bx(rot(ang)*(p-piv-vec2(.5,-.0))+vec2(S*.5,-S*.5),vec2(S*.5)),y0-p.y);
 ink(c,RED,d); float st2=vn(q*vec2(.55,7.)+vec2(0.,9.)); ink(c,vec3(.98,.42,.16),max(d+.25,(.83-st2)*.35)); ink(c,vec3(.8,.17,.1),max(d+.1,(.2-(1.-st2))*.0+ (st2-.14)*.35));
 ink(c,BLK,p.y-y0+(vn(p*vec2(.8,1.)+20.)-.5)*.14);
 return c; }`,
    },
    {
      child: [11.05, -4.45, 0.25, 0],
      mean: [0.6, 0.5, 0.62],
      glsl: `
vec3 poster(vec2 p){ vec3 c=PNK; vec2 F=vec2(-1.2,-7.7); float R=10.5,bl=TAU/100.;
 { vec2 q=p-F; float a=atan(q.x,q.y)+uT*.05; float seg=abs(fract(a*50./PI)-.5)*2.; ink(c,ULT,max(abs(length(q)-R)-.05,(seg-.5)*R*.06)); }
 // dealt sheets behind the next one
 vec2 cr=uChild.xy+vec2(16.,-9.)*uChild.z;
 for(int i=5;i>=1;i--){ float fi=float(i); float a=fi*(.2+.06*sin(uT*.9+fi*.45)); vec2 q=rot(a)*(p-cr); vec3 k=i==1?RED:i==2?YEL:i==3?BLU:i==4?PAP:RED; ink(c,k,bx(q+vec2(16.,-9.)*uChild.z,vec2(16,9)*uChild.z)); }
 bed(c,p,ULT,.22);
 // the fan
 vec2 q=p-F; float r=length(q),a=atan(q.x,q.y); float op=max(uK,.035),bw=bl*op,a0=-13.*bl; float idx=floor((a-a0)/bw); float end=(a-a0-26.*bw)*r, beg=(a0-a)*r; float wv=sin(idx*.55-uT*1.6);
 float rr=R+.13*wv*smoothstep(0.,.4,uK); float body=max(max(beg,end),r-rr); vec3 k=mod(idx,2.)<.5?ULT:vec3(.2,.27,.8); ink(c,k,body);
 float ed=(abs(fract((a-a0)/bw)-.5)-.5)*-1.*bw*r; ink(c,PNK,max(max(body,.035-0.*r),(ed-.028)));
 ink(c,YEL,max(body+.0,max(R-.62-r+.12*wv,r-rr+.3)));
 ink(c,RED,r-1.55); ink(c,PAP,half_(q,1.05,uT*.8)); ink(c,ULT,r-.34);
 // the sliver
 vec2 G=vec2(-13.6,-7.7); vec2 s=p-G; float sa=abs(atan(s.x,s.y)),sr=length(s); ink(c,RED,max((sa-.0283)*sr,sr-R)); ink(c,RED,sr-.5); ink(c,PAP,half_(s,.3,-uT*.8));
 return c; }`,
    },
    {
      child: [11.2, -2.9, 0.25, 0],
      mean: [0.5, 0.62, 0.52],
      glsl: `
float gear(vec2 p,float R,float n,float h,float th){ float r=length(p),a=atan(p.y,p.x); float t=clamp(sin(n*(a-th))*1.9,-1.,1.)*h; return (r-R-t)*.62; }
vec3 poster(vec2 p){ vec3 c=MNT; vec2 B=vec2(-8.9,-5.6); float ph=.26; vec2 S=B+10.5*vec2(cos(ph),sin(ph)); float th=-uT*.55; float ts=ph+PI+2.*(ph-th)+PI;
 // conveyor of rollers
 for(int i=0;i<7;i++){ vec2 q=p-vec2(4.2+float(i)*1.95,-6.6); ink(c,BLK,length(q)-.78); ink(c,YEL,half_(q,.6,-uT*2.+float(i)*.7)); }
 ink(c,BLK,bx(p-vec2(11.,-5.62),vec2(8.,.09)));
 // rail
 ink(c,BLK,bx(p-vec2(4.4,S.y+.95),vec2(3.1,.07))); ink(c,BLK,bx(p-vec2(4.4,S.y-.95),vec2(3.1,.07)));
 bed(c,p,BLK,.26);
 vec2 g=p-B; float d=gear(g,7.,24.,.38,th); ink(c,BLK,d); vec2 gr=rot(-th)*g; float rr=length(g);
 ink(c,RED,rr-5.6); ink(c,PAP,max(half_(g,5.6,th),rr-5.6)); ink(c,BLK,abs(rr-4.1)-.06); { float a=atan(gr.y,gr.x); float s=TAU/8.; a=mod(a+s*.5,s)-s*.5; vec2 q=rr*vec2(cos(a),sin(a))-vec2(4.1,0.); ink(c,YEL,length(q)-.82); ink(c,BLK,length(q)-.3); } ink(c,ULT,rr-1.9); ink(c,PAP,rr-.5);
 vec2 m=p-S; float e=gear(m,3.5,12.,.38,ts); ink(c,ULT,e); float mr=length(m); ink(c,YEL,mr-2.75); ink(c,RED,half_(m,2.75,ts)); ink(c,PAP,mr-.9);
 vec2 C=S+2.15*vec2(cos(ts),sin(ts)); float L=3.55; vec2 H=vec2(C.x+sqrt(L*L-(C.y-S.y)*(C.y-S.y)),S.y); ink(c,YEL,bx(p-H-vec2(-.05,0.),vec2(.62,.86))); ink(c,BLK,bx(p-H-vec2(.55,0.),vec2(.1,1.5)));
 ink(c,BLK,sg(p,C,H)-.3); ink(c,PAP,sg(p,C,H)-.08); ink(c,RED,length(p-C)-.5); ink(c,BLK,length(p-C)-.2); ink(c,RED,length(p-H)-.4); ink(c,BLK,length(p-H)-.16);
 return c; }`,
    },
    {
      child: [2.4, 0.5, 0.36, 0.14],
      mean: [0.35, 0.6, 0.75],
      tag: { c: [1, 1], bg: "BLK", fg: "YEL" },
      glsl: `
vec2 pen(float i,out float r){ r=7.55+i*1.28; float t=uT*(.32+.11*h11(i*7.+2.))*(mod(i,2.)<.5?1.:-1.)+i*1.7; return vec2(cos(t),sin(t)); }
vec3 poster(vec2 p){ vec3 c=BLU; vec2 q=p-uChild.xy; float r=length(q); float i=floor((r-6.9)/1.28);
 if(i>=0.&&i<16.){ float rr; vec2 e=pen(i,rr); float dir=mod(i,2.)<.5?1.:-1.; float a=atan(q.y,q.x),ae=atan(e.y,e.x); float back=mod((ae-a)*dir,TAU); float len=2.2+2.6*h11(i*3.1+1.)+1.1*sin(uT*.5+i); vec3 k=mod(i,5.)<.5?PAP:mod(i,5.)<1.5?YEL:mod(i,5.)<2.5?ULT:mod(i,5.)<3.5?RED:PAP;
  float w=.46; float dd=max(abs(r-rr)-w,(back-len)*rr); ink(c,k,dd); float th=abs(r-rr); ink(c,BLK,max(th-.035,0.)); ink(c,k,max(th-w,(back-len)*rr)); vec2 f=q-e*rr; ink(c,BLK,length(f)-.56); ink(c,PAP,length(f)-.2); }
 bed(c,p,ULT,.3);
 float r4; vec2 e4=pen(2.,r4); vec2 T=uChild.xy+e4*r4; vec2 A=vec2(-13.2,-6.9); float L=12.2; vec2 v=T-A; float dist=min(length(v),2.*L-.2); float al=acos(dist/(2.*L)); vec2 E=A+L*(rot(al)*normalize(v));
 ink(c,BLK,sg(p,A,E)-.62); ink(c,RED,sg(p,A,E)-.4); ink(c,BLK,sg(p,E,T)-.48); ink(c,YEL,sg(p,E,T)-.28);
 ink(c,BLK,length(p-A)-2.1); ink(c,PAP,half_(p-A,1.7,atan(E.y-A.y,E.x-A.x))); ink(c,BLK,length(p-A)-.5); ink(c,BLK,length(p-E)-1.05); ink(c,PAP,length(p-E)-.7); ink(c,RED,half_(p-E,.7,uT*1.1)); ink(c,BLK,length(p-T)-.7); ink(c,RED,length(p-T)-.36);
 return c; }`,
    },
    {
      child: [-2.5, -1.2, 0.36, 0.14],
      mean: [0.8, 0.47, 0.42],
      tag: { c: [-1, 1], bg: "YEL", fg: "RED" },
      glsl: `
vec3 warp(float i){ float m=mod(i,12.); return m<3.?PAP:m<4.?ULT:m<7.?YEL:m<8.?ULT:m<11.?PNK:ULT; }
vec3 weft(float j){ float m=mod(j,10.); return m<4.?RED:m<5.?PAP:m<7.?ULT:m<9.?RED:YEL; }
vec3 poster(vec2 p){ vec3 c=RED; float fell=4.35; float w=.8; float sc=uT*.95;
 float beat=fract(uT*.95/w); float sh=sin(uT*.95/w*PI);
 if(p.y>fell-.4){ c=RED; float i0=floor(p.x/w); for(int n=-1;n<=1;n++){ float i=i0+float(n); float od=mod(i,2.)<.5?1.:-1.; float k=(p.y-fell)/4.6; float x=(i+.5)*w+od*sh*.34*smoothstep(0.,1.,k)*(1.-.0*k); ink(c,warp(i),abs(p.x-x)-.15); }
  float tr=mod(uT*.95/w*.5,1.)*2.; float sx=tr<1.?mix(-19.,19.,io(tr)):mix(19.,-19.,io(tr-1.)); vec2 q=p-vec2(sx,6.6); float dir=tr<1.?1.:-1.; ink(c,PAP,max(abs(q.y+.0)-.09,q.x*dir)); float lens=max(length(q-vec2(0.,-4.8))-5.8,length(q-vec2(0.,4.8))-5.8); ink(c,BLK,lens); ink(c,YEL,bx(q,vec2(1.1,.32))-.1); ink(c,RED,length(q-vec2(sin(uT*9.)*.0,0.))-.26); }
 else { vec2 g=vec2(p.x,p.y+sc-0.); float i=floor(g.x/w),j=floor(g.y/w); vec2 f=vec2(fract(g.x/w)-.5,fract(g.y/w)-.5)*w; float th=.365; bool up=mod(i+j*mix(1.,3.,step(.5,fract(j/24.)))+floor(j/6.),4.)<2.; vec3 A=warp(i),B=weft(j); c=vec3(.3,.07,.1);
  if(up){ ink(c,B,abs(f.y)-th); ink(c,B*.72,max(abs(f.y)-th,w*.5-.05-abs(f.x)+.0-.0)); ink(c,A,abs(f.x)-th); } else { ink(c,A,abs(f.x)-th); ink(c,A*.72,max(abs(f.x)-th,w*.5-.05-abs(f.y))); ink(c,B,abs(f.y)-th); } }
 ink(c,BLK,bx(p-vec2(0.,fell-.28+.5*smoothstep(.0,.2,beat)*smoothstep(.75,.35,beat)),vec2(17.,.2)));
 bed(c,p,vec3(.3,.07,.1),.34); return c; }`,
    },
    {
      child: [3.2, -0.3, 0.36, 0.14],
      mean: [0.8, 0.6, 0.3],
      tag: { c: [1, 1], bg: "RED", fg: "PAP" },
      glsl: `
vec3 poster(vec2 p){ vec3 c=YEL; float sp=9.,R=4.5,th=1.12,v=2.6; float i0=floor((p.x+4.5)/sp);
 { vec2 q=p-vec2(i0*sp,0.); float sd=mod(i0,2.)<.5?1.:-1.; ink(c,sd>0.?PNK:ORG,max(abs(q.x)-4.5,q.y*sd)); vec2 s=p-vec2(i0*sp,-sd*9.); float sl=length(s); ink(c,sd>0.?RED:BLU,sl-4.0); vec2 sr=rot(-uT*.4*sd)*s; float an=atan(sr.y,sr.x); ink(c,sd>0.?PNK:PAP,max(max(sl-3.45,2.1-sl),sin(an*9.)*sl/9.)); ink(c,sd>0.?PAP:YEL,sl-1.35); }
 for(int n=-1;n<=1;n++){ float i=i0+float(n); float sd=mod(i,2.)<.5?1.:-1.; vec2 q=p-vec2(i*sp,0.); q.y*=sd; float r=length(q);
  float rt=-uT*v/3.1*1.; vec2 qq=rot(-rt)*q; float a=atan(qq.y,qq.x); if(r<3.6){ ink(c,BLK,r-3.2); float sct=sin(a*6.); ink(c,mod(i,3.)<.5?BLU:mod(i,3.)<1.5?RED:ULT,max(r-2.85,(-sct)*r/6.)); ink(c,BLK,r-1.75); ink(c,PAP,half_(q,1.35,rt)); ink(c,BLK,r-.4); }
  if(q.y>-max(.02,uPx*1.5)){ float an=atan(q.x,q.y); float s=(i+.5+an/PI)*PI*R-uT*v; float u=r-R; float d=abs(u)-th; ink(c,BLK,d-.1); ink(c,PAP,d); float per=2.827433; float j=floor(s/per); vec2 f=vec2((s-(j+.5)*per),u); float m=mod(j,4.); vec3 bg=m<1.?RED:m<2.?BLU:m<3.?YEL:ULT; vec3 fg=m<1.?PAP:m<2.?YEL:m<3.?RED:PNK; float fd=bx(f,vec2(1.16,.66)); ink(c,bg,fd); float g=m<1.?length(f)-.46:m<2.?half_(f,.5,0.):m<3.?bx(f,vec2(.36)):abs(length(f)-.36)-.14; ink(c,fg,max(g,fd)); } }
 bed(c,p,BLK,.34); return c; }`,
    },
    {
      child: [-2.3, 0.9, 0.36, 0.14],
      mean: [0.93, 0.64, 0.5],
      tag: { c: [-1, 1], bg: "ULT", fg: "YEL" },
      glsl: `
float part(vec2 f,float rad,float h,float sp){ float r=length(f); f=rot(-sp)*f; float a=atan(f.y,f.x); if(h<.2) return max(r-rad,-f.x); if(h<.36) return max(r-rad,min(rad*.5-r,max(-f.x,-f.y)));
 if(h<.52) return max(r-rad,-(r-rad*.42)); if(h<.68){ float t=clamp(sin(a*11.)*2.,-1.,1.)*rad*.09; return max((r-rad*.9-t)*.75,rad*.3-r);} if(h<.84) return max(r-rad,(abs(f.y)-rad*.22)*-1.); float s=TAU/6.; float b=mod(a+s*.5,s)-s*.5; return min(length(r*vec2(cos(b),sin(b))-vec2(rad*.68,0.))-rad*.3,r-rad*.3); }
vec3 poster(vec2 p){ vec3 c=PAP; c=mix(c,PNK,.55); vec3 I[4]; I[0]=vec3(1.,.8,.1); I[1]=vec3(.98,.36,.3); I[2]=vec3(.3,.72,.95); I[3]=vec3(.56,.52,.9);
 for(int k=0;k<4;k++){ float fk=float(k),g=k==3?9.2:k==0?5.2:4.3; vec2 q=rot(.16*fk+.04*sin(uT*.21+fk*2.))*p+vec2(uT*.22*(k==1?-1.:1.)+fk*2.3,sin(uT*.17+fk)*1.4+fk*1.3); vec2 id=floor(q/g+.5),f=q-id*g; float h=h12(id*1.7+fk*13.+3.); float rad=g*.5*(.82+.15*sin(uT*1.2+id.x*.9+id.y*1.3+fk*2.)); float sp=uT*(h>.5?.8:-.8)*(.5+h)+h*9.; if(k==3&&h<.45) continue; over(c,I[k],part(f,rad,fract(h*7.3),sp)); }
 bed(c,p,vec3(.2,.16,.4),.34); return c; }`,
    },
    {
      child: [2.2, 1.1, 0.36, 0.14],
      mean: [0.75, 0.6, 0.4],
      tag: { c: [1, 1], bg: "PAP", fg: "GRN" },
      glsl: `
vec3 poster(vec2 p){ vec3 c=GRN; float g=3.2; vec2 id=floor(p/g),f=p-(id+.5)*g; float ph=uT*.4-length(id+vec2(.3,.2))*.17+h12(id)*.06; float st=floor(ph),e=io((fract(ph)-.3)/.7); float q0=floor(h12(id+5.)*4.); float an=(st+e+q0)*PI*.5; float par=mod(id.x+id.y,2.); if(par>.5) an=-an;
 float ac=mod(an,PI*.5); float sc=1./(cos(ac)+sin(ac)); f=rot(-an)*f/sc; float pxs=1./sc; float H=g*.5; float sq=bx(f,vec2(H-.04)); vec3 t=par<.5?MNT:PAP; vec3 k1=par<.5?RED:RED; c=mix(c,t,clamp(.5-sq*sc/uPx,0.,1.));
 float r1=length(f-vec2(H)),r2=length(f+vec2(H)); float r=min(r1,r2); for(int b=0;b<3;b++){ float R=H+(float(b)-1.)*.82; vec3 k=b==0?RED:b==1?BLK:ORG; float d=max(abs(r-R)-.27,sq); c=mix(c,k,clamp(.5-d*sc/uPx,0.,1.)); }
 float ce=length(f)-.001; vec2 m=abs(f)-H; float cr=min(length(f-vec2(H,-H)),length(f-vec2(-H,H))); c=mix(c,YEL,clamp(.5-max(cr-.62,sq)*sc/uPx,0.,1.));
 bed(c,p,vec3(.02,.24,.2),.34); return c; }`,
    },
    {
      child: [-1.6, -0.5, 0.36, 0.14],
      mean: [0.72, 0.45, 0.46],
      tag: { c: [-1, 1], bg: "BLK", fg: "PNK" },
      glsl: `
vec3 poster(vec2 p){ vec2 q=rot(-uChild.w)*(p-uChild.xy); float d=bx(q,vec2(16,9)*uChild.z-1.2)-1.2; float a=atan(q.y,q.x); float en=smoothstep(0.,5.,d);
 float ph=d*.92-uT*.85+en*(1.15*sin(5.*a+uT*.45+d*.12)+.75*sin(9.*a-uT*.6-d*.3)+1.3*sin(p.x*.33+uT*.4)*cos(p.y*.36-uT*.33));
 float w=max(fwidth(ph),1e-4); float b=floor(ph),f=fract(ph); vec3 P[6]; P[0]=RED; P[1]=PAP; P[2]=ULT; P[3]=PNK; P[4]=RED; P[5]=YEL; int i=int(mod(b,6.)); int j=int(mod(b-1.,6.)); int k=int(mod(b+1.,6.)); vec3 c=P[i]; float e0=clamp(.5+f/w,0.,1.),e1=clamp(.5+(1.-f)/w,0.,1.); c=mix(P[j],c,e0); c=mix(P[k],c,e1);
 float thin=abs(f-.5)-.06; c=mix(c,i==1||i==3||i==5?RED:(i==2?BLU:PNK),clamp(.5-thin/w,0.,1.));
 bed(c,p,ULT,.0); return c; }`,
    },
    {
      child: [2.6, -0.8, 0.36, 0.14],
      mean: [0.75, 0.55, 0.3],
      tag: { c: [1, 1], bg: "ULT", fg: "PAP" },
      penrose: !0,
      glsl: `
vec3 poster(vec2 p){ vec3 c=ULT; bed(c,p,BLK,.0); return c; }`,
    },
    {
      child: [-2.6, 0.6, 0.36, 0.14],
      mean: [0.55, 0.6, 0.55],
      tag: { c: [-1, 1], bg: "RED", fg: "YEL" },
      glsl: `
float hgt(vec2 c){ float d=length(c-vec2(1.,-1.)); float s=sin(d*.75-uT*1.15)+.6*sin(c.x*.6+c.y*.35+uT*.7); float q=(s+1.6)*1.05; float fl=floor(q); return (fl+io((q-fl-.55)/.45))*.95; }
vec3 iso(vec2 p){ const float a=1.15,b=.664; float HM=4.4; vec2 uv=vec2(p.x/a-p.y/b,-p.x/a-p.y/b)*.5; float t=HM; vec2 g=uv+t/(2.*b); vec2 cell=floor(g); int face=2;
 for(int n=0;n<12;n++){ float h=hgt(cell); if(h>=t){ vec2 k=cell; float par=mod(k.x+k.y,2.); float lv=floor(h/.95+.5); float seam=abs(fract(t/.95)-.5); vec2 sp=uv+t/(2.*b)-cell; float ed=face==0?min(sp.y,1.-sp.y):min(sp.x,1.-sp.x); if(seam>.46||ed<.04) return BLK; if(face==0) return ULT; return mod(floor(t/.95),3.)<.5?BLU:mod(floor(t/.95),3.)<1.5?RED:ORG; }
  vec2 r=g-cell; float du=r.x,dv=r.y; float st=min(du,dv)*2.*b; float t2=t-st; if(h>t2){ vec2 tp=uv+h/(2.*b)-cell-.5; float lv=mod(floor(h/.95+.5),3.); float par=mod(cell.x+cell.y,2.); vec3 top=lv<.5?YEL:lv<1.5?PAP:MNT; float cd=length(tp); vec2 at=abs(tp); if(max(at.x,at.y)>.465) return BLK; if(par>.5&&cd<.27) top=lv<.5?RED:lv<1.5?ULT:PAP; return top; }
  t=t2; g=uv+t/(2.*b); if(du<dv){ cell.x-=1.; face=0; } else { cell.y-=1.; face=1; } if(t<-.5) break; }
 return BLK; }
vec3 poster(vec2 p){ vec3 c=vec3(0.); c+=iso(p+uPx*vec2(.125,.375)); c+=iso(p+uPx*vec2(-.125,-.375)); c+=iso(p+uPx*vec2(.375,-.125)); c+=iso(p+uPx*vec2(-.375,.125)); c*=.25; bed(c,p,BLK,.0); return c; }`,
    },
    {
      child: [1.9, 0.4, 0.36, 0.14],
      mean: [0.62, 0.55, 0.55],
      tag: { c: [1, 1], bg: "YEL", fg: "ULT" },
      glsl: `
vec3 pal(float i){ i=mod(i,6.); return i<1.?RED:i<2.?PAP:i<3.?ULT:i<4.?YEL:i<5.?BLU:PNK; }
vec3 poster(vec2 p){ vec3 c=PNK; float Rr=7.4; vec2 g=p+vec2(-1.2,2.6); vec2 s=vec2(2.*Rr,2.*Rr*.8660254); float row=floor(g.y/s.y+.5); float bestd=1e5; vec2 q=vec2(0.); float id=0.; for(int n=-1;n<=1;n++){ float y=(row+float(n)); float ox=mod(y,2.)<.5?0.:Rr; float x=floor((g.x-ox)/s.x+.5); vec2 ce=vec2(x*s.x+ox,y*s.y); float d=length(g-ce); if(d<bestd){ bestd=d; q=g-ce; id=x*3.+y*5.; } }
 float scl=Rr; q/=scl; float dir=mod(id,2.)<.5?1.:-1.; float px0=uPx; vec2 z=q; float tint=id; bool plain=false;
 for(int L=0;L<4;L++){ float fl=float(L); float r=length(z); float pxl=px0/scl; z=rot(uT*dir*(.22+.16*fl))*z; float a=atan(z.y,z.x); float n=L==0?42.:L==1?24.:14.; float t=clamp(sin(n*a)*1.7,-1.,1.)*(L==0?.016:.028); float d=(r-.965-t)*.7; vec3 k=pal(tint+fl*2.+1.); vec3 k2=pal(tint+fl*2.+3.); c=mix(c,k,clamp(.5-d/pxl,0.,1.));
  float ring=max(r-.9,-(r-.0)); c=mix(c,k2,clamp(.5-ring/pxl,0.,1.)); float hd=max(ring,-z.y); if(mod(tint+fl,3.)<1.) c=mix(c,k,clamp(.5-hd/pxl,0.,1.)); if(plain){ vec3 k3=pal(tint+fl*2.+5.); c=mix(c,k,clamp(.5-max(r-.62,-z.y)/pxl,0.,1.)); c=mix(c,k3,clamp(.5-(r-.3)/pxl,0.,1.)); break; } if(L==3){ c=mix(c,k,clamp(.5-(r-.45)/pxl,0.,1.)); break; }
  // into one of the seven discs
  float rr=length(z); vec2 w; float j; if(rr<1./3.){ w=z; j=0.; } else { float aa=atan(z.y,z.x); float sec=floor(aa/(TAU/6.)+.5); w=z-vec2(cos(sec*TAU/6.),sin(sec*TAU/6.))*.6667; j=1.+mod(sec,6.); } float fs=.318; if(L==0) tint+=mod(j,2.)*2.+(j<.5?3.:0.); tint+=1.; dir=-dir; z=w/fs; scl*=fs; if(L==1&&mod(j,2.)>.5) plain=true; if(length(z)>1.06) break; }
 bed(c,p,BLK,.0); return c; }`,
    },
  ],
  wv = {
    RED: [0.937, 0.255, 0.161],
    BLU: [0.09, 0.58, 0.87],
    YEL: [1, 0.765, 0.07],
    MNT: [0.58, 0.86, 0.74],
    PNK: [0.975, 0.725, 0.655],
    ULT: [0.16, 0.175, 0.64],
    BLK: [0.085, 0.078, 0.07],
    PAP: [0.957, 0.937, 0.885],
    ORG: [1, 0.49, 0.13],
    GRN: [0.05, 0.47, 0.36],
  };

function $y({ steps: i = 6, cx: t = 0, cy: e = 0, radius: n = 26 } = {}) {
  let o = (1 + Math.sqrt(5)) / 2,
    s = [],
    a = (v, m) => [t + v * Math.cos(m), e + v * Math.sin(m)];
  for (let v = 0; v < 10; v++) {
    let m = a(n, ((2 * v - 1) * Math.PI) / 10),
      g = a(n, ((2 * v + 1) * Math.PI) / 10);
    (v % 2 === 0 && ([m, g] = [g, m]), s.push([0, [t, e], m, g]));
  }
  let r = (v, m, g) => [v[0] + (m[0] - v[0]) * g, v[1] + (m[1] - v[1]) * g];
  for (let v = 0; v < i; v++) {
    let m = [];
    for (let [g, b, y, S] of s)
      if (g === 0) {
        let M = r(b, y, 1 / o);
        m.push([0, S, M, y], [1, M, S, b]);
      } else {
        let M = r(y, b, 1 / o),
          w = r(y, S, 1 / o);
        m.push([1, w, S, b], [1, M, w, y], [0, w, M, b]);
      }
    s = m;
  }
  let l = new Map(),
    c = (v) => Math.round(v[0] * 400) + "," + Math.round(v[1] * 400);
  for (let [v, m, g, b] of s) {
    let y = r(g, b, 0.5),
      S = c(y);
    l.has(S) || l.set(S, { k: v, A: m, B: g, C: b, m: y });
  }
  let u = (v, m, g, b) => {
      let y = [];
      for (let S = 0; S < v.length; S++) {
        let M = v[S],
          w = v[(S + 1) % v.length],
          E = g * M[m] - b,
          T = g * w[m] - b;
        (E <= 0 && y.push(M), E < 0 != T < 0 && y.push(r(M, w, E / (E - T))));
      }
      return y;
    },
    f = [],
    h = [],
    d = [],
    p = [];
  for (let { k: v, A: m, B: g, C: b, m: y } of l.values()) {
    let S = [2 * y[0] - m[0], 2 * y[1] - m[1]],
      M = [m, g, S, b];
    for (let [L, k, P] of [
      [0, 1, 21.6],
      [0, -1, 21.6],
      [1, 1, 13.6],
      [1, -1, 13.6],
    ])
      if (((M = u(M, L, k, P)), M.length < 3)) break;
    if (M.length < 3) continue;
    let w = [0, 0];
    for (let L of M) ((w[0] += L[0] / M.length), (w[1] += L[1] / M.length));
    let E = Math.atan2(S[1] - m[1], S[0] - m[0]),
      T = ((Math.round(E / (Math.PI / 5)) % 5) + 5) % 5,
      _ = 0.5 * Math.hypot(S[0] - m[0], S[1] - m[1]),
      R = 0.5 * Math.hypot(b[0] - g[0], b[1] - g[1]);
    for (let L = 1; L < M.length - 1; L++)
      for (let k of [M[0], M[L], M[L + 1]])
        (f.push(k[0], k[1], 0), h.push(w[0], w[1]), d.push(v, T, _, R), p.push(y[0], y[1], E));
  }
  let x = new Qt();
  return (
    x.setAttribute("position", new $t(new Float32Array(f), 3)),
    x.setAttribute("cen", new $t(new Float32Array(h), 2)),
    x.setAttribute("inf", new $t(new Float32Array(d), 4)),
    x.setAttribute("axs", new $t(new Float32Array(p), 3)),
    (x.boundingSphere = new Be(new F(), 1e6)),
    x
  );
}

// ── scene loop · "The loop" · enterWith: wash ──
var Sv = 3,
  Qy = Pa.length,
  t5 = Qy - Sv,
  DA = 6,
  Ar = (i) => (i < Qy ? Math.max(0, i) : Sv + ((i - Sv) % t5)),
  UA = `precision highp float; in vec3 position; uniform mat4 projectionMatrix; uniform vec4 uM; uniform vec2 uExt; uniform float uZ; out vec2 vP;
void main(){ vec2 p=position.xy*uExt; vP=p; vec2 w=uM.zw+vec2(uM.x*p.x-uM.y*p.y,uM.y*p.x+uM.x*p.y); gl_Position=projectionMatrix*vec4(960.+60.*w.x,540.-60.*w.y,0.,1.); gl_Position.z=uZ; }`,
  v0 = (i, t, e, n, o) => {
    let s = o * o,
      a = s * o;
    return (2 * a - 3 * s + 1) * i + (a - 2 * s + o) * e + (-2 * a + 3 * s) * t + (a - s) * n;
  },
  Zy = (i, t, e, n, o) => {
    let s = o * o;
    return (6 * s - 6 * o) * i + (3 * s - 4 * o + 1) * e + (-6 * s + 6 * o) * t + (3 * s - 2 * o) * n;
  },
  e5 = 0.78,
  ih = 120,
  x0 = (() => {
    let i = [0],
      t = 0;
    for (let e = 0; e < 14 * ih; e++) {
      let n = (e + 0.5) / ih,
        o = 0.165 * Math.exp(0.3 * Math.min(n, 7.5)) * Fn(n / 1.6),
        s = Fn((n - 7.2) / 3.4);
      ((t += K(o, e5, s) / ih), i.push(t));
    }
    return i;
  })(),
  Jy = (i) => {
    let t = Math.max(0, i) * ih,
      e = Math.floor(t),
      n = x0.length - 1;
    return e >= n ? x0[n] + ((t - n) / ih) * e5 : K(x0[e], x0[e + 1], t - e);
  },
  Mv = (i) => ((i = Ct(i)), i * i * i * i * (35 + i * (-84 + i * (70 - 20 * i)))),
  n5 = {
    id: "loop",
    title: "循环",
    enterWith: "wash",
    hud: {
      font: "monoMed",
      color: (i) =>
        i.beat === 0 ? "#ffc414" : i.beat === 1 ? (i.at(1) < 1.9 ? "#ffc414" : "#292ba3") : "#151412",
    },
    beats: [
      { dur: 4, hold: 4, delay: 1.8, page: "2,584" },
      { dur: 4, hold: 5, page: "4,181" },
      { dur: 4, hold: 5, page: "10,946" },
      { dur: 10, hold: 7, page: "75,025" },
    ],
    notes: [
      "先说一个直白的事实。2026 年 5 月，Anthropic 说它合并的代码里，超过 80% 是 Claude 写的。",
      "代码只是第一步。按 Anthropic 自己的标准，2026 年 2 月 Claude 主导的 AI 研究不足 1%，到 8 月是 26%。扇子有 26 片扇叶，那条细缝只是一片。",
      "METR 在 2026 年 11 月评估了 Anthropic，认为进展速度约为原来的两倍，主要靠 AI。大轮转一圈，小轮正好转两圈。",
      "然后它闭合了。每一代帮着造下一代，每一步都比上一步更快。让它转下去。",
    ],
    create(i) {
      let { gfx: t, view: e } = i,
        n = t.target({ samples: 4, depth: !0, type: $e }),
        o = new ge();
      o.matrixWorldAutoUpdate = !1;
      let s = new Ke(32, 18),
        a = (U, j, J = {}) => {
          let Pt = new ce({
              vertexShader: UA,
              fragmentShader: U,
              glslVersion: re,
              side: oe,
              uniforms: {
                uM: { value: new ie() },
                uZ: { value: 0 },
                uT: { value: 0 },
                uPx: { value: 0.01 },
                uK: { value: 0 },
                uV: { value: 1 },
                uChild: { value: new ie() },
                uMean: { value: new F() },
                uExt: { value: new Nt(1, 1) },
                ...J,
              },
            }),
            $ = new Zt(j, Pt);
          return (($.frustumCulled = !1), ($.visible = !1), o.add($), $);
        },
        r = "v0123456789",
        l = 192,
        c = [],
        u = document.createElement("canvas");
      ((u.width = l * r.length), (u.height = 256));
      {
        let U = u.getContext("2d");
        ((U.font = Ln("displayBold", 190)),
          (U.textAlign = "center"),
          (U.textBaseline = "alphabetic"),
          (U.fillStyle = "#fff"),
          [...r].forEach((j, J) => {
            let Pt = U.measureText(j).width,
              $ = Math.min(1, 176 / Pt);
            (c.push((Pt * $) / l),
              U.save(),
              U.translate(l * (J + 0.5), 196),
              U.scale($, 1),
              U.fillText(j, 0, 0),
              U.restore());
          }));
      }
      let f = new Hn(u);
      ((f.colorSpace = Mn), (f.generateMipmaps = !0), (f.minFilter = Pn), (f.anisotropy = 4));
      let h = `precision highp float; in vec2 vP; out vec4 o; uniform sampler2D tA; uniform vec3 uBg,uFg; uniform vec4 uDig; uniform float uN,uPx,uT; uniform vec3 uMean;
      uniform vec4 uOff,uWid;
      void main(){ vec2 p=vec2(vP.x+.5,vP.y+.5); float x=p.x*uN; vec2 gx=vec2(dFdx(x)/11.,dFdx(p.y)),gy=vec2(dFdy(x)/11.,dFdy(p.y)); float mag=length(gx*vec2(2112.,256.)),a=0.; for(int i=0;i<4;i++){ float l=x-uOff[i]-uWid[i]*.5; if(abs(l)<uWid[i]*.5){ float s=textureGrad(tA,vec2((uDig[i]+.5+l)/11.,p.y),gx,gy).a; float k=clamp(.5*mag,.06,.5); a=mag<1.?smoothstep(.5-k,.5+k,s):s; } }
        o=vec4(mix(uBg,uFg,a),1.); }`,
        d = $y({ cx: 2.2, cy: -1.4, radius: 38, steps: 7 }),
        p = Pa.map((U, j) => {
          let J = a(m0 + U.glsl + jy, s),
            Pt = J.material.uniforms;
          (Pt.uChild.value.set(...U.child), Pt.uMean.value.set(...U.mean));
          let $ = { d: U, i: j, me: J, u: Pt, tag: null, pen: null };
          if (U.tag) {
            let tt = new Ke(1, 1);
            (($.tag = a(h, tt, {
              tA: { value: f },
              uBg: { value: new F(...wv[U.tag.bg]) },
              uFg: { value: new F(...wv[U.tag.fg]) },
              uDig: { value: new ie() },
              uN: { value: 2 },
              uOff: { value: new ie() },
              uWid: { value: new ie() },
            })),
              ($.tag.material.vertexShader =
                "precision highp float; in vec3 position; uniform mat4 projectionMatrix; uniform vec4 uM,uRect; uniform float uZ; out vec2 vP; void main(){ vP=position.xy; vec2 p=uRect.xy+position.xy*uRect.zw; vec2 w=uM.zw+vec2(uM.x*p.x-uM.y*p.y,uM.y*p.x+uM.x*p.y); gl_Position=projectionMatrix*vec4(960.+60.*w.x,540.-60.*w.y,0.,1.); gl_Position.z=uZ; }"),
              ($.tag.material.uniforms.uRect = { value: new ie() }),
              ($.ver = -1));
          }
          return (
            U.penrose &&
              (($.pen = a(
                m0 +
                  `in vec4 vI; in vec3 vA; in float vF; vec3 pal(float k,float or,float s){ if(s>.5) return k<.5?(mod(or,2.)<.5?PAP:PNK):(mod(or,5.)<1.5?YEL:mod(or,5.)<3.5?ORG:PNK); return k<.5?(mod(or,2.)<.5?ULT:BLU):(mod(or,5.)<1.5?RED:mod(or,5.)<3.5?vec3(.82,.16,.14):ORG); }
          uniform vec2 uExt; void main(){ if(abs(vP.x)>16.*uExt.x||abs(vP.y)>9.*uExt.y) discard; vec2 q=rot(-vA.z)*(vP-vA.xy); float ha=vI.z,hb=vI.w; float side=step(0.,vF); vec3 c=pal(vI.x,vI.y,side); float n=1./length(vec2(ha,hb)); float e=(abs(q.x)*hb+abs(q.y)*ha-ha*hb)*n; float r=length(q); vec3 k2=side>.5?(vI.x<.5?RED:ULT):(vI.x<.5?YEL:PAP); float m=min(ha,hb); if(vI.x>.5) ink(c,k2,abs(r-m*.46)-m*.12); else ink(c,k2,max(abs(q.x)-ha*.45,abs(q.y)-hb*.22)); if(vI.x>.5) ink(c,k2,r-m*.14);
            c=mix(c,ULT,fil(-e-.075)*.0+clamp(.5+(e+.055)/uPx,0.,1.)); float sh=1.-.28*(1.-abs(vF)); c*=sh; ink(c,PAP,childD(vP)-.16); c=tooth(c,vP); c=mix(c,uMean,smoothstep(.2,.6,uPx)); o=vec4(c,1.); }`,
                d,
              )),
              ($.pen.material.vertexShader = `precision highp float; in vec3 position; in vec2 cen; in vec4 inf; in vec3 axs; uniform mat4 projectionMatrix; uniform vec4 uM,uChild; uniform float uZ,uT; out vec2 vP; out vec4 vI; out vec3 vA; out float vF;
          void main(){ float d=length(axs.xy-uChild.xy); float ph=fract(uT*.16-d*.052+.012*sin(axs.x*1.7+axs.y*2.3)); float t=smoothstep(0.,.16,ph)-smoothstep(.5,.66,ph); float f=cos(t*3.14159265); vF=f; vI=inf; vA=axs; vP=position.xy; vec2 ax=vec2(-sin(axs.z),cos(axs.z)); vec2 v=position.xy-cen; float al=dot(v,ax); float sc=max(abs(f),.02); v+=ax*al*(sc-1.); vec2 p=cen+v; vec2 w=uM.zw+vec2(uM.x*p.x-uM.y*p.y,uM.y*p.x+uM.x*p.y); gl_Position=projectionMatrix*vec4(960.+60.*w.x,540.-60.*w.y,0.,1.); gl_Position.z=uZ; }`)),
            $
          );
        }),
        x = (U, j) => {
          let J = i.text(U, { raster: 1.6, ...j });
          return ((J.home = [J.x, J.y]), o.add(J.mesh), J);
        },
        v = x("现在，AI 在写代码。", {
          x: 112,
          y: 148,
          size: 112,
          font: "display",
          color: "#151412",
          valign: "middle",
          tracking: -0.02,
        }),
        m = x("Anthropic 合并的代码中，超过 80% 由 Claude 写就。2026 年 5 月。", {
          x: 118,
          y: 262,
          size: 32,
          font: "textMed",
          color: "#151412",
          valign: "middle",
        }),
        g = x("并主导了 26% 的研究。", {
          x: 112,
          y: 148,
          size: 88,
          font: "display",
          color: "#292ba3",
          valign: "middle",
          tracking: -0.02,
        }),
        b = x("Claude 主导的 Anthropic AI 研究占比，按其自身指标。", {
          x: 118,
          y: 262,
          size: 32,
          font: "textMed",
          color: "#292ba3",
          valign: "middle",
        }),
        y = x("不足 1%", { x: 190, y: 404, size: 50, font: "display", color: "#ef4129", valign: "middle" }),
        S = x("2026 年 2 月", {
          x: 192,
          y: 460,
          size: 28,
          font: "textMed",
          color: "#292ba3",
          valign: "middle",
        }),
        M = x("26%", {
          x: 888,
          y: 560,
          size: 190,
          font: "displayBold",
          color: "#f4efe3",
          align: "center",
          valign: "middle",
          tracking: -0.03,
        }),
        w = x("2026 年 8 月", {
          x: 888,
          y: 694,
          size: 30,
          font: "textMed",
          color: "#f4efe3",
          align: "center",
          valign: "middle",
        }),
        E = x(
          "所以下一代\n快两倍到来。",
          {
            x: 112,
            y: 214,
            size: 108,
            font: "display",
            color: "#151412",
            valign: "middle",
            tracking: -0.02,
            leading: 1.14,
          },
        ),
        T = x("METR 评估 Anthropic，2026 年 11 月：速度约为原来的两倍，主要靠 AI。", {
          x: 118,
          y: 386,
          size: 32,
          font: "textMed",
          color: "#151412",
          valign: "middle",
        }),
        _ = [
          [0, v, m],
          [1, g, b, y, S, M, w],
          [2, E, T],
        ],
        R = i.overlay(),
        L = i.overlay(),
        k = new i.SelectBox({ handle: 10, line: 3 }),
        P = i.text(
          "下一代\n造下一代。",
          {
            x: 112,
            y: 946,
            size: 94,
            font: "display",
            color: "#151412",
            valign: "middle",
            tracking: -0.02,
            leading: 1.13,
          },
        );
      (R.add(P), L.add(k));
      let C = t.pass(
          m0.replace(
            "precision highp float; precision highp int; in vec2 vP; out vec4 o; uniform float uT,uPx,uK,uV; uniform vec4 uChild; uniform vec3 uMean;",
            "uniform float uPx; uniform vec4 uChild;",
          ) +
            `
      uniform sampler2D tA; uniform vec4 uView; uniform vec2 uC; uniform float uRate,uTw,uBand,uScroll,uGen;
      void main(){ vec2 d=vec2(uView.x+vUv.x*uView.z,uView.y+(1.-vUv.y)*uView.w); vec2 v=d-uC; float mag=length(v)*length(vec2(uRate,uTw))*uRes.x/uView.z; vec3 c;
        if(mag<.6) c=texture(tA,vUv).rgb; else { c=vec3(0.); float jt=fract(52.9829189*fract(dot(gl_FragCoord.xy,vec2(.06711056,.00583715)))); const int NS=22; for(int i=0;i<NS;i++){ float t=(float(i)+jt)/float(NS)-.5; vec2 q=rot(uTw*t)*v*exp(uRate*t)+uC; vec2 u=vec2((q.x-uView.x)/uView.z,1.-(q.y-uView.y)/uView.w); c+=texture(tA,clamp(u,.001,.999)).rgb; } c/=float(NS); }
        float px=uView.z/uRes.x; if(d.y>uBand-2.){ vec3 b=PAP; float sh=46.; float w=92.; float x=d.x+uScroll; float i=floor(x/w); float f=x-(i+.5)*w; float y=d.y-uBand-sh*.5; float m=mod(i,11.); vec3 k=m<1.?RED:m<2.?YEL:m<3.?BLU:m<4.?BLK:m<5.?PNK:m<6.?ULT:m<7.?MNT:m<8.?ORG:m<9.?PAP:m<10.?GRN:BLK; float ss=d.y-uBand-sh; vec3 strip=k; if(m>=8.&&m<9.){ strip=mix(PAP,BLK,clamp(.5-(length(vec2(f,y))-13.)/px,0.,1.)); strip=mix(strip,PAP,clamp(.5-(length(vec2(f,y))-9.)/px,0.,1.)); strip=mix(strip,BLK,clamp(.5-(min(abs(f),abs(y))-1.2)/px,0.,1.)*step(max(abs(f),abs(y)),20.)); } if(m>=10.){ vec2 g=mod(vec2(f,y)+46.,11.5)-5.75; float r=mix(1.,7.2,clamp(f/w+.5,0.,1.)); strip=mix(PAP,BLK,clamp(.5-(length(g)-r)/px,0.,1.)); }
          b=mix(b,strip,clamp(.5-ss/px,0.,1.)); b*=1.+(vn(d*.7)-.5)*.02; c=mix(c,b,clamp(.5-(uBand-d.y)/px,0.,1.)); }
        o=vec4(c,1.); }`,
          {
            tA: null,
            uPx: 1,
            uChild: new ie(),
            uView: new ie(),
            uC: new Nt(),
            uRate: 0,
            uTw: 0,
            uBand: 2e3,
            uScroll: 0,
            uGen: 0,
          },
        ),
        A = 0,
        N = 0,
        G = 0,
        B = !1,
        ot = 0,
        ut = 0,
        lt = -1,
        Z = 0,
        H = !1,
        Y = [0, 0, 0, 0, 0, 0, 0, 0],
        q = [0, 0],
        st = { x: 0, y: 0, rate: 0, tw: 0 },
        ct = (U, j) => {
          let J = 0,
            Pt = 0;
          for (let $ = U + 14; $ >= U; $--) {
            let [tt, W, D, z] = Pa[Ar($)].child,
              pt = D * Math.cos(z),
              ht = D * Math.sin(z),
              gt = tt + pt * J - ht * Pt;
            ((Pt = W + ht * J + pt * Pt), (J = gt));
          }
          ((j[0] = J), (j[1] = Pt));
        },
        V = (U) => Math.log(Pa[Ar(U)].child[2]),
        ft = (U) => Pa[Ar(U)].child[3],
        nt = new Float64Array(4),
        Mt = {};
      function Et(U) {
        let j = Math.floor(A),
          J = A - j;
        for (let zt = 0; zt < 4; zt++)
          (ct(Math.max(0, j - 1 + zt), q), (Y[zt * 2] = q[0]), (Y[zt * 2 + 1] = q[1]));
        let Pt = v0(Y[2], Y[4], (Y[4] - Y[0]) / 2, (Y[6] - Y[2]) / 2, J),
          $ = v0(Y[3], Y[5], (Y[5] - Y[1]) / 2, (Y[7] - Y[3]) / 2, J) + U,
          tt = -(V(Math.max(0, j - 1)) + V(j)) / 2,
          W = -(V(j) + V(j + 1)) / 2,
          D = v0(0, -V(j), tt, W, J),
          z = -(ft(Math.max(0, j - 1)) + ft(j)) / 2,
          pt = -(ft(j) + ft(j + 1)) / 2,
          ht = v0(0, -ft(j), z, pt, J);
        ((st.x = Pt), (st.y = $), (st.rate = Zy(0, -V(j), tt, W, J)), (st.tw = Zy(0, -ft(j), z, pt, J)));
        let gt = Math.exp(D),
          dt = gt * Math.cos(ht),
          Kt = gt * Math.sin(ht),
          Ot = Pt - (dt * Y[2] - Kt * Y[3]),
          Ut = $ - (Kt * Y[2] + dt * Y[3]);
        for (let zt of p)
          ((zt.on = !1),
            (zt.me.visible = !1),
            zt.tag && (zt.tag.visible = !1),
            zt.pen && (zt.pen.visible = !1));
        let O = (zt, Ft) => {
            let wt = p[Ar(zt)];
            if (wt.on) return;
            ((wt.on = !0), (wt.idx = zt), (wt.dep = Ft));
            let mt = Math.hypot(dt, Kt),
              Dt = e.w / t.W / 60 / mt;
            ((wt.sc = mt), (wt.m0 = dt), (wt.m1 = Kt), (wt.tx = Ot), (wt.ty = Ut));
            let it = 0.85 - Ft * 0.18,
              Rt = 32 / Dt;
            ((wt.me.visible = Rt > 1),
              (wt.me.renderOrder = -Ft * 4),
              wt.u.uM.value.set(dt, Kt, Ot, Ut),
              (wt.u.uZ.value = it),
              (wt.u.uPx.value = Dt));
            {
              let xt = bt.io3((A - zt) * 1.6 + 1.4),
                Wt = Math.max(1, e.w / 1920) + 0.002,
                Xt = Math.max(1, e.h / 1080) + 0.002;
              wt.u.uExt.value.set(zt ? K(1, Wt, xt) : Wt * 1.3, zt ? K(1, Xt, xt) : Xt * 1.3);
            }
            if (wt.pen) {
              wt.pen.visible = Rt > 40;
              let xt = wt.pen.material.uniforms;
              (xt.uM.value.copy(wt.u.uM.value),
                (xt.uZ.value = it - 0.03),
                (xt.uPx.value = Dt),
                xt.uChild.value.copy(wt.u.uChild.value),
                xt.uMean.value.copy(wt.u.uMean.value),
                xt.uExt.value.copy(wt.u.uExt.value),
                (wt.pen.renderOrder = -Ft * 4 - 1));
            }
            if (wt.tag) {
              wt.tag.visible = Rt > 30;
              let xt = wt.tag.material.uniforms,
                Wt = zt + 1;
              if (wt.ver !== Wt) {
                wt.ver = Wt;
                let Xt = "v" + Wt,
                  Vt = 0.42;
                for (let St = 0; St < 4; St++) {
                  let _t = St < Xt.length ? r.indexOf(Xt[St]) : 0,
                    Yt = St < Xt.length ? c[_t] : 0;
                  (xt.uDig.value.setComponent(St, _t),
                    xt.uOff.value.setComponent(St, Vt),
                    xt.uWid.value.setComponent(St, Yt),
                    (Vt += Yt + (Yt ? 0.02 : 0)));
                }
                ((Vt += 0.4), (xt.uN.value = Vt));
                let Q = 2.5,
                  Lt = Vt * Q * 0.75,
                  [yt, It] = wt.d.tag.c;
                xt.uRect.value.set(yt * (16 - Lt / 2), It * (9 - Q / 2), Lt, Q);
              }
              (xt.uM.value.copy(wt.u.uM.value),
                (xt.uZ.value = it - 0.06),
                (wt.tag.renderOrder = -Ft * 4 - 2));
            }
          },
          I = dt,
          et = Kt,
          Tt = Ot,
          vt = Ut;
        for (let zt = 0; zt <= DA; zt++) {
          O(j + zt, zt + 1);
          let [Ft, wt, mt, Dt] = Pa[Ar(j + zt)].child,
            it = mt * Math.cos(Dt),
            Rt = mt * Math.sin(Dt);
          ((Ot += dt * Ft - Kt * wt), (Ut += Kt * Ft + dt * wt));
          let xt = dt * it - Kt * Rt;
          ((Kt = Kt * it + dt * Rt), (dt = xt));
        }
        if (j > 0) {
          let [zt, Ft, wt, mt] = Pa[Ar(j - 1)].child,
            Dt = Math.cos(-mt) / wt,
            it = Math.sin(-mt) / wt;
          ((dt = I * Dt - et * it),
            (Kt = et * Dt + I * it),
            (Ot = Tt - (dt * zt - Kt * Ft)),
            (Ut = vt - (Kt * zt + dt * Ft)),
            O(j - 1, 0));
        }
        for (let zt of _) {
          let Ft = p[zt[0]];
          for (let wt = 1; wt < zt.length; wt++) {
            let mt = zt[wt];
            if (!Ft.on) {
              mt.mesh.visible = !1;
              continue;
            }
            let Dt = (mt.home[0] - 960) / 60,
              it = (540 - mt.home[1]) / 60;
            ((mt.x = 960 + 60 * (Ft.tx + Ft.m0 * Dt - Ft.m1 * it)),
              (mt.y = 540 - 60 * (Ft.ty + Ft.m1 * Dt + Ft.m0 * it)),
              (mt.scale = Ft.sc),
              (mt.rotation = -Math.atan2(Ft.m1, Ft.m0)),
              mt.mesh.position.set(mt.x, mt.y, 0),
              mt.mesh.scale.setScalar(mt.scale),
              (mt.mesh.rotation.z = mt.rotation),
              mt.mesh.updateMatrix(),
              mt.mesh.matrixWorld.copy(mt.mesh.matrix));
          }
        }
      }
      let at = (U, j) => {
          let J = p[Ar(U)];
          if (!J.on || J.idx !== U) return !1;
          let Pt = 960 + 60 * J.tx,
            $ = 540 - 60 * J.ty,
            tt = 1920 * J.sc + j * 2,
            W = 1080 * J.sc + j * 2;
          return (k.set(Pt - tt / 2, $ - W / 2, tt, W, -Math.atan2(J.m1, J.m0)), !0);
        },
        rt = (U, j, J) => {
          j <= 0 ? (U.mesh.visible = !1) : U.show(j, J);
        };
      return {
        async init() {
          (t.r.compile(o, e.cam), (A = 0), Et(0));
          for (let U of p)
            ((U.me.visible = !0), U.tag && (U.tag.visible = !0), U.pen && (U.pen.visible = !0));
          (t.draw(o, e.cam, n), (C.u.tA.value = n.texture));
        },
        enter(U) {
          ((G = U.beat >= 3 ? Jy(U.since(3)) : 0),
            (B = !1),
            (lt = U.beat),
            (H = U.beat >= 3),
            (ot = 0),
            (A = N = Math.min(U.beat, 2) + G));
        },
        update(U) {
          if (U.beat >= 3) {
            let ht = Jy(U.since(3));
            ((G = B ? Math.max(ht, G - U.dt * 3) : ht), G <= ht && ((G = ht), (B = !1)));
          } else
            G > 0
              ? (B || ((B = !0), G > 1 && (G = 1 + ((G - 1) % t5))),
                (G = Math.max(0, G - U.dt * (1.2 + G * 3.2))))
              : (B = !1);
          ((A = U.k(1, 0.1, 2.9, Mv) + U.k(2, 0.1, 2.9, Mv) + G),
            U.dt > 1e-5 && (ot = Ct((A - N) / U.dt, -6, 6)),
            (N = A));
          let j = U.k(3, 5, 6.6, bt.out4);
          ((ut = U.k(3, 4.6, 7, bt.io3)), (p[1].u.uK.value = U.k(1, 1.6, 3.7, Mv)));
          for (let ht of p)
            ((ht.u.uT.value = U.t + 3), ht.pen && (ht.pen.material.uniforms.uT.value = U.t + 3));
          let J = { style: "rise", by: "glyph", stagger: 0.6 };
          (rt(v, U.k(0, 0.1, 1.5, bt.lin), { style: "drop", stagger: 0.7 }),
            rt(m, U.k(0, 1.1, 2.1, bt.lin), { style: "rise", by: "word" }),
            rt(g, U.k(1, 1.9, 3.2, bt.lin), J),
            rt(b, U.k(1, 2.7, 3.6, bt.lin), { style: "rise", by: "word" }),
            rt(y, U.k(1, 1.9, 2.6, bt.lin), J),
            rt(S, U.k(1, 2.2, 2.9, bt.lin), { style: "fade" }),
            rt(M, U.k(1, 2.7, 3.5, bt.lin), J),
            rt(w, U.k(1, 3.1, 3.8, bt.lin), { style: "fade" }));
          {
            let ht = U.at(2);
            ht < 1.95
              ? (E.mesh.visible = !1)
              : E.animate((gt, dt) => {
                  let Kt = gt.line,
                    Ot = Kt ? 2.95 : 1.95,
                    Ut = Kt ? 0.023 : 0.046,
                    O = bt.out4((ht - Ot - gt.j * Ut) / 0.5);
                  ((dt.dy = (1 - O) * gt.size * 1.15), (dt.clip = 1), (dt.alpha = O > 0 ? 1 : 0));
                });
          }
          (rt(T, U.k(2, 3, 3.9, bt.lin), { style: "rise", by: "word" }), Et(2.35 * ut));
          let Pt = Math.floor(A + 1e-6),
            $ = A - Pt,
            tt = 0,
            W = Pt + 1;
          (A < 1
            ? (tt = U.k(0, 2.5, 3.2, bt.lin))
            : A < 2
              ? (tt = U.k(1, 3.3, 4, bt.lin))
              : A < 3
                ? (tt = U.k(2, 3.3, 4, bt.lin))
                : (tt = Ct($ / 0.3)),
            U.dir < 0 && A % 1 > 0.001 && (tt = Math.min(tt, 1)));
          let D = Ct((1 - $) / 0.16) * (1 - 0 * j);
          (tt > 0 && at(W, K(26, 5, bt.outBack(tt, 2)) + Math.sin(U.t * 2.2) * 1.2)
            ? (k.appear(tt), k.alpha(Ct(tt * 3) * D))
            : k.alpha(0),
            U.dt > 1e-5 &&
              U.dir > 0 &&
              (tt > 0 &&
                lt < W &&
                tt < 0.9 &&
                ((lt = W), i.sfx("select", { gain: A > 3 ? 0.35 : 0.8, pitch: 1 + Math.min(0.6, A * 0.03) })),
              Math.floor(A) > Z &&
                i.sfx("pop", { gain: A > 3 ? 0.3 : 0.6, pitch: 1 + Math.min(0.8, A * 0.04) }),
              ot > 0.05 &&
                Math.floor(A + 0.85) > Math.floor(A + 0.85 - ot * U.dt) &&
                A < 4 &&
                i.sfx("whoosh", { gain: 0.7 }),
              U.beat === 3 && !H && U.since(3) > 0.3 && ((H = !0), i.sfx("riser", { gain: 0.8 }))),
            U.beat < 3 && (H = !1),
            lt > W && (lt = W - 1),
            (Z = Math.floor(A)),
            i.audio.param("speed", Ct(Math.abs(ot) / 1.6)));
          let z = C.u,
            pt = K(0.022, 0.07, Ct((Math.abs(ot) - 0.78) / 0.75)) * Ct(Math.abs(ot) * 3);
          (z.uView.value.set(e.x0, e.y0, e.w, e.h),
            z.uC.value.set(960 + 60 * st.x, 540 - 60 * st.y),
            (z.uRate.value = st.rate * ot * pt),
            (z.uTw.value = st.tw * ot * pt),
            (z.uBand.value = K(e.y1 + 30, 762, j)),
            (z.uScroll.value = A * 210 + U.t * 14),
            rt(P, U.k(3, 5.6, 7.4, bt.lin), { style: "rise", by: "glyph", stagger: 0.6 }));
        },
        render(U) {
          (t.draw(o, e.cam, n), (C.u.tA.value = n.texture), C.render(U));
          let j = Math.max(0, Math.round(((e.y1 - C.u.uBand.value) / e.h) * U.height));
          (j > 0
            ? (U.scissor.set(0, j, U.width, U.height - j),
              (U.scissorTest = !0),
              L.render(U),
              (U.scissorTest = !1),
              U.scissor.set(0, 0, U.width, U.height))
            : L.render(U),
            R.render(U));
        },
      };
    },
  };

var HA = 2.3,
  BA = 3.2,
  OA = 12e3,
  i5 = 12288,
  g0 = Math.sin,
  o5 = (i, t) => [
    14 * g0(t * 0.0113 + 0.6) + 22 * g0(t * 0.0041 + i * 0.0017 + 2),
    10 * g0(i * 0.0127 + 1.3) + 18 * g0(i * 0.0047 - t * 0.0023),
  ],
  oh = o5(0, 0),
  Ev = (i, t) => {
    let e = o5(i, t);
    return [i + e[0] - oh[0], t + e[1] - oh[1]];
  },
  VA = -150,
  sh = (() => {
    let [i, t] = Ev(0, VA);
    return new F(i, 12.5, t);
  })(),
  Ei = `
#define PX ${HA.toFixed(3)}
#define PZ ${BA.toFixed(3)}
#define PLANET ${OA.toFixed(1)}
#define MAPS ${i5.toFixed(1)}
uniform sampler2D uMap, uNoise; uniform vec3 uCam; uniform float uT, uOn, uOnBand, uDawn; uniform vec4 uFog; uniform vec4 uLamp, uCore; uniform float uHigh;
float h12(vec2 p){vec3 p3=fract(vec3(p.xyx)*.1031);p3+=dot(p3,p3.yzx+33.33);return fract((p3.x+p3.y)*p3.z);}
vec4 h42(vec2 p){vec4 p4=fract(vec4(p.xyxy)*vec4(.1031,.1030,.0973,.1099));p4+=dot(p4,p4.wzxy+33.33);return fract((p4.xxyz+p4.yzzw)*p4.zywx);}
vec2 warpD(vec2 p){ return vec2(14.*sin(p.y*.0113+.6)+22.*sin(p.y*.0041+p.x*.0017+2.)-(${oh[0].toFixed(6)}), 10.*sin(p.x*.0127+1.3)+18.*sin(p.x*.0047-p.y*.0023)-(${oh[1].toFixed(6)})); }
vec2 unwarp(vec2 w){ vec2 l=w-warpD(w); l=w-warpD(l); l=w-warpD(l); return w-warpD(l); }
vec4 mapAt(vec2 p,float lod){ return textureLod(uMap,p/MAPS+.5,lod); }
float drop(vec2 p){ vec2 d=p-uCam.xz; return dot(d,d)/(2.*PLANET); }
// attention: sharp fronts that decay behind them, bent by noise, at three scales. ~0..1.6
float attention(vec2 p){
  float n=textureLod(uNoise,p*.00021+.13,0.).r, m=textureLod(uNoise,p*.0011+vec2(.5,.2),0.).g, q=textureLod(uNoise,p*.0052,0.).b;
  float a=fract(uT*.085-dot(p,vec2(.00032,-.00051))-n*1.5), b=fract(uT*.16+dot(p,vec2(.0023,.0031))+m*1.7), c=fract(uT*.34-dot(p,vec2(-.011,.017))+q*1.3);
  return smoothstep(0.,.035,a)*exp(-a*4.6)*(1.+2.0*uHigh)+smoothstep(0.,.05,b)*exp(-b*4.8)*.95+smoothstep(0.,.12,c)*exp(-c*3.4)*.30;
}
float onAt(vec2 w,float jit){ float d=length(w*vec2(1.,w.y<0.?.64:1.)); float n=textureLod(uNoise,w*.0013+.7,1.).r; d*=.72+.56*n; d+=jit*(3.+d*.13); return smoothstep(0.,1.,(uOn-d)/(2.5+d*uOnBand)); }
// how much lamplight hangs in the air over p
float glowAt(vec2 p,float lod){ vec4 m=mapAt(p,lod); return m.g*onAt(p,0.)*(.5+.75*attention(p)); }
float glow0(vec2 p,float lod){ vec4 m=mapAt(p,lod); if(m.g<.003) return 0.; return m.g*smoothstep(0.,1.,(uOn-length(p*vec2(1.,p.y<0.?.64:1.)))/(2.5+uOn*.12)); }
const vec3 PAPERLIGHT=vec3(1.,.91,.78);
float tauOf(vec3 a,vec3 b){ float H=uFog.y, d=length(b-a), dy=b.y-a.y; float ea=exp(-max(a.y,0.)/H), eb=exp(-max(b.y,0.)/H); float m=abs(dy)<.8?.5*(ea+eb):H*(ea-eb)/dy; return uFog.x*d*m; }
float pointScatter(vec3 ro,vec3 rd,float tmax,vec3 lp,float ext,out vec3 cp){ vec3 q=ro-lp; float b=dot(rd,q), c=dot(q,q); float h=sqrt(max(c-b*b,1e-3)); cp=ro-rd*min(b,0.); return (atan((tmax+b)/h)-atan(b/h))/h*exp(-h*ext); }
float wisps(vec3 p){ return textureLod(uNoise,p.xy*vec2(.05,.09)+vec2(uT*.006,-uT*.004),0.).r*textureLod(uNoise,p.zy*vec2(.06,.11)-vec2(uT*.007,uT*.003)+.4,0.).g; }
// returns colour to add and transmittance in a
vec4 fogX(vec3 b,float sky){
  vec3 a=uCam; float d=length(b-a); vec3 rd=(b-a)/d; float mist=.72+.56*textureLod(uNoise,mix(a.xz,b.xz,.6)*.0034+vec2(uT*.0035,0.),sky>.5?5.5:3.).r;
  float tau=tauOf(a,b)*mist; float T=exp(-tau);
  float g=.42*(sky>.5?glow0(b.xz,6.):glowAt(b.xz,4.5))+.36*glow0(mix(a.xz,b.xz,.55),5.)+.22*glow0(mix(a.xz,b.xz,.22),5.);
  vec3 c=vec3(.0055,.0084,.0100)*uFog.w+PAPERLIGHT*vec3(1.,.95,.9)*g*uFog.z; vec3 add=c*(1.-T);
  float e=exp(-max(min(a.y,b.y),0.)/uFog.y);
  vec3 cp; if(uLamp.w>0.){ float ps=pointScatter(a,rd,d,uLamp.xyz,.30,cp); add+=vec3(1.,.90,.74)*ps*uLamp.w*(.25+3.2*wisps(cp)); }
  if(uCore.w>0.){ float ps=pointScatter(a,rd,d,uCore.xyz,.035,cp); add+=vec3(1.,.87,.68)*ps*uCore.w*(.5+2.2*wisps(cp*.12)); }
  return vec4(add,T);
}
vec4 fogTo(vec3 b){ return fogX(b,0.); }
vec3 tintAt(vec2 p,vec4 r){ float z=textureLod(uNoise,p*.0041+.21,0.).b, y=textureLod(uNoise,p*.00043+.6,0.).r; float k=smoothstep(.36,.64,z*.45+y*.4+.15*r.x+(r.y-.5)*.16); vec3 t=mix(vec3(1.,.85,.64),vec3(.86,.955,1.),k); t=mix(t,vec3(1.,.95,.86),.30*(1.-abs(k-.5)*2.)); return fract(r.z*17.3)<.022?vec3(1.,.52,.16):t; }
struct Sheet{ vec3 p; float on,yaw,lean,lum,sun,sc; vec4 r; vec2 lat,blk; };
uniform vec3 uProb; uniform float uSun, uSunR;
bool sheetAt(ivec2 ci,out Sheet S){
  vec2 c=vec2(ci), B=vec2(14.,6.), b=floor(c/B), l=c-b*B; S.blk=b;
  if(l.x<.5||l.y<.5||abs(c.x)<3.5) return false;
  vec2 D=mod(c+vec2(42.,24.),vec2(84.,48.)); if(D.x<3.||D.y<2.) return false;
  vec4 r=h42(c+.37), rb=h42(b*1.7+19.1); S.r=r;
  vec2 lat=c*vec2(PX,PZ); float y=0., lean=.11; float yaw=rb.y<.66?0.:rb.y<.82?3.14159:(rb.z<.5?1.5708:-1.5708);
  if(rb.x<.2){ lat.y=(b.y*6.+3.)*PZ; y=(l.y-1.)*1.04; lean=0.; yaw=rb.y<.66?0.:3.14159; }
  else if(rb.x<.36){ float k=yaw>1.6?l.y-1.:5.-l.y; y=k*.75; lean=.2; if(abs(yaw-1.57)<.1||yaw<-1.) yaw=0.; }
  S.lat=lat; vec2 w=lat+warpD(lat); w+=(r.xy-.5)*vec2(.18,.3)*(rb.x<.2?0.:1.);
  vec4 m=mapAt(w,0.); if(r.z>m.g*1.12-.02) return false;
  if(length(w-uProb.xz)<25.+3.*sin(atan(w.y-uProb.z,w.x-uProb.x)*5.)) return false;
  S.on=onAt(w,r.y-.5); S.yaw=yaw+(r.x-.5)*.22; S.lean=lean+(r.w-.5)*.07;
  S.lum=(.45+.75*fract(r.w*7.31))*(.40+1.05*rb.w*rb.w)*(.6+.7*m.a); if(fract(r.x*13.7)<.035) S.lum*=.07; S.sc=1.; if(rb.x>.36&&rb.x<.44){ if(mod(l.x,4.)!=2.||mod(l.y,3.)!=1.) return false; S.sc=3.2; S.lum*=1.35; }
  S.p=vec3(w.x,max(m.r,0.)+.16+y+.05*sin(uT*.9+r.x*40.),w.y);
  float dp=length(w-uProb.xz); S.sun=uSun>0.?smoothstep(0.,1.,(uSun*(uSunR+60.)-dp)/46.)*smoothstep(uSunR,uSunR-12.,dp+ (r.y-.5)*10.):0.;
  return true;
}
`;

function s5(i) {
  let t = i.target({ w: 2048, h: 2048, mips: !0, filter: He }),
    e = i.pass(
      Fe +
        `
  #define MAPS ${i5.toFixed(1)}
  float f3(vec2 p){float a=.5,s=0.;mat2 m=mat2(.8,.6,-.6,.8);for(int i=0;i<3;i++){s+=a*vnoise(p);p=m*p*2.03;a*=.42;}return s;}
  float ax(float z){ return 14.*sin(z*.0113+.6)+22.*sin(z*.0041+2.)-(${oh[0].toFixed(5)}); }
  void main(){ vec2 wp=(vUv-.5)*MAPS; float r=length(wp);
    vec2 q=wp+260.*(vec2(fbm(wp*.0011+7.),fbm(wp*.0011+31.))-.5)*2.;
    float rn=f3(q*.00062+3.3), rg=1.-abs(rn*2.-.88); float ridge=smoothstep(.84,1.,rg); ridge*=ridge;
    float rn2=f3(q*.0015+13.3), rg2=smoothstep(.86,1.,1.-abs(rn2*2.-.88));
    float far=smoothstep(360.,1000.,r);
    float vx=abs(wp.x-ax(wp.y))+60.*(f3(wp*.005)-.45); float valley=smoothstep(120.,420.,vx)*exp(-pow(abs(wp.y+120.)/640.,4.));
    float H=(78.*ridge+26.*rg2*rg2)*far*(.55+.9*f3(q*.003+2.))+74.*valley*valley*(.5+1.1*f3(wp*.005+5.));
    // coast: land to the north, sea to the south, bays and inland lakes
    float L=clamp((980.-wp.y)/900.,-2.,.62)+1.9*(fbm(wp*.00085+11.)-.5)+.42*(fbm(wp*.0043+4.)-.5)+1.5*exp(-r*r/(620.*620.))-1.35*exp(-pow((wp.x+1250.)/760.,2.)-pow((wp.y-640.)/520.,2.))+.55*exp(-pow((wp.x-1500.)/900.,2.)-pow((wp.y-1150.)/500.,2.));
    float land=smoothstep(-.015,.02,L); H*=smoothstep(0.,.22,L); H=max(H,0.);
    // cortex: warped voronoi, rivers on the seams, a hub in each lobe
    vec2 v=(q+ 110.*(vec2(fbm(wp*.004),fbm(wp*.004+9.))-.5))/640.; vec2 iv=floor(v), fv=v-iv; float f1=9.,f2=9.; vec2 best;
    for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){ vec2 g=vec2(x,y); vec2 o2=hash22(iv+g+3.)*.8+.1; float d=length(g+o2-fv); if(d<f1){f2=f1;f1=d;best=iv+g;}else if(d<f2)f2=d; }
    float seam=(f2-f1)*640.*.5; float river=mix(1.,smoothstep(10.,20.,seam),smoothstep(380.,560.,r));
    float hub=exp(-f1*f1*5.5)*(.4+.6*hash12(best+.5));
    float lanes=exp(-pow((seam-34.)/16.,2.))*far;
    float blot=fbm(wp*.012+20.); float D=(.30+.75*hub+.65*lanes)+.5*smoothstep(.42,.75,blot)*.6; D=mix(D,.93,1.-smoothstep(300.,620.,r));
    D*=land*river*(1.-smoothstep(56.,95.,H)*.95)*(1.-smoothstep(.10,.5,ridge)*.97)*(1.-.75*smoothstep(.25,.8,rg2*rg2)*far)*smoothstep(.0,.05,L); float edge=1.-smoothstep(5200.,6050.,max(abs(wp.x),abs(wp.y)));
    o=vec4(H*edge,clamp(D,0.,1.)*edge,land,clamp(hub+lanes*.6+(1.-smoothstep(250.,560.,r))*.35,0.,1.2)); }`,
    );
  return (e.render(t), e.dispose(), (t.texture.wrapS = t.texture.wrapT = ei), t);
}

function a5(i) {
  let t = i.target({ w: 256, h: 256, mips: !0, wrap: an, type: Nn }),
    e =
      i.pass(`float h(vec2 p,float s){p=mod(p,s);vec3 a=fract(vec3(p.xyx)*.1031+s*.013);a+=dot(a,a.yzx+33.33);return fract((a.x+a.y)*a.z);}
  float vn(vec2 p,float s){vec2 i=floor(p),f=p-i;f=f*f*f*(f*(f*6.-15.)+10.);return mix(mix(h(i,s),h(i+vec2(1,0),s),f.x),mix(h(i+vec2(0,1),s),h(i+vec2(1,1),s),f.x),f.y);}
  float fb(vec2 u,float s){float a=.5,r=0.,n=0.;for(int i=0;i<5;i++){r+=a*vn(u*s+float(i)*s*.5,s);n+=a;s*=2.;a*=.52;}return r/n;}
  void main(){ o=vec4(fb(vUv,8.),fb(vUv.yx,11.),fb(vUv,13.),fb(vUv.yx,17.)); o=clamp((o-.5)*1.6+.5,0.,1.); }`);
  return (e.render(t), e.dispose(), t);
}

var vc = 1024,
  Rr = 576;

function r5(i) {
  let t = document.createElement("canvas");
  ((t.width = vc * 4), (t.height = Rr * 4));
  let e = t.getContext("2d");
  ((e.fillStyle = "#000"), e.fillRect(0, 0, t.width, t.height));
  let n = 64,
    o = new Float32Array(n * 32 * 4),
    s = "aeiou",
    a = "bcdfglmnprstv",
    r,
    l = () => {
      let v = "",
        m = 1 + ((r() * 3) | 0);
      for (let g = 0; g < m; g++)
        v += a[(r() * a.length) | 0] + s[(r() * s.length) | 0] + (r() < 0.3 ? a[(r() * a.length) | 0] : "");
      return v;
    },
    c = [
      "\u2200",
      "\u2203",
      "\u03BB",
      "\u22A2",
      "\u2192",
      "\u21A6",
      "\u2264",
      "\u2211",
      "\u222B",
      "\u211D",
      "\u2102",
      "\u03B5",
      "\u03B4",
      "\u03B6",
      "\u27E8",
      "\u27E9",
      "\u2202",
      "\u2016",
      "\u2208",
      "\u2227",
      "\xAC",
      ":=",
    ],
    u = () => {
      let v = r();
      return v < 0.34
        ? c[(r() * c.length) | 0]
        : v < 0.5
          ? "xyzhnkstu"[(r() * 9) | 0] + "\u2080\u2081\u2082\u2083"[(r() * 4) | 0]
          : v < 0.62
            ? "(" + l().slice(0, 3) + ")"
            : v < 0.72
              ? "." + l()
              : l();
    };
  for (let v = 0; v < 16; v++) {
    r = ze(v * 77 + 5);
    let m = (v % 4) * vc,
      g = (v >> 2) * Rr,
      b = [],
      y = [],
      S = 0,
      M = [],
      w = (P, C, A, N, G, B, ot = !1) => {
        let ut = ot
            ? e.createLinearGradient(0, g + C, 0, g + C + N)
            : e.createLinearGradient(m + P, 0, m + P + A, 0),
          lt = (Z) => `rgb(0,${Math.round(Ct(Z) * 255)},0)`;
        (ut.addColorStop(0, lt(G)),
          ut.addColorStop(1, lt(B)),
          (e.fillStyle = ut),
          e.fillRect(m + P, g + C, A, N));
      },
      E = (P, C = 0) => `rgba(255,0,${C ? 255 : 0},${P})`,
      T = (P, C, A, N, G, B, { a: ot = 1, acc: ut = 0, align: lt = "left" } = {}) => {
        e.font = Ln(G, N);
        let Z = e.measureText(P).width,
          H = lt === "center" ? C - Z / 2 : C,
          Y = S,
          q = S + B;
        return (
          (S = q),
          M.push(() => {
            ((e.font = Ln(G, N)),
              (e.fillStyle = E(ot, ut)),
              (e.textBaseline = "alphabetic"),
              (e.textAlign = "left"),
              e.fillText(P, m + H, g + A));
          }),
          w(H - 4, A - N * 1, Z + 8, N * 1.36, Y, q),
          b.push([Y, q, H, H + Z, A - N * 0.36, N * 1.1]),
          [H, A - N, Z, N * 1.3]
        );
      },
      _ = (P, C, A, N = !1) => {
        let G = S;
        return (
          (S += A),
          w(C[0], C[1], C[2], C[3], G, S, N),
          M.push(() => {
            (e.save(), e.beginPath(), e.rect(m, g, vc, Rr), e.clip(), e.translate(m, g), P(), e.restore());
          }),
          b.push([G, S, C[0], N ? C[0] : C[0] + C[2], C[1] + C[3] / 2, 26]),
          C
        );
      },
      R = (P, C, A, N, G, B, ot, ut) => {
        for (let lt = 0; lt < N; lt++) {
          let Z = "";
          for (e.font = Ln(B, G); e.measureText(Z).width < A * (lt === N - 1 ? 0.55 : 0.9);)
            Z += l() + (r() < 0.1 ? ", " : " ");
          T(Z.trim(), P, C + lt * G * 1.5, G, B, ot, ut);
        }
      },
      L = [0, 1, 2, 3, 4, 5, 0, 6, 1, 3, 7, 2, 8, 4, 0, 9][v];
    if (L === 0) {
      let P = 0;
      for (let C = 0; C < 13; C++) {
        let A = "",
          N = 3 + ((r() * 7) | 0);
        for (let G = 0; G < N; G++) A += u() + " ";
        (T(A, 66 + P * 34, 74 + C * 37, 24, "mono", 0.075, {
          acc: r() < 0.22 ? 1 : 0,
          a: r() < 0.2 ? 0.55 : 1,
        }),
          (P = Ct(P + ((r() * 3) | 0) - 1, 0, 5)),
          r() < 0.1 && (P = 0));
      }
    }
    if (L === 1) {
      T(l() + " " + l(), 70, 118, 64, "display", 0.12);
      for (let P = 0; P < 4; P++)
        y.push(T("\u2022 " + l() + " " + l() + " " + l() + " " + l(), 80, 216 + P * 76, 40, "text", 0.19));
    }
    if (L === 2) {
      (y.push(T(l() + " " + l(), 64, 84, 40, "textBold", 0.07)),
        _(
          () => {
            ((e.strokeStyle = E(0.9)),
              (e.lineWidth = 3),
              e.beginPath(),
              e.moveTo(84, 130),
              e.lineTo(84, 500),
              e.lineTo(950, 500),
              e.stroke(),
              (e.strokeStyle = E(0.16)),
              (e.lineWidth = 2));
            for (let A = 1; A < 6; A++)
              (e.beginPath(), e.moveTo(84, 500 - A * 62), e.lineTo(950, 500 - A * 62), e.stroke());
          },
          [70, 120, 890, 390],
          0,
        ));
      let P = 3;
      M.push(() => {});
      let C = S;
      (w(84, 124, 880, 370, C, C + 0.78), (S += 0.78), b.push([C, S, 84, 950, 300, 30]));
      for (let A = 0; A < P; A++) {
        let N = 1.2 + r() * 2.4,
          G = r() * 6,
          B = 0.3 + r() * 0.6,
          ot = v;
        M.push(() => {
          (e.save(),
            e.translate(m, g),
            (e.strokeStyle = E(A ? 0.75 : 1, A === 0 ? 1 : 0)),
            (e.lineWidth = A ? 4 : 7),
            (e.lineJoin = "round"),
            e.beginPath());
          for (let ut = 0; ut <= 220; ut++) {
            let lt = ut / 220,
              Z =
                470 -
                330 *
                  Ct(
                    Math.pow(lt, N) * B +
                      0.08 * Math.sin(lt * 14 + G) * (1 - lt * 0.4) +
                      0.12 +
                      A * 0.06 * lt +
                      0.05 * Math.sin(lt * 47 + ot),
                  );
            ut ? e.lineTo(84 + lt * 840, Z) : e.moveTo(84, Z);
          }
          if ((e.stroke(), A === 1)) {
            e.fillStyle = E(0.8);
            let ut = ze(v + 9);
            for (let lt = 0; lt < 60; lt++) {
              let Z = ut(),
                H = 470 - 330 * Ct(Math.pow(Z, N) * B + 0.14 + (ut() - 0.5) * 0.22);
              (e.beginPath(), e.arc(84 + Z * 840, H, 5.5, 0, 7), e.fill());
            }
          }
          e.restore();
        });
      }
      y.push([600, 150, 300, 170]);
    }
    if (L === 3) {
      let C = [];
      for (let A = 0; A < 7; A++) C.push([80 + (A % 4) * 238, 90 + (A >> 2) * 210 + (A % 2) * 46, 168, 92]);
      (C.forEach((A, N) => {
        (y.push(
          _(
            () => {
              ((e.strokeStyle = E(1, N === 2 ? 1 : 0)),
                (e.lineWidth = 6),
                e.beginPath(),
                e.roundRect(A[0], A[1], A[2], A[3], N % 3 === 1 ? 46 : 8),
                e.stroke(),
                N % 4 === 0 && ((e.fillStyle = E(0.14)), e.fill()));
            },
            [A[0] - 4, A[1] - 4, A[2] + 8, A[3] + 8],
            0,
          ),
        ),
          (S += 0.045),
          (b[b.length - 1][1] = S));
      }),
        (S = 0.04),
        C.forEach((A, N) => {
          let G = 0.03 + N * 0.13;
          w(A[0] - 5, A[1] - 5, A[2] + 10, A[3] + 10, G, G + 0.07);
          let B = l();
          if (
            (M.push(() => {
              ((e.font = Ln("textMed", 26)),
                (e.fillStyle = E(1)),
                (e.textAlign = "center"),
                e.fillText(B, m + A[0] + A[2] / 2, g + A[1] + A[3] / 2 + 9),
                (e.textAlign = "left"));
            }),
            (b[N] = [G, G + 0.07, A[0], A[0] + A[2], A[1] + 46, 40]),
            N < 6)
          ) {
            let ot = C[N + 1],
              ut = A[0] + A[2],
              lt = A[1] + 46,
              Z = ot[0],
              H = ot[1] + 46,
              Y = Z > ut,
              q = Math.min(ut, Z),
              st = Math.max(ut, Z),
              ct = Math.min(lt, H) - 8,
              V = Math.max(lt, H) + 8;
            Y &&
              (w(ut + 5, ct, Z - ut - 10, V - ct, G + 0.07, G + 0.13),
              M.push(() => {
                (e.save(),
                  e.translate(m, g),
                  (e.strokeStyle = E(0.9)),
                  (e.lineWidth = 5),
                  e.beginPath(),
                  e.moveTo(ut + 6, lt),
                  e.bezierCurveTo(ut + 40, lt, Z - 40, H, Z - 8, H),
                  e.stroke(),
                  e.beginPath(),
                  e.moveTo(Z - 20, H - 9),
                  e.lineTo(Z - 7, H),
                  e.lineTo(Z - 20, H + 9),
                  e.stroke(),
                  e.restore());
              }));
          }
        }),
        b.sort((A, N) => A[0] - N[0]),
        (S = 1));
    }
    if (L === 4) {
      for (let A = 0; A < 6; A++)
        for (let N = 0; N < 5; N++)
          (N === 0
            ? T(l(), 66, 112 + A * 80, 28, A ? "text" : "textBold", 0.04)
            : T(
                A ? ((r() * 999) | 0) + "." + ((r() * 10) | 0) : l().slice(0, 4),
                300 + (N - 1) * 170,
                112 + A * 80,
                28,
                A ? "mono" : "textBold",
                0.03,
                { acc: r() < 0.12 ? 1 : 0 },
              ),
            N === 1 && A && y.push([288, 112 + A * 80 - 38, 150, 54]));
      M.push(() => {
        e.fillStyle = E(0.35);
        for (let A = 0; A < 6; A++) e.fillRect(m + 60, g + 134 + A * 80, 900, 2);
      });
      for (let A = 0; A < 6; A++) w(56, 130 + A * 80, 910, 8, 0.01, 0.06);
    }
    if (L === 5) {
      let P = () => {
        let C = "";
        for (let A = 0; A < 3 + r() * 3; A++)
          C +=
            [
              "\u2202",
              "\u2207",
              "u",
              "\u03BD",
              "\u0394",
              "p",
              "\u03B6",
              "s",
              "\u2211",
              "\u221E",
              "\xBD",
              "\u0393",
            ][(r() * 12) | 0] +
            ["", "\xB2", "\u2080", "\u2099", "\u2032"][(r() * 5) | 0] +
            [" + ", " \u2212 ", " = ", " \xB7 ", " \u2264 "][(r() * 5) | 0];
        return C.slice(0, -3);
      };
      for (let C = 0; C < 4; C++) {
        let A = T(P() + " = " + P(), 512, 130 + C * 110, 58 - C * 4, C % 2 ? "serif" : "serifIt", 0.16, {
          align: "center",
          acc: C === 3 ? 1 : 0,
        });
        (y.push(A),
          C % 2 && T(P(), 512, 130 + C * 110 + 44, 24, "serifIt", 0.06, { align: "center", a: 0.7 }));
      }
    }
    if (L === 6) {
      for (let N = 0; N < 9; N++)
        for (let G = 0; G < 16; G++) {
          let B = Ct(
              0.5 + 0.5 * Math.sin(G * 0.5 + N * 0.3) * Math.cos(N * 0.7 - G * 0.2) + (r() - 0.5) * 0.3,
            ),
            ot = ((G + N * 0.7) / 25) * 0.95;
          (w(80 + G * 54, 48 + N * 54, 54, 54, ot, ot + 0.04),
            M.push(() => {
              ((e.fillStyle = E(0.08 + B * 0.85, B > 0.86 ? 1 : 0)),
                e.fillRect(m + 80 + G * 54 + 2, g + 48 + N * 54 + 2, 50, 50));
            }));
        }
      ((S = 1), b.push([0, 1, 80, 900, 280, 60]), y.push([350, 156, 216, 162]));
    }
    if (L === 7) {
      _(
        () => {
          ((e.strokeStyle = E(1)),
            (e.lineWidth = 4),
            e.beginPath(),
            e.arc(360, 290, 200, 0, 7),
            e.stroke(),
            (e.strokeStyle = E(0.9, 1)),
            e.beginPath());
          let A = [0.4, 2.3, 4.4].map((N) => [360 + Math.cos(N) * 200, 290 + Math.sin(N) * 200]);
          (A.forEach((N, G) => (G ? e.lineTo(...N) : e.moveTo(...N))),
            e.closePath(),
            e.stroke(),
            (e.strokeStyle = E(0.6)),
            (e.lineWidth = 2.5));
          for (let N of A)
            (e.beginPath(),
              e.moveTo(360, 290),
              e.lineTo(...N),
              e.stroke(),
              e.beginPath(),
              e.arc(N[0], N[1], 9, 0, 7),
              (e.fillStyle = E(1)),
              e.fill());
          (e.setLineDash([8, 8]), e.beginPath(), e.moveTo(60, 500), e.lineTo(680, 60), e.stroke());
        },
        [130, 50, 560, 480],
        0.5,
      );
      for (let A = 0; A < 7; A++)
        T(l() + " " + c[(r() * 20) | 0] + " " + l(), 690, 110 + A * 64, 25, "mono", 0.07, {
          acc: A === 3 ? 1 : 0,
        });
      y.push([160, 90, 400, 400]);
    }
    if (L === 8) {
      let C = [];
      for (let A = 0; A < 22; A++) C.push([90 + r() * 840, 60 + r() * 450, 8 + r() * 16]);
      (_(
        () => {
          ((e.strokeStyle = E(0.6)), (e.lineWidth = 2.5));
          for (let A = 0; A < 22; A++) {
            let N = C.map((G, B) => [Math.hypot(G[0] - C[A][0], G[1] - C[A][1]), B]).sort(
              (G, B) => G[0] - B[0],
            );
            for (let G = 1; G < 4; G++)
              (e.beginPath(), e.moveTo(...C[A].slice(0, 2)), e.lineTo(...C[N[G][1]].slice(0, 2)), e.stroke());
          }
          C.forEach((A, N) => {
            ((e.fillStyle = E(1, N % 7 === 0 ? 1 : 0)),
              e.beginPath(),
              e.arc(A[0], A[1], A[2], 0, 7),
              e.fill());
          });
        },
        [30, 20, 964, 536],
        0.95,
      ),
        y.push([300, 180, 260, 180]));
    }
    L === 9 &&
      (T(l() + " " + l(), 60, 90, 44, "textBold", 0.08),
      R(60, 160, 430, 11, 24, "text", 0.04, { a: 0.9 }),
      R(540, 160, 420, 5, 24, "text", 0.04, { a: 0.9 }),
      _(
        () => {
          for (let P = 0; P < 8; P++) {
            let C = 40 + 150 * Math.abs(Math.sin(P * 1.3 + 1));
            ((e.fillStyle = E(0.9, P === 5 ? 1 : 0)), e.fillRect(545 + P * 52, 530 - C, 36, C));
          }
        },
        [540, 330, 420, 205],
        0.25,
      ),
      y.push([536, 330, 424, 206]));
    let k = S > 0 ? 1 / Math.max(S, 0.001) : 1;
    e.globalCompositeOperation = "lighter";
    for (let P of M) P();
    ((e.globalCompositeOperation = "source-over"), y.length || y.push([60, 60, 300, 90]));
    for (let P = 0; P < n; P++) {
      let C = (P / (n - 1)) * 1,
        A = b.find((ot) => C >= ot[0] && C < ot[1]) || b[b.length - 1] || [0, 1, 60, 60, 60, 30],
        N = Ct((C - A[0]) / Math.max(1e-4, A[1] - A[0])),
        G = (v * 2 * n + P) * 4;
      o.set([K(A[2], A[3], N) / vc, 1 - A[4] / Rr, A[5] / Rr, C < 1 ? 1 : 0], G);
      let B = y[Math.min(y.length - 1, ((P * y.length) / n) | 0)];
      ((G = ((v * 2 + 1) * n + P) * 4),
        o.set(
          [(B[0] + B[2] / 2) / vc, 1 - (B[1] + B[3] / 2) / Rr, B[2] / 2 / vc + 0.012, B[3] / 2 / Rr + 0.02],
          G,
        ));
    }
  }
  let f = new Hn(t);
  ((f.colorSpace = Mn), (f.generateMipmaps = !0), (f.minFilter = Pn), (f.anisotropy = 8), (f.flipY = !0));
  let h = new Tn(o, n, 32, Un, An);
  ((h.minFilter = h.magFilter = Je), (h.needsUpdate = !0));
  let d = document.createElement("canvas");
  ((d.width = 2048), (d.height = 1024));
  let p = d.getContext("2d");
  ((p.fillStyle = "#000"), p.fillRect(0, 0, 2048, 1024), (r = ze(991)), (p.textBaseline = "middle"));
  for (let v = 0; v < 24; v++) {
    let m = -r() * 60,
      g = ((v + 0.5) * 1024) / 24,
      b = 0;
    for (; m < 2048;) {
      let y = u();
      p.font = Ln("mono", 33);
      let S = p.measureText(y + " ").width;
      if (m + S > 2040) break;
      let M = 0.45 + 0.55 * r();
      ((p.fillStyle = `rgba(255,255,255,${M})`),
        p.fillText(y, m, g),
        (m += S),
        r() < 0.045 && (m += 120 + r() * 260));
    }
  }
  let x = new Hn(d);
  return (
    (x.colorSpace = Mn),
    (x.wrapS = x.wrapT = an),
    (x.generateMipmaps = !0),
    (x.minFilter = Pn),
    (x.anisotropy = 16),
    { tex: f, tab: h, stream: x, canvas: t }
  );
}

var xc = `precision highp float; precision highp int; precision highp sampler2D;
`,
  y0 = `
uniform sampler2D uPages, uTab, uStreamT;
vec3 pageInk(vec2 uv,float page,float w,float sel,float px){ // px: page widths per pixel
  float prog=smoothstep(0.,1.,w/.86)*1.02; prog=mix(w/.86,prog,.3); float scroll=smoothstep(.935,.995,w); vec2 q=uv; q.y-=scroll*1.08;
  vec3 ink=vec3(0.); float inside=step(0.,q.y)*step(q.y,1.);
  vec2 a=vec2(mod(page,4.),floor(page/4.)); vec2 tc=vec2((a.x+clamp(q.x,.004,.996))/4.,1.-(a.y+1.-clamp(q.y,.004,.996))/4.);
  vec3 t=texture(uPages,tc).rgb; float shown=smoothstep(t.g-.006,t.g+.004,prog); float i=t.r*shown*inside; i=1.-pow(1.-clamp(i,0.,1.),1.9);
  vec3 paper=vec3(1.); vec3 inkc=mix(vec3(.055,.06,.07),vec3(.02,.09,.62),clamp(t.b/max(t.r,.02),0.,1.)); paper=mix(paper,inkc,i*.94);
  float detail=smoothstep(.012,.003,px);
  if(detail>0.){ int k=int(clamp(prog,0.,1.)*63.); vec4 c=texelFetch(uTab,ivec2(k,int(page)*2),0);
    if(c.w>.5&&prog<1.){ vec2 d=abs(q-vec2(c.x+.012,c.y)); float car=smoothstep(.0045+px,.0045-px*.3,d.x)*smoothstep(c.z*.55+px,c.z*.55,d.y); paper=mix(paper,vec3(.03,.1,.75),car*detail); }
    if(sel>0.){ vec4 s=texelFetch(uTab,ivec2(k,int(page)*2+1),0); vec2 b=abs(uv-s.xy)-s.zw; vec2 asp=vec2(1.,.5625); vec2 bb=b*asp; float d=abs(max(bb.x,bb.y)); d=max(d,0.); float ln=smoothstep(.0022+px*.6,.0008,d)*step(max(bb.x,bb.y),.004);
      float h=1e3; for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){ if(x==0&&y==0)continue; h=min(h,length((uv-s.xy-vec2(x,y)*s.zw)*asp)); } h=min(h,length((uv-s.xy-vec2(0.,s.w+.055))*asp));
      vec3 blue=vec3(.0242,.107,1.); paper=mix(paper,blue,ln*detail*sel*.95); paper=mix(paper,blue,smoothstep(.0085+px*.5,.0085-px*.5,h)*detail*sel); paper=mix(paper,vec3(1.),smoothstep(.0058+px*.5,.0058-px*.5,h)*detail*sel); } }
  return paper; }
`,
  GA = `
void frame(Sheet S,out vec3 r,out vec3 u,out vec3 n){
  float lean=mix(1.5,S.lean,S.on); vec3 n0=vec3(sin(S.yaw),0.,cos(S.yaw)); n=n0*cos(lean)+vec3(0,1,0)*sin(lean);
  if(S.sun>0.){ vec3 d=normalize(uProb-S.p); n=normalize(mix(n,d,S.sun)); }
  r=normalize(cross(vec3(0,1,0),n+vec3(1e-4,0.,0.))); u=cross(n,r); }
`;

function l5(i, t, e, { W: n = 300, H: o = 272 } = {}) {
  let s = new Oe();
  (s.setAttribute(
    "position",
    new $t(new Float32Array([-0.8, 0, 0, 0.8, 0, 0, 0.8, 0.9, 0, -0.8, 0.9, 0]), 3),
  ),
    s.setIndex([0, 1, 2, 0, 2, 3]),
    (s.instanceCount = n * o));
  let a = (r) => {
    let l = {
        ...t,
        uPages: { value: e.tex },
        uTab: { value: e.tab },
        uStreamT: { value: e.stream },
        uFocus: { value: new Nt() },
        uProj: { value: 1500 },
        uQuadK: { value: 1 },
        uStream: { value: 0 },
      },
      c = new ce({
        glslVersion: re,
        side: oe,
        uniforms: l,
        vertexShader:
          xc +
          Ei +
          GA +
          `in vec3 position; uniform mat4 projectionMatrix,viewMatrix; uniform vec2 uFocus; uniform float uProj,uQuadK,uStream;
      out vec2 vUv,vSt; out vec3 vTint; out vec4 vFog; out vec3 vW; flat out vec4 vP; out float vLum; flat out vec3 vN;
      void main(){ ivec2 c=ivec2(gl_InstanceID%${n},gl_InstanceID/${n})-ivec2(${n / 2},${o / 2})+ivec2(uFocus); Sheet S; gl_Position=vec4(2.,2.,2.,1.);
        if(uQuadK<=0.||!sheetAt(c,S)) return; if(S.on<=.002) return; vec3 d3=S.p-uCam; float dist=length(d3); float px=1.6*S.sc*uProj/dist; if(px<1.1) return;
        vec4 ch=projectionMatrix*viewMatrix*vec4(S.p.x,(${r ? "-" : ""}S.p.y)-drop(S.p.xz),S.p.z,1.); float mg=3.*ch.w/dist*2.+3.; if(ch.w<-3.||abs(ch.x)>ch.w*1.02+mg*2.||abs(ch.y)>ch.w*1.02+mg*2.5) return;
        vec3 r,u,n; frame(S,r,u,n); float sc=S.sc*mix(.9,1.,S.on)*smoothstep(1.1,2.2,px); vec2 q=position.xy*sc; vec3 w=S.p+r*q.x+u*q.y; if(S.sun>0.) w+=u*(-.45*sc)*0.;
        vW=w; vN=n; w.y=${r ? "-w.y" : "w.y"}; w.y-=drop(w.xz); gl_Position=projectionMatrix*viewMatrix*vec4(w,1.);
        vUv=position.xy/vec2(1.6,.9)+vec2(.5,0.); vSt=vec2((S.lat.x+position.x),S.p.y-.16+position.y);
        float per=9.+9.*S.r.z; float cyc=uT/per+S.r.x*7.; float pg=floor(h12(vec2(floor(cyc),S.r.y*91.))*16.); vP=vec4(pg,fract(cyc),S.r.w<.3?1.:0.,S.sun);
        float at=attention(S.p.xz); vLum=S.lum*S.on*S.on*(.55+1.25*at)*mix(1.,1.35,S.sun);
        vTint=tintAt(S.p.xz,S.r); vLum=mix(vLum,(.74+.55*at)*(.6+.4*S.r.w)*(1.-.66*uStream)+.25*vLum,S.sun*.85); vLum*=1.+.5*smoothstep(60.,320.,dist)+.32*smoothstep(80.,16.,dist);
        vFog=${r ? "vec4(0.,0.,0.,1.)" : "fogTo(vW)"}; }`,
        fragmentShader:
          xc +
          Ei +
          y0 +
          `in vec2 vUv,vSt; in vec3 vTint; in vec4 vFog; in vec3 vW; flat in vec4 vP; in float vLum; flat in vec3 vN; uniform float uStream; out vec4 o;
      void main(){ vec2 uv=vUv; bool front=dot(uCam-vW,vN)>0.; if(!front) uv.x=1.-uv.x; float px=length(fwidth(vUv))*.7;
        ${
          r
            ? "vec3 c=vec3(1.);"
            : `vec3 c=pageInk(uv,vP.x,vP.y,vP.z,px);
        float sk=uStream*smoothstep(0.,.35,uStream*1.4-length(vW.xz-uProb.xz)*.0022); if(sk>0.){ float row=floor(vSt.y*7.5); vec2 su=vec2(vSt.x*.16-uT*(.35+.22*h12(vec2(row,3.)))*1.,fract(vSt.y*7.5)/24.+row*(5./24.)); float s=textureGrad(uStreamT,su,dFdx(vec2(vSt.x*.16,vSt.y*.3)),dFdy(vec2(vSt.x*.16,vSt.y*.3))).r; float run=pow(.5+.5*sin(vSt.x*.12-uT*(2.5+1.5*h12(vec2(row,8.)))+row*1.7),6.); c=mix(c,mix(vec3(.66+1.6*run),vec3(.06,.06,.07),min(1.,s*1.4)),smoothstep(0.,.3,sk)); }`
        }
        vec2 e=abs(vUv-.5)*2.; float edge=.9+.14*(1.-max(e.x*e.x,e.y*e.y)); float fr=front?1.:.36; c=front?c:mix(c,vec3(1.,.86,.66),.55);
        vec3 col=c*vTint*vLum*edge*fr*2.3; o=vec4(col*vFog.a+vFog.rgb,1.); }`,
      }),
      u = new Zt(s, c);
    u.frustumCulled = !1;
    let f = new ge();
    return (f.add(u), { mesh: u, m: c, u: l, scene: f });
  };
  return { main: a(!1), mirror: a(!0) };
}

function b0(i, t, { W: e = 1024, H: n = 1024, stride: o = 1 } = {}) {
  let s = {
      ...t,
      uFocus: { value: new Nt() },
      uProj: { value: 1500 },
      uK: { value: 1 },
      uHole: { value: new ie(0, 0, -1, -1) },
      uSplat: { value: 1 },
    },
    a = new Qt();
  a.setDrawRange(0, e * n);
  let r = new ce({
      glslVersion: re,
      uniforms: s,
      transparent: !0,
      depthWrite: !1,
      depthTest: !0,
      blending: Ie,
      blendSrc: pe,
      blendDst: pe,
      blendSrcAlpha: wo,
      blendDstAlpha: pe,
      vertexShader:
        xc +
        Ei +
        `uniform mat4 projectionMatrix,viewMatrix; uniform vec2 uFocus; uniform float uProj,uK,uSplat; uniform vec4 uHole; out vec3 vC;
    void main(){ ivec2 c=(ivec2(gl_VertexID%${e},gl_VertexID/${e})-ivec2(${e / 2},${n / 2}))*${o}+ivec2(uFocus); gl_Position=vec4(2.,2.,2.,1.); gl_PointSize=1.;
      if(uK<=0.||(abs(float(c.x)-uHole.x)<uHole.z&&abs(float(c.y)-uHole.y)<uHole.w)) return;
      vec2 rough=vec2(c)*vec2(PX,PZ); rough+=warpD(rough); vec4 cl=projectionMatrix*viewMatrix*vec4(rough.x,-drop(rough),rough.y,1.); if(cl.w<1.||abs(cl.x)>cl.w*1.05||abs(cl.y)>cl.w*1.3) return;
      Sheet S; if(!sheetAt(c,S)||S.on<=.002) return; vec3 p=S.p+vec3(0.,.45,0.); vec3 dv=uCam-p; float dist=length(dv); float px=uProj/dist*1.6; float k=uK*smoothstep(7.,3.2,px); if(k<=0.) return;
      vec3 w=p+dv*.012; w.y-=drop(p.xz); gl_Position=projectionMatrix*viewMatrix*vec4(w,1.);
      vec2 n=vec2(sin(S.yaw),cos(S.yaw)); float face=.30+.70*max(dot(n,normalize(dv.xz)),0.);
      float at=attention(p.xz); float L=S.lum*S.on*S.on*mix(.24+1.5*at,.09+1.5*at,uHigh)*face*S.sc*S.sc; float big=1.+3.*step(.985,S.r.x)*S.r.w; L*=big;
      float area=px*px*.5625*${(o * o * 0.62).toFixed(3)}; float size=clamp(px*1.1,2.,6.); L*=min(area/(size*size*.42),6.);
      vec3 tint=tintAt(p.xz,S.r); tint*=tint*tint; vec4 f=fogTo(p);
      vC=tint*L*f.a*k*(2.9+1.5*uHigh); gl_PointSize=size; }`,
      fragmentShader:
        xc +
        "in vec3 vC; out vec4 o; void main(){ vec2 d=gl_PointCoord*2.-1.; float r=dot(d,d); o=vec4(vC*exp(-r*2.2)*smoothstep(1.,.6,r),0.); }",
    }),
    l = new Zi(a, r);
  l.frustumCulled = !1;
  let c = new ge();
  return (c.add(l), { mesh: l, m: r, u: s, scene: c });
}

function c5(i, t) {
  let e = new Ke(1.6, 0.9),
    n = {
      ...i,
      uPages: { value: t.tex },
      uTab: { value: t.tab },
      uStreamT: { value: t.stream },
      uM: { value: new ne() },
      uPage: { value: 0 },
      uW: { value: 0 },
      uMir: { value: 0 },
      uL: { value: 1 },
      uFace: { value: 1 },
    },
    o = (s) => {
      let a = new ce({
          glslVersion: re,
          side: oe,
          uniforms: { ...n },
          vertexShader:
            xc +
            Ei +
            `in vec3 position; in vec2 uv; uniform mat4 projectionMatrix,viewMatrix,uM; out vec2 vUv; out vec3 vW; out vec4 vFog; void main(){ vUv=uv; vec3 w=(uM*vec4(position,1.)).xyz; vW=w; vFog=fogTo(w); w.y=${s ? "-w.y" : "w.y"}; w.y-=drop(w.xz); gl_Position=projectionMatrix*viewMatrix*vec4(w,1.); }`,
          fragmentShader:
            xc +
            Ei +
            y0 +
            `in vec2 vUv; in vec3 vW; in vec4 vFog; uniform float uPage,uW,uL,uFace; out vec4 o; void main(){ vec2 uv=vUv; float px=length(fwidth(vUv))*.7; bool fr=${s ? "!gl_FrontFacing" : "gl_FrontFacing"}; if(!fr) uv.x=1.-uv.x; vec3 c=pageInk(uv,uPage,uW,1.,px); vec2 e=abs(vUv-.5)*2.; float ed=.93+.1*(1.-max(e.x*e.x,e.y*e.y)); c=mix(vec3(1.),c,uFace)*vec3(1.,.965,.91)*ed*(fr?1.:.4)*uL*1.35; o=vec4(${s ? "c" : "c*vFog.a+vFog.rgb"},1.); }`,
        }),
        r = new Zt(e, a);
      return ((r.frustumCulled = !1), r);
    };
  return { main: o(!1), mirror: o(!0), u: n };
}

var gc = `precision highp float; precision highp int; precision highp sampler2D;
`;

function u5(i, t, e) {
  let s = new Float32Array(317400),
    a = new Uint32Array(229 * 460 * 6),
    r = 0;
  for (let h = 0; h < 230; h++)
    for (let d = 0; d < 460; d++) ((s[r++] = (d / 460) * Math.PI * 2), (s[r++] = h / 229), (s[r++] = 0));
  r = 0;
  for (let h = 0; h < 229; h++)
    for (let d = 0; d < 460; d++) {
      let p = h * 460 + d,
        x = h * 460 + ((d + 1) % 460),
        v = p + 460,
        m = x + 460;
      ((a[r++] = p), (a[r++] = x), (a[r++] = v), (a[r++] = x), (a[r++] = m), (a[r++] = v));
    }
  let l = new Qt();
  (l.setAttribute("position", new $t(s, 3)), l.setIndex(new $t(a, 1)));
  let c = {
      ...t,
      uRefl: { value: null },
      uRes: { value: new Nt(1, 1) },
      uR0: { value: 0.3 },
      uStreamT: { value: e.stream },
      uRiver: { value: 0 },
      uPool: { value: 1 },
      uPoolT: { value: null },
    },
    u = new ce({
      glslVersion: re,
      side: oe,
      uniforms: c,
      vertexShader:
        gc +
        Ei +
        "in vec3 position; uniform mat4 projectionMatrix,viewMatrix; uniform float uR0; out vec3 vW; out vec4 vFog; void main(){ float r=uR0*pow(15000./uR0,position.y); if(position.y<.0001) r=0.; vec2 p=uCam.xz+r*vec2(cos(position.x),sin(position.x)); float h=max(mapAt(p,0.).r,0.); vec3 w=vec3(p.x,h,p.y); vW=w; w.y-=drop(p); gl_Position=projectionMatrix*viewMatrix*vec4(w,1.); }",
      fragmentShader:
        gc +
        Ei +
        `in vec3 vW; uniform sampler2D uRefl,uStreamT,uPoolT; uniform vec2 uRes; uniform float uRiver,uPool; out vec4 o;
    void main(){ vec3 p=vW; vec3 V=uCam-p; float d=length(V); V/=d; vec2 suv=gl_FragCoord.xy/uRes; vec4 mp=mapAt(p.xz,0.);
      float lod=log2(max(d*.004,1.)); vec2 n1=textureLod(uNoise,p.xz*vec2(.075,.12)+vec2(uT*.013,uT*.02),max(0.,log2(d*.06))).rg-.5, n2=textureLod(uNoise,p.xz*.47-vec2(uT*.031,-uT*.022),max(0.,log2(d*.25))).ba-.5, n3=textureLod(uNoise,p.xz*.021+vec2(uT*.006,0.),0.).rg-.5;
      vec2 rp=n1*.8+n2*.22+n3*.6; float wet=smoothstep(2.5,.0,mp.r); vec3 N=normalize(vec3(rp.x*.22,1.,rp.y*.22)); float nv=max(dot(N,V),.0); float F=.035+.965*pow(1.-nv,4.2);
      // mirror with a tall, slightly broken smear
      float sp=mix(.35,1.5,smoothstep(0.,.5,1.-nv)); vec2 off=vec2(rp.x*.014,rp.y*.026+abs(rp.y)*.004); vec3 R=vec3(0.); float wsum=0.; float jit=h12(gl_FragCoord.xy)-.5;
      if(uCam.y<262.) for(int i=0;i<9;i++){ float t=(float(i)+jit*.9)/8.-.5; float w=1.-abs(t)*1.3; vec2 q=suv+off+vec2(rp.y*.004*t,t*.034*sp); R+=texture(uRefl,q).rgb*w; wsum+=w; } R/=max(wsum,1e-3);
      float refl=mix(.10,.34+.66*F,wet)*mix(.8,1.,F); vec3 col=R*refl*mix(.55,.92,wet);
      // light pools and the general lamplight the ground receives
      float g=glowAt(p.xz,2.6); vec3 alb=vec3(.020,.0205,.021)*(.6+.8*n3.x+.5); col+=alb*PAPERLIGHT*g*mix(2.6,1.,wet); if(uHigh>0.) col+=PAPERLIGHT*vec3(1.,.9,.78)*pow(glowAt(p.xz,3.8),1.6)*.075*uHigh*(.2+mp.a);
      vec2 pu=(p.xz-vec2(0.,-147.2))/vec2(704.,896.)+.5; if(uPool>0.&&all(greaterThan(pu,vec2(0.)))&&all(lessThan(pu,vec2(1.)))){ vec4 pl=texture(uPoolT,pu); float o2=onAt(p.xz,0.); col+=alb*pl.rgb*o2*o2*(.45+1.1*attention(p.xz))*uPool*3.4*mix(1.4,1.,wet); }
      // the one, and the core
      vec2 hq=p.xz; col+=vec3(.022)*vec3(1.,.95,.86)*(1.2/(dot(hq-vec2(0.,.45),hq-vec2(0.,.45))*.55+.55))*smoothstep(-.9,1.4,hq.y)*uLamp.w*40.;
      if(uCore.w>0.){ vec3 L=uCore.xyz-p; float l2=dot(L,L); col+=vec3(.05)*vec3(1.,.92,.78)*uCore.w*900.*max(L.y,0.)/(l2*sqrt(l2)+60.)*8.; }
      // the sea keeps a long track of the lights on the shore
      float sea=1.-mp.b; if(uCam.y>150.&&sea>.02){ vec2 dir=normalize(p.xz-uCam.xz); vec3 tr=vec3(0.); float st=1.; for(int i=1;i<=5;i++){ vec2 q=p.xz+dir*float(i)*float(i)*26.; tr+=glow0(q,2.5)*st; st*=.72; } float gl=textureLod(uNoise,p.xz*.013+uT*.004,1.5).g; col+=PAPERLIGHT*tr*sea*.06*(.3+2.2*gl*gl); }
      // river of proof on the canal
      if(uRiver>0.){ vec2 la=unwarp(p.xz); float ax=abs(la.x); if(ax<7.2){ float al=la.y-(-150.0); float reach=uRiver*700.; float on=smoothstep(0.,60.,reach-abs(al))*smoothstep(7.1,6.0,ax); vec2 q=vec2(la.y*.062,la.x*.0595); float rowf=(la.x+7.2)/14.4*20.; float row=floor(rowf); float sgn=al>0.?-1.:1.; float spd=.55+.5*h12(vec2(row,1.)); vec2 uvs=vec2(sgn*al*.052+uT*spd*(-1.),0.); uvs.x=al*.052*sgn*-1.*sgn; uvs.x=abs(al)*.052-uT*spd+h12(vec2(row,9.)); uvs.y=(floor(h12(vec2(row,5.))*24.)+fract(al>0.?rowf:1.-fract(rowf)))/24.; vec2 gx=dFdx(la),gy=dFdy(la); float s=textureGrad(uStreamT,uvs+rp*.004,vec2(gx.y*.052,gx.x*.058),vec2(gy.y*.052,gy.x*.058)).r; float pulse=.6+.9*pow(.5+.5*sin(abs(al)*.045-uT*2.2+row*.8),3.); col+=vec3(1.,.95,.86)*(s*2.4+.05)*on*pulse*(.55+.45*smoothstep(7.,2.,ax)); } }
      vec4 f=fogTo(p); o=vec4(col*f.a+f.rgb,1.); }`,
    }),
    f = new Zt(l, u);
  return ((f.frustumCulled = !1), { mesh: f, u: c });
}

function f5(i, t) {
  let e = new Qt();
  e.setAttribute("position", new $t(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3));
  let n = new ce({
      glslVersion: re,
      uniforms: t,
      depthWrite: !1,
      vertexShader:
        gc +
        "in vec3 position; out vec2 vQ; void main(){ vQ=position.xy; gl_Position=vec4(position.xy,.999999,1.); }",
      fragmentShader:
        gc +
        Ei +
        `in vec2 vQ; out vec4 o; uniform mat4 uInv;
  void main(){ vec4 h=uInv*vec4(vQ,1.,1.); vec3 rd=normalize(h.xyz/h.w-uCam); float dip=sqrt(2.*max(uCam.y,0.)/PLANET); float el=rd.y+dip/sqrt(1.+dip*dip); float a=max(el,0.);
    vec3 c=mix(vec3(.0105,.0135,.0155),vec3(.0016,.0021,.0027),smoothstep(0.,.55,a))*uFog.w;
    // lamplight scattered up from the land
    float g=0.; vec2 az=normalize(rd.xz+1e-4); for(int i=0;i<4;i++){ float q=float(i); vec2 gp=uCam.xz+az*(120.+q*q*260.+q*140.); g+=mapAt(gp,6.6).g*smoothstep(0.,1.,(uOn*1.2-length(gp))/(40.+uOn*.5))*(1.-q*.2); } g*=.31;
    float m=.8+.4*textureLod(uNoise,vec2(atan(rd.x,-rd.z)*.22+uT*.0015,a*.35-uT*.001),2.).r;
    c+=PAPERLIGHT*g*uFog.z*(.80*exp(-a*mix(9.,16.,uHigh))+.14*exp(-a*3.6))*m*mix(1.15,1.,uHigh); { vec4 f=fogX(uCam+rd*(420.+uCam.y*3.),1.); f.a=mix(f.a,1.,uHigh); c=c*f.a+f.rgb*(1.-uHigh); }
    // first hint of morning along the limb
    float east=.35+.65*smoothstep(-.6,.55,rd.x); c+=uDawn*east*(vec3(.42,.60,.66)*exp(-a*15.)*.20+vec3(1.,.68,.42)*exp(-abs(a-.002)*60.)*.42+vec3(.16,.26,.30)*exp(-a*4.5)*.05);
    vec2 sp=vec2(atan(rd.x,-rd.z),rd.y)*260.; vec2 id=floor(sp); float st=h12(id); if(st>.987){ vec2 fp=fract(sp)-.5-(h42(id).xy-.5)*.6; c+=vec3(.8,.9,1.)*exp(-dot(fp,fp)*90.)*(st-.987)*9.*smoothstep(.06,.4,a)*(.7+.3*sin(uT*.8+st*900.)); }
    o=vec4(c,1.); }`,
    }),
    o = new Zt(e, n);
  return ((o.frustumCulled = !1), (o.renderOrder = 5), o);
}

function h5(i, t, e, n) {
  let o = i.target({ w: 2048, h: 2048, mips: !0 }),
    s = new Oe();
  (s.setAttribute("position", new $t(new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, 1, 0]), 3)),
    s.setIndex([0, 1, 2, 0, 2, 3]),
    (s.instanceCount = e * n));
  let a = new ce({
      glslVersion: re,
      side: oe,
      uniforms: { ...t, uOn: { value: 1e6 } },
      depthTest: !1,
      depthWrite: !1,
      transparent: !0,
      blending: Ie,
      blendSrc: pe,
      blendDst: pe,
      vertexShader:
        gc +
        Ei +
        `in vec3 position; out vec2 vQ; flat out vec4 vS; flat out vec3 vT; void main(){ ivec2 c=ivec2(gl_InstanceID%${e},gl_InstanceID/${e})-ivec2(${e / 2},${n / 2})+ivec2(0,-46); Sheet S; gl_Position=vec4(2.,2.,2.,1.); if(!sheetAt(c,S)) return; vQ=position.xy*7.*S.sc; vS=vec4(S.yaw,S.p.y-max(mapAt(S.p.xz,0.).r,0.)+.4*S.sc,S.lum,S.sc); vT=tintAt(S.p.xz,S.r); vT*=vT; vec2 w=S.p.xz+vQ; vec2 u=(w-vec2(0.,-147.2))/vec2(704.,896.); gl_Position=vec4(u*2.,0.,1.); }`,
      fragmentShader:
        gc +
        "in vec2 vQ; flat in vec4 vS; flat in vec3 vT; out vec4 o; void main(){ vec2 q=vQ; float r2=dot(q,q); vec2 n=vec2(sin(vS.x),cos(vS.x)); float f=dot(q/sqrt(r2+.2),n); float e=(.30+.70*smoothstep(-.35,.75,f))/(r2*.55+vS.y*vS.y+.35)*smoothstep(1.,.2,r2/(49.*vS.w*vS.w))*vS.w; o=vec4(vT*e*vS.z,0.); }",
    }),
    r = new Zt(s, a);
  r.frustumCulled = !1;
  let l = new ge();
  return (
    l.add(r),
    i.draw(l, new In(), o, { color: 0, alpha: 0 }),
    (o.texture.anisotropy = 8),
    a.dispose(),
    o
  );
}

var d5 = `precision highp float; precision highp int; precision highp sampler2D;
`;

function _v(i, t, { n: e = 500, seg: n = 22, beam: o = !1 } = {}) {
  let s = new Float32Array((n + 1) * 2 * 3),
    a = [];
  for (let h = 0; h <= n; h++)
    if ((s.set([h / n, -1, 0], h * 6), s.set([h / n, 1, 0], h * 6 + 3), h < n)) {
      let d = h * 2;
      a.push(d, d + 1, d + 2, d + 1, d + 3, d + 2);
    }
  let r = new Oe();
  (r.setAttribute("position", new $t(s, 3)), r.setIndex(a), (r.instanceCount = e));
  let l = {
      ...t,
      uC: { value: new Nt() },
      uR: { value: 60 },
      uL: { value: 10 },
      uA: { value: 0 },
      uPx: { value: 0.001 },
      uPer: { value: 2.2 },
      uReach: { value: 0 },
      uWmin: { value: 0.012 },
    },
    c = new ce({
      glslVersion: re,
      uniforms: l,
      side: oe,
      transparent: !0,
      depthWrite: !1,
      blending: Ie,
      blendSrc: pe,
      blendDst: pe,
      blendSrcAlpha: wo,
      blendDstAlpha: pe,
      vertexShader:
        d5 +
        Ei +
        `in vec3 position; uniform mat4 projectionMatrix,viewMatrix; uniform vec2 uC; uniform float uR,uL,uA,uPx,uPer,uReach,uWmin; out vec3 vC; out float vY; out float vT; flat out vec4 vR; flat out float vLen;
    vec3 curve(vec3 a,vec3 b,float h,float t){ vec3 p=mix(a,b,t); p.y+=h*4.*t*(1.-t); return p; }
    void main(){ gl_Position=vec4(2.,2.,2.,1.); float id=float(gl_InstanceID); vec4 r0=h42(vec2(id,3.7)); if(uA<=.001) return;
      ${o ? "float seed=0.; vec4 r=h42(vec2(id*1.31,11.)); float ang=r.x*6.28318, rad=34.+sqrt(r.y)*(uSunR-38.); vec2 wa=uProb.xz+vec2(cos(ang),sin(ang))*rad; ivec2 c=ivec2(floor(unwarp(wa)/vec2(PX,PZ)+.5)); Sheet A; if(!sheetAt(c,A)||A.on<.5){ c+=ivec2(1,1); if(!sheetAt(c,A)||A.on<.5) return; } vec3 a=A.p+vec3(0.,.5,0.), b=uProb+vec3((r.z-.5)*15.,(r.w-.5)*7.,(r.x-.5)*2.); float ln=length(b-a), hh=ln*(.015+.05*r.z);" : "float tt=uT/uPer/(.7+.6*r0.w)+r0.z; float cyc=floor(tt); vec4 r=h42(vec2(id*1.31,cyc*.71+5.)); vec2 lat=uC/vec2(PX,PZ)+(sqrt(r.x)*vec2(cos(r.y*6.283),sin(r.y*6.283)))*uR/vec2(PX,PZ); ivec2 c=ivec2(floor(lat)); Sheet A,B; if(!sheetAt(c,A)||A.on<.6) return; float L=uL*(.35+1.1*r.z*r.z); float an=r.w*6.283; ivec2 c2=c+ivec2(floor(vec2(cos(an),sin(an))*L/vec2(PX,PZ)+.5)); if(!sheetAt(c2,B)||B.on<.6) return; vec3 a=A.p+vec3(0.,.8,0.), b=B.p+vec3(0.,.8,0.); float ln=length(b-a), hh=ln*(.16+.12*r.x);"}
      float t=position.x; vec3 p=curve(a,b,hh,t), q=curve(a,b,hh,t+.01); vec3 tg=normalize(q-p); float d=length(uCam-p); vec3 sd=normalize(cross(tg,uCam-p)); float wd=max(uWmin,d*uPx); vec3 w=p+sd*wd*position.y; w.y-=drop(w.xz); gl_Position=projectionMatrix*viewMatrix*vec4(w,1.); gl_Position.z-=.0004*gl_Position.w;
      vec4 f=fogTo(p); float k=min(1.,uWmin/(d*uPx)+.35);
      ${o ? "float reach=smoothstep(0.,.25,uReach*1.5-t-r.y*.4); vC=vec3(1.,.93,.81)*f.a*uA*reach*k*smoothstep(6.,46.,d)*(.35+1.2*r.w*r.w);" : "float fr=fract(tt), hd=fr*1.45; vC=mix(vec3(1.,.95,.86),vec3(1.,.72,.40),step(.82,r0.x))*f.a*uA*k*smoothstep(hd-.42,hd,t)*smoothstep(hd+.012,hd,t)*(1.+3.*smoothstep(hd-.05,hd,t));"}
      vY=position.y; vT=t; vR=r; vLen=ln; }`,
      fragmentShader:
        d5 +
        `in vec3 vC; in float vY,vT; flat in vec4 vR; flat in float vLen; uniform float uT; out vec4 o;
    void main(){ float e=1.-vY*vY; ${o ? "float s=vT*vLen*.09-uT*(1.1+1.5*vR.w)+vR.x*9.; float ps=fract(s*.22); float pk=smoothstep(.0,.04,ps)*exp(-ps*7.); float dash=step(.35,fract(vT*vLen*.7-uT*9.*(.5+.5*vR.y)))*.5+.5; float b=(.10+1.9*pk)*dash*smoothstep(0.,.06,vT)*mix(.6,1.3,vT*vT); o=vec4(vC*b*e,0.);" : "o=vec4(vC*e,0.);"} }`,
    }),
    u = new Zt(r, c);
  u.frustumCulled = !1;
  let f = new ge();
  return (f.add(u), { mesh: u, u: l, scene: f });
}

var w0 = `precision highp float; precision highp int; precision highp sampler2D;
`,
  M0 = 28.8,
  S0 = 16.2,
  yc = 0.7;

function p5(i, t, e) {
  let n = ze(31),
    o = [2.2, -0.8],
    s = 17,
    a = [0.55, 1.5, 3.3, 6.6, 12, 48],
    r = [];
  for (let M = 0; M < s; M++) {
    let w = ((M + (n() - 0.5) * 0.62) / s) * 6.2832,
      E = [],
      T = w;
    for (let _ = 0; _ < a.length; _++) {
      T += (n() - 0.5) * 0.1;
      let R = a[_] * (0.74 + 0.52 * n());
      E.push([o[0] + Math.cos(T) * R * 1.15, o[1] + Math.sin(T) * R]);
    }
    r.push(E);
  }
  let l = [];
  for (let M = 0; M < s; M++) {
    let w = r[M],
      E = r[(M + 1) % s],
      T = -1;
    for (let _ = 0; _ < a.length; _++) {
      if (_ < a.length - 1 && n() < (_ === 0 ? 0.25 : 0.34)) continue;
      let R = T < 0 ? [o.slice(), w[0]] : [w[T]];
      for (let L = Math.max(T + 1, T < 0 ? 1 : T + 1); L <= _; L++) R.push(w[L]);
      for (let L = _; L > T; L--) R.push(E[L]);
      (T >= 0 && R.push(E[T]), l.push(R), (T = _));
    }
  }
  let c = (M) => {
      for (let [w, E, T] of [
        [0, 1, M0 / 2],
        [0, -1, M0 / 2],
        [1, 1, S0 / 2],
        [1, -1, S0 / 2],
      ]) {
        let _ = (L) => L[w] * E - T,
          R = [];
        for (let L = 0; L < M.length; L++) {
          let k = M[L],
            P = M[(L + 1) % M.length],
            C = _(k),
            A = _(P);
          if ((C <= 0 && R.push(k), C * A < 0)) {
            let N = C / (C - A);
            R.push([k[0] + (P[0] - k[0]) * N, k[1] + (P[1] - k[1]) * N]);
          }
        }
        M = R;
      }
      return M.filter((w, E) => {
        let T = M[(E + 1) % M.length];
        return Math.hypot(w[0] - T[0], w[1] - T[1]) > 1e-4;
      });
    },
    u = [],
    f = [],
    h = [],
    d = [],
    p = [],
    x = (M, w, E, T, _, R) => {
      (u.push(...M), f.push(...w), h.push(...E), d.push(...T), p.push(_, R));
    };
  for (let M of l) {
    let w = c(M);
    if (w.length < 3) continue;
    let E = 0,
      T = 0,
      _ = 0;
    if (
      (w.forEach((k, P) => {
        let C = w[(P + 1) % w.length],
          A = k[0] * C[1] - C[0] * k[1];
        ((E += A), (T += (k[0] + C[0]) * A), (_ += (k[1] + C[1]) * A));
      }),
      Math.abs(E) < 0.001)
    )
      continue;
    ((T /= 3 * E), (_ /= 3 * E));
    let R = [n(), n(), n(), n()],
      L = [T, _, 0];
    w.forEach((k, P) => {
      let C = w[(P + 1) % w.length],
        A = [0, 1].some((Y) => {
          let q = Y ? S0 / 2 : M0 / 2;
          return Math.abs(Math.abs(k[Y]) - q) < 0.001 && Math.abs(k[Y] - C[Y]) < 0.001;
        }),
        N = C[0] - k[0],
        G = C[1] - k[1],
        B = Math.hypot(N, G) || 1,
        ot = Math.abs((T - k[0]) * G - (_ - k[1]) * N) / B,
        ut =
          Math.abs(((k[0] + C[0]) / 2 - o[0]) * N + ((k[1] + C[1]) / 2 - o[1]) * G) /
          (B * (Math.hypot((k[0] + C[0]) / 2 - o[0], (k[1] + C[1]) / 2 - o[1]) || 1)),
        lt = A ? 0 : ut > 0.7 ? 1 : 0.38;
      for (let Y of [yc / 2, -yc / 2]) {
        let q = [0, 0, Math.sign(Y)];
        (x([T, _, Y], q, L, R, ot, lt),
          x([k[0], k[1], Y], q, L, R, 0, lt),
          x([C[0], C[1], Y], q, L, R, 0, lt));
      }
      let Z = [G / B, -N / B, 0],
        H = [
          [k[0], k[1], yc / 2],
          [C[0], C[1], yc / 2],
          [C[0], C[1], -yc / 2],
          [k[0], k[1], -yc / 2],
        ];
      for (let Y of [0, 2, 1, 0, 3, 2]) x(H[Y], Z, L, R, -1, lt);
    });
  }
  let v = new Qt(),
    m = (M, w, E) => v.setAttribute(M, new $t(new Float32Array(w), E));
  (m("position", u, 3), m("normal", f, 3), m("aC", h, 3), m("aR", d, 4), m("aE", p, 2));
  let g = {
      ...t,
      uCrack: { value: 0 },
      uOpen: { value: 0 },
      uRise: { value: 0 },
      uPages: { value: e.tex },
      uTab: { value: e.tab },
      uStreamT: { value: e.stream },
    },
    b = (M) => {
      let w = new ce({
          glslVersion: re,
          side: oe,
          uniforms: g,
          vertexShader:
            w0 +
            Ei +
            `in vec3 position,normal,aC; in vec4 aR; in vec2 aE; uniform mat4 projectionMatrix,viewMatrix; uniform float uOpen,uRise; out vec3 vW,vN,vL; out vec2 vEE; flat out float vSide; out vec4 vFog; flat out vec4 vR;
    mat3 rot(vec3 a,float t){ float c=cos(t),s=sin(t),o=1.-c; return mat3(o*a.x*a.x+c,o*a.x*a.y+a.z*s,o*a.z*a.x-a.y*s,o*a.x*a.y-a.z*s,o*a.y*a.y+c,o*a.y*a.z+a.x*s,o*a.z*a.x+a.y*s,o*a.y*a.z-a.x*s,o*a.z*a.z+c); }
    void main(){ vec2 hp=aC.xy-vec2(${o}); float dh=length(hp); float k=clamp(uOpen*1.5-dh*.022,0.,1.); k=1.-pow(1.-k,3.); vec3 ax=normalize(aR.xyz-.5); float spin=k*(.35+1.5*aR.w)+k*sin(uT*.25+aR.x*9.)*.12; mat3 M=rot(ax,spin);
      vec2 dir=hp/max(dh,.1); vec3 off=vec3(dir*(7.+9.*aR.x)*vec2(1.25,.8),(aR.y-.35)*13.)*k; off.y+=k*(1.2*sin(uT*.31+aR.z*20.)+1.5); off.xy+=aC.xy*k*.22; float jit=smoothstep(0.,.3,uOpen*2.)*(1.-k)*.12; off+=vec3(aR.xy-.5,aR.z*.6)*jit;
      vec3 l=aC+M*(position-aC)+off; vL=position; vN=M*normal; vec3 w=uProb+l+vec3(0.,(uRise-1.)*24.,0.); vW=w; vEE=aE; vSide=step(aE.x,-.5); vR=aR; vFog=${M ? "vec4(0,0,0,1)" : "fogTo(w)"}; w.y=${M ? "-w.y" : "w.y"}; w.y-=drop(w.xz); gl_Position=projectionMatrix*viewMatrix*vec4(w,1.); ${M ? "if(vW.y<0.) gl_Position=vec4(2.,2.,2.,1.);" : ""} }`,
          fragmentShader:
            w0 +
            Ei +
            `in vec3 vW,vN,vL; in vec2 vEE; flat in float vSide; in vec4 vFog; flat in vec4 vR; uniform float uCrack,uOpen; out vec4 o;
    void main(){ float vE=max(vEE.x,0.); bool side=vSide>.5; if(vW.y<0.) discard; vec3 V=normalize(uCam-vW), N=normalize(vN); if(dot(N,V)<0.) N=-N; vec3 R=reflect(-V,N); float F=.05+.95*pow(1.-max(dot(N,V),0.),5.);
      // black lacquer: it reflects a low horizon of lamplight
      float hz=exp(-abs(R.y+.02)*7.)*(.5+.5*textureLod(uNoise,vec2(atan(R.x,R.z)*1.3,R.y*3.)+uT*.004,0.).r); vec3 col=vec3(.004,.0045,.005)+PAPERLIGHT*hz*F*.6; col+=vec3(.010)*PAPERLIGHT*smoothstep(.2,-.9,N.y);
      float dh=length(vL.xy-vec2(${o})); float lit=smoothstep(0.,1.,uCrack*1.35-dh*.034); vec3 hot=vec3(1.,.90,.74);
      if(!side){ float w=max(fwidth(vE),.004); float edgeK=step(.1,vEE.y); float th=.055*vEE.y*exp(-dh*.15); float ln=smoothstep(w*1.0+th,th*.3,vE)*mix(.45,1.,vEE.y); float gl=exp(-vE*6.)*vEE.y; float fade=1.-smoothstep(.0,.25,uOpen); col+=hot*lit*edgeK*(ln*(2.+5.*exp(-dh*.2))+gl*.8*exp(-dh*.12))*fade; } else col+=hot*lit*step(.1,vEE.y)*(2.2*(1.-smoothstep(.05,.45,uOpen)));
      vec3 L=uProb-vW; float ll=length(L); float thru=pow(max(dot(N,L/ll),0.),1.3); col+=hot*uOpen*(thru+.02)*(side?1.6:.55)*26./(ll*ll*.14+9.);
      o=vec4(col*vFog.a+vFog.rgb,1.); }`,
        }),
        E = new Zt(v, w);
      return ((E.frustumCulled = !1), E);
    },
    y = new Ke(M0 * 0.8, S0 * 0.8),
    S = (M) => {
      let w = new ce({
          glslVersion: re,
          side: oe,
          uniforms: g,
          vertexShader:
            w0 +
            Ei +
            `in vec3 position; in vec2 uv; uniform mat4 projectionMatrix,viewMatrix; uniform float uOpen,uRise; out vec2 vUv; out vec4 vFog; out vec3 vW; void main(){ vec3 w=uProb+vec3(position.xy,-1.3); w.y+=(uRise-1.)*24.; vW=w; vFog=${M ? "vec4(0,0,0,1)" : "fogTo(w)"}; w.y=${M ? "-w.y" : "w.y"}; w.y-=drop(w.xz); vUv=uv; gl_Position=uOpen<=0.?vec4(2.):projectionMatrix*viewMatrix*vec4(w,1.); }`,
          fragmentShader:
            w0 +
            Ei +
            y0 +
            "in vec2 vUv; in vec4 vFog; in vec3 vW; uniform float uOpen; out vec4 o; void main(){ float row=floor(vUv.y*19.); vec2 su=vec2(vUv.x*.9-uT*(.10+.10*h12(vec2(row,2.))),(fract(vUv.y*19.)+mod(row*5.+floor(0.),24.))/24.); float s=textureGrad(uStreamT,su,dFdx(vec2(vUv.x*.9,vUv.y*.79)),dFdy(vec2(vUv.x*.9,vUv.y*.79))).r; vec3 c=mix(vec3(1.,.94,.84)*1.35,vec3(.06,.055,.05),min(1.,s*1.25)*smoothstep(.35,1.,uOpen)); vec2 e=abs(vUv-.5)*2.; c*=.9+.2*(1.-max(e.x*e.x,e.y*e.y)); o=vec4(c*mix(2.0,.72,smoothstep(.3,1.,uOpen))*vFog.a+vFog.rgb,1.); }",
        }),
        E = new Zt(y, w);
      return ((E.frustumCulled = !1), E);
    };
  return { main: [b(!1), S(!1)], mirror: [b(!0), S(!0)], u: g };
}

var Ts = (i, t, e) => new F(i, t, e),
  _i = (i, t, e) => {
    let [n, o] = Ev(i, e);
    return Ts(n, t, o);
  },
  is = { x: 0, y: 0.66, z: 0 },
  Ao = [
    [0, Ts(26, 92, 262), Ts(0, 0, -78), 37, 0],
    [0.9, _i(13, 48, 168), _i(0, 4, -30), 42, 0.03],
    [1.75, _i(4.6, 9.5, 74), _i(0.5, 5, -40), 50, -0.05],
    [2.25, _i(3.4, 3.4, 26), _i(1, 5, -90), 55, -0.09],
    [2.75, _i(2.2, 2.3, -24), _i(0, 8, -150), 54, 0.03],
    [3.35, _i(1, 3.4, -62), _i(-3, 11, -150), 48, 0.04],
    [4, _i(4, 6.5, -78), _i(-6, 11, -150), 45, 0],
    [5.2, _i(18, 17, -70), _i(-14, 11, -150), 44, 0.01],
    [6.4, _i(31, 27, -54), _i(-20, 11.5, -150), 43, 0],
    [7, _i(33, 28.5, -51), _i(-21, 11.5, -150), 43, 0],
  ],
  E0 = (i, t) => {
    let e = Ao[Math.max(0, i - 1)],
      n = Ao[Math.min(Ao.length - 1, i + 1)],
      o = n[0] - e[0] || 1;
    return i === 0 || i === Ao.length - 1
      ? typeof Ao[i][t] == "number"
        ? 0
        : Ts(0, 0, 0)
      : typeof e[t] == "number"
        ? (n[t] - e[t]) / o
        : n[t]
            .clone()
            .sub(e[t])
            .multiplyScalar(1 / o);
  },
  m5 = Ao.map((i, t) => [0, E0(t, 1), E0(t, 2), E0(t, 3), E0(t, 4)]);

function qA(i, t) {
  i = Ct(i, 0, 7);
  let e = 0;
  for (; e < Ao.length - 2 && i > Ao[e + 1][0];) e++;
  let n = Ao[e],
    o = Ao[e + 1],
    s = o[0] - n[0],
    a = (i - n[0]) / s,
    r = a * a,
    l = r * a,
    c = 2 * l - 3 * r + 1,
    u = (l - 2 * r + a) * s,
    f = 3 * r - 2 * l,
    h = (l - r) * s,
    d = m5[e],
    p = m5[e + 1];
  for (let [x, v] of [
    [1, t.p],
    [2, t.t],
  ])
    v.set(0, 0, 0)
      .addScaledVector(n[x], c)
      .addScaledVector(d[x], u)
      .addScaledVector(o[x], f)
      .addScaledVector(p[x], h);
  ((t.fov = n[3] * c + d[3] * u + o[3] * f + p[3] * h), (t.roll = n[4] * c + d[4] * u + o[4] * f + p[4] * h));
}

var Tv = (i, t, e, n, o) =>
    o.set(i.x + Math.sin(e) * Math.cos(t) * n, i.y + Math.sin(t) * n, i.z + Math.cos(e) * Math.cos(t) * n),
  Iv = (i, t) => {
    let e = i.clone().sub(t),
      n = e.length();
    return { r: n, el: Math.asin(e.y / n), az: Math.atan2(e.x, e.z) };
  },
  Pv = Ao[Ao.length - 1],
  v5 = Ts(0, 0, -140),
  Av = Iv(Pv[1], v5),
  Rv = { r: 3150, el: 0.575, az: -0.08 },
  WA = Ts(is.x, is.y, is.z),
  Lv = Ao[0],
  Nv = Ts(0, 1.1, 0),
  Cv = Iv(Lv[1], Nv);

function Fv(i, t, e, n = 0) {
  e.roll = 0;
  let o = Math.tan((17 * Math.PI) / 180);
  if (i < 2) {
    let u = Math.min(0.45 / o, 0.8 / (t * o)),
      f = Ct(i),
      h = kt(f),
      d = Ct(i - 1),
      p = kt(d),
      x = u * Math.pow(3.9 / u, h) * K(1, 1.16, p),
      v = 0.3 * h + 0.1 * p,
      m = 0.05 * h + 0.03 * p;
    return (
      (e.fov = 34),
      Tv(WA, m, v, x, e.p),
      e.t.set(K(0, -0.86, h) * Math.cos(v), is.y - 0.1 * h, K(0, 0.86, h) * Math.sin(v)),
      e.t.multiplyScalar(1),
      (e.r1 = x),
      e
    );
  }
  if (i < 3) {
    let u = i - 2,
      f = YA,
      h = u,
      d = Math.exp(K(Math.log(f.r), Math.log(Cv.r), h)),
      p = K(f.el, Cv.el, bt.io3(Math.pow(h, 0.8))),
      x = K(f.az, Cv.az, kt(h));
    return (Tv(Nv, p, x, d, e.p), e.t.copy(f.t).lerp(Lv[2], Math.pow(h, 2.2)), (e.fov = K(34, Lv[3], h)), e);
  }
  if (i < 4) return (qA((i - 3) * 7, e), e);
  let s = i - 4,
    a = Ct(s),
    r = Math.exp(K(Math.log(Av.r), Math.log(Rv.r), a)),
    l = K(Av.el, Rv.el, bt.io3(Math.pow(a, 0.7))),
    c = K(Av.az, Rv.az, kt(a));
  return (Tv(v5, l, c, r, e.p), e.t.copy(Pv[2]).lerp(XA, Math.pow(a, 3)), (e.fov = K(Pv[3], 36, a)), e);
}

var XA = Ts(90, 0, 40),
  zv = { p: Ts(0, 0, 0), t: Ts(0, 0, 0), fov: 34, roll: 0 };

Fv(1.99999, 16 / 9, zv);

var YA = { ...Iv(zv.p, Nv), t: zv.t.clone() };

function x5(i, t, e) {
  let s = "";
  for (let x = 0; x < 7; x++) s += "0123456789";
  s += ".,";
  let a = i.text(s, {
      x: t,
      y: e + 60,
      size: 210,
      font: { family: "Geist", weight: 300 },
      color: "#fffaf0",
      leading: 1.12,
    }),
    r = a.glyphs,
    l = Math.max(...r.slice(0, 10).map((x) => x.w)) * 0.95,
    c = r[70].w,
    u = r[71].w,
    f = i.text("这张幻灯片打开以来，它们已经思考了", {
      x: t + 4,
      y: e,
      size: 36,
      font: "text",
      color: "#e9e2d4",
    }),
    h = i.text("年。", { x: t + 600, y: e + 60, size: 210 * 0.36, font: "display", color: "#fbf6ec" }),
    d = 0,
    p = 0;
  return {
    blocks: [f, a, h],
    update(x, v, m) {
      f.show(v, { style: "rise", by: "word" });
      let g = bt.out3(Ct(v * 1.6 - 0.5));
      if (((a.alpha = g), (h.alpha = g), v <= 0)) {
        ((a.mesh.visible = h.mesh.visible = !1), (d = 0));
        return;
      }
      let b = Math.max(1, Math.floor(Math.log10(Math.max(1, x + 1e-6))) + 1),
        y = Math.floor(x),
        S = x - y,
        M = kt((S - 0.62) / 0.38);
      d += (b - d) * (d === 0 ? 1 : 1 - Math.exp(-5 * Math.max(m.dt, 1e-4)));
      let w = d * l + (b > 3 ? u * 0.9 : 0),
        E = [];
      for (let _ = 0; _ < 6; _++) {
        let R = Math.floor(y / 10 ** _) % 10,
          L = M;
        for (let k = 0; k < _; k++) Math.floor(y / 10 ** k) % 10 !== 9 && (L = 0);
        E.push(R + L);
      }
      let T = (x * 10) % 10;
      ((a.mesh.visible = !0),
        a.animate((_, R) => {
          if (((R.clip = 1), _.n >= 70)) {
            _.n === 70
              ? (R.dx = w - _.x + l * -0.02)
              : ((R.dx = w - 3 * l - u * 0.95 - _.x), (R.alpha = b > 3 ? 1 : 0));
            return;
          }
          let L = Math.floor(_.n / 10),
            k = _.n % 10,
            P = L < 6 ? E[L] : T,
            C = k - P;
          if (((C -= Math.round(C / 10) * 10), Math.abs(C) > 1.05)) {
            R.alpha = 0;
            return;
          }
          let A = L < 6 ? w - (L + 1) * l - (L > 2 ? u * 0.9 : 0) : w + c * 0.92;
          ((R.dx = A + (l - _.w) / 2 - _.x), (R.dy = C * 210 * 0.74 + (1 - g) * 60));
          let N = 1 - kt((Math.abs(C) - 0.25) / 0.6);
          ((R.alpha = N * (L < 6 && L >= b ? (L === b && E[L] > 0 ? 1 : 0) : 1)), L === 6 && (R.blur = 3));
        }),
        (h.x = t + w + c + l + 34),
        (h.y = e + 60 + 210 * 1.12 * 0.5 + 210 * 0.35 - 210 * 0.36 * (0.56 + 0.35)),
        h.animate((_, R) => {
          R.dy = (1 - g) * 40;
        }),
        (h.mesh.visible = !0));
    },
  };
}

// ── scene swarm · "A country of them" · enterWith: portal-in ──
var KA = (1e6 * 50) / 31557600,
  g5 = {
    id: "swarm",
    title: "一整个国家",
    enterWith: "portal-in",
    hud: { color: "#e8e2d6", font: "monoMed" },
    beats: [
      { dur: 4, hold: 3, delay: 1.6, page: "121,393" },
      { dur: 6, hold: 4, page: "832,040" },
      { dur: 7, hold: 4, page: "2,178,309" },
      { dur: 8, hold: 8, page: "39,088,169" },
    ],
    notes: [
      "这是其中一个，独自工作。",
      "现在是同时三万。这是 2026 年 8 月 Anthropic 内部同时工作的智能体数量。",
      "2026 年 9 月，OpenAI 说约一万个智能体协作 88 小时，解决了千禧年难题中的纳维–斯托克斯方程，证明在 Lean 中通过检查。11 月，Anthropic 的 Levent Alpöge 与 Claude 合作，公开了黎曼猜想的 1700 万行证明。Lean 与 Mathlib 团队认证了它。没有任何人从头读过并理解全部内容。",
      "这个是示意图。一百万个，以人类五十倍的速度思考，相当于每一秒都花掉一年半的思考量。你说话的时候，让计数器继续跑。",
    ],
    create(i) {
      let { gfx: t, view: e } = i,
        n = i.overlay(),
        o = t.target({ samples: 4, depth: !0 }),
        s = t.target({ scale: 0.5, depth: !0 }),
        a = new Ye(34, 1, 0.05, 16e3),
        r = { p: new F(), t: new F(), fov: 34, roll: 0 },
        l = {
          uMap: { value: null },
          uNoise: { value: null },
          uCam: { value: new F() },
          uT: { value: 0 },
          uOn: { value: 0 },
          uOnBand: { value: 0.1 },
          uDawn: { value: 0 },
          uFog: { value: new ie() },
          uLamp: { value: new ie() },
          uCore: { value: new ie() },
          uHigh: { value: 0 },
          uProb: { value: sh },
          uSun: { value: 0 },
          uSunR: { value: 187 },
        },
        c,
        u,
        f,
        h,
        d,
        p,
        x,
        v,
        m,
        g,
        b,
        y,
        S = new ge(),
        M = new ge(),
        w = new ne(),
        E = i.text("一个。", {
          x: 120,
          y: 540,
          size: 128,
          font: "display",
          valign: "middle",
          color: "#fbf6ec",
        }),
        T = i.text("同时三万。", { x: 120, y: 92, size: 108, font: "display", color: "#fbf6ec" }),
        _ = i.text("Anthropic 内部同时工作的智能体，2026 年 8 月", {
          x: 126,
          y: 226,
          size: 32,
          font: "text",
          color: "#cfc8ba",
        }),
        R = i.text(
          "一万个，88 小时：\n纳维–斯托克斯方程。",
          { x: 120, y: 92, size: 82, font: "display", color: "#fbf6ec", leading: 1.16 },
        ),
        L = i.text("OpenAI 称它解决了千禧年大奖难题。2026 年 9 月", {
          x: 125,
          y: 304,
          size: 32,
          font: "text",
          color: "#cfc8ba",
        }),
        k = i.text(
          "1700 万行证明：\n黎曼猜想。",
          { x: 120, y: 92, size: 82, font: "display", color: "#fbf6ec", leading: 1.16 },
        ),
        P = i.text("Claude 与 Levent Alpöge 合作。证明由 Lean 认证，2026 年 11 月", {
          x: 125,
          y: 304,
          size: 32,
          font: "text",
          color: "#cfc8ba",
        }),
        C = i.text(
          "现在是一百万个，\n五十倍于你的速度。",
          { x: 120, y: 84, size: 78, font: "display", color: "#fbf6ec", leading: 1.16 },
        ),
        A = i.text("示意图", {
          x: 125,
          y: 1004,
          size: 26,
          font: "text",
          color: "#b9b2a4",
          valign: "middle",
        }),
        N = t.pass(
          "uniform float k; void main(){ vec2 p=vec2(vUv.x*uRes.x/uRes.y,vUv.y); float a=.72*k*smoothstep(1.15,.15,length((p-vec2(.2,.16))*vec2(.72,1.25))); o=vec4(0.,0.,0.,a); }",
          { k: 0 },
          { blending: Fo, transparent: !0 },
        ),
        G = x5(i, 120, 700);
      n.add(E, T, _, R, L, k, P, C, A, ...G.blocks);
      let B = 0,
        ot = {},
        ut = new ne(),
        lt = new F(),
        Z = (q, st, ct, V) => {
          st && !ot[q] ? ((ot[q] = 1), V.dt > 0 && V.dir > 0 && ct()) : st || (ot[q] = 0);
        },
        H = [
          [-0.8, 0.45],
          [0.8, 0.45],
          [0.8, -0.45],
          [-0.8, -0.45],
        ];
      function Y(q) {
        let st = bt.io3(q.enter),
          ct = q.k(0, 0, 4, bt.io3),
          V = q.k(1, 0, 6, bt.io4) * 0 + q.k(1, 0, 6, bt.io3),
          ft = q.k(2, 0, 7, bt.lin),
          nt = q.k(3, 0, 8, bt.io3),
          Mt = st + ct + V + ft + nt;
        (Fv(Mt, t.aspect, r), (q._U = Mt));
        let Et = r.p.distanceTo(r.t),
          at = Ct(Mt - 0.9, 0, 1),
          rt = Math.sin(q.t * 0.11) * 0.02 * at + q.mouse.x * 0.035 * at,
          U = Math.sin(q.t * 0.083 + 1) * 0.01 * at + q.mouse.y * 0.02 * at;
        lt.subVectors(r.p, r.t);
        let j = lt.length(),
          J = Math.atan2(lt.x, lt.z) + rt,
          Pt = Ct(Math.asin(lt.y / j) + U * 0.7, -0.1, 1.4);
        (r.p.set(
          r.t.x + Math.sin(J) * Math.cos(Pt) * j,
          Math.max(0.35, r.t.y + Math.sin(Pt) * j),
          r.t.z + Math.cos(J) * Math.cos(Pt) * j,
        ),
          a.position.copy(r.p),
          a.up.set(0, 1, 0),
          (a.fov = r.fov),
          (a.aspect = t.aspect),
          t.aspect < 1.7 &&
            (a.fov =
              (2 *
                Math.atan(Math.tan((r.fov * Math.PI) / 360) * K(1, 1.78 / t.aspect, Ct(Mt - 1) * 0.8)) *
                180) /
              Math.PI),
          (a.near = Ct(r.p.y * 0.02, 0.04, 12)),
          (a.far = 16e3),
          a.lookAt(r.t),
          a.rotateZ(r.roll + Math.sin(q.t * 0.07) * 0.002 * at),
          a.updateProjectionMatrix(),
          a.updateMatrixWorld(),
          ut.makeRotationFromEuler(
            new Cn(-0, Math.sin(q.t * 0.23) * 0.03 * at, Math.sin(q.t * 0.17) * 0.006 * at),
          ),
          ut.setPosition(is.x, is.y + Math.sin(q.t * 0.6) * 0.03 * at, is.z));
      }
      return {
        init() {
          ((l.uMap.value = s5(t).texture),
            (l.uNoise.value = a5(t).texture),
            (c = r5(t)),
            (u = l5(t, l, c)),
            (f = b0(t, l, { W: 660, H: 660, stride: 1 })),
            (h = b0(t, l, { W: 1e3, H: 1e3, stride: 2 })),
            (d = b0(t, l, { W: 640, H: 560, stride: 6 })),
            (p = c5(l, c)),
            (g = u5(t, l, c)),
            (g.u.uPoolT.value = h5(t, l, 300, 272).texture),
            (b = f5(t, { ...l, uInv: { value: w } })),
            S.add(b),
            (x = p5(t, l, c)),
            (v = _v(t, l, { n: 700, beam: !0 })),
            (m = [
              [260, 70, 9, 1.8],
              [520, 300, 46, 2.6],
              [900, 2600, 460, 4.6],
            ].map(([q, st, ct, V]) => {
              let ft = _v(t, l, { n: q });
              return ((ft.u.uR.value = st), (ft.u.uL.value = ct), (ft.u.uPer.value = V), ft);
            })),
            m[2].u.uC.value.set(0, -900),
            S.add(...x.main),
            M.add(...x.mirror),
            S.add(p.main, u.main.mesh, g.mesh),
            M.add(p.mirror, u.mirror.mesh),
            (p.main.renderOrder = 0),
            (u.main.mesh.renderOrder = 1),
            (g.mesh.renderOrder = 2),
            (y = t.pass(
              "uniform vec4 uBox; uniform float uA; void main(){ vec2 p=vec2(vUv.x,1.-vUv.y); vec2 d=max(abs(p-uBox.xy)-uBox.zw,0.)/vec2(.34,.34); float k=exp(-dot(d,d)*3.2)*uA; o=vec4(0.,0.,0.,k); }",
              { uBox: new ie(), uA: 0 },
              { transparent: !0, blending: Fo },
            )));
        },
        enter(q) {
          ((B = q.beat >= 3 ? q.since(3) : 0), (ot = {}));
        },
        update(q) {
          Y(q);
          let st = q.at(1),
            ct = q.at(3);
          q.since(3) === 0 && (B = 0);
          let V = (O, I, et) => kt((O - I) / (et - I)),
            ft = (O, I, et) => Math.exp(K(Math.log(O), Math.log(I), et)),
            nt = 0;
          (q.p[1] > 0 &&
            ((nt = ft(3.2, 15, V(st, 0, 1.1))),
            (nt = ft(nt, 55, V(st, 1.2, 2.4))),
            (nt = ft(nt, 140, V(st, 2.4, 3.7))),
            (nt = ft(nt, 300, V(st, 3.6, 5.6)))),
            (nt *= V(st, 0, 0.25)));
          let Mt = 0.1;
          (q.p[3] > 0 &&
            ((nt = ft(Math.max(nt, 1), 900, V(ct, 0.2, 2.8))),
            (nt = ft(nt, 2600, V(ct, 2.4, 5))),
            (nt = ft(nt, 13e3, V(ct, 4.2, 7.8)))),
            (l.uOn.value = nt),
            (l.uOnBand.value = Mt),
            (l.uT.value = q.t + 40),
            l.uCam.value.copy(a.position));
          let Et = q.k(1, 0, 6),
            at = q.k(2, 0, 4),
            rt = q.k(3, 0.3, 7.2),
            U = ft(0.02, 0.0034, Et);
          ((U = ft(U, 0.0046, q.k(2, 0.6, 2.4))),
            (U = ft(U, 0.0036, q.k(2, 4.2, 6.5))),
            (U = ft(U, 0.0021, rt)));
          let j = K(6, 34, Et);
          ((j = K(j, 26, q.k(2, 0.6, 2.4))),
            (j = K(j, 34, rt)),
            l.uFog.value.set(U, j, K(0.05, 0.17, Et) * K(1, 0.72, q.k(2, 4, 6)) * K(1, 2.2, rt), 1));
          let J = kt(Ct(q.enter * 1.6 - 0.5));
          (l.uLamp.value.set(is.x, is.y, is.z, 0.03 * J * (1 - 0.93 * q.k(1, 0.5, 3.5))),
            (l.uHigh.value = kt((r.p.y - 220) / 1100)),
            (l.uDawn.value = q.k(3, 3, 8)),
            (l.uSun.value = q.k(2, 0.2, 3.6, bt.lin)));
          let Pt = q.k(2, 0.1, 2.2, bt.out3),
            $ = q.k(2, 2.7, 3.9, bt.in2),
            tt = q.k(2, 3.5, 6, bt.io3);
          ((x.u.uRise.value = Pt), (x.u.uCrack.value = $), (x.u.uOpen.value = tt));
          for (let O of [...x.main, ...x.mirror]) O.visible = Pt > 0 && r.p.y < 1500;
          l.uCore.value.set(sh.x, sh.y, sh.z, ($ * 0.05 + tt * 0.085) * (1 - 0.9 * q.k(3, 1, 5)));
          let W = r.p.y;
          ((v.u.uReach.value = q.k(2, 0.9, 3.4, bt.lin)),
            (v.u.uA.value = 0.95 * q.k(2, 0.8, 1.8) * K(1, 0.3, q.k(2, 4.2, 5.6)) * (1 - q.k(3, 0.5, 3))));
          let D = (1.1 / t.H) * Math.tan((a.fov * Math.PI) / 360);
          ((v.u.uPx.value = D), (v.mesh.visible = v.u.uA.value > 0.002));
          let z = [kt((170 - W) / 120) * q.k(1, 1, 3), q.k(1, 3, 6) * kt((900 - W) / 500), q.k(3, 2, 6)];
          (m.forEach((O, I) => {
            ((O.u.uA.value = z[I] * [1.1, 1.3, 3.4][I]),
              (O.u.uPx.value = D * [1.1, 1.3, 1.6][I]),
              (O.mesh.visible = z[I] > 0.002));
          }),
            m[0].u.uC.value.set(0, Ct(r.p.z - 60, -120, 30)),
            m[1].u.uC.value.set(0, -120),
            (g.u.uRiver.value = q.k(2, 4, 7, bt.io3)),
            (u.main.u.uStream.value = q.k(2, 4.2, 6.6, bt.lin) * (1 - q.k(3, 2, 5))),
            (g.u.uR0.value = Math.max(0.3, W * 0.5)));
          let pt = 0,
            ht = -46,
            gt = (t.H * 0.5) / Math.tan((a.fov * Math.PI) / 360),
            dt = r.p.y;
          for (let O of [u.main, u.mirror])
            (O.u.uFocus.value.set(pt, ht), (O.u.uProj.value = gt), (O.mesh.visible = dt < 900 && nt > 0));
          ((u.mirror.mesh.visible = dt < 260 && nt > 0),
            (f.u.uProj.value = h.u.uProj.value = d.u.uProj.value = gt),
            d.u.uFocus.value.set(0, -600),
            d.u.uHole.value.set(0, -260, 1e3, 1e3),
            (d.mesh.visible = q.p[3] > 0.2),
            f.u.uFocus.value.set(0, -120),
            h.u.uFocus.value.set(0, -260),
            h.u.uHole.value.set(0, -120, dt < 800 ? 330 : 0, 330),
            (f.mesh.visible = q.p[3] > 0 && dt < 1400),
            (h.mesh.visible = q.p[3] > 0.05),
            p.u.uM.value.copy(ut));
          let Kt = 11,
            Ot = (q.t + 3) / Kt;
          for (let O of [p.main, p.mirror]) {
            let I = O.material.uniforms;
            ((I.uM.value = ut),
              (I.uPage.value = [14, 5, 1, 7, 11, 13, 10, 2][Math.floor(Ot) % 8]),
              (I.uW.value = Ot % 1),
              (I.uL.value = K(0.6, 0.95, q.k(1, 0, 2))));
          }
          p.main.visible = p.mirror.visible = dt < 400;
          {
            let O = q.k(1, 2.4, 4) * (1 - q.k(2, 0, 0.8)),
              I = q.k(2, 0.8, 2) * (1 - q.k(3, 0, 0.8)),
              et = q.k(3, 0.3, 1.6),
              Tt = e.w / 1920,
              vt = y.u,
              zt = (Ft, wt, mt, Dt, it) => {
                let Rt = (Ft - e.x0) / e.w,
                  xt = (wt - e.y0) / e.h,
                  Wt = mt / e.w,
                  Xt = Dt / e.h;
                (vt.uBox.value.set(Rt + Wt / 2, xt + Xt / 2, Wt / 2, Xt / 2), (vt.uA.value = it));
              };
            et > 0.01
              ? zt(-100, 660, 900, 480, 0.74 * et)
              : zt(-100, -100, 900, 360, Math.max(0.45 * O, 0.72 * I));
          }
          let Ut = bt.lin;
          (E.show(q.k(0, 0.5, 2.2, Ut), { style: "rise", q: q.k(1, 0, 0.8, Ut) }),
            T.show(q.k(1, 2.6, 4.4, Ut), { style: "rise", q: q.k(2, 0, 0.7, Ut) }),
            _.show(q.k(1, 3.8, 5.2, Ut), { style: "blur", q: q.k(2, 0, 0.5, Ut) }),
            R.show(q.k(2, 0.9, 2.5, Ut), { style: "rise", q: q.k(2, 3.7, 4.4, Ut) }),
            L.show(q.k(2, 1.7, 2.7, Ut), { style: "blur", q: q.k(2, 3.6, 4.1, Ut) }),
            k.show(q.k(2, 4.5, 6.1, Ut), { style: "rise", q: q.k(3, 0, 0.7, Ut) }),
            P.show(q.k(2, 5.4, 6.6, Ut), { style: "blur", q: q.k(3, 0, 0.5, Ut) }),
            C.show(q.k(3, 4.9, 6.9, Ut), { style: "rise" }),
            A.show(q.k(3, 6.4, 7.6, Ut), { style: "fade" }),
            G.update(Math.max(0, q.since(3) - B) * KA, q.k(3, 1, 2.6, Ut), q),
            i.audio.param("hum", Ct(0.15 + 0.3 * Et + 0.4 * rt)),
            Z("rise", q.p[1] > 0.02, () => i.sfx("riser", { gain: 0.5 }), q),
            Z("wh", q.at(2) > 0.9, () => i.sfx("whoosh", { gain: 0.9 }), q),
            Z("mil", q.p[3] > 0.04, () => i.sfx("rise", { gain: 0.7 }), q));
        },
        render(q, st) {
          (a.updateMatrixWorld(),
            w.multiplyMatrices(a.projectionMatrix, a.matrixWorldInverse).invert(),
            t.draw(M, a, s, { color: 0 }),
            (g.u.uRefl.value = s.texture),
            g.u.uRes.value.set(o.width, o.height),
            t.draw(S, a, o, { color: 0 }),
            v.mesh.visible && t.draw(v.scene, a, o, { clear: !1 }));
          for (let V of m) V.mesh.visible && t.draw(V.scene, a, o, { clear: !1 });
          f.mesh.visible && t.draw(f.scene, a, o, { clear: !1 });
          for (let V of [h, d]) V.mesh.visible && t.draw(V.scene, a, o, { clear: !1 });
          (y.render(o),
            t.post(o, q, {
              exposure: 1,
              bloom: K(0.5, 0.85, st.k(1, 0, 2)),
              threshold: 0.6,
              radius: 0.9,
              tone: "aces",
              contrast: 1.06,
              saturation: 1.1,
              vignette: 0.3,
              grain: 0.028,
              halation: 0.4,
              lift: [-0.002, 0.003, 0.0125],
              time: st.t,
            }));
          let ct = st.k(3, 0.6, 2.4);
          (ct > 0.001 && ((N.u.k.value = ct), N.render(q)), n.render(q));
        },
        portal: {
          in(q) {
            let st = Ct(q.enter),
              ct = [
                [-1, 1],
                [1, 1],
                [1, -1],
                [-1, -1],
              ],
              V = kt(Ct(st / 0.35));
            return {
              c: H.map(
                (nt, Mt) => (
                  lt.set(nt[0], nt[1], 0).applyMatrix4(ut).project(a),
                  [K(ct[Mt][0], lt.x, V), K(ct[Mt][1], lt.y, V)]
                ),
              ),
              a: 1 - kt((st - 0.5) / 0.42),
              shade: K(1, 0.96, st),
            };
          },
        },
      };
    },
  };

var ah = new F();

function Bo(i, t, e, n, o, s) {
  let a = (2 * Math.PI * o) / 4,
    r = Math.max(s - 2 * o, 0),
    l = Math.PI / 4;
  (ah.copy(t), (ah[n] = 0), ah.normalize());
  let c = (0.5 * a) / (a + r),
    u = 1 - ah.angleTo(i) / l;
  return Math.sign(ah[e]) === 1 ? u * c : r / (a + r) + c + c * (1 - u);
}

var _0 = class i extends Mi {
  constructor(t = 1, e = 1, n = 1, o = 2, s = 0.1) {
    let a = o * 2 + 1;
    if (
      ((s = Math.min(t / 2, e / 2, n / 2, s)),
      super(1, 1, 1, a, a, a),
      (this.type = "RoundedBoxGeometry"),
      (this.parameters = { width: t, height: e, depth: n, segments: o, radius: s }),
      a === 1)
    )
      return;
    let r = this.toNonIndexed();
    ((this.index = null),
      (this.attributes.position = r.attributes.position),
      (this.attributes.normal = r.attributes.normal),
      (this.attributes.uv = r.attributes.uv));
    let l = new F(),
      c = new F(),
      u = new F(t, e, n).divideScalar(2).subScalar(s),
      f = this.attributes.position.array,
      h = this.attributes.normal.array,
      d = this.attributes.uv.array,
      p = f.length / 6,
      x = new F(),
      v = 0.5 / a;
    for (let m = 0, g = 0; m < f.length; m += 3, g += 2)
      switch (
        (l.fromArray(f, m),
        c.copy(l),
        (c.x -= Math.sign(c.x) * v),
        (c.y -= Math.sign(c.y) * v),
        (c.z -= Math.sign(c.z) * v),
        c.normalize(),
        (f[m + 0] = u.x * Math.sign(l.x) + c.x * s),
        (f[m + 1] = u.y * Math.sign(l.y) + c.y * s),
        (f[m + 2] = u.z * Math.sign(l.z) + c.z * s),
        (h[m + 0] = c.x),
        (h[m + 1] = c.y),
        (h[m + 2] = c.z),
        Math.floor(m / p))
      ) {
        case 0:
          (x.set(1, 0, 0), (d[g + 0] = Bo(x, c, "z", "y", s, n)), (d[g + 1] = 1 - Bo(x, c, "y", "z", s, e)));
          break;
        case 1:
          (x.set(-1, 0, 0),
            (d[g + 0] = 1 - Bo(x, c, "z", "y", s, n)),
            (d[g + 1] = 1 - Bo(x, c, "y", "z", s, e)));
          break;
        case 2:
          (x.set(0, 1, 0), (d[g + 0] = 1 - Bo(x, c, "x", "z", s, t)), (d[g + 1] = Bo(x, c, "z", "x", s, n)));
          break;
        case 3:
          (x.set(0, -1, 0),
            (d[g + 0] = 1 - Bo(x, c, "x", "z", s, t)),
            (d[g + 1] = 1 - Bo(x, c, "z", "x", s, n)));
          break;
        case 4:
          (x.set(0, 0, 1),
            (d[g + 0] = 1 - Bo(x, c, "x", "y", s, t)),
            (d[g + 1] = 1 - Bo(x, c, "y", "x", s, e)));
          break;
        case 5:
          (x.set(0, 0, -1), (d[g + 0] = Bo(x, c, "x", "y", s, t)), (d[g + 1] = 1 - Bo(x, c, "y", "x", s, e)));
          break;
      }
  }
  static fromJSON(t) {
    return new i(t.width, t.height, t.depth, t.segments, t.radius);
  }
};

var lh = Math.log(1.5),
  As = 30,
  jA = 0.01,
  ch = 1 / 8,
  y5 = 0.5,
  T0 = 9 / 16,
  uh = 1.375,
  $A = Math.asin(y5),
  b5 = (i) => jA * Math.pow(1.5, i),
  w5 = 1.5 * ch,
  ZA = w5 + y5,
  JA = (i) => i + Math.asin(Math.max(-1, Math.min(1, ZA * Math.cos(i) - w5))),
  QA = (i) => 0.32 * i + 0.68 * Math.pow(i, 2.3);

function M5(i, t, e) {
  for (let s = 0; s < As; s++) e[s] = 0;
  let n = Math.floor(i),
    o;
  (n >= As - 1 ? ((n = As - 1), (o = t)) : (o = $A * QA(i - n)), (e[n] = o));
  for (let s = n - 1; s >= 0; s--) ((o = JA(o)), (e[s] = o));
  return e;
}

var Cr = 0.5,
  bc = 1.9,
  kv = 0.47,
  rh = 0.9772,
  S5 = (bc - Cr) / kv,
  A0 = (i) => {
    if (i <= Cr) return 0;
    if (i < bc) return Math.pow((i - Cr) / (bc - Cr), S5);
    let t = 1 - ((i - bc) * (1 - rh)) / kv;
    return t <= 0.02 ? 1 + Math.log(0.02) / Math.log(rh) : 1 + Math.log(t) / Math.log(rh);
  },
  La = (i) =>
    i <= 0
      ? Cr
      : i <= 1
        ? Cr + (bc - Cr) * Math.pow(i, 1 / S5)
        : bc + (kv * (1 - Math.pow(rh, i - 1))) / (1 - rh);

var Dv = `
uniform vec3 uL; uniform float uOut, uSkyT;
vec3 skyBase(vec3 d){
  float h=clamp(d.y,0.,1.), mu=clamp(dot(d,uL),0.,1.);
  vec3 c=mix(vec3(1.10,.86,.62),vec3(.52,.70,.90),smoothstep(0.,.17,h)); c=mix(c,vec3(.13,.31,.66),smoothstep(.08,.75,h));
  c+=vec3(1.,.56,.24)*(.20*pow(mu,5.)+.7*pow(mu,36.));
  vec3 ind=mix(vec3(.86,.76,.62),vec3(.98,.93,.84),smoothstep(0.,.45,h));
  return mix(ind,c,uOut);
}`,
  tR = `
uniform float uS,uFog,uGob,uT,uPx; uniform vec3 uSun,uSky,uBounce; uniform highp sampler2DShadow tSh; uniform sampler2D tShZ; uniform mat4 uShM; uniform vec4 uShP; uniform float uFr,uFa;
float ign(vec2 p){return fract(52.9829189*fract(dot(p,vec2(.06711056,.00583715))));}
vec2 vog(int i,float n,float a){float r=sqrt((float(i)+.5)/n),t=float(i)*2.399963+a;return vec2(cos(t),sin(t))*r;}
float shadow(vec3 P,vec3 N){
  vec3 q=(uShM*vec4(P+N*uShP.x,1.)).xyz; vec2 e=min(q.xy,1.-q.xy); float edge=smoothstep(0.,.06,min(e.x,e.y)); if(edge<=0.||q.z>=1.) return 1.;
  float a=ign(gl_FragCoord.xy+5.588238*uFr)*6.2832, b=0., n=0.;
  for(int i=0;i<7;i++){ float z=textureLod(tShZ,q.xy+vog(i,7.,a)*uShP.w,0.).r; if(z<q.z-.00001){b+=z;n+=1.;} }
  if(n<.5) return 1.;
  if(n>6.5&&(q.z-b/n)*uShP.y>uShP.w*1.2) return 1.-edge;
  float pen=clamp((q.z-b/n)*uShP.y,uShP.z,uShP.w), s=0.;
  for(int i=0;i<15;i++) s+=texture(tSh,vec3(q.xy+vog(i,15.,a)*pen,q.z));
  return mix(1.,s/15.,edge);
}
// how much of the sky the falling slab hides from a point below it
float under(vec3 P){
#ifdef DOM
 return 0.;
#endif
 return uFa<=0.?0.:uFa*smoothstep(.75,.2,abs(P.z))*smoothstep(1.5,.7,P.x-1.375)*smoothstep(-.25,.02,P.x-1.375); }
vec3 lit(vec3 alb,vec3 P,vec3 N,float thin){
  vec3 V=normalize(cameraPosition-P); float nl=dot(N,uL), sh=nl>0.?shadow(P,N):0.;
  if(uGob>.001&&sh>0.){ vec3 wp=P*uS; vec2 gp=(wp.xz-uL.xz/uL.y*wp.y)*140.+vec2(.5,7.5); gp+=vec2(sin(uT*.6)+.5*sin(uT*1.37),cos(uT*.47))*.35; float lf=fbm(gp*.22+vec2(uT*.03,0.))*.75+vnoise(gp*.9+sin(uT*.8+gp.yx*.6)*.18)*.25; sh*=mix(1.,smoothstep(.31,.52,lf)*.9+.1,uGob); }
  float up=N.y*.5+.5; vec3 amb=mix(uBounce,uSky,smoothstep(-.15,.75,up)); amb+=vec3(.07,.065,.06)*max(dot(N,vec3(-uL.x,.1,-uL.z)),0.);
  vec3 c=alb*(amb*(1.-.62*under(P))+uSun*max(nl,0.)*sh);
  c+=alb*uSun*vec3(1.,.80,.55)*thin*max(-nl,0.);
  return c;
}
vec3 fogged(vec3 c,vec3 P){ vec3 d=P-cameraPosition; float l=length(d); d/=l; float f=1.-exp(-pow(l*uFog,1.15)*exp(-max(P.y,0.)*.05)); vec3 hz=skyBase(normalize(vec3(d.x,max(d.y*.55,.015),d.z))); return mix(c,hz,clamp(f,0.,1.)); }
`,
  E5 = `
out vec3 vP,vN,vC,vL,vO; 
#ifdef CITY
in vec4 iB; flat out vec4 vB;
#endif
#ifdef DOM
in float iNum; flat out float vId;
#endif
#ifdef VCOL
in vec3 col;
#endif
void main(){
  mat4 M=modelMatrix;
#ifdef USE_INSTANCING
  M=M*instanceMatrix;
#endif
  vec4 w=M*vec4(position,1.); vP=w.xyz; mat3 m=mat3(M); vN=normalize(m*(normal/vec3(dot(m[0],m[0]),dot(m[1],m[1]),dot(m[2],m[2])))); vL=position; vO=normal; vC=vec3(1.);
#ifdef VCOL
  vC=col;
#endif
#ifdef USE_INSTANCING_COLOR
  vC=instanceColor;
#endif
#ifdef CITY
  vB=iB;
#endif
#ifdef DOM
  vId=iNum;
#endif
  gl_Position=projectionMatrix*viewMatrix*w;
}`,
  fh =
    Fe +
    Dv +
    tR +
    `in vec3 vP,vN,vC,vL,vO; layout(location=0) out vec4 o;
`,
  Uv =
    fh +
    `
void main(){ vec3 N=normalize(gl_FrontFacing?vN:-vN); vec3 wp=vP*uS; float fw=max(length(fwidth(wp)),1e-6);
  vec3 a=vC; a*=1.+.05*(vnoise(wp*900.)-.5)*smoothstep(.0016,.0004,fw)+.05*(vnoise(wp*60.)-.5)*smoothstep(.02,.004,fw);
  o=vec4(fogged(lit(a,vP,N,.04),vP),1.); }`,
  _5 =
    fh +
    `
flat in vec4 vB;
void main(){ vec3 N=normalize(vN); vec3 a=vC; vec3 d=vL*vB.xyz; // metres on the building
  float fw=length(fwidth(d))+1e-5; 
  if(abs(vO.y)<.5){ float u=abs(vO.x)>.5?d.z:d.x; vec2 cell=vec2(3.2+fract(vB.w*7.)*1.6,3.5); vec2 q=vec2(u,d.y)/cell; vec2 f=abs(fract(q)-.5); float aa=fw/3.2; vec2 w=vec2(.22+fract(vB.w*13.)*.14,.26); float win=smoothstep(w.x+aa,w.x-aa*.3,f.x)*smoothstep(w.y+aa,w.y-aa*.3,f.y); float cov=w.x*w.y*4.; win=mix(win,cov,smoothstep(.35,1.1,aa)); win*=step(1.5,d.y)*smoothstep(vB.y-.8,vB.y-1.6,d.y); a*=1.-.52*win; }
  else a*=.95;
  a*=mix(.80,1.,smoothstep(0.,.22,vL.y+.0));
  o=vec4(fogged(lit(a,vP,N,.0),vP),1.); }`,
  T5 =
    fh +
    `
flat in float vId; uniform sampler2D tNum,tBig;
void main(){ vec3 N=normalize(vN); vec3 a=vec3(.93,.925,.91); float fw=length(fwidth(vL))+1e-5;
  if(abs(vO.x)>.5){ vec2 uv=vec2(vO.x>0.?-vL.z:vL.z,vL.y-.585)/.30+.5; if(all(greaterThan(uv,vec2(0.)))&&all(lessThan(uv,vec2(1.)))){ float k; if(vId>28.5) k=texture(tBig,uv).r; else { vec2 c=vec2(mod(vId,6.),floor(vId/6.)); k=texture(tNum,(c+vec2(uv.x,1.-uv.y))/vec2(6.,5.)).r; } a=mix(a,vId>28.5?vec3(.022,.02,.018):vec3(.045,.042,.04),k*.95); } }
  // the small ones are card, the giant ones are built: seams and weather fade in with size
  float big=smoothstep(15.,23.,vId); if(big>0.){ vec2 p=abs(vO.x)>.5?vec2(vL.z,vL.y):vec2(vL.x,vL.y); vec2 n=vec2(16.)*mix(1.,2.,smoothstep(25.,28.,vId)); vec2 g=abs(fract(p*n)-.5)/n; float l1=smoothstep(.0007+fw,.0001,.5/n.x-max(g.x,g.y)); a*=1.-big*.055*l1;
    vec2 n2=n*8.; vec2 g2=abs(fract(p*n2)-.5)/n2; a*=1.-big*.05*smoothstep(.00012+fw,0.,.5/n2.x-max(g2.x,g2.y))*smoothstep(.0012,.0003,fw);
    float tone=hash12(floor(p*n)+vId); a*=1.-big*.022*tone; float st=vnoise(vec2(p.x*90.,p.y*3.))*vnoise(vec2(p.x*31.,p.y*1.3+4.)); a*=1.-big*.16*st*smoothstep(1.,.2,vL.y); }
  a*=1.+.025*(vnoise(vec3(vL.zyx)*260.)-.5)*smoothstep(.006,.001,fw)*(1.-big);
  vec3 lc=lit(a,vP,N,.11); if(vId>28.5&&vO.x>.5) lc*=mix(1.,mix(.50,1.04,smoothstep(0.,.62,vL.y)),uFa); o=vec4(fogged(lc,vP),1.); }`,
  A5 =
    fh +
    `
float band(float x,float w,float aa){return smoothstep(w+aa,w-aa,abs(x));}
vec3 woodF(vec2 q,float fw){
  float pl=floor(q.y/.135); float ju=q.x+hash11(pl+7.)*3.; float seg=floor(ju/1.7); float id=hash12(vec2(pl,seg)); vec3 wood=mix(vec3(.40,.235,.115),vec3(.56,.36,.195),id);
  float gr=0.; float am=.5; vec2 gq=vec2(q.x*5.,q.y*55.)+id*37.; for(int i=0;i<6;i++){ float fr=pow(3.1,float(i)); float k=1.-smoothstep(.12,.6,fw*55.*fr); if(k<=0.) break; float nn=vnoise(gq*fr+vec2(0.,vnoise(gq*fr*.22)*2.2)); gr+=(nn-.5)*am*k; am*=.72; } wood*=1.+gr*.62; if(fw<.01){ float rings=sin((q.y*300.+fbm(q*vec2(6.,30.)+id*9.)*16.)); wood*=1.+.07*rings*(1.-smoothstep(.002,.01,fw)); }
  float sd=min(abs(fract(q.y/.135)-.5)-.5,0.)*-.135; float se=min(fract(ju/1.7),1.-fract(ju/1.7))*1.7; return wood*(1.-.62*smoothstep(.0013+fw,.0004,min(sd,se))*smoothstep(.05,.006,fw)); }
vec3 lawnF(vec2 p,float fw){ vec3 lawn=mix(vec3(.31,.36,.23),vec3(.40,.43,.28),vnoise(p*.35)); if(fw<.8) lawn*=1.+.35*(vnoise(p*14.)-.5)*smoothstep(.2,.02,fw)+.2*(vnoise(p*3.)-.5)*smoothstep(.8,.1,fw)+.4*(vnoise(p*vec2(120.,60.))-.5)*smoothstep(.02,.004,fw); return lawn; }
void main(){ vec3 N=vec3(0.,1.,0.); vec2 p=vP.xz*uS; float fw=max(length(fwidth(p)),1e-7); float r=length(p); vec3 a;
  float inR=min(min(p.x+3.2,5.0-p.x),min(p.y+2.6,3.2-p.y)), gd=max(abs(p.x-4.),abs(p.y));
  if(inR>.1+fw) a=woodF(p,fw);
  else if(gd<21.+fw){ vec3 lawn=lawnF(p,fw); vec3 stone=vec3(.60,.56,.50); vec2 sg=abs(fract(p/1.2)-.5); stone*=1.-.28*smoothstep(.485-fw/1.2,.497,max(sg.x,sg.y))*smoothstep(.6,.1,fw); stone*=1.+.12*(hash12(floor(p/1.2))-.5); a=mix(lawn,stone,band(p.y,.36*max(p.x,0.)+1.2,.05+fw)); if(inR>-fw) a=mix(a,woodF(p,fw),smoothstep(-fw,fw,inR)); a=mix(a,vec3(.75,.72,.66),smoothstep(.06+fw,.06,abs(inR+.06))); if(gd>21.-fw) a=mix(a,vec3(.5,.48,.45),.5); }
  else { vec3 pave=mix(vec3(.56,.53,.49),vec3(.62,.59,.54),vnoise(p*.02)), street=vec3(.36,.345,.34);
  float cell=r<430.?26.:70.; vec2 c=abs(fract(p/cell)-.5)*cell; float road=max(smoothstep(cell*.5-cell*.11-fw*.5,cell*.5-cell*.11+fw*.5,c.x),smoothstep(cell*.5-cell*.11-fw*.5,cell*.5-cell*.11+fw*.5,c.y)); float lane=fw<.5?max(band(c.x-cell*.5,.12,fw),band(c.y-cell*.5,.12,fw))*step(.45,fract((p.x+p.y)/6.))*smoothstep(.5,.1,fw):0.;
  float wedge=band(p.y,.40*max(p.x,0.)+4.,2.+fw)*(1.-smoothstep(1700.,1900.,p.x)); float park=smoothstep(.62,.66,vnoise(p/190.+3.)); vec3 block=mix(pave,lawnF(p,fw)*1.15,park*step(r,9000.));
  vec3 town=mix(block,street,road*(1.-wedge)); town=mix(town,vec3(.8),lane*road*(1.-wedge)*.8); vec2 tg=abs(fract(p/18.)-.5)*18.; vec3 plaza=vec3(.64,.60,.54)*(1.-.16*smoothstep(8.85-fw,9.,max(tg.x,tg.y))*smoothstep(8.,1.,fw)); plaza*=1.+.08*(hash12(floor(p/18.))-.5); town=mix(town,plaza,wedge); float e0=length(p-vec2(1400.,0.));
  if(e0>2400.){ vec3 land=mix(vec3(.40,.43,.28),vec3(.56,.52,.36),smoothstep(.35,.65,vnoise(p/420.))); land*=1.+.25*(vnoise(p/90.)-.5); town=mix(town,land,smoothstep(3300.,4600.,e0+(fbm(p/900.)-.5)*1500.)); }
  a=town; }
  o=vec4(fogged(lit(a,vP,N,0.),vP),1.); }`,
  R5 =
    fh +
    `
void main(){ vec3 N=normalize(vN); vec3 wp=vP*uS; float st=wp.y/95.; float f=fract(st), fw=fwidth(st); vec3 a=mix(vec3(.46,.47,.36),vec3(.72,.69,.64),smoothstep(250.,900.,wp.y+300.*(vnoise(wp.xz/400.)-.5))); a=mix(a,vec3(.93),smoothstep(1250.,1500.,wp.y+400.*(vnoise(wp.xz/260.)-.5))); a*=1.-.28*smoothstep(.16+fw,.0,f)*smoothstep(1.,.3,fw); a*=.96+.08*hash11(floor(st));
  o=vec4(fogged(lit(a,vP,N,0.),vP),1.); }`,
  C5 =
    Fe +
    Dv +
    `
uniform vec3 uR,uU,uF; uniform float uCl; in vec2 vUv; layout(location=0) out vec4 o;
void main(){ vec2 c=vUv*2.-1.; vec3 d=normalize(uF+uR*c.x+uU*c.y); vec3 s=skyBase(d);
  if(uCl>.01&&d.y>.005){ vec2 p=d.xz/(d.y+.16)*1.15+vec2(uSkyT*.022,uSkyT*.009); float n=fbm(p+fbm(p*.6)*.7); float dn=smoothstep(.50,.74,n)*smoothstep(.0,.12,d.y)*uCl; float li=fbm(p+normalize(uL.xz)*.09+fbm(p*.6)*.7); float sh=clamp((li-n)*3.2+.62,0.,1.); vec3 cc=mix(vec3(1.75,1.42,1.08),vec3(.62,.64,.76),sh); s=mix(s,cc,dn*.88); }
  o=vec4(s,1.); }`,
  P5 = "out vec2 vUv; void main(){ vUv=position.xy*.5+.5; gl_Position=vec4(position.xy,1.,1.); }",
  L5 = "layout(location=0) out vec4 o; void main(){ o=vec4(gl_FragCoord.z); }",
  z5 = `void main(){ mat4 M=modelMatrix;
#ifdef USE_INSTANCING
 M=M*instanceMatrix;
#endif
 gl_Position=projectionMatrix*viewMatrix*M*vec4(position,1.); }`,
  Hv = "uniform vec2 uNF; float lz(float z){ return uNF.x*uNF.y/(uNF.y-z*(uNF.y-uNF.x)); }",
  I5 = `
uniform sampler2D tD; uniform vec2 uTan; uniform float uRad,uFull; ${Hv}
float ign(vec2 p){return fract(52.9829189*fract(dot(p,vec2(.06711056,.00583715))));}
vec3 vp(vec2 u){ float z=lz(textureLod(tD,u,0.).r); return vec3((u*2.-1.)*uTan*z,z); }
void main(){ vec3 p=vp(vUv); if(p.z>uFull){o=vec4(1.);return;} vec2 px=1./uRes; vec3 a=vp(vUv+vec2(px.x,0.))-p,b=p-vp(vUv-vec2(px.x,0.)),c=vp(vUv+vec2(0.,px.y))-p,d=p-vp(vUv-vec2(0.,px.y)); vec3 dx=abs(a.z)<abs(b.z)?a:b, dy=abs(c.z)<abs(d.z)?c:d; vec3 n=normalize(cross(dy,dx)); 
  float occ=0., j=ign(gl_FragCoord.xy), an=j*6.2832; float rr=uRad*(.35+.25*p.z); float sr=min(rr/(p.z*uTan.y*2.),.22);
  for(int i=0;i<11;i++){ float r=(float(i)+j)/11.; float t=float(i)*2.399963+an; vec2 u=vUv+vec2(cos(t)*uTan.y/uTan.x,sin(t))*r*sr; vec3 v=vp(u)-p; float vv=dot(v,v), vn=dot(v,n); float f=max(0.,1.-vv/(rr*rr)); occ+=f*max(0.,vn-.012*rr-.0016*p.z)/(sqrt(vv)+.02*rr); }
  o=vec4(clamp(1.-occ/11.*2.6,0.,1.)); }`,
  N5 = `
uniform sampler2D tA,tD; ${Hv}
void main(){ vec2 px=1./uRes; float z=lz(texture(tD,vUv).r), s=0.,w=0.; for(int y=-2;y<=1;y++)for(int x=-2;x<=1;x++){ vec2 u=vUv+(vec2(x,y)+.5)*px; float k=exp(-abs(lz(texture(tD,u).r)-z)/(z*.02)); s+=k*texture(tA,u).r; w+=k; } o=vec4(s/max(w,1e-3)); }`,
  F5 = `
uniform sampler2D tA,tD,tO,tU; uniform float uFoc,uAp,uMaxC,uAoK; ${Hv}
void main(){ vec4 c=texture(tA,vUv); float z=lz(texture(tD,vUv).r); float ao=texture(tO,vUv).r; ao=mix(1.,ao,uAoK); c.rgb*=mix(vec3(.20,.15,.13),vec3(1.),ao); vec4 d=texture(tU,vUv); c.rgb=c.rgb*(1.-d.a)+d.rgb; float coc=clamp((1.-uFoc/z)*uAp,-uMaxC,uMaxC); o=vec4(min(c.rgb,vec3(60.)),coc); }`,
  k5 = `
uniform sampler2D tA; uniform float uMaxC;
float ign(vec2 p){return fract(52.9829189*fract(dot(p,vec2(.06711056,.00583715))));}
void main(){ vec4 c=texture(tA,vUv); float cc=abs(c.a); vec3 s=c.rgb; float w=1.; float a=ign(gl_FragCoord.xy+5.588238*uTime)*2.4; vec2 asp=vec2(uRes.y/uRes.x,1.); float fg=max(0.,-c.a);
  for(int i=0;i<10;i++){ float t=float(i)*.6283+a, r=i%2==0?uMaxC:uMaxC*.5; vec4 q=texture(tA,vUv+vec2(cos(t),sin(t))*r*asp); if(-q.a>r*.8) fg=max(fg,-q.a); }
  float mx=min(uMaxC,max(cc,fg)*1.04+.0006); float cmax=cc;
  for(int i=0;i<46;i++){ float r=sqrt((float(i)+.5)/46.)*mx; float t=float(i)*2.399963+a; vec4 q=texture(tA,vUv+vec2(cos(t),sin(t))*r*asp); float k=abs(q.a); if(q.a>c.a) k=min(k,cc*1.6); float m=smoothstep(r-mx*.1,r+mx*.02,k); s+=mix(s/w,q.rgb,m); w+=1.; cmax=max(cmax,m*k*step(q.a,0.)); }
  o=vec4(s/w,cmax); }`,
  D5 = `
uniform sampler2D tA,tB; void main(){ vec4 a=texture(tA,vUv), b=texture(tB,vUv); float k=smoothstep(.0009,.0032,max(abs(a.a),b.a)); o=vec4(mix(a.rgb,b.rgb,k),1.); }`,
  U5 = `
in vec4 iA,iB2; out vec2 vQ; out vec4 vK; flat out vec2 vR; uniform float uTm,uKc,uAmb,uFocD,uApD; uniform vec2 uAsp; uniform vec3 uCamR,uCamU;
float h1(float p){p=fract(p*.1031);p*=p+33.33;p*=p+p;return fract(p);}
uniform float uTimes[32]; uniform float uFall;
void main(){ float kind=iA.x; float s1=iB2.x,s2=iB2.y,s3=iB2.z,s4=iB2.w; vec3 c=vec3(0.); float size=0.,al=0.,rot=s1*6.28; float stretch=1.;
  if(kind<.5){ // impact burst of event k
    float k=iA.y; float age=uTm-uTimes[int(k)]; float sc=exp(.405465*(k-uKc)); float L=.55+.065*k; float u=age/L; if(u>0.&&u<1.&&sc>.02&&sc<6.){ float e=1.-exp(-3.2*u); float hw=.28*sc; vec3 b=vec3(1.25*sc-.02*sc,.0,(s1*2.-1.)*hw); vec2 dir=normalize(vec2((s2-.62)*1.5,(s1*2.-1.)*1.4+(s3-.5)*.8)); float sp=(.18+.60*s4*s4)*sc; c=b+vec3(dir.x,0.,dir.y)*sp*e; c.y=(.03+.03*s3+(.08+.42*s3*s3)*e*(1.-.35*u))*sc; size=(.05+.24*e)*(.55+.8*s2)*sc; float str=.20+.80*smoothstep(2.,20.,k); al=str*(1.-u)*(1.-u)*smoothstep(0.,.06,u)*smoothstep(.02,.08,sc); rot+=u*(s2-.5)*2.; } }
  else if(kind<1.5){ // standing plume at the last one
    float sc=exp(.405465*(29.-uKc)); float T=uTm*(.045+.05*s1)+s2; float u=fract(T); float hw=.30; vec3 b=vec3(1.18+ (s3-.5)*.5,.0,(s1*2.-1.)*hw*1.3); float out1=u*(.25+.5*s4); c=(b+vec3((s3-.4)*out1*1.2,.01+u*(.05+.20*s4),sign(s1-.5)*out1*.8))*sc; size=(.05+.22*u)*(.6+.8*s2)*sc; al=.26*uAmb*smoothstep(0.,.2,u)*(1.-u); rot+=u*(s2-.5); }
  else if(kind<2.5){ // motes
    vec3 q=fract(vec3(s1,s2,s3)+vec3(.011,.006,-.008)*uTm*(.4+s4)+.02*vec3(sin(uTm*.5+s4*40.),cos(uTm*.4+s1*30.),sin(uTm*.3+s2*50.)))-.5; c=vec3(1.5,.95,1.3)+q*vec3(4.4,2.1,3.4); size=.0035+.004*s4; al=.9*iA.y*smoothstep(9.,3.,uKc); }
  else if(kind<3.5){ // cloud puffs round the top of the last one
    float sc=exp(.405465*(29.-uKc)); float z=fract(s1+uTm*.0032*(.6+s2))*2.-1.; float ring=s3<.5?-1.:1.; c=vec3(1.3+ring*(.30+.5*s4)+.06*sin(uTm*.2+s2*9.),.70+.15*(s2-.5)+.02*sin(uTm*.3+s1*20.),z*1.5)*sc; size=(.10+.12*s4)*sc; al=.26*uAmb*smoothstep(1.,.7,abs(z))*(1.-smoothstep(.02,.3,uFall)); rot=s1*6.28+uTm*.01; stretch=1.7; }
  else if(kind>4.5){ // chips shaken off the face, hanging in the last moment
    float sc=exp(.405465*(29.-uKc)); float yy=fract(s3-uTm*.022*(.5+s1)-uFall*.35); c=vec3(1.46+.66*s2+.015*sin(uTm*.3+s4*20.),.02+.40*yy,(s1*2.-1.)*(.40-.0*s4)+.02*sin(uTm*.21+s2*30.))*sc; size=(.0007+.0032*s4*s4*s4)*sc; al=smoothstep(.45,.85,uFall)*smoothstep(0.,.08,yy)*smoothstep(1.,.9,yy); rot+=uTm*(s4-.5)*2.2; }
  else { // dust thrown by the falling face
    float sc=exp(.405465*(29.-uKc)); float st=s2*.85; float u=clamp((uFall-st)/(1.05-st),0.,1.); float T=fract(uTm*(.03+.03*s1)+s3); c=vec3(1.30+(.2+1.3*s4)*(.25+.9*u)+.1*T,.01+.16*s3*u+.05*T,(s1*2.-1.)*(.35+.7*u))*sc; size=(.06+.16*u+.05*T)*sc; al=.34*smoothstep(0.,.25,u)*smoothstep(0.,.2,T)*smoothstep(1.,.75,T); }
  vec4 v=viewMatrix*vec4(c,1.); if(kind<1.5||(kind>2.5&&kind<4.5)) al*=smoothstep(.12+size*.6,.45+size*1.6,-v.z); float coc=kind>1.5&&kind<2.5?abs(1.-uFocD/max(-v.z,.05))*uApD*-v.z/uAsp.y*.5:0.; if(kind>1.5&&kind<2.5){ float s0=size; size=size*.5+coc; al*=clamp(s0*s0*3.5/(size*size),0.,1.); }
  float cs=cos(rot),sn=sin(rot); vec2 q=position.xy*vec2(stretch,1.); q=kind>2.5&&kind<3.5?q:vec2(q.x*cs-q.y*sn,q.x*sn+q.y*cs); v.xy+=q*size*2.; vQ=position.xy*2.; vK=vec4(al,kind,s1,-v.z); vR=vec2(cs,sn); if(al<.003||size<=0.) gl_Position=vec4(2.,2.,2.,1.); else gl_Position=projectionMatrix*v; }`,
  H5 =
    Fe +
    Dv +
    `
in vec2 vQ; in vec4 vK; flat in vec2 vR; layout(location=0) out vec4 o; uniform sampler2D tD,tN; uniform vec2 uR2; uniform vec3 uLv,uSunP,uAmbP; uniform float uSoft; uniform vec2 uNF;
float lz(float z){ return uNF.x*uNF.y/(uNF.y-z*(uNF.y-uNF.x)); }
void main(){ float r=length(vQ); if(r>1.) discard; float zd=lz(texture(tD,gl_FragCoord.xy/uR2).r); 
  if(vK.y>1.5&&vK.y<2.5){ if(vK.w>zd) discard; float a=vK.x*(smoothstep(1.,.86,r)*(.75+.25*r*r)); o=vec4(vec3(1.9,1.45,.95)*a*.5,0.); return; }
  if(vK.y>4.5){ if(vK.w>zd) discard; vec2 k=vec2(vQ.x*vR.x-vQ.y*vR.y,vQ.x*vR.y+vQ.y*vR.x); float e=max(abs(k.x)*(1.+vK.z),abs(k.y)*1.3+.2*k.x); float a=vK.x*smoothstep(.72,.58,e); o=vec4(mix(vec3(.34,.30,.27),vec3(.95,.86,.76),step(.0,k.x+k.y*.6))*a,a); return; }
  float n=texture(tN,vQ*.22+vec2(vK.z*7.13,vK.z*3.7)).r; float d=smoothstep(.0,.75,(1.-r*r)*.95+(n-.5)*1.25)*smoothstep(1.,.55,r); float soft=smoothstep(0.,uSoft*(vK.y>2.5&&vK.y<3.5?1.5:1.),zd-vK.w); float a=d*vK.x*soft; if(a<.004) discard;
  vec2 q=vec2(vQ.x*vR.x-vQ.y*vR.y,vQ.x*vR.y+vQ.y*vR.x); if(vK.y>2.5&&vK.y<3.5) q=vQ; float li=clamp(.5+.55*dot(q,uLv.xy)+(n-.5)*.6+.25*max(-uLv.z,0.),0.,1.4); vec3 c=uAmbP+uSunP*li; if(vK.y>2.5&&vK.y<3.5) c=vec3(.66,.69,.78)+vec3(1.,.84,.64)*li; o=vec4(c*a,a); }`;

var nR = (i) => new de(i),
  Wn = "#c4523a",
  Qe = "#f1ede4",
  Rs = "#cdc6ba",
  Pr = "#a49c90",
  Ro = "#57514a",
  hh = "#c99a66",
  B5 = "#a3a98f",
  O5 = "#8b9279",
  za = class {
    constructor() {
      ((this.a = []), (this.m = new ne()), (this.st = [new ne()]));
    }
    push(t = 0, e = 0, n = 0, o = 0, s = 1, a = 0, r = 0) {
      let l = new ne().compose(new F(t, e, n), new qe().setFromEuler(new Cn(a, o, r, "YXZ")), new F(s, s, s));
      return (this.st.push(this.st.at(-1).clone().multiply(l)), this);
    }
    pop() {
      return (this.st.pop(), this);
    }
    add(t, e, n = 0, o = 0, s = 0, a = 0, r = 0, l = 0) {
      t.index && (t = t.toNonIndexed());
      let c = new ne().compose(new F(n, o, s), new qe().setFromEuler(new Cn(a, r, l)), new F(1, 1, 1));
      t.applyMatrix4(this.st.at(-1).clone().multiply(c));
      for (let d of Object.keys(t.attributes)) d !== "position" && d !== "normal" && t.deleteAttribute(d);
      let u = nR(e),
        f = t.attributes.position.count,
        h = new Float32Array(f * 3);
      for (let d = 0; d < f; d++) ((h[d * 3] = u.r), (h[d * 3 + 1] = u.g), (h[d * 3 + 2] = u.b));
      return (t.setAttribute("col", new $t(h, 3)), this.a.push(t), this);
    }
    box(t, e, n, o, s = 0, a = 0, r = 0, l = 0, c = 0, u = 0) {
      return this.add(new Mi(t, e, n), o, s, a, r, l, c, u);
    }
    cyl(t, e, n, o, s = 0, a = 0, r = 0, l = 0, c = 0, u = 0, f = 20) {
      return this.add(new On(t, e, n, f), o, s, a, r, l, c, u);
    }
    tube(t, e, n, o = 60, s = !1) {
      return this.add(
        new Io(
          new qs(
            t.map((a) => new F(...a)),
            s,
          ),
          o,
          e,
          8,
          s,
        ),
        n,
      );
    }
    done() {
      return Qf(this.a, !1);
    }
  };

function iR(i) {
  (i.cyl(0.0037, 0.0037, 0.135, Wn, 0.0675, 0.0034, 0, 0, 0, Math.PI / 2, 6),
    i.cyl(0.0038, 0.0038, 0.01, "#c8b98f", 0.14, 0.0034, 0, 0, 0, Math.PI / 2),
    i.cyl(0.0036, 0.0036, 0.012, "#e6a79a", 0.15, 0.0034, 0, 0, 0, Math.PI / 2),
    i.cyl(0.0037, 0.0012, 0.016, "#dcb88a", -0.008, 0.0034, 0, 0, 0, -Math.PI / 2, 12),
    i.cyl(0.0012, 1e-4, 0.0055, "#3a3633", -0.0187, 0.0034, 0, 0, 0, -Math.PI / 2, 10));
}

function oR(i, t) {
  let e = new Qt(),
    n = [],
    o = [],
    s = 150,
    a = 0.62 + t() * 0.42;
  for (let l = 0; l <= s; l++) {
    let c = l / s,
      u = c * a * 6.283,
      f = 0.0016 + 0.001 * c,
      h = 0.001 + 6e-4 * c,
      d = 1 + 0.045 * Math.abs(Math.sin(u * 4));
    if (
      (n.push(
        Math.cos(u) * f,
        h,
        Math.sin(u) * f,
        Math.cos(u) * f * 3.3 * d,
        h + 0.003 * d,
        Math.sin(u) * f * 3.3 * d,
        Math.cos(u) * f * 3.48 * d,
        h + 0.0033 * d,
        Math.sin(u) * f * 3.48 * d,
      ),
      l < s)
    ) {
      let p = l * 3;
      o.push(p, p + 1, p + 3, p + 3, p + 1, p + 4);
    }
  }
  let r = [];
  for (let l = 0; l < s; l++) {
    let c = l * 3;
    r.push(c + 1, c + 2, c + 4, c + 4, c + 2, c + 5);
  }
  for (let [l, c] of [
    [o, "#e6c597"],
    [r, Wn],
  ]) {
    let u = new Qt();
    (u.setAttribute("position", new ae(n, 3)), u.setIndex(l), u.computeVertexNormals(), i.add(u, c));
  }
}

function V5() {
  let i = ze(11),
    t = [];
  {
    let e = new za();
    (e.push(0.019, 0, -0.0215, 0.36, 0.9), iR(e), e.pop());
    for (let [n, o, s, a, r] of [
      [-0.001, -0.0165, 0.66, 0.4, 0.3],
      [-0.0075, -0.002, 0.5, 2.2, -0.5],
      [0.004, 0.008, 0.34, 4.2, 0.75],
      [-0.0045, 0.0105, 0.3, 1, -0.8],
      [0.027, 0.0095, 0.34, 5.2, 0.8],
      [0.036, 0.014, 0.4, 2.9, -0.4],
      [0.03, -0.03, 0.7, 0.9, 0.4],
      [0.05, -0.02, 0.6, 3.3, -0.3],
      [-0.016, -0.015, 0.7, 1.7, 0.5],
    ])
      (e.push(n, -4e-4, o, a, s, r), oR(e, i), e.pop());
    for (let n = 0; n < 70; n++) {
      let o = 8e-5 + 22e-5 * i();
      e.box(
        o * 2,
        o,
        o,
        i() < 0.5 ? "#3a3633" : "#d9b587",
        -0.014 + i() * 0.04,
        o * 0.5,
        -0.012 + i() * 0.02,
        0,
        i() * 3,
        i(),
      );
    }
    (e.push(-0.075, 0, -0.036, 0.36), e.box(0.3, 0.0016, 0.03, "#e3c695", 0.15, 8e-4, 0));
    for (let n = 0; n <= 290; n++) {
      let o = n % 10 === 0 ? 0.009 : n % 5 === 0 ? 0.0065 : 0.0042;
      e.box(22e-5, 4e-5, o, "#3b352e", 0.005 + n * 0.001, 0.00163, 0.0148 - o / 2);
    }
    (e.pop(),
      e.push(0.06, 0, 0.04, -0.35, 0.8),
      e.box(0.026, 0.011, 0.017, Qe, 0, 0.0055, 0),
      e.box(0.03, 0.0114, 0.0174, Wn, 0.02, 0.0057, 0),
      e.pop(),
      e.push(0.075, 0, -0.058, 0.9),
      e.box(0.025, 0.012, 0.015, "#b9b2a6", 0, 0.006, 0),
      e.box(0.024, 0.0012, 0.009, "#8a837a", 0, 0.0125, 0),
      e.pop());
    for (let [n, o, s] of [
      [-0.03, -0.022, 0.5],
      [0.085, 0.04, 2.2],
    ])
      (e.push(n, 6e-4, o, s),
        e.tube(
          [
            [-0.012, 0, -0.004],
            [0.012, 0, -0.004],
            [0.016, 0, 0],
            [0.012, 0, 0.004],
            [-0.008, 0, 0.004],
            [-0.012, 3e-4, 0.001],
            [-0.008, 6e-4, -0.002],
            [0.008, 6e-4, -0.002],
            [0.011, 6e-4, 0],
            [0.008, 6e-4, 0.0018],
            [-0.004, 6e-4, 0.0018],
          ],
          5e-4,
          "#9a958c",
          120,
        ),
        e.pop());
    t.push({ g: e.done(), min: 0.004, max: 0.9 });
  }
  {
    let e = new za(),
      n = (s, a, r, l, c, u, f, h) => {
        (e.push(c, u, f, h),
          e.box(s, 0.004, r, l, 0, a - 0.002, 0),
          e.box(s, 0.004, r, l, 0, 0.002, 0),
          e.box(0.004, a, r, l, -s / 2 + 0.002, a / 2, 0),
          e.box(s - 0.008, a - 0.008, r - 0.01, "#ece4d3", 0.001, a / 2, 0),
          e.pop());
      };
    (n(0.24, 0.032, 0.17, Rs, 0.16, 0, -0.22, 0.2),
      n(0.22, 0.026, 0.16, "#b7b09b", 0.165, 0.032, -0.222, 0.42),
      n(0.2, 0.022, 0.145, Qe, 0.16, 0.058, -0.22, 0.1),
      n(0.25, 0.03, 0.18, Pr, 0.62, 0, 0.42, -0.5),
      n(0.21, 0.024, 0.15, Qe, 0.63, 0.03, 0.42, -0.2),
      e.push(0.42, 0, -0.3));
    let o = [
      [0, 0],
      [0.036, 0],
      [0.04, 0.004],
      [0.041, 0.095],
      [0.039, 0.096],
      [0.036, 0.012],
      [0, 0.01],
    ].map((s) => new Nt(...s));
    (e.add(new fr(o, 36), Qe),
      e.add(new yo(0.027, 0.0055, 10, 24, Math.PI), Qe, 0.041, 0.05, 0, 0, 0, -Math.PI / 2),
      e.cyl(0.037, 0.037, 0.001, "#3c2417", 0, 0.083, 0),
      e.pop(),
      e.push(0.3, 0, 0.26, 0.6));
    for (let s = 0; s < 7; s++)
      e.box(
        0.21,
        4e-4,
        0.297,
        s % 2 ? "#faf7f0" : "#efeae0",
        (i() - 0.5) * 0.02,
        4e-4 + s * 5e-4,
        (i() - 0.5) * 0.02,
        0,
        (i() - 0.5) * 0.3,
        0,
      );
    (e.pop(),
      e.push(-0.12, 0, -0.2),
      e.cyl(0.04, 0.04, 0.1, Rs, 0, 0.05, 0, 0, 0, 0, 28),
      e.cyl(0.0035, 0.0035, 0.17, Wn, 0.012, 0.11, 0.006, 0.18, 0, -0.12, 6),
      e.cyl(0.0035, 0.0035, 0.16, Ro, -0.014, 0.1, 0.004, -0.1, 0, 0.16, 6),
      e.cyl(0.0035, 0.0035, 0.165, hh, 0, 0.105, -0.014, -0.16, 0, 0.05, 6),
      e.pop(),
      e.push(0.78, 0, -0.5, 0.5),
      e.cyl(0.085, 0.095, 0.022, Wn, 0, 0.011, 0, 0, 0, 0, 36),
      e.cyl(0.007, 0.007, 0.36, Wn, 0, 0.19, 0, 0, 0, 0.12),
      e.cyl(0.007, 0.007, 0.3, Wn, 0.1, 0.46, 0, 0, 0, -1),
      e.cyl(0.03, 0.085, 0.13, Wn, 0.24, 0.51, 0, 0, 0, 0.5, 28),
      e.pop(),
      t.push({ g: e.done(), min: 0.012, max: 8 }));
  }
  {
    let e = new za(),
      n = "#e9e2d5",
      o = -2.66,
      s = 0.12,
      a = (p, x, v, m) => e.box(x - p, m - v, s, n, (p + x) / 2, (v + m) / 2, o),
      r = [
        [-3.02, -1.74],
        [-1.6, -0.32],
        [-0.18, 1.1],
      ],
      l = 0.34,
      c = 2.46,
      u = 2.78;
    (a(-3.2, 2.35, 0, l),
      a(-3.2, 2.35, c, u),
      a(-3.2, -3.02, l, c),
      a(-1.74, -1.6, l, c),
      a(-0.32, -0.18, l, c),
      a(1.1, 2.35, l, c),
      a(2.35, 3.35, 2.14, u),
      a(3.35, 5, 0, u),
      e.box(8.3, 0.03, 0.2, Qe, 0.9, u + 0.015, o));
    for (let [p, x] of r) {
      let v = x - p,
        m = (p + x) / 2;
      e.box(v + 0.06, 0.05, 0.2, Qe, m, l, o + 0.02);
      for (let g of [p + 0.03, x - 0.03]) e.box(0.06, c - l, 0.07, Qe, g, (l + c) / 2, o);
      (e.box(v, 0.06, 0.07, Qe, m, c - 0.03, o), e.box(0.032, c - l, 0.05, Qe, m, (l + c) / 2, o));
      for (let g = 1; g < 4; g++) e.box(v, 0.028, 0.05, Qe, m, l + ((c - l) * g) / 4, o);
    }
    (e.box(0.07, 2.14, 0.18, Qe, 2.35, 1.07, o),
      e.box(0.07, 2.14, 0.18, Qe, 3.35, 1.07, o),
      e.box(1.07, 0.07, 0.18, Qe, 2.85, 2.14, o),
      e.push(3.32, 0, o + 0.03, -1),
      e.box(0.94, 2.09, 0.045, Wn, -0.47, 1.05, 0),
      e.add(new ci(0.03, 14, 10), "#d8c9a0", -0.87, 1.02, 0.05));
    for (let p of [0.55, 1.5]) e.box(0.66, 0.72, 0.05, "#b8482f", -0.47, p, 0);
    (e.pop(), e.box(8.2, 0.1, 0.02, Qe, 0.9, 0.05, o + 0.07));
    let f = (p, x, v, m) => {
      e.push(p, 0, x, v);
      for (let [g, b] of [
        [-0.19, -0.19],
        [0.19, -0.19],
        [-0.19, 0.19],
        [0.19, 0.19],
      ])
        e.cyl(0.016, 0.012, 0.45, m, g, 0.225, b, b * 0.25, 0, -g * 0.25);
      e.box(0.43, 0.025, 0.42, m, 0, 0.455, 0);
      for (let g of [-0.19, 0.19]) e.cyl(0.013, 0.016, 0.43, m, g, 0.67, -0.21, -0.12, 0, 0);
      for (let g of [0.62, 0.74, 0.86]) e.box(0.41, 0.055, 0.016, m, 0, g, -0.205 - (g - 0.45) * 0.12, -0.12);
      e.pop();
    };
    (f(0.95, -1.25, 0.7, Wn),
      f(0.25, -1.6, -0.4, Qe),
      f(2.3, 1.75, 2.6, Qe),
      e.push(-1, 0, -1.92, 0.05),
      e.box(1.5, 0.035, 0.78, hh, 0, 0.735, 0));
    for (let [p, x] of [
      [-0.68, -0.32],
      [0.68, -0.32],
      [-0.68, 0.32],
      [0.68, 0.32],
    ])
      e.cyl(0.026, 0.018, 0.72, hh, p, 0.36, x);
    (e.pop(), e.push(1.75, 0, -2.4));
    for (let p of [0.02, 0.5, 1, 1.5, 1.98]) e.box(0.95, 0.025, 0.3, Qe, 0, p, 0);
    for (let p of [-0.47, 0.47]) e.box(0.025, 2, 0.3, Qe, p, 1, 0);
    let h = -0.42;
    for (let p = 0; p < 4; p++)
      for (h = -0.43; h < 0.38;) {
        let x = 0.018 + i() * 0.035,
          v = 0.24 + i() * 0.16,
          m = i();
        (e.box(
          x,
          v,
          0.2,
          m < 0.08 ? Wn : m < 0.5 ? Rs : m < 0.75 ? Qe : Pr,
          h + x / 2,
          0.035 + [0, 0.48, 0.98, 1.48][p] + v / 2,
          0.02,
        ),
          (h += x + 0.003),
          i() < 0.12 && (h += 0.12));
      }
    (e.pop(), e.push(1.35, 0, -1.9), e.cyl(0.17, 0.13, 0.34, Qe, 0, 0.17, 0, 0, 0, 0, 28));
    for (let p = 0; p < 15; p++) {
      let x = p * 2.4,
        v = 0.55 + i() * 0.75,
        m = 0.18 + i() * 0.3;
      (e.tube(
        [
          [0, 0.3, 0],
          [Math.cos(x) * m * 0.3, 0.3 + v * 0.5, Math.sin(x) * m * 0.3],
          [Math.cos(x) * m, 0.3 + v, Math.sin(x) * m],
        ],
        0.007,
        O5,
        10,
      ),
        e.add(
          new ci(0.13, 10, 7).scale(1, 0.16, 0.5),
          B5,
          Math.cos(x) * m * 1.2,
          0.3 + v,
          Math.sin(x) * m * 1.2,
          0,
          -x,
          0.5,
        ));
    }
    (e.pop(),
      e.push(3.9, 0, -1.9),
      e.cyl(0.16, 0.16, 0.02, Ro, 0, 0.01, 0),
      e.cyl(0.012, 0.012, 1.6, Ro, 0, 0.8, 0),
      e.cyl(0.17, 0.24, 0.3, Qe, 0, 1.66, 0, 0, 0, 0, 30),
      e.pop());
    let d = (p, x, v, m, g = 1) => {
      (e.push(p, 0, x, v, g),
        e.add(new ci(0.11, 18, 14).scale(1, 1.18, 1), m, 0, 1.62, 0),
        e.add(new Vs(0.17, 0.42, 6, 16).scale(1, 1, 0.62), m, 0, 1.17, 0));
      for (let b of [-0.09, 0.09]) e.add(new Vs(0.075, 0.68, 5, 12), m, b, 0.43, b * 0.6, b * 0.9, 0, 0);
      for (let b of [-0.23, 0.23]) e.add(new Vs(0.048, 0.5, 5, 10), m, b, 1.12, 0, b * 0.5, 0, b * 0.35);
      e.pop();
    };
    (d(4.35, -1.75, 0.3, Qe),
      d(5.8, -2.9, 0.4, Rs),
      d(6.3, -3.1, -0.3, Wn),
      d(7.6, 3.6, -1, Qe, 0.62),
      d(8, 3.8, -1.2, Qe),
      t.push({ g: e.done(), min: 0.006, max: 40 }));
  }
  {
    let e = new za(),
      n = (r, l, c, u, f, h, d, p) => {
        (e.push(r, 0, l, c), e.box(u, h, f, p, 0, h / 2, 0));
        let x = f * 0.42,
          v = new ro();
        (v.moveTo(-f / 2 - 0.35, 0),
          v.lineTo(f / 2 + 0.35, 0),
          v.lineTo(0, x),
          v.closePath(),
          e.add(new Ws(v, { depth: u + 0.5, bevelEnabled: !1 }), d, -u / 2 - 0.25, h, 0, 0, Math.PI / 2, 0));
        for (let m = 0; m < Math.round(u / 2.6); m++)
          for (let g of [1.5, 4.1]) {
            if (g > h - 0.8) continue;
            let b = -u / 2 + 1.3 + (m * (u - 2.6)) / Math.max(1, Math.round(u / 2.6) - 1);
            (e.box(0.95, 1.25, 0.12, "#8e887e", b, g, f / 2),
              e.box(1.15, 0.08, 0.2, Qe, b, g - 0.66, f / 2 + 0.03),
              e.box(0.06, 1.25, 0.14, Qe, b, g, f / 2 + 0.01),
              e.box(0.95, 1.25, 0.12, "#8e887e", b, g, -f / 2));
          }
        (e.box(0.9, 1.6, 0.9, Rs, u * 0.28, h + x * 0.9, f * 0.12),
          e.box(1, 2.1, 0.14, Wn, -0.2, 1.05, f / 2 + 0.02),
          e.pop());
      };
    (n(12, -14, 0.05, 10, 7.5, 5.6, Wn, Qe),
      n(26.5, -19, -0.06, 11, 8, 5.8, Pr, Qe),
      n(50, -36, 0.1, 9, 7, 5.4, Rs, Qe),
      n(38, -25, 0, 12, 8, 6.2, Rs, "#e7dfd0"),
      n(-13, 12, 0.9, 9, 7, 5, Pr, Qe));
    let o = (r, l, c, u) => {
      (e.push(r, 0, l, c),
        e.box(4.2, 0.62, 1.72, u, 0, 0.62, 0),
        e.box(2.3, 0.52, 1.5, u, -0.2, 1.18, 0),
        e.box(2, 0.4, 1.54, "#5f5a54", -0.2, 1.18, 0));
      for (let f of [-1.3, 1.3])
        for (let h of [-0.8, 0.8]) e.cyl(0.33, 0.33, 0.22, "#33302d", f, 0.33, h, Math.PI / 2, 0, 0, 18);
      e.pop();
    };
    (o(16, -8.4, 0.1, Wn),
      o(21.5, -9.4, -0.05, Qe),
      o(9.2, -6.6, 0.6, Rs),
      o(27, -12.4, 0.02, Qe),
      o(17, 8.6, 0.1, Rs));
    for (let r = 0; r < 9; r++) {
      let l = 7 + r * 5.2,
        c = -(0.42 * l + 2.2);
      (e.cyl(0.05, 0.075, 5.4, Ro, l, 2.7, c, 0, 0, 0, 10),
        e.cyl(0.035, 0.035, 1.2, Ro, l, 5.35, c + 0.55, Math.PI / 2, 0, 0, 8),
        e.box(0.22, 0.1, 0.5, Qe, l, 5.33, c + 1.1));
    }
    for (let r = 0; r < 46; r++) {
      let l = -8 + r * 0.55;
      e.box(0.07, 0.95, 0.03, Qe, l, 0.48, -8.6 + Math.sin(r) * 0.01);
    }
    (e.box(25, 0.06, 0.04, Qe, 4.5, 0.74, -8.62), e.box(25, 0.06, 0.04, Qe, 4.5, 0.3, -8.62));
    let s = (r, l, c) => {
      e.push(r, 0, l, c);
      for (let u of [-0.7, 0.7])
        (e.box(0.07, 0.44, 0.42, Ro, u, 0.22, 0), e.box(0.07, 0.4, 0.06, Ro, u, 0.62, -0.2, -0.15));
      for (let u = 0; u < 4; u++) e.box(1.7, 0.03, 0.09, hh, 0, 0.455, -0.16 + u * 0.11);
      for (let u = 0; u < 3; u++) e.box(1.7, 0.09, 0.03, hh, 0, 0.58 + u * 0.12, -0.2 - u * 0.017, -0.15);
      e.pop();
    };
    (s(8.2, 5.2, 3),
      s(13.5, 7.6, 3.2),
      e.push(11.2, 0, 6.3),
      e.cyl(0.2, 0.2, 1.25, Wn, 0, 0.68, 0),
      e.cyl(0.23, 0.23, 0.12, Wn, 0, 1.33, 0),
      e.add(new ci(0.22, 18, 10).scale(1, 0.5, 1), Wn, 0, 1.38, 0),
      e.cyl(0.24, 0.24, 0.1, Ro, 0, 0.05, 0),
      e.box(0.24, 0.04, 0.03, Ro, 0, 1.15, 0.2),
      e.pop());
    let a = (r, l, c) => {
      e.push(r, 0.34, l, c);
      for (let f of [-0.52, 0.52]) {
        e.add(new yo(0.33, 0.022, 8, 32), Ro, f, 0, 0);
        for (let h = 0; h < 4; h++) e.cyl(0.004, 0.004, 0.64, Pr, f, 0, 0, 0, 0, h * 0.785, 5);
      }
      let u = (f, h, d, p) => {
        let x = d - f,
          v = p - h;
        e.cyl(0.022, 0.022, Math.hypot(x, v), Wn, (f + d) / 2, (h + p) / 2, 0, 0, 0, Math.atan2(-x, v), 8);
      };
      (u(-0.52, 0, -0.15, 0.5),
        u(-0.15, 0.5, 0.38, 0.52),
        u(0.38, 0.52, 0, -0.05),
        u(0, -0.05, -0.15, 0.5),
        u(-0.52, 0, 0, -0.05),
        u(0.52, 0, 0.36, 0.66),
        e.box(0.05, 0.04, 0.5, Ro, 0.34, 0.68, 0),
        e.box(0.26, 0.05, 0.12, Ro, -0.18, 0.58, 0),
        e.pop());
    };
    (a(6.6, 4.6, 0.25), a(9.9, 5.9, -0.1));
    for (let r = 0; r < 16; r++) {
      let l = 6 + r * 1.75,
        c = 0.42 * l + 3 + (r % 3) * 0.2;
      e.box(0.9, 0.42, 0.9, r % 5 ? Qe : Rs, l, 0.21, c);
    }
    t.push({ g: e.done(), min: 0.25, max: 260 });
  }
  {
    let e = new za(),
      n = (a, r, l, c, u) => {
        e.push(a, 0, r, l);
        let f = Math.round(c / 4);
        for (let [h, d] of [
          [-1, -1],
          [1, -1],
          [-1, 1],
          [1, 1],
        ])
          e.box(0.35, c, 0.35, u, h, c / 2, d);
        for (let h = 0; h < f; h++) {
          let d = ((h + 0.5) * c) / f;
          (e.box(2.6, 0.2, 0.2, u, 0, d, 1, 0, 0, h % 2 ? 0.95 : -0.95),
            e.box(2.6, 0.2, 0.2, u, 0, d, -1, 0, 0, h % 2 ? -0.95 : 0.95),
            e.box(0.2, 0.2, 2.6, u, 1, d, 0, h % 2 ? 0.95 : -0.95));
        }
        (e.box(56, 0.4, 0.4, u, 17, c + 1, -0.9),
          e.box(56, 0.4, 0.4, u, 17, c + 1, 0.9),
          e.box(50, 0.4, 0.4, u, 16, c + 3.2, 0));
        for (let h = 0; h < 18; h++)
          e.box(0.2, 2.6, 0.2, u, -8 + h * 2.9, c + 2, 0.4, 0.3, 0, h % 2 ? 0.7 : -0.7);
        (e.box(5, 3.4, 2.6, Pr, -9, c, 0),
          e.box(0.4, 10, 0.4, u, 0, c + 5, 0),
          e.box(46, 0.16, 0.16, u, 22, c + 6, 0, 0, 0, -0.145),
          e.box(0.12, 26, 0.12, Ro, 34, c - 12, 0),
          e.box(5, 0.8, 2, Pr, 34, c - 25, 0),
          e.box(2.6, 2.8, 2.6, Qe, 0, c + 0.4, 2),
          e.pop());
      };
    (n(74, -62, -0.5, 58, Wn),
      n(150, -120, 0.9, 82, Wn),
      n(330, -300, 0.3, 110, "#e7e1d6"),
      ((a, r, l) => {
        e.push(a, 0, r, 0.3);
        let c = 0;
        ([
          [62, 0.22],
          [54, 0.16],
          [45, 0.14],
          [36, 0.12],
          [27, 0.11],
          [18, 0.09],
          [9, 0.07],
          [4, 0.09],
        ].forEach(([f, h], d) => {
          let p = l * h;
          for (let x = 0; x < 3; x++) {
            let v = x * 2.094 + d * 0.35;
            e.cyl(
              f * 0.42,
              f * 0.44,
              p * (1 - 0.13 * x * (d < 6 ? 1 : 0)),
              x === 0 ? "#f4efe6" : "#e9e3d8",
              Math.cos(v) * f * 0.46,
              c + (p * (1 - 0.13 * x * (d < 6 ? 1 : 0))) / 2,
              Math.sin(v) * f * 0.46,
              0,
              v,
              0,
              10,
            );
          }
          (e.cyl(f * 0.44, f * 0.46, p, "#f4efe6", 0, c + p / 2, 0, 0, 0, 0, 10), (c += p));
        }),
          e.cyl(0.6, 2.2, l * 0.06, Wn, 0, c + l * 0.03, 0, 0, 0, 0, 8),
          e.pop());
      })(2150, -1060, 828));
    let s = (a, r, l) => {
      e.push(a, 0, r);
      for (let [c, u] of [
        [-1, -1],
        [1, -1],
        [-1, 1],
        [1, 1],
      ]) {
        let f = [];
        for (let h = 0; h <= 8; h++) {
          let d = h / 8,
            p = l * 0.19 * Math.pow(1 - d, 2.1) + l * 0.006;
          f.push([c * p, d * l, u * p]);
        }
        e.tube(f, l * 0.0085, Wn, 24);
      }
      for (let c of [0.19, 0.37, 0.62]) {
        let u = l * 0.19 * Math.pow(1 - c, 2.1) + l * 0.012;
        e.box(u * 2.3, l * 0.016, u * 2.3, Wn, 0, l * c, 0);
      }
      (e.cyl(0.6, 1.6, l * 0.1, Qe, 0, l * 1.04, 0), e.pop());
    };
    (s(640, -560, 330), s(2480, -640, 300), t.push({ g: e.done(), min: 3, max: 1e5 }));
  }
  return t;
}

function G5() {
  let i = ze(5),
    t = [],
    e = new de(),
    n = ["#f2eee5", "#e9e3d7", "#dfd8ca", "#d3cabb", "#efe9de", "#e4dccd", "#cfc5b6", "#e9d9c4"],
    o = (p, x, v, m, g, b, y) => t.push([p, x, v, m, g, b, y || n[(i() * n.length) | 0], i()]),
    s = (p, x, v) =>
      p > 1800 + v ? !0 : p < 0 ? Math.abs(x) > 14 + v || p < -30 : Math.abs(x) > 0.4 * p + 7 + v,
    a = (p, x) =>
      x > 0 && p < 1700
        ? Math.max(0, 0.022 * p + 0.085 * x)
        : p < 60 && x < -30
          ? Math.hypot(p, x) * 0.27
          : 1e9;
  for (let p = -8; p < 17; p++)
    for (let x = -14; x < 14; x++) {
      let v = (p + 0.5) * 26,
        m = (x + 0.5) * 26,
        g = Math.hypot(v, m);
      if (g > 420 || Math.max(Math.abs(v - 4), Math.abs(m)) < 34 || !s(v, m, 12) || i() < 0.1) continue;
      let b = i() < 0.4 ? 2 : 1;
      for (let y = 0; y < b; y++) {
        let S = b === 1 ? 12 + i() * 7 : 8 + i() * 1.5,
          M = 11 + i() * 7,
          w = Ct(g / 260),
          E = 7 + i() * 9 + w * i() * 34;
        ((E = Math.min(E, a(v, m))),
          !(E < 5) &&
            (o(
              v + (b === 1 ? (i() - 0.5) * 3 : (y - 0.5) * 10),
              m + (i() - 0.5) * 3,
              S,
              E,
              M,
              0,
              i() < 0.05 ? "#c4624c" : null,
            ),
            E > 24 && m < 0 && i() < 0.6 && o(v, m, S * 0.6, E + 4 + i() * 6, M * 0.6, 0)));
      }
    }
  for (let p = -36; p < 78; p++)
    for (let x = -48; x < 40; x++) {
      let v = (p + 0.5) * 70,
        m = (x + 0.5) * 70;
      if (Math.hypot(v, m) < 450 || !s(v, m, 34)) continue;
      let b = Math.hypot(v - 1400, m);
      if (b > 3300 + 700 * Math.sin(Math.atan2(m, v - 1400) * 5) || i() < 0.06 + 12e-5 * b) continue;
      let y =
          Math.exp(-((v - 2300) ** 2 + (m + 1150) ** 2) / 56e4) +
          0.5 * Math.exp(-((v - 2900) ** 2 + (m - 900) ** 2) / 16e4) +
          0.6 * Math.exp(-((v - 500) ** 2 + (m + 520) ** 2) / 6e4),
        S = y > 0.35 ? 1 : i() < 0.5 ? 2 : 1;
      for (let M = 0; M < S; M++) {
        let w = S === 1 ? 26 + i() * 24 : 18 + i() * 8,
          E = 24 + i() * 26,
          T = 10 + i() * i() * 46 + y * (30 + i() * i() * 330);
        if (((T = Math.min(T, a(v, m))), T < 5)) continue;
        let _ = Math.hypot(v - 3200, m - 1984);
        (_ < 1100 && (T = Math.min(T, 12 + _ * 0.05 * (0.4 + i() * 0.6))),
          v > 1700 && Math.abs(m) < 420 && (T = Math.min(T, 16 + i() * 34)));
        let R = v + (S === 1 ? (i() - 0.5) * 8 : (M - 0.5) * 34),
          L = m + (i() - 0.5) * 8;
        (o(R, L, w, T, E, 0, i() < 0.02 ? "#c4624c" : null),
          T > 70 &&
            (o(R, L, w * 0.74, T * (1.12 + i() * 0.2), E * 0.74, 0),
            i() < 0.5 && o(R, L, w * 0.42, T * (1.3 + i() * 0.3), E * 0.42, 0)));
      }
    }
  let r = new Mi(1, 1, 1).translate(0, 0.5, 0),
    l = new Hi(r, null, t.length);
  l.instanceColor = new Ue(new Float32Array(t.length * 3), 3);
  let c = new Float32Array(t.length * 4),
    u = new ne(),
    f = new qe(),
    h = new F(),
    d = new F();
  return (
    t.forEach((p, x) => {
      (u.compose(h.set(p[0], 0, p[1]), f.identity(), d.set(p[2], p[3], p[4])),
        l.setMatrixAt(x, u),
        e.set(p[6]),
        l.instanceColor.setXYZ(x, e.r, e.g, e.b),
        c.set([p[2], p[3], p[4], p[7]], x * 4));
    }),
    r.setAttribute("iB", new Ue(c, 4)),
    (l.frustumCulled = !1),
    l
  );
}

function q5() {
  let i = ze(9),
    t = [],
    e = (c, u) => c < 0 || Math.abs(u) > 0.42 * c + 2.2,
    n = (c, u) => (u > 0 ? (0.12 + (0.2 * u) / Math.max(c, 1)) * c * 0.8 + 0.6 : 99);
  for (let c = 0; c < 900 && t.length < 190; c++) {
    let u = -26 + i() * 70,
      f = -34 + i() * 60;
    if (
      Math.hypot(u, f) < 9 ||
      !e(u, f) ||
      (Math.abs(u - 12) < 7 && Math.abs(f + 14) < 6) ||
      (Math.abs(u - 26.5) < 8 && Math.abs(f + 19) < 6.5) ||
      (f < -2 && f > -11 && u > 6 && u < 30) ||
      (u < 7 && f < -5) ||
      (f > 1 && u > -7)
    )
      continue;
    let h = Math.min(3 + i() * 4.5, n(u, f));
    t.push([u, f, h]);
  }
  for (let c = 0; c < 16; c++) {
    let u = 6 + c * 1.75,
      f = 0.42 * u + 3 + (c % 3) * 0.2;
    t.push([u, f, 1.15 + 0.35 * i()]);
  }
  for (let c = 0; c < 150; c++) {
    let u = 5 + i() * 24,
      f = 0.42 * u + 4.5 + i() * 12,
      h = 0.3 + i() * 0.6;
    t.push([u, f, h, -0.3 * h]);
  }
  for (let c = 0; c < 26; c++) {
    let u = 8 + i() * 34,
      f = -(0.42 * u + 9 + i() * 13);
    (Math.abs(u - 12) < 7 && Math.abs(f + 14) < 6) || t.push([u, f, 3 + i() * 3.5]);
  }
  for (let c = 0; c < 2600; c++) {
    let u = -400 + i() * 5e3,
      f = -2600 + i() * 4600;
    if (Math.hypot(u, f) < 60 || (u < 1800 && !e(u, f - Math.sign(f) * 8))) continue;
    let h = Math.abs(((((u / 70) % 1) + 1) % 1) - 0.5),
      d = Math.abs(((((f / 70) % 1) + 1) % 1) - 0.5);
    Math.max(h, d) < 0.4 || t.push([u, f, 7 + i() * 8]);
  }
  let o = new ne(),
    s = new qe(),
    a = new Cn(),
    r = new de(),
    l = (c, u) => {
      let f = new za(),
        h = new go(0.36, u),
        d = h.attributes.position,
        p = h.attributes.normal;
      for (let v = 0; v < d.count; v++) {
        let m = d.getX(v),
          g = d.getY(v),
          b = d.getZ(v),
          y = 1 + 0.09 * Math.sin(m * 17 + g * 9) * Math.sin(b * 15 + g * 7);
        ((m *= y), (g *= y * 1.05), (b *= y), d.setXYZ(v, m, g, b));
        let S = Math.hypot(m, g, b);
        p.setXYZ(
          v,
          m / S + 0.25 * Math.sin(b * 22 + g * 13),
          g / S + 0.2 * Math.sin(m * 19),
          b / S + 0.25 * Math.sin(m * 21 + g * 15),
        );
      }
      (f.add(h, "#ffffff", 0, 0.64, 0),
        f.cyl(0.02, 0.03, 0.4, "#8a6a48", 0, 0.18, 0, 0, 0, 0, u > 1 ? 6 : 3));
      let x = new Hi(f.done(), null, c.length);
      return (
        (x.instanceColor = new Ue(new Float32Array(c.length * 3), 3)),
        c.forEach((v, m) => {
          let g = v[2] * (0.75 + i() * 0.4);
          (o.compose(new F(v[0], v[3] || 0, v[1]), s.setFromEuler(a.set(0, i() * 6, 0)), new F(g, v[2], g)),
            x.setMatrixAt(m, o),
            r.set(i() < 0.5 ? B5 : i() < 0.6 ? O5 : "#b0b29a").offsetHSL(0, 0, (i() - 0.5) * 0.06),
            x.instanceColor.setXYZ(m, r.r, r.g, r.b));
        }),
        (x.frustumCulled = !1),
        x
      );
    };
  return [
    l(
      t.filter((c) => Math.hypot(c[0], c[1]) < 60),
      2,
    ),
    l(
      t.filter((c) => Math.hypot(c[0], c[1]) >= 60),
      1,
    ),
  ];
}

function W5() {
  let e = [],
    n = [],
    o = (l, c) => {
      let u = Math.sin(l * 127.1 + c * 311.7) * 43758.5453;
      return u - Math.floor(u);
    },
    s = (l, c) => {
      let u = Math.floor(l),
        f = Math.floor(c),
        h = l - u,
        d = c - f;
      return (
        (h = h * h * (3 - 2 * h)),
        (d = d * d * (3 - 2 * d)),
        K(K(o(u, f), o(u + 1, f), h), K(o(u, f + 1), o(u + 1, f + 1), h), d)
      );
    },
    a = (l, c) => {
      let u = 0,
        f = 0.55,
        h = 1,
        d = 1;
      for (let p = 0; p < 6; p++) {
        let x = 1 - Math.abs(s(l * h + p * 7.3, c * h + p * 3.1) * 2 - 1);
        ((x *= x), (u += x * f * d), (d = Math.min(1, x * 1.6)), (f *= 0.5), (h *= 2.07));
      }
      return u;
    };
  for (let l = 0; l <= 46; l++)
    for (let c = 0; c <= 260; c++) {
      let u = (c / 260) * Math.PI * 2,
        f = l / 46,
        h = K(4300, 17e3, Math.pow(f, 1.3)),
        d = 1500 + Math.cos(u) * h,
        p = Math.sin(u) * h,
        x =
          Ct((h - 4700) / 3200) *
          (1 - 0.35 * f) *
          K(0.42, 1, Ct(0.5 - 0.5 * Math.cos(u - 0.55) + 0.35 * s(u * 2 + 3, 1))),
        v = -60 + a(d / 3e3 + 11, p / 3e3 + 4) * 2500 * x * x + x * 120;
      e.push(d, v, p);
    }
  for (let l = 0; l < 46; l++)
    for (let c = 0; c < 260; c++) {
      let u = l * 261 + c,
        f = u + 260 + 1;
      n.push(u, u + 1, f, f, u + 1, f + 1);
    }
  let r = new Qt();
  return (r.setAttribute("position", new ae(e, 3)), r.setIndex(n), r.computeVertexNormals(), r);
}

// ── scene dominoes · "Thirty steps" · enterWith: flaps ──
var Ia = [
    [0, 0.1, 0.62, 4.2, 1.72, 0.86, 0, 36, 0.03],
    [3, 0.1, 0.72, 4, 1.8, 0.86, 0, 36, 0.024],
    [7, -0.25, 1.25, 3.7, 1.8, 0.74, 0, 38, 0.017],
    [10.5, -0.75, 1.75, 3.7, 1.75, 0.66, 0, 40, 0.011],
    [13.5, 0.15, 0.95, 4.2, 1.85, 0.86, 0, 39, 0.008],
    [16.5, -0.55, 0.5, 3.9, 1.85, 0.95, 0, 41, 0.006],
    [19, -0.95, 0.8, 3.7, 1.85, 0.95, 0, 41, 0.004],
    [22, -0.95, 1.62, 3.8, 1.85, 0.78, 0, 42, 0.003],
    [25, 0.25, 0.95, 4.3, 1.85, 0.86, 0, 39, 0.002],
    [27, 1.15, 0.5, 4.2, 2, 0.86, 0, 39, 0.0015],
    [28.2, 2.1, 0.22, 3.1, 1.7, 0.66, 0, 39, 0.001],
    [29, 2.62, 0.075, 1.62, 0.86, 0.47, 0, 41, 8e-4],
  ],
  sR = (i, t) => {
    let e = 0;
    for (; e < Ia.length - 2 && Ia[e + 1][0] < i;) e++;
    let n = Ia[Math.max(0, e - 1)],
      o = Ia[e],
      s = Ia[e + 1],
      a = Ia[Math.min(Ia.length - 1, e + 2)],
      r = Ct((i - o[0]) / (s[0] - o[0])),
      l = s[0] - o[0],
      c = r * r,
      u = c * r;
    for (let f = 1; f < 9; f++) {
      let h = e === 0 ? 0 : ((s[f] - n[f]) / (s[0] - n[0])) * l,
        d = e === Ia.length - 2 ? (s[f] - o[f]) * 0.9 : ((a[f] - o[f]) / (a[0] - o[0])) * l;
      t[f - 1] = (2 * u - 3 * c + 1) * o[f] + (u - 2 * c + r) * h + (-2 * u + 3 * c) * s[f] + (u - c) * d;
    }
    return t;
  },
  aR = [0, 2, 4, 7, 9],
  rR = (i) => -(Math.floor(i / 5) * 12 + ((12 - aR[4 - (i % 5)]) % 12)),
  Na = La(29),
  dh = Math.PI / 180,
  X5 = {
    id: "dominoes",
    title: "三十步",
    enterWith: "flaps",
    hud: { color: (i) => (i.p[1] > 0.52 ? "#2b241c" : "#ffffff"), font: "monoMed", alpha: 0.85 },
    beats: [
      { dur: 4, hold: 3, delay: 1.4, page: "433,494,437" },
      { dur: 14, hold: 4, page: "1,134,903,170" },
      { dur: 5, hold: 1.2, page: "7,778,742,049" },
    ],
    notes: [
      "为什么研究这件事的人预期它来得突然。假设每个 AI 都能造出下一代，而下一代只强 1.5 倍。听起来不多。",
      "真实的多米诺骨牌，能推倒比它大 1.5 倍的那一张。第一张一厘米高。十步之后是三十八厘米。二十步，二十二米。第三十步是 1.28 公里，比地球上任何建筑都高。",
      "每一步之间什么都没变。同样的推力，同样的比例，重复三十次。",
    ],
    create(i) {
      let { gfx: t, view: e } = i,
        n = t.r,
        o = t.target({ samples: 4, depthTexture: !0 }),
        s = t.target({ scale: 0.5, type: $e }),
        a = t.target({ scale: 0.5, type: $e }),
        r = t.target({ scale: 0.5 }),
        l = t.target({}),
        c = t.target({ scale: 0.5 }),
        u = t.target({}),
        f = 2048,
        h = new Jn(f, f, { type: An, format: ts, minFilter: Je, magFilter: Je, generateMipmaps: !1 });
      ((h.depthTexture = new Bi(f, f, hi)),
        (h.depthTexture.compareFunction = Ea),
        (h.depthTexture.minFilter = h.depthTexture.magFilter = He));
      let d = new ge(),
        p = new Kn(),
        x = new Ye(36, 1, 0.035, 1500),
        v = new Ci();
      (d.add(p), x.layers.enableAll(), v.layers.set(1), x.position.set(0, 5, 20), x.updateMatrixWorld());
      let m = {
        uFa: 0,
        uFr: 0,
        uS: 1,
        uFog: 0.01,
        uGob: 0,
        uT: 0,
        uPx: 1,
        uOut: 0,
        uSkyT: 0,
        uL: new F(),
        uSun: new F(),
        uSky: new F(),
        uBounce: new F(),
        tSh: h.depthTexture,
        tShZ: h.texture,
        uShM: new ne(),
        uShP: new ie(),
      };
      for (let Q in m) m[Q] = { value: m[Q] };
      let g = (Q, Lt = {}, yt = {}, It = lo) =>
          new ni({
            vertexShader: E5,
            fragmentShader: Q,
            glslVersion: re,
            uniforms: { ...m, ...yt },
            defines: Lt,
            side: It,
          }),
        b = (Q) => (Q.layers.enable(1), Q),
        y = new ni({ vertexShader: z5, fragmentShader: L5, glslVersion: re, side: oe }),
        S = [],
        M,
        w,
        E,
        T,
        _,
        R,
        L,
        k,
        P,
        C,
        A,
        N = new Float64Array(As),
        G = new ne(),
        B = new qe(),
        ot = new qe(),
        ut = new F(0, 1, 0),
        lt = new F(0, 0, 1),
        Z = new F(),
        H = new F(),
        Y = new Float64Array(8),
        q = new F(),
        st = new F(),
        ct = new F(),
        V = new F(),
        ft = (() => {
          let Q = ze(21);
          return Array.from({ length: As }, (Lt, yt) =>
            yt === 0 || yt === 29 ? [0, 0] : [(Q() - 0.5) * 0.05, (Q() - 0.5) * 0.05],
          );
        })(),
        nt = i.overlay(),
        Mt = "#2a221a",
        Et = i.text(
          "假设每个 AI 造出\n强 1.5 倍的\n继任者。",
          { x: 118, y: 104, size: 76, font: "display", color: Mt, leading: 1.2 },
        ),
        at = [
          [1, "1 厘米", 0],
          [10, "38 厘米", 9],
          [20, "22 米", 19],
          [30, "1.3 公里", 29],
        ].map(([Q, Lt, yt]) => ({
          k: yt,
          a: i.text(String(Q), { x: 118, y: 96, size: 236, font: "display", color: Mt, leading: 1 }),
          b: i.text(Lt, { x: 128, y: 336, size: 72, font: "display", color: Mt, leading: 1 }),
        })),
        rt = i.text("三十步。", { x: 118, y: 130, size: 98, font: "display", color: Mt }),
        U = new i.SelectBox({ handle: 10, line: 2.8 });
      (nt.add(Et, rt, U), at.forEach((Q) => nt.add(Q.a, Q.b)));
      let j = {
          uL: m.uL,
          uOut: m.uOut,
          uSkyT: m.uSkyT,
          uR: { value: new F() },
          uU: { value: new F() },
          uF: { value: new F() },
          uCl: { value: 0 },
        },
        J = new Qt();
      J.setAttribute("position", new $t(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3));
      let Pt = new Zt(
        J,
        new ni({ vertexShader: P5, fragmentShader: C5, glslVersion: re, uniforms: j, depthWrite: !1 }),
      );
      ((Pt.frustumCulled = !1), (Pt.renderOrder = 1e3), d.add(Pt));
      let $ = { value: new Nt(x.near, x.far) },
        tt = t.pass(I5, { tD: o.depthTexture, uNF: $, uTan: new Nt(), uRad: 0.3, uFull: 120 }),
        W = t.pass(N5, { tA: s.texture, tD: o.depthTexture, uNF: $ }),
        D = t.pass(F5, {
          tA: o.texture,
          tD: o.depthTexture,
          tO: a.texture,
          tU: r.texture,
          uNF: $,
          uFoc: 4,
          uAp: 0.02,
          uMaxC: 0.02,
          uAoK: 1,
        }),
        z = t.pass(k5, { tA: l.texture, uMaxC: 0.02 }),
        pt = t.pass(D5, { tA: l.texture, tB: c.texture }),
        ht = t.pass(
          Fe +
            "void main(){ vec2 p=vUv*8.; vec2 w=vec2(8.); float s=0.,a=.5,f=1.; for(int i=0;i<5;i++){ vec2 q=p*f; vec2 m=w*f; vec2 ii=floor(q),ff=fract(q); ff=ff*ff*(3.-2.*ff); float v=mix(mix(hash12(mod(ii,m)+float(i)*19.),hash12(mod(ii+vec2(1,0),m)+float(i)*19.),ff.x),mix(hash12(mod(ii+vec2(0,1),m)+float(i)*19.),hash12(mod(ii+vec2(1,1),m)+float(i)*19.),ff.x),ff.y); s+=a*v; a*=.52; f*=2.; } o=vec4(s); }",
        ),
        gt = 0,
        dt = 0,
        Kt = 0,
        Ot = 0,
        Ut = 0,
        O = 0,
        I = 1,
        et = 0,
        Tt = 1,
        vt = 0,
        zt = { v: 0 },
        Ft = Array.from({ length: 8 }, () => new F());
      function wt() {
        let Q = document.createElement("canvas"),
          Lt = 384;
        ((Q.width = Lt * 6), (Q.height = Lt * 5));
        let yt = Q.getContext("2d");
        ((yt.fillStyle = "#000"),
          yt.fillRect(0, 0, Q.width, Q.height),
          (yt.fillStyle = "#fff"),
          (yt.textAlign = "center"),
          (yt.textBaseline = "alphabetic"),
          (yt.font = Ln("display", Lt * 0.52)));
        for (let _t = 0; _t < 30; _t++)
          yt.fillText(String(_t + 1), ((_t % 6) + 0.5) * Lt, (Math.floor(_t / 6) + 0.5) * Lt + Lt * 0.19);
        ((P = new Hn(Q)), (P.flipY = !1), (P.anisotropy = 8), (P.generateMipmaps = !0), (P.minFilter = Pn));
        let It = document.createElement("canvas");
        It.width = It.height = 1536;
        let St = It.getContext("2d");
        ((St.fillStyle = "#000"),
          St.fillRect(0, 0, 1536, 1536),
          (St.fillStyle = "#fff"),
          (St.textAlign = "center"),
          (St.font = Ln("display", 1536 * 0.52)),
          St.fillText("30", 768, 768 + 1536 * 0.19),
          (C = new Hn(It)),
          (C.anisotropy = 8),
          (C.generateMipmaps = !0),
          (C.minFilter = Pn));
      }
      function mt() {
        let Q = ze(31),
          Lt = new Oe();
        (Lt.setAttribute(
          "position",
          new $t(new Float32Array([-0.5, -0.5, 0, 0.5, -0.5, 0, 0.5, 0.5, 0, -0.5, 0.5, 0]), 3),
        ),
          Lt.setIndex([0, 1, 2, 0, 2, 3]));
        let yt = [],
          It = [],
          St = (jt, le) => {
            (yt.push(jt, le, 0, 0), It.push(Q(), Q(), Q(), Q()));
          };
        for (let jt = 0; jt < 46; jt++) St(3, 0);
        for (let jt = 1; jt < 30; jt++) for (let le = 0; le < 24; le++) St(0, jt);
        for (let jt = 0; jt < 150; jt++) St(1, 0);
        for (let jt = 0; jt < 150; jt++) St(4, 0);
        for (let jt = 0; jt < 120; jt++) St(5, 0);
        for (let jt = 0; jt < 90; jt++) St(2, 1);
        (Lt.setAttribute("iA", new Ue(new Float32Array(yt), 4)),
          Lt.setAttribute("iB2", new Ue(new Float32Array(It), 4)),
          (Lt.instanceCount = yt.length / 4));
        let _t = new Float32Array(32);
        for (let jt = 0; jt < 32; jt++) _t[jt] = jt < 30 ? La(jt) : 1e6;
        let Yt = new ni({
          vertexShader: U5,
          fragmentShader: H5,
          glslVersion: re,
          transparent: !0,
          depthTest: !1,
          depthWrite: !1,
          side: oe,
          blending: Ie,
          blendSrc: pe,
          blendDst: je,
          blendSrcAlpha: pe,
          blendDstAlpha: je,
          uniforms: {
            uL: m.uL,
            uOut: m.uOut,
            uSkyT: m.uSkyT,
            uTm: { value: 0 },
            uKc: { value: 0 },
            uAmb: { value: 0 },
            uFocD: { value: 4 },
            uApD: { value: 0 },
            uAsp: { value: new Nt(1, 1) },
            uTimes: { value: _t },
            uFall: { value: 0 },
            uCamR: { value: new F() },
            uCamU: { value: new F() },
            tD: { value: o.depthTexture },
            tN: { value: null },
            uR2: { value: new Nt() },
            uLv: { value: new F() },
            uSunP: { value: new F(0.98, 0.7, 0.42) },
            uAmbP: { value: new F(0.26, 0.235, 0.23) },
            uSoft: { value: 0.08 },
            uNF: $,
          },
        });
        ((R = new Zt(Lt, Yt)), (R.frustumCulled = !1), (L = new ge()), L.add(R));
      }
      function Dt() {
        let Q = new Oe();
        Q.setAttribute(
          "position",
          new $t(
            new Float32Array([
              0, 0, -0.22, 0, 0, 0.2, 1, 0, -0.02, 0, 0, -0.22, -1, 0, -0.02, 0, 0, 0.2, 0, 0, -0.42, 0.1, 0,
              0, -0.1, 0, 0,
            ]),
            3,
          ),
        );
        let Lt = 70;
        ((Q.instanceCount = Lt),
          (k = new Zt(
            Q,
            new ni({
              glslVersion: re,
              side: oe,
              uniforms: {
                uT: m.uT,
                uP: { value: new Float32Array(Lt * 4) },
                uD: { value: new Float32Array(Lt * 4) },
              },
              vertexShader: `uniform float uT; uniform vec4 uP[${Lt}],uD[${Lt}]; void main(){ vec4 p=uP[gl_InstanceID], d=uD[gl_InstanceID]; vec3 q=position; float f=sin(uT*(9.+3.*fract(d.w*7.))+d.w*40.)*(.35+.45*step(.35,sin(uT*.7+d.w*30.))); q.y=abs(q.x)*f; q.x*=cos(f*.8); float c=cos(d.x),s=sin(d.x); q=vec3(q.x*c+q.z*s,q.y,-q.x*s+q.z*c); gl_Position=p.w<=0.?vec4(2.,2.,2.,1.):projectionMatrix*viewMatrix*vec4(p.xyz+q*p.w,1.); }`,
              fragmentShader: "layout(location=0) out vec4 o; void main(){ o=vec4(.10,.085,.08,1.); }",
            }),
          )),
          (k.frustumCulled = !1),
          d.add(k),
          (k.userData = (() => {
            let yt = ze(77);
            return Array.from({ length: Lt }, () => [yt(), yt(), yt(), yt()]);
          })()));
      }
      function it(Q) {
        let Lt = gt,
          yt = I;
        sR(Lt, Y);
        let [It, St, _t, Yt, jt, le, ye] = Y,
          Jt = Q.k(0, -0.5, 4, bt.out3),
          te = 1 - kt(dt / 2.2);
        ((It += te * ((1 - Jt) * -0.35 + 0.05 * Math.sin(Q.t * 0.13))),
          (_t += te * ((1 - Jt) * 0.55 + 0.06 * Math.sin(Q.t * 0.17))),
          (St += te * (0.22 * (1 - Jt) + 0.025 * Math.sin(Q.t * 0.21))));
        let se = kt((dt - Na) / 2);
        ((It += se * 0.05 * Math.sin(Q.t * 0.11)),
          (_t += se * 0.07 * Math.sin(Q.t * 0.083 + 1)),
          (St += se * 0.008 * Math.sin(Q.t * 0.19)));
        let ee = 0;
        if (O > 0) {
          let Re = Q.p[2] * 5,
            Ne = bt.io3(Re / 4.6),
            Ge = 1.375,
            yn = Math.sin(N[29]),
            si = Math.cos(N[29]);
          ((It = K(It, Ge + 0.72, Ne)), (St = K(St, 0.1, Ne)), (_t = K(_t, 0, bt.io3(Re / 4.3))));
          let gi = K(0.4, 0.51, kt((Re - 2.5) / 2.5)),
            no = bt.io3((Re - 1.1) / 3.3);
          ((Yt = K(Yt, Ge + gi * yn, no)),
            (jt = K(jt, gi * si, no)),
            (le = K(le, 0, no)),
            (ye = K(ye, 69, bt.io3((Re - 0.6) / 3.6))),
            (ee = 1));
        }
        ((x.aspect = t.aspect),
          (x.fov = t.aspect < 1.77 ? ye * K(1, 1.16, Ct((1.777 - t.aspect) / 0.44)) : ye),
          x.updateProjectionMatrix(),
          q.set(Yt, jt, le),
          Z.set(It, St, _t).sub(q));
        let me = Q.mouse.x * -0.05 * (1 - ee * 0.5),
          be = Q.mouse.y * -0.03 * (1 - ee * 0.5);
        if (
          (Z.applyAxisAngle(ut, me),
          (Z.y += be * Z.length()),
          Z.add(q),
          (Z.y = Math.max(Z.y, 0.05)),
          x.position.copy(Z),
          x.up.set(0, 1, 0),
          x.lookAt(q),
          O > 0)
        ) {
          let Re = Q.p[2] * 5;
          x.rotateY(0.2 * kt((Re - 0.4) / 1.5) * (1 - kt((Re - 2.7) / 1.4)));
        }
        let Ae = 0,
          ln = 0,
          mn = 0;
        for (let Re = 1; Re < As; Re++) {
          let Ne = dt - La(Re);
          if (Ne < 0 || Ne > 2.4) continue;
          let Ge = 35e-5 * Math.pow(1.155, Re) * Math.exp(-Ne * K(13, 2.6, Re / 29));
          ((Ae += Ge * Si(Ne * 23 + Re * 9)),
            (ln += Ge * Si(Ne * 27 + Re * 5 + 40)),
            (mn += Ge * Si(Ne * 17 + Re * 3 + 80)));
        }
        let un = se * 7e-4 + (O > 0 ? 0.006 * bt.in3(Ct(O * 1.1)) * (1 - 0.8 * kt((Q.p[2] - 0.9) / 0.1)) : 0);
        ((Ae += un * Si(Q.t * 11)),
          (ln += un * Si(Q.t * 13 + 30)),
          (mn += un * 0.7 * Si(Q.t * 9 + 60)),
          x.rotateX(ln),
          x.rotateY(Ae),
          x.rotateZ(mn),
          x.updateMatrixWorld());
      }
      function Rt(Q) {
        (Q.p[1] >= 1 ? (Kt += Q.dt) : (Kt = 0), (dt = Q.at(1) + Kt), (Ut = Math.min(29, A0(dt))));
        {
          let te = 29 - (A0(Math.max(dt, 0)) + 0.25 * kt(dt / 2)),
            se = 1.5,
            ee = (te + Math.sqrt(te * te + se * se)) / 2;
          ((gt = 29 - (te > 8 ? te : K(ee, te, kt((te - 5) / 3)))),
            dt > Na && (gt = K(gt, 29, kt((dt - Na) / 2.6))),
            (gt = Ct(gt, 0, 29)));
        }
        let Lt = Math.max(0, dt - Na),
          yt = dt > Na ? kt(Lt / 0.5) : 0;
        ((zt.v =
          yt *
          (1 +
            0.95 * Math.exp(-Lt * 0.5) * Math.sin(Lt * 3.1) +
            0.34 * Math.sin(Q.t * 0.9) +
            0.22 * Math.sin(Q.t * 1.63 + 1) +
            0.08 * Math.sin(Q.t * 4.1)) *
          dh),
          zt.v < 0 && (zt.v = 0));
        let It = Q.p[2],
          St = 0;
        (It > 0 &&
          (St =
            It < 0.86
              ? 0.88 * Math.pow(It / 0.86, 3.3)
              : 0.88 + 0.12 * (1 - Math.pow(1 - (It - 0.86) / 0.14, 3))),
          (O = St));
        let _t = It >= 1 ? 1 - Math.exp(-Math.max(0, Q.since(2) - 5) / 26) : 0,
          Yt = K(zt.v, 63.5 * dh, St) + _t * 2.2 * dh + (It >= 1 ? Q.exit * 5 * dh : 0);
        (M5(Ut, Yt, N),
          (I = b5(gt)),
          p.scale.setScalar(1 / I),
          (m.uS.value = I),
          (m.uT.value = Q.t),
          (m.uSkyT.value = Q.t + dt * 0.6));
        for (let te = 0; te < As; te++) {
          let se = Math.exp(lh * (te - gt));
          (se > 260 || se < 0.0015
            ? G.makeScale(0, 0, 0)
            : (B.setFromAxisAngle(ut, ft[te][0]),
              ot.setFromAxisAngle(lt, -N[te]),
              G.compose(Z.set(uh * se, 0, ft[te][1] * se * 0.6), B.multiply(ot), H.setScalar(se))),
            _.setMatrixAt(te, G));
        }
        ((_.instanceMatrix.needsUpdate = !0),
          S.forEach((te) => (te.m.visible = I > te.min * 0 + (te.min > 1 ? te.min * 0.04 : 0) && I < te.max)),
          (M.visible = I > 0.35),
          (w[0].visible = I > 0.12 && I < 120),
          (w[1].visible = I > 1),
          (E.visible = I > 1.2));
        let jt = kt((gt - 25) / 4),
          le = K(-0.855, 0.98, kt((gt - 15.5) / 12));
        ((m.uFa.value = kt(O * 1.1)),
          (m.uFr.value = Math.floor(Q.t * 60) % 64),
          m.uL.value.set(-Math.cos(le) * 0.914, K(0.44, 0.4, jt), Math.sin(le) * 0.914).normalize());
        let ye = kt((gt - 9) / 6);
        ((m.uOut.value = ye),
          (m.uGob.value = 0.72 * (1 - kt((gt - 2) / 4))),
          (m.uFog.value = K(
            K(0.01, 0.016, kt(gt / 12)),
            K(0.016, 0.036, kt((gt - 14) / 15)),
            kt((gt - 12) / 4),
          )),
          m.uSun.value.set(5.6, 4, 2.35),
          m.uSky.value.set(K(0.5, 0.34, ye), K(0.5, 0.48, ye), K(0.56, 0.8, ye)),
          m.uBounce.value
            .set(K(0.4, 0.46, jt), K(0.31, 0.42, jt), K(0.24, 0.38, jt))
            .lerp(st.set(1.28, 1.28, 1.3), O),
          it(Q));
        {
          let te = K(4.6, 5.4, jt),
            se = Ct(5 / I, 16, 470),
            ee = se + 12;
          (st.set(1.9 + 0.6 * jt, 0.4, K(0.4, 0.5, jt)),
            (v.left = v.bottom = -te),
            (v.right = v.top = te),
            (v.near = 0.1),
            (v.far = ee),
            v.position.copy(st).addScaledVector(m.uL.value, se),
            v.up.set(0, 1, 0),
            v.lookAt(st),
            v.updateMatrixWorld(),
            v.updateProjectionMatrix(),
            m.uShM.value
              .set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1)
              .multiply(v.projectionMatrix)
              .multiply(G.copy(v.matrixWorld).invert()),
            m.uShP.value.set(0.006, (ee * 0.035) / (2 * te), 1.3 / f, 0.12 / (2 * te)));
        }
        let Jt = R.material.uniforms;
        ((Jt.uTm.value = dt > 0 ? dt : -1e3 + Q.t),
          (Jt.uKc.value = gt),
          (Jt.uAmb.value = kt((dt - Na + 0.2) / 1.6)),
          (Jt.uFall.value = O),
          (Jt.uApD.value = Y[7]),
          (Jt.uSoft.value = 0.1));
        {
          let te = kt((dt - Na + 1.2) / 1.5),
            se = k.material.uniforms.uP.value,
            ee = k.material.uniforms.uD.value,
            me = k.userData,
            be = Q.t * 0.5 + O * 3;
          if (((k.visible = te > 0), te > 0))
            for (let Ae = 0; Ae < me.length; Ae++) {
              let [ln, mn, un, Re] = me[Ae],
                Ne = Ae % 3,
                Ge = 0.25 + 0.2 * Re,
                yn = ln * 6.283 + be * Ge * (Ne === 1 ? -1 : 1) * 1.6,
                si = (0.16 + 0.3 * mn) * (1 + O * 2.6 + (1 - te) * 1.2),
                gi = 2.35 + Ne * 0.35,
                no = 0.3 + 0.12 * Ne,
                as = 0.25 + 0.3 * Ne;
              ((se[Ae * 4] = gi + Math.cos(yn) * si + 0.05 * Math.sin(be * 1.3 + ln * 9)),
                (se[Ae * 4 + 1] = no + (un - 0.5) * 0.26 + 0.03 * Math.sin(be * 2 + mn * 20) + O * 0.3 * un),
                (se[Ae * 4 + 2] = as + Math.sin(yn) * si * 0.8),
                (se[Ae * 4 + 3] = 0.0042 * (0.8 + 0.5 * Re) * te),
                (ee[Ae * 4] = -yn + (Ne === 1 ? Math.PI : 0)),
                (ee[Ae * 4 + 3] = ln));
            }
        }
        (Wt(Q), Vt(Q));
      }
      let xt = (Q, Lt, yt) => (
        V.set(Q, Lt, yt).project(x),
        [e.x0 + (V.x * 0.5 + 0.5) * e.w, e.y0 + (0.5 - V.y * 0.5) * e.h]
      );
      function Wt(Q) {
        Et.show(Q.k(0, 0, 1.9, bt.lin), {
          style: "rise",
          by: "word",
          q: Q.k(1, 0, 0.55, bt.lin),
          stagger: 0.6,
        });
        let Lt = Q.k(0, 1.7, 2.3, bt.lin),
          yt = Q.k(1, 1.75, 2.15, bt.lin);
        if (Lt > 0 && yt < 1) {
          let _t = Math.exp(-lh * gt),
            Yt = N[0],
            jt = 0;
          for (let gi of [-ch, 0])
            for (let no of [0, 1])
              for (let as of [-T0 / 2, T0 / 2]) Ft[jt++].set((uh + gi) * _t, no * _t, as * _t);
          let le = i.rectOf(Ft, x, e),
            ye = Q.k(1, 0.12, 0.42, bt.io3) - Q.k(1, 0.42, 0.6, bt.in2) * 1.6,
            [Jt, te] = xt(uh * _t, 0, 0),
            se = uh * _t + Math.sin(Yt) * _t,
            [ee, me] = xt(se, Math.cos(Yt) * _t, 0),
            be = Math.atan2(ee - Jt, te - me),
            Ae = 16 + 3 * Math.sin(Q.t * 2.1),
            ln = le.w + Ae * 2,
            mn = le.h + Ae * 2,
            un = le.x + le.w / 2 - 14 * ye,
            Re = le.y + le.h / 2,
            Ne = Math.cos(be),
            Ge = Math.sin(be),
            yn = un - Jt,
            si = Re - te;
          (U.set(Jt + yn * Ne - si * Ge - ln / 2, te + yn * Ge + si * Ne - mn / 2, ln, mn, be),
            U.appear(Lt),
            yt > 0 && U.alpha(1 - yt));
        } else U.alpha(0);
        let It = [0.55, La(9) - 0.55, La(19) - 0.5, Na + 0.1],
          St = [2.3, La(9) + 1.35, La(19) + 1.2, 1e9];
        (at.forEach((_t, Yt) => {
          let jt = Ct((dt - It[Yt]) / 0.9);
          if (jt <= 0 || (Yt === 3 && Q.p[2] > 0.13)) {
            _t.a.mesh.visible = _t.b.mesh.visible = !1;
            return;
          }
          let le = 1,
            ye = 1,
            Jt = 0,
            te = 0;
          if (dt > St[Yt]) {
            let ee = Xt(St[Yt]);
            le = Math.exp(-lh * (gt - ee) * 1.15);
            let me = Math.exp(lh * (_t.k - gt)),
              [be, Ae] = xt(1.31 * me, 0.5 * me, 0);
            ((Jt = K(be - 40, 0, le)), (te = K(Ae - 40, 0, le)), (ye = Ct((le - 0.1) / 0.14)));
          }
          let se = Yt === 3 ? Q.k(2, 0, 0.55, bt.lin) : 0;
          for (let [ee, me, be, Ae] of [
            [_t.a, 118, 96, 0],
            [_t.b, 128, 352, 0.22],
          ]) {
            if (
              ((ee.x = me * le + Jt), (ee.y = be * le + te), (ee.scale = le), (ee.alpha = ye), ye <= 0.01)
            ) {
              ee.mesh.visible = !1;
              continue;
            }
            ee.show(Ct((jt - Ae) / (1 - Ae)), { style: "rise", q: se, stagger: 0.3 });
          }
        }),
          rt.show(Q.k(2, 0.62, 1.45, bt.lin), {
            style: "rise",
            q: Q.k(2, 2.75, 3.2, bt.lin),
            stagger: 0.45,
          }));
      }
      let Xt = (Q) => 29 - (29 - (A0(Q) + 0.25 * kt(Q / 2)));
      function Vt(Q) {
        let Lt = i.audio;
        if (
          (Lt.param && Lt.param("tension", Ct(Ut / 29) * 0.7 + O * 0.3),
          Lt.param && Lt.param("speed", Q.beat === 1 && Q.p[1] < 1 ? Ct(Ut / 24) * 0.8 : O * 0.6),
          Lt.param && Lt.param("wind", 0.12 + 0.5 * kt((gt - 14) / 14)),
          Q.dt > 0 && Q.beat >= 1 && Ut > Ot && Ut - Ot < 3)
        ) {
          let yt = Math.floor(Ot),
            It = Math.floor(Ut);
          for (let St = yt + 1; St <= It; St++)
            (i.sfx("domino", {
              pitch: 2.1 * Math.pow(2, (rR(St) / 12) * 0.42),
              gain: 0.35 + (0.55 * St) / 29,
              pan: -0.1,
            }),
              St === 1 && i.sfx("tick", { gain: 0.5 }),
              St >= 15 &&
                St < 25 &&
                i.sfx("thud", { gain: 0.15 + 0.05 * (St - 15), pitch: 1.2 - 0.04 * (St - 15) }),
              St >= 25 && i.sfx("boom", { gain: 0.35 + 0.13 * (St - 25), pitch: 1.2 - 0.08 * (St - 25) }),
              St === 29 && i.sfx("creak", { gain: 0.7, pitch: 0.6 }));
        }
        ((Ot = Ut),
          Q.dt > 0 &&
            Q.beat >= 2 &&
            O > vt &&
            (vt < 0.004 && O >= 0.004 && i.sfx("creak", { gain: 0.8, pitch: 0.45 }),
            vt < 0.02 && O >= 0.02 && i.sfx("riser", { gain: 0.8 }),
            vt < 0.25 && O >= 0.25 && i.sfx("sub", { gain: 0.9 })),
          (vt = O));
      }
      return {
        async init() {
          wt();
          let Q = new _0(ch, 1, T0, 3, 0.01);
          Q.translate(-ch / 2, 0.5, 0);
          let Lt = new Float32Array(As).map((It, St) => St);
          (Q.setAttribute("iNum", new Ue(Lt, 1)),
            (_ = b(new Hi(Q, g(T5, { DOM: 1 }, { tNum: { value: P }, tBig: { value: C } }), As))),
            (_.frustumCulled = !1),
            d.add(_));
          let yt = g(Uv, { VCOL: 1 }, {}, oe);
          ((S = V5().map((It) => {
            let St = b(new Zt(It.g, yt));
            return ((St.frustumCulled = !1), p.add(St), { ...It, m: St });
          })),
            (M = b(G5())),
            (M.material = g(_5, { CITY: 1 })),
            p.add(M));
          {
            let It = g(Uv, {}, {}, lo);
            w = q5().map((St) => (b(St), (St.material = It), p.add(St), St));
          }
          ((E = new Zt(W5(), g(R5))),
            (E.frustumCulled = !1),
            p.add(E),
            (T = new Zt(new lr(1400, 96).rotateX(-Math.PI / 2), g(A5))),
            (T.frustumCulled = !1),
            (T.renderOrder = 900),
            d.add(T),
            mt(),
            Dt(),
            (A = t.target({ w: 256, h: 256, type: $e, wrap: an })),
            ht.render(A),
            (R.material.uniforms.tN.value = A.texture),
            n.setRenderTarget(h),
            (d.overrideMaterial = y),
            n.render(d, v),
            (d.overrideMaterial = null),
            t.draw(d, x, o),
            t.draw(L, x, r, { color: 0, alpha: 0 }));
          for (let It of [tt, W, D, z, pt])
            It.render(It === pt ? u : It === z ? c : It === D ? l : It === W ? a : s);
        },
        enter(Q) {
          ((Kt = Q.p[1] >= 1 ? 6 : 0), (Ot = 0), (vt = 0));
        },
        update: Rt,
        render(Q, Lt) {
          let yt = [T.visible, E.visible, k.visible];
          ((T.visible = E.visible = k.visible = Pt.visible = !1),
            (d.overrideMaterial = y),
            n.setRenderTarget(h),
            n.setClearColor(16777215, 1),
            n.clear(!0, !0, !1),
            n.render(d, v),
            (d.overrideMaterial = null),
            ([T.visible, E.visible, k.visible] = yt),
            (Pt.visible = !0));
          let It = Math.tan((x.fov * dh) / 2),
            St = It * x.aspect,
            _t = x.matrixWorld.elements;
          (j.uR.value.set(_t[0], _t[1], _t[2]).multiplyScalar(St),
            j.uU.value.set(_t[4], _t[5], _t[6]).multiplyScalar(It),
            j.uF.value.set(-_t[8], -_t[9], -_t[10]),
            (j.uCl.value = m.uOut.value * kt((gt - 11) / 8)),
            t.draw(d, x, o),
            tt.u.uTan.value.set(St, It),
            (tt.u.uRad.value = K(0.34, 0.22, kt((gt - 18) / 8))),
            tt.render(s),
            W.render(a));
          let Yt = R.material.uniforms;
          (Yt.uR2.value.set(r.width, r.height),
            Yt.uLv.value.copy(m.uL.value).transformDirection(x.matrixWorldInverse));
          let jt = st.set(1.31, 0.5, 0).distanceTo(x.position);
          ((Yt.uFocD.value = jt), Yt.uAsp.value.set(0, 0.25 / It), t.draw(L, x, r, { color: 0, alpha: 0 }));
          let le = Y[7],
            ye = D.u;
          ((ye.uFoc.value = jt),
            (ye.uAp.value = le),
            (ye.uMaxC.value = Math.max(5e-4, Math.min(0.03, le * 1.15))),
            D.render(l));
          let Jt = l;
          (le > 0.0016 &&
            ((z.u.uMaxC.value = ye.uMaxC.value),
            (z.u.uTime.value = m.uFr.value),
            z.render(c),
            pt.render(u),
            (Jt = u)),
            t.post(Jt, Q, {
              exposure: K(0.62, 0.95, kt((O - 0.25) / 0.6)),
              bloom: 0.22,
              threshold: 3,
              radius: 0.9,
              tone: "agx",
              contrast: 1.3,
              saturation: 1.18,
              vignette: 0.16,
              grain: 0.022,
              gain: [1.03, 1, 0.965],
              time: Lt.t,
            }),
            nt.render(Q));
        },
      };
    },
  };

var lR = 2.4800000000000004,
  mh = { x0: -1.53, x1: 27.86, y0: -1.06, y1: 14.87 },
  Fa = 0.6533 / (14 * 0.53),
  Js = [
    [-40, -0.45, 0.02],
    [0, Math.log(1.7), 0.0265],
    [45, Math.log(6), 0.0305],
    [101, Math.log(40), 0.037],
    [181, Math.log(1e3), 0.0415],
    [460, Math.log(1e3) + 279 * 0.0425, 0.0425],
  ];

function Y5(i) {
  if (i <= Js[0][0]) return Js[0][1] + (i - Js[0][0]) * Js[0][2];
  for (let e = 0; e < Js.length - 1; e++) {
    let n = Js[e],
      o = Js[e + 1];
    if (i <= o[0]) {
      let s = o[0] - n[0],
        a = (i - n[0]) / s,
        r = a * a,
        l = r * a;
      return (
        n[1] * (2 * l - 3 * r + 1) + n[2] * s * (l - 2 * r + a) + o[1] * (-2 * l + 3 * r) + o[2] * s * (l - r)
      );
    }
  }
  let t = Js[Js.length - 1];
  return t[1] + (i - t[0]) * t[2];
}

var os = 512,
  wc = -40,
  cR = (7 * 0.0352) / 0.6533,
  ph = new Float64Array(os);

for (let i = 0; i < os; i++) ph[i] = Y5(wc + i);

var Lr = new Float64Array(os),
  to = { x: 13, y: 3 },
  K5 = { x: 7, y: 7 };

var R0 = class {
  constructor() {
    ((this.lut = new Float32Array(os * 2)),
      (this.A = { x: 9.5, y: 3.5 }),
      (this.lam = -1),
      (this.om = 1),
      (this.Ra = 1),
      (this.SA = 1),
      (this.M = [1, 0, 0, 1]),
      (this.tr = [0, 0]),
      (this.fish = 0),
      (this.H = [8, 4, 2, 1.5]),
      (this.fin = null),
      this._final());
  }
  _build(t) {
    let e = Math.max(t, 0.0025),
      n = e * cR,
      o = 0.6533 / 14;
    this.om = n;
    let s = ph[14],
      a = 0;
    Lr[0] = 0;
    for (let h = 1; h < os; h++) {
      let d = e * (ph[h - 1] - s),
        p = e * (ph[h] - s),
        x = p - d;
      ((a += o * (Math.abs(x) < 1e-6 ? Math.exp(d) : (Math.exp(p) - Math.exp(d)) / x)), (Lr[h] = a));
    }
    let r = 14 * this.A.x + this.A.y - 4 - wc,
      l = Math.floor(r),
      c = r - l,
      u = Lr[l] + (Lr[l + 1] - Lr[l]) * c,
      f = Math.sqrt(1 + 2 * n * u);
    this.Ra = f / n;
    for (let h = 0; h < os; h++) {
      let d = Math.sqrt(1 + 2 * n * Lr[h]);
      ((this.lut[h * 2] = (2 * (Lr[h] - u)) / (d + f)),
        (this.lut[h * 2 + 1] = (Math.exp(e * (ph[h] - s)) / d) * o));
    }
    this.sA = Math.exp(e * (Y5(r + wc) - s)) / f;
  }
  _r(t) {
    let e = Math.min(os - 1.001, Math.max(0, t - wc)),
      n = Math.floor(e),
      o = e - n,
      s = this.lut,
      a = s[n * 2],
      r = s[n * 2 + 2],
      l = s[n * 2 + 1],
      c = s[n * 2 + 3],
      u = o * o,
      f = u * o;
    return a * (2 * f - 3 * u + 1) + l * (f - 2 * u + o) + r * (-2 * f + 3 * u) + c * (f - u);
  }
  q(t, e) {
    let n = this._r(14 * t + e - 4),
      o = this.om * ((e - this.A.y) * 0.53 - Fa * (t - this.A.x) * 0.6533),
      s = n + this.Ra,
      a = Math.sin(o / 2);
    return [n - 2 * s * a * a, s * Math.sin(o)];
  }
  _final() {
    this._build(1);
    let t = [-8.5, 0.75],
      e = this.q(to.x + 0.5, to.y + 0.5),
      n = e[0] + this.Ra,
      o = e[1],
      s = Math.atan2(o, n),
      r = 14.2 / Math.hypot(n, o),
      c = -0.06 - s - Math.atan(Fa);
    ((this.fin = { Z: r, rot: c, v: t, SA: r * this.sA }), this._m(r, c));
    let u = this.M;
    this.fin.tr = [t[0] - u[0] * -this.Ra, t[1] - u[2] * -this.Ra];
  }
  _m(t, e) {
    let n = Math.cos(e) * t,
      o = Math.sin(e) * t,
      s = 1 / (1 + Fa * Fa),
      a = [s, -Fa * s, Fa * s, s];
    ((this.M[0] = n * a[0] - o * a[2]),
      (this.M[1] = n * a[1] - o * a[3]),
      (this.M[2] = o * a[0] + n * a[2]),
      (this.M[3] = o * a[1] + n * a[3]));
  }
  set(t, { tilt: e = 0, dx: n = 0, dy: o = 0, zoom: s = 1 } = {}) {
    ((this.lam = t), this._build(t));
    let a = this.fin,
      r = Math.exp(Math.log(a.SA) * t) * s,
      l = r / this.sA;
    ((this.Z = l), this._m(l, a.rot * t + e));
    let c = -8.6 + this.A.x * 0.6533,
      u = -lR + this.A.y * 0.53,
      f = t;
    ((this.tr[0] = c + (a.tr[0] - c) * f + n), (this.tr[1] = u + (a.tr[1] - u) * f + o));
  }
  at(t, e, n = [0, 0]) {
    let o = this.q(t, e),
      s = this.M,
      a = s[0] * o[0] + s[1] * o[1] + this.tr[0],
      r = -(s[2] * o[0] + s[3] * o[1] + this.tr[1]);
    if (this.fish > 0) {
      let l = t - to.x - 0.5,
        c = e - to.y - 0.5,
        u = this.H,
        f = (h, d, p) => {
          let x = Math.sign(h),
            v = Math.abs(h);
          return v <= 0.5 ? h * 2 * d : x * (d + p * (1 - 1 / (1 + (v - 0.5) * 0.5)));
        };
      ((a += (f(l, u[0], u[2]) - a) * this.fish), (r += (-f(c, u[1], u[3]) - r) * this.fish));
    }
    return ((n[0] = a), (n[1] = r), n);
  }
};

function j5() {
  let i = new Uint8Array(1512),
    t = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    e = 4;
  for (let n = 0; n < 12; n++)
    for (let o = 1; o <= t[n]; o++, e++) {
      let s = Math.floor(e / 14),
        a = e % 14,
        r = (a * 27 + s) * 4;
      ((i[r] = o), (i[r + 1] = n), (i[r + 2] = a % 7), (i[r + 3] = 255));
    }
  return i;
}

var $5 = [0, 2, 4, 6, 8, 11, 13, 15, 17, 19, 22, 24];

var uR = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  Mc = 2048,
  Sc = 1344;

function Z5(i) {
  let t = document.createElement("canvas");
  ((t.width = Mc), (t.height = Sc));
  let e = t.getContext("2d");
  ((e.fillStyle = "#000"), e.fillRect(0, 0, Mc, Sc), (e.fillStyle = "#fff"), (e.textBaseline = "alphabetic"));
  let n = { family: "Geist", weight: 500 },
    o = { family: "Geist", weight: 500 };
  e.font = Ln(n, 160);
  for (let v = 0; v < 32; v++) e.fillText(String(v), (v % 8) * 256 + 24, Math.floor(v / 8) * 160 + 128);
  e.font = Ln(o, 108);
  let s = [];
  (uR.forEach((v, m) => {
    let g = (m % 3) * 682,
      b = 640 + Math.floor(m / 3) * 128;
    (e.fillText(v, g + 20, b + 96), s.push(e.measureText(v).width + 40));
  }),
    (e.font = Ln({ family: "Geist", weight: 500 }, 160)),
    (e.textAlign = "center"),
    ["M", "T", "W", "F", "S"].forEach((v, m) => e.fillText(v, m * 192 + 96, 1302)),
    (e.textAlign = "left"),
    (e.font = Ln("display", 150)),
    e.fillText("2027", 980, 1302));
  let a = e.measureText("2027").width + 40,
    r = new Hn(t);
  ((r.generateMipmaps = !1), (r.minFilter = r.magFilter = Je), (r.flipY = !1), (r.colorSpace = Mn));
  let l = i.target({ w: Mc, h: Sc, filter: Je }),
    c = i.target({ w: Mc, h: Sc, filter: Je }),
    u = i.target({ w: Mc, h: Sc, mips: !0 });
  u.texture.anisotropy = 4;
  let f = i.pass(
    "uniform sampler2D tA; void main(){ float v=texelFetch(tA,ivec2(gl_FragCoord.xy),0).r; o=v>.5?vec4(0,0,90,90):vec4(90,90,0,0); }",
    { tA: r },
  );
  f.render(l);
  let h = i.pass(
      `uniform sampler2D tA; uniform int uS; void main(){ ivec2 p=ivec2(gl_FragCoord.xy); vec4 b=vec4(90); float d0=1e5,d1=1e5; for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){ ivec2 q=p+ivec2(x,y)*uS; if(q.x<0||q.y<0||q.x>=${Mc}||q.y>=${Sc})continue; vec4 n=texelFetch(tA,q,0)+vec4(vec2(x,y)*float(uS),vec2(x,y)*float(uS)); float a=dot(n.xy,n.xy),c=dot(n.zw,n.zw); if(a<d0){d0=a;b.xy=n.xy;} if(c<d1){d1=c;b.zw=n.zw;} } o=b; }`,
      { tA: null, uS: 1 },
    ),
    d = l,
    p = c;
  for (let v of [16, 8, 4, 2, 1, 1])
    ((h.u.tA.value = d.texture), (h.u.uS.value = v), h.render(p), ([d, p] = [p, d]));
  let x = i.pass(
    "uniform sampler2D tA,tB; void main(){ ivec2 p=ivec2(gl_FragCoord.xy); vec4 n=texelFetch(tA,p,0); float v=texelFetch(tB,p,0).r; float di=length(n.zw),dO=length(n.xy); float sd=di>0.?di-.5:-(dO-.5); if(abs(sd)<.9) sd=(v-.5)*1.1; o=vec4(clamp(sd,-16.,16.)); }",
    { tA: d.texture, tB: r },
  );
  return (
    x.render(u),
    i.r.setRenderTarget(null),
    f.dispose(),
    h.dispose(),
    x.dispose(),
    i.free(l),
    i.free(c),
    r.dispose(),
    { tex: u.texture, mw: s, yw: a }
  );
}

function J5(i, t = 1024) {
  let e = document.createElement("canvas");
  e.width = e.height = t;
  let n = e.getContext("2d");
  ((n.fillStyle = "#808080"), n.fillRect(0, 0, t, t));
  let o = ze(27);
  n.lineCap = "round";
  for (let l = 0; l < 5200; l++) {
    let c = o() * t,
      u = o() * t,
      f = o() * 6.283,
      h = 8 + o() * o() * 60,
      d = (o() - 0.5) * 1.6,
      p = 0.5 + o() * 1.3,
      x = o() > 0.5 ? 255 : 0;
    ((n.strokeStyle = `rgba(${x},${x},${x},${0.05 + o() * 0.13})`), (n.lineWidth = p));
    let v = Math.cos(f) * h,
      m = Math.sin(f) * h,
      g = Math.cos(f + d) * h * 0.5,
      b = Math.sin(f + d) * h * 0.5;
    for (let y = -1; y <= 1; y++)
      for (let S = -1; S <= 1; S++) {
        let M = c + y * t,
          w = u + S * t;
        M < -80 ||
          w < -80 ||
          M > t + 80 ||
          w > t + 80 ||
          (n.beginPath(), n.moveTo(M, w), n.quadraticCurveTo(M + g, w + b, M + v, w + m), n.stroke());
      }
  }
  let s = new Hn(e);
  ((s.wrapS = s.wrapT = an), (s.colorSpace = Mn));
  let a = i.target({ w: t, h: t, mips: !0, wrap: an, type: $e });
  a.texture.anisotropy = 4;
  let r = i.pass(
    `uniform sampler2D tA; float hh(vec2 p){vec3 p3=fract(vec3(p.xyx)*.1031);p3+=dot(p3,p3.yzx+33.33);return fract((p3.x+p3.y)*p3.z);} float vn(vec2 p,float n){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hh(mod(i,n)),hh(mod(i+vec2(1,0),n)),f.x),mix(hh(mod(i+vec2(0,1),n)),hh(mod(i+vec2(1,1),n)),f.x),f.y);}
  float H(vec2 u){ return texture(tA,u).r*.75+.16*vn(u*256.,256.)+.09*vn(u*512.+7.,512.); } void main(){ vec2 e=vec2(1./${t}.,0.); float h=H(vUv); float dx=H(vUv+e)-H(vUv-e),dy=H(vUv+e.yx)-H(vUv-e.yx); float bl=.5*vn(vUv*8.,8.)+.3*vn(vUv*16.+3.,16.)+.2*vn(vUv*32.+9.,32.); o=vec4(h,.5+dx*1.6,.5+dy*1.6,bl); }`,
    { tA: s },
  );
  return (r.render(a), i.r.setRenderTarget(null), r.dispose(), s.dispose(), a.texture);
}

var zi = (i) => {
    let t = String(i);
    return /[.e]/.test(t) ? t : t + ".";
  },
  Q5 = `
precision highp float; precision highp int; precision highp sampler2D; precision highp sampler2DShadow;
uniform sampler2D uLut; uniform float uQ,uOm,uRa,uZ,uFish,uLam,uTime,uShud,uPuff,uBreath; uniform vec4 uM,uH; uniform vec2 uTr,uAn,uHead;
`,
  hR = `
vec2 rl(float T){ float x=clamp(T-(${zi(wc)}),0.,${zi(os)}-1.001); float i=floor(x),t=x-i; vec2 a=texelFetch(uLut,ivec2(int(i),0),0).rg,b=texelFetch(uLut,ivec2(int(i)+1,0),0).rg; float t2=t*t,t3=t2*t;
 return vec2(a.x*(2.*t3-3.*t2+1.)+a.y*(t3-2.*t2+t)+b.x*(-2.*t3+3.*t2)+b.y*(t3-t2), mix(a.y,b.y,t)); }
float fz(float a,float h,float m,out float e){ float v=abs(a); e=1.-1./(1.+max(v-.5,0.)*uQ); return v<=.5?a*2.*h:sign(a)*(h+m*e); }
vec3 base(vec2 p,out float S){
 float T=14.*p.x+p.y-${zi(4)}; vec2 r=rl(T); float ph=uOm*((p.y-uAn.y)*${zi(0.53)}-${zi(Fa)}*(p.x-uAn.x)*${zi(0.6533)}); float R=r.x+uRa,s=sin(ph*.5);
 vec2 q=vec2(r.x-2.*R*s*s,R*sin(ph)); vec2 w=vec2(dot(uM.xy,q),dot(uM.zw,q))+uTr; w.y=-w.y; S=r.y*${zi(14 / 0.6533)}*uZ; float rw=R*uZ, l2=uLam*uLam;
 float cr=uLam*(1.-smoothstep(.12,.75,S)); float z=l2*(.22*exp(-rw/1.1)+.95*smoothstep(2.2,13.,rw))+cr*(.10*sin(p.y*2.1+p.x*.7+uTime*.35)+.07*sin(p.x*3.3-p.y*.9-uTime*.5)+.05);
 float hang=clamp((p.y+1.06)/15.9,0.,1.), flat1=1.-uLam*.8, cx=smoothstep(.3,1.,abs(p.x-13.2)/14.7);
 z+=flat1*(.06+.8*cx*cx*hang*hang*(p.x>13.2?1.:.55)+.1*sin(p.x*.21+.4)*hang + .05*hang*sin(p.x*.55-uTime*1.15+p.y*.18)+.03*hang*sin(p.x*1.1+uTime*1.7+p.y*.4));
 z+=uLam*(1.-uFish)*.07*min(S,3.)*sin(T*.055-uTime*1.5)*smoothstep(.1,.6,S);
 z+=uShud*hang*(.36+.24*sin(p.x*.75-uTime*31.)+.18*sin(p.y*.8+uTime*24.));
 vec3 P=vec3(w,z); P.z=mix(P.z,min(P.z,uHead.y),smoothstep(uHead.x-1.5,uHead.x+.1,P.y));
 if(uFish>0.){ float ea,eb; vec3 fp; fp.x=fz(p.x-${zi(to.x)}-.5,uH.x,uH.z,ea); fp.y=-fz(p.y-${zi(to.y)}-.5,uH.y,uH.w,eb); fp.x-=sign(p.x-13.5)*uH.z*ea*.62*eb*eb; fp.y+=sign(p.y-3.5)*uH.w*eb*.62*ea*ea; fp.z=-1.15*max(ea,eb)-.5*min(ea,eb)+.10*sin(p.x*2.4+p.y*.6-uTime*1.1)*ea+.10*sin(p.y*2.6-p.x*.5+uTime*.9)*eb; P=mix(P,fp,uFish); }
 return P; }
float pil(vec2 f){ vec2 a=2.*f-1.; float w=(1.-a.x*a.x)*(1.-a.y*a.y); w=max(w,0.); return mix((pow(w+.03,.6)-.12198)/(1.0179-.12198),w,uFish*.8); }
`,
  Vv =
    Q5 +
    hR +
    `
in vec2 position; uniform mat4 projectionMatrix,modelViewMatrix; out vec2 vP; out vec3 vW,vN0,vT1,vT2; out float vA;
void main(){ vec2 p=position; float S,s1; float e=.02; vec3 P=base(p,S); vec3 a=(base(p+vec2(e,0.),s1)-P)/e, b=(base(p+vec2(0.,e),s1)-P)/e; vec3 n=normalize(cross(b,a)); if(n.z<0.) n=-n;
 float m=min(length(a),length(b)); float T=14.*p.x+p.y; float A=uPuff*mix(smoothstep(1.02,4.2,S),1.,uFish)*min(m,9.)*(1.+uBreath*sin(uTime*1.7-T*.07)); A=min(A,mix(1.3,2.9,uFish));
 vec2 f=fract(p); float hh=(p.x>=0.&&p.x<27.&&p.y>=0.&&p.y<14.)?pil(f)*A:0.; P+=n*hh*(1.-(1.-uFish)*smoothstep(uHead.x-1.2,uHead.x+.1,P.y)); vP=p; vW=P; vN0=n; vT1=a; vT2=b; vA=A; gl_Position=projectionMatrix*modelViewMatrix*vec4(P,1.); }`,
  Gv = "precision highp float; out vec4 o; void main(){ o=vec4(1.); }",
  qv = `
uniform sampler2DShadow uSh; uniform mat4 uLVP; uniform vec3 uL; uniform sampler2D uPaper; uniform float uPx,uGobo,uSlide;
float ign(vec2 p){ return fract(52.9829189*fract(dot(p,vec2(.06711056,.00583715)))); }
float shadow(vec3 w,float soft){ vec4 c=uLVP*vec4(w,1.); vec3 s=c.xyz*.5+.5; if(any(lessThan(s.xy,vec2(0.)))||any(greaterThan(s.xy,vec2(1.)))) return 1.; float a=ign(gl_FragCoord.xy)*6.283,r=0.; for(int i=0;i<6;i++){ float f=(float(i)+.5)/6.; float t=a+float(i)*2.39996; vec2 d=vec2(cos(t),sin(t))*sqrt(f)*soft; r+=texture(uSh,vec3(s.xy+d*vec2(1.,1.4),s.z-.0016)); } return r*.1666667; }
float gobo(vec3 w){ vec2 q=w.xy-uL.xy/uL.z*w.z; q=vec2(q.x*.96+q.y*.42,q.y*.9-q.x*.30); q+=vec2(.5*sin(uTime*.13),.35*sin(uTime*.17+1.))+uSlide*vec2(.26,.07)*uTime; float a=1.; float bx=abs(fract(q.x/8.4+.22)-.5)*8.4, by=abs(fract(q.y/6.2+.1)-.5)*6.2; a*=smoothstep(.13,.36,bx)*smoothstep(.13,.36,by); return mix(1.,a,uGobo); }
vec4 fibre(vec2 uv,float lod){ float o0=floor(lod),k=lod-o0; float s=.2; return mix(texture(uPaper,uv*s*exp2(o0)),texture(uPaper,uv*s*exp2(o0+1.)),k); }
vec3 paperLight(vec3 alb,vec3 N,vec3 w,float ao,float sh){ float ndl=max(dot(N,uL),0.)/mix(uL.z,.63,uSlide); float nd=mix(ndl,ndl*.55+.45*max(dot(N,uL)*.6+.4,0.)/(uL.z*.6+.4),.8); vec3 key=mix(vec3(1.0,.972,.925)*.80,vec3(1.06,.985,.87)*.80,uSlide),sky=mix(vec3(.90,.955,1.04)*.31,vec3(.99,.965,.935)*.36,uSlide); vec3 c=alb*(key*nd*sh*gobo(w)+sky*ao*(1.+.25*N.y)+vec3(.085,.07,.055)*ao); return c/(1.+max(c-.72,0.)*.45); }
`,
  tb =
    Q5 +
    qv +
    `
in vec2 vP; in vec3 vW,vN0,vT1,vT2; in float vA; out vec4 o;
uniform sampler2D uAtlas,uDays; uniform float uMw[12]; uniform float uYw,uDs,uNight,uRow,uInner,uYear,uEdge; uniform vec4 uClr; uniform float uClrA; uniform vec2 uRes;
float hash12(vec2 p){vec3 p3=fract(vec3(p.xyx)*.1031);p3+=dot(p3,p3.yzx+33.33);return fract((p3.x+p3.y)*p3.z);}
float vn(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash12(i),hash12(i+vec2(1,0)),f.x),mix(hash12(i+vec2(0,1)),hash12(i+vec2(1,1)),f.x),f.y);}
float pil(vec2 f){ vec2 a=2.*f-1.; float w=(1.-a.x*a.x)*(1.-a.y*a.y); w=max(w,0.); return mix((pow(w+.03,.6)-.12198)/(1.0179-.12198),w,uFish*.8); }
vec4 day(ivec2 c){ if(c.x<0||c.y<0||c.x>26||c.y>13) return vec4(0.,0.,0.,0.); return floor(texelFetch(uDays,c,0)*255.+.5); }
float ln(float d,float g,float w){ float wp=w/g,lw=max(wp,1.); return clamp(lw*.5+.5-d/g,0.,1.)*min(1.,max(wp,.16)/lw); }
vec2 gA,gB; // d(atlas-independent local)/dx,dy helpers
// label at atlas px origin a0 (size a1); q = position in cap-heights from the label's top left cap corner
float label(vec2 q,vec2 a0,vec2 a1,vec2 cap0,float capPx,float capScreen,vec2 dqx,vec2 dqy,float fat){ vec2 l=cap0+q*capPx; if(any(lessThan(l,vec2(1.)))||any(greaterThan(l,a1-1.))) return 0.; vec2 sz=vec2(2048.,1344.); float sd=textureGrad(uAtlas,(a0+l)/sz,dqx*capPx/sz,dqy*capPx/sz).r; return clamp((sd+fat)*capScreen/capPx+.5,0.,1.); }
float numl(int n,vec2 q,float cs,vec2 dqx,vec2 dqy,float fat){ return label(q,vec2(float(n%8)*256.,float(n/8)*160.),vec2(256.,160.),vec2(24.,15.),113.,cs,dqx,dqy,fat); }
void main(){
 vec2 p=vP; vec2 dx=dFdx(p),dy=dFdy(p); float pxu=uPx*gl_FragCoord.w; float l1=length(vT1),l2=length(vT2); vec2 cpx=vec2(l1,l2)*pxu; vec2 g=1./max(cpx,vec2(.5)); float asp=l1/l2;
 bool ing=p.x>=0.&&p.x<27.&&p.y>=0.&&p.y<14.; ivec2 id=ivec2(floor(p)); vec2 f=p-floor(p); vec4 D=day(id); bool isDay=D.a>1.; bool jul=id==ivec2(${to.x},${to.y});
 float lod=log2(max(l2/${zi(0.53)},.06)); vec4 fb=fibre(p*vec2(${zi(0.6533)},${zi(0.53)})*vec2(1.,1.)+3.7,lod);
 float fz=(fb.r-.5); float clr=1.; { vec2 d=max(uClr.xy-gl_FragCoord.xy,gl_FragCoord.xy-uClr.zw); clr-=uClrA*(1.-smoothstep(0.,uEdge,length(max(d,0.)))); }
 float K=0.,Rd=0.; float inner=jul?uInner:1.; float big=cpx.y, bd=big*uDs;
 if(ing){
  vec2 mm=min(vec2(1.23,1.),1.23*min(cpx.x,cpx.y)/cpx); float dk=0.,hv=0.,mw=mix(mix(.045,.032,smoothstep(80.,340.,bd)),.008,smoothstep(340.,900.,bd)); // rules
  { float k=floor(p.x+.5); ivec2 a=ivec2(int(k)-1,id.y); vec4 A=day(a),B=day(a+ivec2(1,0)); float d=abs(p.x-k); if(A.a+B.a>1.){ bool m=A.a<1.||B.a<1.||A.g!=B.g; float l=ln(d,g.x,m?mw*mm.x:.011); if(m) hv=max(hv,l); else dk=max(dk,l*.62); } }
  { float k=floor(p.y+.5); ivec2 a=ivec2(id.x,int(k)-1); vec4 A=day(a),B=day(a+ivec2(0,1)); float d=abs(p.y-k); if(A.a+B.a>1.){ bool m=A.a<1.||B.a<1.||A.g!=B.g; float l=ln(d,g.y,m?mw*mm.y:.0135); if(m) hv=max(hv,l); else dk=max(dk,l*.62); } }
  K=max(dk,hv);
  if(isDay){
   bool sun=D.b>5.5; int n=int(D.r); float t=smoothstep(40.,340.,bd); float t2=smoothstep(340.,820.,bd); float cap=mix(mix(mix(.56,.36,smoothstep(14.,44.,bd)),.25,t),.125,t2); float pad=mix(mix(.14,.10,t),.045,t2);
   vec2 q=(f*vec2(asp,1.)-vec2(pad))/cap; vec2 s=vec2(asp,1.)/cap; float a=numl(n,q,cap*big,dx*s,dy*s,mix(2.,-.3,smoothstep(8.,40.,big)))*inner; 
   if(sun) Rd=max(Rd,a); else K=max(K,a);
   if(n==1){ int m=int(D.g); float c2=mix(mix(min(.2,.80*asp*77./(uMw[m]-40.)),.085,t),.034,t2); vec2 ql=f*vec2(asp,1.); vec2 at=mix(vec2(pad,1.-pad-c2),vec2(pad+cap*.78,pad),t); vec2 s2=vec2(asp,1.)/c2; float w=label((ql-at)/c2,vec2(float(m%3)*682.,640.+float(m/3)*128.),vec2(uMw[m],128.),vec2(20.,19.),77.,c2*big,dx*s2,dy*s2,.5)*inner; if(sun) Rd=max(Rd,w); else K=max(K,w); }
   // hours, then minutes, printed finer inside
   float hp=bd/4., hpx=big/4.; float hk=smoothstep(34.,78.,hp)*inner;
   if(hk>.001){ vec2 hn=vec2(6.,4.); vec2 h=f*hn; vec2 hi=floor(h),hf=h-hi; vec2 gh=g*hn; float e=0.; vec2 ed=min(f,1.-f); float in1=smoothstep(0.,.5,min(ed.x*6.,ed.y*4.)); float qr=(jul&&hi.y>1.5&&hi.y<2.5)?1.-uRow:1.; float lh=max(ln(abs(h.x-floor(h.x+.5)),gh.x,.010)*qr,ln(abs(h.y-floor(h.y+.5)),gh.y,.012)); e=max(e,lh*.55);
    int hr=int(hi.y)*6+int(hi.x); float ha=asp*4./6.; float hc=mix(.16,.085,smoothstep(80.,230.,hp)); vec2 sh=hn*vec2(ha,1.)/hc; vec2 hq=(hf*vec2(ha,1.)-vec2(.08,.08))/hc; float skip=qr*((hi.y<.5&&hi.x<1.5)?0.:1.)*((n==1&&hi.y<1.5&&hi.x<2.5)?t2:1.); e=max(e,skip*.8*numl(hr,hq,hc*hpx,dx*sh,dy*sh,.4)*smoothstep(50.,90.,hp));
    float mp=hp/6.; float mk=smoothstep(7.,16.,mp); float yk=0.;
    float cyS=1.,cyI=0.; // whole years printed in an hour, then in every hour, reprinting themselves at other scales for ever
    if(jul&&uYear>0.){ bool first=hi==vec2(4.,1.); float dl=first?0.:.9+5.2*fract(hash12(hi+3.1)+hash12(hi.yx+8.)*.35); float th=(uYear-dl)/(6.5+2.5*hash12(hi+4.)); if(th>0.){ float i=floor(th),fr=th-i; float fx=(hf.x-.03)/.94; float front=smoothstep(0.,.42,fr)*1.02; bool nw=fx<front; float ci=nw?i:i-1.; yk=ci<0.?0.:1.; float hh=hash12(hi*3.7+ci*5.3); cyS=first&&ci<.5?1.:(hh<.24?.5:hh<.62?1.:hh<.92?2.:3.); cyI=ci; float ed2=(front-fx)*big*asp/6.; if(fr<.42&&ed2>0.) e=max(e,.6*smoothstep(3.,0.,ed2)*step(.17,hf.y)*step(hf.y,.95)*qr*step(.5,hi.x+hi.y)); } }
    if(mk>.001&&yk<.999){ vec2 m=hf*vec2(10.,6.); vec2 gm=gh*vec2(10.,6.); float lm=max(ln(abs(m.x-floor(m.x+.5)),gm.x,.02),ln(abs(m.y-floor(m.y+.5)),gm.y,.03)); vec2 fi=step(vec2(.6),m)*step(m,vec2(9.4,5.4)); float tick=lm; e=max(e,tick*.3*mk*(1.-yk)*qr); }
    yk*=qr; if(hi.y<.5&&hi.x<.5) yk=0.; if(yk>.001){ vec2 u=(hf-vec2(.05,.20))/vec2(.90,.74); if(u.x>0.&&u.x<1.&&u.y>0.&&u.y<1.){ float tl=max(cyS,1.); vec2 ti=floor(u*tl); u=(fract(u*tl)-.5)*(tl>1.?1.07:1.)+.5; vec2 sz=vec2(27.,14.)*min(cyS,1.); vec2 hs=hi+ti*7.+cyI*3.; float dir=hash12(hs+1.)<.5?1.:-1.; vec2 c=u*sz; float kb=1.25+1.15*sin(uTime*.55+hash12(hs+2.)*6.283); float ux=dir>0.?u.x:1.-u.x; float ek=exp(kb)-1.; float xw=log(1.+ux*ek)/kb, xs=ek/(kb*(1.+ux*ek)); c.x=sz.x*(dir>0.?xw:1.-xw); c.x+=-dir*uTime*(.45+.5*hash12(hs))*(cyS<1.?.6:1.)+hash12(hs+9.)*27.; if(cyS<1.) c.y+=hash12(hs+6.)<.5?0.:7.; vec2 cm=vec2(mod(c.x,27.),c.y); ivec2 ci=ivec2(floor(cm)); vec4 d2=day(ci); vec2 cf=fract(cm); bool inT=u.x>0.&&u.x<1.&&u.y>0.&&u.y<1.; vec2 gc=gh/vec2(.90,.74)*sz*tl*vec2(xs,1.); 
       float w=1.; if(d2.a>1.&&inT){ float mono=max(ln(abs(cf.x-.5)*-1.+.5,gc.x,.05),ln(.5-abs(cf.y-.5),gc.y,.05)); float ca=ha/(27./14.)*(.90/.74)/xs; vec2 sg=hn/vec2(.90,.74)*sz*tl*vec2(xs*ca,1.)/.36; float cp=hpx*.74/(sz.y*tl); float nn=numl(int(d2.r),(cf*vec2(ca,1.)-vec2(.09,.30))/.36,cp*.36,dx*sg,dy*sg,4.); float bl=mix(.34,smoothstep(0.,max(gc.x,.02),cf.x-.12)*smoothstep(0.,max(gc.x,.02),.70-cf.x)*smoothstep(0.,max(gc.y,.02),cf.y-.24)*smoothstep(0.,max(gc.y,.02),.74-cf.y)*.8,smoothstep(1.4,3.2,min(cp,1./gc.x))); nn=mix(bl,nn,smoothstep(6.,10.,cp)); e=max(e,mono*.42*smoothstep(3.,8.,cp)); if(d2.b>5.5) Rd=max(Rd,nn*hk); else e=max(e,nn*.98*w); } }
       }
    K=max(K,e*hk*mix(1.,clr,.85)); }
   // alternate months carry a light tint of black
   
  }
 } else {
  float c=.30; float nt=0.; vec2 s=vec2(asp,1.)/c;
  if(p.y<0.&&p.x>-.2){ ${$5.map(
    (i, t) =>
      `if(p.x>=${zi(i)}&&p.x<${zi(i)}+3.){ int m=${t}; vec2 q=(vec2((p.x-${zi(i)}-.04)*asp,p.y+.46))/c; nt=max(nt,label(q,vec2(float(m%3)*682.,640.+float(m/3)*128.),vec2(uMw[m],128.),vec2(20.,19.),77.,c*big,dx*s,dy*s,.4)); }`,
  ).join(`
`)} K=max(K,nt); }
  if(p.x<0.&&p.x>-.75&&p.y>=0.&&p.y<14.){ int r=id.y%7; int w=r==0?0:r==1?1:r==2?2:r==3?1:r==4?3:4; float cc=.27; vec2 sw=vec2(asp,1.)/cc; vec2 q=vec2((p.x+.42)*asp,f.y-.365)/cc; float a=label(q,vec2(float(w)*192.,1152.),vec2(192.,192.),vec2(96.,37.),113.,cc*big,dx*sw,dy*sw,.4); if(r==6) Rd=max(Rd,a); else K=max(K,a); }
  // register marks and the control strip of a printed sheet
  vec2 gg=g; for(int i=0;i<2;i++){ vec2 c0=vec2(i==0?-.98:27.4,i==0?14.45:7.); vec2 d=(p-c0)*vec2(asp,1.); float R=length(d); float gy=g.y; float x=max(max(ln(abs(R-.16),gy,.022),ln(abs(d.x),gy,.018)*step(abs(d.y),.3)),ln(abs(d.y),gy,.018)*step(abs(d.x),.3)); K=max(K,x); vec2 dr=d-vec2(.018,.012); Rd=max(Rd,ln(abs(length(dr)-.16),gy,.022)*.9); }
  if(p.y>14.36&&p.y<14.62&&p.x>9.&&p.x<18.){ float i=floor((p.x-9.)/.5); float fx=fract((p.x-9.)/.5); float v=i<9.?(i+1.)/9.:1.-(i-9.)/9.; float dot1=step(length((fract(p*vec2(14.*asp,14.)*mat2(.7,.7,-.7,.7))-.5)),sqrt(v)*.62); if(fx<.94){ if(i<9.) K=max(K,mix(dot1,v,.5)*.95); else Rd=max(Rd,mix(dot1,v,.5)*.95); } }
 }
 // --- the day's bulge
 vec3 t1=vT1/l1,t2=vT2/l2; vec3 N=vN0; float ao=1.; float edge=1.; vec2 ed=min(f,1.-f);
 float puffN=ing?clamp(vA/max(min(l1,l2),1e-3)*8.,0.,1.):0.;
 if(ing){ vec2 c=2.*f-1.; vec2 c1=1.-c*c; float w=max(c1.x*c1.y,0.); float dP=mix(.6*pow(w+.03,-.4)*1.1162,1.,uFish*.8); vec2 dh=dP*(-4.*c)*c1.yx;
  // seams pucker like a quilt pulled tight
  float px1=sin(f.x*46.+hash12(floor(p)+vec2(0.,floor(f.y+.5)))*40.+uTime*.35)*exp(-ed.y*13.), px2=sin(f.y*38.+hash12(floor(p)*1.7+vec2(floor(f.x+.5),0.))*40.-uTime*.3)*exp(-ed.x*13.); dh+=vec2(px1*smoothstep(0.,.12,ed.x),px2*smoothstep(0.,.12,ed.y))*1.25;
  dh+=vec2(sin(p.x*9.+p.y*6.+uTime*.4+sin(p.y*5.)*1.7),sin(p.y*10.-p.x*5.-uTime*.35+sin(p.x*6.)*1.6))*.16; 
  N=normalize(N-t1*dh.x*vA/l1-t2*dh.y*vA/l2); float m=ed.x*asp*ed.y/(ed.x*asp+ed.y+1e-4)*1.25; ao=mix(1.,mix(mix(.42,.72,uFish),1.,smoothstep(0.,.2,m))*.86+.14,puffN); }
 N=normalize(N+(t1*(fb.g-.5)+t2*(fb.b-.5))*.42);
 // perforations: rows of pin holes that open into slits as the sheet is pulled
 float gap=0.,lip=0.;
 if(ing&&isDay){ float st=smoothstep(130.,380.,bd)*(1.-.75*uFish); if(st>.001){ for(int i=0;i<2;i++){ float al=i==0?f.y:f.x; float dd=i==0?ed.x*asp:ed.y; float sd=i==0?step(.5,f.x):step(.5,f.y); vec2 key=floor(p)+(i==0?vec2(sd,0.):vec2(0.,sd)); float h=hash12(key*vec2(1.3,2.1)+float(i)*17.); float len=.25+.6*h; float c=.5+(hash12(key+5.)-.5)*.35; float s=clamp(1.-abs(al-c)/(len*.5),0.,1.); float wob=dd<.03?(vn(vec2(al*46.,h*90.))-.5)+.6*(vn(vec2(al*140.,h*40.))-.5):0.; float wd=st*h*.017*pow(s,.6)*(1.+.25*sin(uTime*.9+h*20.)); if(h>.35&&dd<.03){ float x=dd-wd-wob*.006*step(.001,s)*st; float aa=g.y; gap=max(gap,s>0.?smoothstep(aa,-aa,x):0.); lip=max(lip,s>0.?smoothstep(.016,.0,x)*st:0.); } } } }
 float sh=shadow(vW+vN0*.02,.0065);
 float inkN=.93+.14*fz; vec3 alb=vec3(.905,.895,.868)*(1.+.10*fz)*(.975+.05*fb.a);
 if(isDay&&mod(D.g,2.)>.5) alb*=mix(1.,.952,inner); if(isDay&&D.b>5.5) alb*=mix(vec3(1.),vec3(1.,.955,.935),inner);
 float kk=clamp(K*(1.+fz*.35),0.,1.)*inkN*mix(1.,clr,.97), rr=clamp(Rd*(1.+fz*.35),0.,1.)*inkN*mix(1.,clr,.97);
 alb*=mix(vec3(1.),vec3(.80,.045,.035),rr); alb*=mix(vec3(1.),vec3(.028,.028,.031),kk);
 alb=mix(alb,vec3(.93,.92,.9),lip*.6*(1.-gap));
 vec3 col=paperLight(alb,N,vW,ao,sh); col=mix(col,vec3(.012,.0105,.0095),gap*.96);
 if(uFish>0.){ vec2 a=abs(p-vec2(${zi(to.x)},${zi(to.y)})-.5); vec2 e=1.-1./(1.+max(a-.5,0.)*uQ); float q=max(e.x,e.y); col*=mix(vec3(1.),(jul?vec3(1.):mix(vec3(.93,.925,.915),vec3(.70,.69,.68),smoothstep(0.,.9,q))),uFish); if(jul){ float m=ed.x*asp*ed.y/(ed.x*asp+ed.y+1e-4)*1.35; col*=mix(1.,mix(.66,1.,smoothstep(-.01,.06,m)),uFish); } }
 col*=mix(vec3(1.),jul?vec3(.05,.07,.13):vec3(.16,.17,.2),uNight);
 o=vec4(max(col,0.),1.); }`,
  C0 = `
precision highp float; in vec3 position; uniform mat4 projectionMatrix,modelViewMatrix,modelMatrix; uniform float uTime,uShud,uLam; out vec2 vU; out vec3 vW; out vec3 vN0;
float zz(vec2 p){ float h=clamp((1.15-p.y)/2.5,0.,1.); return .02*sin(p.x*.5+uTime*.8)*h+.1*uShud*sin(p.x*1.1-uTime*28.)*h+.05*h*uLam*sin(p.x*.9+uTime*1.3); }
void main(){ vec3 p=position; float e=.02; float z=zz(p.xy); p.z+=z; vec3 n=normalize(vec3(-(zz(position.xy+vec2(e,0))-z)/e,-(zz(position.xy+vec2(0,e))-z)/e,1.)); vU=position.xy; vec4 w=modelMatrix*vec4(p,1.); vW=w.xyz; vN0=normalize(mat3(modelMatrix)*n); gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.); }`,
  eb =
    "precision highp float; precision highp sampler2D; precision highp sampler2DShadow; uniform float uTime;" +
    qv +
    `
in vec2 vU; in vec3 vW,vN0; out vec4 o;
float ln(float d,float g,float w){ float wp=w/g,lw=max(wp,1.); return clamp(lw*.5+.5-d/g,0.,1.)*min(1.,wp/lw); }
void main(){ vec4 fb=fibre(vU+11.3,0.); float fz=fb.r-.5; float g=length(dFdy(vU))+1e-5; vec3 N=normalize(vN0+vec3((fb.gb-.5)*.42,0.)); vec3 alb=vec3(.905,.895,.868)*(1.+.10*fz)*(.975+.05*fb.a); float ao=1.;
 float K=0.,R=0.; for(int i=0;i<2;i++){ vec2 d=vU-vec2(i==0?-9.24:9.24,.83); float r=length(d); K=max(K,max(max(ln(abs(r-.085),g,.012),ln(abs(d.x),g,.010)*step(abs(d.y),.16)),ln(abs(d.y),g,.010)*step(abs(d.x),.16))); R=max(R,ln(abs(length(d-vec2(.010,-.007))-.085),g,.012)); }
 alb*=mix(vec3(1.),vec3(.80,.045,.035),R*.9); alb*=mix(vec3(1.),vec3(.028,.028,.031),K*.92);
 // red bookcloth spine
 float y=vU.y+1.06; float cl=smoothstep(-g,g,-y+.0); if(cl>0.){ vec2 w=vU*vec2(46.,46.); float weave=.5+.5*sin(w.x*6.2832)*sin(w.y*6.2832); vec3 rc=vec3(.035,.034,.035)*(.72+.4*weave+.35*fz); alb=mix(alb,rc,cl); float c=(vU.y+1.17)/.11; N=normalize(N+cl*vec3((weave-.5)*.25,c*.5,0.)); }
 float sp=0.; vec3 add=vec3(0.); for(int i=0;i<4;i++){ float x0=-6.9+4.6*float(i); vec2 d=vec2(vU.x-x0,vU.y+1.155); float q=length(vec2(max(abs(d.x)-.21,0.),d.y)); float m=smoothstep(.026+g,.026-g,q); vec2 ds=d-vec2(.02,-.03); float qs=length(vec2(max(abs(ds.x)-.21,0.),ds.y)); alb*=1.-.55*smoothstep(.06,.015,qs)*(1.-m); float ny=clamp(d.y/.026,-1.,1.); vec3 nm=normalize(vec3(d.x*.6,ny,sqrt(max(1.-ny*ny,.02)))); float sn=pow(max(dot(nm,normalize(uL+vec3(0,0,1))),0.),38.); alb=mix(alb,vec3(.33,.335,.34)*(.35+.65*nm.z),m); add+=m*sn*vec3(1.1,1.05,.95); N=mix(N,vec3(0,0,1),m); }
 float sh=shadow(vW+vec3(0,0,.03),.005); vec3 col=paperLight(alb,N,vW,ao,sh)+add*sh; o=vec4(col,1.); }`,
  nb =
    "precision highp float; precision highp sampler2D; precision highp sampler2DShadow; uniform float uTime,uNight;" +
    qv +
    `
in vec2 vU; in vec3 vW,vN0; out vec4 o; void main(){ vec4 a=texture(uPaper,vU*.31),b=texture(uPaper,vU*.093+.37); float f=(a.r-.5)*1.4+(b.r-.5); vec3 alb=vec3(.56,.030,.022)*(1.+f*.35)*(.86+.28*b.a); vec3 N=normalize(vec3((a.gb-.5)*.8+(b.gb-.5)*.6,1.)); float sh=shadow(vW,.010); o=vec4(paperLight(alb,N,vW,.9,sh)*mix(1.,.18,uNight),1.); }`;

// ── scene calendar · "2027" · enterWith: slam ──
var Ec = "#121214",
  vh = 26,
  ib = {
    id: "calendar",
    title: "2027",
    enterWith: "slam",
    hud: { color: (i) => (i.exit > 0.2 ? "#f1ede4" : "#121214"), font: "monoMed", alpha: 0.8 },
    beats: [
      { dur: 3.5, hold: 2.5, delay: 0.9, page: "20,365,011,074" },
      { dur: 6, hold: 3, page: "365,435,296,162" },
      { dur: 6, hold: 4, page: "10,610,209,857,723" },
      { dur: 6, hold: 4, page: "1.3 \xD7 10^15" },
    ],
    notes: [
      "墙上这是 2027 年。三百六十五天，打印机给每一天都印了同样大小。",
      "现在，按这一天里发生多少 AI 进展来重新定大小，对照 2025 年的一天。这次推演里，1 月 1 日约 1.7 倍，2 月中约 6 倍，4 月 12 日是 40 倍，到 7 月 1 日是一千倍。一月到三月变成了毛絮。六月根本放不下。这是一次模型推演，不是测量。",
      "在 AI Futures Project 2026 年 11 月更新的示例推演里，4 月 12 日是 AI 超过最强人类研究者的日子，7 月 1 日是超级智能。这只是一次公开发表的推演，而作者自己的中位数更晚：超人类研究者落在 2027 年 5 月到 8 月。如果有人问 200 小时的任务和超级智能怎么可能出现在同一个月：那座塔是把旧趋势继续画下去，而这里是一个 AI 加速自身进展的模型。",
      "而且它还在继续。以一千倍的速度，七月的一天就装下了 2025 年的一整年还多。让那一天展开。",
    ],
    create(i) {
      let { gfx: t, view: e } = i,
        n = t.target({ samples: 4, depth: !0 }),
        o = i.overlay(),
        s = new R0(),
        a = new ge(),
        r = new ge(),
        l = new Ye(vh, 1, 1, 120),
        c = new Ci(-13, 13, 9, -9, 1, 60),
        u = new Jn(2048, 1448, { depthBuffer: !0, type: $e });
      ((u.depthTexture = new Bi(2048, 1448, hi)),
        (u.depthTexture.compareFunction = Ea),
        (u.depthTexture.minFilter = u.depthTexture.magFilter = He));
      let f = new Tn(s.lut, os, 1, Qi, An);
      f.minFilter = f.magFilter = Je;
      let h = new Tn(j5(), 27, 14, Un, $e);
      ((h.minFilter = h.magFilter = Je), (h.needsUpdate = !0));
      let d = () => new ie(),
        p = {
          uLut: { value: f },
          uOm: { value: 1 },
          uRa: { value: 1 },
          uZ: { value: 1 },
          uFish: { value: 0 },
          uLam: { value: 0 },
          uTime: { value: 0 },
          uShud: { value: 0 },
          uPuff: { value: 0 },
          uBreath: { value: 0.1 },
          uM: { value: d() },
          uH: { value: d() },
          uTr: { value: new Nt() },
          uAn: { value: new Nt(s.A.x, s.A.y) },
          uSh: { value: u.depthTexture },
          uLVP: { value: new ne() },
          uL: { value: new F() },
          uPaper: { value: null },
          uPx: { value: 1 },
          uAtlas: { value: null },
          uDays: { value: h },
          uMw: { value: new Float32Array(12) },
          uYw: { value: 1 },
          uInner: { value: 1 },
          uYear: { value: 0 },
          uEdge: { value: 24 },
          uClr: { value: d() },
          uClrA: { value: 0 },
          uHead: { value: new Nt(9, 9) },
          uQ: { value: 0.5 },
          uGobo: { value: 0.3 },
          uSlide: { value: 0 },
          uRow: { value: 0 },
          uNight: { value: 0 },
          uDs: { value: 1 },
          uRes: { value: new Nt() },
        },
        x = ($, tt, W = {}) =>
          new ce({ vertexShader: $, fragmentShader: tt, glslVersion: re, uniforms: p, side: oe, ...W }),
        v = ($, tt, W, D, z) => {
          let pt = [];
          for (let ht = Math.floor($); ht < tt; ht++) {
            let gt = ht === D ? z : W;
            for (let dt = 0; dt < gt; dt++) {
              let Kt = ht + dt / gt;
              Kt >= $ - 1e-6 && Kt < tt && pt.push(Kt);
            }
          }
          return (pt[0] > $ && pt.unshift($), pt.push(tt), pt);
        },
        m = v(mh.x0, mh.x1, 8, to.x, 48),
        g = v(mh.y0, mh.y1, 8, to.y, 40),
        b = new Float32Array(m.length * g.length * 2),
        y = new Uint32Array((m.length - 1) * (g.length - 1) * 6),
        S = 0;
      for (let $ of g) for (let tt of m) ((b[S++] = tt), (b[S++] = $));
      S = 0;
      for (let $ = 0; $ < g.length - 1; $++)
        for (let tt = 0; tt < m.length - 1; tt++) {
          let W = $ * m.length + tt;
          (y.set([W, W + m.length, W + 1, W + 1, W + m.length, W + m.length + 1], S), (S += 6));
        }
      let M = new Qt();
      (M.setAttribute("position", new $t(b, 2)),
        M.setIndex(new $t(y, 1)),
        (M.boundingSphere = new Be(new F(), 1e6)));
      let w = ($, tt, W, D) => {
        let z = new Zt($, tt);
        return ((z.frustumCulled = !1), (D || W).add(z), z);
      };
      ((w(M, x(Vv, tb), a).renderOrder = -2),
        w(
          M,
          x(Vv, Gv, { colorWrite: !1, polygonOffset: !0, polygonOffsetFactor: 1.5, polygonOffsetUnits: 2 }),
          r,
        ));
      let E = new Ke(19.2, 2.44, 60, 6),
        T = new Kn(),
        _ = new Kn();
      (a.add(T),
        r.add(_),
        (w(E, x(C0, eb), a, T).renderOrder = -3),
        w(
          E,
          x(C0, Gv, { colorWrite: !1, polygonOffset: !0, polygonOffsetFactor: 1.5, polygonOffsetUnits: 2 }),
          r,
          _,
        ));
      let R = w(
        new Ke(80, 50, 1, 1),
        x(C0.replace("float zz(vec2 p){", "float zz(vec2 p){ return 0.; } float zzz(vec2 p){"), nb),
        a,
      );
      ((R.position.z = -0.16), (R.renderOrder = -1));
      let L = ($, tt) => {
          let W = i.text($, { color: Ec, font: "display", ...tt }),
            D = W.in3D(0.01, { depthTest: !1 });
          return (T.add(D), (D.renderOrder = 5), (W.mesh.renderOrder = 20), (W._g = D), W);
        },
        k = L("2027", { size: 176, valign: "middle", raster: 1.3, tracking: -0.02 }),
        P = L("每一天都一样大。", { size: 70, valign: "middle", raster: 1.3 }),
        C = L(
          "现在，按每天发生的事\n重新标定每一天。",
          { size: 68, valign: "middle", leading: 1.16, raster: 1.3 },
        ),
        A = i.text("4 月 12 日：超越最强人类研究者的 AI", {
          size: 44,
          font: "textMed",
          color: Ec,
          valign: "middle",
        }),
        N = i.text("7 月 1 日：超级智能", {
          size: 60,
          font: "textMed",
          color: Ec,
          align: "right",
          valign: "middle",
        }),
        G = i.text(
          "AI Futures Project 2026 年 11 月的一次示例推演。\n作者自己的中位数更晚。",
          { x: 100, y: 992, size: 34, font: "text", color: Ec, valign: "middle", leading: 1.22 },
        ),
        B = i.text("于是一年塞进一天。", {
          x: 960,
          y: 648,
          size: 84,
          align: "center",
          valign: "middle",
          color: Ec,
        }),
        ot = i.text("示意图", {
          x: 960,
          y: 730,
          size: 28,
          font: "text",
          align: "center",
          valign: "middle",
          color: Ec,
        }),
        ut = new i.SelectBox({ handle: 9, line: 3 }),
        lt = ($, tt, W) => {
          let D = new Zt(
            new Ke(1, 1),
            new ce({
              glslVersion: re,
              transparent: !0,
              depthTest: !1,
              depthWrite: !1,
              side: oe,
              blending: Ie,
              blendSrc: pe,
              blendDst: je,
              uniforms: { uR: { value: new ie() }, uRot: { value: W }, uK: { value: 0 }, uPaper: p.uPaper },
              vertexShader:
                "precision highp float; in vec3 position; uniform mat4 projectionMatrix; uniform vec4 uR; uniform float uRot; out vec2 vP; void main(){ vec2 h=uR.zw*.5+60.; vP=position.xy*2.*h; float s=sin(uRot),k=cos(uRot); gl_Position=projectionMatrix*vec4(uR.xy+uR.zw*.5+vec2(vP.x*k-vP.y*s,vP.x*s+vP.y*k),0.,1.); }",
              fragmentShader:
                "precision highp float; in vec2 vP; out vec4 o; uniform vec4 uR; uniform float uK; uniform sampler2D uPaper; float bx(vec2 p,vec2 b){ vec2 q=abs(p)-b; return length(max(q,0.))+min(max(q.x,q.y),0.); } void main(){ vec2 h=uR.zw*.5; float w=uR.z*uK; vec2 c=vec2(-h.x+w*.5,0.); vec2 b=vec2(w*.5,h.y); float d=bx(vP-c,b); vec4 f=texture(uPaper,vP/520.); float a=clamp(.5-d*1.2,0.,1.)*step(.002,uK); float l=1.-exp(-max(uK,0.)*9.); float sh=.40*exp(-pow(max(bx(vP-c-vec2(7.,9.),b)+6.,0.)/13.,1.3))+.25*exp(-max(bx(vP-c-vec2(1.5,2.),b),0.)/2.5); vec3 col=vec3(.972,.965,.945)*(1.+(f.r-.5)*.07)-.05*smoothstep(-.2*h.x,h.x,vP.x-c.x)*.5; sh*=(1.-a)*step(.002,uK)*l; o=vec4(col*a,a+sh); }",
            }),
          );
          return ((D.frustumCulled = !1), (D.renderOrder = 1), D);
        },
        Z = lt(0, 0, -0.006),
        H = lt(0, 0, 0.008),
        Y = lt(0, 0, 0),
        q = lt(0, 0, 0),
        st = 0,
        ct = ($, tt, W, D, z) => {
          ($.material.uniforms.uR.value.set(
            tt.x + tt.box.x - D,
            tt.y + tt.box.y + tt.box.h / 2 - z,
            tt.box.w + D * 2,
            z * 2,
          ),
            ($.material.uniforms.uK.value = W),
            ($.visible = W > 0.002));
        };
      o.add(Z, H, Y, q, A, N, G, B, ot, ut);
      let V = new F(),
        ft = [0, 0],
        nt = [
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
        ],
        Mt = 5.4,
        Et = 9.6,
        at = 9,
        rt = {},
        U = 0,
        j = ($, tt, W = 0) => (
          V.set($, tt, W).project(l),
          [e.x0 + (V.x * 0.5 + 0.5) * e.w, e.y0 + (-V.y * 0.5 + 0.5) * e.h]
        ),
        J = ($) => {
          let tt = [
              [0, 0],
              [1, 0],
              [1, 1],
              [0, 1],
            ].map(([Kt, Ot]) => (s.at($.x + Kt, $.y + Ot, ft), j(ft[0], ft[1], U))),
            W = Math.atan2(
              tt[1][1] + tt[2][1] - tt[0][1] - tt[3][1],
              tt[1][0] + tt[2][0] - tt[0][0] - tt[3][0],
            ),
            D = Math.cos(-W),
            z = Math.sin(-W),
            pt = (tt[0][0] + tt[1][0] + tt[2][0] + tt[3][0]) / 4,
            ht = (tt[0][1] + tt[1][1] + tt[2][1] + tt[3][1]) / 4,
            gt = 0,
            dt = 0;
          for (let Kt of tt) {
            let Ot = Kt[0] - pt,
              Ut = Kt[1] - ht;
            ((gt = Math.max(gt, Math.abs(Ot * D - Ut * z))), (dt = Math.max(dt, Math.abs(Ot * z + Ut * D))));
          }
          return [pt, ht, gt * 2, dt * 2, W];
        },
        Pt = ($, tt, W, D) => {
          tt && !rt[$] ? ((rt[$] = 1), i.sfx(W, D)) : tt || (rt[$] = 0);
        };
      return {
        async init() {
          let $ = Z5(t);
          ((p.uAtlas.value = $.tex), p.uMw.value.set($.mw), (p.uYw.value = $.yw), (p.uPaper.value = J5(t)));
        },
        enter($) {
          ((at = $.p[0] > 0.5 ? 9 : 0), (rt = $.p[0] > 0.5 ? { p1: 1, p2: 1, b1: 1, b2: 1, p3: 1 } : {}));
        },
        portal: {
          out($) {
            let tt = $.exit,
              W = bt.io3(Ct((tt - 0.35) / 0.65)),
              D = [
                [-1, 1],
                [1, 1],
                [1, -1],
                [-1, -1],
              ],
              z = s.H,
              pt = [
                [-z[0], z[1]],
                [z[0], z[1]],
                [z[0], -z[1]],
                [-z[0], -z[1]],
              ];
            for (let ht = 0; ht < 4; ht++)
              (V.set(pt[ht][0], pt[ht][1], 0).project(l),
                (nt[ht][0] = K(V.x, D[ht][0], W)),
                (nt[ht][1] = K(V.y, D[ht][1], W)));
            return { c: nt, a: kt((tt - 0.06) / 0.42), shade: K(0.85, 1, kt(tt / 0.6)) };
          },
        },
        update($) {
          let tt = $.t,
            W = t.aspect,
            D = $.exit || 0;
          $.enter >= 0.285 ? (at += $.dt) : (at = 0);
          let z = $.k(1, 0.3, 6, bt.lin),
            pt = Ct(0.12 * kt(z * 1.6) + 0.88 * Math.pow(kt(z), 1.9)),
            ht = $.k(3, 0, 4.6, bt.lin),
            gt = (Math.exp(2.2 * bt.io3(ht)) - 1) / (Math.exp(2.2) - 1),
            dt = Math.max(1, 16 / 9 / W),
            Kt = K(1.065, 1.03, pt),
            Ot = (5.4 * Kt * dt) / Math.tan((vh * Math.PI) / 360),
            Ut = 1 - gt;
          ((l.aspect = W), (l.near = 1), (l.far = 120));
          let O = (-1.5 + 0.5 * Math.sin(tt * 0.23)) * Ut + $.mouse.x * 1.1,
            I = (-1.25 + 0.3 * Math.sin(tt * 0.19 + 1)) * Ut + $.mouse.y * 0.7;
          (l.position.set(
            O * (1 - 0.35 * pt),
            I * (1 - 0.5 * pt),
            Ot - 0.25 * Math.sin(tt * 0.31) * pt - 1.2 * kt(bt.io3($.k(2, 0, 6, bt.lin))) * Ut * 0.4,
          ),
            l.lookAt(0, 0, 0),
            l.updateProjectionMatrix(),
            l.updateMatrixWorld(),
            (Mt = Ot * Math.tan((vh * Math.PI) / 360)),
            (Et = Mt * W));
          let et = K(0.8, 1.16, bt.in2(D)),
            Tt = 1 + 0.006 * Math.sin(tt * 0.8),
            vt = Et * Math.min(0.86, et + 0.04) * Tt,
            zt = Mt * et * Tt;
          ((s.fish = gt),
            (s.H[0] = K(vt, Et * 1.16, bt.in2(D))),
            (s.H[1] = zt),
            (s.H[2] = (Et - Math.min(vt, Et)) * 1.2 + Et * 0.02),
            (s.H[3] = (Mt - Math.min(zt, Mt)) * 1.3 + Mt * 0.02));
          let Ft = pt + 0.012 * pt * Math.sin(tt * 0.7) * 1.4 + 0.006 * pt * Math.sin(tt * 1.63);
          (s.set(Ft, { tilt: pt * 0.012 * Math.sin(tt * 0.37) }),
            (f.needsUpdate = !0),
            (p.uOm.value = s.om),
            (p.uRa.value = s.Ra),
            (p.uZ.value = s.Z),
            p.uM.value.fromArray(s.M),
            p.uTr.value.fromArray(s.tr),
            (p.uFish.value = gt),
            p.uH.value.fromArray(s.H),
            (p.uLam.value = pt),
            (p.uTime.value = tt),
            (p.uPuff.value = K(0, 0.2, kt(pt * 1.3)) * K(1, 1.35, gt)),
            (p.uBreath.value = K(0.3, 0.14, gt)),
            (p.uShud.value = at < 4 ? Math.exp(-at * 2.6) * Ct(at * 8) : 0));
          let wt = 0.12 * Math.sin(tt * 0.27) + 0.5 * bt.io3($.k(1, 0, 6, bt.lin)) * 0.2;
          (p.uL.value.set(-0.74 + wt, 0.56 + 0.07 * Math.sin(tt * 0.21), K(0.5, 0.37, gt)).normalize(),
            c.position.copy(p.uL.value).multiplyScalar(26),
            c.lookAt(0, 0, 0),
            c.updateMatrixWorld(),
            c.updateProjectionMatrix(),
            p.uLVP.value.multiplyMatrices(c.projectionMatrix, c.matrixWorldInverse),
            (p.uNight.value = kt((D - 0.05) / 0.4)),
            (p.uInner.value = 1 - kt((D - 0.04) / 0.4)),
            (p.uYear.value = $.p[3] > 0.4 ? Math.max(0, $.since(3) - 2.6) : 0),
            (p.uDs.value = e.w / t.W),
            (p.uPx.value = t.H / (2 * Math.tan((vh * Math.PI) / 360))),
            (p.uEdge.value = (26 * t.W) / e.w));
          {
            let jt = ($.beat === 1 ? 15 : $.beat === 2 ? 18 : $.beat === 3 ? 11 : 0) * 13.2,
              le = kt($.p[1] * 3) * (1 - kt((D - 0.08) / 0.16));
            st += ((jt || st) - st) * Math.min(1, $.dt * 10 + (st ? 0 : 1));
            let ye = q.material.uniforms;
            (ye.uR.value.set(e.x1 - 60 - st - 18, e.y1 - 76, st + 36, 44),
              (ye.uK.value = le),
              (q.visible = le > 0.002 && st > 1));
          }
          let mt = 0.07 + pt * 0.55,
            Dt = bt.in3($.k(3, 0.2, 3.2, bt.lin));
          (T.position.set(0, 5.4 - 1.22 + pt * 0.08 + Dt * 4.2, mt + Dt * 1.2),
            (T.rotation.x = -0.03 * pt - Dt * 0.5 + 0.012 * Math.sin(tt * 0.9) * (1 + 2 * pt)),
            _.position.copy(T.position),
            _.rotation.copy(T.rotation),
            (T.visible = Dt < 0.995),
            (_.visible = T.visible),
            p.uHead.value.set(2.95 + Dt * 6, mt - 0.12),
            (k.x = -880),
            (k.y = 18),
            k.show(1),
            (P.x = C.x = -316),
            (P.y = 34),
            (C.y = 10),
            P.show($.k(0, 0.5, 2.1, bt.lin), { style: "rise", by: "word", q: $.k(1, 0, 0.8, bt.lin) }),
            C.show($.k(1, 0.7, 2.4, bt.lin), { style: "rise", by: "word", q: $.k(2, 0, 0.8, bt.lin) * 0 }),
            (U = K(0.75, 0, gt)),
            (R.position.z = -0.16 - 1.75 * kt(gt * 2)),
            (p.uSlide.value = gt),
            (p.uGobo.value = K(K(0.29, 0.22, pt), 0.44, gt)));
          let it = $.k(2, 0.2, 0.7, bt.lin),
            Rt = bt.outBack($.k(2, 2.6, 3.15, bt.lin), 1.1),
            xt = $.k(3, 0, 0.6, bt.lin),
            Wt = J(K5),
            Xt = J(to),
            Vt = Wt.map((jt, le) => K(jt, Xt[le], Rt)),
            Q = K(14, 10, Rt) + 2 * Math.sin(tt * 2.2);
          (ut
            .set(Vt[0] - Vt[2] / 2 - Q, Vt[1] - Vt[3] / 2 - Q, Vt[2] + Q * 2, Vt[3] + Q * 2, Vt[4])
            .appear(it),
            xt > 0 && ut.alpha(1 - xt));
          let Lt = $.k(3, 0, 0.7, bt.lin),
            yt = $.k(2, 0.7, 2, bt.lin),
            It = $.k(2, 3.1, 4.2, bt.lin);
          ((A.x = Wt[0] + Wt[2] * 0.5 + 62),
            (A.y = Wt[1] + 18),
            A.show(yt, { style: "rise", by: "word", q: Lt }),
            (N.x = Math.min(Xt[0] + Xt[2] / 2, 1836)),
            (N.y = Xt[1] + Xt[3] / 2 + 74),
            N.show(It, { style: "rise", by: "word", q: Lt }),
            G.show($.k(2, 4.2, 5.2, bt.lin), { style: "rise", by: "word", q: Lt }));
          let St = 1 - bt.in3(Lt);
          (ct(Z, A, bt.out4($.k(2, 0.55, 1.3, bt.lin)) * St, 28, 39),
            ct(H, N, bt.out4($.k(2, 2.95, 3.6, bt.lin)) * St, 32, 50),
            ct(Y, G, bt.out4($.k(2, 4, 4.8, bt.lin)) * St, 28, 60));
          let _t = $.k(3, 3.6, 5.2, bt.lin),
            Yt = kt(D / 0.3);
          (B.show(_t, { style: "rise", by: "word", q: Yt }),
            ot.show($.k(3, 4.8, 5.6, bt.lin), { style: "rise", q: Yt }),
            (p.uRow.value = kt($.k(3, 3.2, 4.4, bt.lin))),
            $.dt > 0 &&
              $.dir > 0 &&
              !i.headless &&
              (Pt("p1", $.p[1] > 0.05, "paper", { gain: 0.6 }),
              Pt("p2", $.p[1] > 0.45, "creak", { gain: 0.7 }),
              Pt("b1", $.p[2] > 0.04, "select", {}),
              Pt("b2", $.p[2] > 0.46, "snap", {}),
              Pt("p3", $.p[3] > 0.08, "rise", {}),
              i.audio.param("tension", Ct(pt * 0.6 + gt * 0.4))));
        },
        render($, tt) {
          let W = t.r;
          (W.setRenderTarget(u),
            W.clear(!0, !0, !1),
            W.render(r, c),
            p.uRes.value.set(n.width, n.height),
            (p.uPx.value = n.height / (2 * Math.tan((vh * Math.PI) / 360))),
            t.draw(a, l, n, { color: 0 }),
            t.post(n, $, {
              tone: "none",
              contrast: 1.06,
              saturation: 1.05 + 0.1 * p.uFish.value,
              vignette: 0.16 - 0.13 * p.uFish.value,
              grain: 0.022,
              time: tt.t,
            }),
            o.render($));
        },
      };
    },
  };

var Wv = 0.32;

var zr = (i) => 9 + Wv * Math.max(10 - i, 0) + 0.22 * Math.max(i - 20, 0),
  Xv = (i) => 0.56 * (Wv * Math.max(10 - i, 0));

function ka(i, t) {
  let e = zr(t),
    n = i / e,
    o = t < 10 ? Math.log(e / 9) / Wv : t < 20 ? (10 - t) / 9 : -1.111 - Math.log(e / 9) / 0.22,
    s = Math.hypot(i, t),
    a = Ct((s - 0.4) / 2.4);
  return e * dR(n, o) * a * a * (3 - 2 * a);
}

function dR(i, t) {
  return (
    0.02 * (1 + Math.sin(i * 5.3 + 1) * Math.sin(t * 4.1 + 0.5)) +
    0.01 * Math.sin(i * 11 + t * 7) +
    0.05 * Ct((Math.abs(i) - 0.45) / 0.6) ** 2
  );
}

var pR =
    Bn +
    `
uniform highp sampler3D tN; uniform float uTan,uAsp,uSunI,uAmb,uTerm,uTermW,uSc,uT,uKin,uGlowI,uNSteps,uZeta,uFg,uNight; uniform vec3 uRo,uRt,uUp,uFw,uSun; uniform vec2 uJit; uniform sampler2D tG; uniform float uFrame;
vec4 nz(vec3 p){ vec3 i=floor(p),f=p-i; f=f*f*(3.-2.*f); return textureLod(tN,(i+f+.5)/32.,0.); }
float smin(float a,float b,float k){float h=max(k-abs(a-b),0.)/k;return min(a,b)-h*h*k*.25;}
float smax(float a,float b,float k){return -smin(-a,-b,k);}
float ogive(vec2 p,float w,float h){ p.x=abs(p.x); if(p.y<h) return max(p.x-w,-p.y); float R=w*1.5; return length(vec2(p.x+R-w,p.y-h))-R; }
float gS,gPx,gY,gSt,gM;
float hills(vec2 p){ float e=max(abs(p.x)-.45,0.)/.6; return .020*(1.+sin(p.x*5.3+1.)*sin(p.y*4.1+.5))+.010*sin(p.x*11.+p.y*7.)+.05*min(e*e,1.); }
// world -> self-similar nave coordinates
vec3 toQ(vec3 p,out float S,out float st){
  float zz=max(10.-p.z,0.), zf=max(p.z-20.,0.); S=9.+.32*zz+.22*min(zf,40.)+.15*max(zf-40.,0.); float drop=.1792*zz;
  vec3 q=vec3(p.x/S,(p.y+drop)/S, p.z<10.? log(S/9.)/.32 : p.z<20.?(10.-p.z)/9.: zf<40.? -1.111-log(S/9.)/.22 : -4.2116-log(S/17.8)/.15);
  float b=q.z/1.5, fz=floor(b), lzz=b-fz; st=q.z<0.?0.:(drop-.56*(9.*exp(.48*max(fz,0.))-9.))/S; st*=1.-smoothstep(.885,.965,lzz+.045*sin(q.x*1.9+fz*2.+1.1*sin(q.x*3.1+fz))+.012*sin(q.x*11.+2.*sin(q.x*5.1+fz))); return q; }
vec3 gQ;
// a natural arch: a fin of bedded rock with an opening, thick at the feet
float archRock(vec2 p,float dz,float w,float h,float k,float r0,float z0){ p.x=abs(p.x); float R=w*k; float s=p.y<h? p.x-w : length(vec2(p.x+R-w,p.y-h))-R; float fl=smoothstep(h+w*.85,-.1,p.y); vec2 q=abs(vec2(s-r0*.25*fl,dz))-vec2(r0*(1.+.75*fl*fl),z0*(1.+.9*fl)); return length(max(q,0.))+min(max(q.x,q.y),0.)-r0*.22; }
float map(vec3 p,bool det){
  float S,st; vec3 q0=toQ(p,S,st); gS=S; gY=q0.y; gSt=st; vec3 q=q0;
  vec3 n1=sin(q.yzx*vec3(2.3,2.1,2.6)+vec3(1.,4.,2.)+1.3*sin(q.zxy*vec3(3.1,3.7,2.9)+vec3(2.,0.,5.)));
  vec3 n2=sin(q.zxy*vec3(8.3,7.1,9.6)+n1.yzx*1.7);
  q+=n1*vec3(.075,.030,.045)+n2*vec3(.015,.010,.012); float px=gPx/S; gQ=q;
  // flanks: two eroded mountain walls, the right one low enough to let the sun in
  float bt=abs(cos(q.z*1.0472)); bt*=bt;
  float face=3.0+.50*q.y+.06*sin(q.y*3.4+n1.x*2.2)-.85*bt*smoothstep(3.4,.2,q.y); float L=(face-q.x)*.80, R=(3.4+.7*q.y-.5*bt+q.x)*.78; if(min(L,R)<.9){ float pk=nz(vec3(q.z*1.15,q.x*.5,3.)).x*.65+nz(vec3(q.z*3.1,q.x*1.3,9.)).y*.35; L=smax(L,(q.y-1.35-2.3*pk)*.62,.12); R=smax(R,(q.y-.10-.85*pk)*.7,.14); } else { L=max(L,(q.y-3.65)*.62); R=max(R,(q.y-.95)*.7); }
  // the same arch, at every size: a crowd of little ones on the snow, portals across the way, portals around those
  float i2=floor(q.z/3.+.5), d2=q.z-i2*3., g2=sin(i2*2.1+.6); float gr=q.z>0.?.32:-.15; float ex=exp(gr*d2); float x2=(q.x-.22*g2)*ex; float T2=archRock(vec2(x2,(q.y+.2)*ex),d2,1.80+.12*g2,.80,1.46,.185,.13); T2=smax(T2,-ogive(vec2(abs(x2)-2.02,q.y+.05),.12,.26),.03); if(i2<-1.5) T2=max(T2,abs(d2)*0.+.9);
  float z3=q.z-1.2, i3=floor(z3/6.+.5), d3=z3-i3*6.; ex=exp(gr*clamp(d3,-1.5,1.5)); float x3=(q.x+.35*sin(i3*2.7+1.))*ex; float T3=archRock(vec2(x3,(q.y+.3)*ex),d3,4.5,1.2,1.38,.50,.30); T3=smax(T3,-ogive(vec2(abs(x3)-4.9,q.y+.1),.34,.75),.06); if(i3<-.5) T3=max(T3,1.2);
  float z4=q.z-2.6, i4=floor(z4/12.+.5), d4=z4-i4*12.; ex=exp(gr*clamp(d4,-1.5,1.5)); float T4=archRock(vec2(q.x+.9*sin(i4*1.9+2.),q.y+.4)*ex,d4,10.5,3.2,1.40,.80,.30); if(i4<-1.5) T4=max(T4,2.);
  float shear=1./sqrt(1.+.11*dot(q0.xy,q0.xy)); float A=min(min(T2,T3),T4)*.80; float d=smin(min(L,R)*shear,A,.16); gM=0.;
  // erosion: big joints, organ-pipe fluting, benches and fine beds
  if(d<.22){ vec4 b1=nz(vec3(q.x*1.6,q.y*.6,q.z*1.6)), b2=nz(vec3(q.x*3.5,q.y*1.2,q.z*3.5)+5.); float e=(abs(b1.x-.5)-.22)*.105+(abs(b2.x-.5)-.22)*.060;
    float bn=nz(vec3(q.x*.7,q.y*9.+n1.z*.8,q.z*.7)).y, bs=smoothstep(.42,.56,bn); e+=(bs-.5)*.020;
    if(det){ float am=.040,fr=8.5; for(int i=0;i<4;i++){ float f=1.-smoothstep(.30,.85,px*fr); if(f<=0.)break; vec4 nn=nz(vec3(q.x*fr,q.y*fr*(i<2?.10:.22),q.z*fr)+float(i)*5.3); e+=(abs(nn.x-.5)-.21)*am*f*(.45+.55*bs); fr*=2.25; am*=.50; }
      float b3=nz(vec3(q.x*1.6,q.y*74.+n2.x,q.z*1.6)).z; e+=(b3-.5)*.0042*(1.-smoothstep(.0022,.008,px)); }
    d+=e*smoothstep(.22,.11,d); }
  float rr=smoothstep(.4,2.8,length(p.xz)); float fl=(q0.y-st-hills(q0.xz)*rr); { float zz=fract(q0.z/1.5); fl*=q0.z>0.&&zz>.80?.55:.86; } 
  if(det&&fl<.08){ float f=1.-smoothstep(.1,.5,px*30.); fl-=((nz(vec3(q0.x*6.+q0.z*2.,q0.z*30.,2.)).y-.5)*.0032+(nz(vec3(q0.xz*vec2(5.,9.),7.)).x-.5)*.010)*f*rr; }
  fl*=shear; gM=smoothstep(.10,-.03,fl-d); d=smin(d,fl,.18*rr+.001);
  return d*S; }
vec3 sunCol(){ return vec3(1.,.47,.20)*11.5*uSunI; }
// air, by depth: ultramarine near, rose in the middle distance, apricot under the sun and celadon away from it
vec3 hazeCol(vec3 rd,float k){ float sd=dot(rd,uSun); vec3 n=vec3(.020,.060,.200); vec3 m=mix(vec3(.060,.150,.340),vec3(.430,.190,.280),smoothstep(.42,.96,sd)); vec3 fcol=mix(vec3(.205,.375,.395),vec3(.66,.31,.20),smoothstep(.80,1.,sd)); fcol=mix(fcol,vec3(.18,.34,.44),smoothstep(.18,.62,rd.y)*.55); return mix(mix(n,m,smoothstep(0.,.40,k)),fcol,smoothstep(.30,1.,k))*uAmb; }
vec3 hazeSun(vec3 rd){ float s=max(dot(rd,uSun),0.); return (vec3(1.10,.40,.24)*pow(s,7.)*.17+vec3(2.6,1.20,.58)*pow(s,60.)*.60)*uSunI*uSunI; }
vec3 beyond(vec3 rd,float px){ vec3 c=hazeCol(rd,1.)+hazeSun(rd); float sd=dot(rd,uSun); c+=vec3(26.,15.,8.)*smoothstep(.99900,.99955,sd)*uSunI; return c; }
vec3 nrm(vec3 p,float e){ vec2 k=vec2(1,-1); gPx=e; return normalize(k.xyy*map(p+k.xyy*e,true)+k.yyx*map(p+k.yyx*e,true)+k.yxy*map(p+k.yxy*e,true)+k.xxx*map(p+k.xxx*e,true)); }
float glowAt(vec2 xz){ vec2 u=(xz-vec2(-13.,-9.))/vec2(26.,52.); if(any(lessThan(u,vec2(0)))||any(greaterThan(u,vec2(1)))) return 0.; vec2 g=textureLod(tG,u,0.).rg; return g.r*smoothstep(g.g-.02,g.g+.10,uKin); }
float sunVis(float y){ return smoothstep(uTerm,uTerm+uTermW,y); }
`,
  mR =
    pR +
    `
float ign(vec2 p){ return fract(52.9829189*fract(dot(p,vec2(.06711056,.00583715)))); }
void main(){ vec2 uv=(gl_FragCoord.xy+uJit)/uRes*2.-1.; vec3 rd=normalize(uFw+uRt*uv.x*uTan*uAsp+uUp*uv.y*uTan); vec3 ro=uRo; float px=uTan*2./uRes.y*.75; float FAR=13.*uSc+60.; float n0=fract(ign(gl_FragCoord.xy)+uFrame*.618034);
  float t=.01*uSc*n0*.2+.0005,d=1.; int N=int(uNSteps); float pd=0.; for(int i=0;i<N;i++){ gPx=px*t; d=map(ro+rd*t,true); if(d<px*t*.85||t>FAR) break; t+=d*(.70+.22*smoothstep(.1,.8,d/gS)); }
  vec3 c; bool hit=t<FAR&&d<px*t*1.8;
  if(hit){ vec3 p=ro+rd*t; float e=max(px*t*1.1,.00002); vec3 n=nrm(p,e); float S=gS,mf=gM,qy=gY; gPx=px*t*4.;
    float ao=0.,w=1.; for(int k=1;k<=3;k++){ float h=.020*float(k*k)*1.5*S; ao+=clamp(map(p+n*h,false)/h*1.35,0.,1.); } ao*=.3334; ao=ao*(.20+.80*ao);
    float sv=sunVis(p.y)*mix(.10,1.,smoothstep(24.,62.,length(p.xz-vec2(0.,12.))))*mix(1.,smoothstep(1.9,2.9,t/uSc),uFg*.95*mf); float sh=0.; float df=max(dot(n,uSun),0.); float q=dot(n,uSun);
    if(uSunI*sv>.002){ if(q>-.15){ sh=1.; float st=(e*5.+.015*S)*(.6+.8*n0); gPx=px*t*6.; for(int k=0;k<15;k++){ float h=map(p+n*e*3.+uSun*st,false); sh=min(sh,14.*h/st); if(sh<.01||st>7.*S)break; st+=clamp(h,.018*S+st*.06,1.3*S); } sh=clamp(sh,0.,1.); sh=sh*sh*(3.-2.*sh); } }
    vec3 gq=gQ; vec4 nn=nz(vec3(gq.x*.9,gq.y*9.,gq.z*.9)), n3=nz(vec3(gq.x*2.,gq.y*37.,gq.z*2.)); float u=nn.x*.65+n3.y*.35; vec3 rock=mix(vec3(.30,.125,.105),vec3(.72,.42,.27),smoothstep(.25,.6,u)); rock=mix(rock,vec3(.86,.74,.60),smoothstep(.58,.82,u)); rock=mix(rock,vec3(.34,.33,.46),.6*smoothstep(.55,.8,nn.z));
    float snow=max(smoothstep(.60,.86,n.y+.22*(nn.w-.5)),mf*smoothstep(.45,.80,n.y+.2*(nn.w-.5))); vec3 alb=mix(rock,vec3(.88,.89,.93),snow);
    float warm=max(dot(n,normalize(vec3(uSun.x,.15,uSun.z))),0.);
    c=alb*(df*sh*sv*sunCol()+ao*uAmb*((.50+.50*n.y)*vec3(.060,.150,.430)*1.05+max(dot(n,vec3(.62,.35,-.70)),0.)*vec3(.050,.150,.240)*1.1+(.5-.5*n.y)*vec3(.30,.085,.10)*.50*uSunI+warm*vec3(.80,.28,.20)*.42*uSunI));
    c+=alb*df*sh*sv*vec3(.9,.16,.10)*smoothstep(.0,.35,df)*smoothstep(.75,.25,df)*1.6*uSunI;
    // cloud going over the sills, and off one ledge high on the left wall
    { float fall=0.; float fx=abs(fract(gq.z/3.+.27)-.5)*3.; float wf=smoothstep(.10+.13*(1.75-gq.y),.0,fx+.05*(nn.y-.5))*smoothstep(1.75,1.55,gq.y)*step(2.,gq.x)*(1.-mf); float fw=nz(vec3(gq.x*11.+gq.z*11.,gq.y*2.2+uT*.16,gq.z*4.)).x*.6+nz(vec3((gq.z+gq.x)*37.,gq.y*4.5+uT*.3,3.)).y*.4; float m=max(fall*(.30+.55*smoothstep(.2,.75,fw)),wf*smoothstep(.10,.75,fw)); vec3 mc=uAmb*vec3(.125,.22,.46)+sunCol()*.06*sv*(.3+.7*sh); c=mix(c,mc,m*.85); }
    // light of the lanterns themselves
    vec3 nb=n; float fld=1.; if(uNight>.01&&mf>.2){ vec2 u=p.xz; float pf=px*t, e1=max(.004,pf*1.5); vec4 lv=1.-smoothstep(vec4(.06,.02,.006,.002),vec4(.25,.08,.025,.008),vec4(pf)); vec4 am=vec4(.20,.075,.024,.0075)*lv; vec4 f0=vec4(nz(vec3(u*1.9,1.)).x,nz(vec3(u*6.3,2.)).y,nz(vec3(u*21.,3.)).z,nz(vec3(u*72.,4.)).x), fx=vec4(nz(vec3((u+vec2(e1,0.))*1.9,1.)).x,nz(vec3((u+vec2(e1,0.))*6.3,2.)).y,nz(vec3((u+vec2(e1,0.))*21.,3.)).z,nz(vec3((u+vec2(e1,0.))*72.,4.)).x), fz=vec4(nz(vec3((u+vec2(0.,e1))*1.9,1.)).x,nz(vec3((u+vec2(0.,e1))*6.3,2.)).y,nz(vec3((u+vec2(0.,e1))*21.,3.)).z,nz(vec3((u+vec2(0.,e1))*72.,4.)).x); nb=normalize(n-vec3(dot(fx-f0,am),0.,dot(fz-f0,am))/e1); fld=.35+1.1*smoothstep(.25,.75,f0.y*.4+f0.z*.3+f0.w*.15*lv.w+f0.x*.25); }
    float g=glowAt(p.xz)*smoothstep(.06,.85,t); if(g>0.){ float ge=.22; vec2 gg=vec2(glowAt(p.xz+vec2(ge,0.)),glowAt(p.xz+vec2(0.,ge)))-glowAt(p.xz); vec3 gl=normalize(vec3(gg.x/(g+.05)*2.4,.42,gg.y/(g+.05)*2.4)); float nd=max(dot(nb,gl),0.); c+=alb*vec3(1.,.47,.15)*g*uGlowI*exp(-max(p.y,0.)*.55)*mix(.25+.75*max(n.y,0.),(.08+1.7*nd*nd*nd)*fld,step(.01,uNight)); }
    c+=alb*mf*uNight*vec3(.0090,.0115,.0200)*fld*(.10+1.2*pow(max(dot(nb,normalize(vec3(-.80,.38,.35))),0.),1.6))*smoothstep(.02,.4,t)*exp(-t*.045);
  } else { t=FAR; c=beyond(rd,px); }
  // haze, mist pouring along the floor and over the sills
  float T=1.; vec3 L=vec3(0); const int M=12; float tm=hit?min(t,FAR):9.*uSc; float prev=0.; vec3 hs=hazeSun(rd); float ph=pow(max(dot(rd,uSun),0.),4.);
  for(int i=0;i<M;i++){ float f=(float(i)+n0)/float(M); float ts=tm*f*f; float f1=(float(i)+1.)/float(M); float dt=tm*(f1*f1)-prev; prev=tm*f1*f1; vec3 p=ro+rd*ts; float S,st; vec3 q=toQ(p,S,st); float h=q.y-st; float S0=max(S,.25*uSc); float rel=ts/uSc, nearK=smoothstep(.35,1.5,rel), k=1.-exp(-rel*.62);
    vec3 fl=vec3(q.x,h*1.4,q.z)*vec3(3.2,4.,3.2)+vec3(uT*.02,-uT*.015,uT*.05); vec4 a=nz(fl); vec4 b=nz(fl*2.7+3.); float m=a.x*.65+b.y*.35;
    float low=exp(-max(h,0.)*10.)*smoothstep(.25,.75,m+.10)*1.15*smoothstep(.10,.9,rel); float bank=(exp(-pow((h-.80-.15*a.z)*5.5,2.))+.8*exp(-pow((h-1.95-.2*a.w)*4.,2.)))*smoothstep(.54,.78,m)*2.3*smoothstep(.5,1.4,rel); 
    vec4 dk=nz(vec3(p.x/uSc*.45+uT*.006,p.y/uSc*2.6,p.z/uSc*.45)); float deck=smoothstep(1.0,2.0,p.y/uSc+(dk.x-.5)*1.5+(dk.y-.5)*.5)*smoothstep(1.,2.3,rel)*(1.-.8*smoothstep(3.,5.,rel))*(.4+1.2*dk.z); float den=(.020+.112*nearK+low+bank)/S0+deck*.55/uSc;
    float ex=exp(-den*dt); float sv=sunVis(p.y); vec3 sc=hazeCol(rd,k)+hs*sv*smoothstep(.3,4.5,rel)+sunCol()*(.008+.05*ph)*sv*min((low+bank)*.8+.06,1.)+deck*sunCol()*.030*sv; 
    float g=glowAt(p.xz)*smoothstep(.5,4.,ts); if(g>0.) sc+=vec3(1.,.46,.15)*g*uGlowI*.9*exp(-max(p.y,0.)*.9); 
    L+=T*(1.-ex)*sc; T*=ex; }
  c=c*T+L; if(!hit) c+=vec3(9.,5.2,2.9)*smoothstep(.99912,.99950,dot(rd,uSun))*uSunI*uSunI*(.25+.75*T); o=vec4(max(c,0.),t); }
`,
  vR = `
uniform sampler2D tC,tH; uniform vec2 uJit,uLow; uniform vec3 uRo,uRt,uUp,uFw,pRo,pRt,pUp,pFw; uniform float uTan,uAsp,pTan,uReset;
vec3 tm(vec3 c){ return c/(1.+max(c.r,max(c.g,c.b))); } vec3 itm(vec3 c){ return c/max(1e-3,1.-max(c.r,max(c.g,c.b))); }
void main(){ vec2 lp=vUv*uLow; vec2 cell=lp-uJit-.5; ivec2 ip=ivec2(floor(cell+.5)); ivec2 mx=ivec2(uLow)-1;
  vec3 m1=vec3(0),m2=vec3(0),acc=vec3(0); float wa=0.,best=0.,tmin=1e9; 
  for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){ ivec2 q=clamp(ip+ivec2(x,y),ivec2(0),mx); vec4 s=texelFetch(tC,q,0); vec3 c=tm(s.rgb); m1+=c; m2+=c*c; vec2 dd=vec2(ip+ivec2(x,y))-cell; float w=exp(-dot(dd,dd)*2.3); acc+=c*w; wa+=w; if(abs(x)+abs(y)<2) tmin=min(tmin,s.a); best=max(best,exp(-dot(dd,dd)*4.5)); }
  acc/=wa; m1/=9.; m2/=9.; vec3 sg=sqrt(max(m2-m1*m1,0.));
  vec2 u2=vUv*2.-1.; vec3 rd=normalize(uFw+uRt*u2.x*uTan*uAsp+uUp*u2.y*uTan); vec3 P=uRo+rd*tmin-pRo; float z=dot(P,pFw); vec2 pu=vec2(dot(P,pRt)/(z*pTan*uAsp),dot(P,pUp)/(z*pTan))*.5+.5;
  bool ok=uReset<.5&&z>0.&&all(greaterThan(pu,vec2(0)))&&all(lessThan(pu,vec2(1)));
  if(!ok){ o=vec4(itm(acc),tmin); return; }
  vec3 h=tm(texture(tH,pu).rgb); vec3 hc=clamp(h,m1-sg*1.35,m1+sg*1.35); float a=mix(.025,.16,best); vec3 r=mix(hc,acc,a); o=vec4(itm(r),tmin); }
`,
  ob = (i, t) => {
    let e = 1,
      n = 0;
    for (; i > 0;) ((e /= t), (n += e * (i % t)), (i = Math.floor(i / t)));
    return n;
  };

function sb(i) {
  let { gfx: t } = i,
    e = ze(91),
    n = 32,
    o = new Uint8Array(n * n * n * 4);
  for (let j = 0; j < o.length; j++) o[j] = e() * 256;
  let s = new $o(o, n, n, n);
  ((s.format = Un),
    (s.minFilter = s.magFilter = He),
    (s.wrapS = s.wrapT = s.wrapR = an),
    (s.unpackAlignment = 1),
    (s.needsUpdate = !0));
  let a = 52e3,
    r = new Float32Array(a * 3),
    l = new Float32Array(a * 4),
    c = (j) => 2.1 * Math.sin(j * 0.23 + 0.6) + 1 * Math.sin(j * 0.61 + 1.1),
    u = [],
    f = (j) => Math.sqrt(-2 * Math.log(1 - j() * 0.9999)) * Math.cos(6.2832 * j());
  for (let j = 0; j < 64; j++) {
    let J = -5.2 + 40 * Math.pow(e(), 1.25),
      Pt = zr(J),
      $ = e() < 0.6 ? c(J) + f(e) * 1.1 : (e() * 2 - 1) * Pt * 0.78;
    Math.abs($) > Pt * 0.86 || u.push([$, J, 0.1 + 0.55 * Math.pow(e(), 2.4)]);
  }
  u.push([0.4, 0.5, 0.5]);
  let h = u.reduce((j, J) => j + J[2] * J[2] + 0.03, 0),
    d = 0,
    p = 0;
  for (; d < a && p++ < a * 6;) {
    let j,
      J,
      Pt = e();
    if (d < 2) ((j = d ? 0.0025 : 0), (J = d ? 0.0032 : 0));
    else if (d < 1500) {
      let W = 0.016 + 0.5 * Math.pow(e(), 1.5),
        D = e() * 6.2832;
      ((j = Math.cos(D) * W), (J = Math.sin(D) * W));
    } else if (Pt < 0.46) {
      let W = e() * h,
        D = 0;
      for (; D < u.length - 1 && (W -= u[D][2] ** 2 + 0.03) > 0;) D++;
      let z = u[D];
      ((j = z[0] + f(e) * z[2] * (0.4 + e())), (J = z[1] + f(e) * z[2] * (0.4 + e())));
      let pt = 0.075;
      e() < 0.6 && (e() < 0.5 ? (j = Math.round(j / pt) * pt) : (J = Math.round(J / pt) * pt));
    } else if (Pt < 0.7) {
      let W = u[(e() * u.length) | 0],
        D = null,
        z = 1e9;
      for (let gt = 0; gt < 9; gt++) {
        let dt = u[(e() * u.length) | 0],
          Kt = Math.hypot(dt[0] - W[0], dt[1] - W[1]);
        dt !== W && Kt < z && ((z = Kt), (D = dt));
      }
      if (!D) continue;
      let pt = e(),
        ht = Math.sin(pt * Math.PI) * 0.12 * z * (W[0] > D[0] ? 1 : -1);
      ((j = W[0] + (D[0] - W[0]) * pt + ht * 0.6 + f(e) * 0.018),
        (J = W[1] + (D[1] - W[1]) * pt + ht * 0.4 + f(e) * 0.018));
    } else if (Pt < 0.84)
      ((J = -5.5 + 41 * e()), (j = c(J) + (e() < 0.5 ? -1 : 1) * (0.1 + 0.1 * e() * e())));
    else if (
      ((J = -5.8 + 42 * Math.pow(e(), 1.1)),
      (j = (e() * 2 - 1) * zr(J) * 0.9),
      e() > 0.25 + 0.75 * Math.exp(-Math.abs(j - c(J)) * 0.35))
    )
      continue;
    if (
      J < -6.2 ||
      J > 38 ||
      Math.abs(j) > zr(J) * 0.95 ||
      (Math.abs(j - c(J)) < 0.07 && Pt > 0.6 && d > 1500)
    )
      continue;
    let $ = Math.hypot(j, J);
    if (d > 1 && $ < 0.014) continue;
    ((r[d * 3] = j), (r[d * 3 + 1] = ka(j, J) + 0.004 + 0.003 * e()), (r[d * 3 + 2] = J));
    let tt = 1e9;
    for (let W of u) tt = Math.min(tt, Math.hypot(W[0] - j, W[1] - J) - W[2]);
    ((l[d * 4] = Ct(Math.pow($ / 38, 0.72) * 0.93 + 0.05 * e() + 0.012 * Math.max(tt, 0))),
      (l[d * 4 + 1] = e()),
      (l[d * 4 + 2] = Math.pow(e(), 3.2)),
      (l[d * 4 + 3] = e()),
      d < 2 && ((l[d * 4] = 5e-4), (l[d * 4 + 2] = 0.75)),
      d++);
  }
  let x = d,
    v = 128,
    m = 256,
    g = new Float32Array(v * m),
    b = new Float32Array(v * m);
  for (let j = 0; j < x; j++) {
    let J = (((r[j * 3] + 13) / 26) * v) | 0,
      Pt = (((r[j * 3 + 2] + 9) / 52) * m) | 0;
    J >= 0 && Pt >= 0 && J < v && Pt < m && (g[Pt * v + J] += 0.4 + l[j * 4 + 2]);
  }
  let y = (j, J) => {
      let Pt = new Float32Array(v * m),
        $ = new Float32Array(v * m),
        tt = [],
        W = 0;
      for (let D = -J * 2; D <= J * 2; D++) {
        let z = Math.exp((-D * D) / (2 * J * J));
        (tt.push(z), (W += z));
      }
      for (let D = 0; D < m; D++)
        for (let z = 0; z < v; z++) {
          let pt = 0;
          for (let ht = -J * 2; ht <= J * 2; ht++) pt += tt[ht + J * 2] * j[D * v + Ct(z + ht, 0, v - 1)];
          Pt[D * v + z] = pt / W;
        }
      for (let D = 0; D < m; D++)
        for (let z = 0; z < v; z++) {
          let pt = 0;
          for (let ht = -J * 2; ht <= J * 2; ht++) pt += tt[ht + J * 2] * Pt[Ct(D + ht, 0, m - 1) * v + z];
          $[D * v + z] = pt / W;
        }
      return $;
    },
    S = y(g, 1),
    M = y(g, 5),
    w = new Uint16Array(v * m * 2),
    E = yl.toHalfFloat;
  for (let j = 0; j < m; j++)
    for (let J = 0; J < v; J++) {
      let Pt = j * v + J,
        $ = -13 + (26 * (J + 0.5)) / v,
        tt = -9 + (52 * (j + 0.5)) / m;
      ((w[Pt * 2] = E(S[Pt] * 0.6 + M[Pt] * 0.8)),
        (w[Pt * 2 + 1] = E(Ct(Math.pow(Math.hypot($, tt) / 38, 0.72) * 0.93))));
    }
  let T = new Tn(w, v, m, Qi, Nn);
  ((T.minFilter = T.magFilter = He), (T.needsUpdate = !0));
  let _ = t.target({ scale: 0.4 }),
    R = t.target({}),
    L = t.target({}),
    k = R,
    P = L,
    C = 0,
    A = !1,
    N = () => ({ value: new F() }),
    G = { uRo: N(), uRt: N(), uUp: N(), uFw: N(), uTan: { value: 0.66 }, uAsp: { value: 1.78 } },
    B = { pRo: N(), pRt: N(), pUp: N(), pFw: N(), pTan: { value: 0.66 } },
    ot = {
      tN: { value: s },
      tG: { value: T },
      uSunI: { value: 0 },
      uAmb: { value: 0 },
      uTerm: { value: 50 },
      uTermW: { value: 20 },
      uSc: { value: 14 },
      uT: { value: 0 },
      uKin: { value: 0 },
      uGlowI: { value: 1 },
      uNSteps: { value: 116 },
      uZeta: { value: 1 },
      uFg: { value: 0 },
      uNight: { value: 0 },
      uSun: { value: new F(-0.55, 0.24, 0.8).normalize() },
      uJit: { value: new Nt() },
      uFrame: { value: 0 },
    },
    ut = t.pass(mR, { ...ot, ...G }),
    lt = t.pass(vR, {
      tC: _.texture,
      tH: null,
      uJit: ot.uJit,
      uLow: { value: new Nt() },
      uReset: { value: 1 },
      ...G,
      ...B,
    }),
    Z = new ne(),
    H = new Qt();
  (H.setAttribute("position", new $t(r.subarray(0, x * 3), 3)),
    H.setAttribute("aS", new $t(l.subarray(0, x * 4), 4)));
  let Y = new ce({
      glslVersion: re,
      transparent: !0,
      depthTest: !1,
      depthWrite: !1,
      blending: bo,
      uniforms: {
        uKin: ot.uKin,
        uT: ot.uT,
        tD: { value: null },
        uH: { value: 1080 },
        uGain: { value: 1 },
        uFlat: { value: 0.4 },
        uOcc: { value: 0 },
        uEmb: { value: 0 },
        uRoP: G.uRo,
        uTerm: ot.uTerm,
      },
      vertexShader: `precision highp float; in vec3 position; in vec4 aS; uniform mat4 modelViewMatrix,projectionMatrix; uniform float uKin,uT,uH,uGain,uFlat,uOcc,uEmb; uniform sampler2D tD; uniform vec3 uRoP; out vec3 vC; out float vR,vH,vF;
     void main(){ vec4 mv=modelViewMatrix*vec4(position,1.); gl_Position=projectionMatrix*mv; float dist=length(mv.xyz); vec2 u=gl_Position.xy/gl_Position.w*.5+.5; float td=textureLod(tD,u,0.).a; float vis=mix(1.,smoothstep(dist*.82-.2,dist*.90-.08,td),uOcc)*smoothstep(.016,.06,dist); float k=uKin-aS.x; float on=smoothstep(0.,.035,k); float fl=1.+2.2*exp(-k*22.)*on; float tw=.80+.20*sin(uT*(1.3+2.*aS.y)+aS.w*40.)*sin(uT*(.7+1.1*aS.w)+aS.y*30.); 
      float s=uH*(.0024+.012*aS.z*aS.z)/max(dist,.02)*1.0; float s0=clamp(s,1.35*uH/1080.,5.5*uH/1080.); float e=(.22+1.0*aS.z)*min(1.,.25+5./(dist+3.)); float pool=clamp(.055*uH/max(dist,.02)/1080.*1.,0.,1.); float big=clamp(uH*.011/max(dist,.02),0.,90.*uH/1080.); vH=smoothstep(6.,18.,big); gl_PointSize=mix(s0*2.6,max(big,s0*2.6),vH); vR=gl_PointSize/(s0*2.6); vF=uFlat; vC=mix(vec3(1.,.40,.10),vec3(1.,.62,.28),aS.y)*mix(vec3(1.),vec3(1.,.60,.16),uEmb)*e*on*fl*tw*vis*uGain; if(on<=0.||vis<=0.) gl_Position=vec4(2.,2.,2.,1.); }`,
      fragmentShader:
        "precision highp float; in vec3 vC; in float vR,vH,vF; out vec4 o; void main(){ vec2 p=gl_PointCoord*2.-1.; float r=dot(p*vR,p*vR); vec2 q=p/vec2(1.,max(vF,.12)); float h=dot(q,q); float pool=vH*.07*max(1./(1.+h*26.)-1./27.,0.)*step(h,1.); o=vec4(max(vC*(exp(-r*5.)*1.2-.008),0.)+vC*vec3(1.,.72,.5)*pool,1.); }",
    }),
    q = new Zi(H, Y);
  q.frustumCulled = !1;
  let st = new ge();
  st.add(q);
  let ct = [];
  {
    let j = new Map(),
      J = (tt, W) => tt * 4096 + W,
      Pt = 0.0115,
      $ = Array.from({ length: x }, (tt, W) => W).filter((tt) => Math.hypot(r[tt * 3], r[tt * 3 + 2]) < 2.6);
    for (let tt of $) {
      let W = Math.floor(r[tt * 3] / Pt) + 2e3,
        D = Math.floor(r[tt * 3 + 2] / Pt) + 2e3,
        z = !0;
      for (let ht = -1; ht <= 1 && z; ht++)
        for (let gt = -1; gt <= 1 && z; gt++)
          for (let dt of j.get(J(W + ht, D + gt)) || [])
            if (tt > 1 && Math.hypot(r[dt * 3] - r[tt * 3], r[dt * 3 + 2] - r[tt * 3 + 2]) < 0.0105) {
              z = !1;
              break;
            }
      if (!z) continue;
      ct.push(tt);
      let pt = J(W, D);
      if ((j.has(pt) ? j.get(pt).push(tt) : j.set(pt, [tt]), ct.length >= 5200)) break;
    }
  }
  let V = ct.length,
    ft = new Float32Array(V * 4),
    nt = new Float32Array(V * 4);
  ct.forEach((j, J) => {
    let Pt = r[j * 3],
      $ = r[j * 3 + 2],
      tt = ka(Pt, $),
      W = 0.006;
    (ft.set([Pt, tt, $, j < 2 ? 1.25 : 0.55 + 0.55 * l[j * 4 + 1]], J * 4),
      nt.set(
        [
          (ka(Pt + W, $) - ka(Pt - W, $)) / (2 * W),
          (ka(Pt, $ + W) - ka(Pt, $ - W)) / (2 * W),
          l[j * 4],
          l[j * 4 + 3],
        ],
        J * 4,
      ));
  });
  let Mt = new Oe();
  (Mt.setAttribute(
    "position",
    new $t(new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0]), 3),
  ),
    Mt.setAttribute("aP", new Ue(ft, 4)),
    Mt.setAttribute("aN", new Ue(nt, 4)),
    (Mt.instanceCount = V));
  let Et = new ce({
      glslVersion: re,
      transparent: !0,
      depthTest: !1,
      depthWrite: !1,
      side: oe,
      blending: bo,
      uniforms: { uKin: ot.uKin, uT: ot.uT, tN: { value: s } },
      vertexShader:
        "precision highp float; in vec3 position; in vec4 aP,aN; uniform mat4 modelViewMatrix,projectionMatrix; uniform float uKin,uT; out vec2 vL,vW; out float vI; void main(){ float R=.014; vec2 o=position.xy*R; vec3 w=aP.xyz+vec3(o.x,o.x*aN.x+o.y*aN.y,o.y); vec4 mv=modelViewMatrix*vec4(w,1.); float dist=length((modelViewMatrix*vec4(aP.xyz,1.)).xyz); gl_Position=projectionMatrix*mv; float k=uKin-aN.z; float on=smoothstep(0.,.030,k)*(1.+.8*exp(-k*24.)); vI=aP.w*on*(.88+.12*sin(uT*(3.+2.*aN.w)+aN.w*40.))*smoothstep(.014,.05,dist)*smoothstep(3.2,1.2,dist); vL=position.xy*14.; vW=aP.xz*1000.+vL; if(vI<=.001) gl_Position=vec4(2.,2.,2.,1.); }",
      fragmentShader: `precision highp float; precision highp sampler3D; in vec2 vL,vW; in float vI; out vec4 o; uniform sampler3D tN; vec4 nz(vec3 p){ vec3 i=floor(p),f=p-i; f=f*f*(3.-2.*f); return textureLod(tN,(i+f+.5)/32.,0.); } float fo; vec4 w4;
     float ht(vec2 p){ vec4 a=nz(vec3(p*.62,1.)), b=nz(vec3(p.x*3.4+p.y*.8,p.y*3.4,5.)); return (a.x-.5)*.95*w4.y+(b.x-.5)*.34*w4.z+(b.y*b.z-.25)*.14*w4.z; }
     void main(){ float r=length(vL); if(r>14.) discard; fo=length(fwidth(vL))*.7; w4=1.-smoothstep(vec4(.35),vec4(1.2),fo*vec4(.22,.85,2.6,8.)); float h0=ht(vW), e=max(.10,fo*.7); vec3 N=normalize(vec3(-(ht(vW+vec2(e,0.))-h0)/e,1.,-(ht(vW+vec2(0.,e))-h0)/e)); float H=1.9; vec3 l=vec3(-vL.x,H-h0*.4,-vL.y); float r2=dot(l,l); vec3 ld=l/sqrt(r2); float nd=max(dot(N,ld)*.85+.15,0.); float sh=1.; for(int k=1;k<=2;k++){ float s=float(k)*.55/max(r,.6); if(s>.9) break; float y=h0+(H-h0)*s; sh*=smoothstep(-.10,.16,y-ht(vW+(-vL)*s)); } vec4 fn=nz(vec3(vW*1.3,7.)); float fr=smoothstep(.20,.90,fn.z*.55+fn.x*.45); vec3 alb=mix(vec3(.070,.056,.026),vec3(.36,.36,.36),fr*.8); float E=4.6/(r2+.6); o=vec4(vec3(1.,.50,.175)*alb*E*nd*mix(.25,1.,sh)*smoothstep(14.,5.,r)*vI,1.); }`,
    }),
    at = new Zt(Mt, Et);
  ((at.frustumCulled = !1), st.add(at), (q.renderOrder = 2));
  let rt = -1,
    U = 0;
  return {
    U: ot,
    cam: G,
    N: x,
    pts: q,
    pm: Y,
    pScene: st,
    get tex() {
      return k.texture;
    },
    get target() {
      return k;
    },
    invalidate() {
      A = !1;
    },
    resize() {
      A = !1;
    },
    setCamera(j) {
      ((G.uTan.value = Math.tan((j.fov * Math.PI) / 360)), (G.uAsp.value = j.aspect), j.updateMatrixWorld());
      let J = j.matrixWorld.elements;
      (G.uRt.value.set(J[0], J[1], J[2]),
        G.uUp.value.set(J[4], J[5], J[6]),
        G.uFw.value.set(-J[8], -J[9], -J[10]),
        G.uRo.value.set(J[12], J[13], J[14]));
    },
    render(j, J) {
      let Pt = !A || J ? (i.headless ? 14 : 4) : 1;
      (!A || J) && (lt.u.uReset.value = 1);
      for (let $ = 0; $ < Pt; $++) {
        ((C = (C + 1) % 4096),
          (ot.uFrame.value = C % 256),
          ot.uJit.value.set(ob((C % 16) + 1, 2) - 0.5, ob((C % 16) + 1, 3) - 0.5),
          $ === 0 && Pt > 1 && (lt.u.uReset.value = 1),
          (ot.uNSteps.value = Math.round(116 * (0.7 + 0.3 * j.q))),
          ut.render(_),
          lt.u.uLow.value.set(_.width, _.height));
        let tt = P;
        ((P = k),
          (k = tt),
          (lt.u.tH.value = P.texture),
          lt.render(k),
          (lt.u.uReset.value = 0),
          B.pRo.value.copy(G.uRo.value),
          B.pRt.value.copy(G.uRt.value),
          B.pUp.value.copy(G.uUp.value),
          B.pFw.value.copy(G.uFw.value),
          (B.pTan.value = G.uTan.value));
      }
      A = !0;
    },
  };
}

var P0 = (i, t) =>
    0.05 * Math.sin(i * 0.9 + 1) * Math.sin(t * 0.7) +
    0.03 * Math.sin(i * 2.1 + t * 1.7) +
    0.012 * Math.sin(i * 5.3 - t * 4.1),
  xR = 12,
  Da = "vec3(1.,.50,.175)",
  gR =
    Bn +
    `
precision highp float; uniform vec3 uL[2]; uniform vec2 uI,uTw; uniform sampler2D tS0,tS1; uniform vec3 uCam; uniform float uT;
float gh(vec2 p){ return .05*sin(p.x*.9+1.)*sin(p.y*.7)+.03*sin(p.x*2.1+p.y*1.7)+.012*sin(p.x*5.3-p.y*4.1); }
vec2 shUv(vec3 d){ return d.xz/(1.-d.y)*.40+.5; }
float ign(vec2 p){ return fract(52.9829189*fract(dot(p,vec2(.06711056,.00583715)))); }
float shadow(int i,vec3 P){ vec3 v=P-uL[i]; float r=length(v); vec3 d=v/r; if(d.y>.55) return 1.; vec2 u=shUv(d); float s=0.; float a=ign(gl_FragCoord.xy)*6.2832; float rad=.0018+.0030*clamp(r*.22,0.,1.); for(int k=0;k<7;k++){ float f=sqrt((float(k)+.5)/7.); float t=a+float(k)*2.399963; vec2 o=vec2(cos(t),sin(t))*f*rad; float z=i==0?textureLod(tS0,u+o,0.).r:textureLod(tS1,u+o,0.).r; s+=step(r-.025-.012*r,z); } return s/7.; }
float cage(int i,vec3 d){ float a=atan(d.z,d.x)+(i==0?uTw.x:uTw.y); float b=abs(fract(a/1.5708)-.5)*1.5708; float bar=1.-.72*smoothstep(.10,.03,abs(b)); float base=smoothstep(-.99,-.90,d.y); float top=smoothstep(.80,.55,d.y); return mix(.55,bar,smoothstep(-.9,-.5,d.y))*base*top; }
vec3 lit(vec3 P,vec3 N,float wrap,float tr,vec3 alb,float gloss,bool sh){ vec3 c=vec3(0); vec3 V=normalize(uCam-P); for(int i=0;i<2;i++){ float I=i==0?uI.x:uI.y; if(I<=0.) continue; vec3 v=uL[i]-P; float r2=dot(v,v),r=sqrt(r2); if(r>14.) continue; vec3 l=v/r; float nl=dot(N,l); float df=max((nl+wrap)/(1.+wrap),0.)+tr*max(-nl,0.); float s=sh?shadow(i,P):1.; float E=I/(r2+.015)*s*cage(i,-l); vec3 H=normalize(l+V); float sp=gloss*pow(max(dot(N,H),0.),38.); c+=${Da}*E*(alb*df+vec3(sp)); } return c; }
`,
  Yv = `uniform vec3 uLs; out float vR; void shProj(vec3 w){ vec3 v=w-uLs; float r=length(v); vec3 d=v/r; vR=r; vec2 u=d.xz/(1.-d.y)*.80; gl_Position=vec4(u,r/${xR.toFixed(1)}*2.-1.,1.); if(d.y>.6) gl_Position=vec4(9.,9.,9.,1.); }`,
  yR = "precision highp float; in float vR; out vec4 o; void main(){ o=vec4(vR,0.,0.,1.); }";

function ab(i) {
  let { gfx: t } = i,
    e = t.target({ samples: 4, depth: !0 }),
    n = new Ye(40, 1.78, 0.06, 600),
    o = (Y) => t.target({ w: Y, h: Y, type: Nn, filter: Je, depth: !0 }),
    s = [o(1536), o(1024)],
    a = [new F(0, 1, 0), new F(2.5, 1, 3.2)],
    r = {
      uL: { value: a },
      uI: { value: new Nt(0, 0) },
      uTw: { value: new Nt() },
      tS0: { value: s[0].texture },
      tS1: { value: s[1].texture },
      uCam: { value: new F() },
      uT: { value: 0 },
    },
    l = new ge(),
    c = [new ge(), new ge()],
    u = [{ value: a[0] }, { value: a[1] }],
    f = (Y, q, st = {}, ct = {}) =>
      new ni({
        glslVersion: re,
        uniforms: { ...r, ...st },
        vertexShader: Y,
        fragmentShader: gR + q,
        side: oe,
        ...ct,
      }),
    h = (Y, q, st) => {
      let ct = new ni({
          glslVersion: re,
          uniforms: { ...r, uLs: u[st] },
          vertexShader: q,
          fragmentShader: yR,
          side: oe,
        }),
        V = Y.isInstancedMesh ? Y : new Zt(Y.geometry, ct);
      return (
        (V.material = ct),
        (V.frustumCulled = !1),
        (V.matrixAutoUpdate = !1),
        (V.matrix = Y.matrixWorld),
        (V.matrixWorldAutoUpdate = !1),
        (V.matrixWorld = Y.matrixWorld),
        c[st].add(V),
        V
      );
    },
    d =
      "out vec3 vP,vN,vO; out vec2 vU; void main(){ vO=position; vU=uv; vec4 w=modelMatrix*vec4(position,1.); vP=w.xyz; vN=normalize(mat3(modelMatrix)*normal); gl_Position=projectionMatrix*viewMatrix*w; }",
    p = Yv + "void main(){ shProj((modelMatrix*vec4(position,1.)).xyz); }",
    x = new Ke(44, 44, 150, 150);
  x.rotateX(-Math.PI / 2);
  {
    let Y = x.attributes.position;
    for (let q = 0; q < Y.count; q++) Y.setY(q, P0(Y.getX(q), Y.getZ(q)));
    x.computeVertexNormals();
  }
  let v = new Zt(
    x,
    f(
      d,
      Fe.replace(Bn, "") +
        "in vec3 vP,vN,vO; out vec4 o; void main(){ vec2 p=vP.xz; float a=fbm(p*3.),b=fbm(p*17.+4.),c=vnoise(p*90.); vec3 N=normalize(vN+vec3(vnoise(p*31.)-.5,0.,vnoise(p*31.+9.)-.5)*.9); vec3 alb=mix(vec3(.030,.022,.014),vec3(.085,.066,.040),b); float fr=smoothstep(.45,.75,a*.5+b*.5+.15*c); alb=mix(alb,vec3(.42,.43,.45),fr*.55); float d=length(uCam-vP); float sp=step(.986,hash12(floor(p*420.)))*step(.5,fract(hash12(floor(p*420.)+3.)*7.+dot(normalize(uCam-vP),vec3(31.,17.,23.))*1.5))*smoothstep(7.,2.,d); o=vec4(lit(vP,N,.25,0.,alb,.04+sp*9.*fr,true),1.); }",
    ),
  );
  l.add(v);
  let m = new Qt();
  {
    let Y = [],
      q = [];
    for (let ct = 0; ct <= 5; ct++)
      if ((Y.push(-1, ct / 5, 0, 1, ct / 5, 0), ct < 5)) {
        let V = ct * 2;
        q.push(V, V + 1, V + 2, V + 1, V + 3, V + 2);
      }
    (m.setAttribute("position", new $t(new Float32Array(Y), 3)), m.setIndex(q));
  }
  let g = `in vec4 iP,iQ; uniform float uT; float gh(vec2 p){ return .05*sin(p.x*.9+1.)*sin(p.y*.7)+.03*sin(p.x*2.1+p.y*1.7)+.012*sin(p.x*5.3-p.y*4.1); }
   vec3 blade(out vec3 n,out float t){ t=position.y; float a=iP.z; vec2 d=vec2(cos(a),sin(a)); vec2 s=vec2(-d.y,d.x); float gust=sin(uT*.9+iP.x*.55+iP.y*.35)*.5+.5; float w=(.06+.16*gust*gust)*sin(uT*2.1+iQ.w*6.28+iP.x*1.3)+.10*gust; float bend=iQ.x+w*.5; float h=iP.w; vec3 root=vec3(iP.x,gh(iP.xy)-.01,iP.y); float th=bend*t; vec3 p=root+vec3(d.x,0.,d.y)*h*(1.-cos(th*1.2))*.9*sign(bend+.001)+vec3(d.x,0.,d.y)*h*.25*t+vec3(.35,0.,.12)*w*h*t*t+vec3(0.,h*sin(min(abs(th),1.6)*1.0+.0001)/max(abs(bend),.001),0.); float wd=iQ.y*(1.-t*t*.94); p.xz+=s*position.x*wd; vec3 tn=normalize(vec3(d.x*sin(th),cos(th)+.15,d.y*sin(th))); n=normalize(cross(vec3(s.x,0.,s.y),tn)); n=normalize(n+vec3(s.x,0.,s.y)*position.x*.55); return p; }`,
    b =
      g +
      "out vec3 vP,vN; out vec3 vK; void main(){ vec3 n; float t; vec3 p=blade(n,t); vP=p; vN=n; vK=vec3(t,iQ.z,iQ.w); gl_Position=projectionMatrix*viewMatrix*vec4(p,1.); }",
    y = g + Yv + "void main(){ vec3 n; float t; vec3 p=blade(n,t); shProj(p); }",
    S =
      "in vec3 vP,vN,vK; out vec4 o; void main(){ vec3 N=normalize(vN); vec3 V=normalize(uCam-vP); if(dot(N,V)<0.) N=-N; float t=vK.x; vec3 alb=mix(vec3(.13,.11,.05),mix(vec3(.42,.35,.19),vec3(.30,.32,.16),vK.y),t); float fr=smoothstep(.15,.95,t+.45*(vK.z-.5)); alb=mix(alb,vec3(.74,.75,.78),fr*.6); o=vec4(lit(vP,N,.35,.55,alb*mix(.45,1.25,t),.03+.16*fr,true),1.); }",
    M = ze(17),
    w = [
      [-1.16, 0.72, 0.34],
      [0.86, 0.05, 0.25],
      [1.35, 1.15, 0.42],
      [-0.55, 1.9, 0.2],
      [1.55, 3.9, 0.33],
      [3.5, 2.9, 0.26],
      [-2.6, -0.2, 0.3],
    ],
    E = { x: -0.36, z: 0.26, a: 0.22, w: 0.98, h: 0.551 },
    T = (Y, q) => {
      let st = Y - E.x,
        ct = q - E.z,
        V = Math.cos(E.a),
        ft = Math.sin(E.a);
      return Math.abs(st * V - ct * ft) < E.w * 0.52 && Math.abs(st * ft + ct * V) < E.h * 0.54;
    };
  function _(Y, q, st) {
    let ct = new Float32Array(q * 4),
      V = new Float32Array(q * 4),
      ft = 0,
      nt = 0,
      Mt = Y ? [2.5, 3.2] : [0, 0],
      Et = [];
    for (let U = 0; U < 260; U++) {
      let j = st * Math.sqrt(M()),
        J = M() * Ve;
      Et.push([
        Mt[0] + Math.cos(J) * j,
        Mt[1] + Math.sin(J) * j,
        0.06 + 0.16 * M(),
        M() * Ve,
        0.6 + 0.8 * M(),
      ]);
    }
    for (; ft < q && nt++ < q * 8;) {
      let U,
        j,
        J = 1,
        Pt = M() * Ve;
      if (M() < 0.55) {
        let D = Et[(M() * Et.length) | 0],
          z = D[2] * Math.sqrt(-2 * Math.log(1 - M() * 0.99)) * 0.8,
          pt = M() * Ve;
        ((U = D[0] + Math.cos(pt) * z),
          (j = D[1] + Math.sin(pt) * z),
          (J = D[4] * 1.25),
          (Pt = pt + (M() - 0.5) * 1.4));
      } else {
        let D = st * Math.pow(M(), 0.62),
          z = M() * Ve;
        ((U = Mt[0] + Math.cos(z) * D), (j = Mt[1] + Math.sin(z) * D), (J = 0.55));
      }
      if (T(U, j)) continue;
      let $ = 0;
      for (let D of w) Math.hypot(U - D[0], j - D[1]) < D[2] * 0.86 && ($ = 1);
      if ($ || (Y === 1 && Math.hypot(U, j) < 2.05) || (Y === 0 && Math.hypot(U - 2.5, j - 3.2) < 2))
        continue;
      let tt = Math.hypot(U - Mt[0], j - Mt[1]),
        W = (0.12 + 0.26 * Math.pow(M(), 1.5)) * J * (0.8 + 0.5 * Math.sin(U * 1.7) * Math.sin(j * 1.3));
      (ct.set([U, j, Pt, Math.max(0.04, W * K(0.75, 1.05, Ct(tt / 2)))], ft * 4),
        V.set([0.25 + 1.15 * M(), 0.0022 + 0.0024 * M(), M(), M()], ft * 4),
        ft++);
    }
    let at = new Oe();
    ((at.index = m.index),
      at.setAttribute("position", m.attributes.position),
      at.setAttribute("iP", new Ue(ct, 4)),
      at.setAttribute("iQ", new Ue(V, 4)),
      (at.instanceCount = ft));
    let rt = new Zt(at, f(b, S));
    return ((rt.frustumCulled = !1), l.add(rt), h(rt, y, Y), rt);
  }
  let R = [_(0, 76e3, 8), _(1, 26e3, 5.5)],
    L = new F();
  w.forEach((Y, q) => {
    let st = new go(1, 14),
      ct = st.attributes.position,
      V = ze(q + 5),
      ft = V() * 9,
      nt = V() * 9;
    for (let Et = 0; Et < ct.count; Et++) {
      L.fromBufferAttribute(ct, Et).normalize();
      let rt =
          1 +
          (0.16 * Math.sin(L.x * 3.1 + ft) * Math.sin(L.y * 2.7 + nt) +
            0.1 * Math.sin(L.z * 4.3 + ft) +
            0.035 * Math.sin(L.x * 11 + nt) * Math.sin(L.z * 9 + L.y * 7) +
            0.012 * Math.sin(L.y * 23 + L.x * 19)),
        U = Math.max(-0.2, L.dot(new F(Math.cos(ft), 0.4, Math.sin(ft)).normalize()) - 0.62) * 0.55;
      (L.multiplyScalar(rt - Math.max(0, U)), ct.setXYZ(Et, L.x, L.y * 0.72, L.z));
    }
    st.computeVertexNormals();
    let Mt = new Zt(
      st,
      f(
        d,
        Fe.replace(Bn, "") +
          "in vec3 vP,vN,vO; out vec4 o; void main(){ float a=fbm(vO*5.),b=fbm(vO*16.),c=vnoise(vO*60.); vec3 N=normalize(vN+(vec3(vnoise(vO*22.),vnoise(vO*22.+7.),vnoise(vO*22.+13.))-.5)*.7); vec3 alb=mix(vec3(.045,.040,.036),vec3(.135,.122,.11),a*.6+b*.4); alb=mix(alb,vec3(.30,.27,.12),smoothstep(.60,.68,fbm(vO*9.+3.))*.6); float fr=smoothstep(.25,.8,N.y+.5*(b-.5)); alb=mix(alb,vec3(.40,.415,.44),fr*.6*smoothstep(.2,.6,c+.25)); o=vec4(lit(vP,N,.08,0.,alb,.10+.2*fr,true),1.); }",
      ),
    );
    (Mt.scale.setScalar(Y[2]),
      Mt.position.set(Y[0], P0(Y[0], Y[1]) + Y[2] * 0.28, Y[1]),
      (Mt.rotation.y = q * 1.7),
      Mt.updateMatrixWorld(),
      l.add(Mt),
      h(Mt, p, q === 4 || q === 5 ? 1 : 0));
  });
  let k =
      "uniform float uT; vec3 shp(vec3 p){ vec2 q=p.xz; float cx=smoothstep(.25,.5,p.x/.98)*smoothstep(.05,.5,p.z/.551); float cy=smoothstep(.2,.5,-p.x/.98)*smoothstep(0.,.5,-p.z/.551); p.y+=cx*cx*(.075+.030*sin(uT*2.3)+.018*sin(uT*5.1+p.x*9.)); p.x-=cx*.05; p.y+=cy*.03; p.y+=.010*sin(p.x*7.+1.)*sin(p.z*9.)+.004*sin(uT*3.+p.x*12.)*(1.-.5*cy); return p; }",
    P = new Ke(E.w, E.h, 40, 24);
  P.rotateX(-Math.PI / 2);
  let C = new Zt(
    P,
    f(
      k +
        "out vec3 vP,vN; out vec2 vU; void main(){ vec3 p=shp(position),a=shp(position+vec3(.01,0,0)),b=shp(position+vec3(0,0,.01)); vU=uv; vec3 n=normalize(cross(b-p,a-p)); vec4 w=modelMatrix*vec4(p,1.); vP=w.xyz; vN=normalize(mat3(modelMatrix)*n); gl_Position=projectionMatrix*viewMatrix*w; }",
      "in vec3 vP,vN; in vec2 vU; out vec4 o; void main(){ vec3 N=normalize(vN); o=vec4(lit(vP,N,.12,.45,vec3(.80,.80,.79),.02,true),1.); }",
    ),
  );
  (C.position.set(E.x, P0(E.x, E.z) + 0.045, E.z),
    (C.rotation.y = E.a),
    C.updateMatrixWorld(),
    l.add(C),
    h(C, k + Yv + "void main(){ shProj((modelMatrix*vec4(shp(position),1.)).xyz); }", 0));
  let A = () =>
      f(
        d,
        `in vec3 vP,vN; out vec4 o; void main(){ vec3 N=normalize(vN); vec3 V=normalize(uCam-vP); vec3 c=vec3(0); for(int i=0;i<2;i++){ float I=i==0?uI.x:uI.y; vec3 v=uL[i]-vP; float r2=dot(v,v); vec3 l=v/sqrt(r2); float d=max(dot(N,l),0.)+.12; float s=pow(max(dot(N,normalize(l+V)),0.),24.); c+=${Da}*I*.22/(r2+.02)*(vec3(.045,.038,.030)*d+vec3(.20,.16,.11)*s); } o=vec4(min(c,vec3(.9)),1.); }`,
      ),
    N = [0, 1].map((Y) => {
      let q = new Kn(),
        st = A(),
        ct = (j, J = 0, Pt = 0, $ = 0) => {
          let tt = new Zt(j, st);
          return (tt.position.set(J, Pt, $), q.add(tt), tt);
        };
      (ct(new On(0.062, 0.07, 0.022, 28), 0, -0.085, 0),
        ct(new On(0.034, 0.05, 0.03, 20), 0, -0.062, 0),
        ct(new On(0.026, 0.078, 0.055, 28), 0, 0.105, 0),
        ct(new On(0.016, 0.024, 0.03, 16), 0, 0.146, 0));
      let V = ct(new yo(0.026, 0.0035, 8, 24), 0, 0.186, 0);
      for (let j = 0; j < 4; j++) {
        let J = (j * Math.PI) / 2 + Math.PI / 4;
        ct(new On(0.003, 0.003, 0.18, 8), Math.cos(J) * 0.058, 0.005, Math.sin(J) * 0.058);
      }
      ct(new yo(0.058, 0.0026, 8, 32), 0, 0.02, 0).rotation.x = Math.PI / 2;
      let ft = new Zt(
        new On(0.05, 0.05, 0.145, 32, 1, !0),
        f(
          d,
          `in vec3 vP,vN; out vec4 o; uniform float uG; void main(){ vec3 V=normalize(uCam-vP); float f=pow(1.-abs(dot(normalize(vN),V)),2.2); o=vec4(${Da}*uG*(.10+.75*f),1.); }`,
          { uG: { value: 0 } },
          { transparent: !0, blending: bo, depthWrite: !1 },
        ),
      );
      ((ft.position.y = 0.003), q.add(ft));
      let nt = new Zt(
        new Ke(0.1, 0.15),
        f(
          "uniform vec3 uCam; out vec2 vU; void main(){ vU=uv*2.-1.; vec3 w=(modelMatrix*vec4(0.,0.,0.,1.)).xyz; vec3 d=normalize(vec3(uCam.x-w.x,0.,uCam.z-w.z)); vec3 r=vec3(d.z,0.,-d.x); w+=r*position.x+vec3(0.,position.y,0.); gl_Position=projectionMatrix*viewMatrix*vec4(w,1.); }",
          `in vec2 vU; out vec4 o; uniform float uG,uSeed; void main(){ vec2 p=vU; float k=uG; float y=p.y*.5+.5; p.x+=.10*sin(uT*7.+uSeed+y*5.)*y*y+.05*sin(uT*11.3+uSeed)*y; float w=.34*pow(max(y-.12,0.),.45)*pow(max(1.-y,0.),.72)*1.7*(.35+.65*k); float d=abs(p.x)-w; float f=smoothstep(.05,-.10,d)*smoothstep(.10,.2,y); float core=smoothstep(.0,-.16,d)*smoothstep(.16,.34,y)*smoothstep(.95,.35,y); vec3 c=mix(vec3(1.,.30,.05)*3.5,vec3(1.,.66,.28)*13.,core); float blue=smoothstep(.3,.12,y)*f; c=mix(c,vec3(.10,.20,.8)*1.2,blue*.7); float halo=exp(-dot(p*vec2(1.3,1.),p*vec2(1.3,1.))*3.4)*.6; o=vec4((c*f+${Da}*halo)*k,1.); }`,
          { uG: { value: 0 }, uSeed: { value: Y * 4 } },
          { transparent: !0, blending: bo, depthWrite: !1 },
        ),
      );
      ((nt.position.y = -0.005), q.add(nt), l.add(q));
      let Mt = Y ? [2.5, 3.2] : [0, 0],
        Et = P0(Mt[0] + 0.3, Mt[1] + 0.12),
        at = [
          [0.3, Et - 0.05, 0.12],
          [0.292, Et + 0.5, 0.118],
          [0.285, Et + 1, 0.115],
          [0.27, Et + 1.28, 0.11],
          [0.2, Et + 1.42, 0.085],
          [0.09, Et + 1.45, 0.04],
          [0, Et + 1.38, 0],
          [-0.012, Et + 1.31, -0.004],
        ].map((j) => new F(j[0] + Mt[0], j[1], j[2] + Mt[1])),
        rt = new Zt(new Io(new qs(at), 60, 0.0085, 8), A());
      (l.add(rt), rt.updateMatrixWorld(), h(rt, p, Y));
      let U = at[7].clone();
      return { G: q, glass: ft, flame: nt, hook: U, len: 0.3 };
    }),
    G = 7,
    B = new Qt();
  B.setAttribute(
    "position",
    new $t(
      new Float32Array([
        0, 0, -0.5, 1, 0, -0.7, 0.9, 0, 0.35, 0, 0, -0.5, 0.9, 0, 0.35, 0, 0, 0.5, 0, 0, -0.5, -0.9, 0, 0.35,
        -1, 0, -0.7, 0, 0, -0.5, 0, 0, 0.5, -0.9, 0, 0.35,
      ]),
      3,
    ),
  );
  let ot = new Oe();
  ot.setAttribute("position", B.attributes.position);
  let ut = new Float32Array(G * 4);
  for (let Y = 0; Y < G; Y++) ut.set([Y, M(), M(), M()], Y * 4);
  (ot.setAttribute("iM", new Ue(ut, 4)), (ot.instanceCount = G));
  let lt = new Zt(
    ot,
    f(
      "in vec4 iM; uniform float uT; uniform vec3 uL[2]; out vec3 vP; vec3 pth(float t){ float a=iM.y*6.28; float r=.16+.34*iM.z+.10*sin(t*.7+a); return vec3(cos(t*(1.4+1.1*iM.w)+a)*r+.05*sin(t*7.3+a*3.),.02+.22*sin(t*1.9+a*2.)*(.4+iM.w)+.04*sin(t*9.+a),sin(t*(1.7+.8*iM.y)+a*1.7)*r+.05*sin(t*6.1+a)); } void main(){ vec3 c=uL[0]+pth(uT),c2=uL[0]+pth(uT+.02); vec3 f=normalize(c2-c); vec3 r=normalize(cross(f,vec3(.2,1.,.1))); vec3 u=cross(r,f); float fl=sin(uT*(38.+9.*iM.z)+iM.y*30.); vec3 p=position; float an=fl*1.05*sign(p.x); float x=abs(p.x); vec3 w=c+(r*p.x*cos(an)+u*x*sin(abs(an)*sign(fl))-f*p.z)*(.013+.008*iM.z); vP=w; gl_Position=projectionMatrix*viewMatrix*vec4(w,1.); }",
      `in vec3 vP; out vec4 o; void main(){ vec3 v=uL[0]-vP; float r2=dot(v,v); o=vec4(min(${Da}*uI.x*.075/(r2+.03)+vec3(0.),vec3(2.2)),1.); }`,
    ),
  );
  ((lt.frustumCulled = !1), l.add(lt));
  let Z = t.pass(
      Fe +
        `uniform vec3 uRo,uRt,uUp,uFw,uLa,uLb; uniform vec2 uI; uniform float uTan,uAsp,uBr,uFade; 
    float sc(vec3 ro,vec3 rd,vec3 L,float t1){ vec3 q=ro-L; float b=dot(q,rd); float D=sqrt(max(dot(q,q)-b*b,.0009)); return (atan((t1+b)/D)-atan(b/D))/D; }
    void main(){ vec2 u=vUv*2.-1.; vec3 rd=normalize(uFw+uRt*u.x*uTan*uAsp+uUp*u.y*uTan); float t1=rd.y<-.001?min(-uRo.y/rd.y+.0,60.):60.; vec3 c=vec3(0);
      float ta=dot(uLa-uRo,rd); vec3 pa=uRo+rd*ta; float m=.55+.9*fbm(pa*vec3(1.6,2.6,1.6)+vec3(uTime*.12,-uTime*.05,uTime*.07)); c+=${Da}*uI.x*.0013*sc(uRo,rd,uLa,t1)*m; if(uI.y>0.){ c+=${Da}*uI.y*.0013*sc(uRo,rd,uLb,t1)*m; }
      // breath: every few seconds a cloud leaves the bottom of the frame and drifts into the light
      for(int k=0;k<2;k++){ float per=5.2; float tt=uTime+float(k)*per*.5+.6; float id=floor(tt/per); float f=fract(tt/per); vec2 p=vec2(u.x*uAsp,u.y); vec2 o0=vec2(-.05+.12*(hash11(id+3.)-.5),-1.12); vec2 ce=o0+vec2(.55*f+.35*f*f,1.0*sqrt(f)*.85); float rad=.10+.75*pow(f,.7); vec2 d=(p-ce)/rad; float n=fbm(vec3(d*1.5+id*7.,tt*.45)); float den=smoothstep(1.,.0,length(d)+.9*(n-.5))*smoothstep(0.,.10,f)*pow(1.-f,1.7); vec3 bp=uRo+rd*1.15; float E=uI.x/(dot(uLa-bp,uLa-bp)+.05); float fw=.35+.65*pow(max(dot(rd,normalize(uLa-uRo)),0.),10.); c+=mix(${Da},vec3(.9,.62,.40),.5)*den*n*E*.011*fw*uBr; }
      o=vec4(c*uFade,1.); }`,
      {
        uRo: new F(),
        uRt: new F(),
        uUp: new F(),
        uFw: new F(),
        uLa: { value: a[0] },
        uLb: { value: a[1] },
        uI: r.uI,
        uTan: 1,
        uAsp: 1,
        uBr: 1,
        uFade: 1,
      },
      { blending: bo, transparent: !0 },
    ),
    H = new F();
  return {
    L: a,
    update(Y, q, st) {
      let ct = Y.t;
      r.uT.value = ct;
      let V = 0.18 + 0.82 * Y.k(0, 0, 1.8, bt.out2),
        ft = Y.k(1, 0.35, 1.5, bt.lin),
        nt = ft <= 0 ? 0 : Ct(bt.out3(ft) * (1 + 0.5 * Math.sin(ft * 9) * (1 - ft))),
        Mt = (Et) =>
          1 + 0.05 * Si(ct * 5 + Et * 31) + 0.035 * Si(ct * 11 + Et * 17) + 0.03 * Si(ct * 1.7 + Et * 7);
      (r.uI.value.set(5.6 * V * Mt(0), 6.6 * nt * Mt(1)),
        N.forEach((Et, at) => {
          let rt = 0.55 + 0.45 * Si(ct * 0.23 + at * 5),
            U = (0.05 * Math.sin(ct * 2.05 + at) + 0.035 * Math.sin(ct * 1.31 + at * 2)) * rt,
            j = (0.085 * Math.sin(ct * 2.3 + 1 + at * 2) + 0.03 * Math.sin(ct * 0.9)) * rt,
            J = Et.len + 0;
          (a[at].set(
            Et.hook.x + Math.sin(j) * J,
            Et.hook.y - Math.cos(j) * Math.cos(U) * J,
            Et.hook.z + Math.sin(U) * J,
          ),
            Et.G.position.copy(a[at]));
          let Pt = 0.35 * Math.sin(ct * 0.37 + at) + at * 0.5;
          (Et.G.rotation.set(U, 0, j),
            Et.G.rotateY(Pt),
            at ? (r.uTw.value.y = Pt) : (r.uTw.value.x = Pt),
            (Et.glass.material.uniforms.uG.value = (at ? nt : V) * 0.55),
            (Et.flame.material.uniforms.uG.value = (at ? nt : V) * Mt(at)),
            (Et.flame.visible = Et.glass.visible = at === 0 || nt > 0));
        }),
        (n.fov = q.fov),
        (n.aspect = q.aspect),
        n.position.copy(q.position).multiplyScalar(1e3),
        n.quaternion.copy(q.quaternion),
        (n.near = Ct(n.position.y * 0.05, 0.05, 4)),
        (n.far = 700),
        n.updateProjectionMatrix(),
        n.updateMatrixWorld(),
        r.uCam.value.copy(n.position),
        (R[1].visible = nt > 0));
    },
    render(Y, q, st) {
      let ct = t.r;
      l.updateMatrixWorld();
      for (let nt = 0; nt < 2; nt++) {
        if (nt && r.uI.value.y <= 0) continue;
        (ct.setRenderTarget(s[nt]), ct.setClearColor(16777215, 1));
        let Mt = ct.getClearColor(wR);
        (ct.setClearColor(bR, 1), ct.clear(), ct.render(c[nt], n));
      }
      t.draw(l, n, e);
      let V = Z.u,
        ft = n.matrixWorld.elements;
      return (
        V.uRo.value.copy(n.position),
        V.uRt.value.set(ft[0], ft[1], ft[2]),
        V.uUp.value.set(ft[4], ft[5], ft[6]),
        V.uFw.value.set(-ft[8], -ft[9], -ft[10]),
        (V.uTan.value = Math.tan((n.fov * Math.PI) / 360)),
        (V.uAsp.value = n.aspect),
        (V.uTime.value = Y.t),
        (V.uBr.value = 1 - Ct(st.rise * 12)),
        Z.render(e),
        e.texture
      );
    },
  };
}

var bR = new de(1, 1, 1),
  wR = new de();

function rb(i, t, e) {
  let { gfx: n } = i,
    o = n.target({ depth: !0 }),
    s = n.target({ scale: 0.25 }),
    a = n.target({ scale: 0.25 }),
    r = n.pass(
      "uniform sampler2D tA; uniform vec2 uPx; void main(){ vec3 c=vec3(0); for(int y=0;y<2;y++)for(int x=0;x<2;x++) c+=min(texture(tA,vUv+(vec2(x,y)*2.-1.)*uPx).rgb,vec3(9.)); c*=.25; float l=max(c.r,max(c.g,c.b)); c*=smoothstep(.55,1.9,l); o=vec4(c,1.); }",
      { tA: null, uPx: new Nt() },
    ),
    l = n.pass(
      `uniform sampler2D tA; uniform vec2 uS; uniform float uLen; float ign(vec2 p){ return fract(52.9829189*fract(dot(p,vec2(.06711056,.00583715)))); }
    void main(){ vec3 c=vec3(0); float w=0.; vec2 d=(uS-vUv)*uLen; float j=ign(gl_FragCoord.xy); for(int i=0;i<24;i++){ float f=(float(i)+j)/24.; vec2 u=vUv+d*f; float k=exp(-f*1.6)*step(abs(u.x-.5),.5)*step(abs(u.y-.5),.5); c+=texture(tA,u).rgb*k; w+=exp(-f*1.6); } o=vec4(c/w,1.); }`,
      { tA: null, uS: new Nt(), uLen: 0.9 },
    ),
    c = n.pass(
      "uniform sampler2D tA; uniform vec2 uPx; void main(){ vec3 c=vec3(0); float w=0.; for(int y=-2;y<=2;y++)for(int x=-2;x<=2;x++){ float g=exp(-float(x*x+y*y)*.35); c+=texture(tA,vUv+vec2(x,y)*uPx).rgb*g; w+=g; } o=vec4(c/w,1.); }",
      { tA: null, uPx: new Nt() },
    ),
    u = n.pass(
      "uniform sampler2D tA,tR,tN; uniform float uRay,uFar,uNear,uNd; void main(){ vec3 c=texture(tA,vUv).rgb*uFar+texture(tR,vUv).rgb*uRay; if(uNear>0.) c+=texture(tN,vUv).rgb*uNear; c*=1.-uNd*smoothstep(.40,.02,vUv.y); o=vec4(c,1.); }",
      { uNd: 0, tA: null, tR: null, tN: null, uRay: 0, uFar: 0, uNear: 0 },
    ),
    f = new F(),
    h = !1,
    d = 130,
    p = new Oe();
  p.setAttribute(
    "position",
    new $t(new Float32Array([0, 0, 0.32, 0, 0, -0.34, 1, 0, -0.1, 0, 0, 0.32, -1, 0, -0.1, 0, 0, -0.34]), 3),
  );
  let x = ze(44),
    v = new Float32Array(d * 4);
  for (let y = 0; y < d; y++) v.set([y < 78 ? 0 : 1, x(), x(), x()], y * 4);
  (p.setAttribute("iB", new Ue(v, 4)), (p.instanceCount = d));
  let m = new ce({
      glslVersion: re,
      transparent: !0,
      depthTest: !1,
      depthWrite: !1,
      side: oe,
      uniforms: {
        uRo: t.cam.uRo,
        uRt: t.cam.uRt,
        uUp: t.cam.uUp,
        uFw: t.cam.uFw,
        uSc: t.U.uSc,
        uT: t.U.uT,
        uA: { value: 0 },
        tD: { value: null },
      },
      vertexShader: `precision highp float; in vec3 position; in vec4 iB; uniform mat4 viewMatrix,projectionMatrix; uniform vec3 uRo,uRt,uUp,uFw; uniform float uSc,uT; uniform sampler2D tD; out float vA; vec3 pth(float t){ float g=iB.x; float T=t/(g<.5?64.:95.)+g*.37; float f=fract(T); float a=iB.y*6.283; vec2 o=vec2(cos(a),sin(a))*sqrt(iB.z); float D=g<.5?.85:1.9; vec3 c=uFw*(D+.22*o.y+.05*sin(t*.5+a*3.))+uRt*((f-.5)*(g<.5?-2.9:5.6)*D/.95+.34*o.x*D+.03*sin(t*.63+a*5.))+uUp*(.16*D+.30*D*sin(f*3.1+g)*.6+.11*D*(iB.w-.5)+.03*sin(t*.8+a*4.)); return uRo+uSc*c; }
      void main(){ vec3 c=pth(uT),d=pth(uT+.4)-c; vec3 f=normalize(d+vec3(1e-6)); vec3 r=normalize(cross(f,vec3(0.,1.,0.))); vec3 u=cross(r,f); float fl=sin(uT*(5.5+2.*iB.w)+iB.y*40.)*(.5+.5*sin(uT*.9+iB.z*20.)); float s=uSc*(.0058+.0030*iB.w); float an=.25+.65*fl; vec3 w=c+s*(r*position.x*cos(an)+u*abs(position.x)*sin(an)+f*position.z*.8); gl_Position=projectionMatrix*viewMatrix*vec4(w,1.); vec4 cc=projectionMatrix*viewMatrix*vec4(c,1.); float td=textureLod(tD,cc.xy/cc.w*.5+.5,0.).a; float dist=length(c-uRo); vA=smoothstep(dist*.96,dist,td); float ff=abs(cc.x/cc.w); vA*=1.-smoothstep(1.02,1.12,ff); }`,
      fragmentShader:
        "precision highp float; in float vA; out vec4 o; uniform float uA; void main(){ o=vec4(vec3(.030,.034,.060),vA*uA*.92); }",
    }),
    g = new Zt(p, m);
  g.frustumCulled = !1;
  let b = new ge();
  return (
    b.add(g),
    {
      resize() {},
      render(y, S, M, w, E) {
        h ||
          ((h = !0),
          t.render(S, !0),
          (r.u.tA.value = t.tex),
          r.render(s),
          (l.u.tA.value = s.texture),
          l.render(a),
          (c.u.tA.value = a.texture),
          c.render(s),
          (m.uniforms.tD.value = t.pm.uniforms.tD.value = t.tex),
          n.r.setRenderTarget(o),
          n.r.render(t.pScene, M),
          n.r.render(b, M),
          t.invalidate());
        let T = t.U,
          _ = T.uSunI.value,
          R = w.h > 0.02 ? kt(Ct((w.h - 0.02) / 0.1)) : 0,
          L = 1 - kt(Ct((w.h - 0.05) / 0.1));
        R > 0 ? t.render(S, E) : t.invalidate();
        let k = 0;
        if (R > 0 && _ > 0.01) {
          f.copy(T.uSun.value).multiplyScalar(1e3).add(M.position).project(M);
          let A = f.x * 0.5 + 0.5,
            N = f.y * 0.5 + 0.5;
          ((k = 0.27 * _),
            (r.u.tA.value = t.tex),
            r.u.uPx.value.set(1 / n.W, 1 / n.H),
            r.render(s),
            (l.u.tA.value = s.texture),
            l.u.uS.value.set(Ct(A, -0.2, 1.2), Ct(N, -0.2, 1.2)),
            l.render(a),
            (c.u.tA.value = a.texture),
            c.u.uPx.value.set(1 / s.width, 1 / s.height),
            c.render(s));
        }
        let P = L > 0 ? e.render(S, M, w) : null;
        ((u.u.tA.value = t.tex),
          (u.u.tR.value = s.texture),
          (u.u.tN.value = P),
          (u.u.uRay.value = k),
          (u.u.uFar.value = R),
          (u.u.uNear.value = P ? L : 0),
          (u.u.uNd.value = 0.72 * S.k(2, 5.5, 9.5, kt)),
          u.render(o),
          w.h > 0.0025 &&
            T.uKin.value > 0 &&
            ((t.pm.uniforms.tD.value = t.tex),
            (t.pm.uniforms.uH.value = n.H),
            (t.pm.uniforms.uOcc.value = R),
            (t.pm.uniforms.uFlat.value = Math.max(0.14, Math.min(1, -t.cam.uFw.value.y + 0.12))),
            n.r.setRenderTarget(o),
            n.r.render(t.pScene, M)));
        let C = S.k(2, 4.2, 7.5, kt);
        (C > 0 &&
          ((m.uniforms.uA.value = C),
          (m.uniforms.tD.value = t.tex),
          n.r.setRenderTarget(o),
          n.r.render(b, M)),
          n.post(o, y, {
            exposure: K(0.95, 0.78, Ct(_)),
            bloom: K(0.75, 0.42, Ct(_)),
            threshold: K(0.55, 1.2, Ct(_)),
            radius: 0.85,
            tone: "aces",
            contrast: K(1.06, 1.22, Ct(_)),
            saturation: K(1.16, 1.2, Ct(_)),
            vignette: K(0.35, 0.22, Ct(_)),
            grain: 0.028,
            halation: 0.6,
            time: S.t,
          }));
      },
    }
  );
}

// ── scene lamp · "How far you can see" · enterWith: portal-out ──
var lb = {
  id: "lamp",
  title: "你能看多远",
  enterWith: "portal-out",
  hud: { color: "#ffffff", font: "monoMed" },
  beats: [
    { dur: 4.5, hold: 3, delay: 1.6, page: "1.6 \xD7 10^19" },
    { dur: 7, hold: 4, page: "4.1 \xD7 10^26" },
    { dur: 11, hold: 8, page: "8.9 \xD7 10^40" },
  ],
  notes: [
    "忘掉考试成绩。智能就是你能看多远。黑暗中，一个人，一盏灯。光圈里的一切你都能想；光圈之外，对你来说不存在。",
    "现在点亮人类带过的最亮的一盏灯：爱因斯坦。看看他多照亮了这块地方多少——几乎看不出来。再把所有在世的人，八十亿个，一起点亮。很美。但依然是黑夜。",
    "那么太阳升起来是什么样子？这一切一直都在这里。我们称之为世界的东西，只是其中的一道小褶皱。",
  ],
  create(i) {
    let { gfx: t, view: e } = i,
      n = new Ye(60, 1.78, 0.001, 4e3),
      o = sb(i),
      s = ab(i),
      a = rb(i, o, s),
      r = i.overlay(),
      l = i.text(
        "智能，就是\n你能看多远。",
        { x: 130, y: 150, size: 78, font: "display", leading: 1.28, color: "#fff3e2" },
      ),
      c = i.text("你", { x: 0, y: 0, size: 46, font: "textMed", valign: "middle", color: "#fff6ea" }),
      u = i.text("爱因斯坦", { x: 0, y: 0, size: 46, font: "textMed", valign: "middle", color: "#fff6ea" }),
      f = i.text("所有在世的人", { x: 130, y: 150, size: 104, font: "display", color: "#fff3e2" }),
      h = i.text("超级智能", { x: 130, y: 962, size: 92, font: "display", valign: "middle" });
    r.add(l, c, u, f, h);
    let d = new F(),
      p = new F(),
      x = new F(0, 1, 0),
      v = { near: 1, far: 0, rise: 0 },
      m = { creep: 0, glide: 0 },
      g = [0, 0, 0, 0, 0, 0, 0, 0, 0],
      b = -9,
      y = new F(),
      S = (_, R, L, k, P) => {
        (g[_] < L && R >= L && P.dt > 0 && R - g[_] < 0.3 && k(), (g[_] = R));
      },
      M = (_, R, L, k) => (
        d.set(_, R, L).project(n),
        (k.x = e.x0 + (d.x * 0.5 + 0.5) * e.w),
        (k.y = e.y0 + (-d.y * 0.5 + 0.5) * e.h),
        k
      ),
      w = { x: 0, y: 0 };
    function E(_) {
      let R = 1 - Math.exp(-_.dt * 2.5);
      {
        let Et = Math.max(0, _.since(2) - 11),
          at = 2.05 * (1 - Math.exp(-Et / 2.6)) + (0.02 * Et) / (1 + Et / 1500);
        m.creep += (at - m.creep) * (1 - Math.exp(-_.dt * 9));
      }
      m.glide += (1 - Math.exp(-Math.max(0, _.since(1) - 6.5) / 40) - m.glide) * R;
      let L = _.t,
        k = _.mouse.x,
        P = _.mouse.y,
        C = _.k(1, 2.5, 6.8, (Et) => Fn(Et));
      v.rise = C;
      let A = _.k(1, 0, 2.6, bt.io3),
        N = _.k(2, 0, 11, bt.lin),
        G = bt.io3(Ct(N * 1));
      n.aspect = t.aspect;
      let B = Ct(1.78 / t.aspect, 0.8, 1.35),
        ot = Math.log(0.00125),
        ut = Math.log(2.55),
        lt = Math.exp(K(ot, ut, C)),
        Z = 0.0034 + 0.002 * A,
        H = lt,
        Y = -Math.hypot(Z, lt * 2.08),
        q = 0,
        st = 1 - Ct(C * 8);
      ((q += st * (12e-5 * Math.sin(L * 0.31) + 28e-5 * k * -1)),
        (H += st * (5e-5 * Math.sin(L * 0.43) + 12e-5 * P)));
      let ct = lt / 2.55;
      ((Y += ct * 1.1 * m.glide),
        (H -= ct * 0.35 * m.glide),
        (q += ct * (0.1 * Math.sin(L * 0.13) - 0.25 * k)),
        (H += ct * (0.05 * Math.sin(L * 0.17 + 1) + 0.12 * P)));
      let V = -0.105,
        ft = K(0.215, 0.15, A);
      {
        let Et = 0.0011 - q,
          at = 6e-4 - H,
          rt = 0.0014 - Y,
          U = Math.atan2(at, Math.hypot(Et, rt)) + 0.1,
          j = Math.atan2(Et, rt),
          J = kt(Ct(C / 0.14));
        ((V = K(V, U, J)), (ft = K(ft, j, J)));
        let Pt = kt(Ct((C - 0.66) / 0.34));
        ((V = K(V, -0.175, Pt)), (ft = K(ft, 0.02, Pt)));
      }
      let nt = K(36, 62, kt(Ct(C * 1.4)));
      if (N > 0 || _.since(2) > 0) {
        let at =
            Math.log(zr(-5.3) / 9) / 0.32 + (6.75 * (N < 0.35 ? (N * N) / 0.7 : N - 0.175)) / 0.825 + m.creep,
          rt = 9 * Math.exp(0.32 * at),
          U = 10 - (rt - 9) / 0.32,
          j = (2.55 + Xv(-5.3)) / zr(-5.3),
          J = kt(Ct(N * 1.6)),
          Pt = K(j, 0.62, J) + (1.05 - 0.62) * kt(Ct((N - 0.25) / 0.75)) + 0.05 * Math.sin(L * 0.07) * J,
          $ = K(0, 0.06 + 0.1 * Math.sin(L * 0.11), J);
        ((q = K(q, $ * rt + rt * (0.006 * Math.sin(L * 0.13) - 0.03 * k), J)),
          (H = K(H, Pt * rt - Xv(U) + rt * 0.015 * P, J)),
          (Y = U + K(Y + 5.3, 0, J)),
          (V = K(V, 0.11, kt(Ct(N * 3.2)))),
          (V = K(V, -0.075 + 0.012 * Math.sin(L * 0.09), kt(Ct((N - 0.3) / 0.7)))),
          (ft = K(ft, 0.125 + 0.015 * Math.sin(L * 0.06), kt(Ct(N * 1.3)))),
          (nt = K(nt, 66, kt(Ct(N * 1.5)))),
          (v.zeta = at),
          (v.S = rt));
      } else ((v.zeta = 1.36), (v.S = 13.9));
      let Mt = ka(0, 0);
      (n.position.set(q, H + Mt * 0, Y),
        (V += P * 0.015),
        (ft += k * 0.03 * -1),
        p.set(Math.sin(ft) * Math.cos(V), Math.sin(V), Math.cos(ft) * Math.cos(V)),
        n.up.set(0, 1, 0),
        (n.fov =
          (2 * Math.atan(Math.tan((nt * Math.PI) / 360) * (t.aspect < 1.6 ? 1.12 : 1)) * 180) / Math.PI),
        n.lookAt(q + p.x, n.position.y + p.y, Y + p.z),
        (n.near = Math.max(5e-5, lt * 0.04)),
        (n.far = n.near * 1e6),
        n.updateProjectionMatrix(),
        n.updateMatrixWorld(),
        (v.h = N > 0 ? Math.max(H, 2) : H));
    }
    return {
      enter(_) {
        (o.invalidate(),
          (b = -9),
          (m.creep = 0),
          (m.glide = _.beat > 1 ? 0.3 : 0),
          _.p[2] > 0.99 && (m.creep = 2.05));
      },
      resize() {
        (o.resize(), a.resize());
      },
      update(_) {
        (E(_), o.setCamera(n));
        let R = o.U,
          L = _.k(2, 0, 11, bt.lin) * 11;
        ((R.uT.value = _.t),
          (R.uZeta.value = v.zeta),
          (R.uSc.value = v.S),
          (R.uKin.value =
            Math.pow(
              _.k(1, 3.2, 7, (lt) => lt),
              1.8,
            ) * 1.2));
        let k = _.k(2, 0.4, 8, (lt) => kt(lt));
        ((R.uAmb.value = k * k * 0.95),
          (R.uSunI.value = _.k(2, 0.2, 3.2, (lt) => kt(lt)) * 0.72 + 0.28 * _.k(2, 5, 11, (lt) => kt(lt))));
        let P = _.k(2, 0.4, 7.6, (lt) => bt.io3(lt));
        ((R.uTerm.value = K(1.3, -0.9, P) * v.S * 1.05), (R.uTermW.value = v.S * K(0.75, 0.9, P)));
        let C = K(-0.6, -0.25, _.k(2, 2, 12, kt)),
          A = K(0.185, 0.235, _.k(2, 2, 11, bt.out2));
        (R.uSun.value.set(Math.sin(C), Math.sin(A), Math.cos(C)).normalize(),
          (R.uFg.value = _.k(2, 5.5, 9.5, kt)),
          (R.uNight.value = v.rise * (1 - _.k(2, 0.5, 4, kt))),
          (R.uGlowI.value = K(0.0056, 0.003, k)),
          (o.pm.uniforms.uGain.value = K(1, 0.8, k) * K(1, 0.42, kt(Ct((v.zeta - 4) / 5)))),
          (o.pm.uniforms.uEmb.value = kt(Ct((v.zeta - 4) / 5))),
          s.update(_, n, v),
          l.show(_.k(0, 0.2, 2.2, bt.lin), { style: "blur", by: "word", q: _.k(1, 0, 0.9, bt.lin) }));
        let N = _.k(0, 3.1, 4.2, bt.lin),
          G = _.k(1, 2.3, 2.9, bt.lin);
        (M(s.L[0].x * 0.001, s.L[0].y * 0.001, s.L[0].z * 0.001, w),
          (c.x = w.x + K(225, 165, _.k(1, 0, 2.6))),
          (c.y = w.y - 8),
          c.show(N, { style: "blur", q: G }),
          M(s.L[1].x * 0.001, s.L[1].y * 0.001, s.L[1].z * 0.001, w),
          (u.x = w.x + 120),
          (u.y = w.y - 8),
          u.show(_.k(1, 0.9, 1.9, bt.lin), { style: "blur", q: G }),
          f.show(_.k(1, 5, 6.6, bt.lin), { style: "blur", by: "glyph", q: _.k(2, 0, 1.1, bt.lin) }),
          h.show(_.k(2, 7, 9.4, bt.lin), { style: "blur", by: "glyph", q: Ct(_.exit * 5) }));
        let B = _.at(0),
          ot = _.at(1),
          ut = _.at(2);
        (S(0, B, 0.2, () => i.sfx("shimmer", { gain: 0.35 }), _),
          S(1, B, 3.1, () => i.sfx("bell", { gain: 0.4, pan: 0.3 }), _),
          S(
            2,
            ot,
            0.35,
            () => {
              (i.sfx("bell", { gain: 0.5, pitch: 1.12, pan: -0.2 }),
                i.sfx("shimmer", { gain: 0.3, pan: -0.2 }));
            },
            _,
          ),
          S(3, ot, 2.6, () => i.sfx("rise", { gain: 0.6 }), _),
          S(4, ot, 4.2, () => i.sfx("shimmer", { gain: 0.6, pitch: 0.8 }), _),
          S(5, ut, 0.05, () => i.sfx("sub", { gain: 0.7 }), _),
          S(6, ut, 0.6, () => i.sfx("rise", { gain: 0.8, pitch: 0.7 }), _),
          S(
            7,
            ut,
            7,
            () => {
              (i.sfx("bell", { gain: 0.7, pitch: 0.5 }), i.sfx("sub", { gain: 0.8 }));
            },
            _,
          ),
          i.audio.param && i.audio.param("wind", K(0.25, 0.6, v.rise) * (1 - 0.3 * k)));
      },
      render(_, R) {
        let L = Math.abs(R.t - b) > 0.13 || R.t < b;
        ((b = R.t), a.render(_, R, n, v, L), r.render(_));
      },
    };
  },
};

var xh = Math.PI / 180,
  Ua = (i, t) => [
    Math.cos(i * xh) * Math.cos(t * xh),
    Math.sin(i * xh),
    -Math.cos(i * xh) * Math.sin(t * xh),
  ],
  Ir = [
    [20.2, 50, 0, 14],
    [25.6, 28.2, 0.5, 12],
    [18.6, 27, 0.9, 14],
    [27.4, 71, 0.8, 14],
    [31.5, 55, 1.3, 12],
    [6, 45.2, 2, 14],
    [23.6, 43.4, 1.3, 12],
    [21, 57.2, 1.5, 10],
    [29.6, 61.5, 2.4, 12],
    [30.6, 19, 1.7, 12],
    [39, 84, 2, 14],
    [44.5, 64, 1.7, 14],
    [38.6, 37, 2.4, 12],
    [47.5, 31, 2.6, 12],
    [40.5, -2, 2.3, 12],
    [14, 77, 2.7, 12],
    [25, 5, 1.8, 14],
    [13.5, 106, 3, 14],
    [35, 108, 2.4, 14],
    [58, 57, 3.2, 14],
    [58, 15, 3.4, 12],
    [9, 8, 3, 14],
    [-4, 28, 3.2, 14],
    [-23, 22, 2.6, 14],
    [-20, 46.5, 3.7, 12],
    [-25, 131, 2, 16],
    [-2, 113, 4, 14],
    [52, 104, 4, 16],
    [33, -105, 2, 14],
    [42, -85, 3, 14],
    [-9, -55, 3, 16],
    [-34, -66, 3, 14],
    [60, -105, 5, 16],
    [71, -40, 5.4, 14],
    [22, 60, 4.6, 16],
    [9, 66, 4.8, 16],
    [-10, 76, 5.2, 16],
    [-30, 72, 5.6, 16],
    [-14, 58, 5, 16],
    [12, 90, 4.6, 16],
    [-40, 48, 5.6, 16],
    [34, 22, 4.8, 14],
    [0, 2, 5, 16],
    [-24, 4, 5.6, 16],
    [44, -14, 5.2, 16],
    [20, -24, 5.4, 16],
    [72, 60, 5.2, 16],
    [66, 10, 5.4, 16],
    [60, 112, 5, 16],
    [-58, 40, 6, 16],
    [35, -44, 5.6, 16],
    [15, 135, 5.4, 16],
    [5, 110, 5, 16],
    [-50, 100, 6, 16],
    [-26, 108, 5.6, 16],
    [25, -170, 6, 16],
    [-25, -140, 6, 16],
    [0, -115, 6, 16],
    [80, -30, 6, 16],
    [-80, 40, 6, 16],
    [30, 95, 4, 14],
    [62, 36, 4, 14],
    [50, 78, 4.4, 16],
    [-8, 14, 4.2, 14],
    [12, 30, 3.6, 14],
    [-30, 32, 4.4, 14],
  ],
  L0 = Ir.length,
  cb = (i, t) => {
    for (let e = 0; e < L0; e++) {
      let n = (i - Ir[e][2]) / 0.9,
        o = t[e];
      if (n < 0) {
        o.set(0, 0, 0, 0);
        continue;
      }
      let s = 0,
        a = 0,
        r = 1,
        l = 1,
        c = Math.min(Math.floor(n), Ir[e][3]);
      for (let u = 1; u <= c; u++) {
        let f = u < Math.floor(n) ? 1 : Math.min(1, (n - u) / 0.75),
          h = (u + 1) >> 1;
        if (u & 1) {
          let d = (r - s) * f;
          h & 1 ? (r += d) : (s -= d);
        } else {
          let d = (l - a) * f;
          h & 1 ? (l += d) : (a -= d);
        }
      }
      o.set(s, a, r, l);
    }
  },
  MR = Ir.map((i) => Ua(i[0], i[1])),
  SR =
    Fe +
    `
uniform sampler2D tMap,tCloud; uniform vec3 uC,uSun,uMoon; uniform mat3 uGeo; uniform vec2 uShift; uniform float uTan,uAsp,uPx,uD,uFac,uCity,uMoonI,uSunI,uT,uAir,uQ,uFadeFac; uniform vec4 uS[${L0}],uR[${L0}];
const float Hr=.0026,Hm=.0009,TOP=1.05; const vec3 tR=vec3(.052,.118,.275), tO=vec3(.03,.075,.004); const float tM=.03;
float chap(float X,float h,float mu){ float c=sqrt(X+h); if(mu>=0.) return c/(c*mu+1.)*exp(-h); float st=sqrt(max(1.-mu*mu,0.)); float x0=st*(X+h); return 2.*sqrt(x0)*exp(min(X-x0,40.))-c/(1.-c*mu)*exp(-h); }
float ph(float c,float g){ float g2=g*g; return .119366*(1.-g2)*(1.+c*c)/((2.+g2)*pow(max(1.+g2-2.*g*c,1e-4),1.5)); }
// how many halves until this index joins: returns (doubling, how late within it)
vec2 dbl(float i){ float lo=0.,hi=1.; if(i==0.) return vec2(0.); for(int k=1;k<11;k++){ float len=hi-lo; if((k&1)==1){ if(i>=hi&&i<hi+len) return vec2(float(k),(i-hi)/len); if(i<lo||i>=hi+len){} hi+=len; } else { if(i<lo&&i>=lo-len) return vec2(float(k),(lo-1.-i)/len); lo-=len; } } return vec2(12.,0.); }
float I1(float x,float g){ return floor(x)*(1.-2.*g)+clamp(fract(x)-g,0.,1.-2.*g); }
float barf(float x,float w,float g){ w=max(w,1e-3); return clamp((I1(x+w*.5,g)-I1(x-w*.5,g))/w,0.,1.); }
vec2 uvOf(vec3 n){ return vec2(atan(-n.z,n.x)/6.2831853+.5,asin(clamp(n.y,-1.,1.))/3.14159265+.5); }
void main(){
  vec2 cl=vUv*2.-1.; vec3 rd=normalize(vec3((cl.x-uShift.x)*uTan*uAsp,(cl.y-uShift.y)*uTan,-1.));
  float b=dot(rd,uC); vec3 q=uC-rd*b; float q2=dot(q,q), ql=sqrt(q2); float pixA=uPx;
  vec3 col=vec3(0.); float al=0.; 
  if(b<=0.||q2>TOP*TOP){ o=vec4(0.); return; }
  float hh=1.-q2; bool hit=hh>0.; float tn=hit?b-sqrt(hh):b; vec3 P=rd*tn-uC; vec3 n=normalize(P); vec3 ng=uGeo*n; vec3 dx=dFdx(ng),dy=dFdy(ng);
  float dist=length(uC);
  if(hit){
    vec2 uv=uvOf(ng); float cxz=max(dot(ng.xz,ng.xz),1e-4), cl2=sqrt(max(1.-ng.y*ng.y,1e-4));
    vec2 gx=vec2((ng.z*dx.x-ng.x*dx.z)/cxz*.1591549,dx.y/cl2*.3183099), gy=vec2((ng.z*dy.x-ng.x*dy.z)/cxz*.1591549,dy.y/cl2*.3183099);
    vec3 m=textureGrad(tMap,uv,gx,gy).rgb; float land=smoothstep(.35,.65,m.r); float mu=max(dot(n,-rd),0.);
    float foot=length(vec4(gx,gy)); 
    // ---- cloud: a baked sheet sharpened up close with a little live noise
    vec2 cuv=uv+vec2(uT*.00009,0.); vec2 cm=textureGrad(tCloud,cuv,gx,gy).rg; float fine=smoothstep(.0009,.0002,foot); if(fine>0.){ float f=vnoise(ng*260.)*.5+vnoise(ng*610.)*.32+vnoise(ng*1500.)*.18; cm.r=clamp(cm.r+(f-.5)*.55*fine*smoothstep(.02,.3,cm.r),0.,1.); }
    float cd=cm.r; float cloud=smoothstep(.12,.85,cd);
    vec3 dirs=dx/max(length(dx),1e-9);
    // ---- moonlight
    vec3 M=uMoon; float md=max(dot(n,M),0.); vec2 rl=textureGrad(tCloud,uv,gx,gy).ba; float rg=rl.x,terr=rl.y; vec3 ocean=vec3(.0032,.0062,.0125), ground=mix(vec3(.0085,.0095,.0105),vec3(.026,.0235,.021),smoothstep(.25,.75,terr));
    vec2 cs=textureLod(tCloud,cuv+vec2(.0016,.0011),clamp(log2(foot*4096.),0.,6.)).rg; float relief=clamp((cd-cs.r)*3.2,-.6,.9);
    vec3 surf=mix(ocean,ground*(.30+1.25*rg),land);
    vec3 H=normalize(M-rd); float gl=pow(max(dot(n,H),0.),90.)*(1.-land)*.07; 
    vec3 lit=surf*(md*.95+.03)+vec3(.65,.78,1.)*gl*(1.-cloud);
    vec3 cCol=vec3(.105,.125,.16)*(md*(.55+relief*.95)+.03);
    lit=mix(lit,cCol,cloud*.9)*uMoonI;
    // ---- cities: amber, branching, irregular
    float c0=m.g; float grain=1.; float gf=smoothstep(.00022,.00003,foot); if(gf>0.){ vec2 cu=uv*vec2(20480.,10240.); vec2 id=floor(cu); vec2 h2=hash22(id); float pr=length((fract(cu)-.2-.6*h2)); float sp=smoothstep(.34,.06,pr)*pow(hash12(id+7.3),2.2)*6.5; float web=1.-abs(vnoise(ng*420.)*2.-1.); web=pow(web,6.)*.9+pow(1.-abs(vnoise(ng*980.+3.)*2.-1.),7.)*.8; grain=mix(1.,sp*(.35+web*1.5)+web*.55,gf*.9); }
    float ci=pow(c0,1.6)*grain*4.0*smoothstep(.1,.5,m.r+m.b); ci+=pow(textureLod(tMap,uv,clamp(log2(foot*4096.),0.,9.)+2.5).g,1.3)*.3;
    vec3 cc=mix(vec3(1.,.47,.15),vec3(1.,.74,.43),smoothstep(.1,.9,vnoise(ng*60.)+c0*.6));
    float gov=uCity; vec3 city=cc*ci*gov;
    // ---- the order: white 16:9 lights that copy themselves
    vec3 fac=vec3(0.); float facL=0.;
    { int bi=-1; const float W=.0036; vec2 sc=vec2(W,W*.5625); vec2 qq=vec2(0.); vec3 e,nn; float bd=0.; vec4 S,R; float edge=0.;
      for(int i=0;i<${L0};i++){ R=uR[i]; if(R.z<=R.x) continue; S=uS[i]; float d=dot(ng,S.xyz); if(d<.62) continue; e=normalize(cross(vec3(0,1,0),S.xyz)); nn=cross(S.xyz,e); qq=vec2(dot(ng,e),dot(ng,nn))/d/sc; vec2 cd2=max(R.xy-qq,qq-R.zw); edge=max(cd2.x,cd2.y); float mg=min(2.2,.12*(R.z-R.x)); if(edge<mg){ bi=i; bd=d; break; } }
      if(bi>=0&&edge<0.){ vec2 num=vec2(dot(ng,e),dot(ng,nn)); vec2 fx=(vec2(dot(dx,e),dot(dx,nn))*bd-num*dot(dx,S.xyz))/(bd*bd)/sc, fy=(vec2(dot(dy,e),dot(dy,nn))*bd-num*dot(dy,S.xyz))/(bd*bd)/sc; vec2 fw=sqrt(fx*fx+fy*fy)*1.15;
      vec2 id=floor(qq); vec2 kx=dbl(id.x),ky=dbl(id.y); float bx=kx.x<.5?0.:2.*kx.x-1.+.75*kx.y, by=ky.x<.5?0.:2.*ky.x+.75*ky.y; float birth=max(bx,by)*.9;
      vec3 cn=normalize(S.xyz+e*(id.x+.5)*sc.x+nn*(id.y+.5)*sc.y); vec3 cmv=textureLod(tMap,uvOf(cn),0.).rgb; float sea=1.-smoothstep(.3,.6,cmv.r); birth=max(birth+S.w+sea*(.8+1.2*smoothstep(.3,.02,cmv.b)),sea*(12.2+1.6*smoothstep(.45,.0,cmv.b)*(.6+.4*hash12(floor(id/8.)+float(bi)))));
      float on=smoothstep(birth,birth+.28,uD); float fresh=exp(-max(uD-birth,0.)*1.5)*on;
      float g1=.13; float cov=barf(qq.x,fw.x,g1)*barf(qq.y,fw.y,g1*1.2); vec2 q8=qq/8.; cov*=barf(q8.x,fw.x/8.,.05)*barf(q8.y,fw.y/8.,.07); vec2 q32=qq/32.; cov*=barf(q32.x,fw.x/32.,.03)*barf(q32.y,fw.y/32.,.045);
      cov*=smoothstep(0.,max(fw.x,.01),-edge);
      vec2 b8=floor(qq/8.); float pulse=.75+.4*sin(dot(id,vec2(.045,.08))-uT*1.1+float(bi)*1.7);
      float u8=.45+1.05*pow(hash12(b8+float(bi)*7.1),1.6); u8*=.8+.35*sin(uT*(.5+hash12(b8+3.3))+hash12(b8+9.1)*6.28);
      facL=on*(u8*pulse+1.8*fresh); fac=mix(vec3(.50,.70,1.),vec3(.93,.965,1.),smoothstep(.2,.95,facL))*cov*facL*uFac; } }
    // cloud sits over the lights: dims and spreads them
    float spread=textureLod(tMap,uv,clamp(log2(foot*4096.),0.,9.)+4.).g; vec3 up=cc*spread*.5*gov; 
    vec3 emit=(city+fac)*(1.-.8*cloud)+cloud*(up*.8+vec3(.85,.93,1.)*facL*uFac*.2*(.5+.6*cd));
    // ---- storms: slow soft lightning inside the thickest cloud
    if(cm.g>.02){ vec3 ce=floor(ng*26.); float h=hash13(ce); float per=3.5+h*5.; float ph1=fract(uT/per+hash13(ce+9.)); float ev=step(.45,h)*smoothstep(0.,.05,ph1)*exp(-ph1*9.); vec3 cp=(ce+.5+.5*(hash33(ce+3.)-.5))/26.; float dd=length(ng-normalize(cp)); emit+=vec3(.55,.66,1.)*ev*(exp(-dd*dd*16000.)+.35*exp(-dd*dd*5200.))*cm.g*(.2+cd)*1.1; }
    col=lit+emit; 
    // ---- sunlit side (thin crescent at most)
    float sm=dot(n,uSun); if(sm>-.2){ float se=1./(Hr*.9); float od=chap(1./Hr,0.,sm); vec3 T=exp(-(tR+vec3(tM)+tO)*min(od,60.)); vec3 alb=mix(mix(vec3(.01,.03,.07),vec3(.16,.13,.09),land),vec3(.8),cloud); col+=alb*T*max(sm,0.)*uSunI*.16; }
    al=1.;
  }
  // ---- atmosphere: single scattering where the sun still reaches it
  { float tb=sqrt(max(TOP*TOP-q2,0.)); float t0=max(b-tb,0.), t1=hit?tn:b+tb; float cs=dot(rd,uSun); float maxmu=max(dot(normalize(rd*t0-uC),uSun),dot(normalize(rd*t1-uC),uSun)); vec3 mid=normalize(rd*mix(t0,t1,.5)-uC); maxmu=max(maxmu,dot(mid,uSun));
    vec3 ins=vec3(0.); float odR=0.,odM=0.; float N=mix(9.,15.,uQ); if(maxmu>-.5&&uSunI>0.){ float dt=(t1-t0)/N; float j=hash12(gl_FragCoord.xy); for(float i=0.;i<N;i++){ float t=t0+(i+.5)*dt; vec3 p=rd*t-uC; float r=length(p); float h=max(r-1.,0.); float dr=exp(-h/Hr),dm=exp(-h/Hm); float oR=dr*dt/Hr,oM=dm*dt/Hm; odR+=oR*.5; odM+=oM*.5; float mu=dot(p,uSun)/r; float rm=mu<0.?r*sqrt(max(1.-mu*mu,0.)):2.; float sh=smoothstep(.994,1.004,rm); if(sh>0.){ float cR=min(chap(1./Hr,h/Hr,mu),60.),cM=min(chap(1./Hm,h/Hm,mu),80.); vec3 T=exp(-tR*(cR+odR)-vec3(tM)*(cM+odM)-tO*min(chap(1./(Hr*2.2),h/(Hr*2.2),mu),40.)); ins+=sh*T*(tR*oR*.0596831*(1.+cs*cs)+vec3(tM)*oM*ph(cs,.8)*.9); } odR+=oR*.5; odM+=oM*.5; } }
    col+=ins*uSunI;
    // extinction toward the horizon softens the surface
    float X=1./Hr; float hq=ql-1.; float vod=hit?chap(X,0.,max(dot(n,-rd),0.)):2.*sqrt(1.5708*X)*exp(-max(hq,0.)/Hr)*.55; vec3 ext=exp(-(tR+tM)*min(vod,14.)*.8); if(hit) col=mix(col,col*ext,1.); else al=1.-dot(ext,vec3(.333));
    // a little blue of its own: moonlit air, plus the glow of what is below
    float air=1.-exp(-min(vod,40.)*.09); col+=vec3(.010,.017,.034)*air*uMoonI*.8*uAir; col+=vec3(.6,.72,.95)*air*uFadeFac*.16;
    // airglow: a thin green shell with a rust hem
    { float A=1.0165; float below=ql<A?1./sqrt(A*A-q2+.0011):0.; float edge=exp(-pow((ql-A)/.0016,2.)); float v=.75+.4*vnoise(vec2(atan(q.y,q.x)*4.,uT*.03)); float lim=hit?smoothstep(.965,1.,ql):1.; float sh=(below*.0021*lim+edge*.034)*v; col+=(vec3(.34,.62,.36)*sh+vec3(.42,.20,.09)*exp(-pow((ql-1.0075)/.0035,2.))*.016*lim)*uAir; }
  }
  o=vec4(max(col,0.),al);
}`,
  ER =
    Fe +
    `
uniform vec3 uCy[6];
void main(){ float lo=(vUv.x-.5)*6.2831853, la=(vUv.y-.5)*3.14159265; vec3 n=vec3(cos(la)*cos(lo),sin(la),-cos(la)*sin(lo)); vec3 p=n; float eye=1.,cyc=0.;
 for(int i=0;i<6;i++){ vec3 c=uCy[i]; float d=acos(clamp(dot(n,c),-1.,1.)); float k=exp(-d*d*(i<2?260.:120.)); float a=k*3.2*sign(c.y); p=p*cos(a)+cross(c,p)*sin(a)+c*dot(c,p)*(1.-cos(a)); cyc=max(cyc,exp(-d*d*(i<2?420.:210.))); eye*=1.-.85*exp(-d*d*26000.); }
 vec3 w=vec3(fbm(p*3.1+1.),fbm(p*3.1+7.),fbm(p*3.1+13.))-.5; vec3 r=p*vec3(1.,1.7,1.)+w*.55; 
 float big=fbm(r*2.6+4.); float mid=fbm(r*9.+w*2.); float fin=fbm(r*31.); float cell=1.-abs(vnoise(r*58.)*2.-1.);
 float band=.5+.5*cos(la*6.)*.4+.25*exp(-pow((la-.07)*7.,2.))-.34*exp(-pow((abs(la)-.42)*5.,2.)); 
 float c=big*.62+mid*.34+fin*.2-.555+band*.13; c+=cyc*.2*(.4+mid); c=smoothstep(.0,.36,c+.02); c*=.55+.6*fin; c+=smoothstep(.5,.75,big)*cell*.12; c*=eye;
 float st=smoothstep(.5,.62,big+cyc*.2)*smoothstep(.5,.62,mid+cyc*.1)*smoothstep(.95,.5,abs(la)); float terr=fbm(n*17.); float rg=0.,ra=.5; { vec3 rp=n*34.+terr*1.5; for(int i=0;i<6;i++){ float v=1.-abs(vnoise(rp)*2.-1.); rg+=ra*v*v; rp=rp*2.13+3.7; ra*=.55; } } o=vec4(clamp(c,0.,1.),clamp(st*1.4,0.,1.),rg,terr); }`,
  _R = `precision highp float; in vec2 position; in vec4 iA,iB; uniform mat3 uView; uniform vec3 uC; uniform vec2 uShift; uniform float uTan,uAsp,uT,uOn,uPxH,uWid; out float vA; out float vS; out float vU;
vec3 pos(float u){ vec3 a=normalize(iA.xyz); vec3 k=normalize(cross(a,vec3(sin(iB.y*6.28),cos(iB.y*6.28),.3))); float dr=.07*pow(u,2.8)*(.2+iB.z), h=.12*u*(1.15-.15*u)*(.55+.8*iB.w); return (a*cos(dr)+k*sin(dr))*(1.+h); }
vec2 proj(vec3 v){ return vec2(v.x/(-v.z*uTan*uAsp)+uShift.x,v.y/(-v.z*uTan)+uShift.y); }
void main(){ float per=9.+iB.x*11.; float ph=fract(uT/per+iA.w); float live=step(iB.w*.999,uOn); float head=min(ph*1.5,1.); float s=position.x; float u=head*s; vec3 v=uView*pos(u)+uC, v2=uView*pos(u+.012)+uC; vec2 a=proj(v),b=proj(v2); vec2 d=(b-a)*vec2(uAsp,1.); d=d/max(length(d),1e-6); vec2 nn=vec2(-d.y,d.x)/vec2(uAsp,1.); float w=uWid*(.75+.9*(1.-s)*ph)/uPxH*2.; gl_Position=vec4(a+nn*position.y*w,0.,1.);
 vec3 rd=normalize(v); float bb=dot(rd,uC); vec3 q=uC-rd*bb; float occ=(dot(q,q)<.9995&&length(v)>bb)?0.:1.; vA=live*occ*smoothstep(0.,.03,ph)*smoothstep(1.,.62,ph)*step(.0,-v.z); vS=s; vU=position.y; }`,
  TR =
    "precision highp float; in float vA,vS,vU; out vec4 o; uniform float uGain; void main(){ float e=exp(-vU*vU*2.6); float h=exp(-(1.-vS)*34.); float tail=pow(vS,1.6)*.13+.012; vec3 c=mix(vec3(.62,.74,1.),vec3(1.,.95,.88),h)*(tail+h*2.4)*e*vA*uGain; o=vec4(c,0.); }";

function ub(i) {
  let { gfx: t } = i,
    e = null,
    n = {
      tMap: null,
      tCloud: null,
      uC: new F(0, 0, -3),
      uSun: new F(0, 0, -1),
      uMoon: new F(-0.5, 0.5, 0.7).normalize(),
      uGeo: new Se(),
      uShift: new Nt(),
      uTan: 0.3,
      uAsp: 1.78,
      uPx: 0,
      uD: 0,
      uFac: 2,
      uCity: 1,
      uMoonI: 1,
      uSunI: 20,
      uT: 0,
      uAir: 1,
      uQ: 1,
      uFadeFac: 0,
      uR: { value: Ir.map(() => new ie()) },
      uS: { value: Ir.map((c, u) => new ie(...MR[u], c[2])) },
    },
    o = null,
    s = null,
    a = {
      uView: { value: new Se() },
      uC: { value: n.uC },
      uShift: { value: n.uShift },
      uTan: { value: 0.3 },
      uAsp: { value: 1.78 },
      uT: { value: 0 },
      uOn: { value: 0 },
      uPxH: { value: 1080 },
      uWid: { value: 1.6 },
      uGain: { value: 1 },
    },
    r = new In(),
    l = new ge();
  return {
    u: n,
    tu: a,
    async init() {
      ((e = await new ba().loadAsync(i.asset("selectall-earth.jpg"))),
        (e.colorSpace = Mn),
        (e.wrapS = an),
        (e.generateMipmaps = !0),
        (e.minFilter = Pn),
        (e.anisotropy = 8),
        (e.needsUpdate = !0),
        t.r.initTexture(e));
      let c = t.target({ w: 4096, h: 2048, type: $e, mips: !0, wrap: an });
      c.texture.anisotropy = 4;
      let u = [Ua(14, 63), Ua(17, 89), Ua(-16, 58), Ua(19, 128), Ua(40, -30), Ua(51, 24)].map(
          (y) => new F(...y),
        ),
        f = t.pass(ER, { uCy: { value: u } });
      (f.render(c),
        f.dispose(),
        (o = t.pass(SR, n, { transparent: !0, blending: Ie })),
        Object.assign(o.material, { blendSrc: pe, blendDst: je, blendSrcAlpha: pe, blendDstAlpha: je }),
        (o.u.tMap.value = e),
        (o.u.tCloud.value = c.texture),
        (this.pass = o));
      let h = 40,
        d = 44,
        p = ze(11),
        x = new Oe(),
        v = [],
        m = [];
      for (let y = 0; y <= d; y++) v.push(y / d, -1, y / d, 1);
      for (let y = 0; y < d; y++) m.push(y * 2, y * 2 + 1, y * 2 + 2, y * 2 + 1, y * 2 + 3, y * 2 + 2);
      let g = [],
        b = [];
      for (let y = 0; y < h; y++) {
        let S = Math.floor(p() * 26),
          M = Ir[S],
          w = Ua(M[0] + (p() - 0.5) * 7, M[1] + (p() - 0.5) * 9);
        (g.push(...w, p()), b.push(p(), p(), p(), p()));
      }
      (x.setAttribute("position", new $t(new Float32Array(v), 2)),
        x.setIndex(m),
        x.setAttribute("iA", new Ue(new Float32Array(g), 4)),
        x.setAttribute("iB", new Ue(new Float32Array(b), 4)),
        (x.instanceCount = h),
        (x.boundingSphere = new Be(new F(), 1e6)),
        (s = new Zt(
          x,
          new ce({
            vertexShader: _R,
            fragmentShader: TR,
            glslVersion: re,
            uniforms: a,
            transparent: !0,
            depthTest: !1,
            depthWrite: !1,
            side: oe,
            blending: Ie,
            blendSrc: pe,
            blendDst: pe,
          }),
        )),
        (s.frustumCulled = !1),
        l.add(s));
    },
    render(c, u) {
      let f = o.u;
      for (let h in n)
        h !== "uS" &&
          h !== "uR" &&
          h !== "tMap" &&
          h !== "tCloud" &&
          !(n[h] && n[h].isVector3) &&
          typeof n[h] == "number" &&
          (f[h].value = n[h]);
      (o.render(c),
        u &&
          ((a.uTan.value = n.uTan),
          (a.uAsp.value = n.uAsp),
          (a.uT.value = n.uT),
          (a.uPxH.value = c.height),
          t.r.render(l, r)));
    },
  };
}

var AR =
    Bn +
    `
float tv(vec2 p,float per,float sd){ vec2 i=floor(p),f=fract(p); f=f*f*f*(f*(f*6.-15.)+10.); vec2 a=mod(i,per),b=mod(i+1.,per); return mix(mix(hash12(a+sd),hash12(vec2(b.x,a.y)+sd),f.x),mix(hash12(vec2(a.x,b.y)+sd),hash12(b+sd),f.x),f.y); }
float tf(vec2 u,float per,float sd){ float a=.5,s=0.; for(int k=0;k<6;k++){ s+=a*tv(u*per,per,sd+float(k)*13.1); per*=2.; a*=.5; } return s; }
void main(){ o=vec4(tf(vUv,6.,1.),tf(vUv,10.,41.),tf(vUv,7.,77.),tf(vUv,24.,133.)); }`,
  RR =
    Fe +
    `
uniform sampler2D tN; uniform vec2 uSc; uniform float uSr,uAsp,uTan,uT,uGain,uStar,uCor,uYaw,uWhite,uMw; uniform vec2 uStarShift;
vec3 stars(vec2 p){ vec3 s=vec3(0.); for(int l=0;l<2;l++){ float sc=15.+31.*float(l); vec2 g=p*sc+float(l)*17.3; vec2 id=floor(g); float h=hash12(id); if(h>.66){ vec2 f=fract(g); vec2 c=.15+.7*hash22(id+3.1); float d=length(f-c)/sc; float b=pow(hash12(id+8.7),10.)*1.1+.012; float px=uTan*2./uRes.y; float r=px*(.75+.5*b); s+=mix(vec3(1.,.8,.62),vec3(.68,.8,1.),hash12(id+5.5))*b*exp(-d*d/(r*r))*.8; } } return s; }
float ridge(float x){ x=1.-abs(x*2.-1.); return x*x; }
void main(){
  vec2 cl=vUv*2.-1.; vec2 a=vec2(cl.x*uAsp,cl.y); vec3 c=vec3(0.);
  if(uStar>0.){ vec2 sp=a*uTan+uStarShift; c+=stars(sp)*uStar; float band=exp(-pow((sp.y*.8+sp.x*.5-.2)*2.4,2.)); if(band>.02){ float mw=texture(tN,sp*vec2(.9,1.2)).r*.65+texture(tN,sp*2.7+.3).g*.35; c+=(vec3(.006,.0068,.009)*smoothstep(.34,.8,mw)+vec3(.0015,.002,.003))*band*uStar; } }
  if(uSr>0.){ vec2 p=(a-uSc)/uSr; float r=length(p); float px=2./uRes.y/uSr; vec3 S=vec3(0.); float cover=0.;
    if(r<1.+px*2.){ cover=smoothstep(1.+px,1.-px,r); float mu=sqrt(max(1.-r*r,0.)); vec3 n=vec3(p,mu); float an=uYaw+uT*.006,cy=cos(an),sy=sin(an); n=vec3(n.x*cy+n.z*sy,n.y,n.z*cy-n.x*sy);
      float T=uT*.06; vec3 w=vec3(vnoise(n*6.+T),vnoise(n*6.+31.-T),vnoise(n*6.+57.+T))-.5; 
      float big=vnoise(n*2.3+w*.4)*.6+vnoise(n*5.1+w*.8)*.4; float net=ridge(vnoise(n*17.+w*1.6+T*.6)); 
      float lod=smoothstep(.02,.006,px); float g1=vnoise(n*62.+w*3.+T*3.), g2=vnoise(n*128.+w*4.-T*4.); float gran=mix(.5,g1*.5+g2*.5,lod); float spk=ridge(vnoise(n*vec3(40.,40.,40.)+w*9.+T*2.));
      // sunspots: pairs, umbra and combed penumbra, in two bands
      float spot=0.,plg=0.; for(int i=0;i<7;i++){ float fi=float(i); float lo=fi*.83+.9*sin(fi*2.3)+.2, la=(mod(fi,2.)<.5?1.:-1.)*(.16+.26*hash11(fi+3.)); float sz=.5+.75*hash11(fi+11.); vec3 sc=normalize(vec3(cos(la)*sin(lo),sin(la),cos(la)*cos(lo))); vec3 dv=n-sc; if(dot(dv,dv)<.06){ float d=length(dv*vec3(1.,1.35,1.))/sz+(g1-.5)*.02+(spk-.5)*.012; spot=max(spot,smoothstep(.040,.026,d)*.5+smoothstep(.022,.014,d)*.5); vec3 c2=normalize(sc+vec3(.07,.012,0.)*sz); float d2=length(n-c2)/sz+(g1-.5)*.022; spot=max(spot,smoothstep(.016,.009,d2)*.75); vec3 c3=normalize(sc+vec3(.045,-.028,0.)*sz); spot=max(spot,smoothstep(.011,.006,length(n-c3)/sz)*.6); plg=max(plg,exp(-dot(dv,dv)/(sz*sz)*40.)*sz); } }
      float v=.05+.38*gran+.22*net+.20*spk+.75*(big-.45); v+=smoothstep(.56,.75,big)*spk*.35; v+=plg*(.12+1.1*pow(ridge(vnoise(n*26.+w*5.)),1.5)); v*=1.-.88*spot;
      float limb=.10+.90*pow(max(mu,0.),.72); vec3 cold=vec3(.22,.018,.0015), mid=vec3(1.05,.235,.022), hot=vec3(2.6,1.35,.42);
      vec3 k=mix(cold,mid,smoothstep(.08,.58,v)); k=mix(k,hot,smoothstep(.48,1.2,v)); S=k*limb*mix(vec3(1.,.66,.45),vec3(1.),pow(max(mu,0.),.5)); S+=vec3(1.5,.42,.07)*(pow(1.-mu,9.)*.9); S*=1.12; }
    vec3 out_=vec3(0.); if(r>.985&&uCor>0.){ float ang=atan(p.y,p.x); float h=max(r-1.,0.); float au=ang*.1591549; float near=smoothstep(.5,.3,h);
      if(near>0.){ float spic=textureLod(tN,vec2(au*9.,h*3.-uT*.03),0.).a; out_+=vec3(1.5,.32,.06)*exp(-h*(52.+90.*spic))*.9;
      // prominences: nested loops anchored on the limb, and hanging curtains
      float pr=0.; for(int i=0;i<5;i++){ float fi=float(i); float a0=fi*1.31+.7*sin(fi*3.7)+.35; float wd=.045+.12*hash11(fi+2.), ht=.05+.15*hash11(fi+5.); float da=mod(ang-a0+3.14159265,6.2831853)-3.14159265; if(abs(da)<wd*1.9&&h<ht*1.6){ vec4 tn=textureLod(tN,vec2(au*3.,h*1.6-uT*.005+fi*.17),0.); vec4 t2=textureLod(tN,vec2(au*11.,h*4.-uT*.014),0.); vec2 q=vec2(da/wd,h/ht)+(tn.rg-.5)*.7+(t2.rg-.5)*.2; q.x+=q.y*.5*sin(fi*7.); float ln=length(q), al=atan(q.y,q.x); float st=textureLod(tN,vec2(al*.16-uT*.006*(mod(fi,2.)<.5?1.:-1.),ln*1.5+fi*.23),0.).b; st=pow(ridge(st),2.2); float st3=ridge(textureLod(tN,vec2(al*.4-uT*.012,ln*4.+fi*.7),0.).a); float env=exp(-pow((ln-.78)/.26,2.)); float foot=.55+.45*exp(-q.y*q.y*3.); pr+=env*(st*1.5+st3*st3*.6+.10)*foot*smoothstep(0.,.5,tn.b+.12); float lg=.5+.5*textureLod(tN,vec2(au*26.,h*2.-uT*.02),0.).b; pr+=exp(-abs(q.x)*3.)*smoothstep(1.2,.1,q.y)*lg*lg*.18; } }
      out_+=vec3(1.9,.40,.09)*pr*.75*smoothstep(1.-px,1.+.006,r)*near; }
      // corona
      float st=textureLod(tN,vec2(au+.13,r*.035-uT*.0012),0.).r; float st2=textureLod(tN,vec2(au*2.+.4,r*.09-uT*.003),0.).g; float ray=textureLod(tN,vec2(au*5.,r*.03-uT*.001),0.).b; float k=smoothstep(.34,.66,st)*1.25+.10; 
      float inner=exp(-h*6.5)*.62+exp(-h*2.2)*.10, outer=.115/pow(r,2.3)*k*(.55+.55*st2+.45*ray); out_+=(vec3(1.,.74,.48)*inner*(.7+.6*st2)+vec3(.95,.86,.76)*outer)*uCor; }
    S=mix(S,vec3(1.,.90,.74)*dot(S,vec3(.6,.5,.1))*1.7,uWhite);
    c=mix(c*(1.-smoothstep(3.,1.,r)*.9)+out_*uGain,S*uGain,cover); }
  o=vec4(c,1.);
}`;

function fb({ gfx: i }) {
  let t = i.target({ w: 512, h: 512, type: $e, wrap: an, mips: !0 }),
    e = {
      tN: t.texture,
      uSc: new Nt(),
      uSr: 0,
      uAsp: 1.78,
      uTan: 0.3,
      uT: 0,
      uGain: 1,
      uStar: 1,
      uCor: 1,
      uYaw: 0,
      uWhite: 0,
      uMw: 1,
      uStarShift: new Nt(),
    },
    n = i.pass(RR, e);
  return {
    u: n.u,
    init() {
      let o = i.pass(AR);
      (o.render(t), o.dispose());
    },
    render: (o) => n.render(o),
  };
}

var Cs = [1.62, 1.86, 2.16],
  z0 = 368,
  Co = z0 / 16,
  yh = 34,
  gh = [
    [0.3, 0],
    [-0.42, 1.9],
    [0.16, 3.6],
  ],
  hb = [0.03, -0.022, 0.017],
  CR = [0.3, 0.32, 0.3],
  PR = (i) =>
    Math.max(
      1,
      Math.round((Ve * Math.cos(((i + 0.5) / Co) * Math.PI - Math.PI / 2)) / (((Math.PI / Co) * 16) / 9)),
    );

function db() {
  let i = ze(5),
    t = new Float32Array(yh * Co * 3 * 4),
    e = [];
  for (let o = 0; o < Co; o++) e.push(PR(o));
  for (let o = 0; o < 3; o++)
    for (let s = 0; s < Co; s++)
      for (let a = 0; a < yh; a++) {
        let r = ((o * Co + s) * yh + a) * 4,
          l = i() < CR[o],
          c = Math.abs((s + 0.5) / Co - 0.5) * 2,
          u = a / e[s],
          f = (0.45 * c + 0.55 * (0.5 + 0.5 * Math.sin(u * Ve + o * 2))) * 0.8 + i() * 0.2;
        ((t[r] = l ? 9 : 0.42 + 0.16 * o + f * 0.26), (t[r + 1] = e[s]), (t[r + 2] = i()), (t[r + 3] = 1));
      }
  let n = new Tn(t, yh, Co * 3, Un, An);
  return ((n.minFilter = n.magFilter = Je), (n.needsUpdate = !0), { tex: n, data: t, cols: e });
}

var Kv = `
uniform sampler2D tTab; uniform mat3 uSh[3]; uniform float uA; uniform vec4 uSlit;
float slit(vec3 d){ return smoothstep(uSlit.w*1.25,uSlit.w*.75,abs(dot(d,uSlit.xyz))); }
float gate(vec3 d,int s,float soft){ vec3 q=uSh[s]*d; float la=asin(clamp(q.y,-1.,1.))/3.14159265+.5, lo=atan(q.z,q.x)/6.2831853+.5; float y=la*${Co}.; int r=int(clamp(floor(y),0.,${Co - 1}.)); vec4 t=texelFetch(tTab,ivec2(0,s*${Co}+r),0); float x=lo*t.g; int c=int(min(floor(x),t.g-1.)); t=texelFetch(tTab,ivec2(c,s*${Co}+r),0); float open=smoothstep(uA-.05,uA+.05,t.r); vec2 f=vec2(fract(x),fract(y)); vec2 e=smoothstep(vec2(0.),vec2(soft),f)*smoothstep(vec2(1.),vec2(1.-soft),f); float k=e.x*e.y; return mix(.0,1.,open)*mix(k,1.,smoothstep(.75,.25,uA)); }
`,
  LR = `precision highp float; precision highp int; precision highp sampler2D; in vec4 aH,aI; uniform mat4 uV,uP; uniform mat3 uShI[3]; uniform vec3 uCam; uniform vec2 uRes; uniform float uT,uPass,uSheet,uSunR2,uGlint,uPxS; uniform vec2 uSunS; uniform vec4 uCalm; ${Kv}
flat out vec3 vC; flat out vec4 vM; flat out vec3 vHalf; out float vAl;
vec3 dirOf(float la,float lo){ return vec3(cos(la)*cos(lo),sin(la),cos(la)*sin(lo)); }
void main(){ int s=int(aI.x+.5); float la0=aH.x, lo0=aH.y, tA=aH.z, rnd=aH.w; float lag=aI.y, lat=aI.z, pl=aI.w; float R=s==0?${Cs[0]}:s==1?${Cs[1]}:${Cs[2]};
 float flight=.46; float u=clamp((uA-(tA-flight)-lag*.075)/flight,0.,1.); if(u<=0.){ gl_Position=vec4(9.,9.,9.,1.); gl_PointSize=0.; return; } float w=1.-u; float far=w*w*(.4+.6*w);
 float Rp=9.+5.*fract(pl*3.7); float r=R*pow(Rp/R,far)+.5*far*(1.-far)*lat*.05; float lp=pl*6.2831853+.9*float(s); float tw0=2.7*(1.-far); float h=smoothstep(.42,1.,u); h=h*h*(1.6-.6*h); float dl=mod(lo0-lp-2.7,6.2831853)+.6*step(mod(lo0-lp-2.7,6.2831853),.6)*0.; float lo=lp+tw0+dl*h; float hl=smoothstep(.5,1.,u); float la=la0*hl+lat*.0046*(1.-hl)+.02*(1.-hl)*sin(tw0*3.+pl*9.);
 vec3 q=dirOf(la,lo)*r; vec3 p=uShI[s]*q; vec3 n=uShI[s]*dirOf(la,lo); vec3 ee=uShI[s]*vec3(-sin(lo),0.,cos(lo)); vec3 nn=cross(ee,n);
 // sheets roll slowly as they fly, and settle square to the Sun
 float tw=w*(1.25*sin(uT*.42+tw0*2.6+pl*5.+lat*.05)+.5*sin(rnd*6.28+uT*.6)+1.2*far); float ct=cos(tw),st=sin(tw); vec3 nz=normalize(n*ct+ee*st), ex=normalize(ee*ct-n*st); float sl=dot(n,uSlit.xyz); float lv=smoothstep(uSlit.w*1.9+.0001,uSlit.w*.7,abs(sl))*step(.0005,uSlit.w); vec3 ax=normalize(cross(uSlit.xyz,n)); float la2=lv*1.45*sign(sl+1e-5); float c2=cos(la2),s2=sin(la2); nz=nz*c2+cross(ax,nz)*s2+ax*dot(ax,nz)*(1.-c2); ex=ex*c2+cross(ax,ex)*s2+ax*dot(ax,ex)*(1.-c2); nn=nn*c2+cross(ax,nn)*s2+ax*dot(ax,nn)*(1.-c2); 
 float hs=uSheet*R*(1.+.25*w*step(.5,rnd)); ex*=hs*1.7778*.5; vec3 ey=-nn*hs*.5; 
 vec3 vd=uCam-p; float D=length(vd); vd/=D; float side=dot(p,normalize(uCam)); bool near=side>0.; if((uPass<.5)==near){ gl_Position=vec4(9.,9.,9.,1.); gl_PointSize=0.; return; }
 vec4 vp=uV*vec4(p,1.); if(vp.z>-.15){ gl_Position=vec4(9.,9.,9.,1.); gl_PointSize=0.; return; } gl_Position=uP*vp; float k=uPxS/(-vp.z); vec3 vx=mat3(uV)*ex, vy=mat3(uV)*ey; vec2 a=(vx.xy-vp.xy/vp.z*vx.z)*k, b=(vy.xy-vp.xy/vp.z*vy.z)*k; 
 float L=length(abs(a)+abs(b)); float la_=max(length(a),.001), lb_=max(length(b),.001); float grow=1.; float al=1.; float mn=min(la_,lb_); 
 // inverse basis, in pixels
 float det=a.x*b.y-a.y*b.x; float mdet=.16; if(abs(det)<mdet*max(la_,1.)){ al*=abs(det)/(mdet*max(la_,1.)); vec2 pp=normalize(vec2(-a.y,a.x))*mdet*max(la_,1.)/max(la_,.6); b+=pp*(dot(b,pp)<0.?-1.:1.); det=a.x*b.y-a.y*b.x; }
 gl_PointSize=min(ceil(2.*max(abs(a.x)+abs(b.x),abs(a.y)+abs(b.y))+1.6),500.); vM=vec4(b.y,-b.x,-a.y,a.x)/det; vHalf=vec3(gl_PointSize*.5,la_,abs(det)/la_);
 // light: the face toward the Sun blazes, the other is dark and gives off its heat
 float facing=dot(nz,vd); vec3 sd=normalize(p); float shade=1.; float rr=dot(p,p); if(s>0) shade*=mix(1.,gate(sd,0,.25),step(${Cs[0]}+.02,r)); if(s>1) shade*=mix(1.,gate(sd,1,.25),step(${Cs[1]}+.02,r)); shade=max(max(shade,.015),slit(sd));
 float inc=abs(dot(nz,sd)); float I=(4.6+4.*u*step(.999,u)*0.)/pow(rr,.8)*shade*inc*(.72+.4*rnd); bool lit=facing*dot(nz,sd)<0.; vec3 warm=mix(vec3(1.,.86,.66),vec3(1.,.95,.88),clamp(rr*.02,0.,1.)); 
 float heat=(s==0?.9:s==1?.34:.13)*(.6+.4*rnd)*(.25+.75*u); vec3 outc=(vec3(.17,.019,.0035)*heat+warm*I*.008)*(.2+.8*abs(facing)); vec3 c=lit?warm*I*(.45+.55*abs(facing)):outc; 
 vec3 hv=reflect(-sd,nz); float gl=pow(max(dot(normalize(hv),vd),0.),40.)*w; c+=warm*gl*5.*uGlint*shade; 
 { vec2 nd=gl_Position.xy/gl_Position.w; vec2 cd=(nd-uCalm.xy)/uCalm.zw; float cal=exp(-dot(cd*cd,cd*cd)); c*=1.-.86*cal; }
 vC=c; vAl=al*(1.-.93*smoothstep(.5,.95,lv))*smoothstep(0.,.08,u)*smoothstep(.15,.9,-vp.z);
 if(!near){ vec2 sc=gl_Position.xy/gl_Position.w*uRes*.5-uSunS; vAl*=smoothstep(uSunR2-1.,uSunR2+1.,length(sc)); } }`,
  zR =
    "precision highp float; flat in vec3 vC; flat in vec4 vM; flat in vec3 vHalf; in float vAl; out vec4 o; void main(){ vec2 d=(gl_PointCoord*2.-1.)*vHalf.x; d.y=-d.y; vec2 q=vec2(vM.x*d.x+vM.y*d.y,vM.z*d.x+vM.w*d.y); vec2 cov=clamp((1.-abs(q))*vHalf.yz+.5,0.,1.); float a=cov.x*cov.y*vAl; if(a<.004) discard; o=vec4(vC*a,a); }";

function pb(i, t) {
  let { gfx: e } = i,
    n = [],
    o = [],
    s = [0],
    a = ze(21),
    r = [0.07, 0.41, 0.72];
  for (let g = 0; g < 3; g++) {
    for (let b = 0; b < z0; b++) {
      let y = Math.floor(b / 16),
        S = t.cols[y] * 16,
        M = ((b + 0.5) / z0) * Math.PI - Math.PI / 2;
      for (let w = 0; w < S; w++) {
        let E = Math.floor(w / 16),
          T = ((g * Co + y) * yh + E) * 4,
          _ = t.data[T];
        if (_ > 2) continue;
        let R = t.data[T + 2];
        (n.push(M, ((w + 0.5) / S) * Ve - Math.PI, _, a()),
          o.push(
            g,
            (w % 16) / 16 + (Math.abs((b % 16) - 7.5) / 8) * 0.25,
            (b % 16) - 7.5 + (Math.floor(((R * 13) % 1) * 3) - 1) * 19,
            r[Math.floor(R * 2.999)],
          ));
      }
    }
    s.push(n.length / 4);
  }
  let l = n.length / 4,
    c = new Qt();
  (c.setAttribute("aH", new $t(new Float32Array(n), 4)),
    c.setAttribute("aI", new $t(new Float32Array(o), 4)),
    c.setAttribute("position", c.getAttribute("aH")),
    (c.boundingSphere = new Be(new F(), 1e6)));
  let u = {
      tTab: { value: t.tex },
      uSh: { value: [new Se(), new Se(), new Se()] },
      uShI: { value: [new Se(), new Se(), new Se()] },
      uA: { value: 0 },
      uV: { value: new ne() },
      uP: { value: new ne() },
      uCam: { value: new F() },
      uRes: { value: new Nt() },
      uT: { value: 0 },
      uPass: { value: 0 },
      uSheet: { value: (Math.PI / z0) * 0.97 },
      uSunS: { value: new Nt() },
      uSunR2: { value: 1 },
      uGlint: { value: 1 },
      uPxS: { value: 1 },
      uSlit: { value: new ie(0, 1, 0, 0) },
      uCalm: { value: new ie(-9, 0, 1, 1) },
    },
    f = new ce({
      vertexShader: LR,
      fragmentShader: zR,
      glslVersion: re,
      uniforms: u,
      transparent: !0,
      depthTest: !1,
      depthWrite: !1,
      blending: Ie,
      blendSrc: pe,
      blendDst: je,
      blendSrcAlpha: pe,
      blendDstAlpha: je,
    }),
    h = new Zi(c, f);
  h.frustumCulled = !1;
  let d = new ge();
  d.add(h);
  let p = new In(),
    x = new Cn(),
    v = new ne(),
    m = new ne();
  return {
    U: u,
    N: l,
    starts: s,
    spin(g) {
      for (let b = 0; b < 3; b++)
        (x.set(gh[b][0] + 0.05 * Math.sin(g * 0.05 + b * 2), gh[b][1] + g * hb[b], 0, "YXZ"),
          x.set(0, 0, 0),
          v.makeRotationFromEuler(
            x.set(gh[b][0] + 0.06 * Math.sin(g * 0.06 + b * 2), gh[b][1], 0.5 * gh[b][0], "YXZ"),
          ),
          m.makeRotationY(g * hb[b]),
          v.multiply(m),
          u.uShI.value[b].setFromMatrix4(v),
          u.uSh.value[b].copy(u.uShI.value[b]).transpose());
    },
    draw(g, b) {
      ((u.uPass.value = b), u.uRes.value.set(g.width, g.height), e.r.setRenderTarget(g));
      let y = b < 0.5 ? [2, 1, 0] : [0, 1, 2];
      for (let S of y) (c.setDrawRange(s[S], s[S + 1] - s[S]), e.r.render(d, p));
    },
  };
}

var mb = `
vec2 octE(vec3 d){ d/=abs(d.x)+abs(d.y)+abs(d.z); vec2 p=d.y>=0.?d.xz:(1.-abs(d.zx))*vec2(d.x>=0.?1.:-1.,d.z>=0.?1.:-1.); return p*.5+.5; }
vec3 octD(vec2 u){ u=u*2.-1.; vec3 d=vec3(u.x,1.-abs(u.x)-abs(u.y),u.y); if(d.y<0.) d.xz=(1.-abs(d.zx))*vec2(d.x>=0.?1.:-1.,d.z>=0.?1.:-1.); return normalize(d); }`,
  vb = "fract(52.9829189*fract(dot(gl_FragCoord.xy,vec2(.06711056,.00583715))))";

function xb({ gfx: i }, t, e) {
  let n = i.target({ scale: 0.5 }),
    o = i.target({ scale: 0.5 }),
    s = i.target({ scale: 0.25 }),
    a = i.target({ scale: 0.25 }),
    r = i.target({ w: 384, h: 384, type: $e, mips: !0 }),
    l = { tTab: t.U.tTab, uSh: t.U.uSh, uA: t.U.uA, uSlit: t.U.uSlit },
    c = i.pass(
      Kv +
        mb +
        "void main(){ vec3 d=octD(vUv); o=vec4(gate(d,0,.10)*gate(d,1,.10)*gate(d,2,.10),gate(d,0,.12),gate(d,0,.12)*gate(d,1,.12),1.); }",
      l,
    ),
    u = i.pass(
      mb +
        `
uniform sampler2D tMap,tN; uniform vec4 uSlit; uniform vec3 uCam; uniform mat3 uCamM; uniform vec2 uShift; uniform float uTan,uAsp,uQ,uI,uT,uA;
void main(){ vec2 cl=vUv*2.-1.; vec3 rd=normalize(uCamM*vec3((cl.x-uShift.x)*uTan*uAsp,(cl.y-uShift.y)*uTan,-1.)); vec3 ro=uCam; const float RV=8.5; float b=-dot(ro,rd); vec3 q=ro+rd*b; float q2=dot(q,q); if(q2>RV*RV||uI<=0.){ o=vec4(0.); return; }
 float h=sqrt(RV*RV-q2); float t0=max(b-h,0.),t1=b+h; float Ro=${(Cs[2] + 0.04).toFixed(3)}; float closed=smoothstep(.45,.95,uA); float D=sqrt(q2)+1e-3; float th0=atan(t0-b,D), th1=atan(t1-b,D); float tS=-1.; if(q2<Ro*Ro) tS=b-sqrt(Ro*Ro-q2);
 int N=int(mix(14.,28.,uQ)); float j=${vb}; float L=0.; float sw=step(.0005,uSlit.w);
 for(int i=0;i<N;i++){ float th=mix(th0,th1,(float(i)+j)/float(N)); float t=b+D*tan(th); vec3 p=ro+rd*t; float r=length(p); if(r<1.02) break; float inside=1.-smoothstep(Ro-.05,Ro+.05,r); float behind=tS>0.&&t>tS?closed*.97:0.; vec3 d=p/r; vec3 m=textureLod(tMap,octE(d),clamp(log2(r*.42),0.,2.)).rgb; float T=r>${Cs[2].toFixed(2)}?m.r:r>${Cs[1].toFixed(2)}?m.b:r>${Cs[0].toFixed(2)}?m.g:1.; T*=mix(1.,.10,inside); T=max(T,smoothstep(uSlit.w*1.3,uSlit.w*.6,abs(dot(d,uSlit.xyz)))*.5*sw*mix(1.,.8,inside));
  vec2 k=vec2(uT*.0016,uT*.0011); float dust=.12+2.9*textureLod(tN,p.xz*.10+k+p.y*.04,0.).r*textureLod(tN,p.yx*.21-k,0.).g; float ph=.6+.9*pow(max(dot(rd,d)*.5+.5,0.),3.); L+=T*dust*ph*(1.-behind)*smoothstep(RV,RV*.45,r); }
 o=vec4(vec3(1.,.87,.71)*L*(th1-th0)/(D*float(N))*uI,1.); }`,
      {
        tMap: r.texture,
        tN: e,
        uSlit: t.U.uSlit,
        uA: t.U.uA,
        uCam: t.U.uCam,
        uCamM: new Se(),
        uShift: new Nt(),
        uTan: 0.3,
        uAsp: 1.78,
        uQ: 1,
        uI: 0,
        uT: 0,
      },
    ),
    f = i.pass(
      "uniform sampler2D tA; uniform vec2 uD; void main(){ vec3 c=texture(tA,vUv).rgb*.29; c+=(texture(tA,vUv+uD*1.4).rgb+texture(tA,vUv-uD*1.4).rgb)*.235; c+=(texture(tA,vUv+uD*3.3).rgb+texture(tA,vUv-uD*3.3).rgb)*.12; o=vec4(c,1.); }",
      { tA: null, uD: new Nt() },
    ),
    h = i.pass(
      `uniform sampler2D tA; uniform vec2 uS; uniform float uLen,uPre,uK; void main(){ vec2 d=(uS-vUv)*uLen; float j=uPre>.5?${vb}:.5; vec3 s=vec3(0.); float w=0.; for(int i=0;i<14;i++){ float f=(float(i)+j)/14.; vec3 c=texture(tA,vUv+d*f).rgb; if(uPre>.5){ c=mix(c,vec3(1.,.88,.74)*dot(c,vec3(.4,.4,.2)),.65); c=max(c-.5,0.); c/=1.+.25*max(c.r,max(c.g,c.b)); } float k=1.-.75*f; s+=c*k; w+=k; } o=vec4(s/w*uK,1.); }`,
      { tA: null, uS: new Nt(), uLen: 0.5, uPre: 1, uK: 1 },
    ),
    d = i.pass(
      "uniform sampler2D tA,tB; uniform float uVa,uRa; void main(){ o=vec4(texture(tA,vUv).rgb*uVa+texture(tB,vUv).rgb*uRa,0.); }",
      { tA: null, tB: null, uVa: 1, uRa: 1 },
      { transparent: !0, blending: Ie },
    );
  return (
    Object.assign(d.material, { blendSrc: pe, blendDst: pe, blendSrcAlpha: pe, blendDstAlpha: pe }),
    {
      vol: u,
      render(p, x) {
        (c.render(r),
          u.render(n),
          (f.u.tA.value = n.texture),
          f.u.uD.value.set(1 / n.width, 0),
          f.render(o),
          (f.u.tA.value = o.texture),
          f.u.uD.value.set(0, 1 / n.height),
          f.render(n),
          (h.u.tA.value = p.texture),
          h.u.uS.value.set(x.sx, x.sy),
          (h.u.uLen.value = 0.62),
          (h.u.uPre.value = 1),
          (h.u.uK.value = 1),
          h.render(s),
          (h.u.tA.value = s.texture),
          (h.u.uLen.value = 0.055),
          (h.u.uPre.value = 0),
          h.render(a),
          (d.u.tA.value = n.texture),
          (d.u.tB.value = a.texture),
          (d.u.uVa.value = x.vols),
          (d.u.uRa.value = x.rays),
          d.render(p));
      },
    }
  );
}

// ── scene selectall · "Select all" · enterWith: daybreak ──
var _c = 0.268,
  jv = Math.PI / 180,
  I0 = 540 / _c,
  gb = (i, t) => (Math.exp(t * i) - 1) / (Math.exp(t) - 1),
  yb = {
    id: "selectall",
    title: "全选",
    enterWith: "daybreak",
    hud: { color: "#ffffff", font: "monoMed" },
    beats: [
      { dur: 6, delay: 3.1, hold: 3, page: "3.5 \xD7 10^52" },
      { dur: 7, hold: 2.5, page: "10^80" },
      { dur: 12, hold: 6, page: "\u221E" },
    ],
    notes: [
      "到目前为止，它只是在编辑屏幕。然后它有了手：机器人、工厂、造工厂的工厂。农业经济大约每一千年翻一番，我们的经济大约每二十年翻一番。",
      "一旦机器能造机器，翻倍时间就掉到一年，再掉到一个月。这不是什么新的物理定律，只是任何复制过程在不受阻挡时都会发生的事。这一段是我的推测，不是已发表的预测。",
      "而且空间大得惊人。我们整个文明用掉的一切，大约只是太阳输出的二十万亿分之一。所以：全选。",
    ],
    create(i) {
      let { gfx: t, view: e } = i,
        n = t.target({}),
        o = ub(i),
        s = fb(i),
        a = db(),
        r = pb(i, a),
        l = xb(i, r, s.u.tN.value),
        c = i.overlay(),
        u = i.text("然后它有了手。", { x: 118, y: 150, size: 100, valign: "middle" }),
        f = i.text(
          "农业经济每一千年翻一番。\n我们的经济，每二十年。",
          { x: 118, y: 150, size: 58, valign: "middle", leading: 1.45 },
        ),
        h = i.text("然后每一年。", { x: 110, y: 486, size: 76, valign: "middle" }),
        d = i.text("每一个月。", { x: 110, y: 592, size: 76, valign: "middle" }),
        p = i.text("示意图", {
          x: 114,
          y: 676,
          size: 28,
          font: "text",
          color: "#b9b2a4",
          valign: "middle",
        }),
        x = i.text(
          "我们只用了\n太阳输出的\n二十万亿分之一。",
          { x: 110, y: 540, size: 74, valign: "middle", leading: 1.3 },
        ),
        v = i.text("全选。", { x: 108, y: 668, size: 112, valign: "middle" }),
        m = new i.SelectBox({ handle: 10, line: 2.6 });
      c.add(u, f, h, d, p, x, v, m);
      let g = new F(),
        b = new F(),
        y = new F(),
        S = new F(),
        M = new F(),
        w = new F(),
        E = new F(),
        T = new F(),
        _ = new Se(),
        R = new Se(),
        L = new In(),
        k = Array.from({ length: 48 }, () => new F()),
        P = new fn(),
        C = new ne(),
        A = {
          D: 0,
          RE: 370,
          RS: 0,
          ex: 1395,
          ey: 540,
          sx: 1395,
          sy: 540,
          showEarth: !0,
          showSun: !1,
          A: 0,
          tanE: _c,
          Ds: 8,
          exposure: 1,
        },
        N = {},
        G = (H, Y, q, st, ct, V) => {
          let ft = N[Y];
          ((N[Y] = q), ft !== void 0 && ft < st && q >= st && H.dt > 0 && H.dir >= 0 && i.sfx(ct, V));
        },
        B = o.u,
        ot = s.u,
        ut = r.U,
        lt = l.vol.u;
      function Z(H, Y, q, st, ct = 0.1, V = 2e3) {
        let ft = (Y * e.h) / 1080,
          nt = t.aspect,
          Mt = H.projectionMatrix;
        return (
          Mt.set(
            1 / (ft * nt),
            0,
            -q,
            0,
            0,
            1 / ft,
            -st,
            0,
            0,
            0,
            -(V + ct) / (V - ct),
            (-2 * V * ct) / (V - ct),
            0,
            0,
            -1,
            0,
          ),
          H.projectionMatrixInverse.copy(Mt).invert(),
          ft
        );
      }
      return {
        async init() {
          (s.init(),
            await o.init(),
            s.render(n),
            r.draw(n, 0),
            r.draw(n, 1),
            l.render(n, { sx: 0.5, sy: 0.5, rays: 0, vols: 0 }),
            o.render(n, !0));
        },
        enter() {
          for (let H in N) delete N[H];
          A.h1 = A.h2 = void 0;
        },
        update(H) {
          let Y = H.t,
            q = H.mouse.x,
            st = H.mouse.y;
          {
            let Re = 1 - Math.exp(-Math.max(0, H.since(1) - 7) / 12),
              Ne = 1 - Math.exp(-H.since(2) / 40),
              Ge = H.dt > 0 ? Mr(2.5, H.dt) : 1;
            ((A.h1 = A.h1 === void 0 ? Re : A.h1 + (Re - A.h1) * Ge),
              (A.h2 = A.h2 === void 0 ? Ne : A.h2 + (Ne - A.h2) * Ge));
          }
          let ct = H.at(0),
            V = H.at(1),
            ft = H.at(2),
            nt =
              3.2 * kt(Te(0.1, 1.9, ct)) +
              5.8 * gb(Te(1.2, 6, ct), 0.8) +
              3.2 * (1 - Math.exp(-Math.max(0, H.since(0) - 8.4) / 32)) * (1 - H.p[1]),
            Mt =
              K(nt, 17.6, gb(Te(0.2, 6.8, V), 1)) + 1.4 * A.h1 * H.p[1] * (1 - H.p[2]) + 5 * Te(0, 2.4, ft);
          A.D = Mt;
          let Et = H.k(1, 0, 3, bt.io3),
            at = H.k(2, 0, 4.1, (Re) => Fn(Re)),
            rt = bt.out3(Ct(Y / 14)),
            U = K(1.5, 1.565, rt) + 0.01 * Math.sin(Y * 0.13),
            j = K(0.4, _c, Et),
            J = Math.asin(1 / U),
            Pt = Math.atan(K(0.16, 0.2, rt) * 0.4) + st * 0.012,
            $ = J - Pt,
            tt = -0.13 + 0.015 * Math.sin(Y * 0.09);
          g.set(Math.sin($) * Math.sin(tt) + q * 0.02, -Math.sin($) * Math.cos(tt), -Math.cos($)).normalize();
          let D = Math.exp(K(Math.log(U), Math.log(5.53), Et));
          (b.set(q * 0, 0, -1), g.lerp(b, kt(Et)).normalize());
          let z = I0 / Math.sqrt(D * D - 1),
            pt = -1.4 * Fn(Te(0, 1.75, ft)) - 0.3 * kt(Te(1.35, 2.75, ft)) - 2.95 * Fn(Te(2.3, 4.2, ft)),
            ht = ft > 0 ? Math.sqrt(1 + (I0 / (z * Math.exp(pt))) ** 2) : D,
            gt = Fn(Te(2.1, 4.2, ft));
          B.uC.copy(g).multiplyScalar(ht);
          let dt = bt.io3(Te(4.6, 9.5, ft)),
            Kt =
              Math.exp(K(K(Math.log(81), Math.log(330), Fn(Te(2.2, 4.5, ft))), Math.log(222), dt)) *
              (1 + 0.045 * A.h2);
          A.RS = Kt;
          let Ot = K(1385, 1352, gt),
            Ut = 540;
          ((A.sx = Ot + q * 6), (A.sy = Ut + st * 4));
          let O = K(1385 + 4 * kt(Te(0.5, 1.6, ft)), Ot - Kt * 0.47, gt),
            I = K(540 + 5 * kt(Te(0.5, 1.6, ft)), Ut + Kt * 0.33, gt),
            et = j,
            [Tt, vt] = e.toClip(O + q * 14 * Et, I + st * 8 * Et),
            zt = Tt * kt(Et),
            Ft = vt * kt(Et),
            wt = Z(L, et, zt, Ft);
          ((A.RE = I0 / Math.sqrt(ht * ht - 1)),
            (A.ex = O),
            (A.ey = I),
            B.uShift.set(zt, Ft),
            (B.uTan = wt),
            (B.uAsp = t.aspect),
            (B.uPx = (2 * wt) / t.H),
            (B.uT = Y),
            (B.uQ = H.q),
            (o.tu.uC.value = B.uC),
            (o.tu.uShift.value = B.uShift));
          let Dt = -0.3 * H.k(1, 3.7, 5.6, bt.io3) * (1 - H.k(2, 0.2, 2.2)),
            it = 34 * (1 - Math.exp(-Y / 110)),
            Rt = K(4, 17, Et) * jv,
            xt = (K(47, 52, Et) - it) * jv;
          (M.copy(B.uC).multiplyScalar(-1 / ht),
            S.set(0, 1, 0).addScaledVector(M, -M.y).normalize(),
            y.crossVectors(S, M).normalize());
          let Wt = Math.cos(Dt),
            Xt = Math.sin(Dt),
            Vt = y.x * Wt - S.x * Xt,
            Q = y.y * Wt - S.y * Xt,
            Lt = y.z * Wt - S.z * Xt,
            yt = S.x * Wt + y.x * Xt,
            It = S.y * Wt + y.y * Xt,
            St = S.z * Wt + y.z * Xt;
          (T.set(Math.cos(Rt) * Math.cos(xt), Math.sin(Rt), -Math.cos(Rt) * Math.sin(xt)),
            w.set(-Math.sin(xt), 0, -Math.cos(xt)),
            E.set(-Math.sin(Rt) * Math.cos(xt), Math.cos(Rt), Math.sin(Rt) * Math.sin(xt)),
            _.set(w.x, E.x, T.x, w.y, E.y, T.y, w.z, E.z, T.z),
            R.set(Vt, Q, Lt, yt, It, St, M.x, M.y, M.z),
            B.uGeo.copy(_).multiply(R),
            o.tu.uView.value.copy(B.uGeo).transpose());
          let _t = K(K(143.5, 163, Et), 180, H.k(2, 0, 1.6, bt.io3)) * jv,
            Yt = K(1.02, 0.62, Et);
          (B.uSun
            .copy(M)
            .multiplyScalar(Math.cos(_t))
            .addScaledVector(y, Math.sin(_t) * Math.cos(Yt))
            .addScaledVector(S, Math.sin(_t) * Math.sin(Yt))
            .normalize(),
            B.uMoon
              .copy(M)
              .multiplyScalar(0.55)
              .addScaledVector(y, -0.72)
              .addScaledVector(S, 0.42)
              .normalize());
          let jt = Te(8, 19, Mt);
          ((B.uD = Mt),
            cb(Mt, B.uR.value),
            (B.uFac = K(2.5, 3, kt(jt)) * K(1, 0.006, kt(Te(0.7, 2, ft)))),
            (B.uCity = (1 - 0.55 * kt(Te(9, 18, Mt))) * (1 - kt(Te(1, 2.2, ft)))),
            (B.uFadeFac = kt(Te(10, 22, Mt)) * 0.8 * (1 - kt(Te(1, 2.2, ft)))),
            (B.uMoonI = K(2.1, 1.7, Et) * (1 - kt(Te(0.8, 2.2, ft)))),
            (B.uSunI = K(K(38, 24, Et), 9, at)),
            (B.uAir = K(1, 0.5, Et) * (1 - at)),
            (o.tu.uOn.value = kt(Te(2.6, 14, Mt)) * 0.8),
            (o.tu.uWid.value = K(2, 1.15, Et)),
            (o.tu.uGain.value = K(1.15, 0.8, Et) * (1 - at)),
            (A.showEarth = A.RE > 0.6),
            (A.k1 = Et),
            (A.k2 = at),
            (A.showSun = ft > 0));
          let le = Math.sqrt(1 + (I0 / Kt) ** 2);
          A.Ds = le;
          let [ye, Jt] = e.toClip(A.sx, A.sy);
          ((A.cx = ye), (A.cy = Jt));
          let te = t.aspect;
          (ot.uSc.value.set(ye * te, Jt),
            (ot.uSr.value = A.showSun ? (Kt / e.h) * 2 : 0),
            (ot.uAsp.value = te),
            (ot.uTan.value = (K(0.4, _c, Et) * e.h) / 1080),
            (ot.uT.value = Y),
            (ot.uYaw.value = 0.25),
            ot.uStarShift.value.set(Y * 9e-4 + q * 0.006, st * 0.004 + K(0, 0.05, Et)));
          let se = Te(4.7, 12, ft);
          A.A = se;
          let ee = kt(Te(1.3, 2.7, ft));
          ((ot.uStar.value = K(1, 0.12, ee) + 0.25 * kt(Te(0.75, 1, se))),
            (ot.uGain.value = K(5.5, 1.15, kt(Te(1.9, 3.3, ft))) * K(1, 2.6, kt(Te(0.45, 0.95, se)))),
            (ot.uCor.value = K(0.55, 0.9, ee) * K(1, 0.12, kt(Te(0.5, 0.95, se)))));
          let me = 0.5 + 0.1 * Math.sin(Y * 0.031) + 0.16 * A.h2 + q * 0.05,
            be = K(0.04, 0.3, bt.io3(Te(5, 11, ft))) + st * 0.03 + 0.02 * Math.sin(Y * 0.05);
          (P.position.set(
            Math.sin(me) * Math.cos(be) * le,
            Math.sin(be) * le,
            Math.cos(me) * Math.cos(be) * le,
          ),
            P.up.set(Math.sin(-0.12), Math.cos(-0.12), 0),
            C.lookAt(P.position, y.set(0, 0, 0), P.up),
            C.setPosition(P.position),
            ut.uV.value.copy(C).invert());
          let Ae = (_c * e.h) / 1080;
          (Z({ projectionMatrix: ut.uP.value, projectionMatrixInverse: IR }, _c, ye, Jt, 0.05, 200),
            ut.uCam.value.copy(P.position),
            (ut.uA.value = se),
            (ut.uT.value = Y),
            (ut.uPxS.value = (t.H * 0.5) / Ae),
            ut.uSunS.value.set(ye * t.W * 0.5, Jt * t.H * 0.5),
            (ut.uSunR2.value = Kt * e.ppu * (t.H / (e.h * e.ppu))));
          {
            let [Re, Ne] = e.toClip(470, 668);
            (ut.uCalm.value.set(Re, Ne, (600 / e.w) * 2, (220 / e.h) * 2),
              H.p[2] <= 0 && (ut.uCalm.value.x = -9));
          }
          ((ot.uWhite.value = kt(Te(0.5, 0.95, se)) * 0.8), r.spin(Y + 40));
          {
            let Re = me - q * 0.05,
              Ne = be - st * 0.03,
              Ge = Math.cos(Ne);
            (M.set(Math.sin(Re) * Ge, Math.sin(Ne), Math.cos(Re) * Ge),
              y.crossVectors(P.up, M).normalize(),
              S.crossVectors(M, y));
            let yn = 0.1 + 0.035 * Math.sin(Y * 0.083),
              si = 0.016 * Math.sin(Y * 0.17 + 1),
              gi = kt(Te(0.78, 1, se));
            (S.multiplyScalar(Math.cos(yn))
              .addScaledVector(y, Math.sin(yn))
              .addScaledVector(M, si)
              .normalize(),
              ut.uSlit.value.set(S.x, S.y, S.z, gi * (0.0205 + 0.005 * Math.sin(Y * 0.23))));
          }
          (lt.uCamM.value.setFromMatrix4(C),
            lt.uShift.value.set(ye, Jt),
            (lt.uTan.value = Ae),
            (lt.uAsp.value = te),
            (lt.uQ.value = H.q),
            (lt.uT.value = Y),
            (lt.uI.value = K(0, 1, kt(Te(0.05, 0.5, se))) * K(0.035, 1, kt(Te(0.58, 1, se)))));
          let ln = H.k(0, 3.5, 4.2, bt.lin);
          (u.show(H.k(0, 0.1, 1.3, bt.lin), { style: "rise", by: "word", q: Math.max(ln, 0) }),
            f.show(H.k(0, 4, 5.6, bt.lin), {
              style: "rise",
              by: "line",
              q: H.k(1, 0, 0.6, bt.lin),
              stagger: 0.45,
            }));
          let mn = H.k(2, 0, 0.7, bt.lin);
          (h.show(H.k(1, 1.3, 2.3, bt.lin), { by: "word", q: mn }),
            d.show(H.k(1, 4.4, 5.4, bt.lin), { by: "word", q: mn }),
            p.show(H.k(1, 5.2, 6.2, bt.lin), { style: "fade", q: mn }),
            x.show(H.k(2, 2.3, 3.5, bt.lin), { by: "line", q: H.k(2, 5, 5.6, bt.lin) }),
            v.show(H.k(2, 5.9, 6.8, bt.lin), { by: "word" }));
          let un = H.k(1, 2.5, 3.1, bt.lin);
          if (un > 0) {
            let Re = Math.acos(1 / ht);
            for (let Ht = 0; Ht < 48; Ht++) {
              let Bt = (Ht / 48) * Math.PI * 2,
                ue = 1 / ht,
                Me = Math.sin(Re);
              (k[Ht].copy(B.uC).addScaledVector(M, ue).addScaledVector(NR, 0),
                (k[Ht].x += Math.cos(Bt) * Me),
                (k[Ht].y += Math.sin(Bt) * Me));
            }
            let Ne = i.rectOf(k, L, e),
              Ge = 20 * K(1, 0.55, at);
            ((Ne.x -= Ge), (Ne.y -= Ge), (Ne.w += Ge * 2), (Ne.h += Ge * 2));
            let yn = H.k(2, 4.8, 5.9, bt.io4),
              si = H.k(2, 6.2, 8.8, bt.io3),
              gi = Kt * K(1.16, 1.86, si),
              no = K(Ne.x, A.sx - gi, yn),
              as = K(Ne.y, A.sy - gi, yn),
              Ls = K(Ne.w, gi * 2, yn),
              X = K(Ne.h, gi * 2, yn);
            (m.set(no, as, Ls, X, Dt), m.appear(un));
            let At = H.k(1, 3.4, 3.7) * (1 - H.k(1, 5.6, 6)),
              qt = un >= 1 ? 1 : null;
            (un >= 1 &&
              ((qt = K(1, 0.62, at)),
              (qt = K(qt, 2.3, yn) + 0.28 * At),
              m.size(qt),
              (m.mat.uniforms.uLine.value = K(2.6, 3.4, yn))),
              m.alpha(Math.min(1, un * 3) * (1 - H.k(2, 8.2, 9.6))));
          } else m.alpha(0);
          for (let Re = 1; Re <= 7; Re++)
            G(H, "d" + Re, Mt, Re, "shimmer", {
              gain: 0.14 + 0.03 * Re,
              pitch: 0.7 + Re * 0.09,
              pan: ((Re * 37) % 10) / 10 - 0.5,
            });
          for (let Re = 9; Re <= 18; Re += 1.5)
            G(H, "e" + Re, Mt, Re, "shimmer", { gain: 0.3, pitch: 1.2 + (Re - 9) * 0.06 });
          (G(H, "r0", ct, 2.4, "rise", { gain: 0.4 }),
            G(H, "b1", V, 2.5, "select", {}),
            G(H, "r1", V, 3.7, "rise", { gain: 0.7, pitch: 1.1 }),
            G(H, "p2", ft, 0.15, "sub", { gain: 0.9 }),
            G(H, "m2", ft, 1.75, "boom", { gain: 0.5 }),
            G(H, "s2", ft, 6, "select", { pitch: 0.7 }),
            G(H, "h2", ft, 6.8, "shimmer", { gain: 0.5, pitch: 0.8 }),
            G(H, "r2", ft, 7.2, "rise", { gain: 0.6, pitch: 0.7 }),
            G(H, "c2", ft, 11.2, "boom", { gain: 0.45, pitch: 0.7 }),
            H.dt > 0 && i.audio.param("tension", Ct(0.15 + 0.25 * H.p[0] + 0.3 * H.p[1] + 0.3 * H.p[2])));
        },
        render(H, Y) {
          (s.render(n),
            A.showSun && A.A > 0 && r.draw(n, 0),
            A.showSun && A.A > 0 && r.draw(n, 1),
            A.showSun &&
              A.A > 0.02 &&
              l.render(n, {
                sx: A.cx * 0.5 + 0.5,
                sy: A.cy * 0.5 + 0.5,
                rays: K(0.15, 0.85, kt(Te(0.3, 0.9, A.A))),
                vols: 1,
              }),
            A.showEarth && o.render(n, A.k2 < 0.5 && A.D > 1.5));
          let q = A.A;
          (t.post(n, H, {
            exposure: 1,
            bloom: K(K(0.75, 0.2, kt(Te(1.6, 2.6, Y.at(2)))), 0.8, kt(Te(0.35, 0.85, q))),
            threshold: K(0.7, 1.15, kt(Te(0.8, 2.4, Y.at(2)))),
            radius: 0.85,
            tone: "aces",
            contrast: 1.07,
            saturation: 1.08,
            vignette: 0.22,
            grain: 0.03,
            halation: 0.5,
            time: Y.t,
          }),
            c.render(H));
        },
      };
    },
  },
  IR = new ne(),
  NR = new F();

var FR = { x0: -6, x1: 14, y0: -1.45, y1: 2.05, z0: -2.1, z1: 2.4 },
  N0 = new F(-0.46, 0.36, 1).normalize(),
  $v =
    Bn +
    `
float vn2(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash12(i),hash12(i+vec2(1,0)),f.x),mix(hash12(i+vec2(0,1)),hash12(i+vec2(1,1)),f.x),f.y);}
float fb2(vec2 p){return vn2(p)*.5+vn2(p*2.03+7.1)*.25+vn2(p*4.1+3.7)*.125+vn2(p*8.3+1.9)*.0625;}
`,
  Zv = `
uniform float uTime; uniform vec3 uSun; uniform float uGlow;
const float ZW=2.4; const vec3 SUNC=vec3(1.,.74,.45)*11.; const vec3 SKYC=vec3(.86,.88,.92)*.62; const vec3 SHOJ=vec3(1.,.86,.66);
float arch(vec2 q,float b){ float cx=mod(q.x+.35,2.3)-1.15; float w=.64; float Yc=.92; float d=q.y>Yc?length(vec2(cx,q.y-Yc))-w:abs(cx)-w; return smoothstep(b,-b,d)*smoothstep(-.62-b,-.62+b,q.y); }
float bars(vec2 q,float b){ float cx=mod(q.x+.35,2.3)-1.15; float a=smoothstep(.012-b,.012+b,abs(cx)); float by=mod(q.y+.62,.515)-.2575; by=.2575-abs(by); a*=smoothstep(.01-b,.01+b,by); return mix(1.,a,clamp(.03/b,0.,1.)); }
float gobo(vec2 q){ vec2 w=vec2(sin(uTime*.5+q.y*.7),cos(uTime*.43+q.x*.5))*.07; float n=vn2(q*1.35+w+3.)*.62+vn2(q*3.4+w*2.)*.38; return mix(.22,1.,smoothstep(.36,.6,n)); }
float win(vec3 p){ float t=(ZW-p.z)/uSun.z; if(t<0.) return 0.; vec2 q=p.xy+uSun.xy*t; float b=.006+.008*t; return arch(q,b)*bars(q,b)*gobo(q)*step(-6.2,q.x)*step(q.x,14.); }
float ao(vec3 p){ float a=1.; a*=.45+.55*smoothstep(0.,.9,p.y+1.45); a*=.5+.5*smoothstep(0.,.8,2.05-p.y); a*=.5+.5*smoothstep(0.,.7,p.z+2.1); a*=.6+.4*smoothstep(0.,.5,ZW-p.z); return a; }
vec3 amb(vec3 p,vec3 n){ float dz=ZW-p.z; float row=.75+.25*cos((p.x+.35-1.15)*2.732)*exp(-dz*.55); vec3 c=SKYC*(.12+.88*max(0.,.5+.5*n.z)*row/(1.+dz*.42));
 float dx=max(14.-p.x,0.); c+=SHOJ*max(0.,.45+.55*n.x)*1.25/(1.+dx*dx*.16); c+=vec3(1.,.66,.4)*(max(0.,.4-.6*n.z)*.16*exp(-max(p.z+2.1,0.)*.5)+max(0.,.35-.65*n.y)*.14); return c*smoothstep(-9.,3.,p.x); }
vec3 light(vec3 p,vec3 n){ return amb(p,n)*ao(p)+SUNC*max(dot(n,uSun),0.)*win(p+n*.004); }
vec3 sheetCol(vec2 yz,float fw){ float r=length(yz); vec3 c=vec3(.93,.92,.89); float k=0.; for(int i=1;i<=5;i++) k=max(k,smoothstep(fw*1.1+.0016,.0016,abs(r-float(i)*.08))); c=mix(c,vec3(.10,.105,.115),k*.86); c=mix(c,vec3(.62,.40,.14),smoothstep(fw+.026,.026,r)); return c; }
vec3 skyOut(vec3 d){ float h=clamp(d.y*2.2+.1,0.,1.); vec3 c=mix(vec3(1.25,.98,.7),vec3(.62,.68,.76),h); return c*mix(3.2,5.2,smoothstep(-.3,.9,d.x)); }
// cheap radiance of the room along a ray, for the floor's reflection
vec3 roomRay(vec3 o,vec3 d,float rough){ float tx=d.x>0.?(14.-o.x)/d.x:(-6.-o.x)/d.x; float tz=d.z>0.?(2.4-o.z)/d.z:(-2.1-o.z)/d.z; float ty=(2.05-o.y)/max(d.y,1e-3); float t=min(tx,min(tz,ty)); vec3 p=o+d*t; vec3 c,sc=vec3(0.); float sm=0.;
 float ts=(10.-o.x)/d.x; if(d.x>0.&&ts>0.&&ts<t){ vec3 s=o+d*ts; float b=.02+rough*ts; sm=smoothstep(b,-b,abs(s.z)-.8)*smoothstep(b,-b,abs(s.y)-.45); if(sm>.0) sc=vec3(.9,.88,.84)*(amb(s,vec3(-1,0,0))+SUNC*.4*uSun.x*-1.*win(s)+.12); }
 if(t==tz&&d.z>0.){ float a=arch(p.xy,.03+rough*t*.5); c=mix(vec3(.10,.09,.08),skyOut(d),a); }
 else if(t==tx&&d.x>0.){ float b=.02+rough*t*.4; float gz=abs(mod(p.z+.06,.92)-.46); float gy=abs(mod(p.y+.375,1.15)-.575); float l=smoothstep(.46-.02-b,.46-.02+b,gz); l=max(l,smoothstep(.575-.02-b,.575-.02+b,gy)); c=SHOJ*uGlow*(.55+.3*smoothstep(-1.,1.,p.y)+.9*exp(-dot(p.zy-vec2(.35,.25),p.zy-vec2(.35,.25))*.55))*(1.-l*.6/(1.+b*8.)); if(p.y<-.95) c*=.15; }
 else if(t==tz){ c=vec3(.42,.39,.34)*(amb(p,vec3(0,0,1))*ao(p)+SUNC*uSun.z*win(p)); }
 else { c=vec3(.06,.05,.045); }
 return mix(c,sc,sm); }
`,
  bb =
    "precision highp float; in vec3 position,normal; uniform mat4 modelMatrix,viewMatrix,projectionMatrix; uniform mat3 normalMatrix; out vec3 vP,vN,vO; void main(){ vec4 w=modelMatrix*vec4(position,1.); vP=w.xyz; vO=position; vN=normalize(mat3(modelMatrix)*normal); gl_Position=projectionMatrix*viewMatrix*w; }",
  kR =
    "precision highp float; precision highp int; in vec3 vP,vN,vO; out vec4 o; uniform vec3 uCam;" + $v + Zv;

function wb(i, t) {
  let e = new ge(),
    n = { uTime: { value: 0 }, uSun: { value: N0 }, uGlow: { value: 1.9 }, uCam: { value: new F() } },
    o = ($, tt = {}, W = bb, D = {}) =>
      new ce({
        glslVersion: re,
        vertexShader: W,
        fragmentShader: kR + $,
        uniforms: { ...n, ...tt },
        side: oe,
        ...D,
      }),
    s = ($, tt) => {
      let W = new Zt($, tt);
      return (e.add(W), W);
    },
    a = ($, tt, W = 1, D = 1) => new Ke($, tt, W, D),
    { x0: r, x1: l, y0: c, y1: u, z0: f, z1: h } = FR,
    d = l - r,
    p = u - c,
    x = h - f,
    v = (r + l) / 2,
    m = (c + u) / 2,
    g = (f + h) / 2,
    b = s(
      a(d, x),
      o(`
   void main(){ vec3 n=vec3(0,1,0); float w=.125; float row=floor((vP.z+10.)/w); float off=hash11(row)*3.; float L=2.4; float id=floor((vP.x+off)/L); float h=hash12(vec2(row,id)); vec2 fz=vec2(fract((vP.z+10.)/w),fract((vP.x+off)/L));
    float fw=fwidth(vP.z)/w; float fx=fwidth(vP.x)/L; float seam=1.-smoothstep(.0,.025+fw,min(fz.x,1.-fz.x))*smoothstep(0.,.0015+fx,min(fz.y,1.-fz.y)); seam*=clamp(.35/fw,0.,1.);
    float g=fb2(vec2(vP.x*1.6+h*31.,vP.z*34.+h*9.)); float g2=vn2(vec2(vP.x*9.+h*17.,vP.z*150.)); vec3 alb=mix(vec3(.17,.105,.06),vec3(.36,.235,.135),g*.8+.25*g2*clamp(.1/fw,0.,1.))*(.72+.5*h); alb*=1.-seam*.75;
    vec3 c=alb*light(vP,n); vec3 V=normalize(uCam-vP); float bump=(vn2(vec2(vP.x*2.3,vP.z*5.))-.5)*.010+(h-.5)*.005; vec3 nn=normalize(vec3(bump,1.,(vn2(vP.xz*vec2(1.3,9.)+4.)-.5)*.03+(hash12(vec2(row,id)+3.)-.5)*.009)); vec3 R=reflect(-V,nn); R.y=abs(R.y); float f=.045+.62*pow(1.-max(dot(nn,V),0.),4.2); f*=1.-seam*.6; f*=.7+.3*g; vec3 R2=normalize(R+vec3((hash12(gl_FragCoord.xy+uTime)-.5)*.05,0.,0.)*0.+vec3(0.,0.,.0)); c+=roomRay(vP+vec3(0,.002,0),R2,.09)*f;
    o=vec4(c,1.); }`),
    );
  ((b.rotation.x = -Math.PI / 2), b.position.set(v, c, g));
  let y = "float gr=fb2(vP.xy*1.7+vP.z)*.22+fb2(vP.xy*9.+vP.z*3.)*.1; vec3 alb=vec3(.50,.465,.41)*(.84+gr);";
  s(
    a(d, p),
    o(
      `void main(){ vec3 n=vec3(0,0,1); ${y} float panel=smoothstep(.004+fwidth(vP.y),.0,abs(vP.y+.62)-.012); float low=step(vP.y,-.62); float px=abs(mod(vP.x,1.15)-.575); float stile=smoothstep(.06+fwidth(vP.x),.06,.575-px); alb=mix(alb,vec3(.13,.085,.055)*(.8+.5*fb2(vec2(vP.x*14.,vP.y*1.5))),low); float grv=smoothstep(.006+fwidth(vP.x),.006,abs(.575-px-.06)); alb*=1.-low*grv*.5; alb*=1.-panel*.6; float bs=step(vP.y,-1.3); alb=mix(alb,vec3(.07,.05,.035),bs); o=vec4(alb*light(vP,n),1.); }`,
    ),
  ).position.set(v, m, f);
  let M = s(
    a(d, p),
    o(`void main(){ vec3 n=vec3(0,0,-1); ${y} alb*=.9; vec3 d=normalize(vP-uCam); float b=fwidth(vP.x)*.7+.001; float a=arch(vP.xy,b);
    vec3 c=alb*light(vP,n); float rim=arch(vP.xy,.09)-a; c*=1.-.35*clamp(rim,0.,1.); vec3 q=vP+d*(.3/max(d.z,.05)); float a2=arch(q.xy,b+.004); vec3 jamb=vec3(.55,.5,.43)*(1.1+.9*max(d.x,0.)); vec3 sk=skyOut(d); float tr=fb2(q.xy*.9+vec2(uTime*.012,0.)+d.xy*4.); float tl=smoothstep(.35,.75,tr+.25-q.y*.22); sk=mix(sk,vec3(.34,.30,.22)*1.2,tl*.75); float br=bars(vP.xy+d.xy*.12,b+.003); sk*=mix(.07,1.,br); vec3 in_=mix(jamb,sk,a2); c=mix(c,in_,a); float low=step(vP.y,-.74); c=mix(c,vec3(.12,.08,.05)*light(vP,n),low*(1.-a)); o=vec4(c,1.); }`),
  );
  ((M.rotation.y = Math.PI), M.position.set(v, m, h));
  let w = s(
    a(d, x),
    o(
      "void main(){ vec3 n=vec3(0,-1,0); float w=.2; float s=fract(vP.z/w); vec3 alb=vec3(.16,.11,.075)*(.7+.6*fb2(vec2(vP.x*1.5,vP.z*18.)))*(1.-.6*smoothstep(.06,.0,min(s,1.-s))); o=vec4(alb*light(vP,n),1.); }",
    ),
  );
  ((w.rotation.x = Math.PI / 2), w.position.set(v, u, g));
  let E = o(
    "void main(){ vec3 n=normalize(vN); if(dot(n,uCam-vP)<0.) n=-n; vec3 alb=vec3(.11,.072,.045)*(.7+.7*fb2(vec2(vP.z*1.4+vP.x*5.,vP.y*14.+vP.x*9.))); vec3 c=alb*light(vP,n); vec3 V=normalize(uCam-vP); c+=amb(vP,reflect(-V,n))*.05*pow(1.-max(dot(n,V),0.),3.)*3.; o=vec4(c,1.); }",
  );
  for (let $ = 0; $ < 9; $++)
    (s(new Mi(0.13, 0.2, x), E).position.set(-4.95 + $ * 2.3, u - 0.1, g),
      s(new Mi(0.13, p, 0.09), E).position.set(-4.95 + $ * 2.3, m, f + 0.045),
      s(new Mi(0.13, p, 0.09), E).position.set(-4.95 + $ * 2.3, m, h - 0.045));
  let T = s(
    a(x, p),
    o(
      `uniform float uPass; void main(){ vec2 u=vP.zy; float gz=.46-abs(mod(u.x+.06,.92)-.46); float gy=.575-abs(mod(u.y+.375,1.15)-.575); float fw=fwidth(u.x)+.0005; float bar=max(smoothstep(.02+fw,.02,gz),smoothstep(.02+fw,.02,gy)); float gz2=.23-abs(mod(u.x+.06,.46)-.23), gy2=.19166-abs(mod(u.y+.375,.38333)-.19166); bar=max(bar,max(smoothstep(.006+fw,.006,gz2),smoothstep(.006+fw,.006,gy2))*.9*(1.-uPass)); bar*=1.-uPass; float fib=fb2(u*vec2(26.,9.))*.5+fb2(u*vec2(7.,40.)+9.)*.5+vn2(u*130.)*.16;
    float br=0.; vec2 q=u+vec2(sin(uTime*.4)*.02,cos(uTime*.33)*.015); float bn=fb2(q*vec2(1.1,1.6)+2.); br=smoothstep(.43,.58,bn)*smoothstep(-.9,.9,u.y)*.42; vec3 pap=mix(SHOJ,vec3(1.,.80,.52),.45*exp(-dot(u-vec2(.35,.25),u-vec2(.35,.25))*.3))*uGlow*(.5+.5*smoothstep(-1.2,1.3,u.y)+1.25*exp(-dot(u-vec2(.35,.25),u-vec2(.35,.25))*.55))*(.82+.36*fib)*(1.-br)*(1.-.52*uPass); vec3 c=mix(pap,vec3(.05,.035,.022),bar); float low=step(u.y,-.95)*(1.-uPass); c=mix(c,vec3(.10,.066,.04)*amb(vP,vec3(-1,0,0))*1.6,low); o=vec4(c,1.); }`,
      { uPass: { value: 0 } },
    ),
  );
  ((T.rotation.y = -Math.PI / 2), T.position.set(l, m, g));
  let _ = s(a(x, p), o(`void main(){ vec3 n=vec3(1,0,0); ${y} o=vec4(alb*light(vP,n)*.6,1.); }`));
  ((_.rotation.y = Math.PI / 2), _.position.set(r, m, g));
  let R = { uHit: { value: new ie(0, 0.1745, 0, 0) }, uHole: { value: 0 } },
    k = s(
      a(1.6, 0.9, 64, 36),
      o(
        `uniform vec4 uHit; uniform float uHole; void main(){ vec3 n=normalize(vN); vec3 V=normalize(uCam-vP); bool bk=dot(n,V)<0.; if(bk) n=-n; float fw=fwidth(length(vO.xy)); float r=length(vO.xy-uHit.xy); float ang=atan(vO.x-uHit.x,vO.y-uHit.y); float tear=.009+.004*vn2(vec2(ang*2.5,3.)); if(uHole>.5&&r<tear) discard; vec3 alb=sheetCol(vO.xy,fw); alb*=.985+.03*vn2(vP.yz*240.);
    if(uHole>.5){ alb*=1.-.45*smoothstep(tear+.012,tear,r); float cr=smoothstep(.0035,.0,abs(sin(ang*2.5+1.))*r*.5)*smoothstep(.07,.01,r); alb*=1.-cr*.4; }
    vec3 c=alb*(light(vP,n)*1.15+vec3(1.,.93,.82)*(.62+.22*vO.x+.16*vO.y)); float tl=win(vP-n*.01)*max(dot(-n,uSun),0.); c+=alb*vec3(1.,.8,.55)*tl*1.2; c+=alb*SHOJ*.22*(bk?4.:.5);
    float gl=uHit.w*(exp(-r*r*900.)*2.2+exp(-r*9.)*.16)*(.75+.25*sin(uTime*3.)); c+=vec3(1.,.82,.5)*gl; o=vec4(c,1.); }`,
        R,
        `precision highp float; in vec3 position,normal; uniform mat4 modelMatrix,viewMatrix,projectionMatrix; uniform float uTime; uniform vec4 uHit; out vec3 vP,vN,vO;
   float wv(vec2 q){ float r=length(q-uHit.xy); float t=uHit.z; float a=uHit.w; float y=a*.02*exp(-t*1.5)*exp(-r*1.7)*sin(r*26.-t*24.)*smoothstep(r-.02,r+.1,t*1.1+.02); y+=a*.018*exp(-t*2.)*exp(-r*r*40.)*cos(t*31.); y+=.004*sin(uTime*.9+q.y*2.2)*(q.x+.45); return y; }
   void main(){ vec2 q=position.yx; float e=.01; float y=wv(q); float yy=(wv(q+vec2(e,0))-y)/e, yz=(wv(q+vec2(0,e))-y)/e; vP=vec3(10.+y,q.x,q.y); vO=vec3(q,0.); vN=normalize(vec3(-1.,yy,yz)); gl_Position=projectionMatrix*viewMatrix*vec4(vP,1.); }`,
      ),
    );
  k.frustumCulled = !1;
  let P = o(
      "void main(){ vec3 n=normalize(vN); vec3 V=normalize(uCam-vP); vec3 R=reflect(-V,n); vec3 alb=vec3(.62,.46,.22); vec3 c=alb*(amb(vP,R)*.9*ao(vP)+.04)+alb*SUNC*.10*pow(max(dot(R,uSun),0.),14.)*win(vP+n*.02)*4.+alb*SUNC*.12*max(dot(n,uSun),0.)*win(vP); o=vec4(c,1.); }",
    ),
    C = ($, tt, W, D, z, pt, ht, gt = P) => {
      let dt = new F($, tt, W),
        Kt = new F(D, z, pt),
        Ot = dt.distanceTo(Kt),
        Ut = s(new On(ht, ht, Ot, 14, 1), gt);
      return (
        Ut.position.copy(dt).lerp(Kt, 0.5),
        Ut.quaternion.setFromUnitVectors(new F(0, 1, 0), Kt.clone().sub(dt).normalize()),
        Ut
      );
    };
  C(10.02, -0.47, -0.8, 10.02, -0.47, 0.8, 0.01);
  for (let $ of [-0.62, 0.62])
    (C(10.03, 0.5, $, 9.75, c, $ * 1.18, 0.012), C(10.03, 0.5, $, 10.5, c, $ * 1.1, 0.012));
  C(10.03, 0.5, -0.62, 10.03, 0.5, 0.62, 0.009);
  for (let $ of [-0.8, 0.8]) s(new Mi(0.03, 0.05, 0.06), P).position.set(10, -0.45, $ * 0.9);
  let A = s(
    a(2.2, 1.6),
    new ce({
      glslVersion: re,
      transparent: !0,
      depthWrite: !1,
      vertexShader: bb,
      fragmentShader:
        "precision highp float; in vec3 vO; out vec4 o; void main(){ float d=length(vO.xy*vec2(.95,1.4)); o=vec4(0.,0.,0.,.42*smoothstep(1.,.1,d)); }",
    }),
  );
  ((A.rotation.x = -Math.PI / 2), A.position.set(10.1, c + 0.004, 0));
  let N = { uDraw: { value: 1 }, uVib: { value: 0 } },
    G =
      "uniform float uDraw,uVib; vec3 limb(float u){ float a=abs(u); float y=sign(u)*(mix(.86,.77,uDraw)*sin(a*1.5708*.93)+.0); float x=.035*smoothstep(0.,.2,a)-mix(.13,.36,uDraw)*pow(a,2.3)+mix(.10,.055,uDraw)*pow(a,9.)+uVib*.02*a*a; return vec3(x,y,0.); }",
    B = 120,
    ot = 14,
    ut = [],
    lt = [];
  for (let $ = 0; $ <= B; $++) for (let tt = 0; tt < ot; tt++) ut.push(($ / B) * 2 - 1, (tt / ot) * Ve, 0);
  for (let $ = 0; $ < B; $++)
    for (let tt = 0; tt < ot; tt++) {
      let W = $ * ot + tt,
        D = $ * ot + ((tt + 1) % ot);
      lt.push(W, D, W + ot, D, D + ot, W + ot);
    }
  let Z = new Qt();
  (Z.setAttribute("position", new ae(ut, 3)), Z.setIndex(lt));
  let H = s(
    Z,
    o(
      `void main(){ vec3 n=normalize(vN); vec3 V=normalize(uCam-vP); if(dot(n,V)<0.) n=-n; float a=abs(vO.x); float g=fb2(vec2(vO.x*30.,vO.y*1.2+vO.x*3.)); vec3 alb=mix(vec3(.085,.045,.022),vec3(.20,.11,.05),g); float lam=smoothstep(.75,1.,abs(sin(vO.y))); alb=mix(alb,vec3(.34,.25,.15),lam*.7*smoothstep(.12,.2,a)); float grip=smoothstep(.115,.105,a); float wrap=sin(vO.x*520.); alb=mix(alb,vec3(.05,.035,.026)*(1.+.35*wrap),grip); float ring=smoothstep(.006,.003,abs(a-.118))+smoothstep(.006,.003,abs(a-.96)); alb=mix(alb,vec3(.6,.42,.18),clamp(ring,0.,1.));
    vec3 R=reflect(-V,n); float fr=.04+.5*pow(1.-max(dot(n,V),0.),4.); vec3 c=alb*light(vP,n); c+=(amb(vP,R)*1.1+SUNC*.35*pow(max(dot(R,uSun),0.),38.)*win(vP+vec3(0,0,.05)))*fr*(1.-grip*.8)*1.6; c+=vec3(1.,.8,.5)*.05*exp(-length(vP.yz)*9.)*max(0.,-n.x*.4+.6); o=vec4(c,1.); }`,
      N,
      `precision highp float; in vec3 position; uniform mat4 viewMatrix,projectionMatrix; out vec3 vP,vN,vO; ${G}
    void main(){ float u=position.x,t=position.y; float a=abs(u); vec3 c=limb(u); vec3 d=normalize(limb(u+.004)-limb(u-.004)); vec3 nx=normalize(vec3(d.y,-d.x,0.)); if(abs(u)<.001) nx=vec3(1,0,0); float tz=mix(.019,.007,pow(a,1.3)), tx=mix(.0085,.0035,a); float gr=smoothstep(.16,.04,a); tz=mix(tz,.015,gr); tx=mix(tx,.021,gr); tx*=smoothstep(1.003,.985,a); tz*=smoothstep(1.003,.985,a); float ct=cos(t),st=sin(t); vP=c+nx*tx*st+vec3(0,0,1)*tz*ct; vN=normalize(nx*st*tz+vec3(0,0,1)*ct*tx); vO=vec3(u,t,0.); gl_Position=projectionMatrix*viewMatrix*vec4(vP,1.); }`,
    ),
  );
  H.frustumCulled = !1;
  let Y = { uFlex: { value: 0 }, uHot: { value: 1 } },
    q =
      "precision highp float; in vec3 position,normal; uniform mat4 modelMatrix,viewMatrix,projectionMatrix; uniform float uFlex; out vec3 vP,vN,vO; void main(){ vec3 p=position; float u=-p.x/.8; p.z+=uFlex*(sin(u*3.1416)-.4); vec4 w=modelMatrix*vec4(p,1.); vP=w.xyz; vO=position; vN=normalize(mat3(modelMatrix)*normal); gl_Position=projectionMatrix*viewMatrix*w; }",
    st = new Kn();
  e.add(st);
  let ct = o(
      "uniform float uHot; void main(){ vec3 n=normalize(vN); vec3 V=normalize(uCam-vP); if(dot(n,V)<0.) n=-n; float u=-vO.x/.8; vec3 alb=vec3(.045,.042,.04); if(vO.x>-.045) alb=vec3(.55,.40,.18); if(u>.985) alb=vec3(.6,.5,.35); vec3 R=reflect(-V,n); vec3 c=alb*light(vP,n)+amb(vP,R)*(.06+.4*pow(1.-max(dot(n,V),0.),4.)); float inl=smoothstep(.55,.98,dot(n,V)); c+=vec3(1.,.8,.47)*uHot*(inl*2.6+.35)*(.85+.15*sin(uTime*9.+u*20.)); o=vec4(c,1.); }",
      Y,
      q,
    ),
    V = o(
      "uniform float uHot; void main(){ vec3 n=normalize(vN); vec3 V=normalize(uCam-vP); if(dot(n,V)<0.) n=-n; float b=abs(sin(vO.x*700.)); vec3 alb=vec3(.82,.77,.68)*(.8+.2*b); vec3 c=alb*(light(vP,n)+.5*SUNC*max(dot(-n,uSun),0.)*win(vP)); c+=vec3(1.,.8,.5)*uHot*.12; o=vec4(c,1.); }",
      Y,
      q,
    );
  {
    let $ = new On(0.0034, 0.0034, 0.8, 14, 24, !0);
    ($.rotateZ(Math.PI / 2), $.translate(-0.4, 0, 0), st.add(new Zt($, ct)));
    let tt = new On(2e-4, 0.0052, 0.05, 14, 1);
    (tt.rotateZ(-Math.PI / 2), tt.translate(0, 0, 0));
    let W = new Zt(tt, ct);
    st.add(W);
    let D = new ro();
    (D.moveTo(-0.63, 0.003),
      D.lineTo(-0.75, 0.003),
      D.lineTo(-0.775, 0.02),
      D.quadraticCurveTo(-0.7, 0.021, -0.63, 0.003));
    for (let z = 0; z < 3; z++) {
      let pt = new dr(D, 10);
      pt.rotateX((z * Ve) / 3 + 0.5);
      let ht = new Zt(pt, V);
      st.add(ht);
    }
    st.children.forEach((z) => (z.frustumCulled = !1));
  }
  let ft = 1500,
    nt = ze(11),
    Mt = new Float32Array(ft * 4);
  for (let $ = 0; $ < ft; $++)
    ((Mt[$ * 4] = nt()), (Mt[$ * 4 + 1] = nt()), (Mt[$ * 4 + 2] = nt()), (Mt[$ * 4 + 3] = nt()));
  let Et = new Qt();
  (Et.setAttribute("position", new $t(new Float32Array(ft * 3), 3)), Et.setAttribute("aR", new $t(Mt, 4)));
  let at = { uPx: { value: 1 } },
    rt = new Zi(
      Et,
      new ce({
        glslVersion: re,
        transparent: !0,
        depthWrite: !1,
        blending: Ie,
        blendSrc: pe,
        blendDst: pe,
        uniforms: { ...n, ...at },
        vertexShader: `precision highp float; in vec4 aR; uniform mat4 viewMatrix,projectionMatrix; uniform float uPx; uniform vec3 uCam; out vec3 vC; ${$v}${Zv}
    void main(){ vec3 p=vec3(-3.+16.*aR.x,-1.3+3.1*aR.y,-1.9+4.2*aR.z); float t=uTime; p+=vec3(sin(t*.21+aR.w*40.)*.22+sin(t*.5+aR.x*70.)*.05,sin(t*.17+aR.x*30.)*.16+cos(t*.6+aR.z*50.)*.03,cos(t*.19+aR.y*50.)*.2); vec4 v=viewMatrix*vec4(p,1.); gl_Position=projectionMatrix*v; float d=-v.z; float coc=abs(1./d-.28)*5.+1.; float s=(.0016+.0024*aR.w*aR.w)*projectionMatrix[1][1]*uPx/max(d,.1); float sz=max(s*coc,1.); float e=min(1.,(s*s)/(sz*sz)*2.4+.015)*smoothstep(.15,.5,d); float l=win(p)+.03; float fs=.55+.45*pow(max(dot(normalize(p-uCam),uSun),0.),2.)*2.; vC=vec3(1.,.8,.55)*l*e*fs*3.2*(.6+.4*sin(t*1.3+aR.w*90.)); gl_PointSize=min(sz*2.,26.); if(d<.1) gl_Position=vec4(2.); }`,
        fragmentShader:
          "precision highp float; in vec3 vC; out vec4 o; void main(){ float r=length(gl_PointCoord-.5)*2.; float a=smoothstep(1.,.55,r); if(a<=0.) discard; o=vec4(vC*a,0.); }",
      }),
    );
  ((rt.frustumCulled = !1), e.add(rt));
  let U = i.target({ scale: 0.5 }),
    j = i.pass(
      $v +
        Zv.replace("uniform float uTime;", "") +
        `uniform vec3 uCam,uR,uU,uF; uniform vec2 uTan; uniform float uSteps,uFade;
   float ign(vec2 p){ return fract(52.9829189*fract(dot(p,vec2(.06711056,.00583715)))); }
   void main(){ vec2 n=vUv*2.-1.; vec3 d=normalize(uF+uR*n.x*uTan.x+uU*n.y*uTan.y); vec3 a=(vec3(-6.,-1.45,-2.1)-uCam)/d,b=(vec3(14.,2.05,2.4)-uCam)/d; vec3 hi=max(a,b); float t1=min(hi.x,min(hi.y,hi.z)); float ts=(10.-uCam.x)/d.x; if(ts>0.&&ts<t1){ vec3 s=uCam+d*ts; if(abs(s.y)<.45&&abs(s.z)<.8) t1=ts; } t1=max(t1,0.); float N=uSteps; float j=ign(gl_FragCoord.xy+mod(floor(uTime*60.),64.)*vec2(5.588,3.17)); vec3 acc=vec3(0.); float mu=dot(d,uSun); float ph=.35+.65*pow(max(.5+.5*mu,0.),2.2); float prev=0.; for(float i=0.;i<N;i++){ float f=(i+j)/N; float t=t1*f*f*(.35+.65)+0.; float dt=t1*2.*f/N; vec3 p=uCam+d*t; float den=.75+.5*vn2(p.xz*1.1+vec2(uTime*.05,p.y*1.3)); acc+=SUNC*win(p)*den*dt; float dx=14.-p.x; acc+=SHOJ*.20*dt/(1.+dx*dx*.3); }
    o=vec4(acc*.0155*ph*uFade,1.); }`,
      {
        uCam: n.uCam,
        uSun: n.uSun,
        uGlow: n.uGlow,
        uR: new F(),
        uU: new F(),
        uF: new F(),
        uTan: new Nt(),
        uSteps: 16,
        uFade: 1,
      },
    ),
    J = i.pass(
      "uniform sampler2D tA; uniform vec2 uPx; void main(){ vec3 c=texture(tA,vUv).rgb*.25; c+=(texture(tA,vUv+uPx*vec2(1.2,.4)).rgb+texture(tA,vUv+uPx*vec2(-1.2,-.4)).rgb+texture(tA,vUv+uPx*vec2(-.4,1.2)).rgb+texture(tA,vUv+uPx*vec2(.4,-1.2)).rgb)*.1875; o=vec4(c,1.); }",
      { tA: null, uPx: new Nt() },
      { blending: bo, transparent: !0 },
    ),
    Pt = ($, tt, W) => {
      let D = Math.abs($);
      return [
        0.035 * 1 - K(0.13, 0.36, tt) * D ** 2.3 + K(0.1, 0.055, tt) * D ** 9 + W * 0.02 * D * D,
        Math.sign($) * K(0.86, 0.77, tt) * Math.sin(((D * Math.PI) / 2) * 0.93),
      ];
    };
  return {
    scene: e,
    arrow: st,
    bowU: N,
    arU: Y,
    shU: R,
    shojiU: T.material.uniforms,
    U: n,
    limb: Pt,
    vol: j,
    set($) {
      ((n.uTime.value = $.t), n.uCam.value.copy($.cam), (at.uPx.value = i.H * 0.5));
    },
    draw($, tt, W, D = 1) {
      i.draw(e, $, tt, { clear: !0 });
      let z = $.matrixWorld.elements;
      (j.u.uR.value.set(z[0], z[1], z[2]),
        j.u.uU.value.set(z[4], z[5], z[6]),
        j.u.uF.value.set(-z[8], -z[9], -z[10]),
        j.u.uTan.value.set(1 / $.projectionMatrix.elements[0], 1 / $.projectionMatrix.elements[5]),
        (j.u.uTime.value = W.t),
        (j.u.uSteps.value = Math.round(16 * W.q)),
        (j.u.uFade.value = D),
        j.render(U),
        (J.u.tA.value = U.texture),
        J.u.uPx.value.set(1 / U.width, 1 / U.height),
        J.render(tt));
    },
  };
}

var DR = new F(0.66, 0.15, 0.7).normalize(),
  Mb = `
vec3 skyDawn(vec3 d,vec3 sun,float alt){ float mu=max(dot(d,sun),0.); float az=max(dot(normalize(d.xz+1e-4),normalize(sun.xz)),0.); float h=max(d.y+alt*.02,0.); float hz=exp(-h*8.); float hz2=exp(-h*2.8);
 vec3 zen=mix(vec3(.040,.052,.078),vec3(.008,.010,.015),alt); vec3 c=mix(zen,vec3(.215,.212,.225),hz2*.8*(1.-alt*.8)); c=mix(c,mix(vec3(.245,.262,.292),vec3(.90,.68,.47),pow(az,3.2)),hz*.85*(1.-alt*.7)); c+=vec3(1.,.66,.36)*(pow(mu,8.)*.24+pow(mu,60.)*.9)*(1.-alt*.6)+vec3(1.,.62,.30)*(pow(mu,420.)*1.6+pow(mu,3000.)*3.+smoothstep(.99988,.99993,mu)*12.)*(1.-alt*.6); return c; }`,
  Jv =
    Bn +
    `
vec3 noised(vec2 p){ vec2 i=floor(p),f=fract(p); vec2 u=f*f*f*(f*(f*6.-15.)+10.),du=30.*f*f*(f*(f-2.)+1.); float a=hash12(i),b=hash12(i+vec2(1,0)),c=hash12(i+vec2(0,1)),d=hash12(i+vec2(1,1)); return vec3(a+(b-a)*u.x+(c-a)*u.y+(a-b-c+d)*u.x*u.y,du*(vec2(b-a,c-a)+(a-b-c+d)*u.yx)); }
const mat2 M2=mat2(.8,-.6,.6,.8);
// height in metres, gradient in yz
vec3 terr(vec2 p,float lod){ float r=length(p); float cap=clamp(r/7000.,.0006,1.); float s=0.; vec2 d=vec2(0.); vec2 g=vec2(0.); float a=1250.; float f=1./7600.; vec2 q=p*f+vec2(3.1,7.7); mat2 m=mat2(1.,0.,0.,1.); vec2 dd=vec2(0.);
 for(int i=0;i<12;i++){ float wl=1./f; float fade=smoothstep(lod*1.5,lod*4.,wl); if(fade<=0.) break; float own=min(a,cap*1500.*.62); own=min(a,max(a*.0,cap*1500.*pow(.5,max(0.,float(i)-log2(1./cap)*.9)))); vec3 n=noised(q); dd+=m*n.yz; if(i<7){ float sg=n.x>.5?-1.:1.; float v=1.-abs(2.*n.x-1.); float v2=v*v*(1.6-.6*v); vec3 rd=vec3(v2,(3.2*v-1.8*v*v)*sg*2.*n.yz); float rk=i<5?.85:.5; n=mix(n,vec3(rd.x*.95+.02,rd.yz*.6),rk); } vec2 nd=m*n.yz; float k=1./(1.+dot(dd,dd)*.4); s+=own*(n.x-.46)*k*fade; g+=own*nd*f*k*fade; a*=.47; f*=2.02; q=M2*q*2.02; m=m*transpose(M2); }
 float base=-2.2-.135*r*1./(1.+r/7200.); float bg=-.135/((1.+r/7200.)*(1.+r/7200.)); float side=smoothstep(.10,.6,abs(p.y)/(abs(p.x)+30.)); float sm=mix(.86,2.6,side); s*=sm; g*=sm; return vec3(base+s,g+(r>1.?p/r*bg:vec2(0.))); }
`,
  UR = `float terrLo(vec2 p,float lod){ return terr(p,lod).x; }
 float sunShadow(vec2 w,float h0,float dist){ vec2 L=normalize(uSun.xz); float tn=uSun.y/length(uSun.xz); float m=-1.; float st=dist*.035+6.; float t=st*.6; for(int i=0;i<4;i++){ float hh=terrLo(w+L*t,max(dist*.05,t*.22)+6.)-(h0+t*tn); m=max(m,hh/(t*.10+2.)); t*=2.2; } return 1.-smoothstep(-.35,.45,m); }`;

function Sb(i) {
  let n = [],
    o = [];
  for (let h = 0; h <= 250; h++) for (let d = 0; d <= 300; d++) n.push(h / 250, d / 300, 0);
  for (let h = 0; h < 250; h++)
    for (let d = 0; d < 300; d++) {
      let p = h * 301 + d;
      o.push(p, p + 1, p + 300 + 1, p + 1, p + 300 + 2, p + 300 + 1);
    }
  let s = new Qt();
  (s.setAttribute("position", new ae(n, 3)), s.setIndex(o));
  let a = {
      uTime: { value: 0 },
      uSun: { value: DR },
      uPos: { value: new F() },
      uYaw: { value: 0 },
      uR0: { value: 1 },
      uFade: { value: 1 },
      uAlt: { value: 0 },
      uPxA: { value: 0.001 },
    },
    r = `uniform vec3 uPos,uSun; uniform float uTime,uAlt,uPxA;
   vec3 fog(vec3 c,vec3 rel,float dist){ vec3 d=rel/dist; float h0=uPos.y; float H=105.; float base=-600.; float a=(h0-base)/H; float b=(h0+rel.y-base)/H; float od; float dy=rel.y; float e0=exp(-clamp(a,-8.,30.)),e1=exp(-clamp(b,-8.,30.)); float avg=abs(dy)>1.?H*(e1-e0)/(-dy):e0; od=avg*dist*.00027; float haze=dist/50000.*max(.5,exp(-max(h0,0.)/9000.)); float f=1.-exp(-od); float f2=1.-exp(-haze); float mu=max(dot(d,uSun),0.); vec3 mist=mix(vec3(.185,.20,.225),vec3(1.02,.81,.59),pow(mu,3.4)*.95); vec3 hz=skyDawn(normalize(vec3(d.x,max(d.y,.015),d.z)),uSun,uAlt); c=mix(c,hz,f2); return mix(c,mist,clamp(f,0.,.94)); }`,
    l = new ce({
      glslVersion: re,
      side: oe,
      uniforms: a,
      vertexShader: `precision highp float; in vec3 position; uniform mat4 viewMatrix,projectionMatrix; uniform vec3 uPos; uniform float uYaw,uR0; out vec3 vRel; ${Jv}
    void main(){ float r=uR0*(exp(position.x*log(340000./uR0))); float an=uYaw+(position.y-.5)*3.3; vec2 off=vec2(cos(an),-sin(an))*r; vec2 w=uPos.xz+off; float lod=r*3.3/300.; vec3 h=terr(w,lod); float y=h.x-dot(w,w)/(2.*6371000.); vRel=vec3(off.x,y-uPos.y,off.y); gl_Position=projectionMatrix*vec4(mat3(viewMatrix)*vRel,1.); }`,
      fragmentShader: `precision highp float; in vec3 vRel; out vec4 o; ${Jv}${Mb}${r}${UR}
    void main(){ float dist=length(vRel); vec2 w=uPos.xz+vRel.xz; float px=dist*uPxA; vec3 h=terr(w,px*.9); vec3 n=normalize(vec3(-h.y,1.,-h.z)); float slope=1.-n.y; float nl=max(dot(n,uSun),0.); float f1=noised(w/900.).x,f2=noised(w/130.+3.).x; float f3=mix(.5,hash12(floor(w/9.)),smoothstep(6.,1.,px));
     float bs=-2.2-.135*length(w)/(1.+length(w)/7200.); float up=(h.x-bs)/(120.+.05*length(w)); vec3 rock=vec3(.150,.148,.150),grass=vec3(.072,.076,.072),forest=vec3(.028,.032,.032),snow=vec3(.80,.80,.80); float f4=noised(w/34.+9.).x; vec3 a=mix(grass*(.75+.5*f4),rock*(.7+.6*f2),smoothstep(.06,.30,slope+f2*.1)); float fo=smoothstep(.40,.72,f1*.55+f2*.3+f4*.2)*smoothstep(.26,.08,slope); a=mix(a,forest*(.7+.6*f3),fo*.9); a=mix(a,snow,smoothstep(.05,1.05,up*.55+f2*.5+f4*.14-.12+h.x/2600.)*smoothstep(.5,.22,slope)*.85);
      float occ=mix(.18,1.,smoothstep(-.9,1.1,up)); float shd=mix(.35,1.,smoothstep(-.6,.3,up))*sunShadow(w,h.x,dist); nl*=mix(.02,1.,shd); float amb=(.5+.5*n.y)*occ; vec3 c=a*(vec3(.33,.39,.49)*amb*.50+vec3(1.,.81,.62)*nl*9.5+vec3(1.,.78,.54)*1.6*pow(1.-max(dot(n,-vRel/dist),0.),4.)*pow(max(dot(vRel/dist,uSun),0.),2.)*shd+vec3(.30,.32,.36)*max(0.,-dot(n,uSun)*.5+.5)*.06);
     // still water in the low ground
     o=vec4(fog(c,vRel,dist),1.); }`,
    }),
    c = new Zt(s, l);
  c.frustumCulled = !1;
  let u = new ge();
  u.add(c);
  let f = i.pass(
    Mb +
      Jv +
      `uniform vec3 uR,uU,uF,uSun; uniform vec2 uTan; uniform float uAlt; float fb(vec2 p){ return noised(p).x*.5+noised(p*2.1+3.).x*.25+noised(p*4.3+7.).x*.125+noised(p*8.7).x*.0625; }
   void main(){ vec2 n=vUv*2.-1.; vec3 d=normalize(uF+uR*n.x*uTan.x+uU*n.y*uTan.y); vec3 c=skyDawn(d,uSun,uAlt); if(d.y>.01){ vec2 q=d.xz/(d.y+.09); q=vec2(q.x*.35,q.y*1.1)*.7; float cl=fb(q+vec2(uTime*.01,0.)); float m=smoothstep(.46,.8,cl)*smoothstep(.0,.12,d.y)*(1.-uAlt); float mu=max(dot(d,uSun),0.); c=mix(c,mix(vec3(.22,.225,.24),vec3(1.1,.76,.48),pow(mu,2.5)),m*.26*smoothstep(.9996,.997,mu)); } o=vec4(c,1.); }`,
    { uR: new F(), uU: new F(), uF: new F(), uSun: a.uSun, uTan: new Nt(), uAlt: a.uAlt },
  );
  return {
    U: a,
    scene: u,
    draw(h, d, p, x, v, m, g) {
      ((a.uTime.value = p),
        a.uPos.value.copy(x),
        (a.uYaw.value = v),
        (a.uAlt.value = m),
        (a.uR0.value = Math.max(0.25, g * 0.25)));
      let b = h.matrixWorld.elements;
      (f.u.uR.value.set(b[0], b[1], b[2]),
        f.u.uU.value.set(b[4], b[5], b[6]),
        f.u.uF.value.set(-b[8], -b[9], -b[10]),
        f.u.uTan.value.set(1 / h.projectionMatrix.elements[0], 1 / h.projectionMatrix.elements[5]),
        (f.u.uTime.value = p),
        (a.uPxA.value = 2 / h.projectionMatrix.elements[5] / i.H),
        f.render(d, !0));
      let y = h.near,
        S = h.far;
      ((h.near = Math.max(0.05, g * 0.05)),
        (h.far = 6e5),
        h.updateProjectionMatrix(),
        i.draw(u, h, d, { clear: !1 }),
        (h.near = y),
        (h.far = S),
        h.updateProjectionMatrix());
    },
  };
}

var Ha = F;

function Eb(i) {
  let t = i.r,
    e = i.target({ w: 2048, h: 2048, type: Nn }),
    n = i.target({ w: 2048, h: 2048, type: Nn, mips: !0 }),
    o =
      "vec3 disc2dir(vec2 uv){ vec2 q=(uv*2.-1.)*1.18; float r2=min(dot(q,q),1.999); float z=1.-r2; float k=sqrt(max(2.-r2,0.)); return vec3(z,q.y*k,q.x*k); }",
    s = i.pass(
      Fe +
        o +
        `
   vec2 crat(vec3 p,float f,float dens,float seed){ vec3 q=p*f; vec3 b=floor(q-.5); float h=0.,al=0.; for(int k=0;k<8;k++){ vec3 c=b+vec3(k&1,(k>>1)&1,(k>>2)&1); vec3 rn=hash33(c+seed); if(rn.z*1.37-floor(rn.z*1.37)>dens) continue; vec3 ct=c+.5+(rn-.5)*.55; ct=normalize(ct)*f; float R=.16+.26*rn.x*rn.x; float d=length(q-ct)/R; if(d>2.6) continue; float fresh=rn.y; float bowl=d<1.?(-.75+1.05*d*d*d):0.; bowl=max(bowl,-.45); float rim=.36*exp(-(d-1.)*(d-1.)*(d<1.?30.:6.)); float pk=(R>.3?1.:0.)*.28*exp(-d*d*36.); float w=R/f; h+=(bowl*smoothstep(1.06,.94,d)+rim+pk)*w*(.16+.62*fresh*fresh); al+=(fresh>.86?1.:0.)*(.55*exp(-d*1.4)+.2*smoothstep(1.,.6,d))*(.5+.5*R); } return vec2(h,al); }
   void main(){ vec3 p=disc2dir(vUv); float mare=0.; { vec3 w=p+.16*vec3(fbm(p*2.3+1.),fbm(p*2.3+5.),fbm(p*2.3+9.))-.08; float a=0.; a=max(a,1.-smoothstep(.30,.42,length(w-normalize(vec3(.75,.50,-.42))))); a=max(a,1.-smoothstep(.20,.30,length(w-normalize(vec3(.80,.42,.22))))); a=max(a,1.-smoothstep(.20,.31,length(w-normalize(vec3(.86,.14,.42))))); a=max(a,1.-smoothstep(.12,.19,length(w-normalize(vec3(.66,.24,.72))))); a=max(a,1.-smoothstep(.26,.44,length(w-normalize(vec3(.72,.05,-.62))))); a=max(a,1.-smoothstep(.12,.25,length(w-normalize(vec3(.88,-.26,-.28))))); a=max(a,1.-smoothstep(.13,.22,length(w-normalize(vec3(.78,-.12,.60))))); mare=a; }
    float h=0.,al=0.; float rough=mix(1.,.16,mare); vec2 c; c=crat(p,3.6,.5*rough,3.); h+=c.x*.45; al+=c.y*.5; c=crat(p,7.5,.55*rough+.02,11.); h+=c.x*.62; al+=c.y*.8; c=crat(p,15.,.55*rough+.04,19.); h+=c.x*.8; al+=c.y*.8; c=crat(p,31.,.5*rough+.05,23.); h+=c.x*.95; al+=c.y*.5; c=crat(p,63.,.5*rough+.07,31.); h+=c.x; al+=c.y*.3; c=crat(p,128.,.5*rough+.1,41.); h+=c.x; c=crat(p,250.,.5,53.); h+=c.x*.9; h+=(fbm(p*9.)-.5)*.022*rough+(fbm(p*40.)-.5)*.004;
    float n=fbm(p*6.+3.); float n2=fbm(p*34.); float alb=mix(.60+.16*(n-.5)+.12*(n2-.5),.27+.10*(n-.5)+.06*(n2-.5),mare); alb+=al*.16*(1.-mare*.5); 
    // one big rayed crater in the south
    vec3 ty=normalize(vec3(.70,-.69,-.10)); float td=acos(clamp(dot(p,ty),-1.,1.)); vec3 tx=normalize(cross(ty,vec3(0,1,0))),tz=cross(tx,ty); float an=atan(dot(p,tz),dot(p,tx)); float ray=pow(vnoise(vec2(an*5.,td*1.2)),2.2)+.7*pow(vnoise(vec2(an*13.+3.,td*2.)),3.); alb+=ray*.36*exp(-td*1.55)*smoothstep(.04,.10,td); float d=td/.052; h+=(d<1.?(-.8+1.1*d*d*d):0.)*.03*smoothstep(1.1,.9,d)+.018*exp(-(d-1.)*(d-1.)*9.)+.012*exp(-d*d*40.); alb+=.18*smoothstep(1.3,.8,d);
    o=vec4(h,alb,mare,1.); }`,
    ),
    a = i.pass(
      o +
        "uniform sampler2D tA; void main(){ vec2 px=vec2(1./2048.); vec3 p=disc2dir(vUv); float hx=texture(tA,vUv+vec2(px.x,0)).r,hX=texture(tA,vUv-vec2(px.x,0)).r,hy=texture(tA,vUv+vec2(0,px.y)).r,hY=texture(tA,vUv-vec2(0,px.y)).r; vec3 a=disc2dir(vUv+vec2(px.x,0))*(1.+hx)-disc2dir(vUv-vec2(px.x,0))*(1.+hX); vec3 b=disc2dir(vUv+vec2(0,px.y))*(1.+hy)-disc2dir(vUv-vec2(0,px.y))*(1.+hY); vec3 n=normalize(cross(a,b)); if(dot(n,p)<0.) n=-n; float h0=texture(tA,vUv).r; float occ=0.; for(int i=0;i<8;i++){ float an=float(i)*.785; vec2 d=vec2(cos(an),sin(an)); occ+=max(0.,texture(tA,vUv+d*px*5.).r-h0)+max(0.,texture(tA,vUv+d*px*14.).r-h0)*.6; } n-=p*dot(n,p)*0.; vec4 t=texture(tA,vUv); o=vec4(n,t.g*(1.-clamp(occ*3.,0.,.22))); }",
      { tA: null },
    ),
    r = i.target({ w: 2048, h: 1024, type: Nn, mips: !0, wrap: an }),
    l = i.pass(
      Fe +
        `float fb(vec3 p){ float a=.5,s=0.; for(int i=0;i<7;i++){ s+=a*vnoise(p); p=p*2.03+vec3(1.7,9.2,3.1); a*=.52; } return s; }
   void main(){ float lo=(vUv.x-.5)*6.28318,la=(vUv.y-.5)*3.14159; vec3 p=vec3(cos(la)*cos(lo),sin(la),cos(la)*sin(lo)); float land=fb(p*1.9+vec3(4.3,1.2,7.7)); float w1=fb(p*2.6+9.),w2=fb(p*2.6+21.); vec3 q=p*3.1+vec3(w1,w2*.6,w1-w2)*1.9; float cl=fb(q); float fine=fb(p*16.+vec3(w1*3.,w2*3.,0.)); float band=.10*cos(la*6.)+.05*cos(la*12.); float wsp=fb(vec3(p.x*9.,p.y*9.,p.z*9.)+vec3(w2,w1,w2-w1)*5.); float c=smoothstep(.44,.72,cl+band*.6+(fine-.5)*.2+(wsp-.5)*.55); float cu=smoothstep(.55,.72,fb(p*26.+w1*4.))*smoothstep(.40,.52,cl); c=max(c,cu*.7); o=vec4(smoothstep(.548,.56,land),c,fine,land); }`,
    ),
    c = () => ({ uR: new Ha(), uU: new Ha(), uF: new Ha(), uTan: new Nt() }),
    u = (nt, Mt) => {
      let Et = Mt.matrixWorld.elements,
        at = Mt.projectionMatrix.elements;
      (nt.u.uR.value.set(Et[0], Et[1], Et[2]),
        nt.u.uU.value.set(Et[4], Et[5], Et[6]),
        nt.u.uF.value.set(-Et[8], -Et[9], -Et[10]),
        nt.u.uTan.value.set(1 / at[0], 1 / at[5]));
    },
    f = i.pass(
      Fe +
        `uniform vec3 uR,uU,uF; uniform vec2 uTan; uniform float uA; float f4(vec3 p){ return vnoise(p)*.5+vnoise(p*2.1+3.)*.27+vnoise(p*4.5+7.)*.15+vnoise(p*9.4+1.)*.08; }
   void main(){ vec2 n=vUv*2.-1.; vec3 d=normalize(uF+uR*n.x*uTan.x+uU*n.y*uTan.y); vec3 ax=normalize(vec3(-.10,.80,-.60)); float b=dot(d,ax); vec3 w=d*2.4; float n1=f4(w+vec3(5.)); vec3 wq=d*4.2+vec3(n1*2.2,f4(d*3.+2.)*1.6,0.); float n2=f4(wq); float n3=f4(wq*2.7+4.); float bb=b+(n1-.5)*.10; float band=exp(-bb*bb/.045); float core=exp(-bb*bb/.0075); float lane=smoothstep(.40,.66,n2*.7+n3*.3)*exp(-pow((b+(n2-.5)*.16)/.10,2.)); vec3 c=vec3(.0016,.0017,.0020); c+=vec3(.0150,.0148,.0150)*band*(.65+.35*n3); c+=vec3(.046,.041,.0355)*core*(.6+.5*n3); c*=1.-.6*lane; o=vec4(c*uA,1.); }`,
      { ...c(), uA: 1 },
    ),
    h = ze(5),
    d = 11e3,
    p = new Float32Array(d * 3),
    x = new Float32Array(d * 4);
  for (let nt = 0; nt < d; nt++) {
    let Mt = h() * 2 - 1,
      Et = h() * Ve,
      at = Math.sqrt(1 - Mt * Mt);
    {
      let j = at * Math.cos(Et),
        J = Mt,
        Pt = at * Math.sin(Et);
      if (nt > 5200) {
        let D = Math.hypot(-0.1, 0.8, -0.6),
          z = (j * -0.1 + J * 0.8 + Pt * -0.6) / D,
          pt = z * (1 - (0.1 + 0.25 * h()));
        ((j -= (-0.1 / D) * pt), (J -= (0.8 / D) * pt), (Pt -= (-0.6 / D) * pt));
        let ht = Math.hypot(j, J, Pt);
        ((j /= ht), (J /= ht), (Pt /= ht));
      }
      p.set([j, J, Pt], nt * 3);
    }
    let rt = Math.pow(h(), 7) * (nt > 5200 ? 0.35 : 1),
      U = h();
    x.set([rt, U, h(), 0.35 + 0.65 * h()], nt * 4);
  }
  let v = new Qt();
  (v.setAttribute("position", new $t(p, 3)), v.setAttribute("aS", new $t(x, 4)));
  let m = { uTime: { value: 0 }, uA: { value: 1 }, uPx: { value: 1 } },
    g = {
      transparent: !0,
      depthWrite: !1,
      depthTest: !1,
      blending: Ie,
      blendSrc: pe,
      blendDst: pe,
      glslVersion: re,
    },
    b = new Zi(
      v,
      new ce({
        ...g,
        uniforms: m,
        vertexShader:
          "precision highp float; in vec3 position; in vec4 aS; uniform mat4 viewMatrix,projectionMatrix; uniform float uTime,uA,uPx; out vec3 vC; void main(){ vec4 v=vec4(mat3(viewMatrix)*position*1000.,1.); gl_Position=projectionMatrix*v; gl_Position.z=gl_Position.w*.9; float s=(1.35+aS.x*2.6)*uPx; gl_PointSize=s+1.2; vec3 col=mix(vec3(1.,.80,.60),vec3(.80,.88,1.),aS.y); vC=col*(.085+.95*aS.x)*aS.w*(1.1+.25*sin(uTime*(1.+aS.z*2.)+aS.z*90.))*uA*3.1; }",
        fragmentShader:
          "precision highp float; in vec3 vC; out vec4 o; void main(){ float r=length(gl_PointCoord-.5)*2.; o=vec4(vC*exp(-r*r*3.2)*smoothstep(1.,.8,r),0.); }",
      }),
    );
  b.frustumCulled = !1;
  let y = 520,
    S = new Float32Array(y * 4),
    M = new Oe();
  for (let nt = 0; nt < y; nt++) S.set([h(), h(), h(), h()], nt * 4);
  (M.setAttribute("position", new ae([0, -1, 0, 1, -1, 0, 1, 1, 0, 0, 1, 0], 3)),
    M.setIndex([0, 1, 2, 0, 2, 3]),
    M.setAttribute("aR", new Ue(S, 4)),
    (M.instanceCount = y));
  let w = {
      uTr: { value: 0 },
      uLen: { value: 0 },
      uA: { value: 0 },
      uRes: { value: new Nt() },
      uCol: { value: new Ha(1, 0.93, 0.84) },
    },
    E = new Zt(
      M,
      new ce({
        ...g,
        side: oe,
        uniforms: w,
        vertexShader:
          "precision highp float; in vec3 position; in vec4 aR; uniform mat4 viewMatrix,projectionMatrix; uniform float uTr,uLen,uA; uniform vec2 uRes; out vec2 vU; out vec3 vC; void main(){ float L=44.; float x=mod(aR.x*L-uTr,L)-L*.35; float an=aR.y*6.28318; float ra=1.6+13.*sqrt(aR.z); vec3 p=vec3(x,cos(an)*ra,sin(an)*ra); vec3 q=p+vec3(uLen*(1.+aR.w),0.,0.); vec4 a=projectionMatrix*vec4(mat3(viewMatrix)*p,1.),b=projectionMatrix*vec4(mat3(viewMatrix)*q,1.); float ok=step(.1,a.w)*step(.1,b.w); vec2 s=a.xy/a.w*uRes,t=b.xy/b.w*uRes; vec2 d=t-s; float l=length(d); d=l>1e-3?d/l:vec2(1,0); vec2 n=vec2(-d.y,d.x); float w=(1.1+.7*aR.w*step(.8,aR.w)); vec2 c=mix(s-d*w,t+d*w,position.x)+n*position.y*w; vU=vec2(position.x,position.y); gl_Position=ok>.5?vec4(c/uRes,0.,1.):vec4(2.,2.,2.,1.); float fd=smoothstep(L*.63,L*.3,x)*smoothstep(-L*.35,-L*.2,x)*smoothstep(0.,2.,a.w); vC=mix(vec3(1.,.84,.66),vec3(.86,.91,.97),aR.w)*uA*.62*fd*(.2+.8*aR.w*aR.w)/(1.+l*.012); }",
        fragmentShader:
          "precision highp float; in vec2 vU; in vec3 vC; out vec4 o; void main(){ float a=exp(-vU.y*vU.y*2.4)*smoothstep(0.,.1,vU.x)*smoothstep(1.,.6,vU.x); o=vec4(vC*a,0.); }",
      }),
    );
  E.frustumCulled = !1;
  let T = new ge();
  T.add(b, E);
  let _ = i.pass(
    Fe +
      `uniform vec3 uR,uU,uF,uSun,uO; uniform vec2 uTan; uniform float uC,uA,uPxA,uSpin; uniform sampler2D tE;
   vec4 em(vec3 p){ float lo=atan(p.z,p.x),la=asin(clamp(p.y,-1.,1.)); return textureLod(tE,vec2(lo/6.28318+.5,la/3.14159+.5),0.); }
   float fine(vec3 p){ return vnoise(p*180.)*.5+vnoise(p*430.)*.3+vnoise(p*1100.)*.2; }
   void main(){ vec2 n=vUv*2.-1.; vec3 d=normalize(uF+uR*n.x*uTan.x+uU*n.y*uTan.y); float b=dot(uO,d); float disc=b*b-uC; float mu=dot(d,uSun); vec3 c=vec3(0.); float al=0.;
    float tca=-b; vec3 pc=uO+d*tca; float rm=length(pc); float H=.0072; 
    if(disc>0.&&-b-sqrt(disc)>0.){ float t=-b-sqrt(disc); vec3 p=normalize(uO+d*t); vec3 pr=vec3(p.x*cos(uSpin)-p.y*sin(uSpin),p.x*sin(uSpin)+p.y*cos(uSpin),p.z); pr=vec3(pr.y,pr.z,pr.x); vec4 m=em(pr); float px=t*uPxA; float det=smoothstep(.006,.0006,px); float fn=0.; if(det>0.) fn=(fine(pr)-.5)*det; float nl=dot(p,uSun); float day=smoothstep(-.10,.22,nl); float land=smoothstep(.4,.6,m.r+fn*.8); vec3 alb=mix(vec3(.010,.017,.030),mix(vec3(.10,.085,.055),vec3(.055,.06,.035),m.b),land); vec3 V=-d; vec3 hv=normalize(V+uSun); float nv=max(dot(p,V),0.); vec3 warm=mix(vec3(1.,.55,.30),vec3(1.,.94,.86),smoothstep(-.02,.24,nl)); vec3 sunl=warm*3.0*smoothstep(-.04,.30,nl)*(.05+max(nl,0.)); c=alb*sunl*1.3; float gl=pow(max(dot(p,hv),0.),70.)*(1.-land); c+=warm*gl*.9*day;
      float cl=clamp(m.g+fn*1.1*smoothstep(.05,.6,m.g+.1),0.,1.); vec4 m2=vec4(0.); float cs=em(normalize(pr+vec3(0.,0.,0.)+vec3(.004,.002,.004))).g; vec3 cc=vec3(.86,.85,.83)*(sunl*.62*(1.-.35*clamp(cs-cl+.2,0.,1.))+warm*.05*day); c=mix(c,cc,cl*.93);
      float path=1./max(nv,.06); float air=1.-exp(-.105*path); vec3 ac=mix(vec3(.50,.57,.68),vec3(.95,.60,.36),exp(-max(nl,0.)*9.))*.42; c=mix(c,ac*day*smoothstep(-.12,.5,nl),air*.5); al=1.; c+=vec3(.006,.007,.009); }
    // thin bright air at the limb
    { vec3 pn=normalize(pc); float alt=max(rm-1.,0.); float hit=disc>0.&&-b-sqrt(disc)>0.?1.:0.; float dens=exp(-alt/H); float nl=dot(pn,uSun); float lit=smoothstep(-.22,.18,nl); vec3 ac=mix(vec3(1.,.55,.28),vec3(.66,.74,.84),smoothstep(-.05,.30,nl)); float fw=.5+1.6*pow(max(mu,0.),5.); float a=dens*lit*fw; float w=smoothstep(-.06,.10,tca); if(hit<.5){ c+=ac*(a*.62+exp(-alt/(H*2.4))*lit*.05)*w; al=max(al,clamp(dens*1.2,0.,1.)*w); } }
    o=vec4(c,al)*uA; }`,
    { ...c(), uSun: N0, uO: new Ha(), uC: 0, uA: 1, uPxA: 0.001, uSpin: 0, tE: null },
    { blending: Ie, transparent: !0 },
  );
  ((_.material.blendSrc = pe), (_.material.blendDst = je));
  let R = new ge(),
    L =
      "precision highp float; in vec3 position; uniform mat4 viewMatrix,projectionMatrix; uniform vec4 uS; out vec3 vN,vP; void main(){ vN=position; vP=uS.xyz+position*uS.w; gl_Position=projectionMatrix*vec4(mat3(viewMatrix)*vP,1.); }",
    k = new ci(1, 160, 100),
    P = new ci(1, 96, 64),
    C = {
      uS: { value: new ie() },
      uSun: { value: new Ha(-0.2, 0.3, 1).normalize() },
      tN: { value: null },
      uTouch: { value: 0 },
      uTime: { value: 0 },
      uE: { value: 1 },
      uLib: { value: 0 },
    },
    A = new Zt(
      k,
      new ce({
        glslVersion: re,
        uniforms: C,
        vertexShader: L,
        fragmentShader: `precision highp float; in vec3 vN,vP; out vec4 o; uniform vec4 uS; uniform vec3 uSun; uniform sampler2D tN; uniform float uTouch,uTime,uE,uLib;
   void main(){ vec3 p=normalize(vN); vec3 f=vec3(-p.x,p.y,-p.z); float cl=cos(uLib),sl=sin(uLib); f.xz=mat2(cl,-sl,sl,cl)*f.xz; float x=max(f.x,-.28); vec2 q=f.zy/sqrt(1.+x); vec2 uv=q/1.18*.5+.5; vec4 t=texture(tN,uv); vec3 nn=t.xyz; nn.xz=mat2(cl,sl,-sl,cl)*nn.xz; vec3 n=normalize(vec3(-nn.x,nn.y,-nn.z)); vec3 V=normalize(-vP); float ng=dot(p,uSun); float relief=mix(1.15,1.0,smoothstep(.05,.7,ng)); n=normalize(mix(p,n,relief)); float nl=max(dot(n,uSun),0.)*smoothstep(-.10,.16,ng); float nv=max(dot(n,V),.08); float ls=nl/(nl+nv*.8+.08)*.62+nl*.62; float al=t.a; al=al*al*1.25+.03; vec3 alb=al*vec3(1.,.955,.895); vec3 c=alb*ls*vec3(1.,.94,.85)*1.75*(.4+.6*smoothstep(-.1,.7,ng))*uE; c+=(alb*.4+.13)*vec3(.62,.64,.68)*.13*(.35+.65*max(0.,dot(p,V)))*max(0.,.5-.5*p.x)*uE; float td=length(vP-(uS.xyz-vec3(uS.w,0.,0.)))/uS.w; c+=vec3(.86,.9,1.)*uTouch*(exp(-td*td*1400.)*5.+exp(-td*14.)*.42*(.8+.2*sin(uTime*2.6))+.35*smoothstep(.012,.0,abs(td-fract(uTime*.35)*.5))*(1.-fract(uTime*.35))); o=vec4(c,1.); }`,
      }),
    );
  ((A.frustumCulled = !1),
    R.add(A),
    (A.material.transparent = !0),
    (A.material.blending = Ie),
    (A.material.blendSrc = pe),
    (A.material.blendDst = wo));
  let N = (nt) => {
      let Mt = { uS: { value: new ie() }, uSun: { value: N0 }, uTime: { value: 0 }, uE: { value: 1 } },
        Et = new Zt(
          P,
          new ce({
            glslVersion: re,
            uniforms: Mt,
            vertexShader: L,
            fragmentShader: `precision highp float; in vec3 vN,vP; out vec4 o; uniform vec3 uSun; uniform float uTime,uE; ${Fe}
     void main(){ vec3 p=normalize(vN); vec3 V=normalize(-vP); float nl=dot(p,uSun); float nv=max(dot(p,V),0.); vec3 a; float rim=.0;
      ${nt === 0 ? "float n=fbm(p*2.2+3.),n2=fbm(p*7.); a=mix(vec3(.46,.25,.14),vec3(.20,.12,.085),smoothstep(.42,.62,n+n2*.15)); a=mix(a,vec3(.85,.80,.74),smoothstep(.88,.93,abs(p.y)+n2*.08)); rim=.25;" : nt === 1 ? "float la=p.y*9.+.45*(vnoise(vec3(p.xz*3.5,p.y*9.))-.5)+.25*vnoise(vec3(p.xz*9.,p.y*30.+2.)); float b=vnoise(vec2(la,1.5))*.6+vnoise(vec2(la*2.7,4.))*.4; float tb=fbm(vec3(p.x*6.,p.y*26.,p.z*6.)); a=mix(vec3(.80,.70,.56),vec3(.45,.28,.17),smoothstep(.35,.7,b+(tb-.5)*.35)); float sp=length((p-normalize(vec3(-.75,-.33,.55)))*vec3(1.,2.,1.)); a=mix(a,vec3(.55,.25,.14),smoothstep(.24,.15,sp)); rim=.3;" : nt === 2 ? "float b=vnoise(vec2(p.y*11.,2.))*.6+vnoise(vec2(p.y*27.,5.))*.4; a=mix(vec3(.82,.70,.50),vec3(.62,.50,.33),b); vec3 rn=normalize(vec3(.18,.92,.34)); float ts=-dot(p,rn)/dot(uSun,rn); vec3 rp=p+uSun*ts; float rr=length(rp); if(ts>0.&&rr>1.35&&rr<2.25) nl*=.35; rim=.3;" : "float b=fbm(vec3(p.x*2.,p.y*9.,p.z*2.)); a=mix(vec3(.46,.55,.64),vec3(.32,.40,.50),b); rim=.45;"}
      float l=smoothstep(-.05,.9,nl); l*=l*.55+.45; a=mix(vec3(dot(a,vec3(.3,.55,.15))),a,.62); a=pow(a,vec3(1.5)); vec3 c=a*l*vec3(1.,.93,.84)*1.8*uE; c+=vec3(1.,.8,.6)*rim*pow(1.-nv,3.)*smoothstep(-.1,.5,nl)*.9*uE; c+=a*.012; o=vec4(c,1.); }`,
          }),
        );
      return ((Et.frustumCulled = !1), R.add(Et), { m: Et, u: Mt });
    },
    G = [0, 1, 2, 3].map(N),
    B = G[2].u,
    ot = new hr(1.3, 2.3, 160, 1);
  {
    let nt = new qe().setFromUnitVectors(new Ha(0, 0, 1), new Ha(0.18, 0.92, 0.34).normalize());
    ot.applyQuaternion(nt);
  }
  let ut = new Zt(
    ot,
    new ce({
      glslVersion: re,
      uniforms: B,
      side: oe,
      transparent: !0,
      vertexShader: L,
      fragmentShader: `precision highp float; in vec3 vN,vP; out vec4 o; uniform vec3 uSun; uniform float uE; ${Fe} void main(){ float r=length(vN); float b=vnoise(vec2(r*26.,1.))*.5+vnoise(vec2(r*70.,3.))*.3+vnoise(vec2(r*9.,5.))*.35; float gap=smoothstep(.02,.05,abs(r-1.96)); float a=smoothstep(1.3,1.36,r)*smoothstep(2.3,2.24,r)*gap*(.35+.6*b); float t=-dot(vN,uSun); float sh=1.; if(t>0.||true){ float bb=dot(vN,uSun); float cc=dot(vN,vN)-1.; float ds=bb*bb-cc; if(ds>0.&&bb<0.) sh=mix(.06,1.,smoothstep(.06,0.,ds)); } o=vec4(vec3(.74,.62,.45)*.95*sh*uE*(.5+.6*b),1.)*a; o.a=a; }`,
    }),
  );
  ((ut.material.blending = Ie),
    (ut.material.blendSrc = pe),
    (ut.material.blendDst = je),
    (ut.frustumCulled = !1),
    R.add(ut));
  let lt = 8,
    Z = new Float32Array(lt * 3),
    H = new Float32Array(lt * 4),
    Y = new Oe();
  (Y.setAttribute("position", new ae([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, 1, 0], 3)),
    Y.setIndex([0, 1, 2, 0, 2, 3]));
  let q = new Ue(Z, 3),
    st = new Ue(H, 4);
  (q.setUsage(Vi), st.setUsage(Vi), Y.setAttribute("aP", q), Y.setAttribute("aS", st));
  let ct = { uRes: { value: new Nt() }, uTime: { value: 0 } },
    V = new Zt(
      Y,
      new ce({
        ...g,
        depthTest: !0,
        side: oe,
        uniforms: ct,
        vertexShader:
          "precision highp float; in vec3 position,aP; in vec4 aS; uniform mat4 viewMatrix,projectionMatrix; uniform vec2 uRes; out vec2 vU; out vec4 vC; void main(){ vec4 c=projectionMatrix*vec4(mat3(viewMatrix)*aP,1.); c.xy+=position.xy*aS.w*22./uRes*c.w; vU=position.xy*22.; vC=vec4(aS.rgb,1.); gl_Position=c; if(c.w<.02) gl_Position=vec4(2.,2.,2.,1.); }",
        fragmentShader:
          "precision highp float; in vec2 vU; in vec4 vC; out vec4 o; void main(){ float r=length(vU); float w=smoothstep(22.,8.,r); vec3 c=vC.rgb*(exp(-r*r*.9)*1.+.10*exp(-r*.75)+.012/(1.+r*r*.05))*w; o=vec4(c,0.); }",
      }),
    );
  ((V.frustumCulled = !1), (V.renderOrder = 30));
  let ft = new ge();
  return (
    ft.add(V),
    {
      bodies: R,
      moon: A,
      moonU: C,
      beads: G,
      ring: ut,
      sky: f,
      earth: _,
      kU: w,
      sU: m,
      init() {
        (s.render(e),
          (a.u.tA.value = e.texture),
          a.render(n),
          (n.texture.anisotropy = 8),
          (C.tN.value = n.texture),
          l.render(r),
          (_.u.tE.value = r.texture));
      },
      drawSky(
        nt,
        Mt,
        Et,
        { a: at = 1, stars: rt = 1, trav: U = 0, len: j = 0, streak: J = 0, clear: Pt = !0 } = {},
      ) {
        (Pt && (u(f, nt), (f.u.uA.value = at), (f.u.uTime.value = Et), f.render(Mt, !0)),
          (m.uTime.value = Et),
          (m.uA.value = rt),
          (m.uPx.value = i.H / 1080),
          (w.uTr.value = U),
          (w.uLen.value = j),
          (w.uA.value = J),
          w.uRes.value.set(i.W * 0.5, i.H * 0.5),
          (E.visible = J > 0.002),
          (b.visible = rt > 0.002),
          i.draw(T, nt, Mt, { clear: !1 }));
      },
      drawEarth(nt, Mt, Et, at, rt, U) {
        (u(_, nt),
          _.u.uO.value.copy(Et),
          (_.u.uC.value = at),
          (_.u.uA.value = rt),
          (_.u.uSpin.value = U),
          (_.u.uPxA.value = 2 / nt.projectionMatrix.elements[5] / i.H),
          _.render(Mt));
      },
      glow(nt, Mt, Et, at, rt, U, j, J) {
        ((Z[nt * 3] = Mt),
          (Z[nt * 3 + 1] = Et),
          (Z[nt * 3 + 2] = at),
          (H[nt * 4] = rt),
          (H[nt * 4 + 1] = U),
          (H[nt * 4 + 2] = j),
          (H[nt * 4 + 3] = J));
      },
      drawGlow(nt, Mt, Et, at) {
        ((Y.instanceCount = Et),
          (q.needsUpdate = st.needsUpdate = !0),
          ct.uRes.value.set(i.W * 0.5, i.H * 0.5),
          (ct.uTime.value = at),
          i.draw(ft, nt, Mt, { clear: !1 }));
      },
    }
  );
}

var oi = Math.tan(Math.PI / 180),
  Ba = 28,
  F0 = 16,
  HR = `precision highp float; in vec2 vS; in vec3 vC; in vec3 vW; out vec4 o; uniform float uTime;
void main(){ float x=abs(vS.x); float c=max(vW.y,.55); float e=min(1.,vW.y/.55);
 float core=smoothstep(c+.6,c-.6,x)*e; float halo=vW.z*(exp(-x/(c*.9+1.6))*.20+exp(-x/(c*2.2+5.))*.05);
 float edge=smoothstep(1.,.15,x/vW.x); float q=vS.y; float pu=1.; pu+=.55*smoothstep(.86,1.,sin(q*.9-uTime*5.2)*.5+.5)*exp(-abs(q)*.03); pu+=.25*sin(q*.21-uTime*1.7);
 o=vec4(vC*(core+halo)*edge*max(pu,.4),0.); }`;

function _b(i) {
  let t = F0 * (Ba + 1) * 2,
    e = new Float32Array(t * 3),
    n = new Float32Array(t * 2),
    o = new Float32Array(t * 3),
    s = new Float32Array(t * 3),
    a = new Qt(),
    r = (A, N, G) => {
      let B = new $t(N, G);
      return (B.setUsage(Vi), a.setAttribute(A, B), B);
    },
    l = r("position", e, 3),
    c = r("aS", n, 2),
    u = r("aC", o, 3),
    f = r("aW", s, 3),
    h = new Uint16Array(F0 * Ba * 6);
  for (let A = 0, N = 0; A < F0; A++)
    for (let G = 0; G < Ba; G++) {
      let B = A * (Ba + 1) * 2 + G * 2;
      ((h[N++] = B),
        (h[N++] = B + 1),
        (h[N++] = B + 2),
        (h[N++] = B + 1),
        (h[N++] = B + 3),
        (h[N++] = B + 2));
    }
  a.setIndex(new $t(h, 1));
  let d = new ce({
      glslVersion: re,
      depthWrite: !1,
      depthTest: !0,
      transparent: !0,
      side: oe,
      blending: Ie,
      blendSrc: pe,
      blendDst: pe,
      uniforms: { uTime: { value: 0 } },
      vertexShader:
        "precision highp float; in vec3 position; in vec2 aS; in vec3 aC,aW; out vec2 vS; out vec3 vC,vW; void main(){ vS=aS; vC=aC; vW=aW; gl_Position=vec4(position,1.); }",
      fragmentShader: HR,
    }),
    p = new Zt(a, d);
  ((p.frustumCulled = !1), (p.renderOrder = 20));
  let x = new F(),
    v = new F(),
    m = new F(),
    g = 0,
    b = 1,
    y = 1,
    S = -1,
    M = -1,
    w = 0.02,
    E = 1080,
    T = 1920,
    _ = new Qt(),
    R = new Float32Array(9);
  _.setAttribute("position", new $t(R, 3).setUsage(Vi));
  let L = new Float32Array(6);
  _.setAttribute("aS", new $t(L, 2).setUsage(Vi));
  let k = new ce({
      glslVersion: re,
      depthWrite: !1,
      depthTest: !0,
      transparent: !0,
      side: oe,
      blending: Ie,
      blendSrc: pe,
      blendDst: pe,
      uniforms: {
        uTime: { value: 0 },
        uA: { value: 1 },
        uC: { value: new F(1, 0.86, 0.6) },
        uPos: { value: new F() },
        uUnit: { value: 1 },
        uFl: { value: 1 },
      },
      vertexShader:
        "precision highp float; in vec3 position; in vec2 aS; uniform mat4 projectionMatrix,viewMatrix; out vec2 vS; out vec3 vP; void main(){ vS=aS; vP=position; gl_Position=projectionMatrix*vec4(mat3(viewMatrix)*position,1.); }",
      fragmentShader: `precision highp float; in vec2 vS; in vec3 vP; out vec4 o; uniform float uTime,uA,uUnit,uFl; uniform vec3 uC; float h(float n){ return fract(sin(n*91.7)*4375.5); } float vn(vec2 p){ vec2 i=floor(p),f=fract(p); f=f*f*(3.-2.*f); float n=i.x+i.y*57.; return mix(mix(h(n),h(n+1.),f.x),mix(h(n+57.),h(n+58.),f.x),f.y); }
    void main(){ float v=vS.y/max(vS.x,1e-5); if(v<0.||v>1.) discard; float d=length(vP); float th=0.; float fw=fwidth(v); float q=vP.x/uUnit;
     float n=vn(vec2(v*38.,q*.22-uTime*1.4)); float n2=vn(vec2(v*110.,q*.1-uTime*.9)); float lines=mix(.5,smoothstep(.45,.95,n)*.8+smoothstep(.6,1.,n2)*.7,smoothstep(.2,.02,fw*6.));
     float edge=exp(-v*26.)*.35+exp(-(1.-v)*20.)*1.; float fill=.10+.34*lines; float a=(edge*.6+fill*.5)*uA; a*=smoothstep(0.,.35,d/uUnit); a*=mix(1.,.35,smoothstep(8.,60.,d/uUnit)); o=vec4(uC*a,0.); }`,
    }),
    P = new Zt(_, k);
  ((P.frustumCulled = !1), (P.renderOrder = 18));
  let C = new ge();
  return (
    C.add(P, p),
    {
      scene: C,
      mesh: p,
      wedge: P,
      mat: d,
      wm: k,
      begin(A, N) {
        g = 0;
        let G = A.matrixWorld.elements;
        (x.set(G[0], G[1], G[2]), v.set(G[4], G[5], G[6]), m.set(-G[8], -G[9], -G[10]));
        let B = A.projectionMatrix.elements;
        ((b = B[0]),
          (y = B[5]),
          (S = B[10]),
          (M = B[14]),
          (w = A.near * 1.02),
          (E = i.H),
          (T = i.W),
          (d.uniforms.uTime.value = N),
          (k.uniforms.uTime.value = N));
      },
      line(
        A,
        N,
        G,
        B,
        ot,
        ut,
        {
          r: lt = 0.002,
          min: Z = 0.6,
          max: H = 1e4,
          c: Y,
          i: q = 1,
          halo: st = 1,
          a: ct = 1,
          b: V = 1,
          sa: ft = 0,
          sb: nt = 0,
          spread: Mt = 4,
          pad: Et = 14,
        } = {},
      ) {
        if (g >= F0 || q <= 5e-4) return;
        let at = A * m.x + N * m.y + G * m.z,
          rt = B * m.x + ot * m.y + ut * m.z;
        if (at < w && rt < w) return;
        let U = 0,
          j = 1;
        (at < w && (U = (w - at) / (rt - at)), rt < w && (j = (w - at) / (rt - at)));
        let J = B - A,
          Pt = ot - N,
          $ = ut - G,
          tt = A + J * U,
          W = N + Pt * U,
          D = G + $ * U,
          z = A + J * j,
          pt = N + Pt * j,
          ht = G + $ * j;
        ((at = tt * m.x + W * m.y + D * m.z), (rt = z * m.x + pt * m.y + ht * m.z));
        let gt = ((tt * x.x + W * x.y + D * x.z) * b) / at,
          dt = ((tt * v.x + W * v.y + D * v.z) * y) / at,
          Kt = ((z * x.x + pt * x.y + ht * x.z) * b) / rt,
          Ot = ((z * v.x + pt * v.y + ht * v.z) * y) / rt,
          Ut = gt,
          O = dt,
          I = Kt,
          et = Ot,
          Tt = 0,
          vt = 1;
        {
          let Q = Kt - gt,
            Lt = Ot - dt,
            yt = (It, St) => {
              if (Math.abs(It) < 1e-9) return St >= 0;
              let _t = St / It;
              if (It < 0) {
                if (_t > vt) return !1;
                _t > Tt && (Tt = _t);
              } else {
                if (_t < Tt) return !1;
                _t < vt && (vt = _t);
              }
              return !0;
            };
          if (!(yt(-Q, gt + 1.25) && yt(Q, 1.25 - gt) && yt(-Lt, dt + 1.25) && yt(Lt, 1.25 - dt))) return;
          ((Ut = gt + Q * Tt), (O = dt + Lt * Tt), (I = gt + Q * vt), (et = dt + Lt * vt));
        }
        let zt = -(et - O) * E,
          Ft = (I - Ut) * T,
          wt = Math.hypot(zt, Ft) || 1;
        ((zt /= wt), (Ft /= wt));
        let mt = 1 / at,
          Dt = 1 / rt,
          it = g * (Ba + 1) * 2,
          Rt = ft + (nt - ft) * U,
          xt = ft + (nt - ft) * j,
          Wt = ct + (V - ct) * U,
          Xt = ct + (V - ct) * j;
        for (let Vt = 0; Vt <= Ba; Vt++) {
          let Q = Vt / Ba,
            Lt = Tt + (vt - Tt) * Q,
            yt = mt + (Dt - mt) * Lt,
            It = 1 / yt,
            St = Ut + (I - Ut) * Q,
            _t = O + (et - O) * Q,
            Yt = (Lt * Dt) / yt,
            jt = Rt + (xt - Rt) * Yt,
            le = Wt + (Xt - Wt) * Yt,
            ye = Math.min(H, lt * y * E * 0.5 * yt),
            Jt = Math.max(Z * 0.5, ye),
            te = Jt * Mt + Et,
            se = Math.min(0.99999, (-S * It + M) * yt);
          for (let ee = -1; ee <= 1; ee += 2, it++) {
            ((e[it * 3] = St + (zt * te * ee * 2) / T),
              (e[it * 3 + 1] = _t + (Ft * te * ee * 2) / E),
              (e[it * 3 + 2] = se),
              (n[it * 2] = ee * te),
              (n[it * 2 + 1] = jt));
            let me = q * le;
            ((o[it * 3] = Y[0] * me),
              (o[it * 3 + 1] = Y[1] * me),
              (o[it * 3 + 2] = Y[2] * me),
              (s[it * 3] = te),
              (s[it * 3 + 1] = Jt),
              (s[it * 3 + 2] = st));
          }
        }
        g++;
      },
      sheet(A, N, G, B, ot, ut, lt = B * oi) {
        ((R[0] = A),
          (R[1] = N),
          (R[2] = G),
          (R[3] = A + B),
          (R[4] = N),
          (R[5] = G),
          (R[6] = A + B),
          (R[7] = N),
          (R[8] = G + lt),
          (L[0] = 0),
          (L[1] = 0),
          (L[2] = B * oi),
          (L[3] = 0),
          (L[4] = B * oi),
          (L[5] = B * oi),
          (_.attributes.position.needsUpdate = !0),
          (_.attributes.aS.needsUpdate = !0),
          (k.uniforms.uA.value = ut),
          (k.uniforms.uUnit.value = ot),
          (P.visible = ut > 0.001));
      },
      draw(A, N) {
        (a.setDrawRange(0, g * Ba * 6),
          (p.visible = g > 0),
          (l.needsUpdate = c.needsUpdate = u.needsUpdate = f.needsUpdate = !0),
          i.draw(C, A, N, { clear: !1 }));
      },
    }
  );
}

var BR =
    "precision highp float; in vec3 position; uniform mat4 projectionMatrix; uniform vec4 uRect; uniform float uPad,uRot; out vec2 vP; void main(){ vec2 h=uRect.zw*.5+uPad; vP=position.xy*2.*h; float s=sin(uRot),c=cos(uRot); gl_Position=projectionMatrix*vec4(uRect.xy+uRect.zw*.5+vec2(vP.x*c-vP.y*s,vP.x*s+vP.y*c),0.,1.); }",
  OR = `precision highp float; in vec2 vP; out vec4 o; uniform vec4 uRect; uniform vec3 uC,uB; uniform float uA,uRad,uSh,uPx,uBw; float sd(vec2 p,vec2 b,float r){ vec2 q=abs(p)-b+r; return length(max(q,0.))+min(max(q.x,q.y),0.)-r; }
void main(){ float d=sd(vP,uRect.zw*.5,uRad); float f=smoothstep(uPx*.6,-uPx*.6,d); float b=uBw>0.?smoothstep(uPx*.6,-uPx*.6,abs(d+uBw*.5)-uBw*.5):0.; float s=0.; if(uSh>0.){ float ds=sd(vP-vec2(0.,uSh*.35),uRect.zw*.5,uRad+2.); s=.42*exp(-max(ds,0.)/uSh*2.2)*(1.-f); } vec3 c=mix(uC,uB,b); float a=max(f,0.); o=vec4(c*a,a+s)*uA; }`,
  Qs = class {
    constructor({ c: t = [1, 1, 1], b: e = [0, 0, 0], rad: n = 0, sh: o = 0, bw: s = 0, order: a = 5 } = {}) {
      ((this.m = new ce({
        glslVersion: re,
        vertexShader: BR,
        fragmentShader: OR,
        transparent: !0,
        depthTest: !1,
        depthWrite: !1,
        side: oe,
        blending: Ie,
        blendSrc: pe,
        blendDst: je,
        uniforms: {
          uRect: { value: new ie() },
          uC: { value: new F(...t) },
          uB: { value: new F(...e) },
          uA: { value: 1 },
          uRad: { value: n },
          uSh: { value: o },
          uPad: { value: o ? o * 3 : 3 },
          uPx: { value: 1 },
          uBw: { value: s },
          uRot: { value: 0 },
        },
      })),
        (this.mesh = new Zt(new Ke(1, 1), this.m)),
        (this.mesh.frustumCulled = !1),
        (this.mesh.renderOrder = a));
    }
    set(t, e, n, o, s = 0) {
      return ((this.m.uniforms.uRot.value = s), this.m.uniforms.uRect.value.set(t, e, n, o), this);
    }
    alpha(t) {
      return ((this.m.uniforms.uA.value = t), (this.mesh.visible = t > 0.003), this);
    }
    px(t) {
      return ((this.m.uniforms.uPx.value = t), this);
    }
  },
  Nr = (i) => [i / 255, i / 255, i / 255];

function Tb(i, t) {
  let c = new Qs({ c: Nr(222), b: Nr(160), bw: 1.5, rad: 0, sh: 0, order: 30 }),
    u = new Qs({ c: Nr(242), b: Nr(160), bw: 1.5, sh: 34, order: 29 }),
    f = new Qs({ c: Nr(198), order: 31 }),
    h = new Qs({ c: Nr(204), order: 32 }),
    d = new Qs({ c: Nr(205), order: 32 }),
    p = (b, y, S) => {
      let M = i.text(b, { x: 702, y, size: 50, font: "arial", valign: "middle", color: S });
      return ((M.mesh.renderOrder = 40), M);
    },
    x = p("编辑", 145 + 84 / 2 + 1, "#1a1a1a");
  x.x = 684;
  let m = ["撤销", "剪切", "复制", "粘贴", "全选"].map((b, y) =>
    p(b, 241 + 90 * (y + 0.5) + 1, y === 0 ? "#959595" : "#1a1a1a"),
  );
  t.add(u, c, f, d, h, x, ...m);
  let g = [c, u, f, h, d];
  return (
    x.animate(),
    m.forEach((b) => b.animate()),
    {
      update(b, y, S, M, w, E) {
        let T = b > 0.002;
        for (let C of g) C.alpha(T ? 1 : 0).px(E);
        if (((x.mesh.visible = T), m.forEach((C) => (C.mesh.visible = T)), !T)) return;
        let _ = Ct(b / 0.18),
          R = bt.out3(Ct((b - 0.22) / 0.5)),
          L = M * 7 * Math.sin(w * 34),
          k = Math.max(2, 84 + 474 * R);
        (c.alpha(bt.out3(_)).set(650, 145, 620, 84),
          u.alpha(bt.out3(_)).set(650, 145, 620, k),
          f.alpha(Ct((b - 0.1) / 0.15)).set(656, 151, 152, 72),
          d.alpha(R > 0.4 ? 1 : 0).set(670, 601 - 0.5, 580, 2),
          R * 462 < 372 && d.alpha(0),
          (x.alpha = bt.out3(_)),
          (x.mesh.visible = x.alpha > 0.01));
        let P = 145 + k;
        (m.forEach((C, A) => {
          let N = 241 + 90 * A + 70.2;
          ((C.alpha = Ct((P - N) / 12)),
            (C.mesh.visible = C.alpha > 0.01),
            (C.mesh.position.x = C.x + (A === 0 ? L : 0)));
        }),
          h.alpha(S).set(655 + (Math.round(y) === 0 ? L : 0), 241 + 90 * Math.round(y), 610, 90));
      },
      box: { x: 650, y: 145, w: 620, h: 558 },
    }
  );
}

var ta = Math.PI / 180,
  k0 = 10 * oi,
  kr = 3844e5,
  Ab = 1737400,
  Qv = 40114e12,
  Fr = 6371e3,
  VR = kr * oi;

function fo(i) {
  let t = i.length,
    e = i.map((a) => a[0]),
    n = i.map((a) => a[1]),
    o = new Array(t).fill(0),
    s = [];
  for (let a = 0; a < t - 1; a++) s.push((n[a + 1] - n[a]) / (e[a + 1] - e[a]));
  for (let a = 1; a < t - 1; a++) o[a] = s[a - 1] * s[a] <= 0 ? 0 : (2 * s[a - 1] * s[a]) / (s[a - 1] + s[a]);
  return (
    i.forEach((a, r) => {
      a.length > 2 && (o[r] = a[2]);
    }),
    (a) => {
      if (a <= e[0]) return n[0];
      if (a >= e[t - 1]) return n[t - 1];
      let r = 0;
      for (; a > e[r + 1];) r++;
      let l = e[r + 1] - e[r],
        c = (a - e[r]) / l,
        u = c * c,
        f = u * c;
      return (
        n[r] * (2 * f - 3 * u + 1) +
        o[r] * l * (f - 2 * u + c) +
        n[r + 1] * (-2 * f + 3 * u) +
        o[r + 1] * l * (f - u)
      );
    }
  );
}

var vn = Math.log,
  Oo = 14,
  bh = 7.4,
  D0 = (i) => vn(kr * (1 + i / 57.29)),
  Rb = (i) => vn(Qv * (1 + i / 57.29)),
  uo = {
    lnX: fo([
      [0, vn(bh), 0],
      [1.25, vn(13.9), 0.9],
      [2.2, vn(1100), 2],
      [3.2, vn(4600), 1.2],
      [4, vn(12e4), 3.4],
      [4.7, vn(19e5), 2],
      [5.5, vn(9e6), 1.6],
      [6.2, vn(36e6), 2.4],
      [7, D0(-5.2), 0.06],
      [8.6, D0(-1.6), 0.023],
      [9.75, D0(-0.42), 0.02],
      [10.35, D0(1.2), 0.2],
      [11.05, vn(245e9), 0.5],
      [12.1, vn(475e9), 0.7],
      [13.25, Rb(-5), 0.14],
      [14, Rb(-1.05), 0.004],
    ]),
    gy: fo([
      [0, 0.24 / (bh * oi)],
      [0.6, 2],
      [1.25, 1.5],
      [2, 4],
      [3.1, 4.6],
      [3.9, 7.5],
      [4.6, 3.4],
      [5.3, 1.7],
      [6.1, 1.5],
      [7, 0.62],
      [8.6, 0.36],
      [9.6, 0.17],
      [10.9, 0.42],
      [12, 0.42],
      [14, 0.12],
    ]),
    gz: fo([
      [0, 0.66 / (bh * oi)],
      [0.65, 5.6],
      [1.25, 2.1],
      [2, 1.3],
      [3.1, 2.5],
      [3.9, 2.4],
      [4.6, 5.2],
      [5.3, 4.6],
      [6.1, 3.6],
      [7, 0.8],
      [8.6, 0.78],
      [9.7, 0.57],
      [10.9, 1.3],
      [12, 1.25],
      [14, 0.93],
    ]),
    yaw: fo([
      [0, 23.5],
      [0.6, 12],
      [1.25, 1],
      [2.2, -12],
      [3.2, -18],
      [3.9, -8],
      [4.5, 52],
      [5.1, 152],
      [5.7, 164],
      [6.4, 60],
      [7, 6],
      [8.6, 13],
      [9.2, 23],
      [9.8, 40],
      [10.15, 38],
      [10.6, 14],
      [11, 6],
      [12.2, 6],
      [14, 14],
    ]),
    pitch: fo([
      [0, -3],
      [0.6, -4],
      [1.25, 0],
      [2.2, -4],
      [3.2, -5.5],
      [3.9, -12],
      [4.6, -21],
      [5.4, -12],
      [6.2, -15],
      [7, -5],
      [8.6, -4],
      [9.8, -5],
      [10.9, -7],
      [12, -7],
      [14, -2],
    ]),
    roll: fo([
      [0, 0],
      [1.2, -2],
      [2.2, 5],
      [3.1, 2],
      [3.9, -5],
      [4.9, -14],
      [5.6, -9],
      [6.4, -4],
      [7, 0],
      [8.6, 1],
      [9.8, 6],
      [10.9, -3],
      [12, 2],
      [14, 0],
    ]),
    fov: fo([
      [0, 31],
      [1.2, 50],
      [2.3, 54],
      [3.1, 46],
      [3.9, 54],
      [4.9, 50],
      [5.6, 44],
      [6.4, 46],
      [7, 34],
      [8.6, 37],
      [9.8, 55],
      [10.9, 46],
      [12, 48],
      [14, 40],
    ]),
    tip: fo([
      [0, 1],
      [1, 9],
      [13, 9],
    ]),
  };

function Cb(i) {
  let t = 0,
    e = Oo;
  for (let n = 0; n < 50; n++) {
    let o = (t + e) / 2;
    uo.lnX(o) < vn(i) ? (t = o) : (e = o);
  }
  return t;
}

// ── scene aim · "Aim" · enterWith: line ──
var U0 = Cb(14),
  H0 = Cb(15e4),
  Pb = {
    id: "aim",
    title: "瞄准",
    enterWith: "line",
    hud: { color: "#e9e1d2", font: "monoMed" },
    beats: [
      { dur: 5, delay: 1.2, hold: 3, page: "\u221E" },
      { dur: 5, hold: 3.5, page: "\u221E" },
      { dur: Oo, hold: 3.5, page: "\u221E" },
      { dur: 5, hold: 5, page: "\u221E" },
    ],
    notes: [
      "此前的一切都假设了一件事：它会朝着我们想让它去的地方。对齐问题问的是，它到底想要什么。",
      "假设我们几乎做对了，只偏了一度。十米之外，就是十七厘米。而每一次演示、每一次测试，都发生在十米。",
      "但这一度会一直延续下去。到月球，你偏了大约 6700 公里，差不多两个月亮。到最近的恒星，你偏了 4700 个日地距离。这只是几何：一度的正切乘以距离。",
      "而面对一个有能力阻止我们修改它的系统，可能没有第二次机会。",
    ],
    create(i) {
      let { gfx: t, view: e } = i,
        n = t.target({ samples: 4, depth: !0 }),
        o = t.target({}),
        s = i.overlay(),
        a = new Ye(35, 1, 0.03, 80),
        r = wb(t),
        l = Sb(t),
        c = Eb(t),
        u = _b(t),
        f = Tb(i, s),
        h = t.pass(
          Fe +
            "uniform float uA,uK; uniform vec2 uOff; void main(){ vec2 p=(vUv-.5)*vec2(uRes.x/uRes.y,1.); float f=fbm(p*vec2(9.,26.))*.5+fbm(p*vec2(40.,8.)+3.)*.5; vec3 pap=vec3(1.,.86,.66)*(.58+.40*f)*(.95-.45*dot(p,p)); float n=fbm(p*1.6/(1.+uK)+uOff)+.5*fbm(p*4.+uOff*2.)-.25; float a=uA; if(uK>=0.&&uOff.x!=0.){ pap=mix(vec3(.20,.20,.205),vec3(.62,.50,.37),smoothstep(-.8,1.1,p.x+n*.9)); a=smoothstep(1.-uA*1.6,1.8-uA*1.6,n*.5+.4)*min(1.,uA*1.5); } o=vec4(pap*a,a); }",
          { uA: 0, uK: 0, uOff: new Nt() },
          { blending: Ie, transparent: !0 },
        );
      ((h.material.blendSrc = pe), (h.material.blendDst = je));
      let d = t.pass(
          "uniform sampler2D tA; uniform vec2 uC; uniform float uK; float ign(vec2 p){ return fract(52.9829189*fract(dot(p,vec2(.06711056,.00583715)))); } void main(){ vec2 d=vUv-uC; float j=ign(gl_FragCoord.xy); vec3 c=vec3(0.); for(int i=0;i<15;i++){ float f=((float(i)+j*.8)/15.-.5)*uK; c+=min(texture(tA,uC+d*(1.+f)).rgb,vec3(30.)); } o=vec4(c/15.,1.); }",
          { tA: null, uC: new Nt(0.5, 0.5), uK: 0 },
        ),
        p = "#f1e9da",
        x = "#17181b",
        v = i.text(
          "它到底\n想要什么？",
          { x: 120, y: 250, size: 112, font: "display", color: p, valign: "middle", leading: 1.16 },
        ),
        m = i.text(
          "偏了\n一度。",
          { x: 120, y: 240, size: 88, font: "display", color: p, valign: "middle", leading: 1.16 },
        ),
        g = i.text("10 米：17 厘米", { x: 0, y: 0, size: 36, font: "monoMed", color: x, valign: "middle" }),
        b = i.text("月球：6700 公里", {
          x: 0,
          y: 0,
          size: 38,
          font: "monoMed",
          color: p,
          align: "center",
          valign: "middle",
        }),
        y = i.text("最近的恒星：日地距离的 4700 倍", {
          x: 960,
          y: 900,
          size: 34,
          font: "monoMed",
          color: p,
          align: "center",
          valign: "middle",
        }),
        S = i.text("没有撤销。", {
          x: 960,
          y: 850,
          size: 96,
          font: "display",
          color: p,
          align: "center",
          valign: "middle",
        }),
        M = [0, 1, 2].map(() => new Qs({ c: [1, 1, 1], order: 8 })),
        w = new i.SelectBox({ handle: 7, line: 2 });
      s.add(...M, v, m, g, b, y, S, w);
      let E = (V, ft, nt, Mt, Et, at, rt = 12, U = 2) => {
          let j = Math.hypot(nt - V, Mt - ft),
            J = at;
          M.forEach((W) => {
            (W.m.uniforms.uC.value.set(...J), W.alpha(Et).px(1 / e.ppu));
          });
          let Pt = Math.atan2(Mt - ft, nt - V),
            $ = (V + nt) / 2,
            tt = (ft + Mt) / 2;
          (M[0].set($ - j / 2, tt - U / 2, j, U, Pt),
            M[1].set(V - U / 2, ft - rt, U, rt * 2, Pt),
            M[2].set(nt - U / 2, Mt - rt, U, rt * 2, Pt));
        },
        T = { X: bh, px: 0, py: 0, pz: 0, yaw: 0, pitch: 0, roll: 0, fov: 35, unit: 1, ride: !1 },
        _ = new F(),
        R = new F(),
        L = new F(),
        k = new F(),
        P = { uA: 0 },
        C = {},
        A = (V, ft, nt, Mt) => {
          (ft && !C[V] && Mt.dt > 0 && Mt.dir > 0 && Mt.enter >= 0 && nt(), (C[V] = ft));
        },
        N = (V, ft, nt) => (
          _.set(V, ft, nt).project(a),
          [e.x0 + (_.x * 0.5 + 0.5) * e.w, e.y0 + (-_.y * 0.5 + 0.5) * e.h, _.z]
        ),
        G = (V, ft, nt) => {
          if ((_.set(V, ft, nt).applyQuaternion(B), _.z > -0.001)) return null;
          let Mt = a.projectionMatrix.elements;
          return [
            e.x0 + (((_.x * Mt[0]) / -_.z) * 0.5 + 0.5) * e.w,
            e.y0 + (-((_.y * Mt[5]) / -_.z) * 0.5 + 0.5) * e.h,
          ];
        },
        B = new qe(),
        ot = new Cn(0, 0, 0, "YXZ"),
        ut = [1, 0.8, 0.5],
        lt = [0.8, 0.82, 0.86],
        Z = {};
      function H(V, ft) {
        let nt = V.k(0, -0.6, 3.6, bt.io3),
          Mt = nt * 80 * ta,
          Et = K(1.72, 1.78, nt),
          at = -0.3 - Et * Math.sin(Mt),
          rt = K(0.015, 0.27, nt),
          U = Et * Math.cos(Mt) + 0.02,
          j = 90 - 80 * nt,
          J = -5.5 * nt,
          Pt = K(31, 33, nt),
          $ = V.t;
        ((at += 0.03 * Math.sin($ * 0.23) * nt),
          (rt += 0.012 * Math.sin($ * 0.31)),
          (U += 0.03 * Math.sin($ * 0.19 + 1) * nt),
          (j += 0.5 * Math.sin($ * 0.17) * nt));
        let tt = V.k(1, 0.25, 3.4, bt.lin);
        if (tt > 0) {
          let W = q(V),
            D = (Kt) => Kt(tt),
            z = Y.x(tt),
            pt = Y.y(tt),
            ht = Y.z(tt),
            gt = kt(tt / 0.16);
          ((at = K(at, z + W * (1 - kt((tt - 0.72) / 0.28)) + bh * kt((tt - 0.72) / 0.28) * 1, gt)),
            (rt = K(rt, pt, gt)),
            (U = K(U, ht, gt)),
            (j = K(j, Y.yaw(tt), gt)),
            (J = K(J, Y.pitch(tt), gt)),
            (Pt = K(Pt, Y.fov(tt), gt)));
          let dt = V.k(1, 3, 5, bt.io3);
          ((at += dt * 0.05 * Math.sin($ * 0.21)),
            (rt += dt * 0.02 * Math.sin($ * 0.27)),
            (U += dt * 0.05 * Math.sin($ * 0.18 + 0.6)),
            (j += dt * 0.7 * Math.sin($ * 0.18 + 0.6)));
        }
        return [at, rt, U, j, J, 0, Pt];
      }
      let Y = {
          x: fo([
            [0, -1.9],
            [0.25, -0.75],
            [0.6, -0.72],
            [0.8, -1.1],
            [1, 0],
          ]),
          y: fo([
            [0, 0.27],
            [0.25, 0.13],
            [0.6, 0.1],
            [1, 0.24],
          ]),
          z: fo([
            [0, 0.34],
            [0.25, 0.62],
            [0.6, 0.66],
            [1, 0.66],
          ]),
          yaw: fo([
            [0, 10],
            [0.25, 34],
            [0.55, 40],
            [0.8, 22.5],
            [1, 23.5],
          ]),
          pitch: fo([
            [0, -5.5],
            [0.3, -5],
            [0.6, -4],
            [1, -3],
          ]),
          fov: fo([
            [0, 33],
            [0.3, 40],
            [0.7, 39],
            [1, 31],
          ]),
        },
        q = (V) => {
          let ft = V.k(1, 0.3, 3.3, bt.lin);
          return 0.08 + 9.93 * (0.1 * bt.out3(ft * 4) + 0.9 * Math.pow(ft, 1.15));
        };
      return {
        async init() {
          c.init();
          let V = { t: 0, q: 1 };
          (a.position.set(-0.3, 0, 1.7),
            a.quaternion.setFromEuler(ot.set(0, -0.2, 0)),
            (a.aspect = t.aspect),
            (a.near = 0.03),
            (a.far = 60),
            a.updateProjectionMatrix(),
            a.updateMatrixWorld(),
            B.copy(a.quaternion).invert(),
            r.set({ t: 0, cam: a.position }),
            r.draw(a, n, V, 1),
            l.draw(a, n, 0, L.set(3e3, 400, 0), 0, 0, 500),
            c.drawSky(a, n, 0, { streak: 1, len: 0.5 }),
            c.drawEarth(a, n, k.set(0.1, 1.1, 0), 0.22, 1, 0),
            (c.moon.visible = c.ring.visible = !0),
            c.moonU.uS.value.set(4, 0, 0, 0.3),
            c.beads.forEach((ft, nt) => {
              ((ft.m.visible = !0), ft.u.uS.value.set(5 + nt, 0, 0, 0.3));
            }),
            t.draw(c.bodies, a, n, { clear: !1 }),
            u.begin(a, 0),
            u.line(-1, -0.1, -1, 5, -0.1, -3, { c: ut }),
            u.sheet(-5, -0.1, -1, 20, 1, 0.1),
            u.draw(a, n),
            c.glow(0, 3, 0, -1, 1, 1, 1, 2),
            c.drawGlow(a, n, 1, 0),
            (h.u.uA.value = 0.5),
            h.render(n),
            (d.u.tA.value = n.texture),
            (d.u.uK.value = 0.05),
            d.render(o));
        },
        enter() {
          C = {};
          for (let V of [
            "loose",
            "hit",
            "paper",
            "cloud",
            "moon",
            "bead0",
            "bead1",
            "star",
            "menu",
            "u0",
            "u1",
            "u2",
            "u3",
            "sh",
          ])
            C[V] = !0;
          C.fresh = !0;
        },
        update(V) {
          let ft = V.at(2),
            nt = V.p[2] > 0,
            Mt = V.t,
            [Et, at, rt, U, j, J, Pt] = H(V),
            $ = Et,
            tt = Math.max($, 0.02) * oi;
          if (nt) {
            let Jt = kt(ft / 0.8);
            $ = Math.exp(uo.lnX(ft));
            let te = V.since(2);
            tt = $ * oi;
            let se = uo.gy(ft) * tt,
              ee = uo.gz(ft) * tt;
            ((Et = ft < 1.5 ? K(Et, $, Jt) : $),
              ($ = Et),
              (tt = $ * oi),
              (at = K(at, se, Jt)),
              (rt = K(rt, ee, Jt)),
              (U = K(U, uo.yaw(ft), Jt)),
              (j = K(j, uo.pitch(ft), Jt)),
              (J = uo.roll(ft)),
              (Pt = uo.fov(ft)));
          }
          let W = V.k(2, Oo - 1.2, Oo, bt.io3),
            D = W * (1 - Math.exp(-Math.max(0, V.since(2) - Oo) / 40)),
            z = 0;
          if (W > 0) {
            let te = 1.05 - D * 0.25;
            $ = Qv * (1 - te / 57.29);
            let se = $ * oi;
            ft >= Oo - 0.001
              ? ((tt = se),
                (at = uo.gy(ft) * tt * (1 + 0.06 * Math.sin(Mt * 0.13) * W)),
                (rt = uo.gz(ft) * tt * (1 + 0.02 * Math.sin(Mt * 0.1) * W)))
              : ($ = Et);
          }
          let pt = Math.max(1, 16 / 9 / t.aspect);
          ((a.aspect = t.aspect), (a.fov = (2 * Math.atan(Math.tan((Pt * ta) / 2) * pt)) / ta));
          let ht = V.mouse.x * 2.2,
            gt = V.mouse.y * 1.4;
          (ot.set((j + gt) * ta, -90 * ta + (U - ht) * ta, J * ta),
            a.quaternion.setFromEuler(ot),
            a.position.set(Et, at, rt),
            B.copy(a.quaternion).invert());
          let dt = $ < 14;
          (dt ? a.position.set(Et, at, rt) : a.position.set(0, 0, 0),
            (a.near = dt ? 0.03 : 0.02),
            (a.far = dt ? 60 : 3e3),
            a.updateProjectionMatrix(),
            a.updateMatrixWorld(),
            (Z.X = $),
            (Z.y = at),
            (Z.z = rt),
            (Z.unit = tt),
            (Z.yaw = U),
            (Z.T2 = ft),
            (Z.ride = nt),
            (Z.inRange = dt),
            (Z.rate = nt ? (uo.lnX(ft + 0.02) - uo.lnX(ft - 0.02)) / 0.04 : 0),
            (ft >= Oo || ft <= 0) && (Z.rate = 0));
          let Kt = V.at(1) - 0.3,
            Ot = V.p[1] > 0 && Kt > 0,
            Ut = q(V),
            O = V.k(1, 0.3, 3.3, bt.lin),
            I = V.k(0, -1.2, 2.6, bt.io3),
            et = (1 - (Ot ? 1 : 0)) * I,
            Tt = K(0.82, 1, I) + et * 0.004 * Si(Mt * 17),
            vt = Ot ? Math.exp(-Kt * 2.2) * Math.cos(Kt * 46) : 0;
          Ot && (Tt = Math.max(0, 1 - Kt * 14) - 0);
          let zt = -0.2 - 0.52 * Tt;
          ((r.bowU.uDraw.value = Ot ? Math.max(0, Tt) + vt * 0.1 : Tt), (r.bowU.uVib.value = vt * 0.6));
          let Ft = V.k(1, 3.28, 3.3, bt.lin),
            wt = Math.max(0, V.at(1) - 3.3) + (V.p[1] >= 1 ? Math.max(0, V.since(1) - 5) : 0);
          (r.shU.uHit.value.set(0, k0, wt, Ft), (r.shU.uHole.value = Ft));
          let mt = Ot ? Ut : zt + 0.8,
            Dt = nt ? uo.tip(ft) : 0;
          (nt && (mt = Math.max(mt, 10.01 + Fn(ft / 1.2) * 14)), (Z.tip = mt));
          let it = mt * oi;
          (r.arrow.position.set(
            mt,
            Ot ? 0 : 8e-4 * Si(Mt * 23),
            (Ot ? mt * oi : 0) + (Ot ? 0 : 0.0012 * Si(Mt * 19 + 5)),
          ),
            (r.arrow.rotation.y = Ot ? -1 * ta : 0),
            (r.arrow.visible = mt < 13.9),
            (r.arU.uFlex.value = Ot
              ? 0.022 * Math.exp(-Kt * 0.9) * Math.cos(Kt * 15) * (Ft ? 0 : 1) +
                Ft * 0.02 * Math.exp(-wt * 2.2) * Math.cos(wt * 38)
              : 0),
            (r.arU.uHot.value =
              (0.55 + 0.25 * Math.sin(Mt * 2.1) + (Ot ? 0.4 : 0)) * (1 - 0.85 * Ft * (1 - V.k(2, 0, 0.4)))),
            (r.shojiU.uPass.value = nt ? kt((ft - U0 + 0.75) / 0.4) : 0),
            r.set({ t: Mt, cam: a.position }),
            (Z.nock = mt - 0.8),
            (Z.string = Ot ? -0.2 - 0.05 * vt : zt),
            (Z.draw = r.bowU.uDraw.value),
            (Z.vib = vt),
            (Z.loosed = Ot),
            v.show(V.k(0, 1.6, 3.4, bt.lin), { style: "rise", by: "word", q: V.k(1, 0, 0.9, bt.lin) }),
            m.show(V.k(1, 3.5, 4.9, bt.lin), { style: "rise", by: "word", q: V.k(2, 0, 0.8, bt.lin) }),
            M.forEach((Jt) => Jt.alpha(0)));
          let Rt = V.k(2, 0, 0.5, bt.lin),
            xt = V.k(1, 3.7, 4.8, bt.out4);
          if (xt > 0 && Rt < 1 && dt) {
            let Jt = N(10, -0.12, 0),
              te = N(10, -0.12, k0);
            E(
              Jt[0],
              (Jt[1] + te[1]) / 2,
              K(Jt[0], te[0], xt),
              (Jt[1] + te[1]) / 2,
              1 - Rt,
              [0.09, 0.095, 0.105],
            );
            let se = N(10, -0.5, k0 / 2);
            ((g.x = (Jt[0] + te[0]) / 2 - g.width / 2),
              (g.y = (Jt[1] + te[1]) / 2 + 44),
              g.mesh.position.set(g.x, g.y, 0));
          }
          g.show(V.k(1, 4, 4.9, bt.lin), { style: "blur", q: Rt, by: "word" });
          let Wt = (kr - $) / tt,
            Xt = Ab / tt;
          ((Z.moon = nt && $ > 3e6 && $ < kr * 3 ? 1 : 0), (Z.mx = Wt), (Z.mr = Xt));
          let Vt = Ct((ft - 7.2) / 1),
            Q = Ct((ft - 9) / 0.4);
          if (Z.moon && Vt > 0 && Q < 1) {
            let Jt = G(Wt, -at / tt, -rt / tt),
              te = G(Wt, -at / tt, (VR / tt) * 1 - rt / tt);
            if (Jt && te) {
              let se = bt.out4(Vt);
              (E(
                Jt[0],
                Jt[1],
                K(Jt[0], te[0], se),
                K(Jt[1], te[1], se),
                (1 - Q) * 0.9,
                [0.95, 0.91, 0.85],
                14,
                2.2,
              ),
                (b.x = K(Jt[0], te[0], 0.56)),
                (b.y = K(Jt[1], te[1], 0.56) + 54),
                (b.rotation = Math.atan2(te[1] - Jt[1], te[0] - Jt[0])),
                b.mesh.position.set(b.x, b.y, 0));
            }
          }
          b.show(Ct((ft - 7.5) / 1.1), { style: "blur", q: Q, by: "word" });
          let Lt = (Qv - $) / tt;
          ((Z.sx = Lt), (Z.star = nt && $ > 1e14));
          let yt = V.k(2, Oo - 0.9, Oo, bt.lin);
          if ((y.show(yt, { style: "blur", by: "word", q: V.k(3, 0, 0.7, bt.lin) }), w.alpha(0), Z.star)) {
            let Jt = G(Lt, -at / tt, -rt / tt),
              te = V.k(2, Oo - 0.45, Oo, bt.lin);
            if (Jt && te > 0) {
              let se = Mt * 0.85,
                ee = Math.floor(se),
                me = bt.io4(Ct((se - ee) * 2.2)),
                be = (Ge, yn) => {
                  let si = Math.sin(Ge * 91.7 + yn * 37.3) * 4375.5;
                  return si - Math.floor(si);
                },
                Ae = (Ge) => {
                  let yn = be(Ge, 1) < 0.4 ? 0.25 : 1;
                  return [
                    (be(Ge, 2) - 0.5) * 190 * yn,
                    (be(Ge, 3) - 0.5) * 220 * yn,
                    44 + 70 * be(Ge, 4) * yn,
                    34 + 56 * be(Ge, 5) * yn,
                  ];
                },
                ln = Ae(ee),
                mn = Ae(ee + 1),
                un = [0, 1, 2, 3].map((Ge) => K(ln[Ge], mn[Ge], me)),
                Re = Math.max(Jt[0], e.x0 + 110) + un[0] * (Jt[0] < e.x0 + 150 ? 0.4 : 1),
                Ne = Jt[1] + un[1];
              (w.set(Re - un[2] / 2, Ne - un[3] / 2, un[2], un[3]).appear(te), (Z.starS = Jt));
            }
          }
          let It = V.k(3, 0.2, 1.3, bt.lin),
            St = V.at(3),
            _t = 4,
            Yt = 0,
            jt = 0;
          if (St > 1.2) {
            Yt = 1;
            let Jt = Ct((St - 1.35) / 1.25);
            if (((_t = 4 - Math.min(4, Math.floor(Jt * 4.999))), St > 2.6)) {
              let te = St < 4.99 ? St - 2.9 : (V.since(3) - 2.9) % 4.2,
                se = te < 1.4 ? Math.max(0, 1 - Math.abs(((te % 0.7) - 0.18) / 0.18)) : 0;
              jt = St < 2.9 ? 0 : se;
            }
          }
          (f.update(It, _t, Yt, jt, Mt, 1 / e.ppu),
            S.show(V.k(3, 2.8, 4.6, bt.lin), { style: "rise", by: "word" }));
          let le = i.audio;
          V.exit < 0.5 &&
            (le.param("tension", V.p[1] > 0 ? 0.25 : 0.35 + 0.5 * I),
            le.param("wind", nt ? Ct(Z.rate / 4) : 0),
            le.param("speed", nt ? Ct(Z.rate / 4) : 0));
          let ye = (Jt, te, se) => {
            C.fresh ? (C[Jt] = te) : A(Jt, te, se, V);
          };
          (ye("creak", V.p[0] > 0.02, () => i.sfx("creak", { gain: 0.8 })),
            ye("loose", Ot, () => {
              (i.sfx("snap", { gain: 1 }), i.sfx("whoosh", { gain: 0.5, pitch: 1.4 }));
            }),
            ye("hit", Ft > 0.5, () => i.sfx("thud", { gain: 0.7, pitch: 1.4 })),
            ye("paper", nt && ft > U0 - 0.35, () => {
              (i.sfx("paper", { gain: 0.6 }), i.sfx("whoosh", { gain: 1 }));
            }),
            ye("cloud", nt && ft > H0 - 0.4, () => i.sfx("whoosh", { gain: 0.8, pitch: 0.8 })),
            ye("moon", nt && ft > 7.2, () => i.sfx("sub", { gain: 0.9 })),
            ye("away", nt && ft > 10, () => i.sfx("whoosh", { gain: 1, pitch: 0.7 })),
            ye("star", nt && ft > Oo - 1.3, () => i.sfx("sub", { gain: 0.7, pitch: 0.8 })),
            ye("menu", St > 0.2, () => i.sfx("click", { gain: 0.6 })));
          for (let Jt = 0; Jt < 5; Jt++)
            ye("u" + Jt, St > 1.35 + Jt * 0.25, () => i.sfx("tick", { gain: 0.4 }));
          (ye("sh0", St > 3, () => i.sfx("tick", { gain: 0.5, pitch: 0.6 })),
            ye("sh1", St > 3.7, () => i.sfx("tick", { gain: 0.5, pitch: 0.6 })),
            (C.fresh = !1));
        },
        exit() {
          for (let V of ["tension", "wind", "speed"]) i.audio.param(V, 0);
        },
        render(V, ft) {
          let { X: nt, y: Mt, z: Et, unit: at, T2: rt, ride: U, inRange: j } = Z,
            J = ft.t,
            Pt = 1,
            $ = 0.5,
            tt = 1,
            W = 0.34,
            D = [0.012, 0.011, 0.01];
          if ((u.begin(a, J), j)) {
            r.draw(a, n, ft, 1);
            let ht = a.position.x,
              gt = a.position.y,
              dt = a.position.z,
              Kt = 1 - kt((ft.enter - 0.55) / 0.45) * kt(ft.t / 3.2),
              Ot = 0.32 + 0.25 * ft.k(1, 0, 1) + Kt * 2.2,
              Ut = r.limb(1, Z.draw, Z.vib),
              O = r.limb(-1, Z.draw, Z.vib),
              I = [0.62, 0.56, 0.47];
            if (
              (u.line(Ut[0] - ht, Ut[1] - gt, -dt, Z.string - ht, -gt, -dt, {
                r: 0.0011,
                min: 0.9,
                c: I,
                i: 0.55,
                halo: 0,
                pad: 3,
                spread: 1,
              }),
              u.line(O[0] - ht, O[1] - gt, -dt, Z.string - ht, -gt, -dt, {
                r: 0.0011,
                min: 0.9,
                c: I,
                i: 0.55,
                halo: 0,
                pad: 3,
                spread: 1,
              }),
              u.line(-ht, -gt, -dt, 10 - ht, -gt, -dt, {
                r: 0.001,
                min: 1.2,
                c: lt,
                i: Ot * 1.2,
                halo: 0.8,
                sa: 0,
                sb: 57,
                a: 1,
                b: 1,
              }),
              Kt > 0.01 &&
                u.line(-8 - ht, -gt, -dt, 14 - ht, -gt, -dt, {
                  r: 0.0035,
                  min: 2,
                  c: ut,
                  i: 3.2 * Kt,
                  halo: 2,
                  sa: -40,
                  sb: 60,
                }),
              !Z.loosed)
            ) {
              let Tt = 3 + 0.7 * Math.sin(J * 2.1);
              u.line(Z.nock + 0.04 - ht, -gt, -dt, Z.tip - ht, -gt, Z.tip * oi * 0 - dt, {
                r: 0.0016,
                min: 1.4,
                c: ut,
                i: Tt,
                halo: 1.6,
                sa: -4,
                sb: 0,
                a: 0.25,
                b: 1,
              });
            }
            if (Z.loosed) {
              let Tt = r.shojiU.uPass.value;
              u.mat.depthTest = Tt < 0.3;
              let vt = Tt > 0.3 ? 14 + 60 * kt((Tt - 0.3) / 0.7) : Math.min(Z.tip - 0.78, 14);
              (Tt > 0.3 &&
                u.line(10 - ht, -gt, -dt, vt - ht, -gt, -dt, {
                  r: 0.001,
                  min: 1.4,
                  c: lt,
                  i: 1.1,
                  halo: 0.8,
                  sa: 57,
                  sb: 400,
                  a: 1,
                  b: 0.8,
                }),
                u.line(-ht, -gt, -dt, vt - ht, -gt, vt * oi - dt, {
                  r: 0.0022,
                  min: 1.6,
                  c: ut,
                  i: 2.6,
                  halo: 1.4,
                  sa: 0,
                  sb: vt * 5.7,
                  a: 0.7,
                  b: 1,
                }),
                u.sheet(-ht, -gt, -dt, Math.min(Z.tip, 10), k0, 0.16 * ft.k(1, 0.6, 1.4)));
            } else u.sheet(0, 0, 0, 1, 1, 0);
            u.draw(a, n);
            let et = Z.tip * oi;
            (c.glow(0, Z.tip - ht, -gt, et - dt, 2, 1.55, 0.9, 2.2 + (Z.loosed ? 1 : 0)),
              (u.mat.depthTest = !0),
              Z.tip < 13.9 && c.drawGlow(a, n, 1, J),
              (Pt = 1),
              (W = 0.42),
              ($ = 0.55),
              (tt = 1.1));
          } else {
            u.mat.depthTest = !0;
            let ht = kt((vn(nt) - vn(3e4)) / (vn(6e5) - vn(3e4)));
            L.set(nt, Mt, Et);
            let gt = 1 / at,
              dt = kt((vn(nt) - vn(12e4)) / (vn(22e5) - vn(12e4))),
              Kt = nt > 9e4 && nt < 3e9,
              Ot = !0;
            if (nt < 15e4) {
              let xt = 2.2 + (0.135 * nt) / (1 + nt / 7200);
              (l.draw(a, n, J, L, Z.yaw * ta, ht, Math.max(1.5, Mt + xt)), (Ot = !1));
            }
            if (nt >= 15e4) {
              let xt = dt,
                Wt = Z.trav || 0,
                Xt = Ct(Z.rate / 2.4),
                Vt = kt((vn(nt) - vn(5e7)) / 3);
              c.drawSky(a, n, J, {
                a: 0.25 + 0.75 * dt,
                stars: xt,
                trav: ct(ft),
                len: 0.05 + 1.5 * kt((Z.rate - 0.4) / 5),
                streak: Vt * (0.45 + 0.2 * Xt) * (1 - 0 * ft.k(3, 0, 1)),
              });
            }
            if (Kt && nt >= 15e4) {
              k.set(nt / Fr, 1 + Mt / Fr, Et / Fr);
              let xt = (nt / Fr) ** 2 + (Et / Fr) ** 2 + (2 * Mt) / Fr + (Mt / Fr) ** 2;
              c.drawEarth(a, n, k, xt, 1 - kt((vn(nt) - vn(1e9)) / 1), -0.35 + J * 0.004);
            }
            (st(rt), t.r.setRenderTarget(n), t.r.clear(!1, !0, !1));
            let Ut = -Mt * gt,
              O = -Et * gt;
            c.moon.visible = !!Z.moon && Z.mx > -30 && Z.mx < 3e3;
            let I = c.moonU;
            (I.uS.value.set(Z.mx, Ut, O, Z.mr), (I.uTime.value = J));
            {
              let xt = kt((rt - 7) / 2.7);
              I.uSun.value.set(K(-0.3, 0.95, xt), K(0.3, 0.22, xt), K(1, 0.5, xt)).normalize();
            }
            ((I.uTouch.value = kt((rt - 7) / 0.8)), (I.uE.value = kt((vn(nt) - vn(2e6)) / 2.5)));
            let et = nt < 15e4 && nt > 200;
            ((c.moon.material.blendDst = et ? pe : wo),
              et &&
                ((c.moon.visible = !0),
                I.uS.value.set(2400, Ut, O, (2400 * Ab) / kr),
                (I.uE.value = 0.9),
                (I.uTouch.value = 0)),
              et &&
                (c.beads.forEach((xt) => {
                  xt.m.visible = !1;
                }),
                (c.ring.visible = !1),
                t.draw(c.bodies, a, n, { clear: !1 }),
                (c.moon.visible = !1)));
            let Tt = [
              [3e11, 0.3],
              [3e11 * Math.exp(0.16), 0.72],
              [3e11 * Math.exp(0.3), 0.42],
              [3e11 * Math.exp(0.42), 0.36],
            ];
            (c.beads.forEach((xt, Wt) => {
              let [Xt, Vt] = Tt[Wt],
                Q = (Xt - nt) * gt;
              ((xt.m.visible = nt > 8e9 && Q > -30 && Q < 1500),
                xt.u.uS.value.set(Q, Ut, O, Vt),
                (xt.u.uTime.value = J),
                (xt.u.uE.value = 1));
            }),
              (c.ring.visible = c.beads[2].m.visible),
              (c.moon.visible || (nt > 2e9 && nt < 1e14)) && t.draw(c.bodies, a, n, { clear: !1 }));
            let vt = -57.29,
              zt = Z.moon && nt < kr * 1.2 ? Z.mx - Z.mr * 0.995 : Z.star ? Z.sx : 2600,
              Ft = Math.min(zt, 2600),
              wt = 60,
              mt = nt < 15e4 ? 1 : 0,
              Dt = 1800;
            (Z.moon && Z.mx < 0 && nt < kr * 1.05 && Z.mx < -1e-4
              ? u.line(vt, Ut, O, Z.mx - Z.mr * 0.995, Ut, O, {
                  r: 0.002,
                  min: 1.5,
                  max: 4,
                  c: lt,
                  i: 0.8,
                  halo: 0.8,
                  sa: vt,
                  sb: Z.mx,
                  a: 0.6,
                  b: 0.9,
                })
              : u.line(vt, Ut, O, Ft, Ut, O, {
                  r: 0.002,
                  min: 1.5,
                  max: 4,
                  c: lt,
                  i: 0.8 + mt * 0.5,
                  halo: 0.8,
                  sa: vt,
                  sb: Ft,
                  a: 0.6,
                  b: 0.9,
                }),
              u.line(vt, Ut, O, Dt, Ut, O + (Dt + 57.29) * oi, {
                r: 0.003,
                min: 2,
                max: 7,
                c: ut,
                i: 2.5 + mt * 1.2,
                halo: 1.5,
                sa: vt,
                sb: Dt,
                a: 0.6,
                b: 0.9,
              }),
              u.sheet(vt, Ut, O, 57.29 + 220, 1, 0.062 + 0.05 * mt, (57.29 + 220) * oi),
              u.draw(a, n));
            let Rt = 0;
            if ((c.glow(Rt++, Dt, Ut, O + (Dt + 57.29) * oi, 1.6, 1.3, 0.8, 2.6), Z.star)) {
              let xt = kt((vn(nt) - vn(3e15)) / 2.2);
              c.glow(Rt++, Z.sx, Ut, O, 4.2 * xt, 1.9 * xt, 1 * xt, 2.3);
              let Wt = 2.75;
              (c.glow(
                Rt++,
                Z.sx + 1.6,
                Ut + 0.62 * Wt * 0.4,
                O - Wt * 0.22,
                2.6 * xt,
                2.15 * xt,
                1.5 * xt,
                2.6,
              ),
                c.glow(
                  Rt++,
                  Z.sx + 1.6,
                  Ut + 0.62 * Wt * 0.4 - 0.012,
                  O - Wt * 0.22 + 0.022,
                  1.9 * xt,
                  1.35 * xt,
                  0.8 * xt,
                  2,
                ));
            }
            (c.drawGlow(a, n, Rt, J), (Pt = 1), ($ = 0.5), (tt = 1.1), (W = nt < 15e4 ? 0.3 : 0.25));
          }
          let z = n,
            pt = Ct(Z.rate * (nt < 15e4 ? 0.0055 : 0.004), 0, nt < 15e4 ? 0.1 : 0.026);
          if (pt > 0.004) {
            let ht = G(100, 0, 0);
            ht &&
              ((d.u.tA.value = n.texture),
              d.u.uC.value.set((ht[0] - e.x0) / e.w, 1 - (ht[1] - e.y0) / e.h),
              (d.u.uK.value = pt),
              d.render(o),
              (z = o));
          }
          (t.post(z, V, {
            bloom: $,
            threshold: tt,
            tone: "agx",
            exposure: Pt,
            contrast:
              1.1 +
              (nt > 14 && nt < 15e4 ? 0.16 * kt((vn(nt) - 2.7) / 2) * (1 - kt((vn(nt) - vn(4e4)) / 1.3)) : 0),
            saturation: 1.06,
            grain: 0.035,
            vignette: W,
            lift: D,
            gain: [1, 0.992, 0.975],
            halation: 0.6,
            time: J,
          }),
            s.render(V));
        },
      };
      function st(V) {
        let ft = V < U0 ? 0 : 1 - kt((V - U0) / 0.7);
        ft > 0.002 && ((h.u.uA.value = ft), h.u.uOff.value.set(0, 0), (h.u.uK.value = -1), h.render(n));
        let nt = kt((V - H0 + 0.45) / 0.42) * (1 - kt((V - H0 - 0.05) / 0.55));
        nt > 0.002 &&
          ((h.u.uA.value = nt),
          (h.u.uK.value = (V - H0) * 0.8 + 0.5),
          h.u.uOff.value.set(3.1 + V * 0.7, 1.7),
          h.render(n));
      }
      function ct(V) {
        let ft = V.at(2);
        return uo.lnX(ft) * 12 + V.t * 0.5;
      }
    },
  };

var B0 = `
precision highp float; precision highp int; precision highp sampler2D; precision highp sampler3D;
uniform float uTime,uT,uWorld,uMode,uWind,uCool,uOpen,uSea,uClip; uniform vec3 uSunL,uSunV,uCamP; uniform vec4 uDF,uDN; uniform sampler2D tBF,tBN,tNo; uniform vec2 uScr;
#define PI 3.14159265
float sat(float x){return clamp(x,0.,1.);} float lum(vec3 c){return dot(c,vec3(.2126,.7152,.0722));}
float h11(float p){p=fract(p*.1031);p*=p+33.33;p*=p+p;return fract(p);}
float h12(vec2 p){vec3 p3=fract(vec3(p.xyx)*.1031);p3+=dot(p3,p3.yzx+33.33);return fract((p3.x+p3.y)*p3.z);}
vec3 sunC(){ return mix(vec3(3.1,2.35,1.55)*(1.+.22*uOpen),vec3(1.62,1.76,1.90),1.-uWorld)*mix(vec3(1),vec3(.86,.95,1.04),uCool*(1.-.4*uWorld)); }
vec3 skyBase(vec3 d){ float y=max(d.y,0.), m=max(dot(d,uSunV),0.); vec3 c;
 if(uWorld>.5){ c=mix(vec3(.15,.35,.66),vec3(.026,.105,.30),smoothstep(.02,.24,y)); vec3 hz=mix(vec3(.46,.58,.66),vec3(1.0,.70,.40),pow(m,8.)); c=mix(c,hz,exp(-y*17.)*.9); c+=vec3(.92,.76,.46)*pow(m,22.)*.07+vec3(1.,.70,.38)*(pow(m,80.)*.24+pow(m,520.)*.9)*(1.+.3*uOpen); }
 else { c=mix(vec3(.056,.072,.087),vec3(.021,.029,.039),smoothstep(.0,.26,y)); vec3 hz=mix(vec3(.112,.136,.156),vec3(.23,.262,.285),pow(m,10.)); c=mix(c,hz,exp(-y*15.)*.95); c+=vec3(.80,.91,1.)*(pow(m,40.)*.030+pow(m,420.)*.10+pow(m,3000.)*.35); c*=mix(vec3(1),vec3(.80,.92,1.06),uCool); }
 return c; }
vec3 ambient(vec3 n){ float u=n.y*.5+.5; return uWorld>.5? mix(vec3(.13,.13,.10),vec3(.26,.37,.58),u)+vec3(.19,.145,.085)*sat(n.z*.6+.4) : mix(vec3(.040,.050,.063),vec3(.112,.132,.154),u*u); }
vec4 baked(vec2 p){ vec2 n=(p-uDN.xy)*uDN.zw; vec2 f=(p-uDF.xy)*uDF.zw; vec2 e=abs(n-.5); if(max(e.x,e.y)<.492) return textureLod(tBN,n,0.); return textureLod(tBF,f,0.); }
float shadow(vec3 w,float soft){ vec4 b=baked(w.xz); float s=smoothstep(b.r-soft,b.r+soft,w.y+soft*.3); if(uWorld>.5) s*=mix(.36,1.,smoothstep(.28,.52,texture(tNo,w.xz*.0105+vec2(uT*.0022,uT*.0006)+.13).r+.12*uOpen)); return s; }
vec3 air(vec3 c,vec3 w){ vec3 v=w-uCamP; float d=length(v); v/=d; float hh=exp(-max(w.y,0.)*.045); float k=uWorld>.5?.0036:.0042; float t=1.-exp(-max(d-12.,0.)*k*hh*(1.+d*.0040)); vec3 a=skyBase(normalize(vec3(v.x,max(v.y,.0)*.5+.035,v.z))); return mix(c,a*(uWorld>.5?vec3(.86,.93,1.04):vec3(.95,1.,1.)),t); }
float gust(vec2 p){ vec2 q=p*.035+vec2(-.06,.022)*uT; float g=texture(tNo,q).r; return g*g*1.9+.25*texture(tNo,p*.16+vec2(-.2,.05)*uT).g; }
`,
  GR = `
out vec4 o; void fin(vec3 c,vec3 w){ if(uMode>.5){ o=vec4(w.y,0.,0.,1.); return; } if(uClip>.5&&w.y<uSea-.02) discard; o=vec4(min(air(c,w),vec3(60.)),1.); }
void finS(vec3 c){ o=vec4(min(c,vec3(60.)),1.); }
`;

function Lb(i) {
  let t = i.target({ w: 256, h: 256, mips: !0, wrap: an, type: Nn });
  i.pass(
    Bn +
      `
   float n(vec2 p,float per){ vec2 i=floor(p),f=fract(p); f=f*f*f*(f*(f*6.-15.)+10.); vec2 a=mod(i,per),b=mod(i+1.,per); return mix(mix(hash12(a),hash12(vec2(b.x,a.y)),f.x),mix(hash12(vec2(a.x,b.y)),hash12(b),f.x),f.y); }
   float F(vec2 u,float per,float s){ float a=.5,v=0.; for(int i=0;i<5;i++){ v+=a*n(u*per+s*17.,per); per*=2.; a*=.5; } return v/.97; }
   float W(vec2 u,float per){ vec2 p=u*per,i=floor(p); float m=9.; for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){ vec2 c=i+vec2(x,y); vec2 q=c+hash22(mod(c,per))-p; m=min(m,dot(q,q)); } return sqrt(m); }
   void main(){ o=vec4(smoothstep(.12,.88,F(vUv,4.,0.)),smoothstep(.1,.9,F(vUv,8.,3.)),W(vUv,16.),hash12(gl_FragCoord.xy)); }`,
  ).render(t);
  let n = 64,
    o = new Uint8Array(n * n * n * 2),
    s = new Float32Array(1024 * 32 * 4);
  {
    let f = 12345,
      h = () => {
        f = (Math.imul(f ^ (f >>> 15), 1 | f) + 1831565813) | 0;
        let d = f;
        return ((d = Math.imul(d ^ (d >>> 14), 61 | d)), ((d ^ (d >>> 11)) >>> 0) / 4294967296);
      };
    for (let d = 0; d < s.length; d++) s[d] = h();
  }
  let a = (f, h, d, p) => ((((f % p) + p) % p) + (((h % p) + p) % p) * 32 + (((d % p) + p) % p) * 1024) * 4,
    r = (f, h, d, p) => {
      let x = Math.floor(f),
        v = Math.floor(h),
        m = Math.floor(d),
        g = 9;
      for (let b = -1; b <= 1; b++)
        for (let y = -1; y <= 1; y++)
          for (let S = -1; S <= 1; S++) {
            let M = a(x + S, v + y, m + b, p),
              w = x + S + s[M] - f,
              E = v + y + s[M + 1] - h,
              T = m + b + s[M + 2] - d,
              _ = w * w + E * E + T * T;
            _ < g && (g = _);
          }
      return Math.sqrt(g);
    },
    l = (f) => f * f * f * (f * (f * 6 - 15) + 10),
    c = (f, h, d, p) => {
      let x = Math.floor(f),
        v = Math.floor(h),
        m = Math.floor(d),
        g = l(f - x),
        b = l(h - v),
        y = l(d - m),
        S = (w, E, T) => s[a(x + w, v + E, m + T, p) + 3],
        M = (w, E, T) => w + (E - w) * T;
      return M(
        M(M(S(0, 0, 0), S(1, 0, 0), g), M(S(0, 1, 0), S(1, 1, 0), g), b),
        M(M(S(0, 0, 1), S(1, 0, 1), g), M(S(0, 1, 1), S(1, 1, 1), g), b),
        y,
      );
    };
  for (let f = 0, h = 0; f < n; f++)
    for (let d = 0; d < n; d++)
      for (let p = 0; p < n; p++, h += 2) {
        let x = p / n,
          v = d / n,
          m = f / n,
          g =
            (c(x * 4, v * 4, m * 4, 4) * 0.5 +
              c(x * 8, v * 8, m * 8, 8) * 0.28 +
              c(x * 16, v * 16, m * 16, 16) * 0.16) /
            0.94,
          b = 1 - r(x * 4, v * 4, m * 4, 4),
          y = 1 - r(x * 9, v * 9, m * 9, 9),
          S = b * 0.62 + y * 0.38;
        ((S = S * 0.55 + g * 0.6),
          (o[h] = Math.max(0, Math.min(255, ((S - 0.22) / 0.72) * 255))),
          (o[h + 1] = Math.max(0, Math.min(255, (y * 0.7 + g * 0.3) * 255))));
      }
  let u = new $o(o, n, n, n);
  return (
    (u.format = Qi),
    (u.type = $e),
    (u.minFilter = u.magFilter = He),
    (u.wrapS = u.wrapT = u.wrapR = an),
    (u.unpackAlignment = 1),
    (u.needsUpdate = !0),
    { noise: t.texture, vol: u }
  );
}

function t2(i, t) {
  let e = (n, o, s) => ({ value: new F(n, o, s).normalize() });
  return {
    uTime: { value: 0 },
    uT: { value: 0 },
    uWorld: { value: i },
    uMode: { value: 0 },
    uWind: { value: 1 },
    uCool: { value: 0 },
    uOpen: { value: 0 },
    uSea: { value: 0 },
    uClip: { value: 0 },
    uSunL: e(0.78, 0.52, -0.34),
    uSunV: e(-0.022, 0.097, -1),
    uCamP: { value: new F() },
    uDF: { value: new ie(-112, -176, 1 / 224, 1 / 216) },
    uDN: { value: new ie(-13, 11, 1 / 26, 1 / 18) },
    tBF: { value: null },
    tBN: { value: null },
    tNo: { value: t.noise },
    uScr: { value: new Nt(1, 1) },
  };
}

function pn(i, t, e, n = {}) {
  let {
      uniforms: o = {},
      transparent: s = !1,
      side: a = lo,
      depthWrite: r = !0,
      depthTest: l = !0,
      blending: c = Fo,
      premult: u = !1,
    } = n,
    f = { ...i };
  for (let h in o) f[h] = o[h] && typeof o[h] == "object" && "value" in o[h] ? o[h] : { value: o[h] };
  return new ce({
    glslVersion: re,
    uniforms: f,
    vertexShader:
      B0 +
      `uniform mat4 projectionMatrix,viewMatrix; in vec3 position;
` +
      t,
    fragmentShader: B0 + GR + e,
    transparent: s,
    side: a,
    depthWrite: r,
    depthTest: l,
    blending: c,
    premultipliedAlpha: u,
  });
}

function cn(i, t, e = 0) {
  let n = new Zt(i, t);
  return ((n.frustumCulled = !1), (n.renderOrder = e), (n.matrixAutoUpdate = !1), n);
}

function Gn(i, t, e) {
  let n = new Oe();
  n.index = i.index;
  for (let o in i.attributes) n.setAttribute(o, i.attributes[o]);
  for (let o in e) {
    let [s, a, r] = e[o],
      l = new Ue(s, a);
    (r && l.setUsage(Vi), n.setAttribute(o, l));
  }
  return ((n.instanceCount = t), n);
}

function e2(i, t, e, n, o, s, a = []) {
  let r = e[n].value,
    l = r.x,
    c = r.y,
    u = 1 / r.z,
    f = 1 / r.w,
    h = i.target({ w: o, h: o, depth: !0, type: An }),
    d = i.target({ w: o, h: o, type: Nn }),
    p = new Ci(-u / 2, u / 2, f / 2, -f / 2, 1, 200);
  (p.position.set(l + u / 2, 120, c + f / 2),
    p.up.set(0, 0, 1),
    p.rotation.set(-Math.PI / 2, 0, 0),
    p.updateMatrixWorld(!0));
  let x = a.map((b) => b.visible);
  (a.forEach((b) => (b.visible = !1)), (e.uMode.value = 1));
  let v = e.tBF.value,
    m = e.tBN.value;
  ((e.tBF.value = e.tBF.value || null),
    i.r.setRenderTarget(h),
    i.r.setClearColor(0, 1),
    i.r.clear(!0, !0, !1),
    i.r.render(t, p),
    (e.uMode.value = 0),
    a.forEach((b, y) => (b.visible = x[y])));
  let g = i.pass(
    `uniform sampler2D tA; uniform vec3 uL; uniform vec2 uWD; uniform float uStep;
   float H(vec2 u){ return texture(tA,vec2(u.x,1.-u.y)).r; } // u.y grows with z
   void main(){ vec2 u=vec2(vUv.x,vUv.y); float h0=H(u); vec2 dir=normalize(uL.xz); float tn=uL.y/length(uL.xz); float S=-20.; float t=uStep*1.2;
    for(int i=0;i<110;i++){ vec2 q=u+dir*t/uWD; if(any(greaterThan(abs(q-.5),vec2(.5))))break; S=max(S,H(q)-t*tn); t*=1.045; t+=uStep*.35; }
    float ao=0.,wS=0.; for(int k=0;k<40;k++){ float a=float(k)*2.399963, r=uStep*(1.+float(k)*float(k)*.05); vec2 q=u+vec2(cos(a),sin(a))*r/uWD; float e=atan(max(0.,H(q)-h0-.01)/r)/1.5708; ao+=e; wS+=1.; }
    o=vec4(S,clamp(1.-ao/wS*1.35,0.,1.),h0,1.); }`,
    { tA: h.texture, uL: s, uWD: new Nt(u, f), uStep: u / o },
  );
  return (g.render(d), g.dispose(), { out: d, h });
}

var ho = { x: 0, y: 7.2, z: 34, tan: Math.tan((17 * Math.PI) / 180) },
  Ib = 0,
  Nb = -0.9,
  xi = { x: -1.72, z: 19.6 },
  ea = new Uint8Array(512);

{
  let i = ze(77),
    t = Array.from({ length: 256 }, (e, n) => n);
  for (let e = 255; e > 0; e--) {
    let n = (i() * (e + 1)) | 0;
    [t[e], t[n]] = [t[n], t[e]];
  }
  for (let e = 0; e < 512; e++) ea[e] = t[e & 255];
}

var qR = (i, t) => {
    let e = Math.floor(i),
      n = Math.floor(t),
      o = i - e,
      s = t - n,
      a = o * o * o * (o * (o * 6 - 15) + 10),
      r = s * s * s * (s * (s * 6 - 15) + 10),
      l = e & 255,
      c = n & 255,
      u = ea[ea[l] + c],
      f = ea[ea[l + 1] + c],
      h = ea[ea[l] + c + 1],
      d = ea[ea[l + 1] + c + 1];
    return (u + (f - u) * a + (h - u) * r + (u - f - h + d) * a * r) / 127.5 - 1;
  },
  Yi = (i, t, e = 4) => {
    let n = 0,
      o = 0.5;
    for (let s = 0; s < e; s++) {
      n += o * qR(i, t);
      let a = i * 1.6 - t * 1.2;
      ((t = i * 1.2 + t * 1.6 + 7.3), (i = a + 3.1), (o *= 0.5));
    }
    return n;
  },
  Dr = (i, t, e) => {
    let n = Math.max(e - Math.abs(i - t), 0) / e;
    return Math.max(i, t) + n * n * e * 0.25;
  },
  vi = (i, t, e) => kt(Ct((e - i) / (t - i)));

function n2(i, t, e) {
  let n = -9;
  for (let o = 0; o < e.length - 1; o++) {
    let s = e[o],
      a = e[o + 1],
      r = a[0] - s[0],
      l = a[1] - s[1],
      c = Ct(((i - s[0]) * r + (t - s[1]) * l) / (r * r + l * l)),
      u = s[0] + r * c - i,
      f = s[1] + l * c - t,
      h = K(s[3], a[3], c),
      d = K(s[2], a[2], c),
      p = (u * u + f * f) / (h * h);
    n = Math.max(n, (d + 3.4) * Math.exp(-p) - 3.4);
  }
  return n;
}

var WR = [
    [-52, 16, 9, 15],
    [-40, -10, 12, 15],
    [-33, -32, 11, 13],
    [-42, -70, 16, 18],
    [-60, -95, 18, 22],
  ],
  XR = [
    [60, -22, 15, 15],
    [42, -28, 12.5, 12],
    [27, -35, 9.5, 9.5],
    [15, -40, 6.2, 7],
    [8, -42, 4.4, 5],
    [4, -42.6, 2.2, 4],
  ],
  YR = [
    [40, 14, 8, 12],
    [32, -2, 9.5, 11],
    [30, -12, 6, 8],
  ],
  zb = [
    [4.6, 28],
    [3.4, 25.6],
    [1.6, 23.6],
    [0.1, 21.8],
    [-0.55, 20.4],
    [0.2, 19],
    [2.2, 18.2],
    [4.6, 17.6],
    [7, 16.4],
    [9, 14.8],
    [10.4, 13],
  ];

function wh(i) {
  let t = zb.length - 1,
    e = Ct(i) * t,
    n = Math.min(t - 1, Math.floor(e)),
    o = e - n,
    s = (f) => zb[Ct(f, 0, t)],
    a = s(n - 1),
    r = s(n),
    l = s(n + 1),
    c = s(n + 2),
    u = (f) =>
      0.5 *
      (2 * r[f] +
        (-a[f] + l[f]) * o +
        (2 * a[f] - 5 * r[f] + 4 * l[f] - c[f]) * o * o +
        (-a[f] + 3 * r[f] - 3 * l[f] + c[f]) * o * o * o);
  return [u(0), u(1)];
}

var i2 = Array.from({ length: 90 }, (i, t) => wh(t / 89)),
  o2 = (i, t) => {
    if (t < 11 || t > 31 || i < -3 || i > 13) return 9;
    let e = 81;
    for (let n = 0; n < i2.length; n++) {
      let o = i2[n][0] - i,
        s = i2[n][1] - t,
        a = o * o + s * s;
      a < e && (e = a);
    }
    return Math.sqrt(e);
  },
  Mh = (i, t) =>
    vi(0, 1, 1 - Math.hypot((i + 22) / 11, (t + 16) / 17)) * vi(-0.2, 0.5, 1) +
    vi(0, 0.9, 1 - Math.hypot((i - 21) / 5, (t - 1) / 9)),
  Tc = (i, t) => vi(0, 0.5, 1 - Math.hypot((i - 17.5) / 15, (t + 35) / 8.5));

function Sh(i, t) {
  let e = Yi(i * 0.045 + 4, t * 0.045, 3) * 5,
    n = Yi(i * 0.045 - 9, t * 0.045 + 5, 3) * 5,
    o = i + e,
    s = t + n,
    a = -3.6;
  if (
    ((a = Dr(a, n2(o, s, WR), 2)),
    (a = Dr(a, n2(i + e * 0.35, t + n * 0.35, XR), 1.6)),
    (a = Dr(a, n2(o, s, YR), 2)),
    (a = Dr(
      a,
      (1.9 + 3.4) * Math.exp(-(((i + e * 0.3 - 9.3) / 4.4) ** 2 + ((t + n * 0.3 + 10) / 3.4) ** 2)) - 3.4,
      1,
    )),
    (a = Dr(
      a,
      (1.1 + 3.4) * Math.exp(-(((i + e * 0.3 + 9) / 2.2) ** 2 + ((t + n * 0.3 + 27) / 2) ** 2)) - 3.4,
      1,
    )),
    t < -60)
  ) {
    let d = vi(8, 34, Math.abs(i + 5 + e * 0.6)),
      p = 1 - Math.abs(Yi(i * 0.022 + 11, t * 0.03, 5)) * 1.9,
      x = vi(-72, -118, t) * d;
    a = Dr(
      a,
      x * (7 + 17 * Math.max(0, p) * vi(0, 60, Math.abs(i))) * (0.55 + 0.45 * vi(0, 1, p)) - 3.4 * (1 - x),
      2,
    );
  }
  a += Yi(i * 0.16, t * 0.16, 4) * 0.17 * Ct(a + 2.4, 0, 7);
  let r = vi(0, 1, 1 - Math.hypot((i + 17) / 9, (t + 27) / 10));
  if (r > 0 && a > -1 && a < 6) {
    let d = (a + 1) / 7;
    a = K(a, -1 + 7 * vi(0.16, 0.6, d), r * 0.85);
  }
  let l =
      (i < -1.7
        ? 4.4 - 0.085 * (i + 1.7)
        : 4.4 - 0.02 * (i + 1.7) - 0.19 * Math.max(0, i - 0.2) - 0.012 * Math.max(0, i - 2) ** 2) +
      (t > 20 ? 0.03 * (t - 20) : 0),
    c = 16.6 + Yi(i * 0.2, 3, 3) * 1.6 - 0.1 * Math.max(0, i),
    u = K(-3.6, l, vi(c - 7.5, c + 1.4, t)) + Yi(i * 0.33, t * 0.33, 3) * 0.22,
    f = vi(6, 12, t);
  a = K(a, Dr(a, u, 0.8), f);
  let h = Math.hypot(i - xi.x, t - xi.z);
  return ((a = K(a, Math.max(a, 4.46), vi(1.6, 0.3, h) * 0.8)), a);
}

function En(i, t) {
  let e = Sh(i, t),
    n = Math.min(1, Mh(i, t));
  if (n > 0.01 && e > 0.35 && e < 7.5) {
    let a = e / 0.42,
      r = Math.floor(a),
      l = a - r;
    e = K(e, (r + vi(0.62, 0.98, l)) * 0.42, n * 0.9);
  }
  let o = Tc(i, t);
  if (o > 0.01 && e > 0.3) {
    let a = e / 0.42,
      r = Math.floor(a),
      l = a - r;
    e = K(e, (r + vi(0.62, 0.96, l)) * 0.42, o * 0.9);
  }
  return e;
}

function s2(i, t = 480, e = 570, n = 4, o = 235, s = 0.95) {
  let a = (t + 1) * (e + 1),
    r = new Float32Array(a * 3),
    l = new Float32Array(a * 3),
    c = new Float32Array(a * 4),
    u = 0,
    f = new Float32Array(a);
  for (let v = 0; v <= t; v++) {
    let m = n * Math.pow(o / n, v / t),
      g = ho.z - m;
    for (let b = 0; b <= e; b++, u++) {
      let y = m * s * ((2 * b) / e - 1),
        S = i(y, g);
      ((f[u] = S),
        (r[u * 3] = y),
        (r[u * 3 + 1] = S),
        (r[u * 3 + 2] = g),
        (c[u * 4] = o2(y, g)),
        (c[u * 4 + 1] = Math.min(1, Mh(y, g))),
        (c[u * 4 + 2] = a2(y, g, S)),
        (c[u * 4 + 3] = Tc(y, g)));
    }
  }
  let h = (v, m) => Ct(v, 0, t) * (e + 1) + Ct(m, 0, e);
  for (let v = 0, m = 0; v <= t; v++)
    for (let g = 0; g <= e; g++, m++) {
      let b = h(v, g - 1),
        y = h(v, g + 1),
        S = h(v - 1, g),
        M = h(v + 1, g),
        w = r[y * 3] - r[b * 3] || 1,
        E = (f[y] - f[b]) / w,
        T = r[M * 3 + 2] - r[S * 3 + 2],
        _ = r[m * 3],
        R = f[S],
        k = (f[M] - R - E * (r[M * 3] - r[S * 3])) / T,
        P = 1 / Math.hypot(E, 1, k);
      ((l[m * 3] = -E * P), (l[m * 3 + 1] = P), (l[m * 3 + 2] = -k * P));
    }
  let d = new Uint32Array(t * e * 6),
    p = 0;
  for (let v = 0; v < t; v++)
    for (let m = 0; m < e; m++) {
      let g = v * (e + 1) + m,
        b = g + 1,
        y = g + e + 1,
        S = y + 1;
      ((d[p++] = g), (d[p++] = b), (d[p++] = y), (d[p++] = b), (d[p++] = S), (d[p++] = y));
    }
  let x = new Qt();
  return (
    x.setAttribute("position", new $t(r, 3)),
    x.setAttribute("normal", new $t(l, 3)),
    x.setAttribute("aM", new $t(c, 4)),
    x.setIndex(new $t(d, 1)),
    x
  );
}

function a2(i, t, e) {
  if (e < 0.55 || t > 13) return 0;
  let n = Yi(i * 0.09 + 20, t * 0.09 - 8, 3),
    o = vi(-0.22, 0.12, n + 0.04 * Math.max(0, e - 3));
  return (
    (o *= 1 - Math.min(1, Mh(i, t) * 1.15)),
    (o *= 1 - vi(0.22, 0.55, Tc(i, t))),
    (o *= vi(0.5, 0.9, e)),
    (o *= 1 - vi(13, 19, e + n * 4)),
    o
  );
}

var KR = () => {
    let i = new Qt();
    return (i.setAttribute("position", new $t(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3)), i);
  },
  jR = B0.replace("uniform float uTime,uT,", "uniform float uT,").replace(
    "precision highp sampler2D; precision highp sampler3D;",
    "",
  );

function Fb(i, t, e, n) {
  let o = i.target({ scale: 0.42 }),
    s = i.target({ scale: 0.42 }),
    a = o,
    r = s,
    l = 0,
    c = new ne(),
    u = new ne(),
    f = new ne(),
    h = i.pass(
      jR +
        `uniform sampler3D tV; uniform sampler2D tPrev; uniform mat4 uIVP,uPVP; uniform float uFr,uBl,uSt; uniform vec3 uLc;
   const float Y0=15.,Y1=54.;
   const vec4 BL[13]=vec4[13](vec4(-118.,-225.,42.,.50),vec4(-62.,-255.,34.,.56),vec4(-190.,-190.,56.,1.),vec4(62.,-236.,32.,.66),vec4(118.,-200.,46.,.66),vec4(186.,-172.,52.,.72),vec4(22.,-285.,32.,.50),vec4(-22.,-310.,26.,.40),vec4(250.,-200.,60.,1.),vec4(-262.,-210.,60.,.95),vec4(150.,-250.,50.,.82),vec4(-92.,-172.,15.,.36),vec4(88.,-168.,15.,.34));
   float cover(vec2 p){ float n=texture(tNo,(p+vec2(uT*.2,0.))*.0105+vec2(.7,.2)).r; float m=0.; for(int i=0;i<13;i++){ vec2 c=BL[i].xy; c.x=mod(c.x-uT*.2+300.,600.)-300.; vec2 q=(p-c)/BL[i].z; q.y*=1.1; m=max(m,(1.-dot(q,q))*BL[i].w*smoothstep(300.,255.,abs(c.x))); } return clamp(m*(.45+1.1*n),0.,1.); }
   float dens(vec3 p,bool fine,out float h){ h=(p.y-Y0)/(Y1-Y0); if(h<0.||h>1.) return 0.; float c=cover(p.xz); if(c<.03) return 0.; float top=min(c*1.15,1.); float pr=smoothstep(0.,.05,h)*(1.-smoothstep(top*.45,top+.03,h)); if(pr<=.01) return 0.;
     vec3 w=p+vec3(uT*.22,0.,uT*.05); float b=smoothstep(.16,.80,texture(tV,w*vec3(.0125,.0165,.0125)).r); float d=b-(1.-pr*(.44+.34*sqrt(c))); if(d<=0.) return 0.; if(fine){ float e=texture(tV,w*.052+vec3(0.,-uT*.004,0.)).g; float e2=texture(tV,w*.085+.3).g; d-=(e*.62+e2*.38)*.36*(1.-smoothstep(.05,.42,d)); } return clamp(d*3.6,0.,1.); }
   void main(){ vec4 f=uIVP*vec4(vUv*2.-1.,1.,1.); vec3 rd=normalize(f.xyz/f.w-uCamP); vec4 res=vec4(0.,0.,0.,0.);
     if(rd.y>.012){ float t0=(Y0-uCamP.y)/rd.y,t1=min((Y1-uCamP.y)/rd.y,360.); if(t0<t1){ float jit=fract(52.9829189*fract(dot(gl_FragCoord.xy,vec2(.06711056,.00583715)))+uFr*.61803); float n=uSt; float gr=pow(t1/t0,1./n)-1.; float T=1.; vec3 C=vec3(0.); float t=t0*(1.+gr*jit); float dt=t*gr; float m=dot(rd,uLc); float ph=.72+.5*pow(sat(dot(rd,uSunV)),10.); float wd=0.,ws=0.;
       for(int i=0;i<72;i++){ if(float(i)>=n||T<.02||t>t1) break; vec3 p=uCamP+rd*t; float h; dt=t*gr; float d=dens(p,true,h); if(d>.005){ float od=0.; float ls=1.3; vec3 q=p; for(int k=0;k<5;k++){ q+=uLc*ls; float hh; od+=dens(q,k<2,hh)*ls; ls*=1.55; } float sh=exp(-od*.30)*.72+exp(-od*.06)*.28; float pw=1.-exp(-d*3.2); vec3 amb=mix(vec3(.34,.40,.50),vec3(.66,.74,.88),smoothstep(0.,.6,h))*.70; vec3 L=vec3(2.35,1.98,1.56)*(1.+.2*uOpen)*sh*ph*(.6+.4*pw)+amb; float a=1.-exp(-d*dt*.55); C+=T*a*L; wd+=T*a*t; ws+=T*a; T*=1.-a; } t+=dt; }
       float al=1.-T; if(ws>0.){ float dd=wd/ws; float fg=1.-exp(-max(dd-90.,0.)*.0034); vec3 hz=skyBase(normalize(vec3(rd.x,.03+rd.y*.35,rd.z))); C=mix(C,hz*al,fg*.62); } res=vec4(C,al); } }
     vec4 pc=uPVP*vec4(uCamP+rd*100.,1.); vec2 pu=pc.xy/pc.w*.5+.5; if(uBl<1.&&all(greaterThan(pu,vec2(0.)))&&all(lessThan(pu,vec2(1.)))) res=mix(texture(tPrev,pu),res,uBl); o=res; }`,
      {
        ...t,
        tV: { value: e.vol },
        tPrev: { value: null },
        uIVP: { value: f },
        uPVP: { value: c },
        uFr: 0,
        uBl: 1,
        uSt: 34,
        uLc: new F(0.8, 0.52, 0.1).normalize(),
      },
    ),
    d = 0;
  return {
    get tex() {
      return a.texture;
    },
    fit() {
      let p = Math.min(0.42, 806 / i.W);
      for (let x of [o, s])
        Math.abs(x._scale - p) > 0.001 &&
          ((x._scale = p),
          x.setSize(Math.max(1, Math.round(i.W * p)), Math.max(1, Math.round(i.H * p))),
          (l = 0));
    },
    reset() {
      l = 0;
    },
    render(p, x, v) {
      (t.uCamP.value.copy(p.position),
        u.multiplyMatrices(p.projectionMatrix, p.matrixWorldInverse),
        f.copy(u).invert());
      let m = l ? 1 : n ? 16 : 6;
      h.u.uSt.value = Math.round(46 * Math.max(0.7, x));
      for (let g = 0; g < m; g++) {
        let b = a;
        ((a = r),
          (r = b),
          (h.u.tPrev.value = r.texture),
          (h.u.uFr.value = d++ % 64),
          (h.u.uBl.value = l ? 0.13 : 1 / (g + 1)),
          h.u.uPVP.value.copy(l ? c : u));
        let y = Math.max(0, Math.floor((v - 0.05) * a.width));
        ((a.scissorTest = !0),
          a.scissor.set(y, 0, a.width - y, a.height),
          h.render(a),
          (a.scissorTest = !1),
          !l && g === m - 1 && (l = 1));
      }
      c.copy(u);
    },
  };
}

function r2(i, t) {
  return cn(
    KR(),
    pn(
      i,
      "out vec2 vN; void main(){ vN=position.xy; gl_Position=vec4(position.xy,1.,1.); }",
      Bn +
        `in vec2 vN; uniform mat4 uIV,uCVP; uniform sampler2D tCl; uniform float uMain;
   vec3 rect(vec2 p,vec2 sz,float fill){ vec2 c=p/sz; vec2 f=abs(fract(c)-.5)*sz; vec2 hs=sz*.5*fill; vec2 d=f-hs; float aa=length(fwidth(p))*.8+1e-5; float m=smoothstep(aa,-aa,max(d.x,d.y)); return vec3(m,floor(c)); }
   void main(){ vec4 f=uIV*vec4(vN,1.,1.); vec3 d=normalize(f.xyz/f.w-uCamP); if(uMode>.5) discard; vec3 c=skyBase(d); float m=dot(d,uSunV); float ang=acos(clamp(m,-1.,1.)); vec4 cl=vec4(0.);
   if(uWorld>.5){ vec2 q=d.xz/(d.y+.16); float ci=texture(tNo,q*vec2(.10,.22)+vec2(uT*.0016,0.)).r*texture(tNo,q*vec2(.5,.16)+7.).g; c=mix(c,vec3(.98,.92,.86),smoothstep(.22,.62,ci)*.10*smoothstep(-.25,.15,d.x)*smoothstep(.05,.2,d.y)); c+=vec3(1.,.74,.40)*(3.2*smoothstep(.0205,.0150,ang)+.9*exp(-ang*38.));
     vec4 pc=uCVP*vec4(uCamP+(uMain>.5?d:vec3(d.x,d.y,d.z))*100.,1.); vec2 pu=pc.xy/pc.w*.5+.5; vec2 tx=1./vec2(textureSize(tCl,0)); pu=clamp(pu,.002,.998); cl=texture(tCl,pu)*.36; for(int i=0;i<4;i++){ vec2 o2=i==0?vec2(1.1,.4):i==1?vec2(-.4,1.1):i==2?vec2(-1.1,-.4):vec2(.4,-1.1); cl+=texture(tCl,pu+o2*tx)*.16; } c=c*(1.-cl.a)+cl.rgb; }
   else { // the swarm: perfect lattices overhead, all moving at exactly one speed
     float k=0.; vec2 q=d.xz/(max(d.y,0.)+.035); vec3 sw=vec3(0.); for(int i=0;i<3;i++){ float fi=float(i); float sc=fi<.5?.95:fi<1.5?1.9:3.4; vec2 p=q*sc+vec2(uTime*.018*(1.-fi*.28),uTime*.011*(fi-1.)); vec3 r=rect(p,vec2(.32,.18),.62); float fade=smoothstep(.06,.17,d.y)*smoothstep(.12,.0,length(fwidth(p))); float tw=.55+.45*sin(dot(r.yz,vec2(.21,.33))-uTime*.25); k+=r.x*fade*tw*(.34-.05*fi); sw+=r.x*fade*tw*mix(vec3(.70,.84,1.),vec3(.9,.95,1.),fi*.5); }
     c*=1.-min(k,.5)*.62; float dk=smoothstep(.0050,.0040,ang); vec2 sp=vec2(d.x-uSunV.x,d.y-uSunV.y)+vec2(uTime*.00075,uTime*.0001); vec3 lt=rect(sp,vec2(.0128,.0072),.90); float gl=exp(-ang*34.); c*=mix(1.,1.-.62*lt.x,smoothstep(.16,.02,ang)); c+=vec3(.80,.91,1.)*gl*(1.-lt.x)*.20; c+=vec3(.86,.95,1.)*dk*(4.2-1.8*lt.x); c+=vec3(.80,.91,1.)*exp(-ang*150.)*.35; }
   finS(c); }`,
      { uniforms: { uIV: new ne(), uCVP: new ne(), tCl: null, uMain: 1, ...t }, depthWrite: !1 },
    ),
    60,
  );
}

function l2(i, t) {
  let o = [],
    s = new Qt();
  for (let r = 0; r <= 150; r++) {
    let l = 8 * Math.pow(60, r / 150);
    for (let c = 0; c <= 8; c++) o.push(l * 1.1 * ((2 * c) / 8 - 1), 0, 34 - l);
  }
  let a = [];
  for (let r = 0; r < 150; r++)
    for (let l = 0; l < 8; l++) {
      let c = r * 9 + l;
      a.push(c, c + 1, c + 8 + 1, c + 1, c + 8 + 2, c + 8 + 1);
    }
  return (
    s.setAttribute("position", new $t(new Float32Array(o), 3)),
    s.setIndex(a),
    cn(
      s,
      pn(
        i,
        "out vec3 vW; void main(){ vW=vec3(position.x,uSea,position.z); gl_Position=projectionMatrix*viewMatrix*vec4(vW,1.); }",
        `in vec3 vW; uniform sampler2D tR; uniform mat4 uRM;
   float wh(vec2 p,float t){ return texture(tNo,p*.055+vec2(-t*.010,t*.004)).r*1.5+texture(tNo,vec2(p.x*.8-p.y*.6,p.x*.6+p.y*.8)*.14+vec2(t*.014,-t*.012)).g*.75+texture(tNo,p*.40+vec2(-t*.034,t*.02)).g*.34; }
   vec2 wv(vec2 p,float t){ float e=.10+.0015*length(p-uCamP.xz); float h=wh(p,t); return vec2(wh(p+vec2(e,0.),t)-h,wh(p+vec2(0.,e),t)-h)/e; }
   vec3 refl(vec3 w,vec2 off){ vec4 q=uRM*vec4(w,1.); vec2 u=q.xy/q.w+off; return texture(tR,clamp(u,.002,.998)).rgb; }
   void main(){ vec3 V=uCamP-vW; float d=length(V); V/=d; vec4 b=baked(vW.xz); vec2 fe=abs((vW.xz-uDF.xy)*uDF.zw-.5); float dep=max(fe.x,fe.y)>.49?6.:uSea-b.b; 
    if(uWorld>.5){ float g=gust(vW.xz); vec2 n2=wv(vW.xz,uT); float amp=(.085+.13*g*uWind)*smoothstep(0.,1.2,dep); vec3 N=normalize(vec3(n2.x*amp,1.,n2.y*amp)); float fr=.03+.97*pow(1.-max(dot(V,normalize(mix(vec3(0.,1.,0.),N,.8))),.0),5.); fr=min(fr,.80); float ds=1./(1.+d*.02);
      vec3 rc=refl(vW,vec2(n2.x,n2.y*1.7)*amp*.15*ds); 
      vec3 shal=vec3(.055,.34,.33),deep=vec3(.008,.085,.135); vec3 wc=mix(shal,deep,smoothstep(.1,2.6,dep)); wc=mix(vec3(.46,.42,.30),wc,smoothstep(.0,.45,dep)); float sh=shadow(vW,.5); wc*=.35+.75*sh; wc+=vec3(.0,.05,.045)*g; 
      vec3 c=mix(wc,rc,fr); vec3 H=normalize(V+uSunV); float nd=max(dot(normalize(vec3(n2.x*amp*1.35,1.,n2.y*amp*1.3)),H),0.); float sp=pow(nd,420.)*5.+pow(nd,70.)*.22; c+=vec3(1.,.72,.40)*sp*1.3*(1.+.4*uOpen)*(1.-.5*uCool);
      vec3 H2=normalize(V+uSunL); c+=sunC()*pow(max(dot(N,H2),0.),260.)*.25;
      float fo=texture(tNo,vW.xz*.22+vec2(uT*.012,0.)).g; float ph=dep*3.4-uT*.55+fo*2.6; float line=smoothstep(.72,.98,sin(ph)*.5+.5)*smoothstep(.95,.1,dep); float foam=max(smoothstep(.22,.02,dep+ (fo-.5)*.35),line*.75*smoothstep(.35,.6,fo)); float cap=smoothstep(.70,.80,texture(tNo,vW.xz*vec2(.5,.9)+vec2(-uT*.05,uT*.01)).g*.75+texture(tNo,vW.xz*2.1).g*.25)*smoothstep(.35,.8,g)*.35*smoothstep(80.,20.,d); c=mix(c,vec3(.86,.90,.90)*(.55+.5*sh),clamp(foam+cap,0.,.9)); fin(c,vW); }
    else { // glass
      float fr=.38+.62*pow(1.-max(V.y,0.),3.); vec2 off=vec2(0.); float rip=sin(length(vW.xz-vec2(6.1,-41.))*.55-uTime*.35); off.y=rip*.00035; vec3 rc=refl(vW,off); vec3 wc=mix(vec3(.11,.13,.15),vec3(.010,.016,.022),smoothstep(.0,2.0,dep)); wc*=.6+.4*shadow(vW,.4); vec3 c=mix(wc,rc*vec3(.94,.97,1.),fr); vec3 H=normalize(V+uSunV);  
      c=mix(c,vec3(.30,.34,.38),smoothstep(.05,.0,abs(dep-.03))*.5); fin(c,vW); } }`,
        { uniforms: { tR: null, uRM: new ne() } },
      ),
      30,
    )
  );
}

var Rn = class {
  constructor() {
    ((this.p = []), (this.n = []), (this.g = []));
  }
  tri(t, e, n, o = [0, 0, 0, 0], s = null) {
    let a;
    if (!s) {
      let r = [e[0] - t[0], e[1] - t[1], e[2] - t[2]],
        l = [n[0] - t[0], n[1] - t[1], n[2] - t[2]];
      a = [r[1] * l[2] - r[2] * l[1], r[2] * l[0] - r[0] * l[2], r[0] * l[1] - r[1] * l[0]];
      let c = Math.hypot(...a) || 1;
      ((a = a.map((u) => u / c)), (s = [a, a, a]));
    }
    (this.p.push(...t, ...e, ...n), this.n.push(...s[0], ...s[1], ...s[2]));
    for (let r = 0; r < 3; r++) this.g.push(...(Array.isArray(o[0]) ? o[r] : o));
    return this;
  }
  quad(t, e, n, o, s) {
    let a = Array.isArray(s && s[0]);
    return (
      this.tri(t, e, n, a ? [s[0], s[1], s[2]] : s),
      this.tri(t, n, o, a ? [s[0], s[2], s[3]] : s),
      this
    );
  }
  box(t, e, n, o, s, a, r, l = !1) {
    let c = (...u) => this.quad(...u, r);
    return (
      c([t, s, a], [o, s, a], [o, s, n], [t, s, n]),
      c([t, e, a], [o, e, a], [o, s, a], [t, s, a]),
      c([o, e, a], [o, e, n], [o, s, n], [o, s, a]),
      c([t, e, n], [t, e, a], [t, s, a], [t, s, n]),
      c([o, e, n], [t, e, n], [t, s, n], [o, s, n]),
      l && c([t, e, n], [o, e, n], [o, e, a], [t, e, a]),
      this
    );
  }
  tube(t, e, n, o, s = 6, a) {
    let r = [e[0] - t[0], e[1] - t[1], e[2] - t[2]],
      l = Math.hypot(...r) || 1,
      c = r.map((x) => x / l),
      u = Math.abs(c[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0],
      f = [c[1] * u[2] - c[2] * u[1], c[2] * u[0] - c[0] * u[2], c[0] * u[1] - c[1] * u[0]],
      h = Math.hypot(...f);
    f = f.map((x) => x / h);
    let d = [c[1] * f[2] - c[2] * f[1], c[2] * f[0] - c[0] * f[2], c[0] * f[1] - c[1] * f[0]],
      p = (x, v, m) => {
        let g = (m / s) * Ve,
          b = Math.cos(g),
          y = Math.sin(g),
          S = [f[0] * b + d[0] * y, f[1] * b + d[1] * y, f[2] * b + d[2] * y];
        return [[x[0] + S[0] * v, x[1] + S[1] * v, x[2] + S[2] * v], S];
      };
    for (let x = 0; x < s; x++) {
      let [v, m] = p(t, n, x),
        [g, b] = p(t, n, x + 1),
        [y, S] = p(e, o, x),
        [M, w] = p(e, o, x + 1);
      (this.tri(v, g, M, a, [m, b, w]), this.tri(v, M, y, a, [m, w, S]));
    }
    return this;
  }
  blob(t, e, n, o, s, a, r, l, c = 0, u = 1) {
    let f = new go(1, r),
      h = f.attributes.position.array,
      d = (x, v, m) => {
        let g = Math.sin(x * 12.9898 + v * 78.233 + m * 37.719 + u * 4.1) * 43758.5453;
        return (g - Math.floor(g)) * 2 - 1;
      },
      p = (x) => {
        let v = h[x * 3],
          m = h[x * 3 + 1],
          g = h[x * 3 + 2],
          b = 1 + c * d(Math.round(v * 90), Math.round(m * 90), Math.round(g * 90));
        return [
          [t + v * o * b, e + m * s * b, n + g * a * b],
          (() => {
            let y = [v / o, m / s, g / a],
              S = Math.hypot(...y);
            return y.map((M) => M / S);
          })(),
        ];
      };
    for (let x = 0; x < h.length / 3; x += 3) {
      let [v, m] = p(x),
        [g, b] = p(x + 1),
        [y, S] = p(x + 2);
      this.tri(v, g, y, l, [m, b, S]);
    }
    return this;
  }
  weld() {
    let t = new Map(),
      e = [],
      n = [],
      o = [],
      s = [];
    for (let r = 0; r < this.p.length / 3; r++) {
      let l =
          ((this.p[r * 3] * 4e3) | 0) +
          "," +
          ((this.p[r * 3 + 1] * 4e3) | 0) +
          "," +
          ((this.p[r * 3 + 2] * 4e3) | 0) +
          "," +
          ((this.n[r * 3] * 60) | 0) +
          "," +
          ((this.n[r * 3 + 1] * 60) | 0) +
          "," +
          ((this.n[r * 3 + 2] * 60) | 0),
        c = t.get(l);
      (c === void 0 &&
        ((c = e.length / 3),
        t.set(l, c),
        e.push(this.p[r * 3], this.p[r * 3 + 1], this.p[r * 3 + 2]),
        n.push(this.n[r * 3], this.n[r * 3 + 1], this.n[r * 3 + 2]),
        o.push(this.g[r * 4], this.g[r * 4 + 1], this.g[r * 4 + 2], this.g[r * 4 + 3])),
        s.push(c));
    }
    ((this.p = e), (this.n = n), (this.g = o));
    let a = this.build();
    return (a.setIndex(s), a);
  }
  build() {
    let t = new Qt();
    return (
      t.setAttribute("position", new $t(new Float32Array(this.p), 3)),
      t.setAttribute("normal", new $t(new Float32Array(this.n), 3)),
      t.setAttribute("aG", new $t(new Float32Array(this.g), 4)),
      t
    );
  }
};

function kb(i = 5) {
  let t = ze(i),
    e = new Rn(),
    n = [],
    o = [],
    s = (u) => {
      let f = Math.hypot(...u) || 1;
      return u.map((h) => h / f);
    },
    a = (u, f) => [u[1] * f[2] - u[2] * f[1], u[2] * f[0] - u[0] * f[2], u[0] * f[1] - u[1] * f[0]],
    r = (u, f, h, d, p) => {
      let x = p > 4 ? 4 : 3,
        v = u,
        m = f,
        g = d,
        b = h / x;
      for (let E = 0; E < x; E++) {
        m = s([
          m[0] + (t() - 0.5) * 0.42,
          m[1] + (t() - 0.5) * 0.3 + (p < 3 ? -0.05 : 0.03),
          m[2] + (t() - 0.5) * 0.42,
        ]);
        let T = [v[0] + m[0] * b, v[1] + m[1] * b, v[2] + m[2] * b],
          _ = g * (p === 0 ? 0.7 : 0.88);
        if (
          (e.tube(v, T, Math.max(g, 0.0075), Math.max(_, 0.0055), p > 4 ? 12 : p > 2 ? 7 : 4, [
            v[1],
            p,
            0,
            0,
          ]),
          (v = T),
          (g = _),
          p <= 1)
        )
          for (let R = 0; R < (p === 0 ? 17 : 8); R++) {
            let L = t() * Ve,
              k = t() * 2 - 1,
              P = Math.sqrt(1 - k * k),
              C = 0.27 * Math.cbrt(t()),
              A = T[1] + k * C * 0.8;
            A > 1.05 + t() * 0.25 && n.push([T[0] + Math.cos(L) * P * C, A, T[2] + Math.sin(L) * P * C]);
          }
      }
      if (p === 0) {
        o.push(v);
        return;
      }
      let y = p >= 5 ? 6 : p >= 3 || t() < 0.6 ? 3 : 2,
        S = t() * Ve,
        M = s(a(m, Math.abs(m[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0])),
        w = a(M, m);
      for (let E = 0; E < y; E++) {
        let T = S + (E / y) * Ve + (t() - 0.5) * 0.7,
          _ = (p >= 5 ? 0.95 : 0.62) + (t() - 0.5) * 0.3,
          R = Math.cos(T) * Math.sin(_),
          L = Math.sin(T) * Math.sin(_),
          k = Math.cos(_),
          P = [
            m[0] * k + M[0] * R + w[0] * L,
            m[1] * k + M[1] * R + w[1] * L,
            m[2] * k + M[2] * R + w[2] * L,
          ];
        ((P[1] += p >= 5 ? 0.1 : p >= 3 ? 0.16 : 0.06),
          P[1] < -0.05 && v[1] < 2.2 && (P[1] = -0.05 + t() * 0.2),
          (P = s(P)),
          r(v, P, h * (p >= 5 ? 0.94 : 0.8) * (0.85 + t() * 0.3), g * (p >= 5 ? 0.6 : 0.66), p - 1));
      }
      p >= 4 &&
        r(v, s([m[0] * 0.5 + (t() - 0.5) * 0.5, 1, m[2] * 0.5 + (t() - 0.5) * 0.5]), h * 0.8, g * 0.6, p - 1);
    };
  r([0, -0.12, 0], [0.1, 1, 0.04], 0.88, 0.235, 5);
  for (let u = 0; u < 7; u++) {
    let f = (u / 7) * Ve + t() * 0.5,
      h = 0.34 + t() * 0.2;
    e.tube(
      [Math.cos(f) * 0.13, 0.13, Math.sin(f) * 0.13],
      [Math.cos(f) * h, -0.04, Math.sin(f) * h],
      0.085,
      0.02,
      7,
      [0, 5, 0, 0],
    );
  }
  let l = o[0],
    c = -1e9;
  for (let u of o) {
    let f = u[0] + u[2] * 0.6 - Math.abs(u[1] - 1.75) * 1.2;
    f > c && ((c = f), (l = u));
  }
  return { wood: e.weld(), leaves: n, last: [l[0], l[1] - 0.09, l[2]] };
}

var Ur = { x: 7.4, z: -42 },
  O0 =
    "vec3 foliage(vec3 alb,vec3 N,vec3 W,float sh,float ao){ vec3 V=normalize(uCamP-W); float nl=dot(N,uSunL); float wrap=pow(sat(nl*.6+.4),1.6); float tr=pow(sat(dot(-V,normalize(uSunL+uSunV*.6))*.5+.5),4.); vec3 c=alb*(sunC()*(wrap*1.05*sh)+ambient(N)*ao); c+=alb*vec3(1.12,1.05,.52)*sunC()*tr*.50*sh*(.4+.6*ao); return c; }";

function Db(i, t, e) {
  let n = ze(41),
    o = {},
    s = "gl_Position=projectionMatrix*viewMatrix*vec4(vW,1.);",
    a = cn(
      s2(En),
      pn(
        i,
        `in vec3 normal; in vec4 aM; out vec3 vW,vN; out vec4 vM; void main(){ vW=position; vN=normal; vM=aM; ${s} }`,
        O0 +
          `in vec3 vW,vN; in vec4 vM;
   void main(){ float d=length(vW-uCamP); vec3 N=normalize(vN); float n1=texture(tNo,vW.xz*.031).r,n2=texture(tNo,vW.xz*.17).g,n3=texture(tNo,vW.xz*.93).g,n4=texture(tNo,vec2(vW.x+vW.z,vW.y*2.4)*.12).r; float slope=1.-N.y; float near=smoothstep(60.,12.,d);
    vec2 e=vec2(.011,0.); vec2 gx=vec2(texture(tNo,vW.xz*.23+e.xy).g-texture(tNo,vW.xz*.23-e.xy).g,texture(tNo,vW.xz*.23+e.yx).g-texture(tNo,vW.xz*.23-e.yx).g); N=normalize(N+vec3(-gx.x,0.,-gx.y)*(.5+1.6*smoothstep(.15,.5,slope)));
    float g=gust(vW.xz);
    vec3 grass=mix(vec3(.030,.058,.016),vec3(.082,.105,.030),n1*.6+n2*.4); grass=mix(grass,vec3(.165,.142,.062),smoothstep(.5,.9,n2*.5+n1*.6)*.5); grass*=mix(1.,.62,smoothstep(26.,17.,d)); grass*=.75+.5*n3; grass*=1.+(.55*g-.2)*(1.-.0*near); 
    vec3 fl=mix(vec3(.018,.042,.012),vec3(.055,.095,.022),smoothstep(.3,.8,texture(tNo,vW.xz*.42).b)); vec3 c=mix(grass,fl,smoothstep(.25,.75,vM.z)*.9);
    // garden terraces: each level its own crop
    float gm=max(vM.y,vM.w*.9); if(gm>.02){ float lv=floor(vW.y/.42+.02); float ft=fract(vW.y/.42+.02); float row=sin((vW.x*.8+vW.z*1.3)*9.+lv*2.)*.5+.5; float k=h11(lv*3.1+floor((vW.x*.32+vW.z*.21))*7.7); vec3 crop=k<.22?vec3(.36,.30,.07):k<.42?vec3(.10,.22,.035):k<.6?vec3(.21,.27,.05):k<.72?vec3(.28,.12,.22):k<.84?vec3(.42,.26,.10):vec3(.07,.15,.05); crop*=mix(.75,1.15,row*smoothstep(60.,25.,d)+.5*smoothstep(25.,60.,d)); vec3 wall=vec3(.52,.47,.38)*(.7+.5*n3); crop=mix(crop,wall,smoothstep(.26,.44,slope)); crop=mix(crop,vec3(.07,.12,.03),smoothstep(.62,.35,n3)*smoothstep(.2,.4,slope)*.7); c=mix(c,crop,smoothstep(.1,.5,gm)*step(.34,vW.y)); }
    vec3 rock=mix(vec3(.20,.18,.16),vec3(.40,.36,.30),n4*.6+n2*.4); rock*=.75+.4*smoothstep(.2,.8,texture(tNo,vec2(vW.x*.2+vW.z*.2,vW.y*1.1)).g); c=mix(c,rock,smoothstep(.34+.14*smoothstep(90.,70.,d),.56+.12*smoothstep(90.,70.,d),slope+(n2-.5)*.22)*(1.-vM.y*.8)*(1.-vM.w*.85)); float far=smoothstep(60.,85.,d); vec3 fr2=mix(vec3(.030,.060,.030),vec3(.075,.10,.045),n2); c=mix(c,fr2,far*smoothstep(13.,6.,vW.y+(n1-.5)*7.+slope*7.)*.9); float hi=smoothstep(12.,19.,vW.y+(n1-.5)*8.); c=mix(c,rock*1.15,hi*.75); float sn=smoothstep(14.,19.,vW.y+(n2-.5)*9.-slope*8.)*far; c=mix(c,vec3(.78,.82,.88),sn); 
    vec3 pave=vec3(.60,.50,.36)*(.8+.3*n3); c=mix(c,pave,smoothstep(.3,.8,vM.w)*smoothstep(.3,.5,slope)*.35*step(.3,vW.y));
    float shore=vW.y+(n2-.5)*.22; vec3 sand=vec3(.60,.49,.33)*(.8+.3*n3); c=mix(sand,c,smoothstep(.16,.42,shore)); c=mix(c*.55,c,smoothstep(-.03,.14,shore));
    c=mix(c,vec3(.55,.45,.31)*(.75+.4*n3),smoothstep(.19,.10,vM.x+(n3-.5)*.06)*smoothstep(45.,30.,d));
    vec4 b=baked(vW.xz); float sh=shadow(vW,.10); float ao=mix(1.,b.g,.9); vec3 V=normalize(uCamP-vW); float gr=1.-smoothstep(.3,.5,slope);
    vec3 col=c*(sunC()*max(dot(N,uSunL),0.)*1.1*sh+ambient(N)*ao); col+=c*vec3(1.2,1.1,.4)*sunC()*pow(sat(dot(-V,uSunL)*.5+.5),5.)*.35*sh*gr; fin(col,vW); }`,
      ),
      10,
    );
  (t.add(a),
    (o.land = a),
    (o.landLo = cn(s2(En, 200, 240), a.material, 10)),
    (o.landLo.visible = !1),
    t.add(o.landLo));
  let r = new Rn();
  (r.tube([0, -0.1, 0], [0, 0.4, 0], 0.07, 0.045, 4, [0, 0, 1, 0]),
    r.blob(0, 0.62, 0, 0.4, 0.36, 0.4, 1, [0, 0, 0, 0], 0.12, 1),
    r.blob(0.22, 0.5, 0.1, 0.28, 0.25, 0.28, 1, [0, 0, 0, 0.3], 0.14, 2),
    r.blob(-0.2, 0.54, -0.06, 0.3, 0.27, 0.3, 1, [0, 0, 0, 0.6], 0.14, 3),
    r.blob(0.02, 0.86, 0.02, 0.25, 0.22, 0.25, 1, [0, 0, 0, 0.9], 0.14, 4));
  let l = new Rn();
  (l.tube([0, -0.1, 0], [0, 0.2, 0], 0.04, 0.035, 4, [0, 0, 1, 0]),
    l.blob(0, 0.78, 0, 0.17, 0.68, 0.17, 1, [0, 0, 0, 0], 0.1, 5),
    l.blob(0, 0.5, 0, 0.2, 0.42, 0.2, 1, [0, 0, 0, 0.5], 0.12, 6));
  let c = [[], []],
    u = (M, w, E, T) => {
      let _ = En(M, w);
      c[T].push(M, _, w, E, n(), n());
    };
  for (let M = 0, w = 0; M < 6e4 && w < 4300; M++) {
    let E = 24 + 100 * Math.pow(n(), 0.8),
      T = (n() * 2 - 1) * E * 0.72,
      _ = ho.z - E;
    if (Math.hypot(T - 9.3, _ + 10) < 1) continue;
    let R = En(T, _);
    n() > a2(T, _, R) ||
      Math.abs(En(T + 0.4, _) - R) + Math.abs(En(T, _ + 0.4) - R) > 1.15 ||
      (u(T, _, (0.75 + n() * 0.75) * (1 + E * 0.003), n() < 0.13 ? 1 : 0), w++);
  }
  for (let M = 0; M < 620; M++) {
    let w = K(3, 32, n()),
      E = K(-44, -27, n());
    En(w, E) > 0.5 && Tc(w, E) > 0.2 && u(w, E, 0.35 + n() * 0.45, n() < 0.45 ? 1 : 0);
  }
  for (let M = 0; M < 240; M++) {
    let w = K(-34, -10, n()),
      E = K(-34, 2, n());
    En(w, E) > 0.5 && Mh(w, E) > 0.35 && u(w, E, 0.3 + n() * 0.3, n() < 0.3 ? 1 : 0);
  }
  for (let M = 0; M < 40; M++) {
    let w = n() * Ve,
      E = 3.6 * Math.sqrt(n()),
      T = 9.3 + Math.cos(w) * E,
      _ = -10 + Math.sin(w) * E * 0.75;
    En(T, _) > 0.5 && u(T, _, 0.45 + n() * 0.5, n() < 0.4 ? 1 : 0);
  }
  let f = pn(
    i,
    `in vec3 normal; in vec4 aG; in vec4 iP; in vec2 iA; out vec3 vW,vN,vL; out vec3 vA; void main(){ float a=iA.x*6.283; float c=cos(a),s=sin(a); vec3 p=position*vec3(1.+.25*(iA.y-.5),1.,1.+.25*(.5-iA.y)); vec3 q=vec3(p.x*c-p.z*s,p.y,p.x*s+p.z*c)*iP.w; vec3 n=vec3(normal.x*c-normal.z*s,normal.y,normal.x*s+normal.z*c); vW=iP.xyz+q; float g=gust(iP.xz); float sw=(g*.16+.05*sin(uT*1.7+iA.x*20.))*uWind*q.y; vW+=vec3(-.95,0.,.3)*sw; vW+=n*.02*sin(uT*4.+dot(vW,vec3(9.)))*uWind*(1.-aG.z); vN=n; vL=position; vA=vec3(iA,aG.z); ${s} }`,
    O0 +
      `in vec3 vW,vN,vL,vA; void main(){ vec3 N=normalize(vN); if(vA.z>.5){ fin(vec3(.10,.075,.05)*(ambient(N)+sunC()*.3*sat(dot(N,uSunL))),vW); return; } vec3 aN=abs(N); vec2 tu=aN.y>.75?vW.xz:aN.x>aN.z?vW.zy:vW.xy; float n=texture(tNo,tu*.58+vA.xy).b; float n2=texture(tNo,tu*.35+vA.yx).g; vec3 V=normalize(uCamP-vW); float rim=sat(dot(N,V)); if(uMode<.5&&rim<.34&&n>.35+rim*1.4) discard; N=normalize(N+(vec3(n,n2,n)-.5)*.9);
     vec3 alb=mix(vec3(.026,.056,.020),vec3(.098,.122,.036),vA.x*vA.x); alb=mix(alb,vec3(.085,.105,.066),smoothstep(.45,.6,vA.y)*.65); alb=mix(alb,vec3(.15,.125,.045),smoothstep(.84,.95,vA.y)*.7); alb=mix(alb,vec3(.15,.085,.035),smoothstep(.962,.97,vA.x)*.7); alb*=.55+.8*n2; alb*=mix(1.35,.55,smoothstep(.1,.62,n)); float ao=mix(.35,1.,smoothstep(.15,.95,vL.y))*mix(1.,.6,smoothstep(.2,.6,n)); float sh=shadow(vW+vec3(0.,.12,0.),.35); fin(foliage(alb,N,vW,mix(.12,1.,sh),ao),vW); }`,
    { side: oe },
  );
  c.forEach((M, w) => {
    let E = M.length / 6,
      T = new Float32Array(E * 4),
      _ = new Float32Array(E * 2);
    for (let L = 0; L < E; L++)
      (T.set(M.slice(L * 6, L * 6 + 4), L * 4), _.set(M.slice(L * 6 + 4, L * 6 + 6), L * 2));
    let R = cn(Gn((w ? l : r).weld(), E, { iP: [T, 4], iA: [_, 2] }), f, 6);
    (t.add(R), (o.trees = o.trees || []).push(R));
  });
  let h = new Rn();
  (h.box(-0.5, -1.2, -0.5, 0.5, 1, 0.5, [0, 0, 0, 0]),
    h.box(-0.53, 0.94, -0.53, 0.53, 1.03, 0.53, [1, 0, 0, 0], !0));
  let d = new Rn();
  (d.box(-0.5, -1.2, -0.5, 0.5, 1, 0.5, [0, 0, 0, 0]),
    d.tri([-0.56, 0.98, 0.56], [0.56, 0.98, 0.56], [0.18, 1.42, 0], [1, 0, 0, 0]),
    d.tri([-0.56, 0.98, 0.56], [0.18, 1.42, 0], [-0.18, 1.42, 0], [1, 0, 0, 0]),
    d.tri([0.56, 0.98, 0.56], [0.56, 0.98, -0.56], [0.18, 1.42, 0], [1, 0, 0, 0]),
    d.tri([0.56, 0.98, -0.56], [-0.56, 0.98, -0.56], [-0.18, 1.42, 0], [1, 0, 0, 0]),
    d.tri([0.56, 0.98, -0.56], [-0.18, 1.42, 0], [0.18, 1.42, 0], [1, 0, 0, 0]),
    d.tri([-0.56, 0.98, -0.56], [-0.56, 0.98, 0.56], [-0.18, 1.42, 0], [1, 0, 0, 0]));
  let p = new Rn();
  (p.box(-0.5, -1.2, -0.5, 0.5, 0.8, 0.5, [0, 0, 0, 0]), p.blob(0, 0.8, 0, 0.5, 0.55, 0.5, 2, [1, 0, 0, 0]));
  let x = [[], [], []],
    v = new Set(),
    m = (M, w, E, T, _, R = 0) => {
      let L = En(M, w);
      x[T].push(M, L - R, w, _, E[0], E[1], E[2], n());
    };
  o.houses = [];
  let g = 0.62;
  for (let M = 0; M < 62; M++)
    for (let w = 0; w < 36; w++) {
      let E = 1.5 + M * g + (n() - 0.5) * 0.18,
        T = -46 + w * g + (n() - 0.5) * 0.18,
        _ = En(E, T),
        R = Tc(E, T);
      if (_ < 0.42 || n() > R * 1.05 - 0.12 || Yi(E * 0.35, T * 0.35 + 30, 2) > 0.24) continue;
      let L = En(E + 0.5, T) - En(E - 0.5, T);
      if (En(E, T + 0.5) - En(E, T - 0.5) > 0.5) continue;
      let P = Math.atan2(-L, 1.5) * 0.6 + (n() - 0.5) * 0.12,
        C = n() < 0.34 ? 1 : n() < 0.045 ? 2 : 0,
        A = 0.36 + n() * 0.26,
        N = 0.2 + n() * n() * 0.3 + (n() < 0.03 ? 0.5 : 0);
      (m(E, T, [A, N, 0.34 + n() * 0.18], C, P),
        o.houses.push([E, _, T, A, N]),
        C === 0 &&
          n() < 0.3 &&
          x[0].push(E + (n() - 0.5) * 0.12, _ + N, T - 0.04, P, A * 0.5, N * 0.4 + 0.08, 0.2, n()));
    }
  for (let [M, w, E, T] of [
    [24, 4, 7, 46],
    [9.3, -10, 2.6, 22],
    [-18, -6, 5, 34],
    [-26, -18, 8, 40],
    [31, -14, 7, 40],
  ])
    for (let _ = 0; _ < T; _++) {
      let R = n() * Ve,
        L = E * Math.sqrt(n()),
        k = M + Math.cos(R) * L,
        P = w + Math.sin(R) * L * 0.8,
        C = En(k, P);
      C < 0.4 ||
        C > 6 ||
        (m(k, P, [0.34 + n() * 0.2, 0.26 + n() * 0.25, 0.34], n() < 0.55 ? 1 : 0, (n() - 0.5) * 0.6),
        o.houses.push([k, C, P, 0.45, 0.4]));
    }
  let b = pn(
    i,
    `in vec3 normal; in vec4 aG; in vec4 iP,iS; out vec3 vW,vN,vL,vS; out vec2 vA; void main(){ float c=cos(iP.w),s=sin(iP.w); vec3 p=position*iS.xyz; vec3 n=normalize(normal/iS.xyz); vW=iP.xyz+vec3(p.x*c+p.z*s,p.y,-p.x*s+p.z*c); vN=vec3(n.x*c+n.z*s,n.y,-n.x*s+n.z*c); vL=p; vS=normal; vA=vec2(aG.x,iS.w); ${s} }`,
    `in vec3 vW,vN,vL,vS; in vec2 vA; void main(){ vec3 N=normalize(vN); vec3 alb=vA.y<.55?vec3(.80,.77,.70):vA.y<.72?vec3(.78,.64,.46):vA.y<.86?vec3(.74,.55,.47):vec3(.66,.70,.70); if(vA.x>.5||N.y>.6) alb=vec3(.90,.89,.86); else { float u=(abs(vS.x)>.5?vL.z:vL.x); vec2 w=vec2(u*8.+vA.y*3.,vL.y*6.6); vec2 f=abs(fract(w)-.5); float win=smoothstep(.26,.18,f.x)*smoothstep(.36,.28,f.y)*step(.06,vL.y); float aw=clamp(length(fwidth(w))*1.2,0.,1.); win=mix(win,.22,smoothstep(.4,1.,aw)); vec3 gl=mix(vec3(.10,.13,.16),vec3(.16,.30,.36),step(.5,h11(floor(w.x)+vA.y*31.))); alb=mix(alb,gl,win*.8); }
     float ao=baked(vW.xz).g; float sh=shadow(vW+N*.05,.12); float gnd=smoothstep(-.1,.35,vL.y); vec3 c=alb*(sunC()*max(dot(N,uSunL),0.)*sh+ambient(N)*mix(.55,1.,gnd)+vec3(.30,.23,.14)*(1.-sat(N.y))*.95+vec3(1.25,.92,.56)*.46*sat(dot(N,normalize(vec3(.62,.30,.72))))); fin(c,vW); }`,
  );
  [h, d, p].forEach((M, w) => {
    let E = x[w],
      T = E.length / 8;
    if (!T) return;
    let _ = new Float32Array(T * 4),
      R = new Float32Array(T * 4);
    for (let L = 0; L < T; L++)
      (_.set(E.slice(L * 8, L * 8 + 4), L * 4), R.set(E.slice(L * 8 + 4, L * 8 + 8), L * 4));
    t.add(cn(Gn(M.build(), T, { iP: [_, 4], iS: [R, 4] }), b, 5));
  });
  let y = new Rn(),
    S = (M, w, E, T, _, R) => {
      let k = (H, Y, q, st) => {
          for (let ct = 0; ct <= 200; ct++) {
            let V = ct / 200,
              ft = K(H, q, V),
              nt = K(Y, st, V);
            if (En(ft, nt) < 0.55) return [ft, nt];
          }
          return [q, st];
        },
        [P, C] = k(M, w, E, T),
        [A, N] = k(E, T, M, w),
        G = Math.hypot(A - P, N - C);
      if (G < 1) return;
      let B = (-(N - C) / G) * 0.16,
        ot = ((A - P) / G) * 0.16,
        ut = 40,
        lt = (H) => 0.62 + _ * 4 * H * (1 - H),
        Z = (H, Y, q = 0) => [K(P, A, H) + B * Y, lt(H) + q, K(C, N, H) + ot * Y];
      for (let H = 0; H < ut; H++) {
        let Y = H / ut,
          q = (H + 1) / ut;
        (y.quad(Z(Y, -1), Z(Y, 1), Z(q, 1), Z(q, -1), [0, 0, 0, 0]),
          y.quad(Z(Y, 1), Z(Y, -1), Z(q, -1), Z(q, 1), [0, 0, 0, 0]));
        for (let st of [-1, 1])
          (y.quad(Z(Y, st, -0.07), Z(q, st, -0.07), Z(q, st, 0.1), Z(Y, st, 0.1), [0, 0, 0, 0]),
            y.quad(Z(q, st, -0.07), Z(Y, st, -0.07), Z(Y, st, 0.1), Z(q, st, 0.1), [0, 0, 0, 0]));
      }
      if (R) {
        let H = R,
          Y = [0.24, 0.76],
          q = (ct) => {
            if (ct < 0.24) return K(lt(ct) + 0.1, lt(0.24) + H, (ct / 0.24) ** 1.5);
            if (ct > 0.76) return K(lt(ct) + 0.1, lt(0.76) + H, ((1 - ct) / 0.24) ** 1.5);
            let V = (ct - 0.5) / 0.26;
            return K(lt(0.5) + 0.25, lt(0.24) + H, V * V);
          };
        for (let ct of Y)
          for (let V of [-1, 1]) {
            let ft = Z(ct, V * 1.15);
            y.tube(
              [ft[0], -2, ft[2]],
              [ft[0] - B * V * 0.6, lt(ct) + H, ft[2] - ot * V * 0.6],
              0.1,
              0.05,
              5,
              [0, 0, 0, 0],
            );
          }
        let st = 48;
        for (let ct = 0; ct < st; ct++) {
          let V = ct / st,
            ft = (ct + 1) / st;
          for (let nt of [-1, 1]) {
            let Mt = Z(V, nt),
              Et = Z(ft, nt);
            (y.tube([Mt[0], q(V), Mt[2]], [Et[0], q(ft), Et[2]], 0.024, 0.024, 3, [0, 0, 0, 0]),
              ct % 2 === 0 &&
                y.tube([Mt[0], q(V), Mt[2]], [Mt[0], lt(V), Mt[2]], 0.011, 0.011, 3, [0, 0, 0, 0]));
          }
        }
      } else
        for (let Y = 0; Y < 5; Y++) {
          let q = Y / 5,
            st = (Y + 1) / 5,
            ct = 8;
          for (let V = 0; V < ct; V++) {
            let ft = V / ct,
              nt = (V + 1) / ct,
              Mt = -0.05 + (lt(K(q, st, ft)) - 0.1 + 0.05) * Math.sqrt(Math.max(0, 1 - (2 * ft - 1) ** 2)),
              Et = -0.05 + (lt(K(q, st, nt)) - 0.1 + 0.05) * Math.sqrt(Math.max(0, 1 - (2 * nt - 1) ** 2));
            for (let at of [-1, 1]) {
              let rt = Z(K(q, st, ft), at),
                U = Z(K(q, st, nt), at),
                j = [rt[0], Mt, rt[2]],
                J = [U[0], Et, U[2]];
              (y.quad(j, J, U, rt, [0, 0, 0, 0]), y.quad(J, j, rt, U, [0, 0, 0, 0]));
            }
          }
        }
    };
  (S(9.3, -10, 22, -6, 0.55, 0),
    S(5, -42, -9, -27, 1, 3.2),
    S(-9, -27, -20, -22, 0.8, 2.4),
    t.add(
      cn(
        y.build(),
        pn(
          i,
          `in vec3 normal; out vec3 vW,vN; void main(){ vW=position; vN=normal; ${s} }`,
          "in vec3 vW,vN; void main(){ vec3 N=normalize(vN); vec3 c=vec3(.84,.82,.78)*(sunC()*max(dot(N,uSunL),0.)*shadow(vW+vec3(0.,.1,0.),.2)+ambient(N)+vec3(.12,.1,.06)); fin(c,vW); }",
          { side: oe },
        ),
        5,
      ),
    ));
  {
    let w = new Rn();
    w.quad([-0.5, -0.5, 0], [0.5, -0.5, 0], [0.5, 0.5, 0], [-0.5, 0.5, 0], [0, 0, 0, 0]);
    let E = new Float32Array(610 * 4);
    for (let R = 0; R < 610; R++) {
      let L = R / 610;
      E.set([L, R % 5, n(), n()], R * 4);
    }
    let T = (R) =>
        pn(
          i,
          `in vec4 iA; out vec3 vW,vN; out vec2 vU; out float vY; uniform vec4 uTw; void main(){ float u=iA.x; float y=pow(u,1.08)*66.-.4; float k=iA.y; float r=mix(1.55,.60,smoothstep(0.,10.,y)); r=mix(r,2.5,smoothstep(13.,50.,y)); float th=k*1.2566+y*.155+uT*.012+.25*sin(y*.12-uT*.15); float sw=sin(uT*.35+y*.07)*.0035*y*uWind; vec3 c=vec3(cos(th),0.,sin(th)); vec3 t=vec3(-sin(th),.0,cos(th)); float br=sin(uT*.6-y*.22+k)*.5+.5; vec3 up=normalize(vec3(0.,1.,0.)+c*(.05+.34*br+(iA.z-.5)*.35)+t*.42); vec3 sd=normalize(cross(up,c)); vec3 nn=cross(sd,up); float s=mix(.95,1.5,u); vW=uTw.xyz+(vec3(sw*2.,y,sw)+c*r+(sd*position.x*.95+up*position.y*.534)*s)*uTw.w; vN=nn; vU=position.xy+.5; vY=y; ${s} }`,
          "in vec3 vW,vN; in vec2 vU; in float vY; uniform vec4 uTw; void main(){ vec3 N=normalize(vN),V=normalize(uCamP-vW); if(dot(N,V)<0.) N=-N; float nl=dot(N,uSunL); float tr=sat(-nl)*.75+pow(sat(dot(-V,uSunV)),4.)*.35; vec3 c=vec3(.93,.91,.87)*(sunC()*(sat(nl)+tr)*.46+ambient(N)*.85); vec2 e=min(vU,1.-vU); c*=.90+.10*smoothstep(0.,.06,min(e.x*1.78,e.y)); if(uTw.w>1.2) c=mix(c,skyBase(normalize(vec3(vW.x-uCamP.x,max(vW.y-uCamP.y,0.)*.6+6.,vW.z-uCamP.z)))*1.12+.015,.74); fin(c,vW); }",
          { uniforms: { uTw: R }, side: oe },
        ),
      _ = Gn(w.build(), 610, { iA: [E, 4] });
    t.add(
      cn(_, T(new ie(Ur.x, En(Ur.x, Ur.z) - 0.3, Ur.z, 1)), 5),
      cn(_, T(new ie((0.534 * 2 - 1) * 0.543 * 200, -1, ho.z - 200, 1.3)), 5),
    );
  }
  {
    let M = new Rn(),
      w = [],
      E = (P, C, A, N, G, B, ot) => {
        let ut = Math.hypot(A, N);
        ((A /= ut), (N /= ut));
        let lt = 46,
          Z = null,
          H = 99;
        for (let Y = 0; Y <= lt; Y++) {
          let q = Y / lt,
            st = P + A * q * ot,
            ct = C + N * q * ot,
            V = Math.min(H, En(st, ct) + 0.1);
          ((H = V), (V = Math.max(V, 0)));
          let ft = K(G, B, q),
            nt = [st - N * ft, V, ct + A * ft],
            Mt = [st + N * ft, V, ct - A * ft];
          (Z &&
            M.quad(Z[0], Z[1], Mt, nt, [
              [0, Z[2], 0, 0],
              [1, Z[2], 0, 0],
              [1, q, 0, 0],
              [0, q, 0, 0],
            ]),
            (Z = [nt, Mt, q]));
        }
        w.push(Z[0], Z[1], B);
      },
      T = (P, C, A, N, G, B, ot = 4.2) => {
        for (let Y = 0; Y < 160 && !(En(P, C) < ot); Y++) ((P += A * 0.2), (C += N * 0.2));
        let ut = Math.hypot(A, N),
          lt = 0,
          Z = P,
          H = C;
        for (; lt < 16 && ((Z += (A / ut) * 0.2), (H += (N / ut) * 0.2), !(En(Z, H) < -0.05)); lt += 0.2);
        E(P - (A / ut) * 0.8, C - (N / ut) * 0.8, A, N, G, B, lt + 1);
      };
    (T(-30, -27, 1, 0.12, 0.34, 0.75, 5.6),
      T(-28, -21.5, 1, 0.15, 0.2, 0.5, 5),
      T(-36, -33, 1, -0.05, 0.4, 0.9, 6.5),
      T(23.5, -37, -0.05, 1, 0.2, 0.46, 5.8),
      t.add(
        cn(
          M.build(),
          pn(
            i,
            `in vec4 aG; out vec3 vW; out vec2 vU; void main(){ vW=position+vec3(0.,.02,0.); vU=aG.xy; ${s} }`,
            "in vec3 vW; in vec2 vU; void main(){ float n=texture(tNo,vec2(vU.x*.75+vU.y*.05,vW.y*.07+uT*.11)).g*.55+texture(tNo,vec2(vU.x*2.1+.3,vW.y*.14+uT*.2)).g*.55; float ed=.32+.2*texture(tNo,vec2(vU.y*1.7,uT*.05)).g; float e=smoothstep(0.,ed,vU.x)*smoothstep(1.,1.-ed,vU.x); float a=sat(e*(smoothstep(.30,.72,n)*1.05+.12))*.92; vec3 c=vec3(.80,.90,.95)*(ambient(vec3(0.,.6,.8))*1.1+sunC()*.34*(.5+n)); if(uMode>.5) discard; if(uClip>.5&&vW.y<uSea-.02) discard; o=vec4(air(c,vW),a); }",
            { transparent: !0, depthWrite: !1, side: oe },
          ),
          70,
        ),
      ));
    let _ = w.length / 3,
      R = 5,
      L = new Float32Array(_ * R * 4),
      k = new Rn();
    k.quad([-0.5, -0.5, 0], [0.5, -0.5, 0], [0.5, 0.5, 0], [-0.5, 0.5, 0], [0, 0, 0, 0]);
    for (let P = 0; P < _; P++) {
      let C = w[P * 3],
        A = w[P * 3 + 1],
        N = w[P * 3 + 2];
      for (let G = 0; G < R; G++)
        L.set(
          [
            (C[0] + A[0]) / 2 + (n() - 0.5) * N,
            Math.max(C[1], 0),
            (C[2] + A[2]) / 2 + (n() - 0.5) * N,
            N * (1.6 + 1.6 * n()) + n() * 0.1,
          ],
          (P * R + G) * 4,
        );
    }
    t.add(
      cn(
        Gn(k.build(), _ * R, { iA: [L, 4] }),
        pn(
          i,
          `in vec4 iA; out vec3 vW; out vec2 vU; out float vK; void main(){ float k=fract(uT*.07+fract(iA.w*91.7)); vec3 c=iA.xyz+vec3(-k*.5,k*1.3*iA.w*.4+.1,k*.2); vec3 r=vec3(viewMatrix[0][0],viewMatrix[1][0],viewMatrix[2][0]),u=vec3(viewMatrix[0][1],viewMatrix[1][1],viewMatrix[2][1]); float s=iA.w*(.5+.8*k); vW=c+(r*position.x*1.4+u*position.y)*s; vU=position.xy*2.; vK=sin(k*3.1416); ${s} }`,
          "in vec3 vW; in vec2 vU; in float vK; void main(){ if(uMode>.5||uClip>.5) discard; float a=smoothstep(1.,.0,length(vU))*vK*.30*(.5+texture(tNo,vW.xy*.2+vW.z).r); o=vec4(air(vec3(.78,.84,.88)*(sunC()*.16+ambient(vec3(0.,1.,0.))),vW),sat(a)); }",
          { transparent: !0, depthWrite: !1 },
        ),
        72,
      ),
    );
  }
  {
    let w = new Qt();
    (w.setAttribute(
      "position",
      new $t(new Float32Array([-0.5, 0, 0, 0.5, 0, 0, -0.36, 0.45, 0, 0.36, 0.45, 0, 0, 1, 0]), 3),
    ),
      w.setIndex([0, 1, 2, 1, 3, 2, 2, 3, 4]));
    let E = new Float32Array(84e3 * 4),
      T = new Float32Array(84e3 * 4),
      _ = 0;
    for (let L = 0; L < 84e3 * 6 && _ < 84e3; L++) {
      let k = 6 + 14.5 * Math.sqrt(n()),
        P = (n() * 2 - 1) * k * 0.74,
        C = ho.z - k,
        A = o2(P, C);
      if (A < 0.15 + n() * 0.06) continue;
      let N = En(P, C);
      if (N < 0.55) continue;
      let G = Yi(P * 0.5, C * 0.5, 2) + 0.5,
        B = (0.075 + 0.1 * n()) * (0.55 + 0.95 * Ct(G)) * (A < 0.5 ? 0.6 : 1);
      E.set([P, N - 0.01, C, B], _ * 4);
      let ot =
        n() <
        0.034 *
          Ct(
            Yi(P * 0.4 + 9, C * 0.4, 2) * 5 +
              0.3 +
              (P < -2.5 && C > 21 ? 1.6 + 4 * Yi(P * 0.9, C * 0.9, 2) : 0),
            0,
            3,
          )
          ? 1 + Math.floor(n() * 3.99)
          : 0;
      (T.set([n() * Ve, n(), ot, 0.007 + 0.007 * n() + k * 5e-4], _ * 4), _++);
    }
    let R = cn(
      Gn(w, _, { iP: [E, 4], iA: [T, 4] }),
      pn(
        i,
        `in vec4 iP,iA; out vec3 vW; out vec3 vC; out float vH; void main(){ float c=cos(iA.x),s=sin(iA.x); float g=gust(iP.xz); float h=iP.w*(iA.z>.5?1.2:1.); float y=position.y; if(iA.z>.5&&y>.4&&y<.9) y=.84; vec2 bend=(vec2(-1.,.35)*(g*.9+.18*sin(uT*3.+iP.x*7.+iA.y*9.)*.5)*uWind+vec2(c,s)*.25)*y*y*h; float w=iA.w*(iA.z>.5&&y>.4?2.6:1.); vec3 p=vec3(position.x*w*c,y*h,position.x*w*s); p.xz+=bend; p.y-=dot(bend,bend)*2.;  vW=iP.xyz+p; vH=y; vC=vec3(iA.yz,g); ${s} }`,
        O0 +
          "in vec3 vW,vC; in float vH; void main(){ float pn=texture(tNo,vW.xz*.11).g; vec3 alb=mix(vec3(.020,.050,.010),mix(mix(vec3(.060,.108,.028),vec3(.115,.145,.042),pn),vec3(.25,.215,.09),smoothstep(.4,1.,vC.x)*smoothstep(.35,.75,pn)*.8),vH); alb*=.8+(vC.z)*.7*vH; if(vC.y>.5&&vH>.80) alb=vC.y<1.5?vec3(.62,.50,.16):vC.y<2.9?vec3(.74,.72,.66):vC.y<3.3?vec3(.50,.13,.08):vec3(.34,.28,.50); vec4 b=baked(vW.xz); float sh=shadow(vW,.06); vec3 V=normalize(uCamP-vW); float tr=pow(sat(dot(-V,uSunL)*.5+.5),4.); vec3 c=alb*(sunC()*(.30+.4*vH)*sh+ambient(vec3(0.,1.,0.))*mix(.7,1.7,vH)*mix(.5,1.,b.g)); c+=alb*vec3(1.2,1.1,.4)*sunC()*tr*.7*sh*vH; fin(c,vW); }",
        { side: oe },
      ),
      4,
    );
    (t.add(R), (o.grass = R), (o.grassN = _));
  }
  {
    let M = new Rn();
    ((P) => {
      let C = [-0.5, 0.12, 0],
        A = [0.55, 0.16, 0];
      for (let N of [1, -1]) {
        let G = [0, 0.13, 0.16 * N],
          B = [0, -0.06, 0.05 * N],
          ot = N > 0 ? (ut, lt, Z) => M.tri(ut, lt, Z, P) : (ut, lt, Z) => M.tri(ut, Z, lt, P);
        (ot(C, B, G), ot(G, B, A));
      }
      (M.tri([-0.5, 0.12, 0], [0, 0.13, 0.16], [0.55, 0.16, 0], [0, 1, 0, 0]),
        M.tri([-0.5, 0.12, 0], [0.55, 0.16, 0], [0, 0.13, -0.16], [0, 1, 0, 0]));
    })([0, 0, 0, 0]);
    let E = (P, C, A, N) => {
      let G = [(P[0] + C[0] + A[0]) / 3, (P[1] + C[1] + A[1]) / 3, 0.09];
      (M.tri(P, C, G, N),
        M.tri(C, A, G, N),
        M.tri(A, P, G, N),
        M.tri(C, P, G, N),
        M.tri(A, C, G, N),
        M.tri(P, A, G, N));
    };
    (E([0.06, 0.2, 0], [-0.46, 0.24, 0.06], [0.04, 1.25, 0], [1, 0, 0, 0]),
      E([0.1, 0.2, 0], [0.5, 0.22, 0.05], [0.07, 1.02, 0], [1, 1, 0, 0]),
      M.tube([0.06, 0.1, 0], [0.05, 1.3, 0], 0.012, 0.008, 3, [0, 2, 0, 0]));
    let T = new Rn();
    for (let A of [1, -1]) {
      let N = [-0.62, 0.3, 0],
        G = [0.62, 0.3, 0],
        B = [-0.3, 0, 0],
        ot = [0.3, 0, 0],
        ut = [0, 0.15, 0.2 * A],
        lt = (Z, H, Y) => {
          (T.tri(Z, H, Y, [2, 0, 0, 0]), T.tri(Z, Y, H, [2, 0, 0, 0]));
        };
      (lt(N, B, ut),
        lt(B, ot, ut),
        lt(ot, G, ut),
        lt([-0.3, 0.12, 0.02 * A], [0.3, 0.12, 0.02 * A], [0, 0.55, 0]));
    }
    let _ = (P, C, A, N = 2, G = 5.6, B = 22, ot = 92) => {
        let ut = new Float32Array(C * 4),
          lt = new Float32Array(C * 4),
          Z = 0;
        for (let H = 0; H < 4e3 && Z < C; H++) {
          let Y = K(B, ot, n()),
            q = (n() * 2 - 1) * Y * 0.5,
            st = ho.z - Y,
            ct = K(N, G, n()),
            V = 0.5 + 0.6 * n(),
            ft = En(q, st) < -0.8;
          for (let nt = 0; nt < 8 && ft; nt++)
            En(q + Math.cos(nt * 0.785) * ct * 1.15, st + Math.sin(nt * 0.785) * ct * V * 1.15) > -0.5 &&
              (ft = !1);
          ft &&
            (ut.set([q, st, ct, ct * V], Z * 4),
            lt.set(
              [
                ((0.045 + 0.04 * n()) / ct) * (n() < 0.5 ? 1 : -1) * 3,
                n() * Ve,
                A * (0.8 + 0.5 * n()) * (1 + Y * 0.004),
                n(),
              ],
              Z * 4,
            ),
            Z++);
        }
        return cn(Gn(P, Z, { iC: [ut, 4], iA: [lt, 4] }), R, 5);
      },
      R = pn(
        i,
        `in vec3 normal; in vec4 aG,iC,iA; out vec3 vW,vN; out vec4 vG; void main(){ float t=uT*iA.x*.35+iA.y; vec2 p=iC.xy+vec2(cos(t),sin(t))*iC.zw; vec2 dv=vec2(-sin(t),cos(t))*iC.zw*sign(iA.x); dv=normalize(dv); float heel=(.13+.10*gust(p))*uWind*sign(dv.y+.2)+.04*sin(uT*1.3+iA.y*9.); float pit=.05*sin(uT*1.7+iA.y*5.); vec3 q=position*iA.z; float c=cos(heel),s=sin(heel); q=vec3(q.x,q.y*c-q.z*s,q.y*s+q.z*c); c=cos(pit); s=sin(pit); q=vec3(q.x*c-q.y*s,q.x*s+q.y*c,q.z); vW=vec3(p.x+q.x*dv.x-q.z*dv.y,uSea+.02+.03*sin(uT*1.5+iA.y*7.)+q.y,p.y+q.x*dv.y+q.z*dv.x); vN=vec3(normal.x*dv.x-normal.z*dv.y,normal.y,normal.x*dv.y+normal.z*dv.x); vG=vec4(aG.xy,iA.w,0.); ${s} }`,
        "in vec3 vW,vN; in vec4 vG; void main(){ vec3 N=normalize(vN); float k=vG.z; vec3 alb=vG.x>1.5?vec3(.93,.93,.92):vG.x>.5?(k<.5?vec3(.92,.89,.82):k<.64?vec3(.80,.30,.16):k<.78?vec3(.86,.60,.16):k<.9?vec3(.16,.42,.50):vec3(.90,.78,.60)):vG.y>1.5?vec3(.3,.22,.15):k<.4?vec3(.85,.83,.8):k<.7?vec3(.12,.24,.36):vec3(.45,.17,.1); float nl=dot(N,uSunL); float tr=vG.x>.5?.55*sat(-nl)+.25:0.; vec3 c=alb*(sunC()*(sat(nl)+tr)*.8*shadow(vW+vec3(0.,.2,0.),.4)+ambient(N)*.9); fin(c,vW); }",
        { side: oe },
      ),
      L = new Rn();
    {
      let P = [0, 0, 0, 0],
        C = [
          [-1.15, 0.3, 0.04],
          [-0.9, 0.24, 0.17],
          [-0.2, 0.18, 0.22],
          [0.6, 0.2, 0.18],
          [1.25, 0.34, 0.02],
        ];
      for (let A = 0; A < C.length - 1; A++)
        for (let N of [1, -1]) {
          let [G, B, ot] = C[A],
            [ut, lt, Z] = C[A + 1],
            H = [G, B, ot * N],
            Y = [ut, lt, Z * N],
            q = [ut * 0.9, -0.1, Z * 0.3 * N],
            st = [G * 0.9, -0.1, ot * 0.3 * N];
          (N > 0 ? L.quad(st, q, Y, H, P) : L.quad(H, Y, q, st, P),
            L.quad([G, B - 0.03, 0], H, Y, [ut, lt - 0.03, 0], [0, 1, 0, 0]));
        }
      for (let [A, N] of [
        [-0.62, 0.86],
        [0.02, 1],
        [0.62, 0.9],
      ]) {
        L.tube([A, 0.1, 0], [A, 1.75 * N, 0], 0.02, 0.012, 4, [0, 2, 0, 0]);
        for (let G = 0; G < 3; G++) {
          let B = 0.34 + G * 0.46 * N,
            ot = 0.42 * N,
            ut = ((ot * 16) / 9) * (1 - G * 0.1) * 0.5,
            lt = 6;
          for (let Z = 0; Z < lt; Z++) {
            let H = Z / lt,
              Y = (Z + 1) / lt,
              q = (ct) => 0.16 * N * Math.sin(ct * Math.PI),
              st = (ct, V) => [A + V * ut * 0.82, B + ot * ct, 0.03 + q(ct) * 0.7 + V * 0.06];
            (L.quad(st(H, -1), st(H, 1), st(Y, 1), st(Y, -1), [1, 0, 0, 0]),
              L.quad(st(Y, -1), st(Y, 1), st(H, 1), st(H, -1), [1, 0, 0, 0]));
          }
        }
      }
    }
    let k = _(L.build(), 8, 0.95, 3.5, 7, 46, 104);
    {
      let P = k.geometry.attributes.iA.array;
      for (let C = 0; C < P.length; C += 4) ((P[C] *= 0.55), (P[C + 3] = 0.2));
    }
    t.add(_(M.build(), 40, 0.78), _(T.build(), 18, 0.62), k);
  }
  {
    let w = new Rn();
    (w.tube([0.011, 0, 0], [0.01, 0.062, 0], 0.009, 0.013, 5, [0, 1, 0, 0.6]),
      w.tube([-0.011, 0, 0], [-0.01, 0.062, 0], 0.009, 0.013, 5, [0, 1, 0, -0.6]),
      w.tube([0, 0.055, 0], [0, 0.108, 0], 0.021, 0.025, 6, [0, 0, 0, 0]),
      w.blob(0, 0.11, 0, 0.026, 0.01, 0.018, 0, [0, 0, 0, 0]),
      w.blob(0, 0.138, 0, 0.0145, 0.0175, 0.0145, 1, [1, 0, 0, 0]),
      w.tube([0.026, 0.107, 0], [0.038, 0.06, 0], 0.007, 0.006, 4, [0, 0, 0, 1]),
      w.tube([-0.026, 0.107, 0], [-0.038, 0.06, 0], 0.007, 0.006, 4, [0, 0, 0, -1]));
    let E = new Float32Array(256),
      T = new Float32Array(256);
    for (let k = 0; k < 64; k++) T.set([n(), n(), 0.78 + 0.4 * n(), n()], k * 4);
    let _ = Gn(w.build(), 64, { iP: [E, 4, 1], iA: [T, 4] }),
      R = Array.from({ length: 64 }, (k, P) => {
        let C = n(),
          A = P < 34 ? 0 : 1,
          N = 0,
          G = 0;
        if (A)
          for (let B = 0; B < 300; B++)
            if (n() < 0.45) {
              if (
                ((N = K(-6.5, 1.8, n())),
                (G = K(17.6, 23, n())),
                Math.hypot(N - xi.x, G - xi.z) > 0.6 && En(N, G) > 3.5)
              )
                break;
            } else {
              ((N = K(4, 10.5, n())), (G = K(8, 19, n())));
              let ot = En(N, G);
              if (ot > 0.25 && ot < 3.2) break;
            }
        return {
          mode: A,
          u: C,
          v: (0.006 + 0.004 * n()) * (n() < 0.5 ? -1 : 1),
          off: (n() - 0.5) * 0.16,
          sx: N,
          sz: G,
          ph: n() * Ve,
          run: n() < 0.35,
        };
      }),
      L = _.attributes.iP;
    ((o.people = (k) => {
      for (let P = 0; P < 64; P++) {
        let C = R[P],
          A,
          N,
          G;
        if (C.mode) {
          let ot = C.run ? 0.55 : 0.12,
            ut = C.run ? 0.42 : 0.2;
          ((A = C.sx + Math.cos(k * ot + C.ph) * ut),
            (N = C.sz + Math.sin(k * ot * 1.3 + C.ph) * ut),
            (G = k * ot + C.ph));
        } else {
          let ot = (C.u + C.v * k) % 1;
          ot < 0 && (ot += 1);
          let [ut, lt] = wh(ot),
            [Z, H] = wh(Math.min(1, ot + 0.01)),
            [Y, q] = wh(Math.max(0, ot - 0.01)),
            st = Z - Y,
            ct = H - q,
            V = Math.hypot(st, ct) || 1;
          ((A = ut - (ct / V) * C.off),
            (N = lt + (st / V) * C.off),
            (G = Math.atan2(st * Math.sign(C.v), ct * Math.sign(C.v))));
        }
        let B = Math.abs(Math.sin(k * (C.run ? 7 : 4) + C.ph)) * (C.run ? 0.016 : 0.006);
        ((L.array[P * 4] = A),
          (L.array[P * 4 + 1] = En(A, N) + B),
          (L.array[P * 4 + 2] = N),
          (L.array[P * 4 + 3] = G));
      }
      L.needsUpdate = !0;
    }),
      t.add(
        cn(
          _,
          pn(
            i,
            `in vec3 normal; in vec4 aG,iP,iA; out vec3 vW,vN; out vec3 vG; void main(){ float c=cos(iP.w),s=sin(iP.w); vec3 p=position*iA.z*.95; p.z+=aG.w*.018*sin(uT*5.+iA.x*20.)*p.y*8.; vW=iP.xyz+vec3(p.x*c+p.z*s,p.y,-p.x*s+p.z*c); vN=vec3(normal.x*c+normal.z*s,normal.y,-normal.x*s+normal.z*c); vG=vec3(aG.x,iA.y,iA.x); ${s} }`,
            "in vec3 vW,vN,vG; void main(){ vec3 N=normalize(vN); float k=vG.y; vec3 alb=vG.x>.5?mix(vec3(.22,.12,.07),vec3(.55,.36,.25),vG.z):k<.2?vec3(.85,.83,.78):k<.36?vec3(.78,.22,.13):k<.52?vec3(.88,.62,.12):k<.68?vec3(.10,.36,.46):k<.84?vec3(.16,.24,.52):vec3(.80,.42,.42); fin(alb*(sunC()*(sat(dot(N,uSunL))+.16)*shadow(vW,.08)+ambient(N)),vW); }",
          ),
          5,
        ),
      ));
  }
  {
    let M = new Rn(),
      w = (k, P, C, A, N) => {
        M.quad(k, P, C, A, N);
      };
    {
      let k = [0, 0.62, 0],
        P = [0.46, 0.14, -0.1],
        C = [0, -0.62, 0],
        A = [-0.46, 0.14, -0.1],
        N = [0, 0.14, 0.04];
      [
        [k, N, P, 0],
        [P, N, C, 1],
        [C, N, A, 0],
        [A, N, k, 1],
      ].forEach(([G, B, ot, ut]) => M.tri(G, B, ot, [0, ut, 0, 0]));
    }
    let E = 18;
    for (let k = 0; k < E; k++) {
      let P = k / E,
        C = (k + 1) / E;
      w(
        [-1, P, 0],
        [1, P, 0],
        [1, C, 0],
        [-1, C, 0],
        [
          [1, P, -1, 0],
          [1, P, 1, 0],
          [1, C, 1, 0],
          [1, C, -1, 0],
        ],
      );
    }
    let T = 14;
    for (let k = 0; k < T; k++) {
      let P = k / T,
        C = (k + 1) / T;
      w(
        [-1, P, 0],
        [1, P, 0],
        [1, C, 0],
        [-1, C, 0],
        [
          [2, P, -1, 0],
          [2, P, 1, 0],
          [2, C, 1, 0],
          [2, C, -1, 0],
        ],
      );
    }
    let _ = [
        [9.6, -9.6, 2, 4.4, 0.62, 4],
        [18, -32, 1, 6, 0.9, 0],
      ],
      R = new Float32Array(_.length * 4),
      L = new Float32Array(_.length * 4);
    (_.forEach((k, P) => {
      (R.set([k[0], En(k[0], k[1]) + 0.15, k[1], k[5]], P * 4), L.set([-k[2], k[3], k[4], P * 2.4], P * 4));
    }),
      t.add(
        cn(
          Gn(M.build(), _.length, { iA: [R, 4], iB: [L, 4] }),
          pn(
            i,
            `in vec4 aG,iA,iB; out vec3 vW; out vec3 vG; out vec2 vU; void main(){ float ph=iB.w; vec3 K=iA.xyz+vec3(iB.x*(1.+.12*sin(uT*.4+ph)),iB.y+.22*sin(uT*.7+ph*2.)+.1*sin(uT*1.9+ph),-iB.y*.25+.2*sin(uT*.5+ph*1.3)); float rl=.22*sin(uT*.8+ph)+.1*sin(uT*2.3+ph); vec3 R=normalize(vec3(cos(rl),sin(rl),.25)); vec3 Up=normalize(vec3(-sin(rl)*.9,cos(rl),-.45)); vec3 p; float sz=iB.z; if(aG.x<.5){ p=K+(R*position.x+Up*position.y+cross(R,Up)*position.z)*sz*.82; } else if(aG.x<1.5){ float u=aG.y; float L=sz*3.2*u; vec3 q=K-Up*.50*sz+vec3(-.55,-.42,.1)*L; float w=uT*3.4-u*7.+ph; q+=vec3(.0,sin(w),cos(w*.8))*.16*sz*u; p=q+vec3(.2,.9,.2)*aG.z*.045*sz*(1.-.6*u); } else { float u=aG.y; vec3 a=iA.xyz,b=K; p=mix(a,b,u); p.y-=.35*u*(1.-u)*iB.y*.35; vec3 V=normalize(uCamP-p); vec3 s=normalize(cross(V,b-a)); p+=s*aG.z*length(uCamP-p)*.00016; } vW=p; vG=vec3(aG.x,aG.y,iA.w); vU=position.xy; ${s} }`,
            "in vec3 vW,vG; in vec2 vU; void main(){ if(uMode>.5) discard; float k=vG.z; vec3 a=k<.5?vec3(.90,.89,.86):k<1.5?vec3(.86,.26,.14):k<2.5?vec3(.92,.64,.10):k<3.5?vec3(.10,.48,.54):k<4.5?vec3(.92,.90,.86):vec3(.84,.42,.46); vec3 b=k<.5?vec3(.86,.26,.14):k<3.5?vec3(.92,.90,.86):vec3(.20,.36,.66); vec3 alb=vG.x<.5?(vG.y<.5?a:b):vG.x<1.5?mix(a,b,step(.5,fract(vG.y*6.))):vec3(.85); vec3 c=alb*(sunC()*(.42+.10*vU.x)+ambient(vec3(0.,.4,.9))*.9); fin(c,vW); }",
            { side: oe },
          ),
          5,
        ),
      ));
  }
  {
    let M = new Rn();
    (M.tri([0.7, 0, 0], [-0.5, 0.05, 0.46], [-0.5, 0, 0.05], [0, 0, 0, 0]),
      M.tri([0.7, 0, 0], [-0.5, 0, -0.05], [-0.5, 0.05, -0.46], [0, 0, 0, 0]),
      M.tri([0.7, 0, 0], [-0.5, 0, 0.05], [-0.48, -0.2, 0], [1, 0, 0, 0]),
      M.tri([0.7, 0, 0], [-0.48, -0.2, 0], [-0.5, 0, -0.05], [1, 0, 0, 0]));
    let w = [
        [2, 6.6, 9, 9, 3.2, 0.16, 0.5, 0.75],
        [5, 8.4, -4, 12, 7, -0.1, 2.2, 0.95],
        [-7, 8.6, -6, 8, 6, 0.12, 4.1, 0.9],
        [14, 10, -22, 12, 7, 0.09, 1, 1.4],
        [-3, 11, -20, 14, 8, -0.085, 3, 1.5],
        [3, 7.2, 14, 5, 2, -0.2, 5.6, 0.5],
        [-14, 12, -24, 9, 8, 0.1, 0.2, 1.5],
      ],
      E = new Float32Array(w.length * 4),
      T = new Float32Array(w.length * 4);
    (w.forEach((A, N) => {
      (E.set(A.slice(0, 4), N * 4), T.set(A.slice(4), N * 4));
    }),
      t.add(
        cn(
          Gn(M.build(), w.length, { iA: [E, 4], iB: [T, 4] }),
          pn(
            i,
            `in vec3 normal; in vec4 aG,iA,iB; out vec3 vW,vN; void main(){ float t=uT*iB.y*1.4+iB.z; vec3 p=iA.xyz+vec3(cos(t)*iA.w,sin(t*2.3)*.5+.3*sin(uT*.5+iB.z),sin(t)*iB.x); vec3 f=normalize(vec3(-sin(t)*iA.w,cos(t*2.3)*.4,cos(t)*iB.x)*sign(iB.y)); vec3 in_=normalize(vec3(-cos(t),0.,-sin(t))); vec3 up=normalize(vec3(0.,1.,0.)+in_*.55+vec3(0.,0.,.15)*sin(uT*1.1+iB.z)); vec3 rt=normalize(cross(f,up)); up=cross(rt,f); vec3 q=position*iB.w*.75; vW=p+f*q.x+up*q.y+rt*q.z; vN=f*normal.x+up*normal.y+rt*normal.z; ${s} }`,
            "in vec3 vW,vN; void main(){ if(uMode>.5) discard; vec3 N=normalize(vN); if(dot(N,uCamP-vW)<0.) N=-N; float nl=dot(N,uSunL); fin(vec3(.94,.93,.91)*(sunC()*(sat(nl)+sat(-nl)*.5)*.75+ambient(N)*.95),vW); }",
            { side: oe },
          ),
          5,
        ),
      ));
    let _ = new Rn();
    (_.tri([0, 0, 0.1], [0, 0, -0.08], [0.5, 0, -0.03], [1, 0, 0, 0]),
      _.tri([0, 0, 0.1], [-0.5, 0, -0.03], [0, 0, -0.08], [-1, 0, 0, 0]),
      _.tri([0.03, 0, 0.12], [0, 0, -0.2], [-0.03, 0, 0.12], [0, 0, 0, 0]));
    let R = 74,
      L = new Float32Array(R * 4);
    for (let A = 0; A < R; A++) L.set([n(), n(), n(), A < 40 ? 0 : 1 + Math.floor(n() * 2)], A * 4);
    t.add(
      cn(
        Gn(_.build(), R, { iA: [L, 4] }),
        pn(
          i,
          `in vec4 aG,iA; out vec3 vW; void main(){ float f=iA.w; float t=uT*(.13+.02*f)+f*2.1; vec3 c=f<.5?vec3(-4.+sin(t)*13.,10.5+sin(t*1.7)*1.6,-14.+cos(t)*12.):f<1.5?vec3(9.+sin(t)*8.,6.+sin(t*2.)*1.,2.+cos(t)*7.):vec3(-14.+sin(t*.8)*8.,9.+sin(t)*1.5,-22.+cos(t*.8)*9.); vec3 vel=vec3(cos(t),.0,-sin(t)); float w=uT*.5+iA.x*9.; vec3 off=(iA.xyz-.5)*vec3(7.,2.4,5.)+vec3(sin(w),cos(w*1.3),sin(w*.7))*.5; vec3 f3=normalize(vel+vec3(0.,.1*sin(w),0.)); vec3 up=vec3(0.,1.,0.); vec3 r=normalize(cross(f3,up)); float fl=sin(uT*(8.+3.*iA.y)+iA.x*30.)*(.35+.65*smoothstep(-.2,.6,sin(uT*.9+iA.z*12.))); float s=.34+.12*iA.y; vec3 q=position*s; q.y+=abs(position.x)*fl*s*.9; q.x*=1.-.25*abs(fl)*abs(position.x); vW=c+off+r*q.x+up*q.y+f3*q.z; ${s} }`,
          "in vec3 vW; void main(){ if(uMode>.5) discard; fin(vec3(.12,.13,.15)*ambient(vec3(0.,.2,1.))+vec3(.05,.04,.03),vW); }",
          { side: oe },
        ),
        5,
      ),
    );
    let k = new Rn();
    k.quad([-0.5, -0.5, 0], [0.5, -0.5, 0], [0.5, 0.5, 0], [-0.5, 0.5, 0], [0, 0, 0, 0]);
    let P = 170,
      C = new Float32Array(P * 4);
    for (let A = 0; A < P; A++) C.set([n(), n(), n(), n()], A * 4);
    t.add(
      cn(
        Gn(k.build(), P, { iA: [C, 4] }),
        pn(
          i,
          `in vec4 iA; out vec3 vW; out float vK; void main(){ vec3 p=vec3(7.5-mod(iA.x*15.+uT*(.55+.5*iA.w),15.),4.2+iA.y*3.4+.35*sin(uT*.9+iA.x*30.),17.+iA.z*8.+.4*sin(uT*.7+iA.y*20.)); float a=uT*(2.+3.*iA.w)+iA.x*40.,b=uT*1.7+iA.z*30.; vec3 u=vec3(cos(a),sin(a)*.6,sin(b)),v=normalize(cross(u,vec3(sin(b),cos(a),.4))); float s=.018+.016*iA.w; vW=p+(normalize(u)*position.x+v*position.y*.7)*s; vK=iA.w; ${s} }`,
          "in vec3 vW; in float vK; void main(){ if(uMode>.5) discard; fin((vK<.5?vec3(.9,.86,.8):vK<.8?vec3(.85,.62,.5):vec3(.5,.6,.15))*(sunC()*.5+ambient(vec3(0.,1.,0.))*.7),vW); }",
          { side: oe },
        ),
        5,
      ),
    );
  }
  return o;
}

function c2(i, t, e, n, o) {
  let s = "gl_Position=projectionMatrix*viewMatrix*vec4(vW,1.);",
    a = { uO: new F(xi.x, n, xi.z) },
    r = cn(
      e.wood,
      pn(
        i,
        `in vec3 normal; in vec4 aG; uniform vec3 uO; out vec3 vW,vN,vL; void main(){ vec3 p=position; float g=gust(uO.xz+p.xz*.6); float sw=(g*.07+.02*sin(uT*1.3+p.y))*uWind*p.y*p.y*.18; p+=vec3(-.95,0.,.3)*sw; vW=uO+p; vN=normal; vL=position; ${s} }`,
        `in vec3 vW,vN,vL; void main(){ vec3 N=normalize(vN); float a=atan(N.x,N.z); float n=texture(tNo,vec2(a*.6,vL.y*.35)).g*.6+texture(tNo,vec2(a*1.9+vL.x,vL.y*1.1)).g*.4; vec3 alb=mix(vec3(.055,.042,.032),vec3(.20,.16,.125),n); ${o ? "alb=vec3(.62,.645,.68)*(.5+.65*n);" : "alb=mix(alb,vec3(.10,.14,.045),smoothstep(.5,.8,n)*sat(N.y+.3)*.6);"} float sh=mix(.35,1.,shadow(vW+N*.05,.4)); fin(alb*(sunC()*sat(dot(N,uSunL)*.8+.2)*sh+ambient(N)*${o ? "1.25" : ".8"}),vW); }`,
      ),
      2,
    ),
    l = o ? [e.last] : e.leaves,
    c = l.length,
    u = new Float32Array(c * 4),
    f = new Float32Array(c * 4),
    h = ze(9),
    d = 0,
    p = 0,
    x = 0;
  for (let y of e.leaves) ((d += y[0]), (p += y[1]), (x += y[2]));
  let v = e.leaves.length;
  ((d /= v), (p /= v), (x /= v));
  let m = 0;
  for (let y of e.leaves) m = Math.max(m, Math.hypot(y[0] - d, (y[1] - p) * 1.2, y[2] - x));
  l.forEach((y, S) => {
    (u.set([y[0], y[1], y[2], Math.hypot(y[0] - d, (y[1] - p) * 1.2, y[2] - x) / m], S * 4),
      f.set([h(), h(), h(), h()], S * 4));
  });
  let g = new Qt();
  (g.setAttribute(
    "position",
    new $t(new Float32Array([-0.5, 0, 0, -0.12, 0.42, 0.1, -0.12, -0.42, 0.1, 0.5, 0, 0]), 3),
  ),
    g.setIndex([0, 2, 1, 1, 2, 3]));
  let b = cn(
    Gn(g, c, { iP: [u, 4], iA: [f, 4] }),
    pn(
      i,
      `in vec4 iP,iA; uniform vec3 uO,uC; out vec3 vW,vN; out vec4 vA; void main(){ vec3 b=iP.xyz; float g=gust(uO.xz+b.xz*.6); float sw=(g*.07+.02*sin(uT*1.3+b.y))*uWind*b.y*b.y*.18; vec3 p=b+vec3(-.95,0.,.3)*sw; float f=uWind*(.4+.9*g); p+=vec3(sin(uT*2.1+iA.x*30.),sin(uT*2.7+iA.y*30.),sin(uT*1.9+iA.z*30.))*.012*f; float a=iA.x*6.283+.5*f*sin(uT*5.+iA.w*40.),e=(iA.y-.5)*2.2+.4*f*sin(uT*6.3+iA.x*50.); vec3 x=vec3(cos(a)*cos(e),sin(e),sin(a)*cos(e)); vec3 y=normalize(cross(x,vec3(iA.z-.5,1.,iA.w-.5))); vec3 nn=cross(x,y); float s=.062*(.7+.6*iA.z); ${o ? "s=.22;" : ""} vW=uO+p+(x*position.x+y*position.y*.8+nn*position.z)*s; vN=normalize(mix(nn*sign(dot(nn,normalize(b-uC))+.001),normalize(b-uC),.62)); vA=vec4(iA.xz,iP.w,b.y); ${s} }`,
      O0 +
        `in vec3 vW,vN; in vec4 vA; void main(){ vec3 N=normalize(vN); vec3 alb=mix(vec3(.045,.085,.022),vec3(.135,.165,.048),vA.x); alb=mix(alb,vec3(.09,.125,.070),step(.62,vA.y)*.6); alb=mix(alb,vec3(.24,.20,.07),smoothstep(.88,1.,vA.y)*.5); ${o ? "alb=vec3(1.5,1.55,1.6);" : ""} float in_=smoothstep(.25,.95,vA.z); float sh=mix(.30,1.,smoothstep(-.35,.55,dot(normalize(N),uSunL)))*mix(.35,1.,in_); fin(foliage(alb,N,vW,sh,mix(.35,1.,in_)),vW); }`,
      { side: oe, uniforms: { uC: new F(d, p - 0.3, x) } },
    ),
    3,
  );
  return (
    (r.material.uniforms.uO = b.material.uniforms.uO = { value: a.uO }),
    t.add(r, b),
    { wood: r, lv: b, n: c }
  );
}

var Ps = `
vec3 white(vec3 N,vec3 W,float sh,float ao,vec3 alb){ vec3 V=normalize(uCamP-W); float nl=sat(dot(N,uSunL)); vec3 c=alb*(sunC()*nl*.62*sh+ambient(N)*ao); float fr=pow(1.-sat(dot(N,V)),5.); vec3 r=reflect(-V,N); r.y=abs(r.y); vec3 sk=skyBase(r); c=mix(c,sk,fr*.55*mix(.5,1.,ao)); c+=sunC()*pow(sat(dot(r,uSunV)),140.)*.14*mix(.3,1.,sh); return c; }`;

function Ub(i, t, e) {
  let n = "gl_Position=projectionMatrix*viewMatrix*vec4(vW,1.);",
    o = ze(7),
    s = [],
    a = (y, S) => Sh(y, S),
    r = (y, S, M, w) => {
      let E = M * 0.5625,
        T = Math.max(6, ho.z - S),
        _ = Math.hypot(y, T);
      if (Math.abs(y) - M > T * 0.98 + 4) return;
      let R = 99,
        L = -99,
        k = 0,
        P = 0;
      for (let Z = 0; Z <= 4; Z++)
        for (let H = 0; H <= 4; H++) {
          let Y = a(y + (Z / 4 - 0.5) * M, S + (H / 4 - 0.5) * E);
          ((R = Math.min(R, Y)), (L = Math.max(L, Y)), (k += Y), P++);
        }
      if (L < -4) return;
      let C = Math.max(0.42, _ * 0.021),
        A = _ * 0.15,
        N = (L - R) / M,
        G = Yi(y * 0.07 + 3, S * 0.07, 2);
      if ((N > 0.42 || M > A || (N > 0.16 && M > A * 0.5) || (G > 0.02 && M > A * 0.42)) && M > C * 1.9) {
        for (let H = 0; H < 2; H++)
          for (let Y = 0; Y < 2; Y++)
            r(y + ((H + 0.5) / 2 - 0.5) * M, S + ((Y + 0.5) / 2 - 0.5) * E, M / 2, w + 1);
        return;
      }
      let ot = Math.hypot(y - xi.x, (S - xi.z) * 1.2),
        ut =
          _ < 22 ? Math.max(0.1, M * 0.09) : Math.max(0.16, Math.pow(2, Math.round(Math.log2(_ * 0.0135)))),
        lt = Math.round(((k / P) * 0.6 + L * 0.4) / ut) * ut;
      (ot < 3.6 && S > 16.5 && (lt = Math.min(lt, 4.4)), !(lt < -3.4) && s.push(y, lt, S, M, E, o(), w));
    };
  for (let y = -7; y <= 7; y++) for (let S = 0; S < 23; S++) r(y * 16, 33 - S * 9, 16, 0);
  let l = s.length / 7,
    c = new Float32Array(l * 4),
    u = new Float32Array(l * 4);
  for (let y = 0; y < l; y++)
    (c.set([s[y * 7], s[y * 7 + 1], s[y * 7 + 2], s[y * 7 + 5]], y * 4),
      u.set([s[y * 7 + 3], s[y * 7 + 4], s[y * 7 + 6], 0], y * 4));
  let f = new Rn();
  f.box(-0.5, -1, -0.5, 0.5, 0, 0.5, [0, 0, 0, 0], !0);
  let h = f.build(),
    p = pn(
      i,
      "in vec3 normal; in vec4 iP,iS; out vec3 vW,vN,vL; out vec4 vS; float lift(vec2 c){ float a=dot(c,vec2(.085,.052))-uTime*.16; float p=pow(.5+.5*sin(a),10.); float b=pow(.5+.5*sin(dot(c,vec2(-.041,.066))-uTime*.11+2.),14.); return p+b*.8; }" +
        `void main(){ float gap=.018*iS.x; float lf=(uMode>.5?0.:lift(iP.xz))*iS.x*.16; vec2 hs=vec2(iS.x,iS.y)-gap; float dep=3.2+iS.x*.3; vL=vec3(position.x*iS.x,position.y*dep,position.z*iS.y); vW=vec3(iP.x+position.x*hs.x,iP.y+lf+position.y*dep,iP.z+position.z*hs.y); vN=normal; vS=vec4(iS.xy,iP.w,lf); ${n} }`,
      Ps +
        `in vec3 vW,vN,vL; in vec4 vS; float ln(float x,float w){ float a=fwidth(x); return smoothstep(w+a,w,abs(fract(x-.5)-.5)/1.)*smoothstep(.5,.15,a); }
    void main(){ vec3 N=vN; vec4 b=baked(vW.xz); float d=length(vW-uCamP); vec3 alb=vec3(.93,.94,.935)*(.965+.035*vS.z); float ao=mix(.30,1.,b.g*b.g); float sh; float lit=0.;
     if(N.y>.5){ sh=shadow(vW+vec3(0.,.06,0.),.09); vec2 e=vS.xy*.5-abs(vL.xz); float ed=min(e.x,e.y); float aa=max(fwidth(ed),1e-4); float lip=smoothstep(.022*vS.x+aa,.022*vS.x-aa,ed); float g=0.; float sc=1.; vec2 q=vL.xz/vS.xy; for(int i=1;i<4;i++){ sc*=i==1?4.:4.; vec2 f=q*sc; vec2 w=fwidth(f); vec2 l=smoothstep(vec2(.05)+w,vec2(.05),abs(fract(f-.5)-.5))*smoothstep(.45,.1,max(w.x,w.y)); float on=step(.35,fract(vS.z*7.3+float(i)*.37)); g=max(g,max(l.x,l.y)*on*(.5/float(i))); } alb*=1.-.20*g; 
       // heliostats: every cell tilts together, so the glint walks over the hills
       float w=dot(vW.xz,vec2(.085,.052))-uTime*.16; vec2 cell=floor(q*4.); float tl=sin(w*1.0+cell.x*.0)*.10; N=normalize(N+vec3(tl*.35,0.,tl)); alb=mix(alb,vec3(1.),lip*.8); lit=lip*.07; vec3 c=white(N,vW,sh,ao,alb); c+=vec3(.86,.94,1.)*lit*.35; fin(c,vW); return; }
     float y=-vL.y; float st=.085; float f=y/st; float aw=fwidth(f); float seam=smoothstep(.16+aw,.14,abs(fract(f)-.5)*-1.+.5)*smoothstep(.9,.25,aw); float under=smoothstep(.0,.5,y); sh=shadow(vW+N*.12,.12); ao*=mix(1.,.42,smoothstep(.0,.8,y)); alb*=1.-.28*seam; vec3 c=white(N,vW,sh,ao,alb); float row=floor(f); float run=fract(row*.137+vS.z*.5-uTime*.05+ (abs(N.x)>.5?vL.z:vL.x)/vS.x*.5); c+=vec3(.78,.90,1.)*seam*smoothstep(.0,.06,run)*smoothstep(.16,.06,run)*.30*smoothstep(70.,20.,d); fin(c,vW); }`,
    ),
    x = cn(Gn(h, l, { iP: [c, 4], iS: [u, 4] }), p, 10);
  t.add(x);
  let v =
      "float lift(vec2 c){ float a=dot(c,vec2(.085,.052))-uTime*.16; float p=pow(.5+.5*sin(a),10.); float b=pow(.5+.5*sin(dot(c,vec2(-.041,.066))-uTime*.11+2.),14.); return p+b*.8; }",
    m =
      Ps +
      "in vec3 vW,vN,vL; void main(){ float sh=shadow(vW+vN*.05,.05); float ao=mix(.50,1.,smoothstep(.0,.8,vL.y)); vec3 c=white(vN,vW,mix(sh,1.,.12),ao,vec3(.95)); fin(c,vW); }",
    g = new Rn();
  g.box(-0.5, 0, -0.5, 0.5, 1, 0.5, [0, 0, 0, 0]);
  let b = g.build();
  {
    let y = [],
      S = [];
    for (let T = 0; T < l; T++) {
      let _ = s[T * 7],
        R = s[T * 7 + 1],
        L = s[T * 7 + 2],
        k = s[T * 7 + 3],
        P = k * 0.5625,
        C = Math.hypot(_, ho.z - L);
      if (R < -0.6 || C > 118) continue;
      let A = C > 74 ? 2 : 1,
        N = 0.92 * A,
        G = 0.8 * A;
      for (let B = Math.ceil((_ - k / 2) / N); B * N < _ + k / 2; B++)
        for (let ot = Math.ceil((L - P / 2) / G); ot * G < L + P / 2; ot++) {
          let ut = B * N,
            lt = ot * G;
          (Math.abs(ut - xi.x) < 3.75 && Math.abs(lt - xi.z) < 2.4) ||
            (L > 24.6 && Math.abs(ut) < 9 && lt > 27.4) ||
            (y.push(ut, R, lt, A), S.push(_, L, k, 0));
        }
    }
    let E = y.length / 4;
    (t.add(
      cn(
        Gn(b, E, { iA: [new Float32Array(y), 4], iB: [new Float32Array(S), 4] }),
        pn(
          i,
          `in vec3 normal; in vec4 iA,iB; out vec3 vW,vN,vL; ${v} void main(){ float lf=(uMode>.5?0.:lift(iB.xy))*iB.z*.16; float s=mix(1.,1.5,step(1.5,iA.w)); vL=position; vW=iA.xyz+vec3(position.x*.205*s,position.y*.364*s+lf-.005,position.z*.032*s); vN=normal; ${n} }`,
          m,
        ),
        4,
      ),
    ),
      (e.stones = E));
  }
  {
    let y = [];
    for (let _ = -12; _ <= 12; _++)
      for (let R = -62; R <= 12; R++) {
        let L = _ * 1.84,
          k = R * 1.035,
          P = -9;
        for (let [A, N] of [
          [0, 0],
          [0.9, 0],
          [-0.9, 0],
          [0, 0.5],
          [0, -0.5],
        ])
          P = Math.max(P, Sh(L + A, k + N));
        if (P > -0.95 || k > 9 || Math.abs(L) > 20) continue;
        let C = (9 - k) / 72 + 0.006 * Yi(L * 0.21, k * 0.21, 2) + 0.0035 * Math.abs(L - 2);
        y.push(L, k, C, o());
      }
    let w = y.length / 4,
      E = "float up(float d){ return smoothstep(0.,1.,(uTime*.0043+.30-iA.z)*9.+d); }";
    t.add(
      cn(
        Gn(h, w, { iA: [new Float32Array(y), 4] }),
        pn(
          i,
          `in vec3 normal; in vec4 iA; out vec3 vW,vN; out vec2 vL; ${E} void main(){ float k=up(0.); float y=mix(-2.4,-.46,k); vW=vec3(iA.x+position.x*${(1.84 * 0.955).toFixed(3)},y+position.y*1.6,iA.y+position.z*${(1.035 * 0.925).toFixed(3)}); vN=normal; vL=vec2(k,position.y); ${n} }`,
          Ps +
            "in vec3 vW,vN; in vec2 vL; void main(){ if(uMode>.5||vW.y<-1.6) discard; float wet=smoothstep(.95,.5,vL.x); vec3 c=white(vN,vW,shadow(vW,.15),vN.y>.5?1.:mix(1.,.35,smoothstep(0.,-.3,vL.y)),vec3(.93)*(1.-.35*wet)); fin(c,vW); }",
        ),
        7,
      ),
    );
    let T = new Float32Array(w * 8);
    for (let _ = 0; _ < w; _++)
      for (let R = 0; R < 2; R++)
        T.set([y[_ * 4] + (R - 0.5) * 0.92, y[_ * 4 + 1], y[_ * 4 + 2], y[_ * 4 + 3]], (_ * 2 + R) * 4);
    (t.add(
      cn(
        Gn(b, w * 2, { iA: [T, 4] }),
        pn(
          i,
          `in vec3 normal; in vec4 iA; out vec3 vW,vN,vL; ${E} void main(){ float k=up(-.75); k=k*k*(3.-2.*k); vL=position; float y=mix(-2.4,-.46,up(0.)); vW=vec3(iA.x+position.x*.205,y+(position.y-1.+k)*.364,iA.y+position.z*.032); vN=normal; ${n} }`,
          m.replace("void main(){", "void main(){ if(uMode>.5||vW.y<-.9) discard;"),
        ),
        7,
      ),
    ),
      t.add(
        cn(
          Gn(h, w, { iA: [new Float32Array(y), 4] }),
          pn(
            i,
            `in vec3 normal; in vec4 iA; out vec3 vW,vN; void main(){ float q=clamp((uTime*.0043+.30-iA.z)*8.5+1.04,0.,1.); float e=q*q*(3.-2.*q); float s=smoothstep(0.,.10,q)*step(q,.999); float y=mix(11.,-.40,pow(e,.85)); float an=(1.-smoothstep(.25,.97,e))*1.25; float ca=cos(an),sa=sin(an); vec3 pp=position*vec3(${(1.84 * 0.86).toFixed(3)},.04,${(1.84 * 0.86 * 0.5625).toFixed(3)})*s; vW=vec3(iA.x,y,iA.y)+vec3(pp.x,pp.y*ca-pp.z*sa,pp.y*sa+pp.z*ca); vN=vec3(normal.x,normal.y*ca-normal.z*sa,normal.y*sa+normal.z*ca); ${n} }`,
            Ps +
              "in vec3 vW,vN; void main(){ if(uMode>.5) discard; vec3 N=normalize(vN); fin(white(N,vW,1.,1.,vec3(.96))+sunC()*vec3(.90,.97,1.)*(.10+.16*sat(dot(-N,uSunL))),vW); }",
          ),
          7,
        ),
      ),
      (e.sea = w));
  }
  {
    let y = [],
      S = [];
    for (let E = 0; E < l; E++) {
      let T = s[E * 7],
        _ = s[E * 7 + 1],
        R = s[E * 7 + 2],
        L = s[E * 7 + 3],
        k = Math.hypot(T - xi.x, R - xi.z);
      if (_ < -0.4 || R > -8 || Yi(T * 0.06 + 5, R * 0.06 + 2, 2) < 0.06) continue;
      let C = L > 2.2 ? 3 : L > 1.1 ? 2 : 1;
      for (let A = 0; A < C; A++)
        for (let N = 0; N < C; N++)
          (y.push(T + ((A + 0.5) / C - 0.5) * L, _, R + ((N + 0.5) / C - 0.5) * L * 0.5625, (L / C) * 0.74),
            S.push(T, R, L, 0));
    }
    let M = y.length / 4,
      w = new Rn();
    (w.box(-0.5, -0.5, -0.5, 0.5, 0.5, 0.5, [0, 0, 0, 0], !0),
      w.box(-0.02, -1, -0.02, 0.02, 0, 0.02, [1, 0, 0, 0]),
      t.add(
        cn(
          Gn(w.build(), M, { iA: [new Float32Array(y), 4], iB: [new Float32Array(S), 4] }),
          pn(
            i,
            `in vec3 normal; in vec4 aG,iA,iB; out vec3 vW,vN; out vec2 vL; float lift(vec2 c){ float a=dot(c,vec2(.085,.052))-uTime*.16; float p=pow(.5+.5*sin(a),10.); float b=pow(.5+.5*sin(dot(c,vec2(-.041,.066))-uTime*.11+2.),14.); return p+b*.8; } void main(){ float w=dot(iA.xz,vec2(.060,.034))-uTime*.30; float an=.22+.62*sin(w); float c=cos(an),s=sin(an); float lf=(uMode>.5?0.:lift(iB.xy))*iB.z*.16; vec3 p; vec3 nn=normal; if(aG.x<.5){ p=position*vec3(iA.w,.035*iA.w+.008,iA.w*.5625); p=vec3(p.x,p.y*c-p.z*s,p.y*s+p.z*c); nn=vec3(normal.x,normal.y*c-normal.z*s,normal.y*s+normal.z*c); } else { p=position*vec3(iA.w,iA.w*.36,iA.w); } vW=iA.xyz+vec3(0.,iA.w*.36+lf,0.)+p; vN=nn; vL=vec2(aG.x,position.x); ${n} }`,
            Ps +
              "in vec3 vW,vN; in vec2 vL; void main(){ if(uMode>.5) discard; vec3 N=normalize(vN); vec3 c=white(N,vW,mix(.5,1.,shadow(vW+vec3(0.,.1,0.),.2)),1.,vL.x>.5?vec3(.6):vec3(.97)); vec3 V=normalize(uCamP-vW); if(vL.x<.5){ float g=pow(sat(dot(reflect(-V,N),normalize(uSunL+vec3(-.3,.1,.2)))),24.); c+=sunC()*g*.22; } fin(c,vW); }",
          ),
          6,
        ),
      ),
      (e.coll = M));
  }
  {
    let y = new Set(),
      S = [],
      M = 0.82,
      w = 0.62;
    for (let [R, , L, , k] of e.houses) {
      let P = Math.round(R / M),
        C = Math.round(L / w),
        A = P + "," + C;
      if (y.has(A)) continue;
      y.add(A);
      let N = P * M,
        G = C * w,
        B = Sh(N, G);
      B < 0.1 || S.push(N, B, G, ((P * 31 + C * 17) % 7) / 7);
    }
    let E = S.length / 4,
      T = new Float32Array(S),
      _ = new Rn();
    (_.box(-0.5, -0.8, -0.5, 0.5, 1, 0.5, [0, 0, 0, 0]),
      t.add(
        cn(
          Gn(_.build(), E, { iP: [T, 4] }),
          pn(
            i,
            `in vec3 normal; in vec4 iP; out vec3 vW,vN,vL; void main(){ float s=.62; vL=position; float lf=uMode>.5?0.:(.5+.5*sin(dot(iP.xz,vec2(.22,.31))-uTime*.22))*.28; vW=iP.xyz+position*vec3(s*1.0,s*.5625*1.55,.085)+vec3(0.,lf,0.); vN=normal; ${n} }`,
            Ps +
              "in vec3 vW,vN,vL; void main(){ float sh=shadow(vW+vec3(0.,.1,0.)+vN*.1,.15); float ao=mix(.6,1.,smoothstep(-.1,.8,vL.y)); vec3 c=white(vN,vW,sh,ao,vec3(.95,.955,.95)); float f=vL.y*9.; float aw=fwidth(f); float l=smoothstep(.14+aw,.12,abs(fract(f)-.5))*smoothstep(.8,.2,aw)*step(.5,vN.z); c*=1.-.12*l; c+=vec3(.8,.9,1.)*.05*l*pow(.5+.5*sin(vW.x*.7+vW.z*.4-uTime*.5),6.); fin(c,vW); }",
          ),
          6,
        ),
      ));
  }
  {
    let y = [],
      S = (R, L, k, P, C, A, N) => {
        let G = Math.floor((P - k) / C);
        for (let B = 0; B < G; B++) y.push(0, R, L, A, B * C, P - k, k, N);
      },
      M = (R, L, k, P, C, A, N, G = 0) => {
        let B = Math.floor((P - k) / C);
        for (let ot = 0; ot < B; ot++) y.push(R, L, G, A, ot * C, P - k, k, 100 + N);
      };
    for (let R = 0; R < 3; R++) S(0.9, -22 - R * 15, -70, 70, 2.4, 1.05, 0.75);
    for (let R = 0; R < 3; R++) S(6.2 + R * 0.75, -30, -80, 80, 2.6, 1.1, -0.75);
    for (let R = 0; R < 2; R++) S(13 + R * 1.6, -86, -150, 150, 4.2, 2.2, 0.6);
    for (let R = 0; R < 2; R++) M(2.4 + R * 7.4, -0.35, -130, 11, 3.6, 1.1, 0.5);
    for (let R = 0; R < 2; R++) M(-19 + R * 34, 8.2, -120, 30, 3.4, 1.3, -0.5);
    let w = y.length / 8,
      E = new Float32Array(w * 4),
      T = new Float32Array(w * 4);
    for (let R = 0; R < w; R++)
      (E.set(y.slice(R * 8, R * 8 + 4), R * 4), T.set(y.slice(R * 8 + 4, R * 8 + 8), R * 4));
    let _ = new Rn();
    (_.box(-0.5, -0.5, -0.5, 0.5, 0.5, 0.5, [0, 0, 0, 0], !0),
      t.add(
        cn(
          Gn(_.build(), w, { iA: [E, 4], iB: [T, 4] }),
          pn(
            i,
            `in vec3 normal; in vec4 iA,iB; out vec3 vW,vN; void main(){ float alongZ=step(50.,iB.w); float v=iB.w-alongZ*100.; float s=iB.z+mod(iB.x+uTime*v,iB.y); vec3 c=alongZ>.5?vec3(iA.x,iA.y,s):vec3(s,iA.y,iA.z); vec3 p=position*vec3(iA.w,.03,iA.w*.5625); vW=c+p; vN=normal; ${n} }`,
            Ps +
              "in vec3 vW,vN; void main(){ if(uMode>.5) discard; vec3 c=white(vN,vW,shadow(vW,.2),1.,vec3(.96));  fin(c,vW); }",
          ),
          6,
        ),
      ));
  }
  {
    let y = new Rn(),
      S = 8,
      M = 4.5,
      w = 0.1,
      E = 0.1;
    (y.box(-S, M - w, -E, S, M, E, [0, 0, 0, 0], !0),
      y.box(-S, -M, -E, S, -M + w, E, [0, 0, 0, 0], !0),
      y.box(-S, -M, -E, -S + w, M, E, [0, 0, 0, 0], !0),
      y.box(S - w, -M, -E, S, M, E, [0, 0, 0, 0], !0));
    let T = [],
      _ = 6;
    for (let L = 0; L < _; L++) T.push(L * 20.25, 0, 0, 1);
    for (let L = 0; L < 5; L++) T.push(L * 24, 1, 0, 1.9);
    let R = new Float32Array(T);
    t.add(
      cn(
        Gn(y.build(), T.length / 4, { iA: [R, 4] }),
        pn(
          i,
          `in vec3 normal; in vec4 iA; out vec3 vW,vN; out float vF; void main(){ float L=iA.y<.5?121.5:120.; float s=mod(iA.x+uTime*(iA.y<.5?.8:.6),L); vec3 c=iA.y<.5?vec3(8.5,4.2,-122.+s):vec3(-58.+s,9.6,-64.); vec3 p=position; p.xy*=iA.w; vW=c+p; vN=normal; vF=iA.y<.5?smoothstep(-6.,-20.,c.z)*smoothstep(-122.,-104.,c.z):smoothstep(-58.,-48.,c.x)*smoothstep(62.,50.,c.x); ${n} }`,
          Ps +
            "in vec3 vW,vN; in float vF; void main(){ if(uMode>.5||vF<.01) discard; vec3 c=white(vN,vW,1.,1.,vec3(.98))+vec3(.05,.06,.07); if(uClip>.5&&vW.y<uSea-.02) discard; o=vec4(air(c,vW),vF); }",
          { transparent: !0 },
        ),
        71,
      ),
    );
  }
  {
    let y = new Rn();
    y.box(-0.5, -0.5, -0.5, 0.5, 0.5, 0.5, [0, 0, 0, 0], !0);
    let S = [];
    for (let E = 0; E < 150; E++) S.push(0, E, 0, 0);
    for (let E = 0; E < 4; E++) for (let T = 0; T < 64; T++) S.push(E + 1, T, 0, 0);
    let M = new Float32Array(S),
      w = [];
    for (let [E, T] of [
      [0.016, 92],
      [0.044, 130],
      [0.536, 190],
      [0.675, 150],
      [0.7, 118],
      [0.775, 170],
      [0.865, 140],
      [0.955, 120],
    ]) {
      let _ = (E * 2 - 1) * 0.543 * T,
        R = ho.z - T;
      for (let L = 0; L < 90; L++) w.push(_, L, R, T * 0.0085);
    }
    (t.add(
      cn(
        Gn(y.build(), w.length / 4, { iA: [new Float32Array(w), 4] }),
        pn(
          i,
          `in vec3 normal; in vec4 iA; out vec3 vW,vN; void main(){ float sp=iA.w*.62; float y=mod(iA.y*sp+uTime*.9,90.*sp); vW=vec3(iA.x,y-1.,iA.z)+position*vec3(iA.w,iA.w*.07,iA.w*.5625); vN=normal; ${n} }`,
          Ps + "in vec3 vW,vN; void main(){ if(uMode>.5) discard; fin(white(vN,vW,1.,1.,vec3(.96)),vW); }",
        ),
        5,
      ),
    ),
      t.add(
        cn(
          Gn(y.build(), S.length / 4, { iA: [M, 4] }),
          pn(
            i,
            `in vec3 normal; in vec4 iA; uniform vec4 uTw; out vec3 vW,vN; void main(){ float k=iA.x; float sp=k<.5?.46:1.08; float H0=k<.5?69.:69.12; float y=mod(iA.y*sp+uTime*(k<.5?.8:-.55),H0); float sz=k<.5?2.7:.9; vec2 o2=k<.5?vec2(0.):vec2(k<2.5?-1.:1.,mod(k,2.)<.5?-1.:1.)*vec2(2.25,1.35); vec3 p=position*vec3(sz,.085,sz*.5625); vW=uTw.xyz+vec3(o2.x,y,o2.y)+p; vN=normal; ${n} }`,
            Ps +
              "in vec3 vW,vN; void main(){ if(uMode>.5) discard; vec3 c=white(vN,vW,1.,1.,vec3(.96)); if(vN.y<-.5) c*=.78; fin(c,vW); }",
            { uniforms: { uTw: new ie(Ur.x, 1, Ur.z, 0) } },
          ),
          5,
        ),
      ));
  }
  {
    let y = new Rn(),
      S = 3.4,
      M = 3.825,
      w = 1.9,
      E = 4.36;
    y.box(-S, 0, -w, S, M, w, [0, 0, 0, 0]);
    let T = cn(
      y.build(),
      pn(
        i,
        `in vec3 normal; out vec3 vW,vN,vL; uniform vec3 uO; void main(){ vL=position; vN=normal; vW=uO+position; ${n} }`,
        `in vec3 vW,vN,vL; void main(){ if(uMode>.5) discard; vec3 V=normalize(uCamP-vW); float fr=pow(1.-abs(dot(vN,V)),4.); vec3 r=reflect(-V,gl_FrontFacing?vN:-vN); vec3 sk=skyBase(vec3(r.x,abs(r.y)+.03,r.z)); vec3 hs=vec3(${S.toFixed(3)},${(M / 2).toFixed(3)},${w.toFixed(3)}); vec3 q=hs-abs(vL-vec3(0.,hs.y,0.)); float e=vN.x!=0.?min(q.y,q.z):vN.y!=0.?min(q.x,q.z):min(q.x,q.y); float aa=fwidth(e); float ed=smoothstep(.034+aa,.034-aa,e); float ed2=smoothstep(.30,.0,e); float band=vN.z>.5?smoothstep(.0,.02,sin((vL.x*.8+vL.y*.9)*1.1+.9)-.72)*.05:0.; float a=.045+min(fr,.5)*.22+ed*.96+ed2*ed2*.16+band; vec3 c=mix(min(sk,vec3(.16,.18,.2))+vec3(.012,.016,.02),vec3(.80,.88,.96),ed)+vec3(.10,.12,.14)*ed2*ed2; a=sat(a); if(!gl_FrontFacing){ float bk=vN.z<-.5?.90:.60; float gy=vL.y/3.825; vec3 fc=mix(vec3(.046,.056,.068),vec3(.016,.021,.028),gy); c=mix(fc,vec3(.55,.62,.70),ed*.8); a=max(bk*step(.5,1.-step(.5,abs(vN.y))),ed*.8); } o=vec4(air(c,vW),a); }`,
        { transparent: !0, depthWrite: !1, side: oe, uniforms: { uO: new F(xi.x, E, xi.z) } },
      ),
      80,
    );
    (t.add(T), (e.glass = T));
  }
  return ((e.slabCount = l), e);
}

// ── scene futures · "Two aims" · enterWith: tear ──
var Hb = 0.5,
  $R = `precision highp float; in vec2 vP; out vec4 o; uniform vec3 uC; uniform float uA,uH,uPx,uHot; uniform vec3 uY;
 float disc(float y,float r){ return length(vec2(vP.x,vP.y-y))-r; }
 void main(){ float px=uPx; float c=smoothstep(1.35+px,1.35-px*.3,abs(vP.x)); vec4 k=vec4(uC,1.)*c; float sh=exp(-abs(vP.x)*.11)*.16; k=max(k,vec4(0.,0.,0.,sh));
 float r0=9.5, r1=15.+3.*uHot; float d=min(min(disc(uY.x,r0),disc(uY.z,r0)),disc(uY.y,r1)); float ds=min(min(disc(uY.x,r0),disc(uY.z,r0)),disc(uY.y,r1)); float w=mix(3.,3.6,step(disc(uY.y,r1),d+.01)); k=mix(k,vec4(0.,0.,0.,max(k.a,.22)),0.); float s2=exp(-max(ds,0.)*.16)*.2; k.a=max(k.a,s2*step(0.,ds)); float D=smoothstep(px,-px,d), I=smoothstep(px,-px,d+w); k=mix(k,vec4(uC,1.),D); k=mix(k,vec4(1.),I); o=k*uA; }`,
  Bb = {
    id: "futures",
    title: "两个目标",
    enterWith: "tear",
    hud: { color: () => (Hb > 0.955 ? "#2f4647" : "#ffffff"), font: "monoMed" },
    beats: [
      { dur: 5, hold: 6, delay: 1.2, page: "\u221E" },
      { dur: 4, hold: 5, page: "\u221E" },
      { dur: 5, hold: 8, page: "\u221E" },
    ],
    notes: [
      "同一个海湾，同样的力量。这两边都出自同一个超级智能。左边，它的目标稍微偏了；右边，它是对的。你可以拖动这条线。",
      "2026 年 11 月 10 日，写下这些预测的 AI Futures Project 呼吁暂停。",
      "一切尚未决定。在这一页多停一会儿。如果有人问，你可以把另一个世界拖回来。",
    ],
    create(i) {
      let { gfx: t, view: e } = i,
        n = t.r,
        o = t.target({ samples: 4, depth: !0 }),
        s = t.target({ scale: 0.5, depth: !0 }),
        a = t.target({ scale: 0.4, depth: !0 }),
        r = new Ye(34, 1, 0.5, 520),
        l = new Ye(34, 1, 0.5, 520),
        c = new F(),
        u,
        f,
        h,
        d,
        p,
        x,
        v,
        m,
        g,
        b,
        y,
        S,
        M,
        w = !1,
        E = 0,
        T = 0.5,
        _ = 0,
        R = i.text("同样的力量。", { x: 120, y: 148, size: 76, font: "display", valign: "middle" }),
        L = i.text("不同的目标。", { x: 1100, y: 148, size: 76, font: "display", valign: "middle" }),
        k = i.text(
          "做出这些预测的人\n在呼吁暂停。",
          { x: 120, y: 144, size: 72, font: "display", valign: "middle", leading: 1.17 },
        ),
        P = i.text("AI Futures Project，2026 年 11 月 10 日", {
          x: 123,
          y: 262,
          size: 32,
          font: "text",
          valign: "middle",
        }),
        C = i.text(
          "一切\n尚未决定。",
          { x: 120, y: 160, size: 90, font: "display", valign: "middle", leading: 1.14 },
        ),
        A = i.overlay(),
        N = i.overlay(),
        G = i.overlay(),
        B = i.overlay();
      (A.add(R), N.add(L), G.add(k, P, C));
      let ot = new ce({
          glslVersion: re,
          vertexShader:
            "precision highp float; in vec3 position; uniform mat4 projectionMatrix; uniform vec4 uR; out vec2 vP; void main(){ vP=vec2(position.x*80.,uR.y+(position.y+.5)*uR.w); gl_Position=projectionMatrix*vec4(uR.x+vP.x,vP.y,0.,1.); }",
          fragmentShader: $R,
          transparent: !0,
          depthTest: !1,
          depthWrite: !1,
          side: oe,
          blending: Ie,
          blendSrc: pe,
          blendDst: je,
          uniforms: {
            uR: { value: new ie() },
            uC: { value: new F(...Do(i.SELECT)) },
            uA: { value: 1 },
            uH: { value: 1 },
            uPx: { value: 0.7 },
            uHot: { value: 0 },
            uY: { value: new F() },
          },
        }),
        ut = new Zt(new Ke(1, 1), ot);
      ((ut.frustumCulled = !1), B.add(ut));
      let lt = !1,
        Z = 0,
        H = 0.5,
        Y = 0,
        q = 0,
        st = 0,
        ct = 0,
        V = -1,
        ft = () => e.x0 + T * e.w,
        nt = (D, z) => Math.abs(D - Ct(ft(), e.x0 + 4, e.x1 - 4)) < 60,
        Mt = new ne(),
        Et = new ne().set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1),
        at = new ne(),
        rt = new ne();
      function U(D) {
        r.aspect = t.aspect;
        let z = D ? D.k(2, 0, 5, bt.io3) : 0,
          pt = D ? D.t : 0,
          ht = D ? D.mouse.x : 0,
          gt = D ? D.mouse.y : 0;
        (r.position.set(
          ho.x + ht * 0.55 + Math.sin(pt * 0.11) * 0.1,
          ho.y + gt * 0.18 + Math.sin(pt * 0.083) * 0.05 + z * 0.12,
          ho.z - z * 0.7,
        ),
          c.set(ht * 0.25, 7.2 - 0.62 + gt * 0.05 + z * 0.12, 12),
          (r.fov = 34),
          r.lookAt(c),
          r.updateProjectionMatrix(),
          r.updateMatrixWorld());
      }
      function j(D) {
        let z = r.position;
        return (
          l.position.set(z.x, 2 * D - z.y, z.z),
          l.up.set(0, -1, 0),
          l.lookAt(c.x, 2 * D - c.y, c.z),
          l.projectionMatrix.copy(r.projectionMatrix),
          l.projectionMatrixInverse.copy(r.projectionMatrixInverse),
          l.updateMatrixWorld(),
          l
        );
      }
      function J(D, z, pt, ht, gt, dt, Kt, Ot, Ut) {
        let O = r.position;
        ((D.uSea.value = dt), rt.multiplyMatrices(r.projectionMatrix, r.matrixWorldInverse));
        let I = j(dt);
        (D.uCamP.value.copy(I.position), (D.uClip.value = 1), (ht.visible = !1));
        for (let Ft of Pt[Ut ? 0 : 1]) Ft.visible = !1;
        ((pt.material.uniforms.uMain.value = 0),
          pt.material.uniforms.uIV.value.multiplyMatrices(I.projectionMatrix, I.matrixWorldInverse).invert(),
          pt.material.uniforms.uCVP.value.copy(rt),
          D.uCamP.value.copy(I.position),
          (gt.scissorTest = !0));
        let et = Math.max(0, Math.floor(Kt * gt.width) - 30),
          Tt = Math.min(gt.width, Math.ceil(Ot * gt.width) + 30);
        (gt.scissor.set(et, 0, Math.max(1, Tt - et), gt.height),
          Ut || W(1),
          t.draw(z, I, gt),
          Ut || W(0),
          (gt.scissorTest = !1),
          Mt.multiplyMatrices(I.projectionMatrix, I.matrixWorldInverse).premultiply(Et),
          ht.material.uniforms.uRM.value.copy(Mt),
          (ht.material.uniforms.tR.value = gt.texture),
          (D.uClip.value = 0),
          (ht.visible = !0));
        for (let Ft of Pt[Ut ? 0 : 1]) Ft.visible = !0;
        (D.uCamP.value.copy(O),
          (pt.material.uniforms.uMain.value = 1),
          pt.material.uniforms.uIV.value.copy(rt).invert());
        let vt = Math.round(Kt * o.width),
          zt = Math.round(Ot * o.width);
        ((o.scissorTest = !0),
          o.scissor.set(vt, 0, Math.max(1, zt - vt), o.height),
          t.draw(z, r, o),
          (o.scissorTest = !1));
      }
      let Pt = [[], []];
      function $() {
        let D = t.W * t.H > 26e5,
          z = D ? 2 : 4;
        (o.samples !== z && ((o.samples = z), o.dispose()), b.fit());
        for (let [pt, ht, gt] of [
          [s, 0.5, 960],
          [a, 0.4, 768],
        ]) {
          let dt = Math.min(ht, gt / t.W);
          Math.abs(pt._scale - dt) > 0.001 &&
            ((pt._scale = dt),
            pt.setSize(Math.max(1, Math.round(t.W * dt)), Math.max(1, Math.round(t.H * dt))));
        }
      }
      let tt = [];
      function W(D) {
        ((y.land.visible = !D),
          (y.landLo.visible = !!D),
          y.trees.forEach((z, pt) => {
            (tt[pt] === void 0 && (tt[pt] = z.geometry.instanceCount),
              (z.geometry.instanceCount = D ? Math.floor(tt[pt] * 0.5) : tt[pt]));
          }));
      }
      return {
        async init() {
          ((u = Lb(t)),
            (f = t2(0, u)),
            (h = t2(1, u)),
            (d = new ge()),
            (p = new ge()),
            (d.matrixWorldAutoUpdate = p.matrixWorldAutoUpdate = !1));
          let D = kb(),
            z = En(xi.x, xi.z) - 0.02;
          ((y = Db(h, p, D)),
            (M = c2(h, p, D, z, !1)),
            Ub(f, d, y),
            (S = c2(f, d, D, z, !0)),
            (x = r2(f)),
            (v = r2(h)),
            (m = l2(f)),
            (g = l2(h)),
            d.add(x, m),
            p.add(v, g),
            (f.uWind.value = 0),
            (b = Fb(t, h, u, i.headless)),
            y.people && y.people(0));
          for (let [pt, ht, gt] of [
            [f, d, [x, m]],
            [h, p, [v, g]],
          ]) {
            let dt = pt.uWind.value;
            pt.uWind.value = 0;
            let Kt = e2(t, ht, pt, "uDF", 1536, pt.uSunL.value, gt);
            pt.tBF.value = null;
            let Ot = e2(t, ht, pt, "uDN", 1536, pt.uSunL.value, gt);
            ((pt.tBF.value = Kt.out.texture),
              (pt.tBN.value = Ot.out.texture),
              t.free(Kt.h),
              t.free(Ot.h),
              (pt.uWind.value = dt));
          }
          ((Pt = [
            [y.glass, S.wood, S.lv],
            [y.grass, M.wood, M.lv],
          ]),
            $(),
            (w = !0));
        },
        enter(D) {
          ((Y = 0), (lt = !1), (st = D.beat), b && b.reset(), (E = 30), (V = D.beat > 0 ? D.beat : -1));
        },
        exit() {
          ((n.domElement.style.cursor = ""), (lt = !1));
        },
        resize() {
          w && $();
        },
        pointer(D, z, pt, ht) {
          if (D === "down") return nt(z, pt) ? ((lt = !0), (Z = z - ft()), (H = T), (Y = 1), !0) : !1;
          if (D === "move")
            return (
              (n.domElement.style.cursor = lt || nt(z, pt) ? "ew-resize" : ""),
              lt && ((H = Ct((z - Z - e.x0) / e.w)), (Y = 1)),
              (ct = nt(z, pt) ? 1 : 0),
              lt
            );
          if (D === "up") {
            let gt = lt;
            return ((lt = !1), gt);
          }
        },
        update(D) {
          let z = D.k(1, 0, 3.4, bt.io3),
            pt = D.k(2, 0, 4.6, bt.io3);
          D.beat !== st && ((st = D.beat), Y > 0 && !lt && (q = 1));
          let ht = 0.497 + 0.143 * Math.sin(D.t * 0.24 - 0.35),
            gt = K(K(ht, 0.72 + 0.012 * Math.sin(D.t * 0.3), z), 0, pt);
          (q && !lt && ((Y -= D.dt / 2.6), Y <= 0 && ((Y = 0), (q = 0))),
            lt && (q = 0),
            (T = K(gt, H, kt(Y))),
            i.headless && window.__fdiv != null && (T = window.__fdiv),
            (Hb = T));
          let dt = 1 + 0.55 * pt;
          E += D.dt * K(1, 1.35, pt);
          for (let zt of [f, h])
            ((zt.uTime.value = D.t),
              (zt.uT.value = E),
              (zt.uCool.value = z * (1 - pt)),
              (zt.uOpen.value = pt));
          ((h.uWind.value = dt), y.people(E), U(D));
          let Kt = ft(),
            Ot = D.k(0, 0, 1.8, bt.lin),
            Ut = D.k(0, 0.7, 2.5, bt.lin),
            O = D.k(1, 0, 0.8, bt.lin),
            I = (zt, Ft, wt, mt) => Ct(zt, wt, Math.max(wt, mt - Ft));
          ((R.x = Math.min(120, Kt - 56 - R.box.w)),
            R.x < e.x0 + 40 && (R.x = Math.min(e.x0 + 40, 120)),
            (L.x = Math.max(1800 - L.box.w, Kt + 56)),
            L.x + L.box.w > e.x1 - 40 && (L.x = e.x1 - 40 - L.box.w),
            R.show(Ot, { style: "rise", q: O }),
            L.show(Ut, { style: "rise", q: O }));
          let et = D.k(2, 0, 0.9, bt.lin);
          (k.show(D.k(1, 0.9, 2.9, bt.lin), { style: "rise", by: "word", q: et }),
            P.show(D.k(1, 2.2, 3.4, bt.lin), { style: "blur", q: et }),
            C.show(D.k(2, 2.3, 4.6, bt.lin), { style: "rise", by: "word" }));
          let Tt = ot.uniforms;
          (Tt.uR.value.set(Kt, e.y0, 0, e.h),
            Tt.uY.value.set(e.y0 + 34, 600, e.y1 - 34),
            (Tt.uPx.value = 0.75 / Math.max(0.2, e.scale)),
            (Tt.uHot.value += ((ct || lt ? 1 : 0) - Tt.uHot.value) * Mr(10, D.dt)),
            (Tt.uA.value = Ct(D.enter * 3 - 1.6) * (1 - 0 * pt)));
          let vt = i.audio;
          (vt &&
            vt.param &&
            (vt.param("wind", Ct((1 - T) * (0.5 + 0.4 * pt))), vt.param("hum", Ct(T * 0.55))),
            D.dt > 0 &&
              D.beat !== V &&
              (D.beat > V &&
                i.sfx("shimmer", { gain: D.beat === 2 ? 0.6 : 0.35, pitch: D.beat === 1 ? 0.7 : 1 }),
              (V = D.beat)));
        },
        render(D, z) {
          if (!w) return;
          let pt = K(0.45, 1, Ct((z.q - 0.58) / 0.42));
          ((y.grass.geometry.instanceCount = Math.floor(y.grassN * pt)),
            (M.lv.geometry.instanceCount = Math.floor(M.n * K(0.6, 1, pt))));
          let ht = Ct(T),
            gt = o.width,
            dt = Math.round(ht * gt);
          (dt < gt && b.render(r, z.q, ht),
            (v.material.uniforms.tCl.value = b.tex),
            (x.material.uniforms.tCl.value = b.tex),
            dt > 0 && J(f, d, x, m, s, Nb, 0, dt / gt, !0),
            dt < gt && J(h, p, v, g, a, Ib, dt / gt, 1, !1));
          let Kt = z.k(2, 0, 5),
            Ot = z.k(1, 0, 3);
          t.post(o, D, {
            exposure: 0.86 + 0.08 * Kt,
            bloom: 0.2,
            threshold: 1.3,
            radius: 0.8,
            tone: "aces",
            contrast: 1.06,
            saturation: 1.05,
            vignette: 0.16,
            grain: 0.016,
            time: z.t,
          });
          let Ut = D ? D.width : t.W,
            O = D ? D.height : t.H,
            I = Math.round(ht * Ut),
            et = (Tt, vt, zt) => {
              zt <= vt ||
                (D && ((D.scissorTest = !0), D.scissor.set(vt, 0, zt - vt, O)),
                Tt.render(D),
                D && (D.scissorTest = !1));
            };
          (et(A, 0, I), et(N, I, Ut), G.render(D), ot.uniforms.uA.value > 0.01 && B.render(D));
        },
      };
    },
  };

var Eh = [
    "office",
    "tower",
    "boat",
    "loop",
    "swarm",
    "dominoes",
    "calendar",
    "lamp",
    "selectall",
    "aim",
    "futures",
  ],
  _h = 16,
  Ac = 9,
  ZR = 1.15,
  JR = Ac + ZR,
  Vb = 1,
  u2 = 6,
  Th = (i) => Vb * Math.exp(i / u2),
  Ob = (i) => (Vb / u2) * Math.exp(i / u2),
  Ch = -170,
  Ah = 37,
  ss = 6e3,
  Rh = new Float32Array(ss + 1),
  Vo = new Float32Array(ss + 1);

for (let i = 0; i <= ss; i++) {
  let t = K(Ch, Ah, i / ss);
  ((Rh[i] = t), (Vo[i] = i ? Vo[i - 1] + Math.hypot(t - Rh[i - 1], Th(t) - Th(Rh[i - 1])) : 0));
}

// ── scene pile · "You are here" · enterWith: portal-in ──
var QR = (i) => {
    let t = Ct((i - Ch) / (Ah - Ch)) * ss,
      e = Math.min(ss - 1, Math.floor(t));
    return K(Vo[e], Vo[e + 1], t - e);
  },
  V0 = (i) => {
    let t = 0,
      e = ss;
    if (i <= 0) return { x: Ch + i, y: Th(Ch), tx: 1, ty: 0 };
    if (i >= Vo[ss]) {
      let r = Ob(Ah),
        l = Math.hypot(1, r);
      return { x: Ah + (i - Vo[ss]) / l, y: Th(Ah) + ((i - Vo[ss]) * r) / l, tx: 1 / l, ty: r / l };
    }
    for (; e - t > 1;) {
      let r = (t + e) >> 1;
      Vo[r] <= i ? (t = r) : (e = r);
    }
    let n = (i - Vo[t]) / (Vo[e] - Vo[t]),
      o = K(Rh[t], Rh[e], n),
      s = Ob(o),
      a = Math.hypot(1, s);
    return { x: o, y: Th(o), tx: 1 / a, ty: s / a };
  },
  t6 = QR(-13),
  Hr = (i) => t6 + i * JR,
  e6 = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  Gb = {
    id: "pile",
    title: "你在这里",
    enterWith: "portal-in",
    hud: { color: "#3a4456", font: "monoMed" },
    beats: [
      { dur: 12, hold: 3, page: "\u221E" },
      { dur: 7, hold: 5, page: "1" },
    ],
    notes: [
      "整场演讲，就是这一条曲线。现在我们沿着它往回走。\n（等这段下坠停下来。）这就是今天。",
      "往上看。这场演讲里的一切都在那面墙上，而那面墙就在我们前面几步远的地方。从这里看，它还是平的。指数曲线的底部，看起来就是这样。",
    ],
    create(i) {
      let { gfx: t, view: e } = i,
        n = t.target({ samples: 4, depth: !0 }),
        o = i.overlay(),
        s = new ge(),
        a = new Ye(38, 1, 0.2, 1600),
        r =
          "vec3 skyc(vec3 d){ float h=max(d.y,0.); vec3 c=mix(vec3(.86,.72,.62),vec3(.42,.60,.86),smoothstep(0.,.36,h)); c=mix(c,vec3(.07,.18,.50),smoothstep(.3,1.,h)); float s=max(dot(d,normalize(vec3(-.45,.42,.62))),0.); c+=vec3(1.,.78,.5)*(pow(s,6.)*.22+pow(s,60.)*.35); return c; }",
        l = t.pass(
          Fe +
            r +
            `uniform mat4 uInv; uniform vec3 uC; void main(){ vec4 f=uInv*vec4(vUv*2.-1.,1.,1.); vec3 d=normalize(f.xyz/f.w-uC); vec3 c=skyc(d); if(d.y>.0){ vec2 p=d.xz/(d.y+.12)*1.1+vec2(uTime*.012,0.); float n=fbm(p*1.4+fbm(p*2.+uTime*.01)); float cl=smoothstep(.52,.86,n)*smoothstep(0.,.22,d.y); c=mix(c,vec3(1.02,1.,.98),cl*.75); }
      else { float t=-(uC.y+1.2)/d.y; vec3 p=uC+d*t; vec3 g=mix(vec3(.36,.40,.48),vec3(.50,.53,.58),fbm(p.xz*.035+fbm(p.xz*.11)))+.05*vnoise(p.xz*.9); float z=abs(p.z)-8.; float sh=1.-.55*exp(-max(z,0.)*.35)*smoothstep(20.,-10.,p.x)*step(-165.,p.x); g*=sh; float fr=pow(1.-abs(d.y),5.); vec3 rf=skyc(normalize(vec3(d.x,-d.y+.03*(vnoise(p.xz*.6+uTime*.2)-.5),d.z))); g=mix(g,rf,.12+.5*fr); c=mix(g,skyc(vec3(d.x,.015,d.z)),1.-exp(-t*.0042)); } o=vec4(c,1.); }`,
          { uInv: new ne(), uC: new F() },
        ),
        c =
          "precision highp float; in vec3 position; in vec3 normal; in vec2 uv; uniform mat4 projectionMatrix,viewMatrix; out vec3 vP,vN; out vec2 vU; void main(){ vP=position; vN=normal; vU=uv; gl_Position=projectionMatrix*viewMatrix*vec4(position,1.); }",
        u =
          Fe +
          Sn +
          r +
          `in vec3 vP,vN; in vec2 vU; out vec4 o; uniform vec3 cameraPosition; uniform sampler2D tA; uniform float uPic,uTime;
      void main(){ vec3 n=normalize(vN); vec3 v=normalize(cameraPosition-vP); if(dot(n,v)<0.) n=-n; vec3 L=normalize(vec3(-.45,.42,.62)); float d=max(dot(n,L),0.); vec3 alb=vec3(.93); float fib=vnoise(vP*vec3(9.,9.,9.))*.5+vnoise(vP*31.)*.5; alb*=.965+.05*fib; float ink=0.;
       if(uPic>.5){ vec3 t=toLin(texture(tA,vU).rgb); alb=mix(alb,t*.97,.985); }
       vec3 amb=mix(vec3(.46,.45,.47),vec3(.50,.60,.76),n.y*.5+.5); vec3 c=alb*(d*vec3(1.02,.88,.70)*.92+amb*.72); float gl=pow(max(dot(reflect(-v,n),L),0.),24.); c+=gl*.05; float dist=length(cameraPosition-vP); vec3 f=skyc(normalize(vP-cameraPosition)); c=mix(c,f,(1.-exp(-dist*.0021))*.92); c=mix(c,f,smoothstep(230.,520.,vP.y)); o=vec4(c,1.); }`,
        f = (U, j) =>
          new ce({
            glslVersion: re,
            side: oe,
            vertexShader: c,
            fragmentShader:
              `precision highp float;
` + u,
            uniforms: { tA: { value: U }, uPic: { value: j }, uTime: { value: 0 } },
          });
      function h(U, j, J, Pt, $) {
        let tt = $,
          W = [],
          D = [],
          z = [],
          pt = [];
        for (let gt = 0; gt <= tt; gt++) {
          let dt = V0(K(U, j, gt / tt)),
            Kt = -dt.ty,
            Ot = dt.tx;
          for (let Ut of [1, -1])
            (W.push(dt.x + Kt * Pt, dt.y + Ot * Pt, (Ut * J) / 2),
              D.push(Kt, Ot, 0),
              z.push(Ut > 0 ? 1 : 0, gt / tt));
          if (gt < tt) {
            let Ut = gt * 2;
            pt.push(Ut, Ut + 1, Ut + 2, Ut + 1, Ut + 3, Ut + 2);
          }
        }
        let ht = new Qt();
        return (
          ht.setAttribute("position", new ae(W, 3)),
          ht.setAttribute("normal", new ae(D, 3)),
          ht.setAttribute("uv", new ae(z, 2)),
          ht.setIndex(pt),
          ht
        );
      }
      let d = new Zt(h(-40, Vo[ss] + 400, _h + 1.5, 0, 1400), f(null, 0));
      ((d.frustumCulled = !1), s.add(d));
      let p = [],
        x = (U, j) => {
          let J = h(Hr(U) - Ac / 2, Hr(U) + Ac / 2, _h, 0.03, 40),
            Pt = new Zt(J, f(null, j));
          return ((Pt.frustumCulled = !1), s.add(Pt), Pt);
        };
      Eh.forEach((U, j) => p.push({ id: U, mesh: x(j, 1), tex: null }));
      let v = new ce({
        glslVersion: re,
        side: oe,
        transparent: !0,
        depthWrite: !1,
        vertexShader: c,
        fragmentShader:
          "precision highp float; in vec3 vP; in vec2 vU; out vec4 o; uniform vec3 cameraPosition; void main(){ vec2 p=min(vU,1.-vU)*vec2(16.,9.); float d=min(p.x,p.y); float w=max(fwidth(d),.03); float a=1.-smoothstep(w*.6,w*1.6,d); a*=.28*exp(-length(cameraPosition-vP)*.008); o=vec4(.25,.3,.4,a); }",
      });
      for (let U = -14; U < 0; U++) {
        let j = x(U, 0);
        j.material = v;
      }
      for (let U = Eh.length; U < Eh.length + 16; U++) {
        let j = x(U, 0);
        j.material = v;
      }
      let m = ze(5),
        g = 260,
        b = new Hi(
          new Ke(1.6, 0.9),
          new ce({
            glslVersion: re,
            side: oe,
            vertexShader:
              "precision highp float; in vec3 position; in mat4 instanceMatrix; uniform mat4 projectionMatrix,viewMatrix; out vec3 vN,vP; void main(){ vec4 w=instanceMatrix*vec4(position,1.); vN=mat3(instanceMatrix)*vec3(0,0,1); vP=w.xyz; gl_Position=projectionMatrix*viewMatrix*w; }",
            fragmentShader:
              "precision highp float; in vec3 vN,vP; out vec4 o; uniform vec3 cameraPosition; void main(){ vec3 n=normalize(vN); float d=abs(dot(n,normalize(vec3(-.45,.42,.62)))); float k=1.-exp(-length(cameraPosition-vP)*.006); o=vec4(mix(vec3(.9)*(.55+.6*d*vec3(1.,.9,.76)),vec3(.78,.86,.95),k),1.); }",
          }),
          g,
        );
      ((b.frustumCulled = !1), s.add(b));
      let y = Array.from({ length: g }, () => [m(), m(), m(), m(), m()]),
        S = new ne(),
        M = new qe(),
        w = new qe(),
        E = new Cn(),
        T = new F(),
        _ = new F(),
        R = new F(),
        L = new F(),
        k = new ne(),
        P = new F(),
        C = i.text("你在这里。", { x: 130, y: 210, size: 108, font: "display", color: "#10182a" }),
        A = i.text(" ", { x: 136, y: 350, size: 36, font: "text", color: "#2b3446" }),
        N = i.text(
          "这里是\n平坦的那一段。",
          { x: 130, y: 240, size: 108, font: "display", color: "#ffffff" },
        ),
        G = new i.SelectBox({ handle: 9 });
      o.add(C, A, N, G);
      let B = new ba(),
        ot = !1;
      function ut() {
        for (let U of p) {
          let j = i.snapshots[U.id];
          j
            ? ((U.mesh.material.uniforms.tA.value = j.texture), (U.flip = !1))
            : U.tex
              ? (U.mesh.material.uniforms.tA.value = U.tex)
              : ((U.tex = new Tn(new Uint8Array([210, 216, 226, 255]), 1, 1)),
                (U.tex.needsUpdate = !0),
                (U.mesh.material.uniforms.tA.value = U.tex),
                B.load(
                  i.asset("thumb-" + U.id + ".jpg"),
                  (J) => {
                    ((J.colorSpace = Mn),
                      (J.anisotropy = 8),
                      (U.tex = J),
                      i.snapshots[U.id] || (U.mesh.material.uniforms.tA.value = J));
                  },
                  void 0,
                  () => {},
                ));
        }
      }
      let lt = () => {
        let U = Math.tan((a.fov * Math.PI) / 360);
        return Math.min(Ac / 2 / U, _h / 2 / (U * t.aspect));
      };
      function Z(U, j, J, Pt, $ = 0) {
        let tt = V0(U),
          W = -tt.ty,
          D = tt.tx;
        (J.set(tt.x + W * j, tt.y + D * j, 0),
          L.set(tt.tx, tt.ty, 0),
          _.set(tt.x, tt.y, 0),
          k.lookAt(J, _, L),
          Pt.setFromRotationMatrix(k));
      }
      let H = new F(),
        Y = new qe(),
        q = new F(),
        st = new qe(),
        ct = new F(),
        V = new qe(),
        ft = (U) =>
          [
            [1, 1],
            [1, -1],
            [-1, -1],
            [-1, 1],
          ].map(([j, J], Pt) => {
            let $ = Hr(U) + (Pt < 2 ? Ac / 2 : -Ac / 2),
              tt = V0($),
              W = Pt === 0 || Pt === 3 ? -_h / 2 : _h / 2;
            return new F(tt.x - tt.ty * 0.03, tt.y + tt.tx * 0.03, W);
          }),
        nt = {},
        Mt = (U) => nt[U] || (nt[U] = ft(U)),
        Et = (U) => Mt(U).map((j) => (T.copy(j).project(a), [T.x, T.y])),
        at = [
          [-1, 1],
          [1, 1],
          [1, -1],
          [-1, -1],
        ],
        rt = 0;
      return {
        init() {
          (ut(), (ot = !0));
        },
        enter(U) {
          ut();
          let j = new Date();
          A.set(`${j.getDate()} ${e6[j.getMonth()]} ${j.getFullYear()}`);
        },
        portal: {
          in(U) {
            let j = bt.io3(Te(0, 0.3, U.enter));
            return {
              c: Et(Eh.length - 1).map((Pt, $) => [K(at[$][0], Pt[0], j), K(at[$][1], Pt[1], j)]),
              a: 1 - kt(Te(0.45, 0.8, U.enter)),
              shade: 1,
            };
          },
          out(U) {
            let j = bt.io3(Te(0.35, 1, U.exit));
            return {
              c: Et(-1).map((Pt, $) => [K(Pt[0], at[$][0], j), K(Pt[1], at[$][1], j)]),
              a: kt(Te(0, 0.25, U.exit)),
              shade: 1,
            };
          },
        },
        update(U) {
          ((a.aspect = t.aspect), (a.fov = 38));
          let j = Hr(Eh.length - 1),
            J = Hr(0),
            Pt = lt(),
            $ = bt.out3(U.enter),
            tt = U.at(0),
            W = bt.ioExpo(Te(1.6, 10.6, tt)),
            D = K(j, J - 1, W),
            z = K(K(Pt, 21, $), 17, Te(0, 0.5, W)) + 14 * Math.sin(Math.PI * W) * 0.6;
          Z(D, Math.max(Pt * (1 - $), z), H, Y);
          let pt = bt.io4(Te(8.6, 12, tt)),
            ht = V0(Hr(-1));
          (q.set(ht.x - 25, 9.5, 8),
            _.set(ht.x + 16, 3.4, -8.5),
            L.set(0, 1, 0),
            k.lookAt(q, _, L),
            st.setFromRotationMatrix(k),
            a.position.lerpVectors(H, q, pt),
            a.quaternion.slerpQuaternions(Y, st, pt));
          let gt = bt.io4(Te(0.2, 6, U.at(1)));
          (ct.set(ht.x - 14 + Math.sin(U.t * 0.13) * 0.8, 5.2, 4.2),
            _.set(ht.x + 44, 50 + Math.sin(U.t * 0.17) * 1.6, -17),
            k.lookAt(ct, _, L),
            V.setFromRotationMatrix(k),
            a.position.lerp(ct, gt),
            a.quaternion.slerp(V, gt));
          let dt = bt.io3(U.exit);
          dt > 0 && (Z(Hr(-1), Pt, H, Y), a.position.lerp(H, dt), a.quaternion.slerp(Y, dt));
          let Kt = $ * (1 - dt);
          (a.rotateY(-U.mouse.x * 0.035 * Kt + Math.sin(U.t * 0.21) * 0.006 * Kt),
            a.rotateX(U.mouse.y * 0.025 * Kt + Math.sin(U.t * 0.27) * 0.005 * Kt),
            (a.fov = K(38, 50, gt * (1 - dt))),
            a.updateProjectionMatrix(),
            a.updateMatrixWorld());
          for (let I = 0; I < g; I++) {
            let [et, Tt, vt, zt, Ft] = y[I],
              wt = (((Tt * 120 - U.t * (1.1 + zt)) % 120) + 120) % 120;
            (T.set(
              K(-70, 60, et) + Math.sin(U.t * 0.4 + Ft * 9) * 2,
              wt,
              (vt - 0.5) * 130 + Math.cos(U.t * 0.33 + et * 9) * 2,
            ),
              Math.abs(T.z) < 9 && (T.z += 14 * Math.sign(T.z || 1)),
              E.set(U.t * (0.4 + zt) + et * 6, U.t * 0.5 * (Ft - 0.5) + Tt * 6, Ft * 6),
              M.setFromEuler(E),
              S.compose(T, M, R.setScalar(0.55 + zt * 0.5)),
              b.setMatrixAt(I, S));
          }
          b.instanceMatrix.needsUpdate = !0;
          let Ot = U.k(1, 0, 0.9, bt.lin);
          (C.show(U.k(0, 10.6, 11.9, bt.lin), { style: "rise", by: "word", stagger: 0.4, q: Ot }),
            A.show(U.k(0, 11.2, 12, bt.lin), { style: "blur", q: Ot }),
            N.show(U.k(1, 3.2, 5.2, bt.lin), {
              style: "rise",
              by: "word",
              stagger: 0.5,
              q: Te(0, 0.35, U.exit),
            }));
          let Ut = U.k(0, 10.9, 11.5, bt.lin) * (1 - U.k(1, 0, 0.6));
          if (Ut > 0) {
            let I = i.rectOf(Mt(-1), a, e);
            G.set(I.x - 8, I.y - 8, I.w + 16, I.h + 16).appear(Ut);
          } else G.alpha(0);
          ((l.u.uTime.value = U.t),
            l.u.uC.value.copy(a.position),
            l.u.uInv.value.copy(a.projectionMatrix).multiply(k.copy(a.matrixWorld).invert()).invert());
          let O = Math.abs(W - (this.pk ?? W)) / Math.max(0.001, U.dt);
          ((this.pk = W), i.audio.param("speed", Ct(O * 2.4)));
        },
        render(U, j) {
          (l.render(n, !0),
            t.draw(s, a, n, { clear: !1 }),
            t.post(n, U, {
              tone: "none",
              bloom: 0.16,
              threshold: 0.9,
              contrast: 1.08,
              saturation: 1.12,
              time: j.t,
            }),
            o.render(U));
        },
      };
    },
  };

// ── scene questions · "Any questions?" · enterWith: portal-out ──
var qb = {
  id: "questions",
  title: "有问题吗？",
  enterWith: "portal-out",
  hud: { color: "#7f7f7f", font: "arial", alpha: 0.9 },
  beats: [
    { dur: 0.6, hold: 4, page: "1" },
    { dur: 4, hold: 2.5, page: "1" },
    { dur: 12, hold: 8, page: "1" },
  ],
  notes: [
    "有问题吗？\n（回到那份无聊的模板。让大家以为已经讲完了。）",
    "（按下一页，看着屏幕，而不是看着会场。）",
    "让它停在这。整场演讲最终都归结到这个问题：将有某种东西能够编辑这个世界，而我们必须说得出自己想要什么。\n（几秒之后，幻灯片偏了一度。）",
  ],
  create(i) {
    let { gfx: t, view: e, THREE: n } = i,
      o = i.overlay(),
      s = i.overlay(),
      a = i.overlay(),
      r = new Qn({ color: "#0d0f13", order: -20 });
    o.add(r);
    let l = new n.Group();
    s.scene.add(l);
    let c = new Qn({ color: "#ffffff", order: -10 }),
      u = t.target({}),
      f = Wf(i, s);
    s.add(c);
    let h = i.text("有问题吗？", {
        x: 960,
        y: 420,
        size: 96,
        font: "arial",
        color: "#000000",
        align: "center",
        valign: "middle",
      }),
      d = i.text(" ", {
        x: 960,
        y: 590,
        size: 60,
        font: "arial",
        color: "#000000",
        align: "center",
        valign: "middle",
      }),
      p = new Qn({ color: "#000000", order: 5 });
    s.add(h, d, p);
    let x = new i.SelectBox();
    a.add(x);
    let v = t.pass(
        "uniform sampler2D tA; uniform float ang,sc; uniform vec3 bg; void main(){ vec2 as=vec2(uRes.x/uRes.y,1.); vec2 p=(vUv-.5)*as; float c=cos(ang),s=sin(ang); p=mat2(c,-s,s,c)*p/sc; vec2 u=p/as+.5; vec2 d=min(u,1.-u)*uRes; float e=clamp(min(d.x,d.y)+.5,0.,1.); vec2 q=u-vec2(.004,-.007); vec2 dd=min(q,1.-q); float sh=smoothstep(-.02,.012,min(dd.x*as.x,dd.y)); o=vec4(mix(bg*(1.-.6*sh),texture(tA,u).rgb,e),1.); }",
        { tA: null, ang: 0, sc: 1, bg: new n.Vector3(0.12, 0.125, 0.14) },
      ),
      m = "我有一个。",
      g = "你想要什么？",
      b = "",
      y = {},
      S = (E, T, _, R) => {
        (T && !y[E] && R.dt > 0 && R.dir > 0 && _(), (y[E] = T));
      },
      M = 0,
      w = 1;
    return {
      enter() {
        ((y = {}), (b = ""));
      },
      update(E) {
        (c.set(e.x0, e.y0, e.w, e.h), r.set(e.x0, e.y0, e.w, e.h), f.update(), h.animate());
        let T = E.at(1),
          _ = E.at(2),
          R = " ";
        (E.p[2] > 0
          ? (R =
              _ < 0.9
                ? m.slice(0, Math.max(0, m.length - Math.floor(_ * 22)))
                : g.slice(0, Math.max(0, Math.floor((_ - 1.5) * 11))))
          : E.p[1] > 0 && (R = m.slice(0, Math.max(0, Math.floor((T - 1.5) * 9)))),
          (R = R || " "),
          R !== b && (E.dt > 0 && E.dir > 0 && i.sfx("type", { gain: 0.8 }), (b = R), d.set(R)),
          d.animate());
        let L = R.trim() ? d.width : 0,
          k = E.p[1] > 0 && T > 0.8;
        (p.set(960 + L / 2 + 6, 560, 3.5, 62).alpha(k && Math.sin(E.t * 6.2) > -0.3 ? 1 : 0),
          S("s", E.p[1] > 0 && T > 0.55, () => i.sfx("select"), E));
        let P = g.length,
          C = 1.5 + P / 11,
          A = bt.io4(Te(C + 1, C + 3.4, _)),
          N = Math.max(260, L) + 60,
          G = [960 - N / 2, 534, N, 112],
          B = e,
          ot = 26,
          ut = [B.x0 + ot, B.y0 + ot, B.w - 2 * ot, B.h - 2 * ot];
        (S("g", A > 0.05, () => i.sfx("select", { pitch: 0.5 }), E),
          S("g2", A > 0.9, () => i.sfx("sub", { gain: 0.5 }), E));
        let lt = A * Math.sin(E.t * 0.9) * 4,
          Z = G.map((q, st) => K(q, ut[st], A)),
          H = Te(0.5, 0.8, T);
        x.set(Z[0] - lt, Z[1] - lt, Z[2] + 2 * lt, Z[3] + 2 * lt)
          .alpha(Ct(H * 3))
          .size(Math.max(0.05, bt.outBack(Ct(H), 2)) * (1 + 0.55 * A))
          .knob(A < 0.02);
        let Y = bt.io4(Te(C + 4.2, C + 6.4, _));
        if (
          ((M = ((-Y * Math.PI) / 180) * (1 + 0.03 * Math.sin(E.t * 0.7))),
          (w = 1 - 0.035 * Y),
          S("tilt", Y > 0.02, () => i.sfx("creak", { gain: 0.5 }), E),
          (x.mat.uniforms.uRot.value = -M * 0 + M * -1),
          Y > 0)
        ) {
          let q = w,
            st = 960,
            ct = 540;
          x.set(
            st + (Z[0] - lt - st) * q,
            ct + (Z[1] - lt - ct) * q,
            (Z[2] + 2 * lt) * q,
            (Z[3] + 2 * lt) * q,
            -M,
          );
        }
        this.tl = Y;
      },
      render(E, T) {
        if (this.tl <= 0) {
          (s.render(E), a.render(E));
          return;
        }
        (s.render(u),
          (v.u.tA.value = u.texture),
          (v.u.ang.value = M),
          (v.u.sc.value = w),
          v.render(E),
          a.render(E));
      },
    };
  },
};

var na = (i) => (i < 0 ? 0 : i > 1 ? 1 : i),
  we = (i, t, e) => na((i - t) / (e - t)),
  ke = (i) => i * i * (3 - 2 * i),
  Br = (i) => i * i * i * (i * (i * 6 - 15) + 10),
  xn = (i, t, e) => i + (t - i) * e,
  Wb = new WeakMap(),
  f2 = (i, t, e) => {
    let n = Wb.get(i.gfx);
    return (n || Wb.set(i.gfx, (n = new Map())), n.has(t) || n.set(t, e()), n.get(t));
  },
  Rc = (i) => f2(i, "ms", () => i.gfx.target({ samples: 4, depth: !0 })),
  ia = (i, t = 0) => f2(i, "mips" + t, () => n6(i));

function n6(i, { scale: t = 1 } = {}) {
  let e = i.gfx.target({ mips: !0, scale: t });
  e.texture.anisotropy = 8;
  let n = i.gfx.pass(
    Sn + "uniform sampler2D tA; void main(){ o=vec4(toLin(clamp(texture(tA,vUv).rgb,0.,1.)),1.); }",
    { tA: null },
  );
  return {
    rt: e,
    get texture() {
      return e.texture;
    },
    update(o) {
      return ((n.u.tA.value = o.texture), n.render(e), e.texture);
    },
  };
}

var G0 = (i) => f2(i, "mask", () => i6(i));

function i6(i, t = 0.25) {
  let e = i.gfx,
    n = e.target({ scale: t }),
    o = e.target({ scale: t }),
    s = e.target({ scale: t * 0.5 }),
    a = e.target({ scale: t * 0.5 }),
    r = e.pass(
      "uniform sampler2D tA; uniform vec2 uD; uniform float uCh; void main(){ float s=0.,w=0.; for(int i=-7;i<=7;i++){ float k=exp(-float(i*i)/22.); vec4 t=texture(tA,vUv+uD*float(i)); s+=k*(uCh>.5?t.a:t.r); w+=k; } o=vec4(s/w,0.,0.,1.); }",
      { tA: null, uD: new Nt(), uCh: 1 },
    ),
    l = (c, u, f, h, d) => {
      ((r.u.tA.value = c), r.u.uD.value.set(f, h), (r.u.uCh.value = d), r.render(u));
    };
  return {
    near: o,
    far: a,
    update(c, u = 0.004) {
      let f = e.aspect;
      return (
        l(c, n, (u / f) * 0.35, 0, 1),
        l(n.texture, o, 0, u * 0.35, 0),
        l(o.texture, s, (u / f) * 1.1, 0, 0),
        l(s.texture, a, 0, u * 1.1, 0),
        this
      );
    },
  };
}

function h2(i, t = new Se()) {
  let [e, n, o, s] = i,
    a = s[0],
    r = s[1],
    l = o[0],
    c = o[1],
    u = n[0],
    f = n[1],
    h = e[0],
    d = e[1],
    p = l - u,
    x = h - u,
    v = a - l + u - h,
    m = c - f,
    g = d - f,
    b = r - c + f - d,
    y = p * g - x * m;
  if (!(Math.abs(y) > 1e-12)) return null;
  let S = (v * g - x * b) / y,
    M = (p * b - v * m) / y;
  if (
    (t.set(l - a + S * l, h - a + M * h, a, c - r + S * c, d - r + M * d, r, S, M, 1),
    Math.abs(t.determinant()) < 1e-14)
  )
    return null;
  t.invert();
  let w = (a + l + u + h) / 4,
    E = (r + c + f + d) / 4,
    T = t.elements;
  return (T[2] * w + T[5] * E + T[8] < 0 && t.multiplyScalar(-1), t);
}

function q0(i) {
  let t = ia(i),
    e = new Se(),
    n = new F(1, 1, 1),
    o = i.gfx.pass(
      Sn +
        `uniform sampler2D tTop,tBase,tMip; uniform mat3 uH; uniform float uA; uniform vec3 uShade;
    void main(){ vec4 base=texture(tBase,vUv); vec3 q=uH*vec3(vUv*2.-1.,1.); vec2 uv=q.xy/q.z; vec2 gx=dFdx(uv),gy=dFdy(uv);
      vec2 g=vec2(length(vec2(gx.x,gy.x)),length(vec2(gx.y,gy.y)))+1e-9; vec2 e0=uv/g+.5, e1=(1.-uv)/g+.5; vec4 e=clamp(vec4(e0,e1)+1e-3,0.,1.); float cov=q.z>1e-7?e.x*e.y*e.z*e.w:0.; float k=cov*uA;
      if(k<=0.){ o=base; return; }
      vec2 rs=vec2(textureSize(tTop,0)); float m=max(length(gx*rs),length(gy*rs)); vec2 cu=clamp(uv,0.,1.);
      vec3 sharp=texture(tTop,cu).rgb; float f=smoothstep(1.015,1.4,m); vec3 lt=toLin(clamp(sharp,0.,1.)); if(f>0.) lt=mix(lt,textureGrad(tMip,cu,gx*.8,gy*.8).rgb,f); lt*=uShade;
      vec3 lb=toLin(clamp(base.rgb,0.,1.)); bool id=k>.9995&&f<=0.&&all(lessThan(abs(uShade-1.),vec3(1e-4))); o=vec4(id?sharp:toSrgb(mix(lb,lt,k)),1.); }`,
      { tTop: null, tBase: null, tMip: null, uH: e, uA: 1, uShade: n },
    );
  return {
    draw(s, a, r, l) {
      let c = r && r.c ? (r.a ?? 1) : 0;
      if (!(c > 0) || !h2(r.c, e)) {
        i.gfx.copy(s, l);
        return;
      }
      ((o.u.tMip.value = t.update(a)),
        (o.u.tTop.value = a.texture),
        (o.u.tBase.value = s.texture),
        (o.u.uA.value = Math.min(1, c)));
      let u = r.shade ?? 1;
      (Array.isArray(u) ? n.set(u[0], u[1], u[2]) : n.set(u, u, u), o.render(l));
    },
  };
}

function W0(i, t) {
  let e = -0.62 * ke(na(t * 1.1)),
    n = 0.16 * ke(t),
    o = -9 * t * t * (1.6 - 0.6 * t),
    s = 2.6,
    a = 0.9 * t * t,
    r = 0.35 * t * t,
    l = Math.cos(e),
    c = Math.sin(e),
    u = Math.cos(n),
    f = Math.sin(n);
  return [
    [-1, 1],
    [1, 1],
    [1, -1],
    [-1, -1],
  ].map(([h, d]) => {
    let p = h * i,
      x = d,
      v = 0;
    (([x, v] = [x * u, x * f]), ([p, v] = [p * l + v * c, -p * c + v * l]));
    let m = s / (s - (v + o));
    return [((p + a * 3) * m) / i, (x + r * 2) * m];
  });
}
