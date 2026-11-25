/* Livro Álgebra Linear: configuração, capítulos, trilhas e diagnóstico (lido por engine/app.js). */
window.MATH = window.MATH || {};

MATH.book = {
    id: 'algebra-linear',
    title: 'Álgebra Linear',
    subtitle: 'Vetores, matrizes e transformações',
    icon: 'fa-table-cells',
    storage: 'mat.al',
    wikiTitle: 'Wiki de Álgebra Linear',
    labs: [
        { id: 'transformacoes', label: 'Transformações', icon: 'fa-vector-square', name: 'Transformações 2D' },
        { id: 'escalonamento', label: 'Escalonamento', icon: 'fa-stairs', name: 'Escalonamento' },
        { id: 'autovetores', label: 'Autovetores', icon: 'fa-crosshairs', name: 'Caçador de autovetores' }
    ],
    labsIntro: { title: 'Veja a matriz trabalhar', text: 'Deforme o plano com uma matriz, escalone sistemas com frações exatas e cace as direções que não giram.' },
    home: {
        eyebrow: 'Álgebra Linear',
        titleHtml: 'Matriz não é tabela. <em>É uma máquina que transforma o espaço.</em>',
        lead: 'Vetores, sistemas, matrizes, determinantes, espaços vetoriais, transformações lineares, autovalores e mínimos quadrados, explicados com <strong>geometria</strong> antes das fórmulas. Teoria gratuita, testes rápidos e simuladores.',
        labPitch: 'Mexa nas entradas de uma matriz e veja a grade do plano se deformar, escalone passo a passo e descubra os autovetores girando uma seta.',
        formulas: [
            { label: 'SISTEMA', tex: 'A\\vec x = \\vec b' },
            { label: 'DETERMINANTE', tex: '\\det(AB)=\\det A\\,\\det B' },
            { label: 'AUTOVETOR', tex: 'A\\vec v = \\lambda\\vec v' }
        ],
        mapKicker: 'O mapa do livro',
        mapTitle: 'Quatro blocos, da conta à geometria',
        map: [
            { color: 'sky', icon: 'fa-arrow-right-long', title: 'Vetores e sistemas', text: 'Vetores em $\\mathbb{R}^n$, produto escalar e escalonamento.', tex: '\\vec u\\cdot\\vec v=\\|\\vec u\\|\\|\\vec v\\|\\cos\\theta', href: '#/teoria/vetores' },
            { color: 'indigo', icon: 'fa-table-cells', title: 'Matrizes', text: 'Produto, inversa e determinante.', tex: 'AA^{-1}=I', href: '#/teoria/matrizes' },
            { color: 'emerald', icon: 'fa-cubes', title: 'Espaços', text: 'Subespaços, independência linear, base e dimensão.', tex: '\\text{posto}+\\dim N(A)=n', href: '#/teoria/espacos-vetoriais' },
            { color: 'amber', icon: 'fa-crosshairs', title: 'Transformações', text: 'Transformações lineares, autovalores e ortogonalidade.', tex: 'A=PDP^{-1}', href: '#/teoria/transformacoes-lineares' }
        ]
    },
    groups: [
        { id: 'vetores', title: 'Vetores e sistemas', icon: 'fa-arrow-right-long' },
        { id: 'matrizes', title: 'Matrizes', icon: 'fa-table-cells' },
        { id: 'espacos', title: 'Espaços vetoriais', icon: 'fa-cubes' },
        { id: 'transformacoes', title: 'Transformações', icon: 'fa-crosshairs' },
        { id: 'apoio', title: 'Apoio', icon: 'fa-life-ring' }
    ],
    chapters: [
        { id: 'vetores', file: 'content/01-vetores.md', group: 'vetores', minutes: 40,
          title: 'Vetores em ℝⁿ',
          summary: 'Soma, escalar, combinação linear, norma, produto escalar, ângulo e projeção.' },
        { id: 'sistemas-escalonamento', file: 'content/02-sistemas-escalonamento.md', group: 'vetores', minutes: 55, lab: 'escalonamento',
          title: 'Sistemas lineares e escalonamento',
          summary: 'Matriz aumentada, operações elementares, Gauss, Gauss-Jordan, SPD, SPI, SI e posto.' },
        { id: 'matrizes', file: 'content/03-matrizes.md', group: 'matrizes', minutes: 45,
          title: 'Matrizes e operações',
          summary: 'Matriz vezes vetor, produto de matrizes, não comutatividade e transposta.' },
        { id: 'inversa', file: 'content/04-inversa.md', group: 'matrizes', minutes: 45, lab: 'escalonamento',
          title: 'Matriz inversa',
          summary: 'Fórmula 2×2, Gauss-Jordan em [A | I], propriedades e o teorema das equivalências.' },
        { id: 'determinantes', file: 'content/05-determinantes.md', group: 'matrizes', minutes: 50, lab: 'transformacoes',
          title: 'Determinantes',
          summary: 'Sarrus, Laplace, propriedades, determinante como área e regra de Cramer.' },
        { id: 'espacos-vetoriais', file: 'content/06-espacos-vetoriais.md', group: 'espacos', minutes: 45,
          title: 'Espaços vetoriais e subespaços',
          summary: 'Definição, teste do subespaço, núcleo e espaço coluna de uma matriz.' },
        { id: 'independencia-linear', file: 'content/07-independencia-linear.md', group: 'espacos', minutes: 45, lab: 'escalonamento',
          title: 'Espaço gerado e independência linear',
          summary: 'Combinações lineares, espaço gerado, LI e LD e os atalhos para testar.' },
        { id: 'base-dimensao', file: 'content/08-base-dimensao.md', group: 'espacos', minutes: 50, lab: 'escalonamento',
          title: 'Base, dimensão e posto',
          summary: 'Coordenadas, dimensão, bases do núcleo e da imagem e o teorema do posto.' },
        { id: 'transformacoes-lineares', file: 'content/09-transformacoes-lineares.md', group: 'transformacoes', minutes: 50, lab: 'transformacoes',
          title: 'Transformações lineares',
          summary: 'Matriz de uma transformação, rotação, reflexão, cisalhamento, composição, núcleo e imagem.' },
        { id: 'autovalores', file: 'content/10-autovalores.md', group: 'transformacoes', minutes: 55, lab: 'autovetores',
          title: 'Autovalores e autovetores',
          summary: 'Polinômio característico, autoespaços, diagonalização e potências de matrizes.' },
        { id: 'ortogonalidade', file: 'content/11-ortogonalidade.md', group: 'transformacoes', minutes: 50,
          title: 'Ortogonalidade, Gram-Schmidt e mínimos quadrados',
          summary: 'Bases ortonormais, matrizes ortogonais, projeção, Gram-Schmidt e ajuste de retas.' },
        { id: 'resumo', file: 'content/12-resumo.md', group: 'apoio', minutes: 20,
          title: 'Resumo, teorema das equivalências e erros comuns',
          summary: 'Fórmulas, o teorema que liga tudo e os erros que mais aparecem.' }
    ],
    paths: [
        {
            id: 'prova-10', icon: 'fa-bolt', color: 'amber',
            title: 'Prova chegando',
            duration: '10 dias · ~2 h/dia',
            audience: 'Está cursando Álgebra Linear e precisa dominar o conteúdo típico da primeira e da segunda prova.',
            steps: [
                { day: 'Dia 1', chapter: 'sistemas-escalonamento', lab: 'escalonamento', task: 'Escalonamento até ficar automático: faça os 6 exemplos do simulador sem usar "Fazer o próximo passo".' },
                { day: 'Dia 2', chapter: 'matrizes', task: 'Produto de matrizes e as propriedades que **não** valem.' },
                { day: 'Dia 3', chapter: 'inversa', lab: 'escalonamento', task: 'Inversa 2×2 de cabeça e 3×3 por Gauss-Jordan (preset [A | I]).' },
                { day: 'Dia 4', chapter: 'determinantes', lab: 'transformacoes', task: 'Sarrus, Laplace e propriedades. Veja no simulador por que det = 0 achata o plano.' },
                { day: 'Dia 5', chapter: 'espacos-vetoriais', task: 'Teste do subespaço: comece sempre pelo vetor nulo.' },
                { day: 'Dia 6', chapter: 'independencia-linear', task: 'LI, LD e espaço gerado: tudo vira escalonamento.' },
                { day: 'Dia 7', chapter: 'base-dimensao', task: 'Bases do núcleo e da imagem e o teorema do posto.' },
                { day: 'Dia 8', chapter: 'transformacoes-lineares', lab: 'transformacoes', task: 'Matriz de uma transformação: para onde vão $\\vec e_1$ e $\\vec e_2$?' },
                { day: 'Dia 9', chapter: 'autovalores', lab: 'autovetores', task: 'Polinômio característico, autovetores e diagonalização.' },
                { day: 'Dia 10', chapter: 'resumo', task: 'Teorema das equivalências e os 16 erros comuns. Refaça os testes rápidos.' }
            ]
        },
        {
            id: 'completo-24', icon: 'fa-seedling', color: 'emerald',
            title: 'Álgebra Linear completa',
            duration: '24 dias · ~1 h/dia',
            audience: 'Quer aprender com calma, na ordem do livro, entendendo a geometria por trás das contas.',
            steps: [
                { day: 'Dias 1–2', chapter: 'vetores', task: 'Vetores, combinação linear, norma e produto escalar.' },
                { day: 'Dias 3–5', chapter: 'sistemas-escalonamento', lab: 'escalonamento', task: 'Escalonamento, classificação e solução geral.' },
                { day: 'Dias 6–7', chapter: 'matrizes', task: 'Matriz vezes vetor como combinação das colunas; produto de matrizes.' },
                { day: 'Dias 8–9', chapter: 'inversa', lab: 'escalonamento', task: 'Inversa e o teorema das equivalências.' },
                { day: 'Dias 10–11', chapter: 'determinantes', lab: 'transformacoes', task: 'Determinantes como fator de área.' },
                { day: 'Dias 12–13', chapter: 'espacos-vetoriais', task: 'Espaços vetoriais, subespaços, núcleo e espaço coluna.' },
                { day: 'Dias 14–15', chapter: 'independencia-linear', task: 'Espaço gerado e independência linear.' },
                { day: 'Dias 16–17', chapter: 'base-dimensao', task: 'Base, coordenadas, dimensão e posto.' },
                { day: 'Dias 18–19', chapter: 'transformacoes-lineares', lab: 'transformacoes', task: 'Transformações lineares e o catálogo do plano.' },
                { day: 'Dias 20–21', chapter: 'autovalores', lab: 'autovetores', task: 'Autovalores, diagonalização e Markov.' },
                { day: 'Dias 22–23', chapter: 'ortogonalidade', task: 'Gram-Schmidt e mínimos quadrados.' },
                { day: 'Dia 24', chapter: 'resumo', task: 'Revisão geral com o teorema das equivalências.' }
            ]
        },
        {
            id: 'dados-6', icon: 'fa-chart-simple', color: 'indigo',
            title: 'Álgebra Linear para dados e computação',
            duration: '6 dias · ~1,5 h/dia',
            audience: 'Vai estudar aprendizado de máquina, computação gráfica ou estatística e precisa da Álgebra Linear que essas áreas usam.',
            steps: [
                { day: 'Dia 1', chapter: 'vetores', task: 'Vetores como listas de dados; produto escalar como medida de semelhança.' },
                { day: 'Dia 2', chapter: 'matrizes', task: 'Matriz vezes vetor e produto de matrizes: a operação básica de toda rede neural.' },
                { day: 'Dia 3', chapter: 'transformacoes-lineares', lab: 'transformacoes', task: 'Rotações, escalas e composições: a base da computação gráfica.' },
                { day: 'Dia 4', chapter: 'autovalores', lab: 'autovetores', task: 'Autovetores, diagonalização e o método da potência (PageRank).' },
                { day: 'Dia 5', chapter: 'ortogonalidade', task: 'Projeções e mínimos quadrados: regressão linear.' },
                { day: 'Dia 6', chapter: 'resumo', task: 'Feche com o resumo e os erros comuns.' }
            ]
        }
    ],
    diagnostic: [
        { q: 'O produto escalar $(2, -1, 3) \\cdot (1, 4, 2)$ vale:', opts: ['$(2, -4, 6)$', '$4$', '$8$', '$0$'], correct: 1, chapter: 'vetores' },
        { q: 'Na forma escalonada de um sistema aparece a linha $[0 \\;\\; 0 \\;\\; 0 \\;\\vdots\\; 2]$. O sistema é:', opts: ['SPD', 'SPI', 'SI', 'homogêneo'], correct: 2, chapter: 'sistemas-escalonamento' },
        { q: 'Se $A$ é $2 \\times 3$ e $B$ é $3 \\times 4$, o produto $BA$:', opts: ['é $2 \\times 4$', 'é $3 \\times 3$', 'é $4 \\times 2$', 'não existe'], correct: 3, chapter: 'matrizes' },
        { q: 'A inversa de $\\begin{bmatrix} 3 & 1 \\\\ 5 & 2 \\end{bmatrix}$ é:', opts: ['$\\begin{bmatrix} 2 & -1 \\\\ -5 & 3 \\end{bmatrix}$', '$\\begin{bmatrix} \\frac13 & 1 \\\\ \\frac15 & \\frac12 \\end{bmatrix}$', '$\\begin{bmatrix} 2 & 1 \\\\ 5 & 3 \\end{bmatrix}$', 'não existe'], correct: 0, chapter: 'inversa' },
        { q: 'Se $A$ é $3 \\times 3$ e $\\det A = 2$, então $\\det(2A)$ é:', opts: ['$4$', '$8$', '$16$', '$6$'], correct: 2, chapter: 'determinantes' },
        { q: 'Os vetores $(1, 2, 3)$, $(0, 1, 1)$ e $(1, 3, 4)$ são:', opts: ['LI', 'LD', 'ortogonais', 'uma base de $\\mathbb{R}^3$'], correct: 1, chapter: 'independencia-linear' },
        { q: 'Uma matriz $4 \\times 6$ tem posto $3$. A dimensão do núcleo é:', opts: ['$1$', '$3$', '$2$', '$6$'], correct: 1, chapter: 'base-dimensao' },
        { q: 'Os autovalores de $\\begin{bmatrix} 5 & 2 \\\\ 0 & -1 \\end{bmatrix}$ são:', opts: ['$5$ e $2$', '$5$ e $-1$', '$4$ e $-5$', '$7$ e $0$'], correct: 1, chapter: 'autovalores' }
    ],
    recommend(score, total, needs) {
        if (score <= 3) return { path: 'completo-24', msg: 'Vale construir a Álgebra Linear com calma, na ordem do livro.',
            extra: '<p class="small">Se travar em sistemas de equações ou frações, revise antes a <a href="../algebra/#/teoria/sistemas">Álgebra elementar →</a></p>' };
        if (needs.length) return { path: 'prova-10', msg: 'Você tem base, mas há lacunas em tópicos que caem em toda prova. A trilha de 10 dias cobre exatamente eles.' };
        return { path: 'dados-6', msg: 'Excelente! Seu domínio das contas está em dia. Aprofunde a geometria e as aplicações.' };
    }
};
