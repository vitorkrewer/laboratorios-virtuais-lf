/* Frações exatas compartilhado (Matemática, Física, ...) (usado pelos simuladores de Álgebra e Álgebra Linear).
   Expõe MATH.frac: Fr, F, gcd, lcm, fromNumber, parseNum. */
window.MATH = window.MATH || {};

MATH.frac = (function () {
    'use strict';

    function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { const t = a % b; a = b; b = t; } return a || 1; }
    function lcm(a, b) { return Math.abs(a * b) / gcd(a, b); }

    class Fr {
        constructor(n, d) {
            d = d === undefined ? 1 : d;
            if (d === 0) throw new Error('divisão por zero');
            if (!Number.isSafeInteger(n) || !Number.isSafeInteger(d)) throw new Error('número grande demais');
            if (d < 0) { n = -n; d = -d; }
            const g = gcd(n, d);
            this.n = n / g || 0; this.d = d / g;
        }
        add(o) { o = F(o); return new Fr(this.n * o.d + o.n * this.d, this.d * o.d); }
        sub(o) { o = F(o); return new Fr(this.n * o.d - o.n * this.d, this.d * o.d); }
        mul(o) { o = F(o); return new Fr(this.n * o.n, this.d * o.d); }
        div(o) { o = F(o); return new Fr(this.n * o.d, this.d * o.n); }
        neg() { return new Fr(-this.n, this.d); }
        inv() { return new Fr(this.d, this.n); }
        pow(k) { let r = F(1); for (let i = 0; i < Math.abs(k); i++) r = r.mul(this); return k < 0 ? F(1).div(r) : r; }
        isZero() { return this.n === 0; }
        isInt() { return this.d === 1; }
        sign() { return Math.sign(this.n); }
        eq(o) { o = F(o); return this.n === o.n && this.d === o.d; }
        val() { return this.n / this.d; }
        /* TeX: \frac{a}{b}; ptex: entre parênteses se negativo */
        tex() { return this.d === 1 ? String(this.n) : (this.n < 0 ? '-' : '') + '\\frac{' + Math.abs(this.n) + '}{' + this.d + '}'; }
        ptex() { return this.n < 0 ? '\\left(' + this.tex() + '\\right)' : this.tex(); }
        /* texto simples com sinal tipográfico: −3/4 */
        txt() { return (this.n < 0 ? '−' : '') + Math.abs(this.n) + (this.d === 1 ? '' : '/' + this.d); }
        /* decimal em TeX com vírgula: 2{,}5 */
        dec() { return String(+this.val().toFixed(4)).replace('.', '{,}'); }
    }
    function F(n, d) { return n instanceof Fr ? n : new Fr(n, d); }

    function fromNumber(x, maxDen) {
        if (!Number.isFinite(x)) return null;
        for (let d = 1; d <= (maxDen || 1000); d++) { const n = Math.round(x * d); if (Math.abs(n / d - x) < 1e-9) return F(n, d); }
        return null;
    }
    /* "3", "-2,5", "3/4", "−1/2", "R$ 12,50", "15%" → Fr (ou null) */
    function parseNum(s) {
        s = String(s).replace(/[−–]/g, '-').replace(/R\$|%|\s/gi, '');
        let m = s.match(/^([-+]?)(\d+)\/(\d+)$/);
        if (m) return +m[3] === 0 ? null : F((m[1] === '-' ? -1 : 1) * +m[2], +m[3]);
        m = s.match(/^([-+]?)(\d*)[.,]?(\d*)$/);
        if (m && (m[2] || m[3]) && (m[2] + m[3]).length <= 12) {
            const dec = m[3] || '', den = Math.pow(10, dec.length);
            return F((m[1] === '-' ? -1 : 1) * (+(m[2] || 0) * den + +(dec || 0)), den);
        }
        return null;
    }

    return { Fr, F, gcd, lcm, fromNumber, parseNum };
})();
