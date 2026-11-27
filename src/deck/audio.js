// deck/audio.js
// WebAudio synthesis: oscillators, noise/FFT helpers, sample generators, makeAudio (stem mixing, ducking, mute).
// Part 378-409 of the original 613 top-level statements; all modules are
// concatenated back into one IIFE by build.mjs, so they share a single scope.

var So = Math.PI * 2,
  $T = 36.708,
  Gt = (i) => $T * i,
  Vn = (i, t = 0, e = 1) => (i < t ? t : i > e ? e : i),
  jn = (i, t, e) => i + (t - i) * e,
  qn = (i) => ((i = Vn(i)), i * i * (3 - 2 * i));

function Eo(i) {
  let t = (i * 2654435761) >>> 0 || 1;
  return () => ((t ^= t << 13), (t >>>= 0), (t ^= t >>> 17), (t ^= t << 5), (t >>>= 0), t / 4294967296);
}

var hn = (i, t = 1, e = 48e3) => Array.from({ length: t }, () => new Float32Array(Math.ceil(i * e))),
  Pi = class {
    constructor(t, e = 0.7, n = 48e3) {
      ((this.a = 0), (this.b = 0), (this.lp = this.bp = this.hp = 0), (this.sr = n), t && this.set(t, e));
    }
    set(t, e = 0.7) {
      let n = Math.tan((Math.PI * Math.min(t, this.sr * 0.45)) / this.sr);
      ((this.k = 1 / e),
        (this.a1 = 1 / (1 + n * (n + this.k))),
        (this.a2 = n * this.a1),
        (this.a3 = n * this.a2));
    }
    run(t) {
      let e = t - this.b,
        n = this.a1 * this.a + this.a2 * e,
        o = this.b + this.a2 * this.a + this.a3 * e;
      return (
        (this.a = 2 * n - this.a),
        (this.b = 2 * o - this.b),
        (this.lp = o),
        (this.bp = n * this.k),
        (this.hp = t - this.k * n - o),
        o
      );
    }
  };

function We(i, t, e, n, { at: o = 0, ph: s = 0, atk: a = 0, sr: r = 48e3 } = {}) {
  if (t > r * 0.42 || t < 8) return;
  let l = Math.floor(o * r),
    c = i.length,
    u = Math.exp(-6.91 / (n * r)),
    f = (So * t) / r,
    h = Math.cos(f) * u,
    d = Math.sin(f) * u,
    p = e * Math.sin(s),
    x = e * Math.cos(s),
    v = Math.max(1, a * r),
    m = 0,
    g = Math.min(c, l + Math.ceil(n * r * 1.5));
  for (; l < g; l++, m++) {
    i[l] += m < v ? p * (0.5 - 0.5 * Math.cos((Math.PI * m) / v)) : p;
    let b = p * h + x * d;
    ((x = x * h - p * d), (p = b));
  }
}

function ii(i, t, e, n, o, { sr: s = 48e3, ph: a = 0 } = {}) {
  let r = Math.floor(t * s),
    l = Math.floor(e * s),
    c = a;
  for (let u = 0; u < l && r + u < i.length; u++) {
    let f = u / l;
    ((i[r + u] += Math.sin(c) * o(f)), (c += (So * n(f)) / s));
  }
}

function en(i, t, e, n, o, s, a, r, { sr: l = 48e3 } = {}) {
  let c = new Pi(0, 1, l),
    u = Math.floor(e * l),
    f = Math.floor(n * l);
  for (let h = 0; h < f && u + h < i.length; h++) {
    let d = h / f;
    ((h & 15) === 0 && c.set(s(d), a), c.run(t() * 2 - 1), (i[u + h] += c[o] * r(d)));
  }
}

function rn(i, t, { fade: e = 0.004, sr: n = 48e3, dc: o = !0 } = {}) {
  let s = 0;
  for (let r of i) {
    if (o) {
      let c = 0,
        u = 0,
        f = 1 - (So * 18) / n;
      for (let h = 0; h < r.length; h++) {
        let d = r[h];
        ((u = d - c + f * u), (c = d), (r[h] = u));
      }
    }
    let l = Math.floor(e * n);
    for (let c = 0; c < l; c++) r[r.length - 1 - c] *= c / l;
    for (let c = 0; c < r.length; c++) {
      let u = Math.abs(r[c]);
      u > s && (s = u);
    }
  }
  let a = s ? t / s : 0;
  for (let r of i) for (let l = 0; l < r.length; l++) r[l] *= a;
  return i;
}

var W1 = {};

function ZT(i) {
  if (W1[i]) return W1[i];
  let t = new Float32Array(i / 2),
    e = new Float32Array(i / 2);
  for (let n = 0; n < i / 2; n++) ((t[n] = Math.cos((So * n) / i)), (e[n] = Math.sin((So * n) / i)));
  return (W1[i] = { c: t, s: e });
}

function* JT(i, t) {
  let e = i.length;
  for (let s = 1, a = 0; s < e; s++) {
    let r = e >> 1;
    for (; a & r; r >>= 1) a ^= r;
    if (((a ^= r), s < a)) {
      let l = i[s];
      ((i[s] = i[a]), (i[a] = l), (l = t[s]), (t[s] = t[a]), (t[a] = l));
    }
    (s & 65535) === 0 && (yield);
  }
  yield;
  let { c: n, s: o } = ZT(e);
  for (let s = 2; s <= e; s <<= 1) {
    let a = s >> 1,
      r = e / s;
    for (let l = 0, c = 0; l < e; l += s) {
      for (let u = 0, f = 0; u < a; u++, f += r) {
        let h = l + u,
          d = h + a,
          p = n[f],
          x = o[f],
          v = i[d] * p - t[d] * x,
          m = i[d] * x + t[d] * p;
        ((i[d] = i[h] - v), (t[d] = t[h] - m), (i[h] += v), (t[h] += m));
      }
      (c += a) >= 4e4 && ((c = 0), yield);
    }
    yield;
  }
}

function* L3(i, { seed: t = 1, sr: e = 32e3, rms: n = 0.1, mono: o = 170 } = {}) {
  let s = i.length,
    a = s * 2,
    r = new Float32Array(a),
    l = new Float32Array(a),
    c = Eo(t),
    u = Math.floor((o / e) * a);
  for (let f = 1; f < s; f++) {
    let h = i[f];
    if (h > 1e-9) {
      let d = c() * So,
        p = f < u ? d : c() * So,
        x = h * Math.cos(d),
        v = h * Math.sin(d),
        m = h * Math.cos(p),
        g = h * Math.sin(p);
      ((r[f] = x - g), (l[f] = v + m), (r[a - f] = x + g), (l[a - f] = -v + m));
    }
    (f & 32767) === 0 && (yield);
  }
  (yield, yield* JT(r, l));
  for (let f of [r, l]) {
    let h = 0;
    for (let p = 0; p < a; p++) h += f[p] * f[p];
    let d = n / Math.sqrt(h / a || 1);
    for (let p = 0; p < a; p++) f[p] *= d;
    yield;
  }
  return { ch: [r, l], sr: e };
}

function* _o({
  f: i,
  parts: t,
  bw: e = 30,
  seed: n = 1,
  N: o = 1 << 18,
  sr: s = 32e3,
  mono: a = 170,
  noise: r = null,
  rms: l = 0.1,
}) {
  let c = o >> 1,
    u = new Float32Array(c),
    f = s / o,
    h = 0;
  for (let [d, p, x] of t) {
    let v = i * d;
    if (v > s * 0.46) continue;
    let m = Math.max(f * 0.8, (Math.pow(2, (x ?? e) / 1200) - 1) * v) / 2 / f,
      g = v / f,
      b = Math.max(1, Math.floor(g - 4 * m)),
      y = Math.min(c - 1, Math.ceil(g + 4 * m)),
      S = p / Math.sqrt(m);
    for (let M = b; M <= y; M++) {
      let w = (M - g) / m;
      u[M] += S * Math.exp(-w * w);
    }
    ++h % 24 === 0 && (yield);
  }
  if (r) for (let d = 1; d < c; d++) u[d] += r(d * f);
  return (yield, yield* L3(u, { seed: n, sr: s, mono: a, rms: l }));
}

function* qf(i, { N: t = 1 << 18, seed: e = 1, sr: n = 32e3, mono: o = 60, rms: s = 0.1 } = {}) {
  let a = t >> 1,
    r = new Float32Array(a),
    l = n / t;
  for (let c = 1; c < a; c++) r[c] = i(c * l);
  return (yield, yield* L3(r, { seed: e, sr: n, mono: o, rms: s }));
}

var nn = (i, t) => Math.exp(-t * i);

function e0(i, t, e, n, o, s, a, r = 1500, l = 6500) {
  let c = new Float32Array(Math.ceil(n * 48e3) + 2e3);
  for (let x = 0; x < o; x++) {
    let v = Math.floor(s(t()) * n * 48e3),
      m = Math.pow(t(), 3.2) * (t() < 0.5 ? -1 : 1),
      g = 6 + Math.floor(t() * t() * 150);
    for (let b = 0; b < g && v + b < c.length; b++) c[v + b] += m * (t() * 2 - 1) * (1 - b / g);
  }
  let u = new Pi(jn(r, l, 0.12), 1.2),
    f = new Pi(jn(r, l, 0.45), 1.4),
    h = new Pi(l, 1),
    d = new Pi(8200, 0.6),
    p = Math.floor(e * 48e3);
  for (let x = 0; x < c.length && p + x < i.length; x++) {
    let v = c[x];
    (u.run(v), f.run(v), h.run(v), (i[p + x] += a * d.run(u.bp * 0.9 + f.bp * 0.8 + h.bp * 0.45)));
  }
}

