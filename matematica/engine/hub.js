/* Hub do ecossistema de Matemática: rotas, livros com progresso e mapa de pré-requisitos. */
(function () {
    'use strict';
    const CAT = window.MATH.catalog, LBL = window.MATH.statusLabel;
    const $ = s => document.querySelector(s);
    const byId = id => CAT.find(b => b.id === id);
    const live = b => b.status === 'disponivel';

    function progress(b) {
        if (!live(b) || !b.chapters) return null;
        let p = {};
        try { p = JSON.parse(localStorage.getItem(b.storage + '.progress.v1')) || {}; } catch (e) { p = {}; }
        const done = Math.min(Object.keys(p).length, b.chapters);
        return { done, total: b.chapters, pct: Math.round(done / b.chapters * 100) };
    }

    /* ---- estatísticas ---- */
    const avail = CAT.filter(live);
    $('#hubStats').innerHTML =
        '<div><strong>' + avail.length + '</strong><span>livros disponíveis</span></div>' +
        '<div><strong>' + avail.reduce((s, b) => s + b.chapters, 0) + '</strong><span>capítulos</span></div>' +
        '<div><strong>' + CAT.length + '</strong><span>livros no mapa</span></div>' +
        '<div><strong>R$ 0</strong><span>gratuito</span></div>';

    /* ---- rotas por objetivo (atravessam livros) ---- */
    const ROUTES = [
        { icon: 'fa-hourglass-half', color: 'orange', title: 'Faz tempo que saí da escola',
          text: 'Comece pela Álgebra elementar: sinais, frações, equações e porcentagem, do começo e sem pressa. Faça o diagnóstico de 8 questões para saber o ritmo.',
          steps: [{ b: 'algebra', label: 'Diagnóstico de Álgebra', href: 'algebra/#/trilhas' }, { b: 'algebra', label: 'Álgebra do zero (21 dias)', href: 'algebra/#/trilhas/do-zero-21' }, { b: 'fundamentos', label: 'Depois: Fundamentos completo', href: 'fundamentos/#/trilhas/completo-14' }] },
        { icon: 'fa-bolt', color: 'amber', title: 'Tenho prova de Cálculo I em breve',
          text: 'Vá direto ao livro de Cálculo, faça o diagnóstico e use a trilha de resgate. Volte à Álgebra ou aos Fundamentos só quando travar.',
          steps: [{ b: 'calculo-1', label: 'Diagnóstico de Cálculo I', href: 'calculo-1/#/trilhas' }, { b: 'algebra', label: 'Álgebra para o Cálculo (se as contas travarem)', href: 'algebra/#/trilhas/para-calculo-5' }, { b: 'fundamentos', label: 'Ponte para o Cálculo (se precisar)', href: 'fundamentos/#/trilhas/ponte-calculo' }, { b: 'funcoes', label: 'Funções para o Cálculo (se precisar)', href: 'funcoes/#/trilhas/ponte-calculo' }] },
        { icon: 'fa-graduation-cap', color: 'sky', title: 'Estou começando a graduação',
          text: 'Construa a base na ordem certa: linguagem e números reais, depois funções e Cálculo. A Álgebra Linear pode correr em paralelo.',
          steps: [{ b: 'fundamentos', label: 'Fundamentos completo', href: 'fundamentos/#/trilhas/completo-14' }, { b: 'funcoes', label: 'Funções completo', href: 'funcoes/#/trilhas/completo-14' }, { b: 'calculo-1', label: 'Cálculo I', href: 'calculo-1/#/trilhas/base-30' }, { b: 'algebra-linear', label: 'Álgebra Linear (em paralelo com o Cálculo)', href: 'algebra-linear/#/trilhas/completo-24' }] },
        { icon: 'fa-circle-nodes', color: 'indigo', title: 'Meu curso começa por Teoria dos Conjuntos',
          text: 'Lógica, conjuntos, operações e produto cartesiano em quatro dias, com simulador de diagramas de Venn.',
          steps: [{ b: 'fundamentos', label: 'Trilha Teoria dos Conjuntos', href: 'fundamentos/#/trilhas/conjuntos-4' }, { b: 'fundamentos', label: 'Desafios no simulador', href: 'fundamentos/#/lab/venn' }] }
    ];
    $('#routes').innerHTML = ROUTES.map(r =>
        '<div class="route-card c-' + r.color + '"><i class="fa-solid ' + r.icon + '"></i><h3>' + r.title + '</h3><p>' + r.text + '</p><ol class="route-steps">' +
        r.steps.map(s => {
            const b = byId(s.b), ok = live(b) && s.href;
            return '<li class="' + (ok ? '' : 'soon') + '">' + (ok ? '<a href="' + s.href + '">' + s.label + ' <i class="fa-solid fa-arrow-right"></i></a>' : '<span>' + s.label + ' · em breve</span>') + '</li>';
        }).join('') + '</ol></div>').join('');

    /* ---- livros ---- */
    const RANK = { 'disponivel': 0, 'em-breve': 1, 'planejado': 2 };
    $('#books').innerHTML = CAT.slice().sort((a, b) => RANK[a.status] - RANK[b.status]).map(b => {
        const pr = progress(b);
        const req = (b.requires || []).map(id => byId(id).title);
        return '<' + (live(b) ? 'a href="' + b.path + '"' : 'div') + ' class="book-card c-' + b.color + (live(b) ? '' : ' soon') + '">' +
            '<div class="bk-top"><i class="fa-solid ' + b.icon + '"></i><span class="st st-' + b.status + '">' + LBL[b.status] + '</span></div>' +
            '<h3>' + b.title + '</h3><p>' + b.desc + '</p>' +
            '<div class="chips">' + b.topics.map(t => '<span>' + t + '</span>').join('') + '</div>' +
            (req.length ? '<small class="req"><i class="fa-solid fa-arrow-turn-up"></i> Antes: ' + req.join(', ') + '</small>' : '<small class="req"><i class="fa-solid fa-flag"></i> Ponto de partida</small>') +
            (pr ? '<div class="bk-prog"><div class="bar"><i style="width:' + pr.pct + '%"></i></div><span>' + pr.done + '/' + pr.total + ' capítulos</span></div>' : '') +
            '</' + (live(b) ? 'a' : 'div') + '>';
    }).join('');

    /* ---- mapa ---- */
    const map = $('#ecoMap');
    map.insertAdjacentHTML('beforeend', CAT.map(b =>
        '<' + (live(b) ? 'a href="' + b.path + '"' : 'div') + ' class="map-node c-' + b.color + (live(b) ? '' : ' soon') + '" data-id="' + b.id + '" style="grid-column:' + (b.col + 1) + ';grid-row:' + (b.row + 1) + '">' +
        '<i class="fa-solid ' + b.icon + '"></i><div><b>' + b.title + '</b><small>' + (live(b) ? b.short : LBL[b.status]) + '</small>' +
        ((b.requires || []).length ? '<small class="mreq"><i class="fa-solid fa-arrow-turn-up"></i> Antes: ' + b.requires.map(id => byId(id).title).join(', ') + '</small>' : '') +
        '</div></' + (live(b) ? 'a' : 'div') + '>').join(''));

    function drawEdges() {
        const svg = $('#ecoEdges'), box = map.getBoundingClientRect();
        svg.setAttribute('viewBox', '0 0 ' + box.width + ' ' + box.height);
        svg.setAttribute('width', box.width); svg.setAttribute('height', box.height);
        const vertical = getComputedStyle(map).gridTemplateColumns.split(' ').length === 1;
        if (vertical) { svg.innerHTML = ''; return; } // no celular, cada livro mostra "Antes: …"
        let paths = '<defs><marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="rgba(165,180,252,.85)"/></marker></defs>';
        CAT.forEach(b => (b.requires || []).forEach(rid => {
            const s = map.querySelector('[data-id="' + rid + '"]').getBoundingClientRect();
            const t = map.querySelector('[data-id="' + b.id + '"]').getBoundingClientRect();
            let d;
            if (vertical) {
                const x1 = s.left - box.left + 18, y1 = s.bottom - box.top, x2 = t.left - box.left + 18, y2 = t.top - box.top;
                const k = Math.max(20, (y2 - y1) / 2);
                d = 'M' + x1 + ',' + y1 + ' C' + (x1 - k) + ',' + (y1 + k) + ' ' + (x2 - k) + ',' + (y2 - k) + ' ' + x2 + ',' + (y2 - 2);
            } else {
                const x1 = s.right - box.left, y1 = s.top - box.top + s.height / 2, x2 = t.left - box.left, y2 = t.top - box.top + t.height / 2;
                const k = Math.max(30, (x2 - x1) / 2);
                d = 'M' + x1 + ',' + y1 + ' C' + (x1 + k) + ',' + y1 + ' ' + (x2 - k) + ',' + y2 + ' ' + (x2 - 3) + ',' + y2;
            }
            const dim = !(live(b) && live(byId(rid)));
            paths += '<path d="' + d + '" fill="none" stroke="' + (dim ? 'rgba(148,163,184,.35)' : 'rgba(165,180,252,.85)') + '" stroke-width="2"' + (dim ? ' stroke-dasharray="5 6"' : '') + ' marker-end="url(#arr)"/>';
        }));
        svg.innerHTML = paths;
    }
    if (window.ResizeObserver) new ResizeObserver(drawEdges).observe(map);
    window.addEventListener('load', drawEdges);
    drawEdges();
})();
