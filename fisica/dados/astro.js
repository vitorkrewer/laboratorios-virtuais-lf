/* Efemérides compactas para os simuladores de Física (Astronomia, Cosmologia).
   - Planetas: elementos keplerianos médios do JPL ("Approximate Positions of the Planets",
     E. M. Standish, tabela válida de 1800 a 2050), referidos à eclíptica e ao equinócio J2000.
     Erro típico de alguns minutos de arco para os planetas internos e menos de 1° para os externos.
   - Lua: série truncada de baixa precisão (Meeus), erro típico de alguns décimos de grau.
   - Precessão IAU 1976 de J2000 para a data; nutação e aberração são ignoradas.
   Tudo em graus, exceto onde indicado; datas como objetos Date (UTC). */
window.MATH = window.MATH || {};

MATH.astro = (function () {
    'use strict';
    const D2R = Math.PI / 180, R2D = 180 / Math.PI;
    const sind = x => Math.sin(x * D2R), cosd = x => Math.cos(x * D2R);
    const norm360 = x => ((x % 360) + 360) % 360;

    const jd = date => date.getTime() / 86400000 + 2440587.5;
    const centuries = date => (jd(date) - 2451545.0) / 36525;

    /* a, e, I, L, varpi (long. do periélio), Omega (long. do nodo) e taxas por século */
    const EL = {
        mercurio: [[0.38709927, 0.20563593, 7.00497902, 252.25032350, 77.45779628, 48.33076593], [0.00000037, 0.00001906, -0.00594749, 149472.67411175, 0.16047689, -0.12534081]],
        venus: [[0.72333566, 0.00677672, 3.39467605, 181.97909950, 131.60246718, 76.67984255], [0.00000390, -0.00004107, -0.00078890, 58517.81538729, 0.00268329, -0.27769418]],
        terra: [[1.00000261, 0.01671123, -0.00001531, 100.46457166, 102.93768193, 0.0], [0.00000562, -0.00004392, -0.01294668, 35999.37244981, 0.32327364, 0.0]],
        marte: [[1.52371034, 0.09339410, 1.84969142, -4.55343205, -23.94362959, 49.55953891], [0.00001847, 0.00007882, -0.00813131, 19140.30268499, 0.44441088, -0.29257343]],
        jupiter: [[5.20288700, 0.04838624, 1.30439695, 34.39644051, 14.72847983, 100.47390909], [-0.00011607, -0.00013253, -0.00183714, 3034.74612775, 0.21252668, 0.20469106]],
        saturno: [[9.53667594, 0.05386179, 2.48599187, 49.95424423, 92.59887831, 113.66242448], [-0.00125060, -0.00050991, 0.00193609, 1222.49362201, -0.41897216, -0.28867794]],
        urano: [[19.18916464, 0.04725744, 0.77263783, 313.23810451, 170.95427630, 74.01692503], [-0.00196176, -0.00004397, -0.00242939, 428.48202785, 0.40805281, 0.04240589]],
        netuno: [[30.06992276, 0.00859048, 1.77004347, -55.12002969, 44.96476227, 131.78422574], [0.00026291, 0.00005105, 0.00035372, 218.45945325, -0.32241464, -0.00508664]]
    };
    const PLANETS = [
        { id: 'mercurio', name: 'Mercúrio', color: '#b8b2a6', R: 2439.7, mag: [-0.6, 0] },
        { id: 'venus', name: 'Vênus', color: '#f3e3b5', R: 6051.8 },
        { id: 'terra', name: 'Terra', color: '#4f9cf7', R: 6371 },
        { id: 'marte', name: 'Marte', color: '#e0703f', R: 3389.5 },
        { id: 'jupiter', name: 'Júpiter', color: '#e3c49a', R: 69911 },
        { id: 'saturno', name: 'Saturno', color: '#e8d18f', R: 58232 },
        { id: 'urano', name: 'Urano', color: '#9fe3e8', R: 25362 },
        { id: 'netuno', name: 'Netuno', color: '#6f8ff7', R: 24622 }
    ];

    /* resolve a equação de Kepler M = E − e sen E (graus) */
    function keplerE(Mdeg, e) {
        const M = norm360(Mdeg + 180) - 180;
        let E = M + (e * R2D) * Math.sin(M * D2R);
        for (let k = 0; k < 30; k++) {
            const dM = M - (E - (e * R2D) * Math.sin(E * D2R));
            const dE = dM / (1 - e * Math.cos(E * D2R));
            E += dE;
            if (Math.abs(dE) < 1e-9) break;
        }
        return E;
    }
    function elements(id, T) {
        const [b, r] = EL[id];
        const a = b[0] + r[0] * T, e = b[1] + r[1] * T, I = b[2] + r[2] * T, L = b[3] + r[3] * T, w = b[4] + r[4] * T, O = b[5] + r[5] * T;
        return { a, e, I, L, w, O, peri: w - O, M: L - w };
    }
    /* posição heliocêntrica (UA) na eclíptica J2000: [x, y, z] */
    function helio(id, date) {
        const el = elements(id, centuries(date));
        const E = keplerE(el.M, el.e);
        const xp = el.a * (cosd(E) - el.e), yp = el.a * Math.sqrt(1 - el.e * el.e) * sind(E);
        const cw = cosd(el.peri), sw = sind(el.peri), cO = cosd(el.O), sO = sind(el.O), cI = cosd(el.I), sI = sind(el.I);
        return [
            (cw * cO - sw * sO * cI) * xp + (-sw * cO - cw * sO * cI) * yp,
            (cw * sO + sw * cO * cI) * xp + (-sw * sO + cw * cO * cI) * yp,
            (sw * sI) * xp + (cw * sI) * yp
        ];
    }
    /* órbita completa (para desenhar), N pontos, eclíptica J2000 */
    function orbit(id, date, N) {
        const el = elements(id, centuries(date)), pts = [];
        const cw = cosd(el.peri), sw = sind(el.peri), cO = cosd(el.O), sO = sind(el.O), cI = cosd(el.I), sI = sind(el.I);
        for (let k = 0; k <= N; k++) {
            const E = 360 * k / N, xp = el.a * (cosd(E) - el.e), yp = el.a * Math.sqrt(1 - el.e * el.e) * sind(E);
            pts.push([(cw * cO - sw * sO * cI) * xp + (-sw * cO - cw * sO * cI) * yp, (cw * sO + sw * cO * cI) * xp + (-sw * sO + cw * cO * cI) * yp, (sw * sI) * xp + (cw * sI) * yp]);
        }
        return pts;
    }

    /* precessão IAU 1976 de J2000 para a data: matriz 3×3 (aplicar a vetores equatoriais) */
    function precessionMatrix(date) {
        const T = centuries(date), s = 1 / 3600;
        const zeta = (2306.2181 * T + 0.30188 * T * T + 0.017998 * T * T * T) * s;
        const z = (2306.2181 * T + 1.09468 * T * T + 0.018203 * T * T * T) * s;
        const th = (2004.3109 * T - 0.42665 * T * T - 0.041833 * T * T * T) * s;
        const cz = cosd(zeta), sz = sind(zeta), cZ = cosd(z), sZ = sind(z), ct = cosd(th), st = sind(th);
        return [
            [cz * ct * cZ - sz * sZ, -sz * ct * cZ - cz * sZ, -st * cZ],
            [cz * ct * sZ + sz * cZ, -sz * ct * sZ + cz * cZ, -st * sZ],
            [cz * st, -sz * st, ct]
        ];
    }
    const mul = (m, v) => [m[0][0] * v[0] + m[0][1] * v[1] + m[0][2] * v[2], m[1][0] * v[0] + m[1][1] * v[1] + m[1][2] * v[2], m[2][0] * v[0] + m[2][1] * v[1] + m[2][2] * v[2]];
    const EPS0 = 23.4392911;
    const obliquity = date => { const T = centuries(date); return 23.4392911 - (46.815 * T + 0.00059 * T * T - 0.001813 * T * T * T) / 3600; };
    /* eclíptica → equatorial (mesmo equinócio), vetores */
    function eclToEq(v, eps) { const c = cosd(eps), s = sind(eps); return [v[0], c * v[1] - s * v[2], s * v[1] + c * v[2]]; }
    function eqToEcl(v, eps) { const c = cosd(eps), s = sind(eps); return [v[0], c * v[1] + s * v[2], -s * v[1] + c * v[2]]; }
    const vec = (ra, dec) => [cosd(dec) * cosd(ra), cosd(dec) * sind(ra), sind(dec)];
    const sph = v => { const r = Math.hypot(v[0], v[1], v[2]); return [norm360(Math.atan2(v[1], v[0]) * R2D), Math.asin(v[2] / r) * R2D, r]; };

    /* posição geocêntrica de um planeta ou do Sol: equatorial da data, {ra, dec, dist (UA), v (unitário)} */
    function geo(id, date, P) {
        P = P || precessionMatrix(date);
        const E = helio('terra', date);
        let v;
        if (id === 'sol') v = [-E[0], -E[1], -E[2]];
        else {
            const p = helio(id, date);
            v = [p[0] - E[0], p[1] - E[1], p[2] - E[2]];
            /* correção de tempo de luz (uma iteração) */
            const lt = Math.hypot(...v) * 0.0057755183;
            const p2 = helio(id, new Date(date.getTime() - lt * 86400000));
            v = [p2[0] - E[0], p2[1] - E[1], p2[2] - E[2]];
        }
        const q = mul(P, eclToEq(v, EPS0));
        const s = sph(q);
        return { ra: s[0], dec: s[1], dist: s[2], v: [q[0] / s[2], q[1] / s[2], q[2] / s[2]], helio: id === 'sol' ? [0, 0, 0] : helio(id, date), earth: E };
    }

    /* Lua: eclíptica da data, {lon, lat, dist (km)} */
    function moonEcl(date) {
        const T = centuries(date);
        const Lp = 218.3164477 + 481267.88123421 * T, Mp = 134.9633964 + 477198.8675055 * T, M = 357.5291092 + 35999.0502909 * T;
        const D = 297.8501921 + 445267.1114034 * T, F = 93.2720950 + 483202.0175233 * T;
        const lon = Lp + 6.288774 * sind(Mp) + 1.274027 * sind(2 * D - Mp) + 0.658314 * sind(2 * D) + 0.213618 * sind(2 * Mp)
            - 0.185116 * sind(M) - 0.114332 * sind(2 * F) + 0.058793 * sind(2 * D - 2 * Mp) + 0.057066 * sind(2 * D - M - Mp)
            + 0.053322 * sind(2 * D + Mp) + 0.045758 * sind(2 * D - M) - 0.040923 * sind(M - Mp) - 0.034720 * sind(D)
            - 0.030383 * sind(M + Mp) + 0.015327 * sind(2 * D - 2 * F) - 0.012528 * sind(Mp + 2 * F) + 0.010980 * sind(Mp - 2 * F)
            + 0.010675 * sind(4 * D - Mp) + 0.010034 * sind(3 * Mp) + 0.008548 * sind(4 * D - 2 * Mp) - 0.007888 * sind(2 * D + M - Mp)
            - 0.006783 * sind(2 * D + M) + 0.005162 * sind(Mp - D) + 0.005000 * sind(M + D) + 0.004049 * sind(Mp - M + 2 * D);
        const lat = 5.128122 * sind(F) + 0.280602 * sind(Mp + F) + 0.277693 * sind(Mp - F) + 0.173237 * sind(2 * D - F)
            + 0.055413 * sind(2 * D - Mp + F) + 0.046271 * sind(2 * D - Mp - F) + 0.032573 * sind(2 * D + F) + 0.017198 * sind(2 * Mp + F)
            + 0.009266 * sind(2 * D + Mp - F) + 0.008822 * sind(2 * Mp - F) + 0.008216 * sind(2 * D - M - F) + 0.004324 * sind(2 * D - 2 * Mp - F);
        const dist = 385000.56 - 20905.355 * cosd(Mp) - 3699.111 * cosd(2 * D - Mp) - 2955.968 * cosd(2 * D) - 569.925 * cosd(2 * Mp)
            + 48.888 * cosd(M) - 3.149 * cosd(2 * F) + 246.158 * cosd(2 * D - 2 * Mp) - 152.138 * cosd(2 * D - M - Mp)
            - 170.733 * cosd(2 * D + Mp) - 204.586 * cosd(2 * D - M) - 129.620 * cosd(M - Mp) + 108.743 * cosd(D) + 104.755 * cosd(M + Mp);
        return { lon: norm360(lon), lat, dist };
    }
    function moonGeo(date) {
        const m = moonEcl(date), eps = obliquity(date);
        const q = eclToEq(vec(m.lon, m.lat), eps), s = sph(q);
        return { ra: s[0], dec: s[1], dist: m.dist, v: q, lon: m.lon, lat: m.lat };
    }
    /* Lua topocêntrica (corrige a paralaxe, de até cerca de 1°, para um observador na superfície) */
    function moonTopo(date, lat, lon) {
        const m = moonGeo(date), lst = gmst(date) + lon, k = 6378.14 / m.dist;
        const q = [m.v[0] - k * cosd(lat) * cosd(lst), m.v[1] - k * cosd(lat) * sind(lst), m.v[2] - k * sind(lat)];
        const s = sph(q);
        return { ra: s[0], dec: s[1], dist: m.dist * s[2], v: [q[0] / s[2], q[1] / s[2], q[2] / s[2]] };
    }
    /* longitude eclíptica geocêntrica do Sol, da data */
    function sunLon(date) {
        const s = geo('sol', date), q = eqToEcl(s.v, obliquity(date));
        return sph(q)[0];
    }
    /* fase: ângulo de elongação (0 = nova, 180 = cheia), fração iluminada, idade aproximada (dias) */
    function moonPhase(date) {
        const m = moonEcl(date), ls = sunLon(date);
        const elong = norm360(m.lon - ls);
        const cosE = cosd(m.lat) * cosd(m.lon - ls);
        const ang = Math.acos(Math.max(-1, Math.min(1, cosE))) * R2D; /* separação Lua–Sol */
        const frac = (1 - cosd(ang)) / 2;
        return { elong, frac, age: elong / 360 * 29.530589, sep: ang, lat: m.lat, lon: m.lon, sunLon: ls };
    }

    /* tempo sideral médio de Greenwich (graus) */
    function gmst(date) {
        const d = jd(date) - 2451545.0, T = d / 36525;
        return norm360(280.46061837 + 360.98564736629 * d + 0.000387933 * T * T - T * T * T / 38710000);
    }
    /* equatorial (vetor, da data) → horizontal {alt, az} para latitude/longitude (graus, leste positivo) */
    function horizMatrix(date, lat, lon) {
        const lst = gmst(date) + lon;
        const cl = cosd(lst), sl = sind(lst), cp = cosd(lat), sp = sind(lat);
        /* linhas: leste, norte, zênite (em coordenadas equatoriais) */
        return { lst: norm360(lst), m: [[-sl, cl, 0], [-sp * cl, -sp * sl, cp], [cp * cl, cp * sl, sp]] };
    }
    function toHoriz(H, v) {
        const e = H.m[0][0] * v[0] + H.m[0][1] * v[1], n = H.m[1][0] * v[0] + H.m[1][1] * v[1] + H.m[1][2] * v[2], u = H.m[2][0] * v[0] + H.m[2][1] * v[1] + H.m[2][2] * v[2];
        return { e, n, u, alt: Math.asin(Math.max(-1, Math.min(1, u))) * R2D, az: norm360(Math.atan2(e, n) * R2D) };
    }

    /* magnitude aproximada dos planetas (fórmulas simplificadas com o ângulo de fase) */
    function planetMag(id, date) {
        const g = geo(id, date), r = Math.hypot(...g.helio), d = g.dist, R = Math.hypot(...g.earth);
        const cosI = (r * r + d * d - R * R) / (2 * r * d), i = Math.acos(Math.max(-1, Math.min(1, cosI))) * R2D;
        const base = { mercurio: -0.42 + 0.038 * i - 0.000273 * i * i + 0.000002 * i * i * i, venus: -4.40 + 0.0009 * i + 0.000239 * i * i - 0.00000065 * i * i * i,
            marte: -1.52 + 0.016 * i, jupiter: -9.40 + 0.005 * i, saturno: -8.88, urano: -7.19, netuno: -6.87 }[id];
        return base + 5 * Math.log10(r * d);
    }

    return { D2R, R2D, jd, centuries, keplerE, elements, helio, orbit, precessionMatrix, mul, obliquity, eclToEq, eqToEcl, vec, sph, geo, moonEcl, moonGeo, moonTopo, moonPhase, sunLon, gmst, horizMatrix, toHoriz, planetMag, PLANETS, norm360 };
})();