var QT = (i, t) => {
    let e = hn(0.16)[0],
      n = 165 + i() * 50;
    (We(e, n, 0.9, 0.07, { atk: 0.0012 }),
      We(e, n * 2.63, 0.3, 0.035),
      We(e, 1180 + i() * 300, 0.13, 0.02, { at: 0.001 }),
      en(
        e,
        i,
        0,
        0.016,
        "bp",
        () => 1500 + t * 90,
        0.8,
        (s) => 0.55 * nn(s, 5),
      ));
    let o = 0.058 + i() * 0.018;
    return (
      en(
        e,
        i,
        o,
        0.01,
        "bp",
        () => 2300,
        0.9,
        (s) => 0.2 * nn(s, 5),
      ),
      We(e, n * 1.5, 0.16, 0.04, { at: o, atk: 0.001 }),
      rn([e], 1)
    );
  },
  Sr = {
    tick: [
      4,
      0.12,
      { room: 0.25, jit: 0.03, prio: 1 },
      (i) => {
        let t = hn(0.09)[0];
        return (
          We(t, 2350 * (1 + i() * 0.05), 0.5, 0.022, { atk: 5e-4 }),
          We(t, 3900 * (1 + i() * 0.05), 0.26, 0.014),
          We(t, 1020, 0.34, 0.03, { atk: 8e-4 }),
          en(
            t,
            i,
            0,
            0.003,
            "lp",
            () => 5200,
            0.7,
            (e) => 0.5 * (1 - e),
          ),
          rn([t], 1)
        );
      },
    ],
    click: [
      3,
      0.125,
      { room: 0.12, jit: 0.02, prio: 0 },
      (i) => {
        let t = hn(0.1)[0];
        return (
          We(t, 1250 + i() * 60, 0.5, 0.028, { atk: 8e-4 }),
          We(t, 560, 0.5, 0.035, { atk: 0.001 }),
          en(
            t,
            i,
            0,
            0.006,
            "lp",
            () => 4200,
            0.7,
            (e) => 0.4 * (1 - e),
          ),
          en(
            t,
            i,
            0.052,
            0.004,
            "bp",
            () => 2600,
            1,
            (e) => 0.22 * (1 - e),
          ),
          We(t, 1500, 0.14, 0.02, { at: 0.052 }),
          rn([t], 1)
        );
      },
    ],
    type: [6, 0.12, { room: 0.2, jit: 0.04, prio: 0 }, QT],
    select: [
      1,
      0.11,
      { room: 0.1, hall: 0.22, jit: 0, prio: 0 },
      (i) => {
        let [t, e] = hn(0.62, 2),
          n = (o, s, a, r) => {
            for (let [l, c, u] of [
              [t, 1 - r, 1],
              [e, r, 1.0016],
            ])
              (We(l, s * u, a * c, 0.42, { at: o, atk: 0.004 }),
                We(l, s * 2 * u, a * 0.16 * c, 0.2, { at: o, atk: 0.003 }),
                We(l, s * 2.756, a * 0.1 * c, 0.09, { at: o, atk: 0.002 }),
                We(l, s * 0.5, a * 0.18 * c, 0.3, { at: o, atk: 0.01 }));
          };
        (n(0, Gt(24), 0.75, 0.4), n(0.072, Gt(33), 1, 0.62));
        for (let o of [t, e])
          ii(
            o,
            0.05,
            0.16,
            () => Gt(33) * 1.5,
            (s) => 0.05 * Math.sin(Math.PI * s) ** 2 * s,
          );
        return rn([t, e], 1, { fade: 0.03 });
      },
    ],
    delete: [
      2,
      0.17,
      { room: 0, jit: 0.02, prio: 0 },
      (i) => {
        let t = hn(0.13)[0];
        return (
          ii(
            t,
            0,
            0.085,
            (e) => jn(165, 62, Math.sqrt(e)),
            (e) => 0.9 * Math.min(1, e * 40) * (e < 0.8 ? nn(e, 1.6) : nn(e, 1.6) * (1 - e) * 5),
          ),
          en(
            t,
            i,
            0,
            0.03,
            "lp",
            (e) => jn(2600, 500, e),
            0.7,
            (e) => 0.5 * nn(e, 4),
          ),
          en(
            t,
            i,
            0.074,
            0.008,
            "bp",
            () => 900,
            1,
            (e) => 0.3 * (1 - e),
          ),
          rn([t], 1, { fade: 0.012 })
        );
      },
    ],
    whoosh: [
      3,
      0.16,
      { room: 0.1, hall: 0.12, jit: 0.05, prio: 2 },
      (i, t) => {
        let [e, n] = hn(0.95, 2),
          o = 0.46 + i() * 0.1,
          s = (r) => {
            let l = r < o ? qn(r / o) : qn((1 - r) / (1 - o));
            return l * l;
          },
          a = (r) =>
            260 +
            1500 * Math.pow(r < o ? qn(r / o) : qn((1 - r) / (1 - o)), 1.6) * (r < o ? 1 : 0.8) +
            200 * r;
        (en(e, i, 0, 0.9, "bp", a, 0.8, (r) => s(r) * (1.25 - r * 0.9)),
          en(
            n,
            i,
            0.015,
            0.9,
            "bp",
            (r) => a(r) * 1.05,
            0.8,
            (r) => s(r) * (0.45 + r * 0.9),
          ));
        for (let r of [e, n])
          en(
            r,
            i,
            0,
            0.9,
            "lp",
            (l) => 160 + 160 * s(l),
            0.7,
            (l) => s(l) * 0.7,
          );
        return rn([e, n], 1);
      },
    ],
    thud: [
      3,
      0.26,
      { room: 0.25, hall: 0.05, jit: 0.04, prio: 2 },
      (i) => {
        let t = hn(0.6)[0];
        return (
          ii(
            t,
            0,
            0.5,
            (e) => 44 + 40 * nn(e, 14),
            (e) => nn(e, 6) * Math.min(1, e * 90),
          ),
          We(t, 118 + i() * 12, 0.4, 0.16, { atk: 0.003 }),
          We(t, 205 + i() * 20, 0.2, 0.09, { atk: 0.002 }),
          en(
            t,
            i,
            0,
            0.07,
            "lp",
            (e) => jn(1400, 200, e),
            0.7,
            (e) => 0.5 * nn(e, 4),
          ),
          rn([t], 1)
        );
      },
    ],
    snap: [
      3,
      0.18,
      { room: 0.3, jit: 0.05, prio: 2 },
      (i) => {
        let t = hn(0.14)[0];
        return (
          en(
            t,
            i,
            0,
            0.012,
            "bp",
            () => 2100,
            0.7,
            (e) => 1 * nn(e, 4),
          ),
          We(t, 880 + i() * 120, 0.42, 0.032, { atk: 6e-4 }),
          We(t, 1640 + i() * 200, 0.26, 0.022),
          en(
            t,
            i,
            0.004,
            0.06,
            "bp",
            () => 1300,
            0.9,
            (e) => 0.2 * nn(e, 5),
          ),
          rn([t], 1)
        );
      },
    ],
    riser: [
      1,
      0.17,
      { hall: 0.25, jit: 0, prio: 4 },
      function* (i) {
        let [t, e] = hn(2.4, 2);
        for (let [n, o] of [
          [t, 1],
          [e, 1.004],
        ]) {
          for (let s = 0; s < 5; s++, yield)
            ii(
              n,
              0,
              2.3,
              (a) => Gt(4) * o * Math.pow(2, (s * 1 + a * 1.2) % 5) * (1 + 0.002 * s),
              (a) => {
                let r = ((s + a * 1.2) % 5) / 5;
                return (
                  (0.22 * Math.sin(Math.PI * r) ** 2 * Math.pow(a, 1.7) * (a > 0.97 ? (1 - a) / 0.03 : 1)) /
                  (1 + r * 2.4)
                );
              },
            );
          (yield,
            en(
              n,
              i,
              0,
              2.3,
              "bp",
              (s) => 300 * Math.pow(9, s),
              1.1,
              (s) => 0.2 * Math.pow(s, 2.4) * (s > 0.97 ? (1 - s) / 0.03 : 1),
            ));
        }
        return rn([t, e], 1);
      },
    ],
    boom: [
      2,
      0.36,
      { hall: 0.3, jit: 0.03, prio: 3 },
      function* (i) {
        let [t, e] = hn(2.4, 2);
        for (let [n, o] of [
          [t, 1],
          [e, 1.003],
        ])
          (ii(
            n,
            0,
            2.3,
            (s) => (36.7 + 46 * nn(s, 40)) * o,
            (s) => nn(s, 3.1) * Math.min(1, s * 240),
          ),
            ii(
              n,
              0,
              1.2,
              (s) => (73.4 + 30 * nn(s, 22)) * o,
              (s) => 0.62 * nn(s, 4.2) * Math.min(1, s * 160),
            ),
            We(n, Gt(3) * o, 0.34, 0.7, { atk: 0.012 }),
            We(n, Gt(4.5) * o, 0.16, 0.45, { atk: 0.01 }),
            yield,
            en(
              n,
              i,
              0,
              1.9,
              "lp",
              (s) => 90 + 560 * nn(s, 6),
              0.6,
              (s) => 0.8 * nn(s, 3.4),
            ),
            yield,
            en(
              n,
              i,
              0,
              0.1,
              "lp",
              (s) => jn(1700, 300, s),
              0.7,
              (s) => 0.3 * nn(s, 3),
            ));
        for (let n of [t, e]) for (let o = 0; o < n.length; o++) n[o] = Math.tanh(n[o] * 1.7);
        return rn([t, e], 1, { fade: 0.2 });
      },
    ],
    shimmer: [
      2,
      0.1,
      { hall: 0.6, jit: 0, prio: 3 },
      (i) => {
        let [t, e] = hn(2.2, 2),
          n = [16, 18, 20, 22, 24, 27, 30, 32, 33, 36, 40, 44, 48];
        for (let o = 0; o < 46; o++) {
          let s = Gt(n[Math.floor(i() * n.length)] * (i() < 0.25 ? 2 : 1)),
            a = Math.pow(i(), 1.4) * 1.25,
            r = (0.2 + i() * 0.5) * (700 / (s + 400)),
            l = i();
          (We(t, s * (1 + (i() - 0.5) * 0.002), r * (1 - l), 0.5 + i() * 0.5, {
            at: a,
            atk: 0.006,
            ph: i() * 6,
          }),
            We(e, s * (1 + (i() - 0.5) * 0.002), r * l, 0.5 + i() * 0.5, { at: a, atk: 0.006, ph: i() * 6 }));
        }
        return rn([t, e], 1, { fade: 0.3 });
      },
    ],
    pop: [
      4,
      0.14,
      { room: 0.2, jit: 0.08, prio: 2 },
      (i) => {
        let t = hn(0.12)[0];
        return (
          ii(
            t,
            0,
            0.07,
            (e) => 230 + 520 * e * e + i() * 0.5,
            (e) => nn(e, 3) * Math.min(1, e * 14) * (1 - e),
          ),
          en(
            t,
            i,
            0,
            0.006,
            "bp",
            () => 900,
            0.8,
            (e) => 0.22 * (1 - e),
          ),
          rn([t], 1, { fade: 0.01 })
        );
      },
    ],
    drip: [
      4,
      0.12,
      { room: 0.1, hall: 0.3, jit: 0.08, prio: 3 },
      (i, t) => {
        let e = hn(0.32)[0],
          n = 620 + t * 130;
        return (
          We(e, 1900, 0.12, 0.01),
          ii(
            e,
            0.012,
            0.2,
            (o) => n * (1 + 0.75 * o * o),
            (o) => nn(o, 4.4) * Math.min(1, o * 22) * (o > 0.9 ? (1 - o) * 10 : 1),
          ),
          ii(
            e,
            0.1,
            0.14,
            (o) => n * 1.7 * (1 + 0.5 * o * o),
            (o) => 0.26 * nn(o, 5) * Math.min(1, o * 20) * (o > 0.9 ? (1 - o) * 10 : 1),
          ),
          rn([e], 1)
        );
      },
    ],
    creak: [
      4,
      0.14,
      { room: 0.35, hall: 0.12, jit: 0.1, prio: 3 },
      (i, t) => {
        let n = hn(1.3)[0],
          o = new Float32Array(n.length),
          s = 0.02,
          a = 34 + i() * 22,
          r = a * (1.5 + i());
        for (; s < 1.1;) {
          let c = s / 1.1,
            u = jn(a, r, Math.sin(c * Math.PI * (0.6 + 0.4 * i()))) * (1 + 0.12 * Math.sin(c * 23)),
            f = Math.sin(Math.PI * Math.min(1, c * 1.02)) * (0.5 + 0.5 * i()),
            h = Math.floor(s * 48e3);
          for (let d = 0; d < 40; d++) o[h + d] += f * (i() * 2 - 1) * 0.4 + (d < 14 ? f : 0);
          s += (1 / u) * (0.85 + 0.3 * i());
        }
        let l = [
          [310 + i() * 60, 14, 1],
          [540 + i() * 90, 18, 0.9],
          [890 + i() * 120, 16, 0.6],
          [1380 + i() * 150, 14, 0.35],
          [2300, 8, 0.16],
        ].map(([c, u, f]) => [new Pi(c, u), f]);
        for (let c = 0; c < n.length; c++) {
          let u = 0;
          for (let [f, h] of l) (f.run(o[c]), (u += f.bp * h));
          n[c] = u;
        }
        return rn([n], 1, { fade: 0.05 });
      },
    ],
    wave: [
      2,
      0.15,
      { hall: 0.12, jit: 0.06, prio: 3 },
      function* (i) {
        let [t, e] = hn(3.6, 2),
          n = (o) => (o < 0.38 ? Math.pow(qn(o / 0.38), 1.6) : Math.pow(1 - (o - 0.38) / (1 - 0.38), 2.1));
        for (let [o, s] of [
          [t, 0],
          [e, 0.04],
        ])
          (en(
            o,
            i,
            s,
            3.5,
            "lp",
            (a) => 180 + 1500 * n(a),
            0.6,
            (a) => n(a),
          ),
            yield,
            en(
              o,
              i,
              s + 0.25,
              3.2,
              "bp",
              (a) => 3600 - 1300 * a,
              0.7,
              (a) => 0.16 * Math.pow(n(a), 1.4) * (0.7 + 0.3 * Math.sin(a * 60 + s * 40)),
            ),
            yield,
            en(
              o,
              i,
              0,
              3.3,
              "lp",
              () => 130,
              0.7,
              (a) => 0.9 * n(a),
            ));
        return rn([t, e], 1, { fade: 0.2 });
      },
    ],
    paper: [
      5,
      0.16,
      { room: 0.25, jit: 0.08, prio: 2 },
      (i, t) => {
        let e = hn(0.5)[0];
        return (
          e0(e, i, 0, 0.34 + 0.1 * i(), 260, (n) => Math.pow(n, 1.5), 1),
          en(
            e,
            i,
            0,
            0.24,
            "bp",
            (n) => 2300 + 900 * Math.sin(n * 9 + t),
            0.7,
            (n) => 0.07 * Math.sin(Math.PI * Math.pow(n, 0.6)) * (0.6 + 0.4 * Math.sin(n * 47 + t)),
          ),
          rn([e], 1, { fade: 0.06 })
        );
      },
    ],
    slam: [
      2,
      0.4,
      { hall: 0.4, room: 0.2, jit: 0.02, prio: 3 },
      function* (i) {
        let [t, e] = hn(2.6, 2);
        for (let [n, o] of [
          [t, 1],
          [e, 1.004],
        ])
          (ii(
            n,
            0,
            1.9,
            (s) => (38 + 70 * nn(s, 34)) * o,
            (s) => 1.1 * nn(s, 4) * Math.min(1, s * 400),
          ),
            We(n, 98 * o, 0.7, 0.6, { atk: 0.002 }),
            We(n, 161 * o, 0.5, 0.42, { atk: 0.002 }),
            We(n, 247 * o, 0.32, 0.3, { atk: 0.0015 }),
            We(n, 392 * o, 0.12, 0.16),
            yield,
            en(
              n,
              i,
              0,
              0.16,
              "lp",
              (s) => 500 + 3e3 * nn(s, 5),
              0.6,
              (s) => 0.85 * nn(s, 4.5) * Math.min(1, s * 120),
            ),
            yield,
            en(
              n,
              i,
              0.02,
              2.3,
              "lp",
              (s) => 110 + 900 * nn(s, 7),
              0.6,
              (s) => 0.5 * nn(s, 3.6),
            ),
            yield,
            e0(n, i, 0.05, 0.8, 130, (s) => Math.pow(s, 1.2), 0.12, 1200, 4200));
        for (let n of [t, e]) for (let o = 0; o < n.length; o++) n[o] = Math.tanh(n[o] * 1.3);
        return rn([t, e], 1, { fade: 0.3 });
      },
    ],
    domino: [
      6,
      0.2,
      { room: 0.18, hall: 0.03, jit: 0.05, prio: 2, gap: 0.004 },
      (i, t) => {
        let e = hn(0.12)[0],
          n = 1 + (i() - 0.5) * 0.08;
        return (
          We(e, 1480 * n, 0.5, 0.03, { atk: 4e-4 }),
          We(e, 2270 * n, 0.26, 0.02),
          We(e, 3620 * n, 0.1, 0.012),
          We(e, 395 * n, 0.55, 0.045, { atk: 0.0012 }),
          We(e, 236 * n, 0.3, 0.05, { atk: 0.002 }),
          en(
            e,
            i,
            0,
            0.005,
            "bp",
            () => 2600,
            0.7,
            (o) => 0.5 * (1 - o),
          ),
          rn([e], 1)
        );
      },
    ],
    bell: [
      2,
      0.13,
      { hall: 0.45, jit: 0, prio: 3 },
      (i, t) => {
        let [e, n] = hn(4.2, 2),
          o = Gt(16);
        for (let [s, a, r] of [
          [0.5, 0.3, 3.6],
          [1, 0.9, 3.2],
          [1.499, 0.22, 2],
          [2, 0.4, 2.1],
          [2.756, 0.18, 1.1],
          [4.07, 0.1, 0.7],
          [5.43, 0.05, 0.35],
        ])
          for (let l of [e, n])
            We(l, o * s * (1 + (i() - 0.5) * 0.0016), a, r, { atk: 0.003, ph: i() * 0.6 });
        return rn([e, n], 1, { fade: 0.4 });
      },
    ],
    sub: [
      1,
      0.3,
      { jit: 0, prio: 3 },
      (i) => {
        let t = hn(2)[0];
        return (
          ii(
            t,
            0,
            1.95,
            (e) => Gt(1) * (1 + 0.5 * Math.sin(Math.PI * e) ** 2 * 0.3),
            (e) => Math.sin(Math.PI * Math.pow(e, 0.55)) ** 2,
          ),
          ii(
            t,
            0,
            1.95,
            () => Gt(2),
            (e) => 0.4 * Math.sin(Math.PI * Math.pow(e, 0.6)) ** 2,
          ),
          ii(
            t,
            0,
            1.95,
            () => Gt(3),
            (e) => 0.12 * Math.sin(Math.PI * Math.pow(e, 0.65)) ** 2,
          ),
          rn([t], 1, { fade: 0.2 })
        );
      },
    ],
    rise: [
      2,
      0.12,
      { hall: 0.3, jit: 0, prio: 3 },
      (i) => {
        let [t, e] = hn(0.95, 2),
          n = (o) => Math.pow(2, 1 * qn(o));
        for (let [o, s] of [
          [6, 0.6],
          [8, 0.5],
          [12, 0.4],
          [16, 0.16],
        ])
          for (let [a, r] of [
            [t, 0.9985],
            [e, 1.0015],
          ])
            ii(
              a,
              0,
              0.9,
              (l) => Gt(o) * r * n(l),
              (l) => s * Math.pow(Math.sin(Math.PI * Math.pow(l, 0.75)), 2),
              { ph: i() * 6 },
            );
        for (let o of [t, e])
          en(
            o,
            i,
            0,
            0.9,
            "bp",
            (s) => 500 + 2500 * s,
            1,
            (s) => 0.05 * Math.sin(Math.PI * s) ** 2,
          );
        return rn([t, e], 1, { fade: 0.05 });
      },
    ],
    splash: [
      2,
      0.2,
      { room: 0.15, hall: 0.25, jit: 0.05, prio: 3 },
      (i) => {
        let [t, e] = hn(1.3, 2);
        for (let [n, o] of [
          [t, 0],
          [e, 0.012],
        ])
          (en(
            n,
            i,
            o,
            0.5,
            "lp",
            (s) => 300 + 2600 * nn(s, 4),
            0.6,
            (s) => 0.9 * nn(s, 5) * Math.min(1, s * 40),
          ),
            en(
              n,
              i,
              o + 0.03,
              1.1,
              "bp",
              (s) => 3200 - 1400 * s,
              0.7,
              (s) => 0.22 * nn(s, 3) * Math.min(1, s * 12),
            ),
            ii(
              n,
              0.02,
              0.2,
              (s) => 120 + 200 * s * s,
              (s) => 0.6 * nn(s, 3) * Math.min(1, s * 14) * (1 - s),
            ));
        return rn([t, e], 1, { fade: 0.2 });
      },
    ],
    _flap: [
      6,
      0.11,
      { room: 0.2, jit: 0.1, prio: 4, gap: 0 },
      (i, t) => {
        let e = hn(0.09)[0],
          n = 1 + (i() - 0.5) * 0.25;
        return (
          en(
            e,
            i,
            0,
            0.006,
            "bp",
            () => 2500 * n,
            0.8,
            (o) => 0.8 * (1 - o),
          ),
          We(e, 760 * n, 0.36, 0.022, { atk: 5e-4 }),
          We(e, 1720 * n, 0.26, 0.014),
          en(
            e,
            i,
            0.016 + 0.008 * i(),
            0.005,
            "bp",
            () => 1700 * n,
            0.8,
            (o) => 0.5 * (1 - o),
          ),
          We(e, 310 * n, 0.22, 0.03, { at: 0.017, atk: 0.001 }),
          rn([e], 1)
        );
      },
    ],
    _crease: [
      5,
      0.17,
      { room: 0.3, jit: 0.05, prio: 3 },
      (i, t) => {
        let e = hn(0.46)[0];
        return (
          e0(e, i, 0, 0.2, 420, (n) => 1 - Math.pow(1 - n, 0.6), 0.9, 1800, 6200),
          en(
            e,
            i,
            0,
            0.19,
            "bp",
            (n) => 1500 + 2900 * n,
            0.9,
            (n) => 0.34 * Math.pow(n, 1.3),
          ),
          en(
            e,
            i,
            0.188,
            0.012,
            "bp",
            () => 2400 + t * 120,
            0.7,
            (n) => 1.3 * nn(n, 3),
          ),
          We(e, 640 + t * 40, 0.4, 0.04, { at: 0.188, atk: 0.001 }),
          en(
            e,
            i,
            0.2,
            0.12,
            "bp",
            () => 1500,
            0.8,
            (n) => 0.16 * nn(n, 4),
          ),
          rn([e], 1, { fade: 0.06 })
        );
      },
    ],
    _plop: [
      2,
      0.24,
      { room: 0.15, hall: 0.3, jit: 0.03, prio: 3 },
      (i) => {
        let t = hn(0.8)[0];
        return (
          ii(
            t,
            0,
            0.2,
            (e) => 108 + 240 * e * e,
            (e) => nn(e, 2.6) * Math.min(1, e * 14) * (1 - e),
          ),
          ii(
            t,
            0.03,
            0.16,
            (e) => 300 * (1 + 1.1 * e * e),
            (e) => 0.5 * nn(e, 4) * Math.min(1, e * 14) * (1 - e),
          ),
          en(
            t,
            i,
            0,
            0.5,
            "lp",
            (e) => 900 * nn(e, 2) + 200,
            0.7,
            (e) => 0.5 * nn(e, 5),
          ),
          en(
            t,
            i,
            0.05,
            0.55,
            "bp",
            (e) => 2400 - 900 * e,
            0.7,
            (e) => 0.12 * Math.sin(Math.PI * Math.sqrt(e)) ** 2 * (0.6 + 0.4 * Math.sin(e * 70)),
          ),
          rn([t], 1, { fade: 0.1 })
        );
      },
    ],
    _page: [
      5,
      0.1,
      { room: 0.2, jit: 0.12, prio: 4, gap: 0 },
      (i, t) => {
        let e = hn(0.11)[0];
        return (
          en(
            e,
            i,
            0,
            0.05,
            "bp",
            (n) => 1400 + 2400 * (1 - n),
            0.8,
            (n) => 0.7 * nn(n, 3.4) * Math.min(1, n * 8),
          ),
          e0(e, i, 0, 0.05, 40, (n) => n * n, 0.5),
          We(e, 420 + t * 25, 0.16, 0.03, { atk: 0.001 }),
          rn([e], 1, { fade: 0.03 })
        );
      },
    ],
    _groan: [
      4,
      0.16,
      { hall: 0.4, room: 0.1, jit: 0.08, prio: 4 },
      (i, t) => {
        let n = hn(3.6)[0],
          o = new Float32Array(n.length),
          s = 0,
          a = 0,
          r = 38 + t * 7 + i() * 6;
        for (let c = 0; c < 3.2 * 48e3; c++) {
          let u = c / (3.2 * 48e3),
            f = r * (1 + 0.22 * Math.sin(u * 3.1 + t) + 0.05 * Math.sin(u * 19));
          ((s += f / 48e3),
            s > 1 && ((s -= 1 + (i() - 0.5) * 0.12), (a = 1)),
            (a *= 0.985),
            (o[c] =
              (a + (i() - 0.5) * 0.06 * a) *
              Math.sin(Math.PI * u) ** 1.2 *
              (0.65 + 0.35 * Math.sin(u * 11 + t * 2))));
        }
        let l = [
          [92 + t * 8, 9, 1.2],
          [176 + t * 14, 12, 1],
          [287 + t * 11, 15, 0.7],
          [463, 15, 0.4],
          [720, 14, 0.18],
        ].map(([c, u, f]) => [new Pi(c, u), f]);
        for (let c = 0; c < n.length; c++) {
          let u = 0;
          for (let [f, h] of l) (f.run(o[c]), (u += f.bp * h));
          n[c] = Math.tanh(u * 1.5);
        }
        return rn([n], 1, { fade: 0.3 });
      },
    ],
    _chirp: [
      7,
      0.07,
      { hall: 0.4, room: 0.1, jit: 0.1, prio: 6 },
      (i, t) => {
        let e = hn(1.1)[0],
          n = 0.01,
          o = 1 + Math.floor(i() * 4) + (t % 3),
          s = 1700 + i() * 1300;
        for (let a = 0; a < o && n < 0.85; a++) {
          let r = 0.045 + i() * 0.09,
            l = s * (0.85 + i() * 0.4),
            c = s * (0.85 + i() * 0.45),
            u = (i() - 0.4) * 500,
            f = i() < 0.3 ? 120 : 0;
          (ii(
            e,
            n,
            r,
            (h) => jn(l, c, h) + u * Math.sin(Math.PI * h) + f * Math.sin(h * 60),
            (h) => Math.sin(Math.PI * Math.pow(h, 0.7)) ** 1.5 * (0.6 + 0.4 * i()),
          ),
            (n += r + 0.03 + i() * 0.1));
        }
        return rn([e], 1);
      },
    ],
  };

