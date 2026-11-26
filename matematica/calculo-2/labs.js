/* Cálculo II: simuladores Séries e Taylor, Superfícies (curvas de nível, gradiente, plano tangente) e Integrais duplas. */
window.MATH = window.MATH || {};

MATH.labs = (function () {
    'use strict';

    const { T, Plot, fmt, parseExpr, compile, toTex, simpson } = MATH.plot;
    const $ = (s, r) => (r || document).querySelector(s);

    /* ---------- utilidades ---------- */
    const nf = (x, d) => fmt(Math.abs(x) < 5e-13 ? 0 : x, d || 5);
    const texNum = (x, d) => nf(x, d).replace('−', '-').replace(',', '{,}').replace(/·10(.*)$/, s => '\\cdot 10^{' + s.slice(3).replace(/[⁻⁰¹²³⁴⁵⁶⁷⁸⁹]/g, c => ({ '⁻': '-', '⁰': 0, '¹': 1, '²': 2, '³': 3, '⁴': 4, '⁵': 5, '⁶': 6, '⁷': 7, '⁸': 8, '⁹': 9 })[c]) + '}');
    const FACT = [1]; for (let i = 1; i <= 20; i++) FACT[i] = FACT[i - 1] * i;
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

    /* f(x, y) digitada pelo usuário (parser seguro, sem eval) */
    function parse2(src) {
        const tree = parseExpr(src, { y: true });
        const g = compile(tree);
        return { f: (x, y) => { const v = g(x, y); return Number.isFinite(v) ? v : NaN; }, tex: toTex(tree) };
    }
    function parse1(src) {
        const tree = parseExpr(src);
        const g = compile(tree);
        return { f: x => g(x, 0), tex: toTex(tree) };
    }

    /* projeção 3D simples (giro horizontal yaw, inclinação pitch) */
    function projector(yaw, pitch, cx, cy, s) {
        const cy_ = Math.cos(yaw), sy_ = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
        return p => {
            const x1 = p[0] * cy_ - p[1] * sy_, y1 = p[0] * sy_ + p[1] * cy_;
            return [cx + x1 * s, cy - (p[2] * cp - y1 * sp) * s, p[2] * sp + y1 * cp];
        };
    }
    function canvas2d(cv) {
        const r = cv.getBoundingClientRect(), dpr = window.devicePixelRatio || 1, W = Math.round(r.width), H = Math.round(r.height);
        if (!W || !H) return null;
        if (cv.width !== W * dpr || cv.height !== H * dpr) { cv.width = W * dpr; cv.height = H * dpr; }
        const c = cv.getContext('2d'); c.setTransform(dpr, 0, 0, dpr, 0, 0);
        c.fillStyle = '#0c1220'; c.fillRect(0, 0, W, H);
        return { c, W, H };
    }
    function arrowPx(c, x0, y0, x1, y1, color, w, label) {
        const a = Math.atan2(y1 - y0, x1 - x0), L = Math.hypot(x1 - x0, y1 - y0), hd = Math.min(11, L * 0.45);
        c.save(); c.strokeStyle = color; c.fillStyle = color; c.lineWidth = w || 2.4; c.lineCap = 'round';
        c.beginPath(); c.moveTo(x0, y0); c.lineTo(x1 - hd * 0.6 * Math.cos(a), y1 - hd * 0.6 * Math.sin(a)); c.stroke();
        c.beginPath(); c.moveTo(x1, y1); c.lineTo(x1 - hd * Math.cos(a - 0.42), y1 - hd * Math.sin(a - 0.42)); c.lineTo(x1 - hd * Math.cos(a + 0.42), y1 - hd * Math.sin(a + 0.42)); c.closePath(); c.fill();
        if (label) { c.font = '600 13px "JetBrains Mono", monospace'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(label, x1 + 14 * Math.cos(a), y1 + 14 * Math.sin(a)); }
        c.restore();
    }
    /* mapa de cores por altura (t em [0, 1]) */
    const STOPS = [[30, 58, 138], [14, 165, 233], [52, 211, 153], [251, 191, 36], [244, 114, 182]];
    function heat(t, k, alpha) {
        t = clamp(Number.isFinite(t) ? t : 0, 0, 1) * (STOPS.length - 1);
        const i = Math.min(STOPS.length - 2, Math.floor(t)), u = t - i, A = STOPS[i], B = STOPS[i + 1];
        const m = k === undefined ? 1 : k;
        return 'rgba(' + [0, 1, 2].map(j => Math.round((A[j] + (B[j] - A[j]) * u) * m)).join(',') + ',' + (alpha === undefined ? 1 : alpha) + ')';
    }
    function dragRotate(cv, st, draw) {
        let drag = null;
        cv.addEventListener('pointerdown', e => { drag = [e.clientX, e.clientY, st.yaw, st.pitch]; cv.setPointerCapture(e.pointerId); cv.style.cursor = 'grabbing'; });
        cv.addEventListener('pointermove', e => { if (!drag) return; st.yaw = drag[2] + (e.clientX - drag[0]) * 0.01; st.pitch = clamp(drag[3] + (e.clientY - drag[1]) * 0.01, -0.2, 1.5); draw(); });
        const end = () => { drag = null; cv.style.cursor = st.rot ? 'grab' : 'crosshair'; };
        cv.addEventListener('pointerup', end); cv.addEventListener('pointercancel', end);
        return () => !!drag;
    }

    /* =========================================================
       SÉRIES E TAYLOR
       ========================================================= */
    const SERIES = [
        { label: 'Geométrica: Σ (1/2)ⁿ', tex: '\\sum_{n=1}^{\\infty}\\left(\\tfrac12\\right)^n', n0: 1, a: n => Math.pow(0.5, n), S: 1, Stex: '1',
          nota: 'Geométrica de razão ' + '½' + ': converge para (1/2)/(1 − 1/2) = 1. Cada soma parcial anda metade do que falta.' },
        { label: 'Harmônica: Σ 1/n', tex: '\\sum_{n=1}^{\\infty}\\frac1n', n0: 1, a: n => 1 / n, S: null,
          nota: 'Os termos vão a zero, mas as somas parciais crescem como ln n, sem limite: diverge. Leve N até 200 e veja que ela ainda sobe.' },
        { label: 'p-série: Σ 1/n²', tex: '\\sum_{n=1}^{\\infty}\\frac1{n^2}', n0: 1, a: n => 1 / (n * n), S: Math.PI * Math.PI / 6, Stex: '\\frac{\\pi^2}{6}',
          nota: 'p = 2 > 1: converge. O valor π²/6 foi descoberto por Euler (problema de Basileia).' },
        { label: 'Σ 1/√n (p = 1/2)', tex: '\\sum_{n=1}^{\\infty}\\frac1{\\sqrt n}', n0: 1, a: n => 1 / Math.sqrt(n), S: null,
          nota: 'p = 1/2 ≤ 1: diverge, e mais depressa que a harmônica.' },
        { label: 'Harmônica alternada', tex: '\\sum_{n=1}^{\\infty}\\frac{(-1)^{n+1}}{n}', n0: 1, a: n => (n % 2 ? 1 : -1) / n, S: Math.LN2, Stex: '\\ln 2',
          nota: 'Leibniz: termos decrescentes indo a zero, com sinais alternados. As somas pulam acima e abaixo de ln 2; o erro é menor que o próximo termo.' },
        { label: 'Leibniz para π', tex: '\\sum_{n=0}^{\\infty}\\frac{4(-1)^n}{2n+1}', n0: 0, a: n => 4 * (n % 2 ? -1 : 1) / (2 * n + 1), S: Math.PI, Stex: '\\pi',
          nota: 'É 4·arctan(1). Converge, mas devagar: com 200 termos ainda erra a segunda casa decimal.' },
        { label: 'Σ 1/n! (série de e)', tex: '\\sum_{n=0}^{\\infty}\\frac{1}{n!}', n0: 0, a: n => n <= 20 ? 1 / FACT[n] : 0, S: Math.E, Stex: 'e',
          nota: 'Teste da razão: 1/(n + 1) → 0. Converge muito depressa: com 10 termos já acerta 6 casas de e.' },
        { label: 'Σ n/(n + 1)', tex: '\\sum_{n=1}^{\\infty}\\frac{n}{n+1}', n0: 1, a: n => n / (n + 1), S: null,
          nota: 'O termo geral tende a 1, não a 0: diverge pelo teste do termo geral. As somas crescem quase como N.' }
    ];
    const TAY = {
        exp: { label: 'eˣ', tex: 'e^x', f: Math.exp, view: [-4, 4, -2, 14], aR: [-2, 2],
               c: (n, a) => Math.exp(a) / FACT[n], q: n => [1, FACT[n]], R: () => Infinity },
        sin: { label: 'sen x', tex: '\\sin x', f: Math.sin, view: [-9, 9, -3, 3], aR: [-3, 3],
               c: (n, a) => Math.sin(a + n * Math.PI / 2) / FACT[n], q: n => n % 2 ? [n % 4 === 1 ? 1 : -1, FACT[n]] : [0, 1], R: () => Infinity },
        cos: { label: 'cos x', tex: '\\cos x', f: Math.cos, view: [-9, 9, -3, 3], aR: [-3, 3],
               c: (n, a) => Math.cos(a + n * Math.PI / 2) / FACT[n], q: n => n % 2 ? [0, 1] : [n % 4 === 0 ? 1 : -1, FACT[n]], R: () => Infinity },
        ln: { label: 'ln(1 + x)', tex: '\\ln(1+x)', f: x => x > -1 ? Math.log1p(x) : NaN, view: [-1.5, 4, -4, 3], aR: [-0.5, 2],
              c: (n, a) => n === 0 ? Math.log1p(a) : (n % 2 ? 1 : -1) / (n * Math.pow(1 + a, n)), q: n => n === 0 ? [0, 1] : [n % 2 ? 1 : -1, n], R: a => 1 + a },
        geo: { label: '1/(1 − x)', tex: '\\frac{1}{1-x}', f: x => 1 / (1 - x), view: [-3, 2, -2, 8], aR: [-2, 0.5],
               c: (n, a) => 1 / Math.pow(1 - a, n + 1), q: () => [1, 1], R: a => 1 - a },
        atan: { label: 'arctg x', tex: '\\arctan x', f: Math.atan, view: [-3, 3, -2.5, 2.5], aR: null,
                c: n => n % 2 ? ((n - 1) / 2 % 2 ? -1 : 1) / n : 0, q: n => n % 2 ? [(n - 1) / 2 % 2 ? -1 : 1, n] : [0, 1], R: () => 1 },
        gauss: { label: 'e^(−x²)', tex: 'e^{-x^2}', f: x => Math.exp(-x * x), view: [-3.5, 3.5, -1.5, 2], aR: null,
                 c: n => n % 2 ? 0 : (n / 2 % 2 ? -1 : 1) / FACT[n / 2], q: n => n % 2 ? [0, 1] : [n / 2 % 2 ? -1 : 1, FACT[n / 2]], R: () => Infinity }
    };

    function polyTex(F, n, a) {
        const terms = [];
        for (let k = 0; k <= n; k++) {
            let sign, body;
            if (a === 0) {
                const [p, q] = F.q(k); if (!p) continue;
                sign = p < 0 ? -1 : 1;
                const P = Math.abs(p), mono = k === 0 ? '' : k === 1 ? 'x' : 'x^{' + k + '}';
                if (k === 0) body = q === 1 ? String(P) : '\\frac{' + P + '}{' + q + '}';
                else if (q === 1) body = (P === 1 ? '' : P) + mono;
                else body = P === 1 ? '\\frac{' + mono + '}{' + q + '}' : '\\frac{' + P + '}{' + q + '}' + mono;
            } else {
                const c = F.c(k, a); if (Math.abs(c) < 1e-12) continue;
                sign = c < 0 ? -1 : 1;
                const base = '(x ' + (a > 0 ? '-' : '+') + ' ' + texNum(Math.abs(a), 3) + ')';
                const mono = k === 0 ? '' : k === 1 ? base : base + '^{' + k + '}';
                const C = Math.abs(c);
                body = k === 0 ? texNum(C, 4) : (Math.abs(C - 1) < 1e-12 ? '' : texNum(C, 4)) + mono;
            }
            terms.push([sign, body]);
        }
        if (!terms.length) return '0';
        let list = terms;
        const cut = terms.length > 6;
        if (cut) list = terms.slice(0, 3).concat([null], terms.slice(-2));
        return list.map((t, i) => {
            if (!t) return ' + \\cdots';
            return (i === 0 ? (t[0] < 0 ? '-' : '') : (t[0] < 0 ? ' - ' : ' + ')) + t[1];
        }).join('');
    }

    function initSeries(root) {
        root.innerHTML =
            '<div class="lab-grid">' +
              '<div class="lab-stage"><canvas id="sr-cv"></canvas></div>' +
              '<div class="lab-side">' +
                '<div class="ctl"><label for="sr-mode">Modo</label><select id="sr-mode"><option value="num">Séries numéricas (somas parciais)</option><option value="tay">Polinômio de Taylor</option></select></div>' +
                '<div id="sr-num">' +
                  '<div class="ctl"><label for="sr-ser">Série</label><select id="sr-ser">' + SERIES.map((s, i) => '<option value="' + i + '">' + s.label + '</option>').join('') + '</select></div>' +
                  '<div class="ctl"><label for="sr-n">Número de termos ' + T('N') + ': <b id="sr-n-v"></b></label><input id="sr-n" type="range" min="1" max="200" step="1" value="10"></div>' +
                '</div>' +
                '<div id="sr-tay" hidden>' +
                  '<div class="ctl"><label for="sr-fn">Função</label><select id="sr-fn">' + Object.keys(TAY).map(k => '<option value="' + k + '">f(x) = ' + TAY[k].label + '</option>').join('') + '</select></div>' +
                  '<div class="ctl"><label for="sr-deg">Grau ' + T('n') + ': <b id="sr-deg-v"></b></label><input id="sr-deg" type="range" min="0" max="16" step="1" value="3"></div>' +
                  '<div class="ctl"><label for="sr-a">Centro ' + T('a') + ': <b id="sr-a-v"></b></label><input id="sr-a" type="range" min="-2" max="2" step="0.1" value="0"></div>' +
                  '<div class="ctl"><label for="sr-x">Avaliar em ' + T('x') + ': <b id="sr-x-v"></b></label><input id="sr-x" type="range" min="-4" max="4" step="0.05" value="1"></div>' +
                '</div>' +
                '<div class="readout" id="sr-out"></div>' +
              '</div>' +
            '</div>' +
            '<div class="lab-under">' +
              '<div class="lab-note" id="sr-note1"></div>' +
              '<div class="lab-note" id="sr-note2"></div>' +
            '</div>';

        const S = k => $('#sr-' + k, root);
        const plot = new Plot(S('cv'));
        const cell = (lab, val, wide) => '<div' + (wide ? ' class="wide"' : '') + '><span>' + lab + '</span><b' + (wide ? ' class="tex-line"' : '') + '>' + val + '</b></div>';
        const mode = () => S('mode').value;

        function setMode() {
            const tay = mode() === 'tay';
            S('num').hidden = tay; S('tay').hidden = !tay;
            if (tay) {
                S('note1').innerHTML = '<strong>Leitura.</strong> Curva <b style="color:#38bdf8">azul</b>: ' + T('f') + '. Curva <b style="color:#fbbf24">amarela</b>: o polinômio de Taylor ' + T('P_n') + ' centrado em ' + T('a') + '. A faixa roxa marca o intervalo de convergência da série; fora dele, aumentar o grau não ajuda.';
                S('note2').innerHTML = '<strong>Experimente.</strong> Em ' + T('\\ln(1+x)') + ' ou ' + T('\\frac{1}{1-x}') + ', aumente o grau: dentro da faixa o polinômio gruda na função; fora dela, ele se afasta cada vez mais. Em ' + T('\\sin x') + ', cada grau ímpar a mais estende o trecho em que a aproximação é boa. Mova o centro ' + T('a') + ' e veja a faixa acompanhar.';
                setFn();
            } else {
                S('note1').innerHTML = '<strong>Leitura.</strong> Barras <b style="color:#a78bfa">roxas</b>: os termos ' + T('a_n') + '. Pontos <b style="color:#fbbf24">amarelos</b>: as somas parciais ' + T('S_N = a_1 + \\cdots + a_N') + '. Linha <b style="color:#34d399">verde</b>: o valor da série, quando ela converge.';
                S('note2').innerHTML = '<strong>Experimente.</strong> Compare a harmônica com ' + T('\\sum 1/n^2') + ': nas duas os termos vão a zero, mas só uma tem somas que se estabilizam. Na alternada, as somas oscilam em volta do limite, cada vez mais perto.';
                update();
            }
        }
        function setFn() {
            const F = TAY[S('fn').value];
            const A = S('a');
            if (F.aR) { A.disabled = false; A.min = F.aR[0]; A.max = F.aR[1]; A.value = 0; }
            else { A.disabled = true; A.min = -1; A.max = 1; A.value = 0; }
            S('x').min = F.view[0]; S('x').max = F.view[1];
            S('x').value = F === TAY.atan || F === TAY.ln || F === TAY.geo ? 0.5 : 1;
            update();
        }
        function partial(s, N) { const out = []; let sum = 0; for (let i = 0; i < N; i++) { sum += s.a(s.n0 + i); out.push(sum); } return out; }
        function taylor(F, n, a, x) { let s = 0, p = 1; for (let k = 0; k <= n; k++) { s += F.c(k, a) * p; p *= x - a; } return s; }

        function update() {
            if (mode() === 'num') {
                const s = SERIES[+S('ser').value], N = +S('n').value;
                S('n-v').textContent = N;
                const ps = partial(s, N), SN = ps[N - 1], aN = s.a(s.n0 + N - 1);
                S('out').innerHTML =
                    cell('Série', T(s.tex), true) +
                    cell(T('S_N') + ' (soma de ' + N + ' termos)', nf(SN, 8)) + cell('Último termo ' + T('a_N'), nf(aN, 6)) +
                    (s.S === null ? cell('Valor da série', 'diverge') + cell('Situação', 'somas sem limite') :
                        cell('Valor da série', T(/^\d+$/.test(s.Stex) ? s.Stex : s.Stex + ' \\approx ' + texNum(s.S, 8))) + cell('Erro ' + T('\\lvert S - S_N\\rvert'), nf(Math.abs(s.S - SN), 4))) +
                    cell('Por quê', '<span style="font-family:var(--sans);font-size:.88rem">' + s.nota + '</span>', true);
            } else {
                const F = TAY[S('fn').value], n = +S('deg').value, a = F.aR ? +S('a').value : 0, x = +S('x').value;
                S('deg-v').textContent = n; S('a-v').textContent = F.aR ? nf(a, 3) : '0 (fixo)'; S('x-v').textContent = nf(x, 3);
                const fx = F.f(x), px = taylor(F, n, a, x), R = F.R(a);
                S('out').innerHTML =
                    cell(T('P_{' + n + '}(x)'), T(polyTex(F, n, a)), true) +
                    cell(T('f(' + texNum(x, 3) + ')'), nf(fx, 7)) + cell(T('P_{' + n + '}(' + texNum(x, 3) + ')'), nf(px, 7)) +
                    cell('Erro ' + T('\\lvert f - P_n \\rvert'), Number.isFinite(fx) ? nf(Math.abs(fx - px), 4) : '—') +
                    cell('Raio de convergência', R === Infinity ? T('R = \\infty') : T('R = ' + texNum(R, 3))) +
                    cell('Situação', R === Infinity ? 'a série converge para ' + T('f') + ' em todo ' + T('x') + '; aumentar o grau sempre melhora.' :
                        Math.abs(x - a) < R ? T('x') + ' está dentro do intervalo: aumentar o grau melhora.' : T('x') + ' está fora do intervalo: aumentar o grau piora.', true);
            }
            draw();
        }
        function draw() {
            if (!plot.fit()) return;
            const c = plot.ctx;
            if (mode() === 'num') {
                const s = SERIES[+S('ser').value], N = +S('n').value, ps = partial(s, N);
                const terms = Array.from({ length: N }, (_, i) => s.a(s.n0 + i));
                const lo = Math.min(0, ...ps, ...terms, s.S === null ? 0 : s.S), hi = Math.max(0, ...ps, ...terms, s.S === null ? 0 : s.S);
                const pad = (hi - lo) * 0.12 || 1;
                plot.view = [s.n0 - 0.8, s.n0 + N - 0.2 + Math.max(0.5, N * 0.04), lo - pad, hi + pad];
                plot.clear(); plot.grid();
                const bw = Math.max(1.5, Math.min(14, plot.w / (N + 2) * 0.5));
                terms.forEach((t, i) => plot.line(s.n0 + i, 0, s.n0 + i, t, 'rgba(167,139,250,.75)', bw));
                if (s.S !== null) {
                    plot.line(plot.view[0], s.S, plot.view[1], s.S, '#34d399', 2, [7, 5]);
                    c.fillStyle = '#34d399'; c.font = '600 12px "JetBrains Mono", monospace'; c.textAlign = 'right';
                    c.fillText('S = ' + nf(s.S, 6), plot.w - 8, plot.Y(s.S) - 6);
                }
                c.save(); c.strokeStyle = 'rgba(251,191,36,.55)'; c.lineWidth = 1.4; c.beginPath();
                ps.forEach((v, i) => { const X = plot.X(s.n0 + i), Y = plot.Y(v); if (i) c.lineTo(X, Y); else c.moveTo(X, Y); }); c.stroke(); c.restore();
                const r = N > 80 ? 2.2 : N > 30 ? 3 : 4.5;
                ps.forEach((v, i) => plot.dot(s.n0 + i, v, '#fbbf24', r));
            } else {
                const F = TAY[S('fn').value], n = +S('deg').value, a = F.aR ? +S('a').value : 0, x = +S('x').value, R = F.R(a);
                plot.view = F.view.slice();
                plot.clear();
                if (R !== Infinity) {
                    c.fillStyle = 'rgba(167,139,250,.12)';
                    const x0 = plot.X(a - R), x1 = plot.X(a + R);
                    c.fillRect(x0, 0, x1 - x0, plot.h);
                    c.strokeStyle = 'rgba(167,139,250,.5)'; c.setLineDash([4, 4]); c.lineWidth = 1;
                    [x0, x1].forEach(px => { c.beginPath(); c.moveTo(px, 0); c.lineTo(px, plot.h); c.stroke(); }); c.setLineDash([]);
                }
                plot.grid();
                plot.curve(F.f, '#38bdf8', 2.6);
                plot.curve(t => taylor(F, n, a, t), '#fbbf24', 2.4);
                plot.line(x, plot.view[2], x, plot.view[3], 'rgba(226,232,240,.35)', 1, [3, 4]);
                const fx = F.f(x), px = taylor(F, n, a, x);
                if (Number.isFinite(fx)) plot.dot(x, fx, '#38bdf8', 5);
                if (Number.isFinite(px) && px > plot.view[2] - 50 && px < plot.view[3] + 50) plot.dot(x, px, '#fbbf24', 5, true);
                if (Number.isFinite(F.f(a))) plot.dot(a, F.f(a), '#f472b6', 4.5);
                c.fillStyle = '#f472b6'; c.font = '600 12px "JetBrains Mono", monospace'; c.textAlign = 'center';
                c.fillText('a', plot.X(a), Math.min(plot.h - 6, plot.Y(F.f(a)) + 20));
            }
        }
        plot.redraw = draw;
        S('mode').addEventListener('change', setMode);
        S('fn').addEventListener('change', setFn);
        ['ser', 'n', 'deg', 'a', 'x'].forEach(k => S(k).addEventListener('input', update));
        S('ser').addEventListener('change', update);
        setMode();
        return draw;
    }

    /* =========================================================
       SUPERFÍCIES, CURVAS DE NÍVEL E GRADIENTE
       ========================================================= */
    const SURF = [
        { label: 'Paraboloide x² + y²', src: 'x^2 + y^2', c: [0, 0], R: 2.5, P: [1, 1] },
        { label: 'Sela x² − y²', src: 'x^2 - y^2', c: [0, 0], R: 2.5, P: [1, 0.5] },
        { label: 'x³ − 3x + y² − 4y (cap. 9)', src: 'x^3 - 3x + y^2 - 4y', c: [0, 2], R: 2.5, P: [0.5, 1] },
        { label: 'Montanha e vale x·e^(−x² − y²)', src: 'x e^(-x^2 - y^2)', c: [0, 0], R: 2.2, P: [0.3, 0.4] },
        { label: 'Ondas sen(x)·cos(y)', src: 'sen(x) cos(y)', c: [0, 0], R: 3.5, P: [1, 0.5] },
        { label: 'Plano 2x + 3y', src: '2x + 3y', c: [0, 0], R: 2.5, P: [1, 1] }
    ];

    function initSuperficies(root) {
        root.innerHTML =
            '<div class="lab-grid">' +
              '<div class="lab-stage"><canvas id="sf-cv" style="cursor:grab"></canvas></div>' +
              '<div class="lab-side">' +
                '<div class="ctl"><label for="sf-pre">Exemplo</label><select id="sf-pre">' + SURF.map((s, i) => '<option value="' + i + '">' + s.label + '</option>').join('') + '</select></div>' +
                '<div class="custom-fn"><input id="sf-in" type="text" spellcheck="false" autocomplete="off" aria-label="Digite f(x, y)"><button class="btn small" id="sf-go" type="button">Plotar</button></div>' +
                '<div class="fn-hint" id="sf-hint"></div>' +
                '<div class="ctl"><label for="sf-view">Vista</label><select id="sf-view"><option value="3d">Superfície 3D (arraste para girar)</option><option value="lv">Curvas de nível (clique para mover P)</option></select></div>' +
                '<div class="ctl"><label for="sf-x">' + T('P') + ': ' + T('x_0') + ' = <b id="sf-x-v"></b></label><input id="sf-x" type="range" step="0.01"></div>' +
                '<div class="ctl"><label for="sf-y">' + T('P') + ': ' + T('y_0') + ' = <b id="sf-y-v"></b></label><input id="sf-y" type="range" step="0.01"></div>' +
                '<div class="ctl seg" style="flex-wrap:wrap;gap:8px 14px"><label><input type="checkbox" id="sf-grad" checked> ' + T('\\nabla f') + '</label><label><input type="checkbox" id="sf-tan" checked> plano tangente</label><label><input type="checkbox" id="sf-field"> campo de gradientes</label></div>' +
                '<div style="display:flex;gap:6px;flex-wrap:wrap"><button class="btn small" id="sf-crit" type="button"><i class="fa-solid fa-crosshairs"></i> Ir ao ponto crítico mais próximo</button></div>' +
                '<div class="readout" id="sf-out"></div>' +
              '</div>' +
            '</div>' +
            '<div class="lab-under">' +
              '<div class="lab-note"><strong>Como usar.</strong> Escolha um exemplo ou digite ' + T('f(x, y)') + ' (ex.: <code>x^2 + 3y^2</code>, <code>sen(x y)</code>, <code>e^(-x^2-y^2)</code>). Na vista 3D, arraste para girar; o ponto branco é ' + T('(x_0, y_0, f(x_0, y_0))') + ' e o quadriculado verde é o plano tangente. Nas curvas de nível, clique para mover ' + T('P') + '; a curva branca é a que passa por ' + T('P') + '.</div>' +
              '<div class="lab-note"><strong>Experimente.</strong> Nas curvas de nível, a seta ' + T('\\nabla f') + ' sempre cruza a curva branca em ângulo reto e aponta para os valores maiores. Use "Ir ao ponto crítico" no exemplo do capítulo 9: a partir de ' + T('x_0 > 0') + ' ele acha o mínimo; a partir de ' + T('x_0 < 0') + ', a sela.' +
              '<p class="muted-p">As derivadas são calculadas numericamente (diferenças centrais), com precisão de cerca de 6 algarismos.</p></div>' +
            '</div>';

        const S = k => $('#sf-' + k, root);
        const cv = S('cv');
        const st = { yaw: -0.65, pitch: 0.55, rot: true };
        let fn = null, ftex = '', dom = null, P = [0, 0], grid = null;
        const cell = (lab, val, wide) => '<div' + (wide ? ' class="wide"' : '') + '><span>' + lab + '</span><b' + (wide ? ' class="tex-line"' : '') + '>' + val + '</b></div>';

        function grad(x, y) { const h = 1e-5 * Math.max(1, Math.abs(x), Math.abs(y)); return [(fn(x + h, y) - fn(x - h, y)) / (2 * h), (fn(x, y + h) - fn(x, y - h)) / (2 * h)]; }
        function hess(x, y) {
            const h = 1e-3 * Math.max(1, Math.abs(x), Math.abs(y)), f0 = fn(x, y);
            return [(fn(x + h, y) - 2 * f0 + fn(x - h, y)) / (h * h), (fn(x, y + h) - 2 * f0 + fn(x, y - h)) / (h * h),
                (fn(x + h, y + h) - fn(x + h, y - h) - fn(x - h, y + h) + fn(x - h, y - h)) / (4 * h * h)];
        }
        const clean = v => Math.abs(v - Math.round(v)) < 2e-6 ? Math.round(v) : v;

        function setDomain(c, R) {
            dom = [c[0] - R, c[0] + R, c[1] - R, c[1] + R];
            S('x').min = dom[0]; S('x').max = dom[1]; S('y').min = dom[2]; S('y').max = dom[3];
        }
        function build() {
            /* grade de valores para as duas vistas */
            const N = 120, vals = new Float64Array((N + 1) * (N + 1));
            const fin = [];
            for (let j = 0; j <= N; j++) for (let i = 0; i <= N; i++) {
                const v = fn(dom[0] + (dom[1] - dom[0]) * i / N, dom[2] + (dom[3] - dom[2]) * j / N);
                vals[j * (N + 1) + i] = v; if (Number.isFinite(v)) fin.push(v);
            }
            fin.sort((a, b) => a - b);
            let lo = fin.length ? fin[Math.floor(fin.length * 0.01)] : 0, hi = fin.length ? fin[Math.ceil(fin.length * 0.99) - 1] : 1;
            if (!(hi > lo)) { lo -= 1; hi += 1; }
            grid = { N, vals, lo, hi };
        }
        function load(src) {
            try {
                const p = parse2(src);
                const test = p.f(0.37, -0.21);
                if (Number.isNaN(test) && Number.isNaN(p.f(1.3, 1.7))) throw new Error('A função não está definida nos pontos de teste.');
                fn = p.f; ftex = p.tex;
                S('in').classList.remove('bad'); S('hint').className = 'fn-hint';
                S('hint').innerHTML = 'Entendido como ' + T('f(x,y)=' + ftex);
                build(); update();
            } catch (e) {
                S('in').classList.add('bad'); S('hint').className = 'fn-hint err'; S('hint').textContent = e.message;
            }
        }
        function preset() {
            const s = SURF[+S('pre').value];
            S('in').value = s.src; setDomain(s.c, s.R); P = s.P.slice();
            S('x').value = P[0]; S('y').value = P[1];
            load(s.src);
        }
        function update() {
            if (!fn) return;
            S('x-v').textContent = nf(P[0], 4); S('y-v').textContent = nf(P[1], 4);
            const f0 = fn(P[0], P[1]), g = grad(P[0], P[1]).map(clean), gn = Math.hypot(g[0], g[1]);
            let html = cell(T('f(P)'), nf(clean(f0), 6)) + cell(T('\\lVert\\nabla f\\rVert'), nf(gn, 5)) +
                cell(T('\\nabla f(P) = (f_x, f_y)'), T('(' + texNum(g[0], 5) + ',\\ ' + texNum(g[1], 5) + ')'), true);
            if (Number.isFinite(f0) && Number.isFinite(gn)) {
                const term = (c, v, p) => Math.abs(c) < 1e-9 ? '' : (c < 0 ? ' - ' : ' + ') + (Math.abs(Math.abs(c) - 1) < 1e-9 ? '' : texNum(Math.abs(c), 4)) + (Math.abs(p) < 1e-9 ? v : '(' + v + (p < 0 ? ' + ' : ' - ') + texNum(Math.abs(p), 4) + ')');
                html += cell('Plano tangente', T('z = ' + texNum(clean(f0), 5) + term(g[0], 'x', P[0]) + term(g[1], 'y', P[1])), true);
            }
            if (gn < 1e-4) {
                const [fxx, fyy, fxy] = hess(P[0], P[1]).map(v => Math.abs(v) < 1e-4 ? 0 : v), D = fxx * fyy - fxy * fxy;
                const kind = Math.abs(D) < 1e-4 ? 'inconclusivo (D = 0)' : D < 0 ? 'ponto de sela' : fxx > 0 ? 'mínimo local' : 'máximo local';
                html += cell('Ponto crítico', T('D = f_{xx}f_{yy} - f_{xy}^2 \\approx ' + texNum(D, 4)) + ' → <span style="color:#34d399">' + kind + '</span>', true);
            } else {
                html += cell('Ponto crítico?', 'não: ' + T('\\nabla f \\ne \\vec 0') + '. Maior subida na direção ' + T('(' + texNum(g[0] / gn, 3) + ',\\ ' + texNum(g[1] / gn, 3) + ')') + ', com taxa ' + nf(gn, 4) + '.', true);
            }
            S('out').innerHTML = html;
            draw();
        }
        function newton() {
            if (!fn) return;
            let [x, y] = P;
            for (let it = 0; it < 60; it++) {
                const g = grad(x, y), [a, d, b] = hess(x, y), det = a * d - b * b;
                if (!Number.isFinite(det) || Math.abs(det) < 1e-12) break;
                const dx = (d * g[0] - b * g[1]) / det, dy = (a * g[1] - b * g[0]) / det;
                x -= dx; y -= dy;
                if (Math.hypot(dx, dy) < 1e-11) break;
            }
            const g = grad(x, y);
            if (!Number.isFinite(x) || Math.hypot(g[0], g[1]) > 1e-5 || x < dom[0] || x > dom[1] || y < dom[2] || y > dom[3]) {
                S('hint').className = 'fn-hint err'; S('hint').textContent = 'Não encontrei um ponto crítico perto de P dentro da janela. Mova P e tente de novo.';
                return;
            }
            S('hint').className = 'fn-hint'; S('hint').innerHTML = 'Entendido como ' + T('f(x,y)=' + ftex);
            P = [clean(+x.toFixed(9)), clean(+y.toFixed(9))]; S('x').value = P[0]; S('y').value = P[1];
            update();
        }

        /* ----- desenho ----- */
        function draw() {
            const g2 = canvas2d(cv); if (!g2 || !fn || !grid) return;
            st.rot = S('view').value === '3d';
            cv.style.cursor = st.rot ? 'grab' : 'crosshair';
            if (st.rot) draw3d(g2); else drawLevels(g2);
        }
        let L2 = null; /* transformação da vista de curvas de nível (para o clique) */
        function drawLevels({ c, W, H }) {
            const pad = 26, side = Math.min(W, H) - 2 * pad, ox = (W - side) / 2, oy = (H - side) / 2;
            const X = x => ox + (x - dom[0]) / (dom[1] - dom[0]) * side, Y = y => oy + side - (y - dom[2]) / (dom[3] - dom[2]) * side;
            L2 = { ox, oy, side };
            const { N, vals, lo, hi } = grid, cw = side / N, at = (i, j) => vals[j * (N + 1) + i];
            /* mapa de calor discreto */
            for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
                const v = (at(i, j) + at(i + 1, j) + at(i, j + 1) + at(i + 1, j + 1)) / 4;
                if (!Number.isFinite(v)) continue;
                c.fillStyle = heat((v - lo) / (hi - lo), 0.36, 1);
                c.fillRect(ox + i * cw, oy + side - (j + 1) * cw, cw + 0.6, cw + 0.6);
            }
            /* curvas de nível (marching squares) */
            const levels = []; for (let k = 1; k <= 13; k++) levels.push(lo + (hi - lo) * k / 14);
            const fP = fn(P[0], P[1]);
            const contour = (lev, color, width) => {
                c.save(); c.strokeStyle = color; c.lineWidth = width; c.beginPath();
                for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
                    const q = [at(i, j), at(i + 1, j), at(i + 1, j + 1), at(i, j + 1)];
                    if (q.some(v => !Number.isFinite(v))) continue;
                    const pts = [], E = [[0, 1, [0, 0], [1, 0]], [1, 2, [1, 0], [1, 1]], [2, 3, [1, 1], [0, 1]], [3, 0, [0, 1], [0, 0]]];
                    E.forEach(([a, b, A, B]) => {
                        if ((q[a] - lev) * (q[b] - lev) < 0 || (q[a] === lev && q[b] !== lev)) {
                            const t = (lev - q[a]) / (q[b] - q[a]);
                            pts.push([ox + (i + A[0] + (B[0] - A[0]) * t) * cw, oy + side - (j + A[1] + (B[1] - A[1]) * t) * cw]);
                        }
                    });
                    for (let k = 0; k + 1 < pts.length; k += 2) { c.moveTo(pts[k][0], pts[k][1]); c.lineTo(pts[k + 1][0], pts[k + 1][1]); }
                }
                c.stroke(); c.restore();
            };
            levels.forEach(lev => contour(lev, heat((lev - lo) / (hi - lo), 1, 0.95), 1.3));
            if (Number.isFinite(fP)) contour(fP, '#ffffff', 2.4);
            /* moldura e marcas */
            c.strokeStyle = 'rgba(148,163,184,.4)'; c.lineWidth = 1; c.strokeRect(ox, oy, side, side);
            c.fillStyle = '#94a3b8'; c.font = '11px "JetBrains Mono", monospace';
            c.textAlign = 'center'; c.fillText(nf(dom[0], 3), ox, oy + side + 14); c.fillText(nf(dom[1], 3), ox + side, oy + side + 14); c.fillText('x', ox + side / 2, oy + side + 14);
            c.textAlign = 'right'; c.fillText(nf(dom[2], 3), ox - 4, oy + side); c.fillText(nf(dom[3], 3), ox - 4, oy + 10); c.fillText('y', ox - 4, oy + side / 2);
            if (dom[0] < 0 && dom[1] > 0) { c.strokeStyle = 'rgba(203,213,225,.3)'; c.beginPath(); c.moveTo(X(0), oy); c.lineTo(X(0), oy + side); c.stroke(); }
            if (dom[2] < 0 && dom[3] > 0) { c.strokeStyle = 'rgba(203,213,225,.3)'; c.beginPath(); c.moveTo(ox, Y(0)); c.lineTo(ox + side, Y(0)); c.stroke(); }
            /* campo de gradientes */
            if (S('field').checked) {
                const M = 12, gs = [];
                for (let j = 0; j <= M; j++) for (let i = 0; i <= M; i++) {
                    const x = dom[0] + (dom[1] - dom[0]) * (i + 0.5) / (M + 1), y = dom[2] + (dom[3] - dom[2]) * (j + 0.5) / (M + 1), g = grad(x, y);
                    if (g.every(Number.isFinite)) gs.push([x, y, g, Math.hypot(g[0], g[1])]);
                }
                const gmax = Math.max(1e-12, ...gs.map(q => q[3])), Lmax = side / (M + 1) * 0.85;
                gs.forEach(([x, y, g, n]) => { if (n < 1e-9) return; const L = Lmax * Math.sqrt(n / gmax); arrowPx(c, X(x), Y(y), X(x) + g[0] / n * L, Y(y) - g[1] / n * L, 'rgba(226,232,240,.55)', 1.2); });
            }
            /* gradiente e direção da curva de nível em P */
            const g = grad(P[0], P[1]), gn = Math.hypot(g[0], g[1]), px = X(P[0]), py = Y(P[1]);
            if (S('grad').checked && gn > 1e-6) {
                const L = side * 0.16, ux = g[0] / gn, uy = g[1] / gn;
                c.save(); c.strokeStyle = 'rgba(255,255,255,.6)'; c.setLineDash([5, 4]); c.lineWidth = 1.4; c.beginPath();
                c.moveTo(px - uy * L * 0.7, py - ux * L * 0.7); c.lineTo(px + uy * L * 0.7, py + ux * L * 0.7); c.stroke(); c.restore();
                arrowPx(c, px, py, px + ux * L, py - uy * L, '#fbbf24', 3, '∇f');
            }
            c.fillStyle = '#ffffff'; c.beginPath(); c.arc(px, py, 5, 0, Math.PI * 2); c.fill();
            c.strokeStyle = '#0c1220'; c.lineWidth = 1.5; c.stroke();
            c.fillStyle = '#fff'; c.font = '600 12px "JetBrains Mono", monospace'; c.textAlign = 'left'; c.fillText('P', px + 8, py + 14);
        }
        function draw3d({ c, W, H }) {
            const M = 36, cx = (dom[0] + dom[1]) / 2, cyy = (dom[2] + dom[3]) / 2, hR = (dom[1] - dom[0]) / 2;
            const { lo, hi } = grid, zm = (lo + hi) / 2, zs = (hi - lo) / 2 || 1;
            const ZT = 0.75, nrm = (x, y, z) => [(x - cx) / hR, (y - cyy) / hR, clamp((z - zm) / zs, -1.25, 1.25) * ZT];
            const s = Math.min(W, H) * (W < 560 ? 0.27 : 0.34), Pj = projector(st.yaw, st.pitch, W / 2, H / 2 + H * 0.04, s);
            const floor = -ZT * 1.3;
            const seg = (a, b, color, w, dash) => { const A = Pj(a), B = Pj(b); c.save(); c.strokeStyle = color; c.lineWidth = w || 1; c.setLineDash(dash || []); c.beginPath(); c.moveTo(A[0], A[1]); c.lineTo(B[0], B[1]); c.stroke(); c.restore(); };
            /* piso com grade */
            for (let k = 0; k <= 8; k++) { const t = -1 + k / 4; seg([t, -1, floor], [t, 1, floor], 'rgba(148,163,184,.13)'); seg([-1, t, floor], [1, t, floor], 'rgba(148,163,184,.13)'); }
            /* eixos com rótulos */
            [[[1.25, -1, floor], 'x'], [[-1, 1.25, floor], 'y'], [[-1, -1, ZT * 1.3], 'z']].forEach(([e, l]) => {
                seg([-1, -1, floor], e, 'rgba(203,213,225,.5)', 1.2);
                const q = Pj(e); c.fillStyle = '#cbd5e1'; c.font = '600 13px "JetBrains Mono", monospace'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(l, q[0], q[1]);
            });
            c.textBaseline = 'alphabetic';
            /* malha da superfície */
            const pts = [];
            for (let j = 0; j <= M; j++) { pts.push([]); for (let i = 0; i <= M; i++) { const x = dom[0] + (dom[1] - dom[0]) * i / M, y = dom[2] + (dom[3] - dom[2]) * j / M, z = fn(x, y); pts[j].push(Number.isFinite(z) ? nrm(x, y, z) : null); } }
            const faces = [];
            const light = [-0.35, -0.45, 0.82];
            for (let j = 0; j < M; j++) for (let i = 0; i < M; i++) {
                const q = [pts[j][i], pts[j][i + 1], pts[j + 1][i + 1], pts[j + 1][i]];
                if (q.some(v => !v)) continue;
                const u = [q[2][0] - q[0][0], q[2][1] - q[0][1], q[2][2] - q[0][2]], v = [q[3][0] - q[1][0], q[3][1] - q[1][1], q[3][2] - q[1][2]];
                const n = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]], nn = Math.hypot(...n) || 1;
                const shade = 0.45 + 0.55 * Math.abs((n[0] * light[0] + n[1] * light[1] + n[2] * light[2]) / nn);
                const zAvg = (q[0][2] + q[1][2] + q[2][2] + q[3][2]) / 4;
                const pr = q.map(Pj);
                faces.push({ pr, d: pr.reduce((a, p) => a + p[2], 0) / 4, fill: heat((zAvg / ZT + 1) / 2, shade, 0.97), stroke: 'rgba(12,18,32,.35)' });
            }
            /* plano tangente (em pedaços, para misturar na ordem de profundidade) */
            const f0 = fn(P[0], P[1]), g = grad(P[0], P[1]);
            if (S('tan').checked && Number.isFinite(f0) && g.every(Number.isFinite)) {
                const d = hR * 0.45, K = 6;
                for (let j = 0; j < K; j++) for (let i = 0; i < K; i++) {
                    const corner = (a, b) => { const x = P[0] - d + 2 * d * a / K, y = P[1] - d + 2 * d * b / K; return Pj(nrm(x, y, f0 + g[0] * (x - P[0]) + g[1] * (y - P[1]))); };
                    const pr = [corner(i, j), corner(i + 1, j), corner(i + 1, j + 1), corner(i, j + 1)];
                    faces.push({ pr, d: pr.reduce((a, p) => a + p[2], 0) / 4 + 0.002, fill: 'rgba(52,211,153,.30)', stroke: 'rgba(52,211,153,.75)' });
                }
            }
            faces.sort((a, b) => a.d - b.d);
            c.lineWidth = 0.6;
            faces.forEach(F => { c.beginPath(); F.pr.forEach((p, k) => k ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])); c.closePath(); c.fillStyle = F.fill; c.fill(); c.strokeStyle = F.stroke; c.stroke(); });
            /* ponto P, sua sombra no piso e o gradiente no piso */
            if (Number.isFinite(f0)) {
                const top = nrm(P[0], P[1], f0), bot = [top[0], top[1], floor];
                seg(top, bot, 'rgba(255,255,255,.55)', 1.2, [4, 4]);
                const B = Pj(bot); c.fillStyle = 'rgba(255,255,255,.7)'; c.beginPath(); c.arc(B[0], B[1], 3, 0, Math.PI * 2); c.fill();
                const gn = Math.hypot(g[0], g[1]);
                if (S('grad').checked && gn > 1e-6) { const E = Pj([bot[0] + g[0] / gn * 0.42, bot[1] + g[1] / gn * 0.42, floor]); arrowPx(c, B[0], B[1], E[0], E[1], '#fbbf24', 2.6, '∇f'); }
                const A = Pj(top); c.fillStyle = '#ffffff'; c.beginPath(); c.arc(A[0], A[1], 5, 0, Math.PI * 2); c.fill(); c.strokeStyle = '#0c1220'; c.lineWidth = 1.5; c.stroke();
            }
        }

        S('pre').addEventListener('change', preset);
        S('go').addEventListener('click', () => load(S('in').value));
        S('in').addEventListener('keydown', e => { if (e.key === 'Enter') load(S('in').value); });
        S('x').addEventListener('input', () => { P[0] = +S('x').value; update(); });
        S('y').addEventListener('input', () => { P[1] = +S('y').value; update(); });
        S('view').addEventListener('change', draw);
        ['grad', 'tan', 'field'].forEach(k => S(k).addEventListener('change', draw));
        S('crit').addEventListener('click', newton);
        dragRotate(cv, st, () => { if (st.rot) draw(); });
        cv.addEventListener('pointerdown', e => {
            if (st.rot || !L2) return;
            const r = cv.getBoundingClientRect(), mx = e.clientX - r.left, my = e.clientY - r.top;
            const x = dom[0] + (mx - L2.ox) / L2.side * (dom[1] - dom[0]), y = dom[2] + (L2.oy + L2.side - my) / L2.side * (dom[3] - dom[2]);
            if (x < dom[0] || x > dom[1] || y < dom[2] || y > dom[3]) return;
            P = [+x.toFixed(2), +y.toFixed(2)]; S('x').value = P[0]; S('y').value = P[1]; update();
        });
        if (window.ResizeObserver) new ResizeObserver(draw).observe(cv);
        preset();
        return draw;
    }

    /* =========================================================
       INTEGRAIS DUPLAS (somas de Riemann)
       ========================================================= */
    const DUP = [
        { label: 'x + 2y no retângulo [0, 2] × [0, 1]', f: 'x + 2y', type: 'rect', a: '0', b: '2', c: '0', d: '1', ex: 4, extex: '4' },
        { label: 'xy entre y = x² e y = x', f: 'x y', type: 'curv', a: '0', b: '1', c: 'x^2', d: 'x', ex: 1 / 24, extex: '\\tfrac{1}{24}' },
        { label: 'Volume sob 4 − x − y no triângulo', f: '4 - x - y', type: 'curv', a: '0', b: '2', c: '0', d: '2 - x', ex: 16 / 3, extex: '\\tfrac{16}{3}' },
        { label: 'x² + y² no disco de raio 2', f: 'x^2 + y^2', type: 'curv', a: '-2', b: '2', c: '-raiz(4 - x^2)', d: 'raiz(4 - x^2)', ex: 8 * Math.PI, extex: '8\\pi' },
        { label: 'Área entre y = x² e y = 2x', f: '1', type: 'curv', a: '0', b: '2', c: 'x^2', d: '2x', ex: 4 / 3, extex: '\\tfrac43' },
        { label: 'e^(y²) no triângulo (cap. 10)', f: 'e^(y^2)', type: 'curv', a: '0', b: '1', c: 'x', d: '1', ex: (Math.E - 1) / 2, extex: '\\tfrac{e-1}{2}' },
        { label: 'sen(x)·y, com troca de sinal', f: 'sen(x) y', type: 'rect', a: '0', b: '2pi', c: '0', d: '1', ex: 0, extex: '0' }
    ];

    function initDuplas(root) {
        const inp = (id, lab) => '<div class="ctl" style="margin:0"><label for="dp-' + id + '" id="dp-' + id + '-l">' + lab + '</label><input class="plain-in" id="dp-' + id + '" spellcheck="false" autocomplete="off"></div>';
        root.innerHTML =
            '<div class="lab-grid">' +
              '<div class="lab-stage"><canvas id="dp-cv"></canvas></div>' +
              '<div class="lab-side">' +
                '<div class="ctl"><label for="dp-pre">Exemplo</label><select id="dp-pre">' + DUP.map((s, i) => '<option value="' + i + '">' + s.label + '</option>').join('') + '</select></div>' +
                '<div class="ctl"><label for="dp-f">' + T('f(x, y)') + '</label><input class="plain-in" id="dp-f" spellcheck="false" autocomplete="off"></div>' +
                '<div class="ctl"><label for="dp-type">Região</label><select id="dp-type"><option value="rect">Retângulo a ≤ x ≤ b, c ≤ y ≤ d</option><option value="curv">Entre curvas: a ≤ x ≤ b, g₁(x) ≤ y ≤ g₂(x)</option></select></div>' +
                '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px 8px">' + inp('a', T('a')) + inp('b', T('b')) + inp('c', T('c')) + inp('d', T('d')) + '</div>' +
                '<div class="fn-hint" id="dp-hint"></div>' +
                '<div class="ctl"><label for="dp-n">Subdivisões: <b id="dp-n-v"></b></label><input id="dp-n" type="range" min="2" max="60" step="1" value="8"></div>' +
                '<div class="ctl"><label for="dp-view">Vista</label><select id="dp-view"><option value="3d">Colunas 3D (arraste para girar)</option><option value="top">Vista de cima</option></select></div>' +
                '<div class="readout" id="dp-out"></div>' +
              '</div>' +
            '</div>' +
            '<div class="lab-under">' +
              '<div class="lab-note"><strong>Como funciona.</strong> O retângulo que contém a região é dividido em ' + T('n \\times n') + ' células. Cada célula cujo centro está na região vira uma coluna de altura ' + T('f') + ' no centro. A soma dos volumes ' + T('\\sum f(x_i^*, y_j^*)\\,\\Delta A') + ' aproxima ' + T('\\iint_D f\\,dA') + '. Colunas <b style="color:#38bdf8">azuis</b> contam positivo; <b style="color:#f472b6">rosa</b>, negativo.</div>' +
              '<div class="lab-note"><strong>Experimente.</strong> No disco, a soma erra por dois motivos: a altura (o ponto central) e a borda em degraus. Aumente as subdivisões e veja os dois erros caírem. No último exemplo, volumes positivos e negativos se cancelam. Digite suas próprias funções e curvas (use ' + T('x') + ' em ' + T('g_1') + ' e ' + T('g_2') + ').' +
              '<p class="muted-p">O valor de referência é calculado por Simpson iterado (precisão de muitas casas); nos exemplos, o valor exato aparece ao lado.</p></div>' +
            '</div>';

        const S = k => $('#dp-' + k, root);
        const cv = S('cv');
        const st = { yaw: -0.75, pitch: 0.6, rot: true };
        let M = null; /* modelo: f, região, células */
        const cell = (lab, val, wide) => '<div' + (wide ? ' class="wide"' : '') + '><span>' + lab + '</span><b>' + val + '</b></div>';

        function labels() {
            const rect = S('type').value === 'rect';
            S('c-l').innerHTML = rect ? T('c') : T('g_1(x)'); S('d-l').innerHTML = rect ? T('d') : T('g_2(x)');
        }
        function preset() {
            const p = DUP[+S('pre').value];
            S('f').value = p.f; S('type').value = p.type; S('a').value = p.a; S('b').value = p.b; S('c').value = p.c; S('d').value = p.d;
            labels(); build();
        }
        function num(id) { const p = parse1(S(id).value); const v = p.f(0); if (!Number.isFinite(v)) throw new Error('"' + S(id).value + '" não é um número.'); return v; }
        function build() {
            root.querySelectorAll('.plain-in').forEach(el => el.classList.remove('bad'));
            let where = 'f';
            try {
                const F = parse2(S('f').value); where = 'a';
                const a = num('a'); where = 'b';
                const b = num('b'); where = 'c';
                if (!(b > a)) { where = 'b'; throw new Error('É preciso ter a < b.'); }
                const rect = S('type').value === 'rect';
                let g1, g2;
                if (rect) { const c = num('c'); where = 'd'; const d = num('d'); if (!(d > c)) throw new Error('É preciso ter c < d.'); g1 = () => c; g2 = () => d; }
                else { g1 = parse1(S('c').value).f; where = 'd'; g2 = parse1(S('d').value).f; }
                where = 'c';
                /* faixa vertical e checagem g1 ≤ g2 */
                let ylo = Infinity, yhi = -Infinity, bad = false;
                for (let i = 0; i <= 400; i++) {
                    const x = a + (b - a) * i / 400, u = g1(x), v = g2(x);
                    if (!Number.isFinite(u) || !Number.isFinite(v)) { bad = true; continue; }
                    if (u > v + 1e-9) throw new Error('Nesse intervalo, g₁(x) fica acima de g₂(x) (em x ≈ ' + nf(x, 3) + ').');
                    ylo = Math.min(ylo, u); yhi = Math.max(yhi, v);
                }
                if (!(yhi > ylo)) throw new Error('A região está vazia.');
                if (bad) throw new Error('As curvas não estão definidas em todo o intervalo [a, b].');
                /* referência: Simpson iterado (subdivisões extras nas pontas ajudam no disco) */
                const ref = simpson(x => { const u = g1(x), v = g2(x); return v > u ? simpson(y => { const z = F.f(x, y); return Number.isFinite(z) ? z : 0; }, u, v, 300) : 0; }, a, b, 600);
                const area = simpson(x => Math.max(0, g2(x) - g1(x)), a, b, 2000);
                M = { F, a, b, g1, g2, ylo, yhi, ref, area, rect };
                const pick = DUP[+S('pre').value], same = pick.f === S('f').value && pick.type === S('type').value && ['a', 'b', 'c', 'd'].every(k => pick[k] === S(k).value);
                M.exact = same ? pick : null;
                S('hint').className = 'fn-hint';
                S('hint').innerHTML = T('\\iint_D ' + (/[+-]/.test(F.tex) ? '(' + F.tex + ')' : F.tex) + '\\,dA') + ' com ' + (rect ? T('D = [' + texNum(a, 4) + ', ' + texNum(b, 4) + '] \\times [' + texNum(ylo, 4) + ', ' + texNum(yhi, 4) + ']') : T(texNum(a, 4) + ' \\le x \\le ' + texNum(b, 4)) + ', ' + T(parse1(S('c').value).tex + ' \\le y \\le ' + parse1(S('d').value).tex));
                update();
            } catch (e) {
                M = null; S(where).classList.add('bad');
                S('hint').className = 'fn-hint err'; S('hint').textContent = e.message;
                S('out').innerHTML = ''; draw();
            }
        }
        function cells() {
            const n = +S('n').value, dx = (M.b - M.a) / n, dy = (M.yhi - M.ylo) / n, list = [];
            for (let i = 0; i < n; i++) {
                const xm = M.a + (i + 0.5) * dx, u = M.g1(xm), v = M.g2(xm);
                for (let j = 0; j < n; j++) {
                    const ym = M.ylo + (j + 0.5) * dy;
                    if (ym < u - 1e-12 || ym > v + 1e-12) continue;
                    const z = M.F.f(xm, ym);
                    list.push({ i, j, x0: M.a + i * dx, y0: M.ylo + j * dy, dx, dy, z: Number.isFinite(z) ? z : 0 });
                }
            }
            return { n, dx, dy, list };
        }
        function update() {
            S('n-v').textContent = S('n').value + ' × ' + S('n').value;
            if (!M) return;
            const C = cells(); M.C = C;
            const sum = C.list.reduce((s, q) => s + q.z * q.dx * q.dy, 0), areaR = C.list.length * C.dx * C.dy;
            const err = Math.abs(sum - (M.exact ? M.exact.ex : M.ref));
            S('out').innerHTML =
                cell('Soma de Riemann', nf(sum, 7)) +
                cell('Valor da integral', M.exact ? T(M.exact.extex + (/^-?\d+$/.test(M.exact.extex) ? '' : ' \\approx ' + texNum(M.exact.ex, 7))) : nf(M.ref, 8)) +
                cell('Erro', nf(err, 4) + (Math.abs(M.exact ? M.exact.ex : M.ref) > 1e-9 ? ' (' + nf(100 * err / Math.abs(M.exact ? M.exact.ex : M.ref), 3) + '%)' : '')) +
                cell('Colunas usadas', C.list.length + ' de ' + C.n * C.n) +
                cell('Área da região', nf(M.area, 6)) + cell('Área das células', nf(areaR, 6));
            draw();
        }

        function draw() {
            const g2 = canvas2d(cv); if (!g2) return;
            st.rot = S('view').value === '3d';
            cv.style.cursor = st.rot ? 'grab' : 'default';
            if (!M || !M.C) return;
            if (st.rot) draw3d(g2); else drawTop(g2);
        }
        function frame(W, H) {
            const pad = 34, span = Math.max(M.b - M.a, M.yhi - M.ylo), cx = (M.a + M.b) / 2, cy = (M.ylo + M.yhi) / 2, side = Math.min(W, H) - 2 * pad;
            return { X: x => W / 2 + (x - cx) / span * side, Y: y => H / 2 - (y - cy) / span * side, side, span, cx, cy };
        }
        function boundary(c, X, Y, color, width) {
            c.save(); c.strokeStyle = color; c.lineWidth = width; c.beginPath();
            const K = 300;
            for (let k = 0; k <= K; k++) { const x = M.a + (M.b - M.a) * k / K; k ? c.lineTo(X(x), Y(M.g1(x))) : c.moveTo(X(x), Y(M.g1(x))); }
            for (let k = K; k >= 0; k--) { const x = M.a + (M.b - M.a) * k / K; c.lineTo(X(x), Y(M.g2(x))); }
            c.closePath(); c.stroke(); c.restore();
        }
        function drawTop({ c, W, H }) {
            const { X, Y } = frame(W, H), C = M.C, zmax = Math.max(1e-12, ...C.list.map(q => Math.abs(q.z)));
            /* grade da caixa envolvente */
            c.strokeStyle = 'rgba(148,163,184,.12)'; c.lineWidth = 1;
            if (C.n <= 40) for (let k = 0; k <= C.n; k++) {
                c.beginPath(); c.moveTo(X(M.a + k * C.dx), Y(M.ylo)); c.lineTo(X(M.a + k * C.dx), Y(M.yhi)); c.stroke();
                c.beginPath(); c.moveTo(X(M.a), Y(M.ylo + k * C.dy)); c.lineTo(X(M.b), Y(M.ylo + k * C.dy)); c.stroke();
            }
            C.list.forEach(q => {
                const t = Math.abs(q.z) / zmax;
                c.fillStyle = q.z >= 0 ? 'rgba(56,189,248,' + (0.18 + 0.6 * t) + ')' : 'rgba(244,114,182,' + (0.18 + 0.6 * t) + ')';
                const x0 = X(q.x0), x1 = X(q.x0 + q.dx), y0 = Y(q.y0), y1 = Y(q.y0 + q.dy);
                c.fillRect(x0, y1, x1 - x0, y0 - y1);
                if (C.n <= 30) { c.strokeStyle = 'rgba(12,18,32,.6)'; c.strokeRect(x0, y1, x1 - x0, y0 - y1); }
            });
            boundary(c, X, Y, '#fbbf24', 2.2);
            /* eixos */
            c.strokeStyle = 'rgba(203,213,225,.45)'; c.lineWidth = 1.2;
            c.beginPath(); c.moveTo(0, Y(0)); c.lineTo(W, Y(0)); c.stroke(); c.beginPath(); c.moveTo(X(0), 0); c.lineTo(X(0), H); c.stroke();
            c.fillStyle = '#94a3b8'; c.font = '11px "JetBrains Mono", monospace'; c.textAlign = 'center';
            c.fillText(nf(M.a, 3), X(M.a), Y(M.ylo) + 16); c.fillText(nf(M.b, 3), X(M.b), Y(M.ylo) + 16);
            c.textAlign = 'right'; c.fillText(nf(M.ylo, 3), X(M.a) - 6, Y(M.ylo) + 4); c.fillText(nf(M.yhi, 3), X(M.a) - 6, Y(M.yhi) + 4);
        }
        function draw3d({ c, W, H }) {
            const C = M.C, span = Math.max(M.b - M.a, M.yhi - M.ylo), cx = (M.a + M.b) / 2, cy = (M.ylo + M.yhi) / 2;
            const zmax = Math.max(1e-12, ...C.list.map(q => Math.abs(q.z))), zmin = Math.min(0, ...C.list.map(q => q.z)), zTop = Math.max(0, ...C.list.map(q => q.z));
            const ZS = 1.1 / Math.max(zmax, 1e-12);
            const sxn = Math.max(M.b - M.a, span / 2), syn = Math.max(M.yhi - M.ylo, span / 2);
            const N3 = (x, y, z) => [(x - cx) / sxn * 2, (y - cy) / syn * 2, z * ZS];
            const s = Math.min(W, H) * (W < 560 ? 0.26 : 0.33), Pj = projector(st.yaw, st.pitch, W / 2, H / 2 + H * 0.06 + (zTop + zmin) / 2 * ZS * s * 0.5 * Math.cos(st.pitch), s);
            /* piso: contorno da região */
            const fl = (x, y) => Pj(N3(x, y, 0));
            c.save(); c.strokeStyle = 'rgba(148,163,184,.18)'; c.lineWidth = 1;
            for (let k = 0; k <= 8; k++) {
                const t = k / 8; let A = fl(M.a + (M.b - M.a) * t, M.ylo), B = fl(M.a + (M.b - M.a) * t, M.yhi); c.beginPath(); c.moveTo(A[0], A[1]); c.lineTo(B[0], B[1]); c.stroke();
                A = fl(M.a, M.ylo + (M.yhi - M.ylo) * t); B = fl(M.b, M.ylo + (M.yhi - M.ylo) * t); c.beginPath(); c.moveTo(A[0], A[1]); c.lineTo(B[0], B[1]); c.stroke();
            }
            c.restore();
            c.save(); c.strokeStyle = '#fbbf24'; c.lineWidth = 2; c.beginPath();
            const K = 200;
            for (let k = 0; k <= K; k++) { const x = M.a + (M.b - M.a) * k / K, p = fl(x, M.g1(x)); k ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1]); }
            for (let k = K; k >= 0; k--) { const x = M.a + (M.b - M.a) * k / K, p = fl(x, M.g2(x)); c.lineTo(p[0], p[1]); }
            c.closePath(); c.stroke(); c.restore();
            /* eixos */
            const O = [M.a, M.ylo];
            [[[M.b + span * 0.12, M.ylo, 0], 'x'], [[M.a, M.yhi + span * 0.12, 0], 'y']].forEach(([e, l]) => {
                const A = fl(O[0], O[1]), B = Pj(N3(e[0], e[1], 0)); c.strokeStyle = 'rgba(203,213,225,.5)'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(A[0], A[1]); c.lineTo(B[0], B[1]); c.stroke();
                c.fillStyle = '#cbd5e1'; c.font = '600 13px "JetBrains Mono", monospace'; c.textAlign = 'center'; c.fillText(l, B[0] + 6, B[1] + 4);
            });
            /* colunas: faces visíveis, em ordem de profundidade */
            const faces = [];
            const view = Pj([0, 0, 0]), toward = (dx, dy) => { const a = Pj([dx, dy, 0]); return a[2] > view[2]; };
            const showXp = toward(0.01, 0), showYp = toward(0, 0.01);
            C.list.forEach(q => {
                const t = Math.abs(q.z) / zmax, pos = q.z >= 0, base = pos ? [56, 189, 248] : [244, 114, 182];
                const col = k => 'rgba(' + base.map(v => Math.round(v * k)).join(',') + ',.96)';
                const x0 = q.x0, x1 = q.x0 + q.dx, y0 = q.y0, y1 = q.y0 + q.dy, zA = Math.min(0, q.z), zB = Math.max(0, q.z);
                const P = (x, y, zz) => Pj(N3(x, y, zz));
                const top = [P(x0, y0, zB), P(x1, y0, zB), P(x1, y1, zB), P(x0, y1, zB)];
                const sx = showXp ? x1 : x0, sy = showYp ? y1 : y0;
                const fx = [P(sx, y0, zA), P(sx, y1, zA), P(sx, y1, zB), P(sx, y0, zB)];
                const fy = [P(x0, sy, zA), P(x1, sy, zA), P(x1, sy, zB), P(x0, sy, zB)];
                const d = P((x0 + x1) / 2, (y0 + y1) / 2, (zA + zB) / 2)[2];
                const sideK = 0.55 + 0.15 * t;
                faces.push({ d, polys: [[fx, col(sideK * 0.85)], [fy, col(sideK)], [top, col(0.75 + 0.25 * t)]] });
            });
            faces.sort((a, b) => a.d - b.d);
            c.lineWidth = C.n > 30 ? 0.3 : 0.7; c.strokeStyle = 'rgba(12,18,32,.55)';
            faces.forEach(F => F.polys.forEach(([pts, fill]) => { c.beginPath(); pts.forEach((p, k) => k ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])); c.closePath(); c.fillStyle = fill; c.fill(); c.stroke(); }));
        }

        S('pre').addEventListener('change', preset);
        S('type').addEventListener('change', () => { labels(); build(); });
        ['f', 'a', 'b', 'c', 'd'].forEach(k => S(k).addEventListener('change', build));
        ['f', 'a', 'b', 'c', 'd'].forEach(k => S(k).addEventListener('keydown', e => { if (e.key === 'Enter') build(); }));
        S('n').addEventListener('input', update);
        S('view').addEventListener('change', draw);
        dragRotate(cv, st, () => { if (st.rot) draw(); });
        if (window.ResizeObserver) new ResizeObserver(draw).observe(cv);
        preset();
        return draw;
    }

    return { init: { series: initSeries, superficies: initSuperficies, duplas: initDuplas }, polyTex, TAY };
})();
