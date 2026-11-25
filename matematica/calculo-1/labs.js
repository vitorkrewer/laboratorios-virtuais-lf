/* Cálculo I: simuladores de Limites, Derivada (secante → tangente) e Integral (somas de Riemann). */
window.MATH = window.MATH || {};

MATH.labs = (function () {
    'use strict';

    const { T, COLORS, Plot, fmt, simpson, customBox, wireCustom } = MATH.plot;
    const $ = (s, r) => (r || document).querySelector(s);

    /* ---------- biblioteca de funções (sem eval) ---------- */
    const FN = {
        x2:   { label: 'x²',      f: x => x * x,             df: x => 2 * x,           F: x => x * x * x / 3,                     view: [-4, 4, -2, 10],  x0: 1,   dom: [-4, 4], ab: [0, 2] },
        x3:   { label: 'x³',      f: x => x * x * x,         df: x => 3 * x * x,       F: x => Math.pow(x, 4) / 4,                view: [-3, 3, -12, 12], x0: 1,   dom: [-3, 3], ab: [-1, 2] },
        poly: { label: 'x³ − 3x', f: x => x * x * x - 3 * x, df: x => 3 * x * x - 3,   F: x => Math.pow(x, 4) / 4 - 1.5 * x * x, view: [-3, 3, -6, 6],   x0: 0.5, dom: [-3, 3], ab: [-2, 2] },
        sin:  { label: 'sen x',   f: Math.sin,               df: Math.cos,             F: x => -Math.cos(x),                       view: [-7, 7, -2, 2],   x0: 1,   dom: [-7, 7], ab: [0, Math.PI] },
        cos:  { label: 'cos x',   f: Math.cos,               df: x => -Math.sin(x),    F: Math.sin,                                view: [-7, 7, -2, 2],   x0: 1,   dom: [-7, 7], ab: [0, Math.PI / 2] },
        exp:  { label: 'eˣ',      f: Math.exp,               df: Math.exp,             F: Math.exp,                                view: [-3, 3, -1, 12],  x0: 1,   dom: [-3, 3], ab: [0, 2] },
        sqrt: { label: '√x',      f: x => x < 0 ? NaN : Math.sqrt(x), df: x => x <= 0 ? NaN : 0.5 / Math.sqrt(x), F: x => x < 0 ? NaN : 2 / 3 * Math.pow(x, 1.5), view: [-1, 9, -1, 4], x0: 4, dom: [0, 9], ab: [0, 4] },
        inv:  { label: '1/x',     f: x => 1 / x,             df: x => -1 / (x * x),    F: null,                                    view: [-4, 4, -6, 6],   x0: 1,   dom: [-4, 4], ab: null }
    };

    function fnOptions(keys, sel) {
        return keys.map(k => '<option value="' + k + '"' + (k === sel ? ' selected' : '') + '>f(x) = ' + FN[k].label + '</option>').join('') +
            '<option value="custom">✎ Digitar minha função…</option>';
    }

    /* ============================================================
       LIMITES
       ============================================================ */
    const LIM = [
        { label: '(x² − 4)/(x − 2),  x → 2', tex: '\\frac{x^2-4}{x-2}', a: 2, f: x => (x * x - 4) / (x - 2), L: 4,
          res: '\\lim_{x\\to 2}\\frac{x^2-4}{x-2}=4', nota: 'Buraco removível. Fatorando, x² − 4 = (x − 2)(x + 2), e o fator (x − 2) cancela. Sobra x + 2, que vale 4 em x = 2.' },
        { label: 'sen(x)/x,  x → 0', tex: '\\frac{\\sin x}{x}', a: 0, f: x => Math.sin(x) / x, L: 1,
          res: '\\lim_{x\\to 0}\\frac{\\sin x}{x}=1', nota: 'Limite fundamental trigonométrico. Não sai por álgebra simples; a prova usa o Teorema do Confronto.' },
        { label: '(1 − cos x)/x²,  x → 0', tex: '\\frac{1-\\cos x}{x^2}', a: 0, f: x => (1 - Math.cos(x)) / (x * x), L: 0.5,
          res: '\\lim_{x\\to 0}\\frac{1-\\cos x}{x^2}=\\tfrac12', nota: 'Multiplicando por (1 + cos x) em cima e embaixo, aparece (sen²x / x²) · 1/(1 + cos x), que tende a 1 · 1/2.' },
        { label: '(√(1 + x) − 1)/x,  x → 0', tex: '\\frac{\\sqrt{1+x}-1}{x}', a: 0, f: x => (Math.sqrt(1 + x) - 1) / x, L: 0.5,
          res: '\\lim_{x\\to 0}\\frac{\\sqrt{1+x}-1}{x}=\\tfrac12', nota: 'Racionalize multiplicando pelo conjugado √(1 + x) + 1: o numerador vira x e o x cancela.' },
        { label: '(1 + x)^(1/x),  x → 0', tex: '(1+x)^{1/x}', a: 0, f: x => Math.pow(1 + x, 1 / x), L: Math.E,
          res: '\\lim_{x\\to 0}(1+x)^{1/x}=e', nota: 'É a definição do número de Euler, e ≈ 2,71828. A forma é 1^∞, uma indeterminação.' },
        { label: '|x|/x,  x → 0', tex: '\\frac{|x|}{x}', a: 0, f: x => Math.abs(x) / x, L: null,
          res: '\\lim_{x\\to 0^-}=-1\\neq \\lim_{x\\to 0^+}=1\\ \\Rightarrow\\ \\nexists', nota: 'Os limites laterais existem, mas são diferentes (−1 e 1). Logo o limite NÃO existe.' },
        { label: '1/x²,  x → 0', tex: '\\frac{1}{x^2}', a: 0, f: x => 1 / (x * x), L: null,
          res: '\\lim_{x\\to 0}\\frac{1}{x^2}=+\\infty', nota: 'Os dois lados crescem sem limite. Dizemos que o limite é +∞ (assíntota vertical em x = 0).' },
        { label: '1/x,  x → 0', tex: '\\frac1x', a: 0, f: x => 1 / x, L: null,
          res: '\\lim_{x\\to 0^-}\\tfrac1x=-\\infty,\\ \\lim_{x\\to 0^+}\\tfrac1x=+\\infty', nota: 'Cada lado vai para um infinito diferente, então o limite bilateral não existe.' },
        { label: 'sen(1/x),  x → 0', tex: '\\sin\\frac1x', a: 0, f: x => Math.sin(1 / x), L: null,
          res: '\\lim_{x\\to 0}\\sin\\frac1x\\ \\text{não existe}', nota: 'A função oscila entre −1 e 1 cada vez mais rápido. Não se aproxima de nenhum valor.' }
    ];

    function initLimites(root) {
        root.innerHTML =
            '<div class="lab-grid">' +
              '<div class="lab-stage"><canvas id="lim-cv"></canvas></div>' +
              '<div class="lab-side">' +
                '<div class="ctl"><label for="lim-sel">Exemplo</label><select id="lim-sel">' +
                    LIM.map((l, i) => '<option value="' + i + '">' + l.label + '</option>').join('') + '</select></div>' +
                '<div class="ctl"><label for="lim-d">Janela ao redor de a: <b id="lim-dv"></b></label>' +
                    '<input id="lim-d" type="range" min="-5" max="0.3" step="0.01" value="0"></div>' +
                '<div class="ctl-row"><button class="btn small" id="lim-zoom" type="button"><i class="fa-solid fa-magnifying-glass-plus"></i> Dar zoom em a</button></div>' +
                '<div class="readout" id="lim-read"></div>' +
              '</div>' +
            '</div>' +
            '<div class="lab-under">' +
              '<div class="table-wrap"><table class="lab-table" id="lim-table"></table></div>' +
              '<div class="lab-note" id="lim-note"></div>' +
            '</div>';

        const plot = new Plot($('#lim-cv', root));
        const sel = $('#lim-sel', root), sd = $('#lim-d', root);
        let cur = LIM[0];

        function draw() {
            if (!plot.fit()) return;
            const d = Math.pow(10, +sd.value);
            $('#lim-dv', root).textContent = '± ' + fmt(d, 3);
            const a = cur.a, f = cur.f;
            const xl = a - d, xr = a + d;
            const pts = [f(xl), f(xr), f(a - d / 2), f(a + d / 2), f(a - d / 4), f(a + d / 4)].filter(Number.isFinite);
            let ymin, ymax;
            if (cur.L !== null && Number.isFinite(cur.L)) {
                const dev = Math.max(0.05 * Math.max(1, Math.abs(cur.L)), ...pts.map(v => Math.abs(v - cur.L)));
                ymin = cur.L - dev * 1.35; ymax = cur.L + dev * 1.35;
            } else if (pts.length) {
                ymin = Math.min(...pts); ymax = Math.max(...pts);
                const pad = (ymax - ymin) * 0.25 || 1; ymin -= pad; ymax += pad;
            } else { ymin = -1; ymax = 1; }
            plot.view = [xl, xr, ymin, ymax];
            plot.clear(); plot.grid();
            plot.line(a, ymin, a, ymax, COLORS.guide, 1.4, [5, 5]);
            if (cur.L !== null && Number.isFinite(cur.L)) plot.line(xl, cur.L, xr, cur.L, COLORS.tangent, 1.4, [6, 5]);
            plot.curve(f, COLORS.curve, 2.6);
            if (cur.L !== null && Number.isFinite(cur.L)) plot.dot(a, cur.L, COLORS.tangent, 5.5, true);
            const yl = f(xl), yr = f(xr);
            if (Number.isFinite(yl)) plot.dot(xl, yl, COLORS.secant, 5);
            if (Number.isFinite(yr)) plot.dot(xr, yr, COLORS.secant, 5);

            $('#lim-read', root).innerHTML =
                '<div><span>f(a − ' + fmt(d, 3) + ')</span><b>' + fmt(yl) + '</b></div>' +
                '<div><span>f(a + ' + fmt(d, 3) + ')</span><b>' + fmt(yr) + '</b></div>' +
                '<div class="wide"><span>Conclusão</span><b class="tex-line">' + T(cur.res) + '</b></div>';
        }
        plot.redraw = draw;

        function table() {
            const ds = [1, 0.1, 0.01, 0.001, 0.0001, 0.00001];
            const a = cur.a;
            let h = '<thead><tr><th>' + T('d') + '</th><th>' + T('f(a-d)') + '</th><th>' + T('f(a+d)') + '</th></tr></thead><tbody>';
            ds.forEach(d => { h += '<tr><td>' + fmt(d, 3) + '</td><td>' + fmt(cur.f(a - d)) + '</td><td>' + fmt(cur.f(a + d)) + '</td></tr>'; });
            $('#lim-table', root).innerHTML = h + '</tbody>';
            $('#lim-note', root).innerHTML = '<strong>' + T('f(x)=' + cur.tex) + '</strong> com ' + T('a=' + cur.a) + '<p>' + cur.nota + '</p>' +
                '<p class="muted-p">Veja a tabela: f(a − d) e f(a + d) se aproximam do mesmo número quando d diminui? Se sim, é o limite. Se divergem ou se separam, o limite não existe.</p>';
        }

        sel.addEventListener('change', () => { cur = LIM[+sel.value]; sd.value = 0; table(); draw(); });
        sd.addEventListener('input', draw);
        let anim = null;
        $('#lim-zoom', root).addEventListener('click', () => {
            if (anim) cancelAnimationFrame(anim);
            sd.value = 0.3;
            (function step() {
                sd.value = Math.max(-5, +sd.value - 0.03); draw();
                if (+sd.value > -5) anim = requestAnimationFrame(step);
            })();
        });
        table();
        return draw;
    }

    /* ============================================================
       DERIVADA
       ============================================================ */
    function initDerivada(root) {
        const keys = ['x2', 'x3', 'poly', 'sin', 'exp', 'sqrt', 'inv'];
        root.innerHTML =
            '<div class="lab-grid">' +
              '<div class="lab-stage"><canvas id="der-cv"></canvas></div>' +
              '<div class="lab-side">' +
                '<div class="ctl"><label for="der-fn">Função</label><select id="der-fn">' + fnOptions(keys, 'x2') + '</select>' + customBox('der-c') + '</div>' +
                '<div class="ctl"><label for="der-x0">Ponto ' + T('x_0') + ' = <b id="der-x0v"></b></label><input id="der-x0" type="range" step="0.01"></div>' +
                '<div class="ctl"><label for="der-h">Passo ' + T('h') + ' = <b id="der-hv"></b></label><input id="der-h" type="range" min="-3.5" max="0.7" step="0.01" value="0.2"></div>' +
                '<div class="ctl seg"><label><input type="radio" name="der-sign" value="1" checked> h &gt; 0</label><label><input type="radio" name="der-sign" value="-1"> h &lt; 0</label></div>' +
                '<div class="ctl-row"><button class="btn small" id="der-anim" type="button"><i class="fa-solid fa-play"></i> Fazer h → 0</button></div>' +
                '<div class="readout" id="der-read"></div>' +
              '</div>' +
            '</div>' +
            '<div class="lab-under">' +
              '<div class="table-wrap"><table class="lab-table" id="der-table"></table></div>' +
              '<div class="lab-note"><strong>Ideia central.</strong> A inclinação da <span class="c-amber">secante</span> é ' + T('\\dfrac{f(x_0+h)-f(x_0)}{h}', false) +
                '. Quando ' + T('h\\to 0') + ', ela converge para a inclinação da <span class="c-green">tangente</span>, que é a derivada ' + T("f'(x_0)") + '.' +
                '<p class="muted-p">Experimente h negativo e funções delicadas, como 1/x perto de 0 ou √x perto de 0.</p></div>' +
            '</div>';

        const plot = new Plot($('#der-cv', root));
        const selFn = $('#der-fn', root), sx = $('#der-x0', root), sh = $('#der-h', root);
        let fn = FN.x2;

        function sign() { return +root.querySelector('input[name="der-sign"]:checked').value; }

        function setFn(k) {
            fn = typeof k === 'string' ? FN[k] : k;
            sx.min = fn.view[0]; sx.max = fn.view[1]; sx.value = fn.x0;
        }

        function draw() {
            if (!plot.fit()) return;
            const x0 = +sx.value, h = sign() * Math.pow(10, +sh.value);
            $('#der-x0v', root).textContent = fmt(x0, 4);
            $('#der-hv', root).textContent = fmt(h, 3);
            plot.view = fn.view.slice();
            plot.clear(); plot.grid();
            plot.curve(fn.f, COLORS.curve, 2.6);
            const y0 = fn.f(x0), y1 = fn.f(x0 + h);
            const ok = Number.isFinite(y0) && Number.isFinite(y1);
            const m = ok ? (y1 - y0) / h : NaN, d = fn.df(x0);
            if (Number.isFinite(d) && Number.isFinite(y0)) plot.slopeLine(x0, y0, d, COLORS.tangent, 2, [8, 6]);
            if (ok) {
                plot.slopeLine(x0, y0, m, COLORS.secant, 2.2);
                plot.dot(x0 + h, y1, COLORS.secant, 5);
            }
            if (Number.isFinite(y0)) plot.dot(x0, y0, COLORS.point, 5.5);

            $('#der-read', root).innerHTML =
                '<div><span>Secante ' + T('m_{sec}') + '</span><b class="c-amber">' + fmt(m) + '</b></div>' +
                '<div><span>Tangente ' + T("f'(x_0)") + (fn.custom ? ' ≈' : '') + '</span><b class="c-green">' + fmt(d) + '</b></div>' +
                '<div class="wide"><span>Diferença</span><b>' + fmt(Math.abs(m - d), 4) + '</b></div>';

            let t = '<thead><tr><th>' + T('h') + '</th><th>' + T('\\dfrac{f(x_0+h)-f(x_0)}{h}') + '</th></tr></thead><tbody>';
            [1, 0.5, 0.1, 0.01, 0.001, 0.0001].forEach(hh => {
                const s = sign() * hh, yy = fn.f(x0 + s);
                t += '<tr><td>' + fmt(s, 4) + '</td><td>' + fmt(Number.isFinite(yy) && Number.isFinite(y0) ? (yy - y0) / s : NaN) + '</td></tr>';
            });
            t += '<tr class="hl"><td>→ 0</td><td>' + fmt(d) + '</td></tr></tbody>';
            $('#der-table', root).innerHTML = t;
        }
        plot.redraw = draw;

        wireCustom(root, 'der-c', selFn, f => { setFn(f); draw(); }, FN);
        sx.addEventListener('input', draw); sh.addEventListener('input', draw);
        root.querySelectorAll('input[name="der-sign"]').forEach(r => r.addEventListener('change', draw));
        let anim = null;
        $('#der-anim', root).addEventListener('click', () => {
            if (anim) cancelAnimationFrame(anim);
            sh.value = 0.7;
            (function step() {
                sh.value = Math.max(-3.5, +sh.value - 0.02); draw();
                if (+sh.value > -3.5) anim = requestAnimationFrame(step);
            })();
        });
        setFn('x2');
        return draw;
    }

    /* ============================================================
       INTEGRAL
       ============================================================ */
    function riemann(f, a, b, n, method) {
        const dx = (b - a) / n; let s = 0;
        for (let i = 0; i < n; i++) {
            const l = a + i * dx, r = l + dx;
            if (method === 'left') s += f(l);
            else if (method === 'right') s += f(r);
            else if (method === 'mid') s += f(l + dx / 2);
            else s += (f(l) + f(r)) / 2;
        }
        return s * dx;
    }

    function initIntegral(root) {
        const keys = ['x2', 'x3', 'poly', 'sin', 'cos', 'exp', 'sqrt'];
        root.innerHTML =
            '<div class="lab-grid">' +
              '<div class="lab-stage"><canvas id="int-cv"></canvas></div>' +
              '<div class="lab-side">' +
                '<div class="ctl"><label for="int-fn">Função</label><select id="int-fn">' + fnOptions(keys, 'x2') + '</select>' + customBox('int-c') + '</div>' +
                '<div class="ctl"><label for="int-m">Método</label><select id="int-m">' +
                    '<option value="left">Soma à esquerda</option><option value="right">Soma à direita</option>' +
                    '<option value="mid" selected>Ponto médio</option><option value="trap">Trapézios</option></select></div>' +
                '<div class="ctl"><label for="int-a">Limite inferior ' + T('a') + ' = <b id="int-av"></b></label><input id="int-a" type="range" step="0.05"></div>' +
                '<div class="ctl"><label for="int-b">Limite superior ' + T('b') + ' = <b id="int-bv"></b></label><input id="int-b" type="range" step="0.05"></div>' +
                '<div class="ctl"><label for="int-n">Subdivisões ' + T('n') + ' = <b id="int-nv"></b></label><input id="int-n" type="range" min="1" max="200" step="1" value="6"></div>' +
                '<div class="readout" id="int-read"></div>' +
              '</div>' +
            '</div>' +
            '<div class="lab-under">' +
              '<div class="table-wrap"><table class="lab-table" id="int-table"></table></div>' +
              '<div class="lab-note"><strong>Ideia central.</strong> A integral definida é o limite das somas de Riemann: ' + T('\\displaystyle\\int_a^b f(x)\\,dx=\\lim_{n\\to\\infty}\\sum_{i=1}^{n} f(x_i^*)\\,\\Delta x', false) +
                '. O Teorema Fundamental permite obter o valor exato como ' + T('F(b)-F(a)') + '.' +
                '<p class="muted-p">Áreas abaixo do eixo x contam como negativas (barras rosas). Veja o erro encolher quando n cresce e note que o ponto médio converge mais rápido.</p></div>' +
            '</div>';

        const plot = new Plot($('#int-cv', root));
        const selFn = $('#int-fn', root), selM = $('#int-m', root);
        const sa = $('#int-a', root), sb = $('#int-b', root), sn = $('#int-n', root);
        let fn = FN.x2;

        function setFn(k) {
            fn = typeof k === 'string' ? FN[k] : k;
            [sa, sb].forEach(s => { s.min = fn.dom[0]; s.max = fn.dom[1]; });
            sa.value = fn.ab[0]; sb.value = fn.ab[1];
        }

        function draw() {
            if (!plot.fit()) return;
            let a = +sa.value, b = +sb.value;
            if (b - a < 0.1) {
                if (document.activeElement === sa) { a = Math.max(+sa.min, b - 0.1); sa.value = a; if (b - a < 0.1) { b = a + 0.1; sb.value = b; } }
                else { b = Math.min(+sb.max, a + 0.1); sb.value = b; if (b - a < 0.1) { a = b - 0.1; sa.value = a; } }
            }
            const n = +sn.value, method = selM.value;
            $('#int-av', root).textContent = fmt(a, 3); $('#int-bv', root).textContent = fmt(b, 3); $('#int-nv', root).textContent = n;
            plot.view = fn.view.slice();
            plot.clear(); plot.grid();

            const c = plot.ctx, dx = (b - a) / n;
            for (let i = 0; i < n; i++) {
                const l = a + i * dx, r = l + dx;
                let yl, yr;
                if (method === 'left') { yl = yr = fn.f(l); }
                else if (method === 'right') { yl = yr = fn.f(r); }
                else if (method === 'mid') { yl = yr = fn.f(l + dx / 2); }
                else { yl = fn.f(l); yr = fn.f(r); }
                if (!Number.isFinite(yl) || !Number.isFinite(yr)) continue;
                const neg = (yl + yr) / 2 < 0;
                c.beginPath();
                c.moveTo(plot.X(l), plot.Y(0)); c.lineTo(plot.X(l), plot.Y(yl));
                c.lineTo(plot.X(r), plot.Y(yr)); c.lineTo(plot.X(r), plot.Y(0)); c.closePath();
                c.fillStyle = neg ? COLORS.neg : COLORS.pos; c.fill();
                if (n <= 80) { c.strokeStyle = neg ? COLORS.strokeNeg : COLORS.stroke; c.lineWidth = 1; c.stroke(); }
            }
            plot.line(a, plot.view[2], a, plot.view[3], COLORS.guide, 1.2, [4, 4]);
            plot.line(b, plot.view[2], b, plot.view[3], COLORS.guide, 1.2, [4, 4]);
            plot.curve(fn.f, COLORS.curve, 2.6);

            const S = riemann(fn.f, a, b, n, method);
            const I = fn.F ? fn.F(b) - fn.F(a) : simpson(fn.f, a, b, 4000);
            $('#int-read', root).innerHTML =
                '<div><span>Soma ' + T('S_n') + '</span><b class="c-amber">' + fmt(S, 7) + '</b></div>' +
                '<div><span>' + (fn.F ? 'Exata ' + T('F(b)-F(a)') : 'Referência (Simpson)') + '</span><b class="c-green">' + fmt(I, 7) + '</b></div>' +
                '<div class="wide"><span>Erro absoluto</span><b>' + fmt(Math.abs(S - I), 3) + '</b></div>';

            let t = '<thead><tr><th>n</th><th>' + T('S_n') + '</th><th>Erro</th></tr></thead><tbody>';
            [2, 4, 10, 50, 200].forEach(k => {
                const s = riemann(fn.f, a, b, k, method);
                t += '<tr><td>' + k + '</td><td>' + fmt(s, 7) + '</td><td>' + fmt(Math.abs(s - I), 3) + '</td></tr>';
            });
            $('#int-table', root).innerHTML = t + '<tr class="hl"><td>∞</td><td>' + fmt(I, 7) + '</td><td>0</td></tr></tbody>';
        }
        plot.redraw = draw;

        wireCustom(root, 'int-c', selFn, f => { setFn(f); draw(); }, FN);
        selM.addEventListener('change', draw);
        [sa, sb, sn].forEach(e => e.addEventListener('input', draw));
        setFn('x2');
        return draw;
    }

    return { init: { limites: initLimites, derivada: initDerivada, integral: initIntegral } };
})();