var lc = (i, t) => Array.from({ length: i }, (e, n) => [n + 1, t(n + 1)]).filter((e) => e[1] > 1e-4),
  z3 = (i, t) => (e) => {
    let n = i * e,
      o = 0;
    for (let [s, a, r] of t) o += r * Math.exp(-(((n - s) / a) ** 2));
    return o / Math.pow(e, 0.55) + 0.012 / e;
  },
  tA = [
    [700, 190, 1],
    [1150, 210, 0.55],
    [2700, 420, 0.16],
    [3500, 500, 0.06],
  ],
  eA = [
    [330, 120, 1],
    [720, 170, 0.34],
    [2350, 380, 0.035],
  ],
  cc = {
    strings: {
      f: Gt(6),
      make: () =>
        _o({
          f: Gt(6),
          parts: lc(
            34,
            (i) =>
              (Math.pow(i, -1.15) * (1 + 0.7 * Math.exp(-(((i * Gt(6) - 480) / 260) ** 2)))) /
              (1 + ((i * Gt(6)) / 3400) ** 2),
          ),
          bw: 26,
          seed: 11,
        }),
    },
    low: {
      f: Gt(2),
      make: () =>
        _o({
          f: Gt(2),
          parts: lc(26, (i) => Math.pow(i, -1.25) / (1 + ((i * Gt(2)) / 900) ** 2)),
          bw: 16,
          seed: 12,
          mono: 140,
        }),
    },
    warm: {
      f: Gt(4),
      make: () =>
        _o({
          f: Gt(4),
          parts: lc(16, (i) => Math.pow(i, -1.7) / (1 + ((i * Gt(4)) / 1500) ** 2)),
          bw: 20,
          seed: 13,
        }),
    },
    choir: {
      f: Gt(6),
      make: () => {
        let i = z3(Gt(6), tA);
        return _o({ f: Gt(6), parts: lc(24, i), bw: 32, seed: 14 });
      },
    },
    oo: {
      f: Gt(8),
      make: () => {
        let i = z3(Gt(8), eA);
        return _o({
          f: Gt(8),
          parts: lc(14, i),
          bw: 34,
          seed: 15,
          noise: (t) => (t > 300 && t < 5e3 ? 0.0016 * Math.exp(-(((t - 2400) / 1500) ** 2)) : 0),
        });
      },
    },
    glass: {
      f: Gt(12),
      make: () =>
        _o({
          f: Gt(12),
          parts: [
            [1, 1, 5],
            [2, 0.16, 8],
            [2.71, 0.1, 10],
            [5.15, 0.03, 14],
            [0.5, 0.05, 4],
          ],
          bw: 5,
          seed: 16,
          mono: 60,
        }),
    },
    organ: {
      f: Gt(4),
      make: () =>
        _o({
          f: Gt(4),
          parts: [
            [0.5, 0.34, 8],
            [1, 1, 8],
            [1.5, 0.16, 8],
            [2, 0.62, 8],
            [3, 0.3, 9],
            [4, 0.3, 9],
            [5, 0.07, 9],
            [6, 0.12, 10],
            [8, 0.12, 10],
            [10, 0.03, 10],
            [12, 0.03, 10],
            [16, 0.025, 12],
          ],
          bw: 9,
          seed: 17,
        }),
    },
    solo: {
      f: Gt(6),
      make: () =>
        _o({
          f: Gt(6),
          parts: lc(
            30,
            (i) =>
              (Math.pow(i, -0.95) *
                (0.5 +
                  Math.exp(-(((i * Gt(6) - 480) / 190) ** 2)) +
                  0.55 * Math.exp(-(((i * Gt(6) - 1150) / 320) ** 2)))) /
              (1 + ((i * Gt(6)) / 3e3) ** 2),
          ),
          bw: 2.4,
          seed: 18,
          mono: 900,
          noise: (i) => (i > 400 && i < 6e3 ? 7e-4 * Math.exp(-(((i - 2400) / 1500) ** 2)) : 0),
        }),
    },
    air: {
      f: Gt(12),
      make: () =>
        _o({
          f: Gt(12),
          parts: [
            [1, 1, 60],
            [2, 0.5, 90],
            [3, 0.22, 110],
            [4, 0.16, 130],
            [6, 0.07, 150],
          ],
          bw: 80,
          seed: 19,
          noise: (i) => 0.008 * Math.exp(-(((i - 900) / 900) ** 2)),
        }),
    },
    iron: {
      f: Gt(3),
      make: () =>
        _o({
          f: Gt(3),
          parts: [
            [1, 1, 12],
            [1.47, 0.5, 14],
            [2.09, 0.5, 12],
            [2.56, 0.3, 12],
            [3.41, 0.2, 14],
            [4.53, 0.1, 14],
            [6.2, 0.05, 16],
          ],
          bw: 12,
          seed: 20,
        }),
    },
    hum: {
      f: 100,
      make: () =>
        _o({
          f: 100,
          parts: [
            [1, 1, 1],
            [2, 0.5, 1],
            [3, 0.34, 1],
            [4, 0.2, 1],
            [5, 0.13, 1],
            [6, 0.12, 1],
            [8, 0.06, 1],
            [10, 0.045, 1],
            [12, 0.05, 1],
            [14, 0.03, 1],
            [16, 0.02, 1],
            [20, 0.016, 1],
          ],
          bw: 1,
          seed: 21,
          mono: 1e4,
        }),
    },
    sine: { f: Gt(8), make: () => _o({ f: Gt(8), parts: [[1, 1, 0.2]], bw: 0.2, seed: 22, mono: 1e4 }) },
    pink: { f: 1, make: () => qf((i) => (i < 20 ? 0 : 1 / Math.sqrt(i)), { seed: 31 }) },
    brown: { f: 1, make: () => qf((i) => (i < 24 ? 0 : 1 / i), { seed: 32 }) },
    room: {
      f: 1,
      make: () =>
        qf(
          (i) =>
            i < 28
              ? 0
              : (1 / Math.pow(i, 1.05) / (1 + (i / 900) ** 2)) *
                (1 + 0.8 * Math.exp(-(((i - 210) / 60) ** 2))),
          { seed: 33 },
        ),
    },
    hiss: {
      f: 1,
      make: () =>
        qf((i) => (i < 300 ? 0 : Math.exp(-(((i - 3600) / 2600) ** 2)) + 0.12), { seed: 34, sr: 32e3 }),
    },
    rip: {
      f: 1,
      make: function* () {
        let i = Eo(35),
          t = 3 * 48e3,
          [e, n] = [new Float32Array(t), new Float32Array(t)];
        for (let [s, a] of [
          [e, 3],
          [n, 4],
        ]) {
          let r = Eo(a + 40),
            l = 0,
            c = 1,
            u = 0;
          for (let x = 0; x < t; x++)
            (--u < 0 && ((u = 48e3 * (0.012 + i() * i() * 0.11)), (c = 0.35 + 0.65 * i())),
              r() < (3300 * c) / 48e3 ? (l = (r() * 2 - 1) * (0.25 + r() * r())) : (l *= 0.62),
              (s[x] = l * c),
              (x & 16383) === 0 && (yield));
          let f = new Pi(2100, 0.9),
            h = new Pi(4300, 0.9),
            d = new Pi(900, 1),
            p = new Pi(7e3, 0.6);
          for (let x = 0; x < 2; x++)
            for (let v = 0; v < t; v++) {
              let m = s[v];
              if (x === 0 && v > 4e3) continue;
              (f.run(m), h.run(m), d.run(m));
              let g = p.run(f.bp + 0.5 * h.bp + 0.5 * d.bp);
              (x === 1 && (s[v] = g), (v & 16383) === 0 && (yield));
            }
        }
        let o = 2400;
        for (let s of [e, n])
          for (let a = 0; a < o; a++) {
            let r = a / o;
            s[t - o + a] =
              s[t - o + a] * Math.cos((r * Math.PI) / 2) + s[o - a] * Math.sin((r * Math.PI) / 2);
          }
        return (rn([e, n], 0.5, { fade: 0 }), { ch: [e, n], sr: 48e3 });
      },
    },
    murmurA: { f: 1, make: () => X1(51, 260, [8, 9, 10, 12], 1) },
    murmurB: { f: 1, make: () => X1(52, 700, [12, 16, 18, 20, 24], 1) },
    murmurC: { f: 1, make: () => X1(53, 1300, [16, 18, 20, 22, 24, 27, 32], 1.5) },
  };

function* X1(i, t, e, n) {
  let o = Eo(i),
    s = 32e3,
    a = Math.floor(8.2 * s) + (i % 5) * 9e3,
    r = new Float32Array(a),
    l = new Float32Array(a),
    c = [
      [700, 1150],
      [480, 1750],
      [350, 2100],
      [560, 900],
      [400, 800],
    ],
    u = [];
  for (let d = 0; d < 26; d++) {
    let p = Gt(e[d % e.length]) * (1 + (o() - 0.5) * 0.006),
      x = 0.07 + o() * 0.1,
      v = Math.floor(x * s),
      m = new Float32Array(v),
      [g, b] = c[Math.floor(o() * c.length)],
      y = (o() - 0.5) * 0.05;
    for (let S = 1; S * p < 4200; S++) {
      let M = p * S,
        w = Math.exp(-(((M - g) / 200) ** 2)) + 0.5 * n * Math.exp(-(((M - b) / 260) ** 2)) + 0.05 / S;
      if (w < 0.01) continue;
      let E = o() * So;
      for (let T = 0; T < v; T++) {
        let _ = T / v;
        ((m[T] += w * Math.sin(E) * Math.sin(Math.PI * Math.pow(_, 0.7)) ** 2),
          (E += (So * M * (1 + y * _)) / s));
      }
    }
    (u.push(m), d % 2 && (yield));
  }
  for (let d = 0; d < t; d++) {
    let p = u[Math.floor(o() * u.length)],
      x = Math.floor(o() * a),
      v = o(),
      m = Math.pow(o(), 2) * (0.6 + 0.4 * Math.sin((x / a) * So * 3 + i)),
      g = m * Math.sqrt(1 - v),
      b = m * Math.sqrt(v),
      y = 0.94 + o() * 0.12;
    for (let S = 0, M = 0; M < p.length - 1; S++, M += y) {
      let w = M | 0,
        E = p[w] + (p[w + 1] - p[w]) * (M - w),
        T = (x + S) % a;
      ((r[T] += E * g), (l[T] += E * b));
    }
    d % 40 === 0 && (yield);
  }
  let f = 0;
  for (let d = 0; d < a; d++) f += r[d] * r[d];
  let h = 0.1 / Math.sqrt(f / a);
  for (let d of [r, l]) for (let p = 0; p < a; p++) d[p] *= h;
  return { ch: [r, l], sr: s };
}

function* nA(i, t) {
  let e = i > 400 ? 2 : 2.8,
    n = hn(e)[0],
    o = Eo(t),
    s = 48e3 / i - 0.5,
    a = Math.floor(s),
    r = s - a,
    l = new Float32Array(a + 2),
    c = a + 1,
    u = 0;
  for (let b = 0; b < c; b++) ((u += (o() * 2 - 1 - u) * 0.42), (l[b] = u));
  let f = Math.floor(a * 0.19),
    h = l.slice();
  for (let b = 0; b < c; b++) l[b] = h[b] - 0.85 * h[(b + f) % c];
  let d = 0,
    p = 0,
    x = Math.exp(-6.91 / (i * (i > 400 ? 1.5 : 2.4))),
    v = 0.36;
  for (let b = 0; b < n.length; b++) {
    let y = l[d],
      S = l[(d + 1) % c];
    p = (y + (S - y) * (1 - r)) * (1 - v) + p * v;
    let w = p * x;
    ((n[b] = y), (l[d] = w), (d = (d + 1) % c), (b & 8191) === 0 && (yield));
  }
  let m = new Pi(210, 1.6),
    g = new Pi(3600, 0.6);
  for (let b = 0; b < n.length; b++) (m.run(n[b]), (n[b] = g.run(n[b] + m.bp * 0.7) * Math.min(1, b / 40)));
  return (rn([n], 0.3, { fade: 0.5 }), { ch: [n], sr: 48e3 });
}

function iA(i, t) {
  let e = hn(1.5)[0],
    n = Eo(t),
    o = Vn(520 / i, 0.35, 1.5);
  return (
    We(e, i, 0.9, o, { atk: 0.002 }),
    We(e, i * 3.932, 0.16, o * 0.28, { atk: 0.001 }),
    We(e, i * 9.24, 0.05, o * 0.09),
    We(e, i * 2, 0.03, o * 0.5, { atk: 0.003 }),
    en(
      e,
      n,
      0,
      0.014,
      "lp",
      () => 1400,
      0.7,
      (s) => 0.16 * Math.exp(-4 * s),
    ),
    rn([e], 0.3, { fade: 0.2 }),
    { ch: [e], sr: 48e3 }
  );
}

function oA(i, t) {
  let e = Eo(t),
    [n, o] = hn(3.4, 2);
  for (let [s, a, r] of [
    [1, 0.9, 2.8],
    [2.003, 0.13, 1.6],
    [2.756, 0.1, 0.8],
    [5.404, 0.03, 0.35],
  ])
    for (let l of [n, o]) We(l, i * s * (1 + (e() - 0.5) * 0.0012), a, r, { atk: 0.012, ph: e() * 0.5 });
  return (rn([n, o], 0.3, { fade: 0.6 }), { ch: [n, o], sr: 48e3 });
}

function sA(i) {
  let t = hn(0.5)[0];
  return (
    ii(
      t,
      0,
      0.46,
      () => i,
      (e) => Math.sin(Math.PI * Math.pow(e, 0.3)) ** 2,
    ),
    rn([t], 0.3, { fade: 0.02 }),
    { ch: [t], sr: 48e3 }
  );
}

function I3(i) {
  let t = Eo(i),
    e = 48e3,
    n = Math.floor(0.22 * e),
    o = new Float32Array(n + 200),
    s = Gt(8),
    a = [
      [700, 1150],
      [480, 1750],
      [350, 2100],
      [560, 900],
      [400, 800],
    ][i % 5];
  for (let r = 1; r * s < 4200; r++) {
    let l = s * r,
      c = Math.exp(-(((l - a[0]) / 200) ** 2)) + 0.4 * Math.exp(-(((l - a[1]) / 260) ** 2)) + 0.05 / r;
    if (c < 0.01) continue;
    let u = t() * So;
    for (let f = 0; f < n; f++) {
      let h = f / n;
      ((o[f] += c * Math.sin(u) * Math.sin(Math.PI * Math.pow(h, 0.6)) ** 2),
        (u += (So * l * (1 + 0.012 * Math.sin(h * 9 + i))) / e));
    }
  }
  return (rn([o], 0.3), { ch: [o], sr: e });
}

var aA = (i) =>
    function () {
      let t = i(),
        e = (n) => (n.ch.forEach((o) => o.reverse()), n);
      return t && t.next
        ? (function* () {
            return e(yield* t);
          })()
        : e(t);
    },
  n0 = {
    pluck: [4, 8, 16, 32],
    marimba: [2, 4, 8, 16, 32],
    glass: [8, 16, 32],
    dot: [8, 16, 32],
    rpluck: [4, 8, 16],
    rmarimba: [4, 8, 16],
    rglass: [8, 16, 32],
    voice: [8],
  };

function N3(i, { seed: t = 1, pre: e = 0, damp: n = 3, bright: o = 1, sr: s = 44100, early: a = 0 } = {}) {
  return function* () {
    let r = Math.floor(i * s),
      l = [new Float32Array(r), new Float32Array(r)];
    for (let c = 0; c < 2; c++) {
      let u = Eo(t + c * 7),
        f = l[c],
        h = 0,
        d = 0,
        p = Math.floor(e * s);
      for (let m = p; m < r; m++) {
        let g = (m - p) / (r - p),
          b = Vn(0.62 * o * Math.exp(-n * g) + 0.03, 0.01, 1);
        ((h += (u() * 2 - 1 - h) * b),
          (d += (h - d) * Vn(b * 1.6, 0, 1)),
          (f[m] = (d * Math.exp(-6.2 * g) * Math.min(1, (m - p) / (0.012 * s))) / Math.sqrt(b)),
          (m & 16383) === 0 && (yield));
      }
      for (let m = 0; m < a; m++) {
        let g = Math.floor((0.004 + 0.05 * Math.pow(u(), 1.3)) * s);
        g < r && (f[g] += (u() < 0.5 ? -1 : 1) * 0.5 * Math.exp(-m * 0.12));
      }
      let x = 0,
        v = 0;
      for (let m = 0; m < r; m++) {
        let g = f[m];
        ((v = g - x + 0.985 * v), (x = g), (f[m] = v));
      }
    }
    return { ch: l, sr: s };
  };
}

function k3() {
  let i = {};
  for (let o in Sr) {
    let [s, a, r, l] = Sr[o];
    for (let c = 0; c < s; c++)
      i["hit." + o + "." + c] = {
        prio: (r.prio ?? 5) + c * 0.01,
        make: function* () {
          let u = l(Eo(o.length * 131 + o.charCodeAt(0) * 17 + o.charCodeAt(1) * 5 + c * 977 + 3), c);
          u.next && (u = yield* u);
          for (let f of u) for (let h = 0; h < f.length; h++) f[h] *= a;
          return { ch: u, sr: 48e3 };
        },
      };
  }
  let t = {
    hum: 0,
    room: 0,
    pink: 1,
    strings: 1.5,
    air: 1.6,
    warm: 1.7,
    low: 2.5,
    brown: 2.6,
    iron: 2.8,
    hiss: 3.2,
    organ: 4,
    choir: 4,
    oo: 4.2,
    murmurA: 4.3,
    murmurB: 4.4,
    murmurC: 4.5,
    glass: 4,
    solo: 5,
    rip: 5,
    sine: 5.5,
  };
  for (let o in cc) i["pad." + o] = { prio: t[o] ?? 5, make: cc[o].make };
  let e = {
      pluck: 0.5,
      marimba: 3.6,
      glass: 4.6,
      dot: 5.4,
      voice: 4.4,
      rpluck: 6,
      rmarimba: 6.1,
      rglass: 6.2,
    },
    n = {
      pluck: (o) => () => nA(Gt(o), o + 5),
      marimba: (o) => () => iA(Gt(o), o + 6),
      glass: (o) => () => oA(Gt(o), o + 7),
      dot: (o) => () => sA(Gt(o)),
      voice: () => () => I3(3),
    };
  for (let o in n0)
    for (let s of n0[o]) {
      let a = o[0] === "r" ? o.slice(1) : o;
      i["ins." + o + "." + s] = { prio: e[o], make: o[0] === "r" ? aA(n[a](s)) : n[a](s) };
    }
  for (let o = 0; o < 5; o++) i["ins.voice" + o + ".8"] = { prio: 4.4, make: () => I3(o) };
  return (
    (i["ir.hall"] = { prio: 0.2, make: N3(4.6, { seed: 71, pre: 0.022, damp: 3.2, bright: 0.85 }) }),
    (i["ir.room"] = { prio: 0.3, make: N3(0.55, { seed: 72, pre: 0.004, damp: 2, bright: 0.8, early: 14 }) }),
    i
  );
}

