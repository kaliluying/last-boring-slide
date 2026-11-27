// deck/transitions.js
// The remaining 9 scene transitions (portal-in/out, fold, wash, flaps, slam, daybreak, line, tear).
// Part 597-611 of the original 613 top-level statements; all modules are
// concatenated back into one IIFE by build.mjs, so they share a single scope.

var Xb = {
  dur: 3.2,
  create(i) {
    let t = q0(i),
      e = [
        [-1, 1],
        [1, 1],
        [1, -1],
        [-1, -1],
      ];
    return {
      render({ A: n, B: o, p: s, out: a, b: r, sb: l }) {
        if (s <= 0) return i.gfx.copy(n, a);
        if (s >= 1) return i.gfx.copy(o, a);
        let c = r && r.inst && r.inst.portal && r.inst.portal.in,
          u = null;
        if (c)
          try {
            u = c.call(r.inst.portal, l);
          } catch (f) {
            (t.warned || ((t.warned = 1), console.error("portal.in", f)), (u = { c: e, a: 1 - ke(s) }));
          }
        else {
          let f = ke(we(s, 0, 0.95));
          u = { c: W0(i.gfx.aspect, f), a: 1 - ke(we(s, 0.72, 0.97)), shade: 1 };
        }
        t.draw(o, n, u, a);
      },
    };
  },
};

var Yb = {
  dur: 2.8,
  create(i) {
    let t = q0(i),
      e = [
        [-1, 1],
        [1, 1],
        [1, -1],
        [-1, -1],
      ];
    return {
      render({ A: n, B: o, p: s, out: a, a: r, sa: l }) {
        if (s <= 0) return i.gfx.copy(n, a);
        if (s >= 1) return i.gfx.copy(o, a);
        let c = r && r.inst && r.inst.portal && r.inst.portal.out,
          u = null;
        if (c)
          try {
            u = c.call(r.inst.portal, l);
          } catch (f) {
            (t.warned || ((t.warned = 1), console.error("portal.out", f)), (u = { c: e, a: ke(s) }));
          }
        else {
          let f = ke(we(s, 0.02, 0.99));
          u = { c: W0(i.gfx.aspect, 1 - f), a: ke(we(s, 0.02, 0.3)), shade: 1 };
        }
        t.draw(n, o, u, a);
      },
    };
  },
};

var gn = Math.SQRT1_2,
  eo = Math.PI,
  Kb = 3.4,
  X0 = 0.0016;

function o6(i, t, e) {
  let n = i[0] * t[0] + i[1] * t[1] - e;
  return [i[0] - 2 * n * t[0], i[1] - 2 * n * t[1]];
}

function Ph(i, t, e, n = "c") {
  let o = i[n].map((f) => f[0] * t[0] + f[1] * t[1] - e),
    s = o.length,
    a = () => ({ ...i, s: [], c: [], ops: i.ops.slice() }),
    r = a(),
    l = a(),
    c = 1e-7;
  for (let f = 0; f < s; f++) {
    let h = (f + 1) % s,
      d = o[f],
      p = o[h];
    if (
      (d <= c && (r.s.push(i.s[f]), r.c.push(i.c[f])),
      d >= -c && (l.s.push(i.s[f]), l.c.push(i.c[f])),
      (d < -c && p > c) || (d > c && p < -c))
    ) {
      let x = d / (d - p),
        v = [xn(i.s[f][0], i.s[h][0], x), xn(i.s[f][1], i.s[h][1], x)],
        m = [xn(i.c[f][0], i.c[h][0], x), xn(i.c[f][1], i.c[h][1], x)];
      (r.s.push(v), r.c.push(m), l.s.push(v), l.c.push(m));
    }
  }
  let u = (f) => {
    let h = 0;
    for (let d = 0; d < f.length; d++) {
      let p = f[d],
        x = f[(d + 1) % f.length];
      h += p[0] * x[1] - p[1] * x[0];
    }
    return Math.abs(h);
  };
  return [r.c.length > 2 && u(r.c) > 1e-6 ? r : null, l.c.length > 2 && u(l.c) > 1e-6 ? l : null];
}

var Cc = {
    cr: { n: [gn, gn], off: 0, zh: 3, s: 1 },
    cl: { n: [-gn, gn], off: 0, zh: 3, s: 1 },
    tfr: { n: [gn, -gn], off: 2 * gn, zh: 3, s: 1 },
    tfl: { n: [-gn, -gn], off: 2 * gn, zh: 3, s: 1 },
    tbr: { n: [gn, -gn], off: 2 * gn, zh: -1, s: -1 },
    tbl: { n: [-gn, -gn], off: 2 * gn, zh: -1, s: -1 },
    bf: { n: [0, -1], off: 1, zh: 7, s: 1 },
    bb: { n: [0, -1], off: 1, zh: -2, s: -1 },
  },
  Y0 = Object.keys(Cc);

function d2(i, t) {
  let e = Cc[t];
  return (
    (i.c = i.c.map((n) => o6(n, e.n, e.off))),
    (i.z = 2 * e.zh - i.z),
    (i.par *= -1),
    i.ops.push(Y0.indexOf(t)),
    i
  );
}

function s6(i) {
  let t = (n, o, s) => {
      let a = [
        [-1, n],
        [1, n],
        [1, o],
        [-1, o],
      ];
      return { s: a, c: a.map((r) => r.slice()), z: 0, par: 1, ops: [], front: s };
    },
    e = [t(0, i, !0), t(-i, 0, !1)];
  for (let n = 1; n < 12; n++) {
    let o = (i * n) / 12,
      s = [];
    for (let a of e) for (let r of Ph(a, [0, 1], a.front ? o : -o)) r && s.push(r);
    e = s;
  }
  for (let n of e) n.front && ((n.c = n.c.map(([o, s]) => [o, -s])), (n.z = 2), (n.par = -1));
  for (let n of ["cr", "cl"]) {
    let o = [];
    for (let s of e) {
      let [a, r] = Ph(s, Cc[n].n, 0);
      (a && o.push(a), r && o.push(d2(r, n)));
    }
    e = o;
  }
  {
    let n = [];
    for (let o of e) {
      let [s, a] = Ph(o, [0, -1], 1);
      if ((s && n.push(s), !a)) continue;
      let r = [a];
      for (let l of ["r", "l"]) {
        let c = (o.front ? "tf" : "tb") + l,
          u = [];
        for (let f of r) {
          let [h, d] = Ph(f, Cc[c].n, Cc[c].off);
          (h && u.push(h), d && u.push(d2(d, c)));
        }
        r = u;
      }
      for (let l of r) n.push(d2(l, o.front ? "bf" : "bb"));
    }
    e = n;
  }
  for (let [n, o] of [
    [[1, 0], 0],
    [[gn, -gn], gn],
    [[-gn, -gn], gn],
    [[0, -1], 0.5],
  ]) {
    let s = [];
    for (let a of e) for (let r of Ph(a, n, o)) r && s.push(r);
    e = s;
  }
  for (let n of e) {
    let o = 0,
      s = 0;
    for (let p of n.c) ((o += p[0]), (s += p[1]));
    ((o /= n.c.length), (s = -s / n.c.length));
    let a = n.z >= 1.5,
      r = o > 0,
      l = r ? 1 : -1,
      c = r ? 5 : 6,
      u = r ? 7 : 8,
      f = a ? 1 : 2,
      h = a ? 3 : 4,
      d = Math.abs(o);
    ((n.flap = 0),
      d + s > 1
        ? ((n.tri = [h, u, c]), (n.flap = l))
        : s < 0.5
          ? (n.tri = [0, f, r ? 9 : 10])
          : (n.tri = [f, h, c]),
      (n.zo = n.z - 1));
  }
  return e;
}

