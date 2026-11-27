// deck/framework.js
// Math/easing/noise, GLSL preludes, WebGL gfx layer, text renderer, deck engine (createDeck), HUD, boot helper, fade transition.
// Part 358-377 of the original 613 top-level statements; all modules are
// concatenated back into one IIFE by build.mjs, so they share a single scope.

var Ve = Math.PI * 2,
  Ct = (i, t = 0, e = 1) => (i < t ? t : i > e ? e : i),
  K = (i, t, e) => i + (t - i) * e,
  Te = (i, t, e) => Ct((e - i) / (t - i));

var kt = (i) => ((i = Ct(i)), i * i * (3 - 2 * i)),
  Fn = (i) => ((i = Ct(i)), i * i * i * (i * (i * 6 - 15) + 10)),
  bt = {
    lin: (i) => Ct(i),
    in2: (i) => ((i = Ct(i)), i * i),
    out2: (i) => ((i = Ct(i)), 1 - (1 - i) * (1 - i)),
    in3: (i) => ((i = Ct(i)), i * i * i),
    out3: (i) => 1 - Math.pow(1 - Ct(i), 3),
    io3: (i) => ((i = Ct(i)), i < 0.5 ? 4 * i * i * i : 1 - Math.pow(-2 * i + 2, 3) / 2),
    in4: (i) => Math.pow(Ct(i), 4),
    out4: (i) => 1 - Math.pow(1 - Ct(i), 4),
    io4: (i) => ((i = Ct(i)), i < 0.5 ? 8 * i ** 4 : 1 - Math.pow(-2 * i + 2, 4) / 2),
    in5: (i) => Math.pow(Ct(i), 5),
    out5: (i) => 1 - Math.pow(1 - Ct(i), 5),
    inExpo: (i) => ((i = Ct(i)), i === 0 ? 0 : Math.pow(2, 10 * i - 10)),
    outExpo: (i) => ((i = Ct(i)), i === 1 ? 1 : 1 - Math.pow(2, -10 * i)),
    ioExpo: (i) => (
      (i = Ct(i)),
      i === 0 ? 0 : i === 1 ? 1 : i < 0.5 ? Math.pow(2, 20 * i - 10) / 2 : (2 - Math.pow(2, -20 * i + 10)) / 2
    ),
    outBack: (i, t = 1.4) => ((i = Ct(i) - 1), 1 + (t + 1) * i * i * i + t * i * i),
    inBack: (i, t = 1.4) => ((i = Ct(i)), (t + 1) * i * i * i - t * i * i),
    spring: (i, t = 1.6, e = 5) => ((i = Ct(i, 0, 10)), 1 - Math.exp(-e * i) * Math.cos(Ve * t * i)),
  };

function ze(i = 1) {
  let t = i >>> 0;
  return () => {
    ((t |= 0), (t = (t + 1831565813) | 0));
    let e = Math.imul(t ^ (t >>> 15), 1 | t);
    return ((e = (e + Math.imul(e ^ (e >>> 7), 61 | e)) ^ e), ((e ^ (e >>> 14)) >>> 0) / 4294967296);
  };
}

var Ys = (i) => {
    let t = Math.sin(i * 127.1 + 311.7) * 43758.5453;
    return t - Math.floor(t);
  },
  Si = (i) => {
    let t = Math.floor(i),
      e = i - t,
      n = e * e * (3 - 2 * e);
    return K(Ys(t), Ys(t + 1), n) * 2 - 1;
  },
  Mr = (i, t) => 1 - Math.exp(-i * t),
  Do = (i) => {
    let t = parseInt(i.replace("#", ""), 16);
    return [((t >> 16) & 255) / 255, ((t >> 8) & 255) / 255, (t & 255) / 255];
  };

var Bn = `
float hash11(float p){p=fract(p*.1031);p*=p+33.33;p*=p+p;return fract(p);}
float hash12(vec2 p){vec3 p3=fract(vec3(p.xyx)*.1031);p3+=dot(p3,p3.yzx+33.33);return fract((p3.x+p3.y)*p3.z);}
float hash13(vec3 p3){p3=fract(p3*.1031);p3+=dot(p3,p3.zyx+31.32);return fract((p3.x+p3.y)*p3.z);}
vec2 hash21(float p){vec3 p3=fract(vec3(p)*vec3(.1031,.1030,.0973));p3+=dot(p3,p3.yzx+33.33);return fract((p3.xx+p3.yz)*p3.zy);}
vec2 hash22(vec2 p){vec3 p3=fract(vec3(p.xyx)*vec3(.1031,.1030,.0973));p3+=dot(p3,p3.yzx+33.33);return fract((p3.xx+p3.yz)*p3.zy);}
vec3 hash33(vec3 p3){p3=fract(p3*vec3(.1031,.1030,.0973));p3+=dot(p3,p3.yxz+33.33);return fract((p3.xxy+p3.yxx)*p3.zyx);}
`,
  Fe =
    Bn +
    `
float vnoise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*f*(f*(f*6.-15.)+10.);return mix(mix(hash12(i),hash12(i+vec2(1,0)),f.x),mix(hash12(i+vec2(0,1)),hash12(i+vec2(1,1)),f.x),f.y);}
float vnoise(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*f*(f*(f*6.-15.)+10.);
 return mix(mix(mix(hash13(i),hash13(i+vec3(1,0,0)),f.x),mix(hash13(i+vec3(0,1,0)),hash13(i+vec3(1,1,0)),f.x),f.y),mix(mix(hash13(i+vec3(0,0,1)),hash13(i+vec3(1,0,1)),f.x),mix(hash13(i+vec3(0,1,1)),hash13(i+vec3(1,1,1)),f.x),f.y),f.z);}
float fbm(vec2 p){float a=.5,s=0.;mat2 m=mat2(.8,.6,-.6,.8);for(int i=0;i<5;i++){s+=a*vnoise(p);p=m*p*2.03;a*=.5;}return s;}
float fbm(vec3 p){float a=.5,s=0.;for(int i=0;i<5;i++){s+=a*vnoise(p);p=p*2.03+vec3(1.7,9.2,3.1);a*=.5;}return s;}
`,
  y3 = `
float sdBox(vec3 p,vec3 b){vec3 q=abs(p)-b;return length(max(q,0.))+min(max(q.x,max(q.y,q.z)),0.);}
float sdBox2(vec2 p,vec2 b){vec2 q=abs(p)-b;return length(max(q,0.))+min(max(q.x,q.y),0.);}
float sdRound2(vec2 p,vec2 b,float r){vec2 q=abs(p)-b+r;return length(max(q,0.))+min(max(q.x,q.y),0.)-r;}
float sdCapsule(vec3 p,vec3 a,vec3 b,float r){vec3 pa=p-a,ba=b-a;float h=clamp(dot(pa,ba)/dot(ba,ba),0.,1.);return length(pa-ba*h)-r;}
float sdSeg2(vec2 p,vec2 a,vec2 b){vec2 pa=p-a,ba=b-a;float h=clamp(dot(pa,ba)/dot(ba,ba),0.,1.);return length(pa-ba*h);}
float sdTorus(vec3 p,vec2 t){vec2 q=vec2(length(p.xz)-t.x,p.y);return length(q)-t.y;}
float smin(float a,float b,float k){float h=max(k-abs(a-b),0.)/k;return min(a,b)-h*h*k*.25;}
mat2 rot2(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}
`,
  Sn = `
vec3 toLin(vec3 c){return mix(c/12.92,pow((c+.055)/1.055,vec3(2.4)),step(.04045,c));}
vec3 toSrgb(vec3 c){c=max(c,0.);return mix(c*12.92,1.055*pow(c,vec3(1./2.4))-.055,step(.0031308,c));}
float luma(vec3 c){return dot(c,vec3(.2126,.7152,.0722));}
vec3 blackbody(float t){t/=100.;vec3 c;c.r=t<66.?1.:clamp(1.292936*pow(t-60.,-.1332047),0.,1.);c.g=t<66.?clamp(.3900816*log(t)-.6318414,0.,1.):clamp(1.129891*pow(t-60.,-.0755148),0.,1.);c.b=t>=66.?1.:t<=19.?0.:clamp(.5432068*log(t-10.)-1.196254,0.,1.);return c;}
`;

var GT = `#version 300 es
precision highp float; in vec3 position; out vec2 vUv; void main(){ vUv=position.xy*.5+.5; gl_Position=vec4(position.xy,0.,1.); }`,
  qT = `#version 300 es
precision highp float; precision highp int; precision highp sampler2D; precision highp sampler3D; in vec2 vUv; out vec4 o; uniform vec2 uRes; uniform float uTime;
`;