function D3(i, { now: t = () => performance.now() } = {}) {
  let e = new Map(),
    n = [],
    o = null,
    s = 0,
    a = Object.keys(i).sort((d, p) => (i[d].prio ?? 5) - (i[p].prio ?? 5)),
    r = (d) => {
      let p = new AudioBuffer({ length: d.ch[0].length, numberOfChannels: d.ch.length, sampleRate: d.sr });
      return (d.ch.forEach((x, v) => p.copyToChannel(x, v)), p);
    },
    l = (d) => {
      try {
        let p = i[d].make();
        p && typeof p.next == "function" ? (o = { n: d, it: p }) : (e.set(d, p ? r(p) : null), (o = null));
      } catch {
        (e.set(d, null), (o = null));
      }
    },
    c = () => {
      try {
        let d = o.it.next();
        d.done && (e.set(o.n, r(d.value)), (o = null));
      } catch {
        (e.set(o.n, null), (o = null));
      }
    },
    u = () => {
      for (; n.length;) {
        let d = n.pop();
        if (!e.has(d) && i[d]) return d;
      }
      for (; a.length;) {
        let d = a.shift();
        if (!e.has(d)) return d;
      }
      return null;
    },
    f = (d) => {
      let p = t();
      do
        if (o) c();
        else {
          let x = u();
          if (!x) return !1;
          l(x);
        }
      while (t() - p < d);
      return !0;
    };
  return {
    get: (d) => e.get(d) || null,
    has: (d) => !!e.get(d),
    need(d) {
      !e.has(d) && i[d] && !(o && o.n === d) && !n.includes(d) && n.push(d);
    },
    sync(d) {
      if (e.has(d) || !i[d]) return e.get(d) || null;
      let p = o;
      if (p && p.n === d) {
        for (; o;) c();
        return e.get(d);
      }
      for (o = null, l(d); o;) c();
      return ((o = p), e.get(d) || null);
    },
    all() {
      for (; f(1e9););
    },
    run(d = 16, p = 3) {
      if (s) return;
      let x = () => {
        s = f(n.length ? p * 2 : p) ? setTimeout(x, d) : 0;
      };
      s = setTimeout(x, 250);
    },
    stats: () => ({ done: e.size, left: a.length }),
  };
}

function U3(i, t) {
  let e = (m = 1) => {
      let g = i.createGain();
      return ((g.gain.value = m), g);
    },
    n = {
      ctx: i,
      bank: t,
      get now() {
        return i.currentTime;
      },
      H: Gt,
    },
    o = e(1),
    s = i.createDynamicsCompressor(),
    a = e(1),
    r = i.createWaveShaper(),
    l = e(1);
  ((s.threshold.value = -15),
    (s.knee.value = 10),
    (s.ratio.value = 5),
    (s.attack.value = 0.004),
    (s.release.value = 0.22),
    (a.gain.value = n.makeDown = 0.557));
  {
    let g = new Float32Array(4097),
      b = 0.26,
      y = 0.4;
    for (let S = 0; S < 4097; S++) {
      let M = (S / 4096) * 2 - 1,
        w = Math.abs(M),
        E = w < b ? w : b + (y - b) * Math.tanh((w - b) / (y - b));
      g[S] = Math.sign(M) * E;
    }
    r.curve = g;
  }
  (o.connect(s),
    s.connect(a),
    a.connect(r),
    r.connect(l),
    l.connect(i.destination),
    (n.master = l),
    (n.sum = o),
    (n.bedBus = e(1)),
    (n.hitBus = e(1)),
    (n.trBus = e(1)));
  for (let m of [n.bedBus, n.hitBus, n.trBus]) m.connect(o);
  let c = e(1),
    u = e(1);
  ((n.hall = c), (n.room = u));
  let f = !1,
    h = !1,
    d = (m) => {
      if (!m || m.sampleRate === i.sampleRate) return m;
      let g = i.createBuffer(m.numberOfChannels, m.length, i.sampleRate);
      for (let b = 0; b < m.numberOfChannels; b++) g.copyToChannel(m.getChannelData(b), b);
      return g;
    };
  ((n.ready = (m) => {
    if (!f && m !== 1) {
      let g = d(t.get("ir.hall"));
      if (g) {
        let b = i.createConvolver();
        b.buffer = g;
        let y = e(1);
        (c.connect(b), b.connect(y), y.connect(o), (f = !0));
      }
    }
    if (!h) {
      let g = d(t.get("ir.room"));
      if (g) {
        let b = i.createConvolver();
        b.buffer = g;
        let y = e(0.8);
        (u.connect(b), b.connect(y), y.connect(o), (h = !0));
      }
    }
  }),
    (n.group = (m, { gain: g = 1, mid: b = 0.25, wet: y = 0.6, room: S = 0 } = {}) => {
      let M = e(g),
        w = e(g),
        E = e(),
        T = e(),
        _ = e(),
        R = e(b),
        L = e(y);
      if (
        (M.connect(m),
        w.connect(c),
        E.connect(M),
        T.connect(M),
        _.connect(M),
        T.connect(R),
        _.connect(L),
        R.connect(w),
        L.connect(w),
        S)
      ) {
        let k = e(S);
        (M.connect(k), k.connect(u));
      }
      return {
        dry: E,
        mid: T,
        wet: _,
        out: M,
        send: w,
        fade(k, P, C) {
          for (let A of [M.gain, w.gain])
            try {
              let N = i.currentTime,
                G = A.value;
              (A.cancelScheduledValues(N),
                P > N + 0.01 && A.setValueAtTime(G, N),
                A.setValueAtTime(G, Math.max(N, P)),
                A.linearRampToValueAtTime(k, Math.max(N, P) + Math.max(0.01, C)));
            } catch {}
        },
        free() {
          try {
            for (let k of [M, w, E, T, _, R, L]) k.disconnect();
          } catch {}
        },
      };
    }));
  let p = (n.hold = (m, g) => {
    try {
      if (m.cancelAndHoldAtTime) m.cancelAndHoldAtTime(g);
      else {
        let b = m.value;
        (m.cancelScheduledValues(g), m.setValueAtTime(b, g));
      }
    } catch {}
  });
  ((n.curve = (m, g, b, y, S) => {
    m.setValueAtTime(y[0][1], g + y[0][0] * b);
    for (let M = 1; M < y.length; M++)
      S
        ? m.exponentialRampToValueAtTime(Math.max(1e-4, y[M][1]), g + y[M][0] * b)
        : m.linearRampToValueAtTime(y[M][1], g + y[M][0] * b);
  }),
    (n.play = (
      m,
      g,
      {
        g: b = 1,
        rate: y = 1,
        pan: S = 0,
        to: M,
        dur: w = 0,
        loop: E = !1,
        offset: T = 0,
        lp: _ = 0,
        hp: R = 0,
        atk: L = 0,
        rel: k = 0,
      } = {},
    ) => {
      if (!m) return null;
      let P = i.createBufferSource();
      ((P.buffer = m), (P.playbackRate.value = y), (P.loop = E));
      let C = P,
        A = null,
        N = null;
      (_ &&
        ((A = i.createBiquadFilter()),
        (A.type = "lowpass"),
        (A.frequency.value = _),
        (A.Q.value = 0.5),
        C.connect(A),
        (C = A)),
        R &&
          ((N = i.createBiquadFilter()),
          (N.type = "highpass"),
          (N.frequency.value = R),
          (N.Q.value = 0.5),
          C.connect(N),
          (C = N)));
      let G = e(b);
      (C.connect(G), (C = G));
      let B = null;
      return (
        S && ((B = i.createStereoPanner()), (B.pan.value = Vn(S, -1, 1)), C.connect(B), (C = B)),
        C.connect(M || n.hitBus),
        (g = Math.max(g, i.currentTime)),
        L && (G.gain.setValueAtTime(0, g), G.gain.linearRampToValueAtTime(b, g + L)),
        P.start(g, T),
        w &&
          (k && (G.gain.setValueAtTime(b, g + w - k), G.gain.linearRampToValueAtTime(0, g + w)),
          P.stop(g + w + 0.02)),
        (P.onended = () => {
          try {
            (P.disconnect(),
              G.disconnect(),
              A && A.disconnect(),
              N && N.disconnect(),
              B && B.disconnect(),
              C.disconnect());
          } catch {}
        }),
        { src: P, g: G.gain, lp: A && A.frequency, hp: N && N.frequency, pan: B && B.pan, t: g }
      );
    }),
    (n.note = (m, g, b, y = {}) => {
      let S = n0[m];
      if (!S) return;
      let M = S[0],
        w = 9;
      for (let _ of S) {
        let R = Math.abs(Math.log2(g / Gt(_)));
        R < w && ((w = R), (M = _));
      }
      let E = "ins." + m + "." + M,
        T = t.get(E);
      return T ? n.play(T, b, { ...y, rate: g / Gt(M) }) : (t.need(E), null);
    }),
    (n.voice = (m, g, b, y) => {
      let S = "ins.voice" + m + ".8",
        M = t.get(S);
      if (!M) {
        t.need(S);
        return;
      }
      return n.play(M, b, { ...y, rate: g / Gt(8) });
    }));
  let x = {};
  n.raw = (m, g, { g: b = 1, rate: y = 1, pan: S = 0, to: M, v: w, dur: E, offset: T, lp: _ } = {}) => {
    let R = Sr[m];
    if (!R) return null;
    let L = w ?? Math.floor(Math.random() * R[0]);
    (w == null && R[0] > 1 && L === x[m] && (L = (L + 1) % R[0]), (x[m] = L));
    let k = "hit." + m + "." + L,
      P = t.get(k);
    if (!P) {
      for (let C = 0; C < R[0] && !P; C++) P = t.get("hit." + m + "." + C);
      t.need(k);
    }
    return n.play(P, g, { g: b, rate: y, pan: S, to: M, dur: E, offset: T, lp: _ });
  };
  class v {
    constructor(
      g,
      b,
      {
        g: y = 0.2,
        atk: S = 2,
        lp: M = 0,
        hp: w = 0,
        pan: E = 0,
        to: T,
        drift: _ = 0.22,
        loopAt: R = -1,
        q: L = 0.6,
      } = {},
    ) {
      (Object.assign(this, {
        name: g,
        f: b,
        g: y,
        atk: S,
        pan: E,
        to: T,
        drift: _,
        lp0: M,
        hp0: w,
        q: L,
        ph: Math.random() * 6.28,
        sp: 0.12 + Math.random() * 0.22,
        dead: !1,
        src: null,
        t0: 0,
        at: R,
      }),
        this.begin());
    }
    begin() {
      let g = "pad." + this.name,
        b = t.get(g);
      if (!b) {
        t.need(g);
        return;
      }
      let y = i.currentTime,
        S = i.createBufferSource();
      ((S.buffer = b), (S.loop = !0), (S.playbackRate.value = this.f / cc[this.name].f));
      let M = S;
      if (((this.nodes = [S]), this.lp0)) {
        let T = (this.F = i.createBiquadFilter());
        ((T.type = "lowpass"),
          (T.frequency.value = this.lp0),
          (T.Q.value = this.q),
          M.connect(T),
          (M = T),
          this.nodes.push(T));
      }
      if (this.hp0) {
        let T = (this.HP = i.createBiquadFilter());
        ((T.type = "highpass"),
          (T.frequency.value = this.hp0),
          (T.Q.value = 0.5),
          M.connect(T),
          (M = T),
          this.nodes.push(T));
      }
      let w = (this.A = i.createGain());
      ((w.gain.value = 0), M.connect(w), (M = w), this.nodes.push(w));
      let E = (this.D = i.createGain());
      if ((M.connect(E), (M = E), this.nodes.push(E), this.pan)) {
        let T = i.createStereoPanner();
        ((T.pan.value = this.pan), M.connect(T), (M = T), this.nodes.push(T));
      }
      (M.connect(this.to),
        S.start(y, (this.at >= 0 ? this.at : Math.random()) * b.duration),
        (this.src = S),
        (this.t0 = y),
        w.gain.setValueAtTime(0, y),
        this.g > 0 && w.gain.setTargetAtTime(this.g, y, Math.max(0.01, this.atk / 3)));
    }
    set(g, b = 1) {
      if (this.dead) return this;
      if (this.g === g) return this;
      if (((this.g = g), !this.src)) return ((this.atk = b * 3), this);
      let y = this.A.gain,
        S = i.currentTime;
      return (p(y, S), y.setTargetAtTime(g, S, Math.max(0.005, b)), this);
    }
    ramp(g, b) {
      if (this.dead) return this;
      if (((this.g = g), !this.src)) return this;
      let y = this.A.gain,
        S = i.currentTime;
      return (p(y, S), y.linearRampToValueAtTime(g, S + b), this);
    }
    freq(g, b = 0.05) {
      return (
        (this.f = g),
        this.src && this.src.playbackRate.setTargetAtTime(g / cc[this.name].f, i.currentTime, b),
        this
      );
    }
    jump(g) {
      if (((this.f = g), this.src)) {
        let b = this.src.playbackRate;
        (b.cancelScheduledValues(i.currentTime), b.setValueAtTime(g / cc[this.name].f, i.currentTime));
      }
      return this;
    }
    cut(g, b = 0.6) {
      return ((this.lp0 = g), this.F && this.F.frequency.setTargetAtTime(g, i.currentTime, b), this);
    }
    low(g, b = 0.6) {
      return ((this.hp0 = g), this.HP && this.HP.frequency.setTargetAtTime(g, i.currentTime, b), this);
    }
    breathe(g) {
      if (!this.src) {
        this.begin();
        return;
      }
      this.drift &&
        this.D.gain.setTargetAtTime(
          1 +
            this.drift *
              (0.65 * Math.sin(g * this.sp * 6.28 + this.ph) +
                0.35 * Math.sin(g * this.sp * 2.71 * 6.28 + this.ph * 2)),
          g,
          0.25,
        );
    }
    kill(g = i.currentTime, b = 0.3) {
      if (!this.dead && ((this.dead = !0), !!this.src))
        try {
          (p(this.A.gain, g), this.A.gain.setTargetAtTime(0, g, b / 4), this.src.stop(g + b * 1.6 + 0.05));
          let y = this.nodes;
          this.src.onended = () => {
            for (let S of y)
              try {
                S.disconnect();
              } catch {}
          };
        } catch {}
    }
  }
  return ((n.pad = (m, g, b) => new v(m, g, { to: n.bedBus, ...b })), n);
}

