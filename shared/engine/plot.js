/* Motor de gráficos e expressões compartilhado (Matemática, Física, ...).
   Expõe MATH.plot: Plot (canvas), COLORS, fmt (pt-BR), parseExpr/compile/toTex
   (parser seguro, sem eval), numDeriv, simpson, makeCustom, customBox, wireCustom. */
window.MATH = window.MATH || {};

MATH.plot = (function () {
    'use strict';

    const T = (s, d) => MATH.md.tex(s, d);
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
    /* opts.y = true aceita também a variável y (funções de duas variáveis) */
    function parseExpr(src, opts) {
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
                    const names = Object.keys(FUNCS).concat(['pi', 'x', 'e'], opts && opts.y ? ['y'] : []).sort((a, b) => b.length - a.length);
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
    /* compila para f(x) ou, se a expressão usar y, f(x, y) */
    function compile(n) {
        switch (n.op) {
            case 'num': { const v = n.v; return () => v; }
            case 'x': return x => x;
            case 'y': return (x, y) => y;
            case 'pi': return () => Math.PI;
            case 'e': return () => Math.E;
            case 'par': return compile(n.a);
            case 'neg': { const a = compile(n.a); return (x, y) => -a(x, y); }
            case 'fn': { const f = FUNCS[n.f][0], a = compile(n.a); return (x, y) => f(a(x, y)); }
        }
        const a = compile(n.a), b = compile(n.b);
        if (n.op === '+') return (x, y) => a(x, y) + b(x, y);
        if (n.op === '-') return (x, y) => a(x, y) - b(x, y);
        if (n.op === '*') return (x, y) => a(x, y) * b(x, y);
        if (n.op === '/') return (x, y) => a(x, y) / b(x, y);
        return (x, y) => {
            const u = a(x, y), v = b(x, y);
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
            case 'y': return 'y';
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
    function wireCustom(root, id, selEl, onFn, builtins) {
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
            if (on) apply(); else onFn(builtins[selEl.value]);
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

    /* Encontra os zeros e polos de f em [a, b] por varredura + bissecção. */
    function signChanges(f, a, b, n) {
        n = n || 4000;
        const pts = [];
        let px = a, py = f(a);
        for (let i = 1; i <= n; i++) {
            const x = a + (b - a) * i / n, y = f(x);
            if (y === 0) { pts.push({ x, kind: 'zero' }); }
            else if (Number.isFinite(py) && Number.isFinite(y) && py !== 0 && (py < 0) !== (y < 0)) {
                let lo = px, hi = x, flo = py;
                for (let k = 0; k < 80; k++) { const m = (lo + hi) / 2, fm = f(m); if (!Number.isFinite(fm)) break; if ((fm < 0) === (flo < 0)) { lo = m; flo = fm; } else hi = m; }
                const r = (lo + hi) / 2, fr = Math.abs(f(r));
                pts.push({ x: r, kind: Number.isFinite(fr) && fr < 1e-6 ? 'zero' : 'pole' });
            }
            px = x; py = y;
        }
        return pts;
    }

    return { T, COLORS, Plot, niceStep, fmt, parseExpr, compile, toTex, numDeriv, simpson, makeCustom, customBox, wireCustom, signChanges };
})();