var jb = [
    [0, 0],
    [0, -0.5],
    [0, -0.5],
    [0, -1],
    [0, -1],
    [0.5, -0.5],
    [-0.5, -0.5],
    [1, -1],
    [-1, -1],
    [0.5, -0.5],
    [-0.5, -0.5],
  ],
  a6 =
    "precision highp float; in vec3 position,normal; in vec2 aS; uniform mat4 modelMatrix,viewMatrix,projectionMatrix,uLight; out vec3 vN,vW; out vec2 vS; out vec4 vL; void main(){ vec4 w=modelMatrix*vec4(position,1.); vW=w.xyz; vN=mat3(modelMatrix)*normal; vS=aS; vL=uLight*w; gl_Position=projectionMatrix*viewMatrix*w; }",
  r6 =
    Sn +
    Fe +
    `in vec3 vN,vW; in vec2 vS; in vec4 vL; out vec4 o; uniform sampler2D tA,tMip; uniform highp sampler2D tSh; uniform float uL,uLit,uPx,uBrim; uniform vec4 uCr; uniform vec3 uKey,uEye;
float lit(vec3 n,float sh){ return .50+.20*n.y+.10*n.z+.62*max(dot(n,uKey),0.)*sh; }
float shadow(vec3 n){ vec3 q=vL.xyz/vL.w*.5+.5; float b=.0024+.0030*(1.-abs(dot(n,uKey))); float a=hash12(gl_FragCoord.xy)*6.2831, s=0.; mat2 m=mat2(cos(a),-sin(a),sin(a),cos(a)); for(int i=0;i<10;i++){ float f=(float(i)+.5)/10.; float t=float(i)*2.39996; vec2 d=m*vec2(cos(t),sin(t))*sqrt(f)*.011; s+=step(q.z-b-f*.0012,texture(tSh,q.xy+d).r); } return s/10.; }
float line(float d,float w){ float f=fwidth(d); return exp(-d*d/(w*w+f*f*.6)); }
void main(){ bool fr=gl_FrontFacing; vec3 n=normalize(vN)*(fr?1.:-1.); vec2 uv=vec2(vS.y/uL+.5,.5-vS.x*.5); float sh=shadow(n); float e0=lit(vec3(0.,0.,1.),1.); float back=max(dot(-n,uKey),0.); float e=(lit(n,sh)+.07*back)/e0; e=e>1.?1.+(e-1.)*.45/(1.+(e-1.)*2.):e;
 vec2 rs=vec2(textureSize(tA,0)); vec2 gx=dFdx(uv),gy=dFdy(uv); float m=max(length(gx*rs),length(gy*rs)); vec3 ink=toLin(clamp(texture(tA,uv).rgb,0.,1.)); float f=smoothstep(1.015,1.4,m); if(f>0.) ink=mix(ink,textureGrad(tMip,uv,gx*.8,gy*.8).rgb,f);
 float fib=fr?0.:.6*vnoise(vS*vec2(70.,110.))+.4*vnoise(vS*vec2(190.,240.))-.5, fine=vnoise(vS*420.)-.5; vec3 paper=vec3(.92,.91,.89)*(1.+(fib*.035+fine*.02)); paper=mix(paper,paper*ink,.035);
 ink=mix(ink,paper,uBrim);
 vec3 c=fr?ink:paper;
 // the print stops a hair before the cut edge
 vec2 ed=vec2(1.-abs(vS.x),uL*.5-abs(vS.y)); float de=min(ed.x,ed.y); if(fr) c=mix(c,vec3(.86),smoothstep(.006+uPx,.004,de)*uLit);
 // creases: a compressed valley and a lit lip, ink cracked to white
 vec2 q=abs(vS); float cw=.0045; float k1=line(q.y,cw)*uCr.x, k2=line((q.x-q.y)*.7071,cw)*uCr.y*step(q.y,1.02), k3=line(q.y-1.,cw)*uCr.z, k4=line((q.x+q.y-2.)*.7071,cw)*uCr.z*step(1.,q.y), k5=line(q.x,cw)*uCr.w, k6=line((q.x+q.y-1.)*.7071,cw)*uCr.w; float k=clamp(k1+k2+k3+k4+k5+k6,0.,1.); c=mix(c,fr?mix(c,vec3(.85),.55*(1.-uBrim)):c*.86,k*(.5+.5*vnoise(vS*90.)));
 vec3 v=normalize(uEye-vW), hv=normalize(v+uKey); float sp=pow(max(dot(n,hv),0.),28.)*.05*sh;
 vec3 tint=mix(vec3(.93,.965,1.04),vec3(1.),clamp(e,0.,1.)); // skylight in the shade
 vec3 lc=c*e*tint+sp; lc=mix(c,lc,uLit); o=vec4(lc,1.); }`,
  l6 =
    "precision highp float; in vec3 position; uniform mat4 modelMatrix,uLight; void main(){ gl_Position=uLight*modelMatrix*vec4(position,1.); }",
  $b = {
    dur: Kb,
    create(i) {
      let { gfx: t, view: e } = i,
        n = ia(i),
        o = G0(i),
        s = 3.1,
        a = Rc(i),
        r = t.target({ w: 1024, h: 1024, depthTexture: !0, filter: Je }),
        l = new Ye((2 * Math.atan(1 / s) * 180) / eo, 1, 0.6, 14);
      l.position.z = s;
      let c = new ge(),
        u = new ge(),
        f = new Kn(),
        h = new Kn();
      ((f.matrixAutoUpdate = h.matrixAutoUpdate = !1), c.add(f), u.add(h));
      let d = {
          tA: { value: null },
          tMip: { value: null },
          tSh: { value: r.depthTexture },
          uL: { value: 2 },
          uLit: { value: 0 },
          uPx: { value: 0.001 },
          uBrim: { value: 0 },
          uCr: { value: new ie() },
          uKey: { value: new F(-0.45, 0.62, 0.64).normalize() },
          uEye: { value: l.position },
          uLight: { value: new ne() },
        },
        p = new ce({
          vertexShader: a6,
          fragmentShader:
            `precision highp float; precision highp int;
` + r6,
          glslVersion: re,
          uniforms: d,
          side: oe,
        }),
        x = new ce({
          vertexShader: l6,
          fragmentShader: "precision highp float; out vec4 o; void main(){ o=vec4(1.); }",
          glslVersion: re,
          uniforms: d,
          side: oe,
        }),
        v = 0,
        m,
        g,
        b,
        y,
        S,
        M,
        w;
      function E(q) {
        ((v = q), (m = s6(q)), (g = []));
        let st = [],
          ct = [];
        (m.forEach((V) => {
          let ft = g.length,
            [nt, Mt, Et] = V.tri.map((rt) => jb[rt]),
            at = (Mt[0] - nt[0]) * (Et[1] - nt[1]) - (Mt[1] - nt[1]) * (Et[0] - nt[0]);
          ((V.or = Math.sign(at)),
            V.s.forEach((rt, U) => {
              let j = V.c[U],
                J = j[0] - nt[0],
                Pt = j[1] - nt[1];
              (g.push({
                P: V,
                x: rt[0],
                y: rt[1],
                u: (J * (Et[1] - nt[1]) - Pt * (Et[0] - nt[0])) / at,
                v: ((Mt[0] - nt[0]) * Pt - (Mt[1] - nt[1]) * J) / at,
              }),
                ct.push(rt[0], rt[1]));
            }));
          for (let rt = 1; rt < V.s.length - 1; rt++) st.push(ft, ft + rt, ft + rt + 1);
        }),
          S && S.dispose(),
          (S = new Qt()),
          (b = new $t(new Float32Array(g.length * 3), 3).setUsage(Vi)),
          (y = new $t(new Float32Array(g.length * 3), 3).setUsage(Vi)),
          S.setAttribute("position", b),
          S.setAttribute("normal", y),
          S.setAttribute("aS", new $t(new Float32Array(ct), 2)),
          S.setIndex(st),
          M
            ? ((M.geometry = S), (w.geometry = S))
            : ((M = new Zt(S, p)),
              (w = new Zt(S, x)),
              (M.frustumCulled = w.frustumCulled = !1),
              f.add(M),
              h.add(w)));
      }
      let T = Y0.map(() => new ne()),
        _ = new ne(),
        R = new F(),
        L = (q, st) => {
          let ct = Cc[Y0[q]],
            V = T[q];
          (R.set(ct.n[1], -ct.n[0], 0), V.makeRotationAxis(R, st * ct.s));
          let ft = ct.n[0] * ct.off,
            nt = ct.n[1] * ct.off,
            Mt = ct.zh * X0,
            Et = V.elements;
          ((Et[12] = ft - (Et[0] * ft + Et[4] * nt + Et[8] * Mt)),
            (Et[13] = nt - (Et[1] * ft + Et[5] * nt + Et[9] * Mt)),
            (Et[14] = Mt - (Et[2] * ft + Et[6] * nt + Et[10] * Mt)));
        },
        k = jb.map(() => [0, 0, 0]),
        P = new Map(),
        C = (q, st, ct, V) => {
          ((k[q][0] = st), (k[q][1] = ct), (k[q][2] = V));
        },
        A = (q) => (
          (q = na(q)),
          q < 0.72 ? ke(q / 0.72) : 1 - 0.05 * Math.sin(((q - 0.72) / 0.28) * eo) * (1 - (q - 0.72) / 0.28)
        ),
        N = new Ci(-2.3, 2.3, 2.3, -2.3, 0.1, 9),
        G = t.pass(
          Sn +
            "uniform sampler2D tB,tL,tN,tF; uniform vec2 uOff,uOff2; uniform float uS,uFade; void main(){ vec4 b=texture(tB,vUv), l=texture(tL,vUv); float s=1.-(1.-uS*.85*texture(tN,vUv+uOff*.35).r)*(1.-uS*.8*texture(tF,vUv+uOff2).r); l*=uFade; s*=1.-l.a; if(l.a<=0.&&s<.0008){ o=b; return; } vec3 c=toLin(clamp(b.rgb,0.,1.)); c*=mix(vec3(1.),vec3(.36,.40,.48),s); c=c*(1.-l.a)+l.rgb; o=vec4(toSrgb(c),1.); }",
          {
            tB: null,
            tL: a.texture,
            tN: o.near.texture,
            tF: o.far.texture,
            uOff: new Nt(),
            uOff2: new Nt(),
            uS: 0,
            uFade: 1,
          },
        ),
        B = new ne(),
        ot = new qe(),
        ut = new Cn(),
        lt = new F(),
        Z = new F(),
        H = new ne();
      function Y(q, st, ct) {
        let V = q * Kb,
          ft = t.aspect,
          nt = Br(we(V, 0.1, 0.8)) * eo,
          Mt = Math.sin(nt) * 0.62 * (1 - 0.4 * we(V, 0.5, 0.8)) + 0.1 * Math.sin(eo * we(V, 0.02, 0.3)),
          Et = 0.1 * (1 - we(V, 1.46, 1.62)),
          at = {
            cr: A(we(V, 0.8, 1.16)),
            cl: A(we(V, 0.9, 1.26)),
            tfr: ke(we(V, 1.16, 1.36)),
            tfl: ke(we(V, 1.2, 1.4)),
            tbr: ke(we(V, 1.16, 1.36)),
            tbl: ke(we(V, 1.2, 1.4)),
            bf: A(we(V, 1.32, 1.64)),
            bb: A(we(V, 1.32, 1.62)),
          };
        Y0.forEach((mt, Dt) => L(Dt, at[mt] * (eo - Et)));
        let rt = ke(we(V, 1.64, 2.02)),
          U = A(we(V, 1.97, 2.27)),
          j = ke(we(V, 2.25, 2.57)),
          J = we(V, 2.5, 3),
          Pt = J >= 1 ? 1 : 1 - Math.exp(-6.2 * J) * Math.cos(J * 8.5) * (1 - J),
          $ = V >= 1.64,
          tt = eo / 4,
          W = b.array,
          D = y.array;
        if ($) {
          let mt, Dt, it, Rt, xt, Wt;
          if (j <= 0) {
            let ee = tt * Math.sin((rt * eo) / 2),
              me = Math.acos(Math.min(1, gn / Math.cos(ee)));
            if (
              ((it = -Math.cos(ee)),
              (Rt = Math.sin(ee)),
              (mt = gn * Math.sin(me)),
              (Dt = -gn * Math.cos(me)),
              (xt = 2 * mt),
              (Wt = 2 * Dt),
              U > 0)
            ) {
              let be = U * eo;
              ((xt = gn * Math.sin(be)), (Wt = -gn - gn * Math.cos(be)));
            }
          } else {
            let ee = tt * Math.sin((j * eo) / 2),
              me = Math.acos(Math.min(1, gn / Math.cos(ee)));
            ((mt = gn * Math.sin(ee)),
              (Dt = -gn * Math.cos(ee)),
              (it = -Math.cos(me)),
              (Rt = Math.sin(me)),
              (xt = 0),
              (Wt = 0));
          }
          let Xt = 0,
            Vt = 0,
            Q = 0,
            Lt = it * 0.5,
            yt = Rt * 0.5;
          if (Pt > 0) {
            let ee = Pt,
              me = ((135 - 81.5 * Math.min(1.06, ee)) / 180) * eo,
              be = xn(gn, 0.778, ee);
            ((Xt = xn(mt, 0.447, ee)),
              (Vt = xn(Dt, -0.307, ee)),
              (mt = xn(mt, 0.43, ee)),
              (Dt = xn(Dt, -0.7, ee)),
              (xt = mt + be * Math.cos(me)),
              (Wt = Dt + be * Math.sin(me)));
            let Ae = 1 - ee;
            ((it = Ae * Ae * it + 2 * Ae * ee * -0.75 + ee * ee * -0.247),
              (Rt = Ae * Ae * Rt + 2 * Ae * ee * 0.62 + ee * ee * 0.36),
              (Q = 0.397 * ee),
              (Lt = xn(Lt, -0.715, ee)),
              (yt = xn(yt, 0.13, ee)));
          } else ((Xt = mt), (Vt = Dt));
          (C(0, 0, Q, 0),
            C(1, 0, Lt, yt),
            C(2, 0, Lt, -yt),
            C(3, 0, it, Rt),
            C(4, 0, it, -Rt),
            C(5, mt, Dt, 0),
            C(6, -mt, Dt, 0),
            C(7, xt, Wt, 0),
            C(8, -xt, Wt, 0),
            C(9, Xt, Vt, 0),
            C(10, -Xt, Vt, 0));
          let It = xn(1, 0.42, ke(we(V, 1.64, 1.9))),
            St = 22 * ke(na(U)) * (1 - 0.55 * na(Pt)),
            _t = null,
            Yt = 0,
            jt = 0,
            le = 0,
            ye = 0,
            Jt,
            te,
            se;
          for (let ee = 0; ee < g.length; ee++) {
            let me = g[ee],
              be = me.P;
            if (be !== _t) {
              ((_t = be), (Jt = k[be.tri[0]]), (te = k[be.tri[1]]), (se = k[be.tri[2]]));
              let Ae = te[0] - Jt[0],
                ln = te[1] - Jt[1],
                mn = te[2] - Jt[2],
                un = se[0] - Jt[0],
                Re = se[1] - Jt[1],
                Ne = se[2] - Jt[2];
              ((Yt = ln * Ne - mn * Re), (jt = mn * un - Ae * Ne), (le = Ae * Re - ln * un));
              let Ge = be.or / (Math.hypot(Yt, jt, le) + 1e-9);
              ((Yt *= Ge),
                (jt *= Ge),
                (le *= Ge),
                (ye = be.zo * X0 * It),
                be.flap && (ye -= Math.sign(be.zo) * St * X0 * It));
            }
            ((W[ee * 3] = Jt[0] + (te[0] - Jt[0]) * me.u + (se[0] - Jt[0]) * me.v + Yt * ye),
              (W[ee * 3 + 1] = Jt[1] + (te[1] - Jt[1]) * me.u + (se[1] - Jt[1]) * me.v + jt * ye),
              (W[ee * 3 + 2] = Jt[2] + (te[2] - Jt[2]) * me.u + (se[2] - Jt[2]) * me.v + le * ye),
              (D[ee * 3] = Yt * be.par),
              (D[ee * 3 + 1] = jt * be.par),
              (D[ee * 3 + 2] = le * be.par));
          }
        } else {
          let mt = Math.cos(nt),
            Dt = Math.sin(nt),
            it = 0.16 * Math.sin(eo * we(V, 0, 0.6));
          for (let Rt = 0; Rt < g.length; Rt++) {
            let xt = g[Rt],
              Wt = xt.P,
              Xt = xt.x,
              Vt,
              Q,
              Lt,
              yt,
              It = 0,
              St = Math.abs(xt.y);
            if (Wt.front) {
              let _t = nt - Mt * St;
              (Math.abs(Mt) < 1e-4
                ? ((Vt = mt * St), (Q = Dt * St))
                : ((Vt = (Dt - Math.sin(_t)) / Mt), (Q = (Math.cos(_t) - mt) / Mt)),
                (Q += X0 * (1 - mt)),
                (Lt = -Math.sin(_t)),
                (yt = Math.cos(_t)));
            } else
              (it < 1e-4
                ? ((Vt = -St), (Q = 0))
                : ((Vt = -Math.sin(it * St) / it), (Q = (1 - Math.cos(it * St)) / it)),
                (Lt = Math.sin(it * St)),
                (yt = Math.cos(it * St)));
            for (let _t = 0; _t < Wt.ops.length; _t++) {
              let Yt = T[Wt.ops[_t]].elements,
                jt = Yt[0] * Xt + Yt[4] * Vt + Yt[8] * Q + Yt[12],
                le = Yt[1] * Xt + Yt[5] * Vt + Yt[9] * Q + Yt[13],
                ye = Yt[2] * Xt + Yt[6] * Vt + Yt[10] * Q + Yt[14],
                Jt = Yt[0] * It + Yt[4] * Lt + Yt[8] * yt,
                te = Yt[1] * It + Yt[5] * Lt + Yt[9] * yt,
                se = Yt[2] * It + Yt[6] * Lt + Yt[10] * yt;
              ((Xt = jt), (Vt = le), (Q = ye), (It = Jt), (Lt = te), (yt = se));
            }
            ((W[Rt * 3] = Xt),
              (W[Rt * 3 + 1] = Vt),
              (W[Rt * 3 + 2] = Q),
              (D[Rt * 3] = It),
              (D[Rt * 3 + 1] = Lt),
              (D[Rt * 3 + 2] = yt));
          }
        }
        b.needsUpdate = y.needsUpdate = !0;
        let z = Br(we(V, 0, 0.55)),
          pt = Br(we(V, 0.3, 0.98)),
          ht = we(V, 2.72, 3.2),
          gt = xn(
            xn(
              xn(
                xn(
                  xn(xn(0, -v * 0.5, ke(we(V, 0.12, 0.8))), -0.62, ke(we(V, 1.2, 1.64))),
                  -0.7,
                  ke(we(V, 1.64, 2)),
                ),
                -0.38,
                ke(we(V, 2, 2.3)),
              ),
              -0.5,
              ke(we(V, 2.28, 2.55)),
            ),
            -0.195,
            ke(we(V, 2.55, 2.9)),
          ),
          dt =
            (-eo / 2) * ke(we(V, 1.58, 2.02)) -
            (eo / 2) * ke(we(V, 2.2, 2.6)) -
            0.34 * ke(we(V, 2.5, 3)) +
            0.12 * Math.sin(V * 2.1) * z * (1 - ht),
          Kt =
            0.3 * ke(we(V, 0, 0.5)) * (1 - we(V, 0.9, 1.5)) +
            0.16 * ke(we(V, 1.5, 2.2)) +
            0.12 * Math.sin(V * 1.7 + 1) * z * (1 - ht),
          Ot =
            (-eo / 2) * (1 - pt) +
            0.07 * Math.sin(V * 2.6) * z * (1 - ht) +
            (1 - Math.pow(2 * na(ht) - 1, 2)) * 0.16,
          Ut = xn(1, 0.74, z);
        ((Ut = xn(Ut, 0.94, ke(we(V, 0.9, 1.6)))),
          (Ut = xn(Ut, 0.8, ke(we(V, 1.6, 2.3)))),
          (Ut = xn(Ut, 0.78, ke(we(V, 2.4, 2.8)))));
        let O = 0.06 * Math.sin(V * 1.3) * z,
          I = 0.05 * Math.sin(V * 1.9 + 0.6) * z,
          et = -0.1 * z,
          Tt = 0;
        if (ht > 0) {
          let mt = e.toClip(st.x, st.y),
            Dt = ((st.size / e.h) * 2) / 1.79,
            it = ht * ht * (1.15 - 0.15 * ht),
            Rt = ke(ht);
          ((O = xn(O, mt[0] * ft, Rt)),
            (I = xn(I, mt[1], it) + 0.22 * Math.sin(eo * Math.pow(ht, 0.7)) * (1 - ht)),
            (et = xn(et, 0, Rt)),
            (Ut = xn(Ut, Dt, ke(Math.pow(ht, 1.15)))),
            (Tt = -st.angle * Rt));
        }
        let vt = (ht >= 1, 1);
        (ut.set(Kt, dt, 0, "XYZ"),
          ot.setFromEuler(ut),
          lt.set(O, I, et),
          Z.set(Ut, Ut * vt, Ut),
          B.compose(lt, ot, Z),
          _.makeRotationZ(Tt),
          B.multiply(_),
          _.makeRotationZ(Ot),
          B.multiply(_));
        let zt = xn(ft / v, 1, z);
        (_.makeScale(1, zt, 1),
          B.multiply(_),
          _.makeTranslation(0, -gt, 0),
          B.multiply(_),
          f.matrix.copy(B),
          h.matrix.copy(B),
          (f.matrixWorldNeedsUpdate = h.matrixWorldNeedsUpdate = !0),
          lt.set(O, I, et),
          N.position.copy(lt).addScaledVector(d.uKey.value, 4),
          N.up.set(0, 1, 0),
          N.lookAt(lt));
        let Ft = Math.max(0.35, Ut * 2.2);
        ((N.left = -Ft),
          (N.right = Ft),
          (N.top = Ft),
          (N.bottom = -Ft),
          N.updateProjectionMatrix(),
          N.updateMatrixWorld(),
          d.uLight.value.multiplyMatrices(N.projectionMatrix, N.matrixWorldInverse),
          (d.uLit.value = ke(we(V, 0, 0.3))),
          d.uCr.value.set(we(V, 0.5, 0.8), we(V, 1, 1.2), we(V, 1.45, 1.6), we(V, 1.8, 2.3)),
          (d.uPx.value = 2 / t.H / Ut),
          (d.uBrim.value = ke(we(V, 2.55, 3.16))));
        let wt = z * (1 - 0.6 * ht);
        (G.u.uOff.value.set((0.012 * wt) / ft, 0.02 * wt),
          G.u.uOff2.value.set((0.03 * wt) / ft, 0.055 * wt),
          (G.u.uS.value = we(V, 0.02, 0.35) * (1 - 0.7 * ke(we(V, 1.6, 3))) * (1 - ke(we(V, 3.15, 3.36)))),
          (G.u.uFade.value = 1 - ke(we(V, 3.2, 3.34))));
      }
      return {
        pose: Y,
        render({ A: q, B: st, p: ct, out: V, b: ft, sb: nt, time: Mt }) {
          if (ct <= 0) return t.copy(q, V);
          if (ct >= 1) return t.copy(st, V);
          let Et = Math.min(1.9, Math.max(1.18, t.aspect));
          (Math.abs(Et - v) > 1e-4 && E(Et), (l.aspect = t.aspect), l.updateProjectionMatrix());
          let at = null;
          try {
            at = ft.inst.anchor && ft.inst.anchor(nt);
          } catch {}
          ((at = at || { x: 960, y: 640, size: 360, angle: 0 }),
            (d.tMip.value = n.update(q)),
            (d.tA.value = q.texture),
            (d.uL.value = v * 2),
            Y(ct, at, Mt),
            t.draw(u, l, r),
            t.draw(c, l, a, { color: 0, alpha: 0 }),
            o.update(a.texture, 0.006),
            (G.u.tB.value = st.texture),
            G.render(V));
        },
      };
    },
  };

