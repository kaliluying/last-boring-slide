// deck/shared.js
// Canvas/texture helpers, METR dataset + chart drawing, agenda copy, camera path, exposure/tone curve.
// Part 410-426 of the original 613 top-level statements; all modules are
// concatenated back into one IIFE by build.mjs, so they share a single scope.

var pA =
    "precision highp float; in vec3 position; uniform mat4 projectionMatrix; uniform vec4 uR; out vec2 vUv; void main(){ vUv=vec2(position.x+.5,position.y+.5); vec2 p=uR.xy+vUv*uR.zw; gl_Position=projectionMatrix*vec4(p,0.,1.); }",
  mA =
    "precision highp float; in vec2 vUv; out vec4 o; uniform vec3 uC; uniform float uA,uT; uniform sampler2D tA; void main(){ vec4 c=uT>.5?texture(tA,vUv):vec4(uC,1.); o=c*uA; }",
  Qn = class {
    constructor({
      x: t = 0,
      y: e = 0,
      w: n = 10,
      h: o = 10,
      color: s = "#ffffff",
      tex: a = null,
      order: r = 0,
    } = {}) {
      ((this.mat = new ce({
        vertexShader: pA,
        fragmentShader: mA,
        glslVersion: re,
        transparent: !0,
        depthTest: !1,
        depthWrite: !1,
        side: oe,
        blending: Ie,
        blendSrc: pe,
        blendDst: je,
        uniforms: {
          uR: { value: new ie(t, e, n, o) },
          uC: { value: new F(...Do(s)) },
          uA: { value: 1 },
          uT: { value: a ? 1 : 0 },
          tA: { value: a },
        },
      })),
        (this.mesh = new Zt(new Ke(1, 1), this.mat)),
        (this.mesh.frustumCulled = !1),
        (this.mesh.renderOrder = r));
    }
    set(t, e, n, o) {
      return (this.mat.uniforms.uR.value.set(t, e, n, o), this);
    }
    alpha(t) {
      return ((this.mat.uniforms.uA.value = t), (this.mesh.visible = t > 0.001), this);
    }
    color(t) {
      return (this.mat.uniforms.uC.value.set(...Do(t)), this);
    }
  },
  o0 = "#3f6fb5";

function q3(i, t) {
  let e = document.createElement("canvas");
  ((e.width = i), (e.height = t));
  let n = new Hn(e);
  return (
    (n.colorSpace = Mn),
    (n.generateMipmaps = !1),
    (n.minFilter = He),
    (n.flipY = !1),
    { c: e, g: e.getContext("2d"), t: n }
  );
}

function W3(i, t, { W: e = 768, H: n = 192, size: o = 150 } = {}) {
  let a = document.createElement("canvas");
  ((a.width = e), (a.height = n));
  let r = a.getContext("2d", { willReadFrequently: !0 });
  ((r.fillStyle = "#fff"), (r.font = t(o)));
  let l = r.measureText(i),
    c = Math.min(1, (e * 0.94) / l.width);
  ((r.font = t(o * c)),
    (r.textAlign = "center"),
    (r.textBaseline = "alphabetic"),
    r.fillText(i, e / 2, n * 0.5 + o * c * 0.36));
  let u = r.getImageData(0, 0, e, n).data,
    f = 1e10,
    h = e * n,
    d = new Float64Array(h),
    p = new Float64Array(h),
    x = new Uint8Array(h);
  for (let w = 0; w < h; w++) {
    let E = u[w * 4 + 3] / 255;
    ((x[w] = E > 0.5 ? 1 : 0),
      E >= 1
        ? ((p[w] = 0), (d[w] = f))
        : E <= 0
          ? ((p[w] = f), (d[w] = 0))
          : ((p[w] = Math.max(0, 0.5 - E) ** 2), (d[w] = Math.max(0, E - 0.5) ** 2)));
  }
  let v = (w, E, T, _, R, L, k) => {
      ((R[0] = 0), (L[0] = -f), (L[1] = f));
      for (let P = 0; P < _; P++) k[P] = w[E + P * T];
      for (let P = 1, C = 0; P < _; P++) {
        let A;
        do {
          let N = R[C];
          A = (k[P] - k[N] + P * P - N * N) / (P - N) / 2;
        } while (A <= L[C] && --C > -1);
        (C++, (R[C] = P), (L[C] = A), (L[C + 1] = f));
      }
      for (let P = 0, C = 0; P < _; P++) {
        for (; L[C + 1] < P;) C++;
        let A = R[C];
        w[E + P * T] = k[A] + (P - A) * (P - A);
      }
    },
    m = Math.max(e, n),
    g = new Int32Array(m),
    b = new Float64Array(m + 1),
    y = new Float64Array(m);
  for (let w of [d, p]) {
    for (let E = 0; E < e; E++) v(w, E, e, n, g, b, y);
    for (let E = 0; E < n; E++) v(w, E * e, 1, e, g, b, y);
  }
  let S = new Float32Array(h);
  for (let w = 0; w < h; w++) S[w] = (Math.sqrt(p[w]) - Math.sqrt(d[w])) / n;
  let M = new Tn(S, e, n, ts, An);
  return (
    (M.minFilter = M.magFilter = He),
    (M.needsUpdate = !0),
    (M.flipY = !1),
    { tex: M, mask: x, W: e, H: n, aspect: e / n }
  );
}

