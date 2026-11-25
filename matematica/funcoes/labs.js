/* Funções: simuladores de Transformações, Afim e quadrática, Composta e inversa. */
window.MATH = window.MATH || {};

MATH.labs = (function () {
    'use strict';

    const { T, COLORS, Plot, fmt, parseExpr, compile, toTex } = MATH.plot;
    const $ = (s, r) => (r || document).querySelector(s);
    const esc = s => MATH.md.esc(s);

    /* número → TeX curto (vírgula decimal, frações simples, π) */
    function N(x) {
        if (Math.abs(x - Math.round(x)) < 1e-9) return String(Math.round(x));
        for (const [v, t] of [[Math.PI, '\\pi'], [Math.PI / 2, '\\tfrac{\\pi}{2}'], [Math.PI / 4, '\\tfrac{\\pi}{4}']]) {
            if (Math.abs(Math.abs(x) - v) < 1e-9) return (x < 0 ? '-' : '') + t;
        }
        return String(+x.toFixed(2)).replace('.', '{,}');
    }
    function slider(id, label, min, max, step, val) {
        return '<div class="ctl"><label for="' + id + '">' + label + ' = <b id="' + id + '-v"></b></label><input id="' + id + '" type="range" min="' + min + '" max="' + max + '" step="' + step + '" value="' + val + '"></div>';
    }
    function sampleRange(f, a, b, n) {
        const ys = [];
        for (let i = 0; i <= (n || 600); i++) { const y = f(a + (b - a) * i / (n || 600)); if (Number.isFinite(y) && Math.abs(y) < 1e6) ys.push(y); }
        return ys;
    }

    /* =========================================================
       TRANSFORMAÇÕES: y = a·f(b(x − h)) + k
       ========================================================= */
    const BASES = {
        x2:   { label: 'x²', f: x => x * x, tex: (u, s) => (s ? u : '\\left(' + u + '\\right)') + '^2' },
        x3:   { label: 'x³', f: x => x * x * x, tex: (u, s) => (s ? u : '\\left(' + u + '\\right)') + '^3' },
        abs:  { label: '|x|', f: Math.abs, tex: u => '\\left|' + u + '\\right|' },
        sqrt: { label: '√x', f: x => x < 0 ? NaN : Math.sqrt(x), tex: u => '\\sqrt{' + u + '}' },
        inv:  { label: '1/x', f: x => 1 / x, tex: u => '\\dfrac{1}{' + u + '}' },
        exp:  { label: 'eˣ', f: Math.exp, tex: u => 'e^{' + u + '}' },
        ln:   { label: 'ln x', f: x => x <= 0 ? NaN : Math.log(x), tex: (u, s) => s ? '\\ln ' + u : '\\ln\\left(' + u + '\\right)' },
        sin:  { label: 'sen x', f: Math.sin, tex: (u, s) => s ? '\\sin x' : '\\sin\\left(' + u + '\\right)', trig: true },
        cos:  { label: 'cos x', f: Math.cos, tex: (u, s) => s ? '\\cos x' : '\\cos\\left(' + u + '\\right)', trig: true }
    };

    function initTransformacoes(root) {
        root.innerHTML =
            '<div class="lab-grid">' +
              '<div class="lab-stage"><canvas id="tr-cv"></canvas></div>' +
              '<div class="lab-side">' +
                '<div class="ctl"><label for="tr-base">Função base ' + T('f') + '</label><select id="tr-base">' +
                  Object.keys(BASES).map(k => '<option value="' + k + '">f(x) = ' + BASES[k].label + '</option>').join('') +
                  '<option value="custom">✎ Digitar minha função…</option></select>' +
                  '<div class="custom-fn" id="tr-box" hidden><input id="tr-in" type="text" spellcheck="false" autocomplete="off" value="x^3 - 3x" aria-label="f(x)"><button class="btn small" id="tr-go" type="button">Usar</button></div>' +
                  '<div class="fn-hint" id="tr-hint" hidden></div></div>' +
                slider('tr-a', T('a') + ' (vertical)', -3, 3, 0.1, 1) +
                slider('tr-b', T('b') + ' (horizontal)', -3, 3, 0.1, 1) +
                slider('tr-h', T('h') + ' (desloca →)', -5, 5, 0.1, 0) +
                slider('tr-k', T('k') + ' (desloca ↑)', -5, 5, 0.1, 0) +
                '<div class="ctl-row"><button class="btn small ghost" id="tr-reset" type="button"><i class="fa-solid fa-rotate-left"></i> Zerar parâmetros</button></div>' +
                '<div class="readout"><div class="wide"><span>Função transformada</span><b class="tex-line" id="tr-tex"></b></div></div>' +
              '</div>' +
            '</div>' +
            '<div class="lab-under"><div class="lab-note" id="tr-steps"></div>' +
              '<div class="lab-note"><strong>Leitura.</strong> A curva tracejada é a base ' + T('y=f(x)') + '; a azul é ' + T('y=a\\,f\\big(b(x-h)\\big)+k') + '. ' +
              'Repare que os parâmetros de dentro ' + T('(b,\\ h)') + ' agem na horizontal e "ao contrário", e os de fora ' + T('(a,\\ k)') + ' agem na vertical, como se espera.' +
              '<p class="muted-p">Com seno ou cosseno, o painel mostra amplitude, período e linha média.</p></div></div>';

        const plot = new Plot($('#tr-cv', root));
        const sel = $('#tr-base', root), S = k => $('#tr-' + k, root);
        let base = BASES.x2, custom = null;

        function useCustom() {
            try {
                const tree = parseExpr(S('in').value);
                custom = { label: 'f', f: compile(tree), tex: u => 'f\\left(' + u + '\\right)', ftex: toTex(tree) };
                S('in').classList.remove('bad'); S('hint').className = 'fn-hint';
                S('hint').innerHTML = 'Entendido como ' + T('f(x)=' + custom.ftex);
                base = custom; draw();
            } catch (e) { S('in').classList.add('bad'); S('hint').className = 'fn-hint err'; S('hint').textContent = e.message; }
        }

        function draw() {
            const a = +S('a').value, b = +S('b').value, h = +S('h').value, k = +S('k').value;
            ['a', 'b', 'h', 'k'].forEach(p => { S(p + '-v').textContent = fmt(+S(p).value, 3); });
            const bb = Math.abs(b) < 0.05 ? (b < 0 ? -0.05 : 0.05) : b;
            const g = x => a * base.f(bb * (x - h)) + k;
            // texto da função
            const xm = Math.abs(h) < 1e-9 ? 'x' : (h > 0 ? 'x - ' + N(h) : 'x + ' + N(-h));
            let u;
            if (Math.abs(b - 1) < 1e-9) u = xm;
            else if (Math.abs(b + 1) < 1e-9) u = '-' + (xm === 'x' ? 'x' : '\\left(' + xm + '\\right)');
            else u = N(b) + (xm === 'x' ? 'x' : '\\left(' + xm + '\\right)');
            const core = base.tex(u, u === 'x');
            const front = Math.abs(a - 1) < 1e-9 ? '' : Math.abs(a + 1) < 1e-9 ? '-' : (Math.abs(a) < 1e-9 ? '0\\cdot ' : N(a) + '\\,');
            const tail = Math.abs(k) < 1e-9 ? '' : (k > 0 ? ' + ' + N(k) : ' - ' + N(-k));
            S('tex').innerHTML = T('y = ' + front + core + tail) + (base === custom ? '<br><small style="color:var(--muted)">' + T('f(x)=' + custom.ftex) + '</small>' : '');
            // passos
            const st = [];
            if (Math.abs(b) < 0.05) st.push('Com ' + T('b') + ' perto de zero, o gráfico se achata horizontalmente quase em uma reta.');
            else {
                if (Math.abs(Math.abs(b) - 1) > 1e-9) st.push((Math.abs(b) > 1 ? 'Comprime' : 'Estica') + ' na horizontal pelo fator ' + T(N(Math.abs(b))) + '.');
                if (b < 0) st.push('Reflete no eixo ' + T('y') + ' (porque ' + T('b<0') + ').');
            }
            if (Math.abs(h) > 1e-9) st.push('Desloca ' + T(N(Math.abs(h))) + (h > 0 ? ' para a direita.' : ' para a esquerda.'));
            if (Math.abs(Math.abs(a) - 1) > 1e-9 && Math.abs(a) > 1e-9) st.push((Math.abs(a) > 1 ? 'Estica' : 'Comprime') + ' na vertical pelo fator ' + T(N(Math.abs(a))) + '.');
            if (a < 0) st.push('Reflete no eixo ' + T('x') + ' (porque ' + T('a<0') + ').');
            if (Math.abs(a) < 1e-9) st.push('Com ' + T('a=0') + ', a função vira a constante ' + T('y=k') + '.');
            if (Math.abs(k) > 1e-9) st.push('Desloca ' + T(N(Math.abs(k))) + (k > 0 ? ' para cima.' : ' para baixo.'));
            let html = '<strong>Passo a passo a partir de ' + T('y=f(x)') + '</strong>' + (st.length ? '<ol style="margin:.5em 0 0;padding-left:1.2em">' + st.map(s => '<li>' + s + '</li>').join('') + '</ol>' : '<p>Sem transformações: é a própria função base.</p>');
            if (base.trig && Math.abs(b) >= 0.05) {
                html += '<p>Amplitude ' + T(N(Math.abs(a))) + ' · período ' + T('\\frac{2\\pi}{' + N(Math.abs(b)) + '}\\approx ' + N(2 * Math.PI / Math.abs(b))) + ' · linha média ' + T('y=' + N(k)) + ' · imagem ' + T('[' + N(k - Math.abs(a)) + ',\\ ' + N(k + Math.abs(a)) + ']') + '</p>';
            }
            S('steps').innerHTML = html;
            // gráfico
            if (!plot.fit()) return;
            const ratio = plot.h / plot.w, X = 8;
            plot.view = [-X, X, -X * ratio, X * ratio];
            plot.clear(); plot.grid();
            plot.curve(base.f, 'rgba(203,213,225,.55)', 1.8, [6, 6]);
            plot.curve(g, COLORS.curve, 2.8);
            if ((Math.abs(h) > 1e-9 || Math.abs(k) > 1e-9) && base.f(0) === 0) plot.dot(h, k, COLORS.secant, 4.5); // imagem da origem
        }
        plot.redraw = draw;
        ['a', 'b', 'h', 'k'].forEach(p => S(p).addEventListener('input', draw));
        sel.addEventListener('change', () => {
            const on = sel.value === 'custom';
            S('box').hidden = !on; S('hint').hidden = !on;
            if (on) useCustom(); else { base = BASES[sel.value]; draw(); }
        });
        S('go').addEventListener('click', useCustom);
        S('in').addEventListener('keydown', e => { if (e.key === 'Enter') useCustom(); });
        S('reset').addEventListener('click', () => { S('a').value = 1; S('b').value = 1; S('h').value = 0; S('k').value = 0; draw(); });
        return draw;
    }

    /* =========================================================
       AFIM E QUADRÁTICA
       ========================================================= */
    function initFamilias(root) {
        root.innerHTML =
            '<div class="lab-grid">' +
              '<div class="lab-stage"><canvas id="fa-cv"></canvas></div>' +
              '<div class="lab-side">' +
                '<div class="ctl"><label for="fa-mode">Família</label><select id="fa-mode"><option value="quad">Quadrática: ax² + bx + c</option><option value="afim">Afim: ax + b</option></select></div>' +
                slider('fa-a', T('a'), -3, 3, 0.1, 1) +
                slider('fa-b', T('b'), -10, 10, 0.1, -2) +
                '<div id="fa-cwrap">' + slider('fa-c', T('c'), -10, 10, 0.1, -3) + '</div>' +
                '<div class="readout" id="fa-read"></div>' +
              '</div>' +
            '</div>' +
            '<div class="lab-under"><div class="lab-note" id="fa-note"></div>' +
              '<div class="lab-note"><strong>Experimente.</strong> Deixe ' + T('b') + ' e ' + T('c') + ' fixos e mude ' + T('a') + ': o que acontece com a concavidade e com a abertura? ' +
              'Agora mude só ' + T('c') + ' até o discriminante zerar: é quando a parábola tangencia o eixo ' + T('x') + '.' +
              '<p class="muted-p">Os pontos marcados são as raízes (verde), o vértice (amarelo) e o corte no eixo ' + T('y') + ' (branco).</p></div></div>';

        const plot = new Plot($('#fa-cv', root));
        const S = k => $('#fa-' + k, root);
        const sgn = (v, t) => v === 0 ? '' : (v > 0 ? ' + ' : ' - ') + t(Math.abs(v));
        function polyTex(a, b, c, quad) {
            const r = v => +v.toFixed(2);
            a = r(a); b = r(b); c = r(c);
            const coef = (v, x) => (v === 1 ? '' : v === -1 ? '-' : N(v)) + x;
            if (quad) {
                let s = a === 0 ? '' : coef(a, 'x^2');
                if (b) s += s ? sgn(b, v => (v === 1 ? '' : N(v)) + 'x') : coef(b, 'x');
                if (c) s += s ? sgn(c, N) : N(c);
                return s || '0';
            }
            let s = a === 0 ? '' : coef(a, 'x');
            if (b) s += s ? sgn(b, N) : N(b);
            return s || '0';
        }

        function draw() {
            const quad = S('mode').value === 'quad';
            S('cwrap').hidden = !quad;
            const a = +S('a').value, b = +S('b').value, c = quad ? +S('c').value : 0;
            ['a', 'b', 'c'].forEach(p => { S(p + '-v').textContent = fmt(+S(p).value, 3); });
            const f = quad ? (x => a * x * x + b * x + c) : (x => a * x + b);
            const pts = [];
            let read = '', note = '';
            if (quad) {
                if (Math.abs(a) < 1e-9) {
                    read = '<div class="wide"><span>Atenção</span><b class="tex-line">' + T('a = 0') + ': não é quadrática, é afim.</b></div>';
                    note = '<strong>' + T('f(x)=' + polyTex(a, b, c, true)) + '</strong><p>Com ' + T('a=0') + ' o termo ' + T('x^2') + ' some e o gráfico vira uma reta.</p>';
                } else {
                    const D = b * b - 4 * a * c, xv = -b / (2 * a), yv = f(xv);
                    let roots = [];
                    if (D > 1e-12) roots = [(-b - Math.sqrt(D)) / (2 * a), (-b + Math.sqrt(D)) / (2 * a)].sort((p, q) => p - q);
                    else if (Math.abs(D) <= 1e-12) roots = [xv];
                    roots.forEach(r => pts.push([r, 0, COLORS.tangent]));
                    pts.push([xv, yv, COLORS.secant]); pts.push([0, c, COLORS.point]);
                    read =
                        '<div><span>' + T('\\Delta = b^2-4ac') + '</span><b>' + fmt(D, 4) + '</b></div>' +
                        '<div><span>Raízes</span><b>' + (roots.length ? roots.map(r => fmt(r, 4)).join(' ; ') : 'não reais') + '</b></div>' +
                        '<div><span>Vértice</span><b>(' + fmt(xv, 4) + ' ; ' + fmt(yv, 4) + ')</b></div>' +
                        '<div><span>' + (a > 0 ? 'Mínimo' : 'Máximo') + '</span><b>' + fmt(yv, 4) + '</b></div>' +
                        '<div class="wide"><span>Imagem</span><b class="tex-line">' + T(a > 0 ? '[' + N(yv) + ',\\ +\\infty)' : '(-\\infty,\\ ' + N(yv) + ']') + '</b></div>';
                    const canon = (Math.abs(a - 1) < 1e-9 ? '' : Math.abs(a + 1) < 1e-9 ? '-' : N(a)) + (Math.abs(xv) < 1e-9 ? 'x^2' : '\\left(x ' + (xv > 0 ? '- ' + N(xv) : '+ ' + N(-xv)) + '\\right)^2') + (Math.abs(yv) < 1e-9 ? '' : yv > 0 ? ' + ' + N(yv) : ' - ' + N(-yv));
                    note = '<strong>' + T('f(x)=' + polyTex(a, b, c, true)) + '</strong>' +
                        '<p>Concavidade para ' + (a > 0 ? 'cima' : 'baixo') + '. ' +
                        (D > 1e-12 ? 'Duas raízes reais: ' + T('f') + (a > 0 ? ' é negativa entre elas e positiva fora.' : ' é positiva entre elas e negativa fora.') :
                         Math.abs(D) <= 1e-12 ? 'Raiz dupla: a parábola tangencia o eixo ' + T('x') + '.' : 'Sem raízes reais: ' + T('f') + ' tem sempre o sinal de ' + T('a') + '.') + '</p>' +
                        '<p>Forma canônica: ' + T('f(x)=' + canon) + '</p>';
                }
            } else {
                pts.push([0, b, COLORS.point]);
                let rootTxt = '—';
                if (Math.abs(a) > 1e-9) { const r = -b / a; pts.push([r, 0, COLORS.tangent]); rootTxt = fmt(r, 4); }
                read =
                    '<div><span>Inclinação ' + T('a') + '</span><b>' + fmt(a, 3) + '</b></div>' +
                    '<div><span>Corte em ' + T('y') + '</span><b>' + fmt(b, 3) + '</b></div>' +
                    '<div><span>Raiz</span><b>' + rootTxt + '</b></div>' +
                    '<div><span>Comportamento</span><b style="font-family:var(--sans);font-size:.9rem">' + (a > 1e-9 ? 'crescente' : a < -1e-9 ? 'decrescente' : 'constante') + '</b></div>';
                note = '<strong>' + T('f(x)=' + polyTex(a, b, 0, false)) + '</strong>' +
                    (Math.abs(a) > 1e-9 ? '<p>Cada vez que ' + T('x') + ' aumenta ' + T('1') + ', ' + T('y') + ' varia ' + T(N(a)) + '. À direita da raiz, ' + T('f') + ' tem o sinal de ' + T('a') + ' (' + (a > 0 ? 'positivo' : 'negativo') + ').</p>'
                        : '<p>Com ' + T('a=0') + ' a função é constante: reta horizontal.</p>');
            }
            S('read').innerHTML = read; S('note').innerHTML = note;
            if (!plot.fit()) return;
            // janela: centrada no vértice (ou na origem) e incluindo os pontos notáveis
            const xs = pts.map(p => p[0]).concat([0]), ys = pts.map(p => p[1]).concat([0]);
            let x0 = Math.min(...xs) - 3, x1 = Math.max(...xs) + 3;
            if (x1 - x0 < 10) { const m = (x0 + x1) / 2; x0 = m - 5; x1 = m + 5; }
            let y0 = Math.min(...ys), y1 = Math.max(...ys);
            const span = Math.max(y1 - y0, (x1 - x0) * plot.h / plot.w);
            const ym = (y0 + y1) / 2; y0 = ym - span * 0.65; y1 = ym + span * 0.65;
            plot.view = [x0, x1, y0, y1];
            plot.clear(); plot.grid();
            if (quad && Math.abs(a) > 1e-9) plot.line(-b / (2 * a), y0, -b / (2 * a), y1, COLORS.guide, 1.2, [5, 5]);
            plot.curve(f, COLORS.curve, 2.8);
            pts.forEach(p => plot.dot(p[0], p[1], p[2], 5.5));
        }
        plot.redraw = draw;
        ['a', 'b', 'c'].forEach(p => S(p).addEventListener('input', draw));
        S('mode').addEventListener('change', () => {
            if (S('mode').value === 'afim') { S('a').value = 0.5; S('b').value = 2; } else { S('a').value = 1; S('b').value = -2; S('c').value = -3; }
            draw();
        });
        return draw;
    }

    /* =========================================================
       COMPOSTA E INVERSA
       ========================================================= */
    function subst(n, g) {
        if (n.op === 'x') return { op: 'par', a: g };
        const o = Object.assign({}, n);
        if (n.a) o.a = subst(n.a, g);
        if (n.b) o.b = subst(n.b, g);
        return o;
    }
    // remove parênteses desnecessários em volta de átomos
    function tidy(n, parent, side) {
        const o = Object.assign({}, n);
        if (o.a) o.a = tidy(o.a, o.op, 'a');
        if (o.b) o.b = tidy(o.b, o.op, 'b');
        if (o.op === 'par') {
            const k = o.a.op;
            if (['x', 'pi', 'e', 'fn', 'par'].includes(k) || (k === 'num' && o.a.v >= 0)) return o.a;
            // potência não precisa de parênteses, exceto como base de outra potência
            if (k === '^' && !(parent === '^' && side === 'a')) return o.a;
            // produto/quociente dentro de soma ou subtração
            if ((k === '*' || k === '/') && (parent === '+' || (parent === '-' && side === 'a'))) return o.a;
            // soma/subtração à esquerda de outra soma/subtração
            if ((k === '+' || k === '-') && (parent === '+' || parent === '-') && side === 'a') return o.a;
            // tudo pode ficar sem parênteses no topo ou como argumento de função/raiz
            if (!parent || parent === 'fn') return o.a;
        }
        return o;
    }
    const INV_PRESETS = [
        { label: 'f(x) = 2x + 3', src: '2x + 3', d: [-5, 5] },
        { label: 'f(x) = x³', src: 'x^3', d: [-2, 2] },
        { label: 'f(x) = eˣ', src: 'e^x', d: [-4, 2] },
        { label: 'f(x) = x² (não injetora)', src: 'x^2', d: [-2.5, 2.5] },
        { label: 'f(x) = x² com x ≥ 0', src: 'x^2', d: [0, 2.5] },
        { label: 'f(x) = (x + 1)/(x − 2)', src: '(x + 1)/(x - 2)', d: [2.2, 8] },
        { label: 'f(x) = sen x em [−π/2, π/2]', src: 'sen(x)', d: [-Math.PI / 2, Math.PI / 2] },
        { label: 'f(x) = sen x em [0, π] (não injetora)', src: 'sen(x)', d: [0, Math.PI] }
    ];

    function initInversa(root) {
        root.innerHTML =
            '<div class="lab-grid">' +
              '<div class="lab-stage"><canvas id="iv2-cv"></canvas></div>' +
              '<div class="lab-side">' +
                '<div class="ctl"><label for="iv2-mode">Modo</label><select id="iv2-mode"><option value="inv">Inversa (reflexo em y = x)</option><option value="comp">Composição f∘g e g∘f</option></select></div>' +
                '<div id="iv2-inv">' +
                  '<div class="ctl"><label for="iv2-pre">Função</label><select id="iv2-pre">' + INV_PRESETS.map((p, i) => '<option value="' + i + '">' + esc(p.label) + '</option>').join('') + '<option value="custom">✎ Digitar minha função…</option></select>' +
                  '<div class="custom-fn" id="iv2-box" hidden><input id="iv2-in" type="text" spellcheck="false" autocomplete="off" value="x^3 + x" aria-label="f(x)"><button class="btn small" id="iv2-go" type="button">Usar</button></div></div>' +
                  '<div class="ctl"><label>Domínio considerado ' + T('[d_1,\\ d_2]') + '</label><div class="ineq-row" style="grid-template-columns:1fr 1fr">' +
                    '<input id="iv2-d1" type="text" inputmode="decimal" aria-label="d1"><input id="iv2-d2" type="text" inputmode="decimal" aria-label="d2"></div></div>' +
                '</div>' +
                '<div id="iv2-comp" hidden>' +
                  '<div class="ctl"><label for="iv2-f">' + T('f(x)') + '</label><input id="iv2-f" class="plain-in" type="text" spellcheck="false" value="x^2"></div>' +
                  '<div class="ctl"><label for="iv2-g">' + T('g(x)') + '</label><input id="iv2-g" class="plain-in" type="text" spellcheck="false" value="x + 2"></div>' +
                  '<div class="presets" id="iv2-cpre"><button type="button" data-f="x^2" data-g="x + 2">x² e x+2</button><button type="button" data-f="sen(x)" data-g="2x">sen x e 2x</button><button type="button" data-f="raiz(x)" data-g="1 - x^2">√x e 1−x²</button><button type="button" data-f="e^x" data-g="ln(x)">eˣ e ln x</button></div>' +
                '</div>' +
                '<div class="fn-hint" id="iv2-hint"></div>' +
                '<div class="readout" id="iv2-read"></div>' +
              '</div>' +
            '</div>' +
            '<div class="lab-under"><div class="lab-note" id="iv2-note"></div>' +
              '<div class="lab-note" id="iv2-why-comp" hidden><strong>Decompor para derivar.</strong> A regra da cadeia do Cálculo pede o caminho inverso: olhar ' + T('h(x)') + ' e enxergar uma função "de fora" ' + T('f') + ' aplicada a uma "de dentro" ' + T('g') + '. Teste: digite ' + T('f(x)=\\sin x') + ' e ' + T('g(x)=x^2') + ' e veja ' + T('\\sin(x^2)') + ' aparecer.</div>' +
              '<div class="lab-note" id="iv2-why-inv"><strong>Por que reflexo?</strong> Se ' + T('(a,\\ b)') + ' está no gráfico de ' + T('f') + ', então ' + T('f^{-1}(b)=a') + ' e ' + T('(b,\\ a)') + ' está no gráfico de ' + T('f^{-1}') + '. Trocar as coordenadas é refletir na reta ' + T('y=x') + '.' +
              '<p class="muted-p">Quando ' + T('f') + ' não é injetora no domínio escolhido, o reflexo falha no teste da reta vertical: não é função. Restrinja o domínio para consertar.</p></div></div>';

        const plot = new Plot($('#iv2-cv', root));
        const S = k => $('#iv2-' + k, root);
        let F = null, src = '';
        const parseNum = s => { const v = Number(String(s).trim().replace('−', '-').replace(',', '.').replace(/^pi$/i, String(Math.PI))); return v; };

        function loadPreset() {
            const v = S('pre').value;
            const custom = v === 'custom';
            S('box').hidden = !custom;
            if (!custom) { const p = INV_PRESETS[+v]; src = p.src; S('d1').value = String(+p.d[0].toFixed(4)).replace('.', ','); S('d2').value = String(+p.d[1].toFixed(4)).replace('.', ','); }
            else { src = S('in').value; S('d1').value = '-2'; S('d2').value = '2'; }
            draw();
        }

        function drawInv() {
            let tree;
            try { tree = parseExpr(src); F = compile(tree); }
            catch (e) { S('hint').className = 'fn-hint err'; S('hint').textContent = e.message; return; }
            const d1 = parseNum(S('d1').value), d2 = parseNum(S('d2').value);
            if (!Number.isFinite(d1) || !Number.isFinite(d2) || d2 <= d1) { S('hint').className = 'fn-hint err'; S('hint').textContent = 'Informe um domínio com d₁ < d₂.'; return; }
            S('hint').className = 'fn-hint'; S('hint').innerHTML = 'Entendido como ' + T('f(x)=' + toTex(tree)) + ' em ' + T('[' + N(d1) + ',\\ ' + N(d2) + ']');
            // amostra e testa monotonicidade (injetividade)
            const n = 800, P = [];
            for (let i = 0; i <= n; i++) { const x = d1 + (d2 - d1) * i / n, y = F(x); if (Number.isFinite(y) && Math.abs(y) < 1e4) P.push([x, y]); }
            let inc = 0, dec = 0;
            for (let i = 1; i < P.length; i++) { const dy = P[i][1] - P[i - 1][1]; if (dy > 1e-12) inc++; else if (dy < -1e-12) dec++; }
            const inj = P.length > 2 && (inc === 0 || dec === 0) && (inc + dec) > P.length * 0.9;
            const ys = P.map(p => p[1]), ymin = Math.min(...ys), ymax = Math.max(...ys);
            S('read').innerHTML =
                '<div class="wide"><span>Injetora no domínio?</span><b style="font-family:var(--sans);font-size:.95rem;color:' + (inj ? 'var(--green)' : 'var(--red)') + '">' + (inj ? '✔ Sim: a inversa existe' : '✘ Não: o reflexo não é função') + '</b></div>' +
                '<div><span>Domínio de ' + T('f') + '</span><b class="tex-line">' + T('[' + N(d1) + ',\\ ' + N(d2) + ']') + '</b></div>' +
                '<div><span>Imagem de ' + T('f') + ' ≈</span><b class="tex-line">' + T('[' + N(ymin) + ',\\ ' + N(ymax) + ']') + '</b></div>';
            S('note').innerHTML = '<strong>Domínio e imagem trocam de papel.</strong> ' + (inj ? 'O domínio de ' + T('f^{-1}') + ' é a imagem de ' + T('f') + ' (≈ ' + T('[' + N(ymin) + ',\\ ' + N(ymax) + ']') + '), e a imagem de ' + T('f^{-1}') + ' é ' + T('[' + N(d1) + ',\\ ' + N(d2) + ']') + '.'
                : 'Há valores de ' + T('y') + ' atingidos por mais de um ' + T('x') + ': a reta horizontal corta o gráfico mais de uma vez. Tente restringir o domínio a um trecho só crescente ou só decrescente.');
            if (!plot.fit()) return;
            const lo = Math.min(d1, ymin, -1), hi = Math.max(d2, ymax, 1), pad = (hi - lo) * 0.12;
            const ratio = plot.h / plot.w, cx = (lo + hi) / 2, half = (hi - lo) / 2 + pad;
            const hx = Math.max(half, half / ratio), hy = hx * ratio;
            plot.view = [cx - hx, cx + hx, cx - hy, cx + hy];
            plot.clear(); plot.grid();
            plot.line(plot.view[0], plot.view[0], plot.view[1], plot.view[1], 'rgba(203,213,225,.45)', 1.3, [6, 6]);
            plot.curve(x => (x >= d1 && x <= d2) ? F(x) : NaN, COLORS.curve, 2.8);
            const c = plot.ctx;
            c.save(); c.strokeStyle = inj ? COLORS.secant : 'rgba(248,113,113,.9)'; c.lineWidth = 2.6; c.setLineDash(inj ? [] : [7, 6]);
            c.beginPath(); let started = false, prev = null;
            P.forEach(p => { const X = plot.X(p[1]), Y = plot.Y(p[0]); if (!started || (prev && Math.hypot(X - prev[0], Y - prev[1]) > plot.w * 0.3)) c.moveTo(X, Y); else c.lineTo(X, Y); started = true; prev = [X, Y]; });
            c.stroke(); c.restore();
            c.save(); c.font = '600 13px "Plus Jakarta Sans", sans-serif';
            c.fillStyle = COLORS.curve; c.fillText('f', 14, 22);
            const lab2 = inj ? 'f⁻¹ (reflexo)' : 'reflexo (não é função)';
            c.fillStyle = inj ? COLORS.secant : '#f87171'; c.fillText(lab2, 32, 22);
            c.fillStyle = 'rgba(203,213,225,.8)'; c.fillText('y = x', plot.w - 60, 22); c.restore();
        }

        function drawComp() {
            let tf, tg;
            try { tf = parseExpr(S('f').value); tg = parseExpr(S('g').value); }
            catch (e) { S('hint').className = 'fn-hint err'; S('hint').textContent = e.message; S('read').innerHTML = ''; return; }
            const f = compile(tf), g = compile(tg);
            const fg = x => f(g(x)), gf = x => g(f(x));
            const tfg = toTex(tidy(subst(tf, tg))), tgf = toTex(tidy(subst(tg, tf)));
            S('hint').className = 'fn-hint';
            S('hint').innerHTML = T('f(x)=' + toTex(tf)) + ' · ' + T('g(x)=' + toTex(tg));
            S('read').innerHTML =
                '<div class="wide"><span>' + T('(f\\circ g)(x)=f\\big(g(x)\\big)') + '</span><b class="tex-line" style="color:var(--green)">' + T(tfg) + '</b></div>' +
                '<div class="wide"><span>' + T('(g\\circ f)(x)=g\\big(f(x)\\big)') + '</span><b class="tex-line" style="color:var(--amber)">' + T(tgf) + '</b></div>';
            S('note').innerHTML = '<strong>A ordem importa.</strong> Em ' + T('f\\circ g') + ', a função ' + T('g') + ' age primeiro e sua saída entra em ' + T('f') + '. Compare as curvas verde e amarela: em geral ' + T('f\\circ g \\neq g\\circ f') + '.' +
                '<p class="muted-p">O domínio da composta pode encolher: em ' + T('\\sqrt{1-x^2}') + ', só entram os ' + T('x') + ' com ' + T('g(x)\\geq 0') + '.</p>';
            if (!plot.fit()) return;
            const ys = sampleRange(fg, -6, 6).concat(sampleRange(gf, -6, 6)).sort((p, q) => p - q);
            let lo = ys.length ? ys[Math.floor(ys.length * 0.08)] : -5, hi = ys.length ? ys[Math.floor(ys.length * 0.92)] : 5;
            lo = Math.min(lo, -2); hi = Math.max(hi, 2);
            const pad = (hi - lo) * 0.25;
            plot.view = [-6, 6, lo - pad, hi + pad];
            plot.clear(); plot.grid();
            plot.curve(g, 'rgba(203,213,225,.45)', 1.6, [6, 6]);
            plot.curve(f, 'rgba(56,189,248,.55)', 1.6, [2, 5]);
            plot.curve(fg, COLORS.tangent, 2.8);
            plot.curve(gf, COLORS.secant, 2.8);
            const c = plot.ctx; c.save(); c.font = '600 13px "Plus Jakarta Sans", sans-serif';
            let lx = 14;
            [['f∘g', COLORS.tangent], ['g∘f', COLORS.secant], ['f (pontilhada)', COLORS.curve], ['g (tracejada)', 'rgba(203,213,225,.8)']].forEach(l => { c.fillStyle = l[1]; c.fillText(l[0], lx, 22); lx += c.measureText(l[0]).width + 18; });
            c.restore();
        }

        function draw() {
            const comp = S('mode').value === 'comp';
            S('inv').hidden = comp; S('comp').hidden = !comp;
            S('why-inv').hidden = comp; S('why-comp').hidden = !comp;
            if (comp) drawComp(); else drawInv();
        }
        plot.redraw = draw;
        S('mode').addEventListener('change', draw);
        S('pre').addEventListener('change', loadPreset);
        S('go').addEventListener('click', () => { src = S('in').value; draw(); });
        S('in').addEventListener('keydown', e => { if (e.key === 'Enter') { src = S('in').value; draw(); } });
        ['d1', 'd2'].forEach(k => S(k).addEventListener('input', draw));
        let t; ['f', 'g'].forEach(k => S(k).addEventListener('input', () => { clearTimeout(t); t = setTimeout(draw, 250); }));
        S('cpre').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; S('f').value = b.dataset.f; S('g').value = b.dataset.g; draw(); });
        loadPreset();
        return draw;
    }

    return { init: { transformacoes: initTransformacoes, familias: initFamilias, inversa: initInversa }, subst, tidy };
})();