var Zb = {
  dur: 2.6,
  create(i) {
    let { gfx: t } = i,
      e = ia(i, 0),
      n = ia(i, 1),
      o = t.target({ scale: 0.66 }),
      s = t.pass(
        Fe +
          `
    uniform float p,uAsp;
    float ss(float a,float b,float x){ return smoothstep(a,b,x); }
    // how far behind the wave's lip a point is (positive = under water)
    float lip(vec2 q){ float k=clamp(p/.36,0.,1.); k=k*(.55+.45*k); vec2 dir=normalize(vec2(.34,1.)); float s=dot(q,dir); float F=mix(-.30,2.05+.30*(uAsp-1.78),k); return F-s+.10*(fbm(q*2.3+vec2(p*2.,0.))-.5)*2.+.030*sin(q.x*9.+p*20.)+.018*(vnoise(q*13.)-.5); }
    // how far above the draining water line a point is (positive = glass already cleared)
    float drain(vec2 q){ float k=clamp((p-.40)/.46,0.,1.); k=k*k*(3.-2.*k); float L=mix(1.32,-.55,k); float col=.30*(fbm(vec2(q.x*2.1,3.))-.5)*2.+.17*(vnoise(vec2(q.x*9.+.35*sin(q.y*5.),9.))-.5)*2.*ss(.40,.6,p)+.05*(vnoise(vec2(q.x*26.+.3*sin(q.y*9.),4.))-.5); return q.y-L-col; }
    float sheet(vec2 q,float a,float d){ float c=ss(-.005,.16,a)*ss(.02,-.14,d); vec2 fl=vec2(p*1.6,p>.4?(p-.4)*3.2:-p*2.2); vec2 w=vec2(fbm(q*2.+fl),fbm(q*2.+fl+5.2)); float wv=fbm(q*vec2(3.2,2.2)+w*1.4+fl*1.3)+.35*vnoise(q*vec2(17.,8.)+w*4.+fl*4.); float st=vnoise(vec2(q.x*30.+3.*w.x,q.y*2.5+fl.y*2.)); float lipB=ss(0.,.05,a)*ss(.22,.05,a)*.55+ss(.02,-.02,d)*ss(-.10,-.02,d)*.28; return c*(.35+.85*wv+.18*st*ss(.38,.55,p))+lipB*c; }
    // water running down cleared glass
    float rivulets(vec2 q,float d){ float h=0.; for(int L=0;L<2;L++){ float n=L==0?7.:13.; float x=q.x*n+float(L)*3.7; float id0=floor(x); for(int j=-1;j<=1;j++){ float id=id0+float(j); vec2 r=hash22(vec2(id,17.+float(L))); if(r.x<.22) continue; float life=ss(0.,.12,d)*(1.-ss(.62+.2*r.y,.80+.17*r.y,p)); float me=.20*sin(q.y*(5.+5.*r.x)+id*1.7)+.09*sin(q.y*17.+id)+.3*(vnoise(vec2(q.y*3.,id))-.5); float cx=id+.5+me+(r.y-.5)*.4; float wd=(L==0?.115:.085)*(.6+.6*r.y)*(.7+.5*vnoise(vec2(q.y*6.+p*9.,id*3.)))*mix(1.,.45,ss(.5,.9,p)); float e=(x-cx)/wd; float bead=.65+.55*ss(.35,.8,vnoise(vec2(q.y*9.+p*(10.+8.*r.x),id*5.))); h=max(h,life*bead*sqrt(max(0.,1.-e*e))*wd*(L==0?1.:.8)); } } return h*1.2; }
    // beads left behind: each has a place, a size, a moment of drying
    float beads(vec2 q,float n,float seed,float d,float big){ vec2 x=q*n; x.x+=.5*mod(floor(x.y),2.); vec2 id=floor(x), f=fract(x)-.5; vec2 r=hash22(id+seed), r2=hash22(id+seed+9.); if(r.x<big) return 0.; float dry=.60+.36*r.y; float slide=r2.x>.82?ss(.5,.9,p)*.0:0.; float rad=(.13+.30*r2.y*r2.y)*(1.-ss(dry-.20,dry,p)); rad*=ss(.00,.10,d-.05*r2.x); vec2 c=(r2-.5)*.34; vec2 e=f-c; e.x*=1.+.25*(r.x-.5); e.y*=mix(1.,.82,r2.x); e.y-=.0; float wob=1.+.14*(vnoise(normalize(e+1e-4)*1.3+id*7.)-.5); float h=rad*rad*wob-dot(e,e); return h>0.?sqrt(h)/n*1.5:0.; }
    // drops that slide, with their own tail of small beads
    float sliders(vec2 q,float n,float seed,float d){ float x=q.x*n; float id=floor(x); float h=0.; for(int j=-1;j<=1;j++){ float c=id+float(j); vec2 r=hash22(vec2(c,seed)), r2=hash22(vec2(c,seed+5.)); float t0=.42+.18*r.y; float t=(p-t0)*2.6; if(t<0.||r.x<.25) continue; float go=t*(.42+.4*r2.y)+.05*sin(t*9.+c)+.035*sin(t*21.+c*2.); float y=1.12-.35*r2.x-go*1.15; float sx=c+.5+(r2.x-.5)*.5+.12*sin(y*9.+c)+.06*sin(y*23.); vec2 e=vec2((x-sx)/n,q.y-y); float rad=(.010+.014*r2.y)*(1.-ss(.80,.97,p)); e.y*=e.y>0.?.62:1.; float a=rad*rad-dot(e,e); h=max(h,a>0.?sqrt(a):0.); float tx=c+.5+(r2.x-.5)*.5+.12*sin(q.y*9.+c)+.06*sin(q.y*23.); float above=q.y-y; if(above>0.&&above<.55){ float cell=q.y*64.; vec2 b=hash22(vec2(floor(cell),c+seed)); float rr=.0048*b.x*b.x*(1.-above/.55)*(1.-ss(.7,.92,p)); vec2 g=vec2((x-tx)/n+(b.y-.5)*.006,(fract(cell)-.5)/64.); float z=rr*rr*1.6-dot(g,g); h=max(h,z>0.?sqrt(z):0.); h=max(h,.0016*ss(rad*.62,0.,abs(x-tx)/n)*ss(.28,0.,above)); } } return h*1.35; }
    void main(){ vec2 q=vUv*vec2(uAsp,1.); float a=lip(q), d=p>.36?drain(q):-1.; float s=0.,w=0.; if(a>-.02&&d<.05) s=sheet(q,a,d)*.085; if(p>.40&&d>-.05){ w=rivulets(q,d)*.11; w=max(w,sliders(q,11.,3.,d)); w=max(w,beads(q,17.,1.,d,.42)); w=max(w,beads(q,38.,4.,d,.45)); w=max(w,beads(q,84.,8.,d,.62)); } o=vec4(s,w,a,d); }`,
        { p: 0, uAsp: 1 },
      ),
      a = t.pass(
        Sn +
          Fe +
          `
    uniform sampler2D tA,tB,mA,mB,tH; uniform float p,uAsp;
    float ss(float a,float b,float x){ return smoothstep(a,b,x); }
    vec2 worley(vec2 x){ vec2 n=floor(x), f=fract(x); float d1=9., d2=9.; for(int j=-1;j<=1;j++)for(int i=-1;i<=1;i++){ vec2 g=vec2(i,j); vec2 o2=.15+.7*hash22(n+g); float d=dot(g+o2-f,g+o2-f); if(d<d1){ d2=d1; d1=d; } else if(d<d2) d2=d; } return sqrt(vec2(d1,d2)); }
    void main(){ vec2 q=vUv*vec2(uAsp,1.); vec4 h4=texture(tH,vUv); float a=h4.z, d=h4.w; bool dryA=a<-.012&&p<.4, gone=p>.985; if(dryA){ float sh=exp((a+.012)*16.); vec3 c=toLin(clamp(texture(tA,vUv).rgb,0.,1.)); if(sh<.004){ o=texture(tA,vUv); return; } c*=1.-.30*sh*ss(0.,.08,p); o=vec4(toSrgb(c),1.); return; } if(gone){ o=texture(tB,vUv); return; }
      vec2 tx=1./vec2(textureSize(tH,0)); float e=tx.y; vec2 hl=texture(tH,vUv-vec2(tx.x,0.)).xy, hr=texture(tH,vUv+vec2(tx.x,0.)).xy, hd=texture(tH,vUv-vec2(0.,tx.y)).xy, hu=texture(tH,vUv+vec2(0.,tx.y)).xy; vec3 h0=vec3(h4.xy,h4.x+h4.y); vec2 sm=hl+hr+hd+hu; if(h0.z<=0.&&sm.x+sm.y<=0.&&p>.4){ o=texture(tB,vUv); return; }
      vec2 gs=vec2(hr.x-hl.x,hu.x-hd.x)/(2.*e), gw=vec2(hr.y-hl.y,hu.y-hd.y)/(2.*e); vec2 g=gs+gw; float isW=ss(0.,.0012,h0.y); 
      vec3 n=normalize(vec3(-g*vec2(1.),1.)); float thick=clamp(h0.x/.085,0.,2.);
      // refraction: the sheet bends and softens; a drop turns the world over
      vec2 off=-gs*.055*clamp(.5+thick,0.,1.6)-clamp(gw,-2.5,2.5)*.085*isW; off=clamp(off,-.35,.35); vec2 uv=vUv+off/vec2(uAsp,1.); uv=abs(uv); uv=1.-abs(1.-uv); float lod=clamp(thick*1.5+length(gs)*1.4-.4,0.,4.5); 
      float sw=ss(.36,.44,p+.02*(vnoise(q*4.)-.5)); vec3 ca=p<.46?vec3(textureLod(mA,uv-.0025*n.xy,lod).r,textureLod(mA,uv,lod).g,textureLod(mA,uv+.0025*n.xy,lod).b):vec3(0.); vec3 cb=p>.34?vec3(textureLod(mB,uv-.0025*n.xy,lod).r,textureLod(mB,uv,lod).g,textureLod(mB,uv+.0025*n.xy,lod).b):vec3(0.); vec3 c=mix(ca,cb,sw);
      // body of the water
      float depth=thick*ss(0.,.3,a)*ss(.03,-.25,d); float murk=ss(.18,.36,p)*(1.-ss(.45,.66,p)); vec3 ab=exp(-depth*vec3(1.25,.36,.30)*(.55+1.6*murk)); vec3 sc=mix(vec3(.010,.10,.125),vec3(.06,.30,.33),ss(.2,1.1,thick+n.y*.6)); c=c*ab+sc*(1.-ab.g)*mix(1.4,.92,murk); vec3 body=mix(vec3(.012,.085,.105),vec3(.07,.33,.36),ss(.15,1.15,thick+n.y*.7+.35*(vnoise(q*6.+vec2(0.,-p*3.))-.5))); float bw=fbm(vec2(q.x*1.6+1.4*vnoise(q*2.6+p*2.),q.y*5.2-p*(p<.4?3.:-3.))); body*=.55+.95*bw+.5*dot(n,normalize(vec3(-.35,.75,.2))); c=mix(c,body,.72*murk*ss(.0,.5,depth));
      // light on it: sky at the top, a soft key
      vec3 L=normalize(vec3(-.35,.75,.55)), hv=normalize(L+vec3(0.,0.,1.)); float fr=pow(1.-n.z,3.5); vec3 sky=mix(vec3(.25,.42,.5),vec3(.95,1.,1.),ss(-.3,.9,n.y)); c=mix(c,sky,clamp(fr*.75,0.,.6)*(isW>0.?.75:1.)); float sp=pow(max(dot(n,hv),0.),isW>.5?90.:140.); c+=vec3(1.,.99,.96)*sp*(isW>.5?.85:.55*ss(0.,.3,thick)); 
      // drops: dark upper rim, bright lower crescent
      if(isW>0.){ float rim=ss(.45,1.6,length(gw)); c*=1.-.50*rim*ss(-.2,.9,n.y)*isW; c+=isW*rim*ss(.1,.9,-n.y)*vec3(.16,.18,.19); }
      // foam
      float foam=0.; if(d<.06&&a>-.02&&p<.84){ vec2 fq=q+vec2(-p*.55,p<.4?-p*1.1:(p-.4)*1.5); vec2 wq=fq+.16*vec2(fbm(fq*3.1),fbm(fq*3.1+9.))+.028*vec2(vnoise(fq*19.),vnoise(fq*19.+4.)); float ht=ss(.28,.66,fbm(fq*4.7+11.)); vec2 w1=worley(wq*13.), w2=worley(wq*31.+3.), w3=worley(wq*70.); float lace=ss(.03+.26*ht,.0,w1.y-w1.x)*.8+ss(.05+.34*ht,.0,w2.y-w2.x)*.75*(.35+.65*ht); float fizz=ss(.46,.16,w3.x)*.75*(.3+.7*ht)+ss(.3,.05,w2.x)*.3; float pat=fbm(fq*vec2(3.4,4.2)+2.); float nearLip=exp(-max(a,0.)*9.), trail=exp(-max(a,0.)*2.0); float edgeD=exp(-abs(d+.05)*15.)*ss(.42,.5,p)*(1.-ss(.66,.82,p)); float amt=nearLip*1.35+trail*.75*ss(.35,.65,pat)+murk*.95*ss(.42,.68,pat)+edgeD*.55*ss(.35,.6,pat); amt*=ss(-.012,.02,a)*ss(.03,-.03,d); float brk=.35+1.1*ss(.3,.62,fbm(fq*9.)); foam=clamp(amt*(.25+lace*brk+fizz*brk)-.18,0.,1.); foam=max(foam,ss(.035,.0,a)*ss(-.012,.004,a)*(.55+.45*fizz)*.9); float fs=.70+.30*clamp(vnoise(fq*30.)+.6*n.y+.25*w2.x,0.,1.); c=mix(c,vec3(.90,.945,.955)*fs,foam*.96); }
      // spray thrown ahead of the lip is part of the front itself
      float cover=ss(-.012,.0,a); vec3 base=toLin(clamp((p<.4?texture(tA,vUv):texture(tB,vUv)).rgb,0.,1.)); float wet=p<.4?cover:clamp(ss(0.,.0010,h0.z),0.,1.); wet=max(wet,foam); c=mix(base,c,wet*(1.-ss(.955,.985,p))); o=vec4(toSrgb(min(c,vec3(1.))),1.); }`,
        { tA: null, tB: null, mA: null, mB: null, tH: o.texture, p: 0, uAsp: 1 },
      );
    return {
      render({ A: r, B: l, p: c, out: u }) {
        if (c <= 0) return t.copy(r, u);
        if (c >= 1) return t.copy(l, u);
        let f = a.u;
        ((f.mA.value = c < 0.5 ? e.update(r) : e.texture),
          (f.mB.value = c > 0.3 ? n.update(l) : n.texture),
          (f.tA.value = r.texture),
          (f.tB.value = l.texture),
          (f.p.value = c),
          (f.uAsp.value = t.aspect),
          (s.u.p.value = c),
          (s.u.uAsp.value = t.aspect),
          s.render(o),
          a.render(u));
      },
    };
  },
};

