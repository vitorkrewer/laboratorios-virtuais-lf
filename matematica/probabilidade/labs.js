/* Probabilidade e Estatística: simuladores Estatística descritiva, Binomial e Poisson, Normal e TCL, Bayes. */
window.MATH = window.MATH || {};

MATH.labs = (function () {
    'use strict';

    const { T, Plot, fmt } = MATH.plot;
    const $ = (s, r) => (r || document).querySelector(s);

    /* ---------- utilidades numéricas ---------- */
    const nf = (x, d) => { if (!Number.isFinite(x)) return '—'; const v = Math.abs(x) < 5e-12 ? 0 : x; return String(+v.toFixed(d === undefined ? 4 : d)).replace('.', ','); };
    const pct = x => nf(100 * x, x < 0.001 ? 4 : 2) + '%';
    function erf(x) { /* Abramowitz-Stegun 7.1.26, erro < 1,5e-7 */
        const s = Math.sign(x), a = Math.abs(x), t = 1 / (1 + 0.3275911 * a);
        const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-a * a);
        return s * y;
    }
    const Phi = z => 0.5 * (1 + erf(z / Math.SQRT2));
    function invPhi(p) { let lo = -10, hi = 10; for (let i = 0; i < 80; i++) { const m = (lo + hi) / 2; if (Phi(m) < p) lo = m; else hi = m; } return (lo + hi) / 2; }
    const dnorm = (x, mu, s) => Math.exp(-((x - mu) ** 2) / (2 * s * s)) / (s * Math.sqrt(2 * Math.PI));
    function lgamma(n) { let s = 0; for (let i = 2; i <= n; i++) s += Math.log(i); return s; } /* log n! */
    function binomPMF(n, p) {
        const out = [];
        for (let k = 0; k <= n; k++) {
            if (p === 0) out.push(k === 0 ? 1 : 0);
            else if (p === 1) out.push(k === n ? 1 : 0);
            else out.push(Math.exp(lgamma(n) - lgamma(k) - lgamma(n - k) + k * Math.log(p) + (n - k) * Math.log(1 - p)));
        }
        return out;
    }
    function poisPMF(l, K) { const out = []; for (let k = 0; k <= K; k++) out.push(Math.exp(-l + k * Math.log(l) - lgamma(k))); return out; }
    function randn() { let u = 0, v = 0; while (!u) u = Math.random(); while (!v) v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }

    /* estatísticas descritivas (quartis: mediana das metades, sem a mediana quando n é ímpar) */
    function median(sorted) { const n = sorted.length; if (!n) return NaN; return n % 2 ? sorted[(n - 1) / 2] : (sorted[n / 2 - 1] + sorted[n / 2]) / 2; }
    function describe(data) {
        const xs = data.slice().sort((a, b) => a - b), n = xs.length;
        if (!n) return null;
        const mean = xs.reduce((s, x) => s + x, 0) / n;
        const ss = xs.reduce((s, x) => s + (x - mean) ** 2, 0);
        const half = Math.floor(n / 2), lower = xs.slice(0, half), upper = xs.slice(n % 2 ? half + 1 : half);
        const q1 = n > 1 ? median(lower) : xs[0], q3 = n > 1 ? median(upper) : xs[0], iqr = q3 - q1;
        const counts = new Map(); xs.forEach(x => counts.set(x, (counts.get(x) || 0) + 1));
        const maxc = Math.max(...counts.values());
        const modes = maxc > 1 ? [...counts.entries()].filter(e => e[1] === maxc).map(e => e[0]) : [];
        const lo = q1 - 1.5 * iqr, hi = q3 + 1.5 * iqr;
        return { xs, n, mean, median: median(xs), modes, min: xs[0], max: xs[n - 1], var: n > 1 ? ss / (n - 1) : 0, sd: n > 1 ? Math.sqrt(ss / (n - 1)) : 0, q1, q3, iqr, lo, hi,
            out: xs.filter(x => x < lo || x > hi), wmin: xs.find(x => x >= lo), wmax: [...xs].reverse().find(x => x <= hi) };
    }

    /* =========================================================
       ESTATÍSTICA DESCRITIVA
       ========================================================= */
    const DPRESETS = {
        sal: { label: 'Salários (mil R$)', data: '1,8 2,1 2,3 2,4 2,5 2,7 2,8 3 3,1 3,3 3,5 3,8 4 4,2 4,6 5 5,5 6,2 7,5 9 12 18' },
        alt: { label: 'Alturas (cm)', data: '158 161 163 164 165 166 167 167 168 169 170 170 171 171 172 173 174 175 176 177 179 181 184' },
        notas: { label: 'Notas de uma prova fácil', data: '3,5 5 6 6,5 7 7,5 7,5 8 8 8,5 8,5 8,5 9 9 9 9,5 9,5 10 10' },
        bim: { label: 'Bimodal (dois grupos)', data: '52 54 55 56 57 58 58 59 60 61 78 79 80 81 81 82 83 84 85 87' }
    };
    function initDescritiva(root) {
        root.innerHTML =
            '<div class="lab-grid">' +
              '<div class="lab-stage"><canvas id="ds-cv"></canvas></div>' +
              '<div class="lab-side">' +
                '<div class="ctl"><label for="ds-in">Dados (separe por espaço; vírgula decimal)</label><textarea id="ds-in" class="plain-in" rows="3" spellcheck="false" style="resize:vertical;line-height:1.5"></textarea>' +
                  '<div class="fn-hint" id="ds-hint"></div></div>' +
                '<div class="presets" id="ds-pre">' + Object.keys(DPRESETS).map(k => '<button type="button" data-k="' + k + '">' + DPRESETS[k].label + '</button>').join('') + '<button type="button" data-k="rand">60 valores aleatórios (normal)</button></div>' +
                '<div style="display:flex;gap:6px;flex-wrap:wrap"><button class="btn small" id="ds-ext" type="button"><i class="fa-solid fa-arrow-up-right-dots"></i> Adicionar valor extremo</button><button class="btn small ghost" id="ds-pop" type="button">Remover o último</button></div>' +
                '<div class="ctl"><label for="ds-bins">Classes do histograma: <b id="ds-bins-v"></b></label><input id="ds-bins" type="range" min="2" max="20" step="1" value="6"></div>' +
                '<div class="readout" id="ds-out" style="margin-top:0"></div>' +
              '</div>' +
            '</div>' +
            '<div class="lab-under"><div class="lab-note"><strong>Leitura.</strong> Linha <b style="color:#fbbf24">amarela</b>: média. Linha <b style="color:#34d399">verde</b>: mediana. Embaixo, o boxplot com ' + T('Q_1') + ', mediana e ' + T('Q_3') + '; pontos rosa são valores atípicos (além de ' + T('1{,}5 \\cdot AIQ') + ').</div>' +
              '<div class="lab-note"><strong>Experimente.</strong> Carregue "Salários" e clique em "Adicionar valor extremo" algumas vezes: a média dispara, a mediana quase não se move. No "Bimodal", média e mediana caem num vale onde quase não há dados: um resumo de um número só engana. Mude o número de classes e veja como a forma do histograma depende dessa escolha.</div></div>';

        const S = k => $('#ds-' + k, root);
        const plot = new Plot(S('cv'));
        let data = [], D = null, binsTouched = false;

        function parse(text) {
            const toks = String(text).replace(/[−–]/g, '-').split(/[\s;]+/).map(t => t.replace(/,$/, '')).filter(Boolean);
            const vals = toks.map(t => Number(t.replace(',', '.')));
            return { vals: vals.filter(Number.isFinite), bad: vals.filter(v => !Number.isFinite(v)).length };
        }
        function load(text) {
            const r = parse(text);
            data = r.vals;
            S('hint').className = r.bad ? 'fn-hint err' : 'fn-hint';
            S('hint').textContent = r.bad ? r.bad + ' entrada(s) ignorada(s) por não serem números.' : data.length + ' valores.';
            if (!binsTouched && data.length) S('bins').value = String(Math.min(20, Math.max(2, Math.ceil(1 + Math.log2(data.length))))); /* regra de Sturges */
            update();
        }
        function syncText() { S('in').value = data.map(x => String(+x.toFixed(3)).replace('.', ',')).join(' '); }
        function update() {
            S('bins-v').textContent = S('bins').value;
            D = describe(data);
            if (!D) { S('out').innerHTML = '<div class="wide"><span>Situação</span><b>Sem dados.</b></div>'; draw(); return; }
            const cell = (lab, val, wide) => '<div' + (wide ? ' class="wide"' : '') + '><span>' + lab + '</span><b>' + val + '</b></div>';
            S('out').innerHTML =
                cell(T('n'), D.n) + cell('Média ' + T('\\bar x'), nf(D.mean, 3)) +
                cell('Mediana', nf(D.median, 3)) + cell('Moda', D.modes.length ? (D.modes.length > 3 ? D.modes.length + ' valores' : D.modes.map(m => nf(m, 3)).join('; ')) : 'não há') +
                cell('Desvio padrão ' + T('s'), nf(D.sd, 3)) + cell('Variância ' + T('s^2'), nf(D.var, 3)) +
                cell(T('Q_1') + ' · ' + T('Q_3'), nf(D.q1, 3) + ' · ' + nf(D.q3, 3)) + cell('AIQ · amplitude', nf(D.iqr, 3) + ' · ' + nf(D.max - D.min, 3)) +
                cell('Coef. de variação', D.mean ? pct(D.sd / Math.abs(D.mean)) : '—') + cell('Atípicos', D.out.length ? D.out.map(x => nf(x, 2)).join('; ') : 'nenhum') +
                cell('Forma', D.n < 3 ? '—' : (Math.abs(D.mean - D.median) < 0.1 * (D.sd || 1) ? 'aproximadamente simétrica' : D.mean > D.median ? 'assimétrica à direita (média > mediana)' : 'assimétrica à esquerda (média < mediana)'), true);
            draw();
        }
        function draw() {
            if (!plot.fit()) return;
            const c = plot.ctx, W = plot.w, H = plot.h;
            c.fillStyle = '#0c1220'; c.fillRect(0, 0, W, H);
            if (!D) return;
            const padL = 46, padR = 18, top = 18, boxH = 70, histB = H - boxH - 40;
            let lo = D.min, hi = D.max; if (hi === lo) { lo -= 1; hi += 1; }
            const k = +S('bins').value, w = (hi - lo) / k;
            const counts = new Array(k).fill(0); D.xs.forEach(x => { counts[Math.min(k - 1, Math.floor((x - lo) / w))]++; });
            const maxC = Math.max(...counts), X = x => padL + (x - lo) / (hi - lo) * (W - padL - padR), Yh = v => histB - v / maxC * (histB - top);
            /* eixos e marcas */
            c.strokeStyle = 'rgba(148,163,184,.25)'; c.lineWidth = 1; c.font = '11px "JetBrains Mono", monospace'; c.fillStyle = '#94a3b8';
            const ystep = Math.max(1, Math.ceil(maxC / 5));
            for (let v = 0; v <= maxC; v += ystep) { c.beginPath(); c.moveTo(padL, Yh(v)); c.lineTo(W - padR, Yh(v)); c.stroke(); c.textAlign = 'right'; c.fillText(String(v), padL - 6, Yh(v) + 4); }
            /* barras */
            counts.forEach((cnt, i) => {
                const x0 = X(lo + i * w), x1 = X(lo + (i + 1) * w);
                c.fillStyle = 'rgba(56,189,248,.45)'; c.strokeStyle = '#38bdf8';
                c.fillRect(x0, Yh(cnt), x1 - x0, histB - Yh(cnt)); c.strokeRect(x0 + .5, Yh(cnt) + .5, x1 - x0 - 1, histB - Yh(cnt));
            });
            c.fillStyle = '#94a3b8'; c.textAlign = 'center';
            for (let i = 0; i <= k; i += Math.ceil(k / 8)) c.fillText(String(+(lo + i * w).toPrecision(4)).replace('.', ','), X(lo + i * w), histB + 14);
            /* média e mediana */
            const vline = (x, col, lab, dy) => { c.save(); c.strokeStyle = col; c.lineWidth = 2.2; c.setLineDash([6, 4]); c.beginPath(); c.moveTo(X(x), top - 4); c.lineTo(X(x), H - 12); c.stroke(); c.restore(); c.fillStyle = col; c.font = '600 12px "JetBrains Mono", monospace'; c.textAlign = 'left'; c.fillText(lab, X(x) + 5, top + 8 + dy); };
            vline(D.mean, '#fbbf24', 'média', 0); vline(D.median, '#34d399', 'mediana', 15);
            /* boxplot */
            const by = H - boxH / 2 - 14, bh = 26;
            c.strokeStyle = '#cbd5e1'; c.lineWidth = 1.6;
            c.beginPath(); c.moveTo(X(D.wmin), by); c.lineTo(X(D.q1), by); c.moveTo(X(D.q3), by); c.lineTo(X(D.wmax), by);
            c.moveTo(X(D.wmin), by - 8); c.lineTo(X(D.wmin), by + 8); c.moveTo(X(D.wmax), by - 8); c.lineTo(X(D.wmax), by + 8); c.stroke();
            c.fillStyle = 'rgba(167,139,250,.3)'; c.fillRect(X(D.q1), by - bh / 2, X(D.q3) - X(D.q1), bh);
            c.strokeStyle = '#a78bfa'; c.strokeRect(X(D.q1), by - bh / 2, X(D.q3) - X(D.q1), bh);
            c.strokeStyle = '#34d399'; c.lineWidth = 2.6; c.beginPath(); c.moveTo(X(D.median), by - bh / 2); c.lineTo(X(D.median), by + bh / 2); c.stroke();
            D.out.forEach(x => { c.fillStyle = '#f472b6'; c.beginPath(); c.arc(X(x), by, 4.5, 0, Math.PI * 2); c.fill(); });
        }
        plot.redraw = draw;
        S('in').addEventListener('input', () => load(S('in').value));
        S('bins').addEventListener('input', () => { binsTouched = true; update(); });
        S('pre').addEventListener('click', e => {
            const b = e.target.closest('button'); if (!b) return; binsTouched = false;
            if (b.dataset.k === 'rand') { data = Array.from({ length: 60 }, () => Math.round((70 + 10 * randn()) * 10) / 10); syncText(); load(S('in').value); }
            else { S('in').value = DPRESETS[b.dataset.k].data; load(S('in').value); }
        });
        S('ext').addEventListener('click', () => { if (!data.length) return; const d = describe(data); data.push(Math.round((d.max + 3 * (d.max - d.min || 1)) * 100) / 100); syncText(); load(S('in').value); });
        S('pop').addEventListener('click', () => { data.pop(); syncText(); load(S('in').value); });
        S('in').value = DPRESETS.sal.data; load(S('in').value);
        return draw;
    }

    /* =========================================================
       BINOMIAL E POISSON
       ========================================================= */
    function initBinomial(root) {
        const sl = (id, label, min, max, step, val) => '<div class="ctl" id="bn-w-' + id + '"><label for="bn-' + id + '">' + label + ' = <b id="bn-' + id + '-v"></b></label><input id="bn-' + id + '" type="range" min="' + min + '" max="' + max + '" step="' + step + '" value="' + val + '"></div>';
        root.innerHTML =
            '<div class="lab-grid">' +
              '<div class="lab-stage"><canvas id="bn-cv"></canvas></div>' +
              '<div class="lab-side">' +
                '<div class="ctl seg"><label><input type="radio" name="bn-d" value="bin" checked> Binomial</label><label><input type="radio" name="bn-d" value="poi"> Poisson</label></div>' +
                sl('n', T('n') + ' (tentativas)', 1, 100, 1, 10) + sl('p', T('p') + ' (sucesso)', 0, 1, 0.01, 0.25) + sl('l', T('\\lambda') + ' (taxa média)', 0.5, 20, 0.5, 3) +
                '<div class="ctl"><label for="bn-ev">Evento</label><select id="bn-ev"><option value="eq">P(X = a)</option><option value="le">P(X ≤ a)</option><option value="ge" selected>P(X ≥ a)</option><option value="bt">P(a ≤ X ≤ b)</option></select></div>' +
                sl('a', T('a'), 0, 100, 1, 5) + sl('b', T('b'), 0, 100, 1, 7) +
                '<div class="ctl seg"><label><input type="checkbox" id="bn-norm"> curva normal aproximada</label></div>' +
                '<div class="readout" style="margin-top:0"><div class="wide"><span>Probabilidade do evento</span><b class="tex-line" id="bn-prob"></b></div>' +
                  '<div><span>' + T('E[X]') + '</span><b id="bn-mu"></b></div><div><span>' + T('\\sigma') + '</span><b id="bn-sd"></b></div></div>' +
                '<div class="ctl" style="display:flex;gap:6px;align-items:end;flex-wrap:wrap"><div><label for="bn-reps">Simular</label><select id="bn-reps"><option>100</option><option selected>1000</option><option>10000</option></select></div>' +
                  '<button class="btn small" id="bn-sim" type="button"><i class="fa-solid fa-dice"></i> Simular experimentos</button><button class="btn small ghost" id="bn-clr" type="button">Limpar</button></div>' +
                '<div class="fn-hint" id="bn-simout"></div>' +
              '</div>' +
            '</div>' +
            '<div class="lab-under"><div class="lab-note"><strong>Leitura.</strong> Cada barra é ' + T('P(X = k)') + '. As barras do evento escolhido ficam <b style="color:#fbbf24">amarelas</b> e a soma delas é a probabilidade. Os pontos rosa são as frequências relativas de uma simulação de verdade (moedas virtuais lançadas no seu navegador).</div>' +
              '<div class="lab-note"><strong>Experimente.</strong> (1) Com ' + T('p = 0{,}5') + ' a distribuição é simétrica; com ' + T('p') + ' pequeno, assimétrica. (2) Aumente ' + T('n') + ' e ligue a curva normal: ela se ajusta cada vez melhor. (3) Simule 100 e depois 10.000 experimentos: os pontos colam nas barras (lei dos grandes números).</div></div>';

        const S = k => $('#bn-' + k, root);
        const plot = new Plot(S('cv'));
        const dist = () => root.querySelector('input[name="bn-d"]:checked').value;
        let sim = null;

        function model() {
            if (dist() === 'bin') { const n = +S('n').value, p = +S('p').value; return { pmf: binomPMF(n, p), mu: n * p, sd: Math.sqrt(n * p * (1 - p)), n, p }; }
            const l = +S('l').value, K = Math.ceil(l + 5 * Math.sqrt(l) + 5);
            return { pmf: poisPMF(l, K), mu: l, sd: Math.sqrt(l), l };
        }
        function inEvent(k) {
            const a = +S('a').value, b = +S('b').value, ev = S('ev').value;
            return ev === 'eq' ? k === a : ev === 'le' ? k <= a : ev === 'ge' ? k >= a : k >= Math.min(a, b) && k <= Math.max(a, b);
        }
        function update() {
            const bin = dist() === 'bin', M = model(), K = M.pmf.length - 1;
            ['n', 'p'].forEach(id => { S('w-' + id).hidden = !bin; }); S('w-l').hidden = bin; S('w-b').hidden = S('ev').value !== 'bt';
            S('a').max = S('b').max = String(K);
            S('n-v').textContent = S('n').value; S('p-v').textContent = nf(+S('p').value, 2); S('l-v').textContent = nf(+S('l').value, 1);
            S('a-v').textContent = S('a').value; S('b-v').textContent = S('b').value;
            let P = 0; M.pmf.forEach((q, k) => { if (inEvent(k)) P += q; });
            /* para Poisson, P(X ≥ a) inclui a cauda além do gráfico */
            if (!bin && S('ev').value === 'ge') { P = 1; M.pmf.forEach((q, k) => { if (k < +S('a').value) P -= q; }); }
            const a = +S('a').value, b = +S('b').value, ev = S('ev').value;
            const evTex = ev === 'eq' ? 'P(X = ' + a + ')' : ev === 'le' ? 'P(X \\le ' + a + ')' : ev === 'ge' ? 'P(X \\ge ' + a + ')' : 'P(' + Math.min(a, b) + ' \\le X \\le ' + Math.max(a, b) + ')';
            let extra = '';
            if (bin && ev === 'eq') extra = ' = \\tbinom{' + M.n + '}{' + a + '}(' + nf(M.p, 2).replace(',', '{,}') + ')^{' + a + '}(' + nf(1 - M.p, 2).replace(',', '{,}') + ')^{' + (M.n - a) + '}';
            S('prob').innerHTML = T(evTex + extra + ' \\approx ' + nf(P, 4).replace(',', '{,}')) + ' (' + pct(P) + ')';
            S('mu').textContent = nf(M.mu, 3); S('sd').textContent = nf(M.sd, 3);
            if (sim && sim.key !== key()) sim = null;
            showSim(M);
            draw();
        }
        const key = () => dist() + '|' + S('n').value + '|' + S('p').value + '|' + S('l').value;
        function showSim(M) {
            if (!sim) { S('simout').textContent = ''; return; }
            let f = 0; sim.counts.forEach((c, k) => { if (inEvent(k)) f += c; }); f /= sim.reps;
            S('simout').innerHTML = sim.reps.toLocaleString('pt-BR') + ' experimentos simulados: média ' + nf(sim.mean, 3) + ' (teórica ' + nf(M.mu, 3) + '); o evento ocorreu em ' + pct(f) + ' das vezes.';
        }
        function simulate() {
            const M = model(), reps = +S('reps').value, counts = new Array(M.pmf.length + 40).fill(0); let sum = 0;
            for (let r = 0; r < reps; r++) {
                let x = 0;
                if (dist() === 'bin') { for (let i = 0; i < M.n; i++) if (Math.random() < M.p) x++; }
                else { const L = Math.exp(-M.l); let pr = 1; do { x++; pr *= Math.random(); } while (pr > L); x--; }
                counts[Math.min(x, counts.length - 1)]++; sum += x;
            }
            sim = { counts, reps, mean: sum / reps, key: key() };
            update();
        }
        function draw() {
            if (!plot.fit()) return;
            const M = model(), K = M.pmf.length - 1, ymax = Math.max(...M.pmf, sim ? Math.max(...sim.counts) / sim.reps : 0) * 1.15 || 1;
            plot.view = [-1, K + 1, -ymax * 0.09, ymax];
            plot.clear(); plot.grid();
            const c = plot.ctx, bw = Math.max(1, Math.min(0.8 * (plot.X(1) - plot.X(0)), 40));
            M.pmf.forEach((q, k) => {
                const on = inEvent(k), x = plot.X(k);
                c.fillStyle = on ? 'rgba(251,191,36,.75)' : 'rgba(56,189,248,.45)'; c.strokeStyle = on ? '#fbbf24' : '#38bdf8';
                c.fillRect(x - bw / 2, plot.Y(q), bw, plot.Y(0) - plot.Y(q)); if (bw > 3) c.strokeRect(x - bw / 2 + .5, plot.Y(q) + .5, bw - 1, plot.Y(0) - plot.Y(q));
            });
            if (S('norm').checked && M.sd > 0) plot.curve(x => dnorm(x, M.mu, M.sd), '#a78bfa', 2.2);
            if (sim) sim.counts.forEach((cnt, k) => { if (k <= K && cnt) plot.dot(k, cnt / sim.reps, '#f472b6', Math.max(2.5, Math.min(5, bw / 4))); });
        }
        plot.redraw = draw;
        root.querySelectorAll('input[type=range], select, input[type=checkbox], input[type=radio]').forEach(el => el.addEventListener(el.type === 'range' ? 'input' : 'change', e => { if (e.target.id === 'bn-reps') return; update(); }));
        S('sim').addEventListener('click', simulate);
        S('clr').addEventListener('click', () => { sim = null; update(); });
        update();
        return draw;
    }

    /* =========================================================
       NORMAL E TEOREMA CENTRAL DO LIMITE
       ========================================================= */
    const POPS = {
        unif: { label: 'Uniforme em [0, 1]', mu: 0.5, sd: Math.sqrt(1 / 12), draw: () => Math.random(), range: [0, 1], pdf: x => (x >= 0 && x <= 1 ? 1 : 0) },
        exp: { label: 'Exponencial (muito assimétrica)', mu: 1, sd: 1, draw: () => -Math.log(1 - Math.random()), range: [0, 6], pdf: x => (x >= 0 ? Math.exp(-x) : 0) },
        dado: { label: 'Um dado (1 a 6)', mu: 3.5, sd: Math.sqrt(35 / 12), draw: () => 1 + Math.floor(Math.random() * 6), range: [0.5, 6.5], pdf: x => (x >= 0.5 && x < 6.5 ? 1 / 6 : 0) },
        bim: { label: 'Bimodal', mu: 5, sd: Math.sqrt(1 + 9), draw: () => (Math.random() < 0.5 ? 2 : 8) + randn(), range: [-2, 12], pdf: x => 0.5 * dnorm(x, 2, 1) + 0.5 * dnorm(x, 8, 1) },
        moeda: { label: 'Moeda (0 ou 1)', mu: 0.5, sd: 0.5, draw: () => (Math.random() < 0.5 ? 0 : 1), range: [-0.5, 1.5], pdf: x => (Math.abs(x) < 0.12 || Math.abs(x - 1) < 0.12 ? 2 : 0) }
    };
    function initNormal(root) {
        const num = (id, label, v) => '<div class="ctl" style="margin:0"><label for="nm-' + id + '">' + label + '</label><input class="plain-in" id="nm-' + id + '" value="' + v + '" spellcheck="false" autocomplete="off" style="text-align:center"></div>';
        root.innerHTML =
            '<div class="lab-grid">' +
              '<div class="lab-stage"><canvas id="nm-cv"></canvas></div>' +
              '<div class="lab-side">' +
                '<div class="ctl"><label for="nm-mode">Modo</label><select id="nm-mode"><option value="area">Áreas da normal</option><option value="inv">Normal inversa (achar o valor)</option><option value="tcl">Teorema Central do Limite</option></select></div>' +
                '<div id="nm-normal">' +
                  '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">' + num('mu', T('\\mu') + ' (média)', 100) + num('sd', T('\\sigma') + ' (desvio)', 15) + '</div>' +
                  '<div class="ctl" id="nm-w-ev" style="margin-top:10px"><label for="nm-ev">Área</label><select id="nm-ev"><option value="bt">entre a e b</option><option value="le">menor que b</option><option value="ge">maior que a</option></select></div>' +
                  '<div id="nm-w-ab" style="display:grid;grid-template-columns:1fr 1fr;gap:8px">' + num('a', T('a'), 85) + num('b', T('b'), 130) + '</div>' +
                  '<div id="nm-w-pr" hidden>' + num('pr', 'Área à esquerda (ex.: 0,95 ou 95%)', '0,95') + '</div>' +
                  '<div class="ctl seg" style="margin-top:10px"><label><input type="checkbox" id="nm-rule"> faixas 68–95–99,7</label></div>' +
                  '<div class="readout" style="margin-top:6px"><div class="wide"><span>Resultado</span><b class="tex-line" id="nm-res"></b></div></div>' +
                  '<div class="presets" id="nm-pre"><button type="button" data-v="100 15 85 115 bt">QI: entre 85 e 115</button><button type="button" data-v="170 10 0 190 le">altura até 190</button><button type="button" data-v="60 8 76 0 ge">nota acima de 76</button><button type="button" data-v="0 1 -1,96 1,96 bt">' + T('Z') + ' entre ±1,96</button></div>' +
                '</div>' +
                '<div id="nm-tcl" hidden>' +
                  '<div class="ctl"><label for="nm-pop">População</label><select id="nm-pop">' + Object.keys(POPS).map(k => '<option value="' + k + '"' + (k === 'exp' ? ' selected' : '') + '>' + POPS[k].label + '</option>').join('') + '</select></div>' +
                  '<div class="ctl"><label for="nm-n">Tamanho de cada amostra ' + T('n') + ' = <b id="nm-n-v"></b></label><input id="nm-n" type="range" min="1" max="60" step="1" value="5"></div>' +
                  '<div style="display:flex;gap:6px;flex-wrap:wrap"><button class="btn small" id="nm-one" type="button">+1 amostra</button><button class="btn small" id="nm-many" type="button"><i class="fa-solid fa-forward"></i> +1.000 amostras</button><button class="btn small ghost" id="nm-clr" type="button">Limpar</button></div>' +
                  '<div class="readout"><div><span>' + T('\\mu') + ' da população</span><b id="nm-pmu"></b></div><div><span>' + T('\\sigma / \\sqrt n') + ' (teórico)</span><b id="nm-se"></b></div>' +
                  '<div><span>Média das médias</span><b id="nm-mm"></b></div><div><span>Desvio das médias</span><b id="nm-sm"></b></div>' +
                  '<div class="wide"><span>Amostras sorteadas</span><b id="nm-cnt"></b></div></div>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<div class="lab-under"><div class="lab-note" id="nm-note"></div>' +
              '<div class="lab-note"><strong>Por que importa.</strong> A tabela ' + T('z') + ' e o TCL são o motor dos intervalos de confiança e dos testes de hipóteses (capítulos 10 e 11): é por causa do TCL que se pode usar a normal para médias, mesmo quando os dados não são normais.</div></div>';

        const S = k => $('#nm-' + k, root);
        const plot = new Plot(S('cv'));
        const rd = id => { const v = Number(String(S(id).value).replace('%', '').replace(',', '.').replace(/[−–]/g, '-')); S(id).classList.toggle('bad', !Number.isFinite(v)); return v; };
        let means = [];
        const NOTES = {
            area: '<strong>Áreas.</strong> A área pintada é a probabilidade. O painel mostra a padronização ' + T('z = \\frac{x - \\mu}{\\sigma}') + ' e o valor de ' + T('\\Phi') + '. Mude ' + T('\\sigma') + ': a curva fica mais baixa e larga, mas a área total continua 1.',
            inv: '<strong>Inversa.</strong> Dada a área à esquerda (por exemplo, 0,90), o simulador acha o valor ' + T('x') + ' que a separa: ' + T('x = \\mu + z\\sigma') + '. É assim que se encontra "a nota dos 10% melhores".',
            tcl: '<strong>TCL.</strong> Em cima, a população (nada normal). Embaixo, o histograma das médias de muitas amostras de tamanho ' + T('n') + ', com a curva ' + T('N(\\mu, \\sigma^2/n)') + ' por cima. Aumente ' + T('n') + ' e veja o histograma estreitar e virar sino, qualquer que seja a população.'
        };
        function setMode() {
            const m = S('mode').value;
            S('normal').hidden = m === 'tcl'; S('tcl').hidden = m !== 'tcl';
            S('w-ev').hidden = m !== 'area'; S('w-ab').hidden = m !== 'area'; S('w-pr').hidden = m !== 'inv';
            S('note').innerHTML = NOTES[m]; update();
        }
        function update() {
            const m = S('mode').value;
            if (m === 'tcl') return updateTCL();
            const mu = rd('mu'), sd = rd('sd');
            if (!(sd > 0) || !Number.isFinite(mu)) { S('res').textContent = 'Informe μ e σ > 0.'; draw(); return; }
            const c2 = s => String(+s.toFixed(4)).replace('.', '{,}');
            if (m === 'area') {
                const a = rd('a'), b = rd('b'), ev = S('ev').value, za = (a - mu) / sd, zb = (b - mu) / sd;
                S('a').disabled = ev === 'le'; S('b').disabled = ev === 'ge';
                let P, tex;
                if (ev === 'le') { P = Phi(zb); tex = 'P(X < ' + c2(b) + ') = P(Z < ' + c2(zb) + ') = \\Phi(' + c2(zb) + ')'; }
                else if (ev === 'ge') { P = 1 - Phi(za); tex = 'P(X > ' + c2(a) + ') = 1 - \\Phi(' + c2(za) + ')'; }
                else { const lo = Math.min(za, zb), hi = Math.max(za, zb); P = Phi(hi) - Phi(lo); tex = 'P(' + c2(Math.min(a, b)) + ' < X < ' + c2(Math.max(a, b)) + ') = \\Phi(' + c2(hi) + ') - \\Phi(' + c2(lo) + ')'; }
                S('res').innerHTML = T(tex + ' \\approx ' + c2(P)) + ' (' + pct(P) + ')';
            } else {
                let p = rd('pr'); if (p > 1) p /= 100;
                if (!(p > 0 && p < 1)) { S('res').textContent = 'A área precisa estar entre 0 e 1 (ou entre 0% e 100%).'; draw(); return; }
                const z = invPhi(p), x = mu + z * sd;
                S('res').innerHTML = T('\\Phi(z) = ' + c2(p) + ' \\Rightarrow z \\approx ' + c2(z) + ' \\Rightarrow x = ' + c2(mu) + (z < 0 ? ' - ' : ' + ') + c2(Math.abs(z)) + '\\cdot' + c2(sd) + ' \\approx ' + c2(x));
            }
            draw();
        }
        function updateTCL() {
            const P = POPS[S('pop').value], n = +S('n').value;
            S('n-v').textContent = n;
            S('pmu').textContent = nf(P.mu, 3); S('se').textContent = nf(P.sd / Math.sqrt(n), 4);
            S('cnt').textContent = means.length.toLocaleString('pt-BR');
            if (means.length) {
                const m = means.reduce((s, x) => s + x, 0) / means.length, v = means.length > 1 ? means.reduce((s, x) => s + (x - m) ** 2, 0) / (means.length - 1) : 0;
                S('mm').textContent = nf(m, 4); S('sm').textContent = nf(Math.sqrt(v), 4);
            } else { S('mm').textContent = '—'; S('sm').textContent = '—'; }
            draw();
        }
        function addSamples(k) {
            const P = POPS[S('pop').value], n = +S('n').value;
            for (let r = 0; r < k; r++) { let s = 0; for (let i = 0; i < n; i++) s += P.draw(); means.push(s / n); }
            if (means.length > 50000) means = means.slice(-50000);
            updateTCL();
        }
        function draw() {
            if (!plot.fit()) return;
            const m = S('mode').value, c = plot.ctx;
            if (m !== 'tcl') {
                const mu = rd('mu'), sd = rd('sd');
                if (!(sd > 0)) { plot.clear(); return; }
                const top = dnorm(mu, mu, sd) * 1.18;
                plot.view = [mu - 4.2 * sd, mu + 4.2 * sd, -top * 0.1, top];
                plot.clear(); plot.grid();
                if (S('rule').checked) [[3, 'rgba(167,139,250,.08)'], [2, 'rgba(167,139,250,.12)'], [1, 'rgba(167,139,250,.18)']].forEach(([k, col]) => {
                    c.fillStyle = col; c.fillRect(plot.X(mu - k * sd), plot.Y(top), plot.X(mu + k * sd) - plot.X(mu - k * sd), plot.Y(0) - plot.Y(top));
                    c.fillStyle = '#c4b5fd'; c.font = '600 11px "JetBrains Mono", monospace'; c.textAlign = 'center'; c.fillText({ 1: '68%', 2: '95%', 3: '99,7%' }[k], plot.X(mu + (k - 0.5) * sd), plot.Y(top) + 14);
                });
                let lo, hi;
                if (m === 'area') { const a = rd('a'), b = rd('b'), ev = S('ev').value; if (ev === 'le') { lo = -Infinity; hi = b; } else if (ev === 'ge') { lo = a; hi = Infinity; } else { lo = Math.min(a, b); hi = Math.max(a, b); } }
                else { let p = rd('pr'); if (p > 1) p /= 100; lo = -Infinity; hi = p > 0 && p < 1 ? mu + invPhi(p) * sd : -Infinity; }
                const x0 = Math.max(plot.view[0], lo), x1 = Math.min(plot.view[1], hi);
                if (x1 > x0) {
                    c.save(); c.beginPath(); c.moveTo(plot.X(x0), plot.Y(0));
                    for (let i = 0; i <= 200; i++) { const x = x0 + (x1 - x0) * i / 200; c.lineTo(plot.X(x), plot.Y(dnorm(x, mu, sd))); }
                    c.lineTo(plot.X(x1), plot.Y(0)); c.closePath(); c.fillStyle = 'rgba(251,191,36,.45)'; c.fill(); c.restore();
                }
                plot.curve(x => dnorm(x, mu, sd), '#38bdf8', 2.6);
                plot.line(mu, 0, mu, dnorm(mu, mu, sd), 'rgba(226,232,240,.5)', 1.2, [4, 4]);
                return;
            }
            /* TCL: população em cima (faixa menor), médias embaixo */
            const P = POPS[S('pop').value], n = +S('n').value, se = P.sd / Math.sqrt(n);
            const [r0, r1] = P.range, W = plot.w, H = plot.h, split = H * 0.32;
            c.fillStyle = '#0c1220'; c.fillRect(0, 0, W, H);
            const X = x => 40 + (x - r0) / (r1 - r0) * (W - 60);
            /* população */
            let pmax = 0; for (let i = 0; i <= 300; i++) pmax = Math.max(pmax, P.pdf(r0 + (r1 - r0) * i / 300));
            c.fillStyle = '#94a3b8'; c.font = '600 12px "Plus Jakarta Sans", sans-serif'; c.textAlign = 'left'; c.fillText('População: ' + P.label, 40, 18);
            c.beginPath(); for (let i = 0; i <= 300; i++) { const x = r0 + (r1 - r0) * i / 300, y = split - 10 - P.pdf(x) / pmax * (split - 40); i ? c.lineTo(X(x), y) : c.moveTo(X(x), y); }
            c.strokeStyle = '#a78bfa'; c.lineWidth = 2; c.stroke();
            c.strokeStyle = 'rgba(148,163,184,.3)'; c.beginPath(); c.moveTo(40, split - 10); c.lineTo(W - 20, split - 10); c.stroke();
            /* médias */
            const bins = 60, bw = (r1 - r0) / bins, counts = new Array(bins).fill(0);
            means.forEach(x => { const i = Math.floor((x - r0) / bw); if (i >= 0 && i < bins) counts[i]++; });
            const dens = counts.map(cn => means.length ? cn / (means.length * bw) : 0);
            const curveMax = 1 / (se * Math.sqrt(2 * Math.PI)), ymax = Math.max(curveMax, ...dens) * 1.08 || 1;
            const base = H - 26, Y = y => base - y / ymax * (base - split - 20);
            c.fillStyle = '#94a3b8'; c.fillText('Médias de amostras de tamanho n = ' + n + (means.length ? '' : ' (clique em "+1.000 amostras")'), 40, split + 12);
            dens.forEach((d, i) => { if (!d) return; const x0 = X(r0 + i * bw), x1 = X(r0 + (i + 1) * bw); c.fillStyle = 'rgba(56,189,248,.5)'; c.fillRect(x0, Y(d), x1 - x0 - 0.5, base - Y(d)); });
            c.beginPath(); for (let i = 0; i <= 400; i++) { const x = r0 + (r1 - r0) * i / 400; const y = Y(dnorm(x, P.mu, se)); i ? c.lineTo(X(x), y) : c.moveTo(X(x), y); }
            c.strokeStyle = '#fbbf24'; c.lineWidth = 2.2; c.stroke();
            c.strokeStyle = 'rgba(148,163,184,.4)'; c.beginPath(); c.moveTo(40, base); c.lineTo(W - 20, base); c.stroke();
            c.fillStyle = '#94a3b8'; c.font = '11px "JetBrains Mono", monospace'; c.textAlign = 'center';
            for (let i = 0; i <= 6; i++) { const x = r0 + (r1 - r0) * i / 6; c.fillText(String(+x.toFixed(2)).replace('.', ','), X(x), base + 15); }
            c.strokeStyle = 'rgba(226,232,240,.5)'; c.setLineDash([4, 4]); c.beginPath(); c.moveTo(X(P.mu), split); c.lineTo(X(P.mu), base); c.stroke(); c.setLineDash([]);
        }
        plot.redraw = draw;
        S('mode').addEventListener('change', setMode);
        ['mu', 'sd', 'a', 'b', 'pr'].forEach(id => S(id).addEventListener('input', update));
        ['ev', 'rule'].forEach(id => S(id).addEventListener('change', update));
        S('pre').addEventListener('click', e => {
            const btn = e.target.closest('button'); if (!btn) return;
            const [mu, sd, a, b, ev] = btn.dataset.v.split(' ');
            S('mu').value = mu; S('sd').value = sd; S('a').value = a; S('b').value = b; S('ev').value = ev; update();
        });
        S('pop').addEventListener('change', () => { means = []; updateTCL(); });
        S('n').addEventListener('input', () => { means = []; updateTCL(); });
        S('one').addEventListener('click', () => addSamples(1));
        S('many').addEventListener('click', () => addSamples(1000));
        S('clr').addEventListener('click', () => { means = []; updateTCL(); });
        setMode();
        return draw;
    }

    /* =========================================================
       BAYES: TESTES E FALSOS POSITIVOS
       ========================================================= */
    function initBayes(root) {
        const sl = (id, label, min, max, step, val) => '<div class="ctl"><label for="by-' + id + '">' + label + ' = <b id="by-' + id + '-v"></b></label><input id="by-' + id + '" type="range" min="' + min + '" max="' + max + '" step="' + step + '" value="' + val + '"></div>';
        root.innerHTML =
            '<div class="lab-grid">' +
              '<div class="lab-stage"><canvas id="by-cv"></canvas></div>' +
              '<div class="lab-side">' +
                sl('prev', 'Prevalência (doentes na população)', 0.1, 50, 0.1, 1) + sl('sens', 'Sensibilidade ' + T('P(+ \\mid D)'), 50, 100, 0.5, 99) + sl('spec', 'Especificidade ' + T('P(- \\mid S)'), 50, 100, 0.5, 95) +
                '<div class="ctl seg"><label><input type="checkbox" id="by-onlypos"> destacar só os positivos</label></div>' +
                '<div class="readout" style="margin-top:0">' +
                  '<div class="wide"><span>Testou positivo: chance de estar doente</span><b class="tex-line" id="by-ppv"></b></div>' +
                  '<div class="wide"><span>Testou negativo: chance de estar saudável</span><b id="by-npv"></b></div>' +
                  '<div class="wide"><span>Em 10.000 pessoas</span><b id="by-cnt" style="font-family:var(--sans);font-size:.86rem;font-weight:500"></b></div></div>' +
                '<div style="display:flex;gap:6px;flex-wrap:wrap"><button class="btn small" id="by-again" type="button"><i class="fa-solid fa-repeat"></i> Positivo de novo (2º teste)</button><button class="btn small ghost" id="by-reset" type="button">Voltar ao exemplo</button></div>' +
                '<div class="fn-hint" id="by-hint"></div>' +
              '</div>' +
            '</div>' +
            '<div class="lab-under"><div class="lab-note"><strong>Legenda (1.000 pessoas).</strong> <b style="color:#f87171">Vermelho</b>: doente com teste positivo (verdadeiro positivo). <b style="color:#fbbf24">Amarelo</b>: saudável com teste positivo (falso positivo). <b style="color:#fb923c">Laranja vazado</b>: doente com teste negativo (falso negativo). Cinza: saudável com teste negativo.</div>' +
              '<div class="lab-note"><strong>Experimente.</strong> Com prevalência de 1%, conte os vermelhos e os amarelos: os amarelos são muito mais numerosos, por isso um positivo indica doença em só cerca de 17% dos casos. Aumente a prevalência (um grupo de risco) e veja a mesma prova ficar muito mais confiável. "Positivo de novo" usa o resultado como nova prevalência, como num segundo exame independente.</div></div>';

        const S = k => $('#by-' + k, root);
        const cv = S('cv');
        let order = null;
        function shuffleOrder() { order = Array.from({ length: 1000 }, (_, i) => i); for (let i = 999; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; } }
        function vals() { return { prev: +S('prev').value / 100, sens: +S('sens').value / 100, spec: +S('spec').value / 100 }; }
        function update() {
            const { prev, sens, spec } = vals();
            S('prev-v').textContent = nf(100 * prev, 1) + '%'; S('sens-v').textContent = nf(100 * sens, 1) + '%'; S('spec-v').textContent = nf(100 * spec, 1) + '%';
            const tp = prev * sens, fp = (1 - prev) * (1 - spec), fn = prev * (1 - sens), tn = (1 - prev) * spec;
            const ppv = tp / (tp + fp), npv = tn / (tn + fn);
            const c3 = x => String(+x.toFixed(4)).replace('.', '{,}');
            S('ppv').innerHTML = T('\\dfrac{' + c3(prev) + '\\cdot' + c3(sens) + '}{' + c3(prev) + '\\cdot' + c3(sens) + ' + ' + c3(1 - prev) + '\\cdot' + c3(1 - spec) + '} \\approx ' + c3(ppv)) + ' <b>(' + pct(ppv) + ')</b>';
            S('npv').textContent = pct(npv);
            const r = x => Math.round(x * 10000).toLocaleString('pt-BR');
            S('cnt').innerHTML = r(prev) + ' doentes, dos quais ' + r(tp) + ' dão positivo; ' + r(1 - prev) + ' saudáveis, dos quais ' + r(fp) + ' dão positivo (falso). Entre os ' + r(tp + fp) + ' positivos, só ' + r(tp) + ' estão doentes.';
            draw();
        }
        function draw() {
            const rc = cv.getBoundingClientRect(), dpr = window.devicePixelRatio || 1, W = Math.round(rc.width), H = Math.round(rc.height);
            if (!W || !H) return;
            if (cv.width !== W * dpr || cv.height !== H * dpr) { cv.width = W * dpr; cv.height = H * dpr; }
            const c = cv.getContext('2d'); c.setTransform(dpr, 0, 0, dpr, 0, 0);
            c.fillStyle = '#0c1220'; c.fillRect(0, 0, W, H);
            const { prev, sens, spec } = vals();
            const nD = Math.round(1000 * prev), nTP = Math.round(nD * sens), nFP = Math.round((1000 - nD) * (1 - spec));
            /* tipos: 0..nTP-1 TP, depois FN, depois FP, depois TN */
            const type = i => i < nTP ? 'tp' : i < nD ? 'fn' : i < nD + nFP ? 'fp' : 'tn';
            const cols = W > 520 ? 40 : 25, rows = 1000 / cols, pad = 14;
            const cell = Math.min((W - 2 * pad) / cols, (H - 2 * pad - 20) / rows), r = cell * 0.36;
            const ox = (W - cell * cols) / 2, oy = (H - cell * rows) / 2 + 8;
            const only = S('onlypos').checked;
            for (let slot = 0; slot < 1000; slot++) {
                const t = type(order[slot]), x = ox + (slot % cols + 0.5) * cell, y = oy + (Math.floor(slot / cols) + 0.5) * cell;
                c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2);
                const dim = only && (t === 'fn' || t === 'tn');
                if (t === 'tp') { c.fillStyle = '#f87171'; c.fill(); }
                else if (t === 'fp') { c.fillStyle = '#fbbf24'; c.fill(); }
                else if (t === 'fn') { c.strokeStyle = dim ? 'rgba(251,146,60,.25)' : '#fb923c'; c.lineWidth = 1.6; c.stroke(); }
                else { c.fillStyle = dim ? 'rgba(100,116,139,.12)' : 'rgba(100,116,139,.45)'; c.fill(); }
            }
            c.fillStyle = '#cbd5e1'; c.font = '600 12px "Plus Jakarta Sans", sans-serif'; c.textAlign = 'center';
            c.fillText(W > 520 ? '1.000 pessoas: ' + nTP + ' verdadeiros positivos, ' + nFP + ' falsos positivos, ' + (nD - nTP) + ' falsos negativos' : nTP + ' VP · ' + nFP + ' FP · ' + (nD - nTP) + ' FN (em 1.000)', W / 2, 16);
        }
        S('prev').addEventListener('input', update); S('sens').addEventListener('input', update); S('spec').addEventListener('input', update);
        S('onlypos').addEventListener('change', draw);
        S('again').addEventListener('click', () => {
            const { prev, sens, spec } = vals(), ppv = prev * sens / (prev * sens + (1 - prev) * (1 - spec));
            const nv = Math.min(50, Math.max(0.1, Math.round(ppv * 1000) / 10));
            S('prev').value = String(nv); S('hint').textContent = 'A nova prevalência é a probabilidade depois do 1º positivo: ' + pct(ppv) + (ppv * 100 > 50 ? ' (o controle vai até 50%)' : '') + '.'; update();
        });
        S('reset').addEventListener('click', () => { S('prev').value = '1'; S('sens').value = '99'; S('spec').value = '95'; S('hint').textContent = ''; update(); });
        if (window.ResizeObserver) new ResizeObserver(draw).observe(cv);
        shuffleOrder(); update();
        return draw;
    }

    return { init: { descritiva: initDescritiva, binomial: initBinomial, normal: initNormal, bayes: initBayes }, Phi, invPhi, binomPMF, poisPMF, describe };
})();
