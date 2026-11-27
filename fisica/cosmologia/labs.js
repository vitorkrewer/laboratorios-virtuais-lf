/* Astrofísica e Cosmologia: simuladores Evolução estelar (diagrama HR), Pulsar e magnetar, Buraco negro (lente gravitacional
   com traçado de raios na métrica de Schwarzschild e disco de acreção), Galáxia e matéria escura, Universo em expansão. */
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

    /* =====================================================================
       1. EVOLUÇÃO ESTELAR: a estrela percorre o diagrama HR
       ===================================================================== */
    const PHASE = {
        pre: 'Protoestrela em contração', ms: 'Sequência principal', sg: 'Subgigante', rgb: 'Gigante vermelha',
        hb: 'Queima de hélio no núcleo', agb: 'Gigante do ramo assintótico', pn: 'Nebulosa planetária', wd: 'Anã branca',
        gap: 'Travessia para supergigante', rsg: 'Supergigante vermelha', bsg: 'Supergigante azul instável', wr: 'Estrela Wolf-Rayet',
        sn: 'Colapso do núcleo: supernova', ns: 'Estrela de nêutrons', bh: 'Buraco negro'
    };
    /* trilhas esquemáticas: [log T, log L, fase do trecho que termina aqui, idade (milhões de anos), segundos de animação] */
    const TRACKS = {
        0.5: [[3.56, 0.2, null, 0, 0], [3.585, -1.2, 'pre', 150, 2.5], [3.59, -1.25, 'ms', 13800, 7]],
        1: [[3.62, 1.1, null, 0, 0], [3.645, 0.0, 'pre', 30, 1.4], [3.76, -0.15, 'pre', 50, 1.0], [3.762, 0.0, 'ms', 5000, 3], [3.765, 0.2, 'ms', 10000, 3],
            [3.70, 0.45, 'sg', 10700, 1.6], [3.66, 1.2, 'rgb', 11400, 1.6], [3.53, 3.4, 'rgb', 11700, 2.6], [3.69, 1.7, 'hb', 11701, 1.3], [3.68, 1.75, 'hb', 11800, 1.6],
            [3.50, 3.6, 'agb', 11820, 2.4], [4.1, 3.6, 'pn', 11820.02, 1.3], [5.0, 3.3, 'pn', 11820.05, 1.5], [4.8, 1.0, 'wd', 11821, 1.2], [4.4, -1.5, 'wd', 12100, 2.0], [3.9, -3.3, 'wd', 13800, 2.6]],
        2: [[3.7, 1.9, null, 0, 0], [3.95, 1.15, 'pre', 10, 2.2], [3.93, 1.45, 'ms', 1800, 6], [3.72, 1.5, 'sg', 1830, 1.6], [3.66, 1.75, 'rgb', 1840, 1.4], [3.60, 2.45, 'rgb', 1850, 1.8],
            [3.69, 1.8, 'hb', 1851, 1.3], [3.68, 1.85, 'hb', 2100, 1.6], [3.52, 3.5, 'agb', 2120, 2.4], [4.2, 3.5, 'pn', 2120.02, 1.3], [5.05, 3.4, 'pn', 2120.05, 1.5],
            [4.85, 1.1, 'wd', 2121, 1.2], [4.4, -1.6, 'wd', 2800, 2.0], [3.82, -3.9, 'wd', 13800, 2.6]],
        5: [[3.8, 3.1, null, 0, 0], [4.23, 2.8, 'pre', 1, 2.0], [4.17, 3.05, 'ms', 180, 6], [3.70, 3.05, 'gap', 180.5, 1.6], [3.62, 3.2, 'rgb', 181, 1.4],
            [4.05, 3.25, 'hb', 195, 2.2], [3.65, 3.3, 'hb', 200, 2.0], [3.50, 4.0, 'agb', 201, 2.4], [4.3, 3.95, 'pn', 201.01, 1.3], [5.1, 3.85, 'pn', 201.03, 1.5],
            [4.95, 1.4, 'wd', 202, 1.2], [4.45, -1.4, 'wd', 900, 2.0], [3.82, -4.0, 'wd', 13800, 2.6]],
        15: [[4.0, 4.4, null, 0, 0], [4.48, 4.3, 'pre', 0.1, 1.8], [4.43, 4.62, 'ms', 12, 6], [3.72, 4.78, 'gap', 12.05, 1.8], [3.55, 4.9, 'rsg', 13, 6],
            [3.55, 4.9, 'sn', 13.00001, 3.6], [3.55, 4.9, 'ns', 13.0001, 4]],
        40: [[4.2, 5.4, null, 0, 0], [4.63, 5.3, 'pre', 0.05, 1.8], [4.55, 5.58, 'ms', 5, 6], [4.30, 5.75, 'bsg', 5.3, 2.2], [4.95, 5.7, 'wr', 5.5, 5],
            [4.95, 5.7, 'sn', 5.50001, 3.6], [4.95, 5.7, 'bh', 5.5001, 4]]
    };
    const FATE = {
        0.5: 'Continua na sequência principal: vive cerca de 56 bilhões de anos, mais que a idade do universo.',
        1: 'Anã branca de cerca de 0,55 massa solar, depois de soltar uma nebulosa planetária.',
        2: 'Anã branca de cerca de 0,6 massa solar.',
        5: 'Anã branca de cerca de 0,9 massa solar, rica em carbono e oxigênio.',
        15: 'Supernova de colapso do núcleo; sobra uma estrela de nêutrons de cerca de 1,4 massa solar.',
        40: 'Colapso do núcleo (com ou sem explosão visível); sobra um buraco negro de algumas a dezenas de massas solares.'
    };
    const NAMED = [
        ['Sol', 5772, 1, 'G2'], ['Sírius A', 9940, 25, 'A1'], ['Vega', 9600, 40, 'A0'], ['Rigel', 12100, 1.2e5, 'B8'],
        ['Espiga', 25300, 2.05e4, 'B1'], ['Betelgeuse', 3500, 1e5, 'M1'], ['Aldebarã', 3900, 440, 'K5'], ['Arcturo', 4290, 170, 'K1'],
        ['Proxima Centauri', 3040, 0.0017, 'M5'], ['Sírius B', 25000, 0.056, 'anã branca']
    ];
    const SHELL_COLOR = [
        [/ferro/, '#64748b'], [/Si →/, '#a3a3a3'], [/O →/, '#22d3ee'], [/Ne →/, '#a78bfa'], [/C →/, '#f472b6'], [/He → C/, '#fb923c'],
        [/núcleo de hélio|núcleo de C|degenerad/, '#e2e8f0'], [/H → He/, '#fde047'], [/radiativ/, '#f59e0b'], [/convectiv|envelope/, '#ef4444'], [/gás/, '#9a3412']
    ];
    const shellColor = n => { for (const [re, col] of SHELL_COLOR) if (re.test(n)) return col; return '#f97316'; };

    function initEvolucao(root) {
        const MASSES = [0.5, 1, 2, 5, 15, 40];
        root.innerHTML =
            '<div class="lab-grid">' +
              '<div class="lab-stage tall"><canvas id="ev-cv" aria-label="Diagrama HR com a trilha da estrela, a aparência e o interior da estrela"></canvas></div>' +
              '<div class="lab-side">' +
                '<div class="ctl"><label>Massa inicial (massas solares)</label>' + seg('ev-m', MASSES.map(m => [m, String(m).replace('.', ',')]), 1) + '</div>' +
                '<div class="ctl"><label for="ev-t">Vida da estrela</label><input id="ev-t" type="range" min="0" max="1000" step="1" value="0" aria-label="Posição na vida da estrela"></div>' +
                '<div style="display:flex;gap:6px;flex-wrap:wrap">' +
                  '<button class="btn small primary" id="ev-play" type="button"><i class="fa-solid fa-play"></i> Viver</button>' +
                  '<button class="btn small" id="ev-reset" type="button"><i class="fa-solid fa-rotate-left"></i> Recomeçar</button>' +
                  '<select id="ev-speed" class="plain-in" aria-label="Velocidade" style="width:auto"><option value="0.5">0,5×</option><option value="1" selected>1×</option><option value="2">2×</option></select>' +
                '</div>' +
                '<div class="ctl seg" style="flex-wrap:wrap;gap:6px 12px;font-size:.84rem"><label><input type="checkbox" id="ev-ref" checked> estrelas conhecidas</label><label><input type="checkbox" id="ev-rad" checked> linhas de raio constante</label></div>' +
                '<div class="readout" id="ev-out"></div>' +
              '</div>' +
            '</div>' +
            '<div class="lab-under">' +
              '<div class="lab-note"><strong>Leitura.</strong> À esquerda, o diagrama HR: temperatura aumentando para a esquerda, luminosidade para cima, em escala logarítmica. A linha mostra o caminho da estrela; os pontos de fundo são estrelas típicas. À direita, a estrela em tamanho relativo (escala logarítmica) e o interior, com as camadas que estão fundindo (fora de escala). Embaixo, a linha do tempo em proporção real.</div>' +
              '<div class="lab-note"><strong>Experimente.</strong> Compare 1 e 15 massas solares: a de 15 vive mil vezes menos e termina numa supernova. Repare na linha do tempo: a sequência principal ocupa quase toda a vida, mas a animação passa rápido por ela para mostrar as fases finais. Passe o mouse sobre as estrelas conhecidas.</div>' +
            '</div>';
        const S = k => $('#ev-' + k, root), cv = S('cv');
        const st = { m: 1, t: 0, total: 0, speed: 1, hover: null, playing: false };
        const X0 = 5.15, X1 = 3.42, Y0 = -4.6, Y1 = 6.4; /* log T (esquerda → direita), log L (baixo → cima) */
        const rnd = rng(20261127), bg = [];
        for (let i = 0; i < 330; i++) {
            const lm = -0.75 + Math.pow(rnd(), 1.7) * 1.95, M = Math.pow(10, lm);
            const L = M > 0.43 ? Math.pow(M, 3.5) : 0.23 * Math.pow(M, 2.3);
            bg.push([3.762 + 0.56 * lm + gauss(rnd) * 0.025, Math.log10(L) + gauss(rnd) * 0.18]);
        }
        for (let i = 0; i < 46; i++) bg.push([3.56 + rnd() * 0.16, 1.2 + rnd() * 1.9 + gauss(rnd) * 0.15]);
        for (let i = 0; i < 14; i++) bg.push([3.52 + rnd() * 0.9, 4 + rnd() * 1.5]);
        for (let i = 0; i < 26; i++) { const lt = 3.85 + rnd() * 0.7; bg.push([lt, 2 * Math.log10(0.012 + rnd() * 0.006) + 4 * (lt - 3.7613) + gauss(rnd) * 0.1]); }
        const bgCol = bg.map(p => bb(Math.pow(10, p[0])));
        const sky = []; for (let i = 0; i < 70; i++) sky.push([rnd(), rnd(), 0.2 + rnd() * 0.6]);

        const track = () => TRACKS[st.m];
        function totalDur() { return track().reduce((s, n) => s + n[4], 0); }
        function state(t) {
            /* posição na trilha: interpola o trecho atual */
            const tr = track(); let acc = 0;
            for (let k = 1; k < tr.length; k++) {
                const d = tr[k][4];
                if (t <= acc + d || k === tr.length - 1) {
                    const u = clamp((t - acc) / d, 0, 1), e = smooth(u), a = tr[k - 1], b = tr[k];
                    return { k, u, lt: lerp(a[0], b[0], e), ll: lerp(a[1], b[1], e), ph: b[2], age: lerp(a[3], b[3], u) * 1e6 };
                }
                acc += d;
            }
        }
        function shells(ph, u) {
            const m = st.m;
            if (ph === 'pre') return [['gás em contração', 1]];
            if (ph === 'ms') return m < 0.8 ? [['zona convectiva (a estrela inteira se mistura)', 1], ['núcleo: H → He', 0.22]]
                : m <= 1.5 ? [['zona convectiva', 1], ['zona radiativa', 0.71], ['núcleo: H → He (cadeia p-p)', 0.25]]
                : [['envelope radiativo', 1], ['núcleo convectivo: H → He (ciclo CNO)', 0.32]];
            if (ph === 'sg' || ph === 'rgb' || ph === 'gap') return [['envelope convectivo', 1], ['camada: H → He', 0.2], ['núcleo de hélio (inerte)', 0.13]];
            if (ph === 'hb') return [['envelope', 1], ['camada: H → He', 0.32], ['núcleo: He → C, O', 0.18]];
            if (ph === 'agb') return [['envelope convectivo', 1], ['camada: H → He', 0.26], ['camada: He → C, O', 0.19], ['núcleo de C e O (inerte)', 0.12]];
            if (ph === 'pn' || ph === 'wd') return [['carbono e oxigênio degenerados', 1]];
            if (ph === 'bsg') return [['envelope', 1], ['camada: H → He', 0.36], ['núcleo: He → C, O', 0.22]];
            if (ph === 'rsg' || ph === 'wr' || ph === 'sn') {
                const L = ph === 'wr' ? [['camada externa de hélio', 1], ['He → C, O', 0.62]] : [['envelope de hidrogênio', 1], ['camada: H → He', 0.62], ['He → C, O', 0.5]];
                const more = [['C → Ne, Mg', 0.4, 0.3], ['Ne → O, Mg', 0.31, 0.55], ['O → Si, S', 0.23, 0.72], ['Si → Fe', 0.15, 0.86], ['núcleo de ferro', 0.08, 0.95]];
                const p = ph === 'sn' ? 1 : u;
                more.forEach(x => { if (p >= x[2]) L.push([x[0], x[1]]); });
                return L;
            }
            return [];
        }
        function hrRect(W, H) {
            const wide = W >= 700, tl = 38;
            if (wide) return { hr: { x: 0, y: 0, w: Math.round(W * 0.6), h: H - tl }, sp: { x: Math.round(W * 0.6), y: 0, w: W - Math.round(W * 0.6), h: H - tl }, tl: { x: 0, y: H - tl, w: W, h: tl }, wide };
            const hh = Math.round((H - tl) * 0.56);
            return { hr: { x: 0, y: 0, w: W, h: hh }, sp: { x: 0, y: hh, w: W, h: H - tl - hh }, tl: { x: 0, y: H - tl, w: W, h: tl }, wide };
        }
        let geo = null;
        function draw() {
            const g = canvas2d(cv, '#05070f'); if (!g) return;
            const { c, W, H } = g, R = hrRect(W, H), s = state(st.t), hr = R.hr;
            const ml = 46, mr = 12, mt = 24, mb = 34;
            const px = lt => hr.x + ml + (X0 - lt) / (X0 - X1) * (hr.w - ml - mr);
            const py = ll => hr.y + mt + (Y1 - ll) / (Y1 - Y0) * (hr.h - mt - mb);
            geo = { px, py, hr };
            /* faixa de cores e eixos */
            for (let i = 0; i < 60; i++) {
                const lt = X0 + (X1 - X0) * i / 60, col = bb(Math.pow(10, lt));
                c.fillStyle = rgba(col, 0.75); c.fillRect(px(lt), hr.y + mt - 9, Math.ceil((hr.w - ml - mr) / 60) + 1, 5);
            }
            c.strokeStyle = 'rgba(148,163,184,.25)'; c.lineWidth = 1; c.strokeRect(hr.x + ml, hr.y + mt, hr.w - ml - mr, hr.h - mt - mb);
            c.save(); c.beginPath(); c.rect(hr.x + ml, hr.y + mt, hr.w - ml - mr, hr.h - mt - mb); c.clip();
            [100000, 40000, 20000, 10000, 6000, 3000].forEach(T => { const x = px(Math.log10(T)); c.strokeStyle = 'rgba(148,163,184,.08)'; c.beginPath(); c.moveTo(x, hr.y + mt); c.lineTo(x, hr.y + hr.h - mb); c.stroke(); });
            for (let e = -4; e <= 6; e += 2) { const y = py(e); c.strokeStyle = 'rgba(148,163,184,.08)'; c.beginPath(); c.moveTo(hr.x + ml, y); c.lineTo(hr.x + hr.w - mr, y); c.stroke(); }
            if (S('rad').checked) [0.01, 1, 100, 1000].forEach(Rr => {
                c.strokeStyle = 'rgba(56,189,248,.18)'; c.setLineDash([3, 5]); c.beginPath();
                const f = lt => 2 * Math.log10(Rr) + 4 * (lt - 3.7613);
                c.moveTo(px(X0), py(f(X0))); c.lineTo(px(X1), py(f(X1))); c.stroke(); c.setLineDash([]);
                const lt = Rr >= 100 ? 3.55 : Rr === 1 ? 4.35 : 4.75, y = py(f(lt));
                if (y > hr.y + mt + 10 && y < hr.y + hr.h - mb - 6) label(c, sci(Rr, 1, -2, 4).replace(/^0,01$/, '0,01') + ' R☉', px(lt) + 4, y - 7, 'rgba(125,211,252,.55)', F(500, 10));
            });
            /* regiões */
            label(c, 'sequência principal', px(4.42), py(2.0), 'rgba(226,232,240,.35)', F(700, 11), 'center');
            label(c, 'gigantes', px(3.7), py(3.5), 'rgba(226,232,240,.35)', F(700, 11), 'center');
            label(c, 'supergigantes', px(3.95), py(5.95), 'rgba(226,232,240,.35)', F(700, 11), 'center');
            label(c, 'anãs brancas', px(4.35), py(-3.15), 'rgba(226,232,240,.35)', F(700, 11), 'center');
            /* estrelas de fundo */
            bg.forEach((p, i) => { c.fillStyle = rgba(bgCol[i], 0.42); c.beginPath(); c.arc(px(p[0]), py(p[1]), 1.6, 0, TAU); c.fill(); });
            if (S('ref').checked) NAMED.forEach(n => {
                const x = px(Math.log10(n[1])), y = py(Math.log10(n[2])), col = bb(n[1]);
                c.fillStyle = rgba(col); c.beginPath(); c.arc(x, y, n[0] === 'Sol' ? 4.5 : 3.4, 0, TAU); c.fill();
                if (n[0] === 'Sol') { c.strokeStyle = '#fde047'; c.lineWidth = 1.5; c.beginPath(); c.arc(x, y, 7, 0, TAU); c.stroke(); }
                const right = x > hr.x + hr.w - mr - 90;
                if (W > 520 || n[0] === 'Sol') label(c, n[0], right ? x - 7 : x + 7, y, 'rgba(226,232,240,.75)', F(600, 10), right ? 'right' : 'left');
            });
            /* trilha */
            const tr = track();
            c.lineWidth = 1.4; c.strokeStyle = 'rgba(244,114,182,.28)'; c.setLineDash([4, 4]); c.beginPath();
            tr.forEach((n, i) => i ? c.lineTo(px(n[0]), py(n[1])) : c.moveTo(px(n[0]), py(n[1]))); c.stroke(); c.setLineDash([]);
            c.lineWidth = 2.4; c.strokeStyle = '#f472b6'; c.beginPath(); c.moveTo(px(tr[0][0]), py(tr[0][1]));
            for (let k = 1; k < s.k; k++) {
                const a = tr[k - 1], b = tr[k];
                for (let j = 1; j <= 12; j++) { const e = smooth(j / 12); c.lineTo(px(lerp(a[0], b[0], e)), py(lerp(a[1], b[1], e))); }
            }
            { const a = tr[s.k - 1], b = tr[s.k]; for (let j = 1; j <= 24; j++) { const u = j / 24 * s.u, e = smooth(u); c.lineTo(px(lerp(a[0], b[0], e)), py(lerp(a[1], b[1], e))); } }
            c.stroke();
            const T = Math.pow(10, s.lt), L = Math.pow(10, s.ll), Rr = Math.sqrt(L) / Math.pow(T / 5772, 2);
            const off = s.ph === 'ns' || s.ph === 'bh' || (s.ph === 'sn' && s.u > 0.3);
            if (!off) {
                const x = px(s.lt), y = py(s.ll), col = bb(T), pulse = 1 + 0.25 * Math.sin(performance.now() / 180);
                const gr = c.createRadialGradient(x, y, 0, x, y, 16 * pulse); gr.addColorStop(0, rgba(col, 0.9)); gr.addColorStop(1, rgba(col, 0));
                c.fillStyle = gr; c.beginPath(); c.arc(x, y, 16 * pulse, 0, TAU); c.fill();
                c.fillStyle = '#fff'; c.beginPath(); c.arc(x, y, 4, 0, TAU); c.fill();
            }
            c.restore();
            /* rótulos dos eixos */
            [100000, 40000, 20000, 10000, 6000, 3000].forEach(Tk => label(c, nf(Tk), px(Math.log10(Tk)), hr.y + hr.h - mb + 11, '#94a3b8', F(500, 10, true), 'center'));
            for (let e = -4; e <= 6; e += 2) label(c, e === 0 ? '1' : '10' + sup(e), hr.x + ml - 5, py(e), '#94a3b8', F(500, 10, true), 'right');
            label(c, 'temperatura (K)  ←  mais quente', hr.x + ml + (hr.w - ml - mr) / 2, hr.y + hr.h - 9, '#cbd5e1', F(600, 11), 'center');
            c.save(); c.translate(hr.x + 12, hr.y + mt + (hr.h - mt - mb) / 2); c.rotate(-Math.PI / 2); label(c, 'luminosidade (L☉)', 0, 0, '#cbd5e1', F(600, 11), 'center'); c.restore();
            label(c, 'Diagrama HR · ' + String(st.m).replace('.', ',') + ' M☉', hr.x + ml + 4, hr.y + 9, '#e2e8f0', F(700, 11));
            if (st.hover) {
                const n = st.hover, x = px(Math.log10(n[1])), y = py(Math.log10(n[2])), Rn = Math.sqrt(n[2]) / Math.pow(n[1] / 5772, 2);
                const lines = [n[0] + ' (' + n[3] + ')', nf(n[1]) + ' K · ' + sci(n[2], 2, -2, 4) + ' L☉', 'raio: ' + sci(Rn, 2, -2, 4) + ' R☉'];
                c.font = F(600, 11); const bw = Math.max(...lines.map(l => c.measureText(l).width)) + 16, bx = clamp(x + 10, hr.x + 4, hr.x + hr.w - bw - 4), by = clamp(y - 56, hr.y + 4, hr.y + hr.h - 60);
                c.fillStyle = 'rgba(15,23,42,.94)'; c.strokeStyle = 'rgba(148,163,184,.4)'; c.beginPath(); c.roundRect(bx, by, bw, 52, 8); c.fill(); c.stroke();
                lines.forEach((l, i) => label(c, l, bx + 8, by + 11 + i * 15, i ? '#cbd5e1' : '#fff', F(i ? 500 : 700, 11)));
            }
            drawStar(c, R, s, T, L, Rr);
            drawTimeline(c, R.tl, s);
            readout(s, T, L, Rr);
        }
        function drawStar(c, R, s, T, L, Rr) {
            const sp = R.sp, now = performance.now() / 1000;
            c.fillStyle = '#03050c'; c.fillRect(sp.x, sp.y, sp.w, sp.h);
            c.strokeStyle = 'rgba(148,163,184,.18)'; c.beginPath(); c.moveTo(sp.x + 0.5, sp.y); c.lineTo(sp.x + 0.5, sp.y + sp.h); if (!R.wide) { c.moveTo(sp.x, sp.y + 0.5); c.lineTo(sp.x + sp.w, sp.y + 0.5); } c.stroke();
            /* duas áreas: aparência e interior */
            const A = R.wide ? { x: sp.x, y: sp.y, w: sp.w, h: sp.h * 0.56 } : { x: sp.x, y: sp.y, w: sp.w * 0.5, h: sp.h };
            const B = R.wide ? { x: sp.x, y: sp.y + sp.h * 0.56, w: sp.w, h: sp.h * 0.44 } : { x: sp.x + sp.w * 0.5, y: sp.y, w: sp.w * 0.5, h: sp.h };
            sky.forEach(q => { c.fillStyle = 'rgba(203,213,225,' + q[2] * 0.5 + ')'; c.fillRect(A.x + q[0] * A.w, A.y + q[1] * A.h, 1.2, 1.2); });
            const cx = A.x + A.w / 2, cy = A.y + A.h / 2 + 6, maxR = Math.min(A.w, A.h) * 0.4;
            const rpx = clamp(3 + (Math.log10(Math.max(Rr, 0.005)) + 2.3) / 5.6 * (maxR - 3), 2.5, maxR);
            const col = bb(T), ph = s.ph;
            label(c, 'Aparência (tamanho em escala log)', A.x + 10, A.y + 12, '#94a3b8', F(600, 10));
            if (ph === 'sn') {
                const u = s.u, fl = Math.max(0, 1 - u * 3.2);
                if (fl > 0) { c.fillStyle = 'rgba(255,255,255,' + fl * 0.85 + ')'; c.fillRect(A.x, A.y, A.w, A.h); }
                const rr = 6 + u * Math.min(A.w, A.h) * 0.55, rn = rng(7);
                const gr = c.createRadialGradient(cx, cy, rr * 0.2, cx, cy, rr);
                gr.addColorStop(0, 'rgba(255,255,255,' + 0.6 * (1 - u) + ')'); gr.addColorStop(0.6, 'rgba(251,146,60,' + 0.5 * (1 - u * 0.6) + ')'); gr.addColorStop(1, 'rgba(239,68,68,0)');
                c.fillStyle = gr; c.beginPath(); c.arc(cx, cy, rr, 0, TAU); c.fill();
                c.lineWidth = 1.2;
                for (let i = 0; i < 90; i++) {
                    const a = rn() * TAU, r0 = rr * (0.55 + rn() * 0.35), r1 = r0 + rr * (0.1 + rn() * 0.25);
                    c.strokeStyle = 'rgba(' + (rn() < 0.5 ? '248,113,113' : '253,186,116') + ',' + (0.7 * (1 - u * 0.5)) + ')';
                    c.beginPath(); c.moveTo(cx + r0 * Math.cos(a), cy + r0 * Math.sin(a)); c.lineTo(cx + r1 * Math.cos(a + 0.05), cy + r1 * Math.sin(a + 0.05)); c.stroke();
                }
                label(c, 'SUPERNOVA', cx, A.y + A.h - 14, '#fde68a', F(800, 13), 'center');
            } else if (ph === 'ns' || ph === 'bh') {
                const rn = rng(7), rr = Math.min(A.w, A.h) * 0.42;
                c.lineWidth = 1;
                for (let i = 0; i < 120; i++) {
                    const a = rn() * TAU, r0 = rr * (0.45 + rn() * 0.45), r1 = r0 + rr * (0.05 + rn() * 0.15);
                    c.strokeStyle = 'rgba(' + (rn() < 0.5 ? '96,165,250' : '244,114,182') + ',.28)';
                    c.beginPath(); c.moveTo(cx + r0 * Math.cos(a), cy + r0 * Math.sin(a)); c.lineTo(cx + r1 * Math.cos(a + 0.06), cy + r1 * Math.sin(a + 0.06)); c.stroke();
                }
                if (ph === 'ns') {
                    const a = now * 5;
                    for (const sg of [1, -1]) {
                        const ex = cx + sg * Math.cos(a) * rr * 0.9, ey = cy + sg * Math.sin(a) * rr * 0.35;
                        const gr = c.createLinearGradient(cx, cy, ex, ey); gr.addColorStop(0, 'rgba(191,219,254,.85)'); gr.addColorStop(1, 'rgba(191,219,254,0)');
                        c.fillStyle = gr; c.beginPath(); c.moveTo(cx, cy);
                        const px2 = -Math.sin(a) * 14, py2 = Math.cos(a) * 14 * 0.35;
                        c.lineTo(ex + px2, ey + py2); c.lineTo(ex - px2, ey - py2); c.closePath(); c.fill();
                    }
                    c.fillStyle = '#e0f2fe'; c.beginPath(); c.arc(cx, cy, 3.5, 0, TAU); c.fill();
                    label(c, 'estrela de nêutrons girando no meio dos restos', cx, A.y + A.h - 14, '#bfdbfe', F(700, 11), 'center');
                } else {
                    const rh = 12, gr = c.createRadialGradient(cx, cy, rh * 1.2, cx, cy, rh * 2.4);
                    gr.addColorStop(0, 'rgba(253,186,116,.9)'); gr.addColorStop(1, 'rgba(253,186,116,0)');
                    c.fillStyle = gr; c.beginPath(); c.arc(cx, cy, rh * 2.4, 0, TAU); c.fill();
                    c.fillStyle = '#000'; c.beginPath(); c.arc(cx, cy, rh * 1.3, 0, TAU); c.fill();
                    label(c, 'buraco negro (tamanho ampliado)', cx, A.y + A.h - 14, '#fdba74', F(700, 11), 'center');
                }
            } else {
                if (ph === 'pn') {
                    const u = track()[s.k - 1][2] === 'pn' ? 0.5 + s.u * 0.5 : s.u * 0.5, rr = 8 + u * Math.min(A.w, A.h) * 0.42;
                    for (const [f, cc] of [[1, '45,212,191'], [0.82, '244,114,182'], [0.62, '96,165,250']]) {
                        const r = rr * f, gr = c.createRadialGradient(cx, cy, r * 0.7, cx, cy, r);
                        gr.addColorStop(0, 'rgba(' + cc + ',0)'); gr.addColorStop(0.85, 'rgba(' + cc + ',' + (0.55 * (1 - Math.max(0, u - 0.5) * 1.8)) + ')'); gr.addColorStop(1, 'rgba(' + cc + ',0)');
                        c.fillStyle = gr; c.beginPath(); c.ellipse(cx, cy, r, r * 0.86, 0.5, 0, TAU); c.fill();
                    }
                }
                const glow = c.createRadialGradient(cx, cy, rpx * 0.8, cx, cy, rpx * 1.9 + 6);
                glow.addColorStop(0, rgba(col, 0.55)); glow.addColorStop(1, rgba(col, 0));
                c.fillStyle = glow; c.beginPath(); c.arc(cx, cy, rpx * 1.9 + 6, 0, TAU); c.fill();
                const body = c.createRadialGradient(cx - rpx * 0.25, cy - rpx * 0.25, rpx * 0.1, cx, cy, rpx);
                body.addColorStop(0, rgba(col.map(v => Math.min(255, v + 50)))); body.addColorStop(0.75, rgba(col)); body.addColorStop(1, rgba(col.map(v => v * 0.55 | 0)));
                c.fillStyle = body; c.beginPath();
                const wobble = (T < 4500 && rpx > 20) ? 0.045 : 0.012;
                for (let i = 0; i <= 72; i++) {
                    const a = i / 72 * TAU, rr = rpx * (1 + wobble * (Math.sin(3 * a + now * 1.3) * 0.6 + Math.sin(7 * a - now * 2.1) * 0.4));
                    i ? c.lineTo(cx + rr * Math.cos(a), cy + rr * Math.sin(a)) : c.moveTo(cx + rr * Math.cos(a), cy + rr * Math.sin(a));
                }
                c.fill();
                if (rpx > 14) { /* granulação */
                    const rn = rng(Math.floor(now * 3) + 11); c.fillStyle = 'rgba(0,0,0,.045)';
                    for (let i = 0; i < 40; i++) { const a = rn() * TAU, r = Math.sqrt(rn()) * rpx * 0.88; c.beginPath(); c.arc(cx + r * Math.cos(a), cy + r * Math.sin(a), rpx * (0.03 + rn() * 0.04), 0, TAU); c.fill(); }
                }
                const sun = clamp(3 + (0 + 2.3) / 5.6 * (maxR - 3), 2.5, maxR);
                if (Math.abs(sun - rpx) > 4) { c.strokeStyle = 'rgba(253,224,71,.5)'; c.setLineDash([3, 4]); c.beginPath(); c.arc(cx, cy, sun, 0, TAU); c.stroke(); c.setLineDash([]); label(c, 'Sol', cx + sun * 0.72 + 4, cy - sun * 0.72 - 4, 'rgba(253,224,71,.7)', F(600, 10)); }
            }
            /* interior */
            label(c, 'Interior (camadas fora de escala)', B.x + 10, B.y + 12, '#94a3b8', F(600, 10));
            const sh = shells(ph, s.u), ir = Math.min(B.h * 0.42, B.w * 0.26), ix = B.x + ir + 18, iy = B.y + B.h / 2 + 8;
            if (ph === 'ns' || ph === 'bh' || (ph === 'sn' && s.u > 0.25)) {
                const txt = ph === 'bh' ? ['O núcleo de ferro colapsou', 'num buraco negro.'] : ph === 'ns' ? ['Nêutrons espremidos:', 'uma colher de chá pesa', 'bilhões de toneladas.'] : ['O núcleo de ferro desaba', 'em menos de 1 segundo.'];
                txt.forEach((l, i) => label(c, l, B.x + B.w / 2, iy - 10 + i * 16, '#e2e8f0', F(600, 12), 'center'));
            } else {
                sh.forEach(([n, f], i) => {
                    const r = ir * f, colr = shellColor(n), burning = /→/.test(n);
                    c.fillStyle = colr; c.globalAlpha = burning ? 0.75 + 0.25 * Math.sin(performance.now() / 160 + i) : 0.55;
                    c.beginPath(); c.moveTo(ix, iy); c.arc(ix, iy, r, Math.PI / 2, Math.PI * 3 / 2); c.closePath(); c.fill(); c.globalAlpha = 1;
                    c.strokeStyle = 'rgba(5,7,15,.7)'; c.stroke();
                });
                c.strokeStyle = 'rgba(148,163,184,.4)'; c.beginPath(); c.moveTo(ix, iy - ir); c.lineTo(ix, iy + ir); c.stroke();
                const n = sh.length, gap = Math.min(16, (B.h - 30) / Math.max(1, n));
                sh.forEach(([nm, f], i) => {
                    const ly = iy - (n - 1) * gap / 2 + i * gap, lx = ix + 16, r = ir * f;
                    c.fillStyle = shellColor(nm); c.fillRect(lx, ly - 4, 8, 8);
                    label(c, nm, lx + 13, ly, '#e2e8f0', F(500, B.w < 300 ? 10 : 11));
                });
            }
        }
        function drawTimeline(c, tl, s) {
            const tr = track(), endAge = tr[tr.length - 1][3], x0 = tl.x + 12, w = tl.w - 24, y = tl.y + 10, h = 10;
            c.fillStyle = '#0b1020'; c.fillRect(tl.x, tl.y, tl.w, tl.h);
            const cols = { pre: '#9a3412', ms: '#fde047', sg: '#fb923c', rgb: '#ef4444', gap: '#fb923c', hb: '#f59e0b', agb: '#dc2626', pn: '#2dd4bf', wd: '#e2e8f0', rsg: '#ef4444', bsg: '#60a5fa', wr: '#a78bfa', sn: '#fff', ns: '#93c5fd', bh: '#000' };
            for (let k = 1; k < tr.length; k++) {
                const a = tr[k - 1][3] / endAge, b = tr[k][3] / endAge;
                c.fillStyle = cols[tr[k][2]] || '#64748b'; c.fillRect(x0 + a * w, y, Math.max(1, (b - a) * w), h);
            }
            const mx = x0 + clamp(s.age / 1e6 / endAge, 0, 1) * w;
            c.fillStyle = '#fff'; c.beginPath(); c.moveTo(mx, y - 3); c.lineTo(mx - 5, y - 9); c.lineTo(mx + 5, y - 9); c.closePath(); c.fill();
            c.fillRect(mx - 1, y - 2, 2, h + 4);
            label(c, 'linha do tempo em proporção real · 0 a ' + years(endAge * 1e6), x0, y + h + 9, '#94a3b8', F(500, 10));
        }
        function readout(s, T, L, Rr) {
            const tMS = { 0.5: 5.6e10, 1: 1e10, 2: 1.8e9, 5: 1.8e8, 15: 1.2e7, 40: 5e6 }[st.m];
            const off = s.ph === 'ns' || s.ph === 'bh' || s.ph === 'sn';
            $('#ev-out', root).innerHTML =
                cell('Fase', PHASE[s.ph], true) +
                cell('Idade', years(s.age), true) +
                cell('Temperatura', off ? '—' : nf(T, 0) + ' K') + cell('Luminosidade', off ? '—' : sci(L, 2, -2, 4) + ' L☉') +
                cell('Raio', off ? (s.ph === 'ns' ? 'cerca de 12 km' : s.ph === 'bh' ? 'horizonte de dezenas de km' : '—') : sci(Rr, 2, -2, 4) + ' R☉') +
                cell('Sequência principal', years(tMS)) +
                cell('Destino', FATE[st.m], true);
        }
        function setT(t) { st.t = clamp(t, 0, st.total); S('t').value = Math.round(st.t / st.total * 1000); }
        /* o laço desenha sempre (granulação, nebulosa, pulsar girando); só avança a vida quando st.playing */
        const anim = animator(cv, dt => {
            if (st.playing) { setT(st.t + dt * st.speed); if (st.t >= st.total) setPlaying(false); }
            draw();
        });
        function setPlaying(on) {
            if (on && st.t >= st.total) setT(0);
            st.playing = on;
            S('play').innerHTML = on ? '<i class="fa-solid fa-pause"></i> Pausar' : '<i class="fa-solid fa-play"></i> Viver';
        }
        function setMass(m) { st.m = m; st.total = totalDur(); setT(0); draw(); }
        root.querySelectorAll('input[name="ev-m"]').forEach(r => r.addEventListener('change', () => { setMass(+radio(root, 'ev-m')); setPlaying(true); }));
        S('t').addEventListener('input', () => { setPlaying(false); st.t = +S('t').value / 1000 * st.total; draw(); });
        S('play').addEventListener('click', () => setPlaying(!st.playing));
        S('reset').addEventListener('click', () => { setT(0); setPlaying(true); });
        S('speed').addEventListener('change', () => { st.speed = +S('speed').value; });
        S('ref').addEventListener('change', draw); S('rad').addEventListener('change', draw);
        cv.addEventListener('pointermove', e => {
            if (!geo || !S('ref').checked) return;
            const r = cv.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
            let best = null, bd = 14;
            NAMED.forEach(n => { const d = Math.hypot(geo.px(Math.log10(n[1])) - x, geo.py(Math.log10(n[2])) - y); if (d < bd) { bd = d; best = n; } });
            if (best !== st.hover) { st.hover = best; draw(); }
        });
        cv.addEventListener('pointerleave', () => { if (st.hover) { st.hover = null; draw(); } });
        if (window.ResizeObserver) new ResizeObserver(() => draw()).observe(cv);
        setMass(1); anim.start();
        return () => { draw(); anim.kick(); };
    }

    /* =====================================================================
       2. PULSAR E MAGNETAR: farol girando, curva de luz e som dos pulsos
       ===================================================================== */
    const PULSARS = [
        { id: 'crab', n: 'Caranguejo (PSR B0531+21)', P: 0.0337, Pd: 4.21e-13, a: 60, z: 78 },
        { id: 'vela', n: 'Vela (PSR B0833−45)', P: 0.0893, Pd: 1.25e-13, a: 50, z: 62 },
        { id: 'bell', n: 'O primeiro: PSR B1919+21', P: 1.3373, Pd: 1.35e-15, a: 35, z: 39 },
        { id: 'ms', n: 'Milissegundo: PSR J0437−4715', P: 0.005757, Pd: 5.73e-20, a: 40, z: 60 },
        { id: 'fast', n: 'O mais rápido: PSR J1748−2446ad', P: 0.001396, Pd: null, a: 45, z: 70 },
        { id: 'sgr1935', n: 'Magnetar SGR 1935+2154', P: 3.245, Pd: 1.43e-11, a: 40, z: 44, mag: true },
        { id: 'sgr1806', n: 'Magnetar SGR 1806−20', P: 7.6, Pd: 8.3e-11, a: 30, z: 33, mag: true },
        { id: 'custom', n: 'Personalizado' }
    ];
    function initPulsar(root) {
        root.innerHTML =
            '<div class="lab-grid">' +
              '<div class="lab-stage tall"><canvas id="pu-cv" aria-label="Estrela de nêutrons girando com feixes de radiação e curva de luz"></canvas>' +
                '<div class="stage-ui" style="right:10px;top:10px"><button class="btn small primary" id="pu-sound" type="button"><i class="fa-solid fa-volume-xmark"></i> Ouvir</button><button class="btn small" id="pu-quake" type="button" hidden><i class="fa-solid fa-burst"></i> Terremoto estelar</button></div>' +
              '</div>' +
              '<div class="lab-side">' +
                '<div class="ctl"><label for="pu-pre">Objeto</label><select id="pu-pre">' + PULSARS.map((p, i) => '<option value="' + i + '">' + p.n + '</option>').join('') + '</select></div>' +
                '<div class="ctl" id="pu-cust" hidden><label for="pu-P">Período <b id="pu-Pv"></b></label><input id="pu-P" type="range" min="0" max="1000" value="500">' +
                  '<label for="pu-Pd" style="margin-top:8px">Freio Ṗ <b id="pu-Pdv"></b></label><input id="pu-Pd" type="range" min="0" max="1000" value="500"></div>' +
                '<div class="ctl"><label for="pu-a">Inclinação do eixo magnético <b id="pu-av"></b></label><input id="pu-a" type="range" min="0" max="90" step="1"></div>' +
                '<div class="ctl"><label for="pu-z">Direção da Terra (ângulo com o eixo de rotação) <b id="pu-zv"></b></label><input id="pu-z" type="range" min="0" max="180" step="1"></div>' +
                '<div class="ctl seg" style="flex-wrap:wrap;gap:6px 12px;font-size:.84rem"><label><input type="checkbox" id="pu-field" checked> linhas de campo</label><label><input type="checkbox" id="pu-beam" checked> feixes</label></div>' +
                '<div class="readout" id="pu-out"></div>' +
              '</div>' +
            '</div>' +
            '<div class="lab-under">' +
              '<div class="lab-note"><strong>Leitura.</strong> O eixo de rotação é vertical; o eixo magnético, inclinado, gira em volta dele e arrasta os dois feixes. A Terra está na direção da seta à direita. Embaixo, a intensidade que chega à Terra durante duas voltas: um pico cada vez que um feixe passa por nós. Pulsares rápidos aparecem em câmera lenta; o som está sempre em tempo real.</div>' +
              '<div class="lab-note"><strong>Experimente.</strong> Ouça o Caranguejo (30 pulsos por segundo) e depois o mais rápido conhecido: os pulsos viram um tom contínuo. Afaste a direção da Terra do cone dos feixes até os pulsos sumirem: o pulsar continua lá, mas não o vemos. Escolha um magnetar e provoque um terremoto estelar.</div>' +
            '</div>';
        const S = k => $('#pu-' + k, root), cv = S('cv');
        const st = { i: 0, P: 0.0337, Pd: 4.21e-13, a: 60, z: 78, mag: false, phase: 0, quake: -99, clock: 0, sound: false };
        const KM = 12; /* raio da estrela de nêutrons (km) */
        const logP = v => Math.pow(10, -3 + v / 1000 * (Math.log10(12) + 3));   /* 1 ms a 12 s */
        const logPd = v => Math.pow(10, -20 + v / 1000 * 10);                  /* 10⁻²⁰ a 10⁻¹⁰ */
        const width = () => clamp(6.5 / Math.sqrt(st.P), 6, 32) * D2R;          /* meia-largura do feixe (relação empírica para rádio) */
        const tilt = 16 * D2R, ct = Math.cos(tilt), stl = Math.sin(tilt);
        /* câmera: rotação em torno do eixo x (vemos um pouco de cima) */
        const cam = v => [v[0], v[1] * ct - v[2] * stl, v[1] * stl + v[2] * ct];
        const obs = () => [Math.sin(st.z * D2R), Math.cos(st.z * D2R), 0];
        const magAxis = ph => { const a = st.a * D2R; return [Math.sin(a) * Math.cos(ph), Math.cos(a), Math.sin(a) * Math.sin(ph)]; };
        const dot = (u, v) => u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
        function intensity(ph) {
            const m = magAxis(ph), o = obs(), w = width();
            let I = 0;
            for (const sg of [1, -1]) { const b = Math.acos(clamp(sg * dot(m, o), -1, 1)); I += Math.exp(-2.3 * (b / w) * (b / w)) * (sg > 0 ? 1 : 0.6); }
            return I;
        }
        const peak = () => { let mx = 0; for (let k = 0; k < 360; k++) mx = Math.max(mx, intensity(k / 360 * TAU)); return mx; };
        const slow = () => st.P >= 1 ? 1 : 1.6 / st.P;

        /* ---- som: um período da curva de luz vira um trecho de ruído pulsado, repetido em laço ---- */
        let ac = null, src = null, gainNode = null;
        function buildBuffer() {
            const sr = ac.sampleRate, N = Math.max(32, Math.round(st.P * sr)), buf = ac.createBuffer(1, N, sr), d = buf.getChannelData(0);
            const fast = st.P < 0.02, mx = Math.max(0.02, peak());
            for (let i = 0; i < N; i++) {
                const I = intensity(i / N * TAU) / mx;
                d[i] = I > 0.02 ? (fast ? (Math.random() * 0.6 + 0.4) * Math.pow(I, 2) : (Math.random() * 2 - 1) * Math.pow(I, 1.5)) : 0;
            }
            return buf;
        }
        function startSound() {
            try {
                if (!ac) { ac = new (window.AudioContext || window.webkitAudioContext)(); gainNode = ac.createGain(); gainNode.gain.value = 0.35; gainNode.connect(ac.destination); }
                if (ac.state === 'suspended') ac.resume();
                stopSrc();
                if (peak() < 0.05) return;
                src = ac.createBufferSource(); src.buffer = buildBuffer(); src.loop = true; src.connect(gainNode); src.start();
            } catch (e) { st.sound = false; soundBtn(); }
        }
        function stopSrc() { if (src) { try { src.stop(); } catch (e) { /* já parado */ } src.disconnect(); src = null; } }
        function burstSound() {
            if (!st.sound || !ac) return;
            const sr = ac.sampleRate, N = Math.round(sr * 2.2), buf = ac.createBuffer(1, N, sr), d = buf.getChannelData(0);
            let lp = 0;
            for (let i = 0; i < N; i++) { const t = i / sr, env = t < 0.02 ? t / 0.02 : Math.exp(-(t - 0.02) * 2.4); lp += ((Math.random() * 2 - 1) - lp) * 0.18; d[i] = lp * env * 2.2 * (1 + 0.5 * Math.sin(TAU * t / st.P)); }
            const b = ac.createBufferSource(); b.buffer = buf; b.connect(gainNode); b.start();
        }
        function soundBtn() { S('sound').innerHTML = st.sound ? '<i class="fa-solid fa-volume-high"></i> Som ligado' : '<i class="fa-solid fa-volume-xmark"></i> Ouvir'; }
        function refreshSound() { if (st.sound) startSound(); }

        function draw() {
            const g = canvas2d(cv, '#04060d'); if (!g) return;
            const { c, W, H } = g, lcH = Math.round(H * 0.27), sh = H - lcH, cx = W * 0.45, cy = sh * 0.5;
            const sc = Math.min(W * 0.8, sh) * 0.5, Rs = sc * 0.16, ph = st.phase, now = st.clock;
            const qa = now - st.quake, quaking = qa >= 0 && qa < 3.5;
            const shake = quaking ? Math.max(0, 1 - qa / 1.2) * 6 : 0;
            const ox = cx + (Math.random() - 0.5) * shake, oy = cy + (Math.random() - 0.5) * shake;
            const P2 = v => { const q = cam(v); return [ox + q[0] * sc, oy - q[1] * sc, q[2]]; };
            /* fundo de estrelas */
            const rn = rng(5); for (let i = 0; i < 140; i++) { c.fillStyle = 'rgba(203,213,225,' + (0.15 + rn() * 0.5) + ')'; c.fillRect(rn() * W, rn() * sh, 1.2, 1.2); }
            if (quaking && qa < 1.6) { /* bola de fogo de raios gama */
                const r = 20 + qa * sc * 1.2, gr = c.createRadialGradient(ox, oy, 0, ox, oy, r);
                gr.addColorStop(0, 'rgba(255,255,255,' + 0.8 * (1 - qa / 1.6) + ')'); gr.addColorStop(0.4, 'rgba(196,181,253,' + 0.5 * (1 - qa / 1.6) + ')'); gr.addColorStop(1, 'rgba(139,92,246,0)');
                c.fillStyle = gr; c.fillRect(0, 0, W, sh);
            }
            /* eixo de rotação */
            const ax0 = P2([0, -1.25, 0]), ax1 = P2([0, 1.25, 0]);
            c.strokeStyle = 'rgba(148,163,184,.5)'; c.setLineDash([5, 5]); c.lineWidth = 1.2; c.beginPath(); c.moveTo(ax0[0], ax0[1]); c.lineTo(ax1[0], ax1[1]); c.stroke(); c.setLineDash([]);
            label(c, 'eixo de rotação', ax1[0] + 6, ax1[1] + 4, '#94a3b8', F(600, 10));
            /* direção da Terra */
            const o = obs(), e0 = P2(o.map(v => v * 0.35)), e1 = P2(o.map(v => v * 1.2));
            const I = intensity(ph), mx = Math.max(0.05, peak());
            c.strokeStyle = 'rgba(96,165,250,.35)'; c.setLineDash([2, 4]); c.beginPath(); c.moveTo(e0[0], e0[1]); c.lineTo(e1[0], e1[1]); c.stroke(); c.setLineDash([]);
            const ex = clamp(e1[0], 30, W - 30), ey = clamp(e1[1], 30, sh - 30), fl = clamp(I / mx, 0, 1);
            if (fl > 0.05) { const gr = c.createRadialGradient(ex, ey, 0, ex, ey, 34); gr.addColorStop(0, 'rgba(255,255,255,' + 0.85 * fl + ')'); gr.addColorStop(1, 'rgba(255,255,255,0)'); c.fillStyle = gr; c.beginPath(); c.arc(ex, ey, 34, 0, TAU); c.fill(); }
            c.fillStyle = '#2563eb'; c.beginPath(); c.arc(ex, ey, 9, 0, TAU); c.fill(); c.fillStyle = '#22c55e'; c.beginPath(); c.arc(ex - 2, ey - 2, 4, 0, TAU); c.fill();
            label(c, 'Terra', ex, ey + 18, '#93c5fd', F(700, 11), 'center');
            const m = magAxis(ph), w = width();
            /* feixes e linhas de campo, divididos atrás/na frente da estrela */
            const beams = [1, -1].map(sg => {
                const ax = m.map(v => v * sg), L = 1.3;
                const p1 = Math.abs(ax[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0];
                let u = [ax[1] * p1[2] - ax[2] * p1[1], ax[2] * p1[0] - ax[0] * p1[2], ax[0] * p1[1] - ax[1] * p1[0]]; const nu = Math.hypot(...u); u = u.map(v => v / nu);
                const vv = [ax[1] * u[2] - ax[2] * u[1], ax[2] * u[0] - ax[0] * u[2], ax[0] * u[1] - ax[1] * u[0]];
                const pts = [P2(ax.map(v => v * 0.16))], rr = L * Math.tan(w);
                for (let k = 0; k < 24; k++) { const t = k / 24 * TAU; pts.push(P2([0, 1, 2].map(j => ax[j] * L + rr * (Math.cos(t) * u[j] + Math.sin(t) * vv[j])))); }
                return { pts, tip: P2(ax.map(v => v * L)), base: pts[0], z: cam(ax)[2], sg };
            });
            const beamCol = st.mag ? '196,181,253' : '191,219,254';
            const drawBeam = b => {
                if (!S('beam').checked) return;
                const gr = c.createLinearGradient(b.base[0], b.base[1], b.tip[0], b.tip[1]);
                gr.addColorStop(0, 'rgba(' + beamCol + ',.7)'); gr.addColorStop(0.35, 'rgba(' + beamCol + ',.22)'); gr.addColorStop(1, 'rgba(' + beamCol + ',0)');
                c.fillStyle = gr; hullFill(c, b.pts.map(p => [p[0], p[1]]));
            };
            const lines = [];
            if (S('field').checked) {
                const nAz = st.mag ? 10 : 6, shells = st.mag ? [2.2, 3.6, 5.5] : [2.6, 4.4];
                const p1 = Math.abs(m[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0];
                let u = [m[1] * p1[2] - m[2] * p1[1], m[2] * p1[0] - m[0] * p1[2], m[0] * p1[1] - m[1] * p1[0]]; const nu = Math.hypot(...u); u = u.map(v => v / nu);
                const vv = [m[1] * u[2] - m[2] * u[1], m[2] * u[0] - m[0] * u[2], m[0] * u[1] - m[1] * u[0]];
                shells.forEach((Lf, si) => {
                    const th0 = Math.asin(Math.sqrt(1 / Lf));
                    for (let k = 0; k < nAz; k++) {
                        const pts = [];
                        for (let j = 0; j <= 40; j++) {
                            const th = th0 + (Math.PI - 2 * th0) * j / 40, r = 0.16 * Lf * Math.sin(th) ** 2;
                            const psi = k / nAz * TAU + (st.mag ? 0.6 * Math.sin(th) * (1 + (quaking ? 0.6 * Math.sin(qa * 18) * Math.max(0, 1 - qa / 2) : 0)) : 0);
                            const dir = [0, 1, 2].map(i => Math.cos(th) * m[i] + Math.sin(th) * (Math.cos(psi) * u[i] + Math.sin(psi) * vv[i]));
                            pts.push(P2(dir.map(v => v * r)));
                        }
                        lines.push({ pts, si });
                    }
                });
            }
            const fieldCol = st.mag ? (quaking ? '244,114,182' : '167,139,250') : '96,165,250';
            const drawLines = front => {
                c.lineWidth = st.mag ? 1.4 : 1;
                lines.forEach(l => {
                    c.strokeStyle = 'rgba(' + fieldCol + ',' + (st.mag ? 0.55 : 0.4) * (front ? 1 : 0.55) + ')'; c.beginPath(); let on = false;
                    l.pts.forEach(p => {
                        const hidden = !front && p[2] < 0 && Math.hypot(p[0] - ox, p[1] - oy) < Rs;
                        const want = front ? p[2] >= 0 : p[2] < 0;
                        if (want && !hidden) { on ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1]); on = true; } else on = false;
                    });
                    c.stroke();
                });
            };
            drawLines(false);
            beams.filter(b => b.z < 0).forEach(drawBeam);
            /* a estrela */
            const glow = c.createRadialGradient(ox, oy, Rs * 0.8, ox, oy, Rs * 2.6);
            glow.addColorStop(0, st.mag ? 'rgba(167,139,250,.45)' : 'rgba(147,197,253,.4)'); glow.addColorStop(1, 'rgba(147,197,253,0)');
            c.fillStyle = glow; c.beginPath(); c.arc(ox, oy, Rs * 2.6, 0, TAU); c.fill();
            const body = c.createRadialGradient(ox - Rs * 0.35, oy - Rs * 0.35, Rs * 0.1, ox, oy, Rs);
            body.addColorStop(0, '#f8fafc'); body.addColorStop(0.6, st.mag ? '#c4b5fd' : '#93c5fd'); body.addColorStop(1, st.mag ? '#4c1d95' : '#1e3a8a');
            c.fillStyle = body; c.beginPath(); c.arc(ox, oy, Rs, 0, TAU); c.fill();
            /* rachaduras na crosta durante o terremoto */
            if (quaking && qa < 2.5) {
                const rq = rng(Math.floor(st.quake * 10) + 3); c.strokeStyle = 'rgba(255,255,255,' + (1 - qa / 2.5) + ')'; c.lineWidth = 1.3;
                for (let i = 0; i < 7; i++) { let a = rq() * TAU, r = rq() * Rs * 0.5; c.beginPath(); c.moveTo(ox + r * Math.cos(a), oy + r * Math.sin(a)); for (let j = 0; j < 4; j++) { a += (rq() - 0.5) * 0.9; r = Math.min(Rs * 0.95, r + Rs * 0.15); c.lineTo(ox + r * Math.cos(a), oy + r * Math.sin(a)); } c.stroke(); }
            }
            /* polos magnéticos quentes */
            [1, -1].forEach(sg => { const q = cam(m.map(v => v * sg)); if (q[2] > -0.1) { c.fillStyle = 'rgba(255,255,255,' + (0.5 + 0.5 * clamp(q[2], 0, 1)) + ')'; c.beginPath(); c.ellipse(ox + q[0] * Rs * 0.92, oy - q[1] * Rs * 0.92, 4, 4 * Math.max(0.3, q[2]), Math.atan2(-q[1], q[0]), 0, TAU); c.fill(); } });
            drawLines(true);
            beams.filter(b => b.z >= 0).forEach(drawBeam);
            const ma = P2(m.map(v => v * 0.75));
            label(c, 'eixo magnético', ma[0] + 6, ma[1], st.mag ? '#c4b5fd' : '#93c5fd', F(600, 10));
            label(c, st.mag ? 'MAGNETAR' : 'PULSAR', 12, 16, st.mag ? '#c4b5fd' : '#93c5fd', F(800, 12));
            label(c, slow() > 1.01 ? 'câmera lenta: ' + sci(slow(), 2, 0, 6) + '× mais devagar' : 'tempo real', 12, 34, '#94a3b8', F(500, 11));
            if (quaking && qa < 3) label(c, 'explosão de raios gama!', W / 2, sh - 16, '#f9a8d4', F(800, 13), 'center');
            /* curva de luz */
            const y0 = sh, x0 = 44, x1 = W - 14, yb = H - 22, yt = y0 + 18;
            c.fillStyle = '#0b1020'; c.fillRect(0, y0, W, lcH);
            c.strokeStyle = 'rgba(148,163,184,.25)'; c.beginPath(); c.moveTo(x0, yb); c.lineTo(x1, yb); c.stroke();
            label(c, 'intensidade na Terra', 8, y0 + 10, '#94a3b8', F(600, 10));
            const norm = Math.max(0.05, mx);
            c.strokeStyle = st.mag ? '#c4b5fd' : '#7dd3fc'; c.lineWidth = 1.6; c.beginPath();
            for (let k = 0; k <= 400; k++) {
                const pp = k / 400 * 2 * TAU; let v = intensity(pp) / norm;
                const tq = (pp - ph) / TAU * st.P * slow(); /* tempo (animação) relativo ao instante atual */
                if (quaking) { const ta = qa + tq; if (ta > 0 && ta < 3) v += 6 * Math.exp(-ta * 2.2); }
                const x = x0 + k / 400 * (x1 - x0), y = yb - clamp(v, 0, 1.15) * (yb - yt);
                k ? c.lineTo(x, y) : c.moveTo(x, y);
            }
            c.stroke();
            const cxr = x0 + (ph / (2 * TAU)) * (x1 - x0);
            c.strokeStyle = 'rgba(244,114,182,.8)'; c.beginPath(); c.moveTo(cxr, yt - 6); c.lineTo(cxr, yb); c.stroke();
            label(c, 'duas voltas = ' + duration(2 * st.P), x1, yb + 11, '#94a3b8', F(500, 10), 'right');
            if (mx < 0.05) label(c, 'nenhum feixe passa pela Terra: não vemos pulsos', (x0 + x1) / 2, (yt + yb) / 2, '#fca5a5', F(700, 12), 'center');
            readout();
        }
        function readout() {
            const tau = st.Pd ? st.P / (2 * st.Pd) / 3.156e7 : null, B = st.Pd ? 3.2e15 * Math.sqrt(st.P * st.Pd) : null;
            const v = TAU * KM / st.P, rlc = 2.998e5 * st.P / TAU;
            $('#pu-out', root).innerHTML =
                cell('Período', duration(st.P)) + cell('Voltas por segundo', nf(1 / st.P, 1 / st.P < 10 ? 2 : 0)) +
                cell('Freio Ṗ (aumento do período)', st.Pd ? sci(st.Pd, 3) + ' s/s' : 'não medido') + cell('Idade característica', tau ? years(tau) : '—') +
                cell('Campo magnético', B ? sci(B, 2) + ' T' : '—') + cell('Velocidade no equador', sci(v, 3, 0, 6) + ' km/s' + (v > 3e4 ? ' (' + nf(v / 2998, 0) + '% de c)' : '')) +
                cell('Cilindro de luz (onde a rotação atingiria c)', sci(rlc, 3, 0, 6) + ' km', true);
        }
        function setPreset(i) {
            st.i = i; const p = PULSARS[i];
            S('cust').hidden = p.id !== 'custom';
            if (p.id !== 'custom') { st.P = p.P; st.Pd = p.Pd; st.a = p.a; st.z = p.z; st.mag = !!p.mag; }
            else { st.mag = false; S('P').value = Math.round((Math.log10(st.P) + 3) / (Math.log10(12) + 3) * 1000); S('Pd').value = Math.round(((st.Pd ? Math.log10(st.Pd) : -15) + 20) / 10 * 1000); fromCustom(); }
            S('a').value = st.a; S('z').value = st.z; S('quake').hidden = !st.mag; labels(); refreshSound(); draw();
        }
        function fromCustom() { st.P = logP(+S('P').value); st.Pd = logPd(+S('Pd').value); st.mag = st.P > 1.5 && st.Pd > 1e-12; S('quake').hidden = !st.mag; labels(); }
        function labels() { S('av').textContent = st.a + '°'; S('zv').textContent = st.z + '°'; S('Pv').textContent = duration(st.P); S('Pdv').textContent = sci(st.Pd, 2); }
        const anim = animator(cv, dt => { st.clock += dt; st.phase = (st.phase + dt * TAU / (st.P * slow())) % (4 * TAU); draw(); });
        S('pre').addEventListener('change', () => setPreset(+S('pre').value));
        S('P').addEventListener('input', () => { fromCustom(); refreshSound(); });
        S('Pd').addEventListener('input', () => { fromCustom(); });
        S('a').addEventListener('input', () => { st.a = +S('a').value; labels(); });
        S('z').addEventListener('input', () => { st.z = +S('z').value; labels(); });
        ['a', 'z'].forEach(k => S(k).addEventListener('change', refreshSound));
        S('sound').addEventListener('click', () => { st.sound = !st.sound; soundBtn(); if (st.sound) startSound(); else stopSrc(); });
        S('quake').addEventListener('click', () => { st.quake = st.clock; burstSound(); });
        /* o som para quando o simulador sai da tela */
        const stopIfHidden = () => { if (st.sound && !visible(cv)) { st.sound = false; stopSrc(); soundBtn(); } };
        document.addEventListener('visibilitychange', () => { if (document.hidden && st.sound) { st.sound = false; stopSrc(); soundBtn(); } });
        window.addEventListener('hashchange', () => setTimeout(stopIfHidden, 50));
        root.closest('.lab-panel') && new MutationObserver(stopIfHidden).observe(root.closest('.lab-panel'), { attributes: true, attributeFilter: ['class'] });
        if (window.ResizeObserver) new ResizeObserver(() => draw()).observe(cv);
        setPreset(0); anim.start();
        return () => { draw(); anim.kick(); };
    }

    /* =====================================================================
       3. BURACO NEGRO: traçado de raios de luz na métrica de Schwarzschild
       Unidades: raio de Schwarzschild r_s = 1. Equação da órbita da luz: u'' = −u + 1,5 u², com u = 1/r.
       ===================================================================== */
    const BH_MASS = [
        { n: '10 massas solares (buraco negro estelar)', M: 10 },
        { n: 'Sagitário A*: 4,3 milhões de massas solares', M: 4.3e6 },
        { n: 'Supermassivo de 100 milhões de massas solares', M: 1e8 },
        { n: 'M87*: 6,5 bilhões de massas solares', M: 6.5e9 }
    ];
    const RIN = 3, ROUT = 12, T0 = 4100;
    let SKY = null; /* céu de fundo em projeção equirretangular, gerado uma vez */
    function makeSky() {
        /* faixa da galáxia calculada em 1024 × 512 e ampliada; estrelas desenhadas em 2048 × 1024 */
        const SW = 2048, SH = 1024, LW = 1024, LH = 512, low = new Float32Array(LW * LH * 3), r = rng(1054);
        const P = new Uint8Array(512); for (let i = 0; i < 256; i++) P[i] = i;
        for (let i = 255; i > 0; i--) { const j = Math.floor(r() * (i + 1)); const t = P[i]; P[i] = P[j]; P[j] = t; }
        for (let i = 0; i < 256; i++) P[256 + i] = P[i];
        const hsh = (x, y, z) => P[P[P[x & 255] + (y & 255)] + (z & 255)] / 255;
        function vnoise(x, y, z) {
            const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z), xf = x - xi, yf = y - yi, zf = z - zi;
            const u = smooth(xf), v = smooth(yf), w = smooth(zf);
            const a = lerp(lerp(hsh(xi, yi, zi), hsh(xi + 1, yi, zi), u), lerp(hsh(xi, yi + 1, zi), hsh(xi + 1, yi + 1, zi), u), v);
            const b = lerp(lerp(hsh(xi, yi, zi + 1), hsh(xi + 1, yi, zi + 1), u), lerp(hsh(xi, yi + 1, zi + 1), hsh(xi + 1, yi + 1, zi + 1), u), v);
            return lerp(a, b, w);
        }
        const fbm = (x, y, z) => vnoise(x, y, z) * 0.5 + vnoise(2 * x, 2 * y, 2 * z) * 0.25 + vnoise(4 * x, 4 * y, 4 * z) * 0.15 + vnoise(8 * x, 8 * y, 8 * z) * 0.1;
        const tb = 0.55, nb = [Math.sin(tb), Math.cos(tb), 0];   /* normal do plano da faixa: a faixa passa atrás do buraco negro */
        const cc = [-0.35, 0.2, -0.91];                             /* direção da região mais brilhante da faixa */
        for (let j = 0; j < LH; j++) {
            const lat = (0.5 - (j + 0.5) / LH) * Math.PI, cl = Math.cos(lat), sl = Math.sin(lat);
            for (let i = 0; i < LW; i++) {
                const lon = ((i + 0.5) / LW - 0.5) * TAU, x = cl * Math.sin(lon), y = sl, z = -cl * Math.cos(lon);
                const k = (j * LW + i) * 3, lb = Math.asin(clamp(x * nb[0] + y * nb[1] + z * nb[2], -1, 1));
                let R = 2, G = 3, B = 8;
                if (Math.abs(lb) < 0.7) {
                    const n = fbm(x * 3 + 7, y * 3, z * 3), band = Math.exp(-(lb / 0.15) * (lb / 0.15)) * (0.25 + 0.95 * n);
                    const core = Math.exp(-Math.pow(Math.acos(clamp(x * cc[0] + y * cc[1] + z * cc[2], -1, 1)) / 0.8, 2));
                    const dust = 1 - 0.85 * Math.exp(-(lb / 0.05) * (lb / 0.05)) * fbm(x * 9, y * 9 + 3, z * 9) * 1.4;
                    const L = band * (0.5 + 1.3 * core) * Math.max(0, dust);
                    R += 120 * L; G += 100 * L; B += 88 * L;
                    const neb = fbm(x * 5 + 2, y * 5 + 9, z * 5);
                    if (neb > 0.6) { const q = (neb - 0.6) * 3 * band; R += 130 * q; G += 28 * q; B += 70 * q; }
                }
                low[k] = R; low[k + 1] = G; low[k + 2] = B;
            }
        }
        const img = new Float32Array(SW * SH * 3);
        for (let j = 0; j < SH; j++) for (let i = 0; i < SW; i++) { const a = (j * SW + i) * 3, b = ((j >> 1) * LW + (i >> 1)) * 3; img[a] = low[b]; img[a + 1] = low[b + 1]; img[a + 2] = low[b + 2]; }
        for (let s = 0; s < 9000; s++) {
            const zz = r() * 2 - 1, lon = r() * TAU - Math.PI, lat = Math.asin(zz), mag = Math.pow(r(), 7);
            const col = bb(2800 + Math.pow(r(), 1.5) * 20000), br = 50 + mag * 1100, i0 = Math.floor((lon / TAU + 0.5) * SW), j0 = clamp(Math.floor((0.5 - lat / Math.PI) * SH), 0, SH - 1);
            const k = (j0 * SW + i0) * 3;
            img[k] += col[0] / 255 * br; img[k + 1] += col[1] / 255 * br; img[k + 2] += col[2] / 255 * br;
            if (mag > 0.3) for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
                const q = ((clamp(j0 + dj, 0, SH - 1)) * SW + (i0 + di + SW) % SW) * 3;
                img[q] += col[0] / 255 * br * 0.3; img[q + 1] += col[1] / 255 * br * 0.3; img[q + 2] += col[2] / 255 * br * 0.3;
            }
        }
        const out = new Uint8ClampedArray(SW * SH * 3); for (let i = 0; i < out.length; i++) out[i] = img[i];
        return { SW, SH, px: out };
    }

    function initBuraco(root) {
        root.innerHTML =
            '<div class="lab-grid">' +
              '<div class="lab-stage tall"><canvas id="bh-cv" aria-label="Vista de um buraco negro com a luz das estrelas desviada e o disco de acreção"></canvas></div>' +
              '<div class="lab-side">' +
                '<div class="ctl"><label for="bh-m">Massa</label><select id="bh-m">' + BH_MASS.map((m, i) => '<option value="' + i + '">' + m.n + '</option>').join('') + '</select></div>' +
                '<div class="ctl"><label for="bh-d">Distância da câmera ao centro <b id="bh-dv"></b></label><input id="bh-d" type="range" min="0" max="1000" value="780"></div>' +
                '<div class="ctl"><label for="bh-el">Altura da câmera sobre o disco <b id="bh-elv"></b></label><input id="bh-el" type="range" min="2" max="85" value="9"></div>' +
                '<div class="ctl"><label>Olhar</label>' + seg('bh-look', [['in', 'para o buraco negro'], ['out', 'para fora']], 'in') + '</div>' +
                '<div class="ctl seg" style="flex-wrap:wrap;gap:6px 12px;font-size:.84rem"><label><input type="checkbox" id="bh-disk" checked> disco de acreção</label><label><input type="checkbox" id="bh-orbit" checked> câmera em órbita lenta</label></div>' +
                '<div style="display:flex;gap:6px;flex-wrap:wrap"><button class="btn small" id="bh-far" type="button">Ver de longe</button><button class="btn small" id="bh-near" type="button">Perto do horizonte</button><button class="btn small" id="bh-top" type="button">De cima</button></div>' +
                '<div class="readout" id="bh-out"></div>' +
              '</div>' +
            '</div>' +
            '<div class="lab-under">' +
              '<div class="lab-note"><strong>Leitura.</strong> Cada pixel é um raio de luz seguido de trás para a frente, da câmera até o céu, pela equação da relatividade geral para a luz em volta de um buraco negro sem rotação. A região escura é a <em>sombra</em>: raios que caem no horizonte. O disco parece dobrado por cima e por baixo da sombra porque vemos a parte de trás dele pela luz que contorna o buraco. Um lado é mais brilhante e azulado: o gás vem na nossa direção (efeito Doppler relativístico).</div>' +
              '<div class="lab-note"><strong>Experimente.</strong> Desligue o disco e veja a faixa da galáxia ao fundo formar um anel de Einstein. Aproxime-se do horizonte: o céu se comprime e o tempo passa cada vez mais devagar para você. Troque a massa: a imagem não muda (tudo escala com o raio de Schwarzschild), mas as marés mudam muito. As distâncias e o disco são calculados; as cores do disco são ilustrativas.</div>' +
            '</div>';
        const S = k => $('#bh-' + k, root), cv = S('cv');
        const st = { m: 0, D: 30, el: 9, yaw: 0, t: 0, gen: 0, look: 'in' };
        /* raio angular da sombra para um observador parado à distância D (em rₛ) */
        const shadowAngle = D => { const x = clamp(2.598 * Math.sqrt(1 - 1 / D) / D, 0, 1), a = Math.asin(x) / D2R; return D < 1.5 ? 180 - a : a; };
        const dFromV = v => Math.pow(10, Math.log10(1.1) + v / 1000 * (Math.log10(60) - Math.log10(1.1)));
        const vFromD = D => Math.round((Math.log10(D) - Math.log10(1.1)) / (Math.log10(60) - Math.log10(1.1)) * 1000);
        let buf = null; /* resultados por pixel */
        const off = document.createElement('canvas'), octx = off.getContext('2d');
        let prof = null, profMax = 1;
        const profile = r => Math.pow(r, -0.75) * Math.pow(Math.max(0, 1 - Math.sqrt(RIN / r)), 0.25);
        { let mx = 0; for (let r = RIN; r <= ROUT; r += 0.01) mx = Math.max(mx, profile(r)); profMax = mx; }
        /* textura do disco em (raio, ângulo): faixas alongadas na direção da órbita */
        const TR = 48, TA = 256, tex = new Float32Array(TR * TA);
        { const r = rng(3); for (let i = 0; i < TR; i++) { let v = 0; const row = new Float32Array(TA); for (let j = 0; j < TA * 2; j++) { v = v * 0.93 + (r() - 0.5) * 0.5; row[j % TA] = v; } for (let j = 0; j < TA; j++) tex[i * TA + j] = row[j]; }
          const t2 = tex.slice(); for (let i = 0; i < TR; i++) for (let j = 0; j < TA; j++) { let s = 0, n = 0; for (let d = -1; d <= 1; d++) { const ii = i + d; if (ii >= 0 && ii < TR) { s += t2[ii * TA + j]; n++; } } tex[i * TA + j] = 0.62 + 0.9 * s / n; } }

        function setup(W, H) {
            const scale = W > 900 ? 2.6 : W > 600 ? 2.3 : 2, w = Math.max(80, Math.round(W / scale)), h = Math.max(60, Math.round(H / scale)), n = w * h;
            buf = { w, h, n, src: new Int32Array(n).fill(-1), kind: new Uint8Array(n), dir: new Float32Array(n * 3),
                hit: new Uint8Array(n), r: new Float32Array(n), psi: new Float32Array(n), base: new Float32Array(n * 3), alpha: new Float32Array(n),
                pass: 0, cursor: 0, done: false, img: new ImageData(w, h), W, H };
            off.width = w; off.height = h;
            const el = st.el * D2R, D = st.D;
            const C = [0, Math.sin(el), Math.cos(el)], f = C.map(v => st.look === 'out' ? v : -v);
            let up = [0, 1, 0]; const k = up[0] * f[0] + up[1] * f[1] + up[2] * f[2]; up = up.map((v, i) => v - k * f[i]); const nu = Math.hypot(...up); up = up.map(v => v / nu);
            const right = [f[1] * up[2] - f[2] * up[1], f[2] * up[0] - f[0] * up[2], f[0] * up[1] - f[1] * up[0]];
            const th = shadowAngle(D), half = st.look === 'out' ? clamp(180 - th + 18, 30, 85) : clamp(th + 22, 25, 85);
            buf.cam = { C, f, up, right, E1: C, D, half: half * D2R };
        }
        const PASSES = [8, 4, 2, 1];
        function traceRay(i, j, out) {
            /* lente olho de peixe equidistante: o ângulo a partir do centro da imagem é proporcional à distância ao centro */
            const B = buf, cm = B.cam, px = (i + 0.5 - B.w / 2) / (B.h / 2), py = -(j + 0.5 - B.h / 2) / (B.h / 2), rr = Math.hypot(px, py), psi = rr * cm.half;
            const cs = Math.cos(psi), sn = rr > 1e-9 ? Math.sin(psi) / rr : 0;
            const dx = cs * cm.f[0] + sn * (px * cm.right[0] + py * cm.up[0]), dy = cs * cm.f[1] + sn * (px * cm.right[1] + py * cm.up[1]), dz = cs * cm.f[2] + sn * (px * cm.right[2] + py * cm.up[2]);
            const e1 = cm.E1, D = cm.D, cb = dx * e1[0] + dy * e1[1] + dz * e1[2];
            let e2x = dx - cb * e1[0], e2y = dy - cb * e1[1], e2z = dz - cb * e1[2];
            const sb = Math.hypot(e2x, e2y, e2z);
            out.hit = 0; out.kind = 1;
            if (sb < 1e-9) { if (cb < 0) { out.kind = 3; return; } out.dir = [e1[0], e1[1], e1[2]]; return; }
            e2x /= sb; e2y /= sb; e2z /= sb;
            const b = D * sb / Math.sqrt(1 - 1 / D);
            let u = 1 / D, w = (cb < 0 ? 1 : -1) * Math.sqrt(Math.max(0, 1 / (b * b) - u * u * (1 - u)));
            const uEsc = 1 / Math.max(2 * D, 150);
            let phi = 0, s0 = e1[1];
            for (let k = 0; k < 4000; k++) {
                const h = u > 0.25 ? 0.008 : u > 0.08 ? 0.02 : 0.05, up0 = u;
                /* RK4 de u'' = −u + 1,5 u² */
                const k1u = w, k1w = -u + 1.5 * u * u;
                const u2 = u + 0.5 * h * k1u, w2 = w + 0.5 * h * k1w, k2u = w2, k2w = -u2 + 1.5 * u2 * u2;
                const u3 = u + 0.5 * h * k2u, w3 = w + 0.5 * h * k2w, k3u = w3, k3w = -u3 + 1.5 * u3 * u3;
                const u4 = u + h * k3u, w4 = w + h * k3w, k4u = w4, k4w = -u4 + 1.5 * u4 * u4;
                u += h / 6 * (k1u + 2 * k2u + 2 * k3u + k4u); w += h / 6 * (k1w + 2 * k2w + 2 * k3w + k4w);
                phi += h;
                const cp = Math.cos(phi), sp = Math.sin(phi), s1 = cp * e1[1] + sp * e2y;
                if (!out.hit && s0 * s1 <= 0 && s0 !== s1) {
                    const t = s0 / (s0 - s1), uc = up0 + t * (u - up0), rc = 1 / uc;
                    if (uc > 0 && rc >= RIN && rc <= ROUT) {
                        const pc = phi - h + t * h, c2 = Math.cos(pc), s2 = Math.sin(pc);
                        const px = (c2 * e1[0] + s2 * e2x) * rc, pz = (c2 * e1[2] + s2 * e2z) * rc;
                        out.hit = 1; out.r = rc; out.psi = Math.atan2(-pz, px);
                        /* deslocamento de frequência: g = √(1 − 1,5/r) / (1 − Ω λ), λ = L_y/E do fóton */
                        const ny = e1[2] * e2x - e1[0] * e2z, lam = -b * ny, Om = Math.sqrt(0.5 / (rc * rc * rc));
                        out.g = Math.sqrt(1 - 1.5 / rc) / (1 - Om * lam);
                    }
                }
                s0 = s1;
                if (u >= 1) { out.kind = 3; return; }
                if (w < 0 && u < uEsc) {
                    const ir = 1 / u, wu = w / (u * u);
                    let vx = (-sp * e1[0] + cp * e2x) * ir - (cp * e1[0] + sp * e2x) * wu;
                    let vy = (-sp * e1[1] + cp * e2y) * ir - (cp * e1[1] + sp * e2y) * wu;
                    let vz = (-sp * e1[2] + cp * e2z) * ir - (cp * e1[2] + sp * e2z) * wu;
                    const vn = Math.hypot(vx, vy, vz); out.dir = [vx / vn, vy / vn, vz / vn]; return;
                }
            }
            out.kind = 3; /* preso perto da esfera de fótons */
        }
        function work(budget) {
            const B = buf, t0 = performance.now(), out = {};
            while (!B.done && performance.now() - t0 < budget) {
                const bs = PASSES[B.pass], cols = Math.ceil(B.w / bs), rows = Math.ceil(B.h / bs), total = cols * rows;
                for (let c2 = 0; c2 < 64 && B.cursor < total; c2++, B.cursor++) {
                    const i = (B.cursor % cols) * bs, j = Math.floor(B.cursor / cols) * bs, p = j * B.w + i;
                    if (B.src[p] !== p) {
                        traceRay(i, j, out);
                        B.kind[p] = out.kind;
                        if (out.kind === 1) { B.dir[p * 3] = out.dir[0]; B.dir[p * 3 + 1] = out.dir[1]; B.dir[p * 3 + 2] = out.dir[2]; }
                        B.hit[p] = out.hit;
                        if (out.hit) {
                            const pr = profile(out.r) / profMax, g = out.g, col = bb(g * T0 * Math.pow(pr, 0.5) + 1100), br = Math.pow(g, 3) * (0.25 + 0.9 * pr);
                            B.r[p] = out.r; B.psi[p] = out.psi; B.base[p * 3] = col[0] * br; B.base[p * 3 + 1] = col[1] * br; B.base[p * 3 + 2] = col[2] * br;
                            B.alpha[p] = clamp(pr * 2.2, 0, 1) * clamp((ROUT - out.r) / 2.5, 0, 1);
                        }
                    }
                    for (let dj = 0; dj < bs && j + dj < B.h; dj++) for (let di = 0; di < bs && i + di < B.w; di++) {
                        const q = (j + dj) * B.w + i + di;
                        if (B.src[q] !== q) B.src[q] = p;
                    }
                }
                if (B.cursor >= total) { B.pass++; B.cursor = 0; if (B.pass >= PASSES.length) B.done = true; }
            }
        }
        function render() {
            const B = buf, d = B.img.data, sky = SKY.px, SW = SKY.SW, SH = SKY.SH, disk = S('disk').checked;
            const cy = Math.cos(st.yaw), sy = Math.sin(st.yaw), tt = st.t;
            for (let p = 0; p < B.n; p++) {
                const q = B.src[p], o = p * 4;
                if (q < 0) { d[o] = d[o + 1] = d[o + 2] = 0; d[o + 3] = 255; continue; }
                let R = 0, G = 0, Bl = 0;
                if (B.kind[q] === 1) {
                    const x = B.dir[q * 3], y = B.dir[q * 3 + 1], z = B.dir[q * 3 + 2];
                    const xr = x * cy - z * sy, zr = x * sy + z * cy;
                    let ii = Math.floor((Math.atan2(xr, -zr) / TAU + 0.5) * SW); if (ii >= SW) ii -= SW; if (ii < 0) ii += SW;
                    const jj = clamp(Math.floor((0.5 - Math.asin(clamp(y, -1, 1)) / Math.PI) * SH), 0, SH - 1), k = (jj * SW + ii) * 3;
                    R = sky[k]; G = sky[k + 1]; Bl = sky[k + 2];
                }
                if (disk && B.hit[q]) {
                    const r = B.r[q], a = B.alpha[q], ri = clamp(Math.floor((r - RIN) / (ROUT - RIN) * (TR - 1)), 0, TR - 1);
                    const om = 0.9 * Math.pow(RIN / r, 1.5);
                    let ai = Math.floor(((B.psi[q] - om * tt) / TAU % 1 + 1) * TA) % TA;
                    const tv = tex[ri * TA + ai];
                    R = R * (1 - a) + B.base[q * 3] * tv * a; G = G * (1 - a) + B.base[q * 3 + 1] * tv * a; Bl = Bl * (1 - a) + B.base[q * 3 + 2] * tv * a;
                }
                d[o] = R > 255 ? 255 : R; d[o + 1] = G > 255 ? 255 : G; d[o + 2] = Bl > 255 ? 255 : Bl; d[o + 3] = 255;
            }
            octx.putImageData(B.img, 0, 0);
        }
        function draw() {
            const g = canvas2d(cv, '#000'); if (!g) return;
            const { c, W, H } = g;
            if (!SKY) { label(c, 'Gerando o céu de fundo…', W / 2, H / 2, '#cbd5e1', F(600, 13), 'center'); setTimeout(() => { SKY = SKY || makeSky(); draw(); }, 30); return; }
            if (!buf || buf.W !== W || buf.H !== H || buf.gen !== st.gen) { setup(W, H); buf.gen = st.gen; }
            if (!buf.done) work(anim.on ? 14 : 60);
            render();
            c.imageSmoothingEnabled = true; c.imageSmoothingQuality = 'high'; c.drawImage(off, 0, 0, W, H);
            if (S('disk').checked && 'filter' in c) { /* brilho difuso em volta das partes mais quentes */
                c.save(); c.filter = 'blur(' + Math.round(W / 90) + 'px)'; c.globalCompositeOperation = 'lighter'; c.globalAlpha = 0.45; c.drawImage(off, 0, 0, W, H); c.restore();
            }
            if (!buf.done) {
                const tot = PASSES.length, pr = (buf.pass + buf.cursor / Math.max(1, Math.ceil(buf.w / PASSES[buf.pass] || 1) * Math.ceil(buf.h / (PASSES[buf.pass] || 1)))) / tot;
                c.fillStyle = 'rgba(15,23,42,.8)'; c.fillRect(12, H - 30, 220, 18); c.fillStyle = '#818cf8'; c.fillRect(14, H - 28, 216 * clamp(pr, 0, 1), 14);
                label(c, 'calculando a trajetória da luz…', 122, H - 21, '#fff', F(600, 10), 'center');
            }
            const M = BH_MASS[st.m].M, rsKm = 2.953 * M;
            label(c, 'câmera a ' + nf(st.D, st.D < 3 ? 2 : 1) + ' rₛ (' + distKm(st.D * rsKm) + ')', 12, 16, '#e2e8f0', F(700, 12));
            label(c, 'rₛ = ' + distKm(rsKm), 12, 34, '#94a3b8', F(500, 11));
            readout();
        }
        const distKm = km => km < 1e6 ? sci(km, 3, 0, 6) + ' km' : sci(km / 1.496e8, 3, -2, 5) + ' UA';
        function readout() {
            const M = BH_MASS[st.m].M, D = st.D, rs = 2953 * M, r = D * rs, GM = 1.327e20 * M;
            const slowT = 1 / Math.sqrt(1 - 1 / D), tide = 2 * GM * 2 / (r * r * r), vesc = Math.sqrt(1 / D);
            const verdict = tide > 1e4 ? 'esticado como espaguete' : tide > 100 ? 'ferimentos graves' : tide > 10 ? 'desconfortável' : tide > 0.1 ? 'perceptível' : 'imperceptível';
            const orbit = D < 1.5 ? 'nenhuma órbita possível: só parado com foguetes' : D < 3 ? 'órbita circular só instável' : 'órbita circular estável possível';
            const Pisco = TAU * Math.sqrt(Math.pow(3 * rs, 3) / GM);
            $('#bh-out', root).innerHTML =
                cell('1 hora para você equivale, lá longe, a', duration(3600 * slowT), true) +
                cell('Sombra no seu céu', 'cerca de ' + nf(2 * shadowAngle(D), 0) + '° de diâmetro') + cell('Velocidade de escape', nf(vesc * 100, vesc > 0.9 ? 1 : 0) + '% de c') +
                cell('Órbita', orbit) +
                cell('Maré num corpo de 2 m', sci(tide, 2, -2, 4) + ' m/s² (' + verdict + ')', true) +
                cell('Uma volta na borda interna do disco', duration(Pisco), true);
            S('dv').textContent = nf(D, D < 3 ? 2 : 1) + ' rₛ';
            S('elv').textContent = st.el + '°';
        }
        const anim = animator(cv, dt => { st.t += dt * 2.2; if (S('orbit').checked) st.yaw += dt * 0.04; draw(); });
        function regen() { st.gen++; draw(); }
        S('m').addEventListener('change', () => { st.m = +S('m').value; draw(); });
        S('d').addEventListener('input', () => { st.D = dFromV(+S('d').value); regen(); });
        S('el').addEventListener('input', () => { st.el = +S('el').value; regen(); });
        S('disk').addEventListener('change', draw);
        const go = (D, el, look) => { st.D = D; st.el = el; st.look = look; root.querySelector('input[name="bh-look"][value="' + look + '"]').checked = true; S('d').value = vFromD(D); S('el').value = el; regen(); };
        S('far').addEventListener('click', () => go(25, 9, 'in'));
        S('near').addEventListener('click', () => go(1.3, 6, 'out'));
        S('top').addEventListener('click', () => go(22, 70, 'in'));
        root.querySelectorAll('input[name="bh-look"]').forEach(el => el.addEventListener('change', () => { st.look = radio(root, 'bh-look'); regen(); }));
        if (window.ResizeObserver) new ResizeObserver(() => draw()).observe(cv);
        st.D = dFromV(+S('d').value);
        anim.start();
        return () => { draw(); anim.kick(); };
    }

    /* =====================================================================
       4. GALÁXIA E MATÉRIA ESCURA: rotação de uma espiral parecida com a Via Láctea
       Unidades internas: kpc, km/s; G = 4,30091 × 10⁻⁶ kpc (km/s)² / M☉; 1 kpc/(km/s) = 977,8 milhões de anos.
       ===================================================================== */
    function initGalaxia(root) {
        const G = 4.30091e-6, KLY = 3.2616, TU = 977.8;
        const Mb = 1.5e10, ab = 0.6, Md = 6e10, Rd = 2.8, v0 = 238, rc = 5;
        const Mvis = r => Mb * r * r / ((r + ab) * (r + ab)) + Md * (1 - (1 + r / Rd) * Math.exp(-r / Rd));
        const vVis = r => Math.sqrt(G * Mvis(r) / Math.max(r, 1e-3));
        const vHalo2 = r => v0 * v0 * (1 - (rc / r) * Math.atan(r / rc));
        const vTot = r => Math.sqrt(vVis(r) * vVis(r) + vHalo2(Math.max(r, 1e-3)));
        const RMAX = 60 / KLY; /* 60 mil anos-luz */
        root.innerHTML =
            '<div class="lab-grid">' +
              '<div class="lab-stage tall"><canvas id="ga-cv" aria-label="Galáxia espiral girando e a curva de rotação"></canvas></div>' +
              '<div class="lab-side">' +
                '<div class="ctl"><label>Qual gravidade age nas estrelas</label>' + seg('ga-mode', [['dm', 'matéria visível + halo de matéria escura'], ['vis', 'só a matéria visível'], ['fly', 'velocidades medidas, sem o halo']], 'dm') + '</div>' +
                '<div style="display:flex;gap:6px;flex-wrap:wrap"><button class="btn small primary" id="ga-play" type="button"><i class="fa-solid fa-pause"></i> Pausar</button><button class="btn small" id="ga-reset" type="button"><i class="fa-solid fa-rotate-left"></i> Recomeçar</button>' +
                '<select id="ga-speed" class="plain-in" aria-label="Velocidade" style="width:auto"><option value="20">20 milhões de anos/s</option><option value="50" selected>50 milhões de anos/s</option><option value="120">120 milhões de anos/s</option></select></div>' +
                '<div class="ctl"><label for="ga-r">Raio analisado <b id="ga-rv"></b></label><input id="ga-r" type="range" min="2" max="60" step="1" value="26"></div>' +
                '<div class="readout" id="ga-out"></div>' +
              '</div>' +
            '</div>' +
            '<div class="lab-under">' +
              '<div class="lab-note"><strong>Leitura.</strong> Em cima (ou à esquerda), a galáxia vista de cima, girando; o Sol está marcado. As estrelas jovens e azuis acendem nos braços espirais, que são ondas de densidade: as estrelas atravessam os braços. No gráfico, a velocidade de órbita contra a distância ao centro: os pontos são medidas; a curva contínua inclui o halo de matéria escura; a tracejada é o que a matéria visível sozinha explicaria.</div>' +
              '<div class="lab-note"><strong>Experimente.</strong> Escolha "velocidades medidas, sem o halo": as estrelas têm as velocidades que medimos, mas só a gravidade da matéria visível. As estrelas de fora escapam e a galáxia se desmancha. É o argumento de Vera Rubin: tem de haver massa invisível segurando tudo. O modelo de massa é uma aproximação da Via Láctea.</div>' +
            '</div>';
        const S = k => $('#ga-' + k, root), cv = S('cv');
        const st = { mode: 'dm', t: 0, speed: 50, playing: true, rSel: 26 / KLY };
        let stars = [];
        function build() {
            const r = rng(77); stars = [];
            const N = 4200, tanp = Math.tan(13 * D2R), Rdv = 3.6;
            for (let i = 0; i < N; i++) {
                let R, th, type;
                const q = r();
                if (q < 0.14) { R = Math.abs(gauss(r)) * 0.9 + 0.05; th = r() * TAU; type = 0; }
                else {
                    do { R = -Rdv * Math.log(1 - r() * 0.995); } while (R > RMAX * 0.98 || R < 0.4);
                    if (q < 0.62) { type = 2; const arm = r() < 0.5 ? 0 : Math.PI; th = -Math.log(R / 1.2) / tanp + arm + gauss(r) * 0.22; }
                    else { type = 1; th = r() * TAU; }
                }
                const col = type === 0 ? bb(3600 + r() * 1500) : type === 1 ? bb(4200 + r() * 2500) : (r() < 0.12 ? [255, 120, 180] : bb(9000 + r() * 15000));
                stars.push({ R0: R, th0: th, type, col, size: type === 2 ? 1.6 + r() * 1.4 : 1.1 + r() * 0.9, R, vr: 0, th, L: 0 });
            }
            stars.push({ R0: 8.0, th0: 0.6, type: 9, col: [253, 224, 71], size: 3, R: 8.0, vr: 0, th: 0.6, L: 0 });
            reset();
        }
        function reset() {
            st.t = 0;
            stars.forEach(s => { s.R = s.R0; s.th = s.th0; s.vr = 0; s.L = s.R0 * vTot(s.R0); });
        }
        const vMode = r => st.mode === 'vis' ? vVis(r) : vTot(r);
        function step(dtMyr) {
            const dt = dtMyr / TU;
            if (st.mode !== 'fly') { stars.forEach(s => { s.th += vMode(s.R) / s.R * dt; }); return; }
            const n = Math.max(1, Math.ceil(dt / 0.004)), h = dt / n;
            for (const s of stars) for (let k = 0; k < n; k++) {
                const R = s.R, a = s.L * s.L / (R * R * R) - G * Mvis(R) / (R * R);
                s.vr += a * h; s.R = Math.max(0.05, R + s.vr * h); s.th += s.L / (s.R * s.R) * h;
            }
        }
        function draw() {
            const g = canvas2d(cv, '#03050c'); if (!g) return;
            const { c, W, H } = g, wide = W >= 700;
            const A = wide ? { x: 0, y: 0, w: W * 0.56, h: H } : { x: 0, y: 0, w: W, h: H * 0.58 };
            const P = wide ? { x: W * 0.56, y: 0, w: W * 0.44, h: H } : { x: 0, y: H * 0.58, w: W, h: H * 0.42 };
            const cx = A.x + A.w / 2, cy = A.y + A.h / 2, sc = Math.min(A.w, A.h) * 0.48 / (40 / KLY); /* a vista mostra 40 mil anos-luz de raio */
            /* halo de matéria escura (insinuado) */
            if (st.mode === 'dm') { const gr = c.createRadialGradient(cx, cy, 0, cx, cy, RMAX * sc * 1.05); gr.addColorStop(0, 'rgba(129,140,248,.10)'); gr.addColorStop(1, 'rgba(129,140,248,0)'); c.fillStyle = gr; c.fillRect(A.x, A.y, A.w, A.h); }
            const bulge = c.createRadialGradient(cx, cy, 0, cx, cy, 2.2 * sc);
            bulge.addColorStop(0, 'rgba(255,228,180,.85)'); bulge.addColorStop(1, 'rgba(255,200,140,0)');
            c.fillStyle = bulge; c.beginPath(); c.arc(cx, cy, 2.2 * sc, 0, TAU); c.fill();
            const tanp = Math.tan(13 * D2R), Om_p = 25 * (st.t / TU); /* padrão dos braços gira a 25 km/s/kpc */
            c.globalCompositeOperation = 'lighter';
            if (st.mode !== 'fly') { /* gás brilhante ao longo dos braços */
                c.lineCap = 'round';
                for (const arm of [0, Math.PI]) for (const [w, al] of [[16, 0.035], [7, 0.06]]) {
                    c.strokeStyle = 'rgba(147,197,253,' + al + ')'; c.lineWidth = w; c.beginPath();
                    for (let k = 0; k <= 80; k++) { const R = 1.4 + k / 80 * 11, th = -Math.log(R / 1.2) / tanp + arm + Om_p, x = cx + R * sc * Math.cos(th), y = cy - R * sc * Math.sin(th); k ? c.lineTo(x, y) : c.moveTo(x, y); }
                    c.stroke();
                }
            }
            let sun = null;
            for (const s of stars) {
                if (s.type === 9) { sun = s; continue; }
                const x = cx + s.R * sc * Math.cos(s.th), y = cy - s.R * sc * Math.sin(s.th);
                if (x < A.x - 4 || x > A.x + A.w + 4 || y < A.y - 4 || y > A.y + A.h + 4) continue;
                let a = s.type === 0 ? 0.55 : s.type === 1 ? 0.45 : 0.15;
                if (s.type === 2 && st.mode !== 'fly') {
                    const arm = -Math.log(Math.max(s.R, 0.3) / 1.2) / tanp + Om_p;
                    let d = ((s.th - arm) % Math.PI + Math.PI) % Math.PI; d = Math.min(d, Math.PI - d);
                    a = 0.12 + 0.95 * Math.exp(-Math.pow(d * s.R / 1.0, 2));
                } else if (s.type === 2) a = 0.45;
                c.fillStyle = rgba(s.col, a); c.fillRect(x - s.size / 2, y - s.size / 2, s.size, s.size);
            }
            c.globalCompositeOperation = 'source-over';
            if (sun) {
                const x = cx + sun.R * sc * Math.cos(sun.th), y = cy - sun.R * sc * Math.sin(sun.th);
                if (x > A.x && x < A.x + A.w && y > A.y && y < A.y + A.h) {
                    c.strokeStyle = 'rgba(253,224,71,.3)'; c.lineWidth = 1; c.setLineDash([3, 5]); c.beginPath(); c.arc(cx, cy, 8 * sc, 0, TAU); c.stroke(); c.setLineDash([]);
                    c.fillStyle = '#fde047'; c.beginPath(); c.arc(x, y, 3.2, 0, TAU); c.fill(); label(c, 'Sol', x + 7, y - 7, '#fde047', F(700, 11));
                }
            }
            c.strokeStyle = 'rgba(244,114,182,.55)'; c.lineWidth = 1.2; c.setLineDash([3, 5]); c.beginPath(); c.arc(cx, cy, st.rSel * sc, 0, TAU); c.stroke(); c.setLineDash([]);
            /* escala */
            const sb = 20 / KLY * sc; c.strokeStyle = '#cbd5e1'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(A.x + 14, A.y + A.h - 16); c.lineTo(A.x + 14 + sb, A.y + A.h - 16); c.stroke();
            label(c, '20 mil anos-luz', A.x + 14 + sb / 2, A.y + A.h - 28, '#cbd5e1', F(600, 10), 'center');
            label(c, 'tempo: ' + nf(st.t, 0) + ' milhões de anos · voltas do Sol: ' + nf(st.t / (TAU * 8 / vTot(8) * TU), 1), A.x + 12, A.y + 14, '#e2e8f0', F(600, 11));
            if (st.mode === 'fly') { const out = stars.filter(s => s.R > RMAX).length; label(c, 'estrelas que escaparam do quadro: ' + nf(out / stars.length * 100, 0) + '%', A.x + 12, A.y + 32, '#fca5a5', F(700, 11)); }
            drawCurve(c, P);
            readout();
        }
        function drawCurve(c, P) {
            const ml = 46, mr = 14, mt = 26, mb = 34, x0 = P.x + ml, x1 = P.x + P.w - mr, y0 = P.y + P.h - mb, y1 = P.y + mt;
            c.fillStyle = '#070b16'; c.fillRect(P.x, P.y, P.w, P.h);
            const X = r => x0 + r / RMAX * (x1 - x0), Y = v => y0 - v / 300 * (y0 - y1);
            c.strokeStyle = 'rgba(148,163,184,.12)'; c.lineWidth = 1;
            for (let v = 0; v <= 300; v += 50) { c.beginPath(); c.moveTo(x0, Y(v)); c.lineTo(x1, Y(v)); c.stroke(); label(c, String(v), x0 - 6, Y(v), '#94a3b8', F(500, 10, true), 'right'); }
            for (let k = 0; k <= 60; k += 20) { const x = X(k / KLY); c.beginPath(); c.moveTo(x, y0); c.lineTo(x, y1); c.stroke(); label(c, String(k), x, y0 + 11, '#94a3b8', F(500, 10, true), 'center'); }
            label(c, 'distância ao centro (mil anos-luz)', (x0 + x1) / 2, P.y + P.h - 9, '#cbd5e1', F(600, 11), 'center');
            label(c, 'velocidade de órbita (km/s)', P.x + 8, P.y + 12, '#cbd5e1', F(600, 11));
            const curve = (fn, col, dash, w) => { c.strokeStyle = col; c.lineWidth = w; c.setLineDash(dash || []); c.beginPath(); for (let k = 1; k <= 200; k++) { const r = k / 200 * RMAX; k > 1 ? c.lineTo(X(r), Y(fn(r))) : c.moveTo(X(r), Y(fn(r))); } c.stroke(); c.setLineDash([]); };
            curve(r => vHalo2(r) > 0 ? Math.sqrt(vHalo2(r)) : 0, 'rgba(129,140,248,.45)', [2, 3], 1.2);
            curve(vVis, st.mode === 'vis' ? '#fbbf24' : 'rgba(251,191,36,.7)', [6, 4], st.mode === 'vis' ? 2.6 : 1.8);
            curve(vTot, st.mode !== 'vis' ? '#34d399' : 'rgba(52,211,153,.6)', null, st.mode !== 'vis' ? 2.6 : 1.8);
            const rn = rng(9);
            for (let k = 0; k < 24; k++) {
                const rr = 1 + k * 0.72, v = vTot(rr) + gauss(rn) * 6, e = 6 + rr * 0.6;
                if (rr > RMAX) break;
                c.strokeStyle = 'rgba(226,232,240,.55)'; c.beginPath(); c.moveTo(X(rr), Y(v - e)); c.lineTo(X(rr), Y(v + e)); c.stroke();
                c.fillStyle = '#e2e8f0'; c.beginPath(); c.arc(X(rr), Y(v), 2.4, 0, TAU); c.fill();
            }
            const xs = X(st.rSel); c.strokeStyle = 'rgba(244,114,182,.7)'; c.beginPath(); c.moveTo(xs, y0); c.lineTo(xs, y1); c.stroke();
            const lx = x1 - 4; let ly = y1 + 10;
            [['medidas', '#e2e8f0'], ['com matéria escura', '#34d399'], ['só matéria visível', '#fbbf24'], ['contribuição do halo', '#818cf8']].forEach(([t, col]) => { label(c, t, lx, ly, col, F(600, 10), 'right'); ly += 14; });
        }
        function readout() {
            const r = st.rSel, vv = vVis(r), vt = vTot(r), Mv = Mvis(r), Mt = vt * vt * r / G;
            $('#ga-out', root).innerHTML =
                cell('Velocidade medida', nf(vt, 0) + ' km/s') + cell('Só com a matéria visível', nf(vv, 0) + ' km/s') +
                cell('Massa visível dentro do raio', sci(Mv, 2) + ' M☉') + cell('Massa necessária', sci(Mt, 2) + ' M☉') +
                cell('Fração que é matéria escura', nf(Math.max(0, 1 - Mv / Mt) * 100, 0) + '%') + cell('Uma volta nesse raio', years(TAU * r / vt * TU * 1e6)) +
                cell('Velocidade de escape sem o halo', nf(Math.sqrt(2 * G * Mv / r), 0) + ' km/s' + (vt > Math.sqrt(2 * G * Mv / r) ? ' (menor que a medida: a estrela escaparia)' : ''), true);
            S('rv').textContent = nf(r * KLY, 0) + ' mil anos-luz';
        }
        const anim = animator(cv, dt => { if (st.playing) { const d = dt * st.speed; st.t += d; step(d); } draw(); });
        root.querySelectorAll('input[name="ga-mode"]').forEach(el => el.addEventListener('change', () => { st.mode = radio(root, 'ga-mode'); reset(); draw(); }));
        S('play').addEventListener('click', () => { st.playing = !st.playing; S('play').innerHTML = st.playing ? '<i class="fa-solid fa-pause"></i> Pausar' : '<i class="fa-solid fa-play"></i> Girar'; });
        S('reset').addEventListener('click', () => { reset(); draw(); });
        S('speed').addEventListener('change', () => { st.speed = +S('speed').value; });
        S('r').addEventListener('input', () => { st.rSel = +S('r').value / KLY; draw(); });
        if (window.ResizeObserver) new ResizeObserver(() => draw()).observe(cv);
        build(); anim.start();
        return () => { draw(); anim.kick(); };
    }

    /* =====================================================================
       5. UNIVERSO EM EXPANSÃO: lei de Hubble, desvio para o vermelho, linha do tempo e destino
       Equações de Friedmann com matéria, radiação, curvatura e energia escura de equação de estado w.
       ===================================================================== */
    const LCDM = { Om: 0.315, OL: 0.685, Or: 9.1e-5, w: -1 };
    const Hgyr = H0 => H0 / 977.8; /* km/s/Mpc → 1/bilhão de anos */
    function Ez2(a, p) { const Ok = 1 - p.Om - p.OL - p.Or; return p.Or / (a * a * a * a) + p.Om / (a * a * a) + Ok / (a * a) + p.OL * Math.pow(a, -3 * (1 + p.w)); }
    /* tabela idade × tamanho para o modelo padrão (integral de da / (a H) em ln a) */
    function ageTable(H0) {
        const h = Hgyr(H0), T = [], n = 6000, l0 = -30, l1 = Math.log(3);
        let t = 0, prev = null;
        for (let i = 0; i <= n; i++) {
            const la = l0 + (l1 - l0) * i / n, a = Math.exp(la), f = 1 / (h * Math.sqrt(Ez2(a, LCDM)));
            if (prev !== null) t += 0.5 * (f + prev) * (l1 - l0) / n; else t = f / 2; /* t ≈ a²/(2H√Ωr) perto de a → 0 */
            prev = f; T.push([t, a]);
        }
        return T;
    }
    function initExpansao(root) {
        const EVENTS = [
            [1 / 3.156e7 * 0.5, 3 / 3.156e7, '1 segundo: os neutrinos deixam de interagir com o resto da matéria.'],
            [3 / 3.156e7, 180 / 3.156e7, 'Prótons e nêutrons se encontram, mas os núcleos ainda se desfazem: está quente demais.'],
            [180 / 3.156e7, 1200 / 3.156e7, '3 a 20 minutos: nucleossíntese. Formam-se o hélio, o deutério e um pouco de lítio.'],
            [1200 / 3.156e7, 3.5e5, 'Plasma opaco de núcleos, elétrons e luz: a luz não consegue viajar.'],
            [3.5e5, 4.2e5, '380 mil anos: recombinação. Formam-se os átomos e o universo fica transparente: é a luz da radiação cósmica de fundo.'],
            [4.2e5, 1e8, 'Idade das trevas: só gás frio e a radiação de fundo esfriando. Ainda não há estrelas.'],
            [1e8, 2.6e8, 'Entre 100 e 200 milhões de anos: acendem-se as primeiras estrelas.'],
            [2.6e8, 3.2e8, 'Cerca de 280 milhões de anos: a galáxia MoM-z14, uma das mais distantes já confirmadas.'],
            [3.2e8, 1.2e9, 'A luz das primeiras galáxias reioniza o gás entre elas; galáxias crescem e se fundem.'],
            [1.2e9, 9.0e9, 'Galáxias, aglomerados e a teia cósmica se formam.'],
            [9.0e9, 9.5e9, '9,2 bilhões de anos: nasce o Sol.'],
            [9.5e9, 1.36e10, 'A expansão passou a acelerar há cerca de 5 bilhões de anos: a energia escura domina.'],
            [1.36e10, 2e10, 'Hoje: 13,8 bilhões de anos.']
        ];
        root.innerHTML =
            '<div class="lab-grid">' +
              '<div class="lab-stage tall"><canvas id="ex-cv" aria-label="Universo em expansão"></canvas></div>' +
              '<div class="lab-side">' +
                '<div class="ctl"><label>Modo</label>' + seg('ex-mode', [['gal', 'galáxias'], ['hist', 'linha do tempo'], ['dest', 'destino']], 'gal') + '</div>' +
                '<div class="ctl"><label for="ex-h">Constante de Hubble H₀ <b id="ex-hv"></b></label><input id="ex-h" type="range" min="50" max="90" step="0.1" value="67.4"></div>' +
                '<div id="ex-pgal">' +
                  '<div style="display:flex;gap:6px;flex-wrap:wrap"><button class="btn small primary" id="ex-play" type="button"><i class="fa-solid fa-pause"></i> Pausar</button><button class="btn small" id="ex-light" type="button"><i class="fa-solid fa-wave-square"></i> Enviar luz</button><button class="btn small" id="ex-restart" type="button"><i class="fa-solid fa-rotate-left"></i></button></div>' +
                  '<p class="muted-p" style="font-size:.82rem;margin:8px 0 0">Clique numa galáxia para morar nela.</p>' +
                '</div>' +
                '<div id="ex-phist" hidden>' +
                  '<div class="ctl"><label for="ex-t">Tempo desde o Big Bang <b id="ex-tv"></b></label><input id="ex-t" type="range" min="0" max="1000" value="1000"></div>' +
                  '<button class="btn small primary" id="ex-tplay" type="button"><i class="fa-solid fa-play"></i> Do Big Bang até hoje</button>' +
                '</div>' +
                '<div id="ex-pdest" hidden>' +
                  '<div class="ctl"><label for="ex-om">Matéria (comum + escura) Ωm <b id="ex-omv"></b></label><input id="ex-om" type="range" min="0" max="3" step="0.005" value="0.315"></div>' +
                  '<div class="ctl"><label for="ex-ol">Energia escura ΩΛ <b id="ex-olv"></b></label><input id="ex-ol" type="range" min="0" max="1.6" step="0.005" value="0.685"></div>' +
                  '<div class="ctl"><label for="ex-w">Equação de estado da energia escura w <b id="ex-wv"></b></label><input id="ex-w" type="range" min="-1.6" max="-0.4" step="0.01" value="-1"></div>' +
                  '<div style="display:flex;gap:6px;flex-wrap:wrap"><button class="btn small" data-p="lcdm" type="button">Nosso universo</button><button class="btn small" data-p="mat" type="button">Sem energia escura</button><button class="btn small" data-p="crunch" type="button">Big Crunch</button><button class="btn small" data-p="rip" type="button">Big Rip</button></div>' +
                '</div>' +
                '<div class="readout" id="ex-out"></div>' +
              '</div>' +
            '</div>' +
            '<div class="lab-under">' +
              '<div class="lab-note"><strong>Leitura.</strong> <em>Galáxias:</em> as setas mostram a velocidade de cada galáxia vista da sua; o gráfico ao lado é o diagrama de Hubble, velocidade contra distância. <em>Linha do tempo:</em> um pedaço do universo crescendo e esfriando, do primeiro segundo até hoje (escala de tempo logarítmica). <em>Destino:</em> o tamanho do universo (fator de escala, 1 = hoje) ao longo do tempo, calculado com as equações de Friedmann.</div>' +
              '<div class="lab-note"><strong>Experimente.</strong> Mude de casa várias vezes: de qualquer galáxia, as outras se afastam pela mesma lei. Envie luz de uma galáxia distante e veja a onda se esticar no caminho: é o desvio para o vermelho cosmológico. No modo destino, tire a energia escura e aumente a matéria até o universo voltar a se contrair. Na animação das galáxias, o tempo está muito acelerado.</div>' +
            '</div>';
        const S = k => $('#ex-' + k, root), cv = S('cv');
        const st = { mode: 'gal', H0: 67.4, playing: true, tau: 0, a: 1, home: 0, photon: null, msg: '', tl: 1000, tplay: false, p: Object.assign({}, LCDM) };
        let table = ageTable(st.H0);
        const r = rng(1929), gal = [];
        for (let i = 0; i < 110; i++) gal.push({ x: (r() * 2 - 1) * 1.15, y: (r() * 2 - 1) * 0.75, rot: r() * Math.PI, e: 0.35 + r() * 0.6, s: 2.2 + r() * 3, type: r() < 0.7 ? 's' : 'e' });
        gal.sort((p, q) => Math.hypot(p.x, p.y) - Math.hypot(q.x, q.y)); st.home = 0;
        const HALF = 1500; /* meia-largura do campo, em Mpc, com a = 1 */
        const tOfA = a => { if (a <= table[0][1]) return table[0][0]; for (let i = 1; i < table.length; i++) if (table[i][1] >= a) { const u = (a - table[i - 1][1]) / (table[i][1] - table[i - 1][1]); return lerp(table[i - 1][0], table[i][0], u); } return table[table.length - 1][0]; };
        const aOfT = t => { if (t <= table[0][0]) return table[0][1] * Math.sqrt(t / table[0][0]); for (let i = 1; i < table.length; i++) if (table[i][0] >= t) { const u = (t - table[i - 1][0]) / (table[i][0] - table[i - 1][0]); return lerp(table[i - 1][1], table[i][1], u); } return table[table.length - 1][1]; };
        const tNow = () => tOfA(1);
        const LT0 = Math.log10(0.5 / 3.156e7), LT1 = () => Math.log10(tNow() * 1e9);
        const tFromSlider = v => Math.pow(10, LT0 + v / 1000 * (LT1() - LT0)); /* anos */
        function waveColor(nm) {
            if (nm < 380) return [150, 120, 255]; if (nm > 780) return [120, 20, 20];
            const st2 = [[380, [130, 0, 200]], [440, [70, 80, 255]], [490, [0, 200, 255]], [510, [0, 255, 120]], [580, [255, 240, 0]], [645, [255, 60, 0]], [780, [170, 0, 0]]];
            let i = 0; while (i < st2.length - 2 && nm > st2[i + 1][0]) i++;
            const [l0, c0] = st2[i], [l1, c1] = st2[i + 1], u = (nm - l0) / (l1 - l0);
            return c0.map((v, k) => Math.round(v + (c1[k] - v) * u));
        }

        /* ---------- modo galáxias ---------- */
        function drawGal(c, W, H) {
            const wide = W >= 700, A = wide ? { x: 0, y: 0, w: W * 0.6, h: H } : { x: 0, y: 0, w: W, h: H * 0.6 }, P = wide ? { x: W * 0.6, y: 0, w: W * 0.4, h: H } : { x: 0, y: H * 0.6, w: W, h: H * 0.4 };
            const home = gal[st.home], sc = Math.min(A.w / 2.3, A.h / 1.5) * 0.95, cx = A.x + A.w / 2, cy = A.y + A.h / 2;
            /* a casa fica no centro da tela: posições físicas relativas a ela */
            const pos = g2 => [cx + (g2.x - home.x) * st.a * sc, cy - (g2.y - home.y) * st.a * sc];
            const fade = st.a > 2.3 ? clamp((2.6 - st.a) / 0.3, 0, 1) : 1;
            c.save(); c.beginPath(); c.rect(A.x, A.y, A.w, A.h); c.clip();
            /* grade comóvel esticando */
            c.strokeStyle = 'rgba(148,163,184,' + 0.08 * fade + ')'; c.lineWidth = 1;
            for (let k = -6; k <= 6; k++) {
                const gx = cx + (k * 0.25 - home.x) * st.a * sc, gy = cy - (k * 0.25 - home.y) * st.a * sc;
                c.beginPath(); c.moveTo(gx, A.y); c.lineTo(gx, A.y + A.h); c.stroke(); c.beginPath(); c.moveTo(A.x, gy); c.lineTo(A.x + A.w, gy); c.stroke();
            }
            const Hn = st.H0, vmax = Hn * HALF * 2.6;
            gal.forEach((g2, i) => {
                const [x, y] = pos(g2); if (x < A.x - 20 || x > A.x + A.w + 20 || y < A.y - 20 || y > A.y + A.h + 20) return;
                const d = Math.hypot(g2.x - home.x, g2.y - home.y) * st.a * HALF, v = Hn * d, z = clamp(v / 3e5, 0, 1);
                const col = [Math.round(lerp(200, 255, z)), Math.round(lerp(215, 120, z)), Math.round(lerp(255, 90, z))];
                if (i !== st.home && d > 1) {
                    const L = v / vmax * Math.min(A.w, A.h) * 0.22, ux = (x - cx) / Math.hypot(x - cx, y - cy), uy = (y - cy) / Math.hypot(x - cx, y - cy);
                    arrowPx(c, x + ux * 6, y + uy * 6, x + ux * (6 + L), y + uy * (6 + L), 'rgba(244,114,182,' + 0.65 * fade + ')', 1.3);
                }
                c.save(); c.translate(x, y); c.rotate(g2.rot); c.globalAlpha = fade;
                const gr = c.createRadialGradient(0, 0, 0, 0, 0, g2.s * 1.8); gr.addColorStop(0, rgba(col, 0.95)); gr.addColorStop(1, rgba(col, 0));
                c.fillStyle = gr; c.scale(1, g2.e); c.beginPath(); c.arc(0, 0, g2.s * 1.8, 0, TAU); c.fill(); c.restore();
            });
            const [hx, hy] = pos(home); c.strokeStyle = '#fde047'; c.lineWidth = 1.5; c.beginPath(); c.arc(hx, hy, 11, 0, TAU); c.stroke(); label(c, 'casa', hx + 14, hy - 10, '#fde047', F(700, 11));
            /* pacote de luz */
            if (st.photon) {
                const ph = st.photon, x = cx + (ph.x - home.x) * st.a * sc, y = cy - (ph.y - home.y) * st.a * sc;
                const lam = ph.l0 * st.a / ph.a0, col = waveColor(lam), dx = (hx - x), dy = (hy - y), dn = Math.hypot(dx, dy) || 1, ux = dx / dn, uy = dy / dn;
                const wl = 7 * st.a / ph.a0, len = 54;
                c.strokeStyle = rgba(col); c.lineWidth = 2; c.beginPath();
                for (let k = 0; k <= 60; k++) { const s2 = -len / 2 + k / 60 * len, env = Math.exp(-Math.pow(s2 / (len / 2.6), 2)), amp = 6 * env * Math.sin(TAU * s2 / wl); const px2 = x + ux * s2 - uy * amp, py2 = y + uy * s2 + ux * amp; k ? c.lineTo(px2, py2) : c.moveTo(px2, py2); }
                c.stroke();
                label(c, nf(lam, 0) + ' nm', x, y - 14, rgba(col), F(700, 10), 'center');
            }
            c.restore();
            label(c, 'tamanho do universo: ' + nf(st.a, 2) + '× o do início da animação', A.x + 12, A.y + 14, '#e2e8f0', F(600, 11));
            if (st.msg) label(c, st.msg, A.x + 12, A.y + A.h - 14, '#fde68a', F(700, 11));
            /* diagrama de Hubble */
            const ml = 54, mr = 14, mt = 28, mb = 34, x0 = P.x + ml, x1 = P.x + P.w - mr, y0 = P.y + P.h - mb, y1 = P.y + mt;
            c.fillStyle = '#070b16'; c.fillRect(P.x, P.y, P.w, P.h);
            const dMax = HALF * 1.6, X = d => x0 + d / dMax * (x1 - x0), Y = v => y0 - v / (90 * dMax) * (y0 - y1);
            c.strokeStyle = 'rgba(148,163,184,.12)';
            for (let d = 0; d <= dMax; d += 500) { c.beginPath(); c.moveTo(X(d), y0); c.lineTo(X(d), y1); c.stroke(); label(c, nf(d), X(d), y0 + 11, '#94a3b8', F(500, 10, true), 'center'); }
            for (let v = 0; v <= 90 * dMax; v += 50000) { c.beginPath(); c.moveTo(x0, Y(v)); c.lineTo(x1, Y(v)); c.stroke(); label(c, nf(v / 1000) + ' mil', x0 - 4, Y(v), '#94a3b8', F(500, 9, true), 'right'); }
            label(c, 'distância (Mpc)', (x0 + x1) / 2, P.y + P.h - 9, '#cbd5e1', F(600, 11), 'center');
            label(c, 'velocidade de afastamento (km/s)', P.x + 8, P.y + 12, '#cbd5e1', F(600, 11));
            c.strokeStyle = 'rgba(52,211,153,.8)'; c.lineWidth = 1.6; c.beginPath(); c.moveTo(X(0), Y(0)); c.lineTo(X(dMax), Y(Hn * dMax)); c.stroke();
            gal.forEach((g2, i) => {
                if (i === st.home) return;
                const d = Math.hypot(g2.x - home.x, g2.y - home.y) * HALF; if (d > dMax) return;
                c.fillStyle = 'rgba(244,114,182,.85)'; c.beginPath(); c.arc(X(d), Y(Hn * d), 2.3, 0, TAU); c.fill();
            });
            label(c, 'v = ' + nf(Hn, 1) + ' × d', X(dMax * 0.55), Y(Hn * dMax * 0.55) - 14, '#34d399', F(700, 11), 'right');
        }
        function stepGal(dt) {
            st.tau += dt; const k = 0.075;
            const aPrev = st.a; st.a = Math.exp(k * st.tau);
            if (st.photon) {
                const ph = st.photon, home = gal[st.home], dx = home.x - ph.x, dy = home.y - ph.y, dn = Math.hypot(dx, dy), stp = 0.3 * dt / st.a;
                if (dn <= stp) { const zz = st.a / ph.a0 - 1; st.msg = 'A luz chegou esticada: λ passou de ' + nf(ph.l0, 0) + ' para ' + nf(ph.l0 * (1 + zz), 0) + ' nm; z = ' + nf(zz, 2) + ' (1 + z = ' + nf(1 + zz, 2) + ').'; st.photon = null; st.hold = 3.5; }
                else { ph.x += dx / dn * stp; ph.y += dy / dn * stp; }
            }
            if (st.hold > 0) { st.hold -= dt; st.a = aPrev; st.tau -= dt; return; }
            if (st.a > 2.6) { st.tau = 0; st.a = 1; st.photon = null; st.msg = ''; }
        }
        function sendLight() {
            const home = gal[st.home]; let best = null, bd = 0;
            gal.forEach((g2, i) => { if (i === st.home) return; const d = Math.hypot(g2.x - home.x, g2.y - home.y); if (d > bd && d < 1.0 && Math.abs(g2.x - home.x) * st.a * 1 < 1.1 && Math.abs(g2.y - home.y) < 0.7) { bd = d; best = g2; } });
            if (!best) return;
            if (st.a > 1.6) { st.tau = 0; st.a = 1; }
            st.photon = { x: best.x, y: best.y, a0: st.a, l0: 440 }; st.msg = 'Luz azul (440 nm) saindo de uma galáxia distante…'; st.hold = 0;
            if (!st.playing) togglePlay();
        }

        /* ---------- modo linha do tempo ---------- */
        function drawHist(c, W, H) {
            const tY = tFromSlider(st.tl), tG = tY / 1e9, a = aOfT(tG), T = 2.725 / a, z = 1 / a - 1;
            const cx = W * 0.5, cy = H * 0.52, Rmax = Math.min(W, H) * 0.42, la = Math.log10(a), rr = Rmax * clamp((la + 10) / 10, 0.04, 1);
            const now = performance.now() / 1000, rn = rng(13);
            /* fundo */
            if (T > 3000) {
                const col = bb(Math.min(T, 40000)), heat = clamp(Math.log10(T / 3000) / 6, 0, 1);
                const gr = c.createRadialGradient(cx, cy, 0, cx, cy, rr);
                gr.addColorStop(0, rgba(col.map(v => Math.min(255, v + 60 * heat)))); gr.addColorStop(1, rgba(col, 0.85));
                c.fillStyle = gr; c.beginPath(); c.arc(cx, cy, rr, 0, TAU); c.fill();
                c.fillStyle = 'rgba(255,255,255,.35)';
                for (let i = 0; i < 160; i++) { const ang = rn() * TAU + now * (0.3 + rn()), rad = Math.sqrt(rn()) * rr; c.fillRect(cx + rad * Math.cos(ang), cy + rad * Math.sin(ang), 1.5, 1.5); }
                if (tY > 180 / 3.156e7 && tY < 1200 / 3.156e7) label(c, 'H  He  H  H  He  H', cx, cy, 'rgba(15,23,42,.8)', F(800, 13), 'center');
            } else {
                const fadeT = clamp((T - 2500) / 500, 0, 1);
                const glow = clamp(Math.log10(T / 2.725) / 3.04, 0, 1);
                const gr = c.createRadialGradient(cx, cy, 0, cx, cy, rr);
                gr.addColorStop(0, 'rgba(120,30,20,' + (0.08 + 0.35 * glow) + ')'); gr.addColorStop(1, 'rgba(60,10,10,' + (0.05 + 0.25 * glow) + ')');
                c.fillStyle = gr; c.beginPath(); c.arc(cx, cy, rr, 0, TAU); c.fill();
                if (fadeT > 0) { c.fillStyle = 'rgba(255,190,120,' + fadeT * 0.8 + ')'; c.beginPath(); c.arc(cx, cy, rr, 0, TAU); c.fill(); }
                const lg = Math.log10(tY), ns = clamp((lg - 8) / 1.7, 0, 1);
                if (ns > 0) {
                    c.globalCompositeOperation = 'lighter';
                    const N = Math.round(260 * ns);
                    for (let i = 0; i < N; i++) {
                        const ang = rn() * TAU, rad = Math.sqrt(rn()) * rr * 0.96, sz = 0.8 + rn() * 2.2 * ns, col = bb(4500 + rn() * 12000);
                        const g2 = c.createRadialGradient(cx + rad * Math.cos(ang), cy + rad * Math.sin(ang), 0, cx + rad * Math.cos(ang), cy + rad * Math.sin(ang), sz * 2);
                        g2.addColorStop(0, rgba(col, 0.9)); g2.addColorStop(1, rgba(col, 0)); c.fillStyle = g2; c.beginPath(); c.arc(cx + rad * Math.cos(ang), cy + rad * Math.sin(ang), sz * 2, 0, TAU); c.fill();
                    }
                    c.globalCompositeOperation = 'source-over';
                }
            }
            c.strokeStyle = 'rgba(148,163,184,.35)'; c.lineWidth = 1; c.beginPath(); c.arc(cx, cy, rr, 0, TAU); c.stroke();
            /* régua do tempo */
            const x0 = 30, x1 = W - 30, yb = H - 28, lt1 = LT1(), X = lg => x0 + (lg - LT0) / (lt1 - LT0) * (x1 - x0);
            c.strokeStyle = 'rgba(148,163,184,.4)'; c.beginPath(); c.moveTo(x0, yb); c.lineTo(x1, yb); c.stroke();
            [[1 / 3.156e7, '1 s'], [60 / 3.156e7, '1 min'], [1 / 365.25, '1 dia'], [1, '1 ano'], [1e3, 'mil'], [1e6, 'milhão'], [1e9, 'bilhão']].forEach(([ty, nm]) => { const x = X(Math.log10(ty)); c.beginPath(); c.moveTo(x, yb - 4); c.lineTo(x, yb + 4); c.stroke(); label(c, nm, x, yb + 13, '#94a3b8', F(500, 10), 'center'); });
            const xm = X(Math.log10(tY)); c.fillStyle = '#f472b6'; c.beginPath(); c.arc(xm, yb, 5, 0, TAU); c.fill();
            const ev = EVENTS.find(e => tY >= e[0] && tY < e[1]) || EVENTS[EVENTS.length - 1];
            wrapLabel(c, ev[2], 16, 18, W - 32, '#e2e8f0', F(700, 13));
            label(c, 'escala de tempo logarítmica; tamanho da região também em escala logarítmica', W / 2, yb - 16, '#64748b', F(500, 10), 'center');
            return { tY, a, T, z };
        }
        function wrapLabel(c, txt, x, y, maxW, col, font) {
            c.font = font; const words = txt.split(' '); let line = '', yy = y;
            words.forEach(w2 => { const t2 = line ? line + ' ' + w2 : w2; if (c.measureText(t2).width > maxW && line) { label(c, line, x, yy, col, font); line = w2; yy += 18; } else line = t2; });
            if (line) label(c, line, x, yy, col, font);
        }

        /* ---------- modo destino ---------- */
        function evolve(p, H0) {
            const h = Hgyr(H0), acc = a => -0.5 * h * h * a * (2 * p.Or / Math.pow(a, 4) + p.Om / Math.pow(a, 3) + (1 + 3 * p.w) * p.OL * Math.pow(a, -3 * (1 + p.w)));
            const run = dir => {
                const pts = [[0, 1]]; let a = 1, v = h, t = 0, dt = 0.02 * dir, end = null;
                if (Ez2(1, p) < 0) return { pts, end: 'none' };
                for (let k = 0; k < 20000; k++) {
                    const k1a = v, k1v = acc(a), k2a = v + 0.5 * dt * k1v, k2v = acc(a + 0.5 * dt * k1a), k3a = v + 0.5 * dt * k2v, k3v = acc(a + 0.5 * dt * k2a), k4a = v + dt * k3v, k4v = acc(a + dt * k3a);
                    a += dt / 6 * (k1a + 2 * k2a + 2 * k3a + k4a); v += dt / 6 * (k1v + 2 * k2v + 2 * k3v + k4v); t += dt;
                    if (a < 2e-3) { end = dir > 0 ? 'crunch' : 'bang'; pts.push([t, 0]); break; }
                    if (a > (p.w < -1 ? 1e4 : 60)) { end = p.w < -1 ? 'rip' : (acc(a) > 0 ? 'freeze' : 'coast'); pts.push([t, a]); break; }
                    if (dir < 0 && v * dir > 0 && a > 0.05) { end = 'bounce'; pts.push([t, a]); break; } /* no passado, o universo teria sido maior: sem Big Bang */
                    if (k % 4 === 0) pts.push([t, a]);
                    if (Math.abs(t) > (dir > 0 ? 200 : 60)) { end = dir > 0 ? (acc(a) > 0 ? 'freeze' : 'coast') : 'old'; break; }
                }
                return { pts, end, t };
            };
            const past = run(-1), fut = run(1);
            return { past, fut, age: past.end === 'bang' ? -past.t : null };
        }
        function drawDest(c, W, H) {
            const ml = 52, mr = 18, mt = 30, mb = 40, x0 = ml, x1 = W - mr, y0 = H - mb, y1 = mt;
            const ev = evolve(st.p, st.H0), ref = evolve(LCDM, st.H0), mat = evolve({ Om: 1, OL: 0, Or: 9.1e-5, w: -1 }, st.H0);
            const age = ev.age || 0, tmin = 0, tmax = 80, amax = 5;
            const X = t => x0 + (t - tmin) / (tmax - tmin) * (x1 - x0), Y = a => y0 - clamp(a / amax, -0.02, 1.05) * (y0 - y1);
            c.strokeStyle = 'rgba(148,163,184,.12)'; c.lineWidth = 1;
            for (let t = 0; t <= tmax; t += 10) { c.beginPath(); c.moveTo(X(t), y0); c.lineTo(X(t), y1); c.stroke(); label(c, String(t), X(t), y0 + 12, '#94a3b8', F(500, 10, true), 'center'); }
            for (let a = 0; a <= amax; a++) { c.beginPath(); c.moveTo(x0, Y(a)); c.lineTo(x1, Y(a)); c.stroke(); label(c, String(a), x0 - 6, Y(a), '#94a3b8', F(500, 10, true), 'right'); }
            label(c, 'tempo desde o Big Bang (bilhões de anos)', (x0 + x1) / 2, H - 12, '#cbd5e1', F(600, 11), 'center');
            label(c, 'tamanho do universo (hoje = 1)', 10, 14, '#cbd5e1', F(600, 11));
            c.save(); c.beginPath(); c.rect(x0, y1 - 8, x1 - x0, y0 - y1 + 16); c.clip();
            const plot = (e, col, w, dash) => {
                const ag = e.age; if (ag === null) return;
                c.strokeStyle = col; c.lineWidth = w; c.setLineDash(dash || []); c.beginPath();
                const pts = e.past.pts.slice().reverse().concat(e.fut.pts.slice(1));
                pts.forEach((q, i) => { const x = X(q[0] + ag), y = Y(q[1]); i ? c.lineTo(x, y) : c.moveTo(x, y); }); c.stroke(); c.setLineDash([]);
            };
            plot(mat, 'rgba(148,163,184,.6)', 1.4, [3, 4]);
            plot(ref, 'rgba(52,211,153,.8)', 1.6, [7, 4]);
            plot(ev, '#f472b6', 2.8);
            if (ev.age !== null) { c.fillStyle = '#fde047'; c.beginPath(); c.arc(X(ev.age), Y(1), 5, 0, TAU); c.fill(); label(c, 'hoje', X(ev.age) + 8, Y(1) + 12, '#fde047', F(700, 11)); }
            c.restore();
            let ly = y1 + 6;
            [['este universo', '#f472b6'], ['nosso universo (ΛCDM)', '#34d399'], ['só matéria, sem energia escura', '#94a3b8']].forEach(([t, col]) => { label(c, t, x1 - 6, ly, col, F(600, 10), 'right'); ly += 14; });
            if (ev.age === null) label(c, ev.past.end === 'bounce' || ev.past.end === 'none' ? 'Com esses valores não há Big Bang: o modelo não descreve o nosso universo.' : 'O passado deste modelo fica fora do gráfico.', (x0 + x1) / 2, (y0 + y1) / 2, '#fca5a5', F(700, 12), 'center');
            return ev;
        }
        function fateText(ev) {
            const f = ev.fut;
            if (f.end === 'crunch') return 'Big Crunch daqui a ' + years(f.t * 1e9) + ': a expansão para e o universo volta a se contrair.';
            if (f.end === 'rip') return 'Big Rip daqui a cerca de ' + years(f.t * 1e9) + ': a expansão acelera sem limite e despedaça tudo.';
            if (f.end === 'freeze') return 'Expansão eterna e acelerada (Big Freeze): tudo se afasta e esfria.';
            if (f.end === 'coast') return 'Expansão eterna, cada vez mais lenta.';
            return '—';
        }

        function draw() {
            const g = canvas2d(cv, '#03050c'); if (!g) return;
            const { c, W, H } = g, Hn = st.H0, tH = 977.8 / Hn;
            S('hv').textContent = nf(Hn, 1) + ' km/s/Mpc';
            if (st.mode === 'gal') {
                drawGal(c, W, H);
                const home = gal[st.home];
                $('#ex-out', root).innerHTML = cell('Lei de Hubble-Lemaître', 'v = ' + nf(Hn, 1) + ' km/s por Mpc', true) +
                    cell('A 100 Mpc', nf(Hn * 100) + ' km/s') + cell('A 1 000 Mpc', nf(Hn * 1000) + ' km/s') +
                    cell('Tempo de Hubble 1/H₀', nf(tH, 1) + ' bilhões de anos') + cell('Distância de Hubble c/H₀', nf(2.998e5 / Hn / 1000, 2) + ' mil Mpc') +
                    cell('Galáxias mais próximas de casa', nf(gal.filter((q, i) => i !== st.home && Math.hypot(q.x - home.x, q.y - home.y) * HALF < 500).length) + ' a menos de 500 Mpc', true);
            } else if (st.mode === 'hist') {
                const h = drawHist(c, W, H);
                S('tv').textContent = h.tY < 2 ? duration(h.tY * 3.156e7) : years(h.tY);
                $('#ex-out', root).innerHTML = cell('Tempo desde o Big Bang', h.tY < 2 ? duration(h.tY * 3.156e7) : years(h.tY), true) +
                    cell('Tamanho relativo (hoje = 1)', sci(h.a, 3, -3, 3)) + cell('Desvio para o vermelho z', h.z < 1e-6 ? '0' : sci(h.z, 3, -2, 6)) +
                    cell('Temperatura da radiação', sci(h.T, 4, -1, 6) + ' K') + cell('Idade do universo hoje', years(tNow() * 1e9));
            } else {
                const ev = drawDest(c, W, H), Ok = 1 - st.p.Om - st.p.OL - st.p.Or;
                S('omv').textContent = nf(st.p.Om, 3); S('olv').textContent = nf(st.p.OL, 3); S('wv').textContent = nf(st.p.w, 2);
                $('#ex-out', root).innerHTML = cell('Destino', fateText(ev), true) +
                    cell('Idade hoje', ev.age !== null ? years(ev.age * 1e9) : '—') +
                    cell('Geometria', Math.abs(Ok) < 0.005 ? 'plana' : Ok < 0 ? 'fechada (como uma esfera)' : 'aberta (como uma sela)') +
                    cell('A expansão hoje está', (st.p.Om / 2 + (1 + 3 * st.p.w) / 2 * st.p.OL + st.p.Or) < 0 ? 'acelerando' : 'desacelerando', true);
            }
        }
        function togglePlay() { st.playing = !st.playing; S('play').innerHTML = st.playing ? '<i class="fa-solid fa-pause"></i> Pausar' : '<i class="fa-solid fa-play"></i> Expandir'; }
        const anim = animator(cv, dt => {
            if (st.mode === 'gal' && st.playing) stepGal(dt);
            if (st.mode === 'hist' && st.tplay) { st.tl = Math.min(1000, st.tl + dt * 70); S('t').value = st.tl; if (st.tl >= 1000) { st.tplay = false; S('tplay').innerHTML = '<i class="fa-solid fa-play"></i> Do Big Bang até hoje'; } }
            if (st.mode !== 'dest') draw();
        });
        function setMode(m) {
            st.mode = m; S('pgal').hidden = m !== 'gal'; S('phist').hidden = m !== 'hist'; S('pdest').hidden = m !== 'dest'; draw();
        }
        root.querySelectorAll('input[name="ex-mode"]').forEach(el => el.addEventListener('change', () => setMode(radio(root, 'ex-mode'))));
        S('h').addEventListener('input', () => { st.H0 = +S('h').value; table = ageTable(st.H0); draw(); });
        S('play').addEventListener('click', togglePlay);
        S('light').addEventListener('click', sendLight);
        S('restart').addEventListener('click', () => { st.tau = 0; st.a = 1; st.photon = null; st.msg = ''; st.hold = 0; draw(); });
        S('t').addEventListener('input', () => { st.tl = +S('t').value; st.tplay = false; draw(); });
        S('tplay').addEventListener('click', () => { st.tplay = !st.tplay; if (st.tplay && st.tl >= 1000) st.tl = 0; S('tplay').innerHTML = st.tplay ? '<i class="fa-solid fa-pause"></i> Pausar' : '<i class="fa-solid fa-play"></i> Do Big Bang até hoje'; });
        ['om', 'ol', 'w'].forEach(k => S(k).addEventListener('input', () => { st.p.Om = +S('om').value; st.p.OL = +S('ol').value; st.p.w = +S('w').value; draw(); }));
        root.querySelectorAll('#ex-pdest [data-p]').forEach(b => b.addEventListener('click', () => {
            const P = { lcdm: [0.315, 0.685, -1], mat: [1, 0, -1], crunch: [2.5, 0, -1], rip: [0.3, 0.7, -1.5] }[b.dataset.p];
            S('om').value = P[0]; S('ol').value = P[1]; S('w').value = P[2]; st.p.Om = P[0]; st.p.OL = P[1]; st.p.w = P[2]; draw();
        }));
        cv.addEventListener('click', e => {
            if (st.mode !== 'gal') return;
            const rc = cv.getBoundingClientRect(), x = e.clientX - rc.left, y = e.clientY - rc.top, W = rc.width, H = rc.height, wide = W >= 700;
            const A = wide ? { x: 0, y: 0, w: W * 0.6, h: H } : { x: 0, y: 0, w: W, h: H * 0.6 };
            if (x > A.x + A.w || y > A.y + A.h) return;
            const home = gal[st.home], sc = Math.min(A.w / 2.3, A.h / 1.5) * 0.95, cx = A.x + A.w / 2, cy = A.y + A.h / 2;
            let best = -1, bd = 22;
            gal.forEach((g2, i) => { const d = Math.hypot(cx + (g2.x - home.x) * st.a * sc - x, cy - (g2.y - home.y) * st.a * sc - y); if (d < bd) { bd = d; best = i; } });
            if (best >= 0) { st.home = best; st.photon = null; st.msg = 'Nova casa: as outras galáxias continuam se afastando de você.'; draw(); }
        });
        if (window.ResizeObserver) new ResizeObserver(() => draw()).observe(cv);
        anim.start();
        return () => { draw(); anim.kick(); };
    }

    return { init: { evolucao: initEvolucao, pulsar: initPulsar, buraco: initBuraco, galaxia: initGalaxia, expansao: initExpansao } };
})();