var Jb = 2.6,
  p2 = 12,
  m2 =
    Bn +
    `
uniform vec2 uGrid; uniform float uT;
float tileStart(vec2 id){ vec2 c=(id+.5)/uGrid; float d=(c.x*1.1+(1.-c.y)*.9)/2.; float h=hash12(id+3.7); return .17+d*1.30+h*.16+.05*sin(c.x*9.+c.y*5.); }
int tileN(vec2 id){ return hash12(id+17.3)>.62?3:2; }
float flipDur(int k,int n){ return k==n-1?.34:(k==0?.22:.19); }
// returns x = flip index (-1 before, n after), y = angle 0..pi, z = seconds since the last flip landed (or until the first starts, negative)
vec3 tileState(vec2 id){ float t=uT-tileStart(id); int n=tileN(id); if(t<=0.) return vec3(-1.,0.,t); for(int k=0;k<n;k++){ float d=flipDur(k,n); if(t<d){ float x=t/d, a; if(k==n-1){ x=t/(d*.62); if(x<1.) a=x*x*(1.35-.35*x); else { float y=(t-d*.62)/(d*.38); a=1.-.085*sin(y*3.14159)*(1.-y); } } else a=pow(x,1.75); return vec3(float(k),a*3.14159265,0.); } t-=d; } return vec3(float(n),0.,t); }
`,
  Qb =
    Sn +
    `
uniform sampler2D tA,tB; 
vec3 slide(vec2 f,vec2 id){ float h=hash12(id+8.1); vec3 c=vec3(.872,.868,.858); float px=.02; float tl=step(abs(f.x-.36),.24)*step(abs(f.y-.80),.035); float b=0.; for(int i=0;i<4;i++){ float y=.60-float(i)*.13; float w=.16+.2*hash12(id+float(i)*3.1); b+=step(abs(f.x-.14-w),w)*step(abs(f.y-y),.017)+step(length((f-vec2(.10,y))*vec2(1.78,1.)),.02); } float box=step(abs(f.x-.74),.15)*step(abs(f.y-.38),.2); if(h<.34) c*=1.-.62*tl-.36*min(b,1.); else if(h<.6) c*=1.-.62*tl-.36*min(b*step(f.x,.55),1.)-.2*box; else if(h<.72) c*=1.-.55*step(abs(f.x-.5),.3)*step(abs(f.y-.52),.04); return c; }
// face k of tile id at tile coords f, linear light
vec3 face(int k,vec2 f,vec2 id){ int n=tileN(id); vec2 uv=(id+f)/uGrid; if(k<=0) return toLin(clamp(textureLod(tA,uv,0.).rgb,0.,1.)); if(k>=n) return toLin(clamp(textureLod(tB,uv,0.).rgb,0.,1.)); if(k==1) return slide(f,id); vec2 sh=floor(hash22(id+float(k))*vec2(uGrid)); vec2 j=mod(id+sh,uGrid); return toLin(clamp(textureLod(tA,(j+f)/uGrid,0.).rgb,0.,1.))*1.0; }
`,
  c6 =
    "precision highp float; precision highp int; in vec2 position; out vec2 vF; flat out vec2 vId; flat out vec3 vSt; uniform float uAsp; " +
    m2 +
    `
void main(){ int c=int(uGrid.x); vec2 id=vec2(float(gl_InstanceID%c),float(gl_InstanceID/c)); vec3 st=tileState(id); vId=id; vSt=st; if(st.x<-.5||st.x>float(tileN(id))-.5){ gl_Position=vec4(2.,2.,2.,1.); return; }
 vF=vec2(position.x,.5+position.y*.5); vec2 ctr=((id+vec2(position.x,.5))/uGrid*2.-1.)*vec2(uAsp,1.); float hh=1./uGrid.y; float y=position.y*hh*1.0; float th=st.y; vec3 w=vec3(ctr.x,ctr.y+y*cos(th),y*sin(th)); const float D=2.1; float k=(D-w.z)/D; gl_Position=vec4(w.x/uAsp,w.y,(.5-w.z)*k*.5,k); }`,
  u6 =
    "precision highp float; precision highp int; precision highp sampler2D; in vec2 vF; flat in vec2 vId; flat in vec3 vSt; out vec4 o; uniform vec2 uRes; " +
    m2 +
    Qb +
    `
void main(){ float th=vSt.y; int k=int(vSt.x+.5); float s=sin(th),c=cos(th); bool front=th<1.5708; vec3 col; float e; float d=(vF.y-.5)*2.; // 0 at hinge, 1 at tip
 vec2 tp=uRes/uGrid; float gx=min(vF.x,1.-vF.x)*tp.x; if(gx<.9) discard;
 // which side faces us in perspective
 front=gl_FrontFacing;
 if(front){ col=face(k,vF,vId); float l=.8*c-.6*s; e=.30+.70*max(l,0.)/.8; e*=1.-.18*s*(1.-d); } else { col=face(k+1,vec2(vF.x,1.-vF.y),vId); float l=.6*s-.8*c; e=.30+.70*max(l,0.)/.8; float sp=smoothstep(.12,.0,abs(th-2.25)); e=mix(1.,e,s); col+=vec3(.05)*sp*s; }
 float tip=smoothstep(2.2,.6,(1.-d)*tp.y*.5); col=mix(col,col*.55+vec3(.16),tip*s*.8); 
 o=vec4(toSrgb(min(col*e,vec3(1.))),1.); }`,
  tw = {
    dur: Jb,
    create(i) {
      let { gfx: t } = i,
        e = {
          uGrid: { value: new Nt() },
          uT: { value: 0 },
          uAsp: { value: 1 },
          tA: { value: null },
          tB: { value: null },
          uRes: { value: new Nt() },
        },
        n = Rc(i),
        o = new In(),
        s = new ge(),
        a = new ce({
          glslVersion: re,
          depthTest: !1,
          depthWrite: !1,
          uniforms: e,
          vertexShader:
            "precision highp float; in vec2 position; out vec2 vUv; void main(){ vUv=position; gl_Position=vec4(position*2.-1.,.999,1.); }",
          fragmentShader:
            "precision highp float; precision highp int; precision highp sampler2D; in vec2 vUv; out vec4 o; uniform vec2 uRes; " +
            m2 +
            Qb +
            `
    void main(){ vec2 g=vUv*uGrid, id=min(floor(g),uGrid-1.), f=g-id; vec3 st=tileState(id); int n=tileN(id); 
     float gap=st.x<-.5?smoothstep(-.10,0.,st.z):st.x>float(n)-.5?1.-smoothstep(.0,.15,st.z):1.; vec2 tp=uRes/uGrid; 
     if(st.x<-.5&&gap<=0.){ o=texture(tA,vUv); return; } if(st.x>float(n)-.5&&gap<=0.){ o=texture(tB,vUv); return; }
     vec2 e=min(f,1.-f)*tp; float line=smoothstep(.1,1.1,min(e.x,e.y)-.25); float mid=smoothstep(.2,.9,abs(f.y-.5)*tp.y); 
     vec3 c; float sh=1.; if(st.x<-.5) c=face(0,f,id); else if(st.x>float(n)-.5) c=face(n,f,id); else { int k=int(st.x+.5); float th=st.y, s=sin(th), q=cos(th); bool top=f.y>.5; float d=abs(f.y-.5)*2.; 
        if(top){ c=face(k+1,f,id); float open=smoothstep(.0,1.35,th); sh=mix(.22,1.,open)*(1.-.35*(1.-smoothstep(1.4,3.1,th))*exp(-d*3.)); }
        else { c=face(k,f,id); float len=s*.95+max(-q,0.)*1.05; float soft=.10+.22*s; float shade=1.-smoothstep(len-soft,len+soft*.6,d); sh=1.-.62*shade*smoothstep(.05,.8,th); } }
     c*=sh; c*=mix(1.,mix(.10,1.,line),gap); c*=mix(1.,mix(.55,1.,mid),gap); o=vec4(toSrgb(c),1.); }`,
        }),
        r = new Qt();
      (r.setAttribute("position", new $t(new Float32Array([0, 0, 2, 0, 0, 2]), 2)),
        (r.boundingSphere = new Be(new F(), 1e6)));
      let l = new Zt(r, a);
      ((l.frustumCulled = !1), (l.renderOrder = 0), s.add(l));
      let c = new Oe();
      (c.setAttribute("position", new $t(new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), 2)),
        c.setIndex([0, 1, 2, 0, 2, 3]),
        (c.boundingSphere = new Be(new F(), 1e6)));
      let u = new Zt(
        c,
        new ce({ glslVersion: re, vertexShader: c6, fragmentShader: u6, uniforms: e, side: oe }),
      );
      return (
        (u.frustumCulled = !1),
        (u.renderOrder = 1),
        s.add(u),
        {
          render({ A: f, B: h, p: d, out: p }) {
            if (d <= 0) return t.copy(f, p);
            if (d >= 1) return t.copy(h, p);
            (e.uGrid.value.set(Math.max(4, Math.round((t.aspect * p2) / (16 / 9))), p2),
              (c.instanceCount = e.uGrid.value.x * p2),
              (e.uT.value = d * Jb),
              (e.uAsp.value = t.aspect),
              (e.tA.value = f.texture),
              (e.tB.value = h.texture),
              e.uRes.value.set(n.width, n.height),
              t.draw(s, o, n),
              t.copy(n, p));
          },
        }
      );
    },
  };

