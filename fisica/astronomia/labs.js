/* Astronomia: simuladores Planetário, Sistema Solar (com movimento retrógrado), Órbitas (Kepler, canhão de Newton, exoplanetas) e Lua (fases e eclipses).
   Posições de Sol, Lua e planetas: fisica/dados/astro.js. Estrelas e constelações: dados/ceu.js. */
window.MATH = window.MATH || {};

MATH.labs = (function () {
    'use strict';

    const A = MATH.astro, SKY = MATH.sky, { T, fmt } = MATH.plot;
    const $ = (s, r) => (r || document).querySelector(s);
    const D2R = Math.PI / 180, R2D = 180 / Math.PI;
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    const nf = (x, d) => fmt(Math.abs(x) < 5e-13 ? 0 : x, d === undefined ? 4 : d);
    const pad = n => String(n).padStart(2, '0');
    const MIN_T = Date.UTC(1800, 0, 1, 12), MAX_T = Date.UTC(2050, 11, 31, 12);
    const cell = (lab, val, wide) => '<div' + (wide ? ' class="wide"' : '') + '><span>' + lab + '</span><b>' + val + '</b></div>';
    const visible = el => !!(el && el.offsetParent && el.closest('.lab-panel.active'));

    function canvas2d(cv, bg) {
        const r = cv.getBoundingClientRect(), dpr = window.devicePixelRatio || 1, W = Math.round(r.width), H = Math.round(r.height);
        if (!W || !H) return null;
        if (cv.width !== W * dpr || cv.height !== H * dpr) { cv.width = W * dpr; cv.height = H * dpr; }
        const c = cv.getContext('2d'); c.setTransform(dpr, 0, 0, dpr, 0, 0);
        c.fillStyle = bg || '#05070f'; c.fillRect(0, 0, W, H);
        return { c, W, H };
    }
    function arrowPx(c, x0, y0, x1, y1, color, w) {
        const a = Math.atan2(y1 - y0, x1 - x0), L = Math.hypot(x1 - x0, y1 - y0), hd = Math.min(10, L * 0.45);
        c.save(); c.strokeStyle = color; c.fillStyle = color; c.lineWidth = w || 2; c.lineCap = 'round';
        c.beginPath(); c.moveTo(x0, y0); c.lineTo(x1 - hd * 0.6 * Math.cos(a), y1 - hd * 0.6 * Math.sin(a)); c.stroke();
        c.beginPath(); c.moveTo(x1, y1); c.lineTo(x1 - hd * Math.cos(a - 0.42), y1 - hd * Math.sin(a - 0.42)); c.lineTo(x1 - hd * Math.cos(a + 0.42), y1 - hd * Math.sin(a + 0.42)); c.closePath(); c.fill();
        c.restore();
    }
    function label(c, txt, x, y, color, font, align) {
        c.save(); c.font = font || '600 12px "Plus Jakarta Sans", sans-serif'; c.textAlign = align || 'left'; c.textBaseline = 'middle';
        c.lineWidth = 3; c.strokeStyle = 'rgba(5,7,15,.85)'; c.strokeText(txt, x, y); c.fillStyle = color; c.fillText(txt, x, y); c.restore();
    }
    const fmtRA = ra => { const h = A.norm360(ra) / 15, H = Math.floor(h), m = (h - H) * 60, M = Math.floor(m), s = Math.round((m - M) * 60); return H + 'h ' + pad(s === 60 ? M + 1 : M) + 'm ' + pad(s === 60 ? 0 : s) + 's'; };
    const fmtDeg = d => { const s = d < 0 ? '−' : '+', a = Math.abs(d), D = Math.floor(a), m = Math.round((a - D) * 60); return s + (m === 60 ? D + 1 : D) + '° ' + pad(m === 60 ? 0 : m) + '′'; };
    const fmtLocal = (t, tz) => { const d = new Date(t + tz * 3600000); return pad(d.getUTCDate()) + '/' + pad(d.getUTCMonth() + 1) + '/' + d.getUTCFullYear() + ' ' + pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()); };
    const toInput = (t, tz) => { const d = new Date(t + tz * 3600000); return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate()) + 'T' + pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()); };
    const fromInput = (s, tz) => { const m = /^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)/.exec(s || ''); return m ? Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5]) - tz * 3600000 : NaN; };
    const tzLabel = tz => 'UTC' + (tz >= 0 ? '+' : '−') + Math.abs(tz);

    /* cor aproximada de uma estrela a partir do índice B−V */
    const BV = [[-0.4, [155, 176, 255]], [0, [202, 215, 255]], [0.3, [248, 247, 255]], [0.6, [255, 244, 234]], [0.9, [255, 228, 196]], [1.2, [255, 206, 156]], [1.6, [255, 180, 120]], [2.0, [255, 160, 100]]];
    function bvColor(bv) {
        if (!(bv > -0.4)) bv = -0.4; if (bv > 2) bv = 2;
        let i = 0; while (i < BV.length - 2 && bv > BV[i + 1][0]) i++;
        const [b0, c0] = BV[i], [b1, c1] = BV[i + 1], u = (bv - b0) / (b1 - b0);
        return c0.map((v, k) => Math.round(v + (c1[k] - v) * u));
    }

    const CITIES = [
        { n: 'São Paulo', lat: -23.55, lon: -46.63, tz: -3 }, { n: 'Rio de Janeiro', lat: -22.91, lon: -43.17, tz: -3 },
        { n: 'Brasília', lat: -15.79, lon: -47.88, tz: -3 }, { n: 'Belo Horizonte', lat: -19.92, lon: -43.94, tz: -3 },
        { n: 'Salvador', lat: -12.97, lon: -38.50, tz: -3 }, { n: 'Recife', lat: -8.05, lon: -34.88, tz: -3 },
        { n: 'Fortaleza', lat: -3.73, lon: -38.52, tz: -3 }, { n: 'Belém', lat: -1.46, lon: -48.50, tz: -3 },
        { n: 'Manaus', lat: -3.12, lon: -60.02, tz: -4 }, { n: 'Curitiba', lat: -25.43, lon: -49.27, tz: -3 },
        { n: 'Porto Alegre', lat: -30.03, lon: -51.23, tz: -3 }, { n: 'Lisboa', lat: 38.72, lon: -9.14, tz: 0 },
        { n: 'Quito (equador)', lat: -0.18, lon: -78.47, tz: -5 }, { n: 'Polo Norte', lat: 89.99, lon: 0, tz: 0 }, { n: 'Polo Sul', lat: -89.99, lon: 0, tz: 0 }
    ];
    function cityOptions() { return CITIES.map((c, i) => '<option value="' + i + '">' + c.n + '</option>').join('') + '<option value="x">Outro lugar…</option>'; }

    /* =========================================================
       PLANETÁRIO
       ========================================================= */
    function initPlanetario(root) {
        const SPEEDS = [[0, 'parado'], [1, 'tempo real'], [60, '1 min por segundo'], [600, '10 min por segundo'], [3600, '1 hora por segundo'], [-3600, '1 hora por segundo, para trás'], [86164.09, '1 dia sideral por segundo (estrelas paradas)'], [86400 * 7, '1 semana por segundo']];
        root.innerHTML =
            '<div class="lab-grid">' +
              '<div class="lab-stage tall"><canvas id="pl-cv" style="cursor:grab" aria-label="Céu simulado"></canvas>' +
                '<div class="stage-ui" style="right:10px;top:10px"><button class="btn small ghost" id="pl-zin" type="button" title="Aproximar" aria-label="Aproximar"><i class="fa-solid fa-plus"></i></button><button class="btn small ghost" id="pl-zout" type="button" title="Afastar" aria-label="Afastar"><i class="fa-solid fa-minus"></i></button></div>' +
              '</div>' +
              '<div class="lab-side">' +
                '<div class="ctl"><label for="pl-city">Lugar</label><select id="pl-city">' + cityOptions() + '</select>' +
                  '<div id="pl-custom" hidden style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:6px"><input class="plain-in" id="pl-lat" aria-label="Latitude" placeholder="lat"><input class="plain-in" id="pl-lon" aria-label="Longitude" placeholder="lon"><input class="plain-in" id="pl-tz" aria-label="Fuso (UTC)" placeholder="UTC"></div>' +
                  '<div class="fn-hint" id="pl-where"></div></div>' +
                '<div class="ctl"><label for="pl-date">Data e hora local</label><div style="display:flex;gap:6px"><input class="plain-in" id="pl-date" type="datetime-local" min="1800-01-01T00:00" max="2050-12-31T23:59"><button class="btn small" id="pl-now" type="button">Agora</button></div></div>' +
                '<div class="ctl"><label for="pl-speed">Passagem do tempo</label><div style="display:flex;gap:6px"><select id="pl-speed" style="flex:1">' + SPEEDS.map((s, i) => '<option value="' + i + '"' + (i === 0 ? ' selected' : '') + '>' + s[1] + '</option>').join('') + '</select><button class="btn small primary" id="pl-play" type="button" aria-label="Iniciar ou pausar"><i class="fa-solid fa-play"></i></button></div></div>' +
                '<div class="ctl"><label for="pl-view">Vista</label><select id="pl-view"><option value="dome">Céu inteiro (cúpula)</option><option value="horiz">Olhar para o horizonte (arraste e aproxime)</option></select></div>' +
                '<div class="ctl"><label for="pl-goto">Encontrar</label><select id="pl-goto"><option value="">Escolha um astro…</option></select></div>' +
                '<div class="ctl seg" style="flex-wrap:wrap;gap:6px 12px;font-size:.84rem">' +
                  [['lines', 'constelações', 1], ['cnames', 'nomes das constelações', 1], ['snames', 'nomes de estrelas', 1], ['planets', 'Sol, Lua e planetas', 1], ['ecl', 'eclíptica', 0], ['altaz', 'grade altura/azimute', 0], ['eq', 'grade equatorial', 0], ['atm', 'luz do dia', 1]]
                    .map(([k, l, on]) => '<label><input type="checkbox" id="pl-' + k + '"' + (on ? ' checked' : '') + '> ' + l + '</label>').join('') + '</div>' +
                '<div class="readout" id="pl-out"></div>' +
              '</div>' +
            '</div>' +
            '<div class="lab-under">' +
              '<div class="lab-note"><strong>Como usar.</strong> Na vista "céu inteiro", o círculo é o horizonte e o centro, o zênite; arraste para girar. Em "olhar para o horizonte", arraste para mudar a direção e use a roda do mouse, o gesto de pinça ou os botões para aproximar. Clique num astro para ver as coordenadas. Acelere o tempo: em "1 dia sideral por segundo" as estrelas ficam paradas e só Sol, Lua e planetas andam entre elas.</div>' +
              '<div class="lab-note"><strong>Experimente.</strong> Ponha o Polo Sul e depois Quito: veja as estrelas girarem em círculos paralelos ao horizonte e depois nascerem na vertical. Ligue a eclíptica e confira que Sol, Lua e planetas andam sempre perto dela. Volte a 21 de dezembro ao meio-dia em São Paulo e encontre o Sol praticamente no zênite.' +
              '<p class="muted-p">Cerca de 5 000 estrelas até magnitude 6 (catálogo Hipparcos, via projeto d3-celestial). Posições de Sol, Lua e planetas calculadas no próprio navegador, com precisão de alguns minutos de arco (Lua: cerca de 0,1°), para datas entre 1800 e 2050. Não inclui refração atmosférica.</p></div>' +
            '</div>';

        const S = k => $('#pl-' + k, root), cv = S('cv');
        const st = { t: Date.now(), playing: false, speed: 0, view: 'dome', az0: 0, alt0: 25, fov: 90, domeRot: 0, sel: null, city: CITIES[0], lastFrame: 0 };
        const L = k => S(k).checked;
        let picks = [];

        /* vetores das estrelas e das constelações no equinócio da data (recalculados a cada mês simulado) */
        const NS = SKY.stars.length, SV = new Float64Array(NS * 3), COL = SKY.stars.map(s => { const c = bvColor(s[3]); return c.join(','); });
        let precT = NaN, LINES = [], CONS = [];
        function precess(date) {
            if (Math.abs(date.getTime() - precT) < 30 * 86400000) return;
            precT = date.getTime();
            const P = A.precessionMatrix(date);
            for (let i = 0; i < NS; i++) { const v = A.mul(P, A.vec(SKY.stars[i][0], SKY.stars[i][1])); SV[3 * i] = v[0]; SV[3 * i + 1] = v[1]; SV[3 * i + 2] = v[2]; }
            LINES = Object.keys(SKY.lines).map(k => SKY.lines[k].map(seg => seg.map(p => A.mul(P, A.vec(p[0], p[1])))));
            CONS = Object.keys(SKY.cons).map(k => ({ id: k, name: SKY.cons[k][2], rank: SKY.cons[k][3], v: A.mul(P, A.vec(SKY.cons[k][0], SKY.cons[k][1])) }));
        }

        /* lista "Encontrar" */
        const GOTO = [{ k: 'sol', n: 'Sol' }, { k: 'lua', n: 'Lua' }].concat(A.PLANETS.filter(p => p.id !== 'terra').map(p => ({ k: p.id, n: p.name })));
        const named = Object.keys(SKY.names).map(i => ({ k: 'st:' + i, n: SKY.names[i], i: +i })).sort((a, b) => a.n.localeCompare(b.n, 'pt'));
        const consList = Object.keys(SKY.cons).map(k => ({ k: 'co:' + k, n: SKY.cons[k][2], id: k })).sort((a, b) => a.n.localeCompare(b.n, 'pt'));
        S('goto').insertAdjacentHTML('beforeend',
            '<optgroup label="Sistema Solar">' + GOTO.map(o => '<option value="' + o.k + '">' + o.n + '</option>').join('') + '</optgroup>' +
            '<optgroup label="Estrelas">' + named.map(o => '<option value="' + o.k + '">' + o.n + '</option>').join('') + '</optgroup>' +
            '<optgroup label="Constelações">' + consList.map(o => '<option value="' + o.k + '">' + o.n + '</option>').join('') + '</optgroup>');

        /* ----- posições de um instante ----- */
        function solarSystem(date, H) {
            const P = A.precessionMatrix(date), out = [];
            const sun = A.geo('sol', date, P), hs = A.toHoriz(H, sun.v);
            out.push({ k: 'sol', name: 'Sol', type: 'estrela', v: sun.v, h: hs, ra: sun.ra, dec: sun.dec, dist: sun.dist, mag: -26.7, color: '#ffe9a8' });
            const mo = A.moonTopo(date, st.city.lat, st.city.lon), hm = A.toHoriz(H, mo.v), ph = A.moonPhase(date);
            out.push({ k: 'lua', name: 'Lua', type: 'satélite natural', v: mo.v, h: hm, ra: mo.ra, dec: mo.dec, distKm: mo.dist, mag: -12.7 * Math.min(1, ph.frac + 0.05), phase: ph, color: '#e7e9ee' });
            A.PLANETS.forEach(p => {
                if (p.id === 'terra') return;
                const g = A.geo(p.id, date, P);
                out.push({ k: p.id, name: p.name, type: 'planeta', v: g.v, h: A.toHoriz(H, g.v), ra: g.ra, dec: g.dec, dist: g.dist, mag: A.planetMag(p.id, date), color: p.color });
            });
            return { list: out, sun: out[0], moon: out[1] };
        }

        /* ----- projeção estereográfica ----- */
        function camera(W, Hh) {
            if (st.view === 'dome') {
                const R = Math.min(W, Hh) / 2 - 26, az = st.domeRot * D2R;
                return { f: [0, 0, 1], r: [Math.cos(az), -Math.sin(az), 0], u: [-Math.sin(az), -Math.cos(az), 0], s: R / 2, cx: W / 2, cy: Hh / 2, R };
            }
            const az = st.az0 * D2R, al = st.alt0 * D2R;
            const f = [Math.cos(al) * Math.sin(az), Math.cos(al) * Math.cos(az), Math.sin(al)], r = [Math.cos(az), -Math.sin(az), 0];
            const u = [r[1] * f[2] - r[2] * f[1], r[2] * f[0] - r[0] * f[2], r[0] * f[1] - r[1] * f[0]];
            return { f, r, u, s: (W / 2) / (2 * Math.tan(st.fov * D2R / 4)), cx: W / 2, cy: Hh / 2 };
        }
        function proj(cam, h) {
            const X = h.e * cam.r[0] + h.n * cam.r[1] + h.u * cam.r[2], Y = h.e * cam.u[0] + h.n * cam.u[1] + h.u * cam.u[2], Z = h.e * cam.f[0] + h.n * cam.f[1] + h.u * cam.f[2];
            if (Z < -0.9) return null;
            const k = 2 / (1 + Z);
            return [cam.cx + cam.s * k * X, cam.cy - cam.s * k * Y];
        }
        const hAltAz = (alt, az) => ({ e: Math.cos(alt * D2R) * Math.sin(az * D2R), n: Math.cos(alt * D2R) * Math.cos(az * D2R), u: Math.sin(alt * D2R) });
        function polyline(c, cam, pts, color, width, dash) {
            c.save(); c.strokeStyle = color; c.lineWidth = width || 1; if (dash) c.setLineDash(dash); c.beginPath();
            let pen = false;
            pts.forEach(h => {
                const p = h && h.u > -0.02 ? proj(cam, h) : null;
                if (!p) { pen = false; return; }
                if (pen) c.lineTo(p[0], p[1]); else { c.moveTo(p[0], p[1]); pen = true; }
            });
            c.stroke(); c.restore();
        }

        function draw() {
            const g = canvas2d(cv); if (!g) return;
            const { c, W, H: Hh } = g;
            const date = new Date(st.t), city = st.city;
            precess(date);
            const Hm = A.horizMatrix(date, city.lat, city.lon), cam = camera(W, Hh);
            const sys = solarSystem(date, Hm), sunAlt = sys.sun.h.alt;
            const atm = L('atm');
            /* cor do céu e limite de magnitude */
            const day = atm ? clamp((sunAlt + 12) / 18, 0, 1) : 0;
            const limit = !atm || sunAlt <= -18 ? 6.2 : sunAlt >= 0 ? -1.5 : -1.5 + (-sunAlt) / 18 * 7.7;
            const sky = 'rgb(' + [Math.round(5 + 60 * day), Math.round(8 + 120 * day), Math.round(20 + 190 * day)].join(',') + ')';
            picks = [];
            c.save();
            if (st.view === 'dome') {
                c.fillStyle = '#0b0f19'; c.fillRect(0, 0, W, Hh);
                const gr = c.createRadialGradient(cam.cx, cam.cy, cam.R * 0.2, cam.cx, cam.cy, cam.R);
                gr.addColorStop(0, sky); gr.addColorStop(1, 'rgb(' + [Math.round(12 + 90 * day), Math.round(18 + 140 * day), Math.round(38 + 180 * day)].join(',') + ')');
                c.beginPath(); c.arc(cam.cx, cam.cy, cam.R, 0, Math.PI * 2); c.fillStyle = gr; c.fill(); c.clip();
            } else {
                const gr = c.createLinearGradient(0, 0, 0, Hh); gr.addColorStop(0, sky); gr.addColorStop(1, 'rgb(' + [Math.round(12 + 90 * day), Math.round(18 + 140 * day), Math.round(38 + 180 * day)].join(',') + ')');
                c.fillStyle = gr; c.fillRect(0, 0, W, Hh);
            }
            /* grades */
            if (L('altaz')) {
                for (let a = 0; a <= 60; a += 30) { const pts = []; for (let z = 0; z <= 360; z += 3) pts.push(hAltAz(a, z)); polyline(c, cam, pts, 'rgba(110,231,183,.28)', 1); }
                for (let z = 0; z < 360; z += 30) { const pts = []; for (let a = 0; a <= 90; a += 3) pts.push(hAltAz(a, z)); polyline(c, cam, pts, 'rgba(110,231,183,.22)', 1); }
            }
            if (L('eq')) {
                for (let d = -60; d <= 60; d += 30) { const pts = []; for (let r = 0; r <= 360; r += 3) pts.push(A.toHoriz(Hm, A.vec(r, d))); polyline(c, cam, pts, d === 0 ? 'rgba(125,211,252,.55)' : 'rgba(125,211,252,.25)', d === 0 ? 1.4 : 1); }
                for (let r = 0; r < 360; r += 30) { const pts = []; for (let d = -88; d <= 88; d += 4) pts.push(A.toHoriz(Hm, A.vec(r, d))); polyline(c, cam, pts, 'rgba(125,211,252,.22)', 1); }
            }
            if (L('ecl')) {
                const eps = A.obliquity(date), pts = [];
                for (let l = 0; l <= 360; l += 2) pts.push(A.toHoriz(Hm, A.eclToEq(A.vec(l, 0), eps)));
                polyline(c, cam, pts, 'rgba(251,191,36,.6)', 1.4, [6, 5]);
            }
            /* constelações */
            if (L('lines') && day < 0.85) {
                c.save(); c.strokeStyle = 'rgba(147,197,253,' + (0.42 * (1 - day * 0.8)) + ')'; c.lineWidth = 1; c.beginPath();
                LINES.forEach(segs => segs.forEach(seg => {
                    let prev = null;
                    seg.forEach(v => {
                        const h = A.toHoriz(Hm, v), p = h.u > 0 ? proj(cam, h) : null;
                        if (p && prev) { c.moveTo(prev[0], prev[1]); c.lineTo(p[0], p[1]); }
                        prev = p;
                    });
                }));
                c.stroke(); c.restore();
            }
            /* estrelas */
            const zoom = st.view === 'dome' ? 1 : clamp(Math.sqrt(90 / st.fov), 0.8, 2.6);
            const lim = st.view === 'dome' ? limit : limit + Math.log2(90 / st.fov) * 0.4;
            for (let i = 0; i < NS; i++) {
                const m = SKY.stars[i][2];
                if (m > lim) break;
                const v = [SV[3 * i], SV[3 * i + 1], SV[3 * i + 2]], h = A.toHoriz(Hm, v);
                if (h.u < 0) continue;
                const p = proj(cam, h); if (!p || p[0] < -5 || p[1] < -5 || p[0] > W + 5 || p[1] > Hh + 5) continue;
                const r = Math.max(0.55, (6.4 - m) * 0.42) * zoom * (st.view === 'dome' ? Math.min(1.2, Math.min(W, Hh) / 640 + 0.35) : 1);
                const fade = clamp((lim - m) / 1.2, 0.25, 1);
                c.fillStyle = 'rgba(' + COL[i] + ',' + fade + ')';
                if (r < 1.1) c.fillRect(p[0] - r, p[1] - r, 2 * r, 2 * r); else { c.beginPath(); c.arc(p[0], p[1], r, 0, Math.PI * 2); c.fill(); }
                if (m < 3.5) picks.push({ x: p[0], y: p[1], o: { k: 'st:' + i, i, v, h } });
            }
            /* nomes de constelações e estrelas */
            if (L('cnames') && day < 0.55) CONS.forEach(cn => {
                const h = A.toHoriz(Hm, cn.v); if (h.u < 0.03) return;
                if (st.view === 'dome' && cn.rank > 2 && Math.min(W, Hh) < 520) return;
                const p = proj(cam, h); if (p) label(c, cn.name.toUpperCase(), p[0], p[1], 'rgba(165,180,252,' + (0.75 * (1 - day * 0.7)) + ')', '600 10px "Plus Jakarta Sans", sans-serif', 'center');
            });
            if (L('snames') && day < 0.75) Object.keys(SKY.names).forEach(i => {
                const s = SKY.stars[i]; if (s[2] > lim || s[2] > (st.view === 'dome' ? 1.6 : 1.6 + Math.log2(90 / st.fov))) return;
                const h = A.toHoriz(Hm, [SV[3 * i], SV[3 * i + 1], SV[3 * i + 2]]); if (h.u < 0) return;
                const p = proj(cam, h); if (p) label(c, SKY.names[i], p[0] + 6, p[1] - 6, 'rgba(226,232,240,.85)', '500 11px "Plus Jakarta Sans", sans-serif');
            });
            /* Sol, Lua e planetas */
            if (L('planets')) {
                const pxPerDeg = cam.s * D2R;
                sys.list.slice().reverse().forEach(o => {
                    if (o.h.u < -0.01) return;
                    const p = proj(cam, o.h); if (!p) return;
                    if (o.k === 'sol') {
                        const r = Math.max(7, 0.27 * pxPerDeg);
                        const glow = c.createRadialGradient(p[0], p[1], r * 0.3, p[0], p[1], r * 5); glow.addColorStop(0, 'rgba(255,236,170,.75)'); glow.addColorStop(1, 'rgba(255,236,170,0)');
                        c.fillStyle = glow; c.beginPath(); c.arc(p[0], p[1], r * 5, 0, Math.PI * 2); c.fill();
                        c.fillStyle = '#fff6d5'; c.beginPath(); c.arc(p[0], p[1], r, 0, Math.PI * 2); c.fill();
                    } else if (o.k === 'lua') {
                        drawMoon(c, cam, p, o, sys.sun, Math.max(7, 0.26 * pxPerDeg));
                    } else {
                        if (o.mag > lim + 1) return;
                        const r = clamp((4.5 - o.mag) * 0.75, 2, 6) * zoom;
                        c.fillStyle = o.color; c.beginPath(); c.arc(p[0], p[1], r, 0, Math.PI * 2); c.fill();
                        if (o.k === 'saturno' && zoom > 1.6) { c.strokeStyle = o.color; c.lineWidth = 1; c.beginPath(); c.ellipse(p[0], p[1], r * 2.1, r * 0.8, -0.3, 0, Math.PI * 2); c.stroke(); }
                    }
                    label(c, o.name, p[0] + 9, p[1] + 10, o.k === 'sol' ? '#fde68a' : o.k === 'lua' ? '#e5e7eb' : '#fcd34d', '700 11px "Plus Jakarta Sans", sans-serif');
                    picks.push({ x: p[0], y: p[1], o, big: true });
                });
            }
            /* objeto selecionado */
            if (st.sel) {
                const h = selHoriz(Hm, date, sys);
                const p = h && h.u > 0 ? proj(cam, h) : null;
                if (p) { c.strokeStyle = '#f472b6'; c.lineWidth = 2; c.beginPath(); c.arc(p[0], p[1], 13, 0, Math.PI * 2); c.stroke(); }
            }
            c.restore();
            /* chão, horizonte e pontos cardeais */
            const CARD = [['N', 0], ['NE', 45], ['L', 90], ['SE', 135], ['S', 180], ['SO', 225], ['O', 270], ['NO', 315]];
            if (st.view === 'dome') {
                c.strokeStyle = 'rgba(148,163,184,.55)'; c.lineWidth = 1.5; c.beginPath(); c.arc(cam.cx, cam.cy, cam.R, 0, Math.PI * 2); c.stroke();
                CARD.forEach(([t, az]) => { const p = proj(cam, hAltAz(0, az)); if (!p) return; const dx = p[0] - cam.cx, dy = p[1] - cam.cy, n = Math.hypot(dx, dy) || 1; label(c, t, cam.cx + dx / n * (cam.R + 13), cam.cy + dy / n * (cam.R + 13), t.length === 1 ? '#fbbf24' : '#94a3b8', '700 12px "Plus Jakarta Sans", sans-serif', 'center'); });
            } else {
                const pts = [];
                for (let d = -89; d <= 89; d += 1) { const p = proj(cam, hAltAz(0, st.az0 + d)); if (p) pts.push(p); }
                if (pts.length > 1) {
                    c.save(); const gr = c.createLinearGradient(0, Math.min(...pts.map(p => p[1])), 0, Hh); gr.addColorStop(0, day > 0.5 ? '#2b3a1f' : '#0f1a12'); gr.addColorStop(1, '#05080a');
                    c.fillStyle = gr; c.beginPath(); c.moveTo(pts[0][0], pts[0][1]); pts.forEach(p => c.lineTo(p[0], p[1]));
                    c.lineTo(pts[pts.length - 1][0], Hh + 4000); c.lineTo(pts[0][0], Hh + 4000); c.closePath(); c.fill();
                    c.strokeStyle = 'rgba(148,163,184,.6)'; c.lineWidth = 1.2; c.beginPath(); pts.forEach((p, k) => k ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])); c.stroke(); c.restore();
                }
                CARD.forEach(([t, az]) => { const p = proj(cam, hAltAz(0, az)); if (p && p[0] > 0 && p[0] < W) label(c, t, p[0], p[1] + 14, t.length === 1 ? '#fbbf24' : '#94a3b8', '700 13px "Plus Jakarta Sans", sans-serif', 'center'); });
            }
            /* relógio no canto */
            label(c, fmtLocal(st.t, city.tz) + '  ' + tzLabel(city.tz), 12, Hh - 16, '#cbd5e1', '600 12px "JetBrains Mono", monospace');
            readout(date, Hm, sys);
        }
        function drawMoon(c, cam, p, o, sun, r) {
            /* direção do Sol na tela: um passo do disco da Lua em direção ao Sol, ao longo do grande círculo */
            const v = o.v, s = sun.v, d = [s[0] - v[0], s[1] - v[1], s[2] - v[2]], k = 0.02;
            const w = [v[0] + k * d[0], v[1] + k * d[1], v[2] + k * d[2]], n = Math.hypot(...w);
            const Hm = A.horizMatrix(new Date(st.t), st.city.lat, st.city.lon), q = proj(cam, A.toHoriz(Hm, [w[0] / n, w[1] / n, w[2] / n]));
            const ang = q ? Math.atan2(q[1] - p[1], q[0] - p[0]) : 0;
            const frac = o.phase.frac, cosi = 2 * frac - 1; /* cos do ângulo de fase com sinal: +1 cheia, −1 nova */
            c.save(); c.translate(p[0], p[1]); c.rotate(ang);
            c.fillStyle = 'rgba(70,74,86,.9)'; c.beginPath(); c.arc(0, 0, r, 0, Math.PI * 2); c.fill();
            c.fillStyle = '#eef0f4'; c.beginPath();
            c.arc(0, 0, r, -Math.PI / 2, Math.PI / 2, false);
            const rx = Math.abs(cosi) * r;
            if (frac >= 0.5) c.ellipse(0, 0, rx, r, 0, Math.PI / 2, Math.PI * 3 / 2, false);
            else c.ellipse(0, 0, rx, r, 0, Math.PI / 2, -Math.PI / 2, true);
            c.closePath(); c.fill(); c.restore();
        }
        function selHoriz(Hm, date, sys) {
            const k = st.sel.k;
            if (k.startsWith('st:')) { const i = +k.slice(3); return A.toHoriz(Hm, [SV[3 * i], SV[3 * i + 1], SV[3 * i + 2]]); }
            if (k.startsWith('co:')) { const cn = CONS.find(x => x.id === k.slice(3)); return cn ? A.toHoriz(Hm, cn.v) : null; }
            const o = sys.list.find(x => x.k === k); return o ? o.h : null;
        }
        const PHASES = ['Lua nova', 'Lua crescente', 'Quarto crescente', 'Lua crescente gibosa', 'Lua cheia', 'Lua minguante gibosa', 'Quarto minguante', 'Lua minguante'];
        const phaseName = e => PHASES[Math.floor(((e + 22.5) % 360) / 45)];
        function readout(date, Hm, sys) {
            let html = cell('Tempo sideral local', fmtRA(Hm.lst)) + cell('Altura do Sol', nf(sys.sun.h.alt, 3) + '°') +
                cell('Lua', phaseName(sys.moon.phase.elong) + ' · ' + Math.round(sys.moon.phase.frac * 100) + '% iluminada', true);
            if (st.sel) {
                const k = st.sel.k; let name = '', info = [], ra, dec, h;
                if (k.startsWith('st:')) { const i = +k.slice(3), s = SKY.stars[i]; name = SKY.names[i] || 'Estrela'; const v = [SV[3 * i], SV[3 * i + 1], SV[3 * i + 2]], sp = A.sph(v); ra = sp[0]; dec = sp[1]; h = A.toHoriz(Hm, v); info.push('magnitude ' + nf(s[2], 3), 'B−V ' + nf(s[3], 2)); }
                else if (k.startsWith('co:')) { const cn = CONS.find(x => x.id === k.slice(3)); name = 'Constelação: ' + cn.name; const sp = A.sph(cn.v); ra = sp[0]; dec = sp[1]; h = A.toHoriz(Hm, cn.v); }
                else { const o = sys.list.find(x => x.k === k); name = o.name; ra = o.ra; dec = o.dec; h = o.h; info.push(o.type); if (o.k !== 'sol' && o.k !== 'lua') info.push('magnitude ' + nf(o.mag, 2)); if (o.dist) info.push('distância ' + nf(o.dist, 4) + ' UA'); if (o.distKm) info.push('distância ' + Math.round(o.distKm).toLocaleString('pt-BR') + ' km'); }
                html += cell('Selecionado', '<span style="color:#f9a8d4">' + name + '</span>' + (info.length ? '<br><small style="font-family:var(--sans);color:var(--muted)">' + info.join(' · ') + '</small>' : ''), true) +
                    cell('Ascensão reta', fmtRA(ra)) + cell('Declinação', fmtDeg(dec)) +
                    cell('Altura', fmtDeg(h.alt) + (h.alt < 0 ? ' <small style="color:var(--red)">abaixo do horizonte</small>' : '')) + cell('Azimute', nf(h.az, 4) + '°');
            } else html += cell('Dica', 'clique num astro para ver as coordenadas', true);
            $('#pl-out', root).innerHTML = html;
        }

        /* ----- tempo ----- */
        function setT(t) {
            st.t = clamp(t, MIN_T, MAX_T);
            if (st.t !== t && st.playing) togglePlay(false);
            S('date').value = toInput(st.t, st.city.tz);
        }
        function loop(ts) {
            if (!st.playing) return;
            if (!visible(cv)) { st.lastFrame = 0; st.raf = 0; return; }
            if (st.lastFrame) setT(st.t + (ts - st.lastFrame) * st.speed);
            st.lastFrame = ts; draw(); st.raf = requestAnimationFrame(loop);
        }
        function togglePlay(on) {
            st.playing = on === undefined ? !st.playing : on;
            if (st.playing && st.speed === 0) { S('speed').value = '4'; st.speed = SPEEDS[4][0]; }
            S('play').innerHTML = '<i class="fa-solid fa-' + (st.playing ? 'pause' : 'play') + '"></i>';
            st.lastFrame = 0; if (st.playing && !st.raf) st.raf = requestAnimationFrame(loop);
            if (!st.playing) st.raf = 0;
        }
        function wake() { if (st.playing && !st.raf) { st.lastFrame = 0; st.raf = requestAnimationFrame(loop); } }

        /* ----- lugar ----- */
        function setCity() {
            const v = S('city').value;
            if (v === 'x') {
                S('custom').hidden = false;
                if (!S('lat').value) { S('lat').value = st.city.lat; S('lon').value = st.city.lon; S('tz').value = st.city.tz; }
                const lat = parseFloat(String(S('lat').value).replace(',', '.')), lon = parseFloat(String(S('lon').value).replace(',', '.')), tz = parseFloat(String(S('tz').value).replace(',', '.'));
                const ok = Math.abs(lat) <= 90 && Math.abs(lon) <= 180 && Math.abs(tz) <= 14;
                ['lat', 'lon', 'tz'].forEach(k => S(k).classList.toggle('bad', !ok));
                if (ok) st.city = { n: 'Outro lugar', lat: clamp(lat, -89.99, 89.99), lon, tz };
            } else { S('custom').hidden = true; st.city = CITIES[+v]; }
            S('where').textContent = 'Latitude ' + nf(Math.abs(st.city.lat), 4) + '° ' + (st.city.lat < 0 ? 'S' : 'N') + ', longitude ' + nf(Math.abs(st.city.lon), 4) + '° ' + (st.city.lon < 0 ? 'O' : 'L') + ' · hora ' + tzLabel(st.city.tz) + ', sem horário de verão.';
            st.domeRot = st.city.lat < 0 ? 180 : 0; /* olhando para cima: sul embaixo no hemisfério sul */
            S('date').value = toInput(st.t, st.city.tz);
            draw();
        }

        /* ----- encontrar e clicar ----- */
        function gotoObj(k) {
            if (!k) return;
            st.sel = { k };
            const date = new Date(st.t), Hm = A.horizMatrix(date, st.city.lat, st.city.lon);
            const h = selHoriz(Hm, date, solarSystem(date, Hm));
            if (h && st.view === 'horiz') { st.az0 = h.az; st.alt0 = clamp(h.alt, 0, 60); }
            draw();
        }
        function pick(mx, my) {
            let best = null, bd = 16;
            picks.forEach(p => { const d = Math.hypot(p.x - mx, p.y - my) - (p.big ? 4 : 0); if (d < bd) { bd = d; best = p; } });
            st.sel = best ? { k: best.o.k } : null;
            S('goto').value = best && S('goto').querySelector('option[value="' + best.o.k + '"]') ? best.o.k : '';
            draw();
        }

        /* ----- interação ----- */
        let drag = null; const pointers = new Map(); let pinch0 = null;
        cv.addEventListener('pointerdown', e => {
            cv.setPointerCapture(e.pointerId); pointers.set(e.pointerId, [e.clientX, e.clientY]);
            if (pointers.size === 2) { const [a, b] = [...pointers.values()]; pinch0 = [Math.hypot(a[0] - b[0], a[1] - b[1]), st.fov]; drag = null; return; }
            const r = cv.getBoundingClientRect();
            drag = { x: e.clientX, y: e.clientY, az0: st.az0, alt0: st.alt0, rot: st.domeRot, moved: false, ang: Math.atan2(e.clientY - r.top - r.height / 2, e.clientX - r.left - r.width / 2) };
            cv.style.cursor = 'grabbing';
        });
        cv.addEventListener('pointermove', e => {
            if (!pointers.has(e.pointerId)) return;
            pointers.set(e.pointerId, [e.clientX, e.clientY]);
            if (pinch0 && pointers.size === 2) { const [a, b] = [...pointers.values()]; st.fov = clamp(pinch0[1] * pinch0[0] / Math.max(10, Math.hypot(a[0] - b[0], a[1] - b[1])), 15, 140); draw(); return; }
            if (!drag) return;
            const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
            if (Math.hypot(dx, dy) > 4) drag.moved = true;
            if (!drag.moved) return;
            const r = cv.getBoundingClientRect();
            if (st.view === 'dome') {
                const ang = Math.atan2(e.clientY - r.top - r.height / 2, e.clientX - r.left - r.width / 2);
                st.domeRot = drag.rot - (ang - drag.ang) * R2D;
            } else {
                const k = st.fov / r.width;
                st.az0 = A.norm360(drag.az0 - dx * k); st.alt0 = clamp(drag.alt0 + dy * k, -5, 60);
            }
            draw();
        });
        const up = e => {
            pointers.delete(e.pointerId); if (pointers.size < 2) pinch0 = null;
            if (drag && !drag.moved) { const r = cv.getBoundingClientRect(); pick(e.clientX - r.left, e.clientY - r.top); }
            drag = null; cv.style.cursor = 'grab';
        };
        cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
        cv.addEventListener('wheel', e => { if (st.view !== 'horiz') return; e.preventDefault(); st.fov = clamp(st.fov * Math.exp(e.deltaY * 0.0012), 15, 140); draw(); }, { passive: false });
        const zoomBy = f => { if (st.view !== 'horiz') { S('view').value = 'horiz'; st.view = 'horiz'; } st.fov = clamp(st.fov * f, 15, 140); draw(); };
        S('zin').addEventListener('click', () => zoomBy(0.7)); S('zout').addEventListener('click', () => zoomBy(1 / 0.7));

        S('city').addEventListener('change', setCity);
        ['lat', 'lon', 'tz'].forEach(k => S(k).addEventListener('change', setCity));
        S('date').addEventListener('change', () => { const t = fromInput(S('date').value, st.city.tz); if (Number.isFinite(t)) { setT(t); draw(); } });
        S('now').addEventListener('click', () => { setT(Date.now()); draw(); });
        S('speed').addEventListener('change', () => { st.speed = SPEEDS[+S('speed').value][0]; if (st.speed && !st.playing) togglePlay(true); if (!st.speed) togglePlay(false); });
        S('play').addEventListener('click', () => togglePlay());
        S('view').addEventListener('change', () => { st.view = S('view').value; if (st.view === 'horiz') { st.az0 = st.city.lat < 0 ? 180 : 0; st.alt0 = 25; st.fov = 100; } draw(); });
        S('goto').addEventListener('change', () => gotoObj(S('goto').value));
        ['lines', 'cnames', 'snames', 'planets', 'ecl', 'altaz', 'eq', 'atm'].forEach(k => S(k).addEventListener('change', draw));
        if (window.ResizeObserver) new ResizeObserver(() => draw()).observe(cv);

        S('city').value = '0'; setT(Date.now()); setCity();
        return () => { draw(); wake(); };
    }

    /* =========================================================
       SISTEMA SOLAR (vista de cima) E MOVIMENTO RETRÓGRADO
       ========================================================= */
    const EPS0 = 23.4392911;
    function geoEclJ2000(id, date) {
        const E = A.helio('terra', date), p = id === 'sol' ? [0, 0, 0] : A.helio(id, date), v = [p[0] - E[0], p[1] - E[1], p[2] - E[2]], r = Math.hypot(...v);
        return { lon: A.norm360(Math.atan2(v[1], v[0]) * R2D), lat: Math.asin(v[2] / r) * R2D, dist: r };
    }
    /* estrelas perto da eclíptica, em coordenadas eclípticas J2000 (para o painel "visto da Terra") */
    let ECL_STARS = null;
    function eclStars() {
        if (ECL_STARS) return ECL_STARS;
        ECL_STARS = [];
        SKY.stars.forEach((s, i) => { if (s[2] > 5.2) return; const q = A.eqToEcl(A.vec(s[0], s[1]), EPS0), sp = A.sph(q); if (Math.abs(sp[1]) < 14) ECL_STARS.push([sp[0], sp[1], s[2], i]); });
        return ECL_STARS;
    }

    function initSistema(root) {
        const SPEEDS = [[0, 'parado'], [1, '1 dia por segundo'], [5, '5 dias por segundo'], [20, '20 dias por segundo'], [60, '2 meses por segundo'], [365.25, '1 ano por segundo']];
        const RETRO = [['marte', 'Marte'], ['jupiter', 'Júpiter'], ['saturno', 'Saturno'], ['venus', 'Vênus'], ['mercurio', 'Mercúrio']];
        root.innerHTML =
            '<div class="lab-grid">' +
              '<div class="lab-stage tall"><canvas id="ss-cv" aria-label="Sistema Solar visto de cima"></canvas></div>' +
              '<div class="lab-side">' +
                '<div class="ctl"><label for="ss-date">Data</label><div style="display:flex;gap:6px"><input class="plain-in" id="ss-date" type="date" min="1800-01-01" max="2050-12-31"><button class="btn small" id="ss-now" type="button">Hoje</button></div></div>' +
                '<div class="ctl"><label for="ss-speed">Passagem do tempo</label><div style="display:flex;gap:6px"><select id="ss-speed" style="flex:1">' + SPEEDS.map((s, i) => '<option value="' + i + '"' + (i === 2 ? ' selected' : '') + '>' + s[1] + '</option>').join('') + '</select><button class="btn small primary" id="ss-play" type="button" aria-label="Iniciar ou pausar"><i class="fa-solid fa-play"></i></button></div></div>' +
                '<div class="ctl"><label for="ss-scale">Escala</label><select id="ss-scale"><option value="in">Planetas rochosos (até 1,8 UA)</option><option value="log">Todos os planetas (escala comprimida)</option><option value="lin">Todos os planetas (escala real)</option></select></div>' +
                '<div class="ctl"><label for="ss-retro">Movimento visto da Terra</label><select id="ss-retro"><option value="">desligado</option>' + RETRO.map(r => '<option value="' + r[0] + '"' + (r[0] === 'marte' ? ' selected' : '') + '>' + r[1] + '</option>').join('') + '</select></div>' +
                '<div class="readout" id="ss-out"></div>' +
              '</div>' +
            '</div>' +
            '<div class="lab-under">' +
              '<div class="lab-note"><strong>Leitura.</strong> Em cima, o Sistema Solar visto do norte da eclíptica, com os planetas nas posições da data. A linha tracejada vai da Terra ao planeta escolhido e continua até o fundo de estrelas. Embaixo, o caminho desse planeta no céu, visto da Terra, ao longo de meses: o leste fica à esquerda, como quando olhamos para o céu. O trecho <b style="color:#f472b6">rosa</b> é o movimento retrógrado.</div>' +
              '<div class="lab-note"><strong>Experimente.</strong> Escolha Marte e deixe o tempo correr: o laço acontece sempre que a Terra ultrapassa Marte, perto da oposição. Compare com Júpiter e Saturno (laços menores e mais frequentes) e com Vênus, que faz o retrógrado quando passa entre a Terra e o Sol. Na escala real, perceba como os planetas rochosos se espremem perto do Sol.</div>' +
            '</div>';

        const S = k => $('#ss-' + k, root), cv = S('cv');
        const st = { t: Date.now(), playing: false, speed: 5, last: 0, raf: 0 };
        const DAY = 86400000;

        function rScale(mode, Rmax) {
            if (mode === 'in') return r => r / 1.75 * Rmax;
            if (mode === 'lin') return r => r / 31 * Rmax;
            return r => Math.log(1 + r / 0.35) / Math.log(1 + 31 / 0.35) * Rmax;
        }
        const state = (id, t) => { const a = geoEclJ2000(id, new Date(t - DAY)), b = geoEclJ2000(id, new Date(t + DAY)); let d = b.lon - a.lon; if (d > 180) d -= 360; if (d < -180) d += 360; return d / 2; };
        function nextEvent(id, t) {
            /* próxima oposição (planeta exterior) ou conjunção inferior (interior): elongação em longitude 180° ou 0° */
            const inner = id === 'venus' || id === 'mercurio', target = inner ? 0 : 180;
            const el = tt => { let d = geoEclJ2000(id, new Date(tt)).lon - geoEclJ2000('sol', new Date(tt)).lon - target; d = ((d % 360) + 540) % 360 - 180; return d; };
            let prev = el(t);
            for (let k = 1; k <= 900; k++) {
                const tt = t + k * DAY, cur = el(tt);
                if (prev > 0 && cur <= 0 && Math.abs(cur - prev) < 90) {
                    let lo = tt - DAY, hi = tt;
                    for (let j = 0; j < 30; j++) { const mid = (lo + hi) / 2; if (el(mid) > 0) lo = mid; else hi = mid; }
                    return { t: hi, name: inner ? 'conjunção inferior' : 'oposição' };
                }
                prev = cur;
            }
            return null;
        }

        function draw() {
            const g = canvas2d(cv, '#05070f'); if (!g) return;
            const { c, W, H } = g, date = new Date(st.t), mode = S('scale').value, rid = S('retro').value;
            const strip = rid ? Math.round(Math.min(H * 0.34, 190)) : 0;
            const cx = W / 2, cy = (H - strip) / 2, Rmax = Math.min(W / 2, (H - strip) / 2) - 18, sc = rScale(mode, Rmax);
            const P2 = v => { const r = Math.hypot(v[0], v[1]), k = r ? sc(r) / r : 0; return [cx + v[0] * k, cy - v[1] * k]; };
            /* estrelas de fundo */
            c.fillStyle = 'rgba(203,213,225,.35)';
            for (let i = 0; i < 160; i++) { const x = (i * 9301 + 49297) % 233280 / 233280 * W, y = (i * 4096 + 150889) % 714025 / 714025 * (H - strip); c.fillRect(x, y, 1, 1); }
            /* direção do ponto vernal */
            label(c, 'direção do ponto vernal (γ) →', W - 12, cy - 10, 'rgba(148,163,184,.6)', '500 11px "Plus Jakarta Sans", sans-serif', 'right');
            /* órbitas */
            A.PLANETS.forEach(p => {
                if (mode === 'in' && ['jupiter', 'saturno', 'urano', 'netuno'].includes(p.id)) return;
                const pts = A.orbit(p.id, date, 180);
                c.strokeStyle = p.id === 'terra' ? 'rgba(79,156,247,.55)' : 'rgba(148,163,184,.28)'; c.lineWidth = 1; c.beginPath();
                pts.forEach((v, k) => { const q = P2(v); if (k) c.lineTo(q[0], q[1]); else c.moveTo(q[0], q[1]); }); c.stroke();
            });
            if (mode === 'in') { c.fillStyle = 'rgba(148,163,184,.5)'; label(c, 'Júpiter, Saturno, Urano e Netuno ficam fora desta escala', 12, 18, 'rgba(148,163,184,.75)', '500 11px "Plus Jakarta Sans", sans-serif'); }
            /* Sol */
            const sg = c.createRadialGradient(cx, cy, 2, cx, cy, 22); sg.addColorStop(0, 'rgba(255,240,180,1)'); sg.addColorStop(1, 'rgba(255,200,80,0)');
            c.fillStyle = sg; c.beginPath(); c.arc(cx, cy, 22, 0, Math.PI * 2); c.fill(); c.fillStyle = '#fff3c4'; c.beginPath(); c.arc(cx, cy, 6, 0, Math.PI * 2); c.fill();
            /* linha Terra → planeta */
            const E = A.helio('terra', date), pe = P2(E);
            if (rid) {
                const Pp = A.helio(rid, date), pp = P2(Pp), dx = pp[0] - pe[0], dy = pp[1] - pe[1], n = Math.hypot(dx, dy) || 1, far = Math.max(W, H) * 2;
                c.save(); c.strokeStyle = 'rgba(244,114,182,.7)'; c.setLineDash([6, 5]); c.lineWidth = 1.4; c.beginPath(); c.moveTo(pe[0], pe[1]); c.lineTo(pe[0] + dx / n * far, pe[1] + dy / n * far); c.stroke(); c.restore();
            }
            /* planetas */
            A.PLANETS.forEach(p => {
                if (mode === 'in' && ['jupiter', 'saturno', 'urano', 'netuno'].includes(p.id)) return;
                const v = A.helio(p.id, date), q = P2(v), r = p.id === 'jupiter' || p.id === 'saturno' ? 7 : p.id === 'urano' || p.id === 'netuno' ? 5.5 : p.id === 'terra' || p.id === 'venus' ? 5 : 4;
                c.fillStyle = p.color; c.beginPath(); c.arc(q[0], q[1], r, 0, Math.PI * 2); c.fill();
                if (p.id === 'saturno') { c.strokeStyle = p.color; c.lineWidth = 1.2; c.beginPath(); c.ellipse(q[0], q[1], r * 1.9, r * 0.7, -0.4, 0, Math.PI * 2); c.stroke(); }
                if (p.id === rid) { c.strokeStyle = '#f472b6'; c.lineWidth = 2; c.beginPath(); c.arc(q[0], q[1], r + 5, 0, Math.PI * 2); c.stroke(); }
                label(c, p.name, q[0] + r + 4, q[1] - r - 3, p.id === 'terra' ? '#93c5fd' : '#e2e8f0', '600 11px "Plus Jakarta Sans", sans-serif');
            });
            label(c, fmtLocal(st.t, -3).slice(0, 10), 12, H - strip - 14, '#cbd5e1', '600 12px "JetBrains Mono", monospace');
            if (rid) drawStrip(c, W, H, strip, rid);
            readout(rid);
        }
        function drawStrip(c, W, H, h, id) {
            const y0 = H - h, pad = 12;
            c.fillStyle = '#0b1020'; c.fillRect(0, y0, W, h);
            c.strokeStyle = 'rgba(148,163,184,.35)'; c.beginPath(); c.moveTo(0, y0 + 0.5); c.lineTo(W, y0 + 0.5); c.stroke();
            const span = { marte: 300, jupiter: 260, saturno: 260, venus: 160, mercurio: 70 }[id];
            const pts = [];
            for (let k = -span; k <= span; k += 2) { const t = st.t + k * DAY, g = geoEclJ2000(id, new Date(t)); pts.push({ k, lon: g.lon, lat: g.lat, rate: 0 }); }
            /* desenrola a longitude e mede o sentido */
            for (let i = 1; i < pts.length; i++) { let d = pts[i].lon - pts[i - 1].lon; if (d > 180) d -= 360; if (d < -180) d += 360; pts[i].lon = pts[i - 1].lon + d; pts[i].rate = d; }
            pts[0].rate = pts[1].rate;
            const lons = pts.map(p => p.lon), lmin = Math.min(...lons) - 6, lmax = Math.max(...lons) + 6;
            const lats = pts.map(p => p.lat), bmax = Math.max(3, ...lats.map(Math.abs)) * 1.25;
            const X = l => W - pad - (l - lmin) / (lmax - lmin) * (W - 2 * pad); /* leste à esquerda */
            const Y = b => y0 + h / 2 - b / bmax * (h / 2 - 22);
            /* estrelas da região */
            eclStars().forEach(s => {
                for (const off of [-360, 0, 360]) {
                    const l = s[0] + off; if (l < lmin || l > lmax || Math.abs(s[1]) > bmax) continue;
                    const r = Math.max(0.6, (5.6 - s[2]) * 0.5); c.fillStyle = 'rgba(226,232,240,.75)'; c.beginPath(); c.arc(X(l), Y(s[1]), r, 0, Math.PI * 2); c.fill();
                    if (SKY.names[s[3]] && s[2] < 1.6) label(c, SKY.names[s[3]], X(l) + 5, Y(s[1]) - 6, 'rgba(203,213,225,.7)', '500 10px "Plus Jakarta Sans", sans-serif');
                }
            });
            c.strokeStyle = 'rgba(251,191,36,.25)'; c.setLineDash([4, 5]); c.beginPath(); c.moveTo(0, Y(0)); c.lineTo(W, Y(0)); c.stroke(); c.setLineDash([]);
            c.lineWidth = 2.2;
            for (let i = 1; i < pts.length; i++) {
                c.strokeStyle = pts[i].rate < 0 ? '#f472b6' : 'rgba(251,191,36,.8)';
                c.beginPath(); c.moveTo(X(pts[i - 1].lon), Y(pts[i - 1].lat)); c.lineTo(X(pts[i].lon), Y(pts[i].lat)); c.stroke();
            }
            const cur = pts[Math.floor(pts.length / 2)], color = A.PLANETS.find(p => p.id === id).color;
            c.fillStyle = color; c.beginPath(); c.arc(X(cur.lon), Y(cur.lat), 6, 0, Math.PI * 2); c.fill();
            c.strokeStyle = '#fff'; c.lineWidth = 1.5; c.stroke();
            label(c, 'Visto da Terra · ' + Math.round(span / 30) * 2 + ' meses em volta da data · latitude ampliada', pad, y0 + 13, '#94a3b8', '600 11px "Plus Jakarta Sans", sans-serif');
            label(c, '← leste', pad, y0 + h - 10, '#64748b', '500 10px "Plus Jakarta Sans", sans-serif');
            label(c, 'oeste →', W - pad, y0 + h - 10, '#64748b', '500 10px "Plus Jakarta Sans", sans-serif', 'right');
        }
        let evCache = { id: null, t: 0, ev: null };
        function readout(id) {
            const date = new Date(st.t);
            let html = cell('Data', fmtLocal(st.t, -3).slice(0, 10)) + cell('Terra–Sol', nf(Math.hypot(...A.helio('terra', date)), 5) + ' UA');
            if (id) {
                const g = geoEclJ2000(id, date), rate = state(id, st.t), sun = geoEclJ2000('sol', date);
                let el = g.lon - sun.lon; el = ((el % 360) + 540) % 360 - 180;
                const name = A.PLANETS.find(p => p.id === id).name;
                const mov = Math.abs(rate) < 0.03 ? 'estacionário' : rate < 0 ? '<span style="color:#f472b6">retrógrado</span>' : 'direto';
                if (evCache.id !== id || Math.abs(evCache.t - st.t) > 5 * DAY || (evCache.ev && evCache.ev.t < st.t)) evCache = { id, t: st.t, ev: nextEvent(id, st.t) };
                const ev = evCache.ev;
                html += cell(name + ' visto da Terra', mov + ' · ' + nf(rate, 3) + '°/dia', true) +
                    cell('Distância Terra–' + name, nf(g.dist, 4) + ' UA') + cell('Luz leva', nf(g.dist * 8.3167, 3) + ' min') +
                    cell('Elongação (ângulo ao Sol)', nf(Math.abs(el), 3) + '° ' + (el > 0 ? 'a leste' : 'a oeste')) +
                    cell('Próxima ' + (ev ? ev.name : 'oposição'), ev ? fmtLocal(ev.t, -3).slice(0, 10) : '—');
            }
            $('#ss-out', root).innerHTML = html;
        }
        function setT(t) { st.t = clamp(t, MIN_T, MAX_T); if (st.t !== t) play(false); const d = new Date(st.t - 3 * 3600000); S('date').value = d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate()); }
        function loop(ts) {
            if (!st.playing) { st.raf = 0; return; }
            if (!visible(cv)) { st.raf = 0; st.last = 0; return; }
            if (st.last) setT(st.t + (ts - st.last) / 1000 * st.speed * DAY);
            st.last = ts; draw(); st.raf = requestAnimationFrame(loop);
        }
        function play(on) {
            st.playing = on === undefined ? !st.playing : on;
            if (st.playing && !st.speed) { S('speed').value = '2'; st.speed = 5; }
            S('play').innerHTML = '<i class="fa-solid fa-' + (st.playing ? 'pause' : 'play') + '"></i>';
            st.last = 0; if (st.playing && !st.raf) st.raf = requestAnimationFrame(loop);
        }
        S('date').addEventListener('change', () => { const m = /^(\d{4})-(\d\d)-(\d\d)$/.exec(S('date').value); if (m) { setT(Date.UTC(+m[1], +m[2] - 1, +m[3], 15)); draw(); } });
        S('now').addEventListener('click', () => { setT(Date.now()); draw(); });
        S('speed').addEventListener('change', () => { st.speed = SPEEDS[+S('speed').value][0]; play(!!st.speed); });
        S('play').addEventListener('click', () => play());
        S('scale').addEventListener('change', draw); S('retro').addEventListener('change', draw);
        if (window.ResizeObserver) new ResizeObserver(() => draw()).observe(cv);
        setT(Date.now());
        return () => { draw(); if (st.playing && !st.raf) { st.last = 0; st.raf = requestAnimationFrame(loop); } };
    }

    /* =========================================================
       ÓRBITAS: LEIS DE KEPLER, CANHÃO DE NEWTON E EXOPLANETAS
       ========================================================= */
    function initKepler(root) {
        const GM_SUN = 1.32712440018e20, AU = 1.495978707e11, GM_E = 3.986004418e14, RE = 6.371e6;
        const PRE = { terra: [1, 0.0167, 'Terra'], marte: [1.524, 0.0934, 'Marte'], mercurio: [0.387, 0.2056, 'Mercúrio'], halley: [17.83, 0.967, 'Cometa Halley'], livre: [2, 0.5, 'Livre'] };
        const STARS = { sol: [1, 1, 'Sol'], anã: [0.2, 0.22, 'Anã vermelha (0,2 M☉)'], f: [1.4, 1.6, 'Estrela tipo F (1,4 M☉)'] };
        root.innerHTML =
            '<div class="lab-grid">' +
              '<div class="lab-stage"><canvas id="kp-cv" aria-label="Simulação de órbitas"></canvas></div>' +
              '<div class="lab-side">' +
                '<div class="ctl"><label for="kp-mode">Modo</label><select id="kp-mode"><option value="leis">Leis de Kepler</option><option value="canhao">Canhão de Newton</option><option value="exo">Exoplaneta: trânsito e velocidade radial</option></select></div>' +
                '<div id="kp-leis">' +
                  '<div class="ctl"><label for="kp-pre">Órbita</label><select id="kp-pre">' + Object.keys(PRE).map(k => '<option value="' + k + '"' + (k === 'livre' ? ' selected' : '') + '>' + PRE[k][2] + '</option>').join('') + '</select></div>' +
                  '<div class="ctl"><label for="kp-a">Semieixo maior ' + T('a') + ': <b id="kp-a-v"></b></label><input id="kp-a" type="range" min="-1" max="1.6" step="0.005"></div>' +
                  '<div class="ctl"><label for="kp-e">Excentricidade ' + T('e') + ': <b id="kp-e-v"></b></label><input id="kp-e" type="range" min="0" max="0.97" step="0.005"></div>' +
                  '<div class="ctl seg" style="flex-wrap:wrap;gap:6px 12px;font-size:.84rem"><label><input type="checkbox" id="kp-areas" checked> áreas iguais</label><label><input type="checkbox" id="kp-vel" checked> vetor velocidade</label><label><input type="checkbox" id="kp-axes"> eixos e focos</label></div>' +
                '</div>' +
                '<div id="kp-canhao" hidden>' +
                  '<div class="ctl"><label for="kp-v">Velocidade de lançamento: <b id="kp-v-v"></b></label><input id="kp-v" type="range" min="0" max="12" step="0.05" value="6"></div>' +
                  '<div class="ctl"><label for="kp-h">Altura do canhão: <b id="kp-h-v"></b></label><input id="kp-h" type="range" min="100" max="2000" step="50" value="500"></div>' +
                  '<div style="display:flex;gap:6px;flex-wrap:wrap"><button class="btn small primary" id="kp-fire" type="button"><i class="fa-solid fa-burst"></i> Disparar</button><button class="btn small" id="kp-clear" type="button">Limpar</button></div>' +
                '</div>' +
                '<div id="kp-exo" hidden>' +
                  '<div class="ctl"><label for="kp-star">Estrela</label><select id="kp-star">' + Object.keys(STARS).map(k => '<option value="' + k + '">' + STARS[k][2] + '</option>').join('') + '</select></div>' +
                  '<div class="ctl"><label for="kp-rp">Raio do planeta: <b id="kp-rp-v"></b></label><input id="kp-rp" type="range" min="0.5" max="22" step="0.1" value="11.2"></div>' +
                  '<div class="ctl"><label for="kp-mp">Massa do planeta: <b id="kp-mp-v"></b></label><input id="kp-mp" type="range" min="0" max="3.6" step="0.01" value="2.5"></div>' +
                  '<div class="ctl"><label for="kp-per">Período orbital: <b id="kp-per-v"></b></label><input id="kp-per" type="range" min="0" max="2.6" step="0.01" value="0.62"></div>' +
                '</div>' +
                '<div style="display:flex;gap:6px"><button class="btn small" id="kp-play" type="button"><i class="fa-solid fa-pause"></i> Pausar</button></div>' +
                '<div class="readout" id="kp-out"></div>' +
              '</div>' +
            '</div>' +
            '<div class="lab-under">' +
              '<div class="lab-note" id="kp-note1"></div>' +
              '<div class="lab-note" id="kp-note2"></div>' +
            '</div>';
        const S = k => $('#kp-' + k, root), cv = S('cv');
        const st = { mode: 'leis', playing: true, raf: 0, last: 0, M: 0, shots: [], shot: null, ph: -0.12 };

        /* ---------- leis de Kepler ---------- */
        const aVal = () => Math.pow(10, +S('a').value), eVal = () => +S('e').value;
        function setPreset() {
            const p = PRE[S('pre').value];
            S('a').value = Math.log10(p[0]).toFixed(3); S('e').value = p[1]; st.M = 0; draw();
        }
        function posAt(a, e, M) {
            const E = A.keplerE(M * R2D, e) * D2R;
            return { x: a * (Math.cos(E) - e), y: a * Math.sqrt(1 - e * e) * Math.sin(E), E };
        }
        function drawLeis(c, W, H) {
            const a = aVal(), e = eVal(), b = a * Math.sqrt(1 - e * e);
            const s = Math.min((W - 60) / (2 * a), (H - 60) / (2 * b)), ox = W / 2 + a * e * s, oy = H / 2; /* Sol no foco (ox, oy) */
            const X = x => ox + x * s, Y = y => oy - y * s;
            if (S('areas').checked) {
                const N = 12;
                for (let k = 0; k < N; k++) {
                    const M0 = 2 * Math.PI * k / N, M1 = 2 * Math.PI * (k + 1) / N;
                    c.beginPath(); c.moveTo(ox, oy);
                    for (let j = 0; j <= 24; j++) { const p = posAt(a, e, M0 + (M1 - M0) * j / 24); c.lineTo(X(p.x), Y(p.y)); }
                    c.closePath(); c.fillStyle = k % 2 ? 'rgba(129,140,248,.22)' : 'rgba(56,189,248,.16)'; c.fill();
                }
            }
            c.strokeStyle = 'rgba(203,213,225,.7)'; c.lineWidth = 1.5; c.beginPath(); c.ellipse(X(-a * e), Y(0), a * s, b * s, 0, 0, Math.PI * 2); c.stroke();
            if (S('axes').checked) {
                c.save(); c.strokeStyle = 'rgba(148,163,184,.5)'; c.setLineDash([5, 5]); c.beginPath(); c.moveTo(X(-a - a * e), Y(0)); c.lineTo(X(a - a * e), Y(0)); c.moveTo(X(-a * e), Y(-b)); c.lineTo(X(-a * e), Y(b)); c.stroke(); c.restore();
                c.fillStyle = '#94a3b8'; c.beginPath(); c.arc(X(-2 * a * e), Y(0), 3, 0, Math.PI * 2); c.fill(); label(c, 'foco vazio', X(-2 * a * e), Y(0) + 14, '#94a3b8', '500 11px "Plus Jakarta Sans", sans-serif', 'center');
                label(c, 'a', X(-a * e / 2 - a / 2), Y(0) - 9, '#cbd5e1', 'italic 600 13px serif', 'center'); label(c, 'b', X(-a * e) + 8, Y(b / 2), '#cbd5e1', 'italic 600 13px serif');
            }
            label(c, 'periélio', X(a * (1 - e)) + 6, Y(0) - 10, '#fbbf24', '600 11px "Plus Jakarta Sans", sans-serif');
            label(c, 'afélio', X(-a * (1 + e)) - 6, Y(0) - 10, '#fbbf24', '600 11px "Plus Jakarta Sans", sans-serif', 'right');
            const sg = c.createRadialGradient(ox, oy, 1, ox, oy, 16); sg.addColorStop(0, '#fff4c2'); sg.addColorStop(1, 'rgba(255,200,80,0)');
            c.fillStyle = sg; c.beginPath(); c.arc(ox, oy, 16, 0, Math.PI * 2); c.fill();
            const p = posAt(a, e, st.M), px = X(p.x), py = Y(p.y);
            c.strokeStyle = 'rgba(251,191,36,.6)'; c.lineWidth = 1; c.beginPath(); c.moveTo(ox, oy); c.lineTo(px, py); c.stroke();
            if (S('vel').checked) {
                /* velocidade: dE/dt · (dx/dE, dy/dE), com dM = (1 − e cos E) dE */
                const k = 1 / (1 - e * Math.cos(p.E)), vx = -a * Math.sin(p.E) * k, vy = b * Math.cos(p.E) * k, vn = Math.hypot(vx, vy), r = Math.hypot(p.x, p.y);
                const L = 18 + 72 * Math.sqrt(2 / r - 1 / a) / Math.sqrt(2 / (a * (1 - e)) - 1 / a);
                arrowPx(c, px, py, px + vx / vn * L, py - vy / vn * L, '#34d399', 2.4);
            }
            c.fillStyle = '#60a5fa'; c.beginPath(); c.arc(px, py, 7, 0, Math.PI * 2); c.fill();
        }
        function leisReadout() {
            const a = aVal(), e = eVal(), P = Math.pow(a, 1.5), p = posAt(a, e, st.M), r = Math.hypot(p.x, p.y);
            const v = rr => Math.sqrt(GM_SUN * (2 / (rr * AU) - 1 / (a * AU))) / 1000;
            S('a-v').textContent = nf(a, 4) + ' UA'; S('e-v').textContent = nf(e, 3);
            return cell('Período ' + T('P = a^{3/2}'), P < 2 ? nf(P * 365.25, 4) + ' dias' : nf(P, 4) + ' anos') + cell('Fatia (1/12 do período)', P * 365.25 / 12 < 60 ? nf(P * 365.25 / 12, 3) + ' dias' : nf(P / 12, 3) + ' anos') +
                cell('Periélio ' + T('a(1-e)'), nf(a * (1 - e), 4) + ' UA') + cell('Afélio ' + T('a(1+e)'), nf(a * (1 + e), 4) + ' UA') +
                cell('Velocidade no periélio', nf(v(a * (1 - e)), 4) + ' km/s') + cell('Velocidade no afélio', nf(v(a * (1 + e)), 4) + ' km/s') +
                cell('Agora: distância', nf(r, 4) + ' UA') + cell('Agora: velocidade', nf(v(r), 4) + ' km/s');
        }

        /* ---------- canhão de Newton ---------- */
        function fire() {
            const h = +S('h').value * 1000, v = +S('v').value * 1000;
            st.shot = { x: 0, y: RE + h, vx: v, vy: 0, path: [[0, RE + h]], t: 0, done: null, v0: v, h };
        }
        function stepShot(dtReal) {
            const sh = st.shot; if (!sh || sh.done) return;
            let left = dtReal * 900; /* 1 s real = 15 min simulados */
            const acc = (x, y) => { const r = Math.hypot(x, y), k = -GM_E / (r * r * r); return [k * x, k * y]; };
            while (left > 0) {
                const dt = Math.min(5, left); left -= dt;
                /* Runge-Kutta 4 */
                const s0 = [sh.x, sh.y, sh.vx, sh.vy], f = s => { const a = acc(s[0], s[1]); return [s[2], s[3], a[0], a[1]]; };
                const k1 = f(s0), k2 = f(s0.map((v, i) => v + k1[i] * dt / 2)), k3 = f(s0.map((v, i) => v + k2[i] * dt / 2)), k4 = f(s0.map((v, i) => v + k3[i] * dt));
                [sh.x, sh.y, sh.vx, sh.vy] = s0.map((v, i) => v + dt / 6 * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]));
                sh.t += dt;
                if (sh.t % 30 < dt) sh.path.push([sh.x, sh.y]);
                const r = Math.hypot(sh.x, sh.y);
                if (r <= RE) { sh.done = 'caiu'; sh.path.push([sh.x, sh.y]); break; }
                if (r > RE * 9) { sh.done = 'escapou'; break; }
                if (sh.t > 3.2e5) { sh.done = 'órbita'; break; }
            }
            if (sh.done) { st.shots.push(sh); if (st.shots.length > 6) st.shots.shift(); }
        }
        function drawCanhao(c, W, H) {
            const s = Math.min(W, H) / (2 * RE * 3.1), cx = W / 2, cy = H / 2 + Math.min(W, H) * 0.08;
            const X = x => cx + x * s, Y = y => cy - y * s;
            const eg = c.createRadialGradient(cx - RE * s * 0.3, cy - RE * s * 0.3, RE * s * 0.1, cx, cy, RE * s);
            eg.addColorStop(0, '#3b82f6'); eg.addColorStop(1, '#1e3a8a');
            c.fillStyle = 'rgba(96,165,250,.12)'; c.beginPath(); c.arc(cx, cy, RE * s * 1.04, 0, Math.PI * 2); c.fill();
            c.fillStyle = eg; c.beginPath(); c.arc(cx, cy, RE * s, 0, Math.PI * 2); c.fill();
            c.fillStyle = 'rgba(34,197,94,.35)'; c.beginPath(); c.ellipse(cx - RE * s * 0.25, cy - RE * s * 0.1, RE * s * 0.35, RE * s * 0.5, 0.4, 0, Math.PI * 2); c.fill();
            const h = +S('h').value * 1000;
            c.strokeStyle = '#a8a29e'; c.lineWidth = 3; c.beginPath(); c.moveTo(X(0), Y(RE)); c.lineTo(X(0), Y(RE + h)); c.stroke();
            c.fillStyle = '#e2e8f0'; c.fillRect(X(0) - 6, Y(RE + h) - 4, 14, 8);
            const drawPath = (sh, color, w) => { c.strokeStyle = color; c.lineWidth = w; c.beginPath(); sh.path.forEach((p, k) => k ? c.lineTo(X(p[0]), Y(p[1])) : c.moveTo(X(p[0]), Y(p[1]))); if (!sh.done) c.lineTo(X(sh.x), Y(sh.y)); c.stroke(); };
            st.shots.forEach(sh => drawPath(sh, sh.done === 'caiu' ? 'rgba(248,113,113,.45)' : sh.done === 'escapou' ? 'rgba(167,139,250,.5)' : 'rgba(52,211,153,.5)', 1.4));
            if (st.shot && !st.shot.done) { drawPath(st.shot, '#fbbf24', 2.2); c.fillStyle = '#fbbf24'; c.beginPath(); c.arc(X(st.shot.x), Y(st.shot.y), 4, 0, Math.PI * 2); c.fill(); }
            label(c, 'Terra (raio 6 371 km)', cx, cy, 'rgba(219,234,254,.8)', '600 12px "Plus Jakarta Sans", sans-serif', 'center');
        }
        function canhaoReadout() {
            const h = +S('h').value * 1000, v = +S('v').value * 1000, r = RE + h;
            S('v-v').textContent = nf(v / 1000, 3) + ' km/s'; S('h-v').textContent = nf(h / 1000, 4) + ' km';
            const vc = Math.sqrt(GM_E / r), ve = Math.sqrt(2 * GM_E / r), E = v * v / 2 - GM_E / r;
            let tipo = v < 1 ? 'cai quase na vertical' : E >= 0 ? (Math.abs(v - ve) < 25 ? 'parábola: escapa no limite' : 'hipérbole: escapa') : 'elipse';
            let extra = '';
            if (E < 0 && v > 0) {
                const a = -GM_E / (2 * E), hh = r * v, e = Math.sqrt(Math.max(0, 1 - hh * hh / (GM_E * a))), rp = a * (1 - e), ra = a * (1 + e);
                const P = 2 * Math.PI * Math.sqrt(a * a * a / GM_E);
                tipo = rp < RE ? 'elipse que corta a Terra: cai' : Math.abs(v - vc) < 25 ? 'órbita circular' : 'órbita elíptica';
                extra = cell('Período da órbita', nf(P / 60, 4) + ' min') + cell('Ponto mais baixo / mais alto', nf((rp - RE) / 1000, 4) + ' / ' + nf((ra - RE) / 1000, 4) + ' km', true);
            }
            const sh = st.shot;
            return cell('Velocidade circular aqui', nf(vc / 1000, 4) + ' km/s') + cell('Velocidade de escape aqui', nf(ve / 1000, 4) + ' km/s') +
                cell('Trajetória prevista', tipo, true) + extra +
                (sh ? cell('Último disparo', sh.done ? sh.done : 'em voo · ' + nf(sh.t / 60, 3) + ' min') : '');
        }

        /* ---------- exoplaneta ---------- */
        const RSUN = 6.957e8, MSUN = 1.989e30, REARTH = 6.371e6, MEARTH = 5.972e24, G = 6.674e-11;
        const exoPars = () => {
            const sk = STARS[S('star').value], Ms = sk[0] * MSUN, Rs = sk[1] * RSUN, Rp = +S('rp').value * REARTH, mp = Math.pow(10, +S('mp').value) * MEARTH;
            const Pd = Math.pow(10, +S('per').value), P = Pd * 86400, a = Math.cbrt(G * (Ms + mp) * P * P / (4 * Math.PI * Math.PI));
            const K = Math.cbrt(2 * Math.PI * G / P) * mp / Math.pow(Ms + mp, 2 / 3);
            const dur = P / Math.PI * Math.asin(Math.min(1, (Rs + Rp) / a));
            return { sk, Ms, Rs, Rp, mp, Pd, P, a, K, dur, depth: Math.min(1, (Rp / Rs) ** 2) };
        };
        function overlap(d, R, r) { /* área de interseção de dois círculos */
            if (d >= R + r) return 0; if (d <= Math.abs(R - r)) return Math.PI * Math.min(R, r) ** 2;
            const a = r * r * Math.acos((d * d + r * r - R * R) / (2 * d * r)), b = R * R * Math.acos((d * d + R * R - r * r) / (2 * d * R));
            return a + b - 0.5 * Math.sqrt((-d + r + R) * (d + r - R) * (d - r + R) * (d + r + R));
        }
        function drawExo(c, W, H) {
            const q = exoPars(), top = H * 0.5, Rpx = Math.min(W * 0.16, top * 0.36), cx = W / 2, cy = top / 2 + 6;
            /* fase: 0 = meio do trânsito; posição projetada x = a sen(2πφ) */
            const ph = st.ph, xs = q.a * Math.sin(2 * Math.PI * ph) / q.Rs, front = Math.cos(2 * Math.PI * ph) > 0;
            const wob = q.K / 30 * Math.sin(2 * Math.PI * ph); /* oscilação exagerada da estrela, só ilustrativa */
            const sx = cx - Math.max(-12, Math.min(12, wob));
            const sg = c.createRadialGradient(sx, cy, Rpx * 0.1, sx, cy, Rpx);
            const col = q.sk[0] < 0.5 ? ['#ffd2a6', '#e2683a'] : q.sk[0] > 1.2 ? ['#ffffff', '#bfd4ff'] : ['#fff8e1', '#f6b74a'];
            sg.addColorStop(0, col[0]); sg.addColorStop(1, col[1]);
            const pr = Math.max(1.5, q.Rp / q.Rs * Rpx), px = sx + xs * Rpx;
            if (!front) { c.fillStyle = '#334155'; c.beginPath(); c.arc(px, cy, pr, 0, Math.PI * 2); c.fill(); }
            c.fillStyle = sg; c.beginPath(); c.arc(sx, cy, Rpx, 0, Math.PI * 2); c.fill();
            if (front) { c.fillStyle = '#0b1020'; c.beginPath(); c.arc(px, cy, pr, 0, Math.PI * 2); c.fill(); }
            label(c, 'vista de lado (estrela e planeta em escala; distância não)', 12, 14, '#94a3b8', '600 11px "Plus Jakarta Sans", sans-serif');
            /* curva de luz em volta do trânsito */
            const g0 = top + 8, gh = (H - g0) / 2 - 10, gw = W - 70, gx = 56;
            const win = Math.max(q.dur * 1.6, 3600 * 3) / q.P; /* janela de fase */
            const flux = phase => { const x = q.a * Math.sin(2 * Math.PI * phase) / q.Rs, f = Math.cos(2 * Math.PI * phase) > 0; return f ? 1 - overlap(Math.abs(x), 1, q.Rp / q.Rs) / Math.PI : 1; };
            const fmin = 1 - q.depth * 1.15;
            const FX = p => gx + (p / win + 1) / 2 * gw, FY = f => g0 + 14 + (1 - f) / (1 - fmin) * (gh - 22);
            c.strokeStyle = 'rgba(148,163,184,.3)'; c.strokeRect(gx, g0, gw, gh);
            c.strokeStyle = '#fbbf24'; c.lineWidth = 2; c.beginPath();
            for (let k = 0; k <= 200; k++) { const p = -win + 2 * win * k / 200; const y = FY(flux(p)); k ? c.lineTo(FX(p), y) : c.moveTo(FX(p), y); } c.stroke();
            let phw = ((ph % 1) + 1.5) % 1 - 0.5;
            if (Math.abs(phw) <= win) { c.fillStyle = '#fff'; c.beginPath(); c.arc(FX(phw), FY(flux(phw)), 4, 0, Math.PI * 2); c.fill(); }
            label(c, 'brilho', 8, g0 + 10, '#94a3b8', '600 10px "Plus Jakarta Sans", sans-serif');
            label(c, 'trânsito: ±' + nf(win * q.P / 3600, 3) + ' h em volta do centro', gx + 4, g0 + gh - 8, '#94a3b8', '500 10px "Plus Jakarta Sans", sans-serif');
            /* velocidade radial ao longo de uma órbita */
            const r0 = g0 + gh + 12, RY = v => r0 + gh / 2 - v / (q.K * 1.25 || 1) * (gh / 2 - 6), RX = p => gx + p * gw;
            c.strokeStyle = 'rgba(148,163,184,.3)'; c.strokeRect(gx, r0, gw, gh);
            c.strokeStyle = 'rgba(148,163,184,.4)'; c.beginPath(); c.moveTo(gx, RY(0)); c.lineTo(gx + gw, RY(0)); c.stroke();
            c.strokeStyle = '#34d399'; c.lineWidth = 2; c.beginPath();
            for (let k = 0; k <= 200; k++) { const p = k / 200, y = RY(-q.K * Math.sin(2 * Math.PI * p)); k ? c.lineTo(RX(p), y) : c.moveTo(RX(p), y); } c.stroke();
            const pp = ((ph % 1) + 1) % 1; c.fillStyle = '#fff'; c.beginPath(); c.arc(RX(pp), RY(-q.K * Math.sin(2 * Math.PI * pp)), 4, 0, Math.PI * 2); c.fill();
            label(c, 'velocidade da estrela (uma órbita completa)', gx + 4, r0 + 10, '#94a3b8', '500 10px "Plus Jakarta Sans", sans-serif');
            label(c, '+' + nf(q.K, 3) + ' m/s', 4, RY(q.K), '#6ee7b7', '500 10px "JetBrains Mono", monospace');
        }
        function exoReadout() {
            const q = exoPars();
            S('rp-v').textContent = nf(q.Rp / REARTH, 3) + ' R⊕ (' + nf(q.Rp / 7.1492e7, 3) + ' × Júpiter)';
            S('mp-v').textContent = nf(q.mp / MEARTH, 4) + ' M⊕ (' + nf(q.mp / 1.898e27, 3) + ' × Júpiter)';
            S('per-v').textContent = nf(q.Pd, 4) + ' dias';
            const dens = q.mp / (4 / 3 * Math.PI * q.Rp ** 3) / 1000;
            return cell('Profundidade do trânsito', nf(q.depth * 100, 3) + '% (' + Math.round(q.depth * 1e6).toLocaleString('pt-BR') + ' ppm)') + cell('Duração do trânsito', nf(q.dur / 3600, 3) + ' h') +
                cell('Distância à estrela', nf(q.a / AU, 4) + ' UA') + cell('Amplitude ' + T('K'), nf(q.K, 4) + ' m/s') +
                cell('Densidade do planeta', nf(dens, 3) + ' g/cm³ ' + (dens > 3.5 ? '(rochoso)' : dens > 1.6 ? '(rocha e gelo/água)' : '(gasoso)'), true) +
                cell('Chance de vermos o trânsito', nf(100 * q.Rs / q.a, 3) + '% das orientações', true);
        }

        /* ---------- geral ---------- */
        const NOTES = {
            leis: ['<strong>Leitura.</strong> O Sol fica num foco da elipse. As fatias coloridas são varridas em tempos iguais (cada uma, 1/12 do período): as perto do periélio são curtas e largas; as perto do afélio, longas e finas, mas todas têm a mesma área. A seta verde é a velocidade.', '<strong>Experimente.</strong> Escolha o cometa Halley e veja ele passar voando pelo periélio e se arrastar no afélio. Aumente o semieixo maior: o período cresce com ' + T('a^{3/2}') + ', mais depressa que o tamanho da órbita.'],
            canhao: ['<strong>A ideia de Newton.</strong> Um canhão no alto de uma montanha muito alta dispara na horizontal. Devagar, a bala cai perto. Mais rápido, cai mais longe, porque a Terra é curva. Na velocidade certa, a superfície "foge" na mesma medida em que a bala cai: é uma órbita.', '<strong>Experimente.</strong> Dispare a 6, 7,6, 9 e 11 km/s (com 500 km de altura). Abaixo da velocidade circular, a elipse corta a Terra; acima, a órbita fica alongada; na velocidade de escape (cerca de ' + T('\\sqrt2') + ' vezes a circular), a bala não volta. A atmosfera é ignorada.'],
            exo: ['<strong>Leitura.</strong> Em cima, a estrela e o planeta vistos de lado, em tamanho real relativo. No meio, a curva de luz: o brilho cai enquanto o planeta passa na frente. Embaixo, a velocidade da estrela, que balança em volta do centro de massa (o balanço na figura está exagerado).', '<strong>Experimente.</strong> Ponha um planeta do tamanho da Terra (1 R⊕) numa estrela como o Sol e depois numa anã vermelha: a queda de brilho fica cerca de 20 vezes maior. Aumente o período: o sinal de velocidade diminui e os trânsitos ficam raros e longos.']
        };
        function setMode() {
            st.mode = S('mode').value;
            ['leis', 'canhao', 'exo'].forEach(m => S(m).hidden = m !== st.mode);
            S('note1').innerHTML = NOTES[st.mode][0]; S('note2').innerHTML = NOTES[st.mode][1];
            S('play').hidden = st.mode === 'canhao';
            draw();
        }
        function draw() {
            const g = canvas2d(cv, '#05070f'); if (!g) return;
            if (st.mode === 'leis') { drawLeis(g.c, g.W, g.H); S('out').innerHTML = leisReadout(); }
            else if (st.mode === 'canhao') { drawCanhao(g.c, g.W, g.H); S('out').innerHTML = canhaoReadout(); }
            else { drawExo(g.c, g.W, g.H); S('out').innerHTML = exoReadout(); }
        }
        function loop(ts) {
            if (!visible(cv)) { st.raf = 0; st.last = 0; return; }
            const dt = st.last ? Math.min(0.1, (ts - st.last) / 1000) : 0; st.last = ts;
            let need = false;
            if (st.mode === 'leis' && st.playing) { st.M = (st.M + dt * 2 * Math.PI / 8) % (2 * Math.PI); need = true; }
            if (st.mode === 'canhao' && st.shot && !st.shot.done) { stepShot(dt); need = true; }
            if (st.mode === 'exo' && st.playing) {
                const q = exoPars(), x = Math.abs(q.a * Math.sin(2 * Math.PI * st.ph) / q.Rs), front = Math.cos(2 * Math.PI * st.ph) > 0;
                const near = front && x < 3 ? 1 : 0;
                st.ph += dt * (near ? 0.25 * (q.Rs / q.a) : 0.12); need = true;
            }
            if (need) draw();
            st.raf = requestAnimationFrame(loop);
        }
        S('mode').addEventListener('change', setMode);
        S('pre').addEventListener('change', setPreset);
        ['a', 'e'].forEach(k => S(k).addEventListener('input', () => { S('pre').value = 'livre'; draw(); }));
        ['areas', 'vel', 'axes'].forEach(k => S(k).addEventListener('change', draw));
        ['v', 'h'].forEach(k => S(k).addEventListener('input', draw));
        ['star', 'rp', 'mp', 'per'].forEach(k => S(k).addEventListener('input', draw));
        S('star').addEventListener('change', draw);
        S('fire').addEventListener('click', () => { fire(); draw(); });
        S('clear').addEventListener('click', () => { st.shots = []; st.shot = null; draw(); });
        S('play').addEventListener('click', () => { st.playing = !st.playing; S('play').innerHTML = st.playing ? '<i class="fa-solid fa-pause"></i> Pausar' : '<i class="fa-solid fa-play"></i> Continuar'; });
        if (window.ResizeObserver) new ResizeObserver(() => draw()).observe(cv);
        S('pre').value = 'livre'; S('a').value = Math.log10(2).toFixed(3); S('e').value = 0.5;
        setMode();
        return () => { draw(); if (!st.raf) { st.last = 0; st.raf = requestAnimationFrame(loop); } };
    }

    /* =========================================================
       LUA: FASES E ECLIPSES (com as posições reais de Sol e Lua)
       ========================================================= */
    const asind = x => Math.asin(x) * R2D;
    /* lua nova (alvo 0) ou cheia (alvo 180) seguinte a t, por busca e bisseção na elongação */
    function nextSyzygy(t, target) {
        const f = tt => { let d = A.moonPhase(new Date(tt)).elong - target; return ((d % 360) + 540) % 360 - 180; };
        const step = 0.5 * 86400000;
        let t0 = t + 60000, f0 = f(t0);
        for (let k = 0; k < 70; k++) {
            const t1 = t0 + step, f1 = f(t1);
            if (f0 < 0 && f1 >= 0) { let lo = t0, hi = t1; for (let j = 0; j < 30; j++) { const m = (lo + hi) / 2; if (f(m) < 0) lo = m; else hi = m; } return hi; }
            t0 = t1; f0 = f1;
        }
        return NaN;
    }
    /* classifica um eclipse numa lua nova ou cheia pela latitude da Lua e pelos tamanhos aparentes */
    function eclipseAt(t, kind) {
        const d = new Date(t), m = A.moonEcl(d), rS = A.geo('sol', d).dist, b = Math.abs(m.lat);
        const sM = asind(1737.4 / m.dist), pM = asind(6378.14 / m.dist), sS = 0.26656 / rS, pS = 0.002443 / rS;
        if (kind === 'cheia') {
            const ru = 1.02 * (pM + pS - sS), rp = 1.02 * (pM + pS + sS);
            if (b <= ru - sM) return { type: 'eclipse lunar total', b };
            if (b <= ru + sM) return { type: 'eclipse lunar parcial', b };
            if (b <= rp + sM) return { type: 'eclipse lunar penumbral (difícil de notar)', b };
            return null;
        }
        if (b < pM - pS + sS + sM) {
            if (b < pM - pS) return { type: sM * 1.008 > sS ? 'eclipse solar total' : 'eclipse solar anular', b };
            return { type: 'eclipse solar parcial', b };
        }
        return null;
    }
    function nextEclipse(t) {
        let tn = t, tf = t;
        let n = nextSyzygy(tn, 0), f = nextSyzygy(tf, 180);
        for (let k = 0; k < 60; k++) {
            const first = n < f ? ['nova', n] : ['cheia', f];
            const ec = eclipseAt(first[1], first[0]);
            if (ec && !/penumbral/.test(ec.type)) return Object.assign({ t: first[1] }, ec);
            if (first[0] === 'nova') n = nextSyzygy(n + 86400000, 0); else f = nextSyzygy(f + 86400000, 180);
        }
        return null;
    }

    function initLua(root) {
        const SPEEDS = [[0, 'parado'], [3600, '1 hora por segundo'], [6 * 3600, '6 horas por segundo'], [86400, '1 dia por segundo'], [3 * 86400, '3 dias por segundo']];
        root.innerHTML =
            '<div class="lab-grid">' +
              '<div class="lab-stage tall"><canvas id="lu-cv" aria-label="Terra, Lua e Sol vistos de cima e de lado"></canvas></div>' +
              '<div class="lab-side">' +
                '<div class="ctl"><label for="lu-date">Data e hora (Brasília)</label><div style="display:flex;gap:6px"><input class="plain-in" id="lu-date" type="datetime-local" min="1800-01-01T00:00" max="2050-12-31T23:59"><button class="btn small" id="lu-now" type="button">Agora</button></div></div>' +
                '<div class="ctl"><label for="lu-speed">Passagem do tempo</label><div style="display:flex;gap:6px"><select id="lu-speed" style="flex:1">' + SPEEDS.map((s, i) => '<option value="' + i + '"' + (i === 3 ? ' selected' : '') + '>' + s[1] + '</option>').join('') + '</select><button class="btn small primary" id="lu-play" type="button" aria-label="Iniciar ou pausar"><i class="fa-solid fa-play"></i></button></div></div>' +
                '<div style="display:flex;gap:6px;flex-wrap:wrap"><button class="btn small" id="lu-nova" type="button">Próxima lua nova</button><button class="btn small" id="lu-cheia" type="button">Próxima lua cheia</button><button class="btn small primary" id="lu-ecl" type="button"><i class="fa-solid fa-circle-half-stroke"></i> Próximo eclipse</button></div>' +
                '<div class="ctl"><label for="lu-hemi">Como a Lua aparece</label><select id="lu-hemi"><option value="s">no hemisfério sul (olhando para o norte)</option><option value="n">no hemisfério norte (olhando para o sul)</option></select></div>' +
                '<div class="ctl seg" style="flex-wrap:wrap;gap:6px 12px;font-size:.84rem"><label><input type="checkbox" id="lu-ghost" checked> as 8 fases na órbita</label></div>' +
                '<div class="readout" id="lu-out"></div>' +
              '</div>' +
            '</div>' +
            '<div class="lab-under">' +
              '<div class="lab-note"><strong>Leitura.</strong> Em cima, Terra e Lua vistas do norte, com a luz do Sol vindo da esquerda: metade da Lua está sempre iluminada; a fase depende de quanto dessa metade fica virado para a Terra. No canto, a Lua como aparece no céu. Embaixo, a mesma cena vista de lado, com a altura da Lua em relação ao plano da órbita da Terra ampliada (o fator aparece no painel), e as sombras.</div>' +
              '<div class="lab-note"><strong>Experimente.</strong> Clique em "próxima lua cheia" várias vezes: quase sempre a Lua passa acima ou abaixo da sombra da Terra. Depois clique em "próximo eclipse" e veja a Lua cruzando o plano exatamente na fase certa. As datas são calculadas com as posições reais; a classificação é aproximada para eclipses no limite.</div>' +
            '</div>';
        const S = k => $('#lu-' + k, root), cv = S('cv');
        const st = { t: Date.now(), playing: false, speed: 86400, raf: 0, last: 0, msg: '' };
        const PH = ['Lua nova', 'Lua crescente', 'Quarto crescente', 'Lua crescente gibosa', 'Lua cheia', 'Lua minguante gibosa', 'Quarto minguante', 'Lua minguante'];
        const phName = e => PH[Math.floor(((e + 22.5) % 360) / 45)];

        function moonDisk(c, x, y, r, elong, litLeft) {
            /* desenha a Lua com a parte iluminada; litLeft: lado iluminado na tela (para fases crescentes) */
            const frac = (1 - Math.cos(elong * D2R)) / 2, waxing = elong < 180;
            const sunSide = (waxing ? litLeft : !litLeft) ? Math.PI : 0;
            c.save(); c.translate(x, y); c.rotate(sunSide);
            c.fillStyle = '#2a2f3a'; c.beginPath(); c.arc(0, 0, r, 0, Math.PI * 2); c.fill();
            c.fillStyle = '#eceff4'; c.beginPath(); c.arc(0, 0, r, -Math.PI / 2, Math.PI / 2, false);
            const rx = Math.abs(2 * frac - 1) * r;
            if (frac >= 0.5) c.ellipse(0, 0, rx, r, 0, Math.PI / 2, Math.PI * 3 / 2, false); else c.ellipse(0, 0, rx, r, 0, Math.PI / 2, -Math.PI / 2, true);
            c.closePath(); c.fill(); c.restore();
        }
        function draw() {
            const g = canvas2d(cv, '#05070f'); if (!g) return;
            const { c, W, H } = g, d = new Date(st.t), ph = A.moonPhase(d), m = A.moonEcl(d);
            const topH = Math.round(H * 0.64), cx = W * 0.47, cy = topH / 2 + 4, R = Math.min(W * 0.34, topH * 0.4);
            /* raios de Sol */
            c.strokeStyle = 'rgba(253,224,71,.18)'; c.lineWidth = 1;
            for (let k = 0; k < 7; k++) { const y = 20 + k * (topH - 40) / 6; arrowPx(c, 8, y, 60, y, 'rgba(253,224,71,.45)', 1.4); }
            label(c, 'luz do Sol', 10, 12, '#fde68a', '600 11px "Plus Jakarta Sans", sans-serif');
            /* órbita */
            c.strokeStyle = 'rgba(148,163,184,.35)'; c.setLineDash([4, 5]); c.beginPath(); c.arc(cx, cy, R, 0, Math.PI * 2); c.stroke(); c.setLineDash([]);
            /* Terra com dia e noite */
            const re = Math.max(12, R * 0.13);
            c.fillStyle = '#1e3a8a'; c.beginPath(); c.arc(cx, cy, re, 0, Math.PI * 2); c.fill();
            c.fillStyle = '#60a5fa'; c.beginPath(); c.arc(cx, cy, re, Math.PI / 2, Math.PI * 3 / 2); c.fill();
            label(c, 'Terra', cx, cy + re + 12, '#93c5fd', '600 11px "Plus Jakarta Sans", sans-serif', 'center');
            const pos = e => { const th = Math.PI + e * D2R; return [cx + R * Math.cos(th), cy - R * Math.sin(th)]; };
            if (S('ghost').checked) for (let k = 0; k < 8; k++) {
                const e = k * 45, [x, y] = pos(e), rr = Math.max(5, R * 0.05);
                c.globalAlpha = 0.45; c.fillStyle = '#2a2f3a'; c.beginPath(); c.arc(x, y, rr, 0, Math.PI * 2); c.fill();
                c.fillStyle = '#eceff4'; c.beginPath(); c.arc(x, y, rr, Math.PI / 2, Math.PI * 3 / 2); c.fill(); c.globalAlpha = 1;
                const lx = cx + (R + 26) * Math.cos(Math.PI + e * D2R), ly = cy - (R + 22) * Math.sin(Math.PI + e * D2R);
                if (W > 520) label(c, PH[k].replace('Lua ', ''), lx, ly, 'rgba(203,213,225,.65)', '500 10px "Plus Jakarta Sans", sans-serif', 'center');
            }
            /* a Lua agora: metade voltada ao Sol iluminada */
            const [mx, my] = pos(ph.elong), rm = Math.max(7, R * 0.075);
            c.fillStyle = '#2a2f3a'; c.beginPath(); c.arc(mx, my, rm, 0, Math.PI * 2); c.fill();
            c.fillStyle = '#f1f5f9'; c.beginPath(); c.arc(mx, my, rm, Math.PI / 2, Math.PI * 3 / 2); c.fill();
            c.strokeStyle = 'rgba(244,114,182,.8)'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(cx, cy); c.lineTo(mx, my); c.stroke();
            /* como aparece no céu */
            const ir = Math.min(46, W * 0.07), ix = W - ir - 18, iy = ir + 30;
            c.fillStyle = 'rgba(15,23,42,.85)'; c.strokeStyle = 'rgba(148,163,184,.3)'; c.beginPath(); c.roundRect(ix - ir - 12, iy - ir - 24, 2 * ir + 24, 2 * ir + 44, 10); c.fill(); c.stroke();
            moonDisk(c, ix, iy, ir, ph.elong, S('hemi').value === 's');
            label(c, 'no céu', ix, iy - ir - 12, '#94a3b8', '600 10px "Plus Jakarta Sans", sans-serif', 'center');
            label(c, Math.round(ph.frac * 100) + '%', ix, iy + ir + 11, '#e2e8f0', '600 11px "JetBrains Mono", monospace', 'center');
            /* vista de lado */
            const y0 = topH + 6, h = H - y0 - 6, my0 = y0 + h / 2;
            c.fillStyle = '#0b1020'; c.fillRect(0, y0, W, h);
            const ex = W * 0.5, scaleX = Math.min(W * 0.36, 260), pxDeg = Math.min(h / 2 - 16, 70) / 5.5; /* pixels por grau de latitude (já com exagero) */
            const EX = Math.max(1, Math.round(pxDeg / (scaleX * D2R))); /* exagero vertical em relação à escala horizontal */
            label(c, W < 560 ? 'De lado (altura ampliada ' + EX + '×)' : 'De lado: altura da Lua acima/abaixo do plano da órbita da Terra (ampliada ' + EX + ' vezes)', 10, y0 + 12, '#94a3b8', '600 11px "Plus Jakarta Sans", sans-serif');
            c.strokeStyle = 'rgba(251,191,36,.35)'; c.setLineDash([5, 5]); c.beginPath(); c.moveTo(0, my0); c.lineTo(W, my0); c.stroke(); c.setLineDash([]);
            /* sombra da Terra (para a direita) e sombra da Lua */
            const rS = A.geo('sol', d).dist, pM = asind(6378.14 / m.dist), ru = 1.02 * (pM - 0.26656 / rS), sM = asind(1737.4 / m.dist);
            c.fillStyle = 'rgba(15,23,42,.9)'; c.beginPath(); c.moveTo(ex, my0 - 10); c.lineTo(W, my0 - ru * pxDeg); c.lineTo(W, my0 + ru * pxDeg); c.lineTo(ex, my0 + 10); c.closePath(); c.fill();
            c.strokeStyle = 'rgba(248,113,113,.35)'; c.stroke();
            c.fillStyle = '#3b82f6'; c.beginPath(); c.arc(ex, my0, 10, 0, Math.PI * 2); c.fill();
            arrowPx(c, 12, my0, 48, my0, 'rgba(253,224,71,.7)', 1.6); label(c, 'Sol', 10, my0 - 12, '#fde68a', '600 10px "Plus Jakarta Sans", sans-serif');
            const lx = ex - Math.cos(ph.elong * D2R) * scaleX, ly = my0 - m.lat * pxDeg, lr = Math.max(5, sM * pxDeg);
            /* sombra da Lua em direção à Terra, perto da lua nova */
            if (Math.cos(ph.elong * D2R) > 0.3) { c.fillStyle = 'rgba(2,6,23,.75)'; c.beginPath(); c.moveTo(lx, ly - lr); c.lineTo(ex + 20, my0 - (m.lat * pxDeg) * 0.02 - 1); c.lineTo(ex + 20, my0 - (m.lat * pxDeg) * 0.02 + 1); c.lineTo(lx, ly + lr); c.closePath(); c.fill(); }
            c.fillStyle = '#e5e7eb'; c.beginPath(); c.arc(lx, ly, lr, 0, Math.PI * 2); c.fill();
            label(c, 'Lua · β = ' + nf(m.lat, 3) + '°', lx + lr + 5, ly - lr - 2, '#e5e7eb', '600 10px "Plus Jakarta Sans", sans-serif');
            label(c, 'sombra da Terra', W - 8, my0 + ru * pxDeg + 12, 'rgba(248,113,113,.7)', '500 10px "Plus Jakarta Sans", sans-serif', 'right');
            readout(d, ph, m);
        }
        function readout(d, ph, m) {
            const hm = t => { const x = ((t % 24) + 24) % 24; return pad(Math.floor(x)) + 'h' + pad(Math.round((x % 1) * 60) % 60); };
            const rise = 6 + ph.elong / 15, merid = 12 + ph.elong / 15;
            $('#lu-out', root).innerHTML =
                cell('Fase', phName(ph.elong), true) +
                cell('Iluminada', Math.round(ph.frac * 1000) / 10 + '%') + cell('Idade', nf(ph.age, 3) + ' dias') +
                cell('Elongação', nf(ph.elong, 4) + '°') + cell('Latitude eclíptica β', nf(m.lat, 3) + '°') +
                cell('Nasce por volta de', hm(rise)) + cell('Mais alta por volta de', hm(merid)) +
                cell('Distância', Math.round(m.dist).toLocaleString('pt-BR') + ' km', true) +
                (st.msg ? cell('Resultado', st.msg, true) : '');
        }
        function setT(t) { st.t = clamp(t, MIN_T, MAX_T); if (st.t !== t) play(false); S('date').value = toInput(st.t, -3); }
        function jump(t, msg) { if (!Number.isFinite(t)) return; play(false); setT(t); st.msg = msg; draw(); }
        function loop(ts) {
            if (!st.playing) { st.raf = 0; return; }
            if (!visible(cv)) { st.raf = 0; st.last = 0; return; }
            if (st.last) setT(st.t + (ts - st.last) * st.speed);
            st.last = ts; draw(); st.raf = requestAnimationFrame(loop);
        }
        function play(on) {
            st.playing = on === undefined ? !st.playing : on;
            if (st.playing) { st.msg = ''; if (!st.speed) { S('speed').value = '3'; st.speed = 86400; } }
            S('play').innerHTML = '<i class="fa-solid fa-' + (st.playing ? 'pause' : 'play') + '"></i>';
            st.last = 0; if (st.playing && !st.raf) st.raf = requestAnimationFrame(loop);
        }
        S('date').addEventListener('change', () => { const t = fromInput(S('date').value, -3); if (Number.isFinite(t)) { st.msg = ''; setT(t); draw(); } });
        S('now').addEventListener('click', () => { st.msg = ''; setT(Date.now()); draw(); });
        S('speed').addEventListener('change', () => { st.speed = SPEEDS[+S('speed').value][0]; play(!!st.speed); });
        S('play').addEventListener('click', () => play());
        S('nova').addEventListener('click', () => { const t = nextSyzygy(st.t, 0), e = eclipseAt(t, 'nova'); jump(t, 'Lua nova em ' + fmtLocal(t, -3) + (e ? ' · <span style="color:#fbbf24">' + e.type + '</span>' : ' · sem eclipse: a Lua passa ' + (A.moonEcl(new Date(t)).lat > 0 ? 'acima' : 'abaixo') + ' do Sol')); });
        S('cheia').addEventListener('click', () => { const t = nextSyzygy(st.t, 180), e = eclipseAt(t, 'cheia'); jump(t, 'Lua cheia em ' + fmtLocal(t, -3) + (e ? ' · <span style="color:#fbbf24">' + e.type + '</span>' : ' · sem eclipse: a Lua passa ' + (A.moonEcl(new Date(t)).lat > 0 ? 'acima' : 'abaixo') + ' da sombra da Terra')); });
        S('ecl').addEventListener('click', () => { const e = nextEclipse(st.t); if (e) jump(e.t, '<span style="color:#fbbf24">' + e.type.charAt(0).toUpperCase() + e.type.slice(1) + '</span> em ' + fmtLocal(e.t, -3) + ' (horário de Brasília)'); });
        S('hemi').addEventListener('change', draw); S('ghost').addEventListener('change', draw);
        if (window.ResizeObserver) new ResizeObserver(() => draw()).observe(cv);
        setT(Date.now());
        return () => { draw(); if (st.playing && !st.raf) { st.last = 0; st.raf = requestAnimationFrame(loop); } };
    }



    return { init: { planetario: initPlanetario, sistema: initSistema, kepler: initKepler, lua: initLua }, nextEclipse, eclipseAt, nextSyzygy };
})();