function Wf(i, t) {
  let e = new Qn({ color: o0, order: 1 }),
    n = new Qn({ color: "#a9c0e2", order: 1 });
  return (
    t.add(e, n),
    {
      update(o = 1) {
        let s = i.view;
        (e.set(s.x0, s.y1 - 22, s.w, 22).alpha(o), n.set(s.x0, s.y1 - 30, s.w, 5).alpha(o));
      },
    }
  );
}

function X3() {
  let { c: i, g: t, t: e } = q3(1500, 1960),
    n = "";
  return {
    tex: e,
    draw(o, s, a, r = 2) {
      let l = o.toFixed(3) + "q" + s.toFixed(3) + a.toFixed(3);
      if (l === n) return;
      n = l;
      let c = 2;
      (t.setTransform(c, 0, 0, c, 0, 390 * c),
        t.clearRect(0, -390, 750, 980),
        t.save(),
        (t.globalAlpha = 1 - a),
        (t.fillStyle = "#404040"),
        (t.font = "30px Arial"),
        (t.textAlign = "center"),
        t.fillText("AI 进展（预测）", 385, 128),
        (t.strokeStyle = "#cfcfcf"),
        (t.lineWidth = 1.5),
        (t.fillStyle = "#595959"),
        (t.font = "20px Arial"));
      for (let h = 0; h <= 5; h++) {
        let d = 500 - h * 66;
        (t.beginPath(),
          t.moveTo(80, d),
          t.lineTo(700, d),
          t.stroke(),
          (t.textAlign = "right"),
          t.fillText(String(h * 20), 68, d + 6));
      }
      t.textAlign = "center";
      for (let h = 0; h <= 5; h++) t.fillText(String(2020 + h * 10), 80 + h * 124, 528);
      ((t.fillStyle = o0),
        t.fillRect(335, 556, 26, 5),
        (t.fillStyle = "#595959"),
        (t.textAlign = "left"),
        t.fillText("系列 1", 370, 564),
        t.restore(),
        (t.strokeStyle = o0),
        (t.lineWidth = 5),
        (t.lineJoin = "round"),
        (t.lineCap = "round"),
        t.beginPath());
      let u = K(700, 420, o),
        f = K(240, -380, o);
      for (let h = 0; h <= 160; h++) {
        let d = h / 160,
          p = K(80, u, d),
          x = d,
          v = (Math.exp(6 * d) - 1) / (Math.exp(6) - 1),
          m = K(480, f, K(x, v, o));
        h ? t.lineTo(p, m) : t.moveTo(p, m);
      }
      (t.stroke(), (e.needsUpdate = !0), (this.tip = [u, f]));
    },
    tip: [700, 240],
  };
}