var ew = 1.9,
  nw = 0.285,
  iw = {
    dur: ew,
    create(i) {
      let { gfx: t } = i,
        e = new Se(),
        n = t.pass(
          Sn +
            Fe +
            `
    uniform sampler2D tA,tB; uniform float uK,uTau,uAsp,uRing,uDust,uEnd; uniform vec2 uC,uShake; uniform float uRot,uZoom; uniform mat3 uH; uniform float uFace;
    vec3 paperTone(vec2 p){ float f=fbm(p*vec2(70.,64.))-.5, g=vnoise(p*430.)-.5, m=fbm(p*3.)-.5; return vec3(.848,.838,.812)*(1.+f*.045+g*.03+m*.03); }
    float fibre(vec2 q,float n,float seed,float tau,float px){ float r=length(q), a=atan(q.y,q.x); float u=(a/6.28318+.5)*n; float acc=0.; for(int j=-1;j<=1;j++){ float id=mod(floor(u)+float(j),n); vec2 h=hash22(vec2(id,seed)), h2=hash22(vec2(id+40.,seed*3.)); float rr=.05+(.25+1.25*h.x)*(1.-exp(-tau*(2.2+2.*h2.y))); float an=((id+.2+.6*h.y)/n-.5)*6.28318+(h2.x-.5)*.25*tau; vec2 c=rr*vec2(cos(an),sin(an)); vec2 d=q-c; float ro=an+(h2.y-.5)*3.+tau*(h.y-.5)*16.; d=mat2(cos(ro),sin(ro),-sin(ro),cos(ro))*d; float len=.006+.020*h2.x*h2.x; d.y+=d.x*d.x*(h.x-.5)*50.; float w=.0011+.0008*h2.y; float s=smoothstep(w+px,w-px*.4,abs(d.y))*smoothstep(len,len*.6,abs(d.x)); acc=max(acc,s*(.4+.6*h.y)); } return acc; }
    void main(){ vec2 asp=vec2(uAsp,1.); 
      if(uTau<0.){ // ---- the last moment before contact ----
        vec2 d=vUv-uC; float z=1.+.16*uK*uK+.62*uK*uK*uK*uK; float blur=.16*uK*uK*uK; vec3 c=vec3(0.); float j=hash12(gl_FragCoord.xy); if(uK<.02){ c=toLin(clamp(texture(tA,uC+d/z).rgb,0.,1.)); } else { for(int i=0;i<10;i++){ float f=(float(i)+j)/10.-.5; c+=toLin(clamp(texture(tA,uC+d/(z*(1.+blur*f))).rgb,0.,1.)); } c*=.1; }
        // air and light are squeezed out: the gap darkens from the rim inward, the face swallows it
        float rim=smoothstep(.25,.75,length(d*vec2(1.,.8))); float occ=1.-.60*sm5(uK)*rim;
        vec3 q=uH*vec3(vUv*2.-1.,1.); vec2 uv=q.xy/q.z; vec2 e2=min(uv,1.-uv)*vec2(uAsp,1.); float e=min(e2.x,e2.y); float soft=.004+.05*uK; float face=q.z>0.?smoothstep(-soft,soft,e):0.; float sh=q.z>0.?exp(-max(-e,0.)*(14.-6.*uK)):0.; 
        c*=occ*(1.-.62*sh*uFace*uK); vec3 av=vec3(0.); for(int i=0;i<5;i++){ av+=toLin(clamp(textureLod(tA,vec2(.5+.11*float(i-2),.5+.05*float((i*2)%5-2)),0.).rgb,0.,1.)); } av/=5.; vec3 hue=clamp(av/max(luma(av),.12),.75,1.3); vec3 pt=paperTone((vUv-uC)*asp*(1.5-.5*uK))*(1.-.10*(1.-uK)); pt*=mix(hue,vec3(1.),.35+.65*smoothstep(.5,1.,uK)); pt*=mix(clamp(luma(av)/.84,.72,1.02),1.,smoothstep(.55,1.,uK)); pt*=1.-.16*rim*uK; pt*=.94+.06*smoothstep(0.,.3,e); c=mix(c,pt,face*uFace); o=vec4(toSrgb(c),1.); return; }
      // ---- printed ----
      vec2 d0=(vUv-.5)*asp; float cr=cos(uRot), sr=sin(uRot); d0=mat2(cr,sr,-sr,cr)*d0/uZoom; vec2 uv=d0/asp+.5+uShake; vec2 q=(uv-uC)*asp; float r=length(q); vec2 dir=q/max(r,1e-4);
      float x=r-uRing; float amp=exp(-uTau*2.6); float env=exp(-x*x*38.)*amp; float wob=sin(x*34.)*env; float g=(cos(x*34.)*34.-2.*38.*x*sin(x*34.))*env/34.; vec2 off=dir*g*.0085; vec2 bu=uv-off/asp;
      vec3 b=toLin(clamp(texture(tB,clamp(bu,0.,1.)).rgb,0.,1.)); vec3 pt=paperTone(q);
      // pressure arrives as a front, unevenly: the tooth of the paper takes the ink first
      float front=uDust; float n=fbm(q*9.)*.5+vnoise(q*120.)*.22+vnoise(q*330.)*.28; float age=(front-r)*2.1+.55; float press=smoothstep(n-.10,n+.34,age-.12); press=mix(press,1.,uEnd); float lb=luma(b); float ink=1.-lb;
      float take=mix(press,smoothstep(.0,.7,press),ink); vec3 c=mix(pt,b,take);
      // wet squeeze: a darker rim round the type, a bite of relief, both dry away
      float fresh=press*(1.-smoothstep(.55,2.1,age))*(1.-uEnd); vec2 px=1.4/uRes; float lx=luma(texture(tB,clamp(bu+vec2(px.x,0.),0.,1.)).rgb)-luma(texture(tB,clamp(bu-vec2(px.x,0.),0.,1.)).rgb), ly=luma(texture(tB,clamp(bu+vec2(0.,px.y),0.,1.)).rgb)-luma(texture(tB,clamp(bu-vec2(0.,px.y),0.,1.)).rgb);
      c*=1.+fresh*.30*(lx*.6-ly); c*=1.-.10*fresh*(1.-n);
      // the ripple runs through the sheet
      c*=1.+dot(dir,normalize(vec2(-.5,.85)))*g*.16+wob*.03; c*=1.-.10*exp(-uTau*5.)*smoothstep(.2,1.2,r);
      // one ring of dust, and fibres
      float dr=.16+1.5*(1.-exp(-uTau*2.4)); float a=atan(q.y,q.x); vec2 pol=vec2(cos(a),sin(a))*2.2; float dx=(r-dr)/(.10+.34*uTau); float re=exp(-dx*dx*(dx>0.?3.2:1.1))*exp(-uTau*2.7)*(1.-uEnd); if(re>.006){ float dn=fbm(vec3(pol*1.6,r*5.-uTau*3.5))*.65+fbm(vec3(pol*5.,r*13.-uTau*5.))*.35; float ring=re*smoothstep(.30,.72,dn); c=mix(c,vec3(.36,.335,.30)*(.7+.7*dn),clamp(ring*.85,0.,.8)); }
      float fade=exp(-uTau*1.5)*(1.-smoothstep(.75,1.1,uTau)); if(fade>.01){ float pxr=1.2/uRes.y; float s1=fibre(q,61.,3.,uTau,pxr), s2=fibre(q,37.,11.,uTau*.8,pxr); vec2 so=vec2(.006,-.012)*(1.+uTau); float shd=max(fibre(q+so,61.,3.,uTau,pxr*4.),fibre(q+so,37.,11.,uTau*.8,pxr*4.)); c*=1.-.38*shd*fade; c=mix(c,vec3(.50,.48,.45),max(s1,s2)*fade*.95); }
      if(uEnd>=1.){ o=vec4(texture(tB,vUv).rgb,1.); return; } o=vec4(toSrgb(c),1.); }`.replace(
              "void main(){ vec2 asp",
              "float sm5(float t){return t*t*t*(t*(t*6.-15.)+10.);} void main(){ vec2 asp",
            ),
          {
            tA: null,
            tB: null,
            uK: 0,
            uTau: -1,
            uAsp: 1,
            uRing: 0,
            uDust: 0,
            uEnd: 0,
            uC: new Nt(0.5, 0.46),
            uShake: new Nt(),
            uRot: 0,
            uZoom: 1,
            uH: e,
            uFace: 0,
          },
        );
      return {
        render({ A: o, B: s, p: a, out: r }) {
          if (a <= 0) return t.copy(o, r);
          if (a >= 1) return t.copy(s, r);
          let l = n.u,
            c = we(a, 0, nw),
            u = (a - nw) * ew;
          if (
            ((l.tA.value = o.texture),
            (l.tB.value = s.texture),
            (l.uK.value = c),
            (l.uTau.value = u),
            (l.uAsp.value = t.aspect),
            u < 0)
          ) {
            let f = 0.93 + 0.75 * c * c * c,
              h = (1 - c) * 0.16,
              d = 0,
              p = -0.04;
            (h2(
              [
                [d - f * (1 + h), p + f * 1.02],
                [d + f * (1 + h), p + f * 1.02],
                [d + f * (1 - h), p - f],
                [d - f * (1 - h), p - f],
              ],
              e,
            ),
              (l.uFace.value = ke(we(c, 0.42, 1))));
          } else {
            let f = Math.exp(-u * 6.5),
              h = u * 34;
            (l.uShake.value.set(Math.sin(h * 1 + 0.4) * 0.0085 * f, Math.cos(h * 1.27) * 0.016 * f),
              (l.uRot.value = Math.sin(h * 0.9 + 1) * 0.007 * f),
              (l.uZoom.value = 1 + 0.035 * Math.exp(-u * 9) * Math.cos(u * 26) + 0.004 * f),
              (l.uRing.value = 0.06 + 1.75 * (1 - Math.exp(-u * 2.3))),
              (l.uDust.value = 2.9 * (1 - Math.exp(-u * 2.6)) - 0.42),
              (l.uEnd.value = ke(na((a - 0.86) / 0.125))));
          }
          n.render(r);
        },
      };
    },
  };

