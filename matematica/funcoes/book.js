/* Livro Funções: configuração, capítulos, trilhas e diagnóstico (lido por engine/app.js). */
window.MATH = window.MATH || {};

MATH.book = {
    id: 'funcoes',
    title: 'Funções',
    subtitle: 'Gráficos, modelos e transformações',
    icon: 'fa-chart-line',
    storage: 'mat.func',
    wikiTitle: 'Wiki de Funções',
    labs: [
        { id: 'transformacoes', label: 'Transformações', icon: 'fa-up-down-left-right', name: 'Simulador de transformações' },
        { id: 'familias', label: 'Afim e quadrática', icon: 'fa-bezier-curve', name: 'Simulador de afim e quadrática' },
        { id: 'inversa', label: 'Composta e inversa', icon: 'fa-arrow-right-arrow-left', name: 'Simulador de composta e inversa' }
    ],
    labsIntro: { title: 'Mexa nos parâmetros, veja o gráfico', text: 'Desloque, estique e reflita gráficos; explore retas e parábolas; componha e inverta funções, inclusive as que você digitar.' },
    home: {
        eyebrow: 'Funções elementares',
        titleHtml: 'Domine as funções e o Cálculo <em>passa a fazer sentido.</em>',
        lead: 'Conceito, gráficos e transformações, afim e quadrática, composta e inversa, exponencial, logaritmo e trigonométricas: as funções com que o Cálculo trabalha o tempo todo. Teoria gratuita, testes rápidos e simuladores.',
        labPitch: 'Transforme gráficos com parâmetros, explore vértices e raízes e veja a inversa como reflexo na reta y = x.',
        formulas: [
            { label: 'TRANSFORMAÇÕES', tex: 'y = a\\,f\\big(b(x-h)\\big)+k' },
            { label: 'VÉRTICE', tex: 'x_v = -\\frac{b}{2a},\\quad y_v = -\\frac{\\Delta}{4a}' },
            { label: 'LOGARITMO', tex: '\\log_a x = y \\iff a^y = x' }
        ],
        mapKicker: 'O mapa do livro',
        mapTitle: 'Quatro blocos de funções',
        map: [
            { color: 'sky', icon: 'fa-diagram-next', title: 'Conceito e gráficos', text: 'Domínio, imagem, gráfico e transformações $a\\,f(b(x-h))+k$.', tex: 'f: A \\to B', href: '#/teoria/conceito' },
            { color: 'indigo', icon: 'fa-bezier-curve', title: 'Polinomiais', text: 'Afim e quadrática: retas, parábolas, vértice e otimização.', tex: 'ax^2+bx+c', href: '#/teoria/quadratica' },
            { color: 'emerald', icon: 'fa-arrow-trend-up', title: 'Exponencial e log', text: 'Crescimento, decaimento e a incógnita no expoente.', tex: 'e^{\\ln x} = x', href: '#/teoria/exponencial' },
            { color: 'amber', icon: 'fa-wave-square', title: 'Trigonométricas', text: 'Radianos, senoides, período e inversas.', tex: '\\sin^2 x + \\cos^2 x = 1', href: '#/teoria/trigonometricas' }
        ]
    },
    groups: [
        { id: 'base', title: 'Conceito e gráficos', icon: 'fa-diagram-next' },
        { id: 'polinomiais', title: 'Afim e quadrática', icon: 'fa-bezier-curve' },
        { id: 'operacoes', title: 'Composição e inversa', icon: 'fa-arrow-right-arrow-left' },
        { id: 'transcendentes', title: 'Exponencial, log e trigonométricas', icon: 'fa-wave-square' },
        { id: 'apoio', title: 'Apoio', icon: 'fa-life-ring' }
    ],
    chapters: [
        { id: 'conceito', file: 'content/01-conceito.md', group: 'base', minutes: 40,
          title: 'Conceito de função',
          summary: 'Domínio, contradomínio, imagem, domínio natural, gráfico, funções por partes, paridade.' },
        { id: 'transformacoes', file: 'content/02-transformacoes.md', group: 'base', minutes: 40, lab: 'transformacoes',
          title: 'Gráficos e transformações',
          summary: 'Gráficos básicos, translações, reflexões e dilatações: y = a·f(b(x − h)) + k.' },
        { id: 'afim', file: 'content/03-afim.md', group: 'polinomiais', minutes: 35, lab: 'familias',
          title: 'Função afim',
          summary: 'Coeficientes, taxa de variação, reta por dois pontos, raiz, sinal e modelagem.' },
        { id: 'quadratica', file: 'content/04-quadratica.md', group: 'polinomiais', minutes: 50, lab: 'familias',
          title: 'Função quadrática',
          summary: 'Raízes e discriminante, vértice, forma canônica, sinal e problemas de máximo e mínimo.' },
        { id: 'composta-inversa', file: 'content/05-composta-inversa.md', group: 'operacoes', minutes: 45, lab: 'inversa',
          title: 'Função composta e inversa',
          summary: 'Composição e decomposição, injetora e bijetora, inversa e seu gráfico.' },
        { id: 'exponencial', file: 'content/06-exponencial.md', group: 'transcendentes', minutes: 40,
          title: 'Função exponencial',
          summary: 'Propriedades, gráfico, o número e, equações e inequações e modelos de crescimento.' },
        { id: 'logaritmo', file: 'content/07-logaritmo.md', group: 'transcendentes', minutes: 50,
          title: 'Logaritmo e função logarítmica',
          summary: 'Definição, propriedades, mudança de base, gráfico, equações e inequações.' },
        { id: 'trigonometricas', file: 'content/08-trigonometricas.md', group: 'transcendentes', minutes: 50, lab: 'transformacoes',
          title: 'Funções trigonométricas',
          summary: 'Radianos, círculo trigonométrico, seno, cosseno, tangente, senoides e inversas.' },
        { id: 'resumo', file: 'content/09-resumo.md', group: 'apoio', minutes: 15,
          title: 'Resumo e erros comuns',
          summary: 'Catálogo de funções, transformações, fórmulas-chave e erros mais frequentes.' }
    ],
    paths: [
        {
            id: 'ponte-calculo', icon: 'fa-bolt', color: 'amber',
            title: 'Funções para o Cálculo',
            duration: '6 dias · ~1,5 h/dia',
            audience: 'Vai cursar ou já está em Cálculo I e precisa das funções que ele usa o tempo todo.',
            steps: [
                { day: 'Dia 1', chapter: 'conceito', task: 'Domínio natural e a conta $f(x+h)$: aparecem na derivada.' },
                { day: 'Dia 2', chapter: 'transformacoes', lab: 'transformacoes', task: 'Esboce gráficos por transformação, sem tabela de valores.' },
                { day: 'Dia 3', chapter: 'composta-inversa', lab: 'inversa', task: 'Decompor funções em "de fora" e "de dentro": é a regra da cadeia.' },
                { day: 'Dia 4', chapter: 'exponencial', task: 'Propriedades de $e^x$ e equações exponenciais.' },
                { day: 'Dia 5', chapter: 'logaritmo', task: 'Propriedades de $\\ln$: usadas em derivadas e integrais.' },
                { day: 'Dia 6', chapter: 'trigonometricas', lab: 'transformacoes', task: 'Radianos, valores notáveis e gráficos de seno e cosseno.' }
            ]
        },
        {
            id: 'completo-14', icon: 'fa-seedling', color: 'emerald',
            title: 'Funções completo',
            duration: '14 dias · ~1 h/dia',
            audience: 'Quer aprender todas as funções elementares com calma, na ordem do livro.',
            steps: [
                { day: 'Dias 1–2', chapter: 'conceito', task: 'Definição, domínio, imagem e gráficos.' },
                { day: 'Dias 3–4', chapter: 'transformacoes', lab: 'transformacoes', task: 'Translações, reflexões e dilatações.' },
                { day: 'Dia 5', chapter: 'afim', lab: 'familias', task: 'Retas, taxa de variação e modelagem.' },
                { day: 'Dias 6–7', chapter: 'quadratica', lab: 'familias', task: 'Parábolas, vértice e otimização.' },
                { day: 'Dia 8', chapter: 'composta-inversa', lab: 'inversa', task: 'Composição e inversa.' },
                { day: 'Dias 9–10', chapter: 'exponencial', task: 'Exponencial e modelos.' },
                { day: 'Dias 11–12', chapter: 'logaritmo', task: 'Logaritmos, equações e inequações.' },
                { day: 'Dia 13', chapter: 'trigonometricas', lab: 'transformacoes', task: 'Funções trigonométricas.' },
                { day: 'Dia 14', chapter: 'resumo', task: 'Revisão geral e erros comuns.' }
            ]
        },
        {
            id: 'exp-log-trig', icon: 'fa-wave-square', color: 'indigo',
            title: 'Exponencial, log e trigonometria',
            duration: '5 dias · ~1,5 h/dia',
            audience: 'Já domina afim e quadrática e trava nas funções transcendentes.',
            steps: [
                { day: 'Dias 1–2', chapter: 'exponencial', task: 'Propriedades, gráfico e equações exponenciais.' },
                { day: 'Dias 3–4', chapter: 'logaritmo', task: 'Logaritmos: definição, propriedades e condição de existência.' },
                { day: 'Dia 5', chapter: 'trigonometricas', lab: 'transformacoes', task: 'Radianos, senoides e inversas trigonométricas.' }
            ]
        }
    ],
    diagnostic: [
        { q: 'Qual é o domínio de $f(x) = \\sqrt{x - 4}$?', opts: ['$\\mathbb{R}$', '$(4, +\\infty)$', '$[4, +\\infty)$', '$[0, +\\infty)$'], correct: 2, chapter: 'conceito' },
        { q: 'O gráfico de $y = (x - 2)^2 + 3$ é o de $x^2$ deslocado:', opts: ['2 para a esquerda e 3 para cima', '2 para a direita e 3 para cima', '2 para a direita e 3 para baixo', '3 para a direita e 2 para cima'], correct: 1, chapter: 'transformacoes' },
        { q: 'A inclinação da reta por $(0, 1)$ e $(2, 7)$ é:', opts: ['$3$', '$4$', '$\\frac13$', '$6$'], correct: 0, chapter: 'afim' },
        { q: 'O valor mínimo de $f(x) = x^2 - 6x + 10$ é:', opts: ['$10$', '$3$', '$1$', '$-1$'], correct: 2, chapter: 'quadratica' },
        { q: 'A inversa de $f(x) = 3x - 6$ é:', opts: ['$\\frac{1}{3x - 6}$', '$\\frac{x}{3} + 2$', '$3x + 6$', '$\\frac{x - 6}{3}$'], correct: 1, chapter: 'composta-inversa' },
        { q: 'Quanto vale $\\log_2 32$?', opts: ['$16$', '$5$', '$6$', '$\\frac{1}{5}$'], correct: 1, chapter: 'logaritmo' },
        { q: 'Qual é o período de $y = \\sin(2x)$?', opts: ['$2\\pi$', '$4\\pi$', '$\\pi$', '$\\frac{\\pi}{2}$'], correct: 2, chapter: 'trigonometricas' }
    ],
    recommend(score, total, needs) {
        const trans = ['logaritmo', 'trigonometricas', 'exponencial'];
        if (score <= 3) return { path: 'completo-14', msg: 'Vale estudar as funções com calma, na ordem do livro.',
            extra: '<p class="small">Se domínio e intervalos pesarem, revise antes o livro <a href="../fundamentos/">Fundamentos</a>.</p>' };
        if (needs.length && needs.every(n => trans.includes(n))) return { path: 'exp-log-trig', msg: 'Sua base em funções é boa; o ponto fraco são as transcendentes.' };
        if (needs.length) return { path: 'ponte-calculo', msg: 'Você tem boa base, mas há lacunas nas funções que o Cálculo mais usa.' };
        return { path: 'ponte-calculo', msg: 'Ótimo! Revise a trilha rápida e siga para o Cálculo I.',
            extra: '<p class="small"><a href="../calculo-1/">Abrir o livro Cálculo I →</a></p>' };
    }
};