function b3(i, { headless: t = !1 } = {}) {
  let e = new Of({
    canvas: i,
    antialias: !1,
    alpha: !1,
    stencil: !1,
    powerPreference: "high-performance",
    preserveDrawingBuffer: t,
  });
  ((e.autoClear = !1), (e.toneMapping = Mo), (e.debug.checkShaderErrors = !0));
  let n = e.getContext();
  (n.getExtension("EXT_color_buffer_float"),
    n.getExtension("EXT_color_buffer_half_float"),
    n.getExtension("OES_texture_float_linear"));
  let o = new Qt();
  o.setAttribute("position", new $t(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3));
  let s = new In(),
    a = new Set(),
    r = {
      THREE: Le,
      r: e,
      gl: n,
      W: 2,
      H: 2,
      aspect: 1,
      q: 1,
      target({
        scale: v = 1,
        w: m = 0,
        h: g = 0,
        samples: b = 0,
        depth: y = !1,
        depthTexture: S = !1,
        type: M = Nn,
        filter: w = He,
        wrap: E = ei,
        mips: T = !1,
        count: _ = 1,
      } = {}) {
        let R = new Jn(m || Math.max(1, Math.round(r.W * v)), g || Math.max(1, Math.round(r.H * v)), {
          samples: b,
          depthBuffer: y || S,
          type: M,
          minFilter: T ? Pn : w,
          magFilter: w,
          wrapS: E,
          wrapT: E,
          generateMipmaps: T,
          count: _,
        });
        return (
          S && (R.depthTexture = new Bi(R.width, R.height, hi)),
          (R._scale = v),
          (R._fixed = !!m),
          (R._owner = r.owner),
          (R._parked = !1),
          a.add(R),
          R
        );
      },
      free(v) {
        (a.delete(v), v.dispose());
      },
      owner: null,
      park(v, m) {
        for (let g of a)
          g._owner === v &&
            !g._fixed &&
            g._parked !== m &&
            ((g._parked = m),
            m
              ? g.setSize(2, 2)
              : g.setSize(Math.max(1, Math.round(r.W * g._scale)), Math.max(1, Math.round(r.H * g._scale))));
      },
      resize(v, m, g = v, b = m) {
        ((r.W = v), (r.H = m), (r.aspect = v / m), e.setSize(g, b, !1));
        for (let y of a)
          !y._fixed &&
            !y._parked &&
            y.setSize(Math.max(1, Math.round(v * y._scale)), Math.max(1, Math.round(m * y._scale)));
      },
      pass(v, m = {}, { blending: g = ms, defines: b = {}, transparent: y = !1 } = {}) {
        let S = { uRes: { value: new Nt() }, uTime: { value: 0 } };
        for (let _ in m) S[_] = m[_] && typeof m[_] == "object" && "value" in m[_] ? m[_] : { value: m[_] };
        let M = Object.entries(b)
            .map(
              ([_, R]) => `#define ${_} ${R}
`,
            )
            .join(""),
          w = new ce({
            vertexShader: GT.replace(
              `#version 300 es
`,
              "",
            ),
            fragmentShader:
              qT.replace(
                `#version 300 es
`,
                "",
              ) +
              M +
              v,
            uniforms: S,
            glslVersion: re,
            depthTest: !1,
            depthWrite: !1,
            blending: g,
            transparent: y,
          }),
          E = new Zt(o, w);
        E.frustumCulled = !1;
        let T = new ge();
        return (
          T.add(E),
          (T.matrixWorldAutoUpdate = !1),
          {
            u: S,
            material: w,
            render(_, R = !1) {
              (S.uRes.value.set(_ ? _.width : r.W, _ ? _.height : r.H),
                e.setRenderTarget(_),
                R && e.clear(),
                e.render(T, s));
            },
            dispose() {
              w.dispose();
            },
          }
        );
      },
      draw(v, m, g, { clear: b = !0, color: y = null, alpha: S = 1 } = {}) {
        (e.setRenderTarget(g),
          b && (y !== null ? e.setClearColor(y, S) : e.setClearColor(0, 1), e.clear(!0, !0, !1)),
          e.render(v, m));
      },
      copy(v, m) {
        ((l.u.tA.value = v.texture || v), l.render(m));
      },
      time(v, m = 12) {
        let g = new Uint8Array(4),
          b = () => {
            (e.setRenderTarget(null), n.readPixels(0, 0, 1, 1, n.RGBA, n.UNSIGNED_BYTE, g));
          };
        (v(), b());
        let y = performance.now();
        for (let S = 0; S < m; S++) v();
        return (b(), (performance.now() - y) / m);
      },
    },
    l = r.pass("uniform sampler2D tA; void main(){ o=texture(tA,vUv); }", { tA: null }),
    c = 6,
    u = [],
    f = [];
  for (let v = 0; v < c; v++) {
    let m = 1 / (2 << v);
    (u.push(r.target({ scale: m })), f.push(r.target({ scale: m })));
  }
  let h = r.pass(
      `uniform sampler2D tA; uniform vec2 uPx; uniform float uThr,uFirst;
    vec3 s(vec2 d){ vec3 c=texture(tA,vUv+d*uPx).rgb; c=min(max(c,0.),vec3(400.)); if(uFirst>.5){ float l=max(c.r,max(c.g,c.b)); float k=max(0.,l-uThr)/max(l,1e-4); c*=k; c/=1.+dot(c,vec3(.2126,.7152,.0722))*.12; } return c; }
    void main(){ vec3 c=s(vec2(0))*.125; c+=(s(vec2(-1,-1))+s(vec2(1,-1))+s(vec2(-1,1))+s(vec2(1,1)))*.125; c+=(s(vec2(-2,0))+s(vec2(2,0))+s(vec2(0,-2))+s(vec2(0,2)))*.0625; c+=(s(vec2(-2,-2))+s(vec2(2,-2))+s(vec2(-2,2))+s(vec2(2,2)))*.03125; o=vec4(c,1.); }`,
      { tA: null, uPx: new Nt(), uThr: 1, uFirst: 0 },
    ),
    d = r.pass(
      `uniform sampler2D tA,tB; uniform vec2 uPx; uniform float uR;
    void main(){ vec3 c=vec3(0); for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){ float w=(x==0?2.:1.)*(y==0?2.:1.); c+=w*texture(tA,vUv+vec2(x,y)*uPx).rgb; } o=vec4(texture(tB,vUv).rgb+c/16.*uR,1.); }`,
      { tA: null, tB: null, uPx: new Nt(), uR: 1 },
    ),
    p = r.pass(
      Sn +
        Bn +
        `
    uniform sampler2D tA,tB; uniform float uExp,uBloom,uTone,uCon,uSat,uVig,uGrain,uCA,uHal,uFade; uniform vec3 uLift,uGain,uFadeC;
    vec3 agx(vec3 v){ const mat3 M=mat3(.842479062253094,.0423282422610123,.0423756549057051,.0784335999999992,.878468636469772,.0784336,.0792237451477643,.0791661274605434,.879142973793104);
      v=M*v; v=clamp(log2(max(v,1e-10)),-12.47393,4.026069); v=(v+12.47393)/(4.026069+12.47393);
      vec3 x2=v*v,x4=x2*x2; v=15.5*x4*x2-40.14*x4*v+31.96*x4-6.868*x2*v+.4298*x2+.1191*v-.00232;
      const mat3 I=mat3(1.19687900512017,-.0528968517574562,-.0529716355144438,-.0980208811401368,1.15190312990417,-.0980434501171241,-.0990297440797205,-.0989611768448433,1.15107367264116);
      return pow(max(I*v,0.),vec3(2.2)); }
    vec3 aces(vec3 x){ return clamp((x*(2.51*x+.03))/(x*(2.43*x+.59)+.14),0.,1.); }
    void main(){ vec2 d=vUv-.5; vec3 c;
      if(uCA>0.){ vec2 k=d*dot(d,d)*uCA; c=vec3(texture(tA,vUv-k).r,texture(tA,vUv).g,texture(tA,vUv+k).b); } else c=texture(tA,vUv).rgb;
      c=max(c,0.); vec3 b=texture(tB,vUv).rgb; c+=b*uBloom*vec3(1.+uHal*.35,1.,1.-uHal*.35); c*=uExp;
      if(uTone>1.5) c=aces(c); else if(uTone>.5) c=agx(c);
      c=toSrgb(c); c=(c-.5)*uCon+.5; c=mix(vec3(luma(c)),c,uSat); c=c*uGain+uLift*(1.-c);
      c*=1.-uVig*smoothstep(.25,1.05,length(d*vec2(uRes.x/uRes.y,1.)*1.1)); c=mix(c,uFadeC,uFade);
      if(uGrain>0.){ float n=hash13(vec3(gl_FragCoord.xy,fract(uTime*7.3)*97.)); c+=(n-.5)*uGrain*(1.-abs(luma(c)-.5)); }
      o=vec4(clamp(c,0.,1.),1.); }`,
      {
        tA: null,
        tB: null,
        uExp: 1,
        uBloom: 0,
        uTone: 1,
        uCon: 1,
        uSat: 1,
        uVig: 0,
        uGrain: 0,
        uCA: 0,
        uHal: 0,
        uFade: 0,
        uLift: new F(),
        uGain: new F(1, 1, 1),
        uFadeC: new F(),
      },
    );
  r.post = (v, m, g = {}) => {
    let {
      exposure: b = 1,
      bloom: y = 0,
      threshold: S = 1,
      radius: M = 0.85,
      tone: w = "agx",
      contrast: E = 1,
      saturation: T = 1,
      vignette: _ = 0,
      grain: R = 0,
      ca: L = 0,
      halation: k = 0,
      lift: P = [0, 0, 0],
      gain: C = [1, 1, 1],
      fade: A = 0,
      fadeColor: N = [0, 0, 0],
      time: G = 0,
    } = g;
    if (y > 0) {
      let ot = v;
      for (let lt = 0; lt < c; lt++)
        ((h.u.tA.value = ot.texture),
          h.u.uPx.value.set(1 / ot.width, 1 / ot.height),
          (h.u.uFirst.value = lt ? 0 : 1),
          (h.u.uThr.value = S),
          h.render(u[lt]),
          (ot = u[lt]));
      let ut = u[c - 1];
      for (let lt = c - 2; lt >= 0; lt--)
        ((d.u.tA.value = ut.texture),
          (d.u.tB.value = u[lt].texture),
          d.u.uPx.value.set(1 / ut.width, 1 / ut.height),
          (d.u.uR.value = M),
          d.render(f[lt]),
          (ut = f[lt]));
    }
    let B = p.u;
    ((B.tA.value = v.texture),
      (B.tB.value = f[0].texture),
      (B.uExp.value = b),
      (B.uBloom.value = (y / c) * 1.6),
      (B.uTone.value = w === "aces" ? 2 : w === "agx" ? 1 : 0),
      (B.uCon.value = E),
      (B.uSat.value = T),
      (B.uVig.value = _),
      (B.uGrain.value = R),
      (B.uCA.value = L),
      (B.uHal.value = k),
      B.uLift.value.set(...P),
      B.uGain.value.set(...C),
      (B.uFade.value = A),
      B.uFadeC.value.set(...N),
      (B.uTime.value = G),
      p.render(m));
  };
  let x = r.pass(
    Bn +
      "uniform sampler2D tA; uniform float uBlack; void main(){ vec3 c=texture(tA,vUv).rgb*(1.-uBlack); float n=hash13(vec3(gl_FragCoord.xy,fract(uTime)*61.))+hash13(vec3(gl_FragCoord.xy,fract(uTime)*61.+7.))-1.; vec3 d=c+n/255.; o=vec4(all(greaterThan(c,vec3(.9985)))?vec3(1.):d,1.); }",
    { tA: null, uBlack: 0 },
  );
  return (
    (r.present = (v, m = 0, g = 0) => {
      ((x.u.tA.value = v.texture), (x.u.uTime.value = m), (x.u.uBlack.value = g), x.render(null));
    }),
    r
  );
}