var K0 = 34,
  ow = 20,
  sw = {
    dur: 3.4,
    create(i) {
      let { gfx: t } = i,
        e = ia(i, 0),
        n = ia(i, 1),
        o = t.target({ scale: 0.5 }),
        s = t.target({ scale: 0.5 }),
        a = t.target({ scale: 0.5 }),
        r = t.target({ scale: 0.5 }),
        l = t.pass(
          Fe +
            "uniform sampler2D tM; uniform float uR,uAsp,uHi,uExp; uniform vec2 uDrift; void main(){ float j=hash12(gl_FragCoord.xy)*6.2831; float sy=float(textureSize(tM,0).y); float lod=max(0.,log2(uR*sy/4.6)); vec3 s=vec3(0.); float w=0.; vec2 fc=(vUv-.5); float cat=clamp(length(fc*vec2(1.,.8))*1.15,0.,.75); vec2 cd=normalize(fc+1e-5); for(int i=0;i<40;i++){ float f=(float(i)+.5)/40.; float a=float(i)*2.399963+j; vec2 d=vec2(cos(a),sin(a))*sqrt(f); d-=cd*dot(d,cd)*cat*.45; vec3 c=textureLod(tM,vUv+uDrift+d*uR*vec2(1./uAsp,1.),lod).rgb; float l=dot(c,vec3(.2126,.7152,.0722)); float k=1.+uHi*l*l*l+.0*f; c*=1.+uExp*l*l; s+=c*k; w+=k; } o=vec4(s/w,1.); }",
          { tM: null, uR: 0, uAsp: 1, uHi: 0, uExp: 0, uDrift: new Nt() },
        ),
        c = t.pass(
          "uniform sampler2D tM; uniform float uR,uAsp; void main(){ vec3 s=texture(tM,vUv).rgb; float w=1.; for(int i=0;i<12;i++){ float f=(float(i)+.5)/12.; float a=float(i)*2.399963; s+=texture(tM,vUv+vec2(cos(a),sin(a))*sqrt(f)*uR*vec2(1./uAsp,1.)).rgb; w+=1.; } o=vec4(s/w,1.); }",
          { tM: null, uR: 0, uAsp: 1 },
        ),
        u = (m, g, b, y, S, M) => {
          let w = l.u;
          ((w.tM.value = m),
            (w.uR.value = g),
            (w.uAsp.value = t.aspect),
            (w.uHi.value = b),
            (w.uExp.value = y),
            w.uDrift.value.set(S, 0),
            l.render(o),
            (c.u.tM.value = o.texture),
            (c.u.uR.value = g * 0.24),
            (c.u.uAsp.value = t.aspect),
            c.render(M));
        },
        f = { tM: { value: null }, p: { value: 0 }, uAsp: { value: 1 }, uTime: { value: 0 } },
        h = new ge(),
        d = new In(),
        p = new Oe();
      (p.setAttribute("position", new $t(new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1]), 2)),
        p.setIndex([0, 1, 2, 0, 2, 3]),
        (p.instanceCount = K0 * ow),
        (p.boundingSphere = new Be(new F(), 1e6)));
      let x = new Zt(
        p,
        new ce({
          glslVersion: re,
          uniforms: f,
          transparent: !0,
          depthTest: !1,
          depthWrite: !1,
          blending: Ie,
          blendSrc: pe,
          blendDst: pe,
          blendSrcAlpha: pe,
          blendDstAlpha: pe,
          vertexShader:
            "precision highp float; precision highp int; precision highp sampler2D; in vec2 position; out vec2 vQ; flat out vec3 vC; flat out float vSoft; flat out vec2 vCat; uniform sampler2D tM; uniform float p,uAsp,uTime; " +
            Fe +
            `
    float ss(float a,float b,float x){ return smoothstep(a,b,x); }
    void main(){ float i=float(gl_InstanceID); vec2 id=vec2(mod(i,${K0}.),floor(i/${K0}.)); vec2 h=hash22(id+1.), h2=hash22(id+51.); vec2 c=(id+.5+(h-.5)*1.1)/vec2(${K0}.,${ow}.); vec3 col=textureLod(tM,c,4.2).rgb; float l=dot(col,vec3(.2126,.7152,.0722)); vec3 far=textureLod(tM,c,6.6).rgb; float lf=dot(far,vec3(.2126,.7152,.0722)); float keep=ss(.03,.42,(l-.62*lf)*1.15+.16*(h2.x-.5))*step(.34,fract(h.x*7.+h2.y*3.)); float big=step(.80,h2.y)*ss(.25,.8,l); 
     float on=ss(.10+.10*h.x,.34+.10*h.x,p), off=1.-ss(.70+.10*h2.y,.92+.06*h2.x,p); float shrink=ss(.34+.08*h.y,.84+.10*h2.x,p); float R=mix(.020+.034*h2.y+.050*big,.0015+.0011*h.x,shrink)*mix(.25,1.,ss(.08,.36,p)); 
     vec2 dr=vec2((h.x-.5)*.16+.10*sin(p*5.+h2.x*6.28)*.5,(h.y-.35)*.22)*ss(.05,1.,p)+vec2(.015*sin(uTime*.4+h.x*6.),.015*cos(uTime*.33+h.y*6.)); vec2 q=(c*2.-1.)*vec2(uAsp,1.); q*=1.+.22*ss(.1,1.,p)*(.4+h2.y); q+=dr*2.; 
     float area=pow(.030/max(R,.0012),.70); float a=keep*on*off*mix(.62,.30,shrink)*min(area,5.5); vec3 tint=mix(max(mix(vec3(l),col,2.3),0.)/max(l,.05)*.5,mix(vec3(1.,.72,.42),vec3(.75,.86,1.),h2.x),shrink*.75); vC=tint*a*(.45+.8*h2.y); vQ=position; vSoft=clamp(2.2/(R*1080.*.25),.03,1.); vec2 cd=q/vec2(uAsp,1.); float cat=min(.42,length(cd)*.34)*(1.-shrink); vec2 n=normalize(cd+1e-5); vec2 P=position*R; P-=n*dot(P,n)*cat; if(a<.0005){ gl_Position=vec4(2.); return; } gl_Position=vec4((q+P*1.06)/vec2(uAsp,1.),0.,1.); vCat=n*cat; }`,
          fragmentShader:
            "precision highp float; in vec2 vQ; flat in vec3 vC; flat in float vSoft; flat in vec2 vCat; out vec4 o; void main(){ float r=length(vQ)*1.06; float d=1.-smoothstep(1.-vSoft,1.,r); float ring=.82+.30*smoothstep(.62,.95,r)*(1.-vSoft); float onion=1.+.03*sin(r*26.); float core=mix(1.,exp(-r*r*3.)*2.2,smoothstep(.35,.9,vSoft)); o=vec4(vC*d*ring*onion*core,0.); }",
        }),
      );
      ((x.frustumCulled = !1), h.add(x));
      let v = t.pass(
        Sn +
          Fe +
          `uniform sampler2D tA,tB,mA,mB,hA,hB,tS; uniform float p,uAsp,uRA,uRB,uWA,uWB,uGlow,uExpA;
    float ss(float a,float b,float x){ return smoothstep(a,b,x); }
    vec3 glow(vec2 uv){ vec3 s=vec3(0.); float w=0.; for(int i=-4;i<=4;i++){ float f=float(i)/4.; float k=exp(-f*f*2.2); vec3 c=textureLod(mA,uv+vec2(f*.30/uAsp*1.78,0.),5.5).rgb; float l=dot(c,vec3(.3,.55,.15)); s+=c*l*l*k; c=textureLod(mA,uv+vec2(f*.10,f*.07),4.5).rgb; l=dot(c,vec3(.3,.55,.15)); s+=c*l*l*l*k*1.1; w+=k; } return s/w; }
    void main(){ vec3 c=vec3(0.); float n=hash12(gl_FragCoord.xy)-.5;
      if(uWA>0.){ vec3 s=toLin(clamp(texture(tA,vUv).rgb,0.,1.)); vec3 b=texture(hA,vUv).rgb; vec3 a=mix(s,b,ss(.0012,.0045,uRA)); c+=a*uWA*uExpA; }
      if(uWB>0.){ vec3 s=toLin(clamp(texture(tB,vUv).rgb,0.,1.)); vec3 b=texture(hB,vUv).rgb; vec3 a=mix(s,b,ss(.0012,.0045,uRB)); c+=a*uWB; }
      if(uGlow>0.){ vec3 g=glow(vUv+vec2(0.,-.01*p)); g+=.55*textureLod(mA,vUv,6.5).rgb*vec3(1.05,.95,.85); float br=.75+.25*fbm(vec2(vUv.x*2.+p,vUv.y*5.)); c+=g*uGlow*br*vec3(1.06,.94,.78); }
      vec3 sp=texture(tS,vUv).rgb; c+=sp; 
      float k=ss(0.,.12,p)*(1.-ss(.86,.985,p)); vec3 soft=c/(1.+max(max(c.r,max(c.g,c.b))-.82,0.)); c=mix(c,min(soft,1.),k); c*=1.+n*.02*k; o=vec4(toSrgb(min(c,1.)),1.); }`,
        {
          tA: null,
          tB: null,
          mA: null,
          mB: null,
          hA: s.texture,
          hB: a.texture,
          tS: r.texture,
          p: 0,
          uAsp: 1,
          uRA: 0,
          uRB: 0,
          uWA: 1,
          uWB: 0,
          uGlow: 0,
          uExpA: 1,
        },
      );
      return {
        render({ A: m, B: g, p: b, out: y, time: S }) {
          if (b <= 0.002) return t.copy(m, y);
          if (b >= 0.998) return t.copy(g, y);
          let M = Br(we(b, 0.03, 0.5)),
            w = 1 - Br(we(b, 0.5, 0.985)),
            E = 0.085 * M,
            T = 0.07 * w,
            _ = 1 - ke(we(b, 0.24, 0.64)),
            R = ke(we(b, 0.4, 0.82));
          (b < 0.74 && e.update(m),
            R > 0 && n.update(g),
            _ > 0 && E > 0.001 && u(e.texture, E, 16 * M, 1.2 * M, -0.02 * M, s),
            R > 0 && T > 0.001 && u(n.texture, T, 22 * w, 5 * w, 0.012 * w, a),
            (f.tM.value = e.texture),
            (f.p.value = b),
            (f.uAsp.value = t.aspect),
            (f.uTime.value = S),
            t.draw(h, d, r, { color: 0, alpha: 0 }));
          let L = v.u;
          ((L.tA.value = m.texture),
            (L.tB.value = g.texture),
            (L.mA.value = e.texture),
            (L.mB.value = n.texture),
            (L.p.value = b),
            (L.uAsp.value = t.aspect),
            (L.uRA.value = E),
            (L.uRB.value = T),
            (L.uWA.value = _),
            (L.uWB.value = R),
            (L.uGlow.value = 0.95 * ke(we(b, 0.04, 0.34)) * (1 - ke(we(b, 0.34, 0.7)))),
            (L.uExpA.value = xn(1, 0.55, ke(we(b, 0.2, 0.6)))),
            v.render(y));
        },
      };
    },
  };

