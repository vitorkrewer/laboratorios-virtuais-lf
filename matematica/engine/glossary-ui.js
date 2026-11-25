/* Interface compartilhada do glossário: desenho do verbete, janela de explicação,
   leitura em voz alta, detecção de símbolos em um texto e favoritos.
   Usada pela página do glossário e pelos livros. Depende de MATH.glossary e MATH.md. */
window.MATH = window.MATH || {};

MATH.gloss = (function () {
    'use strict';
    const G = () => MATH.glossary || [];
    const byId = id => (MATH.glossaryById || {})[id];
    const cat = id => (MATH.glossaryCats || []).find(c => c.id === id) || {};
    const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const tex = (s, d) => MATH.md ? MATH.md.tex(s, d) : esc(s);
    const inl = s => MATH.md ? MATH.md.inlineMd(s || '') : esc(s || '');
    const BOOK = { 'algebra': 'Álgebra', 'fundamentos': 'Fundamentos', 'funcoes': 'Funções', 'calculo-1': 'Cálculo I', 'algebra-linear': 'Álgebra Linear' };

    /* raiz do ecossistema relativa à página atual: ".../matematica/" */
    function root() {
        const p = location.pathname, i = p.indexOf('/matematica/');
        return i >= 0 ? p.slice(0, i + 12) : '../';
    }
    function chapterLink(l) {
        const [b, c] = l.split('/');
        return root() + b + '/#/teoria/' + c;
    }
    function chapterTitle(l) {
        const [b, c] = l.split('/');
        const t = (MATH.chapterTitles || {})[l];
        return (BOOK[b] || b) + ' · ' + (t || c.replace(/-/g, ' '));
    }

    /* ---------- favoritos ---------- */
    const FKEY = 'mat.gloss.fav.v1';
    function favs() { try { return JSON.parse(localStorage.getItem(FKEY)) || {}; } catch (e) { return {}; } }
    function toggleFav(id) { const f = favs(); if (f[id]) delete f[id]; else f[id] = 1; try { localStorage.setItem(FKEY, JSON.stringify(f)); } catch (e) { /* */ } return !!f[id]; }

    /* ---------- voz ---------- */
    let voice = null;
    function pickVoice() {
        if (!('speechSynthesis' in window)) return null;
        const vs = speechSynthesis.getVoices();
        return vs.find(v => /pt[-_]BR/i.test(v.lang)) || vs.find(v => /^pt/i.test(v.lang)) || null;
    }
    if ('speechSynthesis' in window) { speechSynthesis.onvoiceschanged = () => { voice = pickVoice(); }; voice = pickVoice(); }
    const canSpeak = () => 'speechSynthesis' in window;
    function speak(e) {
        if (!canSpeak()) return;
        speechSynthesis.cancel();
        const txt = e.r ? e.t + '. Lê-se: ' + e.r.split(';')[0] + '.' : e.t + '.';
        const u = new SpeechSynthesisUtterance(txt);
        u.lang = 'pt-BR'; u.rate = 0.95;
        if (voice) u.voice = voice;
        speechSynthesis.speak(u);
    }

    /* ---------- texto unicode do símbolo (para a busca: "∈", "≤"...) ---------- */
    const uniCache = {};
    function uni(e) {
        if (!e.s) return '';
        if (uniCache[e.id] !== undefined) return uniCache[e.id];
        const d = document.createElement('div');
        d.innerHTML = tex(e.s);
        const h = d.querySelector('.katex-html');
        return (uniCache[e.id] = (h ? h.textContent : d.textContent).replace(/\s+/g, ''));
    }

    /* ---------- verbete completo ---------- */
    function entryHtml(e, opts) {
        opts = opts || {};
        const c = cat(e.c), fav = favs()[e.id];
        const rel = (e.k || []).map(byId).filter(Boolean);
        return '<div class="g-entry gc-' + (c.color || 'sky') + '" data-id="' + e.id + '">' +
            '<div class="g-head">' +
              '<div class="g-sym">' + (e.s ? tex(e.s, false) : '<i class="fa-solid fa-font"></i>') + '</div>' +
              '<div class="g-title"><small><i class="fa-solid ' + (c.icon || 'fa-book') + '"></i> ' + esc(c.title || '') + '</small><h3>' + esc(e.t) + '</h3>' +
                (e.r ? '<div class="g-read"><span>Lê-se:</span> <b>' + esc(e.r) + '</b></div>' : '') + '</div>' +
              '<div class="g-actions">' +
                (canSpeak() ? '<button type="button" class="g-btn g-speak" title="Ouvir como se lê" aria-label="Ouvir como se lê"><i class="fa-solid fa-volume-high"></i></button>' : '') +
                '<button type="button" class="g-btn g-fav' + (fav ? ' on' : '') + '" title="Guardar nos meus cartões" aria-label="Favoritar"><i class="fa-' + (fav ? 'solid' : 'regular') + ' fa-star"></i></button>' +
                (opts.link ? '<a class="g-btn" href="' + root() + 'glossario/#' + e.id + '" title="Abrir no glossário" aria-label="Abrir no glossário"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>' : '') +
              '</div>' +
            '</div>' +
            '<div class="g-body">' +
              '<div class="g-row"><span class="g-lbl"><i class="fa-solid fa-circle-info"></i> O que é</span><div>' + inl(e.d) + '</div></div>' +
              (e.e ? '<div class="g-row"><span class="g-lbl"><i class="fa-solid fa-pen-to-square"></i> Exemplo</span><div>' + inl(e.e) + '</div></div>' : '') +
              (e.m ? '<div class="g-row g-mem"><span class="g-lbl"><i class="fa-solid fa-brain"></i> Como lembrar</span><div>' + inl(e.m) + '</div></div>' : '') +
              (e.w ? '<div class="g-row g-warn"><span class="g-lbl"><i class="fa-solid fa-triangle-exclamation"></i> Cuidado</span><div>' + inl(e.w) + '</div></div>' : '') +
              ((e.l || []).length ? '<div class="g-row"><span class="g-lbl"><i class="fa-solid fa-book-open"></i> Onde estudar</span><div class="g-links">' +
                e.l.map(l => '<a href="' + chapterLink(l) + '">' + esc(chapterTitle(l)) + '</a>').join('') + '</div></div>' : '') +
              (rel.length ? '<div class="g-row"><span class="g-lbl"><i class="fa-solid fa-link"></i> Veja também</span><div class="g-rel">' +
                rel.map(r => '<button type="button" class="g-chip" data-goto="' + r.id + '">' + (r.s ? tex(r.s) + ' ' : '') + esc(r.t) + '</button>').join('') + '</div></div>' : '') +
            '</div></div>';
    }

    /* liga botões de ouvir/favoritar/relacionados dentro de um contêiner */
    function wire(container, onGoto) {
        container.addEventListener('click', ev => {
            const ent = ev.target.closest('.g-entry');
            if (!ent) return;
            const e = byId(ent.dataset.id);
            if (ev.target.closest('.g-speak')) { speak(e); return; }
            const f = ev.target.closest('.g-fav');
            if (f) { const on = toggleFav(e.id); f.classList.toggle('on', on); f.innerHTML = '<i class="fa-' + (on ? 'solid' : 'regular') + ' fa-star"></i>'; return; }
            const g = ev.target.closest('[data-goto]');
            if (g && onGoto) { ev.preventDefault(); onGoto(g.dataset.goto); }
        });
    }

    /* ---------- janela de explicação (usada nos livros) ---------- */
    let pop = null;
    function openPopup(id) {
        const e = byId(id);
        if (!e) return;
        if (!pop) {
            pop = document.createElement('div');
            pop.className = 'g-pop';
            pop.innerHTML = '<div class="g-pop-card" role="dialog" aria-modal="true" aria-label="Explicação do símbolo"><button type="button" class="g-close" aria-label="Fechar"><i class="fa-solid fa-xmark"></i></button><div class="g-pop-body"></div></div>';
            document.body.appendChild(pop);
            pop.addEventListener('click', ev => { if (ev.target === pop || ev.target.closest('.g-close')) closePopup(); });
            document.addEventListener('keydown', ev => { if (ev.key === 'Escape') closePopup(); });
            wire(pop, openPopup);
        }
        pop.querySelector('.g-pop-body').innerHTML = entryHtml(e, { link: true });
        pop.classList.add('open');
        pop.querySelector('.g-close').focus();
    }
    function closePopup() { if (pop) pop.classList.remove('open'); }

    /* ---------- detecção: verbetes cujos símbolos aparecem no TeX de um capítulo ---------- */
    function mathOf(md) {
        const out = [];
        md = md.replace(/```(?!quiz)[\s\S]*?```/g, ' ');
        md.replace(/\$\$([\s\S]+?)\$\$/g, (m, t) => { out.push(t); return ' '; })
          .replace(/\$([^\s$](?:[^$\n]*?[^\s$])?)\$/g, (m, t) => { out.push(t); return m; });
        return out.join(' \n ');
    }
    const reCache = {};
    function detect(md) {
        const m = mathOf(md);
        const hits = [];
        G().forEach(e => {
            if (!e.x) return;
            let re = reCache[e.id];
            if (!re) { try { re = reCache[e.id] = new RegExp(e.x); } catch (err) { return; } }
            const r = re.exec(m);
            if (r) hits.push({ e, pos: r.index });
        });
        return hits.sort((a, b) => a.pos - b.pos).map(h => h.e);
    }

    /* caixa "Símbolos deste capítulo" */
    function chapterBox(md) {
        const list = detect(md);
        if (!list.length) return '';
        const LIM = 12;
        const chip = (e, hide) => '<button type="button" class="g-chip' + (hide ? ' g-more' : '') + '" data-gloss="' + e.id + '" title="' + esc(e.t) + '">' + (e.s ? tex(e.s) : '') + ' <span>' + esc(e.t) + '</span></button>';
        return '<div class="g-box"><div class="g-box-head"><i class="fa-solid fa-spell-check"></i> <b>Símbolos deste capítulo</b> <small>clique para ver como se lê e o que significa</small>' +
            '<a href="' + root() + 'glossario/" class="g-box-link">Glossário completo <i class="fa-solid fa-arrow-right"></i></a></div>' +
            '<div class="g-box-chips">' + list.map((e, i) => chip(e, i >= LIM)).join('') +
            (list.length > LIM ? '<button type="button" class="g-chip g-toggle" data-more="1">+ ' + (list.length - LIM) + ' símbolos</button>' : '') + '</div></div>';
    }
    function wireBox(container) {
        container.addEventListener('click', ev => {
            const b = ev.target.closest('[data-gloss]');
            if (b) { openPopup(b.dataset.gloss); return; }
            const t = ev.target.closest('.g-toggle');
            if (t) { const box = t.closest('.g-box'); box.classList.toggle('all'); t.textContent = box.classList.contains('all') ? 'mostrar menos' : t.dataset.label || t.textContent; }
        });
        const t = container.querySelector('.g-toggle');
        if (t) t.dataset.label = t.textContent;
    }

    return { entryHtml, wire, speak, canSpeak, uni, favs, toggleFav, openPopup, closePopup, detect, chapterBox, wireBox, root, chapterLink, chapterTitle, esc };
})();