var WT = {
    display: { family: "Unb", weight: 300 },
    displayBold: { family: "Unb", weight: 800 },
    text: { family: "Geist", weight: 400 },
    textMed: { family: "Geist", weight: 500 },
    textBold: { family: "Geist", weight: 650 },
    mono: { family: "GeistMono", weight: 400 },
    monoMed: { family: "GeistMono", weight: 500 },
    arial: { family: 'Arial, Arimo, "Liberation Sans", Helvetica', weight: 400, raw: !0 },
    arialBold: { family: 'Arial, Arimo, "Liberation Sans", Helvetica', weight: 700, raw: !0 },
    anton: { family: "Anton", weight: 400 },
    serif: { family: "Newsreader", weight: 400 },
    serifIt: { family: "Newsreader", weight: 400, style: "italic" },
    jb: { family: "JBMono", weight: 700 },
    pixel: { family: "Pixel", weight: 400 },
  },
  Ln = (i, t) => {
    let e = typeof i == "string" ? WT[i] : i;
    return `${e.style || "normal"} ${e.weight} ${t}px ${e.raw ? e.family : `"${e.family}", Arial, sans-serif`}`;
  };

async function M3(i = "fonts/") {
  let t = window.__FONTS || {},
    e = (o) => t[o] || i + o,
    n = [
      ["Unb", "unb300.woff", { weight: "300" }],
      ["Unb", "unb800.woff", { weight: "800" }],
      ["Anton", "anton.woff", {}],
      ["JBMono", "jbmono700.woff", { weight: "700" }],
      ["Pixel", "pixel.woff", {}],
      ["Newsreader", "Newsreader-roman.woff2", { weight: "200 800" }],
      ["Newsreader", "Newsreader-italic.woff2", { weight: "200 800", style: "italic" }],
      ["Geist", "geist-latin.woff2", { weight: "100 900" }],
      ["GeistMono", "GeistMono-latin.woff2", { weight: "100 900" }],
    ];
  await Promise.all(
    n.map(async ([o, s, a]) => {
      try {
        let r = new FontFace(o, `url(${e(s)})`, a);
        (await r.load(), document.fonts.add(r));
      } catch (r) {
        console.warn("font", s, r.message);
      }
    }),
  );
}

var XT = `precision highp float; in vec2 position; in vec4 iRect,iUv,iT,iF,iC; in vec4 iX; uniform mat4 projectionMatrix,modelViewMatrix; uniform float uFlip; out vec2 vUv; out vec4 vC; out vec4 vF; out vec2 vP; out vec4 vClip; flat out vec4 vCell;
void main(){ vec2 c=iRect.xy+iRect.zw*.5; vec2 q=position*iRect.zw*iX.xy*iT.z; q.x+=-q.y*iF.w; float s=sin(iT.w),k=cos(iT.w); q=vec2(q.x*k-q.y*s,q.x*s+q.y*k); vec2 p=c+q+iT.xy; vP=p; vUv=iUv.xy+(position+.5)*iUv.zw; vCell=vec4(iUv.xy,iUv.xy+iUv.zw); vC=iC; vF=iF; vClip=vec4(iX.zw,0.,0.); gl_Position=projectionMatrix*modelViewMatrix*vec4(p.x,uFlip>.5?-p.y:p.y,0.,1.); }`,
  YT = `precision highp float; in vec2 vUv; in vec4 vC,vF; in vec2 vP; in vec4 vClip; flat in vec4 vCell; out vec4 o; uniform sampler2D tA; uniform vec2 uPx; uniform float uAlpha,uLinear,uGain,uPpu;
float s(vec2 u){ return any(lessThan(u,vCell.xy))||any(greaterThan(u,vCell.zw))?0.:texture(tA,u).a; }
void main(){ if(vF.z>.5&&(vP.y<vClip.x||vP.y>vClip.y)) discard; float a; float b=vF.y*uPpu; if(b<.4) a=s(vUv); else { a=0.; float w=0.; for(int i=0;i<28;i++){ float f=(float(i)+.5)/28.; float r=sqrt(f)*b; float t=float(i)*2.399963; float g=exp(-2.2*f); a+=g*s(vUv+vec2(cos(t),sin(t))*r*uPx); w+=g; } a/=w; }
 a*=vF.x*uAlpha; vec3 c=vC.rgb; if(uLinear>.5) c=mix(c/12.92,pow((c+.055)/1.055,vec3(2.4)),step(.04045,c)); c*=uGain; o=vec4(c*a,a*vC.a); }`,
  w3 = (() => {
    let i = new Qt();
    return (
      i.setAttribute("position", new $t(new Float32Array([-0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5]), 2)),
      i.setIndex([0, 1, 2, 0, 2, 3]),
      i
    );
  })(),
  Qp = document.createElement("canvas").getContext("2d");