var H3 = [8, 12, 9, 11],
  rA = 0.28,
  lA = [0, 204, 386, 551, 702, 906, 1088],
  cA = [1, 9 / 8, 5 / 4, 11 / 8, 3 / 2, 27 / 16, 15 / 8],
  B3 = (i) => {
    let t = 1,
      e = 9;
    for (let n = -2; n < 3; n++)
      for (let o of cA) {
        let s = o * Math.pow(2, n),
          a = Math.abs(Math.log2(i / s));
        a < e && ((e = a), (t = s));
      }
    return t;
  },
  uA = {
    office: 0.9,
    tower: 0.74,
    boat: 0.85,
    loop: 0.84,
    swarm: 0.64,
    dominoes: 1,
    calendar: 1.15,
    lamp: 0.9,
    selectall: 1,
    aim: 0.8,
    futures: 0.74,
    pile: 1.3,
    questions: 0.9,
  },
  qi = class {
    live() {
      return 0;
    }
    constructor(t, e, n, o, s = {}) {
      ((this.E = t),
        (this.id = e),
        (this.g = t.group(t.bedBus, s)),
        (this.g.out.gain.value = 0),
        (this.g.send.gain.value = 0),
        (this.t0 = t.now),
        (this.trim = uA[e] ?? 1),
        this.g.fade(this.trim, this.t0, o),
        (this.V = []),
        (this.pads = {}),
        (this.beat = -1),
        (this.bt = 0),
        (this.R = Eo(e.length * 31 + e.charCodeAt(0))),
        (this._br = 0),
        (this.settled = n > 0),
        this.init && this.init(),
        this.to(n, !0));
    }
    pad(t, e, n, o = {}) {
      let s = this.E.pad(e, n, { to: this.g[o.bus || "wet"], ...o });
      return (this.V.push(s), t && (this.pads[t] = s), s);
    }
    to(t, e = !1) {
      if (t === this.beat) return;
      let n = !e && t > this.beat;
      ((this.beat = t), (this.bt = this.E.now), (this.fwd = n), this.onBeat && this.onBeat(t, n, e));
    }
    tick(t) {
      if (t - this._br > 0.12) {
        this._br = t;
        for (let e of this.V) e.breathe(t);
      }
      this.step && this.step(t, t + rA, t - this.bt);
    }
    stop(t) {
      this.g.fade(0, this.E.now, t);
      let e = this.E.now + t;
      for (let n of this.V) n.kill(e, 0.25);
      this.endAt = e + 5;
    }
    cutAt(t, e) {
      this.g.fade(0, t, e);
      for (let n of this.V) n.kill(t + e, 0.2);
      this.endAt = t + e + 5;
    }
    free() {
      this.g.free();
    }
    r(t, e) {
      return t + (e - t) * this.R();
    }
  },
  Y1 = class extends qi {
    init() {
      (this.pad("room", "room", 1, { g: 0.04, atk: 0.6, bus: "dry", drift: 0.12 }),
        this.pad("hum", "hum", 100, { g: 0.016, atk: 0.6, bus: "dry", drift: 0.05 }),
        (this.ver = 0),
        (this.queue = []),
        (this.sel = 0),
        (this.lastFig = 0));
    }
    onBeat(t, e) {
      let n = this.pads,
        o = t >= 2;
      if (
        (n.hum.freq(o ? Gt(3) : 100, 2.2).set(o ? 0.026 : 0.016, 1.2), n.room.set(o ? 0.03 : 0.04, 1.5), !o)
      ) {
        ((this.ver = 0), (this.sel = 0));
        for (let s of ["d", "a", "o"]) n[s] && n[s].set(0, 0.5);
      }
      this.lastFig = this.E.now;
    }
    hit(t) {
      t === "select" && this.beat >= 2 && (this.sel++, this.figure(this.E.now + 0.16));
    }
    figure(t) {
      if (t - this.lastFig < 0.25) return;
      this.lastFig = t;
      let e = this.sel,
        n = Math.max(0, e - 4),
        o = this.pads,
        s = e <= 4 ? [0.36, 0.36, 0.34, 0.32, 0.3][e] : Math.max(0.075, 0.27 * Math.pow(0.87, n)),
        a = e <= 4 ? e + 1 : Math.min(16, 4 + n),
        r = n > 6 ? 2 : 1,
        l = [8, 12, 9, 11, 16, 12, 18, 22, 10, 20, 16, 24, 18, 22, 27, 33];
      for (let c = 0; c < a; c++) {
        let u = l[(c + (n > 3 ? n % 3 : 0)) % l.length],
          f = (0.55 + 0.25 * (c === 0) + 0.1 * this.R()) * (0.7 + 0.03 * n);
        this.E.note("pluck", Gt(u) * (c % 5 === 4 ? r : 1), t + c * s * (1 + 0.04 * (this.R() - 0.5)), {
          g: f * 0.62,
          pan: -0.35 + (0.7 * ((c * 5) % 8)) / 8,
          to: this.g.mid,
        });
      }
      if (n >= 2)
        for (let c = 0; c < a; c += 2)
          this.E.note("marimba", Gt(l[c % 4] / 2), t + c * s, {
            g: 0.12 + 0.012 * n,
            to: this.g.mid,
            pan: 0.25,
          });
      n >= 1 &&
        (o.d ||
          (this.pad("d", "warm", Gt(4), { g: 0, atk: 2, lp: 900 }),
          this.pad("a", "strings", Gt(6), { g: 0, atk: 2, lp: 1200 }),
          this.pad("o", "oo", Gt(11), { g: 0, atk: 3 })),
        o.d.set(0.05 + 0.022 * Math.min(8, n), 1.4),
        o.a.set(0.012 * Math.min(9, n), 1.6),
        o.a.cut(900 + 260 * n, 1),
        o.o.set(n > 4 ? 0.008 * (n - 4) : 0, 2));
    }
    step(t) {
      if (this.beat >= 2 && t - this.lastFig > (this.sel > 12 ? 4.2 : 6)) {
        this.sel || (this.sel = 2);
        let e = this.sel;
        (this.sel > 12 && (this.sel = 9 + Math.floor(this.R() * 3)), this.figure(t + 0.05), (this.sel = e));
      }
    }
  },
  K1 = class extends qi {
    init() {
      ((this.pos = [0, 2]), (this.K = 5), (this.vox = []));
      for (let t = 0; t < 2; t++)
        for (let e = 0; e < this.K; e++)
          this.vox.push({
            l: t,
            k: e,
            v: this.pad(null, "strings", 200, {
              g: 0,
              atk: 0.5,
              pan: t ? 0.35 : -0.35,
              drift: 0.12,
              lp: 3200,
            }),
          });
      (this.pad("p1", "low", Gt(2), { g: 0, atk: 3, bus: "mid" }),
        this.pad("p2", "warm", Gt(3), { g: 0, atk: 3, lp: 700 }),
        this.pad("air", "air", Gt(12), { g: 0, atk: 4 }),
        this.pad("thin", "glass", Gt(24), { g: 0, atk: 6 }),
        this.pad("wind", "pink", 1, { g: 0, atk: 3, lp: 900, hp: 260, bus: "mid", drift: 0.5 }),
        (this.lv = 0),
        (this.rate = 0.5),
        (this._p = 0),
        (this.cut = 2400));
    }
    onBeat(t, e, n) {
      let o = this.pads,
        s = t >= 3;
      (o.p1.set([0.3, 0.27, 0.2, 0.012][Math.min(3, t)], 1.6),
        o.p2.set([0.2, 0.22, 0.16, 0.008][Math.min(3, t)], 1.6),
        o.air.set([0.05, 0.07, 0.1, 0.05][Math.min(3, t)], 2),
        o.thin.set(s ? 0.07 : 0.01, 3),
        o.wind.set([0.02, 0.035, 0.06, 0.035][Math.min(3, t)], 2),
        o.wind.cut([700, 1100, 2e3, 3600][Math.min(3, t)], 2),
        o.wind.low([200, 260, 420, 1200][Math.min(3, t)], 2),
        (this.lvT = [0.27, 0.3, 0.3, 0.03][Math.min(3, t)]),
        (this.rateT = [0.5, 0.72, 1.05, 0.34][Math.min(3, t)]),
        n && (this.rate = this.rateT));
    }
    step(t) {
      if (t - this._p < 0.05) return;
      let e = Math.min(0.2, this._p ? t - this._p : 0.05);
      this._p = t;
      let n = 1 - Math.exp(-e / 1.6);
      ((this.lv += (this.lvT - this.lv) * n), (this.rate += (this.rateT - this.rate) * n));
      let o = this.beat >= 3;
      for (let a = 0; a < 2; a++) this.pos[a] += e * this.rate;
      let s = (a) => {
        let r = Math.floor(a),
          l = a - r,
          c = qn((l - 0.5 - 0) / 0.42),
          u = (f) => 1200 * Math.floor(f / 7) + lA[((f % 7) + 7) % 7];
        return jn(u(r), u(r + 1), c);
      };
      for (let a of this.vox) {
        let r = s(this.pos[a.l] + (a.l ? 0.5 : 0)),
          l = this.K * 1200,
          c = (r + a.k * 1200) % l,
          u = c / l,
          f = Gt(1.5) * Math.pow(2, c / 1200),
          h = Math.pow(Math.sin(Math.PI * u), 2) * (1 - 0.45 * u) * (o ? qn((u - 0.45) / 0.4) * 2 : 1);
        (a.x != null && u < a.x - 0.5 ? a.v.jump(f) : a.v.freq(f, 0.045),
          (a.x = u),
          a.v.set(this.lv * h, 0.12));
      }
    }
  },
  j1 = class extends qi {
    init() {
      (this.pad("sea", "brown", 1, { g: 0.2, atk: 2, lp: 420, bus: "dry", drift: 0.1 }),
        this.pad("seb", "pink", 1, { g: 0.09, atk: 2, lp: 700, hp: 120, bus: "dry", drift: 0.1 }),
        this.pad("spray", "hiss", 1, { g: 0, atk: 3, bus: "mid", drift: 0.3, lp: 6e3 }),
        this.pad("lo", "low", Gt(1) * 1, { g: 0.2, atk: 3, bus: "mid", lp: 320 }),
        this.pad("d", "strings", Gt(4), { g: 0.05, atk: 4, lp: 700 }),
        this.pad("f", "strings", Gt(4) * 1.2, { g: 0, atk: 4, lp: 800, pan: 0.3 }),
        this.pad("eb", "strings", (Gt(4) * 16) / 15, { g: 0, atk: 3, lp: 900, pan: -0.3 }),
        this.pad("iron", "iron", Gt(1.5), { g: 0, atk: 3, lp: 900, drift: 0.6 }),
        (this.ch = null),
        (this.next = this.E.now + 1.6),
        (this.sw = 0));
    }
    onBeat(t, e, n) {
      let o = this.pads,
        s = t >= 2;
      if (
        ((this.rel = s),
        o.lo.set(s ? 0.1 : [0.18, 0.24][t] || 0.2, s ? 0.6 : 2),
        o.d.set(s ? 0 : [0.1, 0.13][t], s ? 0.25 : 1.5),
        o.f.set(s ? 0 : [0.085, 0.13][t], s ? 0.25 : 1.5),
        o.eb.set(s ? 0 : [0, 0.1][t], s ? 0.2 : 3),
        o.iron.set(s ? 0.01 : [0.09, 0.17][t], s ? 0.4 : 2.5),
        s)
      ) {
        this.ch ||
          (this.ch = [
            ["low", 2, 0.42, 0, 0.5],
            ["warm", 3, 0.3, -0.2, 0.7],
            ["warm", 4, 0.34, 0.2, 0.7],
            ["warm", 5, 0.2, -0.3, 0.9],
            ["strings", 6, 0.2, 0.35, 1.1],
            ["strings", 8, 0.16, -0.4, 1.3],
            ["choir", 9, 0.085, 0.3, 1.8],
            ["choir", 10, 0.075, -0.3, 2.1],
            ["oo", 12, 0.07, 0.1, 2.4],
            ["strings", 16, 0.035, 0.4, 3],
          ].map(([r, l, c, u, f]) => ({
            v: this.pad(null, r, Gt(l), { g: 0, atk: 2, pan: u, drift: 0.25 }),
            g: c,
            at: f,
          })));
        let a = this.E.now;
        ((this.relT = n ? a - 12 : a),
          this.ch.forEach((r) => r.v.set(r.g * (n ? 0.5 : 0), n ? 1 : 0.05)),
          n || this.E.raw("boom", a + 0.05, { g: 0.5, to: this.g.mid }));
      } else this.ch && this.ch.forEach((a) => a.v.set(0, 0.6));
    }
    step(t, e, n) {
      let o = this.pads;
      if (t - this.sw > 0.2) {
        this.sw = t;
        let s = t * 0.11,
          a = 0.5 + 0.5 * Math.sin(s * 6.28) * 0.7 + 0.3 * 0.5 * Math.sin(s * 2.3 * 6.28),
          r = (this.rel ? 0.62 : 1) * (1 - 0.65 * Math.min(1, 1.5 * this.live("water")));
        if (
          (o.sea.set((0.13 + 0.15 * a) * r, 0.5),
          o.sea.cut(240 + 340 * a, 0.5),
          o.seb.set((0.035 + 0.09 * a * a) * r, 0.5),
          o.spray.set(0.018 * a * a * a * r, 0.5),
          this.ch && this.rel)
        ) {
          let l = t - this.relT;
          this.ch.forEach((c, u) => {
            let f = qn((l - c.at * 0.55) / 1.5),
              h = jn(1, 0.46, qn((l - 5) / 7)),
              d = 1 + 0.12 * Math.sin(t * 0.7 + u);
            c.v.set(c.g * 1.3 * f * h * d, 0.35);
          });
        }
      }
      for (; this.next < e;)
        if (this.rel)
          (this.R() < 0.5 &&
            this.E.raw("creak", this.next, {
              g: 0.12,
              rate: this.r(0.6, 0.8),
              pan: this.r(-0.6, 0.6),
              to: this.g.wet,
            }),
            (this.next += this.r(6, 11)));
        else {
          let s = Math.min(1, this.beat);
          (this.E.raw(this.R() < 0.55 ? "_groan" : "creak", this.next, {
            g: this.r(0.8, 1.4) * (s ? 1.3 : 0.95),
            rate: this.r(0.55, 1),
            pan: this.r(-0.6, 0.6),
            to: this.g.wet,
          }),
            (this.next += this.beat === 1 ? this.r(1.5, 3) : this.r(2.6, 5)));
        }
    }
  },
  i0 = [8, 0, 12, 9, 0, 11, 10, 0, 12, 16, 0, 9, 10, 12, 0, 0],
  bs = i0.length,
  $1 = class extends qi {
    init() {
      ((this.vo = [
        { o: 1, sp: 1, ins: "marimba", oct: 1, pan: -0.25, g: 0.62 },
        { o: 0, sp: 0.5, ins: "marimba", oct: 0.5, pan: 0.25, g: 0.8 },
        { o: 0, sp: 2, ins: "pluck", oct: 2, pan: 0.5, g: 0.2 },
        { o: 0, sp: 0.25, ins: "marimba", oct: 0.25, pan: 0, g: 0.8 },
        { o: 0, sp: 4, ins: "pluck", oct: 4, pan: -0.55, g: 0.1 },
      ].map((t, e) => ({ ...t, i: e, n: 0, next: 0, a: 0 }))),
        (this.start = this.E.now + 0.35),
        this.vo.forEach((t) => {
          t.next = this.start;
        }),
        this.pad("dr", "warm", Gt(6), { g: 0.07, atk: 4, lp: 800 }),
        this.pad("a", "oo", Gt(9), { g: 0.035, atk: 5 }),
        this.pad("b", "low", Gt(3), { g: 0, atk: 4, lp: 320 }),
        (this.ph = 0),
        (this._t = this.E.now));
    }
    onBeat(t) {
      ((this.act = [1, 2, 4, 5, 5][Math.min(4, t)]),
        this.pads.dr.set([0.06, 0.08, 0.09, 0.1][Math.min(3, t)], 2),
        this.pads.a.set([0.02, 0.03, 0.045, 0.06][Math.min(3, t)], 2),
        this.pads.b.set([0, 0.03, 0.06, 0.08][Math.min(3, t)], 3));
    }
    step(t, e) {
      let n = Math.min(0.3, t - this._t);
      this._t = t;
      let o = this.beat >= 3;
      if (o) this.ph += n / 7.5;
      else if (this.ph > 0) {
        let a = this.ph % 1;
        ((this.ph = a < 0.02 ? 0 : a + n * (a > 0.5 ? 0.5 : -0.5)), this.ph >= 1 && (this.ph = 0));
      }
      let s = 60 / 112 / 2;
      for (let a of this.vo) {
        let r = this.beat === 0 && a.i === 1 && t - this.start > s * bs * 2 - 0.2,
          l = a.i < this.act || r ? 1 : 0;
        a.a += (l - a.a) * (1 - Math.exp(-n / 1.1));
      }
      if (!o && this.ph === 0)
        for (let a of this.vo) {
          let r = s / a.sp;
          if (a.mode !== 0) {
            ((a.mode = 0), (a.n = 0));
            let l = this.start + Math.ceil((t - this.start) / (s * bs)) * s * bs;
            ((a.n = 0), (a.next = Math.max(l, t)));
            let c = (t - this.start) / r;
            ((a.n = Math.max(0, Math.ceil(c))), (a.next = this.start + a.n * r));
          }
          for (; a.next < e;)
            (this.fire(a, i0[a.n % bs], a.next, a.oct, a.a * a.g, r), a.n++, (a.next = this.start + a.n * r));
        }
      else {
        let a = this.vo.length;
        for (let r of this.vo) {
          r.mode !== 1 && (r.mode = 1);
          let l = (r.i + this.ph) % a,
            c = Math.pow(2, l - 2),
            u = Math.pow(Math.sin(Math.PI * Vn((l + 0.35) / (a + 0.2))), 1.6),
            f = s / c,
            h = (r.oct0 = [0.25, 0.5, 1, 2, 4][Math.min(4, Math.floor(l + 0.5))] || 1);
          for (r.next < t - 0.1 && (r.next = t + 0.02); r.next < e;)
            (this.fire(
              { ...r, ins: h >= 2 ? "pluck" : "marimba" },
              i0[r.n % bs],
              r.next,
              h,
              u * [1, 0.8, 0.62, 0.22, 0.1][Math.min(4, Math.floor(l + 0.5))],
              f,
            ),
              r.n++,
              (r.next += f));
        }
        this.start = t - ((t - this.start) % (s * bs));
      }
    }
    fire(t, e, n, o, s, a) {
      if (!e || s < 0.015 || a < 0.03) return;
      let r = t.n % bs === 0 ? 1.2 : t.n % 4 === 0 ? 1 : 0.8;
      this.E.note(t.ins, Gt(e) * o, n, {
        g: s * r * (0.85 + 0.3 * this.R()),
        pan: t.pan,
        to: t.sp < 0.5 ? this.g.mid : this.g.mid,
      });
    }
  },
  Z1 = class extends qi {
    init() {
      for (let [t, e, n] of [
        ["m1", "murmurA", 0],
        ["m2", "murmurB", -0.2],
        ["m3", "murmurC", 0.2],
      ])
        this.pad(t, e, 1, { g: 0, atk: 4, pan: n, drift: 0.35 });
      for (let [t, e, n] of [
        ["c1", "oo", 9],
        ["c2", "oo", 12],
        ["c3", "choir", 13.5],
        ["c4", "oo", 11],
        ["c5", "choir", 18],
      ])
        this.pad(t, e, Gt(n), { g: 0, atk: 4, drift: 0.4, pan: ((n % 3) - 1) * 0.4 });
      (this.pad("lo", "low", Gt(2.25), { g: 0, atk: 5, lp: 300 }), (this.next = this.E.now + 0.3));
    }
    onBeat(t, e, n) {
      let o = this.pads,
        s = Math.min(3, t),
        a = n ? 2 : 1.6;
      (o.m1.set([0.035, 0.26, 0.3, 0.34][s], a),
        o.m2.set([0, 0.16, 0.26, 0.34][s], a),
        o.m3.set([0, 0.05, 0.16, 0.28][s], a),
        o.c1.set([0.06, 0.1, 0.12, 0.13][s], a),
        o.c2.set([0.015, 0.07, 0.1, 0.12][s], a),
        o.c3.set([0, 0.04, 0.07, 0.1][s], a),
        o.c4.set([0, 0, 0.06, 0.09][s], a),
        o.c5.set([0, 0, 0.02, 0.05][s], a),
        o.lo.set([0.04, 0.08, 0.13, 0.18][s], a),
        (this.dens = [1.4, 8, 14, 20][s]),
        t > 0 && this.next > this.E.now + 0.3 && (this.next = this.E.now + 0.1));
    }
    step(t, e) {
      for (; this.next < e;) {
        let n = [8, 9, 12, 16, 18, 20, 22, 24],
          o = Gt(n[Math.floor(this.R() * n.length)] * (this.R() < 0.2 ? 2 : 1));
        (this.E.voice(Math.floor(this.R() * 5), o, this.next, {
          g: Math.pow(this.R(), 2) * 0.16 + 0.015,
          pan: this.r(-0.9, 0.9),
          to: this.R() < 0.5 ? this.g.wet : this.g.mid,
        }),
          (this.next += -Math.log(1 - this.R() * 0.98) / this.dens));
      }
    }
  },
  J1 = class extends qi {
    init() {
      (this.pad("rm", "room", 1, { g: 0.035, atk: 1.5, bus: "mid", drift: 0.2 }),
        this.pad("lo", "low", Gt(1), { g: 0, atk: 5, lp: 180, bus: "mid" }),
        this.pad("lo2", "low", (Gt(1) * 16) / 15, { g: 0, atk: 5, lp: 160, bus: "mid" }),
        this.pad("x", "strings", Gt(3), { g: 0, atk: 6, lp: 420, drift: 0.5 }),
        this.pad("x2", "strings", Gt(3) * 1.06, { g: 0, atk: 6, lp: 420, drift: 0.5 }),
        (this.next = this.E.now + 1.2),
        (this.run = 0));
    }
    onBeat(t, e, n) {
      if (((this.dread = t >= 1), (this.dT = n ? -20 : 0), !this.dread))
        for (let o of ["lo", "lo2", "x", "x2"]) this.pads[o].set(o === "lo" ? 0.06 : 0, 1.2);
    }
    step(t, e, n) {
      if (this.dread && t - (this._d || 0) > 0.3) {
        this._d = t;
        let o = this.beat >= 2 ? 1.1 : qn((n - 7.5 - this.dT) / 7),
          s = this.pads;
        (s.lo.set(0.06 + 0.27 * o, 0.8),
          s.lo2.set(0.17 * o, 0.8),
          s.x.set(0.14 * o, 0.8),
          s.x2.set(0.1 * o * (0.5 + 0.5 * Math.sin(t * 0.31)), 0.8));
      }
      for (; this.next < e;)
        this.run <= 0
          ? ((this.run = 1 + Math.floor(this.R() * 5)),
            (this.pan = this.r(-0.8, 0.8)),
            (this.next += this.r(0.9, 2.6)))
          : (this.run--,
            this.E.raw("domino", this.next, {
              g: this.r(0.14, 0.36),
              rate: this.r(0.85, 1.15),
              pan: this.pan + 0.06 * this.run,
              to: this.g.mid,
            }),
            (this.next += this.r(0.07, 0.12)));
    }
  },
  Q1 = class extends qi {
    init() {
      (this.pad("g1", "glass", Gt(13.5), { g: 0.05, atk: 5, drift: 0.6 }),
        this.pad("g2", "glass", Gt(20), { g: 0.03, atk: 6, drift: 0.6, pan: 0.4 }),
        this.pad("g3", "glass", Gt(22), { g: 0, atk: 6, drift: 0.6, pan: -0.4 }),
        this.pad("g4", "glass", Gt(27), { g: 0, atk: 5, drift: 0.6 }),
        this.pad("lo", "low", Gt(27 / 16), { g: 0.06, atk: 4, lp: 260 }),
        this.pad("w", "warm", Gt(6.75), { g: 0.02, atk: 5, lp: 700 }),
        (this.dil = 0),
        (this.n = 0),
        (this.next = this.E.now + 0.6),
        (this.nextP = this.E.now + 2),
        (this.nextG = this.E.now + 3),
        (this._t = this.E.now),
        (this.sub = this.E.now + 0.6));
    }
    onBeat(t, e, n) {
      let o = Math.min(3, t),
        s = this.pads;
      ((this.dilT = [0, 1, 2, 3][o]),
        n && (this.dil = this.dilT),
        s.g1.set([0.075, 0.085, 0.09, 0.09][o], 2),
        s.g2.set([0.03, 0.05, 0.06, 0.07][o], 2),
        s.g3.set([0, 0.03, 0.05, 0.06][o], 2.5),
        s.g4.set([0, 0, 0.03, 0.045][o], 3),
        s.lo.set([0.07, 0.1, 0.13, 0.17][o], 2),
        s.w.set([0.02, 0.04, 0.06, 0.08][o], 2));
    }
    step(t, e) {
      let n = Math.min(0.3, t - this._t);
      ((this._t = t), (this.dil += (this.dilT - this.dil) * (1 - Math.exp(-n / 2.5))));
      let o = this.dil + 0.25 * Math.sin(t * 0.21) * Math.min(1, this.dil),
        s = Math.pow(1.62, Math.max(0, o)),
        a = Math.pow(0.8, o);
      for (; this.next < e;) {
        let c = this.n++ % 2;
        (this.E.raw("tick", this.next, {
          g: (c ? 0.75 : 1) * 1.25,
          rate: a * (c ? 0.84 : 1),
          pan: c ? 0.12 : -0.12,
          to: o > 1 ? this.g.wet : this.g.mid,
        }),
          o > 0.7 &&
            this.E.raw("thud", this.next, { g: 0.05 * Math.min(2, o), rate: 0.7 * a + 0.2, to: this.g.mid }),
          (this.next += s),
          (this.sub = Math.max(this.sub, this.next - s)));
      }
      let r = Math.pow(2, 1 + o * 1.15),
        l = s / r;
      if (o > 0.25)
        for (this.sub < t && (this.sub = t); this.sub < e;) {
          let c = this.R();
          (this.E.raw(c < 0.75 ? "tick" : "_page", this.sub, {
            g: Math.min(0.55, 0.2 * o) * (0.4 + 0.6 * this.R()),
            rate: 1.2 + 0.7 * this.R(),
            pan: Math.sin(this.sub * 2.1) * 0.7,
            to: this.g.mid,
          }),
            (this.sub += l * (0.92 + 0.16 * this.R())));
        }
      for (; this.nextP < e;)
        (this.E.raw(this.R() < 0.5 ? "paper" : "_page", this.nextP, {
          g: this.r(0.3, 0.6),
          rate: this.r(0.75, 1.1),
          pan: this.r(-0.7, 0.7),
          to: this.g.mid,
        }),
          (this.nextP += this.r(2.2, 4.5) / (1 + o * 0.5)));
      for (; this.nextG < e;) {
        let c = H3[(this.gi = (this.gi || 0) + 1) % 4];
        (this.E.note("glass", Gt(c * 2), this.nextG, { g: 0.085, pan: this.r(-0.5, 0.5), to: this.g.wet }),
          (this.nextG += s * 3));
      }
    }
  },
  tv = class extends qi {
    init() {
      (this.pad("t", "glass", Gt(12), { g: 0.16, atk: 4, drift: 0.3 }),
        this.pad("t2", "oo", Gt(12), { g: 0.02, atk: 6, drift: 0.5 }),
        this.pad("r", "room", 1, { g: 0.014, atk: 2, bus: "dry" }),
        this.pad("d", "warm", Gt(8), { g: 0, atk: 4, lp: 800 }),
        this.pad("all", "murmurA", 1, { g: 0, atk: 5, drift: 0.5 }),
        this.pad("all2", "choir", Gt(8), { g: 0, atk: 6, drift: 0.4 }),
        (this.next = this.E.now + 3.2),
        (this.k = 0),
        (this.sun = null));
    }
    onBeat(t, e, n) {
      let o = this.pads,
        s = t >= 2;
      if (
        (o.d.set(t >= 1 ? 0.06 : 0, 2.5),
        o.t.set(s ? 0.08 : t ? 0.15 : 0.16, 2),
        o.t2.set(s ? 0.05 : t ? 0.04 : 0.02, 3),
        s)
      )
        (this.sun ||
          (this.sun = [
            ["low", 2, 0.62, 0],
            ["low", 1, 0.4, 0.3],
            ["warm", 3, 0.42, 0.9],
            ["warm", 4, 0.44, 1.6],
            ["strings", 5, 0.26, 2.6],
            ["strings", 6, 0.3, 3.2],
            ["organ", 4, 0.2, 3.6],
            ["strings", 8, 0.26, 4.2],
            ["choir", 9, 0.2, 5],
            ["choir", 10, 0.2, 5.6],
            ["choir", 12, 0.2, 6.2],
            ["oo", 11, 0.16, 6.8],
            ["strings", 16, 0.12, 7.4],
            ["strings", 18, 0.08, 7.9],
            ["choir", 20, 0.07, 8.4],
            ["air", 24, 0.08, 8.6],
          ].map(([a, r, l, c], u) => ({
            v: this.pad(null, a, Gt(r), { g: 0, atk: 1, pan: (((u * 7) % 9) - 4) / 9, lp: 500, drift: 0.2 }),
            g: l,
            at: c,
          }))),
          (this.sT = n ? this.E.now - 26 : this.E.now),
          (this.gl = n ? 99 : this.E.now + 8.6));
      else if (this.sun) for (let a of this.sun) a.v.set(0, 0.5);
    }
    step(t, e, n) {
      let o = this.beat === 1 ? qn((n - 3) / 4) : this.beat > 1 ? 0.5 : 0;
      if (
        (this.beat < 2 || n < 12
          ? (this.pads.all.set(0.07 * o, 1), this.pads.all2.set(0.05 * o, 1.5))
          : this.pads.all.set(0, 3),
        this.sun && this.beat >= 2 && t - (this._s || 0) > 0.15)
      ) {
        this._s = t;
        let s = t - this.sT,
          a = qn(s / 10),
          r = jn(1, 0.27, qn((s - 13.5) / 10));
        for (let l of this.sun) {
          let c = qn((s - l.at) / 3);
          (l.v.set(l.g * (0.35 * c + 0.65 * c * a) * r, 0.3),
            l.v.cut(420 + 9e3 * Math.pow(Vn((s - 1) / 10), 2.2) * jn(1, 0.35, qn((s - 13) / 10)), 0.3));
        }
        this.gl &&
          t > this.gl &&
          ((this.gl = 0),
          this.E.raw("shimmer", t, { g: 0.9, to: this.g.wet }),
          this.E.raw("boom", t, { g: 0.42, rate: 0.9, to: this.g.mid }),
          this.E.raw("bell", t + 0.1, { g: 0.5, rate: 0.5, to: this.g.wet }));
      }
      if (this.beat < 2 || t - this.bt > 22)
        for (; this.next < e;) {
          let s = H3[this.k++ % 4],
            a = this.k % 4 === 0;
          (this.E.note("glass", Gt(s * (this.beat >= 2 ? 2 : 1)), this.next, {
            g: 0.2 * (this.beat >= 2 ? 0.5 : 1),
            pan: this.r(-0.3, 0.3),
            to: this.g.wet,
          }),
            (this.next += a ? 5.2 : this.r(1.7, 2.3)));
        }
      else this.next < t && (this.next = t + 1);
    }
  },
  ev = class extends qi {
    init() {
      let t = [
        ["organ", 2, 0.5, 0],
        ["organ", 4, 0.4, 0],
        ["organ", 6, 0.3, -0.3],
        ["organ", 8, 0.22, 0.3],
        ["organ", 9, 0.16, -0.5],
        ["strings", 12, 0.16, 0.5],
        ["choir", 10, 0.1, 0],
        ["organ", 11, 0.07, 0.2],
      ];
      ((this.C = t.map(([e, n, o, s]) => ({
        v: this.pad(null, e, Gt(n), { g: 0, atk: 0.6, pan: s, lp: 900, drift: 0.06 }),
        g: o,
      }))),
        this.pad("sub", "low", Gt(1), { g: 0, atk: 1, bus: "mid", lp: 200 }),
        (this.rate = 0.25),
        (this.phase = 0),
        (this._t = this.E.now),
        (this.lfoN = []),
        (this.depth = 1),
        (this.bright = 900),
        (this.lvl = 1));
    }
    onBeat(t, e, n) {
      ((this.k = Math.min(2, t)),
        n && ((this.rate = [0.25, 1, 8][this.k]), (this.depth = [1, 0.9, 0.12][this.k])));
    }
    step(t, e, n) {
      if (t - this._t < 0.03) return;
      let o = Math.min(0.2, t - this._t);
      this._t = t;
      let s = this.k,
        a =
          s === 0
            ? Math.min(0.5, 0.25 * Math.pow(2, n / 9))
            : s === 1
              ? Math.min(8, 0.5 * Math.pow(2, 1 + Math.floor(n / 1.5)))
              : 8;
      this.rate += (a - this.rate) * (1 - Math.exp(-o / 0.25));
      let r = s === 0 ? 1 : s === 1 ? jn(0.92, 0.3, qn((n - 6) / 5)) : jn(0.3, 0.07, qn(n / 3));
      this.depth += (r - this.depth) * (1 - Math.exp(-o / 0.6));
      let l =
        s === 0 ? 800 : s === 1 ? 800 + 2400 * Vn(n / 8) : n < 4 ? 4600 : jn(4600, 420, qn((n - 4) / 9));
      this.bright += (l - this.bright) * (1 - Math.exp(-o / 0.7));
      let c = s === 0 ? 0.95 : s === 1 ? 0.9 : jn(1.05, 0.5, qn((n - 4) / 9));
      ((this.lvl += (c - this.lvl) * (1 - Math.exp(-o / 0.8))), (this.phase += o * this.rate));
      let u = this.phase % 1,
        f = Math.min(0.22, 0.12 * this.rate + 0.06),
        h = u < f ? qn(u / f) : Math.exp(-(u - f) * jn(2.6, 1.6, Vn(this.rate / 2))),
        d = 1 - this.depth * (1 - h),
        p = Vn(0.12 / this.rate, 0.025, 0.16);
      for (let x of this.C)
        (x.v.set(x.g * d * this.lvl * 0.62, p), x.v.cut(this.bright * (0.45 + 0.55 * d), p));
      this.pads.sub.set(0.5 * d * this.lvl * (s < 2 ? 1 : 0.5), p);
    }
  },
  nv = class extends qi {
    init() {
      (this.pad("a", "solo", Gt(6), { g: 0.3, atk: 2.5, drift: 0.12, bus: "mid", lp: 3e3 }),
        this.pad("b", "solo", Gt(6), {
          g: 0,
          atk: 3,
          drift: 0.12,
          pan: 0.3,
          bus: "mid",
          lp: 2600,
          loopAt: 0.37,
        }),
        this.pad("c", "solo", Gt(12), { g: 0, atk: 5, drift: 0.3, lp: 2600, pan: -0.3 }),
        this.pad("r", "room", 1, { g: 0.012, atk: 2, bus: "dry" }),
        (this.det = 0),
        (this._t = this.E.now));
    }
    onBeat(t, e, n) {
      let o = Math.min(3, t),
        s = this.pads;
      ((this.dT = [0, 1, 1, 2.4][o]),
        (this.k = o),
        n && (this.det = this.dT),
        s.a.set([0.34, 0.34, 0.32, 0.03][o], o === 3 ? 0.5 : 1.5),
        s.b.set([0.1, 0.26, 0.3, 0.006][o], o === 3 ? 0.4 : 2),
        s.c.set([0.03, 0.05, 0.09, 0.012][o], o === 3 ? 0.8 : 2),
        s.a.cut([1500, 2200, 3200, 1200][o], 2),
        s.b.cut([1500, 2200, 3200, 900][o], 2));
    }
    step(t, e, n) {
      if (t - this._t < 0.1) return;
      let o = t - this._t;
      this._t = t;
      let s =
        this.k === 0 ? 0 : this.k === 1 ? 14 * Vn(n / 12) + 3 : this.k === 2 ? 17 + 46 * Vn(n / 16) : 100;
      this.det += (s - this.det) * (1 - Math.exp(-o / 1.5));
      let a = 2.2 * Math.sin(t * 5.1) * (0.4 + 0.6 * Math.sin(t * 0.23) ** 2),
        r = (l) => Math.pow(2, l / 1200);
      (this.pads.a.freq(Gt(6) * r(a * 0.5), 0.06),
        this.pads.b.freq(Gt(6) * r(this.det + a), 0.08),
        this.pads.c.freq(Gt(12) * r(-this.det * 0.6), 0.1));
    }
  },
  iv = class extends qi {
    init() {
      let t = this.E;
      ((this.mix = 0.5),
        (this.got = null),
        (this.L = t.group(this.g.out, { wet: 0.12, mid: 0.05 })),
        (this.Rr = t.group(this.g.out, {})),
        (this.lv = []),
        [
          [8, 0.24, -0.5],
          [12, 0.17, -0.3],
          [16, 0.12, -0.6],
          [20, 0.07, -0.4],
          [24, 0.045, -0.2],
        ].forEach(([e, n, o]) =>
          this.lv.push(this.pad(null, "sine", Gt(e), { g: n, atk: 2, pan: o, drift: 0, to: this.L.wet })),
        ),
        [
          ["warm", 16 / 3, 0.24, 0.1],
          ["warm", 8, 0.16, 0.4],
          ["strings", 10, 0.07, 0.5],
          ["oo", 12, 0.05, 0.2],
          ["strings", 13.5, 0.05, 0.3],
          ["low", 8 / 3, 0.13, 0],
        ].forEach(([e, n, o, s]) =>
          this.pad(null, e, Gt(n), { g: o, atk: 4, pan: s, drift: 0.5, to: this.Rr.wet, lp: 2400 }),
        ),
        this.pad("wind", "pink", 1, {
          g: 0.07,
          atk: 3,
          lp: 900,
          hp: 220,
          pan: 0.4,
          drift: 0.5,
          to: this.Rr.dry,
        }),
        this.pad("leaf", "hiss", 1, { g: 0.012, atk: 3, pan: 0.5, drift: 0.7, to: this.Rr.dry, lp: 5e3 }),
        (this.next = t.now + 1),
        (this.nb = t.now + 1.5),
        (this.np = t.now + 2),
        (this.bi = 0),
        this.setMix(0.5, 0.05));
    }
    setMix(t, e = 0.3) {
      this.mix = t;
      let n = this.E.now;
      for (let [o, s] of [
        [this.L, Math.cos((t * Math.PI) / 2)],
        [this.Rr, Math.sin((t * Math.PI) / 2)],
      ])
        for (let a of [o.out.gain, o.send.gain]) a.setTargetAtTime(s * 1.1, n, e);
    }
    param(t, e) {
      t === "mix" && ((this.got = e), this.setMix(Vn(e), 0.15));
    }
    onBeat(t) {
      this.got == null && this.setMix(t >= 2 ? 1 : 0.5, 1.4);
    }
    step(t, e) {
      for (; this.next < e;) {
        let n = [8, 12, 16, 24, 20, 16, 12, 10][this.bi++ % 8];
        (this.E.note("dot", Gt(n), this.next, { g: 0.11, pan: this.bi % 2 ? -0.7 : -0.35, to: this.L.mid }),
          (this.next += 0.5));
      }
      for (; this.nb < e;)
        (this.mix > 0.05 &&
          this.E.raw("_chirp", this.nb, {
            g: this.r(0.25, 0.8),
            rate: this.r(0.8, 1.15),
            pan: this.r(0, 0.95),
            to: this.R() < 0.6 ? this.Rr.wet : this.Rr.mid,
          }),
          (this.nb += this.R() < 0.35 ? this.r(0.15, 0.5) : this.r(1, 3.4)));
      for (; this.np < e;) {
        let n = [5.333333333333333, 8, 10, 12, 13.5, 16, 12, 10, 8, 9];
        if (this.mix > 0.05) {
          let o = n[Math.floor(this.R() * n.length)];
          (this.E.note("pluck", Gt(o), this.np, {
            g: this.r(0.2, 0.34),
            pan: this.r(0.05, 0.55),
            to: this.Rr.wet,
          }),
            this.R() < 0.35 &&
              this.E.note("pluck", Gt(o === 10 ? 13.5 : o * 1.5), this.np + 0.13, {
                g: 0.16,
                pan: 0.4,
                to: this.Rr.wet,
              }));
        }
        this.np += [0.45, 0.9, 0.9, 1.35, 1.8][Math.floor(this.R() * 5)];
      }
    }
    stop(t) {
      super.stop(t);
    }
    free() {
      (this.L.free(), this.Rr.free(), super.free());
    }
  },
  ov = class extends qi {
    init() {
      (this.pad("d", "warm", Gt(4), { g: 0, atk: 4, lp: 900 }),
        this.pad("e", "warm", Gt(3), { g: 0.12, atk: 4, lp: 900 }),
        this.pad("a", "strings", Gt(6), { g: 0.06, atk: 5, lp: 1100 }),
        this.pad("o", "oo", Gt(8), { g: 0.04, atk: 6 }),
        this.pad("air", "air", Gt(12), { g: 0.02, atk: 5 }),
        (this.i = 64 * bs),
        (this.next = this.E.now + 0.8),
        (this.pg = this.E.now + 0.25),
        (this.sp = 1));
    }
    onBeat(t, e, n) {
      let o = this.pads,
        s = t >= 1;
      (o.d.set(s ? 0.13 : 0, 3),
        o.e.set(s ? 0 : 0.13, 3),
        o.a.set(s ? 0.04 : 0.07, 2),
        o.o.set(s ? 0.05 : 0.03, 2.5),
        o.air.set(s ? 0.035 : 0.02, 3),
        (this.riff = n && t === 0 ? this.E.now + 11.5 : 0),
        (this.rT0 = this.E.now));
    }
    step(t, e, n) {
      let o = this.beat >= 1 ? jn(2, 3.4, Vn(n / 20)) : jn(0.9, 2, qn(n / 13)),
        s = 0.25;
      for (; this.next < e;) {
        this.i = this.i > 0 ? this.i - 1 : 64 * bs;
        let a = i0[this.i % bs],
          r = this.next + 0,
          l = this.beat >= 1;
        (a &&
          (this.E.note(l ? "rglass" : this.i % 3 ? "rmarimba" : "rpluck", Gt(l ? Math.max(8, a) : a), r, {
            g: l ? 0.13 : 0.34,
            pan: Math.sin(this.i) * 0.5,
            to: this.g.wet,
          }),
          this.i % 4 === 0 && this.E.note("rpluck", Gt(a / 2), r, { g: 0.2, pan: -0.2, to: this.g.wet })),
          (this.next += s * o));
      }
      if (this.riff && t < this.riff)
        for (; this.pg < e;) {
          let a = Vn((this.pg - this.rT0) / 11.2),
            r = 4 + 24 * Math.sin(Math.PI * Math.pow(a, 0.72)) ** 1.5;
          (this.E.raw("_page", this.pg, {
            g: this.r(0.16, 0.42) * (0.5 + 0.5 * Math.sin(Math.PI * a)),
            rate: this.r(0.8, 1.15) * (1.15 - 0.3 * a),
            pan: this.r(-0.35, 0.35),
            to: this.g.mid,
          }),
            (this.pg += (1 / r) * this.r(0.8, 1.25)));
        }
    }
  },
  sv = class extends qi {
    init() {
      (this.pad("room", "room", 1, { g: 0.04, atk: 1.5, bus: "dry", drift: 0.12 }),
        this.pad("hum", "hum", 100, { g: 0.014, atk: 2, bus: "dry", drift: 0.05 }),
        this.pad("q", "glass", Gt(11), { g: 0, atk: 5, drift: 0.35 }),
        this.pad("q2", "oo", Gt(11), { g: 0, atk: 6, drift: 0.4 }));
    }
    onBeat(t, e, n) {
      ((this.on = t >= 2),
        (this.wait = n ? 0 : 5),
        this.on || (this.pads.q.set(0, 0.8), this.pads.q2.set(0, 0.8), this.pads.hum.set(0.014, 1)));
    }
    step(t, e, n) {
      this.on &&
        n > this.wait &&
        (this.pads.q.set(0.11, 1.8), this.pads.q2.set(0.035, 3), this.pads.hum.set(0.006, 4));
    }
  },
  av = class extends qi {
    init() {
      this.pad("d", "warm", Gt(4), { g: 0.05, atk: 4, lp: 700 });
    }
  },
  fA = {
    office: Y1,
    tower: K1,
    boat: j1,
    loop: $1,
    swarm: Z1,
    dominoes: J1,
    calendar: Q1,
    lamp: tv,
    selectall: ev,
    aim: nv,
    futures: iv,
    pile: ov,
    questions: sv,
  },
  O3 = (i, t, e, n) =>
    new (fA[t] || av)(
      i,
      t,
      e,
      n,
      {
        office: { wet: 0.4, mid: 0.16 },
        boat: { wet: 0.5, mid: 0.2 },
        tower: { wet: 0.55, mid: 0.15 },
        loop: { mid: 0.16, wet: 0.5 },
        dominoes: { mid: 0.1, wet: 0.4 },
        aim: { mid: 0.14, wet: 0.4 },
        selectall: { wet: 0.5, mid: 0.1 },
        lamp: { wet: 0.6, mid: 0.2 },
        calendar: { mid: 0.18, wet: 0.6 },
      }[t] || {},
    );