function Y3(i) {
  let { gfx: t, view: e } = i,
    n = { word: W3("更好。", (u) => Ln("displayBold", u)) },
    o = [],
    s = (u, f) => {
      let h = i.overlay(),
        d = i.overlay(),
        p = new Qn({ color: u, order: -10 });
      d.add(p);
      let x = f(h, (v) => p.color(v));
      o.push({
        color: u,
        update(v, m, g) {
          (p.set(e.x0, e.y0, e.w, e.h), x(v, m, g));
        },
        render(v) {
          (d.render(v), x.extra && x.extra.render(v), h.render(v));
        },
        rect: x.rect,
      });
    };
  (s("#ffffff", (u) => {
    let f = i.text("我能修好它。", {
        x: 160,
        y: 540,
        size: 170,
        font: "textBold",
        color: "#101216",
        tracking: -0.035,
        valign: "middle",
      }),
      h = [];
    for (let p = 0; p < 13; p++) {
      let x = new Qn({ color: "#dfe3ea" });
      (h.push(x), u.add(x));
    }
    for (let p = 0; p < 8; p++) {
      let x = new Qn({ color: "#dfe3ea" });
      (h.push(x), u.add(x));
    }
    u.add(f);
    let d = (p) => {
      (f.show(Ct(p / 0.9), { style: "rise", by: "word", stagger: 0.4 }),
        h.forEach((x, v) => {
          let m = bt.out4(Ct((p - 0.02 * v) / 0.7));
          if (v < 13) {
            let g = 160 + v * 133.3;
            x.set(g, 540 - 560 * m, 1.5, 1120 * m);
          } else {
            let g = 120 + (v - 13) * 120;
            x.set(960 - 1400 * m, g, 2800 * m, 1.5);
          }
          x.alpha(m);
        }));
    };
    return ((d.rect = () => [136, 436, 830, 206]), d);
  }),
    s("#f1f2f2", (u) => {
      let f = i.gfx.pass(
        "uniform vec2 c; uniform float r; uniform vec4 v; void main(){ vec2 p=v.xy+vec2(vUv.x,1.-vUv.y)*v.zw; float d=length(p-c)-r; float a=1.-smoothstep(-.8,.8,d); o=vec4(vec3(.898,.118,.086)*a,a); }",
        { c: new Nt(), r: 10, v: new ie() },
        { blending: Ie, transparent: !0 },
      );
      ((f.material.blendSrc = pe), (f.material.blendDst = je));
      let h = i.text("更好。", {
        x: 150,
        y: 800,
        size: 400,
        font: "textBold",
        color: "#0c0d0f",
        tracking: -0.055,
        valign: "base",
      });
      u.add(h);
      let d = (p, x) => {
        let v = bt.outBack(Ct(p / 0.8), 1.2);
        (f.u.c.value.set(K(2400, 1390, v), K(-300, 400, v) + Math.sin(p * 3) * 14),
          (f.u.r.value = 310 + 26 * Math.sin(p * 2.2)),
          f.u.v.value.set(e.x0, e.y0, e.w, e.h),
          h.show(Ct(p / 0.8), { style: "rise", by: "glyph", stagger: 0.45 }));
      };
      return ((d.rect = () => [128, 500, 1190, 330]), (d.extra = f), d);
    }),
    s("#cfe0ee", (u) => {
      let f = i.text("更好。", {
          x: 960,
          y: 560,
          size: 560,
          font: "serifIt",
          color: "#0b2346",
          align: "center",
          valign: "middle",
          tracking: -0.03,
        }),
        h = [0, 1, 2, 3].map((p) => {
          let x = new Qn({ color: "#0b2346" });
          return (u.add(x), x);
        });
      u.add(f);
      let d = (p) => {
        (f.animate((x, v) => {
          let m = bt.out4(Ct((p - x.n * 0.06) / 0.7));
          ((v.alpha = m),
            (v.dy = (1 - m) * 160),
            (v.skew = (1 - m) * 0.6 + 0.06 * Math.sin(p * 3 + x.n)),
            (v.rot = (1 - m) * 0.25));
        }),
          h.forEach((x, v) => {
            let m = bt.io3(Ct((p - v * 0.06) / 0.6));
            x.set(120, [130, 142, 946, 950][v], 1680 * m, [8, 2, 2, 8][v]);
          }));
      };
      return ((d.rect = () => [230, 290, 1460, 560]), d);
    }),
    s("#ffd21f", (u) => {
      let f = i.text("更好！", {
        x: 960,
        y: 560,
        size: 980,
        font: "anton",
        color: "#15110a",
        align: "center",
        valign: "middle",
        tracking: 0,
      });
      u.add(f);
      let h = (d) => {
        let p = f.glyphs.map((g, b) => g.w * (1 + 0.55 * Math.sin(d * 5.2 - b * 1.05))),
          x = p.reduce((g, b) => g + b, 0),
          v = 1840 / x,
          m = -920;
        f.animate((g, b) => {
          let y = p[g.n] * v;
          ((b.sx = y / g.w), (b.dx = m + y / 2 - g.cx), (m += y));
          let S = bt.out4(Ct((d - g.n * 0.035) / 0.5));
          b.dy = (1 - S) * (g.n % 2 ? 1200 : -1200);
        });
      };
      return ((h.rect = () => [40, 130, 1840, 850]), h);
    }),
    s("#8fe0b8", (u) => {
      let f = i.text("更好。", {
          x: 960,
          y: 540,
          size: 210,
          font: "pixel",
          color: "#0d3b2a",
          align: "center",
          valign: "middle",
        }),
        h = [];
      for (let p = 0; p < 60; p++) {
        let x = new Qn({ color: p % 3 ? "#0d3b2a" : "#f6ffe8" });
        (h.push(x), u.add(x));
      }
      u.add(f);
      let d = (p) => {
        let x = Math.floor(p * 14) / 14;
        (f.animate((v, m) => {
          let g = Math.max(0, Math.sin((x * 1.6 - v.n * 0.12) * Ve));
          ((m.dy = -Math.round(g * 4) * 26), (m.alpha = x > v.n * 0.035 ? 1 : 0));
        }),
          h.forEach((v, m) => {
            let g = m % 3,
              b = 30,
              y = ((m * 137 + Math.floor(p * 10 * (g + 1)) * b) % 2400) - 240;
            v.set(y, 860 + g * 60, b * 2, b);
          }));
      };
      return ((d.rect = () => [200, 400, 1520, 290]), d);
    }),
    s("#2347d9", (u) => {
      let h = i.text(
        Array.from({ length: 19 }, (x, v) => "比更好 比更好 比更好 比更好 比更好").join(`
`),
        {
          x: 960,
          y: 540,
          size: 46,
          font: "jb",
          color: "#9db4ff",
          align: "center",
          valign: "middle",
          leading: 1.28,
        },
      );
      u.add(h);
      let d = i.text("更好", {
        x: 960,
        y: 540,
        size: 330,
        font: "jb",
        color: "#ffffff",
        align: "center",
        valign: "middle",
        tracking: -0.04,
      });
      u.add(d);
      let p = (x) => {
        (h.animate((v, m) => {
          let g = v.cx / 900,
            b = v.cy / 520,
            y = Math.hypot(g, b),
            S = Math.sin(y * 7 - x * 8);
          ((m.dx = ((v.line % 2 ? 1 : -1) * x * 160) % 80),
            (m.scale = 1 + 0.35 * S),
            (m.alpha =
              Ct(x * 3 - y) *
              (0.35 + 0.4 * (S * 0.5 + 0.5)) *
              kt((Math.abs(v.cy) - 110) / 60 + (Math.abs(v.cx) > 640 ? 1 : 0))),
            (m.dy = S * 8));
        }),
          d.show(Ct(x / 0.6), { style: "drop", stagger: 0.4 }));
      };
      return ((p.rect = () => [330, 360, 1260, 330]), p);
    }),
    s("#ff9db8", (u) => {
      let f = "更好 ".repeat(80),
        h = i.text(f, { x: 960, y: 540, size: 58, font: "displayBold", color: "#6b0f2c" });
      u.add(h);
      let d = [
          [90, 6],
          [185, 15],
          [285, 24],
          [390, 33],
          [500, 42],
          [612, 52],
          [730, 62],
          [850, 72],
          [975, 82],
          [1100, 92],
        ],
        p = [];
      d.forEach(([v, m], g) => {
        for (let b = 0; b < m && p.length < h.n; b++) p.push([v, b / m, g]);
      });
      let x = (v) => {
        h.animate((m, g) => {
          let b = p[m.n];
          if (!b) {
            g.alpha = 0;
            return;
          }
          let [y, S, M] = b,
            w = bt.out4(Ct((v - M * 0.05) / 0.6)),
            E = S * Ve + (M % 2 ? -1 : 1) * v * (1.5 - M * 0.12),
            T = y * w * (1 + 0.05 * Math.sin(v * 6 - M));
          ((g.dx = Math.cos(E) * T - m.cx),
            (g.dy = Math.sin(E) * T - m.cy),
            (g.rot = E + Math.PI / 2),
            (g.alpha = w));
          let _ = M % 2;
          ((g.r = _ ? 0.42 : 0.98), (g.g = _ ? 0.06 : 0.98), (g.b = _ ? 0.17 : 0.94));
        });
      };
      return ((x.rect = () => [330, 60, 1260, 960]), x);
    }));
  let a = t.target({ scale: 0.75 }),
    r =
      Fe +
      y3 +
      Sn +
      `uniform sampler2D tW; uniform float uK,uE; const vec2 WS=vec2(8.,2.);
    float w2(vec2 p){ vec2 q=p/WS+.5; vec2 c=clamp(q,vec2(.004),vec2(.996)); float d=texture(tW,vec2(c.x,1.-c.y)).r*WS.y; return d+length((q-c)*WS); }`,
    l = t.pass(
      r +
        `
    float map(vec3 p){ float d=w2(p.xy); float h=.55+.35*sin(uK*3.-p.x*.9); h*=uE; float k=abs(p.z-h)-h; vec2 w=vec2(d-.012,k-.012); return min(max(w.x,w.y),0.)+length(max(w,0.))-.02; }
    vec3 nrm(vec3 p){ vec2 e=vec2(.006,0); return normalize(vec3(map(p+e.xyy)-map(p-e.xyy),map(p+e.yxy)-map(p-e.yxy),map(p+e.yyx)-map(p-e.yyx))); }
    void main(){ vec2 uv=(vUv-.5)*vec2(uRes.x/uRes.y,1.)*2.; float a=-.5+uK*.38; vec3 ro=vec3(sin(a)*8.,-3.4+uK*.5,9.2); vec3 ta=vec3(0.,0.,.3); vec3 f=normalize(ta-ro),r=normalize(cross(f,vec3(0,1,0))),u=cross(r,f); vec3 rd=normalize(f*3.5+r*uv.x+u*uv.y);
     float t=4.,h; bool hit=false; for(int i=0;i<90;i++){ h=map(ro+rd*t); if(h<.002){hit=true;break;} t+=h*.8; if(t>30.)break; } float tp=-ro.z/rd.z; vec3 L=normalize(vec3(-.55,.6,.75)); vec3 base=vec3(.95,.30,.07); vec3 c;
     vec3 p=ro+rd*t; if(!hit||(tp>0.&&tp<t)){ t=tp; p=ro+rd*t; hit=false; }
     vec3 n=hit?nrm(p):vec3(0,0,1); float sh=1.,s=.04; for(int i=0;i<36;i++){ float d=map(p+n*.012+L*s); sh=min(sh,10.*d/s); s+=clamp(d,.02,.3); if(d<.001||s>7.)break; } sh=clamp(sh,0.,1.);
     float ao=clamp(map(p+n*.22)/.22,0.,1.)*.6+.4; vec3 alb=hit?(n.z>.8?vec3(1.,.93,.78):vec3(.85,.12,.04)):base; float df=max(dot(n,L),0.)*sh; c=alb*(df*1.25*vec3(1.,.95,.86)+ao*(.34+.12*n.y)*vec3(1.,.86,.82)); c=mix(c,base*1.1,smoothstep(14.,30.,t)); o=vec4(c,1.); }`,
      { tW: n.word.tex, uK: 0, uE: 0 },
    );
  o.push({
    color: "#f27a3a",
    update(u) {
      ((l.u.uK.value = u), (l.u.uE.value = bt.outBack(Ct(u / 0.55), 1.6)));
    },
    render(u) {
      (l.render(a), t.post(a, u, { tone: "none", contrast: 1.04 }));
    },
    rect: () => [200, 200, 1520, 680],
  });
  let c = t.pass(
    r +
      `
    float H(vec2 p){ vec2 q=p+.10*vec2(vnoise(p*1.3+uK*.9)-.5,vnoise(p*1.3+9.-uK*.8)-.5)*2.*(1.4-uE); float d=-w2(q); d+=.05*(fbm(p*1.1+uK*.25)-.5); float b=smoothstep(-.02,.34,d); return sqrt(max(b,0.))*.5; }
    vec3 env(vec3 d){ float y=d.y*.5+.5; vec3 c=mix(vec3(.93,.45,.33),vec3(.98,.86,.70),smoothstep(.2,.55,y)); c=mix(c,vec3(.33,.55,.83),smoothstep(.5,.75,y)); c=mix(c,vec3(.04,.07,.22),smoothstep(.74,1.,y)); c+=vec3(1.2,1.,.8)*smoothstep(.02,.0,abs(d.y-.12+.08*sin(d.x*5.+uK)))*.8; c*=.75+.5*vnoise(d*3.+uK*.4); return c; }
    void main(){ vec2 p=(vUv-.5)*vec2(uRes.x/uRes.y,1.)*5.2; p+=vec2(0.,.05*sin(uK*2.)); float e=.02; float h=H(p); vec2 g=vec2(H(p+vec2(e,0))-H(p-vec2(e,0)),H(p+vec2(0,e))-H(p-vec2(0,e)))/(2.*e); vec3 n=normalize(vec3(-g*1.5,1.)); vec3 rd=normalize(vec3(p*.22,-1.)); vec3 r=reflect(rd,n); float m=smoothstep(.02,.16,h); vec3 fl=mix(vec3(.62,.27,.20),vec3(.16,.30,.52),smoothstep(-2.6,2.4,p.y+1.6*(fbm(p*.45+uK*.25)-.5)+.5*sin(p.x*.4+uK)))*(.85+.3*fbm(p*.7-uK*.2)); float d=w2(p-vec2(.10,-.14)); fl*=mix(.45,1.,smoothstep(-.1,.5,d)); vec3 c=mix(fl,env(r)*1.25,m); c=mix(c,c*c*1.4,.35); o=vec4(c,1.); }`,
    { tW: n.word.tex, uK: 0, uE: 0 },
  );
  o.push({
    color: "#c9a58c",
    update(u) {
      ((c.u.uK.value = u), (c.u.uE.value = bt.out3(Ct(u / 0.9))));
    },
    render(u) {
      (c.render(a), t.post(a, u, { tone: "aces", exposure: 1.1, bloom: 0.25, threshold: 1 }));
    },
    rect: () => [220, 330, 1480, 420],
  });
  {
    let u = t.target({ samples: 4, depth: !0 }),
      f = new ge(),
      h = new Ye(32, 1, 0.05, 80),
      d = ze(11),
      p = [],
      { mask: x, W: v, H: m } = n.word;
    for (; p.length < 7e3;) {
      let L = Math.floor(d() * v),
        k = Math.floor(d() * m);
      x[k * v + L] && p.push([(L / v - 0.5) * 8, (0.5 - k / m) * 2]);
    }
    let g = p.length,
      b = new Oe(),
      y = new Ke(1.6, 0.9);
    ((b.index = y.index), b.setAttribute("position", y.getAttribute("position")));
    let S = new Float32Array(g * 4),
      M = new Float32Array(g * 4);
    (p.forEach((L, k) => {
      (S.set([L[0], L[1], (d() - 0.5) * 0.5, d()], k * 4), M.set([d(), d(), d(), d()], k * 4));
    }),
      b.setAttribute("iA", new Ue(S, 4)),
      b.setAttribute("iB", new Ue(M, 4)),
      (b.instanceCount = g));
    let w = new ce({
        glslVersion: re,
        side: oe,
        uniforms: { uT: { value: 0 }, uIn: { value: 0 }, uOut: { value: 0 } },
        vertexShader: `precision highp float; in vec3 position; in vec4 iA,iB; uniform mat4 projectionMatrix,viewMatrix; uniform float uT,uIn,uOut; out vec3 vN; out vec3 vP; out vec2 vU; mat3 rot(vec3 a){ vec3 s=sin(a),c=cos(a); return mat3(c.y*c.z,c.y*s.z,-s.y, s.x*s.y*c.z-c.x*s.z,s.x*s.y*s.z+c.x*c.z,s.x*c.y, c.x*s.y*c.z+s.x*s.z,c.x*s.y*s.z-s.x*c.z,c.x*c.y); }
      void main(){ float d=iA.w; float k=clamp(uIn*1.7-d*.7,0.,1.); k=1.-pow(1.-k,4.); vec3 st=vec3((iB.xy-.5)*vec2(26.,15.),iB.z*-18.-2.); float an=(1.-k)*(3.+4.*iB.w); vec3 p=mix(st,iA.xyz,k); p.xy=mat2(cos(an),sin(an),-sin(an),cos(an))*p.xy; float q=clamp(uOut*1.5-d*.5,0.,1.); q=q*q*q; p+=vec3((iB.xy-.5)*9.*q,q*(9.+14.*iB.z)); p.z+=.10*sin(uT*3.+iA.x*2.); vec3 e=vec3(iB.x-.5,iB.y-.5,iB.z-.5)*( .9+6.*(1.-k)+5.*q)+vec3(0.,sin(uT*2.+iA.x*3.+iB.x*3.)*.5,0.); float s=mix(.05,.085,iB.w)*(1.+q*2.2); mat3 m=rot(e); vec3 w=p+m*(position*s); vN=m*vec3(0,0,1); vP=w; vU=position.xy; gl_Position=projectionMatrix*viewMatrix*vec4(w,1.); }`,
        fragmentShader:
          "precision highp float; in vec3 vN,vP; out vec4 o; uniform vec3 cameraPosition; void main(){ vec3 n=normalize(vN); vec3 v=normalize(cameraPosition-vP); if(dot(n,v)<0.)n=-n; vec3 L=normalize(vec3(-.4,.7,.6)); float d=max(dot(n,L),0.)+.35*max(dot(-n,L),0.); vec3 c=vec3(.96)*(pow(d,1.4)*1.25*vec3(1.,.93,.82)+vec3(.20,.29,.46)*(.55+.45*n.y)+.05); o=vec4(c,1.); }",
      }),
      E = new Zt(b, w);
    ((E.frustumCulled = !1), f.add(E));
    let T = new ce({
        glslVersion: re,
        side: oe,
        uniforms: { tA: { value: null } },
        vertexShader:
          "precision highp float; in vec3 position; in vec2 uv; uniform mat4 projectionMatrix,modelViewMatrix; out vec2 vU; void main(){ vU=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }",
        fragmentShader:
          "precision highp float; in vec2 vU; out vec4 o; uniform sampler2D tA; void main(){ vec3 c=gl_FrontFacing?texture(tA,vec2(vU.x,1.-vU.y)).rgb:vec3(.93); o=vec4(mix(c/12.92,pow((c+.055)/1.055,vec3(2.4)),step(.04045,c)),1.); }",
      }),
      _ = new Zt(new Ke(16, 9), T);
    ((_.frustumCulled = !1),
      (_.visible = !1),
      f.add(_),
      (o.face = {
        set(L) {
          T.uniforms.tA.value = L;
        },
        k: 0,
      }));
    let R = t.pass(
      "uniform float k; void main(){ vec2 d=vUv-.5; o=vec4(mix(vec3(.17,.30,.55),vec3(.52,.68,.88),vUv.y)*(1.-.5*dot(d,d)),1.); }",
      { k: 0 },
    );
    o.push({
      color: "#b8c9e0",
      update(L, k) {
        ((w.uniforms.uT.value = L),
          (w.uniforms.uIn.value = Ct(L / 1.1)),
          (w.uniforms.uOut.value = Ct((L - k * 0.58) / (k * 0.42))));
        let P = 9.6 * Math.max(1, 1.78 / t.aspect);
        ((h.aspect = t.aspect),
          h.position.set(Math.sin(L * 0.6 - 0.5) * 2.2, 0.5, P - L * 0.5),
          h.lookAt(0, 0, 0),
          h.updateProjectionMatrix(),
          h.updateMatrixWorld());
        let C = o.face.k;
        if (((_.visible = C > 0 && !!T.uniforms.tA.value), _.visible)) {
          let A = bt.io3(C),
            N = (9 / 2 / Math.tan((16 * Math.PI) / 180)) * Math.min(1, 16 / 9 / t.aspect),
            G = K(150, N, 1 - Math.pow(1 - A, 2.2));
          (_.position.set(K(34, 0, A) * (1 - A) * 1.3, Math.sin(A * Math.PI) * 7, -G),
            _.rotation.set((1 - A) * 2.2, (1 - A) * -5.2, (1 - A) * 2.4),
            _.position.applyMatrix4(h.matrixWorld),
            _.quaternion.setFromEuler(_.rotation).premultiply(h.quaternion));
        }
      },
      render(L) {
        (R.render(u, !0),
          t.draw(f, h, u, { clear: !1 }),
          t.post(u, L, { tone: "none", bloom: 0.12, threshold: 0.95 }));
      },
      rect: () => [260, 340, 1400, 400],
    });
  }
  return o;
}

