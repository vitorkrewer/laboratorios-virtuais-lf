/* Catálogo do ecossistema de Matemática: fonte única para o hub, o mapa de
   pré-requisitos e os links "antes/depois" de cada livro.
   status: 'disponivel' | 'em-breve' | 'planejado'
   requires: ids dos livros que devem vir antes (arestas do mapa).
   storage: prefixo das chaves de progresso no localStorage (igual ao book.js). */
window.MATH = window.MATH || {};

/* identidade da área (lida pelo motor compartilhado em shared/engine/) */
MATH.area = { id: 'matematica', key: 'mat', name: 'Matemática', eco: 'Ecossistema de Matemática' };

MATH.catalog = [
    {
        id: 'algebra', path: 'algebra/', status: 'disponivel', storage: 'mat.alg', chapters: 11,
        title: 'Álgebra elementar', abbr: 'Álgebra', short: 'Sinais, frações, fatoração e equações',
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
        title: 'Probabilidade e Estatística', abbr: 'Probabilidade', short: 'Dados, probabilidade, distribuições e inferência',
        icon: 'fa-dice', color: 'teal', requires: ['fundamentos'], col: 2, row: 3,
        desc: 'Estatística descritiva, análise combinatória, probabilidade condicional e Bayes, distribuições binomial, Poisson e normal, Teorema Central do Limite, intervalos de confiança, testes de hipóteses e regressão.',
        topics: ['Descritiva', 'Contagem', 'Bayes', 'Binomial', 'Normal', 'Intervalos', 'Testes', 'Regressão']
    },
    {
        id: 'calculo-2', path: 'calculo-2/', status: 'disponivel', storage: 'mat.calc2', chapters: 13,
        title: 'Cálculo II', short: 'Séries, várias variáveis e integrais múltiplas',
        icon: 'fa-cube', color: 'violet', requires: ['calculo-1'], col: 4, row: 1,
        desc: 'Frações parciais e integrais impróprias, sequências, séries e Taylor, funções de várias variáveis, derivadas parciais, gradiente, máximos e mínimos com Lagrange e integrais duplas e triplas.',
        topics: ['Integrais impróprias', 'Séries', 'Taylor', 'Derivadas parciais', 'Gradiente', 'Lagrange', 'Integrais duplas', 'Integrais triplas']
    }
];

MATH.statusLabel = { 'disponivel': 'Disponível', 'em-breve': 'Em breve', 'planejado': 'Planejado' };

/* rotas por objetivo, exibidas no hub */
MATH.routes = [
    { icon: 'fa-hourglass-half', color: 'orange', title: 'Faz tempo que saí da escola',
      text: 'Comece pela Álgebra elementar: sinais, frações, equações e porcentagem, do começo e sem pressa. Faça o diagnóstico de 8 questões para saber o ritmo.',
      steps: [{ b: 'algebra', label: 'Diagnóstico de Álgebra', href: 'algebra/#/trilhas' }, { b: 'algebra', label: 'Álgebra do zero (21 dias)', href: 'algebra/#/trilhas/do-zero-21' }, { b: 'fundamentos', label: 'Depois: Fundamentos completo', href: 'fundamentos/#/trilhas/completo-14' }] },
    { icon: 'fa-bolt', color: 'amber', title: 'Tenho prova de Cálculo I em breve',
      text: 'Vá direto ao livro de Cálculo, faça o diagnóstico e use a trilha de resgate. Volte à Álgebra ou aos Fundamentos só quando travar.',
      steps: [{ b: 'calculo-1', label: 'Diagnóstico de Cálculo I', href: 'calculo-1/#/trilhas' }, { b: 'algebra', label: 'Álgebra para o Cálculo (se as contas travarem)', href: 'algebra/#/trilhas/para-calculo-5' }, { b: 'fundamentos', label: 'Ponte para o Cálculo (se precisar)', href: 'fundamentos/#/trilhas/ponte-calculo' }, { b: 'funcoes', label: 'Funções para o Cálculo (se precisar)', href: 'funcoes/#/trilhas/ponte-calculo' }] },
    { icon: 'fa-graduation-cap', color: 'sky', title: 'Estou começando a graduação',
      text: 'Construa a base na ordem certa: linguagem e números reais, depois funções e Cálculo. Geometria Analítica e Álgebra Linear podem correr em paralelo.',
      steps: [{ b: 'fundamentos', label: 'Fundamentos completo', href: 'fundamentos/#/trilhas/completo-14' }, { b: 'funcoes', label: 'Funções completo', href: 'funcoes/#/trilhas/completo-14' }, { b: 'calculo-1', label: 'Cálculo I', href: 'calculo-1/#/trilhas/base-30' }, { b: 'calculo-2', label: 'Depois: Cálculo II', href: 'calculo-2/#/trilhas/completo-26' }, { b: 'geometria-analitica', label: 'Geometria Analítica (em paralelo com o Cálculo)', href: 'geometria-analitica/#/trilhas/completa-18' }, { b: 'algebra-linear', label: 'Álgebra Linear (em paralelo com o Cálculo)', href: 'algebra-linear/#/trilhas/completo-24' }] },
    { icon: 'fa-circle-nodes', color: 'indigo', title: 'Meu curso começa por Teoria dos Conjuntos',
      text: 'Lógica, conjuntos, operações e produto cartesiano em quatro dias, com simulador de diagramas de Venn.',
      steps: [{ b: 'fundamentos', label: 'Trilha Teoria dos Conjuntos', href: 'fundamentos/#/trilhas/conjuntos-4' }, { b: 'fundamentos', label: 'Desafios no simulador', href: 'fundamentos/#/lab/venn' }] }
];