function V3(i, { name: t, dur: e = 2, reverse: n = !1, from: o, to: s }) {
  let a = i.now + 0.015,
    r = Math.max(0.2, e),
    l = i.group(i.trBus, { mid: 0.2, wet: 0.6 }),
    c = Math.random,
    u = (m) => i.bank.get(m),
    f = (m) => a + m * r,
    h = (
      m,
      g,
      b,
      y,
      { q: S = 0.8, pan: M, rate: w = 1, rateC: E, bus: T = "dry", a: _ = 0, b: R = 1, tail: L = 0 } = {},
    ) => {
      let k = u("pad." + m);
      if (!k) {
        i.bank.need("pad." + m);
        return;
      }
      let P = i.ctx,
        C = P.createBufferSource(),
        A = P.createBiquadFilter(),
        N = P.createGain();
      ((C.buffer = k),
        (C.loop = !0),
        (C.playbackRate.value = w),
        (A.type = g),
        (A.Q.value = S),
        (N.gain.value = 0),
        C.connect(A),
        A.connect(N));
      let G = N;
      if (M) {
        let B = P.createStereoPanner();
        (i.curve(B.pan, a, r, M), N.connect(B), (G = B));
      }
      (G.connect(l[T]),
        i.curve(N.gain, a, r, b),
        i.curve(A.frequency, a, r, y, !0),
        E && i.curve(C.playbackRate, a, r, E),
        C.start(a, c() * k.duration * 0.8),
        C.stop(a + r * b[b.length - 1][0] + 0.1 + L));
    },
    d = (m, g, b, { lp: y, pan: S = 0, gl: M, bus: w = "wet", detune: E } = {}) => {
      let T = u("pad." + m),
        _ = {
          strings: Gt(6),
          warm: Gt(4),
          choir: Gt(6),
          organ: Gt(4),
          low: Gt(2),
          air: Gt(12),
          oo: Gt(8),
          glass: Gt(12),
          sine: Gt(8),
          solo: Gt(6),
        }[m];
      if (!T) {
        i.bank.need("pad." + m);
        return;
      }
      let R = i.ctx,
        L = R.createBufferSource(),
        k = R.createGain();
      ((L.buffer = T), (L.loop = !0), (L.playbackRate.value = g / _), (k.gain.value = 0));
      let P = L;
      if (y) {
        let C = R.createBiquadFilter();
        ((C.type = "lowpass"), (C.Q.value = 0.5), i.curve(C.frequency, a, r, y, !0), L.connect(C), (P = C));
      }
      if ((P.connect(k), (P = k), S)) {
        let C = R.createStereoPanner();
        ((C.pan.value = S), k.connect(C), (P = C));
      }
      (P.connect(l[w]),
        i.curve(k.gain, a, r, b),
        M &&
          i.curve(
            L.playbackRate,
            a,
            r,
            M.map(([C, A]) => [C, (g * A) / _]),
            !0,
          ),
        L.start(a, c() * T.duration),
        L.stop(a + r * b[b.length - 1][0] + 0.2));
    },
    p = (m, g, b = {}) => i.raw(m, f(g), { to: l[b.bus || "mid"], ...b }),
    x = r + 4;
  if (n && t !== "fade")
    return (
      h(
        "pink",
        "bandpass",
        [
          [0, 0],
          [0.6, 0.3],
          [1, 0],
        ],
        [
          [0, 1800],
          [1, 320],
        ],
        {
          q: 0.7,
          pan: [
            [0, 0.3],
            [1, -0.3],
          ],
        },
      ),
      d(
        "air",
        Gt(12),
        [
          [0, 0],
          [0.6, 0.14],
          [1, 0],
        ],
        {
          gl: [
            [0, 1.5],
            [1, 1],
          ],
        },
      ),
      v()
    );
  switch (t) {
    case "portal-in":
      (h(
        "pink",
        "bandpass",
        [
          [0, 0],
          [0.08, 0.05],
          [0.34, 0.5],
          [0.7, 0.16],
          [1, 0],
        ],
        [
          [0, 180],
          [0.3, 900],
          [0.55, 1500],
          [1, 420],
        ],
        {
          q: 0.9,
          pan: [
            [0, 0],
            [0.4, -0.25],
            [1, 0.2],
          ],
        },
      ),
        h(
          "brown",
          "lowpass",
          [
            [0, 0],
            [0.25, 0.45],
            [0.6, 0.2],
            [1, 0],
          ],
          [
            [0, 80],
            [0.3, 300],
            [1, 90],
          ],
          { q: 0.6 },
        ),
        d(
          "warm",
          Gt(4),
          [
            [0, 0],
            [0.3, 0.2],
            [0.8, 0.22],
            [1.5, 0],
          ],
          {
            lp: [
              [0, 200],
              [0.6, 2600],
              [1.5, 900],
            ],
            pan: -0.3,
          },
        ),
        d(
          "strings",
          Gt(6),
          [
            [0, 0],
            [0.45, 0.13],
            [0.9, 0.14],
            [1.6, 0],
          ],
          {
            lp: [
              [0, 200],
              [0.7, 3600],
              [1.6, 900],
            ],
            pan: 0.4,
          },
        ),
        d(
          "strings",
          Gt(9),
          [
            [0, 0],
            [0.6, 0.06],
            [1, 0.07],
            [1.6, 0],
          ],
          {
            lp: [
              [0, 300],
              [0.8, 4200],
              [1.6, 900],
            ],
            pan: -0.5,
          },
        ),
        p("sub", 0.12, { g: 0.5 }),
        p("shimmer", 0.5, { g: 0.28, bus: "wet" }));
      break;
    case "portal-out":
      (h(
        "pink",
        "bandpass",
        [
          [0, 0],
          [0.2, 0.1],
          [0.72, 0.48],
          [0.94, 0.12],
          [1, 0],
        ],
        [
          [0, 300],
          [0.5, 800],
          [0.9, 2900],
          [1, 3200],
        ],
        {
          q: 1.1,
          pan: [
            [0, 0.5],
            [0.8, 0],
            [1, 0],
          ],
        },
      ),
        d(
          "strings",
          Gt(6),
          [
            [0, 0],
            [0.6, 0.16],
            [0.93, 0.14],
            [1.02, 0],
          ],
          {
            gl: [
              [0, 0.75],
              [1, 1.5],
            ],
            lp: [
              [0, 600],
              [0.9, 3600],
            ],
            pan: 0.3,
          },
        ),
        d(
          "strings",
          Gt(4),
          [
            [0, 0],
            [0.6, 0.16],
            [0.93, 0.12],
            [1.02, 0],
          ],
          {
            gl: [
              [0, 0.75],
              [1, 1.5],
            ],
            lp: [
              [0, 500],
              [0.9, 3e3],
            ],
            pan: -0.3,
          },
        ),
        d(
          "low",
          Gt(2),
          [
            [0, 0],
            [0.5, 0.3],
            [0.95, 0],
          ],
          {
            gl: [
              [0, 1],
              [1, 1.2],
            ],
          },
        ),
        p("pop", 0.955, { g: 0.9, rate: 0.8 }),
        p("bell", 0.96, { g: 0.16, rate: 0.75, bus: "wet" }));
      break;
    case "fold": {
      let m = (b) => b / 3.4,
        g = (b, y, S, M, w) =>
          p("_crease", m(b) - 0.188 / S / r, { g: y, rate: S, pan: M, bus: "dry", v: w });
      (g(0.8, 1, 0.92, -0.1, 0),
        g(1.17, 0.8, 1.06, 0.4, 1),
        g(1.27, 0.75, 1.12, -0.4, 2),
        g(1.42, 0.55, 1.22, 0.15, 3),
        g(1.64, 0.8, 1, 0, 4),
        g(2.02, 0.9, 0.96, -0.25, 0),
        g(2.27, 0.95, 1.1, 0.25, 1),
        g(2.56, 1.05, 1.24, 0, 2),
        h(
          "pink",
          "bandpass",
          [
            [0, 0],
            [m(0.45), 0.17],
            [m(0.82), 0.03],
            [m(1.7), 0.04],
            [m(2.6), 0.03],
            [m(2.76), 0.05],
            [m(3.05), 0.2],
            [m(3.2), 0.02],
            [m(3.25), 0],
          ],
          [
            [0, 600],
            [m(0.45), 1500],
            [m(0.8), 800],
            [m(2.7), 1300],
            [m(3.2), 360],
          ],
          {
            q: 0.9,
            pan: [
              [0, -0.3],
              [m(0.8), 0.2],
              [1, 0],
            ],
          },
        ));
      for (let b = 0; b < 11; b++)
        p("paper", m(0.2 + 0.23 * b + 0.08 * c()), {
          g: 0.14 + 0.12 * c(),
          rate: 1.05 + 0.4 * c(),
          pan: c() - 0.5,
          bus: "dry",
        });
      (p("paper", m(2.62), { g: 0.6, rate: 0.85, pan: 0.1, bus: "dry" }),
        p("_plop", m(3.19), { g: 1, v: 0 }),
        p("wave", m(3.1), { g: 0.55, rate: 1.1 }),
        p("drip", m(3.42), { g: 0.5, pan: 0.3, bus: "wet" }),
        p("drip", m(3.66), { g: 0.35, pan: -0.35, bus: "wet" }));
      break;
    }
    case "wash":
      (h(
        "brown",
        "lowpass",
        [
          [0, 0],
          [0.3, 0.7],
          [0.5, 1.35],
          [0.7, 0.7],
          [1, 0.1],
          [1.25, 0],
        ],
        [
          [0, 120],
          [0.48, 900],
          [0.8, 260],
          [1.25, 120],
        ],
        { q: 0.5 },
      ),
        h(
          "pink",
          "lowpass",
          [
            [0, 0],
            [0.25, 0.12],
            [0.48, 0.62],
            [0.72, 0.22],
            [1.2, 0],
          ],
          [
            [0, 300],
            [0.46, 3600],
            [0.75, 1400],
            [1.2, 400],
          ],
          {
            q: 0.5,
            pan: [
              [0, -0.5],
              [0.5, 0],
              [1, 0.5],
            ],
          },
        ),
        h(
          "hiss",
          "bandpass",
          [
            [0, 0],
            [0.4, 0.03],
            [0.55, 0.13],
            [0.8, 0.08],
            [1.35, 0],
          ],
          [
            [0, 2400],
            [0.55, 4200],
            [1.35, 2200],
          ],
          {
            q: 0.6,
            pan: [
              [0, -0.2],
              [1.2, 0.5],
            ],
          },
        ));
      for (let m = 0; m < 6; m++)
        p("drip", 0.7 + 0.09 * m, {
          g: 0.2 + 0.2 * c(),
          rate: 0.8 + 0.6 * c(),
          pan: c() * 1.6 - 0.8,
          bus: "wet",
        });
      (p("thud", 0.46, { g: 0.5 }),
        d(
          "warm",
          Gt(4),
          [
            [0, 0],
            [0.6, 0.12],
            [1.2, 0],
          ],
          {
            lp: [
              [0, 300],
              [0.6, 1500],
              [1.2, 300],
            ],
          },
        ));
      break;
    case "flaps": {
      let m = Math.min(130, Math.round(52 * r + 20));
      for (let g = 0; g < m; g++) {
        let b = (g + c() * 0.9) / m,
          y = 0.08 + 0.82 * b,
          S = Math.sin(Math.PI * b);
        p("_flap", y, {
          g: (0.5 + 1.1 * S) * (0.5 + 0.5 * c()),
          rate: 0.8 + 0.45 * c(),
          pan: Vn(jn(-0.85, 0.85, b) + (c() - 0.5) * 0.4, -1, 1),
          bus: c() < 0.3 ? "mid" : "dry",
        });
      }
      (h(
        "pink",
        "bandpass",
        [
          [0, 0],
          [0.4, 0.1],
          [0.8, 0.06],
          [1, 0],
        ],
        [
          [0, 500],
          [0.5, 900],
          [1, 600],
        ],
        {
          q: 0.7,
          pan: [
            [0, -0.6],
            [1, 0.6],
          ],
        },
      ),
        p("_flap", 0.95, { g: 2, rate: 0.72 }),
        p("thud", 0.95, { g: 0.3, rate: 1.3 }));
      break;
    }
    case "slam": {
      (h(
        "pink",
        "bandpass",
        [
          [0, 0],
          [0.285 * 0.55, 0.1],
          [0.285 * 0.97, 0.5],
          [0.285, 0],
        ],
        [
          [0, 250],
          [0.285, 2100],
        ],
        { q: 0.8 },
      ),
        d(
          "strings",
          Gt(3) * 1.06,
          [
            [0, 0],
            [0.285 * 0.9, 0.2],
            [0.285, 0],
          ],
          {
            lp: [
              [0, 300],
              [0.285, 2200],
            ],
          },
        ),
        d(
          "strings",
          Gt(3),
          [
            [0, 0],
            [0.285 * 0.9, 0.2],
            [0.285, 0],
          ],
          {
            lp: [
              [0, 300],
              [0.285, 2200],
            ],
          },
        ),
        p("slam", 0.285, { g: 1.35, bus: "mid", v: 0 }),
        p("boom", 0.285, { g: 0.9, bus: "mid" }),
        p("slam", 0.285 + 0.02 / r, { g: 0.3, rate: 0.62, bus: "wet", v: 1 }),
        h(
          "brown",
          "lowpass",
          [
            [0, 0],
            [0.285, 0],
            [0.285 + 0.03, 0.65],
            [0.6, 0.3],
            [1.3, 0],
          ],
          [
            [0, 700],
            [0.285, 900],
            [0.5, 240],
            [1.3, 90],
          ],
          { q: 0.5 },
        ));
      for (let g = 0; g < 12; g++)
        p(c() < 0.6 ? "_page" : "paper", 0.285 + 0.07 + 0.05 * g + 0.03 * c(), {
          g: (0.5 - 0.03 * g) * (0.5 + 0.5 * c()),
          rate: 0.8 + 0.4 * c(),
          pan: c() * 1.6 - 0.8,
        });
      x = r + 6;
      break;
    }
    case "daybreak":
      (h(
        "pink",
        "lowpass",
        [
          [0, 0],
          [0.5, 0.2],
          [1, 0.06],
          [1.6, 0],
        ],
        [
          [0, 200],
          [0.55, 4200],
          [1.6, 600],
        ],
        { q: 0.5 },
      ),
        [
          ["low", 2, 0.42, 0],
          ["warm", 4, 0.34, -0.2],
          ["warm", 6, 0.26, 0.25],
          ["strings", 8, 0.2, -0.4],
          ["strings", 10, 0.16, 0.45],
          ["choir", 12, 0.12, -0.2],
          ["choir", 9, 0.1, 0.3],
          ["strings", 16, 0.07, 0],
          ["oo", 22, 0.05, 0.4],
        ].forEach(([m, g, b, y], S) =>
          d(
            m,
            Gt(g),
            [
              [0, 0],
              [0.18 + 0.04 * S, b * 0.25],
              [0.58 + 0.012 * S, b],
              [1, b * 0.6],
              [1.9, 0],
            ],
            {
              pan: y,
              lp: [
                [0, 250],
                [0.6, 7500],
                [1.2, 2600],
                [1.9, 600],
              ],
            },
          ),
        ),
        p("shimmer", 0.46, { g: 1, bus: "wet" }),
        p("shimmer", 0.66, { g: 0.6, bus: "wet", rate: 1 }),
        p("boom", 0.5, { g: 0.45 }),
        p("sub", 0.3, { g: 0.6 }),
        (x = r * 1.9 + 5));
      break;
    case "line":
      ([
        ["organ", 4, 0.3, 0],
        ["strings", 6, 0.22, 0.3],
        ["strings", 9, 0.16, -0.4],
        ["choir", 12, 0.12, 0.2],
        ["organ", 8, 0.18, -0.2],
      ].forEach(([m, g, b, y]) =>
        d(
          m,
          Gt(g),
          [
            [0, 0],
            [0.05, b],
            [0.35, b * 0.6],
            [0.8, 0],
          ],
          {
            pan: y,
            lp: [
              [0, 5200],
              [0.35, 900],
              [0.8, 120],
            ],
            gl: [
              [0, 1],
              [0.3, 1],
              [0.8, 0.92],
            ],
          },
        ),
      ),
        h(
          "pink",
          "lowpass",
          [
            [0, 0],
            [0.06, 0.3],
            [0.4, 0.12],
            [0.8, 0],
          ],
          [
            [0, 5e3],
            [0.8, 130],
          ],
          { q: 0.5 },
        ),
        d(
          "sine",
          Gt(12),
          [
            [0, 0],
            [0.25, 0.02],
            [0.7, 0.2],
            [1, 0.17],
            [1.5, 0],
          ],
          { bus: "mid" },
        ),
        d(
          "sine",
          Gt(6),
          [
            [0, 0],
            [0.5, 0.02],
            [1, 0.07],
            [1.6, 0],
          ],
          { bus: "mid" },
        ),
        p("sub", 0.05, { g: 0.3, rate: 0.9 }),
        p("tick", 0.82, { g: 0.7, rate: 1.3, bus: "wet" }));
      break;
    case "tear": {
      let g = [
        [0, 0],
        [0.03, 0.5],
      ];
      for (let b = 1; b < 12; b++)
        g.push([0.03 + ((0.56 - 0.05) * b) / 12, (0.36 + (0.3 * b) / 12) * (0.6 + 0.4 * c())]);
      (g.push([0.56, 0.78], [0.56 + 0.025, 0]),
        h(
          "rip",
          "bandpass",
          g,
          [
            [0, 1400],
            [0.56 * 0.5, 2e3],
            [0.56, 2900],
          ],
          {
            q: 0.45,
            rateC: [
              [0, 0.7],
              [0.56 * 0.4, 0.85],
              [0.56 * 0.7, 0.8],
              [0.56, 1.2],
            ],
            pan: [
              [0, -0.15],
              [0.56, 0.15],
            ],
          },
        ),
        h(
          "rip",
          "lowpass",
          g.map(([b, y]) => [b, y * 0.5]),
          [
            [0, 700],
            [0.56, 1100],
          ],
          {
            q: 0.5,
            rateC: [
              [0, 0.4],
              [0.56, 0.6],
            ],
          },
        ));
      for (let b = 0; b < 6; b++)
        p("paper", 0.06 + 0.08 * b + 0.03 * c(), {
          g: 0.3 + 0.2 * c(),
          rate: 0.85 + 0.3 * c(),
          pan: c() - 0.5,
          bus: "dry",
        });
      (p("snap", 0.56, { g: 0.9, rate: 0.85 }),
        h(
          "pink",
          "bandpass",
          [
            [0, 0],
            [0.36, 0.02],
            [0.68, 0.3],
            [0.85, 0.12],
            [1, 0],
          ],
          [
            [0, 500],
            [0.36, 500],
            [0.7, 1500],
            [1, 420],
          ],
          {
            q: 0.8,
            pan: [
              [0, 0],
              [0.5, -0.4],
              [1, 0.4],
            ],
          },
        ));
      for (let b = 0; b < 9; b++)
        p(c() < 0.5 ? "paper" : "_page", 0.56 + 0.04 + 0.04 * b + 0.02 * c(), {
          g: (0.75 - 0.06 * b) * (0.6 + 0.4 * c()),
          rate: 0.72 + 0.3 * c(),
          pan: b % 2 ? 0.6 : -0.6,
          bus: "mid",
        });
      break;
    }
    default:
      h(
        "pink",
        "bandpass",
        [
          [0, 0],
          [0.45, 0.16],
          [1, 0],
        ],
        [
          [0, 350],
          [0.5, 900],
          [1, 400],
        ],
        { q: 0.7 },
      );
  }
  return v();
  function v() {
    let m = l;
    return {
      end: a + x,
      t1: a + r,
      fade(g = 0.5) {
        m.fade(0, i.now, g);
      },
      free() {
        m.free();
      },
    };
  }
}