var aw = {
  dur: 2.4,
  create(i) {
    let { gfx: t } = i,
      e = () => [t.target({ w: 1280, h: 160 }), t.target({ w: 1280, h: 20 }), t.target({ w: 1280, h: 2 })],
      n = e(),
      o = e(),
      s = t.pass(
        Sn +
          "uniform sampler2D tA; uniform float uN,uLin; void main(){ vec3 s=vec3(0.); float h=1./uN; for(int i=0;i<10;i++){ vec2 u=vec2(vUv.x,vUv.y+((float(i)+.5)/10.-.5)*h); vec3 c=textureLod(tA,u,0.).rgb; s+=uLin>.5?toLin(clamp(c,0.,1.)):c; } o=vec4(s*.1,1.); }",
        { tA: null, uN: 1, uLin: 1 },
      ),
      a = (l, c) => {
        let u = l;
        c.forEach((f, h) => {
          ((s.u.tA.value = u.texture),
            (s.u.uN.value = f.height),
            (s.u.uLin.value = h ? 0 : 1),
            s.render(f),
            (u = f));
        });
      },
      r = t.pass(
        Sn +
          Fe +
          `
    uniform sampler2D tA,tB,a0,a1,a2,b0,b1,b2; uniform float p,uAsp;
    float io(float t){ t=clamp(t,0.,1.); return t<.5?16.*t*t*t*t*t:1.-pow(-2.*t+2.,5.)*.5; }
    float ss(float a,float b,float x){ return smoothstep(a,b,x); }
    // height (0..1) of a column of A / B at progress q
    float sA(float x,float q){ float d=abs(x-.5)*2.; float k=io((q-.015-.13*d-.012*sin(x*40.))/.31); return mix(1.,.0022,k); }
    float sB(float x,float q){ float d=1.-abs(x-.5)*2.; float k=(q-.52-.13*d*d-.02*(vnoise(vec2(x*7.,3.))-.5))/.32; k=clamp(k,0.,1.); k=k*k*k*(k*(k*6.-15.)+10.); return mix(.0022,1.,k); }
    // the string
    float yl(float x,float q){ float a=ss(.10,.40,q)*(1.-ss(.52,.86,q)); float t=q*15.; float w=sin(3.14159*x); return .5+a*w*(.060*sin(3.14159*x)*cos(t*1.0)+.034*sin(6.28318*x+.3)*cos(t*1.9+.6)+.016*sin(3.14159*5.*x)*cos(t*3.1)); }
    vec3 colA(float x,float y,float s,sampler2D t,sampler2D c0,sampler2D c1,sampler2D c2,float px){ vec2 u=vec2(x,y); float m=px/s; // source rows under one pixel, in texture rows of the picture
      vec3 c=toLin(clamp(texture(t,u).rgb,0.,1.)); float l=m; c=mix(c,textureLod(c0,u,0.).rgb,ss(1.3,7.,l)); c=mix(c,textureLod(c1,u,0.).rgb,ss(7.,50.,l)); c=mix(c,textureLod(c2,u,0.).rgb,ss(50.,240.,l)); return c; }
    void main(){ float x=vUv.x; float H=uRes.y; vec3 acc=vec3(0.); 
      float s1=sA(x,p), s2=sB(x,p); float y1=yl(x,p);
      if(p>.9&&s2>=1.){ o=vec4(texture(tB,vUv).rgb,1.); return; } if(p<.1&&s1>=1.){ o=vec4(texture(tA,vUv).rgb,1.); return; }
      float live=0.; float lp=1./H;
      vec3 la=textureLod(a2,vec2(x,.5),0.).rgb, lb=textureLod(b2,vec2(x,.5),0.).rgb; float toB=ss(.44,.60,p+.05*sin(x*9.)); 
      // smear of exposures: the shutter stays open while the column moves
      float j=hash12(gl_FragCoord.xy+floor(p*500.)); const int N=12;
      if(p<.62){ vec3 c=vec3(0.); for(int i=0;i<N;i++){ float f=(float(i)+.5+(j-.5)*.8)/float(N); float q=p-.016*f; float s=sA(x,q), yc=mix(.5,yl(x,q),ss(1.,.4,s)); float y=(vUv.y-yc)/s+.5; float e=min(y,1.-y)*s*H; float cov=clamp(e+.5,0.,1.); if(cov<=0.) continue; float gain=1.+1.6*pow(1.-s,6.)+.25*(1.-s); c+=cov*gain*colA(x,clamp(y,0.,1.),s,tA,a0,a1,a2,1.)/float(N); } acc+=c*(1.-ss(.48,.60,p)); }
      if(p>.46){ vec3 c=vec3(0.); for(int i=0;i<N;i++){ float f=(float(i)+.5+(j-.5)*.8)/float(N); float q=min(1.,p+.0)-.014*f*(1.-ss(.93,.995,p)); float s=sB(x,q), yc=mix(.5,yl(x,q),ss(1.,.4,s)); float y=(vUv.y-yc)/s+.5; float e=min(y,1.-y)*s*H; float cov=clamp(e+.5,0.,1.); if(cov<=0.) continue; float gain=1.+1.6*pow(1.-s,6.)+.25*(1.-s); c+=cov*gain*colA(x,clamp(y,0.,1.),s,tB,b0,b1,b2,1.)/float(N); } acc+=c*ss(.47,.60,p); }
      // the thread itself: a hot core and the glow of everything it holds
      float hold=ss(.16,.44,p)*(1.-ss(.62,.95,p)); vec3 lc=max(mix(la,lb,toB),la*.16*(1.-ss(.75,.97,p))); lc=lc/(max(lc.r,max(lc.g,lc.b))+.06)*pow(luma(lc)+.015,.42); float sl=(yl(x+.002,p)-yl(x-.002,p))/.004/uAsp; float dy=abs(vUv.y-y1)/sqrt(1.+sl*sl); float w=mix(.0050,.0015,ss(.2,.45,p)); float core=1.-ss(w*.55,w*.55+lp*1.6,dy); float h1=exp(-dy*80.)*.62, h2=exp(-dy*15.)*.19, h3=exp(-dy*4.2)*.055; float sweep=.85+.15*sin(x*26.-p*60.)*sin(x*7.+p*31.); acc+=hold*lc*(core*2.3+(h1+h2+h3)*sweep)*1.15; acc+=hold*core*luma(lc)*vec3(.5);
      // phosphor: what the column left behind fades slowly
      float gh=(1.-ss(.0,.34,p-.12*abs(x-.5)))*step(s1,.999); if(gh>0.&&p<.5){ acc+=textureLod(a0,vec2(x,vUv.y),0.).rgb*.10*gh*gh; }
      acc=mix(acc,1.-exp(-acc*1.25),hold*ss(.6,1.2,max(acc.r,max(acc.g,acc.b)))); o=vec4(toSrgb(acc),1.); }`,
        {
          tA: null,
          tB: null,
          a0: n[0].texture,
          a1: n[1].texture,
          a2: n[2].texture,
          b0: o[0].texture,
          b1: o[1].texture,
          b2: o[2].texture,
          p: 0,
          uAsp: 1,
        },
      );
    return {
      render({ A: l, B: c, p: u, out: f }) {
        if (u <= 0) return t.copy(l, f);
        if (u >= 1) return t.copy(c, f);
        (u < 0.64 && a(l, n),
          u > 0.4 && a(c, o),
          (r.u.tA.value = l.texture),
          (r.u.tB.value = c.texture),
          (r.u.p.value = u),
          (r.u.uAsp.value = t.aspect),
          r.render(f));
      },
    };
  },
};

