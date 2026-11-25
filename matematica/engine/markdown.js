/* Pipeline Markdown + KaTeX: protege a matemática antes do marked e restaura depois. */
window.MATH = window.MATH || {};

MATH.md = (function () {
    'use strict';

    const textCache = {};

    function esc(s) {
        return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    }

    function tex(src, display) {
        if (!window.katex) return esc(src);
        try {
            return window.katex.renderToString(src, { displayMode: !!display, throwOnError: false, strict: 'ignore' });
        } catch (e) {
            return '<code>' + esc(src) + '</code>';
        }
    }

    /* Renderiza texto curto com $...$ inline (usado em opções de quiz, descrições etc.). */
    function inline(str) {
        return esc(str).replace(/\$([^\s$](?:[^$\n]*?[^\s$])?)\$/g, (m, t) => tex(unesc(t), false));
    }
    /* Markdown inline (negrito, código, links) + matemática. */
    function inlineMd(str) {
        const store = [];
        const safe = protectMath(str, store);
        return window.marked.parseInline(safe).replace(/KTXPH(\d+)END/g, (m, i) => store[+i]);
    }

    /* ---------- quizzes: bloco ```quiz ----------
       ? pergunta        + alternativa correta
       - alternativa     > explicação (opcional)
       Linha em branco separa as questões. */
    function parseQuiz(src) {
        const qs = [];
        let cur = null;
        src.split('\n').forEach(raw => {
            const line = raw.trim();
            if (!line) return;
            const k = line[0], body = line.slice(1).trim();
            if (k === '?') { cur = { q: body, opts: [], exp: '' }; qs.push(cur); }
            else if (!cur) return;
            else if (k === '+' || k === '-') cur.opts.push({ t: body, ok: k === '+' });
            else if (k === '>') cur.exp += (cur.exp ? ' ' : '') + body;
            else if (cur.opts.length === 0) cur.q += ' ' + line;
        });
        return qs.filter(q => q.opts.length >= 2 && q.opts.some(o => o.ok));
    }

    function shuffle(a) {
        a = a.slice();
        for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
        return a;
    }

    function buildQuiz(qs) {
        const letters = 'ABCDEF';
        const host = document.createElement('div');
        host.className = 'quiz';
        host.innerHTML = '<div class="qz-head"><i class="fa-solid fa-list-check"></i> Teste rápido <small>' + qs.length + ' questões · correção imediata</small></div>' +
            qs.map((q, i) => '<div class="qz-q"><div class="qz-text"><b>' + (i + 1) + '.</b> ' + inlineMd(q.q) + '</div><div class="qz-opts">' +
                shuffle(q.opts).map((o, j) => '<button type="button" class="qz-opt" data-ok="' + (o.ok ? 1 : 0) + '"><span class="qz-l">' + letters[j] + '</span><span>' + inlineMd(o.t) + '</span></button>').join('') +
                '</div><div class="qz-exp" hidden>' + (q.exp ? inlineMd(q.exp) : '') + '</div></div>').join('') +
            '<div class="qz-foot"><div class="qz-score" aria-live="polite">Responda as questões para ver seu resultado.</div>' +
            '<button type="button" class="btn small ghost qz-retry" hidden><i class="fa-solid fa-rotate-right"></i> Refazer</button></div>';
        let answered = 0, right = 0;
        host.addEventListener('click', e => {
            if (e.target.closest('.qz-retry')) { host.replaceWith(buildQuiz(qs)); return; }
            const btn = e.target.closest('.qz-opt');
            if (!btn) return;
            const qd = btn.closest('.qz-q');
            if (qd.classList.contains('done')) return;
            qd.classList.add('done');
            const ok = btn.dataset.ok === '1';
            btn.classList.add(ok ? 'right' : 'wrong');
            qd.querySelectorAll('.qz-opt').forEach(b => { b.disabled = true; if (b.dataset.ok === '1') b.classList.add('right'); });
            const exp = qd.querySelector('.qz-exp');
            exp.innerHTML = '<b class="' + (ok ? 'ok' : 'no') + '">' + (ok ? '✔ Correto.' : '✘ Não foi dessa vez.') + '</b> ' + exp.innerHTML;
            exp.hidden = false;
            answered++; if (ok) right++;
            const sc = host.querySelector('.qz-score');
            if (answered < qs.length) { sc.textContent = 'Parcial: ' + right + ' de ' + answered + ' acertos.'; return; }
            const pct = right / qs.length;
            sc.innerHTML = '<strong>' + right + '/' + qs.length + '</strong> ' + (pct === 1 ? 'Gabaritou! Capítulo dominado.' : pct >= 0.7 ? 'Bom resultado. Revise a explicação das que errou.' : 'Vale reler o capítulo e refazer os exemplos antes de seguir.');
            sc.className = 'qz-score ' + (pct >= 0.7 ? 'good' : 'low');
            host.querySelector('.qz-retry').hidden = false;
            host.dispatchEvent(new CustomEvent('quizdone', { bubbles: true, detail: { right, total: qs.length } }));
        });
        return host;
    }

    function mountQuizzes(root) {
        root.querySelectorAll('pre > code.language-quiz').forEach(code => {
            const qs = parseQuiz(code.textContent);
            if (qs.length) code.parentNode.replaceWith(buildQuiz(qs));
        });
    }

    function unesc(s) {
        return s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&');
    }

    function protectMath(md, store) {
        const parts = md.split(/(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`\n]+`)/g);
        return parts.map((p, i) => {
            if (i % 2 === 1) return p; // código: não mexe
            p = p.replace(/\$\$([\s\S]+?)\$\$/g, (m, t) => {
                store.push(tex(t.trim(), true));
                return 'KTXPH' + (store.length - 1) + 'END';
            });
            p = p.replace(/\$([^\s$](?:[^$\n]*?[^\s$])?)\$/g, (m, t) => {
                store.push(tex(t, false));
                return 'KTXPH' + (store.length - 1) + 'END';
            });
            return p;
        }).join('');
    }

    function render(md) {
        const store = [];
        const safe = protectMath(md, store);
        let html = window.marked.parse(safe, { gfm: true, breaks: false });
        html = html.replace(/KTXPH(\d+)END/g, (m, i) => store[+i]);
        return html;
    }

    async function fetchText(file) {
        if (textCache[file]) return textCache[file];
        const res = await fetch(file, { cache: 'no-cache' });
        if (!res.ok) throw new Error('HTTP ' + res.status + ' ao carregar ' + file);
        const txt = await res.text();
        textCache[file] = txt;
        return txt;
    }

    function slugify(s) {
        return s.normalize('NFD').replace(/[̀-ͯ]/g, '')
            .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'secao';
    }

    function cleanText(el) {
        const c = el.cloneNode(true);
        c.querySelectorAll('.katex-mathml, .anchor').forEach(n => n.remove());
        return c.textContent.trim();
    }

    const CALLOUTS = {
        'DEFINIÇÃO': { cls: 'def',  icon: 'fa-book-bookmark', label: 'Definição' },
        'DEFINICAO': { cls: 'def',  icon: 'fa-book-bookmark', label: 'Definição' },
        'TEOREMA':   { cls: 'teo',  icon: 'fa-award',         label: 'Teorema' },
        'EXEMPLO':   { cls: 'ex',   icon: 'fa-pen-to-square', label: 'Exemplo' },
        'DICA':      { cls: 'dica', icon: 'fa-lightbulb',     label: 'Dica' },
        'ATENÇÃO':   { cls: 'warn', icon: 'fa-triangle-exclamation', label: 'Atenção' },
        'ATENCAO':   { cls: 'warn', icon: 'fa-triangle-exclamation', label: 'Atenção' },
        'INTUIÇÃO':  { cls: 'intu', icon: 'fa-eye',           label: 'Intuição' },
        'INTUICAO':  { cls: 'intu', icon: 'fa-eye',           label: 'Intuição' }
    };

    /* Pós-processamento do DOM: callouts, ids de títulos e lista de seções. */
    function enhance(root) {
        root.querySelectorAll('blockquote').forEach(bq => {
            const p = bq.querySelector('p');
            if (!p) return;
            const m = p.innerHTML.match(/^\s*\[!([^\]]+)\]\s*/);
            if (!m) return;
            const key = m[1].trim().toUpperCase();
            const conf = CALLOUTS[key];
            if (!conf) return;
            p.innerHTML = p.innerHTML.slice(m[0].length);
            bq.classList.add('callout', 'co-' + conf.cls);
            const head = document.createElement('div');
            head.className = 'co-head';
            head.innerHTML = '<i class="fa-solid ' + conf.icon + '"></i> ' + conf.label;
            bq.insertBefore(head, bq.firstChild);
        });

        const used = {};
        const sections = [];
        root.querySelectorAll('h2, h3').forEach(h => {
            const text = cleanText(h);
            let id = slugify(text);
            if (used[id]) { used[id]++; id += '-' + used[id]; } else { used[id] = 1; }
            h.id = id;
            sections.push({ id, text, level: h.tagName === 'H2' ? 2 : 3 });
        });

        mountQuizzes(root);

        root.querySelectorAll('table').forEach(t => {
            const wrap = document.createElement('div');
            wrap.className = 'table-wrap';
            t.parentNode.insertBefore(wrap, t);
            wrap.appendChild(t);
        });
        return sections;
    }

    /* Texto puro (sem markdown/latex) para a busca. */
    function plain(md) {
        return md
            .replace(/```(?!quiz)[\s\S]*?```/g, ' ')
            .replace(/```quiz|```/g, ' ')
            .replace(/^[?+>]\s/gm, ' ')
            .replace(/\$\$[\s\S]+?\$\$/g, ' ')
            .replace(/\$[^$\n]+\$/g, ' ')
            .replace(/<[^>]+>/g, ' ')
            .replace(/[#>*_`|\-]+/g, ' ')
            .replace(/\[!([^\]]+)\]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }

    return { tex, inline, inlineMd, render, fetchText, enhance, plain, slugify, esc };
})();
