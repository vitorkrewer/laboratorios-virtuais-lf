/* Livro Cálculo II: configuração, capítulos, trilhas e diagnóstico (lido por engine/app.js). */
window.MATH = window.MATH || {};

MATH.book = {
    id: 'calculo-2',
    title: 'Cálculo II',
    subtitle: 'Séries, várias variáveis e integrais múltiplas',
    icon: 'fa-cube',
    storage: 'mat.calc2',
    wikiTitle: 'Wiki de Cálculo II',
    labs: [
        { id: 'series', label: 'Séries', icon: 'fa-wave-square', name: 'Séries e Taylor' },
        { id: 'superficies', label: 'Superfícies', icon: 'fa-mountain', name: 'Superfícies, curvas de nível e gradiente' },
        { id: 'duplas', label: 'Duplas', icon: 'fa-cubes', name: 'Integrais duplas' }
    ],
    labsIntro: { title: 'Veja o cálculo em mais dimensões', text: 'Acompanhe somas parciais convergirem, veja polinômios de Taylor abraçarem funções, gire superfícies, siga o gradiente e empilhe colunas até chegar ao volume.' },
    home: {
        eyebrow: 'Cálculo II',
        titleHtml: 'Do infinito às superfícies. <em>O cálculo ganha dimensões.</em>',
        lead: 'Técnicas de integração e integrais impróprias, sequências, séries e polinômios de Taylor, funções de várias variáveis, derivadas parciais, gradiente, otimização com Lagrange e integrais duplas e triplas. Com <strong>erros comuns</strong> explicados, teoria gratuita, testes rápidos e simuladores.',
        labPitch: 'Digite qualquer f(x, y) e gire a superfície, compare com as curvas de nível, encontre pontos críticos, aumente o grau de Taylor e veja a soma de Riemann em colunas 3D.',
        formulas: [
            { label: 'TAYLOR', tex: 'f(x)=\\sum_{n=0}^{\\infty}\\frac{f^{(n)}(a)}{n!}(x-a)^n' },
            { label: 'GRADIENTE', tex: 'D_{\\vec u}f=\\nabla f\\cdot\\vec u' },
            { label: 'POLARES', tex: 'dA=r\\,dr\\,d\\theta' }
        ],
        mapKicker: 'O mapa do livro',
        mapTitle: 'Quatro blocos, do infinito ao espaço',
        map: [
            { color: 'sky', icon: 'fa-puzzle-piece', title: 'Integração', text: 'Frações parciais, substituição trigonométrica e integrais impróprias.', tex: '\\int_1^{\\infty}\\frac{dx}{x^p}', href: '#/teoria/tecnicas-integracao' },
            { color: 'indigo', icon: 'fa-wave-square', title: 'Séries', text: 'Sequências, testes de convergência e séries de Taylor.', tex: '\\sum \\frac{x^n}{n!}=e^x', href: '#/teoria/sequencias' },
            { color: 'emerald', icon: 'fa-mountain', title: 'Várias variáveis', text: 'Derivadas parciais, gradiente, máximos, mínimos e Lagrange.', tex: '\\nabla f=\\lambda\\nabla g', href: '#/teoria/varias-variaveis' },
            { color: 'amber', icon: 'fa-cubes', title: 'Integrais múltiplas', text: 'Integrais duplas e triplas, polares, cilíndricas e esféricas.', tex: '\\iint_D f\\,dA', href: '#/teoria/integrais-duplas' }
        ]
    },
    groups: [
        { id: 'integracao', title: 'Integração', icon: 'fa-puzzle-piece' },
        { id: 'series', title: 'Sequências e séries', icon: 'fa-wave-square' },
        { id: 'diferencial', title: 'Várias variáveis', icon: 'fa-mountain' },
        { id: 'multiplas', title: 'Integrais múltiplas', icon: 'fa-cubes' },
        { id: 'apoio', title: 'Apoio', icon: 'fa-life-ring' }
    ],
    chapters: [
        { id: 'tecnicas-integracao', file: 'content/01-tecnicas-integracao.md', group: 'integracao', minutes: 50,
          title: 'Mais técnicas de integração',
          summary: 'Frações parciais, substituição trigonométrica e um roteiro para escolher o método.' },
        { id: 'improprias', file: 'content/02-improprias.md', group: 'integracao', minutes: 40,
          title: 'Integrais impróprias',
          summary: 'Intervalos infinitos, integrandos ilimitados, p-integrais e testes de comparação.' },
        { id: 'sequencias', file: 'content/03-sequencias.md', group: 'series', minutes: 35,
          title: 'Sequências',
          summary: 'Limite de sequências, hierarquia de crescimento, confronto e sequências monótonas.' },
        { id: 'series', file: 'content/04-series.md', group: 'series', minutes: 55, lab: 'series',
          title: 'Séries numéricas e testes de convergência',
          summary: 'Somas parciais, geométrica, p-série, comparação, razão, raiz, Leibniz e um roteiro de testes.' },
        { id: 'taylor', file: 'content/05-taylor.md', group: 'series', minutes: 55, lab: 'series',
          title: 'Séries de potências e séries de Taylor',
          summary: 'Raio de convergência, séries de Maclaurin que valem decorar e o resto de Lagrange.' },
        { id: 'varias-variaveis', file: 'content/06-varias-variaveis.md', group: 'diferencial', minutes: 40, lab: 'superficies',
          title: 'Funções de várias variáveis',
          summary: 'Domínio, gráfico como superfície, curvas de nível e limites por caminhos.' },
        { id: 'derivadas-parciais', file: 'content/07-derivadas-parciais.md', group: 'diferencial', minutes: 50, lab: 'superficies',
          title: 'Derivadas parciais, plano tangente e regra da cadeia',
          summary: 'Parciais de primeira e segunda ordem, linearização, diferencial e regra da cadeia.' },
        { id: 'gradiente', file: 'content/08-gradiente.md', group: 'diferencial', minutes: 40, lab: 'superficies',
          title: 'Gradiente e derivada direcional',
          summary: 'Direção de maior crescimento, perpendicularidade às curvas de nível e planos tangentes.' },
        { id: 'otimizacao', file: 'content/09-otimizacao.md', group: 'diferencial', minutes: 55, lab: 'superficies',
          title: 'Máximos, mínimos e multiplicadores de Lagrange',
          summary: 'Pontos críticos, teste da hessiana, extremos em regiões fechadas e otimização com restrição.' },
        { id: 'integrais-duplas', file: 'content/10-integrais-duplas.md', group: 'multiplas', minutes: 50, lab: 'duplas',
          title: 'Integrais duplas',
          summary: 'Somas de Riemann, Fubini, regiões entre curvas e inversão da ordem de integração.' },
        { id: 'polares-aplicacoes', file: 'content/11-polares-aplicacoes.md', group: 'multiplas', minutes: 45, lab: 'duplas',
          title: 'Integrais duplas em polares e aplicações',
          summary: 'O fator r, a integral de Gauss, massa, centro de massa e probabilidade.' },
        { id: 'integrais-triplas', file: 'content/12-integrais-triplas.md', group: 'multiplas', minutes: 50,
          title: 'Integrais triplas: cilíndricas e esféricas',
          summary: 'Volumes e massas, coordenadas cilíndricas e esféricas e o jacobiano.' },
        { id: 'resumo', file: 'content/13-resumo.md', group: 'apoio', minutes: 20,
          title: 'Resumo, formulário e erros comuns',
          summary: 'Todas as fórmulas numa página e os 10 erros que mais custam pontos em prova.' }
    ],
    paths: [
        {
            id: 'prova-12', icon: 'fa-bolt', color: 'amber',
            title: 'Prova chegando',
            duration: '12 dias · ~2 h/dia',
            audience: 'Está cursando Cálculo II e precisa dominar o conteúdo típico das provas.',
            steps: [
                { day: 'Dia 1', chapter: 'tecnicas-integracao', task: 'Frações parciais e substituição trigonométrica. Faça os exercícios sem olhar a tabela.' },
                { day: 'Dia 2', chapter: 'improprias', task: 'Integrais impróprias e p-integrais. Procure a assíntota antes de integrar.' },
                { day: 'Dia 3', chapter: 'series', lab: 'series', task: 'Geométrica, p-série e termo geral. Veja as somas parciais no simulador.' },
                { day: 'Dia 4', chapter: 'series', task: 'Comparação, razão, raiz e Leibniz. Aplique o roteiro de testes em cada exercício.' },
                { day: 'Dia 5', chapter: 'taylor', lab: 'series', task: 'Raio de convergência e séries de Maclaurin.' },
                { day: 'Dia 6', chapter: 'derivadas-parciais', lab: 'superficies', task: 'Parciais, plano tangente e regra da cadeia (revise antes o capítulo 6).' },
                { day: 'Dia 7', chapter: 'gradiente', lab: 'superficies', task: 'Gradiente e derivada direcional. Não esqueça de normalizar o vetor.' },
                { day: 'Dia 8', chapter: 'otimizacao', lab: 'superficies', task: 'Pontos críticos e teste da hessiana.' },
                { day: 'Dia 9', chapter: 'otimizacao', task: 'Multiplicadores de Lagrange.' },
                { day: 'Dia 10', chapter: 'integrais-duplas', lab: 'duplas', task: 'Fubini, regiões entre curvas e inversão da ordem. Desenhe sempre a região.' },
                { day: 'Dia 11', chapter: 'polares-aplicacoes', task: 'Polares (o fator r!) e depois triplas em cilíndricas e esféricas (capítulo 12).' },
                { day: 'Dia 12', chapter: 'resumo', task: 'Formulário e erros comuns. Refaça os testes rápidos.' }
            ]
        },
        {
            id: 'completo-26', icon: 'fa-seedling', color: 'emerald',
            title: 'Cálculo II completo',
            duration: '26 dias · ~1 h/dia',
            audience: 'Quer estudar com calma, na ordem do livro, entendendo de onde vem cada fórmula.',
            steps: [
                { day: 'Dias 1–2', chapter: 'tecnicas-integracao', task: 'Frações parciais e substituição trigonométrica.' },
                { day: 'Dias 3–4', chapter: 'improprias', task: 'Integrais impróprias.' },
                { day: 'Dia 5', chapter: 'sequencias', task: 'Sequências e seus limites.' },
                { day: 'Dias 6–8', chapter: 'series', lab: 'series', task: 'Séries e testes de convergência.' },
                { day: 'Dias 9–10', chapter: 'taylor', lab: 'series', task: 'Séries de potências e Taylor.' },
                { day: 'Dias 11–12', chapter: 'varias-variaveis', lab: 'superficies', task: 'Funções de várias variáveis e curvas de nível.' },
                { day: 'Dias 13–14', chapter: 'derivadas-parciais', lab: 'superficies', task: 'Derivadas parciais e plano tangente.' },
                { day: 'Dia 15', chapter: 'gradiente', lab: 'superficies', task: 'Gradiente e derivada direcional.' },
                { day: 'Dias 16–17', chapter: 'otimizacao', lab: 'superficies', task: 'Máximos, mínimos e Lagrange.' },
                { day: 'Dias 18–19', chapter: 'integrais-duplas', lab: 'duplas', task: 'Integrais duplas.' },
                { day: 'Dias 20–21', chapter: 'polares-aplicacoes', lab: 'duplas', task: 'Polares e aplicações.' },
                { day: 'Dias 22–24', chapter: 'integrais-triplas', task: 'Integrais triplas.' },
                { day: 'Dias 25–26', chapter: 'resumo', task: 'Revisão geral e erros comuns.' }
            ]
        },
        {
            id: 'varias-8', icon: 'fa-mountain', color: 'indigo',
            title: 'Só várias variáveis',
            duration: '8 dias · ~1 h/dia',
            audience: 'Já viu séries (ou não precisa delas) e quer focar em derivadas parciais, otimização e integrais múltiplas.',
            steps: [
                { day: 'Dia 1', chapter: 'varias-variaveis', lab: 'superficies', task: 'Superfícies e curvas de nível: gire os exemplos no simulador.' },
                { day: 'Dia 2', chapter: 'derivadas-parciais', lab: 'superficies', task: 'Derivadas parciais e plano tangente.' },
                { day: 'Dia 3', chapter: 'gradiente', lab: 'superficies', task: 'Gradiente e derivada direcional.' },
                { day: 'Dia 4', chapter: 'otimizacao', lab: 'superficies', task: 'Hessiana e Lagrange.' },
                { day: 'Dia 5', chapter: 'integrais-duplas', lab: 'duplas', task: 'Integrais duplas e Fubini.' },
                { day: 'Dia 6', chapter: 'polares-aplicacoes', lab: 'duplas', task: 'Polares e aplicações.' },
                { day: 'Dia 7', chapter: 'integrais-triplas', task: 'Integrais triplas.' },
                { day: 'Dia 8', chapter: 'resumo', task: 'Revisão da segunda metade do formulário.' }
            ]
        },
        {
            id: 'series-5', icon: 'fa-wave-square', color: 'sky',
            title: 'Só séries',
            duration: '5 dias · ~1 h/dia',
            audience: 'Precisa de séries para Equações Diferenciais, Física ou Computação e quer ir direto ao ponto.',
            steps: [
                { day: 'Dia 1', chapter: 'sequencias', task: 'Limites de sequências e hierarquia de crescimento.' },
                { day: 'Dia 2', chapter: 'series', lab: 'series', task: 'Geométrica, p-série e o roteiro de testes.' },
                { day: 'Dia 3', chapter: 'series', task: 'Razão, raiz, Leibniz e convergência absoluta.' },
                { day: 'Dia 4', chapter: 'taylor', lab: 'series', task: 'Taylor, raio de convergência e as séries que valem decorar.' },
                { day: 'Dia 5', chapter: 'resumo', task: 'Erros comuns sobre séries e o formulário.' }
            ]
        }
    ],
    diagnostic: [
        { q: 'Para integrar $\\dfrac{1}{x^2 - 1}$, o método natural é:', opts: ['integração por partes', 'frações parciais', 'substituição trigonométrica', 'não tem primitiva'], correct: 1, chapter: 'tecnicas-integracao' },
        { q: '$\\displaystyle\\int_1^{\\infty} \\frac{dx}{x^2}$ vale:', opts: ['diverge', '$\\frac12$', '$1$', '$2$'], correct: 2, chapter: 'improprias' },
        { q: '$\\displaystyle\\sum_{n=0}^{\\infty} \\left(\\frac13\\right)^n$ vale:', opts: ['$\\frac13$', '$\\frac32$', '$3$', 'diverge'], correct: 1, chapter: 'series' },
        { q: 'A série $\\sum \\frac{1}{n}$:', opts: ['converge para $1$', 'converge para $\\ln 2$', 'diverge', 'converge para $\\frac{\\pi^2}{6}$'], correct: 2, chapter: 'series' },
        { q: 'O coeficiente de $x^2$ na série de Maclaurin de $\\cos x$ é:', opts: ['$\\frac12$', '$-\\frac12$', '$1$', '$0$'], correct: 1, chapter: 'taylor' },
        { q: 'Para $f(x, y) = x^2 y + y^3$, $f_y$ vale:', opts: ['$2xy$', '$x^2 + 3y^2$', '$2xy + 3y^2$', '$x^2$'], correct: 1, chapter: 'derivadas-parciais' },
        { q: 'Num ponto crítico com $f_{xx} = 1$, $f_{yy} = 1$ e $f_{xy} = 2$, há:', opts: ['mínimo local', 'máximo local', 'ponto de sela', 'nada se pode dizer'], correct: 2, chapter: 'otimizacao' },
        { q: 'Em coordenadas polares, $dA$ é:', opts: ['$dr\\,d\\theta$', '$r\\,dr\\,d\\theta$', '$r^2\\,dr\\,d\\theta$', '$\\theta\\,dr\\,d\\theta$'], correct: 1, chapter: 'polares-aplicacoes' }
    ],
    recommend(score, total, needs) {
        if (score <= 3) return { path: 'completo-26', msg: 'Vale construir a base com calma, na ordem do livro.',
            extra: '<p class="small">Derivadas e integrais do Cálculo I enferrujadas? Revise antes o <a href="../calculo-1/#/teoria/regras-derivacao">Cálculo I →</a></p>' };
        if (needs.length) return { path: 'prova-12', msg: 'Você tem base, mas há lacunas em temas que caem em toda prova. A trilha de 12 dias cobre todos eles.' };
        return { path: 'varias-8', msg: 'Excelente! Você domina o essencial. Aprofunde-se em várias variáveis e integrais múltiplas, ou siga a trilha "Só séries" se é isso que seu curso cobra.' };
    }
};
