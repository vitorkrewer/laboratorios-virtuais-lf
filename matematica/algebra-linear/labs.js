/* Álgebra Linear: simuladores Transformações 2D, Escalonamento (frações exatas) e Caçador de autovetores. */
window.MATH = window.MATH || {};

MATH.labs = (function () {
    'use strict';

    const { T, Plot, fmt } = MATH.plot;
    const { F, parseNum } = MATH.frac;
    const $ = (s, r) => (r || document).querySelector(s);

    /* ---------- utilidades ---------- */
    const n3 = x => { const v = Math.abs(x) < 5e-10 ? 0 : x; return String(+v.toFixed(3)).replace('.', '{,}'); };
    const numTex = x => n3(x);
    function readNum(s) {
        const f = parseNum(s);
        if (f) return f.val();
        const v = parseFloat(String(s).replace(',', '.').replace(/[−–]/g, '-'));
        return Number.isFinite(v) ? v : null;
    }
    function bmat(rows) { return '\\begin{bmatrix}' + rows.map(r => r.join(' & ')).join(' \\\\ ') + '\\end{bmatrix}'; }

    /* autovalores e autovetores reais de [[a,b],[c,d]] */
    function eigen2(a, b, c, d) {
        const tr = a + d, det = a * d - b * c, disc = tr * tr - 4 * det, eps = 1e-9;
        if (Math.abs(b) < eps && Math.abs(c) < eps && Math.abs(a - d) < eps) return { tr, det, disc, scalar: true, vals: [a], vecs: [] };
        if (disc < -eps) return { tr, det, disc, complex: true, re: tr / 2, im: Math.sqrt(-disc) / 2, vals: [], vecs: [] };
        const s = Math.sqrt(Math.max(0, disc)), ls = disc > eps ? [(tr + s) / 2, (tr - s) / 2] : [tr / 2];
        const vecs = ls.map(l => {
            let v;
            if (Math.abs(b) > eps) v = [b, l - a];
            else if (Math.abs(c) > eps) v = [l - d, c];
            else v = Math.abs(l - a) < eps ? [1, 0] : [0, 1];
            const n = Math.hypot(v[0], v[1]); return [v[0] / n, v[1] / n];
        });
        return { tr, det, disc, vals: ls, vecs };
    }
    function eigenTex(e) {
        if (e.scalar) return T('\\lambda = ' + n3(e.vals[0])) + ' (toda direção é autovetor)';
        if (e.complex) return 'não reais: ' + T('\\lambda = ' + n3(e.re) + ' \\pm ' + n3(e.im) + 'i');
        return e.vals.map((l, i) => T('\\lambda_' + (i + 1) + ' = ' + n3(l))).join(' · ') + (e.vals.length === 1 ? ' (duplo)' : '');
    }
    function arrow(plot, x0, y0, x1, y1, color, width, label) {
        const c = plot.ctx, X0 = plot.X(x0), Y0 = plot.Y(y0), X1 = plot.X(x1), Y1 = plot.Y(y1);
        const ang = Math.atan2(Y1 - Y0, X1 - X0), L = Math.hypot(X1 - X0, Y1 - Y0), h = Math.min(12, L * .4);
        c.save(); c.strokeStyle = color; c.fillStyle = color; c.lineWidth = width || 3; c.lineCap = 'round';
        c.beginPath(); c.moveTo(X0, Y0); c.lineTo(X1 - Math.cos(ang) * h * .6, Y1 - Math.sin(ang) * h * .6); c.stroke();
        if (L > 2) { c.beginPath(); c.moveTo(X1, Y1); c.lineTo(X1 - h * Math.cos(ang - .4), Y1 - h * Math.sin(ang - .4)); c.lineTo(X1 - h * Math.cos(ang + .4), Y1 - h * Math.sin(ang + .4)); c.closePath(); c.fill(); }
        if (label) { c.font = '600 14px "JetBrains Mono", monospace'; c.textAlign = 'left'; c.textBaseline = 'bottom'; c.fillText(label, X1 + 6, Y1 - 4); }
        c.restore();
    }
    function squareView(plot, R) {
        const k = plot.w / plot.h;
        plot.view = k >= 1 ? [-R * k, R * k, -R, R] : [-R, R, -R / k, R / k];
    }

    /* =========================================================
       TRANSFORMAÇÕES 2D
       ========================================================= */
    const TPRESETS = {
        custom: { label: 'Minha matriz', m: null },
        id: { label: 'Identidade', m: [1, 0, 0, 1] },
        rot: { label: 'Rotação de θ', m: null },
        refx: { label: 'Reflexão no eixo x', m: [1, 0, 0, -1] },
        refd: { label: 'Reflexão em y = x', m: [0, 1, 1, 0] },
        esc: { label: 'Escala (2 e 0,5)', m: [2, 0, 0, 0.5] },
        cis: { label: 'Cisalhamento', m: [1, 1, 0, 1] },
        proj: { label: 'Projeção no eixo x', m: [1, 0, 0, 0] },
        sing: { label: 'Singular (det = 0)', m: [1, 2, 0.5, 1] },
        sim: { label: 'Simétrica (autovetores ortogonais)', m: [2, 1, 1, 2] },
        geral: { label: 'Geral', m: [4, 1, 2, 3] }
    };
    const SHAPE = [[0, 0], [0, 2], [1.2, 2], [1.2, 1.6], [0.4, 1.6], [0.4, 1.2], [1, 1.2], [1, 0.8], [0.4, 0.8], [0.4, 0]].map(([x, y]) => [x - 3, y + 0.5]);

    function initTransformacoes(root) {
        const cell = (id, v) => '<input class="plain-in" id="tf-' + id + '" value="' + v + '" spellcheck="false" autocomplete="off" style="text-align:center" aria-label="entrada ' + id + '">';
        root.innerHTML =
            '<div class="lab-grid">' +
              '<div class="lab-stage"><canvas id="tf-cv"></canvas></div>' +
              '<div class="lab-side">' +
                '<div class="ctl"><label for="tf-pre">Transformação</label><select id="tf-pre">' +
                  Object.keys(TPRESETS).map(k => '<option value="' + k + '"' + (k === 'geral' ? ' selected' : '') + '>' + TPRESETS[k].label + '</option>').join('') + '</select></div>' +
                '<div class="ctl"><label>Matriz ' + T('A') + ' (aceita 1/2, −3, 0,5)</label>' +
                  '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">' + cell('a', 4) + cell('b', 1) + cell('c', 2) + cell('d', 3) + '</div></div>' +
                '<div class="ctl" id="tf-w-th" hidden><label for="tf-th">' + T('\\theta') + ' = <b id="tf-th-v"></b></label><input id="tf-th" type="range" min="-180" max="180" step="5" value="45"></div>' +
                '<div class="ctl"><label for="tf-t">Animação: de ' + T('I') + ' até ' + T('A') + ' (<b id="tf-t-v"></b>)</label><input id="tf-t" type="range" min="0" max="1" step="0.01" value="1"></div>' +
                '<div class="ctl-row" style="display:flex;gap:6px;flex-wrap:wrap"><button class="btn small" id="tf-play" type="button"><i class="fa-solid fa-play"></i> Animar</button>' +
                  '<label style="display:flex;align-items:center;gap:6px;font-size:.82rem;color:var(--muted)"><input type="checkbox" id="tf-eig" checked> autovetores</label></div>' +
                '<div class="readout">' +
                  '<div class="wide"><span>Matriz</span><b class="tex-line" id="tf-mat"></b></div>' +
                  '<div><span>' + T('\\det A') + ' (fator de área)</span><b id="tf-det"></b></div>' +
                  '<div><span>Traço</span><b id="tf-tr"></b></div>' +
                  '<div class="wide"><span>Autovalores</span><b id="tf-eigv" style="font-family:var(--sans);font-size:.9rem"></b></div>' +
                  '<div class="wide"><span>Diagnóstico</span><b id="tf-diag" style="font-family:var(--sans);font-size:.86rem;font-weight:600"></b></div>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<div class="lab-under"><div class="lab-note"><strong>Legenda.</strong> Seta <b style="color:#34d399">verde</b>: ' + T('A\\vec e_1') + ' (1ª coluna). Seta <b style="color:#fbbf24">amarela</b>: ' + T('A\\vec e_2') + ' (2ª coluna). ' +
              'O paralelogramo é a imagem do quadrado unitário: área ' + T('= |\\det A|') + ', <b style="color:#38bdf8">azul</b> se a orientação se mantém, <b style="color:#f472b6">rosa</b> se inverte. A letra F mostra a orientação: se ela aparece espelhada, ' + T('\\det A < 0') + '.</div>' +
              '<div class="lab-note"><strong>Experimente.</strong> (1) Rotação: a área nunca muda. (2) Singular: o plano inteiro cai numa reta, e não há como desfazer. (3) Simétrica: as retas tracejadas (autovetores) são perpendiculares, e os vetores sobre elas só esticam. ' +
              '<p class="muted-p">As colunas da matriz são exatamente para onde vão ' + T('\\vec e_1') + ' e ' + T('\\vec e_2') + ': mude ' + T('a') + ' e ' + T('c') + ' e veja só a seta verde se mover.</p></div></div>';

        const S = k => $('#tf-' + k, root);
        const plot = new Plot(S('cv'));
        let raf = 0;

        /* a caixa mostra 3 casas, mas guardamos o valor exato do preset (ex.: cos 45°) enquanto ela não for editada */
        function matrix() { return ['a', 'b', 'c', 'd'].map(k => { const el = S(k); return el.dataset.shown === el.value ? +el.dataset.exact : readNum(el.value); }); }
        function setMatrix(m) { ['a', 'b', 'c', 'd'].forEach((k, i) => { const el = S(k); el.value = String(+m[i].toFixed(3)).replace('.', ','); el.dataset.shown = el.value; el.dataset.exact = String(m[i]); el.classList.remove('bad'); }); }
        function applyPreset() {
            const p = S('pre').value;
            S('w-th').hidden = p !== 'rot';
            if (p === 'rot') { const t = +S('th').value * Math.PI / 180; setMatrix([Math.cos(t), -Math.sin(t), Math.sin(t), Math.cos(t)]); }
            else if (TPRESETS[p].m) setMatrix(TPRESETS[p].m);
            update();
        }
        function update() {
            const m = matrix();
            ['a', 'b', 'c', 'd'].forEach((k, i) => S(k).classList.toggle('bad', m[i] === null));
            S('th-v').textContent = S('th').value + '°';
            S('t-v').textContent = String(+(+S('t').value).toFixed(2)).replace('.', ',');
            if (m.some(v => v === null)) { S('diag').textContent = 'Há uma entrada inválida.'; return; }
            const [a, b, c, d] = m, e = eigen2(a, b, c, d), det = a * d - b * c;
            S('mat').innerHTML = T('A = ' + bmat([[n3(a), n3(b)], [n3(c), n3(d)]]));
            S('det').textContent = fmt(det, 4); S('tr').textContent = fmt(a + d, 4);
            S('eigv').innerHTML = eigenTex(e);
            const msgs = [];
            if (Math.abs(det) < 1e-9) msgs.push('det = 0: achata o plano (em uma reta ou num ponto). Não tem inversa.');
            else {
                msgs.push(det < 0 ? 'Inverte a orientação (como um espelho).' : 'Mantém a orientação.');
                msgs.push(Math.abs(Math.abs(det) - 1) < 1e-9 ? 'Preserva áreas.' : 'Multiplica áreas por ' + fmt(Math.abs(det), 3) + '.');
                const orth = Math.abs(a * b + c * d) < 1e-9 && Math.abs(a * a + c * c - 1) < 1e-9 && Math.abs(b * b + d * d - 1) < 1e-9;
                if (orth) msgs.push('Matriz ortogonal: preserva comprimentos e ângulos.');
            }
            if (e.complex) msgs.push('Sem autovetores reais: toda direção gira.');
            S('diag').textContent = msgs.join(' ');
            draw();
        }
        function draw() {
            if (!plot.fit()) return;
            const m = matrix(); if (m.some(v => v === null)) return;
            const t = +S('t').value, A = [1 - t + t * m[0], t * m[1], t * m[2], 1 - t + t * m[3]];
            const map = (x, y) => [A[0] * x + A[1] * y, A[2] * x + A[3] * y];
            squareView(plot, 5);
            plot.clear(); plot.grid();
            const c = plot.ctx, [x0, x1, y0, y1] = plot.view, R = Math.ceil(Math.max(x1, y1)) + 6;
            /* grade transformada */
            c.save(); c.lineWidth = 1; c.strokeStyle = 'rgba(129,140,248,.38)';
            for (let k = -R; k <= R; k++) {
                let p = map(k, -R), q = map(k, R); c.beginPath(); c.moveTo(plot.X(p[0]), plot.Y(p[1])); c.lineTo(plot.X(q[0]), plot.Y(q[1])); c.stroke();
                p = map(-R, k); q = map(R, k); c.beginPath(); c.moveTo(plot.X(p[0]), plot.Y(p[1])); c.lineTo(plot.X(q[0]), plot.Y(q[1])); c.stroke();
            }
            c.restore();
            /* quadrado unitário → paralelogramo */
            const det = A[0] * A[3] - A[1] * A[2];
            const sq = [[0, 0], [1, 0], [1, 1], [0, 1]].map(([x, y]) => map(x, y));
            c.save(); c.beginPath(); sq.forEach(([x, y], i) => i ? c.lineTo(plot.X(x), plot.Y(y)) : c.moveTo(plot.X(x), plot.Y(y))); c.closePath();
            c.fillStyle = det >= 0 ? 'rgba(56,189,248,.28)' : 'rgba(244,114,182,.30)'; c.fill();
            c.strokeStyle = det >= 0 ? 'rgba(56,189,248,.9)' : 'rgba(244,114,182,.9)'; c.lineWidth = 1.5; c.stroke(); c.restore();
            /* letra F */
            c.save(); c.beginPath(); SHAPE.forEach(([x, y], i) => { const [u, v] = map(x, y); i ? c.lineTo(plot.X(u), plot.Y(v)) : c.moveTo(plot.X(u), plot.Y(v)); }); c.closePath();
            c.fillStyle = 'rgba(167,139,250,.35)'; c.fill(); c.strokeStyle = '#c4b5fd'; c.lineWidth = 1.5; c.stroke(); c.restore();
            /* autovetores da matriz final */
            if (S('eig').checked && t > 0.999) {
                const e = eigen2(m[0], m[1], m[2], m[3]);
                e.vecs.forEach((v, i) => {
                    plot.line(-v[0] * 40, -v[1] * 40, v[0] * 40, v[1] * 40, 'rgba(52,211,153,.55)', 1.6, [7, 6]);
                    const L = Math.min(x1, y1) * .82;
                    c.save(); c.fillStyle = '#6ee7b7'; c.font = '600 12px "JetBrains Mono", monospace'; c.textAlign = 'center';
                    const sgn = v[1] < -1e-9 || (Math.abs(v[1]) < 1e-9 && v[0] < 0) ? -1 : 1;
                    c.fillText('λ=' + String(+e.vals[i].toFixed(2)).replace('.', ','), plot.X(sgn * v[0] * L), plot.Y(sgn * v[1] * L) - 8); c.restore();
                });
            }
            /* setas das colunas */
            const e1 = map(1, 0), e2 = map(0, 1);
            arrow(plot, 0, 0, e1[0], e1[1], '#34d399', 3.2, 'Ae₁');
            arrow(plot, 0, 0, e2[0], e2[1], '#fbbf24', 3.2, 'Ae₂');
        }
        plot.redraw = draw;

        S('pre').addEventListener('change', applyPreset);
        S('th').addEventListener('input', applyPreset);
        ['a', 'b', 'c', 'd'].forEach(k => S(k).addEventListener('input', () => { S('pre').value = 'custom'; S('w-th').hidden = true; update(); }));
        S('t').addEventListener('input', () => { S('t-v').textContent = String(+(+S('t').value).toFixed(2)).replace('.', ','); draw(); });
        S('eig').addEventListener('change', draw);
        S('play').addEventListener('click', () => {
            cancelAnimationFrame(raf); const t0 = performance.now();
            const step = now => { const t = Math.min(1, (now - t0) / 1600); S('t').value = t; S('t-v').textContent = String(+t.toFixed(2)).replace('.', ','); draw(); if (t < 1) raf = requestAnimationFrame(step); };
            raf = requestAnimationFrame(step);
        });
        applyPreset();
        return draw;
    }

    /* =========================================================
       ESCALONAMENTO (frações exatas)
       ========================================================= */
    const EPRESETS = [
        { label: 'SPD 3×3', rows: '1 2 -1 3\n2 5 1 9\n-1 1 4 6', right: 1 },
        { label: 'SPI', rows: '1 2 0 4\n2 4 1 9\n1 2 1 5', right: 1 },
        { label: 'SI', rows: '1 -1 1 1\n2 -2 2 5', right: 1 },
        { label: 'Com frações', rows: '2 3 1\n4 1 -3', right: 1 },
        { label: 'Inversa [A | I]', rows: '1 2 0 1 0 0\n0 1 0 0 1 0\n2 0 1 0 0 1', right: 3 },
        { label: 'Núcleo (homogêneo)', rows: '1 2 0 3\n2 4 1 8', right: 0 }
    ];
    const cloneM = M => M.map(r => r.slice());
    function opTex(op) {
        if (op.t === 'swap') return 'L_' + (op.i + 1) + ' \\leftrightarrow L_' + (op.j + 1);
        if (op.t === 'scale') return 'L_' + (op.i + 1) + ' \\leftarrow ' + (op.k.eq(-1) ? '-' : op.k.ptex()) + 'L_' + (op.i + 1);
        const k = op.k, sign = k.n < 0 ? ' - ' : ' + ', abs = k.n < 0 ? k.neg() : k;
        return 'L_' + (op.i + 1) + ' \\leftarrow L_' + (op.i + 1) + sign + (abs.eq(1) ? '' : abs.tex()) + 'L_' + (op.j + 1);
    }
    function applyOp(M, op) {
        const N = cloneM(M);
        if (op.t === 'swap') { const t = N[op.i]; N[op.i] = N[op.j]; N[op.j] = t; }
        else if (op.t === 'scale') N[op.i] = N[op.i].map(v => v.mul(op.k));
        else N[op.i] = N[op.i].map((v, c) => v.add(op.k.mul(N[op.j][c])));
        return N;
    }
    /* próximo passo de Gauss-Jordan (null se já está na forma reduzida) */
    function nextStep(M, ncoef) {
        let r = 0;
        for (let c = 0; c < ncoef && r < M.length; c++) {
            let p = -1;
            for (let i = r; i < M.length; i++) if (!M[i][c].isZero()) { p = i; break; }
            if (p < 0) continue;
            if (p !== r) return { t: 'swap', i: r, j: p, why: 'Traga para a linha ' + (r + 1) + ' um número não nulo da coluna ' + (c + 1) + ' (será o pivô).' };
            if (!M[r][c].eq(1)) return { t: 'scale', i: r, k: M[r][c].inv(), why: 'Deixe o pivô igual a 1 dividindo a linha ' + (r + 1) + ' por ' + T(M[r][c].ptex()) + '.' };
            for (let i = 0; i < M.length; i++) {
                if (i !== r && !M[i][c].isZero()) return { t: 'comb', i, j: r, k: M[i][c].neg(), why: 'Zere o ' + T(M[i][c].tex()) + ' da linha ' + (i + 1) + ' usando o pivô da linha ' + (r + 1) + (i > r ? '.' : ' (agora acima do pivô: é a parte "Jordan").') };
            }
            r++;
        }
        return null;
    }
    function rref(M, ncoef) { let N = cloneM(M), op, guard = 0; while ((op = nextStep(N, ncoef)) && guard++ < 500) N = applyOp(N, op); return N; }
    function lead(row, ncoef) { for (let c = 0; c < ncoef; c++) if (!row[c].isZero()) return c; return Infinity; }
    function isEchelon(M, ncoef) {
        let prev = -1, sawEmpty = false;
        for (const row of M) {
            const l = lead(row, ncoef);
            if (l === Infinity) { sawEmpty = true; continue; }
            if (sawEmpty || l <= prev) return false;
            prev = l;
        }
        return true;
    }
    function isReduced(M, ncoef) {
        if (!isEchelon(M, ncoef)) return false;
        return M.every(row => { const l = lead(row, ncoef); if (l === Infinity) return true; return row[l].eq(1) && M.every(o => o === row || o[l].isZero()); });
    }
    /* determinante exato (por eliminação) */
    function detExact(A) {
        const n = A.length; let N = cloneM(A), det = F(1);
        for (let c = 0; c < n; c++) {
            let p = -1; for (let i = c; i < n; i++) if (!N[i][c].isZero()) { p = i; break; }
            if (p < 0) return F(0);
            if (p !== c) { const t = N[p]; N[p] = N[c]; N[c] = t; det = det.neg(); }
            det = det.mul(N[c][c]);
            for (let i = c + 1; i < n; i++) { const k = N[i][c].div(N[c][c]); N[i] = N[i].map((v, j) => v.sub(k.mul(N[c][j]))); }
        }
        return det;
    }
    const VARS = ['x', 'y', 'z', 'w'];
    const vname = (j, n) => n <= 4 ? VARS[j] : 'x_' + (j + 1);
    function analyze(M, ncoef, right) {
        const R = rref(M, ncoef), out = {};
        const pivCols = R.map(r => lead(r, ncoef)).filter(l => l !== Infinity);
        out.rank = pivCols.length;
        if (right === 1) {
            const bad = R.some(r => lead(r, ncoef) === Infinity && !r[ncoef].isZero());
            if (bad) { out.cls = 'SI'; out.text = 'Sistema impossível (SI): há uma linha do tipo 0 = b com b ≠ 0.'; return out; }
            const free = []; for (let c = 0; c < ncoef; c++) if (!pivCols.includes(c)) free.push(c);
            const params = ['t', 's', 'u', 'v'];
            if (!free.length) {
                out.cls = 'SPD';
                const sol = new Array(ncoef); R.forEach(r => { const l = lead(r, ncoef); if (l !== Infinity) sol[l] = r[ncoef]; });
                out.text = 'Sistema possível e determinado (SPD). Solução única:';
                out.tex = '(' + sol.map(v => v.tex()).join(',\\ ') + ')';
                out.sol = sol;
            } else {
                out.cls = 'SPI';
                out.text = 'Sistema possível e indeterminado (SPI), com ' + (free.length === 1 ? 'uma variável livre' : free.length + ' variáveis livres') + ': ' + free.map((c, i) => vname(c, ncoef) + ' = ' + params[i]).join(', ') + '.';
                const exprs = [];
                for (let c = 0; c < ncoef; c++) {
                    const fi = free.indexOf(c);
                    if (fi >= 0) { exprs.push(params[fi]); continue; }
                    const r = R.find(row => lead(row, ncoef) === c);
                    let s = r[ncoef].isZero() ? '' : r[ncoef].tex();
                    free.forEach((fc, i) => { const k = r[fc].neg(); if (k.isZero()) return; const abs = k.n < 0 ? k.neg() : k; s += (k.n < 0 ? ' - ' : (s ? ' + ' : '')) + (abs.eq(1) ? '' : abs.tex()) + params[i]; });
                    exprs.push(s || '0');
                }
                out.tex = '(' + exprs.join(',\\ ') + ')';
            }
        } else if (right === 0) {
            out.text = 'O núcleo tem dimensão ' + (ncoef - out.rank) + ' (teorema do posto: ' + out.rank + ' + ' + (ncoef - out.rank) + ' = ' + ncoef + ').';
        } else if (right === ncoef && M.length === ncoef) {
            const inv = out.rank === ncoef;
            out.text = inv ? 'A matriz da esquerda é inversível: quando ela virar I, o lado direito será a inversa.' : 'A matriz da esquerda não é inversível (posto ' + out.rank + ' < ' + ncoef + ').';
        }
        return out;
    }

    function initEscalonamento(root) {
        root.innerHTML =
            '<div class="lab-grid">' +
              '<div class="lab-side" style="gap:14px">' +
                '<div id="es-mat" style="font-size:1.45rem;overflow-x:auto;text-align:center;padding:14px 0;min-height:150px;display:flex;align-items:center;justify-content:center"></div>' +
                '<div class="ctl" style="display:flex;gap:10px;flex-wrap:wrap;align-items:end">' +
                  '<div><label for="es-i">Linha ' + T('i') + '</label><select id="es-i" style="width:90px"></select></div>' +
                  '<div><label for="es-j">Linha ' + T('j') + '</label><select id="es-j" style="width:90px"></select></div>' +
                  '<div><label for="es-k">Número ' + T('k') + '</label><input class="plain-in" id="es-k" value="-2" spellcheck="false" autocomplete="off" style="width:110px"></div>' +
                  '<div class="ops" id="es-ops" style="flex:1;min-width:260px">' +
                    '<button type="button" data-op="swap">' + T('L_i \\leftrightarrow L_j') + '</button>' +
                    '<button type="button" data-op="scale">' + T('L_i \\leftarrow k\\,L_i') + '</button>' +
                    '<button type="button" data-op="comb">' + T('L_i \\leftarrow L_i + k\\,L_j') + '</button></div></div>' +
                '<div style="display:flex;gap:6px;flex-wrap:wrap">' +
                  '<button class="btn small" id="es-hintbtn" type="button"><i class="fa-regular fa-lightbulb"></i> Dica</button>' +
                  '<button class="btn small" id="es-step" type="button"><i class="fa-solid fa-forward-step"></i> Fazer o próximo passo</button>' +
                  '<button class="btn small" id="es-undo" type="button"><i class="fa-solid fa-rotate-left"></i> Desfazer</button></div>' +
                '<div class="readout" style="margin-top:0"><div class="wide"><span>Situação</span><b id="es-msg" style="font-family:var(--sans);font-size:.92rem;font-weight:600"></b></div></div>' +
              '</div>' +
              '<div class="lab-side" style="gap:12px">' +
                '<div class="ctl"><label for="es-in">Matriz (uma linha por equação; separe com espaço)</label>' +
                  '<textarea id="es-in" class="plain-in" rows="4" spellcheck="false" style="resize:vertical;line-height:1.5"></textarea>' +
                  '<div class="fn-hint" id="es-hint">Aceita frações (1/2), negativos e decimais com vírgula. Até 5 linhas e 7 colunas.</div></div>' +
                '<div class="ctl"><label for="es-right">Colunas à direita do traço</label><select id="es-right">' +
                  '<option value="0">0 (só a matriz)</option><option value="1" selected>1 (sistema)</option><option value="2">2</option><option value="3">3 (para a inversa 3×3)</option></select></div>' +
                '<button class="btn small primary" id="es-load" type="button"><i class="fa-solid fa-table-cells"></i> Carregar matriz</button>' +
                '<div class="ctl"><label>Exemplos prontos</label><div class="presets" id="es-pre">' + EPRESETS.map((p, i) => '<button type="button" data-i="' + i + '">' + p.label + '</button>').join('') + '</div></div>' +
              '</div>' +
            '</div>' +
            '<div class="lab-under"><div class="lab-note"><strong>Operações feitas</strong><ol id="es-hist" style="margin:.6em 0 0;padding-left:1.3em"></ol></div>' +
              '<div class="lab-note"><strong>Como usar.</strong> Escolha as linhas e o número ' + T('k') + ' e clique na operação. Os pivôs aparecem em <b style="color:#34d399">verde</b>. Quando a matriz estiver <em>escalonada</em>, o painel classifica o sistema; quando estiver <em>reduzida</em>, mostra a solução. ' +
              '<p class="muted-p">Travou? "Dica" explica o próximo passo de Gauss-Jordan sem fazê-lo; "Fazer o próximo passo" executa. Tente primeiro sozinho: as contas exatas com frações são o objetivo do treino.</p></div></div>';

        const S = k => $('#es-' + k, root);
        let M = null, right = 1, hist = [], orig = null;
        const ncoef = () => M[0].length - right;

        function matTex(A) {
            const nc = A[0].length - right, piv = new Set();
            if (isEchelon(A, nc)) A.forEach((r, i) => { const l = lead(r, nc); if (l !== Infinity) piv.add(i + ',' + l); });
            const spec = 'c'.repeat(nc) + (right ? ':' + 'c'.repeat(right) : '');
            return '\\left[\\begin{array}{' + spec + '}' + A.map((r, i) => r.map((v, j) => piv.has(i + ',' + j) ? '\\color{#34d399}{' + v.tex() + '}' : v.tex()).join(' & ')).join(' \\\\ ') + '\\end{array}\\right]';
        }
        function load(text, r) {
            const rows = String(text).trim().split(/\n+/).map(l => l.trim()).filter(Boolean).map(l => l.split(/[\s;]+/).filter(Boolean));
            const msg = s => { S('hint').className = 'fn-hint err'; S('hint').textContent = s; };
            if (!rows.length) return msg('Digite pelo menos uma linha.');
            if (rows.length > 5) return msg('No máximo 5 linhas.');
            const w = rows[0].length;
            if (rows.some(row => row.length !== w)) return msg('Todas as linhas precisam ter o mesmo número de entradas.');
            if (w > 7) return msg('No máximo 7 colunas.');
            if (r >= w) return msg('Sobrou pouca coluna à esquerda do traço: diminua as colunas à direita.');
            const parsed = rows.map(row => row.map(parseNum));
            if (parsed.some(row => row.some(v => v === null))) return msg('Há uma entrada que não é número. Use 2, −3, 1/2 ou 0,5.');
            M = parsed; orig = cloneM(M); right = r; hist = [];
            S('hint').className = 'fn-hint'; S('hint').textContent = 'Carregada: ' + M.length + ' × ' + w + (right ? ' (' + right + ' à direita do traço)' : '') + '.';
            const opts = M.map((_, i) => '<option value="' + i + '">L' + (i + 1) + '</option>').join('');
            S('i').innerHTML = opts; S('j').innerHTML = opts; if (M.length > 1) S('i').value = '1';
            render();
        }
        function message(html, cls) { S('msg').innerHTML = html; S('msg').style.color = cls === 'ok' ? 'var(--green)' : cls === 'no' ? 'var(--red)' : ''; }
        function render() {
            S('mat').innerHTML = T(matTex(M), true);
            S('hist').innerHTML = hist.length ? hist.map(h => '<li style="margin:.3em 0">' + T(h.tex) + '</li>').join('') : '<li class="muted-p" style="list-style:none;margin-left:-1.3em">Nenhuma ainda.</li>';
            const nc = ncoef(), ech = isEchelon(M, nc), red = isReduced(M, nc), info = analyze(M, nc, right);
            let html = '';
            if (red) html = '<i class="fa-solid fa-circle-check"></i> Forma escalonada <b>reduzida</b>. ';
            else if (ech) html = '<i class="fa-solid fa-check"></i> Forma escalonada (ainda não reduzida). ';
            else html = 'Ainda não está escalonada. ';
            if (ech) {
                html += 'Posto ' + info.rank + '. ';
                if (info.text) html += info.text + ' ';
                if (info.tex && (red || info.cls !== 'SPD')) html += T((info.cls === 'SPI' ? '(' + Array.from({ length: nc }, (_, j) => vname(j, nc)).join(',\\ ') + ') = ' : '') + info.tex);
                else if (info.cls === 'SPD') html += 'Continue até a forma reduzida (ou faça a substituição regressiva) para ler a solução.';
                if (right === nc && M.length === nc && red && info.rank === nc) html += ' O lado direito é ' + T('A^{-1}') + '.';
            }
            if (right === 0 && M.length === nc) html += ' ' + T('\\det A = ' + detExact(orig).tex()) + ' (da matriz original).';
            message(html, red ? 'ok' : '');
        }
        function doOp(op) {
            hist.push({ tex: opTex(op), prev: M });
            M = applyOp(M, op); render();
        }
        function manual(t) {
            if (!M) return;
            const i = +S('i').value, j = +S('j').value, k = parseNum(S('k').value);
            if (t === 'swap') { if (i === j) return message('Escolha duas linhas diferentes para trocar.', 'no'); return doOp({ t, i, j }); }
            if (!k) return message('Não entendi o número ' + T('k') + '. Use 2, −3, 1/2 ou 0,5.', 'no');
            if (t === 'scale') { if (k.isZero()) return message('Multiplicar uma linha por 0 não é operação elementar: apaga a equação.', 'no'); return doOp({ t, i, k }); }
            if (i === j) return message('Em ' + T('L_i \\leftarrow L_i + k\\,L_j') + ', as linhas precisam ser diferentes.', 'no');
            if (k.isZero()) return message('Com ' + T('k = 0') + ' nada muda. Escolha outro número.', 'no');
            doOp({ t, i, j, k });
        }

        S('ops').addEventListener('click', e => { const b = e.target.closest('button'); if (b) manual(b.dataset.op); });
        S('hintbtn').addEventListener('click', () => { const op = nextStep(M, ncoef()); if (op) message('<i class="fa-regular fa-lightbulb"></i> ' + op.why + ' Operação: ' + T(opTex(op)) + '.'); else render(); });
        S('step').addEventListener('click', () => { const op = nextStep(M, ncoef()); if (op) doOp(op); else render(); });
        S('undo').addEventListener('click', () => { if (!hist.length) return; M = hist.pop().prev; render(); });
        S('load').addEventListener('click', () => load(S('in').value, +S('right').value));
        S('pre').addEventListener('click', e => {
            const b = e.target.closest('button'); if (!b) return;
            const p = EPRESETS[+b.dataset.i]; S('in').value = p.rows; S('right').value = String(p.right); load(p.rows, p.right);
        });
        S('in').value = EPRESETS[0].rows;
        load(EPRESETS[0].rows, 1);
        return () => {};
    }

    /* =========================================================
       CAÇADOR DE AUTOVETORES
       ========================================================= */
    const APRESETS = [
        { label: 'Simétrica [[2,1],[1,2]]', m: [2, 1, 1, 2] },
        { label: 'Geral [[4,1],[2,3]]', m: [4, 1, 2, 3] },
        { label: 'Triangular [[3,1],[0,2]]', m: [3, 1, 0, 2] },
        { label: 'Autovalor negativo [[1,2],[2,−2]]', m: [1, 2, 2, -2] },
        { label: 'Cisalhamento [[1,1],[0,1]]', m: [1, 1, 0, 1] },
        { label: 'Rotação de 90°', m: [0, -1, 1, 0] },
        { label: 'Markov [[0,9; 0,2],[0,1; 0,8]]', m: [0.9, 0.2, 0.1, 0.8] }
    ];
    function initAutovetores(root) {
        root.innerHTML =
            '<div class="lab-grid">' +
              '<div class="lab-stage"><canvas id="av-cv" style="cursor:crosshair"></canvas></div>' +
              '<div class="lab-side">' +
                '<div class="ctl"><label for="av-pre">Matriz</label><select id="av-pre">' + APRESETS.map((p, i) => '<option value="' + i + '">' + p.label + '</option>').join('') + '</select></div>' +
                '<div class="ctl"><label for="av-phi">Direção de ' + T('\\vec v') + ': <b id="av-phi-v"></b> (ou arraste no gráfico)</label><input id="av-phi" type="range" min="0" max="360" step="any" value="30"></div>' +
                '<div class="readout" style="margin-top:0">' +
                  '<div class="wide"><span>Matriz</span><b class="tex-line" id="av-mat"></b></div>' +
                  '<div><span>' + T('\\vec v') + '</span><b id="av-v"></b></div><div><span>' + T('A\\vec v') + '</span><b id="av-av"></b></div>' +
                  '<div class="wide"><span>Ângulo entre ' + T('\\vec v') + ' e ' + T('A\\vec v') + '</span><b id="av-ang"></b></div>' +
                '</div>' +
                '<div class="challenge"><p id="av-ch"></p><div class="row">' +
                  '<button class="btn small" id="av-show" type="button"><i class="fa-regular fa-eye"></i> Mostrar autovetores</button>' +
                  '<button class="btn small" id="av-pow" type="button"><i class="fa-solid fa-repeat"></i> Aplicar ' + T('A') + ' de novo</button></div>' +
                  '<div class="verdict" id="av-verdict"></div></div>' +
              '</div>' +
            '</div>' +
            '<div class="lab-under"><div class="lab-note"><strong>Missão.</strong> Gire ' + T('\\vec v') + ' (seta <b style="color:#38bdf8">azul</b>) até ' + T('A\\vec v') + ' (seta <b style="color:#fbbf24">amarela</b>) ficar na <b>mesma reta</b>. Nessa direção, ' + T('A\\vec v = \\lambda\\vec v') + ': você achou um autovetor. Com ' + T('\\lambda < 0') + ', as setas ficam opostas.' +
              '<p class="muted-p">A elipse é a imagem do círculo unitário: os autovetores de uma matriz simétrica apontam para os eixos dela.</p></div>' +
              '<div class="lab-note"><strong>Aplicar de novo (método da potência).</strong> Cada clique troca ' + T('\\vec v') + ' por ' + T('A\\vec v') + ' normalizado. Repetindo, ' + T('\\vec v') + ' gira em direção ao autovetor do autovalor de maior módulo. É assim que o PageRank do Google e muitos programas calculam autovetores de matrizes enormes. ' +
              '<p class="muted-p">Na rotação, nada converge: não há direção que fique parada. No cisalhamento só há uma.</p></div></div>';

        const S = k => $('#av-' + k, root);
        const plot = new Plot(S('cv'));
        let m = APRESETS[0].m, eig = null, found = new Set(), revealed = false, trail = [];

        function vec() { const p = +S('phi').value * Math.PI / 180; return [Math.cos(p), Math.sin(p)]; }
        function Av(v) { return [m[0] * v[0] + m[1] * v[1], m[2] * v[0] + m[3] * v[1]]; }
        function setMatrix() {
            m = APRESETS[+S('pre').value].m; eig = eigen2(...m); found = new Set(); revealed = false; trail = [];
            S('mat').innerHTML = T('A = ' + bmat([[n3(m[0]), n3(m[1])], [n3(m[2]), n3(m[3])]]));
            const goal = eig.complex ? 'Esta matriz não tem autovetores reais. Tente mesmo assim e veja por quê.' : eig.scalar ? 'Toda direção é autovetor desta matriz.' : 'Encontre ' + (eig.vecs.length === 1 ? 'a única direção' : 'as ' + eig.vecs.length + ' direções') + ' de autovetores.';
            S('ch').innerHTML = '<b>Desafio.</b> ' + goal;
            S('verdict').textContent = ''; S('verdict').className = 'verdict';
            update();
        }
        function update() {
            const v = vec(), w = Av(v), nw = Math.hypot(w[0], w[1]);
            S('phi-v').textContent = fmt(+S('phi').value, 4) + '°';
            S('v').textContent = '(' + fmt(v[0], 3) + '; ' + fmt(v[1], 3) + ')';
            S('av').textContent = '(' + fmt(w[0], 3) + '; ' + fmt(w[1], 3) + ')';
            let ang = 0;
            if (nw > 1e-9) { ang = Math.acos(Math.max(-1, Math.min(1, (v[0] * w[0] + v[1] * w[1]) / nw))) * 180 / Math.PI; }
            S('ang').textContent = nw < 1e-9 ? 'A·v = 0 (v está no núcleo: λ = 0)' : fmt(ang, 3) + '°';
            const aligned = nw < 1e-9 || ang < 1.5 || ang > 178.5;
            if (aligned && !eig.complex) {
                const lam = nw < 1e-9 ? 0 : (v[0] * w[0] + v[1] * w[1]);
                const idx = eig.scalar ? 0 : eig.vals.reduce((best, l, i) => Math.abs(l - lam) < Math.abs(eig.vals[best] - lam) ? i : best, 0);
                found.add(idx);
                const total = eig.scalar ? 1 : eig.vecs.length;
                S('verdict').className = 'verdict ok';
                S('verdict').innerHTML = 'Autovetor! ' + T('A\\vec v \\approx ' + n3(eig.vals[idx]) + '\\,\\vec v') + (eig.vals[idx] < 0 ? ' (sentido invertido)' : '') + '. Encontradas: ' + Math.min(found.size, total) + ' de ' + total + '.' + (found.size >= total ? ' Missão cumprida!' : '');
            } else if (eig.complex) {
                S('verdict').className = 'verdict no';
                S('verdict').innerHTML = 'Nenhuma direção fica parada: ' + T('A\\vec v') + ' sempre sai da reta de ' + T('\\vec v') + '.';
            } else { S('verdict').className = 'verdict'; S('verdict').textContent = ''; }
            draw();
        }
        function draw() {
            if (!plot.fit()) return;
            const c = plot.ctx;
            const maxS = Math.max(1, ...[0, 1, 2, 3, 4, 5, 6, 7].map(i => { const t = i * Math.PI / 4, w = Av([Math.cos(t), Math.sin(t)]); return Math.hypot(w[0], w[1]); }), eig && eig.vals.length ? Math.max(...eig.vals.map(Math.abs)) : 1);
            squareView(plot, Math.max(2, maxS * 1.25));
            plot.clear(); plot.grid();
            /* círculo unitário e sua imagem */
            c.save(); c.lineWidth = 1.4;
            c.strokeStyle = 'rgba(56,189,248,.35)'; c.setLineDash([4, 5]); c.beginPath();
            for (let i = 0; i <= 120; i++) { const t = i / 120 * 2 * Math.PI; const X = plot.X(Math.cos(t)), Y = plot.Y(Math.sin(t)); i ? c.lineTo(X, Y) : c.moveTo(X, Y); } c.stroke();
            c.strokeStyle = 'rgba(251,191,36,.4)'; c.setLineDash([]); c.beginPath();
            for (let i = 0; i <= 120; i++) { const t = i / 120 * 2 * Math.PI, w = Av([Math.cos(t), Math.sin(t)]); const X = plot.X(w[0]), Y = plot.Y(w[1]); i ? c.lineTo(X, Y) : c.moveTo(X, Y); } c.stroke();
            c.restore();
            /* autovetores revelados ou encontrados */
            if (eig && !eig.complex && !eig.scalar) eig.vecs.forEach((u, i) => {
                if (!revealed && !found.has(i)) return;
                plot.line(-u[0] * 50, -u[1] * 50, u[0] * 50, u[1] * 50, 'rgba(52,211,153,.6)', 1.6, [7, 6]);
            });
            /* rastro do método da potência */
            trail.forEach((p, i) => plot.dot(p[0], p[1], 'rgba(167,139,250,' + (0.25 + 0.75 * (i + 1) / trail.length) + ')', 3.5));
            /* reta de v */
            const v = vec(), w = Av(v);
            plot.line(-v[0] * 50, -v[1] * 50, v[0] * 50, v[1] * 50, 'rgba(56,189,248,.18)', 1);
            arrow(plot, 0, 0, w[0], w[1], '#fbbf24', 3.4, 'Av');
            arrow(plot, 0, 0, v[0], v[1], '#38bdf8', 3.4, 'v');
        }
        plot.redraw = draw;

        function fromPointer(e) {
            const r = S('cv').getBoundingClientRect(), px = e.clientX - r.left, py = e.clientY - r.top;
            const [x0, x1, y0, y1] = plot.view, x = x0 + px / plot.w * (x1 - x0), y = y1 - py / plot.h * (y1 - y0);
            if (Math.hypot(x, y) < 1e-6) return;
            let deg = Math.atan2(y, x) * 180 / Math.PI; if (deg < 0) deg += 360;
            S('phi').value = String(Math.round(deg * 2) / 2 % 360); update();
        }
        let dragging = false;
        S('cv').addEventListener('pointerdown', e => { dragging = true; S('cv').setPointerCapture(e.pointerId); fromPointer(e); });
        S('cv').addEventListener('pointermove', e => { if (dragging) fromPointer(e); });
        S('cv').addEventListener('pointerup', () => { dragging = false; });
        S('phi').addEventListener('input', () => { trail = []; update(); });
        S('pre').addEventListener('change', setMatrix);
        S('show').addEventListener('click', () => { revealed = true; draw(); });
        S('pow').addEventListener('click', () => {
            const v = vec(), w = Av(v), n = Math.hypot(w[0], w[1]);
            if (n < 1e-9) { S('verdict').className = 'verdict no'; S('verdict').textContent = 'A·v = 0: não há direção para seguir (v está no núcleo).'; return; }
            trail.push(v); if (trail.length > 12) trail.shift();
            let deg = Math.atan2(w[1], w[0]) * 180 / Math.PI; if (deg < 0) deg += 360;
            S('phi').value = String(deg); update();
        });
        setMatrix();
        return draw;
    }

    return { init: { transformacoes: initTransformacoes, escalonamento: initEscalonamento, autovetores: initAutovetores }, eigen2, nextStep, applyOp, rref, isEchelon, isReduced, analyze, detExact };
})();
