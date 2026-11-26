/* Catálogo do ecossistema de Matemática: fonte única para o hub, o mapa de
   pré-requisitos e os links "antes/depois" de cada livro.
   status: 'disponivel' | 'em-breve' | 'planejado'
   requires: ids dos livros que devem vir antes (arestas do mapa).
   storage: prefixo das chaves de progresso no localStorage (igual ao book.js). */
window.MATH = window.MATH || {};

MATH.catalog = [
    {
        id: 'algebra', path: 'algebra/', status: 'disponivel', storage: 'mat.alg', chapters: 11,
        title: 'Álgebra elementar', short: 'Sinais, frações, fatoração e equações',
        icon: 'fa-scale-balanced', color: 'orange', requires: [], col: 0, row: 1,
        desc: 'Para quem está longe da escola: números e sinais, frações, potências, produtos notáveis, fatoração, equações do 1º e 2º grau, sistemas, proporção e porcentagem.',
        topics: ['Sinais e frações', 'MMC e MDC', 'Potências e raízes', 'Fatoração', 'Equações', 'Sistemas', 'Porcentagem']
    },
    {
        id: 'fundamentos', path: 'fundamentos/', status: 'disponivel', storage: 'mat.fund', chapters: 9,
        title: 'Fundamentos', short: 'Lógica, conjuntos, números reais, inequações e módulo',
        icon: 'fa-shapes', color: 'sky', requires: ['algebra'], col: 1, row: 1,
        desc: 'A linguagem da matemática do ensino superior: ler e escrever com conjuntos e quantificadores, dominar os números reais, intervalos, inequações e módulo.',
        topics: ['Lógica e linguagem', 'Conjuntos e operações', 'Produto cartesiano', 'Conjuntos numéricos', 'Intervalos', 'Inequações', 'Módulo']
    },
    {
        id: 'funcoes', path: 'funcoes/', status: 'disponivel', storage: 'mat.func', chapters: 9,
        title: 'Funções', short: 'Afim, quadrática, exponencial, log e trigonométricas',
        icon: 'fa-chart-line', color: 'emerald', requires: ['fundamentos'], col: 2, row: 1,
        desc: 'Conceito de função, domínio e imagem, gráficos e transformações, composição e inversa, e as famílias de funções elementares.',
        topics: ['Conceito e gráfico', 'Transformações', 'Afim e quadrática', 'Composta e inversa', 'Exponencial e logaritmo', 'Trigonométricas']
    },
    {
        id: 'calculo-1', path: 'calculo-1/', status: 'disponivel', storage: 'calc1lab', chapters: 14,
        title: 'Cálculo I', short: 'Limites, derivadas e integrais',
        icon: 'fa-infinity', color: 'indigo', requires: ['fundamentos', 'funcoes'], col: 3, row: 1,
        desc: 'Cálculo Diferencial e Integral I: limites e continuidade, derivadas e aplicações, integral definida, técnicas de integração e aplicações.',
        topics: ['Limites', 'Continuidade', 'Derivadas', 'Otimização', 'Integrais', 'TFC']
    },
    {
        id: 'algebra-linear', path: 'algebra-linear/', status: 'disponivel', storage: 'mat.al', chapters: 12,
        title: 'Álgebra Linear', short: 'Vetores, matrizes, transformações e autovalores',
        icon: 'fa-table-cells', color: 'rose', requires: ['fundamentos'], col: 2, row: 0,
        desc: 'Vetores, sistemas e escalonamento, matrizes e determinantes, espaços vetoriais, base e dimensão, transformações lineares, autovalores e mínimos quadrados, sempre com a geometria por trás.',
        topics: ['Vetores', 'Escalonamento', 'Matrizes', 'Determinantes', 'Base e dimensão', 'Transformações', 'Autovalores']
    },
    {
        id: 'geometria-analitica', path: 'geometria-analitica/', status: 'disponivel', storage: 'mat.ga', chapters: 11,
        title: 'Geometria Analítica', short: 'Vetores, retas, planos e cônicas',
        icon: 'fa-draw-polygon', color: 'amber', requires: ['fundamentos'], col: 2, row: 2,
        desc: 'Plano cartesiano, vetores e os produtos escalar, vetorial e misto, retas, circunferência, parábola, elipse e hipérbole, retas e planos no espaço.',
        topics: ['Vetores', 'Produto vetorial', 'Retas', 'Circunferência', 'Cônicas', 'Planos']
    },
    {
        id: 'probabilidade', path: 'probabilidade/', status: 'disponivel', storage: 'mat.prob', chapters: 13,
        title: 'Probabilidade e Estatística', short: 'Dados, probabilidade, distribuições e inferência',
        icon: 'fa-dice', color: 'teal', requires: ['fundamentos'], col: 2, row: 3,
        desc: 'Estatística descritiva, análise combinatória, probabilidade condicional e Bayes, distribuições binomial, Poisson e normal, Teorema Central do Limite, intervalos de confiança, testes de hipóteses e regressão.',
        topics: ['Descritiva', 'Contagem', 'Bayes', 'Binomial', 'Normal', 'Intervalos', 'Testes', 'Regressão']
    },
    {
        id: 'calculo-2', path: 'calculo-2/', status: 'planejado', storage: 'mat.calc2', chapters: 0,
        title: 'Cálculo II', short: 'Séries, várias variáveis e integrais múltiplas',
        icon: 'fa-cube', color: 'violet', requires: ['calculo-1'], col: 4, row: 1,
        desc: 'Integrais impróprias, sequências e séries, funções de várias variáveis, derivadas parciais e integrais múltiplas.',
        topics: ['Séries', 'Derivadas parciais', 'Integrais múltiplas']
    }
];

MATH.statusLabel = { 'disponivel': 'Disponível', 'em-breve': 'Em breve', 'planejado': 'Planejado' };
