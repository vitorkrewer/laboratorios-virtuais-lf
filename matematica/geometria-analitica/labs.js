/* Geometria Analítica: simuladores Retas e distâncias, Cônicas e Vetores no espaço. */
window.MATH = window.MATH || {};

MATH.labs = (function () {
    'use strict';

    const { T, Plot, fmt } = MATH.plot;
    const { F, fromNumber, parseNum, gcd } = MATH.frac;
    const $ = (s, r) => (r || document).querySelector(s);

    /* ---------- utilidades ---------- */
    const n2 = x => { const v = Math.abs(x) < 5e-10 ? 0 : x; return String(+v.toFixed(2)).replace('.', '{,}'); };
    const fr = x => fromNumber(x, 1000) || F(Math.round(x * 1000), 1000);
    /* soma de termos com coeficientes Fr: [[Fr, 'x'], [Fr, 'y'], [Fr, '']] */
    function polyTex(terms) {
        let s = '';
        terms.forEach(([k, v]) => {
            if (k.isZero()) return;
            const neg = k.n < 0, abs = neg ? k.neg() : k, coef = v && abs.eq(1) ? '' : abs.tex();
            s += (s ? (neg ? ' - ' : ' + ') : (neg ? '-' : '')) + coef + v;
        });
        return s || '0';
    }
    const shiftTex = (v, h) => h.isZero() ? v : '(' + v + (h.n > 0 ? ' - ' + h.tex() : ' + ' + h.neg().tex()) + ')';
    const ptTex = (x, y) => '(' + x.tex() + ',\\ ' + y.tex() + ')';
    /* √(fração): exata se for quadrado perfeito, senão \sqrt{…} ≈ valor */
    function isqrt(n) { const r = Math.round(Math.sqrt(n)); return r * r === n ? r : null; }
    function sqrtTex(f, approx) {
        const a = isqrt(Math.abs(f.n)), b = isqrt(f.d);
        if (a !== null && b !== null) return F(a, b).tex();
        return '\\sqrt{' + f.tex() + '}' + (approx === false ? '' : ' \\approx ' + n2(Math.sqrt(f.val())));
    }
    function squareView(plot, R) { const k = plot.w / plot.h; plot.view = k >= 1 ? [-R * k, R * k, -R, R] : [-R, R, -R / k, R / k]; }
    function arrowPx(c, X0, Y0, X1, Y1, color, width, label) {
        const ang = Math.atan2(Y1 - Y0, X1 - X0), L = Math.hypot(X1 - X0, Y1 - Y0), h = Math.min(12, L * .4);
        c.save(); c.strokeStyle = color; c.fillStyle = color; c.lineWidth = width || 3; c.lineCap = 'round';
        c.beginPath(); c.moveTo(X0, Y0); c.lineTo(X1 - Math.cos(ang) * h * .6, Y1 - Math.sin(ang) * h * .6); c.stroke();
        if (L > 2) { c.beginPath(); c.moveTo(X1, Y1); c.lineTo(X1 - h * Math.cos(ang - .4), Y1 - h * Math.sin(ang - .4)); c.lineTo(X1 - h * Math.cos(ang + .4), Y1 - h * Math.sin(ang + .4)); c.closePath(); c.fill(); }
        if (label) { c.font = '600 14px "JetBrains Mono", monospace'; c.textAlign = 'left'; c.textBaseline = 'bottom'; c.fillText(label, X1 + 6, Y1 - 4); }
        c.restore();
    }
    function label(plot, x, y, text, color, dx, dy) {
        const c = plot.ctx; c.save(); c.fillStyle = color; c.font = '700 13px "JetBrains Mono", monospace'; c.textAlign = 'left'; c.textBaseline = 'bottom';
        c.fillText(text, plot.X(x) + (dx || 7), plot.Y(y) + (dy || -5)); c.restore();
    }

    /* =========================================================
       RETAS E DISTÂNCIAS
       ========================================================= */
    /* reta por dois pontos (coordenadas Fr) → a x + b y + c = 0 com inteiros primitivos */
    function lineThrough(P, Q) {
        let a = Q[1].sub(P[1]), b = P[0].sub(Q[0]);
        let c = a.mul(P[0]).add(b.mul(P[1])).neg();
        let L = 1; [a, b, c].forEach(v => { L = L * v.d / gcd(L, v.d); });
        a = a.mul(L); b = b.mul(L); c = c.mul(L);
        let g = 0; [a, b, c].forEach(v => { if (v.n) g = g ? gcd(g, v.n) : Math.abs(v.n); });
        if (g > 1) { a = a.div(g); b = b.div(g); c = c.div(g); }
        if (a.n < 0 || (a.isZero() && b.n < 0)) { a = a.neg(); b = b.neg(); c = c.neg(); }
        return { a, b, c };
    }
    function initRetas(root) {
        root.innerHTML =
            '<div class="lab-grid">' +
              '<div class="lab-stage"><canvas id="rt-cv" style="cursor:grab"></canvas></div>' +
              '<div class="lab-side">' +
                '<div class="ctl seg"><label><input type="checkbox" id="rt-snap" checked> Encaixar na grade (0,5)</label></div>' +
                '<div class="ctl seg"><label><input type="checkbox" id="rt-two" checked> Segunda reta ' + T('s') + '</label><label><input type="checkbox" id="rt-pt" checked> Ponto ' + T('P') + '</label></div>' +
                '<div class="readout" style="margin-top:0">' +
                  '<div class="wide"><span>Reta ' + T('r') + ' (por A e B)</span><b class="tex-line" id="rt-r"></b></div>' +
                  '<div class="wide"><span>Outras formas de ' + T('r') + '</span><b class="tex-line" id="rt-forms" style="font-size:.9rem"></b></div>' +
                  '<div class="wide" id="rt-w-s"><span>Reta ' + T('s') + ' (por C e D) e posição relativa</span><b class="tex-line" id="rt-s"></b></div>' +
                  '<div class="wide" id="rt-w-p"><span>Distância de ' + T('P') + ' até ' + T('r') + '</span><b class="tex-line" id="rt-d"></b></div>' +
                '</div>' +
                '<div class="presets" id="rt-pre"><button type="button" data-p="perp">perpendiculares</button><button type="button" data-p="par">paralelas</button><button type="button" data-p="vert">reta vertical</button><button type="button" data-p="horiz">reta horizontal</button></div>' +
              '</div>' +
            '</div>' +
            '<div class="lab-under"><div class="lab-note"><strong>Como usar.</strong> Arraste os pontos ' + T('A') + ' e ' + T('B') + ' (reta ' + T('r') + ', azul), ' + T('C') + ' e ' + T('D') + ' (reta ' + T('s') + ', rosa) e ' + T('P') + '. Com a grade ligada, as coordenadas ficam "redondas" e as equações aparecem exatas.</div>' +
              '<div class="lab-note"><strong>Repare.</strong> O vetor normal ' + T('(a, b)') + ' da forma geral (seta verde) é sempre perpendicular à reta. A distância de ' + T('P') + ' é medida pelo segmento tracejado, que encontra ' + T('r') + ' em ângulo reto. ' +
              '<p class="muted-p">Experimente alinhar ' + T('C') + ' e ' + T('D') + ' na vertical: a reduzida deixa de existir, mas a forma geral continua valendo.</p></div></div>';

        const S = k => $('#rt-' + k, root);
        const plot = new Plot(S('cv'));
        const pts = { A: [-3, -1], B: [3, 2], C: [-2, 4], D: [2, -2], P: [2, 5] };
        const COL = { A: '#38bdf8', B: '#38bdf8', C: '#f472b6', D: '#f472b6', P: '#fbbf24' };
        let drag = null;

        const FP = k => [fr(pts[k][0]), fr(pts[k][1])];
        function forms(L, P0, dir) {
            const out = [];
            if (!L.b.isZero()) {
                const m = L.a.neg().div(L.b), n = L.c.neg().div(L.b);
                out.red = 'y = ' + polyTex([[m, 'x'], [n, '']]);
                out.m = m;
            } else out.red = 'x = ' + L.c.neg().div(L.a).tex();
            out.geral = polyTex([[L.a, 'x'], [L.b, 'y'], [L.c, '']]) + ' = 0';
            if (!L.a.isZero() && !L.b.isZero() && !L.c.isZero()) {
                const p = L.c.neg().div(L.a), q = L.c.neg().div(L.b);
                out.seg = p.isInt() && q.isInt() ? '\\dfrac{x}{' + p.tex() + '} + \\dfrac{y}{' + q.tex() + '} = 1' : null;
                out.cuts = ptTex(p, F(0)) + '\\ \\text{e}\\ ' + ptTex(F(0), q);
            }
            out.par = '(x, y) = ' + ptTex(P0[0], P0[1]) + ' + t\\,' + ptTex(dir[0], dir[1]);
            return out;
        }
        function update() {
            const A = FP('A'), B = FP('B'), r = lineThrough(A, B);
            const dir = [r.b.neg(), r.a]; /* vetor diretor primitivo */
            const fr_ = forms(r, A, dir);
            S('r').innerHTML = T(fr_.red) + (fr_.m ? ' &nbsp;·&nbsp; ' + T('m = ' + fr_.m.tex()) : ' &nbsp;·&nbsp; vertical: ' + T('m') + ' não existe');
            S('forms').innerHTML = 'Geral: ' + T(fr_.geral) + '<br>' + (fr_.seg ? 'Segmentária: ' + T(fr_.seg) + '<br>' : fr_.cuts ? 'Cortes nos eixos: ' + T(fr_.cuts) + '<br>' : '') + 'Paramétrica: ' + T(fr_.par);
            S('w-s').hidden = !S('two').checked; S('w-p').hidden = !S('pt').checked;
            if (S('two').checked) {
                const C = FP('C'), D = FP('D'), s = lineThrough(C, D), fs = forms(s, C, [s.b.neg(), s.a]);
                const det = r.a.mul(s.b).sub(s.a.mul(r.b));
                let pos;
                if (det.isZero()) {
                    const same = r.a.mul(s.c).sub(s.a.mul(r.c)).isZero() && r.b.mul(s.c).sub(s.b.mul(r.c)).isZero();
                    pos = same ? '<b>Coincidentes</b> (a mesma reta).' : '<b>Paralelas</b> distintas: mesma declividade, nenhum ponto comum.';
                } else {
                    const x = r.b.mul(s.c).sub(s.b.mul(r.c)).div(det), y = r.c.mul(s.a).sub(s.c.mul(r.a)).div(det);
                    const perp = r.a.mul(s.a).add(r.b.mul(s.b)).isZero();
                    const cosv = Math.abs(r.a.val() * s.a.val() + r.b.val() * s.b.val()) / (Math.hypot(r.a.val(), r.b.val()) * Math.hypot(s.a.val(), s.b.val()));
                    const ang = Math.acos(Math.min(1, cosv)) * 180 / Math.PI;
                    pos = (perp ? '<b>Perpendiculares</b>' : '<b>Concorrentes</b>, ângulo de ' + fmt(ang, 4) + '°') + ', encontro em ' + T(ptTex(x, y)) + '.';
                }
                S('s').innerHTML = T(fs.red) + '<br>' + pos;
            }
            if (S('pt').checked) {
                const P = FP('P'), num = r.a.mul(P[0]).add(r.b.mul(P[1])).add(r.c), den2 = r.a.mul(r.a).add(r.b.mul(r.b));
                const absn = num.n < 0 ? num.neg() : num, dval = absn.val() / Math.sqrt(den2.val());
                const rootTex = Number.isInteger(Math.sqrt(den2.val())) ? String(Math.sqrt(den2.val())) : '\\sqrt{' + den2.tex() + '}';
                const parts = []; const sg = k => (parts.length ? (k.n < 0 ? ' - ' : ' + ') : (k.n < 0 ? '-' : ''));
                [[r.a, P[0]], [r.b, P[1]]].forEach(([k, p]) => { if (!k.isZero()) parts.push(sg(k) + (k.n < 0 ? k.neg() : k).tex() + '\\cdot ' + p.ptex()); });
                if (!r.c.isZero()) parts.push(sg(r.c) + (r.c.n < 0 ? r.c.neg() : r.c).tex());
                const exact = Number.isInteger(Math.sqrt(den2.val())) ? absn.div(Math.sqrt(den2.val())).tex() : '\\dfrac{' + absn.tex() + '}{' + rootTex + '} \\approx ' + n2(dval);
                S('d').innerHTML = absn.isZero() ? T('d = 0') + ': ' + T('P') + ' está sobre ' + T('r') + '.' : T('d = \\dfrac{|' + parts.join('') + '|}{' + rootTex + '} = ' + exact);
            }
            draw();
        }
        function draw() {
            if (!plot.fit()) return;
            squareView(plot, 7); plot.clear(); plot.grid();
            const c = plot.ctx, [x0, x1, y0, y1] = plot.view;
            const lineDraw = (P, Q, color) => {
                const dx = Q[0] - P[0], dy = Q[1] - P[1];
                if (Math.abs(dx) < 1e-12) plot.line(P[0], y0 - 1, P[0], y1 + 1, color, 2.6);
                else plot.slopeLine(P[0], P[1], dy / dx, color, 2.6);
            };
            lineDraw(pts.A, pts.B, '#38bdf8');
            const A = FP('A'), B = FP('B'), r = lineThrough(A, B);
            /* normal */
            const mx = (pts.A[0] + pts.B[0]) / 2, my = (pts.A[1] + pts.B[1]) / 2, nn = Math.hypot(r.a.val(), r.b.val());
            arrowPx(c, plot.X(mx), plot.Y(my), plot.X(mx + r.a.val() / nn * 1.4), plot.Y(my + r.b.val() / nn * 1.4), '#34d399', 2.4, 'n');
            if (S('two').checked) {
                lineDraw(pts.C, pts.D, '#f472b6');
                const s = lineThrough(FP('C'), FP('D')), det = r.a.val() * s.b.val() - s.a.val() * r.b.val();
                if (Math.abs(det) > 1e-12) {
                    const x = (r.b.val() * s.c.val() - s.b.val() * r.c.val()) / det, y = (r.c.val() * s.a.val() - s.c.val() * r.a.val()) / det;
                    plot.dot(x, y, '#e2e8f0', 4.5, true);
                }
            }
            if (S('pt').checked) {
                const [px, py] = pts.P, k = (r.a.val() * px + r.b.val() * py + r.c.val()) / (r.a.val() ** 2 + r.b.val() ** 2);
                const fx = px - k * r.a.val(), fy = py - k * r.b.val();
                plot.line(px, py, fx, fy, '#fbbf24', 2, [6, 5]);
                plot.dot(fx, fy, '#fbbf24', 3.5);
                /* marca de ângulo reto */
                const ux = r.b.val() / nn, uy = -r.a.val() / nn, vx = (px - fx), vy = (py - fy), vl = Math.hypot(vx, vy);
                if (vl > 0.3) { const s = 0.28, wx = vx / vl * s, wy = vy / vl * s; c.save(); c.strokeStyle = 'rgba(251,191,36,.8)'; c.lineWidth = 1.3; c.beginPath(); c.moveTo(plot.X(fx + ux * s), plot.Y(fy + uy * s)); c.lineTo(plot.X(fx + ux * s + wx), plot.Y(fy + uy * s + wy)); c.lineTo(plot.X(fx + wx), plot.Y(fy + wy)); c.stroke(); c.restore(); }
            }
            Object.keys(pts).forEach(k => {
                if ((k === 'C' || k === 'D') && !S('two').checked) return;
                if (k === 'P' && !S('pt').checked) return;
                plot.dot(pts[k][0], pts[k][1], COL[k], 6.5);
                label(plot, pts[k][0], pts[k][1], k + '(' + fmt(pts[k][0], 3) + '; ' + fmt(pts[k][1], 3) + ')', COL[k]);
            });
        }
        plot.redraw = draw;

        function toWorld(e) {
            const rc = S('cv').getBoundingClientRect(), [x0, x1, y0, y1] = plot.view;
            return [x0 + (e.clientX - rc.left) / plot.w * (x1 - x0), y1 - (e.clientY - rc.top) / plot.h * (y1 - y0)];
        }
        S('cv').addEventListener('pointerdown', e => {
            const rc = S('cv').getBoundingClientRect(); let best = null, bd = 18;
            Object.keys(pts).forEach(k => {
                if ((k === 'C' || k === 'D') && !S('two').checked) return;
                if (k === 'P' && !S('pt').checked) return;
                const d = Math.hypot(plot.X(pts[k][0]) - (e.clientX - rc.left), plot.Y(pts[k][1]) - (e.clientY - rc.top));
                if (d < bd) { bd = d; best = k; }
            });
            if (best) { drag = best; S('cv').setPointerCapture(e.pointerId); S('cv').style.cursor = 'grabbing'; }
        });
        S('cv').addEventListener('pointermove', e => {
            if (!drag) return;
            let [x, y] = toWorld(e);
            if (S('snap').checked) { x = Math.round(x * 2) / 2; y = Math.round(y * 2) / 2; } else { x = Math.round(x * 100) / 100; y = Math.round(y * 100) / 100; }
            const mate = { A: 'B', B: 'A', C: 'D', D: 'C' }[drag];
            if (mate && Math.abs(pts[mate][0] - x) < 1e-9 && Math.abs(pts[mate][1] - y) < 1e-9) return; /* dois pontos iguais não definem reta */
            pts[drag] = [x, y]; update();
        });
        S('cv').addEventListener('pointerup', () => { drag = null; S('cv').style.cursor = 'grab'; });
        ['snap', 'two', 'pt'].forEach(k => S(k).addEventListener('change', update));
        S('pre').addEventListener('click', e => {
            const b = e.target.closest('button'); if (!b) return;
            const P = { perp: { A: [-3, -1], B: [3, 2], C: [0, 4], D: [2, 0] }, par: { A: [-3, -1], B: [3, 2], C: [-3, 2], D: [3, 5] }, vert: { A: [2, -3], B: [2, 4], C: [-4, 1], D: [4, 1] }, horiz: { A: [-4, 1], B: [4, 1], C: [-2, -3], D: [3, 4] } }[b.dataset.p];
            Object.assign(pts, P); S('two').checked = true; update();
        });
        update();
        return draw;
    }

    /* =========================================================
       CÔNICAS
       ========================================================= */
    function initConicas(root) {
        const sl = (id, label, min, max, step, val) => '<div class="ctl" id="cn-w-' + id + '"><label for="cn-' + id + '">' + label + (id === 't' ? '' : ' = <b id="cn-' + id + '-v"></b>') + '</label><input id="cn-' + id + '" type="range" min="' + min + '" max="' + max + '" step="' + step + '" value="' + val + '"></div>';
        const num = (id, v) => '<input class="plain-in" id="cn-' + id + '" value="' + v + '" spellcheck="false" autocomplete="off" style="text-align:center" aria-label="' + id + '">';
        root.innerHTML =
            '<div class="lab-grid">' +
              '<div class="lab-stage"><canvas id="cn-cv"></canvas></div>' +
              '<div class="lab-side">' +
                '<div class="ctl"><label for="cn-mode">Cônica</label><select id="cn-mode">' +
                  '<option value="circ">Circunferência</option><option value="par">Parábola</option><option value="eli" selected>Elipse</option><option value="hip">Hipérbole</option><option value="id">Identificar equação geral</option></select></div>' +
                '<div id="cn-params">' +
                  sl('h', T('h') + ' (centro/vértice)', -4, 4, 0.5, 0) + sl('k', T('k'), -4, 4, 0.5, 0) +
                  sl('r', 'raio ' + T('r'), 0.5, 6, 0.5, 3) + sl('p', T('p'), -3, 3, 0.25, 1) +
                  sl('a', T('a'), 0.5, 6, 0.5, 5) + sl('b', T('b'), 0.5, 6, 0.5, 3) +
                  '<div class="ctl seg" id="cn-w-or"><label><input type="radio" name="cn-or" value="h" checked> horizontal</label><label><input type="radio" name="cn-or" value="v"> vertical</label></div>' +
                  sl('t', 'Ponto ' + T('P') + ' sobre a curva', 0, 1, 0.002, 0.15) +
                '</div>' +
                '<div id="cn-idbox" hidden><div class="ctl"><label>' + T('Ax^2 + Cy^2 + Dx + Ey + F = 0') + '</label>' +
                  '<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:5px;text-align:center;font-size:.75rem;color:var(--muted)"><span>A</span><span>C</span><span>D</span><span>E</span><span>F</span>' +
                  num('A', 4) + num('C', 9) + num('D', -16) + num('E', 18) + num('F', -11) + '</div></div>' +
                  '<div class="presets" id="cn-idpre"><button type="button" data-v="1 1 -6 4 -3">circunferência</button><button type="button" data-v="4 9 -16 18 -11">elipse</button><button type="button" data-v="1 -4 -2 -16 -19">hipérbole</button><button type="button" data-v="1 0 6 -8 1">parábola</button><button type="button" data-v="1 1 0 0 4">vazio</button><button type="button" data-v="1 -1 0 0 0">par de retas</button></div></div>' +
                '<div class="readout"><div class="wide"><span>Equação</span><b class="tex-line" id="cn-eq"></b></div>' +
                  '<div class="wide"><span>Elementos</span><b id="cn-el" style="font-family:var(--sans);font-size:.88rem;font-weight:500"></b></div>' +
                  '<div class="wide" id="cn-w-prop"><span>Propriedade que define a curva</span><b class="tex-line" id="cn-prop"></b></div></div>' +
              '</div>' +
            '</div>' +
            '<div class="lab-under"><div class="lab-note" id="cn-note"></div>' +
              '<div class="lab-note"><strong>Legenda.</strong> Focos em <b style="color:#fbbf24">amarelo</b>, vértices em branco, diretriz e assíntotas tracejadas. O ponto ' + T('P') + ' (rosa) percorre a curva quando você move o último controle; os segmentos mostram as distâncias da definição.</div></div>';

        const S = k => $('#cn-' + k, root);
        const plot = new Plot(S('cv'));
        const v = k => +S(k).value;
        const or = () => root.querySelector('input[name="cn-or"]:checked').value;
        const NOTES = {
            circ: '<strong>Circunferência.</strong> Todos os pontos à distância ' + T('r') + ' do centro. É a elipse com ' + T('a = b') + ' (focos coincidentes, ' + T('e = 0') + ').',
            par: '<strong>Parábola.</strong> Distância ao foco = distância à diretriz. Com ' + T('p < 0') + ', ela abre para o outro lado. Quanto menor ' + T('|p|') + ', mais "fechada".',
            eli: '<strong>Elipse.</strong> Soma das distâncias aos focos ' + T('= 2a') + '. Aqui ' + T('a') + ' e ' + T('b') + ' são os semieixos horizontal e vertical; o maior deles define o eixo dos focos. Iguale os dois e veja a elipse virar circunferência.',
            hip: '<strong>Hipérbole.</strong> Diferença das distâncias aos focos ' + T('= 2a') + '. As assíntotas (tracejadas) são as diagonais do retângulo ' + T('2a \\times 2b') + '.',
            id: '<strong>Identificar.</strong> Digite os coeficientes (frações e decimais valem). O simulador classifica pelos sinais de ' + T('A') + ' e ' + T('C') + ' e completa os quadrados passo a passo, inclusive casos degenerados.'
        };
        let G = null; /* geometria atual para o desenho */

        function setVisibility(m) {
            const show = { circ: ['h', 'k', 'r', 't'], par: ['h', 'k', 'p', 'or', 't'], eli: ['h', 'k', 'a', 'b', 't'], hip: ['h', 'k', 'a', 'b', 'or', 't'], id: [] }[m];
            ['h', 'k', 'r', 'p', 'a', 'b', 'or', 't'].forEach(id => { S('w-' + id).hidden = !show.includes(id); });
            S('idbox').hidden = m !== 'id'; S('w-prop').hidden = m === 'id';
            S('note').innerHTML = NOTES[m];
        }
        const d2 = (P, Q) => Math.hypot(P[0] - Q[0], P[1] - Q[1]);
        function build() {
            const m = S('mode').value;
            ['h', 'k', 'r', 'p', 'a', 'b'].forEach(id => { S(id + '-v').textContent = fmt(v(id), 4); });
            if (m === 'par' && v('p') === 0) S('p').value = 0.25;
            if (m === 'id') return identify();
            const h = v('h'), k = v('k'), H = fr(h), K = fr(k), X = shiftTex('x', H), Y = shiftTex('y', K), t = v('t');
            if (m === 'circ') {
                const r = v('r'), th = t * 2 * Math.PI, P = [h + r * Math.cos(th), k + r * Math.sin(th)];
                G = { type: 'circ', h, k, rx: r, ry: r, foci: [[h, k]], P };
                S('eq').innerHTML = T(X + '^2 + ' + Y + '^2 = ' + fr(r * r).tex());
                S('el').innerHTML = 'Centro ' + T(ptTex(H, K)) + ', raio ' + T(fr(r).tex()) + '.';
                S('prop').innerHTML = T('d(P, C) = ' + n2(d2(P, [h, k])) + ' = r');
            } else if (m === 'par') {
                const p = v('p'), vert = or() === 'v', s = (t * 2 - 1) * 6;
                const P = vert ? [h + s, k + s * s / (4 * p)] : [h + s * s / (4 * p), k + s];
                const Fo = vert ? [h, k + p] : [h + p, k];
                G = { type: 'par', h, k, p, vert, foci: [Fo], P };
                S('eq').innerHTML = T(vert ? X + '^2 = ' + fr(4 * p).tex() + Y : Y + '^2 = ' + fr(4 * p).tex() + X);
                S('el').innerHTML = 'Vértice ' + T(ptTex(H, K)) + ', foco ' + T(ptTex(fr(Fo[0]), fr(Fo[1]))) + ', diretriz ' + T(vert ? 'y = ' + fr(k - p).tex() : 'x = ' + fr(h - p).tex()) + '. Abre para ' + (vert ? (p > 0 ? 'cima' : 'baixo') : (p > 0 ? 'a direita' : 'a esquerda')) + '.';
                const dDir = vert ? Math.abs(P[1] - (k - p)) : Math.abs(P[0] - (h - p));
                S('prop').innerHTML = T('d(P, F) = ' + n2(d2(P, Fo)) + ' \\quad d(P, \\text{diretriz}) = ' + n2(dDir));
            } else if (m === 'eli') {
                const ax = v('a'), by = v('b'), horiz = ax >= by, A = Math.max(ax, by), B = Math.min(ax, by), c = Math.sqrt(A * A - B * B);
                const foci = horiz ? [[h - c, k], [h + c, k]] : [[h, k - c], [h, k + c]];
                const th = t * 2 * Math.PI, P = [h + ax * Math.cos(th), k + by * Math.sin(th)];
                G = { type: 'eli', h, k, rx: ax, ry: by, foci, P };
                S('eq').innerHTML = T('\\dfrac{' + X + '^2}{' + fr(ax * ax).tex() + '} + \\dfrac{' + Y + '^2}{' + fr(by * by).tex() + '} = 1');
                const cT = Number.isInteger(c * c) && !Number.isInteger(c) ? '\\sqrt{' + (c * c) + '}' : n2(c);
                S('el').innerHTML = (Math.abs(ax - by) < 1e-9 ? '<b>É uma circunferência</b> (' + T('a = b') + '). ' : 'Eixo maior ' + (horiz ? 'horizontal' : 'vertical') + ', ') + T('a = ' + n2(A) + ',\\ b = ' + n2(B) + ',\\ c = ' + cT) + '. Focos ' + T(foci.map(f => '(' + n2(f[0]) + ',\\ ' + n2(f[1]) + ')').join(',\\ ')) + ', excentricidade ' + T('e = ' + n2(c / A)) + '.';
                S('prop').innerHTML = T('d(P, F_1) + d(P, F_2) = ' + n2(d2(P, foci[0])) + ' + ' + n2(d2(P, foci[1])) + ' = ' + n2(d2(P, foci[0]) + d2(P, foci[1])) + ' = 2a');
            } else {
                const a = v('a'), b = v('b'), vert = or() === 'v', c = Math.sqrt(a * a + b * b);
                const foci = vert ? [[h, k - c], [h, k + c]] : [[h - c, k], [h + c, k]];
                const u = (t * 2 - 1) * 2.2, branch = 1;
                const P = vert ? [h + b * Math.sinh(u), k + branch * a * Math.cosh(u)] : [h + branch * a * Math.cosh(u), k + b * Math.sinh(u)];
                G = { type: 'hip', h, k, a, b, vert, foci, P };
                S('eq').innerHTML = T(vert ? '\\dfrac{' + Y + '^2}{' + fr(a * a).tex() + '} - \\dfrac{' + X + '^2}{' + fr(b * b).tex() + '} = 1' : '\\dfrac{' + X + '^2}{' + fr(a * a).tex() + '} - \\dfrac{' + Y + '^2}{' + fr(b * b).tex() + '} = 1');
                const slope = vert ? a / b : b / a;
                S('el').innerHTML = 'Focos no eixo ' + (vert ? 'vertical' : 'horizontal') + ', ' + T('c = \\sqrt{a^2 + b^2} = ' + n2(c)) + '. Focos ' + T(foci.map(f => '(' + n2(f[0]) + ',\\ ' + n2(f[1]) + ')').join(',\\ ')) + '. Assíntotas ' + T(shiftTex('y', K).replace(/^\(|\)$/g, '') + ' = \\pm ' + fr(slope).tex() + (H.isZero() ? 'x' : shiftTex('x', H))) + ', ' + T('e = ' + n2(c / a)) + '.';
                S('prop').innerHTML = T('|d(P, F_1) - d(P, F_2)| = |' + n2(d2(P, foci[0])) + ' - ' + n2(d2(P, foci[1])) + '| = ' + n2(Math.abs(d2(P, foci[0]) - d2(P, foci[1]))) + ' = 2a');
            }
            draw();
        }
        /* classificação de A x² + C y² + D x + E y + F = 0 (frações exatas) */
        function identify() {
            const ids = ['A', 'C', 'D', 'E', 'F'], q = ids.map(id => parseNum(S(id).value));
            ids.forEach((id, i) => S(id).classList.toggle('bad', !q[i]));
            if (q.some(x => !x)) { S('eq').textContent = '—'; S('el').textContent = 'Há um coeficiente inválido.'; G = null; draw(); return; }
            const [A, C, D, E, Fc] = q;
            const orig = polyTex([[A, 'x^2'], [C, 'y^2'], [D, 'x'], [E, 'y'], [Fc, '']]) + ' = 0';
            const steps = [T(orig)];
            let res = '', g = null;
            if (A.isZero() && C.isZero()) { res = 'Sem termos de grau 2: é uma <b>reta</b> (ou nada), não uma cônica.'; }
            else if (!A.isZero() && !C.isZero()) {
                const h = D.div(A.mul(2)).neg(), k = E.div(C.mul(2)).neg(), R = A.mul(h.mul(h)).add(C.mul(k.mul(k))).sub(Fc);
                steps.push(T(polyTex([[A, shiftTex('x', h) + '^2'], [C, shiftTex('y', k) + '^2']]) + ' = ' + R.tex()));
                const same = A.sign() === C.sign();
                if (R.isZero()) res = same ? 'Lado direito zero: é <b>um único ponto</b>, ' + T(ptTex(h, k)) + ' (elipse degenerada).' : 'Lado direito zero: é um <b>par de retas concorrentes</b> que se cruzam em ' + T(ptTex(h, k)) + ' (hipérbole degenerada).';
                else {
                    const P2 = R.div(A), Q2 = R.div(C);
                    if (same && P2.n < 0) res = 'O lado direito tem sinal oposto aos coeficientes: <b>nenhum ponto real</b> (conjunto vazio).';
                    else if (same) {
                        if (A.eq(C)) { if (!A.eq(1)) steps.push(T(shiftTex('x', h) + '^2 + ' + shiftTex('y', k) + '^2 = ' + P2.tex())); }
                        else steps.push(T('\\dfrac{' + shiftTex('x', h) + '^2}{' + P2.tex() + '} + \\dfrac{' + shiftTex('y', k) + '^2}{' + Q2.tex() + '} = 1'));
                        if (A.eq(C)) { res = '<b>Circunferência</b> de centro ' + T(ptTex(h, k)) + ' e raio ' + T('r = ' + sqrtTex(P2)) + '.'; g = { type: 'circ', h: h.val(), k: k.val(), rx: Math.sqrt(P2.val()), ry: Math.sqrt(P2.val()), foci: [[h.val(), k.val()]] }; }
                        else {
                            const rx = Math.sqrt(P2.val()), ry = Math.sqrt(Q2.val()), A_ = Math.max(rx, ry), B_ = Math.min(rx, ry), c = Math.sqrt(A_ * A_ - B_ * B_), hz = rx >= ry;
                            const big = hz ? P2 : Q2, small = hz ? Q2 : P2;
                            res = '<b>Elipse</b> de centro ' + T(ptTex(h, k)) + ', eixo maior ' + (hz ? 'horizontal' : 'vertical') + ', ' + T('a = ' + sqrtTex(big) + ',\\ b = ' + sqrtTex(small) + ',\\ c = ' + sqrtTex(big.sub(small))) + '.';
                            g = { type: 'eli', h: h.val(), k: k.val(), rx, ry, foci: hz ? [[h.val() - c, k.val()], [h.val() + c, k.val()]] : [[h.val(), k.val() - c], [h.val(), k.val() + c]] };
                        }
                    } else {
                        const hz = P2.n > 0, a2 = hz ? P2 : Q2, b2 = hz ? Q2.neg() : P2.neg();
                        steps.push(T(hz ? '\\dfrac{' + shiftTex('x', h) + '^2}{' + a2.tex() + '} - \\dfrac{' + shiftTex('y', k) + '^2}{' + b2.tex() + '} = 1' : '\\dfrac{' + shiftTex('y', k) + '^2}{' + a2.tex() + '} - \\dfrac{' + shiftTex('x', h) + '^2}{' + b2.tex() + '} = 1'));
                        const a = Math.sqrt(a2.val()), b = Math.sqrt(b2.val()), c = Math.sqrt(a * a + b * b);
                        res = '<b>Hipérbole</b> de centro ' + T(ptTex(h, k)) + ', focos na ' + (hz ? 'horizontal' : 'vertical') + ', ' + T('a = ' + sqrtTex(a2) + ',\\ b = ' + sqrtTex(b2) + ',\\ c = ' + sqrtTex(a2.add(b2))) + '.';
                        g = { type: 'hip', h: h.val(), k: k.val(), a, b, vert: !hz, foci: hz ? [[h.val() - c, k.val()], [h.val() + c, k.val()]] : [[h.val(), k.val() - c], [h.val(), k.val() + c]] };
                    }
                }
            } else {
                /* parábola: exatamente um termo quadrático */
                const xq = !A.isZero(), Q = xq ? A : C, L = xq ? D : E, M = xq ? E : D; /* Q·u² + L·u + M·w + F = 0 */
                const kk = L.div(Q.mul(2)).neg(), rhs = Q.mul(kk.mul(kk)).sub(Fc); /* Q(u-kk)² + M w = rhs */
                const u = xq ? 'x' : 'y', w = xq ? 'y' : 'x';
                if (M.isZero()) {
                    const val = rhs.div(Q);
                    steps.push(T(shiftTex(u, kk) + '^2 = ' + val.tex()));
                    res = val.n < 0 ? 'Nenhum ponto real (conjunto vazio).' : val.isZero() ? 'Uma única <b>reta</b> (contada duas vezes): ' + T(u + ' = ' + kk.tex()) + '.' : 'Par de <b>retas paralelas</b>: ' + T(u + ' = ' + (kk.isZero() ? '' : kk.tex() + ' ') + '\\pm ' + sqrtTex(val, false)) + '.';
                } else {
                    const hh = rhs.div(M), fourP = M.div(Q).neg(), p = fourP.div(4);
                    steps.push(T(shiftTex(u, kk) + '^2 = ' + polyTex([[fourP, shiftTex(w, hh)]])));
                    const V = xq ? [kk, hh] : [hh, kk];
                    res = '<b>Parábola</b> de vértice ' + T(ptTex(V[0], V[1])) + ', ' + T('4p = ' + fourP.tex()) + ', abrindo para ' + (xq ? (p.n > 0 ? 'cima' : 'baixo') : (p.n > 0 ? 'a direita' : 'a esquerda')) + '.';
                    g = { type: 'par', h: V[0].val(), k: V[1].val(), p: p.val(), vert: xq, foci: [xq ? [V[0].val(), V[1].val() + p.val()] : [V[0].val() + p.val(), V[1].val()]] };
                }
            }
            S('eq').innerHTML = steps.join('<br>');
            S('el').innerHTML = res;
            G = g; if (G) G.P = null;
            draw();
        }
        function draw() {
            if (!plot.fit()) return;
            squareView(plot, 8); plot.clear(); plot.grid();
            if (!G) return;
            const c = plot.ctx, g = G;
            const path = (fx, a, b, n, color, w) => { c.save(); c.strokeStyle = color; c.lineWidth = w || 2.6; c.beginPath(); for (let i = 0; i <= n; i++) { const p = fx(a + (b - a) * i / n); const X = plot.X(p[0]), Y = plot.Y(p[1]); i ? c.lineTo(X, Y) : c.moveTo(X, Y); } c.stroke(); c.restore(); };
            if (g.type === 'circ' || g.type === 'eli') path(t => [g.h + g.rx * Math.cos(t), g.k + g.ry * Math.sin(t)], 0, 2 * Math.PI, 240, '#38bdf8');
            if (g.type === 'par') {
                path(s => g.vert ? [g.h + s, g.k + s * s / (4 * g.p)] : [g.h + s * s / (4 * g.p), g.k + s], -14, 14, 300, '#38bdf8');
                if (g.vert) plot.line(-40, g.k - g.p, 40, g.k - g.p, 'rgba(167,139,250,.9)', 1.6, [7, 6]); else plot.line(g.h - g.p, -40, g.h - g.p, 40, 'rgba(167,139,250,.9)', 1.6, [7, 6]);
                plot.dot(g.h, g.k, '#e2e8f0', 4);
            }
            if (g.type === 'hip') {
                [1, -1].forEach(br => path(u => g.vert ? [g.h + g.b * Math.sinh(u), g.k + br * g.a * Math.cosh(u)] : [g.h + br * g.a * Math.cosh(u), g.k + g.b * Math.sinh(u)], -3.2, 3.2, 240, '#38bdf8'));
                const m = g.vert ? g.a / g.b : g.b / g.a;
                plot.slopeLine(g.h, g.k, m, 'rgba(167,139,250,.75)', 1.4, [7, 6]); plot.slopeLine(g.h, g.k, -m, 'rgba(167,139,250,.75)', 1.4, [7, 6]);
                c.save(); c.strokeStyle = 'rgba(148,163,184,.35)'; c.setLineDash([3, 4]); const ax = g.vert ? g.b : g.a, ay = g.vert ? g.a : g.b;
                c.strokeRect(plot.X(g.h - ax), plot.Y(g.k + ay), plot.X(g.h + ax) - plot.X(g.h - ax), plot.Y(g.k - ay) - plot.Y(g.k + ay)); c.restore();
                (g.vert ? [[g.h, g.k + g.a], [g.h, g.k - g.a]] : [[g.h + g.a, g.k], [g.h - g.a, g.k]]).forEach(p => plot.dot(p[0], p[1], '#e2e8f0', 4));
            }
            if (g.type === 'eli') { const hz = g.rx >= g.ry; (hz ? [[g.h + g.rx, g.k], [g.h - g.rx, g.k]] : [[g.h, g.k + g.ry], [g.h, g.k - g.ry]]).forEach(p => plot.dot(p[0], p[1], '#e2e8f0', 4)); }
            if (g.type === 'circ') plot.dot(g.h, g.k, '#e2e8f0', 4);
            /* ponto P e distâncias */
            if (g.P) {
                const col = '#f472b6';
                if (g.type === 'circ') plot.line(g.P[0], g.P[1], g.h, g.k, col, 1.8, [5, 4]);
                else g.foci.forEach(f => plot.line(g.P[0], g.P[1], f[0], f[1], col, 1.8, [5, 4]));
                if (g.type === 'par') { if (g.vert) plot.line(g.P[0], g.P[1], g.P[0], g.k - g.p, '#a78bfa', 1.8, [5, 4]); else plot.line(g.P[0], g.P[1], g.h - g.p, g.P[1], '#a78bfa', 1.8, [5, 4]); }
                plot.dot(g.P[0], g.P[1], col, 6); label(plot, g.P[0], g.P[1], 'P', col);
            }
            if (g.type !== 'circ') g.foci.forEach((f, i) => { plot.dot(f[0], f[1], '#fbbf24', 5.5); label(plot, f[0], f[1], g.foci.length > 1 ? 'F' + (i + 1) : 'F', '#fbbf24'); });
        }
        plot.redraw = draw;
        S('mode').addEventListener('change', () => { setVisibility(S('mode').value); build(); });
        root.querySelectorAll('#cn-params input').forEach(el => el.addEventListener('input', build));
        ['A', 'C', 'D', 'E', 'F'].forEach(id => S(id).addEventListener('input', identify));
        S('idpre').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; b.dataset.v.split(' ').forEach((x, i) => { S(['A', 'C', 'D', 'E', 'F'][i]).value = x; }); identify(); });
        setVisibility(S('mode').value); build();
        return draw;
    }

    /* =========================================================
       VETORES NO ESPAÇO (projeção 3D girável)
       ========================================================= */
    function initEspaco(root) {
        const vin = (id, vals, color) => '<div class="ctl"><label style="color:' + color + '">' + T('\\vec ' + id) + '</label><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:5px">' +
            vals.map((x, i) => '<input class="plain-in" id="sp-' + id + i + '" value="' + x + '" spellcheck="false" autocomplete="off" style="text-align:center" aria-label="' + id + ' componente ' + (i + 1) + '">').join('') + '</div></div>';
        root.innerHTML =
            '<div class="lab-grid">' +
              '<div class="lab-stage"><canvas id="sp-cv" style="cursor:grab"></canvas></div>' +
              '<div class="lab-side">' +
                vin('u', [2, 0, 0], '#38bdf8') + vin('v', [1, 2, 0], '#f472b6') + vin('w', [0, 1, 2], '#a78bfa') +
                '<div class="ctl seg" style="flex-wrap:wrap;gap:8px 14px"><label><input type="checkbox" id="sp-cross" checked> ' + T('\\vec u \\times \\vec v') + '</label><label><input type="checkbox" id="sp-par" checked> paralelogramo</label><label><input type="checkbox" id="sp-box"> paralelepípedo</label><label><input type="checkbox" id="sp-plane"> plano</label></div>' +
                '<div class="ctl"><label for="sp-zoom">Zoom</label><input id="sp-zoom" type="range" min="0.5" max="2" step="0.05" value="1"></div>' +
                '<div class="readout">' +
                  '<div><span>' + T('\\vec u \\cdot \\vec v') + '</span><b id="sp-dot"></b></div><div><span>Ângulo</span><b id="sp-ang"></b></div>' +
                  '<div class="wide"><span>' + T('\\vec u \\times \\vec v') + '</span><b class="tex-line" id="sp-x"></b></div>' +
                  '<div><span>Área do paralelogramo</span><b id="sp-area"></b></div><div><span>Área do triângulo</span><b id="sp-tri"></b></div>' +
                  '<div class="wide"><span>' + T('[\\vec u, \\vec v, \\vec w]') + ' (volume)</span><b id="sp-mix" style="font-family:var(--sans);font-size:.9rem"></b></div>' +
                '</div>' +
                '<div class="presets" id="sp-pre"><button type="button" data-v="1 0 0|0 1 0|0 0 1">base canônica</button><button type="button" data-v="1 2 0|0 1 3|1 3 3">coplanares</button><button type="button" data-v="2 1 -1|1 3 2|1 -1 1">geral</button><button type="button" data-v="1 2 3|2 4 6|0 1 0">paralelos</button></div>' +
              '</div>' +
            '</div>' +
            '<div class="lab-under"><div class="lab-note"><strong>Como usar.</strong> Arraste no gráfico para girar a cena. ' + T('\\vec u') + ' azul, ' + T('\\vec v') + ' rosa, ' + T('\\vec w') + ' roxo e ' + T('\\vec u \\times \\vec v') + ' verde. Gire até olhar o paralelogramo "de lado": o produto vetorial fica perpendicular a ele, apontando pela regra da mão direita.</div>' +
              '<div class="lab-note"><strong>Experimente.</strong> Troque a ordem (ponha ' + T('\\vec v') + ' no lugar de ' + T('\\vec u') + '): o produto vetorial inverte. Com vetores paralelos, ele vira ' + T('\\vec 0') + '. Com o preset "coplanares", o paralelepípedo fica achatado e o volume é zero.' +
              '<p class="muted-p">"Plano" mostra o plano pela origem gerado por ' + T('\\vec u') + ' e ' + T('\\vec v') + ', com equação ' + T('ax + by + cz = 0') + ' em que ' + T('(a, b, c) = \\vec u \\times \\vec v') + '.</p></div></div>';

        const S = k => $('#sp-' + k, root);
        const cv = S('cv');
        let yaw = -0.7, pitch = 0.45, drag = null;

        const vecOf = id => [0, 1, 2].map(i => { const f = parseNum(S(id + i).value); S(id + i).classList.toggle('bad', !f); return f; });
        const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
        const crossF = (a, b) => [a[1].mul(b[2]).sub(a[2].mul(b[1])), a[2].mul(b[0]).sub(a[0].mul(b[2])), a[0].mul(b[1]).sub(a[1].mul(b[0]))];
        const dotF = (a, b) => a[0].mul(b[0]).add(a[1].mul(b[1])).add(a[2].mul(b[2]));
        const norm = a => Math.hypot(a[0], a[1], a[2]);
        const vtex = a => '(' + a.map(x => x.tex()).join(',\\ ') + ')';
        function rootTex(f) { const v = f.val(), r = Math.sqrt(v); if (Math.abs(r - Math.round(r)) < 1e-9) return String(Math.round(r)); return '\\sqrt{' + f.tex() + '} \\approx ' + n2(r); }

        let state = null;
        function update() {
            const U = vecOf('u'), V = vecOf('v'), W = vecOf('w');
            if ([...U, ...V, ...W].some(x => !x)) { state = null; S('x').textContent = 'Há uma componente inválida.'; draw(); return; }
            const X = crossF(U, V), d = dotF(U, V), mix = dotF(U, crossF(V, W));
            const u = U.map(x => x.val()), v = V.map(x => x.val()), w = W.map(x => x.val()), x = X.map(f => f.val());
            state = { u, v, w, x };
            S('dot').textContent = fmt(d.val(), 5);
            const nu = norm(u), nv = norm(v);
            S('ang').textContent = nu && nv ? fmt(Math.acos(Math.max(-1, Math.min(1, d.val() / (nu * nv)))) * 180 / Math.PI, 4) + '°' : '—';
            const isZero = X.every(f => f.isZero());
            S('x').innerHTML = T(vtex(X)) + (isZero ? ' &nbsp;<span style="font-size:.85rem">(paralelos: área zero)</span>' : ' &nbsp;<span style="font-size:.85rem">✓ ' + T('\\perp \\vec u') + ' e ' + T('\\vec v') + '</span>');
            const area2 = dotF(X, X);
            S('area').innerHTML = T(rootTex(area2)); S('tri').innerHTML = T(area2.isZero() ? '0' : '\\tfrac12 \\cdot ' + rootTex(area2).replace(/ \\approx .*/, '') + (Number.isInteger(Math.sqrt(area2.val())) ? '' : ' \\approx ' + n2(Math.sqrt(area2.val()) / 2)));
            S('mix').innerHTML = T(mix.tex()) + (mix.isZero() ? ' → coplanares: volume zero.' : ' → volume do paralelepípedo ' + T(mix.n < 0 ? mix.neg().tex() : mix.tex()) + ', do tetraedro ' + T((mix.n < 0 ? mix.neg() : mix).div(6).tex()) + '.');
            draw();
        }
        function project(p, cx, cy, s) {
            const [x, y, z] = p;
            const x1 = x * Math.cos(yaw) - y * Math.sin(yaw), y1 = x * Math.sin(yaw) + y * Math.cos(yaw);
            const z2 = z * Math.cos(pitch) - y1 * Math.sin(pitch), depth = z * Math.sin(pitch) + y1 * Math.cos(pitch);
            return [cx + x1 * s, cy - z2 * s, depth];
        }
        function draw() {
            const r = cv.getBoundingClientRect(), dpr = window.devicePixelRatio || 1, W = Math.round(r.width), H = Math.round(r.height);
            if (!W || !H) return;
            if (cv.width !== W * dpr || cv.height !== H * dpr) { cv.width = W * dpr; cv.height = H * dpr; }
            const c = cv.getContext('2d'); c.setTransform(dpr, 0, 0, dpr, 0, 0);
            c.fillStyle = '#0c1220'; c.fillRect(0, 0, W, H);
            const st = state, vs = st ? [st.u, st.v, S('box').checked ? st.w : [0, 0, 0], S('cross').checked ? st.x : [0, 0, 0]] : [];
            const R = Math.max(3, ...vs.map(norm), ...(st && S('box').checked ? [norm([st.u[0] + st.v[0] + st.w[0], st.u[1] + st.v[1] + st.w[1], st.u[2] + st.v[2] + st.w[2]])] : []));
            const s = Math.min(W, H) * 0.46 / R * +S('zoom').value, cx = W / 2, cy = H / 2 + H * 0.05;
            const P = p => project(p, cx, cy, s);
            const seg = (a, b, color, w, dash) => { const A = P(a), B = P(b); c.save(); c.strokeStyle = color; c.lineWidth = w || 1; c.setLineDash(dash || []); c.beginPath(); c.moveTo(A[0], A[1]); c.lineTo(B[0], B[1]); c.stroke(); c.restore(); };
            const poly = (pts, fill, stroke) => { c.save(); c.beginPath(); pts.map(P).forEach((q, i) => i ? c.lineTo(q[0], q[1]) : c.moveTo(q[0], q[1])); c.closePath(); c.fillStyle = fill; c.fill(); if (stroke) { c.strokeStyle = stroke; c.lineWidth = 1.2; c.stroke(); } c.restore(); };
            /* grade no plano xy */
            const G = Math.ceil(Math.max(2, ...[st ? st.u : [0, 0, 0], st ? st.v : [0, 0, 0]].map(norm)) + 1);
            for (let i = -G; i <= G; i++) { seg([i, -G, 0], [i, G, 0], 'rgba(148,163,184,.10)'); seg([-G, i, 0], [G, i, 0], 'rgba(148,163,184,.10)'); }
            /* eixos */
            [[[G + 0.6, 0, 0], 'x'], [[0, G + 0.6, 0], 'y'], [[0, 0, G + 0.6], 'z']].forEach(([e, l]) => {
                seg([-e[0] * 0.3, -e[1] * 0.3, -e[2] * 0.3], e, 'rgba(203,213,225,.55)', 1.3);
                const q = P(e); c.fillStyle = '#cbd5e1'; c.font = '600 13px "JetBrains Mono", monospace'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(l, q[0] + 8, q[1] - 8);
            });
            if (!st) return;
            const { u, v, w, x } = st, add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
            if (S('plane').checked && norm(x) > 1e-9) {
                const L = R * 1.1, uh = u.map(t => t / norm(u) * L), vh = v.map(t => t / norm(v) * L), neg = q => q.map(t => -t);
                poly([add(uh, vh), add(uh, neg(vh)), add(neg(uh), neg(vh)), add(neg(uh), vh)], 'rgba(52,211,153,.08)', 'rgba(52,211,153,.35)');
            }
            if (S('par').checked) poly([[0, 0, 0], u, add(u, v), v], 'rgba(56,189,248,.18)', 'rgba(56,189,248,.6)');
            if (S('box').checked) {
                const o = [0, 0, 0], corners = [o, u, v, w, add(u, v), add(u, w), add(v, w), add(add(u, v), w)];
                [[0, 1], [0, 2], [0, 3], [1, 4], [1, 5], [2, 4], [2, 6], [3, 5], [3, 6], [4, 7], [5, 7], [6, 7]].forEach(([i, j]) => seg(corners[i], corners[j], 'rgba(167,139,250,.55)', 1.2, [4, 4]));
            }
            const arrow3 = (vec, color, lab) => { const A = P([0, 0, 0]), B = P(vec); if (norm(vec) < 1e-9) return; arrowPx(c, A[0], A[1], B[0], B[1], color, 3, lab); };
            const items = [[u, '#38bdf8', 'u'], [v, '#f472b6', 'v']];
            if (S('box').checked) items.push([w, '#a78bfa', 'w']);
            if (S('cross').checked) items.push([x, '#34d399', 'u×v']);
            items.sort((a, b) => P(a[0])[2] - P(b[0])[2]).forEach(it => arrow3(it[0], it[1], it[2]));
            c.fillStyle = '#e2e8f0'; const O = P([0, 0, 0]); c.beginPath(); c.arc(O[0], O[1], 3, 0, Math.PI * 2); c.fill();
        }
        cv.addEventListener('pointerdown', e => { drag = [e.clientX, e.clientY, yaw, pitch]; cv.setPointerCapture(e.pointerId); cv.style.cursor = 'grabbing'; });
        cv.addEventListener('pointermove', e => { if (!drag) return; yaw = drag[2] + (e.clientX - drag[0]) * 0.01; pitch = Math.max(-1.45, Math.min(1.45, drag[3] + (e.clientY - drag[1]) * 0.01)); draw(); });
        cv.addEventListener('pointerup', () => { drag = null; cv.style.cursor = 'grab'; });
        root.querySelectorAll('input.plain-in').forEach(el => el.addEventListener('input', update));
        ['cross', 'par', 'box', 'plane'].forEach(k => S(k).addEventListener('change', draw));
        S('zoom').addEventListener('input', draw);
        S('pre').addEventListener('click', e => {
            const b = e.target.closest('button'); if (!b) return;
            b.dataset.v.split('|').forEach((t, j) => t.split(' ').forEach((x, i) => { S(['u', 'v', 'w'][j] + i).value = x; }));
            if (/coplanares/.test(b.textContent)) S('box').checked = true;
            update();
        });
        if (window.ResizeObserver) new ResizeObserver(draw).observe(cv);
        update();
        return draw;
    }

    return { init: { retas: initRetas, conicas: initConicas, espaco: initEspaco }, lineThrough, polyTex };
})();