function S3(i, t) {
  let e = new Set();
  class n {
    constructor(s, a = {}) {
      ((this.o = {
        x: 0,
        y: 0,
        size: 48,
        font: "display",
        color: "#ffffff",
        align: "left",
        valign: "top",
        leading: 1.12,
        tracking: 0,
        maxWidth: 0,
        raster: 1,
        ...a,
      }),
        (this.alpha = 1),
        (this.x = this.o.x),
        (this.y = this.o.y),
        (this.scale = 1),
        (this.rotation = 0),
        (this.max = 0),
        (this._ppu = 0),
        (this.mat = new ce({
          vertexShader: XT,
          fragmentShader: YT,
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
            tA: { value: null },
            uPx: { value: new Nt() },
            uAlpha: { value: 1 },
            uLinear: { value: 0 },
            uGain: { value: 1 },
            uFlip: { value: 0 },
            uPpu: { value: 1 },
          },
        })),
        (this.canvas = document.createElement("canvas")),
        (this.tex = new Hn(this.canvas)),
        (this.tex.colorSpace = Mn),
        (this.tex.generateMipmaps = !1),
        (this.tex.minFilter = this.tex.magFilter = He),
        (this.tex.premultiplyAlpha = !1),
        (this.tex.flipY = !1),
        (this.mat.uniforms.tA.value = this.tex),
        (this.mesh = new Zt(Object.assign(new Oe(), { boundingSphere: new Be(new F(), 1e6) }), this.mat)),
        (this.mesh.frustumCulled = !1),
        (this.mesh.renderOrder = 10),
        (this.mesh.onBeforeRender = () => {
          this._sync();
        }),
        e.add(this),
        this.set(s));
    }
    set(s) {
      return s === this.text
        ? this
        : ((this.text = s),
          this._layout(),
          (this._ppu = 0),
          this._raster(),
          this._fn && this.animate(this._fn),
          this);
    }
    style(s) {
      if (
        (Object.assign(this.o, s),
        "x" in s && (this.x = s.x),
        "y" in s && (this.y = s.y),
        s.size || s.font || s.align || s.tracking || s.leading || s.maxWidth || s.color)
      ) {
        let a = this.text;
        ((this.text = null), this.set(a));
      }
      return this;
    }
    _layout() {
      let s = this.o,
        a = typeof this.text == "string" ? [{ t: this.text }] : this.text,
        r = [],
        l = 0;
      for (let v of a)
        for (let m of v.t)
          r.push({
            ch: m,
            size: v.size || s.size,
            font: v.font || s.font,
            color: v.color || s.color,
            i: l++,
          });
      let c = [[]];
      for (let v of r)
        v.ch ===
        `
`
          ? c.push([])
          : c[c.length - 1].push(v);
      let u = (v) => {
        let m = 0,
          g = 0;
        for (; g < v.length;) {
          let b = g;
          for (; b < v.length && v[b].font === v[g].font && v[b].size === v[g].size;) b++;
          Qp.font = Ln(v[g].font, v[g].size);
          let y = "";
          for (let S = g; S < b; S++) {
            y += v[S].ch;
            let M = Qp.measureText(y).width,
              w = Qp.measureText(v[S].ch).width;
            ((v[S].x = m + M - w + S * 0 + (S - g) * s.tracking * v[S].size), (v[S].w = w));
          }
          ((m += Qp.measureText(y).width + (b - g) * s.tracking * v[g].size), (g = b));
        }
        return m - (v.length ? s.tracking * v[v.length - 1].size : 0);
      };
      if (s.maxWidth) {
        let v = [];
        for (let m of c) {
          let g = [],
            b = [],
            y = () => {
              if (!b.length) return;
              let S = g.concat(b);
              if (g.length && u(S) > s.maxWidth) {
                for (; g.length && g[g.length - 1].ch === " ";) g.pop();
                for (v.push(g); b.length && b[0].ch === " ";) b.shift();
                g = b;
              } else g = S;
              b = [];
            };
          for (let S of m) S.ch === " " ? (y(), (b = [S]), y()) : b.push(S);
          (y(), v.push(g));
        }
        c = v;
      }
      let f = c.map((v) => Math.max(s.size * (v.length ? 0 : 1), ...v.map((m) => m.size), 0) * s.leading);
      ((this.height = f.reduce((v, m) => v + m, 0)), (this.width = 0), (this.glyphs = []), (this.lines = []));
      let h = 0,
        d = 0,
        p = 0;
      c.forEach((v, m) => {
        let g = u(v);
        ((this.width = Math.max(this.width, g)), (v._w = g));
      });
      let x =
        s.valign === "middle"
          ? -this.height / 2
          : s.valign === "bottom"
            ? -this.height
            : s.valign === "base"
              ? -f[0] * 0.5 - s.size * 0.35
              : 0;
      if (
        (c.forEach((v, m) => {
          let g = s.align === "center" ? -v._w / 2 : s.align === "right" ? -v._w : 0,
            b = f[m],
            y = x + h + b * 0.5 + Math.max(s.size * 0, ...v.map((M) => M.size), 0) * 0.35;
          this.lines.push({ x: g, y: x + h, w: v._w, h: b, base: y });
          let S = !1;
          (v.forEach((M, w) => {
            if (M.ch === " ") {
              S = !1;
              return;
            }
            (S || (d++, (S = !0)),
              this.glyphs.push({
                ch: M.ch,
                n: p++,
                ci: M.i,
                line: m,
                j: w,
                word: d - 1,
                x: g + M.x,
                y,
                w: M.w,
                size: M.size,
                font: M.font,
                color: Do(M.color),
                alphaC: 1,
                top: x + h,
                bot: x + h + b,
                cx: g + M.x + M.w / 2,
                cy: x + h + b / 2,
              }));
          }),
            (h += b));
        }),
        (this.n = p),
        (this.words = d),
        (this.box = { x: Math.min(0, ...this.lines.map((v) => v.x)), y: x, w: this.width, h: this.height }),
        s.align === "center"
          ? (this.box.x = -this.width / 2)
          : s.align === "right"
            ? (this.box.x = -this.width)
            : (this.box.x = 0),
        p > this.max || !this.buf)
      ) {
        this.max = Math.max(24, p);
        let v = new Oe();
        ((v.boundingSphere = new Be(new F(), 1e6)),
          v.setIndex(w3.index.clone()),
          v.setAttribute("position", w3.getAttribute("position").clone()),
          (this.buf = new Xl(new Float32Array(this.max * 24), 24, 1)),
          this.buf.setUsage(Vi),
          ["iRect", "iUv", "iT", "iF", "iC", "iX"].forEach((m, g) =>
            v.setAttribute(m, new Zo(this.buf, 4, g * 4)),
          ),
          this.mesh.geometry.dispose(),
          (this.mesh.geometry = v));
      }
      this.mesh.geometry.instanceCount = p;
    }
    _raster() {
      let s = Math.min(t() * this.o.raster, 6);
      if (Math.abs(s - this._ppu) < 0.001) return;
      this._ppu = s;
      let a = (x) => x.size * 0.3 + 3,
        r = 1,
        l = 1,
        c = 0,
        u = [],
        f = this.glyphs.reduce((x, v) => x + (v.w + 2 * a(v)) * (v.size * 1.5 + 2 * a(v)), 0) * s * s,
        h = Math.min(8192, Math.max(64, Math.ceil(Math.sqrt(f) * 1.15 + 64)));
      for (let x of this.glyphs) {
        let v = Math.ceil((x.w + 2 * a(x)) * s),
          m = Math.ceil((x.size * 1.25 + 2 * a(x)) * s);
        (r + v + 1 > h && ((r = 1), (l += c + 1), (c = 0)),
          u.push([r, l, v, m]),
          (r += v + 1),
          (c = Math.max(c, m)));
      }
      let d = Math.max(4, l + c + 1);
      (this.canvas.width !== h || this.canvas.height !== d) &&
        ((this.canvas.width = h), (this.canvas.height = d), this.tex.dispose());
      let p = this.canvas.getContext("2d");
      (p.clearRect(0, 0, h, d),
        (p.fillStyle = "#fff"),
        (p.textBaseline = "alphabetic"),
        this.glyphs.forEach((x, v) => {
          let [m, g, b, y] = u[v];
          p.font = Ln(x.font, x.size * s);
          let S = a(x);
          (p.fillText(x.ch, m + S * s, g + (S + x.size * 0.95) * s),
            (x.rect = [x.x - S, x.y - S - x.size * 0.95, b / s, y / s]),
            (x.uv = [m / h, g / d, b / h, y / d]));
        }),
        (this.tex.needsUpdate = !0),
        this.mat.uniforms.uPx.value.set(1 / h, 1 / d),
        (this.mat.uniforms.uPpu.value = s),
        (this._dirty = !0));
    }
    _sync() {
      this.mat.uniforms.uAlpha.value = this.alpha;
    }
    animate(s) {
      (this._raster(), (this._fn = s));
      let a = this.buf.array,
        r = {};
      return (
        this.glyphs.forEach((l, c) => {
          ((r.dx = r.dy = r.rot = r.blur = r.clip = r.skew = 0),
            (r.scale = r.sx = r.sy = r.alpha = 1),
            (r.r = l.color[0]),
            (r.g = l.color[1]),
            (r.b = l.color[2]),
            s && s(l, r, this));
          let u = c * 24;
          (a.set(l.rect, u),
            a.set(l.uv, u + 4),
            (a[u + 8] = r.dx),
            (a[u + 9] = r.dy),
            (a[u + 10] = r.scale),
            (a[u + 11] = r.rot),
            (a[u + 12] = r.alpha),
            (a[u + 13] = r.blur),
            (a[u + 14] = r.clip),
            (a[u + 15] = r.skew),
            (a[u + 16] = r.r),
            (a[u + 17] = r.g),
            (a[u + 18] = r.b),
            (a[u + 19] = 1),
            (a[u + 20] = r.sx),
            (a[u + 21] = r.sy),
            (a[u + 22] = l.top),
            (a[u + 23] = l.bot));
        }),
        (this.buf.needsUpdate = !0),
        this.mesh.position.set(this.x, this.y, 0),
        this.mesh.scale.setScalar(this.scale),
        (this.mesh.rotation.z = this.rotation),
        (this.mesh.visible = this.alpha > 0.001),
        this
      );
    }
    show(s, { style: a = "rise", q: r = 0, stagger: l = 0.5, by: c = "glyph", seed: u = 1 } = {}) {
      let f = c === "word" ? this.words : c === "line" ? this.lines.length : this.n;
      return s <= 0 || r >= 1
        ? ((this.mesh.visible = !1), this)
        : (this.animate((h, d) => {
            let p = c === "word" ? h.word : c === "line" ? h.line : h.n,
              x = f > 1 ? (p / (f - 1)) * l : 0,
              v = Ct((s - x) / (1 - l)),
              m = Ct((r - x) / (1 - l)),
              g = bt.out4(v),
              b = bt.in3(m);
            if (a === "rise")
              ((d.dy = (1 - g) * h.size * 1.15 - b * h.size * 1.15), (d.clip = 1), (d.alpha = v > 0 ? 1 : 0));
            else if (a === "blur")
              ((d.alpha = bt.out2(v) * (1 - b)),
                (d.blur = (1 - g + b) * h.size * 0.28),
                (d.dx = (1 - g) * h.size * 0.12),
                (d.scale = 1 + (1 - g) * 0.06));
            else if (a === "type") d.alpha = v > 0 && m < 1 ? 1 : 0;
            else if (a === "fade") d.alpha = bt.out2(v) * (1 - b);
            else if (a === "scatter") {
              let y = Ys(h.n + u * 17) * 6.283,
                S = (1 - g) * (200 + 500 * Ys(h.n * 3 + u)) + b * 600;
              ((d.dx = Math.cos(y) * S),
                (d.dy = Math.sin(y) * S),
                (d.rot = (1 - g + b) * (Ys(h.n + 5) - 0.5) * 5),
                (d.alpha = bt.out2(v * 2) * (1 - b)));
            } else if (a === "track")
              ((d.dx = (h.cx - this.box.x - this.box.w / 2) * ((1 - g) * 0.35 + b * 0.5)),
                (d.alpha = bt.out2(v) * (1 - b)),
                (d.blur = (1 - g + b) * 6));
            else if (a === "drop") {
              let y = bt.outBack(v, 1.9);
              ((d.dy = (1 - y) * -h.size * 0.9 + b * h.size),
                (d.rot = (1 - y) * (Ys(h.n + u) - 0.5) * 0.8),
                (d.alpha = bt.out2(v * 2) * (1 - b)));
            }
          }),
          this);
    }
    in3D(s = 0.01, { gain: a = 1, depthTest: r = !0 } = {}) {
      ((this.mat.uniforms.uLinear.value = 1),
        (this.mat.uniforms.uGain.value = a),
        (this.mat.uniforms.uFlip.value = 1),
        (this.mat.depthTest = r));
      let l = new Kn();
      return (l.scale.setScalar(s), l.add(this.mesh), (this.x = this.y = 0), l);
    }
    dispose() {
      (e.delete(this), this.tex.dispose(), this.mat.dispose(), this.mesh.geometry.dispose());
    }
  }
  return {
    TextBlock: n,
    block: (o, s) => new n(o, s),
    blocks: e,
    refresh() {
      for (let o of e) ((o._ppu = 0), o._raster(), (o._fn || o.buf) && o.animate(o._fn));
    },
  };
}

