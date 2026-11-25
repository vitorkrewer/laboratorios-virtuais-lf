/* Fundamentos: simuladores de Conjuntos (Venn), Intervalos e Inequações. */
window.MATH = window.MATH || {};

MATH.labs = (function () {
    'use strict';

    const { T, COLORS, Plot, fmt, parseExpr, compile, toTex } = MATH.plot;
    const $ = (s, r) => (r || document).querySelector(s);
    const esc = s => MATH.md.esc(s);

    /* ---------- canvas com DPR ---------- */
    function fitCanvas(cv) {
        const r = cv.getBoundingClientRect(), dpr = window.devicePixelRatio || 1;
        const w = Math.round(r.width), h = Math.round(r.height);
        if (!w || !h) return null;
        if (cv.width !== w * dpr || cv.height !== h * dpr) { cv.width = w * dpr; cv.height = h * dpr; }
        const ctx = cv.getContext('2d');
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        return { ctx, w, h, dpr };
    }
    function observe(cv, draw) { if (window.ResizeObserver) new ResizeObserver(() => draw()).observe(cv); }

    /* =========================================================
       Álgebra de intervalos: um conjunto é uma lista de
       { a, b, ca, cb } (extremos e se são fechados).
       ========================================================= */
    const IV = {
        make(a, b, ca, cb) {
            if (!Number.isFinite(a)) ca = false;
            if (!Number.isFinite(b)) cb = false;
            if (a > b || (a === b && !(ca && cb))) return [];
            return [{ a, b, ca, cb }];
        },
        norm(list) {
            const s = list.filter(i => i.a < i.b || (i.a === i.b && i.ca && i.cb)).map(i => Object.assign({}, i)).sort((x, y) => x.a - y.a || (y.ca - x.ca));
            const out = [];
            for (const i of s) {
                const cur = out[out.length - 1];
                if (cur && (i.a < cur.b || (i.a === cur.b && (cur.cb || i.ca)))) {
                    if (i.b > cur.b) { cur.b = i.b; cur.cb = i.cb; }
                    else if (i.b === cur.b) cur.cb = cur.cb || i.cb;
                    if (i.a === cur.a) cur.ca = cur.ca || i.ca;
                } else out.push(i);
            }
            return out;
        },
        union(A, B) { return IV.norm(A.concat(B)); },
        inter(A, B) {
            const out = [];
            for (const x of A) for (const y of B) {
                const a = Math.max(x.a, y.a), b = Math.min(x.b, y.b);
                const ca = x.a > y.a ? x.ca : y.a > x.a ? y.ca : x.ca && y.ca;
                const cb = x.b < y.b ? x.cb : y.b < x.b ? y.cb : x.cb && y.cb;
                out.push(...IV.make(a, b, ca, cb));
            }
            return IV.norm(out);
        },
        comp(A) {
            A = IV.norm(A);
            const out = []; let a = -Infinity, ca = false;
            for (const i of A) { out.push(...IV.make(a, i.a, ca, !i.ca)); a = i.b; ca = !i.cb; }
            out.push(...IV.make(a, Infinity, ca, false));
            return IV.norm(out);
        },
        diff(A, B) { return IV.inter(A, IV.comp(B)); },
        point(x) { return [{ a: x, b: x, ca: true, cb: true }]; },
        has(A, x) { return A.some(i => (x > i.a || (x === i.a && i.ca)) && (x < i.b || (x === i.b && i.cb))); }
    };

    /* número → TeX, reconhecendo inteiros e frações simples */
    function numTex(x, approx) {
        if (x === -Infinity) return { tex: '-\\infty', ap: false };
        if (x === Infinity) return { tex: '+\\infty', ap: false };
        const r = Math.round(x);
        if (Math.abs(x - r) < 1e-9) return { tex: String(r === 0 ? 0 : r), ap: false };
        for (let q = 2; q <= 12; q++) {
            const p = Math.round(x * q);
            if (Math.abs(x - p / q) < 1e-9) return { tex: (p < 0 ? '-' : '') + '\\tfrac{' + Math.abs(p) + '}{' + q + '}', ap: false };
        }
        const d = approx ? 3 : 4;
        return { tex: (+x.toFixed(d)).toString().replace('-', '-').replace('.', '{,}'), ap: !!approx };
    }
    function setTex(S, approx) {
        S = IV.norm(S);
        if (!S.length) return { tex: '\\varnothing', ap: false };
        let ap = false;
        const N = x => { const n = numTex(x, approx); ap = ap || n.ap; return n.tex; };
        // ℝ menos pontos isolados
        if (S[0].a === -Infinity && S[S.length - 1].b === Infinity && S.length > 1 &&
            S.every((s, k) => k === 0 || (S[k - 1].b === s.a && !S[k - 1].cb && !s.ca))) {
            return { tex: '\\mathbb{R} - \\{' + S.slice(1).map(s => N(s.a)).join(';\\ ') + '\\}', ap };
        }
        if (S.length === 1 && S[0].a === -Infinity && S[0].b === Infinity) return { tex: '\\mathbb{R}', ap: false };
        const parts = S.map(s => {
            if (s.a === s.b) return '\\{' + N(s.a) + '\\}';
            const L = N(s.a), R = N(s.b);
            const sep = /\{,\}/.test(L + R) ? ';\\ ' : ',\\ ';
            return (s.ca ? '[' : '(') + L + sep + R + (s.cb ? ']' : ')');
        });
        return { tex: parts.join(' \\cup '), ap };
    }

    /* desenha um conjunto de intervalos numa linha horizontal */
    function drawSetLine(ctx, S, y, X, x0, x1, color, label) {
        ctx.save();
        ctx.strokeStyle = 'rgba(148,163,184,.35)'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
        ctx.fillStyle = color; ctx.font = '700 13px "Outfit", sans-serif'; ctx.textAlign = 'right';
        ctx.fillText(label, x0 - 10, y + 4);
        for (const s of S) {
            const pa = s.a === -Infinity ? x0 : X(s.a), pb = s.b === Infinity ? x1 : X(s.b);
            ctx.strokeStyle = color; ctx.lineWidth = 6; ctx.lineCap = 'butt';
            ctx.beginPath(); ctx.moveTo(pa, y); ctx.lineTo(pb, y); ctx.stroke();
            const arrow = (px, dir) => { ctx.fillStyle = color; ctx.beginPath(); ctx.moveTo(px + dir * 10, y); ctx.lineTo(px - dir * 2, y - 8); ctx.lineTo(px - dir * 2, y + 8); ctx.closePath(); ctx.fill(); };
            if (s.a === -Infinity) arrow(x0, -1);
            if (s.b === Infinity) arrow(x1, 1);
            const dot = (px, closed) => {
                ctx.beginPath(); ctx.arc(px, y, 6.5, 0, Math.PI * 2);
                ctx.fillStyle = closed ? color : COLORS.bg; ctx.fill();
                ctx.lineWidth = 2.5; ctx.strokeStyle = color; ctx.stroke();
            };
            if (s.a !== -Infinity) dot(pa, s.ca);
            if (s.b !== Infinity && s.b !== s.a) dot(pb, s.cb);
        }
        ctx.restore();
    }

    /* =========================================================
       VENN
       ========================================================= */
    const OPS2 = [
        { tex: 'A\\cup B', f: (a, b) => a || b },
        { tex: 'A\\cap B', f: (a, b) => a && b },
        { tex: 'A-B', f: (a, b) => a && !b },
        { tex: 'B-A', f: (a, b) => b && !a },
        { tex: 'A\\,\\triangle\\,B', f: (a, b) => a !== b },
        { tex: 'A^c', f: a => !a },
        { tex: '(A\\cup B)^c', f: (a, b) => !(a || b) },
        { tex: 'A^c\\cap B^c', f: (a, b) => !a && !b },
        { tex: '(A\\cap B)^c', f: (a, b) => !(a && b) },
        { tex: 'A^c\\cup B^c', f: (a, b) => !a || !b }
    ];
    const OPS3 = [
        { tex: 'A\\cup B\\cup C', f: (a, b, c) => a || b || c },
        { tex: 'A\\cap B\\cap C', f: (a, b, c) => a && b && c },
        { tex: '(A\\cup B)\\cap C', f: (a, b, c) => (a || b) && c },
        { tex: 'A\\cap(B\\cup C)', f: (a, b, c) => a && (b || c) },
        { tex: '(A\\cap B)\\cup(A\\cap C)', f: (a, b, c) => (a && b) || (a && c) },
        { tex: 'A-(B\\cup C)', f: (a, b, c) => a && !(b || c) },
        { tex: '(A\\cap B)-C', f: (a, b, c) => a && b && !c },
        { tex: '(A\\cup B\\cup C)^c', f: (a, b, c) => !(a || b || c) },
        { tex: 'A\\cup(B\\cap C)', f: (a, b, c) => a || (b && c) }
    ];
    const SETC = { A: '#38bdf8', B: '#f472b6', C: '#fbbf24' };

    function parseList(s) {
        const seen = new Set(), out = [];
        s.split(/[,;\s]+/).map(t => t.trim()).filter(Boolean).forEach(t => { if (!seen.has(t)) { seen.add(t); out.push(t); } });
        return out;
    }
    function sortEls(arr) {
        return arr.slice().sort((x, y) => {
            const a = parseFloat(x.replace(',', '.')), b = parseFloat(y.replace(',', '.'));
            if (!isNaN(a) && !isNaN(b) && String(a) === x.replace(',', '.') && String(b) === y.replace(',', '.')) return a - b;
            return x.localeCompare(y, 'pt-BR', { numeric: true });
        });
    }

    function initVenn(root) {
        root.innerHTML =
            '<div class="lab-grid">' +
              '<div class="lab-stage"><canvas id="venn-cv" style="cursor:pointer"></canvas></div>' +
              '<div class="lab-side">' +
                '<div class="ctl"><label for="venn-mode">Diagrama</label><select id="venn-mode"><option value="2">Dois conjuntos (A, B)</option><option value="3">Três conjuntos (A, B, C)</option></select></div>' +
                '<div class="ctl venn-sets"><label class="su"><b>U</b><input id="venn-U" value="1 2 3 4 5 6 7 8 9 10 11 12" aria-label="Universo"></label>' +
                  '<label class="sa"><b>A</b><input id="venn-A" value="1 2 3 4 5 6" aria-label="Conjunto A"></label>' +
                  '<label class="sb"><b>B</b><input id="venn-B" value="4 5 6 7 8" aria-label="Conjunto B"></label>' +
                  '<label class="sc" id="venn-Cwrap" hidden><b>C</b><input id="venn-C" value="2 4 8 10 11" aria-label="Conjunto C"></label></div>' +
                '<div class="ctl"><label>Operação</label><div class="ops" id="venn-ops"></div></div>' +
                '<div class="readout"><div class="wide"><span id="venn-optitle">Resultado</span><b class="result-set" id="venn-res"></b></div></div>' +
                '<div class="challenge"><p id="venn-ch-text">Desafio: clique nas regiões do diagrama para pintar a operação pedida.</p>' +
                  '<div class="row"><button class="btn small" id="venn-new" type="button"><i class="fa-solid fa-dice"></i> Novo desafio</button>' +
                  '<button class="btn small" id="venn-check" type="button" hidden><i class="fa-solid fa-check"></i> Verificar</button>' +
                  '<button class="btn small ghost" id="venn-show" type="button" hidden>Ver resposta</button></div>' +
                  '<div class="verdict" id="venn-verdict"></div></div>' +
              '</div>' +
            '</div>' +
            '<div class="lab-under"><div class="lab-note"><strong>Como ler o diagrama.</strong> O retângulo é o universo ' + T('U') + '; cada círculo é um conjunto. ' +
              'A região pintada é a operação escolhida, e a lista ao lado mostra os elementos que caem nela.' +
              '<p class="muted-p">Separe os elementos por espaço ou vírgula. Elementos de A, B ou C que não estão em U são acrescentados ao universo.</p></div>' +
              '<div class="lab-note"><strong>Teste as leis de De Morgan.</strong> Compare as regiões de ' + T('(A\\cup B)^c') + ' e ' + T('A^c\\cap B^c') + ', e depois de ' + T('(A\\cap B)^c') + ' e ' + T('A^c\\cup B^c') + '. No modo de três conjuntos, compare ' + T('A\\cap(B\\cup C)') + ' com ' + T('(A\\cap B)\\cup(A\\cap C)') + ' (distributiva).</div></div>';

        const cv = $('#venn-cv', root);
        let three = false, opIdx = 1, challenge = null, picked = new Set(), geo = null;
        const ops = () => three ? OPS2.concat(OPS3) : OPS2;
        const inputs = ['U', 'A', 'B', 'C'].map(k => $('#venn-' + k, root));

        function buildOps() {
            $('#venn-ops', root).innerHTML = ops().map((o, i) => '<button type="button" data-i="' + i + '" class="' + (i === opIdx && !challenge ? 'active' : '') + '">' + T(o.tex) + '</button>').join('');
        }
        $('#venn-ops', root).addEventListener('click', e => {
            const b = e.target.closest('button'); if (!b) return;
            opIdx = +b.dataset.i; challenge = null; picked.clear(); resetChallengeUI(); buildOps(); draw();
        });

        function sets() {
            const A = parseList(inputs[1].value), B = parseList(inputs[2].value), C = three ? parseList(inputs[3].value) : [];
            const U = parseList(inputs[0].value);
            const all = new Set(U); A.concat(B, C).forEach(x => all.add(x));
            return { U: sortEls([...all]), A: new Set(A), B: new Set(B), C: new Set(C) };
        }

        function geometry(w, h) {
            const rect = { x: 14, y: 14, w: w - 28, h: h - 28 };
            let circles;
            if (!three) {
                const r = Math.min(h * 0.36, w * 0.24), cx = w / 2, cy = h / 2, d = r * 0.58;
                circles = [{ k: 'A', x: cx - d, y: cy, r }, { k: 'B', x: cx + d, y: cy, r }];
            } else {
                const r = Math.min(h * 0.3, w * 0.2), cx = w / 2, cy = h / 2 + r * 0.08, d = r * 0.62;
                circles = [{ k: 'A', x: cx - d, y: cy - d * 0.58, r }, { k: 'B', x: cx + d, y: cy - d * 0.58, r }, { k: 'C', x: cx, y: cy + d * 0.62, r }];
            }
            return { rect, circles };
        }
        const bitsAt = (x, y) => geo.circles.map(c => (x - c.x) ** 2 + (y - c.y) ** 2 <= c.r * c.r);
        const keyOf = bits => bits.reduce((k, b, i) => k + (b ? 1 << i : 0), 0);
        const inRect = (x, y) => x >= geo.rect.x && x <= geo.rect.x + geo.rect.w && y >= geo.rect.y && y <= geo.rect.y + geo.rect.h;
        const truthKeys = op => { const s = new Set(); for (let k = 0; k < (three ? 8 : 4); k++) { const b = [k & 1, k & 2, k & 4].map(Boolean); if (op.f(b[0], b[1], b[2])) s.add(k); } return s; };

        function draw() {
            const F = fitCanvas(cv); if (!F) return;
            const { ctx, w, h, dpr } = F;
            geo = geometry(w, h);
            const op = ops()[opIdx];
            const shade = challenge ? picked : truthKeys(op);
            // preenchimento por pixel
            const W = cv.width, H = cv.height, img = ctx.createImageData(W, H), d = img.data;
            const fill = challenge ? [251, 191, 36, 110] : [129, 140, 248, 120];
            const bg = [12, 18, 32, 255];
            const cs = geo.circles.map(c => ({ x: c.x * dpr, y: c.y * dpr, r2: (c.r * dpr) ** 2 }));
            const rx0 = geo.rect.x * dpr, ry0 = geo.rect.y * dpr, rx1 = (geo.rect.x + geo.rect.w) * dpr, ry1 = (geo.rect.y + geo.rect.h) * dpr;
            for (let py = 0; py < H; py++) for (let px = 0; px < W; px++) {
                let k = 0;
                for (let i = 0; i < cs.length; i++) if ((px - cs[i].x) ** 2 + (py - cs[i].y) ** 2 <= cs[i].r2) k |= 1 << i;
                const inside = px >= rx0 && px <= rx1 && py >= ry0 && py <= ry1;
                const col = inside && shade.has(k) ? fill : bg;
                const o = (py * W + px) * 4;
                d[o] = col[0]; d[o + 1] = col[1]; d[o + 2] = col[2]; d[o + 3] = 255;
                if (col === fill) { // mistura com o fundo
                    const a = fill[3] / 255;
                    d[o] = bg[0] + (fill[0] - bg[0]) * a; d[o + 1] = bg[1] + (fill[1] - bg[1]) * a; d[o + 2] = bg[2] + (fill[2] - bg[2]) * a;
                }
            }
            ctx.putImageData(img, 0, 0);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            // universo
            ctx.strokeStyle = 'rgba(203,213,225,.5)'; ctx.lineWidth = 1.5; ctx.strokeRect(geo.rect.x, geo.rect.y, geo.rect.w, geo.rect.h);
            ctx.fillStyle = 'rgba(203,213,225,.8)'; ctx.font = '700 16px "Outfit", sans-serif'; ctx.textAlign = 'left'; ctx.fillText('U', geo.rect.x + 10, geo.rect.y + 22);
            // círculos e rótulos
            geo.circles.forEach((c, i) => {
                ctx.strokeStyle = SETC[c.k]; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2); ctx.stroke();
                ctx.fillStyle = SETC[c.k]; ctx.font = '800 20px "Outfit", sans-serif'; ctx.textAlign = 'center';
                const lx = three ? (i === 2 ? c.x : c.x + (i === 0 ? -1 : 1) * c.r * 0.82) : c.x + (i === 0 ? -1 : 1) * c.r * 0.7;
                const ly = three ? (i === 2 ? c.y + c.r + 22 : c.y - c.r * 0.82) : c.y - c.r - 10;
                ctx.fillText(c.k, lx, ly);
            });
            // elementos
            const S = sets();
            const groups = {};
            S.U.forEach(el => {
                const k = (S.A.has(el) ? 1 : 0) + (S.B.has(el) ? 2 : 0) + (three && S.C.has(el) ? 4 : 0);
                (groups[k] = groups[k] || []).push(el);
            });
            const slots = {};
            for (let y = geo.rect.y + 34; y < geo.rect.y + geo.rect.h - 10; y += 22) {
                for (let x = geo.rect.x + 22; x < geo.rect.x + geo.rect.w - 16; x += 30) {
                    const ok = geo.circles.every(c => Math.abs(Math.hypot(x - c.x, y - c.y) - c.r) > 14);
                    if (!ok) continue;
                    const k = keyOf(bitsAt(x, y));
                    (slots[k] = slots[k] || []).push({ x, y });
                }
            }
            ctx.font = '500 13px "JetBrains Mono", monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            Object.keys(groups).forEach(k => {
                const sl = slots[k] || [], els = groups[k];
                if (!sl.length) return;
                let cx, cy;
                if (+k === 0) { cx = geo.rect.x + 40; cy = geo.rect.y + geo.rect.h - 30; }
                else { cx = sl.reduce((s, p) => s + p.x, 0) / sl.length; cy = sl.reduce((s, p) => s + p.y, 0) / sl.length; }
                sl.sort((p, q) => Math.hypot(p.x - cx, p.y - cy) - Math.hypot(q.x - cx, q.y - cy));
                const n = Math.min(els.length, sl.length);
                for (let i = 0; i < n; i++) {
                    const label = (i === n - 1 && els.length > n) ? '+' + (els.length - n + 1) : els[i];
                    ctx.fillStyle = shade.has(+k) ? '#ffffff' : 'rgba(229,231,235,.75)';
                    ctx.fillText(label.length > 4 ? label.slice(0, 4) + '…' : label, sl[i].x, sl[i].y);
                }
            });
            ctx.textBaseline = 'alphabetic';
            // resultado
            if (!challenge) {
                const sel = S.U.filter(el => op.f(S.A.has(el), S.B.has(el), S.C.has(el)));
                $('#venn-optitle', root).innerHTML = T(op.tex) + ' · ' + sel.length + (sel.length === 1 ? ' elemento' : ' elementos');
                $('#venn-res', root).textContent = sel.length ? '{' + sel.join(', ') + '}' : '∅';
            } else {
                $('#venn-optitle', root).textContent = 'Desafio em andamento';
                $('#venn-res', root).textContent = picked.size + (picked.size === 1 ? ' região pintada' : ' regiões pintadas');
            }
        }
        observe(cv, draw);

        cv.addEventListener('click', e => {
            if (!challenge || !geo) return;
            const r = cv.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
            if (!inRect(x, y)) return;
            const k = keyOf(bitsAt(x, y));
            if (picked.has(k)) picked.delete(k); else picked.add(k);
            $('#venn-verdict', root).textContent = ''; draw();
        });

        function resetChallengeUI() {
            $('#venn-check', root).hidden = true; $('#venn-show', root).hidden = true;
            $('#venn-verdict', root).textContent = ''; $('#venn-verdict', root).className = 'verdict';
            $('#venn-ch-text', root).textContent = 'Desafio: clique nas regiões do diagrama para pintar a operação pedida.';
        }
        $('#venn-new', root).addEventListener('click', () => {
            const list = ops(); let i;
            do { i = Math.floor(Math.random() * list.length); } while (challenge && list.length > 1 && list[i] === challenge);
            challenge = list[i]; picked.clear();
            $('#venn-ch-text', root).innerHTML = 'Pinte a região de ' + T(challenge.tex) + ' clicando no diagrama.';
            $('#venn-check', root).hidden = false; $('#venn-show', root).hidden = false;
            $('#venn-verdict', root).textContent = '';
            buildOps(); draw();
        });
        $('#venn-check', root).addEventListener('click', () => {
            if (!challenge) return;
            const t = truthKeys(challenge);
            const ok = t.size === picked.size && [...t].every(k => picked.has(k));
            const v = $('#venn-verdict', root);
            v.className = 'verdict ' + (ok ? 'ok' : 'no');
            v.textContent = ok ? '✔ Correto! Clique em "Novo desafio" para outro.' : '✘ Ainda não. Faltam ou sobram regiões; tente de novo ou veja a resposta.';
        });
        $('#venn-show', root).addEventListener('click', () => {
            if (!challenge) return;
            opIdx = ops().indexOf(challenge); challenge = null; picked.clear(); resetChallengeUI(); buildOps(); draw();
        });
        $('#venn-mode', root).addEventListener('change', e => {
            three = e.target.value === '3';
            $('#venn-Cwrap', root).hidden = !three;
            opIdx = three ? OPS2.length + 1 : 1; challenge = null; picked.clear(); resetChallengeUI(); buildOps(); draw();
        });
        inputs.forEach(inp => inp.addEventListener('input', draw));
        buildOps();
        return draw;
    }

    /* =========================================================
       INTERVALOS
       ========================================================= */
    function parseEnd(s, side) {
        const t = s.trim().replace(/\s+/g, '').replace('−', '-').replace(',', '.').toLowerCase();
        if (t === '' || /^[-+]?(inf|∞|infinito)$/.test(t)) return side < 0 ? -Infinity : Infinity;
        const v = Number(t);
        if (!Number.isFinite(v)) throw new Error('Valor inválido: "' + s + '"');
        return v;
    }
    function initIntervalos(root) {
        const row = (k, a, ca, b, cb) => '<div class="int-row i' + k.toLowerCase() + '"><b>' + k + '</b>' +
            '<select id="iv-' + k + 'ca" aria-label="Extremo esquerdo de ' + k + '"><option value="1"' + (ca ? ' selected' : '') + '>[</option><option value="0"' + (ca ? '' : ' selected') + '>(</option></select>' +
            '<input id="iv-' + k + 'a" type="text" inputmode="decimal" value="' + a + '" placeholder="−∞" aria-label="Início de ' + k + '">' +
            '<input id="iv-' + k + 'b" type="text" inputmode="decimal" value="' + b + '" placeholder="+∞" aria-label="Fim de ' + k + '">' +
            '<select id="iv-' + k + 'cb" aria-label="Extremo direito de ' + k + '"><option value="1"' + (cb ? ' selected' : '') + '>]</option><option value="0"' + (cb ? '' : ' selected') + '>)</option></select></div>';
        root.innerHTML =
            '<div class="lab-grid">' +
              '<div class="lab-stage"><canvas id="iv-cv"></canvas></div>' +
              '<div class="lab-side">' +
                '<div class="ctl"><label>Intervalos <small style="font-weight:500">(campo vazio = infinito)</small></label>' + row('A', '-1', true, '3', false) + '<div style="height:6px"></div>' + row('B', '1', false, '5', true) + '</div>' +
                '<div class="ctl"><label>Exemplos</label><div class="presets" id="iv-presets">' +
                  '<button type="button" data-p="-1,1,3,0|1,0,5,1">[−1, 3) e (1, 5]</button>' +
                  '<button type="button" data-p=",0,2,1|-1,0,6,0">(−∞, 2] e (−1, 6)</button>' +
                  '<button type="button" data-p="0,1,1,1|2,0,4,0">disjuntos</button>' +
                  '<button type="button" data-p="0,1,5,1|5,1,,0">encostados em 5</button></div></div>' +
                '<div class="ctl"><label>Operações (clique para desenhar)</label><div class="int-ops" id="iv-ops"></div></div>' +
                '<div class="fn-hint err" id="iv-err" hidden></div>' +
              '</div>' +
            '</div>' +
            '<div class="lab-under"><div class="lab-note"><strong>Bolinha cheia ou vazia?</strong> Em cada extremo do resultado, pergunte: este número pertence ao conjunto resultante? ' +
              'Na interseção ele precisa estar nos dois; na união, em pelo menos um; em ' + T('A-B') + ', em ' + T('A') + ' e fora de ' + T('B') + '.</div>' +
              '<div class="lab-note"><strong>Infinito.</strong> Deixe um campo vazio (ou digite ' + T('\\infty') + ' como <code>inf</code>) para um intervalo ilimitado. O lado infinito é sempre aberto.</div></div>';

        const cv = $('#iv-cv', root);
        const OPS = [
            { id: 'inter', tex: 'A\\cap B', f: (A, B) => IV.inter(A, B) },
            { id: 'union', tex: 'A\\cup B', f: (A, B) => IV.union(A, B) },
            { id: 'amb', tex: 'A-B', f: (A, B) => IV.diff(A, B) },
            { id: 'bma', tex: 'B-A', f: (A, B) => IV.diff(B, A) },
            { id: 'ac', tex: 'A^c', f: A => IV.comp(A) },
            { id: 'bc', tex: 'B^c', f: (A, B) => IV.comp(B) }
        ];
        let sel = 'inter';
        const get = k => IV.make(parseEnd($('#iv-' + k + 'a', root).value, -1), parseEnd($('#iv-' + k + 'b', root).value, 1),
            $('#iv-' + k + 'ca', root).value === '1', $('#iv-' + k + 'cb', root).value === '1');

        function draw() {
            let A, B;
            try { A = get('A'); B = get('B'); $('#iv-err', root).hidden = true; }
            catch (e) { $('#iv-err', root).hidden = false; $('#iv-err', root).textContent = e.message; return; }
            const res = {};
            OPS.forEach(o => { res[o.id] = o.f(A, B); });
            $('#iv-ops', root).innerHTML =
                '<div><span>' + T('A') + '</span><span>' + T(setTex(A).tex) + '</span></div>' +
                '<div><span>' + T('B') + '</span><span>' + T(setTex(B).tex) + '</span></div>' +
                OPS.map(o => '<div data-op="' + o.id + '" style="cursor:pointer;' + (o.id === sel ? 'border-color:var(--green);background:rgba(52,211,153,.08)' : '') + '"><span>' + T(o.tex) + '</span><span>' + T(setTex(res[o.id]).tex) + '</span></div>').join('');

            const F = fitCanvas(cv); if (!F) return;
            const { ctx, w, h } = F;
            ctx.fillStyle = COLORS.bg; ctx.fillRect(0, 0, w, h);
            const fin = A.concat(B).flatMap(i => [i.a, i.b]).filter(Number.isFinite);
            let lo = fin.length ? Math.min(...fin) : -5, hi = fin.length ? Math.max(...fin) : 5;
            if (hi - lo < 2) { lo -= 2; hi += 2; }
            const pad = (hi - lo) * 0.22; lo -= pad; hi += pad;
            const x0 = 70, x1 = w - 30, X = v => x0 + (v - lo) / (hi - lo) * (x1 - x0);
            const op = OPS.find(o => o.id === sel);
            const rows = [{ S: A, c: '#38bdf8', l: 'A' }, { S: B, c: '#f472b6', l: 'B' }, { S: res[sel], c: '#34d399', l: op.tex.replace(/\\cap/, '∩').replace(/\\cup/, '∪').replace(/\^c/, 'ᶜ').replace('-', '−') }];
            const top = h * 0.2, gap = Math.min(90, (h * 0.62) / 2);
            // guias verticais nos extremos finitos
            ctx.save(); ctx.setLineDash([4, 5]); ctx.strokeStyle = 'rgba(167,139,250,.45)'; ctx.lineWidth = 1;
            ctx.font = '12px "JetBrains Mono", monospace'; ctx.fillStyle = 'rgba(203,213,225,.85)'; ctx.textAlign = 'center';
            [...new Set(fin)].forEach(v => {
                ctx.beginPath(); ctx.moveTo(X(v), top - 22); ctx.lineTo(X(v), top + gap * 2 + 22); ctx.stroke();
                ctx.fillText(fmt(v, 5), X(v), top + gap * 2 + 40);
            });
            ctx.restore();
            rows.forEach((r, i) => drawSetLine(ctx, r.S, top + i * gap, X, x0, x1, r.c, r.l));
        }
        observe(cv, draw);
        root.addEventListener('input', draw);
        root.addEventListener('change', draw);
        $('#iv-ops', root).addEventListener('click', e => { const d = e.target.closest('[data-op]'); if (d) { sel = d.dataset.op; draw(); } });
        $('#iv-presets', root).addEventListener('click', e => {
            const b = e.target.closest('button'); if (!b) return;
            const [pa, pb] = b.dataset.p.split('|').map(s => s.split(','));
            [['A', pa], ['B', pb]].forEach(([k, p]) => {
                $('#iv-' + k + 'a', root).value = p[0]; $('#iv-' + k + 'ca', root).value = p[1];
                $('#iv-' + k + 'b', root).value = p[2]; $('#iv-' + k + 'cb', root).value = p[3];
            });
            draw();
        });
        return draw;
    }

    /* =========================================================
       INEQUAÇÕES: resolve f(x) ⋚ 0 numericamente em [−10, 10]
       ========================================================= */
    const LIM = 10;
    function solveIneq(f, rel) {
        const N = 6000, cls = x => { const y = f(x); if (!Number.isFinite(y) || Math.abs(y) > 1e12) return 'u'; if (Math.abs(y) < 1e-13) return 'z'; return y > 0 ? 'p' : 'n'; };
        const xs = [], cs = [];
        for (let i = 0; i <= N; i++) { const x = -LIM + 2 * LIM * i / N; xs.push(x); cs.push(cls(x)); }
        const breaks = [], zeros = [], poles = [];
        const near0 = x => { const y = Math.abs(f(x)); return Number.isFinite(y) && y < 1e-7; };
        const snap = x => { const r = Math.round(x * 1e6) / 1e6; return Math.abs(r - Math.round(r)) < 1e-9 ? Math.round(r) : (Math.abs(x - r) < 1e-9 ? r : x); };
        for (let i = 0; i < N; i++) {
            let ci = cs[i], cj = cs[i + 1];
            if (ci === 'z') { zeros.push(xs[i]); continue; }
            if (cj === 'z' || ci === cj) continue;
            let lo = xs[i], hi = xs[i + 1];
            for (let k = 0; k < 90; k++) { const m = (lo + hi) / 2; if (cls(m) === ci) lo = m; else hi = m; }
            const b = (lo + hi) / 2;
            breaks.push(b);
            if ((ci === 'p' && cj === 'n') || (ci === 'n' && cj === 'p')) {
                if (near0(lo) || near0(hi) || near0(b)) zeros.push(b); else poles.push(b);
            } else {
                // borda de domínio: zero se f vale ~0 no lado definido
                if (near0(lo) || near0(hi)) zeros.push(b); else poles.push(b);
            }
        }
        // raízes de multiplicidade par: mínimos locais de |f| sem troca de sinal
        for (let i = 1; i < N; i++) {
            if (cs[i] === 'u' || cs[i] === 'z' || cs[i - 1] !== cs[i] || cs[i + 1] !== cs[i]) continue;
            const a0 = Math.abs(f(xs[i - 1])), a1 = Math.abs(f(xs[i])), a2 = Math.abs(f(xs[i + 1]));
            if (!(a1 <= a0 && a1 <= a2) || a1 > 1e-2) continue;
            let lo = xs[i - 1], hi = xs[i + 1];
            for (let k = 0; k < 100; k++) { const m1 = lo + (hi - lo) / 3, m2 = hi - (hi - lo) / 3; if (Math.abs(f(m1)) < Math.abs(f(m2))) hi = m2; else lo = m1; }
            const m = (lo + hi) / 2;
            if (Math.abs(f(m)) < 1e-9) { zeros.push(m); breaks.push(m); }
        }
        // agrupa pontos quase coincidentes (ex.: as duas bordas de um polo) e arredonda
        const cluster = arr => {
            const s = arr.slice().sort((a, b) => a - b), out = [];
            let g = [];
            s.forEach(x => { if (g.length && x - g[g.length - 1] > 1e-5) { out.push(snap(g.reduce((t, v) => t + v, 0) / g.length)); g = []; } g.push(x); });
            if (g.length) out.push(snap(g.reduce((t, v) => t + v, 0) / g.length));
            return out;
        };
        const Z = cluster(zeros);
        const P = cluster(poles).filter(p => !Z.some(z => Math.abs(z - p) < 1e-5));
        const pts = cluster(breaks.concat(Z));
        // intervalos abertos entre pontos críticos, classificados pelo ponto médio
        const cuts = [-LIM].concat(pts.filter(p => p > -LIM && p < LIM), [LIM]);
        const want = rel === '>' || rel === '>=' ? 'p' : 'n';
        let S = [];
        for (let k = 0; k < cuts.length - 1; k++) {
            const a = cuts[k], b = cuts[k + 1];
            if (b - a < 1e-9) continue;
            if (cls((a + b) / 2) === want) S.push(...IV.make(a === -LIM ? -Infinity : a, b === LIM ? Infinity : b, false, false));
        }
        S = IV.norm(S);
        if (rel === '>=' || rel === '<=') Z.forEach(z => { S = IV.union(S, IV.point(z)); });
        else Z.forEach(z => { S = IV.diff(S, IV.point(z)); });
        // bordas de domínio em que f está definida e satisfaz a desigualdade (ex.: √x − 2 < 0 em x = 0)
        P.forEach(p => { if (cls(p) === want) S = IV.union(S, IV.point(p)); });
        return { S, Z, P };
    }

    function initInequacoes(root) {
        const PRESETS = ['x^2 - 5x + 6', '-x^2 + 4', 'x^2 + x + 1', '(x - 1)(x + 2)/(x - 4)', '1/x - 2', '(x + 2)/(3 - x)', '|x - 3| - 2', '(x - 1)^2', 'x^3 - 4x', 'raiz(x) - 2'];
        root.innerHTML =
            '<div class="lab-grid">' +
              '<div class="lab-stage"><canvas id="iq-cv"></canvas></div>' +
              '<div class="lab-side">' +
                '<div class="ctl"><label for="iq-in">Inequação</label><div class="ineq-row">' +
                  '<input id="iq-in" type="text" spellcheck="false" autocomplete="off" value="(x - 1)(x + 2)/(x - 4)" aria-label="f(x)">' +
                  '<select id="iq-rel" aria-label="Relação"><option value=">">&gt;</option><option value=">=" selected>≥</option><option value="<">&lt;</option><option value="<=">≤</option></select><span>0</span></div>' +
                  '<div class="fn-hint" id="iq-hint"></div></div>' +
                '<div class="ctl"><label>Exemplos</label><div class="presets" id="iq-presets">' + PRESETS.map(p => '<button type="button">' + esc(p) + '</button>').join('') + '</div></div>' +
                '<div class="readout"><div class="wide"><span>Solução</span><b class="tex-line" id="iq-sol"></b></div>' +
                  '<div><span>Zeros</span><b class="tex-line" id="iq-z"></b></div><div><span>Fora do domínio / polos</span><b class="tex-line" id="iq-p"></b></div></div>' +
              '</div>' +
            '</div>' +
            '<div class="lab-under"><div class="lab-note"><strong>Leitura do gráfico.</strong> Resolver ' + T('f(x)>0') + ' é encontrar onde a curva está <em>acima</em> do eixo ' + T('x') + '. ' +
              'A faixa verde e o traço verde no eixo mostram a solução; bolinha cheia indica que o extremo entra.' +
              '<p class="muted-p">Zeros de ' + T('f') + ' entram com ' + T('\\geq') + ' e ' + T('\\leq') + '; pontos fora do domínio (como zeros do denominador) nunca entram.</p></div>' +
              '<div class="lab-note"><strong>Limites do método.</strong> A solução é calculada numericamente em ' + T('[-10,\\,10]') + ', supondo o mesmo comportamento fora dessa janela. ' +
              'Extremos irracionais aparecem arredondados (marcados com ≈). Use o resultado para <em>conferir</em> a resolução feita à mão com o quadro de sinais.</div></div>';

        const cv = $('#iq-cv', root), plot = new Plot(cv);
        const inp = $('#iq-in', root), relSel = $('#iq-rel', root);
        let f = null, result = null, view = [-6, 6, -6, 6];

        function solve() {
            try {
                const tree = parseExpr(inp.value);
                f = compile(tree);
                const relTex = { '>': '>', '>=': '\\geq', '<': '<', '<=': '\\leq' }[relSel.value];
                $('#iq-hint', root).className = 'fn-hint';
                $('#iq-hint', root).innerHTML = 'Entendido como ' + T(toTex(tree) + ' ' + relTex + ' 0');
                inp.classList.remove('bad');
                result = solveIneq(f, relSel.value);
                const st = setTex(result.S, true);
                $('#iq-sol', root).innerHTML = T('S = ' + st.tex) + (st.ap ? ' <small style="color:var(--muted)">(≈)</small>' : '');
                $('#iq-z', root).innerHTML = result.Z.length ? T(result.Z.map(z => numTex(z, true).tex).join(';\\ ')) : '—';
                $('#iq-p', root).innerHTML = result.P.length ? T(result.P.map(z => numTex(z, true).tex).join(';\\ ')) : '—';
                const crit = result.Z.concat(result.P).filter(v => Math.abs(v) < LIM);
                let a = crit.length ? Math.min(...crit) - 3 : -6, b = crit.length ? Math.max(...crit) + 3 : 6;
                if (b - a < 8) { const m = (a + b) / 2; a = m - 4; b = m + 4; }
                a = Math.max(a, -LIM); b = Math.min(b, LIM);
                const ys = [];
                for (let i = 0; i <= 400; i++) { const y = f(a + (b - a) * i / 400); if (Number.isFinite(y)) ys.push(y); }
                ys.sort((p, q) => p - q);
                // escala robusta: ignora os valores enormes perto de polos
                let lo = ys.length ? ys[Math.floor(ys.length * 0.15)] : -5, hi = ys.length ? ys[Math.floor(ys.length * 0.85)] : 5;
                lo = Math.min(lo, -2); hi = Math.max(hi, 2);
                const pad = (hi - lo) * 0.6;
                view = [a, b, lo - pad, hi + pad];
            } catch (e) {
                f = null; result = null;
                inp.classList.add('bad');
                $('#iq-hint', root).className = 'fn-hint err'; $('#iq-hint', root).textContent = e.message;
                $('#iq-sol', root).textContent = '—'; $('#iq-z', root).textContent = '—'; $('#iq-p', root).textContent = '—';
            }
            draw();
        }

        function draw() {
            if (!plot.fit()) return;
            plot.view = view.slice();
            plot.clear();
            const c = plot.ctx;
            if (result) {
                c.fillStyle = 'rgba(52,211,153,.10)';
                result.S.forEach(s => {
                    const xa = s.a === -Infinity ? 0 : plot.X(s.a), xb = s.b === Infinity ? plot.w : plot.X(s.b);
                    c.fillRect(xa, 0, Math.max(xb - xa, 2), plot.h);
                });
            }
            plot.grid();
            if (f) plot.curve(f, COLORS.curve, 2.6);
            if (result) {
                const y0 = Math.min(Math.max(plot.Y(0), 10), plot.h - 10);
                const toV = x => plot.view[0] + x / plot.w * (plot.view[1] - plot.view[0]);
                drawSetLine(c, result.S, y0, plot.X.bind(plot), 0, plot.w, '#34d399', '');
                result.P.forEach(p => { if (p > toV(0) && p < toV(plot.w)) plot.line(p, plot.view[2], p, plot.view[3], 'rgba(248,113,113,.7)', 1.3, [5, 5]); });
            }
        }
        plot.redraw = draw;

        let t;
        inp.addEventListener('input', () => { clearTimeout(t); t = setTimeout(solve, 250); });
        relSel.addEventListener('change', solve);
        $('#iq-presets', root).addEventListener('click', e => { const b = e.target.closest('button'); if (b) { inp.value = b.textContent; solve(); } });
        solve();
        return draw;
    }

    return { init: { venn: initVenn, intervalos: initIntervalos, inequacoes: initInequacoes }, IV, solveIneq, setTex };
})();
