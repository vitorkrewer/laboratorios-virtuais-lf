/* Simuladores: Limites, Derivada (secante → tangente) e Integral (somas de Riemann). */
window.CALC = window.CALC || {};

CALC.labs = (function () {
    'use strict';

    const T = (s, d) => CALC.md.tex(s, d);
    const $ = (s, r) => (r || document).querySelector(s);

    /* ---------- formatação (pt-BR: vírgula decimal) ---------- */
    const SUP = { '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
    function fmt(v, digits) {
        digits = digits || 6;
        if (v === null || v === undefined || Number.isNaN(v)) return '—';
        if (!Number.isFinite(v)) return v > 0 ? '+∞' : '−∞';
        if (v === 0) return '0';
        const a = Math.abs(v);
        if (a >= 1e6 || a < 1e-4) {
            const [m, e] = v.toExponential(Math.min(3, digits - 1)).split('e');
            return String(+m).replace('-', '−').replace('.', ',') + '·10' + String(+e).split('').map(c => SUP[c] || c).join('');
        }
        return String(+v.toPrecision(digits)).replace('-', '−').replace('.', ',');
    }

    /* ---------- parser seguro de expressões (sem eval) ----------
       Aceita: + − * / ^, parênteses, multiplicação implícita (2x, 3(x+1), x sen x),
       x, pi, e, sen/sin, cos, tg/tan, sec, ln, log (base 10), exp, sqrt/raiz, abs,
       arcsen/asin, arccos/acos, arctg/atan. Vírgula ou ponto como decimal. */
    const FUNCS = {
        sin: [Math.sin, '\\sin'], sen: [Math.sin, '\\sin'], cos: [Math.cos, '\\cos'],
        tan: [Math.tan, '\\tan'], tg: [Math.tan, '\\tan'], sec: [x => 1 / Math.cos(x), '\\sec'],
        ln: [Math.log, '\\ln'], log: [Math.log10, '\\log'], exp: [Math.exp, 'exp'],
        sqrt: [Math.sqrt, 'sqrt'], raiz: [Math.sqrt, 'sqrt'], abs: [Math.abs, 'abs'],
        asin: [Math.asin, '\\arcsin'], arcsen: [Math.asin, '\\arcsin'], arcsin: [Math.asin, '\\arcsin'],
        acos: [Math.acos, '\\arccos'], arccos: [Math.acos, '\\arccos'],
        atan: [Math.atan, '\\arctan'], arctg: [Math.atan, '\\arctan'], arctan: [Math.atan, '\\arctan']
    };
    function parseExpr(src) {
        const toks = [];
        const s = src.replace(/\s+/g, ' ').replace(/[·×]/g, '*').replace(/[−–]/g, '-').replace(/²/g, '^2').replace(/³/g, '^3').replace(/π/g, 'pi').replace(/√/g, 'sqrt').toLowerCase();
        let i = 0;
        while (i < s.length) {
            const c = s[i];
            if (c === ' ') { i++; continue; }
            let m;
            if ((m = /^\d+(?:[.,]\d+)?|^[.,]\d+/.exec(s.slice(i)))) { toks.push({ t: 'num', v: parseFloat(m[0].replace(',', '.')) }); i += m[0].length; continue; }
            if ((m = /^[a-z]+/.exec(s.slice(i)))) {
                let w = m[0];
                // separa palavras coladas: "xsenx", "2pix" → reconhece prefixos conhecidos
                while (w.length) {
                    const names = Object.keys(FUNCS).concat(['pi', 'x', 'e']).sort((a, b) => b.length - a.length);
                    const n = names.find(k => w.startsWith(k));
                    if (!n) throw new Error('Nome desconhecido: "' + w + '"');
                    toks.push(FUNCS[n] ? { t: 'fn', v: n } : { t: 'id', v: n });
                    w = w.slice(n.length);
                }
                i += m[0].length; continue;
            }
            if ('+-*/^()|'.includes(c)) { toks.push({ t: c }); i++; continue; }
            throw new Error('Caractere inválido: "' + c + '"');
        }
        let p = 0;
        const peek = () => toks[p], eat = t => { if (!toks[p] || toks[p].t !== t) throw new Error('Esperado "' + t + '"'); p++; };
        const startsAtom = k => k && (k.t === 'num' || k.t === 'id' || k.t === 'fn' || k.t === '(');
        function expr() {
            let n = term();
            while (peek() && (peek().t === '+' || peek().t === '-')) { const op = toks[p++].t; n = { op, a: n, b: term() }; }
            return n;
        }
        function term() {
            let n = unary();
            for (;;) {
                const k = peek();
                if (k && (k.t === '*' || k.t === '/')) { p++; n = { op: k.t, a: n, b: unary() }; }
                else if (startsAtom(k)) n = { op: '*', a: n, b: power(), imp: true };
                else return n;
            }
        }
        function unary() {
            const k = peek();
            if (k && k.t === '-') { p++; return { op: 'neg', a: unary() }; }
            if (k && k.t === '+') { p++; return unary(); }
            return power();
        }
        function power() {
            const base = atom();
            if (peek() && peek().t === '^') { p++; return { op: '^', a: base, b: unary() }; }
            return base;
        }
        function atom() {
            const k = toks[p++];
            if (!k) throw new Error('Expressão incompleta');
            if (k.t === 'num') return { op: 'num', v: k.v };
            if (k.t === 'id') return { op: k.v };
            if (k.t === '(') { const n = expr(); eat(')'); return { op: 'par', a: n }; }
            if (k.t === '|') { const n = expr(); eat('|'); return { op: 'fn', f: 'abs', a: n }; }
            if (k.t === 'fn') {
                let arg;
                if (peek() && peek().t === '(') { p++; arg = expr(); eat(')'); arg = { op: 'par', a: arg }; }
                else arg = power();
                const node = { op: 'fn', f: k.v, a: arg };
                return node;
            }
            throw new Error('Símbolo inesperado: "' + k.t + '"');
        }
        const tree = expr();
        if (p < toks.length) throw new Error('Símbolo inesperado: "' + (toks[p].v || toks[p].t) + '"');
        return tree;
    }
    function compile(n) {
        switch (n.op) {
            case 'num': { const v = n.v; return () => v; }
            case 'x': return x => x;
            case 'pi': return () => Math.PI;
            case 'e': return () => Math.E;
            case 'par': return compile(n.a);
            case 'neg': { const a = compile(n.a); return x => -a(x); }
            case 'fn': { const f = FUNCS[n.f][0], a = compile(n.a); return x => f(a(x)); }
        }
        const a = compile(n.a), b = compile(n.b);
        if (n.op === '+') return x => a(x) + b(x);
        if (n.op === '-') return x => a(x) - b(x);
        if (n.op === '*') return x => a(x) * b(x);
        if (n.op === '/') return x => a(x) / b(x);
        return x => {
            const u = a(x), v = b(x);
            if (u < 0 && !Number.isInteger(v)) { // raízes ímpares de negativos: x^(1/3)
                const inv = 1 / v, k = Math.round(inv);
                if (Math.abs(inv - k) < 1e-9 && k % 2) return -Math.pow(-u, v);
            }
            return Math.pow(u, v);
        };
    }
    function toTex(n) {
        switch (n.op) {
            case 'num': return String(n.v).replace('.', '{,}');
            case 'x': return 'x';
            case 'pi': return '\\pi';
            case 'e': return 'e';
            case 'par': return '\\left(' + toTex(n.a) + '\\right)';
            case 'neg': return '-' + toTex(n.a);
            case 'fn': {
                const t = FUNCS[n.f][1], inner = n.a.op === 'par' ? toTex(n.a.a) : toTex(n.a);
                if (t === 'sqrt') return '\\sqrt{' + inner + '}';
                if (t === 'abs') return '\\left|' + inner + '\\right|';
                if (t === 'exp') return 'e^{' + inner + '}';
                return t + '\\left(' + inner + '\\right)';
            }
            case '+': return toTex(n.a) + '+' + toTex(n.b);
            case '-': return toTex(n.a) + '-' + toTex(n.b);
            case '*': return toTex(n.a) + (n.imp ? '\\,' : ' \\cdot ') + toTex(n.b);
            case '/': return '\\dfrac{' + (n.a.op === 'par' ? toTex(n.a.a) : toTex(n.a)) + '}{' + (n.b.op === 'par' ? toTex(n.b.a) : toTex(n.b)) + '}';
            case '^': return '{' + toTex(n.a) + '}^{' + (n.b.op === 'par' ? toTex(n.b.a) : toTex(n.b)).replace(/\\dfrac/g, '\\frac') + '}';
        }
        return '?';
    }
    function numDeriv(f) {
        return x => { const h = 1e-5 * Math.max(1, Math.abs(x)); return (f(x + h) - f(x - h)) / (2 * h); };
    }
    function simpson(f, a, b, n) {
        n = n || 2000; if (n % 2) n++;
        const h = (b - a) / n; let s = f(a) + f(b);
        for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * f(a + i * h);
        return s * h / 3;
    }
    /* Monta um objeto de função a partir do texto digitado. */
    function makeCustom(src) {
        const tree = parseExpr(src);
        const f = compile(tree);
        const xs = [], ys = [];
        for (let i = 0; i <= 400; i++) { const x = -5 + i / 40; const y = f(x); if (Number.isFinite(y)) { xs.push(x); ys.push(y); } }
        if (ys.length < 10) throw new Error('A função não está definida em [−5, 5]');
        const sorted = ys.slice().sort((a, b) => a - b);
        let lo = sorted[Math.floor(sorted.length * 0.05)], hi = sorted[Math.floor(sorted.length * 0.95)];
        if (hi - lo < 1e-6) { lo -= 1; hi += 1; }
        const pad = (hi - lo) * 0.2;
        return {
            label: src, tex: toTex(tree), custom: true, f, df: numDeriv(f), F: null,
            view: [-5, 5, Math.min(lo - pad, -0.5), Math.max(hi + pad, 0.5)], x0: 1, dom: [-5, 5], ab: [0, 2]
        };
    }
    function customBox(id) {
        return '<div class="custom-fn" id="' + id + '-box" hidden><input id="' + id + '-in" type="text" spellcheck="false" autocomplete="off" value="x^2 sen(x)" aria-label="Digite f(x)">' +
            '<button class="btn small" id="' + id + '-go" type="button">Plotar</button></div>' +
            '<div class="fn-hint" id="' + id + '-hint" hidden>Ex.: <code>x^3 - 2x</code>, <code>sen(2x)</code>, <code>e^(-x^2)</code>, <code>ln(x)</code>, <code>raiz(x)</code>, <code>|x|</code></div>';
    }
    /* Liga o select + caixa de texto. onFn recebe o objeto de função. */
    function wireCustom(root, id, selEl, onFn) {
        const box = $('#' + id + '-box', root), inp = $('#' + id + '-in', root), hint = $('#' + id + '-hint', root);
        function apply() {
            try {
                const fn = makeCustom(inp.value);
                inp.classList.remove('bad'); hint.classList.remove('err');
                hint.innerHTML = 'Entendido como ' + T('f(x)=' + fn.tex);
                onFn(fn);
            } catch (e) {
                inp.classList.add('bad'); hint.classList.add('err'); hint.textContent = e.message;
            }
        }
        selEl.addEventListener('change', () => {
            const on = selEl.value === 'custom';
            box.hidden = !on; hint.hidden = !on;
            if (on) apply(); else onFn(FN[selEl.value]);
        });
        $('#' + id + '-go', root).addEventListener('click', apply);
        inp.addEventListener('keydown', e => { if (e.key === 'Enter') apply(); });
    }

    /* ---------- utilitário de gráfico em canvas ---------- */
    const COLORS = {
        bg: '#0c1220', grid: 'rgba(148,163,184,.12)', axis: 'rgba(203,213,225,.55)',
        label: 'rgba(148,163,184,.8)', curve: '#38bdf8', secant: '#fbbf24', tangent: '#34d399',
        pos: 'rgba(56,189,248,.28)', neg: 'rgba(244,114,182,.30)', stroke: 'rgba(56,189,248,.8)',
        strokeNeg: 'rgba(244,114,182,.85)', point: '#f8fafc', guide: 'rgba(167,139,250,.9)'
    };

    function niceStep(range) {
        const raw = range / 8;
        const p = Math.pow(10, Math.floor(Math.log10(raw)));
        const m = raw / p;
        return (m < 1.5 ? 1 : m < 3.5 ? 2 : m < 7.5 ? 5 : 10) * p;
    }

    class Plot {
        constructor(canvas) {
            this.cv = canvas;
            this.ctx = canvas.getContext('2d');
            this.view = [-5, 5, -5, 5];
            this.w = 0; this.h = 0;
            this.redraw = null;
            if (window.ResizeObserver) {
                new ResizeObserver(() => { if (this.fit() && this.redraw) this.redraw(); }).observe(canvas);
            }
        }
        fit() {
            const r = this.cv.getBoundingClientRect();
            const w = Math.round(r.width), h = Math.round(r.height);
            if (!w || !h) return false;
            const dpr = window.devicePixelRatio || 1;
            if (this.cv.width !== w * dpr || this.cv.height !== h * dpr) {
                this.cv.width = w * dpr; this.cv.height = h * dpr;
            }
            this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            this.w = w; this.h = h;
            return true;
        }
        X(x) { return (x - this.view[0]) / (this.view[1] - this.view[0]) * this.w; }
        Y(y) { return this.h - (y - this.view[2]) / (this.view[3] - this.view[2]) * this.h; }
        clear() {
            const c = this.ctx;
            c.clearRect(0, 0, this.w, this.h);
            c.fillStyle = COLORS.bg; c.fillRect(0, 0, this.w, this.h);
        }
        grid() {
            const c = this.ctx, [x0, x1, y0, y1] = this.view;
            const sx = niceStep(x1 - x0), sy = niceStep(y1 - y0);
            c.lineWidth = 1; c.font = '11px "JetBrains Mono", monospace';
            c.fillStyle = COLORS.label;
            const axisY = Math.min(Math.max(this.Y(0), 12), this.h - 18);
            const axisX = Math.min(Math.max(this.X(0), 4), this.w - 40);
            for (let x = Math.ceil(x0 / sx) * sx; x <= x1 + 1e-9; x += sx) {
                const px = Math.round(this.X(x)) + .5;
                c.strokeStyle = COLORS.grid; c.beginPath(); c.moveTo(px, 0); c.lineTo(px, this.h); c.stroke();
                if (Math.abs(x) > sx / 1000 && px > 14 && px < this.w - 14) { c.textAlign = 'center'; c.fillText(String(+x.toPrecision(5)).replace('.', ','), px, axisY + 13); }
            }
            for (let y = Math.ceil(y0 / sy) * sy; y <= y1 + 1e-9; y += sy) {
                const py = Math.round(this.Y(y)) + .5;
                c.strokeStyle = COLORS.grid; c.beginPath(); c.moveTo(0, py); c.lineTo(this.w, py); c.stroke();
                if (Math.abs(y) > sy / 1000 && py > 14 && py < this.h - 22) { c.textAlign = 'left'; c.fillText(String(+y.toPrecision(5)).replace('.', ','), axisX + 5, py - 3); }
            }
            c.strokeStyle = COLORS.axis; c.lineWidth = 1.4;
            c.beginPath(); c.moveTo(0, this.Y(0)); c.lineTo(this.w, this.Y(0)); c.stroke();
            c.beginPath(); c.moveTo(this.X(0), 0); c.lineTo(this.X(0), this.h); c.stroke();
        }
        curve(fn, color, width, dash) {
            const c = this.ctx, N = 900, [a, b] = this.view;
            c.save();
            c.strokeStyle = color; c.lineWidth = width || 2.4; c.setLineDash(dash || []); c.lineJoin = 'round';
            c.beginPath();
            let prevPy = null;
            for (let i = 0; i <= N; i++) {
                const x = a + (b - a) * i / N;
                const y = fn(x);
                if (!Number.isFinite(y) || Math.abs(y) > 1e7) { prevPy = null; continue; }
                const px = this.X(x), py = this.Y(y);
                if (prevPy === null || Math.abs(py - prevPy) > this.h * 0.35) c.moveTo(px, py); else c.lineTo(px, py);
                prevPy = py;
            }
            c.stroke(); c.restore();
        }
        line(x0, y0, x1, y1, color, width, dash) {
            const c = this.ctx;
            c.save(); c.strokeStyle = color; c.lineWidth = width || 2; c.setLineDash(dash || []);
            c.beginPath(); c.moveTo(this.X(x0), this.Y(y0)); c.lineTo(this.X(x1), this.Y(y1)); c.stroke(); c.restore();
        }
        /* reta y = y0 + m (x − x0) atravessando toda a janela */
        slopeLine(x0, y0, m, color, width, dash) {
            const [a, b] = this.view;
            this.line(a, y0 + m * (a - x0), b, y0 + m * (b - x0), color, width, dash);
        }
        dot(x, y, color, r, hollow) {
            const c = this.ctx;
            c.save(); c.beginPath(); c.arc(this.X(x), this.Y(y), r || 5, 0, Math.PI * 2);
            if (hollow) { c.fillStyle = COLORS.bg; c.fill(); c.strokeStyle = color; c.lineWidth = 2.2; c.stroke(); }
            else { c.fillStyle = color; c.fill(); c.strokeStyle = 'rgba(0,0,0,.5)'; c.lineWidth = 1; c.stroke(); }
            c.restore();
        }
    }

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

        wireCustom(root, 'der-c', selFn, f => { setFn(f); draw(); });
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

        wireCustom(root, 'int-c', selFn, f => { setFn(f); draw(); });
        selM.addEventListener('change', draw);
        [sa, sb, sn].forEach(e => e.addEventListener('input', draw));
        setFn('x2');
        return draw;
    }

    /* ---------- controle ---------- */
    const draws = {};
    const initialized = {};

    function show(id) {
        id = ['limites', 'derivada', 'integral'].includes(id) ? id : 'limites';
        document.querySelectorAll('#labTabs button').forEach(b => { b.classList.toggle('active', b.dataset.lab === id); b.setAttribute('aria-selected', String(b.dataset.lab === id)); });
        document.querySelectorAll('.lab-panel').forEach(p => p.classList.toggle('active', p.id === 'lab-' + id));
        if (!initialized[id]) {
            const root = document.getElementById('lab-' + id);
            draws[id] = id === 'limites' ? initLimites(root) : id === 'derivada' ? initDerivada(root) : initIntegral(root);
            initialized[id] = true;
        }
        requestAnimationFrame(() => draws[id]());
    }

    return { show, parseExpr, compile, toTex, makeCustom, fmt };
})();
