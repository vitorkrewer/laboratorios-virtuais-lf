/* Catálogo do ecossistema de Matemática: fonte única para o hub, o mapa de
   pré-requisitos e os links "antes/depois" de cada livro.
   status: 'disponivel' | 'em-breve' | 'planejado'
   requires: ids dos livros que devem vir antes (arestas do mapa).
   storage: prefixo das chaves de progresso no localStorage (igual ao book.js). */
window.MATH = window.MATH || {};

MATH.catalog = [
    {
        id: 'fundamentos', path: 'fundamentos/', status: 'disponivel', storage: 'mat.fund', chapters: 9,
        title: 'Fundamentos', short: 'Lógica, conjuntos, números reais, inequações e módulo',
        icon: 'fa-shapes', color: 'sky', requires: [], col: 0, row: 1,
        desc: 'A linguagem da matemática do ensino superior: ler e escrever com conjuntos e quantificadores, dominar os números reais, intervalos, inequações e módulo.',
        topics: ['Lógica e linguagem', 'Conjuntos e operações', 'Produto cartesiano', 'Conjuntos numéricos', 'Intervalos', 'Inequações', 'Módulo']
    },
    {
        id: 'funcoes', path: 'funcoes/', status: 'disponivel', storage: 'mat.func', chapters: 9,
        title: 'Funções', short: 'Afim, quadrática, exponencial, log e trigonométricas',
        icon: 'fa-chart-line', color: 'emerald', requires: ['fundamentos'], col: 1, row: 1,
        desc: 'Conceito de função, domínio e imagem, gráficos e transformações, composição e inversa, e as famílias de funções elementares.',
        topics: ['Conceito e gráfico', 'Transformações', 'Afim e quadrática', 'Composta e inversa', 'Exponencial e logaritmo', 'Trigonométricas']
    },
    {
        id: 'calculo-1', path: 'calculo-1/', status: 'disponivel', storage: 'calc1lab', chapters: 14,
        title: 'Cálculo I', short: 'Limites, derivadas e integrais',
        icon: 'fa-infinity', color: 'indigo', requires: ['fundamentos', 'funcoes'], col: 2, row: 1,
        desc: 'Cálculo Diferencial e Integral I: limites e continuidade, derivadas e aplicações, integral definida, técnicas de integração e aplicações.',
        topics: ['Limites', 'Continuidade', 'Derivadas', 'Otimização', 'Integrais', 'TFC']
    },
    {
        id: 'calculo-2', path: 'calculo-2/', status: 'planejado', storage: 'mat.calc2', chapters: 0,
        title: 'Cálculo II', short: 'Séries, várias variáveis e integrais múltiplas',
        icon: 'fa-cube', color: 'violet', requires: ['calculo-1'], col: 3, row: 1,
        desc: 'Integrais impróprias, sequências e séries, funções de várias variáveis, derivadas parciais e integrais múltiplas.',
        topics: ['Séries', 'Derivadas parciais', 'Integrais múltiplas']
    },
    {
        id: 'geometria-analitica', path: 'geometria-analitica/', status: 'planejado', storage: 'mat.ga', chapters: 0,
        title: 'Geometria Analítica', short: 'Vetores, retas, planos e cônicas',
        icon: 'fa-draw-polygon', color: 'amber', requires: ['fundamentos'], col: 1, row: 0,
        desc: 'Vetores no plano e no espaço, produto escalar e vetorial, retas, planos e cônicas.',
        topics: ['Vetores', 'Retas e planos', 'Cônicas']
    },
    {
        id: 'algebra-linear', path: 'algebra-linear/', status: 'planejado', storage: 'mat.al', chapters: 0,
        title: 'Álgebra Linear', short: 'Matrizes, sistemas e transformações lineares',
        icon: 'fa-table-cells', color: 'rose', requires: ['geometria-analitica'], col: 2, row: 0,
        desc: 'Matrizes e sistemas lineares, espaços vetoriais, transformações lineares, autovalores e autovetores.',
        topics: ['Matrizes', 'Sistemas', 'Espaços vetoriais', 'Autovalores']
    },
    {
        id: 'probabilidade', path: 'probabilidade/', status: 'planejado', storage: 'mat.prob', chapters: 0,
        title: 'Probabilidade e Estatística', short: 'Contagem, probabilidade e distribuições',
        icon: 'fa-dice', color: 'teal', requires: ['fundamentos'], col: 1, row: 2,
        desc: 'Análise combinatória, probabilidade, variáveis aleatórias, distribuições e estatística descritiva.',
        topics: ['Contagem', 'Probabilidade', 'Distribuições']
    }
];

MATH.statusLabel = { 'disponivel': 'Disponível', 'em-breve': 'Em breve', 'planejado': 'Planejado' };
