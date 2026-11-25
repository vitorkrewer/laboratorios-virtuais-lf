/* Álgebra elementar: simuladores Balança de equações, Modelo de áreas e Treino infinito.
   Toda a aritmética é racional e exata (classe Fr), sem eval. */
window.MATH = window.MATH || {};

MATH.labs = (function () {
    'use strict';

    const { T, parseExpr, compile } = MATH.plot;
    const $ = (s, r) => (r || document).querySelector(s);

    /* ---------- canvas com DPR ---------- */
    function fitCanvas(cv) {
        const r = cv.getBoundingClientRect(), dpr = window.devicePixelRatio || 1;
        const w = Math.round(r.width), h = Math.round(r.height);
        if (!w || !h) return null;
        if (cv.width !== w * dpr || cv.height !== h * dpr) { cv.width = w * dpr; cv.height = h * dpr; }
        const ctx = cv.getContext('2d');
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        return { ctx, w, h };
    }
    function observe(cv, draw) { if (window.ResizeObserver) new ResizeObserver(() => draw()).observe(cv); }
    function rrect(c, x, y, w, h, r) {
        c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r);
        c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath();
    }

    /* frações exatas: engine/frac.js */
    const { Fr, F, gcd, lcm, fromNumber, parseNum } = MATH.frac;
    /* lista de respostas: separadas por ";", " e " ou ", " (vírgula seguida de espaço) */
    function parseList(s) {
        const parts = String(s).replace(/[−–]/g, '-').split(/;|\s+e\s+|,\s+|\s*\bou\b\s*/i).map(p => p.replace(/^x\s*=\s*/i, '').trim()).filter(Boolean);
        const out = parts.map(parseNum);
        return out.some(v => v === null) ? null : out;
    }
    const R = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
    const RNZ = (a, b) => { let v; do { v = R(a, b); } while (v === 0); return v; };
    const pick = arr => arr[Math.floor(Math.random() * arr.length)];

    /* ax + b em TeX e em texto */
    function linTex(a, b) {
        a = F(a); b = F(b);
        let s = '';
        if (!a.isZero()) s = a.eq(1) ? 'x' : a.eq(-1) ? '-x' : a.tex() + 'x';
        if (!b.isZero()) s = !s ? b.tex() : s + (b.n < 0 ? ' - ' + b.neg().tex() : ' + ' + b.tex());
        return s || '0';
    }
    function linTxt(a, b) {
        let s = '';
        if (!a.isZero()) s = a.eq(1) ? 'x' : a.eq(-1) ? '−x' : (a.isInt() ? a.txt() : '(' + a.txt() + ')') + 'x';
        if (!b.isZero()) s = !s ? b.txt() : s + (b.n < 0 ? ' − ' + b.neg().txt() : ' + ' + b.txt());
        return s || '0';
    }
    const termTex = a => a.eq(1) ? 'x' : a.eq(-1) ? '-x' : a.tex() + 'x';

    /* =========================================================
       BALANÇA DE EQUAÇÕES
       ========================================================= */
    const PRESETS = ['3x + 5 = 20', '2(x - 3) = 5x + 9', 'x/2 + 1 = 4', '7 - 2x = x + 1', '4x - 3 = 2x + 7', '2x + 1 = 2x + 6'];

    function parseSide(src) {
        const f = compile(parseExpr(src));
        const v0 = f(0), v1 = f(1), v2 = f(2), vm = f(-3);
        if (![v0, v1, v2, vm].every(Number.isFinite)) throw new Error('Expressão inválida.');
        const a = v1 - v0;
        if (Math.abs((v2 - v1) - a) > 1e-9 || Math.abs(vm - (v0 - 3 * a)) > 1e-9) throw new Error('Use apenas equações do 1º grau (sem x², sem x no denominador).');
        const A = fromNumber(a), B = fromNumber(v0);
        if (!A || !B) throw new Error('Use coeficientes inteiros, decimais ou frações simples.');
        return { a: A, b: B };
    }
    function parseEquation(src) {
        const parts = String(src).split('=');
        if (parts.length !== 2 || !parts[0].trim() || !parts[1].trim()) throw new Error('Escreva uma equação com um único "=", como 3x + 5 = 20.');
        const L = parseSide(parts[0]), Rr = parseSide(parts[1]);
        if (L.a.isZero() && Rr.a.isZero()) throw new Error('A equação precisa ter x em pelo menos um dos lados.');
        return { L, R: Rr };
    }
    /* termo da operação: "5", "-2", "1/2", "x", "-3x", "x/2", "2,5" */
    function parseTerm(s) {
        s = String(s).replace(/[−–]/g, '-').replace(/\s/g, '').replace(/\*/g, '');
        if (!s) return null;
        const m = s.match(/^([-+]?)(\d+(?:[.,]\d+)?(?:\/\d+)?)?(x)(?:\/(\d+))?$/i);
        if (m) {
            let k = m[2] ? parseNum(m[2]) : F(1);
            if (!k) return null;
            if (m[1] === '-') k = k.neg();
            if (m[4]) { if (+m[4] === 0) return null; k = k.div(+m[4]); }
            return { x: k, c: F(0) };
        }
        const c = parseNum(s);
        return c ? { x: F(0), c } : null;
    }

    function initBalanca(root) {
        root.innerHTML =
            '<div class="lab-grid">' +
              '<div class="lab-stage"><canvas id="bl-cv"></canvas></div>' +
              '<div class="lab-side">' +
                '<div class="ctl"><label for="bl-eq">Equação</label>' +
                  '<div class="custom-fn" style="margin-top:0"><input id="bl-eq" type="text" spellcheck="false" autocomplete="off" value="3x + 5 = 20" aria-label="Equação"><button class="btn small" id="bl-use" type="button">Usar</button></div>' +
                  '<div class="fn-hint" id="bl-eqhint">Aceita parênteses e frações: 2(x − 3) = 5x + 9, x/2 + 1 = 4.</div>' +
                  '<div class="presets" id="bl-presets" style="margin-top:8px">' + PRESETS.map(p => '<button type="button">' + p + '</button>').join('') + '</div></div>' +
                '<div class="ctl"><label>Operação</label><div class="ops" id="bl-ops">' +
                  [['add', '+', 'Somar'], ['sub', '−', 'Subtrair'], ['mul', '×', 'Multiplicar'], ['div', '÷', 'Dividir']].map((o, i) =>
                    '<button type="button" data-op="' + o[0] + '" class="' + (i === 1 ? 'active' : '') + '" title="' + o[2] + '"><b style="font-size:1.05rem">' + o[1] + '</b> ' + o[2] + '</button>').join('') + '</div></div>' +
                '<div class="ctl"><label for="bl-term">Quanto? (número ou termo com x)</label>' +
                  '<input class="plain-in" id="bl-term" type="text" spellcheck="false" autocomplete="off" placeholder="ex.: 5, 2x, 1/2, −3"></div>' +
                '<div class="ctl-row" style="display:flex;gap:6px;flex-wrap:wrap">' +
                  '<button class="btn small primary" id="bl-both" type="button"><i class="fa-solid fa-scale-balanced"></i> Aplicar nos dois lados</button>' +
                  '<button class="btn small ghost" id="bl-left" type="button" title="Para ver o que acontece quando se mexe em um lado só">Só no esquerdo</button></div>' +
                '<div class="ctl-row" style="display:flex;gap:6px;flex-wrap:wrap">' +
                  '<button class="btn small" id="bl-hint" type="button"><i class="fa-regular fa-lightbulb"></i> Dica</button>' +
                  '<button class="btn small" id="bl-undo" type="button"><i class="fa-solid fa-rotate-left"></i> Desfazer</button>' +
                  '<button class="btn small" id="bl-new" type="button"><i class="fa-solid fa-dice"></i> Sortear</button></div>' +
                '<div class="readout"><div class="wide"><span>Equação atual</span><b class="tex-line" id="bl-cur"></b></div>' +
                  '<div class="wide"><span>Situação</span><b id="bl-msg" style="font-family:var(--sans);font-size:.88rem;font-weight:600"></b></div></div>' +
              '</div>' +
            '</div>' +
            '<div class="lab-under"><div class="lab-note"><strong>Passos</strong><ol id="bl-steps" style="margin:.6em 0 0;padding-left:1.3em"></ol></div>' +
              '<div class="lab-note"><strong>Como usar.</strong> Escolha a operação, digite o valor e aplique <em>nos dois lados</em>: a balança continua equilibrada e a equação continua equivalente. O objetivo é deixar ' + T('x') + ' sozinho em um prato. ' +
              '<p class="muted-p">Os blocos <b style="color:#a5b4fc">x</b> são incógnitas e os pesos <b style="color:#fbbf24">1</b> são unidades; vermelhos são negativos. Experimente "Só no esquerdo" para ver a balança tombar: é exatamente o erro de mexer em um lado só. Multiplicar e dividir só por números (diferentes de zero).</p></div></div>';

        const cv = $('#bl-cv', root);
        const S = k => $('#bl-' + k, root);
        let op = 'sub', st = null, hist = [], xs = null, angle = 0, target = 0, raf = 0;

        function value(side, x) { return side.a.val() * x + side.b.val(); }
        function diff() {
            if (xs === null) return st.unbalanced ? 1 : 0;
            return value(st.L, xs) - value(st.R, xs);
        }
        function eqTex(s) { return linTex(s.L.a, s.L.b) + (s.unbalanced ? ' \\neq ' : ' = ') + linTex(s.R.a, s.R.b); }
        function solved() {
            if (st.unbalanced) return false;
            const iso = (A, B) => A.a.eq(1) && A.b.isZero() && B.a.isZero();
            return iso(st.L, st.R) || iso(st.R, st.L);
        }
        function load(src) {
            try {
                const e = parseEquation(src);
                st = { L: e.L, R: e.R, unbalanced: false };
                const da = e.L.a.sub(e.R.a);
                xs = da.isZero() ? null : e.R.b.sub(e.L.b).div(da).val();
                hist = [{ eq: eqTex(st), op: 'Equação inicial' }];
                S('eq').classList.remove('bad'); S('eqhint').className = 'fn-hint';
                S('eqhint').innerHTML = 'Entendida como ' + T(eqTex(st));
                S('left').disabled = xs === null;
                update();
            } catch (err) { S('eq').classList.add('bad'); S('eqhint').className = 'fn-hint err'; S('eqhint').textContent = err.message; }
        }
        function message(html, cls) { S('msg').innerHTML = html; S('msg').style.color = cls === 'ok' ? 'var(--green)' : cls === 'no' ? 'var(--red)' : ''; }
        function update() {
            S('cur').innerHTML = T(eqTex(st));
            S('steps').innerHTML = hist.map(h => '<li style="margin:.25em 0">' + h.op + ': ' + T(h.eq) + '</li>').join('');
            const da = st.L.a.sub(st.R.a), db = st.R.b.sub(st.L.b);
            if (st.unbalanced) message('Desequilibrou: a operação foi feita em um lado só. Clique em Desfazer.', 'no');
            else if (solved()) {
                const v = st.L.a.isZero() ? st.L.b : st.R.b;
                message('Resolvido! ' + T('x = ' + v.tex()) + '. Confira substituindo na equação inicial.', 'ok');
            }
            else if (da.isZero()) message(db.isZero() ? 'Os dois lados são iguais para qualquer x: infinitas soluções.' : 'Os termos em x se cancelaram e sobraram números diferentes: não há solução.', db.isZero() ? 'ok' : 'no');
            else message('Equilibrada. Continue isolando o x.');
            target = Math.max(-0.22, Math.min(0.22, Math.atan(diff()) * 0.2));
            animate();
        }
        function apply(sides) {
            const t = parseTerm(S('term').value);
            if (!t) { message('Não entendi o valor. Exemplos: 5, −2, 1/2, 3x.', 'no'); return; }
            const isX = !t.x.isZero();
            if ((op === 'mul' || op === 'div') && isX) { message('Aqui multiplicamos e dividimos só por números, para a equação continuar do 1º grau.', 'no'); return; }
            if ((op === 'mul' || op === 'div') && t.c.isZero()) { message(op === 'div' ? 'Não existe divisão por zero.' : 'Multiplicar por zero apaga a equação (fica 0 = 0). Escolha outro número.', 'no'); return; }
            const f = s => op === 'add' ? { a: s.a.add(t.x), b: s.b.add(t.c) }
                : op === 'sub' ? { a: s.a.sub(t.x), b: s.b.sub(t.c) }
                : op === 'mul' ? { a: s.a.mul(t.c), b: s.b.mul(t.c) }
                : { a: s.a.div(t.c), b: s.b.div(t.c) };
            const prev = { L: st.L, R: st.R, unbalanced: st.unbalanced };
            st = { L: f(st.L), R: sides === 'both' ? f(st.R) : st.R, unbalanced: false };
            st.unbalanced = xs !== null && Math.abs(diff()) > 1e-9;
            const tt = isX ? linTex(t.x, 0) : t.c.tex();
            const verb = { add: 'Somar ' + T(tt), sub: 'Subtrair ' + T(tt), mul: 'Multiplicar por ' + T(t.c.ptex()), div: 'Dividir por ' + T(t.c.ptex()) }[op];
            hist.push({ eq: eqTex(st), op: verb + (sides === 'both' ? ' (dois lados)' : ' (<span style="color:var(--red)">só à esquerda</span>)'), prev });
            update();
        }
        function hint() {
            const { L, R: Rs } = st;
            if (st.unbalanced) return 'Desfaça a última operação: ela foi aplicada em um lado só.';
            if (solved()) return 'Já está resolvido. Sorteie outra equação.';
            if (L.a.eq(Rs.a)) return L.b.eq(Rs.b) ? 'Identidade: qualquer x serve.' : 'Não há solução: nenhum valor de x equilibra.';
            const dens = [L.a, L.b, Rs.a, Rs.b].reduce((m, v) => lcm(m, v.d), 1);
            if (dens > 1) return 'Há frações. Multiplique os dois lados por ' + T(String(dens)) + ' (o MMC dos denominadores) para eliminá-las.';
            if (!L.a.isZero() && !Rs.a.isZero()) {
                const k = L.a.val() >= Rs.a.val() ? Rs.a : L.a, where = k === Rs.a ? 'esquerda' : 'direita';
                return (k.n > 0 ? 'Subtraia ' + T(termTex(k)) : 'Some ' + T(termTex(k.neg()))) + ' dos dois lados para juntar os termos com x à ' + where + '.';
            }
            const Sx = L.a.isZero() ? Rs : L;
            if (!Sx.b.isZero()) return (Sx.b.n > 0 ? 'Subtraia ' + T(Sx.b.tex()) : 'Some ' + T(Sx.b.neg().tex())) + ' dos dois lados para isolar o termo com x.';
            return 'Divida os dois lados por ' + T(Sx.a.ptex()) + ' para sobrar só ' + T('x') + '.';
        }
        function randomEq() {
            const s = R(-6, 9), a1 = R(2, 6);
            let a2 = R(-2, a1 - 1); if (Math.random() < .35) a2 = 0;
            const b2 = R(-10, 12), b1 = a2 * s + b2 - a1 * s;
            const left = linTxt(F(a1), F(b1)), right = linTxt(F(a2), F(b2));
            return (Math.random() < .5 ? left + ' = ' + right : right + ' = ' + left).replace(/−/g, '-');
        }

        /* ---------- desenho ---------- */
        function animate() {
            cancelAnimationFrame(raf);
            const step = () => { angle += (target - angle) * 0.18; draw(); if (Math.abs(target - angle) > 0.001) raf = requestAnimationFrame(step); else { angle = target; draw(); } };
            raf = requestAnimationFrame(step);
        }
        function drawPan(c, cx, cy, pw, side) {
            /* prato */
            c.strokeStyle = '#64748b'; c.lineWidth = 2;
            c.beginPath(); c.moveTo(cx - pw / 2, cy); c.quadraticCurveTo(cx, cy + 22, cx + pw / 2, cy); c.stroke();
            c.fillStyle = 'rgba(148,163,184,.12)'; c.fill();
            /* conteúdo */
            const a = side.a, b = side.b, items = [];
            const drawable = a.isInt() && b.isInt() && Math.abs(a.n) <= 6 && Math.abs(b.n) <= 12;
            if (drawable) {
                for (let i = 0; i < Math.abs(a.n); i++) items.push({ k: 'x', neg: a.n < 0 });
                for (let i = 0; i < Math.abs(b.n); i++) items.push({ k: '1', neg: b.n < 0 });
                const size = Math.min(26, (pw - 12) / 6.5), gap = 3, perRow = Math.max(1, Math.floor((pw - 10) / (size + gap)));
                items.forEach((it, i) => {
                    const row = Math.floor(i / perRow), col = i % perRow, nInRow = Math.min(perRow, items.length - row * perRow);
                    const x = cx - (nInRow * (size + gap) - gap) / 2 + col * (size + gap), y = cy - 4 - (row + 1) * (size + gap);
                    if (it.k === 'x') {
                        rrect(c, x, y, size, size, 5);
                        c.fillStyle = it.neg ? 'rgba(248,113,113,.25)' : 'rgba(99,102,241,.55)'; c.fill();
                        c.strokeStyle = it.neg ? '#f87171' : '#a5b4fc'; c.lineWidth = 1.5; c.stroke();
                        c.fillStyle = '#fff'; c.font = '600 ' + Math.round(size * .5) + 'px "JetBrains Mono", monospace';
                        c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(it.neg ? '−x' : 'x', x + size / 2, y + size / 2 + 1);
                    } else {
                        c.beginPath(); c.arc(x + size / 2, y + size / 2, size * .42, 0, Math.PI * 2);
                        c.fillStyle = it.neg ? 'rgba(248,113,113,.25)' : 'rgba(251,191,36,.75)'; c.fill();
                        c.strokeStyle = it.neg ? '#f87171' : '#fbbf24'; c.lineWidth = 1.5; c.stroke();
                        c.fillStyle = it.neg ? '#fecaca' : '#1e1b4b'; c.font = '700 ' + Math.round(size * .42) + 'px "JetBrains Mono", monospace';
                        c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(it.neg ? '−1' : '1', x + size / 2, y + size / 2 + 1);
                    }
                });
            } else {
                const txt = linTxt(a, b);
                c.font = '600 15px "JetBrains Mono", monospace';
                const tw = c.measureText(txt).width + 22;
                rrect(c, cx - tw / 2, cy - 40, tw, 30, 8);
                c.fillStyle = 'rgba(99,102,241,.3)'; c.fill(); c.strokeStyle = '#a5b4fc'; c.lineWidth = 1.5; c.stroke();
                c.fillStyle = '#fff'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(txt, cx, cy - 25);
            }
        }
        function draw() {
            const g = fitCanvas(cv); if (!g || !st) return;
            const { ctx: c, w, h } = g;
            c.clearRect(0, 0, w, h); c.fillStyle = '#0c1220'; c.fillRect(0, 0, w, h);
            const cx = w / 2, pivotY = h * 0.3, pw = Math.min(w * 0.4, 240), half = Math.min(w * 0.36, 300, w / 2 - pw / 2 - 10), hang = h * 0.3;
            /* base */
            c.fillStyle = '#334155';
            c.beginPath(); c.moveTo(cx - 10, pivotY); c.lineTo(cx + 10, pivotY); c.lineTo(cx + 34, h * 0.86); c.lineTo(cx - 34, h * 0.86); c.closePath(); c.fill();
            c.fillRect(cx - 70, h * 0.86, 140, 8);
            /* travessão */
            const lx = cx - half * Math.cos(angle), ly = pivotY + half * Math.sin(angle);
            const rx = cx + half * Math.cos(angle), ry = pivotY - half * Math.sin(angle);
            c.strokeStyle = st.unbalanced ? '#f87171' : '#94a3b8'; c.lineWidth = 6; c.lineCap = 'round';
            c.beginPath(); c.moveTo(lx, ly); c.lineTo(rx, ry); c.stroke();
            c.fillStyle = '#e2e8f0'; c.beginPath(); c.arc(cx, pivotY, 7, 0, Math.PI * 2); c.fill();
            /* cordas e pratos */
            c.lineWidth = 1.2; c.strokeStyle = '#475569';
            [[lx, ly], [rx, ry]].forEach(([px, py]) => {
                c.beginPath(); c.moveTo(px, py); c.lineTo(px - pw / 2, py + hang); c.moveTo(px, py); c.lineTo(px + pw / 2, py + hang); c.stroke();
            });
            drawPan(c, lx, ly + hang, pw, st.L);
            drawPan(c, rx, ry + hang, pw, st.R);
            /* expressões */
            c.font = '600 17px "JetBrains Mono", monospace'; c.textAlign = 'center'; c.textBaseline = 'top';
            c.fillStyle = '#e2e8f0';
            c.fillText(linTxt(st.L.a, st.L.b), lx, ly + hang + 26);
            c.fillText(linTxt(st.R.a, st.R.b), rx, ry + hang + 26);
            c.font = '700 30px "JetBrains Mono", monospace'; c.fillStyle = st.unbalanced ? '#f87171' : solved() ? '#34d399' : '#818cf8';
            c.fillText(st.unbalanced ? '≠' : '=', cx, h * 0.6);
            if (solved()) {
                c.font = '600 13px "Plus Jakarta Sans", sans-serif'; c.fillStyle = '#34d399';
                c.fillText('x isolado: equação resolvida', cx, 16);
            }
        }

        /* ---------- eventos ---------- */
        S('ops').addEventListener('click', e => {
            const b = e.target.closest('button'); if (!b) return;
            op = b.dataset.op;
            S('ops').querySelectorAll('button').forEach(x => x.classList.toggle('active', x === b));
            S('term').focus();
        });
        S('both').addEventListener('click', () => apply('both'));
        S('left').addEventListener('click', () => apply('left'));
        S('term').addEventListener('keydown', e => { if (e.key === 'Enter') apply('both'); });
        S('undo').addEventListener('click', () => {
            if (hist.length < 2) return;
            const h = hist.pop(); st = h.prev; update();
        });
        S('hint').addEventListener('click', () => message('<i class="fa-regular fa-lightbulb"></i> ' + hint()));
        S('new').addEventListener('click', () => { S('eq').value = randomEq(); load(S('eq').value); });
        S('use').addEventListener('click', () => load(S('eq').value));
        S('eq').addEventListener('keydown', e => { if (e.key === 'Enter') load(S('eq').value); });
        S('presets').addEventListener('click', e => { const b = e.target.closest('button'); if (b) { S('eq').value = b.textContent; load(b.textContent); } });

        observe(cv, draw);
        load(S('eq').value);
        return draw;
    }

    /* =========================================================
       MODELO DE ÁREAS
       ========================================================= */
    const AREA_COL = {
        a: ['rgba(99,102,241,.55)', '#a5b4fc'],
        b: ['rgba(56,189,248,.4)', '#7dd3fc'],
        c: ['rgba(52,211,153,.38)', '#6ee7b7'],
        d: ['rgba(251,191,36,.5)', '#fcd34d'],
        hole: ['rgba(248,113,113,.08)', '#f87171']
    };
    function initAreas(root) {
        function slider(id, label, min, max, step, val) {
            return '<div class="ctl" id="ar-w-' + id + '"><label for="ar-' + id + '">' + label + ' = <b id="ar-' + id + '-v"></b></label><input id="ar-' + id + '" type="range" min="' + min + '" max="' + max + '" step="' + step + '" value="' + val + '"></div>';
        }
        root.innerHTML =
            '<div class="lab-grid">' +
              '<div class="lab-stage"><canvas id="ar-cv"></canvas></div>' +
              '<div class="lab-side">' +
                '<div class="ctl"><label for="ar-mode">Produto notável</label><select id="ar-mode">' +
                  '<option value="stevin">(x + p)(x + q)</option><option value="sq">(a + b)²</option><option value="dif">a² − b² = (a + b)(a − b)</option></select></div>' +
                slider('x', T('x'), 1, 8, 0.5, 3) + slider('p', T('p'), 1, 6, 1, 2) + slider('q', T('q'), 1, 6, 1, 3) +
                slider('a', T('a'), 1, 8, 0.5, 4) + slider('b', T('b'), 0.5, 6, 0.5, 2) +
                '<div class="readout"><div class="wide"><span>Identidade</span><b class="tex-line" id="ar-id"></b></div>' +
                  '<div class="wide"><span>Conferindo com números</span><b class="tex-line" id="ar-num"></b></div></div>' +
              '</div>' +
            '</div>' +
            '<div class="lab-under">' +
              '<div class="challenge"><p id="ar-ch">Treino de soma e produto.</p>' +
                '<div class="row" style="align-items:center"><input class="plain-in" id="ar-r1" style="width:84px" aria-label="primeiro número" placeholder="nº 1">' +
                '<input class="plain-in" id="ar-r2" style="width:84px" aria-label="segundo número" placeholder="nº 2">' +
                '<button class="btn small" id="ar-check" type="button"><i class="fa-solid fa-check"></i> Conferir</button>' +
                '<button class="btn small ghost" id="ar-next" type="button"><i class="fa-solid fa-dice"></i> Outro</button></div>' +
                '<div class="verdict" id="ar-verdict"></div></div>' +
              '<div class="lab-note" id="ar-note"></div></div>';

        const cv = $('#ar-cv', root), S = k => $('#ar-' + k, root);
        const v = k => +S(k).value;
        const n2 = x => String(+x.toFixed(2)).replace('.', '{,}');
        const NOTES = {
            stevin: '<strong>Leitura.</strong> O retângulo tem lados ' + T('x+p') + ' e ' + T('x+q') + '. Ele se divide em quatro peças: ' + T('x^2') + ', ' + T('px') + ', ' + T('qx') + ' e ' + T('pq') + '. Juntando as duas faixas, ' + T('(p+q)x') + ': é por isso que, para fatorar ' + T('x^2+Sx+P') + ', procuramos dois números com <b>soma</b> ' + T('S') + ' e <b>produto</b> ' + T('P') + '.',
            sq: '<strong>Leitura.</strong> O quadrado de lado ' + T('a+b') + ' tem <b>quatro</b> peças: ' + T('a^2') + ', ' + T('b^2') + ' e <b>dois</b> retângulos ' + T('ab') + '. Os retângulos são o ' + T('2ab') + ' que some quando alguém escreve ' + T('(a+b)^2 = a^2+b^2') + '.',
            dif: '<strong>Leitura.</strong> Tire um quadrado ' + T('b \\times b') + ' do canto do quadrado ' + T('a \\times a') + '. Sobram duas peças (A e B). Girando B e encostando ao lado de A, forma-se um retângulo de lados ' + T('a+b') + ' e ' + T('a-b') + '. Mesma área: ' + T('a^2-b^2=(a+b)(a-b)') + '.'
        };

        function sync() {
            const m = S('mode').value;
            ['x', 'p', 'q'].forEach(k => { S('w-' + k).hidden = m !== 'stevin'; });
            ['a', 'b'].forEach(k => { S('w-' + k).hidden = m === 'stevin'; });
            if (m === 'dif' && v('b') >= v('a')) S('b').value = Math.max(0.5, v('a') - 0.5);
            ['x', 'p', 'q', 'a', 'b'].forEach(k => { S(k + '-v').textContent = String(v(k)).replace('.', ','); });
            S('note').innerHTML = NOTES[m];
            if (m === 'stevin') {
                const x = v('x'), p = v('p'), q = v('q');
                S('id').innerHTML = T('(x+' + p + ')(x+' + q + ') = x^2 + ' + (p + q) + 'x + ' + (p * q));
                S('num').innerHTML = T('x=' + n2(x) + ':\\ ' + n2(x + p) + '\\cdot' + n2(x + q) + ' = ' + n2(x * x) + '+' + n2((p + q) * x) + '+' + (p * q) + ' = ' + n2((x + p) * (x + q)));
            } else if (m === 'sq') {
                const a = v('a'), b = v('b');
                S('id').innerHTML = T('(a+b)^2 = a^2 + 2ab + b^2');
                S('num').innerHTML = T(n2(a + b) + '^2 = ' + n2(a * a) + ' + ' + n2(2 * a * b) + ' + ' + n2(b * b) + ' = ' + n2((a + b) * (a + b)));
            } else {
                const a = v('a'), b = v('b');
                S('id').innerHTML = T('a^2 - b^2 = (a+b)(a-b)');
                S('num').innerHTML = T(n2(a * a) + ' - ' + n2(b * b) + ' = ' + n2(a + b) + '\\cdot' + n2(a - b) + ' = ' + n2(a * a - b * b));
            }
            draw();
        }
        function piece(c, x, y, w, h, col, label, sub) {
            c.fillStyle = col[0]; c.strokeStyle = col[1]; c.lineWidth = 1.5;
            c.fillRect(x, y, w, h); c.strokeRect(x + .5, y + .5, w - 1, h - 1);
            if (w < 22 || h < 16) return;
            c.fillStyle = '#fff'; c.textAlign = 'center'; c.textBaseline = 'middle';
            const fs = Math.max(11, Math.min(20, Math.min(w, h) / 3));
            c.font = '600 ' + fs + 'px "JetBrains Mono", monospace';
            c.fillText(label, x + w / 2, y + h / 2 - (sub && h > 40 ? fs * .45 : 0));
            if (sub && h > 40 && w > 34) { c.font = Math.max(10, fs * .62) + 'px "JetBrains Mono", monospace'; c.fillStyle = '#cbd5e1'; c.fillText(sub, x + w / 2, y + h / 2 + fs * .6); }
        }
        function dimH(c, x, y, w, label, col) { c.fillStyle = col || '#cbd5e1'; c.font = '600 13px "JetBrains Mono", monospace'; c.textAlign = 'center'; c.textBaseline = 'bottom'; c.fillText(label, x + w / 2, y - 6); }
        function dimV(c, x, y, h, label, col) { c.fillStyle = col || '#cbd5e1'; c.font = '600 13px "JetBrains Mono", monospace'; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText(label, x - 8, y + h / 2); }
        const ns = x => String(+x.toFixed(2)).replace('.', ',');
        function draw() {
            const g = fitCanvas(cv); if (!g) return;
            const { ctx: c, w, h } = g;
            c.clearRect(0, 0, w, h); c.fillStyle = '#0c1220'; c.fillRect(0, 0, w, h);
            const m = S('mode').value, pad = 54;
            if (m === 'stevin') {
                const x = v('x'), p = v('p'), q = v('q');
                const k = Math.min((w - 2 * pad) / (x + p), (h - 2 * pad) / (x + q));
                const ox = (w - k * (x + p)) / 2, oy = (h - k * (x + q)) / 2;
                piece(c, ox, oy, k * x, k * x, AREA_COL.a, 'x²', ns(x * x));
                piece(c, ox + k * x, oy, k * p, k * x, AREA_COL.b, p + 'x', ns(p * x));
                piece(c, ox, oy + k * x, k * x, k * q, AREA_COL.c, q + 'x', ns(q * x));
                piece(c, ox + k * x, oy + k * x, k * p, k * q, AREA_COL.d, String(p * q), '');
                dimH(c, ox, oy, k * x, 'x'); dimH(c, ox + k * x, oy, k * p, String(p), '#7dd3fc');
                dimV(c, ox, oy, k * x, 'x'); dimV(c, ox, oy + k * x, k * q, String(q), '#6ee7b7');
            } else if (m === 'sq') {
                const a = v('a'), b = v('b'), s = a + b;
                const k = Math.min((w - 2 * pad) / s, (h - 2 * pad) / s);
                const ox = (w - k * s) / 2, oy = (h - k * s) / 2;
                piece(c, ox, oy, k * a, k * a, AREA_COL.a, 'a²', ns(a * a));
                piece(c, ox + k * a, oy, k * b, k * a, AREA_COL.b, 'ab', ns(a * b));
                piece(c, ox, oy + k * a, k * a, k * b, AREA_COL.b, 'ab', ns(a * b));
                piece(c, ox + k * a, oy + k * a, k * b, k * b, AREA_COL.d, 'b²', ns(b * b));
                dimH(c, ox, oy, k * a, 'a'); dimH(c, ox + k * a, oy, k * b, 'b', '#fcd34d');
                dimV(c, ox, oy, k * a, 'a'); dimV(c, ox, oy + k * a, k * b, 'b', '#fcd34d');
            } else {
                const a = v('a'), b = Math.min(v('b'), a - 0.5), gap = 1.2;
                const k = Math.min((w - 2 * pad - 30) / (a + gap + a + b), (h - 2 * pad) / a);
                const tot = k * (a + gap + a + b), ox = (w - tot) / 2, oy = (h - k * a) / 2;
                /* figura 1: quadrado a×a sem o canto b×b */
                piece(c, ox, oy, k * a, k * (a - b), AREA_COL.a, 'A', '');
                piece(c, ox, oy + k * (a - b), k * (a - b), k * b, AREA_COL.c, 'B', '');
                c.setLineDash([5, 4]); c.strokeStyle = AREA_COL.hole[1]; c.lineWidth = 1.5;
                c.strokeRect(ox + k * (a - b), oy + k * (a - b), k * b, k * b); c.setLineDash([]);
                c.fillStyle = '#f87171'; c.font = '600 12px "JetBrains Mono", monospace'; c.textAlign = 'center'; c.textBaseline = 'middle';
                if (k * b > 28) c.fillText('−b²', ox + k * (a - b / 2), oy + k * (a - b / 2));
                dimH(c, ox, oy, k * a, 'a'); dimV(c, ox, oy, k * a, 'a');
                c.fillStyle = '#64748b'; c.textAlign = 'right'; c.textBaseline = 'top';
                c.fillText('b', ox + k * a - 4, oy + k * a + 4);
                /* seta */
                const ax = ox + k * a + k * gap * .15, bx = ox + k * (a + gap) - k * gap * .15, ay = oy + k * a / 2;
                c.strokeStyle = '#818cf8'; c.lineWidth = 2; c.beginPath(); c.moveTo(ax, ay); c.lineTo(bx, ay); c.lineTo(bx - 8, ay - 6); c.moveTo(bx, ay); c.lineTo(bx - 8, ay + 6); c.stroke();
                /* figura 2: retângulo (a+b)×(a−b) */
                const rx = ox + k * (a + gap), ry = oy + k * b / 2;
                piece(c, rx, ry, k * a, k * (a - b), AREA_COL.a, 'A', '');
                piece(c, rx + k * a, ry, k * b, k * (a - b), AREA_COL.c, 'B', '');
                dimH(c, rx, ry, k * (a + b), 'a + b');
                c.fillStyle = '#cbd5e1'; c.font = '600 13px "JetBrains Mono", monospace'; c.textAlign = 'left'; c.textBaseline = 'middle';
                c.fillText('a − b', rx + k * (a + b) + 8, ry + k * (a - b) / 2);
            }
        }

        /* treino de soma e produto */
        let pq = null;
        function nextChallenge() {
            let p, q;
            do { p = RNZ(-9, 9); q = RNZ(-9, 9); } while (p + q === 0 && Math.random() < .7);
            pq = [p, q];
            const Sm = p + q, P = p * q;
            const poly = 'x^2' + (Sm === 0 ? '' : Sm === 1 ? '+x' : Sm === -1 ? '-x' : (Sm > 0 ? '+' : '') + Sm + 'x') + (P > 0 ? '+' : '') + P;
            S('ch').innerHTML = '<b>Soma e produto.</b> Fatore ' + T(poly) + ' como ' + T('(x+m)(x+n)') + ': ache dois números com soma ' + T(String(Sm)) + ' e produto ' + T(String(P)) + '.';
            S('r1').value = ''; S('r2').value = ''; S('verdict').textContent = ''; S('verdict').className = 'verdict';
        }
        function check() {
            const a = parseNum(S('r1').value), b = parseNum(S('r2').value), V = S('verdict');
            if (!a || !b) { V.className = 'verdict no'; V.textContent = 'Digite os dois números (podem ser negativos).'; return; }
            const Sm = pq[0] + pq[1], P = pq[0] * pq[1], s = a.add(b), pr = a.mul(b);
            const fac = (m) => '(x' + (m > 0 ? '+' : '') + m + ')';
            if (s.eq(Sm) && pr.eq(P)) {
                V.className = 'verdict ok'; V.innerHTML = 'Certo! ' + T('x^2' + (Sm === 0 ? '' : (Sm > 0 ? '+' : '') + Sm + 'x') + (P > 0 ? '+' : '') + P + ' = ' + fac(pq[0]) + fac(pq[1]));
            } else {
                V.className = 'verdict no';
                V.innerHTML = 'Ainda não. Seus números têm soma ' + T(s.tex()) + (s.eq(Sm) ? ' ✓' : ' (precisa ' + Sm + ')') + ' e produto ' + T(pr.tex()) + (pr.eq(P) ? ' ✓' : ' (precisa ' + P + ')') + '. Dica: comece listando os pares cujo produto é ' + T(String(P)) + '.';
            }
        }

        root.querySelectorAll('input[type=range], select').forEach(el => el.addEventListener('input', sync));
        S('check').addEventListener('click', check);
        S('next').addEventListener('click', nextChallenge);
        [S('r1'), S('r2')].forEach(i => i.addEventListener('keydown', e => { if (e.key === 'Enter') check(); }));
        observe(cv, draw);
        nextChallenge();
        sync();
        return draw;
    }

    /* =========================================================
       TREINO INFINITO
       ========================================================= */
    const TOPICS = [
        ['misto', 'Misturar todos os temas'],
        ['sinais', 'Sinais e ordem das operações'],
        ['fracoes', 'Frações'],
        ['potencias', 'Potências e raízes'],
        ['valor', 'Valor numérico'],
        ['eq1', 'Equação do 1º grau'],
        ['mmc', 'MMC e MDC'],
        ['porcent', 'Porcentagem'],
        ['fatora', 'Fatoração e equação do 2º grau']
    ];
    const pt = x => x < 0 ? '(' + x + ')' : String(x);   /* inteiro com parênteses se negativo */
    function factorTex(n) {
        const f = []; let m = n;
        for (let p = 2; p * p <= m; p++) { let e = 0; while (m % p === 0) { m /= p; e++; } if (e) f.push([p, e]); }
        if (m > 1) f.push([m, 1]);
        return { list: f, tex: f.map(([p, e]) => e > 1 ? p + '^{' + e + '}' : String(p)).join('\\cdot ') };
    }
    const signWord = (a, b) => (a < 0) === (b < 0) ? 'sinais iguais, resultado positivo' : 'sinais diferentes, resultado negativo';

    const GEN = {
        sinais() {
            const t = R(1, 4);
            if (t === 1) {
                const a = R(-9, 9), b = RNZ(-6, 6), c = RNZ(-6, 6), r = a + b * c;
                return { ask: 'Calcule:', q: a + ' + ' + pt(b) + '\\cdot ' + pt(c), ans: [F(r)],
                    sol: ['Multiplicação primeiro: ' + T(pt(b) + '\\cdot' + pt(c) + ' = ' + b * c) + ' (' + signWord(b, c) + ').', 'Depois a soma: ' + T(a + ' + ' + pt(b * c) + ' = ' + r) + '.'] };
            }
            if (t === 2) {
                const a = R(2, 6), e = R(2, 3), par = Math.random() < .5;
                const r = par ? Math.pow(-a, e) : -Math.pow(a, e);
                return { ask: 'Calcule:', q: par ? '(-' + a + ')^{' + e + '}' : '-' + a + '^{' + e + '}', ans: [F(r)],
                    sol: par ? ['A base é ' + T('-' + a) + ' (está entre parênteses).', T('(-' + a + ')^{' + e + '} = ' + r) + (e % 2 ? ' (expoente ímpar mantém o sinal).' : ' (expoente par dá positivo).')]
                        : ['Sem parênteses, a potência vem antes do sinal: ' + T('-' + a + '^{' + e + '} = -(' + a + '^{' + e + '})') + '.', 'Resultado: ' + T(String(r)) + '.'] };
            }
            if (t === 3) {
                const a = R(-9, 9), b = R(-9, 9), c = R(-9, 9), d = R(-9, 9), r = (a - b) - (c - d);
                return { ask: 'Calcule:', q: '(' + a + ' - ' + pt(b) + ') - (' + c + ' - ' + pt(d) + ')', ans: [F(r)],
                    sol: ['Parênteses primeiro: ' + T(a + ' - ' + pt(b) + ' = ' + (a - b)) + ' e ' + T(c + ' - ' + pt(d) + ' = ' + (c - d)) + '.', 'Subtrair é somar o oposto: ' + T(pt(a - b) + ' - ' + pt(c - d) + ' = ' + r) + '.'] };
            }
            const a = RNZ(-5, 5), b = RNZ(-5, 5), c = R(2, 4) * (Math.random() < .5 ? -1 : 1), num = a * b * c, den = pick([1, -1, 2, -2].filter(d => num % d === 0));
            const r = num / den, negs = [a, b, c, den].filter(x => x < 0).length;
            return { ask: 'Calcule:', q: '\\dfrac{' + pt(a) + '\\cdot' + pt(b) + '\\cdot' + pt(c) + '}{' + den + '}', ans: [F(r)],
                sol: ['Conte os sinais de menos: ' + negs + ' (' + (negs % 2 ? 'ímpar, resultado negativo' : 'par, resultado positivo') + ').', 'Valores absolutos: ' + T(Math.abs(num) + '\\div' + Math.abs(den) + ' = ' + Math.abs(r)) + '. Resultado: ' + T(String(r)) + '.'] };
        },
        fracoes() {
            const op = pick(['+', '-', '\\cdot', '\\div']);
            let a, b, c, d;
            do { b = R(2, 9); a = RNZ(-7, 8); } while (gcd(a, b) !== 1);
            do { d = R(2, 9); c = R(1, 8); } while (gcd(c, d) !== 1);
            const A = F(a, b), C = F(c, d);
            const q = '\\frac{' + a + '}{' + b + '} ' + op + ' \\frac{' + c + '}{' + d + '}';
            let r, sol;
            if (op === '+' || op === '-') {
                const m = lcm(b, d), na = a * m / b, nc = c * m / d;
                r = op === '+' ? A.add(C) : A.sub(C);
                sol = ['MMC dos denominadores: ' + T('\\text{mmc}(' + b + ',' + d + ') = ' + m) + '.',
                    'Reescreva: ' + T('\\frac{' + na + '}{' + m + '} ' + op + ' \\frac{' + nc + '}{' + m + '} = \\frac{' + (op === '+' ? na + nc : na - nc) + '}{' + m + '}') + '.',
                    'Simplificado: ' + T(r.tex()) + '.'];
            } else if (op === '\\cdot') {
                r = A.mul(C);
                sol = ['Numerador com numerador, denominador com denominador: ' + T('\\frac{' + a + '\\cdot ' + c + '}{' + b + '\\cdot ' + d + '} = \\frac{' + a * c + '}{' + b * d + '}') + '.', 'Simplificado: ' + T(r.tex()) + '.'];
            } else {
                r = A.div(C);
                sol = ['Conserva a primeira e inverte a segunda: ' + T('\\frac{' + a + '}{' + b + '}\\cdot\\frac{' + d + '}{' + c + '} = \\frac{' + a * d + '}{' + b * c + '}') + '.', 'Simplificado: ' + T(r.tex()) + '.'];
            }
            return { ask: 'Calcule e simplifique (responda como fração, ex.: 3/4):', q, ans: [r], sol };
        },
        potencias() {
            const t = R(1, 4);
            if (t === 1) {
                const a = R(2, 5), n = R(1, 3), r = F(1, Math.pow(a, n));
                return { ask: 'Calcule (responda como fração):', q: a + '^{-' + n + '}', ans: [r], sol: ['Expoente negativo inverte: ' + T(a + '^{-' + n + '} = \\frac{1}{' + a + '^{' + n + '}} = ' + r.tex()) + '.'] };
            }
            if (t === 2) {
                let p, qq; do { p = R(1, 5); qq = R(2, 5); } while (gcd(p, qq) !== 1);
                const n = R(1, 2), r = F(qq, p).pow(n);
                return { ask: 'Calcule (responda como fração):', q: '\\left(\\frac{' + p + '}{' + qq + '}\\right)^{-' + n + '}', ans: [r],
                    sol: ['Expoente negativo: inverta a fração e troque o sinal do expoente.', T('\\left(\\frac{' + qq + '}{' + p + '}\\right)^{' + n + '} = ' + r.tex()) + '.'] };
            }
            if (t === 3) {
                const k = R(2, 4), n = R(2, 3), m = R(1, 2), base = Math.pow(k, n), r = Math.pow(k, m);
                return { ask: 'Calcule:', q: base + '^{\\frac{' + m + '}{' + n + '}}', ans: [F(r)],
                    sol: ['O denominador do expoente é o índice da raiz: ' + T(base + '^{\\frac{' + m + '}{' + n + '}} = \\left(\\sqrt' + (n === 2 ? '' : '[' + n + ']') + '{' + base + '}\\right)^{' + m + '}') + '.', T((n === 2 ? '\\sqrt{' : '\\sqrt[' + n + ']{') + base + '} = ' + k) + ', e ' + T(k + '^{' + m + '} = ' + r) + '.'] };
            }
            const b = pick([2, 3]), m = R(2, 6), n = R(1, 4), k = R(2, 7), e = m + n - k, r = F(b).pow(e);
            return { ask: 'Calcule (responda como número ou fração):', q: '\\dfrac{' + b + '^{' + m + '}\\cdot ' + b + '^{' + n + '}}{' + b + '^{' + k + '}}', ans: [r],
                sol: ['Mesma base: some os expoentes do produto e subtraia o do denominador: ' + T(m + '+' + n + '-' + k + ' = ' + e) + '.', T(b + '^{' + e + '} = ' + r.tex()) + '.'] };
        },
        valor() {
            const a = RNZ(-3, 3), b = R(-6, 6), c = R(-9, 9), x = pick([-4, -3, -2, -1, 2, 3]);
            const poly = (a === 1 ? '' : a === -1 ? '-' : a) + 'x^2' + (b === 0 ? '' : (b > 0 ? '+' : '') + (b === 1 ? '' : b === -1 ? '-' : b) + 'x') + (c === 0 ? '' : (c > 0 ? '+' : '') + c);
            const t1 = a * x * x, t2 = b * x, r = t1 + t2 + c;
            const sub = (a === 1 ? '' : a === -1 ? '-' : a + '\\cdot') + '(' + x + ')^2' + (b === 0 ? '' : (b > 0 ? '+' : '') + b + '\\cdot(' + x + ')') + (c === 0 ? '' : (c > 0 ? '+' : '') + c);
            return { ask: 'Calcule o valor numérico de', q: poly + '\\quad\\text{para } x = ' + x, ans: [F(r)],
                sol: ['Substitua com parênteses: ' + T(sub) + '.', 'Potência primeiro: ' + T('(' + x + ')^2 = ' + x * x) + '.', 'Termos: ' + T(pt(t1) + (b === 0 ? '' : ' + ' + pt(t2)) + (c === 0 ? '' : ' + ' + pt(c)) + ' = ' + r) + '.'] };
        },
        eq1() {
            if (Math.random() < .35) {
                const s = R(-6, 8), k = R(2, 5), m = RNZ(-6, 6), n = k * (s + m);
                return { ask: 'Resolva a equação (responda o valor de x):', q: k + '(x ' + (m > 0 ? '+ ' : '- ') + Math.abs(m) + ') = ' + n, ans: [F(s)],
                    sol: ['Distributiva: ' + T(k + 'x ' + (k * m > 0 ? '+ ' : '- ') + Math.abs(k * m) + ' = ' + n) + '.', 'Isolando o termo com x: ' + T(k + 'x = ' + n + (k * m > 0 ? ' - ' : ' + ') + Math.abs(k * m) + ' = ' + (n - k * m)) + '.', 'Dividindo por ' + k + ': ' + T('x = ' + s) + '.'] };
            }
            const s = R(-7, 9), a1 = R(2, 7);
            let a2 = R(-3, a1 - 1); if (Math.random() < .4) a2 = 0;
            const b2 = R(-12, 12), b1 = a2 * s + b2 - a1 * s;
            const L = linTex(F(a1), F(b1)), Rr = linTex(F(a2), F(b2)), A = a1 - a2, B = b2 - b1;
            const sol = [];
            if (a2 !== 0) sol.push('Junte os termos com x à esquerda (' + (a2 > 0 ? 'subtraia ' + T(termTex(F(a2))) : 'some ' + T(termTex(F(-a2)))) + ') e os números à direita.');
            else sol.push('Passe o número para o outro lado (' + (b1 > 0 ? 'subtraia ' + b1 : 'some ' + (-b1)) + ' dos dois lados).');
            sol.push(T(A + 'x = ' + pt(b2) + ' - ' + pt(b1) + ' = ' + B) + '.');
            sol.push('Divida por ' + A + ': ' + T('x = ' + s) + '. Confira: ' + T(a1 + '\\cdot' + pt(s) + (b1 ? (b1 > 0 ? '+' : '') + b1 : '') + ' = ' + (a1 * s + b1)) + ' e ' + T((a2 ? a2 + '\\cdot' + pt(s) : '') + (a2 && b2 > 0 ? '+' : '') + (b2 || (a2 ? '' : '0')) + ' = ' + (a2 * s + b2)) + '.');
            return { ask: 'Resolva a equação (responda o valor de x):', q: L + ' = ' + Rr, ans: [F(s)], sol };
        },
        mmc() {
            const pool = [4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 24, 28, 30, 36, 40, 42, 45, 48, 60];
            let a, b; do { a = pick(pool); b = pick(pool); } while (a === b);
            const isMmc = Math.random() < .5, fa = factorTex(a), fb = factorTex(b);
            const r = isMmc ? lcm(a, b) : gcd(a, b);
            return { ask: 'Calcule:', q: '\\text{' + (isMmc ? 'mmc' : 'mdc') + '}(' + a + ', ' + b + ')', ans: [F(r)],
                sol: ['Fatore: ' + T(a + ' = ' + fa.tex) + ' e ' + T(b + ' = ' + fb.tex) + '.',
                    isMmc ? 'MMC: todos os primos, cada um com o <b>maior</b> expoente: ' + T(factorTex(r).tex + ' = ' + r) + '.'
                          : 'MDC: só os primos comuns, com o <b>menor</b> expoente: ' + T((r === 1 ? '1' : factorTex(r).tex + ' = ' + r)) + '.'] };
        },
        porcent() {
            const t = R(1, 5), p = pick([5, 10, 12, 15, 20, 25, 30, 40, 75]), v = pick([40, 60, 80, 120, 150, 200, 240, 300, 400, 500, 800]);
            const P = F(p, 100), pd = String(p / 100).replace('.', '{,}');
            if (t === 1) { const r = P.mul(v); return { ask: 'Calcule:', q: p + '\\%\\ \\text{de}\\ ' + v, ans: [r], sol: [T(p + '\\% = ' + pd) + '.', T(pd + '\\cdot ' + v + ' = ' + r.dec()) + '.'] }; }
            if (t === 2) { const f = F(1).add(P), r = f.mul(v); return { ask: 'Um preço de R$ ' + v + ' aumentou ' + p + '%. Qual o novo preço (em reais)?', q: '', ans: [r], sol: ['Aumento de ' + p + '%: multiplique por ' + T(f.dec()) + '.', T(v + '\\cdot ' + f.dec() + ' = ' + r.dec()) + '.'] }; }
            if (t === 3) { const f = F(1).sub(P), r = f.mul(v); return { ask: 'Um produto de R$ ' + v + ' teve desconto de ' + p + '%. Qual o preço final (em reais)?', q: '', ans: [r], sol: ['Desconto de ' + p + '%: multiplique por ' + T(f.dec()) + '.', T(v + '\\cdot ' + f.dec() + ' = ' + r.dec()) + '.'] }; }
            if (t === 4) { const f = F(1).add(P), fin = f.mul(v); return { ask: 'Depois de um aumento de ' + p + '%, um produto custa R$ ' + fin.dec().replace('{,}', ',') + '. Quanto custava antes (em reais)?', q: '', ans: [F(v)], sol: ['O aumento foi sobre o preço antigo: novo = antigo ' + T('\\times ' + f.dec()) + '.', 'Então antigo = ' + T(fin.dec() + '\\div ' + f.dec() + ' = ' + v) + '. (Tirar ' + p + '% do preço novo daria errado.)'] }; }
            const part = P.mul(v);
            return { ask: 'Que porcentagem ' + part.dec().replace('{,}', ',') + ' representa de ' + v + '? (responda só o número, sem %)', q: '', ans: [F(p)], sol: ['Divida a parte pelo todo: ' + T('\\frac{' + part.dec() + '}{' + v + '} = ' + pd) + '.', T(pd + ' = ' + p + '\\%') + '.'] };
        },
        fatora() {
            const t = R(1, 5);
            if (t === 1) {
                const k = RNZ(-9, 9);
                return { ask: 'Resolva (separe as raízes com ; ou "e"):', q: 'x^2 ' + (k > 0 ? '- ' + k : '+ ' + (-k)) + 'x = 0', ans: [F(0), F(k)], multi: true,
                    sol: ['Fator comum: ' + T('x(x ' + (k > 0 ? '- ' + k : '+ ' + (-k)) + ') = 0') + '.', 'Produto nulo: ' + T('x = 0') + ' ou ' + T('x = ' + k) + '. (Não divida por x: perderia o zero.)'] };
            }
            if (t === 2) {
                const k = R(1, 10), a = pick([1, 1, 2, 3]);
                return { ask: 'Resolva (separe as raízes com ; ou "e"):', q: (a === 1 ? '' : a) + 'x^2 - ' + a * k * k + ' = 0', ans: [F(k), F(-k)], multi: true,
                    sol: [(a === 1 ? '' : 'Divida por ' + a + ': ') + T('x^2 = ' + k * k) + '.', 'Duas raízes: ' + T('x = \\pm ' + k) + '.'] };
            }
            const p = RNZ(-9, 9), q = RNZ(-9, 9), Sm = -(p + q), P = p * q;
            const poly = 'x^2' + (Sm === 0 ? '' : Sm === 1 ? '+x' : Sm === -1 ? '-x' : (Sm > 0 ? '+' : '') + Sm + 'x') + (P > 0 ? '+' : '') + P;
            const fac = m => '(x' + (-m > 0 ? '+' : '') + (-m) + ')';
            return { ask: 'Resolva (separe as raízes com ; ou "e"):', q: poly + ' = 0', ans: p === q ? [F(p)] : [F(p), F(q)], multi: true, dup: p === q,
                sol: ['Soma das raízes ' + T('= ' + (p + q)) + ' e produto ' + T('= ' + P) + ': os números são ' + T(p + '') + ' e ' + T(q + '') + '.',
                    'Forma fatorada: ' + T(poly + ' = ' + fac(p) + fac(q)) + '.',
                    p === q ? 'Raiz dupla: ' + T('x = ' + p) + '.' : 'Raízes: ' + T('x = ' + p) + ' e ' + T('x = ' + q) + '.'] };
        }
    };
    function sameAnswers(user, ans, multi) {
        if (!user || !user.length) return false;
        if (!multi) return user.length === 1 && user[0].eq(ans[0]);
        const key = l => [...new Set(l.map(f => f.n + '/' + f.d))].sort().join('|');
        return key(user) === key(ans);
    }

    function initTreino(root) {
        const KEY = 'mat.alg.treino.v1';
        const load = () => { try { return Object.assign({ best: 0, streak: 0, right: 0, total: 0 }, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { return { best: 0, streak: 0, right: 0, total: 0 }; } };
        const save = s => { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* sem armazenamento */ } };
        let stats = load(), cur = null, answered = false, tries = 0;

        root.innerHTML =
            '<div class="lab-grid">' +
              '<div class="lab-side" style="min-height:360px;gap:16px">' +
                '<div class="ctl"><label for="tr2-topic">Tema</label><select id="tr2-topic">' + TOPICS.map(t => '<option value="' + t[0] + '">' + t[1] + '</option>').join('') + '</select></div>' +
                '<div class="challenge" style="border-style:solid;border-color:rgba(129,140,248,.4);background:rgba(99,102,241,.06)">' +
                  '<p id="tr2-ask" style="font-weight:700"></p><div id="tr2-q" style="font-size:1.25rem;overflow-x:auto;padding:4px 0 10px"></div>' +
                  '<div class="row"><input class="plain-in" id="tr2-in" style="flex:1;min-width:140px" spellcheck="false" autocomplete="off" aria-label="Sua resposta" placeholder="sua resposta">' +
                  '<button class="btn small primary" id="tr2-check" type="button"><i class="fa-solid fa-check"></i> Conferir</button></div>' +
                  '<div class="verdict" id="tr2-verdict"></div>' +
                  '<div class="row" style="margin-top:10px"><button class="btn small" id="tr2-next" type="button"><i class="fa-solid fa-forward"></i> Próxima</button>' +
                  '<button class="btn small ghost" id="tr2-show" type="button">Ver solução</button></div></div>' +
                '<div class="fn-hint">Aceita inteiros, decimais com vírgula (2,5) e frações (3/4). Enter confere; Enter de novo vai para a próxima.</div>' +
              '</div>' +
              '<div class="lab-side">' +
                '<div class="readout" style="margin-top:0"><div><span>Sequência atual</span><b id="tr2-streak"></b></div><div><span>Recorde</span><b id="tr2-best"></b></div>' +
                  '<div class="wide"><span>Acertos na primeira tentativa</span><b id="tr2-rate"></b></div></div>' +
                '<div class="lab-note" id="tr2-sol" style="flex:1"><strong>Solução passo a passo</strong><p class="muted-p">Responda primeiro. A solução aparece depois de conferir (ou em "Ver solução").</p></div>' +
                '<button class="btn small ghost" id="tr2-reset" type="button"><i class="fa-solid fa-eraser"></i> Zerar estatísticas</button>' +
              '</div>' +
            '</div>';

        const S = k => $('#tr2-' + k, root);
        function renderStats() {
            S('streak').textContent = stats.streak; S('best').textContent = stats.best;
            S('rate').textContent = stats.total ? stats.right + ' de ' + stats.total + ' (' + Math.round(100 * stats.right / stats.total) + '%)' : '—';
        }
        function next() {
            let topic = S('topic').value;
            if (topic === 'misto') topic = pick(TOPICS.slice(1))[0];
            cur = GEN[topic](); cur.topic = topic; answered = false; tries = 0;
            S('ask').textContent = cur.ask;
            S('q').innerHTML = cur.q ? T(cur.q, true) : '';
            S('in').value = ''; S('in').disabled = false;
            S('verdict').className = 'verdict'; S('verdict').textContent = '';
            S('sol').innerHTML = '<strong>Solução passo a passo</strong><p class="muted-p">Responda primeiro. A solução aparece depois de conferir (ou em "Ver solução").</p>';
            S('in').focus({ preventScroll: true });
        }
        function showSol() {
            const ans = cur.ans.map(a => a.d === 1 ? a.tex() : a.tex() + (Number.isInteger(a.val() * 100) ? '\\ (= ' + a.dec() + ')' : '')).join('\\ \\text{e}\\ ');
            S('sol').innerHTML = '<strong>Solução passo a passo</strong><ol style="margin:.6em 0 0;padding-left:1.3em">' + cur.sol.map(s => '<li style="margin:.35em 0">' + s + '</li>').join('') + '</ol>' +
                '<p>Resposta: ' + T(ans) + '</p>';
        }
        function finish(correct) {
            answered = true; S('in').disabled = true;
            stats.total++;
            if (correct && tries === 1) { stats.right++; stats.streak++; stats.best = Math.max(stats.best, stats.streak); }
            else stats.streak = 0;
            save(stats); renderStats(); showSol();
        }
        function check() {
            if (answered) { next(); return; }
            const raw = S('in').value.trim();
            if (!raw) return;
            const user = cur.multi ? parseList(raw) : (parseList(raw) || []).slice(0, 2);
            const V = S('verdict');
            if (!user || !user.length) { V.className = 'verdict no'; V.textContent = 'Não entendi. Use números como 7, −2, 2,5 ou 3/4' + (cur.multi ? ', separados por ;' : '') + '.'; return; }
            tries++;
            if (sameAnswers(user, cur.ans, cur.multi)) {
                V.className = 'verdict ok';
                V.innerHTML = '<i class="fa-solid fa-circle-check"></i> ' + (tries === 1 ? pick(['Certo!', 'Isso mesmo!', 'Acertou!', 'Perfeito!']) : 'Certo, na ' + tries + 'ª tentativa.');
                finish(true);
            } else if (tries < 2) {
                let tipText = 'Ainda não. Tente mais uma vez';
                if (cur.multi && user.length < cur.ans.length) tipText = 'Faltou raiz: esta equação tem ' + cur.ans.length + '. Tente de novo';
                else if (!cur.multi && user.length === 1 && user[0].neg().eq(cur.ans[0])) tipText = 'Quase: confira o sinal';
                else if (!cur.multi && user.length === 1 && Math.abs(user[0].val() - cur.ans[0].val()) < 1e-9) tipText = 'Valor certo, forma diferente';
                V.className = 'verdict no'; V.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> ' + tipText + '.';
                S('in').select();
            } else {
                V.className = 'verdict no'; V.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Não foi desta vez. Veja a solução e tente a próxima.';
                finish(false);
            }
        }

        S('check').addEventListener('click', check);
        S('in').addEventListener('keydown', e => { if (e.key === 'Enter') check(); });
        document.addEventListener('keydown', e => { if (e.key === 'Enter' && answered && document.activeElement === document.body && root.closest('.lab-panel.active')) next(); });
        S('next').addEventListener('click', () => { if (!answered && tries > 0) { stats.total++; stats.streak = 0; save(stats); renderStats(); } next(); });
        S('show').addEventListener('click', () => { if (!answered) { V0(); finish(false); } });
        function V0() { S('verdict').className = 'verdict no'; S('verdict').textContent = 'Solução revelada: esta não conta como acerto.'; }
        S('topic').addEventListener('change', next);
        S('reset').addEventListener('click', () => { stats = { best: 0, streak: 0, right: 0, total: 0 }; save(stats); renderStats(); });
        renderStats();
        next();
        return () => {};
    }

    return { init: { balanca: initBalanca, areas: initAreas, treino: initTreino }, Fr, F, parseNum, parseList, parseEquation, parseTerm, GEN, sameAnswers, linTex };
})();