var hA = new Set(["type", "select", "delete", "click", "tick", "pop", "snap", "paper"]),
  dA = new Set(["select", "bell", "shimmer", "rise", "riser"]);

function G3({ context: i = null, bank: t = null } = {}) {
  let e = { scene: "", beat: 0, E: null, bed: null },
    n = [],
    o = [],
    s = !1,
    a = null,
    r = 0,
    l = [],
    c =
      (y) =>
      (...S) => {
        try {
          return y(...S);
        } catch (M) {
          e.err || ((e.err = M), i && console.error(M.stack));
        }
      };
  ((t = t || D3(k3())), !i && typeof AudioBuffer < "u" && t.run());
  let u = (y) => {
      e.E ||
        ((e.E = U3(y, t)),
        i
          ? e.E.ready()
          : (setTimeout(
              c(() => e.E.ready(1)),
              350,
            ),
            setTimeout(
              c(() => e.E.ready()),
              900,
            )),
        s && (e.E.master.gain.value = 0));
    },
    f = () => {
      if (e.E) return;
      let y = window.AudioContext || window.webkitAudioContext;
      y && u(new y({ latencyHint: "interactive" }));
    };
  i ? u(i) : typeof window < "u" && setTimeout(c(f), 60);
  let h = {},
    d = (y, S) => {
      let M = y.group(y.bedBus, { mid: 0.12, gain: 0.74 }),
        w = {},
        E = (T, _, R, L = {}) => (w[T] = y.pad(_, R, { g: 0, atk: 0.3, to: M.mid, drift: 0.25, ...L }));
      return (
        S === "wind" &&
          (E("a", "pink", 1, { lp: 600, hp: 160, pan: -0.3, drift: 0.4 }),
          E("b", "pink", 1.3, { lp: 1200, hp: 420, pan: 0.35, drift: 0.6 }),
          E("c", "brown", 1, { lp: 260, drift: 0.5 })),
        S === "water" &&
          (E("a", "brown", 1, { lp: 480, drift: 0.4 }),
          E("b", "pink", 1, { lp: 900, hp: 150, pan: 0.25, drift: 0.6 }),
          E("c", "hiss", 1, { lp: 5200, pan: -0.3, drift: 0.8 })),
        S === "hum" &&
          (E("a", "hum", Gt(3), { lp: 900, drift: 0.06 }), E("b", "low", Gt(2), { lp: 200, drift: 0.1 })),
        S === "tension" &&
          (E("a", "solo", Gt(12), { lp: 1800, pan: -0.35, drift: 0.3 }),
          E("b", "solo", Gt(12) * 1.06, { lp: 1800, pan: 0.35, drift: 0.4 }),
          E("c", "low", Gt(1) * 1.5, { lp: 180, drift: 0.4 })),
        S === "speed" &&
          (E("a", "pink", 1, { lp: 900, hp: 120, drift: 0.15 }),
          E("b", "pink", 1.5, { lp: 3e3, hp: 700, pan: 0.3, drift: 0.25 }),
          E("c", "brown", 1, { lp: 160, drift: 0.2 })),
        { g: M, v: w }
      );
    },
    p = {
      wind: (y, S, M) => {
        let w = 0.75 + 0.25 * Math.sin(S * 0.9) * Math.sin(S * 0.37 + 1);
        (M.a.set(0.34 * y * w, 0.3).cut(260 + 900 * y * w, 0.4),
          M.b.set(0.2 * y * y * w, 0.3).cut(700 + 2200 * y * w, 0.4),
          M.c.set(0.3 * y, 0.4));
      },
      water: (y, S, M) => {
        let w = 0.7 + 0.3 * Math.sin(S * 0.8);
        (M.a.set(0.52 * y * w, 0.3).cut(260 + 460 * y * w, 0.4),
          M.b.set(0.3 * y * w, 0.3),
          M.c.set(0.07 * y * y * w, 0.4));
      },
      hum: (y, S, M) => {
        (M.a.set(0.09 * y, 0.25), M.b.set(0.22 * y, 0.3));
      },
      tension: (y, S, M) => {
        let w = Math.pow(2, (y * 2.2) / 12);
        (M.a
          .set(0.07 * y * y, 0.25)
          .freq(Gt(12) * w, 0.3)
          .cut(900 + 2600 * y, 0.3),
          M.b
            .set(0.055 * y * y * y, 0.3)
            .freq(Gt(12) * 1.06 * w * w, 0.3)
            .cut(900 + 2600 * y, 0.3),
          M.c.set(0.4 * y, 0.4));
      },
      speed: (y, S, M) => {
        (M.a.set(0.22 * y, 0.12).cut(220 + 2200 * y, 0.15),
          M.b.set(0.13 * y * y, 0.15).cut(1500 + 4500 * y, 0.2),
          M.c.set(0.45 * y, 0.2));
      },
    },
    x = (y) => (h[y] ? h[y].v : 0),
    v = (y, S) => {
      for (let M in h) {
        let w = h[M],
          E = e.clock - w.at < 0.5 && w.n >= 2 && e.scene !== "office";
        if (
          ((w.v += ((E ? w.to : 0) - w.v) * (1 - Math.exp(-S / (E ? 0.12 : 0.4)))),
          !!p[M] && (w.v > 0.004 && !w.L && (w.L = d(e.E, M)), w.L))
        ) {
          if (y - (w.t || 0) > 0.05) {
            ((w.t = y), p[M](w.v, y, w.L.v));
            for (let T in w.L.v) w.L.v[T].breathe(y);
          }
          if (w.v < 0.002 && !E) {
            for (let _ in w.L.v) w.L.v[_].kill(y, 0.4);
            let T = w.L.g;
            ((w.L = null), setTimeout(() => T.free(), 4e3));
          }
        }
      }
    };
  e.clock = 0;
  function m(y, S) {
    let M = e.E,
      w = a && a.to === y && e.clock - a.at < 1 ? a : null,
      E = w ? w.dur : 0.9;
    a = null;
    let T = e.bed,
      _ = M.now;
    T &&
      (w && w.name === "slam" && !w.reverse
        ? T.cutAt(_ + E * 0.24, 0.12 * E)
        : w && w.name === "line"
          ? T.stop(E * 0.45)
          : w && w.name === "portal-out"
            ? T.stop(E * 0.9)
            : T.stop(Math.max(0.8, E * 0.85)),
      n.push(T));
    let R = y === "questions" || y === "office" || y === "dominoes" || y === "aim",
      L = O3(M, y, S, T ? ((w && w.name === "slam") || R ? E * 0.9 : Math.max(1.2, E * 1.1)) : 0.8);
    if (w && w.name === "slam" && !w.reverse)
      for (let k of [L.g.out.gain, L.g.send.gain])
        (k.cancelScheduledValues(_),
          k.setValueAtTime(0, _),
          k.setValueAtTime(0, _ + E * 0.55),
          k.linearRampToValueAtTime(L.trim, _ + E * 1.2));
    ((e.bed = L), (L.live = x));
    for (let k in h) h[k].to = 0;
  }
  let g = () => {
      let y = e.E,
        S = y.now;
      ((i || S > 1.2) && y.ready(),
        e.bed && e.bed.tick(S),
        (n = n.filter((M) => (S > M.endAt ? (M.free(), !1) : !0))),
        (o = o.filter((M) => (S > M.end ? (M.free(), !1) : !0))));
    },
    b = {
      quiet: !1,
      unlock: c(() => {
        if (i || (f(), !e.E)) return;
        let y = e.E.ctx;
        if (y && y.state !== "running" && y.state !== "closed") {
          let S = y.resume();
          S && S.catch && S.catch(() => {});
        }
      }),
      mute: c((y) => {
        if (((s = !!y), e.E)) {
          let S = e.E.master.gain,
            M = e.E.now;
          (S.cancelScheduledValues(M), S.setTargetAtTime(s ? 0 : 1, M, 0.06));
        }
      }),
      emit: c((y, S = {}) => {
        if (!(!e.E || (!i && e.E.ctx.state !== "running")))
          if (y === "transition") {
            for (let w of o) w.fade(0.5);
            a = { ...S, at: e.clock };
            let M = V3(e.E, S);
            M && o.push(M);
          } else if (y === "beat") {
            for (let M of o) e.E.now < M.t1 - 0.35 && M.fade(0.8);
            e.bed && e.bed.accent && e.bed.accent(S.beat);
          } else y === "back" && b.hit("_page", { gain: 0.5, pitch: 0.8 });
      }),
      hit: c((y, S = {}) => {
        let M = e.E,
          w = Sr[y];
        if (
          b.quiet ||
          (e.scene === "office" && e.beat < 2 && !hA.has(y)) ||
          !M ||
          !w ||
          (!i && M.ctx.state !== "running")
        )
          return;
        S = S || {};
        let E = M.now,
          T = w[2].gap ?? 0.018;
        if (
          (e.lastHit || (e.lastHit = {}),
          E - (e.lastHit[y] || -1) < T || ((l = l.filter((A) => E - A < 0.12)), l.length > 26))
        )
          return;
        (l.push(E), (e.lastHit[y] = E));
        let _ = +S.pitch;
        ((_ = _ ? (_ < 0 ? Math.pow(2, _ / 12) : _) : 1),
          (_ = Vn(_, 0.2, 4)),
          dA.has(y) ? (_ = B3(_)) : (_ *= 1 + (Math.random() * 2 - 1) * (w[2].jit || 0)));
        let R = Vn(S.gain == null ? 1 : +S.gain || 0, 0, 1.6) * (w[2].jit ? 0.92 + 0.16 * Math.random() : 1),
          L = Vn(+S.pan || 0, -1, 1),
          k = w[2],
          P = (k.hall ? "h" + k.hall : "") + (k.room ? "r" + k.room : "") || "dry";
        e.in || (e.in = {});
        let C = e.in[P];
        if (!C) {
          ((C = M.ctx.createGain()), C.connect(M.hitBus));
          for (let [A, N] of [
            [k.hall, M.hall],
            [k.room, M.room],
          ])
            if (A) {
              let G = M.ctx.createGain();
              ((G.gain.value = A), C.connect(G), G.connect(N));
            }
          e.in[P] = C;
        }
        (M.raw(y, E, { g: R, rate: _, pan: L, to: C }), e.bed && e.bed.hit && e.bed.hit(y, S));
      }),
      param: c((y, S) => {
        if (b.quiet) return;
        S = Vn(+S || 0);
        let M = h[y] || (h[y] = { v: 0, to: 0, at: -9, n: 0 });
        ((M.n = e.clock - M.at < 0.25 && e.clock > M.at ? M.n + 1 : e.clock > M.at ? 0 : M.n),
          (M.to = S),
          (M.at = e.clock),
          e.bed && e.bed.param && e.bed.param(y, S));
      }),
      update: c((y, { scene: S = "", beat: M = 0 } = {}) => {
        ((e.clock += y || 0), (r = typeof performance < "u" ? performance.now() : 0));
        let w = e.E;
        !w ||
          (!i && w.ctx.state !== "running") ||
          (S && (S !== e.scene || !e.bed)
            ? ((e.scene = S), (e.beat = M), m(S, M))
            : M !== e.beat && ((e.beat = M), e.bed.to(M)),
          g(),
          v(w.now, y || 0.016));
      }),
      _: e,
      bank: t,
    };
  return (
    !i &&
      typeof setInterval < "u" &&
      setInterval(
        c(() => {
          e.E && e.bed && e.E.ctx.state === "running" && performance.now() - r > 300 && g();
        }),
        200,
      ),
    b
  );
}