var a0 = {};

b2(a0, { drawFace: () => $f });

var Kf = 4.27578834847675,
  vA = 110 / 1920,
  xA = 1760 / 1920,
  K3 = 2019,
  gA = 2027.6,
  Er = (i) => vA + ((i - K3) / (gA - K3)) * xA,
  ns = (i) => 0.0645 + i / Kf,
  Wi = (i, t) => i + (t - 0.5) / 12,
  Uo = [
    { n: "GPT-2", t: Wi(2019, 2), h: 9e-4 },
    { n: "GPT-3", t: Wi(2020, 5), h: 0.0024 },
    { n: "GPT-3.5", t: Wi(2022, 3), h: 0.01 },
    { n: "GPT-4", t: Wi(2023, 3), h: 0.0665, label: "GPT-4，4 分钟" },
    { n: "GPT-4o", t: Wi(2024, 5), h: 0.1165 },
    { n: "Claude 3.5 Sonnet", t: Wi(2024, 10), h: 0.342 },
    { n: "o1", t: Wi(2024, 12), h: 0.647 },
    { n: "Claude 3.7 Sonnet", t: Wi(2025, 2), h: 1 },
    { n: "o3", t: Wi(2025, 4), h: 2, label: "o3，2 小时" },
    { n: "GPT-5", t: Wi(2025, 8), h: 3.38 },
    { n: "Opus 4.5", t: Wi(2025, 11), h: 4.88, label: "Opus 4.5，4.9 小时" },
    { n: "GPT-5.2", t: Wi(2025, 12), h: 5.87 },
    { n: "Opus 4.6", t: Wi(2026, 2), h: 11.98, label: "Opus 4.6，12 小时" },
    { n: "Mythos Preview", t: Wi(2026, 4), h: 17.4, label: "Mythos Preview，17 小时" },
    { n: "GPT-6 Astra", t: Wi(2026, 9), h: 40, label: "GPT-6 Astra，40 小时" },
  ],
  Yf = { t: Wi(2027, 7), h: 200 },
  ws = Object.fromEntries(Uo.map((i) => [i.n, i])),
  ui = [...Uo.map((i) => [i.t, Math.log(i.h)])],
  Ks = ui.length,
  Xf = [];