function E3() {
  let i = new Ci(0, 1920, 0, 1080, -10, 10),
    t = {
      x0: 0,
      y0: 0,
      w: 1920,
      h: 1080,
      x1: 1920,
      y1: 1080,
      scale: 1,
      cam: i,
      ppu: 1,
      resize(e, n) {
        let o = Math.min(e / 1920, n / 1080);
        ((t.scale = o),
          (t.w = e / o),
          (t.h = n / o),
          (t.x0 = (1920 - t.w) / 2),
          (t.y0 = (1080 - t.h) / 2),
          (t.x1 = t.x0 + t.w),
          (t.y1 = t.y0 + t.h),
          (i.left = t.x0),
          (i.right = t.x1),
          (i.top = t.y0),
          (i.bottom = t.y1),
          i.updateProjectionMatrix());
      },
      toClip(e, n) {
        return [((e - t.x0) / t.w) * 2 - 1, 1 - ((n - t.y0) / t.h) * 2];
      },
      fromClip(e, n) {
        return [t.x0 + (e * 0.5 + 0.5) * t.w, t.y0 + (0.5 - n * 0.5) * t.h];
      },
    };
  return t;
}

var Gf = class {
  constructor(t, e) {
    ((this.gfx = t), (this.view = e), (this.scene = new ge()));
  }
  add(...t) {
    for (let e of t) this.scene.add(e.mesh || e);
    return t[0];
  }
  render(t) {
    let e = this.gfx.r;
    (e.setRenderTarget(t), e.render(this.scene, this.view.cam));
  }
};

var q1 = "#2b5cff",
  KT =
    "precision highp float; in vec3 position; uniform mat4 projectionMatrix; uniform vec4 uRect; uniform float uRot,uPad; out vec2 vP; void main(){ vec2 h=uRect.zw*.5+uPad; vec2 q=position.xy*2.*h; vP=q; float s=sin(uRot),k=cos(uRot); vec2 p=uRect.xy+uRect.zw*.5+vec2(q.x*k-q.y*s,q.x*s+q.y*k); gl_Position=projectionMatrix*vec4(p,0.,1.); }",
  jT = `precision highp float; in vec2 vP; out vec4 o; uniform vec4 uRect; uniform vec3 uC; uniform float uA,uS,uLine,uKnob,uFill,uPx,uGlow,uDash,uT;
float box(vec2 p,vec2 b){ vec2 q=abs(p)-b; return length(max(q,0.))+min(max(q.x,q.y),0.); }
void main(){ vec2 h=uRect.zw*.5; float px=uPx; float d=abs(box(vP,h)); float line=smoothstep(uLine*.5+px,uLine*.5-px*.2,d); if(uDash>.0){ vec2 q=abs(vP)-h; float s=abs(q.x)<abs(q.y)?vP.x:vP.y; line*=smoothstep(.45,.55,abs(fract((s+uT*30.)/uDash)-.5)*2.); }
 vec4 c=vec4(uC,1.)*line; float fill=box(vP,h)<0.?uFill:0.; c=max(c,vec4(uC*fill,fill));
 vec2 a=vP/h; float best=1e5; for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){ if(x==0&&y==0)continue; best=min(best,length(vP-vec2(x,y)*h)); }
 float ky=-h.y-uS*3.4; float kd=length(vP-vec2(0.,ky)); float stem=abs(vP.x)<uLine*.5&&vP.y<-h.y&&vP.y>ky?uKnob:0.; c=mix(c,vec4(uC,1.),stem*.9); best=min(best,mix(1e5,kd,step(.5,uKnob)));
 float disc=smoothstep(uS+px,uS-px*.2,best), inner=smoothstep(uS-uLine*1.1+px,uS-uLine*1.1-px*.2,best); c=mix(c,vec4(uC,1.),disc); c=mix(c,vec4(1.),inner);
 float g=uGlow*exp(-min(d,best)*.06); c.rgb+=uC*g; c.a=max(c.a,g*.5); o=c*uA; }`,
  t0 = class {
    constructor({
      color: t = q1,
      handle: e = 9,
      line: n = 2.4,
      knob: o = !0,
      glow: s = 0,
      fill: a = 0,
    } = {}) {
      ((this.mat = new ce({
        vertexShader: KT,
        fragmentShader: jT,
        glslVersion: re,
        transparent: !0,
        depthTest: !1,
        depthWrite: !1,
        side: oe,
        blending: Ie,
        blendSrc: pe,
        blendDst: je,
        uniforms: {
          uRect: { value: new ie() },
          uC: { value: new F(...Do(t)) },
          uA: { value: 1 },
          uS: { value: e },
          uLine: { value: n },
          uKnob: { value: o ? 1 : 0 },
          uFill: { value: a },
          uPad: { value: 90 },
          uRot: { value: 0 },
          uPx: { value: 0.7 },
          uGlow: { value: s },
          uDash: { value: 0 },
          uT: { value: 0 },
        },
      })),
        (this.mesh = new Zt(new Ke(1, 1), this.mat)),
        (this.mesh.frustumCulled = !1),
        (this.mesh.renderOrder = 100),
        (this.base = { handle: e, line: n }),
        this.set(0, 0, 10, 10),
        this.alpha(0));
    }
    set(t, e, n, o, s = 0) {
      let a = this.mat.uniforms;
      return (
        a.uRect.value.set(t, e, n, o),
        (a.uRot.value = s),
        (a.uPad.value = 60 + this.base.handle * 6),
        this
      );
    }
    alpha(t) {
      return ((this.mat.uniforms.uA.value = t), (this.mesh.visible = t > 0.002), this);
    }
    size(t) {
      return (
        (this.mat.uniforms.uS.value = this.base.handle * t),
        (this.mat.uniforms.uLine.value = this.base.line * Math.max(0.4, t)),
        this
      );
    }
    color(t) {
      return (this.mat.uniforms.uC.value.set(...Do(t)), this);
    }
    glow(t) {
      return ((this.mat.uniforms.uGlow.value = t), this);
    }
    fill(t) {
      return ((this.mat.uniforms.uFill.value = t), this);
    }
    knob(t) {
      return ((this.mat.uniforms.uKnob.value = t ? 1 : 0), this);
    }
    dash(t, e = 0) {
      return ((this.mat.uniforms.uDash.value = t), (this.mat.uniforms.uT.value = e), this);
    }
    appear(t) {
      let e = bt.outBack(t, 2.2);
      return (this.alpha(Ct(t * 3)), this.size(Math.max(0.01, e)), this);
    }
    around(t, e = 18) {
      let n = t.box;
      return this.set(t.x + n.x - e, t.y + n.y - e * 0.6, n.w + e * 2, n.h + e * 1.2);
    }
  };

function _3(i, t, e) {
  let n = 1e9,
    o = 1e9,
    s = -1e9,
    a = -1e9,
    r = new F();
  for (let l of i) {
    r.copy(l).project(t);
    let c = e.x0 + (r.x * 0.5 + 0.5) * e.w,
      u = e.y0 + (-r.y * 0.5 + 0.5) * e.h;
    ((n = Math.min(n, c)), (o = Math.min(o, u)), (s = Math.max(s, c)), (a = Math.max(a, u)));
  }
  return { x: n, y: o, w: s - n, h: a - o };
}

function T3() {
  return { unlock() {}, mute() {}, emit() {}, hit() {}, param() {}, update() {} };
}

