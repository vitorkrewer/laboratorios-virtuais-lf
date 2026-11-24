/* Aplicação: roteador por hash, trilhas, wiki em Markdown, diagnóstico e progresso. */
(function () {
    'use strict';
    const C = window.CALC;
    const $ = (s, r) => (r || document).querySelector(s);
    const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
    const chapter = id => C.chapters.find(c => c.id === id);
    const group = id => C.groups.find(g => g.id === id);
    const pathById = id => C.paths.find(p => p.id === id);
    const LAB_NAMES = { limites: 'Simulador de limites', derivada: 'Simulador de derivada', integral: 'Simulador de integral' };

    /* ---------------- progresso (localStorage, com fallback em memória) ---------------- */
    const KEY = 'calc1lab.progress.v1';
    let progress = {};
    try { progress = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { progress = {}; }
    function save() { try { localStorage.setItem(KEY, JSON.stringify(progress)); } catch (e) { /* ignora */ } }
    const isDone = id => !!progress[id];
    function toggleDone(id) { if (progress[id]) delete progress[id]; else progress[id] = Date.now(); save(); updateTopProgress(); }
    const QKEY = 'calc1lab.quiz.v1', LKEY = 'calc1lab.last.v1';
    function load(k) { try { return JSON.parse(localStorage.getItem(k)) || {}; } catch (e) { return {}; } }
    function store(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* ignora */ } }
    const quiz = load(QKEY);
    let last = load(LKEY);
    function quizBadge(id) {
        const q = quiz[id];
        if (!q) return '';
        return '<span class="badge-quiz' + (q.best / q.total >= 0.7 ? ' good' : '') + '" title="Melhor resultado no teste rápido"><i class="fa-solid fa-list-check"></i> ' + q.best + '/' + q.total + '</span>';
    }
    const norm = t => t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

    function updateTopProgress() {
        const done = C.chapters.filter(c => isDone(c.id)).length;
        const pct = Math.round(done / C.chapters.length * 100);
        $('#topProgressBar').style.width = pct + '%';
        $('#topProgressText').textContent = done + '/' + C.chapters.length;
    }

    function renderTexIn(root) {
        $$('[data-tex]', root).forEach(el => { el.innerHTML = C.md.tex(el.getAttribute('data-tex'), el.getAttribute('data-display') === '1'); });
    }

    /* ---------------- roteador ---------------- */
    const VIEWS = ['home', 'trilhas', 'teoria', 'lab'];
    let lastKey = '', lastShown = '';
    function scrollToSection(id) {
        const t = document.getElementById(id);
        if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function route() {
        const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
        const view = VIEWS.includes(parts[0]) ? parts[0] : 'home';
        const arg = parts[1] || '';
        const sub = parts[2] || '';
        VIEWS.forEach(v => { $('#view-' + v).hidden = v !== view; });
        $$('#mainNav a').forEach(a => a.classList.toggle('active', a.dataset.view === view));
        const key = view + '/' + arg;
        if (key !== lastKey && !sub) window.scrollTo(0, 0);
        lastKey = key;
        if (view !== 'teoria') lastShown = '';
        if (view === 'home') renderHome();
        else if (view === 'trilhas') renderTrilhas(arg);
        else if (view === 'teoria') { if ('teoria/' + arg === lastShown && sub) scrollToSection(sub); else renderTeoria(arg, sub); }
        else C.labs.show(arg);
        document.title = (view === 'teoria' && chapter(arg) ? chapter(arg).title + ' · ' : '') + 'Cálculo I Lab | Learning Fly';
    }

    /* ---------------- INÍCIO ---------------- */
    let homeDone = false;
    function renderHome() {
        $('#stat-chapters').textContent = C.chapters.length;
        $('#stat-paths').textContent = C.paths.length;
        const ch = last.id && chapter(last.id);
        const next = (() => { const i = ch ? C.chapters.indexOf(ch) : -1; return ch && isDone(ch.id) && C.chapters[i + 1] ? C.chapters[i + 1] : ch; })();
        $('#resumeSlot').innerHTML = next
            ? '<a class="resume" href="#/teoria/' + next.id + '"><i class="fa-solid fa-book-open-reader"></i><div><small>' + (next === ch ? 'Continue de onde parou' : 'Próximo capítulo') + '</small><b>' + next.title + '</b></div>' +
              '<span class="go">' + C.chapters.filter(c => isDone(c.id)).length + '/' + C.chapters.length + ' concluídos <i class="fa-solid fa-arrow-right"></i></span></a>'
            : '';
        if (homeDone) return;
        homeDone = true;
        renderTexIn($('#view-home'));
        $$('.map-card p').forEach(p => { p.innerHTML = C.md.inline(p.textContent); });
    }

    /* ---------------- TRILHAS ---------------- */
    let diagBuilt = false;

    function buildDiagnostic() {
        if (diagBuilt) return;
        diagBuilt = true;
        const form = $('#diagForm');
        form.innerHTML = C.diagnostic.map((q, i) =>
            '<fieldset class="dq"><legend><b>' + (i + 1) + '.</b> ' + C.md.inline(q.q) + '</legend>' +
            q.opts.map((o, j) => '<label><input type="radio" name="q' + i + '" value="' + j + '"><span>' + C.md.inline(o) + '</span></label>').join('') +
            '</fieldset>').join('') +
            '<div class="dq-actions"><button class="btn primary" type="submit"><i class="fa-solid fa-check"></i> Ver resultado</button>' +
            '<button class="btn ghost" type="reset" id="diagReset">Limpar</button></div>';
        form.addEventListener('submit', e => { e.preventDefault(); gradeDiagnostic(); });
        form.addEventListener('reset', () => { $('#diagResult').hidden = true; });
    }

    function gradeDiagnostic() {
        const form = $('#diagForm');
        let score = 0, answered = 0;
        const review = [];
        C.diagnostic.forEach((q, i) => {
            const sel = form.querySelector('input[name="q' + i + '"]:checked');
            if (sel) answered++;
            if (sel && +sel.value === q.correct) score++; else review.push(q.chapter);
        });
        const res = $('#diagResult');
        if (answered < C.diagnostic.length) {
            res.hidden = false;
            res.innerHTML = '<p><i class="fa-solid fa-circle-info"></i> Responda todas as ' + C.diagnostic.length + ' questões para ver o resultado. Faltam ' + (C.diagnostic.length - answered) + '.</p>';
            return;
        }
        const total = C.diagnostic.length;
        const needs = [...new Set(review)];
        let rec = 'resgate-7', msg;
        if (score <= 3) { rec = 'base-30'; msg = 'Sua base ainda precisa de reforço. Comece pelo pré-cálculo com calma.'; }
        else if (score <= 5) { rec = needs.includes('integral-definida') && needs.length === 1 ? 'p2-10' : 'resgate-7'; msg = 'Você tem uma boa base, mas há lacunas importantes para fechar.'; }
        else { rec = needs.includes('integral-definida') ? 'p2-10' : 'resgate-7'; msg = 'Ótimo desempenho! Foque nos pontos que ainda escaparam e treine bastante.'; }
        const p = pathById(rec);
        res.hidden = false;
        res.innerHTML =
            '<div class="score"><strong>' + score + '/' + total + '</strong><span>acertos</span></div>' +
            '<div class="score-body"><p>' + msg + '</p>' +
            (needs.length ? '<p class="small">Revise primeiro: ' + needs.map(id => '<a href="#/teoria/' + id + '">' + chapter(id).title + '</a>').join(' · ') + '</p>' : '<p class="small">Você acertou tudo. Use as trilhas para consolidar e os exercícios para treinar.</p>') +
            '<a class="btn primary" href="#/trilhas/' + p.id + '"><i class="fa-solid fa-route"></i> Trilha sugerida: ' + p.title + '</a></div>';
        res.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function pathProgress(p) {
        const ids = [...new Set(p.steps.map(s => s.chapter))];
        const done = ids.filter(isDone).length;
        return { done, total: ids.length, pct: Math.round(done / ids.length * 100) };
    }

    function renderTrilhas(id) {
        buildDiagnostic();
        const sel = pathById(id) ? id : (renderTrilhas.last || 'resgate-7');
        renderTrilhas.last = sel;
        $('#pathCards').innerHTML = C.paths.map(p => {
            const pr = pathProgress(p);
            return '<a class="path-card pc-' + p.color + (p.id === sel ? ' active' : '') + '" href="#/trilhas/' + p.id + '">' +
                '<i class="fa-solid ' + p.icon + '"></i><h3>' + p.title + '</h3><small>' + p.duration + '</small><p>' + p.audience + '</p>' +
                '<div class="bar"><i style="width:' + pr.pct + '%"></i></div><span class="pc-prog">' + pr.done + ' de ' + pr.total + ' capítulos</span></a>';
        }).join('');

        const p = pathById(sel), pr = pathProgress(p);
        const minutes = [...new Set(p.steps.map(s => s.chapter))].reduce((a, c) => a + chapter(c).minutes, 0);
        $('#pathDetail').innerHTML =
            '<div class="pd-head"><div><h2>' + p.title + '</h2><p>' + p.audience + '</p></div>' +
            '<div class="pd-meta"><span><i class="fa-regular fa-clock"></i> ~' + String(Math.round(minutes / 60 * 10) / 10).replace('.', ',') + ' h de leitura</span><span><i class="fa-solid fa-check"></i> ' + pr.pct + '% concluído</span></div></div>' +
            '<ol class="timeline">' + p.steps.map((s, i) => {
                const ch = chapter(s.chapter), done = isDone(s.chapter);
                return '<li class="' + (done ? 'done' : '') + '"><div class="tl-day">' + s.day + '</div><div class="tl-card">' +
                    '<div class="tl-top"><a class="tl-title" href="#/teoria/' + ch.id + '">' + ch.title + '</a><small>' + quizBadge(ch.id) + ' ' + ch.minutes + ' min</small></div>' +
                    '<p>' + s.task + '</p><div class="tl-actions">' +
                    '<a class="chip" href="#/teoria/' + ch.id + '"><i class="fa-solid fa-book-open"></i> Ler</a>' +
                    (s.lab ? '<a class="chip lab" href="#/lab/' + s.lab + '"><i class="fa-solid fa-flask"></i> ' + LAB_NAMES[s.lab] + '</a>' : '') +
                    '<button class="chip check" data-ch="' + ch.id + '" type="button"><i class="fa-solid ' + (done ? 'fa-circle-check' : 'fa-circle') + '"></i> ' + (done ? 'Concluído' : 'Marcar como concluído') + '</button>' +
                    '</div></div></li>';
            }).join('') + '</ol>';
        $$('#pathDetail .check').forEach(b => b.addEventListener('click', () => { toggleDone(b.dataset.ch); renderTrilhas(sel); }));
    }

    /* ---------------- TEORIA ---------------- */
    let wikiBuilt = false;
    let searchIndex = null;

    function buildWikiNav() {
        $('#wikiNav').innerHTML = C.groups.map(g => {
            const items = C.chapters.filter(c => c.group === g.id);
            return '<div class="nav-group"><div class="ng-title"><i class="fa-solid ' + g.icon + '"></i> ' + g.title + '</div>' +
                items.map(c => '<a href="#/teoria/' + c.id + '" data-id="' + c.id + '"><span class="dot"></span>' + c.title + '</a>').join('') + '</div>';
        }).join('');
        $('#sideToggle').addEventListener('click', () => $('#wikiSide').classList.toggle('open'));
        $('#wikiNav').addEventListener('click', () => $('#wikiSide').classList.remove('open'));
        const input = $('#wikiSearch');
        let timer;
        input.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(() => runSearch(input.value), 180); });
    }

    function markNav(activeId) {
        $$('#wikiNav a').forEach(a => {
            a.classList.toggle('active', a.dataset.id === activeId);
            a.classList.toggle('done', isDone(a.dataset.id));
        });
    }

    async function runSearch(q) {
        const box = $('#wikiResults'), nav = $('#wikiNav');
        q = norm(q.trim());
        if (q.length < 2) { box.hidden = true; nav.hidden = false; return; }
        nav.hidden = true; box.hidden = false;
        box.innerHTML = '<p class="muted-p">Buscando…</p>';
        try {
            if (!searchIndex) {
                searchIndex = await Promise.all(C.chapters.map(async c => {
                    const md = await C.md.fetchText(c.file);
                    const text = C.md.plain(md);
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
            ? hits.map(h => '<a class="res" href="#/teoria/' + h.c.id + '"><b>' + C.md.esc(h.c.title) + '</b><span>' + C.md.esc(h.snip) + '</span></a>').join('')
            : '<p class="muted-p">Nada encontrado para “' + C.md.esc(q) + '”.</p>';
        box.onclick = () => { $('#wikiSide').classList.remove('open'); };
    }

    function wikiIndexHtml() {
        return '<div class="wiki-index"><span class="kicker">Teoria gratuita</span><h1>Wiki de Cálculo I</h1>' +
            '<p>Capítulos curtos e focados, no estilo wiki. Use o índice à esquerda, a busca ou comece por aqui. Cada capítulo traz definições, exemplos resolvidos e exercícios com gabarito.</p>' +
            C.groups.map(g => '<h2><i class="fa-solid ' + g.icon + '"></i> ' + g.title + '</h2><div class="idx-grid">' +
                C.chapters.filter(c => c.group === g.id).map(c =>
                    '<a class="idx-card" href="#/teoria/' + c.id + '"><div class="ic-top"><b>' + c.title + '</b>' + (isDone(c.id) ? '<i class="fa-solid fa-circle-check ok"></i>' : '') + '</div><p>' + c.summary + '</p><small>' + c.minutes + ' min' + (c.lab ? ' · com simulador' : '') + '</small> ' + quizBadge(c.id) + '</a>').join('') +
                '</div>').join('') + '</div>';
    }

    async function renderTeoria(id, sub) {
        if (!wikiBuilt) { wikiBuilt = true; buildWikiNav(); }
        markNav(id);
        const art = $('#article'), toc = $('#wikiToc');
        const ch = chapter(id);
        if (!id || !ch) {
            art.innerHTML = wikiIndexHtml(); toc.innerHTML = '';
            return;
        }
        art.innerHTML = '<div class="loading"><i class="fa-solid fa-spinner fa-spin"></i> Carregando capítulo…</div>';
        toc.innerHTML = '';
        let md;
        try {
            md = await C.md.fetchText(ch.file);
        } catch (e) {
            const local = location.protocol === 'file:';
            art.innerHTML = '<div class="error-box"><h2><i class="fa-solid fa-triangle-exclamation"></i> Não foi possível carregar o capítulo</h2>' +
                (local ? '<p>Você abriu o arquivo direto do disco (<code>file://</code>) e o navegador bloqueia a leitura dos arquivos Markdown. Sirva a pasta com um servidor local:</p><pre><code>cd calculo-1-lab\npython -m http.server 8000</code></pre><p>Depois acesse <code>http://localhost:8000</code>. No GitHub Pages isso funciona normalmente.</p>'
                       : '<p>' + C.md.esc(e.message) + '</p>') + '</div>';
            return;
        }
        if (location.hash.indexOf('/teoria/' + id) < 0) return; // usuário já navegou para outro lugar
        last = { id, t: Date.now() }; store(LKEY, last);
        lastShown = 'teoria/' + id;

        const g = group(ch.group), idx = C.chapters.indexOf(ch);
        const prev = C.chapters[idx - 1], next = C.chapters[idx + 1];
        art.innerHTML =
            '<div class="crumbs"><a href="#/teoria">Teoria</a> <i class="fa-solid fa-angle-right"></i> <span>' + g.title + '</span></div>' +
            '<div class="meta"><span><i class="fa-regular fa-clock"></i> ' + ch.minutes + ' min</span>' +
            (ch.lab ? '<a href="#/lab/' + ch.lab + '"><i class="fa-solid fa-flask"></i> ' + LAB_NAMES[ch.lab] + '</a>' : '') + '</div>' +
            '<div class="prose" id="prose">' + C.md.render(md) + '</div>' +
            '<div class="chapter-foot">' +
            '<button class="btn ' + (isDone(id) ? 'done' : 'primary') + '" id="doneBtn" type="button"><i class="fa-solid ' + (isDone(id) ? 'fa-circle-check' : 'fa-check') + '"></i> ' + (isDone(id) ? 'Capítulo concluído' : 'Marcar como concluído') + '</button>' +
            '<div class="pn">' +
            (prev ? '<a href="#/teoria/' + prev.id + '"><small><i class="fa-solid fa-arrow-left"></i> Anterior</small><b>' + prev.title + '</b></a>' : '<span></span>') +
            (next ? '<a class="next" href="#/teoria/' + next.id + '"><small>Próximo <i class="fa-solid fa-arrow-right"></i></small><b>' + next.title + '</b></a>' : '<span></span>') +
            '</div></div>';

        const sections = C.md.enhance($('#prose'));
        sections.forEach(sec => {
            const h = document.getElementById(sec.id);
            if (h) h.insertAdjacentHTML('beforeend', '<a class="sec-link" href="#/teoria/' + id + '/' + sec.id + '" title="Link para esta seção" aria-label="Link para esta seção">#</a>');
        });
        $('#prose').addEventListener('quizdone', e => {
            const { right, total } = e.detail;
            const prev = quiz[id];
            if (!prev || right > prev.best || prev.total !== total) quiz[id] = { best: right, total, t: Date.now() };
            store(QKEY, quiz);
            if (right / total >= 0.7 && !isDone(id)) {
                toggleDone(id); markNav(id);
                const b = $('#doneBtn'); b.className = 'btn done'; b.innerHTML = '<i class="fa-solid fa-circle-check"></i> Capítulo concluído';
                e.target.insertAdjacentHTML('beforeend', '<div class="qz-auto"><i class="fa-solid fa-circle-check"></i> Capítulo marcado como concluído no seu progresso.</div>');
            }
        });
        toc.innerHTML = sections.length
            ? '<div class="toc-title">Nesta página</div>' + sections.map(s => '<a href="#" data-id="' + s.id + '" class="l' + s.level + '">' + C.md.esc(s.text) + '</a>').join('') +
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

    /* ---------------- abas do laboratório ---------------- */
    $$('#labTabs button').forEach(b => b.addEventListener('click', () => { location.hash = '#/lab/' + b.dataset.lab; }));

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
