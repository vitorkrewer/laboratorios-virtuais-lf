/* Animação decorativa do hub de Física: Sistema Solar em perspectiva, com estrelas e um cometa.
   Os períodos seguem a terceira lei de Kepler (P ∝ a^1,5), comprimidos para caber na tela. */
(function () {
    'use strict';
    const cv = document.getElementById('heroOrbits');
    if (!cv) return;
    const c = cv.getContext('2d');
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const PL = [
        { a: 0.17, r: 2.2, col: '#b8b2a6' }, { a: 0.25, r: 3.2, col: '#f3e3b5' }, { a: 0.33, r: 3.4, col: '#4f9cf7' },
        { a: 0.42, r: 2.8, col: '#e0703f' }, { a: 0.62, r: 6.5, col: '#e3c49a' }, { a: 0.8, r: 5.5, col: '#e8d18f', ring: true }, { a: 0.95, r: 4, col: '#9fe3e8' }
    ];
    const STARS = Array.from({ length: 140 }, (_, i) => [(i * 9301 + 49297) % 233280 / 233280, (i * 4096 + 150889) % 714025 / 714025, ((i * 7919) % 100) / 100]);
    let W = 0, H = 0, run = !reduce, visible = true, t0 = performance.now();
    function size() {
        const r = cv.getBoundingClientRect(), d = window.devicePixelRatio || 1;
        W = r.width; H = r.height; cv.width = W * d; cv.height = H * d; c.setTransform(d, 0, 0, d, 0, 0);
    }
    function frame(now) {
        if (!W) size();
        const t = (now - t0) / 1000, cx = W / 2, cy = H / 2, R = Math.min(W / 2, H / 1.1) * 0.95, tilt = 0.38;
        c.clearRect(0, 0, W, H);
        STARS.forEach(([x, y, k]) => { c.fillStyle = 'rgba(226,232,240,' + (0.25 + 0.5 * Math.abs(Math.sin(t * (0.6 + k) + k * 9))) + ')'; c.fillRect(x * W, y * H, k > 0.85 ? 1.6 : 1, k > 0.85 ? 1.6 : 1); });
        const bodies = [];
        PL.forEach((p, i) => {
            const a = p.a * R, w = 0.9 / Math.pow(p.a / 0.33, 1.5), th = t * w * 0.5 + i * 1.7;
            c.strokeStyle = 'rgba(148,163,184,.22)'; c.lineWidth = 1; c.beginPath(); c.ellipse(cx, cy, a, a * tilt, 0, 0, Math.PI * 2); c.stroke();
            bodies.push({ x: cx + a * Math.cos(th), y: cy + a * tilt * Math.sin(th), z: Math.sin(th), p });
        });
        /* cometa numa elipse excêntrica: velocidade pela lei das áreas (resolve a equação de Kepler) */
        const e = 0.82, ac = 0.7 * R, M = (t * 0.12) % (2 * Math.PI);
        let E = M; for (let k = 0; k < 8; k++) E = M + e * Math.sin(E);
        const xo = ac * (Math.cos(E) - e), yo = ac * Math.sqrt(1 - e * e) * Math.sin(E), rot = -0.6;
        const qx = cx + xo * Math.cos(rot) - yo * Math.sin(rot), qy = cy + (xo * Math.sin(rot) + yo * Math.cos(rot)) * tilt;
        const dx = qx - cx, dy = qy - cy, dn = Math.hypot(dx, dy) || 1, tail = 26 + 60 * Math.max(0, 1 - dn / (ac * 0.9));
        const g = c.createLinearGradient(qx, qy, qx + dx / dn * tail, qy + dy / dn * tail);
        g.addColorStop(0, 'rgba(186,230,253,.85)'); g.addColorStop(1, 'rgba(186,230,253,0)');
        c.strokeStyle = g; c.lineWidth = 2.2; c.beginPath(); c.moveTo(qx, qy); c.lineTo(qx + dx / dn * tail, qy + dy / dn * tail); c.stroke();
        c.fillStyle = '#e0f2fe'; c.beginPath(); c.arc(qx, qy, 2.2, 0, Math.PI * 2); c.fill();
        /* Sol e planetas, dos mais distantes para os mais próximos do observador */
        const back = bodies.filter(b => b.z < 0), front = bodies.filter(b => b.z >= 0);
        const drawB = b => { c.fillStyle = b.p.col; c.beginPath(); c.arc(b.x, b.y, b.p.r, 0, Math.PI * 2); c.fill(); if (b.p.ring) { c.strokeStyle = b.p.col; c.lineWidth = 1; c.beginPath(); c.ellipse(b.x, b.y, b.p.r * 2, b.p.r * 0.7, -0.3, 0, Math.PI * 2); c.stroke(); } };
        back.forEach(drawB);
        const sg = c.createRadialGradient(cx, cy, 2, cx, cy, R * 0.16); sg.addColorStop(0, 'rgba(255,246,213,1)'); sg.addColorStop(0.35, 'rgba(253,200,90,.55)'); sg.addColorStop(1, 'rgba(253,186,80,0)');
        c.fillStyle = sg; c.beginPath(); c.arc(cx, cy, R * 0.16, 0, Math.PI * 2); c.fill();
        front.forEach(drawB);
        if (run && visible) requestAnimationFrame(frame);
    }
    window.addEventListener('resize', () => { size(); if (!run) frame(performance.now()); });
    if ('IntersectionObserver' in window) new IntersectionObserver(es => { const v = es[0].isIntersecting; if (v && !visible && run) { visible = true; requestAnimationFrame(frame); } visible = v; }).observe(cv);
    size(); requestAnimationFrame(frame);
})();
