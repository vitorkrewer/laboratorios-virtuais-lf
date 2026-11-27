/* Mecânica: simuladores Gráficos do movimento, Forças e inércia, Queda livre, Energia na pista, Colisões, Lançamentos e Gangorra.
   Física simples e honesta: integração numérica passo a passo (Euler semi-implícito ou RK4), unidades do SI. */
window.MATH = window.MATH || {};

MATH.labs = (function () {
    'use strict';

    const $ = (s, r) => (r || document).querySelector(s);
    const D2R = Math.PI / 180, TAU = Math.PI * 2;
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    const lerp = (a, b, u) => a + (b - a) * u;
    const smooth = u => u * u * (3 - 2 * u);
    const cell = (lab, val, wide) => '<div' + (wide ? ' class="wide"' : '') + '><span>' + lab + '</span><b>' + val + '</b></div>';
    const visible = el => !!(el && el.offsetParent && el.closest('.lab-panel.active'));
    const SANS = '"Plus Jakarta Sans", sans-serif', MONO = '"JetBrains Mono", monospace';
    const F = (w, s, mono) => w + ' ' + s + 'px ' + (mono ? MONO : SANS);

    /* números em pt-BR: nf(1234.5, 1) → "1.234,5"; sci(3.2e8) → "3,2 × 10⁸" */
    const nf = (x, d) => (Math.abs(x) < 1e-12 ? 0 : x).toLocaleString('pt-BR', { maximumFractionDigits: d === undefined ? 0 : d, minimumFractionDigits: 0 });
    const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
    const sup = n => String(n).split('').map(ch => SUP[ch] || ch).join('');
    function sci(x, d, lo, hi) {
        if (!Number.isFinite(x)) return '∞';
        if (x === 0) return '0';
        d = d === undefined ? 2 : d; lo = lo === undefined ? -2 : lo; hi = hi === undefined ? 5 : hi;
        let e = Math.floor(Math.log10(Math.abs(x)));
        if (e >= lo && e <= hi) return nf(x, Math.max(0, d - 1 - e));
        let m = x / Math.pow(10, e);
        if (Math.abs(+m.toFixed(d - 1)) >= 10) { m /= 10; e += 1; }
        return m.toFixed(d - 1).replace('.', ',').replace(/,0+$/, '') + ' × 10' + sup(e);
    }
    /* intervalos de tempo em anos, com a unidade mais legível */
    function years(y) {
        const big = (v, one, many) => { const d = v >= 100 ? 0 : 1, s = nf(v, d); return s + ' ' + (+v.toFixed(d) < 2 ? one : many) + ' de anos'; };
        if (y >= 1e9) return big(y / 1e9, 'bilhão', 'bilhões');
        if (y >= 1e6) return big(y / 1e6, 'milhão', 'milhões');
        if (y >= 1e3) return nf(y / 1e3, y >= 1e4 ? 0 : 1) + ' mil anos';
        return nf(y, y < 10 ? 1 : 0) + (y > 0 && y < 2 ? ' ano' : ' anos');
    }
    function duration(s) {
        if (s < 1e-3) return nf(s * 1e6, 0) + ' µs';
        if (s < 1) return nf(s * 1e3, s < 0.01 ? 2 : 1) + ' ms';
        if (s < 120) return nf(s, 2) + ' s';
        if (s < 7200) return nf(s / 60, 1) + ' min';
        if (s < 172800) return nf(s / 3600, 1) + ' h';
        if (s < 3.156e7 * 2) return nf(s / 86400, 1) + ' dias';
        return years(s / 3.156e7);
    }

    function canvas2d(cv, bg) {
        const r = cv.getBoundingClientRect(), dpr = window.devicePixelRatio || 1, W = Math.round(r.width), H = Math.round(r.height);
        if (!W || !H) return null;
        if (cv.width !== W * dpr || cv.height !== H * dpr) { cv.width = W * dpr; cv.height = H * dpr; }
        const c = cv.getContext('2d'); c.setTransform(dpr, 0, 0, dpr, 0, 0);
        c.globalAlpha = 1; c.globalCompositeOperation = 'source-over';
        c.fillStyle = bg || '#05070f'; c.fillRect(0, 0, W, H);
        return { c, W, H };
    }
    function label(c, txt, x, y, color, font, align, base) {
        c.save(); c.font = font || F(600, 12); c.textAlign = align || 'left'; c.textBaseline = base || 'middle';
        c.lineWidth = 3; c.strokeStyle = 'rgba(5,7,15,.85)'; c.strokeText(txt, x, y); c.fillStyle = color; c.fillText(txt, x, y); c.restore();
    }
    /* texto sem contorno, para rótulos escuros sobre blocos coloridos */
    function ink(c, txt, x, y, color, font) {
        c.save(); c.font = font || F(600, 12); c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = color; c.fillText(txt, x, y); c.restore();
    }
    function arrowPx(c, x0, y0, x1, y1, color, w) {
        const a = Math.atan2(y1 - y0, x1 - x0), L = Math.hypot(x1 - x0, y1 - y0), hd = Math.min(9, L * 0.45);
        if (L < 1) return;
        c.save(); c.strokeStyle = color; c.fillStyle = color; c.lineWidth = w || 2; c.lineCap = 'round';
        c.beginPath(); c.moveTo(x0, y0); c.lineTo(x1 - hd * 0.6 * Math.cos(a), y1 - hd * 0.6 * Math.sin(a)); c.stroke();
        c.beginPath(); c.moveTo(x1, y1); c.lineTo(x1 - hd * Math.cos(a - 0.42), y1 - hd * Math.sin(a - 0.42)); c.lineTo(x1 - hd * Math.cos(a + 0.42), y1 - hd * Math.sin(a + 0.42)); c.closePath(); c.fill();
        c.restore();
    }
    /* gerador pseudoaleatório determinístico (mulberry32) */
    function rng(seed) {
        let a = seed >>> 0;
        return function () { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    }
    const gauss = r => { let u = 0, v = 0; while (!u) u = r(); v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(TAU * v); };
    /* cor aproximada de um corpo negro à temperatura T (K) */
    function bb(T) {
        const t = clamp(T, 1000, 40000) / 100;
        const r = t <= 66 ? 255 : 329.698727446 * Math.pow(t - 60, -0.1332047592);
        const g = t <= 66 ? 99.4708025861 * Math.log(t) - 161.1195681661 : 288.1221695283 * Math.pow(t - 60, -0.0755148492);
        const b = t >= 66 ? 255 : t <= 19 ? 0 : 138.5177312231 * Math.log(t - 10) - 305.0447927307;
        return [clamp(r, 0, 255) | 0, clamp(g, 0, 255) | 0, clamp(b, 0, 255) | 0];
    }
    const rgba = (c, a) => 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + (a === undefined ? 1 : a) + ')';
    function seg(name, opts, sel) {
        return '<div class="ctl seg" role="radiogroup" style="flex-wrap:wrap;gap:6px 12px">' + opts.map(o => '<label><input type="radio" name="' + name + '" value="' + o[0] + '"' + (String(o[0]) === String(sel) ? ' checked' : '') + '> ' + o[1] + '</label>').join('') + '</div>';
    }
    const radio = (root, name) => { const el = root.querySelector('input[name="' + name + '"]:checked'); return el ? el.value : null; };
    /* laço de animação que pausa quando o painel do simulador não está visível */
    function animator(cv, step) {
        const st = { on: false, raf: 0, last: 0 };
        function loop(ts) {
            if (!st.on || !visible(cv)) { st.raf = 0; st.last = 0; return; }
            const dt = st.last ? Math.min(0.1, (ts - st.last) / 1000) : 0;
            st.last = ts; step(dt, ts / 1000); st.raf = requestAnimationFrame(loop);
        }
        return {
            get on() { return st.on; },
            start() { st.on = true; if (!st.raf) { st.last = 0; st.raf = requestAnimationFrame(loop); } },
            stop() { st.on = false; },
            kick() { if (st.on && !st.raf) { st.last = 0; st.raf = requestAnimationFrame(loop); } }
        };
    }
    function hullFill(c, pts) {
        /* casca convexa (cadeia monótona) de pontos [x, y] */
        const p = pts.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
        if (p.length < 3) return;
        const cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
        const lo = [], up = [];
        for (const q of p) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop(); lo.push(q); }
        for (let i = p.length - 1; i >= 0; i--) { const q = p[i]; while (up.length >= 2 && cr(up[up.length - 2], up[up.length - 1], q) <= 0) up.pop(); up.push(q); }
        const h = lo.slice(0, -1).concat(up.slice(0, -1));
        c.beginPath(); h.forEach((q, i) => i ? c.lineTo(q[0], q[1]) : c.moveTo(q[0], q[1])); c.closePath(); c.fill();
    }

    /* ---------- auxiliares de desenho comuns ---------- */
    function drawCar(c, x, y, w, col, dir) {
        /* carrinho visto de lado; (x, y) = centro da base */
        const h = w * 0.42; c.save(); c.translate(x, y); if (dir < 0) c.scale(-1, 1);
        c.fillStyle = col; c.beginPath(); c.roundRect(-w / 2, -h * 0.75, w, h * 0.5, 4); c.fill();
        c.beginPath(); c.moveTo(-w * 0.28, -h * 0.75); c.lineTo(-w * 0.14, -h * 1.12); c.lineTo(w * 0.2, -h * 1.12); c.lineTo(w * 0.34, -h * 0.75); c.closePath(); c.fill();
        c.fillStyle = 'rgba(186,230,253,.85)'; c.beginPath(); c.moveTo(w * 0.04, -h * 0.8); c.lineTo(w * 0.04, -h * 1.06); c.lineTo(w * 0.18, -h * 1.06); c.lineTo(w * 0.29, -h * 0.8); c.closePath(); c.fill();
        c.fillStyle = '#0f172a'; [-w * 0.28, w * 0.28].forEach(wx => { c.beginPath(); c.arc(wx, -h * 0.22, h * 0.24, 0, TAU); c.fill(); c.fillStyle = '#94a3b8'; c.beginPath(); c.arc(wx, -h * 0.22, h * 0.1, 0, TAU); c.fill(); c.fillStyle = '#0f172a'; });
        c.restore();
    }
    function graphFrame(c, R, xl, yl, xmax, ymin, ymax, opts) {
        opts = opts || {};
        const g = { x0: R.x + 44, x1: R.x + R.w - 10, y0: R.y + R.h - 22, y1: R.y + 18 };
        c.fillStyle = '#070b16'; c.fillRect(R.x, R.y, R.w, R.h);
        c.strokeStyle = 'rgba(148,163,184,.18)'; c.strokeRect(R.x + 0.5, R.y + 0.5, R.w - 1, R.h - 1);
        g.X = t => g.x0 + t / xmax * (g.x1 - g.x0); g.Y = v => g.y0 - (v - ymin) / (ymax - ymin) * (g.y0 - g.y1);
        c.lineWidth = 1;
        const xs = opts.xstep || 1; for (let t = 0; t <= xmax + 1e-9; t += xs) { c.strokeStyle = 'rgba(148,163,184,.10)'; c.beginPath(); c.moveTo(g.X(t), g.y0); c.lineTo(g.X(t), g.y1); c.stroke(); if (opts.xlabels !== false && (t / xs) % (opts.xevery || 2) === 0) label(c, nf(t), g.X(t), g.y0 + 9, '#64748b', F(500, 9, true), 'center'); }
        const ys = opts.ystep || (ymax - ymin) / 4; for (let v = ymin; v <= ymax + 1e-9; v += ys) { c.strokeStyle = Math.abs(v) < 1e-9 ? 'rgba(148,163,184,.45)' : 'rgba(148,163,184,.10)'; c.beginPath(); c.moveTo(g.x0, g.Y(v)); c.lineTo(g.x1, g.Y(v)); c.stroke(); label(c, nf(v, 1), g.x0 - 5, g.Y(v), '#64748b', F(500, 9, true), 'right'); }
        label(c, yl, R.x + 6, R.y + 9, '#cbd5e1', F(700, 10));
        if (xl) label(c, xl, g.x1, g.y0 - 8, '#64748b', F(500, 9), 'right');
        return g;
    }
    function plotLine(c, g, pts, col, w, dash) {
        if (!pts.length) return;
        c.strokeStyle = col; c.lineWidth = w || 2; c.setLineDash(dash || []); c.beginPath();
        pts.forEach((p, i) => i ? c.lineTo(g.X(p[0]), g.Y(p[1])) : c.moveTo(g.X(p[0]), g.Y(p[1]))); c.stroke(); c.setLineDash([]);
    }
    /* seta de força com rótulo; comprimento em px */
    function forceArrow(c, x, y, ang, len, col, txt, side) {
        if (len < 2) return;
        const x1 = x + Math.cos(ang) * len, y1 = y + Math.sin(ang) * len;
        arrowPx(c, x, y, x1, y1, col, 3);
        if (txt) label(c, txt, x1 + Math.cos(ang) * 10 + (side || 0), y1 + Math.sin(ang) * 10, col, F(700, 11), Math.cos(ang) < -0.3 ? 'right' : Math.cos(ang) > 0.3 ? 'left' : 'center');
    }

    /* =====================================================================
       1. GRÁFICOS DO MOVIMENTO (posição, velocidade e aceleração; desafio)
       ===================================================================== */
    const MOVES = {
        parado: { n: 'parado', s0: 12, v0: 0, a: 0 },
        constante: { n: 'velocidade constante', s0: 2, v0: 4, a: 0 },
        rapido: { n: 'constante, mais rápido', s0: 2, v0: 7, a: 0 },
        acelerando: { n: 'acelerando', s0: 2, v0: 0, a: 1 },
        freando: { n: 'freando até parar', s0: 2, v0: 8, a: -0.8 },
        volta: { n: 'vai e volta', s0: 8, v0: 6, a: -1.2 }
    };
    const TARGETS = [
        [[0, 5], [2, 5], [6, 21], [8, 21], [10, 13]],
        [[0, 2], [4, 10], [6, 30], [10, 30]],
        [[0, 30], [3, 30], [7, 6], [10, 6]],
        [[0, 4], [3, 22], [5, 22], [10, 2]]
    ];
    function initMovimento(root) {
        root.innerHTML =
            '<div class="lab-grid">' +
              '<div class="lab-stage tall"><canvas id="mv-cv" aria-label="Carro na estrada e gráficos do movimento"></canvas></div>' +
              '<div class="lab-side">' +
                '<div class="ctl"><label>Modo</label>' + seg('mv-mode', [['ver', 'observar'], ['desafio', 'desafio: imite o gráfico']], 'ver') + '</div>' +
                '<div id="mv-pver"><div class="ctl"><label for="mv-pre">Movimento</label><select id="mv-pre">' + Object.keys(MOVES).map(k => '<option value="' + k + '"' + (k === 'constante' ? ' selected' : '') + '>' + MOVES[k].n + '</option>').join('') + '</select></div>' +
                  '<div class="ctl seg" style="flex-wrap:wrap;gap:6px 12px;font-size:.84rem"><label><input type="checkbox" id="mv-ac"> mostrar aceleração</label><label><input type="checkbox" id="mv-num"> mostrar números</label></div></div>' +
                '<div id="mv-pdes" hidden><div class="ctl"><label for="mv-v">Sua velocidade <b id="mv-vv"></b></label><input id="mv-v" type="range" min="-6" max="6" step="0.1" value="0"></div>' +
                  '<p class="muted-p" style="font-size:.82rem;margin:4px 0 0">Também dá para usar as setas ← e → do teclado. Para trás é velocidade negativa.</p>' +
                  '<button class="btn small" id="mv-next" type="button"><i class="fa-solid fa-shuffle"></i> Outro gráfico</button></div>' +
                '<div style="display:flex;gap:6px;flex-wrap:wrap"><button class="btn small primary" id="mv-go" type="button"><i class="fa-solid fa-play"></i> Começar</button></div>' +
                '<div class="readout" id="mv-out"></div>' +
              '</div>' +
            '</div>' +
            '<div class="lab-under">' +
              '<div class="lab-note"><strong>Leitura.</strong> O carro pinga uma gota de óleo na estrada a cada segundo: gotas igualmente espaçadas indicam velocidade constante; cada vez mais afastadas, acelerando; mais juntas, freando. Embaixo, os gráficos de posição e de velocidade são desenhados ao vivo, em 10 segundos.</div>' +
              '<div class="lab-note"><strong>Experimente.</strong> Antes de começar, tente prever a forma de cada gráfico. No desafio, o gráfico tracejado é o alvo: controle a velocidade do carro para que a linha de posição passe por cima dele. Dica: onde o alvo é plano, o carro precisa estar parado; quanto mais inclinado, mais rápido.</div>' +
            '</div>';
        const S = k => $('#mv-' + k, root), cv = S('cv');
        const st = { mode: 'ver', pre: 'constante', t: 0, run: false, s: 2, v: 0, a: 0, hist: [], drops: [], target: 0, uv: 0, score: null };
        const T = 10, SMAX = 40;
        function reset() {
            st.t = 0; st.hist = []; st.drops = []; st.score = null;
            if (st.mode === 'ver') { const m = MOVES[st.pre]; st.s = m.s0; st.v = m.v0; st.a = m.a; }
            else { st.s = TARGETS[st.target][0][1]; st.v = 0; st.a = 0; S('v').value = 0; st.uv = 0; }
            st.hist.push([0, st.s, st.v, st.a]); st.drops.push(st.s);
        }
        const targetAt = t => { const P = TARGETS[st.target]; for (let i = 1; i < P.length; i++) if (t <= P[i][0]) { const u = (t - P[i - 1][0]) / (P[i][0] - P[i - 1][0]); return lerp(P[i - 1][1], P[i][1], u); } return P[P.length - 1][1]; };
        function step(dt) {
            if (!st.run) return;
            dt = Math.min(dt, T - st.t);
            if (st.mode === 'ver') {
                const m = MOVES[st.pre];
                if (st.pre === 'freando' && st.v + st.a * dt <= 0) { st.s += st.v * st.v / (-2 * st.a) * (st.v > 0 ? 1 : 0); st.v = 0; st.a = 0; }
                else { st.s += st.v * dt + st.a * dt * dt / 2; st.v += st.a * dt; }
                void m;
            } else {
                const vNew = st.uv; st.a = (vNew - st.v) / Math.max(dt, 1e-3); st.v = vNew; st.s += st.v * dt;
            }
            st.s = clamp(st.s, -2, SMAX + 2);
            const prevSec = Math.floor(st.t + 1e-9); st.t += dt;
            if (Math.floor(st.t + 1e-9) > prevSec) st.drops.push(st.s);
            st.hist.push([st.t, st.s, st.v, st.mode === 'ver' ? st.a : clamp(st.a, -6, 6)]);
            if (st.t >= T - 1e-9) {
                st.run = false; btn();
                if (st.mode === 'desafio') { let e = 0; st.hist.forEach(h => { e += Math.abs(h[1] - targetAt(h[0])); }); e /= st.hist.length; st.score = Math.max(0, Math.round(100 * (1 - e / 8))); }
            }
        }
        function draw() {
            const gg = canvas2d(cv, '#04060d'); if (!gg) return;
            const { c, W, H } = gg, roadH = Math.min(150, H * 0.3), num = S('num').checked || st.mode === 'desafio';
            /* estrada */
            const x0 = 30, x1 = W - 30, X = s => x0 + s / SMAX * (x1 - x0), ry = roadH - 30;
            const sky = c.createLinearGradient(0, 0, 0, ry); sky.addColorStop(0, '#0b1730'); sky.addColorStop(1, '#13233f'); c.fillStyle = sky; c.fillRect(0, 0, W, ry);
            c.fillStyle = '#1f2937'; c.fillRect(0, ry, W, 30); c.strokeStyle = 'rgba(250,204,21,.6)'; c.setLineDash([14, 12]); c.beginPath(); c.moveTo(0, ry + 15); c.lineTo(W, ry + 15); c.stroke(); c.setLineDash([]);
            for (let s = 0; s <= SMAX; s += 5) { c.fillStyle = '#94a3b8'; c.fillRect(X(s) - 0.5, ry + 26, 1, 4); label(c, s + ' m', X(s), ry - 8, 'rgba(148,163,184,.7)', F(500, 9), 'center'); }
            st.drops.forEach((d, i) => { c.fillStyle = '#0ea5e9'; c.beginPath(); c.ellipse(X(d), ry + 22, 5, 2.5, 0, 0, TAU); c.fill(); if (num) label(c, i + ' s', X(d), ry + 36 > roadH ? ry + 8 : ry + 36, '#7dd3fc', F(600, 9), 'center'); });
            drawCar(c, X(st.s), ry + 18, 54, '#f472b6', st.v < -0.01 ? -1 : 1);
            if (Math.abs(st.v) > 0.05) arrowPx(c, X(st.s), ry - 26, X(st.s) + st.v * 9, ry - 26, '#34d399', 2.5);
            if (S('ac').checked && st.mode === 'ver' && Math.abs(st.a) > 0.01) arrowPx(c, X(st.s), ry - 40, X(st.s) + st.a * 22, ry - 40, '#fbbf24', 2.5);
            label(c, st.mode === 'desafio' ? 'Desafio: faça a linha rosa passar por cima da tracejada' : MOVES[st.pre].n, 12, 14, '#e2e8f0', F(700, 12));
            label(c, 't = ' + nf(st.t, 1) + ' s', W - 12, 14, '#cbd5e1', F(700, 12, true), 'right');
            /* gráficos */
            const showA = S('ac').checked && st.mode === 'ver', nG = showA ? 3 : 2, gh = (H - roadH - 6) / nG;
            const gs = graphFrame(c, { x: 0, y: roadH + 2, w: W, h: gh - 2 }, 'tempo (s)', 'posição (m)', T, 0, SMAX, { ystep: 10, xevery: 2 });
            if (st.mode === 'desafio') plotLine(c, gs, TARGETS[st.target], 'rgba(253,224,71,.85)', 3, [6, 5]);
            plotLine(c, gs, st.hist.map(h => [h[0], h[1]]), '#f472b6', 2.5);
            const gv = graphFrame(c, { x: 0, y: roadH + 2 + gh, w: W, h: gh - 2 }, 'tempo (s)', 'velocidade (m/s)', T, -8, 8, { ystep: 4, xevery: 2 });
            plotLine(c, gv, st.hist.map(h => [h[0], h[2]]), '#34d399', 2.5);
            if (showA) { const ga = graphFrame(c, { x: 0, y: roadH + 2 + 2 * gh, w: W, h: gh - 2 }, 'tempo (s)', 'aceleração (m/s²)', T, -2, 2, { ystep: 1, xevery: 2 }); plotLine(c, ga, st.hist.map(h => [h[0], h[3]]), '#fbbf24', 2.5); }
            if (st.score !== null) { c.fillStyle = 'rgba(15,23,42,.9)'; c.beginPath(); c.roundRect(W / 2 - 120, roadH / 2 - 26, 240, 52, 10); c.fill(); label(c, 'Acerto: ' + st.score + '%', W / 2, roadH / 2 - 6, st.score >= 80 ? '#34d399' : st.score >= 50 ? '#fde047' : '#f87171', F(800, 18), 'center'); label(c, st.score >= 80 ? 'Excelente!' : 'Tente de novo', W / 2, roadH / 2 + 14, '#cbd5e1', F(600, 11), 'center'); }
            readout(num);
        }
        function readout(num) {
            S('vv').textContent = nf(st.uv, 1) + ' m/s';
            const m = st.mode === 'ver' ? MOVES[st.pre] : null;
            let h = cell('Posição', num ? nf(st.s, 1) + ' m' : '—') + cell('Velocidade', num ? nf(st.v, 1) + ' m/s' : (Math.abs(st.v) < 0.05 ? 'parado' : st.v > 0 ? 'para a frente' : 'para trás'));
            if (m) h += cell('Aceleração', num ? nf(st.a, 1) + ' m/s²' : (Math.abs(st.a) < 0.01 ? 'nenhuma' : st.a * st.v >= 0 ? 'ficando mais rápido' : 'ficando mais lento'), true);
            if (m) h += cell('Como fica o gráfico de posição?', { parado: 'reta horizontal', constante: 'reta inclinada', rapido: 'reta mais inclinada', acelerando: 'curva cada vez mais inclinada', freando: 'curva cada vez menos inclinada, até ficar plana', volta: 'sobe, fica plana no topo e desce' }[st.pre], true);
            else h += cell('Gráfico-alvo', (st.target + 1) + ' de ' + TARGETS.length, true);
            $('#mv-out', root).innerHTML = h;
        }
        function btn() { S('go').innerHTML = st.run ? '<i class="fa-solid fa-stop"></i> Parar' : '<i class="fa-solid fa-play"></i> ' + (st.t > 0 ? 'De novo' : 'Começar'); }
        const anim = animator(cv, dt => { step(dt); draw(); });
        root.querySelectorAll('input[name="mv-mode"]').forEach(el => el.addEventListener('change', () => { st.mode = radio(root, 'mv-mode'); S('pver').hidden = st.mode !== 'ver'; S('pdes').hidden = st.mode !== 'desafio'; st.run = false; reset(); btn(); draw(); }));
        S('pre').addEventListener('change', () => { st.pre = S('pre').value; st.run = false; reset(); btn(); draw(); });
        ['ac', 'num'].forEach(k => S(k).addEventListener('change', draw));
        S('v').addEventListener('input', () => { st.uv = +S('v').value; });
        S('next').addEventListener('click', () => { st.target = (st.target + 1) % TARGETS.length; st.run = false; reset(); btn(); draw(); });
        S('go').addEventListener('click', () => { if (st.run) { st.run = false; } else { reset(); st.run = true; } btn(); });
        root.addEventListener('keydown', e => {
            if (st.mode !== 'desafio') return;
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { st.uv = clamp(st.uv + (e.key === 'ArrowRight' ? 0.5 : -0.5), -6, 6); S('v').value = st.uv; e.preventDefault(); }
        });
        cv.tabIndex = 0;
        if (window.ResizeObserver) new ResizeObserver(() => draw()).observe(cv);
        reset(); anim.start();
        return () => { draw(); anim.kick(); };
    }

    /* =====================================================================
       2. FORÇAS E INÉRCIA (chão e plano inclinado, com diagrama de forças ao vivo)
       ===================================================================== */
    const SURF = [['sem atrito (ideal)', 0], ['gelo', 0.05], ['madeira', 0.35], ['borracha no asfalto', 0.8]];
    function initForcas(root) {
        root.innerHTML =
            '<div class="lab-grid">' +
              '<div class="lab-stage tall"><canvas id="fo-cv" aria-label="Caixa com as forças desenhadas"></canvas></div>' +
              '<div class="lab-side">' +
                '<div class="ctl"><label>Situação</label>' + seg('fo-mode', [['chao', 'caixa no chão'], ['rampa', 'caixa na rampa']], 'chao') + '</div>' +
                '<div class="ctl"><label for="fo-s">Superfície</label><select id="fo-s">' + SURF.map((s, i) => '<option value="' + i + '"' + (i === 2 ? ' selected' : '') + '>' + s[0] + '</option>').join('') + '</select></div>' +
                '<div class="ctl"><label for="fo-m">Massa da caixa <b id="fo-mv"></b></label><input id="fo-m" type="range" min="5" max="100" step="5" value="40"></div>' +
                '<div id="fo-pchao"><div class="ctl"><label for="fo-f">Empurrão <b id="fo-fv"></b></label><input id="fo-f" type="range" min="-300" max="300" step="5" value="0"></div>' +
                  '<div style="display:flex;gap:6px;flex-wrap:wrap"><button class="btn small" id="fo-zero" type="button"><i class="fa-solid fa-hand"></i> Soltar (empurrão zero)</button><button class="btn small" id="fo-stop" type="button"><i class="fa-solid fa-rotate-left"></i> Parar a caixa</button></div></div>' +
                '<div id="fo-prampa" hidden><div class="ctl"><label for="fo-ang">Inclinação da rampa <b id="fo-angv"></b></label><input id="fo-ang" type="range" min="0" max="60" step="1" value="10"></div>' +
                  '<button class="btn small" id="fo-up" type="button"><i class="fa-solid fa-rotate-left"></i> Pôr a caixa no alto</button></div>' +
                '<div class="ctl seg" style="flex-wrap:wrap;gap:6px 12px;font-size:.84rem"><label><input type="checkbox" id="fo-res" checked> força resultante</label><label><input type="checkbox" id="fo-num"> mostrar números</label></div>' +
                '<div class="readout" id="fo-out"></div>' +
              '</div>' +
            '</div>' +
            '<div class="lab-under">' +
              '<div class="lab-note"><strong>Leitura.</strong> As setas são as forças que agem na caixa, com tamanho proporcional à intensidade: peso (vermelho), normal (azul), empurrão (verde), atrito (laranja). A seta tracejada é a força resultante. As marcas no chão mostram a caixa andando mesmo quando ela sai da tela.</div>' +
              '<div class="lab-note"><strong>Experimente.</strong> Escolha "sem atrito", dê um empurrão curto e solte: a caixa segue para sempre com a mesma velocidade (inércia). Com atrito, empurre devagar: até um certo valor, a caixa não sai do lugar, porque o atrito estático cresce junto. Na rampa, aumente a inclinação até a caixa escorregar.</div>' +
            '</div>';
        const S = k => $('#fo-' + k, root), cv = S('cv');
        const g = 9.8, st = { mode: 'chao', mu: 0.35, m: 40, F: 0, x: 0, v: 0, ang: 10, sR: 0, vR: 0, fr: 0, N: 0, net: 0, a: 0, moving: false, trail: [] };
        const muS = () => st.mu * 1.25;
        function step(dt) {
            const m = st.m;
            if (st.mode === 'chao') {
                const N = m * g; st.N = N; let fr = 0;
                if (Math.abs(st.v) < 1e-3) {
                    st.v = 0;
                    if (Math.abs(st.F) <= muS() * N) { fr = -st.F; st.moving = false; } else { fr = -Math.sign(st.F) * st.mu * N; st.moving = true; }
                } else { fr = -Math.sign(st.v) * st.mu * N; st.moving = true; }
                let net = st.F + fr, a = net / m;
                const vNew = st.v + a * dt;
                if (st.v !== 0 && Math.sign(vNew) !== Math.sign(st.v) && Math.abs(st.F) <= muS() * N) { st.v = 0; a = 0; net = 0; fr = -st.F; }
                else st.v = vNew;
                st.x += st.v * dt; st.fr = fr; st.net = net; st.a = a;
            } else {
                const th = st.ang * D2R, N = m * g * Math.cos(th), Pp = m * g * Math.sin(th); st.N = N; let fr;
                if (Math.abs(st.vR) < 1e-3) { st.vR = 0; if (Pp <= muS() * N) { fr = -Pp; st.moving = false; } else { fr = -st.mu * N; st.moving = true; } }
                else { fr = -Math.sign(st.vR) * st.mu * N; st.moving = true; }
                const net = Pp + fr; st.vR += net / m * dt; st.sR += st.vR * dt; st.fr = fr; st.net = net; st.a = net / m;
                if (st.sR > 9) { st.sR = 9; st.vR = 0; }
            }
        }
        function draw() {
            const gg = canvas2d(cv, '#04060d'); if (!gg) return;
            const { c, W, H } = gg, num = S('num').checked;
            const kpx = Math.min(H * 0.22, 100) / Math.max(st.m * g, Math.abs(st.F), 1); /* a maior força do desenho mede ~100 px */
            const fpx = v => Math.abs(v) * kpx;
            if (st.mode === 'chao') {
                const gy = H * 0.62, bw = 46 + st.m * 0.7, bh = bw * 0.8, cx = W / 2, cy = gy - bh / 2, ppm = 60;
                c.fillStyle = '#111827'; c.fillRect(0, gy, W, H - gy);
                const surfCol = ['#334155', '#a5f3fc', '#a16207', '#1f2937'][SURF.findIndex(s => s[1] === st.mu)];
                c.fillStyle = surfCol; c.fillRect(0, gy, W, 6);
                /* marcas do chão (a câmera segue a caixa) */
                c.fillStyle = 'rgba(203,213,225,.45)';
                for (let k = Math.floor((st.x * ppm - W) / 60); k < (st.x * ppm + W) / 60; k++) { const x = cx + k * 60 - st.x * ppm; c.fillRect(x, gy + 8, 2, 10); if (k % 5 === 0) label(c, nf(k) + ' m', x, gy + 26, '#64748b', F(500, 9), 'center'); }
                c.fillStyle = '#b45309'; c.strokeStyle = '#78350f'; c.lineWidth = 2; c.fillRect(cx - bw / 2, gy - bh, bw, bh); c.strokeRect(cx - bw / 2, gy - bh, bw, bh);
                c.strokeStyle = 'rgba(120,53,15,.8)'; c.beginPath(); c.moveTo(cx - bw / 2, gy - bh); c.lineTo(cx + bw / 2, gy); c.moveTo(cx + bw / 2, gy - bh); c.lineTo(cx - bw / 2, gy); c.stroke();
                label(c, nf(st.m) + ' kg', cx, gy - bh / 2, '#fde68a', F(800, 12), 'center');
                /* mão empurrando */
                if (Math.abs(st.F) > 0) { const hx = st.F > 0 ? cx - bw / 2 - 14 : cx + bw / 2 + 14; c.font = '900 22px "Font Awesome 6 Free"'; c.fillStyle = '#86efac'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(st.F > 0 ? '' : '', hx, cy); }
                const P = st.m * g;
                forceArrow(c, cx, cy, Math.PI / 2, fpx(P), '#f87171', 'peso' + (num ? ' ' + nf(P) + ' N' : ''));
                forceArrow(c, cx, cy, -Math.PI / 2, fpx(st.N), '#60a5fa', 'normal' + (num ? ' ' + nf(st.N) + ' N' : ''));
                if (Math.abs(st.F) > 0.5) forceArrow(c, st.F > 0 ? cx - bw / 2 : cx + bw / 2, cy - bh * 0.15, st.F > 0 ? 0 : Math.PI, fpx(st.F), '#4ade80', 'empurrão' + (num ? ' ' + nf(Math.abs(st.F)) + ' N' : ''));
                if (Math.abs(st.fr) > 0.5) forceArrow(c, cx, gy - 3, st.fr > 0 ? 0 : Math.PI, fpx(st.fr), '#fb923c', 'atrito' + (num ? ' ' + nf(Math.abs(st.fr)) + ' N' : ''), 0);
                if (S('res').checked && Math.abs(st.net) > 0.5) { c.save(); c.setLineDash([5, 4]); forceArrow(c, cx, gy - bh - 20, st.net > 0 ? 0 : Math.PI, fpx(st.net), '#e2e8f0', 'resultante'); c.restore(); }
                if (Math.abs(st.v) > 0.02) arrowPx(c, cx - 30 * Math.sign(st.v), 40, cx + 30 * Math.sign(st.v) + st.v * 6, 40, '#34d399', 2);
                label(c, Math.abs(st.v) < 0.02 ? 'parada' : 'velocidade ' + nf(Math.abs(st.v), 2) + ' m/s ' + (st.v > 0 ? '→' : '←'), cx, 24, '#34d399', F(700, 12), 'center');
            } else {
                const th = st.ang * D2R, L = Math.min(W * 0.8, (H - 60) / Math.max(Math.sin(th), 0.25) * 0.9), bx = W * 0.1, by = H - 40;
                const tx = bx + L * Math.cos(th), ty = by - L * Math.sin(th);
                c.fillStyle = '#1e293b'; c.beginPath(); c.moveTo(bx, by); c.lineTo(tx, by); c.lineTo(tx, ty); c.closePath(); c.fill();
                c.strokeStyle = ['#64748b', '#a5f3fc', '#a16207', '#94a3b8'][SURF.findIndex(s => s[1] === st.mu)]; c.lineWidth = 4; c.beginPath(); c.moveTo(bx, by); c.lineTo(tx, ty); c.stroke();
                c.fillStyle = '#111827'; c.fillRect(0, by, W, H - by);
                label(c, nf(st.ang) + '°', bx + 40, by - 10, '#cbd5e1', F(700, 11));
                /* a caixa desliza rampa abaixo a partir do topo */
                const bw = 40 + st.m * 0.5, pos = clamp(L - 30 - st.sR * (L - 60) / 9, bw / 2, L), px = bx + pos * Math.cos(th), py = by - pos * Math.sin(th);
                c.save(); c.translate(px, py); c.rotate(-th); c.fillStyle = '#b45309'; c.strokeStyle = '#78350f'; c.lineWidth = 2; c.fillRect(-bw / 2, -bw * 0.8, bw, bw * 0.8); c.strokeRect(-bw / 2, -bw * 0.8, bw, bw * 0.8); c.restore();
                const ccx = px - Math.sin(th) * bw * 0.4, ccy = py - Math.cos(th) * bw * 0.4, P = st.m * g;
                forceArrow(c, ccx, ccy, Math.PI / 2, fpx(P), '#f87171', 'peso' + (num ? ' ' + nf(P) + ' N' : ''));
                forceArrow(c, ccx, ccy, -Math.PI / 2 - th, fpx(st.N), '#60a5fa', 'normal' + (num ? ' ' + nf(st.N) + ' N' : ''));
                if (Math.abs(st.fr) > 0.5) forceArrow(c, px, py, -th, fpx(st.fr), '#fb923c', 'atrito' + (num ? ' ' + nf(Math.abs(st.fr)) + ' N' : ''));
                c.save(); c.globalAlpha = 0.5; c.setLineDash([3, 3]); forceArrow(c, ccx, ccy, Math.PI - th, fpx(P * Math.sin(th)), '#fca5a5', 'parte do peso rampa abaixo'); c.restore();
                if (S('res').checked && Math.abs(st.net) > 0.5) { c.save(); c.setLineDash([5, 4]); forceArrow(c, ccx - Math.sin(th) * 40, ccy - Math.cos(th) * 40, Math.PI - th, fpx(st.net), '#e2e8f0', 'resultante'); c.restore(); }
                label(c, st.moving ? 'escorregando: ' + nf(Math.abs(st.vR), 2) + ' m/s' : 'parada: o atrito segura', W / 2, 20, st.moving ? '#fbbf24' : '#34d399', F(700, 12), 'center');
            }
            readout();
        }
        function readout() {
            const num = S('num').checked, P = st.m * g, crit = Math.atan(muS()) / D2R;
            S('mv').textContent = nf(st.m) + ' kg'; S('fv').textContent = (st.F > 0 ? '→ ' : st.F < 0 ? '← ' : '') + nf(Math.abs(st.F)) + ' N'; S('angv').textContent = nf(st.ang) + '°';
            const state = st.mode === 'chao' ? (st.moving ? (Math.abs(st.net) < 0.5 ? 'velocidade constante: forças equilibradas' : st.net * st.v > 0 ? 'acelerando' : 'freando') : (Math.abs(st.F) > 0 ? 'parada: o atrito estático equilibra o empurrão' : 'parada: forças equilibradas'))
                : (st.moving ? 'escorregando e acelerando' : 'parada: forças equilibradas');
            let h = cell('O que acontece', state, true) +
                cell('Força resultante', num ? nf(Math.abs(st.net), 0) + ' N' : (Math.abs(st.net) < 0.5 ? 'zero' : 'diferente de zero')) + cell('Aceleração', num ? nf(Math.abs(st.a), 2) + ' m/s²' : (Math.abs(st.a) < 0.01 ? 'zero' : 'sim'));
            if (st.mode === 'chao') h += cell('Atrito máximo antes de escorregar', nf(muS() * P, 0) + ' N', true);
            else h += cell('Ângulo em que a caixa começa a escorregar', st.mu ? nf(crit, 1) + '°' : 'qualquer inclinação', true);
            $('#fo-out', root).innerHTML = h;
        }
        const anim = animator(cv, dt => { step(Math.min(dt, 0.03)); draw(); });
        root.querySelectorAll('input[name="fo-mode"]').forEach(el => el.addEventListener('change', () => { st.mode = radio(root, 'fo-mode'); S('pchao').hidden = st.mode !== 'chao'; S('prampa').hidden = st.mode !== 'rampa'; st.v = 0; st.vR = 0; st.sR = 0; draw(); }));
        S('s').addEventListener('change', () => { st.mu = SURF[+S('s').value][1]; draw(); });
        S('m').addEventListener('input', () => { st.m = +S('m').value; draw(); });
        S('f').addEventListener('input', () => { st.F = +S('f').value; draw(); });
        S('zero').addEventListener('click', () => { st.F = 0; S('f').value = 0; });
        S('stop').addEventListener('click', () => { st.v = 0; st.x = 0; st.F = 0; S('f').value = 0; });
        S('ang').addEventListener('input', () => { st.ang = +S('ang').value; draw(); });
        S('up').addEventListener('click', () => { st.sR = 0; st.vR = 0; });
        ['res', 'num'].forEach(k => S(k).addEventListener('change', draw));
        if (window.ResizeObserver) new ResizeObserver(() => draw()).observe(cv);
        anim.start();
        return () => { draw(); anim.kick(); };
    }

    /* =====================================================================
       3. QUEDA LIVRE E RESISTÊNCIA DO AR
       Aceleração: a = g (1 − v|v| / vt²), com vt a velocidade terminal de cada objeto no ar.
       ===================================================================== */
    const FALLERS = [
        { id: 'boliche', n: 'bola de boliche (7 kg)', vt: 80, r: 13, col: '#1e3a8a' },
        { id: 'tenis', n: 'bola de tênis (57 g)', vt: 24, r: 8, col: '#d9f99d' },
        { id: 'martelo', n: 'martelo', vt: 45, r: 10, col: '#94a3b8' },
        { id: 'pena', n: 'pena', vt: 0.6, r: 9, col: '#f8fafc' },
        { id: 'folha', n: 'folha de papel aberta', vt: 1.2, r: 14, col: '#e2e8f0' },
        { id: 'bolinha', n: 'folha de papel amassada', vt: 6, r: 7, col: '#cbd5e1' },
        { id: 'gota', n: 'gota de chuva', vt: 9, r: 5, col: '#7dd3fc' },
        { id: 'para', n: 'paraquedista', vt: 55, vtOpen: 5.5, r: 11, col: '#f472b6' }
    ];
    const WORLDS = [['terra', 'Terra, com ar', 9.8, true], ['vacuo', 'Terra, sem ar (vácuo)', 9.8, false], ['lua', 'Lua (sem ar)', 1.62, false]];
    function initQueda(root) {
        const opt = sel => FALLERS.map((f, i) => '<option value="' + i + '"' + (i === sel ? ' selected' : '') + '>' + f.n + '</option>').join('');
        root.innerHTML =
            '<div class="lab-grid">' +
              '<div class="lab-stage tall"><canvas id="qd-cv" aria-label="Dois objetos caindo e o gráfico da velocidade"></canvas></div>' +
              '<div class="lab-side">' +
                '<div class="ctl"><label for="qd-a">Objeto da esquerda</label><select id="qd-a">' + opt(2) + '</select></div>' +
                '<div class="ctl"><label for="qd-b">Objeto da direita</label><select id="qd-b">' + opt(3) + '</select></div>' +
                '<div class="ctl"><label>Onde</label>' + seg('qd-w', WORLDS.map(w => [w[0], w[1]]), 'terra') + '</div>' +
                '<div class="ctl"><label for="qd-h">Altura <b id="qd-hv"></b></label><input id="qd-h" type="range" min="2" max="1000" step="1" value="20"></div>' +
                '<div style="display:flex;gap:6px;flex-wrap:wrap"><button class="btn small primary" id="qd-go" type="button"><i class="fa-solid fa-play"></i> Soltar</button><button class="btn small" id="qd-open" type="button" hidden><i class="fa-solid fa-parachute-box"></i> Abrir paraquedas</button>' +
                  '<select id="qd-sp" class="plain-in" aria-label="Velocidade da animação" style="width:auto"><option value="1">tempo real</option><option value="0.25">câmera lenta</option><option value="5">5× mais rápido</option></select></div>' +
                '<div class="readout" id="qd-out"></div>' +
              '</div>' +
            '</div>' +
            '<div class="lab-under">' +
              '<div class="lab-note"><strong>Leitura.</strong> Os dois objetos são soltos juntos, do repouso. A régua mostra a altura; as marcas deixadas a cada 0,2 s mostram o objeto ganhando velocidade (marcas cada vez mais afastadas). No gráfico, a velocidade de cada um: sem ar, as duas linhas coincidem e sobem em reta; com ar, cada uma se curva até a velocidade terminal (tracejado).</div>' +
              '<div class="lab-note"><strong>Experimente.</strong> Martelo e pena na Terra, depois no vácuo e na Lua. Compare a folha aberta com a amassada: mesma massa, quedas diferentes. Solte o paraquedista de 1 000 m e abra o paraquedas no meio da queda: a velocidade cai até uma nova velocidade terminal, bem menor.</div>' +
            '</div>';
        const S = k => $('#qd-' + k, root), cv = S('cv');
        const st = { w: 0, H: 20, run: false, t: 0, o: [], open: false };
        const world = () => WORLDS[st.w];
        function reset() {
            st.t = 0; st.open = false;
            st.o = [+S('a').value, +S('b').value].map(i => ({ f: FALLERS[i], y: st.H, v: 0, done: false, tland: null, hist: [[0, 0]], marks: [] }));
            S('open').hidden = !st.o.some(o => o.f.id === 'para') || !world()[3];
        }
        function step(dt) {
            if (!st.run) return;
            const [, , gg, air] = world(), n = Math.max(1, Math.ceil(dt / 0.002)), h = dt / n;
            for (let k = 0; k < n; k++) {
                st.t += h;
                st.o.forEach(o => {
                    if (o.done) return;
                    const vt = o.f.id === 'para' && st.open ? o.f.vtOpen : o.f.vt;
                    const a = air ? gg * (1 - o.v * Math.abs(o.v) / (vt * vt)) : gg;
                    o.v += a * h; o.y -= o.v * h;
                    if (o.y <= 0) { o.y = 0; o.done = true; o.tland = st.t; }
                });
            }
            st.o.forEach(o => {
                const last = o.hist[o.hist.length - 1]; if (!o.done && st.t - last[0] > 0.03) o.hist.push([st.t, o.v]); else if (o.done && last[1] !== 0 && o.tland) { o.hist.push([o.tland, o.v]); o.hist.push([o.tland + 1e-3, 0]); }
                if (!o.done && (o.marks.length === 0 || st.t - o.marks[o.marks.length - 1][0] >= 0.2)) o.marks.push([st.t, o.y]);
            });
            if (st.o.every(o => o.done)) { st.run = false; btn(); }
        }
        function draw() {
            const gg = canvas2d(cv, '#04060d'); if (!gg) return;
            const { c, W, H } = gg, wide = W >= 640;
            const A = wide ? { x: 0, y: 0, w: W * 0.48, h: H } : { x: 0, y: 0, w: W, h: H * 0.55 }, G = wide ? { x: W * 0.48, y: 0, w: W * 0.52, h: H } : { x: 0, y: H * 0.55, w: W, h: H * 0.45 };
            const top = A.y + 30, bot = A.y + A.h - 26, Y = y => bot - y / st.H * (bot - top);
            const lua = world()[0] === 'lua';
            const sky = c.createLinearGradient(0, top, 0, bot); sky.addColorStop(0, lua ? '#020617' : world()[3] ? '#0c2a4a' : '#0b1020'); sky.addColorStop(1, lua ? '#0f172a' : world()[3] ? '#1e3a5f' : '#111827');
            c.fillStyle = sky; c.fillRect(A.x, A.y, A.w, A.h);
            if (lua) { const rn = rng(4); for (let i = 0; i < 60; i++) { c.fillStyle = 'rgba(226,232,240,' + (0.2 + rn() * 0.5) + ')'; c.fillRect(A.x + rn() * A.w, A.y + rn() * A.h * 0.8, 1.2, 1.2); } }
            c.fillStyle = lua ? '#6b7280' : '#166534'; c.fillRect(A.x, bot, A.w, A.y + A.h - bot);
            /* régua */
            const step = st.H <= 5 ? 1 : st.H <= 25 ? 5 : st.H <= 120 ? 20 : st.H <= 400 ? 100 : 200;
            for (let y = 0; y <= st.H + 1e-9; y += step) { c.fillStyle = 'rgba(203,213,225,.5)'; c.fillRect(A.x + 8, Y(y), 10, 1); label(c, nf(y) + ' m', A.x + 22, Y(y), '#94a3b8', F(500, 9)); }
            st.o.forEach((o, i) => {
                const x = A.x + A.w * (0.42 + i * 0.3), col = o.f.col;
                c.fillStyle = rgba([148, 163, 184], 0.35); o.marks.forEach(m => { c.fillRect(x - 10, Y(m[1]), 20, 1.2); });
                const y = Y(o.y) - o.f.r;
                if (o.f.id === 'para') {
                    if (st.open) { c.fillStyle = '#f472b6'; c.beginPath(); c.arc(x, y - 30, 22, Math.PI, 0); c.fill(); c.strokeStyle = 'rgba(244,114,182,.7)'; c.beginPath(); c.moveTo(x - 22, y - 30); c.lineTo(x, y); c.lineTo(x + 22, y - 30); c.stroke(); }
                    c.fillStyle = '#fde68a'; c.beginPath(); c.arc(x, y - 6, 4, 0, TAU); c.fill(); c.strokeStyle = '#fde68a'; c.lineWidth = 2; c.beginPath(); c.moveTo(x, y - 2); c.lineTo(x, y + 8); c.moveTo(x - 7, y + 2); c.lineTo(x + 7, y + 2); c.stroke();
                } else if (o.f.id === 'pena') {
                    c.save(); c.translate(x, y); c.rotate(0.4 + Math.sin(st.t * 3 + i) * (world()[3] && st.run ? 0.5 : 0)); c.fillStyle = col; c.beginPath(); c.ellipse(0, 0, 4, 14, 0, 0, TAU); c.fill(); c.strokeStyle = '#94a3b8'; c.beginPath(); c.moveTo(0, -14); c.lineTo(0, 16); c.stroke(); c.restore();
                } else if (o.f.id === 'folha') {
                    c.save(); c.translate(x, y); c.rotate(Math.sin(st.t * 2 + i) * (world()[3] && st.run ? 0.6 : 0)); c.fillStyle = col; c.fillRect(-16, -2, 32, 4); c.restore();
                } else if (o.f.id === 'martelo') {
                    c.fillStyle = '#a16207'; c.fillRect(x - 2, y - 4, 4, 22); c.fillStyle = col; c.fillRect(x - 10, y - 10, 20, 8);
                } else { c.fillStyle = col; c.beginPath(); c.arc(x, y, o.f.r, 0, TAU); c.fill(); }
                label(c, o.f.n.replace(/ \(.*\)/, ''), x, A.y + 14, '#e2e8f0', F(700, 11), 'center');
                if (o.done) label(c, nf(o.tland, 2) + ' s', x, bot + 12, '#fde047', F(800, 12), 'center');
            });
            label(c, world()[1], A.x + A.w - 8, A.y + 14 + (wide ? 0 : 0), '#94a3b8', F(600, 10), 'right');
            /* gráfico da velocidade */
            const tmax = Math.max(2, ...st.o.map(o => o.tland || st.t)) * 1.05, vmax = Math.max(5, ...st.o.map(o => Math.max(...o.hist.map(h => h[1])))) * 1.15;
            const gr = graphFrame(c, { x: G.x + 4, y: G.y + 4, w: G.w - 8, h: G.h - 8 }, 'tempo (s)', 'velocidade (m/s)', tmax, 0, vmax, { xstep: niceStep(tmax), ystep: niceStep(vmax), xevery: 1 });
            const cols = ['#f472b6', '#7dd3fc'];
            st.o.forEach((o, i) => {
                if (world()[3]) { const vt = o.f.id === 'para' && st.open ? o.f.vtOpen : o.f.vt; if (vt < vmax) plotLine(c, gr, [[0, vt], [tmax, vt]], rgba(i ? [125, 211, 252] : [244, 114, 182], 0.45), 1, [4, 4]); }
                plotLine(c, gr, o.hist, cols[i], 2.5);
            });
            if (!world()[3]) plotLine(c, gr, [[0, 0], [tmax, world()[2] * tmax]], 'rgba(253,224,71,.35)', 1, [2, 4]);
            readout();
        }
        function niceStep(x) { const r = x / 5, p = Math.pow(10, Math.floor(Math.log10(r))), m = r / p; return (m < 1.5 ? 1 : m < 3.5 ? 2 : m < 7.5 ? 5 : 10) * p; }
        function readout() {
            S('hv').textContent = nf(st.H) + ' m';
            const [, , gg, air] = world(), tv = Math.sqrt(2 * st.H / gg);
            let h = cell('Tempo de queda sem ar', nf(tv, 2) + ' s') + cell('Velocidade final sem ar', nf(gg * tv, 1) + ' m/s (' + nf(gg * tv * 3.6, 0) + ' km/h)');
            st.o.forEach((o, i) => { h += cell((i ? 'Direita' : 'Esquerda') + ': ' + o.f.n.replace(/ \(.*\)/, ''), o.done ? 'chegou em ' + nf(o.tland, 2) + ' s, a ' + nf(o.v, 1) + ' m/s' : nf(o.v, 1) + ' m/s' + (air ? ' · terminal ' + nf(o.f.id === 'para' && st.open ? o.f.vtOpen : o.f.vt, 1) + ' m/s' : ''), true); });
            $('#qd-out', root).innerHTML = h;
        }
        function btn() { S('go').innerHTML = st.run ? '<i class="fa-solid fa-pause"></i> Pausar' : '<i class="fa-solid fa-play"></i> ' + (st.o.some(o => o.done) ? 'Soltar de novo' : st.t > 0 ? 'Continuar' : 'Soltar'); }
        const anim = animator(cv, dt => { step(dt * +S('sp').value); draw(); });
        const hFromV = v => Math.round(Math.pow(10, Math.log10(2) + v / 1000 * (Math.log10(1000) - Math.log10(2))));
        S('h').value = 0; S('h').min = 0; S('h').max = 1000;
        S('h').value = Math.round((Math.log10(20) - Math.log10(2)) / (3 - Math.log10(2)) * 1000);
        S('h').addEventListener('input', () => { st.H = hFromV(+S('h').value); st.run = false; reset(); btn(); draw(); });
        ['a', 'b'].forEach(k => S(k).addEventListener('change', () => { st.run = false; reset(); btn(); draw(); }));
        root.querySelectorAll('input[name="qd-w"]').forEach(el => el.addEventListener('change', () => { st.w = WORLDS.findIndex(w => w[0] === radio(root, 'qd-w')); st.run = false; reset(); btn(); draw(); }));
        S('go').addEventListener('click', () => { if (st.o.some(o => o.done)) reset(); st.run = !st.run; btn(); });
        S('open').addEventListener('click', () => { st.open = true; });
        if (window.ResizeObserver) new ResizeObserver(() => draw()).observe(cv);
        reset(); anim.start();
        return () => { draw(); anim.kick(); };
    }

    /* =====================================================================
       4. ENERGIA NA PISTA (skatista; energia cinética, potencial e térmica)
       Movimento ao longo da pista pelo comprimento de arco s: s'' = −g sen θ − μ g cos θ · sinal(s').
       ===================================================================== */
    const TRACKS_E = {
        U: { n: 'meia-pista (U)', f: x => 7 * Math.pow(2 * x - 1, 2) },
        morros: { n: 'dois morros', f: x => 1 + 1.25 * (1 - Math.cos(4 * Math.PI * x)) + 8 * Math.pow(Math.max(0, Math.abs(2 * x - 1) - 0.86), 2) / 0.0196 },
        montanha: { n: 'montanha-russa', f: x => 7.5 * Math.pow(1 - x, 2) + 1.3 * Math.pow(Math.sin(5 * Math.PI * x), 2) * (1 - x) + 9 * Math.pow(Math.max(0, x - 0.93), 2) / 0.0049 + 6 * Math.pow(Math.max(0, 0.03 - x), 2) / 0.0009 }
    };
    function initEnergia(root) {
        root.innerHTML =
            '<div class="lab-grid">' +
              '<div class="lab-stage tall"><canvas id="en-cv" aria-label="Skatista na pista e barras de energia"></canvas></div>' +
              '<div class="lab-side">' +
                '<div class="ctl"><label for="en-t">Pista</label><select id="en-t">' + Object.keys(TRACKS_E).map(k => '<option value="' + k + '">' + TRACKS_E[k].n + '</option>').join('') + '</select></div>' +
                '<div class="ctl"><label for="en-mu">Atrito <b id="en-muv"></b></label><input id="en-mu" type="range" min="0" max="0.15" step="0.005" value="0"></div>' +
                '<div class="ctl"><label for="en-m">Massa do skatista <b id="en-mv"></b></label><input id="en-m" type="range" min="20" max="100" step="5" value="60"></div>' +
                '<div class="ctl"><label>Lugar</label>' + seg('en-g', [['9.8', 'Terra'], ['1.62', 'Lua'], ['24.8', 'Júpiter']], '9.8') + '</div>' +
                '<div class="ctl seg" style="flex-wrap:wrap;gap:6px 12px;font-size:.84rem"><label><input type="checkbox" id="en-num"> mostrar números</label><label><input type="checkbox" id="en-ref" checked> altura de partida</label></div>' +
                '<div style="display:flex;gap:6px;flex-wrap:wrap"><button class="btn small primary" id="en-play" type="button"><i class="fa-solid fa-pause"></i> Pausar</button><button class="btn small" id="en-reset" type="button"><i class="fa-solid fa-rotate-left"></i> Recomeçar</button>' +
                  '<select id="en-sp" class="plain-in" aria-label="Velocidade da animação" style="width:auto"><option value="1">tempo real</option><option value="0.3">câmera lenta</option></select></div>' +
                '<p class="muted-p" style="font-size:.82rem;margin:4px 0 0">Arraste o skatista para soltá-lo de outro ponto.</p>' +
                '<div class="readout" id="en-out"></div>' +
              '</div>' +
            '</div>' +
            '<div class="lab-under">' +
              '<div class="lab-note"><strong>Leitura.</strong> As barras mostram a energia cinética (verde, movimento), a potencial gravitacional (azul, altura), a térmica (laranja, calor gerado pelo atrito) e a total (cinza). A linha tracejada marca a altura de partida: sem atrito, o skatista nunca passa dela, porque não tem energia para isso.</div>' +
              '<div class="lab-note"><strong>Experimente.</strong> Sem atrito, ele sobe sempre até a mesma altura, para sempre. Ligue o atrito: a barra térmica cresce, as subidas ficam mais baixas, mas a barra total não muda. Mude a massa: o movimento é igual, só as energias mudam. Na Lua, tudo fica em câmera lenta, mas as alturas são as mesmas.</div>' +
            '</div>';
        const S = k => $('#en-' + k, root), cv = S('cv');
        const XL = 14, N = 700;
        const st = { tr: 'U', mu: 0, m: 60, g: 9.8, s: 0, v: 0, E0: 0, playing: true, drag: false, tab: null, trail: [] };
        function build() {
            const f = TRACKS_E[st.tr].f, P = [];
            let s = 0;
            for (let i = 0; i <= N; i++) { const x = i / N, X = x * XL, Y = f(x); if (i) s += Math.hypot(X - P[i - 1].X, Y - P[i - 1].Y); P.push({ X, Y, s }); }
            st.tab = P; st.L = s; st.ymax = Math.max(...P.map(p => p.Y));
        }
        function at(s) {
            const P = st.tab; s = clamp(s, 0, st.L);
            let lo = 0, hi = P.length - 1; while (hi - lo > 1) { const mid = (lo + hi) >> 1; if (P[mid].s <= s) lo = mid; else hi = mid; }
            const a = P[lo], b = P[hi], u = (s - a.s) / Math.max(1e-9, b.s - a.s), ds = Math.max(1e-9, b.s - a.s);
            return { X: lerp(a.X, b.X, u), Y: lerp(a.Y, b.Y, u), sin: (b.Y - a.Y) / ds, cos: (b.X - a.X) / ds };
        }
        function place(s) { st.s = s; st.v = 0; st.E0 = st.m * st.g * at(s).Y; st.Eth = 0; st.trail = []; }
        function step(dt) {
            if (!st.playing || st.drag) return;
            const n = Math.max(1, Math.ceil(dt / 0.002)), h = dt / n;
            for (let k = 0; k < n; k++) {
                const p = at(st.s), gt = -st.g * p.sin, fr = st.mu * st.g * Math.abs(p.cos);
                if (Math.abs(st.v) < 0.02 && Math.abs(gt) <= fr) { st.v = 0; continue; }
                const dir = Math.abs(st.v) < 0.02 ? Math.sign(gt) : Math.sign(st.v);
                const a = gt - fr * dir, vNew = st.v + a * h;
                st.v = (Math.abs(st.v) >= 0.02 && Math.sign(vNew) !== Math.sign(st.v) && Math.abs(gt) <= fr) ? 0 : vNew;
                st.s += st.v * h; st.Eth += fr * st.m * Math.abs(st.v) * h;
                if (st.s <= 0 || st.s >= st.L) { st.s = clamp(st.s, 0, st.L); st.v = 0; }
                /* correção de energia: elimina a deriva numérica sem mudar o sentido do movimento */
                const Ek = st.E0 - st.Eth - st.m * st.g * at(st.s).Y;
                if (Math.abs(st.v) > 0.05) st.v = Math.sign(st.v) * Math.sqrt(Math.max(0, 2 * Ek / st.m));
            }
            const p = at(st.s); st.trail.push([p.X, p.Y]); if (st.trail.length > 90) st.trail.shift();
        }
        let geo = null;
        function draw() {
            const gg = canvas2d(cv, '#04060d'); if (!gg) return;
            const { c, W, H } = gg, wide = W >= 640, num = S('num').checked;
            const A = wide ? { x: 0, y: 0, w: W * 0.72, h: H } : { x: 0, y: 0, w: W, h: H * 0.66 }, B = wide ? { x: W * 0.72, y: 0, w: W * 0.28, h: H } : { x: 0, y: H * 0.66, w: W, h: H * 0.34 };
            const ymax = st.ymax + 1, k = Math.min((A.w - 40) / XL, (A.h - 50) / ymax), ox = A.x + (A.w - XL * k) / 2, oy = A.y + A.h - 22;
            const PX = X => ox + X * k, PY = Y => oy - Y * k;
            geo = { PX, PY, k, ox, oy };
            const sky = c.createLinearGradient(0, 0, 0, A.h); sky.addColorStop(0, '#0b1730'); sky.addColorStop(1, '#172554'); c.fillStyle = sky; c.fillRect(A.x, A.y, A.w, A.h);
            for (let y = 0; y <= ymax; y += 1) { c.strokeStyle = 'rgba(148,163,184,.08)'; c.beginPath(); c.moveTo(A.x, PY(y)); c.lineTo(A.x + A.w, PY(y)); c.stroke(); if (y % 2 === 0) label(c, y + ' m', A.x + 6, PY(y) - 6, '#64748b', F(500, 9)); }
            /* pista com suportes */
            c.strokeStyle = 'rgba(100,116,139,.5)'; c.lineWidth = 2;
            for (let i = 0; i <= N; i += 35) { const p = st.tab[i]; c.beginPath(); c.moveTo(PX(p.X), PY(p.Y)); c.lineTo(PX(p.X), oy); c.stroke(); }
            c.fillStyle = '#14532d'; c.fillRect(A.x, oy, A.w, A.y + A.h - oy);
            c.strokeStyle = '#cbd5e1'; c.lineWidth = 5; c.lineJoin = 'round'; c.beginPath(); st.tab.forEach((p, i) => i ? c.lineTo(PX(p.X), PY(p.Y)) : c.moveTo(PX(p.X), PY(p.Y))); c.stroke();
            c.strokeStyle = st.mu > 0 ? 'rgba(251,146,60,.6)' : 'rgba(148,163,184,.4)'; c.lineWidth = 1.5; c.stroke();
            if (S('ref').checked) { const y0 = st.E0 / (st.m * st.g); c.strokeStyle = 'rgba(253,224,71,.55)'; c.setLineDash([6, 5]); c.beginPath(); c.moveTo(A.x, PY(y0)); c.lineTo(A.x + A.w, PY(y0)); c.stroke(); c.setLineDash([]); label(c, 'altura de partida', A.x + A.w - 8, PY(y0) - 8, '#fde047', F(600, 10), 'right'); }
            c.strokeStyle = 'rgba(52,211,153,.35)'; c.lineWidth = 2; c.beginPath(); st.trail.forEach((p, i) => i ? c.lineTo(PX(p[0]), PY(p[1])) : c.moveTo(PX(p[0]), PY(p[1]))); c.stroke();
            /* skatista */
            const p = at(st.s), ang = Math.atan2(-p.sin, p.cos), sx = PX(p.X), sy = PY(p.Y);
            c.save(); c.translate(sx, sy); c.rotate(ang);
            c.fillStyle = '#1e293b'; c.fillRect(-14, -5, 28, 4); c.fillStyle = '#facc15'; [-9, 9].forEach(wx => { c.beginPath(); c.arc(wx, -1, 2.6, 0, TAU); c.fill(); });
            c.strokeStyle = '#f472b6'; c.lineWidth = 3; c.lineCap = 'round';
            c.beginPath(); c.moveTo(-6, -6); c.lineTo(-2, -18); c.lineTo(6, -6); c.moveTo(-2, -18); c.lineTo(0, -30); c.moveTo(0, -26); c.lineTo(-9, -21); c.moveTo(0, -26); c.lineTo(9, -24); c.stroke();
            c.fillStyle = '#fde68a'; c.beginPath(); c.arc(1, -35, 5, 0, TAU); c.fill();
            c.restore();
            if (Math.abs(st.v) > 0.1) { const L = st.v * 6; arrowPx(c, sx, sy - 48, sx + p.cos * L, sy - 48 - p.sin * L, '#34d399', 2.5); }
            /* barras de energia */
            const Ec = 0.5 * st.m * st.v * st.v, Ep = st.m * st.g * p.Y, Et = Math.max(0, st.Eth || 0), Etot = st.E0;
            c.fillStyle = '#070b16'; c.fillRect(B.x, B.y, B.w, B.h);
            const bars = [['cinética', Ec, '#34d399'], ['potencial', Ep, '#60a5fa'], ['térmica', Et, '#fb923c'], ['total', Etot, '#94a3b8']];
            const bx0 = B.x + 16, bw = (B.w - 32) / 4, base = B.y + B.h - 30, top = B.y + 34, Emax = Math.max(1, st.m * st.g * st.ymax);
            label(c, 'Energia' + (num ? ' (J)' : ''), B.x + 12, B.y + 14, '#e2e8f0', F(700, 12));
            bars.forEach(([n, v, col], i) => {
                const h = (base - top) * clamp(v / Emax, 0, 1.05), x = bx0 + i * bw;
                c.fillStyle = col; c.fillRect(x + 4, base - h, bw - 8, h);
                label(c, n, x + bw / 2, base + 12, col, F(600, 10), 'center');
                if (num) label(c, nf(v, 0), x + bw / 2, base - h - 9, '#e2e8f0', F(600, 9, true), 'center');
            });
            readout(Ec, Ep, Et);
        }
        function readout(Ec, Ep, Et) {
            const num = S('num').checked;
            S('muv').textContent = st.mu ? nf(st.mu, 3) : 'nenhum'; S('mv').textContent = nf(st.m) + ' kg';
            const p = at(st.s);
            $('#en-out', root).innerHTML =
                cell('Altura', nf(p.Y, 2) + ' m') + cell('Velocidade', nf(Math.abs(st.v), 1) + ' m/s (' + nf(Math.abs(st.v) * 3.6, 0) + ' km/h)') +
                cell('Velocidade máxima possível (√2gh)', nf(Math.sqrt(2 * st.g * (st.E0 / (st.m * st.g))), 1) + ' m/s', true) +
                cell('Energia virada calor', num ? nf(Et, 0) + ' J' : nf(st.E0 ? Et / st.E0 * 100 : 0, 0) + '% da inicial', true);
        }
        const anim = animator(cv, dt => { step(dt * +S('sp').value); draw(); });
        function resetAll() { build(); place(st.tr === 'montanha' ? st.L * 0.03 : st.tr === 'morros' ? st.L * 0.06 : st.L * 0.04); }
        S('t').addEventListener('change', () => { st.tr = S('t').value; resetAll(); draw(); });
        S('mu').addEventListener('input', () => { st.mu = +S('mu').value; draw(); });
        S('m').addEventListener('input', () => { const ratio = +S('m').value / st.m; st.m = +S('m').value; st.E0 *= ratio; st.Eth *= ratio; draw(); });
        root.querySelectorAll('input[name="en-g"]').forEach(el => el.addEventListener('change', () => { const ng = +radio(root, 'en-g'); st.E0 *= ng / st.g; st.Eth *= ng / st.g; st.g = ng; draw(); }));
        ['num', 'ref'].forEach(k => S(k).addEventListener('change', draw));
        S('play').addEventListener('click', () => { st.playing = !st.playing; S('play').innerHTML = st.playing ? '<i class="fa-solid fa-pause"></i> Pausar' : '<i class="fa-solid fa-play"></i> Continuar'; });
        S('reset').addEventListener('click', () => { resetAll(); draw(); });
        const pos = e => { const r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
        cv.addEventListener('pointerdown', e => {
            if (!geo) return; const [x, y] = pos(e), p = at(st.s);
            if (Math.hypot(geo.PX(p.X) - x, geo.PY(p.Y) - 20 - y) < 40) { st.drag = true; cv.setPointerCapture(e.pointerId); cv.style.touchAction = 'none'; e.preventDefault(); }
        });
        cv.addEventListener('pointermove', e => {
            if (!st.drag) return; const [x] = pos(e), X = clamp((x - geo.ox) / geo.k, 0, XL);
            let best = 0, bd = 1e9; st.tab.forEach(p => { const d = Math.abs(p.X - X); if (d < bd) { bd = d; best = p.s; } });
            place(best); draw();
        });
        cv.addEventListener('pointerup', () => { st.drag = false; cv.style.touchAction = 'auto'; });
        if (window.ResizeObserver) new ResizeObserver(() => draw()).observe(cv);
        resetAll(); anim.start();
        return () => { draw(); anim.kick(); };
    }

    /* =====================================================================
       5. COLISÕES E QUANTIDADE DE MOVIMENTO (trilho de ar, 1D)
       ===================================================================== */
    function initColisoes(root) {
        root.innerHTML =
            '<div class="lab-grid">' +
              '<div class="lab-stage tall"><canvas id="co-cv" aria-label="Dois carrinhos colidindo e barras de quantidade de movimento e energia"></canvas></div>' +
              '<div class="lab-side">' +
                '<div style="display:flex;gap:6px;flex-wrap:wrap"><button class="btn small" data-p="el" type="button">Elástica</button><button class="btn small" data-p="gr" type="button">Grudam</button><button class="btn small" data-p="pesado" type="button">Pesado × leve</button><button class="btn small" data-p="exp" type="button">Explosão</button></div>' +
                '<div class="ctl"><label for="co-m1">Massa do carrinho A <b id="co-m1v"></b></label><input id="co-m1" type="range" min="0.5" max="6" step="0.5" value="2"></div>' +
                '<div class="ctl"><label for="co-v1">Velocidade inicial de A <b id="co-v1v"></b></label><input id="co-v1" type="range" min="-3" max="3" step="0.1" value="2"></div>' +
                '<div class="ctl"><label for="co-m2">Massa do carrinho B <b id="co-m2v"></b></label><input id="co-m2" type="range" min="0.5" max="6" step="0.5" value="2"></div>' +
                '<div class="ctl"><label for="co-v2">Velocidade inicial de B <b id="co-v2v"></b></label><input id="co-v2" type="range" min="-3" max="3" step="0.1" value="0"></div>' +
                '<div class="ctl"><label for="co-e">Elasticidade <b id="co-ev"></b></label><input id="co-e" type="range" min="0" max="1" step="0.05" value="1"></div>' +
                '<div style="display:flex;gap:6px;flex-wrap:wrap"><button class="btn small primary" id="co-go" type="button"><i class="fa-solid fa-play"></i> Soltar</button><select id="co-sp" class="plain-in" aria-label="Velocidade da animação" style="width:auto"><option value="1">tempo real</option><option value="0.3">câmera lenta</option></select></div>' +
                '<div class="readout" id="co-out"></div>' +
              '</div>' +
            '</div>' +
            '<div class="lab-under">' +
              '<div class="lab-note"><strong>Leitura.</strong> Dois carrinhos num trilho sem atrito. As setas mostram a velocidade. As barras mostram a quantidade de movimento (p = m v, positiva para a direita) e a energia cinética de cada um e do conjunto, antes e depois. Elasticidade 1: colisão elástica; 0: os carrinhos grudam.</div>' +
              '<div class="lab-note"><strong>Experimente.</strong> Em todas as colisões, a barra da quantidade de movimento total não muda. A energia cinética total só se conserva com elasticidade 1. Massas iguais, colisão elástica, B parado: A para e B sai com a velocidade de A, como no bilhar. Na explosão, os dois partem do repouso: a quantidade de movimento total continua zero.</div>' +
            '</div>';
        const S = k => $('#co-' + k, root), cv = S('cv');
        const st = { m1: 2, m2: 2, v1: 2, v2: 0, e: 1, run: false, done: false, x1: 0, x2: 0, u1: 0, u2: 0, hit: false, t: 0, flash: 0, exp: false, before: null };
        const W1 = m => 0.5 + m * 0.08; /* largura do carrinho (m), cresce com a massa */
        function reset() {
            st.x1 = st.exp ? -W1(st.m1) / 2 - 0.02 : -2.2; st.x2 = st.exp ? W1(st.m2) / 2 + 0.02 : 0.6;
            st.u1 = st.exp ? 0 : st.v1; st.u2 = st.exp ? 0 : st.v2; st.hit = false; st.done = false; st.t = 0;
            st.before = { p: st.m1 * st.u1 + st.m2 * st.u2, E: 0.5 * st.m1 * st.u1 * st.u1 + 0.5 * st.m2 * st.u2 * st.u2 };
        }
        function collide() {
            const { m1, m2, e } = st, u1 = st.u1, u2 = st.u2, P = m1 * u1 + m2 * u2;
            st.u1 = (P + m2 * e * (u2 - u1)) / (m1 + m2); st.u2 = (P + m1 * e * (u1 - u2)) / (m1 + m2); st.hit = true; st.flash = 0.3;
        }
        function explode() {
            const Es = 4, M = st.m1 + st.m2; /* energia da mola: 4 J */
            st.u1 = -Math.sqrt(2 * Es * st.m2 / (st.m1 * M)); st.u2 = Math.sqrt(2 * Es * st.m1 / (st.m2 * M)); st.hit = true; st.flash = 0.3;
        }
        function step(dt) {
            st.flash = Math.max(0, st.flash - dt);
            if (!st.run) return;
            st.t += dt;
            if (st.exp && !st.hit && st.t > 0.6) explode();
            st.x1 += st.u1 * dt; st.x2 += st.u2 * dt;
            const gap = (st.x2 - W1(st.m2) / 2) - (st.x1 + W1(st.m1) / 2);
            if (!st.exp && gap <= 0 && st.u1 > st.u2) { collide(); if (st.e === 0) st.x2 = st.x1 + (W1(st.m1) + W1(st.m2)) / 2; }
            if (Math.abs(st.x1) > 4.5 && Math.abs(st.x2) > 4.5 || st.t > 12) { st.run = false; st.done = true; btn(); }
            if (st.e === 0 && st.hit && !st.exp) st.x2 = st.x1 + (W1(st.m1) + W1(st.m2)) / 2;
        }
        function draw() {
            const gg = canvas2d(cv, '#04060d'); if (!gg) return;
            const { c, W, H } = gg, trackH = H * 0.45, ppm = (W - 40) / 9, X = x => W / 2 + x * ppm, ty = trackH - 30;
            c.fillStyle = '#0b1324'; c.fillRect(0, 0, W, trackH);
            c.fillStyle = '#334155'; c.fillRect(10, ty, W - 20, 8); for (let x = 20; x < W - 20; x += 14) { c.fillStyle = '#1e293b'; c.fillRect(x, ty + 2, 3, 3); }
            [[st.x1, st.m1, st.u1, '#f472b6', 'A'], [st.x2, st.m2, st.u2, '#60a5fa', 'B']].forEach(([x, m, u, col, nm]) => {
                const w = W1(m) * ppm, h = 22 + m * 5, x0 = X(x) - w / 2;
                c.fillStyle = col; c.beginPath(); c.roundRect(x0, ty - h, w, h, 5); c.fill();
                c.fillStyle = 'rgba(15,23,42,.35)'; c.fillRect(x0 + 4, ty - h + 4, w - 8, 6);
                ink(c, nm + ' · ' + nf(m, 1) + ' kg', X(x), ty - h / 2, '#0f172a', F(800, 11));
                if (Math.abs(u) > 0.02) arrowPx(c, X(x), ty - h - 16, X(x) + u * ppm * 0.6, ty - h - 16, col, 2.5);
                label(c, nf(u, 2) + ' m/s', X(x), ty - h - 30, col, F(700, 10, true), 'center');
            });
            if (st.exp && !st.hit) { c.strokeStyle = '#fde047'; c.lineWidth = 2; c.beginPath(); const xa = X(st.x1 + W1(st.m1) / 2), xb = X(st.x2 - W1(st.m2) / 2); for (let k = 0; k <= 8; k++) { const x = lerp(xa, xb, k / 8); k ? c.lineTo(x, ty - 14 + (k % 2 ? -5 : 5)) : c.moveTo(x, ty - 14); } c.stroke(); }
            if (st.flash > 0) { const xc = (X(st.x1 + W1(st.m1) / 2) + X(st.x2 - W1(st.m2) / 2)) / 2, r = 30 * (1 - st.flash / 0.3) + 6; const gr = c.createRadialGradient(xc, ty - 20, 0, xc, ty - 20, r); gr.addColorStop(0, 'rgba(253,224,71,' + st.flash * 2.5 + ')'); gr.addColorStop(1, 'rgba(253,224,71,0)'); c.fillStyle = gr; c.beginPath(); c.arc(xc, ty - 20, r, 0, TAU); c.fill(); }
            label(c, st.hit ? 'depois da colisão' : 'antes da colisão', 12, 14, '#e2e8f0', F(700, 12));
            /* barras: antes e depois */
            const p1 = st.m1 * st.u1, p2 = st.m2 * st.u2, E1 = 0.5 * st.m1 * st.u1 * st.u1, E2 = 0.5 * st.m2 * st.u2 * st.u2;
            const G = { x: 0, y: trackH, w: W, h: H - trackH }, half = G.w / 2;
            c.fillStyle = '#070b16'; c.fillRect(G.x, G.y, G.w, G.h);
            barGroup(c, { x: G.x + 10, y: G.y + 8, w: half - 20, h: G.h - 16 }, 'Quantidade de movimento (kg·m/s)', [['A', p1, '#f472b6'], ['B', p2, '#60a5fa'], ['total', p1 + p2, '#e2e8f0']], Math.max(4, 1.6 * (st.m1 * Math.abs(st.v1) + st.m2 * Math.abs(st.v2)), st.exp ? 5 : 0), true, st.before.p);
            barGroup(c, { x: G.x + half + 10, y: G.y + 8, w: half - 20, h: G.h - 16 }, 'Energia cinética (J)', [['A', E1, '#f472b6'], ['B', E2, '#60a5fa'], ['total', E1 + E2, '#e2e8f0']], Math.max(6, st.before.E * 1.1, 4.4), false, st.before.E);
            readout(p1 + p2, E1 + E2);
        }
        function barGroup(c, R, title, bars, vmax, signed, ref) {
            label(c, title, R.x + 4, R.y + 6, '#cbd5e1', F(700, 10));
            const base = signed ? R.y + 20 + (R.h - 40) / 2 : R.y + R.h - 18, scale = (signed ? (R.h - 40) / 2 : R.h - 40) / vmax, bw = R.w / bars.length;
            c.strokeStyle = 'rgba(148,163,184,.4)'; c.beginPath(); c.moveTo(R.x, base); c.lineTo(R.x + R.w, base); c.stroke();
            bars.forEach(([n, v, col], i) => {
                const x = R.x + i * bw + bw * 0.2, w = bw * 0.6, h = clamp(v * scale, -(R.h - 40), R.h - 40);
                c.fillStyle = col; c.globalAlpha = n === 'total' ? 0.9 : 0.75; c.fillRect(x, base - Math.max(h, 0), w, Math.abs(h)); c.globalAlpha = 1;
                label(c, n, x + w / 2, R.y + R.h - 6, col, F(700, 10), 'center');
                label(c, nf(v, 2), x + w / 2, base - h + (h >= 0 ? -8 : 8), '#e2e8f0', F(600, 9, true), 'center');
                if (n === 'total') { const yr = base - ref * scale; c.strokeStyle = '#fde047'; c.setLineDash([4, 3]); c.beginPath(); c.moveTo(x - 6, yr); c.lineTo(x + w + 6, yr); c.stroke(); c.setLineDash([]); }
            });
            if (R.w > 300) label(c, 'tracejado: total antes', R.x + R.w, R.y + 6, '#fde047', F(500, 9), 'right'); else label(c, '- - total antes', R.x + R.w, R.y + 20, '#fde047', F(500, 9), 'right');
        }
        function readout(P, E) {
            S('m1v').textContent = nf(st.m1, 1) + ' kg'; S('m2v').textContent = nf(st.m2, 1) + ' kg'; S('v1v').textContent = nf(st.v1, 1) + ' m/s'; S('v2v').textContent = nf(st.v2, 1) + ' m/s';
            S('ev').textContent = st.e === 1 ? '1 (elástica)' : st.e === 0 ? '0 (grudam)' : nf(st.e, 2);
            const lost = st.before.E - E;
            $('#co-out', root).innerHTML =
                cell('Quantidade de movimento total', nf(P, 2) + ' kg·m/s (antes: ' + nf(st.before.p, 2) + ')', true) +
                cell('Energia cinética total', nf(E, 2) + ' J (antes: ' + nf(st.before.E, 2) + ')', true) +
                cell('Energia transformada em calor e deformação', st.exp ? 'a mola liberou 4 J' : nf(Math.max(0, lost), 2) + ' J', true);
        }
        function btn() { S('go').innerHTML = st.run ? '<i class="fa-solid fa-pause"></i> Pausar' : '<i class="fa-solid fa-play"></i> ' + (st.done ? 'De novo' : 'Soltar'); }
        const anim = animator(cv, dt => { step(dt * +S('sp').value); draw(); });
        function fromUI() { st.m1 = +S('m1').value; st.m2 = +S('m2').value; st.v1 = +S('v1').value; st.v2 = +S('v2').value; st.e = +S('e').value; st.run = false; reset(); btn(); draw(); }
        ['m1', 'm2', 'v1', 'v2', 'e'].forEach(k => S(k).addEventListener('input', () => { st.exp = false; fromUI(); }));
        root.querySelectorAll('[data-p]').forEach(b => b.addEventListener('click', () => {
            const P = { el: [2, 2, 2, 0, 1], gr: [2, 2, 2, 0, 0], pesado: [6, 1, 1.5, -1.5, 1], exp: [3, 1, 0, 0, 1] }[b.dataset.p];
            ['m1', 'm2', 'v1', 'v2', 'e'].forEach((k, i) => { S(k).value = P[i]; });
            st.exp = b.dataset.p === 'exp'; fromUI(); st.run = true; btn();
        }));
        S('go').addEventListener('click', () => { if (st.done) reset(); st.run = !st.run; btn(); });
        if (window.ResizeObserver) new ResizeObserver(() => draw()).observe(cv);
        reset(); anim.start();
        return () => { draw(); anim.kick(); };
    }

    /* =====================================================================
       6. LANÇAMENTOS E ALVOS
       Sem ar: parábola. Com ar: força de arrasto ∝ v², integrada com passos pequenos.
       ===================================================================== */
    const PROJ = [['bola de canhão', 0.0007], ['bola de futebol', 0.013], ['bola de pingue-pongue', 0.14]]; /* k = ρ C A / (2 m), em 1/m */
    function initLancamento(root) {
        root.innerHTML =
            '<div class="lab-grid">' +
              '<div class="lab-stage tall"><canvas id="la-cv" aria-label="Canhão, trajetórias e alvo"></canvas></div>' +
              '<div class="lab-side">' +
                '<div class="ctl"><label for="la-a">Ângulo <b id="la-av"></b></label><input id="la-a" type="range" min="0" max="90" step="1" value="45"></div>' +
                '<div class="ctl"><label for="la-v">Velocidade de lançamento <b id="la-vv"></b></label><input id="la-v" type="range" min="5" max="40" step="0.5" value="20"></div>' +
                '<div class="ctl"><label for="la-p">Projétil</label><select id="la-p">' + PROJ.map((p, i) => '<option value="' + i + '">' + p[0] + '</option>').join('') + '</select></div>' +
                '<div class="ctl seg" style="flex-wrap:wrap;gap:6px 12px;font-size:.84rem"><label><input type="checkbox" id="la-air"> resistência do ar</label><label><input type="checkbox" id="la-comp" checked> componentes da velocidade</label><label><input type="checkbox" id="la-tgt" checked> alvo</label></div>' +
                '<div class="ctl"><label>Lugar</label>' + seg('la-g', [['9.8', 'Terra'], ['1.62', 'Lua'], ['3.71', 'Marte']], '9.8') + '</div>' +
                '<div style="display:flex;gap:6px;flex-wrap:wrap"><button class="btn small primary" id="la-fire" type="button"><i class="fa-solid fa-bomb"></i> Disparar</button><button class="btn small" id="la-new" type="button"><i class="fa-solid fa-shuffle"></i> Novo alvo</button><button class="btn small" id="la-clear" type="button"><i class="fa-solid fa-eraser"></i> Limpar</button></div>' +
                '<div class="readout" id="la-out"></div>' +
              '</div>' +
            '</div>' +
            '<div class="lab-under">' +
              '<div class="lab-note"><strong>Leitura.</strong> As setas no projétil são as componentes da velocidade: a horizontal (verde) não muda sem ar; a vertical (azul) diminui na subida, some no topo e cresce na descida. As últimas trajetórias ficam desenhadas para comparar. A escala se ajusta ao tamanho do lançamento.</div>' +
              '<div class="lab-note"><strong>Experimente.</strong> Acerte o alvo com o menor número de tiros. Lance a 30° e a 60° com a mesma velocidade: sem ar, caem no mesmo lugar. Ligue o ar com a bola de pingue-pongue: a trajetória deixa de ser simétrica e o melhor ângulo fica bem menor que 45°.</div>' +
            '</div>';
        const S = k => $('#la-' + k, root), cv = S('cv');
        const st = { a: 45, v: 20, p: 0, air: false, g: 9.8, shots: [], ball: null, target: 30, tries: 0, hits: 0, msg: '', confetti: [] };
        function simulate() {
            const th = st.a * D2R, k = st.air ? PROJ[st.p][1] : 0, pts = [];
            let x = 0, y = 1.2, vx = st.v * Math.cos(th), vy = st.v * Math.sin(th), t = 0, ymax = y;
            const h = 0.002;
            pts.push([0, x, y, vx, vy]);
            while (t < 60) {
                const sp = Math.hypot(vx, vy); vx += -k * sp * vx * h; vy += (-st.g - k * sp * vy) * h; x += vx * h; y += vy * h; t += h; ymax = Math.max(ymax, y);
                if (Math.round(t / h) % 10 === 0) pts.push([t, x, y, vx, vy]);
                if (y <= 0) { const last = pts[pts.length - 1]; const u = last[2] / (last[2] - y); pts.push([t, lerp(last[1], x, u), 0, vx, vy]); break; }
            }
            return { pts, range: pts[pts.length - 1][1], T: t, ymax };
        }
        function fire() {
            const sh = simulate(); sh.u = 0; sh.air = st.air; sh.col = ['#f472b6', '#7dd3fc', '#fde047', '#86efac', '#c4b5fd'][st.shots.length % 5];
            st.ball = sh; st.tries++; st.msg = '';
        }
        function step(dt) {
            st.confetti.forEach(p => { p.vy += 300 * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.t -= dt; }); st.confetti = st.confetti.filter(p => p.t > 0);
            if (!st.ball) return;
            const b = st.ball;
            b.u += dt * Math.max(1, b.T / 3); /* voos longos são acelerados para durar ~3 s */
            if (b.u >= b.T) {
                b.u = b.T; st.shots.push(b); if (st.shots.length > 5) st.shots.shift(); st.ball = null;
                if (S('tgt').checked) {
                    const d = Math.abs(b.range - st.target);
                    if (d < 1.2) { st.hits++; st.msg = 'Acertou em ' + st.tries + (st.tries === 1 ? ' tiro!' : ' tiros!'); burst(); }
                    else st.msg = b.range < st.target ? 'Caiu ' + nf(st.target - b.range, 1) + ' m antes' : 'Passou ' + nf(b.range - st.target, 1) + ' m';
                }
            }
        }
        let geo = null;
        function burst() { if (!geo) return; const x = geo.X(st.target), y = geo.Y(0); for (let i = 0; i < 60; i++) { const a = -Math.PI * Math.random(), s = 120 + Math.random() * 200; st.confetti.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, t: 1.2, col: ['#f472b6', '#fde047', '#34d399', '#60a5fa'][i % 4] }); } }
        function pointAt(b, t) { const P = b.pts; let i = 1; while (i < P.length - 1 && P[i][0] < t) i++; const a = P[i - 1], c2 = P[i], u = clamp((t - a[0]) / Math.max(1e-9, c2[0] - a[0]), 0, 1); return a.map((v, k) => lerp(v, c2[k], u)); }
        function draw() {
            const gg = canvas2d(cv, '#04060d'); if (!gg) return;
            const { c, W, H } = gg;
            const all = st.shots.concat(st.ball ? [st.ball] : []), xmax = Math.max(20, st.target * 1.25, ...all.map(b => b.range * 1.1)), ymaxS = Math.max(8, ...all.map(b => b.ymax * 1.15));
            const k = Math.min((W - 70) / xmax, (H - 70) / ymaxS), ox = 46, oy = H - 34, X = x => ox + x * k, Y = y => oy - y * k;
            geo = { X, Y };
            const sky = c.createLinearGradient(0, 0, 0, H); sky.addColorStop(0, '#0b1730'); sky.addColorStop(1, '#1e293b'); c.fillStyle = sky; c.fillRect(0, 0, W, H);
            c.fillStyle = st.g < 2 ? '#6b7280' : st.g < 5 ? '#9a3412' : '#166534'; c.fillRect(0, oy, W, H - oy);
            const stp = xmax > 200 ? 50 : xmax > 80 ? 20 : xmax > 30 ? 10 : 5;
            for (let x = 0; x <= xmax; x += stp) { c.fillStyle = 'rgba(226,232,240,.5)'; c.fillRect(X(x), oy, 1, 6); label(c, nf(x) + ' m', X(x), oy + 14, '#cbd5e1', F(500, 9), 'center'); }
            if (S('tgt').checked) { const tx = X(st.target); [16, 10, 4].forEach((r, i) => { c.fillStyle = i % 2 ? '#fff' : '#dc2626'; c.beginPath(); c.ellipse(tx, oy, r + 4, 4 + r * 0.25, 0, 0, TAU); c.fill(); }); c.fillStyle = '#e2e8f0'; c.fillRect(tx - 1, oy - 30, 2, 30); c.fillStyle = '#f472b6'; c.beginPath(); c.moveTo(tx + 1, oy - 30); c.lineTo(tx + 16, oy - 25); c.lineTo(tx + 1, oy - 20); c.fill(); }
            st.shots.forEach((b, i) => { c.globalAlpha = 0.35 + 0.13 * i; c.strokeStyle = b.col; c.lineWidth = 2; c.setLineDash(b.air ? [6, 4] : []); c.beginPath(); b.pts.forEach((p, j) => j ? c.lineTo(X(p[1]), Y(p[2])) : c.moveTo(X(p[1]), Y(p[2]))); c.stroke(); c.setLineDash([]); c.globalAlpha = 1; label(c, nf(b.range, 1) + ' m', X(b.range), oy - 12 - 12 * (i % 2), b.col, F(700, 9), 'center'); });
            /* canhão */
            const th = st.a * D2R, cx = X(0), cy = Y(1.2);
            c.save(); c.translate(cx, cy); c.rotate(-th); c.fillStyle = '#475569'; c.fillRect(0, -6, 36, 12); c.fillStyle = '#334155'; c.fillRect(30, -7, 8, 14); c.restore();
            c.fillStyle = '#1f2937'; c.beginPath(); c.arc(cx, cy + 4, 12, 0, TAU); c.fill(); c.fillStyle = '#64748b'; c.beginPath(); c.arc(cx, cy + 4, 4, 0, TAU); c.fill();
            label(c, nf(st.a) + '°', cx + 44, cy - 16, '#cbd5e1', F(700, 11));
            if (st.ball) {
                const b = st.ball, p = pointAt(b, b.u);
                c.strokeStyle = b.col; c.lineWidth = 2.5; c.beginPath(); b.pts.filter(q => q[0] <= b.u).forEach((q, j) => j ? c.lineTo(X(q[1]), Y(q[2])) : c.moveTo(X(q[1]), Y(q[2]))); c.lineTo(X(p[1]), Y(p[2])); c.stroke();
                const bx = X(p[1]), by = Y(p[2]);
                c.fillStyle = '#e5e7eb'; c.beginPath(); c.arc(bx, by, 6, 0, TAU); c.fill();
                if (S('comp').checked) { const sc = 2.2; arrowPx(c, bx, by, bx + p[3] * sc, by, '#34d399', 2.5); if (Math.abs(p[4]) > 0.3) arrowPx(c, bx, by, bx, by - p[4] * sc, '#60a5fa', 2.5); }
            }
            st.confetti.forEach(p => { c.fillStyle = p.col; c.fillRect(p.x, p.y, 4, 4); });
            if (st.msg) label(c, st.msg, W / 2, 20, st.msg.startsWith('Acertou') ? '#34d399' : '#fde68a', F(800, 14), 'center');
            readout();
        }
        function readout() {
            S('av').textContent = nf(st.a) + '°'; S('vv').textContent = nf(st.v, 1) + ' m/s';
            const sim = simulate(), th = st.a * D2R, ideal = st.v * st.v * Math.sin(2 * th) / st.g;
            $('#la-out', root).innerHTML =
                cell('Alcance', nf(sim.range, 1) + ' m') + cell('Altura máxima', nf(sim.ymax, 1) + ' m') +
                cell('Tempo de voo', nf(sim.T, 2) + ' s') + cell('Fórmula sem ar, saindo do chão', nf(ideal, 1) + ' m') +
                cell('Componentes iniciais', 'horizontal ' + nf(st.v * Math.cos(th), 1) + ' m/s · vertical ' + nf(st.v * Math.sin(th), 1) + ' m/s', true) +
                (S('tgt').checked ? cell('Alvo', 'a ' + nf(st.target, 1) + ' m · tiros: ' + st.tries + ' · acertos: ' + st.hits, true) : '');
        }
        function newTarget() { const xm = st.v * st.v / st.g; st.target = Math.round((0.35 + Math.random() * 0.55) * Math.max(15, Math.min(xm * 1.6, 120)) * 2) / 2; st.tries = 0; st.msg = ''; }
        const anim = animator(cv, dt => { step(dt); draw(); });
        S('a').addEventListener('input', () => { st.a = +S('a').value; draw(); });
        S('v').addEventListener('input', () => { st.v = +S('v').value; draw(); });
        S('p').addEventListener('change', () => { st.p = +S('p').value; draw(); });
        S('air').addEventListener('change', () => { st.air = S('air').checked; draw(); });
        ['comp', 'tgt'].forEach(k => S(k).addEventListener('change', draw));
        root.querySelectorAll('input[name="la-g"]').forEach(el => el.addEventListener('change', () => { st.g = +radio(root, 'la-g'); st.shots = []; newTarget(); draw(); }));
        S('fire').addEventListener('click', () => { if (!st.ball) fire(); });
        S('new').addEventListener('click', () => { newTarget(); draw(); });
        S('clear').addEventListener('click', () => { st.shots = []; st.msg = ''; draw(); });
        if (window.ResizeObserver) new ResizeObserver(() => draw()).observe(cv);
        newTarget(); anim.start();
        return () => { draw(); anim.kick(); };
    }

    /* =====================================================================
       7. GANGORRA E TORQUE (arraste pesos; prever antes de soltar)
       ===================================================================== */
    function initGangorra(root) {
        root.innerHTML =
            '<div class="lab-grid">' +
              '<div class="lab-stage tall"><canvas id="gg-cv" aria-label="Gangorra com pesos para arrastar"></canvas></div>' +
              '<div class="lab-side">' +
                '<div style="display:flex;gap:6px;flex-wrap:wrap"><button class="btn small primary" id="gg-hold" type="button"><i class="fa-solid fa-hand"></i> Soltar a gangorra</button><button class="btn small" id="gg-clear" type="button"><i class="fa-solid fa-eraser"></i> Tirar os pesos</button></div>' +
                '<button class="btn small" id="gg-chal" type="button"><i class="fa-solid fa-puzzle-piece"></i> Desafio</button>' +
                '<div class="ctl seg" style="flex-wrap:wrap;gap:6px 12px;font-size:.84rem"><label><input type="checkbox" id="gg-num"> mostrar torques</label><label><input type="checkbox" id="gg-ruler" checked> régua</label></div>' +
                '<p class="muted-p" style="font-size:.82rem;margin:4px 0 0">Arraste os pesos da prateleira para a gangorra. Para tirar um peso, arraste-o para fora. Com a gangorra presa, preveja para que lado ela vai cair antes de soltar.</p>' +
                '<div class="readout" id="gg-out"></div>' +
              '</div>' +
            '</div>' +
            '<div class="lab-under">' +
              '<div class="lab-note"><strong>Leitura.</strong> A gangorra tem 8 m, apoio no meio e marcas a cada meio metro. Cada peso faz a gangorra girar para o seu lado; o efeito (torque) é a massa vezes a distância até o apoio. A gangorra fica equilibrada quando os torques dos dois lados são iguais.</div>' +
              '<div class="lab-note"><strong>Experimente.</strong> Um peso de 20 kg a 1 m equilibra um de 10 kg a quanto do apoio? Descubra sem os números, depois ligue "mostrar torques" para conferir. No desafio, um lado já tem pesos e você ganha um peso para equilibrar: ache o lugar certo antes de soltar.</div>' +
            '</div>';
        const S = k => $('#gg-' + k, root), cv = S('cv');
        const MASSES = [5, 10, 20, 40], HALF = 4;
        const st = { w: [], th: 0, om: 0, held: true, drag: null, chal: null, msg: '' };
        function torque() { let l = 0, r = 0; st.w.forEach(w => { if (w.x < 0) l += w.m * -w.x; else r += w.m * w.x; }); return { l, r, net: r - l }; }
        function step(dt) {
            if (st.held) { st.th *= Math.exp(-dt * 8); st.om = 0; return; }
            const T = torque(), I = 60 + st.w.reduce((s, w) => s + w.m * w.x * w.x, 0), max = geo ? geo.max : 0.2;
            const n = 6, h = dt / n;
            for (let k = 0; k < n; k++) {
                const alpha = (-T.net * 9.8 * Math.cos(st.th)) / I * 1.0 - 2.2 * st.om; /* sinal: torque à direita faz o lado direito descer (th < 0) */
                st.om += alpha * h; st.th += st.om * h;
                if (st.th > max) { st.th = max; st.om = Math.min(0, -st.om * 0.25); }
                if (st.th < -max) { st.th = -max; st.om = Math.max(0, -st.om * 0.25); }
            }
        }
        let geo = null;
        function draw() {
            const gg = canvas2d(cv, '#04060d'); if (!gg) return;
            const { c, W, H } = gg, num = S('num').checked;
            const shelfH = 70, gy = H - shelfH - Math.max(20, (H - shelfH) * 0.18), ph = clamp(H * 0.2, 60, 130), piv = [W / 2, gy - ph], ppm = Math.min((W - 60) / (2 * HALF), 90);
            geo = { piv, ppm, gy, shelf: { y: H - shelfH, h: shelfH }, max: Math.min(0.3, Math.asin(Math.min(1, (ph - 4) / (HALF * ppm)))) };
            const sky = c.createLinearGradient(0, 0, 0, gy); sky.addColorStop(0, '#0b1730'); sky.addColorStop(1, '#1e3a5f'); c.fillStyle = sky; c.fillRect(0, 0, W, gy); c.fillStyle = '#14532d'; c.fillRect(0, gy, W, H - gy); c.fillStyle = '#166534'; c.fillRect(0, gy, W, 4);
            /* apoio */
            c.fillStyle = '#64748b'; c.beginPath(); c.moveTo(piv[0], piv[1]); c.lineTo(piv[0] - ph * 0.45, gy); c.lineTo(piv[0] + ph * 0.45, gy); c.closePath(); c.fill();
            /* viga */
            c.save(); c.translate(piv[0], piv[1]); c.rotate(-st.th);
            c.fillStyle = '#a16207'; c.fillRect(-HALF * ppm, -8, 2 * HALF * ppm, 10); c.fillStyle = '#78350f'; c.fillRect(-HALF * ppm, 0, 2 * HALF * ppm, 3);
            if (S('ruler').checked) for (let x = -HALF; x <= HALF + 1e-9; x += 0.5) { c.fillStyle = x === 0 ? '#fde047' : '#fde68a'; c.fillRect(x * ppm - 0.5, -8, 1, Number.isInteger(x) ? 8 : 4); if (Number.isInteger(x) && x) label(c, Math.abs(x) + ' m', x * ppm, 14, '#fde68a', F(600, 9), 'center'); }
            /* pesos empilhados por posição */
            const stacks = {};
            st.w.forEach(w => { if (st.drag && st.drag.w === w) return; const k = w.x.toFixed(2); stacks[k] = (stacks[k] || 0); const sz = blockSize(w.m); drawBlock(c, w.x * ppm, -8 - stacks[k] - sz / 2, w.m, sz); stacks[k] += sz; });
            c.restore();
            c.fillStyle = '#334155'; c.beginPath(); c.arc(piv[0], piv[1], 5, 0, TAU); c.fill();
            if (st.held) { c.strokeStyle = '#fbbf24'; c.lineWidth = 3; [-1, 1].forEach(sg => { c.beginPath(); c.moveTo(piv[0] + sg * HALF * ppm * 0.9, piv[1] + 4); c.lineTo(piv[0] + sg * HALF * ppm * 0.9, gy); c.stroke(); }); label(c, 'presa', piv[0] + HALF * ppm * 0.9 + 8, gy - 12, '#fbbf24', F(700, 10)); }
            /* prateleira */
            c.fillStyle = '#1f2937'; c.fillRect(0, H - shelfH, W, shelfH); label(c, 'arraste um peso:', 12, H - shelfH + 12, '#94a3b8', F(600, 10));
            const pal = st.chal ? [st.chal.give] : MASSES; geo.pal = [];
            pal.forEach((m, i) => { const x = 140 + i * 90, y = H - shelfH / 2 + 4, sz = blockSize(m); drawBlock(c, x, y, m, sz); geo.pal.push({ m, x, y, sz }); });
            if (st.drag) drawBlock(c, st.drag.x, st.drag.y, st.drag.m, blockSize(st.drag.m), true);
            const T = torque(), bal = Math.abs(T.net) < 1e-6;
            if (num) { label(c, 'torque esquerdo: ' + nf(T.l * 9.8, 0) + ' N·m', 12, 18, '#f472b6', F(700, 12)); label(c, 'torque direito: ' + nf(T.r * 9.8, 0) + ' N·m', W - 12, 18, '#60a5fa', F(700, 12), 'right');
                const tm = Math.max(T.l, T.r, 1), bw = W * 0.3; c.fillStyle = '#f472b6'; c.fillRect(12, 30, bw * T.l / tm, 8); c.fillStyle = '#60a5fa'; c.fillRect(W - 12 - bw * T.r / tm, 30, bw * T.r / tm, 8); }
            if (!st.held && st.w.length) label(c, bal ? 'Equilibrada!' : (T.net > 0 ? 'desce para a direita' : 'desce para a esquerda'), W / 2, 56, bal ? '#34d399' : '#fde68a', F(800, 14), 'center');
            if (st.msg) label(c, st.msg, W / 2, 80, '#fde68a', F(700, 12), 'center');
            readout(T);
        }
        const blockSize = m => 16 + Math.sqrt(m) * 5;
        function drawBlock(c, x, y, m, sz, ghost) {
            c.globalAlpha = ghost ? 0.75 : 1;
            const col = { 5: '#34d399', 10: '#60a5fa', 20: '#f472b6', 40: '#fbbf24' }[m] || '#94a3b8';
            c.fillStyle = col; c.beginPath(); c.roundRect(x - sz / 2, y - sz / 2, sz, sz, 4); c.fill();
            ink(c, m + ' kg', x, y, '#0f172a', F(800, m >= 20 ? 11 : 9)); c.globalAlpha = 1;
        }
        function readout(T) {
            const num = S('num').checked;
            $('#gg-out', root).innerHTML =
                cell('Lado esquerdo', st.w.filter(w => w.x < 0).map(w => w.m + ' kg a ' + nf(-w.x, 1) + ' m').join(', ') || 'vazio', true) +
                cell('Lado direito', st.w.filter(w => w.x > 0).map(w => w.m + ' kg a ' + nf(w.x, 1) + ' m').join(', ') || 'vazio', true) +
                cell('Massa × distância', num ? 'esquerda ' + nf(T.l, 1) + ' kg·m · direita ' + nf(T.r, 1) + ' kg·m' : 'ligue "mostrar torques"', true);
        }
        const anim = animator(cv, dt => { step(dt); draw(); });
        /* arrastar e soltar */
        const pos = e => { const r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
        function beamX(px, py) { /* posição ao longo da viga (m), considerando a rotação */
            const dx = px - geo.piv[0], dy = py - geo.piv[1], c0 = Math.cos(st.th), s0 = Math.sin(st.th);
            return { x: (dx * c0 - dy * s0) / geo.ppm, h: dx * s0 + dy * c0 };
        }
        cv.addEventListener('pointerdown', e => {
            if (!geo) return; const [x, y] = pos(e);
            const p = geo.pal.find(q => Math.abs(q.x - x) < q.sz / 2 + 6 && Math.abs(q.y - y) < q.sz / 2 + 6);
            if (p) { st.drag = { m: p.m, x, y, w: null }; }
            else {
                const b = beamX(x, y);
                if (b.h < 10 && b.h > -120) { let best = null, bd = 0.4; st.w.forEach(w => { const d = Math.abs(w.x - b.x); if (d < bd) { bd = d; best = w; } }); if (best) st.drag = { m: best.m, x, y, w: best }; }
            }
            if (st.drag) { cv.setPointerCapture(e.pointerId); cv.style.touchAction = 'none'; e.preventDefault(); }
        });
        cv.addEventListener('pointermove', e => { if (!st.drag) return; const [x, y] = pos(e); st.drag.x = x; st.drag.y = y; });
        cv.addEventListener('pointerup', e => {
            if (!st.drag) return; const [x, y] = pos(e), b = beamX(x, y), d = st.drag; st.drag = null; cv.style.touchAction = 'auto';
            const onBeam = Math.abs(b.x) <= HALF + 0.2 && b.h < 20 && b.h > -160 && y < geo.shelf.y;
            if (d.w) st.w = st.w.filter(w => w !== d.w);
            if (onBeam) { const xs = clamp(Math.round(b.x * 2) / 2, -HALF, HALF); if (xs !== 0) { st.w.push({ m: d.m, x: xs }); if (st.chal) st.chal.placed = true; } }
            st.msg = '';
        });
        S('hold').addEventListener('click', () => {
            st.held = !st.held; S('hold').innerHTML = st.held ? '<i class="fa-solid fa-hand"></i> Soltar a gangorra' : '<i class="fa-solid fa-lock"></i> Prender a gangorra';
            if (!st.held && st.chal) { const T = torque(); st.msg = Math.abs(T.net) < 1e-6 ? 'Desafio resolvido!' : 'Ainda não: tente outra posição.'; }
        });
        S('clear').addEventListener('click', () => { st.w = []; st.chal = null; st.msg = ''; });
        S('chal').addEventListener('click', () => {
            /* lado esquerdo sorteado; um peso para equilibrar com solução numa marca de 0,5 m */
            st.chal = null;
            for (let k = 0; k < 200; k++) {
                const w1 = MASSES[Math.floor(Math.random() * 3)], x1 = -(1 + Math.floor(Math.random() * 6)) / 2 - 0.5, give = MASSES[Math.floor(Math.random() * 4)];
                const xr = w1 * -x1 / give;
                if (xr <= HALF && Math.abs(xr * 2 - Math.round(xr * 2)) < 1e-9 && xr >= 0.5 && give !== w1) { st.w = [{ m: w1, x: x1 }]; st.chal = { give, xr }; break; }
            }
            if (!st.chal) return; st.held = true; S('hold').innerHTML = '<i class="fa-solid fa-hand"></i> Soltar a gangorra'; st.msg = 'Coloque o peso de ' + st.chal.give + ' kg para equilibrar.';
        });
        ['num', 'ruler'].forEach(k => S(k).addEventListener('change', draw));
        if (window.ResizeObserver) new ResizeObserver(() => draw()).observe(cv);
        st.w = [{ m: 20, x: -1 }]; anim.start();
        return () => { draw(); anim.kick(); };
    }

    return { init: { movimento: initMovimento, forcas: initForcas, queda: initQueda, energia: initEnergia, colisoes: initColisoes, lancamento: initLancamento, gangorra: initGangorra } };
})();