{
  let i = [];
  for (let t = 0; t < Ks - 1; t++) i.push((ui[t + 1][1] - ui[t][1]) / (ui[t + 1][0] - ui[t][0]));
  ((Xf[0] = i[0]), (Xf[Ks - 1] = i[Ks - 2] * 0.6));
  for (let t = 1; t < Ks - 1; t++) {
    let e = ui[t][0] - ui[t - 1][0],
      n = ui[t + 1][0] - ui[t][0];
    Xf[t] = (3 * (e + n)) / ((2 * n + e) / i[t - 1] + (n + 2 * e) / i[t]);
  }
}

var yA = Math.log(Yf.h / Uo[Ks - 1].h) / (Yf.t - Uo[Ks - 1].t);

function jf(i) {
  if (i <= ui[0][0]) return Math.exp(ui[0][1]);
  if (i >= ui[Ks - 1][0]) return Uo[Ks - 1].h * Math.exp(yA * (i - ui[Ks - 1][0]));
  let t = 0;
  for (; i > ui[t + 1][0];) t++;
  let e = ui[t + 1][0] - ui[t][0],
    n = (i - ui[t][0]) / e,
    o = n * n,
    s = o * n;
  return Math.exp(
    (2 * s - 3 * o + 1) * ui[t][1] +
      (s - 2 * o + n) * e * Xf[t] +
      (-2 * s + 3 * o) * ui[t + 1][1] +
      (s - o) * e * Xf[t + 1],
  );
}

