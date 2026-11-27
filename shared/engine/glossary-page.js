/* Página do glossário: Consultar, Memorizar (repetição espaçada), Testar e Folha para imprimir. */
(function () {
    'use strict';
    const G = MATH.glossary, CATS = MATH.glossaryCats, U = MATH.gloss, esc = U.esc;
    const byId = id => MATH.glossaryById[id];
    const $ = (s, r) => (r || document).querySelector(s);
    const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
    const tex = (s, d) => MATH.md.tex(s, d);
    const inl = s => MATH.md.inlineMd(s || '');
    const norm = t => String(t || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
    const view = $('#glView');
    const plain = md => String(md || '').replace(/\$[^$]*\$/g, ' ').replace(/[*_`]/g, '');
    const firstSentence = md => { const s = String(md || ''); const i = s.search(/\.\s/); return i > 0 ? s.slice(0, i + 1) : s; };

    /* ---------------- repetição espaçada (caixas de Leitner) ---------------- */
    const AREA = MATH.area || { key: 'mat', eco: 'Ecossistema de Matemática' };
    const SKEY = AREA.key + '.gloss.srs.v1';
    const DAYS = [0, 1, 2, 4, 8, 16];          // intervalo por caixa (dias)
    function srs() { try { return JSON.parse(localStorage.getItem(SKEY)) || {}; } catch (e) { return {}; } }
    function saveSrs(s) { try { localStorage.setItem(SKEY, JSON.stringify(s)); } catch (e) { /* */ } }
    function status(id, S) { const c = (S || srs())[id]; return !c ? 'novo' : c.box >= 4 ? 'dominado' : 'aprendendo'; }

    /* ---------------- roteador ---------------- */
    let mode = '';
    function route() {
        const h = location.hash.replace(/^#\/?/, '');
        const parts = h.split('/');
        let m = ['memorizar', 'testar', 'folha'].includes(parts[0]) ? parts[0] : 'consultar';
        const target = m === 'consultar' && h && !h.startsWith('/') ? decodeURIComponent(h) : '';
        $$('#glNav a').forEach(a => a.classList.toggle('active', a.dataset.mode === m));
        if (m !== mode || m === 'consultar') { mode = m; window.scrollTo(0, 0); }
        if (m === 'consultar') consultar(target);
        else if (m === 'memorizar') memorizar();
        else if (m === 'testar') testar();
        else folha();
    }

    /* ---------------- CONSULTAR ---------------- */
    let state = { q: '', cat: 'all', fav: false };
    let built = false;
    function hay(e) { return norm([e.t, e.r, plain(e.d), e.a, e.s, U.uni(e), plain(e.m)].join(' ')); }
    const H = {};
    function consultar(target) {
        if (!built || !$('#glList')) {
            built = true;
            const counts = {}; G.forEach(e => { counts[e.c] = (counts[e.c] || 0) + 1; });
            const S = srs(), dom = G.filter(e => status(e.id, S) === 'dominado').length;
            view.innerHTML =
                '<div class="page-head"><span class="kicker">Glossário do ecossistema</span><h1>Todo símbolo tem um nome, um jeito de ler e um significado</h1>' +
                '<p>' + G.length + ' verbetes com <strong>como se lê</strong>, o que significa em palavras simples, um exemplo, <strong>como lembrar</strong>, o erro mais comum e onde estudar. Busque pelo nome, pelo jeito de ler ou cole o próprio símbolo (como ' + esc(AREA.searchEx || '∈, ≤ ou ∫') + ').</p></div>' +
                '<details class="g-howto"><summary><i class="fa-solid fa-brain"></i> Faz tempo que você saiu da escola? Veja como memorizar de verdade</summary><div class="g-howto-body">' +
                  '<div><b>1. Leia em voz alta.</b> Símbolo que você não sabe pronunciar, você não consegue pensar. Use o botão <i class="fa-solid fa-volume-high"></i> de cada verbete.</div>' +
                  '<div><b>2. Escreva à mão.</b> Copie o símbolo três vezes dizendo o nome. A mão ajuda a memória.</div>' +
                  '<div><b>3. Use a frase de "Como lembrar".</b> Associação (∈ é o "E" de Elemento) fixa muito mais que repetição seca.</div>' +
                  '<div><b>4. Teste-se, não releia.</b> Na aba <a href="#/memorizar">Memorizar</a>, tente lembrar antes de virar o cartão. Errar e corrigir ensina mais do que reler.</div>' +
                  '<div><b>5. Espace a revisão.</b> Os cartões voltam depois de 1, 2, 4, 8 e 16 dias. Dez minutos por dia vencem uma maratona na véspera.</div>' +
                  '<div><b>6. Estude no contexto.</b> Cada verbete leva ao capítulo onde o símbolo é usado, e cada capítulo mostra os símbolos que usa.</div>' +
                '</div></details>' +
                '<div class="g-toolbar">' +
                  '<div class="search-box g-search"><i class="fa-solid fa-magnifying-glass"></i><input id="glQ" type="search" placeholder="Buscar: ' + esc(AREA.searchHint || 'pertence, delta, ∫, “lê-se”') + '…" autocomplete="off" aria-label="Buscar no glossário"><kbd>/</kbd></div>' +
                  '<label class="g-favtoggle"><input type="checkbox" id="glFav"> <i class="fa-solid fa-star"></i> Só favoritos</label>' +
                  '<span class="g-stat"><i class="fa-solid fa-trophy"></i> ' + dom + ' de ' + G.length + ' dominados</span>' +
                '</div>' +
                '<div class="g-cats" id="glCats"><button type="button" data-cat="all" class="active">Todos <small>' + G.length + '</small></button>' +
                  CATS.map(c => '<button type="button" data-cat="' + c.id + '"><i class="fa-solid ' + c.icon + '"></i> ' + esc(c.title) + ' <small>' + (counts[c.id] || 0) + '</small></button>').join('') + '</div>' +
                '<div id="glCount" class="muted-p"></div><div id="glList" class="g-list"></div>';
            G.forEach(e => { H[e.id] = hay(e); });
            const q = $('#glQ'); let t;
            q.value = state.q; $('#glFav').checked = state.fav;
            q.addEventListener('input', () => { clearTimeout(t); t = setTimeout(() => { state.q = q.value; renderList(); }, 120); });
            $('#glFav').addEventListener('change', e => { state.fav = e.target.checked; renderList(); });
            $('#glCats').addEventListener('click', e => { const b = e.target.closest('[data-cat]'); if (!b) return; state.cat = b.dataset.cat; $$('#glCats button').forEach(x => x.classList.toggle('active', x === b)); renderList(); });
            U.wire($('#glList'), id => { location.hash = '#' + id; });
        }
        renderList(target);
    }
    function renderList(target) {
        if (!$('#glCount')) return; /* a busca atrasada pode chegar depois de trocar de modo */
        const raw = state.q.trim(), q = norm(raw), F = U.favs();
        let list = G.filter(e => (state.cat === 'all' || e.c === state.cat) && (!state.fav || F[e.id]));
        if (q) {
            const toks = q.split(/\s+/);
            const rank = e => { const t = norm(e.t), r = norm(e.r); return t.startsWith(q) ? 0 : t.includes(q) ? 1 : (U.uni(e) === raw.replace(/\s/g, '') ? 0 : r.includes(q) ? 2 : 3); };
            list = list.filter(e => toks.every(tk => H[e.id].includes(tk)) || (U.uni(e) && raw.replace(/\s/g, '') && U.uni(e).includes(raw.replace(/\s/g, ''))))
                .sort((a, b) => rank(a) - rank(b));
        }
        if (target && byId(target) && !list.includes(byId(target))) { state.cat = 'all'; state.q = ''; state.fav = false; $('#glQ').value = ''; $('#glFav').checked = false; $$('#glCats button').forEach(x => x.classList.toggle('active', x.dataset.cat === 'all')); list = G.slice(); }
        $('#glCount').textContent = list.length + (list.length === 1 ? ' verbete' : ' verbetes') + (q ? ' para “' + raw + '”' : '');
        const groups = CATS.filter(c => list.some(e => e.c === c.id));
        $('#glList').innerHTML = list.length && q ? '<div class="g-grid">' + list.map(e => U.entryHtml(e)).join('') + '</div>'
            : list.length ? groups.map(c => '<h2 class="g-cat-title"><i class="fa-solid ' + c.icon + '"></i> ' + esc(c.title) + '</h2><div class="g-grid">' +
                list.filter(e => e.c === c.id).map(e => U.entryHtml(e)).join('') + '</div>').join('')
            : '<div class="g-empty"><i class="fa-solid fa-magnifying-glass"></i><p>Nada encontrado. Tente outra palavra ou o nome por extenso (por exemplo, “pertence” em vez de “∈”).</p></div>';
        if (target) {
            const el = $('.g-entry[data-id="' + target + '"]');
            if (el) { el.classList.add('flash'); setTimeout(() => el.scrollIntoView({ block: 'center', behavior: 'instant' }), 30); setTimeout(() => el.classList.remove('flash'), 2400); }
        }
    }

    /* ---------------- MEMORIZAR ---------------- */
    let deck = 'all', queue = [], cur = null, flipped = false, sessionDone = 0;
    function deckList() {
        const F = U.favs();
        if (deck === 'fav') return G.filter(e => F[e.id]);
        if (deck.startsWith('book:')) { const b = deck.slice(5); return G.filter(e => (e.l || []).some(l => l.startsWith(b + '/'))); }
        return deck === 'all' ? G.slice() : G.filter(e => e.c === deck);
    }
    function buildQueue() {
        const S = srs(), now = Date.now();
        const list = deckList();
        const due = list.filter(e => S[e.id] && S[e.id].due <= now).sort((a, b) => S[a.id].due - S[b.id].due);
        const fresh = list.filter(e => !S[e.id]);
        queue = due.concat(fresh.slice(0, Math.max(0, 15 - due.length))).slice(0, 25);
    }
    function memorizar() {
        const S = srs();
        const opts = '<option value="all">Todos os verbetes</option><option value="fav">Meus favoritos</option>' +
            '<optgroup label="Por livro">' + (MATH.catalog || []).filter(b => b.status === 'disponivel').map(b => '<option value="book:' + b.id + '">Usados em ' + esc(b.title) + '</option>').join('') + '</optgroup>' +
            '<optgroup label="Por categoria">' + CATS.map(c => '<option value="' + c.id + '">' + esc(c.title) + '</option>').join('') + '</optgroup>';
        const list = deckList(), n = { novo: 0, aprendendo: 0, dominado: 0 };
        list.forEach(e => n[status(e.id, S)]++);
        view.innerHTML =
            '<div class="page-head"><span class="kicker">Cartões de memorização</span><h1>Lembre antes de virar o cartão</h1>' +
            '<p>Olhe o símbolo, diga em voz alta como se lê e o que significa, e só então vire. Seja honesto na resposta: os cartões difíceis voltam logo; os fáceis, só daqui a dias.</p></div>' +
            '<div class="g-toolbar"><label class="g-deck">Baralho <select id="glDeck">' + opts + '</select></label>' +
              '<span class="g-pill novo">' + n.novo + ' novos</span><span class="g-pill aprendendo">' + n.aprendendo + ' aprendendo</span><span class="g-pill dominado">' + n.dominado + ' dominados</span></div>' +
            '<div id="glCard"></div>';
        $('#glDeck').value = deck;
        $('#glDeck').addEventListener('change', e => { deck = e.target.value; sessionDone = 0; memorizar(); });
        buildQueue(); nextCard();
    }
    function nextCard() {
        const box = $('#glCard');
        cur = queue.shift(); flipped = false;
        if (!cur) {
            const S = srs(), list = deckList();
            const next = list.map(e => S[e.id] && S[e.id].due).filter(Boolean).sort((a, b) => a - b)[0];
            box.innerHTML = '<div class="g-done"><i class="fa-solid fa-circle-check"></i><h2>' + (sessionDone ? 'Sessão concluída: ' + sessionDone + ' cartões revisados.' : 'Nada para revisar neste baralho agora.') + '</h2>' +
                '<p>' + (next ? 'O próximo cartão volta ' + when(next) + '.' : 'Escolha outro baralho ou marque favoritos no glossário.') + ' Volte amanhã: a revisão espaçada é o que fixa a memória.</p>' +
                '<div class="cta-row"><a class="btn primary" href="#/testar"><i class="fa-solid fa-list-check"></i> Fazer um teste</a><a class="btn ghost" href="#/">Voltar ao glossário</a></div></div>';
            return;
        }
        const e = cur;
        box.innerHTML =
            '<div class="g-card" tabindex="0">' +
              '<div class="g-card-meta"><span>' + (queue.length + 1) + ' restantes nesta sessão</span><span class="g-pill ' + status(e.id) + '">' + status(e.id) + '</span></div>' +
              '<div class="g-card-front">' + (e.s ? '<div class="g-card-sym">' + tex(e.s, true) + '</div><p>Como se lê? O que significa?</p>' : '<div class="g-card-term">' + esc(e.t) + '</div><p>O que significa?</p>') + '</div>' +
              '<div class="g-card-back" hidden></div>' +
              '<div class="g-card-actions"><button type="button" class="btn primary" id="glFlip"><i class="fa-solid fa-rotate"></i> Virar o cartão <kbd>espaço</kbd></button></div>' +
            '</div>';
        $('#glFlip').addEventListener('click', flip);
    }
    function flip() {
        if (flipped || !cur) return;
        flipped = true;
        const e = cur, back = $('.g-card-back');
        back.hidden = false;
        back.innerHTML = '<h3>' + esc(e.t) + '</h3>' + (e.r ? '<div class="g-read"><span>Lê-se:</span> <b>' + esc(e.r) + '</b> ' + (U.canSpeak() ? '<button type="button" class="g-btn g-say"><i class="fa-solid fa-volume-high"></i></button>' : '') + '</div>' : '') +
            '<p>' + inl(e.d) + '</p>' + (e.m ? '<p class="g-mem-line"><i class="fa-solid fa-brain"></i> ' + inl(e.m) + '</p>' : '');
        const say = $('.g-say', back); if (say) say.addEventListener('click', () => U.speak(e));
        $('.g-card-actions').innerHTML =
            '<button type="button" class="btn g-ans bad" data-a="0"><i class="fa-solid fa-xmark"></i> Não lembrei <kbd>1</kbd></button>' +
            '<button type="button" class="btn g-ans mid" data-a="1"><i class="fa-solid fa-minus"></i> Lembrei com esforço <kbd>2</kbd></button>' +
            '<button type="button" class="btn g-ans good" data-a="2"><i class="fa-solid fa-check"></i> Lembrei fácil <kbd>3</kbd></button>';
        $$('.g-ans').forEach(b => b.addEventListener('click', () => answer(+b.dataset.a)));
    }
    function answer(a) {
        if (!flipped || !cur) return;
        const S = srs(), c = S[cur.id] || { box: 0 };
        if (a === 0) { c.box = 1; c.due = Date.now() + 60 * 1000; queue.push(cur); }          // volta ainda nesta sessão
        else if (a === 1) { c.box = Math.max(1, c.box); c.due = Date.now() + DAYS[c.box] * 864e5; }
        else { c.box = Math.min(5, (c.box || 0) + 1); c.due = Date.now() + DAYS[c.box] * 864e5; }
        S[cur.id] = c; saveSrs(S);
        if (a > 0) sessionDone++;
        nextCard();
    }
    function when(ts) {
        const d = Math.round((ts - Date.now()) / 864e5);
        return d <= 0 ? 'hoje' : d === 1 ? 'amanhã' : 'em ' + d + ' dias';
    }

    /* ---------------- TESTAR ---------------- */
    let quiz = null;
    function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
    function testar() {
        view.innerHTML =
            '<div class="page-head"><span class="kicker">Teste rápido de símbolos</span><h1>Você reconhece estes símbolos?</h1>' +
            '<p>10 questões sorteadas. Ora aparece o símbolo e você escolhe o nome, ora o nome e você escolhe o símbolo.</p></div>' +
            '<div class="g-toolbar"><label class="g-deck">Assunto <select id="glTDeck"><option value="all">Todos</option>' + CATS.map(c => '<option value="' + c.id + '">' + esc(c.title) + '</option>').join('') + '</select></label>' +
            '<button type="button" class="btn primary" id="glTStart"><i class="fa-solid fa-play"></i> Novo teste</button></div><div id="glTest"></div>';
        $('#glTStart').addEventListener('click', startTest);
        startTest();
    }
    function startTest() {
        const c = $('#glTDeck').value;
        const pool = G.filter(e => e.s && (c === 'all' || e.c === c) && e.id !== 'pi-letra');
        const qs = shuffle(pool).slice(0, Math.min(10, pool.length)).map((e, i) => {
            const same = pool.filter(o => o.id !== e.id && o.c === e.c);
            const others = shuffle(same.length >= 3 ? same : pool.filter(o => o.id !== e.id)).slice(0, 3);
            return { e, rev: i % 2 === 1, opts: shuffle([e].concat(others)) };
        });
        quiz = { qs, i: 0, right: 0, wrong: [] };
        showQ();
    }
    function showQ() {
        const box = $('#glTest'), q = quiz.qs[quiz.i];
        if (!q) {
            const pct = quiz.right / quiz.qs.length;
            box.innerHTML = '<div class="g-done"><i class="fa-solid ' + (pct >= 0.7 ? 'fa-trophy' : 'fa-seedling') + '"></i><h2>' + quiz.right + ' de ' + quiz.qs.length + ' acertos</h2>' +
                '<p>' + (pct === 1 ? 'Perfeito!' : pct >= 0.7 ? 'Muito bom. Revise os que errou:' : 'Bom começo. Estude estes verbetes e use os cartões de memorização:') + '</p>' +
                (quiz.wrong.length ? '<div class="g-rel">' + quiz.wrong.map(e => '<a class="g-chip" href="#' + e.id + '">' + tex(e.s) + ' ' + esc(e.t) + '</a>').join('') + '</div>' : '') +
                '<div class="cta-row"><button type="button" class="btn primary" id="glAgain"><i class="fa-solid fa-rotate-right"></i> Outro teste</button><a class="btn ghost" href="#/memorizar">Ir para os cartões</a></div></div>';
            $('#glAgain').addEventListener('click', startTest);
            return;
        }
        box.innerHTML = '<div class="g-card"><div class="g-card-meta"><span>Questão ' + (quiz.i + 1) + ' de ' + quiz.qs.length + '</span><span>' + quiz.right + ' acertos</span></div>' +
            (q.rev ? '<div class="g-card-front"><div class="g-card-term">' + esc(q.e.t) + '</div><p>Qual é o símbolo?</p></div>'
                   : '<div class="g-card-front"><div class="g-card-sym">' + tex(q.e.s, true) + '</div><p>Que símbolo é este?</p></div>') +
            '<div class="g-topts">' + q.opts.map(o => '<button type="button" class="qz-opt" data-id="' + o.id + '">' + (q.rev ? tex(o.s) : esc(o.t)) + '</button>').join('') + '</div>' +
            '<div class="g-tfeed" hidden></div></div>';
        $$('.g-topts .qz-opt').forEach(b => b.addEventListener('click', () => {
            if (box.querySelector('.qz-opt:disabled')) return;
            const ok = b.dataset.id === q.e.id;
            $$('.g-topts .qz-opt').forEach(x => { x.disabled = true; if (x.dataset.id === q.e.id) x.classList.add('right'); });
            if (!ok) { b.classList.add('wrong'); quiz.wrong.push(q.e); } else quiz.right++;
            const f = $('.g-tfeed'); f.hidden = false;
            f.innerHTML = '<b class="' + (ok ? 'ok' : 'no') + '">' + (ok ? '✔ Isso!' : '✘ Era: ' + esc(q.e.t)) + '</b> ' + (q.e.r ? 'Lê-se <em>' + esc(q.e.r.split(';')[0]) + '</em>. ' : '') + inl(firstSentence(q.e.d)) +
                (q.e.m ? '<p class="g-mem-line"><i class="fa-solid fa-brain"></i> ' + inl(q.e.m) + '</p>' : '') +
                '<button type="button" class="btn primary small" id="glNext">Próxima <i class="fa-solid fa-arrow-right"></i></button>';
            $('#glNext').addEventListener('click', () => { quiz.i++; showQ(); });
            $('#glNext').focus();
        }));
    }

    /* ---------------- FOLHA PARA IMPRIMIR ---------------- */
    function folha() {
        view.innerHTML =
            '<div class="page-head no-print"><span class="kicker">Folha de consulta</span><h1>Todos os símbolos em uma folha</h1>' +
            '<p>Imprima ou salve em PDF e cole perto de onde você estuda. A folha traz só os verbetes com símbolo; os termos completos estão na aba Consultar.</p>' +
            '<div class="cta-row"><button type="button" class="btn primary" id="glPrint"><i class="fa-solid fa-print"></i> Imprimir / salvar PDF</button></div></div>' +
            '<div class="g-sheet"><h1 class="print-only">Glossário de símbolos · ' + esc(AREA.eco) + '</h1>' +
            CATS.map(c => {
                const list = G.filter(e => e.c === c.id && e.s && e.id !== 'pi-letra');
                return list.length ? '<section><h2>' + esc(c.title) + '</h2><table><thead><tr><th>Símbolo</th><th>Nome</th><th>Lê-se</th><th>Significado</th></tr></thead><tbody>' +
                    list.map(e => '<tr><td class="sym">' + tex(e.s) + '</td><td>' + esc(e.t) + '</td><td>' + esc((e.r || '').split(';')[0]) + '</td><td>' + inl(firstSentence(e.d)) + '</td></tr>').join('') + '</tbody></table></section>' : '';
            }).join('') + '</div>';
        $('#glPrint').addEventListener('click', () => window.print());
    }

    /* ---------------- teclado ---------------- */
    document.addEventListener('keydown', e => {
        const typing = /input|textarea|select/i.test(document.activeElement.tagName);
        if (mode === 'memorizar' && !typing) {
            if (e.key === ' ' && !flipped && cur) { e.preventDefault(); flip(); }
            else if (flipped && ['1', '2', '3'].includes(e.key)) answer(+e.key - 1);
        }
        if (mode === 'consultar' && e.key === '/' && !typing) { e.preventDefault(); $('#glQ').focus(); }
    });

    window.addEventListener('hashchange', route);
    route();
})();