var v2 = 2.8,
  x2 = 120,
  Lh = 96,
  rw = 46,
  g2 = `
uniform float uAsp,uP,uYf,uW2; const float CAM=3.0;
float slow(float y){ return .075*sin(y*2.1+.8)+.034*sin(y*5.3+2.)+.012*sin(y*13.+.5); }
float openAt(float y){ return max(0.,y-uYf); }
// sheet point (X,Y) of half sg (-1 left, 1 right) -> world; phi = how far it has turned
vec3 curl(vec2 P,float sg,out float phi,out float over){ float h=openAt(P.y); float d=(P.x-slow(P.y))*sg; float R=.21+.10*smoothstep(0.,1.6,uW2)+.03*P.y; float w=.36*pow(h,1.5)+uW2*smoothstep(0.,.3,h)*(1.+sg*.045+.10*P.y); float s=w-d; float pull=sg*(.010*smoothstep(0.,.10,h)+.050*h+.02*h*h); float x=P.x, z=0.; phi=0.; over=exp(-max(d-w,0.)/(R*.9))*smoothstep(.15,1.5,w/R);
 if(s>0.){ phi=s/R; float xc=slow(P.y)+sg*w; if(phi<3.14159){ x=xc-sg*R*sin(phi); z=R*(1.-cos(phi)); } else { x=xc+sg*(s-3.14159*R); z=2.*R+.06*(s-3.14159*R); phi=3.14159; } }
 // the freed flap also sags and flutters a little
 z+=.02*sin(P.y*4.+uP*17.+sg)*smoothstep(0.,1.,max(s,0.))*1.5; return vec3(x+pull,P.y-.02*max(s,0.)*smoothstep(.2,1.,h),z); }
vec4 proj(vec3 w){ float k=(CAM-w.z)/CAM; return vec4(w.x/uAsp,w.y,0.,k); }
`,
  f6 = `
float tearFine(float y){ return .022*(fbm(vec2(y*9.,3.))-.5)*2.+.007*(vnoise(vec2(y*60.,7.))-.5)+.003*(vnoise(vec2(y*190.,2.))-.5); }
// fibres sticking out of the torn edge: returns coverage for a point e (distance into the sheet, negative outside) at height y
float fibres(float e,float y,float px,float seed){ float a=0.; for(int L=0;L<3;L++){ float n=L==0?70.:L==1?150.:260.; float c=floor(y*n); for(int j=-2;j<=2;j++){ float id=c+float(j); vec2 h=hash22(vec2(id,seed+float(L)*7.)); vec2 h2=hash22(vec2(id+31.,seed+float(L)*3.)); float len=(L==0?.030:L==1?.016:.009)*h.y*h.y*(.4+.6*h2.y); float y0=(id+h.x)/n; float k=clamp(-e/max(len,1e-4),0.,1.); float yy=y0+(h2.x-.5)*len*1.3*k+(h2.y-.5)*len*1.6*k*k; float wd=(L==0?.0012:.0008)*(1.-.75*k); float dd=abs(y-yy)-wd; float end=len+e; a=max(a,smoothstep(px*.7,-px*.5,dd)*smoothstep(0.,.0025,end)*(L==0?.95:.8)); } } return a; }
`,
  lw = {
    dur: v2,
    create(i) {
      let { gfx: t } = i,
        e = {
          uAsp: { value: 1 },
          uP: { value: 0 },
          uYf: { value: 2 },
          uW2: { value: 0 },
          tA: { value: null },
          tB: { value: null },
          uRes: { value: new Nt() },
          uPx: { value: 0.002 },
        },
        n = Rc(i),
        o = G0(i),
        s = new In(),
        a = new ge(),
        r = {
          transparent: !0,
          depthTest: !1,
          depthWrite: !1,
          side: oe,
          blending: Ie,
          blendSrc: pe,
          blendDst: je,
          blendSrcAlpha: pe,
          blendDstAlpha: je,
          glslVersion: re,
          uniforms: e,
        },
        l = new ce({
          ...r,
          vertexShader:
            "precision highp float; in vec3 position; out vec2 vP; out float vPhi,vOver; flat out float vSg; " +
            g2 +
            "void main(){ float sg=position.z; float y=mix(-1.,1.,position.y); float outer=sg*uAsp, inner=slow(y)-sg*.085; float x=mix(outer,inner,position.x); vP=vec2(x,y); vSg=sg; vec3 w=curl(vP,sg,vPhi,vOver); gl_Position=proj(w); }",
          fragmentShader:
            "precision highp float; precision highp int; precision highp sampler2D; in vec2 vP; in float vPhi,vOver; flat in float vSg; out vec4 o; uniform sampler2D tA,tB; uniform vec2 uRes; uniform float uPx; " +
            Sn +
            Fe +
            g2 +
            f6 +
            `
    void main(){ float y=vP.y, h=openAt(y); float op=h>0.?smoothstep(.002,.05,h+.006*(vnoise(vec2(y*40.,1.))-.5)):0.; float e0=(vP.x-slow(y))*vSg; bool nr=e0<.15; vec2 uv=vec2(vP.x/uAsp,y)*.5+.5; bool front=gl_FrontFacing; float e=nr?(vP.x-slow(y)-tearFine(y))*vSg:e0; 
     float px=max(fwidth(e0),1e-5);
     float al=1.; if(e<.16){ float f=e<.004?fibres(e,y,max(px,fwidth(y)),vSg*5.):0.; float body=smoothstep(-px*.7,px*.7,e+mix(.02,0.,smoothstep(0.,.012,h))); al=max(body,f*op); } if(al<=.003) discard;
     vec3 n=vec3(vSg*sin(vPhi),0.,cos(vPhi)); const vec3 L=normalize(vec3(-.38,.42,.82)); 
     // the bevel: where the print lifts off and white core shows; whatever one half keeps the other has lost
     float core=0.; if(nr&&op>0.){ float share=smoothstep(.38,.62,fbm(vec2(y*5.5,11.))); float wide=.006+.050*(vSg<0.?share:1.-share)*(.55+.9*fbm(vec2(y*14.,vSg*5.))); float jag=.010*(fbm(vec2(y*38.,vSg*9.))-.5)+.004*(vnoise(vec2(y*170.,vSg))-.5); core=(wide+jag)*op; if(!front) core*=.42; }
     vec3 ink; if(front) ink=toLin(clamp(texture(tA,uv).rgb,0.,1.)); else { float fb=fbm(vP*vec2(70.,55.)); ink=vec3(.021,.021,.024)*(.75+.5*fb)+.006*smoothstep(.62,.8,vnoise(vP*vec2(160.,40.))); }
     float edge=core>0.?smoothstep(-px,px,e-core):1.; vec3 c=ink;
     float tone=1.;
     if(e<core+.02&&op>0.){ // torn core: layered, fibrous, thin at the lip
       float q=clamp(e/max(core,.001),0.,1.); float l1=.34+.22*(fbm(vec2(y*24.,3.+vSg))-.5)*2., l2=.68+.2*(fbm(vec2(y*33.,8.+vSg))-.5)*2.; vec2 fq=vec2(e*70.+y*9.*(vnoise(vec2(y*13.,1.))-.5),y*300.); float str=vnoise(fq)*.5+vnoise(fq*vec2(2.1,1.9)+7.)*.5; float fine=vnoise(vec2(e*900.,y*700.));
       vec3 w=vec3(.93,.915,.885)*(.80+.16*str+.08*fine); float st1=smoothstep(.10,0.,abs(q-l1)), st2=smoothstep(.10,0.,abs(q-l2)); w*=1.-.16*st1*step(q,l1)-.20*st2*step(q,l2)+.06*st1*step(l1,q); w*=mix(.90,1.,smoothstep(0.,.5,q)); 
       vec3 bl=toLin(clamp(texture(tB,gl_FragCoord.xy/uRes).rgb,0.,1.)); float thin=(1.-smoothstep(0.,.75,q))*.55; w=mix(w,w*(.35+.75*bl)+bl*.10,thin);
       // curled ink lip throws a hairline shadow on the core
       w*=1.-.45*exp(-max(core-e,0.)/.0030)*edge*0.-.30*exp(-max(core-e,0.)/.0045);
       c=mix(w,ink,edge); c+=edge*exp(-max(e-core,0.)/.0016)*vec3(.16)*op*(front?1.:.5); tone=mix(1.,0.,edge); }
     vec3 N=front?n:-n; float dl=max(dot(N,L),0.); float eL=front?mix(1.,(.34+.66*dl/L.z),smoothstep(0.,.25,vPhi)):(.16+1.25*dl*dl); c*=eL; vec3 H=normalize(L+vec3(0.,0.,1.)); float gl=pow(max(dot(N,H),0.),front?26.:14.)*smoothstep(0.,.35,vPhi); if(!front){ float rim=pow(1.-abs(N.z),3.); c+=vec3(.5,.6,.75)*.035*rim; } c+=vec3(.9,.95,1.)*gl*(front?.06:.05)*(1.-tone*.8);
     c*=1.-.72*vOver*(1.-smoothstep(0.,.9,vPhi)); 
     o=vec4(c*al,al); }`,
        }),
        c = new Qt(),
        u = [],
        f = [];
      for (let m of [-1, 1]) {
        let g = u.length / 3;
        for (let b = 0; b <= x2; b++) for (let y = 0; y <= Lh; y++) u.push(b / x2, y / Lh, m);
        for (let b = 0; b < x2; b++)
          for (let y = 0; y < Lh; y++) {
            let S = g + b * (Lh + 1) + y,
              M = S + Lh + 1;
            m < 0 ? f.push(S, M, M + 1, S, M + 1, S + 1) : f.push(S, M + 1, M, S, S + 1, M + 1);
          }
      }
      (c.setAttribute("position", new $t(new Float32Array(u), 3)),
        c.setIndex(f),
        (c.boundingSphere = new Be(new F(), 1e6)));
      let h = new Zt(c, l);
      ((h.frustumCulled = !1), (h.renderOrder = 0), a.add(h));
      let d = new ce({
        ...r,
        vertexShader:
          "precision highp float; precision highp int; in vec2 position; out vec2 vQ; flat out vec4 vS; out float vK; " +
          Fe +
          g2 +
          `uniform float uT; 
    void main(){ float i=float(gl_InstanceID); vec2 h=hash21(i*1.7+2.), h2=hash21(i*3.1+9.), h3=hash21(i*5.7+4.); float y0=mix(-.98,1.02,(i+h.x)/${rw}.); float yf=uYf; float k=clamp((1.08-y0)/2.4,0.,1.); float t0=(.02+.54*k)*${v2}+h.y*.12; float t=uT-t0; if(t<=0.){ gl_Position=vec4(2.); return; }
     float sz=mix(.007,.034,h2.x*h2.x); float drag=1.-exp(-t*1.6); vec3 c=vec3(slow(y0)+(h2.y-.5)*1.1*drag+.05*sin(t*(5.+6.*h3.x)+i)*min(t,1.),y0+(.25*h3.x+.05)*drag-(.55+.5*h3.y)*t*t-.35*t*sz*8.,.05+.5*h3.x*drag); float a1=t*(4.+9.*h3.y)*(h.x>.5?1.:-1.)+i, a2=t*(5.+8.*h.y)+i*2.; vec2 q=position*sz*vec2(1.,.75); float ca=cos(a1),sa=sin(a1); vec3 P=vec3(q.x*ca-q.y*sa,q.x*sa+q.y*ca,0.); float cb=cos(a2),sb=sin(a2); P=vec3(P.x,P.y*cb,P.y*sb); gl_Position=proj(c+P); vQ=position; vS=vec4(h,h2); vK=sb; }`,
        fragmentShader:
          "precision highp float; precision highp int; in vec2 vQ; flat in vec4 vS; in float vK; out vec4 o; " +
          Fe +
          "void main(){ float a=atan(vQ.y,vQ.x), r=length(vQ); float sd=3.+floor(vS.z*2.99), aa=a+vS.w*6.28; float R=.50/cos(mod(aa,6.2832/sd)-3.14159/sd)+.26*(vnoise(vec2(cos(a),sin(a))*1.7+vS.xy*40.)-.5)+.14*(vnoise(vec2(cos(a),sin(a))*9.+vS.zw*30.)-.5); float px=fwidth(r); float al=smoothstep(R+px,R-px,r); if(al<.01) discard; float ink=smoothstep(0.,px*1.5,R-.07-.26*vnoise(vQ*2.+vS.xy*9.)*step(.0,vQ.x)-r); vec3 w=vec3(.9,.885,.86)*(.82+.2*vnoise(vQ*9.)); vec3 c=mix(w,gl_FrontFacing?vec3(.022,.022,.026):w*.96,ink); c*=.62+.38*abs(vK)+.25*max(vK,0.); o=vec4(c*al,al); }",
      });
      e.uT = { value: 0 };
      let p = new Oe();
      (p.setAttribute("position", new $t(new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1]), 2)),
        p.setIndex([0, 1, 2, 0, 2, 3]),
        (p.instanceCount = rw),
        (p.boundingSphere = new Be(new F(), 1e6)));
      let x = new Zt(p, d);
      ((x.frustumCulled = !1), (x.renderOrder = 1), a.add(x));
      let v = t.pass(
        Sn +
          "uniform sampler2D tA,tB,tL,tN,tF; uniform float uAsp,uS; void main(){ vec4 b=texture(tB,vUv), l=texture(tL,vUv); if(l.a<=0.){ float n=texture(tN,vUv+vec2(.006/uAsp,.010)).r, f=texture(tF,vUv+vec2(.020/uAsp,.045)).r; float s=1.-(1.-.62*n*uS)*(1.-.55*f*uS); if(s<.0008){ o=b; return; } } float n=texture(tN,vUv+vec2(.006/uAsp,.010)).r, f=texture(tF,vUv+vec2(.020/uAsp,.045)).r; float s=1.-(1.-.62*n*uS)*(1.-.55*f*uS); vec3 c=toLin(clamp(b.rgb,0.,1.))*mix(vec3(1.),vec3(.20,.23,.30),s); c=c*(1.-l.a)+l.rgb; o=vec4(toSrgb(c),1.); }",
        { tA: null, tB: null, tL: n.texture, tN: o.near.texture, tF: o.far.texture, uAsp: 1, uS: 1 },
      );
      return {
        render({ A: m, B: g, p: b, out: y }) {
          if (b <= 0) return t.copy(m, y);
          if (b >= 1) return t.copy(g, y);
          let S = we(b, 0.02, 0.56);
          ((S = xn(S, ke(S), 0.55)),
            (S += (0.012 * Math.sin(S * 26) + 0.005 * Math.sin(S * 61)) * Math.sin(Math.PI * S)),
            (e.uAsp.value = t.aspect),
            (e.uP.value = b),
            (e.uT.value = b * v2),
            (e.uYf.value = 1.08 - 2.4 * S));
          let M = we(b, 0.37, 0.995);
          ((e.uW2.value = (t.aspect + 0.98) * Math.pow(M, 2.1) * (1.35 - 0.35 * M)),
            (e.tA.value = m.texture),
            (e.tB.value = g.texture),
            e.uRes.value.set(n.width, n.height),
            t.draw(a, s, n, { color: 0, alpha: 0 }),
            o.update(n.texture, 0.007),
            (v.u.tB.value = g.texture),
            (v.u.uAsp.value = t.aspect),
            (v.u.uS.value = 1 - ke(we(b, 0.88, 0.985))),
            v.render(y));
        },
      };
    },
  };
