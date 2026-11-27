/* Física Moderna: simuladores Relatividade (relógio de luz, gêmeos, diagrama de Minkowski), Efeito fotoelétrico, Átomo e espectros,
   Dupla fenda, Mecânica quântica (equação de Schrödinger 1D) e Física nuclear (decaimento e reação em cadeia). */
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

    /* cor aproximada de um comprimento de onda visível (nm); fora do visível, cinza azulado (UV) ou vermelho escuro (IV) */
    function waveRGB(nm) {
        if (nm < 380) return [150, 130, 230];
        if (nm > 750) return [110, 30, 30];
        const S = [[380, [97, 0, 97]], [420, [106, 0, 255]], [440, [0, 0, 255]], [490, [0, 255, 255]], [510, [0, 255, 0]], [580, [255, 255, 0]], [645, [255, 0, 0]], [700, [255, 0, 0]], [750, [128, 0, 0]]];
        let i = 0; while (i < S.length - 2 && nm > S[i + 1][0]) i++;
        const [l0, c0] = S[i], [l1, c1] = S[i + 1], u = clamp((nm - l0) / (l1 - l0), 0, 1);
        return c0.map((v, k) => Math.round(v + (c1[k] - v) * u));
    }
    const gammaOf = b => 1 / Math.sqrt(1 - b * b);
    function dial(c, x, y, r, frac, col, txt, sub) {
        /* mostrador de relógio: frac = fração de volta */
        c.save();
        c.fillStyle = 'rgba(15,23,42,.92)'; c.strokeStyle = col; c.lineWidth = 2; c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill(); c.stroke();
        c.strokeStyle = 'rgba(148,163,184,.5)'; c.lineWidth = 1;
        for (let k = 0; k < 12; k++) { const a = k / 12 * TAU; c.beginPath(); c.moveTo(x + Math.sin(a) * r * 0.8, y - Math.cos(a) * r * 0.8); c.lineTo(x + Math.sin(a) * r * 0.92, y - Math.cos(a) * r * 0.92); c.stroke(); }
        const a = frac * TAU; c.strokeStyle = col; c.lineWidth = 2.5; c.lineCap = 'round';
        c.beginPath(); c.moveTo(x, y); c.lineTo(x + Math.sin(a) * r * 0.75, y - Math.cos(a) * r * 0.75); c.stroke();
        c.restore();
        label(c, txt, x, y + r + 12, col, F(700, 11), 'center');
        if (sub) label(c, sub, x, y + r + 26, '#cbd5e1', F(600, 11, true), 'center');
    }

    /* =====================================================================
       1. RELATIVIDADE: relógio de luz, gêmeos e diagrama de Minkowski
       ===================================================================== */
    function initRelatividade(root) {
        root.innerHTML =
            '<div class="lab-grid">' +
              '<div class="lab-stage tall"><canvas id="rl-cv" aria-label="Simulação de relatividade especial"></canvas></div>' +
              '<div class="lab-side">' +
                '<div class="ctl"><label>Modo</label>' + seg('rl-mode', [['relogio', 'relógio de luz'], ['gemeos', 'gêmeos'], ['mink', 'espaço-tempo']], 'relogio') + '</div>' +
                '<div class="ctl"><label for="rl-v">Velocidade <b id="rl-vv"></b></label><input id="rl-v" type="range" min="0" max="995" step="1" value="600"></div>' +
                '<div id="rl-prel"><div class="ctl"><label>Ver a cena do referencial</label>' + seg('rl-frame', [['plat', 'da plataforma'], ['trem', 'do trem']], 'plat') + '</div></div>' +
                '<div id="rl-pgem" hidden><div class="ctl"><label for="rl-d">Distância da estrela <b id="rl-dv"></b></label><input id="rl-d" type="range" min="1" max="20" step="0.5" value="4"></div>' +
                  '<div class="ctl seg" style="font-size:.84rem"><label><input type="checkbox" id="rl-sig"> aniversários avisados por sinais de luz</label></div></div>' +
                '<div id="rl-pmink" hidden><div class="ctl seg" style="flex-wrap:wrap;gap:6px 12px;font-size:.84rem"><label><input type="checkbox" id="rl-hyp" checked> hipérboles do intervalo</label><label><input type="checkbox" id="rl-sim" checked> linhas de simultaneidade</label></div>' +
                  '<p class="muted-p" style="font-size:.82rem;margin:6px 0 0">Arraste os eventos A, B e C.</p></div>' +
                '<div style="display:flex;gap:6px;flex-wrap:wrap"><button class="btn small primary" id="rl-play" type="button"><i class="fa-solid fa-pause"></i> Pausar</button><button class="btn small" id="rl-reset" type="button"><i class="fa-solid fa-rotate-left"></i> Recomeçar</button></div>' +
                '<div class="readout" id="rl-out"></div>' +
              '</div>' +
            '</div>' +
            '<div class="lab-under">' +
              '<div class="lab-note"><strong>Leitura.</strong> <em>Relógio de luz:</em> cada relógio é um pulso de luz entre dois espelhos; cada ida e volta é um tique. O relógio em movimento faz um caminho diagonal, mais longo, e tica mais devagar; ele também aparece encurtado na direção do movimento. <em>Gêmeos:</em> embaixo, o diagrama de espaço-tempo da viagem, com uma marca a cada ano de cada gêmeo. <em>Espaço-tempo:</em> eixos azuis do referencial parado, eixos rosa do referencial em movimento; a luz anda a 45°.</div>' +
              '<div class="lab-note"><strong>Experimente.</strong> No relógio de luz, troque para "do trem": agora é o relógio da plataforma que tica devagar. O efeito é recíproco. Nos gêmeos, ligue os sinais de luz: na ida, o viajante recebe poucos avisos de aniversário; na volta, recebe muitos de uma vez. No espaço-tempo, coloque A e B fora do cone de luz um do outro e mude a velocidade até a ordem deles se inverter.</div>' +
            '</div>';
        const S = k => $('#rl-' + k, root), cv = S('cv');
        const st = { mode: 'relogio', b: 0.6, frame: 'plat', t: 0, playing: true, D: 4,
            ev: [{ n: 'A', x: -1.5, t: 1 }, { n: 'B', x: 2, t: 2 }, { n: 'C', x: 0.5, t: 3.5 }], drag: -1, auto: false };
        const beta = () => st.b, G = () => gammaOf(st.b);

        /* ---------- relógio de luz ---------- */
        function drawClock(c, W, H) {
            const b = beta(), g = G(), Lpx = Math.min(H * 0.32, 150), cpx = Lpx / 0.9; /* c = Lpx/0.9 px por segundo: um tique parado = 1,8 s */
            const y0 = H * 0.2, y1 = y0 + Lpx, t = st.t;
            /* trilho e plataforma */
            c.fillStyle = '#0b1324'; c.fillRect(0, y1 + 26, W, H - y1 - 26);
            c.strokeStyle = 'rgba(148,163,184,.4)'; c.lineWidth = 2; c.beginPath(); c.moveTo(0, y1 + 24); c.lineTo(W, y1 + 24); c.stroke();
            const own = st.frame === 'plat' ? 'plataforma' : 'trem', other = st.frame === 'plat' ? 'trem' : 'plataforma';
            const dir = st.frame === 'plat' ? 1 : -1;
            /* relógio parado neste referencial */
            const wx = 70, xs = W * 0.16;
            const tick0 = 2 * Lpx / cpx, ph0 = (t % tick0) / tick0, ys = ph0 < 0.5 ? y1 - ph0 * 2 * Lpx : y0 + (ph0 - 0.5) * 2 * Lpx;
            box(c, xs - wx / 2, y0, wx, Lpx, '#60a5fa', 'relógio da ' + own);
            glowDot(c, xs, ys, '#fde68a');
            /* relógio em movimento: largura contraída, luz na diagonal */
            const tickM = g * tick0, vpx = b * cpx * dir, span = W + 160;
            let xm = ((W * 0.35 + vpx * t) % span + span) % span - 80, phM = (t % tickM) / tickM;
            const wm = wx / g, ym = phM < 0.5 ? y1 - phM * 2 * Lpx : y0 + (phM - 0.5) * 2 * Lpx;
            /* rastro da luz (últimos 2 tiques) */
            c.strokeStyle = 'rgba(253,230,138,.45)'; c.lineWidth = 1.5; c.beginPath();
            for (let k = 0; k <= 120; k++) {
                const tt = t - k / 120 * 2 * tickM; if (tt < 0) break;
                const xx = ((W * 0.35 + vpx * tt) % span + span) % span - 80; if (Math.abs(xx - xm + vpx * (t - tt)) > 1) break;
                const p = (tt % tickM) / tickM, yy = p < 0.5 ? y1 - p * 2 * Lpx : y0 + (p - 0.5) * 2 * Lpx;
                k ? c.lineTo(xx, yy) : c.moveTo(xx, yy);
            }
            c.stroke();
            const vagao = st.frame === 'plat';
            if (vagao) { c.fillStyle = 'rgba(244,114,182,.08)'; c.strokeStyle = 'rgba(244,114,182,.35)'; c.beginPath(); c.roundRect(xm - wm * 2.2, y0 - 26, wm * 4.4, Lpx + 46, 10); c.fill(); c.stroke(); }
            box(c, xm - wm / 2, y0, wm, Lpx, '#f472b6', 'relógio do ' + other);
            glowDot(c, xm, ym, '#fde68a');
            arrowPx(c, xm - 20 * dir, y1 + 40, xm + 30 * dir, y1 + 40, '#f472b6', 2);
            label(c, (b > 0 ? nf(b, 3) + 'c' : 'parado'), xm, y1 + 56, '#f472b6', F(700, 11), 'center');
            /* mostradores: tempo de cada relógio neste referencial */
            const r = Math.min(34, W * 0.06), dy = Math.min(H - r - 40, y1 + 120);
            dial(c, W * 0.3, dy, r, (t / tick0 / 12) % 1, '#60a5fa', 'da ' + own, nf(t / tick0, 1) + ' tiques');
            dial(c, W * 0.62, dy, r, (t / tickM / 12) % 1, '#f472b6', 'do ' + other, nf(t / tickM, 1) + ' tiques');
            label(c, 'Cena vista do referencial da ' + own, 14, 16, '#e2e8f0', F(700, 12));
            label(c, 'a luz anda à mesma velocidade c nos dois relógios', 14, 34, '#94a3b8', F(500, 11));
            return { tick0, tickM };
        }
        function box(c, x, y, w, h, col, txt) {
            c.fillStyle = col; c.fillRect(x, y - 5, w, 5); c.fillRect(x, y + h, w, 5);
            c.strokeStyle = col + '55'; c.lineWidth = 1;
            c.setLineDash([3, 4]); c.strokeRect(x, y, w, h); c.setLineDash([]);
            label(c, txt, x + w / 2, y - 14, col, F(700, 11), 'center');
        }
        function glowDot(c, x, y, col) {
            const g = c.createRadialGradient(x, y, 0, x, y, 12); g.addColorStop(0, col); g.addColorStop(1, 'rgba(253,230,138,0)');
            c.fillStyle = g; c.beginPath(); c.arc(x, y, 12, 0, TAU); c.fill(); c.fillStyle = '#fff'; c.beginPath(); c.arc(x, y, 3, 0, TAU); c.fill();
        }

        /* ---------- gêmeos ---------- */
        function drawTwins(c, W, H) {
            const b = Math.max(beta(), 0.05), g = gammaOf(b), D = st.D, Tt = 2 * D / b, tau = Tt / g;
            const yrPerSec = Math.max(0.6, Tt / 12); /* a viagem inteira dura ~12 s de animação */
            const te = Math.min(st.t * yrPerSec, Tt), half = Tt / 2;
            const xShip = te <= half ? b * te : D - b * (te - half), ts = te / g;
            /* cena */
            const sy = H * 0.14, x0 = 70, x1 = W - 70, X = x => x0 + x / D * (x1 - x0);
            const rn = rng(3); for (let i = 0; i < 80; i++) { c.fillStyle = 'rgba(203,213,225,' + (0.2 + rn() * 0.4) + ')'; c.fillRect(rn() * W, rn() * H * 0.28, 1.2, 1.2); }
            c.fillStyle = '#2563eb'; c.beginPath(); c.arc(x0, sy, 14, 0, TAU); c.fill(); c.fillStyle = '#22c55e'; c.beginPath(); c.arc(x0 - 4, sy - 4, 6, 0, TAU); c.fill();
            label(c, 'Terra', x0, sy + 24, '#93c5fd', F(700, 11), 'center');
            const sg = c.createRadialGradient(x1, sy, 0, x1, sy, 22); sg.addColorStop(0, '#fff7ed'); sg.addColorStop(0.4, '#fdba74'); sg.addColorStop(1, 'rgba(253,186,116,0)');
            c.fillStyle = sg; c.beginPath(); c.arc(x1, sy, 22, 0, TAU); c.fill();
            label(c, 'estrela a ' + nf(D, 1) + ' anos-luz', x1, sy + 26, '#fdba74', F(700, 11), 'center');
            const xs = X(xShip), back = te > half;
            c.save(); c.translate(xs, sy); if (back) c.scale(-1, 1);
            c.fillStyle = '#e2e8f0'; c.beginPath(); c.moveTo(16, 0); c.lineTo(-10, -7); c.lineTo(-10, 7); c.closePath(); c.fill();
            if (te < Tt) { c.fillStyle = 'rgba(251,146,60,.9)'; c.beginPath(); c.moveTo(-10, -4); c.lineTo(-22 - Math.random() * 6, 0); c.lineTo(-10, 4); c.closePath(); c.fill(); }
            c.restore();
            /* diagrama de espaço-tempo */
            const top = H * 0.3, bot = H - 30, ml = 70, mr = Math.max(150, W * 0.28);
            const Tx = x => ml + x / D * (W - ml - mr), Ty = t => bot - t / Tt * (bot - top);
            c.strokeStyle = 'rgba(148,163,184,.25)'; c.lineWidth = 1; c.strokeRect(ml, top, W - ml - mr, bot - top);
            label(c, 'tempo da Terra (anos)', 12, top - 10, '#94a3b8', F(600, 10));
            for (let k = 0; k <= Tt + 1e-9; k += Math.max(1, Math.round(Tt / 10))) label(c, nf(k), ml - 6, Ty(k), '#64748b', F(500, 10, true), 'right');
            /* linhas de mundo */
            c.strokeStyle = '#60a5fa'; c.lineWidth = 2.5; c.beginPath(); c.moveTo(Tx(0), Ty(0)); c.lineTo(Tx(0), Ty(te)); c.stroke();
            c.strokeStyle = '#f472b6'; c.beginPath(); c.moveTo(Tx(0), Ty(0));
            if (te <= half) c.lineTo(Tx(b * te), Ty(te)); else { c.lineTo(Tx(D), Ty(half)); c.lineTo(Tx(xShip), Ty(te)); } c.stroke();
            c.strokeStyle = 'rgba(244,114,182,.25)'; c.setLineDash([4, 4]); c.beginPath(); c.moveTo(Tx(0), Ty(0)); c.lineTo(Tx(D), Ty(half)); c.lineTo(Tx(0), Ty(Tt)); c.stroke(); c.setLineDash([]);
            /* aniversários: marcas a cada ano de cada gêmeo */
            for (let k = 1; k <= Math.floor(te); k++) { c.fillStyle = '#60a5fa'; c.beginPath(); c.arc(Tx(0), Ty(k), 3.2, 0, TAU); c.fill(); }
            for (let k = 1; k <= Math.floor(ts + 1e-9); k++) {
                const tE = k * g, xk = tE <= half ? b * tE : D - b * (tE - half);
                c.fillStyle = '#f472b6'; c.beginPath(); c.arc(Tx(xk), Ty(tE), 3.2, 0, TAU); c.fill();
            }
            if (S('sig').checked) {
                c.lineWidth = 1;
                /* sinais de luz da Terra para a nave (a cada aniversário da Terra) */
                for (let k = 1; k <= Math.floor(te); k++) {
                    /* chegada à nave: na ida x = b t e x = t − k; na volta x = D − b(t − half) */
                    let ta = k / (1 - b);
                    if (ta > half) ta = (k + D + b * half) / (1 + b);
                    const tEnd = Math.min(ta, te);
                    c.strokeStyle = 'rgba(96,165,250,.55)'; c.beginPath(); c.moveTo(Tx(0), Ty(k)); c.lineTo(Tx(tEnd - k), Ty(tEnd)); c.stroke();
                }
                /* sinais da nave para a Terra */
                for (let k = 1; k <= Math.floor(ts + 1e-9); k++) {
                    const tE = k * g, xk = tE <= half ? b * tE : D - b * (tE - half), tArr = tE + xk, tEnd = Math.min(tArr, te);
                    c.strokeStyle = 'rgba(244,114,182,.55)'; c.beginPath(); c.moveTo(Tx(xk), Ty(tE)); c.lineTo(Tx(xk - (tEnd - tE)), Ty(tEnd)); c.stroke();
                }
            }
            /* idades */
            const ax = W - mr + 30, r = Math.min(30, mr * 0.18);
            dial(c, ax + r, top + 50, r, te % 1, '#60a5fa', 'gêmea na Terra', nf(20 + te, 1) + ' anos');
            dial(c, ax + r, top + 50 + r * 2 + 70, r, ts % 1, '#f472b6', 'gêmeo na nave', nf(20 + ts, 1) + ' anos');
            if (te >= Tt) label(c, 'Reencontro: diferença de ' + nf(Tt - tau, 1) + ' anos', W / 2, top - 12, '#fde68a', F(800, 13), 'center');
            return { Tt, tau, te, ts };
        }

        /* ---------- diagrama de Minkowski ---------- */
        let mk = null;
        function drawMink(c, W, H) {
            const b = beta(), g = G(), R = 5, cx = W / 2, cy = H * 0.55, s = Math.min(W, H) * 0.42 / R * (W < 600 ? 1.05 : 1);
            const P = (x, t) => [cx + x * s, cy - t * s];
            mk = { P, s, cx, cy };
            c.save(); c.beginPath(); c.rect(0, 0, W, H); c.clip();
            /* grade do referencial parado */
            c.strokeStyle = 'rgba(96,165,250,.10)'; c.lineWidth = 1;
            for (let k = -8; k <= 8; k++) { let p = P(k, -8), q = P(k, 8); c.beginPath(); c.moveTo(p[0], p[1]); c.lineTo(q[0], q[1]); c.stroke(); p = P(-8, k); q = P(8, k); c.beginPath(); c.moveTo(p[0], p[1]); c.lineTo(q[0], q[1]); c.stroke(); }
            /* cone de luz */
            c.fillStyle = 'rgba(253,224,71,.05)'; c.beginPath(); let p = P(0, 0); c.moveTo(p[0], p[1]); p = P(-8, 8); c.lineTo(p[0], p[1]); p = P(8, 8); c.lineTo(p[0], p[1]); c.closePath(); c.fill();
            c.beginPath(); p = P(0, 0); c.moveTo(p[0], p[1]); p = P(-8, -8); c.lineTo(p[0], p[1]); p = P(8, -8); c.lineTo(p[0], p[1]); c.closePath(); c.fill();
            c.strokeStyle = 'rgba(253,224,71,.7)'; c.lineWidth = 1.5; c.setLineDash([6, 4]);
            [[-8, -8, 8, 8], [-8, 8, 8, -8]].forEach(l => { const a = P(l[0], l[1]), d = P(l[2], l[3]); c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(d[0], d[1]); c.stroke(); });
            c.setLineDash([]);
            /* grade do referencial em movimento: linhas x' = k e t' = k */
            c.strokeStyle = 'rgba(244,114,182,.16)';
            for (let k = -8; k <= 8; k++) {
                /* x' = k: x = γ(k + β t') ... parametrizado por t' */
                let a = P(g * (k + b * -9), g * (-9 + b * k)), d = P(g * (k + b * 9), g * (9 + b * k)); c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(d[0], d[1]); c.stroke();
                a = P(g * (-9 + b * k), g * (k + b * -9)); d = P(g * (9 + b * k), g * (k + b * 9)); c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(d[0], d[1]); c.stroke();
            }
            /* eixos */
            const axis = (x0, t0, x1, t1, col, w) => { const a = P(x0, t0), d = P(x1, t1); c.strokeStyle = col; c.lineWidth = w; c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(d[0], d[1]); c.stroke(); };
            axis(-8, 0, 8, 0, '#60a5fa', 2); axis(0, -8, 0, 8, '#60a5fa', 2);
            axis(-8 * g, -8 * g * b, 8 * g, 8 * g * b, '#f472b6', 2); axis(-8 * g * b, -8 * g, 8 * g * b, 8 * g, '#f472b6', 2);
            /* marcas de 1 unidade em cada eixo (calibradas pelas hipérboles) */
            for (let k = -6; k <= 6; k++) { if (!k) continue; let q = P(k, 0); c.fillStyle = '#60a5fa'; c.fillRect(q[0] - 1, q[1] - 4, 2, 8); q = P(0, k); c.fillRect(q[0] - 4, q[1] - 1, 8, 2);
                q = P(g * k, g * b * k); c.fillStyle = '#f472b6'; c.beginPath(); c.arc(q[0], q[1], 2.5, 0, TAU); c.fill(); q = P(g * b * k, g * k); c.beginPath(); c.arc(q[0], q[1], 2.5, 0, TAU); c.fill(); }
            if (S('hyp').checked) {
                c.strokeStyle = 'rgba(167,139,250,.35)'; c.lineWidth = 1;
                st.ev.forEach(e => {
                    const s2 = e.t * e.t - e.x * e.x; if (Math.abs(s2) < 0.05) return;
                    const a = Math.sqrt(Math.abs(s2));
                    for (const sg2 of [1, -1]) { c.beginPath(); for (let k = 0; k <= 80; k++) { const u = -2.5 + k / 80 * 5; const xx = s2 > 0 ? a * Math.sinh(u) : sg2 * a * Math.cosh(u), tt = s2 > 0 ? sg2 * a * Math.cosh(u) : a * Math.sinh(u); const q = P(xx, tt); k ? c.lineTo(q[0], q[1]) : c.moveTo(q[0], q[1]); } c.stroke(); }
                });
            }
            /* eventos e simultaneidade */
            st.ev.forEach((e, i) => {
                const tp = g * (e.t - b * e.x);
                if (S('sim').checked) {
                    /* linha t' = tp: pontos (x, t) com t = tp/γ + βx */
                    const a = P(-9, tp / g + b * -9), d = P(9, tp / g + b * 9);
                    c.strokeStyle = 'rgba(244,114,182,.45)'; c.setLineDash([3, 4]); c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(d[0], d[1]); c.stroke(); c.setLineDash([]);
                    const h = P(-9, e.t), h2 = P(9, e.t); c.strokeStyle = 'rgba(96,165,250,.3)'; c.setLineDash([3, 4]); c.beginPath(); c.moveTo(h[0], h[1]); c.lineTo(h2[0], h2[1]); c.stroke(); c.setLineDash([]);
                }
                const q = P(e.x, e.t), col = ['#fde047', '#34d399', '#fb923c'][i];
                const gr = c.createRadialGradient(q[0], q[1], 0, q[0], q[1], 14); gr.addColorStop(0, col); gr.addColorStop(1, 'rgba(0,0,0,0)');
                c.fillStyle = gr; c.beginPath(); c.arc(q[0], q[1], 14, 0, TAU); c.fill(); c.fillStyle = col; c.beginPath(); c.arc(q[0], q[1], 5, 0, TAU); c.fill();
                label(c, e.n, q[0] + 9, q[1] - 10, col, F(800, 13));
            });
            c.restore();
            let q = P(4.6, 0); label(c, 'x', q[0], q[1] + 12, '#60a5fa', F(700, 12)); q = P(0, 4.7); label(c, 'ct', q[0] + 8, q[1], '#60a5fa', F(700, 12));
            q = P(4.2 * g, 4.2 * g * b); label(c, "x'", q[0] + 6, q[1] - 8, '#f472b6', F(700, 12)); q = P(4.2 * g * b, 4.2 * g); label(c, "ct'", q[0] + 8, q[1], '#f472b6', F(700, 12));
            label(c, 'luz', P(3.6, 3.6)[0] + 6, P(3.6, 3.6)[1], '#fde047', F(600, 11));
        }

        function readout(extra) {
            const b = beta(), g = G();
            S('vv').textContent = nf(b, 3).replace(/^0$/, '0') + 'c';
            let h = cell('Fator de Lorentz γ', nf(g, 3)) + cell('Velocidade', b ? nf(b * 299792.458, 0) + ' km/s' : '0');
            if (st.mode === 'relogio' && extra) h += cell('Tique do relógio parado', nf(1, 0) + ' unidade') + cell('Tique do relógio em movimento', nf(g, 3) + ' unidades') + cell('Comprimento do relógio em movimento', nf(100 / g, 1) + '% do original', true);
            if (st.mode === 'gemeos' && extra) h += cell('Viagem, no relógio da Terra', nf(extra.Tt, 2) + ' anos') + cell('Viagem, no relógio da nave', nf(extra.tau, 2) + ' anos') + cell('Distância medida pela nave', nf(st.D / g, 2) + ' anos-luz') + cell('Diferença de idade no reencontro', nf(extra.Tt - extra.tau, 2) + ' anos');
            if (st.mode === 'mink') {
                st.ev.forEach(e => { const xp = g * (e.x - b * e.t), tp = g * (e.t - b * e.x); h += cell('Evento ' + e.n, '(' + nf(e.x, 2) + '; ' + nf(e.t, 2) + ') → (' + nf(xp, 2) + '; ' + nf(tp, 2) + ")", true); });
                const [A, B] = st.ev, dt = B.t - A.t, dx = B.x - A.x, s2 = dt * dt - dx * dx, dtp = g * (dt - b * dx);
                h += cell('Intervalo A–B (c²Δt² − Δx²)', nf(s2, 2) + (s2 > 0.001 ? ' (tipo tempo: A pode causar B)' : s2 < -0.001 ? ' (tipo espaço: sem relação causal)' : ' (tipo luz)'), true);
                h += cell("Quem vem antes, A ou B?", (dt > 0 ? 'B depois de A' : dt < 0 ? 'B antes de A' : 'simultâneos') + ' no referencial azul; ' + (dtp > 0.001 ? 'B depois de A' : dtp < -0.001 ? 'B antes de A' : 'simultâneos') + ' no rosa', true);
            }
            $('#rl-out', root).innerHTML = h;
        }
        function draw() {
            const gg = canvas2d(cv, '#04060d'); if (!gg) return;
            const { c, W, H } = gg; let extra = null;
            if (st.mode === 'relogio') extra = drawClock(c, W, H);
            else if (st.mode === 'gemeos') extra = drawTwins(c, W, H);
            else drawMink(c, W, H);
            S('dv').textContent = nf(st.D, 1) + ' anos-luz';
            readout(extra);
        }
        const anim = animator(cv, dt => {
            if (st.playing) {
                st.t += dt;
                if (st.mode === 'mink' && st.auto) { st.ph = (st.ph || 0) + dt * 0.5; st.b = 0.85 * Math.sin(st.ph); S('v').value = Math.round(Math.abs(st.b) * 1000); }
            }
            if (st.mode === 'gemeos') { const Tt = 2 * st.D / Math.max(st.b, 0.05), yps = Math.max(0.6, Tt / 12); if (st.t * yps > Tt + 4 * yps) st.t = 0; }
            draw();
        });
        function setMode(m) {
            st.mode = m; st.t = 0; S('prel').hidden = m !== 'relogio'; S('pgem').hidden = m !== 'gemeos'; S('pmink').hidden = m !== 'mink';
            S('play').innerHTML = m === 'mink' ? (st.auto ? '<i class="fa-solid fa-pause"></i> Parar' : '<i class="fa-solid fa-play"></i> Variar v') : (st.playing ? '<i class="fa-solid fa-pause"></i> Pausar' : '<i class="fa-solid fa-play"></i> Continuar');
            if (m !== 'mink') { st.auto = false; st.b = Math.abs(st.b); }
            cv.style.touchAction = m === 'mink' ? 'none' : 'auto';
            draw();
        }
        root.querySelectorAll('input[name="rl-mode"]').forEach(el => el.addEventListener('change', () => setMode(radio(root, 'rl-mode'))));
        root.querySelectorAll('input[name="rl-frame"]').forEach(el => el.addEventListener('change', () => { st.frame = radio(root, 'rl-frame'); st.t = 0; draw(); }));
        S('v').addEventListener('input', () => { st.b = +S('v').value / 1000; st.auto = false; if (st.mode === 'gemeos') st.t = 0; if (st.mode === 'mink') setMode('mink'); draw(); });
        S('d').addEventListener('input', () => { st.D = +S('d').value; st.t = 0; draw(); });
        ['sig', 'hyp', 'sim'].forEach(k => S(k).addEventListener('change', draw));
        S('play').addEventListener('click', () => {
            if (st.mode === 'mink') { st.auto = !st.auto; st.playing = true; setMode('mink'); return; }
            st.playing = !st.playing; setMode(st.mode);
        });
        S('reset').addEventListener('click', () => { st.t = 0; if (st.mode === 'mink') { st.ev = [{ n: 'A', x: -1.5, t: 1 }, { n: 'B', x: 2, t: 2 }, { n: 'C', x: 0.5, t: 3.5 }]; } draw(); });
        /* arrastar eventos no diagrama */
        const pos = e => { const r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
        cv.addEventListener('pointerdown', e => {
            if (st.mode !== 'mink' || !mk) return;
            const [x, y] = pos(e); let best = -1, bd = 22;
            st.ev.forEach((ev, i) => { const q = mk.P(ev.x, ev.t), d = Math.hypot(q[0] - x, q[1] - y); if (d < bd) { bd = d; best = i; } });
            if (best >= 0) { st.drag = best; cv.setPointerCapture(e.pointerId); e.preventDefault(); }
        });
        cv.addEventListener('pointermove', e => {
            if (st.drag < 0 || !mk) return;
            const [x, y] = pos(e), ev = st.ev[st.drag];
            ev.x = clamp(Math.round((x - mk.cx) / mk.s * 4) / 4, -4.75, 4.75); ev.t = clamp(Math.round((mk.cy - y) / mk.s * 4) / 4, -4.75, 4.75); draw();
        });
        cv.addEventListener('pointerup', () => { st.drag = -1; });
        if (window.ResizeObserver) new ResizeObserver(() => draw()).observe(cv);
        st.b = 0.6; anim.start();
        return () => { draw(); anim.kick(); };
    }

    /* =====================================================================
       2. EFEITO FOTOELÉTRICO
       ===================================================================== */
    const METALS = [['césio', 2.1], ['sódio', 2.3], ['zinco', 4.3], ['cobre', 4.7], ['platina', 5.6]];
    function initFotoeletrico(root) {
        root.innerHTML =
            '<div class="lab-grid">' +
              '<div class="lab-stage tall"><canvas id="fe-cv" aria-label="Tubo de efeito fotoelétrico com gráficos"></canvas></div>' +
              '<div class="lab-side">' +
                '<div class="ctl"><label for="fe-m">Metal da placa</label><select id="fe-m">' + METALS.map((m, i) => '<option value="' + i + '"' + (i === 1 ? ' selected' : '') + '>' + m[0] + ' (φ ≈ ' + String(m[1]).replace('.', ',') + ' eV)</option>').join('') + '</select></div>' +
                '<div class="ctl"><label for="fe-l">Comprimento de onda <b id="fe-lv"></b></label><input id="fe-l" type="range" min="150" max="750" step="1" value="420"><div id="fe-bar" style="height:8px;border-radius:4px;margin-top:4px;background:linear-gradient(90deg,#7a6fe0 0%,#7a6fe0 38%,#6100ff 38.5%,#0000ff 48%,#00ffff 56%,#00ff00 60%,#ffff00 72%,#ff0000 82%,#800000 100%)"></div></div>' +
                '<div class="ctl"><label for="fe-i">Intensidade da luz <b id="fe-iv"></b></label><input id="fe-i" type="range" min="0" max="100" step="1" value="60"></div>' +
                '<div class="ctl"><label for="fe-u">Tensão entre as placas <b id="fe-uv"></b></label><input id="fe-u" type="range" min="-4" max="3" step="0.05" value="0.5"></div>' +
                '<button class="btn small" id="fe-stop" type="button"><i class="fa-solid fa-crosshairs"></i> Ajustar na tensão de freamento</button>' +
                '<div class="readout" id="fe-out"></div>' +
              '</div>' +
            '</div>' +
            '<div class="lab-under">' +
              '<div class="lab-note"><strong>Leitura.</strong> A lâmpada ilumina a placa de metal (à esquerda) dentro de um tubo a vácuo. Cada fóton absorvido entrega toda a energia a um elétron; se a energia passa da função trabalho φ, o elétron sai e voa para a outra placa. Uma tensão negativa freia os elétrons. Embaixo: a energia máxima dos elétrons contra a frequência (a reta de Einstein) e a corrente contra a tensão.</div>' +
              '<div class="lab-note"><strong>Experimente.</strong> Com o sódio, vá do violeta para o vermelho: abaixo de cerca de 540 nm os elétrons param de sair, por mais intensa que seja a luz. Mude a intensidade e veja a corrente mudar, mas não a energia de cada elétron. Troque de metal: a reta se desloca, mas a inclinação (h/e) é a mesma.</div>' +
            '</div>';
        const S = k => $('#fe-' + k, root), cv = S('cv');
        const st = { m: 1, lam: 420, I: 0.6, U: 0.5, photons: [], elec: [], hits: [], clock: 0, acc: 0, curr: 0 };
        const HC = 1239.84, VS = 210; /* velocidade de tela (px/s) de um elétron de 1 eV */
        const Eph = () => HC / st.lam, phi = () => METALS[st.m][1], Kmax = () => Math.max(0, Eph() - phi());
        function current(U) { /* corrente relativa: saturação ∝ intensidade, cai linearmente até a tensão de freamento */
            const K = Kmax(); if (K <= 0) return 0;
            const sat = st.I; if (U >= 0) return sat; if (-U >= K) return 0; return sat * (1 - (-U) / K);
        }
        let geo = null;
        function layout(W, H) {
            const wide = W >= 640, tubeH = wide ? H * 0.56 : H * 0.5;
            return { tube: { x: 0, y: 0, w: W, h: tubeH }, g1: wide ? { x: 0, y: tubeH, w: W / 2, h: H - tubeH } : { x: 0, y: tubeH, w: W, h: (H - tubeH) / 2 },
                g2: wide ? { x: W / 2, y: tubeH, w: W / 2, h: H - tubeH } : { x: 0, y: tubeH + (H - tubeH) / 2, w: W, h: (H - tubeH) / 2 } };
        }
        function step(dt) {
            st.clock += dt; const L = geo; if (!L) return;
            const T = L.tube, catX = T.x + T.w * 0.22, anX = T.x + T.w * 0.84, cy = T.y + T.h * 0.5, ph = T.h * 0.42;
            const lamp = [T.x + T.w * 0.08, T.y + T.h * 0.12];
            /* novos fótons: taxa ∝ intensidade */
            st.acc += dt * 16 * st.I;
            while (st.acc >= 1) {
                st.acc -= 1;
                const ty = cy - ph / 2 + Math.random() * ph, tx = catX;
                st.photons.push({ x: lamp[0], y: lamp[1], tx, ty, u: 0, dur: 0.55 });
            }
            st.photons.forEach(p => { p.u += dt / p.dur; });
            st.photons = st.photons.filter(p => {
                if (p.u < 1) return true;
                if (Eph() > phi()) {
                    const K = Math.random() * Kmax(), v = Math.sqrt(K) * VS + 4, a = (Math.random() - 0.5) * 0.7;
                    st.elec.push({ x: p.tx + 4, y: p.ty, vx: v * Math.cos(a), vy: v * Math.sin(a), life: 0 });
                } else st.hits.push({ x: p.tx, y: p.ty, t: 0.25 });
                return false;
            });
            /* campo uniforme entre as placas: aceleração proporcional à tensão */
            const acc = st.U * VS * VS / (anX - catX) * 0.5;
            st.elec.forEach(e => { e.vx += acc * dt; e.x += e.vx * dt; e.y += e.vy * dt; e.life += dt; if (e.y < cy - ph * 0.62 || e.y > cy + ph * 0.62) e.vy *= -1; });
            let arrived = 0;
            st.elec = st.elec.filter(e => { if (e.x >= anX) { arrived++; return false; } if (e.x < catX) return false; return e.life < 8; });
            st.hits.forEach(h => { h.t -= dt; }); st.hits = st.hits.filter(h => h.t > 0);
            st.curr += (arrived / Math.max(dt, 1e-3) / 16 - st.curr) * Math.min(1, dt * 2);
        }
        function draw() {
            const gg = canvas2d(cv, '#04060d'); if (!gg) return;
            const { c, W, H } = gg, L = geo = layout(W, H), T = L.tube;
            const catX = T.x + T.w * 0.22, anX = T.x + T.w * 0.84, cy = T.y + T.h * 0.5, ph = T.h * 0.42, col = waveRGB(st.lam);
            /* tubo */
            c.fillStyle = 'rgba(148,163,184,.05)'; c.strokeStyle = 'rgba(148,163,184,.35)'; c.lineWidth = 1.5;
            c.beginPath(); c.roundRect(T.x + T.w * 0.16, cy - ph * 0.75, T.w * 0.75, ph * 1.5, ph * 0.7); c.fill(); c.stroke();
            /* placas */
            const mcol = ['#d6c48a', '#c9ccd1', '#9ca3af', '#d08b5b', '#e5e7eb'][st.m];
            c.fillStyle = mcol; c.fillRect(catX - 8, cy - ph / 2, 8, ph);
            c.fillStyle = '#64748b'; c.fillRect(anX, cy - ph / 2, 6, ph);
            label(c, METALS[st.m][0], catX - 4, cy + ph / 2 + 14, mcol, F(700, 11), 'center');
            /* circuito e amperímetro */
            const by = cy + ph * 0.75 + 18;
            c.strokeStyle = 'rgba(148,163,184,.6)'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(catX - 4, cy + ph / 2); c.lineTo(catX - 4, by); c.lineTo(anX + 3, by); c.lineTo(anX + 3, cy + ph / 2); c.stroke();
            const mx = (catX + anX) / 2, ar = Math.min(26, T.h * 0.09);
            c.fillStyle = '#0f172a'; c.beginPath(); c.arc(mx - 60, by, ar, 0, TAU); c.fill(); c.stroke();
            const needle = clamp(st.curr, 0, 1.1); c.strokeStyle = '#fde047'; c.lineWidth = 2; c.beginPath(); c.moveTo(mx - 60, by + ar * 0.4); c.lineTo(mx - 60 + Math.cos(Math.PI * (1.15 - needle * 0.8)) * ar * 0.85, by + ar * 0.4 - Math.sin(Math.PI * (1.15 - needle * 0.8)) * ar * 0.85); c.stroke();
            label(c, 'A', mx - 60, by - ar * 0.4, '#94a3b8', F(700, 10), 'center');
            c.fillStyle = '#0f172a'; c.fillRect(mx + 30, by - 12, 34, 24); c.strokeStyle = 'rgba(148,163,184,.6)'; c.strokeRect(mx + 30, by - 12, 34, 24);
            label(c, (st.U >= 0 ? '+' : '−') + nf(Math.abs(st.U), 2) + ' V', mx + 47, by + 24, st.U >= 0 ? '#34d399' : '#f87171', F(700, 11, true), 'center');
            label(c, st.U >= 0 ? '− +' : '+ −', mx + 47, by, '#cbd5e1', F(700, 11), 'center');
            /* lâmpada e feixe */
            const lamp = [T.x + T.w * 0.08, T.y + T.h * 0.12];
            if (st.I > 0) {
                const gr = c.createLinearGradient(lamp[0], lamp[1], catX, cy);
                gr.addColorStop(0, rgba(col, 0.25 * st.I + 0.05)); gr.addColorStop(1, rgba(col, 0.05));
                c.fillStyle = gr; c.beginPath(); c.moveTo(lamp[0], lamp[1]); c.lineTo(catX, cy - ph / 2); c.lineTo(catX, cy + ph / 2); c.closePath(); c.fill();
            }
            c.fillStyle = '#334155'; c.beginPath(); c.arc(lamp[0], lamp[1], 16, 0, TAU); c.fill();
            c.fillStyle = rgba(col, 0.4 + 0.6 * st.I); c.beginPath(); c.arc(lamp[0], lamp[1], 9, 0, TAU); c.fill();
            label(c, st.lam < 380 ? 'ultravioleta' : nf(st.lam) + ' nm', lamp[0], lamp[1] + 28, rgba(col.map(v => Math.max(v, 120))), F(700, 11), 'center');
            /* fótons como pacotes de onda */
            c.lineWidth = 1.6; c.strokeStyle = rgba(col.map(v => Math.max(v, 90)));
            st.photons.forEach(p => {
                const x = lerp(p.x, p.tx, p.u), y = lerp(p.y, p.ty, p.u), dx = p.tx - p.x, dy = p.ty - p.y, dn = Math.hypot(dx, dy), ux = dx / dn, uy = dy / dn, wl = 2 + st.lam / 90;
                c.beginPath(); for (let k = 0; k <= 16; k++) { const s2 = -10 + k / 16 * 20, amp = 3.5 * Math.exp(-s2 * s2 / 40) * Math.sin(TAU * s2 / wl); const px = x + ux * s2 - uy * amp, py = y + uy * s2 + ux * amp; k ? c.lineTo(px, py) : c.moveTo(px, py); } c.stroke();
            });
            st.hits.forEach(h => { c.fillStyle = 'rgba(248,113,113,' + h.t * 3 + ')'; c.beginPath(); c.arc(h.x, h.y, 3, 0, TAU); c.fill(); });
            /* elétrons */
            st.elec.forEach(e => {
                const gr = c.createRadialGradient(e.x, e.y, 0, e.x, e.y, 6); gr.addColorStop(0, 'rgba(125,211,252,1)'); gr.addColorStop(1, 'rgba(125,211,252,0)');
                c.fillStyle = gr; c.beginPath(); c.arc(e.x, e.y, 6, 0, TAU); c.fill();
            });
            label(c, 'e⁻', anX - 30, cy - ph / 2 - 10, '#7dd3fc', F(700, 11));
            if (Eph() <= phi()) label(c, 'Nenhum elétron sai: cada fóton tem ' + nf(Eph(), 2) + ' eV, menos que φ = ' + nf(phi(), 1) + ' eV', T.x + T.w / 2, T.y + 16, '#fca5a5', F(700, 12), 'center');
            else label(c, 'Cada fóton: ' + nf(Eph(), 2) + ' eV · elétrons com até ' + nf(Kmax(), 2) + ' eV', T.x + T.w / 2, T.y + 16, '#e2e8f0', F(700, 12), 'center');
            graphK(c, L.g1); graphI(c, L.g2);
            readout();
        }
        function frame(c, R, xl, yl) {
            const g = { x0: R.x + 46, x1: R.x + R.w - 14, y0: R.y + R.h - 30, y1: R.y + 24 };
            c.fillStyle = '#070b16'; c.fillRect(R.x, R.y, R.w, R.h);
            c.strokeStyle = 'rgba(148,163,184,.2)'; c.strokeRect(R.x + 0.5, R.y + 0.5, R.w - 1, R.h - 1);
            label(c, yl, R.x + 8, R.y + 11, '#cbd5e1', F(600, 10));
            label(c, xl, (g.x0 + g.x1) / 2, R.y + R.h - 9, '#cbd5e1', F(600, 10), 'center');
            return g;
        }
        function graphK(c, R) {
            const g = frame(c, R, 'frequência (10¹⁴ Hz)', 'energia máxima do elétron (eV)');
            const f0 = 2, f1 = 20, X = f => g.x0 + (f - f0) / (f1 - f0) * (g.x1 - g.x0), Y = K => g.y0 - K / 5 * (g.y0 - g.y1);
            for (let f = 4; f <= 20; f += 4) { c.strokeStyle = 'rgba(148,163,184,.1)'; c.beginPath(); c.moveTo(X(f), g.y0); c.lineTo(X(f), g.y1); c.stroke(); label(c, String(f), X(f), g.y0 + 9, '#64748b', F(500, 9, true), 'center'); }
            for (let K = 0; K <= 5; K++) label(c, String(K), g.x0 - 6, Y(K), '#64748b', F(500, 9, true), 'right');
            /* faixa visível */
            const fv0 = 2.998e17 / 750 / 1e14, fv1 = 2.998e17 / 380 / 1e14;
            const gr = c.createLinearGradient(X(fv0), 0, X(fv1), 0); [[0, 750], [0.3, 620], [0.5, 560], [0.7, 480], [1, 380]].forEach(([u, l]) => gr.addColorStop(u, rgba(waveRGB(l), 0.18)));
            c.fillStyle = gr; c.fillRect(X(fv0), g.y1, X(fv1) - X(fv0), g.y0 - g.y1);
            const hEv = 4.1357e-15;
            METALS.forEach((m, i) => {
                const fc = m[1] / hEv / 1e14; c.strokeStyle = i === st.m ? '#34d399' : 'rgba(148,163,184,.25)'; c.lineWidth = i === st.m ? 2.2 : 1;
                c.beginPath(); c.moveTo(X(fc), Y(0)); c.lineTo(X(f1), Y(hEv * f1 * 1e14 - m[1])); c.stroke();
                if (i === st.m) label(c, 'f₀ = ' + nf(fc, 1), X(fc), Y(0) - 10, '#34d399', F(700, 10), 'center');
            });
            const f = 2.998e17 / st.lam / 1e14, K = Kmax();
            if (f >= f0 && f <= f1) { c.fillStyle = '#fde047'; c.beginPath(); c.arc(X(f), Y(K), 5, 0, TAU); c.fill(); }
            label(c, 'inclinação = h/e (igual para todos os metais)', g.x1, g.y1 + 2, '#94a3b8', F(500, 9), 'right');
        }
        function graphI(c, R) {
            const g = frame(c, R, 'tensão (V)', 'corrente (relativa)');
            const U0 = -4, U1 = 3, X = U => g.x0 + (U - U0) / (U1 - U0) * (g.x1 - g.x0), Y = I => g.y0 - I / 1.1 * (g.y0 - g.y1);
            for (let U = -4; U <= 3; U++) { c.strokeStyle = U ? 'rgba(148,163,184,.1)' : 'rgba(148,163,184,.4)'; c.beginPath(); c.moveTo(X(U), g.y0); c.lineTo(X(U), g.y1); c.stroke(); label(c, String(U), X(U), g.y0 + 9, '#64748b', F(500, 9, true), 'center'); }
            c.strokeStyle = '#7dd3fc'; c.lineWidth = 2; c.beginPath();
            for (let k = 0; k <= 200; k++) { const U = U0 + (U1 - U0) * k / 200, y = Y(current(U)); k ? c.lineTo(X(U), y) : c.moveTo(X(U), y); }
            c.stroke();
            if (Kmax() > 0) { const x = X(-Kmax()); c.strokeStyle = 'rgba(248,113,113,.7)'; c.setLineDash([3, 3]); c.beginPath(); c.moveTo(x, g.y0); c.lineTo(x, g.y1); c.stroke(); c.setLineDash([]); label(c, '−V₀', x, g.y1 + 2, '#f87171', F(700, 10), 'center'); }
            c.fillStyle = '#fde047'; c.beginPath(); c.arc(X(st.U), Y(current(st.U)), 5, 0, TAU); c.fill();
        }
        function readout() {
            const f = 2.998e17 / st.lam, fc = phi() / 4.1357e-15;
            S('lv').textContent = nf(st.lam) + ' nm'; S('iv').textContent = nf(st.I * 100) + '%'; S('uv').textContent = (st.U > 0 ? '+' : '') + nf(st.U, 2) + ' V';
            $('#fe-out', root).innerHTML =
                cell('Energia de cada fóton', nf(Eph(), 2) + ' eV') + cell('Função trabalho φ', nf(phi(), 1) + ' eV') +
                cell('Frequência', sci(f, 3) + ' Hz') + cell('Frequência de corte', sci(fc, 3) + ' Hz') +
                cell('Energia cinética máxima', Kmax() > 0 ? nf(Kmax(), 2) + ' eV' : 'não há emissão') + cell('Tensão de freamento V₀', Kmax() > 0 ? nf(Kmax(), 2) + ' V' : '—') +
                cell('Corrente (relativa)', nf(current(st.U) * 100, 0) + '%', true);
        }
        const anim = animator(cv, dt => { step(dt); draw(); });
        S('m').addEventListener('change', () => { st.m = +S('m').value; draw(); });
        S('l').addEventListener('input', () => { st.lam = +S('l').value; draw(); });
        S('i').addEventListener('input', () => { st.I = +S('i').value / 100; draw(); });
        S('u').addEventListener('input', () => { st.U = +S('u').value; draw(); });
        S('stop').addEventListener('click', () => { st.U = -Math.min(4, Kmax()); S('u').value = st.U; draw(); });
        if (window.ResizeObserver) new ResizeObserver(() => draw()).observe(cv);
        anim.start();
        return () => { draw(); anim.kick(); };
    }

    /* =====================================================================
       3. ÁTOMO DE HIDROGÊNIO E ESPECTROS (modelo de Bohr, íons com um elétron)
       ===================================================================== */
    function initEspectros(root) {
        const NMAX = 6, SERIES = { 1: 'Lyman', 2: 'Balmer', 3: 'Paschen', 4: 'Brackett', 5: 'Pfund' };
        root.innerHTML =
            '<div class="lab-grid">' +
              '<div class="lab-stage tall"><canvas id="sp-cv" aria-label="Átomo, níveis de energia e espectro"></canvas></div>' +
              '<div class="lab-side">' +
                '<div class="ctl"><label for="sp-z">Átomo</label><select id="sp-z"><option value="1">hidrogênio (H)</option><option value="2">hélio ionizado (He⁺)</option><option value="3">lítio duplamente ionizado (Li²⁺)</option></select></div>' +
                '<div class="ctl"><label>Espectro</label>' + seg('sp-mode', [['em', 'emissão (gás quente)'], ['ab', 'absorção (luz atravessando o gás)']], 'em') + '</div>' +
                '<div style="display:flex;gap:6px;flex-wrap:wrap"><button class="btn small primary" id="sp-heat" type="button"><i class="fa-solid fa-fire"></i> Aquecer o gás</button><button class="btn small" id="sp-clear" type="button"><i class="fa-solid fa-eraser"></i> Limpar espectro</button></div>' +
                '<p class="muted-p" style="font-size:.82rem;margin:4px 0 0">Clique num nível de energia (no diagrama do meio) para levar o elétron até ele.</p>' +
                '<div class="readout" id="sp-out"></div>' +
              '</div>' +
            '</div>' +
            '<div class="lab-under">' +
              '<div class="lab-note"><strong>Leitura.</strong> À esquerda, o átomo com as órbitas de Bohr (raios fora de escala). No meio, os níveis de energia, Eₙ = −13,6·Z²/n² eV: cada seta é um salto, e cada salto para baixo emite um fóton com a energia da diferença. Embaixo, o espectro visível e, abaixo dele, o espectro completo em escala logarítmica, do ultravioleta ao infravermelho, com as séries.</div>' +
              '<div class="lab-note"><strong>Experimente.</strong> Leve o elétron ao nível 3 e veja-o descer: pelo caminho 3 → 2 → 1, sai a linha vermelha H-alfa e uma ultravioleta. Aqueça o gás e espere as quatro linhas de Balmer aparecerem. Mude para absorção: as mesmas cores somem do arco-íris. Troque para He⁺: as energias ficam 4 vezes maiores e as linhas se deslocam para o azul e o ultravioleta.</div>' +
            '</div>';
        const S = k => $('#sp-' + k, root), cv = S('cv');
        const st = { Z: 1, n: 1, mode: 'em', heat: false, lines: {}, jumps: [], photons: [], last: null, queue: [], wait: 0, ex: 0, eAng: 0 };
        const E = n => -13.6 * st.Z * st.Z / (n * n);
        const lamOf = (ni, nf2) => 1239.84 / (E(ni) - E(nf2)); /* ni > nf2 */
        let geo = null;
        function emit(from, to) {
            const lam = lamOf(from, to), key = from + '-' + to;
            if (st.mode === 'em') st.lines[key] = Math.min(1, (st.lines[key] || 0) + 0.25);
            st.photons.push({ lam, a: Math.random() * TAU, r: 0, from, to });
            st.last = { from, to, lam, dE: E(from) - E(to) };
        }
        function excite(target) {
            if (target === st.n) return;
            if (target > st.n) { st.jumps.push({ from: st.n, to: target, t: 0, up: true }); st.last = { from: st.n, to: target, lam: lamOf(target, st.n), dE: E(target) - E(st.n), up: true }; const key = target + '-' + st.n; if (st.mode === 'ab') st.lines[key] = Math.min(1, (st.lines[key] || 0) + 0.25); }
            else { st.jumps.push({ from: st.n, to: target, t: 0 }); emit(st.n, target); }
            st.n = target; st.wait = st.heat ? 0.18 + Math.random() * 0.25 : 0.9 + Math.random() * 0.6;
        }
        function step(dt) {
            st.eAng += dt * 3 / Math.pow(st.n, 1.5);
            st.jumps.forEach(j => { j.t += dt; }); st.jumps = st.jumps.filter(j => j.t < 1.2);
            st.photons.forEach(p => { p.r += dt * 260; }); st.photons = st.photons.filter(p => p.r < 900);
            Object.keys(st.lines).forEach(k => { st.lines[k] *= Math.exp(-dt * (st.heat ? 0.05 : 0.02)); });
            st.wait -= dt;
            if (st.wait <= 0) {
                if (st.n > 1) {
                    /* desce para um nível mais baixo, escolhido ao acaso (saltos maiores um pouco mais prováveis) */
                    const opts = []; for (let k = 1; k < st.n; k++) opts.push([k, 1 + (st.n - k) * 0.6]);
                    let r = Math.random() * opts.reduce((s, o) => s + o[1], 0), pick = opts[0][0];
                    for (const o of opts) { r -= o[1]; if (r <= 0) { pick = o[0]; break; } }
                    excite(pick);
                } else if (st.heat) excite(2 + Math.floor(Math.pow(Math.random(), 1.4) * (NMAX - 1)));
                else st.wait = 0.3;
            }
        }
        function draw() {
            const gg = canvas2d(cv, '#04060d'); if (!gg) return;
            const { c, W, H } = gg, wide = W >= 640;
            const specH = Math.min(175, H * 0.33), top = H - specH;
            const A = wide ? { x: 0, y: 0, w: W * 0.46, h: top } : { x: 0, y: 0, w: W * 0.5, h: top };
            const Lv = wide ? { x: W * 0.46, y: 0, w: W * 0.54, h: top } : { x: W * 0.5, y: 0, w: W * 0.5, h: top };
            geo = { Lv };
            /* átomo */
            const cx = A.x + A.w / 2, cy = A.y + A.h / 2 + 6, Rm = Math.min(A.w, A.h) * 0.44, rad = n => Rm * (0.1 + 0.9 * (n * n - 1) / (NMAX * NMAX - 1));
            for (let n = 1; n <= NMAX; n++) { c.strokeStyle = n === st.n ? 'rgba(125,211,252,.6)' : 'rgba(148,163,184,.18)'; c.lineWidth = n === st.n ? 1.6 : 1; c.beginPath(); c.arc(cx, cy, rad(n), 0, TAU); c.stroke(); if (n <= 4 || W > 700) label(c, 'n=' + n, cx + rad(n) * 0.71 + 2, cy - rad(n) * 0.71, 'rgba(148,163,184,.6)', F(500, 9)); }
            const nuc = c.createRadialGradient(cx, cy, 0, cx, cy, 9); nuc.addColorStop(0, '#fecaca'); nuc.addColorStop(1, '#dc2626'); c.fillStyle = nuc; c.beginPath(); c.arc(cx, cy, 5 + st.Z * 1.5, 0, TAU); c.fill();
            label(c, st.Z === 1 ? 'p⁺' : st.Z + '+', cx, cy + 16 + st.Z, '#fca5a5', F(700, 10), 'center');
            /* elétron: durante um salto, desliza entre as órbitas */
            let rr = rad(st.n); const j = st.jumps[st.jumps.length - 1];
            if (j && j.t < 0.35) rr = lerp(rad(j.from), rad(j.to), smooth(j.t / 0.35));
            const ex = cx + rr * Math.cos(st.eAng), ey = cy + rr * Math.sin(st.eAng);
            const eg = c.createRadialGradient(ex, ey, 0, ex, ey, 10); eg.addColorStop(0, '#e0f2fe'); eg.addColorStop(1, 'rgba(56,189,248,0)'); c.fillStyle = eg; c.beginPath(); c.arc(ex, ey, 10, 0, TAU); c.fill();
            /* fótons emitidos saindo do átomo */
            c.lineWidth = 2;
            st.photons.forEach(p => {
                const col = waveRGB(p.lam), x = cx + p.r * Math.cos(p.a), y = cy + p.r * Math.sin(p.a), ux = Math.cos(p.a), uy = Math.sin(p.a), wl = clamp(p.lam / 60, 2, 18);
                c.strokeStyle = rgba(col.map(v => Math.max(v, 80)), clamp(1 - p.r / 700, 0, 1)); c.beginPath();
                for (let k = 0; k <= 20; k++) { const s2 = -14 + k / 20 * 28, amp = 4 * Math.exp(-s2 * s2 / 60) * Math.sin(TAU * s2 / wl); const px = x + ux * s2 - uy * amp, py = y + uy * s2 + ux * amp; k ? c.lineTo(px, py) : c.moveTo(px, py); }
                c.stroke();
            });
            label(c, 'Átomo (raios fora de escala)', A.x + 10, A.y + 14, '#94a3b8', F(600, 10));
            /* diagrama de níveis */
            const lx0 = Lv.x + 54, lx1 = Lv.x + Lv.w - 16, ly0 = Lv.y + 30, ly1 = Lv.y + Lv.h - 20, Emin = E(1);
            const Y = e => ly0 + (e / Emin) * (ly1 - ly0) * 0.98 + 4;
            c.fillStyle = '#070b16'; c.fillRect(Lv.x, Lv.y, Lv.w, Lv.h);
            label(c, 'Níveis de energia (eV)', Lv.x + 10, Lv.y + 14, '#94a3b8', F(600, 10));
            c.strokeStyle = 'rgba(148,163,184,.3)'; c.setLineDash([3, 4]); c.beginPath(); c.moveTo(lx0, Y(0)); c.lineTo(lx1, Y(0)); c.stroke(); c.setLineDash([]);
            label(c, '0 (elétron livre)', lx1, Y(0) - 8, '#64748b', F(500, 9), 'right');
            geo.levels = [];
            for (let n = 1; n <= NMAX; n++) {
                const y = Y(E(n)); geo.levels.push([n, y]);
                c.strokeStyle = n === st.n ? '#7dd3fc' : 'rgba(226,232,240,.55)'; c.lineWidth = n === st.n ? 3 : 1.5;
                c.beginPath(); c.moveTo(lx0, y); c.lineTo(lx1, y); c.stroke();
                if (n <= 4 || (y - Y(E(n - 1))) < -9) label(c, nf(E(n), 2).replace('-', '−'), lx0 - 6, y, '#94a3b8', F(500, 9, true), 'right');
                if (n <= 3) label(c, 'n = ' + n, lx1, y - 7, '#cbd5e1', F(600, 9), 'right');
            }
            /* setas dos saltos recentes */
            st.jumps.forEach((jj, i) => {
                const x = lx0 + 30 + ((jj.from * 7 + jj.to * 13 + i * 11) % 8) * (lx1 - lx0 - 60) / 8, a = clamp(1.2 - jj.t, 0, 1);
                const col = jj.up ? [253, 224, 71] : waveRGB(lamOf(jj.from, jj.to));
                arrowPx(c, x, Y(E(jj.from)), x, Y(E(jj.to)), rgba(col.map(v => Math.max(v, 90)), a), 2.2);
            });
            const ny = Y(E(st.n)); c.fillStyle = '#e0f2fe'; c.beginPath(); c.arc(lx0 + 14, ny, 5, 0, TAU); c.fill();
            drawSpectrum(c, { x: 0, y: top, w: W, h: specH });
            readout();
        }
        function drawSpectrum(c, R) {
            c.fillStyle = '#05070f'; c.fillRect(R.x, R.y, R.w, R.h);
            const x0 = R.x + 40, x1 = R.x + R.w - 16, h1 = R.h * 0.42, y1 = R.y + 22;
            /* espectro visível */
            const X = l => x0 + (l - 380) / (750 - 380) * (x1 - x0);
            if (st.mode === 'ab') { for (let l = 380; l < 750; l += 1) { c.fillStyle = rgba(waveRGB(l), 0.9); c.fillRect(X(l), y1, (x1 - x0) / 370 + 1, h1); } }
            else { c.fillStyle = '#000'; c.fillRect(x0, y1, x1 - x0, h1); }
            const pairs = []; for (let a = 2; a <= NMAX; a++) for (let b = 1; b < a; b++) pairs.push([a, b]);
            pairs.forEach(([a, b]) => {
                const v = st.lines[a + '-' + b] || 0; if (v < 0.01) return; const l = lamOf(a, b); if (l < 380 || l > 750) return;
                if (st.mode === 'ab') { c.fillStyle = 'rgba(0,0,0,' + clamp(v * 1.6, 0, 0.95) + ')'; c.fillRect(X(l) - 1.5, y1, 3, h1); }
                else { const col = waveRGB(l); c.fillStyle = rgba(col, clamp(v * 1.5, 0, 1)); c.fillRect(X(l) - 1.5, y1, 3, h1); c.fillStyle = rgba(col, clamp(v, 0, 1) * 0.25); c.fillRect(X(l) - 5, y1, 10, h1); }
                if (v > 0.15) label(c, nf(l, 1), X(l), y1 + h1 + 9, '#cbd5e1', F(500, 9, true), 'center');
            });
            label(c, 'visível', R.x + 6, y1 + h1 / 2, '#94a3b8', F(600, 9));
            label(c, '380 nm', x0, y1 - 8, '#64748b', F(500, 9), 'left'); label(c, '750 nm', x1, y1 - 8, '#64748b', F(500, 9), 'right');
            /* espectro completo, escala log */
            const y2 = R.y + R.h - 44, h2 = 14, L0 = Math.log10(8), L1 = Math.log10(8000), XL = l => x0 + (Math.log10(l) - L0) / (L1 - L0) * (x1 - x0);
            c.fillStyle = 'rgba(167,139,250,.12)'; c.fillRect(x0, y2, XL(380) - x0, h2); c.fillStyle = 'rgba(248,113,113,.10)'; c.fillRect(XL(750), y2, x1 - XL(750), h2);
            for (let l = 380; l < 750; l += 4) { c.fillStyle = rgba(waveRGB(l), 0.35); c.fillRect(XL(l), y2, XL(l + 4) - XL(l) + 0.5, h2); }
            pairs.forEach(([a, b]) => { const v = st.lines[a + '-' + b] || 0; const l = lamOf(a, b); const x = XL(l); c.fillStyle = v > 0.01 ? rgba(waveRGB(l).map(q => Math.max(q, 120)), clamp(0.3 + v, 0, 1)) : 'rgba(148,163,184,.25)'; c.fillRect(x - 0.75, y2 - (v > 0.01 ? 3 : 0), 1.5, h2 + (v > 0.01 ? 6 : 0)); });
            [10, 100, 1000].forEach(l => label(c, nf(l) + ' nm', XL(l), y2 + h2 + 9, '#64748b', F(500, 9), 'center'));
            label(c, 'ultravioleta', (x0 + XL(380)) / 2, y2 - 7, '#a78bfa', F(600, 9), 'center'); label(c, 'infravermelho', (XL(750) + x1) / 2, y2 - 7, '#f87171', F(600, 9), 'center');
            [[1, 'Lyman'], [2, 'Balmer'], [3, 'Paschen']].forEach(([n0, nm]) => { const l = lamOf(NMAX, n0), l2 = lamOf(n0 + 1, n0); const xm = (XL(l) + XL(l2)) / 2; if (xm > x0 && xm < x1) label(c, nm, xm, y2 + h2 + 20, '#cbd5e1', F(600, 9), 'center'); });
        }
        function readout() {
            const L = st.last, ser = L ? SERIES[Math.min(L.from, L.to)] : null;
            $('#sp-out', root).innerHTML =
                cell('Nível atual', 'n = ' + st.n + ' · ' + nf(E(st.n), 2).replace('-', '−') + ' eV') + cell('Energia de ionização', nf(-E(1), 1) + ' eV') +
                cell('Último salto', L ? (L.up ? 'absorveu: ' : 'emitiu: ') + L.from + ' → ' + L.to : '—') + cell('Série', ser || '—') +
                cell('Energia do fóton', L ? nf(Math.abs(L.dE), 2) + ' eV' : '—') + cell('Comprimento de onda', L ? nf(L.lam, 1) + ' nm' + (L.lam < 380 ? ' (UV)' : L.lam > 750 ? ' (IV)' : '') : '—');
        }
        const anim = animator(cv, dt => { step(dt); draw(); });
        S('z').addEventListener('change', () => { st.Z = +S('z').value; st.lines = {}; st.last = null; draw(); });
        root.querySelectorAll('input[name="sp-mode"]').forEach(el => el.addEventListener('change', () => { st.mode = radio(root, 'sp-mode'); st.lines = {}; draw(); }));
        S('heat').addEventListener('click', () => { st.heat = !st.heat; S('heat').innerHTML = st.heat ? '<i class="fa-solid fa-snowflake"></i> Parar de aquecer' : '<i class="fa-solid fa-fire"></i> Aquecer o gás'; });
        S('clear').addEventListener('click', () => { st.lines = {}; draw(); });
        cv.addEventListener('click', e => {
            if (!geo || !geo.levels) return;
            const r = cv.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
            if (x < geo.Lv.x) return;
            let best = null, bd = 14; geo.levels.forEach(([n, ly]) => { const d = Math.abs(ly - y); if (d < bd) { bd = d; best = n; } });
            if (best) excite(best);
        });
        if (window.ResizeObserver) new ResizeObserver(() => draw()).observe(cv);
        anim.start();
        return () => { draw(); anim.kick(); };
    }

    /* =====================================================================
       4. DUPLA FENDA, PARTÍCULA POR PARTÍCULA
       ===================================================================== */
    const QPART = [
        { id: 'luz', n: 'fótons (luz)', sl: 'Cor da luz', min: 400, max: 700, def: 550, ref: 550, d: 0.25e-3, L: 1, unit: v => nf(v) + ' nm', lam: v => v * 1e-9 },
        { id: 'el', n: 'elétrons', sl: 'Tensão de aceleração', min: 1, max: 100, def: 50, ref: 50, d: 1e-6, L: 1.5, unit: v => nf(v) + ' kV', lam: v => 1.2264e-9 / Math.sqrt(v * 1e3 * (1 + 0.978e-6 * v * 1e3)) },
        { id: 'c60', n: 'moléculas de C₆₀ (60 átomos)', sl: 'Velocidade das moléculas', min: 100, max: 300, def: 200, ref: 200, d: 100e-9, L: 1.25, unit: v => nf(v) + ' m/s', lam: v => 6.626e-34 / (1.197e-24 * v) },
        { id: 'bola', n: 'bolas de tênis', sl: 'Velocidade da bola', min: 10, max: 50, def: 30, ref: 30, d: 1, L: 10, unit: v => nf(v) + ' m/s', lam: v => 6.626e-34 / (0.057 * v) }
    ];
    function initFenda(root) {
        root.innerHTML =
            '<div class="lab-grid">' +
              '<div class="lab-stage tall"><canvas id="df-cv" aria-label="Experimento da dupla fenda"></canvas></div>' +
              '<div class="lab-side">' +
                '<div class="ctl"><label for="df-p">O que atirar</label><select id="df-p">' + QPART.map((p, i) => '<option value="' + i + '"' + (i === 1 ? ' selected' : '') + '>' + p.n + '</option>').join('') + '</select></div>' +
                '<div class="ctl"><label for="df-e"><span id="df-el"></span> <b id="df-ev"></b></label><input id="df-e" type="range" min="0" max="1000" value="500"></div>' +
                '<div class="ctl"><label for="df-d">Separação das fendas <b id="df-dv"></b></label><input id="df-d" type="range" min="50" max="200" value="100"></div>' +
                '<div class="ctl"><label for="df-r">Partículas por segundo <b id="df-rv"></b></label><input id="df-r" type="range" min="0" max="1000" value="380"></div>' +
                '<div class="ctl seg" style="flex-wrap:wrap;gap:6px 12px;font-size:.84rem"><label><input type="checkbox" id="df-det"> detector nas fendas</label><label><input type="checkbox" id="df-one"> fechar uma fenda</label><label><input type="checkbox" id="df-wave"> mostrar a onda</label><label><input type="checkbox" id="df-th"> curva teórica</label></div>' +
                '<div style="display:flex;gap:6px;flex-wrap:wrap"><button class="btn small primary" id="df-play" type="button"><i class="fa-solid fa-pause"></i> Pausar</button><button class="btn small" id="df-burst" type="button">+ 2 000</button><button class="btn small" id="df-clear" type="button"><i class="fa-solid fa-eraser"></i> Limpar tela</button></div>' +
                '<div class="readout" id="df-out"></div>' +
              '</div>' +
            '</div>' +
            '<div class="lab-under">' +
              '<div class="lab-note"><strong>Leitura.</strong> A fonte, à esquerda, dispara uma partícula de cada vez. Cada uma chega à tela num único ponto; o histograma à direita conta as chegadas. A posição de cada ponto é aleatória, mas a distribuição segue o padrão de interferência de uma onda que passa pelas duas fendas. As distâncias da tela estão ampliadas: os valores reais estão no painel.</div>' +
              '<div class="lab-note"><strong>Experimente.</strong> Comece devagar e veja os pontos parecerem aleatórios; depois acelere. Ligue o detector nas fendas: sabendo por onde cada elétron passou, as franjas somem. Feche uma fenda. Troque para bolas de tênis: o comprimento de onda é tão pequeno que só sobram duas faixas, como esperaríamos de bolinhas.</div>' +
            '</div>';
        const S = k => $('#df-' + k, root), cv = S('cv');
        const st = { p: 1, val: 50, dk: 1, rate: 60, playing: true, hits: [], flights: [], acc: 0, bins: new Float32Array(160), n: 0, wphase: 0 };
        const P = () => QPART[st.p];
        const rateOf = v => v === 0 ? 0 : Math.round(Math.pow(10, v / 1000 * 3)); /* 1 a 1000 por segundo */
        let geo = null;
        function layout(W, H) {
            const sx = W * 0.07, bx = W * 0.4, scx = W * 0.82, cy = H * 0.5, hs = H * 0.86;
            const dpx = 38 * st.dk, apx = 8, lam = P().lam(st.val), lref = P().lam(P().ref);
            const fringe = st.p === 3 ? 0 : 24 * (lam / lref) / st.dk; /* espaçamento das franjas na tela (px) */
            return { sx, bx, scx, cy, hs, dpx, apx, fringe, Lpx: scx - bx, W, H };
        }
        /* intensidade relativa na tela, na altura y (px, a partir do centro) */
        function intensity(y, g) {
            const det = S('det').checked, one = S('one').checked;
            if (st.p === 3) { /* bolinhas: duas faixas em linha reta a partir da fonte */
                const k = (g.scx - g.sx) / (g.bx - g.sx), s = 7 * k, c1 = g.dpx / 2 * k;
                const b1 = Math.exp(-Math.pow((y + c1) / s, 2)), b2 = one ? 0 : Math.exp(-Math.pow((y - c1) / s, 2));
                return b1 + b2;
            }
            const lampx = g.fringe * g.dpx / g.Lpx, slit = yy => { const u = Math.PI * g.apx * (y - yy) / (lampx * g.Lpx) * 0.55; return u === 0 ? 1 : Math.sin(u) / u; };
            const y1 = -g.dpx / 2, y2 = g.dpx / 2;
            const r1 = Math.hypot(g.Lpx, y - y1), r2 = Math.hypot(g.Lpx, y - y2), k = TAU / lampx;
            const A1 = slit(y1), A2 = one ? 0 : slit(y2);
            if (det || one) return A1 * A1 + A2 * A2;
            const ph = k * (r1 - r2);
            return A1 * A1 + A2 * A2 + 2 * A1 * A2 * Math.cos(ph);
        }
        let imax = 1, cacheKey = '';
        function prep(g) {
            const key = [st.p, st.val, st.dk, S('det').checked, S('one').checked, g.W, g.H].join('|');
            if (key === cacheKey) return; cacheKey = key;
            imax = 0; for (let k = 0; k <= 600; k++) imax = Math.max(imax, intensity(-g.hs / 2 + k / 600 * g.hs, g));
        }
        function sampleY(g) {
            for (let k = 0; k < 400; k++) { const y = (Math.random() - 0.5) * g.hs; if (Math.random() * imax <= intensity(y, g)) return y; }
            return 0;
        }
        function addHit(y, g) {
            st.hits.push({ y, x: (Math.random() - 0.5) * 4, age: 0 }); if (st.hits.length > 20000) st.hits.splice(0, 5000);
            const b = Math.floor((y + g.hs / 2) / g.hs * st.bins.length); if (b >= 0 && b < st.bins.length) st.bins[b]++;
            st.n++;
        }
        function fire(g, animate) {
            const y = sampleY(g);
            if (!animate) { addHit(y, g); return; }
            const slit = S('det').checked || st.p === 3 ? (S('one').checked ? -1 : (Math.random() < 0.5 ? -1 : 1)) : 0;
            st.flights.push({ y, t: 0, slit });
        }
        function step(dt) {
            const g = geo; if (!g) return;
            prep(g); st.wphase += dt * 3;
            if (st.playing) {
                st.acc += dt * st.rate;
                const animate = st.rate <= 40;
                while (st.acc >= 1) { st.acc -= 1; fire(g, animate || Math.random() < 30 / st.rate); }
            }
            st.flights.forEach(f => { f.t += dt; });
            st.flights = st.flights.filter(f => { if (f.t >= 1) { addHit(f.y, g); return false; } return true; });
            st.hits.forEach(h => { h.age += dt; });
        }
        function draw() {
            const gg = canvas2d(cv, '#03050c'); if (!gg) return;
            const { c, W, H } = gg, g = geo = layout(W, H); prep(g);
            const det = S('det').checked, one = S('one').checked, col = st.p === 0 ? waveRGB(st.val) : st.p === 1 ? [125, 211, 252] : st.p === 2 ? [134, 239, 172] : [190, 242, 100];
            /* ondas */
            if (S('wave').checked && st.p !== 3) {
                const lw = Math.max(6, g.fringe * g.dpx / g.Lpx);
                c.save(); c.globalCompositeOperation = 'lighter'; c.lineWidth = Math.max(1.5, lw * 0.25);
                for (let r = (st.wphase * lw) % lw; r < g.bx - g.sx; r += lw) { c.strokeStyle = rgba(col, 0.18 * (1 - r / (g.bx - g.sx))); c.beginPath(); c.arc(g.sx, g.cy, r, -0.5, 0.5); c.stroke(); }
                const sl = one ? [-g.dpx / 2] : [-g.dpx / 2, g.dpx / 2];
                c.beginPath(); c.rect(g.bx, 0, g.scx - g.bx, H); c.clip();
                sl.forEach(yy => { for (let r = (st.wphase * lw) % lw; r < g.Lpx * 1.4; r += lw) { c.strokeStyle = rgba(col, 0.2 * (1 - r / (g.Lpx * 1.45))); c.beginPath(); c.arc(g.bx, g.cy + yy, r, -1.4, 1.4); c.stroke(); } });
                c.restore();
            }
            /* fonte */
            c.fillStyle = '#334155'; c.fillRect(g.sx - 18, g.cy - 14, 22, 28); c.fillStyle = rgba(col); c.fillRect(g.sx + 4, g.cy - 3, 6, 6);
            label(c, 'fonte', g.sx - 7, g.cy + 26, '#94a3b8', F(600, 10), 'center');
            /* barreira com fendas */
            c.fillStyle = '#475569';
            const s1 = g.cy - g.dpx / 2, s2 = g.cy + g.dpx / 2, hw = g.apx / 2;
            c.fillRect(g.bx - 3, 0, 6, s1 - hw); c.fillRect(g.bx - 3, s1 + hw, 6, s2 - s1 - 2 * hw); c.fillRect(g.bx - 3, s2 + hw, 6, H - s2 - hw);
            if (one) c.fillRect(g.bx - 3, s2 - hw, 6, 2 * hw);
            if (det) { [s1, s2].forEach((yy, i) => { if (one && i === 1) return; c.strokeStyle = '#fbbf24'; c.lineWidth = 1.5; c.beginPath(); c.arc(g.bx + 12, yy, 6, 0, TAU); c.stroke(); }); label(c, 'detector', g.bx + 22, s1 - 12, '#fbbf24', F(600, 10)); }
            /* tela e histograma */
            c.fillStyle = '#0b1020'; c.fillRect(g.scx - 4, g.cy - g.hs / 2, 8, g.hs);
            c.globalCompositeOperation = 'lighter';
            const nshow = Math.min(st.hits.length, 9000);
            for (let i = st.hits.length - nshow; i < st.hits.length; i++) {
                const h = st.hits[i], fresh = h.age < 0.4;
                c.fillStyle = rgba(col, fresh ? 1 : 0.55); const s = fresh ? 3 : 1.6;
                c.fillRect(g.scx + h.x - s / 2, g.cy + h.y - s / 2, s, s);
                if (fresh) { const gr = c.createRadialGradient(g.scx + h.x, g.cy + h.y, 0, g.scx + h.x, g.cy + h.y, 10); gr.addColorStop(0, rgba(col, 0.6 * (1 - h.age / 0.4))); gr.addColorStop(1, rgba(col, 0)); c.fillStyle = gr; c.beginPath(); c.arc(g.scx + h.x, g.cy + h.y, 10, 0, TAU); c.fill(); }
            }
            c.globalCompositeOperation = 'source-over';
            const hx0 = g.scx + 10, hw2 = W - hx0 - 8, bmax = Math.max(1, ...st.bins), bh = g.hs / st.bins.length;
            c.fillStyle = rgba(col, 0.55);
            for (let b = 0; b < st.bins.length; b++) { const w = st.bins[b] / bmax * hw2; if (w > 0) c.fillRect(hx0, g.cy - g.hs / 2 + b * bh, w, bh - 0.5); }
            if (S('th').checked) {
                c.strokeStyle = '#fde047'; c.lineWidth = 1.5; c.beginPath();
                for (let k = 0; k <= 300; k++) { const y = -g.hs / 2 + k / 300 * g.hs, v = intensity(y, g) / imax; const x = hx0 + v * hw2; k ? c.lineTo(x, g.cy + y) : c.moveTo(x, g.cy + y); }
                c.stroke();
            }
            label(c, 'tela', g.scx, g.cy - g.hs / 2 - 8, '#94a3b8', F(600, 10), 'center');
            /* partículas em voo */
            st.flights.forEach(f => {
                let x, y, a = 1;
                if (f.t < 0.45) { const u = f.t / 0.45; x = lerp(g.sx + 6, g.bx, u); y = g.cy + (f.slit ? f.slit * g.dpx / 2 * u : 0); }
                else if (f.slit) { const u = (f.t - 0.45) / 0.55; x = lerp(g.bx, g.scx, u); y = g.cy + lerp(f.slit * g.dpx / 2, f.y, u); if (det && f.t < 0.6) { c.fillStyle = 'rgba(251,191,36,.8)'; c.beginPath(); c.arc(g.bx + 12, g.cy + f.slit * g.dpx / 2, 7, 0, TAU); c.fill(); } }
                else { const u = (f.t - 0.45) / 0.55; a = 1 - u; c.strokeStyle = rgba(col, 0.5 * a); c.lineWidth = 1.2; (one ? [-1] : [-1, 1]).forEach(sg => { c.beginPath(); c.arc(g.bx, g.cy + sg * g.dpx / 2, u * g.Lpx, -1.2, 1.2); c.stroke(); }); return; }
                const gr = c.createRadialGradient(x, y, 0, x, y, 7); gr.addColorStop(0, rgba(col, a)); gr.addColorStop(1, rgba(col, 0)); c.fillStyle = gr; c.beginPath(); c.arc(x, y, 7, 0, TAU); c.fill();
            });
            label(c, nf(st.n) + ' partículas detectadas', 12, 16, '#e2e8f0', F(700, 12));
            if (st.p === 3) label(c, 'comprimento de onda pequeno demais: nenhuma franja', 12, 34, '#fca5a5', F(600, 11));
            readout();
        }
        function readout() {
            const p = P(), lam = p.lam(st.val), d = p.d * st.dk, dy = lam * p.L / d;
            S('el').textContent = p.sl; S('ev').textContent = p.unit(st.val); S('dv').textContent = nf(st.dk, 2) + '×'; S('rv').textContent = nf(st.rate);
            const len = m => m >= 1 ? nf(m, 2) + ' m' : m >= 1e-3 ? nf(m * 1e3, 2) + ' mm' : m >= 1e-6 ? nf(m * 1e6, 2) + ' µm' : m >= 1e-9 ? nf(m * 1e9, 2) + ' nm' : m >= 1e-12 ? nf(m * 1e12, 2) + ' pm' : sci(m, 2) + ' m';
            $('#df-out', root).innerHTML =
                cell('Comprimento de onda', len(lam)) + cell('Separação das fendas', len(d)) +
                cell('Distância até a tela', len(p.L)) + cell('Espaçamento das franjas (real)', len(dy)) +
                cell('Padrão', st.p === 3 ? 'duas faixas, sem interferência' : S('det').checked ? 'sem franjas: o caminho é conhecido' : S('one').checked ? 'uma fenda: só difração' : 'franjas de interferência', true);
        }
        function setP(i) {
            st.p = i; const p = P(); S('e').value = Math.round((p.def - p.min) / (p.max - p.min) * 1000); st.val = p.def; clear();
        }
        function clear() { st.hits = []; st.flights = []; st.bins.fill(0); st.n = 0; draw(); }
        const anim = animator(cv, dt => { step(dt); draw(); });
        S('p').addEventListener('change', () => setP(+S('p').value));
        S('e').addEventListener('input', () => { const p = P(); st.val = Math.round(p.min + (+S('e').value / 1000) * (p.max - p.min)); clear(); });
        S('d').addEventListener('input', () => { st.dk = +S('d').value / 100; clear(); });
        S('r').addEventListener('input', () => { st.rate = rateOf(+S('r').value); draw(); });
        ['det', 'one'].forEach(k => S(k).addEventListener('change', clear));
        ['wave', 'th'].forEach(k => S(k).addEventListener('change', draw));
        S('play').addEventListener('click', () => { st.playing = !st.playing; S('play').innerHTML = st.playing ? '<i class="fa-solid fa-pause"></i> Pausar' : '<i class="fa-solid fa-play"></i> Disparar'; });
        S('burst').addEventListener('click', () => { if (!geo) return; prep(geo); for (let k = 0; k < 2000; k++) fire(geo, false); draw(); });
        S('clear').addEventListener('click', clear);
        if (window.ResizeObserver) new ResizeObserver(() => { cacheKey = ''; draw(); }).observe(cv);
        st.rate = rateOf(+S('r').value); setP(1); anim.start();
        return () => { draw(); anim.kick(); };
    }

    /* =====================================================================
       5. MECÂNICA QUÂNTICA: equação de Schrödinger em 1D (ħ = m = 1)
       Barreira e oscilador: integração numérica pelo método de Visscher (partes real e imaginária defasadas).
       Caixa: solução exata como soma de autoestados.
       ===================================================================== */
    function initQuantica(root) {
        root.innerHTML =
            '<div class="lab-grid">' +
              '<div class="lab-stage tall"><canvas id="qm-cv" aria-label="Função de onda evoluindo no tempo"></canvas></div>' +
              '<div class="lab-side">' +
                '<div class="ctl"><label>Situação</label>' + seg('qm-mode', [['bar', 'barreira (tunelamento)'], ['box', 'partícula na caixa'], ['osc', 'oscilador harmônico']], 'bar') + '</div>' +
                '<div id="qm-pbar">' +
                  '<div class="ctl"><label for="qm-e">Energia do pacote <b id="qm-ev"></b></label><input id="qm-e" type="range" min="0.5" max="4" step="0.05" value="2"></div>' +
                  '<div class="ctl"><label for="qm-v">Altura da barreira (× energia do pacote) <b id="qm-vv"></b></label><input id="qm-v" type="range" min="-1" max="2" step="0.05" value="1.3"></div>' +
                  '<div class="ctl"><label for="qm-w">Largura da barreira <b id="qm-wv"></b></label><input id="qm-w" type="range" min="0.5" max="10" step="0.25" value="2"></div>' +
                '</div>' +
                '<div id="qm-pbox" hidden>' +
                  '<div class="ctl"><label>Amplitude de cada estado</label>' + [1, 2, 3, 4].map(n => '<div style="display:flex;align-items:center;gap:8px"><span style="width:28px;font-size:.82rem">n=' + n + '</span><input id="qm-c' + n + '" type="range" min="0" max="100" value="' + (n === 1 ? 100 : n === 2 ? 70 : 0) + '" style="flex:1"></div>').join('') + '</div>' +
                  '<button class="btn small" id="qm-measure" type="button"><i class="fa-solid fa-crosshairs"></i> Medir a posição</button>' +
                '</div>' +
                '<div id="qm-posc" hidden>' +
                  '<div class="ctl"><label for="qm-x0">Deslocamento inicial <b id="qm-x0v"></b></label><input id="qm-x0" type="range" min="0" max="40" step="1" value="25"></div>' +
                  '<div class="ctl"><label for="qm-sq">Largura inicial (× estado fundamental) <b id="qm-sqv"></b></label><input id="qm-sq" type="range" min="0.4" max="2.5" step="0.05" value="1"></div>' +
                '</div>' +
                '<div class="ctl seg" style="flex-wrap:wrap;gap:6px 12px;font-size:.84rem"><label><input type="checkbox" id="qm-re"> parte real de ψ</label><label><input type="checkbox" id="qm-ph" checked> cor = fase</label></div>' +
                '<div style="display:flex;gap:6px;flex-wrap:wrap"><button class="btn small primary" id="qm-go" type="button"><i class="fa-solid fa-play"></i> Lançar</button><button class="btn small" id="qm-pause" type="button"><i class="fa-solid fa-pause"></i></button></div>' +
                '<div class="readout" id="qm-out"></div>' +
              '</div>' +
            '</div>' +
            '<div class="lab-under">' +
              '<div class="lab-note"><strong>Leitura.</strong> A área colorida é a densidade de probabilidade |ψ|²: onde ela é alta, é mais provável encontrar a partícula. A cor indica a fase de ψ (quando a opção está ligada): as listras coloridas que correm são a onda andando. Em cinza, a energia potencial; a linha tracejada é a energia média do pacote. A equação é resolvida ao vivo, passo a passo.</div>' +
              '<div class="lab-note"><strong>Experimente.</strong> Com a barreira mais alta que a energia, parte do pacote atravessa: é o tunelamento. Dobre a largura e veja a parte transmitida despencar. Ponha a barreira negativa (um poço): parte reflete mesmo assim, o que uma bolinha nunca faria. Na caixa, misture os estados 1 e 2 e veja a probabilidade balançar; depois meça a posição. No oscilador, o pacote vai e volta sem se espalhar.</div>' +
            '</div>';
        const S = k => $('#qm-' + k, root), cv = S('cv');
        const N = 1024, DX = 0.25, X0 = 0, XL = N * DX, XC = XL / 2;
        const R = new Float64Array(N), I = new Float64Array(N), V = new Float64Array(N), mask = new Float64Array(N);
        const st = { mode: 'bar', run: false, paused: false, t: 0, dt: 0.01, absL: 0, absR: 0, norm0: 1, peak: 0.1, E: 2, V0: 2.6, w: 2, box: { c: [1, 0.7, 0, 0], coll: null, t: 0, slow: 1 }, steps: 0 };
        const xAt = i => X0 + i * DX;
        function setPotential() {
            V.fill(0); mask.fill(1);
            if (st.mode === 'bar') {
                for (let i = 0; i < N; i++) if (Math.abs(xAt(i) - XC) < st.w / 2) V[i] = st.V0;
                const edge = 30; for (let i = 0; i < N; i++) { const x = xAt(i), d = Math.max(0, edge - x, x - (XL - edge)); mask[i] = 1 - 0.004 * (d / edge) * (d / edge); }
            } else if (st.mode === 'osc') { const w = 0.08; for (let i = 0; i < N; i++) { const u = xAt(i) - XC; V[i] = 0.5 * w * w * u * u; } }
            let vmax = 0; for (let i = 0; i < N; i++) vmax = Math.max(vmax, Math.abs(V[i]));
            st.dt = 0.45 / (2 / (DX * DX) + vmax);
        }
        function packet(x0, sig, k0) {
            let s = 0;
            for (let i = 0; i < N; i++) { const u = xAt(i) - x0, a = Math.exp(-u * u / (4 * sig * sig)); R[i] = a * Math.cos(k0 * u); I[i] = a * Math.sin(k0 * u); s += (R[i] * R[i] + I[i] * I[i]) * DX; }
            const n = 1 / Math.sqrt(s); for (let i = 0; i < N; i++) { R[i] *= n; I[i] *= n; }
            /* meio passo para defasar a parte imaginária (Visscher) */
            hstep(true, st.dt / 2);
            st.norm0 = 1; st.absL = st.absR = 0; st.t = 0;
            let mx = 0; for (let i = 0; i < N; i++) mx = Math.max(mx, R[i] * R[i] + I[i] * I[i]); st.peak = mx;
        }
        function hstep(onlyI, dt) {
            const k = 0.5 / (DX * DX);
            if (!onlyI) for (let i = 1; i < N - 1; i++) R[i] += dt * (-k * (I[i + 1] - 2 * I[i] + I[i - 1]) + V[i] * I[i]);
            for (let i = 1; i < N - 1; i++) I[i] -= dt * (-k * (R[i + 1] - 2 * R[i] + R[i - 1]) + V[i] * R[i]);
        }
        function evolve(n) {
            for (let s = 0; s < n; s++) {
                hstep(false, st.dt);
                if (st.mode === 'bar') {
                    for (let i = 0; i < N; i++) {
                        if (mask[i] < 1) { const before = R[i] * R[i] + I[i] * I[i]; R[i] *= mask[i]; I[i] *= mask[i]; const lost = (before - (R[i] * R[i] + I[i] * I[i])) * DX; if (i < N / 2) st.absL += lost; else st.absR += lost; }
                    }
                }
                st.t += st.dt;
            }
        }
        function startBar() { st.E = +S('e').value; st.V0 = +S('v').value * st.E; st.w = +S('w').value; setPotential(); packet(XC - 55, 7, Math.sqrt(2 * st.E)); st.run = true; }
        function startOsc() { setPotential(); const w = 0.08, sig = Math.sqrt(1 / (2 * w)) * +S('sq').value; packet(XC - +S('x0').value, sig, 0); st.run = true; }
        /* ---- caixa: autoestados exatos ---- */
        const BL = 100, E1 = Math.PI * Math.PI / (2 * BL * BL), NM = 80;
        const boxPeriod = TAU / (3 * E1); /* período de oscilação de ψ1 + ψ2 */
        function boxCoeffs() {
            if (st.box.coll) return st.box.coll;
            const c = [1, 2, 3, 4].map(n => +S('c' + n).value / 100); const s = Math.sqrt(c.reduce((a, b) => a + b * b, 0)) || 1;
            return c.map(v => [v / s, 0]);
        }
        function boxPsi(x, t) { /* x em [0, BL] */
            const cs = boxCoeffs(); let re = 0, im = 0;
            for (let n = 1; n <= cs.length; n++) {
                const [a, b] = cs[n - 1]; if (!a && !b) continue;
                const En = n * n * E1, s = Math.sqrt(2 / BL) * Math.sin(n * Math.PI * x / BL), cph = Math.cos(En * t), sph = -Math.sin(En * t);
                re += s * (a * cph - b * sph); im += s * (a * sph + b * cph);
            }
            return [re, im];
        }
        function measure() {
            const t = st.box.t, M = 400; let acc = [], tot = 0;
            for (let k = 0; k < M; k++) { const x = (k + 0.5) / M * BL, [a, b] = boxPsi(x, t); tot += a * a + b * b; acc.push(tot); }
            const r = Math.random() * tot; let k = acc.findIndex(v => v >= r); if (k < 0) k = M - 1;
            const x0 = (k + 0.5) / M * BL, sig = 1.5, coll = [];
            for (let n = 1; n <= NM; n++) { let s = 0; for (let j = 0; j < M; j++) { const x = (j + 0.5) / M * BL; s += Math.exp(-(x - x0) * (x - x0) / (4 * sig * sig)) * Math.sqrt(2 / BL) * Math.sin(n * Math.PI * x / BL); } coll.push([s, 0]); }
            const nn = Math.sqrt(coll.reduce((a, c) => a + c[0] * c[0], 0)); coll.forEach(c => { c[0] /= nn; });
            st.box.coll = coll; st.box.t = 0; st.box.slow = 1 / 40; st.box.mx = x0;
        }
        function hsl(ph, a) { const h = ((ph / TAU) % 1 + 1) % 1 * 360; return 'hsla(' + h.toFixed(0) + ',85%,60%,' + a + ')'; }
        function draw() {
            const gg = canvas2d(cv, '#04060d'); if (!gg) return;
            const { c, W, H } = gg, ml = 18, mr = st.mode === 'box' ? Math.min(150, W * 0.26) : 18, top = 40, base = H - 40, pw = W - ml - mr;
            const phase = S('ph').checked;
            if (st.mode === 'box') {
                const x0 = ml + 20, x1 = ml + pw - 20, X = x => x0 + x / BL * (x1 - x0), t = st.box.t;
                c.fillStyle = '#334155'; c.fillRect(x0 - 10, top - 10, 10, base - top + 10); c.fillRect(x1, top - 10, 10, base - top + 10);
                c.strokeStyle = 'rgba(148,163,184,.3)'; c.beginPath(); c.moveTo(x0, base); c.lineTo(x1, base); c.stroke();
                const cols = Math.round(x1 - x0), dens = [];
                for (let k = 0; k < cols; k++) { const x = (k + 0.5) / cols * BL, [a, b] = boxPsi(x, t); dens.push([a * a + b * b, Math.atan2(b, a)]); }
                st.box.peak = Math.max(st.box.peak ? st.box.peak * 0.995 : 0, 0.045, ...dens.map(q => q[0]));
                const sc = (base - top) * 0.9 / st.box.peak;
                for (let k = 0; k < cols; k++) {
                    const d = dens[k][0], ph = dens[k][1];
                    c.fillStyle = phase ? hsl(ph, 0.9) : 'rgba(129,140,248,.85)'; c.fillRect(x0 + k, base - Math.min(d * sc, base - top), 1.2, Math.min(d * sc, base - top));
                }
                if (S('re').checked) { c.strokeStyle = 'rgba(255,255,255,.7)'; c.lineWidth = 1.2; c.beginPath(); for (let k = 0; k <= cols; k++) { const x = k / cols * BL, [a] = boxPsi(x, t), y = (base + top) / 2 - a * (base - top) * 1.2; k ? c.lineTo(x0 + k, y) : c.moveTo(x0 + k, y); } c.stroke(); }
                if (st.box.coll && st.box.mx !== undefined && t < 0.04 * boxPeriod) label(c, 'medida: a partícula estava aqui', X(st.box.mx), top + 6, '#fde047', F(700, 11), 'center');
                /* níveis e pesos */
                const lx = W - mr + 14, lw = mr - 26, cs = boxCoeffs(), ly = n => base - (n * n) / 36 * (base - top - 20);
                label(c, 'níveis e pesos |cₙ|²', lx, top - 14, '#94a3b8', F(600, 10));
                for (let n = 1; n <= 6; n++) {
                    const y = ly(n), p = cs[n - 1] ? cs[n - 1][0] * cs[n - 1][0] + cs[n - 1][1] * cs[n - 1][1] : 0;
                    c.strokeStyle = 'rgba(226,232,240,.5)'; c.beginPath(); c.moveTo(lx, y); c.lineTo(lx + lw, y); c.stroke();
                    c.fillStyle = '#818cf8'; c.fillRect(lx, y - 7, p * lw, 6); label(c, 'n=' + n + ' (E = ' + n * n + 'E₁)', lx, y + 8, '#cbd5e1', F(500, 9));
                }
                if (st.box.coll) { let rest = 0; for (let n = 7; n <= NM; n++) rest += st.box.coll[n - 1][0] ** 2; label(c, 'n > 6: ' + nf(rest * 100, 0) + '%', lx, top + 4, '#cbd5e1', F(500, 9)); }
                label(c, 'Partícula numa caixa', ml, 16, '#e2e8f0', F(700, 12));
            } else {
                const X = x => ml + x / XL * pw, sc = (base - top) * 0.85 / st.peak;
                /* potencial */
                const Vsc = st.mode === 'bar' ? (base - top) * 0.4 / Math.max(st.E, 1e-3) : (base - top) * 0.5 / 8;
                c.fillStyle = 'rgba(148,163,184,.22)'; c.strokeStyle = 'rgba(148,163,184,.6)'; c.beginPath(); c.moveTo(X(0), base);
                for (let i = 0; i < N; i += 2) c.lineTo(X(xAt(i)), base - clamp(V[i] * Vsc, -(base - top) * 0.3, base - top));
                c.lineTo(X(XL), base); c.closePath(); c.fill(); c.stroke();
                const Em = st.mode === 'bar' ? st.E : energyNow();
                c.strokeStyle = 'rgba(253,224,71,.6)'; c.setLineDash([6, 5]); c.beginPath(); c.moveTo(X(0), base - Em * Vsc); c.lineTo(X(XL), base - Em * Vsc); c.stroke(); c.setLineDash([]);
                label(c, 'energia do pacote', X(4), base - Em * Vsc - 9, '#fde047', F(600, 10));
                for (let k = 0; k < pw; k++) {
                    const i = Math.min(N - 1, Math.round(k / pw * (N - 1))), d = R[i] * R[i] + I[i] * I[i];
                    const h = Math.min(d * sc, base - top); if (h < 0.3) continue;
                    c.fillStyle = phase ? hsl(Math.atan2(I[i], R[i]), 0.9) : 'rgba(129,140,248,.85)'; c.fillRect(ml + k, base - h, 1.2, h);
                }
                if (S('re').checked) { c.strokeStyle = 'rgba(255,255,255,.7)'; c.lineWidth = 1.1; c.beginPath(); for (let k = 0; k < pw; k++) { const i = Math.min(N - 1, Math.round(k / pw * (N - 1))), y = (base + top) / 2 - R[i] * Math.sqrt(sc) * 6; k ? c.lineTo(ml + k, y) : c.moveTo(ml + k, y); } c.stroke(); }
                if (st.mode === 'bar') {
                    const split = barSplit();
                    label(c, '← refletido: ' + nf(split.r * 100, 1) + '%', ml + 4, top - 6, '#93c5fd', F(700, 12), 'left');
                    label(c, 'transmitido: ' + nf(split.t * 100, 1) + '% →', W - mr - 4, top - 6, '#86efac', F(700, 12), 'right');
                }
                label(c, st.mode === 'bar' ? 'Pacote de onda contra uma barreira' : 'Oscilador harmônico', ml, 16, '#e2e8f0', F(700, 12));
                if (!st.run) label(c, 'Clique em "Lançar"', W / 2, (top + base) / 2, '#94a3b8', F(700, 14), 'center');
            }
            c.strokeStyle = 'rgba(148,163,184,.3)'; c.beginPath(); c.moveTo(ml, base); c.lineTo(W - mr, base); c.stroke();
            label(c, 'posição x', W / 2 - mr / 2, H - 14, '#94a3b8', F(600, 10), 'center');
            readout();
        }
        function barSplit() {
            let l = st.absL, r = st.absR; const cut = Math.round((XC + st.w / 2) / DX);
            for (let i = 0; i < N; i++) { const d = (R[i] * R[i] + I[i] * I[i]) * DX; if (i < cut) l += d; else r += d; }
            const s = l + r || 1; return { r: l / s, t: r / s };
        }
        function energyNow() { /* ⟨H⟩ */
            let e = 0, n = 0; const k = 0.5 / (DX * DX);
            for (let i = 1; i < N - 1; i++) { const lapR = R[i + 1] - 2 * R[i] + R[i - 1], lapI = I[i + 1] - 2 * I[i] + I[i - 1]; e += -k * (R[i] * lapR + I[i] * lapI) + V[i] * (R[i] * R[i] + I[i] * I[i]); n += R[i] * R[i] + I[i] * I[i]; }
            return n ? e / n : 0;
        }
        function theoryT() {
            const E = st.E, V0 = st.V0, w = st.w;
            if (Math.abs(V0) < 1e-9) return 1;
            if (Math.abs(E - V0) < 1e-6) return 1 / (1 + V0 * w * w / 2);
            if (E < V0) { const kk = Math.sqrt(2 * (V0 - E)), sh = Math.sinh(kk * w); return 1 / (1 + V0 * V0 * sh * sh / (4 * E * (V0 - E))); }
            const kk = Math.sqrt(2 * (E - V0)), sn = Math.sin(kk * w); return 1 / (1 + V0 * V0 * sn * sn / (4 * E * (E - V0)));
        }
        function readout() {
            S('ev').textContent = nf(+S('e').value, 2); S('vv').textContent = nf(+S('v').value, 2) + '×'; S('wv').textContent = nf(+S('w').value, 2);
            S('x0v').textContent = S('x0').value; S('sqv').textContent = nf(+S('sq').value, 2) + '×';
            let h = '';
            if (st.mode === 'bar') {
                const sp = barSplit();
                h = cell('Transmitido (simulação)', nf(sp.t * 100, 1) + '%') + cell('Refletido (simulação)', nf(sp.r * 100, 1) + '%') +
                    cell('Transmissão de uma onda com energia exata', nf(theoryT() * 100, 2) + '%', true) +
                    cell('Comparação', st.V0 > st.E ? 'barreira mais alta que a energia: uma bolinha clássica voltaria sempre' : st.V0 < 0 ? 'poço: uma bolinha clássica passaria sempre' : 'energia maior que a barreira: uma bolinha clássica passaria sempre', true);
            } else if (st.mode === 'box') {
                const cs = boxCoeffs(); let e = 0; cs.forEach((q, n) => { e += (q[0] * q[0] + q[1] * q[1]) * (n + 1) * (n + 1); });
                h = cell('Energia média', nf(e, 2) + ' E₁') + cell('Tempo', nf(st.box.t / boxPeriod, 2) + ' períodos de ψ₁+ψ₂') +
                    cell('Estado', st.box.coll ? 'logo após uma medida de posição (câmera lenta)' : cs.filter(q => q[0] > 1e-6).length > 1 ? 'superposição: a densidade oscila' : 'estacionário: a densidade não muda', true);
            } else {
                h = cell('Energia média', nf(energyNow() / 0.08, 2) + ' ħω') + cell('Período clássico', nf(TAU / 0.08, 1) + ' unidades') +
                    cell('Comportamento', Math.abs(+S('sq').value - 1) < 0.03 ? 'estado coerente: o pacote oscila sem mudar de forma' : 'pacote "comprimido": a largura respira duas vezes por período', true);
            }
            $('#qm-out', root).innerHTML = h;
        }
        const anim = animator(cv, dt => {
            if (!st.paused) {
                if (st.mode === 'box') st.box.t += dt * boxPeriod / 4 * st.box.slow;
                else if (st.run) {
                    const perSec = st.mode === 'bar' ? 1400 * Math.sqrt(st.E / 2) : 1700;
                    evolve(Math.max(1, Math.round(dt * perSec)));
                    if (st.mode === 'bar' && st.t > 160 / Math.sqrt(2 * st.E)) st.run = false;
                }
            }
            draw();
        });
        function setMode(m) {
            st.mode = m; S('pbar').hidden = m !== 'bar'; S('pbox').hidden = m !== 'box'; S('posc').hidden = m !== 'osc';
            S('go').hidden = m === 'box'; st.box.coll = null; st.box.slow = 1;
            if (m === 'bar') startBar(); else if (m === 'osc') startOsc(); else { setPotential(); }
            draw();
        }
        root.querySelectorAll('input[name="qm-mode"]').forEach(el => el.addEventListener('change', () => setMode(radio(root, 'qm-mode'))));
        ['e', 'v', 'w'].forEach(k => S(k).addEventListener('input', () => { if (st.mode === 'bar') { startBar(); st.run = false; draw(); } }));
        ['x0', 'sq'].forEach(k => S(k).addEventListener('input', () => { startOsc(); draw(); }));
        [1, 2, 3, 4].forEach(n => S('c' + n).addEventListener('input', () => { st.box.coll = null; st.box.slow = 1; draw(); }));
        S('measure').addEventListener('click', () => { measure(); draw(); });
        S('go').addEventListener('click', () => { if (st.mode === 'bar') startBar(); else startOsc(); st.paused = false; });
        S('pause').addEventListener('click', () => { st.paused = !st.paused; S('pause').innerHTML = st.paused ? '<i class="fa-solid fa-play"></i>' : '<i class="fa-solid fa-pause"></i>'; });
        if (window.ResizeObserver) new ResizeObserver(() => draw()).observe(cv);
        startBar(); anim.start();
        return () => { draw(); anim.kick(); };
    }

    /* =====================================================================
       6. FÍSICA NUCLEAR: decaimento radioativo e reação em cadeia
       ===================================================================== */
    const NUCLIDES = [
        { n: 'Carbono-14 → nitrogênio-14', T: 5730 * 3.156e7, mode: 'β⁻', p: [148, 163, 184], d: [96, 165, 250] },
        { n: 'Iodo-131 → xenônio-131', T: 8.02 * 86400, mode: 'β⁻', p: [167, 139, 250], d: [148, 163, 184] },
        { n: 'Radônio-222 → polônio-218', T: 3.82 * 86400, mode: 'α', p: [251, 146, 60], d: [253, 224, 71] },
        { n: 'Tecnécio-99m → tecnécio-99', T: 6.0 * 3600, mode: 'γ', p: [244, 114, 182], d: [148, 163, 184] },
        { n: 'Cobalto-60 → níquel-60', T: 5.27 * 3.156e7, mode: 'β⁻ e γ', p: [56, 189, 248], d: [134, 239, 172] },
        { n: 'Urânio-238 → tório-234', T: 4.47e9 * 3.156e7, mode: 'α', p: [74, 222, 128], d: [253, 224, 71] }
    ];
    function initNuclear(root) {
        root.innerHTML =
            '<div class="lab-grid">' +
              '<div class="lab-stage tall"><canvas id="nu-cv" aria-label="Simulação nuclear"></canvas></div>' +
              '<div class="lab-side">' +
                '<div class="ctl"><label>Modo</label>' + seg('nu-mode', [['dec', 'decaimento radioativo'], ['chain', 'reação em cadeia']], 'dec') + '</div>' +
                '<div id="nu-pdec">' +
                  '<div class="ctl"><label for="nu-iso">Nuclídeo</label><select id="nu-iso">' + NUCLIDES.map((x, i) => '<option value="' + i + '">' + x.n + '</option>').join('') + '</select></div>' +
                  '<div class="ctl"><label>Número de núcleos</label>' + seg('nu-n', [['100', '100'], ['400', '400'], ['2500', '2 500']], '400') + '</div>' +
                '</div>' +
                '<div id="nu-pch" hidden>' +
                  '<div class="ctl"><label for="nu-den">Quantidade de urânio-235 <b id="nu-denv"></b></label><input id="nu-den" type="range" min="10" max="100" value="55"></div>' +
                  '<div class="ctl"><label for="nu-rod">Barras de controle inseridas <b id="nu-rodv"></b></label><input id="nu-rod" type="range" min="0" max="100" value="0"></div>' +
                  '<button class="btn small primary" id="nu-fire" type="button"><i class="fa-solid fa-circle-dot"></i> Disparar um nêutron</button>' +
                '</div>' +
                '<div style="display:flex;gap:6px;flex-wrap:wrap"><button class="btn small" id="nu-play" type="button"><i class="fa-solid fa-pause"></i> Pausar</button><button class="btn small" id="nu-reset" type="button"><i class="fa-solid fa-rotate-left"></i> Recomeçar</button></div>' +
                '<div class="readout" id="nu-out"></div>' +
              '</div>' +
            '</div>' +
            '<div class="lab-under">' +
              '<div class="lab-note"><strong>Leitura.</strong> <em>Decaimento:</em> cada núcleo tem a mesma chance de decair a cada instante, sem memória; o gráfico mostra quantos restam (pontos) e a curva exponencial esperada. A animação dura 4 segundos por meia-vida; o tempo real está no painel. <em>Reação em cadeia:</em> cada nêutron que atinge um núcleo de urânio-235 o parte em dois e libera 2 ou 3 nêutrons; nêutrons que saem da caixa ou batem nas barras de controle se perdem. Cada núcleo partido é reposto em outro ponto, como num reator, onde o combustível dura meses.</div>' +
              '<div class="lab-note"><strong>Experimente.</strong> Com 100 núcleos, a curva fica irregular; com 2 500, segue a exponencial quase perfeitamente. Na reação em cadeia, com pouco urânio a reação morre (subcrítica); com muito, explode (supercrítica). Insira as barras de controle até a reação se manter estável: é assim que um reator funciona.</div>' +
            '</div>';
        const S = k => $('#nu-' + k, root), cv = S('cv');
        const st = { mode: 'dec', iso: 0, N: 400, nuc: [], t: 0, hist: [], fx: [], playing: true,
            ch: { U: [], n: [], frag: [], flashes: [], fis: 0, t: 0, series: [], gen: [], den: 0.55, rod: 0, lost: 0 } };
        const HL = 4; /* segundos de animação por meia-vida */
        function resetDec() {
            const r = rng(7 + st.N), N = st.N; st.nuc = []; st.t = 0; st.hist = [[0, N]]; st.fx = [];
            for (let i = 0; i < N; i++) st.nuc.push({ alive: true, j: r(), td: 0 });
        }
        function stepDec(dt) {
            st.t += dt; const p = 1 - Math.pow(0.5, dt / HL), iso = NUCLIDES[st.iso];
            st.nuc.forEach((q, i) => { if (q.alive && Math.random() < p) { q.alive = false; q.td = st.t; st.fx.push({ i, t: 0, a: Math.random() * TAU, mode: iso.mode }); } });
            st.fx.forEach(f => { f.t += dt; }); st.fx = st.fx.filter(f => f.t < 0.8);
            const alive = st.nuc.reduce((s, q) => s + q.alive, 0);
            const last = st.hist[st.hist.length - 1]; if (st.t - last[0] > 0.05) st.hist.push([st.t, alive]);
            if (st.t > HL * 6.2) { st.playing = false; playLbl(); }
        }
        function drawDec(c, W, H) {
            const wide = W >= 640, A = wide ? { x: 0, y: 0, w: W * 0.5, h: H } : { x: 0, y: 0, w: W, h: H * 0.52 }, G = wide ? { x: W * 0.5, y: 0, w: W * 0.5, h: H } : { x: 0, y: H * 0.52, w: W, h: H * 0.48 };
            const iso = NUCLIDES[st.iso], N = st.N, cols = Math.ceil(Math.sqrt(N * A.w / A.h)), rows = Math.ceil(N / cols);
            const cw = Math.min((A.w - 30) / cols, (A.h - 50) / rows), ox = A.x + (A.w - cw * cols) / 2, oy = A.y + 36 + (A.h - 50 - cw * rows) / 2, r = Math.max(1.2, cw * 0.36);
            st.nuc.forEach((q, i) => {
                const x = ox + (i % cols + 0.5) * cw, y = oy + (Math.floor(i / cols) + 0.5) * cw;
                const fresh = !q.alive && st.t - q.td < 0.5, col = q.alive ? iso.p : iso.d;
                c.fillStyle = rgba(col, q.alive ? 0.95 : 0.45); c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill();
                if (fresh) { const u = (st.t - q.td) / 0.5, gr = c.createRadialGradient(x, y, 0, x, y, r * 4); gr.addColorStop(0, 'rgba(255,255,255,' + (1 - u) + ')'); gr.addColorStop(1, 'rgba(255,255,255,0)'); c.fillStyle = gr; c.beginPath(); c.arc(x, y, r * 4, 0, TAU); c.fill(); }
            });
            /* partículas emitidas */
            st.fx.forEach(f => {
                const i = f.i, x = ox + (i % cols + 0.5) * cw, y = oy + (Math.floor(i / cols) + 0.5) * cw, d = f.t * 140;
                const px = x + Math.cos(f.a) * d, py = y + Math.sin(f.a) * d, a = 1 - f.t / 0.8;
                if (f.mode.startsWith('α')) { c.fillStyle = 'rgba(253,224,71,' + a + ')'; c.beginPath(); c.arc(px, py, 3, 0, TAU); c.fill(); }
                else if (f.mode.startsWith('β')) { c.strokeStyle = 'rgba(125,211,252,' + a + ')'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(px, py); c.lineTo(px - Math.cos(f.a) * 8, py - Math.sin(f.a) * 8); c.stroke(); }
                if (f.mode.includes('γ')) { c.strokeStyle = 'rgba(244,114,182,' + a + ')'; c.lineWidth = 1.3; c.beginPath(); for (let k = 0; k <= 10; k++) { const s2 = d * 1.4 - k * 1.5, amp = 2.5 * Math.sin(k * 1.6); const qx = x + Math.cos(f.a + 1) * s2 - Math.sin(f.a + 1) * amp, qy = y + Math.sin(f.a + 1) * s2 + Math.cos(f.a + 1) * amp; k ? c.lineTo(qx, qy) : c.moveTo(qx, qy); } c.stroke(); }
            });
            label(c, iso.n + ' (' + iso.mode + ')', A.x + 12, A.y + 14, '#e2e8f0', F(700, 12));
            c.fillStyle = rgba(iso.p); c.beginPath(); c.arc(A.x + 18, A.y + 30, 4, 0, TAU); c.fill(); label(c, 'ainda não decaiu', A.x + 26, A.y + 30, '#cbd5e1', F(500, 10));
            c.fillStyle = rgba(iso.d, 0.6); c.beginPath(); c.arc(A.x + 130, A.y + 30, 4, 0, TAU); c.fill(); label(c, 'produto', A.x + 138, A.y + 30, '#cbd5e1', F(500, 10));
            /* gráfico */
            const g = { x0: G.x + 50, x1: G.x + G.w - 16, y0: G.y + G.h - 34, y1: G.y + 28 };
            c.fillStyle = '#070b16'; c.fillRect(G.x, G.y, G.w, G.h);
            const X = t => g.x0 + t / (HL * 6) * (g.x1 - g.x0), Y = n => g.y0 - n / N * (g.y0 - g.y1);
            for (let k = 0; k <= 6; k++) { c.strokeStyle = 'rgba(148,163,184,.12)'; c.beginPath(); c.moveTo(X(k * HL), g.y0); c.lineTo(X(k * HL), g.y1); c.stroke(); label(c, String(k), X(k * HL), g.y0 + 10, '#94a3b8', F(500, 10, true), 'center'); }
            [1, 0.5, 0.25, 0.125].forEach(f => { c.strokeStyle = 'rgba(148,163,184,.12)'; c.beginPath(); c.moveTo(g.x0, Y(N * f)); c.lineTo(g.x1, Y(N * f)); c.stroke(); label(c, f === 1 ? '100%' : f === 0.5 ? '50%' : f === 0.25 ? '25%' : '12,5%', g.x0 - 6, Y(N * f), '#94a3b8', F(500, 9, true), 'right'); });
            label(c, 'meias-vidas', (g.x0 + g.x1) / 2, G.y + G.h - 10, '#cbd5e1', F(600, 10), 'center');
            label(c, 'núcleos restantes', G.x + 8, G.y + 12, '#cbd5e1', F(600, 10));
            c.strokeStyle = 'rgba(253,224,71,.8)'; c.lineWidth = 1.5; c.setLineDash([5, 4]); c.beginPath();
            for (let k = 0; k <= 120; k++) { const t = k / 120 * HL * 6; k ? c.lineTo(X(t), Y(N * Math.pow(0.5, t / HL))) : c.moveTo(X(t), Y(N)); } c.stroke(); c.setLineDash([]);
            c.strokeStyle = rgba(iso.p); c.lineWidth = 2.2; c.beginPath(); st.hist.forEach((h, i) => i ? c.lineTo(X(h[0]), Y(h[1])) : c.moveTo(X(h[0]), Y(h[1]))); c.stroke();
            const last = st.hist[st.hist.length - 1]; c.fillStyle = '#fff'; c.beginPath(); c.arc(X(last[0]), Y(last[1]), 4, 0, TAU); c.fill();
            label(c, 'exponencial esperada', g.x1, g.y1 + 2, '#fde047', F(600, 10), 'right');
        }
        /* ---------- reação em cadeia ---------- */
        function resetChain() {
            const ch = st.ch, r = rng(11); ch.U = []; ch.n = []; ch.frag = []; ch.flashes = []; ch.fis = 0; ch.t = 0; ch.series = []; ch.lost = 0; ch.win = []; ch.k = null;
            const n = Math.round(30 + ch.den * 260);
            for (let i = 0; i < n; i++) ch.U.push({ x: 0.04 + r() * 0.92, y: 0.05 + r() * 0.9, alive: true });
        }
        function fireNeutron() { st.ch.n.push({ x: 0.02, y: 0.5, vx: 0.35, vy: (Math.random() - 0.5) * 0.08, gen: 0 }); }
        function rodsAt(W) { /* barras verticais, em frações da caixa */ const k = 5; return Array.from({ length: k }, (_, i) => (i + 0.5) / k); }
        function stepChain(dt, aspect) {
            const ch = st.ch; ch.t += dt;
            const rodLen = st.ch.rod, rods = rodsAt();
            const born = [];
            ch.n.forEach(n => {
                n.x += n.vx * dt; n.y += n.vy * dt * aspect;
                if (n.x < 0 || n.x > 1 || n.y < 0 || n.y > 1) { n.dead = true; ch.lost++; return; }
                if (rodLen > 0 && n.y < rodLen) for (const rx of rods) if (Math.abs(n.x - rx) < 0.008) { n.dead = true; ch.lost++; return; }
                for (const u of ch.U) {
                    if (!u.alive) continue; const dx = u.x - n.x, dy = (u.y - n.y) / aspect;
                    if (dx * dx + dy * dy < 0.00012) {
                        u.alive = false; u.back = ch.t + 1.5 + Math.random(); n.dead = true; ch.fis++;
                        ch.flashes.push({ x: u.x, y: u.y, t: 0 });
                        const a = Math.random() * TAU; ch.frag.push({ x: u.x, y: u.y, vx: Math.cos(a) * 0.12, vy: Math.sin(a) * 0.12, t: 0, big: true }, { x: u.x, y: u.y, vx: -Math.cos(a) * 0.14, vy: -Math.sin(a) * 0.14, t: 0 });
                        const k = Math.random() < 0.5 ? 2 : 3;
                        for (let j = 0; j < k; j++) { const b = Math.random() * TAU; born.push({ x: u.x, y: u.y, vx: Math.cos(b) * 0.35, vy: Math.sin(b) * 0.35, gen: n.gen + 1 }); }
                        break;
                    }
                }
            });
            ch.n = ch.n.filter(n => !n.dead).concat(born);
            if (ch.n.length > 1500) ch.n.length = 1500;
            ch.frag.forEach(f => { f.t += dt; f.x += f.vx * dt; f.y += f.vy * dt; }); ch.frag = ch.frag.filter(f => f.t < 0.6);
            /* combustível renovado: num reator, o urânio dura meses; aqui cada núcleo partido é reposto em outro lugar */
            ch.U.forEach(u => { if (!u.alive && u.back && ch.t > u.back) { u.alive = true; u.back = 0; u.x = 0.04 + Math.random() * 0.92; u.y = 0.05 + Math.random() * 0.9; } });
            ch.flashes.forEach(f => { f.t += dt; }); ch.flashes = ch.flashes.filter(f => f.t < 0.5);
            const last = ch.series[ch.series.length - 1];
            if (!last || ch.t - last[0] > 0.1) ch.series.push([ch.t, ch.n.length, ch.fis]);
            /* estimativa de k: razão entre fissões em janelas sucessivas de 0,5 s */
            const s = ch.series; if (s.length > 12) { const a = s[s.length - 1][2] - s[s.length - 6][2], b = s[s.length - 6][2] - s[s.length - 11][2]; if (b >= 3) ch.k = a / b; else if (!ch.n.length) ch.k = 0; }
        }
        function drawChain(c, W, H) {
            const ch = st.ch, gh = Math.min(140, H * 0.26), B = { x: 14, y: 30, w: W - 28, h: H - gh - 44 }, aspect = B.w / B.h;
            const X = x => B.x + x * B.w, Y = y => B.y + y * B.h;
            c.fillStyle = 'rgba(59,130,246,.06)'; c.fillRect(B.x, B.y, B.w, B.h); c.strokeStyle = 'rgba(148,163,184,.4)'; c.strokeRect(B.x, B.y, B.w, B.h);
            if (ch.rod > 0) rodsAt().forEach(rx => { c.fillStyle = '#475569'; c.fillRect(X(rx) - 4, B.y, 8, ch.rod * B.h); c.fillStyle = '#94a3b8'; c.fillRect(X(rx) - 4, B.y + ch.rod * B.h - 3, 8, 3); });
            const ur = Math.max(3, Math.min(6, B.w / 120));
            ch.U.forEach(u => { if (!u.alive) return; const g = c.createRadialGradient(X(u.x) - 1, Y(u.y) - 1, 0, X(u.x), Y(u.y), ur); g.addColorStop(0, '#bbf7d0'); g.addColorStop(1, '#16a34a'); c.fillStyle = g; c.beginPath(); c.arc(X(u.x), Y(u.y), ur, 0, TAU); c.fill(); });
            ch.frag.forEach(f => { const a = 1 - f.t / 0.6; c.fillStyle = f.big ? 'rgba(251,146,60,' + a + ')' : 'rgba(244,114,182,' + a + ')'; c.beginPath(); c.arc(X(f.x), Y(f.y), ur * (f.big ? 0.85 : 0.7), 0, TAU); c.fill(); });
            ch.flashes.forEach(f => { const u = f.t / 0.5, r = ur * (2 + u * 6), g = c.createRadialGradient(X(f.x), Y(f.y), 0, X(f.x), Y(f.y), r); g.addColorStop(0, 'rgba(255,255,255,' + (1 - u) + ')'); g.addColorStop(0.4, 'rgba(253,224,71,' + 0.7 * (1 - u) + ')'); g.addColorStop(1, 'rgba(253,224,71,0)'); c.fillStyle = g; c.beginPath(); c.arc(X(f.x), Y(f.y), r, 0, TAU); c.fill(); });
            c.fillStyle = '#e0f2fe'; ch.n.forEach(n => { c.beginPath(); c.arc(X(n.x), Y(n.y), 1.8, 0, TAU); c.fill(); });
            const state = ch.k === null ? (ch.fis ? 'reação em andamento' : 'dispare um nêutron') : ch.n.length === 0 ? 'a reação parou' : ch.k < 0.85 ? 'subcrítica: morrendo' : ch.k > 1.2 ? 'supercrítica: crescendo' : 'aproximadamente crítica';
            label(c, 'Urânio-235: ' + nf(ch.U.filter(u => u.alive).length) + ' núcleos · nêutrons livres: ' + nf(ch.n.length) + ' · ' + state, 14, 16, '#e2e8f0', F(700, 12));
            /* gráfico de nêutrons */
            const g = { x0: 50, x1: W - 16, y0: H - 22, y1: H - gh + 4 };
            c.fillStyle = '#070b16'; c.fillRect(0, H - gh - 8, W, gh + 8);
            const tmax = Math.max(6, ch.t), nmax = Math.max(10, ...ch.series.map(s => s[1]));
            const X2 = t => g.x0 + t / tmax * (g.x1 - g.x0), Y2 = n => g.y0 - n / nmax * (g.y0 - g.y1);
            c.strokeStyle = 'rgba(148,163,184,.25)'; c.beginPath(); c.moveTo(g.x0, g.y0); c.lineTo(g.x1, g.y0); c.stroke();
            label(c, 'nêutrons livres', 8, H - gh, '#cbd5e1', F(600, 10)); label(c, nf(nmax), g.x0 - 6, g.y1 + 12, '#64748b', F(500, 9, true), 'right');
            c.strokeStyle = '#7dd3fc'; c.lineWidth = 2; c.beginPath(); ch.series.forEach((s, i) => i ? c.lineTo(X2(s[0]), Y2(s[1])) : c.moveTo(X2(s[0]), Y2(s[1]))); c.stroke();
        }
        function draw() {
            const gg = canvas2d(cv, '#04060d'); if (!gg) return;
            const { c, W, H } = gg;
            if (st.mode === 'dec') drawDec(c, W, H); else drawChain(c, W, H);
            readout();
        }
        function readout() {
            S('denv').textContent = nf(st.ch.den * 100) + '%'; S('rodv').textContent = nf(st.ch.rod * 100) + '%';
            let h;
            if (st.mode === 'dec') {
                const iso = NUCLIDES[st.iso], alive = st.nuc.reduce((s, q) => s + q.alive, 0), hl = st.t / HL, f = alive / st.N;
                h = cell('Meia-vida', duration(iso.T)) + cell('Tempo real decorrido', duration(hl * iso.T)) +
                    cell('Restam', nf(alive) + ' (' + nf(f * 100, 1) + '%)') + cell('Esperado', nf(st.N * Math.pow(0.5, hl), 0) + ' (' + nf(Math.pow(0.5, hl) * 100, 1) + '%)') +
                    cell('Idade estimada pela fração restante', f > 0 && f < 1 ? duration(Math.log2(1 / f) * iso.T) : '—', true);
            } else {
                const ch = st.ch, MeV = ch.fis * 200;
                h = cell('Fissões', nf(ch.fis)) + cell('Energia liberada', nf(MeV) + ' MeV') +
                    cell('Nêutrons perdidos', nf(ch.lost)) + cell('Fator de multiplicação k', ch.k === null ? '—' : nf(ch.k, 2)) +
                    cell('Energia por fissão', 'cerca de 200 MeV, 50 milhões de vezes uma reação química', true);
            }
            $('#nu-out', root).innerHTML = h;
        }
        function playLbl() { S('play').innerHTML = st.playing ? '<i class="fa-solid fa-pause"></i> Pausar' : '<i class="fa-solid fa-play"></i> Continuar'; }
        let aspect = 1;
        const anim = animator(cv, dt => {
            if (st.playing) { if (st.mode === 'dec') stepDec(dt); else { const r = cv.getBoundingClientRect(); aspect = (r.width - 28) / Math.max(1, r.height - Math.min(140, r.height * 0.26) - 44); stepChain(dt, aspect); } }
            draw();
        });
        function setMode(m) { st.mode = m; S('pdec').hidden = m !== 'dec'; S('pch').hidden = m !== 'chain'; st.playing = true; playLbl(); if (m === 'dec') resetDec(); else resetChain(); draw(); }
        root.querySelectorAll('input[name="nu-mode"]').forEach(el => el.addEventListener('change', () => setMode(radio(root, 'nu-mode'))));
        root.querySelectorAll('input[name="nu-n"]').forEach(el => el.addEventListener('change', () => { st.N = +radio(root, 'nu-n'); resetDec(); st.playing = true; playLbl(); draw(); }));
        S('iso').addEventListener('change', () => { st.iso = +S('iso').value; resetDec(); st.playing = true; playLbl(); draw(); });
        S('den').addEventListener('input', () => { st.ch.den = +S('den').value / 100; resetChain(); draw(); });
        S('rod').addEventListener('input', () => { st.ch.rod = +S('rod').value / 100; draw(); });
        S('fire').addEventListener('click', () => { fireNeutron(); st.playing = true; playLbl(); });
        S('play').addEventListener('click', () => { st.playing = !st.playing; playLbl(); });
        S('reset').addEventListener('click', () => { if (st.mode === 'dec') resetDec(); else resetChain(); st.playing = true; playLbl(); draw(); });
        if (window.ResizeObserver) new ResizeObserver(() => draw()).observe(cv);
        resetDec(); anim.start();
        return () => { draw(); anim.kick(); };
    }

    return { init: { relatividade: initRelatividade, fotoeletrico: initFotoeletrico, espectros: initEspectros, fenda: initFenda, quantica: initQuantica, nuclear: initNuclear } };
})();
