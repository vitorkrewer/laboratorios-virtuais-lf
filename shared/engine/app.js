/* Motor dos livros dos ecossistemas (Matemática, Física, ...). Compartilhado: shared/engine/.
   A área vem de MATH.area (definida no catalog.js de cada área).
   Monta o layout a partir de MATH.book (book.js de cada livro) e cuida de:
   roteador por hash, início, trilhas + diagnóstico, wiki em Markdown com busca,
   quizzes, progresso (localStorage) e abas dos simuladores (MATH.labs.init). */
(function () {
    'use strict';
    const B = window.MATH.book, MD = window.MATH.md, LABS = (window.MATH.labs && window.MATH.labs.init) || {};
    const CAT = window.MATH.catalog || [];
    const AREA = window.MATH.area || { name: 'Matemática', eco: 'Ecossistema de Matemática' };
    const $ = (s, r) => (r || document).querySelector(s);
    const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
    const chapter = id => B.chapters.find(c => c.id === id);
    const group = id => B.groups.find(g => g.id === id);
    const pathById = id => B.paths.find(p => p.id === id);
    const labInfo = id => (B.labs || []).find(l => l.id === id);
    const labName = id => (labInfo(id) || {}).name || 'Simulador';
    const esc = MD.esc;
    const norm = t => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

    /* ================= LAYOUT ================= */
    function buildShell() {
        const H = B.home;
        const hasLabs = (B.labs || []).length > 0;
        document.body.innerHTML =
            '<header class="topbar">' +
              '<a class="hub-link" href="../" title="Voltar à ' + esc(AREA.name) + '"><i class="fa-solid fa-arrow-left"></i><span>' + esc(AREA.name) + '</span></a>' +
              '<a class="brand" href="#/"><img src="../../assets/img/logo-learning-fly-simple.png" alt="Learning Fly"><div><strong>' + esc(B.title) + '</strong><span>' + esc(B.subtitle) + '</span></div></a>' +
              '<nav class="main-nav" id="mainNav" aria-label="Seções">' +
                '<a href="#/" data-view="home"><i class="fa-solid fa-house"></i><span>Início</span></a>' +
                '<a href="#/trilhas" data-view="trilhas"><i class="fa-solid fa-route"></i><span>Trilhas</span></a>' +
                '<a href="#/teoria" data-view="teoria"><i class="fa-solid fa-book-open"></i><span>Teoria</span></a>' +
                (hasLabs ? '<a href="#/lab" data-view="lab"><i class="fa-solid fa-flask"></i><span>Laboratório</span></a>' : '') +
                (window.MATH.gloss ? '<a href="../glossario/" title="Glossário de símbolos e termos"><i class="fa-solid fa-spell-check"></i><span>Glossário</span></a>' : '') +
              '</nav>' +
              '<div class="top-progress" title="Seu progresso nos capítulos"><div class="bar"><i id="topProgressBar"></i></div><span id="topProgressText">0%</span></div>' +
            '</header>' +
            '<main>' +
              /* início */
              '<section id="view-home" class="view">' +
                '<div class="hero"><div class="hero-copy">' +
                  '<span class="eyebrow"><i class="fa-solid ' + B.icon + '"></i> ' + esc(H.eyebrow) + '</span>' +
                  '<h1>' + H.titleHtml + '</h1><p>' + H.lead + '</p>' +
                  '<div class="cta-row"><a class="btn primary" href="#/trilhas"><i class="fa-solid fa-bolt"></i> Descobrir minha trilha</a>' +
                  '<a class="btn ghost" href="#/teoria"><i class="fa-solid fa-book-open"></i> Abrir a teoria</a></div>' +
                  '<div class="stats"><div><strong id="stat-chapters">0</strong><span>capítulos</span></div>' +
                  '<div><strong>' + (B.labs || []).length + '</strong><span>simuladores</span></div>' +
                  '<div><strong id="stat-paths">0</strong><span>trilhas</span></div>' +
                  '<div><strong>R$ 0</strong><span>gratuito</span></div></div>' +
                '</div><div class="hero-card" aria-hidden="true"><div class="formula-stack">' +
                  H.formulas.map(f => '<div class="fs-item"><small>' + esc(f.label) + '</small><span data-tex="' + esc(f.tex) + '" data-display="1"></span></div>').join('') +
                '</div></div></div>' +
                '<div id="resumeSlot"></div>' +
                '<section class="block"><div class="block-head"><span class="kicker">Como funciona</span><h2>Três passos para aprender de verdade</h2></div><div class="steps3">' +
                  '<a class="step-card" href="#/trilhas"><b>1</b><h3>Descubra seu ponto de partida</h3><p>Um diagnóstico curto aponta o que revisar e qual trilha seguir.</p></a>' +
                  '<a class="step-card" href="#/teoria"><b>2</b><h3>Estude com teoria focada</h3><p>Capítulos curtos com definições, exemplos resolvidos, teste rápido e exercícios com gabarito.</p></a>' +
                  '<a class="step-card" href="' + (hasLabs ? '#/lab' : '#/teoria') + '"><b>3</b><h3>Experimente no laboratório</h3><p>' + esc(H.labPitch || 'Mexa nos controles e veja o conceito acontecer.') + '</p></a>' +
                '</div></section>' +
                '<section class="block"><div class="block-head"><span class="kicker">' + esc(H.mapKicker) + '</span><h2>' + esc(H.mapTitle) + '</h2></div><div class="map-grid">' +
                  H.map.map(m => '<a class="map-card c-' + m.color + '" href="' + m.href + '"><i class="fa-solid ' + m.icon + '"></i><h3>' + esc(m.title) + '</h3><p>' + MD.inline(m.text) + '</p><span data-tex="' + esc(m.tex) + '"></span></a>').join('') +
                '</div></section>' +
                '<section class="block" id="ecoBlock"></section>' +
              '</section>' +
              /* trilhas */
              '<section id="view-trilhas" class="view" hidden>' +
                '<div class="page-head"><span class="kicker">Trilhas de aprendizagem</span><h1>O que você precisa aprender, na ordem certa</h1>' +
                '<p>Escolha a trilha conforme seu objetivo e o tempo que você tem. Cada etapa leva ao capítulo e ao simulador certos; seu progresso fica salvo neste navegador.</p></div>' +
                '<details class="diag" id="diag"><summary><i class="fa-solid fa-stethoscope"></i> Diagnóstico rápido <small>' + B.diagnostic.length + ' questões · descubra o que revisar</small></summary>' +
                '<form id="diagForm"></form><div id="diagResult" class="diag-result" hidden></div></details>' +
                '<div class="path-cards" id="pathCards"></div><div id="pathDetail" class="path-detail"></div>' +
              '</section>' +
              /* teoria */
              '<section id="view-teoria" class="view" hidden><div class="wiki">' +
                '<aside class="wiki-side" id="wikiSide"><div class="search-box"><i class="fa-solid fa-magnifying-glass"></i>' +
                '<input id="wikiSearch" type="search" placeholder="Buscar na teoria…" autocomplete="off" aria-label="Buscar na teoria"><kbd title="Atalho: tecla /">/</kbd></div>' +
                '<nav id="wikiNav"></nav><div id="wikiResults" hidden></div></aside>' +
                '<article class="wiki-main" id="wikiMain"><button class="side-toggle" id="sideToggle" type="button"><i class="fa-solid fa-list"></i> Índice</button><div id="article"></div></article>' +
                '<aside class="wiki-toc" id="wikiToc" aria-label="Nesta página"></aside>' +
              '</div></section>' +
              /* laboratório */
              (hasLabs ?
              '<section id="view-lab" class="view" hidden>' +
                '<div class="page-head"><span class="kicker">Laboratório interativo</span><h1>' + esc(B.labsIntro.title) + '</h1><p>' + esc(B.labsIntro.text) + '</p></div>' +
                '<div class="lab-tabs" id="labTabs" role="tablist">' + B.labs.map(l => '<button data-lab="' + l.id + '" role="tab" aria-selected="false"><i class="fa-solid ' + l.icon + '"></i> ' + esc(l.label) + '</button>').join('') + '</div>' +
                B.labs.map(l => '<div class="lab-panel" id="lab-' + l.id + '"></div>').join('') +
              '</section>' : '') +
            '</main>' +
            '<footer class="foot"><span>' + esc(B.title) + ' · <a href="../">' + esc(AREA.eco) + '</a> · <a href="../../">Learning Fly</a></span><span>Conteúdo aberto e gratuito. Fórmulas renderizadas com KaTeX.</span></footer>';
        renderTexIn($('#view-home'));
        renderEco();
        $$('#labTabs button').forEach(b => b.addEventListener('click', () => { location.hash = '#/lab/' + b.dataset.lab; }));
    }

    /* Livros relacionados (pré-requisitos e próximos), a partir do catálogo. */
    function renderEco() {
        const me = CAT.find(b => b.id === B.id);
        if (!me) return;
        const card = b => {
            const live = b.status === 'disponivel';
            return '<' + (live ? 'a href="../' + b.path + '"' : 'div') + ' class="eco-card c-' + b.color + (live ? '' : ' soon') + '">' +
                '<i class="fa-solid ' + b.icon + '"></i><div><b>' + esc(b.title) + '</b><small>' + (live ? esc(b.short) : 'Em breve') + '</small></div></' + (live ? 'a' : 'div') + '>';
        };
        const pre = (me.requires || []).map(id => CAT.find(b => b.id === id)).filter(Boolean);
        const nxt = CAT.filter(b => (b.requires || []).includes(B.id));
        const ext = me.ext || [];
        if (!pre.length && !nxt.length && !ext.length) return;
        $('#ecoBlock').innerHTML = '<div class="block-head"><span class="kicker">' + esc(AREA.eco) + '</span><h2>Onde este livro se encaixa</h2></div><div class="eco-row">' +
            (pre.length ? '<div class="eco-col"><h3><i class="fa-solid fa-arrow-turn-up"></i> Antes deste livro</h3>' + pre.map(card).join('') + '</div>' : '') +
            (nxt.length ? '<div class="eco-col"><h3><i class="fa-solid fa-arrow-turn-down"></i> Depois deste livro</h3>' + nxt.map(card).join('') + '</div>' : '') +
            (ext.length ? '<div class="eco-col"><h3><i class="fa-solid fa-square-root-variable"></i> Matemática que ajuda</h3>' + ext.map(x => '<a href="../' + x.href + '" class="eco-card c-' + (x.color || 'sky') + '"><i class="fa-solid ' + (x.icon || 'fa-book') + '"></i><div><b>' + esc(x.title) + '</b><small>' + esc(x.short || '') + '</small></div></a>').join('') + '</div>' : '') +
            '<div class="eco-col"><h3><i class="fa-solid fa-diagram-project"></i> Mapa completo</h3><a class="eco-card c-indigo" href="../#mapa"><i class="fa-solid fa-map"></i><div><b>Mapa de pré-requisitos</b><small>Todos os livros e rotas</small></div></a></div></div>';
    }

    /* ================= PROGRESSO ================= */
    const KEY = B.storage + '.progress.v1', QKEY = B.storage + '.quiz.v1', LKEY = B.storage + '.last.v1';
    function load(k) { try { return JSON.parse(localStorage.getItem(k)) || {}; } catch (e) { return {}; } }
    function store(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* ignora */ } }
    const progress = load(KEY), quiz = load(QKEY);
    let last = load(LKEY);
    const isDone = id => !!progress[id];
    function toggleDone(id) { if (progress[id]) delete progress[id]; else progress[id] = Date.now(); store(KEY, progress); updateTopProgress(); }
    function quizBadge(id) {
        const q = quiz[id];
        if (!q) return '';
        return '<span class="badge-quiz' + (q.best / q.total >= 0.7 ? ' good' : '') + '" title="Melhor resultado no teste rápido"><i class="fa-solid fa-list-check"></i> ' + q.best + '/' + q.total + '</span>';
    }
    function updateTopProgress() {
        const done = B.chapters.filter(c => isDone(c.id)).length;
        $('#topProgressBar').style.width = Math.round(done / B.chapters.length * 100) + '%';
        $('#topProgressText').textContent = done + '/' + B.chapters.length;
    }
    function renderTexIn(root) {
        $$('[data-tex]', root).forEach(el => { el.innerHTML = MD.tex(el.getAttribute('data-tex'), el.getAttribute('data-display') === '1'); });
    }

    /* ================= ROTEADOR ================= */
    const VIEWS = ['home', 'trilhas', 'teoria', 'lab'];
    let lastKey = '', lastShown = '';
    function scrollToSection(id) {
        const t = document.getElementById(id);
        if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    function route() {
        const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
        let view = VIEWS.includes(parts[0]) ? parts[0] : 'home';
        if (view === 'lab' && !$('#view-lab')) view = 'home';
        const arg = parts[1] || '', sub = parts[2] || '';
        VIEWS.forEach(v => { const el = $('#view-' + v); if (el) el.hidden = v !== view; });
        $$('#mainNav a').forEach(a => a.classList.toggle('active', a.dataset.view === view));
        const key = view + '/' + arg;
        if (key !== lastKey && !sub) window.scrollTo(0, 0);
        lastKey = key;
        if (view !== 'teoria') lastShown = '';
        if (view === 'home') renderHome();
        else if (view === 'trilhas') renderTrilhas(arg);
        else if (view === 'teoria') { if ('teoria/' + arg === lastShown && sub) scrollToSection(sub); else renderTeoria(arg, sub); }
        else showLab(arg);
        document.title = (view === 'teoria' && chapter(arg) ? chapter(arg).title + ' · ' : '') + B.title + ' | Learning Fly';
    }

    /* ================= INÍCIO ================= */
    function renderHome() {
        $('#stat-chapters').textContent = B.chapters.length;
        $('#stat-paths').textContent = B.paths.length;
        const ch = last.id && chapter(last.id);
        const next = (() => { const i = ch ? B.chapters.indexOf(ch) : -1; return ch && isDone(ch.id) && B.chapters[i + 1] ? B.chapters[i + 1] : ch; })();
        $('#resumeSlot').innerHTML = next
            ? '<a class="resume" href="#/teoria/' + next.id + '"><i class="fa-solid fa-book-open-reader"></i><div><small>' + (next === ch ? 'Continue de onde parou' : 'Próximo capítulo') + '</small><b>' + esc(next.title) + '</b></div>' +
              '<span class="go">' + B.chapters.filter(c => isDone(c.id)).length + '/' + B.chapters.length + ' concluídos <i class="fa-solid fa-arrow-right"></i></span></a>'
            : '';
    }

    /* ================= TRILHAS ================= */
    let diagBuilt = false;
    function buildDiagnostic() {
        if (diagBuilt) return;
        diagBuilt = true;
        const form = $('#diagForm');
        form.innerHTML = B.diagnostic.map((q, i) =>
            '<fieldset class="dq"><legend><b>' + (i + 1) + '.</b> ' + MD.inline(q.q) + '</legend>' +
            q.opts.map((o, j) => '<label><input type="radio" name="q' + i + '" value="' + j + '"><span>' + MD.inline(o) + '</span></label>').join('') +
            '</fieldset>').join('') +
            '<div class="dq-actions"><button class="btn primary" type="submit"><i class="fa-solid fa-check"></i> Ver resultado</button>' +
            '<button class="btn ghost" type="reset">Limpar</button></div>';
        form.addEventListener('submit', e => { e.preventDefault(); gradeDiagnostic(); });
        form.addEventListener('reset', () => { $('#diagResult').hidden = true; });
    }
    function gradeDiagnostic() {
        const form = $('#diagForm');
        let score = 0, answered = 0;
        const review = [];
        B.diagnostic.forEach((q, i) => {
            const sel = form.querySelector('input[name="q' + i + '"]:checked');
            if (sel) answered++;
            if (sel && +sel.value === q.correct) score++; else review.push(q.chapter);
        });
        const res = $('#diagResult'), total = B.diagnostic.length;
        res.hidden = false;
        if (answered < total) {
            res.innerHTML = '<p><i class="fa-solid fa-circle-info"></i> Responda todas as ' + total + ' questões para ver o resultado. Faltam ' + (total - answered) + '.</p>';
            return;
        }
        const needs = [...new Set(review)];
        const r = B.recommend(score, total, needs);
        const p = pathById(r.path);
        res.innerHTML =
            '<div class="score"><strong>' + score + '/' + total + '</strong><span>acertos</span></div>' +
            '<div class="score-body"><p>' + r.msg + '</p>' +
            (needs.length ? '<p class="small">Revise primeiro: ' + needs.map(id => '<a href="#/teoria/' + id + '">' + esc(chapter(id).title) + '</a>').join(' · ') + '</p>' : '<p class="small">Você acertou tudo. Use as trilhas para consolidar e os exercícios para treinar.</p>') +
            (r.extra || '') +
            '<a class="btn primary" href="#/trilhas/' + p.id + '"><i class="fa-solid fa-route"></i> Trilha sugerida: ' + esc(p.title) + '</a></div>';
        res.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    function pathProgress(p) {
        const ids = [...new Set(p.steps.map(s => s.chapter))];
        const done = ids.filter(isDone).length;
        return { done, total: ids.length, pct: Math.round(done / ids.length * 100) };
    }
    function renderTrilhas(id) {
        buildDiagnostic();
        const sel = pathById(id) ? id : (renderTrilhas.last || B.paths[0].id);
        renderTrilhas.last = sel;
        $('#pathCards').innerHTML = B.paths.map(p => {
            const pr = pathProgress(p);
            return '<a class="path-card pc-' + p.color + (p.id === sel ? ' active' : '') + '" href="#/trilhas/' + p.id + '">' +
                '<i class="fa-solid ' + p.icon + '"></i><h3>' + esc(p.title) + '</h3><small>' + esc(p.duration) + '</small><p>' + esc(p.audience) + '</p>' +
                '<div class="bar"><i style="width:' + pr.pct + '%"></i></div><span class="pc-prog">' + pr.done + ' de ' + pr.total + ' capítulos</span></a>';
        }).join('');
        const p = pathById(sel), pr = pathProgress(p);
        const minutes = [...new Set(p.steps.map(s => s.chapter))].reduce((a, c) => a + chapter(c).minutes, 0);
        $('#pathDetail').innerHTML =
            '<div class="pd-head"><div><h2>' + esc(p.title) + '</h2><p>' + esc(p.audience) + '</p></div>' +
            '<div class="pd-meta"><span><i class="fa-regular fa-clock"></i> ~' + String(Math.round(minutes / 60 * 10) / 10).replace('.', ',') + ' h de leitura</span><span><i class="fa-solid fa-check"></i> ' + pr.pct + '% concluído</span></div></div>' +
            '<ol class="timeline">' + p.steps.map(s => {
                const ch = chapter(s.chapter), done = isDone(s.chapter);
                return '<li class="' + (done ? 'done' : '') + '"><div class="tl-day">' + esc(s.day) + '</div><div class="tl-card">' +
                    '<div class="tl-top"><a class="tl-title" href="#/teoria/' + ch.id + '">' + esc(ch.title) + '</a><small>' + quizBadge(ch.id) + ' ' + ch.minutes + ' min</small></div>' +
                    '<p>' + MD.inline(s.task) + '</p><div class="tl-actions">' +
                    '<a class="chip" href="#/teoria/' + ch.id + '"><i class="fa-solid fa-book-open"></i> Ler</a>' +
                    (s.lab ? '<a class="chip lab" href="#/lab/' + s.lab + '"><i class="fa-solid fa-flask"></i> ' + esc(labName(s.lab)) + '</a>' : '') +
                    '<button class="chip check" data-ch="' + ch.id + '" type="button"><i class="fa-solid ' + (done ? 'fa-circle-check' : 'fa-circle') + '"></i> ' + (done ? 'Concluído' : 'Marcar como concluído') + '</button>' +
                    '</div></div></li>';
            }).join('') + '</ol>';
        $$('#pathDetail .check').forEach(b => b.addEventListener('click', () => { toggleDone(b.dataset.ch); renderTrilhas(sel); }));
    }

    /* ================= TEORIA ================= */
    let wikiBuilt = false, searchIndex = null;
    function buildWikiNav() {
        $('#wikiNav').innerHTML = B.groups.map(g => {
            const items = B.chapters.filter(c => c.group === g.id);
            return '<div class="nav-group"><div class="ng-title"><i class="fa-solid ' + g.icon + '"></i> ' + esc(g.title) + '</div>' +
                items.map(c => '<a href="#/teoria/' + c.id + '" data-id="' + c.id + '"><span class="dot"></span>' + esc(c.title) + '</a>').join('') + '</div>';
        }).join('');
        $('#sideToggle').addEventListener('click', () => $('#wikiSide').classList.toggle('open'));
        $('#wikiNav').addEventListener('click', () => $('#wikiSide').classList.remove('open'));
        const input = $('#wikiSearch');
        let timer;
        input.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(() => runSearch(input.value), 180); });
    }
    function markNav(activeId) {
        $$('#wikiNav a').forEach(a => { a.classList.toggle('active', a.dataset.id === activeId); a.classList.toggle('done', isDone(a.dataset.id)); });
    }
    async function runSearch(q) {
        const box = $('#wikiResults'), nav = $('#wikiNav');
        q = norm(q.trim());
        if (q.length < 2) { box.hidden = true; nav.hidden = false; return; }
        nav.hidden = true; box.hidden = false;
        box.innerHTML = '<p class="muted-p">Buscando…</p>';
        try {
            if (!searchIndex) {
                searchIndex = await Promise.all(B.chapters.map(async c => {
                    const text = MD.plain(await MD.fetchText(c.file));
                    return { c, text, hay: norm(c.title + ' ' + text) };
                }));
            }
        } catch (e) { box.innerHTML = '<p class="muted-p">Não foi possível carregar o índice de busca.</p>'; return; }
        const toks = q.split(/\s+/);
        const hits = searchIndex.map(({ c, text, hay }) => {
            if (!toks.every(t => hay.includes(t))) return null;
            const pos = norm(text).indexOf(toks[0]);
            const snip = pos >= 0 ? (pos > 50 ? '…' : '') + text.slice(Math.max(0, pos - 50), pos + 110) + '…' : c.summary;
            const score = (norm(c.title).includes(toks[0]) ? 10 : 0) + (hay.split(toks[0]).length - 1);
            return { c, snip, score };
        }).filter(Boolean).sort((a, b) => b.score - a.score);
        box.innerHTML = hits.length
            ? hits.map(h => '<a class="res" href="#/teoria/' + h.c.id + '"><b>' + esc(h.c.title) + '</b><span>' + esc(h.snip) + '</span></a>').join('')
            : '<p class="muted-p">Nada encontrado para “' + esc(q) + '”.</p>';
        box.onclick = () => { $('#wikiSide').classList.remove('open'); };
    }
    function wikiIndexHtml() {
        return '<div class="wiki-index"><span class="kicker">Teoria gratuita</span><h1>' + esc(B.wikiTitle) + '</h1>' +
            '<p>Capítulos curtos e focados, no estilo wiki. Use o índice à esquerda, a busca ou comece por aqui. Cada capítulo traz definições, exemplos resolvidos, teste rápido e exercícios com gabarito.</p>' +
            B.groups.map(g => '<h2><i class="fa-solid ' + g.icon + '"></i> ' + esc(g.title) + '</h2><div class="idx-grid">' +
                B.chapters.filter(c => c.group === g.id).map(c =>
                    '<a class="idx-card" href="#/teoria/' + c.id + '"><div class="ic-top"><b>' + esc(c.title) + '</b>' + (isDone(c.id) ? '<i class="fa-solid fa-circle-check ok"></i>' : '') + '</div><p>' + esc(c.summary) + '</p><small>' + c.minutes + ' min' + (c.lab ? ' · com simulador' : '') + '</small> ' + quizBadge(c.id) + '</a>').join('') +
                '</div>').join('') + '</div>';
    }
    async function renderTeoria(id, sub) {
        if (!wikiBuilt) { wikiBuilt = true; buildWikiNav(); }
        markNav(id);
        const art = $('#article'), toc = $('#wikiToc');
        const ch = chapter(id);
        if (!id || !ch) { art.innerHTML = wikiIndexHtml(); toc.innerHTML = ''; return; }
        art.innerHTML = '<div class="loading"><i class="fa-solid fa-spinner fa-spin"></i> Carregando capítulo…</div>';
        toc.innerHTML = '';
        let md;
        try { md = await MD.fetchText(ch.file); }
        catch (e) {
            const local = location.protocol === 'file:';
            art.innerHTML = '<div class="error-box"><h2><i class="fa-solid fa-triangle-exclamation"></i> Não foi possível carregar o capítulo</h2>' +
                (local ? '<p>Você abriu o arquivo direto do disco (<code>file://</code>) e o navegador bloqueia a leitura dos arquivos Markdown. Sirva a pasta do repositório com um servidor local:</p><pre><code>python -m http.server 8000</code></pre><p>Depois acesse <code>http://localhost:8000/matematica/</code>. No GitHub Pages isso funciona normalmente.</p>'
                       : '<p>' + esc(e.message) + '</p>') + '</div>';
            return;
        }
        if (location.hash.indexOf('/teoria/' + id) < 0) return;
        last = { id, t: Date.now() }; store(LKEY, last);
        lastShown = 'teoria/' + id;
        const g = group(ch.group), idx = B.chapters.indexOf(ch);
        const prev = B.chapters[idx - 1], next = B.chapters[idx + 1];
        art.innerHTML =
            '<div class="crumbs"><a href="#/teoria">Teoria</a> <i class="fa-solid fa-angle-right"></i> <span>' + esc(g.title) + '</span></div>' +
            '<div class="meta"><span><i class="fa-regular fa-clock"></i> ' + ch.minutes + ' min</span>' +
            (ch.lab ? '<a href="#/lab/' + ch.lab + '"><i class="fa-solid fa-flask"></i> ' + esc(labName(ch.lab)) + '</a>' : '') + '</div>' +
            '<div class="prose" id="prose">' + MD.render(md) + '</div>' +
            '<div class="chapter-foot">' +
            '<button class="btn ' + (isDone(id) ? 'done' : 'primary') + '" id="doneBtn" type="button"><i class="fa-solid ' + (isDone(id) ? 'fa-circle-check' : 'fa-check') + '"></i> ' + (isDone(id) ? 'Capítulo concluído' : 'Marcar como concluído') + '</button>' +
            '<div class="pn">' +
            (prev ? '<a href="#/teoria/' + prev.id + '"><small><i class="fa-solid fa-arrow-left"></i> Anterior</small><b>' + esc(prev.title) + '</b></a>' : '<span></span>') +
            (next ? '<a class="next" href="#/teoria/' + next.id + '"><small>Próximo <i class="fa-solid fa-arrow-right"></i></small><b>' + esc(next.title) + '</b></a>' : '<span></span>') +
            '</div></div>';
        const sections = MD.enhance($('#prose'));
        if (window.MATH.gloss) {
            const h1 = $('#prose h1'), box = window.MATH.gloss.chapterBox(md);
            if (h1 && box) { h1.insertAdjacentHTML('afterend', box); window.MATH.gloss.wireBox($('#prose .g-box')); }
        }
        sections.forEach(sec => {
            const h = document.getElementById(sec.id);
            if (h) h.insertAdjacentHTML('beforeend', '<a class="sec-link" href="#/teoria/' + id + '/' + sec.id + '" title="Link para esta seção" aria-label="Link para esta seção">#</a>');
        });
        $('#prose').addEventListener('quizdone', e => {
            const { right, total } = e.detail;
            const prevQ = quiz[id];
            if (!prevQ || right > prevQ.best || prevQ.total !== total) quiz[id] = { best: right, total, t: Date.now() };
            store(QKEY, quiz);
            if (right / total >= 0.7 && !isDone(id)) {
                toggleDone(id); markNav(id);
                const b = $('#doneBtn'); b.className = 'btn done'; b.innerHTML = '<i class="fa-solid fa-circle-check"></i> Capítulo concluído';
                e.target.insertAdjacentHTML('beforeend', '<div class="qz-auto"><i class="fa-solid fa-circle-check"></i> Capítulo marcado como concluído no seu progresso.</div>');
            }
        });
        toc.innerHTML = sections.length
            ? '<div class="toc-title">Nesta página</div>' + sections.map(s => '<a href="#" data-id="' + s.id + '" class="l' + s.level + '">' + esc(s.text) + '</a>').join('') +
              (ch.lab ? '<a class="toc-lab" href="#/lab/' + ch.lab + '"><i class="fa-solid fa-flask"></i> Abrir simulador</a>' : '')
            : '';
        $$('a[data-id]', toc).forEach(a => a.addEventListener('click', e => {
            e.preventDefault();
            const t = document.getElementById(a.dataset.id);
            if (t) { t.scrollIntoView({ behavior: 'smooth', block: 'start' }); history.replaceState(null, '', '#/teoria/' + id + '/' + a.dataset.id); }
        }));
        $('#doneBtn').addEventListener('click', () => { toggleDone(id); markNav(id); renderTeoria(id); });
        setupScrollSpy(sections);
        if (sub) setTimeout(() => scrollToSection(sub), 60);
    }
    let spyHandler = null;
    function setupScrollSpy(sections) {
        if (spyHandler) window.removeEventListener('scroll', spyHandler);
        if (!sections.length) return;
        spyHandler = function () {
            if (location.hash.indexOf('#/teoria/') !== 0) return;
            let cur = sections[0].id;
            for (const s of sections) { const el = document.getElementById(s.id); if (el && el.getBoundingClientRect().top < 140) cur = s.id; }
            $$('#wikiToc a[data-id]').forEach(a => a.classList.toggle('active', a.dataset.id === cur));
        };
        window.addEventListener('scroll', spyHandler, { passive: true });
        spyHandler();
    }

    /* ================= LABORATÓRIO ================= */
    const labDraws = {};
    function showLab(id) {
        if (!labInfo(id)) id = B.labs[0].id;
        $$('#labTabs button').forEach(b => { b.classList.toggle('active', b.dataset.lab === id); b.setAttribute('aria-selected', String(b.dataset.lab === id)); });
        $$('.lab-panel').forEach(p => p.classList.toggle('active', p.id === 'lab-' + id));
        if (!labDraws[id] && LABS[id]) labDraws[id] = LABS[id](document.getElementById('lab-' + id)) || (() => {});
        if (labDraws[id]) requestAnimationFrame(() => labDraws[id]());
    }

    /* ================= INICIALIZAÇÃO ================= */
    buildShell();
    document.addEventListener('keydown', e => {
        if (e.key !== '/' || e.ctrlKey || e.metaKey || /input|textarea|select/i.test(document.activeElement.tagName)) return;
        e.preventDefault();
        if (location.hash.indexOf('#/teoria') !== 0) location.hash = '#/teoria';
        setTimeout(() => { $('#wikiSide').classList.add('open'); $('#wikiSearch').focus(); }, 50);
    });
    window.addEventListener('hashchange', route);
    updateTopProgress();
    route();
})();