async function A3({
  canvas: i,
  scenes: t,
  transitions: e,
  headless: n = !1,
  qs: o = new URLSearchParams(),
  makeAudio: s = null,
}) {
  await M3();
  let a = b3(i, { headless: n }),
    r = E3(),
    l = 1,
    c = S3(a, () => l),
    u = (s || T3)(),
    f = { x: 0, y: 0, tx: 0, ty: 0, px: 960, py: 540, down: !1 },
    h = {
      THREE: Le,
      gfx: a,
      view: r,
      type: c,
      audio: u,
      mouse: f,
      SelectBox: t0,
      rectOf: _3,
      SELECT: q1,
      headless: n,
      assets: window.__ASSETS || {},
      overlay: () => new Gf(a, r),
      text: (W, D) => c.block(W, D),
      sfx: (W, D) => {
        u.quiet || u.hit(W, D);
      },
      asset: (W) => (window.__ASSETS && window.__ASSETS[W]) || "assets/" + W,
      snapshots: {},
      deck: null,
    },
    d = a.target({}),
    p = a.target({}),
    x = a.target({});
  class v {
    constructor(D, z) {
      ((this.def = D), (this.i = z), (this.inst = null), (this.ready = !1));
      let pt = D.beats.length;
      this.s = {
        t: 0,
        dt: 0,
        beat: 0,
        p: new Array(pt).fill(0),
        _since: new Array(pt).fill(0),
        n: pt,
        enter: 1,
        exit: 0,
        dir: 1,
        mouse: f,
        view: r,
        q: 1,
        at: (ht) => this.s.p[ht] * D.beats[ht].dur,
        k: (ht, gt, dt, Kt = bt.io3) =>
          Kt(Ct((this.s.p[ht] * D.beats[ht].dur - gt) / Math.max(1e-4, dt - gt))),
        since: (ht) => this.s._since[ht],
      };
    }
    async init() {
      if (!this.ready)
        return this._init
          ? this._init
          : ((this._init = (async () => {
              a.owner = this;
              let D;
              try {
                D = this.def.create(h);
                let z = D.init && D.init();
                ((a.owner = null), z && (await z));
              } finally {
                a.owner = null;
              }
              ((this.inst = D), (this.ready = !0));
            })()),
            this._init);
    }
    park(D) {
      !this.ready ||
        n ||
        this.parked === D ||
        ((this.parked = D), a.park(this, D), !D && this.inst.resize && this.inst.resize());
    }
    reset(D = 0, z = !1) {
      let pt = this.s;
      ((pt.t = 0), (pt.beat = D), (pt.enter = 1), (pt.exit = 0));
      for (let ht = 0; ht < pt.n; ht++)
        ((pt.p[ht] = z && ht <= D ? 1 : 0), (pt._since[ht] = z && ht <= D ? 30 : 0));
    }
    step(D) {
      let z = this.s,
        pt = this.def.beats;
      ((z.dt = D), (z.t += D));
      for (let ht = 0; ht < z.n; ht++)
        if (ht <= z.beat) {
          let gt = pt[ht].delay || 0;
          ((z._since[ht] += D),
            z._since[ht] >= gt &&
              (z.p[ht] = Math.min(1, z.p[ht] + (D / pt[ht].dur) * (ht < z.beat ? 3 : 1))));
        } else ((z._since[ht] = 0), (z.p[ht] = Math.max(0, z.p[ht] - (D / pt[ht].dur) * 2.4)));
      this.inst.update(z);
    }
    render(D) {
      this.inst.render(D, this.s);
    }
  }
  let m = t.map((W, D) => new v(W, D)),
    g = -1,
    b = null,
    y = 0,
    S = 0,
    M = !1,
    w = !1,
    E = 0,
    T = 0,
    _ = 1,
    R = !1,
    L = 0,
    k = {},
    P = (W, D) => (k[W] || []).forEach((z) => z(D)),
    C = {};
  for (let W in e) C[W] = { def: e[W], inst: null };
  let A = (W) => {
      let D = C[W] || C.fade;
      if (!D.inst) {
        a.owner = D;
        try {
          D.inst = D.def.create(h);
        } finally {
          a.owner = null;
        }
      }
      return (D.parked && (a.park(D, !1), (D.parked = !1)), D);
    },
    N = () => {
      if (n) return;
      let W = new Set([g, g + 1].map((D) => t[D] && t[D].enterWith));
      for (let D in C)
        D !== "fade" &&
          C[D].inst &&
          !C[D].parked &&
          !W.has(D) &&
          !(b && b.name === D) &&
          (a.park(C[D], !0), (C[D].parked = !0));
    },
    G = new Gf(a, r),
    B = c.block("1", {
      x: 1860,
      y: 1026,
      size: 22,
      font: "arial",
      align: "right",
      valign: "middle",
      color: "#7f7f7f",
    });
  G.add(B);
  let ot = "",
    ut = 1,
    lt = 1;
  function Z(W) {
    let D = W.def.hud || {},
      z = W.def.beats[W.s.beat];
    return {
      txt: String((W.inst && W.inst.page && W.inst.page(W.s)) ?? z.page ?? ""),
      color: (typeof D.color == "function" ? D.color(W.s) : D.color) || "#ffffff",
      font: (typeof D.font == "function" ? D.font(W.s) : D.font) || "monoMed",
      alpha: D.alpha ?? 0.75,
    };
  }
  let H = "",
    Y = "";
  function q(W) {
    let D = b && b.p > 0.5 ? m[b.to] : m[g];
    if (!D || !D.ready) return;
    let z = Z(D);
    ((z.font !== H || z.color !== Y) &&
      ((H = z.font), (Y = z.color), B.style({ font: z.font, color: z.color })),
      z.txt !== ot && ((ot = z.txt), B.set(z.txt || " "), (ut = z.font === "arial" ? 1 : 0)),
      (B.y !== r.y1 - 54 || B.x !== r.x1 - 60) &&
        ((B.x = (Math.max(r.x1 - 60, 1860) > r.x1 - 20, r.x1 - 60)), (B.y = r.y1 - 54)),
      (ut = n ? 1 : Math.min(1, ut + 0.05)),
      (B.alpha = z.alpha * lt),
      B.animate((pt, ht) => {
        let gt = bt.out4(Ct(ut * 1.6 - pt.n * 0.06));
        ((ht.dy = (1 - gt) * pt.size * 1.1), (ht.clip = 1));
      }),
      G.render(W));
  }
  let st = {
    ctx: h,
    gfx: a,
    view: r,
    type: c,
    audio: u,
    R: m,
    scenes: t,
    get cur() {
      return g;
    },
    get trans() {
      return b;
    },
    get auto() {
      return M;
    },
    get muted() {
      return w;
    },
    on(W, D) {
      return ((k[W] = k[W] || []).push(D), st);
    },
    advance() {
      if (((L = 0), b)) {
        ((b.speed = 3.5), (L = 1));
        return;
      }
      let W = m[g];
      W.s.beat < W.s.n - 1
        ? (W.s.beat++, (W.s.dir = 1), h.audio.emit("beat", { scene: W.def.id, beat: W.s.beat }), P("move"))
        : g < m.length - 1 && st.go(g + 1, { with: t[g + 1].enterWith || "fade" });
    },
    back() {
      if (b) {
        b.speed = 3.5;
        return;
      }
      let W = m[g];
      ((W.s.dir = -1),
        W.s.beat > 0
          ? (W.s.beat--, h.audio.emit("back", {}), P("move"))
          : g > 0 &&
            st.go(g - 1, { with: t[g].enterWith || "fade", reverse: !0, beat: t[g - 1].beats.length - 1 }));
    },
    async go(W, { with: D = "fade", reverse: z = !1, beat: pt = 0 } = {}) {
      if (W === g || W < 0 || W >= m.length) return;
      let ht = m[W];
      if ((await ht.init(), ht.park(!1), ht.reset(pt, z), !z && pt))
        for (let dt = 0; dt < pt; dt++) ((ht.s.p[dt] = 1), (ht.s._since[dt] = 30));
      ht.inst.enter && ht.inst.enter(ht.s);
      let gt = A(D);
      if (g < 0) {
        ((g = W), P("move"), V());
        return;
      }
      try {
        nt(g);
      } catch {}
      ((b = {
        from: g,
        to: W,
        T: gt,
        name: D,
        p: 0,
        t: 0,
        dur: gt.def.dur * (z ? 0.55 : 1),
        speed: 1,
        reverse: z,
        linked: D !== "fade",
      }),
        gt.inst.start && gt.inst.start(),
        h.audio.emit("transition", { name: D, from: t[g].id, to: t[W].id, dur: b.dur, reverse: z }),
        P("move"));
    },
    jump(W, D = 0) {
      let z = typeof W == "number" ? W : t.findIndex((pt) => pt.id === W);
      if (!(z < 0)) {
        if (z === g && !b) {
          m[z].reset(D);
          for (let pt = 0; pt < D; pt++) ((m[z].s.p[pt] = 1), (m[z].s._since[pt] = 30));
          (m[z].inst.enter && m[z].inst.enter(m[z].s), P("move"));
          return;
        }
        (b && ct(), st.go(z, { with: "fade", beat: D }));
      }
    },
    setAuto(W) {
      ((M = W), P("auto"));
    },
    toggleBlack() {
      S = S ? 0 : 1;
    },
    mute(W) {
      ((w = W ?? !w), u.mute(w), P("mute"));
    },
    info() {
      let W = m[b ? b.to : g];
      return {
        scene: W.def.id,
        index: W.i,
        beat: W.s.beat,
        title: W.def.title,
        notes: (W.def.notes || [])[W.s.beat] || "",
      };
    },
  };
  h.deck = st;
  function ct() {
    if (!b) return;
    let { from: W, to: D } = b;
    ((m[W].s.exit = 0),
      (m[D].s.enter = 1),
      m[W].inst.exit && m[W].inst.exit(m[W].s),
      (g = D),
      (b = null),
      P("move"),
      V(),
      L && ((L = 0), st.advance()));
  }
  function V() {
    (m.forEach((D, z) => D.park(Math.abs(z - g) > 1)), N());
    let W = t[g + 1];
    if ((W && C[W.enterWith] && A(W.enterWith), !n))
      for (let D of [1, 2]) {
        let z = m[g + D];
        z && !z._warm && setTimeout(() => ft(z), 300 * D);
      }
  }
  async function ft(W) {
    if (!(W._warm || R)) {
      ((W._warm = !0), (u.quiet = !0));
      try {
        (await W.init(), W.park(!1));
        let D = W.s;
        for (let pt = 0; pt < D.n; pt++)
          for (let ht of [!0, !1])
            (W.reset(pt, !0),
              ht && (D.p[pt] = 0.5),
              pt === 0 && ht && W.inst.enter && W.inst.enter(D),
              W.step(1e-4),
              W.render(p));
        let z = A(W.def.enterWith || "fade");
        (W.reset(0), (D.enter = 0.5), W.step(1e-4), z.inst.start && z.inst.start());
        for (let pt of [0.2, 0.5, 0.8])
          z.inst.render({ A: p, B: p, p: pt, out: x, a: W, b: W, sa: D, sb: D, time: 0 });
      } catch (D) {
        console.warn("warm", W.def.id, D && D.message);
      }
      (W.reset(0), (u.quiet = !1));
    }
  }
  st.warmAll = async (W) => {
    Mt();
    let D = g;
    for (let z = 0; z < m.length; z++)
      (await new Promise((pt) => setTimeout(pt, 0)),
        await ft(m[z]),
        a.gl.finish(),
        z > 1 && m[z].park(!0),
        W && W((z + 1) / m.length),
        await new Promise((pt) => requestAnimationFrame(pt)));
  };
  function nt(W) {
    let D = t[W].id,
      z = h.snapshots[D];
    (z || (z = h.snapshots[D] = a.target({ w: 640, h: 360, type: $e })), m[W].render(d), a.copy(d, z));
  }
  function Mt() {
    let W = i.clientWidth || innerWidth,
      D = i.clientHeight || innerHeight,
      z = Math.min(devicePixelRatio || 1, 2);
    o.get("px") && (z = +o.get("px"));
    let pt = W * z,
      ht = D * z,
      gt = Math.min(1, Math.sqrt((2560 * 1600) / (pt * ht)));
    ((pt = Math.round(pt * gt)),
      (ht = Math.round(ht * gt)),
      r.resize(pt, ht),
      (l = r.ppu = r.scale),
      a.resize(Math.max(2, Math.round(pt * _)), Math.max(2, Math.round(ht * _)), pt, ht),
      (a.q = _),
      c.refresh());
    for (let dt of m) dt.ready && dt.inst.resize && dt.inst.resize();
  }
  function Et(W) {
    E += W;
    let D = Mr(5, W);
    if (((f.x += (f.tx - f.x) * D), (f.y += (f.ty - f.y) * D), (y += (S - y) * Mr(6, W)), b)) {
      ((b.t += W * b.speed), (b.p = Ct(b.t / b.dur)));
      let z = m[b.from],
        pt = m[b.to],
        ht = b.reverse ? 1 - b.p : b.p,
        gt = b.reverse ? pt : z,
        dt = b.reverse ? z : pt;
      ((gt.s.exit = b.linked ? ht : 0),
        (dt.s.enter = b.linked ? ht : 1),
        (z.s.q = pt.s.q = _),
        z.step(W),
        pt.step(W),
        b.p >= 1 && ct());
    } else if (g >= 0) {
      let z = m[g];
      if (((z.s.q = _), z.step(W), M)) {
        let pt = z.def.beats[z.s.beat];
        z.s._since[z.s.beat] > (pt.delay || 0) + pt.dur + (pt.hold ?? 3) &&
          (g === m.length - 1 && z.s.beat === z.s.n - 1 ? st.setAuto(!1) : st.advance());
      }
    }
    u.update(W, { scene: g >= 0 ? t[b ? b.to : g].id : "", beat: g >= 0 ? m[b ? b.to : g].s.beat : 0 });
  }
  function at() {
    if (g < 0) return;
    let W = d;
    if (b) {
      let D = m[b.from],
        z = m[b.to],
        pt = b.reverse,
        ht = pt ? z : D,
        gt = pt ? D : z;
      (ht.render(d),
        gt.render(p),
        b.T.inst.render({
          A: d,
          B: p,
          p: pt ? 1 - b.p : b.p,
          out: x,
          a: ht,
          b: gt,
          sa: ht.s,
          sb: gt.s,
          time: E,
        }),
        (W = x));
    } else m[g].render(d);
    (q(W), a.present(W, E, y));
  }
  let rt = 0,
    U = 0,
    j = 0,
    J = [1, 0.84, 0.7, 0.58],
    Pt = [0, 0, 0, 0];
  function $(W) {
    if (n || document.hidden || W > 200) return;
    ((rt = rt * 0.94 + W * 0.06), (U += W), (j = W < 18.5 ? j + W : Math.max(0, j - W * 12)));
    let D = J.indexOf(_);
    rt > 21 && U > 1200
      ? D < J.length - 1 && (Pt[D]++, (_ = J[D + 1]), (U = j = 0), (rt = 14), Mt())
      : D > 0 && j > 5e3 && U > 6e3 && Pt[D - 1] < 3 && !b && ((_ = J[D - 1]), (U = j = 0), Mt());
  }
  function tt(W) {
    if ((requestAnimationFrame(tt), R)) return;
    let D = W - T;
    ((T = W), $(D), Et(Math.min(0.05, Math.max(0, D / 1e3))), at());
  }
  if (!n) {
    addEventListener("resize", Mt);
    let W = (gt) => {
      let dt = i.getBoundingClientRect(),
        Kt = ((gt.clientX - dt.left) / dt.width) * 2 - 1,
        Ot = 1 - ((gt.clientY - dt.top) / dt.height) * 2;
      return [Kt, Ot, ...r.fromClip(Kt, Ot)];
    };
    addEventListener("pointermove", (gt) => {
      let [dt, Kt, Ot, Ut] = W(gt);
      ((f.tx = dt),
        (f.ty = Kt),
        (f.px = Ot),
        (f.py = Ut),
        g >= 0 && m[g].inst && m[g].inst.pointer && m[g].inst.pointer("move", Ot, Ut, m[g].s));
    });
    let D = 0,
      z = 0,
      pt = 0,
      ht = !1;
    (i.addEventListener("pointerdown", (gt) => {
      let [dt, Kt, Ot, Ut] = W(gt);
      ((f.down = !0),
        (f.px = Ot),
        (f.py = Ut),
        (D = gt.clientX),
        (z = gt.clientY),
        (pt = performance.now()),
        (ht = !!(g >= 0 && m[g].inst.pointer && m[g].inst.pointer("down", Ot, Ut, m[g].s))),
        ht && i.setPointerCapture(gt.pointerId),
        u.unlock());
    }),
      i.addEventListener("pointerup", (gt) => {
        let [dt, Kt, Ot, Ut] = W(gt);
        f.down = !1;
        let O = ht;
        if (((ht = !1), g >= 0 && m[g].inst.pointer && m[g].inst.pointer("up", Ot, Ut, m[g].s), O)) return;
        let I = gt.clientX - D,
          et = gt.clientY - z;
        if (Math.abs(I) > 50 && Math.abs(I) > Math.abs(et)) {
          I < 0 ? st.advance() : st.back();
          return;
        }
        if (Math.abs(I) < 12 && Math.abs(et) < 12 && performance.now() - pt < 600) {
          if (gt.button === 2) return;
          st.advance();
        }
      }),
      i.addEventListener("contextmenu", (gt) => {
        (gt.preventDefault(), st.back());
      }));
  }
  return (
    (st.start = async (W, D = 0) => {
      Mt();
      let z = Math.max(
        0,
        t.findIndex((pt) => pt.id === W),
      );
      (await m[z].init(), m[z].park(!1), m[z].reset(D));
      for (let pt = 0; pt < D; pt++) ((m[z].s.p[pt] = 1), (m[z].s._since[pt] = 30));
      (m[z].inst.enter && m[z].inst.enter(m[z].s),
        (g = z),
        P("move"),
        V(),
        n || ((T = performance.now()), requestAnimationFrame(tt)));
    }),
    (st.test = {
      resize: Mt,
      draw: at,
      async seek(W, D, z, { mx: pt = 0, my: ht = 0 } = {}) {
        R = !0;
        let gt = t.findIndex((Ot) => Ot.id === W),
          dt = m[gt];
        (await dt.init(),
          (b = null),
          (g = gt),
          dt.reset(0),
          (dt.s.enter = 1),
          (f.x = f.tx = pt),
          (f.y = f.ty = ht),
          dt.inst.enter && dt.inst.enter(dt.s));
        let Kt = 1 / 60;
        for (let Ot = 0; Ot <= D; Ot++) {
          dt.s.beat = Ot;
          let Ut = dt.def.beats[Ot],
            O = Ot < D ? (Ut.delay || 0) + Ut.dur + Math.min(1.5, Ut.hold ?? 1.5) : z;
          for (let I = 0; I < O; I += Kt) ((E += Kt), dt.step(Math.min(Kt, O - I)));
        }
        at();
      },
      async trans(W, D) {
        R = !0;
        let z = t.findIndex((Ot) => Ot.id === W),
          pt = m[z - 1],
          ht = m[z];
        (await pt.init(),
          await ht.init(),
          await st.test.seek(t[z - 1].id, t[z - 1].beats.length - 1, t[z - 1].beats.at(-1).dur + 1),
          (g = z - 1));
        try {
          nt(g);
        } catch {}
        let gt = t[z].enterWith || "fade",
          dt = A(gt);
        (ht.reset(0),
          ht.inst.enter && ht.inst.enter(ht.s),
          (b = {
            from: z - 1,
            to: z,
            T: dt,
            name: gt,
            p: 0,
            t: 0,
            dur: dt.def.dur,
            speed: 1,
            reverse: !1,
            linked: gt !== "fade",
          }),
          dt.inst.start && dt.inst.start());
        let Kt = 1 / 60;
        for (; b && b.p < D - 1e-6;) Et(Math.min(Kt, (D - b.p) * b.dur + 1e-5));
        (at(), (b = null));
      },
      perf(W, D = 20) {
        let z = t.findIndex((pt) => pt.id === W);
        return a.time(() => {
          ((m[z].s.t += 1 / 60), m[z].render(d), a.present(d, 0, 0));
        }, D);
      },
    }),
    st
  );
}