function j3(i) {
  let t = ui[0][0],
    e = Yf.t;
  for (let n = 0; n < 50; n++) {
    let o = (t + e) / 2;
    jf(o) < i ? (t = o) : (e = o);
  }
  return (t + e) / 2;
}

var s0 = "#15181d",
  uc = "#d4331a";

function $f(i, t, e, n = {}) {
  let { curve: o = !0, labels: s = !0, upTo: a = ws["GPT-4"].t, bg: r = !0 } = n,
    l = Math.max(t / 1920, e / 1080);
  (i.save(),
    r && ((i.fillStyle = "#ffffff"), i.fillRect(0, 0, t, e)),
    i.translate((t - 1920 * l) / 2, (e - 1080 * l) / 2),
    i.scale(l, l));
  let c = (f) => Er(f) * 1920,
    u = (f) => (1 - ns(f)) * 1080;
  ((i.textBaseline = "alphabetic"), (i.lineCap = "round"), (i.lineJoin = "round"));
  for (let f = 1; f <= 3; f++) {
    let h = u(f);
    ((i.fillStyle = "#dfe2e6"), i.fillRect(110, h - 0.75, 1760, 1.5));
  }
  ((i.fillStyle = "#b4bac2"),
    i.fillRect(110, u(0) - 1, 1760, 2),
    (i.font = Ln("text", 31)),
    (i.fillStyle = "#7d848e"),
    (i.textAlign = "left"));
  for (let f = 1; f <= 3; f++) i.fillText(f === 1 ? "1 小时" : f + " 小时", 110, u(f) - 13);
  for (let f = 2019; f <= 2027; f++) {
    let h = c(f);
    ((i.fillStyle = "#b4bac2"),
      i.fillRect(h - 0.75, u(0), 1.5, 9),
      (i.fillStyle = "#7d848e"),
      (i.font = Ln("text", 28)),
      i.fillText(String(f), h, u(0) + 44));
  }
  if (
    ((i.fillStyle = s0),
    (i.font = Ln("display", 54)),
    "letterSpacing" in i && (i.letterSpacing = "-0.6px"),
    i.fillText("AI 能独立完成多长的任务", 107, 116),
    "letterSpacing" in i && (i.letterSpacing = "0px"),
    (i.fillStyle = "#7d848e"),
    (i.font = Ln("text", 33)),
    i.fillText("METR，50% 成功率，线性刻度", 110, 178),
    o)
  ) {
    i.beginPath();
    let f = Uo[0].t,
      h = Math.min(a, j3(4.2)),
      d = 700;
    for (let p = 0; p <= d; p++) {
      let x = f + ((h - f) * p) / d,
        v = c(x),
        m = u(jf(x));
      p ? i.lineTo(v, m) : i.moveTo(v, m);
    }
    ((i.strokeStyle = uc), (i.lineWidth = 9), i.stroke());
    for (let p of Uo)
      p.t <= a + 1e-4 &&
        p.h < 4.2 &&
        (i.beginPath(), i.arc(c(p.t), u(p.h), 9.5, 0, 7), (i.fillStyle = s0), i.fill());
  }
  if (s)
    for (let f of ["GPT-4", "o3"]) {
      let h = ws[f];
      h.t > a + 1e-4 ||
        ((i.font = Ln("textMed", 48)),
        (i.fillStyle = s0),
        (i.textAlign = "right"),
        i.fillText(h.label, c(h.t) + (f === "GPT-4" ? 14 : -34), u(h.h) + (f === "GPT-4" ? -36 : 16)),
        (i.textAlign = "left"));
    }
  i.restore();
}

var To = [1.9, 1.35, 1.25, 1.1, 1.05, 1.05, 1.05, 1.25, 1.5, 2.6],
  js = 9.1,
  co = [js];

To.forEach((i) => co.push(co[co.length - 1] + i));
