/* Livro Probabilidade e Estatística: configuração, capítulos, trilhas e diagnóstico (lido por engine/app.js). */
window.MATH = window.MATH || {};

MATH.book = {
    id: 'probabilidade',
    title: 'Probabilidade e Estatística',
    subtitle: 'Incerteza, dados e decisões',
    icon: 'fa-dice',
    storage: 'mat.prob',
    wikiTitle: 'Wiki de Probabilidade e Estatística',
    labs: [
        { id: 'descritiva', label: 'Descritiva', icon: 'fa-chart-column', name: 'Estatística descritiva' },
        { id: 'binomial', label: 'Binomial', icon: 'fa-coins', name: 'Binomial e Poisson' },
        { id: 'normal', label: 'Normal', icon: 'fa-bell', name: 'Normal e TCL' },
        { id: 'bayes', label: 'Bayes', icon: 'fa-vial-circle-check', name: 'Bayes: testes e falsos positivos' }
    ],
    labsIntro: { title: 'Veja o acaso em ação', text: 'Resuma dados reais, lance milhares de moedas virtuais, pinte áreas sob o sino, veja o Teorema Central do Limite acontecer e conte falsos positivos.' },
    home: {
        eyebrow: 'Probabilidade e Estatística',
        titleHtml: 'Aprenda a pensar com dados. <em>E a não ser enganado por eles.</em>',
        lead: 'Estatística descritiva, contagem, probabilidade, Bayes, distribuições binomial, Poisson e normal, Teorema Central do Limite, intervalos de confiança, testes de hipóteses e regressão. Com os <strong>erros de raciocínio</strong> mais comuns explicados, teoria gratuita, testes rápidos e simuladores.',
        labPitch: 'Mude dados e veja média e mediana reagirem, simule experimentos, confira a regra 68–95–99,7 e descubra por que um teste "99% preciso" pode errar mais do que acerta.',
        formulas: [
            { label: 'CONDICIONAL', tex: 'P(A\\mid B)=\\dfrac{P(A\\cap B)}{P(B)}' },
            { label: 'BINOMIAL', tex: '\\binom{n}{k}p^k(1-p)^{n-k}' },
            { label: 'TCL', tex: '\\bar X\\approx N\\!\\left(\\mu,\\tfrac{\\sigma^2}{n}\\right)' }
        ],
        mapKicker: 'O mapa do livro',
        mapTitle: 'Quatro blocos, dos dados às decisões',
        map: [
            { color: 'sky', icon: 'fa-chart-column', title: 'Descrever', text: 'Tipos de dados, gráficos, média, mediana, desvio padrão.', tex: 's^2=\\frac{\\sum(x_i-\\bar x)^2}{n-1}', href: '#/teoria/dados-graficos' },
            { color: 'indigo', icon: 'fa-dice', title: 'Probabilidade', text: 'Contagem, regras, condicional, independência e Bayes.', tex: 'P(A^c)=1-P(A)', href: '#/teoria/probabilidade' },
            { color: 'emerald', icon: 'fa-bell', title: 'Distribuições', text: 'Variáveis aleatórias, binomial, Poisson e normal.', tex: 'E[X]=\\sum x\\,P(x)', href: '#/teoria/variaveis-aleatorias' },
            { color: 'amber', icon: 'fa-magnifying-glass-chart', title: 'Inferência', text: 'TCL, intervalos de confiança, testes e regressão.', tex: '\\bar x\\pm 1{,}96\\frac{s}{\\sqrt n}', href: '#/teoria/amostragem-ic' }
        ]
    },
    groups: [
        { id: 'descritiva', title: 'Estatística descritiva', icon: 'fa-chart-column' },
        { id: 'prob', title: 'Probabilidade', icon: 'fa-dice' },
        { id: 'dist', title: 'Distribuições', icon: 'fa-bell' },
        { id: 'inferencia', title: 'Inferência', icon: 'fa-magnifying-glass-chart' },
        { id: 'apoio', title: 'Apoio', icon: 'fa-life-ring' }
    ],
    chapters: [
        { id: 'dados-graficos', file: 'content/01-dados-graficos.md', group: 'descritiva', minutes: 30, lab: 'descritiva',
          title: 'Dados, variáveis e gráficos',
          summary: 'População e amostra, tipos de variáveis, tabelas de frequência, histograma e formas de distribuição.' },
        { id: 'medidas', file: 'content/02-medidas.md', group: 'descritiva', minutes: 45, lab: 'descritiva',
          title: 'Medidas de posição e de dispersão',
          summary: 'Média, mediana, moda, variância, desvio padrão, quartis, boxplot e escore z.' },
        { id: 'contagem', file: 'content/03-contagem.md', group: 'prob', minutes: 45,
          title: 'Análise combinatória: contar sem listar',
          summary: 'Princípio multiplicativo, fatorial, permutações, arranjos, combinações e triângulo de Pascal.' },
        { id: 'probabilidade', file: 'content/04-probabilidade.md', group: 'prob', minutes: 40,
          title: 'Probabilidade: as regras básicas',
          summary: 'Espaço amostral, eventos, probabilidade clássica, complemento e regra da soma.' },
        { id: 'condicional', file: 'content/05-condicional.md', group: 'prob', minutes: 45, lab: 'bayes',
          title: 'Probabilidade condicional e independência',
          summary: 'Condicional, regra do produto, independência, árvores e probabilidade total.' },
        { id: 'bayes', file: 'content/06-bayes.md', group: 'prob', minutes: 40, lab: 'bayes',
          title: 'Teorema de Bayes',
          summary: 'Inverter a condicional, testes diagnósticos, falsos positivos e frequências naturais.' },
        { id: 'variaveis-aleatorias', file: 'content/07-variaveis-aleatorias.md', group: 'dist', minutes: 40,
          title: 'Variáveis aleatórias discretas',
          summary: 'Distribuição de probabilidade, esperança, variância e suas propriedades.' },
        { id: 'binomial', file: 'content/08-binomial.md', group: 'dist', minutes: 45, lab: 'binomial',
          title: 'Distribuições binomial e de Poisson',
          summary: 'Ensaios de Bernoulli, fórmula binomial, média np e contagens de eventos raros.' },
        { id: 'normal', file: 'content/09-normal.md', group: 'dist', minutes: 50, lab: 'normal',
          title: 'Variáveis contínuas e a distribuição normal',
          summary: 'Densidade, regra 68–95–99,7, padronização, tabela z e aproximação da binomial.' },
        { id: 'amostragem-ic', file: 'content/10-amostragem-ic.md', group: 'inferencia', minutes: 50, lab: 'normal',
          title: 'Amostragem, TCL e intervalos de confiança',
          summary: 'Teorema Central do Limite, erro padrão, intervalos para média e proporção, margem de erro.' },
        { id: 'testes-hipoteses', file: 'content/11-testes-hipoteses.md', group: 'inferencia', minutes: 45,
          title: 'Testes de hipóteses',
          summary: 'Hipóteses nula e alternativa, p-valor, significância, erros tipo I e II.' },
        { id: 'correlacao-regressao', file: 'content/12-correlacao-regressao.md', group: 'inferencia', minutes: 40,
          title: 'Correlação e regressão linear',
          summary: 'Dispersão, coeficiente r, correlação versus causalidade e reta de mínimos quadrados.' },
        { id: 'resumo', file: 'content/13-resumo.md', group: 'apoio', minutes: 20,
          title: 'Resumo, formulário e erros comuns',
          summary: 'Todas as fórmulas, qual ferramenta usar e os 15 erros de raciocínio mais frequentes.' }
    ],
    paths: [
        {
            id: 'prova-10', icon: 'fa-bolt', color: 'amber',
            title: 'Prova chegando',
            duration: '10 dias · ~2 h/dia',
            audience: 'Está cursando Probabilidade e Estatística e precisa dominar o conteúdo típico das provas.',
            steps: [
                { day: 'Dia 1', chapter: 'medidas', lab: 'descritiva', task: 'Média, mediana, desvio padrão e quartis. Calcule à mão e confira no simulador.' },
                { day: 'Dia 2', chapter: 'contagem', task: 'Arranjo ou combinação? Faça o teste da troca de ordem em cada exercício.' },
                { day: 'Dia 3', chapter: 'probabilidade', task: 'Regras básicas; "pelo menos um" pelo complemento.' },
                { day: 'Dia 4', chapter: 'condicional', task: 'Condicional, independência e árvores.' },
                { day: 'Dia 5', chapter: 'bayes', lab: 'bayes', task: 'Bayes com frequências naturais (pense em 10.000 pessoas).' },
                { day: 'Dia 6', chapter: 'variaveis-aleatorias', task: 'Esperança e variância de variáveis discretas.' },
                { day: 'Dia 7', chapter: 'binomial', lab: 'binomial', task: 'Binomial e Poisson: reconheça as condições antes de aplicar a fórmula.' },
                { day: 'Dia 8', chapter: 'normal', lab: 'normal', task: 'Padronização e tabela z. Desenhe o sino em cada questão.' },
                { day: 'Dia 9', chapter: 'amostragem-ic', lab: 'normal', task: 'TCL e intervalos de confiança. Depois, testes de hipóteses (capítulo 11).' },
                { day: 'Dia 10', chapter: 'resumo', task: 'Formulário e os 15 erros comuns. Refaça os testes rápidos.' }
            ]
        },
        {
            id: 'completa-24', icon: 'fa-seedling', color: 'emerald',
            title: 'Probabilidade e Estatística completa',
            duration: '24 dias · ~1 h/dia',
            audience: 'Quer aprender com calma, na ordem do livro, entendendo a lógica de cada ferramenta.',
            steps: [
                { day: 'Dias 1–2', chapter: 'dados-graficos', lab: 'descritiva', task: 'Tipos de dados e gráficos.' },
                { day: 'Dias 3–4', chapter: 'medidas', lab: 'descritiva', task: 'Medidas de posição e dispersão.' },
                { day: 'Dias 5–6', chapter: 'contagem', task: 'Análise combinatória.' },
                { day: 'Dia 7', chapter: 'probabilidade', task: 'Regras de probabilidade.' },
                { day: 'Dias 8–9', chapter: 'condicional', task: 'Condicional e independência.' },
                { day: 'Dia 10', chapter: 'bayes', lab: 'bayes', task: 'Teorema de Bayes.' },
                { day: 'Dia 11', chapter: 'variaveis-aleatorias', task: 'Variáveis aleatórias discretas.' },
                { day: 'Dias 12–13', chapter: 'binomial', lab: 'binomial', task: 'Binomial e Poisson.' },
                { day: 'Dias 14–15', chapter: 'normal', lab: 'normal', task: 'A distribuição normal.' },
                { day: 'Dias 16–18', chapter: 'amostragem-ic', lab: 'normal', task: 'TCL e intervalos de confiança.' },
                { day: 'Dias 19–20', chapter: 'testes-hipoteses', task: 'Testes de hipóteses.' },
                { day: 'Dias 21–22', chapter: 'correlacao-regressao', task: 'Correlação e regressão.' },
                { day: 'Dias 23–24', chapter: 'resumo', task: 'Revisão geral e erros comuns.' }
            ]
        },
        {
            id: 'cidadao-5', icon: 'fa-newspaper', color: 'indigo',
            title: 'Estatística para ler notícias',
            duration: '5 dias · ~45 min/dia',
            audience: 'Não está numa disciplina, mas quer entender pesquisas, exames médicos e manchetes sem ser enganado.',
            steps: [
                { day: 'Dia 1', chapter: 'medidas', lab: 'descritiva', task: 'Média ou mediana? Por que "salário médio" engana.' },
                { day: 'Dia 2', chapter: 'bayes', lab: 'bayes', task: 'Falsos positivos em exames: o erro mais caro da probabilidade.' },
                { day: 'Dia 3', chapter: 'amostragem-ic', task: 'Margem de erro de pesquisas eleitorais e viés de seleção.' },
                { day: 'Dia 4', chapter: 'correlacao-regressao', task: 'Correlação não é causalidade.' },
                { day: 'Dia 5', chapter: 'resumo', task: 'Os 15 erros comuns: reconheça-os nas notícias da semana.' }
            ]
        }
    ],
    diagnostic: [
        { q: 'A mediana de $2, 9, 4, 7, 3$ é:', opts: ['$5$', '$4$', '$7$', '$3$'], correct: 1, chapter: 'medidas' },
        { q: 'De quantas maneiras escolher 3 pessoas (sem cargos) entre 6?', opts: ['$120$', '$18$', '$20$', '$216$'], correct: 2, chapter: 'contagem' },
        { q: 'Lançando 3 moedas, a probabilidade de pelo menos uma cara é:', opts: ['$\\frac12$', '$\\frac38$', '$\\frac78$', '$\\frac34$'], correct: 2, chapter: 'probabilidade' },
        { q: 'Se $P(A \\cap B) = 0{,}1$ e $P(B) = 0{,}4$, então $P(A \\mid B)$ é:', opts: ['$0{,}04$', '$0{,}25$', '$0{,}5$', '$0{,}4$'], correct: 1, chapter: 'condicional' },
        { q: 'Doença com prevalência 1%; teste com sensibilidade 99% e 5% de falsos positivos. Um positivo indica doença com chance de aproximadamente:', opts: ['$99\\%$', '$95\\%$', '$50\\%$', '$17\\%$'], correct: 3, chapter: 'bayes' },
        { q: 'Se $X \\sim B(20;\\ 0{,}4)$, então $E[X]$ é:', opts: ['$8$', '$4{,}8$', '$12$', '$0{,}4$'], correct: 0, chapter: 'binomial' },
        { q: 'Numa normal, a porcentagem de valores a menos de 2 desvios padrão da média é cerca de:', opts: ['$68\\%$', '$95\\%$', '$99{,}7\\%$', '$50\\%$'], correct: 1, chapter: 'normal' },
        { q: 'Para reduzir o erro padrão da média à metade, a amostra deve ser:', opts: ['dobrada', 'quadruplicada', 'reduzida à metade', 'multiplicada por $\\sqrt2$'], correct: 1, chapter: 'amostragem-ic' }
    ],
    recommend(score, total, needs) {
        if (score <= 3) return { path: 'completa-24', msg: 'Vale construir a base com calma, na ordem do livro.',
            extra: '<p class="small">Frações e porcentagem enferrujadas? Revise antes a <a href="../algebra/#/teoria/fracoes">Álgebra elementar →</a></p>' };
        if (needs.length) return { path: 'prova-10', msg: 'Você tem base, mas há lacunas em temas que caem em toda prova. A trilha de 10 dias cobre todos eles.' };
        return { path: 'cidadao-5', msg: 'Excelente! Você domina o essencial. A trilha "Estatística para ler notícias" aprofunda o uso crítico, ou siga para os testes de hipóteses e a regressão.' };
    }
};