function R3(i, t) {
  let e = document.getElementById("ui"),
    n = (y, S = "") => {
      let M = document.createElement("div");
      return ((M.className = y), (M.innerHTML = S), M);
    },
    o = null,
    s = null,
    a = null,
    r = 0,
    l = null,
    c = () => {
      if (!r) return "0:00";
      let y = Math.floor((performance.now() - r) / 1e3);
      return Math.floor(y / 60) + ":" + String(y % 60).padStart(2, "0");
    },
    u = (y) => {
      let S = n("toast", y);
      (e.append(S), setTimeout(() => (S.style.opacity = 0), 1300), setTimeout(() => S.remove(), 1800));
    };
  function f() {
    let y = i.info(),
      S = t[y.index],
      M = `${c()}<br>${y.index + 1} / ${t.length} \xB7 ${y.beat + 1} / ${S.beats.length}`;
    if (
      (o && ((o.querySelector("p").textContent = y.notes), (o.querySelector(".meta").innerHTML = M)),
      l && !l.closed)
    ) {
      let w = l.document;
      ((w.getElementById("n").textContent = y.notes),
        (w.getElementById("m").innerHTML = M),
        (w.getElementById("s").textContent = S.title));
    }
  }
  function h() {
    let y = i.info();
    try {
      history.replaceState(null, "", "#" + y.scene + (y.beat ? "-" + (y.beat + 1) : ""));
    } catch {}
  }
  (i.on("move", () => {
    (r || (r = performance.now()), f(), h());
  }),
    setInterval(f, 1e3));
  let d = () => {
      o ? (o.remove(), (o = null)) : ((o = n("notes", '<p></p><div class="meta"></div>')), e.append(o), f());
    },
    p = () => {
      if (s) {
        (s.remove(), (s = null));
        return;
      }
      ((s = n("over")),
        t.forEach((y, S) => {
          let M = document.createElement("button");
          ((M.innerHTML = `<div class="th"></div><span>${y.title}</span>`),
            (M.querySelector(".th").style.backgroundImage = `url(${i.ctx.asset("thumb-" + y.id + ".jpg")})`),
            M.setAttribute("aria-current", i.info().index === S),
            (M.onclick = () => {
              (p(), i.jump(y.id));
            }),
            s.append(M));
        }),
        e.append(s),
        s.querySelector("[aria-current=true]")?.focus());
    },
    x = () => {
      if (a) {
        (a.remove(), (a = null));
        return;
      }
      ((a = n(
        "help",
        [
          ["下一页", "→ 或空格或点击"],
          ["上一页", "\u2190"],
          ["全屏", "F"],
          ["自动播放", "A"],
          ["声音开关", "M"],
          ["演讲备注", "N"],
          ["备注另开窗口", "P"],
          ["全部幻灯片", "O"],
          ["黑屏", "."],
        ]
          .map(([y, S]) => `<b>${y}</b><span>${S}</span>`)
          .join(""),
      )),
        e.append(a));
    },
    v = () => {
      try {
        if (((l = open("", "lbs-notes", "width=900,height=600")), !l)) throw 0;
        ((l.document.title = "演讲备注"),
          (l.document.body.innerHTML =
            '<style>body{margin:0;background:#101218;color:#f2f4f8;font:28px/1.45 system-ui;padding:40px;display:grid;gap:24px}#n{white-space:pre-line}#m,#s{color:#a4abb8;font-size:20px;font-variant-numeric:tabular-nums}</style><div id="s"></div><div id="n"></div><div id="m"></div>'),
          (l.document.onkeydown = m),
          f());
      } catch {
        o || d();
      }
    };
  function m(y) {
    if (y.metaKey || y.ctrlKey || y.altKey) return;
    let S = y.key;
    (i.audio.unlock(),
      !(s && S !== "Escape" && S !== "o" && S !== "O") &&
        (["ArrowRight", "ArrowDown", " ", "PageDown", "Enter"].includes(S)
          ? (y.preventDefault(), y.repeat || i.advance())
          : ["ArrowLeft", "ArrowUp", "PageUp", "Backspace"].includes(S)
            ? (y.preventDefault(), y.repeat || i.back())
            : S === "Home"
              ? i.jump(0)
              : S === "End"
                ? i.jump(t.length - 1)
                : S === "f" || S === "F"
                  ? document.fullscreenElement
                    ? document.exitFullscreen()
                    : document.documentElement.requestFullscreen().catch(() => {})
                  : S === "a" || S === "A"
                    ? (i.setAuto(!i.auto), u(i.auto ? "自动播放中" : "手动"))
                    : S === "m" || S === "M"
                      ? (i.mute(), u(i.muted ? "声音已关" : "声音已开"))
                      : S === "n" || S === "N"
                        ? d()
                        : S === "p" || S === "P"
                          ? v()
                          : S === "o" || S === "O"
                            ? p()
                            : S === "?" || S === "h" || S === "H"
                              ? x()
                              : S === "." || S === "b" || S === "B"
                                ? i.toggleBlack()
                                : S === "Escape" && (s && p(), a && x())));
  }
  addEventListener("keydown", m);
  let g,
    b = () => {
      (document.body.classList.remove("idle"),
        clearTimeout(g),
        (g = setTimeout(() => document.body.classList.add("idle"), 2200)));
    };
  (addEventListener("pointermove", b),
    b(),
    addEventListener("hashchange", () => {
      let y = /^#([a-z]+)(?:-(\d+))?$/.exec(location.hash);
      if (y) {
        let S = i.info();
        (y[1] !== S.scene || (y[2] ? +y[2] - 1 : 0) !== S.beat) && i.jump(y[1], y[2] ? +y[2] - 1 : 0);
      }
    }));
}

