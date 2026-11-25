/* Livro Fundamentos: configuração, capítulos, trilhas e diagnóstico (lido por engine/app.js). */
window.MATH = window.MATH || {};

MATH.book = {
    id: 'fundamentos',
    title: 'Fundamentos',
    subtitle: 'Lógica, conjuntos e números reais',
    icon: 'fa-shapes',
    storage: 'mat.fund',
    wikiTitle: 'Wiki de Fundamentos',
    labs: [
        { id: 'venn', label: 'Conjuntos', icon: 'fa-circle-nodes', name: 'Simulador de conjuntos' },
        { id: 'intervalos', label: 'Intervalos', icon: 'fa-ruler-horizontal', name: 'Simulador de intervalos' },
        { id: 'inequacoes', label: 'Inequações', icon: 'fa-greater-than-equal', name: 'Simulador de inequações' }
    ],
    labsIntro: { title: 'Veja a linguagem da matemática', text: 'Diagramas de Venn, intervalos na reta e estudo de sinal de qualquer função: experimente, erre e confira.' },
    home: {
        eyebrow: 'Fundamentos da Matemática',
        titleHtml: 'A base que faltava para <em>entender o resto.</em>',
        lead: 'Lógica, conjuntos, números reais, intervalos, inequações e módulo: a <strong>linguagem</strong> que o Cálculo, a Álgebra Linear e a Estatística dão como sabida. Teoria gratuita, testes rápidos e simuladores.',
        labPitch: 'Monte conjuntos no diagrama de Venn, opere intervalos na reta e resolva qualquer inequação vendo o gráfico.',
        formulas: [
            { label: 'CONJUNTOS', tex: 'n(A\\cup B)=n(A)+n(B)-n(A\\cap B)' },
            { label: 'DE MORGAN', tex: '(A\\cup B)^c = A^c\\cap B^c' },
            { label: 'MÓDULO', tex: '|x-a|<r \\iff a-r<x<a+r' }
        ],
        mapKicker: 'O mapa do livro',
        mapTitle: 'Quatro blocos para dominar a base',
        map: [
            { color: 'sky', icon: 'fa-quote-left', title: 'Linguagem', text: 'Proposições, quantificadores, implicação e negação.', tex: '\\neg(\\forall x\\,P)\\equiv\\exists x\\,\\neg P', href: '#/teoria/logica' },
            { color: 'indigo', icon: 'fa-circle-nodes', title: 'Conjuntos', text: 'Pertinência, inclusão, operações, Venn e produto cartesiano.', tex: 'A - B = A\\cap B^c', href: '#/teoria/conjuntos' },
            { color: 'emerald', icon: 'fa-ruler-horizontal', title: 'Números reais', text: 'De $\\mathbb{N}$ a $\\mathbb{R}$, irracionais e intervalos.', tex: '\\mathbb{N}\\subset\\mathbb{Z}\\subset\\mathbb{Q}\\subset\\mathbb{R}', href: '#/teoria/conjuntos-numericos' },
            { color: 'amber', icon: 'fa-greater-than-equal', title: 'Desigualdades', text: 'Inequações, quadro de sinais e módulo.', tex: '|u|<r\\iff -r<u<r', href: '#/teoria/inequacoes' }
        ]
    },
    groups: [
        { id: 'linguagem', title: 'Linguagem', icon: 'fa-quote-left' },
        { id: 'conjuntos', title: 'Conjuntos', icon: 'fa-circle-nodes' },
        { id: 'numeros', title: 'Números reais', icon: 'fa-ruler-horizontal' },
        { id: 'desigualdades', title: 'Desigualdades', icon: 'fa-greater-than-equal' },
        { id: 'apoio', title: 'Apoio', icon: 'fa-life-ring' }
    ],
    chapters: [
        { id: 'logica', file: 'content/01-logica.md', group: 'linguagem', minutes: 40,
          title: 'Lógica e linguagem matemática',
          summary: 'Proposições, conectivos, implicação, contrapositiva, quantificadores e negação.' },
        { id: 'conjuntos', file: 'content/02-conjuntos.md', group: 'conjuntos', minutes: 35, lab: 'venn',
          title: 'Conjuntos: noções básicas',
          summary: 'Elemento, pertinência, descrição de conjuntos, subconjuntos e conjunto das partes.' },
        { id: 'operacoes-conjuntos', file: 'content/03-operacoes-conjuntos.md', group: 'conjuntos', minutes: 45, lab: 'venn',
          title: 'Operações com conjuntos',
          summary: 'União, interseção, diferença, complementar, De Morgan e problemas de contagem.' },
        { id: 'produto-cartesiano', file: 'content/04-produto-cartesiano.md', group: 'conjuntos', minutes: 35,
          title: 'Produto cartesiano e relações',
          summary: 'Pares ordenados, plano cartesiano, relações e a função como relação especial.' },
        { id: 'conjuntos-numericos', file: 'content/05-conjuntos-numericos.md', group: 'numeros', minutes: 40,
          title: 'Conjuntos numéricos',
          summary: 'Naturais, inteiros, racionais, irracionais e reais; dízimas e a irracionalidade de √2.' },
        { id: 'reais-intervalos', file: 'content/06-reais-intervalos.md', group: 'numeros', minutes: 35, lab: 'intervalos',
          title: 'Números reais e intervalos',
          summary: 'Reta real, regras de desigualdade, notação de intervalo e operações com intervalos.' },
        { id: 'inequacoes', file: 'content/07-inequacoes.md', group: 'desigualdades', minutes: 55, lab: 'inequacoes',
          title: 'Inequações',
          summary: '1º e 2º grau, inequações produto e quociente e o quadro de sinais.' },
        { id: 'modulo', file: 'content/08-modulo.md', group: 'desigualdades', minutes: 45, lab: 'inequacoes',
          title: 'Módulo (valor absoluto)',
          summary: 'Distância na reta, equações e inequações modulares e a ponte com o limite.' },
        { id: 'resumo', file: 'content/09-resumo.md', group: 'apoio', minutes: 15,
          title: 'Resumo, notação e erros comuns',
          summary: 'Símbolos, fórmulas e os erros que mais aparecem, em uma página.' }
    ],
    paths: [
        {
            id: 'ponte-calculo', icon: 'fa-bolt', color: 'amber',
            title: 'Ponte para o Cálculo',
            duration: '5 dias · ~1,5 h/dia',
            audience: 'Vai cursar ou já está em Cálculo I e trava em domínio, intervalo, inequação ou módulo.',
            steps: [
                { day: 'Dia 1', chapter: 'conjuntos-numericos', task: 'Revise os conjuntos numéricos. Foco em por que o Cálculo precisa de $\\mathbb{R}$.' },
                { day: 'Dia 2', chapter: 'reais-intervalos', lab: 'intervalos', task: 'Notação de intervalo e operações. Resolva os exercícios de domínio.' },
                { day: 'Dia 3', chapter: 'inequacoes', lab: 'inequacoes', task: 'Domine o quadro de sinais: é exatamente o que você fará com $f\'$ e $f\'\'$.' },
                { day: 'Dia 4', chapter: 'modulo', lab: 'inequacoes', task: 'Módulo como distância e inequações modulares. Leia a ponte com o limite.' },
                { day: 'Dia 5', chapter: 'resumo', task: 'Revise o resumo e os erros comuns. Depois siga para o livro Cálculo I.' }
            ]
        },
        {
            id: 'conjuntos-4', icon: 'fa-circle-nodes', color: 'indigo',
            title: 'Teoria dos Conjuntos',
            duration: '4 dias · ~1,5 h/dia',
            audience: 'Seu curso começa por conjuntos e você precisa da linguagem formal agora.',
            steps: [
                { day: 'Dia 1', chapter: 'logica', task: 'Quantificadores e negação: a base para ler definições de conjuntos.' },
                { day: 'Dia 2', chapter: 'conjuntos', lab: 'venn', task: 'Pertinência × inclusão, subconjuntos e conjunto das partes.' },
                { day: 'Dia 3', chapter: 'operacoes-conjuntos', lab: 'venn', task: 'Operações, De Morgan e problemas com diagrama. Faça os desafios do simulador.' },
                { day: 'Dia 4', chapter: 'produto-cartesiano', task: 'Produto cartesiano, relações e função como relação.' }
            ]
        },
        {
            id: 'completo-14', icon: 'fa-seedling', color: 'emerald',
            title: 'Fundamentos completo',
            duration: '14 dias · ~1 h/dia',
            audience: 'Quer construir a base inteira com calma, na ordem do livro.',
            steps: [
                { day: 'Dias 1–2', chapter: 'logica', task: 'Proposições, conectivos, implicação e quantificadores.' },
                { day: 'Dias 3–4', chapter: 'conjuntos', lab: 'venn', task: 'Noções básicas de conjuntos.' },
                { day: 'Dias 5–6', chapter: 'operacoes-conjuntos', lab: 'venn', task: 'Operações e contagem com diagramas.' },
                { day: 'Dia 7', chapter: 'produto-cartesiano', task: 'Produto cartesiano e relações.' },
                { day: 'Dia 8', chapter: 'conjuntos-numericos', task: 'Conjuntos numéricos e irracionais.' },
                { day: 'Dia 9', chapter: 'reais-intervalos', lab: 'intervalos', task: 'Intervalos e suas operações.' },
                { day: 'Dias 10–11', chapter: 'inequacoes', lab: 'inequacoes', task: 'Inequações e quadro de sinais.' },
                { day: 'Dias 12–13', chapter: 'modulo', lab: 'inequacoes', task: 'Módulo, equações e inequações modulares.' },
                { day: 'Dia 14', chapter: 'resumo', task: 'Revisão geral com o resumo e os erros comuns.' }
            ]
        }
    ],
    diagnostic: [
        { q: 'A negação de "todo número primo é ímpar" é:', opts: ['Todo número primo é par', 'Nenhum número primo é ímpar', 'Existe número primo que não é ímpar', 'Existe número ímpar que não é primo'], correct: 2, chapter: 'logica' },
        { q: 'Sendo $A = \\{1, \\{2\\}\\}$, qual é verdadeira?', opts: ['$2 \\in A$', '$\\{2\\} \\in A$', '$\\{2\\} \\subset A$', '$\\{1, 2\\} \\subset A$'], correct: 1, chapter: 'conjuntos' },
        { q: 'Se $n(A) = 10$, $n(B) = 8$ e $n(A \\cap B) = 3$, então $n(A \\cup B)$ é:', opts: ['$18$', '$15$', '$21$', '$13$'], correct: 1, chapter: 'operacoes-conjuntos' },
        { q: 'Qual número é irracional?', opts: ['$0{,}\\overline{12}$', '$\\sqrt{49}$', '$\\sqrt{7}$', '$\\frac{22}{7}$'], correct: 2, chapter: 'conjuntos-numericos' },
        { q: 'Com $A = [1, 5)$ e $B = (3, 7]$, $A \\cap B$ é:', opts: ['$[1, 7]$', '$(3, 5)$', '$[3, 5]$', '$(3, 5]$'], correct: 1, chapter: 'reais-intervalos' },
        { q: 'A solução de $x^2 - 9 < 0$ é:', opts: ['$x < 3$', '$(-3, 3)$', '$(-\\infty, -3) \\cup (3, +\\infty)$', '$x < \\pm 3$'], correct: 1, chapter: 'inequacoes' },
        { q: 'A solução de $|x - 2| \\le 1$ é:', opts: ['$[1, 3]$', '$(1, 3)$', '$[-1, 3]$', '$x \\le 3$'], correct: 0, chapter: 'modulo' }
    ],
    recommend(score, total, needs) {
        const base = ['logica', 'conjuntos', 'operacoes-conjuntos'];
        const calc = ['conjuntos-numericos', 'reais-intervalos', 'inequacoes', 'modulo'];
        if (score <= 3) return { path: 'completo-14', msg: 'Vale construir a base com calma, na ordem do livro.' };
        if (needs.length && needs.every(n => base.includes(n))) return { path: 'conjuntos-4', msg: 'Sua dificuldade está na linguagem de conjuntos e lógica. Foque nela.' };
        if (needs.some(n => calc.includes(n))) return { path: 'ponte-calculo', msg: 'Você tem boa base, mas números reais, inequações ou módulo ainda pesam. São exatamente os pré-requisitos do Cálculo.' };
        return { path: 'ponte-calculo', msg: 'Ótimo! Você está pronto. Revise rapidamente a ponte e siga para o Cálculo I.',
            extra: '<p class="small"><a href="../calculo-1/">Abrir o livro Cálculo I →</a></p>' };
    }
};