async function C3({ createDeck: i, transitions: t, scenes: e, makeAudio: n, headless: o }) {
  let s = new URLSearchParams(location.search),
    a = document.getElementById("stage"),
    r;
  try {
    r = await i({ canvas: a, scenes: e, transitions: t, headless: o, qs: s, makeAudio: n });
  } catch (u) {
    console.error(u);
    let f = document.createElement("div");
    ((f.className = "help"),
      (f.textContent =
        "这个演示需要 WebGL 2。请用桌面版最新 Chrome、Edge、Safari 或 Firefox 打开。"),
      document.getElementById("ui").append(f));
    return;
  }
  if (((window.__deck = r), !o && !s.has("quick"))) {
    let u = document.createElement("div");
    ((u.className = "load"),
      (u.innerHTML = "<p>正在准备演示</p><div><i></i></div>"),
      document.getElementById("ui").append(u));
    let f = u.querySelector("i");
    (await new Promise((h) => requestAnimationFrame(h)),
      await r.warmAll((h) => {
        f.style.width = Math.round(h * 100) + "%";
      }),
      u.remove());
  }
  let l = /^#([a-z]+)(?:-(\d+))?$/.exec(location.hash || ""),
    c = l && e.some((u) => u.id === l[1]) ? l[1] : e[0].id;
  return (await r.start(c, l && l[2] ? +l[2] - 1 : 0), o || R3(r, e), (window.ready = !0), r);
}

var P3 = {
  dur: 0.7,
  create(i) {
    let t = i.gfx.pass(
      "uniform sampler2D tA,tB; uniform float p; void main(){ o=mix(texture(tA,vUv),texture(tB,vUv),smoothstep(0.,1.,p)); }",
      { tA: null, tB: null, p: 0 },
    );
    return {
      render({ A: e, B: n, p: o, out: s }) {
        ((t.u.tA.value = e.texture), (t.u.tB.value = n.texture), (t.u.p.value = o), t.render(s));
      },
    };
  },
};
